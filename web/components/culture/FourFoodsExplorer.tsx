"use client";

// ─── FourFoodsExplorer ───────────────────────────────────────────────────────
// Four foods so ordinary Americans barely see them as food — steak, milk, the
// sandwich, the apple — each with an origin story that turns out to be pure
// American history: Spanish cattle and cowboy loanwords, downtown "swill" dairies,
// the Earl of Sandwich, and Johnny Appleseed's real business (cider, not pie).
//
// The content is adapted from a video essay's research (JJ, "The 4 Foods That
// Define America") — the facts and framing were used to decide what to cover;
// every line here is rewritten in the site's own voice, not transcribed. Styled
// for the food page's cream/parchment editorial surface (dark text on cream).

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

// CC/CC0 imagery from Wikimedia Commons (upload.wikimedia.org is allow-listed).
const IMG = {
  steak: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/DFC_2081_Juicy_grilled_steak_topped_with_herb_butter_served_with_fries_saut%C3%A9ed_green_beans_coleslaw_and_a_side_of_gravy.jpg/1280px-DFC_2081_Juicy_grilled_steak_topped_with_herb_butter_served_with_fries_saut%C3%A9ed_green_beans_coleslaw_and_a_side_of_gravy.jpg",
  milk: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Abbotts_Glass_Milk_Bottles_1920s-1960s.jpg/1280px-Abbotts_Glass_Milk_Bottles_1920s-1960s.jpg",
  sandwich: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Carnegie_Deli_Huge_Club_Sandwich_%286279792312%29.jpg",
  apple: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/2020-03-14_23_55_38_A_single_Nature%27s_Promise_Organic_Red_Delicious_Apple_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg/1280px-2020-03-14_23_55_38_A_single_Nature%27s_Promise_Organic_Red_Delicious_Apple_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg",
} as const;

interface Food {
  key: string;
  icon: string;
  image: string;
  name: string;
  nameRo: string;
  tagline: string;
  taglineRo: string;
  story: string;
  storyRo: string;
  facts: { stat: string; label: string; labelRo: string }[];
}

