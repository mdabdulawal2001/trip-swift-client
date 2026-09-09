import TicketBrowser from "@/components/tickets/TicketBrowser";
import { allTickets } from "@/data/ticketsData";

const ITEMS_PER_PAGE = 6;

export default async function TicketsPage({ searchParams }) {
  const params = await searchParams;

  const from = normalize(params?.from);
  const to = normalize(params?.to);
  const type = normalize(params?.type);
  const sort = normalize(params?.sort) || "default";

  let page = Number(params?.page) || 1;

  if (page < 1) page = 1;

  // --------------------------------------------------
  // 1. Only approved tickets
  // --------------------------------------------------

  let filteredTickets = allTickets.filter(
    (ticket) => ticket.approved
  );

  // --------------------------------------------------
  // 2. Search: From
  // --------------------------------------------------

  if (from) {
    filteredTickets = filteredTickets.filter((ticket) =>
      ticket.from.toLowerCase().includes(from)
    );
  }

  // --------------------------------------------------
  // 3. Search: To
  // --------------------------------------------------

  if (to) {
    filteredTickets = filteredTickets.filter((ticket) =>
      ticket.to.toLowerCase().includes(to)
    );
  }

  // --------------------------------------------------
  // 4. Transport type filter
  // --------------------------------------------------

  if (type) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.type.toLowerCase() === type
    );
  }

  // --------------------------------------------------
  // 5. Sorting
  // --------------------------------------------------

  if (sort === "low") {
    filteredTickets.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredTickets.sort((a, b) => b.price - a.price);
  }

  // --------------------------------------------------
  // 6. Pagination
  // --------------------------------------------------

  const totalItems = filteredTickets.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / ITEMS_PER_PAGE)
  );

  // If an invalid page is requested
  // automatically use the last valid page.
  if (page > totalPages) {
    page = totalPages;
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <TicketBrowser
      tickets={paginatedTickets}
      totalItems={totalItems}
      totalPages={totalPages}
      currentPage={page}
      itemsPerPage={ITEMS_PER_PAGE}
      filters={{
        from: params?.from || "",
        to: params?.to || "",
        type: params?.type || "",
        sort: params?.sort || "default",
      }}
    />
  );
}

function normalize(value) {
  if (typeof value !== "string") return "";

  return value.trim().toLowerCase();
}