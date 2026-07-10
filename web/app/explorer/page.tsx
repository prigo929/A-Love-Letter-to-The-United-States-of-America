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
  };

  return <MapExplorerClient locale={locale} translations={translations} />;
}
