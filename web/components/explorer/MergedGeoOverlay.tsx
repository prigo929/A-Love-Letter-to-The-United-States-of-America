"use client";

// ─── MergedGeoOverlay ─────────────────────────────────────────────────────────
// Renders a large polygon GeoJSON layer (thousands of features, e.g. every
// federal-land parcel or every NPS unit) as ONE merged SVG <path> instead of one
// react-simple-maps <Geography> per feature.

import React, { useEffect, useMemo, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature as topojsonFeature } from "topojson-client";

const PROJECTION = geoAlbersUsa().translate([400, 300]).scale(960);
const PATH = geoPath(PROJECTION);

// Global in-memory caches to prevent redundant fetch & d3-geo computation
const featureCache = new Map<string, GeoJSON.Feature[]>();
const pathGroupCache = new Map<string, { color: string; d: string }[]>();

export interface HoverInfo {
  label: string;
  details: string;
  code: string;
  categoryMetric?: string;
}

const AGENCY_NAMES: Record<string, string> = {
  DOD: "Department of Defense",
  BLM: "Bureau of Land Management",
  NPS: "National Park Service",
  USFS: "U.S. Forest Service",
  FWS: "Fish and Wildlife Service",
  BIA: "Bureau of Indian Affairs",
  USBR: "Bureau of Reclamation",
  USACE: "Army Corps of Engineers",
  TRIB: "Tribal Land / Reservation",
};

export const MergedGeoOverlay = React.memo(function MergedGeoOverlay({
  url,
  fill,
  stroke,
  strokeWidth = 0.4,
  categoryField,
  colorMap,
  defaultColor,
  onFeatureHover,
  onFeatureClick,
}: {
  url: string;
  fill?: string;
  stroke: string;
  strokeWidth?: number;
  categoryField?: string;
  colorMap?: Record<string, string>;
  defaultColor?: string;
  onFeatureHover?: (info: HoverInfo | null) => void;
  onFeatureClick?: (feature: GeoJSON.Feature) => void;
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
      .then((data: any) => {
        if (!alive) return;
        let feats: GeoJSON.Feature[] = [];
        if (data.type === "Topology" && data.objects) {
          const firstKey = Object.keys(data.objects)[0];
          const featureColl = topojsonFeature(data, data.objects[firstKey]) as any;
          feats = featureColl.features || [];
        } else {
          feats = data.features || [];
        }
        featureCache.set(url, feats);
        setFeatures(feats);
      })
      .catch(() => alive && setFeatures([]));
    return () => {
      alive = false;
    };
  }, [url]);

  const groups = useMemo(() => {
    if (onFeatureHover || !features || features.length === 0) return [];
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
  }, [features, categoryField, colorMap, fill, defaultColor, url, onFeatureHover]);

  const featureItems = useMemo(() => {
    if ((!onFeatureHover && !onFeatureClick) || !features || features.length === 0) return [];
    return features.map((f, i) => {
      const p = PATH(f as any);
      if (!p) return null;
      const props = (f.properties || {}) as any;
      const cat = categoryField ? props[categoryField] : undefined;
      const color = (cat && colorMap?.[cat]) ?? defaultColor ?? fill ?? "#888888";
      
      const rawName = props.NAMELSAD || props.NAME || props.name || props.UNIT_NAME || props.PARKNAME || "Boundary Feature";
      const agencyCode = props.agency || props.UNIT_TYPE || props.UNIT_CODE || props.GEOID || "FEATURE";
      const agencyName = AGENCY_NAMES[props.agency] || props.agency;
      const details = props.agency 
        ? `Managed by ${agencyName}` 
        : (props.STATE_NAME ? `State: ${props.STATE_NAME}` : (props.STATE ? `State: ${props.STATE}` : "Public Federal Land"));

      return {
        id: i,
        d: p,
        color,
        feature: f,
        hoverInfo: {
          label: rawName,
          details,
          code: agencyCode,
        },
      };
    }).filter(Boolean) as { id: number; d: string; color: string; feature: GeoJSON.Feature; hoverInfo: HoverInfo }[];
  }, [features, categoryField, colorMap, fill, defaultColor, onFeatureHover, onFeatureClick]);

  if (!onFeatureHover && !onFeatureClick && groups.length === 0) return null;

  if (onFeatureHover || onFeatureClick) {
    return (
      <g className="cursor-pointer">
        {featureItems.map((item) => (
          <path
            key={item.id}
            d={item.d}
            fill={item.color}
            stroke={stroke}
            strokeWidth={strokeWidth}
            className="transition-opacity hover:opacity-85"
            onMouseEnter={() => onFeatureHover?.(item.hoverInfo)}
            onMouseLeave={() => onFeatureHover?.(null)}
            onClick={(e) => {
              e.stopPropagation();
              onFeatureClick?.(item.feature);
            }}
            pointerEvents="all"
          />
        ))}
      </g>
    );
  }

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