const FOODS: Food[] = [
  {
    key: "steak",
    icon: "🥩",
    image: IMG.steak,
    name: "Steak",
    nameRo: "Friptura",
    tagline: "From two directions · 1520s",
    taglineRo: "Din două direcții · anii 1520",
    story:
      "Beef reached America twice. Columbus carried the first cattle to the Caribbean, and from the 1520s Spanish colonists spread open-range ranching across Mexico — which is why the vocabulary of the American cowboy (bronco, lasso, rodeo, ranch) is simply anglicized Spanish. A century later the Dutch and British landed their own herds on the East Coast. But beef only became absurdly abundant when two Midwestern forces met: corn to fatten the cattle and railroads to move them. Chicago, Omaha and Kansas City became meatpacking capitals, refrigerated railcars carried steaks east, and firms like Swift and Armour grew into the first corporate titans of the Gilded Age. Beef is still America's most valuable farm product, and the steak dinner became one of the nation's first restaurant rituals.",
    storyRo:
      "Carnea de vită a ajuns în America de două ori. Columb a adus primele vite în Caraibe, iar din anii 1520 coloniștii spanioli au răspândit creșterea vitelor pe pășuni deschise în Mexic — de aceea vocabularul cowboy-ului american (bronco, lasso, rodeo, ranch) este pur și simplu spaniolă anglicizată. Un secol mai târziu, olandezii și britanicii și-au adus propriile cirezi pe Coasta de Est. Dar carnea de vită a devenit absurd de abundentă abia când s-au întâlnit două forțe din Midwest: porumbul pentru îngrășarea vitelor și căile ferate pentru transportul lor. Chicago, Omaha și Kansas City au devenit capitale ale abatoarelor, vagoanele frigorifice duceau fripturile spre est, iar firme ca Swift și Armour au devenit primii titani corporativi ai Epocii de Aur. Carnea de vită rămâne cel mai valoros produs agricol american.",
    facts: [
      { stat: "#1", label: "World beef producer", labelRo: "Producător mondial de vită" },
      { stat: "4", label: "Cowboy words from Spanish", labelRo: "Cuvinte cowboy din spaniolă" },
      { stat: "1865+", label: "Corn + rail built the industry", labelRo: "Porumbul + calea ferată" },
    ],
  },
  {
    key: "milk",
    icon: "🥛",
    image: IMG.milk,
    name: "Milk",
    nameRo: "Laptele",
    tagline: "The Holstein century · 1852",
    taglineRo: "Secolul Holstein · 1852",
    story:
      "Milk is the one American staple whose demand outran the technology to supply it. When health-conscious cities of the late 1700s wanted more than the countryside could safely deliver, the answer was grotesque: urban dairies penned cows in downtown buildings, fed them distillery waste, and ladled filthy milk from open tubs. Refrigerated railcars in the 1870s finally let clean, pasteurized milk arrive from real farms — delivered by the milkman into the little insulated milk boxes built into Victorian homes. The Holstein, imported from Holland in 1852, produced over a hundred pounds a day, double any earlier breed; the 1917 vacuum milking machine industrialized the rest. By 1945 the average American drank forty-five gallons a year — and the Kellogg brothers had invented breakfast cereal largely to pour more milk on.",
    storyRo:
      "Laptele este singurul aliment de bază american a cărui cerere a depășit tehnologia care să-l furnizeze. Când orașele preocupate de sănătate de la sfârșitul anilor 1700 au vrut mai mult decât putea livra în siguranță zona rurală, soluția a fost grotescă: lăptăriile urbane țineau vacile în clădiri din centru, le hrăneau cu deșeuri de distilerie și scoteau cu polonicul lapte murdar din căzi deschise. Vagoanele frigorifice din anii 1870 au permis în sfârșit laptelui curat, pasteurizat, să sosească de la ferme adevărate — livrat de lăptar în cutiile de lapte izolate din casele victoriene. Vaca Holstein, importată din Olanda în 1852, producea peste o sută de livre pe zi, dublu față de orice rasă anterioară. Până în 1945, americanul mediu bea patruzeci și cinci de galoane pe an.",
    facts: [
      { stat: "100 lb", label: "A Holstein's daily output", labelRo: "Producția zilnică Holstein" },
      { stat: "45 gal", label: "Per person per year, 1945", labelRo: "Pe persoană pe an, 1945" },
      { stat: "1906", label: "Cereal invented to sell milk", labelRo: "Cerealele, inventate pentru lapte" },
    ],
  },
  {
    key: "sandwich",
    icon: "🥪",
    image: IMG.sandwich,
    name: "Sandwich",
    nameRo: "Sandvișul",
    tagline: "The Earl's one free hand · 1740s",
    taglineRo: "Mâna liberă a Contelui · anii 1740",
    story:
      "Bread may be twenty thousand years old, but the sandwich as a named, standardized thing barely predates the 18th-century Earl of Sandwich, who wanted a lunch he could eat with one hand. It began as an aristocratic nibble — crustless white bread, shrimp and cucumber — then fell to the working class, who piled thick mixed-grain slices with greasy meat and carried it to the factory floor and the steel girder. The 1920s Midwest supplied the machinery: factory loaves became ninety percent of American bread, and the automatic slicer and the pop-up toaster made sandwiches instant. The PB&J, the BLT and egg salad became the postwar canon. The irony today: artisanal sandwiches resemble Victorian working-class fare, while the crustless Uncrustable is the aristocrat's dainty triangle, reborn.",
    storyRo:
      "Pâinea are poate douăzeci de mii de ani, dar sandvișul ca lucru cu nume și standardizat abia îl precedă pe Contele de Sandwich din secolul al XVIII-lea, care voia un prânz pe care să-l poată mânca cu o singură mână. A început ca o gustare aristocratică — pâine albă fără coajă, creveți și castravete — apoi a ajuns la clasa muncitoare, care punea felii groase de pâine cu cereale amestecate și carne grasă și le ducea la fabrică și pe grinda de oțel. Midwest-ul anilor 1920 a furnizat utilajele: pâinea de fabrică a ajuns nouăzeci la sută din pâinea americană, iar feliatorul automat și prăjitorul pop-up au făcut sandvișurile instantanee. PB&J, BLT-ul și salata de ouă au devenit canonul postbelic.",
    facts: [
      { stat: "1740s", label: "The Earl standardizes it", labelRo: "Contele îl standardizează" },
      { stat: "1928", label: "Sliced bread hits the market", labelRo: "Pâinea feliată apare pe piață" },
      { stat: "3", label: "PB&J, BLT, egg salad canon", labelRo: "Canonul: PB&J, BLT, ouă" },
    ],
  },
  {
    key: "apple",
    icon: "🍎",
    image: IMG.apple,
    name: "Apple",
    nameRo: "Mărul",
    tagline: "Johnny Appleseed's cider · 1800s",
    taglineRo: "Cidrul lui Johnny Appleseed · anii 1800",
    story:
      "America's most wholesome fruit was, for most of its history, a way to get drunk. Native apples were bitter crabapples, European varieties weren't much better, so early Americans grew apples to press, not to eat. John Chapman — Johnny Appleseed — sold seedlings to pioneer families across the Midwest and grew wealthy doing it, because the orchards made cider, the frontier's favorite liquor. Prohibitionists later demonized the apple and burned orchards, and the phrase 'as American as apple pie' was essentially a post-Prohibition public-relations campaign to rehabilitate the fruit's image. Meanwhile the botany boom of the late 1800s bred Red Delicious, Golden Delicious and McIntosh, and refrigerated railcars carried them out of Washington and California into the national lunchbox, beside the roast-beef sandwich and the carton of milk.",
    storyRo:
      "Cel mai cuminte fruct al Americii a fost, pentru cea mai mare parte a istoriei sale, o cale de a te îmbăta. Merele native erau mere pădurețe amare, soiurile europene nu erau mult mai bune, așa că primii americani cultivau mere pentru a le presa, nu pentru a le mânca. John Chapman — Johnny Appleseed — vindea puieți familiilor de pionieri din Midwest și s-a îmbogățit făcând asta, pentru că livezile produceau cidru, băutura preferată a frontierei. Prohibiționiștii au demonizat ulterior mărul și au ars livezi, iar expresia „la fel de american ca plăcinta cu mere” a fost, în esență, o campanie de relații publice de după Prohibiție pentru a reabilita imaginea fructului. Între timp, avântul botanicii de la sfârșitul anilor 1800 a creat Red Delicious, Golden Delicious și McIntosh.",
    facts: [
      { stat: "#1", label: "Cider was the frontier's liquor", labelRo: "Cidrul, băutura frontierei" },
      { stat: "1900s", label: "'Apple pie' slogan = PR", labelRo: "Sloganul „apple pie” = PR" },
      { stat: "3", label: "Red/Golden Delicious, McIntosh", labelRo: "Red/Golden Delicious, McIntosh" },
    ],
  },
];

