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

const STATE_PALETTE: Record<string, string> = {
  "01": "#f59e0b", "02": "#3b82f6", "04": "#8b5cf6", "05": "#10b981", "06": "#f97316",
  "08": "#ec4899", "09": "#06b6d4", "10": "#84cc16", "11": "#eab308", "12": "#3b82f6",
  "13": "#a855f7", "15": "#06b6d4", "16": "#e11d48", "17": "#10b981", "18": "#f59e0b",
  "19": "#6366f1", "20": "#84cc16", "21": "#ec4899", "22": "#06b6d4", "23": "#10b981",
  "24": "#f59e0b", "25": "#8b5cf6", "26": "#3b82f6", "27": "#10b981", "28": "#f97316",
  "29": "#e11d48", "30": "#84cc16", "31": "#eab308", "32": "#a855f7", "33": "#06b6d4",
  "34": "#f59e0b", "35": "#ec4899", "36": "#10b981", "37": "#3b82f6", "38": "#84cc16",
  "39": "#f97316", "40": "#a855f7", "41": "#06b6d4", "42": "#e11d48", "44": "#6366f1",
  "45": "#f59e0b", "46": "#84cc16", "47": "#ec4899", "48": "#8b5cf6", "49": "#3b82f6",
  "50": "#10b981", "51": "#f97316", "53": "#e11d48", "54": "#a855f7", "55": "#06b6d4",
  "56": "#f59e0b",
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

  const useHighDensityMode = useMemo(() => {
    return !!features && features.length > 2500;
  }, [features]);

  const groups = useMemo(() => {
    if ((!useHighDensityMode && (onFeatureHover || onFeatureClick)) || !features || features.length === 0) return [];
    const cacheKey = `${url}:${categoryField || "flat"}:${fill || ""}:${defaultColor || ""}:hd`;
    if (pathGroupCache.has(cacheKey)) {
      return pathGroupCache.get(cacheKey)!;
    }

    const byColor = new Map<string, string>();
    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      const props = (f.properties || {}) as any;
      const cat = categoryField ? props[categoryField] : undefined;
      const stFips = props.STATEFP;
      const color = (cat && colorMap?.[cat]) ?? (stFips && STATE_PALETTE[stFips]) ?? fill ?? defaultColor ?? "#38bdf8";
      const p = PATH(f as any);
      if (!p) continue;
      byColor.set(color, (byColor.get(color) ?? "") + p);
    }
    const result = Array.from(byColor.entries()).map(([color, d]) => ({ color, d }));
    pathGroupCache.set(cacheKey, result);
    return result;
  }, [features, categoryField, colorMap, fill, defaultColor, url, useHighDensityMode, onFeatureHover, onFeatureClick]);

  const spatialIndex = useMemo(() => {
    if (!useHighDensityMode || (!onFeatureHover && !onFeatureClick) || !features || features.length === 0) return [];
    const list: { minX: number; minY: number; maxX: number; maxY: number; feature: GeoJSON.Feature; hoverInfo: HoverInfo }[] = [];
    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      const p = PATH(f as any);
      if (!p) continue;

      const coords = p.split(/[A-Za-z]/).filter(Boolean).flatMap(s => s.trim().split(',')).map(Number).filter(n => !isNaN(n));
      if (coords.length < 4) continue;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (let j = 0; j < coords.length; j += 2) {
        if (coords[j] < minX) minX = coords[j];
        if (coords[j] > maxX) maxX = coords[j];
        if (coords[j+1] < minY) minY = coords[j+1];
        if (coords[j+1] > maxY) maxY = coords[j+1];
      }

      const props = (f.properties || {}) as any;
      const rawName = props.NAMELSAD || props.NAME || props.name || props.UNIT_NAME || props.PARKNAME || "Boundary Feature";
      const agencyCode = props.agency || props.UNIT_TYPE || props.UNIT_CODE || props.GEOID || "FEATURE";
      const agencyName = AGENCY_NAMES[props.agency] || props.agency;
      const details = props.agency 
        ? `Managed by ${agencyName}` 
        : (props.STATE_NAME ? `State: ${props.STATE_NAME}` : (props.STATE ? `State: ${props.STATE}` : "Public Federal Land"));

      list.push({
        minX,
        minY,
        maxX,
        maxY,
        feature: f,
        hoverInfo: {
          label: rawName,
          details,
          code: agencyCode,
        },
      });
    }
    return list;
  }, [features, useHighDensityMode, onFeatureHover, onFeatureClick]);

  const featureItems = useMemo(() => {
    if (useHighDensityMode || (!onFeatureHover && !onFeatureClick) || !features || features.length === 0) return [];
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
  }, [features, useHighDensityMode, categoryField, colorMap, fill, defaultColor, onFeatureHover, onFeatureClick]);

  const getEventCoords = (e: React.MouseEvent<SVGGElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(e.currentTarget.getScreenCTM()?.inverse());
  };

  const handleMouseMove = (e: React.MouseEvent<SVGGElement>) => {
    if (!onFeatureHover || spatialIndex.length === 0) return;
    const cursor = getEventCoords(e);
    if (!cursor) return;

    let hit = null;
    for (let i = 0; i < spatialIndex.length; i++) {
      const item = spatialIndex[i];
      if (cursor.x >= item.minX && cursor.x <= item.maxX && cursor.y >= item.minY && cursor.y <= item.maxY) {
        hit = item;
        break;
      }
    }
    onFeatureHover(hit ? hit.hoverInfo : null);
  };

  const handleClick = (e: React.MouseEvent<SVGGElement>) => {
    if (!onFeatureClick || spatialIndex.length === 0) return;
    const cursor = getEventCoords(e);
    if (!cursor) return;

    for (let i = 0; i < spatialIndex.length; i++) {
      const item = spatialIndex[i];
      if (cursor.x >= item.minX && cursor.x <= item.maxX && cursor.y >= item.minY && cursor.y <= item.maxY) {
        onFeatureClick(item.feature);
        break;
      }
    }
  };

  if (!onFeatureHover && !onFeatureClick && groups.length === 0) return null;

  if (useHighDensityMode) {
    return (
      <g
        className="cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => onFeatureHover?.(null)}
        onClick={handleClick}
      >
        {groups.map((g) => (
          <path
            key={g.color}
            d={g.d}
            fill={g.color}
            stroke={stroke}
            strokeWidth={strokeWidth}
            className="transition-opacity hover:opacity-90"
            pointerEvents="all"
          />
        ))}
      </g>
    );
  }

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
