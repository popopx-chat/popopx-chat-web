"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { useCopy, type Localized } from "@/lib/i18n";
import { ROUTE_LABELS } from "@/components/Navbar";
import { BLURB_MAIN, BLURB_MP, BLURB_NODE, BLURB_STUDIO, ECO_NOTE } from "@/components/Footer";
import { TONES, type Tone } from "@/components/EcosystemHub";
import { SectionHeading } from "@/components/ui";
import {
  BOT_STUDIO_HOST,
  BOT_STUDIO_URL,
  MP_PORTAL_HOST,
  MP_PORTAL_URL,
  NODE_PORTAL_HOST,
  NODE_PORTAL_URL,
} from "@/lib/site";

/**
 * The four product entries, one card each.
 *
 * The names, hosts and targets are the ones `src/lib/site.ts` already publishes —
 * the same four official origins `/ecosystem/` documents and the footer lists. The
 * one-liners are imported from `Footer` rather than re-authored, so a card and the
 * footer line under it cannot drift in 18 languages.
 *
 * The client card is the only internal link. It points at `/download/`, which is
 * the portal's own answer to "where do I get it": the App Store record still does
 * not resolve, and the standing ruling is that no store badge or link is rendered
 * until it does (`src/lib/site.ts`). The three sibling portals open in a new tab
 * with `rel="noopener noreferrer"`, and nothing is loaded from them — the card is
 * an `<a>`, not an embed.
 */

const EYEBROW: Localized<string> = {
  en: "Four core products",
  ru: "Четыре основных продукта",
  de: "Vier Kernprodukte",
  fr: "Quatre produits clés",
  it: "Quattro prodotti principali",
  nl: "Vier kernproducten",
  cs: "Čtyři hlavní produkty",
  "zh-Hans": "四大核心产品",
  "zh-Hant": "四大核心產品",
  es: "Cuatro productos principales",
  pl: "Cztery główne produkty",
  ja: "4 つの中核製品",
  th: "สี่ผลิตภัณฑ์หลัก",
  fi: "Neljä ydintuotetta",
  uk: "Чотири основні продукти",
  bg: "Четири основни продукта",
  tr: "Dört temel ürün",
  hu: "Négy alaptermék",
};

const TITLE: Localized<string> = {
  en: "Four entries, the whole ecosystem at a glance",
  ru: "Четыре входа — вся экосистема с первого взгляда",
  de: "Vier Einstiege, das Ökosystem auf einen Blick",
  fr: "Quatre entrées, l’écosystème d’un coup d’œil",
  it: "Quattro ingressi, l’ecosistema a colpo d’occhio",
  nl: "Vier ingangen, het ecosysteem in één oogopslag",
  cs: "Čtyři vstupy, celý ekosystém na první pohled",
  "zh-Hans": "四个入口，一眼看懂整个生态",
  "zh-Hant": "四個入口，一眼看懂整個生態",
  es: "Cuatro entradas, todo el ecosistema de un vistazo",
  pl: "Cztery wejścia, cały ekosystem od razu",
  ja: "4 つの入口でエコシステム全体をひと目で",
  th: "สี่ทางเข้า เห็นทั้งระบบในคราวเดียว",
  fi: "Neljä sisääntuloa, koko ekosysteemi yhdellä silmäyksellä",
  uk: "Чотири входи — вся екосистема з першого погляду",
  bg: "Четири входа — цялата екосистема с един поглед",
  tr: "Dört giriş, tüm ekosistem tek bakışta",
  hu: "Négy belépő, az egész ökoszisztéma egyetlen pillantással",
};

