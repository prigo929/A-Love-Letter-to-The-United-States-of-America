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
  getAllianceArchitecture,
  getGlobalBaseStats,
  getLogisticsBackbone,
  getRegionBriefs,
  getStrategicBases,
  getTheaterCards,
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

  const stats = getGlobalBaseStats(locale);
  const bases = getStrategicBases(locale);
  const regions = getRegionBriefs(locale);
  const theaters = getTheaterCards(locale);
  const nodes = getLogisticsBackbone(locale);
  const alliances = getAllianceArchitecture(locale);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <MilStyles />
      <GlobalBasesHero stats={stats} locale={locale} />
      <StrategicThesis locale={locale} />
      <GlobalCommandMap bases={bases} regions={regions} locale={locale} />
      <RegionalTheaterGrid theaters={theaters} locale={locale} />
      <BaseDossierSection bases={bases} locale={locale} />
      <LogisticsBackboneSection nodes={nodes} locale={locale} />
      <AllianceArchitectureSection alliances={alliances} locale={locale} />
      <GlobalBasesClosing locale={locale} />
    </main>
  );
}
