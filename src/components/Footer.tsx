"use client";

import type { ReactElement } from "react";
import { LOCALE_COUNT, LOCALES, pick, useCopy, useLocale, type Localized } from "@/lib/i18n";
import {
  ASSETS_LICENSE_URL,
  BOT_STUDIO_HOST,
  BOT_STUDIO_REPO_URL,
  BOT_STUDIO_URL,
  IOS_REPO_URL,
  LICENSE_URL,
  MP_PORTAL_HOST,
  MP_PORTAL_URL,
  NODE_PORTAL_HOST,
  NODE_PORTAL_URL,
  NODE_REPO_URL,
  SITE_HOST,
  SITE_URL,
  SUITE_REPO_URL,
  TRADEMARK_URL,
  WEB_REPO_URL,
} from "@/lib/site";

/**
 * Footer — the compliance block: open source, marks, the zero-tracking promise
 * and the four official hosts.
 *
 * Every sentence is traceable to `docs/FACTS.md` or to a file in this repo:
 *   §11  four official hosts, five repositories, `LICENSE` = the full AGPL-3.0
 *        text with no SPDX line, marks explicitly not registered, upstream's own
 *        images and marks not granted.
 *   §15  Bot Studio: the portal answers over HTTPS on its own name, while the
 *        engine repository it points back to publishes its `LICENSE` alone.
 *   §1   the 18 locale tags and their order = the client's `CFBundleLocalizations`.
 *   src/lib/i18n.tsx  the language choice is persisted to `localStorage` under
 *        `popopx.locale`; no cookie is written, and switching is a re-render —
 *        the copy ships inside the page, so nothing is fetched.
 *   src/app/globals.css + tailwind.config.ts  system font stack, no `@import`,
 *        no remote asset of any kind.
 *   tools/scan-compliance.mjs  the same claims re-checked against `out/`.
 *
 * Deliberately absent: anything about distribution. §12 of the ledger rules the
 * store question out of scope for the whole build, so the footer says nothing
 * about it either.
 */

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft/70";

/** Copyright year of this build; a footer line is not a clock. */
const BUILD_YEAR = 2026;

const TAGLINE: Localized<string> = {
  en: "The open-source licence, the trademark notice, the zero-tracking promise and the four official hosts — in one place.",
  ru: "Лицензия на исходный код, замечание о товарных знаках, обещание без отслеживания и четыре официальных сайта — в одном месте.",
  de: "Quellcode-Lizenz, Markenhinweis, Tracking-Versprechen und die vier offiziellen Hosts – an einem Ort.",
  fr: "La licence du code, la note sur les marques, la promesse zéro suivi et les quatre hôtes officiels — au même endroit.",
  it: "Licenza del codice, nota sui marchi, promessa senza tracciamento e i quattro host ufficiali: tutto qui.",
  nl: "De bronlicentie, de merknota, de belofte zonder tracking en de vier officiële hosts — op één plek.",
  cs: "Licence zdrojového kódu, oznámení o ochranných známkách, slib bez sledování a čtyři oficiální weby — na jednom místě.",
  "zh-Hans": "开源许可、商标声明、零追踪承诺与四个官方站点，都收在这里。",
  "zh-Hant": "開源授權、商標聲明、零追蹤承諾與四個官方網站，都收在這裡。",
  es: "La licencia del código, el aviso de marca, la promesa de cero rastreo y los cuatro sitios oficiales, en un solo lugar.",
  pl: "Licencja kodu, nota o znakach towarowych, obietnica bez śledzenia i cztery oficjalne witryny — w jednym miejscu.",
  ja: "ソースのライセンス、商標の告知、トラッキングゼロの約束、そして 4 つの公式サイトをひと所に。",
  th: "สัญญาอนุญาตของซอร์ส ประกาศเรื่องเครื่องหมายการค้า คำมั่นว่าจะไม่ติดตาม และสี่เว็บไซต์ทางการ — รวมไว้ที่เดียว",
  fi: "Lähdekoodin lisenssi, tavaramerkkitiedote, lupaus ei-seurannasta ja neljä virallista osoitetta — yhdessä paikassa.",
  uk: "Ліцензія на код, нотатка про торгові марки, обіцянка без відстеження й чотири офіційні сайти — в одному місці.",
  bg: "Лицензът за кода, бележката за марките, обещанието без проследяване и четирите официални сайта — на едно място.",
  tr: "Kaynak kod lisansı, marka uyarısı, izleme yok sözü ve dört resmî site — hepsi bir arada.",
  hu: "A forráslicenc, a védjegyértesítés, a követés nélküli ígéret és a négy hivatalos oldal — egy helyen.",
};

const H_ECOSYSTEM: Localized<string> = {
  en: "Four official hosts",
  ru: "Четыре официальных сайта",
  de: "Vier offizielle Hosts",
  fr: "Quatre hôtes officiels",
  it: "Quattro host ufficiali",
  nl: "Vier officiële hosts",
  cs: "Čtyři oficiální weby",
  "zh-Hans": "四个官方站点",
  "zh-Hant": "四個官方網站",
  es: "Cuatro sitios oficiales",
  pl: "Cztery oficjalne witryny",
  ja: "4 つの公式サイト",
  th: "สี่เว็บไซต์ทางการ",
  fi: "Neljä virallista osoitetta",
  uk: "Чотири офіційні сайти",
  bg: "Четири официални сайта",
  tr: "Dört resmî site",
  hu: "Négy hivatalos oldal",
};

const H_OPENSOURCE: Localized<string> = {
  en: "Open source",
  ru: "Открытый код",
  de: "Offener Quellcode",
  fr: "Sources ouvertes",
  it: "Codice aperto",
  nl: "Open broncode",
  cs: "Otevřený kód",
  "zh-Hans": "开源",
  "zh-Hant": "開源",
  es: "Código abierto",
  pl: "Otwarty kod",
  ja: "ソース公開",
  th: "โอเพนซอร์ส",
  fi: "Avoin lähde",
  uk: "Відкритий код",
  bg: "Отворен код",
  tr: "Açık kaynak",
  hu: "Nyílt forráskód",
};

const H_PRIVACY: Localized<string> = {
  en: "Zero tracking",
  ru: "Без отслеживания",
  de: "Kein Tracking",
  fr: "Zéro suivi",
  it: "Tracciamento zero",
  nl: "Geen tracking",
  cs: "Žádné sledování",
  "zh-Hans": "零追踪",
  "zh-Hant": "零追蹤",
  es: "Cero rastreo",
  pl: "Zero śledzenia",
  ja: "トラッキングゼロ",
  th: "ตามรอยเป็นศูนย์",
  fi: "Ei seurantaa",
  uk: "Відстеження: нуль",
  bg: "Без проследяване",
  tr: "Sıfır izleme",
  hu: "Követés nélkül",
};

const H_LEGAL: Localized<string> = {
  en: "Licence and marks",
  ru: "Лицензия и знаки",
  de: "Lizenz und Marken",
  fr: "Licence et marques",
  it: "Licenza e marchi",
  nl: "Licentie en merken",
  cs: "Licence a známky",
  "zh-Hans": "许可与商标",
  "zh-Hant": "授權與商標",
  es: "Licencia y marcas",
  pl: "Licencja i znaki",
  ja: "ライセンスと商標",
  th: "สัญญาอนุญาตและเครื่องหมาย",
  fi: "Lisenssi ja merkit",
  uk: "Ліцензія і марки",
  bg: "Лиценз и марки",
  tr: "Lisans ve markalar",
  hu: "Licenc és védjegyek",
};

