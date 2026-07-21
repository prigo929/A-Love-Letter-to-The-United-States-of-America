"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

// ─── Data: U.S. Skyline Capitals ─────────────────────────────────────────────

interface CitySkylineData {
  city: string;
  state: string;
  skyscrapers150m: number;
  supertalls300m: number;
  tallestBuilding: string;
  tallestFeet: number;
  tallestMeters: number;
  highlight: string;
  highlightRo: string;
}

const CITY_SKYLINE_DATA: CitySkylineData[] = [
  {
    city: "New York City",
    state: "NY",
    skyscrapers150m: 316,
    supertalls300m: 16,
    tallestBuilding: "One World Trade Center",
    tallestFeet: 1776,
    tallestMeters: 541,
    highlight: "World's most iconic skyline with 16 supertalls and over 120,000 meters of cumulative vertical tower height.",
    highlightRo: "Cea mai emblematică siluetă din lume cu 16 supraturnuri și peste 120.000 m înălțime verticală cumulată.",
  },
  {
    city: "Chicago",
    state: "IL",
    skyscrapers150m: 135,
    supertalls300m: 7,
    tallestBuilding: "Willis (Sears) Tower",
    tallestFeet: 1450,
    tallestMeters: 442,
    highlight: "The birthplace of the skyscraper in 1885, home to Fazlur Khan's tube structure revolution.",
    highlightRo: "Locul de naștere al zgârie-norilor în 1885, casa revoluției structurilor tubulare ale lui Fazlur Khan.",
  },
  {
    city: "Miami",
    state: "FL",
    skyscrapers150m: 62,
    supertalls300m: 1,
    tallestBuilding: "Panorama Tower (Waldorf Astoria underway)",
    tallestFeet: 868,
    tallestMeters: 265,
    highlight: "Fastest growing tropical high-rise skyline in the Americas, with 1,049ft supertalls under construction.",
    highlightRo: "Cea mai rapidă creștere a unei siluete tropicale din Americi, cu turnuri de 320m în construcție.",
  },
  {
    city: "Houston",
    state: "TX",
    skyscrapers150m: 40,
    supertalls300m: 2,
    tallestBuilding: "JPMorgan Chase Tower",
    tallestFeet: 1002,
    tallestMeters: 305,
    highlight: "Texas energy capital featuring I.M. Pei's 75-story pentagonal tower.",
    highlightRo: "Capitala energiei din Texas, găzduind turnul pentagonal cu 75 de etaje al lui I.M. Pei.",
  },
  {
    city: "Los Angeles",
    state: "CA",
    skyscrapers150m: 30,
    supertalls300m: 2,
    tallestBuilding: "Wilshire Grand Center",
    tallestFeet: 1100,
    tallestMeters: 335,
    highlight: "Seismically engineered towers built to withstand magnitude 8.0+ Pacific Rim earthquakes.",
    highlightRo: "Turnuri proiectate seismic pentru a rezista la cutremure de peste 8,0 pe scara Richter.",
  },
  {
    city: "San Francisco",
    state: "CA",
    skyscrapers150m: 28,
    supertalls300m: 1,
    tallestBuilding: "Salesforce Tower",
    tallestFeet: 1070,
    tallestMeters: 326,
    highlight: "Pelli Clarke Pelli's obelisk supertall anchored into Franciscan complex bedrock.",
    highlightRo: "Supraturnul obelisc ancorat în roca de bază a peninsulei San Francisco.",
  },
  {
    city: "Seattle",
    state: "WA",
    skyscrapers150m: 26,
    supertalls300m: 0,
    tallestBuilding: "Columbia Center",
    tallestFeet: 933,
    tallestMeters: 284,
    highlight: "Pacific Northwest technology hub anchored by Chester L. Lindsey's 76-story concave tower.",
    highlightRo: "Centrul tehnologic al Pacificului de Nord-Vest marcat de turnul concav de 76 de etaje.",
  },
];

// ─── Data: Structural Systems Evolution ──────────────────────────────────────

interface StructuralSystem {
  id: string;
  era: string;
  title: string;
  titleRo: string;
  landmark: string;
  maxHeight: string;
  concept: string;
  conceptRo: string;
  techDetail: string;
  techDetailRo: string;
  badgeColor: string;
}

