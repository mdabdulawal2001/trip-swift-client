import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const body = await request.json();

    const bookingId = String(body?.bookingId || "").trim();
    const userEmail = String(body?.userEmail || "").trim().toLowerCase();

    if (!bookingId || !userEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID and user email are required",
        },
        { status: 400 }
      );
    }

    const serverApiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    if (!serverApiUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Server API URL is not configured",
        },
        { status: 500 }
      );
    }

    // Get the real booking from Express backend
    const bookingResponse = await fetch(
      `${serverApiUrl}/bookings/${bookingId}?email=${encodeURIComponent(
        userEmail
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const bookingData = await bookingResponse.json();

    if (!bookingResponse.ok || !bookingData?.success) {
      return NextResponse.json(
        {
          success: false,
          message: bookingData?.message || "Booking not found",
        },
        { status: bookingResponse.status || 404 }
      );
    }

    const booking = bookingData.booking;

    // Booking must be accepted before payment
    if (booking.status !== "accepted") {
      return NextResponse.json(
        {
          success: false,
          message: "This booking is not accepted for payment yet",
        },
        { status: 400 }
      );
    }

    // Prevent paying twice
    if (booking.paymentStatus === "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "This booking has already been paid",
        },
        { status: 400 }
      );
    }

    const totalPrice = Number(booking.totalPrice);

    if (!Number.isFinite(totalPrice) || totalPrice <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking amount",
        },
        { status: 400 }
      );
    }

    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin");

    if (!origin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to determine checkout origin",
        },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: userEmail,

      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: booking.ticketTitle || "TripSwift Ticket",
              description: `${booking.from || ""} → ${
                booking.to || ""
              }`,
            },
            unit_amount: Math.round(Number(booking.price) * 100),
          },
          quantity: Number(booking.quantity),
        },
      ],

      metadata: {
        bookingId: String(booking._id),
        userEmail,
      },

      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/dashboard/bookings?payment=cancelled`,

      billing_address_collection: "auto",
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Create Stripe Checkout Session error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}