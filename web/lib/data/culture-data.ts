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
  description: string;
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
  { value: "78.4%", label: "US Share of Global Box Office Revenue" },
  { value: "190", label: "Netflix Countries Reached in 45 Languages" },
  { value: "64%", label: "Billboard Global Top Hits by US Artists" },
  { value: "87.5%", label: "Frontier AI Models Invented in the US" },
  { value: "1.9B", label: "Daily Coca-Cola Servings Globally" },
];

const CULTURE_STATS_RO: CultureStat[] = [
  { value: "78,4%", label: "Cota SUA în Box Office-ul Global" },
  { value: "190", label: "Țări cu Acoperire Netflix în 45 de Limbi" },
  { value: "64%", label: "Hituri Billboard Global de Artiști Americani" },
  { value: "87,5%", label: "Modele AI de Frontieră Create în SUA" },
  { value: "1,9Mld", label: "Porții Zilnice Coca-Cola Global" },
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
    "The [hl]genius of America[/hl] is that it turned culture into a market — and then gave that market to the world.",
  attribution: "Editorial Voice",
  paragraphs: [
    "Hollywood, Nike, McDonald's, Jazz, and the iPhone weren't planned by a ministry of culture. They were competed into existence by [hl]private actors in open markets[/hl] — studios bidding for audiences, brands racing for shelf space, musicians chasing the crowd. The entire cultural arsenal of the United States is a [hl]byproduct of capitalism, not a policy outcome[/hl].",
    "This is what makes American soft power [hl]structurally different[/hl] from every other nation's. France has a Ministry of Culture. China has a propaganda department. America has a consumer market of 330 million people whose preferences, broadcast at planetary scale through English and the internet, [hl]set the default template[/hl] for how the world eats, dresses, watches, listens, and dreams.",
  ],
};

const THESIS_RO: CultureThesis = {
  pullQuote:
    "Geniul Americii este că a transformat cultura într-o piață — și apoi a dat acea piață întregii lumi.",
  attribution: "Voce Editorială",
  paragraphs: [
    "Hollywood, Nike, McDonald's, Jazz-ul și iPhone-ul nu au fost planificate de un minister al culturii. Au fost create prin competiție de [hl]actori privați pe piețe deschise[/hl] — studiouri care licitau pentru audiențe, branduri care se întreceau pentru rafturile magazinelor, muzicieni care urmăreau publicul. Întregul arsenal cultural al Statelor Unite este un [hl]produs secundar al capitalismului, nu un rezultat de politică publică[/hl].",
    "Asta face puterea soft americană [hl]structural diferită[/hl] de cea a oricărei alte națiuni. Franța are un Minister al Culturii. China are un departament de propagandă. America are o piață de consumatori de 330 de milioane de oameni ale căror preferințe, difuzate la scară planetară prin engleză și internet, [hl]stabilesc șablonul implicit[/hl] pentru cum mănâncă, se îmbracă, privește, ascultă și visează lumea.",
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
    description: "How the global export of movies, food, fashion, and technology turned the American lifestyle into the default interface for modern civilization.",
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
    description: "Hollywood didn't just capture attention — it exported the visual syntax of human dreaming, shaping international narratives and values.",
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
    description: "From NFL stadium lights to the NBA's global broadcast, American athletics are engineered for high-energy spectacle and massive fandom.",
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
    description: "Netflix, Disney, and YouTube dictate global screen time, creating a planetary attention loop built on consumer demand.",
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
    description: "Levi's, Coca-Cola, and Apple are more than corporate marks — they represent structural systems of utility, comfort, and status.",
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
    description: "The modern franchise model is a food assembly system built on absolute consistency, replicated on every continent.",
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
    description: "Blue jeans, sneakers, and streetwear didn't originate from high-fashion salons; they are the mass-market uniform of global youth culture.",
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
    description: "Jazz, Blues, Rock, and Hip Hop were competed into existence by private musicians, forming the soundscape of planetary consciousness.",
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
    description: "Cum exportul global de filme, mâncare, modă și tehnologie a transformat stilul de viață american în interfața implicită a civilizației moderne.",
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
    description: "Hollywood-ul nu a captat doar atenția — a exportat sintaxa vizuală a viselor umane, modelând narațiunile și valorile internaționale.",
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
    description: "De la luminile stadioanelor NFL la transmisiunile globale NBA, sportul american este proiectat ca un spectacol de înaltă energie.",
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
    description: "Netflix, Disney și YouTube dictează timpul de ecran global, creând o buclă planetară de atenție bazată pe cererea consumatorilor.",
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
    description: "Levi's, Coca-Cola și Apple sunt mai mult decât mărci comerciale — ele reprezintă sisteme structurale de utilitate, confort și statut.",
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
    description: "Modelul modern de franciză este un sistem de asamblare a alimentelor construit pe o consistență absolută, replicat pe fiecare continent.",
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
    description: "Blugii albaștri, sneakerșii și streetwear-ul nu provin din saloanele de modă înaltă; ei sunt uniforma pieței de masă a tineretului global.",
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
    description: "Jazz-ul, Blues-ul, Rock-ul și Hip Hop-ul au fost create prin competiție de muzicieni privați, formând coloana sonoră a lumii.",
  },
];

export function getCultureSubpages(locale: Locale): CultureSubpage[] {
  return locale === "ro" ? SUBPAGES_RO : SUBPAGES_EN;
}

// ─── Free Market Arguments (§6) ──────────────────────────────────────────────

const ARGUMENTS_EN: CultureArgument[] = [
  {
    title: "Private Innovation",
    body: "No Ministry of Culture planned Hollywood. It grew from [hl]competition between private studios[/hl] fighting for audiences, talent, and distribution — each failure funding the next breakthrough.",
  },
  {
    title: "Democratic Access",
    body: "Denim, fast food, and rock music weren't elite products. They were [hl]built for mass markets[/hl]. American culture is structurally populist — designed to scale, not to exclude.",
  },
  {
    title: "Market Scalability",
    body: "The franchise model — McDonald's, Starbucks, Subway — is an American invention. [hl]Culture industrialized[/hl]. One recipe, ten thousand kitchens, every continent.",
  },
  {
    title: "Network Effects",
    body: "English, the internet, and American brands reinforce each other. Each makes the others more valuable. This [hl]self-amplifying loop[/hl] is the structural engine of soft power.",
  },
];

