import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import HistoryClient from "./HistoryClient";

export const metadata: Metadata = {
  title: "History of the United States | Patriotic USA",
  description: "Explore the chronological history of the United States of America from the founding era in 1776 to the present day, translated in English and Romanian.",
};

export default async function HistoryPage() {
  const locale = await getServerLocale();
  const breadcrumbLabel = locale === "ro" ? "Istorie" : "History";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: breadcrumbLabel }]} className="mb-8" />
      </div>
      <HistoryClient locale={locale} />
    </main>
  );
}


