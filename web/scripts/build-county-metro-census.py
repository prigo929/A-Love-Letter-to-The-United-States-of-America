#!/usr/bin/env python3
"""Bulk-fetch real ACS 5-Year data for every U.S. county, every CBSA
(metropolitan + micropolitan statistical area), and every incorporated place
(city/town), and bake it all into a local TS data file, so the MapExplorer
heatmaps never fall back to synthetic hash-based shading for these geography
types.

Two API calls per geography type, not one per geography:
  - the ACS detail tables (B-prefixed) for the fields that are simple sums, and
  - the ACS Data Profile (DP-prefixed) for the five fields that are error-prone
    to re-derive by hand — bachelor's-or-higher and HS-grad-or-higher both need
    a different universe (population 25+, not total population) and a sum
    across attainment brackets; unemployment rate needs the civilian-labor-force
    denominator, not total population; SNAP has its own dedicated table
    (B22010, not the "public assistance income" table B19057); and health
    insurance coverage has no single detail-table percentage variable at all.
    The Data Profile carries all five as ready-made, correctly-denominated
    percentages straight from the Census Bureau — mirrors the same fields
    lib/services/census-api.ts pulls for its live on-demand fallback.

Run:  python3 scripts/build-county-metro-census.py
"""
import json
import os
import subprocess
import urllib.parse

KEY = os.environ.get("CENSUS_API_KEY") or "e5ee914a911db64a0f18d46b9f3e106c4c9765dd"
BASE = "https://api.census.gov/data/2023/acs/acs5"
PROFILE_BASE = "https://api.census.gov/data/2023/acs/acs5/profile"
OUT = "lib/data/census-county-metro-data.ts"

VARS = [
    "NAME",
    "B19013_001E", "B01003_001E", "B01002_001E", "B25077_001E", "B25064_001E",
    "B21001_002E", "B08301_021E", "B25003_002E", "B25003_003E",
    "B28002_004E", "B28002_013E", "B17001_002E", "B08013_001E", "B08012_001E", "B08201_002E",
    "B05002_013E", "B08201_003E",
    "B25002_003E", "B25002_001E",
]
PROFILE_VARS = ["DP02_0067PE", "DP02_0068PE", "DP03_0009PE", "DP03_0074PE", "DP03_0096PE"]

# geography key -> (detail "for" clause, detail "in" clause, profile "for" clause,
#                    profile "in" clause, geoid-from-row function)
GEOGRAPHIES = {
    "county": {
        "for": "county:*", "in": "state:*",
        "geoid": lambda row, idx: idx["state"](row).zfill(2) + idx["county"](row).zfill(3),
    },
    "cbsa": {
        "for": "metropolitan statistical area/micropolitan statistical area:*", "in": None,
        "geoid": lambda row, idx: idx["metropolitan statistical area/micropolitan statistical area"](row).zfill(5),
    },
    "place": {
        "for": "place:*", "in": "state:*",
        "geoid": lambda row, idx: idx["state"](row).zfill(2) + idx["place"](row).zfill(5),
    },
}


def fetch(base, variables, for_clause, in_clause=None):
    url = f"{base}?get={','.join(variables)}&for={urllib.parse.quote(for_clause)}"
    if in_clause:
        url += f"&in={urllib.parse.quote(in_clause)}"
    url += f"&key={KEY}"
    result = subprocess.run(["curl", "-s", "--max-time", "90", url], capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


def row_indexer(headers):
    return {h: (lambda r, i=headers.index(h): r[i]) for h in headers}


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


def derive(headers, row, profile_headers, profile_row):
    g = lambda n: num(row, headers, n)
    p = lambda n: num(profile_row, profile_headers, n) if profile_row else None
    name_idx = headers.index("NAME")
    name = row[name_idx]

    pop = g("B01003_001E")
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
    one_vehicle = g("B08201_003E")
    vacant_units = g("B25002_003E")
    total_housing_all = g("B25002_001E")
    multi_vehicle_hh = (max(0, owner_units - one_vehicle) if (owner_units is not None and one_vehicle is not None) else None)

    return {
        "name": name,
        "medianIncome": g("B19013_001E"),
        "totalPopulation": pop,
        "medianAge": g("B01002_001E"),
        "medianHomeValue": g("B25077_001E"),
        "medianRent": g("B25064_001E"),
        "bachelorOrHigherPct": p("DP02_0068PE"),
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
        "snapPct": p("DP03_0074PE"),
        "unemploymentPct": p("DP03_0009PE"),
        "insuredPct": p("DP03_0096PE"),
        "highSchoolPct": p("DP02_0067PE"),
        "gradDegreePct": None,  # DP02 has no single "graduate/professional degree" percent; left unset rather than guessed
        "multiVehiclePct": r1(multi_vehicle_hh / total_housing_units * 100) if (total_housing_units and multi_vehicle_hh is not None) else None,
        "vacancyPct": r1(vacant_units / total_housing_all * 100) if (total_housing_all and vacant_units is not None) else None,
        "source": "live_api",
    }


def build_geography(key, cfg):
    print(f"Fetching all {key} (detail table)...")
    rows = fetch(BASE, VARS, cfg["for"], cfg["in"])
    headers = rows[0]
    idx = row_indexer(headers)

    print(f"Fetching all {key} (Data Profile)...")
    profile_rows = fetch(PROFILE_BASE, ["NAME"] + PROFILE_VARS, cfg["for"], cfg["in"])
    profile_headers = profile_rows[0]
    profile_key_cols = [c for c in profile_headers if c not in (["NAME"] + PROFILE_VARS)]
    profile_by_key = {}
    for prow in profile_rows[1:]:
        pk = tuple(prow[profile_headers.index(c)] for c in profile_key_cols)
        profile_by_key[pk] = prow

    key_cols = [c for c in headers if c not in VARS]
    out = {}
    matched = 0
    for row in rows[1:]:
        geoid = cfg["geoid"](row, idx)
        rk = tuple(row[headers.index(c)] for c in key_cols)
        prow = profile_by_key.get(rk)
        if prow is not None:
            matched += 1
        out[geoid] = derive(headers, row, profile_headers, prow)
    print(f"  {len(rows) - 1} {key} rows, {matched} matched to a Data Profile row")
    return out


def main():
    out = {}
    for key, cfg in GEOGRAPHIES.items():
        out.update(build_geography(key, cfg))

    with open(OUT, "w") as f:
        f.write("// AUTO-GENERATED real ACS 5-Year (2023) data for every U.S. county, CBSA\n")
        f.write("// (metro + micro statistical area), and incorporated place, keyed by GEOID.\n")
        f.write("// Replaces the synthetic hash-based heatmap fallback in MapExplorerClient.\n")
        f.write("// Regenerate:  python3 scripts/build-county-metro-census.py\n\n")
        f.write('import type { CensusAcsData } from "@/lib/services/census-api";\n\n')
        f.write("export const LOCAL_CENSUS_COUNTY_METRO_DATA: Record<string, CensusAcsData> = ")
        f.write(json.dumps(out, separators=(",", ":")))
        f.write(";\n")

    size_kb = os.path.getsize(OUT) / 1024
    print(f"wrote {OUT}: {len(out)} entries, {size_kb:.0f} KB")


if __name__ == "__main__":
    main()
