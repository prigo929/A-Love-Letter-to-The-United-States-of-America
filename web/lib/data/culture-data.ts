// ─────────────────────────────────────────────────────────────────────────────
// culture-data.ts — Centralized data for the /culture landing page
// "America didn't just build a nation. It built the operating system for
//  modern civilization — through free markets, private enterprise, and
//  democratic access."
// ─────────────────────────────────────────────────────────────────────────────

import type { Locale } from "@/lib/i18n/config";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CultureStat {
  value: string;
  label: string;
}

export interface CulturePillar {
  emoji: string;
  domain: string;
  stat: string;
  statLabel: string;
}

export interface CultureSubpage {
  id: string;
  category: string;
  title: string;
  stat: string;
  statLabel: string;
  imageKey: string;
  href: string;
  /** "large" | "medium" | "small" — controls bento sizing */
  size: "large" | "medium" | "small";
}

export interface CultureArgument {
  title: string;
  body: string;
}

export interface CultureQuote {
  text: string;
  author: string;
  role: string;
}

export interface CultureRadarPoint {
  domain: string;
  USA: number;
  UK: number;
  France: number;
  Japan: number;
}

// ─── Stats Strip (§2) ────────────────────────────────────────────────────────

const CULTURE_STATS_EN: CultureStat[] = [
  { value: "$900B+", label: "Annual Cultural Export Revenue" },
  { value: "1.9B", label: "Daily Coca-Cola Servings Globally" },
  { value: "260M+", label: "Netflix Subscribers in 190 Countries" },
  { value: "1.5B", label: "English Speakers Worldwide" },
  { value: "8 of 10", label: "Most Valuable Sports Franchises" },
];

const CULTURE_STATS_RO: CultureStat[] = [
  { value: "$900Mld+", label: "Venituri Anuale din Export Cultural" },
  { value: "1,9Mld", label: "Porții Zilnice Coca-Cola Global" },
  { value: "260M+", label: "Abonați Netflix în 190 de Țări" },
  { value: "1,5Mld", label: "Vorbitori de Engleză în Lume" },
  { value: "8 din 10", label: "Cele Mai Valoroase Francize Sportive" },
];

export function getCultureStats(locale: Locale): CultureStat[] {
  return locale === "ro" ? CULTURE_STATS_RO : CULTURE_STATS_EN;
}

// ─── Thesis Block (§3) ───────────────────────────────────────────────────────

export interface CultureThesis {
  pullQuote: string;
  attribution: string;
  paragraphs: string[];
}

const THESIS_EN: CultureThesis = {
  pullQuote:
    "The genius of America is that it turned culture into a market — and then gave that market to the world.",
  attribution: "Editorial Voice",
  paragraphs: [
    "Hollywood, Nike, McDonald's, Jazz, and the iPhone weren't planned by a ministry of culture. They were competed into existence by private actors in open markets — studios bidding for audiences, brands racing for shelf space, musicians chasing the crowd. The entire cultural arsenal of the United States is a byproduct of capitalism, not a policy outcome.",
    "This is what makes American soft power structurally different from every other nation's. France has a Ministry of Culture. China has a propaganda department. America has a consumer market of 330 million people whose preferences, broadcast at planetary scale through English and the internet, set the default template for how the world eats, dresses, watches, listens, and dreams.",
  ],
};

const THESIS_RO: CultureThesis = {
  pullQuote:
    "Geniul Americii este că a transformat cultura într-o piață — și apoi a dat acea piață întregii lumi.",
  attribution: "Voce Editorială",
  paragraphs: [
    "Hollywood, Nike, McDonald's, Jazz-ul și iPhone-ul nu au fost planificate de un minister al culturii. Au fost create prin competiție de actori privați pe piețe deschise — studiouri care licitau pentru audiențe, branduri care se întreceau pentru rafturile magazinelor, muzicieni care urmăreau publicul. Întregul arsenal cultural al Statelor Unite este un produs secundar al capitalismului, nu un rezultat de politică publică.",
    "Asta face puterea soft americană structural diferită de cea a oricărei alte națiuni. Franța are un Minister al Culturii. China are un departament de propagandă. America are o piață de consumatori de 330 de milioane de oameni ale căror preferințe, difuzate la scară planetară prin engleză și internet, stabilesc șablonul implicit pentru cum mănâncă, se îmbracă, privește, ascultă și visează lumea.",
  ],
};

