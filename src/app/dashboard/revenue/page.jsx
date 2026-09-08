"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Ticket,
  TrendingUp,
  Wallet,
} from "lucide-react";

const monthlyRevenue = [
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 56000 },
  { month: "Jun", revenue: 49000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 68000 },
  { month: "Sep", revenue: 89000 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((item) => item.revenue));

export default function RevenuePage() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-sky-500">
          Vendor Dashboard
        </p>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Revenue Overview
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track your ticket sales, earnings and business performance.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RevenueStat
          icon={<Wallet className="h-5 w-5" />}
          label="Total Revenue"
          value="৳376,000"
          change="+18.4%"
          positive
        />

        <RevenueStat
          icon={<DollarSign className="h-5 w-5" />}
          label="This Month"
          value="৳89,000"
          change="+24.8%"
          positive
        />

        <RevenueStat
          icon={<Ticket className="h-5 w-5" />}
          label="Tickets Sold"
          value="486"
          change="+12.6%"
          positive
        />

        <RevenueStat
          icon={<TrendingUp className="h-5 w-5" />}
          label="Avg. Booking"
          value="৳1,240"
          change="-3.2%"
          positive={false}
        />
      </div>

      {/* Chart */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Revenue Performance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monthly revenue for the current period
            </p>
          </div>

          <span className="w-fit rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
            Last 6 Months
          </span>
        </div>

        <div className="flex h-72 items-end gap-3 sm:gap-6">
          {monthlyRevenue.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100;

            return (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col justify-end"
              >
                <div className="flex h-full items-end justify-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    className="group relative w-full max-w-14 rounded-t-2xl bg-sky-500 transition hover:bg-sky-600"
                  >
                    <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-lg bg-slate-900 px-2 py-1 text-xs font-semibold text-white group-hover:block">
                      ৳{item.revenue.toLocaleString()}
                    </div>
                  </motion.div>
                </div>

                <p className="mt-3 text-center text-xs font-medium text-slate-500">
                  {item.month}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom insights */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-bold text-slate-900 dark:text-white">
            Best Performing Route
          </h2>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Dhaka → Cox's Bazar
              </p>

              <p className="mt-1 text-xs text-slate-500">
                128 tickets sold
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-sky-500">৳185,600</p>

              <p className="mt-1 text-xs text-emerald-500">+21.4%</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-bold text-slate-900 dark:text-white">
            Performance Insight
          </h2>

          <div className="mt-5 flex gap-4 rounded-2xl bg-sky-50 p-4 dark:bg-sky-500/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
              <TrendingUp className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Revenue is trending upward
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Your revenue increased by 18.4% compared to the previous
                period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueStat({ icon, label, value, change, positive }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
          {icon}
        </div>

        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}

          {change}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}