// ─────────────────────────────────────────────────────────────────────────────
// page.tsx — MILITARY POWER · CINEMATIC OVERHAUL v3
// "The United States as a planetary command-and-control system."
//
// Design language ─────────────────────────────────────────────────────────────
//   Defense-Tech × Aerospace HUD × Apple Keynote × Top Gun: Maverick
//
// Architecture ────────────────────────────────────────────────────────────────
//   Every section is a full-bleed cinematic panel.
//   Layers per panel: bg-image → vignette → grid → scan → grain → HUD → text
//
// Sections ────────────────────────────────────────────────────────────────────
//   §0  HERO          — B-2 emerging from darkness, parallax, particle canvas
//   §1  STAT WALL     — HUD counters across the full viewport
//   §2  DOMINANCE     — global overview + budget comparison bars
//   §3  BRANCHES      — cinematic branch selector
//   §4  CARRIER MAP   — world map with real-time carrier positions + satellite
//   §5  WEAPONS       — classified dossier cards
//   §6  NUCLEAR TRIAD — interactive SVG triangle
//   §7  DARPA         — future systems grid
//   §8  INDUSTRY      — defense contractor grid
//   §9  FACTS         — rolling ticker + fact cards
//   §10 QUOTE         — full-bleed cinematic quote
//   §11 SUB-PAGE NAV  — chapter navigation
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


import {
  MilStyles,
  MinimalistStat,
  WeaponSystemCard,
  BranchSelector,
  DARPAProgramGrid,
  NuclearTriadDiagram,
  GlobalCarrierMap,
  VideoMilitaryHero,
  BudgetComparisonBar,
  AlliancesShowcase,
  SOCOMGrid,
  IntelligenceNetworkMap,
} from "@/components/military/MilitaryAnimations";
import { LayoutGroup } from "framer-motion";

import { getServerLocale } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";
import { BLUR_PLACEHOLDER, cn } from "@/lib/utils";
import { SITE_IMAGES } from "@/lib/site-images";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import DeepDiveSection from "@/components/shared/DeepDiveSection";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";

