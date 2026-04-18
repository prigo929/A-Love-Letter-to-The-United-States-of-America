import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Explorer",
  description:
    "An interactive state-by-state exploration of the United States.",
};

export default async function ExplorerPage() {
  const locale = await getServerLocale();
  const copy =
    locale === "ro"
      ? {
          breadcrumb: "Explorator",
          eyebrow: "Stat cu Stat",
          title: "Explorator de Hartă",
          description:
            "Previzualizarea interactivă a hărții de pe homepage trimite acum aici. Această pagină este rezervată pentru versiunea mai profundă a exploratorului de state, cu mai multe date, clasamente și povești regionale.",
          facts: [
            {
              fact: "Numai California s-ar clasa printre cele mai mari economii de pe Pământ.",
              source: "Comparații la nivel de PIB pe state",
              category: "Vest",
              color: "gold" as const,
            },
            {
              fact: "Texas este centrul energetic al Americii și un motor major de export.",
              source: "Administrația pentru Informații Energetice a SUA",
              category: "Sud",
              color: "red" as const,
            },
            {
              fact: "Massachusetts concentrează cercetare, medicină și educație superioară de clasă mondială.",
              source: "NIH / clasamente universitare",
              category: "Nord-Est",
              color: "blue" as const,
            },
          ],
        }
      : {
          breadcrumb: "Explorer",
          eyebrow: "State by State",
          title: "Map Explorer",
          description:
            "The interactive map preview on the home page now links here. This page is reserved for the deeper state explorer with richer state facts, rankings, and regional stories.",
          facts: [
            {
              fact: "California alone would rank among the largest economies on Earth.",
              source: "State-level GDP comparisons",
              category: "West",
              color: "gold" as const,
            },
            {
              fact: "Texas is America’s energy powerhouse and a major export engine.",
              source: "US Energy Information Administration",
              category: "South",
              color: "red" as const,
            },
            {
              fact: "Massachusetts concentrates world-class research, medicine, and higher education.",
              source: "NIH / university rankings",
              category: "Northeast",
              color: "blue" as const,
            },
          ],
        };

  return (
    <section className="min-h-screen bg-navy-mid px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />

        <div className="mb-12 max-w-3xl">
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h1 className="mb-4 font-display text-h1 text-white">
            {copy.title}
          </h1>
          <p className="font-body text-lg leading-relaxed text-white/60">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {copy.facts.map((fact) => (
            <FactCard
              key={fact.fact}
              fact={fact.fact}
              source={fact.source}
              category={fact.category}
              color={fact.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
