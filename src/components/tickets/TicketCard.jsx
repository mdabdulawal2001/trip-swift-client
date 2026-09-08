"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaTrain,
} from "react-icons/fa";

const TicketCard = ({ ticket, index = 0 }) => {
  const TransportIcon = ticket.type === "Train" ? FaTrain : FaBus;

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
      }}
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-[#38BDF8]/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur dark:bg-slate-900/90 dark:text-white">
          <TransportIcon className="text-[#047BFB]" />
          {ticket.type}
        </div>

        <div className="absolute bottom-4 left-4">
          <p className="text-xs text-slate-300">
            {ticket.operator}
          </p>

          <h3 className="mt-1 text-xl font-bold text-white">
            {ticket.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <FaClock className="text-[#047BFB]" />
            {ticket.departure}
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#047BFB]" />
            {ticket.date}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {ticket.perks.map((perk) => (
            <span
              key={perk}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            >
              {perk}
            </span>
          ))}
        </div>

        <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500">
              Price
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              ৳{ticket.price.toLocaleString()}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              {ticket.quantity} seats available
            </p>
          </div>

          <Link
            href={`/tickets/${ticket.id}`}
            className="group/button flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#047BFB] dark:bg-white dark:text-slate-900 dark:hover:bg-[#047BFB] dark:hover:text-white"
          >
            Details

            <FaArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default TicketCard;