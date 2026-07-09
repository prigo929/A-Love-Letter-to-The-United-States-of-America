import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Reform & Rights | Patriotic USA",
  description: "The Progressive Era, the Lochner era, and the civil-liberties battles of the early twentieth century.",
};

export default async function ReformAndRightsPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Reformă și Drepturi" : "Reform & Rights";
  const topics = THEMATIC_HISTORY_DATA["reform-and-rights"] || [];

  const title = {
    en: "Reform & Rights",
    ro: "Reformă și Drepturi",
  };

  const description = {
    en: "The Progressive Era, the Lochner era, and the civil-liberties battles of the early twentieth century.",
    ro: "Era Progresistă, era Lochner și bătăliile pentru libertățile civile de la începutul secolului XX.",
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
        subpageId="reform-and-rights"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
