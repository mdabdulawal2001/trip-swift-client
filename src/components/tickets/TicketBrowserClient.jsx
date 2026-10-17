"use client";

import dynamic from "next/dynamic";
import TicketBrowserSkeleton from "./ticketSkeletons/TicketBrowserSkeleton";

const TicketBrowser = dynamic(() => import("./TicketBrowser"), {
  loading: () => <TicketBrowserSkeleton />,
});

export default function TicketBrowserClient(props) {
  return <TicketBrowser {...props} />;
}
