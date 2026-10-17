"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Inbox, Mail, Trash2, UserRound } from "lucide-react";
import toast from "react-hot-toast";

import ConfirmModal from "@/components/shared/ConfirmModal";
import DashboardContainer from "@/components/dashboard/shared/DashboardContainer";
import DashboardListControls from "@/components/dashboard/shared/DashboardListControls";
import { ContactMessagesSkeleton } from "./ContactMessagesSkeleton";
import TicketPagination from "@/components/tickets/TicketPagination";
import { scrollDashboardListToTop } from "@/components/dashboard/shared/listHelpers";
import {
  deleteContactMessage,
  getAdminContactMessages,
} from "@/lib/api";

const ITEMS_PER_PAGE = 8;

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [dateCutoff, setDateCutoff] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let isActive = true;

    getAdminContactMessages()
      .then((result) => {
        if (!isActive) return;
        if (result?.success !== true || !Array.isArray(result.messages)) {
          throw new Error("The contact messages response was invalid.");
        }

        setMessages(result.messages);
      })
      .catch((error) => {
        if (!isActive) return;
        console.error("Contact messages loading error:", error);
        setLoadError(error?.message || "Failed to load contact messages.");
        toast.error(error?.message || "Failed to load contact messages.");
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [reloadCount]);

  const handleRetry = () => {
    setLoading(true);
    setLoadError("");
    setReloadCount((previous) => previous + 1);
  };

  const filteredMessages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return messages
      .filter((message) => {
        const matchesSearch = [
          message.name,
          message.email,
          message.subject,
          message.message,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

        const createdAt = new Date(message.createdAt || "").getTime();
        const matchesDate =
          dateCutoff === null ||
          (Number.isFinite(createdAt) && createdAt >= dateCutoff);

        return matchesSearch && matchesDate;
      })
      .sort((first, second) => {
        if (sortOrder === "sender-az") {
          return String(first.name || "").localeCompare(
            String(second.name || ""),
          );
        }

        const firstDate = new Date(first.createdAt || 0).getTime();
        const secondDate = new Date(second.createdAt || 0).getTime();

        return sortOrder === "oldest"
          ? firstDate - secondDate
          : secondDate - firstDate;
      });
  }, [dateCutoff, messages, search, sortOrder]);

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    setDateCutoff(
      value === "7-days"
        ? Date.now() - 7 * 24 * 60 * 60 * 1000
        : value === "30-days"
          ? Date.now() - 30 * 24 * 60 * 60 * 1000
          : null,
    );
    setCurrentPage(1);
  };

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMessages.length / ITEMS_PER_PAGE),
  );
  const activePage = Math.min(currentPage, totalPages);
  const firstVisibleIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const pageMessages = filteredMessages.slice(
    firstVisibleIndex,
    firstVisibleIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollDashboardListToTop();
  };

  const handleDelete = async () => {
    if (deleting || !selectedMessage) return;
    if (!selectedMessage._id) {
      toast.error("This contact message has no valid ID and cannot be deleted.");
      return;
    }

    try {
      setDeleting(true);
      const result = await deleteContactMessage(selectedMessage._id);

      if (result?.success !== true) {
        throw new Error(result?.message || "Failed to delete contact message.");
      }

      setMessages((previous) =>
        previous.filter((message) => message._id !== selectedMessage._id),
      );
      setSelectedMessage(null);
      setCurrentPage((previous) =>
        Math.min(
          previous,
          Math.max(
            1,
            Math.ceil((filteredMessages.length - 1) / ITEMS_PER_PAGE),
          ),
        ),
      );
      toast.success("Contact message deleted.");
    } catch (error) {
      console.error("Contact message deletion error:", error);
      toast.error(error?.message || "Failed to delete contact message.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardContainer
      id="dashboard-list-page"
      eyebrow="Admin Dashboard"
      title="Contact Messages"
      description="Review messages submitted through the TripSwift contact form."
      loading={loading}
    >
      {loading ? (
        <ContactMessagesSkeleton />
      ) : loadError ? (
        <div
          role="alert"
          className="rounded-3xl border border-red-200 bg-white px-6 py-12 text-center dark:border-red-900/70 dark:bg-slate-900"
        >
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Could not load contact messages
          </h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {loadError}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-5 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <DashboardListControls
            searchValue={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            searchPlaceholder="Search messages, names, emails..."
            filters={[
              {
                id: "contact-message-date-filter",
                label: "Filter by received date",
                value: dateFilter,
                onChange: handleDateFilterChange,
                options: [
                  { value: "all", label: "All dates" },
                  { value: "7-days", label: "Last 7 days" },
                  { value: "30-days", label: "Last 30 days" },
                ],
              },
            ]}
            sortValue={sortOrder}
            onSortChange={(value) => {
              setSortOrder(value);
              setCurrentPage(1);
            }}
            sortOptions={[
              { value: "newest", label: "Newest first" },
              { value: "oldest", label: "Oldest first" },
              { value: "sender-az", label: "Sender Aâ€“Z" },
            ]}
          />

          <div aria-live="polite" className="text-sm text-slate-500 dark:text-slate-400">
            {filteredMessages.length}{" "}
            {filteredMessages.length === 1 ? "message" : "messages"}
            {search || dateFilter !== "all" ? " found" : ""}
          </div>

          {pageMessages.length ? (
            <div className="grid gap-4">
              {pageMessages.map((message) => (
                <article
                  key={message._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          {message.subject || "No subject"}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatMessageDate(message.createdAt)}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                        <span className="inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                          <UserRound className="h-4 w-4 text-sky-500" />
                          {message.name || "Unknown sender"}
                        </span>
                        {message.email ? (
                          <a
                            href={`mailto:${message.email}`}
                            className="inline-flex items-center gap-2 text-sky-600 hover:underline dark:text-sky-400"
                          >
                            <Mail className="h-4 w-4" />
                            {message.email}
                          </a>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">
                            No email provided
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedMessage(message)}
                      className="hidden md:inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-end rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:self-start dark:border-red-900/70 dark:text-red-400 dark:hover:bg-red-950/40"
                      aria-label={`Delete message from ${message.name || "unknown sender"}`}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
                    {message.message || "No message content."}
                  </p>
                  <button
                      type="button"
                      onClick={() => setSelectedMessage(message)}
                      className="w-full inline-flex md:hidden mt-4 min-h-10 shrink-0 items-center justify-center gap-2 self-end rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:self-start dark:border-red-900/70 dark:text-red-400 dark:hover:bg-red-950/40"
                      aria-label={`Delete message from ${message.name || "unknown sender"}`}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                </article>
              ))}

              {filteredMessages.length > ITEMS_PER_PAGE && (
                <div className="pt-2">
                  <TicketPagination
                    currentPage={activePage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
              <Inbox className="mx-auto h-10 w-10 text-slate-400" />
              <h2 className="mt-4 font-semibold text-slate-900 dark:text-white">
                {messages.length
                  ? "No messages match your filters"
                  : "No contact messages yet"}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {messages.length
                  ? "Try changing the search text or date filter."
                  : "Messages submitted through the contact form will appear here."}
              </p>
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(selectedMessage)}
        onClose={() => {
          if (!deleting) setSelectedMessage(null);
        }}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Contact Message?"
        message={`Delete the message from ${selectedMessage?.name || "this sender"}? This action cannot be undone.`}
        confirmText="Delete Message"
        confirmColor="danger"
      />
    </DashboardContainer>
  );
}

function formatMessageDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
