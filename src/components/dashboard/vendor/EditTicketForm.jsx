"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { getVendorTicketById, updateTicket } from "@/lib/api";

import { authClient } from "@/lib/auth-client";
import TicketFormSkeleton from "./vendorSkeletons/TicketFormSkeleton";

export default function EditTicketForm() {
  const router = useRouter();
  const params = useParams();

  const ticketId = params.id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    operator: "",
    from: "",
    to: "",
    type: "",
    price: "",
    quantity: "",
    departure: "",
    date: "",
    departureDateTime: "",
    image: "",
    perks: [],
    description: "",
  });

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const { data: session } = await authClient.getSession();

        const email = session?.user?.email;

        if (!email) {
          toast.error("Please login first");
          router.push("/login");
          return;
        }

        const data = await getVendorTicketById(ticketId, email);

        const ticket = data?.ticket;

        if (!ticket) {
          throw new Error("Ticket not found");
        }

        setFormData({
          title: ticket.title || "",
          operator: ticket.operator || "",
          from: ticket.from || "",
          to: ticket.to || "",
          type: ticket.type || "",
          price: ticket.price ?? "",
          quantity: ticket.quantity ?? "",
          departure: ticket.departure || "",
          date: ticket.date || "",
          departureDateTime: ticket.departureDateTime || "",
          image: ticket.image || "",
          perks: Array.isArray(ticket.perks) ? ticket.perks : [],
          description: ticket.description || "",
        });
      } catch (error) {
        console.error(error);

        toast.error(error.message || "Failed to load ticket");
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      loadTicket();
    }
  }, [ticketId, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const departureDate = formData.departureDateTime
        ? formData.departureDateTime.split("T")[0]
        : "";

      const ticketData = {
        title: formData.title,
        operator: formData.operator,
        from: formData.from,
        to: formData.to,
        type: formData.type,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        departure: formData.departure,
        date: departureDate,
        departureDateTime: formData.departureDateTime,
        image: formData.image,
        perks: formData.perks,
        description: formData.description,
      };

      await updateTicket(ticketId, ticketData);

      toast.success("Ticket updated successfully");

      router.push("/dashboard/my-tickets");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to update ticket");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <TicketFormSkeleton />
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-sky-500">
          Vendor Dashboard
        </p>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Edit Ticket
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Update your ticket information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"
      >
        {/* Basic Information */}

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Basic Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Ticket Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Dhaka to Cox's Bazar Express"
              required
            />

            <InputField
              label="Operator"
              name="operator"
              value={formData.operator}
              onChange={handleChange}
              placeholder="Green Line Express"
              required
            />
          </div>
        </div>

        {/* Route Information */}

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Route Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="From"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Dhaka"
              required
            />

            <InputField
              label="To"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Cox's Bazar"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Transport Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-950! dark:text-white"
              >
                <option value="">Select transport</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Car">Car</option>
              </select>
            </div>

            <InputField
              label="Price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="1450"
              required
            />

            <InputField
              label="Quantity"
              name="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="40"
              required
            />

            <InputField
              label="Departure"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              placeholder="Gabtoli Bus Terminal"
              required
            />
          </div>
        </div>

        {/* Schedule */}

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Schedule
          </h2>

          <InputField
            label="Departure Date & Time"
            name="departureDateTime"
            type="datetime-local"
            value={formData.departureDateTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image */}

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Ticket Image
          </h2>

          <InputField
            label="Image URL"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/ticket-image.jpg"
            required
          />
        </div>

        {/* Perks */}

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Ticket Perks
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {getPerksByTransport(formData.type).map((perk) => (
              <label
                key={perk}
                className={`
          flex cursor-pointer items-center gap-3 rounded-xl
          border px-4 py-3 transition-all duration-200
          ${
            formData.perks.includes(perk)
              ? "border-[#047BFB] bg-[#047BFB]/5 text-[#047BFB]"
              : "border-slate-200 bg-white text-slate-700 hover:border-[#047BFB]/40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950! dark:text-slate-300 dark:hover:bg-slate-900"
          }
        `}
              >
                <input
                  type="checkbox"
                  checked={formData.perks.includes(perk)}
                  onChange={(event) => {
                    setFormData((previous) => ({
                      ...previous,
                      perks: event.target.checked
                        ? [...previous.perks, perk]
                        : previous.perks.filter((item) => item !== perk),
                    }));
                  }}
                  className="h-4 w-4 cursor-pointer accent-[#047BFB]"
                />

                <span className="text-sm font-medium">{perk}</span>
              </label>
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Select the facilities available with this ticket.
          </p>
        </div>

        {/* Description */}

        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write details about this ticket..."
            required
            rows={6}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#047BFB] focus:ring-4 focus:ring-[#047BFB]/10 dark:border-slate-700 dark:bg-slate-950! dark:text-white dark:hover:border-slate-600"
          />
        </div>

        {/* Actions */}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push("/dashboard/my-tickets")}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700! dark:bg-slate-900! dark:text-slate-300 dark:hover:bg-slate-800! dark:hover:text-white!"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-[#238FD7] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1978B8] hover:shadow-lg hover:shadow-[#047BFB]/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}

function getPerksByTransport(type) {
  const commonPerks = [
    "AC",
    "WiFi",
    "Charging Point",
    "Water Bottle",
    "Comfortable Seat",
  ];

  const perksByType = {
    Bus: [
      ...commonPerks,
      "Reclining Seat",
      "Blanket",
      "Toilet",
      "Entertainment",
    ],

    Train: [
      ...commonPerks,
      "Meal / Food",
      "Toilet",
      "Extra Luggage",
      "Entertainment",
      "Sleeping Berth",
    ],

    Flight: [
      "AC",
      "WiFi",
      "Meal / Food",
      "Charging Point",
      "Extra Luggage",
      "Entertainment",
      "Comfortable Seat",
    ],

    Car: [
      "AC",
      "WiFi",
      "Charging Point",
      "Water Bottle",
      "Comfortable Seat",
      "Extra Luggage",
      "Entertainment",
    ],
  };

  return perksByType[type] || commonPerks;
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 hover:border-slate-300 focus:border-[#047BFB] focus:ring-4 focus:ring-[#047BFB]/10 dark:border-slate-700 dark:bg-slate-950! dark:text-white dark:hover:border-slate-600"
      />
    </div>
  );
}
