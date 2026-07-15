#!/usr/bin/env python3
import json
import os
import sys
import importlib.util

def main():
    # Load interstate geometry helpers from build-interstates-geojson.py
    script_dir = os.path.dirname(os.path.abspath(__file__))
    _spec = importlib.util.spec_from_file_location(
        "bi", os.path.join(script_dir, "build-interstates-geojson.py")
    )
    bi = importlib.util.module_from_spec(_spec)
    _spec.loader.exec_module(bi)

    geojson_path = os.path.join(script_dir, "../ASSETS/GeoJSON/NTAD_Amtrak_Routes_5503594535609073988.geojson")
    rail_json_path = os.path.join(script_dir, "../lib/data/rail-simplified.json")

    print(f"Loading Amtrak GeoJSON from: {geojson_path}")
    with open(geojson_path, "r") as f:
        amtrak_data = json.load(f)

    # Mapping of NTAD Route Name to our application route ID
    name_map = {
        "Coast Starlight": "COAST-STARLIGHT",
        "California Zephyr": "CALIFORNIA-ZEPHYR",
        "Empire Builder": "EMPIRE-BUILDER",
        "Southwest Chief": "SOUTHWEST-CHIEF",
        "Sunset Limited": "SUNSET-LIMITED",
        "Texas Eagle": "TEXAS-EAGLE",
        "Crescent": "CRESCENT",
        "Cardinal": "CARDINAL",
        "City Of New Orleans": "CITY-OF-NEW-ORLEANS",
        "Northeast Regional": "NORTHEAST-CORRIDOR",
        "Acela": "NORTHEAST-CORRIDOR"
    }

    # Group segments (list of LngLat coordinates) by target route ID
    route_segments = {}
    for feat in amtrak_data["features"]:
        name = feat.get("properties", {}).get("name")
        route_id = name_map.get(name)
        if not route_id:
            continue
        
        g = feat.get("geometry", {})
        gtype = g.get("type")
        
        segments = []
        if gtype == "LineString":
            segments = [g["coordinates"]]
        elif gtype == "MultiLineString":
            segments = g["coordinates"]
            
        route_segments.setdefault(route_id, []).extend(segments)

    # Load existing rail data
    print(f"Loading existing rail data from: {rail_json_path}")
    with open(rail_json_path, "r") as f:
        rail_data = json.load(f)

    # Process each route, simplifying and adding to rail_data
    TOL = 0.008 # Douglas-Peucker tolerance for high-fidelity featured routes
    for route_id, segs in route_segments.items():
        print(f"Processing {route_id} ({len(segs)} raw segments)...")
        # Stitch segments together into continuous chains
        chains = bi.stitch(segs)
        # Drop duplicate/parallel track chains (e.g. double tracking)
        chains = bi.drop_parallel(chains, overlap=0.85)
        # Simplify each chain
        simplified = []
        for c in chains:
            s = bi.dp(c, TOL)
            simplified.append([[round(x, 4), round(y, 4)] for x, y in s])
        
        # Calculate miles
        geom_mi = round(sum(bi.seg_len_mi(c) for c in simplified))
        
        # Save to rail_data
        rail_data[route_id] = {
            "segments": simplified,
            "miles": geom_mi,
            "tracks": 1.0 # Default tracks count representation for Amtrak routes
        }
        total_pts = sum(len(c) for c in simplified)
        print(f"  -> {route_id}: {len(simplified)} chains, {total_pts} points, {geom_mi} miles")

    # Write updated rail data back
    print(f"Writing updated rail data back to: {rail_json_path}")
    with open(rail_json_path, "w") as f:
        json.dump(rail_data, f, separators=(",", ":"))
    
    print("Done! rail-simplified.json successfully updated with Amtrak high-fidelity routes.")

if __name__ == "__main__":
    main()
