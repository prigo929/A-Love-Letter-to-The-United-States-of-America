import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import {
  NavyCapabilityGrid,
  NavyClosing,
  NavyCommandStack,
  NavyFullscreenPanel,
  NavyFutureStack,
  NavyHero,
  NavyMetricStrip,
  NavyOperationalConsole,
  NavyPageProgress,
  NavyPlatformShowcase,
  NavyStyles,
} from "@/components/military/NavyPageComponents";
import {
  getNavyMetrics,
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

  const metrics = getNavyMetrics(locale);
  const capabilities = getNavyCapabilities(locale);
  const theaters = getNavyTheaters(locale);
  const platforms = getNavyPlatforms(locale);
  const layers = getNavyCommandLayers(locale);
  const programs = getNavyFuturePrograms(locale);
  const visualPanels = getNavyVisualPanels(locale);

  return (
    <div className="navy-page min-h-screen overflow-hidden bg-black text-white">
      <NavyStyles />
      <NavyPageProgress />
      <NavyHero metrics={metrics} imageSrc={SITE_IMAGES.navy.hero} locale={locale} />
      <NavyMetricStrip metrics={metrics} locale={locale} />
      <NavyCapabilityGrid capabilities={capabilities} locale={locale} />
      <NavyOperationalConsole theaters={theaters} locale={locale} />
      <NavyFullscreenPanel panel={visualPanels[0]} locale={locale} />
      <NavyPlatformShowcase platforms={platforms} locale={locale} />
      <NavyCommandStack layers={layers} locale={locale} />
      <NavyFullscreenPanel panel={visualPanels[1]} reverse locale={locale} />
      <NavyFutureStack programs={programs} locale={locale} />
      <NavyFullscreenPanel panel={visualPanels[2]} locale={locale} />
      <NavyClosing locale={locale} />
    </div>
  );
}
