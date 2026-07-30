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
      "America este, încă o dată, cea mai importantă putere energetică a lumii. Deblocată de revoluția șisturilor și de forajul orizontal, producția de țiței a SUA a depășit orice rival: mai mult decât Arabia Saudită, mai mult decât Rusia: atingând aproximativ 13 milioane de barili pe zi. Țara extrage mai mult gaz natural decât oricare alta și, în doar un deceniu, a trecut de la importator la cel mai mare exportator de gaz natural lichefiat de pe planetă.",
      "Aceasta este independența energetică pe care generații de președinți doar au promis-o. Alimentează industria americană, încălzește casele americane și: expediată drept GNL din terminalele de pe Coasta Golfului: încălzește acum Europa și Asia, transformând o vulnerabilitate strategică într-o armă strategică.",
      "Această dominație este ancorată în geologie: numai Bazinul Permian din Texas și New Mexico extrage mai mult petrol decât majoritatea națiunilor OPEC, în timp ce șistul Marcellus face din Appalachia o superputere a gazelor. Susținută de Rezerva Strategică de Petrol: cel mai mare stoc de urgență din lume: energia americană nu este doar abundentă, ci și sigură.",
    ];
  }
  return [
    "America is, once again, the world's foremost energy power. Unlocked by the shale revolution and horizontal drilling, U.S. crude output has surged past every rival: more than Saudi Arabia, more than Russia: to roughly 13 million barrels a day. The country pumps more natural gas than any other on Earth and, in barely a decade, has gone from importer to the largest exporter of liquefied natural gas on the planet.",
    "This is the energy independence that generations of presidents only promised. It powers American industry, heats American homes, and: shipped as LNG from Gulf Coast terminals: now warms Europe and Asia, turning a strategic vulnerability into a strategic weapon.",
    "That dominance is anchored in geology: the Permian Basin of Texas and New Mexico alone pumps more oil than most OPEC nations, while the Marcellus shale makes Appalachia a gas superpower. Backed by the Strategic Petroleum Reserve: the world's largest emergency stockpile: American energy is not just abundant but secure.",
  ];
}

export function getAgricultureParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "De-a lungul vastelor câmpii interioare se află cel mai productiv teren agricol de pe Pământ. Aproximativ 880 de milioane de acri: aproape 40% din suprafața națiunii: sunt dedicați fermelor și ranch-urilor, ancorați de solurile adânci, negre și glaciare ale Centurii Porumbului. Statele Unite sunt cel mai mare producător mondial de porumb și un producător de top de soia, carne de vită și lactate.",
      "Agricultura americană hrănește cu mult mai mult decât pe americani. Peste 170 de miliarde de dolari în bunuri agricole sunt exportate în fiecare an, făcând din SUA unul dintre cei mai mari exportatori de alimente din istorie: un singur comitat din Iowa poate depăși producția unor națiuni întregi. Mecanizarea, biotehnologia și irigarea au transformat inima țării în coșul de pâine al lumii.",
      "Aceasta nu este doar o întâmplare a solului. Fermierii americani îmbină cel mai bogat pământ din lume cu cea mai avansată agricultură: combine ghidate prin GPS, semințe biotehnologice și irigare vastă: astfel încât mai puțin de 2% dintre americani hrănesc națiunea și o mare parte din restul lumii.",
    ];
  }
  return [
    "Across the vast interior lowlands lies the most productive farmland on Earth. Some 880 million acres: nearly 40% of the nation's land: are given over to farms and ranches, anchored by the Corn Belt's deep, black, glacial soils. The United States is the world's leading producer of corn and a top producer of soybeans, beef, and dairy.",
    "American agriculture feeds far more than Americans. Over $170 billion in farm goods are exported each year, making the U.S. one of the largest food exporters in history: a single Iowa county can out-produce entire nations. Mechanization, biotechnology, and irrigation have turned the heartland into the breadbasket of the world.",
    "This is no accident of soil alone. American farmers pair the world's richest ground with the world's most advanced agriculture: GPS-guided combines, biotech seed, and vast irrigation: so that fewer than 2% of Americans feed the nation and much of the world besides.",
  ];
}

