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
import { Breadcrumb }  from "@/components/layout/Breadcrumb";
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
import { GearDiagram } from "@/components/constitution/GearDiagram";
import { LuxuryClosing } from "@/components/constitution/LuxuryClosing";
import { FederalismHook } from "@/components/constitution/FederalismHook";
import {
  ExhibitCase,
  AccessionLabel,
  NutGraf,
  Entablature,
  BreathingSection,
  InscriptionText,
  ConservationSpotlight,
  ChapterFooter,
} from "@/components/constitution/ExhibitComponents";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import {
  getConstitutionSubPages, getConstitutionMetrics, getRightsAtRiskStats,
  getFoundingFathers, getConstitutionClauses, getBillOfRights,
  getPresidentialTransfers, getPowersCheckExamples
} from "@/lib/data/constitution-data";

export const metadata: Metadata = {
  title: "Constitution & Democracy | America: The Greatest Nation",
  description: "237 years of unbroken constitutional government — a record no other nation comes close to matching. An interactive deep dive into the most sophisticated legal architecture in human history.",
  alternates: { canonical: "/constitution" },
  openGraph: {
    title: "The Longest Experiment in Democracy",
    description: "4,543 words that govern a $31 trillion economy. 59 presidential elections. Zero coups.",
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
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />
      {eyebrow && <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">{eyebrow}</p>}
      {children}
    </section>
  );
}

export default async function ConstitutionPage() {
  // We check the language (English or Romanian) so we can show the right text.
  // This is called "Internationalization" or "i18n".
  const locale   = await getServerLocale();
  const isRo     = locale === "ro";

  // We pull in the data (numbers, names, facts) from our database files.
  const metrics  = getConstitutionMetrics(locale);
  const subPages = getConstitutionSubPages(locale);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          CINEMATIC HERO — "We the People" + headline + CTAs
          ══════════════════════════════════════════════════════════════════════ */}
      <CinematicHero isRo={isRo} />

      {/* Floating scroll progress sidebar — xl screens only */}
      <ScrollProgressSidebar isRo={isRo} />

      {/* Persistent running chapter indicator */}
      <ChapterFooter isRo={isRo} />

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
          label={isRo ? "cuvinte ce guvernează o economie de 31 trilioane $" : "words governing a $31 trillion economy"}
          sublabel={isRo ? "Cea mai scurtă constituție națională majoră" : "The shortest major national constitution"}
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
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

          {/* ── I. The Document ─────────────────────────────────────────────── 
              This is the first major chapter of our digital exhibit.
              We start with the text itself before moving into the philosophy.
          */}
          <Entablature
            chapter="I"
            title={isRo ? "Documentul Viu" : "The Living Document"}
          />

          <Section id="overview" eyebrow={isRo ? "Constituție și Democrație" : "Constitution & Democracy"}>
            <NutGraf>
              {isRo
                ? "4.543 de cuvinte. 237 de ani. Zero întreruperi."
                : "4,543 words. 237 years. Zero interruptions."}
            </NutGraf>
            <h2 className="mb-6 font-display text-h1 text-[#F5F0E8]">
              {isRo ? "Documentul care Conduce Lumea" : "The Document That Runs the World"}
            </h2>
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <p className="font-body text-lg leading-relaxed text-[#B8B4AC]">
                {isRo
                  ? "4.543 de cuvinte. Scrise de 55 de bărbați în 116 zile la Philadelphia, în vara anului 1787. Aceleași cuvinte care autorizau comerțul de-a lungul râului Potomac autorizează astăzi economia de 31 de trilioane de dolari a Americii."
                  : "4,543 words. Written by 55 men in 116 days in Philadelphia, in the summer of 1787. The same words that authorized commerce along the Potomac River in 1787 authorize America's $31 trillion economy today."}
              </p>
              <p className="font-body text-lg leading-relaxed text-[#B8B4AC]">
                {isRo
                  ? "237 de ani de democrație constituțională neîntreruptă. 59 de alegeri prezidențiale. Niciun coup. Nicio suspendare. Niciun monarh. Un record pe care nicio altă națiune de pe Pământ nu îl poate egala."
                  : "237 years of unbroken constitutional democracy. 59 presidential elections. Zero coups. Zero suspensions. Zero monarchs. A record no other nation on Earth comes close to matching."}
              </p>
            </div>
            <ConservationSpotlight>
              <ExhibitCase>
                <div className="relative overflow-hidden">
                  <Image
                    src="/images/constitution/constitution-page-1.jpg"
                    alt="United States Constitution, Page 1 — original parchment, National Archives"
                    width={1200} height={500}
                    className="h-[320px] w-full object-cover object-top md:h-[420px]"
                    placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                    quality={100}
                    style={{ filter: "sepia(15%) contrast(1.05) brightness(0.95)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#080B12]/80 via-transparent to-[#080B12]/80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent" />
                  {/* Top gradient for mobile readability of the stat */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/80 via-transparent to-transparent md:hidden" />
                  <div className="absolute top-6 left-6 md:top-auto md:bottom-6 md:left-6">
                    <p className="font-hero text-4xl text-[#C9A84C]">4,543</p>
                    <p className="font-body text-sm text-[#F5F0E8]/70 max-w-[180px] md:max-w-none">
                      {isRo ? "cuvinte ce guvernează o economie de 31 trilioane $" : "words governing a $31 trillion economy"}
                    </p>
                  </div>
                  <AccessionLabel
                    title={isRo ? "Constituția Statelor Unite, Pagina 1" : "United States Constitution, Page 1"}
                    date={isRo ? "17 Septembrie 1787" : "September 17, 1787"}
                    medium={isRo ? "Cerneală de fier pe pergament" : "Iron gall ink on parchment"}
                    collection={isRo ? "Arhivele Naționale · Grupul 11" : "National Archives · Record Group 11"}
                    accessionNumber="ARC #1667751"
                  />
                </div>
              </ExhibitCase>
            </ConservationSpotlight>
          </Section>

          {/* ── Clause Vault ──────────────────────────────────────────────────── */}
          <Section id="the-document" eyebrow={isRo ? "Documentul Viu" : "The Living Document"}>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Pasaje ce Au Schimbat Lumea" : "Passages That Changed the World"}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo ? "Dă click pe orice clauză pentru a-i ilumina moștenirea. Fiecare propoziție este în vigoare chiar acum." : "Click over any clause to illuminate its legacy. Every sentence is in force right now."}
            </p>
            <ClauseVault clauses={getConstitutionClauses(isRo)} isRo={isRo} />
          </Section>

          {/* ── Breathing section — emotional reset ── */}
          <BreathingSection word={isRo ? "LIBERTATE" : "LIBERTY"} />

          {/* ── Founders ─────────────────────────────────────────────────────── */}
          <Entablature
            chapter="II"
            title={isRo ? "Arhitecții Libertății" : "Architects of Liberty"}
          />

          <Section id="founders">
            <NutGraf>
              {isRo
                ? "55 de delegați. 116 zile. Un singur scop."
                : "55 delegates. 116 days. One purpose."}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Galeria de la Miezul Nopții" : "The Midnight Gallery"}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "Un seif privat, climatizat, adânc sub Arhivele Naționale. Dă click pe un portret pentru a deschide dosarul."
                : "A private, climate-controlled vault deep beneath the National Archives. Click a portrait to open the dossier."}
            </p>
            <MidnightGallery founders={getFoundingFathers(isRo)} isRo={isRo} />
          </Section>

          <CinematicPullQuote
            quote={isRo
              ? "Constituția nu este un instrument prin care guvernul restrânge poporul, ci un instrument prin care poporul restrânge guvernul."
              : "The Constitution is not an instrument for the government to restrain the people, it is an instrument for the people to restrain the government."}
            attribution="Patrick Henry"
            source="1788"
          />

          {/* ── Bill of Rights ───────────────────────────────────────────────── */}
          <Entablature
            chapter="III"
            title={isRo ? "Declarația Drepturilor" : "Bill of Rights"}
          />

          <Section id="bill-of-rights">
            <NutGraf>
              {isRo
                ? "Motivul pentru care criticarea acestei pagini este protejată constituțional."
                : "The reason criticizing this page is constitutionally protected."}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Zece Garanții. 235 de Ani." : "Ten Guarantees. 235 Years."}
            </h2>
            <AmendmentAccordion amendments={getBillOfRights(isRo)} isRo={isRo} />
            <div className="mt-6 flex justify-end">
              <Link href="/constitution/bill-of-rights" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {isRo ? "Explorare Completă →" : "Full Explorer →"}
              </Link>
            </div>
          </Section>

          {/* ── Breathing section — emotional reset ── */}
          <BreathingSection word={isRo ? "JUSTIȚIE" : "JUSTICE"} />

          {/* ── Separation of Powers ─────────────────────────────────────────── */}
          <Entablature
            chapter="IV"
            title={isRo ? "Separarea Puterilor" : "Separation of Powers"}
          />

          <Section id="separation-of-powers">
            <NutGraf>
              {isRo
                ? "Trei ramuri. Fiecare verificând celelalte două."
                : "Three branches. Each checking the other two."}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "De Ce Tirania Este Aproape Imposibilă" : "Why Tyranny Is Nearly Impossible"}
            </h2>
            <div className="mb-10">
              <h3 className="mb-3 font-display text-xl font-semibold text-[#C9A84C]">
                {isRo ? "Faza 1: Arhitectura Tensiunii" : "Phase 1: The Architecture of Tension"}
              </h3>
              <p className="max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
                {isRo ? "Părinții Fondatori au proiectat o mașinărie în care ambiția contracarează ambiția. Nici o singură roată nu se poate roti fără să le forțeze pe celelalte să se miște odată cu ea. Puterile nu sunt doar separate; ele sunt conectate intenționat pentru a crea fricțiune." : "The Founders designed a machine where ambition counteracts ambition. No single wheel can turn without forcing the others to move with it. Powers are not just separated; they are intentionally interlocked to create friction."}
              </p>
            </div>
            <GearDiagram isRo={isRo} />
            
            <div className="mt-16 mb-8">
              <h3 className="mb-3 font-display text-xl font-semibold text-[#C9A84C]">
                {isRo ? "Faza 2: Mașinăria în Lumea Reală" : "Phase 2: The Machine in the Real World"}
              </h3>
              <p className="max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
                {isRo ? "Teoria este un lucru; realitatea este altul. Așa funcționează sistemul când aceste roți se opresc cu adevărat în timpul unei crize naționale." : "Theory is one thing; reality is another. Here is what it actually looks like when those gears grind to a halt during a national crisis."}
              </p>
            </div>
            <SeparationDiagram examples={getPowersCheckExamples(isRo)} isRo={isRo} />
            <div className="mt-6 flex justify-end">
              <Link href="/constitution/separation-of-powers" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {isRo ? "Analiză Completă →" : "Full Analysis →"}
              </Link>
            </div>
          </Section>

          {/* ── Federalism ───────────────────────────────────────────────────── */}
          <Entablature
            chapter="V"
            title={isRo ? "Laboratoare ale Democrației" : "Laboratories of Democracy"}
          />

          <Section id="federalism">
            <NutGraf>
              {isRo
                ? "50 de state. 50 de experimente. Rezultate reale."
                : "50 states. 50 experiments. Real outcomes."}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "50 de State. 50 de Experimente." : "50 States. 50 Experiments."}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "Proiectează-ți statul ideal. Descoperă care stat american trăiește deja așa — și ce rezultate reale a produs."
                : "Design your ideal state. Discover which real American state already lives that way — and what outcomes it produces."}
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
          label={isRo ? "ani de guvernare constituțională neîntreruptă" : "years of unbroken constitutional government"}
          sublabel={isRo ? "Cel mai lung din istoria înregistrată" : "The longest in recorded history"}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          THE UNBROKEN LINE — Vertical transfer of power timeline
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Entablature
            chapter="VI"
            title={isRo ? "250 de Ani de Dovezi" : "250 Years of Evidence"}
          />

          <Section id="track-record">
            <NutGraf>
              {isRo
                ? "De Fiecare Dată"
                : "Every. Single. Time."}
            </NutGraf>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Linia Neîntreruptă" : "The Unbroken Line"}
            </h2>
            <p className="mb-4 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "Fiecare nod de-a lungul liniei de aur reprezintă un transfer de putere prezidențial. Nodurile roșii sunt momente de criză — când sistemul a fost cel mai mult testat."
                : "Each node along the golden line represents a presidential transfer of power. Red nodes are crisis moments — when the system was tested most severely."}
            </p>
          </Section>

          <UnbrokenLine transfers={getPresidentialTransfers(isRo)} isRo={isRo} />

          <div className="mt-6 flex justify-end pb-8">
            <Link href="/constitution/democracy-track-record" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
              {isRo ? "Cronologie Completă →" : "Full Timeline →"}
            </Link>
          </div>

          {/* ── Constitution Race ─────────────────────────────────────── */}
          <Section id="constitution-race">
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Cursa pe Care Nimeni Altcineva nu o Câștigă" : "The Race Nobody Else Wins"}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "Privește constituțiile lumii cum se ridică și se prăbușesc. Bara americană de aur nu se oprește niciodată."
                : "Watch the world's constitutions rise and collapse. America's golden bar never stops."}
            </p>
            <ConstitutionRace isRo={isRo} />

            {/* Norway vs US Context */}
            <div className="mt-8 rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.02)] p-6 md:p-8">
              <h3 className="mb-4 font-display text-xl text-[#F5F0E8] flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(201,168,76,0.1)] text-xs font-bold text-[#C9A84C]">?</span>
                {isRo ? "Excepția: Norvegia (1814)" : "The Exception: Norway (1814)"}
              </h3>
              <p className="mb-6 font-body text-sm leading-relaxed text-[#B8B4AC]">
                {isRo
                  ? "Deși ambele țări și-au păstrat documentele originale, Norvegia și-a transformat radical sistemul de guvernare prin amendamente, în timp ce S.U.A. a menținut aceeași structură fundamentală."
                  : "While both countries have kept their original documents, Norway radically transformed its actual system of government, whereas the U.S. has maintained the exact same fundamental structure."}
              </p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-display text-base font-semibold text-[#C9A84C]">
                    {isRo ? "Schimbări Structurale: 27 vs. 300+" : "Structural Changes: 27 vs. 300+"}
                  </h4>
                  <p className="font-body text-xs leading-relaxed text-[#8B8880]">
                    {isRo
                      ? "Constituția SUA a avut doar 27 de amendamente, menținând limba originală. Norvegia a avut peste 300 de amendamente și a rescris întregul document în 2014, deoarece limbajul originar în stil danez devenise prea dificil de citit."
                      : "The US Constitution only has 27 amendments, maintaining its original language. Norway has had over 300 amendments and rewrote the entire document in modern Norwegian in 2014 because the 1814 Danish-style language became unreadable to modern citizens."}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-display text-base font-semibold text-[#C9A84C]">
                    {isRo ? "Revizuiri Radicale" : "Radical Revisions"}
                  </h4>
                  <ul className="space-y-2 font-body text-xs leading-relaxed text-[#8B8880]">
                    <li><strong className="text-[#B8B4AC]">1884 ({isRo ? "Parlamentarism" : "Parliamentarism"}):</strong> {isRo ? "Guvernul trebuie să aibă sprijinul majorității parlamentare." : "Introduced parliamentarism; cabinet requires parliamentary majority."}</li>
                    <li><strong className="text-[#B8B4AC]">2009 ({isRo ? "Abolirea Unei Camere" : "Abolishing a House"}):</strong> {isRo ? "A trecut la un sistem unicameral, abolind o cameră a Parlamentului." : "Abolished a House of Parliament, switching to a unicameral system."}</li>
                    <li><strong className="text-[#B8B4AC]">2012 ({isRo ? "Religie de Stat" : "State Religion"}):</strong> {isRo ? "A eliminat statutul Bisericii Evanghelice Luterane ca religie oficială." : "Removed the Evangelical-Lutheran Church as the official state religion."}</li>
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
          label={isRo ? "lovituri de stat. În 237 de ani." : "coups. In 237 years."}
          sublabel={isRo ? "Zero. Niciodată." : "Zero. Never."}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          RIGHTS AT RISK + GLOBAL CONTEXT
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* ── Breathing section — emotional reset ── */}
          <BreathingSection word={isRo ? "UNIUNE" : "UNION"} />

          <Entablature
            chapter="VII"
            title={isRo ? "Context Global" : "Global Context"}
          />

          <Section id="rights-at-risk">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <NutGraf>
                  {isRo
                    ? "Construite. Nu moștenite."
                    : "Built. Not inherited."}
                </NutGraf>
                <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
                  {isRo ? "Acestea Nu Sunt Normale" : "These Are Not the Default"}
                </h2>
                <p className="mb-6 font-body text-base leading-relaxed text-[#B8B4AC]">
                  {isRo
                    ? "Drepturile pe care americanii le iau de-a gata nu sunt starea normală a civilizației umane. Ele sunt excepția. Ele au fost construite. Trebuie păstrate."
                    : "The rights Americans take for granted are not the default state of human civilization. They are the exception. They were built. They must be kept."}
                </p>
              </div>
              <RightsCounter stats={getRightsAtRiskStats(isRo)} />
            </div>
          </Section>

          {/* ── VIII. The World Without ───────────────────────────────── */}
          <Entablature
            chapter="VIII"
            title={isRo ? "Lumea Fără" : "The World Without"}
          />

          <Section id="world-without">
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Ce Se Întâmplă Când Drepturile Nu Există" : "What Happens When Rights Don't Exist"}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "Fiecare pereche arată un drept american alături de realitatea din țări unde acel drept nu există."
                : "Each pair shows an American right alongside the reality in countries where that right does not exist."}
            </p>
            <WorldWithout isRo={isRo} />
          </Section>

          <CinematicPullQuote
            quote={isRo
              ? "Dacă oamenii ar fi îngeri, nu ar fi necesar niciun guvern. Dacă îngerii ar guverna oamenii, nu ar fi necesare controale externe sau interne ale guvernului."
              : "If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary."}
            attribution="James Madison"
            source={isRo ? "Federalistul Nr. 51, 1788" : "Federalist No. 51, 1788"}
          />

          {/* ── Deep Dives ─────────────────────────────────────────────────── */}
          <Section id="explore" eyebrow={isRo ? "Explorează mai Adânc" : "Explore Deeper"}>
            <h2 className="mb-8 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Imersiuni în Profunzime" : "Deep Dives"}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subPages.map(page => (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12181F] via-[#12181F]/30 to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.12)] px-3 py-1 font-body text-xs font-semibold text-[#C9A84C] backdrop-blur-sm">
                      {page.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1.5 font-display text-lg font-semibold text-[#F5F0E8] transition-colors group-hover:text-[#C9A84C]">{page.title}</h3>
                    <p className="font-body text-sm leading-relaxed text-[#6B6860]">{page.description}</p>
                    <p className="mt-4 font-body text-xs font-semibold text-[#C9A84C] opacity-0 transition-opacity group-hover:opacity-100">
                      {isRo ? "Explorează →" : "Explore →"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Section>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LUXURY CLOSING — "This exhibit is free. These rights are yours."
          ══════════════════════════════════════════════════════════════════════ */}
      <LuxuryClosing isRo={isRo} />
    </>
  );
}
