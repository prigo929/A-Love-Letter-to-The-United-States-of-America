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
    title: locale === "ro" ? "Explorator de Hartă" : "U.S. Map Explorer",
    subtitle: locale === "ro" 
      ? "O explorare tactică interactivă, stat cu stat, a economiei, demografiei și istoriei din spatele fiecărei piese a uniunii." 
      : "An interactive tactical exploration, state-by-state, of the economy, demographics, and history behind each piece of the Union.",
    searchPlaceholder: locale === "ro" ? "Caută după nume sau capitală..." : "Search by name or capital...",
    filterRegion: locale === "ro" ? "Filtrează Regiunea" : "Filter Region",
    sortBy: locale === "ro" ? "Ordonează după" : "Sort By",
    heatmapMode: locale === "ro" ? "MOD HARTĂ CALDĂ // HEATMAP" : "MAP OVERLAY // HEATMAP MODE",
    statehood: locale === "ro" ? "Fondare" : "Statehood",
    population: locale === "ro" ? "Populație" : "Population",
    gdp: locale === "ro" ? "PIB" : "GDP",
    area: locale === "ro" ? "Suprafață" : "Area",
    capital: locale === "ro" ? "Capitală" : "Capital",
    nickname: locale === "ro" ? "Pseudonim" : "Nickname",
    industry: locale === "ro" ? "Sector Principal" : "Key Sector",
    story: locale === "ro" ? "Cronică Regională" : "Regional Chronicle",
    allRegions: locale === "ro" ? "Toate" : "All",
    west: locale === "ro" ? "Vest" : "West",
    south: locale === "ro" ? "Sud" : "South",
    midwest: locale === "ro" ? "Midwest" : "Midwest",
    northeast: locale === "ro" ? "Nord-Est" : "Northeast",
    defaultColor: locale === "ro" ? "Regiuni" : "Regions",
    gdpHeat: locale === "ro" ? "PIB Cald" : "GDP Heat",
    popHeat: locale === "ro" ? "Populație" : "Population",
    statehoodHeat: locale === "ro" ? "Istoric" : "Statehood",
    rankLabel: locale === "ro" ? "Rang" : "Rank",
    noResults: locale === "ro" ? "Nu s-au găsit state pentru selecția făcută." : "No states matching current filter criteria.",
    selectedState: locale === "ro" ? "Stat Selectat" : "Selected State",
    statehoodOrderLabel: locale === "ro" ? "Ordine Aderare" : "Statehood Entry",
    detailsTitle: locale === "ro" ? "State Găsite" : "States Directory",
  };

  return (
    <div className="pt-2">
      <MapExplorerClient locale={locale} translations={translations} />
    </div>
  );
}
