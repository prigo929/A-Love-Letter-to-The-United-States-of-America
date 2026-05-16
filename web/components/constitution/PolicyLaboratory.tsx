"use client";
// ─── Policy Laboratory — "The Bloomberg Terminal" ────────────────────────────
// Deep-dive interactive federalism simulator with 11 granular levers
// organized into 3 ledger categories (Fiscal, Social, Regulatory).
// Shows Top 3 + Bottom 3 matches, the US map, and outcome data.

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STATES_50, type StatePolicyExtended } from "@/lib/data/federalism-data";
import { USMapInteractive } from "./USMapInteractive";

// ─── Extended lever definitions ─────────────────────────────────────────────

interface LeverDef {
  key: string;
  label: string;
  labelRo: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  lowLabel: string;
  lowLabelRo: string;
  highLabel: string;
  highLabelRo: string;
  defaultValue: number;
}

const FISCAL_LEVERS: LeverDef[] = [
  { key: "incomeTax", label: "State Income Tax", labelRo: "Impozitul pe Venit", min: 0, max: 14, step: 0.5, unit: "%", lowLabel: "0% (none)", lowLabelRo: "0% (fără)", highLabel: "14%", highLabelRo: "14%", defaultValue: 5 },
  { key: "corporateTax", label: "Corporate Franchise Tax", labelRo: "Impozitul pe Profit", min: 0, max: 12, step: 0.5, unit: "%", lowLabel: "0%", lowLabelRo: "0%", highLabel: "12%", highLabelRo: "12%", defaultValue: 5 },
];

const SOCIAL_LEVERS: LeverDef[] = [
  { key: "gunRights", label: "2nd Amendment Stance", labelRo: "Dreptul la Arme", min: 1, max: 10, step: 1, unit: "/10", lowLabel: "Strict Permitting", lowLabelRo: "Permise Stricte", highLabel: "Constitutional Carry", highLabelRo: "Port Liber", defaultValue: 5 },
  { key: "cannabisLegal", label: "Cannabis Legalization", labelRo: "Legalizarea Canabisului", min: 1, max: 10, step: 1, unit: "/10", lowLabel: "Full Prohibition", lowLabelRo: "Prohibiție Totală", highLabel: "Full Recreational", highLabelRo: "Recreativ Complet", defaultValue: 5 },
];

const REGULATORY_LEVERS: LeverDef[] = [
  { key: "regulatoryIndex", label: "Regulatory Burden", labelRo: "Povara Reglementării", min: 1, max: 10, step: 0.5, unit: "/10", lowLabel: "Light", lowLabelRo: "Ușoară", highLabel: "Heavy", highLabelRo: "Grea", defaultValue: 5 },
];

type LeverValues = Record<string, number>;

// ─── Scoring ────────────────────────────────────────────────────────────────

function scoreState(state: StatePolicyExtended, v: LeverValues): number {
  const dims: [number, number][] = [
    [state.incomeTax, v.incomeTax ?? 5],
    [state.corporateTax, v.corporateTax ?? 5],
    [state.gunRights, v.gunRights ?? 5],
    [state.cannabisLegal, v.cannabisLegal ?? 5],
    [state.regulatoryIndex, v.regulatoryIndex ?? 5],
  ];
  const maxRanges = [14, 12, 9, 9, 9];

  let totalDist = 0;
  for (let i = 0; i < dims.length; i++) {
    totalDist += Math.abs(dims[i][0] - dims[i][1]) / maxRanges[i];
  }
  return Math.max(0, 1 - totalDist / dims.length);
}

// ─── Lever Panel Sub-Component ──────────────────────────────────────────────

