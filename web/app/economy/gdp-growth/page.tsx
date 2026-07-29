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
import { LaborProductivityChart } from "@/components/data/LaborProductivityChart";
import { StateGdpMap } from "@/components/data/StateGdpMap";
import { UnemploymentChart } from "@/components/data/UnemploymentChart";
import { DebtToGdpChart } from "@/components/data/DebtToGdpChart";
import { RealGdpPerCapitaChart } from "@/components/data/RealGdpPerCapitaChart";
import { DeficitToGdpChart } from "@/components/data/DeficitToGdpChart";
import { IndustrialProductionChart } from "@/components/data/IndustrialProductionChart";
import { SavingsRateChart } from "@/components/data/SavingsRateChart";
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
  LABOR_PRODUCTIVITY_COMPARISON,
  STATE_GDP,
  STATE_GDP_META,
  US_UNEMPLOYMENT,
  US_UNEMPLOYMENT_META,
  RECESSIONS,
  US_DEBT_TO_GDP,
  US_REAL_GDP_PER_CAPITA,
  US_FEDERAL_DEFICIT,
  US_INDUSTRIAL_PRODUCTION,
  US_SAVINGS_RATE,
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
            "Economia Statelor Unite a menținut poziția de lider mondial de peste 130 de ani, adaptându-se la transformări structurale și provocări globale.",
          growthTitle: "Creșterea, an de an",
          growthBody:
            "Această secțiune prezintă evoluția istorică a PIB-ului real din 1929 până în prezent. Economia americană s-a extins de peste douăzeci de ori în termeni reali prin acumulare constantă de capital și creștere a productivității.",
          growthChartTitle: "PIB-ul SUA din 1929",
          growthChartSubtitle: "Comută între real (inflația eliminată) și nominal",
          joblessTitle: "Dinamica pieței muncii",
          joblessBody:
            "Evoluția ratei șomajului reflectă dinamica pieței muncii. Rata șomajului s-a situat istoric între 4% și 6%, având o capacitate ridicată de redresare rapidă după șocuri economice.",
          joblessChartTitle: "Rata șomajului în SUA, din 1948",
          joblessChartSubtitle: "Lunar; zonele umbrite marchează recesiunile datate de NBER",
          stateMapIntro:
            "Producția economică națională este susținută semnificativ de marile state: primele cinci state reprezintă aproximativ 41% din PIB-ul total.",
          stateMapTitle: "PIB nominal pe state, 2025",
          stateMapSubtitle: "Treci cu mouse-ul peste un stat pentru producția sa și țara de mărime comparabilă",
          worldTitle: "Statele Unite vs. lumea",
          worldBody:
            "Economia SUA însumează 32,4 trilioane de dolari, depășind producția cumulată a Chinei (20,8T), Germaniei (5,4T) și Japoniei (4,4T).",
          worldChartTitle: "PIB pe țări (2026, trilioane USD)",
          worldChartSubtitle:
            "Economia SUA depășește următoarele trei mari economii combinate",
          perCapitaTitle: "Productivitate și PIB per Capita",
          perCapitaBody:
            "Americanul mediu generează 94.400 USD în producție economică anuală, depășind Germania (65.300 USD), Regatul Unit (61.100 USD) și Franța (52.100 USD).",
          perCapitaChartTitle: "PIB pe cap de locuitor după țară (2026, mii USD)",
          perCapitaChartSubtitle:
            "La 94.400 USD per persoană, producția per capita a SUA se află la un nivel superior marilor economii",
          worldValueLabel: "PIB (proiecție 2026, trilioane USD)",
          perCapitaValueLabel: "PIB pe cap de locuitor (proiecție 2026, mii USD)",
          prosperityTitle: "Evoluția piețelor financiare",
          prosperityBody:
            "Indicele S&P 500 reflectă evoluția marilor companii americane. Din 1980 până în prezent, a înregistrat un randament mediu anual de aproximativ 10,5%.",
          prosperityChartTitle: "Indicele S&P 500: Evoluția pe termen lung (1980–2026)",
          prosperityChartSubtitle:
            "Revenire constantă la noi maxime pe termen lung",
          statesTitle: "State americane vs. națiuni",
          statesBody:
            "State individuale ale SUA au o producție comparabilă cu economii naționale majore. California, Texas și New York reprezintă centre economice globale de sine stătătoare.",
          stateLabel: "Stat",
          stateGdpLabel: "PIB statal",
          globalRankLabel: "Rang global",
          comparisonLabel: "Comparație",
          globallyLabel: "la nivel global",
          statesSource:
            "Surse: Bureau of Economic Analysis (PIB pe state, 2025, via FRED); FMI World Economic Outlook (PIB pe țări, 2026)",
          growthPullLabel:
            "ani de expansiune economică în ultimele șapte decenii.",
          byNumbersEyebrow: "Amploarea, în cifre",
          byNumbersTitle: "Cifrele din spatele cifrelor",
          insightsEyebrow: "Avantaje structurale",
          quoteTitle: "Laureat Nobel pentru Economie, University of Chicago",
          backLink: "← Înapoi la prezentarea economiei",
          nextLink: "Piețe de Capital →",
          sectorsTitle: "Compoziția PIB: Servicii și Baza Industrială",
          sectorsBody: "Economia americană este bazată pe servicii de înaltă valoare, finanțele, asigurările și serviciile tehnice generând peste o treime din total, alături de o bază industrială de 3,0T$.",
          sectorsChartTitle: "Valoarea adăugată pe sectoare (2025/2026, % din PIB)",
          sectorsChartSubtitle: "Servicii avansate și producție industrială",
          sectorsSource: "Biroul de Analiză Economică al SUA (BEA) 2026",
          divergenceTitle: "Creșterea economică: SUA vs. G7",
          divergenceBody: "După 2010, economia reală a SUA a crescut cu 41%, depășind media de 19,5% a celorlalte națiuni din G7 datorită inovației tehnologice și piețelor eficiente de capital.",
          divergenceChartTitle: "Indicele de creștere a PIB-ului real (2010 = 100)",
          divergenceChartSubtitle: "Comparație istorică între ritmul de creștere al SUA și media restului G7",
          divergenceSource: "Date de la OECD / FMI World Economic Outlook 2026",
          expendituresTitle: "Cheltuielile PIB: Consumul Intern",
          expendituresBody: "Consumul personal al gospodăriilor reprezintă 68,2% din PIB, fiind completat de investițiile private (17,5%) și cheltuielile publice (17,6%).",
          expendituresChartTitle: "Structura cheltuielilor PIB (2025/2026, % din PIB)",
          expendituresChartSubtitle: "Defalcarea PIB după metoda cheltuielilor: C + I + G + NX",
          expendituresSource: "Biroul de Analiză Economică al SUA (BEA) 2026",
          comparisonTitle: "Traiectoria PIB: SUA vs. Marile Economii",
          comparisonBody: "Din 1980, PIB-ul SUA a crescut de la 2,8 trilioane $ la peste 32,4 trilioane $, menținând o traiectorie ascendentă comparativ cu alte economii dezvoltate.",
          comparisonChartTitle: "Evoluția PIB nominal (1980–2026, trilioane USD)",
          comparisonChartSubtitle: "Comparație istorică între cele mai mari economii ale lumii",
          comparisonSource: "Sursă date: Baza de date FMI World Economic Outlook (Aprilie 2026)",
          laborTitle: "PIB vs. Forța de Muncă: Productivitatea pe Sectoare",
          laborBody: "Sectorul financiar și imobiliar generează 21% din PIB utilizând 5,7% din totalul angajaților, în timp ce sectorul medical și cel educațional reprezintă mari angajatori (16,4% din forța de muncă).",
          laborChartTitle: "Distribuția sectorială: Producție vs. Angajați",
          laborChartSubtitle: "Analiză comparativă a ponderii PIB-ului sectorial față de procentul din forța de muncă",
          laborSource: "Date combinate: BEA NIPA & BLS State of Employment 2026",
          rdTitle: "Cheltuielile de Cercetare și Dezvoltare",
          rdBody: "Statele Unite investesc 3,50% din PIB în cercetare și dezvoltare, reprezentând aproape 900 de miliarde de dolari anual în investiții din sectorul privat și universitar.",
          rdChartTitle: "Cheltuieli globale de C&D ca % din PIB (GERD, 2024–2025)",
          rdSource: "Sursă: NSF/NCSES, OECD Main Science and Technology Indicators 2024–2025",
          growthRateTitle: "Creșterea Reală a PIB-ului (1970–2025)",
          growthRateBody: "Ritmul de creștere anuală a PIB-ului real evidențiază capacitatea de redresare rapidă a economiei americane după perioade de recesiune.",
          growthRateChartTitle: "Rata anuală de creștere a PIB-ului real al SUA (1970–2025)",
          growthRateSource: "Surse: BEA NIPA, World Bank WDI | Recesiunile conform NBER",
          productivityTitle: "Productivitatea Muncii în SUA",
          productivityBody: "Măsurat în PIB pe oră lucrată ajustat cu puterea de cumpărare (PPP), americanul mediu produce 97,10 $/oră, depășind Germania (93,8$), Franța (88,2$) și Marea Britanie (78,1$).",
          productivityChartTitle: "PIB pe oră lucrată (USD PPP, 2024)",
          productivitySource: "Sursă: OECD.Stat — GDP per Hour Worked, date 2024",
          debtTitle: "Datoria Publică ca Procent din PIB",
          debtBody: "Ca procent din PIB, datoria federală a SUA a ajuns la 122% în 2026, fiind susținută de capacitatea de emisiune în moneda de rezervă globală.",
          debtChartTitle: "Datoria Federală a SUA ca procent din PIB (1970–2026)",
          debtSource: "Sursă: Rezerva Federală FRED (GFDEGDQ188S)",
          gdpPerCapTitle: "Creșterea PIB-ului Real pe Cap de Locuitor",
          gdpPerCapBody: "În termeni ajustați cu inflația, PIB-ul pe cap de locuitor în SUA a crescut de la 25.900 $ în 1970 la peste 70.500 $ în 2026.",
          gdpPerCapChartTitle: "PIB real pe cap de locuitor în SUA (1970–2026, USD ajustat)",
          gdpPerCapSource: "Sursă: Bureau of Economic Analysis / FRED (A939RX0Q048SBEA)",
          deficitTitle: "Balanța Bugetului Federal",
          deficitBody: "Urmărirea soldului bugetar federal reflectă ajustările fiscale de-a lungul deceniilor, stabilizându-se la aproximativ -5,8% din PIB în 2025.",
          deficitChartTitle: "Excedent / Deficit Bugetar Federal al SUA (1970–2025)",
          deficitSource: "Sursă: Biroul Administrării și Bugetului (OMB) / FRED (FYFSGDA188S)",
          indproTitle: "Indicele Producției Industriale",
          indproBody: "Producția reală a fabricilor, minelor și utilităților din SUA este astăzi cu 172% mai mare decât în 1970, menținând o bază industrială solidă.",
          indproChartTitle: "Indicele Producției Industriale a SUA (1970–2026, Bază 2017=100)",
          indproSource: "Sursă: Consiliul Guvernatorilor al Rezervei Federale / FRED (INDPRO)",
          savingsTitle: "Rata Economisirii Personale",
          savingsBody:
            "Rata economisirii personale a gospodăriilor s-a stabilizat în jurul valorii de 3,0% în 2026, după fluctuațiile atinse în timpul pandemiei.",
          savingsChartTitle: "Rata Economisirii Personale în SUA (1970–2026)",
          savingsSource: "Sursă: Bureau of Economic Analysis / FRED (PSAVERT)",
        }
      : {
          heroAlt: "New York City financial district",
          heroEyebrow: "GDP & Scale",
          heroLead: "$32.4 TRILLION",
          heroAccent: "AND COUNTING",
          heroBody:
            "The United States economy has maintained its position as the world's largest for over 130 years, adapting to structural changes and global challenges.",
          growthTitle: "The Growth, Year by Year",
          growthBody:
            "This section tracks the historical growth of real GDP since 1929. The American economy has expanded more than twentyfold in real terms through capital accumulation and productivity gains.",
          growthChartTitle: "U.S. GDP since 1929",
          growthChartSubtitle: "Toggle between real (inflation removed) and nominal",
          joblessTitle: "Labor Market Dynamics",
          joblessBody:
            "Unemployment metrics complement GDP data by tracking labor market dynamics. US unemployment has historically hovered between 4% and 6%, demonstrating rapid recovery following cyclical downturns.",
          joblessChartTitle: "U.S. unemployment rate, since 1948",
          joblessChartSubtitle: "Monthly; shaded bands mark NBER-dated recessions",
          stateMapIntro:
            "National economic output is heavily supported by major states: the five largest states generate roughly 41% of total US GDP.",
          stateMapTitle: "Nominal GDP by state, 2025",
          stateMapSubtitle: "Hover any state for its output and its country-sized peer",
          worldTitle: "The United States vs. The World",
          worldBody:
            "At $32.4 trillion, the US economy exceeds the combined GDPs of China ($20.8T), Germany ($5.4T), and Japan ($4.4T).",
          worldChartTitle: "GDP by Country (2026, USD Trillions)",
          worldChartSubtitle:
            "The US economy exceeds the next three largest economies combined",
          perCapitaTitle: "Per Capita Output and Productivity",
          perCapitaBody:
            "The average American generates $94,400 in annual economic output, surpassing Germany ($65,300), the United Kingdom ($61,100), and France ($52,100).",
          perCapitaChartTitle: "GDP Per Capita by Country (2026, USD Thousands)",
          perCapitaChartSubtitle:
            "At $94,400 per person, US per capita output leads major advanced economies",
          worldValueLabel: "GDP (2026 projection, USD Trillions)",
          perCapitaValueLabel: "GDP per capita (2026 projection, USD Thousands)",
          prosperityTitle: "Financial Market Performance",
          prosperityBody:
            "The S&P 500 tracks the performance of leading American corporations. Since 1980, it has delivered an average annual return of approximately 10.5%.",
          prosperityChartTitle: "S&P 500 Index: Long-Term Growth (1980–2026)",
          prosperityChartSubtitle: "Long-term compounding across market cycles",
          statesTitle: "American States vs. Nations",
          statesBody:
            "Individual US states produce economic output comparable to major national economies. California, Texas, and New York operate as global economic centers.",
          stateLabel: "State",
          stateGdpLabel: "State GDP",
          globalRankLabel: "Global Rank",
          comparisonLabel: "Comparison",
          globallyLabel: "globally",
          statesSource:
            "Sources: Bureau of Economic Analysis (state GDP, 2025, via FRED); IMF World Economic Outlook (country GDP, 2026)",
          growthPullLabel:
            "years of economic expansion over the last seven decades.",
          byNumbersEyebrow: "The scale, in numbers",
          byNumbersTitle: "The Numbers Behind the Numbers",
          insightsEyebrow: "Structural advantages",
          quoteTitle: "Nobel Laureate in Economics, University of Chicago",
          backLink: "← Back to Economy Overview",
          nextLink: "Capital Markets →",
          sectorsTitle: "GDP by Sector: Services & High-Value Industry",
          sectorsBody: "The modern U.S. economy is service-oriented, with Finance, Insurance, Real Estate, and Professional Services generating over a third of output alongside a $3.0T manufacturing core.",
          sectorsChartTitle: "GDP Value Added by Sector (2025/2026, % of GDP)",
          sectorsChartSubtitle: "High-margin services combined with an industrial base",
          sectorsSource: "U.S. Bureau of Economic Analysis (BEA) 2026",
          divergenceTitle: "Real GDP Growth: U.S. vs. G7",
          divergenceBody: "Since 2010, US real GDP expanded by 41%, outperforming the 19.5% average of other G7 nations due to technology investment and capital efficiency.",
          divergenceChartTitle: "Real GDP Growth Index (2010 = 100)",
          divergenceChartSubtitle: "Historical tracking of U.S. real GDP growth vs. G7 average",
          divergenceSource: "OECD Data Explorer / IMF WEO 2026",
          expendituresTitle: "GDP Expenditures: Domestic Demand",
          expendituresBody: "Personal consumption expenditures account for 68.2% of GDP, supported by private investment (17.5%) and government expenditure (17.6%).",
          expendituresChartTitle: "GDP Composition by Expenditures (2025/2026, % of GDP)",
          expendituresChartSubtitle: "The standard NIPA macroeconomic breakdown: C + I + G + NX",
          expendituresSource: "U.S. Bureau of Economic Analysis (BEA) 2026",
          comparisonTitle: "GDP Progression: U.S. vs. Global Peers",
          comparisonBody: "Since 1980, US GDP grew from $2.8 trillion to over $32.4 trillion, sustaining long-term expansion relative to other major economies.",
          comparisonChartTitle: "Nominal GDP Progression (1980–2026, USD Trillions)",
          comparisonChartSubtitle: "Historical comparison of leading economic powers",
          comparisonSource: "Data Source: IMF World Economic Outlook Database (April 2026)",
          laborTitle: "GDP vs. Labor: Productivity by Sector",
          laborBody: "Financial and real estate sectors generate 21% of GDP while employing 5.7% of nonfarm payrolls, whereas healthcare and education represent key employment sectors (16.4% of workforce).",
          laborChartTitle: "Sector Allocation: Output vs. Employment",
          laborChartSubtitle: "Comparative analysis of sector GDP output share against labor force share",
          laborSource: "Combined Data: BEA NIPA & BLS State of Employment 2026",
          rdTitle: "R&D Expenditure in the United States",
          rdBody: "The United States invests 3.50% of GDP in research and development, totaling nearly $900 billion annually across private industry and university research.",
          rdChartTitle: "Global R&D Spending as % of GDP (GERD, 2024–2025)",
          rdSource: "Source: NSF/NCSES, OECD Main Science and Technology Indicators 2024–2025",
          growthRateTitle: "Real GDP Growth Rate (1970–2025)",
          growthRateBody: "Annual real GDP growth rates highlight the rapid recovery capability of the US economy following recessionary periods.",
          growthRateChartTitle: "US Annual Real GDP Growth Rate (1970–2025)",
          growthRateSource: "Sources: BEA NIPA, World Bank WDI | Recessions per NBER",
          productivityTitle: "Labor Productivity Comparison",
          productivityBody: "Measured by GDP per hour worked at purchasing power parity, the average American worker produces $97.10/hour, leading Germany ($93.80), France ($88.20), and the UK ($78.10).",
          productivityChartTitle: "GDP per Hour Worked (USD PPP, 2024)",
          productivitySource: "Source: OECD.Stat — GDP per Hour Worked, 2024 data",
          debtTitle: "Federal Debt as a Share of GDP",
          debtBody: "US federal debt as a percentage of GDP stands at 122% in 2026, backed by the ability to issue debt in the global reserve currency.",
          debtChartTitle: "U.S. Federal Debt as a Percentage of GDP (1970–2026)",
          debtSource: "Source: Federal Reserve FRED (GFDEGDQ188S)",
          gdpPerCapTitle: "Real GDP per Capita Progression",
          gdpPerCapBody: "In inflation-adjusted terms, U.S. GDP per capita grew from $25,900 in 1970 to over $70,500 in 2026.",
          gdpPerCapChartTitle: "U.S. Real GDP per Capita (1970–2026, Adjusted USD)",
          gdpPerCapSource: "Source: Bureau of Economic Analysis / FRED (A939RX0Q048SBEA)",
          deficitTitle: "Federal Budget Balance",
          deficitBody: "Historical tracking of the federal budget balance shows fiscal adjustments across decades, stabilizing around -5.8% of GDP by 2025.",
          deficitChartTitle: "U.S. Federal Surplus or Deficit as a Percentage of GDP (1970–2025)",
          deficitSource: "Source: Office of Management and Budget / FRED (FYFSGDA188S)",
          indproTitle: "Industrial Production Index",
          indproBody: "Real output across US manufacturing, mining, and utilities stands 172% higher today than in 1970, maintaining physical industrial capacity.",
          indproChartTitle: "U.S. Industrial Production Index (1970–2026, Base 2017=100)",
          indproSource: "Source: Board of Governors of the Federal Reserve System / FRED (INDPRO)",
          savingsTitle: "Personal Savings Rate",
          savingsBody:
            "The personal savings rate normalized to around 3.0% in 2026 following pandemic-era shifts.",
          savingsChartTitle: "U.S. Personal Savings Rate (1970–2026)",
          savingsSource: "Source: Bureau of Economic Analysis / FRED (PSAVERT)",
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

          {/* The counterweight to the GDP curve: who isn't in it */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.joblessTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.joblessBody}
            </p>
            <div className="my-24">
              <UnemploymentChart
                data={US_UNEMPLOYMENT}
                recessions={RECESSIONS}
                title={copy.joblessChartTitle}
                subtitle={copy.joblessChartSubtitle}
                source={US_UNEMPLOYMENT_META.source}
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

          {/* Personal Savings Rate */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.savingsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.savingsBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <SavingsRateChart
                data={US_SAVINGS_RATE}
                title={copy.savingsChartTitle}
                source={copy.savingsSource}
              />
            </div>
          </section>

          {/* Exports and the trade balance now live on /economy/trade-and-exports,
              which is the page actually about them and which previously had no
              charts at all. This page was carrying twenty. */}

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
