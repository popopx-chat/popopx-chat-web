// Oracle fixture — a function that *derives* a locale map, the first way to
// fake an 18-language claim: TypeScript sees a total Record while fifteen
// slots are somebody else's text pasted at runtime.
type Locale = "en" | "ru" | "de" | "fr" | "it" | "nl" | "cs" | "zh-Hans" | "zh-Hant" | "es" | "pl" | "ja" | "th" | "fi" | "uk" | "bg" | "tr" | "hu" | "pt-BR" | "ko" | "ar";
type Localized<T> = Record<Locale, T>;

export function DERIVED(en: string, zh: string): Localized<string> {
  const filled = {} as Record<Locale, string>;
  for (const tag of ["en", "ru", "de"] as Locale[]) filled[tag] = en;
  filled["zh-Hans"] = zh;
  return filled as Localized<string>;
}
