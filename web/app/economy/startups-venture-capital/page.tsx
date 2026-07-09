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
import { MacroStyles, MacroHero, MacroStat, MacroFact, InfrastructureBand, CountUp } from "@/components/economy/EconomyAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import {
  VC_BY_COUNTRY,
  UNICORNS_BY_COUNTRY,
  getStartupTimeline,
  getStartupEcosystems,
  getTopVcFirms,
  getVcOverviewParagraphs,
  type FoundingTimeline,
  type StartupEcosystem,
  type VcFirm,
} from "@/lib/data/economy-data";
import { SITE_IMAGES } from "@/lib/site-images";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Startups & Venture Capital | Economy",
  description:
    "America attracts 65% of all global venture capital. 1,172 unicorn companies. Silicon Valley, the greatest engine of innovation and wealth creation in history.",
  alternates: { canonical: "/economy/startups-venture-capital" },
};


export default async function StartupsVCPage() {
  // This page follows the same pattern as the other economy pages:
  // 1. read the locale
  // 2. choose translated/shared datasets
  // 3. pass those arrays into reusable visual components
  const locale = await getServerLocale();
  const breadcrumbEconomy = locale === "ro" ? "Economie" : "Economy";
  const pageLabel = locale === "ro" ? "Startup-uri și VC" : "Startups & VC";
  const overviewParagraphs = getVcOverviewParagraphs(locale);
  const vcFirms = getTopVcFirms(locale);
  const ecosystems = getStartupEcosystems(locale);
  const timeline = getStartupTimeline(locale);

  // Terminal "by the numbers" section: three headline stats plus two editorial
  // insights, replacing the old wall of identical fact cards. The unicorn count
  // is featured in its own section above, so it is not repeated here.
  const vcStatTrio =
    locale === "ro"
      ? [
          { value: "350K", label: "brevete acordate anual în SUA — nr. 1 mondial ca valoare a PI" },
          { value: "$250B+", label: "investiți anual în R&D de firmele tech americane (Amazon, Alphabet, Meta, Microsoft)" },
          { value: "$2T+", label: "valoarea produsă de primele 10 randamente VC din SUA, din investiții minuscule" },
        ]
      : [
          { value: "350K", label: "US patents granted every year — #1 in the world by IP value" },
          { value: "$250B+", label: "invested in R&D each year by US tech firms (Amazon, Alphabet, Meta, Microsoft)" },
          { value: "$2T+", label: "in value produced by the top 10 US VC returns from tiny checks" },
        ];
  const vcInsights =
    locale === "ro"
      ? [
          {
            fact: "Capitolul 11: eșecul ca stare recuperabilă",
            detail:
              "Niciun alt cadru de faliment nu protejează atât de complet capacitatea unei afaceri de a continua să opereze în timp ce își restructurează datoriile. A trata eșecul ca recuperabil, nu ca un stigmat permanent, este un avantaj structural discret al ecosistemului american.",
          },
          {
            fact: "Formare fără fricțiune",
            detail:
              "În timp ce reglementările europene cer săptămâni sau luni pentru a înființa și angaja legal, o companie americană se poate forma în ore — atrăgând marea majoritate a capitalului de risc global.",
          },
        ]
      : [
          {
            fact: "Chapter 11: failure as a recoverable condition",
            detail:
              "No other bankruptcy framework so fully protects a business's ability to keep operating while it restructures its debts. Treating failure as recoverable rather than a permanent stigma is a quiet structural advantage of the American ecosystem.",
          },
          {
            fact: "Frictionless formation",
            detail:
              "Where European regulation takes weeks or months to legally incorporate and hire, an American company can form in hours — attracting the vast majority of global venture capital.",
          },
        ];

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
          vcPullLabel:
            "valoarea combinată a companiilor fondate doar de absolvenți Stanford — Google, NVIDIA, Netflix, PayPal, Cisco, HP.",
          vcNumbersEyebrow: "Motorul, în cifre",
          numbersTitle: "În cifre",
          insightsEyebrow: "Avantaje structurale",
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
          vcPullLabel:
            "the combined value of companies founded by Stanford alumni alone — Google, NVIDIA, Netflix, PayPal, Cisco, HP.",
          vcNumbersEyebrow: "The engine, in numbers",
          numbersTitle: "By the Numbers",
          insightsEyebrow: "Structural advantages",
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
            {overviewParagraphs.map((para: string, i: number) => (
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
            <div className="my-24 bg-[#000000]/50 backdrop-blur-md p-8 border border-white/10">
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
            
            <div className="grid gap-8 mt-16">
              {timeline.map((item: FoundingTimeline, i: number) => (
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
              {ecosystems.map((eco: StartupEcosystem) => (
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
              {vcFirms.map((firm: VcFirm) => (
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

          {/* Featured pull-stat — one cinematic number instead of a card wall */}
          <section className="border-t border-white/5 pt-32">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display font-black leading-none tracking-tighter text-[clamp(72px,15vw,200px)]">
                <CountUp value={5} prefix="$" suffix="T+" />
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.vcPullLabel}</p>
            </div>
          </section>

          {/* By the numbers — headline stat trio */}
          <section className="border-t border-white/5 pt-32">
            <span className="macro-eyebrow">{copy.vcNumbersEyebrow}</span>
            <h2 className="macro-section-title mt-6 mb-16">{copy.numbersTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {vcStatTrio.map((stat) => (
                <MacroStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </section>

          {/* Two editorial insights */}
          <section className="pt-8">
            <span className="macro-eyebrow">{copy.insightsEyebrow}</span>
            <div className="mt-10 grid gap-16 md:grid-cols-2">
              {vcInsights.map((insight) => (
                <MacroFact key={insight.fact} fact={insight.fact} detail={insight.detail} />
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
