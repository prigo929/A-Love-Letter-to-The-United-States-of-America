// ─── App Constants ────────────────────────────────────────────────────────────
// Single source of truth for:
// - site metadata (name, description, URL)
// - reusable colors
// - top navigation structure
// - hero carousel images
//
// Beginners: if you want to change text in the header menu, start in
// NAV_SECTIONS below. If you want to change the home page hero slideshow,
// start in HERO_IMAGES at the bottom of this file.

import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

// ─── Colors (mirrors tailwind.config.ts) ─────────────────────────────────────
export const COLORS = {
  gloryRed: "#B22234",
  gloryRedDark: "#8B1A26",
  gloryRedLight: "#D4404F",
  gloryBlue: "#3C3B6E",
  gloryBlueDark: "#2a2950",
  gloryBlueLight: "#5554A0",
  gloryGold: "#FFD700",
  gloryGoldDark: "#CC9900",
  navyDark: "#000000",
  navyMid: "#050608",
  navyLight: "#0d1117",
  parchment: "#F5F0E8",
  parchmentDark: "#E8E0CC",
} as const;

// ─── Site Metadata ────────────────────────────────────────────────────────────
export const SITE = {
  name: "America: The Greatest Nation",
  tagline: "The Greatest Nation in the History of Human Civilization",
  description:
    "A cinematic celebration of the United States of America — its history, achievements, natural wonders, and enduring promise.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://americagreatest.com",
  og: "/images/og-default.jpg",
  twitter: "@AmericaGreatest",
  founded: 1776,
} as const;

// ─── Navigation Structure ─────────────────────────────────────────────────────
// Powers both the header mega-menu and the sitemap page.
//
// Each section card in the navigation is data-driven:
// - `title` is the visible section name
// - `href` is where it links
// - `imageSrc` is the image shown in the menu card
// - `items` are the submenu links

