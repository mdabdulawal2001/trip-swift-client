"use client";

import { useEffect, useState } from "react";

import {
  Check,
  Megaphone,
  Star,
  Ticket,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getAdminTickets,
  updateTicketAdvertisement,
} from "@/lib/api";

export default function AdvertiseTickets() {
  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState(null);

  const loadTickets = async () => {
    try {
      setLoading(true);

      const data =
        await getAdminTickets();

      setTickets(data?.tickets || []);
    } catch (error) {
      console.error(
        "Advertise tickets error:",
        error
      );

      toast.error(
        error.message ||
          "Failed to load tickets"
      );

      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const advertisedCount =
    tickets.filter(
      (ticket) =>
        ticket.advertised === true
    ).length;

  const toggleAdvertisement = async (
    ticket
  ) => {
    const newValue =
      !ticket.advertised;

    if (
      newValue &&
      advertisedCount >= 6
    ) {
      toast.error(
        "You can advertise a maximum of 6 tickets."
      );
      return;
    }

    try {
      setUpdatingId(ticket._id);

      const data =
        await updateTicketAdvertisement(
          ticket._id,
          newValue
        );

      const updatedTicket =
        data?.ticket;

      setTickets((prev) =>
        prev.map((item) =>
          item._id === ticket._id
            ? {
                ...item,
                advertised:
                  updatedTicket?.advertised ??
                  newValue,
                advertisedAt:
                  updatedTicket?.advertisedAt ??
                  null,
              }
            : item
        )
      );

      toast.success(
        newValue
          ? "Ticket added to advertisement."
          : "Ticket removed from advertisement."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.message ||
          "Failed to update advertisement."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const approvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "approved"
    );

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
          Select approved tickets to feature
          on the homepage.
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
              Choose up to 6 approved
              tickets.
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

      {/* Loading */}
      {loading && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            )
          )}
        </div>
      )}

      {/* Empty */}
      {!loading &&
        approvedTickets.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
            <Ticket className="mx-auto h-10 w-10 text-slate-400" />

            <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              No approved tickets available.
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Approve tickets first from
              Manage Tickets.
            </p>
          </div>
        )}

      {/* Tickets */}
      {!loading &&
        approvedTickets.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {approvedTickets.map(
              (ticket) => {
                const isUpdating =
                  updatingId ===
                  ticket._id;

                return (
                  <div
                    key={ticket._id}
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
                        {ticket.operator}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                      <div>
                        <p className="text-xs text-slate-400">
                          Price
                        </p>

                        <p className="font-bold text-slate-900 dark:text-white">
                          ৳
                          {Number(
                            ticket.price ||
                              0
                          ).toLocaleString()}
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
                      disabled={isUpdating}
                      onClick={() =>
                        toggleAdvertisement(
                          ticket
                        )
                      }
                      className={`mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
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
                );
              }
            )}
          </div>
        )}
    </div>
  );
}