const H_LANGUAGES: Localized<string> = {
  en: "Languages",
  ru: "Языки",
  de: "Sprachen",
  fr: "Langues",
  it: "Lingue",
  nl: "Talen",
  cs: "Jazyky",
  "zh-Hans": "语言",
  "zh-Hant": "語言",
  es: "Idiomas",
  pl: "Języki",
  ja: "言語",
  th: "ภาษา",
  fi: "Kielet",
  uk: "Мови",
  bg: "Езици",
  tr: "Diller",
  hu: "Nyelvek",
};

/** Reads after the number rendered from `LOCALE_COUNT`. */
const LANG_LEAD: Localized<string> = {
  en: "interface languages — the same tags and the same order as the client's CFBundleLocalizations.",
  ru: "языков интерфейса — те же коды и тот же порядок, что в CFBundleLocalizations клиента.",
  de: "Oberflächensprachen — dieselben Kürzel und dieselbe Reihenfolge wie CFBundleLocalizations des Clients.",
  fr: "langues d'interface — mêmes codes et même ordre que le CFBundleLocalizations du client.",
  it: "lingue dell'interfaccia — stessi tag e stesso ordine del CFBundleLocalizations del client.",
  nl: "interfacetalen — dezelfde codes en dezelfde volgorde als CFBundleLocalizations van de client.",
  cs: "jazyků rozhraní — stejné kódy a stejné pořadí jako CFBundleLocalizations klienta.",
  "zh-Hans": "界面语言——标签与顺序都和客户端的 CFBundleLocalizations 一致。",
  "zh-Hant": "介面語言——代碼與順序都和客戶端的 CFBundleLocalizations 一致。",
  es: "idiomas de interfaz: los mismos códigos y el mismo orden que CFBundleLocalizations del cliente.",
  pl: "języki interfejsu — te same kody i ta sama kolejność co CFBundleLocalizations klienta.",
  ja: "対応言語——クライアントの CFBundleLocalizations と同じタグ・同じ順序。",
  th: "ภาษาส่วนติดต่อผู้ใช้ — รหัสและลำดับเดียวกับ CFBundleLocalizations ของไคลเอนต์",
  fi: "kieltä — samat tunnisteet ja sama järjestys kuin asiakkaan CFBundleLocalizations.",
  uk: "мов інтерфейсу — ті самі коди й той самий порядок, що в CFBundleLocalizations клієнта.",
  bg: "езика на интерфейса — същите кодове и същата последователност като CFBundleLocalizations на клиента.",
  tr: "arayüz dili — istemcinin CFBundleLocalizations listesiyle aynı kodlar, aynı sıra.",
  hu: "felületi nyelv — ugyanazok a címkék és ugyanaz a sorrend, mint az ügyfél CFBundleLocalizations listáján.",
};

const BACK_TO_TOP: Localized<string> = {
  en: "Back to top",
  ru: "Наверх",
  de: "Zurück nach oben",
  fr: "Haut de page",
  it: "Torna in cima",
  nl: "Terug naar boven",
  cs: "Zpět nahoru",
  "zh-Hans": "回到顶部",
  "zh-Hant": "回到頂端",
  es: "Volver arriba",
  pl: "Wróć na górę",
  ja: "先頭へ戻る",
  th: "กลับขึ้นข้างบน",
  fi: "Takaisin ylös",
  uk: "Нагору",
  bg: "Нагоре",
  tr: "Başa dön",
  hu: "Vissza a tetejére",
};

const ECO_NOTE: Localized<string> = {
  en: "Exactly four domains are official. This page links to the other three and loads nothing from them.",
  ru: "Официальных доменов ровно четыре. Эта страница ссылается на три других и ничего у них не загружает.",
  de: "Genau vier Domains sind offiziell. Diese Seite verlinkt die drei anderen und lädt nichts von ihnen.",
  fr: "Exactement quatre domaines sont officiels. Cette page pointe vers les trois autres et ne charge rien chez eux.",
  it: "Esattamente quattro domini sono ufficiali. Questa pagina linka gli altri tre e non carica nulla da loro.",
  nl: "Precies vier domeinen zijn officieel. Deze pagina linkt de andere drie en laadt er niets van.",
  cs: "Oficální jsou přesně čtyři domény. Tato stránka odkazuje na další tři a nic z nich nenačítá.",
  "zh-Hans": "官方域名只有四个。本页链接另外三个，但不从它们加载任何资源。",
  "zh-Hant": "官方網域只有四個。本頁連結另外三個，但不從它們載入任何資源。",
  es: "Hay exactamente cuatro dominios oficiales. Esta página enlaza los otros tres y no carga nada de ellos.",
  pl: "Oficjalne są dokładnie cztery domeny. Ta strona linkuje trzy pozostałe i niczego od nich nie pobiera.",
  ja: "公式サイトはちょうど 4 つのドメインだけ。このページは残り 3 つへリンクするだけで、そこから何も読み込みません。",
  th: "มีโดเมนอย่างเป็นทางการพอดี 4 แห่ง — หน้านี้ลิงก์ไปอีกสามแห่ง โดยไม่โหลดสิ่งใดจากที่นั่น",
  fi: "Virallisia verkkotunnuksia on tasan neljä. Tämä sivu linkittää kolmeen muuhun eikä lataa niiltä mitään.",
  uk: "Офіційних доменів рівно чотири. Ця сторінка посилається на три інші й нічого в них не завантажує.",
  bg: "Точно четири домейна са официални. Тази страница сочи към другите три и не зарежда нищо от тях.",
  tr: "Resmî olarak tam dört alan adı var. Bu sayfa diğer üçüne link verir, onlardan hiçbir şey yüklemez.",
  hu: "Pontosan négy hivatalos domain van. Ez az oldal a másik háromra linkel, és tőlük semmit nem tölt be.",
};

const BLURB_MAIN: Localized<string> = {
  en: "This portal — the POPOPX iOS flagship client and the source behind it.",
  ru: "Этот портал: флагманский iOS-клиент POPOPX и его исходный код.",
  de: "Dieses Portal: der iOS-Flaggschiff-Client POPOPX und sein Quellcode.",
  fr: "Ce portail : le client iOS phare POPOPX et son code source.",
  it: "Questo portale: il client iOS di punta POPOPX e il suo sorgente.",
  nl: "Dit portal: de POPOPX iOS-vlaggenschip-client en zijn broncode.",
  cs: "Tento portál: vlajkový iOS klient POPOPX a jeho zdrojový kód.",
  "zh-Hans": "本站：POPOPX iOS 旗舰客户端，以及它背后的源码。",
  "zh-Hant": "本網站：POPOPX iOS 旗艦客戶端，以及它背後的原始碼。",
  es: "Este portal: el cliente insignia iOS de POPOPX y su código fuente.",
  pl: "Ten portal: flagowy klient iOS POPOPX i jego kod źródłowy.",
  ja: "このポータル——POPOPX の iOS フラグシップ・クライアントと、そのソースコード。",
  th: "พอร์ทัลนี้ — ไคลเอนต์เรือธง iOS ของ POPOPX พร้อมซอร์สที่อยู่เบื้องหลัง",
  fi: "Tämä portaali: POPOPX:n iOS-lippulaiva-asiakas ja sen lähdekoodi.",
  uk: "Цей портал: флагманський iOS-клієнт POPOPX і його вихідний код.",
  bg: "Този портал: флагманският iOS клиент POPOPX и кодът зад него.",
  tr: "Bu portal: POPOPX iOS amiral gemisi istemcisi ve arkasındaki kaynak.",
  hu: "Ez a portál: a POPOPX iOS zászlóshajó ügyfél és a háttere.",
};

