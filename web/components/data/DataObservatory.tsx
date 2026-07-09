"use client";

// ─────────────────────────────────────────────────────────────────────────────
// DataObservatory.tsx — the "America by the Numbers" data hub (/data)
//
// A dark, dashboard-grade landing page that gathers the empirical record across
// EVERY vertical: headline indicators, domain stat bands (economy, capital,
// innovation, nature, military, science, culture, quality of life, global
// leadership), the reused chart gallery, an accurate cross-domain world-share
// scorecard, links into every vertical, and the source ledger. Bilingual.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  Users,
  Map as MapIcon,
  Images,
  ShieldQuestion,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GdpBarChart } from "@/components/data/GdpBarChart";
import { SP500Chart } from "@/components/data/SP500Chart";
import { VCBarChart, UnicornPieChart } from "@/components/data/VCCharts";
import { DollarReserveChart, MarketCapChart } from "@/components/data/DollarMarketCharts";
import { ParkVisitorsChart, GreatLakesChart } from "@/components/data/NatureCharts";
import {
  GDP_COMPARISON,
  GDP_PER_CAPITA,
  SP500_HISTORY,
  VC_BY_COUNTRY,
  UNICORNS_BY_COUNTRY,
  DOLLAR_RESERVE_SHARE,
  MARKET_CAP_BY_EXCHANGE,
} from "@/lib/data/economy-data";
import { TOP_PARKS_VISITORS, GREAT_LAKES_DATA } from "@/lib/data/nature-data";
import { BUDGET_DATA } from "@/lib/data/military-data";
import { SITE_IMAGES } from "@/lib/site-images";

const EASE = [0.16, 1, 0.3, 1] as const;

type Accent = "gold" | "red" | "blue" | "green";
const ACCENT: Record<Accent, string> = {
  gold: "#E8B923",
  red: "#C8442E",
  blue: "#5B8CFF",
  green: "#3Fae74",
};

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionHead({ index, eyebrow, title, blurb }: { index: string; eyebrow: string; title: string; blurb?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-12 max-w-3xl"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[11px] font-black tracking-[0.35em] text-glory-gold">{index}</span>
        <span className="h-px w-10 bg-glory-gold/40" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white/45">{eyebrow}</span>
      </div>
      <h2 className="font-hero text-3xl uppercase leading-[0.95] tracking-wide text-white sm:text-4xl md:text-5xl">{title}</h2>
      {blurb && <p className="mt-4 font-body text-base leading-relaxed text-white/55">{blurb}</p>}
    </motion.div>
  );
}

// ─── Stat ────────────────────────────────────────────────────────────────────
interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
  source: string;
  accent: Accent;
}

function StatCard({ d, i }: { d: Stat; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors hover:border-white/15"
    >
      {/* Accent bar + number share a flex row so the bar lines up with the
          number's height exactly (leading-none keeps the line box tight). */}
      <div className="flex items-stretch gap-3">
        <span className="w-0.75 shrink-0 rounded-full" style={{ background: ACCENT[d.accent] }} />
        <div className="font-macro-display text-4xl font-black leading-none tracking-tight md:text-5xl" style={{ color: ACCENT[d.accent] }}>
          <AnimatedCounter value={d.value} prefix={d.prefix} suffix={d.suffix} decimals={d.decimals} />
        </div>
      </div>
      <p className="mt-3 font-display text-base font-semibold text-white">{d.label}</p>
      <p className="mt-1 font-body text-sm leading-snug text-white/50">{d.sub}</p>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{d.source}</p>
    </motion.div>
  );
}

function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((d, i) => (
        <StatCard key={d.label} d={d} i={i} />
      ))}
    </div>
  );
}

