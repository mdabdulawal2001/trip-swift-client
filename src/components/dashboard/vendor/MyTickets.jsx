"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowRight,
  BusFront,
  CalendarDays,
  CarFront,
  Clock3,
  Edit3,
  Eye,
  MapPin,
  Plane,
  Plus,
  TrainFront,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@heroui/react";
import toast from "react-hot-toast";

import { getVendorTickets, deleteTicket } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import ConfirmModal from "@/components/shared/ConfirmModal";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);

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

  useEffect(() => {
    loadTickets();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      setDeleteLoading(true);

      await deleteTicket(deletingId);

      setTickets((prev) =>
        prev.filter((ticket) => ticket._id !== deletingId)
      );

      toast.success("Ticket deleted successfully");
      setDeletingId(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Failed to delete ticket"
      );
    } finally {
      setDeleteLoading(false);
    }
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
          <Button className="h-11 rounded-xl bg-sky-500 px-5 font-semibold text-white shadow-sm transition hover:bg-sky-600">
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
            You have not added any tickets yet. Create your
            first ticket and submit it for admin approval.
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => {
            const normalizedStatus = String(
              ticket.status || "pending"
            ).toLowerCase();

            const isRejected = normalizedStatus === "rejected";

            return (
              <motion.article
                key={ticket._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-shadow duration-300 dark:bg-slate-900 ${
                  isRejected
                    ? "border-red-200 dark:border-red-900/50"
                    : "border-slate-200 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:hover:border-sky-900 dark:hover:shadow-black/20"
                }`}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={ticket.image}
                    alt={ticket.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />

                  {/* Transport Type */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <TransportIcon type={ticket.type} />
                    {ticket.type}
                  </div>

                  {/* Verification Status */}
                  <StatusBadge status={ticket.status} />

                  {/* Price */}
                  <div className="absolute bottom-4 right-4 rounded-2xl border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/65">
                      Price
                    </p>

                    <p className="text-lg font-bold text-white">
                      ৳{Number(ticket.price || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Operator / Status */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-[#238fd8]">
                      {ticket.operator || "Ticket"}
                    </p>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isRejected
                          ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                          : normalizedStatus === "approved"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {isRejected
                        ? "Rejected"
                        : normalizedStatus === "approved"
                          ? "Approved"
                          : "Pending"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="line-clamp-1 text-xl font-bold text-slate-900 dark:text-white">
                    {ticket.title}
                  </h3>

                  {/* Route */}
                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-100 p-4 dark:border-slate-800! dark:bg-slate-950/70">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#047BFB]" />

                        <span className="h-7 w-px border-l border-dashed border-slate-300 dark:border-slate-700" />

                        <span className="h-2.5 w-2.5 rounded-full border-2 border-[#38BDF8] bg-white dark:bg-slate-950" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                              From
                            </p>

                            <p className="truncate font-semibold text-slate-800 dark:text-slate-200">
                              {ticket.from}
                            </p>
                          </div>

                          <ArrowRight
                            size={17}
                            className="shrink-0 text-slate-400"
                          />

                          <div className="min-w-0 text-right">
                            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                              To
                            </p>

                            <p className="truncate font-semibold text-slate-800 dark:text-slate-200">
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
                      <CalendarDays
                        size={15}
                        className="text-[#047BFB]"
                      />

                      <span className="truncate">
                        {ticket.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Clock3
                        size={15}
                        className="text-[#047BFB]"
                      />

                      <span className="truncate">
                        {ticket.departure}
                      </span>
                    </div>
                  </div>

                  {/* Extra Information */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400">
                      <Users size={13} />
                      {ticket.quantity} seats
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400">
                      <MapPin size={13} />
                      {ticket.from}
                    </span>
                  </div>

                  {/* Rejected Notice */}
                  {isRejected && (
                    <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 dark:border-red-900/40 dark:bg-red-500/10">
                      <p className="text-xs font-medium leading-relaxed text-red-600 dark:text-red-400">
                        This ticket was rejected by the admin.
                        Update and delete actions are disabled.
                      </p>
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-center gap-1">
                      {/* View */}
                      <Link
                        href={`/dashboard/my-tickets/${ticket._id}`}
                        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        title="View ticket"
                      >
                        <Eye size={16} />
                        View
                      </Link>

                      {/* Update */}
                      {isRejected ? (
                        <button
                          type="button"
                          disabled
                          className="flex min-h-11 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-bold text-slate-300 opacity-60 dark:border-slate-700 dark:text-slate-600"
                          title="Update disabled for rejected ticket"
                        >
                          <Edit3 size={16} />
                          Update
                        </button>
                      ) : (
                        <Link
                          href={`/dashboard/my-tickets/${ticket._id}/edit`}
                          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3 text-sm font-bold text-sky-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-100 dark:border-sky-900/40 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20"
                          title="Update ticket"
                        >
                          <Edit3 size={16} />
                          Update
                        </Link>
                      )}

                      {/* Delete */}
                      <button
                        type="button"
                        disabled={isRejected}
                        onClick={() => {
                          if (!isRejected) {
                            setDeletingId(ticket._id);
                          }
                        }}
                        className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-bold transition-all duration-300 ${
                          isRejected
                            ? "cursor-not-allowed border-slate-200 text-slate-300 opacity-60 dark:border-slate-700 dark:text-slate-600"
                            : "border-red-100 bg-red-50 text-red-500 hover:-translate-y-0.5 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                        }`}
                        title={
                          isRejected
                            ? "Delete disabled for rejected ticket"
                            : "Delete ticket"
                        }
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        onClose={() => {
          if (!deleteLoading) {
            setDeletingId(null);
          }
        }}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete Ticket?"
        message="This ticket will be permanently deleted. This action cannot be undone."
      />
    </div>
  );
}

/* Transport Icon */
function TransportIcon({ type }) {
  if (type === "Train") {
    return <TrainFront size={14} />;
  }

  if (type === "Flight") {
    return <Plane size={14} />;
  }

  if (type === "Car") {
    return <CarFront size={14} />;
  }

  return <BusFront size={14} />;
}

/* Status Badge */
function StatusBadge({ status }) {
  const normalizedStatus = String(
    status || "pending"
  ).toLowerCase();

  const statusStyles = {
    approved:
      "bg-emerald-500/90 text-white border-emerald-300/30",

    pending:
      "bg-amber-500/90 text-white border-amber-300/30",

    rejected:
      "bg-red-500/90 text-white border-red-300/30",
  };

  const statusLabels = {
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
  };

  return (
    <div
      className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-md ${
        statusStyles[normalizedStatus] ||
        statusStyles.pending
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />

      {statusLabels[normalizedStatus] || "Pending"}
    </div>
  );
}

