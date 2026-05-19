"use client";

import Link from "next/link";

interface AskAmericaCTAProps {
  locale: string;
  descriptionEn: string;
  descriptionRo: string;
}

export function AskAmericaCTA({
  locale,
  descriptionEn,
  descriptionRo,
}: AskAmericaCTAProps) {
  const isRo = locale === "ro";

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="mx-auto max-w-7xl border border-zinc-800 bg-black p-8 md:p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div>
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest font-mono mb-2 block">
            AI Oracle
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
            {isRo ? "Oracolul Ask America" : "The Ask America Oracle"}
          </h3>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-sans">
            {isRo ? descriptionRo : descriptionEn}
          </p>
        </div>
        <Link
          href="/interactive"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-zinc-200 text-black font-semibold text-sm transition-colors rounded-md font-sans"
        >
          {isRo ? "Întreabă America →" : "Ask America →"}
        </Link>
      </div>
    </section>
  );
}