export function getIrrigationParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "Brevetat pentru prima dată în 1948 de fermierul din Nebraska, Frank Zybach, sistemul de irigare cu pivot central a transformat aridele Mari Câmpii americane într-o zonă agricolă de o productivitate uriașă. Conectate la vastul acvifer Ogallala, aceste sisteme rotative de aspersoare autopropulsate distribuie apa cu o precizie extremă, economisind resursele hidrice în timp ce maximizează producția.",
      "De sus, această inginerie creează o rețea geometrică spectaculoasă de cercuri verzi pe peisaj: fiecare cerc având de obicei o suprafață standard de 160 de acri (un sfert de secțiune). Astăzi, sistemele cu pivot central irigă zeci de milioane de acri în state precum Kansas, Nebraska și Texas, transformând inima continentului într-un motor de securitate alimentară globală."
    ];
  }
  return [
    "First patented in 1948 by Nebraska farmer Frank Zybach, center-pivot irrigation transformed the arid American Great Plains into a highly productive agricultural powerhouse. By tapping into the vast Ogallala Aquifer, these self-propelled rotating sprinkler systems distribute water with extreme precision, conserving resources while maximizing crop yields.",
    "From above, this engineering creates a striking geometric grid of green circles across the landscape: each circle typically covering a standard 160-acre quarter-section. Today, center-pivot systems irrigate tens of millions of acres in states like Kansas, Nebraska, and Texas, turning the heart of the continent into an engine of global food security."
  ];
}


export function getMineralsParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "Sub sol se află o a doua avere. Statele Unite dețin cele mai mari rezerve recuperabile de cărbune din orice țară: aproximativ un sfert din totalul mondial: alături de zăcăminte de clasă mondială de cupru, aur și metalele de bază ale industriei. Mina terasată Bingham Canyon din Utah, adâncă de o milă, este printre cele mai mari excavații umane de pe Pământ.",
      "Acum se desfășoară o nouă goană după minerale. Mountain Pass, în California, este principala mină de pământuri rare din Emisfera Vestică, iar Thacker Pass, în Nevada, deține unul dintre cele mai mari zăcăminte de litiu cunoscute din lume: metalele bateriilor, magneților și ale tehnologiilor care vor defini secolul ce vine.",
      "De la aurul din Carlin Trend, Nevada, la cuprul din Arizona și potasiul din Câmpii, scoarța americană furnizează materiile prime ale industriei. Provocarea secolului nu este dacă mineralele există, ci readucerea în țară a minelor și rafinăriilor pentru a transforma această geologie în independență.",
    ];
  }
  return [
    "Beneath the soil lies a second fortune. The United States holds the largest recoverable coal reserves of any country: roughly a quarter of the world's total: alongside world-class deposits of copper, gold, and the building-block metals of industry. The terraced, mile-deep Bingham Canyon Mine in Utah is among the largest human excavations on Earth.",
    "Now a new mineral rush is underway. Mountain Pass in California is the Western Hemisphere's premier rare-earth mine, and Nevada's Thacker Pass holds one of the largest known lithium deposits in the world: the metals of batteries, magnets, and the technologies that will define the coming century.",
    "From the gold of Nevada's Carlin Trend to the copper of Arizona and the potash of the Plains, the American crust supplies the raw materials of industry. The challenge of the century is not whether the minerals exist, but reshoring the mines and refineries to turn that geology into independence.",
  ];
}

