"use client";

import { useEffect, useState } from "react";

import {
  Camera,
  CheckCircle2,
  Edit3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { useProfile } from "@/context/ProfileContext";
import Image from "next/image";

export default function ProfilePage() {
  const { profile, setProfile, isProfileLoading } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!profile) return;

    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
      location: profile.location || "",
    });
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      phone: profile?.phone || "",
      location: profile?.location || "",
    });

    setIsEditing(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG, or WebP image.");

      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB.");

      event.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!apiKey) {
        throw new Error("ImgBB API key is not configured.");
      }

      const formData = new FormData();

      formData.append("key", apiKey);
      formData.append("image", file);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error?.message || "Failed to upload image.");
      }

      const imageUrl = data?.data?.display_url || data?.data?.url;

      if (!imageUrl) {
        throw new Error("Image URL was not returned by ImgBB.");
      }

      const { data: updatedUser, error } = await authClient.updateUser({
        image: imageUrl,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile image.");
      }

      setProfile((previous) => ({
        ...previous,
        ...updatedUser,
        image: imageUrl,
      }));

      toast.success("Profile picture updated successfully.");
    } catch (error) {
      console.error("Profile image upload error:", error);

      toast.error(error?.message || "Failed to update profile picture.");
    } finally {
      setUploadingImage(false);

      event.target.value = "";
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setSaving(true);

      const { data, error } = await authClient.updateUser({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile.");
      }

      setProfile((previous) => ({
        ...previous,
        ...data,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
      }));

      setIsEditing(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (isProfileLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <p className="font-medium text-slate-700 dark:text-slate-200">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  const displayName = profile.name || "User";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const role = profile.role || "user";

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:pb-5">
        <div className="h-32 bg-linear-to-r from-sky-500 via-cyan-500 to-blue-600 sm:h-28" />

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-10 flex flex-col gap-5 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="relative h-28 w-28 rounded-[1.75rem] border-4 border-white object-cover shadow-xl dark:border-slate-900!">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt={displayName}
                    height={10}
                    width={10}
                    className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg dark:border-slate-900"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-sky-100 text-3xl font-bold text-sky-600 shadow-lg dark:border-slate-900 dark:bg-sky-500/15 dark:text-sky-400">
                    {initials || "U"}
                  </div>
                )}

                {/* Camera button */}
                <label
                  htmlFor="profile-image-upload"
                  title="Change profile picture"
                  className={`absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-sky-500 text-white shadow-md transition hover:bg-sky-600 dark:border-slate-900 ${
                    uploadingImage
                      ? "pointer-events-none cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                >
                  {uploadingImage ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <Camera size={17} />
                  )}

                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {displayName}
                  </h1>

                  <CheckCircle2 size={20} className="text-sky-500" />
                </div>

                <p className="mt-1 text-sm text-slate-500">{profile.email}</p>
              </div>
            </div>

            {/* Edit buttons */}
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                <Edit3 size={17} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your personal account information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <ProfileField
              label="Full Name"
              name="name"
              value={formData.name}
              icon={<UserRound size={18} />}
              editing={isEditing}
              onChange={handleChange}
            />

            <ProfileField
              label="Email Address"
              value={profile.email || ""}
              icon={<Mail size={18} />}
              disabled
            />

            <ProfileField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              icon={<Phone size={18} />}
              editing={isEditing}
              onChange={handleChange}
              placeholder="+880 1XXXXXXXXX"
            />

            <ProfileField
              label="Location"
              name="location"
              value={formData.location}
              icon={<MapPin size={18} />}
              editing={isEditing}
              onChange={handleChange}
              placeholder="Dhaka, Bangladesh"
            />
          </div>
        </div>

        {/* Account Status */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current TripSwift account status.
            </p>
          </div>

          <div className="space-y-4">
            <InfoRow
              label="Role"
              value={roleLabel}
              icon={<ShieldCheck size={18} />}
            />

            <InfoRow
              label="Account Status"
              value={profile.banned ? "Blocked" : "Active"}
              icon={<CheckCircle2 size={18} />}
              valueClassName={
                profile.banned ? "text-red-500" : "text-emerald-500"
              }
            />

            <InfoRow
              label="Email Status"
              value={profile.emailVerified ? "Verified" : "Not verified"}
              icon={<Mail size={18} />}
              valueClassName={
                profile.emailVerified ? "text-emerald-500" : "text-amber-500"
              }
            />

            <InfoRow
              label="Member Since"
              value={formatMemberSince(profile.createdAt)}
              icon={<UserRound size={18} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  name,
  value,
  icon,
  editing,
  disabled = false,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled || !editing}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 disabled:cursor-default disabled:opacity-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:ring-sky-500/10"
        />
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
  valueClassName = "text-slate-900 dark:text-white",
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-300">
          {icon}
        </div>

        <span className="text-sm text-slate-500">{label}</span>
      </div>

      <span className={`text-right text-sm font-semibold ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

function formatMemberSince(dateValue) {
  if (!dateValue) return "—";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="h-32 animate-pulse bg-slate-200 dark:bg-slate-800 sm:h-40" />

        <div className="px-5 pb-7 sm:px-8 sm:pb-8">
          <div className="-mt-10 flex items-end gap-4 sm:-mt-12">
            <div className="h-28 w-28 animate-pulse rounded-3xl border-4 border-white bg-slate-200 dark:border-slate-900 dark:bg-slate-800" />

            <div className="mb-2 space-y-2">
              <div className="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-52 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
