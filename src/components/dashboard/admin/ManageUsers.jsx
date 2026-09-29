"use client";

import { useEffect, useState } from "react";

import {
  Ban,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserRound,
  UserCog,
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
      {/* Loading */}
      {loading && (
        <div className="space-y-6">
          {/* ================= HEADER SKELETON ================= */}
          <div className="mb-8">
            {/* Admin Dashboard */}
            <div className="mb-3 h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

            {/* Manage Users */}
            <div className="h-9 w-52 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 sm:h-10 sm:w-64" />

            {/* Description */}
            <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* ================= STATS SKELETON ================= */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="
            rounded-3xl
            border border-slate-200
            bg-white p-5
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-900
          "
              >
                {/* Icon */}
                <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                {/* Label */}
                <div className="mt-4 h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                {/* Number */}
                <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>

          {/* ================= SEARCH SKELETON ================= */}
          <div
            className="
        mb-6
        rounded-3xl
        border border-slate-200
        bg-white p-4
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
          >
            <div className="relative max-w-md">
              {/* Search icon placeholder */}
              <div className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

              {/* Search input */}
              <div
                className="
            h-11 w-full
            animate-pulse
            rounded-xl
            bg-slate-100
            dark:bg-slate-800
          "
              />
            </div>
          </div>

          {/* ================= USERS TABLE SKELETON ================= */}
          <div
            className="
        overflow-hidden
        rounded-3xl
        border border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
          >
            {/* Desktop Header */}
            <div
              className="
          hidden
          border-b border-slate-200
          bg-slate-50/80
          px-5 py-4
          dark:border-slate-800
          dark:bg-slate-950/60
          lg:grid
          lg:grid-cols-[minmax(300px,1fr)_190px_430px]
          lg:items-center
          lg:gap-4
        "
            >
              <div className="mx-auto h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

              <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

              <div className="mx-auto h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="px-4 py-5 sm:px-5">
                  {/* ================= DESKTOP ROW ================= */}
                  <div
                    className="
                hidden
                lg:grid
                lg:grid-cols-[minmax(300px,1fr)_190px_430px]
                lg:items-center
                lg:gap-4
              "
                  >
                    {/* User */}
                    <div className="flex items-center gap-3">
                      {/* Serial */}
                      <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      {/* Avatar */}
                      <div className="h-11 w-11 shrink-0 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

                      {/* Name + Email */}
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                        <div className="h-3 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    </div>

                    {/* Role + Status */}
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                      <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-2">
                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>

                  {/* ================= MOBILE / TABLET ROW ================= */}
                  <div className="lg:hidden">
                    {/* User */}
                    <div className="flex flex-col items-center gap-3">
                      {/* Serial */}
                      <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

                      {/* Avatar */}
                      <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      {/* Name + Email */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                        <div className="h-3 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    </div>

                    {/* Role + Status + Joined */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <div className="h-7 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                      <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

                      <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

                      <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Header */}
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
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or role..."
            className="
              h-11 w-full rounded-xl
              border border-slate-200
              bg-white pl-11 pr-4
              text-sm text-slate-900
              outline-none
              transition
              focus:border-sky-500
              focus:ring-2 focus:ring-sky-500/20
              dark:border-slate-700
              dark:bg-slate-950!
              dark:text-white
            "
          />
        </div>
      </div>

      {/* Empty */}
      {!loading && filteredUsers.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900!">
          <UserRound className="mx-auto h-10 w-10 text-slate-400" />

          <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
            No users found.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Try another name, email or role.
          </p>
        </div>
      )}

      {/* Users Table */}
      {!loading && filteredUsers.length > 0 && (
        <div
          className="
      overflow-x-auto
    rounded-3xl
    border border-slate-200
    bg-white shadow-sm
    dark:border-slate-800
    dark:bg-slate-900
    "
        >
          {/* Desktop Header */}
          <div
            className="
    hidden
    border-b border-slate-200
    bg-slate-50/80
    px-5 py-4
    dark:border-slate-800!
    dark:bg-slate-950/60
    lg:grid
    lg:grid-cols-[minmax(300px,1fr)_190px_430px]
    lg:items-center
    lg:gap-4
  "
          >
            <TableHeading className="text-center">User</TableHeading>

            <TableHeading>Role & Status</TableHeading>

            <TableHeading className="text-center">Actions</TableHeading>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredUsers.map((user, index) => {
              const isUpdating = updatingUserId === user.id;
              const isCurrentUser = user.id === currentUserId;

              return (
                <div
                  key={user.id}
                  className="
              px-4 py-5
              transition-colors duration-200
              hover:bg-slate-50/70
              sm:px-5
              dark:hover:bg-slate-800/30
            "
                >
                  {/* ================= DESKTOP ================= */}
                  <div
                    className="
    hidden
    lg:grid
    lg:grid-cols-[minmax(300px,1fr)_190px_430px]
    lg:items-center
    lg:gap-4
  "
                  >
                    {/* ================= USER ================= */}
                    <div className="flex min-w-0 items-center gap-3">
                      {/* Serial */}
                      <div
                        className="
        flex h-9 w-9 shrink-0
        items-center justify-center
        rounded-xl
        bg-slate-100
        text-xs font-bold
        text-slate-500
        dark:bg-slate-800
        dark:text-slate-400
      "
                      >
                        {index + 1}
                      </div>

                      {/* Avatar */}
                      <div
                        className="
        flex h-11 w-11 shrink-0
        items-center justify-center
        rounded-2xl
        bg-sky-50
        text-sky-600
        dark:bg-sky-500/10
        dark:text-sky-400
      "
                      >
                        <UserRound className="h-5 w-5" />
                      </div>

                      {/* Name + Email */}
                      <div className="min-w-0 flex-1">
                        <p
                          className="
          truncate
          text-sm font-bold
          text-slate-900
          dark:text-white
        "
                          title={user.name || "Unnamed User"}
                        >
                          {user.name || "Unnamed User"}
                        </p>

                        <p
                          className="
          mt-1 truncate
          text-xs
          text-slate-500
          dark:text-slate-400
        "
                          title={user.email}
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* ================= ROLE & STATUS ================= */}
                    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                      <RoleBadge role={user.role || "user"} />

                      <StatusBadge
                        status={user.banned ? "Blocked" : "Active"}
                      />

                      {user.role === "vendor" && user.isFraud && <FraudBadge />}
                    </div>

                    {/* ================= ACTIONS ================= */}
                    {/* Actions */}
                    <div className="flex min-w-0 justify-center">
                      {isCurrentUser ? (
                        <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold whitespace-nowrap text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                          <ShieldCheck className="h-4 w-4" />
                          Current Account
                        </span>
                      ) : (
                        <div className="flex shrink-0 items-center justify-start gap-1.5 whitespace-nowrap">
                          {/* Make Vendor / Make User */}
                          <RoleActionButton
                            icon={<UserCog className="h-3.5 w-3.5" />}
                            label={
                              user.role === "user" ? "Make Vendor" : "Make User"
                            }
                            onClick={() =>
                              handleRoleChange(
                                user,
                                user.role === "user" ? "vendor" : "user",
                              )
                            }
                            disabled={isUpdating}
                            variant={user.role === "user" ? "vendor" : "user"}
                          />

                          {/* Make Admin / Make Vendor */}
                          <RoleActionButton
                            icon={<ShieldCheck className="h-3.5 w-3.5" />}
                            label={
                              user.role === "admin"
                                ? "Make Vendor"
                                : "Make Admin"
                            }
                            onClick={() =>
                              handleRoleChange(
                                user,
                                user.role === "admin" ? "vendor" : "admin",
                              )
                            }
                            disabled={isUpdating}
                            variant={user.role === "admin" ? "vendor" : "admin"}
                          />

                          {/* Block / Unblock */}
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(user)}
                            className={`
          inline-flex h-9 shrink-0 items-center justify-center gap-1
          rounded-xl border px-2 text-[10px] font-bold whitespace-nowrap
          transition-all duration-200
          disabled:cursor-not-allowed disabled:opacity-50
          ${
            user.banned
              ? `
                border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100
                dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-400
              `
              : `
                border-red-200 bg-white text-red-500 hover:bg-red-50
                dark:border-red-900/40 dark:bg-slate-900! dark:text-red-400
              `
          }
        `}
                          >
                            {user.banned ? (
                              <>
                                <UserCheck className="h-3.5 w-3.5" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <Ban className="h-3.5 w-3.5" />
                                Block
                              </>
                            )}
                          </button>

                          {/* Fraud */}
                          {user.role === "vendor" && (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleFraudChange(user)}
                              className={`
            inline-flex h-9 shrink-0 items-center justify-center gap-1
            rounded-xl border px-2 text-[10px] font-bold whitespace-nowrap
            transition-all duration-200
            disabled:cursor-not-allowed disabled:opacity-50
            ${
              user.isFraud
                ? `
                  border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100
                  dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-400
                `
                : `
                  border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100
                  dark:border-orange-900/40 dark:bg-orange-500/10 dark:text-orange-400
                `
            }
          `}
                            >
                              {user.isFraud ? (
                                <>
                                  <ShieldCheck className="h-3.5 w-3.5" />
                                  Un-fraud
                                </>
                              ) : (
                                <>
                                  <ShieldAlert className="h-3.5 w-3.5" />
                                  Mark Fraud
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ================= MOBILE / TABLET ================= */}
                  <div className="lg:hidden">
                    {/* User */}
                    <div className="flex flex-col min-w-0 items-center gap-3">
                      {/* Serial */}
                      <div
                        className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-slate-100
                    text-[10px] font-bold
                    text-slate-500
                    dark:bg-slate-800
                    dark:text-slate-400
                  "
                      >
                        #{index + 1}
                      </div>

                      {/* Avatar */}
                      <div
                        className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-sky-50
                    text-sky-600
                    dark:bg-sky-500/10
                    dark:text-sky-400
                  "
                      >
                        <UserRound className="h-5 w-5" />
                      </div>

                      {/* Name + Email */}
                      <div className="min-w-0 flex-1 flex flex-col items-center">
                        <p
                          className="
                      truncate
                      text-sm font-bold
                      text-slate-900
                      dark:text-white
                    "
                        >
                          {user.name || "Unnamed User"}
                        </p>

                        <p
                          className="
                      mt-1 truncate
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Role + Status + Joined */}
                    <div
                      className="
                  mt-4
                  flex flex-wrap
                  items-center
                  justify-center
                  gap-2
                "
                    >
                      <RoleBadge role={user.role || "user"} />

                      <StatusBadge
                        status={user.banned ? "Blocked" : "Active"}
                      />

                      {user.role === "vendor" && user.isFraud && <FraudBadge />}

                      <span
                        className="
                    inline-flex h-7
                    items-center
                    rounded-lg
                    bg-slate-100
                    px-2.5
                    text-[11px] font-semibold
                    text-slate-500
                    dark:bg-slate-800
                    dark:text-slate-400
                  "
                      >
                        {formatDate(user.createdAt)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4">
                      {isCurrentUser ? (
                        <span
                          className="
                      inline-flex h-9
                      w-full
                      items-center justify-center
                      gap-2
                      rounded-xl
                      border border-slate-200
                      bg-slate-50
                      px-3
                      text-xs font-semibold
                      text-slate-500
                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-slate-400
                    "
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Current Account
                        </span>
                      ) : (
                        <div
                          className="
                       flex flex-wrap
                       items-center
                       justify-center
                       gap-2
                    "
                        >
                          {/* Make Vendor / Make User */}
                          <RoleActionButton
                            icon={<UserCog className="h-3.5 w-3.5" />}
                            label={
                              user.role === "user" ? "Make Vendor" : "Make User"
                            }
                            onClick={() =>
                              handleRoleChange(
                                user,
                                user.role === "user" ? "vendor" : "user",
                              )
                            }
                            disabled={isUpdating}
                            variant={user.role === "user" ? "vendor" : "user"}
                          />

                          {/* Make Admin / Make Vendor */}
                          <RoleActionButton
                            icon={<ShieldCheck className="h-3.5 w-3.5" />}
                            label={
                              user.role === "admin"
                                ? "Make Vendor"
                                : "Make Admin"
                            }
                            onClick={() =>
                              handleRoleChange(
                                user,
                                user.role === "admin" ? "vendor" : "admin",
                              )
                            }
                            disabled={isUpdating}
                            variant={user.role === "admin" ? "vendor" : "admin"}
                          />

                          {/* Block / Unblock */}
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(user)}
                            className={`
                        inline-flex h-9.5
                        w-auto
                        shrink-0
                        items-center justify-center
                        gap-1.5
                        rounded-xl
                        border
                        px-2
                        text-[11px] font-bold
                        whitespace-nowrap
                        transition-all duration-200
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        ${
                          user.banned
                            ? `
                              border-emerald-200
                              bg-emerald-50
                              text-emerald-600
                              hover:bg-emerald-100
                              dark:border-emerald-900/40
                              dark:bg-emerald-500/10
                              dark:text-emerald-400
                            `
                            : `
                              border-red-200
                              bg-white
                              text-red-500
                              hover:bg-red-50
                              dark:border-red-900/40
                              dark:bg-slate-900!
                              dark:text-red-400
                            `
                        }
                      `}
                          >
                            {user.banned ? (
                              <>
                                <UserCheck className="h-3.5 w-3.5" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <Ban className="h-3.5 w-3.5" />
                                Block
                              </>
                            )}
                          </button>

                          {/* Fraud */}
                          {user.role === "vendor" && (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleFraudChange(user)}
                              className={`
                          inline-flex h-9
                          w-auto
                          shrink-0
                          items-center justify-center
                          gap-1.5
                          rounded-xl
                          border
                          px-2
                          text-[11px] font-bold
                          whitespace-nowrap
                          transition-all duration-200
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                          ${
                            user.isFraud
                              ? `
                                border-emerald-200
                                bg-emerald-50
                                text-emerald-600
                                hover:bg-emerald-100
                                dark:border-emerald-900/40
                                dark:bg-emerald-500/10
                                dark:text-emerald-400
                              `
                              : `
                                border-orange-200
                                bg-orange-50
                                text-orange-600
                                hover:bg-orange-100
                                dark:border-orange-900/40
                                dark:bg-orange-500/10
                                dark:text-orange-400
                              `
                          }
                        `}
                            >
                              {user.isFraud ? (
                                <>
                                  <ShieldCheck className="h-3.5 w-3.5" />
                                  Un-fraud
                                </>
                              ) : (
                                <>
                                  <ShieldAlert className="h-3.5 w-3.5" />
                                  Mark Fraud
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function TableHeading({ children, className = "" }) {
  return (
    <p
      className={`
        text-[11px]
        font-bold
        uppercase
        tracking-[0.12em]
        text-slate-400
        ${className}
      `}
    >
      {children}
    </p>
  );
}

function RoleActionButton({ icon, label, onClick, disabled, variant }) {
  const styles = {
    vendor: `
      border-sky-200
      bg-sky-50
      text-sky-600
      hover:bg-sky-100
      dark:border-sky-900/40
      dark:bg-sky-500/10
      dark:text-sky-400
      dark:hover:bg-sky-500/20
    `,

    admin: `
      border-violet-200
      bg-violet-50
      text-violet-600
      hover:bg-violet-100
      dark:border-violet-900/40
      dark:bg-violet-500/10
      dark:text-violet-400
      dark:hover:bg-violet-500/20
    `,

    user: `
      border-slate-200
      bg-slate-50
      text-slate-600
      hover:bg-slate-100
      dark:border-slate-700
      dark:bg-slate-800
      dark:text-slate-300
      dark:hover:bg-slate-700
    `,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex h-9
        shrink-0
        items-center justify-center
        gap-1.5
        rounded-xl
        border
        px-2.5
        text-[11px] font-bold
        whitespace-nowrap
        transition-all duration-200
        hover:-translate-y-0.5
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${styles[variant] || styles.user}
      `}
    >
      {icon}
      {label}
    </button>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div
      className="
        group rounded-3xl
        border border-slate-200
        bg-white p-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
        dark:border-slate-800
        dark:bg-slate-900
        dark:hover:shadow-black/20
      "
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition-transform duration-300 group-hover:scale-105 dark:bg-sky-500/10">
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
      className={`
        inline-flex items-center
        rounded-full px-2.5 py-1
        text-[11px] font-bold
        capitalize
        ${styles[role] || styles.user}
      `}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full px-3 py-1
        text-xs font-semibold
        ${
          status === "Active"
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
        }
      `}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function FraudBadge() {
  return (
    <span
      className="
        inline-flex items-center gap-1.5
        rounded-full
        bg-orange-50 px-3 py-1
        text-xs font-semibold text-orange-600
        dark:bg-orange-500/10
        dark:text-orange-400
      "
    >
      <ShieldAlert className="h-3 w-3" />
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
