"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaTicketAlt,
} from "react-icons/fa";

export default function TicketNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#047BFB]/10 text-3xl text-[#047BFB]">
          <FaTicketAlt />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
          Ticket Not Found
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Sorry, the ticket you are looking for does not exist or is no
          longer available.
        </p>

        <Link
          href="/tickets"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#047BFB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#035EC4]"
        >
          <FaArrowLeft />
          Browse All Tickets
        </Link>
      </motion.div>
    </main>
  );
}