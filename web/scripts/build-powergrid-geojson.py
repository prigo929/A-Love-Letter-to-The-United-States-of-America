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

# HIFLD VOLT_CLASS → our key. All voltage classes on the U.S. grid.
CLASS_KEY = {
    "735 AND ABOVE": "V765",  # 500+ kV
    "500": "V500",            # 400-500 kV
    "345": "V345",            # 300-400 kV
    "220-287": "V230",        # 200-300 kV
    "100-161": "V115",        # 100-200 kV
    "UNDER 100": "V69",       # <100 kV
    "DC": "VDC",              # HVDC
}

# Category-specific DP tolerances and minimum segment lengths to balance detail & file size
CFG = {
    "V765": {"tol": 0.01, "min_mi": 1.0},
    "V500": {"tol": 0.015, "min_mi": 1.5},
    "V345": {"tol": 0.02, "min_mi": 2.0},
    "V230": {"tol": 0.03, "min_mi": 3.0},
    "V115": {"tol": 0.05, "min_mi": 6.0},
    "V69":  {"tol": 0.07, "min_mi": 10.0},
    "VDC":  {"tol": 0.01, "min_mi": 1.0},
}


def main():
    groups: dict[str, list] = {}
    substations = set()
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
            
            cfg = CFG[key]
            for coords in lines:
                if len(coords) < 2:
                    continue
                seg = [[round(float(x), 3), round(float(y), 3)] for x, y, *_ in coords]
                if bi.seg_len_mi(seg) < cfg["min_mi"]:
                    continue
                s = bi.dp(seg, cfg["tol"])
                groups.setdefault(key, []).append([[round(x, 3), round(y, 3)] for x, y in s])
                kept += 1

                # Collect major substations from EHV (230kV+) and DC line endpoints
                if key in ["V765", "V500", "V345", "V230", "VDC"]:
                    substations.add((round(float(coords[0][0]), 3), round(float(coords[0][1]), 3)))
                    substations.add((round(float(coords[-1][0]), 3), round(float(coords[-1][1]), 3)))

    out = {}
    for key, segs in groups.items():
        miles = round(sum(bi.seg_len_mi(s) for s in segs))
        out[key] = {"segments": segs, "miles": miles}
        pts = sum(len(s) for s in segs)
        print(f"  {key}: {len(segs)} segments, {pts} pts, {miles} mi", flush=True)

    # Include extracted substations coordinates list
    out["substations"] = list(list(pt) for pt in substations)
    print(f"  Extracted {len(out['substations'])} substations", flush=True)


    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    print(f"wrote {OUT} — {os.path.getsize(OUT)/1024:.0f} KB (scanned {n})", flush=True)


if __name__ == "__main__":
    main()
