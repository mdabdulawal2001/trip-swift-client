"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import toast from "react-hot-toast";

import { getVendorBookings } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function RecentBookingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const { data: session } =
        await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        setRequests([]);
        return;
      }

      const data = await getVendorBookings(email);

      const bookings = data?.bookings || [];

      setRequests(bookings.slice(0, 3));
    } catch (error) {
      console.error(
        "Recent booking requests error:",
        error
      );

      toast.error(
        error.message ||
          "Failed to load recent booking requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();

    const handleFocus = () => {
      loadRequests();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );
    };
  }, []);

  if (loading) {
    return (
      <div className="mt-5 space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-[72px] animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-center dark:bg-slate-800/60">
        <Clock3 className="mx-auto h-8 w-8 text-slate-400" />

        <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          No booking requests yet
        </p>

        <p className="mt-1 text-xs text-slate-500">
          New passenger booking requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      {requests.map((request) => (
        <BookingRow
          key={request._id}
          name={request.userName}
          route={`${request.from} → ${request.to}`}
          quantity={`${request.quantity} ${
            Number(request.quantity) === 1
              ? "ticket"
              : "tickets"
          }`}
          status={request.status}
        />
      ))}
    </div>
  );
}

function BookingRow({
  name,
  route,
  quantity,
  status,
}) {
  const statusLabel =
    status === "accepted"
      ? "Accepted"
      : status === "rejected"
        ? "Rejected"
        : "Pending";

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">
          {name}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {route} · {quantity}
        </p>
      </div>

      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
          status === "accepted"
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            : status === "rejected"
              ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
              : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        }`}
      >
        {statusLabel}
      </span>
    </div>
  );
}