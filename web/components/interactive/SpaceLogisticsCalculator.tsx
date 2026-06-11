"use client";

import { useState, useMemo } from "react";
import { Rocket, Target, DollarSign, Weight, RefreshCw, Zap } from "lucide-react";

interface SpaceLogisticsCalculatorProps {
  locale: string;
}

// ─────────────────────────────────────────────────────
// Launch Vehicle Database (mid-2026 verified figures)
// ─────────────────────────────────────────────────────
const VEHICLES = [
  {
    id: "saturn-v",
    name: "Saturn V",
    era: "1967–1973",
    reusability: 0,
    costPerLaunch: 1200, // $M (2024 adjusted)
    color: "#94a3b8",
    colorAccent: "text-slate-400",
    borderColor: "border-slate-500/30",
    activeBorder: "border-slate-400/60",
    payload: { LEO: 140, GTO: 48, MOON: 43, MARS: 15 }, // metric tons
    refuelFlights: { LEO: 0, GTO: 0, MOON: 0, MARS: 0 },
    tag: "EXPENDABLE",
    tagColor: "text-slate-400",
  },
  {
    id: "shuttle",
    name: "Space Shuttle",
    era: "1981–2011",
    reusability: 20,
    costPerLaunch: 450, // $M average (2024 adjusted)
    color: "#7dd3fc",
    colorAccent: "text-sky-300",
    borderColor: "border-sky-500/20",
    activeBorder: "border-sky-400/60",
    payload: { LEO: 27.5, GTO: 0, MOON: 0, MARS: 0 }, // tons
    refuelFlights: { LEO: 0, GTO: 0, MOON: 0, MARS: 0 },
    tag: "PARTIAL REUSE",
    tagColor: "text-sky-400",
  },
  {
    id: "falcon-heavy",
    name: "Falcon Heavy",
    era: "2018–Present",
    reusability: 60,
    costPerLaunch: 97, // $M (2024)
    color: "#4ade80",
    colorAccent: "text-green-400",
    borderColor: "border-green-500/20",
    activeBorder: "border-green-400/60",
    payload: { LEO: 64, GTO: 26.7, MOON: 18, MARS: 8 }, // tons
    refuelFlights: { LEO: 0, GTO: 0, MOON: 0, MARS: 0 },
    tag: "HIGH REUSE",
    tagColor: "text-green-400",
  },
  {
    id: "starship",
    name: "Starship",
    era: "2024–Present",
    reusability: 100,
    costPerLaunch: 25, // $M target (fully reusable)
    color: "#E8B923",
    colorAccent: "text-[#E8B923]",
    borderColor: "border-[#E8B923]/20",
    activeBorder: "border-[#E8B923]/70",
    payload: { LEO: 150, GTO: 21, MOON: 100, MARS: 100 }, // tons (Moon/Mars with refueling)
    // In-orbit refueling tanker flights needed per payload mission
    refuelFlights: { LEO: 0, GTO: 0, MOON: 5, MARS: 7 },
    tag: "FULLY REUSABLE",
    tagColor: "text-[#E8B923]",
  },
];

type DestId = "LEO" | "GTO" | "MOON" | "MARS";

const DESTINATIONS: { id: DestId; label: string; labelRo: string; description: string; descriptionRo: string; icon: string }[] = [
  {
    id: "LEO",
    label: "Low Earth Orbit",
    labelRo: "Orbita Joasă (LEO)",
    description: "200–2,000 km altitude. ISS resupply, Starlink deployment, satellite bus.",
    descriptionRo: "Altitudine 200–2.000 km. Realimentare ISS, lansare Starlink, sateliți.",
    icon: "🌍",
  },
  {
    id: "GTO",
    label: "Geostationary Transfer",
    labelRo: "Transfer Geostaționat (GTO)",
    description: "35,786 km. Commercial telecom satellites, GPS replenishment.",
    descriptionRo: "35.786 km. Sateliți de telecomunicații comerciali, reaprovizionare GPS.",
    icon: "📡",
  },
  {
    id: "MOON",
    label: "Lunar Surface (Artemis)",
    labelRo: "Suprafața Lunii (Artemis)",
    description: "Moon landing via Artemis III mission profile. Requires in-orbit refueling for Starship.",
    descriptionRo: "Aselenizare prin profilul misiunii Artemis III. Necesită realimentare pe orbită pentru Starship.",
    icon: "🌕",
  },
  {
    id: "MARS",
    label: "Mars Surface",
    labelRo: "Suprafața lui Marte",
    description: "Interplanetary transit ~6–9 months. Requires in-orbit refueling depot + departure window.",
    descriptionRo: "Transit interplanetar ~6–9 luni. Necesită depozit de combustibil pe orbită.",
    icon: "🔴",
  },
];

