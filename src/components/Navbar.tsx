"use client";

import { useCallback, useEffect, useRef, useState, type ReactElement } from "react";
import { useCopy, type Localized } from "@/lib/i18n";
import { LanguageMenu } from "@/components/LanguageMenu";
import {
  BOT_STUDIO_URL,
  IOS_REPO_URL,
  MP_PORTAL_URL,
  NAV_SECTIONS,
  NODE_PORTAL_URL,
  type NavSectionId,
} from "@/lib/site";

/**
 * Sticky glass navbar.
 *
 * Honest constraints this file keeps:
 *  - Every in-page link is a plain `#hash` jump: no router, no history API, no
 *    scroll listener. The portal is one anchored page, so the browser does the
 *    work and the static export stays a single HTML document.
 *  - There is deliberately no active-section highlight. That would need an
 *    IntersectionObserver over the sections, and this bar does not run one, so
 *    it never claims to know where you are.
 *  - The only image is the same-origin official logo (`/logo-popopx.png`, a
 *    byte-for-byte copy of the iOS app icon). No webfont, no icon font, no CDN:
 *    the GitHub, menu and chevron glyphs are inline SVG.
 *  - The ecosystem chips point at the *other* POPOPX properties: the three hosted
 *    sibling portals. They are navigation, so nothing is
 *    loaded from another origin.
 *  - Copy is authored in all 18 locales the engine declares, typed as a total
 *    `Localized<string>` map, so the compiler rejects a missing variant.
 */

const SECTION_LABELS: Record<NavSectionId, Localized<string>> = {
  features: {
    en: "Core features",
    ru: "Ключевые возможности",
    de: "Kernfunktionen",
    fr: "Fonctionnalités clés",
    it: "Funzionalità principali",
    nl: "Kernfuncties",
    cs: "Klíčové funkce",
    "zh-Hans": "核心功能",
    "zh-Hant": "核心功能",
    es: "Funciones principales",
    pl: "Funkcje główne",
    ja: "コア機能",
    th: "ฟีเจอร์หลัก",
    fi: "Keskeiset",
    uk: "Ключові можливості",
    bg: "Основни функции",
    tr: "Temel özellikler",
    hu: "Alapfunkciók",
  },
  security: {
    en: "Security",
    ru: "Безопасность",
    de: "Sicherheit",
    fr: "Sécurité",
    it: "Sicurezza",
    nl: "Beveiliging",
    cs: "Zabezpečení",
    "zh-Hans": "安全壁垒",
    "zh-Hant": "安全壁壘",
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
  comparison: {
    en: "Architecture",
    ru: "Архитектура",
    de: "Architektur",
    fr: "Architecture",
    it: "Architettura",
    nl: "Architectuur",
    cs: "Architektura",
    "zh-Hans": "架构优势",
    "zh-Hant": "架構優勢",
    es: "Arquitectura",
    pl: "Architektura",
    ja: "アーキテクチャ",
    th: "สถาปัตยกรรม",
    fi: "Arkkitehtuuri",
    uk: "Архітектура",
    bg: "Архитектура",
    tr: "Mimari",
    hu: "Architektúra",
  },
  ecosystem: {
    en: "Ecosystem",
    ru: "Экосистема",
    de: "Ökosystem",
    fr: "Écosystème",
    it: "Ecosistema",
    nl: "Ecosysteem",
    cs: "Ekosystém",
    "zh-Hans": "全景生态",
    "zh-Hant": "全景生態",
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
  download: {
    en: "Download & source",
    ru: "Загрузки и код",
    de: "Download & Quellcode",
    fr: "Téléchargement et code",
    it: "Download e codice",
    nl: "Download en broncode",
    cs: "Stahování a kód",
    "zh-Hans": "下载与开源",
    "zh-Hant": "下載與開源",
    es: "Descarga y código",
    pl: "Pobieranie i kod",
    ja: "ダウンロードとソース",
    th: "ดาวน์โหลดและซอร์ส",
    fi: "Lataus ja lähdekoodi",
    uk: "Завантаження й код",
    bg: "Изтегляне и код",
    tr: "İndir ve kaynak",
    hu: "Letöltés és forrás",
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

/** One nav entry: a plain anchor jump whose label comes from the locale engine. */
function SectionLink({
  id,
  onClick,
  className,
}: {
  id: NavSectionId;
  onClick?: () => void;
  className: string;
}): ReactElement {
  const label = useCopy(SECTION_LABELS[id]);
  return (
    <a href={`#${id}`} onClick={onClick} className={className}>
      {label}
    </a>
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
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:border focus:border-brand/60 focus:bg-ink focus:px-3 focus:py-1.5 focus:text-[12px] focus:text-white ${FOCUS}`}
      >
        {skip}
      </a>

      <nav
        ref={rootRef}
        aria-label={sectionsLabel}
        className="section-wrap flex h-[64px] items-center gap-2 sm:gap-3"
      >
        <a
          href="#top"
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
          <span className="text-[15px] font-semibold tracking-[0.14em]">{BRAND}</span>
        </a>

        <ul className="ml-2 hidden flex-1 items-center gap-1 xl:flex">
          {NAV_SECTIONS.map((section) => (
            <li key={section.id}>
              <SectionLink
                id={section.id}
                className={`inline-block whitespace-nowrap rounded-full px-3 py-2 text-[13px] text-mute transition-colors duration-200 hover:bg-white/[0.06] hover:text-white ${FOCUS}`}
              />
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          {/* The bar is capped at 1180px by `section-wrap`, so its width does not
              grow with the viewport: once the five section links are inline, the
              sibling chips cannot also fit — German and Russian need the room and
              the language trigger would be squeezed instead. The three chips
              therefore live in the bar up to `xl` and in the drawer below it,
              while the ecosystem section and the footer carry them always. The
              chip labels are locale-free host names and product names, so only
              their `title` text changes with the language: the row measures the
              same in all 18 tongues. */}
          <div
            role="group"
            aria-label={portalsLabel}
            className="hidden items-center gap-1.5 md:flex xl:hidden"
          >
            <a
              href={NODE_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={nodeCaption}
              className={`chip text-mute transition-colors hover:border-mesh/50 hover:text-white ${FOCUS}`}
            >
              Mac&nbsp;Node
            </a>
            <a
              href={MP_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={mpCaption}
              className={`chip text-mute transition-colors hover:border-brand/50 hover:text-white ${FOCUS}`}
            >
              Service&nbsp;Suite
            </a>
            <a
              href={BOT_STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={studioCaption}
              className={`chip text-mute transition-colors hover:border-brand/50 hover:text-white ${FOCUS}`}
            >
              Bot&nbsp;Studio
            </a>
          </div>

          <LanguageMenu align="right" />

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
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <SectionLink
                  id={section.id}
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
              <span className="text-mute">· {nodeCaption}</span>
            </a>
            <a
              href={MP_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary px-4 py-2 text-[12.5px] ${FOCUS}`}
            >
              Service Suite
              <span className="text-mute">· {mpCaption}</span>
            </a>
            <a
              href={BOT_STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-ghost px-4 py-2 text-[12.5px] ${FOCUS}`}
            >
              Bot Studio
              <span className="text-mute">· {studioCaption}</span>
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
