// ─── Constitution & Democracy Main Hub Page ───────────────────────────────────
// This is the "brain" of the Constitution exhibit. It brings together all the
// interactive pieces (animations, data, and sections) to tell the story of
// the U.S. Constitution in a cinematic, museum-like way.
//
// For Beginners: This file uses "Next.js" (the framework) and "React" (the UI library).
// It's like a recipe that tells the browser which components to show and where.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_IMAGES } from "@/lib/site-images";
import { Breadcrumb }  from "@/components/layout/Breadcrumb";
import { FloatingTOC } from "@/components/layout/FloatingTOC";
import { QuoteBlock }  from "@/components/sections/QuoteBlock";
import {
  ConstitutionAurora, InkParticles, MetricCard,
  ClauseVault, FounderConstellation, AmendmentAccordion,
  SeparationDiagram, RightsCounter,
} from "@/components/constitution/ConstitutionAnimations";
import {
  CinematicHero,
  CinematicStat,
  UnbrokenLine,
  CinematicPullQuote,
  ConstitutionRace,
  WorldWithout,
  ScrollProgressSidebar,
} from "@/components/constitution/CinematicComponents";
import { MidnightGallery } from "@/components/constitution/MidnightGallery";
import { LuxuryClosing } from "@/components/constitution/LuxuryClosing";
import { FederalismHook } from "@/components/constitution/FederalismHook";
import { ElectoralMap } from "@/components/electoral-map/ElectoralMap";
import {
  ExhibitCase,
  AccessionLabel,
  NutGraf,
  Entablature,
  BreathingSection,
  InscriptionText,
  ConservationSpotlight,
  ChapterFooter,
  AmbientAudio,
} from "@/components/constitution/ExhibitComponents";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import DeepDiveSection from "@/components/shared/DeepDiveSection";
import { IconicPhotographs } from "@/components/shared/IconicPhotographs";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";
import { getConstitutionPageCopy } from "@/lib/i18n/messages/pages";
import {
  getConstitutionSubPages, getConstitutionMetrics, getRightsAtRiskStats,
  getFoundingFathers, getConstitutionClauses, getBillOfRights,
  getPresidentialTransfers, getPowersCheckExamples
} from "@/lib/data/constitution-data";

export const metadata: Metadata = {
  title: "Constitution & Democracy",
  description: "237 years of unbroken constitutional government — a record no other nation comes close to matching. An interactive deep dive into the most sophisticated legal architecture in human history.",
  alternates: { canonical: "/constitution" },
  openGraph: {
    title: "The Longest Experiment in Democracy",
    description: "4,543 words that govern a $31 trillion economy. 60 presidential elections. Zero coups.",
    url: "/constitution",
    images: [{ url: "/images/constitution/bill-of-rights-page-1.jpg", width: 1200, height: 630, alt: "The United States Bill of Rights" }],
  },
};