export const NAV_SECTIONS = [
  {
    title: "Economy",
    href: "/economy",
    description: "The engine of the world — $32.4T GDP and counting",
    imageSrc: SITE_IMAGES.economyNYSEUpsideDown,
    badge: "$32.4T GDP",
    items: [
      {
        label: "GDP & Scale",
        href: "/economy/gdp-growth",
        description: "The largest economy on Earth",
      },
      {
        label: "Capital Markets",
        href: "/economy/capital-markets",
        description: "NYSE, NASDAQ & Wall Street",
      },
      {
        label: "Venture Capital",
        href: "/economy/startups-venture-capital",
        description: "50% of global VC flows here",
      },
      {
        label: "Dollar Dominance",
        href: "/economy/dollar-dominance",
        description: "The world's reserve currency",
      },
      {
        label: "Trade & Exports",
        href: "/economy/trade-and-exports",
        description: "America powers global commerce",
      },
    ],
  },
  {
    title: "Nature",
    href: "/nature",
    description: "From the Arctic to the tropics — unrivaled natural beauty",
    imageSrc: SITE_IMAGES.grandTeton,
    badge: "63 National Parks",
    items: [
      {
        label: "National Parks",
        href: "/nature/national-parks",
        description: "63 parks across 85 million acres",
      },
      {
        label: "Alaska",
        href: "/nature/alaska",
        description: "The last frontier",
      },
      {
        label: "Rocky Mountains",
        href: "/nature/rockies",
        description: "53 peaks over 14,000 feet",
      },
      {
        label: "Grand Canyon",
        href: "/nature/grand-canyon",
        description: "One mile deep, 277 miles long",
      },
      {
        label: "Yellowstone",
        href: "/nature/yellowstone",
        description: "The world's first national park",
      },
      {
        label: "Great Lakes",
        href: "/nature/great-lakes",
        description: "21% of Earth's fresh surface water",
      },
    ],
  },
  {
    title: "Military",
    href: "/military",
    description: "The most powerful military in the history of civilization",
    imageSrc: SITE_IMAGES.homeAirForcePlane,
    badge: "$954B Budget",
    items: [
      {
        label: "US Navy",
        href: "/military/navy",
        description: "11 carrier strike groups",
      },
      {
        label: "US Air Force",
        href: "/military/air-force",
        description: "Most advanced in history",
      },
      {
        label: "Space Force",
        href: "/military/space-force",
        description: "The world's first space branch",
      },
      {
        label: "Global Bases",
        href: "/military/global-bases",
        description: "800+ bases in 80+ countries",
      },
      {
        label: "Intelligence",
        href: "/military/intelligence",
        description: "CIA, NSA, DIA — unmatched reach",
      },
    ],
  },
  {
    title: "Constitution",
    href: "/constitution",
    description: "250 years of unbroken democratic government",
    imageSrc: SITE_IMAGES.constitutionDocument,
    badge: "Est. 1776",
    items: [
      {
        label: "Bill of Rights",
        href: "/constitution/bill-of-rights",
        description: "The first 10 amendments",
      },
      {
        label: "First Amendment",
        href: "/constitution/first-amendment",
        description: "Broadest free speech on Earth",
      },
      {
        label: "Second Amendment",
        href: "/constitution/second-amendment",
        description: "The right to bear arms",
      },
      {
        label: "Federalism",
        href: "/constitution/federalism",
        description: "Laboratories of democracy",
      },
      {
        label: "Separation of Powers",
        href: "/constitution/separation-of-powers",
        description: "Tyranny made nearly impossible",
      },
      {
        label: "Electoral Archive Map",
        href: "/constitution/electoral-map",
        description: "Historical 50-state interactive map",
      },
    ],
  },
  {
    title: "Culture",
    href: "/culture",
    description: "America didn't just build a nation — it built global culture",
    imageSrc: SITE_IMAGES.cultureFlagCrowd,
    badge: "Global Culture",
    items: [
      {
        label: "Film & Storytelling",
        href: "/culture/film-and-storytelling",
        description: "Hollywood and the syntax of human dreaming",
      },
      {
        label: "Sports",
        href: "/culture/sports",
        description: "NFL, NBA, MLB, and the soft-power of sports",
      },
      {
        label: "Entertainment",
        href: "/culture/entertainment",
        description: "Netflix, Disney, and the global attention machine",
      },
      {
        label: "Companies & Brands",
        href: "/culture/companies-brands",
        description: "Levi's, Coca-Cola, Apple, and the Logo Empire",
      },
      {
        label: "Food & Drinks",
        href: "/culture/food-and-drinks",
        description: "Diners, fast food, and the democratic palate",
      },
      {
        label: "Music Genres",
        href: "/culture/music-genres",
        description: "Jazz, Blues, Rock, and Hip Hop origins",
      },
      {
        label: "Fashion",
        href: "/culture/fashion",
        description: "Blue jeans, sneakers, and streetwear rebellion",
      },
      {
        label: "English Language",
        href: "/culture/english-language",
        description: "The lingua franca of science, aviation, and code",
      },
    ],
  },
  {
    title: "Innovation",
    href: "/innovation",
    description: "The internet, the iPhone, AI — all made in America",
    imageSrc: SITE_IMAGES.homeSiliconValley,
    badge: "Silicon Valley",
    items: [
      {
        label: "The Internet",
        href: "/innovation/internet-history",
        description: "ARPANET to the World Wide Web",
      },
      {
        label: "AI & Tech",
        href: "/innovation/ai-and-tech",
        description: "OpenAI, Google, Anthropic lead the way",
      },
      {
        label: "Smartphones",
        href: "/innovation/smartphones",
        description: "iPhone changed the world",
      },
      {
        label: "Cloud Computing",
        href: "/innovation/cloud-computing",
        description: "AWS powers the internet",
      },
      {
        label: "Space Technology",
        href: "/innovation/space-technology",
        description: "NASA to SpaceX",
      },
      {
        label: "Gaming",
        href: "/innovation/gaming",
        description: "Atari to Epic Games",
      },
    ],
  },
  {
    title: "Science",
    href: "/science",
    description: "They built the modern world, one invention at a time",
    imageSrc: SITE_IMAGES.scienceLab,
    badge: "400+ Nobel Prizes",
    items: [
      {
        label: "Inventions Pre-1890",
        href: "/science/inventions-pre-1890",
        description: "Telegraph, lightbulb, telephone",
      },
      {
        label: "Inventions 1890-1945",
        href: "/science/inventions-1890-1945",
        description: "Airplane, assembly line, nuclear fission",
      },
      {
        label: "Post-War Miracles",
        href: "/science/inventions-post-1991",
        description: "Transistor, microchip, internet",
      },
      {
        label: "Medicine & Biotech",
        href: "/science/medicine-and-biotech",
        description: "NIH, vaccines, cancer breakthroughs",
      },
    ],
  },
  {
    title: "Universities",
    href: "/universities",
    description: "7 of the top 10 universities in the world are American",
    imageSrc: SITE_IMAGES.harvardCampus,
    badge: "Top of the World",
    items: [
      {
        label: "Ivy League",
        href: "/universities/ivy-league",
        description: "Harvard, Yale, Princeton & more",
      },
      {
        label: "STEM Powerhouses",
        href: "/universities/stem-powerhouses",
        description: "MIT, Stanford, Caltech",
      },
      {
        label: "Business Schools",
        href: "/universities/business-schools",
        description: "HBS, Wharton, Booth",
      },
      {
        label: "Public Research",
        href: "/universities/public-research-universities",
        description: "Berkeley, Michigan, UT Austin",
      },
    ],
  },
  {
    title: "Quality of Life",
    href: "/quality-of-life",
    description: "The highest standard of living for the most people",
    imageSrc: SITE_IMAGES.qualityOfLifeHouse,
    badge: "American Dream",
    items: [
      {
        label: "Overview",
        href: "/quality-of-life",
        description: "Quality of life section landing page",
      },
      {
        label: "Housing & Real Estate",
        href: "/quality-of-life/housing",
        description: "Largest homes, 30-year mortgage, suburban wealth-building",
      },
      {
        label: "Healthcare Outcomes",
        href: "/quality-of-life/healthcare",
        description: "Cancer survival rates, diagnostic density, pharma leadership",
      },
      {
        label: "Wages & Purchasing Power",
        href: "/quality-of-life/wages",
        description: "OECD PPP rankings, disposable income, food costs",
      },
      {
        label: "Consumer Abundance",
        href: "/quality-of-life/abundance",
        description: "AC, cars, pools, boats — the density of American consumer goods",
      },
      {
        label: "America vs. the World",
        href: "/quality-of-life/america-vs-the-world",
        description: "Normal American excellence vs. the developed world — Houston vs. Iași",
      },
    ],
  },
  {
    title: "Global Leadership",
    href: "/global-leadership",
    description: "The indispensable nation — leading the free world since 1945",
    imageSrc: SITE_IMAGES.globalLeadership,
    badge: "Free World Leader",
    items: [
      {
        label: "NATO Alliance",
        href: "/global-leadership/nato",
        description: "Leading 32 nations in collective defense",
      },
      {
        label: "UN & World Order",
        href: "/global-leadership/un",
        description: "Founder of the postwar multilateral order",
      },
      {
        label: "Pax Americana",
        href: "/global-leadership/pax-americana",
        description: "750+ bases, 11 carrier groups, global reach",
      },
      {
        label: "Foreign Policy",
        href: "/global-leadership/foreign-policy",
        description: "Monroe Doctrine to modern diplomacy",
      },
    ],
  },
  {
    title: "History",
    href: "/history",
    description: "From founding principles to modern times — the history of liberty",
    imageSrc: SITE_IMAGES.homeDeclarationIndependence,
    badge: "1776 - Present",
    items: [
      {
        label: "Founding Principles",
        href: "/history/founding-principles",
        description: "Natural rights and constitutional republic",
      },
      {
        label: "American Exceptionalism",
        href: "/history/american-exceptionalism",
        description: "Liberty-first political culture",
      },
      {
        label: "Frontier & Expansion",
        href: "/history/frontier-and-expansion",
        description: "Westward expansion and individual pioneers",
      },
      {
        label: "Union & Liberty",
        href: "/history/union-and-liberty",
        description: "Lincoln, abolition, and preservation of the Union",
      },
      {
        label: "Industrial Rise",
        href: "/history/industrial-rise",
        description: "Rise of American capitalism and entrepreneurship",
      },
      {
        label: "Arsenal of Democracy",
        href: "/history/arsenal-of-democracy",
        description: "WWII mobilization and industrial supremacy",
      },
      {
        label: "Cold War",
        href: "/history/cold-war-and-anti-communism",
        description: "Containment and collapse of the USSR",
      },
      {
        label: "The American Dream",
        href: "/history/the-american-dream",
        description: "Postwar prosperity, suburbs, and mobility",
      },
      {
        label: "Reagan Revolution",
        href: "/history/the-reagan-revolution",
        description: "Conservative revival and patriotism",
      },
      {
        label: "Faith & Family",
        href: "/history/faith-family-and-community",
        description: "Churches, civic associations, and moral culture",
      },
      {
        label: "Free Markets",
        href: "/history/free-markets-and-prosperity",
        description: "Capitalism vs socialism and prosperity",
      },
      {
        label: "Border Sovereignty",
        href: "/history/border-sovereignty-and-national-identity",
        description: "Immigration, assimilation, and border policy",
      },
      {
        label: "Constitutional Battles",
        href: "/history/constitutional-battles",
        description: "Originalism, states' rights, and free speech",
      },
      {
        label: "Post-9/11 America",
        href: "/history/post-9-11-america",
        description: "War on terror and security state",
      },
      {
        label: "The Populist Era",
        href: "/history/the-populist-era",
        description: "MAGA, Tea Party, and globalization backlash",
      },
    ],
  },
  {
    title: "Data & Media",
    href: "/data",
    description: "Empirical facts, media, interactive maps, and indices of success",
    imageSrc: SITE_IMAGES.homeUsaAtNightFromSpace,
    badge: "Facts & Stats",
    items: [
      {
        label: "US Profile",
        href: "/united-states",
        description: "Complete profile: history, geography, government, culture",
      },
      {
        label: "Immigration & Demographics",
        href: "/immigration-demographics",
        description: "Bilingual profile of population and immigration dynamics",
      },
      {
        label: "Photo Gallery",
        href: "/gallery",
        description: "Bespoke high-fidelity visual gallery",
      },
      {
        label: "Map Explorer",
        href: "/explorer",
        description: "Interactive 50-state regional facts",
      },
      {
        label: "Misconceptions",
        href: "/data/misconceptions",
        description: "Debunking common myths and narratives",
      },
      {
        label: "Ask America Oracle",
        href: "/interactive",
        description:
          "AI oracle: ask a question and get a sourced answer synthesized from all 12 verticals",
      },
    ],
  },
] as const;

