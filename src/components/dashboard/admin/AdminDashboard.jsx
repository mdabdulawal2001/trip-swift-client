import {
    ArrowRight,
  Megaphone,
  Ticket,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import ProgressRow from "@/components/dashboard/shared/ProgressRow";
import Activity from "@/components/dashboard/shared/Activity";
import Link from "next/link";

export default function AdminDashboard() {
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

        <span>
          <ArrowRight className="ml-auto h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-500" />
        </span>
      </div>
    </Link>
  );
}