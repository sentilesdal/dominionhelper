// Dominion Helper — Build Script
//
// Bundles the Chrome extension into the dist/ directory using Vite.
// Chrome content scripts don't support ES modules, so each entry point
// is bundled separately into IIFE format.
//
// Four builds are performed:
// 1. Content script — bundles all content + tracker + card data into one file
// 2. Service worker — background script with analysis engine + card data
// 3. Side panel — renders kingdom analysis and deck tracker in the sidebar
// 4. Game state bridge — MAIN-world script that reads Angular game state
//
// After bundling, static assets (CSS, HTML, icons) are copied to dist/
// and a new manifest.json is generated with dist-relative paths.

import { build } from "vite";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { cpSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");

// Builds a single entry point as an IIFE bundle for Chrome extension use.
// Minification is disabled to aid debugging; sourcemaps are off since
// content scripts run in an isolated world where devtools access is limited.
//
// @param {string} entry - Path to the TypeScript entry point (relative to project root)
// @param {string} outFile - Output filename in the dist/ directory
// @param {string} [iifeName] - IIFE global name (defaults to "DominionHelper").
//   Each build needs a unique name to avoid conflicts when multiple scripts load.
function chromeExtBuild(entry, outFile, iifeName = "DominionHelper") {
  return build({
    root,
    configFile: false,
    build: {
      emptyOutDir: false,
      outDir: "dist",
      lib: {
        entry,
        formats: ["iife"],
        name: iifeName,
        fileName: () => outFile,
      },
      rollupOptions: {
        output: {
          entryFileNames: outFile,
        },
      },
      minify: false,
      sourcemap: false,
    },
    resolve: {
      alias: {
        "@": resolve(root, "src"),
      },
    },
  });
}

async function main() {
  mkdirSync(dist, { recursive: true });

  // Build each entry point separately — Chrome requires IIFE format,
  // and Vite/Rollup can only produce one IIFE per build invocation
  console.log("Building content script...");
  await chromeExtBuild("src/content/content.ts", "content.js");

  console.log("Building service worker...");
  await chromeExtBuild(
    "src/background/service-worker.ts",
    "service-worker.js",
    "DominionHelperSW",
  );

  console.log("Building side panel...");
  await chromeExtBuild(
    "src/sidepanel/sidepanel.ts",
    "sidepanel.js",
    "DominionHelperSidePanel",
  );

  // Bridge runs in MAIN world to access Angular — needs a unique IIFE name
  // to avoid colliding with the content script's "DominionHelper" global
  console.log("Building game state bridge...");
  await chromeExtBuild(
    "src/content/game-state-bridge.ts",
    "game-state-bridge.js",
    "DominionHelperBridge",
  );

  // Copy static assets that don't need bundling
  console.log("Copying static assets...");
  cpSync(resolve(root, "icons"), resolve(dist, "icons"), { recursive: true });
  copyFileSync(
    resolve(root, "src/sidepanel/sidepanel.html"),
    resolve(dist, "sidepanel.html"),
  );
  copyFileSync(
    resolve(root, "src/sidepanel/sidepanel.css"),
    resolve(dist, "sidepanel.css"),
  );

  // Generate dist/manifest.json from the source manifest, replacing
  // source paths with dist-relative bundled output paths
  const srcManifest = JSON.parse(
    readFileSync(resolve(root, "manifest.json"), "utf-8"),
  );
  const distManifest = {
    ...srcManifest,
    content_scripts: [
      {
        matches: srcManifest.content_scripts[0].matches,
        js: ["content.js"],
        run_at: "document_idle",
      },
      {
        matches: srcManifest.content_scripts[0].matches,
        js: ["game-state-bridge.js"],
        run_at: "document_idle",
        world: "MAIN",
      },
    ],
    background: {
      service_worker: "service-worker.js",
    },
    side_panel: {
      default_path: "sidepanel.html",
    },
    action: {
      default_icon: {
        16: "icons/icon16.png",
        48: "icons/icon48.png",
        128: "icons/icon128.png",
      },
    },
    icons: {
      16: "icons/icon16.png",
      48: "icons/icon48.png",
      128: "icons/icon128.png",
    },
  };
  writeFileSync(
    resolve(dist, "manifest.json"),
    JSON.stringify(distManifest, null, 2),
  );

  console.log("Build complete! Extension ready in dist/");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