const BLURB_NODE: Localized<string> = {
  en: "The Mac Node portal — the edge-services engine running beside the client.",
  ru: "Портал Mac Node — движок периферийных сервисов, работающий рядом с клиентом.",
  de: "Das Mac-Node-Portal — die Edge-Services-Engine neben dem Client.",
  fr: "Le portail Mac Node — le moteur de services en bordure, à côté du client.",
  it: "Il portale Mac Node — il motore di servizi edge accanto al client.",
  nl: "Het Mac Node-portal — de edge-services-engine naast de client.",
  cs: "Portál Mac Node — edgeový servisní engine běžící po boku klienta.",
  "zh-Hans": "Mac Node 门户：与客户端并行运行的边缘服务引擎。",
  "zh-Hant": "Mac Node 入口網站：與客戶端並行執行的邊緣服務引擎。",
  es: "El portal de Mac Node — el motor de servicios de borde que corre junto al cliente.",
  pl: "Portal Mac Node — silnik usług brzegowych działający obok klienta.",
  ja: "Mac Node のポータル——クライアントと並走するエッジサービスエンジン。",
  th: "พอร์ทัล Mac Node — ขุมพลังบริการขอบที่รันคู่ไปกับไคลเอนต์",
  fi: "Mac Node -portaali — reunapalvelumoottori, joka käy asiakkaan rinnalla.",
  uk: "Портал Mac Node — рушій крайових сервісів, що працює поруч із клієнтом.",
  bg: "Порталът Mac Node — ръбовият сервисен двигател, работещ до клиента.",
  tr: "Mac Node portalı — istemcinin yanında çalışan uç hizmetler motoru.",
  hu: "A Mac Node portál — az ügyfél mellett futó szélszolgáltatás-motor.",
};

const BLURB_MP: Localized<string> = {
  en: "The service-suite portal — service accounts and zero-knowledge channels, on your own server.",
  ru: "Портал набора сервисов — сервисные аккаунты и каналы с нулевым знанием на вашем сервере.",
  de: "Das Suite-Portal — Dienstkonten und Zero-Knowledge-Kanäle auf dem eigenen Server.",
  fr: "Le portail de la suite — comptes de service et canaux zero-knowledge, sur votre serveur.",
  it: "Il portale della suite — account di servizio e canali a conoscenza zero, sul vostro server.",
  nl: "Het suite-portal — dienstaccounts en zero-knowledge-kanalen, op je eigen server.",
  cs: "Portál sady — servisní účty a kanály s nulovou znalostí na vašem serveru.",
  "zh-Hans": "服务号套件门户：服务号与零知识频道，跑在你自己的服务器上。",
  "zh-Hant": "服務號套件入口網站：服務號與零知識頻道，跑在你自己的伺服器上。",
  es: "El portal de la suite — cuentas de servicio y canales de conocimiento cero, en tu servidor.",
  pl: "Portal pakietu — konta serwisowe i kanały o zerowej wiedzy na własnym serwerze.",
  ja: "サービススイートのポータル——サービスアカウントとゼロ知識チャンネルを自分のサーバーで。",
  th: "พอร์ทัลชุดบริการ — บัญชีบริการและแชนเนลศูนย์ความรู้ บนเซิร์ฟเวอร์ของคุณเอง",
  fi: "Service Suiten portaali — palvelutilit ja nollatiedon kanavat omalla palvelimellasi.",
  uk: "Портал набору сервісів — сервісні акаунти й канали з нульовим знанням на вашому сервері.",
  bg: "Порталът на пакета — сервисни акаунти и канали с нулево знание на собствения ви сървър.",
  tr: "Suite portalı — kendi sunucunuzda hizmet hesapları ve sıfır bilgi kanalları.",
  hu: "A csomag portálja — szolgáltatási fiókok és nullaismeret-csatornák a saját szervereden.",
};

const BLURB_STUDIO: Localized<string> = {
  en: "The Bot Studio portal — the bot workbench you run on your own server.",
  ru: "Портал Bot Studio — мастерская ботов, работающая на вашем собственном сервере.",
  de: "Das Portal von Bot Studio — die Werkbank für Bots, die auf dem eigenen Server läuft.",
  fr: "Le portail Bot Studio — un atelier de bots que vous faites tourner sur votre propre serveur.",
  it: "Il portale Bot Studio — il banco da lavoro per i bot, in esecuzione sul vostro server.",
  nl: "Het portal van Bot Studio — de werkbank voor bots die je op je eigen server draait.",
  cs: "Portál Bot Studio — dílna pro boty, kterou provozujete na vlastním serveru.",
  "zh-Hans": "Bot Studio 门户：在自己服务器上跑的机器人工作台。",
  "zh-Hant": "Bot Studio 入口網站：在自己伺服器上跑的機器人工作台。",
  es: "El portal de Bot Studio — el banco de trabajo de bots que ejecutas en tu propio servidor.",
  pl: "Portal Bot Studio — warsztat botów, który uruchamiasz na własnym serwerze.",
  ja: "Bot Studio のポータル——自分のサーバーで動かすボットのワークベンチ。",
  th: "พอร์ทัล Bot Studio — โต๊ะทำงานบอตที่คุณรันบนเซิร์ฟเวอร์ของตัวเอง",
  fi: "Bot Studio -portaali — bottien työpöytä, jonka ajat omalla palvelimellasi.",
  uk: "Портал Bot Studio — майстерня ботів, що працює на вашому власному сервері.",
  bg: "Порталът Bot Studio — работилницата за ботове, която пускате на собствения ви сървър.",
  tr: "Bot Studio portalı — kendi sunucunuzda çalıştırdığınız bot tezgâhı.",
  hu: "A Bot Studio portál — a botműhely, amelyet a saját szervereden futtatsz.",
};

const L_LICENSE: Localized<string> = {
  en: "AGPL-3.0 licence text",
  ru: "Текст лицензии AGPL-3.0",
  de: "AGPL-3.0-Lizenztext",
  fr: "Texte de la licence AGPL-3.0",
  it: "Testo della licenza AGPL-3.0",
  nl: "AGPL-3.0-licentietekst",
  cs: "Text licence AGPL-3.0",
  "zh-Hans": "AGPL-3.0 许可证全文",
  "zh-Hant": "AGPL-3.0 授權條款全文",
  es: "Texto de la licencia AGPL-3.0",
  pl: "Treść licencji AGPL-3.0",
  ja: "AGPL-3.0 ライセンス文",
  th: "ข้อความสัญญาอนุญาต AGPL-3.0",
  fi: "AGPL-3.0-lisenssin teksti",
  uk: "Текст ліцензії AGPL-3.0",
  bg: "Текст на лиценза AGPL-3.0",
  tr: "AGPL-3.0 lisans metni",
  hu: "Az AGPL-3.0 licenc szövege",
};

