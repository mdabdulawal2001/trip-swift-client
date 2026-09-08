import { notFound } from "next/navigation";

import TicketDetails from "@/components/tickets/TicketDetails";
import { allTickets } from "@/data/ticketsData";

export default async function TicketDetailsPage({ params }) {
  const { id } = await params;

  const ticket = allTickets.find(
    (item) => item.id === id && item.approved
  );

  if (!ticket) {
    notFound();
  }

  const relatedTickets = allTickets.filter(
    (item) =>
      item.approved &&
      item.id !== ticket.id &&
      (item.to === ticket.to || item.type === ticket.type)
  );

  return (
    <TicketDetails
      ticket={ticket}
      relatedTickets={relatedTickets}
    />
  );
}