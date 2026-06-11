import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Free Markets & Prosperity | Patriotic USA",
  description: "Private property, entrepreneurship, free enterprise, and economic liberty.",
};

export default async function FreeMarketsAndProsperityPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Piețe Libere și Prosperitate" : "Free Markets & Prosperity";
  const topics = THEMATIC_HISTORY_DATA["free-markets-and-prosperity"] || [];

  const title = {
    en: "Free Markets & Prosperity",
    ro: "Piețe Libere și Prosperitate",
  };

  const description = {
    en: "Private property, entrepreneurship, free enterprise, and economic liberty.",
    ro: "Proprietatea privată, antreprenoriatul, libera inițiativă și libertatea economică.",
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
        subpageId="free-markets-and-prosperity"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
