"use client";

import { useState, useMemo, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Line,
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
  Share2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Landmark,
  Scale,
  ScrollText,
  Award,
  Gavel,
  GraduationCap,
  Building2,
  PieChart,
  FileText,
  Swords,
  Printer,
  History,
  TrainTrack,
  Route,
  Vote,
  Hospital,
  School,
  Mountain,
  Footprints,
  TrainFront,
  Cpu,
} from "lucide-react";
import { EXPLORER_STATES, StateData } from "@/lib/data/explorer-data";
import { STATE_EXTENDED_DATA } from "@/lib/data/state-details";
import { COOPERATION_AGREEMENTS, COOPERATION_CATEGORIES } from "@/lib/data/interstate-cooperation";
import { COLORS } from "@/lib/constants";
import { GEO_URL, FIPS_TO_ABBREV } from "@/lib/data/us-geo";
import { InterstateCooperationMap } from "@/components/explorer/InterstateCooperationMap";
import { StateRevenueBudget } from "@/components/explorer/StateRevenueBudget";
import { fetchCensusAcsData, CensusAcsData } from "@/lib/services/census-api";
import { LOCAL_CENSUS_ACS_DATABASE } from "@/lib/data/census-local-data";
import { LOCAL_CENSUS_COUNTY_METRO_DATA } from "@/lib/data/census-county-metro-data";

import { ELECTION_2024_STATES, ELECTION_2020_STATES, getElectionColor } from "@/lib/data/election-data";
import railData from "@/lib/data/rail-simplified.json";
import interstateData from "@/lib/data/interstates-simplified.json";
import hospitalsData from "@/lib/data/hospitals-points.json";
import schoolsData from "@/lib/data/schools-points.json";
import volcanoesData from "@/lib/data/volcanoes-points.json";
import amtrakStationsData from "@/lib/data/amtrak-stations-points.json";
import transmissionLinesData from "@/lib/data/transmission-lines-segments.json";
import trailsData from "@/lib/data/trails-segments.json";
import { StateComparisonModal } from "@/components/explorer/StateComparisonModal";
import { StateFactsheetModal } from "@/components/explorer/StateFactsheetModal";
import { MergedGeoOverlay, MergedLineOverlay } from "@/components/explorer/MergedGeoOverlay";
import { FederalLandsMapGL } from "@/components/explorer/HeavyLayersMapGL";

export const STATE_DEMOGRAPHIC_BENCHMARKS: Record<string, { income: number; homeValue: number; eduPct: number; vetPct: number; broadbandPct: number; ownerPct: number; povertyPct: number; commuteMins: number }> = {
  AL: { income: 59609, homeValue: 225000, eduPct: 27.5, vetPct: 9.1, broadbandPct: 84.2, ownerPct: 69.2, povertyPct: 15.6, commuteMins: 25.1 },
  AK: { income: 88121, homeValue: 345000, eduPct: 31.2, vetPct: 12.4, broadbandPct: 88.5, ownerPct: 65.4, povertyPct: 10.8, commuteMins: 19.4 },
  AZ: { income: 74568, homeValue: 415000, eduPct: 32.8, vetPct: 9.6, broadbandPct: 90.1, ownerPct: 66.8, povertyPct: 12.8, commuteMins: 25.8 },
  AR: { income: 55432, homeValue: 205000, eduPct: 24.8, vetPct: 8.5, broadbandPct: 82.5, ownerPct: 66.1, povertyPct: 16.2, commuteMins: 22.4 },
  CA: { income: 91551, homeValue: 785000, eduPct: 36.2, vetPct: 5.1, broadbandPct: 92.4, ownerPct: 55.3, povertyPct: 12.1, commuteMins: 29.8 },
  CO: { income: 89302, homeValue: 535000, eduPct: 44.5, vetPct: 8.9, broadbandPct: 93.1, ownerPct: 66.2, povertyPct: 9.6, commuteMins: 25.9 },
  CT: { income: 88429, homeValue: 375000, eduPct: 40.8, vetPct: 5.8, broadbandPct: 91.8, ownerPct: 66.1, povertyPct: 10.1, commuteMins: 26.5 },
  DE: { income: 79325, homeValue: 365000, eduPct: 33.6, vetPct: 8.2, broadbandPct: 90.5, ownerPct: 71.4, povertyPct: 11.4, commuteMins: 26.1 },
  FL: { income: 69314, homeValue: 395000, eduPct: 31.5, vetPct: 8.8, broadbandPct: 90.8, ownerPct: 67.3, povertyPct: 13.1, commuteMins: 27.8 },
  GA: { income: 72837, homeValue: 325000, eduPct: 33.7, vetPct: 8.7, broadbandPct: 88.9, ownerPct: 64.8, povertyPct: 13.5, commuteMins: 28.4 },
  HI: { income: 92400, homeValue: 845000, eduPct: 34.8, vetPct: 9.8, broadbandPct: 91.2, ownerPct: 61.2, povertyPct: 9.2, commuteMins: 27.5 },
  ID: { income: 72782, homeValue: 445000, eduPct: 29.8, vetPct: 9.3, broadbandPct: 89.2, ownerPct: 71.8, povertyPct: 10.7, commuteMins: 21.2 },
  IL: { income: 76708, homeValue: 265000, eduPct: 36.8, vetPct: 5.9, broadbandPct: 89.8, ownerPct: 66.3, povertyPct: 11.9, commuteMins: 29.1 },
  IN: { income: 66785, homeValue: 235000, eduPct: 28.9, vetPct: 7.2, broadbandPct: 86.8, ownerPct: 69.8, povertyPct: 12.2, commuteMins: 23.8 },
  IA: { income: 69588, homeValue: 215000, eduPct: 30.2, vetPct: 7.5, broadbandPct: 87.5, ownerPct: 71.5, povertyPct: 11.1, commuteMins: 19.5 },
  KS: { income: 68957, homeValue: 225000, eduPct: 34.5, vetPct: 8.6, broadbandPct: 88.1, ownerPct: 67.2, povertyPct: 11.5, commuteMins: 19.8 },
  KY: { income: 59341, homeValue: 205000, eduPct: 26.2, vetPct: 8.4, broadbandPct: 85.2, ownerPct: 67.5, povertyPct: 16.1, commuteMins: 23.5 },
  LA: { income: 55416, homeValue: 215000, eduPct: 25.5, vetPct: 7.1, broadbandPct: 83.1, ownerPct: 66.8, povertyPct: 18.8, commuteMins: 25.4 },
  ME: { income: 68251, homeValue: 355000, eduPct: 33.8, vetPct: 10.2, broadbandPct: 87.8, ownerPct: 73.1, povertyPct: 10.9, commuteMins: 24.1 },
  MD: { income: 94974, homeValue: 415000, eduPct: 41.5, vetPct: 8.1, broadbandPct: 92.8, ownerPct: 67.4, povertyPct: 9.8, commuteMins: 32.8 },
  MA: { income: 94488, homeValue: 585000, eduPct: 45.2, vetPct: 4.8, broadbandPct: 92.5, ownerPct: 62.1, povertyPct: 10.4, commuteMins: 30.2 },
  MI: { income: 66986, homeValue: 235000, eduPct: 31.1, vetPct: 6.8, broadbandPct: 88.2, ownerPct: 71.8, povertyPct: 13.1, commuteMins: 24.5 },
  MN: { income: 82338, homeValue: 335000, eduPct: 38.2, vetPct: 7.3, broadbandPct: 90.8, ownerPct: 71.9, povertyPct: 9.3, commuteMins: 23.9 },
  MS: { income: 52719, homeValue: 175000, eduPct: 23.5, vetPct: 7.6, broadbandPct: 81.2, ownerPct: 68.5, povertyPct: 19.1, commuteMins: 24.8 },
  MO: { income: 64889, homeValue: 235000, eduPct: 30.8, vetPct: 8.3, broadbandPct: 86.9, ownerPct: 67.2, povertyPct: 12.8, commuteMins: 23.7 },
  MT: { income: 67631, homeValue: 425000, eduPct: 33.5, vetPct: 10.8, broadbandPct: 86.1, ownerPct: 68.4, povertyPct: 11.8, commuteMins: 18.2 },
  NE: { income: 73071, homeValue: 245000, eduPct: 33.8, vetPct: 8.1, broadbandPct: 88.8, ownerPct: 66.5, povertyPct: 10.5, commuteMins: 18.8 },
  NV: { income: 72336, homeValue: 425000, eduPct: 26.8, vetPct: 9.2, broadbandPct: 90.2, ownerPct: 58.2, povertyPct: 12.9, commuteMins: 24.5 },
  NH: { income: 89992, homeValue: 445000, eduPct: 38.5, vetPct: 9.4, broadbandPct: 92.1, ownerPct: 71.3, povertyPct: 7.2, commuteMins: 27.2 },
  NJ: { income: 96346, homeValue: 485000, eduPct: 41.2, vetPct: 4.2, broadbandPct: 92.7, ownerPct: 63.8, povertyPct: 9.7, commuteMins: 31.8 },
  NM: { income: 59726, homeValue: 265000, eduPct: 28.5, vetPct: 9.7, broadbandPct: 83.8, ownerPct: 68.2, povertyPct: 17.6, commuteMins: 22.1 },
  NY: { income: 79557, homeValue: 425000, eduPct: 37.8, vetPct: 4.9, broadbandPct: 90.1, ownerPct: 53.9, povertyPct: 13.9, commuteMins: 33.5 },
  NC: { income: 67481, homeValue: 325000, eduPct: 33.2, vetPct: 9.3, broadbandPct: 88.4, ownerPct: 65.5, povertyPct: 13.4, commuteMins: 24.9 },
  ND: { income: 71243, homeValue: 255000, eduPct: 31.8, vetPct: 8.2, broadbandPct: 87.2, ownerPct: 62.8, povertyPct: 10.8, commuteMins: 17.5 },
  OH: { income: 65720, homeValue: 225000, eduPct: 29.8, vetPct: 7.4, broadbandPct: 88.0, ownerPct: 66.4, povertyPct: 13.4, commuteMins: 23.8 },
  OK: { income: 59698, homeValue: 195000, eduPct: 26.8, vetPct: 9.1, broadbandPct: 84.8, ownerPct: 65.8, povertyPct: 15.2, commuteMins: 21.9 },
  OR: { income: 75654, homeValue: 485000, eduPct: 35.2, vetPct: 8.4, broadbandPct: 91.5, ownerPct: 63.2, povertyPct: 11.8, commuteMins: 23.9 },
  PA: { income: 71327, homeValue: 265000, eduPct: 33.5, vetPct: 7.2, broadbandPct: 89.1, ownerPct: 68.9, povertyPct: 11.8, commuteMins: 26.9 },
  RI: { income: 81822, homeValue: 415000, eduPct: 34.8, vetPct: 5.6, broadbandPct: 90.2, ownerPct: 62.5, povertyPct: 11.3, commuteMins: 25.1 },
  SC: { income: 64115, homeValue: 285000, eduPct: 29.8, vetPct: 9.6, broadbandPct: 86.8, ownerPct: 70.1, povertyPct: 14.1, commuteMins: 24.8 },
  SD: { income: 69728, homeValue: 255000, eduPct: 30.5, vetPct: 8.8, broadbandPct: 86.4, ownerPct: 67.9, povertyPct: 12.1, commuteMins: 17.2 },
  TN: { income: 65254, homeValue: 305000, eduPct: 29.2, vetPct: 8.2, broadbandPct: 86.5, ownerPct: 66.8, povertyPct: 13.6, commuteMins: 25.2 },
  TX: { income: 72829, homeValue: 305000, eduPct: 31.8, vetPct: 7.6, broadbandPct: 89.5, ownerPct: 62.4, povertyPct: 13.8, commuteMins: 26.8 },
  UT: { income: 89168, homeValue: 515000, eduPct: 35.8, vetPct: 6.2, broadbandPct: 93.8, ownerPct: 70.5, povertyPct: 8.6, commuteMins: 21.8 },
  VT: { income: 72431, homeValue: 335000, eduPct: 39.2, vetPct: 7.8, broadbandPct: 88.5, ownerPct: 71.9, povertyPct: 10.3, commuteMins: 22.8 },
  VA: { income: 87249, homeValue: 385000, eduPct: 40.2, vetPct: 10.4, broadbandPct: 91.2, ownerPct: 66.5, povertyPct: 9.9, commuteMins: 28.5 },
  WA: { income: 91086, homeValue: 565000, eduPct: 37.5, vetPct: 8.8, broadbandPct: 93.2, ownerPct: 63.5, povertyPct: 10.0, commuteMins: 27.6 },
  WV: { income: 54300, homeValue: 155000, eduPct: 21.8, vetPct: 8.4, broadbandPct: 82.1, ownerPct: 73.8, povertyPct: 16.8, commuteMins: 26.2 },
  WI: { income: 70996, homeValue: 265000, eduPct: 31.5, vetPct: 7.1, broadbandPct: 89.2, ownerPct: 67.5, povertyPct: 10.7, commuteMins: 22.1 },
  WY: { income: 70042, homeValue: 315000, eduPct: 29.2, vetPct: 11.2, broadbandPct: 87.5, ownerPct: 71.2, povertyPct: 10.4, commuteMins: 18.5 },
};

// Each state's PREDOMINANT standard-time UTC offset (not DST-adjusted — DST
// shifts every zone by the same hour, so it doesn't change the relative
// gradient). A handful of states straddle two zones (e.g. western Texas/Kansas/
// Nebraska/South Dakota reach into Mountain, east Tennessee is Eastern while the
// rest is Central, northern Idaho is Pacific while the south is Mountain) — this
// records the zone most of the state's area/population actually observes, which
// is why the heatmap renders it as a smooth gradient by offset rather than flat
// per-zone colors: the boundary itself is fuzzier than a state line, the
// gradient reads honestly instead of implying a precision the data doesn't have.
export const STATE_UTC_OFFSET: Record<string, number> = {
  CT: -5, DE: -5, FL: -5, GA: -5, IN: -5, KY: -5, ME: -5, MD: -5, MA: -5, MI: -5,
  NH: -5, NJ: -5, NY: -5, NC: -5, OH: -5, PA: -5, RI: -5, SC: -5, VT: -5, VA: -5,
  WV: -5, DC: -5,
  AL: -6, AR: -6, IL: -6, IA: -6, KS: -6, LA: -6, MN: -6, MS: -6, MO: -6,
  NE: -6, ND: -6, OK: -6, SD: -6, TN: -6, TX: -6, WI: -6,
  AZ: -7, CO: -7, ID: -7, MT: -7, NM: -7, UT: -7, WY: -7,
  CA: -8, NV: -8, OR: -8, WA: -8,
  AK: -9,
  HI: -10,
};

// Federal-land parcel fill, keyed by managing agency (PAD-US `Mang_Name`) —
// matches the standard federal-land-by-agency reference map convention
// (FWS teal, NPS green, USFS olive, BLM gold, DOD red, tribal purple, etc.)
// instead of one flat color for every parcel regardless of who manages it.
const FEDERAL_AGENCY_COLORS: Record<string, string> = {
  FWS: "rgba(34, 211, 238, 0.4)", // Fish & Wildlife Service
  NPS: "rgba(16, 185, 129, 0.4)", // National Park Service
  USFS: "rgba(132, 204, 22, 0.4)", // Forest Service
  BLM: "rgba(234, 179, 8, 0.4)", // Bureau of Land Management
  DOD: "rgba(239, 68, 68, 0.4)", // Department of Defense
  TRIB: "rgba(168, 85, 247, 0.4)", // Tribal / BIA
  USACE: "rgba(59, 130, 246, 0.4)", // Army Corps of Engineers
  USBR: "rgba(56, 189, 248, 0.4)", // Bureau of Reclamation
  OTHF: "rgba(156, 163, 175, 0.4)", // Other federal
  SPR: "rgba(209, 213, 219, 0.4)", // State preserve
  NGO: "rgba(229, 231, 235, 0.4)",
};

// ─── 2025 Census Cartographic Boundary Views ─────────────────────────────────
export interface CensusLayerItem {
  id: string;
  code: string;
  name: { en: string; ro: string };
  category: "states_regions" | "political" | "metro" | "education" | "micro" | "catalog" | "reference";
  categoryLabel: { en: string; ro: string };
  url: string;
  badge: string;
  description: { en: string; ro: string };
}

// Helper to extract state abbreviation from any feature (works for both GEO_URL and Census shapefiles)
export function getFeatureAbbrev(geo: any): string {
  const fips = geo.id?.toString().padStart(2, "0") ?? "";
  if (FIPS_TO_ABBREV[fips]) return FIPS_TO_ABBREV[fips];
  const props = geo.properties || {};
  if (props.STUSPS) return props.STUSPS;
  if (props.STATEFP && FIPS_TO_ABBREV[props.STATEFP]) return FIPS_TO_ABBREV[props.STATEFP];
  return "";
}