export function getCultureThesis(locale: Locale): CultureThesis {
  return locale === "ro" ? THESIS_RO : THESIS_EN;
}

// ─── Soft Power Pillars (§4) ─────────────────────────────────────────────────

const PILLARS_EN: CulturePillar[] = [
  { emoji: "🎬", domain: "Film & TV", stat: "$120B", statLabel: "Global box office + streaming" },
  { emoji: "🏈", domain: "Sports", stat: "$83B", statLabel: "U.S. sports industry" },
  { emoji: "🍔", domain: "Food & Drinks", stat: "40,000+", statLabel: "McDonald's locations worldwide" },
  { emoji: "🎵", domain: "Music", stat: "70%", statLabel: "Global streaming is English-language" },
  { emoji: "👟", domain: "Fashion", stat: "$51B", statLabel: "Nike annual revenue" },
  { emoji: "🗣", domain: "English", stat: "1.5B", statLabel: "Speakers worldwide" },
  { emoji: "🏢", domain: "Brands", stat: "7 of 10", statLabel: "Top global brands are American" },
  { emoji: "🎭", domain: "Entertainment", stat: "$260B", statLabel: "Media & entertainment market" },
];

const PILLARS_RO: CulturePillar[] = [
  { emoji: "🎬", domain: "Film & TV", stat: "$120Mld", statLabel: "Box office global + streaming" },
  { emoji: "🏈", domain: "Sport", stat: "$83Mld", statLabel: "Industria sportivă americană" },
  { emoji: "🍔", domain: "Mâncare", stat: "40.000+", statLabel: "Locații McDonald's mondial" },
  { emoji: "🎵", domain: "Muzică", stat: "70%", statLabel: "Streaming-ul global e în engleză" },
  { emoji: "👟", domain: "Modă", stat: "$51Mld", statLabel: "Venituri anuale Nike" },
  { emoji: "🗣", domain: "Engleză", stat: "1,5Mld", statLabel: "Vorbitori în lume" },
  { emoji: "🏢", domain: "Branduri", stat: "7 din 10", statLabel: "Top branduri globale sunt americane" },
  { emoji: "🎭", domain: "Divertisment", stat: "$260Mld", statLabel: "Piața media & divertisment" },
];

export function getCulturePillars(locale: Locale): CulturePillar[] {
  return locale === "ro" ? PILLARS_RO : PILLARS_EN;
}

// ─── Editorial Subpage Grid (§5) ─────────────────────────────────────────────

const SUBPAGES_EN: CultureSubpage[] = [
  {
    id: "overview",
    category: "Soft Power · Overview",
    title: "The Engine of Soft Power",
    stat: "$900B+",
    statLabel: "Cultural exports",
    imageKey: "overview",
    href: "#",
    size: "large",
  },
  {
    id: "film",
    category: "Film · Storytelling",
    title: "The Dream Factory",
    stat: "$120B",
    statLabel: "Global box office",
    imageKey: "film",
    href: "#",
    size: "small",
  },
  {
    id: "sports",
    category: "Sports · Athletics",
    title: "The Stadium Nation",
    stat: "8 / 10",
    statLabel: "Top franchises",
    imageKey: "sports",
    href: "/culture/american-sports",
    size: "small",
  },
  {
    id: "entertainment",
    category: "Entertainment · Media",
    title: "The Attention Machine",
    stat: "260M+",
    statLabel: "Netflix subscribers",
    imageKey: "entertainment",
    href: "#",
    size: "medium",
  },
  {
    id: "brands",
    category: "Companies · Brands",
    title: "The Logo Empire",
    stat: "7 / 10",
    statLabel: "Top global brands",
    imageKey: "brands",
    href: "#",
    size: "medium",
  },
  {
    id: "food",
    category: "Food · Drinks",
    title: "The Franchise Model",
    stat: "1.9B",
    statLabel: "Daily Coke servings",
    imageKey: "food",
    href: "#",
    size: "medium",
  },
  {
    id: "fashion",
    category: "Fashion · Streetwear",
    title: "The Uniform of Rebellion",
    stat: "$51B",
    statLabel: "Nike revenue",
    imageKey: "fashion",
    href: "/culture/american-aesthetics",
    size: "small",
  },
  {
    id: "music",
    category: "Music · Genre Origins",
    title: "The Sound of Export",
    stat: "70%",
    statLabel: "English-language streams",
    imageKey: "music",
    href: "#",
    size: "large",
  },
];

