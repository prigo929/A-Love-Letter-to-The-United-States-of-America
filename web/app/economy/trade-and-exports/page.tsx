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
import { MacroStyles, MacroHero, MacroStat, InfrastructureBand, CountUp, MacroFact } from "@/components/economy/EconomyAnimations";
import { ExportsByCategoryChart } from "@/components/data/ExportsByCategoryChart";
import { ExportsImportsChart } from "@/components/data/ExportsImportsChart";
import {
  getTradeOverviewParagraphs,
  US_EXPORTS_BY_CATEGORY,
  US_EXPORTS_VS_IMPORTS,
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
  // Export categories come from US_EXPORTS_BY_CATEGORY, which carries its own
  // Romanian labels — no translation map needed here.
  //
  // This page used to render a second, contradictory dataset (US_EXPORT_CATEGORIES)
  // as static cards: it put pharmaceuticals at $63B and aircraft at $132B, against
  // the $120B and $164B the GDP page showed for the same year. Census FT-900 puts
  // pharmaceutical preparations at $119.8B, so the other dataset was the wrong one
  // and has been deleted rather than left to contradict this page's neighbour.
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
          heroAlt: "Port de containere: motorul exporturilor americane",
          heroEyebrow: "Comerț și Exporturi",
          heroLead: "AMERICA SUSȚINE",
          heroAccent: "COMERȚUL GLOBAL",
          heroBody:
            "America exportă o diversitate largă de bunuri cu valoare adăugată ridicată: de la avioane și semiconductori la produse agricole, petrol și servicii tehnologice.",
          overviewTitle: "Mașina de export a Americii",
          exportTitle: "Principalele categorii de export ale SUA",
          exportBody:
            "Spre deosebire de țările în curs de dezvoltare care exportă materii prime, Statele Unite exportă cele mai sofisticate produse cu marjă mare din lume: avioane, microcipuri, dispozitive medicale și produse farmaceutice. Sunt produse care cer decenii și miliarde în cercetare și dezvoltare, consolidând poziția Americii în vârful lanțului valoric global. Numai produsele farmaceutice reprezintă o linie de export de 120 de miliarde de dolari.",
          exportChartTitle: "Topul categoriilor de export ale SUA (2025, miliarde USD)",
          exportSource: "Sursă: U.S. Census Bureau / BEA Raport FT-900 (2025 Annual)",
          balanceTitle: "Deficitul, spus pe șleau",
          balanceBody:
            "America cumpără de la lume mai mult decât îi vinde, și face asta din anii '70. Această pagină susține că firma comercială americană este o forță, așa că trebuie să arate cifra pe care acest argument trebuie să o treacă, nu să o ocolească. Două lucruri merită citite de pe grafic. Diferența este reală și persistentă. Dar ambele linii urcă abrupt: Statele Unite exportă astăzi mult mai mult decât au făcut-o vreodată, iar un deficit este ceea ce se vede atunci când o țară este suficient de bogată încât să cumpere producția lumii, vânzând în același timp 2,2 trilioane de dolari din propria producție.",
          balanceChartTitle: "Exporturi vs. importuri de bunuri și servicii ale SUA, 1970–2026",
          balanceChartSubtitle: "Trimestrial, la rată anuală, în dolari curenți",
          balanceSource: "Sursă: Bureau of Economic Analysis (via FRED: EXPGS / IMPGS)",
          partnersTitle: "Principalii parteneri comerciali ai Americii",
          partnersBody:
            "Comerțul total al SUA (bunuri + servicii) depășește anual 6 trilioane de dolari. Cele mai mari relații comerciale se întind pe tot globul: de la Canada și Mexic în cadrul USMCA până la centrele tehnologice și de producție ale Asiei.",
          championsTitle: "Campionii globali ai exporturilor americane",
          companyLabel: "Companie",
          sectorLabel: "Sector",
          hqLabel: "Sediu",
          roleLabel: "Rol global",
          enginesEyebrow: "Cele două motoare",
          enginesTitle: "Bunuri și servicii: motoarele gemene ale comerțului american",
          enginesLead:
            "Două motoare distincte propulsează comerțul american: bunuri fizice expediate din porturi și ferme, și servicii invizibile livrate prin cabluri și contracte. Împreună depășesc 3 trilioane de dolari în exporturi anuale, o combinație pe care nicio altă economie nu o poate egala.",
          engineGoodsLabel: "Exporturi de bunuri / an",
          engineServicesLabel: "Exporturi de servicii / an",
          engineSoftwareLabel: "Software și proprietate intelectuală / an",
          vsEyebrow: "Avantajul structural",
          vsTitle: "America față de restul lumii",
          vsLead:
            "Dincolo de produse, America exportă ceva ce nu poate fi copiat: o geografie continentală și sisteme logistice unificate care fac totul să circule mai ieftin și mai rapid.",
          vsUsHeader: "Statele Unite",
          vsWorldHeader: "Restul lumii",
          pullStatLabel:
            "de colete traversează America în fiecare zi: coloana vertebrală privată a comerțului global, FedEx și UPS, finanțată integral de piețele de capital.",
          servicesEyebrow: "Superputerea ascunsă a exporturilor",
          servicesTitle: "Serviciile: surplusul comercial de un trilion de dolari al Americii",
          servicesP1:
            "Deși SUA au deficit comercial la bunuri, ele au un surplus masiv în servicii: aproximativ 250+ mld. $ anual. Consultanță financiară, cloud computing, licențiere TV și film, educație universitară pentru studenți străini, abonamente software și consultanță: aceste exporturi invizibile depășesc ceea ce majoritatea țărilor vând în bunuri.",
          servicesP2:
            "Când o bancă din Coreea plătește Goldman Sachs pentru consultanță M&A, când o firmă germană licențiază Adobe Creative Suite, când un student brazilian plătește taxa la Harvard: America exportă bogăție fără să trimită niciun container.",
          servicesImageAlt:
            "New York City: capitala exporturilor americane de servicii financiare",
          quoteTitle: "Al 40-lea președinte al Statelor Unite",
          prevLink: "← Dominația Dolarului",
          nextLink: "↑ Prezentare economie",
        }
      : {
          heroAlt: "Container port: America's export machine",
          heroEyebrow: "Trade & Exports",
          heroLead: "AMERICA POWERS",
          heroAccent: "GLOBAL COMMERCE",
          heroBody:
            "America exports a wide diversity of high-value goods: from aircraft and semiconductors to agricultural products, petroleum, and technology services.",
          overviewTitle: "America's Export Machine",
          exportTitle: "Top US Export Categories",
          exportBody:
            "Unlike developing nations that export raw commodities, the United States exports the world's most sophisticated, highest-margin goods: aircraft, microchips, medical devices, and pharmaceuticals. These are products that take decades and billions in R&D to develop, cementing America's position at the top of the global value chain. Pharmaceutical preparations alone are a $120 billion export line.",
          exportChartTitle: "Top US goods export categories (2025, USD billions)",
          exportSource: "Source: U.S. Census Bureau / BEA FT-900 Report (2025 Annual)",
          balanceTitle: "The Deficit, Stated Plainly",
          balanceBody:
            "America buys more from the world than it sells to it, and has since the 1970s. This page argues that American trade is a strength, so it should show the number that argument has to survive rather than route around it. Two things are worth reading off the chart. The gap is real and persistent. But both lines climb steeply: the United States exports far more today than it ever has, and a deficit is what it looks like when a country is rich enough to buy the world's output while still selling $2.2 trillion of its own.",
          balanceChartTitle: "US exports vs imports of goods and services, 1970–2026",
          balanceChartSubtitle: "Quarterly, at an annual rate, in current dollars",
          balanceSource: "Source: Bureau of Economic Analysis (via FRED: EXPGS / IMPGS)",
          partnersTitle: "America's Top Trading Partners",
          partnersBody:
            "US total trade (goods + services) exceeds $6 trillion annually. The largest trading relationships span the entire globe: from Canada and Mexico under USMCA to Asia's technology and manufacturing hubs.",
          championsTitle: "America's Global Export Champions",
          companyLabel: "Company",
          sectorLabel: "Sector",
          hqLabel: "HQ",
          roleLabel: "Global Role",
          enginesEyebrow: "The Two Engines",
          enginesTitle: "Goods & Services: The Twin Engines of American Trade",
          enginesLead:
            "Two distinct engines drive American trade: physical goods shipped from ports and farms, and invisible services delivered over wires and contracts. Together they top $3 trillion in annual exports, a combination no other economy can match.",
          engineGoodsLabel: "Goods exports / year",
          engineServicesLabel: "Services exports / year",
          engineSoftwareLabel: "Software & intellectual property / year",
          vsEyebrow: "The Structural Edge",
          vsTitle: "America vs. The World",
          vsLead:
            "Beyond products, America exports something that can't be copied: a continental geography and unified logistics systems that move everything cheaper and faster.",
          vsUsHeader: "United States",
          vsWorldHeader: "The Rest of the World",
          pullStatLabel:
            "packages move across America every day: the private backbone of global commerce, FedEx and UPS, funded entirely by capital markets.",
          servicesEyebrow: "The Hidden Export Superpower",
          servicesTitle: "Services: America's Trillion-Dollar Trade Surplus",
          servicesP1:
            "While the US runs a trade deficit in goods, it runs a massive surplus in services: approximately $250+ billion annually. Financial advisory, cloud computing, film and TV licensing, university education for foreign students, software subscriptions, and consulting: these invisible exports dwarf what most nations sell in goods.",
          servicesP2:
            "When a Korean bank pays Goldman Sachs for M&A advisory, when a German firm licenses Adobe Creative Suite, when a Brazilian student pays Harvard tuition: America exports wealth without shipping a single container.",
          servicesImageAlt:
            "New York City: export capital of American financial services",
          quoteTitle: "40th President of the United States",
          prevLink: "← Dollar Dominance",
          nextLink: "↑ Economy Overview",
        };

  // Used to scale each export bar relative to the biggest category.

  // The two headline export streams — rendered as big borderless stats rather
  // than another wall of paragraphs.
  const engines = [
    { value: "$2T+", label: copy.engineGoodsLabel },
    { value: "$1T+", label: copy.engineServicesLabel },
    { value: "$200B+", label: copy.engineSoftwareLabel },
  ];

  // Head-to-head structural advantages. These used to be prose "facts"; a
  // comparison table makes the US-vs-world contrast do the persuading.
  const comparisons =
    locale === "ro"
      ? [
          {
            topic: "Trafic aerian",
            us: "Un singur spațiu aerian unificat · 80.000 de zboruri pe zi",
            world: "Europa: 37 de organizații naționale fragmentate",
          },
          {
            topic: "Transport feroviar de marfă",
            us: "Cea mai eficientă rețea de marfă din lume · containere duble",
            world: "Europa: cale ferată de pasageri subvenționată, marfă redusă",
          },
          {
            topic: "Căi navigabile interioare",
            us: "O barjă = 70 de TIR-uri · Mississippi duce 60% din exporturile de cereale",
            world: "Nicio rețea naturală comparabilă",
          },
          {
            topic: "Teren agricol",
            us: "Cel mai mare bloc contiguu de teren arabil de Clasa I/II de pe Pământ",
            world: "Fragmentat peste granițe și climate",
          },
        ]
      : [
          {
            topic: "Air Traffic Control",
            us: "One unified airspace · 80,000 flights a day",
            world: "Europe: 37 fragmented national ANSPs",
          },
          {
            topic: "Freight Rail",
            us: "World's most efficient freight network · double-stacked containers",
            world: "Europe: subsidized passenger rail, minimal freight",
          },
          {
            topic: "Inland Waterways",
            us: "1 barge = 70 tractor-trailers · Mississippi carries 60% of grain exports",
            world: "No comparable natural network",
          },
          {
            topic: "Farmland",
            us: "Largest contiguous Class I/II arable block on Earth",
            world: "Fragmented across borders and climates",
          },
        ];

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

            <div className="my-24">
              <ExportsByCategoryChart
                data={US_EXPORTS_BY_CATEGORY}
                title={copy.exportChartTitle}
                source={copy.exportSource}
              />
            </div>
          </section>

          {/* The balance itself — the number this page's argument has to survive */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.balanceTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.balanceBody}
            </p>
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
              <ExportsImportsChart
                data={US_EXPORTS_VS_IMPORTS}
                title={copy.balanceChartTitle}
                subtitle={copy.balanceChartSubtitle}
                source={copy.balanceSource}
              />
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

          {/* Infrastructure & Logistics Features */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-12 font-semibold">
              {locale === "ro" ? "LOGISTICĂ ȘI INFRASTRUCTURĂ" : "LOGISTICS & INFRASTRUCTURE SYSTEMS"}
            </p>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-[#E8B923]/20 transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <Image
                    src="/images/library/Landscapes/Mississippi River running through Minneapolis .jpg"
                    alt="Mississippi River Inland Waterways"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-8 space-y-4">
                  <span className="macro-eyebrow">
                    {locale === "ro" ? "AUTOSTRĂZILE INVIZIBILE DE APĂ" : "THE INVISIBLE WATER HIGHWAY"}
                  </span>
                  <h3 className="font-macro-display text-2xl font-bold text-white">
                    {locale === "ro" ? "Căile Navigabile Interioare ale Americii" : "The Inland Waterway Network"}
                  </h3>
                  <p className="font-macro-body text-base text-white/70 leading-relaxed">
                    {locale === "ro"
                      ? "Cu peste 12.000 de mile de canale de navigație interioară coordonate de US Army Corps of Engineers, fluviul Mississippi și intrările intracoastale acționează ca un sistem circulator continental extrem de ieftin. O singură barjă transportă cât 70 de TIR-uri, Mississippi singur susținând 60% din exporturile de cereale."
                      : "Spanning over 12,000 miles of commercial navigation channels managed by the US Army Corps of Engineers, America's river systems form a continental plumbing network of radical shipping efficiency. A single barge moves the equivalent cargo of 70 tractor-trailers, carrying 60% of all US grain exports down to Gulf terminals."}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-[#E8B923]/20 transition-all duration-300">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <Image
                    src="/images/library/Infrastructure/I-110 and I-115 Interchange Los Angeles.jpg"
                    alt="US Interstate Highway System Interchange"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-8 space-y-4">
                  <span className="macro-eyebrow">
                    {locale === "ro" ? "SISTEMUL NERVOS DE MARFĂ" : "THE OVERLAND FREIGHT SYSTEM"}
                  </span>
                  <h3 className="font-macro-display text-2xl font-bold text-white">
                    {locale === "ro" ? "Autostrăzile Interstatale și Transportul Terestru" : "The Interstate Highway & Trucking"}
                  </h3>
                  <p className="font-macro-body text-base text-white/70 leading-relaxed">
                    {locale === "ro"
                      ? "Inițiat de președintele Eisenhower, sistemul de autostrăzi interstatale de 47.856 de mile a integrat economia continentului. Astăzi, peste 3,5 milioane de șoferi profesioniști de camion transportă 70% din valoarea mărfurilor interne din SUA, menținând logistica în timp real."
                      : "Initiated under President Eisenhower, the 47,856-mile Interstate Highway System unified the labor and distribution systems of a continent. Today, over 3.5 million professional truck drivers move 70% of all domestic freight value, coordinated by massive travel centers that operate in real-time."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* America vs. the world — the structural, un-copyable advantages */}
          <section className="border-t border-white/5 pt-32">
            <span className="macro-eyebrow">{copy.vsEyebrow}</span>
            <h2 className="macro-section-title mt-6 mb-12">{copy.vsTitle}</h2>
            <p className="macro-body max-w-4xl mb-16">{copy.vsLead}</p>

            <div className="grid grid-cols-12 gap-4 border-b border-white/10 pb-4">
              <div className="hidden md:block md:col-span-3" />
              <div className="col-span-6 md:col-span-5">
                <span className="macro-metadata text-[#E8B923]">{copy.vsUsHeader}</span>
              </div>
              <div className="col-span-6 md:col-span-4">
                <span className="macro-metadata text-white/40">{copy.vsWorldHeader}</span>
              </div>
            </div>

            {comparisons.map((row) => (
              <div
                key={row.topic}
                className="grid grid-cols-12 gap-4 border-b border-white/10 py-8 items-start"
              >
                <div className="col-span-12 md:col-span-3 font-macro-display text-xl md:text-2xl text-white mb-2 md:mb-0">
                  {row.topic}
                </div>
                <div className="col-span-6 md:col-span-5 font-macro-body text-base md:text-lg text-white leading-relaxed">
                  <span className="text-[#E8B923] mr-2" aria-hidden="true">▮</span>
                  {row.us}
                </div>
                <div className="col-span-6 md:col-span-4 font-macro-body text-base text-white/40 leading-relaxed">
                  {row.world}
                </div>
              </div>
            ))}
          </section>

          {/* Logistics pull-stat — one cinematic number instead of a card */}
          <section className="border-t border-white/5 pt-32">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display font-black leading-none tracking-tighter text-[clamp(80px,16vw,220px)]">
                <CountUp value={40} suffix="M" />
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.pullStatLabel}</p>
            </div>
          </section>

          {/* The two engines — headline export stats, not paragraphs */}
          <section className="border-t border-white/5 pt-32">
            <span className="macro-eyebrow">{copy.enginesEyebrow}</span>
            <h2 className="macro-section-title mt-6 mb-12">{copy.enginesTitle}</h2>
            <p className="macro-body max-w-4xl mb-20">{copy.enginesLead}</p>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {engines.map((engine) => (
                <MacroStat key={engine.label} value={engine.value} label={engine.label} />
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
