"use client";

import { useState } from "react";
import {
  Check,
  Eye,
  Search,
  Ticket,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const initialTickets = [
  {
    id: "TKT-1001",
    title: "Dhaka → Cox's Bazar",
    vendor: "Green Line Express",
    type: "AC Bus",
    price: 1450,
    quantity: 18,
    date: "18 Sep 2026",
    status: "Pending",
  },
  {
    id: "TKT-1002",
    title: "Dhaka → Chattogram",
    vendor: "Hanif Enterprise",
    type: "AC Bus",
    price: 1100,
    quantity: 24,
    date: "19 Sep 2026",
    status: "Approved",
  },
  {
    id: "TKT-1003",
    title: "Dhaka → Sylhet",
    vendor: "Bangladesh Railway",
    type: "Train",
    price: 650,
    quantity: 42,
    date: "20 Sep 2026",
    status: "Pending",
  },
  {
    id: "TKT-1004",
    title: "Dhaka → Rajshahi",
    vendor: "Silk City Express",
    type: "Train",
    price: 780,
    quantity: 35,
    date: "21 Sep 2026",
    status: "Rejected",
  },
  {
    id: "TKT-1005",
    title: "Dhaka → Rangpur",
    vendor: "Nabil Paribahan",
    type: "AC Bus",
    price: 1250,
    quantity: 16,
    date: "22 Sep 2026",
    status: "Pending",
  },
];

export default function ManageTicketsPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");

  const updateStatus = (id, status) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );

    toast.success(
      status === "Approved"
        ? "Ticket approved successfully."
        : "Ticket rejected successfully."
    );
  };

  const filteredTickets = tickets.filter((ticket) =>
    `${ticket.title} ${ticket.vendor} ${ticket.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
          Review, approve and manage tickets submitted by vendors.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ticket or vendor..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Ticket
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Vendor
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Quantity
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Departure
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-sky-500/10">
                        <Ticket className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {ticket.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {ticket.id} · {ticket.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                    {ticket.vendor}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-slate-900 dark:text-white">
                    ৳{ticket.price}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                    {ticket.quantity}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                    {ticket.date}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={ticket.status} />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                        <Eye className="h-4 w-4" />
                      </button>

                      {ticket.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(ticket.id, "Approved")
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                          >
                            <Check className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(ticket.id, "Rejected")
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600"
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

      {/* Mobile */}
      <div className="space-y-4 lg:hidden">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">
                  {ticket.title}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {ticket.vendor}
                </p>
              </div>

              <StatusBadge status={ticket.status} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <Info label="Type" value={ticket.type} />
              <Info label="Price" value={`৳${ticket.price}`} />
              <Info label="Quantity" value={ticket.quantity} />
              <Info label="Departure" value={ticket.date} />
            </div>

            {ticket.status === "Pending" && (
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => updateStatus(ticket.id, "Approved")}
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-semibold text-white"
                >
                  <Check className="h-4 w-4" />
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(ticket.id, "Rejected")}
                  className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 text-sm font-semibold text-white"
                >
                  <X className="h-4 w-4" />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
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
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}