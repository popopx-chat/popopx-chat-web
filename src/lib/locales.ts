/**
 * Locale data, with no React and no `"use client"`.
 *
 * The 18 tags are copied verbatim, in order, from `CFBundleLocalizations` in
 * `apps/ios/POPOPX--iOS--Info.plist` of the client repository — the single
 * source of truth both for the iOS app and for this portal.
 *
 * This file exists separately from `i18n.tsx` because of the Next.js module
 * boundary: a `"use client"` module exposes its *values* to a Server Component
 * as client-reference proxies, so `[...LOCALES]` in `layout.tsx` throws at build
 * time and `HTML_LANG[DEFAULT_LOCALE]` reads `undefined`. Pure data must come
 * from a module the server is allowed to evaluate. `i18n.tsx` re-exports
 * everything here, so client code has one import path.
 *
 * `Localized<T>` is a total `Record`, which is what makes "the portal speaks the
 * same 18 languages" a compile-time fact instead of a claim: a copy object that
 * omits a language does not type-check, and `tools/check-i18n.mjs` plus
 * `npm run check:i18n` catch the things the type cannot see — a slot still
 * holding the English text, stale `zh-CN`/`zh-TW` tags, simplified/traditional
 * leakage, and the derived maps or `as` casts that would fake totality.
 */

export const LOCALES = [
  "en", "ru", "de", "fr", "it", "nl", "cs", "zh-Hans", "zh-Hant", "es",
  "pl", "ja", "th", "fi", "uk", "bg", "tr", "hu",
] as const;

export type Locale = (typeof LOCALES)[number];

export type Localized<T> = Record<Locale, T>;

/** The language each visitor gets when nothing is stored and nothing matches. */
export const DEFAULT_LOCALE: Locale = "zh-Hans";

/** Language-preference key in `localStorage`; never a cookie. */
export const STORAGE_KEY = "popopx.locale";

/** `document.documentElement.lang` values, BCP 47 as browsers expect them. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  de: "de",
  fr: "fr",
  it: "it",
  nl: "nl",
  cs: "cs",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
  es: "es",
  pl: "pl",
  ja: "ja",
  th: "th",
  fi: "fi",
  uk: "uk",
  bg: "bg",
  tr: "tr",
  hu: "hu",
};

/**
 * Endonyms for the language menu. The name of a language is written in that
 * language, which is also what lets a visitor who cannot read the current
 * interface still find their own.
 */
export const LOCALE_NATIVE: Localized<string> = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  nl: "Nederlands",
  cs: "Čeština",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
  es: "Español",
  pl: "Polski",
  ja: "日本語",
  th: "ไทย",
  fi: "Suomi",
  uk: "Українська",
  bg: "Български",
  tr: "Türkçe",
  hu: "Magyar",
};

/** Language names in the default interface language, for the "also known as" line. */
export const LOCALE_NAME: Localized<string> = {
  en: "英语",
  ru: "俄语",
  de: "德语",
  fr: "法语",
  it: "意大利语",
  nl: "荷兰语",
  cs: "捷克语",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁体中文",
  es: "西班牙语",
  pl: "波兰语",
  ja: "日语",
  th: "泰语",
  fi: "芬兰语",
  uk: "乌克兰语",
  bg: "保加利亚语",
  tr: "土耳其语",
  hu: "匈牙利语",
};

/** Abbreviations for the compact language trigger. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
  fr: "FR",
  it: "IT",
  nl: "NL",
  cs: "CS",
  "zh-Hans": "中简",
  "zh-Hant": "中繁",
  es: "ES",
  pl: "PL",
  ja: "JA",
  th: "TH",
  fi: "FI",
  uk: "UK",
  bg: "BG",
  tr: "TR",
  hu: "HU",
};

export const LOCALE_COUNT: number = LOCALES.length;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Right-to-left scripts would need this; none of the 18 are RTL. */
export function isRightToLeft(_locale: Locale): boolean {
  return false;
}
