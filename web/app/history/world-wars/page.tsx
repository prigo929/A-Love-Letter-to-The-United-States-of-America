import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";
import { getWwiiHistoryImages } from "@/lib/data/wwii-history-images";

export const metadata: Metadata = {
  title: "The World Wars | Patriotic USA",
  description: "America and the World Wars — from the Great War and the Arsenal of Democracy to victory in World War II and the Manhattan Project.",
};

export default async function WorldWarsHistoryPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Războaiele Mondiale" : "The World Wars";
  // Spans World War I, World War II, the Arsenal of Democracy, and military history.
  const topics = [
    ...(THEMATIC_HISTORY_DATA["wwii"] || []),
    ...(THEMATIC_HISTORY_DATA["arsenal-of-democracy"] || []),
  ];

  const title = {
    en: "The World Wars",
    ro: "Războaiele Mondiale",
  };

  const description = {
    en: "America and the World Wars — from the Great War and the Arsenal of Democracy to victory in World War II and the Manhattan Project.",
    ro: "America și Războaiele Mondiale — de la Marele Război și Arsenalul Democrației la victoria din al Doilea Război Mondial și Proiectul Manhattan.",
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
        subpageId="wwii"
        title={title}
        description={description}
        topics={topics}
        sectionImages={getWwiiHistoryImages(locale)}
      />
    </main>
  );
}
