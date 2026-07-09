import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Cold War | Patriotic USA",
  description: "The global struggle for freedom, containment of communism, and Soviet collapse.",
};

export default async function ColdWarAndAntiCommunismPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Războiul Rece" : "Cold War";
  const topics = THEMATIC_HISTORY_DATA["cold-war"] || [];

  const title = {
    en: "Cold War",
    ro: "Războiul Rece",
  };

  const description = {
    en: "The global struggle for freedom, containment of communism, and Soviet collapse.",
    ro: "Lupta globală pentru libertate, îndiguirea comunismului și prăbușirea sovietică.",
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
        subpageId="cold-war"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
