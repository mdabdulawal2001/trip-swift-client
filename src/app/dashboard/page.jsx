"use client";

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  FilePlus2,
  Megaphone,
  Ticket,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import Link from "next/link";

const CURRENT_ROLE = "vendor";
// পরে Better Auth / MongoDB থেকে আসবে:
// "user" | "vendor" | "admin"

export default function DashboardPage() {
  if (CURRENT_ROLE === "vendor") {
    return <VendorDashboard />;
  }

  if (CURRENT_ROLE === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

/* =========================================================
   USER DASHBOARD
========================================================= */

function UserDashboard() {
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
                  Dhaka → Cox's Bazar
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

/* =========================================================
   VENDOR DASHBOARD
========================================================= */

function VendorDashboard() {
  return (
    <DashboardContainer
      eyebrow="Vendor Dashboard"
      title="Business Overview"
      description="Track your tickets, booking requests and revenue performance."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Ticket />}
          label="Total Tickets"
          value="24"
          change="+4 this month"
        />

        <StatCard
          icon={<CheckCircle2 />}
          label="Active Tickets"
          value="18"
          change="75% active"
        />

        <StatCard
          icon={<Clock3 />}
          label="Pending Requests"
          value="7"
          change="Needs attention"
        />

        <StatCard
          icon={<DollarSign />}
          label="Total Revenue"
          value="৳376K"
          change="+18.4%"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <SectionTitle
            title="Revenue Overview"
            action="View revenue"
            href="/dashboard/revenue"
          />

          <div className="mt-8 flex h-52 items-end gap-3 sm:gap-5">
            {[42, 58, 48, 70, 64, 88].map((height, index) => (
              <div
                key={index}
                className="flex h-full flex-1 items-end justify-center"
              >
                <div
                  className="w-full max-w-12 rounded-t-xl bg-sky-500 transition hover:bg-sky-600"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
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

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <SectionTitle
          title="Recent Booking Requests"
          action="View all"
          href="/dashboard/requested-bookings"
        />

        <div className="mt-5 space-y-3">
          <BookingRow
            name="Abdul Karim"
            route="Dhaka → Cox's Bazar"
            quantity="2 tickets"
            status="Pending"
          />

          <BookingRow
            name="Sadia Rahman"
            route="Dhaka → Sylhet"
            quantity="1 ticket"
            status="Pending"
          />

          <BookingRow
            name="Tanvir Hasan"
            route="Dhaka → Rajshahi"
            quantity="3 tickets"
            status="Accepted"
          />
        </div>
      </div>
    </DashboardContainer>
  );
}

/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function AdminDashboard() {
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
          value="1,248"
          change="+8.2%"
        />

        <StatCard
          icon={<UserRound />}
          label="Vendors"
          value="86"
          change="+12 this month"
        />

        <StatCard
          icon={<Ticket />}
          label="Pending Tickets"
          value="14"
          change="Needs review"
        />

        <StatCard
          icon={<TrendingUp />}
          label="Total Bookings"
          value="4,862"
          change="+16.8%"
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
              value="72%"
              progress={72}
            />

            <ProgressRow
              label="Pending"
              value="18%"
              progress={18}
            />

            <ProgressRow
              label="Rejected"
              value="10%"
              progress={10}
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
            <Activity
              icon={<UserRound />}
              title="New vendor registered"
              description="Rahim Travel joined the platform"
              time="12 min ago"
            />

            <Activity
              icon={<Ticket />}
              title="New ticket submitted"
              description="Dhaka → Sylhet requires approval"
              time="35 min ago"
            />

            <Activity
              icon={<Megaphone />}
              title="Advertisement updated"
              description="2 tickets are currently featured"
              time="1 hour ago"
            />
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

/* =========================================================
   SHARED COMPONENTS
========================================================= */

function DashboardContainer({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-sky-500">
          {eyebrow}
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function StatCard({ icon, label, value, change }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-500 dark:bg-sky-500/10">
          {icon}
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          {change}
        </span>
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

function SectionTitle({ title, action, href }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-bold text-slate-900 dark:text-white">
        {title}
      </h2>

      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-semibold text-sky-500 hover:text-sky-600"
      >
        {action}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function QuickActions({ items }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-bold text-slate-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="mt-5 grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 p-3 transition hover:border-sky-200 hover:bg-sky-50 dark:border-slate-800 dark:hover:border-sky-900 dark:hover:bg-sky-500/10"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-sky-500 group-hover:text-white dark:bg-slate-800">
              {item.icon}
            </div>

            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {item.label}
            </span>

            <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function BookingRow({
  name,
  route,
  quantity,
  status,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">
          {name}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {route} · {quantity}
        </p>
      </div>

      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
          status === "Accepted"
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function ProgressRow({ label, value, progress }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {label}
        </span>

        <span className="font-bold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function Activity({
  icon,
  title,
  description,
  time,
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-sky-500/10">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </p>

          <span className="text-[11px] text-slate-400">
            {time}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
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

        <ArrowRight className="ml-auto h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-500" />
      </div>
    </Link>
  );
}