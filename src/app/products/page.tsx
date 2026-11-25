import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductMatrix } from "@/components/ProductMatrix";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

/**
 * `/products/` — the six public repositories and the six measured capabilities of the iOS client.
 *
 * The ProductMatrix shows the six repos with manually written descriptions.
 * The FeaturesGrid shows the six measured capabilities from the iOS client source.
 */
export const metadata: Metadata = pageMetadata({
  path: "/products/",
  title: "产品 · 六大仓库与 iOS 客户端核心能力",
  description:
    "POPOPX 六大公开仓库矩阵与 iOS 客户端六项核心能力，逐条来自仓库源码：无全局 ID 的 identity、单向队列端到端加密、离线直连中继、本地媒体压缩并剥离元数据、签名的服务器配置更新、服务号与零知识频道。",
});

export default function ProductsPage(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <ProductMatrix />
        <FeaturesGrid variant="full" />
      </main>
      <Footer />
    </>
  );
}
