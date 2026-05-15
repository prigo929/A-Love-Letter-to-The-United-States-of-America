// ─── Startups & Venture Capital Sub-Page ─────────────────────────────────────
// A deep-dive into the "Silicon Valley Philosophy" and the funding of the future.
//
// Pedagogical Goal:
// - To demonstrate American dominance in risk capital (47% of global VC).
// - To showcase the "Unicorn" ecosystem and the history of tech founders.
//
// Beginner guide:
// - Most charts and factual datasets come from lib/data/economy-data.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { VCBarChart, UnicornPieChart } from "@/components/data/VCCharts";
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  VC_BY_COUNTRY,
  UNICORNS_BY_COUNTRY,
  getVcFacts,
  STARTUP_TIMELINE,
  STARTUP_ECOSYSTEMS,
  getVcOverviewParagraphs,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Startups & Venture Capital | Economy",
  description:
    "America attracts 65% of all global venture capital. 1,172 unicorn companies. Silicon Valley, the greatest engine of innovation and wealth creation in history.",
  alternates: { canonical: "/economy/startups-venture-capital" },
};

const VC_EXTENDED_FACTS = [
  // Extra facts used only on this page.
  {
    id: "vc-total",
    fact: "US startups raised ~$210B in VC in 2025 — 65% of the global total",
    detail:
      "With just 4.2% of the world's population, America attracts nearly two-thirds of all venture capital deployed on Earth. No other country has come close in the modern era.",
    source: "NVCA / Pitchbook 2026",
    color: "gold" as const,
  },
  {
    id: "vc-stanford",
    fact: "Stanford alumni have founded companies worth $5 trillion+",
    detail:
      "Google (Brin & Page), NVIDIA (Jensen Huang), Netflix (Reed Hastings), Instagram (Mike Krieger), PayPal (Peter Thiel), Yahoo, Cisco, HP, Sun Microsystems — all Stanford.",
    source: "Stanford University Alumni Relations 2026",
    color: "red" as const,
  },
  {
    id: "vc-ai",
    fact: "US AI startups raised $85B in 2025 — 65% of global AI investment",
    detail:
      "OpenAI, Anthropic, Cohere, Mistral (partially US-funded), Inflection AI, Scale AI — the AI revolution is being financed almost entirely by American capital and talent.",
    source: "Pitchbook AI Report 2026",
    color: "blue" as const,
  },
  {
    id: "vc-second-chance",
    fact: "America's bankruptcy laws make failure survivable — a key innovation advantage",
    detail:
      "Chapter 11 bankruptcy protection allows American entrepreneurs to restructure and try again. This tolerance for failure — unique in the world — is a core driver of American startup culture.",
    source: "World Bank Doing Business Report",
    color: "gold" as const,
  },
  {
    id: "vc-immigrants",
    fact: "55% of billion-dollar US startup founders were immigrants or their children",
    detail:
      "Elon Musk (South Africa), Sergey Brin (Russia), Jensen Huang (Taiwan), Pierre Omidyar (France/Iran), Jerry Yang (Taiwan), Andy Grove (Hungary) — America builds greatness from everywhere.",
    source: "NFAP 2022 / Forbes",
    color: "red" as const,
  },
  {
    id: "vc-returns",
    fact: "The top 10 US VC returns have produced over $2 trillion in value from tiny investments",
    detail:
      "Sequoia's $60M investment in Google returned $12B. Benchmark's $13M in eBay became $2.5B. American venture capital is the greatest wealth-creation mechanism ever invented.",
    source: "Forbes / Crunchbase",
    color: "blue" as const,
  },
];

