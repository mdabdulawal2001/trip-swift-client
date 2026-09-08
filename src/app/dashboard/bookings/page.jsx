"use client";

import { motion } from "framer-motion";
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

const bookings = [
  {
    id: "BK-1001",
    route: "Dhaka → Cox's Bazar",
    operator: "Green Line Express",
    type: "AC Bus",
    date: "18 Sep 2026",
    time: "08:30 AM",
    quantity: 2,
    total: 2900,
    status: "pending",
  },
  {
    id: "BK-1002",
    route: "Dhaka → Chattogram",
    operator: "Hanif Enterprise",
    type: "AC Bus",
    date: "19 Sep 2026",
    time: "10:00 PM",
    quantity: 2,
    total: 2200,
    status: "accepted",
  },
  {
    id: "BK-1003",
    route: "Dhaka → Sylhet",
    operator: "Bangladesh Railway",
    type: "Train",
    date: "20 Sep 2026",
    time: "06:40 AM",
    quantity: 2,
    total: 1300,
    status: "paid",
  },
  {
    id: "BK-1004",
    route: "Dhaka → Rajshahi",
    operator: "Silk City Express",
    type: "Train",
    date: "21 Sep 2026",
    time: "07:15 AM",
    quantity: 1,
    total: 780,
    status: "rejected",
  },
];

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

const BookingsPage = () => {
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
        <SummaryCard label="All Bookings" value="12" />
        <SummaryCard label="Pending" value="03" />
        <SummaryCard label="Accepted" value="02" />
        <SummaryCard label="Paid" value="08" />
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {bookings.map((booking) => {
          const status = statusConfig[booking.status];
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={booking.id}
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
                      {booking.id}
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
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {booking.route}
                      </h3>

                      <ArrowRight className="h-4 w-4 text-sky-500" />
                    </div>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {booking.operator} • {booking.type}
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
                        value={booking.time}
                      />

                      <Info
                        icon={MapPin}
                        label="Quantity"
                        value={`${booking.quantity} Ticket${booking.quantity > 1 ? "s" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="rounded-2xl bg-slate-50 p-5 lg:min-w-48 dark:bg-slate-950">
                    <p className="text-xs text-slate-400">
                      Total Amount
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                      ৳{booking.total.toLocaleString()}
                    </p>

                    {/* Pay */}
                    {booking.status === "accepted" && (
                      <button
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-600"
                      >
                        <CreditCard className="h-4 w-4" />
                        Pay Now
                      </button>
                    )}

                    {booking.status === "paid" && (
                      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Payment Complete
                      </div>
                    )}

                    {booking.status === "pending" && (
                      <div className="mt-4 text-center text-xs font-medium text-slate-400">
                        Waiting for vendor approval
                      </div>
                    )}

                    {booking.status === "rejected" && (
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
    </motion.div>
  );
};

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

export default BookingsPage;