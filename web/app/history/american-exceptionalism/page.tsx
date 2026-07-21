import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";
import { BookShowcase } from "@/components/literature/BookShowcase";

export const metadata: Metadata = {
  title: "American Exceptionalism | Patriotic USA",
  description: "The liberty-first political culture and the unique promise of the American experiment.",
};

export default async function AmericanExceptionalismPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Excepționalism American" : "American Exceptionalism";
  const topics = THEMATIC_HISTORY_DATA["american-exceptionalism"] || [];

  const title = {
    en: "American Exceptionalism",
    ro: "Excepționalism American",
  };

  const description = {
    en: "The liberty-first political culture and the unique promise of the American experiment.",
    ro: "Cultura politică axată pe libertate și promisiunea unică a experimentului american.",
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
        subpageId="american-exceptionalism"
        title={title}
        description={description}
        topics={topics}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <BookShowcase category="history-hub" />
      </div>
    </main>
  );
}
