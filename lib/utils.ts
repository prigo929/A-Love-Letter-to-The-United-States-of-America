import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Class Name Utility ───────────────────────────────────────────────────────
/**
 * Combines clsx + tailwind-merge so Tailwind classes compose cleanly
 * without specificity conflicts.
 *
 * Usage: cn('px-4 py-2', condition && 'bg-glory-red', 'px-6')
 *   → 'py-2 bg-glory-red px-6'  (px-6 overrides px-4)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Number Formatting ────────────────────────────────────────────────────────

/** Format large numbers with commas: 28800000000000 → "28,800,000,000,000" */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/** Format billions/trillions: 28.8e12 → "$28.8T" */
export function formatCompact(n: number, prefix = "", suffix = ""): string {
  if (n >= 1e12) return `${prefix}${(n / 1e12).toFixed(1)}T${suffix}`;
  if (n >= 1e9) return `${prefix}${(n / 1e9).toFixed(1)}B${suffix}`;
  if (n >= 1e6) return `${prefix}${(n / 1e6).toFixed(1)}M${suffix}`;
  if (n >= 1e3) return `${prefix}${(n / 1e3).toFixed(1)}K${suffix}`;
  return `${prefix}${n}${suffix}`;
}

// ─── String Utilities ─────────────────────────────────────────────────────────

/** Convert slug to title: "capital-markets" → "Capital Markets" */
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Convert title to slug: "Capital Markets" → "capital-markets" */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Truncate text: "Long text..." */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

// ─── URL / Image Utilities ───────────────────────────────────────────────────

/**
 * Generate an Unsplash URL with standard quality params.
 * Example: unsplashUrl('photo-1234567890', 1920, 1080)
 */
export function unsplashUrl(
  photoId: string,
  width = 1920,
  height?: number,
): string {
  const h = height ? `&h=${height}` : "";
  return `https://images.unsplash.com/${photoId}?q=80&w=${width}${h}&auto=format&fit=crop`;
}

/**
 * Generate a tiny base64 blur placeholder for next/image.
 * In production, use `plaiceholder` or `blurDataURL` from Unsplash's
 * blurhash API. This is a safe fallback gray.
 */
export const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

// ─── Date Utilities ───────────────────────────────────────────────────────────

/** How many years since 1776 — used in "Est. 1776" badges */
export function yearsSince1776(): number {
  return new Date().getFullYear() - 1776;
}

/** Format: 2024 → "2024" | undefined → "N/A" */
export function formatYear(year?: number): string {
  return year != null ? String(year) : "N/A";
}

// ─── Validation ───────────────────────────────────────────────────────────────

/** Simple email check — Zod handles the real validation */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Array Utilities ─────────────────────────────────────────────────────────

/** Chunk an array into sub-arrays of size n */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/** Return random items from array */
export function sample<T>(array: T[], n: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
