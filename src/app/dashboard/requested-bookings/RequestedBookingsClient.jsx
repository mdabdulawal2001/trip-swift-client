"use client";

import dynamic from "next/dynamic";
import RequestedBookingsSkeleton from "@/components/dashboard/vendor/vendorSkeletons/RequestedBookingsSkeleton";

const RequestedBookings = dynamic(
  () => import("@/components/dashboard/vendor/RequestedBookings"),
  { loading: () => <RequestedBookingsSkeleton /> },
);

export default function RequestedBookingsClient() {
  return <RequestedBookings />;
}
