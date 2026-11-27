"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { useCopy, type Localized } from "@/lib/i18n";
import { ROUTE_LABELS } from "@/components/Navbar";
import { SectionHeading } from "@/components/ui";
import type { RouteId } from "@/lib/site";

/**
 * The homepage's index of the sections that moved out.
 *
 * The portal used to be one long anchored page, and four of its sections are now
 * their own documents. Nothing in the workspace linked to
 * `popopx.chat#security`-style URLs (measured by grep on 2026-11-25), so these
 * rows are insurance for bookmarks and printed QR codes rather than a compat
 * layer: each row carries the id the section used to own, so an old
 * `#security` / `#ecosystem` / `#download` fragment still lands on the homepage
 * and finds a route to follow.
 *
 * `#features` is the exception, and it has to be: the compact `FeaturesGrid`
 * came back to the homepage and that section owns the id, so a row repeating it
 * would make the document invalid and leave the fragment's target to document
 * order. This row carries `overview-features` instead, and an old `#features`
 * bookmark now lands on the six features themselves.
 *
 * `#comparison` is the one id without a row here — the matrix moved into
 * `/security/` and keeps its own anchor on that page.
 *
 * The row labels are the navbar's `ROUTE_LABELS`, imported rather than
 * re-authored: a nav entry and its landing page must not drift apart in 21
 * languages. The trailing path is locale-free, like every other protocol token
 * on the portal.
 */

const EYEBROW: Localized<string> = {
  en: "Four pages, one index",
  "pt-BR": "Quatro páginas, um índice",
  ko: "네 개의 페이지, 하나의 인덱스",
  ar: "أربع صفحات، فهرس واحد",
  ru: "Четыре страницы, один указатель",
  de: "Vier Seiten, ein Verzeichnis",
  fr: "Quatre pages, un index",
  it: "Quattro pagine, un indice",
  nl: "Vier pagina's, één index",
  cs: "Čtyři stránky, jeden rozcestník",
  "zh-Hans": "四个栏目，一处入口",
  "zh-Hant": "四個栏目，一處入口",
  es: "Cuatro páginas, un índice",
  pl: "Cztery strony, jeden katalog",
  ja: "4 つのページ、1 つの案内",
  th: "สี่หน้า หนึ่งทางเข้า",
  fi: "Neljä sivua, yksi hakemisto",
  uk: "Чотири сторінки, один покажчик",
  bg: "Четири страници, един указател",
  tr: "Dört sayfa, bir dizin",
  hu: "Négy oldal, egy mutató",
};

const TITLE: Localized<string> = {
  en: "Each section is now a page of its own",
  "pt-BR": "Agora cada seção é uma página própria",
  ko: "이제 각 섹션은 독립된 페이지입니다",
  ar: "كل قسم أصبح صفحة مستقلة بذاته",
  ru: "Каждый раздел теперь отдельная страница",
  de: "Jeder Abschnitt ist jetzt eine eigene Seite",
  fr: "Chaque section est désormais sa propre page",
  it: "Ogni sezione è ora una pagina a sé",
  nl: "Elke sectie is nu een eigen pagina",
  cs: "Každá sekce je nyní samostatná stránka",
  "zh-Hans": "原来的分区各自成了独立页面",
  "zh-Hant": "原本的分區各自成為獨立頁面",
  es: "Cada sección es ahora una página propia",
  pl: "Każda sekcja jest teraz osobną stroną",
  ja: "元の各区別がそれぞれ独立したページになりました",
  th: "แต่ละส่วนเดิมกลายเป็นหน้าของตนเอง",
  fi: "Jokainen osio on nyt oma sivunsa",
  uk: "Кожен розділ тепер є окремою сторінкою",
  bg: "Всяка секция сега е собствена страница",
  tr: "Her bölüm artık kendi başına bir sayfa",
  hu: "Minden szakasz saját oldal",
};

