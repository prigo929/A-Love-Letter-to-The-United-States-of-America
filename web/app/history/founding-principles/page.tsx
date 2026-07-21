import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";
import { BookShowcase } from "@/components/literature/BookShowcase";

export const metadata: Metadata = {
  title: "Founding Principles | Patriotic USA",
  description: "The intellectual foundations of the American republic — natural rights, self-governance, and the rule of law.",
};

export default async function FoundingPrinciplesPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Principii Fondatoare" : "Founding Principles";
  const topics = THEMATIC_HISTORY_DATA["founding-principles"] || [];

  const title = {
    en: "Founding Principles",
    ro: "Principii Fondatoare",
  };

  const description = {
    en: "The intellectual foundations of the American republic — natural rights, self-governance, and the rule of law.",
    ro: "Fundațiile intelectuale ale republicii americane — drepturile naturale, autoguvernarea și domnia legii.",
  };

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white selection:bg-glory-gold selection:text-navy-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: breadcrumbParent, href: "/history" },
            { label: breadcrumbPage },
          ]}
          className="mb-8"
        />
      </div>
      <ThematicSubpageClient
        locale={locale}
        subpageId="founding-principles"
        title={title}
        description={description}
        topics={topics}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <BookShowcase category="founding-principles" />
      </div>
    </main>
  );
}
