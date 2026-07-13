#!/usr/bin/env python3
"""Regenerate all 3-digit Interstate shield SVGs.

Many of the 3-digit shields in public/interstate-shields/ were downloaded as
Wikimedia HTML error pages, not real SVGs, so they render as broken images.
The shield SHAPE (white outline, blue body, red banner) is identical for every
3-digit marker, so we lift those geometry paths from a known-good template
(I-135.svg) and drop the target number in as text. Fully self-contained SVGs —
no external fonts required to decode, condensed sans stack for the digits.
"""
import re, os, glob

SHIELD_DIR = "public/interstate-shields"
TEMPLATE = os.path.join(SHIELD_DIR, "I-135.svg")

src = open(TEMPLATE, encoding="utf-8").read()

def group(gid):
    m = re.search(r'<g\b[^>]*id="%s".*?</g>' % gid, src, re.DOTALL)
    if not m:
        raise SystemExit("missing group %s in template" % gid)
    return m.group(0)

white = group("g5")   # white outline (drop shadow / border)
blue  = group("g11")  # blue shield body
red   = group("g15")  # red top banner

FONT = "'Arial Narrow','Helvetica Neue Condensed',Helvetica,Arial,sans-serif"

def build(num: int) -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'
        '<svg xmlns="http://www.w3.org/2000/svg" width="751" height="601" '
        'viewBox="0 0 750 599.999" id="Layer_1" xml:space="preserve">'
        + white + blue + red +
        '<text x="375" y="108" text-anchor="middle" font-family="%s" '
        'font-weight="bold" font-size="46" letter-spacing="2" '
        'fill="#ffffff">INTERSTATE</text>'
        '<text x="375" y="470" text-anchor="middle" font-family="%s" '
        'font-weight="bold" font-size="300" fill="#ffffff">%d</text>'
        '</svg>'
    ) % (FONT, FONT, num)

count = 0
for path in glob.glob(os.path.join(SHIELD_DIR, "I-[0-9][0-9][0-9].svg")):
    n = int(os.path.basename(path)[2:-4])
    open(path, "w", encoding="utf-8").write(build(n))
    count += 1

print("regenerated %d three-digit shields" % count)
# sanity: no HTML left, all start with xml declaration
bad = [p for p in glob.glob(os.path.join(SHIELD_DIR, "I-[0-9][0-9][0-9].svg"))
       if "DOCTYPE html" in open(p, encoding="utf-8", errors="ignore").read()]
print("remaining corrupt:", len(bad))
