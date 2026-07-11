#!/usr/bin/env python3
"""Build lib/data/interstates-simplified.json from the raw NTAD NHS GeoJSON.

Streams the 544MB FHWA National Highway System export feature-by-feature
(never loading the whole file), keeps signed primary Interstates only
(SIGNT1 == 'I', 1-2 digit number, no connectors/ramps), then per route:

  1. stitches the thousands of short segments into continuous chains
     (quantized endpoint matching + small-gap bridging),
  2. drops the duplicate carriageway (interstates appear once per direction),
  3. simplifies with Douglas-Peucker,
  4. records total mileage (sum of MILES / 2 for the dual carriageway) and
     the mileage-weighted average AADT (annual average daily traffic).

Output format:
  { "I90": { "segments": [[[lng,lat],...], ...], "miles": 3021, "aadt": 31400 }, ... }

Run:  python3 scripts/build-interstates-geojson.py
"""

import json, math, os, sys
from collections import defaultdict

SRC = "ASSETS/GeoJSON/NTAD_National_Highway_System_-2908344783259962276.geojson"
OUT = "lib/data/interstates-simplified.json"

# Interstates that actually exist as signed primary routes (for key validation).
REAL = {2,4,5,8,10,11,12,14,15,16,17,19,20,22,24,25,26,27,29,30,35,37,39,40,41,43,44,45,49,
        55,57,59,64,65,66,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,
        90,91,93,94,95,96,97,99}

# ─── Stream features ──────────────────────────────────────────────────────────

def stream_features(path):
    dec = json.JSONDecoder()
    with open(path, "r") as f:
        buf = f.read(1 << 20)
        i = buf.index('"features":[') + len('"features":[')
        buf = buf[i:]
        while True:
            buf = buf.lstrip().lstrip(",").lstrip()
            if buf.startswith("]"):
                return
            try:
                obj, end = dec.raw_decode(buf)
            except json.JSONDecodeError:
                chunk = f.read(1 << 22)
                if not chunk:
                    return
                buf += chunk
                continue
            yield obj
            buf = buf[end:]

# ─── Geometry helpers ─────────────────────────────────────────────────────────

def thin(coords, step_deg=0.002):
    """Pre-thin absurdly dense (~5m) vertices to ~200m before storing."""
    out = [coords[0]]
    lx, ly = coords[0]
    for x, y in coords[1:-1]:
        if abs(x - lx) + abs(y - ly) >= step_deg:
            out.append([x, y])
            lx, ly = x, y
    out.append(coords[-1])
    return out

def dp(points, tol):
    """Iterative Douglas-Peucker."""
    if len(points) < 3:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        a, b = stack.pop()
        if b <= a + 1:
            continue
        ax, ay = points[a]; bx, by = points[b]
        dx, dy = bx - ax, by - ay
        norm = math.hypot(dx, dy) or 1e-12
        dmax, imax = -1.0, -1
        for i in range(a + 1, b):
            px, py = points[i]
            d = abs(dx * (ay - py) - dy * (ax - px)) / norm
            if d > dmax:
                dmax, imax = d, i
        if dmax > tol:
            keep[imax] = True
            stack.append((a, imax)); stack.append((imax, b))
    return [p for p, k in zip(points, keep) if k]

def seg_len_mi(seg):
    total = 0.0
    for i in range(len(seg) - 1):
        (x1, y1), (x2, y2) = seg[i], seg[i + 1]
        dx = (x2 - x1) * 69.0 * math.cos(math.radians((y1 + y2) / 2))
        dy = (y2 - y1) * 69.0
        total += math.hypot(dx, dy)
    return total

def stitch(segments, q=0.02, bridge=0.05):
    """Chain segments whose endpoints coincide (quantized), then bridge small gaps."""
    def key(pt):
        return (round(pt[0] / q), round(pt[1] / q))

    adj = defaultdict(list)
    for idx, seg in enumerate(segments):
        adj[key(seg[0])].append((idx, True))
        adj[key(seg[-1])].append((idx, False))

    used = [False] * len(segments)
    chains = []
    for start in range(len(segments)):
        if used[start]:
            continue
        used[start] = True
        chain = list(segments[start])
        # grow forward
        grown = True
        while grown:
            grown = False
            for idx, at_start in adj[key(chain[-1])]:
                if used[idx]:
                    continue
                seg = segments[idx]
                used[idx] = True
                chain += seg[1:] if at_start else seg[-2::-1]
                grown = True
                break
        # grow backward
        grown = True
        while grown:
            grown = False
            for idx, at_start in adj[key(chain[0])]:
                if used[idx]:
                    continue
                seg = segments[idx]
                used[idx] = True
                chain = (seg[:-1] if not at_start else seg[::-1][:-1]) + chain
                grown = True
                break
        chains.append(chain)

    # bridge chains whose ends are within `bridge` degrees (missing links)
    merged = True
    while merged and len(chains) > 1:
        merged = False
        chains.sort(key=len, reverse=True)
        for i in range(len(chains)):
            for j in range(i + 1, len(chains)):
                a, b = chains[i], chains[j]
                pairs = [
                    ("ee", a[-1], b[0], lambda: a + b),
                    ("er", a[-1], b[-1], lambda: a + b[::-1]),
                    ("se", a[0], b[0], lambda: b[::-1] + a),
                    ("sr", a[0], b[-1], lambda: b + a),
                ]
                done = False
                for _, p, qq, join in pairs:
                    if abs(p[0] - qq[0]) < bridge and abs(p[1] - qq[1]) < bridge:
                        chains[i] = join()
                        del chains[j]
                        merged = done = True
                        break
                if done:
                    break
            if merged:
                break
    return chains

