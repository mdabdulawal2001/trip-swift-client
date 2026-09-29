import TicketDetailsSkeleton from "@/components/tickets/ticketSkeletons/TicketDetailsSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950!">
      <TicketDetailsSkeleton />
    </main>
  );
}