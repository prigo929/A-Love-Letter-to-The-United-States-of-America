// ─── Natural Resources Data ───────────────────────────────────────────────────
// All factual content for the /natural-resources landing page lives here, decoupled
// from the JSX. Mirrors the bilingual pattern of economy-data.ts: English values
// plus `getX(locale)` accessors that return the right language.
//
// Figures are grounded in well-known public data (EIA, USDA, USGS, BP Statistical
// Review). They are illustrative round numbers, not live feeds.

import type { Locale } from "@/lib/i18n/config";
import type { GdpDataPoint } from "@/lib/data/economy-data";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ResourceStat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  source: string;
  color?: "emerald" | "gold" | "white";
}

export interface ResourceFact {
  id: string;
  fact: string;
  detail: string;
}

export interface ResourceQuote {
  quote: string;
  attribution: string;
  title: string;
}

// ── Chart datasets (reuse the GdpDataPoint shape; `gdp` holds the metric) ────────
// The chart's units are conveyed by the surrounding title/subtitle copy.

export const OIL_PRODUCTION: GdpDataPoint[] = [
  { country: "United States", gdp: 13.2, flag: "🇺🇸", highlight: true },
  { country: "Saudi Arabia", gdp: 9.7, flag: "🇸🇦" },
  { country: "Russia", gdp: 9.5, flag: "🇷🇺" },
  { country: "Canada", gdp: 5.0, flag: "🇨🇦" },
  { country: "Iraq", gdp: 4.3, flag: "🇮🇶" },
  { country: "China", gdp: 4.2, flag: "🇨🇳" },
];

export const GAS_PRODUCTION: GdpDataPoint[] = [
  { country: "United States", gdp: 1035, flag: "🇺🇸", highlight: true },
  { country: "Russia", gdp: 586, flag: "🇷🇺" },
  { country: "Iran", gdp: 252, flag: "🇮🇷" },
  { country: "China", gdp: 234, flag: "🇨🇳" },
  { country: "Canada", gdp: 190, flag: "🇨🇦" },
  { country: "Qatar", gdp: 178, flag: "🇶🇦" },
];

export const CORN_PRODUCTION: GdpDataPoint[] = [
  { country: "United States", gdp: 390, flag: "🇺🇸", highlight: true },
  { country: "China", gdp: 289, flag: "🇨🇳" },
  { country: "Brazil", gdp: 137, flag: "🇧🇷" },
  { country: "European Union", gdp: 60, flag: "🇪🇺" },
  { country: "Argentina", gdp: 50, flag: "🇦🇷" },
  { country: "India", gdp: 38, flag: "🇮🇳" },
];

export const COAL_RESERVES: GdpDataPoint[] = [
  { country: "United States", gdp: 249, flag: "🇺🇸", highlight: true },
  { country: "Russia", gdp: 162, flag: "🇷🇺" },
  { country: "Australia", gdp: 150, flag: "🇦🇺" },
  { country: "China", gdp: 143, flag: "🇨🇳" },
  { country: "India", gdp: 111, flag: "🇮🇳" },
  { country: "Germany", gdp: 36, flag: "🇩🇪" },
];

// ── Hero stats (string values for MacroHero) ────────────────────────────────────

export function getResourcesHeroStats(
  locale: Locale,
): { value: string; label: string; sub?: string }[] {
  const isRo = locale === "ro";
  return [
    { value: "#1", label: isRo ? "Producător de Petrol și Gaze" : "Oil & Gas Producer", sub: isRo ? "Pe Pământ" : "On Earth" },
    { value: "13.2M", label: isRo ? "Barili de Petrol / Zi" : "Barrels of Oil / Day", sub: "2024" },
    { value: "880M", label: isRo ? "Acri de Teren Agricol" : "Acres of Farmland", sub: "USDA" },
    { value: "21%", label: isRo ? "din Apa Dulce de Suprafață a Lumii" : "of Earth's Fresh Surface Water", sub: isRo ? "Marile Lacuri" : "Great Lakes" },
  ];
}

// ── Overview stat wall (numeric, for AnimatedCounter + MacroStat) ────────────────

export function getResourcesOverviewStats(locale: Locale): ResourceStat[] {
  const isRo = locale === "ro";
  return [
    { id: "oil", value: 13.2, suffix: "M", decimals: 1, label: isRo ? "Barili de Petrol pe Zi" : "Barrels of Oil per Day", source: "EIA 2024", color: "emerald" },
    { id: "farmland", value: 880, suffix: "M", label: isRo ? "Acri de Teren Agricol" : "Acres of Farmland", source: "USDA", color: "gold" },
    { id: "coal", value: 249, suffix: "B", label: isRo ? "Tone de Rezerve de Cărbune" : "Tons of Coal Reserves", source: "EIA / BP", color: "white" },
    { id: "freshwater", value: 21, suffix: "%", label: isRo ? "din Apa Dulce de Suprafață a Lumii" : "of World Surface Fresh Water", source: isRo ? "Marile Lacuri" : "Great Lakes", color: "emerald" },
  ];
}

