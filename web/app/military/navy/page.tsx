import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import {
  NavyCapabilityGrid,
  NavyClosing,
  NavyCommandStack,
  NavyFullscreenPanel,
  NavyFutureStack,
  NavyMetricStrip,
  NavyOperationalConsole,
  NavyPageProgress,
  NavyPlatformShowcase,
  NavyStyles,
  NavyWeaponsConsole,
  NavyFlyNavyVideo,
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
      <NavyPageProgress />
      <ParallaxMilitaryHero
        imageSrc={SITE_IMAGES.navy.hero}
        imageAlt="U.S. Navy aircraft carrier in cinematic light"
        title={locale === "ro" ? "DOMINAȚIE MARITIMĂ" : "MARITIME DOMINANCE"}
        subtitle={locale === "ro" ? "MARINA STATELOR UNITE · DOMINAȚIE MARITIMĂ GLOBALĂ ȘI PROIECTARE DE FORȚĂ" : "UNITED STATES NAVY · GLOBAL MARITIME DOMINANCE & PROJECTED POWER"}
        tagline={locale === "ro" ? "POZIȚIONAT ÎNAINTE · SEMPER FORTIS · PREGĂTIT DE LUPTĂ" : "FORWARD DEPLOYED · SEMPER FORTIS · READY ON ARRIVAL"}
        stats={heroStats}
      />
      <NavyMetricStrip metrics={secondaryMetrics} locale={locale} />
      <NavyCapabilityGrid capabilities={capabilities} locale={locale} />
      <NavyOperationalConsole theaters={theaters} locale={locale} />
      <NavyFullscreenPanel panel={visualPanels[0]} locale={locale} />
      <NavyPlatformShowcase platforms={platforms} locale={locale} />
      <NavyFlyNavyVideo locale={locale} />
      <NavyWeaponsConsole locale={locale} />
      <NavyCommandStack layers={layers} locale={locale} />
      <NavyFullscreenPanel panel={visualPanels[1]} reverse locale={locale} />
      <NavyFutureStack programs={programs} locale={locale} />
      <NavyFullscreenPanel panel={visualPanels[2]} locale={locale} />
      <NavyClosing locale={locale} />
    </div>
  );
}