import {
  MILITARY_STATS,
  MILITARY_BRANCHES,
  WEAPON_SYSTEMS,
  DARPA_PROGRAMS,
  NUCLEAR_TRIAD,
  CARRIER_POSITIONS,
  MILITARY_QUOTES,
  DEFENSE_CONTRACTORS,
  BUDGET_DATA,
  getMilitaryFacts,
  getMilitaryStats,
  getMilitaryBranches,
  getWeaponSystems,
  getDARPAPrograms,
  getNuclearTriad,
  getLocalizedCarriers,
  getBudgetData,
  getDefenseContractors,
  getMilitaryQuotes,
  getSOCOMUnits,
  getIntelligenceAgencies,
  getAlliancesData,
} from "@/lib/data/military-data";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "American Military Power",
  description:
    "The United States operates the most advanced military-industrial-intelligence system in human history. Explore the forces, technologies, and doctrine that define planetary dominance.",
  openGraph: {
    title: "American Military Power",
    description: "Planetary command-and-control. The full spectrum of American military supremacy.",
    images: [{ url: SITE_IMAGES.military.hero, width: 1200, height: 630 }],
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const getHeroStats = (locale: Locale) => {
  const stats = getMilitaryStats(locale);
  const budgetStat = stats.find(s => s.id === "budget");
  const basesStat = stats.find(s => s.id === "bases");
  const nukesStat = stats.find(s => s.id === "nukes");
  const carriersStat = stats.find(s => s.id === "carriers");
  const isRo = locale === 'ro';

  return [
    { 
      value: budgetStat
        ? (isRo 
            ? `${budgetStat.value} mld. $` 
            : `$${budgetStat.value}B`)
        : "", 
      label: budgetStat?.label || ""
    },
    { 
      value: carriersStat ? `${carriersStat.value}` : "", 
      label: carriersStat?.label || ""
    },
    { 
      value: basesStat ? `${basesStat.value}${basesStat.suffix || ''}` : "", 
      label: basesStat?.label || ""
    },
    { 
      value: nukesStat 
        ? `${nukesStat.value.toLocaleString(isRo ? 'ro-RO' : 'en-US')}${nukesStat.suffix || ''}` 
        : "", 
      label: nukesStat?.label || ""
    },
  ];
};

const getDominanceMetrics = (locale: Locale) => {
  const stats = getMilitaryStats(locale);
  const isRo = locale === 'ro';
  return [
    { 
      value: "33%",  
      label: isRo ? "Cotă din Cheltuielile Militare Globale" : "Share of Global Military Spending" 
    },
    { 
      value: `${stats.find(s => s.id === "satellites")?.value || ''}${stats.find(s => s.id === "satellites")?.suffix || ''}`,  
      label: stats.find(s => s.id === "satellites")?.label || ""
    },
    { 
      value: `${Math.round((stats.find(s => s.id === "aircraft")?.value || 0) / 1000)}K+`, 
      label: isRo ? "Aeronave Militare — Cea Mai Mare Flotă" : "Military Aircraft — Largest Fleet on Earth"
    },
    { 
      value: `${stats.find(s => s.id === "ships")?.value || ''}${stats.find(s => s.id === "ships")?.suffix || ''}`,  
      label: stats.find(s => s.id === "ships")?.label || ""
    },
  ];
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  children,
  id,
  label,
  bg = "#000000",
  noPad = false,
  fullBleed = false,
}: {
  children: React.ReactNode;
  id?: string;
  label?: string;
  bg?: string;
  noPad?: boolean;
  fullBleed?: boolean;
}) {
  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{ background: bg }}
    >
      {/* Seamless transition */}

      {label && (
        <div className="pt-22 pb-12 flex justify-center">
          <div className="mil-text-label tracking-[0.5em]">{label}</div>
        </div>
      )}

      <div className={cn(
        "mx-auto",
        fullBleed ? "max-w-none" : "max-w-[1440px]",
        noPad ? "p-0" : "px-6 py-32 md:py-48"
      )}>
        {children}
      </div>
    </section>
  );
}



// ─── Cinematic Section Image ──────────────────────────────────────────────────

