// ─── GDP & Scale Sub-Page ─────────────────────────────────────────────────────
// A deep-dive vertical focusing on the magnitude of the US economy.
//
// Pedagogical Goal:
// - To contextualize $32.4 trillion by comparing individual US states to 
//   entire G7 nations.
// - To demonstrate the historical resilience of American GDP.
//
// Beginner guide:
// - Most numbers and chart data come from lib/data/economy-data.ts
// - This file mostly decides page order, headings, and which reusable
//   components are used

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { GdpHistoryChart } from "@/components/data/GdpHistoryChart";
import { GdpBarChart } from "@/components/data/GdpBarChart";
import { GdpSectorsChart } from "@/components/data/GdpSectorsChart";
import { GdpDivergenceChart } from "@/components/data/GdpDivergenceChart";
import { GdpExpendituresChart } from "@/components/data/GdpExpendituresChart";
import { GdpGlobalComparisonChart } from "@/components/data/GdpGlobalComparisonChart";
import { GdpLaborComparisonChart } from "@/components/data/GdpLaborComparisonChart";
import { RdSpendingChart } from "@/components/data/RdSpendingChart";
import { GdpAnnualGrowthChart } from "@/components/data/GdpAnnualGrowthChart";
import { ExportsByCategoryChart } from "@/components/data/ExportsByCategoryChart";
import { LaborProductivityChart } from "@/components/data/LaborProductivityChart";
import { StateGdpMap } from "@/components/data/StateGdpMap";
import { DebtToGdpChart } from "@/components/data/DebtToGdpChart";
import { RealGdpPerCapitaChart } from "@/components/data/RealGdpPerCapitaChart";
import { DeficitToGdpChart } from "@/components/data/DeficitToGdpChart";
import { IndustrialProductionChart } from "@/components/data/IndustrialProductionChart";
import { ExportsImportsChart } from "@/components/data/ExportsImportsChart";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand, CountUp } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  GDP_COMPARISON,
  US_GDP_HISTORY,
  GDP_HISTORY_META,
  GDP_SERIES_META,
  GDP_PER_CAPITA,
  US_GDP_SECTORS,
  US_VS_G7_DIVERGENCE,
  US_GDP_EXPENDITURES,
  US_VS_WORLD_GDP_HISTORY,
  GDP_VS_LABOR_SECTORS,
  RD_SPENDING_BY_COUNTRY,
  US_ANNUAL_GDP_GROWTH,
  US_EXPORTS_BY_CATEGORY,
  LABOR_PRODUCTIVITY_COMPARISON,
  STATE_GDP,
  STATE_GDP_META,
  US_DEBT_TO_GDP,
  US_REAL_GDP_PER_CAPITA,
  US_FEDERAL_DEFICIT,
  US_INDUSTRIAL_PRODUCTION,
  US_EXPORTS_VS_IMPORTS,
  type GdpDataPoint,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "GDP & Scale | Economy",
  description:
    "$32.4 trillion GDP — the United States has been the world's largest economy for over 130 years. A deep dive into American economic scale, resilience, and dominance.",
  alternates: { canonical: "/economy/gdp-growth" },
};

// The five largest state economies, ranked as if they were countries.
//
// Dollar values are DERIVED from STATE_GDP (BEA via FRED) rather than restated
// here, because restating them is how they rotted: Florida was carried at $1.6T
// against an actual $1.83T, Illinois at $1.1T against $1.20T, Pennsylvania at
// $0.9T against $1.06T — and the map in this same section would have contradicted
// all three on screen.
//
// Ranks and comparisons are checked against IMF nominal GDP for 2026 (October 2025
// WEO — the same vintage as GDP_COMPARISON). Five of the six original claims here
// were false: California was said to be larger than Japan ($4.25T vs $4.38T), New
// York larger than Canada ($2.47T vs $2.51T), Florida larger than Mexico ($1.83T vs
// $2.12T), Illinois larger than Saudi Arabia ($1.20T vs $1.39T), Pennsylvania larger
// than Switzerland ($1.06T vs $1.15T). Each state is now paired with the largest
// economy it genuinely outproduces.
//
// Washington and Pennsylvania are dropped rather than guessed at: both fall below
// the 20th-largest economy, and I have no verified country figures down there.
const STATE_VS_NATION: { abbrev: string; rank: number; beats: string; beatsRo: string }[] = [
  { abbrev: "CA", rank: 6, beats: "India", beatsRo: "India" },
  { abbrev: "TX", rank: 8, beats: "Italy", beatsRo: "Italia" },
  { abbrev: "NY", rank: 12, beats: "Australia", beatsRo: "Australia" },
  { abbrev: "FL", rank: 16, beats: "Turkey", beatsRo: "Turcia" },
  { abbrev: "IL", rank: 20, beats: "Switzerland", beatsRo: "Elveția" },
];

