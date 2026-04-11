import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AccordionSection } from "@/components/sections/AccordionSection";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A timeline of America’s defining breakthroughs, victories, and national milestones.",
};

const previewItems = [
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
];

export default function TimelinePage() {
  return (
    <section className="min-h-screen bg-navy-dark px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <Breadcrumb items={[{ label: "Timeline" }]} className="mb-8" />
        <div className="mb-12 max-w-3xl">
          <p className="section-eyebrow">The American Story</p>
          <h1 className="mb-4 font-display text-h1 text-white">Timeline</h1>
          <p className="font-body text-lg leading-relaxed text-white/60">
            This route now exists so the navigation and footer are complete. The
            fuller historical timeline will be built as a long-form narrative
            with filters by economy, military, science, and culture.
          </p>
        </div>
        <AccordionSection items={previewItems} title="Timeline Roadmap" />
      </div>
    </section>
  );
}