export function getWaterParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "Apa este poate cea mai rară dintre resursele Americii: iar țara este extraordinar de bogată în ea. Numai Marile Lacuri dețin aproximativ 21% din apa dulce de suprafață a lumii; sistemul Mississippi–Missouri drenează 41% din Statele Unite continentale și se numără printre cele mai mari bazine fluviale de pe Pământ; iar vastul Acvifer Ogallala irigă o mare parte din Marile Câmpii.",
      "Această apă înseamnă și putere. Mii de baraje: de la monumentul ingineresc al Barajului Hoover la sistemele Columbia și Tennessee: transformă apa căzătoare în cea mai mare sursă de electricitate regenerabilă a națiunii, în timp ce ecluzele și canalele transportă spre mare grâul, cărbunele și mărfurile unui întreg continent.",
      "Iar apa pune în mișcare bogăția națiunii. Mississippi și afluenții săi formează cea mai aglomerată cale navigabilă interioară de pe Pământ, transportând barje de cereale, cărbune și oțel din inima țării către Golf: o autostradă lichidă de peste 19.000 de km pe care niciun rival nu o poate egala.",
    ];
  }
  return [
    "Water may be the rarest of America's resources: and the country is extraordinarily rich in it. The Great Lakes alone hold about 21% of the world's surface fresh water; the Mississippi–Missouri system drains 41% of the contiguous United States and ranks among the largest river basins on Earth; and the vast Ogallala Aquifer irrigates much of the High Plains.",
    "That water is also power. Thousands of dams: from the engineering monument of Hoover Dam to the Columbia and Tennessee systems: turn falling water into the nation's largest source of renewable electricity, while locks and channels carry a continent's worth of grain, coal, and goods to the sea.",
    "And the water moves the nation's wealth. The Mississippi and its tributaries form the busiest inland waterway on Earth, carrying barges of grain, coal, and steel from the heartland to the Gulf: a 12,000-mile liquid highway no rival can match.",
  ];
}

// ── Facts ────────────────────────────────────────────────────────────────────────

export function getEnergyFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "shale", fact: "Revoluția Șisturilor", detail: "Fracturarea hidraulică și forajul orizontal au deblocat Permian, Bakken și Marcellus, dublând producția de petrol a SUA într-un deceniu." },
      { id: "lng", fact: "#1 la Export de GNL", detail: "În mai puțin de zece ani, SUA a trecut de la importator de gaz la cel mai mare exportator de gaz natural lichefiat din lume." },
      { id: "independence", fact: "Exportator Net de Energie", detail: "Din 2019, America produce mai multă energie decât consumă, pentru prima dată din 1952." },
      { id: "spr", fact: "Rezerva Strategică de Petrol", detail: "Cel mai mare stoc de urgență de țiței din lume garantează securitatea energetică americană." },
    ];
  }
  return [
    { id: "shale", fact: "The Shale Revolution", detail: "Hydraulic fracturing and horizontal drilling unlocked the Permian, Bakken, and Marcellus, doubling U.S. oil output in a decade." },
    { id: "lng", fact: "#1 LNG Exporter", detail: "In under ten years the U.S. went from gas importer to the world's largest exporter of liquefied natural gas." },
    { id: "independence", fact: "Net Energy Exporter", detail: "Since 2019 America has produced more energy than it consumes for the first time since 1952." },
    { id: "spr", fact: "Strategic Petroleum Reserve", detail: "The world's largest emergency crude stockpile underwrites American energy security." },
  ];
}

export function getAgricultureFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "cornbelt", fact: "Centura Porumbului", detail: "Solurile glaciare adânci din Iowa, Illinois și Nebraska formează cea mai productivă regiune de cereale de pe planetă." },
      { id: "farmland", fact: "880 de Milioane de Acri", detail: "Aproape 40% din tot terenul SUA este fermă și ranch: circa două milioane de ferme active." },
      { id: "exports", fact: "Peste 170 mld. $ Exporturi", detail: "America este unul dintre cei mai mari exportatori de alimente din istorie, hrănind sute de milioane de oameni peste hotare." },
      { id: "beef", fact: "#1 la Carne de Vită", detail: "America produce mai multă carne de vită decât orice națiune: circa 12 milioane de tone pe an." },
    ];
  }
  return [
    { id: "cornbelt", fact: "The Corn Belt", detail: "The deep glacial soils of Iowa, Illinois, and Nebraska form the most productive grain region on the planet." },
    { id: "farmland", fact: "880 Million Acres", detail: "Nearly 40% of all U.S. land is farm and ranch: about two million working farms." },
    { id: "exports", fact: "$170B+ in Exports", detail: "America is one of the largest food exporters in history, feeding hundreds of millions abroad." },
    { id: "beef", fact: "#1 Beef Producer", detail: "America raises more beef than any nation on Earth: about 12 million tonnes a year." },
  ];
}

