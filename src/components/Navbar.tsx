"use client";

import { useCallback, useEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import { useCopy, type Localized } from "@/lib/i18n";
import { LtrText } from "@/components/Ltr";
import { LanguageMenu } from "@/components/LanguageMenu";
import {
  BOT_STUDIO_URL,
  IOS_REPO_URL,
  MP_PORTAL_URL,
  NODE_PORTAL_URL,
  ROUTES,
  type RouteId,
} from "@/lib/site";

/**
 * Sticky glass navbar.
 *
 * Honest constraints this file keeps:
 *  - The seven first-level routes are real documents (`/products/` etc.), so the
 *    bar links them with `next/link` and `prefetch={false}`. Client-side
 *    navigation is not decoration here: the stored locale is applied in a
 *    `useEffect`, so a full document reload repaints one frame in `zh-Hans`
 *    before the reader's own language comes back. No request is added —
 *    `prefetch={false}` keeps the export from fetching sibling routes.
 *  - There is deliberately no active-route highlight driven by the scroll
 *    position, and no `IntersectionObserver`. The bar claims only what the URL
 *    knows.
 *  - The only image is the same-origin official logo (`/logo-popopx.png`, a
 *    byte-for-byte copy of the iOS app icon). No webfont, no icon font, no CDN:
 *    the GitHub, menu and chevron glyphs are inline SVG.
 *  - The sibling portals live in the drawer, the ecosystem page and the footer.
 *    They used to sit in the bar as chips, but `section-wrap` caps the bar at
 *    1180 px and seven locale-dependent labels already use it, so the chips
 *    moved out rather than the labels being clipped.
 *  - Copy is authored in all 21 locales the engine declares, typed as a total
 *    `Localized<string>` map, so the compiler rejects a missing variant.
 */

/**
 * The seven first-level nav labels, in the brief's own short register (zh-Hans:
 * 首页 / 产品 / 生态 / 隐私与安全 / 开发者 / 资源 / 下载). The bar is 1180 px wide
 * at most, so these are deliberately not the page titles: the security page is
 * headed 「隐私与安全」 in prose and the download page 「下载与源码构建」.
 */
export const ROUTE_LABELS: Record<RouteId, Localized<string>> = {
  home: {
    en: "Home",
    "pt-BR": "Início",
    ko: "홈",
    ar: "الرئيسية",
    ru: "Главная",
    de: "Start",
    fr: "Accueil",
    it: "Home",
    nl: "Start",
    cs: "Domů",
    "zh-Hans": "首页",
    "zh-Hant": "首頁",
    es: "Inicio",
    pl: "Start",
    ja: "ホーム",
    th: "หน้าแรก",
    fi: "Etusivu",
    uk: "Головна",
    bg: "Начало",
    tr: "Ana sayfa",
    hu: "Kezdőlap",
  },
  products: {
    en: "Products",
    "pt-BR": "Produtos",
    ko: "제품",
    ar: "المنتجات",
    ru: "Продукты",
    de: "Produkte",
    fr: "Produits",
    it: "Prodotti",
    nl: "Producten",
    cs: "Produkty",
    "zh-Hans": "产品",
    "zh-Hant": "產品",
    es: "Productos",
    pl: "Produkty",
    ja: "プロダクト",
    th: "ผลิตภัณฑ์",
    fi: "Tuotteet",
    uk: "Продукти",
    bg: "Продукти",
    tr: "Ürünler",
    hu: "Termékek",
  },
  ecosystem: {
    en: "Ecosystem",
    "pt-BR": "Ecossistema",
    ko: "생태계",
    ar: "المنظومة",
    ru: "Экосистема",
    de: "Ökosystem",
    fr: "Écosystème",
    it: "Ecosistema",
    nl: "Ecosysteem",
    cs: "Ekosystém",
    "zh-Hans": "生态",
    "zh-Hant": "生態",
    es: "Ecosistema",
    pl: "Ekosystem",
    ja: "エコシステム",
    th: "ระบบนิเวศ",
    fi: "Ekosysteemi",
    uk: "Екосистема",
    bg: "Екосистема",
    tr: "Ekosistem",
    hu: "Ökoszisztéma",
  },
  security: {
    en: "Security",
    "pt-BR": "Segurança",
    ko: "보안",
    ar: "الأمان",
    ru: "Безопасность",
    de: "Sicherheit",
    fr: "Sécurité",
    it: "Sicurezza",
    nl: "Beveiliging",
    cs: "Zabezpečení",
    "zh-Hans": "隐私与安全",
    "zh-Hant": "隱私與安全",
    es: "Seguridad",
    pl: "Bezpieczeństwo",
    ja: "セキュリティ",
    th: "ความปลอดภัย",
    fi: "Tietoturva",
    uk: "Безпека",
    bg: "Сигурност",
    tr: "Güvenlik",
    hu: "Biztonság",
  },
  developers: {
    en: "Developers",
    "pt-BR": "Desenvolvedores",
    ko: "개발자",
    ar: "المطوّرون",
    ru: "Разработчикам",
    de: "Entwickler",
    fr: "Développeurs",
    it: "Sviluppatori",
    nl: "Ontwikkelaars",
    cs: "Vývojáři",
    "zh-Hans": "开发者",
    "zh-Hant": "開發者",
    es: "Desarrolladores",
    pl: "Programiści",
    ja: "開発者",
    th: "นักพัฒนา",
    fi: "Kehittäjille",
    uk: "Розробникам",
    bg: "Разработчици",
    tr: "Geliştiriciler",
    hu: "Fejlesztők",
  },
  resources: {
    en: "Resources",
    "pt-BR": "Recursos",
    ko: "리소스",
    ar: "الموارد",
    ru: "Ресурсы",
    de: "Ressourcen",
    fr: "Ressources",
    it: "Risorse",
    nl: "Bronnen",
    cs: "Zdroje",
    "zh-Hans": "资源",
    "zh-Hant": "資源",
    es: "Recursos",
    pl: "Zasoby",
    ja: "リソース",
    th: "ทรัพยากร",
    fi: "Materiaalit",
    uk: "Ресурси",
    bg: "Ресурси",
    tr: "Kaynaklar",
    hu: "Források",
  },
  download: {
    en: "Download",
    "pt-BR": "Baixar",
    ko: "다운로드",
    ar: "التنزيل",
    ru: "Загрузки",
    de: "Download",
    fr: "Télécharger",
    it: "Download",
    nl: "Download",
    cs: "Stáhnout",
    "zh-Hans": "下载",
    "zh-Hant": "下載",
    es: "Descarga",
    pl: "Pobierz",
    ja: "ダウンロード",
    th: "ดาวน์โหลด",
    fi: "Lataus",
    uk: "Завантаження",
    bg: "Изтегляне",
    tr: "İndir",
    hu: "Letöltés",
  },
};

const NAV_COPY: Record<
  | "skip"
  | "sections"
  | "portals"
  | "nodeCaption"
  | "mpCaption"
  | "studioCaption"
  | "repo"
  | "openMenu"
  | "closeMenu",
  Localized<string>
> = {
  skip: {
    en: "Skip to main content",
    "pt-BR": "Pular para o conteúdo principal",
    ko: "본문으로 건너뛰기",
    ar: "انتقل إلى المحتوى الرئيسي",
    ru: "Перейти к основному содержанию",
    de: "Zum Hauptinhalt springen",
    fr: "Aller au contenu principal",
    it: "Vai al contenuto principale",
    nl: "Naar hoofdinhoud",
    cs: "Přeskočit na obsah",
    "zh-Hans": "跳到主要内容",
    "zh-Hant": "跳至主要內容",
    es: "Ir al contenido principal",
    pl: "Przejdź do treści",
    ja: "本文へスキップ",
    th: "ข้ามไปที่เนื้อหาหลัก",
    fi: "Siirry sisältöön",
    uk: "Перейти до основного вмісту",
    bg: "Към основното съдържание",
    tr: "Ana içeriğe geç",
    hu: "Ugrás a tartalomra",
  },
  sections: {
    en: "Page sections",
    "pt-BR": "Seções da página",
    ko: "페이지 섹션",
    ar: "أقسام الصفحة",
    ru: "Разделы страницы",
    de: "Seitenbereiche",
    fr: "Sections de la page",
    it: "Sezioni della pagina",
    nl: "Pagina-onderdelen",
    cs: "Oddíly stránky",
    "zh-Hans": "页面分区",
    "zh-Hant": "頁面分區",
    es: "Secciones de la página",
    pl: "Sekcje strony",
    ja: "ページセクション",
    th: "หัวข้อในหน้า",
    fi: "Sivun osiot",
    uk: "Розділи сторінки",
    bg: "Раздели на страницата",
    tr: "Sayfa bölümleri",
    hu: "Oldalrészek",
  },
  portals: {
    en: "Portal shortcuts",
    "pt-BR": "Atalhos do portal",
    ko: "포털 바로가기",
    ar: "اختصارات البوابة",
    ru: "Быстрый переход к порталам",
    de: "Portal-Verknüpfungen",
    fr: "Raccourcis des portails",
    it: "Collegamenti rapidi ai portali",
    nl: "Snelkoppelingen naar portalen",
    cs: "Zkratky portálů",
    "zh-Hans": "生态入口",
    "zh-Hant": "生態入口",
    es: "Atajos de los portales",
    pl: "Skróty do portali",
    ja: "ポータルショートカット",
    th: "ทางลัดพอร์ทัล",
    fi: "Portaalien pikavalinnat",
    uk: "Швидкі переходи до порталів",
    bg: "Бързи връзки към портали",
    tr: "Portal kısayolları",
    hu: "Portálparancsikonok",
  },
  nodeCaption: {
    en: "Mac Node edge engine",
    "pt-BR": "Motor de borda do Mac Node",
    ko: "Mac Node 엣지 엔진",
    ar: "محرك الحافة Mac Node",
    ru: "Узловой движок для Mac",
    de: "Mac-Node-Edge-Engine",
    fr: "Moteur de nœud Mac",
    it: "Motore edge per Mac Node",
    nl: "Mac Node edge-engine",
    cs: "Edgeový engine pro Mac Node",
    "zh-Hans": "Mac Node 端侧引擎",
    "zh-Hant": "Mac Node 端側引擎",
    es: "Motor de borde para Mac Node",
    pl: "Silnik krawędziowy Mac Node",
    ja: "Mac Node エッジエンジン",
    th: "เอนจินขอบของ Mac Node",
    fi: "Mac Node -reunamoottori",
    uk: "Країнковий рушій Mac Node",
    bg: "Периферен двигател за Mac Node",
    tr: "Mac Node uç motoru",
    hu: "Mac Node peremmotor",
  },
  mpCaption: {
    en: "Service accounts & channels",
    "pt-BR": "Contas de serviço e canais",
    ko: "서비스 계정과 채널",
    ar: "حسابات الخدمة والقنوات",
    ru: "Сервисные аккаунты и каналы",
    de: "Service-Konten und Kanäle",
    fr: "Comptes de service et canaux",
    it: "Account di servizio e canali",
    nl: "Serviceaccounts en kanalen",
    cs: "Service účty a kanály",
    "zh-Hans": "服务号与零知识频道",
    "zh-Hant": "服務號與零知識頻道",
    es: "Cuentas de servicio y canales",
    pl: "Konta usługowe i kanały",
    ja: "サービスアカウントとチャンネル",
    th: "บัญชีบริการและช่องทาง",
    fi: "Palvelutilit ja kanavat",
    uk: "Сервісні акаунти та канали",
    bg: "Акаунти за услуги и канали",
    tr: "Hizmet hesapları ve kanallar",
    hu: "Számfiókok és csatornák",
  },
  studioCaption: {
    en: "Self-hosted bot workbench",
    "pt-BR": "Bancada de bots auto-hospedada",
    ko: "자체 호스팅 봇 워크벤치",
    ar: "ورشة بوتات تستضيفها بنفسك",
    ru: "Верстак ботов на своём сервере",
    de: "Bot-Werkbank auf eigenem Server",
    fr: "Atelier de bots auto-hébergés",
    it: "Postazione bot sul tuo server",
    nl: "Bot-workbench op eigen server",
    cs: "Workbench botů na vlastním serveru",
    "zh-Hans": "自托管机器人工作台",
    "zh-Hant": "自託管機器人工作台",
    es: "Taller de bots en tu servidor",
    pl: "Warsztat botów na własnym serwerze",
    ja: "セルフホストのボット作業台",
    th: "ชุดเครื่องมือบอตบนเซิร์ฟเวอร์ของคุณ",
    fi: "Bot-työtila omalla palvelimella",
    uk: "Верстак ботів на власному сервері",
    bg: "Работилница за ботове на своя сървър",
    tr: "Kendi sunucunda bot tezgâhı",
    hu: "Botműhely a saját szervereden",
  },
  repo: {
    en: "Open-source repository",
    "pt-BR": "Repositório de código aberto",
    ko: "오픈 소스 저장소",
    ar: "مستودع مفتوح المصدر",
    ru: "Репозиторий с открытым кодом",
    de: "Open-Source-Repository",
    fr: "Dépôt open source",
    it: "Repository open source",
    nl: "Opensource-repository",
    cs: "Repozitář s otevřeným kódem",
    "zh-Hans": "开源仓库",
    "zh-Hant": "開源倉庫",
    es: "Repositorio de código abierto",
    pl: "Repozytorium open source",
    ja: "オープンソースのリポジトリ",
    th: "ที่เก็บซอร์สแบบโอเพนซอร์ส",
    fi: "Avoimen lähdekoodin repositorio",
    uk: "Репозиторій із відкритим кодом",
    bg: "Хранилище с отворен код",
    tr: "Açık kaynak deposu",
    hu: "Nyílt forráskódú tároló",
  },
  openMenu: {
    en: "Open section menu",
    "pt-BR": "Abrir o menu da seção",
    ko: "섹션 메뉴 열기",
    ar: "افتح قائمة الأقسام",
    ru: "Открыть меню разделов",
    de: "Bereichsmenü öffnen",
    fr: "Ouvrir le menu des sections",
    it: "Apri il menu delle sezioni",
    nl: "Onderdelenmenu openen",
    cs: "Otevřít menu oddílů",
    "zh-Hans": "展开分区菜单",
    "zh-Hant": "展開分區選單",
    es: "Abrir el menú de secciones",
    pl: "Otwórz menu sekcji",
    ja: "セクションメニューを開く",
    th: "เปิดเมนูหัวข้อ",
    fi: "Avaa osioiden valikko",
    uk: "Відкрити меню розділів",
    bg: "Отвори менюто с разделите",
    tr: "Bölüm menüsünü aç",
    hu: "Oldalrész menü megnyitása",
  },
  closeMenu: {
    en: "Close section menu",
    "pt-BR": "Fechar o menu da seção",
    ko: "섹션 메뉴 닫기",
    ar: "أغلق قائمة الأقسام",
    ru: "Закрыть меню разделов",
    de: "Bereichsmenü schließen",
    fr: "Fermer le menu des sections",
    it: "Chiudi il menu delle sezioni",
    nl: "Onderdelenmenu sluiten",
    cs: "Zavřít menu oddílů",
    "zh-Hans": "收起分区菜单",
    "zh-Hant": "收起分區選單",
    es: "Cerrar el menú de secciones",
    pl: "Zamknij menu sekcji",
    ja: "セクションメニューを閉じる",
    th: "ปิดเมนูหัวข้อ",
    fi: "Sulje osioiden valikko",
    uk: "Закрити меню розділів",
    bg: "Затвори менюто с разделите",
    tr: "Bölüm menüsünü kapat",
    hu: "Oldalrész menü bezárása",
  },
};

/** Brand wordmark next to the logo — locale-free on purpose. */
const BRAND = "POPOPX";

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft/70";

function GitHubMark(): ReactElement {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      className="h-[18px] w-[18px] shrink-0"
    >
      <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.89c.51.1.7-.22.7-.49v-1.9c-2.85.62-3.45-1.22-3.45-1.22-.47-1.18-1.14-1.5-1.14-1.5-.93-.63.07-.62.07-.62 1.03.07 1.57 1.05 1.57 1.05.92 1.57 2.4 1.12 2.99.86.09-.67.36-1.12.65-1.38-2.27-.26-4.66-1.13-4.66-5.05 0-1.12.4-2.03 1.05-2.74-.11-.26-.46-1.3.1-2.71 0 0 .86-.27 2.8 1.04a9.7 9.7 0 0 1 5.1 0c1.94-1.31 2.8-1.04 2.8-1.04.56 1.41.21 2.45.1 2.71.65.71 1.05 1.62 1.05 2.74 0 3.93-2.4 4.79-4.67 5.04.37.32.7.94.7 1.9v2.82c0 .27.19.6.71.49A10.2 10.2 0 0 0 12 1.8z" />
    </svg>
  );
}

