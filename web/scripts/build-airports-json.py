#!/usr/bin/env python3
"""Build lib/data/airports.json from the NTAD airport GeoJSON exports.

Keeps the 873 commercial-service airports (the three enplanement tiers) with the
fields the map and detail panel need, plus a count of every facility category for
the "19,514 airports" headline. Coordinates rounded to 3 decimals to stay small.
"""
import json, os

BASE = "ASSETS/GeoJSON/"
TIERS = [
    ("L", "1%2C000%2C000_or_more.geojson"),
    ("M", "100%2C000_-_999%2C999.geojson"),
    ("S", "Less_than_100%2C000.geojson"),
]
COUNT_FILES = {
    "large": "1%2C000%2C000_or_more.geojson",
    "medium": "100%2C000_-_999%2C999.geojson",
    "small": "Less_than_100%2C000.geojson",
    "heliport": "Heliport.geojson",
    "seaplane": "Seaplane_Base.geojson",
    "gliderport": "Gliderport.geojson",
    "ultralight": "Ultralight.geojson",
    "other": "Unknown_(Airport).geojson",
}


def num(v):
    try:
        return int(v)
    except (TypeError, ValueError):
        return 0


airports = []
for tier, fn in TIERS:
    data = json.load(open(BASE + fn))
    for f in data["features"]:
        p = f["properties"]
        lng, lat = f["geometry"]["coordinates"][:2]
        # keep the contiguous-US + AK/HI window the geoAlbersUsa projection shows
        airports.append({
            "id": p.get("FAA_ID"),
            "name": p.get("NAME"),
            "city": p.get("CITY"),
            "state": p.get("STATE"),
            "lng": round(float(lng), 3),
            "lat": round(float(lat), 3),
            "enpl": num(p.get("ENPLANEMEN")),
            "pax": num(p.get("PASSENGERS")),
            "tier": tier,
            "intl": p.get("INTL") == "Y",
            "tower": p.get("TOWER") == "Y",
        })

airports.sort(key=lambda a: -a["enpl"])

counts = {}
total = 0
for label, fn in COUNT_FILES.items():
    n = len(json.load(open(BASE + fn))["features"])
    counts[label] = n
    total += n
counts["total"] = total

out = {"airports": airports, "counts": counts}
os.makedirs("lib/data", exist_ok=True)
json.dump(out, open("lib/data/airports.json", "w"), separators=(",", ":"))
size = os.path.getsize("lib/data/airports.json")
print(f"wrote lib/data/airports.json — {len(airports)} airports, {size/1024:.0f} KB")
print("counts:", counts)
