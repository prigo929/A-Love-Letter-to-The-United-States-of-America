// ─── Military Power Main Page ─────────────────────────────────────────────────
// Phase 5: American Military Supremacy
// Design: defense-tech × aerospace × HUD × cinematic
// Palette: matte black · deep navy · graphite · steel blue · amber HUD

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb }  from "@/components/layout/Breadcrumb";
import { QuoteBlock }  from "@/components/sections/QuoteBlock";

import {
  HUDGrid,
  HUDCounter,
  RadarPing,
  WeaponSystemCard,
  BranchSelector,
  DARPAProgramGrid,
  NuclearTriadDiagram,
  GlobalCarrierMap,
  ParallaxMilitaryHero,
  BudgetComparisonBar,
} from "@/components/military/MilitaryAnimations";

import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { SITE_IMAGES } from "@/lib/site-images";

import {
  MILITARY_STATS,
  MILITARY_BRANCHES,
  WEAPON_SYSTEMS,
  DARPA_PROGRAMS,
  NUCLEAR_TRIAD,
  CARRIER_POSITIONS,
  MILITARY_QUOTES,
  DEFENSE_CONTRACTORS,
  getMilitaryFacts,
  getMilitaryStats,
} from "@/lib/data/military-data";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Military Power | America: The Greatest Nation",
  description:
    "The United States military: 11 carrier strike groups, 5,550 nuclear warheads, 13,247 aircraft, and a defense budget larger than the next 10 nations combined. The planet's only true global military superpower.",
  alternates: { canonical: "/military" },
  openGraph: {
    title: "American Military Supremacy — The World's Only Superpower",
    description:
      "$886 billion defense budget. 11 nuclear carriers. The B-21 Raider. Space Force. Cyber Command. An unmatched global military-industrial system.",
    url: "/military",
    images: [
      {
        url: SITE_IMAGES.b2Hero,
        width: 1280,
        height: 720,
        alt: "B-2 Spirit stealth bomber",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "American Military Power — The World's Only Superpower",
  description:
    "An interactive deep dive into US military supremacy: budget, branches, weapon systems, nuclear triad, and the next-generation systems that will define warfare in the 21st century.",
  url: "https://americagreatest.com/military",
};

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id, eyebrow, children, dark = true,
}: {
  id: string; eyebrow?: string; children: React.ReactNode; dark?: boolean;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-24 py-20"
      style={{ scrollMarginTop: "6rem" }}
    >
      {/* Amber top rule */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[rgba(245,158,11,0.2)] to-transparent" />
      {eyebrow && (
        <p className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-[#F59E0B]/70">
          ◼ {eyebrow}
        </p>
      )}
      {children}
    </section>
  );
}

// ─── Classified label ─────────────────────────────────────────────────────────

function ClassifiedHeader({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <>
      <p
        className="mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[#F59E0B]/50"
        aria-hidden="true"
      >
        // CLASSIFIED · TOP SECRET · NOFORN
      </p>
      <h2
        className="font-mono font-black uppercase leading-none tracking-tight text-white"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.01em" }}
      >
        {line1}
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {line2}
        </span>
      </h2>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MilitaryPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const stats  = getMilitaryStats(locale);
  const facts  = getMilitaryFacts(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO — B-2 Spirit emerging from darkness ───────────────────── */}
      <ParallaxMilitaryHero
        imageSrc={SITE_IMAGES.b2Hero}
        imageAlt="B-2 Spirit stealth bomber — the most advanced aircraft ever built"
      >
        <Breadcrumb
          items={[{ label: isRo ? "Putere Militară" : "Military Power" }]}
          className="mb-10"
          dark
        />

        {/* Overture label */}
        <p className="mb-6 font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F59E0B]/70">
          {isRo
            ? "PUTEREA MILITARĂ AMERICANĂ · SISTEMUL GLOBAL DE COMANDĂ ȘI CONTROL"
            : "AMERICAN MILITARY POWER · GLOBAL COMMAND AND CONTROL SYSTEM"}
        </p>

        {/* Headline */}
        <h1
          className="mb-6 font-mono font-black uppercase leading-none text-white"
          style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", letterSpacing: "-0.02em" }}
        >
          {isRo ? "SUPERPUTEREA" : "THE WORLD'S"}
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #92400E, #F59E0B, #FCD34D, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {isRo ? "PLANETEI" : "ONLY SUPERPOWER"}
          </span>
        </h1>

        {/* Sub */}
        <p className="mb-10 max-w-2xl font-mono text-sm leading-relaxed text-white/45">
          {isRo
            ? "$886 miliarde buget · 11 grupuri de atac portavioane · 13.247 aeronave · 5.550 focoase nucleare · 87+ sateliți militari · 750+ baze în 80 de țări"
            : "$886B budget · 11 carrier strike groups · 13,247 aircraft · 5,550 nuclear warheads · 87+ military satellites · 750+ bases in 80 countries"}
        </p>

        {/* Quick stats inline */}
        <div className="flex flex-wrap gap-6">
          {[
            { value: "$886B",  label: isRo ? "Buget" : "Budget"   },
            { value: "11",     label: isRo ? "Portavioane" : "Carriers" },
            { value: "13,247", label: isRo ? "Aeronave" : "Aircraft"  },
            { value: "5,550+", label: isRo ? "Focoase Nucleare" : "Nuclear Warheads" },
          ].map(s => (
            <div key={s.label} className="border-l-2 border-[#F59E0B]/40 pl-3">
              <p className="font-mono text-2xl font-bold text-[#F59E0B]">{s.value}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex items-center gap-3">
          <div className="h-px w-12 bg-[rgba(245,158,11,0.4)]" />
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
            {isRo ? "Derulează pentru Date Clasificate" : "Scroll for Classified Data"}
          </p>
        </div>
      </ParallaxMilitaryHero>

      {/* ── GLOBAL STAT WALL ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#04080F] px-4 py-16 sm:px-6 lg:px-8">
        <HUDGrid opacity={0.04} />
        <div className="relative z-10 mx-auto max-w-screen-xl">
          <p className="mb-8 font-mono text-[9px] uppercase tracking-[0.4em] text-[#F59E0B]/50 text-center">
            ◼ {isRo ? "DATE CLASIFICATE — NIVEL: SECRET" : "CLASSIFIED DATA — CLEARANCE LEVEL: SECRET"}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <HUDCounter
                key={s.id}
                value={s.value}
                suffix={s.suffix}
                prefix={s.prefix}
                decimals={s.decimals}
                label={s.label}
                sublabel={s.sublabel}
                color={s.color}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="relative bg-[#04080F]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

          {/* ── GLOBAL DOMINANCE OVERVIEW ─────────────────────────────── */}
          <Section id="overview" eyebrow={isRo ? "Prezentare Generală" : "Global Dominance"}>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <ClassifiedHeader
                  line1={isRo ? "SISTEMUL DE COMANDĂ" : "THE PLANETARY"}
                  line2={isRo ? "PLANETAR" : "COMMAND SYSTEM"}
                />
                <div className="mt-8 space-y-5">
                  <p className="font-body text-base leading-relaxed text-white/55">
                    {isRo
                      ? "Statele Unite nu operează o armată. Operează un sistem global de comandă și control — sateliți în orbită, portavioane pe fiecare ocean, baze în 80 de țări, forțe speciale pe 100 de teatre, cyber operations pe fiecare rețea adversă și o triadă nucleară care garantează că niciun atac nu poate rămâne fără răspuns."
                      : "The United States does not operate a military. It operates a global command-and-control system — satellites in orbit, carriers on every ocean, bases in 80 countries, special forces on 100 theaters, cyber operations in every adversary network, and a nuclear triad guaranteeing that no attack goes unanswered."}
                  </p>
                  <p className="font-body text-base leading-relaxed text-white/55">
                    {isRo
                      ? "Bugetul de apărare de 886 de miliarde de dolari depășește suma celor mai mari zece națiuni militare combinate. Nu este un număr — este o diferență de ordine de mărime în puterea de proiecție, tehnologie și acoperire globală care nu mai există în istoria modernă."
                      : "The $886 billion defense budget exceeds the combined sum of the next ten military nations. This is not a number — it is an order-of-magnitude difference in projection power, technology, and global reach that has no precedent in modern history."}
                  </p>
                </div>

                {/* Key dominance metrics */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { n: "#1", l: isRo ? "Putere Aeriană" : "Air Power",         s: isRo ? "Față de orice rival" : "vs any rival" },
                    { n: "#1", l: isRo ? "Putere Navală" : "Naval Power",         s: isRo ? "Față de orice rival" : "vs any rival" },
                    { n: "#1", l: isRo ? "Buget Apărare" : "Defense Budget",      s: "Next 10 nations" },
                    { n: "#1", l: isRo ? "Capabilitate Nucleară" : "Nuclear Capability", s: "Global deterrence" },
                  ].map(m => (
                    <div key={m.l} className="rounded-xl border border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.03)] p-4">
                      <p className="font-mono text-3xl font-bold text-[#F59E0B]">{m.n}</p>
                      <p className="font-mono text-xs font-semibold text-white/70">{m.l}</p>
                      <p className="font-mono text-[9px] text-white/30">{m.s}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radar + budget chart */}
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <RadarPing size={240} />
                </div>
                <BudgetComparisonBar
                  label={isRo ? "Buget Apărare (Miliarde USD, 2024)" : "Defense Budget (USD Billion, 2024)"}
                />
              </div>
            </div>
          </Section>

          {/* ── MILITARY BRANCHES ─────────────────────────────────────── */}
          <Section id="branches" eyebrow={isRo ? "Ramurile Militare" : "The Branches"}>
            <ClassifiedHeader
              line1={isRo ? "ȘASE RAMURI." : "SIX BRANCHES."}
              line2={isRo ? "UN SINGUR SCOP." : "ONE PURPOSE."}
            />
            <p className="mt-6 mb-10 max-w-2xl font-body text-base leading-relaxed text-white/50">
              {isRo
                ? "Armata, Marina, Forța Aeriană, Corpul Marinei, Space Force și Cyber Command — o arhitectură militară integrată pe toate domeniile care nu are egal."
                : "Army, Navy, Air Force, Marines, Space Force, and Cyber Command — a fully integrated all-domain military architecture with no peer."}
            </p>
            <BranchSelector branches={MILITARY_BRANCHES} />
          </Section>

          {/* ── CARRIER MAP ───────────────────────────────────────────── */}
          <Section id="global-reach" eyebrow={isRo ? "Acoperire Globală" : "Global Reach"}>
            <ClassifiedHeader
              line1={isRo ? "11 GRUPURI DE ATAC." : "11 STRIKE GROUPS."}
              line2={isRo ? "FIECARE OCEAN." : "EVERY OCEAN."}
            />
            <p className="mt-6 mb-8 max-w-2xl font-body text-base leading-relaxed text-white/50">
              {isRo
                ? "Grupurile de atac portavioane ale SUA se desfășoară în mod continuu pe întregul glob. Fiecare grup reprezintă mai multă putere aeriană decât forțele aeriene complete ale majorității națiunilor."
                : "US carrier strike groups deploy continuously across the entire globe. Each group represents more sustained air power than most nations' complete air forces. Hover over each position to identify the vessel."}
            </p>
            <GlobalCarrierMap carriers={CARRIER_POSITIONS} />

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: isRo ? "Portavioane SUA" : "US Carriers",         value: "11", note: isRo ? "Nucleare, supercarrier" : "Nuclear, supercarrier" },
                { label: isRo ? "Restul Lumii" : "Rest of World",           value: "2",  note: isRo ? "Capacitate de luptă comparabilă" : "Combat-comparable" },
                { label: isRo ? "Aeronave per Grup" : "Aircraft per Group", value: "90", note: isRo ? "Forță aeriană completă" : "Full air wing" },
                { label: isRo ? "Domeniu Maritim" : "Maritime Domain",      value: "500K mi²", note: isRo ? "Per grup de atac" : "Per strike group" },
              ].map(s => (
                <div key={s.label} className="rounded-xl border border-white/8 bg-[#080C14] p-4 text-center">
                  <p className="font-mono text-3xl font-bold text-[#60A5FA]">{s.value}</p>
                  <p className="font-mono text-xs font-semibold text-white/60">{s.label}</p>
                  <p className="font-mono text-[9px] text-white/30">{s.note}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── WEAPON SYSTEMS ────────────────────────────────────────── */}
          <Section id="weapons" eyebrow={isRo ? "Sisteme de Armament" : "Weapon Systems"}>
            <ClassifiedHeader
              line1={isRo ? "SISTEME DE" : "CROWN JEWELS OF"}
              line2={isRo ? "ARMAMENT DE ELITĂ" : "AMERICAN POWER"}
            />
            <p className="mt-6 mb-10 max-w-2xl font-body text-base leading-relaxed text-white/50">
              {isRo
                ? "Sistemele de armament care mențin superioritatea militară americană — de la bombardierul stealth B-21 la submarinele balistice Ohio-class. Dă click pe orice sistem pentru dosarul complet."
                : "The weapon systems that sustain American military supremacy — from the B-21 stealth bomber to Ohio-class ballistic missile submarines. Click any system to access the full dossier."}
            </p>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {WEAPON_SYSTEMS.map(ws => (
                <WeaponSystemCard key={ws.id} system={ws} />
              ))}
            </div>
          </Section>

          {/* ── NUCLEAR TRIAD ─────────────────────────────────────────── */}
          <Section id="nuclear" eyebrow={isRo ? "Triada Nucleară" : "Nuclear Triad"}>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <ClassifiedHeader
                  line1={isRo ? "TRIADA" : "THE NUCLEAR"}
                  line2={isRo ? "NUCLEARĂ" : "TRIAD"}
                />
                <div className="mt-8 space-y-5">
                  <p className="font-body text-base leading-relaxed text-white/55">
                    {isRo
                      ? "Triada nucleară — rachete balistice terestre, submarine balistice și bombardiere — garantează că niciun atac surpriză nu poate elimina simultan toate cele trei componente. Cât timp o componentă supraviețuiește, SUA pot răspunde."
                      : "The nuclear triad — land-based ICBMs, sea-based submarine missiles, and nuclear bombers — guarantees that no surprise attack can simultaneously destroy all three legs. As long as one leg survives, the US retains the ability to respond."}
                  </p>
                  <p className="font-body text-base leading-relaxed text-white/55">
                    {isRo
                      ? "Aceasta este logica descurajării: nu trebuie să câștigăm un schimb nuclear — trebuie doar să garantăm că adversarul îl pierde cu certitudine. Capacitatea garantată de a doua lovitură este motivul pentru care războiul nuclear nu a avut loc."
                      : "This is the logic of deterrence: we don't need to win a nuclear exchange — we only need to guarantee the adversary loses it decisively. Guaranteed second-strike capability is why nuclear war has not occurred."}
                  </p>
                </div>

                {/* Triad facts */}
                <div className="mt-8 space-y-3">
                  {[
                    isRo ? "400 ICBM-uri Minuteman III în alertă 24/7 în silozuri întărite" : "400 Minuteman III ICBMs on 24/7 alert in hardened silos",
                    isRo ? "14 submarine Ohio-class poartă 70% din arsenalul nuclear al SUA" : "14 Ohio-class submarines carry 70% of America's nuclear arsenal at sea",
                    isRo ? "Bombardierele pot fi rechemate după lansare — singura componentă retractabilă" : "Bombers are recallable after launch — the only retractable leg",
                    isRo ? "Sistemul GBSD/Sentinel va moderniza componenta terestră până în 2029" : "The GBSD/Sentinel system will modernize the land leg by 2029",
                  ].map((f, i) => (
                    <div key={i} className="flex gap-3 rounded-xl border border-white/6 bg-[#080C14] px-4 py-3">
                      <span className="mt-0.5 shrink-0 text-[#F59E0B]">◼</span>
                      <p className="font-body text-sm leading-snug text-white/60">{f}</p>
                    </div>
                  ))}
                </div>
              </div>

              <NuclearTriadDiagram legs={NUCLEAR_TRIAD.legs} description={NUCLEAR_TRIAD.description} />
            </div>
          </Section>

          {/* ── DARPA / FUTURE SYSTEMS ────────────────────────────────── */}
          <Section id="future" eyebrow={isRo ? "Sisteme Viitoare" : "Future Systems"}>
            {/* B-21 section image */}
            <div className="relative mb-10 overflow-hidden rounded-2xl">
              <Image
                src={SITE_IMAGES.b21Raider}
                alt="B-21 Raider on its first flight — December 2023"
                width={1280} height={500}
                className="h-[300px] w-full object-cover md:h-[380px]"
                style={{ filter: "brightness(0.5) saturate(0.7) contrast(1.15)" }}
                placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#04080F]/90 via-[#04080F]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04080F]/80 to-transparent" />
              <HUDGrid opacity={0.05} />
              {/* HUD corners */}
              {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((cls, i) => (
                <div key={i} className={`absolute ${cls} h-8 w-8 border-[rgba(245,158,11,0.5)] pointer-events-none`} />
              ))}
              <div className="absolute left-8 bottom-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F59E0B]/70 mb-1">ENTERING SERVICE 2023</p>
                <p className="font-mono text-4xl font-black uppercase text-white">B-21 Raider</p>
                <p className="font-mono text-sm text-white/45">6th Generation · Ultra-Low Observable · Nuclear Capable</p>
              </div>
            </div>

            <ClassifiedHeader
              line1={isRo ? "SISTEMELE" : "NEXT-GEN"}
              line2={isRo ? "VIITORULUI" : "SYSTEMS"}
            />
            <p className="mt-6 mb-10 max-w-2xl font-body text-base leading-relaxed text-white/50">
              {isRo
                ? "DARPA, Comandamentul Cyber și contractorii de apărare americani lucrează la sisteme care vor redefini războiul modern — arme hipersonice, sisteme de luptă autonome, arme cu energie dirijată și operații în domeniul cuantic."
                : "DARPA, Cyber Command, and American defense contractors are building the systems that will redefine modern warfare — hypersonic weapons, autonomous combat systems, directed energy, and quantum domain operations."}
            </p>
            <DARPAProgramGrid programs={DARPA_PROGRAMS} />
          </Section>

          {/* ── DEFENSE INDUSTRIAL BASE ───────────────────────────────── */}
          <Section id="industry" eyebrow={isRo ? "Baza Industriei de Apărare" : "Defense Industrial Base"}>
            <ClassifiedHeader
              line1={isRo ? "COMPLEXUL" : "THE MILITARY-"}
              line2={isRo ? "MILITAR-INDUSTRIAL" : "INDUSTRIAL COMPLEX"}
            />
            <p className="mt-6 mb-8 max-w-2xl font-body text-base leading-relaxed text-white/50">
              {isRo
                ? "Sistemul militar-industrial american — contractorii de apărare, laboratoarele naționale și universități de cercetare — este mașinăria de inovație care produce B-21, F-35 și sistemele care vor domina în continuare."
                : "The American military-industrial system — defense contractors, national laboratories, and research universities — is the innovation machine that produced the B-21, F-35, and the systems that will continue to dominate."}
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#080C14]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8 bg-[rgba(245,158,11,0.04)]">
                    {[
                      isRo ? "Contractor" : "Contractor",
                      isRo ? "Venituri" : "Revenue",
                      isRo ? "Specialitate" : "Specialty",
                      isRo ? "Programe Majore" : "Key Programs",
                    ].map(h => (
                      <th key={h} className="px-5 py-4 text-left font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-[#F59E0B]/50">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEFENSE_CONTRACTORS.map((dc, i) => (
                    <tr key={i} className="border-b border-white/5 transition-colors hover:bg-white/3">
                      <td className="px-5 py-4 font-mono text-sm font-bold text-white">{dc.name}</td>
                      <td className="px-5 py-4 font-mono text-lg font-bold text-[#F59E0B]">{dc.revenue}</td>
                      <td className="px-5 py-4 font-mono text-xs text-[#60A5FA]">{dc.specialty}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {dc.programs.slice(0, 3).map((p, j) => (
                            <span key={j} className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-white/45">{p}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* ── FACTS / CONTEXT ───────────────────────────────────────── */}
          <Section id="supremacy" eyebrow={isRo ? "Supremație" : "Supremacy by the Numbers"}>
            <ClassifiedHeader
              line1={isRo ? "SUPREMAȚIA" : "THE NUMBERS"}
              line2={isRo ? "ÎN CIFRE" : "DON'T LIE"}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(fact => (
                <div
                  key={fact.id}
                  className="group rounded-2xl border border-white/8 bg-[#080C14] p-5 transition-all hover:border-[rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.05)]"
                >
                  <p className="mb-2 font-body text-sm font-semibold leading-snug text-white/80">{fact.fact}</p>
                  <p className="mb-3 font-body text-xs leading-relaxed text-white/40">{fact.detail}</p>
                  <div className="flex items-center gap-2 border-t border-white/8 pt-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                    <p className="font-mono text-[9px] text-white/25">{fact.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── QUOTE ─────────────────────────────────────────────────── */}
          <section className="py-20">
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(245,158,11,0.15)] bg-[#080C14] p-8 md:p-12">
              <HUDGrid opacity={0.03} />
              <div className="relative z-10 max-w-3xl">
                <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.35em] text-[#F59E0B]/40">
                  ◼ {isRo ? "LOGICA DESCURAJĂRII" : "THE LOGIC OF DETERRENCE"}
                </p>
                <blockquote
                  style={{ fontFamily: "'EB Garamond','Georgia',serif" }}
                >
                  <p className="text-2xl italic leading-relaxed text-white/80 md:text-3xl">
                    {isRo
                      ? "\"Dacă vrei pace, pregătește-te de război.\" Superioritatea militară americană nu este o amenințare pentru pacea mondială — este fundamentul ei."
                      : "\"Si vis pacem, para bellum.\" American military supremacy is not a threat to world peace — it is the foundation of it. The 80 years of relative global peace since 1945 correlate precisely with the 80 years of American military dominance."}
                  </p>
                  <cite className="mt-6 block font-mono text-xs not-italic uppercase tracking-[0.25em] text-[#F59E0B]/60">
                    — {isRo ? "Vegetius · Principiul Descurajării" : "Vegetius · The Principle of Deterrence"}
                  </cite>
                </blockquote>
              </div>
              {/* Corner HUD */}
              {["top-4 right-4 border-t border-r", "bottom-4 right-4 border-b border-r"].map((cls, i) => (
                <div key={i} className={`absolute ${cls} h-8 w-8 border-[rgba(245,158,11,0.3)] pointer-events-none`} />
              ))}
            </div>
          </section>

          {/* ── SUB-PAGE NAV ──────────────────────────────────────────── */}
          <Section id="branches-explore" eyebrow={isRo ? "Ramuri — Imersiuni în Profunzime" : "Branches — Deep Dives"}>
            <ClassifiedHeader
              line1={isRo ? "ACCESAȚI" : "ACCESS"}
              line2={isRo ? "DOSARELE" : "THE DOSSIERS"}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { href: "/military/navy",        label: "Navy",       tagline: isRo ? "Dominanță Oceanică" : "Oceanic Dominance",       image: SITE_IMAGES.navyHero, alt: "USS Gerald R. Ford", badge: "11 Carriers"     },
                { href: "/military/air-force",   label: "Air Force",  tagline: isRo ? "Supremație Aeriană" : "Aerospace Supremacy",     image: SITE_IMAGES.airForceHero, alt: "F-22 Raptor", badge: "5th Gen"          },
                { href: "/military/space-force", label: "Space Force",tagline: isRo ? "Control Orbital" : "Orbital Control",            image: SITE_IMAGES.spaceForceLaunch, alt: "Space Force Launch", badge: "87+ Satellites" },
                { href: "/military/cyber",       label: "Cyber",      tagline: isRo ? "Câmpul de Luptă Digital" : "Digital Battlefield", image: SITE_IMAGES.cyberOps, alt: "Cyber operations", badge: "133 Teams"     },
                { href: "/military/marines",     label: "Marines",    tagline: isRo ? "Semper Fidelis" : "Always First",               image: SITE_IMAGES.marinesAssault, alt: "Amphibious Assault", badge: "Expeditionary" },
                { href: "/military/special-ops", label: "SOCOM",      tagline: isRo ? "Operații Speciale" : "Special Operations",       image: SITE_IMAGES.socomOperators, alt: "Special operations", badge: "70K+ Operators" },
              ].map(branch => (
                <Link
                  key={branch.href}
                  href={branch.href}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#080C14] transition-all duration-300 hover:border-[rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.06)]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={branch.image}
                      alt={branch.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                      style={{ filter: "brightness(0.45) saturate(0.7) contrast(1.1)" }}
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/30 to-transparent" />
                    {/* HUD corners */}
                    <div className="absolute top-2 left-2 h-4 w-4 border-t border-l border-[rgba(245,158,11,0.5)]" />
                    <div className="absolute top-2 right-2 h-4 w-4 border-t border-r border-[rgba(245,158,11,0.5)]" />
                    {/* Badge */}
                    <span className="absolute right-3 top-3 rounded border border-[rgba(245,158,11,0.4)] bg-[rgba(4,8,15,0.8)] px-2.5 py-0.5 font-mono text-[9px] text-[#F59E0B] backdrop-blur-sm">
                      {branch.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[#F59E0B]/60">{branch.tagline}</p>
                    <h3 className="font-mono text-lg font-bold uppercase tracking-wide text-white transition-colors group-hover:text-[#F59E0B]">
                      {branch.label}
                    </h3>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F59E0B] opacity-0 transition-opacity group-hover:opacity-100">
                      ACCESS DOSSIER →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

        </div>
      </div>
    </>
  );
}
