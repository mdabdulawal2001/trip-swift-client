"use client";

import dynamic from "next/dynamic";

import { useDashboardRole } from "@/context/DashboardRoleContext";
import DashboardPageSkeleton from "@/components/dashboard/shared/DashboardPageSkeleton";

const UserDashboard = dynamic(
  () => import("@/components/dashboard/user/UserDashboard"),
  { loading: () => <DashboardPageSkeleton /> },
);
const VendorDashboard = dynamic(
  () => import("@/components/dashboard/vendor/VendorDashboard"),
  { loading: () => <DashboardPageSkeleton /> },
);
const AdminDashboard = dynamic(
  () => import("@/components/dashboard/admin/AdminDashboard"),
  { loading: () => <DashboardPageSkeleton /> },
);

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