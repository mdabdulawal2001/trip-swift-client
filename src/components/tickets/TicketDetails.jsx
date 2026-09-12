"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Bus,
  Plane,
  TrainFront,
  Car,
  Ticket,
} from "lucide-react";

import BookingModal from "./BookingModal";

const transportIcons = {
  Bus,
  Train: TrainFront,
  Flight: Plane,
  Car,
};

export default function TicketDetails({ ticket }) {
  const router = useRouter();

  const [isBookingOpen, setIsBookingOpen] =
    useState(false);

  const Icon =
    transportIcons[ticket.type] || Ticket;

  const isSoldOut = ticket.quantity <= 0;

  const departureTime = new Date(
    ticket.departureDateTime
  );

  const isDeparted =
    departureTime.getTime() <= Date.now();

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
          
          {/* Image */}
          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <img
              src={ticket.image}
              alt={ticket.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute left-5 top-5">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow dark:bg-slate-900/90">
                <Icon size={18} />
                {ticket.type}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-8 p-6 lg:grid-cols-[1fr_320px] lg:p-10">
            
            <div>
              <div className="mb-5">
                <p className="text-sm font-medium text-primary">
                  {ticket.operator}
                </p>

                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                  {ticket.title}
                </h1>
              </div>

              {/* Route */}
              <div className="mb-8 flex flex-col gap-5 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60 sm:flex-row sm:items-center sm:justify-between">
                
                <div>
                  <p className="text-sm text-default-500">
                    From
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {ticket.from}
                  </p>
                </div>

                <MapPin className="hidden sm:block" />

                <div>
                  <p className="text-sm text-default-500">
                    To
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {ticket.to}
                  </p>
                </div>
              </div>

              {/* Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                
                <InfoItem
                  icon={<CalendarDays size={20} />}
                  label="Departure Date"
                  value={ticket.date}
                />

                <InfoItem
                  icon={<Clock3 size={20} />}
                  label="Departure Time"
                  value={ticket.departure}
                />

                <InfoItem
                  icon={<Ticket size={20} />}
                  label="Available Tickets"
                  value={ticket.quantity}
                />

                <InfoItem
                  icon={<Icon size={20} />}
                  label="Transport"
                  value={ticket.type}
                />
              </div>

              {/* Perks */}
              {ticket.perks?.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-xl font-bold">
                    Included Perks
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {ticket.perks.map((perk) => (
                      <span
                        key={perk}
                        className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-8">
                <h2 className="mb-3 text-xl font-bold">
                  About This Ticket
                </h2>

                <p className="leading-7 text-default-500">
                  {ticket.description}
                </p>
              </div>
            </div>

            {/* Booking Card */}
            <div>
              <div className="sticky top-24 rounded-2xl border p-6 shadow-sm">
                <p className="text-sm text-default-500">
                  Price per ticket
                </p>

                <p className="mt-1 text-3xl font-bold">
                  ৳{ticket.price}
                </p>

                <div className="my-6 h-px bg-divider" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-default-500">
                      Available
                    </span>

                    <span className="font-semibold">
                      {ticket.quantity}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-default-500">
                      Departure
                    </span>

                    <span className="font-semibold">
                      {ticket.departure}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  disabled={isSoldOut || isDeparted}
                  className="mt-7 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeparted
                    ? "Departure Passed"
                    : isSoldOut
                    ? "Sold Out"
                    : "Book Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        ticket={ticket}
      />
    </>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs text-default-500">
          {label}
        </p>

        <p className="font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}