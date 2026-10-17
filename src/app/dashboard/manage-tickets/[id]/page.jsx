import { notFound } from "next/navigation";

import TicketDetailsClient from "@/components/tickets/TicketDetailsClient";
import { getAdminTicketById } from "@/lib/api";

export default async function AdminTicketDetailsPage({ params }) {
  const { id } = await params;

  let data;

  try {
    data = await getAdminTicketById(id);
  } catch (error) {
    console.error("Admin ticket details error:", error);
    notFound();
  }

  if (!data?.success || !data?.ticket) {
    notFound();
  }

  return (
    <TicketDetailsClient
      ticket={data.ticket}
      relatedTickets={[]}
      isManagementView
    />
  );
}
