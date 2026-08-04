#!/usr/bin/env python3
"""Generate lib/data/electoral-returns-modern.ts from the MIT Election Lab CSVs.

Sources (ASSETS/Election data/):
  - 1976-2024-president/1976-2024-president.csv
  - U.S. Senate statewide 1976–2024/1976-2024-senate-state.csv
  - U.S. House 1976–2024/1976-2024-house.tab   (comma-delimited despite .tab)

Emits: MODERN_PRES, MODERN_NATIONAL, MODERN_HOUSE, MODERN_SENATE (1976–2024).
Run from the web/ directory:  python3 scripts/gen-electoral-returns.py
"""
import csv, collections, json, os

BASE = "ASSETS/Election data"
OUT = "lib/data/electoral-returns-modern.ts"


def title(s):
    return s.title().replace(" Of ", " of ")


def winner_party(rows, override=None, state=None):
    """rows: list of (cand, party_simplified, party_detailed, votes). Fusion-aware."""
    agg = collections.defaultdict(float)
    ps = collections.defaultdict(set)
    det = collections.defaultdict(set)
    for cand, sp, pd, v in rows:
        agg[cand] += v
        ps[cand].add(sp)
        det[cand].add((pd or "").upper())
    cand = max(agg, key=agg.get)
    if override:
        for (ost, name), p in override.items():
            if state == ost and name in cand.upper():
                return p
    if "DEMOCRAT" in ps[cand]:
        return "DEM"
    if "REPUBLICAN" in ps[cand]:
        return "REP"
    if any("INDEPENDENT" in d for d in det[cand]):
        return "IND"
    return "OTH"


# ── President ────────────────────────────────────────────────────────────────
prows = collections.defaultdict(list)
pdem = collections.defaultdict(lambda: collections.defaultdict(float))
prep = collections.defaultdict(lambda: collections.defaultdict(float))
ptot = collections.defaultdict(dict)
with open(f"{BASE}/1976-2024-president/1976-2024-president.csv", encoding="utf-8", errors="replace") as f:
    for row in csv.DictReader(f):
        try:
            y = int(row["year"])
        except Exception:
            continue
        st = title(row["state"]); sp = row["party_simplified"]
        try:
            v = float(row["candidatevotes"] or 0)
        except Exception:
            v = 0
        prows[(y, st)].append((row["candidate"], sp, "", v))
        if sp == "DEMOCRAT":
            pdem[y][st] += v
        elif sp == "REPUBLICAN":
            prep[y][st] += v
        try:
            ptot[y][st] = int(float(row["totalvotes"]))
        except Exception:
            pass
PRES = collections.defaultdict(dict); NATL = {}
for (y, st), rows in prows.items():
    PRES[y][st] = {"w": winner_party(rows), "d": int(pdem[y][st]), "r": int(prep[y][st]), "t": ptot[y].get(st, 0)}
for y in PRES:
    NATL[y] = {"d": int(sum(pdem[y].values())), "r": int(sum(prep[y].values())), "t": int(sum(ptot[y].values()))}

# ── House seat counts (District of Columbia delegate excluded) ────────────────
hrows = collections.defaultdict(list)
with open(f"{BASE}/U.S. House 1976–2024/1976-2024-house.tab", encoding="utf-8", errors="replace") as f:
    for row in csv.DictReader(f):
        try:
            y = int(row["year"])
        except Exception:
            continue
        if (row.get("stage") or "").upper() != "GEN":
            continue
        st = title(row["state"])
        if st == "District of Columbia":
            continue  # non-voting delegate, not one of the 435
        try:
            v = float(row["candidatevotes"] or 0)
        except Exception:
            v = 0
        hrows[(y, st, row["district"])].append((row["candidate"], (row["party"] or "").upper(), row["party"] or "", v))
HOUSE = collections.defaultdict(lambda: collections.defaultdict(collections.Counter))
for (y, st, dist), rows in hrows.items():
    agg = collections.defaultdict(float); parties = collections.defaultdict(set); det = collections.defaultdict(set)
    for cand, pu, pd, v in rows:
        agg[cand] += v; parties[cand].add(pu); det[cand].add(pd.upper())
    cand = max(agg, key=agg.get)
    if any("DEMOCRAT" in p for p in parties[cand]):
        p = "DEM"
    elif any("REPUBLICAN" in p for p in parties[cand]):
        p = "REP"
    elif any("INDEPENDENT" in d for d in det[cand]):
        p = "IND"
    else:
        p = "OTH"
    HOUSE[y][st][p] += 1

# ── Senate rolling two-seat delegation ────────────────────────────────────────
srows = collections.defaultdict(list)
with open(f"{BASE}/U.S. Senate statewide 1976–2024/1976-2024-senate-state.csv", encoding="utf-8", errors="replace") as f:
    for row in csv.DictReader(f):
        try:
            y = int(row["year"])
        except Exception:
            continue
        if (row.get("stage") or "").lower() != "gen":
            continue
        st = title(row["state"])
        try:
            v = float(row["candidatevotes"] or 0)
        except Exception:
            v = 0
        srows[(y, st, row.get("special"))].append((row["candidate"], row["party_simplified"], row["party_detailed"] or "", v))
OVERRIDE = {("Alaska", "MURKOWSKI"): "REP", ("Wyoming", "LUMMIS"): "REP"}
races = collections.defaultdict(list)
for (y, st, spc), rows in sorted(srows.items()):
    races[st].append((y, winner_party(rows, OVERRIDE, st)))
for st in races:
    races[st].sort()
YEARS = list(range(1976, 2025, 2))
SEN = collections.defaultdict(dict)
for st, rl in races.items():
    for Y in YEARS:
        le = [i for i, (ry, rp) in enumerate(rl) if ry <= Y]
        if not le:
            p1 = p2 = rl[0][1]; active = False
        else:
            idx = le[-1]; p1 = rl[idx][1]
            p2 = rl[idx - 1][1] if idx - 1 >= 0 else (rl[idx + 1][1] if idx + 1 < len(rl) else p1)
            active = rl[idx][0] == Y
        SEN[Y][st] = {"p1": p1, "p2": p2, "active": active}

# ── Emit TypeScript ───────────────────────────────────────────────────────────
def js(o):
    return json.dumps(o, separators=(",", ":"))

lines = [
    "// AUTO-GENERATED from MIT Election Lab CSVs (ASSETS/Election data). Do not edit by hand.",
    "// President, Senate (rolling 2-seat delegation), and House seat counts, 1976–2024.",
    "// Regenerate:  python3 scripts/gen-electoral-returns.py\n",
    "export interface ModernPresState { w: string; d: number; r: number; t: number; }",
    "export const MODERN_PRES: Record<number, Record<string, ModernPresState>> = " + js({int(y): PRES[y] for y in PRES}) + ";\n",
    "export const MODERN_NATIONAL: Record<number, { d: number; r: number; t: number }> = " + js({int(y): NATL[y] for y in NATL}) + ";\n",
    "export const MODERN_HOUSE: Record<number, Record<string, { DEM?: number; REP?: number; IND?: number; OTH?: number }>> = " + js({int(y): {st: dict(c) for st, c in HOUSE[y].items()} for y in HOUSE}) + ";\n",
    "export const MODERN_SENATE: Record<number, Record<string, { p1: string; p2: string; active: boolean }>> = " + js({int(y): SEN[y] for y in SEN}) + ";",
]
with open(OUT, "w") as f:
    f.write("\n".join(lines))
print("wrote", OUT, os.path.getsize(OUT), "bytes")
