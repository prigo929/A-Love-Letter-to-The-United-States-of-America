// ─── Startups & Venture Capital Sub-Page ─────────────────────────────────────
// Deep-dive page about US startups, unicorns, and venture capital.
//
// Beginner guide:
// - Most charts and factual datasets come from lib/data/economy-data.ts
// - This file mainly controls page layout and page-specific supporting blocks
// - To change the hero photo, update SITE_IMAGES.siliconValleyOffice below

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { VCBarChart, UnicornPieChart } from "@/components/data/VCCharts";
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
  title: "Startups & Venture Capital | Economy | America: The Greatest Nation",
  description:
    "America attracts 47% of all global venture capital. 659+ unicorn companies. Silicon Valley, the greatest engine of innovation and wealth creation in history.",
  alternates: { canonical: "/economy/startups-venture-capital" },
};

const VC_EXTENDED_FACTS = [
  // Extra facts used only on this page.
  {
    id: "vc-total",
    fact: "US startups raised ~$170B in VC in 2023 — 47% of the global total",
    detail:
      "With just 4.2% of the world's population, America attracts nearly half of all venture capital deployed on Earth. No other country has come close in the modern era.",
    source: "NVCA / Pitchbook 2024",
    color: "gold" as const,
  },
  {
    id: "vc-stanford",
    fact: "Stanford alumni have founded companies worth $3.5 trillion+",
    detail:
      "Google (Brin & Page), NVIDIA (Jensen Huang), Netflix (Reed Hastings), Instagram (Mike Krieger), PayPal (Peter Thiel), Yahoo, Cisco, HP, Sun Microsystems — all Stanford.",
    source: "Stanford University Alumni Relations 2024",
    color: "red" as const,
  },
  {
    id: "vc-ai",
    fact: "US AI startups raised $67B in 2023 — 65% of global AI investment",
    detail:
      "OpenAI, Anthropic, Cohere, Mistral (partially US-funded), Inflection AI, Scale AI — the AI revolution is being financed almost entirely by American capital and talent.",
    source: "Pitchbook AI Report 2024",
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
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Startup-uri și VC" : "Startups & VC";
  const sharedFacts = getVcFacts(locale);
  const overviewParagraphs = getVcOverviewParagraphs(locale);
  const localFacts =
    locale === "ro"
      ? [
          {
            ...VC_EXTENDED_FACTS[0],
            fact: "Startup-urile americane au atras aproximativ 170 mld. $ în 2023 — 47% din totalul global",
            detail:
              "Cu doar 4,2% din populația lumii, America atrage aproape jumătate din întreg venture capitalul investit pe Pământ. Nicio altă țară nu s-a apropiat în epoca modernă.",
          },
          {
            ...VC_EXTENDED_FACTS[1],
            fact: "Absolvenții Stanford au fondat companii evaluate la peste 3,5 trilioane de dolari",
            detail:
              "Google, NVIDIA, Netflix, Instagram, PayPal, Yahoo, Cisco, HP, Sun Microsystems — toate au legături puternice cu Stanford.",
          },
          {
            ...VC_EXTENDED_FACTS[2],
            fact: "Startup-urile americane de AI au atras 67 mld. $ în 2023 — 65% din investiția globală în AI",
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
          heroLead: "SILICON VALLEY",
          heroAccent: "ESTE O PLANETĂ",
          heroBody:
            "Niciun colț al Pământului nu a produs mai multe companii transformatoare, mai mulți miliardari sau mai multă tehnologie care schimbă lumea pe kilometru pătrat. Ecosistemul american de startup-uri este o forță a naturii.",
          overviewTitle: "De ce America conduce lumea în capitalul pentru inovație",
          vcChartTitle: "Investiții venture capital după țară (2023, miliarde USD)",
          unicornTitle: "Economia unicornilor — 659+ și în creștere",
          unicornBody:
            "Un «unicorn» — o companie privată evaluată la cel puțin 1 miliard de dolari — era cândva considerat o raritate mitologică. America a construit 659, reprezentând peste 52% din totalul global. Numai în California s-au născut mai mulți unicorni decât în toată Europa la un loc.",
          unicornChartTitle: "Companii unicorn după țara de origine (2024)",
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
          heroLead: "SILICON VALLEY",
          heroAccent: "IS A PLANET",
          heroBody:
            "No corner of Earth has produced more transformative companies, more billionaires, or more world-changing technology per square mile. America's startup ecosystem is a force of nature.",
          overviewTitle: "Why America Leads the World in Innovation Capital",
          vcChartTitle: "Venture Capital Investment by Country (2023, USD Billions)",
          unicornTitle: "The Unicorn Economy — 659+ and Counting",
          unicornBody:
            'A "unicorn" — a private company valued at $1 billion or more — was once considered a mythological rarity. America has built 659 of them, representing over 52% of the global total. More unicorns have been born in California alone than in all of Europe combined.',
          unicornChartTitle: "Unicorn Companies by Country of Origin (2024)",
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
      {/* Hero */}
      <div className="relative bg-navy-dark pt-28 pb-16">
        <Image
          src={SITE_IMAGES.siliconValleyOffice}
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
          {/* Overview paras
              Long-form shared copy pulled from economy-data.ts. */}
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

          {/* VC Chart
              Reusable bar chart comparing venture capital by country. */}
          <section>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <VCBarChart
                data={VC_BY_COUNTRY}
                title={copy.vcChartTitle}
                source="NVCA / Pitchbook 2024"
              />
            </div>
          </section>

          {/* Unicorn chart
              Pie chart used here because the goal is share-of-total comparison. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.unicornTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.unicornBody}
            </p>
            <div className="rounded-2xl border border-white/10 bg-navy-mid p-6 md:p-8">
              <UnicornPieChart
                data={UNICORNS_BY_COUNTRY}
                title={copy.unicornChartTitle}
                source="Pitchbook 2024"
              />
            </div>
          </section>

          {/* Startup Timeline table
              A table works well here because users may want to scan founders,
              industries, and valuations row-by-row. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.rewiredTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.rewiredBody}
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.yearLabel}
                      </th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.companyLabel}
                      </th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.founderLabel}
                      </th>
                      <th className="px-5 py-4 text-left font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.industryLabel}
                      </th>
                      <th className="px-5 py-4 text-right font-body text-xs font-semibold uppercase tracking-widest text-white/40">
                        {copy.valueLabel}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {STARTUP_TIMELINE.map((item, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/5 transition-colors hover:bg-white/3"
                      >
                        <td className="px-5 py-4 font-hero text-xl text-glory-gold">
                          {item.year}
                        </td>
                        <td className="px-5 py-4 font-body text-sm font-semibold text-white">
                          {item.company}
                        </td>
                        <td className="px-5 py-4 font-body text-sm text-white/55">
                          {item.founder}
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-glory-blue/30 px-2.5 py-0.5 font-body text-xs text-white/65">
                            {item.industry}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-hero text-lg text-glory-gold">
                          {item.currentValuation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Startup Ecosystems
              Generated from the STARTUP_ECOSYSTEMS array in economy-data.ts. */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.ecosystemsTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.ecosystemsBody}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ecosystems.map((eco) => (
                <div
                  key={eco.city}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-navy-mid transition-all hover:border-glory-gold/30 hover:shadow-[0_0_25px_rgba(255,215,0,0.08)]"
                >
                  <div className="border-b border-white/8 bg-white/3 px-5 py-3">
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-glory-gold">
                      {eco.state}
                    </p>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-0.5 font-display text-lg font-semibold text-white">
                      {eco.city}
                    </h3>
                    <p className="mb-4 font-body text-sm italic text-white/45">
                      &ldquo;{eco.nickname}&rdquo;
                    </p>
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white/5 p-3 text-center">
                        <p className="font-hero text-2xl text-glory-gold">
                          {eco.unicorns}+
                        </p>
                        <p className="font-body text-xs text-white/40">
                          {copy.unicornsLabel}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-3 text-center">
                        <p className="font-hero text-lg text-white">
                          {eco.vcFunding}
                        </p>
                        <p className="font-body text-xs text-white/40">
                          {copy.annualVcLabel}
                        </p>
                      </div>
                    </div>
                    <p className="font-body text-xs leading-relaxed text-white/40">
                      {eco.keyCompanies.join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top VC Firms */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.firmsTitle}
            </h2>
            <p className="mb-8 font-body text-lg text-white/65 leading-relaxed">
              {copy.firmsBody}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {vcFirms.map((firm) => (
                <div
                  key={firm.name}
                  className="rounded-2xl border border-white/10 bg-navy-mid p-5 transition-colors hover:border-glory-gold/25"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {firm.name}
                    </h3>
                    <span className="font-hero text-xl text-glory-gold">
                      {firm.aum}
                    </span>
                  </div>
                  <p className="mb-2 font-body text-xs text-white/40">
                    {firm.city}
                  </p>
                  <p className="font-body text-xs leading-relaxed text-white/50">
                    <span className="text-white/35">{copy.portfolioLabel} </span>
                    {firm.portfolio}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Facts grid */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-white">
              {copy.numbersTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...sharedFacts, ...localFacts].map((fact) => (
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

          {/* Nav */}
          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <Link
              href="/economy/capital-markets"
              className="font-body text-sm text-white/50 hover:text-white transition-colors"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/economy/dollar-dominance"
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
