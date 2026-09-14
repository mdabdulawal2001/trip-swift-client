import { createAuthClient } from "better-auth/react";

import {
  adminClient,
  jwtClient,
} from "better-auth/client/plugins";

import {
  ac,
  admin,
  user,
  vendor,
} from "./permissions";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        user,
        vendor,
      },
    }),

    jwtClient(),
  ],
});