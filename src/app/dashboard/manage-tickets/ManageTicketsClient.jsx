"use client";

import dynamic from "next/dynamic";
import ManageTicketsSkeleton from "@/components/dashboard/admin/ManageTicketsSkeleton";

const ManageTickets = dynamic(
  () => import("@/components/dashboard/admin/ManageTickets"),
  { loading: () => <ManageTicketsSkeleton /> },
);

export default function ManageTicketsClient() {
  return <ManageTickets />;
}
