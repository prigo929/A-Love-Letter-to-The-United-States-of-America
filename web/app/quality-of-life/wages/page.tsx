import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { DollarSign, BarChart3, Scale, Heart } from "lucide-react";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Wages & Purchasing Power | Quality of Life",
  description:
    "American wages adjusted for purchasing power parity: OECD rankings, food and energy costs as a share of income, progressive taxation, and disposable income leadership.",
};

interface WagesCopy {
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
  comparisonTitle: string;
  comparisonSubtitle: string;
  comparisonItems: Array<{ category: string; usNote: string; euNote: string }>;
  oracleDescription: string;
}

import React from "react";

const copyEn: WagesCopy = {
  breadcrumbParent: "Quality of Life",
  breadcrumbPage: "Wages & Purchasing Power",
  heroTagline: "THE PURCHASING POWER ADVANTAGE",
  heroTitle: "More Money, Lower Costs — The American Wage Premium",
  heroSubtitle:
    "Adjusted for purchasing power parity, the American worker earns more, spends less on essentials, and keeps more after tax than workers in virtually any other developed nation.",
  thesisTitle: "PPP: The Only Honest Comparison",
  thesisParagraph1:
    "Nominal wage comparisons between countries are largely meaningless. What matters is purchasing power parity (PPP) — how much your wage actually buys in your home country. When adjusted for PPP, US wages rank #2 in the entire OECD, surpassed only by Switzerland. More importantly, the American advantage compounds when you factor in what those wages must cover: food, energy, and housing costs as a share of income are all dramatically lower in the US than in peer nations.",
  thesisParagraph2:
    "The American middle class also benefits from a highly progressive tax code that concentrates the income tax burden on the wealthy. The top 1% pays approximately 40% of all federal income taxes; the bottom 50% pays just 3%. There is no national Value Added Tax (VAT) — a regressive tax that European workers pay on nearly every purchase — giving American consumers a structural cost advantage that compounds every time they buy groceries, electronics, or clothes.",
  statsTitle: "Wages & Income by the Numbers",
  stats: [
    {
      value: "#2",
      label: "OECD PPP Wages",
      description:
        "US wages adjusted for purchasing power parity rank #2 in the entire OECD, surpassed only by Switzerland. Workers earn more in real terms than in Germany, France, or the UK.",
    },
    {
      value: "~6%",
      label: "Income Spent on Food",
      description:
        "Americans spend the lowest share of their income on food of any nation — approximately 6%, versus 10–15% in Europe and much higher globally. Calorie abundance is guaranteed.",
    },
    {
      value: "40%",
      label: "Top 1% Tax Share",
      description:
        "The top 1% of earners pays approximately 40% of all federal income taxes — the most progressive income tax distribution in the developed world.",
    },
    {
      value: "#1",
      label: "Household Disposable Income",
      description:
        "OECD Net Adjusted Disposable Income consistently places US households at the top of the developed world — more room for savings, investing, and discretionary spending.",
    },
  ],
  pillarsTitle: "The Four Pillars of American Wage Advantage",
  pillars: [
    {
      icon: DollarSign,
      title: "PPP-Adjusted OECD Wage Leadership",
      body: "The OECD measures average annual wages adjusted for purchasing power parity to allow genuine cross-country comparison. The US consistently ranks #2 behind Switzerland. American workers earn roughly $77,000 per year in PPP-adjusted terms — compared to ~$53,000 in Germany, ~$47,000 in France, and ~$48,000 in the UK. This is the wage a worker can actually spend on goods and services at local prices, and it is not close. The American middle class has more money available for discretionary spending, savings, and investment than any European peer.",
      source: "OECD Average Wages Database",
      sourceUrl: "https://data.oecd.org/earnwage/average-wages.htm",
    },
    {
      icon: BarChart3,
      title: "Food, Energy, and Housing Cost Advantage",
      body: "Americans spend approximately 6% of their income on food — the lowest share of any nation — versus 10–15% in Western Europe and far more in emerging markets. US electricity rates are among the lowest in the developed world thanks to abundant natural gas from the shale revolution and a deregulated energy market. Gasoline is dramatically cheaper than in Europe (often less than half the price per gallon in Germany or France). These lower essential costs function as a hidden wage increase that compounds year over year.",
      source: "USDA ERS / Our World in Data / EIA",
      sourceUrl:
        "https://ourworldindata.org/grapher/food-expenditure-share-gdp?country=~USA",
    },
    {
      icon: Scale,
      title: "The World's Most Progressive Tax System",
      body: "The United States has the most progressive income tax distribution in the developed world. The top 1% of earners pay ~40% of all federal income taxes; the top 10% pay ~70%; the bottom 50% pay just 3%. Crucially, there is no Value Added Tax (VAT) in the US — in Europe, a 20% VAT is levied on virtually every consumer purchase, functioning as a flat tax that hits lower-income households hardest. The absence of a VAT is a structural advantage for the American working and middle class that is almost never accounted for in tax burden comparisons.",
      source: "Cato Institute / Tax Foundation 2025",
      sourceUrl:
        "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world",
    },
    {
      icon: Heart,
      title: "Charitable Giving: Private Wealth in the Community",
      body: "Americans are the most privately charitable people on Earth. The US ranks at or near the top of the World Giving Index every year — Americans donate a larger share of their income to charities and community organizations than any other developed nation. This private charitable ecosystem — which funds hospitals, food banks, universities, disaster relief, and international aid — is an expression of both cultural values and the disposable income surplus that makes voluntary giving feasible at scale.",
      source: "Charities Aid Foundation (CAF) World Giving Index",
      sourceUrl:
        "https://www.cafonline.org/about-us/research/caf-world-giving-index",
    },
  ],
  comparisonTitle: "Key Cost Comparisons: US vs. Europe",
  comparisonSubtitle: "As a share of median household income",
  comparisonItems: [
    {
      category: "Food spending",
      usNote: "~6% of income (lowest globally)",
      euNote: "10–15% in Western Europe",
    },
    {
      category: "Electricity (per kWh)",
      usNote: "~$0.13–0.16 (residential average)",
      euNote: "~$0.30–0.45 in Germany/France",
    },
    {
      category: "Gasoline (per gallon equiv.)",
      usNote: "~$3–4",
      euNote: "~$6–8 in Germany/UK/France",
    },
    {
      category: "Federal VAT",
      usNote: "None (no national sales tax)",
      euNote: "~20% on most purchases",
    },
    {
      category: "PPP-adjusted annual wage",
      usNote: "~$77,000 (#2 OECD)",
      euNote: "Germany ~$53K, France ~$47K",
    },
  ],
  oracleDescription:
    "Ask the AI Oracle about OECD purchasing power parity wage rankings, American food costs, the absence of a VAT, or the progressivity of the US tax system.",
};

