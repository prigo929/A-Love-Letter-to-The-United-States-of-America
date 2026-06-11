import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Arsenal of Democracy | Patriotic USA",
  description: "World War II industrial mobilization and the defense of global freedom.",
};

export default async function ArsenalOfDemocracyPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Arsenalul Democrației" : "Arsenal of Democracy";
  const topics = THEMATIC_HISTORY_DATA["arsenal-of-democracy"] || [];

  const title = {
    en: "Arsenal of Democracy",
    ro: "Arsenalul Democrației",
  };

  const description = {
    en: "World War II industrial mobilization and the defense of global freedom.",
    ro: "Mobilizarea industrială în al Doilea Război Mondial și apărarea libertății globale.",
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
        subpageId="arsenal-of-democracy"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
