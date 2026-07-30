"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import {
  ArrowUpRight,
  Building2,
  Handshake,
  MapPin,
  Minus,
  Network,
  Package,
  Plane,
  Plus,
  RotateCcw,
  Search,
  Ship,
  X,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { SITE_IMAGES } from "@/lib/site-images";
import type { DomesticBase, ServiceBranch } from "@/lib/data/domestic-bases-data";
import type {
  AllianceNode,
  GlobalBaseRegion,
  LogisticsNode,
  RegionBrief,
  StrategicBase,
  TheaterCard,
} from "@/lib/data/global-bases-data";
import type { OverseasBase } from "@/lib/data/overseas-bases-data";

const WORLD_GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const REGION_VIEWPORTS: Record<GlobalBaseRegion, { coordinates: [number, number]; zoom: number }> = {
  "Europe": { coordinates: [15, 50], zoom: 2.8 },
  "Indo-Pacific": { coordinates: [115, 5], zoom: 2 },
  "Middle East": { coordinates: [48, 25], zoom: 3.5 },
  "Americas": { coordinates: [-95, 38], zoom: 1.8 },
  "Africa": { coordinates: [25, 0], zoom: 2 },
  "Arctic / High North": { coordinates: [-108, 62], zoom: 1.5 },
};

function parseCoordinates(coordinates: string): [number, number] {
  const [lat, lon] = coordinates.split(",").map((value) => Number(value.trim()));
  return [lon, lat];
}

interface Cluster {
  id: string;
  center: [number, number];
  bases: StrategicBase[];
}

function getClusters(bases: StrategicBase[], zoom: number, selectedBaseId: string | null = null): Cluster[] {
  const threshold = 12 / zoom;
  const clusters: Cluster[] = [];
  const merged = new Set<string>();

  const sortedBases = [...bases].sort((a, b) => a.ID.localeCompare(b.ID));

  const parsedBases = sortedBases.map((b) => ({
    base: b,
    id: b.ID,
    coords: parseCoordinates(b.Coordinates),
  }));

  // STEP 1: THE BREAKOUT (Absolute Priority)
  if (selectedBaseId) {
    const selectedItem = parsedBases.find(item => item.id === selectedBaseId);
    if (selectedItem) {
      clusters.push({
        id: selectedItem.id,
        center: selectedItem.coords,
        bases: [selectedItem.base],
      });
      merged.add(selectedItem.id);
    }
  }

  // STEP 2: CLUSTER EVERYTHING ELSE
  for (let i = 0; i < parsedBases.length; i++) {
    const itemA = parsedBases[i];
    if (merged.has(itemA.id)) continue;

    const clusterBases = [itemA.base];
    merged.add(itemA.id);

    let sumLon = itemA.coords[0];
    let sumLat = itemA.coords[1];

    for (let j = i + 1; j < parsedBases.length; j++) {
      const itemB = parsedBases[j];
      if (merged.has(itemB.id)) continue;

      const dx = itemA.coords[0] - itemB.coords[0];
      const dy = itemA.coords[1] - itemB.coords[1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold) {
        clusterBases.push(itemB.base);
        merged.add(itemB.id);
        sumLon += itemB.coords[0];
        sumLat += itemB.coords[1];
      }
    }

    const center: [number, number] = [
      sumLon / clusterBases.length,
      sumLat / clusterBases.length,
    ];

    clusters.push({
      id: clusterBases.length === 1 ? clusterBases[0].ID : `cluster-${clusterBases[0].ID}`,
      center,
      bases: clusterBases,
    });
  }

  return clusters;
}

function getDomesticRegion(base: DomesticBase): GlobalBaseRegion {
  if (base.state === "Alaska") return "Arctic / High North";
  if (["American Samoa", "Guam", "Hawaii"].includes(base.state)) return "Indo-Pacific";
  return "Americas";
}

function getOverseasRegion(base: OverseasBase): GlobalBaseRegion {
  if (["Belgium", "Bulgaria", "Germany", "Greece", "Italy", "Kosovo", "Netherlands", "Poland", "Portugal", "Romania", "Spain", "Turkey", "United Kingdom"].includes(base.country)) {
    return "Europe";
  }
  if (["Australia", "Japan", "Marshall Islands", "Singapore", "South Korea"].includes(base.country)) {
    return "Indo-Pacific";
  }
  if (["Bahrain", "Iraq", "Israel", "Jordan", "Kuwait", "Qatar", "Saudi Arabia", "United Arab Emirates"].includes(base.country)) {
    return "Middle East";
  }
  if (["Cameroon", "Djibouti", "Kenya", "Somalia"].includes(base.country)) {
    return "Africa";
  }
  if (base.country === "Greenland") return "Arctic / High North";
  if (base.country === "British Overseas Territory" && base.id.includes("diego-garcia")) {
    return "Indo-Pacific";
  }
  if (base.country === "British Overseas Territory") return "Africa";
  return "Americas";
}

