import type { Metadata } from "next";
import { SITE_ORIGIN } from "./site";

/**
 * Per-route document metadata.
 *
 * `layout.tsx` declares `alternates.canonical: SITE_URL`, and Next inherits
 * layout metadata into every page — so without an override all seven documents
 * would claim to be the homepage. `pageMetadata` is the one place a route
 * states its own canonical and `og:url`; every `page.tsx` calls it, which is
 * also what `tools/check-links.mjs` asserts (one `<loc>` per canonical).
 *
 * The strings are Simplified Chinese only, deliberately. A static export has
 * one HTML document per route: the language switch happens client-side from
 * `localStorage`, so the crawler never sees 17 other titles. Nothing here is
 * translated, and the pages must not be described as multilingual in `sitemap`
 * or hreflang terms — there is nothing to point at.
 */

const TITLE_SUFFIX = " · POPOPX";

export function pageMetadata({
  path,
  title,
  description,
  keywords,
}: {
  /** Route path with the trailing slash `next.config.mjs` requires. */
  path: string;
  /** Simplified Chinese heading, rendered as `<%- title %> · POPOPX`. */
  title: string;
  /** Simplified Chinese summary for search results and link unfurlers. */
  description: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_ORIGIN}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "POPOPX",
      locale: "zh_CN",
      title: `${title}${TITLE_SUFFIX}`,
      description,
      images: [
        {
          url: "/logo-popopx.png",
          width: 1024,
          height: 1024,
          alt: "POPOPX",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title}${TITLE_SUFFIX}`,
      description,
      images: ["/logo-popopx.png"],
    },
    ...(keywords ? { keywords } : {}),
  };
}
