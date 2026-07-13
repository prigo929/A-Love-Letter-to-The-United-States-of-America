#!/usr/bin/env python3
"""Regenerate all 3-digit Interstate shield SVGs from authentic Roadgeek glyphs.

Many of the 3-digit shield files were downloaded as Wikimedia HTML error pages,
not SVGs, so they rendered as broken images. Rebuilding them from a generic web
font made the numbers look wrong next to the real 2-digit shields (which use the
Roadgeek 2005 highway typeface, drawn as vector paths).

This script composes each 3-digit number from the SAME glyph outlines the
1-digit shields use (I-0.svg … I-9.svg, Roadgeek Series D), kerned to match the
tracking measured on the real 2-digit shields, then shrunk uniformly to fit the
wider 3-digit shield. Shield outline, blue field and red banner (including the
"INTERSTATE" legend) are lifted from a known-good 3-digit template (I-135.svg).
Result: self-contained SVGs whose digits are visually identical in style to the
2-digit markers.
"""
import re, os, glob
from svgpathtools import parse_path

SHIELD_DIR = "public/interstate-shields"


def read(fn):
    return open(os.path.join(SHIELD_DIR, fn), encoding="utf-8").read()


def series_d_path(fn):
    """The big number glyph in a single-digit shield (Roadgeek Series D)."""
    for tag in re.findall(r"<path\b[^>]*>", read(fn)):
        if "Series D" in tag:
            return re.search(r'\bd="([^"]+)"', tag).group(1)
    raise SystemExit("no Series D digit path in " + fn)


# ── Harvest the ten digit glyphs and their ink bounding boxes ─────────────────
glyphs = {}
for n in range(10):
    d = series_d_path(f"I-{n}.svg")
    xmin, xmax, ymin, ymax = parse_path(d).bbox()
    glyphs[str(n)] = {"d": d, "xmin": xmin, "w": xmax - xmin}

# ── Shield shape + banner from the I-135 template ─────────────────────────────
tpl = read("I-135.svg")


def group(gid):
    return re.search(r'<g\b[^>]*id="%s".*?</g>' % gid, tpl, re.DOTALL).group(0)


white, blue, red = group("g5"), group("g11"), group("g15")
shape = white + blue + red  # I-135's banner is a blank red field — no legend text

# The "INTERSTATE" legend is a separate Roadgeek Series C glyph in the 1-/2-digit
# shields. Lift it and re-centre/scale it onto the wider 3-digit banner so the
# 3-digit markers read identically to the 2-digit ones.
def series_c_path(fn):
    for tag in re.findall(r"<path\b[^>]*>", read(fn)):
        if "Series C" in tag:
            return re.search(r'\bd="([^"]+)"', tag).group(1)
    raise SystemExit("no Series C banner in " + fn)


_banner_d = series_c_path("I-5.svg")
_bx0, _bx1, _by0, _by1 = parse_path(_banner_d).bbox()
_bcx, _bcy = (_bx0 + _bx1) / 2, (_by0 + _by1) / 2
BANNER_SCALE = 1.15
BANNER_CX, BANNER_CY = 375.0, 70.5  # centre of the 3-digit shield's red field
banner = (
    '<path fill="#fff" d="%s" transform="translate(%.3f,%.3f) scale(%.4f) '
    'translate(%.3f,%.3f)"/>'
    % (_banner_d, BANNER_CX, BANNER_CY, BANNER_SCALE, -_bcx, -_bcy)
)

# ── Number composition ────────────────────────────────────────────────────────
GAP = 52.0        # ink gap between digits, measured on real 2-digit shields
CENTER_X = 375.0  # horizontal centre of the 750-wide shield
CENTER_Y = 315.0  # vertical centre of the number (matches 2-digit shields)
TARGET_W = 540.0  # worst-case number width the 3-digit shield can hold


def compose(num: int) -> str:
    digits = str(num)
    widths = [glyphs[c]["w"] for c in digits]
    total = sum(widths) + GAP * (len(digits) - 1)
    scale = min(1.0, TARGET_W / total)
    # Lay the ink boxes left-to-right, whole number centred at CENTER_X.
    parts, cursor = [], CENTER_X - total / 2
    for c in digits:
        g = glyphs[c]
        parts.append(
            '<path fill="#fff" d="%s" transform="translate(%.3f,0)"/>'
            % (g["d"], cursor - g["xmin"])
        )
        cursor += g["w"] + GAP
    # Uniform scale about the number's centre so 3 digits fit the wider shield.
    return (
        '<g transform="translate(%.3f,%.3f) scale(%.4f) translate(%.3f,%.3f)">%s</g>'
        % (CENTER_X, CENTER_Y, scale, -CENTER_X, -CENTER_Y, "".join(parts))
    )


def build(num: int) -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'
        '<svg xmlns="http://www.w3.org/2000/svg" width="751" height="601" '
        'viewBox="0 0 750 599.999" id="Layer_1" xml:space="preserve">'
        + shape + banner + compose(num) + "</svg>"
    )


count = 0
for path in glob.glob(os.path.join(SHIELD_DIR, "I-[0-9][0-9][0-9].svg")):
    n = int(os.path.basename(path)[2:-4])
    open(path, "w", encoding="utf-8").write(build(n))
    count += 1

print("regenerated %d three-digit shields from Roadgeek glyphs" % count)
bad = [
    p for p in glob.glob(os.path.join(SHIELD_DIR, "I-[0-9][0-9][0-9].svg"))
    if "DOCTYPE html" in open(p, encoding="utf-8", errors="ignore").read()
]
print("remaining corrupt:", len(bad))