function MenuBars({ open }: { open: boolean }): ReactElement {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-[18px] w-[18px] shrink-0"
    >
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

/** One nav entry: a client-side route link whose label comes from the locale engine. */
function RouteLink({
  route,
  onClick,
  className,
}: {
  route: { id: RouteId; href: string };
  onClick?: () => void;
  className: string;
}): ReactElement {
  const label = useCopy(ROUTE_LABELS[route.id]);
  return (
    <Link href={route.href} prefetch={false} onClick={onClick} className={className}>
      {label}
    </Link>
  );
}

export function Navbar(): ReactElement {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  const skip = useCopy(NAV_COPY.skip);
  const sectionsLabel = useCopy(NAV_COPY.sections);
  const portalsLabel = useCopy(NAV_COPY.portals);
  const nodeCaption = useCopy(NAV_COPY.nodeCaption);
  const mpCaption = useCopy(NAV_COPY.mpCaption);
  const studioCaption = useCopy(NAV_COPY.studioCaption);
  const repoLabel = useCopy(NAV_COPY.repo);
  const toggleLabel = useCopy(open ? NAV_COPY.closeMenu : NAV_COPY.openMenu);

  const close = useCallback(() => setOpen(false), []);

  // Any outside pointer press or Escape dismisses the mobile drawer; there is no
  // scroll or resize listener, so the bar never re-renders while you read.
  useEffect(() => {
    if (!open) {
      return;
    }
    function onPointerDown(event: PointerEvent): void {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-ink/70 backdrop-blur-xl">
      <a
        href="#top"
        className={`sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:rounded-full focus:border focus:border-brand/60 focus:bg-ink focus:px-3 focus:py-1.5 focus:text-[12px] focus:text-white ${FOCUS}`}
      >
        {skip}
      </a>

      <nav
        ref={rootRef}
        aria-label={sectionsLabel}
        className="section-wrap flex h-[64px] items-center gap-2 sm:gap-3"
      >
        <Link
          href="/"
          prefetch={false}
          onClick={close}
          className={`flex shrink-0 items-center gap-2.5 rounded-xl px-1 py-1 text-white ${FOCUS}`}
          title={BRAND}
        >
          <img
            src="/logo-popopx.png"
            alt={BRAND}
            width="30"
            height="30"
            className="h-[30px] w-[30px] rounded-[8px] ring-1 ring-hair-strong"
          />
          <span dir="ltr" className="text-[15px] font-semibold tracking-[0.14em]">{BRAND}</span>
        </Link>

        <ul className="ms-2 hidden flex-1 items-center gap-1 xl:flex">
          {ROUTES.map((route) => (
            <li key={route.id}>
              <RouteLink
                route={route}
                className={`inline-block whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] text-mute transition-colors duration-200 hover:bg-white/[0.06] hover:text-white ${FOCUS}`}
              />
            </li>
          ))}
        </ul>

        <div className="ms-auto flex items-center gap-2 xl:ms-0">
          <LanguageMenu align="end" />

          <a
            href={IOS_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={repoLabel}
            title={repoLabel}
            className={`hidden items-center gap-1.5 rounded-full border border-hair bg-white/[0.05] px-3 py-2 text-mute transition-colors duration-200 hover:border-hair-strong hover:text-white sm:inline-flex ${FOCUS}`}
          >
            <GitHubMark />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="navbar-drawer"
            aria-label={toggleLabel}
            title={toggleLabel}
            className={`inline-flex items-center gap-1.5 rounded-full border border-hair bg-white/[0.05] px-3 py-2 text-mute transition-colors duration-200 hover:border-hair-strong hover:text-white xl:hidden ${FOCUS}`}
          >
            <MenuBars open={open} />
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="navbar-drawer"
          role="group"
          aria-label={sectionsLabel}
          className="animate-rise-in border-t border-hair bg-ink/95 pb-4 backdrop-blur-xl xl:hidden"
        >
          <ul className="section-wrap grid gap-1 pt-3">
            {ROUTES.map((route) => (
              <li key={route.id}>
                <RouteLink
                  route={route}
                  onClick={close}
                  className={`block rounded-xl border border-transparent bg-white/[0.03] px-3 py-2.5 text-[14px] text-mute transition-colors hover:border-hair-strong hover:text-white ${FOCUS}`}
                />
              </li>
            ))}
          </ul>
          <div className="section-wrap mt-3 flex flex-wrap items-center gap-2">
            <p className="eyebrow w-full">{portalsLabel}</p>
            <a
              href={NODE_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-mesh px-4 py-2 text-[12.5px] ${FOCUS}`}
            >
              Mac Node
              <span className="text-mute">
                · <LtrText text={nodeCaption} />
              </span>
            </a>
            <a
              href={MP_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary px-4 py-2 text-[12.5px] ${FOCUS}`}
            >
              Service Suite
              <span className="text-mute">
                · <LtrText text={mpCaption} />
              </span>
            </a>
            <a
              href={BOT_STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-ghost px-4 py-2 text-[12.5px] ${FOCUS}`}
            >
              Bot Studio
              <span className="text-mute">
                · <LtrText text={studioCaption} />
              </span>
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
