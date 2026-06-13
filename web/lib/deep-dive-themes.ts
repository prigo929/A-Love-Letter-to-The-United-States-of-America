export interface DeepDiveTheme {
  bg: string;
  accent: string;
  label: string;
  labelRo?: string;
}

export const DEEP_DIVE_THEMES = {
  economy: {
    bg: "#000000",
    accent: "#E8B923",
    label: "IN DEPTH",
    labelRo: "ÎN DETALIU",
  },
  military: {
    bg: "#000000",
    accent: "#E8B923",
    label: "IN DEPTH",
    labelRo: "ÎN DETALIU",
  },
  nature: {
    bg: "#030504",
    accent: "#4ade80",
    label: "FIELD NOTES",
    labelRo: "NOTE DE TEREN",
  },
  constitution: {
    bg: "#080B12",
    accent: "#c4a96e",
    label: "IN DEPTH",
    labelRo: "ÎN DETALIU",
  },
  culture: {
    bg: "#0C0907",
    accent: "#E8391B",
    label: "IN DEPTH",
    labelRo: "ÎN DETALIU",
  },
  "quality-of-life": {
    bg: "#000000",
    accent: "#E8B923",
    label: "IN DEPTH",
    labelRo: "ÎN DETALIU",
  },
  "global-leadership": {
    bg: "#050810",
    accent: "#60a5fa",
    label: "IN DEPTH",
    labelRo: "ÎN DETALIU",
  },
  demographics: {
    bg: "#070508",
    accent: "#a78bfa",
    label: "IN DEPTH",
    labelRo: "ÎN DETALIU",
  },
  innovation: {
    bg: "#000000",
    accent: "#E8B923",
    label: "IN DEPTH",
    labelRo: "ÎN DETALIU",
  },
} satisfies Record<string, DeepDiveTheme>;
