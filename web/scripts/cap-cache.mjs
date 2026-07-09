// Clear Next.js build cache to prevent unbounded growth.
// Runs automatically before `dev` and `build` (via the predev/prebuild npm lifecycle).
//
// IMPORTANT: .next/dev is ONLY cleared during `predev` (fresh dev starts).
// It is intentionally NOT cleared during `prebuild` so that a running `npm run dev`
// server is never disrupted when `npm run build` is executed concurrently.

import { rmSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Verify that site-images.ts is not left in a proxy stub state from build-search-index
const siteImagesPath = join(process.cwd(), "lib", "site-images.ts");
try {
  const content = readFileSync(siteImagesPath, "utf-8");
  if (content.includes("new Proxy")) {
    console.error("\n\x1b[41m\x1b[37m CRITICAL ERROR \x1b[0m");
    console.error("\x1b[31mweb/lib/site-images.ts is currently in a stubbed Proxy state!\x1b[0m");
    console.error("\x1b[33mTo fix this, please run: git restore web/lib/site-images.ts\x1b[0m\n");
    process.exit(1);
  }
} catch (e) {
  // Ignore if file doesn't exist yet
}

const CACHE_DIR = join(process.cwd(), ".next", "cache");
const DEV_CACHE_DIR = join(process.cwd(), ".next", "dev");

// Always clear the build cache
try {
  rmSync(CACHE_DIR, { recursive: true, force: true });
  console.log(`[cap-cache] .next/cache cleared successfully.`);
} catch (e) {
  console.log(`[cap-cache] .next/cache not found or could not be removed.`);
}

// Only clear .next/dev when starting a fresh dev server (npm_lifecycle_event === 'predev').
// During prebuild, skip this to avoid corrupting a concurrently-running dev server.
const lifecycle = process.env.npm_lifecycle_event;
if (lifecycle === "predev") {
  try {
    rmSync(DEV_CACHE_DIR, { recursive: true, force: true });
    console.log(`[cap-cache] .next/dev cleared successfully.`);
  } catch (e) {
    console.log(`[cap-cache] .next/dev not found or could not be removed.`);
  }
} else {
  console.log(`[cap-cache] .next/dev preserved (running as ${lifecycle}).`);
}
