"use client";

// ─── SchoolSuppliesCanon ─────────────────────────────────────────────────────
// The big seven of American stationery (paper, pencil, crayons, pen, eraser,
// ruler, scissors). Unlike most American cultural objects, these were mostly
// imported from Europe fully formed, with Americans making only minor tweaks,
// though America did become the world's paper superpower and gave the world both
// Crayola and the very word "eraser." A grid selects; the dossier opens each one.
//
// Adapted from a video essay's research (JJ, "American school supplies
// EXPLAINED"): its "big seven" canon and facts guided coverage; every line here
// is rewritten in the site's own voice, not transcribed. Cream/parchment
// editorial surface (dark text on cream).

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

const C = SITE_IMAGES.culture;

interface Supply {
  key: string;
  name: string;
  nameRo: string;
  origin: string;
  originRo: string;
  image: string;
  story: string;
  storyRo: string;
  facts: { stat: string; label: string; labelRo: string }[];
}

const SUPPLIES: Supply[] = [
  {
    key: "paper",
    name: "Paper",
    nameRo: "Hârtia",
    origin: "Arab → Italian, 1200s",
    originRo: "Arab → italian, sec. XIII",
    image: C.supplyPaper,
    story:
      "For most of European history, writing happened on stone, wax, and parchment, dried animal skin so costly that one sheep yielded about seven sheets, which mattered little when almost no one could read. Paper, a synthetic parchment of dried cotton mush, was picked up from Arab neighbors by the Italians in the 1200s; the city of Fabriano claims to have invented the European kind, and the Fabriano company, founded in 1264, still sells art paper today. Paper spread just as Gutenberg's press drove demand for it. The American chapter came in the 1860s, when a German immigrant in Massachusetts, Albrecht Pagenstecher, imported wood-pulp paper technology; with a whole continent of trees, he founded what became International Paper and displaced Europe as the world's paper superpower. Even the ruled blue lines are an invention: William Hickok of Harrisburg, Pennsylvania built the modern paper-ruling machine in the 1840s.",
    storyRo:
      "Pentru cea mai mare parte a istoriei europene, scrisul se făcea pe piatră, ceară și pergament, piele de animal uscată atât de scumpă încât o oaie dădea vreo șapte foi, ceea ce conta puțin când aproape nimeni nu știa să citească. Hârtia, un pergament sintetic din pastă de bumbac uscată, a fost preluată de la vecinii arabi de către italieni în anii 1200; orașul Fabriano pretinde că a inventat varianta europeană, iar compania Fabriano, fondată în 1264, vinde și azi hârtie de artă. Hârtia s-a răspândit exact când presa lui Gutenberg i-a crescut cererea. Capitolul american a venit în anii 1860, când un imigrant german din Massachusetts, Albrecht Pagenstecher, a importat tehnologia hârtiei din pastă de lemn; cu un întreg continent de copaci, a fondat ceea ce a devenit International Paper și a detronat Europa ca superputere mondială a hârtiei. Chiar și liniile albastre sunt o invenție: William Hickok din Harrisburg, Pennsylvania a construit mașina modernă de liniat hârtie în anii 1840.",
    facts: [
      { stat: "1264", label: "Fabriano still makes paper", labelRo: "Fabriano face hârtie și azi" },
      { stat: "1860s", label: "America becomes the paper superpower", labelRo: "America devine superputerea hârtiei" },
    ],
  },
  {
    key: "pencil",
    name: "The Pencil",
    nameRo: "Creionul",
    origin: "English graphite, 1600s",
    originRo: "Grafit englezesc, sec. XVII",
    image: C.supplyPencil,
    story:
      "A pencil is the modern version of an ancient chalk holder, a soft drawing-rock slotted into a stick for control and clean hands, the tool your favorite Renaissance artists used. Europe had plenty of lead, soft but not dark enough, which is why we still call the core \"lead.\" The breakthrough came in the mid-1500s, when a huge graphite deposit was found in northern England, and graphite made far better lead than lead. England hoarded it, refusing to sell abroad, until a Frenchman, Nicolas-Jacques Conté, mixed his scarce graphite with clay in 1794 and accidentally made an even better, softer, darker lead, the kind we still use. The German Faber family split into rival companies after their patriarch died in 1839; the eldest's firm devised the 16 hardness grades (B, HB, H, F), while a brother who emigrated to New York used a simpler number system, which is why Europe and America grade pencils differently to this day.",
    storyRo:
      "Un creion este versiunea modernă a unui vechi suport de cretă, o rocă moale de desenat înfiptă într-un băț pentru control și mâini curate, unealta pe care o foloseau artiștii Renașterii. Europa avea mult plumb, moale dar nu destul de închis, motiv pentru care încă numim miezul „mină de plumb”. Descoperirea a venit la mijlocul anilor 1500, când un uriaș zăcământ de grafit a fost găsit în nordul Angliei, iar grafitul făcea o mină mult mai bună decât plumbul. Anglia îl tezauriza, refuzând să-l vândă în afară, până când un francez, Nicolas-Jacques Conté, și-a amestecat grafitul puțin cu argilă în 1794 și a făcut din greșeală o mină și mai bună, mai moale și mai închisă, cea pe care o folosim și azi. Familia germană Faber s-a scindat în companii rivale după moartea patriarhului în 1839; firma celui mai mare a conceput cele 16 grade de duritate (B, HB, H, F), în timp ce un frate emigrat la New York a folosit un sistem mai simplu cu numere, motiv pentru care Europa și America notează creioanele diferit până azi.",
    facts: [
      { stat: "1794", label: "Conté's graphite-and-clay lead", labelRo: "Mina din grafit și argilă a lui Conté" },
      { stat: "16 vs 4", label: "European vs American grades", labelRo: "Grade europene vs americane" },
    ],
  },
  {
    key: "crayons",
    name: "Crayons",
    nameRo: "Creioanele cerate",
    origin: "German, 1840s",
    originRo: "Germane, anii 1840",
    image: C.supplyCrayons,
    story:
      "The word crayon is French for pencil, because the linguistics of school supplies are relentlessly confusing. Colored pencils came from the German Johann Staedtler in the 1840s, using a new lead of chalk and wax that laid down soft, chalky lines of color. He was not being wildly original; artists had used colored chalk for centuries, and crude wax crayons already existed for workers to scrawl numbers on crates and barrels. In late-19th-century New York, a company called Binney & Smith sold classroom chalk and black factory marking crayons, then had a simple idea: aim the second product at the first market. In 1903 they launched boxes of colored school crayons under a name dreamed up by Mr. Binney's wife, Crayola, which grew into one of the great American brands of the century.",
    storyRo:
      "Cuvântul „crayon” înseamnă creion în franceză, fiindcă lingvistica rechizitelor este necruțător de derutantă. Creioanele colorate au venit de la germanul Johann Staedtler în anii 1840, folosind o nouă mină din cretă și ceară care așeza linii moi și cretoase de culoare. Nu era foarte original; artiștii folosiseră cretă colorată de secole, iar creioanele cerate rudimentare existau deja pentru muncitorii care scriau numere pe lăzi și butoaie. În New York-ul de la sfârșitul secolului XIX, o companie numită Binney & Smith vindea cretă de clasă și creioane negre de marcaj pentru fabrici, apoi a avut o idee simplă: să îndrepte al doilea produs spre prima piață. În 1903 au lansat cutii de creioane cerate colorate sub un nume inventat de soția domnului Binney, Crayola, care a devenit unul dintre marile branduri americane ale secolului.",
    facts: [
      { stat: "1903", label: "Crayola is born", labelRo: "Se naște Crayola" },
      { stat: "Binney", label: "A wife named the brand", labelRo: "O soție a numit brandul" },
    ],
  },
  {
    key: "pen",
    name: "The Pen",
    nameRo: "Pixul",
    origin: "Ancient dip pen → 1940s ballpoint",
    originRo: "Toc vechi → pix, anii 1940",
    image: C.supplyPen,
    story:
      "It is easy to think of a pen as an upgraded pencil, but pens came first: long before anyone put chalk in wood, people dipped sharpened sticks into ink. For centuries Europeans thought feathers made the best dip pens, though they usually shaved the feathery part off and used the shaft; the Magna Carta was signed with one. Metal-nibbed dip pens went mainstream in the 1800s as a luxury. In 1884 the New Yorker L. E. Waterman engineered the fountain pen, a must-have for the next half-century, until an Argentine named László Bíró invented the ballpoint in the 1940s: no refilling, a ball bearing instead of a nib, and a cheap plastic body that could be made at massive scale. America's Reynolds mass-produced it from 1945, but France's Bic overtook everyone with its 1951 Cristal, which by 2021 had sold over 100 billion, enough for every human who ever lived.",
    storyRo:
      "E ușor să vezi pixul ca pe un creion îmbunătățit, dar pixurile au venit primele: cu mult înainte ca cineva să pună cretă în lemn, oamenii înmuiau bețe ascuțite în cerneală. Secole la rând europenii credeau că penele fac cele mai bune tocuri, deși de obicei tundeau partea pufoasă și foloseau tija; Magna Carta a fost semnată cu una. Tocurile cu peniță de metal s-au răspândit în anii 1800 ca articol de lux. În 1884 new-yorkezul L. E. Waterman a inventat stiloul, un must-have pentru următorul jumătate de secol, până când un argentinian pe nume László Bíró a inventat pixul în anii 1940: fără reumplere, o bilă în loc de peniță și un corp ieftin de plastic care se putea face la scară masivă. Reynolds din America l-a produs în masă din 1945, dar Bic din Franța i-a depășit pe toți cu modelul Cristal din 1951, care până în 2021 vânduse peste 100 de miliarde, destule pentru fiecare om care a trăit vreodată.",
    facts: [
      { stat: "1884", label: "Waterman's fountain pen", labelRo: "Stiloul lui Waterman" },
      { stat: "100B+", label: "Bic Cristals sold by 2021", labelRo: "Pixuri Bic Cristal vândute până în 2021" },
    ],
  },
  {
    key: "eraser",
    name: "The Eraser",
    nameRo: "Guma de șters",
    origin: "England, mid-1700s",
    originRo: "Anglia, mijlocul sec. XVIII",
    image: C.supplyEraser,
    story:
      "Erasers went mainstream with mass-produced pencils in the mid-1700s, credited to the English chemist Joseph Priestley, better known for discovering oxygen, who found that a strange new goop from New World trees absorbed graphite dust like a magnet. Here is the mind-bending part: the substance rubber was not called rubber until after erasers existed. In English, a rubber was a brush or cloth you rubbed things with, so a pencil eraser was a kind of rubber, and because erasers were the first mainstream use of the material, the material took the name too. A rubber tree is literally an eraser tree. Calling an eraser an eraser is a distinctly American move, dated to the early 1800s. Pink came from a next-generation Faber in New York, who patented the pencil-end metal band in 1891 and made the eraser pink, later echoed in the American Pink Pearl.",
    storyRo:
      "Gumele de șters s-au răspândit odată cu creioanele produse în masă la mijlocul anilor 1700, atribuite chimistului englez Joseph Priestley, mai cunoscut pentru descoperirea oxigenului, care a constatat că o pastă ciudată din copacii Lumii Noi absorbea praful de grafit ca un magnet. Iată partea uluitoare: substanța cauciuc nu se numea „rubber” până după ce au existat gumele. În engleză, un „rubber” era o perie sau o cârpă cu care frecai lucruri, deci o gumă de creion era un fel de „rubber”, iar fiindcă gumele au fost prima folosire de masă a materialului, materialul a luat și el numele. Un arbore de cauciuc este literalmente un arbore de gumă de șters. A numi o gumă „eraser” este o mișcare distinct americană, din anii 1800. Rozul a venit de la un Faber din generația următoare din New York, care a patentat banda metalică de la capătul creionului în 1891 și a făcut guma roz, ecou mai târziu în americanul Pink Pearl.",
    facts: [
      { stat: "1800s", label: "\"Eraser\" is an Americanism", labelRo: "„Eraser” este un americanism" },
      { stat: "1891", label: "The pink pencil-end band", labelRo: "Banda roz de la capătul creionului" },
    ],
  },
  {
    key: "ruler",
    name: "The Ruler",
    nameRo: "Rigla",
    origin: "Ancient → standardized 1790s",
    originRo: "Străveche → standardizată, anii 1790",
    image: C.supplyRuler,
    story:
      "A ruler is essential to any civilization that makes things, and it is genuinely ancient; the Met holds a chunk of an Egyptian one. For most of history skilled workers just made their own to whatever increments they found useful, which was fine, because accurate calculation depends on a consistent system of measurement more than any particular one. That idea is where the name comes from: just as a rubber rubs, a ruler gives you a rule to measure by. As states unified and trade grew, a common system became necessary; the French devised the metric system in 1795 and the British the imperial system in 1824, each calibrated to a set of sacred reference objects. Only then did mass-produced wooden rulers appear, and the achievement was prized enough that 19th-century big shots posed for portraits holding rulers to flaunt how advanced their civilization was.",
    storyRo:
      "O riglă este esențială pentru orice civilizație care face lucruri și este cu adevărat străveche; Muzeul Met deține o bucată dintr-una egipteană. Pentru cea mai mare parte a istoriei, muncitorii calificați și-o făceau singuri la orice increment li se părea util, ceea ce era în regulă, fiindcă un calcul precis depinde de un sistem de măsură consecvent mai mult decât de vreunul anume. Ideea aceasta e originea numelui: așa cum un „rubber” freacă, o „ruler” îți dă o regulă după care măsori. Pe măsură ce statele s-au unificat și comerțul a crescut, un sistem comun a devenit necesar; francezii au conceput sistemul metric în 1795, iar britanicii sistemul imperial în 1824, fiecare calibrat după un set de obiecte de referință sacre. Abia atunci au apărut riglele de lemn produse în masă, iar realizarea era prețuită îndeajuns încât mahării secolului XIX pozau în portrete ținând rigle ca să etaleze cât de avansată era civilizația lor.",
    facts: [
      { stat: "1795", label: "The metric system", labelRo: "Sistemul metric" },
      { stat: "1824", label: "The imperial system", labelRo: "Sistemul imperial" },
    ],
  },
  {
    key: "scissors",
    name: "Scissors",
    nameRo: "Foarfeca",
    origin: "Ancient, independently invented",
    originRo: "Străveche, inventată independent",
    image: C.supplyScissors,
    story:
      "Scissors are simple, two blades on a bolt squeezed by handles, and the idea is at least 2,000 years old, occurring independently to societies across Europe, Asia, and the Middle East; the Science Museum in London holds a bronze Roman pair. For most of history, though, a metal instrument this delicate was an expensive tool of skilled hands: tailors, shoemakers, barbers, surgeons. The idea that any random person could own a pair to cut coupons out of a catalog only became possible once steel was mass-produced in the mid-19th century, unleashing an explosion of cheap household steel goods. The comparable postwar explosion of plastics gave us the iconic plastic-handled scissors, shaped to fit our pampered, delicate modern hands.",
    storyRo:
      "Foarfeca e simplă, două lame pe un bolț strânse de mânere, iar ideea are cel puțin 2.000 de ani, apărând independent la societăți din Europa, Asia și Orientul Mijlociu; Science Museum din Londra deține o pereche romană de bronz. Pentru cea mai mare parte a istoriei, însă, un instrument de metal atât de fin era o unealtă scumpă a mâinilor pricepute: croitori, cizmari, bărbieri, chirurgi. Ideea că orice om oarecare putea avea o pereche ca să decupeze cupoane dintr-un catalog a devenit posibilă abia când oțelul a fost produs în masă la mijlocul secolului XIX, dezlănțuind o explozie de produse ieftine de oțel de uz casnic. Explozia postbelică comparabilă a plasticului ne-a dat foarfeca iconică cu mânere de plastic, modelată să se potrivească mâinilor noastre moderne, răsfățate.",
    facts: [
      { stat: "2,000+", label: "Years old, many origins", labelRo: "Ani vechime, multe origini" },
      { stat: "Mid-1800s", label: "Steel makes them everyday", labelRo: "Oțelul le face de zi cu zi" },
    ],
  },
];

