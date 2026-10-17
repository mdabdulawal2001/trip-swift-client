import TransactionsClient from "./TransactionsClient";

export const metadata = {
  title: "Transactions",
  description:
    "View and manage TripSwift payment transactions.",
};

export default function TransactionsPage() {
  return <TransactionsClient />;
}