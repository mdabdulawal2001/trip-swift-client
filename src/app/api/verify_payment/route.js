import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    // ============================================================
    // REQUEST BODY
    // ============================================================

    const body = await request.json();

    const sessionId = String(
      body?.sessionId || ""
    ).trim();

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe session ID is required",
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
            "You must be logged in to verify payment",
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
    // GET STRIPE SESSION
    // ============================================================

    const session =
      await stripe.checkout.sessions.retrieve(
        sessionId
      );

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe session not found",
        },
        { status: 404 }
      );
    }

    // ============================================================
    // PAYMENT MUST ACTUALLY BE PAID
    // ============================================================

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment has not been completed",
          paymentStatus:
            session.payment_status,
        },
        { status: 400 }
      );
    }

    // ============================================================
    // STRIPE METADATA
    // ============================================================

    const bookingId =
      session.metadata?.bookingId;

    const stripeUserEmail = String(
      session.metadata?.userEmail || ""
    )
      .trim()
      .toLowerCase();

    if (!bookingId || !stripeUserEmail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking information is missing from Stripe session",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // VERIFY STRIPE SESSION BELONGS TO CURRENT USER
    // ============================================================

    if (
      stripeUserEmail !== currentUserEmail
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment session does not belong to the current user.",
        },
        { status: 403 }
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

    const bookingData =
      await bookingResponse.json();

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

    const booking =
      bookingData.booking;

    // ============================================================
    // EXTRA BOOKING OWNERSHIP CHECK
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
            "You are not authorized to verify this booking payment",
        },
        { status: 403 }
      );
    }

    // ============================================================
    // PREVENT VERIFYING A REJECTED / UNACCEPTED BOOKING
    // ============================================================

    if (booking.status !== "accepted") {
      return NextResponse.json(
        {
          success: false,
          message:
            "This booking is not accepted for payment",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // PREVENT DUPLICATE PAYMENT
    // ============================================================

    if (booking.paymentStatus === "paid") {
      return NextResponse.json(
        {
          success: true,
          message:
            "Payment has already been verified",
          alreadyProcessed: true,
          payment: null,
        },
        { status: 200 }
      );
    }

    // ============================================================
    // VERIFY STRIPE AMOUNT
    // ============================================================

    const stripeAmount =
      Number(session.amount_total || 0) / 100;

    const bookingAmount =
      Number(booking.totalPrice);

    if (
      !Number.isFinite(stripeAmount) ||
      !Number.isFinite(bookingAmount) ||
      stripeAmount !== bookingAmount
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Stripe payment amount does not match booking amount",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // PAYMENT CONFIRM SECRET
    // ============================================================

    const paymentConfirmSecret =
      process.env.PAYMENT_CONFIRM_SECRET;

    if (!paymentConfirmSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment confirmation secret is not configured",
        },
        { status: 500 }
      );
    }

    // ============================================================
    // CONFIRM PAYMENT IN EXPRESS BACKEND
    // ============================================================

    const confirmResponse = await fetch(
      `${serverApiUrl}/payments/confirm`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          "x-payment-confirm-secret":
            paymentConfirmSecret,
        },

        body: JSON.stringify({
          bookingId,

          stripeSessionId:
            session.id,

          paymentIntentId:
            session.payment_intent || null,

          amount: bookingAmount,
        }),
      }
    );

    const confirmData =
      await confirmResponse.json();

    if (
      !confirmResponse.ok ||
      !confirmData?.success
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            confirmData?.message ||
            "Payment confirmation failed",
        },
        {
          status:
            confirmResponse.status || 500,
        }
      );
    }

    // ============================================================
    // SUCCESS
    // ============================================================

    return NextResponse.json({
      success: true,

      message:
        "Payment verified and confirmed successfully",

      alreadyProcessed:
        confirmData.alreadyProcessed || false,

      payment:
        confirmData.payment || null,
    });
  } catch (error) {
    console.error(
      "Stripe payment verification error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to verify payment",
      },
      { status: 500 }
    );
  }
}