const LEAD: Localized<string> = {
  en: "One client and three independently deployed official sites — Bot Studio, the service-account suite and Mac Node. Any card opens its own site; this portal loads nothing from them.",
  ru: "Один клиент и три независимо размещённых официальных сайта — Bot Studio, набор сервисов и Mac Node. Каждая карточка ведёт на свой сайт, и этот портал у них ничего не загружает.",
  de: "Ein Client und drei unabhängig betriebene offizielle Sites — Bot Studio, die Service-Suite und Mac Node. Jede Karte öffnet ihre eigene Site; dieses Portal lädt nichts von ihnen.",
  fr: "Un client et trois sites officiels hébergés séparément — Bot Studio, la suite de services et Mac Node. Chaque carte ouvre son propre site ; ce portail ne charge rien chez eux.",
  it: "Un client e tre siti ufficiali ospitati separatamente — Bot Studio, la suite di servizi e Mac Node. Ogni scheda apre il proprio sito; questo portale non carica nulla da loro.",
  nl: "Eén client en drie onafhankelijk gehoste officiële sites — Bot Studio, de service-suite en Mac Node. Elke kaart opent zijn eigen site; dit portal laadt niets van hen.",
  cs: "Jeden klient a tři samostatně hostované oficiální weby — Bot Studio, sada služeb a Mac Node. Každá karta otevírá svůj web; tento portál z nich nenačítá nic.",
  "zh-Hans": "一个客户端，加上三个各自独立部署的官方站点：Bot Studio、服务号套件与 Mac Node。点开任意一张卡片直达对应站点；本站不会从它们加载任何资源。",
  "zh-Hant": "一個客戶端，加上三個各自獨立部署的官方網站：Bot Studio、服務號套件與 Mac Node。點開任意一張卡片直達對應網站；本站不會從它們載入任何資源。",
  es: "Un cliente y tres sitios oficiales desplegados por separado — Bot Studio, la suite de cuentas de servicio y Mac Node. Cada tarjeta abre su propio sitio; este portal no carga nada de ellos.",
  pl: "Jeden klient i trzy niezależnie uruchomione oficjalne witryny — Bot Studio, pakiet kont serwisowych i Mac Node. Każda karta otwiera własną witrynę; ten portal niczego od nich nie pobiera.",
  ja: "クライアント 1 つに、独立公開の公式サイト 3 つ——Bot Studio、サービスアカウント套件、Mac Node。カードを開くとそれぞれのサイトへ進みます。このポータルはそこから何も読み込みません。",
  th: "ไคลเอนต์หนึ่งตัวกับอีกสามเว็บไซต์ทางการที่ตั้งแยกกัน — Bot Studio ชุดบัญชีบริการ และ Mac Node ทุกการ์ดเปิดเว็บไซต์ของตัวเอง พอร์ทัลนี้ไม่โหลดสิ่งใดจากที่นั่น",
  fi: "Yksi asiakas ja kolme erikseen ylläpidettyä virallista sivustoa — Bot Studio, palvelutilien paketti ja Mac Node. Mikä tahansa kortti avaa oman sivustonsa; tämä portaali ei lataa niiltä mitään.",
  uk: "Один клієнт і три незалежно розгорнуті офіційні сайти — Bot Studio, набір сервісних акаунтів і Mac Node. Кожна картка веде до власного сайту; цей портал нічого в них не завантажує.",
  bg: "Един клиент и три независимо изградени официални сайта — Bot Studio, пакетът за сервисни акаунти и Mac Node. Всяка карта отваря собствения си сайт; този портал не зарежда нищо от тях.",
  tr: "Bir istemci ve ayrı barındırılan üç resmî site — Bot Studio, hizmet hesabı paketi ve Mac Node. Her kart kendi sitesini açar; bu portal onlardan hiçbir şey yüklemez.",
  hu: "Egy ügyfél és három külön telepített hivatalos oldal — Bot Studio, a szolgáltatási fiókok csomagja és Mac Node. Mindegyik kártya a saját oldalát nyitja meg; ez a portál tőlük semmit nem tölt be.",
};

