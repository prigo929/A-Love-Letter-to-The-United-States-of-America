"use client";

import { useState } from "react";
import { Cpu, Zap, Coins, Binary } from "lucide-react";

interface ComputeCalculatorProps {
  locale: string;
}

// Concrete real-world scales for parameters and tokens
const PARAMS_OPTIONS = [
  { label: "1.5B (Llama 3.2)", value: 1.5e9 },
  { label: "17B (Llama 4 Maverick)", value: 17e9 },
  { label: "70B (Llama 3.3)", value: 70e9 },
  { label: "175B (GPT-3 / o1-mini)", value: 175e9 },
  { label: "405B (Llama 3.1 / 4)", value: 405e9 },
  { label: "1.5T (Frontier MoE)", value: 1.5e12 },
];

const TOKENS_OPTIONS = [
  { label: "10B", value: 10e9 },
  { label: "100B", value: 100e9 },
  { label: "1T (Web Corpora)", value: 1e12 },
  { label: "5T (Chinchilla)", value: 5e12 },
  { label: "15T (Llama 3.1)", value: 15e12 },
  { label: "25T (GPT-5 class)", value: 25e12 },
  { label: "50T (Next-Gen)", value: 50e12 },
];

export function ComputeCalculator({ locale }: ComputeCalculatorProps) {
  const isRo = locale === "ro";
  const [paramIndex, setParamIndex] = useState(1); // Default to 17B Llama 4 Maverick
  const [tokenIndex, setTokenIndex] = useState(4); // Default to 15T

  const N = PARAMS_OPTIONS[paramIndex].value;
  const D = TOKENS_OPTIONS[tokenIndex].value;

  // Scaling Law: FLOPs = 6 * N * D
  const flops = 6 * N * D;

  // H100 operates at ~300 TFLOP/s real utilization (under Model FLOPs Utilization / MFU of 40-50%)
  const h100ThroughputPerSec = 300e12; // 300 TFLOPS
  const h100ThroughputPerHour = h100ThroughputPerSec * 3600; // ~1.08e18 FLOPs/hour
  const gpuHours = flops / h100ThroughputPerHour;

  // Estimated server rental cost at $2.00 / hour per H100
  const serverCost = gpuHours * 2.0;

  // H100 node board + cooling draws approx 1200W (1.2 kW) per GPU
  const powerMwh = (gpuHours * 1.2) / 1000;

  // Formatter utilities
  const formatFlops = (val: number) => {
    if (val >= 1e24) return `${(val / 1e24).toFixed(1)} YottaFLOPs`;
    if (val >= 1e21) return `${(val / 1e21).toFixed(1)} ZettaFLOPs`;
    if (val >= 1e18) return `${(val / 1e18).toFixed(1)} ExaFLOPs`;
    return `${(val / 1e15).toFixed(1)} PetaFLOPs`;
  };

  const formatCost = (val: number) => {
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 md:p-12 relative overflow-hidden max-w-5xl mx-auto shadow-xl">
      {/* Background radial glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#E8B923]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8B923] font-semibold mb-2 block">
          {isRo ? "LABORATORUL DE CALCULE" : "THE SCALING LAB"}
        </span>
        <h3 className="font-macro-display text-3xl font-bold text-white uppercase tracking-tight">
          {isRo ? "Simulatorul Legilor de Scalare a Modelului" : "Frontier Compute & Scaling Law Simulator"}
        </h3>
        <p className="text-sm text-white/60 mt-3 leading-relaxed font-body">
          {isRo
            ? "Estimează necesarul empiric de calcul și resurse pentru modelele lingvistice de frontieră pe baza legilor de scalare Kaplan & Chinchilla. Ajustați parametrii și volumele de tokeni pentru a calcula costurile serverelor și energia necesară."
            : "Estimate the empirical training compute and hardware footprints of large transformer networks based on Kaplan & Chinchilla scaling laws. Adjust parameters and token metrics to calculate server budgets and electrical loads."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls Column */}
        <div className="flex flex-col gap-8">
          {/* Sliders Container */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-center mb-3 text-sm font-semibold text-white/80 font-body">
                <span>{isRo ? "Parametrii Modelului (N)" : "Model Parameters (N)"}</span>
                <span className="text-[#E8B923] font-bold font-mono">
                  {PARAMS_OPTIONS[paramIndex].label}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={PARAMS_OPTIONS.length - 1}
                value={paramIndex}
                onChange={(e) => setParamIndex(parseInt(e.target.value))}
                className="w-full accent-[#E8B923] bg-white/10 rounded-lg appearance-none h-1 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1.5 uppercase">
                <span>1.5B</span>
                <span>17B</span>
                <span>70B</span>
                <span>175B</span>
                <span>405B</span>
                <span>1.5T</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3 text-sm font-semibold text-white/80 font-body">
                <span>{isRo ? "Tokeni de Antrenare (D)" : "Training Tokens (D)"}</span>
                <span className="text-[#E8B923] font-bold font-mono">
                  {TOKENS_OPTIONS[tokenIndex].label}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={TOKENS_OPTIONS.length - 1}
                value={tokenIndex}
                onChange={(e) => setTokenIndex(parseInt(e.target.value))}
                className="w-full accent-[#E8B923] bg-white/10 rounded-lg appearance-none h-1 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1.5 uppercase">
                <span>10B</span>
                <span>100B</span>
                <span>1T</span>
                <span>5T</span>
                <span>15T</span>
                <span>25T</span>
                <span>50T</span>
              </div>
            </div>
          </div>

          {/* Formulas footnote */}
          <p className="text-[11px] text-white/40 leading-relaxed border-t border-white/5 pt-6 font-body">
            {isRo
              ? "Formulă: Calcul total = 6 * N * D (FLOPS). Ipoteze: eficiența hardware H100 Tensor Core = 300 TFLOP/s (model de calcul real-world utilizat) și cost mediu de chirie cloud = 2.00 $/oră per GPU."
              : "Formulas: Total FLOPs = 6 * N * D. Assumptions: H100 hardware throughput = 300 TFLOP/s (real-world hardware utility factor) and cloud hardware rental fee = $2.00/hour per GPU."}
          </p>
        </div>

        {/* Metrics Grid Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Binary className="h-5 w-5 text-[#E8B923]" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-semibold">
                {isRo ? "CALCUL TOTAL" : "TOTAL COMPUTE"}
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white block tracking-tight font-macro-display mb-1">
                {formatFlops(flops)}
              </span>
              <span className="text-[10px] text-white/40 font-body block">
                {flops.toExponential(2)} FLOPS
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Cpu className="h-5 w-5 text-[#E8B923]" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-semibold">
                {isRo ? "ORE H100" : "H100 HOURS"}
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white block tracking-tight font-macro-display mb-1">
                {gpuHours.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-[10px] text-white/40 font-body block">
                {isRo ? "Ore totale de antrenament" : "Total continuous hardware hours"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Coins className="h-5 w-5 text-[#2ac3de]" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-semibold">
                {isRo ? "BUGET ESTIMAT" : "ESTIMATED BUDGET"}
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white block tracking-tight font-macro-display mb-1">
                {formatCost(serverCost)}
              </span>
              <span className="text-[10px] text-white/40 font-body block">
                {isRo ? "Cost de închiriere servere" : "Cloud server compute rental"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Zap className="h-5 w-5 text-[#ff9e64]" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-semibold">
                {isRo ? "ENERGIE TOTALĂ" : "POWER CONSUMPTION"}
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white block tracking-tight font-macro-display mb-1">
                {powerMwh >= 1000
                  ? `${(powerMwh / 1000).toFixed(1)} GWh`
                  : `${powerMwh.toLocaleString(undefined, { maximumFractionDigits: 0 })} MWh`}
              </span>
              <span className="text-[10px] text-white/40 font-body block">
                {isRo ? "Energie electrică consumată" : "Estimated electric network load"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
