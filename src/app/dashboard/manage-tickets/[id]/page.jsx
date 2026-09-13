import { notFound } from "next/navigation";

import TicketDetails from "@/components/tickets/TicketDetails";
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
    <TicketDetails
      ticket={data.ticket}
      relatedTickets={[]}
      isManagementView
    />
  );
}