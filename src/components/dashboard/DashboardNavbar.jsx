"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, X } from "lucide-react";
import { Avatar, Button } from "@heroui/react";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function DashboardNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
    },
    {
      label: "Bookings",
      href: "/dashboard/bookings",
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link
            href="/dashboard"
            className="hidden items-center gap-2 lg:flex"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white">
              <span className="text-sm font-bold">TS</span>
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Trip<span className="text-sky-500">Swift</span>
            </span>
          </Link>

          <div className="hidden h-7 w-px bg-slate-200 dark:bg-slate-800 lg:block" />

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Dashboard
            </p>

            <h1 className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">
              Manage your journey
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white sm:flex"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Notification */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sky-500 ring-2 ring-white dark:ring-slate-950" />
          </button>

          <ThemeToggle />

          <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

          {/* User */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Avatar
              size="sm"
              src="https://i.pravatar.cc/100?img=12"
              name="TripSwift User"
            />

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                TripSwift User
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                User Account
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}