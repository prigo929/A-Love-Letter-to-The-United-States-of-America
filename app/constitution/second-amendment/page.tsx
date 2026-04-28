// ─── Second Amendment Sub-Page ───────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }      from "@/components/layout/Breadcrumb";
import { QuoteBlock }      from "@/components/sections/QuoteBlock";
import { ConstitutionAurora, InkParticles } from "@/components/constitution/ConstitutionAnimations";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Second Amendment | Constitution | America: The Greatest Nation",
  description:
    "27 words. The most actively litigated constitutional provision post-2022. A deep dive into Heller, Bruen, and the ongoing legal battle over the right to bear arms.",
  alternates: { canonical: "/constitution/second-amendment" },
};

const LANDMARK_CASES_EN = [
  {
    year: 1939,
    name: "United States v. Miller",
    ruling: "The 2nd Amendment protects weapons with 'reasonable relationship to militia service'",
    detail: "The only major 2nd Amendment case before Heller. Lower courts read it to authorize broad gun regulation. The Heller majority later rejected this reading.",
    pro: false,
  },
  {
    year: 2008,
    name: "District of Columbia v. Heller",
    ruling: "The 2nd Amendment protects an individual right to possess firearms in the home for self-defense",
    detail: "5-4 decision written by Scalia. Struck down DC's handgun ban. Established for the first time that the 2nd Amendment protects individual gun ownership — not just collective militia service. Also said some regulations (felon prohibitions, sensitive places) are presumptively lawful.",
    pro: true,
  },
  {
    year: 2010,
    name: "McDonald v. City of Chicago",
    ruling: "The 2nd Amendment applies to state and local governments",
    detail: "5-4. Incorporated the 2nd Amendment through the 14th. Cities like Chicago can no longer ban handguns. Every state must respect the Heller individual right. The federal right became a universal American right.",
    pro: true,
  },
  {
    year: 2016,
    name: "Caetano v. Massachusetts",
    ruling: "Stun guns and other arms not in common use in 1791 may still be protected",
    detail: "Per curiam reversal. The Court rejected a Massachusetts decision that stun guns were not protected because they weren't in common use in 1791. The 2nd Amendment extends to arms that weren't contemplated by the Founders.",
    pro: true,
  },
  {
    year: 2022,
    name: "New York State Rifle & Pistol Assoc. v. Bruen",
    ruling: "Gun regulations must be consistent with historical tradition — not just reasonably related to a legitimate government interest",
    detail: "6-3 written by Thomas. Replaced the two-step 'means-end scrutiny' test used by lower courts with a purely historical test: does the regulation have a historical analogue? Overturned New York's 'proper cause' requirement for concealed carry permits. Has been used to challenge bump stock bans, domestic violence restrictions, marijuana user prohibitions, and dozens of other laws.",
    pro: true,
  },
  {
    year: 2024,
    name: "United States v. Rahimi",
    ruling: "Federal law prohibiting domestic abusers subject to restraining orders from possessing guns is constitutional",
    detail: "8-1. The Court applied Bruen's historical test and found sufficient historical analogs for disarming dangerous individuals. First major limitation on Bruen's reach. Set the framework for how courts evaluate regulations that don't have exact historical matches.",
    pro: false,
  },
];

const LANDMARK_CASES_RO = [
  {
    year: 2008,
    name: "District of Columbia v. Heller",
    ruling: "Al 2-lea Amendament protejează dreptul individual de a deține arme de foc acasă pentru autoapărare",
    detail: "Decizie 5-4. A stabilit pentru prima dată că al 2-lea Amendament protejează proprietatea individuală de arme — nu doar serviciul colectiv în miliție. A anulat interdicția armelor de mână în DC.",
    pro: true,
  },
  {
    year: 2010,
    name: "McDonald v. City of Chicago",
    ruling: "Al 2-lea Amendament se aplică și guvernelor statale și locale",
    detail: "5-4. A incorporat al 2-lea Amendament prin al 14-lea. Orașele precum Chicago nu mai pot interzice armele de mână. Dreptul individual a devenit un drept american universal.",
    pro: true,
  },
  {
    year: 2022,
    name: "New York State Rifle & Pistol Assoc. v. Bruen",
    ruling: "Reglementările privind armele trebuie să fie conforme cu tradiția istorică",
    detail: "6-3. A înlocuit testul de scrutinizare cu un test pur istoric: reglementarea are un analog istoric? A anulat cerința New York-ului de 'cauză justă' pentru permisele de port-concealed. A fost folosit pentru a contesta zeci de legi.",
    pro: true,
  },
  {
    year: 2024,
    name: "United States v. Rahimi",
    ruling: "Legea federală care interzice agresorilor domestici supuși ordinelor de restricție să dețină arme este constituțională",
    detail: "8-1. Prima limitare majoră a amplorii Bruen. A stabilit cadrul pentru evaluarea reglementărilor fără corespondențe istorice exacte.",
    pro: false,
  },
];

