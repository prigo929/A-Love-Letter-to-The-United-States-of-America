"use client";

// ─── FastFoodBigThree ────────────────────────────────────────────────────────
// The three American fast-food creations that conquered the planet: the burger,
// the fry, and the chicken nugget: each a different kind of origin story: the
// burger with no single inventor, the fry a slow folk food, the nugget a product
// with one chef, one year, and four decreed sauces. Click a tab to open each.
//
// Adapted from a video essay's research (JJ, "Why is fast food burgers, fries,
// and chicken?"): the facts and the "big three" framing guided coverage; every
// line here is rewritten in the site's own voice, not transcribed. Styled for the
// food page's cream/parchment editorial surface (dark text on cream).

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

interface Milestone {
  year: string;
  en: string;
  ro: string;
}

interface Item {
  key: string;
  no: string;
  image: string;
  objectPosition?: string;
  name: string;
  nameRo: string;
  tagline: string;
  taglineRo: string;
  story: string;
  storyRo: string;
  milestones: Milestone[];
  facts: { stat: string; label: string; labelRo: string }[];
  // Nuggets only: the four sauces René Arend decreed on day one, 1983.
  sauces?: { en: string; ro: string }[];
  sauceNote?: string;
  sauceNoteRo?: string;
}

const ITEMS: Item[] = [
  {
    key: "burger",
    no: "01",
    image: SITE_IMAGES.culture.burger,
    name: "The Burger",
    nameRo: "Hamburgerul",
    tagline: "No single inventor · 1900s",
    taglineRo: "Fără un singur inventator · anii 1900",
    story:
      "The name gives the game away: a hamburger is named not for ham but for Hamburg, the northern German port most 19th-century German immigrants sailed from: which made \"hamburger\" a general adjective for German-American cooking. A \"hamburger steak\" was just a blob of Americanized ground beef those cooks served, and when it met the era's exploding sandwich culture, someone inevitably put it between bread. At least half a dozen towns and families claim to have made the first. J. Walter Anderson mainstreamed the soft bun: it soaked up the grease of the patties he was proud of: and turned it into a chain: White Castle, opened in Wichita in 1921, America's first. It was so influential that a wave of copycats put the word \"White\" in their own names. Cheese arrived in the 1930s, and the new word \"cheeseburger\" marked the moment the burger became its own food rather than a delivery system for a steak. Bacon (A&W, 1963), lettuce, tomato and the rest followed as the postwar chains fought to stand out.",
    storyRo:
      "Numele spune totul: hamburgerul nu vine de la șuncă (ham), ci de la Hamburg, portul din nordul Germaniei din care au plecat majoritatea imigranților germani din secolul al XIX-lea: ceea ce a făcut din „hamburger” un adjectiv general pentru bucătăria germano-americană. Un „biftec hamburger” era doar un boț de carne tocată americanizată, iar când s-a întâlnit cu explozia culturii sandvișului, cineva l-a pus inevitabil între felii de pâine. Cel puțin o jumătate de duzină de orașe și familii pretind că l-au făcut primele. J. Walter Anderson a popularizat chifla pufoasă: absorbea grăsimea chiftelelor cu care se mândrea: și a transformat totul într-un lanț: White Castle, deschis în Wichita în 1921, primul din America. A fost atât de influent încât un val de imitatori au pus cuvântul „White” în propriile nume. Brânza a apărut în anii 1930, iar cuvântul nou „cheeseburger” a marcat momentul în care hamburgerul a devenit un aliment de sine stătător. Baconul (A&W, 1963), salata și roșia au urmat pe măsură ce lanțurile postbelice se luptau să iasă în evidență.",
    milestones: [
      { year: "1890s", en: "\"Hamburg steak\" spreads with German immigration", ro: "„Biftecul Hamburg” se răspândește cu imigrația germană" },
      { year: "1921", en: "White Castle opens in Wichita: America's first chain", ro: "White Castle se deschide în Wichita: primul lanț american" },
      { year: "1930s", en: "\"Cheeseburger\" enters the language", ro: "„Cheeseburger” intră în limbă" },
      { year: "1963", en: "A&W claims the first bacon burger", ro: "A&W revendică primul bacon burger" },
    ],
    facts: [
      { stat: "6+", label: "Cities claiming the first burger", labelRo: "Orașe care revendică primul burger" },
      { stat: "1921", label: "White Castle, the first chain", labelRo: "White Castle, primul lanț" },
    ],
  },
  {
    key: "fries",
    no: "02",
    image: SITE_IMAGES.culture.foodMcdonaldsFries,
    name: "The Fries",
    nameRo: "Cartofii prăjiți",
    tagline: "A true folk food · postwar",
    taglineRo: "O adevărată mâncare populară · postbelic",
    story:
      "If the nugget has one inventor and the burger has a dozen, the fry has none: it is a true folk food that evolved without a plan. Potatoes are South American, carried to Europe by the Spanish, and fried potato strips existed across Europe by the 1700s. France and Belgium both claim to have invented the modern fry, and the potato historians say both ate them just as long; Americans reasonably tied the food to France. For a while they were \"German fries\" too: a name that vanished in the anti-German panic of World War I. Fries stayed a fussy, upscale restaurant food until the postwar era, when factories mass-produced pre-cut frozen fries and a new deep-fryer called the fryolator landed in fast-food kitchens everywhere. McDonald's built its whole identity on them. As Ray Kroc put it, a competitor could copy the burger, but \"you couldn't buy french fries anywhere to compete with ours.\" Today most American potatoes become fries, and McDonald's alone buys about a third of the entire US crop.",
    storyRo:
      "Dacă nugget-ul are un singur inventator, iar hamburgerul o duzină, cartoful prăjit nu are niciunul: este o adevărată mâncare populară care a evoluat fără plan. Cartofii sunt sud-americani, aduși în Europa de spanioli, iar feliile de cartofi prăjiți existau în toată Europa până în anii 1700. Franța și Belgia pretind amândouă că au inventat cartoful prăjit modern, iar istoricii spun că ambele îl mâncau de la fel de mult timp; americanii au legat rezonabil mâncarea de Franța. O vreme au fost și „cartofi germani”: un nume care a dispărut în panica anti-germană din Primul Război Mondial. Cartofii prăjiți au rămas o mâncare pretențioasă de restaurant până în era postbelică, când fabricile au produs în masă cartofi congelați pretăiați, iar o nouă friteuză numită fryolator a ajuns în bucătăriile fast-food. McDonald's și-a construit întreaga identitate pe ei. Cum spunea Ray Kroc, un concurent putea copia hamburgerul, dar „nu puteai cumpăra de nicăieri cartofi prăjiți care să concureze cu ai noștri.” Azi majoritatea cartofilor americani devin cartofi prăjiți, iar McDonald's cumpără singur aproximativ o treime din întreaga recoltă a SUA.",
    milestones: [
      { year: "1700s", en: "Fried potato strips common across Europe", ro: "Feliile de cartofi prăjiți, comune în Europa" },
      { year: "WWI", en: "\"German fries\" dropped in the anti-German panic", ro: "„Cartofii germani”, abandonați în panica anti-germană" },
      { year: "1940s", en: "Frozen fries + the fryolator arrive", ro: "Cartofii congelați + fryolatorul apar" },
      { year: "Now", en: "McDonald's buys ~⅓ of the US potato crop", ro: "McDonald's cumpără ~⅓ din recolta de cartofi a SUA" },
    ],
    facts: [
      { stat: "⅓", label: "Of the US potato crop → McDonald's", labelRo: "Din recolta de cartofi a SUA → McDonald's" },
      { stat: "#1", label: "Use of American potatoes: fries", labelRo: "Principala utilizare a cartofilor: prăjiți" },
    ],
  },
  {
    key: "nuggets",
    no: "03",
    image: SITE_IMAGES.culture.foodChickenMcnuggets,
    name: "Chicken Nuggets",
    nameRo: "Nuggets de pui",
    tagline: "One chef, one year · 1983",
    taglineRo: "Un bucătar, un an · 1983",
    story:
      "The nugget is the one member of the big three with a clear inventor and a precise birthday. Chicken was long a fancy, occasional meat: treated the way most other birds still are: until the late 1970s, when diet-and-heart research turned the country against red meat: beef bad, chicken good. Chicken consumption climbed until it roughly matched beef and pork combined, and the burger chains, afraid of losing customers to the fried-chicken rivals, all added chicken burgers. McDonald's went further. Ray Kroc had his executive chef René Arend: arguably the most influential Luxembourgish immigrant in US history: invent something new, and Arend built the Chicken McNugget on the model of the onion nugget. It reached the menu in 1983; frying breaded pieces that small at industrial scale was so hard that McDonald's spent years developing a whole new process for it. Knockoff nuggets and the freezer-aisle tenders followed within a few years. Arend also decreed, on day one and with no market research, exactly four dipping sauces.",
    storyRo:
      "Nugget-ul este singurul membru al celor trei mari cu un inventator clar și o zi de naștere precisă. Puiul a fost mult timp o carne fină, ocazională: tratată așa cum sunt încă majoritatea celorlalte păsări: până la sfârșitul anilor 1970, când cercetările despre dietă și inimă au întors țara împotriva cărnii roșii: vita rea, puiul bun. Consumul de pui a crescut până a egalat aproximativ vita și porcul la un loc, iar lanțurile de hamburgeri, temându-se să nu piardă clienți în fața rivalilor cu pui prăjit, au adăugat toate burgeri de pui. McDonald's a mers mai departe. Ray Kroc l-a pus pe bucătarul-șef René Arend: probabil cel mai influent imigrant luxemburghez din istoria SUA: să inventeze ceva nou, iar Arend a construit Chicken McNugget-ul pe modelul nugget-ului de ceapă. A ajuns în meniu în 1983; prăjirea unor bucăți atât de mici, pane, la scară industrială, a fost atât de dificilă încât McDonald's a petrecut ani dezvoltând un proces complet nou. Nugget-urile de imitație și cele de la congelator au urmat în câțiva ani. Arend a decretat de asemenea, din prima zi și fără niciun studiu de piață, exact patru sosuri.",
    milestones: [
      { year: "Late '70s", en: "Chicken overtakes red meat on health advice", ro: "Puiul depășește carnea roșie la sfatul medicilor" },
      { year: "1983", en: "The Chicken McNugget hits the menu", ro: "Chicken McNugget-ul ajunge în meniu" },
      { year: "1980s", en: "Knockoffs and freezer-aisle tenders spread", ro: "Imitațiile și nugget-urile de la congelator se răspândesc" },
    ],
    facts: [
      { stat: "1983", label: "The McNugget debuts", labelRo: "Debutul McNugget-ului" },
      { stat: "≈", label: "Chicken now equals beef + pork combined", labelRo: "Puiul egalează acum vita + porcul" },
    ],
    sauces: [
      { en: "Barbecue", ro: "Barbecue" },
      { en: "Sweet & Sour", ro: "Dulce-acrișor" },
      { en: "Hot Mustard", ro: "Muștar iute" },
      { en: "Honey", ro: "Miere" },
    ],
    sauceNote: "The four original 1983 sauces. Hot mustard later gave way to honey mustard: but raw honey is still on the menu.",
    sauceNoteRo: "Cele patru sosuri originale din 1983. Muștarul iute a cedat mai târziu locul muștarului cu miere: dar mierea simplă e încă în meniu.",
  },
];

