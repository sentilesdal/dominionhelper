// Validates credentials and builds the extension before the E2E test suite runs.
//
// Chains two setup steps:
// 1. Validate that DOMINION_USER and DOMINION_PASS are set in .env
//    (warns if missing — tests requiring auth will skip at runtime)
// 2. Build the extension to dist/ so Chrome can load it
//
// The build runs regardless of credential status because some tests
// (like smoke tests) may still be useful for non-auth verification,
// even though the current policy requires credentials for all tests.
import { execSync } from "child_process";
import { validateCredentials } from "./env-setup";

export default function globalSetup() {
  // Check credentials before building — gives early warning if .env is missing
  const creds = validateCredentials();
  if (!creds) {
    console.warn(
      "Warning: DOMINION_USER and/or DOMINION_PASS not set in .env — E2E tests requiring auth will be skipped",
    );
  }

  execSync("npm run build", { stdio: "inherit" });
}
