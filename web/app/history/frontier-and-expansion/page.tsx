import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Frontier & Expansion | Patriotic USA",
  description: "Westward expansion, manifest destiny, and the individual pioneer spirit.",
};

export default async function FrontierAndExpansionPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Frontiera și Expansiunea" : "Frontier & Expansion";
  const topics = THEMATIC_HISTORY_DATA["frontier-and-expansion"] || [];

  const title = {
    en: "Frontier & Expansion",
    ro: "Frontiera și Expansiunea",
  };

  const description = {
    en: "Westward expansion, manifest destiny, and the individual pioneer spirit.",
    ro: "Expansiunea spre vest, destinul manifest și spiritul pionierilor individuali.",
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
        subpageId="frontier-and-expansion"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
