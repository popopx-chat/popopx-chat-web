import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactElement, ReactNode } from "react";
import { LOCALES, HTML_LANG, DEFAULT_LOCALE } from "@/lib/locales";
import { LocaleProvider } from "@/lib/i18n";
import { SEO_DESCRIPTION, SEO_TITLE } from "@/lib/seo";
import { LocaleMeta } from "@/components/LocaleMeta";
import {
  BOT_STUDIO_URL,
  IOS_REPO_URL,
  MP_PORTAL_URL,
  MQ_REPO_URL,
  NODE_PORTAL_URL,
  SITE_ORIGIN,
  SITE_URL,
  SUITE_REPO_URL,
  NODE_REPO_URL,
  WEB_REPO_URL,
} from "@/lib/site";

/**
 * Root layout.
 *
 * The portal ships 21 interface languages: the 18 the POPOPX iOS client
 * declares in `CFBundleLocalizations`, plus `pt-BR`, `ko` and Arabic (RTL) —
 * see `src/lib/locales.ts`. This is a static export, so the seven routes are
 * seven HTML documents and the language switch happens client-side: metadata
 * and the document `<html lang>` are emitted for the default locale
 * (`zh-Hans`), a tiny pre-hydration script applies a stored choice before the
 * first paint (so an Arabic visitor never sees a flash of LTR), and
 * `LocaleProvider` keeps `lang`/`dir` in sync at runtime. `LocaleMeta` mirrors
 * the homepage title and description into the active language.
 * Nothing here reaches
 * the network: the icon set, the manifest and every font are same-origin
 * assets, and the only third-party origins mentioned below are `sameAs`
 * declarations in the structured-data block, which a browser never fetches.
 *
 * The `alternates` and `openGraph.url` below are the homepage's. Every other
 * route overrides its own canonical in `page.tsx` through `pageMetadata`
 * (`src/lib/seo.ts`); inheriting this one would make six documents claim to be
 * the homepage.
 */

/**
 * The crawl-facing strings. `LocaleMeta` renders the same `DEFAULT_LOCALE` slot
 * as the document `<title>` while the server is still composing the homepage, so
 * the exported HTML keeps a Simplified Chinese title and the six other routes
 * keep their own. The Hero prints that sentence back as `BRAND_POSITIONING`,
 * below the mission line and under its own `<h1>` — two literal 21-slot maps in
 * `src/lib/seo.ts`, updated together, so tab and first screen agree in every
 * language.
 */
const TITLE = SEO_TITLE[DEFAULT_LOCALE];

const DESCRIPTION = SEO_DESCRIPTION[DEFAULT_LOCALE];

/**
 * Runs before the first paint so a stored `ar` preference lands on the `<html>`
 * element without a flash of the zh-Hans/LTR document. The locale list and the
 * key are compile-time constants; the only input is localStorage, whose value
 * is checked against the same 21 tags `LocaleProvider` accepts.
 */
const LOCALE_BOOTSTRAP = `try{var l=localStorage.getItem("popopx.locale");if(l&&${JSON.stringify(LOCALES)}.indexOf(l)!==-1){document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr"}}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "POPOPX",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-popopx.png`,
  inLanguage: [...LOCALES],
  publisher: {
    "@type": "Organization",
    name: "POPOPX",
    url: SITE_URL,
    sameAs: [
      IOS_REPO_URL,
      WEB_REPO_URL,
      SUITE_REPO_URL,
      NODE_REPO_URL,
      MQ_REPO_URL,
      NODE_PORTAL_URL,
      MP_PORTAL_URL,
      BOT_STUDIO_URL,
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  // `default` is an empty string on purpose: `resolveTitle` turns it into an
  // empty `absolute`, and Next then renders no `<title>` at all, which leaves
  // `LocaleMeta` as the homepage's only title owner. Any real default would be
  // re-applied by Next's own metadata pass and lose the race against the
  // localized element. The `template` still shapes the six routes that set their
  // own title through `pageMetadata`.
  title: {
    default: "",
    template: "%s · POPOPX",
  },
  description: DESCRIPTION,
  applicationName: "POPOPX",
  authors: [{ name: "POPOPX", url: SITE_URL }],
  creator: "POPOPX",
  publisher: "POPOPX",
  keywords: [
    "POPOPX",
    "隐私优先",
    "智能连接平台",
    "端到端加密",
    "无全局 ID",
    "单向队列",
    "BLE 离线直连",
    "自托管",
    "AGPL-3.0",
    "iOS 客户端",
    "E2EE",
  ],
  alternates: {
    canonical: `${SITE_ORIGIN}/`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_ORIGIN}/`,
    siteName: "POPOPX",
    locale: "zh_CN",
    title: TITLE,
    description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo-popopx.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/logo-popopx-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  other: {
    // Local-only guarantees a privacy-minded visitor may actually check.
    referrer: "no-referrer",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07080D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang={HTML_LANG[DEFAULT_LOCALE]} dir="ltr" suppressHydrationWarning>
      <body>
        <script
          // The value is a constant built above: no user input reaches this
          // string, and localStorage is read-only here.
          dangerouslySetInnerHTML={{ __html: LOCALE_BOOTSTRAP }}
        />
        <script
          type="application/ld+json"
          // The object above is built from `src/lib/site.ts` constants only —
          // no user input, no markup, so serialising it is not an injection
          // surface. `next/script` cannot be used here: this must be in the
          // initial HTML for crawlers reading the static export.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LocaleProvider>
          <LocaleMeta />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
