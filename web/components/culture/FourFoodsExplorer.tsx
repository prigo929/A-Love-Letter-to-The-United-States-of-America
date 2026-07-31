"use client";

// ─── FourFoodsExplorer ───────────────────────────────────────────────────────
// Four foods so ordinary Americans barely see them as food: steak, milk, the
// sandwich, the apple. Each carries an origin story that turns out to be pure
// American history: Spanish cattle and cowboy loanwords, downtown "swill" dairies,
// the Earl of Sandwich, and Johnny Appleseed's real business (cider, not pie).
//
// Adapted from research in JJ McCullough's "The 4 Foods That Define America."
// Written in the site's own editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

const IMG = {
  steak: SITE_IMAGES.culture.foodSteak,
  milk: SITE_IMAGES.culture.foodGlassOfMilk,
  sandwich: SITE_IMAGES.culture.foodHamSandwich,
  apple: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/2020-03-14_23_55_38_A_single_Nature%27s_Promise_Organic_Red_Delicious_Apple_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg/1280px-2020-03-14_23_55_38_A_single_Nature%27s_Promise_Organic_Red_Delicious_Apple_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg",
} as const;

interface FoodFact {
  stat: string;
  label: string;
  labelRo: string;
}

interface Food {
  key: string;
  icon: string;
  image: string;
  objectPosition?: string;
  unoptimized?: boolean;
  name: string;
  nameRo: string;
  tagline: string;
  taglineRo: string;
  story1: string;
  story1Ro: string;
  story2: string;
  story2Ro: string;
  facts: FoodFact[];
  worthKnowing: string;
  worthKnowingRo: string;
}

