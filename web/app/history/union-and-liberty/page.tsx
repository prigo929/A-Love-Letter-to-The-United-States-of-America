import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Union & Liberty | Patriotic USA",
  description: "Preservation of the Union, the Civil War, and the triumph of abolition.",
};

export default async function UnionAndLibertyPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Uniune și Libertate" : "Union & Liberty";
  const topics = THEMATIC_HISTORY_DATA["union-and-liberty"] || [];

  const title = {
    en: "Union & Liberty",
    ro: "Uniune și Libertate",
  };

  const description = {
    en: "Preservation of the Union, the Civil War, and the triumph of abolition.",
    ro: "Păstrarea Uniunii, Războiul Civil și triumful abolirii sclaviei.",
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
        subpageId="union-and-liberty"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
