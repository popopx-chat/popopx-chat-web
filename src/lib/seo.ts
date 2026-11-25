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
 * The positioning sentence, in the subject-predicate form the Hero prints as its
 * `<h1>`. `SEO_TITLE` below is the same sentence in the `POPOPX — <positioning>`
 * form the document head uses: both are literal 18-slot maps in this one module,
 * which is what keeps the first screen and the tab from drifting per language.
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
 * The indexed summary. It opens with the positioning sentence — POPOPX is not
 * just another instant messenger but a privacy-first intelligent connection
 * platform, the claim the Hero makes and `ComparisonMatrix` argues line by line —
 * and then keeps the clauses the portal already defends elsewhere: queue-based
 * addressing and the encryption (`docs/FACTS.md` §3, §4), zero tracking
 * (`tools/scan-compliance.mjs` over `out/`), the four official hosts (§11, §15)
 * and the AGPL-3.0 licence (§11).
 */
export const SEO_DESCRIPTION: Localized<string> = {
  en: "The official POPOPX portal: not just another instant messenger, but a privacy-first intelligent connection platform. Queue-based addressing, end-to-end encryption and zero tracking across four AGPL-3.0 open-source sites.",
  ru: "Официальный портал POPOPX: не просто обычный месенджер, а интеллектуальная платформа соединений с приоритетом конфиденциальности. Адресация на основе очередей, сквозное шифрование и ноль отслеживания — четыре сайта под AGPL-3.0.",
  de: "Das offizielle POPOPX-Portal: nicht nur ein üblicher Messenger, sondern eine datenschutzorientierte intelligente Verbindungsplattform. Queue-basierte Adressierung, Ende-zu-Ende-Verschlüsselung und null Tracking — vier Sites unter AGPL-3.0.",
  fr: "Le portail officiel POPOPX : bien plus qu’une messagerie instantanée, une plateforme de connexion intelligente à confidentialité prioritaire. Adressage par file, chiffrement de bout en bout et zéro suivi — quatre sites sous AGPL-3.0.",
  it: "Il portale ufficiale POPOPX: molto più di una comune messaggistica istantanea, una piattaforma di connessione intelligente con priorità alla privacy. Indirizzamento basato su code, crittografia end-to-end e zero tracciamento — quattro siti sotto AGPL-3.0.",
  nl: "Het officiële POPOPX-portal: meer dan een gewone instant messenger — een privacy-first intelligent verbindingsplatform. Op wachtrij gebaseerde adressering, end-to-end versleuteling en nul tracking — vier sites onder AGPL-3.0.",
  cs: "Oficiální portál POPOPX: nejen běžný messenger, ale platforma inteligentních spojení s prioritou soukromí. Adresace založená na frontách, end-to-end šifrování a nulové sledování — čtyři weby pod AGPL-3.0.",
  "zh-Hans": "POPOPX 官方主站：不只是传统的即时聊天工具，而是隐私优先的智能连接平台。基于队列的寻址、端到端加密、零追踪；iOS 客户端、Mac 节点、服务号套件与 Bot Studio 四个官方站点，全部以 AGPL-3.0 开源。",
  "zh-Hant": "POPOPX 官方入口網站：不只是傳統的即時聊天工具，而是隱私優先的智慧連接平台。基於佇列的位址配置、端到端加密、零追蹤；iOS 客戶端、Mac 節點、服務號套件與 Bot Studio 四個官方網站，全部以 AGPL-3.0 開放原始碼。",
  es: "El portal oficial de POPOPX: mucho más que un mensajero instantáneo común; una plataforma de conexión inteligente con prioridad de privacidad. Direccionamiento basado en colas, cifrado de extremo a extremo y cero rastreo — cuatro sitios bajo AGPL-3.0.",
  pl: "Oficjalny portal POPOPX: to nie zwykły komunikator, ale platforma inteligentnych połączeń z priorytetem prywatności. Adresowanie oparte na kolejkach, szyfrowanie end-to-end i zerowe śledzenie — cztery witryny na AGPL-3.0.",
  ja: "POPOPX の公式ポータル——ありふれたメッセンジャーではなく、プライバシー優先のインテリジェント接続プラットフォームです。キューベースのアドレッシング、エンドツーエンド暗号化、トラッキングゼロ。4 つのサイトをすべて AGPL-3.0 でソース公開。",
  th: "พอร์ทัลอย่างเป็นทางการของ POPOPX: ไม่ใช่แค่แอปแชททั่วไป แต่เป็นแพลตฟอร์มการเชื่อมต่ออัจฉริยะที่เน้นความเป็นส่วนตัว การที่อยู่ตามคิว การเข้ารหัสแบบ end-to-end และไม่มีการติดตาม — สี่เว็บไซต์ใต้ AGPL-3.0",
  fi: "POPOPX:n virallinen portaali: ei vain tavallinen pikaviestin, vaan yksityisyyden ensisijainen älykäs yhteysalusta. Jonoihin perustuva osoitus, päästä päähän -salaus ja nolla seurantaa — neljä AGPL-3.0-lisenssillä julkaistua sivustoa.",
  uk: "Офіційний портал POPOPX: не просто звичайний месенджер, а інтелектуальна платформа з’єднань з пріоритетом конфіденційності. Адресація на основі черг, наскрізне шифрування й нульове відстеження — чотири сайти під AGPL-3.0.",
  bg: "Официалният портал на POPOPX: не обикновен инстант месиджър, а интелигентна платформа за връзки с приоритет на поверителността. Адресиране на базата на опашки, криптиране от край до край и нулево проследяване — четири сайта под AGPL-3.0.",
  tr: "POPOPX resmî portalı: sıradan bir anlık mesajlaşma uygulaması değil, gizlilik öncelikli akıllı bağlantı platformu. Kuyruk tabanlı adresleme, uçtan uca şifreleme ve sıfır izleme — AGPL-3.0 ile açık kaynak dört site.",
  hu: "A hivatalos POPOPX portál: több mint egy hagyományos azonnali üzenetküldő — adatvédelem-first intelligens kapcsolódási platform. Sor-alapú címzés, végponttól végpontig titkosítás és nulla követés — négy, AGPL-3.0 alatt nyílt forráskódú oldal.",
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
