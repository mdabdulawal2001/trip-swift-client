import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Ticket,
  UserRound,
  WalletCards,
} from "lucide-react";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import QuickActions from "@/components/dashboard/shared/QuickActions";

export default function UserDashboard() {
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
          value="12"
          change="+2 this month"
        />

        <StatCard
          icon={<Clock3 />}
          label="Pending Bookings"
          value="2"
          change="Needs attention"
        />

        <StatCard
          icon={<CheckCircle2 />}
          label="Completed Trips"
          value="8"
          change="+3 this month"
        />

        <StatCard
          icon={<WalletCards />}
          label="Total Spent"
          value="৳18,450"
          change="+12.5%"
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
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  Confirmed
                </span>

                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                  Dhaka → Cox&apos;s Bazar
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Green Line Express · AC Bus
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-xs text-slate-400">
                  Departure
                </p>

                <p className="mt-1 font-bold text-slate-900 dark:text-white">
                  18 Sep 2026
                </p>

                <p className="text-sm text-sky-500">
                  08:30 AM
                </p>
              </div>
            </div>
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