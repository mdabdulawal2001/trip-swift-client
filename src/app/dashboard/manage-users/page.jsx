import ManageUsersClient from "./ManageUsersClient";

export const metadata = {
  title: "Manage Users",
  description:
    "Manage TripSwift users and their platform access.",
};

export default function ManageUsersPage() {
  return <ManageUsersClient />;
}
