// Oracle fixture — correct copy: all eighteen slots authored, with the
// legitimate Latin that translated technical prose keeps (a command, an enum
// raw value, a hyphenated Latin abbreviation) and clean script boundaries.
type Locale = "en" | "ru" | "de" | "fr" | "it" | "nl" | "cs" | "zh-Hans" | "zh-Hant" | "es" | "pl" | "ja" | "th" | "fi" | "uk" | "bg" | "tr" | "hu";
type Localized<T> = Record<Locale, T>;

export const CLEAN_LITERAL = {
  en: "Nothing in the repository pins an Xcode build: CI only runs xcodebuild -version",
  ru: "Репозиторий не закрепляет версию Xcode: CI запускает только xcodebuild -version",
  de: "Im Repository ist keine Xcode-Version festgenagelt: CI nutzt nur xcodebuild -version",
  fr: "Rien dans le dépôt ne fige une version d'Xcode : CI lance seulement xcodebuild -version",
  it: "Nel repository nessuna versione di Xcode è fissata: CI usa solo xcodebuild -version",
  nl: "In de repository wordt geen Xcode-versie vastgezet: CI gebruikt alleen xcodebuild -version",
  cs: "Repozitář žádnou verzi Xcode nezapevňuje: CI jen spustí xcodebuild -version",
  "zh-Hans": "仓库里没有钉死 Xcode 版本：CI 只运行 xcodebuild -version",
  "zh-Hant": "倉庫裡沒有釘死 Xcode 版本：CI 只執行 xcodebuild -version",
  es: "El repositorio no fija una versión de Xcode: CI solo usa xcodebuild -version",
  pl: "Repozytorium nie przypisuje wersji Xcode: CI używa tylko xcodebuild -version",
  ja: "リポジトリは Xcode のバージョンを固定していません。CI は xcodebuild -version だけを回します",
  th: "ในคลังโค้ดไม่ได้ตรึงเวอร์ชัน Xcode: CI รันแค่ xcodebuild -version",
  fi: "Mikään repo ei lukitse Xcode-versiota: CI ajaa vain xcodebuild -version",
  uk: "У репозиторії версію Xcode не закріплено: CI вживає лише xcodebuild -version",
  bg: "В хранилището няма фиксирана версия на Xcode: CI ползва само xcodebuild -version",
  tr: "Depo Xcode sürümünü sabitlemiyor: CI yalnızca xcodebuild -version çalıştırıyor",
  hu: "A tároló nem rögzít Xcode-verziót: a CI csak az xcodebuild -version parancsot futtatja",
} satisfies Localized<string>;
