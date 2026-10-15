"use client";

import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { submitContactMessage } from "@/lib/api";
import Swal from "sweetalert2";

const inputClassName =
  "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950! dark:text-white! dark:placeholder:text-slate-500";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = Object.fromEntries(formData);

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await submitContactMessage(message);
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Your message has been sent. Thank you for contacting TripSwift.",
      });
      form.reset();
      setFeedback({
        type: "success",
        text: "Your message has been sent. Thank you for contacting TripSwift.",
      });
    } catch (error) {
      error.message("Contact form submission failed:", error);
      setFeedback({
        type: "error",
        text: error?.message || "Unable to send your message right now.",
      });
       
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error?.message || "Unable to send your message right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            className={inputClassName}
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-subject"
          className="text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          minLength={5}
          maxLength={120}
          className={inputClassName}
          placeholder="What can we help with?"
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={20}
          maxLength={2000}
          rows={6}
          className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white! dark:placeholder:text-slate-500"
          placeholder="Include the details that will help us understand your question."
        />
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Please do not include passwords or payment card details.
        </p>
      </div>

      {feedback && (
        <p
          role={feedback.type === "error" ? "alert" : "status"}
          className={`mt-5 rounded-xl px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"
          }`}
        >
          {feedback.text}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#238FD7] px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1978B8] hover:shadow-lg hover:shadow-sky-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-900 sm:w-auto"
      >
        {isSubmitting ? (
          <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
