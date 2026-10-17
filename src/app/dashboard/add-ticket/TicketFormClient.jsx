"use client";

import dynamic from "next/dynamic";
import TicketFormSkeleton from "@/components/dashboard/vendor/vendorSkeletons/TicketFormSkeleton";

const TicketForm = dynamic(
  () => import("@/components/dashboard/vendor/TicketForm"),
  { loading: () => <TicketFormSkeleton /> },
);

export default function TicketFormClient() {
  return <TicketForm />;
}
