import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
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

    // Payment must actually be paid
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

    const bookingId =
      session.metadata?.bookingId;

    const userEmail =
      session.metadata?.userEmail;

    if (!bookingId || !userEmail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking information is missing from Stripe session",
        },
        { status: 400 }
      );
    }

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

    // Get booking from backend
    const bookingResponse = await fetch(
      `${serverApiUrl}/bookings/${bookingId}?email=${encodeURIComponent(
        userEmail
      )}`,
      {
        method: "GET",
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

    const booking = bookingData.booking;

    // Prevent amount mismatch
    const stripeAmount =
      Number(session.amount_total || 0) / 100;

    const bookingAmount =
      Number(booking.totalPrice);

    if (stripeAmount !== bookingAmount) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Stripe payment amount does not match booking amount",
        },
        { status: 400 }
      );
    }

    // Confirm payment in Express backend
    const confirmResponse = await fetch(
      `${serverApiUrl}/payments/confirm`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          bookingId,
          stripeSessionId: session.id,
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

    return NextResponse.json({
      success: true,
      message:
        "Payment verified and confirmed successfully",

      alreadyProcessed:
        confirmData.alreadyProcessed || false,

      payment: confirmData.payment || null,
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