const SUBPAGES_RO: CultureSubpage[] = [
  {
    id: "overview",
    category: "Soft Power · Ansamblu",
    title: "Motorul Puterii Soft",
    stat: "$900Mld+",
    statLabel: "Exporturi culturale",
    imageKey: "overview",
    href: "#",
    size: "large",
  },
  {
    id: "film",
    category: "Film · Povestire",
    title: "Fabrica de Vise",
    stat: "$120Mld",
    statLabel: "Box office global",
    imageKey: "film",
    href: "#",
    size: "small",
  },
  {
    id: "sports",
    category: "Sport · Atletism",
    title: "Națiunea Stadioanelor",
    stat: "8 / 10",
    statLabel: "Top francize",
    imageKey: "sports",
    href: "/culture/american-sports",
    size: "small",
  },
  {
    id: "entertainment",
    category: "Divertisment · Media",
    title: "Mașina de Atenție",
    stat: "260M+",
    statLabel: "Abonați Netflix",
    imageKey: "entertainment",
    href: "#",
    size: "medium",
  },
  {
    id: "brands",
    category: "Companii · Branduri",
    title: "Imperiul Logo-urilor",
    stat: "7 / 10",
    statLabel: "Top branduri globale",
    imageKey: "brands",
    href: "#",
    size: "medium",
  },
  {
    id: "food",
    category: "Mâncare · Băuturi",
    title: "Modelul Francizei",
    stat: "1,9Mld",
    statLabel: "Porții zilnice Coke",
    imageKey: "food",
    href: "#",
    size: "medium",
  },
  {
    id: "fashion",
    category: "Modă · Streetwear",
    title: "Uniforma Rebeliunii",
    stat: "$51Mld",
    statLabel: "Venituri Nike",
    imageKey: "fashion",
    href: "/culture/american-aesthetics",
    size: "small",
  },
  {
    id: "music",
    category: "Muzică · Origini de Gen",
    title: "Sunetul Exportului",
    stat: "70%",
    statLabel: "Streaming în engleză",
    imageKey: "music",
    href: "#",
    size: "large",
  },
];

export function getCultureSubpages(locale: Locale): CultureSubpage[] {
  return locale === "ro" ? SUBPAGES_RO : SUBPAGES_EN;
}

// ─── Free Market Arguments (§6) ──────────────────────────────────────────────

const ARGUMENTS_EN: CultureArgument[] = [
  {
    title: "Private Innovation",
    body: "No Ministry of Culture planned Hollywood. It grew from competition between private studios fighting for audiences, talent, and distribution — each failure funding the next breakthrough.",
  },
  {
    title: "Democratic Access",
    body: "Denim, fast food, and rock music weren't elite products. They were built for mass markets. American culture is structurally populist — designed to scale, not to exclude.",
  },
  {
    title: "Market Scalability",
    body: "The franchise model — McDonald's, Starbucks, Subway — is an American invention. Culture industrialized. One recipe, ten thousand kitchens, every continent.",
  },
  {
    title: "Network Effects",
    body: "English, the internet, and American brands reinforce each other. Each makes the others more valuable. This self-amplifying loop is the structural engine of soft power.",
  },
];

const ARGUMENTS_RO: CultureArgument[] = [
  {
    title: "Inovație Privată",
    body: "Niciun Minister al Culturii nu a planificat Hollywood-ul. A crescut din competiția dintre studiouri private care luptau pentru audiențe, talent și distribuție — fiecare eșec finanțând următoarea descoperire.",
  },
  {
    title: "Acces Democratic",
    body: "Denim-ul, fast food-ul și rock-ul nu erau produse de elită. Au fost construite pentru piețe de masă. Cultura americană este structural populistă — proiectată să se scaleze, nu să excludă.",
  },
  {
    title: "Scalabilitate de Piață",
    body: "Modelul de franciză — McDonald's, Starbucks, Subway — este o invenție americană. Cultura industrializată. O rețetă, zece mii de bucătării, fiecare continent.",
  },
  {
    title: "Efecte de Rețea",
    body: "Engleza, internetul și brandurile americane se întăresc reciproc. Fiecare îl face pe celălalt mai valoros. Această buclă auto-amplificatoare este motorul structural al puterii soft.",
  },
];

export function getCultureArguments(locale: Locale): CultureArgument[] {
  return locale === "ro" ? ARGUMENTS_RO : ARGUMENTS_EN;
}

