"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ArrowDownToLine,
  CheckCircle2,
  CreditCard,
  XCircle,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getUserPayments } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function Transactions() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);

      const { data: session } =
        await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        setPayments([]);
        return;
      }

      const data = await getUserPayments(email);

      setPayments(data?.payments || []);
    } catch (error) {
      console.error(
        "Transactions loading error:",
        error
      );

      toast.error(
        error?.message ||
          "Failed to load transactions."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();

    const handleFocus = () => {
      loadPayments();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadPayments();
      }
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadPayments]);

  const totalPaid = payments.reduce(
    (total, payment) =>
      total + Number(payment.amount || 0),
    0
  );

  const successfulPayments = payments.filter(
    (payment) => payment.status === "paid"
  ).length;

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-sky-500">
            Payments
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Transaction History
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            View and track all your ticket payment
            transactions.
          </p>
        </div>

        <button
          type="button"
          className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={CreditCard}
          label="Total Paid"
          value={
            loading
              ? "..."
              : `৳${totalPaid.toLocaleString()}`
          }
        />

        <StatCard
          icon={CheckCircle2}
          label="Successful"
          value={
            loading
              ? "..."
              : String(successfulPayments).padStart(
                  2,
                  "0"
                )
          }
        />

        <StatCard
          icon={XCircle}
          label="Failed"
          value="00"
        />
      </div>

      {/* Desktop Table */}
      <section className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-950">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Transaction
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Ticket
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Date
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Amount
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Method
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <LoadingRows />
              ) : payments.length === 0 ? (
                <EmptyRow />
              ) : (
                payments.map((payment) => (
                  <TransactionRow
                    key={payment._id}
                    payment={payment}
                    formatDate={formatDate}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {loading ? (
          <LoadingCards />
        ) : payments.length === 0 ? (
          <EmptyCard />
        ) : (
          payments.map((payment) => (
            <TransactionCard
              key={payment._id}
              payment={payment}
              formatDate={formatDate}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function TransactionRow({
  payment,
  formatDate,
}) {
  return (
    <tr className="transition hover:bg-slate-50 dark:hover:bg-slate-950">
      <td className="px-5 py-5">
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          {payment.transactionId || "N/A"}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Booking:{" "}
          {String(payment.bookingId || "").slice(
            -8
          )}
        </p>
      </td>

      <td className="px-5 py-5">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {payment.ticketTitle || "Ticket"}
        </p>
      </td>

      <td className="px-5 py-5 text-sm text-slate-500 dark:text-slate-400">
        {formatDate(payment.paymentDate)}
      </td>

      <td className="px-5 py-5">
        <p className="font-bold text-slate-900 dark:text-white">
          ৳{Number(payment.amount || 0).toLocaleString()}
        </p>
      </td>

      <td className="px-5 py-5 text-sm text-slate-500 dark:text-slate-400">
        Stripe
      </td>

      <td className="px-5 py-5">
        <StatusBadge status={payment.status} />
      </td>
    </tr>
  );
}

function TransactionCard({
  payment,
  formatDate,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {payment.transactionId || "N/A"}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Booking:{" "}
            {String(payment.bookingId || "").slice(
              -8
            )}
          </p>
        </div>

        <StatusBadge status={payment.status} />
      </div>

      <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {payment.ticketTitle || "Ticket"}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400">
            Date
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            {formatDate(payment.paymentDate)}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Payment
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            Stripe
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
        <span className="text-xs text-slate-400">
          Amount
        </span>

        <span className="font-bold text-slate-900 dark:text-white">
          ৳{Number(payment.amount || 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const paid = status === "paid";

  return paid ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Paid
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 dark:bg-red-500/10 dark:text-red-400">
      <XCircle className="h-3.5 w-3.5" />
      Failed
    </span>
  );
}

function LoadingRows() {
  return Array.from({ length: 4 }).map((_, index) => (
    <tr key={index}>
      {Array.from({ length: 6 }).map((_, cellIndex) => (
        <td key={cellIndex} className="px-5 py-5">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </td>
      ))}
    </tr>
  ));
}

function LoadingCards() {
  return Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="h-48 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
    />
  ));
}

function EmptyRow() {
  return (
    <tr>
      <td
        colSpan={6}
        className="px-5 py-16 text-center text-sm text-slate-400"
      >
        No payment transactions found.
      </td>
    </tr>
  );
}

function EmptyCard() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400 dark:border-slate-700">
      No payment transactions found.
    </div>
  );
}