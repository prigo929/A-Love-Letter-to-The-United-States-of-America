"use client";

// ─── SevenDessertsExplorer ───────────────────────────────────────────────────
// The Great American Dessert Canon — seven treats that each turn out to carry a
// slab of American history: the donut's melting-pot origins, Jell-O served to
// immigrants at Ellis Island, s'mores codified by the 1927 Girl Scout handbook,
// cotton candy invented by a dentist. Click any to open its story.
//
// Adapted from a video essay's research (JJ, "History of the 7 Greatest American
// Desserts"): the facts and the seven-item canon guided coverage; every line of
// prose here is rewritten in the site's own voice, not transcribed. Two images
// are local (SITE_IMAGES); the other five are CC/CC0 from Wikimedia Commons.

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

interface Dessert {
  key: string;
  name: string;
  nameRo: string;
  year: string;
  image: string;
  unoptimized?: boolean;
  story: string;
  storyRo: string;
  facts: { stat: string; label: string; labelRo: string }[];
}

const WIKI = {
  cheesecake: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Carnegie_Deli_Strawberry_Cheesecake.jpg/1280px-Carnegie_Deli_Strawberry_Cheesecake.jpg",
  jello: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/A_pot_of_strawberry_jelly.jpg/1280px-A_pot_of_strawberry_jelly.jpg",
  cupcake: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/2019-08-05_15_07_53_Cupcakes_with_chocolate_frosting_and_sprinkles_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg/1280px-2019-08-05_15_07_53_Cupcakes_with_chocolate_frosting_and_sprinkles_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg",
  bananaSplit: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/%E2%80%9CAll_American%E2%80%9D_Banana_Split.jpg/1280px-%E2%80%9CAll_American%E2%80%9D_Banana_Split.jpg",
  cottonCandy: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Candy_Floss_-_Wellington%2C_NZ_-_DSC09546.jpg/1280px-Candy_Floss_-_Wellington%2C_NZ_-_DSC09546.jpg",
} as const;

