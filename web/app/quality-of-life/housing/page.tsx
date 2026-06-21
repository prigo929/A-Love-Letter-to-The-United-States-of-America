import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Home, TrendingUp, Key, Shield } from "lucide-react";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";
import { CountryBarChart } from "@/components/shared/CountryBarChart";

export const metadata: Metadata = {
  title: "Housing & Real Estate | Quality of Life",
  description:
    "American housing by the numbers: the world's largest homes per capita, the unique 30-year fixed mortgage, homeownership as wealth vehicle, and unmatched suburban affordability.",
};

interface HousingCopy {
  breadcrumbParent: string;
  breadcrumbPage: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  thesisTitle: string;
  thesisParagraph1: string;
  thesisParagraph2: string;
  statsTitle: string;
  stats: Array<{ value: string; label: string; description: string }>;
  pillarsTitle: string;
  pillars: Array<{
    icon: React.ElementType;
    title: string;
    body: string;
    source: string;
    sourceUrl?: string;
  }>;
  factTitle: string;
  factItems: Array<{ title: string; body: string; source: string; sourceUrl?: string }>;
  oracleDescription: string;
}

import React from "react";

const copyEn: HousingCopy = {
  breadcrumbParent: "Quality of Life",
  breadcrumbPage: "Housing & Real Estate",
  heroTagline: "THE HOUSING ADVANTAGE",
  heroTitle: "The World's Most Spacious and Affordable Homes",
  heroSubtitle:
    "A constitutional property rights tradition, deep capital markets, and a unique 30-year mortgage instrument have made single-family homeownership the engine of American middle-class wealth.",
  thesisTitle: "Property Rights as a Foundation of Prosperity",
  thesisParagraph1:
    "American homes are the largest in the world by floor space per person — roughly double the size of a German home and triple that of a Japanese one. This is not a luxury reserved for the wealthy: it is the statistical median for the American working and middle class. The US housing market sits atop deep capital markets, government-sponsored secondary mortgage entities (Fannie Mae, Freddie Mac), and a uniquely American financial instrument — the 30-year fixed-rate mortgage.",
  thesisParagraph2:
    "In virtually every other country, homebuyers face variable-rate or short-duration loans that expose them to interest-rate volatility. In the United States, buyers can lock a rate for 30 years, converting a home from a risky leveraged asset into a predictable, appreciating wealth vehicle. The combination of large living space, price-to-income ratios that remain competitive globally, and a constitutional tradition of fee simple ownership makes American real estate uniquely powerful for wealth accumulation.",
  statsTitle: "Housing by the Numbers",
  stats: [
    {
      value: "2,301",
      label: "Sq Ft Average Home",
      description:
        "The average new single-family home in the US is 2,301 sq ft — the largest in the world. Germany averages ~1,170 sq ft; Japan averages ~1,023 sq ft.",
    },
    {
      value: "#2",
      label: "Global Housing Affordability",
      description:
        "Numbeo's 2026 Property Price-to-Income Index ranks the US #2 most affordable in the world. Real sq ft is 2–4× cheaper than in Europe and 3–6× cheaper than in Asia.",
    },
    {
      value: "65.6%",
      label: "Homeownership Rate",
      description:
        "Nearly two-thirds of American households own their homes — a rate that has held steady for decades, spanning a wide cross-section of income levels and regions.",
    },
    {
      value: "~90%",
      label: "Fixed-Rate Mortgage Share",
      description:
        "Approximately 90% of US mortgages are 30-year fixed-rate loans — a product that barely exists outside the United States and shields borrowers from rate-shock.",
    },
  ],
  pillarsTitle: "Four Pillars of American Housing Strength",
  pillars: [
    {
      icon: Key,
      title: "The 30-Year Fixed Mortgage: A Global Anomaly",
      body: "Most countries offer only adjustable-rate or 5–10-year fixed mortgages. When rates rise, European and Asian homeowners see their monthly payments reset upward. American homeowners locked into a 30-year fixed rate are completely insulated. This instrument, backed by Fannie Mae and Freddie Mac through the secondary mortgage market, transfers the long-term interest-rate risk from homeowners to capital markets — creating the single most powerful residential wealth-building tool in history.",
      source: "CNBC / Fannie Mae 2024",
      sourceUrl:
        "https://www.cnbc.com/2024/05/07/why-the-30-year-fixed-rate-mortgage-is-a-uniquely-american-construct.html",
    },
    {
      icon: Home,
      title: "Size, Space, and Suburban Scale",
      body: "The American single-family home averages over 2,300 sq ft — a footprint that includes multiple bedrooms, a 2-car garage, a backyard, and often a finished basement or attic. The suburbs that house the majority of Americans are a product of the Interstate Highway System, cheap land, and a legal tradition of fee-simple ownership (full private title with no feudal legacy). This spatial abundance is the product of policy, infrastructure, and cultural preference working in alignment.",
      source: "World Population Review 2026",
      sourceUrl:
        "https://worldpopulationreview.com/country-rankings/house-size-by-country",
    },
    {
      icon: TrendingUp,
      title: "Real Estate as a Wealth Vehicle",
      body: "Over the past 30 years, US residential real estate has been a primary engine of middle-class wealth accumulation. Home equity constitutes the largest single asset for most American families. The deductibility of mortgage interest (for itemizers), the $250,000/$500,000 capital gains exclusion on primary residence sales, and the 1031 exchange for investment properties layer tax advantages directly onto the housing asset — a framework unique in scale and generosity.",
      source: "Tax Foundation / IRS",
      sourceUrl: "https://taxfoundation.org/",
    },
    {
      icon: Shield,
      title: "Constitutional Property Rights",
      body: "The Fifth Amendment's Takings Clause — 'nor shall private property be taken for public use, without just compensation' — enshrines private property ownership at the constitutional level. This foundational protection, combined with state homestead exemptions that shield primary residence equity from creditors in many states, creates a property rights environment unmatched in depth and enforcement. American land titles are among the most secure in the world.",
      source: "US Constitution, Fifth Amendment",
    },
  ],
  factTitle: "Additional Housing Facts",
  factItems: [
    {
      title: "The Home Improvement Market: $534 Billion",
      body: "The US home improvement market was valued at $534.57 billion in 2024. Home Depot ($140B+ revenue) and Lowe's ($85B+) exist precisely because American homeowners are active investors in their properties — an industry the size of a major nation's GDP generated by private citizens upgrading their own assets.",
      source: "Market Data Forecast 2024",
      sourceUrl:
        "https://www.marketdataforecast.com/market-reports/us-home-improvement-market",
    },
    {
      title: "10.7 Million Swimming Pools",
      body: "There are approximately 10.7 million swimming pools in the United States (10.4M residential, 309k public). A private in-ground pool — a luxury item in any other country — is a standard middle-class feature across the Sunbelt. Florida has 1.59 million residential pools (1 for every 14 residents).",
      source: "Pool Research 2024",
      sourceUrl: "https://poolresearch.com/statistics/",
    },
    {
      title: "24.5 Sq Ft of Retail Per Capita",
      body: "The US has 24.5 sq ft of retail space per person, compared to an average of just 4.5 sq ft in Europe — a physical expression of the consumer infrastructure that surrounds the American home and enables the suburban lifestyle.",
      source: "Statista Retail Space Report",
      sourceUrl:
        "https://www.statista.com/statistics/1058852/retail-space-per-capita-select-countries-worldwide/",
    },
  ],
  oracleDescription:
    "Ask the AI Oracle about the 30-year fixed mortgage, American home sizes vs. Europe, homeownership rates, or the constitutional basis for property rights.",
};