def drop_parallel(chains, cell=0.03, overlap=0.7):
    """Remove the second carriageway: kill chains mostly within one cell of a longer chain."""
    chains = sorted(chains, key=seg_len_mi, reverse=True)
    kept, grid = [], set()
    for ch in chains:
        cells = {(round(x / cell), round(y / cell)) for x, y in ch}
        near = sum(1 for c in cells if c in grid or any(
            (c[0] + dx, c[1] + dy) in grid for dx in (-1, 0, 1) for dy in (-1, 0, 1)))
        if cells and near / len(cells) >= overlap:
            continue  # parallel duplicate of something already kept
        kept.append(ch)
        grid |= cells
    return kept

# ─── Network gap splicing ────────────────────────────────────────────────────
# Concurrencies are inconsistently signed in NTAD (the Indiana Toll Road is
# signed I-80 only, though I-90 runs on it). When a route breaks into pieces,
# we Dijkstra across the union of ALL interstate geometry between the gap ends
# and splice the found alignment in — the map then follows the real roadway.

import heapq

GQ = 0.02  # graph cell quantum (~2 km)

def build_graph(all_chains):
    node_pt, edges = {}, defaultdict(list)
    def cell(pt):
        c = (round(pt[0] / GQ), round(pt[1] / GQ))
        node_pt.setdefault(c, pt)
        return c
    for ch in all_chains:
        prev = cell(ch[0])
        for pt in ch[1:]:
            cur = cell(pt)
            if cur != prev:
                w = seg_len_mi([node_pt[prev], node_pt[cur]])
                edges[prev].append((cur, w))
                edges[cur].append((prev, w))
                prev = cur
    return node_pt, edges

