import type { Metadata } from "next";
import type { Localized } from "./locales";
import { SITE_ORIGIN } from "./site";

/**
 * What the document head says, in all 18 interface languages.
 *
 * `layout.tsx` is a Server Component and `locales.ts` is the only module the
 * server may evaluate for locale data, so the maps live here — a `"use client"`
 * module would hand these values to the server as client references. `layout.tsx`
 * reads the `DEFAULT_LOCALE` slot (Simplified Chinese, which is also the
 * `<html lang>` the export is built for) and `LocaleMeta` re-applies the active
 * slot to the browser tab.
 *
 * That split is the whole story of an 18-language `<title>` in a static export:
 * there is one HTML document per route, so a crawler that does not run
 * JavaScript indexes exactly one title — the zh-Hans one — and there are no
 * translated URLs to point `hreflang` at. What the visitor sees in the tab and
 * what the search result shows are therefore aligned by *content*, not by
 * pretending there are eighteen pages. The per-route `pageMetadata` below stays
 * Simplified Chinese for the same reason.
 */

/**
 * The positioning sentence. `SEO_TITLE` below is the same sentence in the
 * `POPOPX — <positioning>` form the document head uses, and the Hero prints it as
 * the line under its heading: two literal 18-slot maps in this one module, updated
 * together, so tab and first screen agree in every language.
 */
export const BRAND_POSITIONING: Localized<string> = {
  en: "POPOPX Is a Privacy-First Intelligent Connection Platform",
  ru: "POPOPX — это платформа интеллектуальных соединений с приоритетом конфиденциальности",
  de: "POPOPX ist eine datenschutzorientierte intelligente Verbindungsplattform",
  fr: "POPOPX est une plateforme de connexion intelligente à confidentialité prioritaire",
  it: "POPOPX è una piattaforma di connessione intelligente con priorità alla privacy",
  nl: "POPOPX is een privacy-first intelligent verbindingsplatform",
  cs: "POPOPX je platforma inteligentních spojení s prioritou soukromí",
  "zh-Hans": "POPOPX 是隐私优先的智能连接平台",
  "zh-Hant": "POPOPX 是隱私優先的智慧連接平台",
  es: "POPOPX es una plataforma de conexión inteligente con prioridad de privacidad",
  pl: "POPOPX to platforma inteligentnych połączeń z priorytetem prywatności",
  ja: "POPOPX はプライバシー優先のインテリジェント接続プラットフォーム",
  th: "POPOPX คือแพลตฟอร์มการเชื่อมต่ออัจฉริยะที่เน้นความเป็นส่วนตัว",
  fi: "POPOPX on yksityisyyden ensisijainen älykäs yhteysalusta",
  uk: "POPOPX — це інтелектуальна платформа з’єднань з пріоритетом конфіденційності",
  bg: "POPOPX е интелигентна платформа за връзки с приоритет на поверителността",
  tr: "POPOPX gizlilik öncelikli akıllı bir bağlantı platformudur",
  hu: "A POPOPX egy adatvédelem-first intelligens kapcsolódási platform",
};

/**
 * The brand claim, kept locale-free on purpose.
 *
 * A translated slogan stops being a slogan, and a Latin string inside an 18-slot
 * map is exactly what the residue probe in `tools/check-i18n.mjs` exists to
 * complain about. So `Connect Everything.` is printed identically in every
 * language — the same treatment `PortalCards` gives product names — while
 * `BRAND_CLAIM_LOCAL` carries the sentence that explains it.
 */
export const BRAND_CLAIM = "Connect Everything.";

/** The claim's restatement, in the language the visitor reads the page in. */
export const BRAND_CLAIM_LOCAL: Localized<string> = {
  en: "Connect everything, and let intelligence collaborate freely.",
  ru: "Соединить всё — и дать разуму свободно сотрудничать.",
  de: "Alles verbinden — und Intelligenz frei zusammenarbeiten lassen.",
  fr: "Tout connecter — et laisser l’intelligence collaborer librement.",
  it: "Connettere tutto — e lasciare che l’intelligenza collabori liberamente.",
  nl: "Alles verbinden — en intelligentie vrij laten samenwerken.",
  cs: "Spojit všechno — a nechat inteligenci svobodně spolupracovat.",
  "zh-Hans": "连接一切，让智能自由协作。",
  "zh-Hant": "連接一切，讓智能自由協作。",
  es: "Conectarlo todo — y dejar que la inteligencia colabore con libertad.",
  pl: "Połączyć wszystko — i dać inteligencji swobodnie współdziałać.",
  ja: "すべてをつなぎ、知が自由に協働できるように。",
  th: "เชื่อมต่อทุกอย่าง และเปิดทางให้สติปัญญาทำงานร่วมกันอย่างอิสระ",
  fi: "Yhdistä kaikki — ja anna älyn tehdä vapaasti yhteistyötä.",
  uk: "З’єднати все — і дати розуму вільно співпрацювати.",
  bg: "Свържете всичко — и оставете интелигентността да си сътрудничи свободно.",
  tr: "Her şeyi bağla — ve zekânın özgürce iş birliği yapmasına izin ver.",
  hu: "Mindent összekapcsolni — és hagyni, hogy az intelligencia szabadon együttműködjön.",
};

