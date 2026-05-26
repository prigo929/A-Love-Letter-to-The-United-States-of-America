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
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  "10": "DE",
  "11": "DC",
  "12": "FL",
  "13": "GA",
  "15": "HI",
  "16": "ID",
  "17": "IL",
  "18": "IN",
  "19": "IA",
  "20": "KS",
  "21": "KY",
  "22": "LA",
  "23": "ME",
  "24": "MD",
  "25": "MA",
  "26": "MI",
  "27": "MN",
  "28": "MS",
  "29": "MO",
  "30": "MT",
  "31": "NE",
  "32": "NV",
  "33": "NH",
  "34": "NJ",
  "35": "NM",
  "36": "NY",
  "37": "NC",
  "38": "ND",
  "39": "OH",
  "40": "OK",
  "41": "OR",
  "42": "PA",
  "44": "RI",
  "45": "SC",
  "46": "SD",
  "47": "TN",
  "48": "TX",
  "49": "UT",
  "50": "VT",
  "51": "VA",
  "53": "WA",
  "54": "WV",
  "55": "WI",
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
          AL: { fact: "Huntsville — Orașul Rachetelor, unde au fost proiectate rachetele Saturn V care au dus omul pe Lună.", emoji: "🚀" },
          AK: { fact: "Cel mai mare stat — de două ori cât Texasul, cu peste 100.000 de ghețari.", emoji: "🏔️" },
          AZ: { fact: "Marele Canion — una dintre cele șapte minuni naturale ale lumii.", emoji: "🏜️" },
          AR: { fact: "Crater of Diamonds — singurul sit de diamante activ din lume deschis publicului.", emoji: "💎" },
          CA: { fact: "Silicon Valley — epicentrul global al tehnologiei, capitalului de risc și AI.", emoji: "🌊" },
          CO: { fact: "Cea mai mare altitudine medie dintre toate statele, cu 58 de vârfuri peste 4.200m.", emoji: "⛰️" },
          CT: { fact: "USS Nautilus — primul submarin cu propulsie nucleară din lume, construit în Groton.", emoji: "⚓" },
          DE: { fact: "Primul Stat — primul care a ratificat Constituția SUA pe 7 decembrie 1787.", emoji: "📜" },
          DC: { fact: "Capitala națiunii — găzduiește Casa Albă, Capitoliul și monumentele libertății.", emoji: "🏛️" },
          FL: { fact: "Centrul Spațial Kennedy — locul de lansare al misiunilor Apollo și navetelor spațiale.", emoji: "🚀" },
          GA: { fact: "Aeroportul Hartsfield-Jackson din Atlanta — cel mai aglomerat aeroport din lume.", emoji: "🍑" },
          HI: { fact: "Singurul stat format exclusiv din insule, cu vulcani activi și păduri tropicale.", emoji: "🌺" },
          ID: { fact: "Produce 13 miliarde de lire de cartofi anual, conducând națiunea în agricultură.", emoji: "🥔" },
          IL: { fact: "Chicago — locul primului zgârie-nori din lume și al Sears Tower.", emoji: "🌃" },
          IN: { fact: "Indianapolis 500 — cea mai veche și mai mare competiție sportivă de o zi din lume.", emoji: "🏎️" },
          IA: { fact: "Produce mai mult porumb și carne de porc decât orice alt stat american.", emoji: "🌽" },
          KS: { fact: "Centrul geografic al Statelor Unite contigue, renumit pentru producția de grâu.", emoji: "🌻" },
          KY: { fact: "Kentucky Derby — legendara cursă de cai 'Run for the Roses' din Louisville.", emoji: "🐎" },
          LA: { fact: "Locul de naștere al jazzului în New Orleans, o fuziune culturală unică.", emoji: "🎷" },
          ME: { fact: "Produce 90% din homarii națiunii și are 65 de faruri istorice.", emoji: "🦞" },
          MD: { fact: "Fort McHenry — locul unde a fost scris imnul național 'The Star-Spangled Banner'.", emoji: "🦀" },
          MA: { fact: "Universitatea Harvard — fondată în 1636, cea mai veche universitate din SUA.", emoji: "📚" },
          MI: { fact: "Detroit — Motor City, locul unde Henry Ford a inventat linia de asamblare modernă.", emoji: "🚗" },
          MN: { fact: "Țara celor 10.000 de lacuri — în realitate conține 11.842 de lacuri mari.", emoji: "🛶" },
          MS: { fact: "Locul de naștere al muzicii Blues în Deltă, care a modelat rock 'n' roll-ul.", emoji: "🎸" },
          MO: { fact: "Arcul Gateway din St. Louis — cel mai înalt arc din lume, având 192 de metri.", emoji: "🏹" },
          MT: { fact: "Parcul Național Glacier — are peste 700 de lacuri și natură neatinsă.", emoji: "🏔️" },
          NE: { fact: "Găzduiește cea mai mare pădure plantată manual din lume (Halsey).", emoji: "🌾" },
          NV: { fact: "Las Vegas — capitala mondială a divertismentului și a ospitalității.", emoji: "🎰" },
          NH: { fact: "Primul stat cu alegeri primare și gazda muntelui Washington, cu vreme extremă.", emoji: "🏔️" },
          NJ: { fact: "Laboratorul lui Thomas Edison din Menlo Park, unde a inventat becul electric.", emoji: "💡" },
          NM: { fact: "Albuquerque Balloon Fiesta — cel mai mare festival de baloane cu aer cald din lume.", emoji: "🎈" },
          NY: { fact: "NYSE și Wall Street — capitala financiară a lumii, ghidând piețele globale.", emoji: "🗽" },
          NC: { fact: "Kitty Hawk — locul primului zbor controlat cu motor al fraților Wright în 1903.", emoji: "✈️" },
          ND: { fact: "Parcul Național Theodore Roosevelt — unde se întâlnesc Badlands și bizonii sălbatici.", emoji: "🦬" },
          OH: { fact: "Locul de naștere al pionierilor aviației și al 25 de astronauți, inclusiv Neil Armstrong.", emoji: "🧑‍🚀" },
          OK: { fact: "Centrul culturii cowboy și gazda Muzeului Național al Cowboy-ilor.", emoji: "🌪️" },
          OR: { fact: "Crater Lake — cel mai adânc lac din America, alimentat doar de ploaie și zăpadă.", emoji: "🌲" },
          PA: { fact: "Independence Hall din Philadelphia — locul adoptării Declarației și Constituției.", emoji: "🔔" },
          RI: { fact: "Capitala mondială a navigației, cu conacele din Newport și coastă superbă.", emoji: "⛵" },
          SC: { fact: "Charleston — oraș port istoric celebru pentru arhitectură și Războiul Civil.", emoji: "🌴" },
          SD: { fact: "Muntele Rushmore — sculptura monumentală a celor patru președinți emblematici.", emoji: "⛰️" },
          TN: { fact: "Nashville — Music City SUA, capitala mondială a muzicii country.", emoji: "🎸" },
          TX: { fact: "Al doilea stat ca PIB (2,6T+) și gazda Centrului Spațial Johnson al NASA.", emoji: "🤠" },
          UT: { fact: "Mighty 5 — cinci parcuri naționale celebre pentru stâncile roșii și schi.", emoji: "🎿" },
          VT: { fact: "Cel mai mare producător de sirop de arțar din SUA și pionier ecologist.", emoji: "🍁" },
          VA: { fact: "Mama Președinților — locul de naștere a 8 președinți, inclusiv George Washington.", emoji: "🏛️" },
          WA: { fact: "Statul Veșnic Verde — principalul exportator de mere, cireșe și software.", emoji: "🌲" },
          WV: { fact: "New River Gorge Bridge — unul dintre cele mai înalte poduri cu arc de oțel din lume.", emoji: "🌉" },
          WI: { fact: "Țara Lactatelor din America — produce peste 3,4 miliarde de lire de brânză anual.", emoji: "🧀" },
          WY: { fact: "Yellowstone și Grand Teton — parcuri care protejează fauna sălbatică a Americii.", emoji: "🦬" },
        }
      : STATE_FACTS;
  const copy =
    locale === "ro"
      ? {
          eyebrow: "De la un Ocean la Altul",
          title: "Explorează America",
          description:
            "Treci cu cursorul peste orice stat pentru a descoperi ce îl face excepțional. Fiecare stat spune o poveste.",
          featured: "Statele SUA",
          hover: "Stat selectat",
          tooltipFallback: "Apasă pentru a explora acest stat",
          cta: "Deschide Exploratorul Complet al Hărții",
        }
      : {
          eyebrow: "From Sea to Shining Sea",
          title: "Explore America",
          description:
            "Hover any state to discover what makes it exceptional. Every state is a story.",
          featured: "U.S. States",
          hover: "Hovered State",
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
