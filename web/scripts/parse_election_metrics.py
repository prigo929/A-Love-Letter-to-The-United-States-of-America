#!/usr/bin/env python3
import urllib.request
import ssl
import json
import re
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

YEARS = [
    1788, 1792, 1796, 1800, 1804, 1808, 1812, 1816, 1820, 1824, 1828, 1832, 1836, 1840,
    1844, 1848, 1852, 1856, 1860, 1864, 1868, 1872, 1876, 1880, 1884, 1888, 1892, 1896,
    1900, 1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952,
    1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008,
    2012, 2016, 2020, 2024
]

def fetch_and_parse(year):
    url = f"https://en.wikipedia.org/api/rest_v1/page/html/{year}_United_States_presidential_election"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as resp:
            html = resp.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {year}: {e}")
        return None

    soup = BeautifulSoup(html, 'html.parser')
    
    # 1. Parse Infobox
    infobox = soup.find('table', class_=re.compile(r'infobox'))
    total_ev = None
    needed_ev = None
    
    if infobox:
        text = infobox.get_text(" ", strip=True)
        ev_m = re.search(r'(\d+)\s+members of the Electoral College', text)
        if ev_m:
            total_ev = int(ev_m.group(1))
        need_m = re.search(r'(\d+)\s+electoral votes needed to win', text)
        if need_m:
            needed_ev = int(need_m.group(1))

    return {"year": year, "total_ev": total_ev, "needed_ev": needed_ev}

def main():
    print("Parsing electoral college totals across years...")
    for y in YEARS[15:25]: # 1848 to 1888
        res = fetch_and_parse(y)
        print(res)

if __name__ == "__main__":
    main()
