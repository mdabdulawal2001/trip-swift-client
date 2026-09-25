"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function RelatedTickets({ tickets = [] }) {
  if (!tickets.length) {
    return null;
  }

  return (
    <section className="mt-20">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#047BFB]">
          You may also like
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Similar Tickets
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.slice(0, 3).map((ticket, index) => (
          <RelatedTicket key={ticket._id} ticket={ticket} index={index} />
        ))}
      </div>
    </section>
  );
}

function RelatedTicket({ ticket, index }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -5,
      }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-[#38BDF8]/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <img
        src={ticket.image}
        alt={ticket.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-5">
        <p className="text-xs text-slate-500">{ticket.operator}</p>

        <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
          {ticket.title}
        </h3>

        <p className="mt-2 text-xs text-slate-500">
          {ticket.from} → {ticket.to}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-bold text-[#238FD7] text-[20px]">
            ৳{Number(ticket.price).toLocaleString()}
          </p>

          <Link
            href={`/tickets/${ticket._id}`}
            className="cursor-pointer flex items-center gap-1 text-xs font-bold bg-[#238FD7] text-white py-2.5 px-3 rounded-lg hover:bg-[#1A73AD] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            View
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
