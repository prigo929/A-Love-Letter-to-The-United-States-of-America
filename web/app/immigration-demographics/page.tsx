import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Immigration & Demographics | Patriotic USA",
  description: "American demographics, immigration history, race, religion, and education systems.",
};

export default async function ImmigrationDemographicsPage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Imigrație și Demografie" : "Immigration & Demographics";
  const isRo = locale === "ro";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: breadcrumb }]} className="mb-8" />
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-gradient-to-r from-glory-blue/15 via-white/3 to-glory-red/10 p-8 md:p-12 shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-glory-blue via-glory-gold to-glory-red" />
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {isRo ? "IMIGRAȚIE & DEMOGRAFIE" : "IMMIGRATION & DEMOGRAPHICS"}
            </h1>
            <p className="font-body text-white/70 text-sm md:text-base leading-relaxed">
              {isRo
                ? "Povestea poporului american — o națiune formată din imigranți uniți sub aceleași principii de libertate și egalitate de șanse. De la primele valuri de colonizare la dinamica demografică modernă."
                : "The story of the American people — a nation of immigrants united under the same principles of liberty and equal opportunity. From the first waves of settlement to modern demographic dynamics."}
            </p>
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