const STRUCTURAL_SYSTEMS: StructuralSystem[] = [
  {
    id: "masonry",
    era: "PRE-1885",
    title: "Load-Bearing Masonry",
    titleRo: "Zidărie Portantă Masivă",
    landmark: "Monadnock Building, Chicago (1891)",
    maxHeight: "~200 FT (16 Storeys)",
    concept: "Thick stone walls support the entire weight of the building.",
    conceptRo: "Pereții groși de piatră susțin întreaga greutate a clădirii.",
    techDetail: "At 16 storeys, ground-floor walls had to be 6 feet thick, sacrificing valuable rentable floor space. Gravity physics imposed a strict ceiling on height.",
    techDetailRo: "La 16 etaje, pereții de la parter trebuiau să aibă 1,8 metri grosime. Fizica gravitației a impus un plafon strict înălțimii.",
    badgeColor: "var(--art-accent-slate)",
  },
  {
    id: "steel-frame",
    era: "1885 – 1915",
    title: "Steel Skeleton Frame",
    titleRo: "Scheletul de Oțel",
    landmark: "Home Insurance & Woolworth Buildings",
    maxHeight: "~800 FT (60 Storeys)",
    concept: "An internal cage of steel columns and beams carries all vertical loads.",
    conceptRo: "O cușcă interioară din coloane și grinzi de oțel poartă toate sarcinile.",
    techDetail: "Outer walls were freed from structural load, becoming light curtain skins of terra-cotta or glass. Height limits vanished overnight.",
    techDetailRo: "Pereții exteriori au fost eliberați de sarcină, devenind perdele ușoare de ceramică sau sticlă. Limitele de înălțime au dispărut.",
    badgeColor: "var(--art-accent-copper)",
  },
  {
    id: "setback",
    era: "1916 – 1950",
    title: "Setback & Art Deco Stepping",
    titleRo: "Zonarea cu Retrageri Succesive",
    landmark: "Chrysler & Empire State Buildings",
    maxHeight: "~1,250 FT (102 Storeys)",
    concept: "Towers taper upward to keep sunlight reaching street level.",
    conceptRo: "Turnurile se îngustează în sus pentru a lăsa lumina soarelui să ajungă la stradă.",
    techDetail: "Triggered by New York's 1916 Zoning Resolution, architects created the classic 'wedding-cake' silhouette, blending steel strength with Art Deco sculpture.",
    techDetailRo: "Impulsionată de Legea de Zonare din New York din 1916, arhitecții au creat silueta clasică cu retrageri succesive.",
    badgeColor: "#E8C97A",
  },
  {
    id: "framed-tube",
    era: "1960 – 1990",
    title: "Framed & Bundled Tube",
    titleRo: "Sistemul Tubular Mănunchi",
    landmark: "Willis (Sears) Tower & John Hancock Center",
    maxHeight: "~1,450 FT (110 Storeys)",
    concept: "The exterior perimeter acts as a hollow rigid tube resisting wind sway.",
    conceptRo: "Perimetrul exterior funcționează ca un tub rigid ce rezistă vântului.",
    techDetail: "Invented by SOM structural genius Fazlur Rahman Khan. Bundling multiple hollow tubes together reduced steel usage by 50% per square foot while reaching unprecedented heights.",
    techDetailRo: "Invenția lui Fazlur Rahman Khan (SOM). Mănunchiul de tuburi a redus consumul de oțel cu 50% per metru pătrat.",
    badgeColor: "#7DD3FC",
  },
  {
    id: "tuned-mass",
    era: "2000 – PRESENT",
    title: "Outrigger & Tuned Mass Damper",
    titleRo: "Amortizoare de Masă & Supraturnuri Subțiri",
    landmark: "111 West 57th, 432 Park & Central Park Tower",
    maxHeight: "1,550+ FT (130+ Storeys)",
    concept: "Computerized 800-ton pendulums and porous wind slots neutralize sway.",
    conceptRo: "Pendule computerizate de 800 tone și fante pentru vânt neutralizează balansul.",
    techDetail: "Ultra-slender supertalls (up to 1:24 ratio) use giant concrete cores, massive steel outriggers, and heavy pendulum dampers to defeat vortex shedding and hurricane winds.",
    techDetailRo: "Supraturnurile ultra-subțiri folosesc nuclee masive de beton, stabilizatoare exterioare și pendule pentru a neutraliza vântul.",
    badgeColor: "var(--art-accent-crimson)",
  },
];

