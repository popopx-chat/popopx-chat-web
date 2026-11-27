// Oracle fixture — an `as Localized<string>` cast over an untyped map: the
// cast erases the key check, so the missing languages compile.
type Locale = "en" | "ru" | "de" | "fr" | "it" | "nl" | "cs" | "zh-Hans" | "zh-Hant" | "es" | "pl" | "ja" | "th" | "fi" | "uk" | "bg" | "tr" | "hu" | "pt-BR" | "ko" | "ar";
type Localized<T> = Record<Locale, T>;

const UNTYPED: Record<string, string> = { en: "Hello", "zh-Hans": "你好" };

export const CAST = UNTYPED as Localized<string>;
