import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

export default defineConfig({
  ...baseConfig,
  projects: [
    {
      name: "login",
      testMatch: "login-only.spec.ts",
      retries: 1,
      timeout: 30000,
    },
  ],
});
