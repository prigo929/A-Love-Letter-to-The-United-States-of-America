// ─── Literature & Philosophy: the hub ────────────────────────────────────────
// Rebuilt from the original 53-line stub, which linked none of its own children
// and carried no content. Now it is a real landing: a full-bleed hero, a
// scrubbable four-century era timeline (the spine of the section), and cards to
// each sub-page that mark which are built and which are still stubs.

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";
import { LitStyles, ScrollIlluminatedText, EraTimeline, PullQuote } from "@/components/literature/LiteratureAnimations";
import { LITERARY_ERAS } from "@/lib/data/literature-eras";
import { LITERATURE_ASSETS } from "@/lib/data/literature-assets";
import { getServerLocale } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Literature & Philosophy | America: The Greatest Nation",
  description:
    "Four centuries of American writing, from a Puritan sermon to Toni Morrison — the ideas, the voices, and the one native philosophy the country produced.",
  alternates: { canonical: "/literature-philosophy" },
};

const SUB_PAGES = [
  {
    href: "/literature-philosophy/oratory-poetry",
    built: true,
    title: "Oratory & Poetry",
    titleRo: "Oratorie & Poezie",
    blurb: "The Gettysburg Address ran 272 words and two minutes. A close reading of American speech as a written form.",
    blurbRo: "Discursul de la Gettysburg a avut 272 de cuvinte și două minute. O lectură atentă a oratoriei americane ca formă scrisă.",
  },
  {
    href: "/literature-philosophy/american-novel",
    built: true,
    title: "The American Novel",
    titleRo: "Romanul american",
    blurb: "From Moby-Dick to the present, and the openings that announced a new literature.",
    blurbRo: "De la Moby-Dick până azi și începuturile care au anunțat o literatură nouă.",
  },
  {
    href: "/literature-philosophy/transcendentalism",
    built: true,
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
    href: "/literature-philosophy/sci-fi-myth",
    built: false,
    title: "Science Fiction & Myth",
    titleRo: "Science-fiction & mit",
    blurb: "How the frontier story left the West and went to space.",
    blurbRo: "Cum povestea frontierei a părăsit Vestul și a plecat în spațiu.",
  },
] as const;

export default async function LiteraturePhilosophyHubPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        home: "Acasă",
        section: "Literatură & Filosofie",
        eyebrow: "IDEI & CREAȚIE",
        titleLead: "SPUNEȚI-MI",
        titleAccent: "ISMAEL",
        heroDesc:
          "Patru secole de scriitură americană, de la o predică puritană la Toni Morrison — ideile, vocile și singura filosofie autohtonă pe care a produs-o țara.",
        introTitle: "O literatură care s-a inventat pe sine",
        introBody:
          "America a început fără o literatură a sa. Timp de un secol și jumătate a împrumutat formele Angliei și a scris predici. Apoi, în câteva decenii uluitoare de la mijlocul secolului XIX, și-a găsit propria voce — și a petrecut cei o sută cincizeci de ani de atunci certându-se despre cine are dreptul s-o folosească. Aceasta este povestea acelei certuri.",
        timelineTitle: "Patru secole, opt argumente",
        timelineBody:
          "Fiecare epocă a scriiturii americane s-a certat despre altceva. Apasă pe o bandă pentru a vedea despre ce.",
        readLabel: "Explorează",
        exploreTitle: "Explorează secțiunea",
        cardRead: "Citește",
        cardSoon: "În curând",
        quote: "Toată literatura americană modernă provine dintr-o carte a lui Mark Twain, Huckleberry Finn.",
        quoteBy: "Ernest Hemingway",
      }
    : {
        home: "Home",
        section: "Literature & Philosophy",
        eyebrow: "IDEAS & CREATION",
        titleLead: "CALL ME",
        titleAccent: "ISHMAEL",
        heroDesc:
          "Four centuries of American writing, from a Puritan sermon to Toni Morrison — the ideas, the voices, and the one native philosophy the country produced.",
        introTitle: "A literature that invented itself",
        introBody:
          "America began with no literature of its own. For a century and a half it borrowed England's forms and wrote sermons. Then, in a few astonishing decades in the mid-nineteenth century, it found its own voice — and it has spent the hundred and fifty years since arguing about who gets to use it. This is the story of that argument.",
        timelineTitle: "Four centuries, eight arguments",
        timelineBody:
          "Every era of American writing was arguing about something different. Click a band to see what.",
        readLabel: "Explore",
        exploreTitle: "Explore the section",
        cardRead: "Read",
        cardSoon: "Coming soon",
        quote: "All modern American literature comes from one book by Mark Twain called Huckleberry Finn.",
        quoteBy: "Ernest Hemingway",
      };

  const hero = LITERATURE_ASSETS.leavesOfGrass1855;

  return (
    <main className="min-h-screen bg-black text-white">
      <MacroStyles />
      <LitStyles />

      <MacroHero
        imageSrc={hero.src}
        imageAlt={isRo ? hero.altRo : hero.alt}
        eyebrow={copy.eyebrow}
        titleLead={isRo ? "LITERATURĂ" : "LITERATURE"}
        titleAccent={isRo ? "& FILOSOFIE" : "& PHILOSOPHY"}
        description={copy.heroDesc}
        stats={[
          { value: "4", label: isRo ? "Secole" : "Centuries" },
          { value: "8", label: isRo ? "Epoci" : "Eras" },
          { value: "1", label: isRo ? "Filosofie autohtonă" : "Native philosophy" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: copy.home, href: "/" }, { label: copy.section }]}
          className="py-8"
        />

        <section className="py-20 md:py-28">
          <h2 className="macro-section-title mb-12">{copy.introTitle}</h2>
          <ScrollIlluminatedText className="lit-serif lit-measure text-2xl leading-[1.7] md:text-[34px] md:leading-[1.55]">
            {copy.introBody}
          </ScrollIlluminatedText>
        </section>

        {/* The spine of the section */}
        <section className="py-16 md:py-24">
          <h2 className="macro-section-title mb-6">{copy.timelineTitle}</h2>
          <p className="macro-body mb-14 max-w-3xl">{copy.timelineBody}</p>
          <EraTimeline eras={LITERARY_ERAS} readLabel={copy.readLabel} readLabelRo={copy.readLabel} />
        </section>

        <PullQuote quote={copy.quote} attribution={copy.quoteBy} meta="1935" />

        {/* Cards to the sub-pages */}
        <section className="py-16 md:py-24">
          <h2 className="macro-section-title mb-12">{copy.exploreTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUB_PAGES.map((p) => {
              const title = isRo ? p.titleRo : p.title;
              const blurb = isRo ? p.blurbRo : p.blurb;
              if (!p.built) {
                return (
                  <div
                    key={p.href}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 opacity-45"
                  >
                    <h3 className="lit-serif text-2xl text-white/70">{title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-white/35">{blurb}</p>
                    <span className="mt-4 inline-block font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white/25">
                      {copy.cardSoon}
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
                  <h3 className="lit-serif text-2xl text-white transition-colors group-hover:text-glory-gold">
                    {title}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/50">{blurb}</p>
                  <span className="mt-4 inline-block font-body text-[10px] font-bold uppercase tracking-[0.18em] text-glory-gold">
                    {copy.cardRead} →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="h-16" />
      </div>
    </main>
  );
}