const L_TRADEMARK: Localized<string> = {
  en: "POPOPX trademark policy",
  ru: "Политика товарных знаков POPOPX",
  de: "Markenrichtlinie für POPOPX",
  fr: "Politique de marque POPOPX",
  it: "Informativa sui marchi POPOPX",
  nl: "Merkbeleid van POPOPX",
  cs: "Zásady ochranných známek POPOPX",
  "zh-Hans": "POPOPX 商标政策",
  "zh-Hant": "POPOPX 商標政策",
  es: "Política de marcas de POPOPX",
  pl: "Polityka znaków towarowych POPOPX",
  ja: "POPOPX の商標ポリシー",
  th: "นโยบายเครื่องหมายการค้าของ POPOPX",
  fi: "POPOPX:n tavaramerkkikäytännöt",
  uk: "Політика торгових марок POPOPX",
  bg: "Политика на марките на POPOPX",
  tr: "POPOPX marka politikası",
  hu: "POPOPX védjegy-szabályzat",
};

const L_ASSETS: Localized<string> = {
  en: "Asset licence",
  ru: "Лицензия на материалы",
  de: "Lizenz für Assets",
  fr: "Licence des ressources",
  it: "Licenza degli asset",
  nl: "Licentie van middelen",
  cs: "Licence materiálů",
  "zh-Hans": "素材许可",
  "zh-Hant": "素材授權",
  es: "Licencia de los recursos",
  pl: "Licencja zasobów",
  ja: "アセットのライセンス",
  th: "สัญญาอนุญาตของทรัพยากร",
  fi: "Aineistojen lisenssi",
  uk: "Ліцензія на матеріали",
  bg: "Лиценз за ресурсите",
  tr: "Varlık lisansı",
  hu: "Az eszközek licence",
};

const R_CLIENT: Localized<string> = {
  en: "iOS client — source",
  ru: "Клиент iOS — исходники",
  de: "iOS-Client — Quellcode",
  fr: "Client iOS — source",
  it: "Client iOS — sorgente",
  nl: "iOS-client — broncode",
  cs: "iOS klient — zdroj",
  "zh-Hans": "iOS 客户端源码",
  "zh-Hant": "iOS 客戶端原始碼",
  es: "Cliente iOS — código",
  pl: "Klient iOS — kod",
  ja: "iOS クライアント——ソース",
  th: "ไคลเอนต์ iOS — ซอร์ส",
  fi: "iOS-asiakas — lähde",
  uk: "Клієнт iOS — код",
  bg: "iOS клиент — код",
  tr: "iOS istemcisi — kaynak",
  hu: "iOS ügyfél — forrás",
};

const R_WEB: Localized<string> = {
  en: "This portal — source",
  ru: "Этот портал — исходники",
  de: "Dieses Portal — Quellcode",
  fr: "Ce portail — source",
  it: "Questo portale — sorgente",
  nl: "Dit portal — broncode",
  cs: "Tento portál — zdroj",
  "zh-Hans": "本站门户源码",
  "zh-Hant": "本站入口網站原始碼",
  es: "Este portal — código",
  pl: "Ten portal — kod",
  ja: "このポータル——ソース",
  th: "พอร์ทัลนี้ — ซอร์ส",
  fi: "Tämä portaali — lähde",
  uk: "Цей портал — код",
  bg: "Този портал — код",
  tr: "Bu portal — kaynak",
  hu: "Ez a portál — forrás",
};

const R_SUITE: Localized<string> = {
  en: "Service suite — source",
  ru: "Набор сервисов — исходники",
  de: "Dienst-Suite — Quellcode",
  fr: "Suite de services — source",
  it: "Suite di servizi — sorgente",
  nl: "Dienstsuite — broncode",
  cs: "Sada služeb — zdroj",
  "zh-Hans": "服务号套件源码",
  "zh-Hant": "服務號套件原始碼",
  es: "Suite de servicios — código",
  pl: "Pakiet serwisowy — kod",
  ja: "サービススイート——ソース",
  th: "ชุดบริการ — ซอร์ส",
  fi: "Palvelupaketti — lähde",
  uk: "Набір сервісів — код",
  bg: "Пакет от услуги — код",
  tr: "Hizmet paketi — kaynak",
  hu: "Szolgáltatási csomag — forrás",
};

const R_NODE: Localized<string> = {
  en: "Mac Node — source",
  ru: "Mac Node — исходники",
  de: "Mac Node — Quellcode",
  fr: "Mac Node — code source",
  it: "Mac Node — sorgente",
  nl: "Mac Node — broncode",
  cs: "Mac Node — zdroj",
  "zh-Hans": "Mac Node 源码",
  "zh-Hant": "Mac Node 原始碼",
  es: "Mac Node — código",
  pl: "Mac Node — kod",
  ja: "Mac Node——ソース",
  th: "Mac Node — ซอร์ส",
  fi: "Mac Node — lähde",
  uk: "Mac Node — код",
  bg: "Mac Node — код",
  tr: "Mac Node — kaynak",
  hu: "Mac Node — forrás",
};

const R_STUDIO: Localized<string> = {
  en: "Bot Studio — source",
  ru: "Bot Studio — исходники",
  de: "Bot Studio — Quellcode",
  fr: "Bot Studio — code source",
  it: "Bot Studio — sorgente",
  nl: "Bot Studio — broncode",
  cs: "Bot Studio — zdroj",
  "zh-Hans": "Bot Studio 源码",
  "zh-Hant": "Bot Studio 原始碼",
  es: "Bot Studio — código",
  pl: "Bot Studio — kod",
  ja: "Bot Studio——ソース",
  th: "Bot Studio — ซอร์ส",
  fi: "Bot Studio — lähde",
  uk: "Bot Studio — код",
  bg: "Bot Studio — код",
  tr: "Bot Studio — kaynak",
  hu: "Bot Studio — forrás",
};

const P_COOKIE: Localized<string> = {
  en: "No cookie is ever set. The language you choose is written to localStorage under the key popopx.locale and nowhere else.",
  ru: "Ни один cookie не устанавливается. Выбранный язык записывается в localStorage под ключом popopx.locale и больше никуда.",
  de: "Es wird nie ein Cookie gesetzt. Die gewählte Sprache steht in localStorage unter dem Schlüssel popopx.locale und sonst nirgends.",
  fr: "Aucun cookie n'est jamais déposé. La langue choisie est écrite dans localStorage sous la clé popopx.locale et nulle part ailleurs.",
  it: "Nessun cookie viene mai impostato. La lingua scelta è scritta in localStorage con la chiave popopx.locale e da nessun'altra parte.",
  nl: "Er wordt nooit een cookie geplaatst. De gekozen taal gaat alleen naar localStorage onder de sleutel popopx.locale.",
  cs: "Nenastavuje se žádný cookie. Volba jazyka se zapisuje do localStorage pod klíčem popopx.locale a nikam dál.",
  "zh-Hans": "从不写入 Cookie。你选的语言只存在 localStorage 的 popopx.locale 键里，别处没有。",
  "zh-Hant": "從不寫入 Cookie。你選的語言只存在 localStorage 的 popopx.locale 索引鍵裡，別無其他。",
  es: "Nunca se establece ninguna cookie. El idioma elegido se escribe en localStorage con la clave popopx.locale y en ningún otro sitio.",
  pl: "Nie ustawiamy żadnych plików cookie. Wybrany język trafia wyłącznie do localStorage, pod klucz popopx.locale.",
  ja: "Cookie は一切設定されません。選んだ言語は localStorage の popopx.locale キーにだけ保存されます。",
  th: "ไม่มีการตั้งคุกกี้ใด ๆ ภาษาที่คุณเลือกถูกเขียนลง localStorage ใต้คีย์ popopx.locale เท่านั้น",
  fi: "Evästeitä ei koskaan aseteta. Valittu kieli tallennetaan ainoastaan localStorageen avaimella popopx.locale.",
  uk: "Жодних cookie не встановлюється. Обрану мову записуємо лише в localStorage під ключем popopx.locale.",
  bg: "Никога не се поставя бисквитка. Избраният език се записва единствено в localStorage под ключ popopx.locale.",
  tr: "Hiçbir çerez ayarlanmaz. Seçtiğiniz dil yalnızca popopx.locale anahtarıyla localStorage'a yazılır.",
  hu: "Sütiket soha nem helyezünk el. A választott nyelv csak a localStorage popopx.locale kulcsába kerül.",
};

