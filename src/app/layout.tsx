import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactElement, ReactNode } from "react";
import { LOCALES, HTML_LANG, DEFAULT_LOCALE } from "@/lib/locales";
import { LocaleProvider } from "@/lib/i18n";
import {
  IOS_REPO_URL,
  MP_PORTAL_URL,
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
 * The portal ships the same 18 languages as the POPOPX iOS client (see
 * `src/lib/i18n.tsx`). Because this is a static export only ONE HTML document
 * exists: the language switch happens client-side, so metadata and the document
 * `<html lang>` are emitted for the default locale (`zh-Hans`) and
 * `LocaleProvider` keeps `lang`/`dir` in sync at runtime. Nothing here reaches
 * the network: the icon set, the manifest and every font are same-origin
 * assets, and the only third-party origins mentioned below are `sameAs`
 * declarations in the structured-data block, which a browser never fetches.
 */

const TITLE = "POPOPX · 无全局 ID 的端到端加密通讯与自托管商业网络";

const DESCRIPTION =
  "POPOPX 官方主站：iOS 旗舰客户端，不绑定手机号、邮箱或任何全局 ID；单向队列端到端加密、无网环境 BLE 直连中继、本地压缩并剥离 EXIF/GPS、Ed25519 签名的服务器配置热更新，AGPL-3.0 全栈开源、零追踪。";

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
      NODE_PORTAL_URL,
      MP_PORTAL_URL,
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: TITLE,
    template: "%s · POPOPX",
  },
  description: DESCRIPTION,
  applicationName: "POPOPX",
  authors: [{ name: "POPOPX", url: SITE_URL }],
  creator: "POPOPX",
  publisher: "POPOPX",
  keywords: [
    "POPOPX",
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
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
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
          type="application/ld+json"
          // The object above is built from `src/lib/site.ts` constants only —
          // no user input, no markup, so serialising it is not an injection
          // surface. `next/script` cannot be used here: this must be in the
          // initial HTML for crawlers reading the static export.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
