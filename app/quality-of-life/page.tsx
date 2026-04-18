import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Quality of Life",
  description:
    "An empty layout scaffold for the Quality of Life section.",
};

export default function QualityOfLifePage() {
  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Quality of Life" }]} className="mb-8" />
      </div>

      <section
        id="hero"
        className="min-h-[70vh] scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-screen-xl items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
          {/* TODO: Drop in existing background video and H1 title here */}
        </div>
      </section>

      <section
        id="stats"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6">
              {/* TODO: Drop in existing 4 counters for PPP income, home size, cars, healthcare here */}
            </div>
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6" />
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6" />
            <div className="min-h-[180px] rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6" />
          </div>
        </div>
      </section>

      <section
        id="luxury"
        className="scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-2">
          <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
            {/* TODO: Drop in existing text about democratization of luxury on left, image comparison on right */}
          </div>
          <div className="min-h-[320px] rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8" />
        </div>
      </section>

      <section
        id="comparison"
        className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-screen-xl rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
          {/* TODO: Drop in existing D3.js comparison chart component here */}
        </div>
      </section>
    </main>
  );
}
