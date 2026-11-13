"use server";

import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";

export interface OracleResponse {
  response: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface KnowledgeItem {
  keywords: string[];
  responseEn: string;
  responseRo: string;
  cta: {
    labelEn: string;
    labelRo: string;
    href: string;
  };
}

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    keywords: ["constitution", "founding", "government", "liberty", "rights", "federalist", "revolu", "constitu"],
    responseEn: "America's founding was built on the core principle of a constitutional republic with limited government power. The Federalist Papers outlined a system of checks and balances where division of powers prevents tyranny, while the Bill of Rights safeguards individual liberty as inherent, natural rights.",
    responseRo: "Fondarea Americii s-a bazat pe principiul unei republici constituționale cu o guvernare limitată. Scrierile Federalist Papers au detaliat un sistem de control și echilibru în care separarea puterilor previne tirania, iar Carta Drepturilor protejează libertatea individuală ca drepturi naturale.",
    cta: {
      labelEn: "Explore Constitution & Founding →",
      labelRo: "Explorează Constituția și Fondarea →",
      href: "/constitution",
    },
  },
  {
    keywords: ["economy", "dollar", "gdp", "capital", "markets", "wall street", "finance", "trade", "economie", "moneda"],
    responseEn: "The U.S. economy is the world's largest, currently valued at $32.4 Trillion. Capital markets (NYSE and NASDAQ) represent the most liquid and deep investment pools globally. The U.S. dollar operates as the primary global reserve currency, backing over 60% of central bank reserves and securing international trade networks.",
    responseRo: "Economia SUA este cea mai mare din lume, evaluată în prezent la 32,4 trilioane de dolari. Piețele de capital (NYSE și NASDAQ) reprezintă cele mai lichide bazine de investiții la nivel global, iar dolarul american este principala monedă de rezervă, acoperind peste 60% din rezervele băncilor centrale.",
    cta: {
      labelEn: "Explore U.S. Capital & GDP →",
      labelRo: "Explorează Capitalul și PIB-ul SUA →",
      href: "/economy",
    },
  },
  {
    keywords: ["sports", "nfl", "nba", "mlb", "football", "super bowl", "basketball", "baseball", "ncaa", "sport"],
    responseEn: "American sports culture represents a massive soft-power export. The NFL's Super Bowl attracts over 100 million domestic viewers, acting as a de facto cultural holiday. Meanwhile, the NBA's global reach shapes street fashion and lifestyle trends across all continents, and the NCAA mobilizes local communities around colossal university stadiums.",
    responseRo: "Cultura sportivă americană reprezintă un export masiv de soft-power. Super Bowl-ul NFL atrage peste 100 de milioane de telespectatori, funcționând ca o sărbătoare națională, în timp ce NBA influențează moda și stilul urban pe toate continentele, iar NCAA adună comunitățile pe stadioane universitare gigantice.",
    cta: {
      labelEn: "Explore American Sports & Soft Power →",
      labelRo: "Explorează Sportul American și Soft Power →",
      href: "/culture/sports",
    },
  },
  {
    keywords: ["innovation", "technology", "internet", "iphone", "ai", "tech", "silicon valley", "space", "spacex", "cloud", "inovat"],
    responseEn: "From the invention of the ARPANET (the precursor to the Internet) to the personal computer revolution, the smartphone, and today's cutting-edge AI breakthroughs led by Silicon Valley (OpenAI, Google, Anthropic), the United States serves as the primary engine of global technological advancement.",
    responseRo: "De la crearea ARPANET (precursorul Internetului) până la revoluția computerelor personale, smartphone-uri și inovațiile AI conduse de Silicon Valley (OpenAI, Google, Anthropic), Statele Unite servesc drept motor principal al progresului tehnologic global.",
    cta: {
      labelEn: "Explore Silicon Valley & Innovation →",
      labelRo: "Explorează Silicon Valley și Inovația →",
      href: "/innovation",
    },
  },
  {
    keywords: ["military", "navy", "force", "nato", "army", "defense", "bases", "armat", "baze"],
    responseEn: "The U.S. Armed Forces are the most capable military force in human history, backed by a $954 Billion defense budget. Global stability is sustained through 11 nuclear-powered aircraft carrier strike groups, over 800 overseas bases, and the NATO alliance, where the U.S. acts as the core security guarantor.",
    responseRo: "Forțele Armate ale SUA sunt cea mai capabilă forță militară din istoria omenirii, susținută de un buget de apărare de 954 miliarde de dolari. Stabilitatea globală este menținută prin 11 grupuri de atac cu portavion nuclear, peste 800 de baze externe și alianța NATO.",
    cta: {
      labelEn: "Explore Military & Air Power →",
      labelRo: "Explorează Armata și Forțele Aeriene →",
      href: "/military",
    },
  },
  {
    keywords: ["university", "stem", "ivy", "education", "science", "inventions", "universit", "stiint", "scoala", "liceu"],
    responseEn: "U.S. higher education dominates global rankings, housing top Ivy League institutions and massive public research powerhouses. American scientific labs have driven world-changing breakthroughs, including polio eradication, semiconductor transistors, and the sequencing of the human genome.",
    responseRo: "Învățământul superior din SUA domină clasamentele globale, găzduind universități de elită din Ivy League și centre de cercetare publică. Laboratoarele americane au condus descoperiri epocale, inclusiv vaccinul antipoliomielitic, tranzistorii și genomul uman.",
    cta: {
      labelEn: "Explore Universities & STEM →",
      labelRo: "Explorează Universitățile și STEM →",
      href: "/universities",
    },
  },
  {
    keywords: ["nature", "parks", "yellowstone", "alaska", "grand canyon", "conserv", "natur", "parc"],
    responseEn: "The modern conservation movement was born in America, leading to the creation of the world's first national park (Yellowstone) in 1872. Today, 63 national parks cover 85 million acres of protected wilderness, preserving the Arctic tundra of Alaska, the granite peaks of Yosemite, and the deep chasms of the Grand Canyon.",
    responseRo: "Mișcarea modernă de conservare s-a născut în America, ducând la crearea primului parc național din lume (Yellowstone, 1872). Astăzi, 63 de parcuri naționale protejează 85 de milioane de acri de sălbăticie, incluzând tundra arctică din Alaska, munții din Yosemite și Marele Canion.",
    cta: {
      labelEn: "Explore National Parks & Wilderness →",
      labelRo: "Explorează Parcurile Naționale și Natura →",
      href: "/nature/national-parks",
    },
  },
  {
    keywords: ["freedom", "speech", "religion", "press", "assembly", "arms", "first amendment", "second amendment", "libertat"],
    responseEn: "Individual liberty is the foundational bedrock of American society. The First Amendment protects freedom of speech, religion, and the press with unprecedented constitutional force, ensuring that the marketplace of ideas remains open, robust, and beyond government censorship.",
    responseRo: "Libertatea individuală este temelia societății americane. Primul Amendament protejează libertatea de exprimare, de cult și a presei cu o forță constituțională fără precedent, garantând un spațiu deschis pentru schimbul liber de idei.",
    cta: {
      labelEn: "Explore The Bill of Rights →",
      labelRo: "Explorează Carta Drepturilor →",
      href: "/constitution/bill-of-rights",
    },
  },
];