export default async function SecondAmendmentPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const cases  = isRo ? LANDMARK_CASES_RO : LANDMARK_CASES_EN;

  return (
    <>
      <div className="relative overflow-hidden bg-[#080B12] pt-28 pb-16">
        <ConstitutionAurora />
        <InkParticles count={60} />
        <Image
          src="/images/us-buildings/us-supreme-court-building.jpg"
          alt="US Supreme Court building — where the Second Amendment's meaning is decided"
          fill className="object-cover opacity-15" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/70 to-[#080B12]" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Constituție" : "Constitution", href: "/constitution" },
              { label: isRo ? "Al Doilea Amendament" : "Second Amendment" },
            ]}
            className="mb-8"
          />
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            {isRo ? "Amendamentul II" : "Amendment II"}
          </p>
          <h1 className="mb-6 font-hero leading-none" style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>
            <span className="block text-[#F5F0E8]">{isRo ? "27 DE CUVINTE." : "27 WORDS."}</span>
            <span className="block" style={{
              background: "linear-gradient(135deg,#D4AF6A,#E8C878,#C9A84C)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {isRo ? "CEL MAI CONTESTAT AMENDAMENT." : "THE MOST CONTESTED AMENDMENT."}
            </span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC]">
            {isRo
              ? "Cel mai activ litigat amendament după 2022. Bruen a schimbat regulile. Zeci de legi sunt acum contestate. Doctrine juridică se reconstruiește în timp real."
              : "The most actively litigated amendment post-2022. Bruen changed the rules. Dozens of laws are now challenged. Legal doctrine is being rebuilt in real time."}
          </p>
        </div>
      </div>

      <div className="bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Original text */}
          <section>
            <div
              className="relative overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] p-8 md:p-10"
              style={{ background: "linear-gradient(168deg, #F9F3E3 0%, #F4EDD8 30%, #EDE4C8 65%, #E8DDB8 100%)" }}
            >
              <p className="mb-4 text-center font-body text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#8B6A2A" }}>
                {isRo ? "Textul Original — Amendamentul II, Ratificat 15 Decembrie 1791" : "Original Text — Amendment II, Ratified December 15, 1791"}
              </p>
              <blockquote className="text-center" style={{
                fontFamily: "'EB Garamond','Georgia',serif",
                fontSize: "clamp(16px,2.5vw,22px)",
                fontStyle: "italic", lineHeight: "1.8", color: "#2C2416",
              }}>
                &ldquo;A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.&rdquo;
              </blockquote>
            </div>
          </section>

          {/* The core debate */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Dezbaterea Fundamentală" : "The Core Debate"}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#12181F] p-6">
                <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
                  {isRo ? "Drept Individual" : "Individual Right View"}
                </p>
                <p className="mb-4 font-body text-sm leading-relaxed text-[#B8B4AC]">
                  {isRo
                    ? "Clauza 'dreptul poporului de a deține și purta arme' este clar un drept individual — la fel ca 'dreptul poporului' în primul și al patrulea amendament. Fundalul miliționar descrie o motivație, nu o limitare. Fondatorii credeau că cetățenii înarmați sunt garanția finală împotriva tiraniei."
                    : "The phrase 'the right of the people to keep and bear Arms' is clearly an individual right — just as 'the right of the people' in the First and Fourth Amendments. The militia preamble describes a motivation, not a limitation. The Founders believed armed citizens are the ultimate check on tyranny."}
                </p>
                <p className="font-body text-xs text-[#6B6860]">
                  {isRo ? "Majoritar în: Heller (2008), McDonald (2010), Bruen (2022)" : "Majority in: Heller (2008), McDonald (2010), Bruen (2022)"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-[#12181F] p-6">
                <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6860]">
                  {isRo ? "Drept Colectiv / Context de Milițle" : "Collective / Militia-Linked View"}
                </p>
                <p className="mb-4 font-body text-sm leading-relaxed text-[#B8B4AC]">
                  {isRo
                    ? "Clauza prefatoare — 'o milițle bine reglementată, fiind necesară securității unui stat liber' — condiționează dreptul. Amendamentul protejează dreptul de a purta arme în contextul serviciului milițiar, nu proprietatea individuală de arme pentru autoapărare personală."
                    : "The prefatory clause — 'A well regulated Militia, being necessary to the security of a free State' — conditions the right. The amendment protects the right to bear arms in connection with militia service, not individual ownership for personal self-defense."}
                </p>
                <p className="font-body text-xs text-[#6B6860]">
                  {isRo ? "Minoritar în: Heller, McDonald, Bruen (Stevens dissent)" : "Dissent in: Heller, McDonald, Bruen (Stevens dissent)"}
                </p>
              </div>
            </div>
          </section>

          {/* Landmark cases */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Cazuri Definitorii" : "Landmark Cases"}
            </h2>
            <div className="space-y-3">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl border bg-[#12181F] ${c.pro ? "border-[rgba(201,168,76,0.15)]" : "border-white/8"}`}
                >
                  <div className="flex gap-4 p-5">
                    <div className={`shrink-0 rounded-xl border px-3 py-2 text-center min-w-[64px] ${c.pro ? "border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)]" : "border-white/10 bg-white/3"}`}>
                      <p className={`font-display text-lg font-semibold ${c.pro ? "text-[#C9A84C]" : "text-[#6B6860]"}`}>{c.year}</p>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 font-body text-sm font-bold text-[#F5F0E8]">{c.name}</p>
                      <p className={`mb-2 font-body text-xs italic ${c.pro ? "text-[#C9A84C]" : "text-[#B8B4AC]"}`}>{c.ruling}</p>
                      <p className="font-body text-xs leading-relaxed text-[#B8B4AC]">{c.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Post-Bruen landscape */}
          <section className="rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#12181F] p-6 md:p-8">
            <h2 className="mb-4 font-display text-2xl font-semibold text-[#F5F0E8]">
              {isRo ? "Peisajul Post-Bruen (2022–prezent)" : "The Post-Bruen Landscape (2022–present)"}
            </h2>
            <p className="mb-6 font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "Bruen a declanșat un val de litigii. Legi care funcționau de decenii au fost contestate brusc. Iată ce se află în joc:"
                : "Bruen triggered a wave of litigation. Laws that had operated for decades were suddenly challenged. Here is what is being contested:"}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                isRo ? "Interdicții privind armele pentru consumatorii de droguri" : "Gun bans for drug users",
                isRo ? "Restricții privind dispozitivele bump stock" : "Bump stock restrictions",
                isRo ? "Interdicții pentru persoanele cu ordin de restricție" : "Bans for domestic abusers with restraining orders",
                isRo ? "Legi privind armele fantomă (arme fără număr de serie)" : "Ghost gun regulations (unserialized firearms)",
                isRo ? "Restricții privind magazinele de mare capacitate" : "Large-capacity magazine restrictions",
                isRo ? "Cerințe de depozitare sigură" : "Safe storage requirements",
                isRo ? "Legi privind vârsta minimă pentru achiziția de arme" : "Minimum age laws for firearm purchases",
                isRo ? "Interdicții de transport în locuri sensibile" : "Sensitive places carry prohibitions",
              ].map((item, i) => (
                <div key={i} className="flex gap-2 rounded-xl border border-white/6 bg-white/3 px-4 py-3">
                  <span className="text-[#C9A84C] shrink-0">→</span>
                  <p className="font-body text-sm text-[#B8B4AC]">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 font-body text-xs text-[#6B6860]">
              {isRo
                ? "Doctrina juridică este în flux maxim. Circuitele federale produc hotărâri contradictorii. Curtea Supremă va trebui să intervină din nou."
                : "Legal doctrine is in maximum flux. Federal circuits are producing contradictory rulings. The Supreme Court will need to intervene again."}
            </p>
          </section>

          <QuoteBlock
            quote={isRo
              ? "\"Un drept garantat de Constituție nu poate fi supus votului majoritar. Dacă Constituția îl garantează, există — indiferent de cât de nepopular este pentru o majoritate.\""
              : "\"A right guaranteed by the Constitution cannot be submitted to a vote. If the Constitution guarantees it, it exists — regardless of how unpopular it may be to a majority.\""}
            attribution={isRo ? "Judecătorul Antonin Scalia" : "Justice Antonin Scalia"}
            title={isRo ? "District of Columbia v. Heller, 2008" : "District of Columbia v. Heller, 2008"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/8 pt-8">
            <Link href="/constitution/first-amendment" className="font-body text-sm text-[#6B6860] hover:text-[#F5F0E8] transition-colors">
              ← {isRo ? "Primul Amendament" : "First Amendment"}
            </Link>
            <Link href="/constitution/unique-features" className="font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">
              {isRo ? "Caracteristici Unice →" : "Unique Features →"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
