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
} from "react";
import {
  DEFAULT_LOCALE,
  isLocale,
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
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLocale && isLocale(storedLocale)) {
        setLocale(storedLocale);
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