function getInfraCapabilities(branch: ServiceBranch, name: string, isRo: boolean): string[] {
  const nameLower = name.toLowerCase();
  const isAirfield = nameLower.includes("air field") || nameLower.includes("air base") || nameLower.includes("airforce base") || nameLower.includes("afb") || nameLower.includes("mcas") || nameLower.includes("aviation");
  const isPort = nameLower.includes("naval base") || nameLower.includes("homeport") || nameLower.includes("shipyard") || nameLower.includes("submarine") || nameLower.includes("fleet activities") || nameLower.includes("port") || nameLower.includes("dock");
  const isDepot = nameLower.includes("depot") || nameLower.includes("arsenal") || nameLower.includes("logistics") || nameLower.includes("supply") || nameLower.includes("sustainment") || nameLower.includes("terminal");
  const isAcademy = nameLower.includes("academy");
  const isRadar = nameLower.includes("radar") || nameLower.includes("satellite") || nameLower.includes("communication") || nameLower.includes("tracking");

  if (isRo) {
    if (isRadar) return ["Urmărire sateliți", "Rețea radar", "Comunicații securizate"];
    if (isAcademy) return ["Instruire ofițeri", "Școală de comandă", "Facilități educaționale"];
    if (isDepot) return ["Depozit logistic greu", "Stocare muniții", "Nod lanț de aprovizionare"];
    if (isAirfield && isPort) return ["Pistă aviație", "Port de mare adâncime", "Hub logistic comun"];
    if (isAirfield) return ["Pistă aviație", "Hangare blindate", "Transport aerian tactic"];
    if (isPort) return ["Ponton adânc", "Șantier naval", "Docuri submarine"];

    switch (branch) {
      case "Joint":
        return ["Nod de comandă comun", "Logistică multi-serviciu", "Legătură securizată"];
      case "Army":
        return ["Teren de manevră", "Cazărmi trupe", "Logistică tactică"];
      case "Marine Corps":
        return ["Poligon de debarcare amfibie", "Pregătire expediționară", "Cazărmi trupe"];
      case "Navy":
        return ["Port maritim", "Cală de întreținere", "Logistică navală"];
      case "Air Force":
        return ["Linie de zbor", "Terminal transport aerian", "Depozitare combustibil aviație"];
      case "Space Force":
        return ["Hub de comandă spațială", "Stație sol telemetrie", "Rețea avertizare rachete"];
      default:
        return ["Hub de postură strategică", "Nod logistic", "Facilitate de comandă"];
    }
  }

  if (isRadar) return ["Satellite Tracking", "Radar Array", "Secure Communications"];
  if (isAcademy) return ["Officer Training", "Command School", "Educational Facilities"];
  if (isDepot) return ["Heavy Logistics Depot", "Munitions Storage", "Supply Chain Link"];
  if (isAirfield && isPort) return ["Aviation Runway", "Deepwater Port", "Joint Logistics Hub"];
  if (isAirfield) return ["Aviation Runway", "Hardened Hangars", "Tactical Airlift"];
  if (isPort) return ["Deepwater Pier", "Naval Dockyard", "Submarine Berths"];

  switch (branch) {
    case "Joint":
      return ["Joint Command Node", "Multi-Service Logistics", "Secure Link"];
    case "Army":
      return ["Maneuver Ground", "Troop Barracks", "Tactical Logistics"];
    case "Marine Corps":
      return ["Amphibious Landing Range", "Expeditionary Staging", "Troop Barracks"];
    case "Navy":
      return ["Maritime Port", "Maintenance Slipway", "Naval Logistics"];
    case "Air Force":
      return ["Flight Line", "Airlift Terminal", "Aviation Fuel Storage"];
    case "Space Force":
      return ["Space Command Hub", "Telemetry Ground Station", "Missile Warning Array"];
    default:
      return ["Strategic Posture Hub", "Logistical Node", "Command Facility"];
  }
}

function getDirectoryMapBases({
  domesticBases = [],
  overseasBases = [],
  locale,
}: {
  domesticBases?: DomesticBase[];
  overseasBases?: OverseasBase[];
  locale: Locale;
}): StrategicBase[] {
  const isRo = locale === "ro";

  const domesticMapBases = domesticBases.map((base): StrategicBase => ({
    ID: `domestic-${base.id}`,
    Name: base.name,
    Country: base.state,
    Region: getDomesticRegion(base),
    Coordinates: base.coordinates,
    "Primary Branch": base.branch,
    "Operational Focus": base.description || (isRo
      ? "Instalație domestică din rețeaua de generare și susținere a forței."
      : "Domestic installation in the force-generation and sustainment network."),
    "Critical Infrastructure": getInfraCapabilities(base.branch, base.name, isRo),
    "Strategic Rationale": isRo
      ? `Nod logistic și de generare a forței în ${base.state}.`
      : `Force-generation and logistical command node in ${base.state}.`,
    "Image URL": SITE_IMAGES.homeUsaAtNightFromSpace,
  }));

  const overseasMapBases = overseasBases.map((base): StrategicBase => ({
    ID: `overseas-${base.id}`,
    Name: base.name,
    Country: base.country,
    Region: getOverseasRegion(base),
    Coordinates: base.coordinates,
    "Primary Branch": base.branch,
    "Operational Focus": base.description || (isRo
      ? "Instalație externă din rețeaua avansată de acces și susținere."
      : "Overseas installation in the forward access and sustainment network."),
    "Critical Infrastructure": getInfraCapabilities(base.branch, base.name, isRo),
    "Strategic Rationale": isRo
      ? `Instalație externă avansată în ${base.country}.`
      : `Forward-deployed security footprint in ${base.country}.`,
    "Image URL": SITE_IMAGES.homeUsaAtNightFromSpace,
  }));

  return [...domesticMapBases, ...overseasMapBases];
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
      {children}
    </div>
  );
}

function SectionTitle({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-5xl">
      <SectionKicker>{label}</SectionKicker>
      <h2 className="max-w-4xl text-[clamp(32px,6vw,76px)] font-black uppercase leading-[0.92] tracking-tight text-white">
        {title}
      </h2>
      {body && <p className="mt-7 max-w-3xl text-sm leading-7 text-zinc-400">{body}</p>}
    </div>
  );
}

