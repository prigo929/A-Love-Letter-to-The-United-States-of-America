// ─── Constitution & Democracy Main Hub Page ───────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }  from "@/components/layout/Breadcrumb";
import { QuoteBlock }  from "@/components/sections/QuoteBlock";
import {
  ConstitutionAurora, InkParticles, MetricCard,
  ClauseVault, FounderConstellation, AmendmentAccordion,
  SeparationDiagram, TransferTimeline, FederalismSimulator, RightsCounter,
} from "@/components/constitution/ConstitutionAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import {
  CONSTITUTION_CLAUSES, FOUNDING_FATHERS, BILL_OF_RIGHTS,
  PRESIDENTIAL_TRANSFERS, STATES_POLICY_DATA, POWERS_CHECK_EXAMPLES,
  RIGHTS_AT_RISK_STATS, getConstitutionSubPages, getConstitutionMetrics,
} from "@/lib/data/constitution-data";

export const metadata: Metadata = {
  title: "Constitution & Democracy | America: The Greatest Nation",
  description: "237 years of unbroken constitutional government — a record no other nation comes close to matching. An interactive deep dive into the most sophisticated legal architecture in human history.",
  alternates: { canonical: "/constitution" },
  openGraph: {
    title: "The Longest Experiment in Democracy",
    description: "4,543 words that govern a $27 trillion economy. 59 presidential elections. Zero coups.",
    url: "/constitution",
    images: [{ url: "/images/constitution/bill-of-rights-page-1.jpg", width: 1200, height: 630, alt: "The United States Bill of Rights" }],
  },
};

function Section({ id, eyebrow, children }: { id: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mb-24 scroll-mt-24 py-16">
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.25)] to-transparent" />
      {eyebrow && <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">{eyebrow}</p>}
      {children}
    </section>
  );
}

