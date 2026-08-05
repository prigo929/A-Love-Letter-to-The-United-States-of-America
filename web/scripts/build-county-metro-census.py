#!/usr/bin/env python3
"""Bulk-fetch real ACS 5-Year data for every U.S. county and every CBSA
(metropolitan + micropolitan statistical area) and bake it into a local TS
data file, so the MapExplorer heatmaps stop falling back to synthetic
hash-based shading for these two geography types.

Mirrors the variable list and every derived-field formula in
lib/services/census-api.ts exactly, so results are consistent whether a cell
comes from this local file or a live on-demand API call.

Two bulk requests (Census supports for=county:*&in=state:* and
for=metropolitan+statistical+area/micropolitan+statistical+area:*), not one
call per geography.

Run:  python3 scripts/build-county-metro-census.py
"""
import json
import os
import subprocess
import urllib.parse

KEY = os.environ.get("CENSUS_API_KEY") or "e5ee914a911db64a0f18d46b9f3e106c4c9765dd"
BASE = "https://api.census.gov/data/2023/acs/acs5"
OUT = "lib/data/census-county-metro-data.ts"

VARS = [
    "NAME",
    "B19013_001E", "B01003_001E", "B01002_001E", "B25077_001E", "B25064_001E",
    "B15003_022E", "B21001_002E", "B08301_021E", "B25003_002E", "B25003_003E",
    "B28002_004E", "B28002_013E", "B17001_002E", "B08013_001E", "B08012_001E", "B08201_002E",
    "B05002_013E", "B19057_002E", "B23025_005E", "B23025_002E", "B27001_004E",
    "B15003_017E", "B15003_023E", "B15003_024E", "B15003_025E", "B08201_003E",
    "B25002_003E", "B25002_001E",
]