const LEAD: Localized<string> = {
  en: "The product, the ecosystem, the security ledger and the download page are separate documents now — same host, same 21 languages, no tracking anywhere.",
  "pt-BR": "O produto, o ecossistema, o registro de fatos de segurança e a página de download são documentos separados agora — mesmo host, os mesmos 21 idiomas, nenhum rastreamento em lugar algum.",
  ko: "제품, 생태계, 보안 대장, 다운로드 페이지는 이제 별개의 문서입니다 — 같은 호스트, 같은 21개 언어, 어디에도 추적은 없습니다.",
  ar: "المنتج والمنظومة وسجل الأمان وصفحة التنزيل مستندات منفصلة الآن — المضيف نفسه، واللغات الـ 21 نفسها، ولا تتبع في أي مكان.",
  ru: "Продукт, экосистема, реестр безопасности и страница загрузки теперь отдельные документы — один хост, те же 21 язык, никакого отслеживания.",
  de: "Produkt, Ökosystem, Sicherheitsnachweis und Download sind jetzt eigene Dokumente — gleicher Host, dieselben 21 Sprachen, ohne Tracking.",
  fr: "Le produit, l'écosystème, le registre de sécurité et la page de téléchargement sont des documents distincts — même hôte, mêmes 21 langues, aucun pistage.",
  it: "Prodotto, ecosistema, registro di sicurezza e pagina di download sono ora documenti separati — stesso host, stesse 21 lingue, nessun tracciamento.",
  nl: "Product, ecosysteem, beveiligingsregister en downloadpagina zijn nu aparte documenten — zelfde host, dezelfde 21 talen, geen tracking.",
  cs: "Produkt, ekosystém, bezpečnostní přehled a stránka stáhnutí jsou nyní samostatné dokumenty — stejný hostitel, stejných 21 jazyků, žádné sledování.",
  "zh-Hans": "产品、生态、隐私与安全、下载现在是四份独立文档——同一个域名、同样 21 种界面语言、任何地方都没有埋点。",
  "zh-Hant": "產品、生態、隱私與安全、下載現在是四份獨立檔案——同一個網域、同樣 21 種介面語言、任何地方都沒有埋點。",
  es: "Producto, ecosistema, registro de seguridad y descarga son ahora documentos separados — el mismo host, las mismas 21 lenguas, sin rastreo.",
  pl: "Produkt, ekosystem, rejestr bezpieczeństwa i strona pobierania to teraz osobne dokumenty — ten sam host, te same 21 języków, żadnego śledzenia.",
  ja: "製品、エコシステム、プライバシーとセキュリティ、ダウンロードはそれぞれ独立したドキュメントです——同一ホスト、同じ 21 言語、埋め込み計測は一切なし。",
  th: "ผลิตภัณฑ์ ระบบนิเวศ ความปลอดภัย และหน้าดาวน์โหลดเป็นเอกสารแยกกันแล้ว — โฮสต์เดียวกัน 21 ภาษาเท่ากัน ไม่มีตัวติดตาม",
  fi: "Tuote, ekosysteemi, tietoturvarekisteri ja lataussivu ovat nyt omia dokumenttejaan — sama isäntä, samat 21 kieltä, ei seurantaa.",
  uk: "Продукт, екосистема, реєстр безпеки та сторінка завантаження тепер окремі документи — той самий хост, ті самі 21 мова, без відстеження.",
  bg: "Продуктът, екосистемата, регистърът по сигурността и страницата за изтегляне вече са отделни документи — един и същ хост, същите 21 езика, без проследяване.",
  tr: "Ürün, ekosistem, güvenlik defteri ve indirme sayfası artık ayrı belgeler — aynı sunucu adı, aynı 21 dil, hiçbir yerde izleme yok.",
  hu: "A termék, az ökoszisztéma, a biztonsági névjegyzék és a letöltési oldal külön dokumentumok — ugyanaz a host, ugyanaz a 21 nyelv, semmilyen követés.",
};

const ROWS: readonly { readonly route: RouteId; readonly anchor: string; readonly href: string }[] =
  [
    { route: "products", anchor: "overview-features", href: "/products/" },
    { route: "ecosystem", anchor: "ecosystem", href: "/ecosystem/" },
    { route: "security", anchor: "security", href: "/security/" },
    { route: "download", anchor: "download", href: "/download/" },
  ];

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

export function SectionPointers(): ReactElement {
  const sectionLabel = useCopy(TITLE);

  return (
    <section id="sections" aria-label={sectionLabel} className="py-16 sm:py-20">
      <div className="section-wrap">
        <SectionHeading eyebrow={EYEBROW} title={TITLE} subtitle={LEAD} />
        <ul className="mt-9 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
          {ROWS.map((row) => (
            <li key={row.anchor} id={row.anchor}>
              <Link
                href={row.href}
                prefetch={false}
                className={`glass glass-hover flex items-center justify-between gap-4 p-5 ${FOCUS}`}
              >
                <RowLabel route={row.route} />
                <span aria-hidden dir="ltr" className="font-mono text-[11.5px] text-faint">
                  {row.href}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The row's own text, taken from the navbar dictionary so the two cannot drift. */
function RowLabel({ route }: { route: RouteId }): ReactElement {
  const label = useCopy(ROUTE_LABELS[route]);
  return <span className="text-[15px] font-semibold text-white">{label}</span>;
}