// These images rotate in the full-screen homepage hero.
// To swap one, replace the `src` value with another SITE_IMAGES entry and
// update the `alt` text so it still describes the new photo accurately.
export const HERO_IMAGES = [
  {
    id: "declaration-independence",
    src: SITE_IMAGES.homeDeclarationIndependence,
    alt: "Declaration of Independence with patriotic styling and founding-era symbolism",
  },
  {
    id: "golden-gate-bridge",
    src: SITE_IMAGES.homeGoldenGateBridge,
    alt: "Golden Gate Bridge rising through coastal light and fog",
  },
  {
    id: "spacex-launch",
    src: SITE_IMAGES.homeSpacexLaunch,
    alt: "SpaceX rocket launch lifting into the sky",
  },
  {
    id: "new-york-sunset",
    src: SITE_IMAGES.homeNycSunset,
    alt: "New York skyline at sunset with the city glowing in warm light",
  },
  {
    id: "usa-at-night-from-space",
    src: SITE_IMAGES.homeUsaAtNightFromSpace,
    alt: "The United States at night as seen from space",
  },
] as const;

const NAV_SECTION_TRANSLATIONS_RO: Record<
  string,
  {
    title: string;
    description: string;
    badge?: string;
    items: Record<string, { label: string; description: string }>;
  }