/** The label on a card that leaves the portal. */
const CTA_OPEN: Localized<string> = {
  en: "Open site",
  ru: "Открыть сайт",
  de: "Site öffnen",
  fr: "Ouvrir le site",
  it: "Apri il sito",
  nl: "Site openen",
  cs: "Otevřít web",
  "zh-Hans": "打开站点",
  "zh-Hant": "開啟網站",
  es: "Abrir sitio",
  pl: "Otwórz witrynę",
  ja: "サイトを開く",
  th: "เปิดเว็บไซต์",
  fi: "Avaa sivusto",
  uk: "Відкрити сайт",
  bg: "Отвори сайта",
  tr: "Siteyi aç",
  hu: "Oldal megnyitása",
};

type Entry = {
  /** Product names are locale-free, like the ecosystem cards they mirror. */
  name: string;
  target: string;
  href: string;
  external: boolean;
  tone: Tone;
  blurb: Localized<string>;
};

const ENTRIES: readonly Entry[] = [
  {
    name: "POPOPX Chat",
    target: "/download/",
    href: "/download/",
    external: false,
    tone: "brand",
    blurb: BLURB_MAIN,
  },
  {
    name: "Bot Studio",
    target: BOT_STUDIO_HOST,
    href: BOT_STUDIO_URL,
    external: true,
    tone: "mesh",
    blurb: BLURB_STUDIO,
  },
  {
    name: "Service Suite",
    target: MP_PORTAL_HOST,
    href: MP_PORTAL_URL,
    external: true,
    tone: "warn",
    blurb: BLURB_MP,
  },
  {
    name: "Mac Node",
    target: NODE_PORTAL_HOST,
    href: NODE_PORTAL_URL,
    external: true,
    tone: "alert",
    blurb: BLURB_NODE,
  },
];

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export function PortalCards(): ReactElement {
  const sectionLabel = useCopy(TITLE);
  const note = useCopy(ECO_NOTE);

  return (
    <section id="portals" aria-label={sectionLabel} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />
        <ul className="mt-9 grid grid-cols-[minmax(0,1fr)] items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {ENTRIES.map((entry, index) => (
            <EntryCard key={entry.name} entry={entry} index={index} />
          ))}
        </ul>
        <p className="mt-5 text-[12.5px] leading-relaxed text-faint">{note}</p>
      </div>
    </section>
  );
}

function EntryCard({ entry, index }: { entry: Entry; index: number }): ReactElement {
  const blurb = useCopy(entry.blurb);
  const action = useCopy(entry.external ? CTA_OPEN : ROUTE_LABELS.download);
  const tone = TONES[entry.tone];
  const className = `glass glass-hover flex h-full min-w-0 flex-col p-5 ${tone.ring} ${FOCUS}`;

  return (
    <li className="flex min-w-0">
      {entry.external ? (
        <a
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          <CardBody entry={entry} index={index} blurb={blurb} action={action} toneText={tone.text} />
        </a>
      ) : (
        <Link href={entry.href} prefetch={false} className={className}>
          <CardBody entry={entry} index={index} blurb={blurb} action={action} toneText={tone.text} />
        </Link>
      )}
    </li>
  );
}

function CardBody({
  entry,
  index,
  blurb,
  action,
  toneText,
}: {
  entry: Entry;
  index: number;
  blurb: string;
  action: string;
  toneText: string;
}): ReactElement {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-[16px] font-semibold tracking-tight text-white">{entry.name}</h3>
        <span className="chip shrink-0 font-mono text-[10.5px] text-faint">{`0${index + 1}`}</span>
      </div>
      <p className="mt-3 min-w-0 break-words text-[13.5px] leading-relaxed text-mute">{blurb}</p>
      <div className="hairline-top mt-auto flex min-w-0 items-center justify-between gap-3 pt-4">
        <span className={`min-w-0 truncate font-mono text-[12.5px] ${toneText}`}>{entry.target}</span>
        <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-faint">
          {action}
          <span aria-hidden className="text-[13px]">
            {entry.external ? "↗" : "→"}
          </span>
        </span>
      </div>
    </>
  );
}
