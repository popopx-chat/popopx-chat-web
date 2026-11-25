import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { EcosystemHub } from "@/components/EcosystemHub";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

/**
 * `/ecosystem/` — the four hosted portals and what each one is.
 *
 * `EcosystemHub` was the homepage's `#ecosystem` block; it moved here unchanged,
 * except for the Bot Studio row, which was re-measured on 2026-11-25 (ledger §15).
 */
export const metadata: Metadata = pageMetadata({
  path: "/ecosystem/",
  title: "生态 · 四个官方门户与自托管边界",
  description:
    "POPOPX 生态的实测清单：主站、Mac Node 门户、服务号套件门户与 Bot Studio 工作台，各自的域名、仓库与许可，以及终端与自托管服务之间的安全边界。",
});

export default function EcosystemPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <EcosystemHub />
      </main>
      <Footer />
    </>
  );
}
