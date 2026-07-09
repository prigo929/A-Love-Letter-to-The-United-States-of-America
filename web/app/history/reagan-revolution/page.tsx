import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Reagan Revolution | Patriotic USA",
  description: "The conservative revival, tax cuts, deregulation, and patriotic restoration.",
};

export default async function TheReaganRevolutionPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Revoluția Reagan" : "Reagan Revolution";
  const topics = THEMATIC_HISTORY_DATA["the-reagan-revolution"] || [];

  const title = {
    en: "Reagan Revolution",
    ro: "Revoluția Reagan",
  };

  const description = {
    en: "The conservative revival, tax cuts, deregulation, and patriotic restoration.",
    ro: "Revigorarea conservatoare, reducerea taxelor, dereglementarea și restaurarea patriotică.",
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
        subpageId="the-reagan-revolution"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
