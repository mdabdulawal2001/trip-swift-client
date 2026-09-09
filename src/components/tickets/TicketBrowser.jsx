"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import TicketSearch from "./TicketSearch";
import TicketFilters from "./TicketFilters";
import TicketSort from "./TicketSort";
import TicketGrid from "./TicketGrid";
import TicketPagination from "./TicketPagination";

export default function TicketBrowser({
  tickets,
  totalItems,
  totalPages,
  currentPage,
  filters,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const ticketsSectionRef = useRef(null);

  const { from, to, type, sort } = filters;

  // --------------------------------------------------
  // Keep browser inputs in sync with URL
  // --------------------------------------------------

  const updateQuery = (updates) => {
    const params = new URLSearchParams();

    const nextValues = {
      from,
      to,
      type,
      sort,
      ...updates,
    };

    Object.entries(nextValues).forEach(([key, value]) => {
      if (value && value !== "default") {
        params.set(key, value);
      }
    });

    // Every new search/filter starts from page 1
    if (!updates.page) {
      params.set("page", "1");
    } else {
      params.set("page", String(updates.page));
    }

    const query = params.toString();

    router.push(
      query ? `${pathname}?${query}#tickets-list` : `${pathname}#tickets-list`,
      {
        scroll: false,
      },
    );
  };

  // --------------------------------------------------
  // Scroll to ticket section after query changes
  // --------------------------------------------------

  useEffect(() => {
    if (!window.location.hash) return;

    const timer = setTimeout(() => {
      ticketsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [currentPage, from, to, type, sort]);

  // --------------------------------------------------
  // Reset all
  // --------------------------------------------------

  const handleReset = () => {
    router.push(`${pathname}#tickets-list`, {
      scroll: false,
    });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-sky-500">TripSwift Tickets</p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Find Your Perfect Journey
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
          Search available journeys by route, choose your preferred transport
          type and sort tickets by price.
        </p>
      </div>

      {/* Search / filter panel */}
      <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[1.8fr_0.8fr_0.8fr]">
          <TicketSearch
            from={from}
            to={to}
            setFrom={(value) => updateQuery({ from: value })}
            setTo={(value) => updateQuery({ to: value })}
          />

          <TicketFilters
            transportType={type}
            setTransportType={(value) => updateQuery({ type: value })}
          />

          <TicketSort
            sort={sort}
            setSort={(value) => updateQuery({ sort: value })}
          />
        </div>

        {(from || to || type || sort !== "default") && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-semibold text-slate-500 transition hover:text-sky-500"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      {/* Ticket section */}
      <section
        id="tickets-list"
        ref={ticketsSectionRef}
        className="scroll-mt-24"
      >
        {/* Result header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {totalItems} {totalItems === 1 ? "ticket" : "tickets"} found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {from || to || type
                ? "Showing results based on your search."
                : "Showing all available tickets."}
            </p>
          </div>

          {totalItems > 0 && (
            <p className="text-xs text-slate-400">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Results */}
        {tickets.length > 0 ? (
          <>
            <TicketGrid tickets={tickets} />

            {totalPages > 1 && (
              <div className="mt-10">
                <TicketPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => updateQuery({ page })}
                />
              </div>
            )}
          </>
        ) : (
          <EmptySearchState onReset={handleReset} />
        )}
      </section>
    </main>
  );
}

function EmptySearchState({ onReset }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
        ✈
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
        No tickets found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        We couldn't find any journey matching your current search and filter
        options.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
      >
        Clear Search
      </button>
    </div>
  );
}