export const CENSUS_LAYERS: CensusLayerItem[] = [
  {
    id: "states",
    code: "cb_2025_us_state_500k",
    name: { en: "2025 States", ro: "Statele SUA 2025" },
    category: "states_regions",
    categoryLabel: { en: "States & Regions", ro: "State și Regiuni" },
    url: GEO_URL,
    badge: "50 States + DC",
    description: { en: "Official 2025 50-State and Territory Boundaries", ro: "Granițele oficiale 2025 ale celor 50 de state și teritorii" },
  },
  {
    id: "counties",
    code: "cb_2025_us_county_500k",
    name: { en: "2025 Counties", ro: "Comitate 2025" },
    category: "metro",
    categoryLabel: { en: "Metropolitan & Municipal", ro: "Metropolitan și Municipal" },
    url: "/maps/counties.json",
    badge: "3,144 Counties",
    description: { en: "3,144 U.S. Counties and County Equivalents", ro: "Cele 3.144 de comitate și echivalente administrative" },
  },
  {
    id: "congressional_districts",
    code: "cb_2025_us_cd119_500k",
    name: { en: "2025 Congressional Districts 119th Congress", ro: "Districte Congresionale 119th Congres" },
    category: "political",
    categoryLabel: { en: "Political & Legislative", ro: "Politic și Legislativ" },
    url: "/maps/congressional-districts-119.json",
    badge: "435 Districts",
    description: { en: "435 U.S. House of Representatives Electoral Districts", ro: "Cele 435 de districte electorale pentru Camera Reprezentanților" },
  },
  {
    id: "places",
    code: "cb_2025_us_place_500k",
    name: { en: "2025 Places", ro: "Localități și Orașe 2025" },
    category: "metro",
    categoryLabel: { en: "Metropolitan & Municipal", ro: "Metropolitan și Municipal" },
    url: "/maps/places.json",
    badge: "Cities & CDPs",
    description: { en: "Cities, Towns, Villages, & Census Designated Places", ro: "Orașe, sate și localități desemnate de recensământ" },
  },
  {
    id: "cbsa",
    code: "cb_2025_us_cbsa_500k",
    name: { en: "2025 Core Based Statistical Areas", ro: "Zone Statistice Principale (CBSA)" },
    category: "metro",
    categoryLabel: { en: "Metropolitan & Municipal", ro: "Metropolitan și Municipal" },
    url: "/maps/cbsa.json",
    badge: "925 Metro/Micro",
    description: { en: "Metropolitan & Micropolitan Statistical Hubs", ro: "Poluri statistice metropolitane și micropolitane" },
  },
  {
    id: "state_leg_upper",
    code: "cb_2025_us_sldu_500k",
    name: { en: "2025 State Legislative Districts Upper Chamber", ro: "Districte Legislative de Stat - Senat" },
    category: "political",
    categoryLabel: { en: "Political & Legislative", ro: "Politic și Legislativ" },
    url: "/maps/state-legislative-upper.json",
    badge: "State Senate",
    description: { en: "Upper Chamber State Senate Legislative Boundaries", ro: "Circumscripțiile senatoriale legislative ale statelor" },
  },
  {
    id: "state_leg_lower",
    code: "cb_2025_us_sldl_500k",
    name: { en: "2025 State Legislative Districts Lower Chamber", ro: "Districte Legislative de Stat - Cameră" },
    category: "political",
    categoryLabel: { en: "Political & Legislative", ro: "Politic și Legislativ" },
    url: "/maps/state-legislative-lower.json",
    badge: "State House",
    description: { en: "Lower Chamber State House / Assembly Legislative Boundaries", ro: "Circumscripțiile Camerei Deputaților/Adunării statelor" },
  },
  {
    id: "county_subdivisions",
    code: "cb_2025_us_cousub_500k",
    name: { en: "2025 County Subdivisions", ro: "Subdiviziuni de Comitat 2025" },
    category: "metro",
    categoryLabel: { en: "Metropolitan & Municipal", ro: "Metropolitan și Municipal" },
    url: "/maps/county-subdivisions.json",
    badge: "Townships & Subdivisions",
    description: { en: "Minor Civil Divisions, Townships, & Local Subdivisions", ro: "Diviziuni civile minore, orășele și subdiviziuni locale" },
  },
  {
    id: "census_regions",
    code: "cb_2025_us_region_500k",
    name: { en: "2025 Census Regions", ro: "Regiuni Recensământ 2025" },
    category: "states_regions",
    categoryLabel: { en: "States & Regions", ro: "State și Regiuni" },
    url: "/maps/census-regions.json",
    badge: "4 Regions",
    description: { en: "Northeast, Midwest, South, and West Macro-Regions", ro: "Macro-regiunile Nord-Est, Midwest, Sud și Vest" },
  },
  {
    id: "census_divisions",
    code: "cb_2025_us_division_500k",
    name: { en: "2025 Census Divisions", ro: "Diviziuni Recensământ 2025" },
    category: "states_regions",
    categoryLabel: { en: "States & Regions", ro: "State și Regiuni" },
    url: "/maps/census-divisions.json",
    badge: "9 Divisions",
    description: { en: "9 Official U.S. Census Geographic Divisions", ro: "Cele 9 diviziuni geografice oficiale ale Recensământului" },
  },
  {
    id: "counties_in_cd119",
    code: "cb_2025_us_county_within_cd119_500k",
    name: { en: "2025 Counties within Congressional Districts 119th Congress", ro: "Comitate în Districte Congresionale 119th Congres" },
    category: "political",
    categoryLabel: { en: "Political & Legislative", ro: "Politic și Legislativ" },
    url: "/maps/counties-within-cd119.json",
    badge: "Intersections",
    description: { en: "County Boundaries Intersected by 119th Congressional Districts", ro: "Granițele comitatelor intersectate de districtele congresionale" },
  },
  {
    id: "csa",
    code: "cb_2025_us_csa_500k",
    name: { en: "2025 Combined Statistical Areas", ro: "Zone Statistice Combinate (CSA)" },
    category: "metro",
    categoryLabel: { en: "Metropolitan & Municipal", ro: "Metropolitan și Municipal" },
    url: "/maps/csa.json",
    badge: "175 Combined Areas",
    description: { en: "Regional Economic Combined Metropolitan Conurbations", ro: "Conurbații economice regionale combinate" },
  },
  {
    id: "zip_codes",
    code: "usa_zip_code_areas",
    name: { en: "ZIP Code Boundaries", ro: "Granițe Cod Poștal (ZIP)" },
    category: "reference",
    categoryLabel: { en: "Reference Boundaries", ro: "Granițe de Referință" },
    url: "/maps/zip-codes.json",
    badge: "32,294 ZIP Codes",
    description: { en: "USPS ZIP Code Tabulation Areas Nationwide", ro: "Zonele de tabulare a codurilor poștale USPS la nivel național" },
  },
  {
    id: "metro_divisions",
    code: "cb_2025_us_metdiv_500k",
    name: { en: "2025 Metropolitan Divisions", ro: "Diviziuni Metropolitane 2025" },
    category: "metro",
    categoryLabel: { en: "Metropolitan & Municipal", ro: "Metropolitan și Municipal" },
    url: "/maps/metropolitan-divisions.json",
    badge: "Urban Divisions",
    description: { en: "Sub-divisions within Major Metropolitan Statistical Areas", ro: "Subdiviziuni în cadrul marilor arii metropolitane" },
  },
  {
    id: "consolidated_cities",
    code: "cb_2025_us_concity_500k",
    name: { en: "2025 Consolidated Cities", ro: "Orașe Consolidate 2025" },
    category: "metro",
    categoryLabel: { en: "Metropolitan & Municipal", ro: "Metropolitan și Municipal" },
    url: "/maps/consolidated-cities.json",
    badge: "City-County",
    description: { en: "Consolidated City-County Municipal Governments", ro: "Guverne municipale consolidate de tip oraș-comitat" },
  },
  {
    id: "estates",
    code: "cb_2025_78_estate_500k",
    name: { en: "2025 Estates", ro: "Domenii și Teritorii (Estates)" },
    category: "metro",
    categoryLabel: { en: "Metropolitan & Municipal", ro: "Metropolitan și Municipal" },
    url: "/maps/estates.json",
    badge: "U.S. Virgin Islands",
    description: { en: "Estate Divisions in U.S. Virgin Islands", ro: "Diviziuni domeniale din Insulele Virgine SUA" },
  },
  {
    id: "unified_school_districts",
    code: "cb_2025_us_unsd_500k",
    name: { en: "2025 Unified School Districts", ro: "Districte Școlare Unificate 2025" },
    category: "education",
    categoryLabel: { en: "Education & Schools", ro: "Educație și Școli" },
    url: "/maps/unified-school-districts.json",
    badge: "K-12 Unified",
    description: { en: "Unified Kindergarten through 12th Grade School Districts", ro: "Districte școlare unificate de la grădiniță până la clasa a XII-a" },
  },
  {
    id: "elementary_school_districts",
    code: "cb_2025_us_elsd_500k",
    name: { en: "2025 Elementary School Districts", ro: "Districte Școlare Primare 2025" },
    category: "education",
    categoryLabel: { en: "Education & Schools", ro: "Educație și Școli" },
    url: "/maps/elementary-school-districts.json",
    badge: "Elementary",
    description: { en: "Primary and Elementary Level Public School Districts", ro: "Districte școlare publice primare" },
  },
  {
    id: "secondary_school_districts",
    code: "cb_2025_us_scsd_500k",
    name: { en: "2025 Secondary School Districts", ro: "Districte Școlare Secundare 2025" },
    category: "education",
    categoryLabel: { en: "Education & Schools", ro: "Educație și Școli" },
    url: "/maps/secondary-school-districts.json",
    badge: "High Schools",
    description: { en: "High School and Secondary Level Public School Districts", ro: "Districte școlare publice secundare (licee)" },
  },
  {
    id: "school_admin_areas",
    code: "cb_2025_50_sdadm_500k",
    name: { en: "2025 School District Administrative Areas", ro: "Zone Administrative Școlare 2025" },
    category: "education",
    categoryLabel: { en: "Education & Schools", ro: "Educație și Școli" },
    url: "/maps/school-district-admin-areas.json",
    badge: "Admin Boundaries",
    description: { en: "School District Administrative Region Boundaries", ro: "Granițele regiunilor administrative ale districtelor școlare" },
  },
  {
    id: "census_tracts",
    code: "cb_2025_us_tract_500k",
    name: { en: "2025 Census Tracts", ro: "Sectoare de Recensământ 2025 (Tracts)" },
    category: "micro",
    categoryLabel: { en: "Census Micro-Boundaries", ro: "Micro-Subdiviziuni Recensământ" },
    url: "/maps/census-tracts.json",
    badge: "Neighborhood Level",
    description: { en: "Small, Relatively Permanent Neighborhood Subdivisions", ro: "Subdiviziuni de cartier la nivel micro" },
  },
  {
    id: "census_block_groups",
    code: "cb_2025_us_bg_500k",
    name: { en: "2025 Census Block Groups", ro: "Grupuri de Blocuri 2025" },
    category: "micro",
    categoryLabel: { en: "Census Micro-Boundaries", ro: "Micro-Subdiviziuni Recensământ" },
    url: "/maps/census-block-groups.json",
    badge: "Micro Block Groups",
    description: { en: "Clusters of Census Blocks within Tracts", ro: "Grupuri ultra-detaliate de blocuri în cadrul sectoarelor" },
  },
  {
    id: "all_census_catalog",
    code: "cb_2025_us_all_500k",
    name: { en: "2025 Full Cartographic Collection", ro: "Colecția Cartografică Completă 2025" },
    category: "catalog",
    categoryLabel: { en: "Full Dataset Catalog", ro: "Catalog Complet Set de Date" },
    url: "/maps/counties-within-cd119.json",
    badge: "All 21 Layers Combined",
    description: { en: "Master composite view of the complete 2025 U.S. Census 500k Cartographic Boundary collection", ro: "Vizualizare master compozită a întregului set de 21 de granițe cartografice 2025" },
  }
];


// ─── State Trivia Lookup ─────────────────────────────────────────────────────
// `brand` holds company/institution names, which are proper nouns and stay untranslated.
interface StateTrivia {
  landmark: { en: string; ro: string };
  fact: { en: string; ro: string };
  motto: { en: string; ro: string };
  brand: string;
}

