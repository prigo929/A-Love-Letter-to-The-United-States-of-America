import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Constitutional Battles | Patriotic USA",
  description: "Originalism, states' rights, and key legal rulings defending free speech.",
};

export default async function ConstitutionalBattlesPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Bătălii Constituționale" : "Constitutional Battles";
  const topics = THEMATIC_HISTORY_DATA["constitutional-battles"] || [];

  const title = {
    en: "Constitutional Battles",
    ro: "Bătălii Constituționale",
  };

  const description = {
    en: "Originalism, states' rights, and key legal rulings defending free speech.",
    ro: "Originalismul, drepturile statelor și deciziile juridice cheie ce apără libera exprimare.",
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
        subpageId="constitutional-battles"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
