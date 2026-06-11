import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Faith, Family & Community | Patriotic USA",
  description: "Religious freedom, voluntary associations, and the moral foundations of society.",
};

export default async function FaithFamilyAndCommunityPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Credință, Familie și Comunitate" : "Faith, Family & Community";
  const topics = THEMATIC_HISTORY_DATA["faith-family-and-community"] || [];

  const title = {
    en: "Faith, Family & Community",
    ro: "Credință, Familie și Comunitate",
  };

  const description = {
    en: "Religious freedom, voluntary associations, and the moral foundations of society.",
    ro: "Libertatea religioasă, asociațiile voluntare și fundațiile morale ale societății.",
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
        subpageId="faith-family-and-community"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