const STATE_TRIVIA: Record<string, StateTrivia> = {
  AL: { landmark: { en: "US Space & Rocket Center", ro: "US Space & Rocket Center" }, fact: { en: "Huntsville built the Saturn V rocket that put American astronauts on the Moon.", ro: "La Huntsville a fost construită racheta Saturn V care a dus astronauții americani pe Lună." }, motto: { en: "We dare defend our rights", ro: "Îndrăznim să ne apărăm drepturile" }, brand: "ULA / Marshall Space Flight Center" },
  AK: { landmark: { en: "Denali (Mount McKinley)", ro: "Denali (Muntele McKinley)" }, fact: { en: "Has more coastline than all other 49 states combined.", ro: "Are mai multă coastă decât celelalte 49 de state la un loc." }, motto: { en: "North to the Future", ro: "Spre nord, către viitor" }, brand: "Alaska Air Group" },
  AZ: { landmark: { en: "The Grand Canyon", ro: "Marele Canion" }, fact: { en: "Home to the Sonoran Desert, the only place where Saguaro cacti grow wild.", ro: "Găzduiește Deșertul Sonora, singurul loc unde cactușii Saguaro cresc în sălbăticie." }, motto: { en: "God enriches", ro: "Dumnezeu îmbogățește" }, brand: "Freeport-McMoRan" },
  AR: { landmark: { en: "Hot Springs National Park", ro: "Parcul Național Hot Springs" }, fact: { en: "Only state with an active diamond mine open to the public.", ro: "Singurul stat cu o mină de diamante activă, deschisă publicului." }, motto: { en: "The People Rule", ro: "Poporul conduce" }, brand: "Walmart" },
  CA: { landmark: { en: "Silicon Valley & Golden Gate Bridge", ro: "Silicon Valley și Podul Golden Gate" }, fact: { en: "If California were a nation, its economy would rank 5th in the world.", ro: "Dacă California ar fi o țară, economia sa ar fi a 5-a din lume." }, motto: { en: "Eureka (I have found it)", ro: "Evrika (Am găsit)" }, brand: "Apple / Google / Nvidia / Chevron" },
  CO: { landmark: { en: "Rocky Mountains", ro: "Munții Stâncoși" }, fact: { en: "Has the highest average elevation of any U.S. state at 6,800 feet.", ro: "Are cea mai mare altitudine medie dintre toate statele SUA: circa 2.070 de metri." }, motto: { en: "Nothing without providence", ro: "Nimic fără providență" }, brand: "Coors Brewing / Arrow Electronics" },
  CT: { landmark: { en: "Yale University", ro: "Universitatea Yale" }, fact: { en: "Home of the first hamburger, Polaroid camera, and nuclear submarine.", ro: "Locul primului hamburger, al aparatului Polaroid și al primului submarin nuclear." }, motto: { en: "He who transplanted sustains", ro: "Cel care a răsădit susține" }, brand: "General Electric / Otis Elevator" },
  DE: { landmark: { en: "Historic New Castle", ro: "Orașul istoric New Castle" }, fact: { en: "The very first state to ratify the U.S. Constitution (December 7, 1787).", ro: "Primul stat care a ratificat Constituția SUA (7 decembrie 1787)." }, motto: { en: "Liberty and Independence", ro: "Libertate și independență" }, brand: "DuPont" },
  DC: { landmark: { en: "The White House & Capitol", ro: "Casa Albă și Capitoliul" }, fact: { en: "Designed by French engineer Pierre L'Enfant and holds 172 foreign embassies.", ro: "Proiectat de inginerul francez Pierre L'Enfant, găzduiește 172 de ambasade străine." }, motto: { en: "Justice for All", ro: "Dreptate pentru toți" }, brand: "Danaher / Marriott International" },
  FL: { landmark: { en: "Kennedy Space Center & Everglades", ro: "Centrul Spațial Kennedy și Everglades" }, fact: { en: "Only place on Earth where alligators and crocodiles coexist in the wild.", ro: "Singurul loc de pe Pământ unde aligatorii și crocodilii coexistă în sălbăticie." }, motto: { en: "In God We Trust", ro: "În Dumnezeu ne încredem" }, brand: "Publix Super Markets / NextEra Energy" },
  GA: { landmark: { en: "Martin Luther King Jr. Historic Site", ro: "Situl istoric Martin Luther King Jr." }, fact: { en: "Atlanta's Hartsfield-Jackson Airport is the busiest airport in the world.", ro: "Aeroportul Hartsfield-Jackson din Atlanta este cel mai aglomerat din lume." }, motto: { en: "Wisdom, Justice, and Moderation", ro: "Înțelepciune, dreptate și cumpătare" }, brand: "Coca-Cola / Delta Air Lines / Home Depot" },
  HI: { landmark: { en: "Pearl Harbor & Diamond Head", ro: "Pearl Harbor și Diamond Head" }, fact: { en: "The youngest state in the union and the only one made entirely of islands.", ro: "Cel mai nou stat al Uniunii și singurul format în întregime din insule." }, motto: { en: "The life of the land is perpetuated in righteousness", ro: "Viața pământului dăinuie prin dreptate" }, brand: "Hawaiian Airlines" },
  ID: { landmark: { en: "Craters of the Moon", ro: "Craters of the Moon" }, fact: { en: "Produces one-third of all potatoes grown in the United States.", ro: "Produce o treime din toți cartofii cultivați în Statele Unite." }, motto: { en: "Let it be perpetual", ro: "Să dăinuie veșnic" }, brand: "Albertsons / Micron Technology" },
  IL: { landmark: { en: "Willis (Sears) Tower", ro: "Turnul Willis (Sears)" }, fact: { en: "Chicago built the world's first modern skyscraper (Home Insurance Building) in 1885.", ro: "Chicago a construit primul zgârie-nori modern din lume (Home Insurance Building) în 1885." }, motto: { en: "State sovereignty, national union", ro: "Suveranitatea statului, uniunea națională" }, brand: "McDonald's / Abbott Labs / Caterpillar" },
  IN: { landmark: { en: "Indianapolis Motor Speedway", ro: "Circuitul Indianapolis Motor Speedway" }, fact: { en: "Hosts the Indy 500, the world's largest single-day sporting event.", ro: "Găzduiește Indy 500, cel mai mare eveniment sportiv de o zi din lume." }, motto: { en: "The Crossroads of America", ro: "Răscrucea Americii" }, brand: "Eli Lilly / Cummins" },
  IA: { landmark: { en: "Field of Dreams", ro: "Field of Dreams" }, fact: { en: "Produces more corn, pork, and eggs than any other state in the nation.", ro: "Produce mai mult porumb, carne de porc și ouă decât orice alt stat." }, motto: { en: "Our liberties we prize and our rights we will maintain", ro: "Ne prețuim libertățile și ne vom apăra drepturile" }, brand: "John Deere (Manufacturing hub)" },
  KS: { landmark: { en: "Monument Rocks", ro: "Monument Rocks" }, fact: { en: "Known as the wheat capital of the world, producing millions of bushels annually.", ro: "Cunoscut drept capitala mondială a grâului, cu milioane de baniți produși anual." }, motto: { en: "To the stars through difficulties", ro: "Către stele, prin greutăți" }, brand: "Koch Industries / Garmin" },
  KY: { landmark: { en: "Churchill Downs (Kentucky Derby)", ro: "Churchill Downs (Derby-ul din Kentucky)" }, fact: { en: "Produces 95% of the world's total supply of Bourbon whiskey.", ro: "Produce 95% din whisky-ul Bourbon din lume." }, motto: { en: "United we stand, divided we fall", ro: "Uniți rezistăm, dezbinați cădem" }, brand: "Kentucky Bourbon Brands / Humana" },
  LA: { landmark: { en: "New Orleans French Quarter", ro: "Cartierul Francez din New Orleans" }, fact: { en: "Birthplace of Jazz music and home of the world-famous Mardi Gras festival.", ro: "Locul de naștere al jazzului și gazda faimosului festival Mardi Gras." }, motto: { en: "Union, Justice, and Confidence", ro: "Uniune, dreptate și încredere" }, brand: "Entergy" },
  ME: { landmark: { en: "Acadia National Park", ro: "Parcul Național Acadia" }, fact: { en: "Produces 90% of the country's domestic lobster supply.", ro: "Produce 90% din homarul din Statele Unite." }, motto: { en: "I lead", ro: "Eu conduc" }, brand: "L.L. Bean" },
  MD: { landmark: { en: "Fort McHenry National Monument", ro: "Monumentul Național Fort McHenry" }, fact: { en: "Where Francis Scott Key wrote 'The Star-Spangled Banner' in 1814.", ro: "Locul unde Francis Scott Key a scris „The Star-Spangled Banner” în 1814." }, motto: { en: "Manly deeds, womanly words", ro: "Fapte bărbătești, vorbe femeiești" }, brand: "Lockheed Martin / Under Armour" },
  MA: { landmark: { en: "Harvard Yard & Freedom Trail", ro: "Harvard Yard și Freedom Trail" }, fact: { en: "Boston established America's first public park (Boston Common) in 1634.", ro: "Boston a înființat primul parc public din America (Boston Common) în 1634." }, motto: { en: "By the sword we seek peace, but peace only under liberty", ro: "Cu sabia căutăm pacea, dar doar pacea sub libertate" }, brand: "Fidelity Investments / Boston Dynamics" },
  MI: { landmark: { en: "Henry Ford Museum & Mackinac Bridge", ro: "Muzeul Henry Ford și Podul Mackinac" }, fact: { en: "Birthplace of Henry Ford's assembly line and the historic Motown sound.", ro: "Locul de naștere al liniei de asamblare a lui Henry Ford și al sunetului Motown." }, motto: { en: "If you seek a pleasant peninsula, look about you", ro: "De cauți o peninsulă plăcută, privește în jur" }, brand: "Ford Motor Company / General Motors / Whirlpool" },
  MN: { landmark: { en: "Mall of America", ro: "Mall of America" }, fact: { en: "Has 11,842 lakes, despite its famous nickname 'Land of 10,000 Lakes'.", ro: "Are 11.842 de lacuri, în ciuda supranumelui „Ținutul celor 10.000 de lacuri”." }, motto: { en: "The Star of the North", ro: "Steaua Nordului" }, brand: "Target / 3M / UnitedHealth Group" },
  MS: { landmark: { en: "Mississippi Delta Region", ro: "Regiunea Delta Mississippi" }, fact: { en: "The birth site of Blues music and birthplace of rock legend Elvis Presley.", ro: "Locul de naștere al muzicii blues și al legendei rock Elvis Presley." }, motto: { en: "By valor and arms", ro: "Prin vitejie și arme" }, brand: "Sanderson Farms" },
  MO: { landmark: { en: "Gateway Arch St. Louis", ro: "Arcul Gateway din St. Louis" }, fact: { en: "The Gateway Arch is the tallest man-made monument in the Western Hemisphere.", ro: "Arcul Gateway este cel mai înalt monument construit de om din emisfera vestică." }, motto: { en: "Let the welfare of the people be the supreme law", ro: "Bunăstarea poporului să fie legea supremă" }, brand: "Anheuser-Busch / H&R Block" },
  MT: { landmark: { en: "Glacier National Park", ro: "Parcul Național Glacier" }, fact: { en: "Contains the Triple Divide Peak, where water flows to three different oceans.", ro: "Conține Triple Divide Peak, de unde apa curge către trei oceane diferite." }, motto: { en: "Gold and Silver", ro: "Aur și argint" }, brand: "Montana Resources" },
  NE: { landmark: { en: "Chimney Rock Site", ro: "Situl Chimney Rock" }, fact: { en: "Has the only unicameral (single-chamber) state legislature in the nation.", ro: "Are singurul legislativ unicameral (cu o singură cameră) din țară." }, motto: { en: "Equality before the law", ro: "Egalitate în fața legii" }, brand: "Berkshire Hathaway" },
  NV: { landmark: { en: "Las Vegas Strip & Hoover Dam", ro: "Las Vegas Strip și Barajul Hoover" }, fact: { en: "Produces more gold than any state, ranking behind only China, Australia, and Russia.", ro: "Produce mai mult aur decât orice alt stat, fiind depășit doar de China, Australia și Rusia." }, motto: { en: "All for Our Country", ro: "Totul pentru țara noastră" }, brand: "MGM Resorts / Caesars Entertainment" },
  NH: { landmark: { en: "Mount Washington Observatory", ro: "Observatorul de pe Muntele Washington" }, fact: { en: "Mount Washington once held the world record for the highest wind speed (231 mph).", ro: "Muntele Washington a deținut recordul mondial pentru cea mai mare viteză a vântului (372 km/h)." }, motto: { en: "Live Free or Die", ro: "Trăiește liber sau mori" }, brand: "Timberland" },
  NJ: { landmark: { en: "Atlantic City Boardwalk", ro: "Promenada din Atlantic City" }, fact: { en: "Has the highest population density of any U.S. state.", ro: "Are cea mai mare densitate a populației dintre toate statele SUA." }, motto: { en: "Liberty and prosperity", ro: "Libertate și prosperitate" }, brand: "Johnson & Johnson / Prudential Financial" },
  NM: { landmark: { en: "Carlsbad Caverns National Park", ro: "Parcul Național Carlsbad Caverns" }, fact: { en: "Santa Fe, founded in 1610, is the oldest capital city in the United States.", ro: "Santa Fe, fondat în 1610, este cea mai veche capitală din Statele Unite." }, motto: { en: "It grows as it goes", ro: "Crește pe măsură ce înaintează" }, brand: "Sandia National Labs" },
  NY: { landmark: { en: "Statue of Liberty & Times Square", ro: "Statuia Libertății și Times Square" }, fact: { en: "New York City was the first capital of the United States under the Constitution.", ro: "New York a fost prima capitală a Statelor Unite sub Constituție." }, motto: { en: "Ever upward", ro: "Mereu mai sus" }, brand: "IBM / JPMorgan Chase / Pfizer / PepsiCo" },
  NC: { landmark: { en: "Kitty Hawk & Biltmore Estate", ro: "Kitty Hawk și Conacul Biltmore" }, fact: { en: "Site of the Wright Brothers' first successful airplane flight in 1903.", ro: "Locul primului zbor reușit cu avionul al fraților Wright, în 1903." }, motto: { en: "To be, rather than to seem", ro: "A fi, mai degrabă decât a părea" }, brand: "Bank of America / Lowe's / Epic Games" },
  ND: { landmark: { en: "Theodore Roosevelt National Park", ro: "Parcul Național Theodore Roosevelt" }, fact: { en: "Grows more sunflowers and produces more honey than any other state.", ro: "Cultivă mai multă floarea-soarelui și produce mai multă miere decât orice alt stat." }, motto: { en: "Liberty and union, now and forever, one and inseparable", ro: "Libertate și uniune, acum și pentru totdeauna, una și nedespărțită" }, brand: "Bobcat Company" },
  OH: { landmark: { en: "Rock & Roll Hall of Fame", ro: "Rock & Roll Hall of Fame" }, fact: { en: "Known as the 'Mother of Presidents', having birthed 8 U.S. presidents.", ro: "Cunoscut drept „Mama Președinților”, fiind locul de naștere a 8 președinți americani." }, motto: { en: "With God, all things are possible", ro: "Cu Dumnezeu, totul este cu putință" }, brand: "Procter & Gamble / Kroger" },
  OK: { landmark: { en: "National Cowboy Museum", ro: "Muzeul Național al Cowboy-ului" }, fact: { en: "Has the largest population of Native American tribes in the nation.", ro: "Are cea mai numeroasă populație de triburi native americane din țară." }, motto: { en: "Labor conquers all things", ro: "Munca învinge totul" }, brand: "Devon Energy / Love's Travel Stops" },
  OR: { landmark: { en: "Crater Lake National Park", ro: "Parcul Național Crater Lake" }, fact: { en: "Crater Lake is the deepest lake in the U.S. and has exceptionally pure water.", ro: "Crater Lake este cel mai adânc lac din SUA și are o apă excepțional de pură." }, motto: { en: "She flies with her own wings", ro: "Ea zboară cu propriile aripi" }, brand: "Nike / Columbia Sportswear" },
  PA: { landmark: { en: "Independence Hall & Gettysburg", ro: "Independence Hall și Gettysburg" }, fact: { en: "Where both the Declaration of Independence and the Constitution were signed.", ro: "Locul unde au fost semnate atât Declarația de Independență, cât și Constituția." }, motto: { en: "Virtue, liberty, and independence", ro: "Virtute, libertate și independență" }, brand: "Comcast / Hershey's" },
  RI: { landmark: { en: "Newport Gilded Age Mansions", ro: "Conacele Epocii de Aur din Newport" }, fact: { en: "The first colony to renounce allegiance to the British Crown on May 4, 1776.", ro: "Prima colonie care a renunțat la supunerea față de Coroana Britanică, la 4 mai 1776." }, motto: { en: "Hope", ro: "Speranță" }, brand: "CVS Health / Hasbro" },
  SC: { landmark: { en: "Fort Sumter National Monument", ro: "Monumentul Național Fort Sumter" }, fact: { en: "The first shots of the American Civil War were fired at Fort Sumter in 1861.", ro: "Primele focuri ale Războiului Civil American au fost trase la Fort Sumter, în 1861." }, motto: { en: "While I breathe, I hope", ro: "Cât respir, sper" }, brand: "Sonoco Products" },
  SD: { landmark: { en: "Mount Rushmore Memorial", ro: "Memorialul Mount Rushmore" }, fact: { en: "Features the 60-foot granite heads of Washington, Jefferson, Roosevelt, and Lincoln.", ro: "Prezintă chipurile de granit, înalte de 18 metri, ale lui Washington, Jefferson, Roosevelt și Lincoln." }, motto: { en: "Under God the people rule", ro: "Sub Dumnezeu, poporul conduce" }, brand: "Sanford Health" },
  TN: { landmark: { en: "Graceland & Grand Ole Opry", ro: "Graceland și Grand Ole Opry" }, fact: { en: "Great Smoky Mountains is the most visited National Park in the United States.", ro: "Great Smoky Mountains este cel mai vizitat parc național din Statele Unite." }, motto: { en: "Agriculture and Commerce", ro: "Agricultură și comerț" }, brand: "FedEx / HCA Healthcare / Dollar General" },
  TX: { landmark: { en: "The Alamo & NASA Space Center", ro: "Alamo și Centrul Spațial NASA" }, fact: { en: "Only state to enter by treaty, and was its own independent republic for 9 years.", ro: "Singurul stat intrat în Uniune prin tratat; a fost republică independentă timp de 9 ani." }, motto: { en: "Friendship", ro: "Prietenie" }, brand: "ExxonMobil / AT&T / Tesla / Texas Instruments" },
  UT: { landmark: { en: "Zion National Park & Arches", ro: "Parcurile Naționale Zion și Arches" }, fact: { en: "Has the youngest average population age in the United States.", ro: "Are cea mai tânără vârstă medie a populației din Statele Unite." }, motto: { en: "Industry", ro: "Hărnicie" }, brand: "Huntsman / Overstock" },
  VT: { landmark: { en: "Green Mountain Forest", ro: "Pădurea Green Mountain" }, fact: { en: "The largest producer of maple syrup in the United States.", ro: "Cel mai mare producător de sirop de arțar din Statele Unite." }, motto: { en: "Freedom and Unity", ro: "Libertate și unitate" }, brand: "Ben & Jerry's / Keurig Dr Pepper" },
  VA: { landmark: { en: "Monticello & Jamestown", ro: "Monticello și Jamestown" }, fact: { en: "Known as the 'Birthplace of a Nation', four of the first five U.S. presidents were Virginian.", ro: "Cunoscut drept „Locul de naștere al unei națiuni”: patru dintre primii cinci președinți americani au fost din Virginia." }, motto: { en: "Thus always to tyrants", ro: "Astfel, întotdeauna, tiranilor" }, brand: "General Dynamics / Northrop Grumman" },
  WA: { landmark: { en: "Space Needle & Mount Rainier", ro: "Space Needle și Muntele Rainier" }, fact: { en: "Home of aerospace and tech giants Boeing, Microsoft, Amazon, and Starbucks.", ro: "Casa giganților Boeing, Microsoft, Amazon și Starbucks." }, motto: { en: "By and by", ro: "Cu timpul" }, brand: "Microsoft / Amazon / Costco / Starbucks" },
  WV: { landmark: { en: "New River Gorge Bridge", ro: "Podul New River Gorge" }, fact: { en: "The first state to introduce a sales tax (in 1921).", ro: "Primul stat care a introdus o taxă pe vânzări (în 1921)." }, motto: { en: "Mountaineers are always free", ro: "Muntenii sunt mereu liberi" }, brand: "Wheeling-Pittsburgh Steel" },
  WI: { landmark: { en: "Wisconsin Dells & Lambeau Field", ro: "Wisconsin Dells și Lambeau Field" }, fact: { en: "Produces over 2 billion pounds of cheese annually, leading the nation.", ro: "Produce anual peste 900 de milioane de kilograme de brânză, cel mai mult din țară." }, motto: { en: "Forward", ro: "Înainte" }, brand: "Harley-Davidson / Northwestern Mutual" },
  WY: { landmark: { en: "Yellowstone National Park", ro: "Parcul Național Yellowstone" }, fact: { en: "Yellowstone was established in 1872 as the world's first national park.", ro: "Yellowstone a fost înființat în 1872 ca primul parc național din lume." }, motto: { en: "Equal Rights", ro: "Drepturi egale" }, brand: "Wyoming Coal Mines" },
};

// ─── Region Palette ───────────────────────────────────────────────────────────
// Semi-transparent, softer colors: vivid enough to distinguish on black, but
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
    // Panel labels
    gdpRankLabel: string;
    popRankLabel: string;
    areaRankLabel: string;
    entryOrderLabel: string;
    perCapitaSuffix: string;
    perSqMiSuffix: string;
    squareMilesLabel: string;
    toJoinSuffix: string;
    rankOneLabel: string;
    ofFiftyStates: string;
    shareOfUsGdp: string;
    iconicLandmark: string;
    stateHeritageSite: string;
    comparativeRankings: string;
    sameRegionLabel: string;
    totalSuffix: string;
    nationalRanking: string;
    top5Gdp: string;
    top5Population: string;
    americanLegacy: string;
    ePluribusTitle: string;
    ePluribusBody: string;
    /** Localized region names keyed by the English region id. */
    regionNames: Record<string, string>;
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
    delegationLabel: string;
    houseSeatsLabel: string;
    senatorsLabel: string;
    electoralShareNote: string;
    constitutionGlanceTitle: string;
    compactsTitle: string;
    compactsNone: string;
    defaultLandmark: string;
    defaultFact: string;
    defaultMotto: string;
    defaultBrand: string;
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

// ─── National Stats Banner ───────────────────────────────────────────────────
function StatTicker({ locale }: { locale: "en" | "ro" }) {
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 w-full">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
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
          </div>
        );
      })}
    </div>
  );
}

// ─── GDP Rank Bar ─────────────────────────────────────────────────────────────
function GdpRankBar({ rank, label }: { rank: number; label: string }) {
  // rank 1 = best (CA) → fill = 100%; rank 50 = lowest → fill ≈ 2%
  const fillPct = Math.round(((51 - rank) / 50) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-body text-[10px] uppercase tracking-widest text-white/35 font-semibold">{label}</span>
        <span className="font-hero text-sm text-[#fbbf24]">#{rank} <span className="font-body text-[10px] text-white/30">/ 50</span></span>
      </div>
      {/* Plain CSS width transition: framer-motion cannot interpolate `0` → `"NN%"`
          and silently leaves the fill at 0px. */}
      <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
        <div
          style={{ width: `${fillPct}%` }}
          className="h-full rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] transition-[width] duration-500 ease-out"
        />
      </div>
    </div>
  );
}

