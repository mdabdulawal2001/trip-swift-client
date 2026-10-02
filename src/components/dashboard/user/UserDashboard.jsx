"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Ticket,
  UserRound,
  WalletCards,
} from "lucide-react";

import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import QuickActions from "@/components/dashboard/shared/QuickActions";

import { getUserBookings, getUserPayments } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import {
  DashboardPanelSkeleton,
  DashboardStatsSkeleton,
  QuickActionsSkeleton,
} from "../shared/DashboardSkeleton";

export default function UserDashboard() {
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

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        setBookings([]);
        setPayments([]);
        return;
      }

      const [bookingData, paymentData] = await Promise.all([
        getUserBookings(email),
        getUserPayments(email),
      ]);

      setBookings(bookingData?.bookings || []);
      setPayments(paymentData?.payments || []);
    } catch (error) {
      console.error("User dashboard error:", error);

      toast.error(error.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Dynamic Statistics Calculation
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => String(booking.status || "").toLowerCase() === "pending",
  ).length;

  // const completedTrips = bookings.filter((booking) => {
  //   const status = String(booking.status || "").toLowerCase();
  //   return (
  //     status === "paid" || status === "completed" || status === "confirmed"
  //   );
  // }).length;

  const completedTrips = payments.length;

  const totalSpent = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0,
  );
  // Upcoming Journey Calculation
  const upcomingJourney = useMemo(() => {
    const now = Date.now();

    return (
      bookings
        .filter((booking) => {
          const departure = new Date(booking.departureDateTime).getTime();
          const status = String(booking.status || "").toLowerCase();

          return (
            departure > now && status !== "rejected" && status !== "cancelled"
          );
        })
        .sort(
          (a, b) =>
            new Date(a.departureDateTime).getTime() -
            new Date(b.departureDateTime).getTime(),
        )[0] || null
    );
  }, [bookings]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateValue) => {
    if (!dateValue) return "N/A";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "N/A";

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleExport = async () => {
    if (!bookings.length && !payments.length) {
      toast.error("No dashboard data available to export.");
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
      doc.text("Travel Dashboard Report", 25, 26);

      doc.setFontSize(9);
      doc.setTextColor(100, 110, 120);
      doc.text(`Generated: ${formatDate(new Date())}`, 275, 18, {
        align: "right",
      });

      // Summary
      doc.setFontSize(10);
      doc.setTextColor(40, 50, 60);

      doc.text(`Total Bookings: ${totalBookings}`, 25, 38);

      doc.text(`Pending Bookings: ${pendingBookings}`, 90, 38);

      doc.text(`Completed Trips: ${completedTrips}`, 160, 38);

      doc.text(`Total Spent: ৳${totalSpent.toLocaleString()}`, 225, 38);

      // Upcoming Journey
      doc.setFont("NotoSans", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 50, 60);
      doc.text("Upcoming Journey", 25, 50);

      const journeyRows = upcomingJourney
        ? [
            [
              `${upcomingJourney.from || "Unknown"} → ${
                upcomingJourney.to || "Unknown"
              }`,
              upcomingJourney.operator ||
                upcomingJourney.ticketTitle ||
                "Ticket",
              upcomingJourney.type || "Transport",
              String(upcomingJourney.status || "Pending")
                .charAt(0)
                .toUpperCase() +
                String(upcomingJourney.status || "Pending").slice(1),
              formatDate(upcomingJourney.departureDateTime),
              formatTime(upcomingJourney.departureDateTime),
            ],
          ]
        : [["No upcoming journey", "N/A", "N/A", "N/A", "N/A", "N/A"]];

      autoTable(doc, {
        startY: 56,
        head: [
          [
            "Route",
            "Operator / Ticket",
            "Type",
            "Status",
            "Departure Date",
            "Departure Time",
          ],
        ],
        body: journeyRows,
        theme: "grid",
        margin: {
          left: 25,
          right: 25,
        },
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
          0: { cellWidth: 55 },
          1: { cellWidth: 65 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
          4: { cellWidth: 35 },
          5: { cellWidth: 35 },
        },
        didParseCell: (cellData) => {
          cellData.cell.styles.font = "NotoSans";

          if (cellData.section === "head") {
            cellData.cell.styles.fontStyle = "bold";
          }
        },
      });

      // Dashboard summary table
      const summaryStartY = (doc.lastAutoTable?.finalY || 56) + 12;

      doc.setFont("NotoSans", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 50, 60);
      doc.text("Dashboard Summary", 25, summaryStartY);

      autoTable(doc, {
        startY: summaryStartY + 5,
        head: [["Metric", "Value"]],
        body: [
          ["Total Bookings", String(totalBookings)],
          ["Pending Bookings", String(pendingBookings)],
          ["Completed Trips", String(completedTrips)],
          ["Total Spent", `৳${totalSpent.toLocaleString()}`],
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
          `TripSwift • Travel Dashboard • Page ${page} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 8,
          {
            align: "center",
          },
        );
      }

      const fileDate = new Date().toISOString().slice(0, 10);

      doc.save(`tripswift-user-dashboard-${fileDate}.pdf`);

      toast.success("Dashboard PDF downloaded successfully.");
    } catch (error) {
      console.error("User dashboard PDF export error:", error);

      toast.error(error?.message || "Failed to generate dashboard PDF.");
    }
  };

  return (
    <DashboardContainer
      eyebrow="Welcome back"
      title="Your Travel Overview"
      description="Manage your bookings, upcoming journeys and account activity."
      loading={loading}
      actions={
        <button
          type="button"
          onClick={handleExport}
          disabled={!bookings.length && !payments.length}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700 sm:w-fit"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Export PDF
        </button>
      }
    >
      {loading ? (
        <div className="space-y-6">
          {/* Stats */}
          <DashboardStatsSkeleton />

          {/* Upcoming Journey + Quick Actions */}
          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <DashboardPanelSkeleton height="h-52" />

            <QuickActionsSkeleton />
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Ticket />}
              label="Total Bookings"
              value={loading ? "..." : totalBookings}
              change="All bookings"
            />

            <StatCard
              icon={<Clock3 />}
              label="Pending Bookings"
              value={loading ? "..." : pendingBookings}
              change="Needs attention"
            />

            <StatCard
              icon={<CheckCircle2 />}
              label="Completed Trips"
              value={loading ? "..." : completedTrips}
              change="Paid / completed"
            />

            <StatCard
              icon={<WalletCards />}
              label="Total Spent"
              value={loading ? "..." : `৳${totalSpent.toLocaleString()}`}
              change="Paid bookings"
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <SectionTitle
                title="Upcoming Journey"
                action="View bookings"
                href="/dashboard/bookings"
              />

              <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="h-6 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                ) : !upcomingJourney ? (
                  <div className="py-5 text-center">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      No upcoming journey
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Your upcoming confirmed booking will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                        {String(upcomingJourney.status || "Pending")
                          .charAt(0)
                          .toUpperCase() +
                          String(upcomingJourney.status || "Pending").slice(1)}
                      </span>

                      <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                        {upcomingJourney.from || "Unknown"} →{" "}
                        {upcomingJourney.to || "Unknown"}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {upcomingJourney.operator ||
                          upcomingJourney.ticketTitle ||
                          "Ticket"}
                        {" · "}
                        {upcomingJourney.type || "Transport"}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs text-slate-400">Departure</p>

                      <p className="mt-1 font-bold text-slate-900 dark:text-white">
                        {formatDate(upcomingJourney.departureDateTime)}
                      </p>

                      <p className="text-sm text-sky-500">
                        {formatTime(upcomingJourney.departureDateTime)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <QuickActions
              items={[
                {
                  label: "Browse Tickets",
                  href: "/tickets",
                  icon: <Ticket />,
                },
                {
                  label: "My Bookings",
                  href: "/dashboard/bookings",
                  icon: <CalendarDays />,
                },
                {
                  label: "My Profile",
                  href: "/dashboard/profile",
                  icon: <UserRound />,
                },
                {
                  label: "Transactions",
                  href: "/dashboard/transactions",
                  icon: <WalletCards />,
                },
              ]}
            />
          </div>
        </>
      )}
    </DashboardContainer>
  );
}
