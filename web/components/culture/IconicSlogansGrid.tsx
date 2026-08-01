"use client";

// ─── IconicSlogansGrid ───────────────────────────────────────────────────────
// "Commercial Slogans That Shaped Human Vocabulary": Interactive dossier exploring
// America's most iconic advertising slogans, copywriter credits, psychological
// hooks, and cultural linguistic impact.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface SloganItem {
  id: string;
  slogan: string;
  sloganRo: string;
  brand: string;
  year: string;
  logoFile?: string;
  logoInvert?: boolean;
  category: "Identity & Ambition" | "Global Culture & Idealism" | "Product Performance & USP";
  categoryRo: string;
  agency: string;
  copywriter: string;
  psychologicalHook: string;
  psychologicalHookRo: string;
  story: string;
  storyRo: string;
  linguisticImpact: string;
  linguisticImpactRo: string;
}

const ICONIC_SLOGANS: SloganItem[] = [
  {
    id: "nike-just-do-it",
    slogan: "Just Do It",
    sloganRo: "Just Do It (Doar fă-o)",
    brand: "Nike",
    year: "1988",
    logoFile: "/ASSETS/Companies/Logo_NIKE.svg",
    logoInvert: true,
    category: "Identity & Ambition",
    categoryRo: "Identitate & Ambiție",
    agency: "Wieden+Kennedy",
    copywriter: "Dan Wieden",
    psychologicalHook: "Motivational Imperative & Action Bias",
    psychologicalHookRo: "Imperativ motivațional și orientare spre acțiune",
    story:
      "Ad agency co-founder Dan Wieden coined the three-word line during a late-night prep session for Nike's first major multi-sport television campaign. By stripping away analytical hesitation, the slogan reframed athletic exertion from a daunting chore into an immediate personal choice.",
    storyRo:
      "Cofondatorul agenției Dan Wieden a conceput cele trei cuvinte în timpul unei sesiuni nocturne pentru prima campanie TV multisport Nike. Eliminând ezitarea analitică, sloganul a redefinit efortul sportiv dintr-o sarcină grea într-o alegere personală imediată.",
    linguisticImpact:
      "Transcended sports advertising to become the definitive global mantra for overcoming procrastination, self-doubt, and personal challenge.",
    linguisticImpactRo:
      "A depășit publicitatea sportivă devenind mantra globală definitivă pentru depășirea amânării, îndoielii de sine și provocărilor personale.",
  },
  {
    id: "apple-think-different",
    slogan: "Think Different",
    sloganRo: "Think Different (Gândește diferit)",
    brand: "Apple",
    year: "1997",
    logoFile: "/ASSETS/Companies/Apple_Logo white.svg",
    logoInvert: false,
    category: "Identity & Ambition",
    categoryRo: "Identitate & Ambiție",
    agency: "TBWA\\Chiat\\Day",
    copywriter: "Rob Siltanen & Craig Tanimoto",
    psychologicalHook: "Rebel Counter-Culture Identity Alignment",
    psychologicalHookRo: "Alinierea cu identitatea de rebel neconformist",
    story:
      "When Steve Jobs returned to Apple in 1997, the company was ninety days from bankruptcy. Rather than advertising computer processor megahertz, Apple celebrated 'the crazy ones, the misfits, the rebels' like Albert Einstein, Martin Luther King Jr., and Bob Dylan, linking Apple ownership to creative vision.",
    storyRo:
      "Când Steve Jobs s-a întors la Apple în 1997, compania era la nouăzeci de zile de faliment. În loc să facă reclamă la megahertzi, Apple i-a omagiat pe cei neconformiști, precum Albert Einstein, Martin Luther King Jr. și Bob Dylan.",
    linguisticImpact:
      "Reframed consumer technology purchasing from utilitarian utility into a philosophical badge of personal independence and creative rebellion.",
    linguisticImpactRo:
      "A redefinit cumpărarea de tehnologie dintr-o alegere utilitară într-un simbol de independență personală și rebeliune creativă.",
  },
  {
    id: "coke-buy-the-world-a-coke",
    slogan: "I'd Like to Buy the World a Coke",
    sloganRo: "Mi-ar plăcea să cumpăr o Cola pentru întreaga lume",
    brand: "Coca-Cola",
    year: "1971",
    logoFile: "/ASSETS/Companies/Coca-Cola_Logo_0.svg",
    logoInvert: false,
    category: "Global Culture & Idealism",
    categoryRo: "Cultură Globală & Idealism",
    agency: "McCann Erickson",
    copywriter: "Bill Backer",
    psychologicalHook: "Universal Human Connection & Peace Idealism",
    psychologicalHookRo: "Conexiune umană universală și idealism al păcii",
    story:
      "Stranded at an Irish airport during heavy fog, creative director Bill Backer observed passengers from hostile nations sitting together sharing soft drinks. He realized a bottle of Coca-Cola was a universal gesture of hospitality, inspiring the legendary 1971 Hilltop commercial filmed in Italy.",
    storyRo:
      "Blocat pe un aeroport din Irlanda din cauza ceții, directorul creativ Bill Backer a observat pasageri din națiuni ostile stând împreună și împărțind o băutură. A realizat că o sticlă de Coca-Cola este un gest universal de ospitalitate.",
    linguisticImpact:
      "Created the blueprint for modern global corporate idealism, proving that commercial products could embody planetary goodwill and unity.",
    linguisticImpactRo:
      "A creat modelul pentru idealismul corporativ global, demonstrând că produsele comerciale pot întruchipa bunăvoința și unitatea planetară.",
  },
  {
    id: "mms-melts-in-your-mouth",
    slogan: "Melts in Your Mouth, Not in Your Hand",
    sloganRo: "Se topește în gură, nu în mână",
    brand: "M&M's",
    year: "1954",
    logoFile: "/ASSETS/Companies/Mars_logo.svg",
    logoInvert: true,
    category: "Product Performance & USP",
    categoryRo: "Performanță Produs & USP",
    agency: "Ted Bates & Co.",
    copywriter: "Rosser Reeves",
    psychologicalHook: "Unique Selling Proposition (USP) Problem Solving",
    psychologicalHookRo: "Rezolvarea unei probleme prin Propunerea Unică de Vânzare",
    story:
      "Forest Mars Sr. observed Spanish Civil War soldiers eating chocolate pellets coated in a hard sugar shell that prevented melting in the heat. Advertising pioneer Rosser Reeves turned this functional hard-candy shell into the textbook definition of a Unique Selling Proposition.",
    storyRo:
      "Forest Mars Sr. a observat soldații din Războiul Civil Spaniol mâncând granule de ciocolată învelite într-o coajă tare de zahăr. Pionierul publicității Rosser Reeves a transformat această caracteristică în exemplul clasic de Propunere Unică de Vânzare.",
    linguisticImpact:
      "Became the gold standard case study in advertising textbooks for communicating an undeniable physical product benefit in eight memorable words.",
    linguisticImpactRo:
      "A devenit studiul de caz etalon în manualele de publicitate pentru comunicarea unui beneficiu fizic inegalabil în opt cuvinte memorabile.",
  },
  {
    id: "kfc-finger-lickin-good",
    slogan: "Finger Lickin' Good",
    sloganRo: "Atât de bun încât te lingi pe degete",
    brand: "KFC",
    year: "1956",
    logoFile: "/ASSETS/Companies/kfc.svg",
    logoInvert: false,
    category: "Product Performance & USP",
    categoryRo: "Performanță Produs & USP",
    agency: "KFC Franchise Management",
    copywriter: "Ken Harbough",
    psychologicalHook: "Unapologetic Sensory Taste Satisfaction",
    psychologicalHookRo: "Satisfacție senzorială autentică și fără scuze",
    story:
      "When a viewer complained to a TV station about Colonel Sanders eating chicken in the background of a live spot and licking his fingers, franchisee Ken Harbough spontaneously replied on air: 'Well, it's finger lickin' good!' The phrase was instantly adopted nationwide.",
    storyRo:
      "Când un telespectator s-a plâns că Colonelul Sanders își lingea degetele în fundalul unui spot TV, francizatul Ken Harbough a răspuns spontan în direct: „Păi, este atât de bun încât te lingi pe degete!”.",
    linguisticImpact:
      "Normalized hands-on, unpretentious dining comfort, becoming a shorthand phrase across the English language for exceptional food.",
    linguisticImpactRo:
      "A normalizat confortul culinar nepretențios, devenind o expresie uzuală în limba engleză pentru mâncarea excepțională.",
  },
  {
    id: "ford-quality-is-job-1",
    slogan: "Quality is Job 1",
    sloganRo: "Calitatea este Prioritatea #1",
    brand: "Ford",
    year: "1981",
    logoFile: "/ASSETS/Companies/Ford-Motor-Company-Logo.png",
    logoInvert: false,
    category: "Product Performance & USP",
    categoryRo: "Performanță Produs & USP",
    agency: "Wells Rich Greene Agency",
    copywriter: "Ford Advertising Committee",
    psychologicalHook: "Industrial Craftsmanship & Internal Accountability",
    psychologicalHookRo: "Măiestrie industrială și responsabilizare internă",
    story:
      "Facing intense competition from high-quality Japanese imports in the early 1980s, Ford launched a campaign centered on assembly worker pride. The line functioned as both an external customer promise and an internal factory manifesto for 100,000 auto workers.",
    storyRo:
      "Confruntat cu concurența importurilor japoneze de înaltă calitate la începutul anilor '80, Ford a lansat o campanie axată pe mândria muncitorilor. Linia a funcționat atât ca o promisiune externă, cât și ca un manifest intern.",
    linguisticImpact:
      "Pioneered corporate transparency campaigns by admitting past quality challenges and tying brand reputation directly to factory floor pride.",
    linguisticImpactRo:
      "A fost pionierul campaniilor de transparență corporativă, legând reputația brandului direct de mândria muncitorilor din fabrică.",
  },
  {
    id: "loreal-because-youre-worth-it",
    slogan: "Because You're Worth It",
    sloganRo: "Pentru că meriți",
    brand: "L'Oréal USA",
    year: "1971",
    logoFile: "/ASSETS/Companies/loreal.svg",
    logoInvert: true,
    category: "Global Culture & Idealism",
    categoryRo: "Cultură Globală & Idealism",
    agency: "McCann Erickson",
    copywriter: "Ilon Specht",
    psychologicalHook: "Female Self-Empowerment & Self-Worth",
    psychologicalHookRo: "Autonomia și stima de sine a femeilor",
    story:
      "Written in 1971 by 23-year-old copywriter Ilon Specht, this was the first advertising slogan in beauty history spoken from a woman's first-person perspective. Rather than seeking male approval, the line asserted that a woman purchases premium cosmetics for her own self-worth.",
    storyRo:
      "Scris în 1971 de tânăra de 23 de ani Ilon Specht, acest slogan a fost primul din istoria cosmeticei rostit la persoana întâi de o femeie. Linia a afirmat că o femeie cumpără cosmetice premium pentru propria ei stimă de sine.",
    linguisticImpact:
      "Became a landmark cultural anthem for female empowerment, self-regard, and personal validation across 40+ global languages.",
    linguisticImpactRo:
      "A devenit un imn cultural de referință pentru emanciparea femeilor și validarea personală în peste 40 de limbi globale.",
  },
  {
    id: "wendys-wheres-the-beef",
    slogan: "Where's the Beef?",
    sloganRo: "Unde este carnea?",
    brand: "Wendy's",
    year: "1984",
    logoFile: "/ASSETS/Companies/wendys.svg",
    logoInvert: false,
    category: "Product Performance & USP",
    categoryRo: "Performanță Produs & USP",
    agency: "Dancer Fitzgerald Sample",
    copywriter: "Clara Peller & Joe Sedelmaier",
    psychologicalHook: "Irreverent Satire & Competitor Vulnerability",
    psychologicalHookRo: "Satiră ireverențioasă și atacarea competitorilor",
    story:
      "Featuring 84-year-old actress Clara Peller inspecting a giant hamburger bun with a tiny patty, the commercial poked fun at competitors' skimpy meat portions. The phrase exploded overnight, boosting Wendy's sales by 31% and entering American political debates.",
    storyRo:
      "Prezentând-o pe actrița de 84 de ani Clara Peller examinând chifla uriașă cu o chiftea minusculă, reclama a râs de porțiile mici ale competitorilor. Expresia a crescut vânzările Wendy's cu 31% și a intrat în dezbaterile politice.",
    linguisticImpact:
      "Became a universal political and cultural catchphrase used to question the substance or honesty of any proposal, policy, or claim.",
    linguisticImpactRo:
      "A devenit o expresie politică și culturală universală folosită pentru a pune la îndoială substanța sau onestitatea unei propuneri.",
  },
];