// A simple helper to create a "Section" of the page.
// In coding, we use helpers to avoid writing the same code over and over again.
// This ensures every section has the same spacing and a nice line at the top.
function Section({ id, eyebrow, children }: { id: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mb-8 scroll-mt-24 py-16">
      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />
      {eyebrow && <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">{eyebrow}</p>}
      {children}
    </section>
  );
}

export default async function ConstitutionPage() {
  // --- TRANSLATION & DATA FETCHING ---
  // In Next.js App Router, 'async' functions in 'page.tsx' run on the SERVER.
  // This means the code below executes before the visitor even sees the page.
  
  // 1. Get the current language (English or Romanian) from the server-side cookie.
  const locale   = await getServerLocale();
  const isRo     = locale === "ro";
  const copy     = getConstitutionPageCopy(locale);

  // 2. Fetch organized data from our local library (lib/data/constitution-data.ts).
  // We pass 'locale' so the function knows whether to return English or Romanian text.
  const metrics  = getConstitutionMetrics(locale);
  const subPages = getConstitutionSubPages(locale);
  const tocItems = copy.tocItems;

  return (
    <>
      <FloatingTOC items={tocItems} />
      {/* ══════════════════════════════════════════════════════════════════════
          CINEMATIC HERO — "We the People" + headline + CTAs
          ══════════════════════════════════════════════════════════════════════ */}
      <CinematicHero isRo={isRo} />

      {/* Floating scroll progress sidebar — xl screens only */}
      <ScrollProgressSidebar isRo={isRo} />

      {/* Persistent running chapter indicator */}
      <ChapterFooter isRo={isRo} />

      {/* Ambient sound design toggle */}
      <AmbientAudio src="/audio/ambient-exhibit.mp3" />

      {/* ══════════════════════════════════════════════════════════════════════
          BLOOMBERG STAT: 4,543 words
          This section shows a big number to grab the visitor's attention.
          The U.S. Constitution is famous for being very short but very powerful.
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#080B12]">
        {/* Marble texture ambient layer */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/constitution/marble-texture.webp')",
            backgroundRepeat: "repeat",
            backgroundSize: "512px 512px",
            opacity: 0.025,
            mixBlendMode: "screen",
          }}
        />
        <InkParticles count={40} />
        <CinematicStat
          value={4543}
          label={copy.statLabel}
          sublabel={copy.statSublabel}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTIONS — Main content
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#080B12]">
        {/* Marble texture ambient layer — GPU-friendly static bitmap */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/constitution/marble-texture.webp')",
            backgroundRepeat: "repeat",
            backgroundSize: "512px 512px",
            opacity: 0.025,
            mixBlendMode: "screen",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── I. The Document ─────────────────────────────────────────────── 
              This is the first major chapter of our digital exhibit.
              We start with the text itself before moving into the philosophy.
          */}
          <Entablature
            chapter="I"
            title={copy.chapter1Title}
          />

          <Section id="overview" eyebrow={copy.chapter1Eyebrow}>
            <NutGraf>
              {copy.chapter1NutGraf}
            </NutGraf>
            <h2 className="mb-6 font-display text-h1 text-[#F5F0E8]">
              {copy.chapter1Heading}
            </h2>
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <p className="font-body text-lg leading-relaxed text-[#B8B4AC]">
                {copy.chapter1Paragraph1}
              </p>
              <p className="font-body text-lg leading-relaxed text-[#B8B4AC]">
                {copy.chapter1Paragraph2}
              </p>
            </div>
            <ConservationSpotlight>
              <ExhibitCase>
                <div className="relative overflow-hidden">
                  <Image
                    src={SITE_IMAGES.constitution.pg1}
                    alt="United States Constitution, Page 1 — original parchment, National Archives"
                    width={1200} height={500}
                    className="h-[320px] w-full object-cover object-top md:h-[420px]"
                    placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                    quality={100}
                    style={{ filter: "sepia(15%) contrast(1.05) brightness(0.95)" }}
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#080B12]/80 via-transparent to-[#080B12]/80" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#080B12] via-transparent to-transparent" />
                  {/* Top gradient for mobile readability - removed stat overlay */}
                  <div className="absolute inset-0 bg-linear-to-b from-[#080B12]/80 via-transparent to-transparent md:hidden" />

                  <AccessionLabel
                    title={copy.accessionLabelTitle}
                    date={copy.accessionLabelDate}
                    medium={copy.accessionLabelMedium}
                    collection={copy.accessionLabelCollection}
                    accessionNumber="ARC #1667751"
                  />
                </div>
              </ExhibitCase>
            </ConservationSpotlight>
          </Section>

          {/* ── Clause Vault ──────────────────────────────────────────────────── 
              The 'Clause Vault' is an interactive component. 
              We pass it the 'clauses' data from our library.
              In React, passing data like this is called 'Props' (short for properties).
          */}
          <Section id="the-document" eyebrow={copy.vaultEyebrow}>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.vaultHeading}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {copy.vaultDescription}
            </p>
            <ClauseVault clauses={getConstitutionClauses(isRo)} isRo={isRo} />
          </Section>

          {/* ── Breathing section — emotional reset ── */}
          <BreathingSection word={isRo ? "LIBERTATE" : "LIBERTY"} />

          {/* ── Founders ─────────────────────────────────────────────────────── */}
          <Entablature
            chapter="II"
            title={copy.chapter2Title}
          />

          <Section id="founders">
            <NutGraf>
              {copy.chapter2NutGraf}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.chapter2Heading}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {copy.chapter2Description}
            </p>
            <MidnightGallery founders={getFoundingFathers(isRo)} isRo={isRo} />
          </Section>

          <CinematicPullQuote
            quote={copy.chapter2PullQuote}
            attribution="Patrick Henry"
            source="1788"
          />

          {/* ── Bill of Rights ───────────────────────────────────────────────── */}
          <Entablature
            chapter="III"
            title={copy.chapter3Title}
          />

          <Section id="bill-of-rights">
            <NutGraf>
              {copy.chapter3NutGraf}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.chapter3Heading}
            </h2>
            <AmendmentAccordion amendments={getBillOfRights(isRo)} isRo={isRo} />
            <div className="mt-6 flex justify-end">
              <Link href="/constitution/bill-of-rights" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {copy.chapter3Explore}
              </Link>
            </div>
          </Section>

          {/* ── Breathing section — emotional reset ── */}
          <BreathingSection word={isRo ? "JUSTIȚIE" : "JUSTICE"} />

          {/* ── Separation of Powers ─────────────────────────────────────────── */}
          <Entablature
            chapter="IV"
            title={copy.chapter4Title}
          />

          <Section id="separation-of-powers">
            <NutGraf>
              {copy.chapter4NutGraf}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.chapter4Heading}
            </h2>
            <p className="mb-10 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {copy.chapter4Description}
            </p>
            <SeparationDiagram examples={getPowersCheckExamples(isRo)} isRo={isRo} />
            <div className="mt-6 flex justify-end">
              <Link href="/constitution/separation-of-powers" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {copy.chapter4Explore}
              </Link>
            </div>
          </Section>

          {/* ── Federalism ───────────────────────────────────────────────────── */}
          <Entablature
            chapter="V"
            title={copy.chapter5Title}
          />

          <Section id="federalism">
            <NutGraf>
              {copy.chapter5NutGraf}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.chapter5Heading}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {copy.chapter5Description}
            </p>
            <FederalismHook isRo={isRo} />
          </Section>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOOMBERG STAT: 237 years
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#080B12]">
        <CinematicStat
          value={237}
          label={copy.stat2Label}
          sublabel={copy.stat2Sublabel}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          THE UNBROKEN LINE — Vertical transfer of power timeline
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#080B12]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Entablature
            chapter="VI"
            title={copy.chapter6Title}
          />

          <Section id="track-record">
            <NutGraf>
              {copy.chapter6NutGraf}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.chapter6Heading}
            </h2>
            <p className="mb-4 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {copy.chapter6Description}
            </p>
          </Section>

          <UnbrokenLine transfers={getPresidentialTransfers(isRo)} isRo={isRo} />

          <div className="mt-6 flex justify-end pb-8">
            <Link href="/constitution/democracy-track-record" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
              {copy.chapter6Explore}
            </Link>
          </div>

          {/* ── Constitution Race ─────────────────────────────────────── */}
          <Section id="constitution-race">
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.raceHeading}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {copy.raceDescription}
            </p>
            <ConstitutionRace isRo={isRo} />

            {/* Norway vs US Context */}
            <div className="mt-8 rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.02)] p-6 md:p-8">
              <h3 className="mb-4 font-display text-xl text-[#F5F0E8] flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(201,168,76,0.1)] text-xs font-bold text-[#C9A84C]">?</span>
                {copy.norwayTitle}
              </h3>
              <p className="mb-6 font-body text-sm leading-relaxed text-[#B8B4AC]">
                {copy.norwayDescription}
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-display text-base font-semibold text-[#C9A84C]">
                    {copy.norwayHeading}
                  </h4>
                  <p className="font-body text-xs leading-relaxed text-[#8B8880]">
                    {copy.norwayText1}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-display text-base font-semibold text-[#C9A84C]">
                    {copy.norwayHeading2}
                  </h4>
                  <ul className="space-y-2 font-body text-xs leading-relaxed text-[#8B8880]">
                    {copy.norwayRevisions.map((rev) => (
                      <li key={rev.label}>
                        <strong className="text-[#B8B4AC]">{rev.label}:</strong> {rev.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOOMBERG STAT: 0 coups
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#080B12]">
        <CinematicStat
          value={0}
          label={copy.stat3Label}
          sublabel={copy.stat3Sublabel}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          VII. THE GREAT STABILITY — Electoral Archive Map
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#080B12]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Breathing section — emotional reset ── */}
          <BreathingSection word={isRo ? "UNIUNE" : "UNION"} />

          <Entablature
            chapter="VII"
            title={copy.chapter7Title}
          />

          <Section id="electoral-archive">
            <NutGraf>
              {copy.chapter7NutGraf}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.chapter7Heading}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {copy.chapter7Description}
            </p>
            
            <div className="relative rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#0A0E14] p-4 md:p-8 shadow-2xl">
              <ElectoralMap isRo={isRo} />
            </div>

            <div className="mt-6 flex justify-end pb-8">
              <Link href="/constitution/electoral-map" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {copy.chapter7Explore}
              </Link>
            </div>
          </Section>

          {/* ══════════════════════════════════════════════════════════════════════
              VIII. GLOBAL CONTEXT
              ══════════════════════════════════════════════════════════════════════ */}
          <Entablature
            chapter="VIII"
            title={copy.chapter8Title}
          />

          <Section id="rights-at-risk">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <NutGraf>
                  {copy.chapter8NutGraf}
                </NutGraf>
                <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
                  {copy.chapter8Heading}
                </h2>
                <p className="mb-6 font-body text-base leading-relaxed text-[#B8B4AC]">
                  {copy.chapter8Description}
                </p>
              </div>
              <RightsCounter stats={getRightsAtRiskStats(isRo)} />
            </div>
          </Section>

          {/* ── IX. The World Without ───────────────────────────────── */}
          <Entablature
            chapter="IX"
            title={copy.chapter9Title}
          />

          <Section id="world-without">
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {copy.chapter9Heading}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {copy.chapter9Description}
            </p>
            <WorldWithout isRo={isRo} />
          </Section>

          <CinematicPullQuote
            quote={copy.madisonQuote}
            attribution="James Madison"
            source={copy.madisonSource}
          />

          {/* ── Deep Dives ─────────────────────────────────────────────────── 
              This section uses the 'map' function. 
              'map' is a JavaScript tool that takes an array of data (like our subPages list)
              and turns each item into a React component (in this case, a Link card).
          */}
          <Section id="explore" eyebrow={copy.chapter9DeepDives}>
            <h2 className="mb-8 font-display text-h2 text-[#F5F0E8]">
              {copy.chapter9DeepDivesHeading}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subPages.slice(0, 6).map(page => (
                <Link key={page.href} href={page.href}
                  className="group relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#12181F] transition-all duration-300 hover:border-[rgba(201,168,76,0.4)] hover:shadow-[0_0_40px_rgba(201,168,76,0.08)]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image src={page.imageSrc} alt={page.imageAlt} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                      placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#12181F] via-[#12181F]/30 to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.12)] px-3 py-1 font-body text-xs font-semibold text-[#C9A84C] backdrop-blur-sm">
                      {page.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1.5 font-display text-lg font-semibold text-[#F5F0E8] transition-colors group-hover:text-[#C9A84C]">{page.title}</h3>
                    <p className="font-body text-sm leading-relaxed text-[#6B6860]">{page.description}</p>
                    <p className="mt-4 font-body text-xs font-semibold text-[#C9A84C] opacity-0 transition-opacity group-hover:opacity-100">
                      {copy.exploreCta}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            {subPages.length > 6 && (
              <div className="mt-5 flex justify-center">
                <div className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13px)]">
                  {subPages.slice(6).map(page => (
                    <Link key={page.href} href={page.href}
                      className="group block relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#12181F] transition-all duration-300 hover:border-[rgba(201,168,76,0.4)] hover:shadow-[0_0_40px_rgba(201,168,76,0.08)]"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image src={page.imageSrc} alt={page.imageAlt} fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                          quality={100}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#12181F] via-[#12181F]/30 to-transparent" />
                        <span className="absolute right-3 top-3 rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.12)] px-3 py-1 font-body text-xs font-semibold text-[#C9A84C] backdrop-blur-sm">
                          {page.badge}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="mb-1.5 font-display text-lg font-semibold text-[#F5F0E8] transition-colors group-hover:text-[#C9A84C]">{page.title}</h3>
                        <p className="font-body text-sm leading-relaxed text-[#6B6860]">{page.description}</p>
                        <p className="mt-4 font-body text-xs font-semibold text-[#C9A84C] opacity-0 transition-opacity group-hover:opacity-100">
                          {copy.exploreCta}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Section>

        </div>
      </div>

      {/* Deep Dive Archive */}
      <IconicPhotographs
        section="constitution"
        intro="The institutions and milestones of American self-government — from the Capitol dome to the modern Court, captured on film."
      />

      <div className="bg-[#080B12]">
        <DeepDiveSection
          locale={locale}
          topics={VERTICALS_THEMATIC_DATA["constitution"] || []}
          theme={DEEP_DIVE_THEMES.constitution}
        />
      </div>

      <div className="relative bg-[#080B12] pt-12 pb-8">
        <AskAmericaCTA
          locale={locale}
          descriptionEn="Ask the AI Oracle about constitutional republic principles, the checks and balances framework, the Bill of Rights, or historical elections."
          descriptionRo="Întreabă Oracolul AI despre principiile republicii constituționale, cadrul sistemelor de control, Carta Drepturilor sau alegerile istorice."
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LUXURY CLOSING — "This exhibit is free. These rights are yours."
          ══════════════════════════════════════════════════════════════════════ */}
      <LuxuryClosing isRo={isRo} />
    </>
  );
}
