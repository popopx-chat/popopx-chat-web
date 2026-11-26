import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PortalCards } from "@/components/PortalCards";
import { EcosystemPanorama } from "@/components/EcosystemPanorama";
import { AiThreeLayers } from "@/components/AiThreeLayers";
import { UserScenariosGrid } from "@/components/UserScenariosGrid";
import { FeaturesGrid } from "@/components/FeaturesGrid";
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
 *
 * The scroll order is one funnel: what the portal is (`PortalCards` — four
 * entries, one per official product), how those four relate (`EcosystemPanorama`
 * — which links a source line backs and which are still plans), what that makes
 * possible in layers (`AiThreeLayers`), what it looks like on a Tuesday
 * (`UserScenariosGrid`), then the measured capability list and the route index.
 * `FeaturesGrid` is the compact variant here, so the homepage points at the full
 * ledger on `/features/` instead of shipping a second copy of it.
 */
export default function Page(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <HeroSection />
        <PortalCards />
        <EcosystemPanorama />
        <AiThreeLayers />
        <UserScenariosGrid />
        <FeaturesGrid variant="compact" />
        <SectionPointers />
      </main>
      <Footer />
    </>
  );
}
