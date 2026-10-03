"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Bell, Menu } from "lucide-react";

import ThemeToggle from "@/components/shared/ThemeToggle";
import UserAvatar from "@/components/shared/UserAvatar";

import { useProfile } from "@/context/ProfileContext";

export default function DashboardNavbar({ role, onMenuClick, setSidebarOpen }) {
  const { profile, isProfileLoading } = useProfile();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth >= 640 || currentScrollY <= 80) {
        setIsHidden(false);
      } else if (currentScrollY > previousScrollY) {
        setIsHidden(true);
      } else if (currentScrollY < previousScrollY) {
        setIsHidden(false);
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const displayName = profile?.name || "User";

  const userRole = profile?.role || role || "user";

  const roleLabel = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  return (
    <header
      className={`sticky top-20 z-40 mx-2 rounded-lg border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-transform duration-300 ease-in-out sm:top-[5.5rem] sm:mx-3 sm:translate-y-0 lg:top-0 lg:mx-4 dark:border-slate-800! dark:bg-slate-950/90! ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
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
    transition
    hover:bg-slate-100
    dark:hover:bg-slate-800
    md:p-2.5
  "
          >
            {isProfileLoading ? (
              <>
                <div
                  className="
          h-9
          w-9
          animate-pulse
          rounded-full
          bg-slate-200
          dark:bg-slate-700
        "
                />

                <div className="hidden space-y-2 md:block">
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

                  <div className="h-2.5 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </>
            ) : (
              <>
                <UserAvatar
                  user={{
                    ...profile,
                    name: displayName,
                    image: profile?.image,
                  }}
                  size="sm"
                />

                <div className="hidden text-left md:block">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {displayName}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {roleLabel} Account
                  </p>
                </div>
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
