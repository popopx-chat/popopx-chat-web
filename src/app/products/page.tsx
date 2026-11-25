import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

/**
 * `/products/` — the six measured capabilities of the iOS client.
 *
 * The copy is the same `FEATURES` table the portal had as a homepage section;
 * the route split moved it here and made its heading the document's `<h1>`. The
 * homepage now points at this page instead of repeating it.
 */
export const metadata: Metadata = pageMetadata({
  path: "/products/",
  title: "产品 · iOS 客户端的六大核心能力",
  description:
    "POPOPX iOS 客户端的六项能力，逐条来自仓库源码：无全局 ID 的 identity、单向队列端到端加密、离线直连中继、本地媒体压缩并剥离元数据、签名的服务器配置更新、服务号与零知识频道。",
});

export default function ProductsPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <FeaturesGrid />
      </main>
      <Footer />
    </>
  );
}
