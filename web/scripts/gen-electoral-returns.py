#!/usr/bin/env python3
"""Generate lib/data/electoral-returns.ts from the datasets in ASSETS/Election data/.

Sources:
  MIT Election Lab (exact, 1976–2024):
    - 1976-2024-president/1976-2024-president.csv
    - U.S. Senate statewide 1976–2024/1976-2024-senate-state.csv
    - U.S. House 1976–2024/1976-2024-house.tab   (comma-delimited despite .tab)
  County-level returns (Algara/Sharif, aggregated to state):
    - County_Level_US_Elections_Data/.../*presidential*1868_2020.Rdata
    - County_Level_US_Elections_Data/.../*us_senate*1908_2020.Rdata   (has seat_class)
    - County_Level_US_Elections_Data/.../*gubernatorial*1865_2020.Rdata

Emits: RET_PRES (1868–2024), RET_NATIONAL (1976–2024), RET_HOUSE (1976–2024),
       RET_SENATE (even years 1914–2024, real 2-seat delegation by class),
       RET_GOV (even years 1866–2024, carried forward between elections).

Requires: pip install pyreadr pandas
Run from web/:  python3 scripts/gen-electoral-returns.py
"""
import csv, collections, json, os
import pyreadr

BASE = "ASSETS/Election data"
CTY = f"{BASE}/County_Level_US_Elections_Data/County_Level_US_Elections_Data"
OUT = "lib/data/electoral-returns.ts"

PO2NAME = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming','DC':'District of Columbia'}


def title(s):
    return s.title().replace(" Of ", " of ")


def county_winner(dem, rep, tot):
    oth = tot - dem - rep
    if dem >= rep and dem >= oth:
        return "DEM"
    if rep > dem and rep >= oth:
        return "REP"
    return "OTH"


def aggregate(df, extra=None):
    """Sum county rows to (year, state[, extra]) -> [dem, rep, total]."""
    d = collections.defaultdict(lambda: [0.0, 0.0, 0.0])
    dv = df["democratic_raw_votes"].fillna(0).tolist()
    rv = df["republican_raw_votes"].fillna(0).tolist()
    tv = df["raw_county_vote_totals"].fillna(0).tolist()
    yv = df["election_year"].tolist()
    sv = df["state"].tolist()
    ev = df[extra].tolist() if extra else None
    for i in range(len(df)):
        st = PO2NAME.get(sv[i])
        if not st:
            continue
        try:
            y = int(yv[i])
        except Exception:
            continue
        key = (y, st, ev[i]) if extra else (y, st)
        a = d[key]
        a[0] += dv[i] or 0; a[1] += rv[i] or 0; a[2] += tv[i] or 0
    return d


# ── MIT helpers (fusion-aware) ────────────────────────────────────────────────
def mit_winner(rows, override=None, state=None):
    agg = collections.defaultdict(float); ps = collections.defaultdict(set); det = collections.defaultdict(set)
    for cand, sp, pd, v in rows:
        agg[cand] += v; ps[cand].add(sp); det[cand].add((pd or "").upper())
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


# ═══════════════ PRESIDENT ═══════════════
PRES = collections.defaultdict(dict); NATL = {}
# County (1868–1972 used; MIT overrides 1976+)
presdf = pyreadr.read_r(f"{CTY}/dataverse_shareable_presidential_county_returns_1868_2020.Rdata")["pres_elections_release"]
pa = aggregate(presdf)
for (y, st), (d, r, t) in pa.items():
    if y >= 1976:
        continue
    PRES[y][st] = {"w": county_winner(d, r, t), "d": int(d), "r": int(r), "t": int(t)}
# MIT president 1976–2024 (exact per-state + votes)
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
for (y, st), rows in prows.items():
    PRES[y][st] = {"w": mit_winner(rows), "d": int(pdem[y][st]), "r": int(prep[y][st]), "t": ptot[y].get(st, 0)}
for y in [yy for yy in prows and set(y for y, s in prows)]:
    pass
for y in set(y for (y, s) in prows):
    NATL[y] = {"d": int(sum(pdem[y].values())), "r": int(sum(prep[y].values())), "t": int(sum(ptot[y].values()))}

# ═══════════════ HOUSE (MIT 1976–2024; DC delegate excluded) ═══════════════
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
            continue
        try:
            v = float(row["candidatevotes"] or 0)
        except Exception:
            v = 0
        hrows[(y, st, row["district"])].append((row["candidate"], (row["party"] or "").upper(), row["party"] or "", v))
HOUSE = collections.defaultdict(lambda: collections.defaultdict(collections.Counter))
for (y, st, dist), rows in hrows.items():
    p = mit_winner([(c, pu if "DEMOCRAT" in pu or "REPUBLICAN" in pu else "OTHER", pd, v) for c, pu, pd, v in rows])
    HOUSE[y][st][p] += 1

