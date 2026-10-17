import BookingsClient from "./BookingsClient";

export const metadata = {
  title: "My Bookings",
  description:
    "View and manage your TripSwift travel bookings.",
};

export default function BookingsPage() {
  return <BookingsClient />;
}