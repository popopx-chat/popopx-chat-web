import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

/**
 * `/download/` — how the client is actually obtainable today.
 *
 * The store record still does not resolve (`resultCount: 0`, ledger §12), and the
 * standing ruling of 2026-11-16 forbids a badge, a store link or another project's
 * TestFlight code, so the page states the situation in words and puts a locally
 * drawn QR of this host beside it. The build panel moved to `/developers/`.
 */
export const metadata: Metadata = pageMetadata({
  path: "/download/",
  title: "下载 · 商店现状与 18 种界面语言",
  description:
    "POPOPX iOS 客户端目前还没有可用的商店链接，商店记录查询返回 resultCount: 0；本页说明现状，并给出客户端自带的 18 种本地化与站内二维码。",
});

export default function DownloadPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
