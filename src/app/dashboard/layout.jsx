"use client";

import { useState } from "react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

import { DashboardRoleProvider } from "@/context/DashboardRoleContext";

import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500" />

          <p className="mt-4 text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  const role =
    session?.user?.role || "user";

  const user = {
    name:
      session?.user?.name || "User",

    image:
      session?.user?.image || "",
  };

  return (
    <DashboardRoleProvider role={role}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex min-h-screen">
          <DashboardSidebar
            role={role}
            open={sidebarOpen}
            setOpen={setSidebarOpen}
          />

          <div className="min-w-0 flex-1">
            <DashboardNavbar
              user={user}
              role={role}
              setSidebarOpen={
                setSidebarOpen
              }
            />

            <main className="p-4 sm:p-6 lg:p-8">
              <div className="mx-auto max-w-7xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </DashboardRoleProvider>
  );
}