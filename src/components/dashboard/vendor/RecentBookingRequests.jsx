"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import SectionTitle from "@/components/dashboard/shared/SectionTitle";
import BookingRow from "@/components/dashboard/shared/BookingRow";

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

      if (!email) return;

      const data = await getVendorBookings(
        email
      );

      setRequests(
        (data?.bookings || []).slice(0, 3)
      );
    } catch (error) {
      console.error(
        "Recent booking requests error:",
        error
      );

      toast.error(
        error.message ||
          "Failed to load booking requests."
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

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <SectionTitle
        title="Recent Booking Requests"
        action="View all"
        href="/dashboard/requested-bookings"
      />

      <div className="mt-5 space-y-3">
        {loading && (
          <>
            <BookingSkeleton />
            <BookingSkeleton />
            <BookingSkeleton />
          </>
        )}

        {!loading && requests.length === 0 && (
          <div className="rounded-2xl bg-slate-50 p-6 text-center dark:bg-slate-800/60">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              No booking requests yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              New booking requests will appear here.
            </p>
          </div>
        )}

        {!loading &&
          requests.map((booking) => (
            <BookingRow
              key={booking._id}
              name={
                booking.userName ||
                "Unknown user"
              }
              route={`${booking.from || "Unknown"} → ${
                booking.to || "Unknown"
              }`}
              quantity={`${booking.quantity || 0} ${
                Number(booking.quantity) === 1
                  ? "ticket"
                  : "tickets"
              }`}
              status={booking.status}
            />
          ))}
      </div>
    </div>
  );
}

function BookingSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}