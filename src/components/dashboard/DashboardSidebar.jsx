"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  Ticket,
  CreditCard,
  PlusCircle,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  Users,
  Megaphone,
  X,
} from "lucide-react";

const userMenu = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "My Booked Tickets",
    href: "/dashboard/bookings",
    icon: Ticket,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: CreditCard,
  },
];

const vendorMenu = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Add Ticket",
    href: "/dashboard/add-ticket",
    icon: PlusCircle,
  },
  {
    label: "My Tickets",
    href: "/dashboard/my-tickets",
    icon: Ticket,
  },
  {
    label: "Booking Requests",
    href: "/dashboard/requested-bookings",
    icon: ClipboardList,
  },
  {
    label: "Revenue",
    href: "/dashboard/revenue",
    icon: BarChart3,
  },
];

const adminMenu = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Manage Tickets",
    href: "/dashboard/manage-tickets",
    icon: Ticket,
  },
  {
    label: "Manage Users",
    href: "/dashboard/manage-users",
    icon: Users,
  },
  {
    label: "Advertise",
    href: "/dashboard/advertise",
    icon: Megaphone,
  },
];

const DashboardSidebar = ({ role = "user", open, setOpen }) => {
  const pathname = usePathname();

  const menu =
    role === "admin"
      ? adminMenu
      : role === "vendor"
        ? vendorMenu
        : userMenu;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72
          flex-col border-r border-slate-200
          bg-white transition-transform duration-300
          dark:border-slate-800 dark:bg-slate-950
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
              <Ticket className="h-5 w-5" />
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                TripSwift
              </p>

              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Dashboard
              </p>
            </div>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Menu
          </p>

          {menu.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 rounded-xl
                  px-3 py-3 text-sm font-semibold
                  transition-all
                  ${
                    isActive
                      ? "bg-sky-500 text-white shadow-sm shadow-sky-500/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-sky-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-sky-400"
                  }
                `}
              >
                <Icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Role Card */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                  Account Type
                </p>

                <p className="truncate text-sm font-bold capitalize text-slate-800 dark:text-slate-200">
                  {role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;