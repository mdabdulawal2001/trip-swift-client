"use client";

import { Check, Clock3, X } from "lucide-react";
import toast from "react-hot-toast";

const requests = [
  {
    id: "REQ-1001",
    passenger: "Abdul Karim",
    route: "Dhaka → Cox's Bazar",
    ticket: "Green Line Express",
    quantity: 2,
    total: 2900,
    date: "18 Sep 2026",
    status: "Pending",
  },
  {
    id: "REQ-1002",
    passenger: "Sadia Rahman",
    route: "Dhaka → Sylhet",
    ticket: "Bangladesh Railway",
    quantity: 1,
    total: 650,
    date: "20 Sep 2026",
    status: "Pending",
  },
  {
    id: "REQ-1003",
    passenger: "Tanvir Hasan",
    route: "Dhaka → Rajshahi",
    ticket: "Silk City Express",
    quantity: 3,
    total: 2340,
    date: "21 Sep 2026",
    status: "Accepted",
  },
];

export default function RequestedBookingsPage() {
  const handleAccept = (request) => {
    toast.success(`Booking ${request.id} accepted.`);
  };

  const handleReject = (request) => {
    toast.error(`Booking ${request.id} rejected.`);
  };

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

      <div className="grid gap-5">
        {requests.map((request) => (
          <div
            key={request.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-slate-400">
                    {request.id}
                  </span>

                  <Status status={request.status} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">
                    {request.passenger}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {request.route}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                  <span>{request.ticket}</span>
                  <span>{request.quantity} ticket(s)</span>
                  <span>{request.date}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="sm:text-right">
                  <p className="text-xs text-slate-500">Booking Total</p>

                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    ৳{request.total}
                  </p>
                </div>

                {request.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(request)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                      <Check className="h-4 w-4" />
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(request)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-500/10"
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
    </div>
  );
}

function Status({ status }) {
  if (status === "Accepted") {
    return (
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
        Accepted
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