/**
 * The ecosystem mission: the Hero's subtitle and the first sentence of
 * `SEO_DESCRIPTION` are this one sentence, written literally into both maps. A
 * derived map is not allowed here (see `tools/check-i18n.mjs`), so the two are
 * kept in step by hand and re-measured slot by slot before any change lands.
 */
export const BRAND_MISSION: Localized<string> = {
  en: "POPOPX does not merely provide connection tools — it builds an open ecosystem where people, AI, agents, devices, and services connect securely and collaborate freely.",
  ru: "POPOPX не просто даёт инструменты соединения — он строит открытую экосистему, где люди, ИИ, агенты, устройства и сервисы связываются безопасно и сотрудничают свободно.",
  de: "POPOPX stellt nicht bloß Verbindungs-Werkzeuge bereit, es baut ein offenes Ökosystem, in dem Menschen, KI, Agenten, Geräte und Dienste sich sicher verbinden und frei zusammenarbeiten.",
  fr: "POPOPX ne fournit pas de simples outils de connexion : il construit un écosystème ouvert où les personnes, l’IA, les agents, les appareils et les services se relient en sécurité et collaborent librement.",
  it: "POPOPX non fornisce soltanto strumenti di collegamento: costruisce un ecosistema aperto in cui persone, IA, agenti, dispositivi e servizi si collegano in sicurezza e collaborano liberamente.",
  nl: "POPOPX levert niet alleen verbindingsmogelijkheden — het bouwt een open ecosysteem waarin mensen, AI, agents, apparaten en diensten veilig verbinden en vrij samenwerken.",
  cs: "POPOPX nejen že poskytuje nástroje spojení — buduje otevřený ekosystém, kde se lidé, AI, agenti, zařízení a služby bezpečně spojují a svobodně spolupracují.",
  "zh-Hans": "POPOPX 不只是提供连接工具，而是建立一个让人、AI、Agent、设备和服务能够安全连接、自由协作的开放生态。",
  "zh-Hant": "POPOPX 不只是提供連線工具，而是建立一個讓人、AI、Agent、裝置與服務能夠安全連線、自由協作的開放生態。",
  es: "POPOPX no solo ofrece herramientas de conexión: construye un ecosistema abierto donde personas, IA, agentes, dispositivos y servicios se conectan con seguridad y colaboran con libertad.",
  pl: "POPOPX nie tylko dostarcza narzędzia połączeń — buduje otwarty ekosystem, w którym ludzie, AI, agenci, urządzenia i usługi łączą się bezpiecznie i swobodnie współdziałają.",
  ja: "POPOPX が提供するのは接続の道具だけではありません。人、AI、エージェント、デバイス、サービスが安全につながり、自由に協働できるオープンなエコシステムを築いています。",
  th: "POPOPX ไม่ได้มีแค่เครื่องมือเชื่อมต่อ แต่กำลังสร้างระบบนิเวศเปิดที่ผู้คน AI เอเจนต์ อุปกรณ์ และบริการต่างเชื่อมต่อกันอย่างปลอดภัยและทำงานร่วมกันได้อย่างอิสระ",
  fi: "POPOPX ei vain tarjoa yhteystyökaluja — se rakentaa avoimen ekosysteemin, jossa ihmiset, tekoäly, agentit, laitteet ja palvelut yhdistyvät turvallisesti ja tekevät vapaasti yhteistyötä.",
  uk: "POPOPX не просто надає засоби з’єднання — він будує відкриту екосистему, де люди, ШІ, агенти, пристрої й сервіси безпечно з’єднуються й вільно співпрацюють.",
  bg: "POPOPX не просто предоставя средства за свързване — той изгражда отворена екосистема, в която хора, изкуствен интелект, агенти, устройства и услуги се свързват безопасно и си сътрудничат свободно.",
  tr: "POPOPX yalnızca bağlantı araçları sunmaz; insanların, yapay zekânın, ajanların, cihazların ve hizmetlerin güvenle bağlanıp özgürce iş birliği yaptığı açık bir ekosistem kurar.",
  hu: "A POPOPX nem pusztán kapcsolati eszközöket biztosít, hanem nyílt ökoszisztémát épít, ahol emberek, mesterséges intelligenciák, ügynökök, eszközök és szolgáltatások biztonságosan kapcsolódnak és szabadon együttműködnek.",
};

