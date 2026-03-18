// Credential loading and validation for E2E tests against dominion.games.
//
// Loads environment variables from the project root .env file via dotenv,
// then provides a validation function to check that required credentials
// (DOMINION_USER and DOMINION_PASS) are present. This module is imported
// by global-setup.ts (to warn early) and by fixtures.ts (to skip tests
// when credentials are missing).
import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root (one level above e2e/)
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// Validates that dominion.games credentials are set in the environment.
//
// Reads DOMINION_USER and DOMINION_PASS from process.env (populated by
// dotenv.config above). Returns the credentials as an object if both are
// non-empty strings, or null if either is missing or empty.
//
// @returns { user, pass } if both credentials are present, null otherwise
export function validateCredentials(): { user: string; pass: string } | null {
  const user = process.env.DOMINION_USER;
  const pass = process.env.DOMINION_PASS;

  if (!user || !pass) {
    return null;
  }

  return { user, pass };
}
