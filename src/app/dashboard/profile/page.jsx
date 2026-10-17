import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "Profile",
  description:
    "Manage your TripSwift profile and account information.",
};

export default function ProfileRoute() {
  return <ProfileClient />;
}
