import Link from "next/link";

import TicketGrid from "@/components/tickets/TicketGrid";
import TicketSearch from "@/components/tickets/TicketSearch";
import TicketFilters from "@/components/tickets/TicketFilters";
import TicketSort from "@/components/tickets/TicketSort";

import { allTickets } from "@/data/ticketsData";

const ITEMS_PER_PAGE = 6;

export default async function TicketsPage({ searchParams }) {
  const params = await searchParams;

  const page = Math.max(Number(params?.page) || 1, 1);
  const from = params?.from || "";
  const to = params?.to || "";
  const transportType = params?.type || "all";
  const sort = params?.sort || "default";

  // Only approved tickets
  let filteredTickets = allTickets.filter(
    (ticket) => ticket.approved
  );

  // From search
  if (from) {
    filteredTickets = filteredTickets.filter((ticket) =>
      ticket.from.toLowerCase().includes(from.toLowerCase())
    );
  }

  // To search
  if (to) {
    filteredTickets = filteredTickets.filter((ticket) =>
      ticket.to.toLowerCase().includes(to.toLowerCase())
    );
  }

  // Transport filter
  if (transportType && transportType !== "all") {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.type === transportType
    );
  }

  // Sorting
  if (sort === "low-to-high") {
    filteredTickets.sort((a, b) => a.price - b.price);
  }

  if (sort === "high-to-low") {
    filteredTickets.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const totalPages = Math.ceil(
    filteredTickets.length / ITEMS_PER_PAGE
  );

  const safePage = Math.min(page, Math.max(totalPages, 1));

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
              Explore Tickets
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Find Your Perfect Journey
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Search, compare and book comfortable transportation
              for your next journey.
            </p>
          </div>

          {/* Search / Filter */}
          <div
            className="
              rounded-2xl border border-slate-200
              bg-white p-4 shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div
              className="
                grid grid-cols-1 gap-4
                md:grid-cols-2
                xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1.35fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)]
              "
            >
              <TicketSearch
                from={from}
                to={to}
              />

              <TicketFilters
                transportType={transportType}
              />

              <TicketSort
                sort={sort}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section
        id="tickets-list"
        className="scroll-mt-24 px-4 pb-16 pt-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Available Tickets
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {filteredTickets.length} tickets found
              </p>
            </div>

            {totalPages > 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Page {safePage} of {totalPages}
              </p>
            )}
          </div>

          {paginatedTickets.length > 0 ? (
            <>
              <TicketGrid tickets={paginatedTickets} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {/* Previous */}
                  {safePage > 1 ? (
                    <Link
                      href={`/tickets?page=${
                        safePage - 1
                      }${from ? `&from=${encodeURIComponent(from)}` : ""}${
                        to ? `&to=${encodeURIComponent(to)}` : ""
                      }${
                        transportType !== "all"
                          ? `&type=${encodeURIComponent(transportType)}`
                          : ""
                      }${
                        sort !== "default"
                          ? `&sort=${encodeURIComponent(sort)}`
                          : ""
                      }#tickets-list`}
                      className="
                        rounded-xl border border-slate-200
                        bg-white px-4 py-2.5 text-sm font-semibold
                        text-slate-700 transition
                        hover:border-sky-300 hover:text-sky-600
                        dark:border-slate-700
                        dark:bg-slate-900
                        dark:text-slate-300
                        dark:hover:border-sky-600
                        dark:hover:text-sky-400
                      "
                    >
                      Previous
                    </Link>
                  ) : (
                    <span
                      className="
                        cursor-not-allowed rounded-xl
                        border border-slate-200
                        bg-slate-100 px-4 py-2.5
                        text-sm font-semibold text-slate-400
                        dark:border-slate-800
                        dark:bg-slate-800
                      "
                    >
                      Previous
                    </span>
                  )}

                  {/* Page Numbers */}
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={`/tickets?page=${pageNumber}${
                        from
                          ? `&from=${encodeURIComponent(from)}`
                          : ""
                      }${
                        to
                          ? `&to=${encodeURIComponent(to)}`
                          : ""
                      }${
                        transportType !== "all"
                          ? `&type=${encodeURIComponent(
                              transportType
                            )}`
                          : ""
                      }${
                        sort !== "default"
                          ? `&sort=${encodeURIComponent(sort)}`
                          : ""
                      }#tickets-list`}
                      className={`
                        flex h-10 w-10 items-center justify-center
                        rounded-xl text-sm font-semibold transition
                        ${
                          safePage === pageNumber
                            ? "bg-sky-500 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-600 dark:hover:text-sky-400"
                        }
                      `}
                    >
                      {pageNumber}
                    </Link>
                  ))}

                  {/* Next */}
                  {safePage < totalPages ? (
                    <Link
                      href={`/tickets?page=${
                        safePage + 1
                      }${from ? `&from=${encodeURIComponent(from)}` : ""}${
                        to ? `&to=${encodeURIComponent(to)}` : ""
                      }${
                        transportType !== "all"
                          ? `&type=${encodeURIComponent(transportType)}`
                          : ""
                      }${
                        sort !== "default"
                          ? `&sort=${encodeURIComponent(sort)}`
                          : ""
                      }#tickets-list`}
                      className="
                        rounded-xl bg-sky-500
                        px-4 py-2.5 text-sm font-semibold
                        text-white transition
                        hover:bg-sky-600
                      "
                    >
                      Next
                    </Link>
                  ) : (
                    <span
                      className="
                        cursor-not-allowed rounded-xl
                        bg-slate-200 px-4 py-2.5
                        text-sm font-semibold text-slate-400
                        dark:bg-slate-800
                      "
                    >
                      Next
                    </span>
                  )}
                </div>
              )}
            </>
          ) : (
            <div
              className="
                rounded-2xl border border-dashed
                border-slate-300 py-20 text-center
                dark:border-slate-700
              "
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                No tickets found
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Try changing your search or filter options.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}