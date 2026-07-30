"use client";

// ─── FoodEvolutionExplorer ───────────────────────────────────────────────────
// How American food changed across the "Lesser 30" (1993–2025): an era of
// evolution, not revolution. Six shifts, each framed as a delta from the food
// culture of the "Great 30" (1961–1993): the flavor explosion, novelty foods,
// the natural turn, the free-from table, the ethical plate, and the global palate.
// A left index rail selects; the right panel opens each shift's dossier.
//
// Adapted from a video essay's research (JJ, "How has food changed in the last
// 30 years?"): its era framing, facts and six-theme structure guided coverage;
// every line here is rewritten in the site's own voice, not transcribed. Styled
// for the food page's cream/parchment editorial surface (dark text on cream).

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Shift {
  key: string;
  no: string;
  title: string;
  titleRo: string;
  tag: string;
  tagRo: string;
  from: string;
  fromRo: string;
  to: string;
  toRo: string;
  body: string;
  bodyRo: string;
  chips: string[];
  chipsRo: string[];
  stat: string;
  statLabel: string;
  statLabelRo: string;
}

const SHIFTS: Shift[] = [
  {
    key: "flavor",
    no: "01",
    title: "The Flavor Explosion",
    titleRo: "Explozia aromelor",
    tag: "From vanilla to engineered precision",
    tagRo: "De la vanilie la precizie inginerească",
    from: "Chocolate, vanilla, mint, cherry",
    fromRo: "Ciocolată, vanilie, mentă, cireșe",
    to: "Pumpkin spice, guava, açaí, Purple Thunder",
    toRo: "Pumpkin spice, guava, açaí, Purple Thunder",
    body:
      "For a century, mass-produced flavor meant the handful of tastes Victorians already knew: chocolate, vanilla, mint, a few fruits. The Lesser 30 blew that open. Rising incomes and immigration mainstreamed tropical fruits once thought exotic and intimidating: the avocado, the mango, guava, açaí: while flavor chemistry, supercharged after the mapping of the human genome, learned to engineer tastes no one had dreamed of: Earl Grey lavender ice cream, glazed-cranberry-lemon protein bars, and Starbucks' 2003 Pumpkin Spice Latte, which turned a spice blend into a whole season. Some flavors stopped referring to the natural world at all: Purple Thunder Mountain Dew, Meta Moon Prime.",
    bodyRo:
      "Timp de un secol, aroma produsă în masă a însemnat mâna de gusturi pe care victorienii le știau deja: ciocolată, vanilie, mentă, câteva fructe. Lesser 30 a spart asta. Veniturile în creștere și imigrația au adus în mainstream fructe tropicale cândva considerate exotice și intimidante: avocado, mango, guava, açaí: în timp ce chimia aromelor, turbată după cartografierea genomului uman, a învățat să creeze gusturi la care nimeni nu visase: înghețată Earl Grey cu lavandă, batoane proteice cu lămâie și afine glazurate și Pumpkin Spice Latte de la Starbucks (2003), care a transformat un amestec de condimente într-un întreg anotimp. Unele arome au încetat cu totul să se mai refere la lumea naturală: Purple Thunder Mountain Dew, Meta Moon Prime.",
    chips: ["Avocado", "Mango", "Açaí", "Pumpkin Spice", "Guava", "“Purple Thunder”"],
    chipsRo: ["Avocado", "Mango", "Açaí", "Pumpkin Spice", "Guava", "„Purple Thunder”"],
    stat: "2003",
    statLabel: "Pumpkin Spice Latte debuts",
    statLabelRo: "Debutează Pumpkin Spice Latte",
  },
  {
    key: "novelty",
    no: "02",
    title: "Novelty as Adventure",
    titleRo: "Noutatea ca aventură",
    tag: "Food that dares you to eat it",
    tagRo: "Mâncare care te provoacă s-o mănânci",
    from: "Familiar comfort food",
    fromRo: "Mâncare de confort familiară",
    to: "Food as stunt and spectacle",
    toRo: "Mâncarea ca cascadorie și spectacol",
    body:
      "Once the cost, convenience and modernity of food were taken for granted, boredom set in: and brands answered with novelty: food engineered to be a fun new adventure, or simply to challenge what food can even be. The Lesser 30 is the era of Dunkaroos, of Heinz's funky purple EZ-Squirt ketchup, and of the notorious KFC Double Down, a sandwich that swapped bread for two slabs of fried chicken. The arms race to make food weirder and weirder is the flip side of a public grown bored and spoiled by abundance: and it can get a little grotesque before the counter-revolution pulls it back.",
    bodyRo:
      "Odată ce costul, comoditatea și modernitatea mâncării au fost luate de-a gata, s-a instalat plictiseala: iar brandurile au răspuns cu noutate: mâncare gândită să fie o aventură distractivă sau pur și simplu să provoace ideea de ce poate fi mâncarea. Lesser 30 este era Dunkaroos, a ketchupului mov EZ-Squirt de la Heinz și a notoriului KFC Double Down, un sandviș care a înlocuit pâinea cu două felii de pui prăjit. Cursa înarmării pentru a face mâncarea tot mai ciudată este reversul unui public plictisit și răsfățat de abundență: și poate deveni puțin grotescă înainte ca contra-revoluția s-o readucă înapoi.",
    chips: ["Dunkaroos", "Purple ketchup", "KFC Double Down", "Freakshakes"],
    chipsRo: ["Dunkaroos", "Ketchup mov", "KFC Double Down", "Freakshakes"],
    stat: "2010",
    statLabel: "The KFC Double Down lands",
    statLabelRo: "Apare KFC Double Down",
  },
  {
    key: "natural",
    no: "03",
    title: "The Natural Turn",
    titleRo: "Întoarcerea spre natural",
    tag: "Counter-revolution against the conveyor belt",
    tagRo: "Contra-revoluția împotriva benzii rulante",
    from: "SpaghettiOs, corn dogs, Kool-Aid",
    fromRo: "SpaghettiOs, corn dogs, Kool-Aid",
    to: "Organic, no preservatives, farm-to-table",
    toRo: "Bio, fără conservanți, farm-to-table",
    body:
      "The same chemical sophistication that engineered designer flavors also made Americans anxious about eating them. The modern nutrition label arrived in 1992, at the era's very start, and a whole marketing dialect grew up around what foods don't contain: whole grain, no preservatives, hormone-free, raised without antibiotics, locally sourced, organic, 100% juice, no sugar added. David Brooks named the type in Bobos in Paradise. The anxiety had an aesthetic, too: a turn toward food that looks aggressively imperfect and handmade: the uneven sourdough loaf, the stone-oven rustic pizza, the Whole Foods and Trader Joe's reinvented as wholesome, post-corporate places. Whether artisanal is actually better for you is another question: bakeries now sell made-from-scratch Pop-Tarts.",
    bodyRo:
      "Aceeași sofisticare chimică ce a creat aromele de designer i-a făcut pe americani anxioși în privința consumului lor. Eticheta nutrițională modernă a apărut în 1992, chiar la începutul erei, iar un întreg dialect de marketing a crescut în jurul a ceea ce mâncarea nu conține: cereale integrale, fără conservanți, fără hormoni, crescut fără antibiotice, din surse locale, bio, 100% suc, fără zahăr adăugat. David Brooks a numit tipul acesta în Bobos in Paradise. Anxietatea a avut și o estetică: o întoarcere spre mâncarea care arată agresiv de imperfectă și făcută de mână: pâinea neuniformă cu maia, pizza rustică la cuptor cu piatră, Whole Foods și Trader Joe's reinventate ca locuri sănătoase, post-corporatiste. Dacă artizanalul e chiar mai sănătos e altă întrebare: brutăriile vând acum Pop-Tarts făcute de la zero.",
    chips: ["Organic", "No preservatives", "Grass-fed", "Farm-to-table", "Sourdough", "Non-GMO"],
    chipsRo: ["Bio", "Fără conservanți", "Din pășune", "Farm-to-table", "Cu maia", "Non-OMG"],
    stat: "1992",
    statLabel: "The modern nutrition label",
    statLabelRo: "Eticheta nutrițională modernă",
  },
  {
    key: "freefrom",
    no: "04",
    title: "The Free-From Table",
    titleRo: "Masa „fără”",
    tag: "The zero-tolerance table",
    tagRo: "Masa cu toleranță zero",
    from: "Eat what's served",
    fromRo: "Mănâncă ce ți se pune",
    to: "Gluten-free, nut-free, dairy-free by default",
    toRo: "Fără gluten, fără nuci, fără lactate din start",
    body:
      "Beginning in the 1990s, more and more Americans identified as having a food allergy: partly from eating a far greater variety of foods than before, partly because the tests to detect a reaction got cheaper and more common. Anyone raised in the era knows the zero-tolerance attitude authority figures developed toward peanuts, now that roughly 3% of Americans report a peanut allergy, and reported intolerance to seafood, dairy, soy and gluten climbed alongside it. Thirty years ago almost no one had eaten a gluten-free cupcake with non-dairy icing, or a nut-free granola bar with sugar-free chocolate chips; today you can buy that from very mainstream shops in any big city on the continent.",
    bodyRo:
      "Începând cu anii 1990, tot mai mulți americani s-au identificat ca având o alergie alimentară: parțial pentru că mâncau o varietate mult mai mare de alimente, parțial pentru că testele de detectare a reacțiilor au devenit mai ieftine și mai frecvente. Oricine a crescut în acea eră știe atitudinea de toleranță zero pe care figurile de autoritate au dezvoltat-o față de arahide, acum că aproximativ 3% dintre americani declară o alergie la arahide, iar intoleranța raportată la fructe de mare, lactate, soia și gluten a crescut alături. Acum treizeci de ani aproape nimeni nu mâncase o brioșă fără gluten cu glazură fără lactate; azi o cumperi din magazine foarte obișnuite, în orice oraș mare de pe continent.",
    chips: ["Gluten-free", "Nut-free", "Dairy-free", "Soy-free", "Sugar-free"],
    chipsRo: ["Fără gluten", "Fără nuci", "Fără lactate", "Fără soia", "Fără zahăr"],
    stat: "~3%",
    statLabel: "Americans report a peanut allergy",
    statLabelRo: "Dintre americani declară alergie la arahide",
  },
  {
    key: "ethical",
    no: "05",
    title: "The Ethical Plate",
    titleRo: "Farfuria etică",
    tag: "Accommodation without conversion",
    tagRo: "Acomodare fără convertire",
    from: "Meat by default",
    fromRo: "Carne din start",
    to: "A leaf icon on every menu",
    toRo: "O frunzuliță pe fiecare meniu",
    body:
      "Here the numbers surprise. By Gallup, the combined vegetarian-and-vegan share has held steady near 5% for three decades: the era was not defined by Americans going meat-free at any real scale. What changed was accommodation. Nearly every chain now carries at least one non-meat entrée, usually flagged with a little leaf icon, and the 2010s launched two high-profile plant-based-meat brands whose products are the most convincing fake meat ever made. Yet those companies struggle, because American meat consumption hasn't meaningfully fallen and demand for alternatives stays low. The real test comes in the next era, 2025–2057; this one mostly laid the technological and cultural groundwork to make the choice possible.",
    bodyRo:
      "Aici cifrele surprind. Potrivit Gallup, ponderea combinată vegetarian-vegan s-a menținut constant în jur de 5% timp de trei decenii: era nu a fost definită de americani care renunță la carne la vreo scară reală. Ce s-a schimbat a fost acomodarea. Aproape fiecare lanț are acum cel puțin un fel fără carne, de obicei marcat cu o frunzuliță, iar anii 2010 au lansat două branduri notabile de carne vegetală ale căror produse sunt cea mai convingătoare carne falsă făcută vreodată. Totuși acele companii se chinuie, fiindcă consumul american de carne nu a scăzut semnificativ, iar cererea de alternative rămâne mică. Adevăratul test vine în era următoare, 2025–2057; aceasta a pus mai ales bazele tehnologice și culturale care să facă alegerea posibilă.",
    chips: ["Beyond Meat", "Impossible", "The leaf icon", "Oat milk"],
    chipsRo: ["Beyond Meat", "Impossible", "Frunzulița", "Lapte de ovăz"],
    stat: "5%",
    statLabel: "Vegetarian + vegan, flat for 30 years",
    statLabelRo: "Vegetarieni + vegani, constant de 30 de ani",
  },
  {
    key: "global",
    no: "06",
    title: "The Global Palate",
    titleRo: "Paleta globală",
    tag: "A trillion-dollar, borderless menu",
    tagRo: "Un meniu fără frontiere, de un trilion",
    from: "Chinese · Italian · Mexican · Greek",
    fromRo: "Chinezesc · Italian · Mexican · Grecesc",
    to: "Indian · Thai · Korean · Ethiopian · fusion",
    toRo: "Indian · Thai · Coreean · Etiopian · fusion",
    body:
      "The oldest trend accelerated the hardest. In 2024, U.S. restaurants became a trillion-dollar industry for the first time, and over half of all American food spending now goes to restaurant meals: up from about a quarter at the start of the Great 30. The immigrant-run restaurant canon that consolidated mid-century (Chinese, Japanese, Mexican, Italian, Greek, Vietnamese) expanded to match new arrivals: Indian food went mainstream (curry, naan, samosas), Thai spread partly through a famous program in which the Thai government subsidized Thai restaurants abroad, and Korean, Ethiopian, Taiwanese, Lebanese, Jamaican, Persian, Nepalese and Haitian followed. The appetite grew so intense it bred fusion: the sushi burrito, kimchi pasta, butter-chicken pad thai: and moved into the home kitchen, where sriracha, naan and frozen spring rolls are now supermarket staples.",
    bodyRo:
      "Cea mai veche tendință a accelerat cel mai puternic. În 2024, restaurantele din SUA au devenit pentru prima dată o industrie de un trilion de dolari, iar peste jumătate din toate cheltuielile americane cu mâncarea merg acum spre mesele la restaurant: în creștere de la circa un sfert la începutul Great 30. Canonul restaurantelor conduse de imigranți, consolidat la mijlocul secolului (chinezesc, japonez, mexican, italian, grecesc, vietnamez), s-a extins pentru a se potrivi noilor sosiți: mâncarea indiană a intrat în mainstream (curry, naan, samosa), thailandeza s-a răspândit parțial printr-un program faimos prin care guvernul thailandez subvenționa restaurantele thai din străinătate, iar coreeana, etiopiana, taiwaneza, libaneza, jamaicana, persana, nepaleza și haitiana au urmat. Pofta a crescut atât de intens încât a produs fusion: sushi burrito, paste cu kimchi, butter-chicken pad thai: și s-a mutat în bucătăria de acasă, unde sriracha, naan-ul și rulourile de primăvară congelate sunt acum produse de supermarket.",
    chips: ["Indian", "Thai", "Korean", "Ethiopian", "Fusion", "Sriracha at home"],
    chipsRo: ["Indian", "Thai", "Coreean", "Etiopian", "Fusion", "Sriracha acasă"],
    stat: "$1T",
    statLabel: "U.S. restaurant industry, 2024",
    statLabelRo: "Industria restaurantelor SUA, 2024",
  },
];

