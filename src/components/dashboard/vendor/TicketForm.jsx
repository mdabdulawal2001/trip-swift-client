"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addTicket, getVendorTickets } from "@/lib/api";
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
  perks: [],
  description: "",
};

export default function TicketForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  // Vendor fraud status

  const [isFraud, setIsFraud] = useState(false);
  const [checkingFraudStatus, setCheckingFraudStatus] = useState(true);

  // Check vendor fraud status
  useEffect(() => {
    const checkVendorStatus = async () => {
      try {
        const { data: session } = await authClient.getSession();

        const vendorEmail = session?.user?.email;

        if (!vendorEmail) {
          return;
        }

        const vendorData = await getVendorTickets(vendorEmail);

        setIsFraud(vendorData?.isFraud === true);
      } catch (error) {
        console.error("Failed to check vendor status:", error);
      } finally {
        setCheckingFraudStatus(false);
      }
    };

    checkVendorStatus();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extra protection
    if (isFraud) {
      toast.error("Your account has been restricted by the admin.");
      return;
    }

    const { data: session } = await authClient.getSession();

    const vendorEmail = session?.user?.email;

    if (!vendorEmail) {
      toast.error("Please login before adding a ticket.");
      return;
    }

    setLoading(true);

    try {
      const departureDate = formData.departureDateTime
        ? formData.departureDateTime.split("T")[0]
        : "";
      const ticketData = {
        title: formData.title.trim(),
        operator: formData.operator.trim(),
        from: formData.from.trim(),
        to: formData.to.trim(),
        type: formData.type,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        departure: formData.departure.trim(),
        date: departureDate,
        departureDateTime: formData.departureDateTime,
        image: formData.image.trim(),
        perks: formData.perks,
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
      if (error?.message?.toLowerCase().includes("marked as fraud")) {
        setIsFraud(true);
      }
      toast.error(error?.message || "Failed to add ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

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
        className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800! dark:bg-slate-900! sm:p-7"
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

          <div>
            {/* <InputField
              label="Departure Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            /> */}

            <InputField
              label="Departure Date & Time"
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
              : "border-slate-200 bg-white text-slate-700 hover:border-[#047BFB]/40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
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
            rows={6}
            required
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-950! dark:text-white"
          />
        </div>

        {/* Submit */}

        <div className="flex w-full">
          {" "}
          <button
            type="submit"
            disabled={loading || checkingFraudStatus || isFraud}
            className={`w-full rounded-xl px-6 py-3 text-sm font-bold text-white transition ${isFraud ? "cursor-not-allowed bg-slate-400" : "bg-[#238FD7] hover:bg-[#1978B8]"} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {" "}
            {checkingFraudStatus
              ? "Checking..."
              : isFraud
                ? "Restricted"
                : loading
                  ? "Submitting..."
                  : "Submit Ticket"}{" "}
          </button>{" "}
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
    "Bus": [
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
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#047BFB] dark:border-slate-700 dark:bg-slate-950! dark:text-white"
      />
    </div>
  );
}
