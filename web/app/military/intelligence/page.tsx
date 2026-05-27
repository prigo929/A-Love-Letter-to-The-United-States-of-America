import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  IntelligenceStyles,
  IntelligencePageProgress,
  IntelligenceSectionDivider,
  IntelligenceFullBleed,
  IntelligenceMetricStrip,
  IntelligenceAgencyShowcase,
  IntelligenceCapabilityGrid,
  IntelligenceOperationsConsole,
  IntelligenceHeritageTimeline,
  IntelligenceFutureStack,
  IntelligenceClosing,
} from "@/components/military/IntelligencePageComponents";
import {
  MilStyles,
  ParallaxMilitaryHero,
} from "@/components/military/MilitaryAnimations";
import {
  getIntelligenceMetrics,
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

  const metrics = getIntelligenceMetrics(locale);
  const agencies = getIntelligenceAgencies(locale);
  const capabilities = getIntelligenceCapabilities(locale);
  const nodes = getIntelligenceNodes(locale);
  const heritage = getIntelligenceHeritage(locale);
  const futurePrograms = getIntelligenceFuturePrograms(locale);

  const breadcrumbParent = isRo ? "Armată" : "Military";
  const breadcrumbPage = isRo ? "Informații" : "Intelligence";

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
    <div className="intel-page min-h-screen overflow-hidden bg-black text-white">
      <MilStyles />
      <IntelligenceStyles />
      <IntelligencePageProgress />

      {/* Hero Section */}
      <ParallaxMilitaryHero
        imageSrc={SITE_IMAGES.cyberOps}
        imageAlt="U.S. Cyber Command operations room"
        videoSrc="/videos/military/cia-edit.mp4"
        title={isRo ? "DOMINANȚĂ INVIZIBILĂ" : "INVISIBLE DOMINANCE"}
        subtitle={isRo ? "SISTEMUL DE INFORMAȚII ȘI SECURITATE CIBERNETICĂ AL STATELOR UNITE" : "UNITED STATES INTELLIGENCE & CYBER SECURITY COMPLEX"}
        tagline={isRo ? "HUMINT · SIGINT · GEOINT · RAZBOI CIBERNETIC" : "HUMINT · SIGINT · GEOINT · CYBER WARFARE"}
        stats={heroStats}
      />

      {/* Breadcrumb Section overlayed below the hero scroll zone */}
      <div className="relative z-20 bg-black pt-12 pb-6 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: breadcrumbParent, href: "/military" },
              { label: breadcrumbPage },
            ]}
          />
        </div>
      </div>

      {/* Metric Counters */}
      <IntelligenceMetricStrip metrics={metrics} />

      <IntelligenceSectionDivider />

      {/* Dossier Directory (The Big Five) */}
      <IntelligenceAgencyShowcase agencies={agencies} locale={locale} />

      {/* Full-bleed Parallax Spacer 1 */}
      <IntelligenceFullBleed
        imageSrc={SITE_IMAGES.homeUsaAtNightFromSpace}
        imageAlt="USA at night from Space"
        caption={isRo ? "CONȘTIENTIZARE GLOBALĂ A SITUAȚIEI · DETECTARE ORBITALĂ" : "GLOBAL SITUATIONAL AWARENESS · ORBITAL DETECTION"}
        pullQuote={isRo ? "NIMIC NU RĂMÂNE NEVĂZUT. NIMIC NU RĂMÂNE NEASCULTAT." : "NOTHING UNSEEN. NOTHING UNHEARD."}
      />

      {/* Core Collection Capabilities */}
      <IntelligenceCapabilityGrid capabilities={capabilities} locale={locale} />

      <IntelligenceSectionDivider />

      {/* Operational Listening Posts Nodes Selector */}
      <IntelligenceOperationsConsole nodes={nodes} locale={locale} />

      {/* Full-bleed Parallax Spacer 2 */}
      <IntelligenceFullBleed
        imageSrc={SITE_IMAGES.military.tacticalMap}
        imageAlt="Global Command Map"
        caption={isRo ? "DECIZII STRATEGICE DE MARE PRECIZIE · SPRIJIN DE COMANDĂ" : "HIGH-PRECISION STRATEGIC DECISIONS · COMMAND SUPPORT"}
        pullQuote={isRo ? "INFORMAȚIA ESTE DIFERENȚA DINTRE DECIZIE ȘI DEZASTRU." : "INTELLIGENCE IS THE DIFFERENCE BETWEEN DECISION AND DISASTER."}
      />

      {/* History Timeline */}
      <IntelligenceHeritageTimeline events={heritage} locale={locale} />

      <IntelligenceSectionDivider />

      {/* Classified Next-Gen Tech Stack */}
      <IntelligenceFutureStack programs={futurePrograms} locale={locale} />

      {/* Cross-linking footer navigation */}
      <IntelligenceClosing locale={locale} />
    </div>
  );
}
