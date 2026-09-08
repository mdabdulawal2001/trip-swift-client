"use client";

import { Edit3, Eye, MoreVertical, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

const tickets = [
  {
    id: "1",
    title: "Dhaka → Cox's Bazar",
    type: "AC Bus",
    price: 1450,
    quantity: 18,
    date: "18 Sep 2026",
    time: "08:30 AM",
    status: "Approved",
  },
  {
    id: "2",
    title: "Dhaka → Sylhet",
    type: "Train",
    price: 650,
    quantity: 42,
    date: "20 Sep 2026",
    time: "06:40 AM",
    status: "Pending",
  },
  {
    id: "3",
    title: "Dhaka → Rajshahi",
    type: "Train",
    price: 780,
    quantity: 35,
    date: "21 Sep 2026",
    time: "07:15 AM",
    status: "Rejected",
  },
];

export default function MyTicketsPage() {
  const handleDelete = (ticket) => {
    toast.success(`${ticket.title} removed successfully.`);
  };

  return (
    <div className="mx-auto max-w-7xl">
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

      <div className="grid gap-5">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-sky-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-900 sm:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  {ticket.type === "Train" ? (
                    <span>🚆</span>
                  ) : (
                    <span>🚌</span>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      {ticket.title}
                    </h2>

                    <StatusBadge status={ticket.status} />
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                    <span>{ticket.type}</span>
                    <span>{ticket.date}</span>
                    <span>{ticket.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs text-slate-500">Price</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    ৳{ticket.price}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Available</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {ticket.quantity}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                    <Eye className="h-4 w-4" />
                  </button>

                  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                    <Edit3 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(ticket)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 text-red-500 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
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