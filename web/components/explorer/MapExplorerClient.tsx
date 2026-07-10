"use client";

import { useState, useMemo, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
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
  Flag,
  X,
  ZoomIn,
  Landmark,
  Scale,
  ScrollText,
  Award,
  Gavel,
} from "lucide-react";
import { EXPLORER_STATES, StateData } from "@/lib/data/explorer-data";
import { STATE_EXTENDED_DATA } from "@/lib/data/state-details";
import { COLORS } from "@/lib/constants";

import { GEO_URL, FIPS_TO_ABBREV } from "@/lib/data/us-geo";
import { InterstateCooperationMap } from "@/components/explorer/InterstateCooperationMap";
import { StateRevenueBudget } from "@/components/explorer/StateRevenueBudget";


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
    // Extended state profile
    flagSeal: string;
    capitolLabel: string;
    flagLabel: string;
    sealLabel: string;
    admissionLabel: string;
    governmentTitle: string;
    governorLabel: string;
    legislatureLabel: string;
    electoralVotesLabel: string;
    politicalStructureLabel: string;
    uniqueLawsTitle: string;
    historicalFirstsTitle: string;
    // State constitutions
    amendHeat: string;
    lengthHeat: string;
    constitutionsEyebrow: string;
    constitutionsTitle: string;
    constitutionsIntro: string;
    viewOnMap: string;
    oldestLabel: string;
    longestLabel: string;
    shortestLabel: string;
    mostAmendedLabel: string;
    adoptedLabel: string;
    amendmentsLabel: string;
    lengthLabel: string;
    vsLongest: string;
    wordsLabel: string;
    provisionsLabel: string;
    /** Contains a `{avg}` placeholder replaced with the mean word count. */
    avgLengthNote: string;
    // Interstate cooperation
    cooperation: {
      eyebrow: string;
      title: string;
      intro: string;
      membersLabel: string;
      establishedLabel: string;
      statesLabel: string;
      historyLabel: string;
    };
    // How states make money
    revenue: {
      eyebrow: string;
      title: string;
      intro: string;
      totalLabel: string;
      perResidentLabel: string;
      vsNationalLabel: string;
      sourceLabel: string;
      shareLabel: string;
      noIncomeTax: string;
      noSalesTax: string;
      sourceNote: string;
    };
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
      unit: "Democracy",
      value: "248 Years",
      label: locale === "ro" ? "Democrație Neîntreruptă" : "Unbroken Democracy",
      detail: locale === "ro" ? "Constituție din 1788" : "Constitution since 1788",
    },
  ];

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 w-full"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex flex-col justify-between bg-[#070707] border border-white/[0.06] hover:border-white/[0.12] hover:bg-[#0c0c0c] rounded-2xl p-5 transition-all duration-300 group shadow-lg"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-white/30 group-hover:text-white/50 transition-colors">
                <Icon className="h-3.5 w-3.5 text-[#fbbf24] group-hover:scale-110 transition-transform duration-300" />
                <span className="font-body text-[9px] uppercase tracking-[0.18em] font-bold">{stat.unit}</span>
              </div>
              <div>
                <span className="font-hero text-2xl sm:text-3xl text-white leading-none tracking-tight block">
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
        <span className="font-body text-[10px] uppercase tracking-widest text-white/35 font-semibold">GDP Rank</span>
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
        <span className="font-body text-[10px] uppercase tracking-widest text-white/35 font-semibold">Population Rank</span>
        <span className="font-hero text-sm" style={{ color }}>#{rank} <span className="font-body text-[10px] text-white/30">/ 50</span></span>
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
  const [heatmapMode, setHeatmapMode] = useState<
    "none" | "gdp" | "population" | "statehood" | "amendments" | "conLength"
  >("none");
  // Hover tooltip: {x, y} relative to the map container
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Fullscreen viewer for the state flag / seal.
  const [symbol, setSymbol] = useState<{ src: string; label: string } | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    if (!symbol) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSymbol(null);
    };
    document.addEventListener("keydown", onKey);
    // Lock scroll on BOTH <html> and <body> (the document scroller varies) and
    // compensate for the removed scrollbar so the page doesn't jump.
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const scrollbarW = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.style.paddingRight = prevPad;
    };
  }, [symbol]);

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
    let maxGdp = 0, maxPop = 0, maxOrder = 0, maxAmend = 0, maxWords = 0;
    statesArray.forEach((s) => {
      if (s.gdp > maxGdp) maxGdp = s.gdp;
      if (s.population > maxPop) maxPop = s.population;
      if (s.statehoodOrder > maxOrder) maxOrder = s.statehoodOrder;
      const c = STATE_EXTENDED_DATA[s.abbrev]?.constitution;
      if (c) {
        if (c.amendmentsCount > maxAmend) maxAmend = c.amendmentsCount;
        if (c.wordCount > maxWords) maxWords = c.wordCount;
      }
    });
    return { maxGdp, maxPop, maxOrder, maxAmend, maxWords };
  }, [statesArray]);

  /** Extended profile (governor, flag, laws, constitution) for the selected state. */
  const extended = useMemo(
    () => STATE_EXTENDED_DATA[selectedState.abbrev],
    [selectedState.abbrev]
  );

  /** National constitution superlatives, used by the State Constitutions section. */
  const constitutionFacts = useMemo(() => {
    const rows = statesArray
      .map((s) => ({ state: s, con: STATE_EXTENDED_DATA[s.abbrev]?.constitution }))
      .filter((r): r is { state: StateData; con: NonNullable<typeof r.con> } => Boolean(r.con));
    const longest = [...rows].sort((a, b) => b.con.wordCount - a.con.wordCount)[0];
    const shortest = [...rows].sort((a, b) => a.con.wordCount - b.con.wordCount)[0];
    const oldest = [...rows].sort((a, b) => a.con.adoptedYear - b.con.adoptedYear)[0];
    const mostAmended = [...rows].sort((a, b) => b.con.amendmentsCount - a.con.amendmentsCount)[0];
    const avgWords = Math.round(rows.reduce((t, r) => t + r.con.wordCount, 0) / rows.length);
    return { rows, longest, shortest, oldest, mostAmended, avgWords };
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

  /** Rank orderings for the constitution heatmaps (used by the hover tooltip). */
  const amendRanked = useMemo(
    () =>
      [...statesArray]
        .sort(
          (a, b) =>
            (STATE_EXTENDED_DATA[b.abbrev]?.constitution.amendmentsCount ?? 0) -
            (STATE_EXTENDED_DATA[a.abbrev]?.constitution.amendmentsCount ?? 0)
        )
        .map((s) => s.abbrev),
    [statesArray]
  );

  const wordRanked = useMemo(
    () =>
      [...statesArray]
        .sort(
          (a, b) =>
            (STATE_EXTENDED_DATA[b.abbrev]?.constitution.wordCount ?? 0) -
            (STATE_EXTENDED_DATA[a.abbrev]?.constitution.wordCount ?? 0)
        )
        .map((s) => s.abbrev),
    [statesArray]
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
      } else if (heatmapMode === "amendments") {
        const amend = STATE_EXTENDED_DATA[abbrev]?.constitution.amendmentsCount ?? 0;
        const r = maxValues.maxAmend > 0 ? Math.sqrt(amend / maxValues.maxAmend) : 0;
        fill = isHovered
          ? `hsla(265,80%,68%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(265,72%,56%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "conLength") {
        const words = STATE_EXTENDED_DATA[abbrev]?.constitution.wordCount ?? 0;
        const r = maxValues.maxWords > 0 ? Math.sqrt(words / maxValues.maxWords) : 0;
        fill = isHovered
          ? `hsla(165,75%,58%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(165,68%,44%,${(0.22 + r * 0.58).toFixed(2)})`;
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

      {/* Full-bleed: the explorer uses the whole viewport width, not a centred column. */}
      <div className="relative z-10 w-full px-4 pt-28 pb-24 sm:px-6 lg:px-8 2xl:px-12 font-body">

        {/* ── HEADER ── */}
        <header className="mb-16 text-center">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.32em] text-[#fbbf24] mb-4">
            FROM SEA TO SHINING SEA
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl text-balance mb-4">
            {translations.title}
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg text-white/40 leading-relaxed">
            {translations.subtitle}
          </p>
        </header>

        {/* ── NATIONAL STATS TICKER ── */}
        <div className="mb-16">
          <StatTicker locale={locale} />
        </div>

        <div className="space-y-12">

          {/* ── CONTROLS TOOLBAR ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.06] mb-4">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder={translations.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/[0.08] bg-transparent py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:border-[#fbbf24]/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Region Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto justify-start md:justify-end pb-2 md:pb-0">
              <ListFilter className="h-3.5 w-3.5 text-white/30 shrink-0 mr-1" />
              {regionButtons.map((reg) => {
                const isActive = selectedRegion === reg.id;
                return (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg.id)}
                    className="shrink-0 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase transition-all duration-200"
                    style={{
                      background: isActive ? `${reg.color}15` : "transparent",
                      border: `1px solid ${isActive ? reg.color : "rgba(255,255,255,0.06)"}`,
                      color: isActive ? reg.color : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {reg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── MAP CONTAINER ──
              Mobile: a flex column (controls → map → legend) so nothing overlaps.
              `sm` and up: a positioning context for the floating overlays. */}
          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.05] bg-black shadow-2xl sm:block">

            {/* Heatmap overlay selector — stacked above the map on mobile so it
                never covers the geography; floats over the map from `sm` up. */}
            <div className="relative z-20 m-3 flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-black/80 p-3 backdrop-blur-md max-w-none sm:absolute sm:top-4 sm:left-4 sm:m-0 sm:max-w-[280px]">
              <span className="font-body text-[10px] tracking-[0.18em] text-white/35 uppercase flex items-center gap-1.5 font-bold">
                <Layers className="h-3 w-3 text-[#fbbf24]" />
                {translations.heatmapMode}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {[
                  { id: "none",       label: translations.defaultColor,   activeColor: "#fbbf24" },
                  { id: "gdp",        label: translations.gdpHeat,        activeColor: "#fbbf24" },
                  { id: "population", label: translations.popHeat,        activeColor: "#60a5fa" },
                  { id: "statehood",  label: translations.statehoodHeat,  activeColor: "#f87171" },
                  { id: "amendments", label: translations.amendHeat,      activeColor: "#a78bfa" },
                  { id: "conLength",  label: translations.lengthHeat,     activeColor: "#2dd4bf" },
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
                          : heatmapMode === "amendments"
                          ? "linear-gradient(to right, hsla(265,72%,56%,0.22), hsl(265,80%,68%))"
                          : heatmapMode === "conLength"
                          ? "linear-gradient(to right, hsla(165,68%,44%,0.22), hsl(165,75%,58%))"
                          : "linear-gradient(to right, hsla(355,76%,46%,0.22), hsl(355,82%,58%))",
                    }}
                  />

                  {/* Left / Right End Labels */}
                  <div className="flex justify-between font-body text-[9px] text-white/50 leading-tight font-semibold">
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
                    {heatmapMode === "amendments" && (
                      <>
                        <span>Fewest ({constitutionFacts.rows.length ? Math.min(...constitutionFacts.rows.map((r) => r.con.amendmentsCount)) : 0})</span>
                        <span className="text-right">
                          Most ({constitutionFacts.mostAmended.con.amendmentsCount} · {constitutionFacts.mostAmended.state.abbrev})
                        </span>
                      </>
                    )}
                    {heatmapMode === "conLength" && (
                      <>
                        <span>Shortest ({(constitutionFacts.shortest.con.wordCount / 1000).toFixed(1)}k · {constitutionFacts.shortest.state.abbrev})</span>
                        <span className="text-right">
                          Longest ({(constitutionFacts.longest.con.wordCount / 1000).toFixed(0)}k · {constitutionFacts.longest.state.abbrev})
                        </span>
                      </>
                    )}
                  </div>

                  {/* Segmented Legend Key Breakdown */}
                  <div className="space-y-1.5 pt-1">
                    <span className="font-body text-[9px] uppercase tracking-wider text-white/30 block font-bold">
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
                    {heatmapMode === "amendments" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(265,72%,56%,0.25)]" />
                          <span>&lt; 50 (e.g., AL, RI, IL)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(265,72%,56%,0.50)]" />
                          <span>50 - 200 (most states)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(265,80%,68%,0.85)]" />
                          <span>&gt; 250 (e.g., CA, TX, OR)</span>
                        </div>
                      </div>
                    )}
                    {heatmapMode === "conLength" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(165,68%,44%,0.25)]" />
                          <span>&lt; 15k words (e.g., VT, RI, IN)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(165,68%,44%,0.50)]" />
                          <span>15k - 60k words (most states)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-[hsla(165,75%,58%,0.85)]" />
                          <span>&gt; 70k words (e.g., AL, TX, LA)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Region color legend — sits under the map on mobile, overlays it from `sm` up */}
            <div className="relative z-20 order-last flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.06] px-4 py-3 bg-black/60 backdrop-blur-sm sm:absolute sm:bottom-0 sm:left-0 sm:right-0 sm:flex-nowrap sm:px-6">
              {heatmapMode === "none" ? (
                Object.entries(REGION_COLORS).map(([region, rc]) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(selectedRegion === region ? "All" : region)}
                    className="flex items-center gap-1.5 transition-opacity"
                    style={{ opacity: selectedRegion !== "All" && selectedRegion !== region ? 0.35 : 1 }}
                  >
                    <div className="h-2.5 w-2.5 rounded-sm" style={{ background: rc.base }} />
                    <span className="font-body text-[10px] text-white/45 uppercase tracking-wider font-bold">{region}</span>
                  </button>
                ))
              ) : (
                <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-bold">
                  {heatmapMode === "gdp"
                    ? "GDP by State"
                    : heatmapMode === "population"
                    ? "Population by State"
                    : heatmapMode === "amendments"
                    ? "Constitutional Amendments (most brightest)"
                    : heatmapMode === "conLength"
                    ? "Constitution Length (longest brightest)"
                    : "Statehood Order (oldest brightest)"}
                </span>
              )}
            </div>

            {/* Map canvas */}
            <div
              className="relative h-[340px] w-full px-2 py-4 pb-2 sm:h-[450px] sm:pb-12 md:h-[560px] lg:h-[640px]"
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
                const con = STATE_EXTENDED_DATA[hoveredStateAbbrev]?.constitution;

                // The tooltip leads with whichever metric the active overlay is
                // colouring the map by, so hover always explains the shading.
                const metric: { label: string; value: string; rank: string; color: string } | null =
                  heatmapMode === "gdp"
                    ? { label: translations.gdp, value: `$${hs.gdp}B`, rank: `#${gdpRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#fbbf24" }
                    : heatmapMode === "population"
                    ? { label: translations.population, value: `${hs.population}M`, rank: `#${popRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#60a5fa" }
                    : heatmapMode === "statehood"
                    ? { label: translations.statehood, value: String(hs.statehoodYear), rank: `#${hs.statehoodOrder} / 50`, color: "#f87171" }
                    : heatmapMode === "amendments" && con
                    ? { label: translations.amendmentsLabel, value: String(con.amendmentsCount), rank: `#${amendRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#a78bfa" }
                    : heatmapMode === "conLength" && con
                    ? { label: translations.lengthLabel, value: `${(con.wordCount / 1000).toFixed(1)}k`, rank: `#${wordRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#2dd4bf" }
                    : null;

                return (
                  <div
                    className="pointer-events-none absolute z-50 rounded-xl border bg-black/90 backdrop-blur-md px-3 py-2.5 shadow-2xl"
                    style={{
                      left: tooltipPos.x + 14,
                      top: tooltipPos.y - 52,
                      borderColor: metric ? `${metric.color}66` : rc.border,
                      minWidth: 160,
                      transform: tooltipPos.x > 700 ? "translateX(-110%)" : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="font-display text-sm font-bold text-white">{hs.name[locale]}</span>
                      <span className="font-hero text-xs" style={{ color: rc.label }}>{hs.abbrev}</span>
                    </div>

                    {metric ? (
                      <>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-body text-[10px] font-semibold uppercase tracking-wider text-white/40">
                            {metric.label}
                          </span>
                          <span className="font-hero text-base" style={{ color: metric.color }}>
                            {metric.value}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between gap-4 font-body text-[10px] font-semibold">
                          <span className="text-white/30">{translations.rankLabel}</span>
                          <span className="text-white/70">{metric.rank}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-3 font-body text-[10px] text-white/50 font-semibold">
                        <span>GDP <span className="text-white/80">${hs.gdp}B</span></span>
                        <span>Pop <span className="text-white/80">{hs.population}M</span></span>
                        <span>#{gdpRanked.indexOf(hs.abbrev) + 1}</span>
                      </div>
                    )}

                    <div className="mt-1 font-body text-[10px] font-bold" style={{ color: rc.label }}>{hs.region}</div>
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
              className="rounded-3xl border border-white/[0.06] bg-[#070707] p-8 md:p-10 shadow-2xl shadow-black/85"
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
                        className="font-body text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                        style={{
                          color: REGION_COLORS[selectedState.region]?.label ?? "#fbbf24",
                          background: `${REGION_COLORS[selectedState.region]?.base ?? "#fbbf24"}18`,
                          border: `1px solid ${REGION_COLORS[selectedState.region]?.base ?? "#fbbf24"}40`,
                        }}
                      >
                        {selectedState.region}
                      </span>
                      <span className="font-body text-[9px] text-white/25 tracking-wider">
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
                      <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold">Capital</span>
                      <span className="font-body text-sm font-semibold text-white">{selectedState.capital[locale]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold">Statehood</span>
                      <span className="font-body text-sm font-semibold text-white">{selectedState.statehoodYear}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold">Entry Order</span>
                      <span className="font-hero text-base text-[#fbbf24]">#{selectedState.statehoodOrder} <span className="font-body text-[10px] text-white/25">/ 50</span></span>
                    </div>
                  </div>
                </div>

                {/* ── Col 2: Metrics (5 cols) ── */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  {/* 2×2 core stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* GDP */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-1 hover:border-[#fbbf24]/20 transition-colors shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-3 w-3 text-[#fbbf24]" />
                        <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">{translations.gdp}</span>
                      </div>
                      <div className="font-hero text-3xl text-white">${selectedState.gdp}B</div>
                      <div className="font-body text-[10px] text-white/30">${gdpPerCapita}k per capita</div>
                    </div>

                    {/* Population */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-1 hover:border-[#60a5fa]/20 transition-colors shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-[#60a5fa]" />
                        <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">{translations.population}</span>
                      </div>
                      <div className="font-hero text-3xl text-white">{selectedState.population}M</div>
                      <div className="font-body text-[10px] text-white/30">{popDensity} ppl/sq mi</div>
                    </div>

                    {/* Area */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-1 hover:border-[#34d399]/20 transition-colors shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="h-3 w-3 text-[#34d399]" />
                        <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">{translations.area}</span>
                      </div>
                      <div className="font-hero text-2xl text-white">{selectedState.area.toLocaleString()}</div>
                      <div className="font-body text-[10px] text-white/30">square miles</div>
                    </div>

                    {/* Statehood */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-1 hover:border-[#f87171]/20 transition-colors shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <Compass className="h-3 w-3 text-[#f87171]" />
                        <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">{translations.statehood}</span>
                      </div>
                      <div className="font-hero text-3xl text-white">{selectedState.statehoodYear}</div>
                      <div className="font-body text-[10px] text-white/30">#{selectedState.statehoodOrder} to join</div>
                    </div>
                  </div>

                  {/* GDP + Population Rank Bars */}
                  <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-4 shadow-sm">
                    <GdpRankBar rank={gdpRank} />
                    <div className="h-px bg-white/[0.06]" />
                    <PopRankBar rank={popRank} color="#60a5fa" />
                    <div className="flex justify-between font-body text-[10px] text-white/20 pt-1">
                      <span>Rank 1 = California</span>
                      <span>of 50 states</span>
                    </div>
                  </div>
                  {/* Area rank pill */}
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-[#0c0c0c] px-4 py-3 shadow-sm">
                    <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">Area Rank</span>
                    <div className="flex items-center gap-2">
                      <span className="font-hero text-base text-[#34d399]">#{areaRank}</span>
                      <span className="font-body text-[10px] text-white/25">/ 50 · {selectedState.area.toLocaleString()} sq mi</span>
                    </div>
                  </div>
                </div>

                {/* ── Col 3: Chronicle + Industry (4 cols) ── */}
                <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/[0.06] pt-6 md:pt-0 md:pl-8">
                  <div>
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-[#fbbf24] flex items-center gap-1.5 mb-3">
                      <MapPin className="h-3 w-3" />
                      Regional Chronicle
                    </span>
                    <p className="font-body text-sm leading-relaxed text-white/70">
                      {selectedState.story[locale]}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.05] space-y-3">
                    <div>
                      <span className="font-body text-[10px] font-bold uppercase tracking-wider text-white/30 block mb-1">Key Sector</span>
                      <span className="font-body text-sm font-semibold text-[#fbbf24] leading-relaxed">{selectedState.industry[locale]}</span>
                    </div>
                    {/* US Share bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-body text-[10px] font-semibold uppercase tracking-wider text-white/30">Share of US GDP</span>
                        <span className="font-body text-[10px] text-white/45">
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
                <div className="md:col-span-5 flex flex-col justify-between bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#fbbf24]" />
                      <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">Iconic Landmark</span>
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-white truncate">
                        {STATE_TRIVIA[selectedState.abbrev]?.landmark || "National Monument"}
                      </h4>
                      <p className="font-body text-[10px] text-white/45 mt-1 uppercase tracking-wider">
                        State Heritage Site
                      </p>
                    </div>
                    <p className="font-body text-xs text-white/75 leading-relaxed">
                      <strong>{locale === "ro" ? "Fapt istoric:" : "Historical Fact:"}</strong> {STATE_TRIVIA[selectedState.abbrev]?.fact || "A center of American heritage and pride."}
                    </p>
                  </div>
                </div>

                {/* Identity & Brand (4 columns) */}
                <div className="md:col-span-4 flex flex-col justify-between bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-[#fbbf24]" />
                      <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">
                        {locale === "ro" ? "Identitate & Brand" : "Identity & Brand"}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-body text-[10px] font-bold text-white/40 uppercase tracking-wider">
                        {locale === "ro" ? "Motto Oficial" : "Official Motto"}
                      </h5>
                      <p className="font-body text-xs text-white/75 italic mt-1 leading-relaxed">
                        "{STATE_TRIVIA[selectedState.abbrev]?.motto || "Liberty & Prosperity"}"
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/[0.04]">
                      <h5 className="font-body text-[10px] font-bold text-white/40 uppercase tracking-wider">
                        {locale === "ro" ? "Brand / Entitate Emblematică" : "Iconic Brand / Entity"}
                      </h5>
                      <p className="font-body text-xs font-semibold text-[#fbbf24] mt-1 leading-relaxed">
                        {STATE_TRIVIA[selectedState.abbrev]?.brand || "National Enterprise"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* State Rankings (3 columns) */}
                <div className="md:col-span-3 flex flex-col justify-between bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                  <div className="space-y-3">
                    <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-bold block">Comparative Rankings</span>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-body text-[9px] uppercase font-semibold">GDP Rank</span>
                        <span className="text-white font-semibold">#{gdpRank}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-body text-[9px] uppercase font-semibold">Pop Rank</span>
                        <span className="text-white font-semibold">#{popRank}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-body text-[9px] uppercase font-semibold">Area Rank</span>
                        <span className="text-white font-semibold">#{areaRank}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Symbols, Government, Laws & Firsts */}
              {extended && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 pt-6 border-t border-white/[0.06]">
                  {/* Flag & Seal (4 columns) */}
                  <div className="md:col-span-4 bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Flag className="h-4 w-4 text-[#fbbf24]" />
                      <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">
                        {translations.flagSeal}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-body text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">
                          {translations.capitolLabel}
                        </h5>
                        <button
                          type="button"
                          onClick={() =>
                            setSymbol({
                              src: `/state-capitols/${selectedState.abbrev}.jpg`,
                              label: `${selectedState.name[locale]} — ${translations.capitolLabel}`,
                            })
                          }
                          className="group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/60"
                          aria-label={`${translations.capitolLabel}: ${selectedState.name[locale]}`}
                        >
                          <img
                            key={`capitol-${selectedState.abbrev}`}
                            src={`/state-capitols/${selectedState.abbrev}.jpg`}
                            alt={`${selectedState.name[locale]} — ${translations.capitolLabel}`}
                            loading="lazy"
                            className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                            <ZoomIn size={13} className="text-white" />
                          </span>
                        </button>
                        <p className="font-body text-xs text-white/55 leading-relaxed">
                          {selectedState.capital[locale]}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-white/[0.04]">
                        <h5 className="font-body text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">
                          {translations.flagLabel}
                        </h5>
                        {/* Plain <img>: these are SVGs, so Next/Image optimisation adds nothing.
                            The aspect box reserves height before load (so lazy-loading can fire
                            and there is no layout shift) while staying visually invisible. */}
                        <button
                          type="button"
                          onClick={() =>
                            setSymbol({
                              src: `/state-symbols/flags/${selectedState.abbrev}.svg`,
                              label: `${selectedState.name[locale]} — ${translations.flagLabel}`,
                            })
                          }
                          className="group relative mb-3 block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/60"
                          aria-label={`${translations.flagLabel}: ${selectedState.name[locale]}`}
                        >
                          <img
                            key={`flag-${selectedState.abbrev}`}
                            src={`/state-symbols/flags/${selectedState.abbrev}.svg`}
                            alt={`${selectedState.name[locale]} — ${translations.flagLabel}`}
                            loading="lazy"
                            className="aspect-[3/2] w-full object-contain"
                          />
                          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                            <ZoomIn size={13} className="text-white" />
                          </span>
                        </button>
                        <p className="font-body text-xs text-white/75 leading-relaxed">{extended.flagDesc[locale]}</p>
                      </div>
                      <div className="pt-3 border-t border-white/[0.04]">
                        <h5 className="font-body text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">
                          {translations.sealLabel}
                        </h5>
                        <button
                          type="button"
                          onClick={() =>
                            setSymbol({
                              src: `/state-symbols/seals/${selectedState.abbrev}.svg`,
                              label: `${selectedState.name[locale]} — ${translations.sealLabel}`,
                            })
                          }
                          className="group relative mx-auto mb-3 block w-full max-w-[260px] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/60"
                          aria-label={`${translations.sealLabel}: ${selectedState.name[locale]}`}
                        >
                          <img
                            key={`seal-${selectedState.abbrev}`}
                            src={`/state-symbols/seals/${selectedState.abbrev}.svg`}
                            alt={`${selectedState.name[locale]} — ${translations.sealLabel}`}
                            loading="lazy"
                            className="aspect-square w-full object-contain"
                          />
                          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                            <ZoomIn size={13} className="text-white" />
                          </span>
                        </button>
                        <p className="font-body text-xs text-white/75 leading-relaxed">{extended.sealDesc[locale]}</p>
                      </div>
                      <div className="pt-3 border-t border-white/[0.04]">
                        <h5 className="font-body text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">
                          {translations.admissionLabel}
                        </h5>
                        <p className="font-body text-xs font-semibold text-[#fbbf24] leading-relaxed">
                          {extended.admissionUnion[locale]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Government & Politics (4 columns) */}
                  <div className="md:col-span-4 bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Landmark className="h-4 w-4 text-[#60a5fa]" />
                      <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">
                        {translations.governmentTitle}
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-start gap-3">
                        <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold shrink-0 pt-0.5">
                          {translations.governorLabel}
                        </span>
                        <span className="font-body text-xs font-semibold text-white text-right">{extended.governor[locale]}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div>
                        <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold block mb-1">
                          {translations.legislatureLabel}
                        </span>
                        <span className="font-body text-xs text-white/75 leading-relaxed">{extended.legislature[locale]}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div className="flex justify-between items-center">
                        <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold">
                          {translations.electoralVotesLabel}
                        </span>
                        <span className="font-hero text-base text-[#60a5fa]">{extended.electoralVotes}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div>
                        <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold block mb-1">
                          {translations.politicalStructureLabel}
                        </span>
                        <span className="font-body text-xs text-white/75 leading-relaxed">{extended.politicalStructure[locale]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Unique Laws + Historical Firsts (4 columns) */}
                  <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Gavel className="h-4 w-4 text-[#f87171]" />
                        <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">
                          {translations.uniqueLawsTitle}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {extended.uniqueLaws[locale].map((law) => (
                          <li key={law} className="flex gap-2 font-body text-xs text-white/75 leading-relaxed">
                            <span className="text-[#f87171] shrink-0" aria-hidden="true">§</span>
                            <span>{law}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-4 w-4 text-[#34d399]" />
                        <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">
                          {translations.historicalFirstsTitle}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {extended.historicalFirsts[locale].map((item) => (
                          <li key={item} className="flex gap-2 font-body text-xs text-white/75 leading-relaxed">
                            <span className="text-[#34d399] shrink-0" aria-hidden="true">★</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* ── REGIONAL PEERS PANEL ── */}
          <div className="rounded-3xl border border-white/[0.06] bg-[#070707] p-6 md:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-body text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1 font-bold">Same Region</p>
                <h3 className="font-display text-base font-bold text-white">
                  {selectedState.region} States
                  <span className="ml-2 font-body text-[10px] font-normal text-white/40">
                    · {regionalPeers.length + 1} total
                  </span>
                </h3>
              </div>
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
                <div className="font-body text-[10px] font-semibold text-white/40 mt-1">${selectedState.gdp}B</div>
              </div>
              {regionalPeers.map((peer) => (
                <div
                  key={peer.abbrev}
                  onClick={() => setSelectedStateAbbrev(peer.abbrev)}
                  className="rounded-xl p-3 border border-white/[0.05] bg-[#0c0c0c] cursor-pointer hover:border-white/20 hover:bg-[#121212] transition-all"
                >
                  <div className="font-hero text-xs" style={{ color: REGION_COLORS[peer.region]?.label }}>{peer.abbrev}</div>
                  <div className="font-body text-xs font-semibold text-white/80 truncate mt-0.5">{peer.name[locale]}</div>
                  <div className="font-body text-[10px] font-semibold text-white/35 mt-1">${peer.gdp}B</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── STATE CONSTITUTIONS ── */}
          {extended && (
            <div className="rounded-3xl border border-white/[0.06] bg-[#070707] p-6 md:p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
                <div className="max-w-2xl">
                  <p className="font-body text-[9px] uppercase tracking-[0.18em] text-[#a78bfa] mb-1 font-bold flex items-center gap-1.5">
                    <ScrollText className="h-3 w-3" />
                    {translations.constitutionsEyebrow}
                  </p>
                  <h3 className="font-display text-xl font-extrabold text-white mb-2">
                    {translations.constitutionsTitle}
                  </h3>
                  <p className="font-body text-xs text-white/55 leading-relaxed">
                    {translations.constitutionsIntro}
                  </p>
                </div>
                {/* Ties the section back to the interactive map above */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="font-body text-[9px] uppercase tracking-wider text-white/30 font-bold">
                    {translations.viewOnMap}
                  </span>
                  <button
                    onClick={() => setHeatmapMode("amendments")}
                    className="rounded-full px-3 py-1 text-[10px] font-semibold font-body transition-all"
                    style={{
                      background: heatmapMode === "amendments" ? "#a78bfa" : "rgba(255,255,255,0.05)",
                      color: heatmapMode === "amendments" ? "#000" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {translations.amendHeat}
                  </button>
                  <button
                    onClick={() => setHeatmapMode("conLength")}
                    className="rounded-full px-3 py-1 text-[10px] font-semibold font-body transition-all"
                    style={{
                      background: heatmapMode === "conLength" ? "#2dd4bf" : "rgba(255,255,255,0.05)",
                      color: heatmapMode === "conLength" ? "#000" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {translations.lengthHeat}
                  </button>
                </div>
              </div>

              {/* National superlatives */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  { label: translations.oldestLabel, state: constitutionFacts.oldest.state, value: String(constitutionFacts.oldest.con.adoptedYear), color: "#fbbf24" },
                  { label: translations.longestLabel, state: constitutionFacts.longest.state, value: `${Math.round(constitutionFacts.longest.con.wordCount / 1000)}k`, color: "#2dd4bf" },
                  { label: translations.shortestLabel, state: constitutionFacts.shortest.state, value: `${(constitutionFacts.shortest.con.wordCount / 1000).toFixed(1)}k`, color: "#34d399" },
                  { label: translations.mostAmendedLabel, state: constitutionFacts.mostAmended.state, value: String(constitutionFacts.mostAmended.con.amendmentsCount), color: "#a78bfa" },
                ].map((card) => (
                  <button
                    key={card.label}
                    onClick={() => setSelectedStateAbbrev(card.state.abbrev)}
                    className="text-left rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4 hover:border-white/20 transition-all"
                  >
                    <span className="font-body text-[9px] uppercase tracking-wider text-white/30 font-bold block mb-1.5">
                      {card.label}
                    </span>
                    <div className="font-hero text-2xl" style={{ color: card.color }}>{card.value}</div>
                    <div className="font-body text-[10px] text-white/45 mt-1 truncate">{card.state.name[locale]}</div>
                  </button>
                ))}
              </div>

              {/* Selected state's constitution */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-white/[0.06] pt-6">
                <div className="md:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-[#a78bfa]" />
                    <h4 className="font-display text-base font-bold text-white">
                      {selectedState.name[locale]}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4">
                      <span className="font-body text-[9px] uppercase tracking-wider text-white/30 font-bold block mb-1">
                        {translations.adoptedLabel}
                      </span>
                      <div className="font-hero text-xl text-white">{extended.constitution.adoptedYear}</div>
                    </div>
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4">
                      <span className="font-body text-[9px] uppercase tracking-wider text-white/30 font-bold block mb-1">
                        {translations.amendmentsLabel}
                      </span>
                      <div className="font-hero text-xl text-[#a78bfa]">{extended.constitution.amendmentsCount}</div>
                    </div>
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4">
                      <span className="font-body text-[9px] uppercase tracking-wider text-white/30 font-bold block mb-1">
                        {translations.lengthLabel}
                      </span>
                      <div className="font-hero text-xl text-[#2dd4bf]">
                        {(extended.constitution.wordCount / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>

                  {/* Length relative to the longest state constitution */}
                  <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-body text-[9px] uppercase tracking-wider text-white/30 font-bold">
                        {translations.vsLongest}
                      </span>
                      <span className="font-body text-[10px] text-white/45">
                        {extended.constitution.wordCount.toLocaleString()} {translations.wordsLabel}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
                      <motion.div
                        key={selectedState.abbrev + "-conlen"}
                        initial={{ width: 0 }}
                        animate={{ width: `${(extended.constitution.wordCount / maxValues.maxWords) * 100}%` }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#2dd4bf]/50 to-[#2dd4bf]"
                      />
                    </div>
                    <div className="flex justify-between font-body text-[9px] text-white/25 mt-1.5">
                      <span>0</span>
                      <span>
                        {constitutionFacts.longest.state.abbrev} · {Math.round(constitutionFacts.longest.con.wordCount / 1000)}k
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interesting provisions */}
                <div className="md:col-span-7 rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5">
                  <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold block mb-3">
                    {translations.provisionsLabel}
                  </span>
                  <ul className="space-y-3">
                    {extended.constitution.provisions[locale].map((provision) => (
                      <li key={provision} className="flex gap-2.5 font-body text-xs text-white/75 leading-relaxed">
                        <span className="text-[#a78bfa] shrink-0" aria-hidden="true">▸</span>
                        <span>{provision}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-body text-[10px] text-white/30 mt-4 pt-3 border-t border-white/[0.04] leading-relaxed">
                    {translations.avgLengthNote.replace("{avg}", constitutionFacts.avgWords.toLocaleString())}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── HOW STATES MAKE MONEY ── */}
          <StateRevenueBudget
            locale={locale}
            abbrev={selectedState.abbrev}
            stateName={selectedState.name[locale]}
            population={selectedState.population}
            translations={translations.revenue}
          />

          {/* ── INTERSTATE COOPERATION ── */}
          <InterstateCooperationMap locale={locale} translations={translations.cooperation} />

          {/* ── NATIONAL LEADERBOARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Top 5 GDP */}
            <div className="rounded-3xl border border-white/[0.06] bg-[#070707] p-6 shadow-lg">
              <p className="font-body text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1 font-bold">National Ranking</p>
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
                          <span className="font-body text-[10px] font-bold text-white/30 w-4">#{i + 1}</span>
                          <span className={`font-body text-xs font-semibold ${isCurrentState ? "text-[#fbbf24]" : "text-white/80 group-hover:text-white"}`}>
                            {s.name[locale]}
                          </span>
                        </div>
                        <span className="font-body text-[10px] text-white/50">${s.gdp}B</span>
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
            <div className="rounded-3xl border border-white/[0.06] bg-[#070707] p-6 shadow-lg">
              <p className="font-body text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1 font-bold">National Ranking</p>
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
                          <span className="font-body text-[10px] font-bold text-white/30 w-4">#{i + 1}</span>
                          <span className={`font-body text-xs font-semibold ${isCurrentState ? "text-[#60a5fa]" : "text-white/80 group-hover:text-white"}`}>
                            {s.name[locale]}
                          </span>
                        </div>
                        <span className="font-body text-[10px] text-white/50">{s.population}M</span>
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
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#070707] p-6 sm:p-8 mt-4 mb-8 shadow-lg">
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
                <span className="font-body text-[10px] text-white/30 font-semibold">{translations.sortBy}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-white/[0.08] bg-transparent py-1.5 px-3 text-xs text-white focus:border-[#fbbf24]/50 focus:outline-none font-body transition-colors"
                >
                  <option value="name" className="bg-black">{locale === "ro" ? "Nume" : "Name"}</option>
                  <option value="gdp" className="bg-black">{translations.gdp}</option>
                  <option value="population" className="bg-black">{translations.population}</option>
                  <option value="statehood" className="bg-black">{translations.statehood}</option>
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
                        background: isSelected ? `${rc.base}14` : "#070707",
                        borderColor: isSelected ? rc.base : "rgba(255,255,255,0.06)",
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
                        <span className="font-body text-[10px] text-white/25 font-semibold">${state.gdp}B</span>
                      </div>
                      <h4 className="font-body text-sm font-bold text-white truncate">{state.name[locale]}</h4>
                      <p className="font-body text-[10px] text-white/35 truncate mt-0.5">{state.capital[locale]}</p>
                    </div>
                  );
                })}

                {filteredStates.length === 0 && (
                  <div className="col-span-full py-14 text-center font-body text-xs text-white/25">
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

      {/* ── FULLSCREEN FLAG / SEAL VIEWER ──
          Rendered in a portal so it escapes the page's stacking contexts.
          Clicking the backdrop or the empty space closes; clicking the image does not. */}
      {portalReady &&
        symbol &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm">
            <div
              className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-5 py-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="truncate font-body text-sm text-white/70">{symbol.label}</p>
              <button
                type="button"
                onClick={() => setSymbol(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X size={15} className="text-white" />
              </button>
            </div>
            <div
              className="flex flex-1 cursor-zoom-out items-center justify-center overflow-hidden p-4 sm:p-8"
              onClick={() => setSymbol(null)}
            >
              <img
                src={symbol.src}
                alt={symbol.label}
                onClick={(e) => e.stopPropagation()}
                className="h-auto max-h-[85vh] w-auto max-w-[92vw] cursor-default object-contain"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
