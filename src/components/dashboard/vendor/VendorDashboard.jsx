"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowDownToLine,
  BarChart3,
  CheckCircle2,
  Clock3,
  DollarSign,
  FilePlus2,
  Ticket,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import toast from "react-hot-toast";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import QuickActions from "@/components/dashboard/shared/QuickActions";
import RecentBookingRequests from "@/components/dashboard/vendor/RecentBookingRequests";
import {
  DashboardHeaderSkeleton,
  DashboardStatsSkeleton,
  DashboardPanelSkeleton,
  QuickActionsSkeleton,
  ActivityListSkeleton,
} from "@/components/dashboard/shared/DashboardSkeleton";
import {
  getVendorTickets,
  getVendorBookings,
  getVendorPayments,
} from "@/lib/api";

import { authClient } from "@/lib/auth-client";

export default function VendorDashboard() {
  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;
      console.log("Vendor Dashboard Session Email:", email);

      if (!email) {
        return;
      }

      const [ticketData, bookingData, paymentData] = await Promise.all([
        getVendorTickets(email),
        getVendorBookings(email),
        getVendorPayments(email),
      ]);

      setTickets(ticketData?.tickets || []);
      setBookings(bookingData?.bookings || []);
      setPayments(paymentData?.payments || []);
    } catch (error) {
      console.error("Vendor dashboard error:", error);

      toast.error(error.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    const handleFocus = () => {
      loadDashboardData();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const totalTickets = tickets.length;

  const activeTickets = tickets.filter(
    (ticket) => ticket.status === "approved",
  ).length;

  const pendingRequests = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;

  const totalRevenue = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0,
  );

  const monthlyTicketData = useMemo(() => {
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
        count: 0,
      });
    }

    tickets.forEach((ticket) => {
      if (!ticket.createdAt) return;

      const createdDate = new Date(ticket.createdAt);

      if (Number.isNaN(createdDate.getTime())) {
        return;
      }

      const matchedMonth = months.find(
        (item) =>
          item.year === createdDate.getFullYear() &&
          item.monthIndex === createdDate.getMonth(),
      );

      if (matchedMonth) {
        matchedMonth.count += 1;
      }
    });

    return months;
  }, [tickets]);

  const maxTicketCount = Math.max(
    ...monthlyTicketData.map((item) => item.count),
    1,
  );

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
    if (!tickets.length && !bookings.length && !payments.length) {
      toast.error("No vendor data available to export.");
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

      // Header
      doc.setFont("NotoSans", "bold");
      doc.setFontSize(22);
      doc.setTextColor(27, 142, 217);
      doc.text("TripSwift", 25, 18);

      doc.setFont("NotoSans", "normal");
      doc.setFontSize(12);
      doc.setTextColor(80, 90, 105);
      doc.text("Vendor Dashboard Report", 25, 26);

      doc.setFontSize(9);
      doc.setTextColor(100, 110, 120);
      doc.text(`Generated: ${formatDate(new Date())}`, pageWidth - 25, 18, {
        align: "right",
      });

      // Summary
      doc.setFontSize(10);
      doc.setTextColor(40, 50, 60);

      doc.text(`Total Tickets: ${totalTickets}`, 25, 38);

      doc.text(`Active Tickets: ${activeTickets}`, 90, 38);

      doc.text(`Pending Requests: ${pendingRequests}`, 155, 38);

      doc.text(`Total Revenue: ৳${totalRevenue.toLocaleString()}`, 225, 38);

      // Monthly ticket data
      doc.setFont("NotoSans", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 50, 60);
      doc.text("Tickets Added — Last 6 Months", 25, 50);

      const ticketRows = monthlyTicketData.map((item) => [
        `${item.month} ${item.year}`,
        String(item.count),
      ]);

      autoTable(doc, {
        startY: 56,
        head: [["Month", "Tickets Added"]],
        body: ticketRows,
        theme: "grid",
        margin: {
          left: 25,
          right: 25,
        },
        tableWidth: 100,
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

      // Additional summary table
      const summaryStartY = (doc.lastAutoTable?.finalY || 56) + 12;

      doc.setFont("NotoSans", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 50, 60);
      doc.text("Business Summary", 25, summaryStartY);

      autoTable(doc, {
        startY: summaryStartY + 5,
        head: [["Metric", "Value"]],
        body: [
          ["Total Tickets", String(totalTickets)],
          ["Active Tickets", String(activeTickets)],
          ["Pending Booking Requests", String(pendingRequests)],
          ["Total Revenue", `৳${totalRevenue.toLocaleString()}`],
          ["Total Bookings", String(bookings.length)],
          ["Payment Records", String(payments.length)],
        ],
        theme: "grid",
        margin: {
          left: 25,
          right: 25,
        },
        tableWidth: 130,
        styles: {
          font: "NotoSans",
          fontStyle: "normal",
          fontSize: 8,
          cellPadding: 2.5,
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

      // Footer
      const pageCount = doc.internal.getNumberOfPages();

      for (let page = 1; page <= pageCount; page++) {
        doc.setPage(page);

        const pageHeight = doc.internal.pageSize.getHeight();

        doc.setFont("NotoSans", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 125, 130);

        doc.text(
          `TripSwift • Vendor Dashboard • Page ${page} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 8,
          {
            align: "center",
          },
        );
      }

      const fileDate = new Date().toISOString().slice(0, 10);

      doc.save(`tripswift-vendor-dashboard-${fileDate}.pdf`);

      toast.success("Vendor dashboard PDF downloaded successfully.");
    } catch (error) {
      console.error("Vendor dashboard PDF export error:", error);

      toast.error(error?.message || "Failed to generate vendor dashboard PDF.");
    }
  };

  return (
    <DashboardContainer
      eyebrow="Vendor Dashboard"
      title="Business Overview"
      description="Track your tickets, booking requests and revenue performance."
      loading={loading}
      actions={
        <button
          type="button"
          onClick={handleExport}
          disabled={!tickets.length && !bookings.length && !payments.length}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700 sm:w-fit"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Export PDF
        </button>
      }
    >
      {loading ? (
        <div className="space-y-6">
          <DashboardStatsSkeleton />

          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <DashboardPanelSkeleton height="h-64" />

            <QuickActionsSkeleton />
          </div>

          <DashboardPanelSkeleton height="h-72" />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Ticket />}
              label="Total Tickets"
              value={loading ? "..." : totalTickets}
              change="All added tickets"
            />

            <StatCard
              icon={<CheckCircle2 />}
              label="Active Tickets"
              value={loading ? "..." : activeTickets}
              change="Approved tickets"
            />

            <StatCard
              icon={<Clock3 />}
              label="Pending Requests"
              value={loading ? "..." : pendingRequests}
              change="Needs attention"
            />

            <StatCard
              icon={<DollarSign />}
              label="Total Revenue"
              value={loading ? "..." : `৳${totalRevenue.toLocaleString()}`}
              change="Paid bookings"
            />
          </div>
          {/* Chart + Quick Actions */}{" "}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            {" "}
            {/* Tickets Added Chart */}{" "}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              {" "}
              <SectionTitle
                title="Tickets Added"
                action="View tickets"
                href="/dashboard/my-tickets"
              />{" "}
              <div className="mt-8 flex h-52 items-end gap-3 sm:gap-5">
                {" "}
                {monthlyTicketData.map((item, index) => {
                  const height =
                    item.count === 0
                      ? 4
                      : Math.max((item.count / maxTicketCount) * 100, 8);
                  return (
                    <div
                      key={`${item.year}-${item.monthIndex}`}
                      className="group relative flex h-full flex-1 items-end justify-center"
                    >
                      {" "}
                      {/* Tooltip */}{" "}
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 translate-y-1 rounded-xl bg-slate-900 px-3 py-2 text-center text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white dark:text-slate-900">
                        {" "}
                        <p className="whitespace-nowrap font-semibold">
                          {" "}
                          {item.month} {item.year}{" "}
                        </p>{" "}
                        <p className="mt-0.5 whitespace-nowrap text-slate-300 dark:text-slate-500">
                          {" "}
                          {item.count}{" "}
                          {item.count === 1 ? "ticket" : "tickets"}{" "}
                        </p>{" "}
                        {/* Tooltip Arrow */}{" "}
                        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-slate-900 dark:bg-white" />{" "}
                      </div>{" "}
                      {/* Animated Bar */}{" "}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: `${height}%`, opacity: 1 }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full max-w-12 origin-bottom rounded-t-xl bg-sky-500 transition-colors duration-200 group-hover:bg-sky-600"
                        title={`${item.month}: ${item.count} ticket${item.count !== 1 ? "s" : ""}`}
                      />{" "}
                    </div>
                  );
                })}{" "}
              </div>{" "}
              <div className="mt-3 flex justify-between text-xs text-slate-400">
                {" "}
                {monthlyTicketData.map((item) => (
                  <span key={`${item.year}-${item.monthIndex}-label`}>
                    {" "}
                    {item.month}{" "}
                  </span>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            {/* Quick Actions */}{" "}
            <QuickActions
              items={[
                {
                  label: "Add New Ticket",
                  href: "/dashboard/add-ticket",
                  icon: <FilePlus2 />,
                },
                {
                  label: "My Added Tickets",
                  href: "/dashboard/my-tickets",
                  icon: <Ticket />,
                },
                {
                  label: "Booking Requests",
                  href: "/dashboard/requested-bookings",
                  icon: <Clock3 />,
                },
                {
                  label: "Revenue Overview",
                  href: "/dashboard/revenue",
                  icon: <BarChart3 />,
                },
              ]}
            />{" "}
          </div>
          {/* Recent Booking Requests */}
          <RecentBookingRequests />
        </>
      )}
    </DashboardContainer>
  );
}
