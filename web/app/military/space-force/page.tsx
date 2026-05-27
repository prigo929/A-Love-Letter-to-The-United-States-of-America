import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import {
  SFSectionDivider,
  SpaceForceBasesSection,
  SpaceForceCapabilityGrid,
  SpaceForceClosing,
  SpaceForceFleetComparisonSection,
  SpaceForceFullBleed,
  SpaceForceFutureStack,
  SpaceForceHeritageTimeline,
  SpaceForceMetricStrip,
  SpaceForceOperationalConsole,
  SpaceForcePlatformShowcase,
  SpaceForceStyles,
} from "@/components/military/SpaceForcePageComponents";
import {
  MilStyles,
  VideoMilitaryHero,
} from "@/components/military/MilitaryAnimations";
import {
  getSpaceForceBases,
  getSpaceForceCapabilities,
  getSpaceForceFleetComparison,
  getSpaceForceFuturePrograms,
  getSpaceForceMetrics,
  getSpaceForceOperations,
  getSpaceForceSystems,
  getSpaceForceTimeline,
} from "@/lib/data/spaceforce-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "United States Space Force",
  description:
    "A cinematic exploration of the United States Space Force: GPS, missile warning, protected satellite communications, space domain awareness, orbital defense, and resilient next-generation constellations.",
  openGraph: {
    title: "United States Space Force",
    description:
      "America's orbital service: GPS, missile warning, protected SATCOM, space domain awareness, launch, and resilient space architecture.",
    images: [{ url: SITE_IMAGES.spaceForce.launch, width: 1200, height: 630 }],
  },
};

export default async function SpaceForcePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const metrics = getSpaceForceMetrics(locale);
  const capabilities = getSpaceForceCapabilities(locale);
  const systems = getSpaceForceSystems(locale);
  const operations = getSpaceForceOperations(locale);
  const timeline = getSpaceForceTimeline(locale);
  const comparison = getSpaceForceFleetComparison(locale);
  const futurePrograms = getSpaceForceFuturePrograms(locale);
  const bases = getSpaceForceBases(locale);

  const heroStats = isRo
    ? [
        { value: "2019", label: "SERVICIU FONDAT" },
        { value: "31+", label: "SATELIȚI GPS" },
        { value: "24/7", label: "AVERTIZARE LANSARE" },
        { value: "14K+", label: "GUARDIANI ACTIVI" },
      ]
    : [
        { value: "2019", label: "SERVICE FOUNDED" },
        { value: "31+", label: "GPS ORBITERS" },
        { value: "24/7", label: "LAUNCH WARNING" },
        { value: "14K+", label: "ACTIVE GUARDIANS" },
      ];

  return (
    <div className="sf-page min-h-screen overflow-hidden bg-black text-white">
      <MilStyles />
      <SpaceForceStyles />

      <VideoMilitaryHero
        videoSrc="/videos/military/us-space-force-americas-invisible-front.mp4"
        posterSrc={SITE_IMAGES.spaceForce.launch}
        title={isRo ? "MEREU DEASUPRA" : "ALWAYS ABOVE"}
        subtitle={isRo ? "UNITED STATES SPACE FORCE · SECURITATE ORBITALĂ ȘI AVANTAJ SPAȚIAL" : "UNITED STATES SPACE FORCE · ORBITAL SECURITY & SPACE ADVANTAGE"}
        tagline={isRo ? "SEMPER SUPRA · GPS · AVERTIZARE · SATCOM · ORBITĂ" : "SEMPER SUPRA · GPS · WARNING · SATCOM · ORBIT"}
        stats={heroStats}
      />

      <SpaceForceMetricStrip metrics={metrics} locale={locale} />

      <SFSectionDivider />

      <SpaceForceFleetComparisonSection data={comparison} locale={locale} />

      <SpaceForceFullBleed
        imageSrc={SITE_IMAGES.spaceForce.earthNight}
        imageAlt="United States at night from space"
        caption={isRo ? "GPS · TIMPUL PRECIS CARE ȚINE LUMEA ÎN MIȘCARE" : "GPS · THE PRECISE CLOCK THAT KEEPS THE WORLD MOVING"}
        pullQuote={isRo ? "FIECARE COORDONATĂ. FIECARE CEAS. FIECARE FORȚĂ CONECTATĂ." : "EVERY COORDINATE. EVERY CLOCK. EVERY FORCE CONNECTED."}
      />

      <SpaceForceCapabilityGrid capabilities={capabilities} locale={locale} />

      <SFSectionDivider />

      <SpaceForceOperationalConsole theaters={operations} locale={locale} />

      <SpaceForceFullBleed
        imageSrc={SITE_IMAGES.spaceForce.launch}
        imageAlt="Space launch supporting national security missions"
        caption={isRo ? "LANSARE DE SECURITATE NAȚIONALĂ · ACCES ASIGURAT LA ORBITĂ" : "NATIONAL SECURITY LAUNCH · ASSURED ACCESS TO ORBIT"}
        pullQuote={isRo ? "FĂRĂ ORBITĂ, RĂZBOIUL MODERN ORBEȘTE." : "WITHOUT ORBIT, MODERN WARFARE GOES BLIND."}
      />

      <SpaceForcePlatformShowcase platforms={systems} locale={locale} />

      <SFSectionDivider />

      <SpaceForceHeritageTimeline events={timeline} locale={locale} />

      <SpaceForceFullBleed
        imageSrc={SITE_IMAGES.spaceForce.earth}
        imageAlt="Planet Earth viewed from space"
        caption={isRo ? "DOMENIUL SPAȚIAL · INFRASTRUCTURA INVIZIBILĂ A PUTERII MODERNE" : "SPACE DOMAIN · THE INVISIBLE INFRASTRUCTURE OF MODERN POWER"}
        pullQuote={isRo ? "PUTEREA ÎNTRUNITĂ ÎNCEPE CU SEMNALUL DE DEASUPRA." : "JOINT POWER BEGINS WITH THE SIGNAL ABOVE."}
      />

      <SpaceForceBasesSection bases={bases} locale={locale} />

      <SFSectionDivider />

      <SpaceForceFutureStack programs={futurePrograms} locale={locale} />
      <SpaceForceClosing locale={locale} />
    </div>
  );
}