> = {
  "/economy": {
    title: "Economie",
    description: "Motorul lumii — PIB de 32,4 trilioane de dolari și în creștere",
    badge: "$32,4T PIB",
    items: {
      "/economy/gdp-growth": {
        label: "PIB și Dimensiune",
        description: "Cea mai mare economie de pe Pământ",
      },
      "/economy/capital-markets": {
        label: "Piețe de Capital",
        description: "NYSE, NASDAQ și Wall Street",
      },
      "/economy/startups-venture-capital": {
        label: "Capital de Risc",
        description: "50% din venture capitalul global ajunge aici",
      },
      "/economy/dollar-dominance": {
        label: "Dominația Dolarului",
        description: "Moneda de rezervă a lumii",
      },
      "/economy/trade-and-exports": {
        label: "Comerț și Exporturi",
        description: "America alimentează comerțul global",
      },
    },
  },
  "/nature": {
    title: "Natură",
    description: "Din Arctica până la tropice — frumusețe naturală fără rival",
    badge: "63 Parcuri Naționale",
    items: {
      "/nature/national-parks": {
        label: "Parcuri Naționale",
        description: "63 de parcuri pe 85 de milioane de acri",
      },
      "/nature/alaska": {
        label: "Alaska",
        description: "Ultima frontieră",
      },
      "/nature/rockies": {
        label: "Munții Stâncoși",
        description: "53 de vârfuri de peste 14.000 de picioare",
      },
      "/nature/grand-canyon": {
        label: "Grand Canyon",
        description: "Un mile adâncime, 277 de mile lungime",
      },
      "/nature/yellowstone": {
        label: "Yellowstone",
        description: "Primul parc național din lume",
      },
      "/nature/great-lakes": {
        label: "Marile Lacuri",
        description: "21% din apa dulce de la suprafață a Pământului",
      },
    },
  },
  "/military": {
    title: "Armată",
    description:
      "Cea mai puternică forță militară din istoria civilizației",
    badge: "Buget de 954 Mld. $",
    items: {
      "/military/navy": {
        label: "Marina SUA",
        description: "11 grupuri de atac cu portavion",
      },
      "/military/air-force": {
        label: "Forțele Aeriene SUA",
        description: "Cele mai avansate din istorie",
      },
      "/military/space-force": {
        label: "Forța Spațială",
        description: "Prima armă spațială din lume",
      },
      "/military/global-bases": {
        label: "Baze Globale",
        description: "Peste 800 de baze în peste 80 de țări",
      },
      "/military/intelligence": {
        label: "Informații",
        description: "CIA, NSA, DIA — anvergură fără egal",
      },
    },
  },
  "/constitution": {
    title: "Constituție",
    description: "250 de ani de guvernare democratică neîntreruptă",
    badge: "Fondată în 1776",
    items: {
      "/constitution/bill-of-rights": {
        label: "Carta Drepturilor",
        description: "Primele 10 amendamente",
      },
      "/constitution/first-amendment": {
        label: "Primul Amendament",
        description: "Cea mai largă libertate de exprimare de pe Pământ",
      },
      "/constitution/second-amendment": {
        label: "Al Doilea Amendament",
        description: "Dreptul de a purta arme",
      },
      "/constitution/federalism": {
        label: "Federalism",
        description: "Laboratoare ale democrației",
      },
      "/constitution/separation-of-powers": {
        label: "Separarea Puterilor",
        description: "Tirania devine aproape imposibilă",
      },
      "/constitution/electoral-map": {
        label: "Arhiva Electorală",
        description: "Harta interactivă istorică a celor 50 de state",
      },
    },
  },
  "/culture": {
    title: "Cultură",
    description:
      "America nu a construit doar o națiune — a construit cultura globală",
    badge: "Cultură Globală",
    items: {
      "/culture/film-and-storytelling": {
        label: "Film și Narativă",
        description: "Hollywood și sintaxa viselor umane",
      },
      "/culture/sports": {
        label: "Sport",
        description: "NFL, NBA, MLB și soft power-ul sportului",
      },
      "/culture/entertainment": {
        label: "Divertisment",
        description: "Netflix, Disney și mașina globală de atenție",
      },
      "/culture/companies-brands": {
        label: "Companii și Branduri",
        description: "Levi's, Coca-Cola, Apple și imperiul logo-urilor",
      },
      "/culture/food-and-drinks": {
        label: "Mâncare și Băuturi",
        description: "Diner-ul, fast-food-ul și gustul democratizat",
      },
      "/culture/music-genres": {
        label: "Genuri Muzicale",
        description: "Originile Jazz-ului, Blues-ului, Rock-ului și Hip Hop-ului",
      },
      "/culture/fashion": {
        label: "Modă",
        description: "Blugii, sneakerșii și rebeliunea streetwear",
      },
      "/culture/english-language": {
        label: "Limba Engleză",
        description: "Lingua franca a științei, aviației și codului",
      },
    },
  },
  "/innovation": {
    title: "Inovație",
    description:
      "Internetul, iPhone-ul, AI-ul — toate au fost create în America",
    badge: "Silicon Valley",
    items: {
      "/innovation/internet-history": {
        label: "Internetul",
        description: "De la ARPANET la World Wide Web",
      },
      "/innovation/ai-and-tech": {
        label: "AI și Tehnologie",
        description: "OpenAI, Google și Anthropic conduc drumul",
      },
      "/innovation/smartphones": {
        label: "Smartphone-uri",
        description: "iPhone-ul a schimbat lumea",
      },
      "/innovation/cloud-computing": {
        label: "Cloud Computing",
        description: "AWS alimentează internetul",
      },
      "/innovation/space-technology": {
        label: "Tehnologie Spațială",
        description: "De la NASA la SpaceX",
      },
      "/innovation/gaming": {
        label: "Gaming",
        description: "De la Atari la Epic Games",
      },
    },
  },
  "/science": {
    title: "Știință",
    description: "Au construit lumea modernă, invenție cu invenție",
    badge: "400+ Premii Nobel",
    items: {
      "/science/inventions-pre-1890": {
        label: "Invenții înainte de 1890",
        description: "Telegraf, bec, telefon",
      },
      "/science/inventions-1890-1945": {
        label: "Invenții 1890–1945",
        description: "Avion, bandă de asamblare, fisiune nucleară",
      },
      "/science/inventions-post-1991": {
        label: "Miracole Postbelice",
        description: "Tranzistor, microcip, internet",
      },
      "/science/medicine-and-biotech": {
        label: "Medicină și Biotehnologie",
        description: "NIH, vaccinuri, progrese medicale majore",
      },
    },
  },
  "/universities": {
    title: "Universități",
    description:
      "7 dintre primele 10 universități din lume sunt americane",
    badge: "În Vârful Lumii",
    items: {
      "/universities/ivy-league": {
        label: "Ivy League",
        description: "Harvard, Yale, Princeton și multe altele",
      },
      "/universities/stem-powerhouses": {
        label: "Centre STEM",
        description: "MIT, Stanford, Caltech",
      },
      "/universities/business-schools": {
        label: "Școli de Business",
        description: "HBS, Wharton, Booth",
      },
      "/universities/public-research-universities": {
        label: "Cercetare Publică",
        description: "Berkeley, Michigan, UT Austin",
      },
    },
  },
  "/quality-of-life": {
    title: "Calitatea Vieții",
    description: "Cel mai ridicat nivel de trai pentru cei mai mulți oameni",
    badge: "Visul American",
    items: {
      "/quality-of-life": {
        label: "Prezentare Generală",
        description: "Pagina principală a secțiunii despre nivelul de trai",
      },
      "/quality-of-life/housing": {
        label: "Locuințe și Imobiliare",
        description: "Cele mai mari case, ipoteca pe 30 ani, acumularea de avere",
      },
      "/quality-of-life/healthcare": {
        label: "Rezultate în Sănătate",
        description: "Supraviețuire cancer, densitate echipamente diagnostice",
      },
      "/quality-of-life/wages": {
        label: "Salarii și Putere de Cumpărare",
        description: "Clasamente OECD PPP, venituri disponibile, costuri alimentare",
      },
      "/quality-of-life/abundance": {
        label: "Abundență de Consum",
        description: "AC, mașini, bărci, piscine — densitatea bunurilor de consum",
      },
      "/quality-of-life/america-vs-the-world": {
        label: "America vs. Lumea",
        description: "Excelența americană obișnuită față de lumea dezvoltată",
      },
    },
  },
  "/global-leadership": {
    title: "Leadership Global",
    description:
      "Națiunea indispensabilă — conduce lumea liberă din 1945",
    badge: "Liderul Lumii Libere",
    items: {
      "/global-leadership/nato": {
        label: "Alianța NATO",
        description: "Conducând 32 de națiuni în apărarea colectivă",
      },
      "/global-leadership/un": {
        label: "ONU și Ordinea Mondială",
        description: "Fondatorul ordinii multilaterale postbelice",
      },
      "/global-leadership/pax-americana": {
        label: "Pax Americana",
        description: "750+ baze, 11 grupuri de portavioane",
      },
      "/global-leadership/foreign-policy": {
        label: "Politică Externă",
        description: "Doctrina Monroe până la diplomația modernă",
      },
    },
  },
  "/history": {
    title: "Istorie",
    description: "De la principiile fondatoare la timpurile moderne — istoria libertății",
    badge: "1776 - Prezent",
    items: {
      "/history/founding-principles": {
        label: "Principii Fondatoare",
        description: "Drepturile naturale și republica constituțională",
      },
      "/history/american-exceptionalism": {
        label: "Excepționalism American",
        description: "Cultura politică axată pe libertate",
      },
      "/history/frontier-and-expansion": {
        label: "Frontiera și Expansiunea",
        description: "Expansiunea spre vest și pionierii individuali",
      },
      "/history/union-and-liberty": {
        label: "Uniune și Libertate",
        description: "Lincoln, abolirea sclaviei și păstrarea Uniunii",
      },
      "/history/industrial-rise": {
        label: "Ascensiunea Industrială",
        description: "Dezvoltarea capitalismului american și a antreprenoriatului",
      },
      "/history/arsenal-of-democracy": {
        label: "Arsenalul Democrației",
        description: "Mobilizarea în al Doilea Război Mondial și supremația industrială",
      },
      "/history/cold-war-and-anti-communism": {
        label: "Războiul Rece",
        description: "Politica de îndiguire și prăbușirea URSS",
      },
      "/history/the-american-dream": {
        label: "Visul American",
        description: "Prosperitatea postbelică, suburbiile și mobilitatea socială",
      },
      "/history/the-reagan-revolution": {
        label: "Revoluția Reagan",
        description: "Revigorarea conservatoare și patriotismul",
      },
      "/history/faith-family-and-community": {
        label: "Credință și Familie",
        description: "Bisericile, asociațiile civice și cultura morală",
      },
      "/history/free-markets-and-prosperity": {
        label: "Piețe Libere",
        description: "Capitalism versus socialism și prosperitate",
      },
      "/history/border-sovereignty-and-national-identity": {
        label: "Suveranitatea Frontierelor",
        description: "Imigrația, asimilarea și politica de frontieră",
      },
      "/history/constitutional-battles": {
        label: "Bătălii Constituționale",
        description: "Originalismul, drepturile statelor și libertatea de exprimare",
      },
      "/history/post-9-11-america": {
        label: "America Post-9/11",
        description: "Războiul împotriva terorismului și statul de securitate națională",
      },
      "/history/the-populist-era": {
        label: "Era Populistă",
        description: "Mişcarea MAGA, Tea Party și reacția împotriva globalizării",
      },
    },
  },
  "/data": {
    title: "Date și Media",
    description: "Fapte empirice, media, hărți interactive și indici ai succesului",
    badge: "Fapte și Statistici",
    items: {
      "/united-states": {
        label: "Profilul SUA",
        description: "Profil complet: istorie, geografie, guvern, cultură",
      },
      "/immigration-demographics": {
        label: "Imigrație și Demografie",
        description: "Profil bilingv al dinamicii populației și imigrației",
      },
      "/gallery": {
        label: "Galerie Foto",
        description: "Galerie vizuală de înaltă fidelitate",
      },
      "/explorer": {
        label: "Explorator de Hartă",
        description: "Informații regionale interactive despre cele 50 de state",
      },
      "/data/misconceptions": {
        label: "Concepții Greșite",
        description: "Demistificarea miturilor și narațiunilor comune",
      },
      "/interactive": {
        label: "Oracolul Ask America",
        description:
          "Oracol AI: pune o întrebare și primești un răspuns documentat, sintetizat din toate cele 12 verticale",
      },
    },
  },
};

export function getLocalizedNavSections(locale: Locale) {
  if (locale === "en") return NAV_SECTIONS;

  return NAV_SECTIONS.map((section) => {
    const translation = NAV_SECTION_TRANSLATIONS_RO[section.href];

    if (!translation) return section;

    return {
      ...section,
      title: translation.title,
      description: translation.description,
      badge: translation.badge ?? section.badge,
      items: section.items.map((item) => ({
        ...item,
        label: translation.items[item.href]?.label ?? item.label,
        description:
          translation.items[item.href]?.description ?? item.description,
      })),
    };
  });
}

export function getSiteTagline(locale: Locale) {
  if (locale === "ro") {
    return "Cea mai mare națiune din istoria civilizației umane";
  }

  return SITE.tagline;
}
