"use client";

import { useEffect, type ReactElement } from "react";
import { usePathname } from "next/navigation";
import { SEO_DESCRIPTION, SEO_TITLE } from "@/lib/seo";
import { useCopy } from "@/lib/i18n";

/**
 * Mirrors the homepage document head into the active interface language.
 *
 * The static export can only ship one title per document, so what a crawler
 * indexes is the document Next emitted — and Next re-applies that document title
 * in the commit after any state change, so an imperative `document.title = …`
 * loses the race roughly once in thirty page loads. Rendering the `<title>` here
 * instead puts the localized value *inside* React's own head, which is also how
 * the exported HTML gets its Simplified Chinese title in the first place: this
 * component is mounted in the root layout, so it renders on the server too.
 *
 * The layout therefore declares an empty `metadata.title.default`, which makes
 * Next emit no `<title>` for the homepage at all; the six other routes keep their
 * own titles through `pageMetadata`, and this element renders only on the homepage
 * so it cannot overwrite a route that never asked for it. The meta description is
 * written imperatively because Next only re-applies the title.
 * `og:title`/`twitter:title` stay as rendered, because a link unfurler crawls the
 * document, not a session.
 */
export function LocaleMeta(): null | ReactElement {
  const pathname = usePathname();
  const title = useCopy(SEO_TITLE);
  const description = useCopy(SEO_DESCRIPTION);
  const home = pathname === "/";

  useEffect(() => {
    if (!home) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [home, description]);

  return home ? <title>{title}</title> : null;
}
