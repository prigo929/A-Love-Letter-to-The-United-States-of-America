import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import {
  NavyAirWingComposition,
  NavyBasesSection,
  NavyCapabilityGrid,
  NavyClosing,
  NavyCommandStack,
  NavyFleetComparisonSection,
  NavyFullscreenPanel,
  NavyFutureStack,
  NavyHeritageTimeline,
  NavyHumanitarianSection,
  NavyMetricStrip,
  NavyOperationalConsole,
  NavyPlatformShowcase,
  NavySpecWarSection,
  NavyStyles,
  NavyWeaponsConsole,
  NavyFlyNavyVideo,
  NavySectionDivider,
} from "@/components/military/NavyPageComponents";
import {
  ParallaxMilitaryHero,
  MilStyles,
} from "@/components/military/MilitaryAnimations";
import {
  getNavySecondaryMetrics,
  getNavyCapabilities,
  getNavyPlatforms,
  getNavyCommandLayers,
  getNavyTheaters,
  getNavyFuturePrograms,
  getNavyVisualPanels,
  getNavyFleetComparison,
  getNavyHeritageTimeline,
  getNavySpecWarUnits,
  getNavyAirWing,
  getNavyBases,
  getNavyHumanitarianMissions,
} from "@/lib/data/navy-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "United States Navy",
  description:
    "A cinematic, defense-tech exploration of the United States Navy: carrier strike groups, undersea deterrence, Aegis combat systems, naval aviation, and future autonomous fleets.",
  openGraph: {
    title: "United States Navy",
    description:
      "Sea control, carrier aviation, undersea dominance, missile defense, and future autonomous fleets.",
    images: [{ url: SITE_IMAGES.navy.hero, width: 1200, height: 630 }],
  },
};

export default async function NavyPage() {
  const locale = await getServerLocale();

  const secondaryMetrics = getNavySecondaryMetrics(locale);
  const capabilities = getNavyCapabilities(locale);
  const theaters = getNavyTheaters(locale);
  const platforms = getNavyPlatforms(locale);
  const layers = getNavyCommandLayers(locale);
  const programs = getNavyFuturePrograms(locale);
  const visualPanels = getNavyVisualPanels(locale);
  const fleetComparison = getNavyFleetComparison(locale);
  const heritageTimeline = getNavyHeritageTimeline(locale);
  const specWarUnits = getNavySpecWarUnits(locale);
  const airWing = getNavyAirWing(locale);
  const bases = getNavyBases(locale);
  const humanitarianMissions = getNavyHumanitarianMissions(locale);

  const heroStats = locale === "ro"
    ? [
        { value: "11", label: "PORTAVIOANE NUCLEARE" },
        { value: "14", label: "SSBN-URI STRATEGICE" },
        { value: "290+", label: "NAVE DE LUPTĂ ACTIVE" },
        { value: "3.700+", label: "AERONAVE DE FLOTĂ" }
      ]
    : [
        { value: "11", label: "NUCLEAR CARRIERS" },
        { value: "14", label: "STRATEGIC SSBNS" },
        { value: "290+", label: "BATTLE FORCE SHIPS" },
        { value: "3,700+", label: "FLEET AIRCRAFT" }
      ];

  return (
    <div className="navy-page min-h-screen overflow-hidden bg-black text-white">
      <MilStyles />
      <NavyStyles />
      
      <ParallaxMilitaryHero
        imageSrc={SITE_IMAGES.navy.hero}
        imageAlt="U.S. Navy aircraft carrier in cinematic light"
        videoSrc="/videos/military/fly-navy.mp4"
        title={locale === "ro" ? "DOMINAȚIE MARITIMĂ" : "MARITIME DOMINANCE"}
        subtitle={locale === "ro" ? "MARINA STATELOR UNITE · DOMINAȚIE MARITIMĂ GLOBALĂ ȘI PROIECTARE DE FORȚĂ" : "UNITED STATES NAVY · GLOBAL MARITIME DOMINANCE & PROJECTED POWER"}
        tagline={locale === "ro" ? "POZIȚIONAT ÎNAINTE · SEMPER FORTIS · PREGĂTIT DE LUPTĂ" : "FORWARD DEPLOYED · SEMPER FORTIS · READY ON ARRIVAL"}
        stats={heroStats}
        heightClass="h-[135dvh]"
      />
      
      <NavyMetricStrip metrics={secondaryMetrics} locale={locale} />
      
      <NavySectionDivider />
      
      <NavyFleetComparisonSection data={fleetComparison} locale={locale} />
      
      <NavySectionDivider />
      
      <NavyCapabilityGrid capabilities={capabilities} locale={locale} />
      
      <NavyFlyNavyVideo locale={locale} />
      
      <NavyAirWingComposition squadrons={airWing} locale={locale} />
      
      <NavySectionDivider />
      
      <NavyOperationalConsole theaters={theaters} locale={locale} />
      
      <NavyBasesSection bases={bases} locale={locale} />
      
      <NavyFullscreenPanel panel={visualPanels[0]} locale={locale} />
      
      <NavySectionDivider />
      
      <NavyPlatformShowcase platforms={platforms} locale={locale} />
      
      <NavyWeaponsConsole locale={locale} />
      
      <NavyCommandStack layers={layers} locale={locale} />
      
      <NavySectionDivider />
      
      <NavyHeritageTimeline events={heritageTimeline} locale={locale} />
      
      <NavyFullscreenPanel panel={visualPanels[1]} reverse locale={locale} />
      
      <NavySectionDivider />
      
      <NavyFutureStack programs={programs} locale={locale} />
      
      <NavySpecWarSection units={specWarUnits} locale={locale} />
      
      <NavySectionDivider />
      
      <NavyHumanitarianSection missions={humanitarianMissions} locale={locale} />
      
      <NavyFullscreenPanel panel={visualPanels[2]} locale={locale} />
      
      <NavyClosing locale={locale} />
    </div>
  );
}
