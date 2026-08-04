"use client";

import { useState, useMemo, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
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
} from "lucide-react";
import { EXPLORER_STATES, StateData } from "@/lib/data/explorer-data";
import { STATE_EXTENDED_DATA } from "@/lib/data/state-details";
import { COOPERATION_AGREEMENTS, COOPERATION_CATEGORIES } from "@/lib/data/interstate-cooperation";
import { COLORS } from "@/lib/constants";

import { GEO_URL, FIPS_TO_ABBREV } from "@/lib/data/us-geo";
import { InterstateCooperationMap } from "@/components/explorer/InterstateCooperationMap";
import { StateRevenueBudget } from "@/components/explorer/StateRevenueBudget";

// ─── 2025 Census Cartographic Boundary Views ─────────────────────────────────
export interface CensusLayerItem {
  id: string;
  code: string;
  name: { en: string; ro: string };
  category: "states_regions" | "political" | "metro" | "education" | "micro" | "catalog";
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
    name: { en: "cb_2025_us_all_500k", ro: "cb_2025_us_all_500k" },
    category: "catalog",
    categoryLabel: { en: "Full Dataset Catalog", ro: "Catalog Complet Set de Date" },
    url: "/maps/states-500k.json",
    badge: "All 21 Layers",
    description: { en: "Complete 2025 U.S. Census 500k Cartographic Boundary Collection", ro: "Colecția completă a tuturor celor 21 de seturi de date cartografice 2025" },
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
    "none" | "gdp" | "population" | "statehood" | "amendments" | "conLength"
  >("none");
  // Census Layer selection state (22 views)
  const [activeCensusLayerId, setActiveCensusLayerId] = useState<string>("states");
  const [isLayerModalOpen, setIsLayerModalOpen] = useState<boolean>(false);
  const [layerSearchQuery, setLayerSearchQuery] = useState<string>("");
  const [layerCategoryFilter, setLayerCategoryFilter] = useState<string>("all");
  const [featureHoverInfo, setFeatureHoverInfo] = useState<{ label: string; details: string; code: string } | null>(null);
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
    setZoomPosition((prev) => ({ ...prev, zoom: Math.max(prev.zoom / 1.5, 0.8) }));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomPosition({ coordinates: [-96, 38], zoom: 1 });
  }, []);

  const handleMoveEnd = useCallback((pos: { coordinates: [number, number]; zoom: number }) => {
    setZoomPosition(pos);
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
            fill: "rgba(251, 191, 36, 0.35)",
            stroke: "#fbbf24",
            strokeWidth: 1.2,
            outline: "none",
            transition: "all 0.15s ease",
          };
        }
        return {
          fill: "rgba(255, 255, 255, 0.08)",
          stroke: "rgba(255, 255, 255, 0.28)",
          strokeWidth: 0.65,
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

      if (!isMatch) {
        fill = "#111111";
        stroke = "rgba(255,255,255,0.12)";
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
    [activeCensusLayerId, selectedStateAbbrev, selectedFeature, hoveredStateAbbrev, selectedRegion, locale, searchQuery, heatmapMode, maxValues]
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
            {/* Search & Census Layer Switcher */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:max-w-xl">
              <div className="relative w-full">
                <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder={translations.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/[0.08] bg-transparent py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:border-[#fbbf24]/50 focus:outline-none transition-colors"
                />
              </div>

              {/* Census Boundary Layer Selector Button */}
              <button
                onClick={() => setIsLayerModalOpen(true)}
                className="flex items-center justify-between gap-2.5 rounded-full border border-[#fbbf24]/40 bg-[#fbbf24]/10 px-4 py-2.5 text-xs font-bold text-[#fbbf24] hover:bg-[#fbbf24]/20 hover:border-[#fbbf24] transition-all shadow-lg shrink-0 w-full sm:w-auto cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#fbbf24]" />
                  <span className="truncate max-w-[160px] font-mono text-xs">{activeCensusLayer.name[locale]}</span>
                </div>
                <span className="rounded-md bg-[#fbbf24]/20 px-2 py-0.5 text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                  {activeCensusLayer.badge}
                </span>
              </button>
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

            {/* Heatmap overlay selector: stacked above the map on mobile so it
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
                      <span className="font-mono text-[10px] text-white/50">{featureHoverInfo.details} • ID: {featureHoverInfo.code}</span>
                    </div>
                  );
                }

                const hs = EXPLORER_STATES[hoveredStateAbbrev!];
                const rc = REGION_COLORS[hs.region];
                const con = STATE_EXTENDED_DATA[hoveredStateAbbrev!]?.constitution;

                const metric: { label: string; value: string; rank: string; color: string } | null =
                  heatmapMode === "gdp"
                    ? { label: translations.gdp, value: `$${hs.gdp}B`, rank: `#${gdpRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#fbbf24" }
                    : heatmapMode === "population"
                    ? { label: translations.population, value: `${hs.population}M`, rank: `#${popRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#60a5fa" }
                    : heatmapMode === "statehood"
                    ? { label: translations.statehood, value: `${hs.statehoodYear}`, rank: `#${hs.statehoodOrder} / 50`, color: "#f87171" }
                    : heatmapMode === "amendments" && con
                    ? { label: translations.amendmentsLabel, value: `${con.amendmentsCount}`, rank: `#${amendRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#a78bfa" }
                    : heatmapMode === "conLength" && con
                    ? { label: translations.lengthLabel, value: `${(con.wordCount / 1000).toFixed(1)}k`, rank: `#${wordRanked.indexOf(hs.abbrev) + 1} / 50`, color: "#2dd4bf" }
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
                                const code = props.GEOID || props.GEOIDFQ || activeCensusLayer.code;
                                setHoveredStateAbbrev(featureId);
                                setFeatureHoverInfo({
                                  label: name,
                                  details: stFips ? `State: ${stFips}` : activeCensusLayer.name[locale],
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
                                  fill: activeCensusLayer.id === "states" ? "none" : "rgba(251, 191, 36, 0.30)",
                                  stroke: activeCensusLayer.id === "states" ? "#ffffff" : "#fbbf24",
                                  strokeWidth: 1.4,
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
          {selectedFeature && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-[#fbbf24]/40 bg-[#09090b] p-6 md:p-8 shadow-2xl relative overflow-hidden mb-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40">
                      {selectedFeature.layerName}
                    </span>
                    <span className="font-mono text-xs text-white/40">
                      Code: {selectedFeature.layerCode}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{locale === "ro" ? "Închide selecția" : "Deselect Area"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 space-y-3">
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight">
                      {selectedFeature.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-white/80">
                        GEOID: {selectedFeature.geoid}
                      </span>
                      {selectedFeature.stateAbbrev && (
                        <span className="px-2.5 py-1 rounded-lg bg-[#fbbf24]/10 border border-[#fbbf24]/30 font-mono text-xs text-[#fbbf24]">
                          State: {selectedFeature.stateAbbrev}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Properties Attributes Table */}
                  <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-black/60 p-4 max-h-60 overflow-y-auto scrollbar-thin">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-3">
                      {locale === "ro" ? "Atribute Cartografice Recensământ (Properties)" : "Census Cartographic Attributes"}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      {Object.entries(selectedFeature.properties).map(([k, v]) => {
                        if (v === null || v === undefined) return null;
                        let displayValue = String(v);
                        if (k === "ALAND" || k === "AWATER") {
                          const sqMiles = (Number(v) / 2589988.11).toFixed(2);
                          displayValue = `${Number(v).toLocaleString()} m² (${sqMiles} sq mi)`;
                        }
                        return (
                          <div key={k} className="flex flex-col bg-white/[0.03] p-2 rounded-lg border border-white/5">
                            <span className="text-[10px] text-white/40 font-bold">{k}</span>
                            <span className="text-white/90 truncate">{displayValue}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

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
    </div>
  );
}
