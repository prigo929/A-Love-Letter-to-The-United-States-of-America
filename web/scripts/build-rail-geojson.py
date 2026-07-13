#!/usr/bin/env python3
"""Build lib/data/rail-simplified.json from the NTAD North American Rail Network.

Mirrors the interstate pipeline: stream the (huge) source once, group segments,
stitch them into continuous chains, drop duplicate parallel tracks, and simplify.

Layers produced (keyed):
  · Class I freight owners  — BNSF, UP, CSXT, NS, CPKC, CN main lines (NET='M'),
    each its own coloured group for the background network.
  · AMTK                    — the Amtrak passenger network (PASSNGR='A').
Each group carries total route miles and an average track count (for a density
heat mode). US segments only, since the map projection is geoAlbersUsa.
"""
import importlib.util, json, os, math
import ijson

# Reuse the interstate geometry helpers (hyphenated filename → load by path).
_spec = importlib.util.spec_from_file_location(
    "bi", os.path.join(os.path.dirname(__file__), "build-interstates-geojson.py")
)
bi = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bi)

SRC = "ASSETS/GeoJSON/NTAD_North_American_Rail_Network_Lines_-5214657740406327753.geojson"
OUT = "lib/data/rail-simplified.json"

CLASS_I = {"BNSF", "UP", "CSXT", "NS", "CPKC", "CN"}

# Tuning — rail is far denser than the Interstates, so simplify hard.
TOL = 0.03        # Douglas-Peucker tolerance (deg, ≈2.7 mi)
MIN_MI = 4.0      # drop chains shorter than this after stitching


def main():
    groups: dict[str, list] = {}
    trk: dict[str, list] = {}  # key -> [sum(miles*tracks), sum(miles)]

    def add(key, coords, miles, tracks):
        groups.setdefault(key, []).append(coords)
        acc = trk.setdefault(key, [0.0, 0.0])
        acc[0] += miles * tracks
        acc[1] += miles

    n = 0
    with open(SRC) as f:
        for feat in ijson.items(f, "features.item"):
            p = feat.get("properties", {})
            g = feat.get("geometry", {})
            if not g or g.get("type") != "LineString":
                continue
            if p.get("COUNTRY") != "US":
                continue
            coords = [[round(float(x), 4), round(float(y), 4)] for x, y in g["coordinates"]]
            if len(coords) < 2:
                continue
            miles = float(p.get("MILES") or 0)
            tracks = int(p.get("TRACKS") or 1)
            owner = p.get("RROWNER1")
            if p.get("PASSNGR") == "A":
                add("AMTK", coords, miles, tracks)
            if p.get("NET") == "M" and owner in CLASS_I:
                add(owner, coords, miles, tracks)
            n += 1
            if n % 50000 == 0:
                print(f"  ...{n} features", flush=True)
    print(f"scanned {n} US features; groups: {[(k, len(v)) for k, v in groups.items()]}", flush=True)

    out = {}
    for key, segs in groups.items():
        chains = bi.stitch(segs)
        chains = bi.drop_parallel(chains, overlap=0.85)
        simplified = []
        for c in chains:
            if bi.seg_len_mi(c) < MIN_MI:
                continue
            s = bi.dp(c, TOL)
            simplified.append([[round(x, 4), round(y, 4)] for x, y in s])
        if not simplified:
            continue
        miles = round(sum(bi.seg_len_mi(c) for c in simplified))
        avg_tracks = round(trk[key][0] / trk[key][1], 2) if trk[key][1] else 1
        out[key] = {"segments": simplified, "miles": miles, "tracks": avg_tracks}
        pts = sum(len(s) for s in simplified)
        print(f"  {key}: {len(simplified)} chains, {pts} pts, {miles} mi, ~{avg_tracks} tracks", flush=True)

    json.dump(out, open(OUT, "w"), separators=(",", ":"))
    size = os.path.getsize(OUT)
    print(f"wrote {OUT} — {size/1024:.0f} KB", flush=True)


if __name__ == "__main__":
    main()
