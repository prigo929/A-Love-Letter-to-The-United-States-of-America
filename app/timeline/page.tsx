import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AccordionSection } from "@/components/sections/AccordionSection";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A timeline of America’s defining breakthroughs, victories, and national milestones.",
};

export default async function TimelinePage() {
  const locale = await getServerLocale();
  const copy =
    locale === "ro"
      ? {
          breadcrumb: "Cronologie",
          eyebrow: "Povestea Americană",
          title: "Cronologie",
          description:
            "Această rută există acum pentru ca navigarea și footerul să fie complete. Cronologia istorică amplă va fi construită ca o narațiune de tip long-form, cu filtre pe economie, armată, știință și cultură.",
          roadmap: "Planul Cronologiei",
          items: [
            {
              id: "founding",
              question: "1776–1789: Ce va acoperi cronologia mai întâi?",
              answer:
                "Epoca fondatoare, Constituția și cadrul instituțional care a permis țării să crească fără să-și piardă arhitectura originală de guvernare.",
            },
            {
              id: "industrial",
              question: "Vor fi incluse și etapele mari ale inovației?",
              answer:
                "Da. Pagina cronologiei este gândită să lege invențiile, dimensiunea economică, producția de război, descoperirile științifice și exporturile culturale într-o singură narațiune cronologică.",
            },
          ],
        }
      : {
          breadcrumb: "Timeline",
          eyebrow: "The American Story",
          title: "Timeline",
          description:
            "This route now exists so the navigation and footer are complete. The fuller historical timeline will be built as a long-form narrative with filters by economy, military, science, and culture.",
          roadmap: "Timeline Roadmap",
          items: [
            {
              id: "founding",
              question: "1776–1789: What will the timeline cover first?",
              answer:
                "The founding era, the Constitution, and the institutional framework that allowed the country to scale without losing its original governing architecture.",
            },
            {
              id: "industrial",
              question: "Will innovation milestones be included?",
              answer:
                "Yes. The timeline page is intended to connect inventions, economic scale, war production, scientific breakthroughs, and cultural exports into one chronological narrative.",
            },
          ],
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
        <AccordionSection items={copy.items} title={copy.roadmap} />
      </div>
    </section>
  );
}
