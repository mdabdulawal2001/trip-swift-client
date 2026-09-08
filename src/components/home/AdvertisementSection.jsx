"use client";

import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTrain,
} from "react-icons/fa";

import { advertisedTickets } from "@/data/homeData";
import Image from "next/image";

const transportIcons = {
  "AC Bus": FaBus,
  Train: FaTrain,
};

const AdvertisementSection = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-8 rounded-full bg-[#047BFB]" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#047BFB]">
                Featured Deals
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[42px]">
              Featured <span className="text-[#047BFB]">Tickets</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Discover handpicked travel deals and book your next journey with
              confidence.
            </p>
          </div>

          <button className="group flex w-fit items-center gap-2 text-sm font-semibold text-[#047BFB] transition hover:text-[#035EC4]">
            View all tickets
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Tickets */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advertisedTickets.map((ticket, index) => {
            const TransportIcon = transportIcons[ticket.type] || FaBus;

            return (
              <motion.article
                key={ticket.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-[#38BDF8]/50 hover:shadow-[0_20px_50px_rgba(2,132,199,0.12)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    height={320}
                    width={480}
                    src={ticket.image}
                    alt={ticket.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur dark:bg-slate-900/90 dark:text-white">
                    <TransportIcon className="text-[#047BFB]" />
                    {ticket.type}
                  </div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs font-medium text-slate-200">
                      {ticket.operator}
                    </p>
                    <h3 className="mt-1 text-xl font-bold">{ticket.title}</h3>
                  </div>
                </div>

                {/* Content */}
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

                  {/* Perks */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ticket.perks.map((perk) => (
                      <span
                        key={perk}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>

                  <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Starting from
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                        ৳{ticket.price.toLocaleString()}
                      </p>
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#047BFB] dark:bg-white dark:text-slate-900 dark:hover:bg-[#047BFB] dark:hover:text-white">
                      Details
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;