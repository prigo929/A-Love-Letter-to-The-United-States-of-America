"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ART_ASSETS } from "@/lib/data/art-assets";

// ─────────────────────────────────────────────────────────────────────────────
// PROPORTIONAL ARCHITECTURAL SCALE COMPARER
// ─────────────────────────────────────────────────────────────────────────────

interface ScaleBuilding {
  id: string;
  name: string;
  feet: number;
  meters: number;
  year: number;
  city: string;
  imageSrc: string;
}

const SCALE_BUILDINGS: ScaleBuilding[] = [
  {
    id: "wtc",
    name: "One World Trade",
    feet: 1776,
    meters: 541,
    year: 2013,
    city: "New York",
    imageSrc: ART_ASSETS.oneWTC.src,
  },
  {
    id: "cpt",
    name: "Central Park Tower",
    feet: 1550,
    meters: 472,
    year: 2020,
    city: "New York",
    imageSrc: ART_ASSETS.centralParkTower.src,
  },
  {
    id: "willis",
    name: "Willis Tower",
    feet: 1450,
    meters: 442,
    year: 1973,
    city: "Chicago",
    imageSrc: ART_ASSETS.willisTower.src,
  },
  {
    id: "esb",
    name: "Empire State",
    feet: 1250,
    meters: 381,
    year: 1931,
    city: "New York",
    imageSrc: ART_ASSETS.empireStateRockefeller.src,
  },
  {
    id: "chrysler",
    name: "Chrysler Building",
    feet: 1046,
    meters: 319,
    year: 1930,
    city: "New York",
    imageSrc: ART_ASSETS.chrysler.src,
  },
  {
    id: "eiffel",
    name: "Eiffel Tower (Ref)",
    feet: 1083,
    meters: 330,
    year: 1889,
    city: "Paris",
    imageSrc: ART_ASSETS.eiffelTower.src,
  },
];

export function ArchitecturalScaleComparer() {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const [selectedIds, setSelectedIds] = useState<string[]>(["wtc", "willis", "esb", "chrysler", "eiffel"]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 5) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const currentSelection = SCALE_BUILDINGS.filter((b) => selectedIds.includes(b.id));
  const maxFeet = 1776;

  return (
    <div className="border border-white/10 bg-[#080609] p-6 md:p-10 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
        <div>
          <p className="art-text-label mb-1" style={{ color: "var(--art-accent-copper)" }}>
            {isRo ? "Comparație Interactivă de Scară Arhitecturală" : "Interactive Architectural Scale Comparison"}
          </p>
          <h3 className="art-text-heading text-2xl md:text-3xl text-white">
            {isRo ? "Scara Înălțimilor în Proporție Reală" : "Proportional Height Scale Visualizer"}
          </h3>
        </div>

        <p className="font-mono text-xs text-white/50">
          {isRo ? "Alege clădirile pentru comparat:" : "Select towers to compare:"}
        </p>
      </div>

      {/* Building Selector Buttons */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {SCALE_BUILDINGS.map((b) => {
          const isSelected = selectedIds.includes(b.id);
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => toggleSelect(b.id)}
              className={`px-4 py-2 font-mono text-xs border transition-all ${
                isSelected
                  ? "border-[var(--art-accent-copper)] bg-[var(--art-accent-copper)]/20 text-[var(--art-accent-copper)] font-bold"
                  : "border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {b.name} ({b.feet}ft)
            </button>
          );
        })}
      </div>

      {/* Proportional Scale Stage */}
      <div className="relative h-[460px] w-full border-b border-white/20 flex items-end justify-around px-4 bg-black/40 overflow-hidden">
        {/* Height Guide Ruler Lines */}
        {[1776, 1500, 1250, 1000, 750, 500].map((ft) => (
          <div
            key={ft}
            className="absolute left-0 right-0 border-t border-dashed border-white/15 flex items-center justify-between px-3 text-[10px] font-mono text-white/30"
            style={{ bottom: `${(ft / maxFeet) * 100}%` }}
          >
            <span>{ft} FT</span>
            <span>{Math.round(ft * 0.3048)} M</span>
          </div>
        ))}

        {currentSelection.map((b) => {
          const pct = (b.feet / maxFeet) * 100;
          return (
            <motion.div
              key={b.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${pct}%`, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex-1 max-w-[130px] mx-2 flex flex-col items-center justify-between group"
            >
              {/* Photo Banner Inside Bar */}
              <div className="relative w-full h-full border border-white/20 bg-white/5">
                <Image
                  src={b.imageSrc}
                  alt={b.name}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-300"
                  sizes="140px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap bg-black/90 px-2.5 py-1 border border-white/20">
                <p className="font-mono text-xs font-bold text-[var(--art-accent-copper)]">{b.feet} FT</p>
                <p className="font-mono text-[9px] text-white/40">{b.meters} m</p>
              </div>

              {/* Label Under Baseline */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <p className="font-sans text-xs font-bold text-white">{b.name}</p>
                <p className="font-mono text-[10px] text-white/40">{b.year} · {b.city}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function SkyscraperInteractiveVisuals() {
  return <ArchitecturalScaleComparer />;
}
