"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, Check, Eye, Loader2, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getAdminTickets, updateTicketStatus } from "@/lib/api";
import {
  addPdfReportFooter,
  createPdfReport,
  formatPdfDate,
} from "@/lib/pdf-report";
import ConfirmModal from "../../shared/ConfirmModal";
import Swal from "sweetalert2";

export default function ManageTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    ticketId: null,
    actionType: null, // "approved" or "rejected"
    loading: false,
  });

  const loadTickets = async () => {
    try {
      setLoading(true);

      const data = await getAdminTickets();

      if (data.success) {
        setTickets(data.tickets || []);
      }
    } catch (error) {
      console.error("Manage tickets error:", error);

      // toast.error(error.message || "Failed to load tickets.");
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to load tickets.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!tickets.length) {
      toast.error("No tickets available to export.");
      return;
    }

    try {
      const doc = await createPdfReport("Managed Tickets", "landscape", 224);
      const statusCounts = tickets.reduce((counts, ticket) => {
        const status = String(ticket.status || "pending").toLowerCase();
        counts[status] = (counts[status] || 0) + 1;
        return counts;
      }, {});

      doc.setFont("NotoSans", "normal");
      doc.setFontSize(9);
      doc.setTextColor(40, 50, 60);
      doc.text(`Tickets: ${tickets.length}`, 25, 38);
      doc.text(`Pending: ${statusCounts.pending || 0}`, 80, 38);
      doc.text(`Approved: ${statusCounts.approved || 0}`, 135, 38);
      doc.text(`Rejected: ${statusCounts.rejected || 0}`, 195, 38);

      autoTable(doc, {
        startY: 45,
        head: [
          [
            "#",
            "Ticket ID",
            "Title",
            "Route",
            "Vendor",
            "Type",
            "Date",
            "Price",
            "Seats",
            "Status",
          ],
        ],
        body: tickets.map((ticket, index) => [
          String(index + 1),
          String(ticket._id || "N/A"),
          ticket.title || "N/A",
          `${ticket.from || "N/A"} to ${ticket.to || "N/A"}`,
          ticket.vendorEmail || "Unknown vendor",
          ticket.type || "N/A",
          formatPdfDate(ticket.date),
          `BDT ${Number(ticket.price || 0).toLocaleString()}`,
          String(ticket.quantity ?? "N/A"),
          String(ticket.status || "pending"),
        ]),
        theme: "grid",
        margin: { left: 25, right: 25, bottom: 16 },
        rowPageBreak: "avoid",
        showHead: "everyPage",
        styles: {
          font: "NotoSans",
          fontSize: 7,
          cellPadding: 2,
          valign: "middle",
          overflow: "linebreak",
        },
        headStyles: {
          font: "NotoSans",
          fontStyle: "bold",
          fillColor: [27, 142, 217],
          textColor: [255, 255, 255],
        },
        columnStyles: {
          0: { cellWidth: 8, halign: "center" },
          1: { cellWidth: 24 },
          2: { cellWidth: 34 },
          3: { cellWidth: 32 },
          4: { cellWidth: 38 },
          5: { cellWidth: 18 },
          6: { cellWidth: 20 },
          7: { cellWidth: 19 },
          8: { cellWidth: 13 },
          9: { cellWidth: 18 },
        },
        didParseCell: (data) => {
          data.cell.styles.font = "NotoSans";
          if (data.section === "head") data.cell.styles.fontStyle = "bold";
        },
      });

      addPdfReportFooter(doc, "Managed Tickets");
      doc.save(
        `tripswift-managed-tickets-${new Date().toISOString().slice(0, 10)}.pdf`,
      );
      toast.success("Tickets PDF downloaded successfully.");
    } catch (error) {
      console.error("Manage tickets PDF export error:", error);
      toast.error(error?.message || "Failed to generate tickets PDF.");
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
              : ticket,
          ),
        );

        // toast.success(
        //   status === "approved"
        //     ? "Ticket approved successfully."
        //     : "Ticket rejected successfully.",
        // );
        Swal.fire({
          icon: "success",
          title:
            status === "approved" ? "Ticket Approved!" : "Ticket Rejected!",
          text:
            status === "approved"
              ? "Ticket approved successfully."
              : "Ticket rejected successfully.",
        });
      }
    } catch (error) {
      console.error("Status update error:", error);

      // toast.error(error.message || "Failed to update ticket.");
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to update ticket.",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // modal open
  const openConfirmModal = (ticketId, actionType) => {
    setConfirmModal({
      isOpen: true,
      ticketId,
      actionType,
      loading: false,
    });
  };

  // modal close
  const closeConfirmModal = () => {
    if (confirmModal.loading) return;
    setConfirmModal((previous) => ({
      ...previous,
      isOpen: false,
      loading: false,
    }));
  };

  // click confirm btn and api call
  const handleModalConfirm = async () => {
    const { ticketId, actionType } = confirmModal;
    if (!ticketId || !actionType) return;

    try {
      setConfirmModal((prev) => ({ ...prev, loading: true }));

      // handler
      await handleStatusChange(ticketId, actionType);

      closeConfirmModal();
    } catch (error) {
      console.error("Failed to update ticket status:", error);
      setConfirmModal((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  if (loading) {
    return <ManageTicketsSkeleton />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
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

        <button
          type="button"
          onClick={handleExport}
          disabled={tickets.length === 0}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700 sm:w-fit"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Export PDF
        </button>
      </div>

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
        <div className="space-y-4 md:hidden">
          {tickets.map((ticket) => (
            <article
              key={ticket._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="wrap-break-word font-semibold text-slate-900 dark:text-white">
                    {ticket.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">{ticket.type}</p>
                </div>
                <StatusBadge status={ticket.status} />
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950!">
                <p className="text-xs font-medium text-slate-500">Route</p>
                <p className="mt-1 wrap-break-word text-sm font-medium text-slate-700 dark:text-slate-300">
                  {ticket.from} → {ticket.to}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">Vendor</p>
                  <p className="mt-1 break-all text-sm text-slate-600 dark:text-slate-400">
                    {ticket.vendorEmail || "Unknown vendor"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Price</p>
                  <p className="mt-1 font-bold text-slate-900 dark:text-white">
                    ৳{ticket.price}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800!">
                <Link
                  href={`/dashboard/manage-tickets/${ticket._id}`}
                  className="inline-flex h-10 min-w-18 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900! dark:text-slate-300"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </Link>

                {ticket.status === "pending" && (
                  <>
                    <button
                      type="button"
                      disabled={
                        confirmModal.loading &&
                        confirmModal.ticketId === ticket._id
                      }
                      onClick={() => openConfirmModal(ticket._id, "approved")}
                      className="inline-flex h-10 min-w-22 flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-50 px-3 text-xs font-semibold text-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500/10 dark:text-emerald-400"
                      title="Approve ticket"
                    >
                      <Check className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      type="button"
                      disabled={
                        confirmModal.loading &&
                        confirmModal.ticketId === ticket._id
                      }
                      onClick={() => openConfirmModal(ticket._id, "rejected")}
                      className="inline-flex h-10 min-w-20 flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500/10 dark:text-red-400"
                      title="Reject ticket"
                    >
                      <X className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && tickets.length > 0 && (
        <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800! dark:bg-slate-950!">
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
                        {/* View */}
                        <Link href={`/dashboard/manage-tickets/${ticket._id}`}>
                          <button
                            type="button"
                            className="
          flex h-9 items-center gap-1.5 rounded-lg
          border border-slate-200
          bg-white px-3
          text-xs font-semibold text-slate-600
          shadow-sm
          transition-all duration-200
          hover:border-sky-200
          hover:bg-sky-50
          hover:text-sky-600
          active:scale-95
          dark:border-slate-700
          dark:bg-slate-900!
          dark:text-slate-300
          dark:hover:border-sky-500/30
          dark:hover:bg-sky-500/10
          dark:hover:text-sky-400
        "
                            title="View ticket"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </button>
                        </Link>

                        {/* Approve / Reject old */}
                        {/* {ticket.status === "pending" && (
                          <>
                            <button
                              type="button"
                              disabled={updatingId === ticket._id}
                              onClick={() =>
                                handleStatusChange(ticket._id, "approved")
                              }
                              className="
            flex h-9 items-center gap-1.5 rounded-lg
            bg-emerald-50 px-3
            text-xs font-semibold text-emerald-600
            transition-all duration-200
            hover:bg-emerald-100
            hover:shadow-sm
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:bg-emerald-500/10
            dark:text-emerald-400
            dark:hover:bg-emerald-500/20
          "
                              title="Approve ticket"
                            >
                              {updatingId === ticket._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}

                              <span>Approve</span>
                            </button>

                            <button
                              type="button"
                              disabled={updatingId === ticket._id}
                              onClick={() =>
                                handleStatusChange(ticket._id, "rejected")
                              }
                              className="
            flex h-9 items-center gap-1.5 rounded-lg
            bg-red-50 px-3
            text-xs font-semibold text-red-500
            transition-all duration-200
            hover:bg-red-100
            hover:shadow-sm
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:bg-red-500/10
            dark:text-red-400
            dark:hover:bg-red-500/20
          "
                              title="Reject ticket"
                            >
                              <X className="h-4 w-4" />
                              <span>Reject</span>
                            </button>
                          </>
                        )} */}

                        {/* Approve / Reject Buttons */}
                        {ticket.status === "pending" && (
                          <>
                            <button
                              type="button"
                              disabled={
                                confirmModal.loading &&
                                confirmModal.ticketId === ticket._id
                              }
                              onClick={() =>
                                openConfirmModal(ticket._id, "approved")
                              }
                              className="flex h-9 items-center gap-1.5 rounded-lg bg-emerald-50 px-3 text-xs font-semibold text-emerald-600 transition-all duration-200 hover:bg-emerald-100 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                              title="Approve ticket"
                            >
                              <Check className="h-4 w-4" />
                              <span>Approve</span>
                            </button>

                            <button
                              type="button"
                              disabled={
                                confirmModal.loading &&
                                confirmModal.ticketId === ticket._id
                              }
                              onClick={() =>
                                openConfirmModal(ticket._id, "rejected")
                              }
                              className="flex h-9 items-center gap-1.5 rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-500 transition-all duration-200 hover:bg-red-100 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                              title="Reject ticket"
                            >
                              <X className="h-4 w-4" />
                              <span>Reject</span>
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

      {/* Dynamic Reusable Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleModalConfirm}
        loading={confirmModal.loading}
        title={
          confirmModal.actionType === "approved"
            ? "Approve Ticket"
            : "Reject Ticket"
        }
        message={
          confirmModal.actionType === "approved"
            ? "Are you sure you want to approve this ticket? This action will process the request."
            : "Are you sure you want to reject this ticket? This action cannot be undone."
        }
        confirmText={
          confirmModal.actionType === "approved"
            ? "Yes, Approve"
            : "Yes, Reject"
        }
        cancelText="Cancel"
        confirmColor={
          confirmModal.actionType === "approved" ? "success" : "danger"
        }
      />
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
      className: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function ManageTicketsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header Skeleton */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

          <div className="h-9 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 sm:w-32" />
      </div>

      {/* Mobile Card Skeleton */}
      <div className="space-y-4 md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800! dark:bg-slate-900!"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950!">
              <div className="h-3 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="h-3 w-14 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-3 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>

            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800! dark:bg-slate-900 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            {/* Header */}
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950!">
              <tr>
                {[
                  "Ticket",
                  "Route",
                  "Vendor",
                  "Price",
                  "Status",
                  "Actions",
                ].map((item) => (
                  <th
                    key={item}
                    className={`px-5 py-4 ${item === "Actions" ? "text-right" : ""}`}
                  >
                    <div
                      className={`h-3 ${
                        item === "Ticket"
                          ? "w-20"
                          : item === "Route"
                            ? "w-14"
                            : item === "Vendor"
                              ? "w-16"
                              : item === "Price"
                                ? "w-12"
                                : item === "Status"
                                  ? "w-14"
                                  : "ml-auto w-16"
                      } animate-pulse rounded bg-slate-200 dark:bg-slate-800`}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {Array.from({ length: 7 }).map((_, index) => (
                <tr key={index}>
                  {/* Ticket */}
                  <td className="px-5 py-5">
                    <div className="space-y-2">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                      <div className="h-3 w-20 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </td>

                  {/* Route */}
                  <td className="px-5 py-5">
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  {/* Vendor */}
                  <td className="px-5 py-5">
                    <div className="h-4 w-44 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  {/* Price */}
                  <td className="px-5 py-5">
                    <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <div className="flex justify-end gap-2">
                      <div className="h-9 w-16 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

                      <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
