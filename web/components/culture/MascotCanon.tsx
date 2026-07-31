"use client";

// ─── MascotCanon ─────────────────────────────────────────────────────────────
// "Why Do So Many Things Have Mascots?": The evolution of American branding,
// from Victorian founders and regimental luck to 1950s cereal icons and Gritty.
// Adapted from research in JJ McCullough's essay.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface MascotEra {
  id: string;
  era: string;
  eraRo: string;
  title: string;
  titleRo: string;
  subtitle: string;
  subtitleRo: string;
  tagline: string;
  taglineRo: string;
  detail: string;
  detailRo: string;
  examples: string[];
  examplesRo: string[];
  worthKnowing: string;
  worthKnowingRo: string;
}

const MASCOT_ERAS: MascotEra[] = [
  {
    id: "victorian",
    era: "1880s – 1900s",
    eraRo: "1880 – 1900",
    title: "Victorian Authority & Regimental Luck",
    titleRo: "Autoritatea victoriană și norocul regimental",
    subtitle: "From French 'Mascotte' to Handsome Dan and Bearded Founders",
    subtitleRo: "De la termenul francez „Mascotte” la Handsome Dan și fondatorii cu barbă",
    tagline: "Stern portraits lending personal credibility to mass-manufactured goods",
    taglineRo: "Portrete sobre care oferă credibilitate personală bunurilor produse în masă",
    detail:
      "The word mascot entered English in the 1880s from the French opera La Mascotte, meaning a lucky charm. British military regiments kept animals for morale, and in 1889, Yale University adopted a real bulldog named Handsome Dan, sparking the entire American college and professional sports mascot tradition. In commerce, Victorian companies placed portraits of their stern, bearded founders on packaging to project integrity and trustworthiness.",
    detailRo:
      "Cuvântul mascotă a intrat în limba engleză în anii 1880 din opera franceză La Mascotte, însemnând un talisman aducător de noroc. Regimentele militare britanice țineau animale pentru moral, iar în 1889, Universitatea Yale a adoptat un buldog real numit Handsome Dan, lansând întreaga tradiție americană a mascotelor sportive. În comerț, companiile victoriene puneau pe ambalaje portretele fondatorilor cu barbă pentru a transmite integritate și încredere.",
    examples: ["Handsome Dan (Yale Bulldog, 1889)", "Quaker Oats Man (1877)", "Stern Founder Portraits"],
    examplesRo: ["Handsome Dan (Buldogul Yale, 1889)", "Omul Quaker Oats (1877)", "Portretele sobre ale fondatorilor"],
    worthKnowing:
      "Bulldogs remain the single most common college sports mascot in the United States, all copying Yale's 1889 Handsome Dan.",
    worthKnowingRo:
      "Buldogii rămân cea mai comună mascotă sportivă universitară din Statele Unite, toți copiindu-l pe Handsome Dan de la Yale din 1889.",
  },
  {
    id: "early-cartoon",
    era: "1910s – 1930s",
    eraRo: "1910 – 1930",
    title: "Early Animation & Commercial Caricatures",
    titleRo: "Animația timpurie și caricaturile comerciale",
    subtitle: "Mr. Peanut, Campbell's Soup Kids, and Simple Geometry",
    subtitleRo: "Mr. Peanut, copiii Campbell's Soup și geometria simplă",
    tagline: "Simplifying character lines so animators could redraw them thousands of times",
    taglineRo: "Simplificarea liniilor personajului pentru a fi desenat de mii de ori",
    detail:
      "As hand-drawn animation emerged in the 1910s, drawing thousands of individual frames required simplified geometry: circle heads, solid lines, and pie eyes. Advertisers realized customers formed deep emotional bonds with simple cartoon icons. Early corporate characters like Mr. Peanut (1916) and the Campbell's Soup Kids capitalized on theatrical animation techniques to stand out on crowded grocer shelves.",
    detailRo:
      "Pe măsură ce animația desenată de mână a apărut în anii 1910, desenarea miilor de cadre individuale a necesitat o geometrie simplificată: capete circulare, linii solide și ochi simpli. Publicitarii au realizat că clienții dezvoltau legături emoționale profunde cu personajele de desene animate. Primele mascote precum Mr. Peanut (1916) și copiii Campbell's Soup au folosit aceste tehnici pentru a ieși în evidență pe rafturi.",
    examples: ["Mr. Peanut (Planters, 1916)", "Campbell's Soup Kids (1904)", "Wrigley Spearmint Men (1915)"],
    examplesRo: ["Mr. Peanut (Planters, 1916)", "Copiii Campbell's Soup (1094)", "Oamenii Wrigley Spearmint (1915)"],
    worthKnowing:
      "Mr. Peanut was originally drawn by a 14-year-old schoolboy named Antonio Gentile, who won a Planters Peanuts contest in 1916.",
    worthKnowingRo:
      "Mr. Peanut a fost desenat inițial de un școlar de 14 ani pe nume Antonio Gentile, care a câștigat un concurs Planters Peanuts în 1916.",
  },
  {
    id: "golden-age",
    era: "1950s – 1970s",
    eraRo: "1950 – 1970",
    title: "The Postwar TV & Cereal Golden Age",
    titleRo: "Era de aur a televiziunii și cerealelor postbelice",
    subtitle: "Tony the Tiger, Cap'n Crunch, and Television Commercials",
    subtitleRo: "Tony the Tiger, Cap'n Crunch și reclamele TV",
    tagline: "Hollywood animators hired by food giants to capture morning living rooms",
    taglineRo: "Animatori de la Hollywood angajați de giganții alimentari pentru reclame TV",
    detail:
      "Post-WWII family growth, rising purchasing power, and the arrival of television created the golden era of brand mascots. Food corporations hired elite animators to craft beloved living-room characters. Jay Ward, creator of Rocky & Bullwinkle, designed Cap'n Crunch in 1963. Characters like Tony the Tiger, the Pillsbury Doughboy, and the Trix Rabbit turned morning breakfast tables into entertainment hubs.",
    detailRo:
      "Creșterea familiilor postbelice, puterea de cumpărare în creștere și sosirea televiziunii au creat era de aur a mascotelor de brand. Corporațiile alimentare au angajat animatori de elită. Jay Ward, creatorul seriei Rocky & Bullwinkle, l-a proiectat pe Cap'n Crunch în 1963. Personaje precum Tony the Tiger, Pillsbury Doughboy și iepurele Trix au transformat micul dejun într-un spectacol.",
    examples: ["Tony the Tiger (Kellogg's, 1952)", "Cap'n Crunch (Quaker, 1963)", "Pillsbury Doughboy (1965)"],
    examplesRo: ["Tony the Tiger (Kellogg's, 1952)", "Cap'n Crunch (Quaker, 1963)", "Pillsbury Doughboy (1965)"],
    worthKnowing:
      "Cap'n Crunch's full name is Horatio Magellan Crunch, and his uniform features captain's stripes drawn by Rocky & Bullwinkle animator Jay Ward.",
    worthKnowingRo:
      "Numele complet al lui Cap'n Crunch este Horatio Magellan Crunch, iar uniforma sa are tres de căpitan desenate de animatorul Jay Ward.",
  },
  {
    id: "modern-antihero",
    era: "1980s – Present",
    eraRo: "1980 – Prezent",
    title: "Local Underdogs, Irony & Anti-Mascots",
    titleRo: "Mascote locale, ironie și personaje neconvenționale",
    subtitle: "From Local Small-Business Cartoons to Philadelphia's Gritty",
    subtitleRo: "De la desenele afacerilor locale la personajul Gritty din Philadelphia",
    tagline: "Embracing awkward, chaotic, and hyper-local characters for authentic charm",
    taglineRo: "Aprecierea caracterelor haotice și locale pentru un farmec autentic",
    detail:
      "While global corporations engineered polished mascots, local American small businesses relied on hand-drawn neighborhood characters: tile shop mascots, auto lube guys, local pizza heroes. In 2018, the Philadelphia Flyers hockey team unveiled Gritty, an intentionally chaotic, flawed creature. Gritty became a viral sensation, proving that audiences form stronger bonds with weird, imperfect characters than overly polished corporate symbols.",
    detailRo:
      "În timp ce marile corporații creau mascote șlefuite, afacerile locale americane se bazau pe personaje desenate de mână: mascote de magazine de gresie, personaje de la schimburile de ulei sau pizzerii de cartier. În 2018, echipa de hochei Philadelphia Flyers l-a prezentat pe Gritty, o creatură intenționat haotică și imperfectă. Gritty a devenit un fenomen viral, demonstrând că publicul se atașează mai mult de personaje ciudate și autentice.",
    examples: ["Gritty (Philadelphia Flyers, 2018)", "Geico Gecko (1999)", "Local Neighborhood Pizza & Auto Mascots"],
    examplesRo: ["Gritty (Philadelphia Flyers, 2018)", "Geico Gecko (1999)", "Mascotele pizzeriilor și service-urilor locale"],
    worthKnowing:
      "When Gritty was unveiled in 2018, public reaction shifted from initial shock to fiercely defensive love within 48 hours, making him a case study in mascot branding.",
    worthKnowingRo:
      "Când Gritty a fost prezentat în 2018, reacția publicului s-a schimbat de la șoc inițial la afecțiune protectoare în 48 de ore, devenind un studiu de caz în branding.",
  },
];

