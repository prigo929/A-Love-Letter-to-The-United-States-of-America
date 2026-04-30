"use client";
// ─── Federalism Hook — "The Executive Dashboard" ─────────────────────────────
// The main-page teaser for the Federalism deep dive.
// 4 high-impact sliders + interactive US map + closest match summary + CTA.

import { useState, useMemo } from "react";
import Link from "next/link";
import { STATES_50, type StatePolicyExtended } from "@/lib/data/federalism-data";
import { USMapInteractive } from "./USMapInteractive";

// ── Scoring algorithm ───────────────────────────────────────────────────────
function scoreState(
  state: StatePolicyExtended,
  incomeTax: number,
  corpTax: number,
  gunRights: number,
  regulation: number,
): number {
  // Normalize each dimension to 0-1 distance
  const d1 = Math.abs(state.incomeTax - incomeTax) / 14;       // max income tax ~14%
  const d2 = Math.abs(state.corporateTax - corpTax) / 12;      // max corp tax ~12%
  const d3 = Math.abs(state.gunRights - gunRights) / 9;        // scale 1-10
  const d4 = Math.abs(state.regulatoryIndex - regulation) / 9; // scale 1-10
  // Average distance → invert to score
  return Math.max(0, 1 - (d1 + d2 + d3 + d4) / 4);
}

export function FederalismHook({ isRo }: { isRo: boolean }) {
  // 4 high-impact sliders
  const [incomeTax, setIncomeTax] = useState(5);
  const [corpTax, setCorpTax] = useState(5);
  const [gunRights, setGunRights] = useState(5);
  const [regulation, setRegulation] = useState(5);

  const scored = useMemo(() =>
    STATES_50.map((s) => ({
      ...s,
      score: scoreState(s, incomeTax, corpTax, gunRights, regulation),
    })).sort((a, b) => b.score - a.score),
    [incomeTax, corpTax, gunRights, regulation]
  );

  const best = scored[0];
  const second = scored[1];
  const third = scored[2];

  const sliders = [
    {
      label: isRo ? "Impozitul pe Venit" : "Income Tax Rate",
      min: 0, max: 14, step: 0.5, value: incomeTax, set: setIncomeTax, unit: "%",
      lowLabel: isRo ? "0% (fără)" : "0% (none)",
      highLabel: "14%",
    },
    {
      label: isRo ? "Impozitul pe Profit" : "Corporate Tax Rate",
      min: 0, max: 12, step: 0.5, value: corpTax, set: setCorpTax, unit: "%",
      lowLabel: "0%",
      highLabel: "12%",
    },
    {
      label: isRo ? "Dreptul la Arme" : "2nd Amendment Stance",
      min: 1, max: 10, step: 1, value: gunRights, set: setGunRights, unit: "/10",
      lowLabel: isRo ? "Strict" : "Strict",
      highLabel: isRo ? "Port Liber" : "Permitless",
    },
    {
      label: isRo ? "Povara Reglementării" : "Regulatory Burden",
      min: 1, max: 10, step: 0.5, value: regulation, set: setRegulation, unit: "/10",
      lowLabel: isRo ? "Ușoară" : "Light",
      highLabel: isRo ? "Grea" : "Heavy",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* ── Slider panel ── */}
        <div
          className="rounded-sm p-5"
          style={{
            background: "linear-gradient(168deg, rgba(12,16,24,0.95) 0%, rgba(8,11,18,0.98) 100%)",
            border: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          <p className="mb-1 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
            {isRo ? "── Controale Politice ──" : "── Policy Controls ──"}
          </p>
          <p className="mb-5 font-body text-xs text-[#6B6860]">
            {isRo ? "Ajustează — harta reacționează instant" : "Adjust — the map responds instantly"}
          </p>

          {sliders.map((sl) => (
            <div key={sl.label} className="mb-4">
              <div className="mb-1.5 flex justify-between">
                <p className="font-body text-xs text-[#F5F0E8]">{sl.label}</p>
                <span className="font-hero text-sm text-[#C9A84C]">{sl.value}{sl.unit}</span>
              </div>
              <input
                type="range"
                min={sl.min} max={sl.max} step={sl.step}
                value={sl.value}
                onChange={(e) => sl.set(Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{ accentColor: "#C9A84C" }}
              />
              <div className="mt-0.5 flex justify-between font-body text-[9px] text-[#6B6860]">
                <span>{sl.lowLabel}</span>
                <span>{sl.highLabel}</span>
              </div>
            </div>
          ))}

          {/* ── Closest Match summary ── */}
          {best && (
            <div
              className="mt-4 rounded-sm p-4"
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                background: "rgba(201,168,76,0.04)",
              }}
            >
              <p className="mb-2 font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-[rgba(201,168,76,0.5)]">
                {isRo ? "── Cea Mai Apropiată Potrivire ──" : "── Closest Match ──"}
              </p>

              {/* Top 3 */}
              {[best, second, third].map((s, i) => (
                <div key={s.id} className="mb-2 flex items-center gap-2">
                  <span className="shrink-0 font-hero text-xs text-[#C9A84C]" style={{ width: "16px" }}>
                    {i === 0 ? "🏛️" : `${i + 1}.`}
                  </span>
                  <div className="flex-1">
                    <div className="mb-0.5 flex justify-between">
                      <span className={`font-body text-xs ${i === 0 ? "font-bold text-[#F5F0E8]" : "text-[#B8B4AC]"}`}>
                        {s.name}
                      </span>
                      <span className="font-hero text-xs text-[#C9A84C]">
                        {Math.round(s.score * 100)}%
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${s.score * 100}%`,
                          background: i === 0
                            ? "linear-gradient(90deg, #8B6A2A, #C9A84C, #E8C878)"
                            : "linear-gradient(90deg, #4A3A1A, #8B6A2A)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Key outcome stats for top match */}
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {[
                  { label: isRo ? "Creștere PIB" : "GDP Growth", value: `+${best.gdpGrowth5yr}%` },
                  { label: isRo ? "Migrație" : "Net Migration", value: `${best.netMigration > 0 ? "+" : ""}${best.netMigration}k` },
                  { label: isRo ? "Venit Median" : "Median Income", value: `$${best.medianIncome.toLocaleString()}` },
                  { label: isRo ? "Șomaj" : "Unemployment", value: `${best.unemploymentRate}%` },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-sm py-1.5 text-center"
                    style={{ border: "1px solid rgba(201,168,76,0.06)", background: "rgba(201,168,76,0.02)" }}
                  >
                    <p className="font-hero text-xs text-[#C9A84C]">{s.value}</p>
                    <p className="font-body text-[8px] text-[#6B6860]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Map ── */}
        <div>
          <p className="mb-3 font-body text-xs text-[#6B6860]">
            {isRo
              ? "Fiecare stat este colorat după alinierea cu setările tale · Aur = potrivire perfectă"
              : "Each state colored by alignment with your settings · Gold = perfect match"}
          </p>
          <USMapInteractive states={scored} isRo={isRo} />
        </div>
      </div>

      {/* CTA to deep-dive */}
      <div className="flex justify-center">
        <Link
          href="/constitution/federalism"
          className="inline-flex items-center gap-3 rounded-sm px-8 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:bg-[rgba(201,168,76,0.1)]"
          style={{
            border: "1px solid rgba(201,168,76,0.25)",
            color: "#C9A84C",
          }}
        >
          {isRo ? "Intră în Laboratorul Complet de Politici →" : "Enter Full Policy Ledger →"}
        </Link>
      </div>
    </div>
  );
}
