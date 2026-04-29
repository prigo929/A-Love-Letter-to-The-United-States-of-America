// ─── Bill of Rights Sub-Page ─────────────────────────────────────────────────
// Full interactive amendment explorer with accordion cards, original parchment
// image, and global comparison data.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb }       from "@/components/layout/Breadcrumb";
import { QuoteBlock }       from "@/components/sections/QuoteBlock";
import { ConstitutionAurora, InkParticles, AmendmentAccordion } from "@/components/constitution/ConstitutionAnimations";
import { getServerLocale }  from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { BILL_OF_RIGHTS }   from "@/lib/data/constitution-data";

export const metadata: Metadata = {
  title: "Bill of Rights | Constitution | America: The Greatest Nation",
  description:
    "The first ten amendments to the US Constitution — ratified 1791. Free speech, the right to bear arms, due process, and seven other foundational protections.",
  alternates: { canonical: "/constitution/bill-of-rights" },
};

const BILL_FACTS_EN = [
  {
    id: "br-proposal",
    fact: "Madison drafted 12 amendments — Congress sent 10 to the states",
    detail: "Two were not ratified in 1791. One of them — on congressional pay raises — was finally ratified in 1992 as the 27th Amendment, 203 years after Madison proposed it.",
    source: "National Archives / Constitutional Amendments",
    color: "gold" as const,
  },
  {
    id: "br-ratification",
    fact: "Virginia's ratification on December 15, 1791 made the Bill of Rights law",
    detail: "Virginia was the 11th of 14 states to ratify — the 3/4 threshold. The date is now celebrated as Bill of Rights Day. Virginia was also the state that had most insisted on a bill of rights as a condition of ratification.",
    source: "National Archives",
    color: "red" as const,
  },
  {
    id: "br-incorporation",
    fact: "Originally only applied to the federal government — states added later",
    detail: "For most of US history, states could restrict rights the federal government could not. The 14th Amendment (1868) and a series of 20th-century Supreme Court decisions 'incorporated' the Bill of Rights against state governments one amendment at a time.",
    source: "McDonald v. Chicago (2010) / Gitlow v. New York (1925)",
    color: "blue" as const,
  },
  {
    id: "br-27th",
    fact: "The 27th Amendment was proposed in 1789 and ratified in 1992 — 203 years later",
    detail: "No congressional pay raise can take effect until after an intervening election. A University of Texas undergraduate student rediscovered the unratified amendment in 1982, began a campaign to ratify it, and succeeded in 1992 after Michigan became the 38th state to ratify.",
    source: "Congressional Research Service",
    color: "gold" as const,
  },
];

const BILL_FACTS_RO = [
  {
    id: "br-proposal",
    fact: "Madison a propus 12 amendamente — Congresul a trimis 10 statelor",
    detail: "Două nu au fost ratificate în 1791. Unul dintre ele — privind majorările de salarii ale congresmenilor — a fost ratificat în cele din urmă în 1992 ca al 27-lea Amendament, la 203 ani după ce Madison l-a propus.",
    source: "National Archives / Constitutional Amendments",
    color: "gold" as const,
  },
  {
    id: "br-ratification",
    fact: "Ratificarea Virginiei pe 15 decembrie 1791 a dat forță legală Declarației Drepturilor",
    detail: "Virginia a fost al 11-lea din 14 state care au ratificat — pragul de 3/4. Data este acum sărbătorită ca Ziua Declarației Drepturilor. Virginia a fost și statul care insistase cel mai mult pentru o declarație a drepturilor ca o condiție de ratificare.",
    source: "National Archives",
    color: "red" as const,
  },
  {
    id: "br-incorporation",
    fact: "Inițial se aplica doar guvernului federal — statele au fost incluse mai târziu",
    detail: "Pentru cea mai mare parte a istoriei SUA, statele puteau restricționa drepturi pe care guvernul federal nu le putea restricționa. Al 14-lea Amendament (1868) și o serie de hotărâri ale Curții Supreme din secolul XX au 'incorporat' Declarația Drepturilor față de guvernele statale, un amendament pe rând.",
    source: "McDonald v. Chicago (2010) / Gitlow v. New York (1925)",
    color: "blue" as const,
  },
  {
    id: "br-27th",
    fact: "Al 27-lea Amendament a fost propus în 1789 și ratificat în 1992 — 203 ani mai târziu",
    detail: "Nicio majorare de salariu congresional nu poate intra în vigoare înainte de o alegere intermediară. Un student de la Universitatea din Texas a redescoperit amendamentul neratificat în 1982 și a declanșat o campanie de ratificare, reușind în 1992.",
    source: "Congressional Research Service",
    color: "gold" as const,
  },
];

