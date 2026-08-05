"use client";

import React, { useState } from "react";
import { X, Swords, TrendingUp, DollarSign, GraduationCap, Landmark, Wifi, Home, Car, Globe, ShoppingCart } from "lucide-react";
import { EXPLORER_STATES } from "@/lib/data/explorer-data";
import { STATE_EXTENDED_DATA } from "@/lib/data/state-details";
import { STATE_DEMOGRAPHIC_BENCHMARKS } from "@/components/explorer/MapExplorerClient";
import { LOCAL_CENSUS_ACS_DATABASE } from "@/lib/data/census-local-data";

interface StateComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStateA?: string;
  initialStateB?: string;
}

// A single neutral accent (gold) plus plain white/ink text for the two states —
// no per-category rainbow. State A stays default white, State B is the accent.
const ACCENT = "#C9A24A";

function Row({
  icon: Icon,
  label,
  a,
  b,
  unitA,
  unitB,
  subA,
  subB,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  a: string;
  b: string;
  unitA?: string;
  unitB?: string;
  subA?: string;
  subB?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">
        <Icon className="h-3 w-3" />
        {label}
      </span>
      <div className="grid grid-cols-2 gap-4 font-body">
        <div>
          <span className="font-mono text-lg font-bold text-white">
            {a}
            {unitA && <span className="ml-1 text-xs font-medium text-white/40">{unitA}</span>}
          </span>
          {subA && <span className="mt-0.5 block text-[11px] text-white/40">{subA}</span>}
        </div>
        <div className="text-right">
          <span className="font-mono text-lg font-bold" style={{ color: ACCENT }}>
            {b}
            {unitB && <span className="ml-1 text-xs font-medium text-white/40">{unitB}</span>}
          </span>
          {subB && <span className="mt-0.5 block text-[11px] text-white/40">{subB}</span>}
        </div>
      </div>
    </div>
  );
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
  // Real ACS fields (work-from-home, foreign-born, SNAP, vehicle access) not
  // covered by the benchmark table, pulled from the live-verified local dataset.
  const acsA = LOCAL_CENSUS_ACS_DATABASE[stateCodeA];
  const acsB = LOCAL_CENSUS_ACS_DATABASE[stateCodeB];

  if (!stateA || !stateB) return null;

  const statesList = Object.values(EXPLORER_STATES).sort((a, b) => a.name.en.localeCompare(b.name.en));

  const ratioA = demoA ? (demoA.homeValue / demoA.income).toFixed(1) : "N/A";
  const ratioB = demoB ? (demoB.homeValue / demoB.income).toFixed(1) : "N/A";

  const gdpTotal = stateA.gdp + stateB.gdp;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl cursor-default space-y-5 overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0a0f] p-6 shadow-2xl md:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/70">
              <Swords className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-white">
                State vs. State
              </h2>
              <p className="font-body text-xs text-white/40">
                Civic, demographic, and economic benchmarks · Census ACS 5-Year
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* State Selectors */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">State A</span>
            <select
              value={stateCodeA}
              onChange={(e) => setStateCodeA(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-white/15 bg-black/60 px-3 py-2 font-display text-base font-bold text-white focus:border-white/30 focus:outline-none"
            >
              {statesList.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name.en} ({s.abbrev})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">State B</span>
            <select
              value={stateCodeB}
              onChange={(e) => setStateCodeB(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-white/15 bg-black/60 px-3 py-2 font-display text-base font-bold focus:outline-none"
              style={{ color: ACCENT }}
            >
              {statesList.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name.en} ({s.abbrev})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="space-y-2.5">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
            <span className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">
              <TrendingUp className="h-3 w-3" />
              Gross State Product
            </span>
            <div className="mb-2 grid grid-cols-2 gap-4 font-mono">
              <span className="text-lg font-bold text-white">${stateA.gdp}B</span>
              <span className="text-right text-lg font-bold" style={{ color: ACCENT }}>${stateB.gdp}B</span>
            </div>
            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-white/70" style={{ width: `${(stateA.gdp / gdpTotal) * 100}%` }} />
              <div className="h-full" style={{ width: `${(stateB.gdp / gdpTotal) * 100}%`, background: ACCENT }} />
            </div>
          </div>

          <Row
            icon={DollarSign}
            label="Median Household Income"
            a={demoA ? `$${demoA.income.toLocaleString()}` : "N/A"}
            b={demoB ? `$${demoB.income.toLocaleString()}` : "N/A"}
            subA={`Home value $${demoA?.homeValue.toLocaleString() ?? "N/A"} · ${ratioA}× income`}
            subB={`Home value $${demoB?.homeValue.toLocaleString() ?? "N/A"} · ${ratioB}× income`}
          />

          <Row
            icon={Home}
            label="Homeownership & Broadband"
            a={`${demoA?.ownerPct ?? "—"}%`}
            b={`${demoB?.ownerPct ?? "—"}%`}
            unitA="own"
            unitB="own"
            subA={`Broadband access ${demoA?.broadbandPct ?? "—"}%`}
            subB={`Broadband access ${demoB?.broadbandPct ?? "—"}%`}
          />

          <Row
            icon={Wifi}
            label="Remote Work"
            a={`${acsA?.workFromHomePct ?? "—"}%`}
            b={`${acsB?.workFromHomePct ?? "—"}%`}
            unitA="WFH"
            unitB="WFH"
          />

          <Row
            icon={Globe}
            label="Foreign-Born Residents"
            a={`${acsA?.foreignBornPct ?? "—"}%`}
            b={`${acsB?.foreignBornPct ?? "—"}%`}
          />

          <Row
            icon={ShoppingCart}
            label="Poverty & SNAP Assistance"
            a={`${demoA?.povertyPct ?? "—"}%`}
            b={`${demoB?.povertyPct ?? "—"}%`}
            unitA="poverty"
            unitB="poverty"
            subA={`SNAP households ${acsA?.snapPct ?? "—"}%`}
            subB={`SNAP households ${acsB?.snapPct ?? "—"}%`}
          />

          <Row
            icon={Car}
            label="Commute & Vehicle Access"
            a={`${demoA?.commuteMins ?? "—"} min`}
            b={`${demoB?.commuteMins ?? "—"} min`}
            subA={`Zero-vehicle households ${acsA?.noVehiclePct ?? "—"}%`}
            subB={`Zero-vehicle households ${acsB?.noVehiclePct ?? "—"}%`}
          />

          <Row
            icon={GraduationCap}
            label="Education & Veterans"
            a={`${demoA?.eduPct ?? "—"}%`}
            b={`${demoB?.eduPct ?? "—"}%`}
            unitA="bachelor's+"
            unitB="bachelor's+"
            subA={`Veteran rate ${demoA?.vetPct ?? "—"}%`}
            subB={`Veteran rate ${demoB?.vetPct ?? "—"}%`}
          />

          <Row
            icon={Landmark}
            label="Electoral Weight"
            a={`${extA?.electoralVotes ?? "N/A"}`}
            b={`${extB?.electoralVotes ?? "N/A"}`}
            unitA="votes"
            unitB="votes"
          />
        </div>
      </div>
    </div>
  );
}
