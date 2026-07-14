"use client";

// ─── WaterwayComparison ────────────────────────────────────────────────────────
// A ranked bar chart for the Great Aqueducts & Waterways page: compares lengths in
// miles of major aqueducts and commercial waterways/canals. Bars grow on load/change
// via a CSS width transition to ensure fluid rendering across all modern browsers.

import { useEffect, useState } from "react";

type Mode = "aqueducts" | "waterways";

interface Bar {
  name: string;
  place: { en: string; ro: string };
  value: number; // miles
  year: string;
  note?: { en: string; ro: string };
}

const AQUEDUCTS: Bar[] = [
  {
    name: "California Aqueduct",
    place: { en: "California", ro: "California" },
    value: 444,
    year: "1971",
    note: {
      en: "Main artery of the State Water Project feeding Southern California",
      ro: "Artera principală a proiectului State Water Project ce alimentează sudul Californiei",
    },
  },
  {
    name: "Los Angeles Aqueduct",
    place: { en: "California / Owens Valley", ro: "California / Owens Valley" },
    value: 338,
    year: "1913",
    note: {
      en: "Gravity-fed historic lifeline built by William Mulholland",
      ro: "Alimentat gravitațional, construit de William Mulholland ca linie vitală istorică",
    },
  },
  {
    name: "Central Arizona Project",
    place: { en: "Arizona", ro: "Arizona" },
    value: 336,
    year: "1993",
    note: {
      en: "Lifts Colorado River water 2,400 feet across the desert to Phoenix and Tucson",
      ro: "Pompează apa Râului Colorado la 2.444 ft peste deșert spre Phoenix și Tucson",
    },
  },
  {
    name: "Catskill Aqueduct",
    place: { en: "New York", ro: "New York" },
    value: 92,
    year: "1915",
    note: {
      en: "Gravity-flow system delivering clean drinking water from the Catskill Mountains",
      ro: "Sistem gravitațional ce livrează apă potabilă curată din Munții Catskill",
    },
  },
  {
    name: "Delaware Aqueduct",
    place: { en: "New York", ro: "New York" },
    value: 85,
    year: "1945",
    note: {
      en: "World's longest continuous underground tunnel, supplying half of NYC's water",
      ro: "Cel mai lung tunel subteran continuu din lume, livrând jumătate din apa NYC",
    },
  },
];

const WATERWAYS: Bar[] = [
  {
    name: "Intracoastal Waterway",
    place: { en: "Atlantic & Gulf Coasts", ro: "Coasta Atlantică și a Golfului" },
    value: 3000,
    year: "1949",
    note: {
      en: "A continuous sheltered inland channel for safe commercial coastal shipping",
      ro: "Canal interior adăpostit continuu pentru navigație costieră comercială sigură",
    },
  },
  {
    name: "St. Lawrence Seaway",
    place: { en: "US / Canada Border", ro: "Granița SUA / Canada" },
    value: 370,
    year: "1959",
    note: {
      en: "Deep-draft lock system connecting the Great Lakes to the Atlantic Ocean",
      ro: "Sistem de ecluze adânci ce leagă Marile Lacuri de Oceanul Atlantic",
    },
  },
  {
    name: "Erie Canal",
    place: { en: "New York", ro: "New York" },
    value: 363,
    year: "1825",
    note: {
      en: "The historic engineering feat that built New York City's trade dominance",
      ro: "Canalul istoric ce a propulsat poziția comercială dominantă a New York-ului",
    },
  },
  {
    name: "Chicago Sanitary & Ship Canal",
    place: { en: "Illinois", ro: "Illinois" },
    value: 30,
    year: "1900",
    note: {
      en: "Reversed the Chicago River to protect Lake Michigan's drinking water",
      ro: "A inversat cursul râului Chicago pentru a proteja apa potabilă din Lacul Michigan",
    },
  },
];

export function WaterwayComparison({ locale }: { locale: "en" | "ro" }) {
  const [mode, setMode] = useState<Mode>("aqueducts");
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    setGrown(false);
    const t = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    return () => cancelAnimationFrame(t);
  }, [mode]);

  const bars = mode === "aqueducts" ? AQUEDUCTS : WATERWAYS;
  const max = Math.max(...bars.map((b) => b.value));
  const unit = locale === "ro" ? "mi" : "mi";

  const labels = {
    aqueducts: locale === "ro" ? "Apeducte" : "Aqueducts",
    waterways: locale === "ro" ? "Căi Navigabile" : "Waterways & Canals",
    caption:
      mode === "aqueducts"
        ? locale === "ro"
          ? "Cele mai lungi apeducte din SUA, în mile"
          : "Longest aqueducts in the U.S., in miles"
        : locale === "ro"
          ? "Canale comerciale și căi navigabile, în mile"
          : "Commercial canals & waterways, in miles",
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-full border border-white/12 p-0.5">
          {(["aqueducts", "waterways"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="rounded-full px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-all"
              style={{
                background: mode === m ? "rgba(255,255,255,0.9)" : "transparent",
                color: mode === m ? "#000" : "rgba(255,255,255,0.5)",
              }}
            >
              {m === "aqueducts" ? labels.aqueducts : labels.waterways}
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
