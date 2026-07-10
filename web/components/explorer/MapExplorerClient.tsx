"use client";

import { useState, useMemo, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent } from "react";
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
  Trees,
  Anchor,
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


// ─── State Trivia Lookup ─────────────────────────────────────────────────────
const STATE_TRIVIA: Record<string, { landmark: string; fact: string; motto: string; brand: string }> = {
  AL: { landmark: "US Space & Rocket Center", fact: "Huntsville built the Saturn V rocket that put American astronauts on the Moon.", motto: "We dare defend our rights", brand: "ULA / Marshall Space Flight Center" },
  AK: { landmark: "Denali (Mount McKinley)", fact: "Has more coastline than all other 49 states combined.", motto: "North to the Future", brand: "Alaska Air Group" },
  AZ: { landmark: "The Grand Canyon", fact: "Home to the Sonoran Desert, the only place where Saguaro cacti grow wild.", motto: "God enriches", brand: "Freeport-McMoRan" },
  AR: { landmark: "Hot Springs National Park", fact: "Only state with an active diamond mine open to the public.", motto: "The People Rule", brand: "Walmart" },
  CA: { landmark: "Silicon Valley & Golden Gate Bridge", fact: "If California were a nation, its economy would rank 5th in the world.", motto: "Eureka (I have found it)", brand: "Apple / Google / Nvidia / Chevron" },
  CO: { landmark: "Rocky Mountains", fact: "Has the highest average elevation of any U.S. state at 6,800 feet.", motto: "Nothing without providence", brand: "Coors Brewing / Arrow Electronics" },
  CT: { landmark: "Yale University", fact: "Home of the first hamburger, Polaroid camera, and nuclear submarine.", motto: "He who transplanted sustains", brand: "General Electric / Otis Elevator" },
  DE: { landmark: "Historic New Castle", fact: "The very first state to ratify the U.S. Constitution (December 7, 1787).", motto: "Liberty and Independence", brand: "DuPont" },
  DC: { landmark: "The White House & Capitol", fact: "Designed by French engineer Pierre L'Enfant and holds 172 foreign embassies.", motto: "Justice for All", brand: "Danaher / Marriott International" },
  FL: { landmark: "Kennedy Space Center & Everglades", fact: "Only place on Earth where alligators and crocodiles coexist in the wild.", motto: "In God We Trust", brand: "Publix Super Markets / NextEra Energy" },
  GA: { landmark: "Martin Luther King Jr. Historic Site", fact: "Atlanta's Hartsfield-Jackson Airport is the busiest airport in the world.", motto: "Wisdom, Justice, and Moderation", brand: "Coca-Cola / Delta Air Lines / Home Depot" },
  HI: { landmark: "Pearl Harbor & Diamond Head", fact: "The youngest state in the union and the only one made entirely of islands.", motto: "The life of the land is perpetuated in righteousness", brand: "Hawaiian Airlines" },
  ID: { landmark: "Craters of the Moon", fact: "Produces one-third of all potatoes grown in the United States.", motto: "Let it be perpetual", brand: "Albertsons / Micron Technology" },
  IL: { landmark: "Willis (Sears) Tower", fact: "Chicago built the world's first modern skyscraper (Home Insurance Building) in 1885.", motto: "State sovereignty, national union", brand: "McDonald's / Abbott Labs / Caterpillar" },
  IN: { landmark: "Indianapolis Motor Speedway", fact: "Hosts the Indy 500, the world's largest single-day sporting event.", motto: "The Crossroads of America", brand: "Eli Lilly / Cummins" },
  IA: { landmark: "Field of Dreams", fact: "Produces more corn, pork, and eggs than any other state in the nation.", motto: "Our liberties we prize and our rights we will maintain", brand: "John Deere (Manufacturing hub)" },
  KS: { landmark: "Monument Rocks", fact: "Known as the wheat capital of the world, producing millions of bushels annually.", motto: "To the stars through difficulties", brand: "Koch Industries / Garmin" },
  KY: { landmark: "Churchill Downs (Kentucky Derby)", fact: "Produces 95% of the world's total supply of Bourbon whiskey.", motto: "United we stand, divided we fall", brand: "Kentucky Bourbon Brands / Humana" },
  LA: { landmark: "New Orleans French Quarter", fact: "Birthplace of Jazz music and home of the world-famous Mardi Gras festival.", motto: "Union, Justice, and Confidence", brand: "Entergy" },
  ME: { landmark: "Acadia National Park", fact: "Produces 90% of the country's domestic lobster supply.", motto: "I lead", brand: "L.L. Bean" },
  MD: { landmark: "Fort McHenry National Monument", fact: "Where Francis Scott Key wrote 'The Star-Spangled Banner' in 1814.", motto: "Manly deeds, womanly words", brand: "Lockheed Martin / Under Armour" },
  MA: { landmark: "Harvard Yard & Freedom Trail", fact: "Boston established America's first public park (Boston Common) in 1634.", motto: "By the sword we seek peace, but peace only under liberty", brand: "Fidelity Investments / Boston Dynamics" },
  MI: { landmark: "Henry Ford Museum & Mackinac Bridge", fact: "Birthplace of Henry Ford's assembly line and the historic Motown sound.", motto: "If you seek a pleasant peninsula, look about you", brand: "Ford Motor Company / General Motors / Whirlpool" },
  MN: { landmark: "Mall of America", fact: "Has 11,842 lakes, despite its famous nickname 'Land of 10,000 Lakes'.", motto: "The Star of the North", brand: "Target / 3M / UnitedHealth Group" },
  MS: { landmark: "Mississippi Delta Region", fact: "The birth site of Blues music and birthplace of rock legend Elvis Presley.", motto: "By valor and arms", brand: "Sanderson Farms" },
  MO: { landmark: "Gateway Arch St. Louis", fact: "The Gateway Arch is the tallest man-made monument in the Western Hemisphere.", motto: "Let the welfare of the people be the supreme law", brand: "Anheuser-Busch / H&R Block" },
  MT: { landmark: "Glacier National Park", fact: "Contains the Triple Divide Peak, where water flows to three different oceans.", motto: "Gold and Silver", brand: "Montana Resources" },
  NE: { landmark: "Chimney Rock Site", fact: "Has the only unicameral (single-chamber) state legislature in the nation.", motto: "Equality before the law", brand: "Berkshire Hathaway" },
  NV: { landmark: "Las Vegas Strip & Hoover Dam", fact: "Produces more gold than any state, ranking behind only China, Australia, and Russia.", motto: "All for Our Country", brand: "MGM Resorts / Caesars Entertainment" },
  NH: { landmark: "Mount Washington Observatory", fact: "Mount Washington once held the world record for the highest wind speed (231 mph).", motto: "Live Free or Die", brand: "Timberland" },
  NJ: { landmark: "Atlantic City Boardwalk", fact: "Has the highest population density of any U.S. state.", motto: "Liberty and prosperity", brand: "Johnson & Johnson / Prudential Financial" },
  NM: { landmark: "Carlsbad Caverns National Park", fact: "Santa Fe, founded in 1610, is the oldest capital city in the United States.", motto: "It grows as it goes", brand: "Sandia National Labs" },
  NY: { landmark: "Statue of Liberty & Times Square", fact: "New York City was the first capital of the United States under the Constitution.", motto: "Ever upward", brand: "IBM / JPMorgan Chase / Pfizer / PepsiCo" },
  NC: { landmark: "Kitty Hawk & Biltmore Estate", fact: "Site of the Wright Brothers' first successful airplane flight in 1903.", motto: "To be, rather than to seem", brand: "Bank of America / Lowe's / Epic Games" },
  ND: { landmark: "Theodore Roosevelt National Park", fact: "Grows more sunflowers and produces more honey than any other state.", motto: "Liberty and union, now and forever, one and inseparable", brand: "Bobcat Company" },
  OH: { landmark: "Rock & Roll Hall of Fame", fact: "Known as the 'Mother of Presidents', having birthed 8 U.S. presidents.", motto: "With God, all things are possible", brand: "Procter & Gamble / Kroger" },
  OK: { landmark: "National Cowboy Museum", fact: "Has the largest population of Native American tribes in the nation.", motto: "Labor conquers all things", brand: "Devon Energy / Love's Travel Stops" },
  OR: { landmark: "Crater Lake National Park", fact: "Crater Lake is the deepest lake in the U.S. and has exceptionally pure water.", motto: "She flies with her own wings", brand: "Nike / Columbia Sportswear" },
  PA: { landmark: "Independence Hall & Gettysburg", fact: "Where both the Declaration of Independence and the Constitution were signed.", motto: "Virtue, liberty, and independence", brand: "Comcast / Hershey's" },
  RI: { landmark: "Newport Gilded Age Mansions", fact: "The first colony to renounce allegiance to the British Crown on May 4, 1776.", motto: "Hope", brand: "CVS Health / Hasbro" },
  SC: { landmark: "Fort Sumter National Monument", fact: "The first shots of the American Civil War were fired at Fort Sumter in 1861.", motto: "While I breathe, I hope", brand: "Sonoco Products" },
  SD: { landmark: "Mount Rushmore Memorial", fact: "Features the 60-foot granite heads of Washington, Jefferson, Roosevelt, and Lincoln.", motto: "Under God the people rule", brand: "Sanford Health" },
  TN: { landmark: "Graceland & Grand Ole Opry", fact: "Great Smoky Mountains is the most visited National Park in the United States.", motto: "Agriculture and Commerce", brand: "FedEx / HCA Healthcare / Dollar General" },
  TX: { landmark: "The Alamo & NASA Space Center", fact: "Only state to enter by treaty, and was its own independent republic for 9 years.", motto: "Friendship", brand: "ExxonMobil / AT&T / Tesla / Texas Instruments" },
  UT: { landmark: "Zion National Park & Arches", fact: "Has the youngest average population age in the United States.", motto: "Industry", brand: "Huntsman / Overstock" },
  VT: { landmark: "Green Mountain Forest", fact: "The largest producer of maple syrup in the United States.", motto: "Freedom and Unity", brand: "Ben & Jerry's / Keurig Dr Pepper" },
  VA: { landmark: "Monticello & Jamestown", fact: "Known as the 'Birthplace of a Nation'—four of the first five U.S. presidents were Virginian.", motto: "Thus always to tyrants", brand: "General Dynamics / Northrop Grumman" },
  WA: { landmark: "Space Needle & Mount Rainier", fact: "Home of aerospace and tech giants Boeing, Microsoft, Amazon, and Starbucks.", motto: "By and by", brand: "Microsoft / Amazon / Costco / Starbucks" },
  WV: { landmark: "New River Gorge Bridge", fact: "The first state to introduce a sales tax (in 1921).", motto: "Mountaineers are always free", brand: "Wheeling-Pittsburgh Steel" },
  WI: { landmark: "Wisconsin Dells & Lambeau Field", fact: "Produces over 2 billion pounds of cheese annually, leading the nation.", motto: "Forward", brand: "Harley-Davidson / Northwestern Mutual" },
  WY: { landmark: "Yellowstone National Park", fact: "Yellowstone was established in 1872 as the world's first national park.", motto: "Equal Rights", brand: "Wyoming Coal Mines" }
};