function LeverGroup({
  title,
  titleRo,
  icon,
  levers,
  values,
  onChange,
  isRo,
}: {
  title: string;
  titleRo: string;
  icon: string;
  levers: LeverDef[];
  values: LeverValues;
  onChange: (key: string, val: number) => void;
  isRo: boolean;
}) {
  return (
    <div
      className="rounded-sm p-4"
      style={{
        border: "1px solid rgba(201,168,76,0.06)",
        background: "rgba(201,168,76,0.015)",
      }}
    >
      <p className="mb-3 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
        {icon} {isRo ? titleRo : title}
      </p>
      {levers.map((sl) => (
        <div key={sl.key} className="mb-3 last:mb-0">
          <div className="mb-1 flex justify-between">
            <p className="font-body text-xs text-[#F5F0E8]">{isRo ? sl.labelRo : sl.label}</p>
            <span className="font-hero text-xs text-[#C9A84C]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {values[sl.key] ?? sl.defaultValue}{sl.unit}
            </span>
          </div>
          <input
            type="range"
            min={sl.min} max={sl.max} step={sl.step}
            value={values[sl.key] ?? sl.defaultValue}
            onChange={(e) => onChange(sl.key, Number(e.target.value))}
            className="w-full cursor-pointer"
            style={{ accentColor: "#C9A84C" }}
          />
          <div className="mt-0.5 flex justify-between font-body text-[8px] text-[#6B6860]">
            <span>{isRo ? sl.lowLabelRo : sl.lowLabel}</span>
            <span>{isRo ? sl.highLabelRo : sl.highLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── State Result Row ───────────────────────────────────────────────────────

function StateRow({
  state,
  rank,
  isTop,
  isSelected,
  onClick,
  isRo,
}: {
  state: StatePolicyExtended & { score: number };
  rank: number;
  isTop: boolean;
  isSelected: boolean;
  onClick: () => void;
  isRo: boolean;
}) {
  const migColor = state.netMigration > 0 ? "text-emerald-400" : state.netMigration < -50 ? "text-red-400" : "text-[#6B6860]";

  return (
    <div
      className="cursor-pointer rounded-sm p-3 transition-all duration-200"
      style={{
        border: isSelected
          ? "1px solid rgba(201,168,76,0.4)"
          : "1px solid rgba(201,168,76,0.06)",
        background: isSelected
          ? "rgba(201,168,76,0.06)"
          : "rgba(201,168,76,0.01)",
      }}
      onClick={onClick}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-hero text-xs text-[#C9A84C]" style={{ width: "20px" }}>
            {rank === 1 && isTop ? "🏛️" : `${rank}.`}
          </span>
          <span className="font-body text-xs font-semibold text-[#F5F0E8]">{state.name}</span>
          <span className="font-body text-[9px] text-[#6B6860]">({state.abbr})</span>
        </div>
        <span className="font-hero text-xs text-[#C9A84C]">{Math.round(state.score * 100)}%</span>
      </div>
      <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${state.score * 100}%`,
            background: isTop
              ? "linear-gradient(90deg, #8B6A2A, #C9A84C, #E8C878)"
              : "linear-gradient(90deg, #5C1A1A, #8B2626)",
          }}
        />
      </div>

      {/* Outcome data row */}
      <div className="grid grid-cols-4 gap-1 font-body text-[9px]" style={{ fontVariantNumeric: "tabular-nums" }}>
        <div>
          <span className="text-[#6B6860]">{isRo ? "PIB" : "GDP"} </span>
          <span className="text-[#C9A84C]">+{state.gdpGrowth5yr}%</span>
        </div>
        <div>
          <span className="text-[#6B6860]">{isRo ? "Migr." : "Migr."} </span>
          <span className={migColor}>{state.netMigration > 0 ? "+" : ""}{state.netMigration}k</span>
        </div>
        <div>
          <span className="text-[#6B6860]">{isRo ? "Venit" : "Income"} </span>
          <span className="text-[#C9A84C]">${(state.medianIncome / 1000).toFixed(0)}k</span>
        </div>
        <div>
          <span className="text-[#6B6860]">{isRo ? "Șomaj" : "Unemp."} </span>
          <span className="text-[#C9A84C]">{state.unemploymentRate}%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Migration Vector ───────────────────────────────────────────────────────

function MigrationVectors({ top3, bottom3, isRo }: {
  top3: (StatePolicyExtended & { score: number })[];
  bottom3: (StatePolicyExtended & { score: number })[];
  isRo: boolean;
}) {
  // Total outflow from bottom, total inflow to top
  const totalOutflow = bottom3.reduce((s, st) => s + Math.abs(Math.min(0, st.netMigration)), 0);
  const totalInflow = top3.reduce((s, st) => s + Math.max(0, st.netMigration), 0);

  return (
    <div
      className="rounded-sm p-4"
      style={{
        border: "1px solid rgba(201,168,76,0.06)",
        background: "rgba(201,168,76,0.015)",
      }}
    >
      <p className="mb-3 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
        {isRo ? "── Vectori de Migrație (5 ani) ──" : "── Migration Vectors (5yr) ──"}
      </p>

      <div className="grid grid-cols-[1fr_40px_1fr] items-center gap-2">
        {/* Bottom states (outflow) */}
        <div className="space-y-1.5">
          {bottom3.map((s) => (
            <div key={s.id} className="flex items-center justify-between">
              <span className="font-body text-[10px] text-[#F5F0E8]">{s.abbr}</span>
              <span className="font-body text-[10px] text-red-400">{s.netMigration}k</span>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-0.5">
          <motion.div
            className="text-[#C9A84C]"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.div>
          <p className="font-body text-[7px] text-[#6B6860] text-center leading-tight">
            {isRo ? "FLUX" : "FLOW"}
          </p>
        </div>

        {/* Top states (inflow) */}
        <div className="space-y-1.5">
          {top3.map((s) => (
            <div key={s.id} className="flex items-center justify-between">
              <span className="font-body text-[10px] text-[#F5F0E8]">{s.abbr}</span>
              <span className="font-body text-[10px] text-emerald-400">+{Math.max(0, s.netMigration)}k</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-sm bg-red-900/10 py-1.5 text-center" style={{ border: "1px solid rgba(139,38,38,0.2)" }}>
          <p className="font-hero text-xs text-red-400">-{totalOutflow}k</p>
          <p className="font-body text-[7px] text-[#6B6860]">{isRo ? "Exod Total" : "Total Exodus"}</p>
        </div>
        <div className="rounded-sm bg-emerald-900/10 py-1.5 text-center" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
          <p className="font-hero text-xs text-emerald-400">+{totalInflow}k</p>
          <p className="font-body text-[7px] text-[#6B6860]">{isRo ? "Influx Total" : "Total Influx"}</p>
        </div>
      </div>
    </div>
  );
}

// ─── State Detail Panel ─────────────────────────────────────────────────────

function StateDetail({ state, isRo }: { state: StatePolicyExtended & { score: number }; isRo: boolean }) {
  const migDir = state.netMigration > 0 ? "▲" : state.netMigration < 0 ? "▼" : "─";
  const migColor = state.netMigration > 0 ? "text-emerald-400" : "text-red-400";

  const rows = [
    { label: isRo ? "Potrivire Politică" : "Policy Match", value: `${Math.round(state.score * 100)}%`, color: "text-[#E8C878]" },
    { label: "", value: "", color: "" }, // divider
    { label: isRo ? "Impozit pe Venit" : "Income Tax", value: state.incomeTax === 0 ? (isRo ? "NICIUNUL" : "NONE") : `${state.incomeTax}%`, color: state.incomeTax === 0 ? "text-emerald-400" : "text-[#C9A84C]" },
    { label: isRo ? "Impozit pe Profit" : "Corporate Tax", value: state.corporateTax === 0 ? (isRo ? "NICIUNUL" : "NONE") : `${state.corporateTax}%`, color: state.corporateTax === 0 ? "text-emerald-400" : "text-[#C9A84C]" },
    { label: isRo ? "Dreptul la Arme" : "Gun Rights", value: `${state.gunRights}/10`, color: "text-[#C9A84C]" },
    { label: isRo ? "Canabis" : "Cannabis", value: `${state.cannabisLegal}/10`, color: "text-[#C9A84C]" },
    { label: isRo ? "Reglementare" : "Regulation", value: `${state.regulatoryIndex}/10`, color: "text-[#C9A84C]" },
    { label: "", value: "", color: "" }, // divider
    { label: isRo ? "Creștere PIB (5yr)" : "GDP Growth (5yr)", value: `+${state.gdpGrowth5yr}%`, color: "text-[#C9A84C]" },
    { label: isRo ? "Migrație Netă" : "Net Migration", value: `${state.netMigration > 0 ? "+" : ""}${state.netMigration}k ${migDir}`, color: migColor },
    { label: isRo ? "Venitul Median" : "Median Income", value: `$${state.medianIncome.toLocaleString()}`, color: "text-[#C9A84C]" },
    { label: isRo ? "Rata Șomajului" : "Unemployment", value: `${state.unemploymentRate}%`, color: "text-[#C9A84C]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-sm p-4"
      style={{
        border: "1px solid rgba(201,168,76,0.15)",
        background: "linear-gradient(168deg, rgba(12,16,24,0.95) 0%, rgba(8,11,18,0.98) 100%)",
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-[#F5F0E8]">{state.name}</p>
          <p className="font-body text-[9px] uppercase tracking-[0.15em] text-[#6B6860]">{state.abbr}</p>
        </div>
        <div className="text-right">
          <p className="font-hero text-xl text-[#E8C878]">{Math.round(state.score * 100)}%</p>
          <p className="font-body text-[8px] text-[#6B6860]">{isRo ? "POTRIVIRE" : "MATCH"}</p>
        </div>
      </div>

      <div className="space-y-0" style={{ fontVariantNumeric: "tabular-nums" }}>
        {rows.map((r, i) =>
          r.label === "" ? (
            <div key={i} className="my-1.5 h-px bg-[rgba(201,168,76,0.06)]" />
          ) : (
            <div key={r.label} className="flex justify-between py-0.5 font-body text-[10px]">
              <span className="text-[#6B6860]">{r.label}</span>
              <span className={`font-semibold ${r.color}`}>{r.value}</span>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

export function PolicyLaboratory({ isRo }: { isRo: boolean }) {
  // Initialize lever values
  const allLevers = [...FISCAL_LEVERS, ...SOCIAL_LEVERS, ...REGULATORY_LEVERS];
  const [values, setValues] = useState<LeverValues>(() => {
    const init: LeverValues = {};
    allLevers.forEach((l) => { init[l.key] = l.defaultValue; });
    return init;
  });

  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleChange = (key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  // Score all 50 states
  const scored = useMemo(() =>
    STATES_50.map((s) => ({
      ...s,
      score: scoreState(s, values),
    })).sort((a, b) => b.score - a.score),
    [values]
  );

  const top3 = scored.slice(0, 3);
  const bottom3 = scored.slice(-3).reverse();
  const selected = scored.find((s) => s.id === selectedState);

  return (
    <div className="space-y-6">
      {/* Header strip */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 rounded-sm px-4 py-2"
        style={{
          border: "1px solid rgba(201,168,76,0.06)",
          background: "rgba(201,168,76,0.015)",
        }}
      >
        <p className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.4)]">
          {isRo ? "Laborator de Politici · 50 State · Date în Timp Real" : "Policy Laboratory · 50 States · Live Data"}
        </p>
        <p className="font-body text-[9px] text-[#6B6860]">
          {isRo ? "Surse: Tax Foundation · BLS · Census Bureau · Giffords · NORML" : "Sources: Tax Foundation · BLS · Census Bureau · Giffords · NORML"}
        </p>
      </div>

      {/* Main 3-column layout */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr_280px]">

        {/* ── LEFT: Lever panels ── */}
        <div className="space-y-4">
          <LeverGroup
            title="The Fiscal Engine"
            titleRo="Motorul Fiscal"
            icon="💰"
            levers={FISCAL_LEVERS}
            values={values}
            onChange={handleChange}
            isRo={isRo}
          />
          <LeverGroup
            title="The Social Framework"
            titleRo="Cadrul Social"
            icon="⚖️"
            levers={SOCIAL_LEVERS}
            values={values}
            onChange={handleChange}
            isRo={isRo}
          />
          <LeverGroup
            title="The Regulatory Matrix"
            titleRo="Matricea Reglementării"
            icon="🏗️"
            levers={REGULATORY_LEVERS}
            values={values}
            onChange={handleChange}
            isRo={isRo}
          />

          {/* Migration vectors */}
          <MigrationVectors top3={top3} bottom3={bottom3} isRo={isRo} />
        </div>

        {/* ── CENTER: US Map ── */}
        <div>
          <p className="mb-3 font-body text-xs text-[#6B6860]">
            {isRo
              ? "Fiecare stat este colorat după alinierea cu setările tale · Click pentru detalii"
              : "Each state colored by policy alignment · Click for details"}
          </p>
          <USMapInteractive
            states={scored}
            isRo={isRo}
            onStateClick={(s) => setSelectedState(s.id === selectedState ? null : s.id)}
          />

          {/* Selected state detail */}
          <AnimatePresence mode="wait">
            {selected && (
              <div className="mt-4">
                <StateDetail state={selected} isRo={isRo} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Results panel ── */}
        <div className="space-y-4">
          {/* Top 3 Matches */}
          <div
            className="rounded-sm p-4"
            style={{
              border: "1px solid rgba(201,168,76,0.1)",
              background: "rgba(201,168,76,0.02)",
            }}
          >
            <p className="mb-3 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
              🏛️ {isRo ? "Cele Mai Apropiate Potriviri" : "Closest Matches"}
            </p>
            <div className="space-y-2">
              {top3.map((s, i) => (
                <StateRow
                  key={s.id}
                  state={s}
                  rank={i + 1}
                  isTop
                  isSelected={selectedState === s.id}
                  onClick={() => setSelectedState(s.id === selectedState ? null : s.id)}
                  isRo={isRo}
                />
              ))}
            </div>
          </div>

          {/* Bottom 3 Matches */}
          <div
            className="rounded-sm p-4"
            style={{
              border: "1px solid rgba(139,38,38,0.15)",
              background: "rgba(139,38,38,0.02)",
            }}
          >
            <p className="mb-3 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(139,38,38,0.5)]">
              ⚠ {isRo ? "Cele Mai Îndepărtate Potriviri" : "Furthest Matches"}
            </p>
            <div className="space-y-2">
              {bottom3.map((s, i) => (
                <StateRow
                  key={s.id}
                  state={s}
                  rank={48 + i}
                  isTop={false}
                  isSelected={selectedState === s.id}
                  onClick={() => setSelectedState(s.id === selectedState ? null : s.id)}
                  isRo={isRo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
