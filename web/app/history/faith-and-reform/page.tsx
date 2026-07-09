import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Faith & Reform | Patriotic USA",
  description: "The Great Awakenings, religious revival, and the moral-reform movements that shaped America — from evangelism to Prohibition.",
};

export default async function FaithAndReformPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "Credință și Reformă" : "Faith & Reform";
  const topics = THEMATIC_HISTORY_DATA["faith-and-reform"] || [];

  const title = {
    en: "Faith & Reform",
    ro: "Credință și Reformă",
  };

  const description = {
    en: "The Great Awakenings, religious revival, and the moral-reform movements that shaped America — from evangelism to Prohibition.",
    ro: "Marile Treziri religioase, revigorarea credinței și mișcările de reformă morală care au modelat America — de la evanghelism la Prohibiție.",
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
        subpageId="faith-and-reform"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