export const SEO_TITLE: Localized<string> = {
  en: "POPOPX — Privacy-First Intelligent Connection Platform",
  ru: "POPOPX — Платформа интеллектуальных соединений с приоритетом конфиденциальности",
  de: "POPOPX — Datenschutz-First intelligente Verbindungsplattform",
  fr: "POPOPX — Plateforme de connexion intelligente à confidentialité prioritaire",
  it: "POPOPX — Piattaforma di connessione intelligente con priorità alla privacy",
  nl: "POPOPX — Privacy-first intelligent verbindingsplatform",
  cs: "POPOPX — Platforma inteligentních spojení s prioritou soukromí",
  "zh-Hans": "POPOPX — 隐私优先的智能连接平台",
  "zh-Hant": "POPOPX — 隱私優先的智慧連接平台",
  es: "POPOPX — Plataforma de conexión inteligente con prioridad de privacidad",
  pl: "POPOPX — Platforma inteligentnych połączeń z priorytetem prywatności",
  ja: "POPOPX — プライバシー優先のインテリジェント接続プラットフォーム",
  th: "POPOPX — แพลตฟอร์มการเชื่อมต่ออัจฉริยะที่เน้นความเป็นส่วนตัว",
  fi: "POPOPX — Yksityisyyden ensisijainen älykäs yhteysalusta",
  uk: "POPOPX — Інтелектуальна платформа з’єднань з пріоритетом конфіденційності",
  bg: "POPOPX — Интелигентна платформа за връзки с приоритет на поверителността",
  tr: "POPOPX — Gizlilik öncelikli akıllı bağlantı platformu",
  hu: "POPOPX — Adatvédelem-first intelligens kapcsolódási platform",
};

/**
 * The indexed summary. It opens with the ecosystem mission — the same sentence the
 * Hero prints as its subtitle, written into both maps as literals because a derived
 * locale map is what `tools/check-i18n.mjs` rejects — and then keeps the clauses the
 * portal defends elsewhere: queue-based addressing and the encryption
 * (`docs/FACTS.md` §3, §4), zero tracking (`tools/scan-compliance.mjs` over `out/`),
 * the four official hosts (§11, §15) and the AGPL-3.0 licence (§11).
 */
