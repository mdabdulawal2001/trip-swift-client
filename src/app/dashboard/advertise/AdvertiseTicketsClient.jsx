"use client";

import dynamic from "next/dynamic";
import AdvertiseTicketsSkeleton from "@/components/dashboard/admin/AdvertiseTicketsSkeleton";

const AdvertiseTickets = dynamic(
  () => import("@/components/dashboard/admin/AdvertiseTickets"),
  { loading: () => <AdvertiseTicketsSkeleton /> },
);

export default function AdvertiseTicketsClient() {
  return <AdvertiseTickets />;
}
