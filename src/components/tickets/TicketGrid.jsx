"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import TicketCard from "./TicketCard";

export default function TicketGrid({ tickets }) {
  if (!tickets.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          flex min-h-80 flex-col items-center justify-center
          rounded-3xl border border-dashed
          border-slate-300 bg-white px-6 text-center
          dark:border-slate-700 dark:bg-slate-900
        "
      >
        <div
          className="
            flex h-16 w-16 items-center justify-center
            rounded-2xl bg-slate-100 text-slate-400
            dark:bg-slate-800 dark:text-slate-500
          "
        >
          <SearchX size={28} />
        </div>

        <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          No tickets found
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          We couldn't find any tickets matching your search.
          Try another destination or remove some filters.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="
        grid grid-cols-1 gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket._id}
          ticket={ticket}
        />
      ))}
    </motion.div>
  );
}