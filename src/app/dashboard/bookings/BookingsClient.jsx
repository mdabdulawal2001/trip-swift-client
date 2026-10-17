"use client";

import dynamic from "next/dynamic";

import DashboardRouteSkeleton from "@/components/dashboard/shared/DashboardRouteSkeleton";

const MyBookedTickets = dynamic(
  () => import("@/components/dashboard/user/MyBookedTickets"),
  { loading: () => <DashboardRouteSkeleton /> },
);

export default function BookingsClient() {
  return <MyBookedTickets />;
}
