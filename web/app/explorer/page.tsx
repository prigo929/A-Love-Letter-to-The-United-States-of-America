import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { MapExplorerClient } from "@/components/explorer/MapExplorerClient";

export const metadata: Metadata = {
  title: "U.S. Map Explorer | Patriotic USA",
  description:
    "An interactive, high-fidelity state-by-state tactical exploration of the United States. Compare state GDP, population, land area, and discover what makes each state exceptional.",
};

export default async function ExplorerPage() {
  const locale = await getServerLocale();
  
  // Localized translations dictionary
  const translations = {
    eyebrow: locale === "ro" ? "De la un Ocean la Altul" : "From Sea to Shining Sea",
    title: locale === "ro" ? "Explorează America" : "Explore America",
    subtitle: locale === "ro" 
      ? "Alege orice stat pentru a descoperi ce îl face unic. Fiecare stat are propria sa poveste." 
      : "Click any state to discover what makes it exceptional. Every state is a story.",
    searchPlaceholder: locale === "ro" ? "Caută un stat sau o capitală..." : "Search by name or capital...",
    filterRegion: locale === "ro" ? "Filtrează după regiune" : "Filter Region",
    sortBy: locale === "ro" ? "Sortează după" : "Sort By",
    heatmapMode: locale === "ro" ? "Filtre vizuale // Hartă tematică" : "MAP OVERLAY // HEATMAP MODE",
    statehood: locale === "ro" ? "Anul aderării" : "Statehood",
    population: locale === "ro" ? "Populație" : "Population",
    gdp: locale === "ro" ? "PIB" : "GDP",
    area: locale === "ro" ? "Suprafață" : "Area",
    capital: locale === "ro" ? "Capitală" : "Capital",
    nickname: locale === "ro" ? "Supranume" : "Nickname",
    industry: locale === "ro" ? "Sector economic cheie" : "Key Sector",
    story: locale === "ro" ? "Istoric regional" : "Regional Chronicle",
    allRegions: locale === "ro" ? "Toate" : "All",
    west: locale === "ro" ? "Vest" : "West",
    south: locale === "ro" ? "Sud" : "South",
    midwest: locale === "ro" ? "Midwest" : "Midwest",
    northeast: locale === "ro" ? "Nord-Est" : "Northeast",
    defaultColor: locale === "ro" ? "Regiuni oficiale" : "Regions",
    gdpHeat: locale === "ro" ? "Distribuție PIB" : "GDP Heat",
    popHeat: locale === "ro" ? "Distribuție populație" : "Population",
    statehoodHeat: locale === "ro" ? "Cronologia aderării" : "Statehood",
    rankLabel: locale === "ro" ? "Clasament" : "Rank",
    noResults: locale === "ro" ? "Nu s-a găsit niciun stat care să corespundă căutării." : "No states matching current filter criteria.",
    selectedState: locale === "ro" ? "Statul selectat" : "Selected State",
    statehoodOrderLabel: locale === "ro" ? "Ordinea aderării" : "Statehood Entry",
    detailsTitle: locale === "ro" ? "Lista statelor" : "States Directory",

    // ── Panel labels ──
    gdpRankLabel: locale === "ro" ? "Clasament PIB" : "GDP Rank",
    popRankLabel: locale === "ro" ? "Clasament populație" : "Population Rank",
    areaRankLabel: locale === "ro" ? "Clasament suprafață" : "Area Rank",
    entryOrderLabel: locale === "ro" ? "Ordinea aderării" : "Entry Order",
    perCapitaSuffix: locale === "ro" ? "pe cap de locuitor" : "per capita",
    perSqMiSuffix: locale === "ro" ? "loc./km²" : "ppl/sq mi",
    squareMilesLabel: locale === "ro" ? "kilometri pătrați" : "square miles",
    toJoinSuffix: locale === "ro" ? "stat aderat" : "to join",
    rankOneLabel: locale === "ro" ? "Locul 1 = California" : "Rank 1 = California",
    ofFiftyStates: locale === "ro" ? "din 50 de state" : "of 50 states",
    shareOfUsGdp: locale === "ro" ? "Pondere din PIB-ul SUA" : "Share of US GDP",
    iconicLandmark: locale === "ro" ? "Reper emblematic" : "Iconic Landmark",
    stateHeritageSite: locale === "ro" ? "Sit de patrimoniu al statului" : "State Heritage Site",
    comparativeRankings: locale === "ro" ? "Clasamente comparative" : "Comparative Rankings",
    sameRegionLabel: locale === "ro" ? "Aceeași regiune" : "Same Region",
    totalSuffix: locale === "ro" ? "în total" : "total",
    nationalRanking: locale === "ro" ? "Clasament național" : "National Ranking",
    top5Gdp: locale === "ro" ? "Top 5 · PIB" : "Top 5 · GDP",
    top5Population: locale === "ro" ? "Top 5 · Populație" : "Top 5 · Population",
    americanLegacy: locale === "ro" ? "Moștenirea americană" : "American Legacy",
    ePluribusTitle:
      locale === "ro"
        ? "E Pluribus Unum: Din mai mulți, unul"
        : "E Pluribus Unum: Out of Many, One",
    ePluribusBody:
      locale === "ro"
        ? "Statele Unite ale Americii sunt o republică federală formată din 50 de state diverse, care se întind peste păduri străvechi, câmpii nesfârșite, canioane adânci și țărmuri maiestuoase. De la cele treisprezece colonii fondatoare de pe coasta Atlanticului până la piscurile vulcanice ale nord-vestului Pacificului, fiecare stat își aduce propria economie, moștenire și personalitate în țesătura comună a Uniunii."
        : "The United States of America is a federal republic of 50 diverse states spanning ancient forests, endless plains, deep canyons, and majestic coastlines. From the founding thirteen colonies along the Atlantic coast to the towering volcanic peaks of the Pacific Northwest, each state contributes its own unique economy, heritage, and character to the Union.",
    regionNames:
      locale === "ro"
        ? { Northeast: "Statele din Nord-Est", South: "Statele din Sud", Midwest: "Statele din Midwest", West: "Statele din Vest" }
        : { Northeast: "Northeast States", South: "South States", Midwest: "Midwest States", West: "West States" },

    // ── Extended state profile ──
    flagSeal: locale === "ro" ? "Simboluri de stat" : "Symbols of State",
    capitolLabel: locale === "ro" ? "Capitoliul statului" : "State Capitol",
    flagLabel: locale === "ro" ? "Drapel" : "Flag",
    sealLabel: locale === "ro" ? "Sigiliu" : "Seal",
    admissionLabel: locale === "ro" ? "Aderarea la Uniune" : "Admission to the Union",
    governmentTitle: locale === "ro" ? "Guvern și politică" : "Government & Politics",
    governorLabel: locale === "ro" ? "Guvernator" : "Governor",
    legislatureLabel: locale === "ro" ? "Legislativ" : "Legislature",
    electoralVotesLabel: locale === "ro" ? "Voturi electorale" : "Electoral Votes",
    politicalStructureLabel: locale === "ro" ? "Structură politică" : "Political Structure",
    uniqueLawsTitle: locale === "ro" ? "Legi neobișnuite" : "Unique Laws",
    historicalFirstsTitle: locale === "ro" ? "Premiere istorice" : "Historical Firsts",
    delegationLabel: locale === "ro" ? "Delegația în Congres" : "Congressional Delegation",
    houseSeatsLabel: locale === "ro" ? "Locuri în Cameră" : "House Seats",
    senatorsLabel: locale === "ro" ? "Senatori" : "Senators",
    electoralShareNote:
      locale === "ro"
        ? "{ev} din cele 538 de voturi electorale: {pct}% din Colegiul Electoral."
        : "{ev} of 538 electoral votes: {pct}% of the Electoral College.",
    constitutionGlanceTitle: locale === "ro" ? "Constituția pe scurt" : "Constitution at a Glance",
    compactsTitle: locale === "ro" ? "Pacte interstatale" : "Interstate Compacts",
    compactsNone: locale === "ro" ? "Niciun acord înregistrat." : "No agreements on record.",
    defaultLandmark: locale === "ro" ? "Monument național" : "National Monument",
    defaultFact:
      locale === "ro"
        ? "Un centru al moștenirii și mândriei americane."
        : "A center of American heritage and pride.",
    defaultMotto: locale === "ro" ? "Libertate și prosperitate" : "Liberty & Prosperity",
    defaultBrand: locale === "ro" ? "Întreprindere națională" : "National Enterprise",

    // ── State constitutions ──
    amendHeat: locale === "ro" ? "Amendamente" : "Amendments",
    lengthHeat: locale === "ro" ? "Lungime" : "Length",
    constitutionsEyebrow: locale === "ro" ? "Cele 50 de constituții" : "The Fifty Constitutions",
    constitutionsTitle: locale === "ro" ? "Constituțiile statelor" : "State Constitutions",
    constitutionsIntro:
      locale === "ro"
        ? "Spre deosebire de Constituția federală, fiecare stat are propria constituție. Unele sunt scurte și durabile, altele lungi și amendate de sute de ori. Alege un stat de pe hartă pentru a-i vedea constituția."
        : "Unlike the federal Constitution, every state has its own constitution. Some are short and durable; others run to hundreds of thousands of words and have been amended hundreds of times. Pick a state on the map to read its constitution.",
    viewOnMap: locale === "ro" ? "Vezi pe hartă" : "View on map",
    oldestLabel: locale === "ro" ? "Cea mai veche" : "Oldest",
    longestLabel: locale === "ro" ? "Cea mai lungă" : "Longest",
    shortestLabel: locale === "ro" ? "Cea mai scurtă" : "Shortest",
    mostAmendedLabel: locale === "ro" ? "Cele mai multe amendamente" : "Most Amended",
    adoptedLabel: locale === "ro" ? "Adoptată" : "Adopted",
    amendmentsLabel: locale === "ro" ? "Amendamente" : "Amendments",
    lengthLabel: locale === "ro" ? "Cuvinte" : "Words",
    vsLongest: locale === "ro" ? "Față de cea mai lungă" : "Relative to longest",
    wordsLabel: locale === "ro" ? "de cuvinte" : "words",
    provisionsLabel: locale === "ro" ? "Prevederi interesante" : "Interesting Provisions",
    avgLengthNote:
      locale === "ro"
        ? "Constituția medie a unui stat american are aproximativ {avg} de cuvinte: de peste patru ori mai lungă decât Constituția federală (circa 7.600 de cuvinte)."
        : "The average US state constitution runs about {avg} words: more than four times the length of the federal Constitution (roughly 7,600 words).",

    // ── Interstate cooperation ──
    cooperation: {
      eyebrow: locale === "ro" ? "Federalismul în practică" : "Federalism in Practice",
      title: locale === "ro" ? "Cooperarea interstatală" : "Interstate Cooperation",
      intro:
        locale === "ro"
          ? "Constituția permite statelor să încheie pacte între ele, cu acordul Congresului. Rezultatul este o rețea de acorduri care administrează râuri, poduri, rețele electrice și răspunsul la dezastre peste granițele statelor. Alege un acord pentru a-i vedea membrii."
          : "The Constitution lets states enter compacts with one another, with the consent of Congress. The result is a web of agreements governing rivers, bridges, power grids, and disaster response across state lines. Pick an agreement to see its members.",
      membersLabel: locale === "ro" ? "State membre" : "Member States",
      establishedLabel: locale === "ro" ? "Înființat" : "Established",
      statesLabel: locale === "ro" ? "state" : "states",
      historyLabel: locale === "ro" ? "Istoric" : "History",
    },

    // ── How states make money ──
    revenue: {
      eyebrow: locale === "ro" ? "Bugetul statului" : "The State Budget",
      title: locale === "ro" ? "Cum fac bani statele" : "How States Make Money",
      intro:
        locale === "ro"
          ? "Fiecare stat își strânge banii altfel. Unele nu au impozit pe venit, altele nu au taxă pe vânzări, iar câteva trăiesc din petrol. Apasă pe o sursă pentru a vedea din ce se compune."
          : "Every state raises its money differently. Some have no income tax, some have no sales tax, and a few live off oil and gas. Click a source to see what it's made of.",
      totalLabel: locale === "ro" ? "Venit general" : "General Revenue",
      perResidentLabel: locale === "ro" ? "Per locuitor" : "Per Resident",
      vsNationalLabel: locale === "ro" ? "vs. media" : "vs. Avg",
      sourceLabel: locale === "ro" ? "Sursă de venit" : "Revenue Source",
      shareLabel: locale === "ro" ? "Pondere" : "Share",
      noIncomeTax: locale === "ro" ? "Fără impozit pe venitul persoanelor" : "No individual income tax",
      noSalesTax: locale === "ro" ? "Fără taxă generală pe vânzări" : "No general sales tax",
      sourceNote:
        locale === "ro"
          ? "Ponderi din venitul general, anul fiscal 2024"
          : "Shares of general revenue, fiscal year 2024",
    },
  };

  return <MapExplorerClient locale={locale} translations={translations} />;
}
