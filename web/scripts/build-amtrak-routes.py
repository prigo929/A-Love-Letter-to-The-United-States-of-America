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
    main_rail_path = os.path.join(script_dir, "../ASSETS/GeoJSON/NTAD_North_American_Rail_Network_Lines_-5214657740406327753.geojson")
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
        "Acela": "NORTHEAST-CORRIDOR",
        "Silver Meteor": "SILVER-METEOR",
        "Silver Star": "SILVER-STAR",
        "Auto Train": "AUTO-TRAIN",
        "Palmetto": "PALMETTO",
        "Carolinian": "CAROLINIAN",
        "Adirondack": "ADIRONDACK",
        "Maple Leaf": "MAPLE-LEAF",
        "Pacific Surfliner": "PACIFIC-SURFLINER",
        "Gold Runner": "SAN-JOAQUINS",
        "Amtrak Cascades": "AMTRAK-CASCADES",
        "Capitol Corridor": "CAPITOL-CORRIDOR",
        "Downeaster": "DOWNEASTER",
        "Hiawatha Service": "HIAWATHA-SERVICE",
        "Keystone Service": "KEYSTONE-SERVICE",
        "Wolverine": "WOLVERINE",
        "Piedmont": "PIEDMONT",
        "Lincoln Service": "LINCOLN-SERVICE",
        "Missouri River Runner": "MISSOURI-RIVER-RUNNER",
        "Borealis": "BOREALIS",
        "Amtrak Hartford Line": "HARTFORD-LINE",
        "Ethan Allen Express": "ETHAN-ALLEN-EXPRESS",
        "Vermonter": "VERMONTER"
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

    # Stream the main rail network file to get commuter & private passenger rails
    print(f"Streaming commuter & private rails from: {main_rail_path}")
    commuter_segments = {
        "BRIGHTLINE": [],
        "CALTRAIN": [],
        "METRA": [],
        "NJ-TRANSIT": []
    }
    
    import ijson
    with open(main_rail_path, "r") as f:
        n = 0
        for feat in ijson.items(f, "features.item"):
            p = feat.get("properties", {})
            o1 = p.get("RROWNER1")
            o2 = p.get("RROWNER2")
            t1 = p.get("TRKRGHTS1")
            t2 = p.get("TRKRGHTS2")
            
            commuter_id = None
            if "BLF" in [o1, o2, t1, t2]:
                commuter_id = "BRIGHTLINE"
            elif "JPBX" in [o1, o2, t1, t2]:
                commuter_id = "CALTRAIN"
            elif "NIRC" in [o1, o2, t1, t2]:
                commuter_id = "METRA"
            elif "NJT" in [o1, o2, t1, t2]:
                commuter_id = "NJ-TRANSIT"
                
            if commuter_id:
                g = feat.get("geometry", {})
                gtype = g.get("type")
                if gtype == "LineString":
                    coords = [[float(x), float(y)] for x, y in g["coordinates"]]
                    commuter_segments[commuter_id].append(coords)
                elif gtype == "MultiLineString":
                    coords = [[[float(x), float(y)] for x, y in part] for part in g["coordinates"]]
                    commuter_segments[commuter_id].extend(coords)
            n += 1
            if n % 50000 == 0:
                print(f"  ...scanned {n} main rail features", flush=True)

    # Merge commuter segments into route_segments
    for cid, segs in commuter_segments.items():
        if segs:
            route_segments[cid] = segs

    # Load existing rail data
    print(f"Loading existing rail data from: {rail_json_path}")
    with open(rail_json_path, "r") as f:
        rail_data = json.load(f)

    # Process each route, simplifying and adding to rail_data
    TOL = 0.008 # Douglas-Peucker tolerance for high-fidelity featured routes
    for route_id, segs in route_segments.items():
        print(f"Processing {route_id} ({len(segs)} raw segments)...", flush=True)
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
            "tracks": 1.0 # Default tracks count representation
        }
        total_pts = sum(len(c) for c in simplified)
        print(f"  -> {route_id}: {len(simplified)} chains, {total_pts} points, {geom_mi} miles", flush=True)

    # Write updated rail data back
    print(f"Writing updated rail data back to: {rail_json_path}")
    with open(rail_json_path, "w") as f:
        json.dump(rail_data, f, separators=(",", ":"))
    
    print("Done! rail-simplified.json successfully updated with Amtrak high-fidelity and regional/commuter routes.")

if __name__ == "__main__":
    main()
