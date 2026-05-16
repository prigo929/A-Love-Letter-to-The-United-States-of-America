import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { AccordionSection } from "@/components/sections/AccordionSection";
import { Button } from "@/components/ui/Button";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Data",
  description:
    "America by the numbers: economic output, scientific achievement, military strength, and more.",
};

export default async function DataPage() {
  const locale = await getServerLocale();
  const copy =
    locale === "ro"
      ? {
          breadcrumb: "Date",
          eyebrow: "America în Cifre",
          title: "Centrul de Date",
          description:
            "Această pagină se va extinde în graficele complete, clasamentele și analiza bazată pe surse care stau în spatele comparațiilor de pe homepage.",
          facts: [
            {
              fact: "PIB de 28,8 trilioane $",
              detail: "Cea mai mare economie din istoria umană.",
              source: "Banca Mondială 2024",
              category: "Economie",
              color: "gold" as const,
            },
            {
              fact: "Buget de apărare de 886 Mld. $",
              detail: "Mai mult decât următorul grup de competitori la un loc.",
              source: "SIPRI 2024",
              category: "Armată",
              color: "red" as const,
            },
            {
              fact: "400+ Premii Nobel",
              detail: "Un avans susținut în producția științifică și intelectuală.",
              source: "Fundația Nobel",
              category: "Știință",
              color: "blue" as const,
            },
          ],
          faqTitle: "Ce Va Apărea Aici",
          faqItems: [
            {
              id: "sources",
              question: "De unde provin datele?",
              answer:
                "Homepage-ul și paginile de secțiune folosesc surse primare sau surse publice foarte credibile, precum Banca Mondială, SIPRI, Fundația Nobel, Serviciul Parcurilor Naționale și Biroul de Recensământ al SUA.",
            },
            {
              id: "updates",
              question: "Va primi această secțiune analize mai profunde?",
              answer:
                "Da. Această pagină este punctul de intrare pentru graficele detaliate și analiza comparativă sugerate pe homepage.",
            },
          ],
          backHome: "Înapoi Acasă",
          browse: "Răsfoiește toate secțiunile",
        }
      : {
          breadcrumb: "Data",
          eyebrow: "America by the Numbers",
          title: "Data Center",
          description:
            "This page will expand into the full charts, rankings, and source-backed analysis behind the home page comparisons.",
          facts: [
            {
              fact: "$28.8T GDP",
              detail: "Largest economy in human history.",
              source: "World Bank 2024",
              category: "Economy",
              color: "gold" as const,
            },
            {
              fact: "$886B defense budget",
              detail: "More than the next tier of competitors combined.",
              source: "SIPRI 2024",
              category: "Military",
              color: "red" as const,
            },
            {
              fact: "400+ Nobel Prizes",
              detail: "A sustained lead in scientific and intellectual output.",
              source: "Nobel Foundation",
              category: "Science",
              color: "blue" as const,
            },
          ],
          faqTitle: "What’s Coming Here",
          faqItems: [
            {
              id: "sources",
              question: "Where does the data come from?",
              answer:
                "The home page and section pages cite primary or widely trusted public sources such as the World Bank, SIPRI, the Nobel Foundation, the National Park Service, and the US Census Bureau.",
            },
            {
              id: "updates",
              question: "Will this section get deeper analysis?",
              answer:
                "Yes. This page is the landing point for the deeper charts and comparative analysis teased on the home page.",
            },
          ],
          backHome: "Back Home",
          browse: "Browse all sections",
        };

  return (
    <section className="min-h-screen bg-navy-dark px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />

        <div className="mb-12 max-w-3xl">
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h1 className="mb-4 font-display text-h1 text-white">{copy.title}</h1>
          <p className="font-body text-lg leading-relaxed text-white/60">{copy.description}</p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {copy.facts.map((fact) => (
            <FactCard key={fact.fact} {...fact} />
          ))}
        </div>

        <AccordionSection items={copy.faqItems} title={copy.faqTitle} />

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/" variant="gold">
            {copy.backHome}
          </Button>
          <Link
            href="/sitemap"
            className="font-body text-sm font-semibold text-glory-gold transition-colors hover:text-glory-gold-dark"
          >
            {copy.browse}
          </Link>
        </div>
      </div>
    </section>
  );
}
