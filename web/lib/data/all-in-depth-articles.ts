// ─── All In-Depth Articles Data Aggregator ────────────────────────────────────
// Combines verticals, history thematic data, and history eras into a unified catalog.

import { VERTICALS_THEMATIC_DATA, type ThematicTopic } from "./verticals-thematic-data";
import { THEMATIC_HISTORY_DATA } from "./history-thematic-data";
import { HISTORY_ERAS } from "./history-eras-data";
import { DEEP_DIVE_THEMES, type DeepDiveTheme } from "../deep-dive-themes";

export interface AllInDepthArticle extends ThematicTopic {
  uid: string;
  domainCategory: "nature" | "constitution" | "economy" | "quality-of-life" | "military" | "global-leadership" | "demographics" | "culture" | "innovation" | "history";
  domainKey: string;
  categoryLabel: { en: string; ro: string };
  theme: DeepDiveTheme;
}

const VERTICAL_METADATA: Record<string, { label: { en: string; ro: string }; category: AllInDepthArticle["domainCategory"] }> = {
  nature: {
    label: { en: "Nature & Geography", ro: "Natură și Geografie" },
    category: "nature",
  },
  constitution: {
    label: { en: "Constitution & Government", ro: "Constituție și Guvernare" },
    category: "constitution",
  },
  economy: {
    label: { en: "Economy & Markets", ro: "Economie și Piețe" },
    category: "economy",
  },
  "quality-of-life": {
    label: { en: "Quality of Life", ro: "Calitatea Vieții" },
    category: "quality-of-life",
  },
  military: {
    label: { en: "Military & Defense", ro: "Armată și Apărare" },
    category: "military",
  },
  "global-leadership": {
    label: { en: "Global Leadership", ro: "Leadership Global" },
    category: "global-leadership",
  },
  demographics: {
    label: { en: "Demographics & Population", ro: "Demografie și Populație" },
    category: "demographics",
  },
  culture: {
    label: { en: "Culture & Soft Power", ro: "Cultură și Putere Soft" },
    category: "culture",
  },
  innovation: {
    label: { en: "Innovation & Technology", ro: "Inovație și Tehnologie" },
    category: "innovation",
  },
};

const HISTORY_THEMATIC_LABELS: Record<string, { en: string; ro: string }> = {
  "founding-principles": { en: "Founding Principles", ro: "Principii Fondatoare" },
  "american-exceptionalism": { en: "American Exceptionalism", ro: "Excepționalism American" },
  "frontier-and-expansion": { en: "Frontier & Expansion", ro: "Frontieră și Expansiune" },
  "union-and-liberty": { en: "Union & Liberty", ro: "Uniune și Libertate" },
  "industrial-rise": { en: "Industrial Rise", ro: "Ascensiunea Industrială" },
  "arsenal-of-democracy": { en: "Arsenal of Democracy", ro: "Arsenalul Democrației" },
  "cold-war": { en: "Cold War", ro: "Războiul Rece" },
  "american-dream": { en: "The American Dream", ro: "Visul American" },
  "reagan-revolution": { en: "Reagan Revolution", ro: "Revoluția Reagan" },
  "faith-and-reform": { en: "Faith & Reform", ro: "Credință și Reformă" },
  "free-markets": { en: "Free Markets", ro: "Piețe Libere" },
  "crisis-and-resilience": { en: "Crisis & Resilience", ro: "Criză și Reziliență" },
  "reform-and-rights": { en: "Reform & Rights", ro: "Reformă și Drepturi" },
  "post-9-11-america": { en: "Post-9/11 America", ro: "America Post-9/11" },
  "populism-and-labor": { en: "Populism & Labor", ro: "Populism și Muncă" },
  wwii: { en: "World War II", ro: "Al Doilea Război Mondial" },
};

const HISTORY_THEME: DeepDiveTheme = {
  bg: "#080604",
  accent: "#D4AF37",
  label: "IN DEPTH",
  labelRo: "ÎN DETALIU",
};

export function getAllInDepthArticles(): AllInDepthArticle[] {
  const articles: AllInDepthArticle[] = [];

  // 1. Verticals Thematic Data
  for (const [key, topics] of Object.entries(VERTICALS_THEMATIC_DATA)) {
    const meta = VERTICAL_METADATA[key] ?? {
      label: { en: key, ro: key },
      category: "culture" as const,
    };
    const theme = DEEP_DIVE_THEMES[key as keyof typeof DEEP_DIVE_THEMES] ?? HISTORY_THEME;

    topics.forEach((topic, idx) => {
      articles.push({
        ...topic,
        uid: `vertical_${key}_${topic.id}_${idx}`,
        domainCategory: meta.category,
        domainKey: key,
        categoryLabel: meta.label,
        theme,
      });
    });
  }

  // 2. History Thematic Data
  for (const [key, topics] of Object.entries(THEMATIC_HISTORY_DATA)) {
    const categoryLabel = HISTORY_THEMATIC_LABELS[key] ?? { en: "History", ro: "Istorie" };
    topics.forEach((topic, idx) => {
      articles.push({
        ...topic,
        uid: `history_${key}_${topic.id}_${idx}`,
        domainCategory: "history",
        domainKey: `history-${key}`,
        categoryLabel,
        theme: HISTORY_THEME,
      });
    });
  }

  // 3. History Eras Data
  HISTORY_ERAS.forEach((topic, idx) => {
    articles.push({
      ...topic,
      uid: `era_${topic.id}_${idx}`,
      domainCategory: "history",
      domainKey: "history-eras",
      categoryLabel: { en: "History Eras", ro: "Epoci Istorice" },
      theme: HISTORY_THEME,
    });
  });

  return articles;
}

export interface DomainCategoryInfo {
  id: string;
  label: { en: string; ro: string };
  accent: string;
}

export const DOMAIN_CATEGORIES: DomainCategoryInfo[] = [
  { id: "all", label: { en: "All Articles", ro: "Toate Articolele" }, accent: "#E8B923" },
  { id: "constitution", label: { en: "Constitution & Law", ro: "Constituție și Drept" }, accent: "#c4a96e" },
  { id: "history", label: { en: "History & Eras", ro: "Istorie și Epoci" }, accent: "#D4AF37" },
  { id: "culture", label: { en: "Culture & Soft Power", ro: "Cultură și Putere Soft" }, accent: "#E8391B" },
  { id: "economy", label: { en: "Economy & Markets", ro: "Economie și Piețe" }, accent: "#E8B923" },
  { id: "innovation", label: { en: "Innovation & Tech", ro: "Inovație și Tehnologie" }, accent: "#E8B923" },
  { id: "military", label: { en: "Military & Defense", ro: "Armată și Apărare" }, accent: "#E8B923" },
  { id: "nature", label: { en: "Nature & Parks", ro: "Natură și Parcuri" }, accent: "#4ade80" },
  { id: "global-leadership", label: { en: "Global Leadership", ro: "Leadership Global" }, accent: "#60a5fa" },
  { id: "demographics", label: { en: "Demographics", ro: "Demografie" }, accent: "#a78bfa" },
  { id: "quality-of-life", label: { en: "Quality of Life", ro: "Calitatea Vieții" }, accent: "#E8B923" },
];
