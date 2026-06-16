import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";
import { HistoryStyles } from "@/components/history/HistoryStyles";

export const metadata: Metadata = {
  title: "Immigration & Demographics | Patriotic USA",
  description: "American demographics, immigration history, race, religion, and education systems.",
};

export default async function ImmigrationDemographicsPage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Imigrație și Demografie" : "Immigration & Demographics";
  const isRo = locale === "ro";

  const heroStats = [
    { value: "342M", label: isRo ? "Locuitori" : "Residents" },
    { value: "46M", label: isRo ? "Născuți în străinătate" : "Foreign-born" },
    { value: "#1", label: isRo ? "Destinație de imigrație" : "Immigration destination" },
    { value: "350+", label: isRo ? "Limbi vorbite" : "Languages spoken" },
  ];

  return (
    <main className="history-classified-bg min-h-screen pt-24">
      <HistoryStyles />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: breadcrumb }]} className="mb-8" />
      </div>

      {/* Hero — editorial */}
      <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="history-bureaucratic block mb-5">
            {isRo ? "O NAȚIUNE DE IMIGRANȚI" : "A NATION OF IMMIGRANTS"}
          </span>
          <h1 className="history-serif-title max-w-4xl text-4xl md:text-6xl font-bold text-white leading-[1.05]">
            {isRo ? "Imigrație și Demografie" : "Immigration & Demographics"}
          </h1>
          <p className="history-serif-body mt-6 max-w-2xl text-lg">
            {isRo
              ? "Povestea poporului american — o națiune formată din imigranți uniți sub aceleași principii de libertate și egalitate de șanse. De la primele valuri de colonizare la dinamica demografică modernă."
              : "The story of the American people — a nation of immigrants united under the same principles of liberty and equal opportunity. From the first waves of settlement to modern demographic dynamics."}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:grid-cols-4">
            {heroStats.map((s, i) => (
              <div key={i} className="bg-navy-dark p-5">
                <div className="font-display text-3xl font-bold text-glory-gold">{s.value}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Chronicles */}
      <div className="pb-16">
        <ThematicSubpageClient
          locale={locale}
          subpageId="demographics"
          title={{
            en: "Detailed Chronicles",
            ro: "Cronici Detaliate",
          }}
          description={{
            en: "Explore the comprehensive archives of American demographics, history of immigration, race, ethnicity, religion, education, poverty, and crime.",
            ro: "Explorați arhivele complete ale demografiei americane, istoriei imigrației, rasei, etniei, religiei, educației, sărăciei și criminalității.",
          }}
          topics={VERTICALS_THEMATIC_DATA["demographics"] || []}
          embed={true}
        />
      </div>

      <AskAmericaCTA
        locale={locale}
        descriptionEn="Ask the AI Oracle about melting pot culture, immigration patterns, regional demographic shifts, or global talent attraction."
        descriptionRo="Întreabă Oracolul AI despre cultura melting pot, modelele de imigrare, schimbările demografice regionale sau atragerea talentelor globale."
      />
    </main>
  );
}
