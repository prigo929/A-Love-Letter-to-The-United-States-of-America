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
];

export const BRAND_LOGOS_ROW_2 = [
  { name: "Microsoft", file: "Microsoft_Logo_0.svg" },
  { name: "Tesla", file: "tesla.svg", invert: true },
  { name: "Uber", file: "Uber_logo_2018.svg", invert: true },
  { name: "Walmart", file: "Walmart_logo_(2008).svg" },
  { name: "Target", file: "Target_logo.svg" },
  { name: "Instagram", file: "Instagram_Logo_0.svg", invert: true },
  { name: "YouTube", file: "YouTube_full-color_icon_(2017).svg" },
  { name: "Airbnb", file: "Airbnb_Logo_Bélo.svg" },
  { name: "SpaceX", file: "spacex.svg", invert: true },
  { name: "NVIDIA", file: "nvidia.svg", invert: true },
  { name: "Adobe", file: "adobe.svg", invert: true },
  { name: "Warner Bros.", file: "Warner_Bros-_Logo_0.svg", invert: true },
  { name: "Converse", file: "Converse_logo.svg", invert: true },
  { name: "Ralph Lauren", file: "Ralph_Lauren_id4gNvWZ8Z_0.svg", invert: true },
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
];