export default async function BillOfRightsPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = isRo ? BILL_FACTS_RO : BILL_FACTS_EN;

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#080B12] pt-28 pb-16">
        <ConstitutionAurora />
        <InkParticles count={60} />

        {/* Bill of Rights parchment */}
        <Image
          src="/images/constitution/bill-of-rights-page-1.jpg"
          alt="The Bill of Rights — original engrossed parchment, National Archives"
          fill
          priority
          className="object-cover object-top opacity-10"
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/70 via-[#080B12]/40 to-[#080B12]" />

        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Constituție" : "Constitution", href: "/constitution" },
              { label: isRo ? "Declarația Drepturilor" : "Bill of Rights" },
            ]}
            className="mb-8"
          />

          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            {isRo ? "Declarația Drepturilor" : "Bill of Rights"}
          </p>

          <h1
            className="mb-6 font-hero leading-none tracking-wide text-[#F5F0E8]"
            style={{ fontSize: "clamp(3rem,7vw,6rem)" }}
          >
            {isRo ? "ZECE GARANȚII." : "TEN GUARANTEES."}<br />
            <span style={{
              background: "linear-gradient(135deg, #D4AF6A, #E8C878, #C9A84C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {isRo ? "235 DE ANI." : "235 YEARS."}
            </span>
          </h1>

          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC]">
            {isRo
              ? "Madison a redactat 12 amendamente. Congresul a trimis 10 statelor. 10 au fost ratificate pe 15 decembrie 1791. Ele sunt motivul pentru care criticarea acestei pagini este protejată constituțional."
              : "Madison drafted 12. Congress sent 10. Ten were ratified on December 15, 1791. They are the reason criticizing this page is constitutionally protected."}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Parchment image feature */}
          <section>
            <div className="overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.15)]">
              <Image
                src="/images/constitution/bill-of-rights-page-1.jpg"
                alt="The Bill of Rights — complete original parchment, National Archives, Washington DC"
                width={1200}
                height={600}
                className="h-[300px] w-full object-cover object-top md:h-[420px]"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                quality={100}
              />
            </div>
            <p className="mt-2 text-right font-body text-xs text-[#6B6860]">
              {isRo
                ? "Declarația Drepturilor originală — Arhivele Naționale ale SUA, Washington DC"
                : "Original Bill of Rights parchment — National Archives, Washington DC"}
            </p>
          </section>

          {/* Context */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "De ce a existat nevoie de ea" : "Why It Was Needed"}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <p className="font-body text-lg leading-relaxed text-[#B8B4AC]">
                {isRo
                  ? "Constituția originală fusese ratificată fără o declarație a drepturilor — o omisiune deliberată. Hamilton a argumentat în Federalistul Nr. 84 că o declarație a drepturilor ar fi inutilă și chiar periculoasă: dacă enumerezi drepturi, s-ar putea să implici că guvernul are puterea de a restricționa drepturile neenumerate."
                  : "The original Constitution was ratified without a bill of rights — a deliberate omission. Hamilton argued in Federalist No. 84 that a bill of rights would be unnecessary and even dangerous: if you enumerate rights, you might imply the government has power to restrict unenumerated ones."}
              </p>
              <p className="font-body text-lg leading-relaxed text-[#B8B4AC]">
                {isRo
                  ? "Anti-federaliștii au câștigat argumentul. State precum Virginia și New York au ratificat Constituția cu condiția înțeleasă că amendamentele privind drepturile vor urma. Madison, inițial sceptic, a redactat ceea ce a devenit Declarația Drepturilor în primul Congres. Cel de-al Nouălea Amendament a răspuns direct preocupării lui Hamilton."
                  : "The Anti-Federalists won the argument. States like Virginia and New York ratified with the understood condition that rights amendments would follow. Madison, initially skeptical, drafted what became the Bill of Rights in the first Congress. The Ninth Amendment directly answered Hamilton's concern."}
              </p>
            </div>
          </section>

          {/* Amendment accordion */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Toate Cele Zece" : "All Ten"}
            </h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">
              {isRo
                ? "Dă click pe orice amendament pentru a-i vedea textul original, ce înseamnă astăzi și comparații globale."
                : "Click any amendment to see its original text, what it means today, and how it compares globally."}
            </p>
            <AmendmentAccordion amendments={BILL_OF_RIGHTS} />
          </section>

          {/* Facts grid */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Fapte Puțin Cunoscute" : "Little-Known Facts"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div
                  key={fact.id}
                  className="rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#12181F] p-5"
                >
                  <p className="mb-2 font-body text-sm font-semibold leading-snug text-[#F5F0E8]">{fact.fact}</p>
                  <p className="mb-3 font-body text-xs leading-relaxed text-[#B8B4AC]">{fact.detail}</p>
                  <p className="font-body text-[10px] text-[#6B6860]">{isRo ? "Sursă:" : "Source:"} {fact.source}</p>
                </div>
              ))}
            </div>
          </section>

          <QuoteBlock
            quote={isRo
              ? "\"Declarația Drepturilor nu vine de la grația guvernanților. Vine din sufletele oamenilor care refuză să fie guvernați fără consimțământ.\""
              : "\"The Bill of Rights does not come from the grace of the governors. It comes from the souls of the people who refuse to be governed without consent.\""}
            attribution="James Madison"
            title={isRo ? "Părintele Constituției · Al 4-lea Președinte" : "Father of the Constitution · 4th President of the United States"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/8 pt-8">
            <Link href="/constitution" className="font-body text-sm text-[#6B6860] hover:text-[#F5F0E8] transition-colors">
              ← {isRo ? "Constituție" : "Constitution"}
            </Link>
            <Link href="/constitution/first-amendment" className="font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
              {isRo ? "Primul Amendament →" : "First Amendment →"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
