"use client";

import React, { useState } from "react";
import { X, Swords, TrendingUp, DollarSign, Users, Landmark, GraduationCap, Award, Wifi, Home, Car, Scale } from "lucide-react";
import { EXPLORER_STATES } from "@/lib/data/explorer-data";
import { STATE_EXTENDED_DATA } from "@/lib/data/state-details";
import { STATE_DEMOGRAPHIC_BENCHMARKS } from "@/components/explorer/MapExplorerClient";

interface StateComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStateA?: string;
  initialStateB?: string;
}

export function StateComparisonModal({
  isOpen,
  onClose,
  initialStateA = "TX",
  initialStateB = "CA",
}: StateComparisonModalProps) {
  const [stateCodeA, setStateCodeA] = useState<string>(initialStateA);
  const [stateCodeB, setStateCodeB] = useState<string>(initialStateB);

  if (!isOpen) return null;

  const stateA = EXPLORER_STATES[stateCodeA];
  const stateB = EXPLORER_STATES[stateCodeB];
  const extA = STATE_EXTENDED_DATA[stateCodeA];
  const extB = STATE_EXTENDED_DATA[stateCodeB];
  const demoA = STATE_DEMOGRAPHIC_BENCHMARKS[stateCodeA];
  const demoB = STATE_DEMOGRAPHIC_BENCHMARKS[stateCodeB];

  if (!stateA || !stateB) return null;

  const statesList = Object.values(EXPLORER_STATES).sort((a, b) => a.name.en.localeCompare(b.name.en));

  // Ratios
  const ratioA = demoA ? (demoA.homeValue / demoA.income).toFixed(1) : "N/A";
  const ratioB = demoB ? (demoB.homeValue / demoB.income).toFixed(1) : "N/A";

  const evPerCapitaA = extA ? ((extA.electoralVotes / stateA.population)).toFixed(1) : "N/A";
  const evPerCapitaB = extB ? ((extB.electoralVotes / stateB.population)).toFixed(1) : "N/A";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-[#fbbf24]/40 bg-[#0a0a0f] p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Glowing Top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-[#fbbf24] to-emerald-500 rounded-full" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#fbbf24]/10 border border-[#fbbf24]/30 text-[#fbbf24]">
              <Swords className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-black text-white tracking-tight flex items-center gap-2">
                State vs State Comparison Duel
              </h2>
              <p className="font-body text-xs text-white/50">
                Multi-category civic, demographic, economic, and affordability benchmark
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State Selectors Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400 font-bold">State A</span>
            <select
              value={stateCodeA}
              onChange={(e) => setStateCodeA(e.target.value)}
              className="w-full bg-black/80 border border-blue-500/40 rounded-xl px-3 py-2 text-white font-bold font-display text-lg focus:outline-none focus:border-blue-400 cursor-pointer"
            >
              {statesList.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name.en} ({s.abbrev})
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">State B</span>
            <select
              value={stateCodeB}
              onChange={(e) => setStateCodeB(e.target.value)}
              className="w-full bg-black/80 border border-amber-500/40 rounded-xl px-3 py-2 text-white font-bold font-display text-lg focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {statesList.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name.en} ({s.abbrev})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multi-Category Comparison Cards */}
        <div className="space-y-4 pt-2">
          
          {/* Category 1: Economy & GDP */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#fbbf24] font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#fbbf24]" />
              State Economy & Gross State Product (GDP)
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-bold text-blue-400 font-mono text-lg text-left">
                ${stateA.gdp} Billion
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                GDP Output
              </div>
              <div className="col-span-5 font-bold text-amber-400 font-mono text-lg text-right">
                ${stateB.gdp} Billion
              </div>
            </div>
            <div className="h-2.5 w-full bg-white/10 rounded-full flex overflow-hidden">
              <div className="bg-blue-500 h-full transition-all" style={{ width: `${(stateA.gdp / (stateA.gdp + stateB.gdp)) * 100}%` }} />
              <div className="bg-amber-500 h-full transition-all" style={{ width: `${(stateB.gdp / (stateA.gdp + stateB.gdp)) * 100}%` }} />
            </div>
          </div>

          {/* Category 2: Median Income & Home Values (EQUAL SIZE & IMPORTANCE + AFFORDABILITY RATIO) */}
          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Median Income & Home Value (Census ACS)
              </span>
              <span className="font-mono text-[10px] text-emerald-400/70 font-bold">Home Value / Income Ratio</span>
            </div>

            <div className="grid grid-cols-12 gap-4 text-sm font-body items-center">
              {/* State A Values - Equal Size */}
              <div className="col-span-5 space-y-1 font-mono text-left">
                <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-blue-500/20">
                  <span className="text-white/40 text-[10px] uppercase font-bold">Income</span>
                  <span className="text-blue-300 font-bold text-base">${demoA?.income.toLocaleString() ?? "N/A"}</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-blue-500/20">
                  <span className="text-white/40 text-[10px] uppercase font-bold">Home Val</span>
                  <span className="text-blue-300 font-bold text-base">${demoA?.homeValue.toLocaleString() ?? "N/A"}</span>
                </div>
                <div className="text-[11px] font-mono text-blue-400 font-bold pt-1">
                  Price-to-Income Ratio: <strong className="text-white">{ratioA}x</strong>
                </div>
              </div>

              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                Equal Metric Benchmark
              </div>

              {/* State B Values - Equal Size */}
              <div className="col-span-5 space-y-1 font-mono text-right">
                <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-amber-500/20">
                  <span className="text-white/40 text-[10px] uppercase font-bold">Income</span>
                  <span className="text-amber-300 font-bold text-base">${demoB?.income.toLocaleString() ?? "N/A"}</span>
                </div>
                <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-amber-500/20">
                  <span className="text-white/40 text-[10px] uppercase font-bold">Home Val</span>
                  <span className="text-amber-300 font-bold text-base">${demoB?.homeValue.toLocaleString() ?? "N/A"}</span>
                </div>
                <div className="text-[11px] font-mono text-amber-400 font-bold pt-1">
                  Price-to-Income Ratio: <strong className="text-white">{ratioB}x</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Category 3: Housing & Broadband Digital Access */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-sky-400" />
              Homeownership Rate & High-Speed Broadband
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-mono text-left">
                <span className="font-bold text-blue-300 block text-base">{demoA?.ownerPct}% Homeowners</span>
                <span className="text-xs text-white/50 block">Broadband Internet: {demoA?.broadbandPct}%</span>
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                Housing & Net
              </div>
              <div className="col-span-5 font-mono text-right">
                <span className="font-bold text-amber-300 block text-base">{demoB?.ownerPct}% Homeowners</span>
                <span className="text-xs text-white/50 block">Broadband Internet: {demoB?.broadbandPct}%</span>
              </div>
            </div>
          </div>

          {/* Category 4: Commute Time & Poverty Rate */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-purple-400 font-bold flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-purple-400" />
              Mean Commute Time & Poverty Rate
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-mono text-left">
                <span className="font-bold text-blue-300 block text-base">{demoA?.commuteMins} min Commute</span>
                <span className="text-xs text-white/50 block">Poverty Rate: {demoA?.povertyPct}%</span>
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                Commute & Poverty
              </div>
              <div className="col-span-5 font-mono text-right">
                <span className="font-bold text-amber-300 block text-base">{demoB?.commuteMins} min Commute</span>
                <span className="text-xs text-white/50 block">Poverty Rate: {demoB?.povertyPct}%</span>
              </div>
            </div>
          </div>

          {/* Category 5: Education & Veterans */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-400 font-bold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              Higher Education & Veteran Population
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-mono text-left">
                <span className="font-bold text-blue-300 block text-base">{demoA?.eduPct}% Bachelor's+</span>
                <span className="text-xs text-white/50 block">Veteran Rate: {demoA?.vetPct}%</span>
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                Edu & Vets
              </div>
              <div className="col-span-5 font-mono text-right">
                <span className="font-bold text-amber-300 block text-base">{demoB?.eduPct}% Bachelor's+</span>
                <span className="text-xs text-white/50 block">Veteran Rate: {demoB?.vetPct}%</span>
              </div>
            </div>
          </div>

          {/* Category 6: Electoral Power & Constitution */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-indigo-400" />
              Electoral College Weight & Constitution Size
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-mono text-left">
                <span className="font-bold text-blue-300 block text-base">{extA?.electoralVotes ?? "N/A"} Electoral Votes</span>
                <span className="text-xs text-white/50 block">
                  {extA?.constitution.wordCount ? `${(extA.constitution.wordCount / 1000).toFixed(1)}k words (${extA.constitution.amendmentsCount} amend.)` : "Constitution"}
                </span>
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                EVs & Law
              </div>
              <div className="col-span-5 font-mono text-right">
                <span className="font-bold text-amber-300 block text-base">{extB?.electoralVotes ?? "N/A"} Electoral Votes</span>
                <span className="text-xs text-white/50 block">
                  {extB?.constitution.wordCount ? `${(extB.constitution.wordCount / 1000).toFixed(1)}k words (${extB.constitution.amendmentsCount} amend.)` : "Constitution"}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