export function getMineralsFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "coal", fact: "Cele Mai Mari Rezerve de Cărbune", detail: "SUA deține aproximativ un sfert din cărbunele recuperabil al lumii: mai mult decât orice altă națiune." },
      { id: "copper", fact: "Bingham Canyon", detail: "Mina de cupru din Utah, adâncă de o milă, este una dintre cele mai mari excavații deschise făcute vreodată de om." },
      { id: "critical", fact: "Pământuri Rare și Litiu", detail: "Mountain Pass și Thacker Pass din Nevada readuc în țară mineralele critice ale erei bateriilor." },
    ];
  }
  return [
    { id: "coal", fact: "Largest Coal Reserves", detail: "The U.S. holds roughly a quarter of the world's recoverable coal: more than any other nation." },
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
        quote: "Agricultura este cea mai înțeleaptă îndeletnicire a noastră, fiindcă va contribui în cele din urmă cel mai mult la bogăția reală, la bunele moravuri și la fericire.",
        attribution: "Thomas Jefferson",
        title: "Al 3-lea Președinte, 1787",
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
      quote: "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness.",
      attribution: "Thomas Jefferson",
      title: "3rd President, 1787",
    },
    {
      quote: "The conservation of natural resources is the fundamental problem. Unless we solve that problem it will avail us little to solve all others.",
      attribution: "Theodore Roosevelt",
      title: "26th President, 1907",
    },
  ];
}

// ─── EXPANSION ───────────────────────────────────────────────────────────────
// Additional charts, detail grids, milestones, and two new pillars (Renewables &
// Nuclear, Forests & Public Lands) that deepen the page.

export interface ResourceItem {
  name: string;
  stat: string;
  note: string;
}

export interface ResourceMilestone {
  year: string;
  title: string;
  detail: string;
}

// ── Additional comparison charts (US #1 in each) ────────────────────────────────

export const LNG_EXPORTS: GdpDataPoint[] = [
  { country: "United States", gdp: 89, flag: "🇺🇸", highlight: true },
  { country: "Australia", gdp: 80, flag: "🇦🇺" },
  { country: "Qatar", gdp: 78, flag: "🇶🇦" },
  { country: "Russia", gdp: 33, flag: "🇷🇺" },
  { country: "Malaysia", gdp: 27, flag: "🇲🇾" },
];

export const NUCLEAR_GENERATION: GdpDataPoint[] = [
  { country: "United States", gdp: 780, flag: "🇺🇸", highlight: true },
  { country: "China", gdp: 435, flag: "🇨🇳" },
  { country: "France", gdp: 320, flag: "🇫🇷" },
  { country: "Russia", gdp: 210, flag: "🇷🇺" },
  { country: "South Korea", gdp: 170, flag: "🇰🇷" },
];

export const BEEF_PRODUCTION: GdpDataPoint[] = [
  { country: "United States", gdp: 12.3, flag: "🇺🇸", highlight: true },
  { country: "Brazil", gdp: 10.3, flag: "🇧🇷" },
  { country: "China", gdp: 7.5, flag: "🇨🇳" },
  { country: "European Union", gdp: 6.7, flag: "🇪🇺" },
  { country: "India", gdp: 4.3, flag: "🇮🇳" },
];

// ── Detail grids ────────────────────────────────────────────────────────────────

