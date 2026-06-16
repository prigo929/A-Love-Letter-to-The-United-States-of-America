import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";
import { HistoryStyles } from "@/components/history/HistoryStyles";

export const metadata: Metadata = {
  title: "Global Leadership | Patriotic USA",
  description: "American foreign policy, defense of global liberty, the Marshall Plan, and security alliances.",
};

export default async function GlobalLeadershipPage() {
  const locale = await getServerLocale();
  const breadcrumb = locale === "ro" ? "Leadership Global" : "Global Leadership";
  const isRo = locale === "ro";

  const heroStats = [
    { value: "32", label: isRo ? "Aliați NATO conduși" : "NATO allies led" },
    { value: "750+", label: isRo ? "Baze globale" : "Global bases" },
    { value: "$886B", label: isRo ? "Buget de apărare" : "Defense budget" },
    { value: "57%", label: isRo ? "Din rezervele în USD" : "Of FX reserves in USD" },
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
            {isRo ? "NAȚIUNEA INDISPENSABILĂ" : "THE INDISPENSABLE NATION"}
          </span>
          <h1 className="history-serif-title max-w-4xl text-4xl md:text-6xl font-bold text-white leading-[1.05]">
            {isRo ? "Lider Mondial" : "Global Leadership"}
          </h1>
          <p className="history-serif-body mt-6 max-w-2xl text-lg">
            {isRo
              ? "Garanția globală a libertății și ordinii internaționale. De la Planul Marshall la alianța NATO, Statele Unite sprijină democrațiile și stabilitatea pe fiecare continent."
              : "The global guarantor of freedom and international order. From the Marshall Plan to the NATO alliance, the United States supports democracies and stability on every continent."}
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
