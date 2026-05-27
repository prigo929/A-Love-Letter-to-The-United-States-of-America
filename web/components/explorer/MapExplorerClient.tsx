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
      {/* ── Background Grid and Glows ── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/15 via-[#030712]/50 to-[#030712] z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:48px_48px] opacity-15 z-0" />
      
      {/* Cinematic Top Accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 py-20 sm:px-6 lg:px-8">
        
        {/* ── PAGE HEADER ── */}
        <header className="mb-10 flex flex-col justify-between gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="h-4 w-4 text-[#d4af37] animate-pulse" />
              <span className="font-display text-xs font-bold tracking-widest text-[#d4af37] uppercase">
                Interactive State Directory
              </span>
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {translations.title}
            </h1>
            <p className="mt-2 max-w-2xl font-body text-base text-white/60">
              {translations.subtitle}
            </p>
          </div>

          {/* Quick Stats Counters */}
          <div className="grid grid-cols-3 gap-6 border-l border-white/10 pl-6">
            <div>
              <div className="font-display text-2xl font-bold text-[#d4af37]">50 + DC</div>
              <div className="text-[10px] font-display font-semibold uppercase tracking-wider text-white/40">Regions</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-blue-400">$32.4T</div>
              <div className="text-[10px] font-display font-semibold uppercase tracking-wider text-white/40">Total GDP</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-emerald-400">342M+</div>
              <div className="text-[10px] font-display font-semibold uppercase tracking-wider text-white/40">Population</div>
            </div>
          </div>
        </header>

        {/* ── DUAL COLUMN INTERFACE ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* LEFT COLUMN: Map Area and HUD controls (8 Cols) */}
          <div className="space-y-6 lg:col-span-8">
            
            {/* Filter and Search Bar */}
            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 backdrop-blur-md md:grid-cols-12">
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
              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:col-span-5 md:pb-0">
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
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide transition-all font-body ${
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

            {/* INTERACTIVE MAP CONTAINER */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-2 backdrop-blur-md shadow-2xl">
              
              {/* Heatmap overlay controller */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 rounded-xl border border-white/5 bg-slate-950/80 p-3 backdrop-blur-md">
                <span className="font-display text-[10px] tracking-wider text-white/50 uppercase flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-[#d4af37]" />
                  {translations.heatmapMode}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1 max-w-[220px] md:max-w-none">
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

              {/* Geo-Atlas Map */}
              <div className="h-[320px] w-full sm:h-[450px] md:h-[500px]">
                <ComposableMap
                  projection="geoAlbersUsa"
                  projectionConfig={{ scale: 1000 }}
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
            </div>

            {/* List directories of states */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="font-display text-xs tracking-wider text-white/40 uppercase">
                  {translations.detailsTitle} ({filteredStates.length})
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredStates.map((state) => {
                  const isSelected = selectedStateAbbrev === state.abbrev;
                  return (
                    <div
                      key={state.abbrev}
                      onClick={() => setSelectedStateAbbrev(state.abbrev)}
                      className={`relative cursor-pointer rounded-xl border p-3 transition-all ${
                        isSelected
                          ? "bg-[#d4af37]/10 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                          : "bg-slate-950/60 border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-body text-xs text-white/40 font-bold">{state.abbrev}</span>
                      </div>
                      <h4 className="mt-1 font-display text-sm font-bold text-white truncate">
                        {state.name[locale]}
                      </h4>
                      <p className="text-[10px] text-white/50 font-semibold truncate font-body">
                        {state.capital[locale]}
                      </p>
                    </div>
                  );
                })}

                {filteredStates.length === 0 && (
                  <div className="col-span-full py-8 text-center text-sm text-white/30 font-body">
                    {translations.noResults}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Bento-style detail dashboard (4 Cols) */}
          <div className="space-y-6 lg:col-span-4">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedState.abbrev}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-md shadow-2xl space-y-6"
              >
                {/* Visual Header */}
                <div className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-slate-900 to-slate-950 p-4">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-white/5 to-transparent opacity-50" />
                  
                  {/* Region Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-[9px] font-bold tracking-wider text-[#d4af37] border border-[#d4af37]/30 rounded px-1.5 py-0.5 bg-[#d4af37]/5 uppercase">
                      Region: {selectedState.region}
                    </span>
                    <span className="font-display text-[9px] font-bold text-white/40 uppercase">
                      FIPS CODE: {selectedState.fips}
                    </span>
                  </div>

                  {/* Title & Nickname */}
                  <div>
                    <h2 className="font-display text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
                      {selectedState.name[locale]}
                      <span className="font-display text-sm font-bold text-[#d4af37]/80">({selectedState.abbrev})</span>
                    </h2>
                    <p className="mt-1 font-body text-xs italic text-[#d4af37]/85">
                      “{selectedState.nickname[locale]}”
                    </p>
                  </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* GDP Card */}
                  <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40">
                      <TrendingUp className="h-3.5 w-3.5 text-[#d4af37]" />
                      <span className="font-display text-[10px] uppercase tracking-wider font-bold">{translations.gdp}</span>
                    </div>
                    <div className="font-display text-2xl font-extrabold text-white">
                      ${selectedState.gdp}B
                    </div>
                    <div className="text-[9px] text-white/40 font-body font-semibold">
                      Rank #{selectedState.gdp > 1000 ? "Top 5" : selectedState.gdp > 500 ? "Top 15" : "Mid Tier"}
                    </div>
                  </div>

                  {/* Population Card */}
                  <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Users className="h-3.5 w-3.5 text-blue-400" />
                      <span className="font-display text-[10px] uppercase tracking-wider font-bold">{translations.population}</span>
                    </div>
                    <div className="font-display text-2xl font-extrabold text-white">
                      {selectedState.population}M
                    </div>
                    <div className="text-[9px] text-white/40 font-body font-semibold">
                      US Share: {Math.round((selectedState.population / 342) * 1000) / 10}%
                    </div>
                  </div>

                  {/* Statehood Year */}
                  <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Compass className="h-3.5 w-3.5 text-yellow-400" />
                      <span className="font-display text-[10px] uppercase tracking-wider font-bold">{translations.statehood}</span>
                    </div>
                    <div className="font-display text-2xl font-extrabold text-white">
                      {selectedState.statehoodYear}
                    </div>
                    <div className="text-[9px] text-white/40 font-body font-semibold">
                      Order: #{selectedState.statehoodOrder}
                    </div>
                  </div>

                  {/* Area Card */}
                  <div className="rounded-xl border border-white/5 bg-white/5 p-3.5 space-y-1">
                    <div className="flex items-center gap-1.5 text-white/40">
                      <Maximize2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="font-display text-[10px] uppercase tracking-wider font-bold">{translations.area}</span>
                    </div>
                    <div className="font-display text-lg font-extrabold text-white truncate">
                      {selectedState.area.toLocaleString()} sq mi
                    </div>
                    <div className="text-[9px] text-white/40 font-body font-semibold">
                      {selectedState.area > 100000 ? "Giant" : selectedState.area > 40000 ? "Medium" : "Compact"}
                    </div>
                  </div>
                </div>

                {/* Core Specs List */}
                <div className="rounded-xl border border-white/5 bg-slate-900/30 p-4 space-y-3.5">
                  {/* Capital */}
                  <div className="flex justify-between items-start border-b border-white/5 pb-2">
                    <span className="text-xs text-white/40 font-body uppercase font-bold">{translations.capital}:</span>
                    <span className="text-sm font-semibold text-white text-right font-display">{selectedState.capital[locale]}</span>
                  </div>

                  {/* Main Sector */}
                  <div className="flex justify-between items-start border-b border-white/5 pb-2">
                    <span className="text-xs text-white/40 font-body uppercase font-bold">{translations.industry}:</span>
                    <span className="text-sm font-semibold text-[#d4af37] text-right max-w-[200px] truncate-2-lines font-display">{selectedState.industry[locale]}</span>
                  </div>

                  {/* FIPS */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/40 font-body uppercase font-bold">{translations.statehoodOrderLabel}:</span>
                    <span className="font-display text-xs text-white font-bold">#{selectedState.statehoodOrder} / 50</span>
                  </div>
                </div>

                {/* Narrative story */}
                <div className="border-t border-white/5 pt-4 space-y-2">
                  <span className="font-display text-[10px] uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
                    REGIONAL CHRONICLE
                  </span>
                  <p className="font-body text-sm leading-relaxed text-white/80">
                    {selectedState.story[locale]}
                  </p>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
