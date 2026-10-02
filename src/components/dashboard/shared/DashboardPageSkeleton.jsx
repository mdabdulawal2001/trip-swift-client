"use client";

import {
  DashboardHeaderSkeleton,
  DashboardStatsSkeleton,
  DashboardPanelSkeleton,
  QuickActionsSkeleton,
} from "./DashboardSkeleton";

export default function DashboardPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <DashboardHeaderSkeleton />
        </div>
        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 sm:w-32" />
      </div>

      {/* Stats */}
      <DashboardStatsSkeleton />

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <DashboardPanelSkeleton height="h-64" />

        <QuickActionsSkeleton />
      </div>
    </div>
  );
}
