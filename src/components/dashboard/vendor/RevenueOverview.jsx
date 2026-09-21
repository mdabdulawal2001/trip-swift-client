"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ArrowUpRight,
  DollarSign,
  Ticket,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getVendorPayments } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function RevenueOverview() {
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

      const data = await getVendorPayments(email);

      setPayments(data?.payments || []);
    } catch (error) {
      console.error(
        "Revenue loading error:",
        error
      );

      toast.error(
        error?.message ||
          "Failed to load revenue data."
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

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, [loadPayments]);

  const totalRevenue = useMemo(() => {
    return payments.reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );
  }, [payments]);

  const currentMonthRevenue = useMemo(() => {
    const now = new Date();

    return payments
      .filter((payment) => {
        const date = new Date(payment.paymentDate);

        return (
          date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth()
        );
      })
      .reduce(
        (total, payment) =>
          total + Number(payment.amount || 0),
        0
      );
  }, [payments]);

  const ticketsSold = useMemo(() => {
    return payments.reduce(
      (total, payment) =>
        total + Number(payment.quantity || 0),
      0
    );
  }, [payments]);

  const averageBooking = useMemo(() => {
    if (!payments.length) return 0;

    return totalRevenue / payments.length;
  }, [payments, totalRevenue]);

  const monthlyRevenue = useMemo(() => {
    const currentDate = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );

      months.push({
        month: date.toLocaleString("en-US", {
          month: "short",
        }),
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        revenue: 0,
      });
    }

    payments.forEach((payment) => {
      const paymentDate = new Date(
        payment.paymentDate
      );

      if (Number.isNaN(paymentDate.getTime())) {
        return;
      }

      const matchedMonth = months.find(
        (item) =>
          item.year === paymentDate.getFullYear() &&
          item.monthIndex === paymentDate.getMonth()
      );

      if (matchedMonth) {
        matchedMonth.revenue += Number(
          payment.amount || 0
        );
      }
    });

    return months;
  }, [payments]);

  const maxRevenue = Math.max(
    ...monthlyRevenue.map(
      (item) => item.revenue
    ),
    1
  );

  const bestRoute = useMemo(() => {
    const routeMap = {};

    payments.forEach((payment) => {
      const route = payment.route ||
        `${payment.from || "Unknown"} → ${
          payment.to || "Unknown"
        }`;

      if (!routeMap[route]) {
        routeMap[route] = {
          route,
          revenue: 0,
          tickets: 0,
        };
      }

      routeMap[route].revenue += Number(
        payment.amount || 0
      );

      routeMap[route].tickets += Number(
        payment.quantity || 0
      );
    });

    return (
      Object.values(routeMap).sort(
        (a, b) => b.revenue - a.revenue
      )[0] || null
    );
  }, [payments]);

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
          Track your ticket sales, earnings and
          business performance.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RevenueStat
          icon={<Wallet className="h-5 w-5" />}
          label="Total Revenue"
          value={
            loading
              ? "..."
              : `৳${totalRevenue.toLocaleString()}`
          }
        />

        <RevenueStat
          icon={<DollarSign className="h-5 w-5" />}
          label="This Month"
          value={
            loading
              ? "..."
              : `৳${currentMonthRevenue.toLocaleString()}`
          }
        />

        <RevenueStat
          icon={<Ticket className="h-5 w-5" />}
          label="Tickets Sold"
          value={
            loading
              ? "..."
              : ticketsSold.toLocaleString()
          }
        />

        <RevenueStat
          icon={<TrendingUp className="h-5 w-5" />}
          label="Avg. Booking"
          value={
            loading
              ? "..."
              : `৳${Math.round(
                  averageBooking
                ).toLocaleString()}`
          }
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
              Monthly revenue based on completed payments
            </p>
          </div>

          <span className="w-fit rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
            Last 6 Months
          </span>
        </div>

        <div className="flex h-72 items-end gap-3 sm:gap-6">
          {monthlyRevenue.map((item, index) => {
            const height =
              item.revenue === 0
                ? 3
                : Math.max(
                    (item.revenue / maxRevenue) *
                      100,
                    8
                  );

            return (
              <div
                key={`${item.year}-${item.monthIndex}`}
                className="flex h-full flex-1 flex-col justify-end"
              >
                <div className="flex h-full items-end justify-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${height}%`,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    className="group relative w-full max-w-14 rounded-t-2xl bg-sky-500 transition hover:bg-sky-600"
                  >
                    <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-lg bg-slate-900 px-2 py-1 text-xs font-semibold text-white group-hover:block">
                      ৳
                      {item.revenue.toLocaleString()}
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

      {/* Bottom */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-bold text-slate-900 dark:text-white">
            Top Performing Route
          </h2>

          {bestRoute ? (
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {bestRoute.route}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {bestRoute.tickets} tickets sold
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-sky-500">
                  ৳
                  {bestRoute.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-5 rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-400 dark:bg-slate-800/60">
              No payment data available yet.
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-bold text-slate-900 dark:text-white">
            Performance Insight
          </h2>

          <div className="mt-5 flex gap-4 rounded-2xl bg-sky-50 p-4 dark:bg-sky-500/10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
              <ArrowUpRight className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Payment-based revenue
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Revenue is calculated only from
                successfully completed payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueStat({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
        {icon}
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}