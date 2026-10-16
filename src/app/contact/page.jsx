import ContactForm from "@/components/shared/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contact TripSwift about tickets, bookings, or your account.",
};

export default function ContactPage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#F4F9FC] px-4 py-14 text-slate-900 transition-colors duration-300 dark:bg-[#071522] dark:text-white sm:px-6 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"
      />
      <div className="mx-auto grid w-full max-w-[1352px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div className="pt-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#238FD7] dark:text-[#38BDF8]">
            We are here to help
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Contact <span className="text-[#238FD7] dark:text-[#38BDF8]">TripSwift</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Send a message about tickets, bookings, payments, or your account.
            Include a booking or ticket reference when it is relevant, but never
            send passwords or payment card details.
          </p>
          <p className="mt-6 rounded-2xl border border-sky-100 bg-white/80 p-4 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
            Once the backend contact endpoint is configured, messages will be
            saved to the TripSwift database. The form will report an error if
            that route is not available yet.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
