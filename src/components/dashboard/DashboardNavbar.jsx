"use client";

import Link from "next/link";

import { Bell, Menu } from "lucide-react";

import { Avatar } from "@heroui/react";

import ThemeToggle from "@/components/shared/ThemeToggle";

import { useProfile } from "@/context/ProfileContext";

export default function DashboardNavbar({ role, onMenuClick, setSidebarOpen }) {
  const { profile, isProfileLoading } = useProfile();

  const displayName = profile?.name || "User";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const userRole = profile?.role || role || "user";

  const roleLabel = userRole.charAt(0).toUpperCase() + userRole.slice(1);


  return (
    <header className="sticky top-0 z-40 rounded-lg border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800! dark:bg-slate-950/90!">
      <div className="flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ================================================== */}
        {/* LEFT */}
        {/* ================================================== */}

        <div className="flex items-center gap-4">
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-700
              transition
              hover:bg-slate-100
              dark:border-slate-700
              dark:text-slate-200
              dark:hover:bg-slate-800
              lg:hidden
            "
            aria-label="Open dashboard sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* DESKTOP BRAND */}
          <Link href="/dashboard" className="hidden items-center gap-2 lg:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#238FD7] text-white">
              <span className="text-sm font-bold">TS</span>
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Trip
              <span className="text-[#238FD7]">Swift</span>
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

        {/* ================================================== */}
        {/* RIGHT */}
        {/* ================================================== */}

        <div className="flex items-center gap-0 sm:gap-3">
          {/* SEARCH */}
          {/* <button
            type="button"
            className="
              hidden
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:hover:bg-slate-800
              dark:hover:text-white
              sm:flex
            "
          >
            <span className="text-lg">⌕</span>
          </button> */}

          {/* NOTIFICATION */}
          <button
            type="button"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <Bell className="h-5 w-5" />

            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-sky-500
                ring-2
                ring-white
                dark:ring-slate-950
              "
            />
          </button>

          {/* THEME */}
          <ThemeToggle />

          <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

          {/* USER / PROFILE */}
          <Link
            href="/dashboard/profile"
            className="
    flex
    items-center
    gap-2
    rounded-xl
    p-1
    md:p-2.5
    transition
    hover:bg-slate-100
    dark:hover:bg-slate-800
  "
          >
            {profile?.image ? (
              <img
                src={profile.image}
                alt={displayName}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                {initials || "U"}
              </div>
            )}

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {isProfileLoading ? "Loading..." : displayName}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isProfileLoading ? "..." : `${roleLabel} Account`}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
