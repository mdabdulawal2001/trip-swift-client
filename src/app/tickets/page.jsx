import TicketBrowser from "@/components/tickets/TicketBrowser";
import { getTickets } from "@/lib/api";

export default async function TicketsPage({ searchParams }) {
  const params = await searchParams;

  const data = await getTickets({
    from: params?.from || "",
    to: params?.to || "",
    type: params?.type || "",
    sort: params?.sort || "default",
    page: params?.page || 1,
    limit: 6,
  });

  return (
    <TicketBrowser
      tickets={data.tickets}
      totalItems={data.pagination.totalItems}
      totalPages={data.pagination.totalPages}
      currentPage={data.pagination.currentPage}
      itemsPerPage={data.pagination.itemsPerPage}
      filters={{
        from: params?.from || "",
        to: params?.to || "",
        type: params?.type || "",
        sort: params?.sort || "default",
      }}
    />
  );
}