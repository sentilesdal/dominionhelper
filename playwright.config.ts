// Playwright configuration for E2E testing of the Dominion Helper Chrome extension.
//
// Key settings:
// - testDir: e2e/ (separate from Vitest unit tests in tests/)
// - globalSetup: builds the extension before tests run
// - workers: 1 (serial execution -- single dominion.games account)
// - channel: 'chromium' (bundled Chromium, not system Chrome)
// - projects: separate configs for smoke vs auth tests (auth gets retry)
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  workers: 1,
  timeout: 30000,
  use: {
    channel: 'chromium',
  },

  // Project-based configuration allows different retry policies.
  // Auth tests get 1 retry to handle network flakiness when
  // communicating with dominion.games (per CONTEXT.md decision).
  // Smoke tests have no retries -- they should always pass reliably.
  projects: [
    {
      name: 'smoke',
      testMatch: 'smoke.spec.ts',
    },
    {
      name: 'auth',
      testMatch: 'auth.spec.ts',
      retries: 1,
    },
  ],
});
