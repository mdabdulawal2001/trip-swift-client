"use client";

import dynamic from "next/dynamic";
import RevenueSkeleton from "@/components/dashboard/vendor/vendorSkeletons/RevenueSkeleton";

const RevenueOverview = dynamic(
  () => import("@/components/dashboard/vendor/RevenueOverview"),
  { loading: () => <RevenueSkeleton /> },
);

export default function RevenueClient() {
  return <RevenueOverview />;
}
