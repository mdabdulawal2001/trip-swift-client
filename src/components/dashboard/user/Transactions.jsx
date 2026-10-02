"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ArrowDownToLine,
  CheckCircle2,
  CreditCard,
  XCircle,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getUserPayments } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function Transactions() {
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

      const data = await getUserPayments(email);

      setPayments(data?.payments || []);
    } catch (error) {
      console.error("Transactions loading error:", error);

      toast.error(error?.message || "Failed to load transactions.");
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

    window.addEventListener("focus", handleFocus);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loadPayments]);

  const totalPaid = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0,
  );

  const successfulPayments = payments.filter(
    (payment) => payment.status === "paid",
  ).length;

  const handleExport = async () => {
    if (!payments.length) {
      toast.error("No transactions available to export.");
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // --------------------------------
      // Load Unicode Fonts
      // --------------------------------
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

      // Use Unicode font everywhere
      doc.setFont("NotoSans", "normal");

      const pageWidth = doc.internal.pageSize.getWidth();

      // --------------------------------
      // Header
      // --------------------------------
      doc.setFont("NotoSans", "bold");
      doc.setFontSize(22);
      doc.setTextColor(27, 142, 217);

      doc.text("TripSwift", 25, 18);

      doc.setFont("NotoSans", "normal");
      doc.setFontSize(12);
      doc.setTextColor(80, 90, 105);

      doc.text("Transaction History", 25, 26);

      // --------------------------------
      // Export Date
      // --------------------------------
      doc.setFontSize(9);
      doc.setTextColor(100, 110, 120);

      doc.text(`Generated: ${formatDate(new Date())}`, 256, 18, {
        align: "right",
      });

      // --------------------------------
      // Summary
      // --------------------------------
      doc.setFontSize(10);
      doc.setTextColor(40, 50, 60);

      doc.text(`Total Paid: BDT ${totalPaid.toLocaleString()}`, 25, 38);

      doc.text(`Successful Transactions: ${successfulPayments}`, 25, 45);

      // --------------------------------
      // Table Data
      // --------------------------------
      const tableRows = payments.map((payment, index) => [
        String(index + 1),
        payment.transactionId || "N/A",
        payment.bookingId ? String(payment.bookingId) : "N/A",
        payment.ticketTitle || "Ticket",
        formatDate(payment.paymentDate),
        `BDT ${Number(payment.amount || 0).toLocaleString()}`,
        "Stripe",
        payment.status || "N/A",
      ]);

      // --------------------------------
      // Transaction Table
      // --------------------------------
      autoTable(doc, {
        startY: 54,

        head: [
          [
            "#",
            "Transaction ID",
            "Booking ID",
            "Ticket",
            "Payment Date",
            "Amount",
            "Method",
            "Status",
          ],
        ],

        body: tableRows,

        theme: "grid",

        tableWidth: "auto",

        margin: {
          left: 25,
          right: 25,
          bottom: 16,
        },
        rowPageBreak: "avoid",
        showHead: "everyPage",

        styles: {
          font: "NotoSans",
          fontStyle: "normal",
          fontSize: 8,
          cellPadding: 2.5,
          valign: "middle",
          overflow: "linebreak",
          textColor: [40, 45, 50],
        },

        headStyles: {
          font: "NotoSans",
          fontStyle: "bold",
          fontSize: 8,
          fillColor: [27, 142, 217],
          textColor: [255, 255, 255],
          halign: "left",
        },

        columnStyles: {
          0: { cellWidth: 9, halign: "center" },

          // Transaction ID
          1: {
            cellWidth: 35,
          },

          // Booking ID
          2: {
            cellWidth: 35,
          },

          // Ticket
          3: {
            cellWidth: 50,
          },

          // Payment Date
          4: {
            cellWidth: 30,
          },

          // Amount
          5: {
            cellWidth: 28,
          },

          // Method
          6: {
            cellWidth: 22,
          },

          // Status
          7: {
            cellWidth: 22,
          },
        },

        didParseCell: (data) => {
          // Keep everything Unicode-compatible
          data.cell.styles.font = "NotoSans";

          if (data.section === "head") {
            data.cell.styles.fontStyle = "bold";
          }

          // Status column
          if (data.section === "body" && data.column.index === 7) {
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.halign = "center";
          }
        },
      });

      // --------------------------------
      // Footer
      // --------------------------------
      const pageCount = doc.internal.getNumberOfPages();

      for (let page = 1; page <= pageCount; page++) {
        doc.setPage(page);

        const pageHeight = doc.internal.pageSize.getHeight();

        doc.setFont("NotoSans", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 125, 130);

        doc.text(
          `TripSwift • Transaction History • Page ${page} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 8,
          {
            align: "center",
          },
        );
      }

      // --------------------------------
      // Save PDF
      // --------------------------------
      const fileDate = new Date().toISOString().slice(0, 10);

      doc.save(`tripswift-transactions-${fileDate}.pdf`);

      toast.success("Transaction PDF downloaded successfully.");
    } catch (error) {
      console.error("Transaction PDF export error:", error);

      toast.error(error?.message || "Failed to generate transaction PDF.");
    }
  };

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
        {loading ? (
          <div className="min-w-0 flex-1">
            <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-9 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 sm:w-72" />
            <div className="mt-2 h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-sky-500">Payments</p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Transaction History
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              View and track all your ticket payment transactions.
            </p>
          </div>
        )}

        {loading ? (
          <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 sm:w-28" />
        ) : (
          <button
            type="button"
            onClick={handleExport}
            disabled={payments.length === 0}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700 sm:w-fit"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Export
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={CreditCard}
          label="Total Paid"
          value={loading ? "..." : `৳${totalPaid.toLocaleString()}`}
          loading={loading}
        />

        <StatCard
          icon={CheckCircle2}
          label="Successful"
          value={loading ? "..." : String(successfulPayments).padStart(2, "0")}
          loading={loading}
        />

        <StatCard icon={XCircle} label="Failed" value="00" loading={loading} />
      </div>

      {/* Desktop Table */}
      <section className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800! dark:bg-slate-900 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-800 dark:bg-slate-950!">
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

function StatCard({ icon: Icon, label, value, loading }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-4 text-xs text-slate-400">{label}</p>

      {loading ? (
        <div className="mt-2 h-7 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      ) : (
        <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      )}
    </div>
  );
}

function TransactionRow({ payment, formatDate }) {
  return (
    <tr className="transition hover:bg-slate-50 dark:hover:bg-slate-950">
      <td className="px-5 py-5">
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          {payment.transactionId || "N/A"}
        </p>

        <p
          className="mt-1 max-w-55 truncate text-xs text-slate-400"
          title={String(payment.bookingId || "")}
        >
          Booking ID: {payment.bookingId || "N/A"}
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

function TransactionCard({ payment, formatDate }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {payment.transactionId || "N/A"}
          </p>

          <p
            className="mt-1 break-all text-xs text-slate-400"
            title={String(payment.bookingId || "")}
          >
            Booking ID: {payment.bookingId || "N/A"}
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
          <p className="text-xs text-slate-400">Date</p>

          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            {formatDate(payment.paymentDate)}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Payment</p>

          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            Stripe
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
        <span className="text-xs text-slate-400">Amount</span>

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
      <td colSpan={6} className="px-5 py-16 text-center text-sm text-slate-400">
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
