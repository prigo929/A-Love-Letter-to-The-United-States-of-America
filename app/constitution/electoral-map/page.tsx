// ─── Electoral Archive Map Sub-Page ─────────────────────────────────────────
// Interactive historical map of United States elections.
// Museum-grade, Bloomberg-terminal aesthetic. Four constitutional views:
// President, Senate, House, Governor.
//
// For Beginners: This page renders an interactive map of the US where you can
// scrub through election years and see how each state voted across four
// different perspectives. The map uses react-simple-maps for geography
// and framer-motion for fluid transitions.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { ConstitutionAurora, InkParticles } from "@/components/constitution/ConstitutionAnimations";
import { ElectoralMap } from "@/components/electoral-map/ElectoralMap";
import { getServerLocale } from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Electoral Archive Map | Constitution | America: The Greatest Nation",
  description:
    "An interactive historical archive of United States elections — explore presidential, senate, house, and gubernatorial results across every election year on a museum-grade interactive map.",
};

export default async function ElectoralMapPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#080B12] pt-28 pb-16">
        <ConstitutionAurora />
        <InkParticles count={50} />
        <Image
          src="/images/us-buildings/us-capitol-building.jpg"
          alt="US Capitol building at dusk"
          fill
          className="object-cover opacity-15"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/60 to-[#080B12]" />

        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Constituție" : "Constitution", href: "/constitution" },
              { label: isRo ? "Arhiva Electorală" : "Electoral Archive Map" },
            ]}
            className="mb-8"
          />

          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            {isRo ? "Arhiva Electorală" : "Electoral Archive"}
          </p>

          <h1
            className="mb-6 font-hero leading-none"
            style={{ fontSize: "clamp(3rem,7vw,6rem)" }}
          >
            <span className="block text-[#F5F0E8]">
              {isRo ? "HARTA" : "THE MAP OF"}
            </span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg,#D4AF6A,#E8C878,#C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {isRo ? "DEMOCRAȚIEI AMERICANE" : "AMERICAN DEMOCRACY"}
            </span>
          </h1>

          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC]">
            {isRo
              ? "Un arhiv interactiv complet al alegerilor din Statele Unite — de la colegiul electoral la reprezentanți individuali. Patru perspective constituționale, o singură hartă."
              : "A complete interactive archive of United States elections — from the Electoral College to individual representatives. Four constitutional perspectives, one map."}
          </p>

          {/* Quick stat pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: isRo ? "Alegeri Acoperite" : "Elections Covered", value: "6" },
              { label: isRo ? "Perspective" : "Perspectives", value: "4" },
              { label: isRo ? "State" : "States", value: "50" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-sm border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.05)] px-4 py-2"
              >
                <span className="mr-2 font-display text-lg font-bold text-[#C9A84C]">
                  {stat.value}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.15em] text-[#8A8780]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div className="bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
          {/* The Interactive Map */}
          <section>
            <ElectoralMap isRo={isRo} />
          </section>

          {/* How to Read This Map */}
          <section className="rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#12181F] p-6 md:p-8">
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Cum Să Citești Harta" : "How to Read This Map"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: isRo ? "Perspectiva Prezidențială" : "Presidential View",
                  desc: isRo
                    ? "Fiecare stat primește culoarea solidă a partidului care a câștigat voturile electorale. Statul care a schimbat partidul de la ciclul anterior primește o hașură diagonală."
                    : "Each state receives the solid color of the party that won its electoral votes. States that flipped party from the previous cycle receive a diagonal hatch overlay.",
                  icon: "🏛️",
                },
                {
                  title: isRo ? "Perspectiva Senatului" : "Senate View",
                  desc: isRo
                    ? "Dacă ambii senatori sunt de la același partid, statul primește o culoare solidă. Dacă delegația este împărțită, un gradient de 50/50 taie statul în jumătate."
                    : "If both senators belong to the same party, the state gets a solid fill. If the delegation is divided, a 50/50 hard-stop gradient slices the state in half.",
                  icon: "⚖️",
                },
                {
                  title: isRo ? "Perspectiva Camerei" : "House View",
                  desc: isRo
                    ? "Granițele statelor dispar. În locul lor, puncte individuale egale cu numărul de reprezentanți ai fiecărui stat apar — colorate proporțional pentru a arăta echilibrul partizan."
                    : "State borders dissolve. In their place, individual dots equal to each state's representative count appear — colored proportionally to show the partisan balance.",
                  icon: "📊",
                },
                {
                  title: isRo ? "Perspectiva Guvernatorului" : "Governor View",
                  desc: isRo
                    ? "Cea mai simplă perspectivă: o culoare solidă, fără hașură, arătând partidul politic al guvernatorului în funcție."
                    : "The simplest view: a pure solid fill with no hatch, showing the political party of the sitting governor.",
                  icon: "🦅",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3"
                >
                  <span className="mt-0.5 shrink-0 text-xl">{item.icon}</span>
                  <div>
                    <p className="mb-1 font-body text-sm font-semibold text-[#F5F0E8]">
                      {item.title}
                    </p>
                    <p className="font-body text-xs leading-relaxed text-[#8A8780]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* The Four Pillars of American Elections */}
          <section>
            <h2 className="mb-3 font-display text-h2 text-[#F5F0E8]">
              {isRo
                ? "Cele Patru Piloni ai Alegerilor Americane"
                : "The Four Pillars of American Elections"}
            </h2>
            <p className="mb-6 max-w-3xl font-body text-base text-[#B8B4AC]">
              {isRo
                ? "Sistemul electoral american nu alege un singur lider. El distribuie puterea pe patru straturi suprapuse — fiecare cu propriile reguli, propriul calendar și propria logică."
                : "The American electoral system does not choose a single leader. It distributes power across four overlapping layers — each with its own rules, its own calendar, and its own logic."}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  pillar: isRo ? "Președinte" : "President",
                  mechanism: isRo ? "Colegiul Electoral" : "Electoral College",
                  frequency: isRo ? "La fiecare 4 ani" : "Every 4 years",
                  seats: isRo ? "538 voturi electorale" : "538 electoral votes",
                  desc: isRo
                    ? "Nu un vot popular direct. Fiecare stat primește un număr de electori egal cu reprezentanții + senatorii săi. Câștigătorul ia totul (cu excepția Maine și Nebraska)."
                    : "Not a direct popular vote. Each state gets electors equal to its representatives + senators. Winner-take-all (except Maine and Nebraska).",
                },
                {
                  pillar: isRo ? "Senat" : "Senate",
                  mechanism: isRo ? "Reprezentare Egală" : "Equal Representation",
                  frequency: isRo ? "1/3 la fiecare 2 ani" : "1/3 every 2 years",
                  seats: isRo ? "100 locuri (2 pe stat)" : "100 seats (2 per state)",
                  desc: isRo
                    ? "Fiecare stat — indiferent de populație — primește exact doi senatori. California (40M oameni) și Wyoming (580K oameni) au aceeași putere de vot."
                    : "Every state — regardless of population — gets exactly two senators. California (40M people) and Wyoming (580K people) carry the same voting power.",
                },
                {
                  pillar: isRo ? "Camera Reprezentanților" : "House of Representatives",
                  mechanism: isRo ? "Reprezentare Proporțională" : "Proportional Representation",
                  frequency: isRo ? "La fiecare 2 ani" : "Every 2 years",
                  seats: isRo ? "435 locuri (pe bază de populație)" : "435 seats (population-based)",
                  desc: isRo
                    ? "Distribuite în funcție de recensământ. Fiecare district — nu fiecare stat — alege un singur reprezentant. De aceea am folosit puncte, nu poligoane."
                    : "Apportioned by census. Each district — not each state — elects one representative. That is why we use dots, not polygons.",
                },
                {
                  pillar: isRo ? "Guvernator" : "Governor",
                  mechanism: isRo ? "Vot Popular Direct" : "Direct Popular Vote",
                  frequency: isRo ? "Variabil (majoritatea la 4 ani)" : "Varies (most every 4 years)",
                  seats: isRo ? "50 locuri (1 pe stat)" : "50 seats (1 per state)",
                  desc: isRo
                    ? "Cel mai simplu concurs: un vot direct pe stat. Niciun colegiu, niciun district, nicio proporționalitate — cel care ia cele mai multe voturi câștigă."
                    : "The simplest contest: one direct vote per state. No college, no districts, no proportionality — whoever gets the most votes wins.",
                },
              ].map((item) => (
                <div
                  key={item.pillar}
                  className="rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#12181F] p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-display text-lg font-bold text-[#C9A84C]">
                      {item.pillar}
                    </p>
                    <span className="rounded-sm bg-[rgba(201,168,76,0.08)] px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.15em] text-[#8A8780]">
                      {item.mechanism}
                    </span>
                  </div>
                  <div className="mb-3 flex gap-4">
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#6B6860]">
                        {isRo ? "Frecvență" : "Frequency"}
                      </p>
                      <p
                        className="font-body text-sm font-semibold text-[#F5F0E8]"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {item.frequency}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.15em] text-[#6B6860]">
                        {isRo ? "Locuri" : "Seats"}
                      </p>
                      <p
                        className="font-body text-sm font-semibold text-[#F5F0E8]"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {item.seats}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-xs leading-relaxed text-[#8A8780]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quote */}
          <QuoteBlock
            quote={
              isRo
                ? "\"Alegerile aparțin poporului. Este decizia lor. Dacă decid să-și întoarcă spatele focului și să-și ardă fundul, vor trebui să stea pe bășici.\""
                : "\"Elections belong to the people. It's their decision. If they decide to turn their back on the fire and burn their behinds, then they will just have to sit on their blisters.\""
            }
            attribution="Abraham Lincoln"
            title={
              isRo ? "Al 16-lea Președinte al Statelor Unite" : "16th President of the United States"
            }
            variant="dark"
          />

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-white/8 pt-8">
            <Link
              href="/constitution"
              className="font-body text-sm text-[#6B6860] transition-colors hover:text-[#F5F0E8]"
            >
              ← {isRo ? "Constituție" : "Constitution"}
            </Link>
            <Link
              href="/constitution/separation-of-powers"
              className="font-body text-sm font-semibold text-[#C9A84C] transition-colors hover:text-[#E8C878]"
            >
              {isRo ? "Separarea Puterilor →" : "Separation of Powers →"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
