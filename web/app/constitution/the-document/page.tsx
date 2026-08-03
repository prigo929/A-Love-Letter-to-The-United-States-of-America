// ─── The Document — Full Constitution Reader ──────────────────────────────────
// A three-pane reading room for the complete text of the Constitution: an
// outline that follows your scroll, the verbatim document on a lit paper sheet,
// and a context panel that unpacks every clause (plain English, history, cases,
// debates). The heavy lifting lives in the ConstitutionReader client component.

import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ConstitutionReader } from "@/components/constitution/ConstitutionReader";

export const metadata: Metadata = {
  title: "The Document — Read the Constitution",
  description:
    "The full text of the U.S. Constitution in an interactive reading room: an outline that follows your scroll, elegant typography on paper, and plain-English meaning, history, landmark cases, and debates for every clause.",
  alternates: { canonical: "/constitution/the-document" },
  openGraph: {
    title: "Read the Constitution — The Full Text",
    description:
      "Every article and amendment, word for word, with plain-English meaning, history, and the Supreme Court cases behind each clause.",
    url: "/constitution/the-document",
  },
};

export default async function TheDocumentPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  return (
    <div className="bg-[#080B12]">
      {/* Breadcrumb sits just below the main menu */}
      <div className="border-b border-[rgba(201,168,76,0.14)] px-4 pt-24 pb-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 mx-auto">
          <Breadcrumb
            dark
            items={[
              { label: isRo ? "Constituție" : "Constitution", href: "/constitution" },
              { label: isRo ? "Textul Integral" : "The Full Text" },
            ]}
          />
        </div>
      </div>

      <ConstitutionReader />
    </div>
  );
}
