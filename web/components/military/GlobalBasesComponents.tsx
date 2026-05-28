"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {
  ArrowUpRight,
  Building2,
  Handshake,
  MapPin,
  Network,
  Package,
  Plane,
  Ship,
  X,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { SITE_IMAGES } from "@/lib/site-images";
import type {
  AllianceNode,
  GlobalBaseRegion,
  LogisticsNode,
  RegionBrief,
  StrategicBase,
  TheaterCard,
} from "@/lib/data/global-bases-data";

const WORLD_GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function parseCoordinates(coordinates: string): [number, number] {
  const [lat, lon] = coordinates.split(",").map((value) => Number(value.trim()));
  return [lon, lat];
}

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
      <Image
        src={SITE_IMAGES.homeUsaAtNightFromSpace}
        alt="Earth at night showing North America and global operating depth"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 24%, rgba(0,0,0,0.76) 100%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(180deg,transparent,#000)]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400">
          {isRo ? "REȚEA GLOBALĂ DE BAZE A STATELOR UNITE" : "UNITED STATES GLOBAL BASE NETWORK"}
        </div>

        <h1 className="mt-8 text-[clamp(52px,10vw,150px)] font-black uppercase leading-[0.86] tracking-tight text-white">
          {isRo ? "Amprentă planetară" : "Planetary Footprint"}
        </h1>

        <p className="mt-12 max-w-2xl font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.28em] text-zinc-300">
          {isRo
            ? "O arhitectură de acces, logistică și alianțe care transformă distanța globală într-un avantaj operațional."
            : "An architecture of access, logistics, and alliances that turns global distance into an operational advantage."}
        </p>

        <div className="mt-20 flex flex-wrap justify-center gap-x-14 gap-y-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 font-mono text-[11px] font-black uppercase tracking-widest text-white/50">{stat.label}</div>
              <div className="text-2xl font-black tracking-tight text-white/90 md:text-3xl">{stat.value}</div>
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
            ? "Bazele nu sunt doar locații. Sunt timp cumpărat în avans: combustibil, porturi, piste, comunicații, spitale și aliați deja integrați înainte de prima zi a crizei."
            : "Bases are not just locations. They are time purchased in advance: fuel, ports, runways, communications, hospitals, and allies already integrated before the first day of a crisis."}
        </p>
      </div>
    </section>
  );
}

