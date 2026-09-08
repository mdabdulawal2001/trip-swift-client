"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import TicketCard from "@/components/tickets/TicketCard";
import TicketFilters from "@/components/tickets/TicketFilters";
import { allTickets } from "@/data/ticketsData";

const ITEMS_PER_PAGE = 6;

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const filteredTickets = useMemo(() => {
    let result = allTickets.filter((ticket) => ticket.approved);

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(keyword) ||
          ticket.operator.toLowerCase().includes(keyword) ||
          ticket.from.toLowerCase().includes(keyword) ||
          ticket.to.toLowerCase().includes(keyword)
      );
    }

    if (from) {
      result = result.filter((ticket) => ticket.from === from);
    }

    if (to) {
      result = result.filter((ticket) => ticket.to === to);
    }

    if (type) {
      result = result.filter((ticket) => ticket.type === type);
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, from, to, type, sort]);

  const totalPages = Math.ceil(
    filteredTickets.length / ITEMS_PER_PAGE
  );

  const currentTickets = filteredTickets.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1 w-8 rounded-full bg-[#047BFB]" />

              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#047BFB]">
                Explore Trips
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Find Your{" "}
              <span className="text-[#047BFB]">
                Perfect Ticket
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Search, compare and discover approved tickets for your next
              journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TicketFilters
              search={search}
              setSearch={handleFilterChange(setSearch)}
              from={from}
              setFrom={handleFilterChange(setFrom)}
              to={to}
              setTo={handleFilterChange(setTo)}
              type={type}
              setType={handleFilterChange(setType)}
              sort={sort}
              setSort={handleFilterChange(setSort)}
            />
          </motion.div>

          {/* Result heading */}
          <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Available Tickets
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredTickets.length} tickets found
              </p>
            </div>
          </div>

          {/* Tickets */}
          {currentTickets.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentTickets.map((ticket, index) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No tickets found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filter options.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm text-slate-600 transition hover:border-[#047BFB] hover:text-[#047BFB] disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              >
                <FaArrowLeft />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition ${
                      page === pageNumber
                        ? "bg-[#047BFB] text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#047BFB] hover:text-[#047BFB] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm text-slate-600 transition hover:border-[#047BFB] hover:text-[#047BFB] disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}