import Transactions from "@/components/dashboard/user/Transactions";

export const metadata = {
  title: "Transactions",
  description:
    "View and manage TripSwift payment transactions.",
};

export default function TransactionsPage() {
  return <Transactions />;
}