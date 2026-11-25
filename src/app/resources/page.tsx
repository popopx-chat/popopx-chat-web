import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

/**
 * `/resources/` — the documents that already exist.
 *
 * No whitepaper is listed because none is published: the word has no hit in the
 * client repository or any sibling (searched 2026-11-25). What the page does carry
 * is the file matrix behind it — root documents, the iOS spec folder, the
 * `popopxmq/protocol/` folder — each path checked against the GitHub contents API
 * and recorded in `docs/FACTS.md` §20.
 */
export const metadata: Metadata = pageMetadata({
  path: "/resources/",
  title: "资源 · 文档、许可与协议文件索引",
  description:
    "POPOPX 已发布的文件清单：客户端仓库的根文档与许可声明、apps/ios/spec 工程规格、popopxmq/protocol 协议规范，以及零追踪承诺原文。",
});

export default function ResourcesPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <ResourceLibrary />
      </main>
      <Footer />
    </>
  );
}
