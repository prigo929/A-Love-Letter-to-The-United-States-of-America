"use client";

// ─── BrandAnatomyInteractive ──────────────────────────────────────────────────
// "The Anatomy of American Brand Power": Interactive 4-pillar breakdown of why
// American corporations export global consumer systems.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface BrandPillar {
  id: string;
  number: string;
  title: string;
  titleRo: string;
  subhead: string;
  subheadRo: string;
  quote: string;
  quoteRo: string;
  detail: string;
  detailRo: string;
  champions: string[];
  championsRo: string[];
  takeaway: string;
  takeawayRo: string;
}

const BRAND_PILLARS: BrandPillar[] = [
  {
    id: "systemic-distribution",
    number: "01",
    title: "Systemic Distribution Over Products",
    titleRo: "Distribuție sistemică în loc de simple produse",
    subhead: "Logistical Ubiquity & Global Availability",
    subheadRo: "Ubicuitate logistică și disponibilitate globală",
    quote: "If a product is within arm's reach of desire everywhere on Earth, it ceases to be a luxury and becomes an operating system.",
    quoteRo: "Dacă un produs este la îndemâna dorinței oriunde pe Pământ, încetează să mai fie un lux și devine un sistem de operare.",
    detail:
      "American corporations prioritize planetary logistics over niche perfection. Coca-Cola built 900+ bottling plants globally; McDonald's standardized supply chains across 100+ nations; Walmart invented big-box inventory tracking. The brand's power lies in guaranteeing that a customer in Tokyo, Lima, or Bucharest receives the exact same standard experience.",
    detailRo:
      "Corporațiile americane prioritizează logistica planetară în locul perfecțiunii de nișă. Coca-Cola a construit 900+ fabrici de îmbuteliere; McDonald's a standardizat lanțurile de aprovizionare în 100+ țări; Walmart a inventat urmărirea stocurilor. Puterea brandului constă în garantarea aceleiași experiențe la Tokyo, Lima sau București.",
    champions: ["Coca-Cola (900+ Bottlers)", "McDonald's (40,000+ Outlets)", "Walmart (Big-Box Logistics)"],
    championsRo: ["Coca-Cola (900+ Îmbuteliatori)", "McDonald's (40.000+ Locații)", "Walmart (Logistică Big-Box)"],
    takeaway: "Distribution network density creates brand moat depth that competitors cannot duplicate in decades.",
    takeawayRo: "Densitatea rețelei de distribuție creează un avantaj competitiv imposibil de replicat în decenii.",
  },
  {
    id: "humanized-interfaces",
    number: "02",
    title: "Intuitive & Humanized Interfaces",
    titleRo: "Interfețe intuitive și umanizate",
    subhead: "Simplifying Complexity for Planetary Adoption",
    subheadRo: "Simplificarea complexității pentru adoptare planetară",
    quote: "Technology succeeds globally when it hides its machinery behind elegant, friendly human gestures.",
    quoteRo: "Tehnologia reușește global atunci când își ascunde mecanismele în spatele unor gesturi umane elegante.",
    detail:
      "From Walt Disney's simplified cartoon geometry to Apple's touch screen and Google's single search bar, American tech giants design tools that require zero manual instruction. By focusing on intuitive human behavior, companies like Apple, Microsoft, and Amazon turn high tech into daily democratic utilities.",
    detailRo:
      "De la geometria simplă a desenelor lui Walt Disney la ecranul tactil Apple și bara unică de căutare Google, giganții americani proiectează instrumente care nu necesită instrucțiuni. Concentrându-se pe comportamentul intuitiv, Apple, Microsoft și Amazon transformă tehnologia înaltă în utilități zilnice.",
    champions: ["Apple (iPhone Multi-Touch)", "Google (Single Search Bar)", "Microsoft (Windows GUI)"],
    championsRo: ["Apple (iPhone Multi-Touch)", "Google (Bară Unică de Căutare)", "Microsoft (Interfață Windows)"],
    takeaway: "Reducing friction to zero is the single greatest competitive advantage in consumer technology history.",
    takeawayRo: "Reducerea fricțiunii la zero este cel mai mare avantaj competitiv din istoria tehnologiei.",
  },
  {
    id: "identity-uniforms",
    number: "03",
    title: "Lifestyle & Democratic Uniforms",
    titleRo: "Stil de viață și uniforme democratice",
    subhead: "Apparel Transcending Class & Boundaries",
    subheadRo: "Îmbrăcăminte ce depășește clasele și frontierele",
    quote: "Blue jeans are the ultimate egalitarian garment: worn by farmhands and presidents alike without losing authenticity.",
    quoteRo: "Blugii albaștri sunt articolul vestimentar egalitarist suprem: purtați de fermieri și președinți la fel.",
    detail:
      "American apparel brands created democratic fashion. Levi Strauss patented copper-riveted blue jeans in 1873 as rugged workwear; by the 1960s, denim became the uniform of youth freedom worldwide. Nike expanded this by turning athletic performance wear and sneakers into global streetwear aesthetics.",
    detailRo:
      "Brandurile americane de îmbrăcăminte au creat moda democratică. Levi Strauss a brevetat blugii cu nituri de cupru în 1873; până în anii 1960, denimul a devenit uniforma libertății tinerilor. Nike a extins acest concept transformând încălțămintea sportivă în estetică streetwear globală.",
    champions: ["Levi's (Copper-Riveted Denim)", "Nike (Air Force & Jordan)", "Ralph Lauren (Preppy Nautical)"],
    championsRo: ["Levi's (Denim cu nituri de cupru)", "Nike (Air Force & Jordan)", "Ralph Lauren (Stil Preppy)"],
    takeaway: "Democratic clothing items erase rigid class markers while allowing individual self-expression.",
    takeawayRo: "Articolele vestimentare democratice șterg barierele de clasă permițând exprimarea personală.",
  },
  {
    id: "storytelling-universes",
    number: "04",
    title: "Storytelling & Intellectual Property",
    titleRo: "Povești și proprietate intelectuală",
    subhead: "Emotional Bond & Pop-Culture Universes",
    subheadRo: "Legături emoționale și universuri pop culture",
    quote: "Products satisfy physical needs; story universes capture human imagination for generations.",
    quoteRo: "Produsele satisfac nevoi fizice; universurile narative captează imaginația umană pentru generații.",
    detail:
      "American commerce excels at creating narrative universes around symbols. Disney built a century-old empire spanning animation, theme parks, and movie studios. Corporations attach beloved characters, music, and emotional mythology to everyday products, creating multi-generational loyalty.",
    detailRo:
      "Comerțul american excelează în crearea de universuri narative în jurul simbolurilor. Disney a construit un imperiu de un secol ce cuprinde animație, parcuri tematice și studiouri. Corporațiile atașează personaje îndrăgite și mitologie emoțională produselor zilnice.",
    champions: ["Disney (Mickey, Marvel, Star Wars)", "Coca-Cola (Holiday Santa Lore)", "McDonald's (Happy Meal IP)"],
    championsRo: ["Disney (Mickey, Marvel, Star Wars)", "Coca-Cola (Mitologia lui Moș Crăciun)", "McDonald's (IP Happy Meal)"],
    takeaway: "Intellectual property networks convert standard commodities into cherished cultural milestones.",
    takeawayRo: "Rețelele de proprietate intelectuală transformă bunurile obișnuite în repere culturale dragi.",
  },
];