function CinematicImage({
  src,
  alt,
  height = 600,
  children,
}: {
  src:       string;
  alt:       string;
  height?:   number;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-45 grayscale-[0.7] sepia-[0.1]"
        sizes="100vw"
        quality={90}
      />
      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,black_0%,rgba(0,0,0,0)_15%,rgba(0,0,0,0)_85%,black_100%)]" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)'
      }} />
      <div className="relative z-10 flex h-full items-center justify-center py-32">
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MilitaryPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const stats = getMilitaryStats(locale);
  const facts = getMilitaryFacts(locale);
  const branches = getMilitaryBranches(locale);
  const weaponSystems = getWeaponSystems(locale);
  const darpaPrograms = getDARPAPrograms(locale);
  const nuclearTriad = getNuclearTriad(locale);
  const carriers = getLocalizedCarriers(locale);
  const budgetData = getBudgetData(locale);
  const contractors = getDefenseContractors(locale);
  const quotes = getMilitaryQuotes(locale);
  const alliances = getAlliancesData(locale);
  const socomUnits = getSOCOMUnits(locale);
  const intelligenceAgencies = getIntelligenceAgencies(locale);
  const quote = quotes[0];

  const heroStats = getHeroStats(locale);
  const dominanceMetrics = getDominanceMetrics(locale);

  return (
    <div className="bg-black text-white min-h-screen">
      <MilStyles />


      {/* ─── §1  HERO — looping video showcase ─────────────────────────── */}
      <VideoMilitaryHero
        videoSrc="/videos/military/supremacy-wave.mp4"
        posterSrc={SITE_IMAGES.military.hero}
        title={locale === 'ro' ? "PUTERE ABSOLUTĂ" : "ABSOLUTE POWER"}
        subtitle={locale === 'ro' ? "Complexul Militar · Industrial · de Intelligence al Statelor Unite" : "United States Military · Industrial · Intelligence Complex"}
        tagline={locale === 'ro' ? "Prima în forță · Prima în pregătire · Prima în lume" : "First in strength · First in readiness · First in the world"}
        stats={heroStats}
      />

      {/* ─── §2  GLOBAL STAT WALL ──────────────────────────────────────────── */}
      <Section
        id="stats"
        label={locale === 'ro' ? "METRICI VERIFICATE · AF 2025" : "VERIFIED METRICS · FY 2025"}
        noPad
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/5">
          {stats.map((s, i) => (
            <div key={s.id} className="border-r border-b border-white/5">
              <MinimalistStat stat={s} index={i} locale={locale} />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §3  GLOBAL DOMINANCE OVERVIEW ─────────────────────────────────── */}
      <Section
        id="dominance"
        label={locale === 'ro' ? "DOMINANȚĂ GLOBALĂ · PRIVIRE STRATEGICĂ" : "GLOBAL DOMINANCE · STRATEGIC OVERVIEW"}
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{locale === 'ro' ? 'COMANDĂ' : 'PLANETARY'}</span>
            <span className="block whitespace-nowrap text-white/20">{locale === 'ro' ? 'PLANETARĂ' : 'COMMAND'}</span>
          </h2>
          <p className="mil-text-metadata max-w-2xl mx-auto leading-relaxed">
            {locale === 'ro' 
              ? "Statele Unite nu dispun pur și simplu de o armată — ele operează un sistem de comandă și control interconectat global, care acoperă uscatul, marea, aerul, spațiul și spațiul cibernetic. Nicio națiune nu se apropie."
              : "The United States does not simply field a military — it operates a globally interconnected command-and-control system spanning land, sea, air, space, and cyberspace. No nation comes close."}
          </p>
        </div>

        {/* Dominance metric tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {dominanceMetrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-[clamp(40px,6vw,80px)] font-extralight tracking-tighter mb-4 leading-none">{m.value}</div>
              <div className="h-px w-12 bg-white/10 mb-4" />
              <div className="mil-text-metadata font-bold tracking-[0.2em] text-[11px] text-white/70">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Budget comparison chart */}
        <div className="mt-12">
          <BudgetComparisonBar data={budgetData} locale={locale}/>
        </div>
      </Section>


      


      {/* ─── §4  MILITARY BRANCHES ──────────────────────────────────────────── */}
      <Section
        id="branches"
        label={locale === 'ro' ? "RAMURILE SERVICIULUI MILITAR" : "THE BRANCHES OF SERVICE"}
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase">
            {locale === 'ro' ? 'ȘASE RAMURI.' : 'SIX BRANCHES.'}<br/>
            <span className="text-white/20">{locale === 'ro' ? 'O SINGURĂ MISIUNE.' : 'ONE MISSION.'}</span>
          </h2>
        </div>
        <BranchSelector branches={branches} locale={locale}/>
      </Section>

      {/* ─── §4.2  SPECIAL OPERATIONS COMMAND (SOCOM) ───────────────────────── */}
      <Section
        id="socom"
        label={locale === 'ro' ? "COMANDAMENTUL PENTRU OPERAȚIUNI SPECIALE (SOCOM)" : "SPECIAL OPERATIONS COMMAND (SOCOM)"}
      >
        <div className="text-center mb-24">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{locale === 'ro' ? 'VÂRFUL' : 'THE TIP OF'}</span>
            <span className="block whitespace-nowrap text-white/20">{locale === 'ro' ? 'SĂGEȚII' : 'THE SPEAR'}</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed tracking-[0.2em] text-center">
            {locale === 'ro'
              ? "Forțele de elită pregătite pentru război neconvențional, misiuni secrete de contraterorism și recunoaștere specială în medii ostile."
              : "Elite forces trained for unconventional warfare, clandestine counter-terrorism, and special reconnaissance in hostile environments."}
          </p>
        </div>
        <SOCOMGrid units={socomUnits} locale={locale} />
      </Section>

      {/* ─── §5  CARRIER MAP CINEMATIC INTERLUDE ────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.carrier}
        alt="USS Nimitz carrier strike group"
      >
        <div className="text-center">
          <div className="mil-text-label mb-12">{locale === 'ro' ? 'SUPERIORITATE NAVALĂ · RAZĂ GLOBALĂ' : 'NAVAL SUPERIORITY · GLOBAL REACH'}</div>
          <h2 className="mil-text-hero flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">11 {locale === 'ro' ? 'GRUPURI DE' : 'CARRIER'}</span>
            <span className="block whitespace-nowrap text-white/20">{locale === 'ro' ? 'ATAC' : 'STRIKE GROUPS'}</span>
          </h2>
          <div className="mil-text-metadata mt-12 font-bold text-sm text-white/70">
            {locale === 'ro' ? 'Desfășurate simultan pe fiecare ocean de pe Pământ' : 'Simultaneously deployed across every ocean on earth'}
          </div>
        </div>
      </CinematicImage>

      {/* ─── §6  GLOBAL CARRIER MAP ─────────────────────────────────────────── */}
      <Section
        id="carrier-map"
        label={locale === 'ro' ? "DESFĂȘURAREA GRUPURILOR DE PORTAVIOANE · POZIȚII LIVE" : "CARRIER GROUP DEPLOYMENT · LIVE POSITIONS"}
      >
        <GlobalCarrierMap positions={carriers} locale={locale}/>
        <div className="mt-12 flex justify-center">
          <Link
            href="/military/global-bases"
            className="inline-flex h-11 items-center justify-center border border-white/15 bg-white px-5 text-xs font-bold uppercase text-black transition-colors hover:bg-white/85"
          >
            {locale === 'ro' ? "EXPLOREAZĂ BAZELE GLOBALE & LOGISTICA →" : "EXPLORE GLOBAL BASES & LOGISTICS →"}
          </Link>
        </div>
      </Section>

      {/* ─── §7  WEAPON SYSTEMS ─────────────────────────────────────────────── */}
      <Section
        id="weapons"
        label={locale === 'ro' ? "BIJUTERIILE COROANEI PUTERII AMERICANE" : "CROWN JEWELS OF AMERICAN POWER"}
      >
        <div className="text-center mb-24">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{locale === 'ro' ? 'ARSENALUL' : 'THE ARSENAL'}</span>
            <span className="block whitespace-nowrap text-white/20">{locale === 'ro' ? 'DEMOCRAȚIEI' : 'OF DEMOCRACY'}</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed tracking-[0.2em]">
            {locale === 'ro'
              ? "De la aeronave invizibile la rachete hipersonice, sistemele care definesc granița tehnologică a ceea ce poate fi războiul."
              : "From stealth aircraft to hypersonic missiles, the systems that define the technological boundary of what warfare can be."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weaponSystems.map((sys, i) => (
            <WeaponSystemCard key={sys.id} system={sys} index={i} locale={locale}/>
          ))}
        </div>
      </Section>

      {/* ─── §8  B-2 CINEMATIC INTERLUDE ────────────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.b2}
        alt="B-2 Spirit stealth bomber over the Pacific"
        height={800}
      >
        <div className="flex flex-col items-center text-center max-w-4xl px-6">
          <div className="mil-text-label mb-12">{locale === 'ro' ? 'NORTHROP GRUMMAN B-2 SPIRIT · DIN 1997' : 'NORTHROP GRUMMAN B-2 SPIRIT · SINCE 1997'}</div>
          <h2 className="mil-text-hero flex flex-col items-center w-full">
            <span className="block">{locale === 'ro' ? 'NĂSCUT DIN' : 'BORN FROM'}</span>
            <span className="block text-white/20">{locale === 'ro' ? 'ÎNTUNERIC' : 'DARKNESS'}</span>
          </h2>
          <p className="mil-text-metadata mt-12 mb-16">
            {locale === 'ro'
              ? "Singurul bombardier strategic invizibil operațional din lume. Secțiune transversală radar echivalentă cu o pasăre mare. Rază: globală."
              : "The world's only operational low-observable strategic stealth bomber. Radar cross-section equivalent to a large bird. Range: global."}
          </p>

          <div className="flex flex-wrap justify-center gap-x-24 gap-y-12">
            {[
              [isRo ? "VITEZĂ" : "SPEED", "Mach 0.95"],
              [isRo ? "RAZĂ" : "RANGE", isRo ? "11.100+ km" : "6,900+ mi"],
              [isRo ? "SARCINĂ" : "PAYLOAD", isRo ? "18.100+ kg" : "40,000 lb"],
              [isRo ? "FLOTĂ" : "FLEET",   isRo ? "20 aeronave" : "20 aircraft"],
            ].map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="mil-text-metadata mb-2 opacity-60">{k}</div>
                <div className="text-2xl font-bold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </CinematicImage>

      {/* ─── §9  NUCLEAR TRIAD ──────────────────────────────────────────────── */}
      <Section
        id="nuclear"
        label={locale === 'ro' ? "DESCURAJARE NUCLEARĂ · TRIADA DE FIER" : "NUCLEAR DETERRENCE · THE IRON TRIAD"}
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase mb-8">
            {locale === 'ro' ? 'TRIADA' : 'THE NUCLEAR'}<br/>
            <span className="text-white/20">{locale === 'ro' ? 'NUCLEARĂ' : 'TRIAD'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <NuclearTriadDiagram triad={nuclearTriad} locale={locale}/>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { 
                v: isRo ? "GARANTAT" : "GUARANTEED",   
                l: isRo ? "Capabilitate Contraatac" : "Second-Strike Capability", 
                sub: isRo ? "Garantează distrugerea reciprocă" : "Ensures mutual destruction" 
              },
              { 
                v: isRo ? "EFICIENT" : "EFFICIENT",      
                l: isRo ? "Cost Siloz Terestru" : "Land-Based Silo Cost",    
                sub: isRo ? "Cea mai ieftină componentă de menținut" : "Most cost-effective leg to maintain" 
              },
              { 
                v: isRo ? "RECHEMABIL" : "RECALLABLE",       
                l: isRo ? "Controlul Bombardierelor" : "Bomber Fleet Control",                
                sub: isRo ? "Singura componentă care poate fi oprită" : "Only leg that can be called back" 
              },
              { 
                v: isRo ? "SENTINEL" : "SENTINEL",      
                l: isRo ? "Modernizare ICBM" : "ICBM Modernization",               
                sub: isRo ? "Înlocuirea flotei Minuteman III" : "Replacing the Minuteman III fleet" 
              },
            ].map((item, i) => (
              <div key={i} className="border-l border-white/10 pl-8 py-6">
                <div className="text-2xl font-black mb-2">{item.v}</div>
                <div className="mil-text-metadata mb-2 font-bold">{item.l}</div>
                <div className="mil-text-metadata text-[11px] font-bold text-white/40">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── §9.5  THE INTELLIGENCE NETWORK ─────────────────────────────────── */}
      <Section
        id="intelligence"
        label={locale === 'ro' ? "REȚEAUA DE INTELIGENȚĂ · SENZORII PLANETARI" : "THE INTELLIGENCE NETWORK · PLANETARY SENSORS"}
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase mb-8">
            {locale === 'ro' ? 'OCHII ȘI URECHILE' : 'THE EYES AND EARS'}<br/>
            <span className="text-white/20">{locale === 'ro' ? 'IMPERIULUI INFORMAȚIONAL' : 'OF THE COMMAND STRUCTURE'}</span>
          </h2>
          <p className="mil-text-metadata max-w-2xl mx-auto leading-relaxed text-center">
            {locale === 'ro'
              ? "Baza decizională a comenzii planetare este alimentată de 18 agenții de informații. De la interceptări de semnale prin satelit la agenți infiltrați pe teren."
              : "The decision-making basis of planetary command is fed by 18 intelligence agencies. From orbital signal intercepts to clandestine field assets."}
          </p>
        </div>
        <IntelligenceNetworkMap agencies={intelligenceAgencies} locale={locale} />
      </Section>

      {/* ─── §10  DARPA / FUTURE SYSTEMS ────────────────────────────────────── */}
      <Section
        id="darpa"
        label={locale === 'ro' ? "DARPA · CAPABILITĂȚI VIITOARE" : "DARPA · FUTURE CAPABILITIES"}
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{locale === 'ro' ? 'GENERAȚIA' : 'THE NEXT'}</span>
            <span className="block whitespace-nowrap text-white/20">{locale === 'ro' ? 'URMĂTOARE' : 'GENERATION'}</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed">
            {locale === 'ro'
              ? "DARPA finanțează tehnologii cu o generație înaintea câmpului de luptă. Ceea ce este în dezvoltare astăzi este ceea ce va câștiga războaiele în 2040."
              : "DARPA funds technologies a generation ahead of the battlefield. What's in development today is what wins wars in 2040."}
          </p>
        </div>

        <LayoutGroup>
          <DARPAProgramGrid programs={darpaPrograms} locale={locale}/>
        </LayoutGroup>
      </Section>


      {/* ─── §11  ORBITAL CINEMATIC INTERLUDE ───────────────────────────────── */}
      <CinematicImage
        src={SITE_IMAGES.military.satellite}
        alt="US military satellite orbital infrastructure"
      >
        <div className="text-center max-w-4xl px-6">
          <div className="mil-text-label mb-12">{locale === 'ro' ? 'CONȘTIENTIZAREA DOMENIULUI SPAȚIAL · RAZĂ GLOBALĂ' : 'SPACE DOMAIN AWARENESS · GLOBAL REACH'}</div>
          <h2 className="mil-text-hero flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{locale === 'ro' ? 'DOMINANȚĂ' : 'ORBITAL'}</span>
            <span className="block whitespace-nowrap text-white/20">{locale === 'ro' ? 'ORBITALĂ' : 'DOMINANCE'}</span>
          </h2>
          <p className="mil-text-metadata mt-12 font-bold text-sm text-white/70">
            {locale === 'ro'
              ? "Peste 142 de sateliți militari oferă precizie GPS, ISR în timp real și integrarea apărării antirachetă. Acoperire globală: 100%."
              : "142+ military satellites provide GPS precision, real-time ISR, and missile defense integration. Global coverage: 100%."}
          </p>
        </div>
      </CinematicImage>

      {/* ─── §12  DEFENSE INDUSTRIAL BASE ───────────────────────────────────── */}
      <Section
        id="industry"
        label={locale === 'ro' ? "BAZA INDUSTRIALĂ DE APĂRARE" : "DEFENSE INDUSTRIAL BASE"}
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{locale === 'ro' ? 'CONTRACTORII' : 'THE PRIME'}</span>
            <span className="block whitespace-nowrap text-white/20">{locale === 'ro' ? 'PRINCIPALI' : 'CONTRACTORS'}</span>
          </h2>
          <p className="mil-text-metadata max-w-xl mx-auto leading-relaxed">
            {locale === 'ro'
              ? "Companiile care traduc știința americană în arme pe care niciun adversar nu le poate contracara — și nicio alianță nu le poate egala."
              : "The companies that translate American science into weapons no adversary can counter — and no alliance can field."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/2">
          {contractors.map((c, i) => (
            <div key={c.name} className="group bg-[#0a0a0a] p-12 flex flex-col h-full relative mil-gradient-border hover:bg-[#0f0f0f] transition-colors duration-500">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <h4 className="text-2xl font-bold tracking-tight">{c.name}</h4>
                  <div className="mil-text-metadata text-[11px] font-black bg-white/5 border border-white/10 px-3 py-1.5 text-white/80">{c.revenue}</div>
                </div>
                <div className="mil-text-metadata opacity-55 mb-8 grow tracking-[0.2em]">{c.specialty}</div>
                <div className="flex flex-wrap gap-2">
                  {c.programs.map(prog => (
                    <span key={prog} className="mil-text-metadata text-[10px] font-bold border border-white/10 px-2 py-1 text-white/70">
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §13  FACTS GRID ────────────────────────────────────────────────── */}
      <Section
        id="facts"
        label={locale === 'ro' ? "INTELIGENȚĂ CONTEXTUALĂ" : "CONTEXTUAL INTELLIGENCE"}
      >
        <div className="text-center mb-32">
          <h2 className="mil-text-hero mb-12 flex flex-col items-center w-full text-center">
            <span className="block whitespace-nowrap">{locale === 'ro' ? 'CONTEXT' : 'STRATEGIC'}</span>
            <span className="block whitespace-nowrap text-white/20">{locale === 'ro' ? 'STRATEGIC' : 'CONTEXT'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {facts.map((f, i) => (
            <div key={i} className="bg-black p-12">
              <div className="mil-text-metadata text-white/60 font-black mb-6">[ FACT_{i+1} ]</div>
              <p className="text-white/60 leading-relaxed">
                {f.fact}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §3.2  GLOBAL ALLIANCES — NATO & AUKUS ─────────────────────────── */}
      <Section
        id="alliances"
        label={locale === 'ro' ? "ALIANȚE GLOBALE · MULTIPLICATORI DE FORȚĂ" : "GLOBAL ALLIANCES · FORCE MULTIPLIERS"}
      >
        <div className="text-center mb-24">
          <h2 className="text-7xl font-black tracking-tighter uppercase mb-8">
            {locale === 'ro' ? 'ALIANȚE STRATEGICE.' : 'STRATEGIC ALLIANCES.'}<br/>
            <span className="text-white/20">{locale === 'ro' ? 'SECURITATE COLECTIVĂ.' : 'COLLECTIVE SECURITY.'}</span>
          </h2>
          <p className="mil-text-metadata max-w-2xl mx-auto leading-relaxed text-center">
            {locale === 'ro' 
              ? "Puterea americană este multiplicată prin coaliții globale integrate. Prin NATO și parteneriate tehnologice de ultimă oră precum AUKUS, democrațiile lumii asigură descurajarea colectivă."
              : "American power is force-multiplied through integrated global coalitions. Through NATO and cutting-edge tech partnerships like AUKUS, the world's democracies secure collective deterrence."}
          </p>
        </div>
        <AlliancesShowcase alliances={alliances} locale={locale} />
        <div className="mt-12 flex justify-center">
          <Link
            href="/global-leadership/nato"
            className="inline-flex h-11 items-center justify-center border border-white/15 bg-white px-5 text-xs font-bold uppercase text-black transition-colors hover:bg-white/85"
          >
            {locale === 'ro' ? "EXPLOREAZĂ DIPLOMAȚIA NATO →" : "EXPLORE NATO DIPLOMACY →"}
          </Link>
        </div>
      </Section>

      {/* ─── §14  QUOTE — full-bleed cinematic ──────────────────────────────── */}
      {/* ─── §14  QUOTE — full-viewport cinematic ──────────────────────────── */}
      <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 mil-dot-canvas opacity-30" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <blockquote className="text-[clamp(28px,5vw,72px)] font-black tracking-wider leading-[1.7] text-white/90 mb-24" style={{ wordSpacing: '0.08em' }}>
            &ldquo;{quote.quote}&rdquo;
          </blockquote>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))' }} />
              <cite className="mil-text-metadata not-italic tracking-[0.4em] text-[11px] font-black uppercase text-white/70">
                {quote.attribution} — {quote.title}
              </cite>
              <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.2))' }} />
            </div>
            {quote.note && (
              <p className="mil-text-metadata max-w-xl mx-auto opacity-30 text-[10px] leading-relaxed italic">
                {quote.note}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ─── §15  CHAPTER NAVIGATION ─────────────────────────────────────────── */}
      <Section
        id="explore"
        label={locale === 'ro' ? "IMAGINEA DE ANSAMBLU" : "THE FULL PICTURE"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/economy",     label: locale === 'ro' ? "Economie" : "Economy",      sub: locale === 'ro' ? "Motor Financiar" : "Financial Engine" },
            { href: "/nature",      label: locale === 'ro' ? "Natură" : "Nature",       sub: locale === 'ro' ? "Peisaj Primal" : "Primal Landscape" },
            { href: "/science",     label: locale === 'ro' ? "Inovație" : "Innovation",   sub: locale === 'ro' ? "Tehnologia Viitorului" : "Future Tech" },
            { href: "/history",     label: locale === 'ro' ? "Moștenire" : "Heritage",     sub: locale === 'ro' ? "Legatul Libertății" : "Legacy of Liberty" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mil-glass p-8 group hover:bg-white/5 transition-colors"
            >
              <div className="text-xl font-bold uppercase mb-2 group-hover:translate-x-1 transition-transform">{item.label}</div>
              <div className="mil-text-metadata text-[11px] font-bold text-white/40 tracking-widest uppercase">{item.sub}</div>
            </Link>
          ))}
        </div>

        {/* Deep Dive Archive */}
        <DeepDiveSection
          locale={locale}
          topics={VERTICALS_THEMATIC_DATA["military"] || []}
          theme={DEEP_DIVE_THEMES.military}
        />
 
        {/* Interactive Chat CTA */}
        <div className="mt-16 border border-glory-gold/20 bg-glory-gold/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
          <div>
            <span className="mil-text-metadata text-xs uppercase tracking-[0.2em] text-[#E8B923] mb-2 block">
              {locale === "ro" ? "Ai întrebări despre forța militară a SUA?" : "Have questions about U.S. Military strength?"}
            </span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-(family-name:--font-archivo)">
              {locale === "ro" ? "Oracolul Ask America" : "The Ask America Oracle"}
            </h3>
            <p className="mil-text-metadata text-white/50 text-sm mt-2 max-w-2xl">
              {locale === "ro"
                ? "Discută cu AI despre alianța NATO, cele 11 grupuri de atac cu portavion, bugetul de apărare sau programele viitoare DARPA."
                : "Discuss with AI about the NATO alliance, the 11 carrier strike groups, defense budgets, or future DARPA programs."}
            </p>
          </div>
          <Link
            href="/interactive"
            className="shrink-0 inline-flex items-center gap-3 px-6 py-3.5 bg-glory-gold hover:bg-glory-gold-light text-black font-body font-semibold text-sm transition-colors rounded-none shadow-lg"
          >
            {locale === "ro" ? "ÎNTREABĂ AMERICA →" : "ASK AMERICA →"}
          </Link>
        </div>

        {/* Bottom classification strip */}
        <div className="mt-48 pt-12 border-t border-white/5 flex items-center justify-center gap-8">
          <div className="h-px w-24 bg-linear-to-r from-transparent to-white/10" />
          <span className="mil-text-metadata text-[11px] font-black text-white/40 tracking-[0.5em] uppercase">
            {locale === 'ro' 
              ? "America: Cea Mai Mare Națiune · Comandă Planetară"
              : "America: The Greatest Nation · Planetary Command"}
          </span>
          <div className="h-px w-24 bg-linear-to-l from-transparent to-white/10" />
        </div>
      </Section>
      
      {/* Footer Spacer */}
      <div className="h-32 bg-black" />
    </div>
  );
}
