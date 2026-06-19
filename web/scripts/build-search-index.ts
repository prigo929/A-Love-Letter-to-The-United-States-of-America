import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import thematic datasets
import { VERTICALS_THEMATIC_DATA } from "../lib/data/verticals-thematic-data.js";
import { THEMATIC_HISTORY_DATA } from "../lib/data/history-thematic-data.js";
import { WEAPON_SYSTEMS } from "../lib/data/military-data.js";
import { domesticBases } from "../lib/data/domestic-bases-data.js";
import { overseasBases } from "../lib/data/overseas-bases-data.js";
import { strategicBases } from "../lib/data/global-bases-data.js";
import { CONSTITUTION_CLAUSES, BILL_OF_RIGHTS } from "../lib/data/constitution-data.js";
import { CONSTITUTION_CLAUSES_RO, BILL_OF_RIGHTS_RO } from "../lib/data/constitution-data-ro.js";
import { STARTUP_ECOSYSTEMS } from "../lib/data/economy-data.js";
import { INVENTIONS_PRE_1890 } from "../lib/data/inventions-pre-1890-data.js";
import { INVENTIONS_1890_1945 } from "../lib/data/inventions-1890-1945-data.js";
import { INVENTIONS_POST_1991 } from "../lib/data/inventions-post-1991-data.js";

// Replicate localized nav menu indexing to keep constants import decoupled if needed,
// but since we want perfect parity, let's write localized titles & links here.
const NAV_ITEMS = [
  {
    en: { title: "Home", category: "Navigation", description: "America: The Greatest Nation homepage.", href: "/" },
    ro: { title: "Acasă", category: "Navigare", description: "Pagina principală a site-ului America: Cea Mai Mare Națiune.", href: "/" }
  },
  {
    en: { title: "Sitemap", category: "Navigation", description: "Complete directory of all pages and sections.", href: "/sitemap" },
    ro: { title: "Hartă site", category: "Navigare", description: "Directorul complet al tuturor paginilor și secțiunilor.", href: "/sitemap" }
  },
  {
    en: { title: "Ask America Oracle", category: "Navigation", description: "Interactive AI oracle loaded with data from all 12 verticals.", href: "/ask-america" },
    ro: { title: "Oracolul Ask America", category: "Navigare", description: "Oracol AI interactiv încărcat cu date din toate cele 12 verticale.", href: "/ask-america" }
  }
];

const VERTICAL_METADATA: Record<string, { en: string; ro: string }> = {
  culture: { en: "Culture", ro: "Cultură" },
  "quality-of-life": { en: "Quality of Life", ro: "Calitatea vieții" },
  "global-leadership": { en: "Global Leadership", ro: "Leadership global" },
  military: { en: "Military", ro: "Armată" },
  constitution: { en: "Constitution", ro: "Constituție" },
  nature: { en: "Nature", ro: "Natură" },
  demographics: { en: "Immigration & Demographics", ro: "Imigrație & Demografie" },
  economy: { en: "Economy", ro: "Economie" },
  innovation: { en: "Innovation", ro: "Inovare" }
};

const HISTORY_METADATA: Record<string, { en: string; ro: string }> = {
  "founding-principles": { en: "History - Founding Principles", ro: "Istorie - Principii Fondatoare" },
  "american-exceptionalism": { en: "History - American Exceptionalism", ro: "Istorie - Excepționalism American" },
  "frontier-and-expansion": { en: "History - Frontier & Expansion", ro: "Istorie - Frontiera și Expansiunea" },
  "union-and-liberty": { en: "History - Union & Liberty", ro: "Istorie - Uniune și Libertate" },
  "industrial-rise": { en: "History - Industrial Rise", ro: "Istorie - Ascensiunea Industrială" },
  "arsenal-of-democracy": { en: "History - Arsenal of Democracy", ro: "Istorie - Arsenalul Democrației" },
  "cold-war-and-anti-communism": { en: "History - Cold War", ro: "Istorie - Războiul Rece" },
  "the-american-dream": { en: "History - The American Dream", ro: "Istorie - Visul American" },
  "the-reagan-revolution": { en: "History - Reagan Revolution", ro: "Istorie - Revoluția Reagan" },
  "faith-family-and-community": { en: "History - Faith & Family", ro: "Istorie - Credință și Familie" },
  "free-markets-and-prosperity": { en: "History - Free Markets", ro: "Istorie - Piețe Libere" },
  "border-sovereignty-and-national-identity": { en: "History - Borders & Identity", ro: "Istorie - Frontiere și Identitate" },
  "post-9-11-america": { en: "History - Post-9/11 America", ro: "Istorie - America Post-9/11" },
  "constitutional-battles": { en: "History - Constitutional Battles", ro: "Istorie - Bătălii Constituționale" },
  "the-populist-era": { en: "History - The Populist Era", ro: "Istorie - Era Populistă" }
};