const TOP_VC_FIRMS = [
  // Local data for the VC firm cards further down the page.
  {
    name: "Sequoia Capital",
    aum: "$85B+",
    city: "Menlo Park, CA",
    portfolio: "Apple, Google, WhatsApp, Instagram, Airbnb, Stripe",
  },
  {
    name: "Andreessen Horowitz",
    aum: "$35B+",
    city: "San Francisco, CA",
    portfolio: "Facebook, Twitter, Airbnb, Lyft, GitHub, Coinbase",
  },
  {
    name: "Accel Partners",
    aum: "$18B+",
    city: "Palo Alto, CA",
    portfolio: "Facebook, Dropbox, Slack, Spotify, CrowdStrike",
  },
  {
    name: "Benchmark Capital",
    aum: "$8B+",
    city: "San Francisco, CA",
    portfolio: "eBay, Twitter, Uber, Snapchat, WeWork, Yelp",
  },
  {
    name: "Kleiner Perkins",
    aum: "$12B+",
    city: "Menlo Park, CA",
    portfolio: "Amazon, Google, Genentech, Netscape, Twitter",
  },
  {
    name: "Tiger Global",
    aum: "$50B+",
    city: "New York, NY",
    portfolio: "Facebook (early), Spotify, Stripe, Bytedance, Nubank",
  },
];

