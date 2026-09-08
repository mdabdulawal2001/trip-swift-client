"use client";

import { motion } from "framer-motion";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  Edit3,
  Camera,
  MapPin,
  Phone,
  Save,
} from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Abdul Awal",
    email: "abdul@example.com",
    phone: "+880 1712-345678",
    location: "Dhaka, Bangladesh",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-sky-500">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* Profile Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        {/* Background */}
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-r from-sky-500 to-blue-600" />

        <div className="relative px-5 pb-6 pt-16 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            {/* Avatar */}
            <div className="flex items-end gap-4">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-sky-100 text-3xl font-bold text-sky-600 shadow-lg dark:border-slate-900 dark:bg-sky-500/10 dark:text-sky-400">
                  AA
                </div>

                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border-4 border-white bg-sky-500 text-white shadow-md transition hover:bg-sky-600 dark:border-slate-900"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {profile.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {profile.email}
                </p>

                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified User
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
        <div className="mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white">
            Personal Information
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your basic account information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Full Name
            </label>

            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 disabled:cursor-not-allowed disabled:opacity-80 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="email"
                value={profile.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-950"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Phone Number
            </label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 disabled:cursor-not-allowed disabled:opacity-80 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Location
            </label>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 disabled:cursor-not-allowed disabled:opacity-80 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Account Details */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <CalendarDays className="h-5 w-5 text-sky-500" />

          <p className="mt-4 text-xs text-slate-400">
            Member Since
          </p>

          <p className="mt-1 font-bold text-slate-900 dark:text-white">
            September 2026
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <TicketIcon />

          <p className="mt-4 text-xs text-slate-400">
            Total Bookings
          </p>

          <p className="mt-1 font-bold text-slate-900 dark:text-white">
            12 Trips
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />

          <p className="mt-4 text-xs text-slate-400">
            Account Status
          </p>

          <p className="mt-1 font-bold text-emerald-500">
            Active
          </p>
        </div>
      </section>
    </motion.div>
  );
};

function TicketIcon() {
  return <div className="h-5 w-5 text-sky-500">🎫</div>;
}

export default ProfilePage;