export const SEO_DESCRIPTION: Localized<string> = {
  en: "POPOPX does not merely provide connection tools — it builds an open ecosystem where people, AI, agents, devices, and services connect securely and collaborate freely. The official portal: queue-based addressing, end-to-end encryption and zero tracking across four AGPL-3.0 open-source sites.",
  ru: "POPOPX не просто даёт инструменты соединения — он строит открытую экосистему, где люди, ИИ, агенты, устройства и сервисы связываются безопасно и сотрудничают свободно. Официальный портал: адресация на основе очередей, сквозное шифрование и ноль отслеживания — четыре сайта под AGPL-3.0.",
  de: "POPOPX stellt nicht bloß Verbindungs-Werkzeuge bereit, es baut ein offenes Ökosystem, in dem Menschen, KI, Agenten, Geräte und Dienste sich sicher verbinden und frei zusammenarbeiten. Das offizielle Portal: Queue-basierte Adressierung, Ende-zu-Ende-Verschlüsselung und null Tracking — vier Sites unter AGPL-3.0.",
  fr: "POPOPX ne fournit pas de simples outils de connexion : il construit un écosystème ouvert où les personnes, l’IA, les agents, les appareils et les services se relient en sécurité et collaborent librement. Le portail officiel : adressage par file, chiffrement de bout en bout et zéro suivi — quatre sites sous AGPL-3.0.",
  it: "POPOPX non fornisce soltanto strumenti di collegamento: costruisce un ecosistema aperto in cui persone, IA, agenti, dispositivi e servizi si collegano in sicurezza e collaborano liberamente. Il portale ufficiale: indirizzamento basato su code, crittografia end-to-end e zero tracciamento — quattro siti sotto AGPL-3.0.",
  nl: "POPOPX levert niet alleen verbindingsmogelijkheden — het bouwt een open ecosysteem waarin mensen, AI, agents, apparaten en diensten veilig verbinden en vrij samenwerken. Het officiële portal: op wachtrij gebaseerde adressering, end-to-end versleuteling en nul tracking — vier sites onder AGPL-3.0.",
  cs: "POPOPX nejen že poskytuje nástroje spojení — buduje otevřený ekosystém, kde se lidé, AI, agenti, zařízení a služby bezpečně spojují a svobodně spolupracují. Oficiální portál: adresace založená na frontách, end-to-end šifrování a nulové sledování — čtyři weby pod AGPL-3.0.",
  "zh-Hans": "POPOPX 不只是提供连接工具，而是建立一个让人、AI、Agent、设备和服务能够安全连接、自由协作的开放生态。 官方主站：基于队列的寻址、端到端加密、零追踪，四个官方站点全部以 AGPL-3.0 开源。",
  "zh-Hant": "POPOPX 不只是提供連線工具，而是建立一個讓人、AI、Agent、裝置與服務能夠安全連線、自由協作的開放生態。 官方入口網站：基於佇列的位址配置、端到端加密、零追蹤，四個官方網站全部以 AGPL-3.0 開放原始碼。",
  es: "POPOPX no solo ofrece herramientas de conexión: construye un ecosistema abierto donde personas, IA, agentes, dispositivos y servicios se conectan con seguridad y colaboran con libertad. El portal oficial: direccionamiento basado en colas, cifrado de extremo a extremo y cero rastreo — cuatro sitios bajo AGPL-3.0.",
  pl: "POPOPX nie tylko dostarcza narzędzia połączeń — buduje otwarty ekosystem, w którym ludzie, AI, agenci, urządzenia i usługi łączą się bezpiecznie i swobodnie współdziałają. Oficjalny portal: adresowanie oparte na kolejkach, szyfrowanie end-to-end i zerowe śledzenie — cztery witryny na AGPL-3.0.",
  ja: "POPOPX が提供するのは接続の道具だけではありません。人、AI、エージェント、デバイス、サービスが安全につながり、自由に協働できるオープンなエコシステムを築いています。 公式ポータルでは、キューベースのアドレッシング、エンドツーエンド暗号化、トラッキングゼロを、4 つの AGPL-3.0 サイトで裏づけています。",
  th: "POPOPX ไม่ได้มีแค่เครื่องมือเชื่อมต่อ แต่กำลังสร้างระบบนิเวศเปิดที่ผู้คน AI เอเจนต์ อุปกรณ์ และบริการต่างเชื่อมต่อกันอย่างปลอดภัยและทำงานร่วมกันได้อย่างอิสระ พอร์ทัลอย่างเป็นทางการ: การที่อยู่ตามคิว การเข้ารหัสปลายทางถึงปลายทาง และไม่มีการติดตาม — สี่เว็บไซต์ใต้ AGPL-3.0",
  fi: "POPOPX ei vain tarjoa yhteystyökaluja — se rakentaa avoimen ekosysteemin, jossa ihmiset, tekoäly, agentit, laitteet ja palvelut yhdistyvät turvallisesti ja tekevät vapaasti yhteistyötä. Virallinen portaali: jonoihin perustuva osoitus, päästä päähän -salaus ja nolla seurantaa — neljä AGPL-3.0-sivustoa.",
  uk: "POPOPX не просто надає засоби з’єднання — він будує відкриту екосистему, де люди, ШІ, агенти, пристрої й сервіси безпечно з’єднуються й вільно співпрацюють. Офіційний портал: адресація на основі черг, наскрізне шифрування й нульове відстеження — чотири сайти під AGPL-3.0.",
  bg: "POPOPX не просто предоставя средства за свързване — той изгражда отворена екосистема, в която хора, изкуствен интелект, агенти, устройства и услуги се свързват безопасно и си сътрудничат свободно. Официалният портал: адресиране на базата на опашки, криптиране от край до край и нулево проследяване — четири сайта под AGPL-3.0.",
  tr: "POPOPX yalnızca bağlantı araçları sunmaz; insanların, yapay zekânın, ajanların, cihazların ve hizmetlerin güvenle bağlanıp özgürce iş birliği yaptığı açık bir ekosistem kurar. Resmî portal: kuyruk tabanlı adresleme, uçtan uca şifreleme ve sıfır izleme — AGPL-3.0 ile açık kaynak dört site.",
  hu: "A POPOPX nem pusztán kapcsolati eszközöket biztosít, hanem nyílt ökoszisztémát épít, ahol emberek, mesterséges intelligenciák, ügynökök, eszközök és szolgáltatások biztonságosan kapcsolódnak és szabadon együttműködnek. A hivatalos portál: sor-alapú címzés, végponttól végpontig titkosítás és nulla követés — négy, AGPL-3.0 alatt nyílt oldal.",
};

const TITLE_SUFFIX = " · POPOPX";

export function pageMetadata({
  path,
  title,
  description,
  keywords,
}: {
  /** Route path with the trailing slash `next.config.mjs` requires. */
  path: string;
  /** Simplified Chinese heading, rendered as `<%- title %> · POPOPX`. */
  title: string;
  /** Simplified Chinese summary for search results and link unfurlers. */
  description: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_ORIGIN}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "POPOPX",
      locale: "zh_CN",
      title: `${title}${TITLE_SUFFIX}`,
      description,
      images: [
        {
          url: "/logo-popopx.png",
          width: 1024,
          height: 1024,
          alt: "POPOPX",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title}${TITLE_SUFFIX}`,
      description,
      images: ["/logo-popopx.png"],
    },
    ...(keywords ? { keywords } : {}),
  };
}
