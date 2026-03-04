import { build } from "vite";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { cpSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");

// Shared Vite config for Chrome extension IIFE builds
function chromeExtBuild(entry, outFile) {
  return build({
    root,
    configFile: false,
    build: {
      emptyOutDir: false,
      outDir: "dist",
      lib: {
        entry,
        formats: ["iife"],
        name: "DominionHelper",
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
  // Clean dist
  mkdirSync(dist, { recursive: true });

  console.log("Building content script...");
  await chromeExtBuild("src/content/content.ts", "content.js");

  console.log("Building service worker...");
  await chromeExtBuild("src/background/service-worker.ts", "service-worker.js");

  console.log("Building popup script...");
  await chromeExtBuild("src/popup/popup.ts", "popup.js");

  // Copy static assets
  console.log("Copying static assets...");
  cpSync(resolve(root, "icons"), resolve(dist, "icons"), { recursive: true });
  copyFileSync(
    resolve(root, "src/content/overlay.css"),
    resolve(dist, "overlay.css"),
  );
  copyFileSync(
    resolve(root, "src/popup/popup.html"),
    resolve(dist, "popup.html"),
  );
  copyFileSync(
    resolve(root, "src/popup/popup.css"),
    resolve(dist, "popup.css"),
  );

  // Generate dist/manifest.json with bundled paths
  const srcManifest = JSON.parse(
    readFileSync(resolve(root, "manifest.json"), "utf-8"),
  );
  const distManifest = {
    ...srcManifest,
    content_scripts: [
      {
        matches: srcManifest.content_scripts[0].matches,
        js: ["content.js"],
        css: ["overlay.css"],
        run_at: "document_idle",
      },
    ],
    background: {
      service_worker: "service-worker.js",
    },
    action: {
      default_popup: "popup.html",
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

  // Update popup.html to reference bundled script
  const popupHtml = readFileSync(resolve(dist, "popup.html"), "utf-8");
  writeFileSync(
    resolve(dist, "popup.html"),
    popupHtml.replace('src="popup.js"', 'src="popup.js"'),
  );

  console.log("Build complete! Extension ready in dist/");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
