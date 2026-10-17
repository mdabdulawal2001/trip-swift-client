"use client";

import dynamic from "next/dynamic";
import BookingsSkeleton from "@/components/dashboard/user/BookingsSkeleton";

const MyBookedTickets = dynamic(
  () => import("@/components/dashboard/user/MyBookedTickets"),
  { loading: () => <BookingsSkeleton /> },
);

export default function BookingsClient() {
  return <MyBookedTickets />;
}