function cleanText(text: string): string {
  if (!text) return "";
  let clean = text.replace(/\[\d+\]/g, "").replace(/\s+/g, " ").trim();
  const sentences = clean.split(/[.!?]\s+/);
  if (sentences.length > 0 && sentences[0].length < 150) {
    return sentences[0] + (sentences[0].endsWith(".") ? "" : ".");
  }
  if (clean.length > 160) {
    return clean.slice(0, 157) + "...";
  }
  return clean;
}

function extractKeywords(title: string, category: string, text: string): string[] {
  const allText = `${title} ${category} ${text}`.toLowerCase();
  // Strip special chars
  const words = allText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ").split(/\s+/);
  // Keep unique words > 2 chars, filter duplicates
  return Array.from(new Set(words.filter(w => w.length > 2)));
}

interface SearchItem {
  title: string;
  category: string;
  description: string;
  href: string;
  keywords?: string[];
}

function generateIndex() {
  const indexEn: SearchItem[] = [];
  const indexRo: SearchItem[] = [];

  // 1. Navigation items
  for (const item of NAV_ITEMS) {
    indexEn.push({
      title: item.en.title,
      category: item.en.category,
      description: item.en.description,
      href: item.en.href,
      keywords: extractKeywords(item.en.title, item.en.category, item.en.description)
    });
    indexRo.push({
      title: item.ro.title,
      category: item.ro.category,
      description: item.ro.description,
      href: item.ro.href,
      keywords: extractKeywords(item.ro.title, item.ro.category, item.ro.description)
    });
  }

  // 2. Vertical Deep-Dives
  for (const [verticalKey, topics] of Object.entries(VERTICALS_THEMATIC_DATA)) {
    const meta = VERTICAL_METADATA[verticalKey] || { en: verticalKey, ro: verticalKey };
    const pathPrefix = verticalKey === "demographics" ? "/immigration-demographics" : `/${verticalKey}`;

    for (const topic of topics) {
      let descEn = "";
      let descRo = "";
      if (topic.sections && topic.sections[0]?.subsections && topic.sections[0].subsections[0]?.paragraphs) {
        descEn = topic.sections[0].subsections[0].paragraphs[0]?.en || "";
        descRo = topic.sections[0].subsections[0].paragraphs[0]?.ro || "";
      }

      const cleanEn = cleanText(descEn);
      const cleanRo = cleanText(descRo);
      const href = `${pathPrefix}#deep-dive-${topic.id}`;

      indexEn.push({
        title: topic.title.en,
        category: meta.en,
        description: cleanEn,
        href,
        keywords: extractKeywords(topic.title.en, meta.en, descEn)
      });

      indexRo.push({
        title: topic.title.ro,
        category: meta.ro,
        description: cleanRo,
        href,
        keywords: extractKeywords(topic.title.ro, meta.ro, descRo)
      });
    }
  }

  // 3. History Chapters
  for (const [chapterKey, topics] of Object.entries(THEMATIC_HISTORY_DATA)) {
    const meta = HISTORY_METADATA[chapterKey] || { en: `History - ${chapterKey}`, ro: `Istorie - ${chapterKey}` };
    const pathPrefix = `/history/${chapterKey}`;

    for (const topic of topics) {
      let descEn = "";
      let descRo = "";
      if (topic.sections && topic.sections[0]?.subsections && topic.sections[0].subsections[0]?.paragraphs) {
        descEn = topic.sections[0].subsections[0].paragraphs[0]?.en || "";
        descRo = topic.sections[0].subsections[0].paragraphs[0]?.ro || "";
      }

      const cleanEn = cleanText(descEn);
      const cleanRo = cleanText(descRo);
      const href = `${pathPrefix}#${topic.id}`;

      indexEn.push({
        title: topic.title.en,
        category: meta.en,
        description: cleanEn,
        href,
        keywords: extractKeywords(topic.title.en, meta.en, descEn)
      });

      indexRo.push({
        title: topic.title.ro,
        category: meta.ro,
        description: cleanRo,
        href,
        keywords: extractKeywords(topic.title.ro, meta.ro, descRo)
      });
    }
  }

  // 4. Weapon Systems
  for (const weapon of WEAPON_SYSTEMS) {
    // English
    indexEn.push({
      title: `${weapon.name} (${weapon.designation})`,
      category: "Military Weapons",
      description: cleanText(weapon.description),
      href: "/military#weapons",
      keywords: extractKeywords(weapon.name, "weapons", `${weapon.designation} ${weapon.category} ${weapon.tagline} ${weapon.description} ${weapon.significance}`)
    });

    // Romanian (Let's check if we can reconstruct the Romanian translation from helper logic)
    // Category: "Armament militar"
    // In military-data, we have custom switch statements. We'll replicate it or translate on the fly
    let roName = weapon.name;
    let roDesc = weapon.description;
    let roCategory = "Armament militar";
    
    if (weapon.id === "b21") {
      roDesc = "Cea mai avansată aeronavă construită vreodată. B-21 Raider a intrat în serviciu în 2023 ca singura aeronavă de generația a 6-a din lume.";
    } else if (weapon.id === "f35") {
      roDesc = "Cea mai capabilă aeronavă de luptă multirol din lume. F-35 este un supercomputer zburător — fuziunea senzorilor săi vede amenințările înainte ca adversarii să știe că există.";
    } else if (weapon.id === "ford") {
      roDesc = "Cea mai mare și mai puternică navă de război construită vreodată. Clasa Gerald R. Ford dispune de propulsie nucleară, catapultare electromagnetică și radar cu rețea fazată activă.";
    } else if (weapon.id === "virg") {
      roDesc = "Submarin de atac cu propulsie nucleară conceput pentru dominarea apelor adânci și a celor de coastă.";
    } else if (weapon.id === "sentinel") {
      roDesc = "Viitorul ICBM (rachetă balistică intercontinentală) al triadei nucleare a SUA, înlocuind venerabilul Minuteman III.";
    } else if (weapon.id === "patriot") {
      roDesc = "Cel mai testat sistem de apărare aeriană și împotriva rachetelor din lume. Capabil să intercepteze rachete balistice tactice, rachete de croazieră și aeronave avansate.";
    } else if (weapon.id === "himars") {
      roDesc = "Sistem de artilerie cu rachete de înaltă mobilitate și precizie extremă, dovedit în luptă.";
    } else if (weapon.id === "seals") {
      roDesc = "Principala forță de operațiuni speciale a Marinei SUA, capabilă de infiltrare aeriană, terestră și maritimă.";
    }

    indexRo.push({
      title: `${roName} (${weapon.designation})`,
      category: roCategory,
      description: cleanText(roDesc),
      href: "/military#weapons",
      keywords: extractKeywords(roName, roCategory, `${weapon.designation} ${weapon.category} ${roDesc}`)
    });
  }

  // 5. Military Bases
  // Normalize domestic, overseas, and strategic bases
  const normalizedBases: {
    name: string;
    branch: string;
    location: string;
    description: string;
  }[] = [];

  for (const b of domesticBases) {
    normalizedBases.push({
      name: b.name,
      branch: b.branch,
      location: b.state || "",
      description: b.description || ""
    });
  }

  for (const b of overseasBases) {
    normalizedBases.push({
      name: b.name,
      branch: b.branch,
      location: b.country || "",
      description: b.description || ""
    });
  }

  for (const b of strategicBases) {
    normalizedBases.push({
      name: b.Name,
      branch: b["Primary Branch"],
      location: b.Country || b.Region || "",
      description: b["Strategic Rationale"] || b["Operational Focus"] || ""
    });
  }

  for (const base of normalizedBases) {
    // English
    indexEn.push({
      title: base.name,
      category: `Military - ${base.branch} Base`,
      description: cleanText(base.description),
      href: "/military/global-bases",
      keywords: extractKeywords(base.name, `base ${base.branch}`, `${base.location} ${base.description}`)
    });

    // Romanian (Translate simple terms on the fly)
    let roBranch = base.branch;
    if (base.branch === "Navy") roBranch = "Marină";
    else if (base.branch === "Air Force") roBranch = "Forțe Aeriene";
    else if (base.branch === "Space Force") roBranch = "Forțe Spațiale";
    else if (base.branch === "Marine Corps") roBranch = "Infanterie Marină";
    else if (base.branch === "Joint") roBranch = "Comună";
    else if (base.branch === "Army") roBranch = "Armată";

    let roDesc = base.description
      .replace("Headquarters of the", "Sediul central al")
      .replace("United States Department of Defense", "Departamentului Apărării al Statelor Unite")
      .replace("Historic deep-water naval base", "Bază navală istorică în ape adânci")
      .replace("Home of the", "Găzduiește")
      .replace("Home to", "Găzduiește")
      .replace("Vital satellite tracking", "Urmărire vitală a sateliților")
      .replace("Premier", "Principalul hub")
      .replace("Massive", "Masiv")
      .replace("Critical sovereign forward-staging area", "Zonă suverană critică de pregătire avansată");

    indexRo.push({
      title: base.name,
      category: `Armată - Bază ${roBranch}`,
      description: cleanText(roDesc),
      href: "/military/global-bases",
      keywords: extractKeywords(base.name, `bază ${roBranch}`, `${base.location} ${roDesc}`)
    });
  }

  // 6. Constitutional Clauses & Amendments
  // English Clauses
  for (const c of CONSTITUTION_CLAUSES) {
    indexEn.push({
      title: `${c.name} (${c.article})`,
      category: "Constitutional Clause",
      description: cleanText(c.summary),
      href: "/constitution",
      keywords: extractKeywords(c.name, "constitution clause article", `${c.originalText} ${c.summary} ${c.impactUS}`)
    });
  }
  // Romanian Clauses
  for (const c of CONSTITUTION_CLAUSES_RO) {
    indexRo.push({
      title: `${c.name} (${c.article})`,
      category: "Clauză Constituțională",
      description: cleanText(c.summary),
      href: "/constitution",
      keywords: extractKeywords(c.name, "constituție clauză articol", `${c.originalText} ${c.summary} ${c.impactUS}`)
    });
  }

  // English Amendments (Bill of Rights)
  for (const a of BILL_OF_RIGHTS) {
    const href = a.deepDiveHref || "/constitution/bill-of-rights";
    indexEn.push({
      title: `Amendment ${a.romanNumeral}: ${a.name}`,
      category: "Bill of Rights",
      description: cleanText(a.oneliner),
      href,
      keywords: extractKeywords(`amendment ${a.romanNumeral} ${a.name}`, "bill of rights constitution", `${a.originalText} ${a.oneliner} ${a.whatItMeans.join(" ")}`)
    });
  }
  // Romanian Amendments (Bill of Rights)
  for (const a of BILL_OF_RIGHTS_RO) {
    const href = a.deepDiveHref || "/constitution/bill-of-rights";
    indexRo.push({
      title: `Amendamentul ${a.romanNumeral}: ${a.name}`,
      category: "Declarația Drepturilor",
      description: cleanText(a.oneliner),
      href,
      keywords: extractKeywords(`amendamentul ${a.romanNumeral} ${a.name}`, "declarația drepturilor constituție", `${a.originalText} ${a.oneliner} ${a.whatItMeans.join(" ")}`)
    });
  }

  // 7. Startup Ecosystems
  for (const eco of STARTUP_ECOSYSTEMS) {
    indexEn.push({
      title: `${eco.city}, ${eco.state}`,
      category: "Startup Ecosystem",
      description: `${eco.nickname} — ${eco.vcFunding} VC funding, ${eco.unicorns} unicorns. Key companies: ${eco.keyCompanies.join(", ")}.`,
      href: "/economy",
      keywords: extractKeywords(eco.city, "startup ecosystem venture capital", `${eco.nickname} ${eco.state} ${eco.keyCompanies.join(" ")}`)
    });

    // Romanian Startup Ecosystem
    let roNickname = eco.nickname
      .replace("The VC Capital of Earth", "Capitala VC a Pământului")
      .replace("Finance & Media Hub", "Hub financiar și media")
      .replace("Biotech & DeepTech", "Biotech și deep tech")
      .replace("Cloud & E-Commerce", "Cloud și e-commerce")
      .replace("Silicon Hills", "Silicon Hills")
      .replace("Crypto & LatAm Gateway", "Poarta către cripto și America Latină");

    let roFunding = eco.vcFunding
      .replace("$", "")
      .replace("B+", " mld. $ +")
      .replace("annually", "anual");

    const descRo = `${roNickname} — Finanțare VC de ${roFunding}, ${eco.unicorns} unicorni. Companii cheie: ${eco.keyCompanies.join(", ")}.`;

    indexRo.push({
      title: `${eco.city}, ${eco.state}`,
      category: "Ecosistem de Startup-uri",
      description: descRo,
      href: "/economy",
      keywords: extractKeywords(eco.city, "ecosistem startup capital risc", `${roNickname} ${eco.state} ${eco.keyCompanies.join(" ")}`)
    });
  }

  // 8. Inventions
  // Pre-1890 Inventions
  for (const inv of INVENTIONS_PRE_1890) {
    indexEn.push({
      title: inv.name.en,
      category: "Inventions (Pre-1890)",
      description: `Year: ${inv.year}. ${cleanText(inv.description.en)}`,
      href: `/science/inventions-pre-1890?q=${encodeURIComponent(inv.name.en.toLowerCase())}`,
      keywords: extractKeywords(inv.name.en, "invention pre-1890 history science", `${inv.year} ${inv.description.en} ${inv.era.en}`)
    });
    indexRo.push({
      title: inv.name.ro,
      category: "Invenții (Înainte de 1890)",
      description: `Anul: ${inv.year}. ${cleanText(inv.description.ro)}`,
      href: `/science/inventions-pre-1890?q=${encodeURIComponent(inv.name.ro.toLowerCase())}`,
      keywords: extractKeywords(inv.name.ro, "invenție pre-1890 istorie știință", `${inv.year} ${inv.description.ro} ${inv.era.ro}`)
    });
  }

  // 1890-1945 Inventions
  for (const inv of INVENTIONS_1890_1945) {
    indexEn.push({
      title: inv.name.en,
      category: "Inventions (1890-1945)",
      description: `Year: ${inv.year}. ${cleanText(inv.description.en)}`,
      href: `/science/inventions-1890-1945?q=${encodeURIComponent(inv.name.en.toLowerCase())}`,
      keywords: extractKeywords(inv.name.en, "invention 1890-1945 history science", `${inv.year} ${inv.description.en} ${inv.era.en}`)
    });
    indexRo.push({
      title: inv.name.ro,
      category: "Invenții (1890-1945)",
      description: `Anul: ${inv.year}. ${cleanText(inv.description.ro)}`,
      href: `/science/inventions-1890-1945?q=${encodeURIComponent(inv.name.ro.toLowerCase())}`,
      keywords: extractKeywords(inv.name.ro, "invenție 1890-1945 istorie știință", `${inv.year} ${inv.description.ro} ${inv.era.ro}`)
    });
  }

  // Post-1991 Inventions
  for (const inv of INVENTIONS_POST_1991) {
    indexEn.push({
      title: inv.name.en,
      category: "Inventions (Post-1991)",
      description: `Year: ${inv.year}. ${cleanText(inv.description.en)}`,
      href: `/science/inventions-post-1991?q=${encodeURIComponent(inv.name.en.toLowerCase())}`,
      keywords: extractKeywords(inv.name.en, "invention post-1991 modern technology science", `${inv.year} ${inv.description.en} ${inv.era.en}`)
    });
    indexRo.push({
      title: inv.name.ro,
      category: "Invenții (După 1991)",
      description: `Anul: ${inv.year}. ${cleanText(inv.description.ro)}`,
      href: `/science/inventions-post-1991?q=${encodeURIComponent(inv.name.ro.toLowerCase())}`,
      keywords: extractKeywords(inv.name.ro, "invenție după 1991 tehnologie modernă știință", `${inv.year} ${inv.description.ro} ${inv.era.ro}`)
    });
  }

  // Output formatting
  const outputPath = path.join(process.cwd(), "lib/data/precompiled-search-index.ts");
  const outputContent = `// ─── Precompiled Localized Search Index ──────────────────────────────────────
// Auto-generated by build-search-index.ts — DO NOT EDIT MANUALLY

export interface SearchItem {
  title: string;
  category: string;
  description: string;
  href: string;
  keywords?: string[];
}

export const SEARCH_INDEX_EN: SearchItem[] = ${JSON.stringify(indexEn, null, 2)};

export const SEARCH_INDEX_RO: SearchItem[] = ${JSON.stringify(indexRo, null, 2)};
`;

  fs.writeFileSync(outputPath, outputContent, "utf-8");
  console.log(`Successfully precompiled search index to ${outputPath}.`);
  console.log(`English Index size: ${indexEn.length} items.`);
  console.log(`Romanian Index size: ${indexRo.length} items.`);
}

generateIndex();