export function getEnergyBasins(locale: Locale): ResourceItem[] {
  const isRo = locale === "ro";
  return [
    { name: "Permian Basin", stat: "~6.3M bbl/d", note: isRo ? "Texas & New Mexico: cel mai prolific câmp petrolier al Americii" : "Texas & New Mexico: America's most prolific oil field" },
    { name: "Marcellus & Utica", stat: isRo ? "~36 mld. m³/an" : "~36 Bcf/day", note: isRo ? "Appalachia: cel mai mare zăcământ de gaz din SUA" : "Appalachia: the largest gas field in the U.S." },
    { name: "Bakken", stat: "~1.2M bbl/d", note: isRo ? "Dakota de Nord: pionierul revoluției șisturilor" : "North Dakota: pioneer of the shale revolution" },
    { name: "Eagle Ford", stat: "~1.1M bbl/d", note: isRo ? "Sudul Texasului: petrol și gaze ușoare" : "South Texas: light oil and gas" },
    { name: isRo ? "Golful Mexic" : "Gulf of Mexico", stat: "~1.8M bbl/d", note: isRo ? "Forajul offshore de mare adâncime" : "Deepwater offshore drilling" },
    { name: "Powder River", stat: isRo ? "~40% din cărbunele SUA" : "~40% of U.S. coal", note: isRo ? "Wyoming: inima cărbunelui american" : "Wyoming: the heart of American coal" },
  ];
}

export function getTopCommodities(locale: Locale): ResourceItem[] {
  const isRo = locale === "ro";
  return [
    { name: isRo ? "Porumb" : "Corn", stat: "#1", note: isRo ? "~390 mil. tone: cel mai mare din lume" : "~390M tonnes: largest on Earth" },
    { name: isRo ? "Soia" : "Soybeans", stat: "#2", note: isRo ? "~113 mil. tone: alături de Brazilia" : "~113M tonnes: neck-and-neck with Brazil" },
    { name: isRo ? "Carne de vită" : "Beef", stat: "#1", note: isRo ? "~12 mil. tone: cel mai mare producător" : "~12M tonnes: the world's top producer" },
    { name: isRo ? "Lactate" : "Dairy", stat: "~103B lb", note: isRo ? "Lapte: printre cei mai mari producători" : "Milk: among the largest producers" },
    { name: isRo ? "Pasăre" : "Poultry", stat: "#1", note: isRo ? "Cel mai mare producător de carne de pui" : "The largest chicken-meat producer" },
    { name: isRo ? "Grâu" : "Wheat", stat: "~45M t", note: isRo ? "Un exportator major către lume" : "A major exporter to the world" },
  ];
}

export function getStrategicMinerals(locale: Locale): ResourceItem[] {
  const isRo = locale === "ro";
  return [
    { name: isRo ? "Cărbune" : "Coal", stat: "#1", note: isRo ? "Cele mai mari rezerve recuperabile din lume" : "Largest recoverable reserves on Earth" },
    { name: isRo ? "Cupru" : "Copper", stat: "Top 5", note: isRo ? "Bingham Canyon și Morenci, Arizona" : "Bingham Canyon and Morenci, Arizona" },
    { name: isRo ? "Aur" : "Gold", stat: "Top 5", note: isRo ? "Nevada: Carlin Trend" : "Nevada: the Carlin Trend" },
    { name: isRo ? "Litiu" : "Lithium", stat: isRo ? "În creștere" : "Surging", note: isRo ? "Thacker Pass, Nevada: un zăcământ uriaș" : "Thacker Pass, Nevada: a vast deposit" },
    { name: isRo ? "Pământuri rare" : "Rare Earths", stat: "Mountain Pass", note: isRo ? "Singura mină majoră din emisfera vestică" : "The Western Hemisphere's only major mine" },
    { name: isRo ? "Potasiu & Fosfat" : "Potash & Phosphate", stat: isRo ? "Cheie" : "Key", note: isRo ? "Mineralele îngrășămintelor agriculturii" : "The fertiliser minerals of agriculture" },
  ];
}