// ─── Quotes (§8) ─────────────────────────────────────────────────────────────

const QUOTES_EN: CultureQuote[] = [
  {
    text: "There is hardly a pioneer's hut in which one does not encounter some odd volumes of Shakespeare. I remember reading the feudal drama of Henry V for the first time in a log cabin.",
    author: "Alexis de Tocqueville",
    role: "Democracy in America, 1835",
  },
  {
    text: "America is not just a country. It's an idea. And that's what makes it magnetic. People don't risk their lives on boats to reach a country — they risk them to reach an idea.",
    author: "Bono",
    role: "U2 frontman, Georgetown University Address",
  },
  {
    text: "The glory of this land has been its capacity for transcendence — the ability of this nation to rise above itself, to reach beyond its grasp.",
    author: "Ronald Reagan",
    role: "40th President of the United States",
  },
];

const QUOTES_RO: CultureQuote[] = [
  {
    text: "Abia există o cabană de pionier în care să nu întâlnești câteva volume ciudate de Shakespeare. Îmi amintesc că am citit drama feudală Henry V pentru prima dată într-o cabană de bușteni.",
    author: "Alexis de Tocqueville",
    role: "Democrația în America, 1835",
  },
  {
    text: "America nu e doar o țară. E o idee. Și asta o face magnetică. Oamenii nu-și riscă viața pe bărci ca să ajungă într-o țară — și-o riscă ca să ajungă la o idee.",
    author: "Bono",
    role: "Solist U2, Discurs la Universitatea Georgetown",
  },
  {
    text: "Gloria acestui pământ a fost capacitatea sa de transcendență — abilitatea acestei națiuni de a se ridica deasupra ei însăși, de a se întinde dincolo de posibil.",
    author: "Ronald Reagan",
    role: "Al 40-lea Președinte al Statelor Unite",
  },
];

export function getCultureQuotes(locale: Locale): CultureQuote[] {
  return locale === "ro" ? QUOTES_RO : QUOTES_EN;
}

// ─── Radar Chart Data (§7) ───────────────────────────────────────────────────

export const CULTURE_RADAR_DATA: CultureRadarPoint[] = [
  { domain: "Film & TV", USA: 95, UK: 62, France: 48, Japan: 55 },
  { domain: "Music", USA: 92, UK: 68, France: 32, Japan: 45 },
  { domain: "Sports", USA: 90, UK: 55, France: 40, Japan: 42 },
  { domain: "Food & Brands", USA: 96, UK: 38, France: 55, Japan: 52 },
  { domain: "Fashion", USA: 78, UK: 60, France: 85, Japan: 65 },
  { domain: "Tech & Internet", USA: 98, UK: 42, France: 28, Japan: 58 },
  { domain: "Language", USA: 95, UK: 92, France: 35, Japan: 12 },
  { domain: "Higher Education", USA: 94, UK: 75, France: 42, Japan: 48 },
];

// ─── Filmstrip Hero Images ──────────────────────────────────────────────────

export const FILMSTRIP_IMAGE_KEYS = [
  "jazzClub",
  "nflStadium",
  "hollywoodSign",
  "burger",
  "concertCrowd",
  "disneyWorld",
  "timesSquare",
  "route66",
] as const;

// ─── Cultural Timeline Decades ──────────────────────────────────────────────

export interface CultureDecade {
  year: string;
  title: string;
  sentence: string;
  imageKey: string;
}

const DECADES_EN: CultureDecade[] = [
  { year: "1920s", title: "Jazz Age", sentence: "African-American musicians in New Orleans invented the first truly American art form and broadcast it worldwide.", imageKey: "era1920s" },
  { year: "1950s", title: "Hollywood Golden Age", sentence: "The studio system turned Los Angeles into the dream factory for the entire planet.", imageKey: "era1950s" },
  { year: "1970s", title: "Fast Food Empire", sentence: "McDonald's proved culture could be industrialized via the franchise model, spreading globally.", imageKey: "era1970s" },
  { year: "1990s", title: "The Internet Age", sentence: "Silicon Valley connected the world — and set English as the operating language of the digital era.", imageKey: "era1990s" },
  { year: "2020s", title: "AI & The Next Frontier", sentence: "American labs lead the race for artificial general intelligence — the next operating system for civilization.", imageKey: "era2020s" },
];

