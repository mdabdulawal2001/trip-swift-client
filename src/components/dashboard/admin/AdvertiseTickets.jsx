"use client";

import { useEffect, useState } from "react";

import { ArrowDownToLine, Check, Megaphone, Star, Ticket } from "lucide-react";
import { motion } from "framer-motion";

import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getAdminTickets, updateTicketAdvertisement } from "@/lib/api";
import {
  addPdfReportFooter,
  createPdfReport,
  formatPdfDate,
} from "@/lib/pdf-report";
import ConfirmModal from "../../shared/ConfirmModal";
import Swal from "sweetalert2";

export default function AdvertiseTickets() {
  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [updatingId, setUpdatingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    ticket: null,
    actionType: null, // "advertise" or "remove_advertise"
    loading: false,
  });

  const loadTickets = async () => {
    try {
      setLoading(true);

      const data = await getAdminTickets();

      setTickets(data?.tickets || []);
    } catch (error) {
      console.error("Advertise tickets error:", error);

      // toast.error(error.message || "Failed to load tickets");
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to load tickets",
      });

      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const advertisedCount = tickets.filter(
    (ticket) => ticket.advertised === true,
  ).length;

  const toggleAdvertisement = async (ticket) => {
    const newValue = !ticket.advertised;

    if (newValue && advertisedCount >= 6) {
      // toast.error("You can advertise a maximum of 6 tickets.");
      Swal.fire({
        icon: "error",
        title: "Limit Exceeded!",
        text: "You can advertise a maximum of 6 tickets.",
      });
      return;
    }

    try {
      setUpdatingId(ticket._id);

      const data = await updateTicketAdvertisement(ticket._id, newValue);

      const updatedTicket = data?.ticket;

      setTickets((prev) =>
        prev.map((item) =>
          item._id === ticket._id
            ? {
                ...item,
                advertised: updatedTicket?.advertised ?? newValue,
                advertisedAt: updatedTicket?.advertisedAt ?? null,
              }
            : item,
        ),
      );

      // toast.success(
      //   newValue
      //     ? "Ticket added to advertisement."
      //     : "Ticket removed from advertisement.",
      // );
      Swal.fire({
        title: newValue ? "Added!" : "Removed!",
        text: newValue
          ? "Ticket added to advertisement."
          : "Ticket removed from advertisement.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Failed to update advertisement.",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const approvedTickets = tickets.filter(
    (ticket) => ticket.status === "approved",
  );
  const advertisedTickets = approvedTickets.filter(
    (ticket) => ticket.advertised,
  );

  const handleExport = async () => {
    if (!advertisedTickets.length) {
      toast.error("No advertised tickets available to export.");
      return;
    }

    try {
      const doc = await createPdfReport("Advertised Tickets");
      doc.setFont("NotoSans", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40, 50, 60);
      doc.text(`Advertised Tickets: ${advertisedTickets.length}`, 25, 38);

      autoTable(doc, {
        startY: 45,
        head: [
          [
            "Ticket ID",
            "Title",
            "Route",
            "Operator",
            "Type",
            "Date",
            "Departure",
            "Price",
            "Seats",
            "Featured Since",
          ],
        ],
        body: advertisedTickets.map((ticket) => [
          String(ticket._id || "N/A"),
          ticket.title || "N/A",
          `${ticket.from || "N/A"} to ${ticket.to || "N/A"}`,
          ticket.operator || "N/A",
          ticket.type || "N/A",
          formatPdfDate(ticket.date),
          ticket.departure || "N/A",
          `BDT ${Number(ticket.price || 0).toLocaleString()}`,
          String(ticket.quantity ?? "N/A"),
          formatPdfDate(ticket.advertisedAt),
        ]),
        theme: "grid",
        margin: { left: 25, right: 25 },
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
        didParseCell: (data) => {
          data.cell.styles.font = "NotoSans";
          if (data.section === "head") data.cell.styles.fontStyle = "bold";
        },
      });

      addPdfReportFooter(doc, "Advertised Tickets");
      doc.save(
        `tripswift-advertised-tickets-${new Date().toISOString().slice(0, 10)}.pdf`,
      );
      toast.success("Advertised tickets PDF downloaded successfully.");
    } catch (error) {
      console.error("Advertised tickets PDF export error:", error);
      toast.error(
        error?.message || "Failed to generate advertised tickets PDF.",
      );
    }
  };

  // modal open
  const openAdConfirmModal = (ticket) => {
    setConfirmModal({
      isOpen: true,
      ticket,
      actionType: ticket.advertised ? "remove_advertise" : "advertise",
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

  // confirm and api call
  const handleModalConfirm = async () => {
    const { ticket } = confirmModal;
    if (!ticket) return;

    try {
      setConfirmModal((prev) => ({ ...prev, loading: true }));

      // toggleAdvertisement
      await toggleAdvertisement(ticket);

      closeConfirmModal();
    } catch (error) {
      console.error("Failed to toggle advertisement:", error);
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
    return <AdvertiseTicketsSkeleton />;
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
            Advertise Tickets
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Select approved tickets to feature on the homepage.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          disabled={advertisedTickets.length === 0}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700 sm:w-fit"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Export PDF
        </button>
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
          <p className="text-2xl font-bold text-sky-500">{advertisedCount}/6</p>

          <p className="text-xs text-slate-500">Tickets selected</p>
        </div>
      </div>

      {/* Empty */}
      {!loading && approvedTickets.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
          <Ticket className="mx-auto h-10 w-10 text-slate-400" />

          <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
            No approved tickets available.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Approve tickets first from Manage Tickets.
          </p>
        </div>
      )}

      {/* Tickets */}
      {!loading && approvedTickets.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {approvedTickets.map((ticket) => {
            const isUpdating = updatingId === ticket._id;

            return (
              <motion.article
                key={ticket._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={`
            group flex h-full flex-col overflow-hidden rounded-3xl
            border bg-white
            shadow-sm transition-shadow duration-300
            hover:shadow-xl hover:shadow-slate-900/5
            dark:bg-slate-900
            dark:hover:shadow-black/20
            ${
              ticket.advertised
                ? "border-sky-300 dark:border-sky-800"
                : "border-slate-200 dark:border-slate-800"
            }
          `}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="
                h-full w-full object-cover
                transition duration-700
                group-hover:scale-105
              "
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Transport Type */}
                  <div
                    className="
                absolute left-4 top-4 inline-flex items-center gap-2
                rounded-full border border-white/20
                bg-black/35 px-3 py-1.5
                text-xs font-semibold text-white
                backdrop-blur-md
              "
                  >
                    <Ticket size={14} />
                    {ticket.type}
                  </div>

                  {/* Featured */}
                  {ticket.advertised && (
                    <div className="absolute right-4 top-4">
                      <span
                        className="
                    inline-flex items-center gap-1.5
                    rounded-full
                    bg-sky-500 px-3 py-1.5
                    text-[11px] font-bold text-white
                    shadow-lg shadow-sky-900/20
                  "
                      >
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div
                    className="
                absolute bottom-4 right-4
                rounded-2xl border border-white/15
                bg-black/40 px-4 py-2
                backdrop-blur-md
              "
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/65">
                      From
                    </p>

                    <p className="text-lg font-bold text-white">
                      ৳{Number(ticket.price || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Operator + Status */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#238fd8]">
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
                      Approved
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="line-clamp-1 text-xl font-bold text-slate-900 dark:text-white">
                    {ticket.title}
                  </h2>

                  {/* Route */}
                  <div
                    className="
                mt-5 rounded-2xl
                border border-slate-100
                bg-slate-100 p-4
                dark:!border-slate-800
                dark:bg-slate-950/70
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

                          <span className="text-slate-400">→</span>

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
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        Date
                      </p>

                      <p className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                        {ticket.date}
                      </p>
                    </div>

                    <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        Departure
                      </p>

                      <p className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                        {ticket.departure}
                      </p>
                    </div>
                  </div>

                  {/* Perks */}
                  {ticket.perks?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ticket.perks.slice(0, 3).map((perk) => (
                        <span
                          key={perk}
                          className="
                      rounded-lg border border-slate-200
                      px-2.5 py-1.5
                      text-xs font-medium text-slate-600
                      dark:border-slate-700
                      dark:text-slate-400
                    "
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom */}
                  <div className="mt-auto pt-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {ticket.quantity}
                        </span>{" "}
                        seats available
                      </div>

                      <div className="text-xs text-slate-400">
                        {ticket.from}
                      </div>
                    </div>

                    {/* Advertisement Button */}
                    {/* old btn */}
                    {/* <button
                      disabled={isUpdating}
                      onClick={() => toggleAdvertisement(ticket)}
                      className={`
                  flex min-h-12 w-full items-center justify-center
                  gap-2 rounded-xl px-5
                  text-sm font-bold
                  transition-all duration-300
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${
                    ticket.advertised
                      ? `
                        border border-slate-200
                        bg-white text-slate-600
                        hover:-translate-y-0.5
                        hover:bg-slate-100
                        hover:shadow-md
                        dark:border-slate-700
                        dark:bg-slate-900!
                        dark:text-slate-300
                        dark:hover:bg-slate-800
                      `
                      : `
                        bg-[#238FD7] text-white
                        shadow-lg shadow-[#047BFB]/20
                        hover:-translate-y-0.5
                        hover:bg-[#1978B8]
                        hover:shadow-xl
                        hover:shadow-[#047BFB]/25
                      `
                  }
                `}
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
                    </button> */}

                    {/* Advertisement Button */}
                    <button
                      type="button"
                      disabled={
                        isUpdating ||
                        (confirmModal.loading &&
                          confirmModal.ticket?._id === ticket._id)
                      }
                      onClick={() => openAdConfirmModal(ticket)}
                      className={`
    flex min-h-12 w-full items-center justify-center
    gap-2 rounded-xl px-5
    text-sm font-bold
    transition-all duration-300
    disabled:cursor-not-allowed
    disabled:opacity-50
    ${
      ticket.advertised
        ? `
          border border-slate-200
          bg-white text-slate-600
          hover:-translate-y-0.5
          hover:bg-slate-100
          hover:shadow-md
          dark:border-slate-700
          dark:bg-slate-900!
          dark:text-slate-300
          dark:hover:bg-slate-800
        `
        : `
          bg-[#238FD7] text-white
          shadow-lg shadow-[#047BFB]/20
          hover:-translate-y-0.5
          hover:bg-[#1978B8]
          hover:shadow-xl
          hover:shadow-[#047BFB]/25
        `
    }
  `}
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
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
      {/* Reusable Confirm Modal for Advertisement */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleModalConfirm}
        loading={confirmModal.loading}
        confirmColor={
          confirmModal.actionType === "advertise" ? "primary" : "danger"
        }
        title={
          confirmModal.actionType === "advertise"
            ? "Advertise Ticket"
            : "Remove Advertisement"
        }
        message={
          confirmModal.actionType === "advertise"
            ? "Are you sure you want to highlight and promote this ticket on the advertisement banner?"
            : "Are you sure you want to remove this ticket from advertisement? It will no longer be highlighted."
        }
        confirmText={
          confirmModal.actionType === "advertise"
            ? "Yes, Advertise"
            : "Yes, Remove"
        }
        cancelText="Cancel"
      />
    </div>
  );
}

function AdvertiseTicketsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

          <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 sm:w-32" />
      </div>

      {/* Counter */}
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-2">
            <div className="h-4 w-44 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

            <div className="h-3 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        <div className="space-y-2 sm:text-right">
          <div className="ml-auto h-8 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

          <div className="ml-auto h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Image */}
            <div className="h-56 animate-pulse bg-slate-200 dark:bg-slate-800" />

            {/* Content */}
            <div className="p-5">
              {/* Operator + Status */}
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Title */}
              <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

              {/* Route */}
              <div className="mt-5 rounded-2xl bg-slate-100 p-4 dark:bg-slate-950!">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />

                    <div className="h-7 w-px bg-slate-300 dark:bg-slate-700" />

                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" />
                  </div>

                  <div className="flex flex-1 items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="h-2.5 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>

                    <div className="space-y-2 text-right">
                      <div className="ml-auto h-2.5 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                      <div className="ml-auto h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="h-2.5 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="space-y-2 text-right">
                  <div className="ml-auto h-2.5 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="ml-auto h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>

              {/* Perks */}
              <div className="mt-4 flex gap-2">
                <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

                <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />

                <div className="h-7 w-16 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
              </div>

              {/* Bottom */}
              <div className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Button */}
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
