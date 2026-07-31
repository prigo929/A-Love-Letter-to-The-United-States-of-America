"use client";

// ─── AmericanaOddsAndEnds ───────────────────────────────────────────────────
// "Odds & Ends of Americana": Six distinct curiosities of American pop culture,
// technology, folklore, and branding.
// Adapted from research in JJ McCullough's essay.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

interface AmericanaCuriosity {
  id: string;
  image: string;
  topic: string;
  topicRo: string;
  category: string;
  categoryRo: string;
  stat: string;
  statLabel: string;
  statLabelRo: string;
  headline: string;
  headlineRo: string;
  detail: string;
  detailRo: string;
  takeaway: string;
  takeawayRo: string;
}

const CURIOSITIES: AmericanaCuriosity[] = [
  {
    id: "funko-bobbleheads",
    image: SITE_IMAGES.culture.americanaBlockbuster,
    topic: "Bobbleheads & Funko Pops",
    topicRo: "Dolls Bobblehead și Funko Pops",
    category: "Collectibles & Toys",
    categoryRo: "Colecționabile și Jucării",
    stat: "30,000+",
    statLabel: "Licensed Figurines",
    statLabelRo: "Figurine Licențiate",
    headline: "From 1920s Clay Stadium Dolls to Washington State's Billion-Dollar Empire",
    headlineRo: "De la păpușile din lut din anii 1920 la imperiul din statul Washington",
    detail:
      "Bobblehead dolls emerged as 1920s clay sports novelties, resurging in the 1960s with athlete fandom and in the 2000s as nostalgic kitsch. Founded in Everett, Washington in 1998, Funko built an empire by dispensing with the bobble mechanism to focus purely on stylized pop-culture character licensing, generating $1B+ annually.",
    detailRo:
      "Păpușile bobblehead au apărut în anii 1920 ca noutăți sportive din lut, revenind în anii 1960 cu fanii sportivilor și în anii 2000 ca obiecte retro. Fondată în Everett, Washington în 1998, Funko a construit un imperiu renunțând la mecanismul de bobble pentru a se concentra exclusiv pe licențierea personajelor pop culture.",
    takeaway: "The average Funko Pop collector is 36 years old, demonstrating how adult nostalgia drives modern consumer toy markets.",
    takeawayRo: "Vârsta medie a colecționarului de Funko Pop este de 36 de ani, arătând cum nostalgia adulților alimentează piața de jucării.",
  },
  {
    id: "day-glo",
    image: SITE_IMAGES.culture.americanaDayGlo,
    topic: "Day-Glo Neon Pigments",
    topicRo: "Pigmenții neon Day-Glo",
    category: "Visual Tech & Pop Art",
    categoryRo: "Tehnologie Vizuală și Pop Art",
    stat: "1940s",
    statLabel: "California Military Invention",
    statLabelRo: "Invenție Militară California",
    headline: "WWII High-Visibility Military Signaling Transforming Pop Art & Posters",
    headlineRo: "Semnalizarea militară din Al Doilea Război Mondial transformată în artă pop",
    detail:
      "Fluorescent Day-Glo pigments were developed in the 1940s by brothers Bob and Joe Switzer in California. Initially used by the US military for high-visibility signaling flags and aircraft markings during WWII, the technology transitioned post-war into movie posters, safety gear, 1960s psychedelic art, and neon packaging.",
    detailRo:
      "Pigmenții fluorescenți Day-Glo au fost dezvoltați în anii 1940 de frații Bob și Joe Switzer în California. Utilizați inițial de armata americană pentru steaguri de semnalizare și marcaje de avioane în al Doilea Război Mondial, au fost adaptați postbelic în afișe de film, arte psihedelice și ambalaje neon.",
    takeaway: "Military utility tech regularly transitions into commercial pop-art visual aesthetics within one generation.",
    takeawayRo: "Tehnologia militară se transformă frecvent în estetică vizuală pop art în decursul unei singure generații.",
  },
  {
    id: "frankenstein",
    image: SITE_IMAGES.culture.americanaFrankenstein,
    topic: "Universal's Green Frankenstein",
    topicRo: "Frankenstein-ul verde Universal",
    category: "Cinema & Monster Lore",
    categoryRo: "Cinematografie și Monștri",
    stat: "1931",
    statLabel: "Boris Karloff Debut",
    statLabelRo: "Debutul lui Boris Karloff",
    headline: "From Mary Shelley's 1818 Novel to Hollywood's Green-Skinned Icon",
    headlineRo: "De la romanul lui Mary Shelley din 1818 la icoana cu piele verde de la Hollywood",
    detail:
      "While Mary Shelley wrote Frankenstein in 1818, Universal Pictures reinvented the creature in 1931 with actor Boris Karloff, introducing flat-head makeup, neck bolts, and green skin. The green skin choice originated from high-contrast black-and-white promotional posters, turning a literary figure into an American Halloween staple.",
    detailRo:
      "Deși Mary Shelley a scris Frankenstein în 1818, Universal Pictures a reinventat creatura în 1931 cu actorul Boris Karloff, introducând machiajul cu cap plat, șuruburile pe gât și pielea verde. Culoarea verde provenea din afișele de promovare în alto-contrast, transformând figura literară într-un simbol de Halloween.",
    takeaway: "Hollywood's visual design replaced 19th-century literature as the planetary default definition of classic monsters.",
    takeawayRo: "Designul vizual de la Hollywood a înlocuit literatura din secolul XIX ca definiție standard a monștrilor clasici.",
  },
  {
    id: "blockbuster-popcorn",
    image: SITE_IMAGES.culture.americanaBlockbuster,
    topic: "Blockbuster & Cinema Popcorn",
    topicRo: "Blockbuster și Popcorn-ul de Cinema",
    category: "Media & Concession Systems",
    categoryRo: "Media și Standuri de Concesiune",
    stat: "30%",
    statLabel: "US Popcorn at Theaters",
    statLabelRo: "Popcorn SUA consumat în cinema",
    headline: "Native American Parched Corn & 1985 Computer Inventory Systems",
    headlineRo: "Porumbul copt indigen și sistemele computerizate de inventar din 1985",
    detail:
      "Popcorn was introduced to European settlers by Native Americans. When movie theaters expanded in the early 20th century, cheap concession popcorn saved theater profits during the Great Depression. Decades later, computer programmer David Cook founded Blockbuster Video in 1985 to monetize a automated barcode tracking system, defining home movie rentals for millions.",
    detailRo:
      "Popcorn-ul a fost introdus primilor coloniști de către nativii americani. Când cinematografele s-au extins în secolul XX, popcorn-ul ieftin de la standuri a salvat profiturile studiourilor în timpul Marii Depresiuni. Decenii mai târziu, David Cook a fondat Blockbuster Video în 1985 pentru a monetiza un sistem automat de coduri de bare.",
    takeaway: "Popcorn remains the single most profitable concession item in cinematic history, with margins exceeding 800%.",
    takeawayRo: "Popcorn-ul rămâne cel mai profitabil produs de concesiune din istoria filmului, cu marje de peste 800%.",
  },
  {
    id: "dnd-beholder",
    image: SITE_IMAGES.culture.americanaDnd,
    topic: "Dungeons & Dragons & D20",
    topicRo: "Dungeons & Dragons și D20",
    category: "Gaming & Modern Myth",
    categoryRo: "Jocuri și Mitologie Modernă",
    stat: "1974",
    statLabel: "Midwest RPG Invention",
    statLabelRo: "Invenție RPG Midwest",
    headline: "Gary Gygax's Educational Supply Store Dice & Fantasy Canonization",
    headlineRo: "Daele din magazinele de rechizite ale lui Gary Gygax și canonul fantasy",
    detail:
      "Created in 1974 by Gary Gygax and Dave Arneson in Lake Geneva, Wisconsin, Dungeons & Dragons pioneered tabletop roleplaying. Gygax originally ordered 20-sided polyhedral dice from an educational school supply catalog. D&D standardized modern fantasy creature rosters, creating original iconic mascots like the multi-eyed Beholder in 1975.",
    detailRo:
      "Creat în 1974 de Gary Gygax și Dave Arneson în Lake Geneva, Wisconsin, Dungeons & Dragons a fost pionierul jocurilor de rol pe masă. Gygax a comandat inițial zarurile poliedrice cu 20 de fețe dintr-un catalog de rechizite școlare. D&D a standardizat lista de creaturi fantastice, creând mascote precum Beholder-ul cu mai mulți ochi în 1975.",
    takeaway: "The 20-sided die (D20) transformed from an obscure math-class teaching aid into the universal symbol of tabletop gaming.",
    takeawayRo: "Zarul cu 20 de fețe (D20) s-a transformat dintr-un material didactic de matematică în simbolul universal al jocurilor de masă.",
  },
  {
    id: "bald-eagle",
    image: SITE_IMAGES.culture.statueOfLiberty,
    topic: "The Bald Eagle & Great Seal",
    topicRo: "Vulturul pleșuv și Marele Sigiliu",
    category: "National Symbols",
    categoryRo: "Simboluri Naționale",
    stat: "340,000+",
    statLabel: "US Eagle Population",
    statLabelRo: "Populație de vulturi în SUA",
    headline: "1782 Congressional Seal Selection Over Franklin's Wild Turkey",
    headlineRo: "Alegerea din 1782 a Congresului în defavoarea curcanului lui Franklin",
    detail:
      "Chosen for the Great Seal of the United States in 1782, the Bald Eagle is a raptor exclusive to North America. Ben Franklin famously preferred the wild turkey, criticizing the eagle as a scavenger. After severe mid-20th century declines from DDT pesticide use, aggressive federal protection expanded populations from under 1,000 in 1963 to over 340,000 today.",
    detailRo:
      "Ales pentru Marele Sigiliu al Statelor Unite în 1782, vulturul pleșuv este o pasăre răpitoare exclusivă Americii de Nord. Ben Franklin a preferat curcanul sălbatic, criticând vulturul ca fiind un hoț. După scăderile din secolul XX provocate de pesticide, protecția federală a crescut populația de la sub 1.000 în 1963 la peste 340.000 azi.",
    takeaway: "The recovery of the American Bald Eagle is recognized as one of the greatest wildlife conservation victories in environmental history.",
    takeawayRo: "Refacerea populației de vulturi pleșuvi este recunoscută ca una dintre cele mai mari victorii de conservare din istorie.",
  },
];