export function FastFoodBigThree() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = ITEMS[sel];

  return (
    <div>
      {/* Menu-board tab selector */}
      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        {ITEMS.map((it, i) => {
          const on = i === sel;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group relative flex items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition-all duration-300 sm:gap-4 sm:px-6 sm:py-5"
              style={{
                cursor: "pointer",
                borderColor: on ? "#E8391B" : "rgba(12,9,7,0.12)",
                backgroundColor: on ? "rgba(232,57,27,0.06)" : "transparent",
              }}
            >
              <span
                className="font-macro-display text-3xl font-black leading-none sm:text-5xl"
                style={{ color: on ? "#E8391B" : "rgba(12,9,7,0.2)" }}
              >
                {it.no}
              </span>
              <span className="flex flex-col">
                <span
                  className="font-macro-display text-base font-black uppercase leading-tight tracking-tight sm:text-xl"
                  style={{ color: on ? "#0C0907" : "rgba(12,9,7,0.55)" }}
                >
                  {ro ? it.nameRo : it.name}
                </span>
                <span className="hidden font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#0C0907]/40 sm:block">
                  {ro ? it.taglineRo : it.tagline}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active item */}
      <div key={active.key} className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgb(12,9,7,0.18)]">
          <Image
            src={active.image}
            alt={ro ? active.nameRo : active.name}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="object-cover"
            style={{ objectPosition: active.objectPosition ?? "center" }}
          />
          <span className="absolute left-5 top-4 font-macro-display text-6xl font-black leading-none text-white/85 drop-shadow-[0_2px_10px_rgb(0,0,0,0.4)]">
            {active.no}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B]">
            {ro ? active.taglineRo : active.tagline}
          </p>
          <h3 className="mb-5 font-macro-display text-4xl font-black leading-none tracking-tight text-[#0C0907] md:text-5xl">
            {ro ? active.nameRo : active.name}
          </h3>
          <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
            {ro ? active.storyRo : active.story}
          </p>

          {/* Milestone rail */}
          <ol className="mt-8 space-y-0">
            {active.milestones.map((m, i) => (
              <li key={m.year} className="relative flex gap-4 pb-5 last:pb-0">
                {/* connector line */}
                {i < active.milestones.length - 1 && (
                  <span className="absolute left-[5px] top-3 h-full w-px bg-[#0C0907]/12" aria-hidden />
                )}
                <span className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full bg-[#E8391B] ring-4 ring-[#E8391B]/15" aria-hidden />
                <div>
                  <span className="font-macro-display text-sm font-black uppercase tracking-wide text-[#0C0907]">{m.year}</span>
                  <span className="ml-2 font-body text-sm text-[#0C0907]/60">{ro ? m.ro : m.en}</span>
                </div>
              </li>
            ))}
          </ol>

          {/* Facts */}
          <div className="mt-7 flex flex-wrap gap-8">
            {active.facts.map((f) => (
              <div key={f.label} className="border-l-2 border-[#E8391B]/40 pl-4">
                <div className="font-macro-display text-3xl font-black leading-none text-[#0C0907]">{f.stat}</div>
                <div className="mt-1.5 max-w-[11rem] font-body text-xs text-[#0C0907]/55">{ro ? f.labelRo : f.label}</div>
              </div>
            ))}
          </div>

          {/* Nuggets only: the four decreed sauces */}
          {active.sauces && (
            <div className="mt-8 border-t border-[#0C0907]/10 pt-6">
              <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#0C0907]/45">
                {ro ? "PATRU SOSURI, DIN PRIMA ZI" : "FOUR SAUCES, FROM DAY ONE"}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {active.sauces.map((s) => (
                  <span
                    key={s.en}
                    className="rounded-full border border-[#E8391B]/30 bg-[#E8391B]/5 px-4 py-1.5 font-body text-sm font-semibold text-[#0C0907]"
                  >
                    {ro ? s.ro : s.en}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-body text-xs italic text-[#0C0907]/50">
                {ro ? active.sauceNoteRo : active.sauceNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
