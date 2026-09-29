"use client";

import { useDashboardRole } from "@/context/DashboardRoleContext";

import UserDashboard from "@/components/dashboard/user/UserDashboard";
import VendorDashboard from "@/components/dashboard/vendor/VendorDashboard";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";

export default function DashboardPage() {
  const role = useDashboardRole();

  if (role === "vendor") {
    return <VendorDashboard />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}