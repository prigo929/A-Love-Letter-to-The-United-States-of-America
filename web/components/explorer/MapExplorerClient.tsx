"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import {
  Search,
  Compass,
  Layers,
  Users,
  TrendingUp,
  MapPin,
  ListFilter,
  Maximize2,
} from "lucide-react";
import { EXPLORER_STATES, StateData } from "@/lib/data/explorer-data";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const FIPS_TO_ABBREV: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO",
  "09": "CT", "10": "DE", "11": "DC", "12": "FL", "13": "GA", "15": "HI",
  "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY",
  "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN",
  "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
  "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD",
  "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA",
  "54": "WV", "55": "WI", "56": "WY",
};

interface MapExplorerClientProps {
  locale: "en" | "ro";
  translations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterRegion: string;
    sortBy: string;
    heatmapMode: string;
    statehood: string;
    population: string;
    gdp: string;
    area: string;
    capital: string;
    nickname: string;
    industry: string;
    story: string;
    allRegions: string;
    west: string;
    south: string;
    midwest: string;
    northeast: string;
    defaultColor: string;
    gdpHeat: string;
    popHeat: string;
    statehoodHeat: string;
    rankLabel: string;
    noResults: string;
    selectedState: string;
    statehoodOrderLabel: string;
    detailsTitle: string;
  };
}