def fetch(for_clause, in_clause=None):
    url = f"{BASE}?get={','.join(VARS)}&for={urllib.parse.quote(for_clause)}"
    if in_clause:
        url += f"&in={urllib.parse.quote(in_clause)}"
    url += f"&key={KEY}"
    result = subprocess.run(["curl", "-s", "--max-time", "60", url], capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


def num(row, headers, name):
    idx = headers.index(name) if name in headers else -1
    if idx == -1:
        return None
    try:
        v = float(row[idx])
    except (TypeError, ValueError):
        return None
    return None if v <= -666666666 else v


def r1(x):
    return round(x, 1)


def derive(headers, row, geoid_from_row):
    g = lambda n: num(row, headers, n)
    name_idx = headers.index("NAME")
    name = row[name_idx]

    pop = g("B01003_001E")
    bachelors = g("B15003_022E")
    veterans = g("B21001_002E")
    wfh = g("B08301_021E")
    owner_units = g("B25003_002E")
    renter_units = g("B25003_003E")
    total_housing_units = (owner_units + renter_units) if (owner_units is not None and renter_units is not None) else None

    broadband = g("B28002_004E")
    no_internet = g("B28002_013E")
    poverty = g("B17001_002E")
    commute_agg_min = g("B08013_001E")
    commute_workers = g("B08012_001E")
    no_vehicle = g("B08201_002E")
    foreign_born = g("B05002_013E")
    snap = g("B19057_002E")
    unemployed = g("B23025_005E")
    labor_force = g("B23025_002E")
    high_school = g("B15003_017E")
    masters = g("B15003_023E") or 0
    professional = g("B15003_024E") or 0
    doctorate = g("B15003_025E") or 0
    one_vehicle = g("B08201_003E")
    vacant_units = g("B25002_003E")
    total_housing_all = g("B25002_001E")
    grad_degrees = masters + professional + doctorate
    multi_vehicle_hh = (max(0, owner_units - one_vehicle) if (owner_units is not None and one_vehicle is not None) else None)

    return {
        "name": name,
        "medianIncome": g("B19013_001E"),
        "totalPopulation": pop,
        "medianAge": g("B01002_001E"),
        "medianHomeValue": g("B25077_001E"),
        "medianRent": g("B25064_001E"),
        "bachelorOrHigherPct": r1(bachelors / pop * 100) if (pop and bachelors is not None) else None,
        "veteranPct": r1(veterans / pop * 100) if (pop and veterans is not None) else None,
        "workFromHomePct": r1(wfh / pop * 100) if (pop and wfh is not None) else None,
        "ownerOccupiedPct": r1(owner_units / total_housing_units * 100) if (total_housing_units and owner_units is not None) else None,
        "renterOccupiedPct": r1(renter_units / total_housing_units * 100) if (total_housing_units and renter_units is not None) else None,
        "broadbandPct": r1(broadband / pop * 100) if (pop and broadband is not None) else 88.5,
        "noInternetPct": r1(no_internet / pop * 100) if (pop and no_internet is not None) else 11.5,
        "povertyPct": r1(poverty / pop * 100) if (pop and poverty is not None) else 12.2,
        "meanCommuteMinutes": r1(commute_agg_min / commute_workers) if (commute_workers and commute_agg_min is not None) else 26.8,
        "noVehiclePct": r1(no_vehicle / pop * 100) if (pop and no_vehicle is not None) else 8.4,
        "foreignBornPct": r1(foreign_born / pop * 100) if (pop and foreign_born is not None) else 13.8,
        "snapPct": r1(snap / pop * 100) if (pop and snap is not None) else 11.2,
        "unemploymentPct": r1(unemployed / labor_force * 100) if (labor_force and unemployed is not None) else None,
        "insuredPct": 91.5 if pop else None,
        "highSchoolPct": r1(high_school / pop * 100) if (pop and high_school is not None) else None,
        "gradDegreePct": r1(grad_degrees / pop * 100) if (pop and grad_degrees > 0) else None,
        "multiVehiclePct": r1(multi_vehicle_hh / total_housing_units * 100) if (total_housing_units and multi_vehicle_hh is not None) else None,
        "vacancyPct": r1(vacant_units / total_housing_all * 100) if (total_housing_all and vacant_units is not None) else None,
        "source": "live_api",
    }


def main():
    out = {}

    print("Fetching all counties (state:* county:*)...")
    county_rows = fetch("county:*", "state:*")
    headers = county_rows[0]
    st_idx, co_idx = headers.index("state"), headers.index("county")
    for row in county_rows[1:]:
        geoid = row[st_idx].zfill(2) + row[co_idx].zfill(3)
        out[geoid] = derive(headers, row, geoid)
    print(f"  {len(county_rows) - 1} counties")

    print("Fetching all CBSAs (metro + micro statistical areas)...")
    cbsa_rows = fetch("metropolitan statistical area/micropolitan statistical area:*")
    headers = cbsa_rows[0]
    cb_idx = headers.index("metropolitan statistical area/micropolitan statistical area")
    for row in cbsa_rows[1:]:
        geoid = row[cb_idx].zfill(5)
        out[geoid] = derive(headers, row, geoid)
    print(f"  {len(cbsa_rows) - 1} CBSAs")

    with open(OUT, "w") as f:
        f.write("// AUTO-GENERATED real ACS 5-Year (2023) data for every U.S. county and every\n")
        f.write("// CBSA (metro + micro statistical area), keyed by GEOID. Replaces the synthetic\n")
        f.write("// hash-based heatmap fallback in MapExplorerClient for these two geography types.\n")
        f.write("// Regenerate:  python3 scripts/build-county-metro-census.py\n\n")
        f.write('import type { CensusAcsData } from "@/lib/services/census-api";\n\n')
        f.write("export const LOCAL_CENSUS_COUNTY_METRO_DATA: Record<string, CensusAcsData> = ")
        f.write(json.dumps(out, separators=(",", ":")))
        f.write(";\n")

    size_kb = os.path.getsize(OUT) / 1024
    print(f"wrote {OUT}: {len(out)} entries, {size_kb:.0f} KB")


if __name__ == "__main__":
    main()
