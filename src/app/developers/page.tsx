import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { DeveloperGuide } from "@/components/DeveloperGuide";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

/**
 * `/developers/` — build the client from public source, and the published tree.
 *
 * `DeveloperGuide` is the panel that used to sit inside the download section of
 * the homepage, plus the repository list. Its server-side config engine is marked
 * 开发中 / 源码待公开: the client half is in the shipped Swift, the repository for
 * the other half answered 404 on 2026-11-25 (ledger §15), so the page describes the
 * capability and links nothing.
 */
export const metadata: Metadata = pageMetadata({
  path: "/developers/",
  title: "开发者 · 从公开源码构建与仓库清单",
  description:
    "POPOPX 的构建入口：iOS 客户端的部署目标、Swift 版本、CI 原始命令与共享 scheme，以及八个已公开仓库的地址。服务端配置引擎标注为源码待公开。",
});

export default function DevelopersPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <DeveloperGuide />
      </main>
      <Footer />
    </>
  );
}
