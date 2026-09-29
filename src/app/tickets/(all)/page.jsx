import TicketBrowser from "@/components/tickets/TicketBrowser";
import { getTickets } from "@/lib/api";

const ITEMS_PER_PAGE = 6;

export default async function TicketsPage({ searchParams }) {
  const params = await searchParams;

  const from = params?.from || "";
  const to = params?.to || "";
  const type = params?.type || "";
  const sort = params?.sort || "default";
  const page = Number(params?.page) || 1;

  const data = await getTickets({
    from,
    to,
    type,
    sort,
    page,
    limit: ITEMS_PER_PAGE,
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
