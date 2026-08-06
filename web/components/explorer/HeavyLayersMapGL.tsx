"use client";

// ─── HeavyLayersMapGL ─────────────────────────────────────────────────────────
// A genuinely GPU-accelerated (WebGL, MapLibre GL) map view for the heaviest
// overlay datasets — Federal Lands, Park Boundaries, Trails — as an alternative
// to the SVG-based rendering used everywhere else on this page.
//
// Why a separate view instead of an overlay on the existing map: the rest of
// this page uses a static Albers USA composite projection (via react-simple-maps
// / d3-geo) rendered as SVG. MapLibre renders on Mercator slippy tiles — a
// completely different projection with its own math. The two cannot be
// pixel-aligned by a transform; there is no way to draw a MapLibre layer "on
// top of" the existing SVG map and have shapes line up. So this mounts its own
// MapLibre map instance instead, toggled in place of the SVG map, sharing the
// same Federal Lands / Park Boundaries / Trails toggle state.
//
// Basemap: CARTO's free "dark-matter" style (no API key required) — matches
// this page's dark theme far better than MapLibre's default demo style.
//
// Import must be static (not a dynamic import()) — MapLibre bundles an
// internal Worker via `new Worker(new URL(...))`, which bundlers can only
// resolve correctly when they can see the import statically at build time.
import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import type { Map as MLMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const BASEMAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// Same agency color convention as MergedGeoOverlay's FEDERAL_AGENCY_COLORS,
// re-expressed as a MapLibre `match` expression (opaque hex here since GL fill
// layers use a separate fill-opacity property rather than rgba alpha).
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

export function HeavyLayersMapGL({
  showFederalLands,
  showParkBoundaries,
  showTrails,
  trailsGeoJson,
}: {
  showFederalLands: boolean;
  showParkBoundaries: boolean;
  showTrails: boolean;
  trailsGeoJson: GeoJSON.FeatureCollection;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MLMap | null>(null);
  const loadedRef = useRef(false);

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
    map.on("error", (e: any) => console.error("[HeavyLayersMapGL]", e?.error || e));

    map.on("load", () => {
      if (cancelled) return;

      map.addSource("federal-lands", { type: "geojson", data: "/maps/federal-lands.json" });
      map.addLayer({
        id: "federal-lands-fill",
        type: "fill",
        source: "federal-lands",
        paint: { "fill-color": FEDERAL_AGENCY_FILL, "fill-opacity": 0.55 },
        layout: { visibility: "none" },
      });
      map.addLayer({
        id: "federal-lands-line",
        type: "line",
        source: "federal-lands",
        paint: { "line-color": "#000000", "line-width": 0.3, "line-opacity": 0.4 },
        layout: { visibility: "none" },
      });

      map.addSource("park-boundaries", { type: "geojson", data: "/maps/national-park-boundaries.json" });
      map.addLayer({
        id: "park-boundaries-fill",
        type: "fill",
        source: "park-boundaries",
        paint: { "fill-color": "#10b981", "fill-opacity": 0.35 },
        layout: { visibility: "none" },
      });
      map.addLayer({
        id: "park-boundaries-line",
        type: "line",
        source: "park-boundaries",
        paint: { "line-color": "#10b981", "line-width": 1 },
        layout: { visibility: "none" },
      });

      map.addSource("trails", { type: "geojson", data: trailsGeoJson });
      map.addLayer({
        id: "trails-line",
        type: "line",
        source: "trails",
        paint: { "line-color": "#a3e635", "line-width": 0.8, "line-opacity": 0.7 },
        layout: { visibility: "none" },
      });

      loadedRef.current = true;
      applyVisibility(map);
    });

    mapRef.current = map;

    return () => {
      cancelled = true;
      map.remove();
      mapRef.current = null;
      loadedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyVisibility(map: MLMap) {
    const v = (on: boolean) => (on ? "visible" : "none");
    for (const id of ["federal-lands-fill", "federal-lands-line"]) {
      map.setLayoutProperty(id, "visibility", v(showFederalLands));
    }
    for (const id of ["park-boundaries-fill", "park-boundaries-line"]) {
      map.setLayoutProperty(id, "visibility", v(showParkBoundaries));
    }
    map.setLayoutProperty("trails-line", "visibility", v(showTrails));
  }

  useEffect(() => {
    if (mapRef.current && loadedRef.current) {
      applyVisibility(mapRef.current);
    }
  }, [showFederalLands, showParkBoundaries, showTrails]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
