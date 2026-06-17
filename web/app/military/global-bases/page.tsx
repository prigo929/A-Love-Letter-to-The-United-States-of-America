import type { Metadata } from "next";
import Image from "next/image";
import { getServerLocale } from "@/lib/i18n/server";
import { MilStyles, VideoMilitaryHero } from "@/components/military/MilitaryAnimations";
import {
  AllianceArchitectureSection,
  BaseDossierSection,
  DomesticBasesSection,
  GlobalBasesClosing,
  GlobalCommandMap,
  LogisticsBackboneSection,
  OverseasBasesSection,
  RegionalTheaterGrid,
  StrategicThesis,
} from "@/components/military/GlobalBasesComponents";
import { getDomesticBases } from "@/lib/data/domestic-bases-data";
import {
  getAllianceArchitecture,
  getGlobalBaseStats,
  getLogisticsBackbone,
  getRegionBriefs,
  getStrategicBases,
  getTheaterCards,
} from "@/lib/data/global-bases-data";
import { getOverseasBases } from "@/lib/data/overseas-bases-data";
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

// ── Cinematic full-bleed pull-quote (matches the Air Force / Space Force rhythm) ──
function BasesFullBleed({ imageSrc, imageAlt, caption, pullQuote }: {
  imageSrc: string; imageAlt: string; caption: string; pullQuote: string;
}) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-14 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55 mb-4">{caption}</p>
        <p className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">{pullQuote}</p>
      </div>
    </section>
  );
}

// Thin animated-feel divider to separate cinematic sections.
function BasesDivider() {
  return (
    <div className="mx-auto my-2 h-px max-w-7xl bg-linear-to-r from-transparent via-white/20 to-transparent" />
  );
}

export default async function GlobalBasesPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const stats = getGlobalBaseStats(locale);
  const bases = getStrategicBases(locale);
  const regions = getRegionBriefs(locale);
  const theaters = getTheaterCards(locale);
  const nodes = getLogisticsBackbone(locale);
  const alliances = getAllianceArchitecture(locale);
  const domesticBases = getDomesticBases(locale);
  const overseasBases = getOverseasBases(locale);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <MilStyles />
      <VideoMilitaryHero
        videoSrc="/videos/earth-pixels-from-space.mp4"
        posterSrc={SITE_IMAGES.globalBases.ramstein}
        title={isRo ? "PREZENȚĂ GLOBALĂ" : "GLOBAL PRESENCE"}
        subtitle={isRo
          ? "REȚEAEA DE BAZE A STATELOR UNITE · LOGISTICĂ, DESCURAJARE ȘI PROIECȚIE DE FORȚĂ"
          : "THE UNITED STATES BASE NETWORK · LOGISTICS, DETERRENCE & POWER PROJECTION"}
        tagline={isRo ? "ORIUNDE. ORICÂND. 24/7" : "ANYWHERE. ANY TIME. 24/7"}
        stats={stats}
      />

      <StrategicThesis locale={locale} />

      <BasesFullBleed
        imageSrc={SITE_IMAGES.globalBases.ramstein}
        imageAlt="Ramstein Air Base, Germany"
        caption={isRo ? "RAMSTEIN · GERMANIA — HUB-UL EUROPEAN" : "RAMSTEIN · GERMANY — THE EUROPEAN HUB"}
        pullQuote={isRo ? "ORIUNDE PE PĂMÂNT, ÎN 48 DE ORE." : "ANYWHERE ON EARTH. WITHIN 48 HOURS."}
      />

      <GlobalCommandMap
        bases={bases}
        domesticBases={domesticBases}
        overseasBases={overseasBases}
        regions={regions}
        locale={locale}
      />
      <BasesDivider />
      <RegionalTheaterGrid theaters={theaters} locale={locale} />
      <BaseDossierSection bases={bases} locale={locale} />

      <BasesFullBleed
        imageSrc={SITE_IMAGES.globalBases.norfolk}
        imageAlt="Naval Station Norfolk, the world's largest naval base"
        caption={isRo ? "NORFOLK · CEA MAI MARE BAZĂ NAVALĂ DIN LUME" : "NORFOLK · THE WORLD'S LARGEST NAVAL BASE"}
        pullQuote={isRo ? "O REȚEA PE CARE NICIO ALTĂ NAȚIUNE NU O POATE EGALA." : "A NETWORK NO OTHER NATION CAN MATCH."}
      />

      <LogisticsBackboneSection nodes={nodes} locale={locale} />
      <BasesDivider />
      <AllianceArchitectureSection alliances={alliances} locale={locale} />
      <DomesticBasesSection bases={domesticBases} locale={locale} />
      <OverseasBasesSection bases={overseasBases} locale={locale} />
      <GlobalBasesClosing locale={locale} />
    </main>
  );
}
