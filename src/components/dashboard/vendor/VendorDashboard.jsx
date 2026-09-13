import {
  BarChart3,
  CheckCircle2,
  Clock3,
  DollarSign,
  FilePlus2,
  Ticket,
} from "lucide-react";

import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import StatCard from "@/components/dashboard/shared/StatCard";
import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import QuickActions from "@/components/dashboard/shared/QuickActions";
import BookingRow from "@/components/dashboard/shared/BookingRow";

export default function VendorDashboard() {
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
            {[42, 58, 48, 70, 64, 88].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 items-end justify-center"
                >
                  <div
                    className="w-full max-w-12 rounded-t-xl bg-sky-500 transition hover:bg-sky-600"
                    style={{ height: `${height}%` }}
                  />
                </div>
              )
            )}
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