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
  AirForcePlatformShowcase,
  AirForceStyles,
  AFSectionDivider,
} from "@/components/military/AirForcePageComponents";
import {
  VideoMilitaryHero,
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

  const isRo = locale === "ro";

  return (
    <div className="af-page min-h-screen overflow-hidden bg-black text-white">
      <MilStyles />
      <AirForceStyles />

      {/* 1. VIDEO HERO — B-2 Spirit cinematic flyover */}
      <VideoMilitaryHero
        videoSrc="/videos/military/b2-spirit-hero.mp4"
        posterSrc={SITE_IMAGES.airForce.b2}
        title={isRo ? "SUPREMAȚIE AERIANĂ" : "AIR SUPREMACY"}
        subtitle={isRo ? "FORȚELE AERIENE ALE STATELOR UNITE · DOMINANȚĂ AERIANĂ GLOBALĂ ȘI LOVITURĂ DE PRECIZIE" : "UNITED STATES AIR FORCE · GLOBAL AIR DOMINANCE & PRECISION STRIKE"}
        tagline={isRo ? "ÎNTOTDEAUNA DEASUPRA · AIM HIGH · FLY-FIGHT-WIN" : "ALWAYS ABOVE · AIM HIGH · FLY-FIGHT-WIN"}
        stats={heroStats}
      />

      <AirForceMetricStrip metrics={metrics} locale={locale} />

      <AFSectionDivider />

      <AirForceFleetComparisonSection data={fleetComparison} locale={locale} />

      {/* PULL-QUOTE #1 — Air Superiority */}
      <AirForceFullBleed
        imageSrc={SITE_IMAGES.airForce.f22Formation}
        imageAlt="F-22 Raptors in formation flight"
        caption={isRo ? "F-22 RAPTOR · SUPERIORITATE AERIANĂ ABSOLUTĂ" : "F-22 RAPTOR · ABSOLUTE AIR SUPERIORITY"}
        pullQuote={isRo ? "NICIUN ADVERSAR NU A OBȚINUT PARITATE AERIANĂ DIN 1953." : "NO ADVERSARY HAS ACHIEVED AIR PARITY SINCE 1953."}
      />

      <AirForceCapabilityGrid capabilities={capabilities} locale={locale} />

      <AFSectionDivider />

      <AirForceOperationalConsole theaters={theaters} locale={locale} />

      {/* PULL-QUOTE #2 — Global Strike */}
      <AirForceFullBleed
        imageSrc={SITE_IMAGES.airForce.b21}
        imageAlt="B-21 Raider stealth bomber"
        caption={isRo ? "B-21 RAIDER · CEL MAI AVANSAT BOMBARDIER STEALTH DIN LUME" : "B-21 RAIDER · THE WORLD'S MOST ADVANCED STEALTH BOMBER"}
        pullQuote={isRo ? "ORICE ȚINTĂ. ORICE MOMENT. FĂRĂ DETECTARE." : "ANY TARGET. ANY TIME. UNDETECTED."}
      />

      <AirForcePlatformShowcase platforms={platforms} locale={locale} />

      <AFSectionDivider />

      <AirForceHeritageTimeline events={heritageTimeline} locale={locale} />

      {/* PULL-QUOTE #3 — Rapid Mobility */}
      <AirForceFullBleed
        imageSrc={SITE_IMAGES.airForce.c130}
        imageAlt="C-130 Hercules dirt takeoff"
        caption={isRo ? "C-130 HERCULES · MOBILITATE GLOBALĂ RAPIDĂ" : "C-130 HERCULES · RAPID GLOBAL MOBILITY"}
        pullQuote={isRo ? "ORIUNDE PE PĂMÂNT, ÎN 48 DE ORE." : "ANYWHERE ON EARTH. WITHIN 48 HOURS."}
      />

      <AirForceBasesSection bases={bases} locale={locale} />

      <AFSectionDivider />

      <AirForceFutureStack programs={futurePrograms} locale={locale} />
      <AirForceClosing locale={locale} />
    </div>
  );
}
