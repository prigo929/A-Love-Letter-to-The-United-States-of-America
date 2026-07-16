#!/usr/bin/env python3
"""Build lib/data/power-plants.json from the EIA Preliminary Monthly Generator Inventory.

The workbook lists 28k individual generators; a power plant is many generators.
We roll them up by Plant ID (summing nameplate capacity, taking the dominant
technology by capacity) so the map can plot the real operating fleet, sized by
megawatts and coloured by fuel.
"""
import json, os
from collections import defaultdict
import openpyxl

SRC = "ASSETS/GeoJSON/Preliminary Monthly Electric Generator Inventory.xlsx"
OUT = "lib/data/power-plants.json"

# EIA "Technology" → our fuel category
def fuel_of(tech: str) -> str:
    t = (tech or "").lower()
    if "nuclear" in t:
        return "nuclear"
    if "hydro" in t:
        return "hydro"
    if "coal" in t or "petroleum coke" in t:
        return "coal"
    if "natural gas" in t:
        return "gas"
    if "wind" in t:
        return "wind"
    if "solar" in t:
        return "solar"
    if "batteries" in t or "storage" in t:
        return "storage"
    if "geothermal" in t:
        return "geothermal"
    if "petroleum" in t or "oil" in t:
        return "oil"
    if "biomass" in t or "wood" in t or "landfill" in t or "municipal" in t:
        return "biomass"
    return "other"


def main():
    wb = openpyxl.load_workbook(SRC, read_only=True, data_only=True)
    ws = wb["Operating"]
    rows = ws.iter_rows(min_row=3, values_only=True)
    header = next(rows)
    idx = {h: i for i, h in enumerate(header)}
    C_PID, C_NAME, C_STATE = idx["Plant ID"], idx["Plant Name"], idx["Plant State"]
    C_MW, C_TECH = idx["Nameplate Capacity (MW)"], idx["Technology"]
    C_LAT, C_LNG = idx["Latitude"], idx["Longitude"]

    plants = {}
    fuel_mw = defaultdict(lambda: defaultdict(float))
    for r in rows:
        pid = r[C_PID]
        if pid is None:
            continue
        try:
            mw = float(r[C_MW])
        except (TypeError, ValueError):
            mw = 0.0
        try:
            lat, lng = float(r[C_LAT]), float(r[C_LNG])
        except (TypeError, ValueError):
            continue  # no coordinates → cannot map it
        p = plants.setdefault(pid, {"name": r[C_NAME], "state": r[C_STATE], "lat": lat, "lng": lng, "mw": 0.0})
        p["mw"] += mw
        fuel_mw[pid][fuel_of(r[C_TECH])] += mw

    # Map only utility-scale plants: >=10 MW is 43% of the plants but 98% of the
    # nation's capacity, and halves the payload. True totals kept in `meta`.
    MIN_MW = 10.0
    every = []
    for pid, p in plants.items():
        if p["mw"] <= 0:
            continue
        fuel = max(fuel_mw[pid].items(), key=lambda kv: kv[1])[0]  # dominant by capacity
        every.append({
            "n": p["name"],
            "s": p["state"],
            "lng": round(p["lng"], 3),
            "lat": round(p["lat"], 3),
            "mw": round(p["mw"], 1),
            "f": fuel,
        })
    every.sort(key=lambda x: -x["mw"])
    out = [p for p in every if p["mw"] >= MIN_MW]

    # National fuel mix over the whole fleet (not just the mapped subset).
    counts = defaultdict(int)
    cap = defaultdict(float)
    for p in every:
        counts[p["f"]] += 1
        cap[p["f"]] += p["mw"]

    total_mw = sum(p["mw"] for p in every)  # the true national figure
    meta = {
        "totalPlants": len(every),
        "totalGW": round(total_mw / 1000),
        "mapped": len(out),
        "minMw": MIN_MW,
        "byFuelGW": {f: round(v / 1000, 1) for f, v in sorted(cap.items(), key=lambda kv: -kv[1])},
        "byFuelCount": dict(counts),
    }
    os.makedirs("lib/data", exist_ok=True)
    json.dump({"plants": out, "meta": meta}, open(OUT, "w"), separators=(",", ":"))
    print(f"wrote {OUT} — {len(out)} mapped of {len(every)} plants, {os.path.getsize(OUT)/1024:.0f} KB")
    print(f"total operating nameplate capacity: {total_mw/1000:.0f} GW")
    print("\nby fuel (plants / GW):")
    for f in sorted(cap, key=lambda k: -cap[k]):
        print(f"  {f:11} {counts[f]:5}  {cap[f]/1000:8.1f} GW")
    print("\ntop 8 plants:")
    for p in out[:8]:
        print(f"  {p['mw']:8.0f} MW  {p['f']:9} {p['n'][:36]} ({p['s']})")


if __name__ == "__main__":
    main()