export function SchoolSuppliesCanon() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = SUPPLIES[sel];

  return (
    <div>
      {/* Supply selector */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-7">
        {SUPPLIES.map((s, i) => {
          const on = i === sel;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group flex flex-col items-center rounded-xl p-2 transition-all duration-300"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#fffdf7" : "rgba(255,253,247,0.5)",
                border: `1px solid ${on ? "#E8391B" : "rgba(12,9,7,0.1)"}`,
                boxShadow: on ? "0 14px 34px rgb(12,9,7,0.12)" : "0 2px 8px rgb(12,9,7,0.04)",
                transform: on ? "translateY(-4px)" : "none",
              }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src={s.image}
                  alt={ro ? s.nameRo : s.name}
                  fill
                  sizes="160px"
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  style={{ filter: on ? "none" : "grayscale(0.25)" }}
                />
              </div>
              <span
                className="mt-2 text-center font-macro-display text-[12px] font-black uppercase leading-tight tracking-tight"
                style={{ color: on ? "#E8391B" : "#0C0907" }}
              >
                {ro ? s.nameRo : s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dossier */}
      <div key={active.key} className="mt-12 grid gap-10 md:grid-cols-[minmax(0,0.85fr)_1.15fr] md:gap-14">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#0C0907]/10 bg-white shadow-[0_30px_80px_rgb(12,9,7,0.16)]">
          <Image
            src={active.image}
            alt={ro ? active.nameRo : active.name}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B]">
            {ro ? active.originRo : active.origin}
          </p>
          <h3 className="mb-5 font-macro-display text-4xl font-black leading-none tracking-tight text-[#0C0907] md:text-5xl">
            {ro ? active.nameRo : active.name}
          </h3>
          <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
            {ro ? active.storyRo : active.story}
          </p>
          <div className="mt-7 flex flex-wrap gap-8">
            {active.facts.map((f) => (
              <div key={f.label} className="border-l-2 border-[#E8391B]/40 pl-4">
                <div className="font-macro-display text-3xl font-black leading-none text-[#0C0907]">{f.stat}</div>
                <div className="mt-1.5 max-w-[12rem] font-body text-xs text-[#0C0907]/55">{ro ? f.labelRo : f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Through-line */}
      <div className="mt-12 rounded-2xl border border-[#0C0907]/10 bg-white/50 px-6 py-5">
        <p className="font-editorial text-sm leading-relaxed text-[#0C0907]/70">
          {ro
            ? "Spre deosebire de aproape orice altceva din aceste pagini, rechizitele nu sunt invenții americane. Aproape toate au venit din Europa gata făcute, cu americanii aducând doar mici ajustări. Contribuțiile Americii au fost industria hârtiei din pastă de lemn, brandul Crayola și, în mod ciudat, însuși cuvântul „eraser”."
            : "Unlike almost everything else in these pages, school supplies are not American inventions. Nearly all arrived from Europe fully formed, with Americans making only minor tweaks. America's contributions were the wood-pulp paper industry, the Crayola brand, and, oddly, the very word \"eraser.\""}
        </p>
      </div>
    </div>
  );
}
