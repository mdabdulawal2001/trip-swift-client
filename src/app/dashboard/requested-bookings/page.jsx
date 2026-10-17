import RequestedBookingsClient from "./RequestedBookingsClient";

export const metadata = {
  title: "Requested Bookings",
  description:
    "Review and manage booking requests on TripSwift.",
};

export default function RequestedBookingsPage() {
  return <RequestedBookingsClient />;
}
