"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ART_ASSETS } from "@/lib/data/art-assets";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// 1. OVERHAULED AERODYNAMIC WIND TUNNEL & LIVE TELEMETRY SCANNER
// ─────────────────────────────────────────────────────────────────────────────

interface StructureLayer {
  id: string;
  name: string;
  nameRo: string;
  elevation: string;
  heightFt: number;
  description: string;
  descriptionRo: string;
  telemetry: {
    swayDisplacement: string;
    shearForce: string;
    windLoad: string;
    dampingRatio: string;
  };
  icon: string;
  color: string;
}

const STRUCTURE_LAYERS: StructureLayer[] = [
  {
    id: "spire",
    name: "Spire & Broadcast Crown",
    nameRo: "Fleșă & Coroană de Transmisie",
    elevation: "1,400 — 1,776 FT",
    heightFt: 1776,
    description: "Architectural pinnacle and lightning arrestor spire. Engineered with spiral stainless steel to break wind resonance at extreme altitudes.",
    descriptionRo: "Vârf arhitectural și fleșă paratrăsnet. Proiectată din oțel inoxidabil în spirală pentru a sparge rezonanța vântului la altitudini extreme.",
    telemetry: {
      swayDisplacement: "14.2 in (Max)",
      shearForce: "180 kN",
      windLoad: "145 mph rated",
      dampingRatio: "5.8%",
    },
    icon: "⚡",
    color: "#E8C97A",
  },
  {
    id: "damper",
    name: "Tuned Mass Damper (800-Ton Pendulum)",
    nameRo: "Amortizor de Masă Computerizat (800 Tone)",
    elevation: "1,200 — 1,380 FT",
    heightFt: 1350,
    description: "An 800-ton steel mass suspended on hydraulic pistons. When hurricane winds push the tower right, computer sensors swing the mass left to neutralize sway.",
    descriptionRo: "O masă de oțel de 800 de tone suspendată pe pistoane hidraulice. Când vântul împinge turnul la dreapta, senzori computerizați mișcă masa la stânga.",
    telemetry: {
      swayDisplacement: "4.1 in (Active)",
      shearForce: "850 kN",
      windLoad: "120 mph rated",
      dampingRatio: "8.4%",
    },
    icon: "⚖️",
    color: "var(--art-accent-crimson)",
  },
  {
    id: "vortices",
    name: "Aerodynamic Blow-Through Slots",
    nameRo: "Fante de Vânt & Colțuri Bizotate",
    elevation: "850 — 1,050 FT",
    heightFt: 950,
    description: "Porous structural apertures engineered to let gale winds pass directly through the building envelope, destroying dangerous vortex shedding loops.",
    descriptionRo: "Deschideri structurale deschise ce lasă vântul să treacă direct prin fațadă, distrugând buclele de rezonanță ale vortexului.",
    telemetry: {
      swayDisplacement: "2.8 in",
      shearForce: "1,420 kN",
      windLoad: "110 mph rated",
      dampingRatio: "4.2%",
    },
    icon: "💨",
    color: "#38BDF8",
  },
  {
    id: "core",
    name: "Ultra-High Strength Concrete Spine",
    nameRo: "Nucleu din Beton Armat 14,000 PSI",
    elevation: "100 — 1,400 FT",
    heightFt: 500,
    description: "A continuous 14,000 psi reinforced concrete shear wall box core that encapsulates elevator shafts and provides structural rigidity.",
    descriptionRo: "O casetă continuă din beton armat de 14.000 psi care încapsulează puțurile de ascensor și oferă rigiditate structurală extremă.",
    telemetry: {
      swayDisplacement: "0.9 in",
      shearForce: "4,800 kN",
      windLoad: "Base Support",
      dampingRatio: "2.1%",
    },
    icon: "🏛️",
    color: "var(--art-accent-copper)",
  },
  {
    id: "bedrock",
    name: "Manhattan Schist Bedrock Caissons",
    nameRo: "Caroaje Ancorate în Roca de Ardezie",
    elevation: "0 — -100 FT",
    heightFt: 0,
    description: "Heavy caissons drilled 100 feet into 450-million-year-old metamorphic Manhattan schist bedrock, counteracting extreme overturning torque.",
    descriptionRo: "Caroaje forate 30m în ardezie metamorfică de 450 milioane de ani ancorate împotriva forțelor de răsturnare.",
    telemetry: {
      swayDisplacement: "0.0 in (Fixed)",
      shearForce: "12,500 kN",
      windLoad: "Ground Anchor",
      dampingRatio: "0.0%",
    },
    icon: "⚓",
    color: "#A8A29E",
  },
];

