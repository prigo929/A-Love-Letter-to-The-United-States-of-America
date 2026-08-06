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
  locale: "en" | "ro";
}

// A single neutral accent (gold) plus plain white/ink text for the two states —
// no per-category rainbow. State A stays default white, State B is the accent.
const ACCENT = "#C9A24A";

// Translated Row labels/units are passed in fully-resolved by the caller,
// which already has `isRo` in scope — Row itself stays locale-agnostic.
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
  locale,
}: StateComparisonModalProps) {
  const isRo = locale === "ro";
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

  const statesList = Object.values(EXPLORER_STATES).sort((a, b) => a.name[locale].localeCompare(b.name[locale]));

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
                {isRo ? "Stat vs. Stat" : "State vs. State"}
              </h2>
              <p className="font-body text-xs text-white/40">
                {isRo ? "Repere civice, demografice și economice · Census ACS 5-Year" : "Civic, demographic, and economic benchmarks · Census ACS 5-Year"}
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
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">{isRo ? "Stat A" : "State A"}</span>
            <select
              value={stateCodeA}
              onChange={(e) => setStateCodeA(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-white/15 bg-black/60 px-3 py-2 font-display text-base font-bold text-white focus:border-white/30 focus:outline-none"
            >
              {statesList.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name[locale]} ({s.abbrev})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40">{isRo ? "Stat B" : "State B"}</span>
            <select
              value={stateCodeB}
              onChange={(e) => setStateCodeB(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-white/15 bg-black/60 px-3 py-2 font-display text-base font-bold focus:outline-none"
              style={{ color: ACCENT }}
            >
              {statesList.map((s) => (
                <option key={s.abbrev} value={s.abbrev}>
                  {s.name[locale]} ({s.abbrev})
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
              {isRo ? "Produsul Intern Brut al Statului" : "Gross State Product"}
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
            label={isRo ? "Venitul Median al Gospodăriei" : "Median Household Income"}
            a={demoA ? `$${demoA.income.toLocaleString()}` : "N/A"}
            b={demoB ? `$${demoB.income.toLocaleString()}` : "N/A"}
            subA={isRo ? `Valoare locuință $${demoA?.homeValue.toLocaleString() ?? "N/A"} · ${ratioA}× venit` : `Home value $${demoA?.homeValue.toLocaleString() ?? "N/A"} · ${ratioA}× income`}
            subB={isRo ? `Valoare locuință $${demoB?.homeValue.toLocaleString() ?? "N/A"} · ${ratioB}× venit` : `Home value $${demoB?.homeValue.toLocaleString() ?? "N/A"} · ${ratioB}× income`}
          />

          <Row
            icon={Home}
            label={isRo ? "Proprietate & Internet Bandă Largă" : "Homeownership & Broadband"}
            a={`${demoA?.ownerPct ?? "—"}%`}
            b={`${demoB?.ownerPct ?? "—"}%`}
            unitA={isRo ? "proprietari" : "own"}
            unitB={isRo ? "proprietari" : "own"}
            subA={isRo ? `Acces bandă largă ${demoA?.broadbandPct ?? "—"}%` : `Broadband access ${demoA?.broadbandPct ?? "—"}%`}
            subB={isRo ? `Acces bandă largă ${demoB?.broadbandPct ?? "—"}%` : `Broadband access ${demoB?.broadbandPct ?? "—"}%`}
          />

          <Row
            icon={Wifi}
            label={isRo ? "Muncă de la Distanță" : "Remote Work"}
            a={`${acsA?.workFromHomePct ?? "—"}%`}
            b={`${acsB?.workFromHomePct ?? "—"}%`}
            unitA={isRo ? "de acasă" : "WFH"}
            unitB={isRo ? "de acasă" : "WFH"}
          />

          <Row
            icon={Globe}
            label={isRo ? "Rezidenți Născuți în Străinătate" : "Foreign-Born Residents"}
            a={`${acsA?.foreignBornPct ?? "—"}%`}
            b={`${acsB?.foreignBornPct ?? "—"}%`}
          />

          <Row
            icon={ShoppingCart}
            label={isRo ? "Sărăcie & Asistență SNAP" : "Poverty & SNAP Assistance"}
            a={`${demoA?.povertyPct ?? "—"}%`}
            b={`${demoB?.povertyPct ?? "—"}%`}
            unitA={isRo ? "sărăcie" : "poverty"}
            unitB={isRo ? "sărăcie" : "poverty"}
            subA={isRo ? `Gospodării cu SNAP ${acsA?.snapPct ?? "—"}%` : `SNAP households ${acsA?.snapPct ?? "—"}%`}
            subB={isRo ? `Gospodării cu SNAP ${acsB?.snapPct ?? "—"}%` : `SNAP households ${acsB?.snapPct ?? "—"}%`}
          />

          <Row
            icon={Car}
            label={isRo ? "Navetă & Acces la Vehicul" : "Commute & Vehicle Access"}
            a={`${demoA?.commuteMins ?? "—"} min`}
            b={`${demoB?.commuteMins ?? "—"} min`}
            subA={isRo ? `Gospodării fără vehicul ${acsA?.noVehiclePct ?? "—"}%` : `Zero-vehicle households ${acsA?.noVehiclePct ?? "—"}%`}
            subB={isRo ? `Gospodării fără vehicul ${acsB?.noVehiclePct ?? "—"}%` : `Zero-vehicle households ${acsB?.noVehiclePct ?? "—"}%`}
          />

          <Row
            icon={GraduationCap}
            label={isRo ? "Educație & Veterani" : "Education & Veterans"}
            a={`${demoA?.eduPct ?? "—"}%`}
            b={`${demoB?.eduPct ?? "—"}%`}
            unitA={isRo ? "licență+" : "bachelor's+"}
            unitB={isRo ? "licență+" : "bachelor's+"}
            subA={isRo ? `Rata veteranilor ${demoA?.vetPct ?? "—"}%` : `Veteran rate ${demoA?.vetPct ?? "—"}%`}
            subB={isRo ? `Rata veteranilor ${demoB?.vetPct ?? "—"}%` : `Veteran rate ${demoB?.vetPct ?? "—"}%`}
          />

          <Row
            icon={Landmark}
            label={isRo ? "Greutate Electorală" : "Electoral Weight"}
            a={`${extA?.electoralVotes ?? "N/A"}`}
            b={`${extB?.electoralVotes ?? "N/A"}`}
            unitA={isRo ? "voturi" : "votes"}
            unitB={isRo ? "voturi" : "votes"}
          />
        </div>
      </div>
    </div>
  );
}
