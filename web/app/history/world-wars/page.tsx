import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";
import { getWwiiHistoryImages } from "@/lib/data/wwii-history-images";

export const metadata: Metadata = {
  title: "The United States of America during World War II | Patriotic USA",
  description: "Military history of the United States during World War II, major campaigns, and strategic victories.",
};

export default async function WWIIHistoryPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "al Doilea Război Mondial" : "WWII";
  // World War II absorbs the former "Arsenal of Democracy" chapter as extra topics.
  const topics = [
    ...(THEMATIC_HISTORY_DATA["wwii"] || []),
    ...(THEMATIC_HISTORY_DATA["arsenal-of-democracy"] || []),
  ];

  const title = {
    en: "The United States of America during World War II",
    ro: "Statele Unite ale Americii în timpul celui de-al Doilea Război Mondial",
  };

  const description = {
    en: "Military history of the United States during World War II, major campaigns, and strategic victories.",
    ro: "Istoria militară a Statelor Unite în timpul celui de-al Doilea Război Mondial, marile campanii și victoriile strategice.",
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
        subpageId="wwii"
        title={title}
        description={description}
        topics={topics}
        sectionImages={getWwiiHistoryImages(locale)}
      />
    </main>
  );
}
