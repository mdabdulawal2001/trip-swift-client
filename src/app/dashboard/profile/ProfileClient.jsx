"use client";

import dynamic from "next/dynamic";
import ProfileSkeleton from "@/components/shared/skeletons/ProfileSkeleton";

const ProfilePage = dynamic(
  () => import("@/components/shared/ProfilePage"),
  { loading: () => <ProfileSkeleton /> },
);

export default function ProfileClient() {
  return <ProfilePage />;
}
