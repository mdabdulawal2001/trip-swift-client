"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, TicketCheck, WalletCards } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Find a journey",
    description:
      "Search available tickets by departure city, destination, and transport type.",
  },
  {
    icon: TicketCheck,
    number: "02",
    title: "Request your booking",
    description:
      "Review the ticket details and send a booking request from the ticket page.",
  },
  {
    icon: WalletCards,
    number: "03",
    title: "Complete payment",
    description:
      "Track your request in your dashboard and continue to checkout when payment is available.",
  },
];

export default function HowItWorks() {
  return (
    <section className="overflow-hidden bg-white py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-white sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#238FD7] dark:text-[#38BDF8]">
            A clear booking flow
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From search to{" "}
            <span className="text-[#238FD7] dark:text-[#38BDF8]">
              departure
            </span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Find a listed journey, keep track of your booking request, and
            manage your trip from your TripSwift dashboard.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, number, title, description }, index) => (
            <motion.article
              key={number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition-colors duration-300 hover:border-sky-200 hover:bg-white hover:shadow-lg hover:shadow-sky-950/5 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-sky-800 dark:hover:bg-slate-950"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-[#238FD7] transition-colors group-hover:bg-[#238FD7] group-hover:text-white dark:bg-sky-500/10 dark:text-[#38BDF8] dark:group-hover:bg-sky-500">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold tracking-widest text-slate-400 dark:text-slate-600">
                  {number}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/tickets"
            className="w-full md:w-auto group mx-auto mt-9 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#238FD7] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1978B8] hover:shadow-lg hover:shadow-sky-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            Browse available tickets
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
