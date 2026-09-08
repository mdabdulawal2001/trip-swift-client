"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import {
  ArrowLeft,
  Bus,
  CalendarDays,
  Clock3,
  ImagePlus,
  MapPin,
  Plus,
  Ticket,
  Train,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AddTicketPage() {
  const [perks, setPerks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    from: "",
    to: "",
    transportType: "AC Bus",
    price: "",
    quantity: "",
    departureDate: "",
    departureTime: "",
    image: "",
    description: "",
  });

  const availablePerks = ["AC", "WiFi", "Charging", "Food", "Water", "Sleeper"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePerk = (perk) => {
    setPerks((prev) =>
      prev.includes(perk)
        ? prev.filter((item) => item !== perk)
        : [...prev, perk]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      perks,
    };

    console.log("New Ticket:", ticketData);

    toast.success("Ticket submitted for admin approval!");

    setForm({
      title: "",
      from: "",
      to: "",
      transportType: "AC Bus",
      price: "",
      quantity: "",
      departureDate: "",
      departureTime: "",
      image: "",
      description: "",
    });

    setPerks([]);
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Add New Ticket
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Create a new travel ticket and submit it for admin approval.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
              <Ticket className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Ticket Information
              </h2>

              <p className="text-sm text-slate-500">
                Add the basic information about your ticket.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Ticket Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Dhaka → Cox's Bazar"
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Transport Type
              </label>

              <select
                name="transportType"
                value={form.transportType}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option>AC Bus</option>
                <option>Train</option>
                <option>Flight</option>
                <option>Car</option>
              </select>
            </div>

            <Field
              label="From"
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="Dhaka"
              icon={<MapPin className="h-4 w-4" />}
            />

            <Field
              label="To"
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="Cox's Bazar"
              icon={<MapPin className="h-4 w-4" />}
            />

            <Field
              label="Price per Ticket"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="1450"
            />

            <Field
              label="Available Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              placeholder="50"
            />
          </div>
        </section>

        {/* Schedule */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Departure Schedule
              </h2>

              <p className="text-sm text-slate-500">
                Set the date and departure time.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Departure Date"
              name="departureDate"
              type="date"
              value={form.departureDate}
              onChange={handleChange}
              icon={<CalendarDays className="h-4 w-4" />}
            />

            <Field
              label="Departure Time"
              name="departureTime"
              type="time"
              value={form.departureTime}
              onChange={handleChange}
              icon={<Clock3 className="h-4 w-4" />}
            />
          </div>
        </section>

        {/* Image & Description */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
              <ImagePlus className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Additional Details
              </h2>

              <p className="text-sm text-slate-500">
                Add ticket image and journey description.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <Field
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/ticket-image.jpg"
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the journey, coach, facilities and other important information..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <h2 className="mb-2 font-bold text-slate-900 dark:text-white">
            Passenger Perks
          </h2>

          <p className="mb-5 text-sm text-slate-500">
            Select the facilities available with this ticket.
          </p>

          <div className="flex flex-wrap gap-3">
            {availablePerks.map((perk) => {
              const active = perks.includes(perk);

              return (
                <button
                  key={perk}
                  type="button"
                  onClick={() => togglePerk(perk)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-sky-500 bg-sky-500 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  }`}
                >
                  {perk}
                </button>
              );
            })}
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="h-12 rounded-xl bg-sky-500 px-7 font-semibold text-white hover:bg-sky-600"
          >
            <Plus className="h-5 w-5" />
            Submit Ticket
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={`h-12 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}