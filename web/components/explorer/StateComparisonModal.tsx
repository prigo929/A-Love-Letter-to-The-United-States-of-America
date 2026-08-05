"use client";

import React, { useState } from "react";
import { X, Swords, ArrowRightLeft, TrendingUp, DollarSign, Users, Landmark, GraduationCap, Award } from "lucide-react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl border border-[#fbbf24]/40 bg-[#0a0a0f] p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Glowing Top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-[#fbbf24] to-red-500 rounded-full" />

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
                Side-by-side economic, demographic, constitutional, and civic metric benchmark
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
          {/* State A Selector */}
          <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400 font-bold">Primary State</span>
            <select
              value={stateCodeA}
              onChange={(e) => setStateCodeA(e.target.value)}
              className="w-full bg-black/80 border border-blue-500/40 rounded-xl px-3 py-2 text-white font-bold font-display text-lg focus:outline-none focus:border-blue-400"
            >
              {statesList.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name.en} ({s.abbrev})
                </option>
              ))}
            </select>
          </div>

          {/* State B Selector */}
          <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold">Comparison State</span>
            <select
              value={stateCodeB}
              onChange={(e) => setStateCodeB(e.target.value)}
              className="w-full bg-black/80 border border-amber-500/40 rounded-xl px-3 py-2 text-white font-bold font-display text-lg focus:outline-none focus:border-amber-400"
            >
              {statesList.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name.en} ({s.abbrev})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Metric Comparison Table */}
        <div className="space-y-4 pt-2">
          
          {/* Economy & GDP */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#fbbf24] font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#fbbf24]" />
              Economy & Gross State Product (GDP)
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-bold text-blue-400 font-mono text-base text-left">
                ${stateA.gdp} Billion
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                State GDP
              </div>
              <div className="col-span-5 font-bold text-amber-400 font-mono text-base text-right">
                ${stateB.gdp} Billion
              </div>
            </div>
            {/* Visual Bar Comparison */}
            <div className="h-2.5 w-full bg-white/10 rounded-full flex overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all"
                style={{ width: `${(stateA.gdp / (stateA.gdp + stateB.gdp)) * 100}%` }}
              />
              <div
                className="bg-amber-500 h-full transition-all"
                style={{ width: `${(stateB.gdp / (stateA.gdp + stateB.gdp)) * 100}%` }}
              />
            </div>
          </div>

          {/* Median Income & Home Values */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Median Income & Home Value (Census ACS)
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-mono text-left">
                <span className="font-bold text-blue-300 block text-base">${demoA?.income.toLocaleString() ?? "N/A"}</span>
                <span className="text-[10px] text-white/40 block">Home Val: ${demoA?.homeValue.toLocaleString()}</span>
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                Income / House
              </div>
              <div className="col-span-5 font-mono text-right">
                <span className="font-bold text-amber-300 block text-base">${demoB?.income.toLocaleString() ?? "N/A"}</span>
                <span className="text-[10px] text-white/40 block">Home Val: ${demoB?.homeValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Demographics & Population */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-400 font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              Population & Education
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-mono text-left">
                <span className="font-bold text-blue-300 block text-base">{stateA.population} Million</span>
                <span className="text-[10px] text-white/40 block">Degree+: {demoA?.eduPct}% | Vets: {demoA?.vetPct}%</span>
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                Pop & Vets
              </div>
              <div className="col-span-5 font-mono text-right">
                <span className="font-bold text-amber-300 block text-base">{stateB.population} Million</span>
                <span className="text-[10px] text-white/40 block">Degree+: {demoB?.eduPct}% | Vets: {demoB?.vetPct}%</span>
              </div>
            </div>
          </div>

          {/* Constitution & Statehood */}
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-purple-400 font-bold flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-purple-400" />
              Constitution & Statehood Order
            </span>
            <div className="grid grid-cols-12 gap-2 text-sm font-body items-center">
              <div className="col-span-5 font-mono text-left">
                <span className="font-bold text-blue-300 block">#{stateA.statehoodOrder} ({stateA.statehoodYear})</span>
                <span className="text-[10px] text-white/40 block">
                  {extA?.constitution.wordCount ? `${(extA.constitution.wordCount / 1000).toFixed(1)}k words` : "Constitution"}
                </span>
              </div>
              <div className="col-span-2 text-center text-xs text-white/50 uppercase font-bold font-mono">
                Statehood Rank
              </div>
              <div className="col-span-5 font-mono text-right">
                <span className="font-bold text-amber-300 block">#{stateB.statehoodOrder} ({stateB.statehoodYear})</span>
                <span className="text-[10px] text-white/40 block">
                  {extB?.constitution.wordCount ? `${(extB.constitution.wordCount / 1000).toFixed(1)}k words` : "Constitution"}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
