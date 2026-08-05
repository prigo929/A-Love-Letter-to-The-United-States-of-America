"use client";

import React from "react";
import { X, Printer, Download, Landmark, FileText, CheckCircle2 } from "lucide-react";
import { EXPLORER_STATES } from "@/lib/data/explorer-data";
import { STATE_EXTENDED_DATA } from "@/lib/data/state-details";
import { STATE_DEMOGRAPHIC_BENCHMARKS } from "@/components/explorer/MapExplorerClient";

interface StateFactsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  stateAbbrev: string;
  locale: "en" | "ro";
}

export function StateFactsheetModal({
  isOpen,
  onClose,
  stateAbbrev,
  locale = "en",
}: StateFactsheetModalProps) {
  if (!isOpen) return null;

  const state = EXPLORER_STATES[stateAbbrev];
  const ext = STATE_EXTENDED_DATA[stateAbbrev];
  const demo = STATE_DEMOGRAPHIC_BENCHMARKS[stateAbbrev];

  if (!state) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl rounded-3xl border border-[#fbbf24]/50 bg-[#08080c] p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Action Controls Header (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40 flex items-center gap-1.5">
              <FileText className="w-3 h-3" />
              Official State Factsheet Generator
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fbbf24] hover:bg-amber-400 text-black font-bold font-mono text-xs transition-colors cursor-pointer shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Factsheet Document Header */}
        <div className="space-y-2 border-b pb-6 border-white/10 print:border-black/20">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#fbbf24] print:text-amber-800">
              The United States of America • Civic Profile
            </span>
            <span className="font-mono text-xs text-white/40 print:text-black/60 font-bold">
              Statehood #{state.statehoodOrder} ({state.statehoodYear})
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black text-white print:text-black tracking-tight">
            {state.name[locale]} ({state.abbrev})
          </h1>
          <p className="font-body text-sm text-white/60 print:text-black/80">
            Capital: <strong className="text-white print:text-black">{state.capital[locale]}</strong> • Region: <strong className="text-[#fbbf24] print:text-amber-800">{state.region}</strong>
          </p>
        </div>

        {/* 2×2 Core Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 print:grid-cols-4">
          <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] print:bg-slate-100 print:border-slate-300">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 print:text-black/60 font-bold block">Gross State Product</span>
            <span className="font-display text-lg font-bold text-[#fbbf24] print:text-amber-800">${state.gdp} Billion</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] print:bg-slate-100 print:border-slate-300">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 print:text-black/60 font-bold block">Population</span>
            <span className="font-display text-lg font-bold text-blue-400 print:text-blue-800">{state.population} Million</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] print:bg-slate-100 print:border-slate-300">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 print:text-black/60 font-bold block">Median Income</span>
            <span className="font-display text-lg font-bold text-emerald-400 print:text-emerald-800">${demo?.income.toLocaleString() ?? "N/A"}</span>
          </div>

          <div className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] print:bg-slate-100 print:border-slate-300">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 print:text-black/60 font-bold block">Electoral Votes</span>
            <span className="font-display text-lg font-bold text-purple-400 print:text-purple-800">{ext?.electoralVotes ?? "N/A"} Votes</span>
          </div>
        </div>

        {/* State Constitution & Governance Details */}
        {ext && (
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] print:bg-slate-50 print:border-slate-300 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#fbbf24] print:text-amber-800 font-bold flex items-center gap-1.5">
              <Landmark className="w-4 h-4" />
              State Governance & Constitution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body print:text-black">
              <div>
                <span className="text-white/40 print:text-black/60 block font-bold font-mono text-[10px]">GOVERNOR</span>
                <span className="text-white print:text-black font-semibold">{ext.governor[locale]}</span>
              </div>
              <div>
                <span className="text-white/40 print:text-black/60 block font-bold font-mono text-[10px]">LEGISLATURE</span>
                <span className="text-white print:text-black font-semibold">{ext.legislature[locale]}</span>
              </div>
              <div>
                <span className="text-white/40 print:text-black/60 block font-bold font-mono text-[10px]">CONSTITUTION ADOPTED</span>
                <span className="text-white print:text-black font-semibold">{ext.constitution.adoptedYear} ({(ext.constitution.wordCount / 1000).toFixed(1)}k words)</span>
              </div>
              <div>
                <span className="text-white/40 print:text-black/60 block font-bold font-mono text-[10px]">POLITICAL STRUCTURE</span>
                <span className="text-white print:text-black font-semibold">{ext.politicalStructure[locale]}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
