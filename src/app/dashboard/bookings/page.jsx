import MyBookedTickets from "@/components/dashboard/user/MyBookedTickets";
export const metadata = {
  title: "My Bookings",
  description:
    "View and manage your TripSwift travel bookings.",
};
export default function BookingsPage() {
  return <MyBookedTickets />;
}