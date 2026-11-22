"use client";

/**
 * i18n runtime for the POPOPX portal — exactly the languages the iOS client
 * declares, resolved on the client only.
 *
 * The locale set, the types and the display names live in `locales.ts` so the
 * root layout (a Server Component) may read them; this module is the client
 * half: the provider, the stored preference and the lookup helpers.
 *
 * Why client-side resolution rather than 18 generated routes: the project is a
 * Next.js `output: "export"` static build, so there is one HTML document and no
 * server, no middleware and no cookies allowed. `localStorage` keeps the
 * choice, a first visit gets the portal's declared default (`zh-Hans`, the same
 * value the document `<html lang>` and the metadata were built for), and every
 * stored value is re-checked against the 18 — so a visitor can never reach a
 * page with missing copy.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  STORAGE_KEY,
  isLocale,
  type Locale,
  type Localized,
} from "./locales";

export * from "./locales";

/** Resolve a localized map for the active locale. */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Resolve a `Localized` map against the current locale. */
  copy: <T>(value: Localized<T>) => T;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  // The static export ships one document, so the very first render must not
  // depend on the visitor's storage; `initialLocale` keeps that render identical
  // to the HTML Next emitted, and a stored preference is applied in the effect.
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    let stored: Locale | null = null;
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      // A stale or hand-edited entry is ignored rather than trusted: every
      // stored value has to be one of the 18 before it may render the page.
      if (value && isLocale(value)) stored = value;
    } catch {
      // Private mode or a blocked storage area: this page view keeps the default.
    }
    if (stored) setLocaleState(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = HTML_LANG[locale];
    root.dir = "ltr";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage refused: the choice still applies to this page view.
    }
  }, []);

  const copy = useCallback(<T,>(value: Localized<T>): T => value[locale], [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, copy }),
    [locale, setLocale, copy],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside <LocaleProvider>");
  return context;
}

/**
 * Resolve one copy object against the current locale.
 *
 * It is a hook, so it belongs at the top level of a component: a component that
 * renders a list resolves each item inside a child component rather than
 * calling this from a `.map()` callback.
 */
export function useCopy<T>(value: Localized<T>): T {
  const { copy } = useLocale();
  return copy(value);
}
