"use client";

import dynamic from "next/dynamic";
import TicketFormSkeleton from "@/components/dashboard/vendor/vendorSkeletons/TicketFormSkeleton";

const EditTicketForm = dynamic(
  () => import("@/components/dashboard/vendor/EditTicketForm"),
  { loading: () => <TicketFormSkeleton variant="edit" /> },
);

export default function EditTicketClient() {
  return <EditTicketForm />;
}
