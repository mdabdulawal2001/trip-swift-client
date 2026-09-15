"use client";

import { useEffect, useState } from "react";

import {
  Ban,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserRound,
} from "lucide-react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const { data: session } = authClient.useSession();

  const currentUserId = session?.user?.id;

  const loadUsers = async () => {
    try {
      setLoading(true);

      const { data, error } = await authClient.admin.listUsers({
        query: {
          limit: 100,
          sortBy: "createdAt",
          sortDirection: "desc",
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to load users");
      }

      setUsers(data?.users || []);
    } catch (error) {
      console.error("Manage users error:", error);

      toast.error(error.message || "Failed to load users");

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (user, newRole) => {
    if (!user?.id || !newRole) return;

    if (user.id === currentUserId) {
      toast.error("You cannot change your own admin role.");
      return;
    }

    if (user.role === newRole) {
      return;
    }

    try {
      setUpdatingUserId(user.id);

      const { error } = await authClient.admin.setRole({
        userId: user.id,
        role: newRole,
      });

      if (error) {
        throw new Error(error.message || "Failed to change user role");
      }

      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id
            ? {
                ...item,
                role: newRole,
              }
            : item,
        ),
      );

      toast.success(`${user.name || "User"} is now ${newRole}.`);
    } catch (error) {
      console.error("Role change error:", error);

      toast.error(error.message || "Failed to change user role");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleStatusChange = async (user) => {
    if (!user?.id) return;

    if (user.id === currentUserId) {
      toast.error("You cannot block your own account.");
      return;
    }

    try {
      setUpdatingUserId(user.id);

      if (user.banned) {
        const { error } = await authClient.admin.unbanUser({
          userId: user.id,
        });

        if (error) {
          throw new Error(error.message || "Failed to unblock user");
        }

        setUsers((prev) =>
          prev.map((item) =>
            item.id === user.id
              ? {
                  ...item,
                  banned: false,
                }
              : item,
          ),
        );

        toast.success("User unblocked.");
      } else {
        const { error } = await authClient.admin.banUser({
          userId: user.id,
          banReason: "Blocked by administrator",
        });

        if (error) {
          throw new Error(error.message || "Failed to block user");
        }

        setUsers((prev) =>
          prev.map((item) =>
            item.id === user.id
              ? {
                  ...item,
                  banned: true,
                }
              : item,
          ),
        );

        toast.success("User blocked.");
      }
    } catch (error) {
      console.error("User status error:", error);

      toast.error(error.message || "Failed to update user status");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleFraudChange = async (user) => {
    if (!user?.id) return;

    if (user.id === currentUserId) {
      toast.error("You cannot mark your own account as fraud.");
      return;
    }

    if (user.role !== "vendor") {
      toast.error("Only vendor accounts can be marked as fraud.");
      return;
    }

    const nextFraudStatus = !user.isFraud;

    try {
      setUpdatingUserId(user.id);

      const { error } = await authClient.admin.updateUser({
        userId: user.id,
        data: {
          isFraud: nextFraudStatus,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to update fraud status");
      }

      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id
            ? {
                ...item,
                isFraud: nextFraudStatus,
              }
            : item,
        ),
      );

      toast.success(
        nextFraudStatus
          ? `${user.name || "Vendor"} marked as fraud.`
          : `${user.name || "Vendor"} is no longer marked as fraud.`,
      );
    } catch (error) {
      console.error("Fraud status error:", error);

      toast.error(error.message || "Failed to update fraud status");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name || ""} ${user.email || ""} ${user.role || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalUsers = users.length;

  const totalVendors = users.filter((user) => user.role === "vendor").length;

  const totalBlocked = users.filter((user) => user.banned).length;

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
          value={totalUsers}
        />

        <MiniStat
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Vendors"
          value={totalVendors}
        />

        <MiniStat
          icon={<Ban className="h-5 w-5" />}
          label="Blocked Accounts"
          value={totalBlocked}
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

      {/* Loading */}
      {loading && (
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && filteredUsers.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
          <UserRound className="mx-auto h-10 w-10 text-slate-400" />

          <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
            No users found.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Try another name, email or role.
          </p>
        </div>
      )}

      {/* Users */}
      {!loading && filteredUsers.length > 0 && (
        <div className="grid gap-4">
          {filteredUsers.map((user) => {
            const isUpdating = updatingUserId === user.id;

            const isCurrentUser = user.id === currentUserId;

            const status = user.banned ? "Blocked" : "Active";

            return (
              <div
                key={user.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* User info */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-slate-900 dark:text-white">
                          {user.name || "Unnamed User"}
                        </h2>

                        <RoleBadge role={user.role || "user"} />
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Joined */}
                    <div>
                      <p className="text-xs text-slate-400">Joined</p>

                      <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>

                    {/* Status */}
                    <StatusBadge status={status} />
                    {user.role === "vendor" && user.isFraud && <FraudBadge />}

                    {/* Role selector */}
                    <div>
                      <p className="mb-1 text-xs text-slate-400">Change Role</p>

                      <select
                        value={user.role || "user"}
                        disabled={isUpdating || isCurrentUser}
                        onChange={(e) => handleRoleChange(user, e.target.value)}
                        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold capitalize text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                      >
                        <option value="user">User</option>

                        <option value="vendor">Vendor</option>

                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    {/* Block / Unblock */}
                    {!isCurrentUser && (
                      <button
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(user)}
                        className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          user.banned
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : "border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-500/10"
                        }`}
                      >
                        {user.banned ? (
                          <>
                            <UserCheck className="h-4 w-4" />
                            Unblock
                          </>
                        ) : (
                          <>
                            <Ban className="h-4 w-4" />
                            Block
                          </>
                        )}
                      </button>
                    )}

                    {user.role === "vendor" && !isCurrentUser && (
                      <button
                        disabled={isUpdating}
                        onClick={() => handleFraudChange(user)}
                        className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          user.isFraud
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : "border border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-900/40 dark:hover:bg-orange-500/10"
                        }`}
                      >
                        {user.isFraud ? (
                          <>
                            <ShieldCheck className="h-4 w-4" />
                            Un-fraud
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="h-4 w-4" />
                            Mark Fraud
                          </>
                        )}
                      </button>
                    )}

                    {isCurrentUser && (
                      <span className="text-xs font-medium text-slate-400">
                        Current Account
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
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

    vendor: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",

    user: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${
        styles[role] || styles.user
      }`}
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

function FraudBadge() {
  return (
    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
      Fraud
    </span>
  );
}
function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
