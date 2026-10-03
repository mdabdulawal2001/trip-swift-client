"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BusFront,
  Car,
  CheckCircle2,
  Plane,
  Search,
  ShieldCheck,
  TicketCheck,
  TrainFront,
  Users,
} from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: Search,
    title: "Discover Tickets",
    description:
      "Explore available travel tickets and find journeys that match your destination, date, and preferences.",
  },
  {
    icon: TicketCheck,
    title: "Easy Booking",
    description:
      "Choose your preferred ticket and complete the booking process through a simple and user-friendly experience.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Experience",
    description:
      "TripSwift is designed with protected user flows and role-based access for a safer booking experience.",
  },
  {
    icon: Users,
    title: "Role-Based Platform",
    description:
      "Users, vendors, and administrators get dedicated features according to their responsibilities.",
  },
];

const travelTypes = [
  {
    icon: BusFront,
    title: "Bus",
    description: "Find and book comfortable bus journeys.",
  },
  {
    icon: TrainFront,
    title: "Train",
    description: "Explore train routes and available tickets.",
  },
  {
    icon: Plane,
    title: "Flight",
    description: "Discover flight options for your journey.",
  },
  {
    icon: Car,
    title: "Car",
    description: "Discover Car options for your journey.",
  },
];

const stats = [
  {
    value: "01",
    label: "Simple Booking Flow",
  },
  {
    value: "03",
    label: "Platform Roles",
  },
  {
    value: "24/7",
    label: "Access to the Platform",
  },
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);
  return (
    <main className="overflow-hidden">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="absolute left-1/2 top-0 -z-10 h-105 w-175 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/10" />

        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-300">
              About TripSwift
            </span>

            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Travel made{" "}
              <span className="bg-linear-to-r from-[#238FD7] to-cyan-400 bg-clip-text text-transparent">
                simpler
              </span>
              .
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-400">
              TripSwift is a modern travel ticket booking platform designed to
              make discovering, booking, and managing journeys easier. From
              finding the right ticket to managing bookings, everything is
              organized in one place.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/tickets"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#238FD7] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-[#1978B8]"
              >
                Explore Tickets
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-700 dark:hover:bg-sky-950/30 dark:hover:text-sky-300"
              >
                Create an Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          WHAT IS TRIPSWIFT
      ====================================================== */}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              One platform
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Everything you need for your next journey.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-400">
              TripSwift brings travelers and ticket providers together through a
              structured digital platform. Travelers can browse available
              tickets and manage their bookings, while vendors can manage their
              listings and booking activities.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Browse available travel tickets",
                "Manage bookings from your dashboard",
                "Dedicated features for vendors and administrators",
                "Responsive experience across devices",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="rounded-2xl bg-linear-to-br from-sky-500 to-blue-700 p-7 text-white">
              <p className="text-sm font-semibold text-sky-100">TRIPSWIFT</p>

              <h3 className="mt-3 text-3xl font-black">Travel • Book • Go</h3>

              <p className="mt-4 text-sm leading-6 text-sky-50/90">
                A connected travel experience where discovering and managing
                tickets feels simple.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center dark:border-slate-800! dark:bg-slate-950"
                >
                  <p className="text-lg font-black text-sky-600 dark:text-sky-400">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] font-medium leading-4 text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          TRAVEL TYPES
      ====================================================== */}

      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-slate-950/50">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Travel options
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
              Choose your way to travel
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              TripSwift is designed to support different types of journeys from
              one convenient platform.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {travelTypes.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          FEATURES
      ====================================================== */}

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Why TripSwift
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
              Built around a smoother travel experience.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-r from-[#1978B8] to-[#238FD7] px-6 py-12 text-center shadow-2xl shadow-sky-900/15 sm:px-10">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Ready for your next journey?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-sky-50 sm:text-base">
            Explore available tickets and start planning your next trip with
            TripSwift.
          </p>

          <Link
            href="/tickets"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1978B8] shadow-lg transition hover:-translate-y-0.5 hover:bg-sky-50"
          >
            Browse Tickets
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