const DESSERTS: Dessert[] = [
  {
    key: "donut", name: "The Donut", nameRo: "Gogoașa", year: "1920s",
    image: SITE_IMAGES.culture.foodDoughnuts,
    story:
      "A donut is just dough fried in oil — an idea half the world stumbled onto independently — but the American version is a true melting-pot story. It grew out of the New England fried-bread traditions of Dutch, French and German settlers (the Dutch 'olykoek', or oil-cake, gets most of the credit). The ring shape won out because it cooks fast and evenly, with no mushy middle. World War I gave doughnuts to soldiers overseas, who came home craving them; a Bulgarian immigrant named Adolph Levitt built the conveyor-belt frying machine in 1921, and the chains followed — Krispy Kreme in 1937, Dunkin' in 1950. Today the donut is at once the symbol of cheap office convenience and the artisanal-pastry flex.",
    storyRo:
      "O gogoașă e doar aluat prăjit în ulei — o idee la care a ajuns independent jumătate de lume — dar versiunea americană este o adevărată poveste de creuzet. A crescut din tradițiile de pâine prăjită din New England ale coloniștilor olandezi, francezi și germani („olykoek”-ul olandez primește cel mai mult credit). Forma de inel a câștigat pentru că se prăjește rapid și uniform. Primul Război Mondial le-a dat gogoși soldaților de peste ocean; imigrantul bulgar Adolph Levitt a construit mașina cu bandă rulantă în 1921, iar lanțurile au urmat — Krispy Kreme în 1937, Dunkin' în 1950.",
    facts: [
      { stat: "1921", label: "Levitt's frying machine", labelRo: "Mașina de prăjit Levitt" },
      { stat: "1937", label: "Krispy Kreme opens", labelRo: "Se deschide Krispy Kreme" },
    ],
  },
  {
    key: "cheesecake", name: "New York Cheesecake", nameRo: "Cheesecake New York", year: "1880",
    image: WIKI.cheesecake, unoptimized: true,
    story:
      "The oldest dessert here — the word 'cheesecake' dates to at least the 15th century. Every European country baked its own; the American icon descends from the German Käsekuchen. When German immigrants flooded New York in the late 1800s, they rebuilt the recipe with a distinctly American ingredient: cream cheese, a soft cheese Pennsylvania farm wives sold into Philadelphia. Refrigerated railcars carried it to New York as an upscale indulgence, and a New Yorker slapped the name 'Philadelphia' on his 1880 brand to cash in. The graham-cracker crust arrived in the 1920s — an accidental legacy of Sylvester Graham, the anti-pleasure Victorian health crank whose bland cracker got sugared up and folded into the richest cake in America.",
    storyRo:
      "Cel mai vechi desert de aici — cuvântul „cheesecake” datează cel puțin din secolul al XV-lea. Icoana americană descinde din Käsekuchen-ul german. Când imigranții germani au inundat New York-ul la sfârșitul anilor 1800, au reconstruit rețeta cu un ingredient distinct american: crema de brânză. Un new-yorkez a pus numele „Philadelphia” pe marca sa din 1880. Crusta din biscuiți graham a apărut în anii 1920 — o moștenire accidentală a lui Sylvester Graham, excentricul victorian al sănătății.",
    facts: [
      { stat: "15th c.", label: "The word is that old", labelRo: "Cuvântul e atât de vechi" },
      { stat: "1880", label: "'Philadelphia' brand created", labelRo: "Marca „Philadelphia”" },
    ],
  },
  {
    key: "jello", name: "Jell-O", nameRo: "Jell-O", year: "1899",
    image: WIKI.jello, unoptimized: true,
    story:
      "Gelatin is boiled animal collagen — skin, cartilage, bone — and for centuries a shimmering mound of it signaled banquet luxury because it took a master chef to make. The Industrial Revolution changed that: in 1899 Orator Woodward of LeRoy, New York bought a powdered-gelatin recipe from a glue maker and churned it out in 3-ounce boxes identical to today's. It was a miracle product — mix, add anything, wait, and you had a dessert — and it was proclaimed 'America's dessert', at one point handed to new arrivals at Ellis Island as an introduction to American life. It later curdled into a symbol of square 1950s conformity, which is roughly where its reputation still sits.",
    storyRo:
      "Gelatina este colagen animal fiert — piele, cartilaj, os — și timp de secole o movilă strălucitoare din ea semnala luxul banchetelor, fiindcă necesita un maestru bucătar. Revoluția Industrială a schimbat asta: în 1899, Orator Woodward din LeRoy, New York, a cumpărat o rețetă de gelatină pudră de la un producător de clei și a scos-o în cutii de 3 uncii identice cu cele de azi. A fost proclamat „desertul Americii”, la un moment dat oferit noilor sosiți la Ellis Island.",
    facts: [
      { stat: "1899", label: "Woodward's 3-oz box", labelRo: "Cutia de 3 uncii Woodward" },
      { stat: "Ellis Is.", label: "Served to new immigrants", labelRo: "Servit imigranților noi" },
    ],
  },
  {
    key: "cupcake", name: "The Cupcake", nameRo: "Brioșa", year: "1859",
    image: WIKI.cupcake, unoptimized: true,
    story:
      "Tiny cakes are ancient, but the modern cupcake is a product of the assembly line. In 1859 the Bostonian Nathaniel Waterman patented a cast-iron pan with multiple compartments — 'gem cakes' — that let bakers and then factories turn out big batches of identical little cakes, all cooked evenly at once. What made it revolutionary was democracy: the elaborately iced, decorated cake had been the exclusive domain of the wealthy at banquet dinners, and cheap mass-produced icing and candies put it in the hand of any middle-class worker on his way to the office. The recent gourmet-cupcake boom is the same old impulse — using dessert to flaunt a little luxury.",
    storyRo:
      "Prăjiturile mici sunt străvechi, dar brioșa modernă este un produs al liniei de asamblare. În 1859, bostonianul Nathaniel Waterman a brevetat o tavă din fontă cu mai multe compartimente — „gem cakes” — care le permitea brutarilor și apoi fabricilor să scoată loturi mari de prăjituri mici identice, toate coapte uniform deodată. Ce a făcut-o revoluționară a fost democrația: tortul decorat elaborat fusese domeniul exclusiv al celor bogați.",
    facts: [
      { stat: "1859", label: "Waterman's gem-cake pan", labelRo: "Tava lui Waterman" },
      { stat: "12", label: "Cakes cooked evenly at once", labelRo: "Prăjituri coapte deodată" },
    ],
  },
  {
    key: "banana-split", name: "Banana Split", nameRo: "Banana Split", year: "1904",
    image: WIKI.bananaSplit, unoptimized: true,
    story:
      "Two towns still fight over it: Latrobe, Pennsylvania (David Strickler, 1904) versus Wilmington, Ohio (Ernest Hazard, 1907, who added the iconic chocolate-strawberry-pineapple trio). It could only exist because of the fruit boom — bananas had become a national obsession, and America is still the world's biggest banana consumer, importing about four million tons a year, nearly half from Guatemala alone. That appetite reshaped Latin America into single-crop economies and gave the language the phrase 'banana republic'. The pineapple sauce has its own imperial story, running through James Dole's Hawaiian plantations. A banana split is, quietly, a monument to globalization.",
    storyRo:
      "Două orașe încă se ceartă pentru el: Latrobe, Pennsylvania (David Strickler, 1904) versus Wilmington, Ohio (Ernest Hazard, 1907, care a adăugat trio-ul iconic ciocolată-căpșuni-ananas). A putut exista doar datorită avântului fructelor — bananele deveniseră o obsesie națională, iar America este încă cel mai mare consumator de banane din lume, importând circa patru milioane de tone pe an. Acel apetit a transformat America Latină în economii cu o singură cultură și a dat limbii expresia „banana republic”.",
    facts: [
      { stat: "4M t", label: "US bananas imported yearly", labelRo: "Banane importate anual" },
      { stat: "1904", label: "Latrobe, Pennsylvania", labelRo: "Latrobe, Pennsylvania" },
    ],
  },
  {
    key: "smores", name: "S'mores", nameRo: "S'mores", year: "1927",
    image: SITE_IMAGES.culture.foodSmores,
    story:
      "Marshmallow began as medicine — a soothing goo made from the sap of the marshmallow plant's roots, a twelve-hour job that manufacturers soon faked with sugar, egg whites and gelatin. Once it was cheap, kids roasted it over campfires, and roasting marshmallows became a sentimental fixture of middle-class outdoor life. The scouting movement sealed it: the 1927 Girl Scouts handbook printed a recipe for 'Some Mores' — a toasted marshmallow and a chunk of chocolate pressed between two of Reverend Graham's crackers. Alongside forgotten camp snacks like 'rum tum diddies', this one obviously survived. You eat one, you want some more.",
    storyRo:
      "Bezeaua a început ca medicament — un gel liniștitor făcut din seva rădăcinilor plantei de nalbă, o muncă de douăsprezece ore pe care producătorii au falsificat-o curând cu zahăr, albușuri și gelatină. Odată ieftină, copiii o prăjeau peste focurile de tabără. Mișcarea cercetașilor a pecetluit-o: manualul Girl Scouts din 1927 a tipărit o rețetă pentru „Some Mores” — o bezea prăjită și o bucată de ciocolată presate între doi biscuiți graham.",
    facts: [
      { stat: "1927", label: "Girl Scouts handbook recipe", labelRo: "Rețeta din manualul Girl Scouts" },
      { stat: "3", label: "Marshmallow, chocolate, graham", labelRo: "Bezea, ciocolată, graham" },
    ],
  },
  {
    key: "cotton-candy", name: "Cotton Candy", nameRo: "Vată de zahăr", year: "1904",
    image: WIKI.cottonCandy, unoptimized: true,
    story:
      "Cotton candy exists because of one machine. In 1897 two men from Nashville — one of them, fittingly, a dentist named William Morrison — patented a device that spun sugar into fine filaments, and debuted it as 'fairy floss' at the 1904 St. Louis World's Fair, an event that shaped an astonishing amount of American food culture. It was an instant hit and has been a carnival fixture ever since. More than a century on, we make it the same way, with the same technology, for the same purpose: something for a child to munch on, brainlessly, while staring at a prize-winning hog.",
    storyRo:
      "Vata de zahăr există datorită unei singure mașini. În 1897, doi bărbați din Nashville — unul dintre ei, pe bună dreptate, un dentist numit William Morrison — au brevetat un dispozitiv care învârtea zahărul în filamente fine și l-au lansat ca „fairy floss” la Târgul Mondial din St. Louis din 1904. A fost un succes instantaneu și a rămas un element de bâlci de atunci. Peste un secol mai târziu, o facem în același fel, cu aceeași tehnologie.",
    facts: [
      { stat: "1897", label: "Patented by a dentist", labelRo: "Brevetată de un dentist" },
      { stat: "1904", label: "Debut at the World's Fair", labelRo: "Debut la Târgul Mondial" },
    ],
  },
];

