#!/usr/bin/env python3
"""Build lib/data/waterways-simplified.json with coordinate paths for the major
U.S. aqueducts and commercial waterways/canals.
"""
import os
import json

OUT = "lib/data/waterways-simplified.json"

# Geographic paths as lists of [longitude, latitude] segments
WATERWAYS = {
    # ─── AQUEDUCTS (Cyan Theme) ───────────────────────────────────────────────
    "AQUEDUCT_CALIFORNIA": {
        "segments": [[
            [-121.60, 37.80],  # Delta (Clifton Court Forebay)
            [-121.20, 37.30],  # Near Patterson
            [-120.90, 36.90],  # O'Neill Forebay
            [-120.50, 36.50],  # Near Mendota
            [-120.10, 36.20],  # Near Huron
            [-119.90, 36.00],  # Near Kettleman City
            [-119.60, 35.60],  # Near Lost Hills
            [-119.30, 35.30],  # Near Bakersfield (West)
            [-118.80, 34.90],  # A.D. Edmonston Pumping Plant (Tehachapi)
            # East Branch split:
            [-118.40, 34.70],  # Antelope Valley
            [-118.10, 34.60],  # Palmdale
            [-117.70, 34.50],  # Pearblossom
            [-117.30, 34.40],  # Hesperia / Silverwood Lake
            [-117.20, 33.90],  # Lake Perris (Terminus)
        ], [
            [-118.80, 34.90],  # Edmonston Plant split
            # West Branch split:
            [-118.80, 34.60],  # Pyramid Lake
            [-118.60, 34.50],  # Castaic Lake (Terminus)
        ]],
        "miles": 444
    },
    
    "AQUEDUCT_LA": {
        "segments": [[
            [-119.10, 38.00],  # Mono Basin (Lee Vining)
            [-118.80, 37.60],  # Crowley Lake
            [-118.40, 37.35],  # Bishop
            [-118.30, 36.90],  # Owens River Intake
            [-118.10, 36.60],  # Lone Pine
            [-118.00, 36.30],  # Owens Lake
            [-117.95, 36.08],  # Haiwee Reservoir
            [-117.90, 35.70],  # Little Lake
            [-118.00, 35.30],  # Jawbone Canyon
            [-118.10, 35.00],  # Mojave
            [-118.40, 34.70],  # Fairmont Reservoir
            [-118.50, 34.30],  # Los Angeles Cascades (Sylmar)
        ]],
        "miles": 338
    },

    "AQUEDUCT_CAP": {
        "segments": [[
            [-114.30, 34.30],  # Mark Wilmer Pumping Plant (Lake Havasu)
            [-113.80, 33.90],  # Bouse Hills
            [-113.30, 33.75],  # Harquahala Valley
            [-112.70, 33.70],  # Hassayampa Pumping Plant
            [-112.10, 33.70],  # North Phoenix (Cave Creek)
            [-111.85, 33.60],  # Scottsdale
            [-111.80, 33.50],  # Mesa / Salt River Siphon
            [-111.55, 33.20],  # Pinal County / Queen Creek
            [-111.30, 33.00],  # Florence
            [-111.10, 32.50],  # Red Rock
            [-111.00, 32.20],  # Tucson (Terminus)
        ]],
        "miles": 336
    },

    "AQUEDUCT_CATSKILL": {
        "segments": [[
            [-74.20, 41.90],  # Ashokan Reservoir
            [-74.15, 41.70],  # New Paltz
            [-74.00, 41.50],  # Chelsea
            [-73.95, 41.40],  # Hudson River Crossing (Cold Spring)
            [-73.80, 41.15],  # Kensico Reservoir
            [-73.85, 40.90],  # Hillview Reservoir
            [-73.98, 40.75],  # New York City
        ]],
        "miles": 92
    },

    "AQUEDUCT_DELAWARE": {
        "segments": [[
            [-74.45, 41.80],  # Rondout Reservoir
            [-74.10, 41.55],  # Fishkill
            [-73.70, 41.35],  # West Branch Reservoir (Putnam)
            [-73.72, 41.10],  # Kensico Reservoir
            [-73.85, 40.90],  # Hillview Reservoir
            [-73.98, 40.75],  # New York City
        ]],
        "miles": 85
    },

    # ─── WATERWAYS / CANALS (Deep Blue Theme) ──────────────────────────────────
    "WATERWAY_ICW_ATLANTIC": {
        "segments": [[
            [-70.50, 41.80],  # Cape Cod Canal
            [-71.40, 41.50],  # Narragansett Bay
            [-72.30, 41.20],  # Long Island Sound (East)
            [-73.70, 40.80],  # Long Island Sound (West / NYC)
            [-74.05, 40.55],  # Lower New York Bay
            [-74.05, 39.80],  # Barnegat Bay
            [-74.90, 39.00],  # Cape May
            [-76.00, 38.00],  # Chesapeake Bay
            [-76.30, 36.85],  # Norfolk / Elizabeth River
            [-76.20, 35.80],  # Albemarle Sound
            [-76.40, 35.30],  # Pamlico Sound
            [-77.95, 34.20],  # Wilmington NC
            [-79.00, 33.50],  # Myrtle Beach
            [-79.95, 32.78],  # Charleston SC
            [-81.10, 32.08],  # Savannah GA
            [-81.40, 30.70],  # Cumberland Sound
            [-81.40, 30.30],  # Jacksonville FL
            [-80.60, 28.40],  # Merritt Island / Indian River
            [-80.15, 26.10],  # Fort Lauderdale
            [-80.18, 25.76],  # Miami
            [-80.40, 25.10],  # Florida Bay
            [-81.80, 24.55],  # Key West
        ]],
        "miles": 1950
    },

    "WATERWAY_ICW_GULF": {
        "segments": [[
            [-84.60, 29.85],  # Carrabelle FL
            [-85.30, 29.70],  # Apalachicola
            [-85.65, 30.15],  # Panama City
            [-87.20, 30.40],  # Pensacola
            [-88.00, 30.70],  # Mobile AL
            [-89.10, 30.30],  # Mississippi Sound / Gulfport
            [-90.00, 29.95],  # New Orleans (Harvey Lock)
            [-91.10, 29.70],  # Morgan City
            [-93.30, 30.00],  # Lake Charles
            [-94.35, 29.75],  # Port Arthur / Beaumont
            [-94.80, 29.30],  # Galveston TX
            [-96.20, 28.70],  # Matagorda Bay
            [-97.40, 27.80],  # Corpus Christi
            [-97.30, 26.50],  # Laguna Madre
            [-97.40, 26.00],  # Brownsville (Terminus)
        ]],
        "miles": 1050
    },

    "WATERWAY_SEAWAY": {
        "segments": [[
            [-76.40, 44.10],  # Lake Ontario (Kingston)
            [-75.90, 44.30],  # Thousand Islands (Alexandria Bay)
            [-75.70, 44.45],  # Brockville
            [-75.20, 44.80],  # Iroquois Lock
            [-74.90, 45.00],  # Massena / Dwight D. Eisenhower Lock
            [-74.15, 45.30],  # Beauharnois Locks
            [-73.55, 45.50],  # Montreal / St. Lambert Lock
        ]],
        "miles": 370
    },

    "WATERWAY_MISSISSIPPI": {
        "segments": [[
            [-93.27, 44.98],  # Minneapolis (St. Anthony Falls)
            [-93.00, 44.90],  # St. Paul
            [-92.10, 44.25],  # Winona
            [-91.25, 43.80],  # La Crosse
            [-90.66, 42.50],  # Dubuque
            [-90.58, 41.52],  # Quad Cities (Davenport)
            [-91.40, 40.40],  # Keokuk
            [-90.20, 38.63],  # St. Louis
            [-89.50, 37.75],  # Chester
            [-89.18, 37.00],  # Cairo (Mouth of Ohio River)
            [-90.05, 35.15],  # Memphis
            [-91.10, 33.50],  # Mouth of Arkansas River
            [-90.88, 32.35],  # Vicksburg
            [-91.40, 31.55],  # Natchez
            [-91.15, 30.45],  # Baton Rouge
            [-90.07, 29.95],  # New Orleans
            [-89.40, 29.30],  # Venice LA
            [-89.15, 29.15],  # Southwest Pass (Gulf Entrance)
        ]],
        "miles": 2320
    },

    "WATERWAY_OHIO": {
        "segments": [[
            [-79.996, 40.441],  # Pittsburgh (Confluence)
            [-80.60, 40.00],  # Wheeling
            [-82.20, 39.20],  # Parkersburg
            [-82.45, 38.45],  # Huntington
            [-84.51, 39.10],  # Cincinnati
            [-85.76, 38.25],  # Louisville (Falls of the Ohio)
            [-87.57, 37.97],  # Evansville
            [-88.55, 37.15],  # Paducah
            [-89.18, 37.00],  # Cairo (Mississippi Confluence)
        ]],
        "miles": 981
    },

    "WATERWAY_ILLINOIS": {
        "segments": [[
            [-87.63, 41.88],  # Chicago River
            [-88.08, 41.52],  # Joliet (Sanitary & Ship Canal)
            [-88.85, 41.32],  # LaSalle / Illinois River
            [-89.59, 40.69],  # Peoria
            [-90.60, 40.00],  # Beardstown
            [-90.43, 38.97],  # Grafton (Mississippi Confluence)
        ]],
        "miles": 336
    }
}


def main():
    print("Formatting waterways data...", flush=True)
    # The output is formatted with coordinates rounded for efficiency, 
    # mirroring the structure of the interstate/rail simplifications
    out = {}
    for key, data in WATERWAYS.items():
        # Keep exact waypoint lists and published mileage
        out[key] = {
            "segments": data["segments"],
            "miles": data["miles"]
        }
        pts = sum(len(s) for s in data["segments"])
        print(f"  {key}: {len(data['segments'])} segments, {pts} pts, {data['miles']} mi", flush=True)
        
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    print(f"Wrote {OUT} — {os.path.getsize(OUT)/1024:.1f} KB", flush=True)

if __name__ == "__main__":
    main()
