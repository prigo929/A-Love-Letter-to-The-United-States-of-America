import urllib.request
import urllib.parse
import ssl
from bs4 import BeautifulSoup
import json
import os

urls = {
    "1776-1789": "https://grokipedia.com/page/History_of_the_United_States_(1776%E2%80%931789)",
    "1789-1849_grok": "https://grokipedia.com/page/History_of_the_United_States_(1789%E2%80%931849)",
    "1849-1865": "https://grokipedia.com/page/History_of_the_United_States_(1849%E2%80%931865)",
    "1865-1917": "https://grokipedia.com/page/History_of_the_United_States_(1865%E2%80%931917)",
    "1917-1945": "https://grokipedia.com/page/History_of_the_United_States_(1917%E2%80%931945)",
    "1945-1964": "https://grokipedia.com/page/History_of_the_United_States_(1945%E2%80%931964)",
    "1964-1980": "https://grokipedia.com/page/History_of_the_United_States_(1964%E2%80%931980)",
    "1980-1991": "https://grokipedia.com/page/History_of_the_United_States_(1980%E2%80%931991)",
    "1991-2008": "https://grokipedia.com/page/History_of_the_United_States_(1991%E2%80%932008)",
    "2008-present": "https://grokipedia.com/page/History_of_the_United_States_(2008%E2%80%93present)",
    "1815-1849_wiki": "https://en.wikipedia.org/wiki/History_of_the_United_States_(1815%E2%80%931849)"
}

headers = {'User-Agent': 'Mozilla/5.0'}
context = ssl._create_unverified_context()

results = {}

for key, url in urls.items():
    print(f"Fetching title for {key} at {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=context) as response:
            html = response.read().decode('utf-8')
        soup = BeautifulSoup(html, "html.parser")
        title = soup.title.text if soup.title else "No title"
        results[key] = {
            "status": "success",
            "title": title.strip(),
            "url": url,
            "html_len": len(html)
        }
    except Exception as e:
        results[key] = {
            "status": "failed",
            "error": str(e),
            "url": url
        }

print("\n--- RESULTS ---")
print(json.dumps(results, indent=2))
