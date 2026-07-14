#!/usr/bin/env python3
"""Build lib/data/airports-all.json — every non-commercial airfield in the U.S.

The commercial 873 already live in airports.json (interactive markers). This adds
the rest of the 19,514: heliports, seaplane bases, gliderports, ultralight strips,
and the general-aviation airfields, as compact [lng,lat] arrays per category for a
density layer drawn as a single SVG path each. Coords at 2 decimals (~1 km).
"""
import json, os

BASE = "ASSETS/GeoJSON/"
CATEGORY_FILES = {
    "heliport": "Heliport.geojson",
    "seaplane": "Seaplane_Base.geojson",
    "gliderport": "Gliderport.geojson",
    "ultralight": "Ultralight.geojson",
    "ga": "Unknown_(Airport).geojson",  # general-aviation airfields
}

out = {}
total = 0
for cat, fn in CATEGORY_FILES.items():
    data = json.load(open(BASE + fn))
    pts = []
    for f in data["features"]:
        g = f.get("geometry")
        if not g or g.get("type") != "Point":
            continue
        lng, lat = g["coordinates"][:2]
        pts.append([round(float(lng), 2), round(float(lat), 2)])
    out[cat] = pts
    total += len(pts)
    print(f"  {cat}: {len(pts)} points")

os.makedirs("lib/data", exist_ok=True)
json.dump(out, open("lib/data/airports-all.json", "w"), separators=(",", ":"))
print(f"wrote lib/data/airports-all.json — {total} points, {os.path.getsize('lib/data/airports-all.json')/1024:.0f} KB")
