import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import {
  MacroStyles,
  MacroHero,
  CountUp,
  InfrastructureBand,
} from "@/components/economy/EconomyAnimations";
import { CultureStyles } from "@/components/culture/CulturePageComponents";
import { getCultureEnglishLanguage } from "@/lib/data/culture-data";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "English Language | The American Operating System",
  description: "Explore the linguistic gravity of English as the invisible global standard for code, aviation, science, and commerce.",
};

export default async function EnglishLanguagePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const data = getCultureEnglishLanguage(locale);

  const breadcrumbCulture = isRo ? "Cultură" : "Culture";
  const breadcrumbPage = isRo ? "Limba Engleză" : "English Language";

  const content = {
    statsTitle: isRo ? "GRAVITATEA OPERATORULUI GLOBAL" : "GLOBAL OPERATING SYSTEM DENSITY",
    backLink: isRo ? "← Înapoi la Modă" : "← Back to Fashion",
    nextLink: isRo ? "Prezentare Generală →" : "Overview →",
    bandLabel: isRo ? "SISTEMUL DE OPERARE AL LOGICII" : "THE OPERATING SYSTEM OF LOGIC",
    bandTitle: isRo ? "Codul: Engleza ca Standard Universal" : "The Code: English as the Universal Logic Standard",
    bandSubtitle: isRo
      ? "În spatele fiecărei linii de cod scrise în Tokyo, Berlin sau São Paulo stau cuvintele cheie în limba engleză — standardul global de eficiență."
      : "Behind every line of code compiled in Tokyo, Berlin, or São Paulo lie English keywords — the voluntary standard scaling global efficiency.",
    oracleDescription: isRo
      ? "Întreabă Oracolul AI despre standardul ICAO în aviație, terminologia de programare în engleză sau răspândirea limbii."
      : "Ask the AI Oracle about ICAO aviation language mandates, the origins of English coding syntax, or its role as a global scientific lingua franca.",
  };

  return (
    <>
      <MacroStyles />
      <CultureStyles />

      {/* Cinematic Hero Banner */}
      <MacroHero
        imageSrc={SITE_IMAGES.culture.timesSquare}
        imageAlt="Times Square NYC Rainy Night with Yellow Taxis"
        eyebrow={data.eyebrow}
        titleLead={isRo ? "GRAVITATEA" : "LINGUISTIC"}
        titleAccent={isRo ? "LINGVISTICĂ" : "GRAVITY"}
        description={data.paragraphs[0]}
        stats={[
          {
            value: "100%",
            label: isRo ? "Software și Programare" : "Software & Coding",
          },
          {
            value: "90%",
            label: isRo ? "Lucrări Științifice" : "Scientific Papers",
          },
          {
            value: "100%",
            label: isRo ? "Aviație și Spațiu" : "Aviation & Space",
          },
        ]}
      />

      <div className="bg-[#030405] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <Breadcrumb
            items={[
              { label: breadcrumbCulture, href: "/culture" },
              { label: breadcrumbPage },
            ]}
            className="mb-8"
          />
        </div>

        {/* Dynamic Count-Up Stats */}
        <section className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-16 font-semibold">
              {content.statsTitle}
            </p>
            <div className="grid gap-12 sm:grid-cols-3 text-center">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={100} suffix="%" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Limbaje de Programare" : "Software Syntax Standard"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Cuvinte cheie precum `if`, `for`, `while` sau `return` sunt uniformizate global în engleză."
                    : "Keywords like `if`, `while`, and `return` are standardized globally in English keywords."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={90} suffix="%" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Cercetare Științifică" : "Indexed Research"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Cota lucrărilor de cercetare indexate global publicate integral în limba engleză."
                    : "Linguistic share of indexed peer-reviewed scientific discovery papers."}
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-[#E8B923]/20 transition-all duration-500">
                <p className="font-macro-display text-5xl md:text-6xl text-[#E8B923] font-black tracking-tight mb-4">
                  <CountUp value={100} suffix="%" />
                </p>
                <p className="font-macro-display text-xl font-bold text-white mb-3">
                  {isRo ? "Control Trafic Aerian" : "Air Traffic Control"}
                </p>
                <p className="text-xs text-white/50 leading-relaxed font-body">
                  {isRo
                    ? "Standardul mandatat obligatoriu de Organizația Aviației Civile Internaționale."
                    : "Mandatory standard mandated by the International Civil Aviation Organization."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Essay & Domain progress bars */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid gap-12 lg:grid-cols-3 items-start">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-macro-display text-3xl font-bold text-[#E8B923] mb-6">
                {data.headline}
              </h2>
              {data.paragraphs.slice(1).map((p, idx) => (
                <p key={idx} className="font-macro-body text-white/80 text-lg md:text-xl leading-relaxed mb-6">
                  {p}
                </p>
              ))}
            </div>

            {/* Sidebar with progress bars */}
            <div className="culture-glass rounded-3xl p-8 border border-white/5 space-y-6 font-sans">
              <h3 className="font-macro-display text-lg font-bold text-glory-gold border-b border-white/10 pb-3 uppercase tracking-wider">
                {isRo ? "GRAVITAȚIA LINGVISTICĂ" : "LINGUISTIC GRAVITY"}
              </h3>
              <div className="space-y-6">
                {data.domains.map((dom, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>{dom.name}</span>
                      <span className="text-glory-gold">{dom.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-glory-gold rounded-full"
                        style={{ width: `${dom.percentage}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[#F5EDD8]/50 leading-relaxed">
                      {dom.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Band — Times Square Iconic */}
        <InfrastructureBand
          imageSrc={SITE_IMAGES.culture.timesSquareIconic}
          imageAlt="Times Square Iconic View"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {content.bandLabel}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {content.bandTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {content.bandSubtitle}
            </p>
          </div>
        </InfrastructureBand>

        {/* Navigation */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32">
          <div className="flex items-center justify-between border-t border-white/10 pt-12">
            <a
              href="/culture/fashion"
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors font-mono"
            >
              {content.backLink}
            </a>
            <a
              href="/culture/overview"
              className="text-xs uppercase tracking-widest text-[#E8B923] hover:text-white transition-colors font-mono"
            >
              {content.nextLink}
            </a>
          </div>
        </div>

        {/* AI Oracle */}
        <div className="mt-32">
          <AskAmericaCTA
            locale={locale}
            descriptionEn={content.oracleDescription}
            descriptionRo={content.oracleDescription}
          />
        </div>
      </div>
    </>
  );
}