function BaseDetailDrawer({
  base,
  onClose,
}: {
  base: StrategicBase | null;
  onClose: () => void;
}) {
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
              {base.Country} / {base.Region}
            </div>
            <h3 className="mt-4 text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.9] tracking-tight">
              {base.Name}
            </h3>

            <div className="mt-8 grid gap-4 border-y border-zinc-900 py-6 sm:grid-cols-2">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">Coordinates</div>
                <div className="mt-2 font-mono text-xs text-zinc-300">{base.Coordinates}</div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">Primary Branch</div>
                <div className="mt-2 font-mono text-xs text-zinc-300">{base["Primary Branch"]}</div>
              </div>
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Operational Focus</div>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{base["Operational Focus"]}</p>
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Critical Infrastructure</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {base["Critical Infrastructure"].map((item) => (
                  <span key={item} className="bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Strategic Rationale</div>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{base["Strategic Rationale"]}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function GlobalCommandMap({
  bases,
  regions,
  locale = "en",
}: {
  bases: StrategicBase[];
  regions: RegionBrief[];
  locale?: Locale;
}) {
  const isRo = locale === "ro";
  const [isMapMounted, setIsMapMounted] = useState(false);
  const [activeRegionId, setActiveRegionId] = useState<GlobalBaseRegion>("Europe");
  const [selectedBase, setSelectedBase] = useState<StrategicBase | null>(null);

  const activeRegion = regions.find((region) => region.id === activeRegionId) ?? regions[0];
  const activeRegionBases = useMemo(
    () => bases.filter((base) => base.Region === activeRegionId),
    [activeRegionId, bases]
  );

  useEffect(() => {
    setIsMapMounted(true);
  }, []);

  return (
    <section className="bg-black px-6 py-28 sm:px-10 md:py-36 lg:px-16">
      <div className="mx-auto max-w-[1520px]">
        <SectionTitle
          label={isRo ? "HARTA DE COMANDĂ" : "GLOBAL COMMAND MAP"}
          title={isRo ? "Geografia devine timp de răspuns." : "Geography becomes response time."}
          body={isRo
            ? "Selectați un teatru pentru a vedea scopul strategic. Selectați un nod alb pentru dosarul bazei."
            : "Select a theater to review the strategic purpose. Select a white node for the base dossier."}
        />

        <div className="grid min-h-[720px] overflow-hidden bg-zinc-950 lg:grid-cols-[1fr_420px]">
          <div className="relative bg-black">
            <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveRegionId(region.id)}
                  className={
                    activeRegionId === region.id
                      ? "bg-white px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-black"
                      : "bg-zinc-950 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
                  }
                >
                  {region.id}
                </button>
              ))}
            </div>

            <div className="h-full min-h-[560px] pt-20">
              {isMapMounted ? (
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 112, center: [12, 24] }}
                  style={{ width: "100%", height: "100%" }}
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
                              strokeWidth: 0.34,
                              outline: "none",
                            },
                            hover: {
                              fill: "#202024",
                              stroke: "#3f3f46",
                              strokeWidth: 0.34,
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

                  {bases.map((base) => {
                    const isSelected = selectedBase?.ID === base.ID;
                    return (
                      <Marker key={base.ID} coordinates={parseCoordinates(base.Coordinates)}>
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label={base.Name}
                          onClick={() => setSelectedBase(base)}
                          onKeyDown={(event: KeyboardEvent<SVGGElement>) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setSelectedBase(base);
                            }
                          }}
                          className="cursor-pointer"
                        >
                          <circle
                            r={9}
                            fill="transparent"
                            stroke="transparent"
                            strokeWidth={0}
                            className="cursor-pointer"
                          />
                          <circle
                            r={isSelected ? 4 : 3}
                            fill="#fafafa"
                            opacity={1}
                            pointerEvents="none"
                          />
                        </g>
                      </Marker>
                    );
                  })}
                </ComposableMap>
              ) : (
                <div className="flex h-full min-h-[560px] items-center justify-center bg-black">
                  <div className="h-px w-40 bg-zinc-900" />
                </div>
              )}
            </div>
          </div>

          <aside className="border-t border-zinc-800/40 bg-zinc-950 p-7 lg:border-l lg:border-t-0 lg:p-9">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">Theater Brief</div>
            <h3 className="mt-4 text-4xl font-black uppercase leading-none tracking-tight text-white">{activeRegion.label}</h3>
            <p className="mt-6 text-sm leading-7 text-zinc-400">{activeRegion.purpose}</p>

            <div className="mt-8 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Major Installations</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeRegion.majorInstallations.map((item) => (
                    <span key={item} className="bg-zinc-900 px-2 py-1 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Supported Commands</div>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300">
                  {activeRegion.supportedCommands.join(" / ")}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Strategic Role</div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{activeRegion.strategicRole}</p>
              </div>

              <div className="border-t border-zinc-900 pt-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Mapped Nodes</div>
                <div className="mt-3 space-y-2">
                  {activeRegionBases.map((base) => (
                    <button
                      key={base.ID}
                      type="button"
                      onClick={() => setSelectedBase(base)}
                      className="block w-full bg-black px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
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

      <BaseDetailDrawer base={selectedBase} onClose={() => setSelectedBase(null)} />
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
              className="grid w-full gap-4 border-b border-zinc-900 py-8 text-left transition-colors last:border-b-0 hover:bg-zinc-950 md:grid-cols-[220px_1fr_auto]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{base.Country}</div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">{base.Name}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">{base["Strategic Rationale"]}</p>
              </div>
              <div className="self-start bg-zinc-900 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-300">
                Open Dossier
              </div>
            </button>
          ))}
        </div>
      </div>

      <BaseDetailDrawer base={selectedBase} onClose={() => setSelectedBase(null)} />
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
            { icon: Plane, label: "Airlift corridors" },
            { icon: Ship, label: "Sealift nodes" },
            { icon: Package, label: "Prepositioned stock" },
            { icon: Building2, label: "Fuel / repair / medical / comms" },
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
          title={isRo ? "Infrastructură politică, nu doar beton." : "Political infrastructure, not just concrete."}
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
