"use client";

// ─── Interstate Cooperation ───────────────────────────────────────────────────
// A second, purpose-built map: picking an agreement highlights its member states
// and draws connecting lines from the anchor state to every other member, so the
// federal system reads as a network rather than a list.

import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Line, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { Share2, Info, MapPin } from "lucide-react";
import { GEO_URL, FIPS_TO_ABBREV } from "@/lib/data/us-geo";
import {
  COOPERATION_AGREEMENTS,
  COOPERATION_CATEGORIES,
  type CooperationCategory,
} from "@/lib/data/interstate-cooperation";

interface Props {
  locale: "en" | "ro";
  translations: {
    eyebrow: string;
    title: string;
    intro: string;
    membersLabel: string;
    establishedLabel: string;
    statesLabel: string;
    historyLabel: string;
  };
}

export function InterstateCooperationMap({ locale, translations }: Props) {
  const [category, setCategory] = useState<CooperationCategory>("water");
  const [agreementId, setAgreementId] = useState<string>("colorado-river-compact");

  const agreementsInCategory = useMemo(
    () => COOPERATION_AGREEMENTS.filter((a) => a.category === category),
    [category]
  );

  const agreement = useMemo(
    () =>
      COOPERATION_AGREEMENTS.find((a) => a.id === agreementId) ??
      agreementsInCategory[0] ??
      COOPERATION_AGREEMENTS[0],
    [agreementId, agreementsInCategory]
  );

  const accent = useMemo(
    () => COOPERATION_CATEGORIES.find((c) => c.id === agreement.category)?.color ?? "#fbbf24",
    [agreement.category]
  );

  const memberSet = useMemo(() => new Set(agreement.members), [agreement.members]);

  const selectCategory = (next: CooperationCategory) => {
    setCategory(next);
    const first = COOPERATION_AGREEMENTS.find((a) => a.category === next);
    if (first) setAgreementId(first.id);
  };

  return (
    <div className="rounded-3xl border border-white/[0.06] bg-[#070707] p-6 md:p-8 shadow-lg">
      <div className="mb-6 max-w-2xl">
        <p className="font-body text-[9px] uppercase tracking-[0.18em] mb-1 font-bold flex items-center gap-1.5" style={{ color: accent }}>
          <Share2 className="h-3 w-3" />
          {translations.eyebrow}
        </p>
        <h3 className="font-display text-xl font-extrabold text-white mb-2">{translations.title}</h3>
        <p className="font-body text-xs text-white/55 leading-relaxed">{translations.intro}</p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {COOPERATION_CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCategory(c.id)}
            className="rounded-full px-3 py-1 text-[10px] font-semibold font-body transition-all"
            style={{
              background: category === c.id ? c.color : "rgba(255,255,255,0.05)",
              color: category === c.id ? "#000" : "rgba(255,255,255,0.5)",
            }}
          >
            {c.label[locale]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agreement list */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {agreementsInCategory.map((a) => {
            const active = a.id === agreement.id;
            return (
              <button
                key={a.id}
                onClick={() => setAgreementId(a.id)}
                className="text-left rounded-2xl border p-4 transition-all"
                style={{
                  borderColor: active ? accent : "rgba(255,255,255,0.06)",
                  background: active ? `${accent}12` : "#0c0c0c",
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-1">
                  <span className="font-body text-xs font-bold text-white leading-snug">{a.name[locale]}</span>
                  <span className="font-hero text-[11px] shrink-0" style={{ color: accent }}>{a.year}</span>
                </div>
                <span className="font-body text-[10px] text-white/35 font-semibold">
                  {a.members.length} {translations.statesLabel}
                </span>
              </button>
            );
          })}

          {/* Detail of the selected agreement */}
          <div className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] p-4 mt-1">
            <p className="font-body text-xs text-white/75 leading-relaxed">{agreement.blurb[locale]}</p>

            <div className="mt-3 pt-3 border-t border-white/[0.05]">
              <span className="font-body text-[9px] font-bold uppercase tracking-[0.18em] text-white/30 block mb-1.5">
                {translations.historyLabel}
              </span>
              <p className="font-body text-[11px] text-white/60 leading-relaxed">{agreement.history[locale]}</p>
            </div>

            <p className="mt-3 pt-3 border-t border-white/[0.05] flex gap-2 font-body text-[10px] text-white/40 leading-relaxed">
              <MapPin className="h-3 w-3 shrink-0 mt-0.5" style={{ color: accent }} />
              <span>{agreement.hub.label[locale]}</span>
            </p>

            {agreement.caveat && (
              <p className="mt-2 flex gap-2 font-body text-[10px] text-white/40 leading-relaxed">
                <Info className="h-3 w-3 shrink-0 mt-0.5" />
                <span>{agreement.caveat[locale]}</span>
              </p>
            )}
          </div>
        </div>

        {/* Network map */}
        <div className="lg:col-span-8 relative rounded-2xl border border-white/[0.05] bg-black overflow-hidden">
          <div className="absolute top-3 left-4 z-10 pointer-events-none">
            <div className="font-body text-[10px] uppercase tracking-wider text-white/30 font-bold">
              {translations.membersLabel}
            </div>
            <div className="font-hero text-2xl" style={{ color: accent }}>
              {agreement.members.length}
            </div>
          </div>

          <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 850 }} style={{ width: "100%", height: "100%" }}>
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) => {
                // Centroids come straight from the topology, so no hard-coded coords.
                const centroids: Record<string, [number, number]> = {};
                geographies.forEach((geo) => {
                  const abbrev = FIPS_TO_ABBREV[geo.id?.toString().padStart(2, "0") ?? ""];
                  if (abbrev) centroids[abbrev] = geoCentroid(geo) as [number, number];
                });

                const hubPos = agreement.hub.coordinates;
                // Hub-and-spoke lines only where they carry meaning. For near-universal
                // compacts a star from the secretariat would imply a hierarchy that
                // does not exist, so we simply fill every member instead.
                const links = agreement.network
                  ? agreement.members.filter((m) => centroids[m]).map((m) => ({ id: m, to: centroids[m] }))
                  : [];

                return (
                  <>
                    {geographies.map((geo) => {
                      const abbrev = FIPS_TO_ABBREV[geo.id?.toString().padStart(2, "0") ?? ""] ?? "";
                      const isMember = memberSet.has(abbrev);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill: isMember ? `${accent}26` : "#101010",
                              stroke: isMember ? `${accent}88` : "rgba(255,255,255,0.10)",
                              strokeWidth: isMember ? 0.7 : 0.5,
                              outline: "none",
                            },
                            hover: { fill: isMember ? `${accent}44` : "#161616", outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })}

                    {/* Connecting lines: administrative seat → each member */}
                    {links.map((l) => (
                      <Line
                        key={`${agreement.id}-${l.id}`}
                        from={hubPos}
                        to={l.to}
                        stroke={accent}
                        strokeWidth={0.9}
                        strokeLinecap="round"
                        opacity={0.5}
                      />
                    ))}

                    {/* Member nodes */}
                    {agreement.members.map((m) =>
                      centroids[m] ? (
                        <Marker key={`${agreement.id}-node-${m}`} coordinates={centroids[m]}>
                          <circle r={1.9} fill={accent} stroke="#000" strokeWidth={0.5} />
                        </Marker>
                      ) : null
                    )}

                    {/* The real administrative seat, drawn as a distinct ringed marker */}
                    <Marker coordinates={hubPos}>
                      <circle r={5.2} fill="none" stroke={accent} strokeWidth={0.9} opacity={0.7} />
                      <circle r={2.6} fill="#fff" stroke={accent} strokeWidth={1} />
                    </Marker>
                  </>
                );
              }}
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}
