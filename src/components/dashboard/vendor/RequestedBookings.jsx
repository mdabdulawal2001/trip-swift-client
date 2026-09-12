"use client";

import { useEffect, useState } from "react";
import { Check, Clock3, X } from "lucide-react";
import toast from "react-hot-toast";

import { getVendorBookings, updateBookingStatus } from "@/lib/api";

import { authClient } from "@/lib/auth-client";

export default function RequestedBookings() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  const loadRequests = async () => {
    try {
      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        return;
      }

      const data = await getVendorBookings(email);

      setRequests(data?.bookings || []);
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };

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
        toast.success("Booking accepted successfully.");
      } else {
        toast.error("Booking rejected successfully.");
      }
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to update booking");
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading booking requests...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(request, "accepted")}
                        disabled={actionId === request._id}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Check className="h-4 w-4" />

                        {actionId === request._id ? "..." : "Accept"}
                      </button>

                      <button
                        onClick={() => handleStatusChange(request, "rejected")}
                        disabled={actionId === request._id}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:hover:bg-red-500/10"
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
