#!/usr/bin/env python3
"""Untangle scrambled route segments in interstates-simplified.json.

In dense metros (New York especially) the geometry pipeline stitched some route
pieces together in the wrong order, so the polyline crosses back over itself and
renders as tangled wrong highways (e.g. I-87's Northway is clean but its NYC end
zig-zags; I-278 doubles back). This pass runs 2-opt on each segment: it starts
from the EXISTING order and only ever applies reversals that uncross the line and
shorten it. A clean highway has no crossings, so it is left byte-for-byte alone;
only the tangled stretches are repaired. Segment endpoints are held fixed.
"""
import json, math

SRC = "lib/data/interstates-simplified.json"

# Ignore micro-reversals from simplification noise; only undo real crossings.
EPS_DEG = 0.012  # ≈ 0.8 mi of saved length required to accept a swap
MAX_PASSES = 60


def d2(a, b):
    mlat = math.radians((a[1] + b[1]) / 2)
    dx = (a[0] - b[0]) * math.cos(mlat)
    dy = a[1] - b[1]
    return dx * dx + dy * dy


def dist(a, b):
    return math.sqrt(d2(a, b))


def two_opt(pts):
    """Uncross an open polyline, keeping the two endpoints fixed."""
    n = len(pts)
    if n < 4:
        return pts, False
    changed = False
    for _ in range(MAX_PASSES):
        improved = False
        for i in range(n - 2):
            a, b = pts[i], pts[i + 1]
            d_ab = dist(a, b)
            for j in range(i + 2, n - 1):  # j+1 <= n-1 keeps the last point fixed
                c, e = pts[j], pts[j + 1]
                before = d_ab + dist(c, e)
                after = dist(a, c) + dist(b, e)
                if after < before - EPS_DEG:
                    pts[i + 1 : j + 1] = pts[i + 1 : j + 1][::-1]
                    improved = True
                    changed = True
                    b = pts[i + 1]
                    d_ab = dist(a, b)
        if not improved:
            break
    return pts, changed


def main():
    data = json.load(open(SRC, encoding="utf-8"))
    n_seg = 0
    routes = []
    for key, route in data.items():
        touched = False
        for seg in route["segments"]:
            _, changed = two_opt(seg)
            if changed:
                n_seg += 1
                touched = True
        if touched:
            routes.append(key)
    json.dump(data, open(SRC, "w", encoding="utf-8"), separators=(",", ":"))
    print("untangled %d segments across %d routes" % (n_seg, len(routes)))
    print("routes touched:", ", ".join(sorted(routes)))


if __name__ == "__main__":
    main()
