import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import {
  AirForceBasesSection,
  AirForceCapabilityGrid,
  AirForceClosing,
  AirForceFleetComparisonSection,
  AirForceFullBleed,
  AirForceFutureStack,
  AirForceHeritageTimeline,
  AirForceMetricStrip,
  AirForceOperationalConsole,
  AirForcePageProgress,
  AirForcePlatformShowcase,
  AirForceStyles,
} from "@/components/military/AirForcePageComponents";
import {
  ParallaxMilitaryHero,
  MilStyles,
} from "@/components/military/MilitaryAnimations";
import {
  getAirForceMetrics,
  getAirForceCapabilities,
  getAirForcePlatforms,
  getAirForceTheaters,
  getAirForceHeritageTimeline,
  getAirForceFleetComparison,
  getAirForceFuturePrograms,
  getAirForceBases,
} from "@/lib/data/airforce-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "United States Air Force",
  description:
    "A cinematic, defense-tech exploration of the United States Air Force: air superiority, global strike, stealth bombers, rapid mobility, nuclear deterrence, and next-generation autonomous warfare.",
  openGraph: {
    title: "United States Air Force",
    description:
      "Air supremacy, global strike, stealth technology, rapid mobility, nuclear deterrence, and NGAD-era autonomous platforms.",
    images: [{ url: SITE_IMAGES.airForce.hero, width: 1200, height: 630 }],
  },
};

export default async function AirForcePage() {
  const locale = await getServerLocale();

  const metrics = getAirForceMetrics(locale);
  const capabilities = getAirForceCapabilities(locale);
  const platforms = getAirForcePlatforms(locale);
  const theaters = getAirForceTheaters(locale);
  const heritageTimeline = getAirForceHeritageTimeline(locale);
  const fleetComparison = getAirForceFleetComparison(locale);
  const futurePrograms = getAirForceFuturePrograms(locale);
  const bases = getAirForceBases(locale);

  const heroStats = locale === "ro"
    ? [
        { value: "5.217", label: "AERONAVE ACTIVE" },
        { value: "400", label: "ICBM-URI ÎN ALERTĂ" },
        { value: "140", label: "BOMBARDIERE STRATEGICE" },
        { value: "329K", label: "AVIATORI ACTIVI" },
      ]
    : [
        { value: "5,217", label: "ACTIVE AIRCRAFT" },
        { value: "400", label: "ICBMs ON ALERT" },
        { value: "140", label: "STRATEGIC BOMBERS" },
        { value: "329K", label: "ACTIVE AIRMEN" },
      ];

  return (
    <div className="af-page min-h-screen overflow-hidden bg-black text-white">
      <MilStyles />
      <AirForceStyles />
      <AirForcePageProgress />

      <ParallaxMilitaryHero
        imageSrc={SITE_IMAGES.airForce.hero}
        imageAlt="U.S. Air Force jets in cinematic light"
        title={locale === "ro" ? "SUPREMAȚIE AERIANĂ" : "AIR SUPREMACY"}
        subtitle={locale === "ro" ? "FORȚELE AERIENE ALE STATELOR UNITE · DOMINANȚĂ AERIANĂ GLOBALĂ ȘI LOVITURĂ DE PRECIZIE" : "UNITED STATES AIR FORCE · GLOBAL AIR DOMINANCE & PRECISION STRIKE"}
        tagline={locale === "ro" ? "ÎNTOTDEAUNA DEASUPRA · AIM HIGH · FLY-FIGHT-WIN" : "ALWAYS ABOVE · AIM HIGH · FLY-FIGHT-WIN"}
        stats={heroStats}
      />

      <AirForceMetricStrip metrics={metrics} locale={locale} />
      <AirForceFleetComparisonSection data={fleetComparison} locale={locale} />

      <AirForceFullBleed
        imageSrc={SITE_IMAGES.airForce.f22Formation}
        imageAlt="F-22 Raptors in formation flight"
        caption={locale === "ro" ? "F-22 RAPTOR · SUPERIORITATE AERIANĂ ABSOLUTĂ" : "F-22 RAPTOR · ABSOLUTE AIR SUPERIORITY"}
      />

      <AirForceCapabilityGrid capabilities={capabilities} locale={locale} />
      <AirForceOperationalConsole theaters={theaters} locale={locale} />

      <AirForceFullBleed
        imageSrc={SITE_IMAGES.airForce.b21}
        imageAlt="B-21 Raider stealth bomber"
        caption={locale === "ro" ? "B-21 RAIDER · CEL MAI AVANSAT BOMBARDIER STEALTH DIN LUME" : "B-21 RAIDER · THE WORLD'S MOST ADVANCED STEALTH BOMBER"}
      />

      <AirForcePlatformShowcase platforms={platforms} locale={locale} />
      <AirForceHeritageTimeline events={heritageTimeline} locale={locale} />

      <AirForceFullBleed
        imageSrc={SITE_IMAGES.airForce.c130}
        imageAlt="C-130 Hercules dirt takeoff"
        caption={locale === "ro" ? "C-130 HERCULES · MOBILITATE GLOBALĂ RAPIDĂ" : "C-130 HERCULES · RAPID GLOBAL MOBILITY"}
      />

      <AirForceBasesSection bases={bases} locale={locale} />
      <AirForceFutureStack programs={futurePrograms} locale={locale} />
      <AirForceClosing locale={locale} />
    </div>
  );
}