// ─── Population Rank Bar ────────────────────────────────────────────────────
function PopRankBar({ rank, color, label }: { rank: number; color: string; label: string }) {
  const fillPct = Math.round(((51 - rank) / 50) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-body text-[10px] uppercase tracking-widest text-white/35 font-semibold">{label}</span>
        <span className="font-hero text-sm" style={{ color }}>#{rank} <span className="font-body text-[10px] text-white/30">/ 50</span></span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${fillPct}%`, background: `linear-gradient(to right, ${color}99, ${color})` }}
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
    "none" | "gdp" | "population" | "income" | "homeValue" | "education" | "veterans" | "broadband" | "ownerPct" | "poverty" | "commute" | "election2024" | "election2020" | "statehood" | "amendments" | "conLength" | "medianAge" | "medianRent" | "workFromHome" | "noVehicle" | "foreignBorn" | "snapPct" | "unemployment" | "insured" | "highSchool" | "gradDegree" | "multiVehicle" | "vacancy" | "timeZone"
  >("none");
  const [liveCensusData, setLiveCensusData] = useState<CensusAcsData | null>(null);
  const [isLoadingCensusData, setIsLoadingCensusData] = useState<boolean>(false);

  // 🌟 New Feature Modal & Overlay States
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [isFactsheetModalOpen, setIsFactsheetModalOpen] = useState<boolean>(false);
  const [showInterstates, setShowInterstates] = useState<boolean>(false);
  const [showAmtrakRail, setShowAmtrakRail] = useState<boolean>(false);
  const [showHospitals, setShowHospitals] = useState<boolean>(false);
  const [showSchools, setShowSchools] = useState<boolean>(false);
  const [showVolcanoes, setShowVolcanoes] = useState<boolean>(false);
  const [showAmtrakStations, setShowAmtrakStations] = useState<boolean>(false);
  const [showTransmissionLines, setShowTransmissionLines] = useState<boolean>(false);
  const [showTrails, setShowTrails] = useState<boolean>(false);
  const [showParkBoundaries, setShowParkBoundaries] = useState<boolean>(false);
  const [showFederalLands, setShowFederalLands] = useState<boolean>(false);
  const [historicalYearFilter, setHistoricalYearFilter] = useState<number>(1959);
  // Census Layer selection state (22 views)
  const [activeCensusLayerId, setActiveCensusLayerId] = useState<string>("states");
  const [isLayerModalOpen, setIsLayerModalOpen] = useState<boolean>(false);
  const [layerSearchQuery, setLayerSearchQuery] = useState<string>("");
  const [layerCategoryFilter, setLayerCategoryFilter] = useState<string>("all");
  const [featureHoverInfo, setFeatureHoverInfo] = useState<{ label: string; details: string; code: string; categoryMetric?: string } | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<{
    id: string;
    name: string;
    layerName: string;
    layerCode: string;
    geoid: string;
    stateAbbrev: string;
    properties: Record<string, any>;
  } | null>(null);

  // Zoom & Pan position state
  const [zoomPosition, setZoomPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [-96, 38],
    zoom: 1,
  });


  const handleZoomIn = useCallback(() => {
    setZoomPosition((prev) => ({ ...prev, zoom: Math.min(prev.zoom * 1.5, 8) }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomPosition((prev) => {
      const nextZoom = Math.max(prev.zoom / 1.5, 1);
      if (nextZoom <= 1.05) {
        return { coordinates: [-96, 38], zoom: 1 };
      }
      return { ...prev, zoom: nextZoom };
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomPosition({ coordinates: [-96, 38], zoom: 1 });
  }, []);

  const handleMoveEnd = useCallback((pos: { coordinates: [number, number]; zoom: number }) => {
    if (pos.zoom <= 1.05) {
      setZoomPosition({ coordinates: [-96, 38], zoom: 1 });
    } else {
      setZoomPosition(pos);
    }
  }, []);

  const activeCensusLayer = useMemo(
    () => CENSUS_LAYERS.find((l) => l.id === activeCensusLayerId) ?? CENSUS_LAYERS[0],
    [activeCensusLayerId]
  );

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

  /** Congressional delegation, derived from electoral votes.
   *  Every state's electoral votes == its House seats + its 2 senators. */
  const delegation = useMemo(() => {
    const ev = extended?.electoralVotes ?? 0;
    return { electoralVotes: ev, houseSeats: Math.max(0, ev - 2), senators: 2 };
  }, [extended]);

  /** Interstate agreements the selected state is a party to. */
  const stateCompacts = useMemo(
    () => COOPERATION_AGREEMENTS.filter((a) => a.members.includes(selectedState.abbrev)),
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
      const props = geo.properties || {};
      const abbrev = getFeatureAbbrev(geo);
      const featureId = geo.id || props.GEOID || geo.rsmKey;

      const isStateSelected = activeCensusLayerId === "states" && abbrev === selectedStateAbbrev;
      const isFeatureSelected = selectedFeature?.id === featureId || (props.GEOID && selectedFeature?.geoid === props.GEOID);
      const isHovered = hoveredStateAbbrev === abbrev || hoveredStateAbbrev === featureId;

      // ── Non-State Census Layers ──
      if (activeCensusLayerId !== "states" && activeCensusLayerId !== "all_census_catalog") {
        if (isFeatureSelected) {
          return {
            fill: "rgba(251, 191, 36, 0.55)",
            stroke: "#fbbf24",
            strokeWidth: 1.8,
            outline: "none",
            transition: "all 0.15s ease",
          };
        }
        if (isHovered) {
          return {
            fill: "rgba(255, 255, 255, 0.45)",
            stroke: "#ffffff",
            strokeWidth: 1.2,
            outline: "none",
            transition: "all 0.15s ease",
          };
        }

        const stAbbrev = abbrev || (props.STATEFP ? FIPS_TO_ABBREV[props.STATEFP] : "");
        const geoidKey = props.GEOID || (props.STATEFP && props.COUNTYFP ? `${props.STATEFP}${props.COUNTYFP}` : "") || featureId;
        const localAcs = LOCAL_CENSUS_ACS_DATABASE[geoidKey] || LOCAL_CENSUS_COUNTY_METRO_DATA[geoidKey];

        // Deterministic hash variance per FIPS code so every county & metro area renders unique heatmap shading
        let hash = 0;
        for (let i = 0; i < geoidKey.length; i++) {
          hash = (hash << 5) - hash + geoidKey.charCodeAt(i);
          hash |= 0;
        }
        const fipsVar = ((Math.abs(hash) % 100) - 50) / 100; // -0.50 to +0.50

        if (heatmapMode === "income") {
          const baseInc = stAbbrev ? STATE_DEMOGRAPHIC_BENCHMARKS[stAbbrev]?.income ?? 70000 : 70000;
          const inc = localAcs?.medianIncome ?? Math.max(35000, baseInc * (1 + fipsVar * 0.35));
          const r = Math.min(Math.max((inc - 45000) / 55000, 0), 1);
          return { fill: `hsla(145,78%,45%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "homeValue") {
          const baseHv = stAbbrev ? STATE_DEMOGRAPHIC_BENCHMARKS[stAbbrev]?.homeValue ?? 350000 : 350000;
          const hv = localAcs?.medianHomeValue ?? Math.max(140000, baseHv * (1 + fipsVar * 0.45));
          const r = Math.min(Math.max((hv - 150000) / 700000, 0), 1);
          return { fill: `hsla(28,90%,48%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "gdp") {
          const stateData = stAbbrev ? EXPLORER_STATES[stAbbrev] : null;
          const r = stateData ? Math.sqrt(stateData.gdp / maxValues.maxGdp) : 0.5;
          return { fill: `hsla(38,90%,50%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "population") {
          const basePop = stAbbrev ? EXPLORER_STATES[stAbbrev]?.population ?? 5000000 : 5000000;
          const pop = localAcs?.totalPopulation ?? Math.max(10000, Math.abs(hash % 2500000));
          const r = Math.min(Math.max(Math.sqrt(pop / 5000000), 0.08), 1);
          return { fill: `hsla(210,80%,52%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "education") {
          const baseEdu = stAbbrev ? STATE_DEMOGRAPHIC_BENCHMARKS[stAbbrev]?.eduPct ?? 32 : 32;
          const edu = localAcs?.bachelorOrHigherPct ?? Math.min(Math.max(15, baseEdu + fipsVar * 15), 65);
          const r = Math.min(Math.max((edu - 18) / 32, 0), 1);
          return { fill: `hsla(190,85%,48%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "veterans") {
          const baseVet = stAbbrev ? STATE_DEMOGRAPHIC_BENCHMARKS[stAbbrev]?.vetPct ?? 8 : 8;
          const vet = localAcs?.veteranPct ?? Math.min(Math.max(3, baseVet + fipsVar * 6), 18);
          const r = Math.min(Math.max((vet - 4) / 10, 0), 1);
          return { fill: `hsla(48,90%,48%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "broadband") {
          const baseBb = stAbbrev ? STATE_DEMOGRAPHIC_BENCHMARKS[stAbbrev]?.broadbandPct ?? 88 : 88;
          const bb = localAcs?.broadbandPct ?? Math.min(Math.max(75, baseBb + fipsVar * 8), 98);
          const r = Math.min(Math.max((bb - 78) / 18, 0), 1);
          return { fill: `hsla(200,90%,48%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "ownerPct") {
          const baseOwn = stAbbrev ? STATE_DEMOGRAPHIC_BENCHMARKS[stAbbrev]?.ownerPct ?? 65 : 65;
          const own = localAcs?.ownerOccupiedPct ?? Math.min(Math.max(35, baseOwn + fipsVar * 18), 88);
          const r = Math.min(Math.max((own - 40) / 42, 0), 1);
          return { fill: `hsla(32,90%,48%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "poverty") {
          const basePov = stAbbrev ? STATE_DEMOGRAPHIC_BENCHMARKS[stAbbrev]?.povertyPct ?? 12 : 12;
          const pov = localAcs?.povertyPct ?? Math.min(Math.max(5, basePov + fipsVar * 10), 30);
          const r = Math.min(Math.max((pov - 6) / 18, 0), 1);
          return { fill: `hsla(350,85%,48%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "commute") {
          const baseCom = stAbbrev ? STATE_DEMOGRAPHIC_BENCHMARKS[stAbbrev]?.commuteMins ?? 25 : 25;
          const com = localAcs?.meanCommuteMinutes ?? Math.min(Math.max(14, baseCom + fipsVar * 12), 45);
          const r = Math.min(Math.max((com - 16) / 22, 0), 1);
          return { fill: `hsla(280,80%,50%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "medianAge") {
          const age = localAcs?.medianAge ?? Math.min(Math.max(28, 38 + fipsVar * 8), 48);
          const r = Math.min(Math.max((age - 30) / 16, 0), 1);
          return { fill: `hsla(260,85%,55%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "medianRent") {
          const rent = localAcs?.medianRent ?? Math.max(700, Math.round(1350 * (1 + fipsVar * 0.4)));
          const r = Math.min(Math.max((rent - 750) / 1400, 0), 1);
          return { fill: `hsla(18,92%,50%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "workFromHome") {
          const wfh = localAcs?.workFromHomePct ?? Math.min(Math.max(5, 15 + fipsVar * 12), 35);
          const r = Math.min(Math.max((wfh - 6) / 24, 0), 1);
          return { fill: `hsla(170,85%,46%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "noVehicle") {
          const noveh = localAcs?.noVehiclePct ?? Math.min(Math.max(2, 7 + fipsVar * 15), 45);
          const r = Math.min(Math.max((noveh - 3) / 30, 0), 1);
          return { fill: `hsla(330,85%,50%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "foreignBorn") {
          const fb = localAcs?.foreignBornPct ?? Math.min(Math.max(3, 14 + fipsVar * 18), 45);
          const r = Math.min(Math.max((fb - 4) / 32, 0), 1);
          return { fill: `hsla(220,90%,55%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "snapPct") {
          const snap = localAcs?.snapPct ?? Math.min(Math.max(4, 12 + fipsVar * 10), 28);
          const r = Math.min(Math.max((snap - 5) / 20, 0), 1);
          return { fill: `hsla(12,85%,48%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "unemployment") {
          const val = localAcs?.unemploymentPct ?? Math.min(Math.max(2, 4.5 + fipsVar * 5), 12);
          const r = Math.min(Math.max((val - 2) / 9, 0), 1);
          return { fill: `hsla(0,88%,50%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "insured") {
          const val = localAcs?.insuredPct ?? Math.min(Math.max(80, 91 + fipsVar * 8), 98);
          const r = Math.min(Math.max((val - 80) / 18, 0), 1);
          return { fill: `hsla(145,85%,48%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "highSchool") {
          const val = localAcs?.highSchoolPct ?? Math.min(Math.max(75, 89 + fipsVar * 8), 97);
          const r = Math.min(Math.max((val - 75) / 22, 0), 1);
          return { fill: `hsla(205,90%,52%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "gradDegree") {
          const val = localAcs?.gradDegreePct ?? Math.min(Math.max(5, 12 + fipsVar * 14), 35);
          const r = Math.min(Math.max((val - 5) / 30, 0), 1);
          return { fill: `hsla(265,82%,56%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "multiVehicle") {
          const val = localAcs?.multiVehiclePct ?? Math.min(Math.max(20, 60 + fipsVar * 18), 80);
          const r = Math.min(Math.max((val - 20) / 55, 0), 1);
          return { fill: `hsla(40,90%,52%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "vacancy") {
          const val = localAcs?.vacancyPct ?? Math.min(Math.max(4, 10 + fipsVar * 8), 22);
          const r = Math.min(Math.max((val - 4) / 18, 0), 1);
          return { fill: `hsla(215,60%,62%,${(0.22 + r * 0.58).toFixed(2)})`, stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 0.35, outline: "none" };
        }
        if (heatmapMode === "timeZone") {
          // Continuous gradient by standard-time UTC offset, sunrise-gold (east,
          // UTC-5) through dusk-purple (west, Hawaii UTC-10) — a smooth hue ramp
          // rather than flat per-zone colors, since the true zone boundary
          // wiggles county by county and a hard color edge would overstate how
          // precisely this state-level approximation actually tracks it.
          const offset = stAbbrev ? STATE_UTC_OFFSET[stAbbrev] : undefined;
          if (offset === undefined) {
            return { fill: "rgba(255, 255, 255, 0.06)", stroke: "rgba(255, 255, 255, 0.2)", strokeWidth: 0.35, outline: "none" };
          }
          const t = Math.min(Math.max((-5 - offset) / 5, 0), 1); // 0 = UTC-5 (east), 1 = UTC-10 (Hawaii)
          const hue = 45 + t * 215; // 45° gold → 260° violet
          return { fill: `hsla(${hue.toFixed(0)},70%,55%,0.62)`, stroke: "rgba(255, 255, 255, 0.3)", strokeWidth: 0.35, outline: "none" };
        }

        return {
          fill: "rgba(255, 255, 255, 0.08)",
          stroke: "rgba(255, 255, 255, 0.30)",
          strokeWidth: 0.35,
          outline: "none",
          transition: "fill 0.15s ease",
        };
      }

      // ── 2025 States Main Map Layer (Heatmaps & Region Colors) ──
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

      let fill: string;
      let stroke: string;

      if (state.statehoodYear > historicalYearFilter) {
        fill = "#0c0c12";
        stroke = "rgba(255,255,255,0.06)";
      } else if (!isMatch) {
        fill = "#111111";
        stroke = "rgba(255,255,255,0.12)";
      } else if (heatmapMode === "election2024") {
        const res = ELECTION_2024_STATES[abbrev];
        fill = getElectionColor(res, isHovered);
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "election2020") {
        const res = ELECTION_2020_STATES[abbrev];
        fill = getElectionColor(res, isHovered);
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "none") {
        const rc = REGION_COLORS[state.region];
        fill = isHovered ? rc.hover : rc.base;
        stroke = isStateSelected || isHovered ? "#fbbf24" : rc.stroke;
      } else if (heatmapMode === "gdp") {
        const r = Math.sqrt(state.gdp / maxValues.maxGdp);
        fill = isHovered
          ? `hsla(38,95%,62%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(38,90%,50%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "population") {
        const r = Math.sqrt(state.population / maxValues.maxPop);
        fill = isHovered
          ? `hsla(210,85%,62%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(210,80%,52%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "income") {
        const inc = STATE_DEMOGRAPHIC_BENCHMARKS[abbrev]?.income ?? 70000;
        const r = Math.min(Math.max((inc - 50000) / 47000, 0), 1);
        fill = isHovered
          ? `hsla(145,85%,58%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(145,78%,45%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "homeValue") {
        const hv = STATE_DEMOGRAPHIC_BENCHMARKS[abbrev]?.homeValue ?? 350000;
        const r = Math.min(Math.max((hv - 170000) / 680000, 0), 1);
        fill = isHovered
          ? `hsla(28,95%,60%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(28,90%,48%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "education") {
        const edu = STATE_DEMOGRAPHIC_BENCHMARKS[abbrev]?.eduPct ?? 32;
        const r = Math.min(Math.max((edu - 21) / 24, 0), 1);
        fill = isHovered
          ? `hsla(190,90%,60%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(190,85%,48%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "veterans") {
        const vet = STATE_DEMOGRAPHIC_BENCHMARKS[abbrev]?.vetPct ?? 8;
        const r = Math.min(Math.max((vet - 4) / 8.5, 0), 1);
        fill = isHovered
          ? `hsla(48,95%,60%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(48,90%,48%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "broadband") {
        const bb = STATE_DEMOGRAPHIC_BENCHMARKS[abbrev]?.broadbandPct ?? 88;
        const r = Math.min(Math.max((bb - 80) / 14, 0), 1);
        fill = isHovered
          ? `hsla(200,95%,60%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(200,90%,48%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "ownerPct") {
        const own = STATE_DEMOGRAPHIC_BENCHMARKS[abbrev]?.ownerPct ?? 65;
        const r = Math.min(Math.max((own - 52) / 22, 0), 1);
        fill = isHovered
          ? `hsla(32,95%,60%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(32,90%,48%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "poverty") {
        const pov = STATE_DEMOGRAPHIC_BENCHMARKS[abbrev]?.povertyPct ?? 12;
        const r = Math.min(Math.max((pov - 7) / 13, 0), 1);
        fill = isHovered
          ? `hsla(350,90%,60%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(350,85%,48%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "commute") {
        const com = STATE_DEMOGRAPHIC_BENCHMARKS[abbrev]?.commuteMins ?? 25;
        const r = Math.min(Math.max((com - 17) / 17, 0), 1);
        fill = isHovered
          ? `hsla(280,85%,62%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(280,80%,50%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "amendments") {
        const amend = STATE_EXTENDED_DATA[abbrev]?.constitution.amendmentsCount ?? 0;
        const r = maxValues.maxAmend > 0 ? Math.sqrt(amend / maxValues.maxAmend) : 0;
        fill = isHovered
          ? `hsla(265,80%,68%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(265,72%,56%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "conLength") {
        const words = STATE_EXTENDED_DATA[abbrev]?.constitution.wordCount ?? 0;
        const r = maxValues.maxWords > 0 ? Math.sqrt(words / maxValues.maxWords) : 0;
        fill = isHovered
          ? `hsla(165,75%,58%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(165,68%,44%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "unemployment") {
        const localState = LOCAL_CENSUS_ACS_DATABASE[abbrev];
        const val = localState?.unemploymentPct ?? 4.5;
        const r = Math.min(Math.max((val - 2) / 8, 0), 1);
        fill = isHovered
          ? `hsla(0,90%,58%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(0,88%,50%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "insured") {
        const localState = LOCAL_CENSUS_ACS_DATABASE[abbrev];
        const val = localState?.insuredPct ?? 91.5;
        const r = Math.min(Math.max((val - 80) / 18, 0), 1);
        fill = isHovered
          ? `hsla(145,88%,58%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(145,85%,48%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "highSchool") {
        const localState = LOCAL_CENSUS_ACS_DATABASE[abbrev];
        const val = localState?.highSchoolPct ?? 89.0;
        const r = Math.min(Math.max((val - 75) / 22, 0), 1);
        fill = isHovered
          ? `hsla(205,92%,60%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(205,90%,52%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "gradDegree") {
        const localState = LOCAL_CENSUS_ACS_DATABASE[abbrev];
        const val = localState?.gradDegreePct ?? 12.5;
        const r = Math.min(Math.max((val - 5) / 28, 0), 1);
        fill = isHovered
          ? `hsla(265,85%,68%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(265,82%,56%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "multiVehicle") {
        const localState = LOCAL_CENSUS_ACS_DATABASE[abbrev];
        const val = localState?.multiVehiclePct ?? 63.0;
        const r = Math.min(Math.max((val - 20) / 55, 0), 1);
        fill = isHovered
          ? `hsla(40,92%,60%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(40,90%,52%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "vacancy") {
        const localState = LOCAL_CENSUS_ACS_DATABASE[abbrev];
        const val = localState?.vacancyPct ?? 10.5;
        const r = Math.min(Math.max((val - 4) / 18, 0), 1);
        fill = isHovered
          ? `hsla(215,65%,68%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(215,60%,62%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      } else if (heatmapMode === "timeZone") {
        const offset = STATE_UTC_OFFSET[abbrev];
        if (offset === undefined) {
          fill = "rgba(255,255,255,0.08)";
          stroke = "rgba(255,255,255,0.30)";
        } else {
          const t = Math.min(Math.max((-5 - offset) / 5, 0), 1);
          const hue = 45 + t * 215;
          fill = isHovered ? `hsla(${hue.toFixed(0)},75%,62%,0.78)` : `hsla(${hue.toFixed(0)},70%,55%,0.62)`;
          stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
        }
      } else {
        const r = (51 - state.statehoodOrder) / 50;
        fill = isHovered
          ? `hsla(355,82%,58%,${(0.35 + r * 0.55).toFixed(2)})`
          : `hsla(355,76%,46%,${(0.22 + r * 0.58).toFixed(2)})`;
        stroke = isStateSelected || isHovered ? "#fbbf24" : "rgba(255,255,255,0.30)";
      }

      return {
        fill,
        stroke,
        strokeWidth: isStateSelected ? 2.2 : isHovered ? 1.4 : 0.85,
        outline: "none",
        transition: "all 0.15s ease",
      };
    },
    [activeCensusLayerId, selectedStateAbbrev, selectedFeature, hoveredStateAbbrev, selectedRegion, locale, searchQuery, heatmapMode, maxValues, historicalYearFilter]
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

          {/* ── CONTROLS TOOLBAR (2 CLEAN ROWS) ── */}
          <div className="space-y-4 pb-6 border-b border-white/[0.08] mb-4">
            
            {/* ROW 1: Layer Selector, Compare, Print, & BIG SEARCH BAR */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {/* Census Boundary Layer Selector Button */}
                <button
                  onClick={() => setIsLayerModalOpen(true)}
                  className="flex items-center gap-3 rounded-2xl border border-[#fbbf24]/50 bg-[#fbbf24]/10 px-4 py-2 text-xs font-bold text-[#fbbf24] hover:bg-[#fbbf24]/20 hover:border-[#fbbf24] transition-all shadow-lg cursor-pointer text-left"
                >
                  <Globe className="h-4.5 w-4.5 text-[#fbbf24] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-white text-xs leading-none truncate max-w-[180px]">{activeCensusLayer.name[locale]}</span>
                    <span className="font-mono text-[9px] font-extrabold text-[#fbbf24] uppercase tracking-wider mt-0.5">{activeCensusLayer.badge}</span>
                  </div>
                  <Layers className="h-3.5 w-3.5 text-[#fbbf24]/70 shrink-0 ml-1" />
                </button>

                {/* ⚔️ State Duel Comparison Button */}
                <button
                  onClick={() => setIsComparisonModalOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2.5 text-xs font-bold text-blue-400 hover:bg-blue-500/20 hover:border-blue-400 transition-all shadow-lg cursor-pointer"
                >
                  <Swords className="h-4 w-4 text-blue-400" />
                  <span>Compare States</span>
                </button>

                {/* 🖨️ State Factsheet Generator Button */}
                <button
                  onClick={() => setIsFactsheetModalOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all shadow-lg cursor-pointer"
                >
                  <Printer className="h-4 w-4 text-emerald-400" />
                  <span>Print Factsheet</span>
                </button>
              </div>

              {/* 🔍 PROMINENT BIGGER SEARCH BAR */}
              <div className="relative w-full sm:w-auto flex-1 max-w-md min-w-[280px]">
                <Search className="absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-[#fbbf24]" />
                <input
                  type="text"
                  placeholder={translations.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-2 border-[#fbbf24]/40 bg-black/60 py-2.5 pl-11 pr-4 text-sm text-white font-medium placeholder-white/40 focus:border-[#fbbf24] focus:bg-black/90 focus:outline-none transition-all shadow-xl"
                />
              </div>
            </div>

            {/* ROW 2: Overlay Toggles (Parks, Interstates, Amtrak) & Region Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/5">
              {/* Feature Toggles */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowInterstates((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showInterstates ? "bg-amber-500/20 text-amber-300 border border-amber-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Route className="w-3.5 h-3.5 text-amber-400" />
                  <span>INTERSTATES ({showInterstates ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowAmtrakRail((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showAmtrakRail ? "bg-sky-500/20 text-sky-300 border border-sky-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <TrainTrack className="w-3.5 h-3.5 text-sky-400" />
                  <span>AMTRAK RAIL ({showAmtrakRail ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowHospitals((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showHospitals ? "bg-rose-500/20 text-rose-300 border border-rose-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Hospital className="w-3.5 h-3.5 text-rose-400" />
                  <span>HOSPITALS ({showHospitals ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowSchools((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showSchools ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <School className="w-3.5 h-3.5 text-indigo-400" />
                  <span>PUBLIC SCHOOLS ({showSchools ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowVolcanoes((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showVolcanoes ? "bg-orange-500/20 text-orange-300 border border-orange-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Mountain className="w-3.5 h-3.5 text-orange-400" />
                  <span>VOLCANOES ({showVolcanoes ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowAmtrakStations((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showAmtrakStations ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <TrainFront className="w-3.5 h-3.5 text-cyan-400" />
                  <span>RAIL STATIONS ({showAmtrakStations ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowTransmissionLines((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showTransmissionLines ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>POWER GRID ({showTransmissionLines ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowTrails((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showTrails ? "bg-lime-500/20 text-lime-300 border border-lime-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Footprints className="w-3.5 h-3.5 text-lime-400" />
                  <span>TRAILS ({showTrails ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowParkBoundaries((prev) => !prev)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showParkBoundaries ? "bg-teal-500/20 text-teal-300 border border-teal-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-teal-400" />
                  <span>PARK BOUNDARIES ({showParkBoundaries ? "ON" : "OFF"})</span>
                </button>

                <button
                  onClick={() => setShowFederalLands((prev) => !prev)}
                  title={locale === "ro" ? "Randat cu accelerare GPU (WebGL)" : "Rendered with GPU acceleration (WebGL)"}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                    showFederalLands ? "bg-amber-500/20 text-amber-300 border border-amber-500/50" : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Flag className="w-3.5 h-3.5 text-amber-400" />
                  <span>FEDERAL LANDS ({showFederalLands ? "ON" : "OFF"})</span>
                  <Cpu className="w-3 h-3 text-fuchsia-400" />
                </button>
              </div>

              {/* Region Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {regionButtons.map((reg) => {
                  const isActive = selectedRegion === reg.id;
                  return (
                    <button
                      key={reg.id}
                      onClick={() => setSelectedRegion(reg.id)}
                      className="rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer"
                      style={{
                        background: isActive ? `${reg.color}20` : "transparent",
                        border: `1px solid ${isActive ? reg.color : "rgba(255,255,255,0.08)"}`,
                        color: isActive ? reg.color : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {reg.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── MAP CONTAINER ──
              Mobile: a flex column (controls → map → legend) so nothing overlaps.
              `sm` and up: a positioning context for the floating overlays. */}
          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.05] bg-black shadow-2xl sm:block">

            {/* Heatmap overlay selector: stacked above the map on mobile so it
                never covers the geography; floats over the map from `sm` up. */}
            <div className="relative z-20 m-3 flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-black/80 p-3 backdrop-blur-md max-w-none sm:absolute sm:top-4 sm:left-4 sm:m-0 sm:max-w-[280px]">
              <span className="font-body text-[10px] tracking-[0.18em] text-white/35 uppercase flex items-center gap-1.5 font-bold">
                <Layers className="h-3 w-3 text-[#fbbf24]" />
                {translations.heatmapMode}
              </span>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {[
                  { id: "none",       label: translations.defaultColor,   activeColor: "#fbbf24", layers: ["all"] },
                  { id: "gdp",        label: translations.gdpHeat,        activeColor: "#fbbf24", layers: ["states"] },
                  { id: "population", label: translations.popHeat,        activeColor: "#60a5fa", layers: ["states", "counties", "cbsa", "csa", "places", "metro_divisions"] },
                  { id: "income",     label: "Income",                    activeColor: "#34d399", layers: ["states", "counties", "cbsa", "csa", "places", "metro_divisions", "congressional_districts"] },
                  { id: "homeValue",  label: "Home Value",                activeColor: "#fb923c", layers: ["states", "counties", "cbsa", "csa", "places", "metro_divisions"] },
                  { id: "education",  label: "Education",                 activeColor: "#38bdf8", layers: ["states", "counties", "cbsa", "csa", "places", "metro_divisions", "congressional_districts"] },
                  { id: "veterans",   label: "Veterans",                  activeColor: "#facc15", layers: ["states", "counties"] },
                  { id: "broadband",  label: "Broadband",                 activeColor: "#38bdf8", layers: ["states", "counties", "cbsa", "csa", "places", "metro_divisions"] },
                  { id: "ownerPct",   label: "Homeowners",                activeColor: "#f59e0b", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "poverty",    label: "Poverty",                   activeColor: "#f43f5e", layers: ["states", "counties", "cbsa", "csa", "places", "metro_divisions", "congressional_districts"] },
                  { id: "commute",    label: "Commute",                   activeColor: "#a855f7", layers: ["states", "counties", "cbsa", "csa", "places", "metro_divisions"] },
                  { id: "medianAge",  label: "Median Age",                activeColor: "#a855f7", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "medianRent", label: "Median Rent",               activeColor: "#f97316", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "workFromHome", label: "Remote Work",             activeColor: "#14b8a6", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "noVehicle", label: "No Transit/Car",            activeColor: "#ec4899", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "foreignBorn", label: "Foreign Born",            activeColor: "#3b82f6", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "snapPct",      label: "SNAP/Assistance",          activeColor: "#ef4444", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "unemployment", label: "Unemployment",              activeColor: "#f87171", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "insured",      label: "Health Insured",            activeColor: "#34d399", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "highSchool",   label: "High School Grad",          activeColor: "#60a5fa", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "gradDegree",   label: "Graduate Degree",           activeColor: "#a78bfa", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "multiVehicle", label: "Multi-Vehicle HH",          activeColor: "#fbbf24", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "vacancy",      label: "Housing Vacancy",           activeColor: "#94a3b8", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "timeZone",     label: "Time Zone",                 activeColor: "#c084fc", layers: ["states", "counties", "cbsa", "csa", "places"] },
                  { id: "election2024", label: "2024 Vote",               activeColor: "#ef4444", layers: ["states"] },
                  { id: "election2020", label: "2020 Vote",               activeColor: "#3b82f6", layers: ["states"] },
                  { id: "statehood",  label: translations.statehoodHeat,  activeColor: "#f87171", layers: ["states"] },
                  { id: "amendments", label: translations.amendHeat,      activeColor: "#a78bfa", layers: ["states"] },
                  { id: "conLength",  label: translations.lengthHeat,     activeColor: "#2dd4bf", layers: ["states"] },
                ].filter(mode => mode.layers.includes("all") || mode.layers.includes(activeCensusLayerId) || activeCensusLayerId === "states").map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setHeatmapMode(mode.id as any)}
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide transition-all font-body cursor-pointer hover:opacity-90"
                    style={{
                      background: heatmapMode === mode.id ? mode.activeColor : "rgba(255,255,255,0.05)",
                      color: heatmapMode === mode.id ? "#000" : "rgba(255,255,255,0.6)",
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
                          : heatmapMode === "income"
                          ? "linear-gradient(to right, hsla(145,78%,45%,0.22), hsl(145,85%,58%))"
                          : heatmapMode === "homeValue"
                          ? "linear-gradient(to right, hsla(28,90%,48%,0.22), hsl(28,95%,60%))"
                          : heatmapMode === "education"
                          ? "linear-gradient(to right, hsla(190,85%,48%,0.22), hsl(190,90%,60%))"
                          : heatmapMode === "veterans"
                          ? "linear-gradient(to right, hsla(48,90%,48%,0.22), hsl(48,95%,60%))"
                          : heatmapMode === "broadband"
                          ? "linear-gradient(to right, hsla(200,90%,48%,0.22), hsl(200,95%,60%))"
                          : heatmapMode === "ownerPct"
                          ? "linear-gradient(to right, hsla(32,90%,48%,0.22), hsl(32,95%,60%))"
                          : heatmapMode === "poverty"
                          ? "linear-gradient(to right, hsla(350,85%,48%,0.22), hsl(350,90%,60%))"
                          : heatmapMode === "commute"
                          ? "linear-gradient(to right, hsla(280,80%,50%,0.22), hsl(280,85%,62%))"
                          : heatmapMode === "medianAge"
                          ? "linear-gradient(to right, hsla(260,85%,55%,0.22), hsl(260,88%,68%))"
                          : heatmapMode === "medianRent"
                          ? "linear-gradient(to right, hsla(18,92%,50%,0.22), hsl(18,95%,62%))"
                          : heatmapMode === "workFromHome"
                          ? "linear-gradient(to right, hsla(170,85%,46%,0.22), hsl(170,88%,58%))"
                          : heatmapMode === "noVehicle"
                          ? "linear-gradient(to right, hsla(330,85%,50%,0.22), hsl(330,88%,62%))"
                          : heatmapMode === "foreignBorn"
                          ? "linear-gradient(to right, hsla(220,90%,55%,0.22), hsl(220,92%,65%))"
                          : heatmapMode === "snapPct"
                          ? "linear-gradient(to right, hsla(12,85%,48%,0.22), hsl(12,88%,60%))"
                          : heatmapMode === "unemployment"
                          ? "linear-gradient(to right, hsla(0,88%,50%,0.22), hsl(0,90%,62%))"
                          : heatmapMode === "insured"
                          ? "linear-gradient(to right, hsla(145,85%,48%,0.22), hsl(145,88%,60%))"
                          : heatmapMode === "highSchool"
                          ? "linear-gradient(to right, hsla(205,90%,52%,0.22), hsl(205,92%,65%))"
                          : heatmapMode === "gradDegree"
                          ? "linear-gradient(to right, hsla(265,82%,56%,0.22), hsl(265,85%,68%))"
                          : heatmapMode === "multiVehicle"
                          ? "linear-gradient(to right, hsla(40,90%,52%,0.22), hsl(40,92%,62%))"
                          : heatmapMode === "vacancy"
                          ? "linear-gradient(to right, hsla(215,60%,62%,0.22), hsl(215,65%,72%))"
                          : heatmapMode === "timeZone"
                          ? "linear-gradient(to right, hsl(45,70%,55%), hsl(260,70%,55%))"
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
                    {heatmapMode === "income" && (
                      <>
                        <span>Min ($45k · MS)</span>
                        <span className="text-right">Max ($96k+ · NJ)</span>
                      </>
                    )}
                    {heatmapMode === "homeValue" && (
                      <>
                        <span>Min ($155k · WV)</span>
                        <span className="text-right">Max ($845k+ · HI)</span>
                      </>
                    )}
                    {heatmapMode === "education" && (
                      <>
                        <span>Min (21.8% · WV)</span>
                        <span className="text-right">Max (45.2% · MA)</span>
                      </>
                    )}
                    {heatmapMode === "veterans" && (
                      <>
                        <span>Min (4.2% · NJ)</span>
                        <span className="text-right">Max (12.4% · AK)</span>
                      </>
                    )}
                    {heatmapMode === "broadband" && (
                      <>
                        <span>Min (81.2% · MS)</span>
                        <span className="text-right">Max (93.8% · UT)</span>
                      </>
                    )}
                    {heatmapMode === "ownerPct" && (
                      <>
                        <span>Min (53.9% · NY)</span>
                        <span className="text-right">Max (73.8% · WV)</span>
                      </>
                    )}
                    {heatmapMode === "poverty" && (
                      <>
                        <span>Min (7.2% · NH)</span>
                        <span className="text-right">Max (19.1% · MS)</span>
                      </>
                    )}
                    {heatmapMode === "commute" && (
                      <>
                        <span>Min (17.2% · SD)</span>
                        <span className="text-right">Max (33.5 min · NY)</span>
                      </>
                    )}
                    {heatmapMode === "medianAge" && (
                      <>
                        <span>Min (33.8 yrs · UT)</span>
                        <span className="text-right">Max (44.7 yrs · ME)</span>
                      </>
                    )}
                    {heatmapMode === "medianRent" && (
                      <>
                        <span>Min ($880/mo · AR)</span>
                        <span className="text-right">Max ($2,250+/mo · CA)</span>
                      </>
                    )}
                    {heatmapMode === "workFromHome" && (
                      <>
                        <span>Min (6.9% · AR)</span>
                        <span className="text-right">Max (28.5% · DC)</span>
                      </>
                    )}
                    {heatmapMode === "noVehicle" && (
                      <>
                        <span>Min (4.5% · WY)</span>
                        <span className="text-right">Max (35.8% · DC)</span>
                      </>
                    )}
                    {heatmapMode === "foreignBorn" && (
                      <>
                        <span>Min (1.8% · WV)</span>
                        <span className="text-right">Max (26.8% · CA)</span>
                      </>
                    )}
                    {heatmapMode === "snapPct" && (
                      <>
                        <span>Min (7.2% · UT)</span>
                        <span className="text-right">Max (22.8% · NM)</span>
                      </>
                    )}
                    {heatmapMode === "unemployment" && (
                      <>
                        <span>Min (2.4% · ND)</span>
                        <span className="text-right">Max (6.8% · MS)</span>
                      </>
                    )}
                    {heatmapMode === "insured" && (
                      <>
                        <span>Min (83.5% · TX)</span>
                        <span className="text-right">Max (97.5% · MA)</span>
                      </>
                    )}
                    {heatmapMode === "highSchool" && (
                      <>
                        <span>Min (82.5% · TX)</span>
                        <span className="text-right">Max (92.8% · MN)</span>
                      </>
                    )}
                    {heatmapMode === "gradDegree" && (
                      <>
                        <span>Min (9.2% · MS)</span>
                        <span className="text-right">Max (32.5% · DC)</span>
                      </>
                    )}
                    {heatmapMode === "multiVehicle" && (
                      <>
                        <span>Min (22.5% · DC)</span>
                        <span className="text-right">Max (71.5% · UT)</span>
                      </>
                    )}
                    {heatmapMode === "vacancy" && (
                      <>
                        <span>Min (7.5% · UT)</span>
                        <span className="text-right">Max (19.5% · VT)</span>
                      </>
                    )}
                    {heatmapMode === "timeZone" && (
                      <>
                        <span>Eastern (UTC−5)</span>
                        <span className="text-right">Hawaii (UTC−10)</span>
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
                    {heatmapMode === "income" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(145,78%,45%,0.28)]" /><span>&lt; $55k (e.g., MS, WV, AR)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(145,78%,45%,0.55)]" /><span>$55k – $80k (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(145,85%,58%,0.85)]" /><span>&gt; $90k (e.g., MD, MA, NJ, HI)</span></div>
                      </div>
                    )}
                    {heatmapMode === "homeValue" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(28,90%,48%,0.28)]" /><span>&lt; $220k (e.g., WV, MS, AR)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(28,90%,48%,0.55)]" /><span>$220k – $450k (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(28,95%,60%,0.85)]" /><span>&gt; $550k (e.g., CA, HI, WA, MA)</span></div>
                      </div>
                    )}
                    {heatmapMode === "education" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(190,85%,48%,0.28)]" /><span>&lt; 25% (e.g., WV, MS, AR)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(190,85%,48%,0.55)]" /><span>25% – 38% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(190,90%,60%,0.85)]" /><span>&gt; 40% (e.g., MA, CO, DC)</span></div>
                      </div>
                    )}
                    {heatmapMode === "veterans" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(48,90%,48%,0.28)]" /><span>&lt; 5% (e.g., CA, NY, NJ)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(48,90%,48%,0.55)]" /><span>5% – 9% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(48,95%,60%,0.85)]" /><span>&gt; 10% (e.g., AK, MT, WY, ME)</span></div>
                      </div>
                    )}
                    {heatmapMode === "broadband" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(200,90%,48%,0.28)]" /><span>&lt; 83% (e.g., MS, AR, WV)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(200,90%,48%,0.55)]" /><span>83% – 91% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(200,95%,60%,0.85)]" /><span>&gt; 92% (e.g., UT, WA, CO)</span></div>
                      </div>
                    )}
                    {heatmapMode === "ownerPct" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(32,90%,48%,0.28)]" /><span>&lt; 58% (e.g., NY, CA, NV)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(32,90%,48%,0.55)]" /><span>58% – 68% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(32,95%,60%,0.85)]" /><span>&gt; 70% (e.g., WV, ME, UT)</span></div>
                      </div>
                    )}
                    {heatmapMode === "poverty" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(350,85%,48%,0.28)]" /><span>&lt; 8% (e.g., NH, MD, UT)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(350,85%,48%,0.55)]" /><span>8% – 14% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(350,90%,60%,0.85)]" /><span>&gt; 16% (e.g., MS, LA, AR)</span></div>
                      </div>
                    )}
                    {heatmapMode === "commute" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(280,80%,50%,0.28)]" /><span>&lt; 20 min (e.g., SD, ND, WY)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(280,80%,50%,0.55)]" /><span>20 – 28 min (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(280,85%,62%,0.85)]" /><span>&gt; 30 min (e.g., NY, MD, NJ)</span></div>
                      </div>
                    )}
                    {heatmapMode === "medianAge" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(260,85%,55%,0.28)]" /><span>&lt; 33 yrs (e.g., UT, AK, TX)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(260,85%,55%,0.55)]" /><span>33 – 40 yrs (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(260,88%,68%,0.85)]" /><span>&gt; 43 yrs (e.g., ME, FL, WV)</span></div>
                      </div>
                    )}
                    {heatmapMode === "medianRent" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(18,92%,50%,0.28)]" /><span>&lt; $900/mo (e.g., AR, MS, WV)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(18,92%,50%,0.55)]" /><span>$900 – $1,500/mo (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(18,95%,62%,0.85)]" /><span>&gt; $1,800/mo (e.g., CA, HI, NY)</span></div>
                      </div>
                    )}
                    {heatmapMode === "workFromHome" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(170,85%,46%,0.28)]" /><span>&lt; 8% (e.g., AR, KY, LA)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(170,85%,46%,0.55)]" /><span>8% – 18% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(170,88%,58%,0.85)]" /><span>&gt; 22% (e.g., CO, WA, DC)</span></div>
                      </div>
                    )}
                    {heatmapMode === "noVehicle" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(330,85%,50%,0.28)]" /><span>&lt; 4% (e.g., WY, ID, MT)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(330,85%,50%,0.55)]" /><span>4% – 10% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(330,88%,62%,0.85)]" /><span>&gt; 20% (e.g., NY, DC, PA)</span></div>
                      </div>
                    )}
                    {heatmapMode === "foreignBorn" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(220,90%,55%,0.28)]" /><span>&lt; 4% (e.g., WV, MS, ME)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(220,90%,55%,0.55)]" /><span>4% – 15% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(220,92%,65%,0.85)]" /><span>&gt; 22% (e.g., CA, NY, NJ, HI)</span></div>
                      </div>
                    )}
                    {heatmapMode === "snapPct" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(12,85%,48%,0.28)]" /><span>&lt; 8% (e.g., UT, WY, CO)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(12,85%,48%,0.55)]" /><span>8% – 14% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(12,88%,60%,0.85)]" /><span>&gt; 17% (e.g., LA, MS, NM)</span></div>
                      </div>
                    )}
                    {heatmapMode === "unemployment" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(0,88%,50%,0.28)]" /><span>&lt; 3% (e.g., ND, NH, SD)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(0,88%,50%,0.55)]" /><span>3% – 5% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(0,90%,62%,0.85)]" /><span>&gt; 5.5% (e.g., MS, LA, NV)</span></div>
                      </div>
                    )}
                    {heatmapMode === "insured" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(145,85%,48%,0.28)]" /><span>&lt; 86% (e.g., TX, OK, FL)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(145,85%,48%,0.55)]" /><span>86% – 93% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(145,88%,60%,0.85)]" /><span>&gt; 95% (e.g., MA, VT, IA)</span></div>
                      </div>
                    )}
                    {heatmapMode === "highSchool" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(205,90%,52%,0.28)]" /><span>&lt; 84% (e.g., CA, TX, MS)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(205,90%,52%,0.55)]" /><span>84% – 91% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(205,92%,65%,0.85)]" /><span>&gt; 92% (e.g., MN, IA, VT)</span></div>
                      </div>
                    )}
                    {heatmapMode === "gradDegree" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(265,82%,56%,0.28)]" /><span>&lt; 10% (e.g., MS, AR, WV)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(265,82%,56%,0.55)]" /><span>10% – 16% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(265,85%,68%,0.85)]" /><span>&gt; 18% (e.g., MD, MA, DC)</span></div>
                      </div>
                    )}
                    {heatmapMode === "multiVehicle" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(40,90%,52%,0.28)]" /><span>&lt; 35% (e.g., DC, NY, HI)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(40,90%,52%,0.55)]" /><span>35% – 65% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(40,92%,62%,0.85)]" /><span>&gt; 68% (e.g., UT, WY, ID)</span></div>
                      </div>
                    )}
                    {heatmapMode === "vacancy" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(215,60%,62%,0.28)]" /><span>&lt; 7% (e.g., UT, NJ, NH)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(215,60%,62%,0.55)]" /><span>7% – 13% (most states)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[hsla(215,65%,72%,0.85)]" /><span>&gt; 17% (e.g., VT, ME, WV)</span></div>
                      </div>
                    )}
                    {heatmapMode === "timeZone" && (
                      <div className="space-y-1 text-[9px] font-body text-white/60">
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full" style={{ background: "hsl(45,70%,55%)" }} /><span>Eastern, UTC−5 (most of the East)</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full" style={{ background: "hsl(130,70%,55%)" }} /><span>Central / Mountain, UTC−6 / −7</span></div>
                        <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full" style={{ background: "hsl(260,70%,55%)" }} /><span>Pacific → Hawaii, UTC−8 to −10</span></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 📜 Historical Territorial Expansion Timeline Slider (1776 – 1959) */}
            <div className="relative z-20 m-3 flex flex-col gap-2 rounded-2xl border border-[#fbbf24]/40 bg-black/90 p-4 backdrop-blur-md max-w-none sm:absolute sm:top-4 sm:right-4 sm:m-0 sm:min-w-[390px] sm:max-w-[420px] shadow-2xl">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#fbbf24] font-bold">
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4 text-[#fbbf24]" />
                  STATEHOOD ERA TIMELINE
                </span>
                <span className="text-white bg-[#fbbf24]/20 border border-[#fbbf24]/40 px-2.5 py-0.5 rounded-lg font-mono font-bold text-sm">{historicalYearFilter}</span>
              </div>
              <input
                type="range"
                min={1776}
                max={1959}
                step={1}
                value={historicalYearFilter}
                onChange={(e) => setHistoricalYearFilter(Number(e.target.value))}
                className="w-full accent-[#fbbf24] cursor-pointer my-2 h-2"
              />
              <div className="grid grid-cols-3 font-mono text-[11px] text-white/70 font-semibold pt-1 text-center">
                <span className="text-left whitespace-nowrap">1776 (13 Orig.)</span>
                <span className="text-center whitespace-nowrap">1803 (LA Purch.)</span>
                <span className="text-right whitespace-nowrap">1959 (HI #50)</span>
              </div>
            </div>

            {/* Region color legend: sits under the map on mobile, overlays it from `sm` up */}
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
              {/* Hover tooltip for Census features or States */}
              {tooltipPos && (featureHoverInfo || (hoveredStateAbbrev && EXPLORER_STATES[hoveredStateAbbrev])) && (() => {
                if (featureHoverInfo) {
                  return (
                    <div
                      className="pointer-events-none absolute z-30 flex flex-col gap-1 rounded-xl border border-[#fbbf24]/40 bg-black/90 px-3.5 py-2.5 shadow-2xl backdrop-blur-md font-body text-xs text-white"
                      style={{
                        left: Math.min(tooltipPos.x + 16, 760),
                        top: Math.max(tooltipPos.y - 48, 12),
                      }}
                    >
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#fbbf24] font-bold">
                        {activeCensusLayer.name[locale]}
                      </span>
                      <span className="font-bold text-white text-sm">{featureHoverInfo.label}</span>
                      {featureHoverInfo.categoryMetric && (
                        <span className="font-bold text-[#fbbf24] text-xs mt-0.5">{featureHoverInfo.categoryMetric}</span>
                      )}
                      {featureHoverInfo.details && (
                        <span className="font-mono text-[10px] text-white/50">{featureHoverInfo.details}</span>
                      )}
                    </div>
                  );
                }

                const hs = EXPLORER_STATES[hoveredStateAbbrev!];
                const rc = REGION_COLORS[hs.region];
                const con = STATE_EXTENDED_DATA[hoveredStateAbbrev!]?.constitution;

                const demoBench = STATE_DEMOGRAPHIC_BENCHMARKS[hoveredStateAbbrev!];
                const el2024 = ELECTION_2024_STATES[hoveredStateAbbrev!];
                const el2020 = ELECTION_2020_STATES[hoveredStateAbbrev!];

                const metric: { label: string; value: string; rank: string; color: string } | null =
                  heatmapMode === "gdp"
                    ? { label: translations.gdp, value: `$${hs.gdp}B`, rank: `#${gdpRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#fbbf24" }
                    : heatmapMode === "population"
                    ? { label: translations.population, value: `${hs.population}M`, rank: `#${popRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#60a5fa" }
                    : heatmapMode === "income" && demoBench
                    ? { label: "Median Income", value: `$${demoBench.income.toLocaleString()}`, rank: "", color: "#34d399" }
                    : heatmapMode === "homeValue" && demoBench
                    ? { label: "Median Home Value", value: `$${demoBench.homeValue.toLocaleString()}`, rank: "", color: "#fb923c" }
                    : heatmapMode === "education" && demoBench
                    ? { label: "Higher Education", value: `${demoBench.eduPct}%`, rank: "", color: "#38bdf8" }
                    : heatmapMode === "veterans" && demoBench
                    ? { label: "Veteran Rate", value: `${demoBench.vetPct}%`, rank: "", color: "#facc15" }
                    : heatmapMode === "broadband" && demoBench
                    ? { label: "Broadband Internet", value: `${demoBench.broadbandPct}%`, rank: "", color: "#38bdf8" }
                    : heatmapMode === "ownerPct" && demoBench
                    ? { label: "Homeownership", value: `${demoBench.ownerPct}%`, rank: "", color: "#f59e0b" }
                    : heatmapMode === "poverty" && demoBench
                    ? { label: "Poverty Rate", value: `${demoBench.povertyPct}%`, rank: "", color: "#f43f5e" }
                    : heatmapMode === "commute" && demoBench
                    ? { label: "Mean Commute", value: `${demoBench.commuteMins} min`, rank: "", color: "#a855f7" }
                    : heatmapMode === "election2024" && el2024
                    ? { label: "2024 Result", value: `${el2024.winner === "GOP" ? "GOP (Trump)" : "DEM (Harris)"} +${Math.abs(el2024.marginPct)}%`, rank: `${el2024.electoralVotes} EV`, color: el2024.winner === "GOP" ? "#ef4444" : "#3b82f6" }
                    : heatmapMode === "election2020" && el2020
                    ? { label: "2020 Result", value: `${el2020.winner === "GOP" ? "GOP (Trump)" : "DEM (Biden)"} +${Math.abs(el2020.marginPct)}%`, rank: `${el2020.electoralVotes} EV`, color: el2020.winner === "GOP" ? "#ef4444" : "#3b82f6" }
                    : heatmapMode === "statehood"
                    ? { label: translations.statehood, value: `${hs.statehoodYear}`, rank: `#${hs.statehoodOrder} / 50`, color: "#f87171" }
                    : heatmapMode === "amendments" && con
                    ? { label: translations.amendmentsLabel, value: `${con.amendmentsCount}`, rank: `#${amendRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#a78bfa" }
                    : heatmapMode === "conLength" && con
                    ? { label: translations.lengthLabel, value: `${(con.wordCount / 1000).toFixed(1)}k`, rank: `#${wordRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#2dd4bf" }
                    : heatmapMode === "unemployment"
                    ? { label: "Unemployment Rate", value: `${LOCAL_CENSUS_ACS_DATABASE[hoveredStateAbbrev!]?.unemploymentPct ?? "—"}%`, rank: "", color: "#f87171" }
                    : heatmapMode === "insured"
                    ? { label: "Health Insured", value: `${LOCAL_CENSUS_ACS_DATABASE[hoveredStateAbbrev!]?.insuredPct ?? "—"}%`, rank: "", color: "#34d399" }
                    : heatmapMode === "highSchool"
                    ? { label: "HS Graduate Rate", value: `${LOCAL_CENSUS_ACS_DATABASE[hoveredStateAbbrev!]?.highSchoolPct ?? "—"}%`, rank: "", color: "#60a5fa" }
                    : heatmapMode === "gradDegree"
                    ? { label: "Graduate Degree", value: `${LOCAL_CENSUS_ACS_DATABASE[hoveredStateAbbrev!]?.gradDegreePct ?? "—"}%`, rank: "", color: "#a78bfa" }
                    : heatmapMode === "multiVehicle"
                    ? { label: "Multi-Vehicle HH", value: `${LOCAL_CENSUS_ACS_DATABASE[hoveredStateAbbrev!]?.multiVehiclePct ?? "—"}%`, rank: "", color: "#fbbf24" }
                    : heatmapMode === "vacancy"
                    ? { label: "Housing Vacancy", value: `${LOCAL_CENSUS_ACS_DATABASE[hoveredStateAbbrev!]?.vacancyPct ?? "—"}%`, rank: "", color: "#94a3b8" }
                    : heatmapMode === "timeZone"
                    ? { label: "Standard Time", value: STATE_UTC_OFFSET[hoveredStateAbbrev!] !== undefined ? `UTC${STATE_UTC_OFFSET[hoveredStateAbbrev!]}` : "—", rank: "", color: "#c084fc" }
                    : null;

                return (
                  <div
                    className="pointer-events-none absolute z-30 flex flex-col gap-1 rounded-2xl border bg-black/90 p-3 shadow-2xl backdrop-blur-md"
                    style={{
                      left: Math.min(tooltipPos.x + 16, 760),
                      top: Math.max(tooltipPos.y - 60, 12),
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
                        <span>{translations.gdp} <span className="text-white/80">${hs.gdp}B</span></span>
                        <span>{translations.population} <span className="text-white/80">{hs.population}M</span></span>
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
                onClick={(e: any) => {
                  const target = e.target as HTMLElement;
                  if (target && (target.tagName === "svg" || target.classList.contains("rsm-svg"))) {
                    setSelectedFeature(null);
                  }
                }}
              >
                <ZoomableGroup
                  zoom={zoomPosition.zoom}
                  center={zoomPosition.coordinates}
                  onMoveEnd={handleMoveEnd}
                >
                  <Geographies key={activeCensusLayer.id} geography={activeCensusLayer.url}>
                    {({ geographies }: { geographies: any[] }) => {
                      const baseGeos = geographies.map((geo) => {
                        const abbrev = getFeatureAbbrev(geo);
                        const props = geo.properties || {};
                        const featureId = geo.id || props.GEOID || geo.rsmKey;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() => {
                              if (activeCensusLayer.id === "states") {
                                if (abbrev !== "DC") setHoveredStateAbbrev(abbrev);
                              } else {
                                const name = props.NAMELSAD || props.NAME || props.GEOID || "Boundary Feature";
                                const stFips = props.STATEFP ? FIPS_TO_ABBREV[props.STATEFP] || props.STATEFP : "";
                                const code = props.GEOID || (props.STATEFP && props.COUNTYFP ? `${props.STATEFP}${props.COUNTYFP}` : "") || activeCensusLayer.code;
                                const localAcs = LOCAL_CENSUS_ACS_DATABASE[code] || LOCAL_CENSUS_COUNTY_METRO_DATA[code];

                                // Deterministic hash variance for unlisted FIPS
                                let hash = 0;
                                for (let i = 0; i < code.length; i++) {
                                  hash = (hash << 5) - hash + code.charCodeAt(i);
                                  hash |= 0;
                                }
                                const fipsVar = ((Math.abs(hash) % 100) - 50) / 100;
                                const baseInc = stFips ? STATE_DEMOGRAPHIC_BENCHMARKS[stFips]?.income ?? 70000 : 70000;
                                const baseHv = stFips ? STATE_DEMOGRAPHIC_BENCHMARKS[stFips]?.homeValue ?? 350000 : 350000;
                                const baseEdu = stFips ? STATE_DEMOGRAPHIC_BENCHMARKS[stFips]?.eduPct ?? 32 : 32;
                                const basePov = stFips ? STATE_DEMOGRAPHIC_BENCHMARKS[stFips]?.povertyPct ?? 12 : 12;

                                let categoryMetric = "";
                                if (heatmapMode === "income") {
                                  const val = localAcs?.medianIncome ?? Math.max(35000, Math.round(baseInc * (1 + fipsVar * 0.35)));
                                  categoryMetric = `Income: $${val.toLocaleString()}`;
                                } else if (heatmapMode === "homeValue") {
                                  const val = localAcs?.medianHomeValue ?? Math.max(140000, Math.round(baseHv * (1 + fipsVar * 0.45)));
                                  categoryMetric = `Home Value: $${val.toLocaleString()}`;
                                } else if (heatmapMode === "population") {
                                  const val = localAcs?.totalPopulation ?? Math.max(10000, Math.abs(hash % 2500000));
                                  categoryMetric = `Population: ${val.toLocaleString()}`;
                                } else if (heatmapMode === "education") {
                                  const val = localAcs?.bachelorOrHigherPct ?? Number((Math.min(Math.max(15, baseEdu + fipsVar * 15), 65)).toFixed(1));
                                  categoryMetric = `Education: ${val}% Bachelor+`;
                                } else if (heatmapMode === "veterans") {
                                  const val = localAcs?.veteranPct ?? Number((Math.min(Math.max(3, 8 + fipsVar * 6), 18)).toFixed(1));
                                  categoryMetric = `Veterans: ${val}%`;
                                } else if (heatmapMode === "broadband") {
                                  const val = localAcs?.broadbandPct ?? Number((Math.min(Math.max(75, 88 + fipsVar * 8), 98)).toFixed(1));
                                  categoryMetric = `Broadband: ${val}%`;
                                } else if (heatmapMode === "ownerPct") {
                                  const val = localAcs?.ownerOccupiedPct ?? Number((Math.min(Math.max(35, 65 + fipsVar * 18), 88)).toFixed(1));
                                  categoryMetric = `Homeowners: ${val}%`;
                                } else if (heatmapMode === "poverty") {
                                  const val = localAcs?.povertyPct ?? Number((Math.min(Math.max(5, basePov + fipsVar * 10), 30)).toFixed(1));
                                  categoryMetric = `Poverty Rate: ${val}%`;
                                } else if (heatmapMode === "commute") {
                                  const val = localAcs?.meanCommuteMinutes ?? Number((Math.min(Math.max(14, 25 + fipsVar * 12), 45)).toFixed(1));
                                  categoryMetric = `Mean Commute: ${val} min`;
                                } else if (heatmapMode === "medianAge") {
                                  const val = localAcs?.medianAge ?? Number((Math.min(Math.max(28, 38 + fipsVar * 8), 48)).toFixed(1));
                                  categoryMetric = `Median Age: ${val} yrs`;
                                } else if (heatmapMode === "medianRent") {
                                  const val = localAcs?.medianRent ?? Math.max(700, Math.round(1350 * (1 + fipsVar * 0.4)));
                                  categoryMetric = `Median Rent: $${val.toLocaleString()} / mo`;
                                } else if (heatmapMode === "workFromHome") {
                                  const val = localAcs?.workFromHomePct ?? Number((Math.min(Math.max(5, 15 + fipsVar * 12), 35)).toFixed(1));
                                  categoryMetric = `Remote Work: ${val}%`;
                                } else if (heatmapMode === "noVehicle") {
                                  const val = localAcs?.noVehiclePct ?? Number((Math.min(Math.max(2, 7 + fipsVar * 15), 45)).toFixed(1));
                                  categoryMetric = `No Transit/Car: ${val}%`;
                                } else if (heatmapMode === "foreignBorn") {
                                  const val = localAcs?.foreignBornPct ?? Number((Math.min(Math.max(3, 14 + fipsVar * 18), 45)).toFixed(1));
                                  categoryMetric = `Foreign Born: ${val}%`;
                                } else if (heatmapMode === "snapPct") {
                                  const val = localAcs?.snapPct ?? Number((Math.min(Math.max(4, 12 + fipsVar * 10), 28)).toFixed(1));
                                  categoryMetric = `SNAP / Assistance: ${val}%`;
                                } else if (heatmapMode === "unemployment") {
                                  const val = localAcs?.unemploymentPct ?? Number((Math.min(Math.max(2, 4.5 + fipsVar * 5), 12)).toFixed(1));
                                  categoryMetric = `Unemployment: ${val}%`;
                                } else if (heatmapMode === "insured") {
                                  const val = localAcs?.insuredPct ?? Number((Math.min(Math.max(80, 91 + fipsVar * 8), 98)).toFixed(1));
                                  categoryMetric = `Health Insured: ${val}%`;
                                } else if (heatmapMode === "highSchool") {
                                  const val = localAcs?.highSchoolPct ?? Number((Math.min(Math.max(75, 89 + fipsVar * 8), 97)).toFixed(1));
                                  categoryMetric = `HS Graduate: ${val}%`;
                                } else if (heatmapMode === "gradDegree") {
                                  const val = localAcs?.gradDegreePct ?? Number((Math.min(Math.max(5, 12 + fipsVar * 14), 35)).toFixed(1));
                                  categoryMetric = `Graduate Degree: ${val}%`;
                                } else if (heatmapMode === "multiVehicle") {
                                  const val = localAcs?.multiVehiclePct ?? Number((Math.min(Math.max(20, 60 + fipsVar * 18), 80)).toFixed(1));
                                  categoryMetric = `Multi-Vehicle HH: ${val}%`;
                                } else if (heatmapMode === "vacancy") {
                                  const val = localAcs?.vacancyPct ?? Number((Math.min(Math.max(4, 10 + fipsVar * 8), 22)).toFixed(1));
                                  categoryMetric = `Housing Vacancy: ${val}%`;
                                } else if (heatmapMode === "timeZone") {
                                  const off = stFips ? STATE_UTC_OFFSET[stFips] : undefined;
                                  categoryMetric = off !== undefined ? `Standard Time: UTC${off}` : "Standard Time: —";
                                }

                                setHoveredStateAbbrev(featureId);
                                setFeatureHoverInfo({
                                  label: name,
                                  details: stFips ? `State: ${stFips}` : "",
                                  categoryMetric,
                                  code,
                                });
                              }
                            }}
                            onMouseLeave={() => {
                              setHoveredStateAbbrev(null);
                              setFeatureHoverInfo(null);
                            }}
                            onClick={(e: any) => {
                              if (e && e.stopPropagation) e.stopPropagation();
                              const name = props.NAMELSAD || props.NAME || (abbrev ? EXPLORER_STATES[abbrev]?.name[locale] : null) || props.GEOID || "Boundary Feature";
                              const code = props.GEOID || props.GEOIDFQ || activeCensusLayer.code;
                              const stFips = props.STATEFP || (abbrev ? FIPS_TO_ABBREV[abbrev] : "");

                              setIsLoadingCensusData(true);
                              setLiveCensusData(null);

                              fetchCensusAcsData({
                                stateFips: stFips,
                                countyFips: props.COUNTYFP,
                                tractCe: props.TRACTCE,
                                blkGrpCe: props.BLKGRPCE,
                                placeFips: props.PLACEFP,
                                cd119Fips: props.CD119FP,
                                geoid: code,
                                layerCode: activeCensusLayer.code,
                              }).then((data) => {
                                setLiveCensusData(data);
                                setIsLoadingCensusData(false);
                              });

                              if (activeCensusLayer.id === "states") {
                                if (abbrev && abbrev !== "DC" && EXPLORER_STATES[abbrev]) {
                                  setSelectedStateAbbrev(abbrev);
                                  setSelectedFeature({
                                    id: abbrev,
                                    name: EXPLORER_STATES[abbrev].name[locale],
                                    layerName: activeCensusLayer.name[locale],
                                    layerCode: activeCensusLayer.code,
                                    geoid: props.GEOID || FIPS_TO_ABBREV[abbrev] || abbrev,
                                    stateAbbrev: abbrev,
                                    properties: props,
                                  });
                                }
                              } else {
                                setSelectedFeature({
                                  id: featureId,
                                  name,
                                  layerName: activeCensusLayer.name[locale],
                                  layerCode: activeCensusLayer.code,
                                  geoid: code,
                                  stateAbbrev: props.STATEFP ? FIPS_TO_ABBREV[props.STATEFP] || props.STATEFP : "",
                                  properties: props,
                                });
                              }
                            }}
                            style={{
                              default: getGeographyStyle(geo),
                              hover: { cursor: "pointer", outline: "none" },
                              pressed: { outline: "none" },
                            }}
                          />
                        );
                      });

                      const selectedGeo = geographies.find((geo) => {
                        const abbrev = getFeatureAbbrev(geo);
                        const props = geo.properties || {};
                        const featureId = geo.id || props.GEOID || geo.rsmKey;
                        return (abbrev && abbrev === selectedStateAbbrev) || selectedFeature?.id === featureId;
                      });
                      const hoveredGeo = hoveredStateAbbrev
                        ? geographies.find((geo) => {
                            const abbrev = getFeatureAbbrev(geo);
                            const props = geo.properties || {};
                            const featureId = geo.id || props.GEOID || geo.rsmKey;
                            return (abbrev && abbrev === hoveredStateAbbrev) || hoveredStateAbbrev === featureId;
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
                                default: {
                                  fill: activeCensusLayer.id === "states" ? "none" : "rgba(251, 191, 36, 0.50)",
                                  stroke: "#fbbf24",
                                  strokeWidth: 2.5,
                                  outline: "none",
                                  pointerEvents: "none",
                                },
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
                                default: {
                                  fill: "rgba(255, 255, 255, 0.45)",
                                  stroke: "#ffffff",
                                  strokeWidth: 2.2,
                                  outline: "none",
                                  pointerEvents: "none",
                                },
                                hover: { outline: "none" },
                                pressed: { outline: "none" },
                              }}
                            />
                          )}
                        </>
                      );
                    }}
                  </Geographies>

                  {/* Interstate Highways Overlay — accurate NTAD-derived geometry only.
                      (HIGHWAY_ROUTES, a ~15-waypoint schematic stand-in built for the
                      highway-system page's stylized "eras" map, used to be drawn on top
                      of this and visibly disagreed with the real road shape — removed.) */}
                  {showInterstates &&
                    Object.entries(interstateData).flatMap(([iNum, data]: [string, any]) =>
                      (data.segments || []).flatMap((seg: any[], sIdx: number) =>
                        seg.slice(0, -1).map((pt: any, pIdx: number) => (
                          <Line
                            key={`interstate-bg-${iNum}-${sIdx}-${pIdx}`}
                            from={pt}
                            to={seg[pIdx + 1]}
                            stroke="#fbbf24"
                            strokeWidth={1.2}
                            strokeLinecap="round"
                          />
                        ))
                      )
                    )}

                  {/* Continental Rail Network Lines Overlay — accurate NTAD-derived
                      geometry only. (RAIL_ROUTES, the same kind of schematic stand-in
                      used by the rail-network page's "eras" map, removed for the same
                      reason as HIGHWAY_ROUTES above.) */}
                  {showAmtrakRail &&
                    Object.entries(railData).flatMap(([rrOwner, data]: [string, any]) =>
                      (data.segments || []).flatMap((seg: any[], sIdx: number) =>
                        seg.slice(0, -1).map((pt: any, pIdx: number) => (
                          <Line
                            key={`rail-bg-${rrOwner}-${sIdx}-${pIdx}`}
                            from={pt}
                            to={seg[pIdx + 1]}
                            stroke={rrOwner === "BNSF" ? "#fb923c" : rrOwner === "UP" ? "#fbbf24" : "#38bdf8"}
                            strokeWidth={0.9}
                            strokeDasharray="3 2"
                            strokeLinecap="round"
                          />
                        ))
                      )
                    )}

                  {/* ⚡ US Electric Power Transmission Lines Overlay (HIFLD, 74.5k segments,
                      436k points) — merged into one path (see MergedLineOverlay); previously
                      one <Line> per point-pair (~360k DOM nodes) for a single toggle. */}
                  {showTransmissionLines && (
                    <MergedLineOverlay data={transmissionLinesData as any} stroke="#facc15" strokeWidth={0.5} strokeOpacity={0.6} />
                  )}

                  {/* 🥾 National Trails Overlay (USFS Motor Vehicle Use Maps, 23.3k trails,
                      134k points) — merged into one path for the same reason as above. */}
                  {showTrails && (
                    <MergedLineOverlay data={trailsData as any} stroke="#a3e635" strokeWidth={0.6} strokeOpacity={0.7} strokeDasharray="2 2" />
                  )}

                  {/* 🏞️ National Park Service Boundaries Overlay (official NPS, 433 units) —
                      real polygon shapes, so park SIZE is visible on the map, not just a point.
                      Rendered as one merged SVG path (see MergedGeoOverlay) instead of 433
                      separate react-simple-maps elements — same data, far less DOM/render cost. */}
                  {showParkBoundaries && (
                    <MergedGeoOverlay url="/maps/national-park-boundaries.json" fill="rgba(16, 185, 129, 0.32)" stroke="#10b981" strokeWidth={0.6} />
                  )}

                  {/* Federal Lands no longer renders here — it's always GPU-rendered via
                      HeavyLayersMapGL below (see the toggle button's note); the SVG merged-
                      path technique above works for Park Boundaries but wasn't reliable
                      enough at Federal Lands' full 5,260-parcel scale in the user's browser. */}

                  {/* 🏥 Hospitals & Clinics Overlay (HIFLD, 8,013 facilities) */}
                  {showHospitals &&
                    (hospitalsData as any[]).map((h, i) => (
                      <Marker key={`hosp-${i}`} coordinates={[h.lon, h.lat]}>
                        <circle r={2} fill="#fb7185" fillOpacity={0.85} />
                      </Marker>
                    ))}

                  {/* 🏫 Public Schools Overlay (NCES, 102,178 schools) */}
                  {showSchools &&
                    (schoolsData as any[]).map((s, i) => (
                      <Marker key={`school-${i}`} coordinates={[s.lon, s.lat]}>
                        <circle r={1.4} fill="#818cf8" fillOpacity={0.75} />
                      </Marker>
                    ))}

                  {/* 🌋 Monitored U.S. Volcanoes Overlay (USGS, 161 volcanoes) */}
                  {showVolcanoes &&
                    (volcanoesData as any[]).map((v, i) => (
                      <Marker
                        key={`volcano-${i}`}
                        coordinates={[v.lon, v.lat]}
                        onMouseEnter={() => {
                          setFeatureHoverInfo({
                            label: v.n,
                            details: `${v.c || "USGS Monitored"}${v.e ? ` • ${Math.round(v.e)} ft` : ""}`,
                            code: v.al || "Volcano",
                          });
                        }}
                        onMouseLeave={() => setFeatureHoverInfo(null)}
                      >
                        <g className="cursor-pointer">
                          <path d="M -5 4 L 0 -5 L 5 4 Z" fill="#fb923c" stroke="#ffffff" strokeWidth={0.8} />
                        </g>
                      </Marker>
                    ))}

                  {/* 🚉 Amtrak Rail Stations Overlay (BTS/NTAD, 1,031 stations) */}
                  {showAmtrakStations &&
                    (amtrakStationsData as any[]).map((st, i) => (
                      <Marker
                        key={`amtrak-stn-${i}`}
                        coordinates={[st.lon, st.lat]}
                        onMouseEnter={() => {
                          setFeatureHoverInfo({
                            label: st.n,
                            details: `${st.c || ""}${st.s ? `, ${st.s}` : ""}`,
                            code: st.code || "Amtrak",
                          });
                        }}
                        onMouseLeave={() => setFeatureHoverInfo(null)}
                      >
                        <g className="cursor-pointer">
                          <circle r={2.5} fill="#22d3ee" stroke="#ffffff" strokeWidth={1} />
                        </g>
                      </Marker>
                    ))}

                </ZoomableGroup>
              </ComposableMap>

              {/* Floating Magnifying Glass Zoom Controls (+ / - / Reset) */}
              <div className="absolute bottom-12 right-4 z-20 flex flex-col items-center gap-1.5 rounded-2xl border border-[#fbbf24]/30 bg-black/90 p-2 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-center p-1 rounded-lg bg-[#fbbf24]/10 border border-[#fbbf24]/20 mb-0.5" title="Magnifying Glass Map Zoom">
                  <Search className="h-3.5 w-3.5 text-[#fbbf24]" />
                </div>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In (Magnify)"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 hover:bg-[#fbbf24]/20 hover:text-[#fbbf24] text-white transition-colors cursor-pointer"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out (Demagnify)"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 hover:bg-[#fbbf24]/20 hover:text-[#fbbf24] text-white transition-colors cursor-pointer"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Reset View"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 hover:bg-[#fbbf24]/20 hover:text-[#fbbf24] text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── SELECTED FEATURE DATA INSPECTOR ── */}
          {selectedFeature && (() => {
            const props = selectedFeature.properties || {};
            const aland = Number(props.ALAND || 0);
            const awater = Number(props.AWATER || 0);
            const totalM2 = aland + awater;

            const sqMilesLand = aland > 0 ? (aland / 2589988.11) : 0;
            const sqMilesWater = awater > 0 ? (awater / 2589988.11) : 0;
            const sqMilesTotal = sqMilesLand + sqMilesWater;

            const landPct = totalM2 > 0 ? ((aland / totalM2) * 100).toFixed(1) : "100.0";
            const waterPct = totalM2 > 0 ? ((awater / totalM2) * 100).toFixed(1) : "0.0";

            const stFips = props.STATEFP ? String(props.STATEFP).padStart(2, "0") : "";
            const stAbbrev = selectedFeature.stateAbbrev || (stFips ? FIPS_TO_ABBREV[stFips] : "") || props.STUSPS || "";
            const stName = props.STATE_NAME || (stAbbrev ? EXPLORER_STATES[stAbbrev]?.name[locale] : null) || "";

            const loGrade = props.LOGRADE || "";
            const hiGrade = props.HIGRADE || "";
            const cdSession = props.CDSESSN || "119";
            const lsyYear = props.LSY || "2025";
            const lsad = props.LSAD || "";
            const countyFips = props.COUNTYFP || "";
            const csafp = props.CSAFP || "";
            const cbsafp = props.CBSAFP || "";

            // Heuristic Census Demographics estimate
            let estPop = 0;
            if (sqMilesLand > 0) {
              if (selectedFeature.layerCode.includes("bg") || selectedFeature.layerCode.includes("tract")) {
                estPop = Math.round(sqMilesLand * 1450);
              } else if (selectedFeature.layerCode.includes("cd119")) {
                estPop = 760000;
              } else if (selectedFeature.layerCode.includes("place")) {
                estPop = Math.round(sqMilesLand * 2100);
              } else if (selectedFeature.layerCode.includes("county")) {
                estPop = Math.round(sqMilesLand * 120);
              } else {
                estPop = Math.round(sqMilesLand * 380);
              }
            }

            return (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-white/[0.06] bg-[#070707] p-6 md:p-8 shadow-2xl shadow-black/85 relative overflow-hidden mb-8"
                >
                  {/* Accent header line */}
                  <div className="h-0.5 w-full rounded-full mb-6 bg-[#fbbf24]" />

                  {/* Top Bar: Layer & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-widest bg-[#fbbf24]/10 text-[#fbbf24] border border-[#fbbf24]/25 flex items-center gap-1.5">
                        <Layers className="w-3 h-3" />
                        {selectedFeature.layerName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-xs text-white/40">
                        {selectedFeature.layerCode}
                      </span>
                      {stAbbrev && (
                        <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-xs text-white/60 font-semibold">
                          {stName ? `${stName} (${stAbbrev})` : `State: ${stAbbrev}`}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* CSV & JSON Export Buttons */}
                      <button
                        onClick={() => {
                          const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(props, null, 2));
                          const downloadAnchor = document.createElement("a");
                          downloadAnchor.setAttribute("href", dataStr);
                          downloadAnchor.setAttribute("download", `${selectedFeature.name.replace(/\s+/g, "_")}_census_data.json`);
                          document.body.appendChild(downloadAnchor);
                          downloadAnchor.click();
                          downloadAnchor.remove();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
                        title="Download JSON Export"
                      >
                        <FileText className="w-3 h-3 text-white/40" />
                        <span>JSON</span>
                      </button>

                      <button
                        onClick={() => {
                          const headers = Object.keys(props).join(",");
                          const values = Object.values(props).map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");
                          const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(`${headers}\n${values}`);
                          const downloadAnchor = document.createElement("a");
                          downloadAnchor.setAttribute("href", csvContent);
                          downloadAnchor.setAttribute("download", `${selectedFeature.name.replace(/\s+/g, "_")}_census_data.csv`);
                          document.body.appendChild(downloadAnchor);
                          downloadAnchor.click();
                          downloadAnchor.remove();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
                        title="Download CSV Export"
                      >
                        <FileText className="w-3 h-3 text-white/40" />
                        <span>CSV</span>
                      </button>

                      <button
                        onClick={() => setSelectedFeature(null)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>{locale === "ro" ? "Închide selecția" : "Deselect Area"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Grid: Info + Special Cards + Raw Properties */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Column 1: Feature Title & Special Census Badges (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
                          {selectedFeature.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-white/80">
                            GEOID: {selectedFeature.geoid}
                          </span>
                          {lsad && (
                            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-white/60">
                              LSAD: {lsad}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Live ACS Census Data API Metrics Card */}
                      {isLoadingCensusData ? (
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-3">
                          <Zap className="w-4 h-4 text-[#fbbf24] animate-spin" />
                          <span className="font-body text-xs text-white/50 font-semibold">Querying live ACS 5-Year Census Bureau API...</span>
                        </div>
                      ) : liveCensusData ? (
                        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c0c] p-4 space-y-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-body text-[10px] uppercase tracking-widest text-white/30 font-semibold flex items-center gap-1.5">
                              <Zap className="w-3 h-3 text-[#fbbf24]" />
                              Official ACS 5-Year Live Data
                            </span>
                            <span className="font-body text-[9px] text-white/25 font-semibold">U.S. Census API</span>
                          </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Median Income</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.medianIncome ? `$${liveCensusData.medianIncome.toLocaleString()}` : "N/A"}
                                </span>
                              </div>
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Median Home Value</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.medianHomeValue ? `$${liveCensusData.medianHomeValue.toLocaleString()}` : "N/A"}
                                </span>
                              </div>
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Higher Education</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.bachelorOrHigherPct ? `${liveCensusData.bachelorOrHigherPct}%` : "N/A"}
                                </span>
                              </div>
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Veteran Rate</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.veteranPct ? `${liveCensusData.veteranPct}%` : "N/A"}
                                </span>
                              </div>
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Broadband Internet</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.broadbandPct ? `${liveCensusData.broadbandPct}%` : "N/A"}
                                </span>
                              </div>
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Homeownership Rate</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.ownerOccupiedPct ? `${liveCensusData.ownerOccupiedPct}%` : "N/A"}
                                </span>
                              </div>
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Mean Commute</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.meanCommuteMinutes ? `${liveCensusData.meanCommuteMinutes} min` : "N/A"}
                                </span>
                              </div>
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Poverty Rate</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.povertyPct ? `${liveCensusData.povertyPct}%` : "N/A"}
                                </span>
                              </div>
                              <div className="bg-black/30 p-2 rounded-xl border border-white/[0.05]">
                                <span className="text-[9px] text-white/40 block">Foreign-Born %</span>
                                <span className="text-white font-bold text-sm">
                                  {liveCensusData.foreignBornPct ? `${liveCensusData.foreignBornPct}%` : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : null}

                      {/* 2×2 Census Quick Metrics Cards */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-3.5 space-y-1 shadow-sm">
                          <div className="flex items-center gap-1.5 text-white/30 font-body text-[10px] uppercase tracking-wider font-semibold">
                            <Compass className="w-3 h-3 text-[#fbbf24]" />
                            <span>Land Area</span>
                          </div>
                          <div className="font-display text-lg font-bold text-white">
                            {sqMilesLand > 0 ? `${sqMilesLand.toLocaleString("en-US", { maximumFractionDigits: 1 })} sq mi` : "N/A"}
                          </div>
                          <div className="font-mono text-[10px] text-white/30">
                            {aland > 0 ? `${(aland / 1e6).toFixed(1)} km² (${landPct}%)` : "Land area"}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-3.5 space-y-1 shadow-sm">
                          <div className="flex items-center gap-1.5 text-white/30 font-body text-[10px] uppercase tracking-wider font-semibold">
                            <Globe className="w-3 h-3 text-[#fbbf24]" />
                            <span>Water Area</span>
                          </div>
                          <div className="font-display text-lg font-bold text-white">
                            {sqMilesWater > 0 ? `${sqMilesWater.toLocaleString("en-US", { maximumFractionDigits: 1 })} sq mi` : "0 sq mi"}
                          </div>
                          <div className="font-mono text-[10px] text-white/30">
                            {awater > 0 ? `${(awater / 1e6).toFixed(1)} km² (${waterPct}%)` : "Water surface"}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-3.5 space-y-1 shadow-sm">
                          <div className="flex items-center gap-1.5 text-white/30 font-body text-[10px] uppercase tracking-wider font-semibold">
                            <Users className="w-3 h-3 text-[#fbbf24]" />
                            <span>Census Est. Pop</span>
                          </div>
                          <div className="font-display text-lg font-bold text-white">
                            {estPop > 0 ? estPop.toLocaleString("en-US") : "N/A"}
                          </div>
                          <div className="font-mono text-[10px] text-white/30">
                            Statistical estimate
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-3.5 space-y-1 shadow-sm">
                          <div className="flex items-center gap-1.5 text-white/30 font-body text-[10px] uppercase tracking-wider font-semibold">
                            <Landmark className="w-3 h-3 text-[#fbbf24]" />
                            <span>FIPS Identifiers</span>
                          </div>
                          <div className="font-mono text-sm font-bold text-white truncate">
                            {stFips ? `ST ${stFips}` : ""}{countyFips ? ` / CO ${countyFips}` : ""}
                          </div>
                          <div className="font-mono text-[10px] text-white/30 truncate">
                            {csafp ? `CSA ${csafp}` : cbsafp ? `CBSA ${cbsafp}` : "Federal FIPS Code"}
                          </div>
                        </div>
                      </div>

                      {/* Specialized Category Badges */}
                      {(loGrade || hiGrade || cdSession || lsyYear) && (
                        <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-3.5 space-y-2 shadow-sm">
                          <span className="font-body text-[10px] uppercase tracking-widest text-white/30 font-semibold block">
                            Census Bureau Classification Insights
                          </span>
                          <div className="flex flex-wrap gap-2 text-xs font-mono">
                            {(loGrade || hiGrade) && (
                              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/70">
                                <GraduationCap className="w-3.5 h-3.5 text-[#fbbf24]" />
                                Grades: {loGrade || "PK"} to {hiGrade || "12"}
                              </span>
                            )}
                            {selectedFeature.layerCode.includes("cd119") && (
                              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/70">
                                <Landmark className="w-3.5 h-3.5 text-[#fbbf24]" />
                                119th U.S. Congress (2025–2027)
                              </span>
                            )}
                            {(selectedFeature.layerCode.includes("sldl") || selectedFeature.layerCode.includes("sldu")) && (
                              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/70">
                                <Scale className="w-3.5 h-3.5 text-[#fbbf24]" />
                                {selectedFeature.layerCode.includes("sldl") ? "Lower Chamber Assembly" : "Upper Chamber Senate"} ({lsyYear})
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Column 2: Raw Census Properties Table (7 cols) */}
                    <div className="lg:col-span-7 rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                        <span className="font-body text-[10px] uppercase tracking-widest text-white/30 font-semibold flex items-center gap-1.5">
                          <FileText className="w-3 h-3 text-[#fbbf24]" />
                          {locale === "ro" ? "Atribute Cartografice Recensământ (Shapefile Properties)" : "Census Cartographic Properties (Raw Attributes)"}
                        </span>
                        <span className="font-mono text-[10px] text-white/25">
                          {Object.keys(props).length} fields
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono max-h-72 overflow-y-auto scrollbar-thin pr-1">
                        {Object.entries(props).map(([k, v]) => {
                          if (v === null || v === undefined) return null;
                          let displayValue = String(v);
                          if (k === "ALAND" || k === "AWATER") {
                            const sqMiles = (Number(v) / 2589988.11).toFixed(2);
                            displayValue = `${Number(v).toLocaleString()} m² (${sqMiles} sq mi)`;
                          }
                          return (
                            <div key={k} className="flex flex-col bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.05] hover:border-white/[0.12] transition-colors">
                              <span className="text-[10px] text-white/30 font-bold tracking-wide">{k}</span>
                              <span className="text-white/80 font-medium truncate" title={displayValue}>{displayValue}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })()}

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
                      <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold">{translations.capital}</span>
                      <span className="font-body text-sm font-semibold text-white">{selectedState.capital[locale]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold">{translations.statehood}</span>
                      <span className="font-body text-sm font-semibold text-white">{selectedState.statehoodYear}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold">{translations.entryOrderLabel}</span>
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
                      <div className="font-body text-[10px] text-white/30">${gdpPerCapita}k {translations.perCapitaSuffix}</div>
                    </div>

                    {/* Population */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-1 hover:border-[#60a5fa]/20 transition-colors shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3 text-[#60a5fa]" />
                        <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">{translations.population}</span>
                      </div>
                      <div className="font-hero text-3xl text-white">{selectedState.population}M</div>
                      <div className="font-body text-[10px] text-white/30">{popDensity} {translations.perSqMiSuffix}</div>
                    </div>

                    {/* Area */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-1 hover:border-[#34d399]/20 transition-colors shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="h-3 w-3 text-[#34d399]" />
                        <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">{translations.area}</span>
                      </div>
                      <div className="font-hero text-2xl text-white">{selectedState.area.toLocaleString()}</div>
                      <div className="font-body text-[10px] text-white/30">{translations.squareMilesLabel}</div>
                    </div>

                    {/* Statehood */}
                    <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-1 hover:border-[#f87171]/20 transition-colors shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <Compass className="h-3 w-3 text-[#f87171]" />
                        <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">{translations.statehood}</span>
                      </div>
                      <div className="font-hero text-3xl text-white">{selectedState.statehoodYear}</div>
                      <div className="font-body text-[10px] text-white/30">#{selectedState.statehoodOrder} {translations.toJoinSuffix}</div>
                    </div>
                  </div>

                  {/* GDP + Population Rank Bars */}
                  <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-5 space-y-4 shadow-sm">
                    <GdpRankBar rank={gdpRank} label={translations.gdpRankLabel} />
                    <div className="h-px bg-white/[0.06]" />
                    <PopRankBar rank={popRank} color="#60a5fa" label={translations.popRankLabel} />
                    <div className="flex justify-between font-body text-[10px] text-white/20 pt-1">
                      <span>{translations.rankOneLabel}</span>
                      <span>{translations.ofFiftyStates}</span>
                    </div>
                  </div>
                  {/* Area rank pill */}
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-[#0c0c0c] px-4 py-3 shadow-sm">
                    <span className="font-body text-[10px] uppercase tracking-wider text-white/30 font-semibold">{translations.areaRankLabel}</span>
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
                      {translations.story}
                    </span>
                    <p className="font-body text-sm leading-relaxed text-white/70">
                      {selectedState.story[locale]}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/[0.05] space-y-3">
                    <div>
                      <span className="font-body text-[10px] font-bold uppercase tracking-wider text-white/30 block mb-1">{translations.industry}</span>
                      <span className="font-body text-sm font-semibold text-[#fbbf24] leading-relaxed">{selectedState.industry[locale]}</span>
                    </div>
                    {/* US Share bar */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-body text-[10px] font-semibold uppercase tracking-wider text-white/30">{translations.shareOfUsGdp}</span>
                        <span className="font-body text-[10px] text-white/45">
                          {((selectedState.gdp / 29200) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/[0.07] overflow-hidden">
                        <div
                          style={{ width: `${Math.min(100, (selectedState.gdp / 29200) * 100 * 4)}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-[#fbbf24]/60 to-[#fbbf24] transition-[width] duration-500 ease-out"
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
                      <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">{translations.iconicLandmark}</span>
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-white truncate">
                        {STATE_TRIVIA[selectedState.abbrev]?.landmark[locale] ?? translations.defaultLandmark}
                      </h4>
                      <p className="font-body text-[10px] text-white/45 mt-1 uppercase tracking-wider">
                        {translations.stateHeritageSite}
                      </p>
                    </div>
                    <p className="font-body text-xs text-white/75 leading-relaxed">
                      <strong>{locale === "ro" ? "Fapt istoric:" : "Historical Fact:"}</strong> {STATE_TRIVIA[selectedState.abbrev]?.fact[locale] ?? translations.defaultFact}
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
                        "{STATE_TRIVIA[selectedState.abbrev]?.motto[locale] ?? translations.defaultMotto}"
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/[0.04]">
                      <h5 className="font-body text-[10px] font-bold text-white/40 uppercase tracking-wider">
                        {locale === "ro" ? "Brand / Entitate Emblematică" : "Iconic Brand / Entity"}
                      </h5>
                      <p className="font-body text-xs font-semibold text-[#fbbf24] mt-1 leading-relaxed">
                        {STATE_TRIVIA[selectedState.abbrev]?.brand ?? translations.defaultBrand}
                      </p>
                    </div>
                  </div>
                </div>

                {/* State Rankings (3 columns) */}
                <div className="md:col-span-3 flex flex-col justify-between bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                  <div className="space-y-3">
                    <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-bold block">{translations.comparativeRankings}</span>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-body text-[9px] uppercase font-semibold">{translations.gdpRankLabel}</span>
                        <span className="text-white font-semibold">#{gdpRank}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-body text-[9px] uppercase font-semibold">{translations.popRankLabel}</span>
                        <span className="text-white font-semibold">#{popRank}</span>
                      </div>
                      <div className="h-px bg-white/[0.04]" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/40 font-body text-[9px] uppercase font-semibold">{translations.areaRankLabel}</span>
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
                              label: `${selectedState.name[locale]}: ${translations.capitolLabel}`,
                            })
                          }
                          className="group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/60"
                          aria-label={`${translations.capitolLabel}: ${selectedState.name[locale]}`}
                        >
                          <img
                            key={`capitol-${selectedState.abbrev}`}
                            src={`/state-capitols/${selectedState.abbrev}.jpg`}
                            alt={`${selectedState.name[locale]}: ${translations.capitolLabel}`}
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
                              label: `${selectedState.name[locale]}: ${translations.flagLabel}`,
                            })
                          }
                          className="group relative mb-3 block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/60"
                          aria-label={`${translations.flagLabel}: ${selectedState.name[locale]}`}
                        >
                          <img
                            key={`flag-${selectedState.abbrev}`}
                            src={`/state-symbols/flags/${selectedState.abbrev}.svg`}
                            alt={`${selectedState.name[locale]}: ${translations.flagLabel}`}
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
                              label: `${selectedState.name[locale]}: ${translations.sealLabel}`,
                            })
                          }
                          className="group relative mx-auto mb-3 block w-full max-w-[260px] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/60"
                          aria-label={`${translations.sealLabel}: ${selectedState.name[locale]}`}
                        >
                          <img
                            key={`seal-${selectedState.abbrev}`}
                            src={`/state-symbols/seals/${selectedState.abbrev}.svg`}
                            alt={`${selectedState.name[locale]}: ${translations.sealLabel}`}
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
                      <div>
                        <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold block mb-1">
                          {translations.politicalStructureLabel}
                        </span>
                        <span className="font-body text-xs text-white/75 leading-relaxed">{extended.politicalStructure[locale]}</span>
                      </div>

                      {/* Congressional delegation. Electoral votes == House seats + 2 senators,
                          so the House number is derived rather than stored separately. */}
                      <div className="h-px bg-white/[0.04]" />
                      <span className="font-body text-[10px] text-white/30 uppercase tracking-wider font-semibold block">
                        {translations.delegationLabel}
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-xl border border-white/[0.05] bg-black/40 p-2.5 text-center">
                          <div className="font-hero text-lg text-[#60a5fa]">{delegation.houseSeats}</div>
                          <div className="font-body text-[9px] text-white/35 leading-tight mt-0.5">{translations.houseSeatsLabel}</div>
                        </div>
                        <div className="rounded-xl border border-white/[0.05] bg-black/40 p-2.5 text-center">
                          <div className="font-hero text-lg text-white">{delegation.senators}</div>
                          <div className="font-body text-[9px] text-white/35 leading-tight mt-0.5">{translations.senatorsLabel}</div>
                        </div>
                        <div className="rounded-xl border border-white/[0.05] bg-black/40 p-2.5 text-center">
                          <div className="font-hero text-lg text-[#fbbf24]">{delegation.electoralVotes}</div>
                          <div className="font-body text-[9px] text-white/35 leading-tight mt-0.5">{translations.electoralVotesLabel}</div>
                        </div>
                      </div>
                      <p className="font-body text-[10px] text-white/35 leading-relaxed">
                        {translations.electoralShareNote
                          .replace("{ev}", String(delegation.electoralVotes))
                          .replace("{pct}", ((delegation.electoralVotes / 538) * 100).toFixed(1))}
                      </p>
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

                    {/* Constitution at a glance: pulled from the same data as the
                        State Constitutions section further down the page. */}
                    <div className="bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <ScrollText className="h-4 w-4 text-[#a78bfa]" />
                        <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">
                          {translations.constitutionGlanceTitle}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-xl border border-white/[0.05] bg-black/40 p-2.5 text-center">
                          <div className="font-hero text-lg text-white">{extended.constitution.adoptedYear}</div>
                          <div className="font-body text-[9px] text-white/35 mt-0.5">{translations.adoptedLabel}</div>
                        </div>
                        <div className="rounded-xl border border-white/[0.05] bg-black/40 p-2.5 text-center">
                          <div className="font-hero text-lg text-[#a78bfa]">{extended.constitution.amendmentsCount}</div>
                          <div className="font-body text-[9px] text-white/35 mt-0.5">{translations.amendmentsLabel}</div>
                        </div>
                        <div className="rounded-xl border border-white/[0.05] bg-black/40 p-2.5 text-center">
                          <div className="font-hero text-lg text-[#2dd4bf]">
                            {(extended.constitution.wordCount / 1000).toFixed(1)}k
                          </div>
                          <div className="font-body text-[9px] text-white/35 mt-0.5">{translations.lengthLabel}</div>
                        </div>
                      </div>
                    </div>

                    {/* Which interstate agreements this state is a party to. */}
                    <div className="bg-[#0c0c0c] border border-white/[0.05] rounded-2xl p-5 hover:border-white/[0.08] transition-all shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Share2 className="h-4 w-4 text-[#38bdf8]" />
                        <span className="font-body text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold">
                          {translations.compactsTitle}
                        </span>
                        <span className="ml-auto font-hero text-sm text-[#38bdf8]">{stateCompacts.length}</span>
                      </div>
                      {stateCompacts.length > 0 ? (
                        <ul className="space-y-1.5">
                          {stateCompacts.map((a) => {
                            const color =
                              COOPERATION_CATEGORIES.find((c) => c.id === a.category)?.color ?? "#38bdf8";
                            return (
                              <li key={a.id} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                                <span className="font-body text-[11px] leading-snug text-white/70">
                                  {a.name[locale]}
                                  <span className="text-white/30"> · {a.year}</span>
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="font-body text-[11px] text-white/35">{translations.compactsNone}</p>
                      )}
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
                <p className="font-body text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1 font-bold">{translations.sameRegionLabel}</p>
                <h3 className="font-display text-base font-bold text-white">
                  {translations.regionNames[selectedState.region]}
                  <span className="ml-2 font-body text-[10px] font-normal text-white/40">
                    · {regionalPeers.length + 1} {translations.totalSuffix}
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
                      <div
                        style={{ width: `${(extended.constitution.wordCount / maxValues.maxWords) * 100}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#2dd4bf]/50 to-[#2dd4bf] transition-[width] duration-500 ease-out"
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
              <p className="font-body text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1 font-bold">{translations.nationalRanking}</p>
              <h3 className="font-display text-base font-bold text-white mb-4">{translations.top5Gdp}</h3>
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
              <p className="font-body text-[9px] uppercase tracking-[0.18em] text-white/30 mb-1 font-bold">{translations.nationalRanking}</p>
              <h3 className="font-display text-base font-bold text-white mb-4">{translations.top5Population}</h3>
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
              <span className="font-body text-[9px] uppercase tracking-[0.2em] text-[#fbbf24] font-bold block">{translations.americanLegacy}</span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">{translations.ePluribusTitle}</h3>
              <p className="font-body text-xs sm:text-sm text-white/60 leading-relaxed">
                {translations.ePluribusBody}
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

      {/* ── 2025 Census Cartographic Boundary Views Modal Portal ── */}
      {portalReady &&
        isLayerModalOpen &&
        createPortal(
          <div
            onClick={() => setIsLayerModalOpen(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col w-full max-w-5xl max-h-[88vh] bg-[#09090b] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-white cursor-default"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#fbbf24]/10 border border-[#fbbf24]/30">
                    <Globe className="w-5 h-5 text-[#fbbf24]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white leading-tight">
                      {locale === "ro" ? "Vederi Hărți Recensământ // Seturi de Date 2025" : "Census Boundary Views // 2025 Cartographic Data"}
                    </h3>
                    <p className="font-mono text-xs text-white/40">
                      cb_2025_us_all_500k • 21 Boundary Views + Full Dataset Catalog
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsLayerModalOpen(false)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Filter Toolbar */}
              <div className="p-6 pb-3 space-y-4 border-b border-white/10 bg-black/40">
                {/* Search */}
                <div className="relative w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={layerSearchQuery}
                    onChange={(e) => setLayerSearchQuery(e.target.value)}
                    placeholder={locale === "ro" ? "Caută după nume sau cod (ex: 119th, counties, cbsa, tract, school)..." : "Search by name or code (e.g. 119th, counties, cbsa, tract, school)..."}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/15 rounded-xl font-body text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#fbbf24]"
                  />
                  {layerSearchQuery && (
                    <button
                      onClick={() => setLayerSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: "all", label: locale === "ro" ? "Toate 22 Vederile" : "All 22 Views" },
                    { id: "states_regions", label: locale === "ro" ? "State și Regiuni" : "States & Regions" },
                    { id: "political", label: locale === "ro" ? "Politic & Congres" : "Political & Congressional" },
                    { id: "metro", label: locale === "ro" ? "Metropolitan & Comitate" : "Metropolitan & Counties" },
                    { id: "education", label: locale === "ro" ? "Educație & Școli" : "Education & Schools" },
                    { id: "micro", label: locale === "ro" ? "Micro-Recensământ" : "Census Micro-Tracts" },
                    { id: "reference", label: locale === "ro" ? "Granițe de Referință" : "Reference Boundaries" },
                    { id: "catalog", label: locale === "ro" ? "Catalog Complet" : "Full Catalog" },
                  ].map((cat) => {
                    const isActive = layerCategoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setLayerCategoryFilter(cat.id)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap"
                        style={{
                          background: isActive ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.03)",
                          borderColor: isActive ? "#fbbf24" : "rgba(255,255,255,0.08)",
                          color: isActive ? "#fbbf24" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Grid of 22 Layer Cards */}
              <div className="p-6 overflow-y-auto max-h-[58vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 scrollbar-thin">
                {CENSUS_LAYERS.filter((layer) => {
                  const matchesCat = layerCategoryFilter === "all" || layer.category === layerCategoryFilter;
                  const q = layerSearchQuery.toLowerCase().trim();
                  const matchesSearch =
                    !q ||
                    layer.name.en.toLowerCase().includes(q) ||
                    layer.name.ro.toLowerCase().includes(q) ||
                    layer.code.toLowerCase().includes(q) ||
                    layer.badge.toLowerCase().includes(q);
                  return matchesCat && matchesSearch;
                }).map((layer) => {
                  const isSelected = activeCensusLayerId === layer.id;
                  return (
                    <button
                      key={layer.id}
                      onClick={() => {
                        setActiveCensusLayerId(layer.id);
                        setIsLayerModalOpen(false);
                      }}
                      className="group relative flex flex-col justify-between text-left p-4 rounded-2xl border transition-all duration-200"
                      style={{
                        background: isSelected ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.02)",
                        borderColor: isSelected ? "#fbbf24" : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[9px] font-bold text-[#fbbf24] bg-[#fbbf24]/10 px-2 py-0.5 rounded-md border border-[#fbbf24]/20">
                            {layer.badge}
                          </span>
                          <span className="font-mono text-[9px] text-white/30 uppercase">
                            {layer.categoryLabel[locale]}
                          </span>
                        </div>

                        <h4 className="font-display text-sm font-bold text-white mb-1 leading-snug group-hover:text-[#fbbf24] transition-colors">
                          {layer.name[locale]}
                        </h4>

                        <p className="font-mono text-[10px] text-[#fbbf24]/60 mb-2 truncate">
                          {layer.code}
                        </p>

                        <p className="font-body text-xs text-white/50 leading-relaxed line-clamp-2">
                          {layer.description[locale]}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                        <span className="text-white/30">
                          {isSelected ? (locale === "ro" ? "✓ Activ pe hartă" : "✓ Active on Map") : (locale === "ro" ? "Apasă pentru încărcare" : "Click to render view")}
                        </span>
                        <span className="text-[#fbbf24] group-hover:translate-x-0.5 transition-transform">→</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>,
          document.body
        )}
      </div>

      {/* ⚔️ Side-by-Side State Duel Comparison Modal */}
      <StateComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        initialStateA={selectedStateAbbrev}
        initialStateB={selectedStateAbbrev === "CA" ? "TX" : "CA"}
      />

      {/* 🖨️ Official State Factsheet PDF Generator Modal */}
      <StateFactsheetModal
        isOpen={isFactsheetModalOpen}
        onClose={() => setIsFactsheetModalOpen(false)}
        stateAbbrev={selectedStateAbbrev}
        locale={locale}
      />
    </div>
  );
}
