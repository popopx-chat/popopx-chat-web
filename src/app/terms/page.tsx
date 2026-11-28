import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalPage } from "@/components/LegalPage";
import { TERMS_DOC } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

/**
 * `/terms/` — the terms of use App Store review requires at a public URL.
 *
 * Drafted from the client repository's `terms-of-use.md`; the governing-law
 * sentence the source still marks undecided is deliberately absent, because the
 * source itself forbids shipping a placeholder.
 */
export const metadata: Metadata = pageMetadata({
  path: "/terms/",
  title: "服务条款 · 许可、使用与内购",
  description:
    "POPOPX 服务条款（2026-11-28 生效）：客户端许可范围、设备与密钥责任、可接受使用、内购与订阅、内容与免责声明、责任限制及条款变更的完整文本。",
});

export default function TermsPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <LegalPage doc={TERMS_DOC} />
      </main>
      <Footer />
    </>
  );
}