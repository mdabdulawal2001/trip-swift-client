"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BusFront,
  CalendarDays,
  Clock3,
  MapPin,
  TrainFront,
  Users,
  Wifi,
  Zap,
  Utensils,
  Droplets,
  Plane,
  CarFront,
} from "lucide-react";

const getTransportIcon = (type) => {
  if (type === "Train") return TrainFront;
  if (type === "Flight") return Plane;
  if (type === "Car") return CarFront;

  return BusFront;
};

const getPerkIcon = (perk) => {
  const value = perk.toLowerCase();

  if (value.includes("wifi")) return Wifi;
  if (value.includes("charging")) return Zap;
  if (value.includes("food")) return Utensils;
  if (value.includes("water")) return Droplets;

  return Zap;
};

export default function TicketCard({ ticket }) {
  const TransportIcon = getTransportIcon(ticket.type);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        group flex h-full flex-col overflow-hidden rounded-3xl
        border border-slate-200 bg-white
        shadow-sm transition-shadow duration-300
        hover:shadow-xl hover:shadow-slate-900/5
        dark:border-slate-800 dark:bg-slate-900
        dark:hover:shadow-black/20
      "
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={ticket.image}
          alt={ticket.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="
            object-cover transition duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />

        {/* Type */}
        <div
          className="
            absolute left-4 top-4 inline-flex items-center gap-2
            rounded-full border border-white/20
            bg-black/35 px-3 py-1.5
            text-xs font-semibold text-white
            backdrop-blur-md
          "
        >
          <TransportIcon size={14} />
          {ticket.type}
        </div>

        {/* Price */}
        <div
          className="
            absolute bottom-4 right-4 rounded-2xl
            border border-white/15 bg-black/40
            px-4 py-2 backdrop-blur-md
          "
        >
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/65">
            From
          </p>

          <p className="text-lg font-bold text-white">
            ৳{ticket.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Operator */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#047BFB]">
            {ticket.operator}
          </p>

          <span
            className="
              inline-flex items-center gap-1.5
              rounded-full bg-emerald-50 px-2.5 py-1
              text-[11px] font-semibold text-emerald-600
              dark:bg-emerald-500/10 dark:text-emerald-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Available
          </span>
        </div>

        <h3 className="line-clamp-1 text-xl font-bold text-slate-900 dark:text-white">
          {ticket.title}
        </h3>

        {/* Route */}
        <div
          className="
            mt-5 rounded-2xl border border-slate-100
            bg-slate-50 p-4
            dark:border-slate-800 dark:bg-slate-950/70
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-[#047BFB]" />
              <span className="h-7 w-px border-l border-dashed border-slate-300 dark:border-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[#38BDF8] bg-white dark:bg-slate-950" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    From
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {ticket.from}
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="shrink-0 text-slate-400"
                />

                <div className="text-right">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    To
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {ticket.to}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <CalendarDays size={15} className="text-[#047BFB]" />
            <span>{ticket.date}</span>
          </div>

          <div className="flex items-center justify-end gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Clock3 size={15} className="text-[#047BFB]" />
            <span>{ticket.departure}</span>
          </div>
        </div>

        {/* Perks */}
        <div className="mt-4 flex flex-wrap gap-2">
          {ticket.perks.slice(0, 3).map((perk) => {
            const Icon = getPerkIcon(perk);

            return (
              <span
                key={perk}
                className="
                  inline-flex items-center gap-1.5
                  rounded-lg border border-slate-200
                  px-2.5 py-1.5 text-xs font-medium
                  text-slate-600
                  dark:border-slate-700 dark:text-slate-400
                "
              >
                <Icon size={13} />
                {perk}
              </span>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Users size={15} />
              <span>{ticket.quantity} seats left</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin size={13} />
              {ticket.from}
            </div>
          </div>

          <Link
            href={`/tickets/${ticket._id}`}
            className="
              flex min-h-12 w-full items-center justify-center gap-2
              rounded-xl bg-[#047BFB] px-5
              text-sm font-bold text-white
              shadow-lg shadow-[#047BFB]/20
              transition-all duration-300
              hover:-translate-y-0.5 hover:bg-[#035EC4]
              hover:shadow-xl hover:shadow-[#047BFB]/25
              focus:outline-none focus:ring-2
              focus:ring-[#047BFB]/40 focus:ring-offset-2
              dark:focus:ring-offset-slate-900
            "
          >
            View Ticket
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}