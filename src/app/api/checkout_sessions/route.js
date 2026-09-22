import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const body = await request.json();

    const bookingId = String(body?.bookingId || "").trim();

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID is required",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // CURRENT AUTHENTICATED USER
    // ============================================================

    const requestHeaders = await headers();

    const { auth } = await import("@/lib/auth");

    const authSession = await auth.api.getSession({
      headers: requestHeaders,
    });

    const currentUserEmail = String(
      authSession?.user?.email || ""
    )
      .trim()
      .toLowerCase();

    if (!currentUserEmail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You must be logged in to create a checkout session",
        },
        { status: 401 }
      );
    }

    // ============================================================
    // GET JWT TOKEN
    // ============================================================

    const {
      token: authToken,
      error: tokenError,
    } = await auth.api.getToken({
      headers: requestHeaders,
    });

    if (tokenError || !authToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization token is required",
        },
        { status: 401 }
      );
    }

    // ============================================================
    // SERVER API URL
    // ============================================================

    const serverApiUrl =
      process.env.NEXT_PUBLIC_SERVER_API_URL;

    if (!serverApiUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Server API URL is not configured",
        },
        { status: 500 }
      );
    }

    // ============================================================
    // GET REAL BOOKING FROM EXPRESS BACKEND
    // ============================================================

    const bookingResponse = await fetch(
      `${serverApiUrl}/bookings/${bookingId}`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${authToken}`,
        },

        cache: "no-store",
      }
    );

    const bookingData = await bookingResponse.json();

    if (
      !bookingResponse.ok ||
      !bookingData?.success
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            bookingData?.message ||
            "Booking not found",
        },
        {
          status:
            bookingResponse.status || 404,
        }
      );
    }

    const booking = bookingData.booking;

    // ============================================================
    // EXTRA USER OWNERSHIP CHECK
    // ============================================================

    const bookingUserEmail = String(
      booking?.userEmail || ""
    )
      .trim()
      .toLowerCase();

    if (
      !bookingUserEmail ||
      bookingUserEmail !== currentUserEmail
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not authorized to pay for this booking",
        },
        { status: 403 }
      );
    }

    // ============================================================
    // BOOKING MUST BE ACCEPTED
    // ============================================================

    if (booking.status !== "accepted") {
      return NextResponse.json(
        {
          success: false,
          message:
            "This booking is not accepted for payment yet",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // PREVENT PAYING TWICE
    // ============================================================

    if (booking.paymentStatus === "paid") {
      return NextResponse.json(
        {
          success: false,
          message:
            "This booking has already been paid",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // VALIDATE TOTAL PRICE
    // ============================================================

    const totalPrice = Number(
      booking.totalPrice
    );

    if (
      !Number.isFinite(totalPrice) ||
      totalPrice <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid booking amount",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // CHECK CHECKOUT ORIGIN
    // ============================================================

    const origin =
      requestHeaders.get("origin");

    if (!origin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to determine checkout origin",
        },
        { status: 500 }
      );
    }

    // ============================================================
    // STRIPE CHECKOUT SESSION
    // ============================================================

    const stripeSession =
      await stripe.checkout.sessions.create({
        mode: "payment",

        customer_email:
          currentUserEmail,

        line_items: [
          {
            price_data: {
              currency: "bdt",

              product_data: {
                name:
                  booking.ticketTitle ||
                  "TripSwift Ticket",

                description: `${booking.from || ""} → ${
                  booking.to || ""
                }`,
              },

              unit_amount: Math.round(
                Number(booking.price) * 100
              ),
            },

            quantity: Number(
              booking.quantity
            ),
          },
        ],

        metadata: {
          bookingId: String(
            booking._id
          ),
          userEmail:
            currentUserEmail,
        },

        success_url:
          `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${origin}/dashboard/bookings?payment=cancelled`,

        billing_address_collection:
          "auto",
      });

    // ============================================================
    // RESPONSE
    // ============================================================

    return NextResponse.json({
      success: true,
      url: stripeSession.url,
      sessionId: stripeSession.id,
    });
  } catch (error) {
    console.error(
      "Create Stripe Checkout Session error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}