import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";

const SUB_PAGES = [
  {
    href: "/literature-philosophy/oratory-poetry",
    built: true,
    title: "Oratory & Poetry",
    titleRo: "Oratorie & Poezie",
    blurb:
      "The Gettysburg Address ran 272 words and two minutes. A close reading of American speech as a written form.",
    blurbRo:
      "Discursul de la Gettysburg a avut 272 de cuvinte și două minute. O lectură atentă a oratoriei americane ca formă scrisă.",
  },
  {
    href: "/literature-philosophy/transcendentalism",
    built: false,
    title: "Transcendentalism",
    titleRo: "Transcendentalism",
    blurb: "Emerson, Thoreau, and the argument that the individual conscience outranks the crowd.",
    blurbRo: "Emerson, Thoreau și argumentul că conștiința individuală trece înaintea mulțimii.",
  },
  {
    href: "/literature-philosophy/pragmatism",
    built: false,
    title: "Pragmatism",
    titleRo: "Pragmatism",
    blurb: "America's one native philosophy: truth as the thing that works, from Peirce to Rorty.",
    blurbRo: "Singura filosofie autohtonă a Americii: adevărul ca lucru care funcționează, de la Peirce la Rorty.",
  },
  {
    href: "/literature-philosophy/american-novel",
    built: false,
    title: "The American Novel",
    titleRo: "Romanul american",
    blurb: "From Moby-Dick to the present, and the openings that announced a new literature.",
    blurbRo: "De la Moby-Dick până azi și începuturile care au anunțat o literatură nouă.",
  },
  {
    href: "/literature-philosophy/sci-fi-myth",
    built: false,
    title: "Science Fiction & Myth",
    titleRo: "Science-fiction & mit",
    blurb: "How the frontier story left the West and went to space.",
    blurbRo: "Cum povestea frontierei a părăsit Vestul și a plecat în spațiu.",
  },
] as const;

export const metadata: Metadata = {
  title: "Literature & Philosophy | Patriotic USA",
  description: "Explore the ideas and voices that shaped the American spirit and exported a culture of freedom.",
};

export default async function LiteraturePhilosophyHubPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: isRo ? "Acasă" : "Home", href: "/" },
            { label: isRo ? "Literatură & Filosofie" : "Literature & Philosophy" },
          ]}
          className="mb-8"
        />
        
        <div className="border border-white/10 bg-white/[0.02] rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-glory-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border border-glory-gold/30 bg-glory-gold/5 text-glory-gold text-[9px] font-bold uppercase tracking-wider mb-6">
            {isRo ? "Idei & Creație" : "Ideas & Creation"}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {isRo ? "Literatură & Filosofie" : "Literature & Philosophy"}
          </h1>
          
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mb-8">
            {isRo 
              ? "Această secțiune explorează marile curente de gândire și scrieri literare americane: transcendentalism, pragmatism, romane reprezentative și oratoria clasică."
              : "This section explores the great currents of American thought and literary writings: transcendentalism, pragmatism, representative novels, and classic oratory."
            }
          </p>
        </div>

        {/* The hub shipped without links to any of its five children, which made
            every sub-page unreachable by navigation. `built` marks the ones that
            have real content: the rest are still stubs and are shown as such
            rather than promising a page that turns out to be empty. */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUB_PAGES.map((p) => {
            const title = isRo ? p.titleRo : p.title;
            const blurb = isRo ? p.blurbRo : p.blurb;
            if (!p.built) {
              return (
                <div
                  key={p.href}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 opacity-45"
                >
                  <h2 className="font-display text-xl text-white/70">{title}</h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/35">{blurb}</p>
                  <span className="mt-4 inline-block font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">
                    {isRo ? "În curând" : "Coming soon"}
                  </span>
                </div>
              );
            }
            return (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-glory-gold/40"
              >
                <h2 className="font-display text-xl text-white transition-colors group-hover:text-glory-gold">
                  {title}
                </h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/50">{blurb}</p>
                <span className="mt-4 inline-block font-body text-[10px] font-bold uppercase tracking-[0.18em] text-glory-gold">
                  {isRo ? "Citește" : "Read"} →
                </span>
              </Link>
            );
          })}
        </div>

        <AskAmericaCTA
          locale={locale}
          descriptionEn="Explore American literature, philosophy, and historical speeches using the interactive AI oracle."
          descriptionRo="Explorează literatura, filosofia și discursurile istorice americane folosind oracolul interactiv AI."
        />
      </div>
    </main>
  );
}
