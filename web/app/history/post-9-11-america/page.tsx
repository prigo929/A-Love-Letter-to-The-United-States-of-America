import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { THEMATIC_HISTORY_DATA } from "@/lib/data/history-thematic-data";
import ThematicSubpageClient from "@/components/history/ThematicSubpageClient";

export const metadata: Metadata = {
  title: "Post-9/11 America | Patriotic USA",
  description: "The War on Terror, security state challenges, and modern national defense.",
};

export default async function Post911AmericaPage() {
  const locale = await getServerLocale();
  const breadcrumbParent = locale === "ro" ? "Istorie" : "History";
  const breadcrumbPage = locale === "ro" ? "America Post-9/11" : "Post-9/11 America";
  const topics = THEMATIC_HISTORY_DATA["post-9-11-america"] || [];

  const title = {
    en: "Post-9/11 America",
    ro: "America Post-9/11",
  };

  const description = {
    en: "The War on Terror, security state challenges, and modern national defense.",
    ro: "Războiul împotriva terorismului, provocările statului de securitate și apărarea națională modernă.",
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
        subpageId="post-9-11-america"
        title={title}
        description={description}
        topics={topics}
      />
    </main>
  );
}
