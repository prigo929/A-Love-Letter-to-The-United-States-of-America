export interface DeepDiveTheme {
  bg: string;
  accent: string;
  label: string;
  labelRo?: string;
}

export const DEEP_DIVE_THEMES = {
  economy: {
    bg: "#060810",
    accent: "#E8B923",
    label: "THE ARCHIVE",
    labelRo: "ARHIVA",
  },
  military: {
    bg: "#080A0E",
    accent: "#E8B923",
    label: "INTELLIGENCE BRIEF",
    labelRo: "DOSAR INFORMATIV",
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
    label: "THE ARCHIVE",
    labelRo: "ARHIVA",
  },
  culture: {
    bg: "#0C0907",
    accent: "#E8391B",
    label: "THE ARCHIVE",
    labelRo: "ARHIVA",
  },
} satisfies Record<string, DeepDiveTheme>;
