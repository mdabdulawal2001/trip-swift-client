"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Eye,
  Loader2,
  X,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  getAdminTickets,
  updateTicketStatus,
} from "@/lib/api";

export default function ManageTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadTickets = async () => {
    try {
      setLoading(true);

      const data = await getAdminTickets();

      if (data.success) {
        setTickets(data.tickets || []);
      }
    } catch (error) {
      console.error("Manage tickets error:", error);

      toast.error(
        error.message || "Failed to load tickets."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);

      const data = await updateTicketStatus(id, status);

      if (data.success) {
        setTickets((previous) =>
          previous.map((ticket) =>
            ticket._id === id
              ? {
                  ...ticket,
                  status,
                }
              : ticket
          )
        );

        toast.success(
          status === "approved"
            ? "Ticket approved successfully."
            : "Ticket rejected successfully."
        );
      }
    } catch (error) {
      console.error("Status update error:", error);

      toast.error(
        error.message || "Failed to update ticket."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}

      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-sky-500">
          Admin Dashboard
        </p>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Manage Tickets
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Review, approve, or reject vendor-submitted tickets.
        </p>
      </div>

      {/* Loading */}

      {loading && (
        <div className="flex min-h-60 items-center justify-center rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        </div>
      )}

      {/* Empty */}

      {!loading && tickets.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            No tickets found
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            There are no tickets to manage right now.
          </p>
        </div>
      )}

      {/* Tickets */}

      {!loading && tickets.length > 0 && (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Ticket
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Route
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Vendor
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Price
                  </th>

                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-950"
                  >
                    <td className="px-5 py-5">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {ticket.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {ticket.type}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {ticket.from} → {ticket.to}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="max-w-[220px] truncate text-sm text-slate-600 dark:text-slate-400">
                        {ticket.vendorEmail || "Unknown vendor"}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-bold text-slate-900 dark:text-white">
                        ৳{ticket.price}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <StatusBadge status={ticket.status} />
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex justify-end gap-2">
                        <Link href={`/tickets/${ticket._id}`}>
                          <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>

                        {ticket.status === "pending" && (
                          <>
                            <button
                              type="button"
                              disabled={updatingId === ticket._id}
                              onClick={() =>
                                handleStatusChange(
                                  ticket._id,
                                  "approved"
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100 disabled:opacity-50 dark:bg-emerald-500/10 dark:text-emerald-400"
                              title="Approve"
                            >
                              {updatingId === ticket._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </button>

                            <button
                              type="button"
                              disabled={updatingId === ticket._id}
                              onClick={() =>
                                handleStatusChange(
                                  ticket._id,
                                  "rejected"
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-500/10 dark:text-red-400"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    pending: {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },

    approved: {
      label: "Approved",
      className:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },

    rejected: {
      label: "Rejected",
      className:
        "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    },
  };

  const config =
    statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}