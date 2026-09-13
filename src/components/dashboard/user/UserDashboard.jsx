"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Ticket,
  UserRound,
  WalletCards,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import QuickActions from "@/components/dashboard/shared/QuickActions";

import { getUserBookings } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const { data: session } =
        await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        setBookings([]);
        return;
      }

      const data = await getUserBookings(email);

      setBookings(data?.bookings || []);
    } catch (error) {
      console.error(
        "User dashboard error:",
        error
      );

      toast.error(
        error.message ||
          "Failed to load dashboard data."
      );
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

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) =>
      String(booking.status).toLowerCase() ===
      "pending"
  ).length;

  const completedTrips = bookings.filter(
    (booking) => {
      const status = String(
        booking.status || ""
      ).toLowerCase();

      return (
        status === "paid" ||
        status === "completed"
      );
    }
  ).length;

  const totalSpent = bookings
    .filter(
      (booking) =>
        String(
          booking.paymentStatus || ""
        ).toLowerCase() === "paid"
    )
    .reduce(
      (total, booking) =>
        total +
        Number(booking.totalPrice || 0),
      0
    );

  const upcomingJourney = useMemo(() => {
    const now = Date.now();

    return (
      bookings
        .filter((booking) => {
          const departure = new Date(
            booking.departureDateTime
          ).getTime();

          const status = String(
            booking.status || ""
          ).toLowerCase();

          return (
            departure > now &&
            status !== "rejected"
          );
        })
        .sort(
          (a, b) =>
            new Date(a.departureDateTime).getTime() -
            new Date(b.departureDateTime).getTime()
        )[0] || null
    );
  }, [bookings]);

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

  const formatTime = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardContainer
      eyebrow="Welcome back"
      title="Your Travel Overview"
      description="Manage your bookings, upcoming journeys and account activity."
    >
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
          value={
            loading
              ? "..."
              : `৳${totalSpent.toLocaleString()}`
          }
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
                    {String(
                      upcomingJourney.status || "Pending"
                    )
                      .charAt(0)
                      .toUpperCase() +
                      String(
                        upcomingJourney.status || "Pending"
                      ).slice(1)}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                    {upcomingJourney.from || "Unknown"}{" "}
                    →{" "}
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
                  <p className="text-xs text-slate-400">
                    Departure
                  </p>

                  <p className="mt-1 font-bold text-slate-900 dark:text-white">
                    {formatDate(
                      upcomingJourney.departureDateTime
                    )}
                  </p>

                  <p className="text-sm text-sky-500">
                    {formatTime(
                      upcomingJourney.departureDateTime
                    )}
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
    </DashboardContainer>
  );
}