def dijkstra(node_pt, edges, a, b, limit_mi):
    def cell(pt):
        return (round(pt[0] / GQ), round(pt[1] / GQ))
    src, dst = cell(a), cell(b)
    if src not in edges or dst not in edges:
        return None
    dist, prev = {src: 0.0}, {}
    pq = [(0.0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if u == dst:
            path, cur = [], dst
            while cur != src:
                path.append(node_pt[cur]); cur = prev[cur]
            path.append(node_pt[src])
            return path[::-1]
        if d > dist.get(u, 1e18) or d > limit_mi:
            continue
        for v, w in edges[u]:
            nd = d + w
            if nd < dist.get(v, 1e18):
                dist[v] = nd; prev[v] = u
                heapq.heappush(pq, (nd, v))
    return None

def splice_gaps(chains, node_pt, edges):
    """Merge a route's components by routing across the interstate network."""
    changed = True
    while changed and len(chains) > 1:
        changed = False
        best = None
        for i in range(len(chains)):
            for j in range(i + 1, len(chains)):
                for pi, pj, mode in (
                    (chains[i][-1], chains[j][0], "ef"),
                    (chains[i][-1], chains[j][-1], "er"),
                    (chains[i][0], chains[j][0], "sf"),
                    (chains[i][0], chains[j][-1], "sr"),
                ):
                    d = seg_len_mi([pi, pj])
                    if d < 420 and (best is None or d < best[0]):
                        best = (d, i, j, mode, pi, pj)
        if not best:
            break
        d, i, j, mode, pi, pj = best
        conn = dijkstra(node_pt, edges, pi, pj, limit_mi=max(60.0, d * 2.2))
        if conn is None or seg_len_mi(conn) > d * 2.2 + 25:
            if d <= 55:  # short urban data hole: bridge straight
                conn = [pi, pj]
            else:
                # mark unmergeable by removing from consideration via sentinel
                return chains
        a, b = chains[i], chains[j]
        if mode == "ef":   merged_chain = a + conn + b
        elif mode == "er": merged_chain = a + conn + b[::-1]
        elif mode == "sf": merged_chain = a[::-1] + conn + b
        else:              merged_chain = a[::-1] + conn + b[::-1]
        chains = [c for k, c in enumerate(chains) if k not in (i, j)] + [merged_chain]
        changed = True
    return chains

# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    routes = defaultdict(list)     # num -> [thinned coord lists]
    miles = defaultdict(float)     # num -> sum of MILES
    aadt_wsum = defaultdict(float) # num -> sum AADT*MILES
    n_feat = n_kept = 0

    for feat in stream_features(SRC):
        n_feat += 1
        if n_feat % 200000 == 0:
            print(f"  …scanned {n_feat:,} features, kept {n_kept:,}", file=sys.stderr)
        p = feat.get("properties") or {}
        if (p.get("CONNID") or " ").strip():
            continue  # airport/port connectors
        # A segment belongs to every interstate signed on it — concurrencies
        # (I-90 riding I-94, etc.) live in the SIGNT2/SIGNT3 slots.
        nums = []
        for slot in ("1", "2", "3"):
            if p.get(f"SIGNT{slot}") == "I":
                val = str(p.get(f"SIGNN{slot}", "")).strip()
                import re
                m = re.match(r"^(\d+)", val)
                if m:
                    try:
                        n = int(m.group(1))
                    except ValueError:
                        continue
                    if n in REAL:
                        nums.append(n)
        if not nums:
            continue
        g = feat.get("geometry") or {}
        coords_sets = []
        if g.get("type") == "LineString":
            coords_sets = [g["coordinates"]]
        elif g.get("type") == "MultiLineString":
            coords_sets = g["coordinates"]
        m = float(p.get("MILES") or 0)
        for num in nums:
            for cs in coords_sets:
                if len(cs) >= 2:
                    routes[num].append(thin([[round(x, 5), round(y, 5)] for x, y in cs]))
            miles[num] += m
            aadt_wsum[num] += float(p.get("AADT") or 0) * m
        n_kept += 1

    print(f"scanned {n_feat:,} features · kept {n_kept:,} interstate segments "
          f"across {len(routes)} routes", file=sys.stderr)

    FEATURED = {5, 10, 15, 20, 25, 35, 40, 55, 65, 70, 75, 80, 85, 90, 94, 95}

    # First pass: stitch every route, keep pre-simplification chains.
    stitched = {}
    for num in sorted(routes):
        chains = stitch(routes[num])
        chains = drop_parallel(chains, overlap=0.85)
        min_mi = 8 if num in FEATURED else 15
        chains = [c for c in chains if seg_len_mi(c) >= min_mi]
        if chains:
            stitched[num] = chains

    # Union graph over all interstate geometry, for gap splicing.
    node_pt, edges = build_graph([c for chs in stitched.values() for c in chs])

    out = {}
    for num, chains in sorted(stitched.items()):
        if len(chains) > 1:
            n_before = len(chains)
            chains = splice_gaps(chains, node_pt, edges)
            if len(chains) < n_before:
                print(f"  I-{num}: spliced {n_before} → {len(chains)} components", file=sys.stderr)
        tol = 0.008 if num in FEATURED else 0.03
        chains = [dp(c, tol) for c in chains]
        chains.sort(key=len, reverse=True)
        if not chains:
            continue
        # Signed mileage undercounts where concurrencies are single-signed;
        # the spliced geometry knows better. Take the larger of the two.
        geom_mi = sum(seg_len_mi(c) for c in chains)
        total_mi = round(max(miles[num], geom_mi))
        avg_aadt = round(aadt_wsum[num] / miles[num]) if miles[num] else 0
        out[f"I{num}"] = {
            "segments": [[[round(x, 4), round(y, 4)] for x, y in c] for c in chains],
            "miles": total_mi,
            "aadt": avg_aadt,
        }

    with open(OUT, "w") as f:
        json.dump(out, f, separators=(",", ":"))

    pts = sum(len(s) for v in out.values() for s in v["segments"])
    print(f"wrote {OUT}: {len(out)} routes, {pts:,} points, "
          f"{os.path.getsize(OUT)/1024:.0f} KB", file=sys.stderr)
    print("validation (published → computed miles / components / avg AADT):", file=sys.stderr)
    for k, pub in [("I90", 3020), ("I80", 2899), ("I95", 1908), ("I10", 2460), ("I5", 1381)]:
        v = out.get(k)
        if v:
            print(f"  {k}: {pub} → {v['miles']} mi · {len(v['segments'])} comps · AADT {v['aadt']:,}",
                  file=sys.stderr)

if __name__ == "__main__":
    main()
