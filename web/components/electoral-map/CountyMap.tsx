"use client";

// ─── CountyMap ────────────────────────────────────────────────────────────────
// County-level presidential choropleth (2000–2024), drawn from the user's Census
// 2025 county boundaries (public/maps/us-counties.geojson, converted from the
// TIGER/cartographic shapefile) and MIT county presidential returns
// (public/maps/county-returns.json). Each of the ~3,100 counties is filled by the
// winning party, its saturation scaled by the margin, the classic "how close was
// it" texture the state map cannot show.

import { memo, useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "/maps/us-counties.geojson";
const RETURNS_URL = "/maps/county-returns.json";

const DEM = "#4169E1";
const REP = "#E64141";
const OTH = "#C9A84C";
const AVAILABLE_YEARS = [2000, 2004, 2008, 2012, 2016, 2020, 2024];

type CountyResult = { w: string; d: number; r: number; t: number };
type Returns = Record<string, Record<string, CountyResult>>;

// Blend a party color toward pale parchment as the margin narrows, so landslides
// read as deep and toss-ups read as near-neutral.
function shade(party: string, margin: number): string {
  const base = party === "DEM" ? [65, 105, 225] : party === "REP" ? [230, 65, 65] : [201, 168, 76];
  const pale = [232, 224, 200];
  const k = 0.28 + 0.72 * Math.min(1, margin / 0.4); // 28%..100% saturation
  const mix = base.map((c, i) => Math.round(pale[i] + (c - pale[i]) * k));
  return `rgb(${mix[0]},${mix[1]},${mix[2]})`;
}

export const CountyMap = memo(function CountyMap({ year, isRo }: { year: number; isRo?: boolean }) {
  const [geo, setGeo] = useState<object | null>(null);
  const [returns, setReturns] = useState<Returns | null>(null);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState<{ name: string; state: string; text: string } | null>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch(GEO_URL).then((r) => r.json()),
      fetch(RETURNS_URL).then((r) => r.json()),
    ])
      .then(([g, ret]) => {
        if (!alive) return;
        setGeo(g);
        setReturns(ret);
        setLoading(false);
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  // Snap to the most recent presidential year with county data.
  const dataYear = useMemo(
    () => [...AVAILABLE_YEARS].reverse().find((y) => y <= year) ?? null,
    [year]
  );
  const yearData = dataYear && returns ? returns[String(dataYear)] : undefined;

  if (dataYear === null) {
    return (
      <div className="flex h-[420px] items-center justify-center text-center">
        <p className="max-w-sm font-body text-sm text-[#8A8780]">
          {isRo
            ? "Datele pe comitate încep în 2000. Alege un an din 2000 încoace."
            : "County-level returns begin in 2000. Move the timeline to 2000 or later."}
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="flex h-[420px] items-center justify-center">
          <p className="font-body text-sm text-[#8A8780]">
            {isRo ? "Se încarcă cele ~3.100 de comitate…" : "Loading ~3,100 counties…"}
          </p>
        </div>
      )}
      {!loading && geo && (
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1180, translate: [480, 310] }}
          width={1000}
          height={600}
          viewBox="0 0 1000 600"
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={geo}>
            {({ geographies }: { geographies: Array<{ rsmKey: string; properties: Record<string, string> }> }) =>
              geographies.map((g) => {
                const fips = g.properties.GEOID;
                const res = yearData?.[fips];
                let fill = "#141821";
                if (res) {
                  const margin = res.t > 0 ? Math.abs(res.d - res.r) / res.t : 0;
                  fill = shade(res.w, margin);
                }
                return (
                  <Geography
                    key={g.rsmKey}
                    geography={g}
                    fill={fill}
                    stroke="#080B12"
                    strokeWidth={0.15}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: OTH, cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => {
                      const name = g.properties.NAME;
                      const st = g.properties.STUSPS;
                      if (!res) {
                        setHover({ name, state: st, text: isRo ? "fără date" : "no data" });
                        return;
                      }
                      const lead = res.w === "DEM" ? "D" : res.w === "REP" ? "R" : "O";
                      const pctD = res.t ? ((res.d / res.t) * 100).toFixed(1) : "0";
                      const pctR = res.t ? ((res.r / res.t) * 100).toFixed(1) : "0";
                      setHover({ name, state: st, text: `${lead}+  D ${pctD}% · R ${pctR}%  ·  ${res.t.toLocaleString()} ${isRo ? "voturi" : "votes"}` });
                    }}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      )}

      {/* Year badge */}
      <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-[rgba(201,168,76,0.25)] bg-[#080B12]/80 px-3 py-1 font-body text-xs font-bold text-[#C9A84C] backdrop-blur-sm">
        {dataYear}{year !== dataYear ? (isRo ? " (ultimele date)" : " (latest data)") : ""}
      </div>

      {/* Hover label */}
      {hover && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-lg border border-[rgba(201,168,76,0.25)] bg-[#080B12]/90 px-4 py-2 text-center backdrop-blur-sm">
          <p className="font-body text-sm font-bold text-[#F5F0E8]">
            {hover.name} <span className="text-[#8A8780]">· {hover.state}</span>
          </p>
          <p className="font-body text-xs text-[#B8B4AC]">{hover.text}</p>
        </div>
      )}
    </div>
  );
});
