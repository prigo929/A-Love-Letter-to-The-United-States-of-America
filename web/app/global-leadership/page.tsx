import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Global Leadership | Patriotic USA",
  description: "American foreign policy, defense of global liberty, the Marshall Plan, and security alliances.",
};

export default async function GlobalLeadershipPage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Leadership Global" : "Global Leadership";
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
              {isRo ? "LIDER MUNDIAL" : "GLOBAL LEADERSHIP"}
            </h1>
            <p className="font-body text-white/70 text-sm md:text-base leading-relaxed">
              {isRo
                ? "Garanția globală a libertății și ordinii internaționale. De la Marshall Plan la alianța NATO, Statele Unite sprijină democrațiile și stabilitatea pe fiecare continent."
                : "The global guarantor of freedom and international order. From the Marshall Plan to the NATO alliance, the United States supports democracies and stability on every continent."}
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Chronicles */}
      <div className="pb-16">
        <ThematicSubpageClient
          locale={locale}
          subpageId="global-leadership"
          title={{
            en: "Detailed Chronicles",
            ro: "Cronici Detaliate",
          }}
          description={{
            en: "Explore the complete archives of U.S. foreign policy, relations with the United Nations, global influence, the Monroe Doctrine, Marshall Plan, and NATO alliance.",
            ro: "Explorați arhivele complete ale politicii externe a SUA, relațiilor cu Organizația Națiunilor Unite, influenței globale, Doctrinei Monroe, Planului Marshall și alianței NATO.",
          }}
          topics={VERTICALS_THEMATIC_DATA["global-leadership"] || []}
          embed={true}
        />
      </div>

      <AskAmericaCTA
        locale={locale}
        descriptionEn="Ask the AI Oracle about NATO military guarantees, the U.S. dollar as reserve asset, American soft power export, or multilateral institutions."
        descriptionRo="Întreabă Oracolul AI despre garanțiile militare NATO, dolarul american ca activ de rezervă, exportul de soft power sau instituțiile multilaterale."
      />
    </main>
  );
}
