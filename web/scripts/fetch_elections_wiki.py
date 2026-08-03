#!/usr/bin/env python3
import urllib.request
import ssl
import json
import re

YEARS = [
    1788, 1792, 1796, 1800, 1804, 1808, 1812, 1816, 1820, 1824, 1828, 1832, 1836, 1840,
    1844, 1848, 1852, 1856, 1860, 1864, 1868, 1872, 1876, 1880, 1884, 1888, 1892, 1896,
    1900, 1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952,
    1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008,
    2012, 2016, 2020, 2024
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def fetch_year(year):
    url = f"https://en.wikipedia.org/api/rest_v1/page/html/{year}_United_States_presidential_election"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as resp:
            return resp.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {year}: {e}")
        return None

def main():
    print("Testing Wikipedia fetch with unverified SSL context...")
    for y in [1880, 1824, 1860]:
        html = fetch_year(y)
        if html:
            print(f"Successfully fetched {y}: {len(html)} bytes")

if __name__ == "__main__":
    main()
