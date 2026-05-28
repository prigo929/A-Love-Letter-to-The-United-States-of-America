import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";

import {
  IntelClassifiedStyles,
  SingleStatistic,
  AgencyDossier,
  IntelligenceDisciplines,
  InstallationsList,
  FiveEyesGeometry,
  HeritageList,
  IntelligenceFailures,
  FuturePrograms,
  TheVault,
  ClosingQuote,
} from "@/components/military/IntelligencePageComponents";
import {
  MilStyles,
  ParallaxMilitaryHero,
} from "@/components/military/MilitaryAnimations";
import {
  getIntelligenceAgencies,
  getIntelligenceCapabilities,
  getIntelligenceNodes,
  getIntelligenceHeritage,
  getIntelligenceFuturePrograms,
} from "@/lib/data/intelligence-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "American Intelligence Power | Military",
  description: "Explore the signals intelligence, clandestine human networks, geospatial mapping, and offensive cyber operations of the United States shadow security complex.",
  openGraph: {
    title: "American Intelligence Power | Military",
    description: "The United States global command, cyber ops, and signals intelligence network.",
    images: [{ url: SITE_IMAGES.cyberOps, width: 1200, height: 630 }],
  },
};

export default async function IntelligencePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const agencies = getIntelligenceAgencies(locale);
  const capabilities = getIntelligenceCapabilities(locale);
  const nodes = getIntelligenceNodes(locale);
  const heritage = getIntelligenceHeritage(locale);
  const futurePrograms = getIntelligenceFuturePrograms(locale);

  const heroStats = isRo
    ? [
        { value: "$100B+", label: "BUGET ANUAL" },
        { value: "18", label: "AGENȚII INTRUNITE" },
        { value: "50+", label: "ACTIVE ORBITALE" },
        { value: "24/7", label: "MONITORIZARE" },
      ]
    : [
        { value: "$100B+", label: "ANNUAL BUDGET" },
        { value: "18", label: "JOINT AGENCIES" },
        { value: "50+", label: "ORBITAL ASSETS" },
        { value: "24/7", label: "MONITORING" },
      ];

  return (
    <div className="intel-classified min-h-screen overflow-hidden" style={{ background: "#000000", color: "#E8E2D5" }}>
      <MilStyles />
      <IntelClassifiedStyles />

      {/* Hero Section — retains the CIA video */}
      <ParallaxMilitaryHero
        imageSrc={SITE_IMAGES.cyberOps}
        imageAlt="U.S. Cyber Command operations room"
        videoSrc="/videos/military/cia-edit.mp4"
        title={isRo ? "DOMINANȚĂ INVIZIBILĂ" : "INVISIBLE DOMINANCE"}
        subtitle={isRo ? "SISTEMUL DE INFORMAȚII ȘI SECURITATE CIBERNETICĂ AL STATELOR UNITE" : "UNITED STATES INTELLIGENCE & CYBER SECURITY COMPLEX"}
        tagline={isRo ? "HUMINT · SIGINT · GEOINT · RAZBOI CIBERNETIC" : "HUMINT · SIGINT · GEOINT · CYBER WARFARE"}
        stats={heroStats}
        heightClass="h-[135dvh]"
      />



      {/* The single statistic */}
      <SingleStatistic locale={locale} />

      {/* Agency dossier chapters */}
      <AgencyDossier agencies={agencies} locale={locale} />

      {/* Intelligence disciplines — clean layout with redaction bars */}
      <IntelligenceDisciplines capabilities={capabilities} locale={locale} />

      {/* Installation list — quiet vertical stack */}
      <InstallationsList nodes={nodes} locale={locale} />

      {/* Five Eyes geometry — SVG pentagon */}
      <FiveEyesGeometry locale={locale} />

      {/* Heritage — minimal date list */}
      <HeritageList events={heritage} locale={locale} />

      {/* Intelligence failures — gravitas section */}
      <IntelligenceFailures locale={locale} />

      {/* Future programs — clean layout */}
      <FuturePrograms programs={futurePrograms} locale={locale} />

      {/* The Vault — CIA Reading Room */}
      <TheVault locale={locale} />

      {/* Closing quote and navigation */}
      <ClosingQuote locale={locale} />
    </div>
  );
}