// ─── Data: The Great 1930 Height Race ───────────────────────────────────────

interface HeightRaceStep {
  building: string;
  height: string;
  year: string;
  gambit: string;
  gambitRo: string;
  detail: string;
  detailRo: string;
}

const HEIGHT_RACE_STORY: HeightRaceStep[] = [
  {
    building: "40 Wall Street",
    height: "927 FT (71 Storeys)",
    year: "APRIL 1930",
    gambit: "Added a 60-foot flagpole to claim the crown.",
    gambitRo: "A adăugat un catarg de 18m pentru a revendica coroana.",
    detail: "Architect H. Craig Severance pushed 40 Wall Street to 927 feet, believing he had comfortably beaten William Van Alen's Chrysler Building.",
    detailRo: "Arhitectul H. Craig Severance a urcat 40 Wall Street la 282m, crezând că l-a învins confortabil pe rivalul său William Van Alen.",
  },
  {
    building: "Chrysler Building",
    height: "1,046 FT (77 Storeys)",
    year: "MAY 1930",
    gambit: "Secretly assembled the 185ft stainless steel spire inside the building.",
    gambitRo: "A asamblat în secret fleșa de 56m din oțel inoxidabil în interiorul clădirii.",
    detail: "Van Alen had the 27-ton Nirosta steel spire built inside the elevator shaft in complete secrecy, then hoisted it through the roof in just 90 minutes, stunning New York and taking the world's tallest title at 1,046 ft.",
    detailRo: "Van Alen a ridicat fleșa de 27 de tone prin acoperiș în doar 90 de minute, uimind New York-ul și obținând titlul la 319m.",
  },
  {
    building: "Empire State Building",
    height: "1,250 FT (102 Storeys)",
    year: "MAY 1931",
    gambit: "Built at a record 4.5 storeys per week with a dirigible mooring mast.",
    gambitRo: "Construită într-un ritm de 4,5 etaje pe săptămână cu un turn de ancorare pentru dirijabile.",
    detail: "Shreve, Lamb & Harmon redesigned the plans to add a 200ft mooring tower for zeppelins, reaching 1,250 ft (1,454 ft to tip). It held the world's tallest record for an unbeatable 40 years.",
    detailRo: "A adăugat un turn de ancorare pentru dirijabile de 61m, ajungând la 381m. A deținut recordul mondial timp de 40 de ani.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component: SkyscraperVisualizations
// ─────────────────────────────────────────────────────────────────────────────

export function SkyscraperVisualizations() {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const [activeTab, setActiveTab] = useState<"skylines" | "engineering" | "race">("skylines");
  const [activeSystem, setActiveSystem] = useState<string>("tuned-mass");
  const [cityMetric, setCityMetric] = useState<"skyscrapers" | "supertalls" | "peak">("skyscrapers");

  const sortedCities = [...CITY_SKYLINE_DATA].sort((a, b) => {
    if (cityMetric === "skyscrapers") return b.skyscrapers150m - a.skyscrapers150m;
    if (cityMetric === "supertalls") return b.supertalls300m - a.supertalls300m;
    return b.tallestFeet - a.tallestFeet;
  });

  const maxVal = Math.max(
    ...sortedCities.map((c) =>
      cityMetric === "skyscrapers" ? c.skyscrapers150m : cityMetric === "supertalls" ? c.supertalls300m : c.tallestFeet
    )
  );

  return (
    <section className="py-20 md:py-32 border-t border-white/10" style={{ background: "var(--art-void)" }}>
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8 mb-16">
          <div>
            <p className="art-text-label mb-2" style={{ color: "var(--art-accent-copper)" }}>
              {isRo ? "Vizualizări & Date Arhitecturale" : "Architectural Data & Visualizations"}
            </p>
            <h2 className="art-text-section text-white" style={{ fontSize: "clamp(26px, 4vw, 56px)" }}>
              {isRo ? "Inginerie, Orașe & Ambiție" : "Engineering, Cities & Ambition"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 rounded-lg bg-[var(--art-surface)] p-1.5 border border-white/10">
            {[
              { id: "skylines", label: isRo ? "Capitalele Siluetelor" : "Skyline Capitals" },
              { id: "engineering", label: isRo ? "Sisteme Structurale" : "Structural Systems" },
              { id: "race", label: isRo ? "Marea Cursă din 1930" : "The Great 1930 Race" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeTab === t.id
                    ? "bg-[var(--art-accent-copper)] text-black font-bold shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Skyline Capitals */}
        {activeTab === "skylines" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-sans text-sm text-white/70 max-w-xl">
                {isRo
                  ? "Statele Unite găzduiesc peste 800 de turnuri de peste 150m. Clasamentul de mai jos compară cele mai mari capitale ale zgârie-norilor."
                  : "The United States is home to over 800 towers exceeding 150m (492ft). The leaderboard below compares America's top skyline capitals."}
              </p>

              <div className="flex gap-2">
                {[
                  { id: "skyscrapers", label: isRo ? "Clădiri 150m+" : "150m+ Towers" },
                  { id: "supertalls", label: isRo ? "Supraturnuri 300m+" : "300m+ Supertalls" },
                  { id: "peak", label: isRo ? "Vârful Siluetelor" : "Peak Height" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setCityMetric(m.id as any)}
                    className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider border transition-all ${
                      cityMetric === m.id
                        ? "border-[var(--art-accent-copper)] text-[var(--art-accent-copper)] bg-[var(--art-accent-copper)]/10 font-bold"
                        : "border-white/10 text-white/50 hover:text-white"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {sortedCities.map((c, i) => {
                const val =
                  cityMetric === "skyscrapers" ? c.skyscrapers150m : cityMetric === "supertalls" ? c.supertalls300m : c.tallestFeet;
                const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;

                return (
                  <div
                    key={c.city}
                    className="group relative border border-white/10 bg-[var(--art-surface)] p-6 transition-all duration-300 hover:border-[var(--art-accent-copper)]/50"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold opacity-30 text-white">0{i + 1}</span>
                        <h3 className="art-text-heading text-xl text-white group-hover:text-[var(--art-accent-copper)] transition-colors">
                          {c.city}, <span className="text-white/40">{c.state}</span>
                        </h3>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-2xl font-black text-[var(--art-accent-copper)]">
                          {cityMetric === "peak" ? `${c.tallestFeet.toLocaleString()} FT` : val}
                        </span>
                        <span className="ml-2 font-mono text-xs text-white/40 uppercase">
                          {cityMetric === "skyscrapers"
                            ? isRo ? "clădiri" : "towers"
                            : cityMetric === "supertalls"
                            ? isRo ? "supraturnuri" : "supertalls"
                            : `(${c.tallestMeters}m)`}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 w-full bg-white/5 overflow-hidden mb-4">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[var(--art-accent-copper)] to-[#F0EBE1]"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-xs text-white/60">
                      <span>
                        <strong className="text-white">{isRo ? "Cea mai înaltă:" : "Tallest:"}</strong> {c.tallestBuilding}
                      </span>
                      <span className="text-white/40">{isRo ? c.highlightRo : c.highlight}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Structural Systems Evolution */}
        {activeTab === "engineering" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 lg:grid-cols-12"
          >
            {/* System Selector Buttons */}
            <div className="lg:col-span-4 space-y-3">
              {STRUCTURAL_SYSTEMS.map((sys) => {
                const isActive = activeSystem === sys.id;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setActiveSystem(sys.id)}
                    className={`w-full text-left p-5 border transition-all duration-300 flex flex-col gap-1.5 ${
                      isActive
                        ? "border-[var(--art-accent-copper)] bg-[var(--art-surface)] shadow-lg"
                        : "border-white/10 bg-black/40 text-white/60 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold" style={{ color: sys.badgeColor }}>
                        {sys.era}
                      </span>
                      <span className="font-mono text-[11px] text-white/40">{sys.maxHeight}</span>
                    </div>
                    <h3 className="art-text-heading text-lg text-white">
                      {isRo ? sys.titleRo : sys.title}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* System Detail View */}
            <div className="lg:col-span-8 border border-white/10 bg-[var(--art-surface)] p-8 md:p-12 flex flex-col justify-between">
              {(() => {
                const sys = STRUCTURAL_SYSTEMS.find((s) => s.id === activeSystem)!;
                return (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={sys.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-8"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                        <div>
                          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: sys.badgeColor }}>
                            {sys.era} · {isRo ? "Paradigmă Structură" : "Structural Paradigm"}
                          </span>
                          <h3 className="art-text-heading text-3xl md:text-4xl text-white mt-2">
                            {isRo ? sys.titleRo : sys.title}
                          </h3>
                        </div>

                        <div className="text-right border-l border-white/10 pl-6">
                          <p className="font-mono text-xs text-white/40 uppercase">{isRo ? "Limita de Înălțime" : "Height Capacity"}</p>
                          <p className="font-mono text-xl font-bold text-[var(--art-accent-copper)]">{sys.maxHeight}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-sans text-xs uppercase tracking-wider text-white/40 mb-2">{isRo ? "Monument Reprezentativ" : "Landmark Example"}</h4>
                        <p className="font-mono text-lg text-white font-semibold">{sys.landmark}</p>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2 pt-4">
                        <div className="border-l-2 border-[var(--art-accent-copper)] pl-4">
                          <h4 className="font-sans text-xs uppercase tracking-wider text-[var(--art-accent-copper)] mb-2">{isRo ? "Conceptul Cheie" : "Core Concept"}</h4>
                          <p className="font-sans text-sm text-white/80 leading-relaxed">
                            {isRo ? sys.conceptRo : sys.concept}
                          </p>
                        </div>

                        <div className="border-l-2 border-white/20 pl-4">
                          <h4 className="font-sans text-xs uppercase tracking-wider text-white/50 mb-2">{isRo ? "Inovație Tehnică" : "Engineering Breakthrough"}</h4>
                          <p className="font-sans text-sm text-white/60 leading-relaxed">
                            {isRo ? sys.techDetailRo : sys.techDetail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                );
              })()}
            </div>
          </motion.div>
        )}

        {/* Tab 3: The Great 1930 Race */}
        {activeTab === "race" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div className="max-w-2xl">
              <p className="font-sans text-base text-white/70 leading-relaxed">
                {isRo
                  ? "În 1929–1930, New York-ul a fost martorul celei mai intense curse arhitecturale din istorie. Trei turnuri au luptat pentru titlul de cea mai înaltă clădire din lume într-un interval de doar 14 luni."
                  : "In 1929–1930, Manhattan witnessed the most intense architectural race in human history. Three towers competed for the title of World's Tallest Building within a span of just 14 months."}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {HEIGHT_RACE_STORY.map((step, i) => (
                <div
                  key={step.building}
                  className="relative border border-white/10 bg-[var(--art-surface)] p-8 flex flex-col justify-between transition-all duration-300 hover:border-[var(--art-accent-copper)]"
                >
                  <div className="mb-6">
                    <span className="font-mono text-xs font-bold text-[var(--art-accent-copper)]">
                      {step.year} · STEP 0{i + 1}
                    </span>
                    <h3 className="art-text-heading text-2xl text-white mt-2 mb-1">{step.building}</h3>
                    <p className="font-mono text-lg font-bold text-[var(--art-accent-copper)]">{step.height}</p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="bg-black/40 p-4 border-l-2 border-[var(--art-accent-copper)]">
                      <p className="font-sans text-xs font-bold uppercase text-[var(--art-accent-copper)] mb-1">
                        {isRo ? "Mutarea Strategică" : "The Gambit"}
                      </p>
                      <p className="font-sans text-xs text-white/90">
                        {isRo ? step.gambitRo : step.gambit}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-white/60 leading-relaxed">
                      {isRo ? step.detailRo : step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
