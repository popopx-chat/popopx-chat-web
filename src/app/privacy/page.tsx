import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY_DOC } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

/**
 * `/privacy/` — the privacy policy App Store review requires at a public URL.
 *
 * The text is the client repository's `PRIVACY.md` as it stands today, in the
 * two languages the source itself publishes (English and Simplified Chinese);
 * internal status tags and file paths are left out, and no claim is added.
 */
export const metadata: Metadata = pageMetadata({
  path: "/privacy/",
  title: "隐私政策 · 不收费、不追踪、不建社交图谱",
  description:
    "POPOPX 隐私政策（2026-11-28 生效）：不要求手机号或邮箱，不接入第三方分析或追踪器；逐项说明中继可见的元数据、端侧存储、推送唤醒、语音通话与内购分别经手什么数据。",
});

export default function PrivacyPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <LegalPage doc={PRIVACY_DOC} />
      </main>
      <Footer />
    </>
  );
}