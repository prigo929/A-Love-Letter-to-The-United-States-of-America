"use client";

// ─── EngineeringComparison ────────────────────────────────────────────────────
// A two-mode ranked bar chart for the Monumental Dams & Bridges page: the longest
// suspension spans and the tallest dams in the United States. Bars grow from zero
// via a CSS width transition on mount (not framer-motion 0→% and not whileInView,
// both of which misbehave in Safari — see project-svg-safari-gotchas).

import { useEffect, useState } from "react";

type Mode = "spans" | "dams";

interface Bar {
  name: string;
  place: { en: string; ro: string };
  value: number; // feet
  year: string;
  note?: { en: string; ro: string };
}

const SPANS: Bar[] = [
  { name: "Verrazzano-Narrows", place: { en: "New York", ro: "New York" }, value: 4260, year: "1964" },
  { name: "Golden Gate", place: { en: "San Francisco", ro: "San Francisco" }, value: 4200, year: "1937", note: { en: "Longest span on Earth for 27 years", ro: "Cea mai lungă deschidere de pe Pământ timp de 27 de ani" } },
  { name: "Mackinac", place: { en: "Michigan", ro: "Michigan" }, value: 3800, year: "1957" },
  { name: "George Washington", place: { en: "New York / New Jersey", ro: "New York / New Jersey" }, value: 3500, year: "1931" },
  { name: "Tacoma Narrows", place: { en: "Washington", ro: "Washington" }, value: 2800, year: "1950" },
  { name: "Brooklyn", place: { en: "New York", ro: "New York" }, value: 1595, year: "1883", note: { en: "The first steel-wire suspension bridge", ro: "Primul pod suspendat pe cabluri de oțel" } },
];

const DAMS: Bar[] = [
  { name: "Oroville", place: { en: "California", ro: "California" }, value: 770, year: "1968", note: { en: "The tallest dam in the United States", ro: "Cel mai înalt baraj din Statele Unite" } },
  { name: "Hoover", place: { en: "Nevada / Arizona", ro: "Nevada / Arizona" }, value: 726, year: "1936", note: { en: "Tallest on Earth when it was built", ro: "Cel mai înalt de pe Pământ când a fost construit" } },
  { name: "Dworshak", place: { en: "Idaho", ro: "Idaho" }, value: 717, year: "1973" },
  { name: "Glen Canyon", place: { en: "Arizona", ro: "Arizona" }, value: 710, year: "1966" },
  { name: "New Bullards Bar", place: { en: "California", ro: "California" }, value: 645, year: "1970" },
  { name: "Grand Coulee", place: { en: "Washington", ro: "Washington" }, value: 550, year: "1942", note: { en: "The largest power producer in the U.S.", ro: "Cel mai mare producător de energie din SUA" } },
];

export function EngineeringComparison({ locale }: { locale: "en" | "ro" }) {
  const [mode, setMode] = useState<Mode>("spans");
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    // Re-trigger the grow transition whenever the mode changes.
    setGrown(false);
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    return () => cancelAnimationFrame(t);
  }, [mode]);

  const bars = mode === "spans" ? SPANS : DAMS;
  const max = Math.max(...bars.map((b) => b.value));
  const unit = locale === "ro" ? "ft" : "ft";

  const labels = {
    spans: locale === "ro" ? "Deschideri de poduri" : "Bridge spans",
    dams: locale === "ro" ? "Înălțimi de baraje" : "Dam heights",
    caption:
      mode === "spans"
        ? locale === "ro"
          ? "Cele mai lungi deschideri suspendate, în picioare"
          : "Longest suspension spans, in feet"
        : locale === "ro"
          ? "Cele mai înalte baraje, în picioare"
          : "Tallest dams, in feet",
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-full border border-white/12 p-0.5">
          {(["spans", "dams"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-all"
              style={{
                background: mode === m ? "rgba(255,255,255,0.9)" : "transparent",
                color: mode === m ? "#000" : "rgba(255,255,255,0.5)",
              }}
            >
              {m === "spans" ? labels.spans : labels.dams}
            </button>
          ))}
        </div>
        <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/35">
          {labels.caption}
        </span>
      </div>

      <div className="space-y-4">
        {bars.map((b, i) => {
          const pct = (b.value / max) * 100;
          return (
            <div key={b.name} className="grid grid-cols-[1fr] gap-1.5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-macro-display text-base font-bold text-white">
                  {b.name}
                  <span className="ml-2 font-sans text-[10px] font-normal uppercase tracking-wider text-white/35">
                    {b.place[locale]} · {b.year}
                  </span>
                </span>
                <span className="shrink-0 font-hero text-xl text-[#E8B923]">
                  {b.value.toLocaleString(locale === "ro" ? "ro-RO" : "en-US")}
                  <span className="ml-1 font-sans text-[10px] uppercase tracking-wide text-white/40">{unit}</span>
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: grown ? `${pct}%` : "0%",
                    background: i === 0 ? "#E8B923" : "linear-gradient(90deg, rgba(232,185,35,0.85), rgba(232,185,35,0.35))",
                    transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s`,
                  }}
                />
              </div>
              {b.note && (
                <span className="font-sans text-[10px] uppercase tracking-[0.12em] text-white/30">
                  {b.note[locale]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