export function WindTunnelScannerVisualizer() {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const [selectedLayer, setSelectedLayer] = useState<string>("vortices");
  const [aerodynamicMode, setAerodynamicMode] = useState<"tapered" | "box">("tapered");
  const [windSpeedMph, setWindSpeedMph] = useState<number>(85);
  const [showWireframe, setShowWireframe] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Advanced Canvas Particle Vector Field Engine
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

    const numParticles = 140;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * (width * 0.45),
      y: Math.random() * height,
      vx: (windSpeedMph / 20) + Math.random() * 2,
      vy: (Math.random() - 0.5) * 0.5,
      history: [] as { x: number; y: number }[],
      maxHistory: 8 + Math.floor(Math.random() * 6),
      size: 1.2 + Math.random() * 1.8,
      alpha: 0.2 + Math.random() * 0.7,
    }));

    const buildingX = width * 0.52;
    const buildingW = width * (aerodynamicMode === "tapered" ? 0.16 : 0.22);
    const buildingTopY = height * 0.1;
    const buildingBottomY = height * 0.9;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Pressure Heatmap Aura around Windward Wall
      const gradient = ctx.createRadialGradient(buildingX - 10, height / 2, 10, buildingX - 10, height / 2, 160);
      if (aerodynamicMode === "box") {
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.35)");
        gradient.addColorStop(1, "rgba(239, 68, 68, 0)");
      } else {
        gradient.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(buildingX - 160, 0, 320, height);

      // Update & Draw Particles with Smooth Streamline Trails
      particles.forEach((p) => {
        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > p.maxHistory) p.history.shift();

        const speedFactor = windSpeedMph / 50;
        p.x += p.vx * speedFactor;
        p.y += p.vy;

        // Collision & Flow Deflection Logic
        if (p.x > buildingX - 35 && p.x < buildingX + buildingW + 40 && p.y >= buildingTopY && p.y <= buildingBottomY) {
          if (aerodynamicMode === "tapered") {
            // Smooth laminar flow curve around tapered setbacks
            const distFromTop = (p.y - buildingTopY) / (buildingBottomY - buildingTopY);
            const deflectionDirection = p.y < height / 2 ? -1.8 : 1.8;
            p.y += deflectionDirection * (1 - distFromTop * 0.3);
            p.vx *= 1.05;
          } else {
            // Violent turbulent vortex shedding for box geometry
            p.vy += (Math.random() - 0.5) * 5.5;
            p.vx *= 0.90;
          }
        }

        // Draw Streamline Trail
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let i = 1; i < p.history.length; i++) {
            ctx.lineTo(p.history[i].x, p.history[i].y);
          }
          ctx.strokeStyle = aerodynamicMode === "tapered"
            ? `rgba(56, 189, 248, ${p.alpha * 0.6})`
            : `rgba(244, 63, 94, ${p.alpha * 0.8})`;
          ctx.lineWidth = p.size;
          ctx.stroke();
        }

        // Reset particle on edge exit
        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
          p.vx = (windSpeedMph / 20) + Math.random() * 2;
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
    <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e0a12] to-[#080609] p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--art-accent-copper)]">
              {isRo ? "Sistem de Telemetrie Aerodinamică" : "Live Aerodynamic Telemetry Suite"}
            </span>
          </div>
          <h3 className="art-text-heading text-3xl text-white">
            {isRo ? "Tunelul de Vânt & Scannerul Structural" : "Wind Tunnel & Structural Layer Scanner"}
          </h3>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Wind Speed Slider */}
          <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded-lg border border-white/10">
            <span className="font-mono text-xs text-white/50">{isRo ? "Viteza Vântului:" : "Wind Velocity:"}</span>
            <input
              type="range"
              min={30}
              max={150}
              value={windSpeedMph}
              onChange={(e) => setWindSpeedMph(Number(e.target.value))}
              className="w-24 accent-[var(--art-accent-copper)] cursor-pointer"
            />
            <span className="font-mono text-xs font-bold text-cyan-400 w-16 text-right">{windSpeedMph} MPH</span>
          </div>

          {/* Aerodynamic Shape Mode Toggle */}
          <div className="flex items-center gap-1.5 rounded-lg bg-black/60 p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setAerodynamicMode("tapered")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-all ${
                aerodynamicMode === "tapered"
                  ? "bg-[var(--art-accent-copper)] text-black font-bold shadow-[0_0_15px_rgba(196,149,106,0.5)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isRo ? "Tapered Supertall" : "Tapered Supertall"}
            </button>
            <button
              type="button"
              onClick={() => setAerodynamicMode("box")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-all ${
                aerodynamicMode === "box"
                  ? "bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {isRo ? "Un-Tapered Box" : "Un-Tapered Box"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Visual & Telemetry Grid */}
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Canvas Visual Stage */}
        <div className="relative lg:col-span-7 min-h-[480px] rounded-xl bg-[#060408] border border-white/15 overflow-hidden flex items-center justify-center">
          {/* Particle Stream Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

          {/* Building Blueprint / Wireframe Representation */}
          <div className="relative z-0 flex flex-col items-center justify-center h-full py-8">
            <div
              className={`relative transition-all duration-700 ${
                aerodynamicMode === "tapered"
                  ? "w-32 md:w-44 h-[400px] bg-gradient-to-t from-[var(--art-accent-copper)]/20 via-cyan-500/10 to-transparent"
                  : "w-48 md:w-56 h-[380px] bg-gradient-to-t from-rose-900/30 via-red-500/10 to-transparent border border-rose-500/30"
              }`}
              style={{
                clipPath:
                  aerodynamicMode === "tapered"
                    ? "polygon(42% 0%, 58% 0%, 72% 25%, 82% 65%, 100% 100%, 0% 100%, 18% 65%, 28% 25%)"
                    : "none",
              }}
            >
              {/* Internal Grid / Blueprint Wireframe Lines */}
              {showWireframe && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:12px_16px]" />
              )}

              {/* Dynamic Sway Motion Indicator */}
              <motion.div
                className="absolute inset-x-0 h-full border-r-2 border-cyan-400/60"
                animate={{
                  x: aerodynamicMode === "box" ? [-8, 8, -8] : [-2, 2, -2],
                }}
                transition={{ duration: aerodynamicMode === "box" ? 1.5 : 3.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Laser Elevation Scanner Line */}
              <motion.div
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38bdf8]"
                animate={{ top: ["2%", "95%", "2%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Aerodynamic Turbulence Telemetry Badge */}
          <div className="absolute top-4 left-4 z-20 font-mono text-xs px-3.5 py-2 rounded-lg bg-black/80 backdrop-blur border border-white/10 flex items-center gap-3">
            <div className={`h-2.5 w-2.5 rounded-full ${aerodynamicMode === "tapered" ? "bg-cyan-400 shadow-[0_0_8px_#38bdf8]" : "bg-rose-500 shadow-[0_0_8px_#f43f5e]"}`} />
            <div>
              <p className="text-white/40 text-[10px] uppercase">{isRo ? "Status Rezonanță:" : "Vortex Resonance:"}</p>
              <p className={`font-bold ${aerodynamicMode === "tapered" ? "text-cyan-400" : "text-rose-400"}`}>
                {aerodynamicMode === "tapered" ? (isRo ? "DISSIPATED (DAMPED)" : "DISSIPATED (STABLE)") : (isRo ? "CRITICAL SWAY VORTEX" : "HIGH TURBULENCE SWAY")}
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-20 font-mono text-[10px] text-white/40">
            {isRo ? "Animație vectorizată în timp real · Simulare vânt" : "Real-time particle vector field simulation"}
          </div>
        </div>

        {/* Structural Layer Selector & Telemetry Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <p className="font-mono text-xs uppercase tracking-wider text-white/50">
            {isRo ? "Selectează Nivelul Structural pentru Analiză:" : "Select Structural Elevation Layer:"}
          </p>

          <div className="space-y-2">
            {STRUCTURE_LAYERS.map((layer) => {
              const isSelected = selectedLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "border-[var(--art-accent-copper)] bg-white/10 text-white font-bold shadow-[0_0_20px_rgba(196,149,106,0.2)]"
                      : "border-white/10 bg-black/40 text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{layer.icon}</span>
                    <div>
                      <p className="font-sans text-xs">{isRo ? layer.nameRo : layer.name}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] tabular-nums text-[var(--art-accent-copper)]">{layer.elevation}</span>
                </button>
              );
            })}
          </div>

          {/* Live Telemetry Module */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayerObj.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-xl border border-white/15 bg-black/70 backdrop-blur space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{activeLayerObj.icon}</span>
                  <span className="font-mono text-xs font-bold text-white uppercase">{isRo ? activeLayerObj.nameRo : activeLayerObj.name}</span>
                </div>
                <span className="font-mono text-xs text-[var(--art-accent-copper)] font-bold">{activeLayerObj.elevation}</span>
              </div>

              <p className="font-sans text-xs text-white/80 leading-relaxed">
                {isRo ? activeLayerObj.descriptionRo : activeLayerObj.description}
              </p>

              {/* 4 Telemetry Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  <p className="font-mono text-[10px] text-white/40 uppercase">{isRo ? "Balans Lateral" : "Sway Displacement"}</p>
                  <p className="font-mono text-xs font-bold text-cyan-400 mt-0.5">{activeLayerObj.telemetry.swayDisplacement}</p>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  <p className="font-mono text-[10px] text-white/40 uppercase">{isRo ? "Forță Forfecare" : "Shear Force"}</p>
                  <p className="font-mono text-xs font-bold text-amber-400 mt-0.5">{activeLayerObj.telemetry.shearForce}</p>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  <p className="font-mono text-[10px] text-white/40 uppercase">{isRo ? "Rezistență Vânt" : "Wind Rating"}</p>
                  <p className="font-mono text-xs font-bold text-emerald-400 mt-0.5">{activeLayerObj.telemetry.windLoad}</p>
                </div>
                <div className="p-2.5 rounded bg-white/5 border border-white/5">
                  <p className="font-mono text-[10px] text-white/40 uppercase">{isRo ? "Rată Amortizare" : "Damping Ratio"}</p>
                  <p className="font-mono text-xs font-bold text-rose-400 mt-0.5">{activeLayerObj.telemetry.dampingRatio}</p>
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
// 2. OVERHAULED 24-HOUR SKYLINE LIGHTING & ATMOSPHERE SIMULATOR
// ─────────────────────────────────────────────────────────────────────────────

interface TimeOfDaySetting {
  timeHour: number;
  timeDisplay: string;
  label: string;
  labelRo: string;
  skyGradient: string;
  filter: string;
  glowColor: string;
  windowOpacity: number;
  beaconOpacity: number;
  sunMoonIcon: string;
}

const TIME_SETTINGS: TimeOfDaySetting[] = [
  {
    timeHour: 6,
    timeDisplay: "06:00 EST",
    label: "Dawn Golden Hour",
    labelRo: "Zori de Zi — Ora de Aur",
    skyGradient: "linear-gradient(to top, #fb923c 0%, #c2410c 35%, #1e1b4b 100%)",
    filter: "brightness(0.75) contrast(1.15) sepia(0.25)",
    glowColor: "#fb923c",
    windowOpacity: 0.3,
    beaconOpacity: 0.2,
    sunMoonIcon: "🌅",
  },
  {
    timeHour: 12,
    timeDisplay: "12:00 EST",
    label: "Midday Solar Peak",
    labelRo: "Amiază Însorită",
    skyGradient: "linear-gradient(to top, #bae6fd 0%, #0284c7 50%, #0369a1 100%)",
    filter: "brightness(1.0) contrast(1.05)",
    glowColor: "#ffffff",
    windowOpacity: 0.0,
    beaconOpacity: 0.0,
    sunMoonIcon: "☀️",
  },
  {
    timeHour: 18,
    timeDisplay: "18:30 EST",
    label: "Sunset Crimson Glow",
    labelRo: "Apus Stacojiu",
    skyGradient: "linear-gradient(to top, #f43f5e 0%, #be123c 45%, #0f172a 100%)",
    filter: "brightness(0.65) contrast(1.25) hue-rotate(-10deg)",
    glowColor: "#f43f5e",
    windowOpacity: 0.6,
    beaconOpacity: 0.5,
    sunMoonIcon: "🌇",
  },
  {
    timeHour: 0,
    timeDisplay: "00:00 EST",
    label: "Midnight Neon Spire",
    labelRo: "Miezul Nopții — Coroană Art Deco",
    skyGradient: "linear-gradient(to top, #09090b 0%, #030712 50%, #000000 100%)",
    filter: "brightness(0.45) contrast(1.3) saturate(0.8)",
    glowColor: "var(--art-accent-copper)",
    windowOpacity: 0.9,
    beaconOpacity: 1.0,
    sunMoonIcon: "🌙",
  },
];

export function SkylineLightingSimulator() {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const [timeIndex, setTimeIndex] = useState<number>(3); // Default Midnight
  const setting = TIME_SETTINGS[timeIndex];

  return (
    <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e0a12] to-[#080609] p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] mt-12">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--art-accent-copper)]">
            {isRo ? "Simulare de Iluminare 24 Ore" : "24-Hour Atmospheric Lighting Simulator"}
          </span>
          <h3 className="art-text-heading text-3xl text-white mt-1">
            {isRo ? "Lumina și Silueta New York-ului" : "Manhattan Skyline Lighting & Atmosphere"}
          </h3>
        </div>

        {/* Time Preset Selector Buttons */}
        <div className="flex items-center gap-2 rounded-lg bg-black/60 p-1.5 border border-white/10">
          {TIME_SETTINGS.map((t, idx) => (
            <button
              key={t.timeDisplay}
              type="button"
              onClick={() => setTimeIndex(idx)}
              className={`px-3.5 py-2 font-mono text-xs flex items-center gap-2 rounded transition-all ${
                timeIndex === idx
                  ? "bg-[var(--art-accent-copper)] text-black font-bold shadow-[0_0_15px_rgba(196,149,106,0.5)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <span>{t.sunMoonIcon}</span>
              <span>{t.timeDisplay}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Atmosphere Stage */}
      <div className="relative h-[520px] w-full rounded-xl overflow-hidden border border-white/15 transition-all duration-1000">
        {/* Dynamic Sky Gradient Layer */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: setting.skyGradient }}
        />

        {/* High-Res Hero Image with Dynamic Lighting Filters */}
        <div className="absolute inset-0 transition-all duration-1000">
          <Image
            src={ART_ASSETS.empireStateRockefeller.src}
            alt="Empire State Building Skyline View"
            fill
            className="object-cover transition-all duration-1000"
            style={{ filter: setting.filter }}
            sizes="100vw"
            unoptimized
          />
        </div>

        {/* Night Window Lights Grid Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 bg-[radial-gradient(#fef08a_1px,transparent_1px)] bg-[size:16px_24px]"
          style={{ opacity: setting.windowOpacity * 0.4 }}
        />

        {/* Spire Beacon Dual Rotating Searchlight Beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[400px] pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: setting.beaconOpacity,
            background: `radial-gradient(ellipse at top, ${setting.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Info Telemetry Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 shadow-2xl">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{setting.sunMoonIcon}</span>
            <div>
              <p className="font-mono text-xs text-[var(--art-accent-copper)] font-bold">{setting.timeDisplay}</p>
              <p className="art-text-heading text-xl text-white">{isRo ? setting.labelRo : setting.label}</p>
            </div>
          </div>

          <div className="font-mono text-xs text-white/60 text-right space-y-1">
            <p className="text-white">{isRo ? "Iluminat Spire Art Deco & Geamuri" : "Art Deco Crown & Spire Illumination"}</p>
            <p className="text-white/40">{isRo ? "Filtru de atmosferă foto-realist" : "Real-time atmospheric lighting filter"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. OVERHAULED SIDE-BY-SIDE ARCHITECTURAL SCALE COMPARER WITH RULER
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
    imageSrc: ART_ASSETS.flatiron.src,
  },
];

export function ArchitecturalScaleComparer() {
  const { locale } = useLanguage();
  const isRo = locale === "ro";

  const [selectedIds, setSelectedIds] = useState<string[]>(["wtc", "willis", "esb", "chrysler"]);

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
    <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e0a12] to-[#080609] p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] mt-12">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--art-accent-copper)]">
            {isRo ? "Comparație Interactivă de Scară Arhitecturală" : "Interactive Side-by-Side Proportional Scale Comparer"}
          </span>
          <h3 className="art-text-heading text-3xl text-white mt-1">
            {isRo ? "Scara Înălțimilor în Proporție Reală" : "Proportional Height Scale Visualizer"}
          </h3>
        </div>

        <p className="font-mono text-xs text-white/50">
          {isRo ? "Alege până la 5 clădiri pentru a compara:" : "Select up to 5 towers to compare:"}
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
              className={`px-4 py-2 font-mono text-xs rounded-lg border transition-all ${
                isSelected
                  ? "border-[var(--art-accent-copper)] bg-[var(--art-accent-copper)]/20 text-[var(--art-accent-copper)] font-bold shadow-[0_0_15px_rgba(196,149,106,0.3)]"
                  : "border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {b.name} ({b.feet}ft)
            </button>
          );
        })}
      </div>

      {/* Proportional Scale Stage */}
      <div className="relative h-[460px] w-full border-b border-white/20 flex items-end justify-around px-4 rounded-b-xl bg-black/40 overflow-hidden">
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
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex-1 max-w-[130px] mx-2 flex flex-col items-center justify-between group"
            >
              {/* Photo Banner Inside Bar */}
              <div className="relative w-full h-full rounded-t-lg overflow-hidden border border-white/25 bg-white/5 shadow-2xl">
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
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center whitespace-nowrap bg-black/90 backdrop-blur px-2.5 py-1 border border-white/20 rounded-lg shadow-xl">
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
// COMBINED OVERHAULED VISUAL SUITE CONTAINER
// ─────────────────────────────────────────────────────────────────────────────

export function SkyscraperInteractiveVisuals() {
  return (
    <div className="space-y-16">
      <WindTunnelScannerVisualizer />
      <SkylineLightingSimulator />
      <ArchitecturalScaleComparer />
    </div>
  );
}