export async function askAmericaOracle(
  question: string,
  locale: string = "en"
): Promise<OracleResponse> {
  const isRo = locale === "ro";
  const cleanText = question.toLowerCase();

  const fallbackResponse = isRo
    ? "Statele Unite ale Americii continuă să fie un reper de libertate constituțională, forță economică, inovație tehnologică și putere geopolitică. Întrebați-mă despre Constituție, Economie, Tehnologie, Armată, Parcuri Naționale sau Sport."
    : "The United States of America continues to stand as a benchmark of constitutional liberty, economic scale, technological innovation, and geopolitical security. Ask me about the Constitution, Economy, Tech & AI, Military, National Parks, or Sports.";

  // Stop words to remove from query words
  const stopWords = new Set([
    "the", "a", "an", "is", "of", "and", "in", "to", "for", "with", "about",
    "on", "why", "what", "how", "who", "where", "explain", "describe", "tell",
    "me", "show", "are", "by", "from", "that", "this", "these", "those"
  ]);

  // Parse query into unique significant search words
  const queryWords = cleanText
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));

  let bestMatch: {
    topic: any;
    vertical: string;
    sectionHeading: string;
    paragraphText: string;
    score: number;
  } | null = null;

  const genericTopicWords = new Set(["united", "states", "america", "american", "the", "of", "to", "in", "and", "for"]);

  // 1. Search through the 52 Grokipedia deep-dives
  for (const [vertical, topics] of Object.entries(VERTICALS_THEMATIC_DATA)) {
    for (const topic of topics) {
      const titleEn = topic.title.en.toLowerCase();
      const titleRo = topic.title.ro.toLowerCase();
      const idName = topic.id.toLowerCase().replace(/_/g, " ");

      const titleWords = new Set(
        `${titleEn} ${titleRo} ${idName}`
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
          .split(/\s+/)
          .filter((word) => word.length > 2 && !genericTopicWords.has(word))
      );

      const matchedTitleWords = Array.from(titleWords).filter((w) =>
        queryWords.some((qw) => w.startsWith(qw) || qw.startsWith(w))
      );

      const titleMatched = matchedTitleWords.length > 0;

      let titleBoost = 0;
      if (titleMatched) {
        const fraction = titleWords.size > 0 ? matchedTitleWords.length / titleWords.size : 0.5;
        titleBoost = 10.0 + 10.0 * fraction;

        if (titleWords.size === 1) {
          titleBoost += 10.0;
        }
      }

      for (const section of topic.sections) {
        const secHeading = isRo ? section.heading.ro : section.heading.en;

        let introBoost = 0.0;
        const secHeadingLower = (secHeading || "").toLowerCase();
        if (
          secHeadingLower === "introduction" ||
          secHeadingLower === "introducere" ||
          secHeadingLower === "overview" ||
          secHeadingLower === "prezentare generală" ||
          secHeadingLower === "prezentare"
        ) {
          introBoost = 1.5;
        }

        for (const sub of section.subsections) {
          for (const para of sub.paragraphs) {
            const paraText = isRo ? para.ro : para.en;
            if (!paraText) continue;

            const paraLower = paraText.toLowerCase();
            const paraWords = paraLower
              .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ")
              .split(/\s+/);

            let score = 0;

            for (const word of queryWords) {
              const hasMatch = paraWords.some((pw) =>
                pw.length >= 3 && (pw.startsWith(word) || word.startsWith(pw))
              );
              if (hasMatch) {
                score += 1.0;
              }
            }

            const totalScore = score + titleBoost + introBoost;

            if (score > 0 && (!bestMatch || totalScore > bestMatch.score)) {
              bestMatch = {
                topic,
                vertical,
                sectionHeading: secHeading || (isRo ? topic.title.ro : topic.title.en),
                paragraphText: paraText,
                score: totalScore,
              };
            } else if (score > 0 && bestMatch && totalScore === bestMatch.score) {
              if (topic.id.length < bestMatch.topic.id.length) {
                bestMatch = {
                  topic,
                  vertical,
                  sectionHeading: secHeading || (isRo ? topic.title.ro : topic.title.en),
                  paragraphText: paraText,
                  score: totalScore,
                };
              }
            }
          }
        }
      }
    }
  }

  if (bestMatch && bestMatch.score >= 2) {
    return {
      response: isRo
        ? `Din arhiva noastră detaliată despre „${bestMatch.topic.title.ro}” (Secțiunea: ${bestMatch.sectionHeading}):\n\n„${bestMatch.paragraphText}”`
        : `From our detailed archive on "${bestMatch.topic.title.en}" (Section: ${bestMatch.sectionHeading}):\n\n"${bestMatch.paragraphText}"`,
      cta: {
        label: isRo
          ? `Citește documentul complet despre „${bestMatch.topic.title.ro}” →`
          : `Read full document on "${bestMatch.topic.title.en}" →`,
        href: `/${bestMatch.vertical}#deep-dive-${bestMatch.topic.id}`,
      },
    };
  }

  // 2. Fall back to exact title matching
  for (const [vertical, topics] of Object.entries(VERTICALS_THEMATIC_DATA)) {
    for (const topic of topics) {
      const titleEn = topic.title.en.toLowerCase();
      const titleRo = topic.title.ro.toLowerCase();
      const idName = topic.id.toLowerCase().replace(/_/g, " ");

      if (
        cleanText.includes(titleEn) ||
        cleanText.includes(titleRo) ||
        cleanText.includes(idName)
      ) {
        const firstSection = topic.sections[0];
        const firstSub = firstSection?.subsections[0];
        const firstPara = firstSub?.paragraphs[0];
        const introText = isRo ? firstPara?.ro : firstPara?.en;

        if (introText) {
          return {
            response: isRo
              ? `Conform arhivei noastre detaliate despre „${topic.title.ro}”:\n\n${introText}`
              : `According to our detailed archive on "${topic.title.en}":\n\n${introText}`,
            cta: {
              label: isRo
                ? `Citește documentul complet despre „${topic.title.ro}” →`
                : `Read full document on "${topic.title.en}" →`,
              href: `/${vertical}#deep-dive-${topic.id}`,
            },
          };
        }
      }
    }
  }

  // 3. Fall back to generic knowledge base
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((kw) => cleanText.includes(kw))) {
      return {
        response: isRo ? item.responseRo : item.responseEn,
        cta: {
          label: isRo ? item.cta.labelRo : item.cta.labelEn,
          href: item.cta.href,
        },
      };
    }
  }

  return { response: fallbackResponse };
}
