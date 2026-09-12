"use client";

import { useState } from "react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

import { DashboardRoleProvider } from "@/context/DashboardRoleContext";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Temporary role for testing.
  // Later this will come from Better Auth + MongoDB.
  const role = "vendor"; // "user" | "vendor" | "admin"

  const user = {
    name: "Abdul Awal",
    image: "",
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
              setSidebarOpen={setSidebarOpen}
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