// ─── Trade & Exports Sub-Page ─────────────────────────────────────────────────
// An analysis of the American export machine and its global partners.
//
// Pedagogical Goal:
// - To highlight advanced exports (Aerospace, Tech, Pharma) over raw commodities.
// - To explain the "Services Surplus" which often offsets the goods deficit.
//
// Beginner guide:
// - Shared overview paragraphs and export-category data come from economy-data.ts

import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import type { Locale } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/server";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand, CountUp } from "@/components/economy/EconomyAnimations";
import {
  getTradeOverviewParagraphs,
  US_EXPORT_CATEGORIES,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

const getPageMetadata = (locale: Locale) => ({
  title:
    locale === "ro"
      ? "Comerț și Exporturi | Economie"
      : "Trade & Exports | Economy",
  description:
    locale === "ro"
      ? "America exportă peste 2 trilioane de dolari în bunuri — avioane, semiconductori, dispozitive medicale, petrol și produse agricole — plus trilioane în servicii, software și expertiză financiară."
      : "America exports $2T+ in goods — aircraft, semiconductors, medical devices, petroleum, and agricultural products — plus trillions in services, software, and financial expertise.",
  alternates: { canonical: "/economy/trade-and-exports" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

const TRADE_FACTS = [
  // These facts are specific to the trade page, so they live here instead of
  // the shared economy data file.
  {
    id: "trade-goods-total",
    fact: "US merchandise exports exceed $2 trillion annually",
    detail:
      "Aircraft from Boeing, semiconductors from Intel and Qualcomm, medical devices from Medtronic, petrochemical products from ExxonMobil — America exports the most complex and high-value goods on Earth.",
    source: "US Census Bureau / BEA 2026",
    color: "gold" as const,
  },
  {
    id: "trade-services",
    fact: "US services exports exceed $1 trillion — the world's largest",
    detail:
      "Financial services from Goldman Sachs and JPMorgan, software from Microsoft and Salesforce, education from Harvard and MIT, entertainment from Hollywood — America's service exports are the envy of the world.",
    source: "BEA / USTR 2026",
    color: "red" as const,
  },
  {
    id: "trade-aerospace",
    fact: "America dominates aerospace exports — Boeing sells to 150+ countries",
    detail:
      "The aerospace and defense sector alone generates $132B+ in annual exports. Every major airline on Earth flies American-built engines, aircraft, or avionics. There is no peer competitor in commercial aerospace.",
    source: "Aerospace Industries Association 2026",
    color: "blue" as const,
  },
  {
    id: "trade-ag",
    fact: "America feeds the world — $58B+ in annual agricultural exports",
    detail:
      "The US is the world's largest exporter of soybeans, corn, cotton, and almonds, and among the top exporters of wheat, poultry, and pork. American farmers grow food that reaches every corner of the globe.",
    source: "USDA Foreign Agricultural Service 2026",
    color: "gold" as const,
  },
  {
    id: "trade-pharma",
    fact: "American pharmaceutical exports save lives on every continent",
    detail:
      "Pfizer, Merck, Eli Lilly, Johnson & Johnson — US pharmaceutical exports exceed $63 billion annually. COVID mRNA vaccines alone were a $50B+ export event. American biotech is a global public good.",
    source: "PhRMA / BEA 2026",
    color: "red" as const,
  },
  {
    id: "trade-tech",
    fact: "US software and intellectual property exports: $200B+ annually",
    detail:
      "Microsoft Windows, Adobe Creative Suite, Salesforce CRM, AWS cloud services, Apple App Store — American software is the invisible infrastructure of the global economy, generating hundreds of billions in annual export value.",
    source: "BEA Intellectual Property Products 2026",
    color: "blue" as const,
  },
  {
    id: "trade-freight",
    fact: "US freight rail is the most efficient and cost-effective in the world",
    detail: "While Europe focuses heavily on subsidizing passenger rail, the US dominates in global freight rail efficiency. Carrying double-stacked containers, US freight rail drops shipping costs dramatically, powering next-day logistics and fully stocked shelves.",
    source: "Association of American Railroads 2026",
    color: "gold" as const,
  },
  {
    id: "trade-waterways",
    fact: "The Invisible Freight Highway: America's Inland Waterways",
    detail: "The US manages 12,000 miles of inland navigation channels and 11,000 miles of intracoastal waterways. A single barge moves as much cargo as 70 tractor-trailers. The Mississippi River alone carries 60% of all US grain exports down to Gulf terminals — a cheap, natural geography asset unmatched in Europe or Asia.",
    source: "US Army Corps of Engineers / ASCE 2024",
    color: "blue" as const,
  },
  {
    id: "trade-ag-geography",
    fact: "Agricultural Geography: The Unrepeatable Endowment",
    detail: "The US possesses the world's largest contiguous block of Class I and II arable land across the Midwest and Great Plains, combined with temperate precipitation and direct dual-ocean and Gulf access, creating structural immunity to food insecurity.",
    source: "USDA Foreign Agricultural Service 2026",
    color: "red" as const,
  },
  {
    id: "trade-truckers",
    fact: "The Trucker's Republic: America's Overland Freight Nervous System",
    detail: "Over 3.5 million professional truck drivers move 70% of all domestic freight value in the US, coordinating $800 billion in overland shipping annually. Supported by massive private travel center chains like Pilot Flying J, Love's, and TA, this high-velocity highway logistics network keeps the continental economy operating in real-time.",
    source: "American Trucking Associations / Bureau of Transportation Statistics 2026",
    color: "gold" as const,
  },
  {
    id: "interstate-highway",
    fact: "The Interstate Highway System: Eisenhower's Continent-Scale Infrastructure",
    detail: "Spanning 47,856 miles, it is the largest limited-access highway system in the world. Built primarily between 1956 and 1992, this unified network compressed travel times across a landmass the size of Europe, making long-haul trucking viable, enabling suburban growth, and generating unmatched national economic integration.",
    source: "Federal Highway Administration (FHWA) 2024",
    color: "blue" as const,
  },
];

const TRADE_PARTNERS = [
  // Trading partner cards are rendered from this array lower down the page.
  {
    country: "Canada",
    flag: "🇨🇦",
    trade: "$773B",
    direction: "Largest overall partner",
  },
  {
    country: "Mexico",
    flag: "🇲🇽",
    trade: "$798B",
    direction: "#1 goods trading partner 2023",
  },
  {
    country: "China",
    flag: "🇨🇳",
    trade: "$575B",
    direction: "Largest goods deficit",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    trade: "$257B",
    direction: "Key machinery & auto partner",
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    trade: "$212B",
    direction: "Technology & automotive",
  },
  {
    country: "South Korea",
    flag: "🇰🇷",
    trade: "$185B",
    direction: "Semiconductors & EVs",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    trade: "$156B",
    direction: "Services surplus partner",
  },
  {
    country: "India",
    flag: "🇮🇳",
    trade: "$130B",
    direction: "Fastest-growing partner",
  },
];

const TOP_EXPORT_COMPANIES = [
  // Same pattern here: a simple local content array used to build a grid.
  {
    company: "Boeing",
    sector: "Aerospace",
    hq: "Arlington, VA",
    note: "Largest US goods exporter",
  },
  {
    company: "ExxonMobil",
    sector: "Energy",
    hq: "Spring, TX",
    note: "Petroleum products leader",
  },
  {
    company: "Apple",
    sector: "Consumer Tech",
    hq: "Cupertino, CA",
    note: "$100B+ in international revenue",
  },
  {
    company: "Microsoft",
    sector: "Software / Cloud",
    hq: "Redmond, WA",
    note: "Azure & Office 365 globally",
  },
  {
    company: "Caterpillar",
    sector: "Industrial",
    hq: "Irving, TX",
    note: "Heavy machinery to 190 countries",
  },
  {
    company: "General Electric",
    sector: "Industrial",
    hq: "Fairfield, CT",
    note: "Jet engines, power equipment",
  },
  {
    company: "Medtronic / Edwards",
    sector: "Medical Devices",
    hq: "Minneapolis, MN",
    note: "Devices used in every hospital globally",
  },
  {
    company: "ADM / Cargill / Bunge",
    sector: "Agriculture",
    hq: "Multiple US cities",
    note: "Feed the world from the Great Plains",
  },
];

export default async function TradeAndExportsPage() {
  // Locale drives every translated paragraph, label, and data variant on the
  // page. Keeping that choice here avoids locale checks throughout the JSX.
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Comerț și Exporturi" : "Trade & Exports";
  const overviewParagraphs = getTradeOverviewParagraphs(locale);
  // This shared export-category dataset is translated here before it is passed
  // into the chart/card UI below.
  const exportCategories =
    locale === "ro"
      ? US_EXPORT_CATEGORIES.map((category) => ({
          ...category,
          category:
            {
              "Aircraft & Parts": "Avioane și componente",
              "Petroleum Products": "Produse petroliere",
              Semiconductors: "Semiconductori",
              "Medical Devices": "Dispozitive medicale",
              Automobiles: "Automobile",
              Pharmaceuticals: "Produse farmaceutice",
              "Agricultural Products": "Produse agricole",
              "Industrial Machinery": "Mașini industriale",
            }[category.category] ?? category.category,
        }))
      : US_EXPORT_CATEGORIES;
  // These supporting facts belong only to the trade page, so they are kept
  // local instead of expanding the shared data file unnecessarily.
  const tradeFacts =
    locale === "ro"
      ? [
          {
            ...TRADE_FACTS[0],
            fact: "Exporturile americane de bunuri depășesc anual 2 trilioane de dolari",
            detail:
              "Avioane Boeing, semiconductori Intel și Qualcomm, dispozitive medicale Medtronic, produse petrochimice ExxonMobil — America exportă cele mai complexe și valoroase bunuri de pe Pământ.",
          },
          {
            ...TRADE_FACTS[1],
            fact: "Exporturile americane de servicii depășesc 1 trilion de dolari — cele mai mari din lume",
            detail:
              "Servicii financiare de la Goldman Sachs și JPMorgan, software de la Microsoft și Salesforce, educație de la Harvard și MIT, divertisment de la Hollywood — exporturile americane de servicii sunt invidiate de toată lumea.",
          },
          {
            ...TRADE_FACTS[2],
            fact: "America domină exporturile aerospațiale — Boeing vinde în peste 150 de țări",
            detail:
              "Numai sectorul aerospațial și de apărare generează exporturi anuale de peste 132 mld. $. Fiecare mare companie aeriană din lume zboară cu motoare, avioane sau avionică americană.",
          },
          {
            ...TRADE_FACTS[3],
            fact: "America hrănește lumea — peste 58 mld. $ exporturi agricole anual",
            detail:
              "SUA sunt cel mai mare exportator mondial de soia, porumb, bumbac și migdale și printre lideri la grâu, carne de pasăre și porc. Fermierii americani cultivă hrană care ajunge în fiecare colț al globului.",
          },
          {
            ...TRADE_FACTS[4],
            fact: "Exporturile farmaceutice americane salvează vieți pe toate continentele",
            detail:
              "Pfizer, Merck, Eli Lilly, Johnson & Johnson — exporturile farmaceutice ale SUA depășesc anual 63 mld. $. Vaccinurile mRNA pentru COVID au fost singure un eveniment de export de peste 50 mld. $.",
          },
          {
            ...TRADE_FACTS[5],
            fact: "Exporturile americane de software și proprietate intelectuală depășesc 200 mld. $ anual",
            detail:
              "Microsoft Windows, Adobe Creative Suite, Salesforce, AWS, App Store-ul Apple — software-ul american este infrastructura invizibilă a economiei globale.",
          },
          {
            ...TRADE_FACTS[6],
            fact: "Căile ferate de marfă din SUA sunt cele mai eficiente din lume",
            detail:
              "În timp ce Europa subvenționează masiv transportul feroviar de călători, SUA excelează în transportul feroviar de marfă. Trenurile cu containere duble reduc costurile de transport, permițând logistica rapidă și prețurile mici.",
            source: "Association of American Railroads 2026",
          },
          {
            ...TRADE_FACTS[7],
            fact: "Autostrada Invizibilă de Marfă: Căile Navigabile Interioare ale Americii",
            detail: "SUA administrează 19.300 km de canale de navigație interioară și 17.700 km de căi navigabile intracoastale. O singură barjă transportă cât 70 de TIR-uri. Fluviul Mississippi susține 60% din exporturile de cereale ale SUA — un avantaj geografic natural neegalat în Europa sau Asia.",
            source: "US Army Corps of Engineers / ASCE 2024",
          },
          {
            ...TRADE_FACTS[8],
            fact: "Geografia Agricolă: O Moștenire Naturală Unică",
            detail: "Statele Unite dețin cel mai mare bloc contiguu de terenuri arabile de Clasa I și II din lume în Midwest și Marile Câmpii, beneficiind de precipitații temperate și acces direct la două oceane și Golful Mexic, oferind imunitate la insecuritate alimentară.",
            source: "USDA Foreign Agricultural Service 2026",
          },
          {
            ...TRADE_FACTS[9],
            fact: "Republica Tiriștilor: Sistemul Nervos al Transportului Terestru",
            detail: "Peste 3,5 milioane de șoferi profesioniști de camion transportă 70% din valoarea mărfurilor interne din SUA, coordonând anual transporturi terestre de 800 de miliarde de dolari. Susținută de lanțuri private de popasuri gigantice (Pilot Flying J, Love's, TA), această rețea logistică de mare viteză menține economia continentală în timp real.",
            source: "American Trucking Associations / Bureau of Transportation Statistics 2026",
          },
          {
            ...TRADE_FACTS[10],
            fact: "Autostrăzile Interstatale: Integrarea Economică a Continentului",
            detail: "Cu 47.856 de mile (77.000 km) de autostrăzi cu acces limitat, aceasta este cea mai mare rețea din lume. Construită din 1956, a conectat o populație de 330 de milioane de oameni cu o geometrie rutieră standardizată, reducând timpii de transport de marfă și integrând forța de muncă.",
            source: "Federal Highway Administration (FHWA) 2024",
          },
        ]
      : TRADE_FACTS;
  const tradePartners =
    locale === "ro"
      ? TRADE_PARTNERS.map((partner) => ({
          ...partner,
          country:
            {
              Canada: "Canada",
              Mexico: "Mexic",
              China: "China",
              Germany: "Germania",
              Japan: "Japonia",
              "South Korea": "Coreea de Sud",
              "United Kingdom": "Regatul Unit",
              India: "India",
            }[partner.country] ?? partner.country,
          direction:
            {
              "Largest overall partner": "Cel mai mare partener per total",
              "#1 goods trading partner 2023": "Partenerul nr. 1 la comerțul cu bunuri în 2023",
              "Largest goods deficit": "Cel mai mare deficit la bunuri",
              "Key machinery & auto partner": "Partener-cheie pentru utilaje și auto",
              "Technology & automotive": "Tehnologie și industrie auto",
              "Semiconductors & EVs": "Semiconductori și vehicule electrice",
              "Services surplus partner": "Partener pentru surplusul de servicii",
              "Fastest-growing partner": "Partenerul cu cea mai rapidă creștere",
            }[partner.direction] ?? partner.direction,
        }))
      : TRADE_PARTNERS;
  const topExportCompanies =
    locale === "ro"
      ? TOP_EXPORT_COMPANIES.map((company) => ({
          ...company,
          sector:
            {
              Aerospace: "Aerospațial",
              Energy: "Energie",
              "Consumer Tech": "Tehnologie de consum",
              "Software / Cloud": "Software / Cloud",
              Industrial: "Industrial",
              "Medical Devices": "Dispozitive medicale",
              Agriculture: "Agricultură",
            }[company.sector] ?? company.sector,
          note:
            {
              "Largest US goods exporter": "Cel mai mare exportator american de bunuri",
              "Petroleum products leader": "Lider în produse petroliere",
              "$100B+ in international revenue": "Peste 100 mld. $ venituri internaționale",
              "Azure & Office 365 globally": "Azure și Office 365 la nivel global",
              "Heavy machinery to 190 countries": "Utilaje grele în 190 de țări",
              "Jet engines, power equipment": "Motoare de avion și echipamente energetice",
              "Devices used in every hospital globally": "Dispozitive folosite în spitale din toată lumea",
              "Feed the world from the Great Plains": "Hrănesc lumea din Marile Câmpii",
            }[company.note] ?? company.note,
        }))
      : TOP_EXPORT_COMPANIES;
  const copy =
    locale === "ro"
      ? {
          heroAlt: "Port de containere — motorul exporturilor americane",
          heroEyebrow: "Comerț și Exporturi",
          heroLead: "AMERICA SUSȚINE",
          heroAccent: "COMERȚUL GLOBAL",
          heroBody:
            "Avioane, semiconductori, produse farmaceutice, petrol, produse agricole și trilioane în software și servicii financiare. America nu doar face comerț — furnizează lumii cele mai avansate și valoroase bunuri ale ei.",
          overviewTitle: "Mașina de export a Americii",
          exportTitle: "Principalele categorii de export ale SUA (2026)",
          exportBody:
            "Spre deosebire de țările în curs de dezvoltare care exportă materii prime, Statele Unite exportă cele mai sofisticate produse cu marjă mare din lume — avioane, microcipuri, dispozitive medicale și produse farmaceutice. Sunt produse care cer decenii și miliarde în cercetare și dezvoltare, consolidând poziția Americii în vârful lanțului valoric global.",
          topCategorySuffix: "% din categoria de top",
          exportSource: "Sursă: US Census Bureau / Bureau of Economic Analysis 2026",
          partnersTitle: "Principalii parteneri comerciali ai Americii",
          partnersBody:
            "Comerțul total al SUA (bunuri + servicii) depășește anual 6 trilioane de dolari. Cele mai mari relații comerciale se întind pe tot globul — de la Canada și Mexic în cadrul USMCA până la centrele tehnologice și de producție ale Asiei.",
          championsTitle: "Campionii globali ai exporturilor americane",
          companyLabel: "Companie",
          sectorLabel: "Sector",
          hqLabel: "Sediu",
          roleLabel: "Rol global",
          numbersTitle: "Cifrele exporturilor",
          servicesEyebrow: "Superputerea ascunsă a exporturilor",
          servicesTitle: "Serviciile: surplusul comercial de un trilion de dolari al Americii",
          servicesP1:
            "Deși SUA au deficit comercial la bunuri, ele au un surplus masiv în servicii — aproximativ 250+ mld. $ anual. Consultanță financiară, cloud computing, licențiere TV și film, educație universitară pentru studenți străini, abonamente software și consultanță — aceste exporturi invizibile depășesc ceea ce majoritatea țărilor vând în bunuri.",
          servicesP2:
            "Când o bancă din Coreea plătește Goldman Sachs pentru consultanță M&A, când o firmă germană licențiază Adobe Creative Suite, când un student brazilian plătește taxa la Harvard — America exportă bogăție fără să trimită niciun container.",
          servicesImageAlt:
            "New York City — capitala exporturilor americane de servicii financiare",
          quoteTitle: "Al 40-lea președinte al Statelor Unite",
          prevLink: "← Dominația Dolarului",
          nextLink: "↑ Prezentare economie",
        }
      : {
          heroAlt: "Container port — America's export machine",
          heroEyebrow: "Trade & Exports",
          heroLead: "AMERICA POWERS",
          heroAccent: "GLOBAL COMMERCE",
          heroBody:
            "Aircraft, semiconductors, pharmaceuticals, petroleum, agricultural products, and trillions in software and financial services. America doesn't just trade — it supplies the world with its most advanced and high-value goods.",
          overviewTitle: "America's Export Machine",
          exportTitle: "Top US Export Categories (2026)",
          exportBody:
            "Unlike developing nations that export raw commodities, the United States exports the world's most sophisticated, highest-margin goods — aircraft, microchips, medical devices, and pharmaceuticals. These are products that take decades and billions in R&D to develop, cementing America's position at the top of the global value chain.",
          topCategorySuffix: "% of top category",
          exportSource: "Source: US Census Bureau / Bureau of Economic Analysis 2026",
          partnersTitle: "America's Top Trading Partners",
          partnersBody:
            "US total trade (goods + services) exceeds $6 trillion annually. The largest trading relationships span the entire globe — from Canada and Mexico under USMCA to Asia's technology and manufacturing hubs.",
          championsTitle: "America's Global Export Champions",
          companyLabel: "Company",
          sectorLabel: "Sector",
          hqLabel: "HQ",
          roleLabel: "Global Role",
          numbersTitle: "The Export Numbers",
          servicesEyebrow: "The Hidden Export Superpower",
          servicesTitle: "Services: America's Trillion-Dollar Trade Surplus",
          servicesP1:
            "While the US runs a trade deficit in goods, it runs a massive surplus in services — approximately $250+ billion annually. Financial advisory, cloud computing, film and TV licensing, university education for foreign students, software subscriptions, and consulting — these invisible exports dwarf what most nations sell in goods.",
          servicesP2:
            "When a Korean bank pays Goldman Sachs for M&A advisory, when a German firm licenses Adobe Creative Suite, when a Brazilian student pays Harvard tuition — America exports wealth without shipping a single container.",
          servicesImageAlt:
            "New York City — export capital of American financial services",
          quoteTitle: "40th President of the United States",
          prevLink: "← Dollar Dominance",
          nextLink: "↑ Economy Overview",
        };

  // Used to scale each export bar relative to the biggest category.
  const maxExport = Math.max(...exportCategories.map((c) => c.exports));

  return (
    <>
      <MacroStyles />
      <MacroHero 
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        eyebrow={copy.heroEyebrow}
        description={copy.heroBody}
        imageSrc={SITE_IMAGES.economyPort}
        imageAlt={copy.heroAlt}
      />

      {/* Main Content */}
      <div className="bg-[#030405] relative z-10 pb-32 pt-16">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 mb-24">
          <Breadcrumb
            items={[
              { label: breadcrumbEconomy, href: "/economy" },
              { label: pageLabel },
            ]}
          />
        </div>

        <div className="mx-auto max-w-[1600px] px-6 md:px-12 space-y-48">
          {/* Overview */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.overviewTitle}
            </h2>
            {overviewParagraphs.map((para, i) => (
              <p
                key={i}
                className="macro-body max-w-4xl mb-8"
              >
                {para}
              </p>
            ))}
          </section>

          {/* Export categories chart */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.exportTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.exportBody}
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-24">
              {exportCategories.map((cat) => (
                <div key={cat.category} className="flex flex-col border-t border-[#E8B923]/30 pt-8 hover:border-[#E8B923]/60 transition-colors duration-300">
                  <h3 className="font-macro-display text-2xl text-white mb-6">{cat.category}</h3>
                  <p className="font-macro-display text-5xl text-[#E8B923] mt-auto">
                    $<CountUp value={cat.exports} suffix="B" decimals={0} />+
                  </p>
                </div>
              ))}
              <div className="col-span-full pt-8 border-t border-white/5">
                <p className="text-right macro-metadata text-white/30">
                  {copy.exportSource}
                </p>
              </div>
            </div>
          </section>

          {/* Trade partners */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.partnersTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.partnersBody}
            </p>
            <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
              {tradePartners.map((partner) => (
                <div key={partner.country} className="flex flex-col border-t border-[#E8B923]/30 pt-8">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-4xl">{partner.flag}</span>
                    <span className="font-macro-display text-3xl text-white">
                      {partner.country}
                    </span>
                  </div>
                  <p className="font-macro-display text-5xl text-[#E8B923] mb-4">
                    {partner.trade}
                  </p>
                  <p className="macro-metadata text-white/40 border-t border-white/10 pt-4 mt-auto">
                    {partner.direction}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Top export companies */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.championsTitle}
            </h2>
            <div className="grid gap-8 border-t border-white/5 pt-8">
              {topExportCompanies.map((company, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-white/10 pb-8 items-center">
                  <div className="font-macro-display text-3xl text-white">{company.company}</div>
                  <div>
                    <span className="macro-metadata border border-white/20 px-3 py-1 text-white">
                      {company.sector}
                    </span>
                  </div>
                  <div className="font-macro-body text-white/45">{company.hq}</div>
                  <div className="font-macro-body text-white/60">{company.note}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Facts */}
          <section className="border-t border-white/5 pt-32">
            <h2 className="macro-section-title text-[clamp(24px,4vw,60px)] mb-16">
              {copy.numbersTitle}
            </h2>
            <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {tradeFacts.map((fact, i) => (
                <MacroFact
                  key={fact.id}
                  index={i + 1}
                  fact={fact.fact}
                  detail={fact.detail}
                />
              ))}
            </div>
          </section>

          {/* Services exports callout */}
          <InfrastructureBand
            imageSrc={SITE_IMAGES.economyTradeSkyline}
            imageAlt={copy.servicesImageAlt}
          >
            <h2 className="macro-section-title mb-6">{copy.servicesTitle}</h2>
            <p className="macro-body max-w-4xl">{copy.servicesP1}</p>
            <p className="macro-body max-w-4xl mt-4">{copy.servicesP2}</p>
          </InfrastructureBand>

          <div className="border-t border-white/5 pt-32 pb-16">
            <QuoteBlock
              quote={
                locale === "ro"
                  ? "Comerțul este slujitorul libertății. O țară care își poate vinde cele mai bune bunuri și idei în lume își va păstra mereu avantajul competitiv."
                  : "Trade is the handmaiden of freedom. A country that can sell its best goods and ideas to the world will always maintain its competitive edge."
              }
              attribution="Ronald Reagan"
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-16 mt-32">
            <Link
              href="/economy/dollar-dominance"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy"
              className="font-macro-mono text-sm uppercase tracking-widest text-[#E8B923] hover:text-white transition-colors"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
