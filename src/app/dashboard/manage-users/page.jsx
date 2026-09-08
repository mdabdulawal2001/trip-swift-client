"use client";

import { useState } from "react";
import {
  Ban,
  Search,
  ShieldCheck,
  UserCheck,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";

const initialUsers = [
  {
    id: 1,
    name: "Abdul Karim",
    email: "abdul@example.com",
    role: "user",
    status: "Active",
    joined: "12 Aug 2026",
  },
  {
    id: 2,
    name: "Rahim Travel",
    email: "rahim@example.com",
    role: "vendor",
    status: "Active",
    joined: "08 Aug 2026",
  },
  {
    id: 3,
    name: "Sadia Rahman",
    email: "sadia@example.com",
    role: "user",
    status: "Active",
    joined: "04 Aug 2026",
  },
  {
    id: 4,
    name: "Nabil Travels",
    email: "nabil@example.com",
    role: "vendor",
    status: "Blocked",
    joined: "28 Jul 2026",
  },
  {
    id: 5,
    name: "Admin Account",
    email: "admin@tripswift.com",
    role: "admin",
    status: "Active",
    joined: "15 Jul 2026",
  },
];

export default function ManageUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );

    toast.success("User status updated.");
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-sky-500">
          Admin Dashboard
        </p>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Manage Users
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage platform users, vendors, roles and account status.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <MiniStat
          icon={<UserRound className="h-5 w-5" />}
          label="Total Users"
          value="1,248"
        />

        <MiniStat
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Vendors"
          value="86"
        />

        <MiniStat
          icon={<Ban className="h-5 w-5" />}
          label="Blocked Accounts"
          value="14"
        />
      </div>

      {/* Search */}
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or role..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
      </div>

      {/* Users */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </h2>

                    <RoleBadge role={user.role} />
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <div>
                  <p className="text-xs text-slate-400">Joined</p>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {user.joined}
                  </p>
                </div>

                <StatusBadge status={user.status} />

                {user.role !== "admin" && (
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${
                      user.status === "Active"
                        ? "border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-500/10"
                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                    }`}
                  >
                    {user.status === "Active" ? (
                      <>
                        <Ban className="h-4 w-4" />
                        Block
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4" />
                        Unblock
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-sky-500/10">
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">{label}</p>

      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function RoleBadge({ role }) {
  const styles = {
    admin:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    vendor:
      "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    user:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${styles[role]}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        status === "Active"
          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
      }`}
    >
      {status}
    </span>
  );
}