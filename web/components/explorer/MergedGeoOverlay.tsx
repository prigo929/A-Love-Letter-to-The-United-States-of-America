"use client";

// ─── MergedGeoOverlay ─────────────────────────────────────────────────────────
// Renders a large polygon GeoJSON layer (thousands of features, e.g. every
// federal-land parcel or every NPS unit) as ONE merged SVG <path> instead of one
// react-simple-maps <Geography> per feature.

import React, { useEffect, useMemo, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";

const PROJECTION = geoAlbersUsa().translate([400, 300]).scale(960);
const PATH = geoPath(PROJECTION);

// Global in-memory caches to prevent redundant fetch & d3-geo computation
const featureCache = new Map<string, GeoJSON.Feature[]>();
const pathGroupCache = new Map<string, { color: string; d: string }[]>();

export const MergedGeoOverlay = React.memo(function MergedGeoOverlay({
  url,
  fill,
  stroke,
  strokeWidth = 0.4,
  categoryField,
  colorMap,
  defaultColor,
}: {
  url: string;
  fill?: string;
  stroke: string;
  strokeWidth?: number;
  categoryField?: string;
  colorMap?: Record<string, string>;
  defaultColor?: string;
}) {
  const [features, setFeatures] = useState<GeoJSON.Feature[] | null>(() => featureCache.get(url) || null);

  useEffect(() => {
    if (featureCache.has(url)) {
      setFeatures(featureCache.get(url)!);
      return;
    }
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((geojson: GeoJSON.FeatureCollection) => {
        if (alive) {
          featureCache.set(url, geojson.features);
          setFeatures(geojson.features);
        }
      })
      .catch(() => alive && setFeatures([]));
    return () => {
      alive = false;
    };
  }, [url]);

  const groups = useMemo(() => {
    if (!features || features.length === 0) return [];
    const cacheKey = `${url}:${categoryField || "flat"}:${fill || ""}:${defaultColor || ""}`;
    if (pathGroupCache.has(cacheKey)) {
      return pathGroupCache.get(cacheKey)!;
    }

    let result: { color: string; d: string }[] = [];
    if (!categoryField || !colorMap) {
      let d = "";
      for (let i = 0; i < features.length; i++) {
        const p = PATH(features[i] as any);
        if (p) d += p;
      }
      result = d ? [{ color: fill ?? defaultColor ?? "#888888", d }] : [];
    } else {
      const byColor = new Map<string, string>();
      for (let i = 0; i < features.length; i++) {
        const f = features[i];
        const cat = (f.properties as any)?.[categoryField];
        const color = colorMap[cat] ?? defaultColor ?? fill ?? "#888888";
        const p = PATH(f as any);
        if (!p) continue;
        byColor.set(color, (byColor.get(color) ?? "") + p);
      }
      result = Array.from(byColor.entries()).map(([color, d]) => ({ color, d }));
    }

    pathGroupCache.set(cacheKey, result);
    return result;
  }, [features, categoryField, colorMap, fill, defaultColor, url]);

  if (groups.length === 0) return null;

  return (
    <g className="pointer-events-none">
      {groups.map((g) => (
        <path key={g.color} d={g.d} fill={g.color} stroke={stroke} strokeWidth={strokeWidth} pointerEvents="none" />
      ))}
    </g>
  );
});

// ─── MergedLineOverlay ────────────────────────────────────────────────────────
export const MergedLineOverlay = React.memo(function MergedLineOverlay({
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
});
