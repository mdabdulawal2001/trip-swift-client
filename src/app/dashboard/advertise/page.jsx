"use client";

import { useState } from "react";
import {
  Check,
  Megaphone,
  Star,
  Ticket,
} from "lucide-react";
import toast from "react-hot-toast";

const initialTickets = [
  {
    id: 1,
    title: "Dhaka → Cox's Bazar",
    vendor: "Green Line Express",
    price: 1450,
    date: "18 Sep 2026",
    advertised: true,
  },
  {
    id: 2,
    title: "Dhaka → Chattogram",
    vendor: "Hanif Enterprise",
    price: 1100,
    date: "19 Sep 2026",
    advertised: true,
  },
  {
    id: 3,
    title: "Dhaka → Sylhet",
    vendor: "Bangladesh Railway",
    price: 650,
    date: "20 Sep 2026",
    advertised: false,
  },
  {
    id: 4,
    title: "Dhaka → Rajshahi",
    vendor: "Silk City Express",
    price: 780,
    date: "21 Sep 2026",
    advertised: false,
  },
  {
    id: 5,
    title: "Dhaka → Rangpur",
    vendor: "Nabil Paribahan",
    price: 1250,
    date: "22 Sep 2026",
    advertised: false,
  },
  {
    id: 6,
    title: "Dhaka → Khulna",
    vendor: "Shohagh Paribahan",
    price: 950,
    date: "23 Sep 2026",
    advertised: false,
  },
];

export default function AdvertisePage() {
  const [tickets, setTickets] = useState(initialTickets);

  const advertisedCount = tickets.filter(
    (ticket) => ticket.advertised
  ).length;

  const toggleAdvertisement = (id) => {
    const selected = tickets.find((ticket) => ticket.id === id);

    if (!selected.advertised && advertisedCount >= 6) {
      toast.error("You can advertise a maximum of 6 tickets.");
      return;
    }

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? { ...ticket, advertised: !ticket.advertised }
          : ticket
      )
    );

    toast.success(
      selected.advertised
        ? "Ticket removed from advertisement."
        : "Ticket added to advertisement."
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-sky-500">
          Admin Dashboard
        </p>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Advertise Tickets
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Select approved tickets to feature on the homepage.
        </p>
      </div>

      {/* Counter */}
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-sky-100 bg-sky-50 p-5 dark:border-sky-900/40 dark:bg-sky-500/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white">
            <Megaphone className="h-5 w-5" />
          </div>

          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              Homepage Advertisement
            </p>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose up to 6 approved tickets.
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-2xl font-bold text-sky-500">
            {advertisedCount}/6
          </p>

          <p className="text-xs text-slate-500">
            Tickets selected
          </p>
        </div>
      </div>

      {/* Tickets */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`relative overflow-hidden rounded-3xl border bg-white p-5 transition dark:bg-slate-900 ${
              ticket.advertised
                ? "border-sky-300 dark:border-sky-800"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            {ticket.advertised && (
              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-1 text-[11px] font-bold text-white">
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </span>
              </div>
            )}

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-500 dark:bg-sky-500/10">
              <Ticket className="h-5 w-5" />
            </div>

            <div className="mt-5">
              <h2 className="font-bold text-slate-900 dark:text-white">
                {ticket.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {ticket.vendor}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-400">
                  Price
                </p>

                <p className="font-bold text-slate-900 dark:text-white">
                  ৳{ticket.price}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">
                  Departure
                </p>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {ticket.date}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleAdvertisement(ticket.id)}
              className={`mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition ${
                ticket.advertised
                  ? "border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  : "bg-sky-500 text-white hover:bg-sky-600"
              }`}
            >
              {ticket.advertised ? (
                <>
                  <Check className="h-4 w-4" />
                  Remove Advertisement
                </>
              ) : (
                <>
                  <Megaphone className="h-4 w-4" />
                  Advertise Ticket
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}