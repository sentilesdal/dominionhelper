// Page state capture helper for self-debugging E2E tests.
//
// When tests fail against dominion.games, the captured artifacts
// (screenshot, DOM snapshot, element list) let us inspect the actual
// page state instead of guessing at selectors and flows.
//
// All capture logic is wrapped in try/catch so failures here never
// break the tests themselves.
import { type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

// Captures three debug artifacts for a given page state:
// - {label}.png — full page screenshot
// - {label}-dom.txt — innerHTML of the main content area
// - {label}-elements.txt — list of visible interactive elements
//
// All files are written to test-results/. The directory is created
// if it does not exist. Capture failures are silently ignored so
// they never interfere with test execution.
//
// @param page - Playwright Page to capture state from
// @param label - Filename prefix for the captured artifacts
export async function capturePageState(
  page: Page,
  label: string,
): Promise<void> {
  const outDir = path.resolve("test-results");

  try {
    // Ensure the output directory exists
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // 1. Full page screenshot
    await page.screenshot({ path: path.join(outDir, `${label}.png`) });

    // 2. DOM snapshot of the main content area.
    // Try lobby-page, game-page, then fall back to body.
    // Cap at 50k chars to avoid giant files from complex game states.
    const domHtml = await page.evaluate(() => {
      const selectors = [".lobby-page", ".game-page", "body"];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          return el.innerHTML.substring(0, 50000);
        }
      }
      return "(no content found)";
    });
    fs.writeFileSync(path.join(outDir, `${label}-dom.txt`), domHtml, "utf-8");

    // 3. List of visible interactive elements.
    // Captures buttons, links, inputs, and [ng-click] elements
    // with their text, tag, classes, and key attributes.
    const elements = await page.evaluate(() => {
      const results: string[] = [];
      const selector = 'button, a, input, select, [ng-click], [role="button"]';
      const els = document.querySelectorAll(selector);

      for (const el of els) {
        const htmlEl = el as HTMLElement;

        // Skip hidden elements
        if (htmlEl.offsetParent === null && htmlEl.style.display !== "fixed") {
          continue;
        }

        const tag = el.tagName.toLowerCase();
        const text = htmlEl.innerText?.trim().substring(0, 80) || "";
        const classes = el.className?.toString().trim().substring(0, 100) || "";
        const type = el.getAttribute("type") || "";
        const ngClick = el.getAttribute("ng-click") || "";
        const role = el.getAttribute("role") || "";
        const href = el.getAttribute("href") || "";

        let line = `<${tag}`;
        if (type) line += ` type="${type}"`;
        if (role) line += ` role="${role}"`;
        if (classes) line += ` class="${classes}"`;
        if (ngClick) line += ` ng-click="${ngClick}"`;
        if (href) line += ` href="${href}"`;
        line += `>`;
        if (text) line += ` "${text}"`;

        results.push(line);
      }

      return results.join("\n");
    });
    fs.writeFileSync(
      path.join(outDir, `${label}-elements.txt`),
      elements,
      "utf-8",
    );
  } catch {
    // Silently ignore capture failures -- they must never break tests
  }
}
