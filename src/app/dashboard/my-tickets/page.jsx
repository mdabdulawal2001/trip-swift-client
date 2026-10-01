import MyTickets from "@/components/dashboard/vendor/MyTickets";
import MyTicketsSkeleton from "@/components/dashboard/vendor/vendorSkeletons/MyTicketsSkeleton";

export const metadata = {
  title: "My Tickets",
  description:
    "View and manage the travel tickets you have added to TripSwift.",
};

export default function MyTicketsPage() {
  return (
  <>
  <MyTickets />;
  </>
  )
}