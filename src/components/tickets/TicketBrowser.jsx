"use client";

import { useEffect } from "react";
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
  itemsPerPage,
  filters,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const updateQuery = (updates, mode = "replace") => {
    const params = new URLSearchParams();

    const nextValues = {
      from: filters.from || "",
      to: filters.to || "",
      type: filters.type || "",
      sort: filters.sort || "default",
      page: currentPage,
      ...updates,
    };

    if (nextValues.from) {
      params.set("from", nextValues.from);
    }

    if (nextValues.to) {
      params.set("to", nextValues.to);
    }

    if (nextValues.type) {
      params.set("type", nextValues.type);
    }

    if (
      nextValues.sort &&
      nextValues.sort !== "default"
    ) {
      params.set("sort", nextValues.sort);
    }

    params.set("page", String(nextValues.page || 1));

    const queryString = params.toString();

    const url = queryString
      ? `${pathname}?${queryString}`
      : pathname;

    router[mode](url, {
      scroll: false,
    });
  };

  // Search
  const handleSearch = ({ from, to }) => {
    updateQuery(
      {
        from,
        to,
        page: 1,
      },
      "replace"
    );
  };

  // Filter
  const handleFilterChange = (type) => {
    updateQuery(
      {
        type,
        page: 1,
      },
      "replace"
    );
  };

  // Sort
  const handleSortChange = (sort) => {
    updateQuery(
      {
        sort,
        page: 1,
      },
      "replace"
    );
  };

  // Reset
  const handleReset = () => {
    router.replace(pathname, {
      scroll: false,
    });
  };

  // Pagination
  const handlePageChange = (page) => {
    updateQuery(
      {
        page,
      },
      "push"
    );
  };

  // Scroll to ticket list after query/page change
  useEffect(() => {
    const element = document.getElementById("tickets-list");

    if (!element) return;

    const timer = setTimeout(() => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [
    filters.from,
    filters.to,
    filters.type,
    filters.sort,
    currentPage,
  ]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Search / Filter / Sort */}
      <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="grid gap-4 xl:grid-cols-[1.8fr_0.8fr_0.8fr]">
          <TicketSearch
            from={filters.from}
            to={filters.to}
            onSearch={handleSearch}
          />

          <TicketFilters
            value={filters.type}
            onChange={handleFilterChange}
          />

          <TicketSort
            value={filters.sort}
            onChange={handleSortChange}
          />
        </div>

        {/* Reset */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      <div
        id="tickets-list"
        className="scroll-mt-24"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Available Tickets
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {totalItems} ticket{totalItems !== 1 ? "s" : ""} found
            </p>
          </div>

          <p className="hidden text-sm text-slate-500 sm:block dark:text-slate-400">
            Showing{" "}
            {tickets.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            -
            {" "}
            {(currentPage - 1) * itemsPerPage +
              tickets.length}{" "}
            of {totalItems}
          </p>
        </div>

        {tickets.length > 0 ? (
          <>
            <TicketGrid tickets={tickets} />

            <TicketPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 py-20 text-center dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              No tickets found
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing your search or filter.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-5 rounded-xl bg-[#047BFB] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}