// ─── Chart frame ─────────────────────────────────────────────────────────────
function ChartFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`rounded-2xl border border-white/8 bg-white/[0.015] p-6 md:p-8 ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function DomainBlock({
  index,
  eyebrow,
  title,
  blurb,
  shaded,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  blurb?: string;
  shaded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={shaded ? "border-t border-white/5 bg-white/[0.012]" : ""}>
      <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
        <SectionHead index={index} eyebrow={eyebrow} title={title} blurb={blurb} />
        {children}
      </div>
    </section>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export function DataObservatory({ isRo }: { isRo: boolean }) {
  const t = isRo
    ? {
        heroEyebrow: "Registru Empiric · Cu Surse · Verificat",
        heroTitle1: "AMERICA",
        heroTitle2: "ÎN CIFRE",
        heroDeck:
          "Bilanțul măsurabil al celei mai puternice națiuni din istorie, acoperind economia, capitalul, inovația, natura, apărarea, știința și cultura, strâns într-un singur observator de date, cu fiecare cifră legată de o sursă primară.",
        scrollHint: "Derulează pentru a explora",
        exploreEyebrow: "Toate Verticalele",
        exploreTitle: "Explorează Fiecare Domeniu",
        exploreBlurb: "Fiecare verticală conține seturi de date detaliate și articole aprofundate în secțiunea „IN DEPTH”.",
        toolsLabel: "Instrumente de Date",
        sourcesEyebrow: "Registrul Surselor",
        sourcesTitle: "De Unde Provin Cifrele",
        sourcesBlurb:
          "Fiecare statistică de pe acest site provine din surse primare sau din instituții publice larg recunoscute. Nicio cifră nu este inventată.",
      }
    : {
        heroEyebrow: "Empirical Record · Sourced · Verified",
        heroTitle1: "AMERICA",
        heroTitle2: "BY THE NUMBERS",
        heroDeck:
          "The measurable record of the most powerful nation in history, covering economy, capital, innovation, nature, defense, science, and culture, gathered into a single data observatory, with every figure tied to a primary source.",
        scrollHint: "Scroll to explore",
        exploreEyebrow: "Every Vertical",
        exploreTitle: "Explore Every Domain",
        exploreBlurb: "Each vertical carries detailed datasets and long-form analysis in its “IN DEPTH” section.",
        toolsLabel: "Data Tools",
        sourcesEyebrow: "Source Ledger",
        sourcesTitle: "Where the Numbers Come From",
        sourcesBlurb:
          "Every statistic on this site is drawn from primary sources or widely trusted public institutions. No figure is invented.",
      };

  const L = (en: string, ro: string) => (isRo ? ro : en);

  // ── Headline indicators (12) ──────────────────────────────────────────────
  const indicators: Stat[] = [
    { value: 32.4, prefix: "$", suffix: "T", decimals: 1, accent: "gold", label: L("GDP", "PIB"), sub: L("World's largest economy", "Cea mai mare economie din lume"), source: "IMF 2026" },
    { value: 94.4, prefix: "$", suffix: "K", decimals: 1, accent: "gold", label: L("GDP per Capita", "PIB / Locuitor"), sub: L("Highest among major economies", "Cel mai ridicat între marile economii"), source: "IMF 2026" },
    { value: 954, prefix: "$", suffix: "B", accent: "red", label: L("Defense Budget", "Buget de Apărare"), sub: L("More than the next 10 combined", "Mai mult decât următoarele 10 la un loc"), source: "SIPRI 2025" },
    { value: 425, suffix: "+", accent: "blue", label: L("Nobel Laureates", "Laureați Nobel"), sub: L("More than any other nation", "Mai mulți decât orice altă națiune"), source: L("Nobel Foundation 2025", "Fundația Nobel 2025") },
    { value: 940, prefix: "$", suffix: "B", accent: "blue", label: L("Annual R&D", "Cercetare-Dezvoltare/an"), sub: L("World's largest research budget", "Cel mai mare buget de cercetare"), source: "OECD 2024" },
    { value: 1172, accent: "blue", label: L("Unicorn Startups", "Startup-uri Unicorn"), sub: L("65% of the world total", "65% din totalul mondial"), source: "CB Insights 2025" },
    { value: 7, suffix: "/10", accent: "red", label: L("Top 10 Universities", "Top 10 Universități"), sub: L("World's best are American", "Cele mai bune din lume sunt americane"), source: L("QS World Rankings", "Clasamentul QS") },
    { value: 63, accent: "green", label: L("National Parks", "Parcuri Naționale"), sub: L("85M acres of protected land", "85 mil. acri de teren protejat"), source: "NPS 2025" },
    { value: 11, accent: "red", label: L("Supercarriers", "Portavioane"), sub: L("More than the rest of Earth combined", "Mai multe decât tot restul lumii"), source: L("U.S. Navy 2025", "Marina SUA 2025") },
    { value: 57.4, suffix: "%", decimals: 1, accent: "gold", label: L("USD Reserve Share", "Cota USD în Rezerve"), sub: L("Of global FX reserves", "Din rezervele valutare globale"), source: "IMF COFER 2026" },
    { value: 342, suffix: "M", accent: "blue", label: L("Americans", "Americani"), sub: L("Third-most populous nation", "A treia cea mai populată națiune"), source: L("Census 2025", "Recensământ 2025") },
    { value: 25, suffix: "%", accent: "gold", label: L("Of World GDP", "Din PIB-ul Mondial"), sub: L("~4% of population, ~25% of output", "~4% din populație, ~25% din producție"), source: "World Bank 2026" },
    { value: 80.6, prefix: "$", suffix: "K", decimals: 1, accent: "green", label: L("Median Household Income", "Venit Median pe Gospodărie"), sub: L("Among the highest on Earth", "Printre cele mai ridicate din lume"), source: L("Census 2024", "Recensământ 2024") },
    { value: 139, accent: "gold", label: L("Fortune Global 500 Firms", "Firme Fortune Global 500"), sub: L("More than any other nation", "Mai multe decât orice altă națiune"), source: "Fortune 2025" },
    { value: 13.2, suffix: L(" Mb/d", " Mb/zi"), decimals: 1, accent: "gold", label: L("Crude Oil Production", "Producție de Petrol"), sub: L("World's largest producer", "Cel mai mare producător din lume"), source: "EIA 2025" },
    { value: 1.3, suffix: "M", decimals: 1, accent: "red", label: L("Active-Duty Military", "Militari Activi"), sub: L("Plus ~800k reserves", "Plus ~800k în rezervă"), source: "DoD 2025" },
  ];

  // ── Domain stat bands ──────────────────────────────────────────────────────
  const economyStats: Stat[] = [
    { value: 32.4, prefix: "$", suffix: "T", decimals: 1, accent: "gold", label: L("Total GDP", "PIB Total"), sub: L("Larger than next 3 combined", "Mai mare decât următoarele 3 la un loc"), source: "IMF 2026" },
    { value: 69, prefix: "$", suffix: "T", accent: "gold", label: L("Equity Market Cap", "Capitalizare Bursieră"), sub: L("NYSE + NASDAQ combined", "NYSE + NASDAQ împreună"), source: "Bloomberg 2025" },
    { value: 4.9, prefix: "$", suffix: "T", decimals: 1, accent: "gold", label: L("Annual Exports", "Exporturi Anuale"), sub: L("Goods and services", "Bunuri și servicii"), source: "BEA 2025" },
    { value: 4.2, suffix: "%", decimals: 1, accent: "gold", label: L("Unemployment", "Șomaj"), sub: L("Near historic lows", "Aproape de minime istorice"), source: "BLS 2025" },
  ];

  const innovationStats: Stat[] = [
    { value: 210, prefix: "$", suffix: "B", accent: "blue", label: L("Venture Capital", "Capital de Risc"), sub: L("~57% of the world total", "~57% din totalul mondial"), source: "PitchBook 2025" },
    { value: 350, suffix: "K+", accent: "blue", label: L("Patents / Year", "Brevete / An"), sub: L("Granted U.S. utility patents", "Brevete de invenție acordate"), source: "USPTO 2024" },
    { value: 70, suffix: "%", accent: "blue", label: L("Frontier AI Models", "Modele AI de Frontieră"), sub: L("Built by U.S. labs", "Create de laboratoare din SUA"), source: "Stanford AI Index 2025" },
    { value: 5, suffix: L("/5", "/5"), accent: "blue", label: L("Top Tech Firms", "Top Firme Tech"), sub: L("Apple, Microsoft, Nvidia, Alphabet, Amazon", "Apple, Microsoft, Nvidia, Alphabet, Amazon"), source: L("Market cap 2025", "Capitalizare 2025") },
  ];

  const natureStats: Stat[] = [
    { value: 63, accent: "green", label: L("National Parks", "Parcuri Naționale"), sub: L("Plus 360+ NPS sites", "Plus 360+ situri NPS"), source: "NPS 2025" },
    { value: 9.8, suffix: L("M km²", "M km²"), decimals: 1, accent: "green", label: L("Land Area", "Suprafață"), sub: L("Third-largest country on Earth", "A treia cea mai mare țară"), source: L("USGS", "USGS") },
    { value: 21, suffix: "%", accent: "green", label: L("Earth's Freshwater", "Apa Dulce a Planetei"), sub: L("Held in the Great Lakes", "În Marile Lacuri"), source: "EPA / NOAA" },
    { value: 325, suffix: "M+", accent: "green", label: L("Annual Park Visits", "Vizite Anuale în Parcuri"), sub: L("Across the NPS system", "În tot sistemul NPS"), source: "NPS 2024" },
  ];

  const militaryStats: Stat[] = [
    { value: 954, prefix: "$", suffix: "B", accent: "red", label: L("Defense Budget", "Buget de Apărare"), sub: L("~39% of world spending", "~39% din cheltuielile mondiale"), source: "SIPRI 2025" },
    { value: 11, accent: "red", label: L("Supercarriers", "Portavioane"), sub: L("Nuclear-powered, 100k tons each", "Nucleare, 100k tone fiecare"), source: L("U.S. Navy", "Marina SUA") },
    { value: 750, suffix: "+", accent: "red", label: L("Overseas Bases", "Baze în Străinătate"), sub: L("In ~80 countries", "În ~80 de țări"), source: "DoD 2024" },
    { value: 5044, accent: "red", label: L("Nuclear Warheads", "Focoase Nucleare"), sub: L("Triad: land, sea, air", "Triada: uscat, mare, aer"), source: L("Arms Control Assn. 2025", "Arms Control 2025") },
  ];

  const scienceStats: Stat[] = [
    { value: 425, suffix: "+", accent: "blue", label: L("Nobel Laureates", "Laureați Nobel"), sub: L("~38% of all prizes awarded", "~38% din toate premiile"), source: L("Nobel Foundation", "Fundația Nobel") },
    { value: 940, prefix: "$", suffix: "B", accent: "blue", label: L("R&D Spending", "Cheltuieli C-D"), sub: L("World's largest, ~30% of global", "Cele mai mari, ~30% global"), source: "OECD 2024" },
    { value: 7, suffix: "/10", accent: "blue", label: L("Top Universities", "Top Universități"), sub: L("Of the world's best 10", "Din cele mai bune 10 din lume"), source: "QS 2025" },
    { value: 1.1, suffix: "M", decimals: 1, accent: "blue", label: L("Intl. Students", "Studenți Internaționali"), sub: L("More than any nation", "Mai mulți decât orice națiune"), source: "IIE Open Doors 2024" },
  ];

  const cultureStats: Stat[] = [
    { value: 78, suffix: "%", accent: "gold", label: L("Global Box Office", "Box Office Global"), sub: L("Hollywood-distributed share", "Cota distribuită de Hollywood"), source: "MPA 2024" },
    { value: 190, accent: "gold", label: L("Netflix Countries", "Țări Netflix"), sub: L("In 45+ languages", "În 45+ limbi"), source: "Netflix 2025" },
    { value: 1.5, suffix: "B", decimals: 1, accent: "gold", label: L("English Speakers", "Vorbitori de Engleză"), sub: L("Global lingua franca", "Limba franca globală"), source: L("Ethnologue 2024", "Ethnologue 2024") },
    { value: 260, prefix: "$", suffix: "B", accent: "gold", label: L("Media & Entertainment", "Media & Divertisment"), sub: L("Largest market on Earth", "Cea mai mare piață din lume"), source: "PwC 2025" },
  ];

  const lifeStats: Stat[] = [
    { value: 94.4, prefix: "$", suffix: "K", decimals: 1, accent: "green", label: L("GDP per Capita", "PIB / Locuitor"), sub: L("Among the highest on Earth", "Printre cele mai ridicate"), source: "IMF 2026" },
    { value: 2300, accent: "green", label: L("Avg. New Home (sq ft)", "Casă Nouă Medie (sq ft)"), sub: L("Largest dwellings in the world", "Cele mai mari locuințe din lume"), source: "Census 2024" },
    { value: 32, accent: "blue", label: L("NATO Allies Led", "Aliați NATO Conduși"), sub: L("The indispensable nation since 1945", "Națiunea indispensabilă din 1945"), source: "NATO 2025" },
    { value: 750, suffix: "+", accent: "blue", label: L("Global Bases / Allies", "Baze / Aliați Globali"), sub: L("Security guarantor of the free world", "Garantul securității lumii libere"), source: "DoD 2024" },
  ];

  // ── World-share scorecard (accurate U.S. share of the GLOBAL total) ────────
  const scorecard: { domain: string; metric: string; figure: string; share: number; accent: Accent }[] = [
    { domain: L("Economy", "Economie"), metric: L("Share of world GDP", "Cota din PIB mondial"), figure: "$32.4T", share: 25, accent: "gold" },
    { domain: L("Capital Markets", "Piețe de Capital"), metric: L("Share of global equity value", "Cota din valoarea bursieră globală"), figure: "$69T", share: 44, accent: "gold" },
    { domain: L("Innovation", "Inovație"), metric: L("Share of global venture capital", "Cota din capitalul de risc global"), figure: "$210B", share: 57, accent: "blue" },
    { domain: L("Unicorns", "Unicorni"), metric: L("Share of world's unicorn startups", "Cota din unicornii lumii"), figure: "1,172", share: 65, accent: "blue" },
    { domain: L("Defense", "Apărare"), metric: L("Share of world military spending", "Cota din cheltuielile militare"), figure: "$954B", share: 39, accent: "red" },
    { domain: L("Science", "Știință"), metric: L("Share of all Nobel Prizes", "Cota din toate premiile Nobel"), figure: "425+", share: 38, accent: "blue" },
    { domain: L("Higher Ed", "Educație"), metric: L("Of the world's top 10 universities", "Din top 10 universități"), figure: "7 / 10", share: 70, accent: "red" },
    { domain: L("Frontier AI", "AI de Frontieră"), metric: L("Share of frontier AI models", "Cota din modelele AI de frontieră"), figure: "~70%", share: 70, accent: "blue" },
  ];

  // ── Verticals + tools ──────────────────────────────────────────────────────
  const verticals = [
    { href: "/economy", label: L("Economy", "Economie"), blurb: L("$32.4T GDP, markets, the dollar", "PIB $32,4T, piețe, dolarul"), accent: "gold" as Accent },
    { href: "/nature", label: L("Nature", "Natură"), blurb: L("63 parks, Arctic to tropics", "63 de parcuri, Arctica la tropice"), accent: "green" as Accent },
    { href: "/military", label: L("Military", "Armată"), blurb: L("11 carriers, global reach", "11 portavioane, acoperire globală"), accent: "red" as Accent },
    { href: "/constitution", label: L("Constitution", "Constituție"), blurb: L("250 years of self-government", "250 de ani de autoguvernare"), accent: "blue" as Accent },
    { href: "/culture", label: L("Culture", "Cultură"), blurb: L("Film, music, food, brands", "Film, muzică, mâncare, branduri"), accent: "gold" as Accent },
    { href: "/innovation", label: L("Innovation", "Inovație"), blurb: L("Internet, iPhone, AI", "Internet, iPhone, AI"), accent: "blue" as Accent },
    { href: "/science", label: L("Science", "Știință"), blurb: L("Inventions that built the world", "Invenții care au clădit lumea"), accent: "blue" as Accent },
    { href: "/universities", label: L("Universities", "Universități"), blurb: L("7 of the world's top 10", "7 din top 10 mondial"), accent: "red" as Accent },
    { href: "/quality-of-life", label: L("Quality of Life", "Calitatea Vieții"), blurb: L("Highest standard of living", "Cel mai înalt nivel de trai"), accent: "green" as Accent },
    { href: "/global-leadership", label: L("Global Leadership", "Lider Global"), blurb: L("Leading the free world", "Conducând lumea liberă"), accent: "blue" as Accent },
    { href: "/history", label: L("History", "Istorie"), blurb: L("Founding principles to today", "De la fondare până azi"), accent: "gold" as Accent },
  ];

  const tools = [
    { href: "/united-states", icon: Globe2, label: L("US Profile", "Profilul SUA"), desc: L("History, geography, government", "Istorie, geografie, guvern") },
    { href: "/immigration-demographics", icon: Users, label: L("Immigration & Demographics", "Imigrație și Demografie"), desc: L("Population and immigration", "Populație și imigrație") },
    { href: "/gallery", icon: Images, label: L("Photo Gallery", "Galerie Foto"), desc: L("High-fidelity visual archive", "Arhivă vizuală de înaltă fidelitate") },
    { href: "/explorer", icon: MapIcon, label: L("Map Explorer", "Explorator de Hartă"), desc: L("Interactive 50-state facts", "Date interactive ale celor 50 de state") },
    { href: "/data/misconceptions", icon: ShieldQuestion, label: L("Misconceptions", "Concepții Greșite"), desc: L("Debunking common myths", "Demontarea miturilor comune") },
  ];

  const sources = ["IMF", "World Bank", "SIPRI", L("Nobel Foundation", "Fundația Nobel"), L("U.S. Census Bureau", "Biroul de Recensământ SUA"), "Federal Reserve", L("National Park Service", "Serviciul Parcurilor Naționale"), "QS World Rankings", "OECD", "USPTO", "Bloomberg", "MPA"];

  return (
    <main className="bg-navy-dark">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <Image
          src={SITE_IMAGES.homeUsaAtNightFromSpace}
          alt={isRo ? "Statele Unite noaptea, văzute din spațiu" : "The United States at night from space"}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-dark/80 to-navy-dark" />
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "radial-gradient(rgba(232,185,35,0.12) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-glory-gold" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-glory-gold">{t.heroEyebrow}</span>
            </div>
            <h1 className="font-hero text-[clamp(48px,11vw,150px)] uppercase leading-[0.85] tracking-wide text-white">
              <span className="block">{t.heroTitle1}</span>
              <span className="block text-glory-gold">{t.heroTitle2}</span>
            </h1>
            <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-white/65">{t.heroDeck}</p>
          </motion.div>
        </div>
      </section>

      {/* §01 Headline dashboard */}
      <DomainBlock index="01" eyebrow={L("Headline Indicators", "Indicatori Principali")} title={L("The National Dashboard", "Tabloul de Bord Național")} blurb={L("Twelve figures that capture American scale across every domain.", "Douăsprezece cifre care rezumă scara americană pe toate domeniile.")}>
        <StatBand stats={indicators} />
      </DomainBlock>

      {/* §02 Economy & capital */}
      <DomainBlock shaded index="02" eyebrow={L("Economic Scale", "Scara Economică")} title={L("The Largest Economy on Earth", "Cea Mai Mare Economie de pe Pământ")} blurb={L("U.S. GDP exceeds the next three economies combined, at the highest GDP per capita of any major nation.", "PIB-ul SUA depășește următoarele trei economii la un loc, cu cel mai ridicat PIB pe cap de locuitor.")}>
        <div className="mb-6"><StatBand stats={economyStats} /></div>
        <div className="grid grid-cols-1 gap-6">
          <ChartFrame><GdpBarChart data={GDP_COMPARISON} title={L("GDP: U.S. vs. Major Economies (2026)", "PIB: SUA vs. Marile Economii (2026)")} subtitle={L("GDP in USD trillions", "PIB în trilioane USD")} valueSuffix="T" source="IMF 2026" /></ChartFrame>
          <ChartFrame><GdpBarChart data={GDP_PER_CAPITA.map((d) => ({ country: d.country, gdp: d.gdpPerCapita, flag: d.flag, highlight: d.highlight }))} title={L("GDP Per Capita (2026)", "PIB pe Cap de Locuitor (2026)")} subtitle={L("Thousands of USD per person", "Mii USD pe persoană")} valueSuffix="K" source="IMF 2026" /></ChartFrame>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartFrame><MarketCapChart data={MARKET_CAP_BY_EXCHANGE} title={L("Market Cap by Exchange (USD T)", "Capitalizare pe Burse (USD T)")} source="Bloomberg 2025" /></ChartFrame>
          <ChartFrame><DollarReserveChart data={DOLLAR_RESERVE_SHARE} title={L("Global FX Reserves by Currency", "Rezerve Valutare Globale după Monedă")} source="IMF COFER 2026" /></ChartFrame>
        </div>
      </DomainBlock>

      {/* §03 Innovation */}
      <DomainBlock index="03" eyebrow={L("Innovation Capital", "Capitalul Inovației")} title={L("Where the Future Gets Funded", "Unde se Finanțează Viitorul")} blurb={L("Nearly two-thirds of the world's venture capital and unicorn companies are American.", "Aproape două treimi din capitalul de risc global și din unicornii lumii sunt americani.")}>
        <div className="mb-6"><StatBand stats={innovationStats} /></div>
        <div className="grid grid-cols-1 gap-6">
          <ChartFrame><VCBarChart data={VC_BY_COUNTRY} title={L("Venture Capital by Country (USD B)", "Capital de Risc după Țară (mld. USD)")} source="PitchBook 2025" /></ChartFrame>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartFrame><UnicornPieChart data={UNICORNS_BY_COUNTRY} title={L("Unicorn Companies by Country", "Companii Unicorn după Țară")} source="CB Insights 2025" /></ChartFrame>
            <ChartFrame><SP500Chart data={SP500_HISTORY} title={L("The S&P 500 Index (1980–2026)", "Indicele S&P 500 (1980–2026)")} subtitle={L("Year-end index value", "Valoarea indicelui la sfârșit de an")} source="S&P Dow Jones 2026" /></ChartFrame>
          </div>
        </div>
      </DomainBlock>

      {/* §04 Nature */}
      <DomainBlock shaded index="04" eyebrow={L("Nature & Geography", "Natură și Geografie")} title={L("A Continent of Natural Wealth", "Un Continent de Bogăție Naturală")} blurb={L("Unrivaled natural beauty spanning from the Arctic to the tropics, featuring 63 national parks and a fifth of Earth's surface freshwater.", "Frumusețe naturală fără rival din Arctica până în zonele tropicale, cu 63 de parcuri naționale și o cincime din apa dulce a planetei.")}>
        <div className="mb-6"><StatBand stats={natureStats} /></div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartFrame><ParkVisitorsChart data={TOP_PARKS_VISITORS} title={L("Most-Visited National Parks (M visitors)", "Cele Mai Vizitate Parcuri (mil. vizitatori)")} source="NPS 2024" /></ChartFrame>
          <ChartFrame><GreatLakesChart data={GREAT_LAKES_DATA} title={L("Great Lakes by Water Volume (km³)", "Marile Lacuri după Volum (km³)")} source="EPA / NOAA" /></ChartFrame>
        </div>
      </DomainBlock>

      {/* §05 Military */}
      <DomainBlock index="05" eyebrow={L("Military Power", "Putere Militară")} title={L("The Most Powerful Military in History", "Cea Mai Puternică Armată din Istorie")} blurb={L("U.S. defense spending outpaces the next ten nations combined, with unmatched global reach.", "Cheltuielile de apărare ale SUA le depășesc pe ale următoarelor zece națiuni la un loc.")}>
        <div className="mb-6"><StatBand stats={militaryStats} /></div>
        <ChartFrame><GdpBarChart data={BUDGET_DATA.map((d) => ({ country: d.country, gdp: d.budget, flag: d.flag, highlight: d.country === "United States" }))} title={L("Defense Spending by Country (USD B)", "Cheltuieli de Apărare după Țară (mld. USD)")} subtitle={L("Annual military budget", "Buget militar anual")} valueSuffix="B" source="SIPRI 2025" /></ChartFrame>
      </DomainBlock>

      {/* §06 Science & education */}
      <DomainBlock shaded index="06" eyebrow={L("Science & Education", "Știință și Educație")} title={L("The Engine of Discovery", "Motorul Descoperirii")} blurb={L("America builds the modern world one invention at a time, training the minds that make it possible.", "America clădește lumea modernă o invenție pe rând, formând în același timp mințile care o fac.")}>
        <StatBand stats={scienceStats} />
      </DomainBlock>

      {/* §07 Culture */}
      <DomainBlock index="07" eyebrow={L("Culture & Soft Power", "Cultură și Putere Soft")} title={L("The Operating System of Modern Culture", "Sistemul de Operare al Culturii Moderne")} blurb={L("The global cultural powerhouse shaping film, music, sports, and fashion across the modern world.", "Forța culturală globală care dă formă filmului, muzicii, sportului și modei în întreaga lume modernă.")}>
        <StatBand stats={cultureStats} />
      </DomainBlock>

      {/* §08 Quality of life & leadership */}
      <DomainBlock shaded index="08" eyebrow={L("Quality of Life & Leadership", "Calitatea Vieții și Leadership")} title={L("The Highest Standard of Living", "Cel Mai Înalt Nivel de Trai")} blurb={L("The most prosperity for the most people — and the security guarantor of the free world.", "Cea mai mare prosperitate pentru cei mai mulți oameni — și garantul securității lumii libere.")}>
        <StatBand stats={lifeStats} />
      </DomainBlock>

      {/* §09 World-share scorecard */}
      <DomainBlock index="09" eyebrow={L("Dominance Scorecard", "Scorul Dominanței")} title={L("#1 in the World", "Locul #1 în Lume")} blurb={L("Each bar shows the U.S. share of the entire global total — not a head-to-head with one rival.", "Fiecare bară arată cota SUA din întregul total global — nu o comparație cu un singur rival.")}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {scorecard.map((row, i) => (
            <motion.div
              key={row.domain}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE }}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6"
            >
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold text-white">{row.domain}</p>
                  <p className="font-body text-xs text-white/40">{row.metric}</p>
                </div>
                <div className="shrink-0 text-right font-macro-display text-2xl font-black" style={{ color: ACCENT[row.accent] }}>{row.figure}</div>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: ACCENT[row.accent] }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.share}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
                {L(`${row.share}% of the global total`, `${row.share}% din totalul global`)}
              </div>
            </motion.div>
          ))}
        </div>
      </DomainBlock>

      {/* §10 Explore every vertical + tools */}
      <DomainBlock shaded index="10" eyebrow={t.exploreEyebrow} title={t.exploreTitle} blurb={t.exploreBlurb}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {verticals.map((v, i) => (
            <motion.div
              key={v.href}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.05, ease: EASE }}
            >
              <Link href={v.href} className="group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all hover:border-white/20 hover:bg-white/[0.04]">
                <span className="mb-3 h-[3px] w-8 rounded-full transition-all group-hover:w-14" style={{ background: ACCENT[v.accent] }} />
                <p className="font-display text-base font-semibold text-white">{v.label}</p>
                <p className="mt-1 flex-1 font-body text-xs leading-relaxed text-white/45">{v.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white/40 transition-colors group-hover:text-glory-gold">
                  {isRo ? "Deschide" : "Open"} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mb-5 mt-14 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">{t.toolsLabel}</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: EASE }}
              >
                <Link href={tool.href} className="group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all hover:border-glory-gold/40 hover:bg-white/[0.04]">
                  <Icon className="h-7 w-7 text-glory-gold" strokeWidth={1.5} />
                  <p className="mt-4 font-display text-xl font-semibold text-white group-hover:text-glory-gold">{tool.label}</p>
                  <p className="mt-1.5 flex-1 font-body text-sm leading-relaxed text-white/50">{tool.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </DomainBlock>

      {/* Source ledger */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
          <SectionHead index="✦" eyebrow={t.sourcesEyebrow} title={t.sourcesTitle} blurb={t.sourcesBlurb} />
          <div className="flex flex-wrap gap-3">
            {sources.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">{s}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
