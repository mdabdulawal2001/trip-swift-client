"use client";

import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaTrain,
} from "react-icons/fa";

import { latestTickets } from "@/data/homeData";
import Image from "next/image";

const transportIcons = {
  "AC Bus": FaBus,
  Train: FaTrain,
};

const LatestTickets = () => {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70 py-20 dark:border-slate-800 dark:bg-slate-950/50 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-[#047BFB]" />

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#047BFB]">
              Fresh Arrivals
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[42px]">
                Latest <span className="text-[#047BFB]">Tickets</span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                Explore recently added tickets and find the right journey for
                your next destination.
              </p>
            </div>

            <button className="group flex w-fit items-center gap-2 text-sm font-semibold text-[#047BFB]">
              Explore all
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Ticket list */}
        <div className="grid gap-4 md:grid-cols-2">
          {latestTickets.map((ticket, index) => {
            const TransportIcon = transportIcons[ticket.type] || FaBus;

            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -4 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-[#38BDF8]/60 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-44">
                    <Image
                      height={192}
                      width={176}
                      src={ticket.image}
                      alt={ticket.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-800 backdrop-blur dark:bg-slate-900/90 dark:text-white">
                      <TransportIcon className="text-[#047BFB]" />
                      {ticket.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
                        {ticket.operator}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {ticket.title}
                      </h3>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-y-3 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-[#047BFB]" />
                        {ticket.departure}
                      </div>

                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-[#047BFB]" />
                        {ticket.date}
                      </div>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                      <div>
                        <p className="text-[11px] text-slate-500">
                          Available seats
                        </p>

                        <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                          {ticket.seats}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[11px] text-slate-500">
                          Starting from
                        </p>

                        <p className="text-xl font-bold text-slate-900 dark:text-white">
                          ৳{ticket.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Perks */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {ticket.perks.map((perk) => (
                        <span
                          key={perk}
                          className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestTickets;