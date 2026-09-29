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
      <DashboardHeaderSkeleton />

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