import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Industrial Rise | Patriotic USA",
  description: "The rise of American industrial power, entrepreneurship, and innovation.",
};

export default async function IndustrialRisePage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Ascensiunea Industrială" : "Industrial Rise";
  const topics = THEMATIC_HISTORY_DATA["industrial-rise"] || [];

  const title = {
    en: "Industrial Rise",
    ro: "Ascensiunea Industrială",
  };

  const description = {
    en: "The rise of American industrial power, entrepreneurship, and innovation.",
    ro: "Ascensiunea puterii industriale americane, a antreprenoriatului și a inovației.",
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
        subpageId="industrial-rise"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
