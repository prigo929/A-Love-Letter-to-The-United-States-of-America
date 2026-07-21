"use client";

// ─── SkyscraperRace — the height race, drawn to scale ────────────────────────
// The signature interaction of the Skyscraper Revolution page. Nine buildings
// that each, in their moment, redefined how tall an American building could be,
// rendered as a single skyline where every silhouette's height is PROPORTIONAL
// to its real height. The chart is the argument: you can see the Home Insurance
// Building (1885) barely clear the ground line and One World Trade (2013) run off
// the top, and the century of ambition between them is legible at a glance.
//
// Click a building for its photograph and the numbers. State-driven, not
// scroll-driven, so it works regardless of how the browser reports scroll.

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ART_ASSETS, type ArtAssetKey } from "@/lib/data/art-assets";

export interface Tower {
  key: string;
  name: string;
  city: string;
  cityRo: string;
  year: number;
  /** Architectural height in feet (roof or pinnacle, noted per building). */
  feet: number;
  meters: number;
  architect: string;
  note: string;
  noteRo: string;
  asset: ArtAssetKey;
  /** True for the buildings that actually held the "world's tallest" title. */
  wasWorldsTallest?: boolean;
}

interface SkyscraperRaceProps {
  towers: Tower[];
  hint: string;
  hintRo: string;
  tallestLabel: string;
  tallestLabelRo: string;
}

export function SkyscraperRace({ towers, hint, hintRo, tallestLabel, tallestLabelRo }: SkyscraperRaceProps) {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState<number>(towers.length - 1); // start on the tallest
  const active = towers[sel];
  const maxFeet = Math.max(...towers.map((t) => t.feet));
  const asset = ART_ASSETS[active.asset];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* The skyline chart */}
      <div>
        <div
          className="flex items-end gap-1.5 border-b sm:gap-3"
          style={{ height: 420, borderColor: "rgba(196,149,106,0.35)" }}
        >
          {towers.map((t, i) => {
            const on = i === sel;
            const h = (t.feet / maxFeet) * 100;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setSel(i)}
                aria-current={on}
                className="group relative flex flex-1 flex-col items-center justify-end transition-opacity"
                style={{ height: "100%", cursor: "pointer", opacity: on ? 1 : 0.5 }}
              >
                {/* the bar */}
                <div
                  className="w-full rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${h}%`,
                    background: on
                      ? "linear-gradient(to top, var(--art-accent-copper), rgba(196,149,106,0.25))"
                      : "rgba(255,255,255,0.09)",
                    boxShadow: on ? "0 0 30px rgba(196,149,106,0.25)" : "none",
                  }}
                />
                {/* year, under the ground line */}
                <span
                  className="absolute -bottom-7 font-mono text-[9px] tabular-nums transition-colors sm:text-[11px]"
                  style={{ color: on ? "var(--art-accent-copper)" : "rgba(255,255,255,0.3)" }}
                >
                  {t.year}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-12 font-sans text-xs uppercase tracking-[0.2em] text-white/30">
          {ro ? hintRo : hint}
        </p>
      </div>

      {/* The selected building */}
      <motion.div
        key={active.key}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative mb-6 aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
          <Image
            key={active.asset}
            src={asset.src}
            alt={ro ? asset.altRo : asset.alt}
            fill
            sizes="(min-width: 1024px) 22rem, 90vw"
            className="object-cover"
          />
          {active.wasWorldsTallest && (
            <span
              className="absolute left-3 top-3 rounded px-2 py-1 font-sans text-[9px] font-bold uppercase tracking-wider"
              style={{ background: "var(--art-accent-copper)", color: "#0a0a0a" }}
            >
              {ro ? tallestLabelRo : tallestLabel}
            </span>
          )}
        </div>

        <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--art-accent-copper)" }}>
          {active.year} · {ro ? active.cityRo : active.city}
        </div>
        <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">{active.name}</h3>

        <div className="mt-5 flex items-baseline gap-4 border-y border-white/10 py-4">
          <div>
            <div className="font-mono text-3xl tabular-nums text-white">{active.feet.toLocaleString()}<span className="ml-1 text-sm text-white/40">ft</span></div>
            <div className="font-mono text-xs tabular-nums text-white/40">{active.meters} m</div>
          </div>
          <div className="ml-auto text-right">
            <div className="font-sans text-xs uppercase tracking-wider text-white/30">{ro ? "Arhitect" : "Architect"}</div>
            <div className="font-sans text-sm text-white/70">{active.architect}</div>
          </div>
        </div>

        <p className="mt-5 font-sans text-[15px] leading-relaxed text-white/65">
          {ro ? active.noteRo : active.note}
        </p>
      </motion.div>
    </div>
  );
}