export function MapExplorerClient({ locale, translations }: MapExplorerClientProps) {
  // Interaction states
  const [selectedStateAbbrev, setSelectedStateAbbrev] = useState<string>("TX");
  const [hoveredStateAbbrev, setHoveredStateAbbrev] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "gdp" | "population" | "statehood">("name");
  const [heatmapMode, setHeatmapMode] = useState<"none" | "gdp" | "population" | "statehood">("none");

  const statesArray = useMemo(() => Object.values(EXPLORER_STATES), []);

  // Filter and Sort states
  const filteredStates = useMemo(() => {
    return statesArray
      .filter((s) => {
        const matchesRegion = selectedRegion === "All" || s.region === selectedRegion;
        const stateName = s.name[locale];
        const matchesSearch =
          stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.abbrev.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.capital[locale].toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRegion && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "gdp") return b.gdp - a.gdp;
        if (sortBy === "population") return b.population - a.population;
        if (sortBy === "statehood") return a.statehoodOrder - b.statehoodOrder;
        const nameA = a.name[locale];
        const nameB = b.name[locale];
        return nameA.localeCompare(nameB);
      });
  }, [statesArray, selectedRegion, searchQuery, sortBy, locale]);

  // Selected State details
  const selectedState = useMemo(() => {
    return EXPLORER_STATES[selectedStateAbbrev] || EXPLORER_STATES.TX;
  }, [selectedStateAbbrev]);

  // Heatmap boundaries helper
  const maxValues = useMemo(() => {
    let maxGdp = 0;
    let maxPop = 0;
    let maxOrder = 0;
    statesArray.forEach((s) => {
      if (s.gdp > maxGdp) maxGdp = s.gdp;
      if (s.population > maxPop) maxPop = s.population;
      if (s.statehoodOrder > maxOrder) maxOrder = s.statehoodOrder;
    });
    return { maxGdp, maxPop, maxOrder };
  }, [statesArray]);

  // Get state styling based on heatmap modes
  const getGeographyStyle = useCallback((geo: any) => {
    const fips = geo.id?.toString().padStart(2, "0") ?? "";
    const abbrev = FIPS_TO_ABBREV[fips] ?? "";
    const state = EXPLORER_STATES[abbrev];

    if (!state) {
      return {
        fill: "#0b1329",
        stroke: "#1e293b",
        strokeWidth: 0.5,
        outline: "none",
      };
    }

    const isSelected = selectedStateAbbrev === abbrev;
    const isHovered = hoveredStateAbbrev === abbrev;

    // Define colors depending on mode
    let defaultFill = "#1e293b";
    
    if (heatmapMode === "none") {
      // Color code by region
      if (state.region === "Northeast") defaultFill = "rgba(59, 130, 246, 0.25)";
      else if (state.region === "South") defaultFill = "rgba(239, 68, 68, 0.25)";
      else if (state.region === "Midwest") defaultFill = "rgba(16, 185, 129, 0.25)";
      else if (state.region === "West") defaultFill = "rgba(245, 158, 11, 0.25)";
    } else if (heatmapMode === "gdp") {
      const ratio = state.gdp / maxValues.maxGdp;
      defaultFill = `rgba(212, 175, 55, ${Math.max(0.12, ratio)})`;
    } else if (heatmapMode === "population") {
      const ratio = state.population / maxValues.maxPop;
      defaultFill = `rgba(14, 165, 233, ${Math.max(0.12, ratio)})`;
    } else if (heatmapMode === "statehood") {
      const ratio = (51 - state.statehoodOrder) / 50;
      defaultFill = `rgba(239, 68, 68, ${Math.max(0.12, ratio)})`;
    }

    // Border stroke styling
    let strokeColor = "#0f172a";
    let strokeWidth = 0.5;

    if (isSelected) {
      strokeColor = "#d4af37";
      strokeWidth = 1.8;
    } else if (isHovered) {
      strokeColor = "#ffffff";
      strokeWidth = 1.2;
    }

    return {
      fill: isSelected
        ? "#d4af37"
        : isHovered
        ? "rgba(255, 255, 255, 0.45)"
        : defaultFill,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      outline: "none",
      transition: "fill 0.2s ease, stroke 0.2s ease",
    };
  }, [selectedStateAbbrev, hoveredStateAbbrev, heatmapMode, maxValues]);

  return (
    <div className="relative min-h-screen bg-[#030712] text-white">
      {/* Background Grid and Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/15 via-[#030712]/50 to-[#030712] z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:48px_48px] opacity-15 z-0" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8 font-body">
        
        {/* ── CENTERED HEADER (HOMEPAGE DESIGN) ── */}
        <header className="mb-14 text-center">
          <p className="section-eyebrow justify-center">
            {translations.eyebrow}
          </p>
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-balance">
            {translations.title}
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg text-white/55 leading-relaxed">
            {translations.subtitle}
          </p>
        </header>

        {/* ── INTERFACE CONTENT CONTAINER ── */}
        <div className="space-y-10">
          
          {/* Centered Controls Toolbar */}
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 backdrop-blur-md md:grid-cols-12 max-w-screen-xl mx-auto">
            {/* Search */}
            <div className="relative md:col-span-4">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-900/50 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] font-body"
              />
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:col-span-5 md:pb-0 justify-start">
              <ListFilter className="h-4 w-4 text-white/40 shrink-0 mr-1.5" />
              {[
                { id: "All", label: translations.allRegions },
                { id: "Northeast", label: translations.northeast },
                { id: "South", label: translations.south },
                { id: "Midwest", label: translations.midwest },
                { id: "West", label: translations.west }
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide transition-all font-body shrink-0 ${
                    selectedRegion === reg.id
                      ? "bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37]"
                      : "border border-transparent text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2 md:col-span-3">
              <span className="text-xs text-white/40 whitespace-nowrap font-body">{translations.sortBy}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full rounded-lg border border-white/10 bg-slate-900/50 py-1.5 px-3 text-xs text-white focus:border-[#d4af37] focus:outline-none font-body"
              >
                <option value="name">{locale === "ro" ? "Nume" : "Name"}</option>
                <option value="gdp">{translations.gdp}</option>
                <option value="population">{translations.population}</option>
                <option value="statehood">{translations.statehood}</option>
              </select>
            </div>
          </div>

          {/* CENTERED MAP CONTAINER (HOMEPAGE DESIGN) */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur-sm shadow-2xl max-w-screen-xl mx-auto">
            {/* Map Grid Pattern Overlay */}
            <div 
              className="bg-map-preview-grid absolute inset-0 pointer-events-none opacity-10" 
              aria-hidden="true"
            />
            
            {/* Heatmap overlay controller */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 rounded-xl border border-white/5 bg-slate-950/80 p-3 backdrop-blur-md">
              <span className="font-body text-[10px] tracking-wider text-white/50 uppercase flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-[#d4af37]" />
                {translations.heatmapMode}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1 max-w-[200px] sm:max-w-none">
                {[
                  { id: "none", label: translations.defaultColor },
                  { id: "gdp", label: translations.gdpHeat },
                  { id: "population", label: translations.popHeat },
                  { id: "statehood", label: translations.statehoodHeat },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setHeatmapMode(mode.id as any)}
                    className={`rounded px-2.5 py-0.5 text-[10px] font-body font-semibold tracking-wide transition-all ${
                      heatmapMode === mode.id
                        ? "bg-[#d4af37] text-black font-bold"
                        : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Canvas */}
            <div className="h-[280px] w-full sm:h-[450px] md:h-[550px] lg:h-[620px] px-2 py-4">
              <ComposableMap
                projection="geoAlbersUsa"
                projectionConfig={{ scale: 960 }}
                style={{ width: "100%", height: "100%" }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies.map((geo) => {
                      const fips = geo.id?.toString().padStart(2, "0") ?? "";
                      const abbrev = FIPS_TO_ABBREV[fips] ?? "";
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => setHoveredStateAbbrev(abbrev)}
                          onMouseLeave={() => setHoveredStateAbbrev(null)}
                          onClick={() => {
                            if (abbrev) {
                              setSelectedStateAbbrev(abbrev);
                            }
                          }}
                          style={{
                            default: getGeographyStyle(geo),
                            hover: {
                              cursor: "pointer",
                              outline: "none",
                            },
                            pressed: {
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>

            {/* Bottom Legend styling matching homepage */}
            <div className="flex items-center justify-center gap-6 border-t border-white/10 px-6 py-4 bg-black/10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-glory-blue/60 border border-white/10" />
                <span className="font-body text-xs text-white/50">
                  U.S. Regions
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-[#d4af37]" />
                <span className="font-body text-xs text-white/50">
                  Selected State
                </span>
              </div>
            </div>
          </div>

          {/* ── FULL-WIDTH SELECTED STATE DETAILS PANEL (BENTO LAYOUT) ── */}
          <div className="max-w-screen-xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedState.abbrev}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 md:p-8 backdrop-blur-md shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Part 1: Identity Card (4 Cols) */}
                  <div className="md:col-span-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-[10px] font-bold tracking-widest text-[#d4af37] border border-[#d4af37]/35 rounded px-2 py-0.5 bg-[#d4af37]/5 uppercase">
                          Region: {selectedState.region}
                        </span>
                        <span className="font-body text-[9px] font-bold text-white/40 uppercase">
                          FIPS: {selectedState.fips}
                        </span>
                      </div>
                      
                      <div>
                        <h2 className="font-display text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-2.5">
                          {selectedState.name[locale]}
                          <span className="font-body text-lg font-bold text-[#d4af37]/90">({selectedState.abbrev})</span>
                        </h2>
                        <p className="mt-1.5 font-body text-sm italic text-[#d4af37]/80">
                          “{selectedState.nickname[locale]}”
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-bold uppercase">{translations.capital}:</span>
                        <span className="font-semibold text-white">{selectedState.capital[locale]}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-bold uppercase">{translations.statehoodOrderLabel}:</span>
                        <span className="font-semibold text-white">#{selectedState.statehoodOrder} / 50</span>
                      </div>
                    </div>
                  </div>

                  {/* Part 2: Metrics Bento Grid (4 Cols) */}
                  <div className="md:col-span-4 flex flex-col justify-center gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* GDP */}
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1.5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1.5 text-white/40">
                          <TrendingUp className="h-3.5 w-3.5 text-[#d4af37]" />
                          <span className="font-body text-[9px] uppercase tracking-wider font-bold">{translations.gdp}</span>
                        </div>
                        <div className="font-body text-2xl font-extrabold text-white">
                          ${selectedState.gdp}B
                        </div>
                        <div className="text-[9px] text-white/40 font-semibold uppercase">
                          Rank #{selectedState.gdp > 1000 ? "Top 5" : selectedState.gdp > 500 ? "Top 15" : "Mid Tier"}
                        </div>
                      </div>

                      {/* Population */}
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1.5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1.5 text-white/40">
                          <Users className="h-3.5 w-3.5 text-blue-400" />
                          <span className="font-body text-[9px] uppercase tracking-wider font-bold">{translations.population}</span>
                        </div>
                        <div className="font-body text-2xl font-extrabold text-white">
                          {selectedState.population}M
                        </div>
                        <div className="text-[9px] text-white/40 font-semibold uppercase">
                          Share: {Math.round((selectedState.population / 342) * 1000) / 10}%
                        </div>
                      </div>

                      {/* Statehood */}
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1.5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1.5 text-white/40">
                          <Compass className="h-3.5 w-3.5 text-yellow-400" />
                          <span className="font-body text-[9px] uppercase tracking-wider font-bold">{translations.statehood}</span>
                        </div>
                        <div className="font-body text-2xl font-extrabold text-white">
                          {selectedState.statehoodYear}
                        </div>
                        <div className="text-[9px] text-white/40 font-semibold uppercase">
                          Order: #{selectedState.statehoodOrder}
                        </div>
                      </div>

                      {/* Area */}
                      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1.5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1.5 text-white/40">
                          <Maximize2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="font-body text-[9px] uppercase tracking-wider font-bold">{translations.area}</span>
                        </div>
                        <div className="font-body text-base font-extrabold text-white truncate">
                          {selectedState.area.toLocaleString()} sq mi
                        </div>
                        <div className="text-[9px] text-white/40 font-semibold uppercase">
                          {selectedState.area > 100000 ? "Giant" : selectedState.area > 40000 ? "Medium" : "Compact"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Part 3: Chronicle Narrative (4 Cols) */}
                  <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                    <div className="space-y-4">
                      <span className="font-body text-[10px] uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
                        REGIONAL CHRONICLE
                      </span>
                      <p className="font-body text-sm leading-relaxed text-white/80">
                        {selectedState.story[locale]}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5">
                      <span className="text-[10px] text-white/40 font-bold uppercase block mb-1">{translations.industry}</span>
                      <span className="text-xs font-semibold text-[#d4af37] leading-relaxed block">{selectedState.industry[locale]}</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RESPONSIVE STATES DIRECTORY (GRID LIST AT THE BOTTOM) ── */}
          <div className="max-w-screen-xl mx-auto pt-6 border-t border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-body text-sm font-bold tracking-wider text-white/40 uppercase">
                {translations.detailsTitle} ({filteredStates.length})
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredStates.map((state) => {
                const isSelected = selectedStateAbbrev === state.abbrev;
                return (
                  <div
                    key={state.abbrev}
                    onClick={() => setSelectedStateAbbrev(state.abbrev)}
                    className={`relative cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? "bg-[#d4af37]/10 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                        : "bg-slate-950/60 border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-xs text-[#d4af37]/80 font-bold">{state.abbrev}</span>
                      <span className="text-[10px] text-white/40 font-semibold">{state.region}</span>
                    </div>
                    <h4 className="font-body text-sm font-bold text-white truncate">
                      {state.name[locale]}
                    </h4>
                    <p className="text-[10px] text-white/50 font-medium truncate font-body mt-0.5">
                      {state.capital[locale]}
                    </p>
                  </div>
                );
              })}

              {filteredStates.length === 0 && (
                <div className="col-span-full py-12 text-center text-sm text-white/30 font-body">
                  {translations.noResults}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
