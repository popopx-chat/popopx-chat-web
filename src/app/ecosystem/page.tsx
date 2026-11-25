import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { EcosystemHub } from "@/components/EcosystemHub";
import { ArchitectureLayers } from "@/components/ArchitectureLayers";
import { AgentProtocol } from "@/components/AgentProtocol";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

/**
 * `/ecosystem/` — the four hosted portals, six-layer architecture, and agent protocol status.
 *
 * `EcosystemHub` was the homepage's `#ecosystem` block; it moved here unchanged,
 * except for the Bot Studio row, which was re-measured on 2026-11-25 (ledger §15).
 * `ArchitectureLayers` shows the six-layer stack from experience to crypto foundation.
 * `AgentProtocol` shows SMP Agent Protocol status and PAP planning direction.
 */
export const metadata: Metadata = pageMetadata({
  path: "/ecosystem/",
  title: "生态 · 四端协同、六层架构与 Agent 协议",
  description:
    "POPOPX 生态的实测清单：四个官方门户与自托管边界、六层架构（体验层到密码学底座）、SMP Agent 协议状态与 PAP 规划方向。",
});

export default function EcosystemPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <EcosystemHub />
        <ArchitectureLayers />
        <AgentProtocol />
      </main>
      <Footer />
    </>
  );
}
