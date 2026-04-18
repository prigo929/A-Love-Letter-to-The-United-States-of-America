"use client";

// Lightweight client-side language state.
//
// This project does not use route-based i18n yet. Instead, the selected
// language lives in React context and is persisted in localStorage so the
// header language switcher affects the currently loaded UI immediately.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  isLocale,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_OPTIONS,
  LANGUAGE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n/config";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  const setLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    setLocaleState(nextLocale);

    // Server-rendered routes like /economy and /nature read the locale from a
    // cookie, so we refresh the current route after changing languages to make
    // them re-render immediately instead of waiting for a manual page reload.
    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLocale && isLocale(storedLocale)) {
        setLocaleState(storedLocale);
      }
    } catch {
      // Ignore storage errors and keep the default language.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage errors. The UI should still work for the current session.
    }

    document.cookie = `${LANGUAGE_COOKIE_KEY}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  const selectedLanguage =
    LANGUAGE_OPTIONS.find((option) => option.locale === context.locale) ??
    LANGUAGE_OPTIONS[0];

  return {
    ...context,
    selectedLanguage,
    languageOptions: LANGUAGE_OPTIONS,
  };
}
