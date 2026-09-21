"use client";

import { useEffect, useMemo, useState } from "react";

import {
  BarChart3,
  CheckCircle2,
  Clock3,
  DollarSign,
  FilePlus2,
  Ticket,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import QuickActions from "@/components/dashboard/shared/QuickActions";
import RecentBookingRequests from "@/components/dashboard/vendor/RecentBookingRequests";

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

  return (
    <DashboardContainer
      eyebrow="Vendor Dashboard"
      title="Business Overview"
      description="Track your tickets, booking requests and revenue performance."
    >
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

      {/* Chart + Quick Actions */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <SectionTitle
            title="Tickets Added"
            action="View tickets"
            href="/dashboard/my-tickets"
          />

          <div className="mt-8 flex h-52 items-end gap-3 sm:gap-5">
            {monthlyTicketData.map((item) => {
              const height =
                item.count === 0
                  ? 4
                  : Math.max((item.count / maxTicketCount) * 100, 8);

              return (
                <div
                  key={`${item.year}-${item.monthIndex}`}
                  className="flex h-full flex-1 items-end justify-center"
                >
                  <div
                    className="w-full max-w-12 rounded-t-xl bg-sky-500 transition hover:bg-sky-600"
                    style={{
                      height: `${height}%`,
                    }}
                    title={`${item.month}: ${item.count} ticket${
                      item.count !== 1 ? "s" : ""
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
            {monthlyTicketData.map((item) => (
              <span key={`${item.year}-${item.monthIndex}-label`}>
                {item.month}
              </span>
            ))}
          </div>
        </div>

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
        />
      </div>

      {/* Recent Booking Requests */}
      <RecentBookingRequests />
    </DashboardContainer>
  );
}