// ─── Region Palette ───────────────────────────────────────────────────────────
// Semi-transparent, softer colors — vivid enough to distinguish on black, but
// not so opaque they look like solid painted states.
const REGION_COLORS: Record<string, { base: string; hover: string; border: string; label: string; stroke: string }> = {
  Northeast: {
    base:   "hsla(240,65%,58%,0.34)",   // increased indigo opacity
    hover:  "hsla(240,72%,66%,0.52)",
    border: "hsl(240 65% 62%)",
    label:  "#818cf8",
    stroke: "hsla(240,72%,66%,0.70)",    // slightly brighter border
  },
  South: {
    base:   "hsla(355,75%,48%,0.34)",   // increased crimson opacity
    hover:  "hsla(355,80%,58%,0.52)",
    border: "hsl(355 75% 52%)",
    label:  "#f87171",
    stroke: "hsla(355,80%,58%,0.70)",
  },
  Midwest: {
    base:   "hsla(158,62%,38%,0.34)",   // increased emerald opacity
    hover:  "hsla(158,68%,48%,0.52)",
    border: "hsl(158 62% 42%)",
    label:  "#34d399",
    stroke: "hsla(158,68%,48%,0.70)",
  },
  West: {
    base:   "hsla(38,90%,50%,0.32)",    // increased amber opacity
    hover:  "hsla(38,95%,60%,0.50)",
    border: "hsl(38 90% 54%)",
    label:  "#fbbf24",
    stroke: "hsla(38,95%,60%,0.70)",
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
function StatTicker({ locale }: { locale: "en" | "ro" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: MapPin,
      unit: "States",
      value: "50",
      label: locale === "ro" ? "State Constitutive" : "Constituent States",
      detail: locale === "ro" ? "& 1 District Federal" : "& 1 Federal District",
    },
    {
      icon: Users,
      unit: "Population",
      value: "335M",
      label: locale === "ro" ? "Populație Totală" : "Total Population",
      detail: locale === "ro" ? "A 3-a din lume" : "3rd largest on Earth",
    },
    {
      icon: TrendingUp,
      unit: "National GDP",
      value: "$29.2T",
      label: locale === "ro" ? "Produs Intern Brut" : "Gross Domestic Product",
      detail: locale === "ro" ? "Cea mai mare economie" : "Largest in the world",
    },
    {
      icon: Maximize2,
      unit: "Square Miles",
      value: "3.8M",
      label: locale === "ro" ? "Suprafață Totală" : "Total Area",
      detail: locale === "ro" ? "A 4-a din lume" : "4th largest country",
    },
    {
      icon: Compass,
      unit: "Years",
      value: "248",
      label: locale === "ro" ? "Ani de Democrație" : "Years of Democracy",
      detail: locale === "ro" ? "Din 1788" : "Constitution since 1788",
    },
    {
      icon: Zap,
      unit: "Innovation",
      value: "#1",
      label: locale === "ro" ? "Index Inovare" : "Innovation Index",
      detail: locale === "ro" ? "Lider global în brevete" : "Global patent leader",
    },
    {
      icon: Trees,
      unit: "National Parks",
      value: "63",
      label: locale === "ro" ? "Parcuri Naționale" : "National Parks",
      detail: locale === "ro" ? "84M+ acri protejați" : "84M+ acres preserved",
    },
    {
      icon: Anchor,
      unit: "Coastline",
      value: "95,471 mi",
      label: locale === "ro" ? "Linie de Coastă" : "Ocean Coastline",
      detail: locale === "ro" ? "Trei oceane limitrofe" : "Three bordering oceans",
    },
  ];

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            className="flex flex-col justify-between bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] rounded-2xl p-4 transition-all duration-300 group"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-white/30 group-hover:text-white/50 transition-colors">
                <Icon className="h-3.5 w-3.5 text-[#fbbf24] group-hover:scale-110 transition-transform duration-300" />
                <span className="font-body text-[9px] uppercase tracking-[0.18em] font-bold">{stat.unit}</span>
              </div>
              <div>
                <span className="font-hero text-2xl text-white leading-none tracking-tight block">
                  {stat.value}
                </span>
                <span className="font-display text-xs text-white/70 font-semibold mt-1.5 block leading-tight">
                  {stat.label}
                </span>
                <span className="font-body text-[10px] text-white/40 block mt-0.5 leading-tight">
                  {stat.detail}
                </span>
              </div>
            </div>
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

// ─── Population Rank Bar ────────────────────────────────────────────────────
function PopRankBar({ rank, color }: { rank: number; color: string }) {
  const fillPct = Math.round(((51 - rank) / 50) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">Population Rank</span>
        <span className="font-hero text-sm" style={{ color }}>#{rank} <span className="font-mono text-[9px] text-white/30">/ 50</span></span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
        <motion.div
          key={rank}
          initial={{ width: 0 }}
          animate={{ width: `${fillPct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}99, ${color})` }}
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
  // Hover tooltip: {x, y} relative to the map container
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const statesArray = useMemo(() => Object.values(EXPLORER_STATES).filter((s) => s.abbrev !== "DC"), []);

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

  const gdpRank = useMemo(
    () => gdpRanked.indexOf(selectedStateAbbrev) + 1,
    [gdpRanked, selectedStateAbbrev]
  );

  const gdpPerCapita = useMemo(
    () => selectedState.population > 0
      ? Math.round((selectedState.gdp * 1000) / selectedState.population)
      : 0,
    [selectedState]
  );

  const popDensity = useMemo(
    () => selectedState.area > 0
      ? Math.round((selectedState.population * 1_000_000) / selectedState.area)
      : 0,
    [selectedState]
  );

  const popRanked = useMemo(
    () => [...statesArray].sort((a, b) => b.population - a.population).map((s) => s.abbrev),
    [statesArray]
  );

  const popRank = useMemo(
    () => popRanked.indexOf(selectedStateAbbrev) + 1,
    [popRanked, selectedStateAbbrev]
  );

  const areaRanked = useMemo(
    () => [...statesArray].sort((a, b) => b.area - a.area).map((s) => s.abbrev),
    [statesArray]
  );

  const areaRank = useMemo(
    () => areaRanked.indexOf(selectedStateAbbrev) + 1,
    [areaRanked, selectedStateAbbrev]
  );

  const regionalPeers = useMemo(
    () => statesArray
      .filter((s) => s.region === selectedState.region && s.abbrev !== selectedState.abbrev)
      .sort((a, b) => b.gdp - a.gdp),
    [statesArray, selectedState]
  );

  const top5Gdp = useMemo(
    () => [...statesArray].sort((a, b) => b.gdp - a.gdp).slice(0, 5),
    [statesArray]
  );

  const top5Pop = useMemo(
    () => [...statesArray].sort((a, b) => b.population - a.population).slice(0, 5),
    [statesArray]
  );

  const getGeographyStyle = useCallback(
    (geo: any) => {
      const fips = geo.id?.toString().padStart(2, "0") ?? "";
      const abbrev = FIPS_TO_ABBREV[fips] ?? "";
      const state = EXPLORER_STATES[abbrev];

      if (!state || abbrev === "DC") {
        return { fill: "#0c0c0c", stroke: "rgba(255,255,255,0.15)", strokeWidth: 0.8, outline: "none" };
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
      let stroke: string;

      if (!isMatch) {
        fill = "#111111";
        stroke = "rgba(255,255,255,0.12)";
      } else if (heatmapMode === "none") {
        const rc = REGION_COLORS[state.region];
        fill = isHovered ? rc.hover : rc.base;
        stroke = isHovered ? rc.border : rc.stroke;
      } else if (heatmapMode === "gdp") {
        const r = Math.sqrt(state.gdp / maxValues.maxGdp);
        fill = isHovered
          ? `hsla(38,95%,62%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(38,90%,50%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "population") {
        const r = Math.sqrt(state.population / maxValues.maxPop);
        fill = isHovered
          ? `hsla(210,85%,62%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(210,80%,52%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = "rgba(255,255,255,0.30)";
      } else {
        const r = (51 - state.statehoodOrder) / 50;
        fill = isHovered
          ? `hsla(355,82%,58%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(355,76%,46%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = "rgba(255,255,255,0.30)";
      }

      return {
        fill,
        stroke,
        strokeWidth: 0.85,
        outline: "none",
        transition: "fill 0.15s ease",
      };
    },
    [selectedStateAbbrev, hoveredStateAbbrev, heatmapMode, maxValues, selectedRegion, searchQuery, locale]
  );

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
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.32em] text-[#fbbf24] mb-4">
            FROM SEA TO SHINING SEA
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
          <StatTicker locale={locale} />
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
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-black/80 p-3 backdrop-blur-md max-w-[280px]">
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
              {/* Dynamic Heatmap Legend scale key */}
              {heatmapMode !== "none" && (
                <div className="mt-3 space-y-2 pt-2 border-t border-white/[0.06]">
                  {/* Color Gradient Scale */}
                  <div
                    className="h-1.5 w-full rounded-full"
                    style={{
                      background:
                        heatmapMode === "gdp"
                          ? "linear-gradient(to right, hsla(38,90%,50%,0.22), hsl(38,95%,62%))"
                          : heatmapMode === "population"
                          ? "linear-gradient(to right, hsla(210,80%,52%,0.22), hsl(210,85%,62%))"
                          : "linear-gradient(to right, hsla(355,76%,46%,0.22), hsl(355,82%,58%))",
                    }}
                  />

                  {/* Left / Right End Labels */}
                  <div className="flex justify-between font-mono text-[8px] text-white/50 leading-tight">
                    {heatmapMode === "gdp" && (
                      <>
                        <span>Low (&lt; $50B)</span>
                        <span className="text-right">Peak ($3.9T · CA)</span>
                      </>
                    )}
                    {heatmapMode === "population" && (
                      <>
                        <span>Low (&lt; 1M)</span>
                        <span className="text-right">Peak (39M · CA)</span>
                      </>
                    )}
                    {heatmapMode === "statehood" && (
                      <>
                        <span>Oldest (1787 · DE)</span>
                        <span className="text-right">Newest (1959 · HI)</span>
                      </>
                    )}
                  </div>

                  {/* Segmented Legend Key Breakdown */}
                  <div className="space-y-1.5 pt-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-white/30 block">
                      {locale === "ro" ? "Ghid de Culori" : "Color Scale Key"}
                    </span>
                    {heatmapMode === "gdp" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(38,90%,50%,0.25)]" />
                          <span>&lt; $100B (e.g., WY, VT, AK)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(38,90%,50%,0.50)]" />
                          <span>$100B - $500B (e.g., AL, CO, OR)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(38,95%,62%,0.85)]" />
                          <span>&gt; $1T (e.g., CA, TX, NY, FL)</span>
                        </div>
                      </div>
                    )}
                    {heatmapMode === "population" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(210,80%,52%,0.25)]" />
                          <span>&lt; 2M (e.g., WY, AK, DE)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(210,80%,52%,0.50)]" />
                          <span>2M - 10M (e.g., OR, AL, AZ)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(210,85%,62%,0.85)]" />
                          <span>&gt; 15M (e.g., CA, TX, FL, NY)</span>
                        </div>
                      </div>
                    )}
                    {heatmapMode === "statehood" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(355,82%,58%,0.85)]" />
                          <span>1787 - 1790 (Founding States)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(355,76%,46%,0.50)]" />
                          <span>1800 - 1880 (Union expansion)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(355,76%,46%,0.25)]" />
                          <span>1889 - 1959 (Modern States)</span>
                        </div>
                      </div>
                    )}
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
            <div
              className="relative h-[280px] w-full sm:h-[450px] md:h-[560px] lg:h-[640px] px-2 py-4 pb-12"
              onMouseMove={(e: ReactMouseEvent<HTMLDivElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => { setTooltipPos(null); }}
            >
              {/* Hover tooltip */}
              {tooltipPos && hoveredStateAbbrev && EXPLORER_STATES[hoveredStateAbbrev] && (() => {
                const hs = EXPLORER_STATES[hoveredStateAbbrev];
                const rc = REGION_COLORS[hs.region];
                const hr = gdpRanked.indexOf(hoveredStateAbbrev) + 1;
                return (
                  <div
                    className="pointer-events-none absolute z-50 rounded-xl border bg-black/90 backdrop-blur-md px-3 py-2.5 shadow-2xl"
                    style={{
                      left: tooltipPos.x + 14,
                      top: tooltipPos.y - 52,
                      borderColor: rc.border,
                      minWidth: 160,
                      transform: tooltipPos.x > 700 ? "translateX(-110%)" : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="font-display text-sm font-bold text-white">{hs.name[locale]}</span>
                      <span className="font-hero text-xs" style={{ color: rc.label }}>{hs.abbrev}</span>
                    </div>
                    <div className="flex gap-3 font-mono text-[9px] text-white/50">
                      <span>GDP <span className="text-white/80">${hs.gdp}B</span></span>
                      <span>Pop <span className="text-white/80">{hs.population}M</span></span>
                      <span>#{hr}</span>
                    </div>
                    <div className="mt-1 font-mono text-[9px]" style={{ color: rc.label }}>{hs.region}</div>
                  </div>
                );
              })()}
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

                  {/* GDP + Population Rank Bars */}
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 space-y-4">
                    <GdpRankBar rank={gdpRank} />
                    <div className="h-px bg-white/[0.06]" />
                    <PopRankBar rank={popRank} color="#60a5fa" />
                    <div className="flex justify-between font-mono text-[9px] text-white/20 pt-1">
                      <span>Rank 1 = California</span>
                      <span>of 50 states</span>
                    </div>
                  </div>
                  {/* Area rank pill */}
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">Area Rank</span>
                    <div className="flex items-center gap-2">
                      <span className="font-hero text-base text-[#34d399]">#{areaRank}</span>
                      <span className="font-mono text-[9px] text-white/25">/ 50 · {selectedState.area.toLocaleString()} sq mi</span>
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

              {/* Row 2: Landmark, Fact and Rankings */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 pt-6 border-t border-white/[0.06]">
                {/* Landmark & Fact (5 columns) */}
                <div className="md:col-span-5 flex flex-col justify-between bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#fbbf24]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">Iconic Landmark</span>
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-white truncate">
                        {STATE_TRIVIA[selectedState.abbrev]?.landmark || "National Monument"}
                      </h4>
                      <p className="font-body text-[10px] text-white/45 mt-1 uppercase tracking-wider font-mono">
                        State Heritage Site
                      </p>
                    </div>
                    <p className="font-body text-xs text-white/75 leading-relaxed">
                      <strong>{locale === "ro" ? "Fapt istoric:" : "Historical Fact:"}</strong> {STATE_TRIVIA[selectedState.abbrev]?.fact || "A center of American heritage and pride."}
                    </p>
                  </div>
                </div>

                {/* Identity & Brand (4 columns) */}
                <div className="md:col-span-4 flex flex-col justify-between bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#fbbf24]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                        {locale === "ro" ? "Identitate & Brand" : "Identity & Brand"}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-display text-xs font-bold text-white/40 uppercase tracking-wider font-mono">
                        {locale === "ro" ? "Motto Oficial" : "Official Motto"}
                      </h5>
                      <p className="font-body text-xs text-white/75 italic mt-1 leading-relaxed">
                        "{STATE_TRIVIA[selectedState.abbrev]?.motto || "Liberty & Prosperity"}"
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/[0.04]">
                      <h5 className="font-display text-xs font-bold text-white/40 uppercase tracking-wider font-mono">
                        {locale === "ro" ? "Brand / Entitate Emblematică" : "Iconic Brand / Entity"}
                      </h5>
                      <p className="font-body text-xs font-semibold text-[#fbbf24] mt-1 leading-relaxed">
                        {STATE_TRIVIA[selectedState.abbrev]?.brand || "National Enterprise"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* State Rankings (3 columns) */}
                <div className="md:col-span-3 flex flex-col justify-between bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all">
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 block">Comparative Rankings</span>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-mono text-[8px] uppercase">GDP Rank</span>
                        <span className="text-white font-semibold">#{gdpRank}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-mono text-[8px] uppercase">Pop Rank</span>
                        <span className="text-white font-semibold">#{popRank}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-mono text-[8px] uppercase">Area Rank</span>
                        <span className="text-white font-semibold">#{areaRank}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* ── REGIONAL PEERS PANEL ── */}
          <div className="rounded-3xl border border-white/[0.07] bg-[#0a0a0a] p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1">Same Region</p>
                <h3 className="font-display text-base font-bold text-white">
                  {selectedState.region} States
                  <span className="ml-2 font-mono text-[10px] font-normal" style={{ color: REGION_COLORS[selectedState.region]?.label }}>
                    · {regionalPeers.length + 1} total
                  </span>
                </h3>
              </div>
              <div
                className="h-2 w-2 rounded-full"
                style={{ background: REGION_COLORS[selectedState.region]?.border, boxShadow: `0 0 8px ${REGION_COLORS[selectedState.region]?.border}` }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {/* Selected state first */}
              <div
                className="rounded-xl p-3 border cursor-default"
                style={{
                  background: `${REGION_COLORS[selectedState.region]?.base}20`,
                  borderColor: REGION_COLORS[selectedState.region]?.border,
                }}
              >
                <div className="font-hero text-xs" style={{ color: REGION_COLORS[selectedState.region]?.label }}>{selectedState.abbrev} ★</div>
                <div className="font-body text-xs font-semibold text-white truncate mt-0.5">{selectedState.name[locale]}</div>
                <div className="font-mono text-[9px] text-white/40 mt-1">${selectedState.gdp}B</div>
              </div>
              {regionalPeers.map((peer) => (
                <div
                  key={peer.abbrev}
                  onClick={() => setSelectedStateAbbrev(peer.abbrev)}
                  className="rounded-xl p-3 border border-white/[0.06] bg-white/[0.03] cursor-pointer hover:border-white/20 transition-all"
                >
                  <div className="font-hero text-xs" style={{ color: REGION_COLORS[peer.region]?.label }}>{peer.abbrev}</div>
                  <div className="font-body text-xs font-semibold text-white/80 truncate mt-0.5">{peer.name[locale]}</div>
                  <div className="font-mono text-[9px] text-white/35 mt-1">${peer.gdp}B</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── NATIONAL LEADERBOARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top 5 GDP */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#0a0a0a] p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1">National Ranking</p>
              <h3 className="font-display text-base font-bold text-white mb-4">Top 5 · GDP</h3>
              <div className="space-y-2.5">
                {top5Gdp.map((s, i) => {
                  const isCurrentState = s.abbrev === selectedStateAbbrev;
                  const barWidth = Math.round((s.gdp / top5Gdp[0].gdp) * 100);
                  return (
                    <div
                      key={s.abbrev}
                      onClick={() => setSelectedStateAbbrev(s.abbrev)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-white/30 w-4">#{i + 1}</span>
                          <span className={`font-body text-xs font-semibold ${isCurrentState ? "text-[#fbbf24]" : "text-white/80 group-hover:text-white"}`}>
                            {s.name[locale]}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-white/50">${s.gdp}B</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/[0.05] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${barWidth}%`,
                            background: isCurrentState
                              ? "linear-gradient(to right, #fbbf2460, #fbbf24)"
                              : "rgba(255,255,255,0.12)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top 5 Population */}
            <div className="rounded-3xl border border-white/[0.07] bg-[#0a0a0a] p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1">National Ranking</p>
              <h3 className="font-display text-base font-bold text-white mb-4">Top 5 · Population</h3>
              <div className="space-y-2.5">
                {top5Pop.map((s, i) => {
                  const isCurrentState = s.abbrev === selectedStateAbbrev;
                  const barWidth = Math.round((s.population / top5Pop[0].population) * 100);
                  return (
                    <div
                      key={s.abbrev}
                      onClick={() => setSelectedStateAbbrev(s.abbrev)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-white/30 w-4">#{i + 1}</span>
                          <span className={`font-body text-xs font-semibold ${isCurrentState ? "text-[#60a5fa]" : "text-white/80 group-hover:text-white"}`}>
                            {s.name[locale]}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-white/50">{s.population}M</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/[0.05] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${barWidth}%`,
                            background: isCurrentState
                              ? "linear-gradient(to right, #60a5fa60, #60a5fa)"
                              : "rgba(255,255,255,0.12)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          {/* ── PATRIOTIC INSPIRATION BANNER ── */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#050505] p-6 sm:p-8 mt-4 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-black to-blue-950/10 opacity-30 pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-3">
              <span className="font-body text-[9px] uppercase tracking-[0.2em] text-[#fbbf24] font-bold block">American Legacy</span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">E Pluribus Unum — Out of Many, One</h3>
              <p className="font-body text-xs sm:text-sm text-white/60 leading-relaxed">
                The United States of America is a federal republic of 50 diverse states spanning ancient forests, endless plains, deep canyons, and majestic coastlines. From the founding thirteen colonies along the Atlantic coast to the towering volcanic peaks of the Pacific Northwest, each state contributes its own unique economy, heritage, and character to the shared tapestry of the Union.
              </p>
            </div>
          </div>

          {/* ── STATES DIRECTORY ── */}
          <div className="pt-4 border-t border-white/[0.05]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <h3 className="font-body text-[10px] font-bold tracking-[0.18em] text-white/30 uppercase">
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
