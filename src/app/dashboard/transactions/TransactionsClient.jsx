"use client";

import dynamic from "next/dynamic";
import TransactionsSkeleton from "@/components/dashboard/user/TransactionsSkeleton";

const Transactions = dynamic(
  () => import("@/components/dashboard/user/Transactions"),
  { loading: () => <TransactionsSkeleton /> },
);

export default function TransactionsClient() {
  return <Transactions />;
}
