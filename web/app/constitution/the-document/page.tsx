// ─── The Document — Full Constitution Reader ──────────────────────────────────
// A three-pane reading room for the complete text of the Constitution: an
// outline that follows your scroll, the verbatim document on a paper surface,
// and a context panel that unpacks every clause (plain English, history, cases,
// debates). The heavy lifting lives in the ConstitutionReader client component.

import type { Metadata } from "next";
import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/server";
import { ConstitutionReader } from "@/components/constitution/ConstitutionReader";

export const metadata: Metadata = {
  title: "The Document — Read the Constitution",
  description:
    "The full text of the U.S. Constitution in an interactive reading room: an outline that follows your scroll, elegant typography, and plain-English meaning, history, landmark cases, and debates for every clause.",
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
    <>
      {/* Slim return band above the paper surface */}
      <div className="border-b border-[rgba(138,109,31,0.25)] bg-[#efe6d0] px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <Link
            href="/constitution"
            className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#7c1d12] transition-colors hover:text-[#8a6d1f]"
          >
            {isRo ? "← Constituție & Democrație" : "← Constitution & Democracy"}
          </Link>
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8a6d1f]">
            {isRo ? "Textul integral" : "The Full Text"}
          </span>
        </div>
      </div>

      <ConstitutionReader />
    </>
  );
}
