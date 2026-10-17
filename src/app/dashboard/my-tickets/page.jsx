import MyTicketsClient from "./MyTicketsClient";

export const metadata = {
  title: "My Tickets",
  description:
    "View and manage the travel tickets you have added to TripSwift.",
};

export default function MyTicketsPage() {
  return <MyTicketsClient />;
}