const copyRo: HousingCopy = {
  breadcrumbParent: "Calitatea Vieții",
  breadcrumbPage: "Locuințe și Imobiliare",
  heroTagline: "AVANTAJUL IMOBILIAR",
  heroTitle: "Cele Mai Spațioase și Accesibile Locuințe din Lume",
  heroSubtitle:
    "O tradiție constituțională a drepturilor de proprietate, piețe de capital adânci și ipoteca unică pe 30 de ani au transformat proprietatea rezidențială în motorul averii clasei de mijloc americane.",
  thesisTitle: "Drepturile de Proprietate ca Fundație a Prosperității",
  thesisParagraph1:
    "Locuințele americane sunt cele mai mari din lume ca suprafață per persoană — aproximativ dublul unei case germane și triplul uneia japoneze. Aceasta nu este o realitate rezervată bogaților: este mediana statistică pentru clasa muncitoare și de mijloc americană. Piața imobiliară din SUA se sprijină pe piețe de capital profunde, entități ipotecare sponsorizate de stat (Fannie Mae, Freddie Mac) și un instrument financiar unic — ipoteca cu rată fixă pe 30 de ani.",
  thesisParagraph2:
    "În aproape orice altă țară, cumpărătorii de locuințe se confruntă cu credite cu rată variabilă sau cu durată scurtă care îi expun la volatilitatea dobânzilor. În Statele Unite, cumpărătorii pot bloca o rată pentru 30 de ani, transformând o casă dintr-un activ riscant cu efect de levier într-un vehicul predictibil de acumulare a averii. Combinația dintre suprafețe mari, raporturi preț-venit competitive la nivel global și o tradiție constituțională a proprietății în deplină proprietate face imobiliarele americane excepțional de puternice pentru acumularea bogăției.",
  statsTitle: "Locuințele în Cifre",
  stats: [
    {
      value: "2.301",
      label: "Mp Medie Locuință",
      description:
        "Casa unifamilială medie din SUA are 2.301 sq ft (214 mp) — cea mai mare din lume. Germania are în medie ~109 mp; Japonia ~95 mp.",
    },
    {
      value: "#2",
      label: "Accesibilitate Imobiliară Globală",
      description:
        "Indexul Numbeo 2026 clasează SUA pe locul 2 ca accesibilitate imobiliară din lume. Suprafața reală este de 2–4× mai ieftină decât în Europa.",
    },
    {
      value: "65,6%",
      label: "Rată de Proprietate",
      description:
        "Aproape două treimi din gospodăriile americane dețin locuința proprie — o rată care s-a menținut stabilă timp de decenii.",
    },
    {
      value: "~90%",
      label: "Cotă Ipotecă cu Rată Fixă",
      description:
        "Aproximativ 90% din creditele ipotecare din SUA sunt pe 30 de ani cu rată fixă — un produs care aproape nu există în afara Statelor Unite.",
    },
  ],
  pillarsTitle: "Patru Piloni ai Puterii Imobiliare Americane",
  pillars: [
    {
      icon: Key,
      title: "Ipoteca Fixă pe 30 de Ani: O Anomalie Globală",
      body: "Majoritatea țărilor oferă doar credite cu rată variabilă sau fixă pe 5–10 ani. Când dobânzile cresc, proprietarii europeni și asiatici văd plățile lunare resetate în sus. Proprietarii americani blocați la o rată fixă pe 30 de ani sunt complet izolaţi. Acest instrument, susținut de Fannie Mae și Freddie Mac prin piața ipotecară secundară, transferă riscul dobânzii de la proprietari la piețele de capital.",
      source: "CNBC / Fannie Mae 2024",
      sourceUrl:
        "https://www.cnbc.com/2024/05/07/why-the-30-year-fixed-rate-mortgage-is-a-uniquely-american-construct.html",
    },
    {
      icon: Home,
      title: "Dimensiune, Spațiu și Scară Suburbană",
      body: "Casa unifamilială americană medie depășește 2.300 sq ft — o amprentă care include mai multe dormitoare, un garaj pentru 2 mașini, o curte și adesea un subsol amenajat. Suburbiile care adăpostesc majoritatea americanilor sunt produsul sistemului Interstate, al terenurilor ieftine și al unei tradiții juridice a proprietății private depline.",
      source: "World Population Review 2026",
      sourceUrl:
        "https://worldpopulationreview.com/country-rankings/house-size-by-country",
    },
    {
      icon: TrendingUp,
      title: "Imobiliarele ca Vehicul de Avere",
      body: "De-a lungul ultimilor 30 de ani, imobiliarele rezidențiale din SUA au fost un motor principal al acumulării de avere a clasei de mijloc. Capitalul propriu imobiliar constituie cel mai mare activ individual pentru majoritatea familiilor americane. Deductibilitatea dobânzii ipotecare, excluderea câștigurilor de capital de 250.000$/500.000$ la vânzarea reședinței principale și schimbul 1031 pentru proprietăți de investiție suprapun avantaje fiscale direct pe activul imobiliar.",
      source: "Tax Foundation / IRS",
      sourceUrl: "https://taxfoundation.org/",
    },
    {
      icon: Shield,
      title: "Drepturi de Proprietate Constituționale",
      body: "Clauza de Expropriere din cel de-al Cincilea Amendament — «nici proprietatea privată nu va fi luată pentru uz public, fără o compensație justă» — consacră proprietatea privată la nivel constituțional. Această protecție fundamentală, combinată cu scutirile de homestead din multe state care protejează capitalul propriu al reședinței principale de creditori, creează un mediu al drepturilor de proprietate fără egal.",
      source: "Constituția SUA, Al Cincilea Amendament",
    },
  ],
  factTitle: "Alte Date despre Locuințe",
  factItems: [
    {
      title: "Piața de Îmbunătățiri Locative: 534 Miliarde USD",
      body: "Piața americană de îmbunătățiri locative a fost evaluată la 534,57 miliarde de dolari în 2024. Home Depot (venituri de 140+ miliarde $) și Lowe's (85+ miliarde $) există tocmai pentru că proprietarii americani sunt investitori activi în proprietățile lor.",
      source: "Market Data Forecast 2024",
      sourceUrl:
        "https://www.marketdataforecast.com/market-reports/us-home-improvement-market",
    },
    {
      title: "10,7 Milioane de Piscine",
      body: "Există aproximativ 10,7 milioane de piscine în Statele Unite (10,4M rezidențiale, 309k publice). O piscină privată îngropată — un articol de lux în orice altă țară — este o caracteristică standard a clasei de mijloc în zona Sunbelt.",
      source: "Pool Research 2024",
      sourceUrl: "https://poolresearch.com/statistics/",
    },
    {
      title: "24,5 Mp de Spațiu Comercial Per Capita",
      body: "SUA au 24,5 sq ft de spațiu comercial per persoană, față de o medie de doar 4,5 sq ft în Europa — o expresie fizică a infrastructurii de consum care înconjoară locuința americană.",
      source: "Statista Retail Space Report",
      sourceUrl:
        "https://www.statista.com/statistics/1058852/retail-space-per-capita-select-countries-worldwide/",
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre ipoteca fixă pe 30 de ani, dimensiunile locuințelor americane față de Europa, ratele de proprietate sau baza constituțională a drepturilor de proprietate.",
};

export default async function HousingPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc="/images/library/Housing/Modern suburban house with garden and American flag, showcasing beautiful architecture in Eagle Mountain, UT.jpg"
        imageAlt="Modern American suburban home with American flag"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "CEL MAI SPAȚIOS" : "THE WORLD'S MOST"}
        titleAccent={isRo ? "IMOBILIARE DIN LUME" : "SPACIOUS HOMES"}
        description={copy.heroSubtitle}
        stats={[
          { value: "2,301", label: isRo ? "Mp Medie Locuință" : "Sq Ft Average Home" },
          { value: "#2", label: isRo ? "Accesibilitate Globală" : "Global Affordability" },
          { value: "~90%", label: isRo ? "Ipotecă Fixă 30 Ani" : "30-Year Fixed Mortgage" },
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 font-body text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 mb-8">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbParent, href: "/quality-of-life" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        {/* Thesis */}
        <RevealSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-6">
              <span className="macro-eyebrow">{copy.heroTagline}</span>
              <h2 className="font-macro-display text-4xl md:text-5xl font-bold text-white leading-tight">
                {copy.thesisTitle}
              </h2>
              <p className="font-macro-body text-white/80 text-xl leading-relaxed">
                {copy.thesisParagraph1}
              </p>
              <p className="font-macro-body text-white/80 text-xl leading-relaxed">
                {copy.thesisParagraph2}
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Stats */}
        <RevealSection className="border-b border-white/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#E8B923] text-center mb-12">
              {copy.statsTitle}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {copy.stats.map((stat, i) => (
                <div key={i} className="border-t border-white/10 pt-6">
                  <p className="macro-stat-value mb-2">{stat.value}</p>
                  <p className="font-display text-base font-bold text-white mb-2">{stat.label}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Global Comparison — bar charts */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="macro-section-title text-white text-3xl mb-3">
              {isRo ? "America în Context Global" : "America in Global Context"}
            </h2>
            <p className="macro-body text-sm mb-12 max-w-2xl">
              {isRo
                ? "Pe fiecare indicator al spațiului locuibil, Statele Unite se află în vârful lumii dezvoltate — case mai mari, mai multe camere de persoană și o povară a costului locuinței printre cele mai mici."
                : "On nearly every measure of living space, the United States sits at the top of the developed world — bigger homes, more rooms per person, and one of the lowest housing cost burdens anywhere."}
            </p>
            <div className="grid gap-12 lg:grid-cols-2">
              <CountryBarChart
                locale={locale}
                title={isRo ? "Suprafața medie a caselor noi (m²)" : "Average floor space of new homes (m²)"}
                source="Policy Exchange · CABE · US Census Bureau"
                data={[
                  { label: "USA", value: 214, display: "214 m²", isUS: true },
                  { label: "Australia", value: 206, display: "206 m²" },
                  { label: "Denmark", value: 137, display: "137 m²" },
                  { label: "France", value: 113, display: "113 m²" },
                  { label: "Spain", value: 97, display: "97 m²" },
                  { label: "Ireland", value: 88, display: "88 m²" },
                  { label: "UK", value: 76, display: "76 m²" },
                ]}
              />
              <CountryBarChart
                locale={locale}
                title={isRo ? "Camere de persoană" : "Rooms per person"}
                source="OECD Better Life Index"
                data={[
                  { label: "Canada", value: 2.5, display: "2.5" },
                  { label: "USA", value: 2.4, display: "2.4", isUS: true },
                  { label: "New Zealand", value: 2.4, display: "2.4" },
                  { label: "Australia", value: 2.3, display: "2.3" },
                  { label: "Belgium", value: 2.2, display: "2.2" },
                  { label: "Norway", value: 2.1, display: "2.1" },
                  { label: "Ireland", value: 2.1, display: "2.1" },
                  { label: "United Kingdom", value: 2.0, display: "2.0" },
                  { label: "Netherlands", value: 1.9, display: "1.9" },
                  { label: "Japan", value: 1.9, display: "1.9" },
                  { label: "Germany", value: 1.8, display: "1.8" },
                  { label: "France", value: 1.8, display: "1.8" },
                ]}
              />
              <CountryBarChart
                locale={locale}
                title={isRo ? "Mărimea mediană a locuinței (sq ft)" : "Median dwelling size (sq ft)"}
                source="US Census Bureau · OECD · national statistics"
                data={[
                  { label: "Australia", value: 2303, display: "2,303" },
                  { label: "New Zealand", value: 2174, display: "2,174" },
                  { label: "USA", value: 2164, display: "2,164", isUS: true },
                  { label: "Canada", value: 1948, display: "1,948" },
                  { label: "Denmark", value: 1475, display: "1,475" },
                  { label: "Luxembourg", value: 1359, display: "1,359" },
                  { label: "Greece", value: 1356, display: "1,356" },
                  { label: "Belgium", value: 1293, display: "1,293" },
                  { label: "Netherlands", value: 1261, display: "1,261" },
                  { label: "France", value: 1206, display: "1,206" },
                  { label: "Germany", value: 1173, display: "1,173" },
                  { label: "Japan", value: 1023, display: "1,023" },
                  { label: "United Kingdom", value: 818, display: "818" },
                ]}
              />
              <CountryBarChart
                locale={locale}
                title={isRo ? "Cheltuieli cu locuința (% din venit) — mai puțin e mai bine" : "Housing expenditure (% of income) — lower is better"}
                subtitle={isRo ? "Ponderea venitului disponibil ajustat cheltuit pe locuință." : "Share of gross adjusted disposable income spent on housing."}
                source="OECD"
                data={[
                  { label: "Korea", value: 15, display: "15%" },
                  { label: "Norway", value: 17, display: "17%" },
                  { label: "USA", value: 18, display: "18%", isUS: true },
                  { label: "Chile", value: 18, display: "18%" },
                  { label: "Estonia", value: 18, display: "18%" },
                  { label: "Slovenia", value: 18, display: "18%" },
                  { label: "Germany", value: 20, display: "20%" },
                  { label: "Netherlands", value: 20, display: "20%" },
                  { label: "Australia", value: 20, display: "20%" },
                  { label: "France", value: 21, display: "21%" },
                  { label: "Canada", value: 22, display: "22%" },
                  { label: "United Kingdom", value: 24, display: "24%" },
                ]}
              />
            </div>
          </div>
        </RevealSection>

        {/* Four Pillars */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="macro-section-title text-white text-center text-3xl mb-12">{copy.pillarsTitle}</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {copy.pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className="border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3 mb-5">
                      <Icon className="h-5 w-5 text-[#E8B923]" />
                      <h3 className="font-display text-xl font-bold text-white leading-tight">{pillar.title}</h3>
                    </div>
                    <p className="macro-body text-sm mb-5">{pillar.body}</p>
                    <div className="border-t border-white/5 pt-3">
                      {pillar.sourceUrl ? (
                        <a href={pillar.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#E8B923]/60 hover:text-[#E8B923] transition-colors">
                          {pillar.source} ↗
                        </a>
                      ) : (
                        <span className="text-xs text-white/30">{pillar.source}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>

        {/* Additional Facts */}
        <RevealSection className="border-b border-white/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="macro-section-title text-white text-2xl mb-10">{copy.factTitle}</h2>
            <div className="space-y-4">
              {copy.factItems.map((item, i) => (
                <div key={i} className="border-t border-white/10 pt-6">
                  <h4 className="font-display text-base font-bold text-[#E8B923] mb-2">{item.title}</h4>
                  <p className="macro-body text-sm mb-3">{item.body}</p>
                  {item.sourceUrl ? (
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-[#E8B923] transition-colors">
                      {item.source} ↗
                    </a>
                  ) : (
                    <span className="text-xs text-white/30">{item.source}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <AskAmericaCTA locale={locale} descriptionEn={copyEn.oracleDescription} descriptionRo={copyRo.oracleDescription} />
      </div>
    </>
  );
}
