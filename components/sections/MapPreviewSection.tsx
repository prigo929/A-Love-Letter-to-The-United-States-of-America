"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { COLORS } from "@/lib/constants";
import { STATE_FACTS } from "@/lib/data/home";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const FIPS_TO_ABBREV: Record<string, string> = {
  "06": "CA",
  "48": "TX",
  "36": "NY",
  "12": "FL",
  "53": "WA",
  "02": "AK",
  "15": "HI",
  "17": "IL",
  "42": "PA",
  "25": "MA",
  "51": "VA",
  "32": "NV",
  "08": "CO",
  "04": "AZ",
  "56": "WY",
};

interface TooltipState {
  x: number;
  y: number;
  name: string;
  abbrev: string;
  fact?: { fact: string; emoji: string };
}

interface MapGeography {
  id?: string | number;
  rsmKey: string;
  properties?: {
    name?: string;
  };
}

export function MapPreviewSection() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredGeo, setHoveredGeo] = useState<string | null>(null);

  const handleMouseEnter = useCallback(
    (geo: MapGeography, evt: React.MouseEvent<SVGPathElement>) => {
      const fips = geo.id?.toString().padStart(2, "0") ?? "";
      const abbrev = FIPS_TO_ABBREV[fips] ?? "";
      const fact = STATE_FACTS[abbrev];
      const name = geo.properties?.name ?? abbrev;

      setHoveredGeo(geo.rsmKey);
      setTooltip({
        x: evt.clientX,
        y: evt.clientY,
        name,
        abbrev,
        fact,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredGeo(null);
    setTooltip(null);
  }, []);

  const handleMouseMove = useCallback((evt: React.MouseEvent) => {
    setTooltip((prev) =>
      prev ? { ...prev, x: evt.clientX, y: evt.clientY } : null,
    );
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-navy-mid py-24 md:py-32"
      aria-labelledby="map-heading"
    >
      <div
        className="bg-map-preview-grid absolute inset-0 pointer-events-none opacity-10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="section-eyebrow justify-center"
          >
            From Sea to Shining Sea
          </motion.p>
          <motion.h2
            id="map-heading"
            variants={fadeUp}
            className="mb-4 font-display text-h2 text-white"
          >
            Explore America
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-xl font-body text-lg text-white/55"
          >
            Hover any state to discover what makes it exceptional. Every state
            is a story.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          onMouseMove={handleMouseMove}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-glory-gold/5 to-transparent"
            aria-hidden="true"
          />

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-navy-dark/60 backdrop-blur-sm">
            <ComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{ scale: 1000 }}
              style={{ width: "100%", height: "auto" }}
              aria-label="Interactive map of the United States"
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: MapGeography[] }) =>
                  geographies.map((geo: MapGeography) => {
                    const fips = geo.id?.toString().padStart(2, "0") ?? "";
                    const abbrev = FIPS_TO_ABBREV[fips] ?? "";
                    const hasFact = !!STATE_FACTS[abbrev];
                    const isHovered = hoveredGeo === geo.rsmKey;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={(evt: React.MouseEvent<SVGPathElement>) =>
                          handleMouseEnter(geo, evt)
                        }
                        onMouseLeave={handleMouseLeave}
                        tabIndex={0}
                        role="button"
                        aria-label={geo.properties?.name}
                        style={{
                          default: {
                            fill: isHovered
                              ? hasFact
                                ? COLORS.gloryGold
                                : COLORS.gloryBlueLight
                              : hasFact
                                ? COLORS.gloryBlue
                                : COLORS.navyLight,
                            stroke: COLORS.navyMid,
                            strokeWidth: 0.5,
                            outline: "none",
                            transition: "fill 0.15s ease",
                          },
                          hover: {
                            fill: hasFact
                              ? COLORS.gloryGold
                              : COLORS.gloryBlueLight,
                            stroke: COLORS.navyDark,
                            strokeWidth: 1,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: COLORS.gloryRed,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            <div className="flex items-center justify-center gap-6 border-t border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm bg-glory-blue"
                  aria-hidden="true"
                />
                <span className="font-body text-xs text-white/50">
                  Featured state
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm bg-glory-gold"
                  aria-hidden="true"
                />
                <span className="font-body text-xs text-white/50">
                  Hover to explore
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {tooltip && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none fixed z-50"
                style={{ left: tooltip.x + 16, top: tooltip.y - 60 }}
                role="tooltip"
              >
                <div className="max-w-[260px] rounded-xl border border-glory-gold/30 bg-navy-dark px-4 py-3 shadow-2xl">
                  <div className="mb-1 flex items-center gap-2">
                    <MapPin
                      className="h-3.5 w-3.5 shrink-0 text-glory-gold"
                      aria-hidden="true"
                    />
                    <span className="font-body text-sm font-semibold text-white">
                      {tooltip.name}
                      {tooltip.abbrev && (
                        <span className="ml-1.5 text-xs text-glory-gold">
                          ({tooltip.abbrev})
                        </span>
                      )}
                    </span>
                  </div>
                  {tooltip.fact ? (
                    <p className="font-body text-xs leading-snug text-white/70">
                      {tooltip.fact.emoji} {tooltip.fact.fact}
                    </p>
                  ) : (
                    <p className="font-body text-xs italic text-white/40">
                      Click to explore this state
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 text-center"
        >
          <Link
            href="/explorer"
            className="group inline-flex items-center gap-2 rounded-xl border border-glory-gold/30 bg-glory-gold/10 px-6 py-3 font-body text-sm font-semibold text-glory-gold transition-all duration-200 hover:bg-glory-gold/20"
          >
            Open Full Map Explorer
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
