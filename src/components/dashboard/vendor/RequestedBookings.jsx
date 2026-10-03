"use client";

import { useEffect, useState } from "react";
import { Check, Clock3, X } from "lucide-react";
import toast from "react-hot-toast";
import { ArrowDownToLine } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getVendorBookings, updateBookingStatus } from "@/lib/api";

import { authClient } from "@/lib/auth-client";
import RequestedBookingsSkeleton from "./vendorSkeletons/RequestedBookingsSkeleton";
import ConfirmModal from "../../shared/ConfirmModal";
import Swal from "sweetalert2";
import {
  addPdfReportFooter,
  createPdfReport,
  formatPdfDate,
} from "@/lib/pdf-report";

export default function RequestedBookings() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    request: null,
    status: null, // "accepted" | "rejected"
  });

  const loadRequests = async () => {
    try {
      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;
      console.log("Requested Bookings Session Email:", email);

      if (!email) {
        return;
      }

      const data = await getVendorBookings(email);

      setRequests(data?.bookings || []);
      console.log(data);
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!requests.length) {
      toast.error("No booking requests available to export.");
      return;
    }

    try {
      const doc = await createPdfReport("Requested Bookings", "landscape", 232);
      const pendingCount = requests.filter(
        (request) => request.status === "pending",
      ).length;
      const acceptedCount = requests.filter(
        (request) => request.status === "accepted",
      ).length;
      const rejectedCount = requests.filter(
        (request) => request.status === "rejected",
      ).length;

      doc.setFont("NotoSans", "normal");
      doc.setFontSize(9);
      doc.setTextColor(40, 50, 60);
      doc.text(`Requests: ${requests.length}`, 25, 38);
      doc.text(`Pending: ${pendingCount}`, 75, 38);
      doc.text(`Accepted: ${acceptedCount}`, 125, 38);
      doc.text(`Rejected: ${rejectedCount}`, 185, 38);

      autoTable(doc, {
        startY: 45,
        head: [
          [
            "#",
            "Booking ID",
            "Passenger",
            "Email",
            "Ticket",
            "Route",
            "Date",
            "Qty",
            "Total",
            "Status",
          ],
        ],
        body: requests.map((request, index) => [
          String(index + 1),
          String(request._id || "N/A"),
          request.userName || "N/A",
          request.userEmail || "N/A",
          request.ticketTitle || "N/A",
          `${request.from || "N/A"} to ${request.to || "N/A"}`,
          formatPdfDate(request.date),
          String(request.quantity ?? "N/A"),
          `BDT ${Number(request.totalPrice || 0).toLocaleString()}`,
          String(request.status || "pending"),
        ]),
        theme: "grid",
        margin: { left: 25, right: 25, bottom: 16 },
        pageBreak: "auto",
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
          1: { cellWidth: 25 },
          2: { cellWidth: 22 },
          3: { cellWidth: 35 },
          4: { cellWidth: 31 },
          5: { cellWidth: 35 },
          6: { cellWidth: 20 },
          7: { cellWidth: 10 },
          8: { cellWidth: 25 },
          9: { cellWidth: 21 },
        },
        didParseCell: (data) => {
          data.cell.styles.font = "NotoSans";
          if (data.section === "head") data.cell.styles.fontStyle = "bold";
        },
      });

      addPdfReportFooter(doc, "Requested Bookings");
      doc.save(
        `tripswift-requested-bookings-${new Date().toISOString().slice(0, 10)}.pdf`,
      );
      toast.success("Booking requests PDF downloaded successfully.");
    } catch (error) {
      console.error("Requested bookings PDF export error:", error);
      toast.error(error?.message || "Failed to generate booking requests PDF.");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    loadRequests();

    const interval = setInterval(() => {
      loadRequests();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleStatusChange = async (request, status) => {
    try {
      setActionId(request._id);

      const data = await updateBookingStatus(request._id, status);

      setRequests((prev) =>
        prev.map((item) => (item._id === request._id ? data.booking : item)),
      );

      if (status === "accepted") {
        // toast.success("Booking accepted successfully.");
        Swal.fire({
          icon: "success",
          title: "Booking Accepted!",
          text: "The booking request has been accepted successfully.",
        });
      } else {
        // toast.error("Booking rejected successfully.");
        Swal.fire({
          icon: "error",
          title: "Booking Rejected!",
          text: "The booking request has been rejected.",
        });
      }
    } catch (error) {
      console.error(error);

      // toast.error(error.message || "Failed to update booking");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update booking",
      });
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return <RequestedBookingsSkeleton />;
  }

  const closeConfirmModal = () => {
    if (actionId) return;
    setConfirmModal((previous) => ({
      ...previous,
      isOpen: false,
    }));
  };

  // modal open
  const triggerStatusModal = (request, status) => {
    setConfirmModal({
      isOpen: true,
      request,
      status,
    });
  };

  // confirm and api call
  const handleConfirmStatusChange = async () => {
    const { request, status } = confirmModal;
    if (!request || !status) return;

    await handleStatusChange(request, status);
    closeConfirmModal();
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold text-sky-500">
            Vendor Dashboard
          </p>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Requested Bookings
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Review and manage booking requests from passengers.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          disabled={requests.length === 0}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-700 sm:w-fit"
        >
          <ArrowDownToLine className="h-4 w-4" />
          Export PDF
        </button>
      </div>

      {!requests.length ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            No Booking Requests
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            New passenger booking requests will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {requests.map((request) => (
            <div
              key={request._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">
                      {request._id}
                    </span>

                    <Status status={request.status} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      {request.userName}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {request.from} → {request.to}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                    <span>{request.ticketTitle}</span>

                    <span>{request.quantity} ticket(s)</span>

                    <span>{request.date}</span>
                  </div>

                  <p className="text-xs text-slate-400">{request.userEmail}</p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="sm:text-right">
                    <p className="text-xs text-slate-500">Booking Total</p>

                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      ৳{Number(request.totalPrice).toLocaleString()}
                    </p>
                  </div>

                  {request.status === "pending" && (
                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                      <button
                        onClick={() => triggerStatusModal(request, "accepted")}
                        disabled={actionId === request._id}
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        <Check className="h-4 w-4" />

                        {actionId === request._id ? "..." : "Accept"}
                      </button>

                      <button
                        onClick={() => triggerStatusModal(request, "rejected")}
                        disabled={actionId === request._id}
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto dark:border-red-900/50 dark:hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmStatusChange}
        loading={actionId === confirmModal.request?._id}
        title={
          confirmModal.status === "accepted"
            ? "Accept Booking Request?"
            : confirmModal.status === "rejected"
              ? "Reject Booking Request?"
              : "Review Booking Request"
        }
        message={
          confirmModal.status === "accepted"
            ? "Are you sure you want to accept this booking request?"
            : confirmModal.status === "rejected"
              ? "Are you sure you want to reject this booking request? This action cannot be undone."
              : "Choose whether to accept or reject this booking request."
        }
        confirmText={
          confirmModal.status === "accepted"
            ? "Accept Booking"
            : confirmModal.status === "rejected"
              ? "Reject Booking"
              : "Confirm"
        }
        cancelText="Keep Request"
        confirmColor={
          confirmModal.status === "accepted"
            ? "success"
            : confirmModal.status === "rejected"
              ? "danger"
              : "primary"
        }
      />
    </div>
  );
}

function Status({ status }) {
  if (status === "accepted") {
    return (
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
        Accepted
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">
        <X className="h-3.5 w-3.5" />
        Rejected
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
      <Clock3 className="h-3.5 w-3.5" />
      Pending
    </span>
  );
}
