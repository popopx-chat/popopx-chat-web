// Oracle fixture — the patterns the oracle must accept: `satisfies` (which
// checks every key), a helper returning `T` rather than a map, an honest
// `Partial` cast, and technical values that are identical in every language.
type Locale = "en" | "ru" | "de" | "fr" | "it" | "nl" | "cs" | "zh-Hans" | "zh-Hant" | "es" | "pl" | "ja" | "th" | "fi" | "uk" | "bg" | "tr" | "hu" | "pt-BR" | "ko" | "ar";
type Localized<T> = Record<Locale, T>;

export const BRAND: Localized<string> = {
  en: "POPOPX",
  ru: "POPOPX",
  de: "POPOPX",
  fr: "POPOPX",
  it: "POPOPX",
  nl: "POPOPX",
  cs: "POPOPX",
  "zh-Hans": "POPOPX",
  "zh-Hant": "POPOPX",
  es: "POPOPX",
  pl: "POPOPX",
  ja: "POPOPX",
  th: "POPOPX",
  fi: "POPOPX",
  uk: "POPOPX",
  bg: "POPOPX",
  tr: "POPOPX",
  hu: "POPOPX",
  "pt-BR": "POPOPX",
  ko: "POPOPX",
  ar: "POPOPX",
};

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export function optional(locale: Locale): Partial<Record<Locale, string>> {
  return { [locale]: "Only the requested slot, and no claim about the rest" };
}

// One locale key plus a non-locale key: not a copy object, so the honest
// `Partial` cast below is the only thing the oracle has to look at.
const QR: Record<string, string> = { en: "QR", fallback: "QR" };
export const PARTIAL_CAST = QR as Partial<Record<Locale, string>>;
