"use client";

import dynamic from "next/dynamic";
import ManageUsersSkeleton from "@/components/dashboard/admin/ManageUsersSkeleton";

const ManageUsers = dynamic(
  () => import("@/components/dashboard/admin/ManageUsers"),
  { loading: () => <ManageUsersSkeleton /> },
);

export default function ManageUsersClient() {
  return <ManageUsers />;
}
