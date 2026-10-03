"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ArrowDownToLine,
  ArrowUpRight,
  DollarSign,
  Ticket,
  TrendingUp,
  Wallet,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getVendorPayments } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import RevenueSkeleton from "./vendorSkeletons/RevenueSkeleton";

export default function RevenueOverview() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);

      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        setPayments([]);
        return;
      }

      const data = await getVendorPayments(email);

      setPayments(data?.payments || []);
    } catch (error) {
      console.error("Revenue loading error:", error);

      toast.error(error?.message || "Failed to load revenue data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();

    const handleFocus = () => {
      loadPayments();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [loadPayments]);

  const totalRevenue = useMemo(() => {
    return payments.reduce(
      (total, payment) => total + Number(payment.amount || 0),
      0,
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
      .reduce((total, payment) => total + Number(payment.amount || 0), 0);
  }, [payments]);

  const ticketsSold = useMemo(() => {
    return payments.reduce(
      (total, payment) => total + Number(payment.quantity || 0),
      0,
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
        1,
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
      const paymentDate = new Date(payment.paymentDate);

      if (Number.isNaN(paymentDate.getTime())) {
        return;
      }

      const matchedMonth = months.find(
        (item) =>
          item.year === paymentDate.getFullYear() &&
          item.monthIndex === paymentDate.getMonth(),
      );

      if (matchedMonth) {
        matchedMonth.revenue += Number(payment.amount || 0);
      }
    });

    return months;
  }, [payments]);

  const maxRevenue = Math.max(...monthlyRevenue.map((item) => item.revenue), 1);

  const bestRoute = useMemo(() => {
    const routeMap = {};

    payments.forEach((payment) => {
      const route =
        payment.route ||
        `${payment.from || "Unknown"} → ${payment.to || "Unknown"}`;

      if (!routeMap[route]) {
        routeMap[route] = {
          route,
          revenue: 0,
          tickets: 0,
        };
      }

      routeMap[route].revenue += Number(payment.amount || 0);

      routeMap[route].tickets += Number(payment.quantity || 0);
    });

    return (
      Object.values(routeMap).sort((a, b) => b.revenue - a.revenue)[0] || null
    );
  }, [payments]);

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

  const handleExport = async () => {
    if (!payments.length) {
      toast.error("No revenue data available to export.");
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const loadFontAsBase64 = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to load font: ${url}`);
        }

        const buffer = await response.arrayBuffer();

        let binary = "";
        const bytes = new Uint8Array(buffer);
        const chunkSize = 0x8000;

        for (let i = 0; i < bytes.length; i += chunkSize) {
          const chunk = bytes.subarray(i, i + chunkSize);
          binary += String.fromCharCode(...chunk);
        }

        return btoa(binary);
      };

      const regularFont = await loadFontAsBase64("/fonts/NotoSans-Regular.ttf");

      const boldFont = await loadFontAsBase64("/fonts/NotoSans-Bold.ttf");

      doc.addFileToVFS("NotoSans-Regular.ttf", regularFont);
      doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal", "Identity-H");

      doc.addFileToVFS("NotoSans-Bold.ttf", boldFont);
      doc.addFont("NotoSans-Bold.ttf", "NotoSans", "bold", "Identity-H");

      doc.setFont("NotoSans", "normal");

      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = 110;
      const contentLeft = (pageWidth - contentWidth) / 2;
      const contentRight = contentLeft + contentWidth;

      // Header
      doc.setFont("NotoSans", "bold");
      doc.setFontSize(22);
      doc.setTextColor(27, 142, 217);
      doc.text("TripSwift", contentLeft, 18);

      doc.setFont("NotoSans", "normal");
      doc.setFontSize(12);
      doc.setTextColor(80, 90, 105);
      doc.text("Revenue Overview", contentLeft, 26);

      doc.setFontSize(9);
      doc.setTextColor(100, 110, 120);
      doc.text(`Generated: ${formatDate(new Date())}`, contentLeft, 38);

      // Revenue summary
      const summaryRows = [
        ["Total Revenue", `৳${totalRevenue.toLocaleString()}`],
        ["This Month", `৳${currentMonthRevenue.toLocaleString()}`],
        ["Tickets Sold", ticketsSold.toLocaleString()],
        ["Average Booking", `৳${Math.round(averageBooking).toLocaleString()}`],
      ];

      summaryRows.forEach(([label, value], index) => {
        const rowY = 46 + index * 6;

        doc.setFont("NotoSans", "normal");
        doc.setFontSize(9);
        doc.setTextColor(100, 110, 120);
        doc.text(label, contentLeft, rowY);

        doc.setFont("NotoSans", "bold");
        doc.setTextColor(40, 50, 60);
        doc.text(value, contentRight, rowY, { align: "right" });

        if (index < summaryRows.length - 1) {
          doc.setDrawColor(225, 230, 235);
          doc.line(contentLeft, rowY + 2, contentRight, rowY + 2);
        }
      });

      // Monthly revenue
      doc.setFont("NotoSans", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 50, 60);
      doc.text("Revenue Performance — Last 6 Months", contentLeft, 78);

      const revenueRows = monthlyRevenue.map((item) => [
        `${item.month} ${item.year}`,
        `৳${item.revenue.toLocaleString()}`,
      ]);

      autoTable(doc, {
        startY: 84,
        head: [["Month", "Revenue"]],
        body: revenueRows,
        theme: "grid",
        margin: {
          left: contentLeft,
          right: pageWidth - contentRight,
        },
        tableWidth: contentWidth,
        styles: {
          font: "NotoSans",
          fontStyle: "normal",
          fontSize: 9,
          cellPadding: 3,
          valign: "middle",
          textColor: [40, 45, 50],
        },
        headStyles: {
          font: "NotoSans",
          fontStyle: "bold",
          fillColor: [27, 142, 217],
          textColor: [255, 255, 255],
        },
        didParseCell: (cellData) => {
          cellData.cell.styles.font = "NotoSans";

          if (cellData.section === "head") {
            cellData.cell.styles.fontStyle = "bold";
          }
        },
      });

      // Top route
      const routeStartY = (doc.lastAutoTable?.finalY || 56) + 12;

      doc.setFont("NotoSans", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 50, 60);
      doc.text("Top Performing Route", contentLeft, routeStartY);

      autoTable(doc, {
        startY: routeStartY + 5,
        head: [["Route", "Tickets Sold", "Revenue"]],
        body: [
          bestRoute
            ? [
                bestRoute.route,
                String(bestRoute.tickets),
                `৳${bestRoute.revenue.toLocaleString()}`,
              ]
            : ["No payment data available", "0", "৳0"],
        ],
        theme: "grid",
        margin: {
          left: contentLeft,
          right: pageWidth - contentRight,
        },
        tableWidth: contentWidth,
        styles: {
          font: "NotoSans",
          fontStyle: "normal",
          fontSize: 8,
          cellPadding: 3,
          valign: "middle",
          overflow: "linebreak",
          textColor: [40, 45, 50],
        },
        headStyles: {
          font: "NotoSans",
          fontStyle: "bold",
          fillColor: [27, 142, 217],
          textColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 26 },
          2: { cellWidth: 34 },
        },
        didParseCell: (cellData) => {
          cellData.cell.styles.font = "NotoSans";

          if (cellData.section === "head") {
            cellData.cell.styles.fontStyle = "bold";
          }
        },
      });

      // Footer
      const pageCount = doc.internal.getNumberOfPages();

      for (let page = 1; page <= pageCount; page++) {
        doc.setPage(page);

        const pageHeight = doc.internal.pageSize.getHeight();

        doc.setFont("NotoSans", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 125, 130);

        doc.text(
          `TripSwift • Revenue Overview • Page ${page} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 8,
          {
            align: "center",
          },
        );
      }

      const fileDate = new Date().toISOString().slice(0, 10);

      doc.save(`tripswift-revenue-overview-${fileDate}.pdf`);

      toast.success("Revenue PDF downloaded successfully.");
    } catch (error) {
      console.error("Revenue PDF export error:", error);

      toast.error(error?.message || "Failed to generate revenue PDF.");
    }
  };

  if (loading) {
    return <RevenueSkeleton />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
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
        <button
          type="button"
          onClick={handleExport}
          disabled={payments.length === 0}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700 sm:w-fit"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Export PDF
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RevenueStat
          icon={<Wallet className="h-5 w-5" />}
          label="Total Revenue"
          value={loading ? "..." : `৳${totalRevenue.toLocaleString()}`}
        />

        <RevenueStat
          icon={<DollarSign className="h-5 w-5" />}
          label="This Month"
          value={loading ? "..." : `৳${currentMonthRevenue.toLocaleString()}`}
        />

        <RevenueStat
          icon={<Ticket className="h-5 w-5" />}
          label="Tickets Sold"
          value={loading ? "..." : ticketsSold.toLocaleString()}
        />

        <RevenueStat
          icon={<TrendingUp className="h-5 w-5" />}
          label="Avg. Booking"
          value={
            loading ? "..." : `৳${Math.round(averageBooking).toLocaleString()}`
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
                : Math.max((item.revenue / maxRevenue) * 100, 8);

            return (
              <div
                key={`${item.year}-${item.monthIndex}`}
                className="group relative flex h-full flex-1 flex-col justify-end"
              >
                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 translate-y-1 rounded-xl bg-slate-900 px-3 py-2 text-center text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white dark:text-slate-900">
                  <p className="whitespace-nowrap font-semibold">
                    {item.month} {item.year}
                  </p>

                  <p className="mt-0.5 whitespace-nowrap text-slate-300 dark:text-slate-500">
                    ৳{item.revenue.toLocaleString()}
                  </p>

                  {/* Tooltip Arrow */}
                  <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-slate-900 dark:bg-white" />
                </div>

                {/* Bar */}
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
                    className="w-full max-w-14 rounded-t-2xl bg-sky-500 transition hover:bg-sky-600"
                  />
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
                  ৳{bestRoute.revenue.toLocaleString()}
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
                Revenue is calculated only from successfully completed payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueStat({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900 sm:text-left">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400 sm:mx-0">
        {icon}
      </div>

      <p className="mt-5 text-sm text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}
