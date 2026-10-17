"use client";

import dynamic from "next/dynamic";
import TicketDetailsSkeleton from "./ticketSkeletons/TicketDetailsSkeleton";

const TicketDetails = dynamic(() => import("./TicketDetails"), {
  loading: () => <TicketDetailsSkeleton />,
});

export default function TicketDetailsClient(props) {
  return <TicketDetails {...props} />;
}
