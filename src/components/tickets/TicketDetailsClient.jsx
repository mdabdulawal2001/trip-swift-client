"use client";

import dynamic from "next/dynamic";
import TicketDetailsSkeleton from "./ticketSkeletons/TicketDetailsSkeleton";

const TicketDetails = dynamic(() => import("./TicketDetails"), {
  loading: () => <TicketDetailsSkeleton />,
});

const ManagementTicketDetails = dynamic(() => import("./TicketDetails"), {
  loading: () => <TicketDetailsSkeleton managementView />,
});

export default function TicketDetailsClient(props) {
  const DetailsComponent = props.isManagementView
    ? ManagementTicketDetails
    : TicketDetails;

  return <DetailsComponent {...props} />;
}