export function IconicSlogansGrid() {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedId, setSelectedId] = useState<string>(ICONIC_SLOGANS[0].id);

  const filtered = activeCategory === "ALL"
    ? ICONIC_SLOGANS
    : ICONIC_SLOGANS.filter(s => s.category === activeCategory);

  const activeSlogan = ICONIC_SLOGANS.find(s => s.id === selectedId) || ICONIC_SLOGANS[0];

  return (
    <div className="my-16">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
        {[
          { id: "ALL", label: "All Slogans", labelRo: "Toate Sloganurile" },
          { id: "Identity & Ambition", label: "Identity & Ambition", labelRo: "Identitate & Ambiție" },
          { id: "Global Culture & Idealism", label: "Global Culture & Idealism", labelRo: "Cultură Globală & Idealism" },
          { id: "Product Performance & USP", label: "Product Performance & USP", labelRo: "Performanță & USP" },
        ].map((cat) => {
          const on = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className="px-5 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-widest transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.04)",
                color: on ? "#F5EDD8" : "rgba(245,237,216,0.7)",
                borderColor: on ? "#E8B923" : "rgba(255,255,255,0.1)",
                transform: on ? "scale(1.04)" : "scale(1)",
                boxShadow: on ? "0 10px 25px rgba(0,0,0,0.5)" : "none",
              }}
            >
              {ro ? cat.labelRo : cat.label}
            </button>
          );
        })}
      </div>

      {/* Slogan Cards Grid Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {filtered.map((item) => {
          const isSel = item.id === activeSlogan.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className="text-left rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between"
              style={{
                cursor: "pointer",
                backgroundColor: isSel ? "#0C0907" : "rgba(255,255,255,0.03)",
                color: isSel ? "#F5EDD8" : "rgba(245,237,216,0.7)",
                borderColor: isSel ? "#E8B923" : "rgba(255,255,255,0.08)",
                transform: isSel ? "translateY(-3px)" : "none",
                boxShadow: isSel ? "0 20px 45px rgba(0,0,0,0.6)" : "none",
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-[#E8391B]">
                    {item.brand}
                  </span>
                  <span className="font-mono text-xs font-bold opacity-60">
                    {item.year}
                  </span>
                </div>
                <p className="font-editorial text-xl italic font-bold leading-snug mb-2">
                  &ldquo;{ro ? item.sloganRo : item.slogan}&rdquo;
                </p>
              </div>
              <span className="font-body text-[10px] font-bold uppercase tracking-wider opacity-50 mt-4 block">
                {ro ? item.categoryRo : item.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Slogan Feature Dossier */}
      <div key={activeSlogan.id} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
        {/* Monumental Quote Display */}
        <div className="mb-10 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-glory-gold/10 border border-glory-gold/30 px-3.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-glory-gold">
                {activeSlogan.brand} · {activeSlogan.year}
              </span>
              <span className="font-body text-xs font-semibold text-[#F5EDD8]/60">
                {ro ? activeSlogan.categoryRo : activeSlogan.category}
              </span>
            </div>
            <span className="font-body text-xs font-semibold text-[#F5EDD8]/60">
              Agency: {activeSlogan.agency} (Copywriter: {activeSlogan.copywriter})
            </span>
          </div>

          <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl italic font-bold text-white leading-tight">
            &ldquo;{ro ? activeSlogan.sloganRo : activeSlogan.slogan}&rdquo;
          </h3>
        </div>

        {/* Dossier Grid */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Left Column: Psychological Hook & Copywriter Info */}
          <div className="space-y-6">
            {/* Psychological Hook Box */}
            <div className="rounded-2xl border border-glory-gold/30 bg-glory-gold/[0.05] p-6">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-glory-gold block mb-1">
                {ro ? "CÂRLIGUL PSIHOLOGIC" : "THE PSYCHOLOGICAL HOOK"}
              </span>
              <h4 className="font-macro-display text-2xl font-black text-white leading-tight">
                {ro ? activeSlogan.psychologicalHookRo : activeSlogan.psychologicalHook}
              </h4>
            </div>

            {/* Campaign Authorship Box */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-2">
                {ro ? "AUTORATUL CAMPANIEI" : "CAMPAIGN AUTHORSHIP"}
              </p>
              <p className="font-body text-sm font-bold text-white mb-1">
                {activeSlogan.agency}
              </p>
              <p className="font-editorial text-sm text-[#F5EDD8]/70">
                Key Copywriter: {activeSlogan.copywriter} ({activeSlogan.year})
              </p>
            </div>
          </div>

          {/* Right Column: Origin Story & Linguistic Impact */}
          <div className="space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
            <div>
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5EDD8]/50 mb-3">
                {ro ? "POVESTEA CAMPANIEI" : "CAMPAIGN ORIGIN STORY"}
              </p>
              <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#F5EDD8]/90">
                {ro ? activeSlogan.storyRo : activeSlogan.story}
              </p>
            </div>

            {/* Linguistic Impact Banner */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold mb-2">
                {ro ? "IMPACT LINGVISTIC & CULTURAL GLOBAL" : "GLOBAL LINGUISTIC & CULTURAL IMPACT"}
              </p>
              <p className="font-editorial text-base leading-relaxed text-[#F5EDD8]/80">
                {ro ? activeSlogan.linguisticImpactRo : activeSlogan.linguisticImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
