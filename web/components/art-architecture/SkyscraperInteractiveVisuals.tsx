"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ART_ASSETS } from "@/lib/data/art-assets";

// ─────────────────────────────────────────────────────────────────────────────
// 1. ARCHITECTURAL AERODYNAMIC & STRUCTURAL ANALYSIS (Clean & Editorial)
// ─────────────────────────────────────────────────────────────────────────────

interface StructureLayer {
  id: string;
  name: string;
  nameRo: string;
  elevation: string;
  description: string;
  descriptionRo: string;
  telemetry: {
    swayDisplacement: string;
    shearForce: string;
    windLoad: string;
    dampingRatio: string;
  };
}

const STRUCTURE_LAYERS: StructureLayer[] = [
  {
    id: "spire",
    name: "Spire & Crown Pinnacle",
    nameRo: "Fleșă & Vârf Arhitectural",
    elevation: "1,400 — 1,776 FT",
    description: "Architectural pinnacle and lightning arrestor spire. Engineered with spiral stainless steel to break wind vortex resonance at extreme altitudes.",
    descriptionRo: "Vârf arhitectural și fleșă paratrăsnet. Proiectată din oțel inoxidabil în spirală pentru a sparge rezonanța vântului la altitudini extreme.",
    telemetry: {
      swayDisplacement: "14.2 in (Max)",
      shearForce: "180 kN",
      windLoad: "145 mph rated",
      dampingRatio: "5.8%",
    },
  },
  {
    id: "damper",
    name: "Tuned Mass Damper (800-Ton Pendulum)",
    nameRo: "Amortizor de Masă Computerizat (800 Tone)",
    elevation: "1,200 — 1,380 FT",
    description: "An 800-ton steel mass suspended on hydraulic pistons near the tower crown. When gale winds push the tower right, sensors swing the mass left to counter sway.",
    descriptionRo: "O masă de oțel de 800 de tone suspendată pe pistoane hidraulice. Când vântul împinge turnul la dreapta, senzori computerizați mișcă masa la stânga.",
    telemetry: {
      swayDisplacement: "4.1 in (Active)",
      shearForce: "850 kN",
      windLoad: "120 mph rated",
      dampingRatio: "8.4%",
    },
  },
  {
    id: "vortices",
    name: "Aerodynamic Blow-Through Slots",
    nameRo: "Fante de Vânt & Colțuri Bizotate",
    elevation: "850 — 1,050 FT",
    description: "Porous structural apertures engineered to let gale winds pass directly through the building envelope, destroying dangerous vortex shedding loops.",
    descriptionRo: "Deschideri structurale deschise ce lasă vântul să treacă direct prin fațadă, distrugând buclele de rezonanță ale vortexului.",
    telemetry: {
      swayDisplacement: "2.8 in",
      shearForce: "1,420 kN",
      windLoad: "110 mph rated",
      dampingRatio: "4.2%",
    },
  },
  {
    id: "core",
    name: "Ultra-High Strength Concrete Spine",
    nameRo: "Nucleu din Beton Armat 14,000 PSI",
    elevation: "100 — 1,400 FT",
    description: "A continuous 14,000 psi reinforced concrete shear wall box core that encapsulates elevator shafts and provides extreme structural rigidity.",
    descriptionRo: "O casetă continuă din beton armat de 14.000 psi care încapsulează puțurile de ascensor și oferă rigiditate structurală extremă.",
    telemetry: {
      swayDisplacement: "0.9 in",
      shearForce: "4,800 kN",
      windLoad: "Base Support",
      dampingRatio: "2.1%",
    },
  },
  {
    id: "bedrock",
    name: "Manhattan Schist Bedrock Caissons",
    nameRo: "Caroaje Ancorate în Roca de Ardezie",
    elevation: "0 — -100 FT",
    description: "Heavy caissons drilled 100 feet into 450-million-year-old metamorphic Manhattan schist bedrock, counteracting extreme overturning torque.",
    descriptionRo: "Caroaje forate 30m în ardezie metamorfică de 450 milioane de ani ancorate împotriva forțelor de răsturnare.",
    telemetry: {
      swayDisplacement: "0.0 in (Fixed)",
      shearForce: "12,500 kN",
      windLoad: "Ground Anchor",
      dampingRatio: "0.0%",
    },
  },
];

