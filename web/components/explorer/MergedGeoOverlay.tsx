"use client";

// ─── MergedGeoOverlay ─────────────────────────────────────────────────────────
// Renders a large polygon GeoJSON layer (thousands of features, e.g. every
// federal-land parcel or every NPS unit) as ONE merged SVG <path> instead of one
// react-simple-maps <Geography> per feature.
//
// Why: react-simple-maps mounts a real React component (+ a DOM node, + its own
// style objects) for every single feature. That is fine for the ~50-3,000-feature
// layers already on this page, but at ~5,000+ densely-vertexed federal-land
// parcels it was enough DOM/React overhead to hang the tab — not because the data
// was too large to draw, but because it was drawn through thousands of separate
// React-managed elements. A per-feature hover handler made it worse (every mouse
// pixel triggered a parent state update → full-tree re-render), but removing that
// alone wasn't enough headroom in a real browser under real load.
//
// The fix keeps every single polygon — nothing is dropped — and simply draws them
// all as one <path> whose `d` is every feature's path concatenated, computed once
// via d3-geo using the *exact* projection react-simple-maps uses internally
// (geoAlbersUsa, default width/height 800×600, translate [400,300], scale from
// projectionConfig). That makes it pixel-identical to the state boundaries drawn
// by the normal <Geographies>, so it lines up perfectly, but costs the browser a
// single DOM node instead of thousands.
//
// This is the standard technique for large static choropleth-style SVG overlays;
// genuinely GPU-accelerated rendering (WebGL vector tiles, e.g. MapLibre GL) is a
// further step up but uses a different projection system (Mercator slippy tiles)
// that cannot be pixel-aligned with this page's Albers USA composite projection
// without a much larger rework of every existing layer — noted as a possible
// future upgrade, not applied here.

import { useEffect, useMemo, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";

// Matches react-simple-maps' ComposableMap defaults exactly (see makeProjection
// in node_modules/react-simple-maps): width/height default to 800×600, and
// translate is ALWAYS [width/2, height/2] — projectionConfig can only override
// scale/center/rotate/parallels, never translate.
const PROJECTION = geoAlbersUsa().translate([400, 300]).scale(960);
const PATH = geoPath(PROJECTION);

export function MergedGeoOverlay({
  url,
  fill,
  stroke,
  strokeWidth = 0.4,
  categoryField,
  colorMap,
  defaultColor,
}: {
  url: string;
  // Either a flat single fill for every feature, or (with categoryField +
  // colorMap) a distinct fill per feature-property value — e.g. federal-land
  // parcels colored by managing agency, matching the standard reference-map
  // convention. One merged <path> per color, not per feature.
  fill?: string;
  stroke: string;
  strokeWidth?: number;
  categoryField?: string;
  colorMap?: Record<string, string>;
  defaultColor?: string;
}) {
  const [features, setFeatures] = useState<GeoJSON.Feature[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((geojson: GeoJSON.FeatureCollection) => {
        if (alive) setFeatures(geojson.features);
      })
      .catch(() => alive && setFeatures([]));
    return () => {
      alive = false;
    };
  }, [url]);

  const groups = useMemo(() => {
    if (!features || features.length === 0) return [];
    if (!categoryField || !colorMap) {
      let d = "";
      for (const f of features) {
        const p = PATH(f as any);
        if (p) d += p;
      }
      return d ? [{ color: fill ?? defaultColor ?? "#888888", d }] : [];
    }
    const byColor = new Map<string, string>();
    for (const f of features) {
      const cat = (f.properties as any)?.[categoryField];
      const color = colorMap[cat] ?? defaultColor ?? fill ?? "#888888";
      const p = PATH(f as any);
      if (!p) continue;
      byColor.set(color, (byColor.get(color) ?? "") + p);
    }
    return Array.from(byColor.entries()).map(([color, d]) => ({ color, d }));
  }, [features, categoryField, colorMap, fill, defaultColor]);

  if (groups.length === 0) return null;

  return (
    <>
      {groups.map((g) => (
        <path key={g.color} d={g.d} fill={g.color} stroke={stroke} strokeWidth={strokeWidth} fillRule="evenodd" pointerEvents="none" />
      ))}
    </>
  );
}

// ─── MergedLineOverlay ────────────────────────────────────────────────────────
// Same idea as MergedGeoOverlay but for line-segment datasets (trails, power
// transmission lines) that were previously drawn as one react-simple-maps
// <Line> per point-to-point edge — e.g. trails alone is ~134k points, meaning
// ~110k separate <Line> elements for a single toggle. Since this data is
// already loaded locally as plain segment arrays (not fetched GeoJSON), this
// skips the fetch and builds the merged path directly from the in-memory data.
export function MergedLineOverlay({
  data,
  stroke,
  strokeWidth = 0.6,
  strokeOpacity = 1,
  strokeDasharray,
}: {
  data: { segments?: number[][][] }[];
  stroke: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeDasharray?: string;
}) {
  const mergedPath = useMemo(() => {
    const coordinates = data.flatMap((item) => item.segments || []).filter((seg) => seg.length >= 2);
    if (coordinates.length === 0) return "";
    return PATH({ type: "MultiLineString", coordinates } as any) || "";
  }, [data]);

  if (!mergedPath) return null;

  return (
    <path
      d={mergedPath}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeOpacity={strokeOpacity}
      strokeDasharray={strokeDasharray}
      strokeLinecap="round"
      pointerEvents="none"
    />
  );
}