const DECADES_RO: CultureDecade[] = [
  { year: "1920", title: "Epoca Jazz-ului", sentence: "Muzicienii afro-americani din New Orleans au inventat prima formă de artă cu adevărat americană și au difuzat-o mondial.", imageKey: "era1920s" },
  { year: "1950", title: "Epoca de Aur a Hollywood-ului", sentence: "Sistemul studiourilor a transformat Los Angeles în fabrica de vise pentru întreaga planetă.", imageKey: "era1950s" },
  { year: "1970", title: "Imperiul Fast Food", sentence: "McDonald's a demonstrat că cultura poate fi industrializată prin modelul de franciză, răspândindu-se global.", imageKey: "era1970s" },
  { year: "1990", title: "Era Internetului", sentence: "Silicon Valley a conectat lumea — și a stabilit engleza ca limbă de operare a erei digitale.", imageKey: "era1990s" },
  { year: "2020", title: "AI & Frontiera Următoare", sentence: "Laboratoarele americane conduc cursa pentru inteligență artificială generală — următorul sistem de operare al civilizației.", imageKey: "era2020s" },
];

export function getCultureDecades(locale: Locale): CultureDecade[] {
  return locale === "ro" ? DECADES_RO : DECADES_EN;
}

// ─── Brand Logos (SVG paths relative to /ASSETS/Companies/) ─────────────────

export const BRAND_LOGOS_ROW_1 = [
  { name: "Apple", file: "Apple_Logo white.svg" },
  { name: "Nike", file: "Logo_NIKE.svg" },
  { name: "Google", file: "Google_Logo_0.svg" },
  { name: "Coca-Cola", file: "Coca-Cola_Logo_0.svg" },
  { name: "McDonald's", file: "McDonald's_Symbol_0.svg" },
  { name: "Netflix", file: "Netflix_Logo_0.svg" },
  { name: "Disney", file: "Disney_iddEtLt1OH_0.svg" },
  { name: "Amazon", file: "Amazon_Logo_0.svg" },
  { name: "Meta", file: "Meta_idlf4cVSsS_0.svg" },
  { name: "Levi's", file: "Levi's_logo.svg" },
  { name: "Starbucks", file: "Starbucks_Corporation_Logo_2011.svg" },
  { name: "Visa", file: "Visa_Inc._logo_(2021–present).svg" },
  { name: "JPMorgan", file: "Logo_of_JPMorganChase_2024.svg" },
  { name: "Mastercard", file: "Mastercard-logo.svg" },
];

export const BRAND_LOGOS_ROW_2 = [
  { name: "Microsoft", file: "Microsoft_Logo_0.svg" },
  { name: "Tesla", file: "tesla.svg" },
  { name: "Uber", file: "Uber_logo_2018.svg" },
  { name: "Walmart", file: "Walmart_logo_(2008).svg" },
  { name: "Target", file: "Target_logo.svg" },
  { name: "Instagram", file: "Instagram_Logo_0.svg" },
  { name: "YouTube", file: "YouTube_full-color_icon_(2017).svg" },
  { name: "Airbnb", file: "Airbnb_Logo_Bélo.svg" },
  { name: "SpaceX", file: "spacex.svg" },
  { name: "NVIDIA", file: "nvidia.svg" },
  { name: "Adobe", file: "adobe.svg" },
  { name: "Warner Bros.", file: "Warner_Bros-_Logo_0.svg" },
  { name: "Converse", file: "Converse_logo.svg" },
  { name: "Ralph Lauren", file: "Ralph_Lauren_id4gNvWZ8Z_0.svg" },
];

// ─── Soft Power Budget Comparison ───────────────────────────────────────────

export interface SoftPowerBudgetLine {
  label: string;
  value: string;
}

const BUDGET_EN: SoftPowerBudgetLine[] = [
  { label: "France Ministry of Culture", value: "€4B" },
  { label: "British Council", value: "£900M" },
  { label: "American private cultural exports", value: "$900B" },
];

const BUDGET_RO: SoftPowerBudgetLine[] = [
  { label: "Ministerul Culturii din Franța", value: "€4Mld" },
  { label: "British Council", value: "£900M" },
  { label: "Exporturi culturale private americane", value: "$900Mld" },
];

export function getSoftPowerBudget(locale: Locale): SoftPowerBudgetLine[] {
  return locale === "ro" ? BUDGET_RO : BUDGET_EN;
}
