// Caps the Next.js build cache so it can never grow unbounded and fill the disk.
// Runs automatically before `dev` and `build` (via the predev/prebuild npm
// lifecycle). If `.next/cache` exceeds the limit, it is cleared — Next simply
// rebuilds it on demand.

import { rmSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";

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
