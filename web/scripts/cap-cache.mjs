// Clear Next.js build cache to prevent unbounded growth.
// Runs automatically before `dev` and `build` (via the predev/prebuild npm lifecycle).

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

try {
  rmSync(CACHE_DIR, { recursive: true, force: true });
  console.log(`[cap-cache] .next/cache cleared successfully.`);
} catch (e) {
  console.log(`[cap-cache] .next/cache not found or could not be removed.`);
}

