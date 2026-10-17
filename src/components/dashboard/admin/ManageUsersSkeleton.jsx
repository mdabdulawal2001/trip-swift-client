"use client";

import {
  DashboardListControlsSkeleton,
  DashboardPaginationSkeleton,
} from "../shared/DashboardSkeleton";

export default function ManageUsersSkeleton() {
  return (        <div className="space-y-6">
          {/* ================= HEADER SKELETON ================= */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              {/* Admin Dashboard */}
              <div className="mb-3 h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

              {/* Manage Users */}
              <div className="h-9 w-52 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 sm:h-10 sm:w-64" />

              {/* Description */}
              <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 sm:w-32" />
          </div>

          {/* ================= STATS SKELETON ================= */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="
              flex flex-col items-center text-center
              sm:items-start sm:text-left
            rounded-3xl
            border border-slate-200
            bg-white p-5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
              >
                {/* Icon */}
                <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                {/* Label */}
                <div className="mt-4 h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                {/* Number */}
                <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>

          {/* ================= SEARCH AND FILTER SKELETON ================= */}
          <div className="mb-6">
            <DashboardListControlsSkeleton filterCount={2} />
          </div>

          {/* ================= USERS TABLE SKELETON ================= */}
          <div
            className="
        overflow-hidden
        rounded-3xl
        border border-slate-200
        bg-white
        shadow-sm
        dark:!border-slate-800
        dark:bg-slate-900
      "
          >
            {/* Desktop Header */}
            <div
              className="
          hidden
          border-b border-slate-200
          bg-slate-50/80
          px-5 py-4
          dark:border-slate-800!
          dark:bg-slate-950/60
          lg:grid
          lg:grid-cols-[minmax(300px,1fr)_190px_430px]
          lg:items-center
          lg:gap-4
        "
            >
              <div className="mx-auto h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

              <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

              <div className="mx-auto h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800!">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="px-4 py-5 sm:px-5">
                  {/* ================= DESKTOP ROW ================= */}
                  <div
                    className="
                hidden
                lg:grid
                lg:grid-cols-[minmax(300px,1fr)_190px_430px]
                lg:items-center
                lg:gap-4
              "
                  >
                    {/* User */}
                    <div className="flex items-center gap-3">
                      {/* Serial */}
                      <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      {/* Avatar */}
                      <div className="h-11 w-11 shrink-0 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

                      {/* Name + Email */}
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                        <div className="h-3 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    </div>

                    {/* Role + Status */}
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                      <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-2">
                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>

                  {/* ================= MOBILE / TABLET ROW ================= */}
                  <div className="lg:hidden">
                    {/* User */}
                    <div className="flex flex-col items-center gap-3">
                      {/* Serial */}
                      <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                      {/* Avatar */}
                      <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      {/* Name + Email */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                        <div className="h-3 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    </div>

                    {/* Role + Status + Joined */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                      <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                      <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DashboardPaginationSkeleton />
        </div>
  );
}