const ARGUMENTS_RO: CultureArgument[] = [
  {
    title: "Inovație Privată",
    body: "Niciun Minister al Culturii nu a planificat Hollywood-ul. A crescut din [hl]competiția dintre studiouri private[/hl] care luptau pentru audiențe, talent și distribuție — fiecare eșec finanțând următoarea descoperire.",
  },
  {
    title: "Acces Democratic",
    body: "Denim-ul, fast food-ul și rock-ul nu erau produse de elită. Au fost [hl]construite pentru piețe de masă[/hl]. Cultura americană este structural populistă — proiectată să se scaleze, nu să excludă.",
  },
  {
    title: "Scalabilitate de Piață",
    body: "Modelul de franciză — McDonald's, Starbucks, Subway — este o invenție americană. [hl]Cultura industrializată[/hl]. O rețetă, zece mii de bucătării, fiecare continent.",
  },
  {
    title: "Efecte de Rețea",
    body: "Engleza, internetul și brandurile americane se întăresc reciproc. Fiecare îl face pe celălalt mai valoros. Această [hl]buclă auto-amplificatoare[/hl] este motorul structural al puterii soft.",
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
  { name: "Nike", file: "Logo_NIKE.svg", invert: true },
  { name: "Google", file: "Google_Logo_0.svg" },
  { name: "Coca-Cola", file: "Coca-Cola_Logo_0.svg" },
  { name: "McDonald's", file: "McDonald's_Symbol_0.svg" },
  { name: "Netflix", file: "Netflix_Logo_0.svg" },
  { name: "Disney", file: "Disney_iddEtLt1OH_0.svg", invert: true },
  { name: "Amazon", file: "Amazon_Logo_0.svg", invert: true },
  { name: "Meta", file: "Meta_idlf4cVSsS_0.svg", invert: true },
  { name: "Levi's", file: "Levi's_logo.svg" },
  { name: "Starbucks", file: "Starbucks_Corporation_Logo_2011.svg" },
  { name: "Visa", file: "Visa_Inc._logo_(2021–present).svg" },
  { name: "JPMorgan", file: "Logo_of_JPMorganChase_2024.svg", invert: true },
  { name: "Mastercard", file: "Mastercard-logo.svg" },
  { name: "OpenAI", file: "openai.svg", invert: true },
  { name: "Stripe", file: "Stripe_Logo,_revised_2016.svg", invert: true },
  { name: "Intel", file: "intel.svg", invert: true },
  { name: "Ford", file: "Ford-Motor-Company-Logo.png" },
  { name: "GE Aerospace", file: "ge-aerospace.svg", invert: true },
  { name: "American Express", file: "American_Express_logo_(2018).svg" },
  { name: "Delta Air Lines", file: "delta-air-lines.svg", invert: true },
  { name: "FedEx", file: "FedEx_Express.svg" },
  { name: "Epic Games", file: "Epic_Games_logo.svg", invert: true },
  { name: "Paramount", file: "Paramount_idOwWCnILA_0.svg", invert: true },
  { name: "Snapchat", file: "Snapchat_logo.svg" },
];

export const BRAND_LOGOS_ROW_2 = [
  { name: "Microsoft", file: "Microsoft_Logo_0.svg" },
  { name: "Tesla", file: "tesla.svg", invert: true },
  { name: "Uber", file: "Uber_logo_2018.svg", invert: true },
  { name: "Walmart", file: "Walmart_logo_(2008).svg" },
  { name: "Target", file: "Target_logo.svg" },
  { name: "Instagram", file: "Instagram_Logo_0.svg", invert: true },
  { name: "YouTube", file: "YouTube_full-color_icon_(2017).svg" },
  { name: "Airbnb", file: "airbnb.svg", invert: true },
  { name: "SpaceX", file: "spacex.svg", invert: true },
  { name: "NVIDIA", file: "nvidia.svg", invert: true },
  { name: "Adobe", file: "adobe.svg", invert: true },
  { name: "Warner Bros.", file: "Warner_Bros-_Logo_0.svg", invert: true },
  { name: "Converse", file: "Converse_logo.svg", invert: true },
  { name: "Ralph Lauren", file: "Ralph_Lauren_id4gNvWZ8Z_0.svg", invert: true },
  { name: "Palantir", file: "palantir.svg", invert: true },
  { name: "Anduril", file: "anduril.svg", invert: true },
  { name: "IBM", file: "ibm.svg", invert: true },
  { name: "Boeing", file: "Boeing_full_logo.svg" },
  { name: "Chevron", file: "chevron.svg" },
  { name: "PepsiCo", file: "PepsiCo_logo.svg" },
  { name: "Oracle", file: "oracle.svg", invert: true },
  { name: "eBay", file: "ebay.svg" },
  { name: "Rockstar Games", file: "Rockstar_Games_Logo.svg" },
  { name: "Reddit", file: "Reddit_Logo_Icon.svg" },
  { name: "X", file: "X_logo_2023.svg", invert: true },
  { name: "Oculus", file: "Symbol.png", invert: true },
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

export const CULTURE_MEDIA_WALL_IMAGES = [
  "/images/culture/Music/Live-Jazz-Band-Performing-On-Stage-With-Neon-Jazz-Sign-And-Red-Curtains.jpg",
  "/images/culture/Music/Blue-Burst-Electric-Guitar-Lying-Flat-On-Dark-Textured-Surface.jpg",
  "/images/culture/Music/Close-Up-Of-Electric-Guitar-Illuminated-By-Purple-And-Blue-Neon-Lights.jpg",
  "/images/culture/Music/Silhouetted-Crowd-With-Raised-Hands-At-Live-Concert-With-Yellow-Stage-Lights.jpg",
  "/images/culture/Cinema/Hollywood sign sunset.jpg",
  "/images/culture/Cinema/Illuminated-Chicago-Theatre-Marquee-Sign-At-Night-With-Street-View.jpg",
  "/images/culture/Cinema/Hollywood sign.jpg",
  "/images/culture/Cinema/Hollywood sign between palm trees.jpg",
  "/images/culture/Album Covers/50-Cent-Get-Rich-or-Die-Tryin-2003 Album Cover.jpeg",
  "/images/culture/Album Covers/Michael Jackson Thriller 1982 classic pop album cover.jpg",
  "/images/culture/Album Covers/Miles Davis Kind of Blue high contrast jazz vinyl cover.jpg",
  "/images/culture/Album Covers/Eminem The Marshall Mathers LP original casing cover.jpg",
  "/images/culture/Album Covers/Johnny Cash At Folsom Prison legendary portrait cover.jpg",
  "/images/culture/Album Covers/The Beach Boys Pet Sounds 1966 mono album cover.jpg",
  "/images/culture/Album Covers/Nirvana Nevermind 1991 standard vinyl cover.jpg",
  "/images/culture/Magazines/Sheryl Lee, Lara Flynn Boyle and Peggy Lipton, TV Guide, Sept. 8-14, 1990 cover.jpg",
  "/images/culture/Magazines/marilyn-monroe-the-iconic-life-cover-from-may-25-1953.jpg",
  "/images/culture/Magazines/National Geographic/National Geographic Magazine Cover March 1996 Emperors Of The Ice Emperor Penguins With Chick.jpg",
  "/images/culture/Magazines/National Geographic/National Geographic Magazine Cover March 1984 The Laser A Splendid Light Hologram Eagle.jpg",
  "/images/culture/Magazines/National Geographic/National Geographic Magazine Cover October 1981 Space Shuttle Columbia Launch First Flight.jpg",
  "/images/culture/Magazines/National Geographic/National Geographic Magazine Cover July 1942 American Flag Buy US War Savings Bonds And Stamps.jpg",
  "/images/culture/Magazines/National Geographic/National Geographic Magazine Cover December 1969 Astronaut On The Moon Apollo 11.jpg",
  "/images/culture/Magazines/National Geographic/National Geographic Magazine Cover April 1997 Hubbles Eye On The Universe Nebula.jpg",
  "/images/culture/Magazines/TIME/Time Magazine Cover on 9 : 11.jpg",
  "/images/culture/Magazines/TIME/Time magazine covers 70's.jpg",
  "/images/culture/Magazines/TIME/Time magazine covers 50's.jpg",
  "/images/culture/Magazines/TIME/Time magazine covers 90's.jpg",
  "/images/culture/Magazines/TIME/Time magazine covers 00's.jpg",
  "/images/culture/Magazines/TIME/Time magazine covers 60's.jpg",
  "/images/culture/Magazines/TIME/Time magazine covers 80's.jpg",
  "/images/culture/Magazines/Marilyn Monroe, Avant Garde, March 1968 cover.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover March 1980 USA Olympic Mens Hockey Team Miracle On Ice Celebration.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover March 1993 George Steinbrenner As George II On White Horse.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover April 2019 Tiger Woods Masters Golf Celebration.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover July 1999 Brandi Chastain US Womens Soccer World Cup Victory Yes.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover June 2016 Muhammad Ali The Greatest Boxing Tribute.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover December 1984 Michael Jordan Chicago Bulls A Star Is Born.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover January 1968 Vince Lombardi Green Bay Packers Super Champion.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover November 2016 Chicago Cubs World Series Win Kris Bryant Celebration.jpg",
  "/images/culture/Magazines/Sports Illustrated/Sports Illustrated Magazine Cover February 1991 Dream Team USA Basketball Olympic Five.jpeg",
  "/images/culture/Magazines/“Aviation as Seen by Monkeys,” Fortune, January 1931 Cover.jpg",
  "/images/culture/Magazines/Produce, Gourmet, May 1969 cover.jpg",
  "/images/culture/Magazines/disney-world-the-iconic-life-cover-from-october-15-1971.jpg",
  "/images/culture/Eras/1990s internet Gore-Clinton-Computer.jpg",
  "/images/culture/Eras/1920s Jazz CarterAndKingJazzingOrchestra.jpg",
  "/images/culture/Eras/1970s fast food restaurant - McDonald's.jpeg",
  "/images/culture/Eras/1950s Hollywood.jpg",
  "/images/culture/Eras/AI 2020s apps.jpg",
  "/images/culture/Eras/Vintage-1970s-fast food.jpg",
  "/images/culture/Just America/Police K9 on top of Police Car.jpg",
  "/images/culture/Just America/NFL-Themed-Carnival-Ride-With-Spinning-Football-And-Team-Logos-At-Outdoor-Fair.jpg",
  "/images/culture/Just America/Man-In-Patriotic-Jacket-Giving-Thumbs-Up-Outside-Team-USA-House.jpg",
  "/images/culture/Just America/McDonald's Restaurant in Bethlehem, Georgia.jpg",
  "/images/culture/Just America/Times-Square-NYC-Rainy-Night-With-Yellow-Taxis-And-American-Flag-Billboard.jpg",
  "/images/culture/Sports/Stadiums/Scenic-Daytime-View-Of-PNC-Park-Baseball-Stadium-And-Pittsburgh-Skyline.jpg",
  "/images/culture/Sports/Stadiums/Top-Down-Aerial-View-Of-Baltimore-Ravens-Field-At-M-And-T-Bank-Stadium.jpg",
  "/images/culture/Sports/Stadiums/Batter-Swinging-At-Pitch-With-Catcher-And-Umpire-At-Home-Plate.jpg",
  "/images/culture/Sports/Stadiums/Wide-Interior-View-Of-Packed-ATT-Stadium-During-Dallas-Cowboys-Football-Game.jpg",
  "/images/culture/Sports/Stadiums/Aerial-Cityscape-View-Of-Carolina-Panthers-Bank-Of-America-Stadium-In-Charlotte.jpg",
  "/images/culture/Sports/Stadiums/ASU Arizona NFL Stadium.jpg",
  "/images/culture/Sports/Stadiums/Miami-Heat-Player-Dunking-During-Game-Against-Orlando-Magic-At-Amway-Center.jpg",
  "/images/culture/Sports/Stadiums/High-Aerial-Top-Down-View-Of-Illuminated-Baseball-Diamond-And-Crowd.jpg",
  "/images/culture/Sports/Stadiums/Exterior-View-Of-Allegiant-Stadium-With-Las-Vegas-Skyline-In-Background.jpg",
  "/images/culture/Sports/Stadiums/Wide-Angle-Night-View-Of-Giant-American-Flag-On-Field-At-MetLife-Stadium.jpg",
  "/images/culture/Sports/Stadiums/New-York-Yankees-Baseball-Game-From-Stands-At-Yankee-Stadium.jpg",
  "/images/culture/Sports/Stadiums/Elevated-View-Of-Large-US-Flag-Unfurled-Before-Jets-Game-At-MetLife-Stadium.jpg",
  "/images/culture/Sports/Stadiums/Wide-Evening-View-Of-Atlanta-Braves-Baseball-Game-From-Behind-Home-Plate.jpg",
  "/images/culture/Sports/Stadiums/Panoramic-View-Of-Packed-FedExField-During-Washington-Redskins-NFL-Game.jpg",
  "/images/culture/Sports/Donnie Allison was leading Cale Yarborough when the two made contact and crashed on the last lap of the 1979 Daytona 500.jpg",
  "/images/culture/Iconic Things/Buck-Atoms-Cosmic-Curios-Route-66-Sign-And-Statue-In-Tulsa-Oklahoma.jpg",
  "/images/culture/Iconic Things/Shiny-Black-Classic-Car-Reflecting-Pink-Neon-Signs-At-Mels-Drive-In.jpg",
  "/images/culture/Iconic Things/Times Square.jpg",
  "/images/culture/Iconic Things/Vintage-Classic-Cars-Parked-Outside-Mels-Drive-In-Retro-Diner-At-Night.jpg",
  "/images/culture/Iconic Things/Flos-V8-Cafe-Neon-Sign-Illuminated-At-Night-Cars-Land-Disney-California-Adventure.jpg",
  "/images/culture/Iconic Things/Roys-Motel-And-Cafe-Sign-On-Route-66-In-Amboy-California-Desert.jpg",
  "/images/culture/Iconic Things/Cinderella Castle at Disney World Orlando.jpg",
  "/images/culture/Iconic Things/Route-66-Shield-Painted-On-Desert-Highway-At-Sunrise.jpg",
  "/images/culture/Iconic Things/Statue Of Liberty.jpg",
  "/images/culture/Iconic Things/Classic-Cars-Parked-At-Mels-Drive-In-Universal-Studios-Hollywood.jpg",
  "/images/culture/Iconic Things/Flos-V8-Cafe-Neon-Sign-At-Dusk-In-Cars-Land-Disney-California-Adventure.jpg",
  "/images/culture/Iconic Things/Wall St Sign on street pole.jpg",
  "/images/culture/Movie Posters/Saving Private Ryan 1998 gritty military cinematic poster.jpg",
  "/images/culture/Movie Posters/Bruce Springsteen Born in the U.S.A. 1984 denim flag cover.jpg",
  "/images/culture/Movie Posters/Interstellar 2014 cinematic IMAX ice planet poster.jpg",
  "/images/culture/Movie Posters/Blade Runner 1982 cinematic neo-noir poster.jpg",
  "/images/culture/Movie Posters/Marvel Avengers Endgame cinematic theatrical poster.jpg",
  "/images/culture/Movie Posters/Titanic 1997 classic cinematic epic promotional poster.jpg",
  "/images/culture/Movie Posters/Jaws 1975 minimalist shark composition poster.jpg",
  "/images/culture/Movie Posters/Goodfellas 1990 classic Scorsese high-contrast font poster.jpg",
  "/images/culture/Movie Posters/Pulp Fiction 1994 vintage editorial style poster.jpg",
  "/images/culture/Movie Posters/Jurassic Park 1993 iconic T-Rex silhouette poster.jpg",
  "/images/culture/Movie Posters/The Matrix 1999 green digital rain matrix poster.jpg",
  "/images/culture/Movie Posters/Star Wars Episode IV A New Hope original 1977 poster.jpg",
  "/images/culture/Movie Posters/The Dark Knight 2008 high-contrast Batman skyline poster.jpg",
  "/images/culture/Movie Posters/The Godfather 1972 classic puppet strings poster.jpg",
  "/images/culture/Food/Burger and Fries close up.jpg",
  "/images/culture/Food/American Burger.jpg",
  "/images/culture/Brand Ads/1971 Coca Cola Coke Vintage Print Ad Bottle Glass in Snow Ice Cold.jpg",
  "/images/culture/Brand Ads/1982 General Foods International Coffees advertisement.jpg",
  "/images/culture/Brand Ads/1987 Uniden cordless phone advertisement.jpg",
  "/images/culture/Brand Ads/Coca-Cola (1989) You Can't beat the feeling.jpg",
  "/images/culture/Brand Ads/Coca-Cola is it, 1988.jpg",
  "/images/culture/Brand Ads/Tiffany & Co_ Archival Ad 1967.jpg",
  "/images/culture/School/Towns_County_High_School,_Middle_School,_and_Elementary_School_share_a_campus_in_Hiawassee,_Georgia.jpg",
  "/images/culture/School/High-School-Hallway_from_Amazing_World_of_Gumball.jpg",
  "/images/culture/School/Edison_High_School_of_Technology_entrance.jpg",
  "/images/culture/School/A_classroom_in_a_modern_public_high_school_in_the_United_States_–_Hayesville_High_School_in_Clay_County,_North_Carolina.jpg",
  "/images/culture/School/A_hallway_in_a_modern_public_high_school_in_the_United_States_–_Hayesville_High_School_in_Clay_County,_North_Carolina.jpg",
];

export const BRAND_AD_LOGOS = [
  { name: "Coca-Cola Ad", file: "1971 Coca Cola Coke Vintage Print Ad Bottle Glass in Snow Ice Cold.jpg" },
  { name: "General Foods Ad 1982", file: "1982 General Foods International Coffees advertisement.jpg" },
  { name: "Uniden Ad 1987", file: "1987 Uniden cordless phone advertisement.jpg" },
  { name: "Coca-Cola Ad 1989", file: "Coca-Cola (1989) You Can't beat the feeling.jpg" },
  { name: "Coca-Cola Ad 1988", file: "Coca-Cola is it, 1988.jpg" },
  { name: "Tiffany & Co Ad 1967", file: "Tiffany & Co_ Archival Ad 1967.jpg" },
];

// ─── Music Genres regional origins data ──────────────────────────────────────

export interface CultureMusicGenre {
  city: string;
  genre: string;
  description: string;
  imageKey: string;
}

const MUSIC_GENRES_EN: CultureMusicGenre[] = [
  {
    city: "New Orleans, LA",
    genre: "Jazz",
    description: "Born from the fusion of African rhythms and European brass in Congo Square, jazz is the original syncopated soundscape of human freedom.",
    imageKey: "jazzClub",
  },
  {
    city: "Mississippi Delta",
    genre: "The Blues",
    description: "The raw emotional bedrock of modern pop, rock, and soul — expressing sorrow, struggle, and survival through acoustic guitar and voice.",
    imageKey: "music",
  },
  {
    city: "Memphis & Nashville, TN",
    genre: "Rock & Country",
    description: "Where gospel, folk, and rhythm-and-blues collided to spawn Rock & Roll, and where songwriting was refined into a planetary industry.",
    imageKey: "concertCrowd",
  },
  {
    city: "Bronx, New York",
    genre: "Hip Hop",
    description: "Turntables and street block parties in the 1970s transformed spoken word, rhythm, and beat-making into the dominant youth language of the planet.",
    imageKey: "overview",
  },
];

const MUSIC_GENRES_RO: CultureMusicGenre[] = [
  {
    city: "New Orleans, LA",
    genre: "Jazz",
    description: "Născut din fuziunea ritmurilor africane și a instrumentelor de suflat din alamă europene în Congo Square, jazz-ul este coloana sonoră a libertății.",
    imageKey: "jazzClub",
  },
  {
    city: "Delta Mississippi",
    genre: "Blues-ul",
    description: "Fundația emoțională brută a muzicii pop, rock și soul moderne — exprimând tristețea, lupta și supraviețuirea prin chitară acustică și voce.",
    imageKey: "music",
  },
  {
    city: "Memphis & Nashville, TN",
    genre: "Rock & Country",
    description: "Locul unde gospelul, folclorul și rhythm-and-blues-ul s-au ciocnit pentru a da naștere Rock & Roll-ului, și unde compoziția a devenit o industrie.",
    imageKey: "concertCrowd",
  },
  {
    city: "Bronx, New York",
    genre: "Hip Hop",
    description: "Platanele și petrecerile de cartier din anii '70 au transformat cuvintele rostite, ritmul și beat-making-ul în limbajul dominant al tinerilor de pe planetă.",
    imageKey: "overview",
  },
];

export function getCultureMusicGenres(locale: Locale): CultureMusicGenre[] {
  return locale === "ro" ? MUSIC_GENRES_RO : MUSIC_GENRES_EN;
}

// ─── Culinary culture pillars data ──────────────────────────────────────────

export interface CultureCulinaryPillar {
  title: string;
  subtitle: string;
  body: string;
  imageKey: string;
}

const CULINARY_PILLARS_EN: CultureCulinaryPillar[] = [
  {
    title: "The American Diner",
    subtitle: "The Design of Democratic Dining",
    body: "With its neon lighting, endless coffee refills, and retro booths, the diner represents the spatial design of democratic access. Open to anyone at any hour, it is an architectural comfort zone that commoditized community and conversation.",
    imageKey: "diner",
  },
  {
    title: "The Speakeasy Aesthetic",
    subtitle: "The Beverage Craft Export",
    body: "From the bourbon revival and craft beer movement to the cocktail renaissance, America redefined global drinking culture. Every hip cocktail lounge in Tokyo or Paris is modeled on the dark woods, low lights, and rigorous mixology of a pre-Prohibition New York or Brooklyn speakeasy—exporting a classic, market-proven lifestyle.",
    imageKey: "jazzClub",
  },
  {
    title: "The Logistics Franchise",
    subtitle: "Exporting Operational Systems",
    body: "McDonald's and Starbucks didn't just export burgers and lattes; they exported operational logistics. Their global reach is a triumph of cold-chain supply management, strict food safety protocols, real estate site-selection algorithms, and hyper-optimized labor productivity standards. It turned culinary service into a highly engineered, predictable system of global replication.",
    imageKey: "food",
  },
];

const CULINARY_PILLARS_RO: CultureCulinaryPillar[] = [
  {
    title: "Diner-ul American",
    subtitle: "Designul Mesei Democrate",
    body: "Cu iluminarea sa de neon, cafeaua nesfârșită și separeurile retro, diner-ul reprezintă designul spațial al accesului democratic. Deschis oricui și la orice oră, este o zonă de confort arhitectural care a transformat comunitatea și conversația în bunuri accesibile tuturor.",
    imageKey: "diner",
  },
  {
    title: "Estetica Speakeasy",
    subtitle: "Exportul Băuturilor Artizanale",
    body: "De la renașterea bourbonului și mișcarea berii artizanale până la revigorarea cocktailurilor clasice, America a redefinit cultura globală a băutului. Fiecare lounge modern din Tokyo sau Paris este modelat după lemnul întunecat, lumina difuză și mixologia riguroasă a speakeasy-urilor istorice din New York sau Brooklyn—exportând un stil de viață clasic.",
    imageKey: "jazzClub",
  },
  {
    title: "Franciza Logistică",
    subtitle: "Exportul de Sisteme Operaționale",
    body: "McDonald's și Starbucks nu au exportat doar hamburgeri și cafele; au exportat logistică operațională. Expansiunea lor globală este un triumf al managementului lanțului de aprovizionare, al protocoalelor stricte de siguranță alimentară, al algoritmilor de selecție imobiliară și al productivității muncii hiper-optimizate. A transformat serviciul culinar într-un sistem industrial de replicare globală.",
    imageKey: "food",
  },
];

export function getCultureCulinaryPillars(locale: Locale): CultureCulinaryPillar[] {
  return locale === "ro" ? CULINARY_PILLARS_RO : CULINARY_PILLARS_EN;
}

// ─── Origination Strip data ──────────────────────────────────────────────────

export interface CultureOriginationItem {
  innovation: string;
  decade: string;
  description: string;
}

const ORIGINATIONS_EN: CultureOriginationItem[] = [
  {
    innovation: "Jazz",
    decade: "1910s",
    description: "The syncopated soundscape of human freedom.",
  },
  {
    innovation: "The Blues",
    decade: "1900s",
    description: "The raw emotional bedrock of modern music.",
  },
  {
    innovation: "Rock 'n' Roll",
    decade: "1950s",
    description: "Electrified youth rebellion broadcast worldwide.",
  },
  {
    innovation: "Hip-Hop",
    decade: "1970s",
    description: "Street-block beats that became global culture.",
  },
  {
    innovation: "Feature Film",
    decade: "1910s",
    description: "Hollywood's standard for cinematic storytelling.",
  },
  {
    innovation: "Franchise Model",
    decade: "1950s",
    description: "Exporting consistency and operational systems.",
  },
  {
    innovation: "Venture Startup",
    decade: "1970s",
    description: "Funding disruptive ideas with high-risk capital.",
  },
  {
    innovation: "Smartphone UX",
    decade: "2000s",
    description: "The multi-touch interface for human connection.",
  },
];

const ORIGINATIONS_RO: CultureOriginationItem[] = [
  {
    innovation: "Jazz",
    decade: "Anii 1910",
    description: "Coloana sonoră sincopată a libertății umane.",
  },
  {
    innovation: "Blues-ul",
    decade: "Anii 1900",
    description: "Fundația emoțională brută a muzicii moderne.",
  },
  {
    innovation: "Rock 'n' Roll",
    decade: "Anii 1950",
    description: "Rebeliunea electrificată a tineretului, difuzată global.",
  },
  {
    innovation: "Hip-Hop",
    decade: "Anii 1970",
    description: "Ritmurile de cartier devenite cultură globală.",
  },
  {
    innovation: "Film de lungmetraj",
    decade: "Anii 1910",
    description: "Standardul Hollywood pentru narațiunea cinematografică.",
  },
  {
    innovation: "Modelul de franciză",
    decade: "Anii 1950",
    description: "Exportul consistenței și sistemelor operaționale.",
  },
  {
    innovation: "Startup-ul cu capital de risc",
    decade: "Anii 1970",
    description: "Finanțarea ideilor disruptive cu capital de risc.",
  },
  {
    innovation: "Paradigma UX Smartphone",
    decade: "Anii 2000",
    description: "Interfața multi-touch pentru conexiunea umană.",
  },
];

export function getCultureOriginations(locale: Locale): CultureOriginationItem[] {
  return locale === "ro" ? ORIGINATIONS_RO : ORIGINATIONS_EN;
}

// ─── Editorial Imperialism data ──────────────────────────────────────────────

export interface CultureEditorialImperialismData {
  eyebrow: string;
  headline: string;
  statement: string;
  body: string;
}

const EDITORIAL_IMPERIALISM_EN: CultureEditorialImperialismData = {
  eyebrow: "COUNTER-PROGRAMMING · THE IMPERIALISM CRITIQUE",
  headline: "THE VOLUNTARY DEFAULT",
  statement: "Voluntary exchange is not coercion.",
  body: "Critics frequently describe the spread of American culture as a kind of 'cultural imperialism' or 'soft conquest'—a soft-power hegemony that homogenizes the globe. But this critique makes a fundamental category error: it confuses voluntary choice with coercion. A billion people freely choose to stream American movies, buy American brands, wear blue jeans, and learn American English. When the French government bans English words from official documents with zero effect on what French teenagers actually say and listen to, it reveals the power of pure demand over political mandates. American culture remains the world's default because it is competed into existence to serve human desires, operating independently of state agendas.",
};

const EDITORIAL_IMPERIALISM_RO: CultureEditorialImperialismData = {
  eyebrow: "CONTRA-PROGRAMARE · CRITICA IMPERIALISMULUI",
  headline: "OPȚIUNEA VOLUNTARĂ IMPLICITĂ",
  statement: "Schimbul voluntar nu înseamnă constrângere.",
  body: "Criticii descriu adesea răspândirea culturii americane ca pe un tip de 'imperialism cultural' sau 'cucerire soft'—o hegemonie care omogenizează globul. Însă această critică face o eroare fundamentală: confundă alegerea voluntară cu constrângerea. Un miliard de oameni aleg liber să vizioneze filme americane, să cumpere branduri americane, să poarte blugi și să învețe engleza americană. Când guvernul francez interzice cuvintele englezești din documentele oficiale, iar acest lucru are exact zero impact asupra limbajului pe care adolescenții francezi îl folosesc în viața de zi cu zi, se evidențiază puterea cererii libere în fața directivelor politice. Cultura americană este opțiunea voluntară implicită a lumii deoarece a fost creată prin competiție pentru a servi dorințele umane, dincolo de agendele de stat.",
};

export function getCultureEditorialImperialism(locale: Locale): CultureEditorialImperialismData {
  return locale === "ro" ? EDITORIAL_IMPERIALISM_RO : EDITORIAL_IMPERIALISM_EN;
}

// ─── Digital America data ────────────────────────────────────────────────────

export interface CultureDigitalPipeItem {
  title: string;
  description: string;
  iconKey: string;
}

export interface CultureDigitalPipesData {
  eyebrow: string;
  headline: string;
  statement: string;
  body: string;
  bridgeText: string;
  pipes: CultureDigitalPipeItem[];
}

const DIGITAL_PIPES_EN: CultureDigitalPipesData = {
  eyebrow: "THE 21ST CENTURY INFRASTRUCTURE · DIGITAL AMERICA",
  headline: "BUILDING THE PIPES OF GLOBAL CULTURE",
  statement: "The medium is the American message.",
  body: "In the 20th century, American cultural power was defined by the content it exported: Hollywood films, Motown records, Levi's jeans, and Coca-Cola bottles. But in the 21st century, America did something far more profound: it built the digital pipes upon which the entire world's culture now runs. Every dominant search engine that indexes human knowledge, every major social platform where global conversations happen, every frontier AI model, the streaming paradigm, the podcast format, and the smartphone UX itself—these are not just technological feats; they are the new infrastructure of global human expression. The world doesn't just watch American movies anymore; it lives inside the American digital landscape.",
  bridgeText: "Explore the venture capital engines and technological breakthroughs that built this digital foundation in [Economy & Growth](/economy) and [Tech & Innovation](/innovation).",
  pipes: [
    {
      title: "The Search Engine",
      description: "Organizing and ranking the entirety of human knowledge under a single input bar.",
      iconKey: "search",
    },
    {
      title: "Social Platforms",
      description: "Creating the global digital public squares where conversations, trends, and revolutions begin.",
      iconKey: "social",
    },
    {
      title: "The Streaming Paradigm",
      description: "Replacing physical media with instantly accessible, personalized global broadcasting feeds.",
      iconKey: "streaming",
    },
    {
      title: "The Podcast Format",
      description: "Decentralizing talk radio into long-form, intimate global conversations on demand.",
      iconKey: "podcast",
    },
    {
      title: "Smartphone UX",
      description: "Standardizing the multi-touch gestures and app ecosystems that navigate human reality.",
      iconKey: "smartphone",
    },
    {
      title: "Frontier AI",
      description: "Inventing the cognitive engines that synthesize information, code, and creative output in real time.",
      iconKey: "ai",
    },
  ],
};

const DIGITAL_PIPES_RO: CultureDigitalPipesData = {
  eyebrow: "INFRASTRUCTURA SECOLULUI XXI · AMERICA DIGITALĂ",
  headline: "CONSTRUIREA CANALELOR CULTURII GLOBALE",
  statement: "Mediul este mesajul american.",
  body: "În secolul XX, puterea culturală a Americii a fost definită de conținutul pe care l-a exportat: filme de la Hollywood, discuri Motown, blugi Levi's și sticle de Coca-Cola. Însă în secolul XXI, America a realizat ceva mult mai profund: a construit canalele digitale pe care rulează acum întreaga cultură a lumii. Fiecare motor de căutare dominant care indexează cunoașterea umană, fiecare platformă socială majoră unde au loc conversațiile globale, fiecare model AI de frontieră, paradigma de streaming, formatul de podcast și interfața smartphone-ului în sine—acestea nu sunt doar realizări tehnologice; ele reprezintă noua infrastructură a exprimării umane globale. Lumea nu se mai uită doar la filme americane, ci trăiește în interiorul peisajului digital american.",
  bridgeText: "Explorați motoarele capitalului de risc și inovațiile tehnologice care au clădit această fundație digitală în [Economie și Creștere](/economy) și [Tehnologie și Inovare](/innovation).",
  pipes: [
    {
      title: "Motorul de Căutare",
      description: "Organizarea și ierarhizarea întregii cunoașteri umane sub o singură bară de căutare.",
      iconKey: "search",
    },
    {
      title: "Platformele Sociale",
      description: "Crearea piețelor publice digitale globale unde încep conversații, tendințe și revoluții.",
      iconKey: "social",
    },
    {
      title: "Paradigma de Streaming",
      description: "Înlocuirea suporturilor fizice cu fluxuri de difuzare globale personalizate și accesibile instant.",
      iconKey: "streaming",
    },
    {
      title: "Formatul de Podcast",
      description: "Decentralizarea emisiunilor radio în conversații globale de lungă durată, intime și la cerere.",
      iconKey: "podcast",
    },
    {
      title: "Interfața Smartphone",
      description: "Standardizarea gesturilor multi-touch și a ecosistemelor de aplicații prin care navigăm realitatea.",
      iconKey: "smartphone",
    },
    {
      title: "Modelele AI de Frontieră",
      description: "Inventarea motoarelor cognitive care sintetizează informații, cod și creație în timp real.",
      iconKey: "ai",
    },
  ],
};

export function getCultureDigitalPipes(locale: Locale): CultureDigitalPipesData {
  return locale === "ro" ? DIGITAL_PIPES_RO : DIGITAL_PIPES_EN;
}

// ─── Cultural Icons data ─────────────────────────────────────────────────────

export interface CultureIconItem {
  name: string;
  years: string;
  description: string;
  imageKey: string;
  contribution: string;
  achievement: string;
}

export interface CultureIconsSectionData {
  eyebrow: string;
  title: string;
  deck: string;
  icons: CultureIconItem[];
}

const CULTURE_ICONS_EN: CultureIconsSectionData = {
  eyebrow: "CULTURAL AMBASSADORS · THE FACES OF AMERICA",
  title: "THE PERSONALITY DEFAULT",
  deck: "Unlike other nations, America has no ministry of culture. It does not export its lifestyle through state mandates. Instead, the global face of America was built by individuals—ambitious dreamers, rebels, and creators whose talent and drive were rewarded by free markets at global scale.",
  icons: [
    {
      name: "Walt Disney",
      years: "1901 – 1966",
      description: "Pioneered animated cinema and built the modern global franchise model of childhood imagination.",
      imageKey: "waltDisney",
      contribution: "Animated Cinema & Global Franchising",
      achievement: "Holds the record for most Academy Awards won in history (26).",
    },
    {
      name: "Louis Armstrong",
      years: "1901 – 1971",
      description: "The foundational virtuoso of jazz who projected American musical freedom to the global stage.",
      imageKey: "louisArmstrong",
      contribution: "Jazz Virtuosity & Improvised Solos",
      achievement: "6-decade chart presence; first jazz artist featured on the cover of Time Magazine.",
    },
    {
      name: "Elvis Presley",
      years: "1935 – 1977",
      description: "The undisputed King of Rock 'n' Roll who catalyzed youth culture and modernized musical performance.",
      imageKey: "elvisPresley",
      contribution: "Rock 'n' Roll & Trans-Genre Chart Domination",
      achievement: "Over 1 billion records sold worldwide; the best-selling solo artist of all time.",
    },
    {
      name: "Marilyn Monroe",
      years: "1926 – 1962",
      description: "The ultimate Hollywood icon whose star power and image defined 20th-century pop culture glamour.",
      imageKey: "marilynMonroe",
      contribution: "Hollywood Stardom & Photogenic Iconography",
      achievement: "Her films grossed over $200 million by the time of her death in 1962.",
    },
    {
      name: "Mark Twain",
      years: "1835 – 1910",
      description: "The great American humorist who captured the democratic, energetic voice of a growing nation.",
      imageKey: "markTwain",
      contribution: "Vernacular Literature & Democratic Realism",
      achievement: "Universally recognized as the 'father of American literature'; translated into 120+ languages.",
    },
    {
      name: "Muhammad Ali",
      years: "1942 – 2016",
      description: "The champion athlete and cultural force whose principles and charisma transcended sports globally.",
      imageKey: "muhammadAli",
      contribution: "Heavyweight Boxing & Athlete Activism",
      achievement: "The only three-time lineal heavyweight champion; over 1 billion viewers watched the 1974 'Rumble in the Jungle'.",
    },
    {
      name: "Michael Jackson",
      years: "1958 – 2009",
      description: "The King of Pop whose music videos, dance, and scale revolutionized global entertainment.",
      imageKey: "michaelJackson",
      contribution: "Pop Performance & Cinematic Music Videos",
      achievement: "'Thriller' remains the best-selling music album of all time (70M+ copies).",
    },
    {
      name: "Michael Jordan",
      years: "born 1963",
      description: "The basketball legend who transformed sports into a global marketing and endorsement powerhouse.",
      imageKey: "michaelJordan",
      contribution: "Athletic Brand Endorsements & Sneaker Culture",
      achievement: "Transformed the Nike Jordan Brand into a global powerhouse generating $6.6B+ annually.",
    },
    {
      name: "Martin Luther King Jr.",
      years: "1929 – 1968",
      description: "The moral voice of civil rights whose vision of liberty reshaped the nation's democratic conscience.",
      imageKey: "martinLutherKing",
      contribution: "Civil Rights Rhetoric & Moral Mobilization",
      achievement: "Led the 1963 March on Washington (250,000+ marchers); youngest Nobel Peace Prize laureate in 1964.",
    },
    {
      name: "Arnold Schwarzenegger",
      years: "born 1947",
      description: "The immigrant bodybuilder who conquered Hollywood and became the ultimate global action archetype.",
      imageKey: "arnoldSchwarzenegger",
      contribution: "Transnational Action Cinema & Fitness Industry",
      achievement: "His films grossed over $4 billion globally; served as California's first immigrant governor in 150 years.",
    },
  ],
};

const CULTURE_ICONS_RO: CultureIconsSectionData = {
  eyebrow: "AMBASADORI CULTURALI · CHIPURILE AMERICII",
  title: "REPREZENTAREA PRIN PERSONALITATE",
  deck: "Spre deosebire de alte națiuni, America nu are un minister al culturii. Nu își exportă stilul de viață prin mandate de stat. În schimb, fața globală a Americii a fost construită de indivizi—visători ambițioși, rebelii și creatori ale căror talent și determinare au fost răsplătite de piețele libere la scară globală.",
  icons: [
    {
      name: "Walt Disney",
      years: "1901 – 1966",
      description: "A fost pionierul cinematografiei de animație și a construit modelul global de franciză al imaginației infantile.",
      imageKey: "waltDisney",
      contribution: "Cinematografie de Animație & Franciză Globală",
      achievement: "Deține recordul istoric pentru cele mai multe premii Oscar câștigate (26).",
    },
    {
      name: "Louis Armstrong",
      years: "1901 – 1971",
      description: "Virtuozul fondator al jazzului care a proiectat libertatea muzicală americană pe scena globală.",
      imageKey: "louisArmstrong",
      contribution: "Virtuozitate în Jazz & Improvizație",
      achievement: "Carieră de peste 6 decenii; primul artist de jazz pe coperta revistei Time.",
    },
    {
      name: "Elvis Presley",
      years: "1935 – 1977",
      description: "Regele incontestabil al Rock 'n' Roll-ului care a catalizat cultura tineretului și a modernizat spectacolul muzical.",
      imageKey: "elvisPresley",
      contribution: "Rock 'n' Roll & Dominarea Topurilor Trans-Gen",
      achievement: "Peste 1 miliard de discuri vândute; cel mai bine vândut artist solo din istorie.",
    },
    {
      name: "Marilyn Monroe",
      years: "1926 – 1962",
      description: "Cea mai mare pictogramă de la Hollywood a cărei imagine a definit farmecul culturii pop din secolul XX.",
      imageKey: "marilynMonroe",
      contribution: "Star de Hollywood & Iconografie Fotogenică",
      achievement: "Filmele sale au încasat peste 200 de milioane de dolari până în anul 1962.",
    },
    {
      name: "Mark Twain",
      years: "1835 – 1910",
      description: "Marele umorist american care a surprins vocea democratică și plină de energie a unei națiuni în creștere.",
      imageKey: "markTwain",
      contribution: "Literatură Vernaculară & Realism Democratic",
      achievement: "Recunoscut la nivel mondial drept 'părintele literaturii americane'; tradus în peste 120 de limbi.",
    },
    {
      name: "Muhammad Ali",
      years: "1942 – 2016",
      description: "Campionul atlet și forța culturală ale cărui principii și carismă au transcens sportul la nivel global.",
      imageKey: "muhammadAli",
      contribution: "Box la Categoria Grea & Activism Sportiv",
      achievement: "Singurul triplu campion liniar de categorie grea; peste 1 miliard de telespectatori la 'Rumble in the Jungle'.",
    },
    {
      name: "Michael Jackson",
      years: "1958 – 2009",
      description: "Regele Pop a cărui muzică, dans și amploare au revoluționat divertismentul global.",
      imageKey: "michaelJackson",
      contribution: "Performanță Pop & Videoclipuri Muzicale Cinematografice",
      achievement: "'Thriller' rămâne cel mai bine vândut album din toate timpurile (peste 70 mil. copii).",
    },
    {
      name: "Michael Jordan",
      years: "născut 1963",
      description: "Legenda baschetului care a transformat sportul într-o forță globală de marketing și publicitate.",
      imageKey: "michaelJordan",
      contribution: "Branding Sportiv & Cultura Sneakerșilor",
      achievement: "A dezvoltat brandul Nike Jordan într-o forță globală ce generează peste 6.6 miliarde de dolari anual.",
    },
    {
      name: "Martin Luther King Jr.",
      years: "1929 – 1968",
      description: "Vocea morală a drepturilor civile a cărei viziune despre libertate a remodelat conștiința democratică.",
      imageKey: "martinLutherKing",
      contribution: "Retorică pentru Drepturi Civile & Mobilizare Morală",
      achievement: "A condus Marșul asupra Washingtonului (peste 250.000 de participanți); cel mai tânăr laureat al Premiului Nobel pentru Pace în 1964.",
    },
    {
      name: "Arnold Schwarzenegger",
      years: "născut 1947",
      description: "Culturistul imigrant care a cucerit Hollywood-ul și a devenit arhetipul suprem al filmelor de acțiune globale.",
      imageKey: "arnoldSchwarzenegger",
      contribution: "Cinematografie de Acțiune Transnațională & Industria Fitnessului",
      achievement: "Filmele sale au încasat peste 4 miliarde de dolari; a fost primul guvernator imigrant al Californiei în 150 de ani.",
    },
  ],
};

export function getCultureIcons(locale: Locale): CultureIconsSectionData {
  return locale === "ro" ? CULTURE_ICONS_RO : CULTURE_ICONS_EN;
}

// ─── Hollywood Dream Factory data ───────────────────────────────────────────

export interface CultureHollywoodStat {
  value: string;
  label: string;
}

export interface CultureHollywoodData {
  eyebrow: string;
  headline: string;
  pullQuote: string;
  body: string;
  stats: CultureHollywoodStat[];
  ctaText: string;
}

const HOLLYWOOD_EN: CultureHollywoodData = {
  eyebrow: "THE DREAM FACTORY · HOLLYWOOD",
  headline: "THE UNIVERSAL LANGUAGE OF IMAGINATION",
  pullQuote: "Hollywood exported the subconscious desires of the world, turning local American dreams into a planetary vocabulary.",
  body: "Cinema is America's ultimate soft power engine. Long before they ever encounter an American in person, teenagers from Bucharest to Bangalore grow up dreaming of the palm trees of Los Angeles, the skylines of New York, and the highways of the American West. This planetary draw operates as a market-driven force, independent of state projects. US films routinely capture over 70% of global box office revenues, and the Academy Awards are broadcast to a global audience of over 200 countries. By building the definitive narrative grammar of the feature film, Hollywood created a global mirror: a universal language of hope, struggle, and heroism that the world freely chose to adopt.",
  stats: [
    { value: "73.5%", label: "Global Box Office Revenue Share" },
    { value: "200+", label: "Countries Broadcasting the Oscars" },
  ],
  ctaText: "Explore the Archive Vault",
};

const HOLLYWOOD_RO: CultureHollywoodData = {
  eyebrow: "FABRICA DE VISURI · HOLLYWOOD",
  headline: "LIMBAJUL UNIVERSAL AL IMAGINAȚIEI",
  pullQuote: "Hollywood-ul a exportat dorințele subconștiente ale lumii, transformând visurile locale americane într-un vocabular planetar.",
  body: "Cinematografia este motorul suprem de putere soft al Americii. Mult înainte de a întâlni vreodată un american în persoană, adolescenții de la București la Bangalore cresc visând la palmierii din Los Angeles, zgârie-norii din New York și autostrăzile vestului american. Această atracție planetară funcționează ca o forță condusă de piață, complet independentă de proiectele guvernamentale. Filmele americane captează în mod regulat peste 70% din veniturile globale din box office, iar Premiile Oscar sunt difuzate în peste 200 de țări. Prin crearea gramaticii narative definitorii a filmului de lungmetraj, Hollywood-ul a creat o oglindă globală: un limbaj universal al speranței, luptei și eroismului pe care lumea a ales liber să-l adopte.",
  stats: [
    { value: "73,5%", label: "Cota din Veniturile Box Office Global" },
    { value: "200+", label: "Țări care Difuzează Premiile Oscar" },
  ],
  ctaText: "Explorează Arhiva Culturală",
};

export function getCultureHollywood(locale: Locale): CultureHollywoodData {
  return locale === "ro" ? HOLLYWOOD_RO : HOLLYWOOD_EN;
}

export interface CultureManifestoVertical {
  title: string;
  subtitle: string;
  href: string;
}

export interface CultureManifestoData {
  eyebrow: string;
  statement: string;
  body: string;
  ctaLabel: string;
  verticals: CultureManifestoVertical[];
}

const MANIFESTO_EN: CultureManifestoData = {
  eyebrow: "THE AMERICAN MANIFESTO",
  statement: "This isn't accidental. It's the consequence of a very specific idea about what happens when you leave human ambition free.",
  body: "America's global cultural footprint represents the downstream consequence of a single, revolutionary context: a system that secures individual liberty, protects private enterprise, and trusts voluntary exchange. When you leave the human imagination free from state coercion, people create forms that the rest of the world freely chooses to listen to, watch, stream, and adopt. The ultimate soft power is the power of free choices.",
  ctaLabel: "Continue the Journey",
  verticals: [
    { title: "Constitution", subtitle: "The Bedrock of Liberty", href: "/constitution" },
    { title: "Economy", subtitle: "The Engine of Enterprise", href: "/economy" },
    { title: "Military", subtitle: "The Shield of Democracy", href: "/military" },
  ],
};

const MANIFESTO_RO: CultureManifestoData = {
  eyebrow: "MANIFESTUL AMERICAN",
  statement: "Acest lucru nu este accidental. Consecința unei idei foarte specifice despre ceea ce se întâmplă atunci când lași ambiția umană liberă.",
  body: "Amprenta culturală globală a Americii reprezintă consecința directă a unui singur context revoluționar: un sistem care garantează libertatea individuală, protejează inițiativa privată și are încredere în schimbul voluntar. Atunci când lași imaginația umană liberă de constrângerea statului, oamenii creează formate pe care restul lumii alege în mod liber să le asculte, să le privească, să le acceseze și să le adopte. Puterea soft supremă este puterea alegerilor libere.",
  ctaLabel: "Continuă călătoria",
  verticals: [
    { title: "Constituție", subtitle: "Fundamentul Libertății", href: "/constitution" },
    { title: "Economie", subtitle: "Motorul Inițiativei", href: "/economy" },
    { title: "Armată", subtitle: "Scutul Democrației", href: "/military" },
  ],
};

export function getCultureManifesto(locale: Locale): CultureManifestoData {
  return locale === "ro" ? MANIFESTO_RO : MANIFESTO_EN;
}

export interface CultureEnglishDomain {
  name: string;
  percentage: number;
  description: string;
}

export interface CultureEnglishLanguageData {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  domains: CultureEnglishDomain[];
}

const ENGLISH_LANGUAGE_EN: CultureEnglishLanguageData = {
  eyebrow: "THE GLOBAL STANDARD · LINGUA FRANCA",
  headline: "THE INVISIBLE EXPORT: AMERICA'S LINGUISTIC GRAVITY",
  paragraphs: [
    "America's most powerful export operates without government promotion, budget, or ministerial distribution. The English language has become the universal operating system of modern civilization, serving as the compounding, gravity-well medium for every prestigious domain of human activity simultaneously.",
    "In science, it is the currency of discovery; over 90% of peer-reviewed research papers are indexed in English, ensuring that a scientist in Munich communicates with a researcher in Mumbai through a single vocabulary. In the skies, the International Civil Aviation Organization mandates English for all air traffic control. In commerce and global finance, it is the bedrock of international contracts, transactions, and trade negotiations. It serves as the universal connector of a globalized world.",
    "Perhaps nowhere is this more visible than in code. Every programmer in São Paulo, Seoul, or Stockholm writes in English syntax—typing `if`, `while`, `function`, and `return`. America exported both the software and the language of logic itself. This standard functions as a massive efficiency engine: a voluntary global agreement that allows human collaboration to scale infinitely."
  ],
  domains: [
    { name: "Software & Coding", percentage: 100, description: "Every major programming language uses English keywords." },
    { name: "Scientific Research", percentage: 90, description: "Linguistic share of indexed peer-reviewed papers." },
    { name: "Aviation & Space", percentage: 100, description: "Mandatory standard for global air traffic control." },
    { name: "International Finance", percentage: 85, description: "Bedrock language of cross-border financial transactions." },
    { name: "Pop Music & Streaming", percentage: 70, description: "Representation on global chart-topping tracks." }
  ]
};

const ENGLISH_LANGUAGE_RO: CultureEnglishLanguageData = {
  eyebrow: "STANDARDIZAREA GLOBALĂ · LINGUA FRANCA",
  headline: "EXPORTUL INVIZIBIL: GRAVITAȚIA LINGVISTICĂ A AMERICII",
  paragraphs: [
    "Cel mai puternic export al Americii funcționează fără promovare guvernamentală, bugete sau distribuție ministerială. Limba engleză a devenit sistemul universal de operare al civilizației moderne, servind ca mediu de convergență gravitațională pentru fiecare domeniu prestigios al activității umane.",
    "În știință, engleza reprezintă moneda descoperirii; peste 90% din lucrările de cercetare evaluate de colegi sunt indexate în engleză, asigurând că un om de știință din München comunică cu un cercetător din Mumbai printr-un vocabular comun. În aer, Organizația Aviației Civile Internaționale mandatează engleza pentru controlul traficului aerian. În comerț și finanțe, constituie fundamentul contractelor internaționale, al tranzacțiilor și al negocierilor transfrontaliere.",
    "Cel mai elocvent exemplu este codul sursă. Fiecare programator din São Paulo, Seul sau Stockholm scrie în sintaxă engleză—tastând `if`, `while`, `function` și `return`. America a exportat deopotrivă software-ul și limbajul logicii în sine. Acest standard funcționează ca un motor masiv de eficiență: un acord global voluntar care permite colaborării umane să se dezvolte la scară mondială."
  ],
  domains: [
    { name: "Programare și Sintaxă", percentage: 100, description: "Fiecare limbaj major utilizează cuvinte-cheie în engleză." },
    { name: "Cercetare Științifică", percentage: 90, description: "Ponderea lingvistică în revistele academice indexate." },
    { name: "Aviație și Spațiu", percentage: 100, description: "Standard obligatoriu în controlul traficului aerian." },
    { name: "Finanțe Internaționale", percentage: 85, description: "Limba de bază a tranzacțiilor transfrontaliere." },
    { name: "Muzică Pop și Streaming", percentage: 70, description: "Prezență în topurile muzicale globale." }
  ]
};

export function getCultureEnglishLanguage(locale: Locale): CultureEnglishLanguageData {
  return locale === "ro" ? ENGLISH_LANGUAGE_RO : ENGLISH_LANGUAGE_EN;
}







