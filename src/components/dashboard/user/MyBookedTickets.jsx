"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  BusFront,
  CalendarDays,
  Clock3,
  MapPin,
  CreditCard,
  ArrowRight,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Timer,
} from "lucide-react";

import { getUserBookings, createCheckoutSession } from "@/lib/api";

import { authClient } from "@/lib/auth-client";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: AlertCircle,
    className:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },

  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },

  paid: {
    label: "Paid",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },

  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  },
};

export default function MyBookedTickets() {
  const searchParams = useSearchParams();

  const paymentStatus = searchParams.get("payment");
  const sessionId = searchParams.get("session_id");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentId, setPaymentId] = useState(null);

  // Used for live countdown
  const [currentTime, setCurrentTime] = useState(Date.now());

  // =========================
  // Live Countdown Timer
  // =========================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);
  // =========================
  // Load User Bookings
  // =========================
  const loadBookings = async () => {
    try {
      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        setBookings([]);
        return;
      }

      const data = await getUserBookings(email);

      setBookings(data?.bookings || []);
    } catch (error) {
      console.error("Failed to load bookings:", error);

      toast.error(error?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Initial Load
  // =========================
  useEffect(() => {
    loadBookings();
  }, []);

  // =========================
  // Verify Stripe Payment
  // =========================
  useEffect(() => {
    if (paymentStatus !== "success" || !sessionId) {
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/verify_payment", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sessionId,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data?.success) {
          throw new Error(data?.message || "Payment verification failed");
        }

        toast.success("Payment successful! Your booking is now paid.");

        await loadBookings();

        window.history.replaceState({}, "", "/dashboard/bookings");
      } catch (error) {
        console.error("Payment verification error:", error);

        toast.error(error?.message || "Payment verification failed");
      }
    };

    verifyPayment();
  }, [paymentStatus, sessionId]);

  // =========================
  // Payment Cancelled
  // =========================
  useEffect(() => {
    if (paymentStatus !== "cancelled") {
      return;
    }

    toast.error("Payment was cancelled.");

    window.history.replaceState({}, "", "/dashboard/bookings");
  }, [paymentStatus]);

  // =========================
  // Start Stripe Checkout
  // =========================
  const handlePayment = async (booking) => {
    // Extra safety check:
    // Payment should never start after departure.
    const departureTime = getDepartureTime(booking);

    if (departureTime && Date.now() >= departureTime) {
      toast.error(
        "Payment is no longer available because the departure time has passed.",
      );

      return;
    }

    try {
      setPaymentId(booking._id);

      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        toast.error("Please login to continue payment");

        setPaymentId(null);
        return;
      }

      const data = await createCheckoutSession(booking._id, email);

      if (!data?.url) {
        throw new Error("Stripe checkout URL was not returned");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Payment checkout error:", error);

      toast.error(error?.message || "Failed to start payment");

      setPaymentId(null);
    }
  };

  // =========================
  // Summary
  // =========================
  const allBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted",
  ).length;

  const paidBookings = bookings.filter(
    (booking) => booking.paymentStatus === "paid",
  ).length;

  // =========================
  // Loading
  // =========================
  if (loading) {
  return <BookingsSkeleton />;
}

  // =========================
  // UI
  // =========================
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >

      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-sky-500">My Trips</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          My Booked Tickets
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track your bookings, payment status and upcoming journeys.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard
          label="All Bookings"
          value={String(allBookings).padStart(2, "0")}
        />

        <SummaryCard
          label="Pending"
          value={String(pendingBookings).padStart(2, "0")}
        />

        <SummaryCard
          label="Accepted"
          value={String(acceptedBookings).padStart(2, "0")}
        />

        <SummaryCard
          label="Paid"
          value={String(paidBookings).padStart(2, "0")}
        />
      </div>

      {/* Booking List */}
      {!bookings.length ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            No Bookings Yet
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Your booked tickets will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => {
            const isPaid = booking.paymentStatus === "paid";

            const currentStatus = isPaid ? "paid" : booking.status;

            const status = statusConfig[currentStatus] || statusConfig.pending;

            const StatusIcon = status.icon;

            const departureTime = getDepartureTime(booking);

            const isDeparturePassed =
              departureTime !== null && currentTime >= departureTime;

            const isPaymentAvailable =
              booking.status === "accepted" &&
              booking.paymentStatus === "unpaid" &&
              departureTime !== null &&
              !isDeparturePassed;

            const quantity = Number(booking.quantity) || 0;

            const unitPrice =
              Number(
                booking.unitPrice ??
                  booking.price ??
                  booking.ticketPrice ??
                  booking.ticket?.price,
              ) || 0;

            const calculatedTotal = unitPrice * quantity;

            const totalPrice =
              calculatedTotal || Number(booking.totalPrice) || 0;

            const ticketTitle =
              booking.title ||
              booking.ticketTitle ||
              booking.ticket?.title ||
              "Booked Ticket";

            const ticketImage =
              booking.image || booking.ticketImage || booking.ticket?.image;

            return (
              <motion.div
                key={booking._id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Ticket Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {ticketImage ? (
                    <img
                      src={ticketImage}
                      alt={ticketTitle}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <BusFront className="h-12 w-12" />
                    </div>
                  )}

                  {/* Status */}
                  <span
                    className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm ${status.className}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />

                    {status.label}
                  </span>
                </div>

                {/* Main Content */}
                <div className="p-5">
                  {/* Title */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-400">Ticket</p>

                    <h3 className="mt-1 line-clamp-2 text-lg font-bold text-slate-900 dark:text-white">
                      {ticketTitle}
                    </h3>
                  </div>

                  {/* Route */}
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950!">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          From
                        </p>

                        <p className="mt-1 truncate text-sm font-bold text-slate-800 dark:text-slate-200">
                          {booking.from}
                        </p>
                      </div>

                      <ArrowRight className="h-4 w-4 shrink-0 text-sky-500" />

                      <div className="min-w-0 text-right">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          To
                        </p>

                        <p className="mt-1 truncate text-sm font-bold text-slate-800 dark:text-slate-200">
                          {booking.to}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Journey Info */}
                  <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-slate-100 py-5 dark:border-slate-800!">
                    <Info
                      icon={CalendarDays}
                      label="Departure"
                      value={formatDepartureDate(booking.departureDateTime)}
                    />

                    <Info
                      icon={Clock3}
                      label="Time"
                      value={formatDepartureTime(booking.departureDateTime)}
                    />

                    <Info
                      icon={MapPin}
                      label="Quantity"
                      value={`${quantity} Ticket${quantity > 1 ? "s" : ""}`}
                    />

                    <Info
                      icon={CreditCard}
                      label="Unit Price"
                      value={`৳${unitPrice.toLocaleString()}`}
                    />
                  </div>

                  {/* Countdown */}
                  {booking.status !== "rejected" && departureTime && (
                    <Countdown
                      departureTime={departureTime}
                      currentTime={currentTime}
                    />
                  )}

                  {/* Price + Payment */}
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950!">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col justify-center items-center mx-auto">
                        <p className="text-xs text-slate-400">Total Amount</p>

                        <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                          ৳{totalPrice.toLocaleString()}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          {quantity} × ৳{unitPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Pay Now */}
                    {booking.status === "accepted" &&
                      booking.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePayment(booking)}
                          disabled={
                            paymentId === booking._id || !isPaymentAvailable
                          }
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:opacity-100 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
                        >
                          <CreditCard
                            size={18}
                            className={
                              paymentId === booking._id ? "animate-pulse" : ""
                            }
                          />

                          {paymentId === booking._id
                            ? "Redirecting..."
                            : isDeparturePassed
                              ? "Payment Closed"
                              : "Pay Now"}
                        </button>
                      )}

                    {/* Paid */}
                    {booking.paymentStatus === "paid" && (
                      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Payment Complete
                      </div>
                    )}

                    {/* Pending */}
                    {booking.status === "pending" && (
                      <div className="mt-4 text-center text-xs font-medium text-slate-400">
                        Waiting for vendor approval
                      </div>
                    )}

                    {/* Rejected */}
                    {booking.status === "rejected" && (
                      <div className="mt-4 text-center text-xs font-medium text-red-400">
                        Booking request rejected
                      </div>
                    )}

                    {/* Accepted but departure passed */}
                    {booking.status === "accepted" &&
                      booking.paymentStatus === "unpaid" &&
                      isDeparturePassed && (
                        <p className="mt-2 text-center text-xs font-medium text-red-400">
                          Payment is unavailable because the departure time has
                          passed.
                        </p>
                      )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

// =========================
// Departure Time Helper
// =========================

function getDepartureTime(booking) {
  if (!booking?.departureDateTime) {
    return null;
  }

  const timestamp = new Date(booking.departureDateTime).getTime();

  return Number.isNaN(timestamp) ? null : timestamp;
}

function formatDepartureDate(dateTime) {
  if (!dateTime) {
    return "N/A";
  }

  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDepartureTime(dateTime) {
  if (!dateTime) {
    return "N/A";
  }

  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
// =========================
// Countdown Component
// =========================

function Countdown({ departureTime, currentTime }) {
  if (!departureTime) {
    return (
      <div className="mt-5 flex min-h-[112px] items-center justify-center rounded-2xl bg-slate-50 px-4 py-5 dark:bg-slate-950">
        <div className="text-center">
          <Timer className="mx-auto h-5 w-5 text-slate-400" />

          <p className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            Departure time unavailable
          </p>
        </div>
      </div>
    );
  }

  const remaining = departureTime - currentTime;

  // Departure time passed
  if (remaining <= 0) {
    return (
      <div className="mt-5 flex min-h-[112px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-4 py-5 text-center dark:border-red-500/20 dark:bg-red-500/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
          <Timer className="h-5 w-5 text-red-500 dark:text-red-400" />
        </div>

        <p className="mt-2 text-sm font-bold text-red-600 dark:text-red-400">
          Departure Time Passed
        </p>

        <p className="mt-1 text-[11px] text-red-500/80 dark:text-red-400/70">
          Payment is no longer available for this journey.
        </p>
      </div>
    );
  }

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor((totalSeconds % 86400) / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  return (
    <div className="mt-5 min-h-[112px] rounded-2xl bg-sky-50 p-4 dark:bg-sky-500/10">
      <div className="flex items-center gap-2">
        <Timer className="h-4 w-4 text-sky-500" />

        <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
          Departure Countdown
        </p>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        <CountdownBox value={days} label="Days" />

        <CountdownBox value={hours} label="Hours" />

        <CountdownBox value={minutes} label="Min" />

        <CountdownBox value={seconds} label="Sec" />
      </div>
    </div>
  );
}

function CountdownBox({ value, label }) {
  return (
    <div className="rounded-lg bg-white px-2 py-2 text-center shadow-sm dark:bg-slate-900!">
      <p className="text-sm font-extrabold text-slate-900 dark:text-white">
        {String(value).padStart(2, "0")}
      </p>

      <p className="mt-0.5 text-[9px] font-medium uppercase text-slate-400">
        {label}
      </p>
    </div>
  );
}

// =========================
// Summary Card
// =========================

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-medium text-slate-400">{label}</p>

      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

// =========================
// Info
// =========================

function Info({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Icon className="h-3.5 w-3.5 shrink-0" />

        <span>{label}</span>
      </div>

      <p className="mt-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

// =========================
// Bookings Skeleton
// =========================

function BookingsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

        <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 sm:h-9" />

        <div className="h-4 w-full max-w-md animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Summary Skeleton */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

            <div className="mt-3 h-8 w-12 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      {/* Booking Cards Skeleton */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BookingCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function BookingCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800! dark:bg-slate-900">
      {/* Image */}
      <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-800" />

      <div className="p-5">
        {/* Title */}
        <div className="mb-4 space-y-2">
          <div className="h-3 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />

          <div className="h-6 w-1/2 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Route */}
        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-950!">
          <div className="flex items-center justify-between gap-4">
            <div className="w-24 space-y-2">
              <div className="h-3 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="h-4 w-5 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

            <div className="w-24 space-y-2">
              <div className="ml-auto h-3 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="ml-auto h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        {/* Journey Info */}
        <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-slate-100 py-5 dark:border-slate-800">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

              <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mt-5 rounded-2xl bg-slate-100 p-4 dark:bg-slate-950!">
          <div className="h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="mt-3 grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded-lg bg-white dark:bg-slate-900!"
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 rounded-2xl bg-slate-100 p-4 dark:bg-slate-950!">
          <div className="flex flex-col items-center gap-2">
            <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

            <div className="h-8 w-28 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />

            <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="mt-4 h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