export default async function StartupsVCPage() {
  // This page follows the same pattern as the other economy pages:
  // 1. read the locale
  // 2. choose translated/shared datasets
  // 3. pass those arrays into reusable visual components
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Startup-uri și VC" : "Startups & VC";
  const sharedFacts = getVcFacts(locale);
  const overviewParagraphs = getVcOverviewParagraphs(locale);
  // Local facts extend the shared dataset with startup details that are unique
  // to this page, such as Stanford, AI, and immigration examples.
  const localFacts =
    locale === "ro"
      ? [
          {
            ...VC_EXTENDED_FACTS[0],
            fact: "Startup-urile americane au atras aproximativ 210 mld. $ în 2025 — 65% din totalul global",
            detail:
              "Cu doar 4,2% din populația lumii, America atrage aproape două treimi din întreg venture capitalul investit pe Pământ. Nicio altă țară nu s-a apropiat în epoca modernă.",
          },
          {
            ...VC_EXTENDED_FACTS[1],
            fact: "Absolvenții Stanford au fondat companii evaluate la peste 5 trilioane de dolari",
            detail:
              "Google, NVIDIA, Netflix, Instagram, PayPal, Yahoo, Cisco, HP, Sun Microsystems — toate au legături puternice cu Stanford.",
          },
          {
            ...VC_EXTENDED_FACTS[2],
            fact: "Startup-urile americane de AI au atras 85 mld. $ în 2025 — 65% din investiția globală în AI",
            detail:
              "OpenAI, Anthropic, Inflection AI, Scale AI și multe altele — revoluția AI este finanțată în mod covârșitor de capital și talent american.",
          },
          {
            ...VC_EXTENDED_FACTS[3],
            fact: "Legile americane ale falimentului fac eșecul suportabil — un avantaj-cheie al inovației",
            detail:
              "Protecția Chapter 11 le permite antreprenorilor americani să se restructureze și să încerce din nou. Această toleranță față de eșec este un motor central al culturii startup-urilor americane.",
          },
          {
            ...VC_EXTENDED_FACTS[4],
            fact: "55% dintre fondatorii startup-urilor americane de un miliard de dolari au fost imigranți sau copiii lor",
            detail:
              "Elon Musk, Sergey Brin, Jensen Huang, Pierre Omidyar, Jerry Yang, Andy Grove — America construiește măreție din talent venit de pretutindeni.",
          },
          {
            ...VC_EXTENDED_FACTS[5],
            fact: "Primele 10 randamente VC din SUA au creat peste 2 trilioane de dolari valoare din investiții mici",
            detail:
              "Investiția Sequoia de 60M $ în Google a returnat 12B $. Cele 13M $ ale Benchmark în eBay au devenit 2,5B $. VC-ul american este cel mai puternic mecanism de creare de bogăție inventat vreodată.",
          },
        ]
      : VC_EXTENDED_FACTS;
  // We intentionally filter a couple of shared facts here so the "by the
  // numbers" grid does not duplicate ideas already highlighted elsewhere.
  const byTheNumbersFacts = [
    ...sharedFacts.filter(
      (fact) => fact.id !== "vc-share" && fact.id !== "immigrant-founders",
    ),
    ...localFacts,
  ];
  // The remaining arrays below are just content definitions for repeated card
  // layouts farther down the page.
  const vcFirms =
    locale === "ro"
      ? [
          { ...TOP_VC_FIRMS[0], city: "Menlo Park, California" },
          { ...TOP_VC_FIRMS[1], city: "San Francisco, California" },
          { ...TOP_VC_FIRMS[2], city: "Palo Alto, California" },
          { ...TOP_VC_FIRMS[3], city: "San Francisco, California" },
          { ...TOP_VC_FIRMS[4], city: "Menlo Park, California" },
          { ...TOP_VC_FIRMS[5], city: "New York, New York" },
        ]
      : TOP_VC_FIRMS;
  const ecosystems =
    locale === "ro"
      ? STARTUP_ECOSYSTEMS.map((eco) => ({
          ...eco,
          nickname:
            eco.nickname === "The VC Capital of Earth"
              ? "Capitala VC a Pământului"
              : eco.nickname === "Finance & Media Hub"
                ? "Hub financiar și media"
                : eco.nickname === "Biotech & DeepTech"
                  ? "Biotech și deep tech"
                  : eco.nickname === "Cloud & E-Commerce"
                    ? "Cloud și e-commerce"
                    : eco.nickname === "Silicon Hills"
                      ? "Silicon Hills"
                      : "Poarta către cripto și America Latină",
        }))
      : STARTUP_ECOSYSTEMS;
  const copy =
    locale === "ro"
      ? {
          heroAlt: "Birou modern de startup — cultura inovației din Silicon Valley",
          heroEyebrow: "Venture Capital și Startup-uri",
          heroLead: "SILICON\nVALLEY",
          heroAccent: "ESTE O\nPLANETĂ",
          heroBody:
            "Niciun colț al Pământului nu a produs mai multe companii transformatoare, mai mulți miliardari sau mai multă tehnologie care schimbă lumea pe kilometru pătrat. Ecosistemul american de startup-uri este o forță a naturii.",
          overviewTitle: "De ce America conduce lumea în capitalul pentru inovație",
          vcChartTitle: "Investiții venture capital după țară (2026, miliarde USD)",
          unicornTitle: "Economia unicornilor — 1.172 și în creștere",
          unicornBody:
            "Un «unicorn» — o companie privată evaluată la cel puțin 1 miliard de dolari — era cândva considerat o raritate mitologică. America a construit 1.172, reprezentând peste 65% din totalul global. Numai în California s-au născut mai mulți unicorni decât în toată Europa la un loc.",
          unicornChartTitle: "Companii unicorn după țara de origine (2026)",
          rewiredTitle: "Companiile care au rescris civilizația umană",
          rewiredBody:
            "Cele mai importante companii ale erei digitale au fost fondate de americani — sau de imigranți veniți în America. Nu este o coincidență. Combinația dintre talentul de la Stanford și MIT, venture capitalul răbdător, protecția puternică a proprietății intelectuale și o cultură care celebrează ambiția a creat laboratorul perfect pentru inovații care schimbă lumea.",
          yearLabel: "An",
          companyLabel: "Companie",
          founderLabel: "Fondator(i)",
          industryLabel: "Industrie",
          valueLabel: "Valoarea de azi",
          ecosystemsTitle: "Ecosistemele de startup ale Americii",
          ecosystemsBody:
            "Silicon Valley ia cele mai multe titluri, dar ecosistemul american de startup-uri se întinde acum în șase mari centre metropolitane — fiecare cu propria specializare, bază de talent și comunitate de investitori.",
          unicornsLabel: "Unicorni",
          annualVcLabel: "VC anual",
          firmsTitle: "Cele mai influente firme VC din lume",
          firmsBody:
            "Toate cele mai importante firme de venture capital din lume își au sediul în Statele Unite. Aceste firme nu doar investesc — ele modelează strategia tehnologică globală, recrutează cei mai buni ingineri din lume și fabrică companiile de mâine.",
          portfolioLabel: "Portofoliu notabil:",
          numbersTitle: "În cifre",
          quoteTitle: "Co-fondator, Andreessen Horowitz — Menlo Park, California",
          prevLink: "← Piețe de Capital",
          nextLink: "Dominația Dolarului →",
        }
      : {
          heroAlt: "Modern startup office — Silicon Valley innovation culture",
          heroEyebrow: "Venture Capital & Startups",
          heroLead: "SILICON\nVALLEY",
          heroAccent: "IS A\nPLANET",
          heroBody:
            "No corner of Earth has produced more transformative companies, more billionaires, or more world-changing technology per square mile. America's startup ecosystem is a force of nature.",
          overviewTitle: "Why America Leads the World in Innovation Capital",
          vcChartTitle: "Venture Capital Investment by Country (2026, USD Billions)",
          unicornTitle: "The Unicorn Economy — 1,172 and Counting",
          unicornBody:
            'A "unicorn" — a private company valued at $1 billion or more — was once considered a mythological rarity. America has built 1,172 of them, representing over 65% of the global total. More unicorns have been born in California alone than in all of Europe combined.',
          unicornChartTitle: "Unicorn Companies by Country of Origin (2026)",
          rewiredTitle: "The Companies That Rewired Human Civilization",
          rewiredBody:
            "The most consequential companies of the digital age were founded by Americans — or immigrants who came to America. This is not a coincidence. The combination of Stanford and MIT talent, patient venture capital, strong IP protection, and a culture that celebrates ambition created a perfect laboratory for world-changing innovation.",
          yearLabel: "Year",
          companyLabel: "Company",
          founderLabel: "Founder(s)",
          industryLabel: "Industry",
          valueLabel: "Today's Value",
          ecosystemsTitle: "America's Startup Ecosystems",
          ecosystemsBody:
            "Silicon Valley gets the headlines, but the American startup ecosystem now spans six major metropolitan hubs — each with its own specialization, talent base, and investor community.",
          unicornsLabel: "Unicorns",
          annualVcLabel: "Annual VC",
          firmsTitle: "The World's Most Influential VC Firms",
          firmsBody:
            "Every one of the world's most consequential venture capital firms is headquartered in the United States. These firms don't just invest — they shape global technology strategy, recruit the world's best engineers, and manufacture the companies of tomorrow.",
          portfolioLabel: "Notable portfolio:",
          numbersTitle: "By the Numbers",
          quoteTitle: "Co-Founder, Andreessen Horowitz — Menlo Park, California",
          prevLink: "← Capital Markets",
          nextLink: "Dollar Dominance →",
        };

  return (
    <>
      <MacroStyles />
      <MacroHero 
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        eyebrow={copy.heroEyebrow}
        description={copy.heroBody}
        imageSrc={SITE_IMAGES.siliconValleyOffice}
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

          {/* VC Chart */}
          <section>
            <div className="my-24">
              <VCBarChart
                data={VC_BY_COUNTRY}
                title={copy.vcChartTitle}
                source="NVCA / Pitchbook 2026"
              />
            </div>
          </section>

          {/* Unicorn chart */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.unicornTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.unicornBody}
            </p>
            <div className="my-24 bg-[#030405]/50 backdrop-blur-md p-8 border border-white/10">
              <UnicornPieChart
                data={UNICORNS_BY_COUNTRY}
                title={copy.unicornChartTitle}
                source="Pitchbook 2026"
              />
            </div>
          </section>

          {/* Startup Timeline table */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.rewiredTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.rewiredBody}
            </p>
            
            <div className="grid gap-8 mt-16 border-t border-white/5 pt-8">
              {STARTUP_TIMELINE.map((item, i) => (
                <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-4 border-b border-white/10 pb-8 items-center">
                  <div className="font-macro-display text-3xl text-[#E8B923]">{item.year}</div>
                  <div className="font-macro-display text-2xl text-white">{item.company}</div>
                  <div className="font-macro-body text-white/55">{item.founder}</div>
                  <div>
                    <span className="macro-metadata border border-white/20 px-3 py-1 text-white">
                      {item.industry}
                    </span>
                  </div>
                  <div className="font-macro-display text-2xl text-[#E8B923] text-right">{item.currentValuation}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Startup Ecosystems */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.ecosystemsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.ecosystemsBody}
            </p>
            <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {ecosystems.map((eco) => (
                <div key={eco.city} className="flex flex-col border-t border-white/10 pt-8">
                  <p className="macro-eyebrow mb-6 text-[#E8B923]">
                    {eco.state}
                  </p>
                  <h3 className="font-macro-display text-4xl text-white mb-2">
                    {eco.city}
                  </h3>
                  <p className="font-macro-body text-white/45 italic mb-8">
                    &ldquo;{eco.nickname}&rdquo;
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8 border-t border-white/10 pt-8">
                    <div>
                      <p className="font-macro-display text-4xl text-[#E8B923]">
                        {eco.unicorns}+
                      </p>
                      <p className="macro-metadata mt-2">
                        {copy.unicornsLabel}
                      </p>
                    </div>
                    <div>
                      <p className="font-macro-display text-3xl text-white mt-1">
                        {eco.vcFunding}
                      </p>
                      <p className="macro-metadata mt-3">
                        {copy.annualVcLabel}
                      </p>
                    </div>
                  </div>
                  
                  <p className="macro-metadata text-white/40 leading-relaxed mt-auto border-t border-white/10 pt-8">
                    {eco.keyCompanies.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Top VC Firms */}
          <section>
            <h2 className="macro-section-title mb-12">
              {copy.firmsTitle}
            </h2>
            <p className="macro-body max-w-4xl mb-16">
              {copy.firmsBody}
            </p>
            <div className="grid gap-12 md:grid-cols-2">
              {vcFirms.map((firm) => (
                <div key={firm.name} className="flex flex-col border-t border-white/10 pt-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-macro-display text-4xl text-white">
                      {firm.name}
                    </h3>
                    <span className="font-macro-display text-3xl text-[#E8B923]">
                      {firm.aum}
                    </span>
                  </div>
                  <p className="macro-metadata text-white/40 mb-8">
                    {firm.city}
                  </p>
                  <p className="font-macro-body text-white/60 leading-relaxed">
                    <span className="text-white/30 uppercase text-xs tracking-widest font-mono mr-2">{copy.portfolioLabel}</span>
                    {firm.portfolio}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Facts grid */}
          <section className="border-t border-white/5 pt-32">
            <h2 className="macro-section-title text-[clamp(24px,4vw,60px)] mb-16">
              {copy.numbersTitle}
            </h2>
            <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {byTheNumbersFacts.map((fact, i) => (
                <MacroFact
                  key={fact.id}
                  index={i + 1}
                  fact={fact.fact}
                  detail={fact.detail}
                />
              ))}
            </div>
          </section>

          <div className="border-t border-white/5 pt-32 pb-16">
            <QuoteBlock
              quote={
                locale === "ro"
                  ? "Ecosistemul startup-urilor este cel mai puternic mecanism de creare de bogăție și rezolvare de probleme inventat vreodată. America l-a construit, iar America continuă să îl îmbunătățească."
                  : "The startup ecosystem is the most powerful wealth-creation and problem-solving machine ever invented. America built it, and America keeps improving it."
              }
              attribution="Marc Andreessen"
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-16 mt-32">
            <Link
              href="/economy/capital-markets"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy/dollar-dominance"
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