export function WindTunnelScannerVisualizer() {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const [selectedLayer, setSelectedLayer] = useState<string>("vortices");
  const [aerodynamicMode, setAerodynamicMode] = useState<"tapered" | "box">("tapered");
  const [windSpeedMph, setWindSpeedMph] = useState<number>(85);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-contrast clean vector stream canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const numParticles = 110;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * (width * 0.45),
      y: Math.random() * height,
      vx: (windSpeedMph / 24) + Math.random() * 1.5,
      vy: (Math.random() - 0.5) * 0.4,
      history: [] as { x: number; y: number }[],
      maxHistory: 10 + Math.floor(Math.random() * 6),
      size: 1.2,
      alpha: 0.3 + Math.random() * 0.5,
    }));

    const buildingX = width * 0.52;
    const buildingW = width * (aerodynamicMode === "tapered" ? 0.15 : 0.22);
    const buildingTopY = height * 0.12;
    const buildingBottomY = height * 0.88;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Clean vector wind lines
      particles.forEach((p) => {
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > p.maxHistory) p.history.shift();

        const speedFactor = windSpeedMph / 50;
        p.x += p.vx * speedFactor;
        p.y += p.vy;

        // Flow Deflection around Building Profile
        if (p.x > buildingX - 30 && p.x < buildingX + buildingW + 35 && p.y >= buildingTopY && p.y <= buildingBottomY) {
          if (aerodynamicMode === "tapered") {
            const deflection = p.y < height / 2 ? -1.6 : 1.6;
            p.y += deflection;
            p.vx *= 1.04;
          } else {
            p.vy += (Math.random() - 0.5) * 4.2;
            p.vx *= 0.92;
          }
        }

        // Draw Clean Vector Line
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let i = 1; i < p.history.length; i++) {
            ctx.lineTo(p.history[i].x, p.history[i].y);
          }
          ctx.strokeStyle = aerodynamicMode === "tapered"
            ? `rgba(255, 255, 255, ${p.alpha * 0.5})`
            : `rgba(190, 18, 60, ${p.alpha * 0.85})`;
          ctx.lineWidth = p.size;
          ctx.stroke();
        }

        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
          p.vx = (windSpeedMph / 24) + Math.random() * 1.5;
          p.history = [];
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [aerodynamicMode, windSpeedMph]);

  const activeLayerObj = STRUCTURE_LAYERS.find((l) => l.id === selectedLayer)!;

  return (
    <div className="border border-white/10 bg-[#080609] p-6 md:p-10 shadow-2xl">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
        <div>
          <p className="art-text-label mb-1" style={{ color: "var(--art-accent-copper)" }}>
            {isRo ? "Inginerie Structurală & Aerodinamică" : "Structural Engineering & Aerodynamics"}
          </p>
          <h3 className="art-text-heading text-2xl md:text-3xl text-white">
            {isRo ? "Test de Vânt & Analiză de Telemetrie" : "Wind Tunnel & Elevation Analysis"}
          </h3>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Wind Speed Control */}
          <div className="flex items-center gap-3 bg-[var(--art-surface)] px-4 py-2 border border-white/10">
            <span className="font-mono text-xs text-white/50">{isRo ? "Viteză Vânt:" : "Wind Speed:"}</span>
            <input
              type="range"
              min={30}
              max={150}
              value={windSpeedMph}
              onChange={(e) => setWindSpeedMph(Number(e.target.value))}
              className="w-24 accent-[var(--art-accent-copper)] cursor-pointer"
            />
            <span className="font-mono text-xs font-bold text-white w-16 text-right">{windSpeedMph} MPH</span>
          </div>

          {/* Aerodynamic Shape Mode Toggle */}
          <div className="flex items-center gap-1 rounded bg-[var(--art-surface)] p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setAerodynamicMode("tapered")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
                aerodynamicMode === "tapered"
                  ? "bg-[var(--art-accent-copper)] text-black font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isRo ? "Formă Aerodinamică" : "Tapered Profile"}
            </button>
            <button
              type="button"
              onClick={() => setAerodynamicMode("box")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
                aerodynamicMode === "box"
                  ? "bg-[var(--art-accent-crimson)] text-white font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isRo ? "Turn Dreptunghiular" : "Box Profile"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Visual & Telemetry Grid */}
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Architectural Blueprint Drawing Stage */}
        <div className="relative lg:col-span-7 min-h-[460px] bg-black border border-white/10 overflow-hidden flex items-center justify-center">
          {/* Particle Stream Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

          {/* Crisp Architectural Wireframe Building Silhouette */}
          <div className="relative z-0 flex flex-col items-center justify-center h-full py-8">
            <div
              className={`relative transition-all duration-500 border border-white/30 ${
                aerodynamicMode === "tapered"
                  ? "w-32 md:w-40 h-[380px] bg-white/5"
                  : "w-44 md:w-52 h-[360px] bg-red-950/20 border-red-500/40"
              }`}
              style={{
                clipPath:
                  aerodynamicMode === "tapered"
                    ? "polygon(42% 0%, 58% 0%, 72% 25%, 82% 65%, 100% 100%, 0% 100%, 18% 65%, 28% 25%)"
                    : "none",
              }}
            >
              {/* Internal Architectural Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_20px]" />

              {/* Dynamic Laser Elevation Scanner Line */}
              <motion.div
                className="absolute inset-x-0 h-0.5 bg-white/80 shadow-[0_0_8px_#ffffff]"
                animate={{ top: ["2%", "95%", "2%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Vortex Status Indicator */}
          <div className="absolute top-4 left-4 z-20 font-mono text-xs px-3.5 py-2 bg-black/90 border border-white/10">
            <span className="text-white/40">{isRo ? "REZONANȚĂ VORTEX:" : "VORTEX RESONANCE:"} </span>
            <span className={aerodynamicMode === "tapered" ? "text-white font-bold" : "text-[var(--art-accent-crimson)] font-bold"}>
              {aerodynamicMode === "tapered" ? (isRo ? "DISSIPATED (STABIL)" : "DISSIPATED (STABLE)") : (isRo ? "TURBULENCE (RISC)" : "HIGH TURBULENCE SWAY")}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] text-white/30 uppercase tracking-widest">
            {isRo ? "Diagramă Vectorială de Vânt" : "Vector Airflow Streamline Diagram"}
          </div>
        </div>

        {/* Structural Layer Selector & Telemetry Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <p className="font-mono text-xs uppercase tracking-wider text-white/50">
            {isRo ? "Selectează Nivelul Structural:" : "Select Elevation Layer:"}
          </p>

          <div className="space-y-2">
            {STRUCTURE_LAYERS.map((layer) => {
              const isSelected = selectedLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`w-full text-left p-4 border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "border-[var(--art-accent-copper)] bg-[var(--art-surface)] text-white font-bold"
                      : "border-white/10 bg-black/40 text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-sans text-xs">{isRo ? layer.nameRo : layer.name}</span>
                  <span className="font-mono text-[11px] tabular-nums text-[var(--art-accent-copper)]">{layer.elevation}</span>
                </button>
              );
            })}
          </div>

          {/* Telemetry Readout Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayerObj.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 border border-white/10 bg-[var(--art-surface)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold text-white uppercase">{isRo ? activeLayerObj.nameRo : activeLayerObj.name}</span>
                <span className="font-mono text-xs text-[var(--art-accent-copper)] font-bold">{activeLayerObj.elevation}</span>
              </div>

              <p className="font-sans text-xs text-white/70 leading-relaxed">
                {isRo ? activeLayerObj.descriptionRo : activeLayerObj.description}
              </p>

              {/* Telemetry Specs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 bg-black/50 border border-white/10">
                  <p className="font-mono text-[10px] text-white/40 uppercase">{isRo ? "Balans Lateral" : "Sway Displacement"}</p>
                  <p className="font-mono text-xs font-bold text-white mt-0.5">{activeLayerObj.telemetry.swayDisplacement}</p>
                </div>
                <div className="p-2.5 bg-black/50 border border-white/10">
                  <p className="font-mono text-[10px] text-white/40 uppercase">{isRo ? "Forță Forfecare" : "Shear Force"}</p>
                  <p className="font-mono text-xs font-bold text-white mt-0.5">{activeLayerObj.telemetry.shearForce}</p>
                </div>
                <div className="p-2.5 bg-black/50 border border-white/10">
                  <p className="font-mono text-[10px] text-white/40 uppercase">{isRo ? "Rezistență Vânt" : "Wind Rating"}</p>
                  <p className="font-mono text-xs font-bold text-white mt-0.5">{activeLayerObj.telemetry.windLoad}</p>
                </div>
                <div className="p-2.5 bg-black/50 border border-white/10">
                  <p className="font-mono text-[10px] text-white/40 uppercase">{isRo ? "Rată Amortizare" : "Damping Ratio"}</p>
                  <p className="font-mono text-xs font-bold text-[var(--art-accent-crimson)] mt-0.5">{activeLayerObj.telemetry.dampingRatio}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SIDE-BY-SIDE ARCHITECTURAL SCALE COMPARER WITH EIFFEL TOWER ASSET
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
    <div className="border border-white/10 bg-[#080609] p-6 md:p-10 shadow-2xl mt-12">
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

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED CLEAN VISUAL SUITE CONTAINER
// ─────────────────────────────────────────────────────────────────────────────

export function SkyscraperInteractiveVisuals() {
  return (
    <div className="space-y-16">
      <WindTunnelScannerVisualizer />
      <ArchitecturalScaleComparer />
    </div>
  );
}