const P_ANALYTICS: Localized<string> = {
  en: "No third-party analytics, pixel or tracking script ships with this page.",
  ru: "Страница не поставляется ни со сторонней аналитикой, ни с пикселем, ни со скриптом отслеживания.",
  de: "Diese Seite enthält keine Analytics-, Pixel- oder Tracking-Skripte Dritter.",
  fr: "Cette page n'embarque aucun script tiers d'analyse, de pixel ou de suivi.",
  it: "Questa pagina non contiene script di terze parti per analytics, pixel o tracciamento.",
  nl: "Deze pagina bevat geen analytics-, pixel- of trackingscripts van derden.",
  cs: "Tato stránka neobsahuje žádné analytické, pixelové ani sledovací skripty třetích stran.",
  "zh-Hans": "页面里没有任何第三方统计、像素或追踪脚本。",
  "zh-Hant": "頁面裡沒有任何第三方統計、像素或追蹤腳本。",
  es: "Esta página no incluye ningún script de analítica, píxel o rastreo de terceros.",
  pl: "Ta strona nie zawiera skryptów analitycznych, pikseli ani skryptów śledzących stron trzecich.",
  ja: "このページに、第三者の解析・ピクセル・トラッカースクリプトは一切含まれません。",
  th: "หน้านี้ไม่มีสคริปต์วิเคราะห์ ภาพจุด หรือสคริปต์ติดตามของบุคคลที่สามใด ๆ",
  fi: "Tällä sivulla ei ole kolmannen osapuolen analytiikka-, pikseli- tai seurantalaskentaa.",
  uk: "Ця сторінка не постачається ні з аналітикою, ні з пікселем, ні зі скриптом відстеження від третіх осіб.",
  bg: "Страницата не носи никаква аналитика, пиксел или проследяващ скрипт на трета страна.",
  tr: "Bu sayfada üçüncü taraf analitik, piksel veya izleme betiği bulunmaz.",
  hu: "Ez az oldal nem tartalmaz harmadik féltől származó elemzési, pixel vagy követő szkriptet.",
};

const P_CDN: Localized<string> = {
  en: "No external CDN: the font stack, the images and every script come from this origin.",
  ru: "Ни одного внешнего CDN: шрифты, изображения и скрипты берутся с этого же адреса.",
  de: "Kein externes CDN: Schriften, Bilder und Skripte kommen von dieser Origin.",
  fr: "Aucun CDN externe : polices, images et scripts proviennent de cette origine.",
  it: "Nessun CDN esterno: font, immagini e script arrivano da questa origine.",
  nl: "Geen extern CDN: fonts, afbeeldingen en scripts komen van deze origin.",
  cs: "Žádné externí CDN: písma, obrázky i skripty pocházejí z této domény.",
  "zh-Hans": "没有外部 CDN：字体、图片和所有脚本都来自本站同源。",
  "zh-Hant": "沒有外部 CDN：字型、圖片和所有腳本都來自本站同源。",
  es: "Sin CDN externo: las tipografías, las imágenes y todos los scripts vienen de este origen.",
  pl: "Żadnego zewnętrznego CDN: czcionki, obrazy i skrypty pochodzą z tej samej domeny.",
  ja: "外部 CDN なし——フォント、画像、スクリプトはすべて同一オリジンから。",
  th: "ไม่มี CDN ภายนอก: ฟอนต์ รูปภาพ และสคริปต์ทั้งหมดมาจากต้นทางเดียวกัน",
  fi: "Ei ulkoista CDN:ää: fontit, kuvat ja skriptit tulevat samalta sivustolta.",
  uk: "Жодного зовнішнього CDN: шрифти, зображення й скрипти беруться з того самого походження.",
  bg: "Без външно CDN: шрифтовете, изображенията и скриптовете идват от един и същи произход.",
  tr: "Harici CDN yok: yazı tipleri, görseller ve tüm betikler aynı kaynaktan geliyor.",
  hu: "Nincs külső CDN: a betűtípusok, képek és szkriptek mind ebből az originből érkeznek.",
};

/** The code itself lives in the download section; the promise names that honestly. */
const P_QR: Localized<string> = {
  en: "The QR code in the download section is drawn as inline SVG inside your own browser — no QR service, no image request.",
  ru: "QR-код в разделе загрузки рисуется внутри вашего браузера как инлайн SVG: ни QR-сервиса, ни запроса картинки.",
  de: "Der QR-Code im Download-Bereich wird im Browser als Inline-SVG gezeichnet — kein QR-Dienst, keine Bildanfrage.",
  fr: "Le QR code de la section téléchargement est dessiné dans votre navigateur en SVG en ligne — pas de service QR, pas de requête d'image.",
  it: "Il QR code nella sezione download è disegnato nel vostro browser come SVG inline: nessun servizio QR, nessuna richiesta di immagine.",
  nl: "De QR-code in de downloadsectie wordt in je browser als inline-svg getekend — geen QR-dienst, geen imagerequest.",
  cs: "QR kód v sekci stahování se kreslí ve vašem prohlížeči jako inline SVG — žádná QR služba, žádný požadavek na obrázek.",
  "zh-Hans": "下载区的 QR 码在你自己的浏览器里绘制为内联 SVG：没有 QR 服务，也没有图片请求。",
  "zh-Hant": "下載區的 QR 碼在你自己的瀏覽器內繪製為內嵌 SVG：沒有 QR 服務，也沒有圖片請求。",
  es: "El código QR de la sección de descarga se dibuja en tu navegador como SVG en línea: sin servicios QR y sin peticiones de imagen.",
  pl: "Kod QR w sekcji pobierania jest rysowany w Twojej przeglądarce jako inline SVG — bez usługi QR i bez żądania obrazu.",
  ja: "ダウンロード欄の QR コードはブラウザー内でインライン SVG として描画されます——QR サービスも画像リクエストもなし。",
  th: "QR โค้ดในส่วนดาวน์โหลดถูกวาดเป็น SVG ในเบราว์เซอร์ของคุณเอง — ไม่มีบริการ QR ไม่มีคำขอรูปภาพ",
  fi: "Latausosan QR-koodi piirretään selaimessa inline-SVG:nä — ei QR-palvelua, ei kuvapyyntöä.",
  uk: "QR-код у розділі завантаження малюється у вашому браузері як інлайн-SVG: ні QR-сервісу, ні запиту зображення.",
  bg: "QR кодът в секцията за изтегляне се рисуе във вашия браузър като inline SVG — без QR услуга, без заявка за изображение.",
  tr: "İndirme bölümündeki QR kodu tarayıcınızın içinde satır içi SVG olarak çizilir — QR servisi yok, görüntü isteği yok.",
  hu: "A letöltési szekció QR-kódja a böngésződben rajzolódik inline SVG-ként — nincs QR-szolgáltatás, nincs kép-kérés.",
};

