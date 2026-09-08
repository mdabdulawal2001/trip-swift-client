import {
  Ticket,
  CreditCard,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "12",
    change: "+12.5%",
    icon: Ticket,
  },
  {
    title: "Total Spent",
    value: "৳18,450",
    change: "+8.2%",
    icon: CreditCard,
  },
  {
    title: "Pending Bookings",
    value: "03",
    change: "2 awaiting",
    icon: Clock3,
  },
  {
    title: "Completed Trips",
    value: "08",
    change: "+3 this month",
    icon: CheckCircle2,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-sky-500">
          Overview
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Dashboard
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your journeys, bookings and account from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  <Icon className="h-5 w-5" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-slate-300" />
              </div>

              <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                {stat.title}
              </p>

              <div className="mt-1 flex items-end justify-between gap-3">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>

                <span className="text-xs font-semibold text-emerald-500">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent bookings */}
      <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Recent Bookings
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Your latest ticket activity
            </p>
          </div>

          <button className="text-sm font-semibold text-sky-500 hover:text-sky-600">
            View All
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">

          {[
            ["Dhaka", "Cox's Bazar", "৳2,900", "Pending"],
            ["Dhaka", "Chattogram", "৳2,200", "Accepted"],
            ["Dhaka", "Sylhet", "৳1,300", "Paid"],
          ].map(([from, to, price, status]) => (
            <div
              key={`${from}-${to}`}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {from} → {to}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  AC Bus • Upcoming journey
                </p>
              </div>

              <div className="flex items-center justify-between gap-6">
                <span className="font-bold text-slate-900 dark:text-white">
                  {price}
                </span>

                <span
                  className={`
                    rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      status === "Paid"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : status === "Accepted"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                          : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                    }
                  `}
                >
                  {status}
                </span>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href="/tickets"
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <Ticket className="h-6 w-6 text-sky-500" />

            <h4 className="mt-4 font-bold text-slate-900 dark:text-white">
              Browse Tickets
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              Find your next journey.
            </p>
          </a>

          <a
            href="/dashboard/bookings"
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <CreditCard className="h-6 w-6 text-sky-500" />

            <h4 className="mt-4 font-bold text-slate-900 dark:text-white">
              My Bookings
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              Track your ticket bookings.
            </p>
          </a>

          <a
            href="/dashboard/profile"
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <CheckCircle2 className="h-6 w-6 text-sky-500" />

            <h4 className="mt-4 font-bold text-slate-900 dark:text-white">
              Manage Profile
            </h4>

            <p className="mt-1 text-sm text-slate-500">
              Update your account information.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}