const FOODS: Food[] = [
  {
    key: "steak",
    icon: "🥩",
    image: IMG.steak,
    name: "Steak",
    nameRo: "Friptura",
    tagline: "From two directions · 1520s to Gilded Age",
    taglineRo: "Din doua directii · anii 1520 pana in Epoca de Aur",
    story1:
      "Beef reached America twice. Christopher Columbus brought the first cattle to the Caribbean in 1493, and Spanish colonists introduced open-range ranching to Mexico in the 1520s. This early cattle culture fused Spanish traditions with native Aztec wood-fire grilling (the komal) and created the vocabulary of the American cowboy: bronco, lasso, rodeo, and ranch are all anglicized Spanish. A century later, Dutch and British settlers landed their own herds on the East Coast, establishing domestic cattle farms across New England.",
    story1Ro:
      "Carnea de vita a ajuns in America de doua ori. Cristofor Columb a adus primele vite in Caraibe in 1493, iar colonistii spanioli au introdus cresterea vitelor pe pasuni deschise in Mexic in anii 1520. Aceasta cultura timpurie a impreunat traditiile spaniole cu gratarul pe lemne al aztecilor (komal-ul) si a creat vocabularul cowboy-ului american: bronco, lasso, rodeo si ranch sunt toate spaniola anglicizata. Un secol mai tarziu, colonistii olandezi si britanici si-au adus propriile cirezi pe Coasta de Est, infiintand ferme domestice in New England.",
    story2:
      "Beef only became absurdly abundant when two Midwestern forces converged in the 1850s: vast cornfields to fatten cattle and transcontinental railroads to move them. Chicago, Omaha, and Kansas City became meatpacking capitals, refrigerated railcars transported fresh beef east, and firms like Swift and Armour grew into the first corporate titans of the Gilded Age. Today, America remains the world's largest beef producer, and steak is a staple that bridges diner counters and high-end steakhouses.",
    story2Ro:
      "Carnea de vita a devenit absurd de abundenta abia cand s-au intalnit doua forte din Midwest in anii 1850: lanurile intinse de porumb pentru ingrasarea vitelor si caile ferate transcontinentale pentru transportul lor. Chicago, Omaha si Kansas City au devenit capitale ale abatoarelor, vagoanele frigorifice duceau carnea proaspata spre est, iar firme ca Swift si Armour au devenit primii titani corporativi ai Epocii de Aur. Azi, America ramane cel mai mare producator mondial de vita, iar friptura este un aliment de baza ce leaga restaurantele modeste de steakhousurile de elita.",
    facts: [
      { stat: "#1", label: "World beef producer", labelRo: "Producator mondial de vita" },
      { stat: "4", label: "Cowboy words from Spanish", labelRo: "Cuvinte cowboy din spaniola" },
      { stat: "1865+", label: "Corn + rail built the industry", labelRo: "Porumbul + calea ferata" },
    ],
    worthKnowing:
      "Steak presents a unique highbrow and lowbrow paradox in American dining: you can order a steak for fifteen dollars at Waffle House (America's largest overall steak seller) or spend two hundred dollars at a dry-aged steakhouse, with price determined by subtle cuts and preparation.",
    worthKnowingRo:
      "Friptura prezinta un paradox unic in gastronomia americana: poti comanda o friptura cu cincisprezece dolari la Waffle House (cel mai mare vanzator de fripturi din SUA) sau poti cheltui doua sute de dolari la un steakhouse maturat, pretul fiind determinat de taieturi si preparare.",
  },
  {
    key: "milk",
    icon: "🥛",
    image: IMG.milk,
    objectPosition: "center",
    name: "Milk",
    nameRo: "Laptele",
    tagline: "The Holstein century · 1852 to Modern Nutrition",
    taglineRo: "Secolul Holstein · 1852 pana la nutritia moderna",
    story1:
      "Milk is the one American staple whose consumer demand outran the technology to supply it safely. In the late 1700s, urban health movements praised raw cow's milk, but without refrigeration, transporting milk from rural farms was impossible. The disastrous temporary fix was the \"urban swill dairy\": cows were penned inside downtown city buildings, fed hot distillery waste, and their milk was ladled out of open, unsanitary street tubs.",
    story1Ro:
      "Laptele este singurul aliment de baza american a carui cerere a depasit tehnologia de a-l furniza in siguranta. La sfarsitul anilor 1700, miscarile urbane pentru sanatate laudau laptele crud de vaca, dar fara refrigerare, transportul laptelui de la fermele rurale era imposibil. Solutia temporara dezastruoasa a fost \"laptaria urbana de laturi\": vacile erau inchise in cladiri din centrul oraselor, hranite cu deseuri calde de distilerie, iar laptele era scos cu polonicul din cazi murdare de pe strada.",
    story2:
      "Refrigerated railcars in the 1870s and pasteurization finally enabled clean milk to arrive from rural dairies, delivered daily by the iconic Milkman into insulated milk boxes built into Victorian home walls. The importation of Dutch Holstein cows in 1852 (producing 100 pounds of milk daily, double previous breeds) combined with the 1917 automatic vacuum milking pump to industrialize production. By 1945, average American consumption reached 45 gallons per year, and the Kellogg brothers invented breakfast cereal largely to encourage morning milk consumption.",
    story2Ro:
      "Vagoanele frigorifice din anii 1870 si pasteurizarea au permis in sfarsit laptelui curat sa soseasca de la fermele rurale, livrat zilnic de laptar in cutiile de lapte izolate construite in peretii caselor victoriene. Importul vacilor olandeze Holstein in 1852 (care produceau 100 de livre de lapte zilnic, dublu fata de rasele anterioare) s-a combinat cu pompa de muls cu vid din 1917 pentru a industrializa productia. Pana in 1945, consumul mediu american a atins 45 de galoane pe an, iar fratii Kellogg au inventat cerealele de mic dejun in mare parte pentru a incuraja consumul de lapte dimineata.",
    facts: [
      { stat: "100 lb", label: "Holstein daily milk output", labelRo: "Producția zilnica Holstein" },
      { stat: "45 gal", label: "Per person annual peak (1945)", labelRo: "Vârf anual pe persoana (1945)" },
      { stat: "1906", label: "Cereal created to serve milk", labelRo: "Cereale create pentru lapte" },
    ],
    worthKnowing:
      "Victorian homes across North America were built with small insulated pass-through doors called milk boxes. The milkman unlocked the box from the outside to deposit fresh glass bottles, and the homeowner retrieved them from inside the kitchen.",
    worthKnowingRo:
      "Casele victoriene din America de Nord erau construite cu mici usi izolate numite cutii de lapte. Laptarul descuia cutia din exterior pentru a depune sticlele proaspete de sticla, iar proprietarul le lua din interiorul bucatariei.",
  },
  {
    key: "sandwich",
    icon: "🥪",
    image: IMG.sandwich,
    name: "Sandwich",
    nameRo: "Sandvisul",
    tagline: "The Earl's free hand · 1740s to Sliced Bread",
    taglineRo: "Mana libera a Contelui · anii 1740 pana la painea feliata",
    story1:
      "Bread has been eaten for over twenty thousand years, but the sandwich as a named, standardized food item dates to the 1740s and John Montagu, the 4th Earl of Sandwich. Wanting a meal he could eat with one hand while gambling or working, he placed meat between two slices of bread. Originating as an elite, high-society nibble (crustless white bread with cucumbers or shrimp), the sandwich was quickly adopted by 19th-century industrial laborers who needed a portable meal to eat on factory floors and steel construction girders.",
    story1Ro:
      "Painea a fost consumata timp de peste douazeci de mii de ani, dar sandvisul ca produs alimentar denumit si standardizat dateaza din anii 1740 si i se datoreaza lui John Montagu, al 4-lea Conte de Sandwich. Dorind o masa pe care sa o poata manca cu o singura mana in timp ce juca sau lucra, a pus carne intre doua felii de paine. Originat ca o gustare de elita (paine alba fara coaja cu castraveti sau creveti), sandvisul a fost rapid adoptat de muncitorii industriali din secolul XIX care aveau nevoie de o masa portabila pe care sa o manance in fabrici si pe grinzile de otel.",
    story2:
      "In the 1920s, two Midwestern inventions transformed the sandwich into an American staple: the automatic commercial bread slicer (1928) and the pop-up toaster. Factory-sliced loaves quickly grew to account for 90% of all bread sold in America. The convenience birthed the post-war American sandwich canon: the PB&J, the BLT, and egg salad.",
    story2Ro:
      "In anii 1920, doua inventii din Midwest au transformat sandvisul intr-un aliment de baza american: feliatorul automat de paine (1928) si prazitorul pop-up. Pains feliata din fabrica a ajuns rapid sa reprezinte 90% din toata painea vanduta in America. Aceasta comoditate a generat canonul postbelic al sandvisurilor americane: PB&J, BLT si salata de oua.",
    facts: [
      { stat: "1740s", label: "Earl of Sandwich standardizes it", labelRo: "Contele de Sandwich il standardizeaza" },
      { stat: "1928", label: "Automatic sliced bread invented", labelRo: "Painea feliata automata inventata" },
      { stat: "90%", label: "Factory sliced bread market share", labelRo: "Ponderea painii feliate de fabrica" },
    ],
    worthKnowing:
      "Modern food history holds a funny reversal: expensive artisanal cafe sandwiches with thick, rustic crusts resemble 19th-century working-class factory meals, while mass-market store-bought Uncrustables look like 18th-century aristocratic tea sandwiches.",
    worthKnowingRo:
      "Istoria alimentara moderna are o rasturnare amuzanta: sandvisurile scumpe artizanale cu cruste groase si rustice seamana cu mesele muncitoresti din secolul XIX, in timp ce produsele Uncrustables din supermarket arata ca sandvisurile aristocratice de ceai din secolul XVIII.",
  },
  {
    key: "apple",
    icon: "🍎",
    image: IMG.apple,
    unoptimized: true,
    name: "Apple",
    nameRo: "Marul",
    tagline: "Johnny Appleseed's cider · 1800s to Cosmic Crisp",
    taglineRo: "Cidrul lui Johnny Appleseed · anii 1800 pana la Cosmic Crisp",
    story1:
      "America's most wholesome fruit began as a drinking crop. Native North American crabapples were small and sour, and European varieties brought by early colonists were equally unpalatable fresh. In the early 1800s, John Chapman (known as Johnny Appleseed) traveled across the Midwest selling apple tree seedlings to pioneer families. He grew wealthy not by promoting wholesome apple pies, but by supplying settlers with the primary ingredient for hard apple cider, the most popular liquor of the American frontier.",
    story1Ro:
      "Cel mai cuminte fruct al Americii a inceput ca o cultura pentru bautura. Merele native din America de Nord erau mici si acre, iar soiurile europene aduse de primii colonisti erau la fel de neplacute proaspete. La inceputul anilor 1800, John Chapman (cunoscut ca Johnny Appleseed) a calatorit prin Midwest vanzand puieti de mar familiilor de pionieri. S-a imbogatit nu promovand placinte cu mere, ci furnizand pionierilor ingredientul principal pentru cidrul dur de mere, cea mai populara bautura alcoolica a frontierei.",
    story2:
      "During Prohibition, militant temperance activists targeted apple orchards, chopping down trees associated with cider production. Following Prohibition, the American Apple Institute launched a national public relations campaign to rehabilitate the fruit's image, introducing classic slogans like \"as American as apple pie\" and \"an apple a day keeps the doctor away.\" 19th-century horticulture bred the Red Delicious, Golden Delicious, and McIntosh, while modern bioengineering ushered in a second golden age with crisp varieties like Honeycrisp and Cosmic Crisp.",
    story2Ro:
      "In timpul Prohibitiei, activistii antialcool au vizat livezile de mere, taind copacii asociati cu productia de cidru. Dupa Prohibitie, Institutul American al Marului a lansat o campanie nationala de relatii publice pentru a reabilita imaginea fructului, introducand slogane clasice precum \"as American as apple pie\" si \"an apple a day keeps the doctor away.\" Horticultura din secolul XIX a creat Red Delicious, Golden Delicious si McIntosh, in timp ce bioingineria moderna a deschis o a doua epoca de aur cu soiuri precum Honeycrisp si Cosmic Crisp.",
    facts: [
      { stat: "#1", label: "Hard cider was frontier's liquor", labelRo: "Cidrul, bautura frontierei" },
      { stat: "1930s", label: "Apple Pie slogan post-Prohibition PR", labelRo: "Sloganul Apple Pie = PR post-Prohibitie" },
      { stat: "2019", label: "Cosmic Crisp bioengineered era", labelRo: "Era bioingineriei Cosmic Crisp" },
    ],
    worthKnowing:
      "The phrase \"as American as apple pie\" was not an ancient folk saying. It was explicitly created by commercial fruit growers in the 1930s to rebrand the apple from a demonized liquor crop into a wholesome symbol of patriotic domesticity.",
    worthKnowingRo:
      "Expresia \"as American as apple pie\" nu a fost un proverb vechi. A fost creata explicita de cultivatorii comerciali de fructe in anii 1930 pentru a rebrandui marul dintr-o cultura pentru alcool intr-un simbol curat al domeniului casnic patriotic.",
  },
];

