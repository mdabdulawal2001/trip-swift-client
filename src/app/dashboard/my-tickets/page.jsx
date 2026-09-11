"use client";

import { useEffect, useState } from "react";
import { Edit3, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

import { getVendorTickets } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const { data: session } = await authClient.getSession();

        const email = session?.user?.email;

        if (!email) {
          toast.error("Please login first.");
          return;
        }

        const data = await getVendorTickets(email);

        if (data.success) {
          setTickets(data.tickets || []);
        }
      } catch (error) {
        console.error("My tickets error:", error);

        toast.error(
          error.message || "Failed to load your tickets."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  const handleDelete = (ticket) => {
    toast.success(`${ticket.title} removed successfully.`);
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold text-sky-500">
            Vendor Dashboard
          </p>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            My Added Tickets
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage tickets you have created and submitted.
          </p>
        </div>

        <Link href="/dashboard/add-ticket">
          <Button className="h-11 rounded-xl bg-sky-500 px-5 font-semibold text-white hover:bg-sky-600">
            <Plus className="h-5 w-5" />
            Add Ticket
          </Button>
        </Link>
      </div>

      {/* Loading */}

      {loading && (
        <div className="flex min-h-60 items-center justify-center rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500" />
        </div>
      )}

      {/* Empty State */}

      {!loading && tickets.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-2xl dark:bg-sky-500/10">
            🎫
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            No tickets yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            You have not added any tickets yet. Create your first
            ticket and submit it for admin approval.
          </p>

          <Link href="/dashboard/add-ticket">
            <Button className="mt-6 rounded-xl bg-sky-500 px-5 font-semibold text-white hover:bg-sky-600">
              <Plus className="h-5 w-5" />
              Add Your First Ticket
            </Button>
          </Link>
        </div>
      )}

      {/* Tickets */}

      {!loading && tickets.length > 0 && (
        <div className="grid gap-5">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-900 sm:p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Ticket Info */}

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                    {getTransportIcon(ticket.type)}
                  </div>

                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-slate-900 dark:text-white">
                        {ticket.title}
                      </h2>

                      <StatusBadge
                        status={
                          ticket.approved === true
                            ? "Approved"
                            : ticket.approved === false
                              ? "Pending"
                              : "Pending"
                        }
                      />
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                      <span>
                        {ticket.from} → {ticket.to}
                      </span>

                      <span>{ticket.type}</span>

                      <span>{ticket.date}</span>

                      <span>{ticket.departure}</span>
                    </div>
                  </div>
                </div>

                {/* Price + Actions */}

                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-xs text-slate-500">
                      Price
                    </p>

                    <p className="font-bold text-slate-900 dark:text-white">
                      ৳{ticket.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Available
                    </p>

                    <p className="font-bold text-slate-900 dark:text-white">
                      {ticket.quantity}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {/* View */}

                    <Link href={`/tickets/${ticket._id}`}>
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                        title="View ticket"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </Link>

                    {/* Edit */}

                    <Link
                      href={`/dashboard/my-tickets/${ticket._id}/edit`}
                    >
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                        title="Edit ticket"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </Link>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() => handleDelete(ticket)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-500/10"
                      title="Delete ticket"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getTransportIcon(type) {
  if (type === "Train") return "🚆";
  if (type === "Flight") return "✈️";
  if (type === "Car") return "🚗";

  return "🚌";
}

function StatusBadge({ status }) {
  const styles = {
    Approved:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",

    Pending:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",

    Rejected:
      "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
}