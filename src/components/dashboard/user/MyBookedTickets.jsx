"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";

import { getUserBookings } from "@/lib/api";
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
    className:
      "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  },
};

export default function MyBookedTickets() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const { data: session } =
          await authClient.getSession();

        const email = session?.user?.email;

        if (!email) {
          return;
        }

        const data = await getUserBookings(email);

        setBookings(data?.bookings || []);
      } catch (error) {
        console.error(error);

        toast.error(
          error.message ||
            "Failed to load your bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const allBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted"
  ).length;

  const paidBookings = bookings.filter(
    (booking) => booking.paymentStatus === "paid"
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm font-medium text-slate-500">
          Loading your bookings...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-sky-500">
          My Trips
        </p>

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
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isPaid =
              booking.paymentStatus === "paid";

            const currentStatus = isPaid
              ? "paid"
              : booking.status;

            const status =
              statusConfig[currentStatus] ||
              statusConfig.pending;

            const StatusIcon = status.icon;

            return (
              <motion.div
                key={booking._id}
                whileHover={{ y: -2 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Top */}
                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                      <BusFront className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Booking ID
                      </p>

                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {booking._id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </span>
                </div>

                {/* Main */}
                <div className="p-5 sm:p-6">
                  <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {booking.from} → {booking.to}
                        </h3>

                        <ArrowRight className="h-4 w-4 text-sky-500" />
                      </div>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {booking.operator} •{" "}
                        {booking.type}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <Info
                          icon={CalendarDays}
                          label="Departure"
                          value={booking.date}
                        />

                        <Info
                          icon={Clock3}
                          label="Time"
                          value={booking.departure}
                        />

                        <Info
                          icon={MapPin}
                          label="Quantity"
                          value={`${booking.quantity} Ticket${
                            booking.quantity > 1
                              ? "s"
                              : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Price */}
                    <div className="rounded-2xl bg-slate-50 p-5 lg:min-w-48 dark:bg-slate-950">
                      <p className="text-xs text-slate-400">
                        Total Amount
                      </p>

                      <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                        ৳
                        {Number(
                          booking.totalPrice
                        ).toLocaleString()}
                      </p>

                      {/* Pay */}
                      {booking.status ===
                        "accepted" &&
                        booking.paymentStatus ===
                          "unpaid" && (
                          <button
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-600"
                          >
                            <CreditCard className="h-4 w-4" />
                            Pay Now
                          </button>
                        )}

                      {booking.paymentStatus ===
                        "paid" && (
                        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" />
                          Payment Complete
                        </div>
                      )}

                      {booking.status ===
                        "pending" && (
                        <div className="mt-4 text-center text-xs font-medium text-slate-400">
                          Waiting for vendor approval
                        </div>
                      )}

                      {booking.status ===
                        "rejected" && (
                        <div className="mt-4 text-center text-xs font-medium text-red-400">
                          Booking request rejected
                        </div>
                      )}
                    </div>
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

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>

      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}