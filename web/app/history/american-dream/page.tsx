import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "The American Dream | Patriotic USA",
  description: "Postwar prosperity, suburbs, social mobility, and expansion of opportunity.",
};

export default async function TheAmericanDreamPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Visul American" : "The American Dream";
  const topics = THEMATIC_HISTORY_DATA["the-american-dream"] || [];

  const title = {
    en: "The American Dream",
    ro: "Visul American",
  };

  const description = {
    en: "Postwar prosperity, suburbs, social mobility, and expansion of opportunity.",
    ro: "Prosperitatea postbelică, suburbiile, mobilitatea socială și extinderea oportunităților.",
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
        subpageId="the-american-dream"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
