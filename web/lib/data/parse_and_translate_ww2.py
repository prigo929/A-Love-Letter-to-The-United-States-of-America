import os
import re
import json
import time
import urllib.request
import urllib.parse
import ssl
from bs4 import BeautifulSoup
from deep_translator import GoogleTranslator

# ─── Configuration ───────────────────────────────────────────────────────────
WIKI_URL = "https://en.wikipedia.org/wiki/Military_history_of_the_United_States_during_World_War_II"
GROK_URL = "https://grokipedia.com/page/Military_history_of_the_United_States_during_World_War_II"

HTML_CACHE = "ww2_raw_content.html"
PARSED_JSON = "ww2_parsed_structure.json"
BILINGUAL_JSON = "ww2_bilingual_structure.json"

# ─── 1. Download Content ──────────────────────────────────────────────────────
def download_content(url):
    print(f"Downloading content from {url}...")
    headers = {'User-Agent': 'Mozilla/5.0'}
    context = ssl._create_unverified_context()
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=context) as response:
            html = response.read().decode('utf-8')
        with open(HTML_CACHE, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Saved raw HTML to {HTML_CACHE}")
        return html
    except Exception as e:
        print(f"Failed to download: {e}")
        return None

# ─── 2. Parse HTML structure ──────────────────────────────────────────────────
def parse_html_structure():
    print(f"Parsing HTML structure from {HTML_CACHE}...")
    if not os.path.exists(HTML_CACHE):
        print(f"Cache file {HTML_CACHE} not found!")
        return
        
    with open(HTML_CACHE, "r", encoding="utf-8") as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, "html.parser")
    structure = []
    current_h2 = None
    current_h3 = None

    # Process h2, h3 and span elements to extract hierarchy
    for child in soup.find_all(["h2", "h3", "span"]):
        if child.name == "h2":
            title = child.get_text().strip()
            current_h2 = {
                "title": title,
                "subsections": []
            }
            structure.append(current_h2)
            current_h3 = None
        elif child.name == "h3":
            if current_h2 is None:
                current_h2 = {
                    "title": "Introduction",
                    "subsections": []
                }
                structure.append(current_h2)
            title = child.get_text().strip()
            current_h3 = {
                "title": title,
                "paragraphs": []
            }
            current_h2["subsections"].append(current_h3)
        elif child.name == "span" and child.get("data-tts-block") == "true":
            text = child.get_text().strip()
            # Clean citations like [12]
            text = re.sub(r'\[\d+\]', '', text)
            text = re.sub(r'\s+', ' ', text)
            if current_h3 is not None:
                current_h3["paragraphs"].append(text)
            elif current_h2 is not None:
                if not current_h2["subsections"]:
                    current_h3 = {
                        "title": "",
                        "paragraphs": []
                    }
                    current_h2["subsections"].append(current_h3)
                current_h2["subsections"][0]["paragraphs"].append(text)

    # Save to JSON
    with open(PARSED_JSON, "w", encoding="utf-8") as f:
        json.dump(structure, f, indent=2, ensure_ascii=False)
    print(f"Parsed structure saved to {PARSED_JSON}")

# ─── 3. Translate JSON to Bilingual format ───────────────────────────────────
def translate_to_bilingual():
    print(f"Translating {PARSED_JSON} to Romanian...")
    if not os.path.exists(PARSED_JSON):
        print(f"Parsed JSON {PARSED_JSON} not found!")
        return

    with open(PARSED_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Keep only the first 10 sections of content
    data = data[:10]

    translator = GoogleTranslator(source='en', target='ro')
    bilingual_data = []

    def safe_translate(text):
        if not text:
            return ""
        for attempt in range(3):
            try:
                translation = translator.translate(text)
                time.sleep(0.1) # Be polite to the API
                return translation
            except Exception as e:
                print(f"Error translating '{text[:30]}...': {e}. Retrying...")
                time.sleep(1.0)
        return "[Translation Failed] " + text

    total_paragraphs = sum(sum(len(sub.get('paragraphs', [])) for sub in s.get('subsections', [])) for s in data)
    current_paragraph_idx = 0

    for s_idx, section in enumerate(data):
        s_title_en = section["title"]
        print(f"Translating section {s_idx + 1}/10: {s_title_en}...")
        s_title_ro = safe_translate(s_title_en)
        
        bilingual_section = {
            "title": {
                "en": s_title_en,
                "ro": s_title_ro
            },
            "subsections": []
        }
        
        for sub in section.get("subsections", []):
            sub_title_en = sub["title"]
            sub_title_ro = safe_translate(sub_title_en) if sub_title_en else ""
            
            bilingual_sub = {
                "title": {
                    "en": sub_title_en,
                    "ro": sub_title_ro
                },
                "paragraphs": []
            }
            
            for para in sub.get("paragraphs", []):
                current_paragraph_idx += 1
                print(f"Translating paragraph {current_paragraph_idx}/{total_paragraphs}...")
                para_ro = safe_translate(para)
                bilingual_sub["paragraphs"].append({
                    "en": para,
                    "ro": para_ro
                })
                
            bilingual_section["subsections"].append(bilingual_sub)
            
        bilingual_data.append(bilingual_section)

    with open(BILINGUAL_JSON, "w", encoding="utf-8") as f:
        json.dump(bilingual_data, f, indent=2, ensure_ascii=False)
    print(f"Bilingual JSON saved to {BILINGUAL_JSON}")

if __name__ == "__main__":
    # If raw HTML does not exist, download it from Grokipedia
    if not os.path.exists(HTML_CACHE):
        download_content(GROK_URL)
    
    if os.path.exists(HTML_CACHE):
        parse_html_structure()
        translate_to_bilingual()
        print("Done!")