const copyRo: WagesCopy = {
  breadcrumbParent: "Calitatea Vieții",
  breadcrumbPage: "Salarii și Putere de Cumpărare",
  heroTagline: "AVANTAJUL PUTERII DE CUMPĂRARE",
  heroTitle: "Mai Mulți Bani, Costuri Mai Mici — Prima de Salarizare Americană",
  heroSubtitle:
    "Ajustat la paritatea puterii de cumpărare, muncitorul american câștigă mai mult, cheltuiește mai puțin pe esențiale și păstrează mai mult după impozitare decât muncitorii din practic orice altă națiune dezvoltată.",
  thesisTitle: "PPP: Singura Comparație Corectă",
  thesisParagraph1:
    "Comparațiile nominale ale salariilor între țări sunt în mare parte fără sens. Ceea ce contează este paritatea puterii de cumpărare (PPP) — cât cumpără cu adevărat salariul tău în țara ta de origine. Ajustat la PPP, salariile din SUA se clasează pe locul 2 în întregul OCDE, depășite doar de Elveția. Mai important, avantajul american se compune atunci când luați în calcul ce trebuie să acopere acele salarii: costurile alimentelor, energiei și locuințelor ca pondere din venit sunt dramatic mai mici în SUA față de națiunile pereche.",
  thesisParagraph2:
    "Clasa de mijloc americană beneficiază și de un cod fiscal extrem de progresiv care concentrează sarcina impozitului pe venit asupra bogaților. Primii 1% plătesc aproximativ 40% din totalul impozitelor federale pe venit; cei de jos 50% plătesc doar 3%. Nu există TVA național — un impozit regresiv pe care lucrătorii europeni îl plătesc la aproape fiecare achiziție.",
  statsTitle: "Salarii și Venituri în Cifre",
  stats: [
    {
      value: "#2",
      label: "Salarii PPP OCDE",
      description:
        "Salariile din SUA ajustate la paritatea puterii de cumpărare se clasează pe locul 2 în întregul OCDE, depășite doar de Elveția.",
    },
    {
      value: "~6%",
      label: "Venit pe Hrană",
      description:
        "Americanii cheltuiesc cea mai mică parte din venit pe hrană dintre toate națiunile — aproximativ 6%, față de 10–15% în Europa.",
    },
    {
      value: "40%",
      label: "Cotă Impozit Top 1%",
      description:
        "Primii 1% dintre câștigători plătesc aproximativ 40% din totalul impozitelor federale pe venit — cea mai progresivă distribuție a impozitului pe venit din lumea dezvoltată.",
    },
    {
      value: "#1",
      label: "Venit Disponibil Gospodărie",
      description:
        "Venitul net ajustat disponibil al gospodăriei OCDE plasează constant gospodăriile din SUA în fruntea lumii dezvoltate.",
    },
  ],
  pillarsTitle: "Cei Patru Piloni ai Avantajului Salarial American",
  pillars: [
    {
      icon: DollarSign,
      title: "Leadership în Salarii OCDE Ajustate PPP",
      body: "OCDE măsoară salariile medii anuale ajustate la paritatea puterii de cumpărare. SUA se clasează constant pe locul 2 după Elveția. Muncitorii americani câștigă aproximativ 77.000 USD pe an în termeni ajustați PPP — față de ~53.000 USD în Germania, ~47.000 USD în Franța. Acesta este salariul pe care un muncitor îl poate cheltui efectiv pe bunuri și servicii la prețuri locale.",
      source: "OECD Average Wages Database",
      sourceUrl: "https://data.oecd.org/earnwage/average-wages.htm",
    },
    {
      icon: BarChart3,
      title: "Avantajul Costurilor la Alimente, Energie și Locuință",
      body: "Americanii cheltuiesc aproximativ 6% din veniturile lor pe hrană — cea mai mică pondere din orice națiune — față de 10–15% în Europa de Vest. Prețurile energiei electrice din SUA se numără printre cele mai mici din lumea dezvoltată datorită gazului natural abundent din revoluția șisturilor. Benzina este dramatic mai ieftină decât în Europa (adesea mai puțin de jumătate din prețul pe litru față de Germania sau Franța).",
      source: "USDA ERS / Our World in Data / EIA",
      sourceUrl:
        "https://ourworldindata.org/grapher/food-expenditure-share-gdp?country=~USA",
    },
    {
      icon: Scale,
      title: "Cel Mai Progresiv Sistem Fiscal din Lume",
      body: "Statele Unite au cea mai progresivă distribuție a impozitului pe venit din lumea dezvoltată. Primii 1% din câștigători plătesc ~40% din totalul impozitelor federale; cei de jos 50% plătesc doar 3%. Crucial, nu există TVA în SUA — în Europa, un TVA de 20% este perceput la aproape fiecare achiziție de consum, funcționând ca un impozit regresiv care lovește cel mai puternic gospodăriile cu venituri mai mici.",
      source: "Cato Institute / Tax Foundation 2025",
      sourceUrl:
        "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world",
    },
    {
      icon: Heart,
      title: "Donații Caritabile: Bogăție Privată în Comunitate",
      body: "Americanii sunt cei mai caritabili oameni din punct de vedere privat de pe Pământ. SUA se clasează în fruntea World Giving Index în fiecare an. Acest ecosistem caritabil privat — care finanțează spitale, bănci alimentare, universități, ajutor în caz de dezastre și ajutor internațional — este o expresie atât a valorilor culturale, cât și a surplusului de venit disponibil.",
      source: "Charities Aid Foundation (CAF) World Giving Index",
      sourceUrl:
        "https://www.cafonline.org/about-us/research/caf-world-giving-index",
    },
  ],
  comparisonTitle: "Comparații Cheie de Costuri: SUA vs. Europa",
  comparisonSubtitle: "Ca pondere din venitul median al gospodăriei",
  comparisonItems: [
    {
      category: "Cheltuieli alimentare",
      usNote: "~6% din venit (cel mai mic la nivel global)",
      euNote: "10–15% în Europa de Vest",
    },
    {
      category: "Electricitate (per kWh)",
      usNote: "~$0,13–0,16 (medie rezidențială)",
      euNote: "~$0,30–0,45 în Germania/Franța",
    },
    {
      category: "Benzină (per galon echiv.)",
      usNote: "~$3–4",
      euNote: "~$6–8 în Germania/UK/Franța",
    },
    {
      category: "TVA federal",
      usNote: "Inexistent (fără taxă națională pe vânzări)",
      euNote: "~20% pe cele mai multe achiziții",
    },
    {
      category: "Salariu anual ajustat PPP",
      usNote: "~$77.000 (#2 OCDE)",
      euNote: "Germania ~$53K, Franța ~$47K",
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre clasamentele salariale OCDE după paritatea puterii de cumpărare, costurile alimentare americane, absența TVA sau progresivitatea sistemului fiscal american.",
};

export default async function WagesPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc="/images/library/Economy/100 dollar bill.jpg"
        imageAlt="American hundred dollar bill"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "MAI MULȚI BANI," : "MORE MONEY,"}
        titleAccent={isRo ? "COSTURI MAI MICI" : "LOWER COSTS"}
        description={copy.heroSubtitle}
        stats={[
          { value: "#2", label: isRo ? "Salarii PPP OCDE" : "OECD PPP Wages" },
          { value: "~6%", label: isRo ? "Venit pe Hrană" : "Income Spent on Food" },
          { value: "0%", label: isRo ? "TVA Național" : "National VAT" },
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
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 relative">
            <div className="absolute top-4 right-4 opacity-[0.06]">
              <DollarSign className="h-24 w-24 text-[#E8B923]" />
            </div>
            <h2 className="macro-section-title text-[#E8B923] text-3xl mb-6">{copy.thesisTitle}</h2>
            <p className="macro-body mb-6">{copy.thesisParagraph1}</p>
            <p className="macro-body">{copy.thesisParagraph2}</p>
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
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-[#E8B923]/20 transition-all text-center">
                  <p className="macro-stat-value mb-2">{stat.value}</p>
                  <p className="font-display text-base font-bold text-white mb-2">{stat.label}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Pillars */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="macro-section-title text-white text-center text-3xl mb-12">{copy.pillarsTitle}</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {copy.pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className="rounded-3xl border border-white/10 bg-white/2 p-8 hover:border-[#E8B923]/20 transition-all">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="rounded-xl bg-[#E8B923]/10 p-2.5">
                        <Icon className="h-5 w-5 text-[#E8B923]" />
                      </div>
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

        {/* Comparison Table */}
        <RevealSection className="border-b border-white/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="macro-section-title text-white text-2xl mb-2">{copy.comparisonTitle}</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-8">{copy.comparisonSubtitle}</p>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-3 bg-white/5 px-6 py-3 text-xs font-mono uppercase tracking-widest text-white/40">
                <span>{isRo ? "Categorie" : "Category"}</span>
                <span className="text-[#E8B923]">USA</span>
                <span>{isRo ? "Europa" : "Europe"}</span>
              </div>
              {copy.comparisonItems.map((row, i) => (
                <div key={i} className="grid grid-cols-3 px-6 py-4 border-t border-white/5 hover:bg-white/2 transition-colors">
                  <span className="text-sm text-white font-display font-semibold pr-2">{row.category}</span>
                  <span className="text-xs text-[#E8B923] leading-relaxed pr-2">{row.usNote}</span>
                  <span className="text-xs text-white/50 leading-relaxed">{row.euNote}</span>
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
