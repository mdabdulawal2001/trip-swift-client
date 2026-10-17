"use client";

import dynamic from "next/dynamic";

import DashboardRouteSkeleton from "@/components/dashboard/shared/DashboardRouteSkeleton";

const Transactions = dynamic(
  () => import("@/components/dashboard/user/Transactions"),
  { loading: () => <DashboardRouteSkeleton /> },
);

export default function TransactionsClient() {
  return <Transactions />;
}