export function FourFoodsExplorer() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = FOODS[sel];

  return (
    <div>
      {/* Food selector — four image thumbnails */}
      <div className="grid grid-cols-4 gap-3 sm:gap-6">
        {FOODS.map((f, i) => {
          const on = i === sel;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group flex flex-col items-center gap-3"
              style={{ cursor: "pointer" }}
            >
              <div
                className="relative aspect-square w-full overflow-hidden rounded-full border-2 transition-all duration-300"
                style={{ borderColor: on ? "#E8391B" : "rgba(12,9,7,0.12)", transform: on ? "scale(1.05)" : "scale(1)" }}
              >
                <Image
                  src={f.image}
                  alt={ro ? f.nameRo : f.name}
                  fill
                  sizes="160px"
                  className="object-cover transition-all duration-300"
                  style={{ filter: on ? "none" : "grayscale(0.35)" }}
                  unoptimized
                />
              </div>
              <span
                className="font-macro-display text-base font-black tracking-tight sm:text-lg"
                style={{ color: on ? "#E8391B" : "#0C0907" }}
              >
                {ro ? f.nameRo : f.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active food story */}
      <div key={active.key} className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgb(12,9,7,0.18)]">
          <Image
            src={active.image}
            alt={ro ? active.nameRo : active.name}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-3">
            {ro ? active.taglineRo : active.tagline}
          </p>
          <h3 className="font-macro-display text-4xl md:text-5xl font-black text-[#0C0907] tracking-tight mb-5 leading-none">
            {ro ? active.nameRo : active.name}
          </h3>
          <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
            {ro ? active.storyRo : active.story}
          </p>
          <div className="mt-7 flex flex-wrap gap-8">
            {active.facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-[#E8391B]/40 pl-4">
                <div className="font-macro-display text-3xl font-black text-[#0C0907] leading-none">
                  {fact.stat}
                </div>
                <div className="mt-1.5 font-body text-xs text-[#0C0907]/55 max-w-[9rem]">
                  {ro ? fact.labelRo : fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
