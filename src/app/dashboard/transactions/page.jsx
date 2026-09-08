"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Download,
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowDownToLine,
} from "lucide-react";

const transactions = [
  {
    id: "TXN-1001",
    bookingId: "BK-1003",
    route: "Dhaka → Sylhet",
    date: "17 Sep 2026",
    amount: 1300,
    method: "Stripe",
    status: "paid",
  },
  {
    id: "TXN-1002",
    bookingId: "BK-0998",
    route: "Dhaka → Cox's Bazar",
    date: "10 Sep 2026",
    amount: 2900,
    method: "Stripe",
    status: "paid",
  },
  {
    id: "TXN-1003",
    bookingId: "BK-0991",
    route: "Dhaka → Chattogram",
    date: "03 Sep 2026",
    amount: 2200,
    method: "Stripe",
    status: "paid",
  },
  {
    id: "TXN-1004",
    bookingId: "BK-0982",
    route: "Dhaka → Rajshahi",
    date: "28 Aug 2026",
    amount: 780,
    method: "Stripe",
    status: "failed",
  },
];

const TransactionsPage = () => {
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
            View and track all your ticket payment transactions.
          </p>
        </div>

        <button
          type="button"
          className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={CreditCard}
          label="Total Paid"
          value="৳18,450"
        />

        <StatCard
          icon={CheckCircle2}
          label="Successful"
          value="08"
        />

        <StatCard
          icon={XCircle}
          label="Failed"
          value="01"
        />
      </div>

      {/* Desktop Table */}
      <section className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-950">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Transaction
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Journey
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

                <th className="px-5 py-4" />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    </motion.div>
  );
};

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

function TransactionRow({ transaction }) {
  const paid = transaction.status === "paid";

  return (
    <tr className="transition hover:bg-slate-50 dark:hover:bg-slate-950">
      <td className="px-5 py-5">
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          {transaction.id}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {transaction.bookingId}
        </p>
      </td>

      <td className="px-5 py-5">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {transaction.route}
        </p>
      </td>

      <td className="px-5 py-5 text-sm text-slate-500 dark:text-slate-400">
        {transaction.date}
      </td>

      <td className="px-5 py-5">
        <p className="font-bold text-slate-900 dark:text-white">
          ৳{transaction.amount.toLocaleString()}
        </p>
      </td>

      <td className="px-5 py-5 text-sm text-slate-500 dark:text-slate-400">
        {transaction.method}
      </td>

      <td className="px-5 py-5">
        <StatusBadge paid={paid} />
      </td>

      <td className="px-5 py-5">
        {paid && (
          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-sky-500 dark:hover:bg-slate-800">
            <ArrowDownToLine className="h-4 w-4" />
          </button>
        )}
      </td>
    </tr>
  );
}

function TransactionCard({ transaction }) {
  const paid = transaction.status === "paid";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {transaction.id}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {transaction.bookingId}
          </p>
        </div>

        <StatusBadge paid={paid} />
      </div>

      <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {transaction.route}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400">
            Date
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            {transaction.date}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Payment
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            {transaction.method}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
        <span className="text-xs text-slate-400">
          Amount
        </span>

        <span className="font-bold text-slate-900 dark:text-white">
          ৳{transaction.amount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function StatusBadge({ paid }) {
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

export default TransactionsPage;