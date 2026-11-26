import type { Metadata } from "next";
import type { ReactElement } from "react";
import { InviteCard } from "@/components/InviteCard";
import { pageMetadata } from "@/lib/seo";

/**
 * `/i/v1/` — the invitation landing page.
 *
 * An invitation is published as `https://popopx.chat/i/v1/<code>`, so this route
 * is what a browser opens when the phone or laptop has no client installed to
 * claim the link. Before it existed, that tap returned `404.html`.
 *
 * Two things make the route work as a *static* page:
 *  - Nginx serves `out/i/v1/index.html` for every `/i/v1/<segment>` (`location
 *    ^~ /i/v1/` in `deploy/centos/nginx-popopx-main.conf`) and turns its access
 *    log off for the whole prefix, so the code is not written to disk on the
 *    host either. The export cannot express that itself: a dynamic segment with
 *    `output: "export"` needs `generateStaticParams`, and an invitation code is
 *    exactly the value this portal must never enumerate at build time.
 *  - `robots: noindex` plus `Disallow: /i/v1/` in `public/robots.txt`, because a
 *    bridge page is not content worth indexing, and `tools/check-links.mjs`
 *    exempts it from sitemap parity for the same reason.
 *
 * `LocaleMeta` renders a `<title>` only on `/`, so this document keeps the head
 * `pageMetadata` writes — Simplified Chinese, like the other six routes, for the
 * reason in `src/lib/seo.ts`: one exported HTML document, one indexed title.
 */
export const metadata: Metadata = {
  ...pageMetadata({
    path: "/i/v1/",
    title: "加密邀请链接",
    description:
      "POPOPX 加密邀请链接的落地页：邀请码密封在链接里，本页不加载外部内容、不把邀请码发给任何后端，服务器也不记录这个地址。可唤起客户端、复制链接或前往下载。",
  }),
  robots: { index: false, follow: true },
};

export default function InvitePage(): ReactElement {
  return <InviteCard />;
}