// ── Narrative paragraphs ─────────────────────────────────────────────────────────

export function getResourcesOverviewParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "De la câmpurile petroliere din Bazinul Permian la mările de grâu din Kansas, de la lanțurile de fier din Minnesota la canioanele îndiguite ale râului Colorado, Statele Unite se află deasupra uneia dintre cele mai complete înzestrări de bogăție naturală acordate vreodată unei singure națiuni.",
      "Această abundență nu este un accident al geografiei. Un teritoriu care se întinde pe un continent, o inimă temperată, două coaste oceanice și cel mai navigabil sistem fluvial din lume fac din America, simultan, cel mai mare producător de energie al planetei, unul dintre cei mai mari exportatori agricoli, un depozit de minerale și păzitorul unei cincimi din apa dulce de suprafață a Pământului.",
      "Ceea ce urmează este inventarul acestei bogății, pilon cu pilon: energia care alimentează lumea modernă, recoltele care o hrănesc, mineralele care o construiesc și apa care o susține.",
    ];
  }
  return [
    "Stretching from the oil fields of the Permian Basin to the wheat seas of Kansas, from the iron ranges of Minnesota to the dammed canyons of the Colorado, the United States sits atop one of the most complete endowments of natural wealth ever granted to a single nation.",
    "That abundance is no accident of geography. A continent-spanning territory, a temperate heartland, two ocean coastlines, and the world's most navigable river system make America simultaneously the planet's largest energy producer, one of its greatest agricultural exporters, a mineral storehouse, and the guardian of a fifth of the Earth's surface fresh water.",
    "What follows is the inventory of that wealth, pillar by pillar: the energy that powers the modern world, the harvests that feed it, the minerals that build it, and the water that sustains it.",
  ];
}

export function getEnergyParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "America este, încă o dată, cea mai importantă putere energetică a lumii. Deblocată de revoluția șisturilor și de forajul orizontal, producția de țiței a SUA a depășit orice rival — mai mult decât Arabia Saudită, mai mult decât Rusia — atingând aproximativ 13 milioane de barili pe zi. Țara extrage mai mult gaz natural decât oricare alta și, în doar un deceniu, a trecut de la importator la cel mai mare exportator de gaz natural lichefiat de pe planetă.",
      "Aceasta este independența energetică pe care generații de președinți doar au promis-o. Alimentează industria americană, încălzește casele americane și — expediată drept GNL din terminalele de pe Coasta Golfului — încălzește acum Europa și Asia, transformând o vulnerabilitate strategică într-o armă strategică.",
    ];
  }
  return [
    "America is, once again, the world's foremost energy power. Unlocked by the shale revolution and horizontal drilling, U.S. crude output has surged past every rival — more than Saudi Arabia, more than Russia — to roughly 13 million barrels a day. The country pumps more natural gas than any other on Earth and, in barely a decade, has gone from importer to the largest exporter of liquefied natural gas on the planet.",
    "This is the energy independence that generations of presidents only promised. It powers American industry, heats American homes, and — shipped as LNG from Gulf Coast terminals — now warms Europe and Asia, turning a strategic vulnerability into a strategic weapon.",
  ];
}

export function getAgricultureParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "De-a lungul vastelor câmpii interioare se află cel mai productiv teren agricol de pe Pământ. Aproximativ 880 de milioane de acri — aproape 40% din suprafața națiunii — sunt dedicați fermelor și ranch-urilor, ancorați de solurile adânci, negre și glaciare ale Centurii Porumbului. Statele Unite sunt cel mai mare producător mondial de porumb și un producător de top de soia, carne de vită și lactate.",
      "Agricultura americană hrănește cu mult mai mult decât pe americani. Peste 170 de miliarde de dolari în bunuri agricole sunt exportate în fiecare an, făcând din SUA unul dintre cei mai mari exportatori de alimente din istorie — un singur comitat din Iowa poate depăși producția unor națiuni întregi. Mecanizarea, biotehnologia și irigarea au transformat inima țării în coșul de pâine al lumii.",
    ];
  }
  return [
    "Across the vast interior lowlands lies the most productive farmland on Earth. Some 880 million acres — nearly 40% of the nation's land — are given over to farms and ranches, anchored by the Corn Belt's deep, black, glacial soils. The United States is the world's leading producer of corn and a top producer of soybeans, beef, and dairy.",
    "American agriculture feeds far more than Americans. Over $170 billion in farm goods are exported each year, making the U.S. one of the largest food exporters in history — a single Iowa county can out-produce entire nations. Mechanization, biotechnology, and irrigation have turned the heartland into the breadbasket of the world.",
  ];
}

