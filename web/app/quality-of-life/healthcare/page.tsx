import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { Activity, Microscope, Pill, TrendingUp } from "lucide-react";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Healthcare Outcomes | Quality of Life",
  description:
    "The case for American healthcare: world-leading cancer survival rates, unmatched diagnostic equipment density, pharmaceutical innovation, and a corrected view of life expectancy.",
};

interface HealthcareCopy {
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
  survivalTitle: string;
  survivalSubtitle: string;
  survivalItems: Array<{ cancer: string; usRate: string; euNote: string }>;
  oracleDescription: string;
}

import React from "react";

const copyEn: HealthcareCopy = {
  breadcrumbParent: "Quality of Life",
  breadcrumbPage: "Healthcare Outcomes",
  heroTagline: "MEDICINE AT THE FRONTIER",
  heroTitle: "World-Leading Survival Rates and Medical Innovation",
  heroSubtitle:
    "Shift the lens from spending inputs to treatment outcomes, and the American healthcare system emerges as the most effective in the world for the diseases that actually kill people.",
  thesisTitle: "The Outcomes Argument",
  thesisParagraph1:
    "The standard critique — 'America spends more per capita than any other country and gets worse outcomes' — collapses immediately when you shift from input metrics (spending) to output metrics (survival). For the diseases that drive the largest share of deaths globally — cancers, heart disease, and the conditions for which people actually need advanced medical intervention — American patients survive at higher rates than their counterparts in any single-payer European system.",
  thesisParagraph2:
    "The commonly cited life expectancy gap is almost entirely explained by behavioral and structural factors that are unrelated to the quality of medical delivery: obesity rates, vehicular fatality rates, and violence. When controlling for these factors — or comparing survivorship rates for diagnosed conditions — the United States leads the developed world. The American system is designed not for cheapness but for excellence, and that is exactly what it delivers for patients who need cutting-edge care.",
  statsTitle: "Healthcare Leadership by the Numbers",
  stats: [
    {
      value: "#1",
      label: "Cancer Survival Rates",
      description:
        "The US leads the OECD in 5-year survival rates for breast cancer, prostate cancer, colorectal cancer, and leukemia — the four most common oncologic conditions.",
    },
    {
      value: "40.2",
      label: "MRI Scanners per Million",
      description:
        "The US has 40.2 MRI units per million population — among the highest densities in the OECD, enabling faster diagnosis and earlier-stage detection.",
    },
    {
      value: "~50%",
      label: "Global Drug Approvals",
      description:
        "The US approves approximately half of all novel pharmaceutical drugs globally, getting new therapies to patients faster than any regulatory system in the world.",
    },
    {
      value: "$900B+",
      label: "Annual Healthcare R&D",
      description:
        "The US leads the world in healthcare and pharmaceutical R&D spending, driving the pipeline of treatments that benefits patients globally.",
    },
  ],
  pillarsTitle: "Why American Healthcare Leads on Outcomes",
  pillars: [
    {
      icon: Activity,
      title: "Cancer Survival: The Definitive Benchmark",
      body: "The US leads the OECD in 5-year survival rates across all major cancer types. For breast cancer, the US 5-year survival rate is ~91% versus ~83% in the UK. For prostate cancer: ~98% in the US versus ~88% in the UK and ~85% in Germany. For colorectal cancer: ~67% US versus ~60% UK. These are not small margins — they represent tens of thousands of additional patients surviving each year. The mechanism is faster time-to-treatment and broader access to cutting-edge therapeutic protocols including immunotherapy and targeted biologics.",
      source: "OECD Health at a Glance 2023",
      sourceUrl:
        "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      icon: Microscope,
      title: "Diagnostic Equipment Density",
      body: "The United States has more MRI and CT scanners per capita than virtually any other OECD nation. MRI availability translates directly to earlier-stage cancer detection — and earlier stage detection directly translates to higher survival rates. Patients in single-payer systems routinely wait weeks to months for these scans; American patients with insurance typically receive them within days. The US also leads in PET scanner density and robotic surgical systems.",
      source: "OECD Diagnostic Equipment Database 2023",
      sourceUrl:
        "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      icon: Pill,
      title: "Pharmaceutical Innovation Leadership",
      body: "The vast majority of breakthrough drugs and therapies originate in the United States. The high price of pharmaceuticals in the US cross-subsidizes global drug development — including the drugs used in European single-payer systems at artificially low prices. Without American pharmaceutical profits, the R&D pipeline that produced mRNA vaccines, targeted cancer therapies, HIV antiretrovirals, and Alzheimer's drugs would not exist. The US is the engine of global medical progress.",
      source: "PhRMA / FDA Annual Reports",
      sourceUrl: "https://www.fda.gov/patients/drug-development-process/step-4-fda-drug-review",
    },
    {
      icon: TrendingUp,
      title: "Contextualizing Life Expectancy",
      body: "The often-cited US life expectancy gap versus Europe is largely driven by factors external to healthcare delivery quality: the US obesity rate (~42% vs ~20% in most of Europe), an exceptionally high vehicle fatality rate (driven by car-dependent geography and high miles driven), and elevated homicide rates. When researchers control for accidents and violence — or compare age-adjusted mortality for specific treatable conditions — the US performance matches or exceeds European peers. The system's 'inefficiency' is largely a measurement artifact.",
      source: "COSM Study / AEI Research",
      sourceUrl:
        "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/",
    },
  ],
  survivalTitle: "5-Year Cancer Survival Rates: US vs. Peer Nations",
  survivalSubtitle: "OECD Health at a Glance 2023 data",
  survivalItems: [
    { cancer: "Breast Cancer", usRate: "~91%", euNote: "UK: ~83%, EU avg: ~82%" },
    { cancer: "Prostate Cancer", usRate: "~98%", euNote: "UK: ~88%, Germany: ~85%" },
    { cancer: "Colorectal Cancer", usRate: "~67%", euNote: "UK: ~60%, EU avg: ~59%" },
    { cancer: "Leukemia (ALL, pediatric)", usRate: "~92%", euNote: "EU avg: ~82%" },
  ],
  oracleDescription:
    "Ask the AI Oracle about American cancer survival rates, diagnostic equipment density, pharmaceutical innovation, or the life expectancy debate.",
};

