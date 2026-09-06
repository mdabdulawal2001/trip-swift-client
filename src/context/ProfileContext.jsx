"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const { data: session, isPending: sessionPending } =
    authClient.useSession();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (sessionPending) return;

    if (!session?.user) {
      setProfile(null);
      return;
    }

    setProfile(session.user);
  }, [session, sessionPending]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        isProfileLoading: sessionPending,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfile must be used inside ProfileProvider",
    );
  }

  return context;
};