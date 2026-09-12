"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  getVendorTicketById,
  updateTicket,
} from "@/lib/api";

import { authClient } from "@/lib/auth-client";

export default function EditTicketForm() {
  const router = useRouter();
  const params = useParams();

  const ticketId = params.id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    perks: "",
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

        const data = await getVendorTicketById(
          ticketId,
          email
        );

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
          perks: Array.isArray(ticket.perks)
            ? ticket.perks.join(", ")
            : "",
          description: ticket.description || "",
        });
      } catch (error) {
        console.error(error);

        toast.error(
          error.message || "Failed to load ticket"
        );
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

      const ticketData = {
        title: formData.title,
        operator: formData.operator,
        from: formData.from,
        to: formData.to,
        type: formData.type,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        departure: formData.departure,
        date: formData.date,
        departureDateTime: formData.departureDateTime,
        image: formData.image,
        perks: formData.perks
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        description: formData.description,
      };

      await updateTicket(ticketId, ticketData);

      toast.success("Ticket updated successfully");

      router.push("/dashboard/my-tickets");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Failed to update ticket"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p>Loading ticket...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Edit Ticket
        </h1>

        <p className="mt-2 text-sm text-default-500">
          Update your ticket information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Ticket Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Operator
            </label>

            <input
              name="operator"
              value={formData.operator}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              From
            </label>

            <input
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              To
            </label>

            <input
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Transport Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            >
              <option value="">Select type</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Car">Car</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Departure
            </label>

            <input
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Departure Date & Time
            </label>

            <input
              type="datetime-local"
              name="departureDateTime"
              value={formData.departureDateTime}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Image URL
          </label>

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Perks
          </label>

          <input
            name="perks"
            value={formData.perks}
            onChange={handleChange}
            placeholder="AC, WiFi, Water"
            className="w-full rounded-xl border px-4 py-3 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full resize-none rounded-xl border px-4 py-3 outline-none"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              router.push("/dashboard/my-tickets")
            }
            className="rounded-xl border px-6 py-3 font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-primary px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}