#!/usr/bin/env python3
import urllib.request
import ssl
import json
import re
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://en.wikipedia.org/api/rest_v1/page/html/1880_United_States_presidential_election"
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, context=ctx) as resp:
    html = resp.read().decode('utf-8')

soup = BeautifulSoup(html, 'html.parser')

# Find infobox
infobox = soup.find('table', class_=re.compile(r'infobox'))
if infobox:
    print("Found infobox!")
    for tr in infobox.find_all('tr'):
        text = tr.get_text(" ", strip=True)
        if "Electoral vote" in text or "Popular vote" in text or "Nominee" in text or "members of the Electoral College" in text:
            print(text[:150])

