import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Crisis & Resilience | Patriotic USA",
  description: "The Great Depression, the New Deal, the Dust Bowl, the Great Migrations, and America's recovery from hardship.",
};

export default async function CrisisAndResiliencePage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Criză și Reziliență" : "Crisis & Resilience";
  const topics = THEMATIC_HISTORY_DATA["crisis-and-resilience"] || [];

  const title = {
    en: "Crisis & Resilience",
    ro: "Criză și Reziliență",
  };

  const description = {
    en: "The Great Depression, the New Deal, the Dust Bowl, the Great Migrations, and America's recovery from hardship.",
    ro: "Marea Criză, New Deal, Dust Bowl, Marile Migrații și redresarea Americii după greutăți.",
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
        subpageId="crisis-and-resilience"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
