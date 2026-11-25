import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SectionPointers } from "@/components/SectionPointers";
import { Footer } from "@/components/Footer";

/**
 * The homepage is now the portal's front door rather than the whole site: the
 * six capabilities, the security ledger, the ecosystem map and the download panel
 * are each a route of their own (`ROUTES` in `src/lib/site.ts`).
 *
 * Two things are kept deliberately: the section ids that used to live here, which
 * `SectionPointers` re-issues so an old `popopx.chat#security` bookmark still
 * lands somewhere readable, and the single-document rule that made this a static
 * export in the first place — seven HTML files, no router data, no server calls.
 */
export default function Page(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <HeroSection />
        <SectionPointers />
      </main>
      <Footer />
    </>
  );
}
