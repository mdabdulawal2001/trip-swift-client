import { ContactMessagesSkeleton } from "@/components/dashboard/admin/ContactMessages";

export default function ContactMessagesLoading() {
  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="mb-8 space-y-3">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <ContactMessagesSkeleton />
    </div>
  );
}
