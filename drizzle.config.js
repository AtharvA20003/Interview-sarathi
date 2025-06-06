/** @type { import("drizzle-kit").Config } */


import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local' });

export default {
      schema: "./utils/schema.js",
      dialect: 'postgresql',
      dbCredentials: {
        url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
      }
};