export function AmericanaOddsAndEnds() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);

  const active = CURIOSITIES[sel] || CURIOSITIES[0];

  return (
    <div className="my-16">
      {/* 6 Curiosity Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {CURIOSITIES.map((c, i) => {
          const on = i === sel;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSel(i)}
              className="text-left rounded-2xl p-4 transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.04)",
                color: on ? "#F5EDD8" : "rgba(245,237,216,0.7)",
                borderColor: on ? "#E8B923" : "rgba(255,255,255,0.1)",
                transform: on ? "translateY(-2px)" : "none",
                boxShadow: on ? "0 16px 36px rgba(0,0,0,0.4)" : "none",
              }}
            >
              <p
                className="font-body text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                style={{ color: on ? "#E8B923" : "#E8391B" }}
              >
                {ro ? c.categoryRo : c.category}
              </p>
              <p className="font-macro-display text-sm font-black leading-snug">
                {ro ? c.topicRo : c.topic}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dossier Card */}
      <div key={active.id} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold">
                {ro ? active.categoryRo : active.category}
              </span>
            </div>

            <h3 className="font-macro-display text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
              {ro ? active.topicRo : active.topic}
            </h3>

            <p className="font-editorial text-lg italic text-[#F5EDD8]/80 leading-relaxed mb-6">
              &ldquo;{ro ? active.headlineRo : active.headline}&rdquo;
            </p>

            {/* Stat box */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-1">
                {ro ? active.statLabelRo : active.statLabel}
              </p>
              <p className="font-macro-display text-4xl font-black text-white">
                {active.stat}
              </p>
            </div>

            {/* Core takeaway */}
            <div className="rounded-2xl border border-glory-gold/30 bg-glory-gold/[0.04] p-5">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold mb-2">
                {ro ? "CUNOAȘTERE EDITORIALĂ" : "EDITORIAL TAKEAWAY"}
              </p>
              <p className="font-editorial text-sm leading-relaxed text-[#F5EDD8]/80">
                {ro ? active.takeawayRo : active.takeaway}
              </p>
            </div>
          </div>

          {/* Right column: image & text */}
          <div className="flex flex-col justify-center gap-6 lg:pl-6 lg:border-l lg:border-white/10">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10">
              <Image
                src={active.image}
                alt={active.topic}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#F5EDD8]/90">
              {ro ? active.detailRo : active.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
