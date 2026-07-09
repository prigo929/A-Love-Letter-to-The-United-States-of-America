import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "The Populist Era | Patriotic USA",
  description: "The Tea Party, MAGA movement, and the working-class backlash to globalization.",
};

export default async function ThePopulistEraPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Era Populistă" : "The Populist Era";
  const topics = THEMATIC_HISTORY_DATA["populist-era"] || [];

  const title = {
    en: "The Populist Era",
    ro: "Era Populistă",
  };

  const description = {
    en: "The Tea Party, MAGA movement, and the working-class backlash to globalization.",
    ro: "Mișcarea Tea Party, MAGA și reacția clasei muncitoare împotriva globalizării.",
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
        subpageId="populist-era"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