export function getWaterSystems(locale: Locale): ResourceItem[] {
  const isRo = locale === "ro";
  return [
    { name: isRo ? "Marile Lacuri" : "Great Lakes", stat: "21%", note: isRo ? "din apa dulce de suprafață a lumii" : "of the world's surface fresh water" },
    { name: "Mississippi–Missouri", stat: isRo ? "~6.275 km" : "~3,900 mi", note: isRo ? "Drenează 41% din SUA continentală" : "Drains 41% of the contiguous U.S." },
    { name: isRo ? "Râul Colorado" : "Colorado River", stat: isRo ? "40M oameni" : "40M people", note: isRo ? "Alimentează Sud-Vestul prin Barajul Hoover" : "Powers the Southwest via Hoover Dam" },
    { name: isRo ? "Râul Columbia" : "Columbia River", stat: isRo ? "Hidro #1" : "#1 Hydro", note: isRo ? "Cel mai mare producător hidroelectric din SUA" : "The largest hydroelectric producer in the U.S." },
    { name: isRo ? "Acviferul Ogallala" : "Ogallala Aquifer", stat: isRo ? "8 state" : "8 states", note: isRo ? "Irigă inima Marilor Câmpii" : "Irrigates the High Plains heartland" },
  ];
}

export function getMilestones(locale: Locale): ResourceMilestone[] {
  if (locale === "ro") {
    return [
      { year: "1859", title: "Sonda Drake", detail: "Prima sondă petrolieră comercială din lume, în Pennsylvania, declanșează era petrolului." },
      { year: "1901", title: "Spindletop", detail: "Erupția din Texas inaugurează industria petrolieră modernă americană." },
      { year: "1936", title: "Barajul Hoover", detail: "Una dintre cele mai mari lucrări inginerești ale omenirii îmblânzește râul Colorado." },
      { year: "1957", title: "Energie Nucleară", detail: "Shippingport: primul reactor nuclear comercial de scară completă din SUA." },
      { year: "1977", title: "Rezerva Strategică", detail: "Se înființează Rezerva Strategică de Petrol după șocul embargoului din 1973." },
      { year: "2008", title: "Revoluția Șisturilor", detail: "Fracturarea hidraulică deblochează Bakken și Permian, transformând producția." },
      { year: "2019", title: "Exportator Net", detail: "Pentru prima dată din 1952, America produce mai multă energie decât consumă." },
      { year: "2023", title: "#1 la GNL", detail: "Statele Unite devin cel mai mare exportator de gaz natural lichefiat din lume." },
    ];
  }
  return [
    { year: "1859", title: "The Drake Well", detail: "The world's first commercial oil well, in Pennsylvania, ignites the age of oil." },
    { year: "1901", title: "Spindletop", detail: "The Texas gusher inaugurates the modern American petroleum industry." },
    { year: "1936", title: "Hoover Dam", detail: "One of humankind's greatest engineering feats tames the Colorado River." },
    { year: "1957", title: "Nuclear Power", detail: "Shippingport: the first full-scale commercial nuclear reactor in the U.S." },
    { year: "1977", title: "Strategic Reserve", detail: "The Strategic Petroleum Reserve is created after the 1973 embargo shock." },
    { year: "2008", title: "The Shale Revolution", detail: "Hydraulic fracturing unlocks the Bakken and Permian, transforming production." },
    { year: "2019", title: "Net Energy Exporter", detail: "For the first time since 1952, America produces more energy than it consumes." },
    { year: "2023", title: "#1 in LNG", detail: "The United States becomes the world's largest exporter of liquefied natural gas." },
  ];
}

// ── New pillar: Renewables & Nuclear ────────────────────────────────────────────

export function getRenewablesParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "Puterea energetică a Americii nu se oprește la petrol și gaze. Statele Unite operează cea mai mare flotă de reactoare nucleare din lume: aproape 100 de reactoare care generează mai multă electricitate fără carbon decât orice altă națiune: alături de cel mai mare sistem hidroelectric al continentului.",
      "Și o nouă revoluție este în plină desfășurare. Capacitatea solară și eoliană a SUA a explodat, de la ferme eoliene care se întind peste Marile Câmpii la centrale solare imense, precum turnurile din deșertul Mojave. Strategia americană este „toate cele de mai sus”: petrol, gaze, nucleară, hidro, eoliană și solară: cea mai diversificată bază energetică de pe Pământ.",
    ];
  }
  return [
    "America's energy power does not stop at oil and gas. The United States operates the largest fleet of nuclear reactors in the world: nearly 100 reactors generating more carbon-free electricity than any other nation: alongside the continent's largest hydroelectric system.",
    "And a new revolution is well underway. U.S. solar and wind capacity has exploded, from wind farms sweeping across the Great Plains to vast solar stations like the towers in the Mojave Desert. The American strategy is all-of-the-above: oil, gas, nuclear, hydro, wind, and solar: the most diversified energy base on Earth.",
  ];
}

