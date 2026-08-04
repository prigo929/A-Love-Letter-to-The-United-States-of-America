"use client";

// ─── CountyMap ────────────────────────────────────────────────────────────────
// County-level presidential choropleth (2000–2024). Boundaries come from us-atlas
// counties-10m (the same curated source as the state map, so Alaska's antimeridian
// islands and the AK/HI insets render cleanly under geoAlbersUsa). Colors come from
// the user's MIT county presidential returns (public/maps/county-returns.json).
// Each of the ~3,100 counties is filled by the winning party, its saturation scaled
// by the margin — the "how close was it" texture the state map cannot show.

import { memo, useEffect, useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const RETURNS_URL = "/maps/county-returns.json";

// 2-digit state FIPS → USPS, to label the hovered county.
const FIPS_ST: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT", "10": "DE", "11": "DC",
  "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY",
  "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT",
  "31": "NE", "32": "NV", "33": "NH", "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
  "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI", "56": "WY",
};

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
            {({ geographies }: { geographies: Array<{ rsmKey: string; id?: string | number; properties: Record<string, string> }> }) =>
              geographies.map((g) => {
                const fips = String(g.id ?? "").padStart(5, "0");
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
                      const name = g.properties.name;
                      const st = FIPS_ST[fips.slice(0, 2)] ?? "";
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
