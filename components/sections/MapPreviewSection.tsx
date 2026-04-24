"use client";

// This section shows an interactive USA map.
// When the user hovers a state:
// - that state changes color
// - a tooltip follows the mouse
// - the tooltip shows a short fact for that state if we have one

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { COLORS } from "@/lib/constants";
import { STATE_FACTS } from "@/lib/data/home";
import { useLanguage } from "@/components/providers/LanguageProvider";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// The map library gives us numeric FIPS codes for states.
// Our fact data uses 2-letter abbreviations like "CA" and "TX".
// This object translates between the two systems.
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
  // Tooltip holds the floating card near the mouse cursor.
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  // hoveredGeo stores which SVG state shape is currently highlighted.
  const [hoveredGeo, setHoveredGeo] = useState<string | null>(null);
  const { locale } = useLanguage();
  const stateFacts =
    locale === "ro"
      ? {
          CA: {
            fact: "A 5-a cea mai mare economie din lume dacă ar fi o țară",
            emoji: "🌊",
          },
          TX: {
            fact: "Cel mai mare producător de petrol din SUA — 43% din producția internă",
            emoji: "🤠",
          },
          NY: {
            fact: "Găzduiește NYSE — cea mai mare bursă din lume",
            emoji: "🗽",
          },
          FL: {
            fact: "Centrul Spațial Kennedy — de aici America ajunge la stele",
            emoji: "🚀",
          },
          WA: {
            fact: "Locul de naștere al Boeing, Microsoft și Amazon",
            emoji: "💻",
          },
          AK: {
            fact: "Cel mai mare stat — de două ori cât Texasul, cu 100.000 de ghețari",
            emoji: "🏔️",
          },
          HI: {
            fact: "Singurul stat american cu pădure tropicală și vulcani activi",
            emoji: "🌺",
          },
          IL: {
            fact: "Chicago — al treilea oraș al Americii și centrul financiar al Midwestului",
            emoji: "🌃",
          },
          PA: {
            fact: "Leagănul democrației americane — Constituția a fost semnată la Philadelphia",
            emoji: "🔔",
          },
          MA: {
            fact: "Acasă pentru Harvard, MIT și începutul Revoluției Americane",
            emoji: "📚",
          },
          VA: {
            fact: "Acasă pentru Pentagon — centrul celei mai puternice armate din lume",
            emoji: "⭐",
          },
          NV: {
            fact: "Las Vegas — capitala divertismentului, cu PIB anual de peste 70 Mld. $",
            emoji: "🎰",
          },
          CO: {
            fact: "53 de vârfuri peste 14.000 de picioare — mai multe decât orice alt stat",
            emoji: "⛰️",
          },
          AZ: {
            fact: "Grand Canyon — cea mai vizitată minune naturală din Statele Unite",
            emoji: "🏜️",
          },
          WY: {
            fact: "Yellowstone — primul parc național din lume, fondat în 1872",
            emoji: "🦬",
          },
        }
      : STATE_FACTS;
  const copy =
    locale === "ro"
      ? {
          eyebrow: "De la un Ocean la Altul",
          title: "Explorează America",
          description:
            "Treci cu cursorul peste orice stat pentru a descoperi ce îl face excepțional. Fiecare stat spune o poveste.",
          featured: "Stat evidențiat",
          hover: "Treci cu cursorul pentru a explora",
          tooltipFallback: "Apasă pentru a explora acest stat",
          cta: "Deschide Exploratorul Complet al Hărții",
        }
      : {
          eyebrow: "From Sea to Shining Sea",
          title: "Explore America",
          description:
            "Hover any state to discover what makes it exceptional. Every state is a story.",
          featured: "Featured state",
          hover: "Hover to explore",
          tooltipFallback: "Click to explore this state",
          cta: "Open Full Map Explorer",
        };

  const handleMouseEnter = useCallback(
    (geo: MapGeography, evt: React.MouseEvent<SVGPathElement>) => {
      // Convert the state id coming from the map into our content key.
      const fips = geo.id?.toString().padStart(2, "0") ?? "";
      const abbrev = FIPS_TO_ABBREV[fips] ?? "";
      const fact = stateFacts[abbrev as keyof typeof stateFacts];
      const name = geo.properties?.name ?? abbrev;

      // Save both the highlighted shape and the tooltip content/position.
      setHoveredGeo(geo.rsmKey);
      setTooltip({
        x: evt.clientX,
        y: evt.clientY,
        name,
        abbrev,
        fact,
      });
    },
    [stateFacts],
  );

  const handleMouseLeave = useCallback(() => {
    // When the mouse leaves a state, remove both the highlight and the tooltip.
    setHoveredGeo(null);
    setTooltip(null);
  }, []);

  const handleMouseMove = useCallback((evt: React.MouseEvent) => {
    // Keep the same tooltip content, but move the tooltip with the cursor.
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
            {copy.eyebrow}
          </motion.p>
          <motion.h2
            id="map-heading"
            variants={fadeUp}
            className="mb-4 font-display text-h2 text-white"
          >
            {copy.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-xl font-body text-lg text-white/55"
          >
            {copy.description}
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
                    // Each state's color depends on:
                    // 1. whether we have a featured fact for it
                    // 2. whether it is currently hovered
                    const fips = geo.id?.toString().padStart(2, "0") ?? "";
                    const abbrev = FIPS_TO_ABBREV[fips] ?? "";
                    const hasFact = !!stateFacts[abbrev as keyof typeof stateFacts];
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
                  {copy.featured}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm bg-glory-gold"
                  aria-hidden="true"
                />
                <span className="font-body text-xs text-white/50">
                  {copy.hover}
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {tooltip && (
              <motion.div
                // `fixed` positioning lets the tooltip follow the mouse across
                // the viewport instead of getting clipped by the map container.
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
                      {copy.tooltipFallback}
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
            {copy.cta}
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
