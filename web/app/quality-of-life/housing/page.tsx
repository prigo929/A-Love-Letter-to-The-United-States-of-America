import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Home, TrendingUp, Key, Shield } from "lucide-react";

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
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: copy.breadcrumbParent, href: "/quality-of-life" },
            { label: copy.breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>

      {/* Hero */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-[#07090f] via-navy-mid to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-star-pattern opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-glory-gold mb-4 block">
            {copy.heroTagline}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {copy.heroTitle}
          </h1>
          <p className="font-body text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {copy.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Thesis */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/3 p-8 md:p-12 relative">
          <div className="absolute top-4 right-4 opacity-8">
            <Home className="h-20 w-20 text-glory-gold" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-glory-gold mb-6">
            {copy.thesisTitle}
          </h2>
          <p className="font-body text-white/80 text-lg leading-relaxed mb-6">
            {copy.thesisParagraph1}
          </p>
          <p className="font-body text-white/80 text-lg leading-relaxed">
            {copy.thesisParagraph2}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 bg-navy-dark">
        <div className="mx-auto max-w-7xl">
          <h3 className="font-mono text-xs uppercase tracking-widest text-glory-gold text-center mb-12">
            {copy.statsTitle}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-glory-gold/20 transition-all text-center"
              >
                <p className="font-hero text-4xl sm:text-5xl text-glory-gold tracking-wide mb-2">
                  {stat.value}
                </p>
                <p className="font-display text-base font-bold text-white mb-2">
                  {stat.label}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            {copy.pillarsTitle}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {copy.pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-white/10 bg-white/3 p-8 hover:border-glory-gold/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-xl bg-glory-gold/10 p-2">
                      <Icon className="h-5 w-5 text-glory-gold" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="font-body text-white/70 text-sm leading-relaxed mb-4">
                    {pillar.body}
                  </p>
                  <div className="border-t border-white/8 pt-3">
                    {pillar.sourceUrl ? (
                      <a
                        href={pillar.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-glory-gold/60 hover:text-glory-gold transition-colors"
                      >
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
      </section>

      {/* Additional Facts */}
      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 bg-navy-dark">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-white mb-10">
            {copy.factTitle}
          </h2>
          <div className="space-y-4">
            {copy.factItems.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/8 bg-white/2 p-6 hover:border-glory-gold/20 transition-all"
              >
                <h4 className="font-display text-base font-bold text-glory-gold mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-white/70 leading-relaxed mb-3">
                  {item.body}
                </p>
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/30 hover:text-glory-gold transition-colors"
                  >
                    {item.source} ↗
                  </a>
                ) : (
                  <span className="text-xs text-white/30">{item.source}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <AskAmericaCTA
        locale={locale}
        descriptionEn={copyEn.oracleDescription}
        descriptionRo={copyRo.oracleDescription}
      />
    </main>
  );
}
