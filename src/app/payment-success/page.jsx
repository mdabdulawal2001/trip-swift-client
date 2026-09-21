"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ReceiptText,
} from "lucide-react";

import toast from "react-hot-toast";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const sessionId =
    searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Payment session was not found.");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          "/api/verify_payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId,
            }),
          }
        );

        const data = await response.json();

        if (
          !response.ok ||
          !data?.success
        ) {
          throw new Error(
            data?.message ||
              "Payment verification failed"
          );
        }

        setSuccess(true);
        setPayment(data?.payment || null);

        toast.success(
          "Payment completed successfully!"
        );
      } catch (error) {
        console.error(
          "Payment verification error:",
          error
        );

        setError(
          error?.message ||
            "Payment verification failed."
        );

        toast.error(
          error?.message ||
            "Payment verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-sky-500" />

          <h1 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            Verifying your payment...
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we confirm your
            payment.
          </p>
        </div>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl dark:border-red-500/20 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-500/10">
            <ReceiptText className="h-8 w-8 text-red-500" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
            Payment Verification Failed
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <Link
            href="/dashboard/bookings"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            Back to Bookings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl dark:border-emerald-500/20 dark:bg-slate-900 sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>

        <p className="mt-6 text-sm font-semibold text-emerald-500">
          Payment Successful
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          Your ticket is paid!
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Your payment has been verified successfully
          and your booking is now confirmed.
        </p>

        {payment && (
          <div className="mt-7 rounded-2xl bg-slate-50 p-5 text-left dark:bg-slate-800/60">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-700">
              <span className="text-xs text-slate-400">
                Transaction ID
              </span>

              <span className="text-right text-sm font-bold text-slate-900 dark:text-white">
                {payment.transactionId}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Amount Paid
              </span>

              <span className="text-lg font-bold text-emerald-500">
                ৳
                {Number(
                  payment.amount || 0
                ).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard/bookings"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            My Bookings
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/dashboard/transactions"
            className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:text-slate-300"
          >
            Transactions
          </Link>
        </div>
      </div>
    </div>
  );
}