export function getMineralsParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "Sub sol se află o a doua avere. Statele Unite dețin cele mai mari rezerve recuperabile de cărbune din orice țară — aproximativ un sfert din totalul mondial — alături de zăcăminte de clasă mondială de cupru, aur și metalele de bază ale industriei. Mina terasată Bingham Canyon din Utah, adâncă de o milă, este printre cele mai mari excavații umane de pe Pământ.",
      "Acum se desfășoară o nouă goană după minerale. Mountain Pass, în California, este principala mină de pământuri rare din Emisfera Vestică, iar Thacker Pass, în Nevada, deține unul dintre cele mai mari zăcăminte de litiu cunoscute din lume — metalele bateriilor, magneților și ale tehnologiilor care vor defini secolul ce vine.",
    ];
  }
  return [
    "Beneath the soil lies a second fortune. The United States holds the largest recoverable coal reserves of any country — roughly a quarter of the world's total — alongside world-class deposits of copper, gold, and the building-block metals of industry. The terraced, mile-deep Bingham Canyon Mine in Utah is among the largest human excavations on Earth.",
    "Now a new mineral rush is underway. Mountain Pass in California is the Western Hemisphere's premier rare-earth mine, and Nevada's Thacker Pass holds one of the largest known lithium deposits in the world — the metals of batteries, magnets, and the technologies that will define the coming century.",
  ];
}

export function getWaterParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "Apa este poate cea mai rară dintre resursele Americii — iar țara este extraordinar de bogată în ea. Numai Marile Lacuri dețin aproximativ 21% din apa dulce de suprafață a lumii; sistemul Mississippi–Missouri drenează 41% din Statele Unite continentale și se numără printre cele mai mari bazine fluviale de pe Pământ; iar vastul Acvifer Ogallala irigă o mare parte din Marile Câmpii.",
      "Această apă înseamnă și putere. Mii de baraje — de la monumentul ingineresc al Barajului Hoover la sistemele Columbia și Tennessee — transformă apa căzătoare în cea mai mare sursă de electricitate regenerabilă a națiunii, în timp ce ecluzele și canalele transportă spre mare grâul, cărbunele și mărfurile unui întreg continent.",
    ];
  }
  return [
    "Water may be the rarest of America's resources — and the country is extraordinarily rich in it. The Great Lakes alone hold about 21% of the world's surface fresh water; the Mississippi–Missouri system drains 41% of the contiguous United States and ranks among the largest river basins on Earth; and the vast Ogallala Aquifer irrigates much of the High Plains.",
    "That water is also power. Thousands of dams — from the engineering monument of Hoover Dam to the Columbia and Tennessee systems — turn falling water into the nation's largest source of renewable electricity, while locks and channels carry a continent's worth of grain, coal, and goods to the sea.",
  ];
}

// ── Facts ────────────────────────────────────────────────────────────────────────

export function getEnergyFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "shale", fact: "Revoluția Șisturilor", detail: "Fracturarea hidraulică și forajul orizontal au deblocat Permian, Bakken și Marcellus, dublând producția de petrol a SUA într-un deceniu." },
      { id: "lng", fact: "#1 la Export de GNL", detail: "În mai puțin de zece ani, SUA a trecut de la importator de gaz la cel mai mare exportator de gaz natural lichefiat din lume." },
      { id: "independence", fact: "Exportator Net de Energie", detail: "Din 2019, America produce mai multă energie decât consumă, pentru prima dată din 1952." },
    ];
  }
  return [
    { id: "shale", fact: "The Shale Revolution", detail: "Hydraulic fracturing and horizontal drilling unlocked the Permian, Bakken, and Marcellus, doubling U.S. oil output in a decade." },
    { id: "lng", fact: "#1 LNG Exporter", detail: "In under ten years the U.S. went from gas importer to the world's largest exporter of liquefied natural gas." },
    { id: "independence", fact: "Net Energy Exporter", detail: "Since 2019 America has produced more energy than it consumes for the first time since 1952." },
  ];
}