export function MascotCanon() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);

  const active = MASCOT_ERAS[sel] || MASCOT_ERAS[0];

  return (
    <div className="my-16">
      {/* Selector tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {MASCOT_ERAS.map((era, i) => {
          const on = i === sel;
          return (
            <button
              key={era.id}
              type="button"
              onClick={() => setSel(i)}
              className="text-left rounded-2xl p-5 transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.4)",
                color: on ? "#F5EDD8" : "#0C0907",
                borderColor: on ? "#0C0907" : "rgba(12,9,7,0.1)",
                transform: on ? "translateY(-2px)" : "none",
                boxShadow: on ? "0 20px 40px rgba(12,9,7,0.15)" : "none",
              }}
            >
              <p
                className="font-body text-[10px] font-bold uppercase tracking-[0.25em] mb-1"
                style={{ color: on ? "#E8391B" : "rgba(12,9,7,0.45)" }}
              >
                {ro ? era.eraRo : era.era}
              </p>
              <p className="font-macro-display text-base font-black leading-snug">
                {ro ? era.titleRo : era.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dossier card */}
      <div key={active.id} className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#0C0907]/10 p-8 md:p-12 shadow-[0_20px_60px_rgba(12,9,7,0.06)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
                {ro ? active.eraRo : active.era}
              </span>
            </div>
            <h3 className="font-macro-display text-3xl sm:text-4xl font-black text-[#0C0907] leading-tight mb-4">
              {ro ? active.titleRo : active.title}
            </h3>
            <p className="font-editorial text-lg italic text-[#0C0907]/80 leading-relaxed mb-6">
              &ldquo;{ro ? active.taglineRo : active.tagline}&rdquo;
            </p>

            {/* Notable examples */}
            <div className="rounded-2xl bg-[#0C0907]/5 border border-[#0C0907]/10 p-5 mb-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#0C0907]/50 mb-3">
                {ro ? "EXEMPLE ICONICE" : "ICONIC EXAMPLES"}
              </p>
              <div className="flex flex-wrap gap-2">
                {(ro ? active.examplesRo : active.examples).map((ex, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white/80 border border-[#0C0907]/10 px-3 py-1 font-body text-xs font-semibold text-[#0C0907]"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Worth knowing */}
            <div className="rounded-2xl border border-glory-gold/40 bg-glory-gold/10 p-5">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#0C0907] mb-2">
                {ro ? "DE ȘTIUT" : "WORTH KNOWING"}
              </p>
              <p className="font-editorial text-sm leading-relaxed text-[#0C0907]/80">
                {ro ? active.worthKnowingRo : active.worthKnowing}
              </p>
            </div>
          </div>

          {/* Right column: detailed breakdown */}
          <div className="flex flex-col justify-center gap-4 lg:pl-6 lg:border-l lg:border-[#0C0907]/10">
            <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#0C0907]/85">
              {ro ? active.detailRo : active.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
