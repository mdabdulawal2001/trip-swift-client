import TicketFormClient from "./TicketFormClient";
export const metadata = {
  title: "Add Ticket",
  description:
    "Create and publish a new travel ticket on TripSwift.",
};
export default function AddTicketPage() {
  return <TicketFormClient />;
}