export function GlobalBasesHero({
  stats,
  locale = "en",
}: {
  stats: { value: string; label: string }[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <video
        src="/videos/earth-pixels-from-space.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover brightness-[0.68] saturate-[0.85] opacity-[0.68]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 24%, rgba(0,0,0,0.76) 100%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,transparent,#000)]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pt-20 pb-12 text-center md:py-24">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400 opacity-75">
          {isRo ? "REȚEA GLOBALĂ DE BAZE A STATELOR UNITE" : "UNITED STATES GLOBAL BASE NETWORK"}
        </div>

        <h1 className="mt-4 md:mt-8 text-[clamp(52px,10vw,150px)] font-black uppercase leading-[0.86] tracking-tight text-white opacity-80">
          {isRo ? "Amprentă planetară" : "Planetary Footprint"}
        </h1>

        <p className="mt-6 md:mt-12 max-w-2xl font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.28em] text-zinc-300 opacity-70">
          {isRo
            ? "O arhitectură de acces, logistică și alianțe care transformă distanța globală într-un avantaj operațional."
            : "An architecture of access, logistics, and alliances that turns global distance into an operational advantage."}
        </p>

        <div className="mt-10 md:mt-20 flex flex-wrap justify-center gap-x-14 gap-y-6 opacity-75">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 font-mono text-[11px] font-black uppercase tracking-widest text-white/70">{stat.label}</div>
              <div className="text-2xl font-black tracking-tight text-white/80 md:text-3xl">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StrategicThesis({ locale = "en" }: { locale?: Locale }) {
  const isRo = locale === "ro";

  return (
    <section className="bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <SectionKicker>{isRo ? "TEZA STRATEGICĂ" : "STRATEGIC THESIS"}</SectionKicker>
        <p className="max-w-5xl text-[clamp(30px,5vw,68px)] font-black uppercase leading-[0.98] tracking-tight text-white">
          {isRo
            ? "Bazele sunt timp cumpărat în avans: combustibil, porturi, piste, comunicații, spitale și aliați deja integrați înainte de prima zi a crizei."
            : "Bases provide pre-positioned time: fuel, ports, runways, communications, hospitals, and repair bays already at the potential point of conflict."}
        </p>
      </div>
    </section>
  );
}

function BaseDetailDrawer({
  base,
  onClose,
  locale = "en",
  showLocateButton = true,
}: {
  base: StrategicBase | null;
  onClose: () => void;
  locale?: Locale;
  showLocateButton?: boolean;
}) {
  const isRo = locale === "ro";

  return (
    <AnimatePresence>
      {base && (
        <>
          <motion.div
            className="fixed inset-0 z-[110] bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[120] w-full max-w-xl overflow-y-auto bg-zinc-950 p-6 text-white shadow-2xl sm:p-9"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="mb-10 flex h-10 w-10 items-center justify-center bg-zinc-900 text-zinc-400 transition-colors hover:text-white"
              aria-label="Close base detail"
            >
              <X size={18} />
            </button>

            <div className="relative mb-9 aspect-[16/9] overflow-hidden bg-zinc-900">
              <Image src={base["Image URL"]} alt={base.Name} fill className="object-cover grayscale" sizes="576px" />
              <div className="absolute inset-0 bg-black/35" />
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              {base.Country} / {isRo ? (
                base.Region === "Europe" ? "Europa" :
                base.Region === "Indo-Pacific" ? "Indo-Pacific" :
                base.Region === "Middle East" ? "Orientul Mijlociu" :
                base.Region === "Americas" ? "Americile" :
                base.Region === "Africa" ? "Africa" :
                base.Region === "Arctic / High North" ? "Arctica / High North" :
                base.Region
              ) : base.Region}
            </div>
            <h3 className="mt-4 text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.9] tracking-tight">
              {base.Name}
            </h3>

            <div className="mt-8 grid gap-4 border-y border-zinc-900 py-6 sm:grid-cols-2">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  {isRo ? "Coordonate" : "Coordinates"}
                </div>
                <div className="mt-2 font-mono text-xs text-zinc-300">{base.Coordinates}</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  {isRo ? "Ramură principală" : "Primary Branch"}
                </div>
                <div className="mt-2 font-mono text-xs text-zinc-300">{base["Primary Branch"]}</div>
              </div>
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {isRo ? "Obiectiv operațional" : "Operational Focus"}
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{base["Operational Focus"]}</p>
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {isRo ? "Infrastructură critică" : "Critical Infrastructure"}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {base["Critical Infrastructure"].map((item) => (
                  <span key={item} className="bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {isRo ? "Raționament strategic" : "Strategic Rationale"}
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{base["Strategic Rationale"]}</p>
            </div>

            {showLocateButton && (
              <button
                type="button"
                onClick={() => {
                  const locateEvent = new CustomEvent("locate-base-on-map", {
                    detail: { baseId: base.ID }
                  });
                  window.dispatchEvent(locateEvent);
                  onClose();
                }}
                className="mt-10 flex w-full items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black py-3 px-4 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                <MapPin size={12} />
                {isRo ? "Localizează pe hartă" : "Locate on Map"}
              </button>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function GlobalCommandMap({
  bases,
  domesticBases = [],
  overseasBases = [],
  regions,
  locale = "en",
}: {
  bases: StrategicBase[];
  domesticBases?: DomesticBase[];
  overseasBases?: OverseasBase[];
  regions: RegionBrief[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";
  const [isMapMounted, setIsMapMounted] = useState(false);
  const [activeRegionId, setActiveRegionId] = useState<GlobalBaseRegion>("Europe");
  const [selectedBase, setSelectedBase] = useState<StrategicBase | null>(null);

  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [12, 24],
    zoom: 1,
  });

  const mapBases = useMemo(
    () => [
      ...bases,
      ...getDirectoryMapBases({ domesticBases, overseasBases, locale }),
    ],
    [bases, domesticBases, overseasBases, locale]
  );

  const activeRegion = regions.find((region) => region.id === activeRegionId) ?? regions[0];
  const activeRegionBases = useMemo(
    () => mapBases.filter((base) => base.Region === activeRegionId),
    [activeRegionId, mapBases]
  );

  const clusters = useMemo(
    () => getClusters(mapBases, position.zoom, selectedBase?.ID || null),
    [mapBases, position.zoom, selectedBase]
  );

  useEffect(() => {
    setIsMapMounted(true);
  }, []);

  useEffect(() => {
    const handleLocateBase = (e: Event) => {
      const customEvent = e as CustomEvent<{ baseId: string }>;
      const baseId = customEvent.detail.baseId;
      const targetBase = mapBases.find(
        (b) =>
          b.ID === baseId ||
          b.ID === `domestic-${baseId}` ||
          b.ID === `overseas-${baseId}`
      );
      if (targetBase) {
        setSelectedBase(targetBase);
        const baseCoords = parseCoordinates(targetBase.Coordinates);
        setPosition({
          coordinates: baseCoords,
          zoom: 5,
        });
        setActiveRegionId(targetBase.Region);

        const mapEl = document.getElementById("global-command-map");
        if (mapEl) {
          mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    window.addEventListener("locate-base-on-map", handleLocateBase);
    return () => {
      window.removeEventListener("locate-base-on-map", handleLocateBase);
    };
  }, [mapBases]);

  const handleRegionClick = (regionId: GlobalBaseRegion) => {
    setActiveRegionId(regionId);
    const viewport = REGION_VIEWPORTS[regionId];
    if (viewport) {
      setPosition(viewport);
    }
  };

  const handleZoomIn = () => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.min(pos.zoom * 1.5, 150),
    }));
  };

  const handleZoomOut = () => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.max(pos.zoom / 1.5, 1),
    }));
  };

  const handleReset = () => {
    setPosition({
      coordinates: [12, 24],
      zoom: 1,
    });
  };

  const handleMoveEnd = (newPosition: { coordinates: [number, number]; zoom: number }) => {
    setPosition(newPosition);
  };

  const handleClusterClick = (cluster: Cluster) => {
    const nextZoom = Math.min(position.zoom * 1.8, 150);
    setPosition({
      coordinates: cluster.center,
      zoom: nextZoom,
    });

    const firstBase = cluster.bases[0];
    if (firstBase) {
      setActiveRegionId(firstBase.Region);
    }
  };

  const handleBaseSelect = (base: StrategicBase) => {
    setSelectedBase(base);
    const baseCoords = parseCoordinates(base.Coordinates);
    setPosition({
      coordinates: baseCoords,
      zoom: 5,
    });
    setActiveRegionId(base.Region);
  };

  return (
    <section id="global-command-map" className="bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "HARTA DE COMANDĂ" : "GLOBAL COMMAND MAP"}
          title={isRo ? "Geografia devine timp de răspuns." : "Geography becomes response time."}
          body={isRo
            ? "Selectați un teatru pentru a vedea scopul strategic. Selectați un nod alb pentru dosarul bazei."
            : "Select a theater to review the strategic purpose. Select a white node for the base dossier."}
        />

        <div className="grid min-h-[720px] overflow-hidden bg-zinc-950 lg:h-[780px] lg:grid-cols-[1fr_420px]">
          <div className="relative bg-black">
            <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => handleRegionClick(region.id)}
                  className={
                    activeRegionId === region.id
                      ? "bg-white px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-black cursor-pointer"
                      : "bg-zinc-950 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white cursor-pointer"
                  }
                >
                  {isRo ? (
                    region.id === "Europe" ? "Europa" :
                    region.id === "Indo-Pacific" ? "Indo-Pacific" :
                    region.id === "Middle East" ? "Orientul Mijlociu" :
                    region.id === "Americas" ? "Americile" :
                    region.id === "Africa" ? "Africa" :
                    region.id === "Arctic / High North" ? "Arctica / High North" :
                    region.id
                  ) : region.id}
                </button>
              ))}
            </div>

            <div className="h-[620px] pt-20 lg:h-full">
              {isMapMounted ? (
                <div className="relative h-full w-full">
                  <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 112 }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <ZoomableGroup
                      center={position.coordinates}
                      zoom={position.zoom}
                      maxZoom={150}
                      minZoom={1}
                      onMoveEnd={handleMoveEnd}
                      translateExtent={[[0, 0], [800, 600]]}
                      filterZoomEvent={(e: any) => e.type !== "dblclick"}
                    >
                      <Geographies geography={WORLD_GEO_URL}>
                        {({ geographies }: { geographies: any[] }) =>
                          geographies.map((geo) => (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              style={{
                                default: {
                                  fill: "#18181b",
                                  stroke: "#27272a",
                                  strokeWidth: 0.34 / position.zoom,
                                  outline: "none",
                                },
                                hover: {
                                  fill: "#202024",
                                  stroke: "#3f3f46",
                                  strokeWidth: 0.34 / position.zoom,
                                  outline: "none",
                                },
                                pressed: {
                                  fill: "#18181b",
                                  outline: "none",
                                },
                              }}
                            />
                          ))
                        }
                      </Geographies>

                      {/* Sort clusters so the selected base renders ON TOP of neighboring clusters */}
                      {[...clusters]
                        .sort((a, b) => {
                          const aIsSelected = a.bases.length === 1 && a.bases[0].ID === selectedBase?.ID;
                          const bIsSelected = b.bases.length === 1 && b.bases[0].ID === selectedBase?.ID;
                          return aIsSelected ? 1 : bIsSelected ? -1 : 0;
                        })
                        .map((cluster) => {
                        if (cluster.bases.length === 1) {
                          const base = cluster.bases[0];
                          const isActiveRegion = base.Region === activeRegionId;
                          const isSelected = selectedBase?.ID === base.ID;
                          const r = isSelected ? 5.5 : isActiveRegion ? 4 : 2.5;

                          return (
                            <Marker key={base.ID} coordinates={cluster.center}>
                              <g
                                role="button"
                                tabIndex={0}
                                aria-label={base.Name}
                                onClick={() => handleBaseSelect(base)}
                                onKeyDown={(event: KeyboardEvent<SVGGElement>) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    handleBaseSelect(base);
                                  }
                                }}
                                className="cursor-pointer"
                              >
                                <circle
                                  r={18 / position.zoom}
                                  fill="transparent"
                                />
                                <circle
                                  r={r / position.zoom}
                                  fill="#fafafa"
                                  opacity={isActiveRegion ? 1 : 0.42}
                                  pointerEvents="none"
                                />
                                {isSelected && (
                                  <circle
                                    r={(r + 3) / position.zoom}
                                    fill="none"
                                    stroke="#fafafa"
                                    strokeWidth={1 / position.zoom}
                                    opacity={0.6}
                                    pointerEvents="none"
                                  />
                                )}
                              </g>
                            </Marker>
                          );
                        } else {
                          const hasActiveBase = cluster.bases.some((b) => b.Region === activeRegionId);

                          return (
                            <Marker key={cluster.id} coordinates={cluster.center}>
                              <g
                                role="button"
                                tabIndex={0}
                                onClick={() => handleClusterClick(cluster)}
                                onKeyDown={(event: KeyboardEvent<SVGGElement>) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    handleClusterClick(cluster);
                                  }
                                }}
                                className="cursor-pointer select-none"
                              >
                                <circle
                                  r={22 / position.zoom}
                                  fill="transparent"
                                />
                                <circle
                                  r={14 / position.zoom}
                                  fill="rgba(250, 250, 250, 0.12)"
                                  stroke="#fafafa"
                                  strokeWidth={1 / position.zoom}
                                  opacity={hasActiveBase ? 0.85 : 0.4}
                                />
                                <circle
                                  r={10 / position.zoom}
                                  fill="#09090b"
                                />
                                <text
                                  textAnchor="middle"
                                  y={3 / position.zoom}
                                  style={{
                                    fontFamily: "monospace",
                                    fontSize: `${9 / position.zoom}px`,
                                    fill: hasActiveBase ? "#fafafa" : "#71717a",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {cluster.bases.length}
                                </text>
                              </g>
                            </Marker>
                          );
                        }
                      })}
                    </ZoomableGroup>
                  </ComposableMap>

                  {/* Zoom Controls */}
                  <div className="absolute bottom-8 left-6 z-10 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleZoomIn}
                      className="flex h-8 w-8 items-center justify-center bg-zinc-950 text-zinc-400 border border-zinc-800 transition-colors hover:bg-zinc-900 hover:text-white cursor-pointer"
                      aria-label="Zoom in"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleZoomOut}
                      className="flex h-8 w-8 items-center justify-center bg-zinc-950 text-zinc-400 border border-zinc-800 transition-colors hover:bg-zinc-900 hover:text-white cursor-pointer"
                      aria-label="Zoom out"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex h-8 w-8 items-center justify-center bg-zinc-950 text-zinc-400 border border-zinc-800 transition-colors hover:bg-zinc-900 hover:text-white cursor-pointer"
                      aria-label="Reset map view"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[560px] items-center justify-center bg-black">
                  <div className="h-px w-40 bg-zinc-900" />
                </div>
              )}
            </div>
          </div>

          <aside className="border-t border-zinc-800/40 bg-zinc-950 p-7 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-9">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              {isRo ? "Briefing teatru" : "Theater Brief"}
            </div>
            <h3 className="mt-4 text-4xl font-black uppercase leading-none tracking-tight text-white">{activeRegion.label}</h3>
            <p className="mt-6 text-sm leading-7 text-zinc-400">{activeRegion.purpose}</p>

            <div className="mt-8 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  {isRo ? "Instalații majore" : "Major Installations"}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeRegion.majorInstallations.map((item) => (
                    <span key={item} className="bg-zinc-900 px-2 py-1 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  {isRo ? "Comandamente sprijinite" : "Supported Commands"}
                </div>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300">
                  {activeRegion.supportedCommands.join(" / ")}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  {isRo ? "Rol strategic" : "Strategic Role"}
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{activeRegion.strategicRole}</p>
              </div>

              <div className="border-t border-zinc-900 pt-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  {isRo ? "Noduri mapate" : "Mapped Nodes"}
                </div>
                <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1 lg:max-h-none">
                  {activeRegionBases.map((base) => (
                    <button
                      key={base.ID}
                      type="button"
                      onClick={() => handleBaseSelect(base)}
                      className="block w-full bg-black px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white cursor-pointer"
                    >
                      {base.Name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <BaseDetailDrawer base={selectedBase} onClose={() => setSelectedBase(null)} locale={locale} showLocateButton={false} />
    </section>
  );
}

export function RegionalTheaterGrid({
  theaters,
  locale = "en",
}: {
  theaters: TheaterCard[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";

  return (
    <section className="bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "TEATRE REGIONALE" : "REGIONAL THEATERS"}
          title={isRo ? "Patru funcții. O singură rețea." : "Four functions. One network."}
        />

        <div className="grid gap-px bg-zinc-900 md:grid-cols-2 xl:grid-cols-4">
          {theaters.map((theater) => (
            <article key={theater.title} className="group relative min-h-[440px] overflow-hidden bg-black p-7">
              <Image
                src={theater.imageUrl}
                alt={`${theater.title} theater`}
                fill
                className="object-cover opacity-30 grayscale transition-opacity duration-500 group-hover:opacity-42"
                sizes="(max-width: 1280px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),#000_86%)]" />
              <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">{theater.designation}</div>
                <h3 className="mt-4 text-3xl font-black uppercase leading-none tracking-tight text-white">{theater.title}</h3>
                <p className="mt-5 text-sm leading-7 text-zinc-400">{theater.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BaseDossierSection({
  bases,
  locale = "en",
}: {
  bases: StrategicBase[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";
  const [selectedBase, setSelectedBase] = useState<StrategicBase | null>(null);

  return (
    <section className="bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle
          label={isRo ? "DOSARE DE BAZĂ" : "BASE DOSSIERS"}
          title={isRo ? "Instalații care schimbă timpul strategic." : "Installations that change strategic time."}
        />

        <div className="border-y border-zinc-900">
          {bases.slice(0, 7).map((base) => (
            <button
              key={base.ID}
              type="button"
              onClick={() => setSelectedBase(base)}
              className="group grid w-full gap-6 border-b border-zinc-900 py-8 text-left transition-colors last:border-b-0 hover:bg-zinc-950/40 md:grid-cols-[160px_220px_1fr_auto] md:items-center"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{base.Country}</div>
              <div className="relative aspect-[16/9] w-full max-w-[280px] overflow-hidden border border-zinc-800 bg-zinc-950 transition-colors duration-300 group-hover:border-zinc-700 md:w-[220px]">
                <Image
                  src={base["Image URL"]}
                  alt={base.Name}
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 280px, 220px"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">{base.Name}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">{base["Strategic Rationale"]}</p>
              </div>
              <div className="self-start bg-zinc-900 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-300 transition-colors group-hover:bg-zinc-800 group-hover:text-white md:self-auto">
                {isRo ? "Deschide dosar" : "Open Dossier"}
              </div>
            </button>
          ))}
        </div>
      </div>

      <BaseDetailDrawer base={selectedBase} onClose={() => setSelectedBase(null)} locale={locale} />
    </section>
  );
}

export function LogisticsBackboneSection({
  nodes,
  locale = "en",
}: {
  nodes: LogisticsNode[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";

  return (
    <section className="bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle
          label={isRo ? "TRANSCOM / COLOANA LOGISTICĂ" : "TRANSCOM / LOGISTICS BACKBONE"}
          title={isRo ? "Lanțul de aprovizionare ca armă strategică." : "The supply chain as strategic weapon."}
          body={isRo
            ? "În timp ce competitorii se blochează în frontiere terestre, motorul logistic american poate proiecta o brigadă blindată sau un spital operațional peste oceane în 72 de ore."
            : "While competitors struggle across land borders, the U.S. logistics engine can project an armored brigade or a fully operational hospital across oceans in 72 hours."}
        />

        <div className="grid gap-px bg-zinc-900 lg:grid-cols-4">
          {nodes.map((node, index) => (
            <article key={node.title} className="relative bg-black p-7">
              <div className="mb-12 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-800" />
                {index < nodes.length - 1 && <div className="h-px w-8 bg-zinc-700" />}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{node.label}</div>
              <h3 className="mt-4 text-2xl font-black uppercase leading-none tracking-tight text-white">{node.title}</h3>
              <p className="mt-5 text-sm leading-7 text-zinc-400">{node.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-px bg-zinc-900 md:grid-cols-4">
          {[
            { icon: Plane, label: isRo ? "Cordoane aeriene" : "Airlift corridors" },
            { icon: Ship, label: isRo ? "Noduri maritime" : "Sealift nodes" },
            { icon: Package, label: isRo ? "Stocuri prepoziționate" : "Prepositioned stock" },
            { icon: Building2, label: isRo ? "Combustibil / reparații / medical / comunicații" : "Fuel / repair / medical / comms" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 bg-black p-5">
              <item.icon className="text-zinc-400" size={18} strokeWidth={1.5} />
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AllianceArchitectureSection({
  alliances,
  locale = "en",
}: {
  alliances: AllianceNode[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";

  return (
    <section className="bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle
          label={isRo ? "ARHITECTURĂ DE ALIANȚĂ" : "ALLIANCE ARCHITECTURE"}
          title={isRo ? "Infrastructură politică și beton fizic." : "Political infrastructure alongside physical concrete."}
        />

        <div className="space-y-0 border-y border-zinc-900">
          {alliances.map((alliance) => (
            <article key={alliance.partner} className="grid gap-4 border-b border-zinc-900 py-8 last:border-b-0 md:grid-cols-[240px_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <Handshake className="text-zinc-500" size={16} strokeWidth={1.5} />
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-white">{alliance.partner}</h3>
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{alliance.posture}</div>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-zinc-400">{alliance.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GlobalBasesClosing({ locale = "en" }: { locale?: Locale }) {
  const isRo = locale === "ro";

  const branches = [
    {
      href: "/military/navy",
      label: isRo ? "Marina" : "Navy",
    },
    {
      href: "/military/space-force",
      label: isRo ? "Forțele Spațiale" : "Space Force",
    },
    {
      href: "/military/air-force",
      label: isRo ? "Forțele Aeriene" : "Air Force",
    },
    {
      href: "/military/intelligence",
      label: isRo ? "Informații" : "Intelligence",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-32 sm:px-10 md:py-40 lg:px-16 border-t border-zinc-900">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="relative mx-auto max-w-[1000px] text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="flex justify-center mb-8">
            <Network className="text-zinc-500" size={32} strokeWidth={1.2} />
          </motion.div>
          
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(32px,8vw,96px)] font-black uppercase leading-[0.88] tracking-tight text-white"
          >
            {isRo ? "Amprentă planetară" : "Planetary footprint"}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(32px,8vw,96px)] font-black uppercase leading-[0.88] tracking-tight text-zinc-900 mt-1"
          >
            {isRo ? "prezență absolută." : "absolute presence."}
          </motion.div>
          
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-10 max-w-2xl text-sm leading-[1.9] text-zinc-500"
          >
            {isRo
              ? "O rețea de piste, porturi, depozite, senzori și parteneriate care transformă puterea americană din potențial în prezență."
              : "A network of runways, ports, stocks, sensors, and partnerships that turns American power from potential into presence."}
          </motion.p>
        </motion.div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/military"
            className="group inline-flex h-12 items-center gap-3 bg-white px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-black transition-colors hover:bg-zinc-200"
          >
            {isRo ? "Prezentare militară" : "Military overview"}
            <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-24 pt-16 border-t border-zinc-900">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-600 mb-8">
            {isRo ? "ALTE DIMENSIUNI MILITARE" : "OTHER MILITARY DIMENSIONS"}
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {branches.map((branch) => (
              <Link
                key={branch.href}
                href={branch.href}
                className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:text-white"
              >
                {branch.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DomesticBasesSection({
  bases,
  locale = "en",
}: {
  bases: DomesticBase[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<ServiceBranch | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBaseForPopup, setSelectedBaseForPopup] = useState<StrategicBase | null>(null);

  const BRANCHES: (ServiceBranch | "All")[] = [
    "All",
    "Joint",
    "Army",
    "Navy",
    "Marine Corps",
    "Air Force",
    "Space Force",
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedBranch]);

  const filteredBases = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return bases.filter((base) => {
      const matchesSearch =
        base.name.toLowerCase().includes(query) ||
        base.state.toLowerCase().includes(query);
      const matchesBranch = selectedBranch === "All" || base.branch === selectedBranch;

      return matchesSearch && matchesBranch;
    });
  }, [searchQuery, selectedBranch, bases]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredBases.length / itemsPerPage);
  const paginatedBases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBases.slice(start, start + itemsPerPage);
  }, [filteredBases, currentPage]);

  const mapDomesticBase = (base: DomesticBase, isRo: boolean): StrategicBase => ({
    ID: `domestic-${base.id}`,
    Name: base.name,
    Country: base.state,
    Region: getDomesticRegion(base),
    Coordinates: base.coordinates,
    "Primary Branch": base.branch,
    "Operational Focus": base.description || (isRo
      ? "Instalație domestică din rețeaua de generare și susținere a forței."
      : "Domestic installation in the force-generation and sustainment network."),
    "Critical Infrastructure": getInfraCapabilities(base.branch, base.name, isRo),
    "Strategic Rationale": isRo
      ? `Nod logistic și de generare a forței în ${base.state}.`
      : `Force-generation and logistical command node in ${base.state}.`,
    "Image URL": base.imageUrl ?? SITE_IMAGES.homeUsaAtNightFromSpace,
  });

  return (
    <section className="bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "INFRASTRUCTURĂ DOMESTICĂ" : "DOMESTIC INFRASTRUCTURE"}
          title={isRo ? "Arsenalul Democrației." : "The Arsenal of Democracy."}
          body={
            isRo
              ? "Fundația logistică și de generare a forțelor pe teritoriul continental al SUA. Căutați prin sute de facilități active."
              : "The continental force-generation and logistics foundation. Search across hundreds of active CONUS facilities."
          }
        />

        <div className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-zinc-900 pb-8 md:flex-row md:items-end">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-0 top-1 text-zinc-600" size={14} />
            <input
              type="text"
              placeholder={isRo ? "CĂUTARE BAZĂ SAU STAT..." : "SEARCH BASE OR STATE..."}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-transparent pb-2 pl-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white placeholder-zinc-700 transition-colors focus:border-zinc-500 focus:outline-none"
              style={{ borderBottom: "1px solid #27272a" }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {BRANCHES.map((branch) => (
              <button
                key={branch}
                type="button"
                onClick={() => setSelectedBranch(branch)}
                className={`cursor-pointer px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
                  selectedBranch === branch
                    ? "bg-white text-black"
                    : "bg-zinc-950 text-zinc-500 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {branch === "All" && isRo ? "Toate" : branch}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="mb-6 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
            <span>{isRo ? "INSTALAȚIE" : "INSTALLATION"}</span>
            <span>
              {filteredBases.length} {isRo ? "REZULTATE" : "RESULTS"}
            </span>
          </div>

          {paginatedBases.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedBases.map((base) => {
                  return (
                    <div
                      key={base.id}
                      onClick={() => setSelectedBaseForPopup(mapDomesticBase(base, isRo))}
                      className="cursor-pointer group flex flex-col justify-between border-t border-zinc-900 pt-3 transition-colors hover:border-zinc-700"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium tracking-wide text-zinc-300 transition-colors group-hover:text-white">
                            {base.name}
                          </h4>
                          <span className="text-[9px] font-mono uppercase text-zinc-600 group-hover:text-zinc-400 mt-1 select-none">
                            {isRo ? "[DETALII]" : "[BRIEFING]"}
                          </span>
                        </div>
                        {base.description && (
                          <p className="mt-2 text-xs leading-relaxed text-zinc-500 line-clamp-2 transition-colors group-hover:text-zinc-400">
                            {base.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                        <span>{base.state}</span>
                        <span className="text-zinc-500">{base.branch}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between border-t border-zinc-900 pt-6 font-mono text-[10px] tracking-wider text-zinc-500">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-zinc-800 disabled:hover:text-zinc-800"
                  >
                    {isRo ? "← PRECEDENT" : "← PREVIOUS"}
                  </button>
                  <div className="flex items-center gap-3">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`cursor-pointer px-2 py-1 transition-colors ${
                          currentPage === page
                            ? "text-white font-bold border-b border-white"
                            : "text-zinc-600 hover:text-zinc-400"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-zinc-800 disabled:hover:text-zinc-800"
                  >
                    {isRo ? "URMĂTOR →" : "NEXT →"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
              {isRo ? "Nu există rezultate." : "No facilities match criteria."}
            </div>
          )}
        </div>
      </div>
      <BaseDetailDrawer
        base={selectedBaseForPopup}
        onClose={() => setSelectedBaseForPopup(null)}
        locale={locale}
      />
    </section>
  );
}

export function OverseasBasesSection({
  bases,
  locale = "en",
}: {
  bases: OverseasBase[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<ServiceBranch | "All">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBaseForPopup, setSelectedBaseForPopup] = useState<StrategicBase | null>(null);

  const BRANCHES: (ServiceBranch | "All")[] = [
    "All",
    "Joint",
    "Army",
    "Navy",
    "Marine Corps",
    "Air Force",
    "Space Force",
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedBranch]);

  const filteredBases = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return bases.filter((base) => {
      const matchesSearch =
        base.name.toLowerCase().includes(query) ||
        base.country.toLowerCase().includes(query);
      const matchesBranch = selectedBranch === "All" || base.branch === selectedBranch;

      return matchesSearch && matchesBranch;
    });
  }, [searchQuery, selectedBranch, bases]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredBases.length / itemsPerPage);
  const paginatedBases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBases.slice(start, start + itemsPerPage);
  }, [filteredBases, currentPage]);

  const mapOverseasBase = (base: OverseasBase, isRo: boolean): StrategicBase => ({
    ID: `overseas-${base.id}`,
    Name: base.name,
    Country: base.country,
    Region: getOverseasRegion(base),
    Coordinates: base.coordinates,
    "Primary Branch": base.branch,
    "Operational Focus": base.description || (isRo
      ? "Instalație externă din rețeaua avansată de acces și susținere."
      : "Overseas installation in the forward access and sustainment network."),
    "Critical Infrastructure": getInfraCapabilities(base.branch, base.name, isRo),
    "Strategic Rationale": isRo
      ? `Instalație externă avansată în ${base.country}.`
      : `Forward-deployed security footprint in ${base.country}.`,
    "Image URL": SITE_IMAGES.homeUsaAtNightFromSpace,
  });

  return (
    <section className="border-t border-zinc-900 bg-zinc-950 px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "INFRASTRUCTURĂ EXTERNĂ (OCONUS)" : "OVERSEAS INFRASTRUCTURE (OCONUS)"}
          title={isRo ? "Profunzime strategică." : "Strategic Depth."}
          body={
            isRo
              ? "Rețeaua avansată de facilități, stații radar, noduri logistice și acorduri de acces pe șase continente."
              : "The forward network of facilities, radar stations, logistics nodes, and access agreements across six continents."
          }
        />

        <div className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-zinc-800 pb-8 md:flex-row md:items-end">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-0 top-1 text-zinc-500" size={14} />
            <input
              type="text"
              placeholder={isRo ? "CĂUTARE BAZĂ SAU ȚARĂ..." : "SEARCH BASE OR COUNTRY..."}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-transparent pb-2 pl-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white placeholder-zinc-600 transition-colors focus:border-zinc-400 focus:outline-none"
              style={{ borderBottom: "1px solid #3f3f46" }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {BRANCHES.map((branch) => (
              <button
                key={branch}
                type="button"
                onClick={() => setSelectedBranch(branch)}
                className={`cursor-pointer px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors ${
                  selectedBranch === branch
                    ? "bg-white text-black"
                    : "border border-zinc-800 bg-black text-zinc-500 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {branch === "All" && isRo ? "Toate" : branch}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="mb-6 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
            <span>{isRo ? "INSTALAȚIE" : "INSTALLATION"}</span>
            <span>
              {filteredBases.length} {isRo ? "REZULTATE" : "RESULTS"}
            </span>
          </div>

          {paginatedBases.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedBases.map((base) => {
                  return (
                    <div
                      key={base.id}
                      onClick={() => setSelectedBaseForPopup(mapOverseasBase(base, isRo))}
                      className="cursor-pointer group flex flex-col justify-between border-t border-zinc-800 pt-3 transition-colors hover:border-zinc-600"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium tracking-wide text-zinc-300 transition-colors group-hover:text-white">
                            {base.name}
                          </h4>
                          <span className="text-[9px] font-mono uppercase text-zinc-600 group-hover:text-zinc-400 mt-1 select-none">
                            {isRo ? "[DETALII]" : "[BRIEFING]"}
                          </span>
                        </div>
                        {base.description && (
                          <p className="mt-2 text-xs leading-relaxed text-zinc-500 line-clamp-2 transition-colors group-hover:text-zinc-400">
                            {base.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                        <span className="text-white/70">{base.country}</span>
                        <span className="text-zinc-600">{base.branch}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between border-t border-zinc-800 pt-6 font-mono text-[10px] tracking-wider text-zinc-500">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-zinc-800 disabled:hover:text-zinc-800"
                  >
                    {isRo ? "← PRECEDENT" : "← PREVIOUS"}
                  </button>
                  <div className="flex items-center gap-3">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`cursor-pointer px-2 py-1 transition-colors ${
                          currentPage === page
                            ? "text-white font-bold border-b border-white"
                            : "text-zinc-600 hover:text-zinc-400"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-zinc-800 disabled:hover:text-zinc-800"
                  >
                    {isRo ? "URMĂTOR →" : "NEXT →"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
              {isRo ? "Nu există rezultate." : "No facilities match criteria."}
            </div>
          )}
        </div>
      </div>
      <BaseDetailDrawer
        base={selectedBaseForPopup}
        onClose={() => setSelectedBaseForPopup(null)}
        locale={locale}
      />
    </section>
  );
}
