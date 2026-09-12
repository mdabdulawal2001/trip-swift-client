"use client";

import { createContext, useContext } from "react";

const DashboardRoleContext = createContext(null);

export function DashboardRoleProvider({
  role,
  children,
}) {
  return (
    <DashboardRoleContext.Provider value={role}>
      {children}
    </DashboardRoleContext.Provider>
  );
}

export function useDashboardRole() {
  const role = useContext(DashboardRoleContext);

  if (!role) {
    throw new Error(
      "useDashboardRole must be used inside DashboardRoleProvider"
    );
  }

  return role;
}