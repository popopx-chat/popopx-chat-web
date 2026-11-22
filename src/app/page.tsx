import type { ReactElement } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { SecurityArchitecture } from "@/components/SecurityArchitecture";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { EcosystemHub } from "@/components/EcosystemHub";
import { DownloadAndBuildSection } from "@/components/DownloadAndBuildSection";
import { Footer } from "@/components/Footer";

/**
 * The portal is a single page: every module is an anchored section, so the
 * navbar links are plain `#hash` jumps and the 18-language switch costs no
 * navigation. That is what keeps the static export to one HTML document with no
 * router, no server calls and no reload.
 *
 * Section order and ids are declared once, in `NAV_SECTIONS`
 * (`src/lib/site.ts`); the five ids below are those entries.
 */
export default function Page(): ReactElement {
  return (
    <>
      <Navbar />
      <main id="top">
        <HeroSection />
        <FeaturesGrid />
        <SecurityArchitecture />
        <ComparisonMatrix />
        <EcosystemHub />
        <DownloadAndBuildSection />
      </main>
      <Footer />
    </>
  );
}