export default async function ConstitutionPage() {
  const locale   = await getServerLocale();
  const isRo     = locale === "ro";
  const metrics  = getConstitutionMetrics(locale);
  const subPages = getConstitutionSubPages(locale);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-[#080B12] pb-20 pt-32">
        <ConstitutionAurora />
        <InkParticles count={180} />

        {/* Watermark */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/constitution/constitution-page-1.jpg"
            alt="" fill className="object-cover object-top opacity-[0.03]" priority sizes="100vw" aria-hidden="true"
            quality={100}
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080B12]/50 via-transparent to-[#080B12]" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#080B12]/60 via-transparent to-[#080B12]/60" />

        <div className="relative z-10 mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
          <p className="mb-6 font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A84C]">
            {isRo ? "Statele Unite ale Americii · Înf. 1787" : "United States of America · Est. 1787"}
          </p>
          <div className="mb-6 h-px w-32 bg-gradient-to-r from-[#C9A84C] to-transparent" />

          <h1 className="mb-6 font-hero leading-none tracking-wide" style={{ fontSize: "clamp(3rem,8vw,7.5rem)" }}>
            <span className="block text-[#F5F0E8]">{isRo ? "CEL MAI LUNG" : "THE LONGEST"}</span>
            <span className="block" style={{ background: "linear-gradient(135deg,#D4AF6A,#E8C878,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {isRo ? "EXPERIMENT ÎN DEMOCRAȚIE" : "EXPERIMENT IN DEMOCRACY"}
            </span>
          </h1>

          <p className="mb-8 max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC] md:text-xl" style={{ fontFamily: "'EB Garamond','Georgia',serif", fontStyle: "italic" }}>
            {isRo
              ? "\"237 de ani de guvernare constituțională neîntreruptă — un record pe care nicio altă națiune de pe Pământ nu îl poate egala.\""
              : "\"250 years of unbroken constitutional government — a record no other nation on Earth comes close to matching.\""}
          </p>

          <p className="mb-12 max-w-lg font-body text-base leading-relaxed text-[#6B6860]">
            {isRo ? "Nu prin șansă. Nu prin geografie. Prin design." : "Not by chance. Not by geography. By design."}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#the-document" className="inline-flex items-center gap-2 rounded-xl border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.08)] px-6 py-3 font-body text-sm font-semibold text-[#C9A84C] backdrop-blur-sm transition-all hover:bg-[rgba(201,168,76,0.15)]">
              {isRo ? "Explorează Documentul" : "Explore the Document"}
            </a>
            <a href="#track-record" className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 py-3 font-body text-sm font-semibold text-[#F5F0E8] backdrop-blur-sm transition-all hover:bg-white/8">
              {isRo ? "59 Alegeri, Zero Coupuri" : "59 Elections, Zero Coups"}
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-8 w-px overflow-hidden rounded-full bg-[rgba(201,168,76,0.2)]">
            <div className="h-4 w-px bg-[#C9A84C] animate-bounce" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.4)] to-transparent" />
      </section>

      {/* ── METRIC WALL ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#080B12] px-4 py-16 sm:px-6 lg:px-8">
        <InkParticles count={80} />
        <div className="relative z-10 mx-auto max-w-screen-xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {metrics.map((m, i) => (
              <MetricCard key={m.id} value={m.value} label={m.label} sublabel={m.sublabel} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIONS ──────────────────────────────────────────────────────── */}
      <div className="relative bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">

          {/* Overview */}
          <Section id="overview" eyebrow={isRo ? "Faza 6 — Constituție și Democrație" : "Phase 6 — Constitution & Democracy"}>
            <h2 className="mb-6 font-display text-h1 text-[#F5F0E8]">
              {isRo ? "Documentul care Conduce Lumea" : "The Document That Runs the World"}
            </h2>
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <p className="font-body text-lg leading-relaxed text-[#B8B4AC]">
                {isRo
                  ? "4.543 de cuvinte. Scrise de 55 de bărbați în 116 zile la Philadelphia, în vara anului 1787. Aceleași cuvinte care autorizau comerțul de-a lungul râului Potomac autorizează astăzi economia de 27 de trilioane de dolari a Americii."
                  : "4,543 words. Written by 55 men in 116 days in Philadelphia, in the summer of 1787. The same words that authorized commerce along the Potomac River in 1787 authorize America's $27 trillion economy today."}
              </p>
              <p className="font-body text-lg leading-relaxed text-[#B8B4AC]">
                {isRo
                  ? "237 de ani de democrație constituțională neîntreruptă. 59 de alegeri prezidențiale. Niciun coup. Nicio suspendare. Niciun monarh. Un record pe care nicio altă națiune de pe Pământ nu îl poate egala."
                  : "237 years of unbroken constitutional democracy. 59 presidential elections. Zero coups. Zero suspensions. Zero monarchs. A record no other nation on Earth comes close to matching."}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/constitution/constitution-page-1.jpg"
                alt="United States Constitution, Page 1 — original parchment, National Archives"
                width={1200} height={500}
                className="h-[320px] w-full object-cover object-top md:h-[420px]"
                placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080B12]/80 via-transparent to-[#080B12]/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-hero text-4xl text-[#C9A84C]">4,543</p>
                <p className="font-body text-sm text-[#F5F0E8]/70">{isRo ? "cuvinte ce guvernează o economie de 27 trilioane $" : "words governing a $27 trillion economy"}</p>
              </div>
              <p className="absolute bottom-6 right-6 font-body text-xs text-[#6B6860]">{isRo ? "Arhivele Naționale · Washington, DC" : "US National Archives · Washington, DC"}</p>
            </div>
          </Section>

          {/* Clause Vault */}
          <Section id="the-document" eyebrow={isRo ? "Documentul Viu" : "The Living Document"}>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Pasaje ce Au Schimbat Lumea" : "Passages That Changed the World"}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo ? "Treci cu cursorul peste orice clauză pentru a-i ilumina moștenirea. Fiecare propoziție este în vigoare chiar acum." : "Hover over any clause to illuminate its legacy. Every sentence is in force right now."}
            </p>
            <ClauseVault clauses={CONSTITUTION_CLAUSES} />
          </Section>

          {/* Founders */}
          <Section id="founders" eyebrow={isRo ? "Arhitecții Libertății" : "Architects of Liberty"}>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Constelația Fondatorilor" : "The Founders' Constellation"}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo ? "55 de delegați. 116 zile. Un singur scop. Dă click pe orice stea pentru a explora viețile și contribuțiile lor." : "55 delegates. 116 days. One purpose. Click any star to explore their lives and contributions."}
            </p>
            <FounderConstellation founders={FOUNDING_FATHERS} />
          </Section>

          {/* Bill of Rights */}
          <Section id="bill-of-rights" eyebrow={isRo ? "Declarația Drepturilor" : "Bill of Rights"}>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Zece Garanții. 233 de Ani." : "Ten Guarantees. 233 Years."}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo ? "Motivul pentru care criticarea acestei pagini este protejată constituțional." : "The reason criticizing this page is constitutionally protected."}
            </p>
            <AmendmentAccordion amendments={BILL_OF_RIGHTS} />
            <div className="mt-6 flex justify-end">
              <Link href="/constitution/bill-of-rights" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {isRo ? "Explorare Completă →" : "Full Explorer →"}
              </Link>
            </div>
          </Section>

          {/* Separation of Powers */}
          <Section id="separation-of-powers" eyebrow={isRo ? "Separarea Puterilor" : "Separation of Powers"}>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "De Ce Tirania Este Aproape Imposibilă" : "Why Tyranny Is Nearly Impossible"}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo ? "Trei ramuri. Fiecare verificând celelalte două. Un triunghi de tensiune permanentă." : "Three branches. Each checking the other two. A triangle of permanent tension."}
            </p>
            <SeparationDiagram examples={POWERS_CHECK_EXAMPLES} />
            <div className="mt-6 flex justify-end">
              <Link href="/constitution/separation-of-powers" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {isRo ? "Analiză Completă →" : "Full Analysis →"}
              </Link>
            </div>
          </Section>

          {/* Federalism */}
          <Section id="federalism" eyebrow={isRo ? "Laboratoare ale Democrației" : "Laboratories of Democracy"}>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "50 de State. 50 de Experimente." : "50 States. 50 Experiments."}
            </h2>
            <p className="mb-8 max-w-2xl font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo ? "Mișcă levierele. Vezi ce state corespund cel mai bine — și ce rezultate reale au produs." : "Move the policy levers. See which states match your settings — and what real-world outcomes they produced."}
            </p>
            <FederalismSimulator states={STATES_POLICY_DATA} />
            <div className="mt-6 flex justify-end">
              <Link href="/constitution/federalism" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {isRo ? "Simulator Complet →" : "Full Simulator →"}
              </Link>
            </div>
          </Section>

          {/* Transfer Timeline */}
          <Section id="track-record" eyebrow={isRo ? "250 de Ani de Dovezi" : "250 Years of Evidence"}>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Fiecare. Singură. Dată." : "Every. Single. Time."}
            </h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: "59",  label: isRo ? "Alegeri Prezidențiale" : "Presidential Elections", sub: "1788–2024" },
                { value: "0",   label: isRo ? "Lovituri de Stat"      : "Coups",                   sub: isRo ? "Zero. Niciodată." : "Zero. Never." },
                { value: "237", label: isRo ? "Ani, Aceeași Constituție" : "Years, Same Constitution", sub: isRo ? "Cel mai lung din istorie" : "Longest in history" },
              ].map(s => (
                <div key={s.label} className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-[#12181F] p-5 text-center">
                  <p className="font-display text-5xl font-semibold text-[#C9A84C]">{s.value}</p>
                  <p className="mt-1 font-body text-sm font-semibold text-[#F5F0E8]">{s.label}</p>
                  <p className="font-body text-xs text-[#6B6860]">{s.sub}</p>
                </div>
              ))}
            </div>
            <TransferTimeline transfers={PRESIDENTIAL_TRANSFERS} />
            <div className="mt-6 flex justify-end">
              <Link href="/constitution/democracy-track-record" className="inline-flex items-center gap-2 font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
                {isRo ? "Cronologie Completă →" : "Full Timeline →"}
              </Link>
            </div>
          </Section>

          {/* Rights at Risk */}
          <Section id="rights-at-risk" eyebrow={isRo ? "Context Global" : "Global Context"}>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
                  {isRo ? "Acestea Nu Sunt Normale" : "These Are Not the Default"}
                </h2>
                <p className="mb-6 font-body text-base leading-relaxed text-[#B8B4AC]">
                  {isRo
                    ? "Drepturile pe care americanii le iau de-a gata nu sunt starea normală a civilizației umane. Ele sunt excepția. Ele au fost construite. Trebuie păstrate."
                    : "The rights Americans take for granted are not the default state of human civilization. They are the exception. They were built. They must be kept."}
                </p>
                <blockquote className="border-l-2 border-[#C9A84C]/60 pl-6" style={{ fontFamily: "'EB Garamond','Georgia',serif" }}>
                  <p className="text-xl italic leading-relaxed text-[#F5F0E8]/85">
                    {isRo
                      ? "\"Constituția nu este un instrument prin care guvernul restrante poporul, ci un instrument prin care poporul restrante guvernul.\""
                      : "\"The Constitution is not an instrument for the government to restrain the people, it is an instrument for the people to restrain the government.\""}
                  </p>
                  <cite className="mt-3 block font-body text-xs not-italic uppercase tracking-[0.15em] text-[#C9A84C]">
                    {isRo ? "— Patrick Henry · 1788" : "— Patrick Henry · 1788"}
                  </cite>
                </blockquote>
              </div>
              <RightsCounter stats={RIGHTS_AT_RISK_STATS} />
            </div>
          </Section>

          {/* Sub-page navigation */}
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
    </>
  );
}
