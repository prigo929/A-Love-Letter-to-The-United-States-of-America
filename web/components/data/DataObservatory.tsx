"use client";

// ─────────────────────────────────────────────────────────────────────────────
// DataObservatory.tsx — the "America by the Numbers" data hub (/data)
//
// A dark, dashboard-grade landing page that gathers the empirical record:
// headline indicators, the full chart gallery (reused from the economy
// vertical), a cross-domain "#1 in the world" scorecard, the data tools, and
// the source ledger. Fully bilingual via the `isRo` flag.
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
import {
  GDP_COMPARISON,
  GDP_PER_CAPITA,
  SP500_HISTORY,
  VC_BY_COUNTRY,
  UNICORNS_BY_COUNTRY,
  DOLLAR_RESERVE_SHARE,
  MARKET_CAP_BY_EXCHANGE,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";

const EASE = [0.16, 1, 0.3, 1] as const;

type Accent = "gold" | "red" | "blue";
const ACCENT: Record<Accent, string> = {
  gold: "#E8B923",
  red: "#C8442E",
  blue: "#5B8CFF",
};

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionHead({
  index,
  eyebrow,
  title,
  blurb,
}: {
  index: string;
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-12 max-w-3xl"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[11px] font-black tracking-[0.35em] text-glory-gold">
          {index}
        </span>
        <span className="h-px w-10 bg-glory-gold/40" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white/45">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-hero text-3xl uppercase leading-[0.95] tracking-wide text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {blurb && <p className="mt-4 font-body text-base leading-relaxed text-white/55">{blurb}</p>}
    </motion.div>
  );
}

// ─── Indicator card ──────────────────────────────────────────────────────────
interface Indicator {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
  source: string;
  accent: Accent;
}

function IndicatorCard({ d, i }: { d: Indicator; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors hover:border-white/15"
    >
      <span
        className="absolute left-0 top-5 h-9 w-[3px] rounded-full"
        style={{ background: ACCENT[d.accent] }}
      />
      <div
        className="font-macro-display text-4xl font-black leading-none tracking-tight md:text-5xl"
        style={{ color: ACCENT[d.accent] }}
      >
        <AnimatedCounter value={d.value} prefix={d.prefix} suffix={d.suffix} decimals={d.decimals} />
      </div>
      <p className="mt-3 font-display text-base font-semibold text-white">{d.label}</p>
      <p className="mt-1 font-body text-sm leading-snug text-white/50">{d.sub}</p>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
        {d.source}
      </p>
    </motion.div>
  );
}

// ─── Chart frame ─────────────────────────────────────────────────────────────
function ChartFrame({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="rounded-2xl border border-white/8 bg-white/[0.015] p-6 md:p-8"
    >
      {children}
    </motion.div>
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
          "Bilanțul măsurabil al celei mai puternice națiuni din istorie — economie, capital, inovație, știință și putere — strâns într-un singur observator de date, fiecare cifră fiind legată de o sursă primară.",
        scrollHint: "Derulează pentru a explora",
        s1eyebrow: "Indicatori Principali",
        s1title: "Tabloul de Bord Național",
        s1blurb:
          "Opt cifre care rezumă scara americană pe domenii — de la producție și apărare la știință și capital.",
        s2eyebrow: "Scara Economică",
        s2title: "Cea Mai Mare Economie de pe Pământ",
        s2blurb:
          "PIB-ul Statelor Unite depășește următoarele trei economii la un loc, menținând totodată cel mai ridicat PIB pe cap de locuitor dintre marile națiuni.",
        s3eyebrow: "Piețe de Capital",
        s3title: "Centrul Financiar al Lumii",
        s3blurb:
          "Bursele americane domină capitalizarea globală, iar dolarul rămâne moneda de rezervă implicită a planetei.",
        s4eyebrow: "Capitalul Inovației",
        s4title: "Unde se Finanțează Viitorul",
        s4blurb:
          "Aproape două treimi din capitalul de risc global și din companiile unicorn ale lumii sunt americane.",
        s5eyebrow: "Creșterea Pieței",
        s5title: "Patru Decenii de Compunere",
        s5blurb: "Indicele S&P 500 din 1980 până astăzi — motorul creării de avere din America.",
        s6eyebrow: "Scorul Dominanței",
        s6title: "Locul #1 în Lume",
        s6blurb:
          "Pe fiecare dimensiune a puterii naționale, o singură națiune conduce clasamentele globale.",
        s7eyebrow: "Instrumente de Date",
        s7title: "Explorează Arhiva",
        sourcesEyebrow: "Registrul Surselor",
        sourcesTitle: "De Unde Provin Cifrele",
        sourcesBlurb:
          "Fiecare statistică de pe acest site provine din surse primare sau din instituții publice larg recunoscute. Nicio cifră nu este inventată.",
        gdpTitle: "PIB: SUA vs. Marile Economii (2026)",
        gdpSub: "PIB în trilioane USD",
        gdpcapTitle: "PIB pe Cap de Locuitor (2026)",
        gdpcapSub: "Mii USD pe persoană",
        mcapTitle: "Capitalizare pe Burse (trilioane USD)",
        reserveTitle: "Rezerve Valutare Globale după Monedă",
        vcTitle: "Capital de Risc după Țară (mld. USD)",
        unicornTitle: "Companii Unicorn după Țară",
        spTitle: "Indicele S&P 500 (1980–2026)",
        spSub: "Valoarea indicelui la sfârșit de an",
        leadUsLabel: "SUA",
        leadWorldLabel: "Restul lumii",
      }
    : {
        heroEyebrow: "Empirical Record · Sourced · Verified",
        heroTitle1: "AMERICA",
        heroTitle2: "BY THE NUMBERS",
        heroDeck:
          "The measurable record of the most powerful nation in history — economy, capital, innovation, science, and power — gathered into a single data observatory, every figure tied to a primary source.",
        scrollHint: "Scroll to explore",
        s1eyebrow: "Headline Indicators",
        s1title: "The National Dashboard",
        s1blurb:
          "Eight figures that capture American scale across domains — from output and defense to science and capital.",
        s2eyebrow: "Economic Scale",
        s2title: "The Largest Economy on Earth",
        s2blurb:
          "U.S. GDP exceeds the next three economies combined, while maintaining the highest GDP per capita of any major nation.",
        s3eyebrow: "Capital Markets",
        s3title: "The Financial Center of the World",
        s3blurb:
          "American exchanges dominate global market capitalization, and the dollar remains the planet's default reserve currency.",
        s4eyebrow: "Innovation Capital",
        s4title: "Where the Future Gets Funded",
        s4blurb:
          "Nearly two-thirds of the world's venture capital and unicorn companies are American.",
        s5eyebrow: "Market Growth",
        s5title: "Four Decades of Compounding",
        s5blurb: "The S&P 500 from 1980 to today — America's wealth-creation engine.",
        s6eyebrow: "Dominance Scorecard",
        s6title: "#1 in the World",
        s6blurb:
          "Across every dimension of national power, one nation leads the global rankings.",
        s7eyebrow: "Data Tools",
        s7title: "Explore the Archive",
        sourcesEyebrow: "Source Ledger",
        sourcesTitle: "Where the Numbers Come From",
        sourcesBlurb:
          "Every statistic on this site is drawn from primary sources or widely trusted public institutions. No figure is invented.",
        gdpTitle: "GDP: U.S. vs. Major Economies (2026)",
        gdpSub: "GDP in USD trillions",
        gdpcapTitle: "GDP Per Capita (2026)",
        gdpcapSub: "Thousands of USD per person",
        mcapTitle: "Market Cap by Exchange (USD trillions)",
        reserveTitle: "Global FX Reserves by Currency",
        vcTitle: "Venture Capital by Country (USD B)",
        unicornTitle: "Unicorn Companies by Country",
        spTitle: "The S&P 500 Index (1980–2026)",
        spSub: "Year-end index value",
        leadUsLabel: "USA",
        leadWorldLabel: "Rest of world",
      };

  const indicators: Indicator[] = [
    { value: 32.4, prefix: "$", suffix: "T", decimals: 1, accent: "gold", label: isRo ? "PIB" : "GDP", sub: isRo ? "Cea mai mare economie din lume" : "World's largest economy", source: "IMF 2026" },
    { value: 94.4, prefix: "$", suffix: "K", decimals: 1, accent: "gold", label: isRo ? "PIB / Locuitor" : "GDP per Capita", sub: isRo ? "Cel mai ridicat între marile economii" : "Highest among major economies", source: "IMF 2026" },
    { value: 954, prefix: "$", suffix: "B", accent: "red", label: isRo ? "Buget de Apărare" : "Defense Budget", sub: isRo ? "Mai mult decât următoarele 10 la un loc" : "More than the next 10 combined", source: "SIPRI 2025" },
    { value: 425, suffix: "+", accent: "blue", label: isRo ? "Laureați Nobel" : "Nobel Laureates", sub: isRo ? "Mai mulți decât orice altă națiune" : "More than any other nation", source: isRo ? "Fundația Nobel 2025" : "Nobel Foundation 2025" },
    { value: 57.4, suffix: "%", decimals: 1, accent: "gold", label: isRo ? "Cota USD în Rezerve" : "USD Reserve Share", sub: isRo ? "Din rezervele valutare globale" : "Of global FX reserves", source: "IMF COFER 2026" },
    { value: 1172, accent: "blue", label: isRo ? "Startup-uri Unicorn" : "Unicorn Startups", sub: isRo ? "65% din totalul mondial" : "65% of the world total", source: "2025" },
    { value: 7, suffix: "/10", accent: "red", label: isRo ? "Top 10 Universități" : "Top 10 Universities", sub: isRo ? "Cele mai bune din lume sunt americane" : "World's best are American", source: isRo ? "Clasamentul QS" : "QS World Rankings" },
    { value: 342, suffix: "M", accent: "blue", label: isRo ? "Americani" : "Americans", sub: isRo ? "A treia cea mai populată națiune" : "Third-most populous nation", source: isRo ? "Recensământ 2025" : "Census 2025" },
  ];

  const scorecard = [
    { domain: isRo ? "Economie" : "Economy", metric: isRo ? "PIB total" : "Total GDP", us: 32.4, world: 20.8, unit: "$T", accent: "gold" as Accent },
    { domain: isRo ? "Capital" : "Capital Markets", metric: isRo ? "Capitalizare bursieră" : "Equity market cap", us: 69, world: 7.3, unit: "$T", accent: "gold" as Accent },
    { domain: isRo ? "Inovație" : "Innovation", metric: isRo ? "Capital de risc" : "Venture capital", us: 210, world: 45, unit: "$B", accent: "blue" as Accent },
    { domain: isRo ? "Apărare" : "Defense", metric: isRo ? "Cheltuieli militare" : "Military spending", us: 954, world: 336, unit: "$B", accent: "red" as Accent },
    { domain: isRo ? "Știință" : "Science", metric: isRo ? "Premii Nobel" : "Nobel prizes", us: 425, world: 121, unit: "", accent: "blue" as Accent },
    { domain: isRo ? "Educație" : "Higher Ed", metric: isRo ? "Top 10 universități" : "Top-10 universities", us: 7, world: 3, unit: "", accent: "red" as Accent },
  ];

  const tools = [
    { href: "/united-states", icon: Globe2, label: isRo ? "Profilul SUA" : "US Profile", desc: isRo ? "Istorie, geografie, guvern, cultură" : "History, geography, government, culture" },
    { href: "/immigration-demographics", icon: Users, label: isRo ? "Imigrație și Demografie" : "Immigration & Demographics", desc: isRo ? "Dinamica populației și a imigrației" : "Population and immigration dynamics" },
    { href: "/gallery", icon: Images, label: isRo ? "Galerie Foto" : "Photo Gallery", desc: isRo ? "Arhivă vizuală de înaltă fidelitate" : "High-fidelity visual archive" },
    { href: "/explorer", icon: MapIcon, label: isRo ? "Explorator de Hartă" : "Map Explorer", desc: isRo ? "Date interactive ale celor 50 de state" : "Interactive 50-state facts" },
    { href: "/data/misconceptions", icon: ShieldQuestion, label: isRo ? "Concepții Greșite" : "Misconceptions", desc: isRo ? "Demontarea miturilor comune" : "Debunking common myths" },
  ];

  const sources = ["IMF", "World Bank", "SIPRI", isRo ? "Fundația Nobel" : "Nobel Foundation", isRo ? "Biroul de Recensământ SUA" : "U.S. Census Bureau", "Federal Reserve", isRo ? "Serviciul Parcurilor Naționale" : "National Park Service", "QS World Rankings", "OECD", "Bloomberg"];

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
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: "radial-gradient(rgba(232,185,35,0.12) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
        />

        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-glory-gold" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-glory-gold">
                {t.heroEyebrow}
              </span>
            </div>
            <h1 className="font-hero text-[clamp(48px,11vw,150px)] uppercase leading-[0.85] tracking-wide text-white">
              <span className="block">{t.heroTitle1}</span>
              <span className="block text-glory-gold">{t.heroTitle2}</span>
            </h1>
            <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-white/65">
              {t.heroDeck}
            </p>
            <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-glory-gold" />
              {t.scrollHint}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── §01 Headline indicators ──────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
        <SectionHead index="01" eyebrow={t.s1eyebrow} title={t.s1title} blurb={t.s1blurb} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((d, i) => (
            <IndicatorCard key={d.label} d={d} i={i} />
          ))}
        </div>
      </section>

      {/* ── §02 Economic scale ───────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.012]">
        <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
          <SectionHead index="02" eyebrow={t.s2eyebrow} title={t.s2title} blurb={t.s2blurb} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartFrame>
              <GdpBarChart data={GDP_COMPARISON} title={t.gdpTitle} subtitle={t.gdpSub} valueSuffix="T" source="IMF 2026" />
            </ChartFrame>
            <ChartFrame>
              <GdpBarChart data={GDP_PER_CAPITA.map((d) => ({ country: d.country, gdp: d.gdpPerCapita, flag: d.flag, highlight: d.highlight }))} title={t.gdpcapTitle} subtitle={t.gdpcapSub} valueSuffix="K" source="IMF 2026" />
            </ChartFrame>
          </div>
        </div>
      </section>

      {/* ── §03 Capital markets ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
        <SectionHead index="03" eyebrow={t.s3eyebrow} title={t.s3title} blurb={t.s3blurb} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartFrame>
            <MarketCapChart data={MARKET_CAP_BY_EXCHANGE} title={t.mcapTitle} source="Bloomberg 2025" />
          </ChartFrame>
          <ChartFrame>
            <DollarReserveChart data={DOLLAR_RESERVE_SHARE} title={t.reserveTitle} source="IMF COFER 2026" />
          </ChartFrame>
        </div>
      </section>

      {/* ── §04 Innovation capital ───────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.012]">
        <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
          <SectionHead index="04" eyebrow={t.s4eyebrow} title={t.s4title} blurb={t.s4blurb} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartFrame>
              <VCBarChart data={VC_BY_COUNTRY} title={t.vcTitle} source="PitchBook 2025" />
            </ChartFrame>
            <ChartFrame>
              <UnicornPieChart data={UNICORNS_BY_COUNTRY} title={t.unicornTitle} source="CB Insights 2025" />
            </ChartFrame>
          </div>
        </div>
      </section>

      {/* ── §05 Market growth ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
        <SectionHead index="05" eyebrow={t.s5eyebrow} title={t.s5title} blurb={t.s5blurb} />
        <ChartFrame>
          <SP500Chart data={SP500_HISTORY} title={t.spTitle} subtitle={t.spSub} source="S&P Dow Jones Indices 2026" />
        </ChartFrame>
      </section>

      {/* ── §06 Dominance scorecard ──────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.012]">
        <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
          <SectionHead index="06" eyebrow={t.s6eyebrow} title={t.s6title} blurb={t.s6blurb} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {scorecard.map((row, i) => {
              const pct = Math.max(8, Math.round((row.us / (row.us + row.world)) * 100));
              return (
                <motion.div
                  key={row.domain}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE }}
                  className="rounded-2xl border border-white/8 bg-white/[0.02] p-6"
                >
                  <div className="mb-3 flex items-baseline justify-between">
                    <div>
                      <p className="font-display text-lg font-semibold text-white">{row.domain}</p>
                      <p className="font-body text-xs text-white/40">{row.metric}</p>
                    </div>
                    <div className="text-right font-macro-display font-black" style={{ color: ACCENT[row.accent] }}>
                      <span className="text-2xl">{row.unit.startsWith("$") ? "$" : ""}{row.us}{row.unit.replace("$", "")}</span>
                    </div>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: ACCENT[row.accent] }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/35">
                    <span>{t.leadUsLabel} · {pct}%</span>
                    <span>{t.leadWorldLabel}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── §07 Data tools ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
        <SectionHead index="07" eyebrow={t.s7eyebrow} title={t.s7title} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: EASE }}
              >
                <Link
                  href={tool.href}
                  className="group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all hover:border-glory-gold/40 hover:bg-white/[0.04]"
                >
                  <Icon className="h-7 w-7 text-glory-gold" strokeWidth={1.5} />
                  <p className="mt-4 font-display text-xl font-semibold text-white group-hover:text-glory-gold">
                    {tool.label}
                  </p>
                  <p className="mt-1.5 flex-1 font-body text-sm leading-relaxed text-white/50">
                    {tool.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-glory-gold opacity-0 transition-opacity group-hover:opacity-100">
                    {isRo ? "Deschide" : "Open"} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Source ledger ────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.012]">
        <div className="mx-auto max-w-screen-xl px-4 py-24 sm:px-6 md:py-28 lg:px-8">
          <SectionHead index="✦" eyebrow={t.sourcesEyebrow} title={t.sourcesTitle} blurb={t.sourcesBlurb} />
          <div className="flex flex-wrap gap-3">
            {sources.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
