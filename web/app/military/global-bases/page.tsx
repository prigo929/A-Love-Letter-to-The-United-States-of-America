import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { MilStyles } from "@/components/military/MilitaryAnimations";
import {
  AllianceArchitectureSection,
  BaseDossierSection,
  GlobalBasesClosing,
  GlobalBasesHero,
  GlobalCommandMap,
  LogisticsBackboneSection,
  RegionalTheaterGrid,
  StrategicThesis,
} from "@/components/military/GlobalBasesComponents";
import {
  allianceArchitecture,
  globalBaseStats,
  logisticsBackbone,
  regionBriefs,
  strategicBases,
  theaterCards,
} from "@/lib/data/global-bases-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Global Bases | Military",
  description:
    "A strategic briefing on the United States global base network: forward posture, logistics, alliances, TRANSCOM, and rapid-response power projection.",
  openGraph: {
    title: "Global Bases | Military",
    description:
      "The U.S. global base network as a logistics, deterrence, and alliance architecture.",
    images: [{ url: SITE_IMAGES.homeUsaAtNightFromSpace, width: 1200, height: 630 }],
  },
};

export default async function GlobalBasesPage() {
  const locale = await getServerLocale();

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <MilStyles />
      <GlobalBasesHero stats={globalBaseStats} locale={locale} />
      <StrategicThesis locale={locale} />
      <GlobalCommandMap bases={strategicBases} regions={regionBriefs} locale={locale} />
      <RegionalTheaterGrid theaters={theaterCards} locale={locale} />
      <BaseDossierSection bases={strategicBases} locale={locale} />
      <LogisticsBackboneSection nodes={logisticsBackbone} locale={locale} />
      <AllianceArchitectureSection alliances={allianceArchitecture} locale={locale} />
      <GlobalBasesClosing locale={locale} />
    </main>
  );
}