const copyRo: HealthcareCopy = {
  breadcrumbParent: "Calitatea Vieții",
  breadcrumbPage: "Rezultate în Sănătate",
  heroTagline: "MEDICINĂ LA FRONTIERĂ",
  heroTitle: "Rate de Supraviețuire de Top Mondial și Inovație Medicală",
  heroSubtitle:
    "Schimbați perspectiva de la cheltuielile medicale la rezultatele tratamentelor, și sistemul de sănătate american apare ca cel mai eficient din lume pentru bolile care ucid cu adevărat.",
  thesisTitle: "Argumentul Rezultatelor",
  thesisParagraph1:
    "Critica standard — «America cheltuiește mai mult per capita decât orice altă țară și obține rezultate mai proaste» — se prăbușește imediat când treceți de la metrici de intrare (cheltuieli) la metrici de ieșire (supraviețuire). Pentru bolile care conduc cea mai mare parte din decesele la nivel global — cancere, boli de inimă — pacienții americani supraviețuiesc în rate mai mari decât omologii lor din orice sistem european cu plată unică.",
  thesisParagraph2:
    "Discrepanța frecvent citată a speranței de viață este aproape în întregime explicată de factori comportamentali și structurali care nu au legătură cu calitatea îngrijirii medicale: ratele obezității, rata deceselor în accidente rutiere și violența. Când controlați acești factori — sau comparați ratele de supraviețuire pentru condiții diagnosticate — Statele Unite conduc lumea dezvoltată.",
  statsTitle: "Liderership în Sănătate în Cifre",
  stats: [
    {
      value: "#1",
      label: "Rate de Supraviețuire Cancer",
      description:
        "SUA conduc OCDE în ratele de supraviețuire la 5 ani pentru cancer de sân, prostată, colorectal și leucemie.",
    },
    {
      value: "40,2",
      label: "RMN per Milion Locuitori",
      description:
        "SUA au 40,2 unități RMN per milion de locuitori — una dintre cele mai mari densități din OCDE, permițând diagnosticare mai rapidă.",
    },
    {
      value: "~50%",
      label: "Aprobări Globale de Medicamente",
      description:
        "SUA aprobă aproximativ jumătate din toate medicamentele farmaceutice noi la nivel global.",
    },
    {
      value: "900+ mld. $",
      label: "R&D Sănătate Anual",
      description:
        "SUA conduc lumea în cheltuielile de cercetare și dezvoltare în domeniul sănătății și farmaceutic.",
    },
  ],
  pillarsTitle: "De Ce Sistemul American Conduce la Rezultate",
  pillars: [
    {
      icon: Activity,
      title: "Supraviețuire Cancer: Referința Definitivă",
      body: "SUA conduc OCDE în ratele de supraviețuire la 5 ani pentru toate tipurile majore de cancer. Pentru cancerul de sân: ~91% în SUA față de ~83% în Marea Britanie. Pentru cancerul de prostată: ~98% în SUA față de ~88% în Marea Britanie. Mecanismul este timpul mai scurt până la tratament și accesul mai larg la protocoale terapeutice de ultimă generație.",
      source: "OECD Health at a Glance 2023",
      sourceUrl:
        "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      icon: Microscope,
      title: "Densitatea Echipamentelor de Diagnostic",
      body: "Statele Unite au mai multe aparate RMN și CT per capita decât aproape orice altă națiune OCDE. Pacienții din sistemele cu plată unică așteaptă adesea săptămâni sau luni pentru aceste scanări; pacienții americani cu asigurare le primesc de obicei în câteva zile. SUA conduce și în densitatea scanerelor PET și a sistemelor chirurgicale robotice.",
      source: "OECD Diagnostic Equipment Database 2023",
      sourceUrl:
        "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      icon: Pill,
      title: "Liderership în Inovație Farmaceutică",
      body: "Marea majoritate a medicamentelor și terapiilor revoluționare provin din Statele Unite. Prețul ridicat al produselor farmaceutice din SUA subvenționează încrucișat dezvoltarea globală de medicamente — inclusiv medicamentele utilizate în sistemele europene cu plată unică la prețuri artificial scăzute. Fără profiturile farmaceutice americane, pipeline-ul de cercetare care a produs vaccinuri mRNA nu ar exista.",
      source: "PhRMA / FDA Annual Reports",
      sourceUrl:
        "https://www.fda.gov/patients/drug-development-process/step-4-fda-drug-review",
    },
    {
      icon: TrendingUp,
      title: "Contextualizarea Speranței de Viață",
      body: "Discrepanța speranței de viață a SUA față de Europa este în mare parte determinată de factori externi calității sistemului de sănătate: rata obezității din SUA (~42% față de ~20% în majoritatea Europei), o rată excepțional de ridicată a deceselor în accidente vehiculare și rate ridicate de omucidere. Când cercetătorii controlează pentru accidente și violență, performanța SUA corespunde sau depășește omologii europeni.",
      source: "COSM Study / AEI Research",
      sourceUrl:
        "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/",
    },
  ],
  survivalTitle: "Rate de Supraviețuire Cancer la 5 Ani: SUA vs. Alte Națiuni",
  survivalSubtitle: "Date OECD Health at a Glance 2023",
  survivalItems: [
    { cancer: "Cancer de Sân", usRate: "~91%", euNote: "Marea Britanie: ~83%, medie UE: ~82%" },
    { cancer: "Cancer de Prostată", usRate: "~98%", euNote: "Marea Britanie: ~88%, Germania: ~85%" },
    { cancer: "Cancer Colorectal", usRate: "~67%", euNote: "Marea Britanie: ~60%, medie UE: ~59%" },
    { cancer: "Leucemie (ALL, pediatric)", usRate: "~92%", euNote: "medie UE: ~82%" },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre ratele americane de supraviețuire a cancerului, densitatea echipamentelor de diagnostic, inovația farmaceutică sau dezbaterea speranței de viață.",
};

export default async function HealthcarePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc="/images/library/Technology/Fiber Optic Cable.jpg"
        imageAlt="Fiber optic cables representing medical technology"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "LIDER MONDIAL ÎN" : "WORLD-LEADING"}
        titleAccent={isRo ? "RATE DE SUPRAVIEȚUIRE" : "SURVIVAL RATES"}
        description={copy.heroSubtitle}
        stats={[
          { value: "#1", label: isRo ? "Rate Supraviețuire Cancer" : "Cancer Survival Rates" },
          { value: "40.2", label: isRo ? "RMN per Milion" : "MRI Units per Million" },
          { value: "~50%", label: isRo ? "Aprobări Globale Medicamente" : "Global Drug Approvals" },
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

        {/* Cancer Survival Table */}
        <RevealSection className="border-b border-white/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="macro-section-title text-white text-2xl mb-2">{copy.survivalTitle}</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-8">{copy.survivalSubtitle}</p>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-3 bg-white/5 px-6 py-3 text-xs font-mono uppercase tracking-widest text-white/40">
                <span>{isRo ? "Tip Cancer" : "Cancer Type"}</span>
                <span className="text-[#E8B923]">{isRo ? "Rata SUA" : "US Rate"}</span>
                <span>{isRo ? "Comparație" : "Comparison"}</span>
              </div>
              {copy.survivalItems.map((row, i) => (
                <div key={i} className="grid grid-cols-3 px-6 py-4 border-t border-white/5 hover:bg-white/2 transition-colors">
                  <span className="text-sm text-white font-display font-semibold">{row.cancer}</span>
                  <span className="macro-stat-value text-sm">{row.usRate}</span>
                  <span className="text-xs text-white/50">{row.euNote}</span>
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