export function getRenewablesFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "nuclear", fact: "#1 la Energie Nucleară", detail: "Cea mai mare flotă de reactoare din lume produce circa 780 TWh de electricitate fără carbon pe an." },
      { id: "hydro", fact: "Hidroenergia", detail: "Mii de baraje fac din apă cea mai mare sursă de electricitate regenerabilă a națiunii." },
      { id: "solarwind", fact: "Boom-ul Solar și Eolian", detail: "Capacitatea solară și eoliană a SUA a crescut de zeci de ori într-un singur deceniu." },
      { id: "allofabove", fact: "„Toate cele de mai sus”", detail: "Nicio altă națiune nu îmbină la această scară petrolul, gazele, nucleara, hidro, eoliana și solara." },
    ];
  }
  return [
    { id: "nuclear", fact: "#1 in Nuclear Power", detail: "The world's largest reactor fleet produces around 780 TWh of carbon-free electricity a year." },
    { id: "hydro", fact: "Hydroelectric Power", detail: "Thousands of dams make water the nation's largest source of renewable electricity." },
    { id: "solarwind", fact: "The Solar & Wind Boom", detail: "U.S. solar and wind capacity has grown many times over in a single decade." },
    { id: "allofabove", fact: "All of the Above", detail: "No other nation combines oil, gas, nuclear, hydro, wind, and solar at this scale." },
  ];
}

// ── New pillar: Forests & Public Lands ──────────────────────────────────────────

export function getForestsParagraphs(locale: Locale): string[] {
  if (locale === "ro") {
    return [
      "O treime din America este pădure. Aproximativ 820 de milioane de acri de pădure acoperă națiunea: de la pădurile tropicale temperate ale Pacificului de Nord-Vest și sequoia uriași din California, la pădurile de foioase aprinse de toamnă din Appalachia. Tongass din Alaska este cea mai mare pădure națională, un colos temperat.",
      "O mare parte din această bogăție este deținută în comun. Guvernul federal administrează circa 640 de milioane de acri: aproape 28% din suprafața națiunii: incluzând 193 de milioane de acri de păduri naționale și sistemul de parcuri naționale. Este cel mai mare patrimoniu de teren public din lumea dezvoltată: cherestea, pășuni, agrement și sălbăticie, deținute de popor.",
    ];
  }
  return [
    "A third of America is forest. Some 820 million acres of woodland blanket the nation: from the temperate rainforests of the Pacific Northwest and the giant sequoias of California to the autumn-blazing hardwoods of Appalachia. Alaska's Tongass is the largest national forest, a temperate colossus.",
    "Much of this wealth is held in common. The federal government manages roughly 640 million acres: nearly 28% of the nation's land: including 193 million acres of national forest and the national park system. It is the largest public-land estate in the developed world: timber, range, recreation, and wilderness, owned by the people.",
  ];
}

export function getForestsFacts(locale: Locale): ResourceFact[] {
  if (locale === "ro") {
    return [
      { id: "forestcover", fact: "820M Acri de Pădure", detail: "Pădurea acoperă aproape o treime din suprafața Statelor Unite." },
      { id: "federal", fact: "640M Acri Federali", detail: "Aproape 28% din America este teren public, deținut în comun de națiune." },
      { id: "nationalforests", fact: "193M Acri de Păduri Naționale", detail: "Sistemul de Păduri Naționale gestionează cheresteaua, apa și sălbăticia." },
    ];
  }
  return [
    { id: "forestcover", fact: "820M Acres of Forest", detail: "Woodland covers nearly a third of the United States' land area." },
    { id: "federal", fact: "640M Federal Acres", detail: "Almost 28% of America is public land, held in common by the nation." },
    { id: "nationalforests", fact: "193M Acres of National Forest", detail: "The National Forest System stewards timber, water, and wilderness." },
  ];
}