export default async function GdpGrowthPage() {
  // Locale decides which copy block and which translated supporting arrays are
  // used for this request. The page itself stays server-rendered.
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "PIB și Dimensiune" : "GDP & Scale";
  // Terminal "by the numbers" section: three headline stats plus two editorial
  // insights, replacing the old wall of seven identical fact cards. The Texas
  // fact was dropped — the state-vs-nation table above already makes that point.
  const gdpStatTrio =
    locale === "ro"
      ? [
          { value: "80%", label: "din PIB provine din servicii cu valoare mare" },
          { value: "$21T", label: "cheltuieli de consum — depășesc întreg PIB-ul Chinei" },
          { value: "$900B+", label: "investiți anual în cercetare și dezvoltare — nr. 1 mondial" },
        ]
      : [
          { value: "80%", label: "of GDP comes from high-value services" },
          { value: "$21T", label: "in consumer spending — exceeds China's entire GDP" },
          { value: "$900B+", label: "invested in R&D every year — #1 on Earth" },
        ];
  const gdpInsights =
    locale === "ro"
      ? [
          {
            fact: "Cel mai mare producător de energie de pe Pământ",
            detail:
              "SUA produc mai mult petrol și gaze naturale decât orice altă națiune — un avantaj structural în costurile industriale și securitatea națională.",
          },
          {
            fact: "Productivitate pe oră în topul OCDE",
            detail:
              "Măsurată prin PIB pe oră lucrată, America depășește constant Germania, Regatul Unit și Japonia — de aceea salariile americane sunt printre cele mai mari din lume (vezi [Salarii & Productivitate](/quality-of-life/wages)).",
          },
        ]
      : [
          {
            fact: "The largest energy producer on Earth",
            detail:
              "The US pumps more oil and natural gas than any nation — a structural advantage in industrial costs and national security.",
          },
          {
            fact: "Top-tier OECD productivity per hour",
            detail:
              "Measured by GDP per hour worked, America consistently outperforms Germany, the UK, and Japan — which is why American wages are high (see [Wages & Productivity](/quality-of-life/wages)).",
          },
        ];
  // These local arrays let the page translate or swap a few facts without
  // editing the shared source data used elsewhere in the economy section.
  const stateRankings =
    // Both locales resolve from the same verified table. They used to disagree
    // with each other on the facts — the Romanian list claimed California was
    // larger than the United Kingdom while the English one claimed Japan, and
    // neither was true.
    STATE_VS_NATION.map((entry) => {
      const state = STATE_GDP.find((s) => s.abbrev === entry.abbrev)!;
      return {
        state: locale === "ro" ? state.nameRo : state.name,
        gdp: `$${(state.gdp / 1000).toFixed(2)}T`,
        rank: entry.rank,
        comparison:
          locale === "ro" ? `Mai mare decât ${entry.beatsRo}` : `Larger than ${entry.beats}`,
      };
    });
  // `copy` keeps all visible labels together so the JSX below reads more like
  // layout structure and less like a wall of inline strings.
  const copy =
    locale === "ro"
      ? {
          heroAlt: "Districtul financiar din New York",
          heroEyebrow: "PIB și Dimensiune",
          heroLead: "$32.4 TRILIOANE",
          heroAccent: "ȘI ÎN CREȘTERE",
          heroBody:
            "O domnie de 130 de ani în vârf. Prin fiecare criză, fiecare rival și fiecare predicție a declinului american — economia Statelor Unite nu doar că a rezistat. A dominat.",
          growthTitle: "Creșterea, an de an",
          growthBody:
            "Restul acestei pagini prezintă instantanee: cine este cel mai mare astăzi. Aceasta arată cum s-a ajuns acolo. Din 1929, când începe seria oficială, economia americană s-a mărit de douăzeci de ori în termeni reali — nu prin salturi, ci prin compunere, an după an, prin Marea Criză, un război mondial, două crize petroliere, o criză financiară și o pandemie.",
          growthChartTitle: "PIB-ul SUA din 1929",
          growthChartSubtitle: "Comută între real (inflația eliminată) și nominal",
          stateMapIntro:
            "Cifra națională ascunde cât de concentrată este: cinci state reprezintă aproximativ 41% din tot ce produce țara. Scara de mai jos este logaritmică — California produce de aproape nouăzeci de ori cât Vermont, iar pe o scară liniară toate statele în afară de primele trei ar dispărea în aceeași nuanță.",
          stateMapTitle: "PIB nominal pe state, 2025",
          stateMapSubtitle: "Treci cu mouse-ul peste un stat pentru producția sa și, unde se potrivește, țara de mărime comparabilă",
          worldTitle: "Statele Unite vs. lumea",
          worldBody:
            "Economia SUA nu este doar cea mai mare — operează într-o categorie complet diferită. La 32,4 trilioane de dolari, depășește PIB-urile cumulate ale Chinei (20,8T), Germaniei (5,4T) și Japoniei (4,4T). Asta înseamnă că următoarele trei mari economii, adunate, tot nu pot egala producția unei singure națiuni de 335 de milioane de oameni.",
          worldChartTitle: "PIB pe țări (2026, trilioane USD)",
          worldChartSubtitle:
            "Economia SUA depășește următoarele trei mari economii combinate",
          perCapitaTitle: "Per capita: oameni bogați, țară bogată",
          perCapitaBody:
            "Ceea ce face performanța SUA cu adevărat extraordinară este că dominația economică americană nu este doar o funcție a populației. Americanul mediu generează 94.400 USD în producție economică anuală — mai mult decât Germania (65.300), Regatul Unit (61.100), Franța (52.100) și incomparabil mai mult decât China (14.900). SUA sunt simultan cea mai mare și una dintre cele mai productive economii de pe Pământ.",
          perCapitaChartTitle: "PIB pe cap de locuitor după țară (2026, mii USD)",
          perCapitaChartSubtitle:
            "La 94.400 USD per persoană, americanul mediu produce mai mult decât orice altă mare națiune",
          worldValueLabel: "PIB (proiecție 2026, trilioane USD)",
          perCapitaValueLabel: "PIB pe cap de locuitor (proiecție 2026, mii USD)",
          prosperityTitle: "Arcul lung al prosperității americane",
          prosperityBody:
            "S&P 500 este cel mai urmărit indice bursier din lume — o fișă de evaluare în timp real a vitalității economice americane. Din 1980, a oferit un randament mediu anual de aproximativ 10,5%, transformând 1.000 USD în peste 40.000 USD. Fiecare prăbușire — dot-com, criza financiară, COVID — a fost urmată de o revenire la noi maxime. Nu este noroc; este rodul unui sistem care alocă în mod constant capitalul către utilizările sale cele mai productive.",
          prosperityChartTitle: "Indicele S&P 500 — 46 de ani de creștere neîntreruptă pe termen lung",
          prosperityChartSubtitle:
            "Fiecare scădere a fost temporară; fiecare revenire a fost reală",
          statesTitle: "State americane vs. națiuni",
          statesBody:
            "Poate cea mai remarcabilă ilustrare a dimensiunii economice americane: state individuale ale SUA depășesc națiuni importante întregi. California, Texas și New York sunt fiecare centre de putere economică globală în sine.",
          stateLabel: "Stat",
          stateGdpLabel: "PIB statal",
          globalRankLabel: "Rang global",
          comparisonLabel: "Comparație",
          globallyLabel: "la nivel global",
          statesSource:
            "Surse: Bureau of Economic Analysis (PIB pe state, 2025, via FRED); FMI World Economic Outlook (PIB pe țări, 2026)",
          growthPullLabel:
            "ani de creștere din ultimii 75 — o reziliență economică pe care nicio mare economie nu o egalează.",
          byNumbersEyebrow: "Amploarea, în cifre",
          byNumbersTitle: "Cifrele din spatele cifrelor",
          insightsEyebrow: "Avantaje structurale",
          quoteTitle: "Laureat Nobel pentru Economie, University of Chicago",
          backLink: "← Înapoi la prezentarea economiei",
          nextLink: "Piețe de Capital →",
          sectorsTitle: "Compoziția PIB: Servicii & Valoare Ridicată",
          sectorsBody: "Economia americană modernă este fundamental bazată pe servicii de înaltă valoare, finanțele, asigurările și serviciile profesionale/tehnice generând peste o treime din total. Cu toate acestea, SUA mențin o bază industrială colosală (3,0T$) care singură depășește producția totală a marii majorități a țărilor lumii.",
          sectorsChartTitle: "Valoarea adăugată pe sectoare (2025/2026, % din PIB)",
          sectorsChartSubtitle: "Un amestec de servicii avansate și producție industrială masivă",
          sectorsSource: "Biroul de Analiză Economică al SUA (BEA) 2026",
          divergenceTitle: "Marea Divergență: SUA vs. G7",
          divergenceBody: "De la criza financiară globală, Statele Unite s-au distanțat dramatic de partenerii săi din G7. Cu o bază de indexare la nivelul anului 2010 (100), economia reală a SUA a înregistrat o expansiune de 41%, în timp ce restul națiunilor din G7 (Germania, Japonia, Marea Britanie, Franța, Italia, Canada) au avansat în medie cu doar 19,5%. Această performanță reflectă dinamismul unic al piețelor de capital și flexibilitatea structurală a Americii.",
          divergenceChartTitle: "Indicele de creștere a PIB-ului real (2010 = 100)",
          divergenceChartSubtitle: "Comparație istorică între ritmul de creștere al SUA și media restului G7",
          divergenceSource: "Date de la OECD / FMI World Economic Outlook 2026",
          expendituresTitle: "Cheltuielile PIB: Consumul ca Motor",
          expendituresBody: "Din punct de vedere al utilizării resurselor, economia americană este condusă în mod covârșitor de consumul personal al gospodăriilor, care reprezintă 68,2% din PIB. Împreună cu investițiile private (17,5%) și cheltuielile publice (17,6%), acest sistem stimulează o cerere internă robustă. Deficitul comercial (-3,3%) reflectă absorbția masivă de importuri de către piața americană.",
          expendituresChartTitle: "Structura cheltuielilor PIB (2025/2026, % din PIB)",
          expendituresChartSubtitle: "Defalcarea standard a PIB după metoda cheltuielilor: C + I + G + NX",
          expendituresSource: "Biroul de Analiză Economică al SUA (BEA) 2026",
          comparisonTitle: "Destine Divergente: SUA vs. Marile Economii",
          comparisonBody: "În ultimii 45 de ani, harta economică globală s-a reconfigurat dramatic. În timp ce SUA au crescut constant de la 2,8 trilioane $ în 1980 la peste 32,4 trilioane $ în 2026, alte puteri au stagnat. De exemplu, în 1990, economia Japoniei reprezenta peste jumătate din cea a SUA (3,1T$ vs 5,9T$). Astăzi, Japonia a stagnat la 4,4 trilioane $, reprezentând mai puțin de 14% din economia americană. SUA și-au menținut supremația în fața ascensiunii Chinei și a stagnării Europei.",
          comparisonChartTitle: "Evoluția PIB nominal (1980–2026, trilioane USD)",
          comparisonChartSubtitle: "Comparație istorică între cele mai mari economii ale lumii",
          comparisonSource: "Sursă date: Baza de date FMI World Economic Outlook (Aprilie 2026)",
          laborTitle: "PIB vs. Forța de Muncă: Productivitatea pe Sectoare",
          laborBody: "Compararea ponderii unui sector în PIB (BEA) cu ponderea sa în forța de muncă (BLS) evidențiază diferențele structurale de productivitate. Sectorul financiar și cel imobiliar generează 21% din PIB utilizând doar 5,7% din totalul angajaților. În contrast, sectorul medical și cel educațional sunt mari creatori de locuri de muncă (16,4% din forța de muncă, reprezentând 26 de milioane de joburi) dar au o contribuție de doar 8,9% în PIB din cauza caracterului intensiv în muncă.",
          laborChartTitle: "Distribuția sectorială: Producție vs. Angajați",
          laborChartSubtitle: "Analiză comparativă a ponderii PIB-ului sectorial față de procentul din forța de muncă",
          laborSource: "Date combinate: BEA NIPA & BLS State of Employment 2026",
          rdTitle: "Investiția în Inovație: Cheltuielile de C&D ca % din PIB",
          rdBody: "Statele Unite investesc 3,50% din PIB în cercetare și dezvoltare — aproape 900 de miliarde de dolari anual. Aceasta le plasează pe locul 3 la nivel global în intensitatea C&D, dar pe locul 1 absolut în dolari absoluți. Puterea inovativă americană nu provine dintr-un program guvernamental central, ci dintr-un ecosistem de firme private, universități de top și startup-uri finanțate prin capital de risc care injectează capital în direcția celui mai mare randament.",
          rdChartTitle: "Cheltuieli globale de C&D ca % din PIB (GERD, 2024–2025)",
          rdSource: "Sursă: NSF/NCSES, OECD Main Science and Technology Indicators 2024–2025",
          growthRateTitle: "Reziliența Anuală: Creșterea Reală a PIB-ului (1970–2025)",
          growthRateBody: "Din 1970, economia americană a crescut în fiecare an, cu excepția a 8 recesiuni scurte definite de NBER. Ceea ce este remarcabil nu este că au existat recesiuni — toate economiile au — ci căt de rapid s-a recuperat SUA. COVID-19 a provocat o contracție de -2,2% în 2020; reboundul din 2021 a atins +5,8%, cel mai puternic avans în două decenii. Nicio altă economie de scara SUA nu a reușit aceeași recuperare.",
          growthRateChartTitle: "Rata anuală de creștere a PIB-ului real al SUA (1970–2025)",
          growthRateSource: "Surse: BEA NIPA, World Bank WDI | Recesiunile conform NBER",
          exportsTitle: "Motorul Exportului: ce vinde America lumii",
          exportsBody: "Deficitul comercial al SUA ascunde un adevăr important: Statele Unite exportă mărfuri de 2,18 trilioane de dolari pe an — de la petrol și gaze la avioane Boeing, semiconductori, produse farmaceutice și echipamente medicale. SUA sunt atât cel mai mare exportator mondial de petrol, cât și lider global în produse de înaltă tehnologie. Aceasta este o economie care produce pentru lume în sens literal.",
          exportsChartTitle: "Topul categoriilor de export ale SUA (2025, miliarde USD)",
          exportsSource: "Sursă: U.S. Census Bureau / BEA Raport FT-900 (2025 Annual)",
          productivityTitle: "Productivitatea Muncii: SUA conduce toate marile economii",
          productivityBody: "Măsurat în PIB pe oră lucrată ajustat cu puterea de cumpărare (PPP), americanul mediu produce 97,10 $/oră — mai mult decât Germania (93,8$), Franța (88,2$), Marea Britanie (78,1$) sau Japonia (56,3$). Aceasta este sursa structurală a salariilor americane ridicate: un muncitor mai productiv merită o plăti mai mare. Productivitatea superioară a SUA este rezultatul unei combinații unice de capital uman, investiții în tehnologie, piețe de capital flexibile și concurență intensă.",
          productivityChartTitle: "PIB pe oră lucrată (USD PPP, 2024)",
          productivitySource: "Sursă: OECD.Stat — GDP per Hour Worked, date 2024",
          debtTitle: "Datoria Publică: Finanțarea Superputerii",
          debtBody: "Ca procent din PIB, datoria federală a SUA a crescut de la 35% în 1970 la peste 122% în 2026. În timp ce cifrele absolute sunt masive, capacitatea unică a SUA de a emite datorie în propria monedă de rezervă globală oferă o flexibilitate fiscală de neegalat. Cu toate acestea, gestionarea acestei îndatorări reprezintă una dintre provocările structurale majore ale economiei moderne.",
          debtChartTitle: "Datoria Federală a SUA ca procent din PIB (1970–2026)",
          debtSource: "Sursă: Rezerva Federală FRED (GFDEGDQ188S)",
          gdpPerCapTitle: "Standardul de Viață: Creșterea PIB-ului Real pe Cap de Locuitor",
          gdpPerCapBody: "Dincolo de mărimea absolută a economiei, prosperitatea individuală contează cel mai mult. În termeni ajustați cu inflația (chained 2017 USD), PIB-ul pe cap de locuitor în SUA a crescut de la $25.900 în 1970 la peste $70.500 în 2026. Aceasta reprezintă o triplare a producției economice reale per persoană, reflectând eficiența crescută și progresul tehnologic pe parcursul a cinci decenii.",
          gdpPerCapChartTitle: "PIB real pe cap de locuitor în SUA (1970–2026, USD ajustat)",
          gdpPerCapSource: "Sursă: Bureau of Economic Analysis / FRED (A939RX0Q048SBEA)",
          deficitTitle: "Balanța Fiscală: Excedentele și Deficitele Bugetare ale SUA",
          deficitBody: "Urmărirea soldului bugetar federal ca procent din PIB arată perioadele de acumulare și utilizare a capitalului. Cu excepția surplusurilor din perioada 1998–2001, SUA a rulat deficite bugetare constante, care s-au adâncit în mod semnificativ în timpul Marii Recesiuni din 2008 (-9,8%) și al crizei pandemice din 2020 (-14,5%), stabilizându-se la aproximativ -5,8% din PIB în 2025.",
          deficitChartTitle: "Excedent / Deficit Bugetar Federal al SUA (1970–2025)",
          deficitSource: "Sursă: Biroul Administrării și Bugetului (OMB) / FRED (FYFSGDA188S)",
          indproTitle: "Producția Industrială: Capacitatea de Producție Fizică a Americii",
          indproBody: "Indicele Producției Industriale măsoară producția reală a fabricilor, minelor și utilităților din SUA. Deși economia s-a orientat puternic către servicii, capacitatea de producție industrială a SUA a crescut constant, fiind astăzi cu 172% mai mare decât în 1970. Acest lucru demonstrează că America își păstrează o infrastructură fizică masivă și o bază solidă de manufactură de înaltă tehnologie.",
          indproChartTitle: "Indicele Producției Industriale a SUA (1970–2026, Bază 2017=100)",
          indproSource: "Sursă: Consiliul Guvernatorilor al Rezervei Federale / FRED (INDPRO)",
          exportsImportsTitle: "Comerțul Global: Exporturile vs. Importurile SUA",
          exportsImportsBody:
            "Urmărirea fluxurilor comerciale arată amploarea integrării SUA în economia globală. Deși SUA rulează un deficit comercial structural începând cu anii 1970, volumul total al schimburilor comerciale a crescut masiv. În 2026, exporturile trimestriale au atins o rată anualizată de 3,5 trilioane $, în timp ce importurile au depășit 4,3 trilioane $, reflectând cererea masivă a consumatorilor americani și integrarea profundă a lanțurilor logistice globale.",
          exportsImportsChartTitle: "Exporturi vs. Importuri de Bunuri și Servicii ale SUA (1970–2026)",
          exportsImportsSource: "Sursă: Bureau of Economic Analysis (via FRED: EXPGS / IMPGS)",
        }
      : {
          heroAlt: "New York City financial district",
          heroEyebrow: "GDP & Scale",
          heroLead: "$32.4 TRILLION",
          heroAccent: "AND COUNTING",
          heroBody:
            "A 130-year reign at the top. Through every crisis, every challenger, every prediction of American decline — the United States economy has not just endured. It has dominated.",
          growthTitle: "The Growth, Year by Year",
        growthBody:
          "The rest of this page is snapshots: who is biggest today. This is how it got there. Since 1929, where the official series begins, the American economy has grown twenty times over in real terms — not in leaps, but by compounding, year after year, through the Depression, a world war, two oil shocks, a financial crisis, and a pandemic.",
        growthChartTitle: "U.S. GDP since 1929",
        growthChartSubtitle: "Toggle between real (inflation removed) and nominal",
        stateMapIntro:
          "The national figure hides how concentrated it is: five states account for roughly 41% of everything the country makes. The scale below is logarithmic — California produces nearly ninety times what Vermont does, and on a straight ramp every state but the largest three would vanish into the same shade.",
        stateMapTitle: "Nominal GDP by state, 2025",
        stateMapSubtitle: "Hover any state for its output and, where it lands, its country-sized peer",
        worldTitle: "The United States vs. The World",
          worldBody:
            "The US economy is not just the largest — it operates in a different category entirely. At $32.4 trillion, it exceeds the combined GDPs of China ($20.8T), Germany ($5.4T), and Japan ($4.4T). That means the three next-largest economies, added together, still cannot match the output of a single nation of 335 million people.",
          worldChartTitle: "GDP by Country (2026, USD Trillions)",
          worldChartSubtitle:
            "The US economy exceeds the next three largest economies combined",
          perCapitaTitle: "Per Capita: Rich People, Rich Country",
          perCapitaBody:
            "What makes the US achievement truly extraordinary is that its economic dominance is not simply a function of population size. The average American generates $94,400 in economic output per year — more than Germany ($65,300), the United Kingdom ($61,100), France ($52,100), and vastly more than China ($14,900). The US is simultaneously the largest AND one of the most productive economies on Earth.",
          perCapitaChartTitle: "GDP Per Capita by Country (2026, USD Thousands)",
          perCapitaChartSubtitle:
            "At $94,400 per person, the average American produces more than any major nation",
          worldValueLabel: "GDP (2026 projection, USD Trillions)",
          perCapitaValueLabel: "GDP per capita (2026 projection, USD Thousands)",
          prosperityTitle: "The Long Arc of American Prosperity",
          prosperityBody:
            "The S&P 500 is the world's most closely watched equity index — a real-time report card on American economic vitality. Since 1980, it has delivered an average annual return of approximately 10.5%, compounding $1,000 into over $40,000. Every crash — dot-com, financial crisis, COVID — was followed by recovery to new highs. This is not luck; it is the fruit of a system that consistently allocates capital to its most productive uses.",
          prosperityChartTitle: "S&P 500 Index — 46 Years of Unbroken Long-Term Growth",
          prosperityChartSubtitle: "Each dip was temporary; each recovery was real",
          statesTitle: "American States vs. Nations",
          statesBody:
            "Perhaps the most remarkable illustration of American economic scale: individual US states outperform entire major nations. California, Texas, and New York are each global economic powerhouses in their own right.",
          stateLabel: "State",
          stateGdpLabel: "State GDP",
          globalRankLabel: "Global Rank",
          comparisonLabel: "Comparison",
          globallyLabel: "globally",
          statesSource:
            "Sources: Bureau of Economic Analysis (state GDP, 2025, via FRED); IMF World Economic Outlook (country GDP, 2026)",
          growthPullLabel:
            "years of growth out of the last 75 — a record of economic resilience no major economy can match.",
          byNumbersEyebrow: "The scale, in numbers",
          byNumbersTitle: "The Numbers Behind the Numbers",
          insightsEyebrow: "Structural advantages",
          quoteTitle: "Nobel Laureate in Economics, University of Chicago",
          backLink: "← Back to Economy Overview",
          nextLink: "Capital Markets →",
          sectorsTitle: "GDP by Sector: Services & High-Value Industry",
          sectorsBody: "The modern U.S. economy is structurally service-oriented, with Finance, Insurance, Real Estate, and Professional/Technical Services generating over a third of total economic output. However, the U.S. also maintains a powerhouse manufacturing core ($3.0T) that outproduces almost every individual country on Earth.",
          sectorsChartTitle: "GDP Value Added by Sector (2025/2026, % of GDP)",
          sectorsChartSubtitle: "A combination of high-margin services and a massive industrial core",
          sectorsSource: "U.S. Bureau of Economic Analysis (BEA) 2026",
          divergenceTitle: "The Great Divergence: U.S. vs. G7",
          divergenceBody: "Since the 2008 financial crisis, the United States has steadily outperformed its G7 peers. When indexing real GDP to 2010 (100), the U.S. has expanded by 41%, whereas the average of the other G7 nations (Germany, Japan, UK, France, Italy, Canada) grew by only 19.5%. This gap illustrates the compounding impact of America's tech leadership, venture capital, and flexible labor markets.",
          divergenceChartTitle: "Real GDP Growth Index (2010 = 100)",
          divergenceChartSubtitle: "Historical tracking of U.S. real GDP growth vs. G7 average",
          divergenceSource: "OECD Data Explorer / IMF WEO 2026",
          expendituresTitle: "GDP Expenditures: Consumer as the Engine",
          expendituresBody: "By expenditure, the U.S. economy is powered by consumer spending (Personal Consumption Expenditures), which accounts for 68.2% of GDP. Adding gross private domestic investment (17.5%) and government spending (17.6%) drives a massive domestic market. The negative net exports balance (-3.3%) represents the U.S. consumer's vast absorption of global imports.",
          expendituresChartTitle: "GDP Composition by Expenditures (2025/2026, % of GDP)",
          expendituresChartSubtitle: "The standard NIPA macroeconomic breakdown: C + I + G + NX",
          expendituresSource: "U.S. Bureau of Economic Analysis (BEA) 2026",
          comparisonTitle: "Diverging Fortunes: U.S. vs. Global Peers",
          comparisonBody: "Over the past 45 years, the global economic map has been dramatically redrawn. While the U.S. has grown steadily from $2.86T in 1980 to over $32.4T in 2026, other advanced economies have faced long-term stagnation. In 1990, Japan's economy was more than half the size of the U.S. ($3.13T vs $5.96T); today, it stands at $4.4T—less than 14% of the U.S. economy. The U.S. has sustained its leadership through a mix of dynamic technology investment and capital efficiency.",
          comparisonChartTitle: "Nominal GDP Progression (1980–2026, USD Trillions)",
          comparisonChartSubtitle: "Historical comparison of the world's leading economic powers",
          comparisonSource: "Data Source: IMF World Economic Outlook Database (April 2026)",
          laborTitle: "GDP vs. Labor: Productivity by Sector",
          laborBody: "Comparing a sector's share of U.S. GDP (BEA) with its share of the labor force (BLS) highlights structural productivity differentials. The financial and real estate sectors generate 21% of total GDP while employing just 5.7% of total nonfarm payrolls. Conversely, healthcare and education are massive employment engines (16.4% of the workforce, representing 26 million employees) but contribute 8.9% of GDP due to their labor-intensive nature.",
          laborChartTitle: "Sector Allocation: Output vs. Employment",
          laborChartSubtitle: "Comparative analysis of sector GDP output share against labor force share",
          laborSource: "Combined Data: BEA NIPA & BLS State of Employment 2026",
          rdTitle: "The Innovation Investment: R&D Spending as % of GDP",
          rdBody: "The United States invests 3.50% of GDP in research and development — nearly $900 billion per year. This places the US 3rd globally in R&D intensity, but #1 in absolute dollars by a wide margin. American innovation firepower comes not from a centralized government program, but from a dense ecosystem of private firms, elite research universities, and venture-backed startups competing to deploy capital toward the highest return.",
          rdChartTitle: "Global R&D Spending as % of GDP (GERD, 2024–2025)",
          rdSource: "Source: NSF/NCSES, OECD Main Science and Technology Indicators 2024–2025",
          growthRateTitle: "Annual Resilience: Real GDP Growth Rate (1970–2025)",
          growthRateBody: "Since 1970, the US economy has grown in every year except 8 short NBER-defined recessions. What's remarkable is not that recessions occurred — all economies have them — but how fast the US recovered. COVID-19 caused a -2.2% contraction in 2020; the 2021 rebound hit +5.8%, the strongest advance in two decades. No other economy at US scale has matched the same recovery speed.",
          growthRateChartTitle: "US Annual Real GDP Growth Rate (1970–2025)",
          growthRateSource: "Sources: BEA NIPA, World Bank WDI | Recessions per NBER",
          exportsTitle: "The Export Engine: What America Sells the World",
          exportsBody: "The US trade deficit obscures an important truth: the United States exports $2.18 trillion in goods per year — from oil and gas to Boeing aircraft, semiconductors, pharmaceuticals, and medical equipment. The US is simultaneously the world's largest oil exporter and a global leader in high-technology goods. This is an economy that literally produces for the world.",
          exportsChartTitle: "Top US Goods Export Categories (2025, USD Billions)",
          exportsSource: "Source: U.S. Census Bureau / BEA FT-900 Report (2025 Annual)",
          productivityTitle: "Labor Productivity: The US Leads Every Major Economy",
          productivityBody: "Measured by GDP per hour worked at purchasing power parity, the average American generates $97.10/hour — more than Germany ($93.8), France ($88.2), the UK ($78.1), or Japan ($56.3). This is the structural reason US wages are high: a more productive worker commands higher pay. America's productivity edge comes from a unique combination of human capital investment, technology deployment, deep capital markets, and intense competition.",
          productivityChartTitle: "GDP per Hour Worked (USD PPP, 2024)",
          productivitySource: "Source: OECD.Stat — GDP per Hour Worked, 2024 data",
          debtTitle: "Public Debt: Funding the Superpower",
          debtBody: "As a percentage of GDP, U.S. federal debt has risen from 35% in 1970 to over 122% in 2026. While the absolute numbers are massive, the unique capacity of the U.S. to issue debt in its own global reserve currency provides unmatched fiscal flexibility. However, managing this leverage remains one of the major structural challenges of the modern economy.",
          debtChartTitle: "U.S. Federal Debt as a Percentage of GDP (1970–2026)",
          debtSource: "Source: Federal Reserve FRED (GFDEGDQ188S)",
          gdpPerCapTitle: "Standard of Living: Real GDP per Capita Growth",
          gdpPerCapBody: "Beyond absolute economic size, individual prosperity is what matters most. In inflation-adjusted terms (chained 2017 USD), U.S. GDP per capita has grown from $25,900 in 1970 to over $70,500 in 2026. This represents nearly a tripling of real economic output per person, reflecting five decades of technological advancement and rising productivity.",
          gdpPerCapChartTitle: "U.S. Real GDP per Capita (1970–2026, Adjusted USD)",
          gdpPerCapSource: "Source: Bureau of Economic Analysis / FRED (A939RX0Q048SBEA)",
          deficitTitle: "Fiscal Balance: The U.S. Federal Surplus & Deficit",
          deficitBody: "Tracking the federal budget balance as a percentage of GDP reveals the cycles of public capital accumulation and leverage. With the brief exception of the 1998–2001 surplus years, the U.S. has operated with ongoing federal deficits. These deficits widened significantly during the Great Recession in 2009 (-9.8%) and the COVID-19 response in 2020 (-14.5%), stabilizing around -5.8% of GDP by 2025.",
          deficitChartTitle: "U.S. Federal Surplus or Deficit as a Percentage of GDP (1970–2025)",
          deficitSource: "Source: Office of Management and Budget / FRED (FYFSGDA188S)",
          indproTitle: "Industrial Production: America's Physical Output Capacity",
          indproBody: "The Industrial Production Index measures the real output of manufacturing, mining, and electric/gas utilities in the United States. Even as the U.S. transitioned toward a services-dominant economy, its total industrial output has expanded consistently, standing 172% higher today than in 1970. This underscores the massive physical industrial base that America retains behind its technology and service sectors.",
          indproChartTitle: "U.S. Industrial Production Index (1970–2026, Base 2017=100)",
          indproSource: "Source: Board of Governors of the Federal Reserve System / FRED (INDPRO)",
          exportsImportsTitle: "Global Trade: U.S. Exports vs. Imports",
          exportsImportsBody:
            "Tracking trade flows reveals the scale of U.S. integration into the global economy. While the U.S. has run a structural trade deficit since the 1970s, overall trade volume has expanded dramatically. By 2026, quarterly exports reached an annualized rate of $3.5 trillion, while imports exceeded $4.3 trillion, reflecting robust consumer demand and deeply integrated global logistics chains.",
          exportsImportsChartTitle: "U.S. Exports vs. Imports of Goods & Services (1970–2026)",
          exportsImportsSource: "Source: Bureau of Economic Analysis (via FRED: EXPGS / IMPGS)",
        };

  return (
    <>
      <MacroStyles />
      <MacroHero 
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        eyebrow={copy.heroEyebrow}
        description={copy.heroBody}
        imageSrc={SITE_IMAGES.economyGrowth}
        imageAlt={copy.heroAlt}
      />

      {/* Main Content */}
      <div className="bg-[#000000] relative z-10 pb-32 pt-16">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 mb-24">
          <Breadcrumb
            items={[
              { label: breadcrumbEconomy, href: "/economy" },
              { label: pageLabel },
            ]}
          />
        </div>

        <div className="mx-auto max-w-[1600px] px-6 md:px-12 space-y-48">
          {/* The long run — the growth this page is named for */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.growthTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.growthBody}
            </p>
            <div className="my-24">
              <GdpHistoryChart
                data={US_GDP_HISTORY}
                title={copy.growthChartTitle}
                subtitle={copy.growthChartSubtitle}
                source={GDP_HISTORY_META.source}
                realBase={GDP_HISTORY_META.realBase}
              />
            </div>
          </section>


          {/* GDP Comparison */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.worldTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.worldBody}
            </p>
            <div className="my-24">
              <GdpBarChart
                data={GDP_COMPARISON}
                title={copy.worldChartTitle}
                subtitle={copy.worldChartSubtitle}
                source={`${GDP_SERIES_META.source} · ${GDP_SERIES_META.year} projection`}
                valueLabel={copy.worldValueLabel}
              />
            </div>
          </section>

          {/* GDP Global Comparison */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.comparisonTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.comparisonBody}
            </p>
            <div className="my-24">
              <GdpGlobalComparisonChart
                data={US_VS_WORLD_GDP_HISTORY}
                title={copy.comparisonChartTitle}
                subtitle={copy.comparisonChartSubtitle}
                source={copy.comparisonSource}
              />
            </div>
          </section>

          {/* GDP Per Capita */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.perCapitaTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.perCapitaBody}
            </p>
            <div className="my-24">
              <GdpBarChart
                data={GDP_PER_CAPITA.map(
                  (d): GdpDataPoint => ({
                    country: d.country,
                    gdp: d.gdpPerCapita,
                    flag: d.flag,
                    highlight: d.highlight,
                  }),
                )}
                title={copy.perCapitaChartTitle}
                subtitle={copy.perCapitaChartSubtitle}
                source="IMF World Economic Outlook 2026"
                valueSuffix="K"
                valueLabel={copy.perCapitaValueLabel}
              />
            </div>
          </section>

          {/* GDP Sector Composition */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.sectorsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.sectorsBody}
            </p>
            <div className="my-24">
              <GdpSectorsChart
                data={US_GDP_SECTORS}
                title={copy.sectorsChartTitle}
                subtitle={copy.sectorsChartSubtitle}
                source={copy.sectorsSource}
              />
            </div>
          </section>

          {/* GDP vs Labor Force Sector Comparison */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.laborTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.laborBody}
            </p>
            <div className="my-24">
              <GdpLaborComparisonChart
                data={GDP_VS_LABOR_SECTORS}
                title={copy.laborChartTitle}
                subtitle={copy.laborChartSubtitle}
                source={copy.laborSource}
              />
            </div>
          </section>

          {/* GDP Expenditure Components */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.expendituresTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.expendituresBody}
            </p>
            <div className="my-24">
              <GdpExpendituresChart
                data={US_GDP_EXPENDITURES}
                title={copy.expendituresChartTitle}
                subtitle={copy.expendituresChartSubtitle}
                source={copy.expendituresSource}
              />
            </div>
          </section>

          {/* GDP Divergence US vs G7 */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.divergenceTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.divergenceBody}
            </p>
            <div className="my-24">
              <GdpDivergenceChart
                data={US_VS_G7_DIVERGENCE}
                title={copy.divergenceChartTitle}
                subtitle={copy.divergenceChartSubtitle}
                source={copy.divergenceSource}
              />
            </div>
          </section>

          {/* R&D Spending */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.rdTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.rdBody}
            </p>
            <div className="my-24">
              <RdSpendingChart
                data={RD_SPENDING_BY_COUNTRY}
                title={copy.rdChartTitle}
                source={copy.rdSource}
              />
            </div>
          </section>

          {/* Annual GDP Growth Rate */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.growthRateTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.growthRateBody}
            </p>
            <div className="my-24">
              <GdpAnnualGrowthChart
                data={US_ANNUAL_GDP_GROWTH}
                title={copy.growthRateChartTitle}
                source={copy.growthRateSource}
              />
            </div>
          </section>

          {/* Export Engine */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.exportsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.exportsBody}
            </p>
            <div className="my-24">
              <ExportsByCategoryChart
                data={US_EXPORTS_BY_CATEGORY}
                title={copy.exportsChartTitle}
                source={copy.exportsSource}
              />
            </div>
          </section>

          {/* U.S. Exports vs Imports */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.exportsImportsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.exportsImportsBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <ExportsImportsChart
                data={US_EXPORTS_VS_IMPORTS}
                title={copy.exportsImportsChartTitle}
                source={copy.exportsImportsSource}
              />
            </div>
          </section>

          {/* Labor Productivity */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.productivityTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.productivityBody}
            </p>
            <div className="my-24">
              <LaborProductivityChart
                data={LABOR_PRODUCTIVITY_COMPARISON}
                title={copy.productivityChartTitle}
                source={copy.productivitySource}
              />
            </div>
          </section>

          {/* Public Debt */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.debtTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.debtBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <DebtToGdpChart
                data={US_DEBT_TO_GDP}
                title={copy.debtChartTitle}
                source={copy.debtSource}
              />
            </div>
          </section>

          {/* Real GDP per Capita */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.gdpPerCapTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.gdpPerCapBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <RealGdpPerCapitaChart
                data={US_REAL_GDP_PER_CAPITA}
                title={copy.gdpPerCapChartTitle}
                source={copy.gdpPerCapSource}
              />
            </div>
          </section>

          {/* Federal Deficit/Surplus */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.deficitTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.deficitBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <DeficitToGdpChart
                data={US_FEDERAL_DEFICIT}
                title={copy.deficitChartTitle}
                source={copy.deficitSource}
              />
            </div>
          </section>

          {/* Industrial Production */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.indproTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.indproBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <IndustrialProductionChart
                data={US_INDUSTRIAL_PRODUCTION}
                title={copy.indproChartTitle}
                source={copy.indproSource}
              />
            </div>
          </section>

          {/* State GDPs */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.statesTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.statesBody}
            </p>

            {/* The map carries all 51; the ranked list below it carries the
                global standing, which the map cannot show. */}
            <p className="macro-body max-w-4xl mb-10">
              {copy.stateMapIntro}
            </p>
            <div className="my-16">
              <StateGdpMap
                data={STATE_GDP}
                title={copy.stateMapTitle}
                subtitle={copy.stateMapSubtitle}
                source={STATE_GDP_META.source}
              />
            </div>

            <div className="grid gap-8 mt-16">
              {stateRankings.map((state, i) => (
                <div key={state.state} className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-white/10 pb-8 items-center">
                  <div className="font-macro-display text-3xl text-white">{state.state}</div>
                  <div className="font-macro-display text-3xl text-[#E8B923]">{state.gdp}</div>
                  <div>
                    <span className="macro-metadata border border-white/20 px-3 py-1 text-white">
                      #{state.rank} {copy.globallyLabel}
                    </span>
                  </div>
                  <div className="font-macro-body text-white/55 italic text-right">{state.comparison}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-right macro-metadata text-white/30">
              {copy.statesSource}
            </p>
          </section>

          {/* Featured pull-stat — one cinematic number instead of a card wall */}
          <section className="border-t border-white/5 pt-32">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display font-black leading-none tracking-tighter text-[clamp(72px,15vw,200px)]">
                <CountUp value={70} suffix=" / 75" />
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.growthPullLabel}</p>
            </div>
          </section>

          {/* By the numbers — headline stat trio */}
          <section className="border-t border-white/5 pt-32">
            <span className="macro-eyebrow">{copy.byNumbersEyebrow}</span>
            <h2 className="macro-section-title mt-6 mb-16">{copy.byNumbersTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {gdpStatTrio.map((stat) => (
                <MacroStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </section>

          {/* Two editorial insights */}
          <section className="pt-8">
            <span className="macro-eyebrow">{copy.insightsEyebrow}</span>
            <div className="mt-10 grid gap-16 md:grid-cols-2">
              {gdpInsights.map((insight) => (
                <MacroFact key={insight.fact} fact={insight.fact} detail={insight.detail} />
              ))}
            </div>
          </section>

          <div className="border-t border-white/5 pt-32 pb-16">
            <QuoteBlock
              quote={
                locale === "ro"
                  ? "Pe termen lung, libertatea economică și libertatea politică merg mână în mână. Piața liberă este singurul sistem care a scos vreodată mase mari de oameni din sărăcie."
                  : "In the long run, economic freedom and political freedom go hand in hand. The free market is the only system that has ever lifted masses of people out of poverty."
              }
              attribution="Milton Friedman"
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* Back nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-16 mt-32">
            <Link
              href="/economy"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {copy.backLink}
            </Link>
            <Link
              href="/economy/capital-markets"
              className="font-macro-mono text-sm uppercase tracking-widest text-[#E8B923] transition-colors hover:text-white"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