# ═══════════════ SENATE (class-based, 1914–2024) ═══════════════
sendf = pyreadr.read_r(f"{CTY}/dataverse_shareable_us_senate_county_returns_1908_2020.Rdata")["senate_elections_release"]
sa = aggregate(sendf, "seat_class")
# results[state][class] = sorted list of (year, party)
sres = collections.defaultdict(lambda: collections.defaultdict(list))
for (y, st, cl), (d, r, t) in sa.items():
    sres[st][cl].append((y, county_winner(d, r, t)))
# MIT senate 2022 (Class III) and 2024 (Class I)
srows = collections.defaultdict(list)
with open(f"{BASE}/U.S. Senate statewide 1976–2024/1976-2024-senate-state.csv", encoding="utf-8", errors="replace") as f:
    for row in csv.DictReader(f):
        try:
            y = int(row["year"])
        except Exception:
            continue
        if y not in (2022, 2024) or (row.get("stage") or "").lower() != "gen":
            continue
        st = title(row["state"])
        try:
            v = float(row["candidatevotes"] or 0)
        except Exception:
            v = 0
        srows[(y, st)].append((row["candidate"], row["party_simplified"], row["party_detailed"] or "", v))
SOVR = {("Alaska", "MURKOWSKI"): "REP", ("Wyoming", "LUMMIS"): "REP"}
CYCLE_CLASS = {2022: "Class III", 2024: "Class I"}
for (y, st), rows in srows.items():
    cl = CYCLE_CLASS[y]
    if cl in sres[st] or any(cl in sres[s2] for s2 in [st]):
        sres[st][cl].append((y, mit_winner(rows, SOVR, st)))
    else:
        # state's up seat this cycle may be its known class; attach to whichever class it has that matches cycle
        sres[st][cl].append((y, mit_winner(rows, SOVR, st)))
for st in sres:
    for cl in sres[st]:
        sres[st][cl].sort()
YEARS = list(range(1914, 2025, 2))
SEN = collections.defaultdict(dict)
for st, classes in sres.items():
    cls = sorted(classes.keys())
    for Y in YEARS:
        seats = []; active = False
        for cl in cls:
            le = [(ry, rp) for ry, rp in classes[cl] if ry <= Y]
            if le:
                seats.append(le[-1][1])
                if le[-1][0] == Y:
                    active = True
        if len(seats) >= 2:
            p1, p2 = seats[0], seats[1]
        elif len(seats) == 1:
            p1 = p2 = seats[0]
        else:
            continue
        SEN[Y][st] = {"p1": p1, "p2": p2, "active": active}

# ═══════════════ GOVERNOR (carry forward, 1866–2024) ═══════════════
govdf = pyreadr.read_r(f"{CTY}/dataverse_shareable_gubernatorial_county_returns_1865_2020.Rdata")["gov_elections_release"]
ga = aggregate(govdf)
gwin = collections.defaultdict(dict)  # state -> {year: party}
for (y, st), (d, r, t) in ga.items():
    gwin[st][y] = county_winner(d, r, t)
GYEARS = list(range(1866, 2025, 2))
GOV = collections.defaultdict(dict)
for st, yr in gwin.items():
    yrs = sorted(yr.keys())
    for Y in GYEARS:
        prev = [y for y in yrs if y <= Y]
        if prev:
            GOV[Y][st] = yr[prev[-1]]

# ═══════════════ EMIT ═══════════════
def js(o):
    return json.dumps(o, separators=(",", ":"))

lines = [
    "// AUTO-GENERATED from ASSETS/Election data (MIT Election Lab + county-level returns). Do not edit by hand.",
    "// Regenerate:  python3 scripts/gen-electoral-returns.py   (needs: pip install pyreadr pandas)",
    "//   RET_PRES 1868–2024 · RET_SENATE 1914–2024 (by class) · RET_GOV 1866–2024 · RET_HOUSE/RET_NATIONAL 1976–2024\n",
    "export interface RetPresState { w: string; d: number; r: number; t: number; }",
    "export const RET_PRES: Record<number, Record<string, RetPresState>> = " + js({int(y): PRES[y] for y in sorted(PRES)}) + ";\n",
    "export const RET_NATIONAL: Record<number, { d: number; r: number; t: number }> = " + js({int(y): NATL[y] for y in sorted(NATL)}) + ";\n",
    "export const RET_HOUSE: Record<number, Record<string, { DEM?: number; REP?: number; IND?: number; OTH?: number }>> = " + js({int(y): {st: dict(c) for st, c in HOUSE[y].items()} for y in sorted(HOUSE)}) + ";\n",
    "export const RET_SENATE: Record<number, Record<string, { p1: string; p2: string; active: boolean }>> = " + js({int(y): SEN[y] for y in sorted(SEN)}) + ";\n",
    "export const RET_GOV: Record<number, Record<string, string>> = " + js({int(y): GOV[y] for y in sorted(GOV)}) + ";",
]
with open(OUT, "w") as f:
    f.write("\n".join(lines))
print("wrote", OUT, os.path.getsize(OUT), "bytes")
print("pres years:", min(PRES), "..", max(PRES), "| senate years:", min(SEN), "..", max(SEN), "| gov years:", min(GOV), "..", max(GOV))