// Payload slider: 1–150 metric tons
const PAYLOAD_STEPS = [1, 5, 10, 20, 30, 50, 70, 100, 120, 150];

export function SpaceLogisticsCalculator({ locale }: SpaceLogisticsCalculatorProps) {
  const isRo = locale === "ro";
  const [vehicleId, setVehicleId] = useState<string>("starship");
  const [destId, setDestId] = useState<DestId>("MOON");
  const [payloadIdx, setPayloadIdx] = useState(4); // default 30t

  const vehicle = VEHICLES.find((v) => v.id === vehicleId)!;
  const dest = DESTINATIONS.find((d) => d.id === destId)!;
  const payloadTons = PAYLOAD_STEPS[payloadIdx];

  const metrics = useMemo(() => {
    const cap = vehicle.payload[destId];
    if (cap === 0) return null; // vehicle can't reach this destination

    const payloadMissions = Math.ceil(payloadTons / cap);
    const refuelPerMission = vehicle.refuelFlights[destId];
    const totalFlights = payloadMissions * (1 + refuelPerMission);
    const totalCostM = totalFlights * vehicle.costPerLaunch;
    const costPerKg = (totalCostM * 1e6) / (payloadTons * 1000);
    const refuelTotal = payloadMissions * refuelPerMission;

    return { payloadMissions, refuelPerMission, totalFlights, totalCostM, costPerKg, refuelTotal };
  }, [vehicle, destId, payloadTons]);

  const formatCostM = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}B`;
    return `$${val.toFixed(0)}M`;
  };

  const formatCostKg = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}K/kg`;
    return `$${val.toFixed(0)}/kg`;
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 md:p-12 relative overflow-hidden max-w-6xl mx-auto shadow-xl">
      {/* Decorative glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#E8B923]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-10 relative z-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8B923] font-semibold mb-2 block">
          {isRo ? "SIMULATOR DE LANSARE" : "THE LAUNCH ECONOMICS LAB"}
        </span>
        <h3 className="font-macro-display text-3xl font-bold text-white uppercase tracking-tight">
          {isRo ? "Calculator de Logistică Spațială" : "Space Launch Economics & Logistics Calculator"}
        </h3>
        <p className="text-sm text-white/60 mt-3 leading-relaxed font-body max-w-3xl">
          {isRo
            ? "Compară costurile de lansare, capacitățile de sarcină și cerințele de realimentare pe orbită pentru vehiculele istorice și moderne. Explorează revoluția economică adusă de Starship față de Saturn V."
            : "Compare launch costs, payload capacities, and in-orbit refueling requirements across historical and modern vehicles. Explore the revolutionary economic transformation Starship represents versus the Saturn V era."}
        </p>
      </div>

      {/* Vehicle Selector */}
      <div className="mb-8 relative z-10">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3 font-semibold">
          {isRo ? "1. SELECTEAZĂ VEHICULUL DE LANSARE" : "1. SELECT LAUNCH VEHICLE"}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              onClick={() => setVehicleId(v.id)}
              className={`rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                vehicleId === v.id
                  ? `${v.activeBorder} bg-white/[0.05]`
                  : `${v.borderColor} bg-white/[0.01] hover:bg-white/[0.03]`
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Rocket className="h-4 w-4" style={{ color: v.color }} />
                <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold ${v.tagColor}`}>
                  {v.tag}
                </span>
              </div>
              <p className="font-macro-display text-sm font-bold text-white mb-0.5">{v.name}</p>
              <p className="text-[10px] text-white/40 font-mono">{v.era}</p>
              <p className="text-[10px] font-semibold mt-1.5" style={{ color: v.color }}>
                ${v.costPerLaunch}M / {isRo ? "lansare" : "launch"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Destination Selector */}
      <div className="mb-8 relative z-10">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3 font-semibold">
          {isRo ? "2. SELECTEAZĂ DESTINAȚIA" : "2. SELECT DESTINATION"}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {DESTINATIONS.map((d) => {
            const cap = vehicle.payload[d.id as DestId];
            const unreachable = cap === 0;
            return (
              <button
                key={d.id}
                onClick={() => !unreachable && setDestId(d.id as DestId)}
                disabled={unreachable}
                className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                  unreachable
                    ? "border-white/5 bg-white/[0.005] opacity-40 cursor-not-allowed"
                    : destId === d.id
                    ? "border-[#E8B923]/60 bg-[#E8B923]/5"
                    : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] hover:-translate-y-0.5"
                }`}
              >
                <span className="text-2xl block mb-2">{d.icon}</span>
                <p className="font-macro-display text-xs font-bold text-white leading-tight mb-1">
                  {isRo ? d.labelRo : d.label}
                </p>
                <p className="text-[10px] text-white/40 font-body leading-relaxed line-clamp-2">
                  {isRo ? d.descriptionRo : d.description}
                </p>
                {!unreachable && cap > 0 && (
                  <p className="text-[10px] font-mono font-semibold text-[#E8B923]/70 mt-2">
                    {isRo ? "Cap." : "Cap."} {cap}t
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Payload Slider */}
      <div className="mb-10 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold">
            {isRo ? "3. MASĂ SARCINĂ UTILĂ" : "3. PAYLOAD MASS"}
          </p>
          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-[#E8B923]" />
            <span className="text-base font-bold text-[#E8B923] font-mono">{payloadTons}t</span>
            <span className="text-[10px] text-white/40 font-mono">{isRo ? "tone metrice" : "metric tons"}</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max={PAYLOAD_STEPS.length - 1}
          value={payloadIdx}
          onChange={(e) => setPayloadIdx(parseInt(e.target.value))}
          className="w-full accent-[#E8B923] bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-white/20 font-mono mt-2 uppercase">
          {PAYLOAD_STEPS.map((s) => (
            <span key={s}>{s}t</span>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="relative z-10 border-t border-white/5 pt-8">
        {metrics === null ? (
          <div className="text-center py-12 text-white/40">
            <Target className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="font-mono text-sm">
              {isRo
                ? `${vehicle.name} nu poate ajunge la destinația selectată.`
                : `${vehicle.name} cannot reach the selected destination.`}
            </p>
            <p className="text-[11px] mt-1 text-white/30">
              {isRo ? "Selectează o altă combinație vehicul / destinație." : "Select a different vehicle / destination combination."}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-5 font-semibold">
              {isRo ? "ESTIMARE MISIUNE" : "MISSION ESTIMATES"}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Payload Missions */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 flex flex-col justify-between hover:border-[#E8B923]/20 transition-all duration-300">
                <div className="flex items-center gap-2 text-white/40 mb-4">
                  <Rocket className="h-4 w-4 text-[#E8B923]" />
                  <span className="text-[9px] uppercase font-mono tracking-widest font-semibold">
                    {isRo ? "ZBORURI SARCINĂ" : "PAYLOAD FLIGHTS"}
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-white block tracking-tight font-macro-display mb-1">
                    {metrics.payloadMissions}
                  </span>
                  <span className="text-[10px] text-white/40 font-body block">
                    {isRo ? `La câte ${vehicle.payload[destId]}t capacitate` : `At ${vehicle.payload[destId]}t capacity each`}
                  </span>
                </div>
              </div>

              {/* Refuel Flights */}
              <div className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 ${metrics.refuelTotal > 0 ? "border-[#E8B923]/20 bg-[#E8B923]/[0.02]" : "border-white/5 bg-white/[0.01]"}`}>
                <div className="flex items-center gap-2 text-white/40 mb-4">
                  <RefreshCw className={`h-4 w-4 ${metrics.refuelTotal > 0 ? "text-[#E8B923]" : "text-white/30"}`} />
                  <span className="text-[9px] uppercase font-mono tracking-widest font-semibold">
                    {isRo ? "ZBORURI REALIMENTARE" : "REFUEL TANKER FLIGHTS"}
                  </span>
                </div>
                <div>
                  <span className={`text-3xl font-bold block tracking-tight font-macro-display mb-1 ${metrics.refuelTotal > 0 ? "text-[#E8B923]" : "text-white/50"}`}>
                    {metrics.refuelTotal}
                  </span>
                  <span className="text-[10px] text-white/40 font-body block">
                    {metrics.refuelTotal > 0
                      ? isRo ? `${metrics.refuelPerMission} pe zbor de sarcină` : `${metrics.refuelPerMission} per payload flight`
                      : isRo ? "Realimentare neceesară" : "No in-orbit refueling"}
                  </span>
                </div>
              </div>

              {/* Total Cost */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 text-white/40 mb-4">
                  <DollarSign className="h-4 w-4 text-[#2ac3de]" />
                  <span className="text-[9px] uppercase font-mono tracking-widest font-semibold">
                    {isRo ? "COST TOTAL MISIUNE" : "TOTAL MISSION COST"}
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white block tracking-tight font-macro-display mb-1">
                    {formatCostM(metrics.totalCostM)}
                  </span>
                  <span className="text-[10px] text-white/40 font-body block">
                    {metrics.totalFlights} {isRo ? "zboruri totale" : "total flights"} × ${vehicle.costPerLaunch}M
                  </span>
                </div>
              </div>

              {/* Cost Per Kg */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 text-white/40 mb-4">
                  <Zap className="h-4 w-4 text-[#ff9e64]" />
                  <span className="text-[9px] uppercase font-mono tracking-widest font-semibold">
                    {isRo ? "COST PE KG" : "COST PER KILOGRAM"}
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white block tracking-tight font-macro-display mb-1">
                    {formatCostKg(metrics.costPerKg)}
                  </span>
                  <span className="text-[10px] text-white/40 font-body block">
                    {isRo ? "Eficiență utilă livrată pe orbită" : "Effective delivered payload efficiency"}
                  </span>
                </div>
              </div>
            </div>

            {/* Comparison Insight */}
            {vehicleId === "starship" && destId === "MOON" && (
              <div className="rounded-2xl border border-[#E8B923]/15 bg-[#E8B923]/[0.03] p-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#E8B923] font-semibold mb-2">
                  {isRo ? "PERSPECTIVĂ COMPARATIVĂ" : "COMPARATIVE INSIGHT"}
                </p>
                <p className="text-sm text-white/70 leading-relaxed font-body">
                  {isRo
                    ? `La o sarcină de ${payloadTons}t pe suprafața Lunii, Saturn V ar necesita ${Math.ceil(payloadTons / 43)} zboruri la un cost total estimat de ${formatCostM(Math.ceil(payloadTons / 43) * 1200)} — comparativ cu ${formatCostM(metrics.totalCostM)} pentru Starship. Aceasta reprezintă o reducere de cost de aproximativ ${Math.round((1 - metrics.totalCostM / (Math.ceil(payloadTons / 43) * 1200)) * 100)}% față de era Apollo.`
                    : `For ${payloadTons}t to the lunar surface, Saturn V would require ${Math.ceil(payloadTons / 43)} launches at an estimated ${formatCostM(Math.ceil(payloadTons / 43) * 1200)} — versus ${formatCostM(metrics.totalCostM)} for Starship. That is approximately ${Math.round((1 - metrics.totalCostM / (Math.ceil(payloadTons / 43) * 1200)) * 100)}% cheaper than the Apollo-era architecture.`}
                </p>
              </div>
            )}
            {vehicleId === "saturn-v" && destId === "LEO" && (
              <div className="rounded-2xl border border-slate-500/15 bg-white/[0.01] p-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2">
                  {isRo ? "CONTEXT ISTORIC" : "HISTORICAL CONTEXT"}
                </p>
                <p className="text-sm text-white/70 leading-relaxed font-body">
                  {isRo
                    ? `La eficiența de $${Math.round(metrics.costPerKg).toLocaleString()}/kg, Saturn V era extrem de scump pentru misiunile de aprovizionare LEO. Falcon Heavy reduce acest cost cu ~${Math.round((1 - (97 * 1e6) / (64 * 1000) / metrics.costPerKg) * 100)}%, în timp ce Starship vizează mai puțin de $100/kg — o transformare de câteva ordine de mărime.`
                    : `At $${Math.round(metrics.costPerKg).toLocaleString()}/kg, Saturn V was prohibitively expensive for routine LEO missions. Falcon Heavy reduces this cost dramatically, while Starship targets under $100/kg — a transformation of several orders of magnitude.`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer note */}
      <p className="text-[10px] text-white/25 mt-6 font-body leading-relaxed relative z-10 border-t border-white/5 pt-4">
        {isRo
          ? "Notă: Costurile sunt estimate în dolari din 2024 ajustați. Capacitățile Starship pentru Lună/Marte presupun realimentare criogenică în orbita joasă a Pământului (LEO) cu propulsori CH₄/LOX. Sursă: SpaceX, NASA, Bryce Space and Technology 2024."
          : "Costs are 2024-adjusted estimates. Starship Moon/Mars capacities assume cryogenic propellant transfer (CH₄/LOX) in LEO. Sources: SpaceX, NASA, Bryce Space and Technology 2024."}
      </p>
    </div>
  );
}