const P_SWITCH: Localized<string> = {
  en: "Switching language sends no request: every language is already inside the page.",
  ru: "Переключение языка не отправляет запросов: все языки уже внутри страницы.",
  de: "Der Sprachwechsel schickt keine Anfrage: Alle Sprachen stecken bereits in der Seite.",
  fr: "Changer de langue n'envoie aucune requête : toutes les langues sont déjà dans la page.",
  it: "Cambiare lingua non invia richieste: tutte le lingue sono già nella pagina.",
  nl: "Taal wisselen stuurt geen request: alle talen zitten al in de pagina.",
  cs: "Přepnutí jazyka neodesílá žádný požadavek: všechny jazyky jsou už v stránce.",
  "zh-Hans": "切换语言不会发出任何请求：所有语言本来就在页面里。",
  "zh-Hant": "切換語言不會發出任何請求：所有語言本來就在頁面裡。",
  es: "Cambiar de idioma no envía ninguna petición: todos los idiomas ya están en la página.",
  pl: "Zmiana języka nie wysyła żadnego żądania: wszystkie języki są już na stronie.",
  ja: "言語の切り替えはリクエストを送りません——すべての言語はすでにページ内にあります。",
  th: "การเปลี่ยนภาษาไม่ส่งคำขอใด ๆ — ทุกภาษาอยู่ในหน้าเรียบร้อยแล้ว",
  fi: "Kielen vaihto ei lähetä pyyntöjä: kaikki kielet ovat jo sivun sisällä.",
  uk: "Перемикання мови не надсилає жодного запиту: всі мови вже всередині сторінки.",
  bg: "Смяната на език не изпраща заявки: всички езици вече са в страницата.",
  tr: "Dil değiştirmek hiçbir istek göndermez: bütün diller zaten sayfanın içinde.",
  hu: "A nyelvváltás nem küld kérést: minden nyelv már az oldalban van.",
};

const P_SCAN: Localized<string> = {
  en: "The build gate runs tools/scan-compliance.mjs over the shipped out/ files and fails on any tracker, off-origin asset, leaked local path or forbidden word.",
  ru: "Сборочный барьер прогоняет tools/scan-compliance.mjs по файлам в out/ и падает на любом трекере, внешнем ресурсе, локальном пути или запрещённом слове.",
  de: "Das Gate lässt tools/scan-compliance.mjs über die ausgelieferten out/-Dateien laufen und scheitert an jedem Tracker, Fremd-Asset, lokalen Pfad oder verbotenen Wort.",
  fr: "Le portique exécute tools/scan-compliance.mjs sur les fichiers livrés de out/ et échoue au moindre traceur, ressource externe, chemin local ou mot interdit.",
  it: "Il gate esegue tools/scan-compliance.mjs sui file di out/ pubblicati e fallisce per qualsiasi tracker, risorsa esterna, percorso locale o parola vietata.",
  nl: "De gate draait tools/scan-compliance.mjs over de meegeleverde bestanden in out/ en faalt op elke tracker, extern asset, lokaal pad of verboden woord.",
  cs: "Brána pouští tools/scan-compliance.mjs na soubory v out/ a selže na jakémkoli trackeru, cizím zdroji, lokální cestě či zakázaném slově.",
  "zh-Hans": "门禁会用 tools/scan-compliance.mjs 扫描 out/ 里出厂的文件，遇到任何追踪器、外部资源、本地路径或禁词都会失败。",
  "zh-Hant": "門禁會用 tools/scan-compliance.mjs 掃描 out/ 裡出廠的檔案，遇到任何追蹤器、外部資源、本地路徑或禁詞都會失敗。",
  es: "El filtro ejecuta tools/scan-compliance.mjs sobre los archivos publicados en out/ y falla ante cualquier rastreador, recurso externo, ruta local o palabra prohibida.",
  pl: "Bramka jakości uruchamia tools/scan-compliance.mjs na plikach z out/ i kończy się błędem przy każdym trackerze, zewnętrznym zasobie, lokalnej ścieżce czy zakazanym słowie.",
  ja: "ゲートは tools/scan-compliance.mjs が出荷済みの out/ ファイルを走査し、トラッカー・外部アセット・ローカルパス・禁語が 1 つでもあれば失敗します。",
  th: "ประตูคุณภาพรัน tools/scan-compliance.mjs ทับไฟล์ใน out/ ที่ส่งออกจริง และล้มทันทีถ้ามีทรา็กเกอร์ ทรัพยากรนอก พาธท้องถิ่น หรือคำต้องห้าม",
  fi: "Laadunvarmistus ajaa tools/scan-compliance.mjs:n toimitettujen out/-tiedostojen yli ja hylkää minkä tahansa seurannan, ulkopuolisen resurssin, paikallisen polun tai kielletyn sanan.",
  uk: "Ворота проганяють tools/scan-compliance.mjs по файлах в out/ і падають на будь-якому трекері, зовнішньому ресурсі, локальному шляху чи забороненому слові.",
  bg: "Портите пускат tools/scan-compliance.mjs върху доставените файлове в out/ и се провалят при какъвто и да е тракер, външен ресурс, локален път или забранена дума.",
  tr: "Kapı, tools/scan-compliance.mjs'i yayındaki out/ dosyaları üzerinde çalıştırır; herhangi bir izleyici, kaynak-dışı öğe, yerel yol veya yasaklı sözde başarısız olur.",
  hu: "A kapu lefuttatja a tools/scan-compliance.mjs eszközt a kiadott out/ fájlokon, és elbukik bármilyen tracker, idegen erőforrás, helyi útvonal vagy tiltott szó esetén.",
};

const LICENSED_AGPL: Localized<string> = {
  en: "Code released under AGPL-3.0-only.",
  ru: "Код опубликован под AGPL-3.0-only.",
  de: "Veröffentlichter Quellcode: AGPL-3.0-only.",
  fr: "Code publié sous licence AGPL-3.0-only.",
  it: "Codice rilasciato con licenza AGPL-3.0-only.",
  nl: "Code uitgebracht onder AGPL-3.0-only.",
  cs: "Kód vydán pod AGPL-3.0-only.",
  "zh-Hans": "代码以 AGPL-3.0-only 发布。",
  "zh-Hant": "程式碼以 AGPL-3.0-only 發布。",
  es: "Código publicado bajo AGPL-3.0-only.",
  pl: "Kod wydany na licencji AGPL-3.0-only.",
  ja: "コードは AGPL-3.0-only で公開されています。",
  th: "เผยแพร่ซอร์สใต้สัญญาอนุญาต AGPL-3.0-only",
  fi: "Koodi julkaistu AGPL-3.0-only -lisenssillä.",
  uk: "Код випущено під AGPL-3.0-only.",
  bg: "Кодът е публикуван под AGPL-3.0-only.",
  tr: "Kod AGPL-3.0-only ile yayımlandı.",
  hu: "A kód AGPL-3.0-only licenccel jelent meg.",
};

