// Caps the Next.js build cache so it can never grow unbounded and fill the disk.
// Runs automatically before `dev` and `build` (via the predev/prebuild npm
// lifecycle). If `.next/cache` exceeds the limit, it is cleared — Next simply
// rebuilds it on demand.

import { rmSync, statSync, readdirSync, readFileSync } from "node:fs";
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

const LIMIT_GB = Number(process.env.NEXT_CACHE_LIMIT_GB || 5);
const LIMIT_BYTES = LIMIT_GB * 1024 * 1024 * 1024;
const CACHE_DIR = join(process.cwd(), ".next", "cache");

function dirSize(dir) {
  let total = 0;
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return 0; // missing dir → size 0
  }
  for (const entry of entries) {
    const p = join(dir, entry.name);
    try {
      if (entry.isDirectory()) total += dirSize(p);
      else total += statSync(p).size;
    } catch {
      /* ignore files that vanish mid-scan */
    }
    if (total > LIMIT_BYTES) return total; // early exit once over the cap
  }
  return total;
}

const size = dirSize(CACHE_DIR);
const gb = (size / 1024 ** 3).toFixed(2);

if (size > LIMIT_BYTES) {
  rmSync(CACHE_DIR, { recursive: true, force: true });
  console.log(`[cap-cache] .next/cache was ${gb} GB (> ${LIMIT_GB} GB limit) — cleared.`);
} else {
  console.log(`[cap-cache] .next/cache ${gb} GB — within ${LIMIT_GB} GB limit.`);
}
