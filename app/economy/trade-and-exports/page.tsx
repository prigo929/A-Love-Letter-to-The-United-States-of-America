// ─── Trade & Exports Sub-Page ─────────────────────────────────────────────────
// Deep-dive page about America's export engine and trading relationships.
//
// Beginner guide:
// - Shared overview paragraphs and export-category data come from economy-data.ts
// - This file controls how those facts are presented on the page
// - To change the hero photo, update SITE_IMAGES.economyPort below

import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import type { Locale } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/server";
import {
  getTradeOverviewParagraphs,
  US_EXPORT_CATEGORIES,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

const getPageMetadata = (locale: Locale) => ({
  title:
    locale === "ro"
      ? "Comerț și Exporturi | Economie | America: The Greatest Nation"
      : "Trade & Exports | Economy | America: The Greatest Nation",
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
    source: "US Census Bureau / BEA 2024",
    color: "gold" as const,
  },
  {
    id: "trade-services",
    fact: "US services exports exceed $1 trillion — the world's largest",
    detail:
      "Financial services from Goldman Sachs and JPMorgan, software from Microsoft and Salesforce, education from Harvard and MIT, entertainment from Hollywood — America's service exports are the envy of the world.",
    source: "BEA / USTR 2024",
    color: "red" as const,
  },
  {
    id: "trade-aerospace",
    fact: "America dominates aerospace exports — Boeing sells to 150+ countries",
    detail:
      "The aerospace and defense sector alone generates $132B+ in annual exports. Every major airline on Earth flies American-built engines, aircraft, or avionics. There is no peer competitor in commercial aerospace.",
    source: "Aerospace Industries Association 2024",
    color: "blue" as const,
  },
  {
    id: "trade-ag",
    fact: "America feeds the world — $58B+ in annual agricultural exports",
    detail:
      "The US is the world's largest exporter of soybeans, corn, cotton, and almonds, and among the top exporters of wheat, poultry, and pork. American farmers grow food that reaches every corner of the globe.",
    source: "USDA Foreign Agricultural Service 2024",
    color: "gold" as const,
  },
  {
    id: "trade-pharma",
    fact: "American pharmaceutical exports save lives on every continent",
    detail:
      "Pfizer, Merck, Eli Lilly, Johnson & Johnson — US pharmaceutical exports exceed $63 billion annually. COVID mRNA vaccines alone were a $50B+ export event. American biotech is a global public good.",
    source: "PhRMA / BEA 2024",
    color: "red" as const,
  },
  {
    id: "trade-tech",
    fact: "US software and intellectual property exports: $200B+ annually",
    detail:
      "Microsoft Windows, Adobe Creative Suite, Salesforce CRM, AWS cloud services, Apple App Store — American software is the invisible infrastructure of the global economy, generating hundreds of billions in annual export value.",
    source: "BEA Intellectual Property Products 2024",
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
          heroLead: "AMERICA ALIMENTEAZĂ",
          heroAccent: "COMERȚUL GLOBAL",
          heroBody:
            "Avioane, semiconductori, produse farmaceutice, petrol, produse agricole și trilioane în software și servicii financiare. America nu doar face comerț — furnizează lumii cele mai avansate și valoroase bunuri ale ei.",
          overviewTitle: "Mașina de export a Americii",
          exportTitle: "Principalele categorii de export ale SUA (2024)",
          exportBody:
            "Spre deosebire de țările în curs de dezvoltare care exportă materii prime, Statele Unite exportă cele mai sofisticate produse cu marjă mare din lume — avioane, microcipuri, dispozitive medicale și produse farmaceutice. Sunt produse care cer decenii și miliarde în cercetare și dezvoltare, consolidând poziția Americii în vârful lanțului valoric global.",
          topCategorySuffix: "% din categoria de top",
          exportSource: "Sursă: US Census Bureau / Bureau of Economic Analysis 2024",
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
          exportTitle: "Top US Export Categories (2024)",
          exportBody:
            "Unlike developing nations that export raw commodities, the United States exports the world's most sophisticated, highest-margin goods — aircraft, microchips, medical devices, and pharmaceuticals. These are products that take decades and billions in R&D to develop, cementing America's position at the top of the global value chain.",
          topCategorySuffix: "% of top category",
          exportSource: "Source: US Census Bureau / Bureau of Economic Analysis 2024",
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
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src={SITE_IMAGES.economyPort}
          alt={copy.heroAlt}
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/90 to-navy-dark" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: breadcrumbEconomy, href: "/economy" },
              { label: pageLabel },
            ]}
            className="mb-8"
          />
          <p className="mb-4 section-eyebrow">{copy.heroEyebrow}</p>
          <h1 className="mb-4 font-hero text-6xl text-white sm:text-7xl">
            {copy.heroLead}
            <br />
            <span className="text-glory-gold">{copy.heroAccent}</span>
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/65 leading-relaxed">
            {copy.heroBody}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-navy-dark">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
          {/* Overview */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.overviewTitle}
            </h2>
            {overviewParagraphs.map((para, i) => (
              <p
                key={i}
                className="mb-5 font-body text-lg leading-relaxed text-white/65"
              >
                {para}
              </p>
            ))}
          </section>

          {/* Export categories chart
              This page uses hand-built progress bars instead of Recharts so the
              layout feels more editorial and less dashboard-like. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.exportTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.exportBody}
            </p>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              {exportCategories.map((cat) => {
                const pct = Math.round((cat.exports / maxExport) * 100);
                return (
                  <div key={cat.category} className="group">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-body text-sm text-white/80">
                        {cat.category}
                      </span>
                      <span className="font-hero text-lg text-glory-gold">
                        ${cat.exports}B
                      </span>
                    </div>
                    <div className="h-7 w-full overflow-hidden rounded-full bg-white/8">
                      <div
                        className="flex h-full items-center rounded-full bg-gradient-to-r from-glory-red to-glory-gold px-3 transition-all duration-700"
                        // Dynamic inline width is used here because the bar
                        // length depends on the data value for each category.
                        style={{ width: `${pct}%` }}
                      >
                        <span className="font-body text-xs font-semibold text-navy-dark opacity-0 group-hover:opacity-100 transition-opacity">
                          {pct}{copy.topCategorySuffix}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="pt-2 text-right font-body text-xs text-white/30">
                {copy.exportSource}
              </p>
            </div>
          </section>

          {/* Trade partners */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.partnersTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.partnersBody}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tradePartners.map((partner) => (
                <div
                  key={partner.country}
                  className="rounded-2xl border border-white/10 bg-navy-mid p-4 transition-colors hover:border-glory-gold/25"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl">{partner.flag}</span>
                    <span className="font-body text-sm font-semibold text-white">
                      {partner.country}
                    </span>
                  </div>
                  <p className="font-hero text-2xl text-glory-gold">
                    {partner.trade}
                  </p>
                  <p className="mt-1 font-body text-xs text-white/40">
                    {partner.direction}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Top export companies */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.championsTitle}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.companyLabel}
                      </th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.sectorLabel}
                      </th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.hqLabel}
                      </th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.roleLabel}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topExportCompanies.map((company, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/5 transition-colors hover:bg-white/3"
                      >
                        <td className="px-5 py-4 font-body text-sm font-semibold text-white">
                          {company.company}
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-glory-blue/30 px-2.5 py-0.5 font-body text-xs text-white/65">
                            {company.sector}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-body text-sm text-white/45">
                          {company.hq}
                        </td>
                        <td className="px-5 py-4 font-body text-sm text-white/55">
                          {company.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Facts */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.numbersTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tradeFacts.map((fact) => (
                <FactCard
                  key={fact.id}
                  fact={fact.fact}
                  detail={fact.detail}
                  source={fact.source}
                  color={fact.color}
                  variant="dark"
                />
              ))}
            </div>
          </section>

          {/* Services exports callout */}
          <section className="overflow-hidden rounded-2xl border border-glory-gold/20 bg-glory-gold/5">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <p className="mb-2 section-eyebrow">
                  {copy.servicesEyebrow}
                </p>
                <h2 className="mb-4 font-display text-2xl font-bold text-white">
                  {copy.servicesTitle}
                </h2>
                <p className="font-body text-base leading-relaxed text-white/65">
                  {copy.servicesP1}
                </p>
                <p className="mt-4 font-body text-sm leading-relaxed text-white/55">
                  {copy.servicesP2}
                </p>
              </div>
              <div className="relative hidden md:block">
                <Image
                  src={SITE_IMAGES.economyTradeSkyline}
                  alt={copy.servicesImageAlt}
                  fill
                  className="object-cover opacity-50"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-glory-gold/5 to-transparent" />
              </div>
            </div>
          </section>

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

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link
              href="/economy/dollar-dominance"
              className="font-body text-sm text-white/50 hover:text-white transition-colors"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy"
              className="font-body text-sm font-semibold text-glory-gold hover:text-glory-gold-dark transition-colors"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
