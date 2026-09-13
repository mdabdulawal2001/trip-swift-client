import { notFound } from "next/navigation";

import TicketDetails from "@/components/tickets/TicketDetails";
import {
  getTicketById,
  getTickets,
} from "@/lib/api";

export default async function TicketDetailsPage({
  params,
}) {
  const { id } = await params;

  let data;

  try {
    data = await getTicketById(id);
  } catch (error) {
    console.error(
      "Ticket details error:",
      error
    );

    notFound();
  }

  if (!data?.success || !data?.ticket) {
    notFound();
  }

  const ticket = data.ticket;

  let relatedTickets = [];

  try {
    const [
      sameRouteData,
      sameFromData,
      sameToData,
      sameTypeData,
    ] = await Promise.all([
      getTickets({
        from: ticket.from,
        to: ticket.to,
        page: 1,
        limit: 6,
      }),

      getTickets({
        from: ticket.from,
        page: 1,
        limit: 6,
      }),

      getTickets({
        to: ticket.to,
        page: 1,
        limit: 6,
      }),

      getTickets({
        type: ticket.type,
        page: 1,
        limit: 6,
      }),
    ]);

    const combinedTickets = [
      ...(sameRouteData?.tickets || []),
      ...(sameFromData?.tickets || []),
      ...(sameToData?.tickets || []),
      ...(sameTypeData?.tickets || []),
    ];

    const uniqueTickets = Array.from(
      new Map(
        combinedTickets.map((item) => [
          String(item._id),
          item,
        ])
      ).values()
    );

    relatedTickets = uniqueTickets
      .filter(
        (item) =>
          String(item._id) !== String(ticket._id)
      )
      .slice(0, 3);
  } catch (error) {
    console.error(
      "Related tickets error:",
      error
    );
  }

  return (
    <TicketDetails
      ticket={ticket}
      relatedTickets={relatedTickets}
    />
  );
}