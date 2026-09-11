import { notFound } from "next/navigation";
import TicketDetails from "@/components/tickets/TicketDetails";
import { getTicketById } from "@/lib/api";

export default async function TicketDetailsPage({ params }) {
  const { id } = await params;

  let data;

  try {
    data = await getTicketById(id);
  } catch (error) {
    console.error("Ticket details error:", error);
    notFound();
  }

  if (!data?.success || !data?.ticket) {
    notFound();
  }


  return (
    <TicketDetails
      ticket={data.ticket}
      relatedTickets={[]}
    />
  );
}