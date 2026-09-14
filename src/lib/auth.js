import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {
  admin as adminPlugin,
  jwt,
} from "better-auth/plugins";

import {
  ac,
  admin,
  user,
  vendor,
} from "./permissions";

const client = new MongoClient(
  process.env.MONGODB_URI
);

const db = client.db("trip-swift-db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
        input: true,
      },

      location: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId:
        process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 30,
    },
  },

  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
        vendor,
      },
      defaultRole: "user",
    }),

    jwt(),
  ],
});