export function FourFoodsExplorer() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = FOODS[sel];

  return (
    <div className="w-full">
      {/* Democratic Foods Thesis Banner */}
      <div className="mb-12 rounded-2xl border border-[#0C0907]/10 bg-white/40 p-6 md:p-8 backdrop-blur-md shadow-[0_4px_20px_rgb(12,9,7,0.03)]">
        <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-2">
          {ro ? "TEZA MANCARURILOR DEMOCRATICE" : "THE DEMOCRATIC FOODS THESIS"}
        </p>
        <h3 className="font-macro-display text-2xl md:text-3xl font-black text-[#0C0907] leading-tight mb-3">
          {ro
            ? "Mancarurile obisnuite ca simbol al egalitatii americane"
            : "Ordinary Foods as Symbols of American Equality"}
        </h3>
        <p className="font-editorial text-base md:text-lg text-[#0C0907]/75 leading-relaxed">
          {ro
            ? "In istoria americana timpurie, democratia nu era doar un sistem politic de vot, ci o realitate a consumului. Intelectualii patriotici celebrau faptul ca toti cetatenii aveau acces la modeste luxuri (friptura, lapte, sandvisuri, mere) care in Europa erau rezervate aristocratiei."
            : "In early American history, democracy was not just a political voting system, but a consumer reality. Patriotic intellectuals celebrated when ordinary citizens gained access to modest luxuries (steak, milk, sandwiches, apples) that were reserved for European aristocrats."}
        </p>
      </div>

      {/* Food selector: four image thumbnails */}
      <div className="grid grid-cols-4 gap-3 sm:gap-6 mb-12">
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
                style={{
                  borderColor: on ? "#E8391B" : "rgba(12,9,7,0.12)",
                  transform: on ? "scale(1.05)" : "scale(1)",
                  boxShadow: on ? "0 12px 30px rgb(12,9,7,0.12)" : "none",
                }}
              >
                <Image
                  src={f.image}
                  alt={ro ? f.nameRo : f.name}
                  fill
                  sizes="(max-width: 640px) 25vw, 400px"
                  quality={95}
                  className="object-cover transition-all duration-300"
                  style={{
                    filter: on ? "none" : "grayscale(0.35)",
                    objectPosition: f.objectPosition ?? "center",
                  }}
                  unoptimized={f.unoptimized}
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

      {/* Active food dossier view */}
      <div key={active.key} className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14 items-start">
        {/* Left column: Image, Stats, Worth Knowing */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-[#0C0907]/10 bg-white shadow-[0_20px_60px_rgb(12,9,7,0.14)]">
            <Image
              src={active.image}
              alt={ro ? active.nameRo : active.name}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              style={{ objectPosition: active.objectPosition ?? "center" }}
              unoptimized={active.unoptimized}
            />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            {active.facts.map((fact) => (
              <div key={fact.label} className="rounded-xl border border-[#0C0907]/8 bg-white/60 p-3">
                <div className="font-macro-display text-2xl font-black text-[#E8391B] leading-none">
                  {fact.stat}
                </div>
                <div className="mt-1 font-body text-[11px] text-[#0C0907]/60 leading-tight">
                  {ro ? fact.labelRo : fact.label}
                </div>
              </div>
            ))}
          </div>

          {/* Worth Knowing Aside */}
          <div className="rounded-2xl border border-[#0C0907]/8 bg-white/60 p-5 shadow-[0_4px_20px_rgb(12,9,7,0.03)]">
            <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
              {ro ? "DE STIUT" : "WORTH KNOWING"}
            </p>
            <p className="font-editorial text-[15px] leading-relaxed text-[#0C0907]/70">
              {ro ? active.worthKnowingRo : active.worthKnowing}
            </p>
          </div>
        </div>

        {/* Right column: Editorial text */}
        <div className="flex flex-col justify-center">
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B] mb-2">
            {ro ? active.taglineRo : active.tagline}
          </p>
          <h3 className="font-macro-display text-4xl sm:text-5xl font-black text-[#0C0907] tracking-tight leading-none mb-6">
            {ro ? active.nameRo : active.name}
          </h3>

          <div className="space-y-4 font-editorial text-[17px] leading-[1.75] text-[#0C0907]/75">
            <p>{ro ? active.story1Ro : active.story1}</p>
            <p>{ro ? active.story2Ro : active.story2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
