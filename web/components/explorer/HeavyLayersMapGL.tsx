"use client";

// ─── FederalLandsMapGL ────────────────────────────────────────────────────────
// A genuinely GPU-accelerated (WebGL, MapLibre GL) map for the Federal Lands
// layer specifically — every one of the ~5,260 PAD-US federal-land parcels
// nationwide, colored by managing agency.
//
// Why this one layer gets its own GPU map instead of drawing on the SVG state
// map like every other overlay: even after merging it into a single SVG path
// and cutting sub-pixel islands out of the geometry, a dataset this size is
// still enough vector-path complexity to hang a real browser tab. MapLibre
// renders it as GPU-rasterized vector tiles instead of one enormous DOM path,
// which is the actual fix, not a smaller patch on the same technique.
//
// Why a separate map instance instead of an overlay on the existing SVG map:
// the rest of this page uses a static Albers USA composite projection (via
// react-simple-maps / d3-geo) rendered as SVG. MapLibre renders on Mercator
// slippy tiles — a different projection with its own math. The two can't be
// pixel-aligned by a transform, so this mounts as its own small map panel
// instead, shown whenever the Federal Lands toggle is on.
//
// Basemap: CARTO's free "dark-matter" style (no API key required) — matches
// this page's dark theme far better than MapLibre's default demo style.
//
// Import must be static (not a dynamic import()) — MapLibre bundles an
// internal Worker via `new Worker(new URL(...))`, which bundlers can only
// resolve correctly when they can see the import statically at build time.
import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const BASEMAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// Same agency color convention used across the site's federal-land displays —
// matches the standard federal-land-by-agency reference map (FWS teal, NPS
// green, USFS olive, BLM gold, DOD red, tribal purple, etc.) instead of one
// flat color for every parcel regardless of who manages it.
const FEDERAL_AGENCY_FILL: any = [
  "match",
  ["get", "Mang_Name"],
  "FWS", "#22d3ee",
  "NPS", "#10b981",
  "USFS", "#84cc16",
  "BLM", "#eab308",
  "DOD", "#ef4444",
  "TRIB", "#a855f7",
  "USACE", "#3b82f6",
  "USBR", "#38bdf8",
  "OTHF", "#9ca3af",
  "SPR", "#d1d5db",
  "#9ca3af",
];

export function FederalLandsMapGL() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: BASEMAP_STYLE,
      center: [-98, 39],
      zoom: 3.1,
      attributionControl: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    map.on("error", (e: any) => console.error("[FederalLandsMapGL]", e?.error || e));

    map.on("load", () => {
      if (cancelled) return;
      map.addSource("federal-lands", { type: "geojson", data: "/maps/federal-lands.json" });
      map.addLayer({
        id: "federal-lands-fill",
        type: "fill",
        source: "federal-lands",
        paint: { "fill-color": FEDERAL_AGENCY_FILL, "fill-opacity": 0.55 },
      });
      map.addLayer({
        id: "federal-lands-line",
        type: "line",
        source: "federal-lands",
        paint: { "line-color": "#000000", "line-width": 0.3, "line-opacity": 0.4 },
      });
    });

    return () => {
      cancelled = true;
      map.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
