"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  ClipboardList,
  FilePlus2,
  Home,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  ShieldCheck,
  Ticket,
  TrainFront,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";

const sidebarMenus = {
  user: [
    {
      section: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      section: "My Journey",
      items: [
        {
          label: "My Booked Tickets",
          href: "/dashboard/bookings",
          icon: Ticket,
        },
        {
          label: "Transaction History",
          href: "/dashboard/transactions",
          icon: WalletCards,
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/profile",
          icon: UserRound,
        },
      ],
    },
  ],

  vendor: [
    {
      section: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Revenue Overview",
          href: "/dashboard/revenue",
          icon: BarChart3,
        },
      ],
    },
    {
      section: "Ticket Management",
      items: [
        {
          label: "Add Ticket",
          href: "/dashboard/add-ticket",
          icon: FilePlus2,
        },
        {
          label: "My Added Tickets",
          href: "/dashboard/my-tickets",
          icon: TrainFront,
        },
        {
          label: "Requested Bookings",
          href: "/dashboard/requested-bookings",
          icon: ClipboardList,
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/profile",
          icon: UserRound,
        },
      ],
    },
  ],

  admin: [
    {
      section: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      section: "Management",
      items: [
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
          label: "Advertise Tickets",
          href: "/dashboard/advertise",
          icon: Megaphone,
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          label: "My Profile",
          href: "/dashboard/profile",
          icon: UserRound,
        },
      ],
    },
  ],
};

export default function DashboardSidebar({ role = "user" }) {
  const pathname = usePathname();

  const menus = sidebarMenus[role] || sidebarMenus.user;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:block">
      <div className="sticky top-[72px] flex h-[calc(100vh-72px)] flex-col">
        {/* Brand */}
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
              <TrainFront className="h-5 w-5" />
            </div>

            <div>
              <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                Trip<span className="text-sky-500">Swift</span>
              </p>

              <p className="text-[11px] text-slate-500">
                {roleLabel(role)} Dashboard
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {menus.map((section) => (
            <div key={section.section} className="mb-6">
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {section.section}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] shrink-0 transition ${
                          isActive
                            ? "text-sky-500"
                            : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                        }`}
                      />

                      <span>{item.label}</span>

                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Home className="h-[18px] w-[18px]" />
            Back to Home
          </Link>

          <button
            type="button"
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

function roleLabel(role) {
  if (role === "admin") return "Admin";
  if (role === "vendor") return "Vendor";
  return "User";
}