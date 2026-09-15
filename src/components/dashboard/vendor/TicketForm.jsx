"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addTicket } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const initialForm = {
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
  perks: "",
  description: "",
};

export default function TicketForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: session } = await authClient.getSession();

    const vendorEmail = session?.user?.email;

    if (!vendorEmail) {
      toast.error("Please login before adding a ticket.");
      return;
    }

    setLoading(true);

    try {
      const ticketData = {
        title: formData.title.trim(),
        operator: formData.operator.trim(),
        from: formData.from.trim(),
        to: formData.to.trim(),
        type: formData.type,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        departure: formData.departure.trim(),
        date: formData.date,
        departureDateTime: formData.departureDateTime,
        image: formData.image.trim(),
        perks: formData.perks
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        description: formData.description.trim(),
        vendorEmail,
      };

      const data = await addTicket(ticketData);

      if (data.success) {
        toast.success("Ticket submitted successfully!");

        setFormData(initialForm);

        router.push("/dashboard/my-tickets");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to add ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Add New Ticket
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Add a new travel ticket for admin approval.
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

        {/* Route */}

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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="">Select transport</option>
                <option value="AC Bus">AC Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Car">Car</option>
              </select>
            </div>

            <InputField
              label="Departure Point"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              placeholder="Gabtoli Bus Terminal"
              required
            />
          </div>
        </div>

        {/* Price & Quantity */}

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Pricing & Availability
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Price per Ticket"
              name="price"
              type="number"
              min="1"
              value={formData.price}
              onChange={handleChange}
              placeholder="1450"
              required
            />

            <InputField
              label="Available Quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="40"
              required
            />
          </div>
        </div>

        {/* Date & Time */}

        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Schedule
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Departure Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <InputField
              label="Departure Time"
              name="departureDateTime"
              type="datetime-local"
              value={formData.departureDateTime}
              onChange={handleChange}
              required
            />
          </div>
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

          <InputField
            label="Perks"
            name="perks"
            value={formData.perks}
            onChange={handleChange}
            placeholder="AC, WiFi, Water Bottle, Blanket"
          />

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Separate multiple perks with commas.
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
            rows={6}
            required
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>

        {/* Submit */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#047BFB] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#035ec4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
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
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      />
    </div>
  );
}
