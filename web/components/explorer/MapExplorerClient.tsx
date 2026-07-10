"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
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
  BarChart2,
  Zap,
  Globe,
} from "lucide-react";
import { EXPLORER_STATES, StateData } from "@/lib/data/explorer-data";
import { COLORS } from "@/lib/constants";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// ─── FIPS → State Abbreviation ───────────────────────────────────────────────
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

// ─── Region Palette ───────────────────────────────────────────────────────────
// Vivid, saturated colors on a black canvas — far more contrast than the old muted rgba tints.
const REGION_COLORS: Record<string, { base: string; hover: string; border: string; label: string }> = {
  Northeast: {
    base:   "hsl(240 72% 58%)",   // vivid indigo
    hover:  "hsl(240 80% 70%)",
    border: "hsl(240 72% 58%)",
    label:  "#818cf8",
  },
  South: {
    base:   "hsl(355 82% 50%)",   // crimson red
    hover:  "hsl(355 85% 62%)",
    border: "hsl(355 82% 50%)",
    label:  "#f87171",
  },
  Midwest: {
    base:   "hsl(158 68% 40%)",   // emerald green
    hover:  "hsl(158 72% 52%)",
    border: "hsl(158 68% 40%)",
    label:  "#34d399",
  },
  West: {
    base:   "hsl(38 95% 52%)",    // vivid amber
    hover:  "hsl(38 98% 64%)",
    border: "hsl(38 95% 52%)",
    label:  "#fbbf24",
  },
};

// ─── National Stats ───────────────────────────────────────────────────────────
const NATIONAL_STATS = [
  { icon: MapPin,    value: "50",      unit: "States",        label: "& 1 Federal District" },
  { icon: Users,     value: "335M",    unit: "Population",    label: "3rd largest on Earth" },
  { icon: TrendingUp,value: "$29.2T",  unit: "National GDP",  label: "Largest in the world" },
  { icon: Maximize2, value: "3.8M",    unit: "Square Miles",  label: "4th largest country" },
  { icon: Compass,   value: "248",     unit: "Years",         label: "Of unbroken democracy" },
  { icon: Zap,       value: "#1",      unit: "Innovation",    label: "Global patent leader" },
];

// ─── Component Props ──────────────────────────────────────────────────────────
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

