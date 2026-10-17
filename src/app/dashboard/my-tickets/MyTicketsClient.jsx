"use client";

import dynamic from "next/dynamic";
import MyTicketsSkeleton from "@/components/dashboard/vendor/vendorSkeletons/MyTicketsSkeleton";

const MyTickets = dynamic(
  () => import("@/components/dashboard/vendor/MyTickets"),
  { loading: () => <MyTicketsSkeleton /> },
);

export default function MyTicketsClient() {
  return <MyTickets />;
}
