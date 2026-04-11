import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FactCard } from "@/components/sections/FactCard";
import { AccordionSection } from "@/components/sections/AccordionSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Data",
  description:
    "America by the numbers: economic output, scientific achievement, military strength, and more.",
};

const faqItems = [
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
];

export default function DataPage() {
  return (
    <section className="min-h-screen bg-navy-dark px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl">
        <Breadcrumb items={[{ label: "Data" }]} className="mb-8" />

        <div className="mb-12 max-w-3xl">
          <p className="section-eyebrow">America by the Numbers</p>
          <h1 className="mb-4 font-display text-h1 text-white">Data Center</h1>
          <p className="font-body text-lg leading-relaxed text-white/60">
            This page will expand into the full charts, rankings, and
            source-backed analysis behind the home page comparisons.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <FactCard
            fact="$28.8T GDP"
            detail="Largest economy in human history."
            source="World Bank 2024"
            category="Economy"
            color="gold"
          />
          <FactCard
            fact="$886B defense budget"
            detail="More than the next tier of competitors combined."
            source="SIPRI 2024"
            category="Military"
            color="red"
          />
          <FactCard
            fact="400+ Nobel Prizes"
            detail="A sustained lead in scientific and intellectual output."
            source="Nobel Foundation"
            category="Science"
            color="blue"
          />
        </div>

        <AccordionSection items={faqItems} title="What’s Coming Here" />

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/" variant="gold">
            Back Home
          </Button>
          <Link
            href="/sitemap"
            className="font-body text-sm font-semibold text-glory-gold transition-colors hover:text-glory-gold-dark"
          >
            Browse all sections
          </Link>
        </div>
      </div>
    </section>
  );
}
