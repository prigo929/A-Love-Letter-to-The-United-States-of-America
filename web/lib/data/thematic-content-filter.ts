// ─── Deep-Dive Thematic Content Policy ───────────────────────────────────────
// Curated, auditable filter for the in-depth thematic archive.
//
// It removes whole topics and individual sections/subsections that present
// controversial, negative, or left-leaning critiques OF America.
//
// It INTENTIONALLY KEEPS:
//   • conservative / free-market / originalist critiques (of socialism, big
//     government, judicial activism, the "living constitution," dependency)
//   • neutral historical wars, conflicts, and westward expansion
//   • factual constitutional-law doctrines ("Limitations," "Restraints,"
//     "Enumerated Powers," exceptions) and technical/scientific limitations
//   • adversary wrongdoing (e.g. Taliban atrocities)
//   • the structural "Weaknesses of the Articles of Confederation" (which makes
//     the pro-Constitution case)
//
// Matching is EXACT (case-insensitive, trimmed) on the English heading — so it
// can never collide on substrings the way the previous keyword scan did
// (e.g. "strain" ⊂ "Constraints", "loss" ⊂ "Losses", "critic" ⊂ "Critical").

import type { ThematicTopic } from "./verticals-thematic-data";

// Whole topics removed entirely (matched on topic id).
const DENYLISTED_TOPIC_IDS: string[] = [
  "American_imperialism",
  "United_States_involvement_in_regime_change",
];

// Sections / subsections removed (matched on exact English heading).
const DENYLISTED_HEADINGS: string[] = [
  "Broader Policy Critiques",
  "Casualties and Atrocities",
  "Casualties, Atrocities, and Humanitarian Costs",
  "Challenges, Controversies, and Criticisms",
  "Concerns Over Genetic Privacy and Discrimination",
  "Controversies",
  "Controversies Over Noncitizens and Felons",
  "Controversies and Alternative Viewpoints",
  "Controversies and Alternative Views",
  "Controversies and Challenges",
  "Controversies and Criticisms",
  "Controversies and Debates",
  "Controversies and Disputes",
  "Controversies and Empirical Assessments",
  "Controversies and Ethical Debates",
  "Controversies and Legal Challenges",
  "Controversies and Responses",
  "Controversies and Strategic Debates",
  "Controversies and criticisms",
  "Controversies and product issues",
  "Controversies in Management",
  "Controversies, Criticisms, and Reforms",
  "Corporate Activism, DEI Policies, and Market Backlash",
  "Corporate Culture Evolution and Critiques",
  "Creative Quality Decline and Recent Project Failures",
  "Criticisms Regarding Founding Exclusions and Hypocrisy Claims",
  "Criticisms and Challenges",
  "Criticisms and Controversies",
  "Criticisms and Philosophical Debates",
  "Criticisms and Theoretical Debates",
  "Criticisms from Economic Theory",
  "Criticisms of Current Measures",
  "Criticisms of Monotony and Labor Discipline",
  "Criticisms of Pre-Space Force Underinvestment and Adversary Responses",
  "Criticisms of Secrecy Lapses and Espionage Oversights",
  "Criticisms of corporate strategy and innovation pace",
  "Criticisms: Limits of Intervention and Post-War Uprisings",
  "Critiques of Vague and Conflicting Goals",
  "Cultural and Ethical Critiques",
  "Economic Stimulus vs. Opportunity Costs and Critiques",
  "Economic Weaknesses and Policy Critiques",
  "Emissions, Resources, and Criticisms",
  "Energy Transition Strategies and Criticisms",
  "Environmental Policies and Criticisms of Implementation",
  "Environmental and Economic Controversies",
  "Environmental and Ethical Criticisms",
  "Expansion attempts and mobile market failures (2000s–2010s)",
  "Export of Soft Power and Cultural Imperialism Debates",
  "Factors in Strategic Failure: Nation-Building vs. Focused Objectives",
  "Failures and Blowback: Instability, Terrorism, and Economic Costs",
  "Health and Environmental Controversies",
  "Historical Scandals: Safety, Ideology, and Ethics",
  "Historical flaws: Pentium FDIV bug and recalls",
  "Ideological Shifts and Mission Prioritization Critiques",
  "Indigenous Criticisms and Counterperspectives",
  "Industrialization and 19th-20th Century Exploitation",
  "Inequality and Social Mobility",
  "Intellectual Property Strategies and Patent Controversies",
  "Internal Misconduct Scandals and Cultural Failures",
  "Key Controversies and Regulatory Battles",
  "Labor Disputes and Discrimination Claims",
  "Land Management Controversies",
  "Legal and Ethical Controversies: Constitutionality, International Law, and Sovereignty",
  "Long-Term Data on Growth, Inequality, and Dependency",
  "Major Controversies",
  "Major Criticisms",
  "Management and Controversies",
  "Microeconomic Impacts: Employment, Wages, and Inequality",
  "Modern Diversity Initiatives: Successes and Backlashes",
  "Operational Overreach and Resource Strain Critiques",
  "Policy Controversies: Restoration Projects, Diversions, and Federal Funding Cuts",
  "Political Endorsements and Public Backlash",
  "Politicization, Bias, and Integrity Issues",
  "Pollution Policies: Achievements, Failures, and Economic Costs",
  "Program Management Flaws, Accidents, and Human Costs",
  "Propaganda Efforts and Suppression of Dissent",
  "Public Support Myths and Ideological Criticisms",
  "Racial Bias Incidents and Internal Responses",
  "Safety Incidents and Mission Failures",
  "Strategic Debates and Controversies",
  "Sustainability and greenwashing allegations",
  "Unintended Consequences and Critiques",
  "Wealth Generation and Inequality",
];

const deniedTopicIds = new Set(DENYLISTED_TOPIC_IDS);
const deniedHeadings = new Set(
  DENYLISTED_HEADINGS.map((h) => h.trim().toLowerCase()),
);

function isDeniedHeading(heading: string | undefined): boolean {
  return deniedHeadings.has((heading || "").trim().toLowerCase());
}

/** Filters one vertical's topic list, returning fresh objects (no mutation). */
export function filterThematicTopics(topics: ThematicTopic[]): ThematicTopic[] {
  return topics
    .filter((topic) => !deniedTopicIds.has(topic.id))
    .map((topic) => ({
      ...topic,
      sections: topic.sections
        .filter((section) => !isDeniedHeading(section.heading.en))
        .map((section) => ({
          ...section,
          subsections: section.subsections.filter(
            (sub) => !isDeniedHeading(sub.heading.en),
          ),
        })),
    }));
}

/** Applies the content policy across every vertical. Pure — input untouched. */
export function filterThematicData(
  data: Record<string, ThematicTopic[]>,
): Record<string, ThematicTopic[]> {
  const out: Record<string, ThematicTopic[]> = {};
  for (const key of Object.keys(data)) {
    out[key] = filterThematicTopics(data[key]);
  }
  return out;
}
