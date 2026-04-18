import "server-only";

import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  isLocale,
  LANGUAGE_COOKIE_KEY,
  type Locale,
} from "@/lib/i18n/config";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LANGUAGE_COOKIE_KEY)?.value;

  if (locale && isLocale(locale)) {
    return locale;
  }

  return DEFAULT_LOCALE;
}