export function BrandAnatomyInteractive() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);

  const active = BRAND_PILLARS[sel] || BRAND_PILLARS[0];

  return (
    <div className="my-16">
      {/* 4 Pillar Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {BRAND_PILLARS.map((p, i) => {
          const on = i === sel;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSel(i)}
              className="text-left rounded-2xl p-6 transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.04)",
                color: on ? "#F5EDD8" : "rgba(245,237,216,0.7)",
                borderColor: on ? "#E8B923" : "rgba(255,255,255,0.1)",
                transform: on ? "translateY(-2px)" : "none",
                boxShadow: on ? "0 20px 45px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: on ? "#E8B923" : "#E8391B" }}>
                  Pillar {p.number}
                </span>
              </div>
              <p className="font-macro-display text-lg font-black leading-snug">
                {ro ? p.titleRo : p.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Dossier Card */}
      <div key={active.id} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold">
                PILONUL {active.number}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="font-body text-xs font-semibold text-[#F5EDD8]/60">
                {ro ? active.subheadRo : active.subhead}
              </span>
            </div>

            <h3 className="font-macro-display text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              {ro ? active.titleRo : active.title}
            </h3>

            <p className="font-editorial text-lg italic text-[#F5EDD8]/80 leading-relaxed mb-6">
              &ldquo;{ro ? active.quoteRo : active.quote}&rdquo;
            </p>

            {/* Champions list */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-3">
                {ro ? "CAMPIONI REPREZENTATIVI" : "REPRESENTATIVE CHAMPIONS"}
              </p>
              <div className="flex flex-wrap gap-2">
                {(ro ? active.championsRo : active.champions).map((c, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white/10 border border-white/10 px-3 py-1 font-body text-xs font-semibold text-[#F5EDD8]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Editorial Takeaway */}
            <div className="rounded-2xl border border-glory-gold/30 bg-glory-gold/[0.04] p-5">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold mb-2">
                {ro ? "CUNOAȘTERE EDITORIALĂ" : "EDITORIAL TAKEAWAY"}
              </p>
              <p className="font-editorial text-sm leading-relaxed text-[#F5EDD8]/80">
                {ro ? active.takeawayRo : active.takeaway}
              </p>
            </div>
          </div>

          {/* Right Column Detail Narrative */}
          <div className="flex flex-col justify-center gap-4 lg:pl-6 lg:border-l lg:border-white/10">
            <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#F5EDD8]/90">
              {ro ? active.detailRo : active.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
