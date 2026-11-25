import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { SecurityArchitecture } from "@/components/SecurityArchitecture";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

/**
 * `/security/` — the portal's evidence page, moved out of the homepage in full.
 *
 * Both sections came over as they were: the five-stage device-to-relay flow, the
 * cryptography table, the relay-side field list, and the comparison matrix. Every
 * `file:line` on this page resolves in the client repository through
 * `docs/FACTS.md`; `npm run check:facts` re-reads each anchor, so a moved line
 * number fails the build instead of shipping a stale claim.
 *
 * `SecurityArchitecture` owns the `<h1>`; the matrix keeps its own `id` so the
 * fragment the homepage used to link still names the same block.
 */
export const metadata: Metadata = pageMetadata({
  path: "/security/",
  title: "隐私与安全 · 逐行可回源的实现证据",
  description:
    "POPOPX 的隐私与安全基线，全部标注客户端仓库的 file:line：消息链路各段持有什么、密码学原语用在哪、中继为什么拿不到社交图谱，以及其他方案的对照表。",
});

export default function SecurityPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <SecurityArchitecture />
        <ComparisonMatrix />
      </main>
      <Footer />
    </>
  );
}
