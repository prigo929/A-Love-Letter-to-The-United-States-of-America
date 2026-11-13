import { SEARCH_INDEX_EN, SEARCH_INDEX_RO } from "@/lib/data/precompiled-search-index";

export interface SearchItem {
  title: string;
  category: string;
  description: string;
  href: string;
  keywords?: string[];
}

export function removeDiacritics(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ăâ]/g, "a")
    .replace(/[î]/g, "i")
    .replace(/[ș]/g, "s")
    .replace(/[ț]/g, "t")
    .replace(/[ĂÂ]/g, "A")
    .replace(/[Î]/g, "I")
    .replace(/[Ș]/g, "S")
    .replace(/[Ț]/g, "T");
}

export function getSearchIndex(locale: "en" | "ro"): SearchItem[] {
  return locale === "ro" ? SEARCH_INDEX_RO : SEARCH_INDEX_EN;
}

export function runSearch(query: string, items: SearchItem[]): SearchItem[] {
  if (!query) return [];
  const cleanQuery = removeDiacritics(query.toLowerCase().trim());
  const terms = cleanQuery.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  interface ScoredItem {
    item: SearchItem;
    score: number;
  }

  const scored: ScoredItem[] = [];

  items.forEach((item) => {
    const title = removeDiacritics(item.title.toLowerCase());
    const desc = removeDiacritics(item.description.toLowerCase());
    const cat = removeDiacritics(item.category.toLowerCase());
    const href = removeDiacritics(item.href.toLowerCase());
    const keywords = (item.keywords || []).map((kw) => removeDiacritics(kw.toLowerCase()));

    let score = 0;
    let matchesAny = false;

    for (const term of terms) {
      let matched = false;

      // Exact title match: +200
      if (title === term) {
        score += 200;
        matched = true;
      }
      // Title starts with term: +100
      else if (title.startsWith(term)) {
        score += 100;
        matched = true;
      }
      // Title contains term on word boundary: +60
      else if (new RegExp(`\\b${term}\\b`).test(title)) {
        score += 60;
        matched = true;
      }
      // Title contains term anywhere: +30
      else if (title.includes(term)) {
        score += 30;
        matched = true;
      }

      // Keyword match: +40
      const kwMatches = keywords.filter((kw) => kw === term || kw.startsWith(term) || kw.includes(term));
      if (kwMatches.length > 0) {
        score += 40 * kwMatches.length;
        matched = true;
      }

      // Category matches: exact +40, contains +20
      if (cat === term) {
        score += 40;
        matched = true;
      } else if (cat.includes(term)) {
        score += 20;
        matched = true;
      }

      // Description contains term: +10
      if (desc.includes(term)) {
        score += 10;
        matched = true;
      }

      // Href contains term: +5
      if (href.includes(term)) {
        score += 5;
        matched = true;
      }

      if (matched) {
        matchesAny = true;
      }
    }

    if (matchesAny) {
      // Small bonus if all terms matched
      const allMatched = terms.every(
        (t) =>
          title.includes(t) ||
          desc.includes(t) ||
          cat.includes(t) ||
          href.includes(t) ||
          keywords.some((k) => k.includes(t))
      );
      if (allMatched) {
        score += 50;
      }

      scored.push({ item, score });
    }
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 30).map((s) => s.item);
}