const NOTE_SPDX: Localized<string> = {
  en: "In the client repository, LICENSE is the full AGPL-3.0 text and contains no SPDX line.",
  ru: "В репозитории клиента LICENSE — это полный текст AGPL-3.0 без строки SPDX.",
  de: "Im Client-Repository ist LICENSE der vollständige AGPL-3.0-Text und enthält keine SPDX-Zeile.",
  fr: "Dans le dépôt du client, LICENSE est le texte intégral de l'AGPL-3.0 et ne contient aucune ligne SPDX.",
  it: "Nel repository del client, LICENSE è il testo integrale AGPL-3.0 e non contiene righe SPDX.",
  nl: "In de client-repo is LICENSE de volledige AGPL-3.0-tekst en bevat het geen SPDX-regel.",
  cs: "V repozitáři klienta je LICENSE úplný text AGPL-3.0 a neobsahuje řádek SPDX.",
  "zh-Hans": "客户端仓库里的 LICENSE 就是 AGPL-3.0 全文，文件内没有 SPDX 行。",
  "zh-Hant": "客戶端倉庫裡的 LICENSE 就是 AGPL-3.0 全文，檔案內沒有 SPDX 行。",
  es: "En el repositorio del cliente, LICENSE es el texto completo de AGPL-3.0 y no contiene ninguna línea SPDX.",
  pl: "W repozytorium klienta LICENSE to pełny tekst AGPL-3.0 bez linii SPDX.",
  ja: "クライアントのリポジトリの LICENSE は AGPL-3.0 の全文で、SPDX 行を含みません。",
  th: "ในซอร์สของไคลเอนต์ ไฟล์ LICENSE คือข้อความ AGPL-3.0 เต็มฉบับ และไม่มีบรรทัด SPDX",
  fi: "Asiakkaan repositoriossa LICENSE on AGPL-3.0:n täydellinen teksti, eikä siinä ole SPDX-riviä.",
  uk: "У репозиторії клієнта LICENSE — це повний текст AGPL-3.0 без рядка SPDX.",
  bg: "В хранилището на клиента LICENSE е пълният текст на AGPL-3.0 и няма ред на SPDX.",
  tr: "İstemci deposunda LICENSE, AGPL-3.0'un tam metnidir ve hiçbir SPDX satırı içermez.",
  hu: "Az ügyfél tárolójában a LICENSE az AGPL-3.0 teljes szövege, és nem tartalmaz SPDX-sort.",
};

const NOTE_TRADEMARK: Localized<string> = {
  en: "TRADEMARK-POPOPX.md states that the POPOPX marks are not registered.",
  ru: "В TRADEMARK-POPOPX.md сказано, что знаки POPOPX не зарегистрированы.",
  de: "TRADEMARK-POPOPX.md hält fest, dass die POPOPX-Marken nicht eingetragen sind.",
  fr: "TRADEMARK-POPOPX.md indique que les marques POPOPX ne sont pas déposées.",
  it: "TRADEMARK-POPOPX.md afferma che i marchi POPOPX non sono registrati.",
  nl: "TRADEMARK-POPOPX.md stelt dat de POPOPX-merken niet geregistreerd zijn.",
  cs: "TRADEMARK-POPOPX.md uvádí, že ochranné známky POPOPX nejsou zapsány.",
  "zh-Hans": "TRADEMARK-POPOPX.md 明确写着：POPOPX 商标尚未注册。",
  "zh-Hant": "TRADEMARK-POPOPX.md 明確寫著：POPOPX 商標尚未註冊。",
  es: "TRADEMARK-POPOPX.md establece que las marcas POPOPX no están registradas.",
  pl: "TRADEMARK-POPOPX.md stwierdza, że znaki POPOPX nie są zarejestrowane.",
  ja: "TRADEMARK-POPOPX.md には POPOPX の商標は未登録だと書かれています。",
  th: "TRADEMARK-POPOPX.md ระบุว่าเครื่องหมาย POPOPX ยังไม่ได้จดทะเบียน",
  fi: "TRADEMARK-POPOPX.md toteaa, että POPOPX-tavaramerkit eivät ole rekisteröityjä.",
  uk: "У TRADEMARK-POPOPX.md зазначено, що торгові марки POPOPX не зареєстровані.",
  bg: "В TRADEMARK-POPOPX.md се казва, че марките POPOPX не са регистрирани.",
  tr: "TRADEMARK-POPOPX.md, POPOPX markalarının tescil edilmediğini belirtiyor.",
  hu: "A TRADEMARK-POPOPX.md rögzíti, hogy a POPOPX védjegyek nincsenek bejegyezve.",
};

/** “Upstream” stays unnamed, exactly as the forbidden-word list requires. */
const NOTE_ASSETS: Localized<string> = {
  en: "Images and marks owned by the upstream project are not granted by that licence.",
  ru: "Изображения и знаки, принадлежащие вышестоящему проекту, этой лицензией не передаются.",
  de: "Bilder und Marken des Upstream-Projekts werden durch diese Lizenz nicht eingeräumt.",
  fr: "Les images et les marques appartenant au projet amont ne sont pas cédées par cette licence.",
  it: "Le immagini e i marchi del progetto upstream non sono concessi da questa licenza.",
  nl: "Afbeeldingen en merken van het upstream-project worden niet door deze licentie verleend.",
  cs: "Obrázky a známky patřící upstream projektu touto licencí uděleny nejsou.",
  "zh-Hans": "上游项目自有的图片与商标，不在该许可授予范围内。",
  "zh-Hant": "上游專案自有的圖片與商標，不在該授權授予範圍內。",
  es: "Las imágenes y marcas propiedad del proyecto upstream no se conceden con esta licencia.",
  pl: "Obrazy i znaki należące do projektu upstream nie są objęte tą licencją.",
  ja: "上流プロジェクトが所有する画像と商標は、このライセンスでは許諾されません。",
  th: "รูปภาพและเครื่องหมายที่เป็นของโปรเจกต์ต้นทาง ไม่ถูกมอบให้ด้วยสัญญาอนุญาตนี้",
  fi: "Ylävirran hankkeen omistamia kuvia ja tavaramerkkejä tämä lisenssi ei myönnä.",
  uk: "Зображення й марки, що належать upstream-проєкту, цією ліцензією не надаються.",
  bg: "Изображенията и марките, притежавани от upstream проекта, не се предоставят с този лиценз.",
  tr: "Upstream projenin kendisine ait görseller ve markalar bu lisansla verilmez.",
  hu: "Az upstream projekt saját képeit és védjegyeit ez a licenc nem engedélyezi.",
};

type PortalLink = {
  readonly host: string;
  readonly href: string;
  readonly external: boolean;
  readonly blurb: Localized<string>;
};