export function FoodEvolutionExplorer() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = SHIFTS[sel];

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(230px,300px)_1fr] md:gap-12">
      {/* Left index rail */}
      <nav className="flex flex-col gap-1.5">
        {SHIFTS.map((s, i) => {
          const on = i === sel;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group flex items-center gap-4 rounded-lg border-l-2 py-3 pl-4 pr-3 text-left transition-all duration-300"
              style={{
                cursor: "pointer",
                borderColor: on ? "#E8391B" : "rgba(12,9,7,0.1)",
                backgroundColor: on ? "rgba(232,57,27,0.06)" : "transparent",
              }}
            >
              <span
                className="font-macro-display text-xl font-black leading-none tabular-nums"
                style={{ color: on ? "#E8391B" : "rgba(12,9,7,0.22)" }}
              >
                {s.no}
              </span>
              <span className="flex flex-col">
                <span
                  className="font-macro-display text-[15px] font-black uppercase leading-tight tracking-tight"
                  style={{ color: on ? "#0C0907" : "rgba(12,9,7,0.55)" }}
                >
                  {ro ? s.titleRo : s.title}
                </span>
                <span className="font-body text-[11px] leading-tight text-[#0C0907]/40">
                  {ro ? s.tagRo : s.tag}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* Right dossier panel */}
      <article key={active.key} className="flex flex-col">
        <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B]">
          {ro ? `SCHIMBAREA ${active.no}` : `SHIFT ${active.no}`}
        </p>
        <h3 className="mb-6 font-macro-display text-4xl font-black leading-none tracking-tight text-[#0C0907] md:text-5xl">
          {ro ? active.titleRo : active.title}
        </h3>

        {/* Great 30 → Lesser 30 delta */}
        <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-[#0C0907]/10 bg-white/40 p-5 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex-1">
            <div className="font-body text-[9px] font-bold uppercase tracking-[0.25em] text-[#0C0907]/40">
              {ro ? "GREAT 30 · 1961–1993" : "GREAT 30 · 1961–1993"}
            </div>
            <div className="mt-1 font-editorial text-[15px] italic text-[#0C0907]/60">
              {ro ? active.fromRo : active.from}
            </div>
          </div>
          <div className="shrink-0 self-center font-macro-display text-2xl font-black text-[#E8391B] sm:rotate-0">
            <span className="hidden sm:inline">→</span>
            <span className="sm:hidden">↓</span>
          </div>
          <div className="flex-1">
            <div className="font-body text-[9px] font-bold uppercase tracking-[0.25em] text-[#E8391B]">
              {ro ? "LESSER 30 · 1993–2025" : "LESSER 30 · 1993–2025"}
            </div>
            <div className="mt-1 font-editorial text-[15px] font-semibold text-[#0C0907]">
              {ro ? active.toRo : active.to}
            </div>
          </div>
        </div>

        <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
          {ro ? active.bodyRo : active.body}
        </p>

        {/* Example chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(ro ? active.chipsRo : active.chips).map((c) => (
            <span
              key={c}
              className="rounded-full border border-[#0C0907]/12 bg-[#0C0907]/[0.03] px-3.5 py-1.5 font-body text-[13px] font-medium text-[#0C0907]/70"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Headline stat */}
        <div className="mt-8 flex items-baseline gap-4 border-t border-[#0C0907]/10 pt-6">
          <span className="font-macro-display text-5xl font-black leading-none text-[#E8391B] md:text-6xl">
            {active.stat}
          </span>
          <span className="font-body text-sm text-[#0C0907]/55">
            {ro ? active.statLabelRo : active.statLabel}
          </span>
        </div>
      </article>
    </div>
  );
}