// ─── Animated Counter ─────────────────────────────────────────────────────────
function StatTicker() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.07]"
    >
      {NATIONAL_STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="flex flex-col gap-1 bg-[#0a0a0a] px-5 py-4"
          >
            <div className="flex items-center gap-1.5 text-white/30 mb-1">
              <Icon className="h-3 w-3 text-[#fbbf24]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] font-semibold">{stat.unit}</span>
            </div>
            <span className="font-hero text-2xl text-white leading-none">{stat.value}</span>
            <span className="font-body text-[10px] text-white/35 leading-tight">{stat.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── GDP Rank Bar ─────────────────────────────────────────────────────────────
function GdpRankBar({ rank }: { rank: number }) {
  // rank 1 = best (CA) → fill = 100%; rank 50 = lowest → fill ≈ 2%
  const fillPct = Math.round(((51 - rank) / 50) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">GDP Rank</span>
        <span className="font-hero text-sm text-[#fbbf24]">#{rank} <span className="font-body text-[10px] text-white/30">/ 50</span></span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
        <motion.div
          key={rank}
          initial={{ width: 0 }}
          animate={{ width: `${fillPct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]"
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function MapExplorerClient({ locale, translations }: MapExplorerClientProps) {
  const [selectedStateAbbrev, setSelectedStateAbbrev] = useState<string>("TX");
  const [hoveredStateAbbrev, setHoveredStateAbbrev] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "gdp" | "population" | "statehood">("name");
  const [heatmapMode, setHeatmapMode] = useState<"none" | "gdp" | "population" | "statehood">("none");

  const statesArray = useMemo(() => Object.values(EXPLORER_STATES).filter((s) => s.abbrev !== "DC"), []);

  // Ranked arrays (sorted by GDP desc → rank = index+1)
  const gdpRanked = useMemo(
    () => [...statesArray].sort((a, b) => b.gdp - a.gdp).map((s) => s.abbrev),
    [statesArray]
  );

  const filteredStates = useMemo(() => {
    return statesArray
      .filter((s) => {
        const matchesRegion = selectedRegion === "All" || s.region === selectedRegion;
        const name = s.name[locale];
        const matchesSearch =
          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.abbrev.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.capital[locale].toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRegion && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "gdp") return b.gdp - a.gdp;
        if (sortBy === "population") return b.population - a.population;
        if (sortBy === "statehood") return a.statehoodOrder - b.statehoodOrder;
        return a.name[locale].localeCompare(b.name[locale]);
      });
  }, [statesArray, selectedRegion, searchQuery, sortBy, locale]);

  const selectedState = useMemo(
    () => EXPLORER_STATES[selectedStateAbbrev] || EXPLORER_STATES.TX,
    [selectedStateAbbrev]
  );

  const maxValues = useMemo(() => {
    let maxGdp = 0, maxPop = 0, maxOrder = 0;
    statesArray.forEach((s) => {
      if (s.gdp > maxGdp) maxGdp = s.gdp;
      if (s.population > maxPop) maxPop = s.population;
      if (s.statehoodOrder > maxOrder) maxOrder = s.statehoodOrder;
    });
    return { maxGdp, maxPop, maxOrder };
  }, [statesArray]);

  // Derived metrics for selected state
  const gdpRank = useMemo(
    () => gdpRanked.indexOf(selectedStateAbbrev) + 1,
    [gdpRanked, selectedStateAbbrev]
  );
  const gdpPerCapita = useMemo(
    () => selectedState.population > 0
      ? Math.round((selectedState.gdp * 1000) / selectedState.population)  // $k
      : 0,
    [selectedState]
  );
  const popDensity = useMemo(
    () => selectedState.area > 0
      ? Math.round((selectedState.population * 1_000_000) / selectedState.area)
      : 0,
    [selectedState]
  );

  // ─── Geography Fill Color ─────────────────────────────────────────────────
  const getGeographyStyle = useCallback(
    (geo: any) => {
      const fips = geo.id?.toString().padStart(2, "0") ?? "";
      const abbrev = FIPS_TO_ABBREV[fips] ?? "";
      const state = EXPLORER_STATES[abbrev];

      if (!state || abbrev === "DC") {
        return { fill: "#0a0a0a", stroke: "rgba(255,255,255,0.04)", strokeWidth: 0.5, outline: "none" };
      }

      const matchesRegion = selectedRegion === "All" || state.region === selectedRegion;
      const name = state.name[locale];
      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.abbrev.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.capital[locale].toLowerCase().includes(searchQuery.toLowerCase());
      const isMatch = matchesRegion && matchesSearch;
      const isHovered = hoveredStateAbbrev === abbrev;

      let fill: string;

      if (!isMatch) {
        fill = "#111111";
      } else if (heatmapMode === "none") {
        const rc = REGION_COLORS[state.region];
        fill = isHovered ? rc.hover : rc.base;
      } else if (heatmapMode === "gdp") {
        const r = state.gdp / maxValues.maxGdp;
        fill = isHovered
          ? `hsla(38,98%,64%,${Math.max(0.15, r)})`
          : `hsla(38,95%,52%,${Math.max(0.12, r)})`;
      } else if (heatmapMode === "population") {
        const r = state.population / maxValues.maxPop;
        fill = isHovered
          ? `hsla(210,90%,65%,${Math.max(0.15, r)})`
          : `hsla(210,85%,55%,${Math.max(0.12, r)})`;
      } else {
        // statehood: older = brighter red
        const r = (51 - state.statehoodOrder) / 50;
        fill = isHovered
          ? `hsla(355,90%,62%,${Math.max(0.15, r)})`
          : `hsla(355,82%,50%,${Math.max(0.12, r)})`;
      }

      return {
        fill,
        stroke: isMatch ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
        strokeWidth: 0.5,
        outline: "none",
        transition: "fill 0.15s ease",
      };
    },
    [selectedStateAbbrev, hoveredStateAbbrev, heatmapMode, maxValues, selectedRegion, searchQuery, locale]
  );

  // ─── Region filter toggle ─────────────────────────────────────────────────
  const regionButtons = [
    { id: "All",       label: translations.allRegions,  color: "rgba(255,255,255,0.15)" },
    { id: "Northeast", label: translations.northeast,   color: REGION_COLORS.Northeast.label },
    { id: "South",     label: translations.south,       color: REGION_COLORS.South.label },
    { id: "Midwest",   label: translations.midwest,     color: REGION_COLORS.Midwest.label },
    { id: "West",      label: translations.west,        color: REGION_COLORS.West.label },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* ── Ambient radial glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, hsla(38,95%,52%,0.06) 0%, transparent 70%)",
        }}
      />
      {/* ── Dot grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 pt-28 pb-24 sm:px-6 lg:px-8 font-body">

        {/* ── HEADER ── */}
        <header className="mb-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#fbbf24] mb-4">
            {translations.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-balance mb-4">
            {translations.title}
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg text-white/45 leading-relaxed">
            {translations.subtitle}
          </p>
        </header>

        {/* ── NATIONAL STATS TICKER ── */}
        <div className="mb-10">
          <StatTicker />
        </div>

        <div className="space-y-6">

          {/* ── CONTROLS TOOLBAR ── */}
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-4 md:grid-cols-12">
            {/* Search */}
            <div className="relative md:col-span-5">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/25 focus:border-[#fbbf24]/60 focus:outline-none focus:ring-1 focus:ring-[#fbbf24]/40 font-body transition-colors"
              />
            </div>

            {/* Region Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:col-span-7 md:pb-0 md:justify-end">
              <ListFilter className="h-3.5 w-3.5 text-white/30 shrink-0 mr-1" />
              {regionButtons.map((reg) => {
                const isActive = selectedRegion === reg.id;
                return (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg.id)}
                    className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-all font-body"
                    style={{
                      background: isActive ? `${reg.color}22` : "transparent",
                      border: `1px solid ${isActive ? reg.color : "rgba(255,255,255,0.1)"}`,
                      color: isActive ? reg.color : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {reg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── MAP CONTAINER ── */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#050505] shadow-2xl">

            {/* Heatmap overlay selector */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-black/80 p-3 backdrop-blur-md">
              <span className="font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-[#fbbf24]" />
                {translations.heatmapMode}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-0.5 max-w-[190px] sm:max-w-none">
                {[
                  { id: "none",       label: translations.defaultColor,   activeColor: "#fbbf24" },
                  { id: "gdp",        label: translations.gdpHeat,        activeColor: "#fbbf24" },
                  { id: "population", label: translations.popHeat,        activeColor: "#60a5fa" },
                  { id: "statehood",  label: translations.statehoodHeat,  activeColor: "#f87171" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setHeatmapMode(mode.id as any)}
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide transition-all font-body"
                    style={{
                      background: heatmapMode === mode.id ? mode.activeColor : "rgba(255,255,255,0.05)",
                      color: heatmapMode === mode.id ? "#000" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
              {/* Heatmap gradient scale bar */}
              {heatmapMode !== "none" && (
                <div className="mt-2 space-y-1">
                  <div
                    className="h-1.5 w-full rounded-full"
                    style={{
                      background:
                        heatmapMode === "gdp"
                          ? "linear-gradient(to right, hsla(38,95%,52%,0.12), hsl(38,95%,52%))"
                          : heatmapMode === "population"
                          ? "linear-gradient(to right, hsla(210,85%,55%,0.12), hsl(210,85%,55%))"
                          : "linear-gradient(to right, hsla(355,82%,50%,0.12), hsl(355,82%,50%))",
                    }}
                  />
                  <div className="flex justify-between font-mono text-[8px] text-white/25">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              )}
            </div>

            {/* Region color legend — bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-5 border-t border-white/[0.06] px-6 py-3 bg-black/60 backdrop-blur-sm">
              {heatmapMode === "none" ? (
                Object.entries(REGION_COLORS).map(([region, rc]) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(selectedRegion === region ? "All" : region)}
                    className="flex items-center gap-1.5 transition-opacity"
                    style={{ opacity: selectedRegion !== "All" && selectedRegion !== region ? 0.35 : 1 }}
                  >
                    <div className="h-2.5 w-2.5 rounded-sm" style={{ background: rc.base }} />
                    <span className="font-mono text-[9px] text-white/45 uppercase tracking-wider">{region}</span>
                  </button>
                ))
              ) : (
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">
                  {heatmapMode === "gdp" ? "GDP by State" : heatmapMode === "population" ? "Population by State" : "Statehood Order (oldest brightest)"}
                </span>
              )}
            </div>

            {/* Map canvas */}
            <div className="h-[280px] w-full sm:h-[450px] md:h-[560px] lg:h-[640px] px-2 py-4 pb-12">
              <ComposableMap
                projection="geoAlbersUsa"
                projectionConfig={{ scale: 960 }}
                style={{ width: "100%", height: "100%" }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }: { geographies: any[] }) => {
                    const baseGeos = geographies.map((geo) => {
                      const fips = geo.id?.toString().padStart(2, "0") ?? "";
                      const abbrev = FIPS_TO_ABBREV[fips] ?? "";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => { if (abbrev !== "DC") setHoveredStateAbbrev(abbrev); }}
                          onMouseLeave={() => setHoveredStateAbbrev(null)}
                          onClick={() => { if (abbrev && abbrev !== "DC") setSelectedStateAbbrev(abbrev); }}
                          style={{
                            default: getGeographyStyle(geo),
                            hover: { cursor: abbrev === "DC" ? "default" : "pointer", outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    });

                    const selectedGeo = geographies.find((geo) => {
                      const fips = geo.id?.toString().padStart(2, "0") ?? "";
                      return FIPS_TO_ABBREV[fips] === selectedStateAbbrev;
                    });
                    const hoveredGeo = hoveredStateAbbrev
                      ? geographies.find((geo) => {
                          const fips = geo.id?.toString().padStart(2, "0") ?? "";
                          return FIPS_TO_ABBREV[fips] === hoveredStateAbbrev;
                        })
                      : null;

                    return (
                      <>
                        {baseGeos}
                        {selectedGeo && (
                          <Geography
                            key={`${selectedGeo.rsmKey}-selected`}
                            geography={selectedGeo}
                            style={{
                              default: { fill: "none", stroke: "#fbbf24", strokeWidth: 2.2, outline: "none", pointerEvents: "none" },
                              hover: { outline: "none" },
                              pressed: { outline: "none" },
                            }}
                          />
                        )}
                        {hoveredGeo && (
                          <Geography
                            key={`${hoveredGeo.rsmKey}-hover`}
                            geography={hoveredGeo}
                            style={{
                              default: { fill: "none", stroke: "#ffffff", strokeWidth: 1.2, outline: "none", pointerEvents: "none" },
                              hover: { outline: "none" },
                              pressed: { outline: "none" },
                            }}
                          />
                        )}
                      </>
                    );
                  }}
                </Geographies>
              </ComposableMap>
            </div>
          </div>

          {/* ── SELECTED STATE DETAIL PANEL ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedState.abbrev}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
              className="rounded-3xl border border-white/[0.08] bg-[#0a0a0a] p-6 md:p-8 shadow-2xl"
            >
              {/* Region accent bar */}
              <div
                className="h-0.5 w-full rounded-full mb-6"
                style={{ background: REGION_COLORS[selectedState.region]?.base ?? "#fbbf24" }}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* ── Col 1: Identity (3 cols) ── */}
                <div className="md:col-span-3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.06] pb-6 md:pb-0 md:pr-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="font-mono text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                        style={{
                          color: REGION_COLORS[selectedState.region]?.label ?? "#fbbf24",
                          background: `${REGION_COLORS[selectedState.region]?.base ?? "#fbbf24"}18`,
                          border: `1px solid ${REGION_COLORS[selectedState.region]?.base ?? "#fbbf24"}40`,
                        }}
                      >
                        {selectedState.region}
                      </span>
                      <span className="font-mono text-[9px] text-white/25 tracking-wider">
                        FIPS {selectedState.fips}
                      </span>
                    </div>

                    <h2 className="font-display text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {selectedState.name[locale]}
                    </h2>
                    <span className="font-hero text-xl text-[#fbbf24]">({selectedState.abbrev})</span>
                    <p className="mt-2 font-display text-sm italic text-white/40 leading-snug">
                      "{selectedState.nickname[locale]}"
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5 border-t border-white/[0.05] pt-5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">Capital</span>
                      <span className="font-body text-sm font-semibold text-white">{selectedState.capital[locale]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">Statehood</span>
                      <span className="font-body text-sm font-semibold text-white">{selectedState.statehoodYear}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">Entry Order</span>
                      <span className="font-hero text-base text-[#fbbf24]">#{selectedState.statehoodOrder} <span className="font-mono text-[9px] text-white/25">/ 50</span></span>
                    </div>
                  </div>
                </div>

                {/* ── Col 2: Metrics (5 cols) ── */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  {/* 2×2 core stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* GDP */}
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-1 hover:border-[#fbbf24]/20 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-3 w-3 text-[#fbbf24]" />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">{translations.gdp}</span>
                      </div>
                      <div className="font-hero text-3xl text-white">${selectedState.gdp}B</div>
                      <div className="font-mono text-[9px] text-white/30">${gdpPerCapita}k per capita</div>
                    </div>

                    {/* Population */}
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-1 hover:border-[#60a5fa]/20 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-[#60a5fa]" />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">{translations.population}</span>
                      </div>
                      <div className="font-hero text-3xl text-white">{selectedState.population}M</div>
                      <div className="font-mono text-[9px] text-white/30">{popDensity} ppl/sq mi</div>
                    </div>

                    {/* Area */}
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-1 hover:border-[#34d399]/20 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="h-3 w-3 text-[#34d399]" />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">{translations.area}</span>
                      </div>
                      <div className="font-hero text-2xl text-white">{selectedState.area.toLocaleString()}</div>
                      <div className="font-mono text-[9px] text-white/30">square miles</div>
                    </div>

                    {/* Statehood */}
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-1 hover:border-[#f87171]/20 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <Compass className="h-3 w-3 text-[#f87171]" />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">{translations.statehood}</span>
                      </div>
                      <div className="font-hero text-3xl text-white">{selectedState.statehoodYear}</div>
                      <div className="font-mono text-[9px] text-white/30">#{selectedState.statehoodOrder} to join</div>
                    </div>
                  </div>

                  {/* GDP Rank Bar */}
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                    <GdpRankBar rank={gdpRank} />
                    <div className="mt-3 flex justify-between font-mono text-[9px] text-white/25">
                      <span>California $3,900B</span>
                      <span>Vermont $46B</span>
                    </div>
                  </div>
                </div>

                {/* ── Col 3: Chronicle + Industry (4 cols) ── */}
                <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/[0.06] pt-6 md:pt-0 md:pl-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#fbbf24] flex items-center gap-1.5 mb-3">
                      <MapPin className="h-3 w-3" />
                      Regional Chronicle
                    </span>
                    <p className="font-body text-sm leading-relaxed text-white/70">
                      {selectedState.story[locale]}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.05] space-y-3">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">Key Sector</span>
                      <span className="font-body text-sm font-semibold text-[#fbbf24] leading-relaxed">{selectedState.industry[locale]}</span>
                    </div>
                    {/* US Share bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">Share of US GDP</span>
                        <span className="font-mono text-[9px] text-white/45">
                          {((selectedState.gdp / 29200) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/[0.07] overflow-hidden">
                        <motion.div
                          key={selectedState.abbrev + "-gdpshare"}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (selectedState.gdp / 29200) * 100 * 4)}%` }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-[#fbbf24]/60 to-[#fbbf24]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── STATES DIRECTORY ── */}
          <div className="pt-4 border-t border-white/[0.05]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <h3 className="font-mono text-[10px] font-bold tracking-[0.18em] text-white/30 uppercase">
                {translations.detailsTitle} ({filteredStates.length})
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-white/30">{translations.sortBy}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] py-1.5 px-3 text-xs text-white focus:border-[#fbbf24]/50 focus:outline-none font-body transition-colors"
                >
                  <option value="name">{locale === "ro" ? "Nume" : "Name"}</option>
                  <option value="gdp">{translations.gdp}</option>
                  <option value="population">{translations.population}</option>
                  <option value="statehood">{translations.statehood}</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-h-[260px] overflow-y-auto pr-2 pb-10"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
              >
                {filteredStates.map((state) => {
                  const isSelected = selectedStateAbbrev === state.abbrev;
                  const rc = REGION_COLORS[state.region];
                  return (
                    <div
                      key={state.abbrev}
                      onClick={() => setSelectedStateAbbrev(state.abbrev)}
                      className="relative cursor-pointer rounded-2xl border p-4 transition-all overflow-hidden"
                      style={{
                        background: isSelected ? `${rc.base}14` : "rgba(10,10,10,0.8)",
                        borderColor: isSelected ? rc.base : "rgba(255,255,255,0.07)",
                        boxShadow: isSelected ? `0 0 16px ${rc.base}20` : "none",
                      }}
                    >
                      {/* Left accent bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                        style={{ background: rc.base }}
                      />
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-hero text-sm" style={{ color: rc.label }}>{state.abbrev}</span>
                        <span className="font-mono text-[9px] text-white/25">${state.gdp}B</span>
                      </div>
                      <h4 className="font-body text-sm font-bold text-white truncate">{state.name[locale]}</h4>
                      <p className="font-mono text-[9px] text-white/35 truncate mt-0.5">{state.capital[locale]}</p>
                    </div>
                  );
                })}

                {filteredStates.length === 0 && (
                  <div className="col-span-full py-14 text-center font-mono text-xs text-white/25">
                    {translations.noResults}
                  </div>
                )}
              </div>
              {/* Fade-out at bottom */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 z-10"
                style={{ background: "linear-gradient(to top, #000000, transparent)" }}
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
