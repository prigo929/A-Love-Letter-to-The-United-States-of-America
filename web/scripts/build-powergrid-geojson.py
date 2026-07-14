#!/usr/bin/env python3
"""Build lib/data/powergrid-simplified.json from the HIFLD transmission-line set.

The full grid is millions of segments; the striking national picture is the
extra-high-voltage backbone. We keep 230 kV and up (plus HVDC), grouped by
voltage class for colouring, and Douglas-Peucker simplify each segment. No
stitching — transmission lines aren't routes, so we just draw the segments.
"""
import importlib.util, os, json
import ijson

_spec = importlib.util.spec_from_file_location(
    "bi", os.path.join(os.path.dirname(__file__), "build-interstates-geojson.py")
)
bi = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bi)

SRC = "ASSETS/GeoJSON/Electric_Power_Transmission_Lines_shp.geojson"
OUT = "lib/data/powergrid-simplified.json"

# HIFLD VOLT_CLASS → our key. Only the transmission backbone (230 kV+ and DC).
CLASS_KEY = {
    "735 And Above": "V765",
    "500": "V500",
    "345": "V345",
    "220-287": "V230",
    "DC": "VDC",
}
TOL = 0.02       # ~1.5 mi
MIN_MI = 2.0


def main():
    groups: dict[str, list] = {}
    n = 0
    kept = 0
    with open(SRC) as f:
        for feat in ijson.items(f, "features.item"):
            n += 1
            if n % 100000 == 0:
                print(f"  ...{n} features, {kept} kept", flush=True)
            p = feat.get("properties", {})
            key = CLASS_KEY.get(p.get("VOLT_CLASS"))
            if not key:
                continue
            g = feat.get("geometry", {})
            gt = g.get("type")
            if gt == "LineString":
                lines = [g["coordinates"]]
            elif gt == "MultiLineString":
                lines = g["coordinates"]
            else:
                continue
            for coords in lines:
                if len(coords) < 2:
                    continue
                seg = [[round(float(x), 3), round(float(y), 3)] for x, y, *_ in coords]
                if bi.seg_len_mi(seg) < MIN_MI:
                    continue
                s = bi.dp(seg, TOL)
                groups.setdefault(key, []).append([[round(x, 3), round(y, 3)] for x, y in s])
                kept += 1

    out = {}
    for key, segs in groups.items():
        miles = round(sum(bi.seg_len_mi(s) for s in segs))
        out[key] = {"segments": segs, "miles": miles}
        pts = sum(len(s) for s in segs)
        print(f"  {key}: {len(segs)} segments, {pts} pts, {miles} mi", flush=True)

    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    print(f"wrote {OUT} — {os.path.getsize(OUT)/1024:.0f} KB (scanned {n})", flush=True)


if __name__ == "__main__":
    main()