const ECOSYSTEM: readonly PortalLink[] = [
  { host: SITE_HOST, href: SITE_URL, external: false, blurb: BLURB_MAIN },
  { host: NODE_PORTAL_HOST, href: NODE_PORTAL_URL, external: true, blurb: BLURB_NODE },
  { host: MP_PORTAL_HOST, href: MP_PORTAL_URL, external: true, blurb: BLURB_MP },
  { host: BOT_STUDIO_HOST, href: BOT_STUDIO_URL, external: true, blurb: BLURB_STUDIO },
];

const SOURCE_LINKS: readonly { readonly href: string; readonly label: Localized<string> }[] = [
  { href: LICENSE_URL, label: L_LICENSE },
  { href: TRADEMARK_URL, label: L_TRADEMARK },
  { href: ASSETS_LICENSE_URL, label: L_ASSETS },
  { href: IOS_REPO_URL, label: R_CLIENT },
  { href: WEB_REPO_URL, label: R_WEB },
  { href: SUITE_REPO_URL, label: R_SUITE },
  { href: NODE_REPO_URL, label: R_NODE },
  { href: BOT_STUDIO_REPO_URL, label: R_STUDIO },
];

const PROMISES: readonly Localized<string>[] = [
  P_COOKIE,
  P_ANALYTICS,
  P_CDN,
  P_QR,
  P_SWITCH,
  P_SCAN,
];

const LEGAL_NOTES: readonly Localized<string>[] = [NOTE_SPDX, NOTE_TRADEMARK, NOTE_ASSETS];

const LINK_CLASS =
  "group inline-flex items-start gap-1.5 rounded text-[12.5px] leading-snug text-mute underline decoration-hair decoration-1 underline-offset-[3px] transition-colors duration-200 hover:text-white hover:decoration-hair-strong";

function ColumnTitle({ text }: { text: string }): ReactElement {
  return (
    <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-white">{text}</h3>
  );
}

/** Brand glyph — inline SVG, so the footer still fetches nothing. */
function BrandMark(): ReactElement {
  return (
    <svg
      aria-hidden
      viewBox="0 0 28 28"
      className="h-7 w-7 shrink-0 text-brand-soft"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="2.4" y="2.4" width="23.2" height="23.2" rx="7.4" />
      <circle cx="14" cy="14" r="3" className="fill-brand-soft" stroke="none" />
      <path d="M14 4.6v3.6M14 19.8v3.6M4.6 14h3.6M19.8 14h3.6" />
    </svg>
  );
}

function ExternalGlyph(): ReactElement {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="mt-[3px] h-3 w-3 shrink-0 opacity-55 transition-opacity duration-200 group-hover:opacity-90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9.5 7H17v7.5" />
    </svg>
  );
}

function ArrowUpGlyph(): ReactElement {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

function CheckGlyph(): ReactElement {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="mt-[3px] h-3.5 w-3.5 shrink-0 text-mesh-soft"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.2 5 6v6c0 4 3 6.9 7 8.8 4-1.9 7-4.8 7-8.8V6l-7-2.8z" />
      <path d="M9 12.2l2.2 2.2L15.4 10" />
    </svg>
  );
}

function SourceGlyph(): ReactElement {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="mt-[3px] h-3.5 w-3.5 shrink-0 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 5H18a1.5 1.5 0 0 1 1.5 1.5V18A1.5 1.5 0 0 1 18 19.5H6A1.5 1.5 0 0 1 4.5 18V9.5" />
      <path d="M4.5 9.5 9.5 5M9 12.5l2.2 2.2L9 16.9M14 16.9h3" />
    </svg>
  );
}

export function Footer(): ReactElement {
  const { locale } = useLocale();

  const tagline = useCopy(TAGLINE);
  const ecoTitle = useCopy(H_ECOSYSTEM);
  const openTitle = useCopy(H_OPENSOURCE);
  const privacyTitle = useCopy(H_PRIVACY);
  const legalTitle = useCopy(H_LEGAL);
  const langTitle = useCopy(H_LANGUAGES);
  const langLead = useCopy(LANG_LEAD);
  const ecoNote = useCopy(ECO_NOTE);
  const licensed = useCopy(LICENSED_AGPL);
  const backToTop = useCopy(BACK_TO_TOP);

  return (
    <footer className="relative mt-8 border-t border-hair bg-ink/70 backdrop-blur-xl">
      <div className="section-wrap py-14 sm:py-16">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)]">
          <div>
            <a
              href="#top"
              className={`inline-flex items-center gap-3 rounded-xl px-1 py-1 text-white ${FOCUS}`}
            >
              <BrandMark />
              <span className="text-[17px] font-semibold tracking-tight">POPOPX</span>
              <span className="chip font-mono text-[10.5px] text-faint">{SITE_HOST}</span>
            </a>

            <p className="mt-4 max-w-[38ch] text-[13px] leading-relaxed text-mute">{tagline}</p>

            <div className="glass-inset mt-7 p-4">
              <p className="eyebrow">{langTitle}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-mute">
                <span className="font-mono text-[13px] text-white">{LOCALE_COUNT}</span> {langLead}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {LOCALES.map((tag) => (
                  <li key={tag} className="chip font-mono text-[10.5px] text-faint">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <a href="#top" className={`btn-ghost mt-7 text-[13px] ${FOCUS}`}>
              <ArrowUpGlyph />
              {backToTop}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
            <nav aria-label={ecoTitle}>
              <ColumnTitle text={ecoTitle} />
              <ul className="mt-4 space-y-4">
                {ECOSYSTEM.map((portal) => (
                  <li key={portal.host}>
                    <a
                      href={portal.href}
                      {...(portal.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`inline-flex items-center gap-1.5 rounded font-mono text-[13px] text-brand-soft underline decoration-hair-strong decoration-1 underline-offset-4 transition-colors duration-200 hover:text-white ${FOCUS}`}
                    >
                      {portal.host}
                      {portal.external ? <ExternalGlyph /> : null}
                    </a>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-faint">
                      {pick(portal.blurb, locale)}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="hairline-top mt-5 pt-4 text-[12px] leading-relaxed text-faint">
                {ecoNote}
              </p>
            </nav>

            <nav aria-label={openTitle}>
              <ColumnTitle text={openTitle} />
              <ul className="mt-4 space-y-2.5">
                {SOURCE_LINKS.map((entry) => (
                  <li key={entry.href}>
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${LINK_CLASS} ${FOCUS}`}
                    >
                      <SourceGlyph />
                      <span>{pick(entry.label, locale)}</span>
                      <ExternalGlyph />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={privacyTitle}>
              <ColumnTitle text={privacyTitle} />
              <ul className="mt-4 space-y-3">
                {PROMISES.map((promise) => (
                  <li key={promise.en} className="flex items-start gap-2.5">
                    <CheckGlyph />
                    <span className="text-[12px] leading-relaxed text-faint">
                      {pick(promise, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="hairline-top mt-12 pt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <ColumnTitle text={legalTitle} />
            <p className="text-[12.5px] leading-relaxed text-faint">
              <span className="font-mono text-mute">{`© ${BUILD_YEAR} POPOPX`}</span>
              <span aria-hidden className="mx-2">
                ·
              </span>
              {licensed}
            </p>
          </div>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {LEGAL_NOTES.map((note) => (
              <li
                key={note.en}
                className="glass glass-hover p-4 text-[12px] leading-relaxed text-faint"
              >
                {pick(note, locale)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
