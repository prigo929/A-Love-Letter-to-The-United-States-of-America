// Shared language config used by the client provider and translated UI helpers.
//
// Keep this file free of React code so both server and client files can import
// the locale type without pulling browser-only logic into the server bundle.

export const LOCALES = ["en", "ro"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LANGUAGE_STORAGE_KEY = "usa-patriot-language";

export const LANGUAGE_OPTIONS = [
  { label: "English", code: "EN", flag: "🇺🇸", locale: "en" },
  { label: "Română", code: "RO", flag: "🇷🇴", locale: "ro" },
] as const;

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