export function getAgricultureFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "cornbelt", fact: "Centura Porumbului", detail: "Solurile glaciare adânci din Iowa, Illinois și Nebraska formează cea mai productivă regiune de cereale de pe planetă." },
      { id: "farmland", fact: "880 de Milioane de Acri", detail: "Aproape 40% din tot terenul SUA este fermă și ranch — circa două milioane de ferme active." },
      { id: "exports", fact: "Peste 170 mld. $ Exporturi", detail: "America este unul dintre cei mai mari exportatori de alimente din istorie, hrănind sute de milioane de oameni peste hotare." },
    ];
  }
  return [
    { id: "cornbelt", fact: "The Corn Belt", detail: "The deep glacial soils of Iowa, Illinois, and Nebraska form the most productive grain region on the planet." },
    { id: "farmland", fact: "880 Million Acres", detail: "Nearly 40% of all U.S. land is farm and ranch — about two million working farms." },
    { id: "exports", fact: "$170B+ in Exports", detail: "America is one of the largest food exporters in history, feeding hundreds of millions abroad." },
  ];
}

export function getMineralsFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "coal", fact: "Cele Mai Mari Rezerve de Cărbune", detail: "SUA deține aproximativ un sfert din cărbunele recuperabil al lumii — mai mult decât orice altă națiune." },
      { id: "copper", fact: "Bingham Canyon", detail: "Mina de cupru din Utah, adâncă de o milă, este una dintre cele mai mari excavații deschise făcute vreodată de om." },
      { id: "critical", fact: "Pământuri Rare și Litiu", detail: "Mountain Pass și Thacker Pass din Nevada readuc în țară mineralele critice ale erei bateriilor." },
    ];
  }
  return [
    { id: "coal", fact: "Largest Coal Reserves", detail: "The U.S. holds roughly a quarter of the world's recoverable coal — more than any other nation." },
    { id: "copper", fact: "Bingham Canyon", detail: "Utah's mile-deep copper pit is one of the largest open excavations ever made by humankind." },
    { id: "critical", fact: "Rare Earths & Lithium", detail: "Mountain Pass and Nevada's Thacker Pass are reshoring the critical minerals of the battery age." },
  ];
}

export function getWaterFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "greatlakes", fact: "21% din Apa Dulce", detail: "Cele cinci Mari Lacuri dețin o cincime din toată apa dulce de suprafață de pe Pământ." },
      { id: "mississippi", fact: "Bazinul Mississippi", detail: "Drenează 41% din cele 48 de state continentale și se numără printre cele mai mari sisteme fluviale de pe planetă." },
      { id: "ogallala", fact: "Acviferul Ogallala", detail: "Unul dintre marile rezervoare subterane ale lumii, irigând o mare parte din coșul de pâine al Marilor Câmpii." },
      { id: "hydropower", fact: "Energie Hidroelectrică", detail: "Mii de baraje fac din apa căzătoare cea mai mare sursă de electricitate regenerabilă a națiunii." },
    ];
  }
  return [
    { id: "greatlakes", fact: "21% of Fresh Water", detail: "The five Great Lakes hold a fifth of all the surface fresh water on Earth." },
    { id: "mississippi", fact: "The Mississippi Basin", detail: "Drains 41% of the lower 48 states and ranks among the largest river systems on the planet." },
    { id: "ogallala", fact: "The Ogallala Aquifer", detail: "One of the world's great underground reservoirs, irrigating much of the High Plains breadbasket." },
    { id: "hydropower", fact: "Hydroelectric Power", detail: "Thousands of dams make falling water the nation's largest source of renewable electricity." },
  ];
}

// ── Quotes ───────────────────────────────────────────────────────────────────────

export function getResourcesQuotes(locale: Locale): ResourceQuote[] {
  if (locale === "ro") {
    return [
      {
        quote: "Să dezvoltăm resursele pământului nostru, să-i chemăm puterile, să-i clădim instituțiile și să promovăm toate marile sale interese.",
        attribution: "Daniel Webster",
        title: "Om de stat, 1825",
      },
      {
        quote: "Conservarea resurselor naturale este problema fundamentală. Dacă nu o rezolvăm pe aceasta, prea puțin ne va folosi să le rezolvăm pe toate celelalte.",
        attribution: "Theodore Roosevelt",
        title: "Al 26-lea Președinte, 1907",
      },
    ];
  }
  return [
    {
      quote: "Let us develop the resources of our land, call forth its powers, build up its institutions, promote all its great interests.",
      attribution: "Daniel Webster",
      title: "Statesman, 1825",
    },
    {
      quote: "The conservation of natural resources is the fundamental problem. Unless we solve that problem it will avail us little to solve all others.",
      attribution: "Theodore Roosevelt",
      title: "26th President, 1907",
    },
  ];
}
