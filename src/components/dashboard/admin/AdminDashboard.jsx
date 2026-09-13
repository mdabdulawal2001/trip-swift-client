"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Megaphone,
  Ticket,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import ProgressRow from "@/components/dashboard/shared/ProgressRow";
import Activity from "@/components/dashboard/shared/Activity";

import { getAdminDashboardStats } from "@/lib/api";

import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(
    async () => {
      try {
        setLoading(true);

        const result =
          await getAdminDashboardStats();

        setData(result);
      } catch (error) {
        console.error(
          "Admin dashboard error:",
          error
        );

        toast.error(
          error.message ||
            "Failed to load admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
  }, [loadDashboardData]);

  const stats = data?.stats || {};
  const approvalStats =
    data?.approvalStats || {};

  const activities =
    data?.activities || [];

  const formatActivityTime = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const diff =
      Date.now() - date.getTime();

    const minutes = Math.floor(
      diff / 60000
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours} hour${
        hours !== 1 ? "s" : ""
      } ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    return `${days} day${
      days !== 1 ? "s" : ""
    } ago`;
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

  return (
    <DashboardContainer
      eyebrow="Admin Dashboard"
      title="Platform Overview"
      description="Monitor users, tickets, bookings and platform activity."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users />}
          label="Total Users"
          value={
            loading
              ? "..."
              : stats.totalUsers || 0
          }
          change="Registered users"
        />

        <StatCard
          icon={<UserRound />}
          label="Vendors"
          value={
            loading
              ? "..."
              : stats.vendors || 0
          }
          change="Registered vendors"
        />

        <StatCard
          icon={<Ticket />}
          label="Pending Tickets"
          value={
            loading
              ? "..."
              : stats.pendingTickets || 0
          }
          change="Needs review"
        />

        <StatCard
          icon={<TrendingUp />}
          label="Total Bookings"
          value={
            loading
              ? "..."
              : stats.totalBookings || 0
          }
          change="All bookings"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <SectionTitle
            title="Ticket Approval"
            action="Manage tickets"
            href="/dashboard/manage-tickets"
          />

          <div className="mt-6 space-y-5">
            <ProgressRow
              label="Approved"
              value={`${approvalStats.approved || 0}%`}
              progress={
                approvalStats.approved || 0
              }
            />

            <ProgressRow
              label="Pending"
              value={`${approvalStats.pending || 0}%`}
              progress={
                approvalStats.pending || 0
              }
            />

            <ProgressRow
              label="Rejected"
              value={`${approvalStats.rejected || 0}%`}
              progress={
                approvalStats.rejected || 0
              }
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
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
              activities.map(
                (activity, index) => (
                  <Activity
                    key={`${activity.type}-${activity.createdAt}-${index}`}
                    icon={getActivityIcon(
                      activity.type
                    )}
                    title={activity.title}
                    description={
                      activity.description
                    }
                    time={formatActivityTime(
                      activity.createdAt
                    )}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>

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

function AdminAction({
  href,
  icon,
  title,
  description,
}) {
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
          <h3 className="font-bold text-slate-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <span className="ml-auto">
          <TrendingUp className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-500" />
        </span>
      </div>
    </Link>
  );
}