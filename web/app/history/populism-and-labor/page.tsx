import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Populism & Labor | Patriotic USA",
  description: "The 1890s Populist movement and the rise of organized labor and industrial conflict.",
};

export default async function PopulismAndLaborPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Populism și Muncă" : "Populism & Labor";
  const topics = THEMATIC_HISTORY_DATA["populism-and-labor"] || [];

  const title = {
    en: "Populism & Labor",
    ro: "Populism și Muncă",
  };

  const description = {
    en: "The 1890s Populist movement and the rise of organized labor and industrial conflict.",
    ro: "Mișcarea populistă din anii 1890 și ascensiunea muncii organizate și a conflictului industrial.",
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
        subpageId="populism-and-labor"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
