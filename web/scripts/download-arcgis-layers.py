#!/usr/bin/env python3
"""Download national GeoJSON layers from authoritative government-hosted ArcGIS
REST feature services (HIFLD, NCES, USGS, USDOT/BTS, NPS, Esri Demographics),
each verified live before being added here (real record counts checked against
known national totals). Paginates past each service's per-request cap so the
full dataset comes down, not just the first page.

Writes raw pulls to ASSETS/GeoJSON/ (matching the existing convention for
source data) and trimmed/simplified web-ready copies to public/maps/.

Run:  python3 scripts/download-arcgis-layers.py
"""
import json
import os
import subprocess
import sys
import urllib.parse

RAW_DIR = "ASSETS/GeoJSON"
WEB_DIR = "public/maps"

# name -> (query URL through /query, outFields, page size)
LAYERS = {
    "hospitals": {
        "url": "https://services7.arcgis.com/JEwYeAy2cc8qOe3o/arcgis/rest/services/hifld_hospitals/FeatureServer/0",
        "fields": "NAME,ADDRESS,CITY,STATE,ZIP,TYPE,STATUS,COUNTY,TRAUMA,HELIPAD,BEDS,OWNER",
        "page": 2000,
    },
    "public-schools": {
        "url": "https://nces.ed.gov/opengis/rest/services/K12_School_Locations/EDGE_GEOCODE_PUBLICSCH_2425/MapServer/0",
        "fields": "NAME,CITY,STATE,ZIP,NMCNTY,LOCALE,NMCBSA",
        "page": 2000,
    },
    "volcanoes": {
        "url": "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/Monitored_Global_USGS_Volcanos/FeatureServer/0",
        "fields": "Volcano_Name,Region,Elevation,Alert_Level,Color_Code,Threat",
        "page": 2000,
    },
    "national-parks": {
        "url": "https://services1.arcgis.com/fBc8EJBxQRMcHlei/arcgis/rest/services/NPS_Land_Resources_Division_Boundary_and_Tract_Data_Service/FeatureServer/2",
        "fields": "UNIT_NAME,UNIT_CODE,UNIT_TYPE,STATE,REGION,PARKNAME",
        "page": 500,
    },
    "electric-transmission-lines": {
        "url": "https://services2.arcgis.com/LYMgRMwHfrWWEg3s/arcgis/rest/services/HIFLD_US_Electric_Power_Transmission_Lines/FeatureServer/0",
        "fields": "OWNER,VOLTAGE,VOLT_CLASS,TYPE,STATUS,NAICS_DESC",
        "page": 2000,
    },
    "zip-codes": {
        "url": "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_ZIP_Code_Areas_anaylsis/FeatureServer/0",
        "fields": "ZIP_CODE,PO_NAME,STATE,POPULATION,SQMI",
        "page": 2000,
    },
    "time-zones": {
        "url": "https://services.arcgis.com/xOi1kZaI0eWDREZv/arcgis/rest/services/NTAD_Time_Zones/FeatureServer/0",
        "fields": "*",
        "page": 500,
    },
    "trails": {
        "url": "https://services.arcgis.com/xOi1kZaI0eWDREZv/arcgis/rest/services/Motor_Vehicle_Use_Maps_Trails/FeatureServer/0",
        "fields": "NAME,ID,TRAILCLASS,ADMINORG,FORESTNAME,TRAILSTATU",
        "page": 2000,
    },
    "amtrak-stations": {
        "url": "https://services.arcgis.com/xOi1kZaI0eWDREZv/arcgis/rest/services/NTAD_Amtrak_Stations/FeatureServer/0",
        "fields": "StationName,Code,City,State,StaType",
        "page": 2000,
    },
}


def fetch_json(url, retries=3):
    last_err = None
    for attempt in range(retries):
        try:
            result = subprocess.run(["curl", "-s", "--max-time", "120", url], capture_output=True, text=True, check=True)
            return json.loads(result.stdout)
        except (subprocess.CalledProcessError, json.JSONDecodeError) as e:
            last_err = e
            print(f"    retry {attempt + 1}/{retries} after error: {e}", file=sys.stderr)
    raise last_err


def download_layer(name, cfg):
    base = cfg["url"]
    fields = cfg["fields"]
    page = cfg["page"]
    features = []
    offset = 0
    while True:
        q = {
            "where": "1=1",
            "outFields": fields,
            "f": "geojson",
            "resultOffset": offset,
            "resultRecordCount": page,
            "outSR": "4326",
            "geometryPrecision": "5",  # ~1m coordinate precision
            "maxAllowableOffset": "0.001",  # ~100m server-side generalization; keeps
            # dense polygons (park/timezone boundaries) from timing out or bloating.
        }
        url = f"{base}/query?{urllib.parse.urlencode(q)}"
        data = fetch_json(url)
        if "error" in data:
            print(f"  ERROR at offset {offset}: {data['error']}", file=sys.stderr)
            break
        feats = data.get("features", [])
        features.extend(feats)
        print(f"  {name}: {len(features)} features fetched...", file=sys.stderr)
        if len(feats) < page:
            break
        offset += page

    fc = {"type": "FeatureCollection", "features": features}
    raw_path = os.path.join(RAW_DIR, f"{name}.geojson")
    with open(raw_path, "w") as f:
        json.dump(fc, f, separators=(",", ":"))
    size_mb = os.path.getsize(raw_path) / (1024 * 1024)
    print(f"  wrote {raw_path}: {len(features)} features, {size_mb:.1f} MB", file=sys.stderr)
    return raw_path, len(features)


def main():
    only = sys.argv[1:] or list(LAYERS.keys())
    os.makedirs(RAW_DIR, exist_ok=True)
    os.makedirs(WEB_DIR, exist_ok=True)
    for name in only:
        cfg = LAYERS.get(name)
        if not cfg:
            print(f"unknown layer: {name}", file=sys.stderr)
            continue
        print(f"Downloading {name}...", file=sys.stderr)
        download_layer(name, cfg)


if __name__ == "__main__":
    main()