export function SevenDessertsExplorer() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = DESSERTS[sel];

  return (
    <div>
      {/* Dessert selector — seven image thumbnails */}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
        {DESSERTS.map((d, i) => {
          const on = i === sel;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group flex flex-col items-center gap-2 transition-transform"
              style={{ cursor: "pointer" }}
            >
              <div
                className="relative aspect-square w-full overflow-hidden rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: on ? "#E8391B" : "rgba(12,9,7,0.12)",
                  transform: on ? "scale(1.05)" : "scale(1)",
                }}
              >
                <Image
                  src={d.image}
                  alt={ro ? d.nameRo : d.name}
                  fill
                  sizes="120px"
                  className="object-cover transition-all duration-300"
                  style={{ filter: on ? "none" : "grayscale(0.35)" }}
                  unoptimized={d.unoptimized}
                />
              </div>
              <span
                className="text-center font-body text-[10px] font-bold uppercase leading-tight tracking-wider sm:text-[11px]"
                style={{ color: on ? "#E8391B" : "rgba(12,9,7,0.45)" }}
              >
                {ro ? d.nameRo : d.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active dessert */}
      <div key={active.key} className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_rgb(12,9,7,0.18)]">
          <Image
            src={active.image}
            alt={ro ? active.nameRo : active.name}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="object-cover"
            unoptimized={active.unoptimized}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-3">
            {active.year}
          </p>
          <h3 className="font-macro-display text-4xl md:text-5xl font-black text-[#0C0907] tracking-tight mb-5 leading-none">
            {ro ? active.nameRo : active.name}
          </h3>
          <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
            {ro ? active.storyRo : active.story}
          </p>
          <div className="mt-7 flex gap-8">
            {active.facts.map((f) => (
              <div key={f.label}>
                <div className="font-macro-display text-3xl font-black text-[#0C0907] leading-none">{f.stat}</div>
                <div className="mt-1.5 font-body text-xs text-[#0C0907]/55 max-w-[9rem]">{ro ? f.labelRo : f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
