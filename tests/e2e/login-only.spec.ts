// Minimal login test for debugging the login flow.
// Run: npm run test:login -- --headed
import { test, expect } from "./fixtures";

test("login to dominion.games", async ({ authenticatedPage }) => {
  expect(authenticatedPage.url()).toContain("dominion.games");
  await expect(
    authenticatedPage.locator(".lobby-page, .tab-button"),
  ).toBeVisible({ timeout: 10000 });
});
