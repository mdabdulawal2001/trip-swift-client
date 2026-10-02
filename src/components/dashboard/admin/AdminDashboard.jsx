"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  Megaphone,
  Ticket,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";

import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import ProgressRow from "@/components/dashboard/shared/ProgressRow";
import Activity from "@/components/dashboard/shared/Activity";

import { getAdminDashboardStats } from "@/lib/api";

import Link from "next/link";
import {
  ActivityListSkeleton,
  DashboardPanelSkeleton,
  DashboardStatsSkeleton,
} from "../shared/DashboardSkeleton";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getAdminDashboardStats();

      setData(result);
    } catch (error) {
      console.error("Admin dashboard error:", error);

      toast.error(error.message || "Failed to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();

    const handleFocus = () => {
      loadDashboardData();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadDashboardData();
      }
    };

    window.addEventListener("focus", handleFocus);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loadDashboardData]);

  const stats = data?.stats || {};

  const approvalStats = data?.approvalStats || {
    approved: 0,
    pending: 0,
    rejected: 0,
  };

  const activities = data?.activities || [];

  const formatCurrency = (amount) => {
    return `৳${Number(amount || 0).toLocaleString("en-BD")}`;
  };

  const formatActivityTime = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const diff = Date.now() - date.getTime();

    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} day${days !== 1 ? "s" : ""} ago`;
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

  const handleExport = async () => {
    if (!data) {
      toast.error("Dashboard data is not available to export.");
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
      doc.text("Admin Dashboard Report", 25, 26);

      doc.setFontSize(9);
      doc.setTextColor(100, 110, 120);
      doc.text(`Generated: ${formatDate(new Date())}`, pageWidth - 25, 18, {
        align: "right",
      });

      // Summary
      doc.setFontSize(10);
      doc.setTextColor(40, 50, 60);

      doc.text(`Total Users: ${stats.totalUsers || 0}`, 25, 38);

      doc.text(`Vendors: ${stats.vendors || 0}`, 80, 38);

      doc.text(`Total Revenue: ${formatCurrency(stats.totalRevenue)}`, 130, 38);

      doc.text(`Total Bookings: ${stats.totalBookings || 0}`, 205, 38);

      // Approval table
      autoTable(doc, {
        startY: 48,
        head: [["Ticket Approval Status", "Percentage"]],
        body: [
          ["Approved", `${approvalStats.approved || 0}%`],
          ["Pending", `${approvalStats.pending || 0}%`],
          ["Rejected", `${approvalStats.rejected || 0}%`],
        ],
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

      const activityStartY = (doc.lastAutoTable?.finalY || 48) + 10;

      // Activity title
      doc.setFont("NotoSans", "bold");
      doc.setFontSize(12);
      doc.setTextColor(40, 50, 60);
      doc.text("Recent Platform Activity", 25, activityStartY);

      const activityRows = activities.length
        ? activities.map((activity) => [
            activity.title || "Activity",
            activity.description || "N/A",
            formatDate(activity.createdAt),
            formatActivityTime(activity.createdAt) || "N/A",
          ])
        : [["No recent activity", "N/A", "N/A", "N/A"]];

      autoTable(doc, {
        startY: activityStartY + 5,
        head: [["Activity", "Description", "Date", "Time"]],
        body: activityRows,
        theme: "grid",
        margin: {
          left: 25,
          right: 25,
        },
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
          fillColor: [27, 142, 217],
          textColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: 55 },
          1: { cellWidth: 95 },
          2: { cellWidth: 35 },
          3: { cellWidth: 35 },
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
          `TripSwift • Admin Dashboard • Page ${page} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 8,
          {
            align: "center",
          },
        );
      }

      const fileDate = new Date().toISOString().slice(0, 10);

      doc.save(`tripswift-admin-dashboard-${fileDate}.pdf`);

      toast.success("Admin dashboard PDF downloaded successfully.");
    } catch (error) {
      console.error("Admin dashboard PDF export error:", error);

      toast.error(error?.message || "Failed to generate admin dashboard PDF.");
    }
  };

  const getActivityIcon = (type) => {
    if (type === "vendor") {
      return <UserRound />;
    }

    if (type === "ticket") {
      return <Ticket />;
    }

    return <TrendingUp />;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <DashboardContainer
      eyebrow="Admin Dashboard"
      title="Platform Overview"
      description="Monitor users, tickets, bookings and platform activity."
      loading={loading}
      actions={
        <button
          type="button"
          onClick={handleExport}
          disabled={!data}
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

          {/* Approval + Activity */}
          <div className="grid gap-6 xl:grid-cols-2">
            <DashboardPanelSkeleton height="h-64" />

            <div
              className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              dark:border-slate-800
              dark:bg-slate-900
            "
            >
              <div className="flex items-center justify-between">
                <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

                <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="mt-6">
                <ActivityListSkeleton count={3} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                dark:border-slate-800!
                dark:bg-slate-900
              "
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />

                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

                    <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </div>

                  <div className="h-4 w-4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Users />}
              label="Total Users"
              value={loading ? "..." : stats.totalUsers || 0}
              change="Registered users"
            />

            <StatCard
              icon={<UserRound />}
              label="Vendors"
              value={loading ? "..." : stats.vendors || 0}
              change="Registered vendors"
            />

            <StatCard
              icon={<WalletCards />}
              label="Total Revenue"
              value={loading ? "..." : formatCurrency(stats.totalRevenue)}
              change="From successful payments"
            />

            <StatCard
              icon={<Ticket />}
              label="Total Bookings"
              value={loading ? "..." : stats.totalBookings || 0}
              change="All bookings"
            />
          </div>

          {/* Approval + Activity */}
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {/* Ticket Approval */}
            <motion.div
              whileHover={{
                y: -4,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900"
            >
              <SectionTitle
                title="Ticket Approval"
                action="Manage tickets"
                href="/dashboard/manage-tickets"
              />

              <div className="mt-6 space-y-5">
                <ProgressRow
                  label="Approved"
                  value={`${approvalStats.approved || 0}%`}
                  progress={approvalStats.approved || 0}
                />

                <ProgressRow
                  label="Pending"
                  value={`${approvalStats.pending || 0}%`}
                  progress={approvalStats.pending || 0}
                />

                <ProgressRow
                  label="Rejected"
                  value={`${approvalStats.rejected || 0}%`}
                  progress={approvalStats.rejected || 0}
                />
              </div>
            </motion.div>

            {/* Platform Activity */}
            <motion.div
              whileHover={{
                y: -4,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900"
            >
              <SectionTitle
                title="Platform Activity"
                action="Manage users"
                href="/dashboard/manage-users"
              />

              <div className="mt-6 space-y-4">
                {loading ? (
                  <>
                    <ActivitySkeleton />
                    <ActivitySkeleton />
                    <ActivitySkeleton />
                  </>
                ) : activities.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-6 text-center dark:bg-slate-800/60">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      No recent activity.
                    </p>
                  </div>
                ) : (
                  activities.map((activity, index) => (
                    <Activity
                      key={`${activity.type}-${activity.createdAt}-${index}`}
                      icon={getActivityIcon(activity.type)}
                      title={activity.title}
                      description={activity.description}
                      time={formatActivityTime(activity.createdAt)}
                    />
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <AdminAction
              href="/dashboard/manage-tickets"
              icon={<Ticket />}
              title="Manage Tickets"
              description="Review approvals"
            />

            <AdminAction
              href="/dashboard/manage-users"
              icon={<Users />}
              title="Manage Users"
              description="Control accounts"
            />

            <AdminAction
              href="/dashboard/advertise"
              icon={<Megaphone />}
              title="Advertise Tickets"
              description="Feature up to 6"
            />
          </div>
        </>
      )}
    </DashboardContainer>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex gap-3">
      <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

        <div className="h-3 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

function AdminAction({ href, icon, title, description }) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-900"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-500 dark:bg-sky-500/10">
          {icon}
        </div>

        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>

          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <span className="ml-auto">
          <TrendingUp className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-500" />
        </span>
      </div>
    </Link>
  );
}
