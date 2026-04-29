// ─── Democracy Track Record Sub-Page ─────────────────────────────────────────
// This page explores the history of presidential elections and power transfers.
// It visualizes the "Stability" of the American system over 230+ years.
//
// For Beginners: This page uses the "TransferTimeline" component to show
// how power has moved peacefully from one leader to the next.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb }       from "@/components/layout/Breadcrumb";
import { QuoteBlock }       from "@/components/sections/QuoteBlock";
import { ConstitutionAurora, InkParticles, TransferTimeline } from "@/components/constitution/ConstitutionAnimations";
import { getServerLocale }  from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { PRESIDENTIAL_TRANSFERS } from "@/lib/data/constitution-data";

export const metadata: Metadata = {
  title: "250-Year Track Record | Constitution | America: The Greatest Nation",
  description:
    "59 presidential elections. Zero coups. Zero suspensions. The unbroken 237-year record of American constitutional democracy — the longest in recorded history.",
  alternates: { canonical: "/constitution/democracy-track-record" },
};

const CONSTITUTION_AGES = [
  { country: "United States",   years: 237, note: "Same framework since 1789" },
  { country: "Australia",       years: 123, note: "Federation since 1901" },
  { country: "Norway",          years: 210, note: "1814 — but has been revised extensively" },
  { country: "Canada",          years: 157, note: "British North America Act 1867" },
  { country: "Switzerland",     years: 131, note: "Federal Constitution 1893 (revised 1999)" },
  { country: "Germany",         years: 75,  note: "Basic Law 1949 — replaced failed Weimar" },
  { country: "Japan",           years: 77,  note: "Post-WWII constitution, 1947" },
  { country: "Italy",           years: 76,  note: "Republic constitution 1948" },
  { country: "France",          years: 66,  note: "5th Republic — France's FIFTH constitution" },
  { country: "Spain",           years: 46,  note: "Post-Franco constitution 1978" },
  { country: "Russia",          years: 31,  note: "Post-Soviet constitution 1993" },
  { country: "China",           years: 45,  note: "Current version since 1982 (4th version)" },
];

const TESTS_EN = [
  { year: "1800", title: "First Partisan Transfer", detail: "Adams to Jefferson — opposing parties. The world expected it to fail. It didn't. The constitutional machinery held without a single soldier deployed." },
  { year: "1861", title: "The Civil War Began — The Election Didn't Stop", detail: "Seven states had seceded before Lincoln was inaugurated. The transfer still happened on schedule. Lincoln still took the oath. That oath bound him even as the union was literally fracturing." },
  { year: "1877", title: "The Most Disputed Election Before 2000", detail: "Hayes-Tilden required a bipartisan Electoral Commission to resolve disputed electors from three states. The commission ruled, both parties accepted, Hayes was inaugurated three days before the deadline." },
  { year: "1933", title: "The Great Depression — No Emergency Dictatorship", detail: "25% unemployment. Banks collapsing. Mussolini and Hitler rising in Europe. FDR was genuinely offered dictatorial powers by some advisors. He refused. He worked through Congress instead. The republic held." },
  { year: "1974", title: "Nixon Resigned — He Didn't Need To Be Removed By Force", detail: "The constitutional process — impeachment proceedings — was sufficient. Nixon resigned before a vote. Ford was sworn in peacefully. 'Our long national nightmare is over.' No troops moved. No courts were suspended." },
  { year: "2001", title: "9/11 — Emergency Powers Without Emergency Suspension", detail: "The deadliest attack on American soil since Pearl Harbor. Extraordinary emergency powers were invoked. But the Constitution was not suspended. Courts continued to function. Elections continued on schedule. The framework held." },
  { year: "2021", title: "January 6th — The Most Recent Test", detail: "A mob breached the Capitol while Congress was certifying electoral votes. For hours, the transfer was in genuine jeopardy. Congress reconvened at midnight. Certification was completed. Biden was inaugurated on January 20th. For the 59th consecutive time, the constitutional process held." },
];

const TESTS_RO = [
  { year: "1800", title: "Primul Transfer Partizan", detail: "Adams la Jefferson — partide opuse. Lumea se aștepta să eșueze. Nu a eșuat. Mecanismul constituțional a funcționat fără un singur soldat desfășurat." },
  { year: "1861", title: "Războiul Civil a Început — Alegerile Nu s-au Oprit", detail: "Șapte state se separaseră înainte ca Lincoln să fie investit. Transferul a avut loc totuși conform programului. Lincoln a depus jurământul. Acel jurământ l-a legat chiar în timp ce uniunea se fragmenta." },
  { year: "1877", title: "Cea Mai Disputată Alegere Înainte de 2000", detail: "Hayes-Tilden a necesitat o Comisie Electorală bipartizană pentru a rezolva alegătorii contestați din trei state. Comisia a decis, ambele partide au acceptat, Hayes a depus jurământul cu trei zile înainte de termen." },
  { year: "1933", title: "Marea Depresie — Nicio Dictatură de Urgență", detail: "25% șomaj. Bănci în colaps. Mussolini și Hitler în ascensiune în Europa. FDR a refuzat puterile dictatoriale care i-au fost oferite. A lucrat prin Congres. Republica a rezistat." },
  { year: "1974", title: "Nixon a Demisionat — Nu a Trebuit Îndepărtat cu Forța", detail: "Procesul constituțional — procedurile de demitere — a fost suficient. Nixon a demisionat înainte de vot. Ford a depus jurământul pașnic. Nicio trupă nu s-a mișcat. Nicio curte nu a fost suspendată." },
  { year: "2001", title: "11 Septembrie — Puteri de Urgență Fără Suspendarea Constituției", detail: "Cel mai mortal atac pe pământ american de la Pearl Harbor. Au fost invocate puteri de urgență extraordinare. Dar Constituția nu a fost suspendată. Instanțele au continuat să funcționeze. Alegerile s-au desfășurat conform programului." },
  { year: "2021", title: "6 Ianuarie — Cel Mai Recent Test", detail: "O mulțime a spart Capitoliul în timp ce Congresul certifica voturile electorale. Congresul s-a reunit la miezul nopții. Certificarea a fost finalizată. Biden a depus jurământul pe 20 ianuarie. Pentru a 59-a oară consecutivă, procesul constituțional a rezistat." },
];

export default async function DemocracyTrackRecordPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const tests  = isRo ? TESTS_RO : TESTS_EN;
  const crisisCount = PRESIDENTIAL_TRANSFERS.filter(t => t.crisis).length;

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#080B12] pt-28 pb-16">
        <ConstitutionAurora />
        <InkParticles count={60} />
        <Image
          src="/images/constitution/us-capitol-presidential-inauguration.jpg"
          alt="Presidential inauguration at the United States Capitol — symbol of peaceful transfer of power"
          fill className="object-cover opacity-20" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/70 to-[#080B12]" />

        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Constituție" : "Constitution", href: "/constitution" },
              { label: isRo ? "250 de Ani" : "250-Year Record" },
            ]}
            className="mb-8"
          />
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            {isRo ? "Recordul de 250 de Ani" : "The 250-Year Track Record"}
          </p>
          <h1 className="mb-6 font-hero leading-none tracking-wide" style={{ fontSize: "clamp(3rem,7vw,6.5rem)" }}>
            <span className="block text-[#F5F0E8]">{isRo ? "FIECARE." : "EVERY."}</span>
            <span className="block text-[#F5F0E8]">{isRo ? "SINGURĂ." : "SINGLE."}</span>
            <span className="block" style={{
              background: "linear-gradient(135deg, #D4AF6A, #E8C878, #C9A84C)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>{isRo ? "DATĂ." : "TIME."}</span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC]">
            {isRo
              ? "59 de alegeri prezidențiale. Zero lovituri de stat. Zero suspendări ale Constituției. Zero monarhi. Zero președinți pe viață. Un record pe care nicio altă națiune de pe Pământ nu îl poate egala."
              : "59 presidential elections. Zero coups. Zero suspensions of the Constitution. Zero monarchs. Zero presidents-for-life. A record no other nation on Earth comes close to matching."}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Opening stats */}
          <section>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: "59", label: isRo ? "Alegeri Prezidențiale" : "Presidential Elections",        sub: "1788–2024"                                },
                { value: String(crisisCount), label: isRo ? "Tranziții în Criză"  : "Crisis Transfers", sub: isRo ? "Constituția a supraviețuit tuturor" : "Constitution survived all" },
                { value: "0",  label: isRo ? "Lovituri de Stat"      : "Coups",                          sub: isRo ? "Zero. Niciodată." : "Zero. Never." },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#12181F] p-6 text-center">
                  <p className="font-display text-6xl font-semibold text-[#C9A84C]">{s.value}</p>
                  <p className="mt-2 font-body text-sm font-semibold text-[#F5F0E8]">{s.label}</p>
                  <p className="font-body text-xs text-[#6B6860]">{s.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Full transfer timeline */}
          <section>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Fiecare Transfer Pașnic — Cronologie" : "Every Peaceful Transfer — Timeline"}
            </h2>
            <p className="mb-8 font-body text-base leading-relaxed text-[#B8B4AC]">
              {isRo
                ? "⚡ Nodurile roșii reprezintă momente de criză în care sistemul a fost cel mai mult testat. Dă click pe orice nod pentru detalii."
                : "⚡ Red nodes represent crisis moments when the system was most tested. Click any node for details."}
            </p>
            <TransferTimeline transfers={PRESIDENTIAL_TRANSFERS} />
          </section>

          {/* The Seven Greatest Tests */}
          <section>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Cele Șapte Mari Teste" : "The Seven Greatest Tests"}
            </h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">
              {isRo
                ? "Fiecare generație a primit momentul său de criză. Constituția a supraviețuit fiecăruia."
                : "Every generation got its crisis moment. The Constitution survived every single one."}
            </p>
            <div className="space-y-4">
              {tests.map((test, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#12181F]">
                  <div className="flex gap-5 p-5">
                    <div className="shrink-0 rounded-xl border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.06)] px-4 py-3 text-center">
                      <p className="font-display text-2xl font-semibold text-[#C9A84C]">{test.year}</p>
                    </div>
                    <div>
                      <h3 className="mb-1 font-display text-lg font-semibold text-[#F5F0E8]">{test.title}</h3>
                      <p className="font-body text-sm leading-relaxed text-[#B8B4AC]">{test.detail}</p>
                    </div>
                  </div>
                  {/* Green verdict bar */}
                  <div className="border-t border-green-900/30 bg-green-900/10 px-5 py-2.5">
                    <p className="font-body text-xs font-semibold text-green-400">
                      ✓ {isRo ? "Transferul constituțional completat conform programului" : "Constitutional transfer completed on schedule"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Constitution Age Comparison */}
          <section>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Cât de Bătrână Este Constituția Ta?" : "How Old Is Your Constitution?"}
            </h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">
              {isRo
                ? "Notă: Multe națiuni cu guverne aparent vechi și-au rescris, suspendat sau înlocuit constituțiile de mai multe ori. Franța se află la a 5-a Republică. Constituția americană a funcționat continuu din 1789."
                : "Note: Several nations that appear to have old governments have had their constitutions rewritten, suspended, or replaced multiple times. France is on its 5th Republic. The US Constitution has operated continuously since 1789."}
            </p>
            <div className="overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#12181F] p-6">
              <div className="space-y-3">
                {CONSTITUTION_AGES.map((c) => {
                  const pct = Math.round((c.years / 237) * 100);
                  const isUS = c.country === "United States";
                  return (
                    <div key={c.country}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className={`font-body text-sm ${isUS ? "font-bold text-[#C9A84C]" : "text-[#B8B4AC]"}`}>
                          {c.country}
                        </span>
                        <span className={`font-hero text-base ${isUS ? "text-[#C9A84C]" : "text-[#6B6860]"}`}>
                          {c.years}y
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 overflow-hidden rounded-full bg-white/8 h-5">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background: isUS
                                ? "linear-gradient(90deg, #8B6A2A, #C9A84C, #E8C878)"
                                : "rgba(201,168,76,0.3)",
                            }}
                          />
                        </div>
                      </div>
                      {c.note && (
                        <p className="mt-0.5 font-body text-[10px] text-[#6B6860]">{c.note}</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-right font-body text-xs text-[#6B6860]">
                {isRo ? "Sursă: Proiectul Constituțiilor Comparative 2024" : "Source: Comparative Constitutions Project 2024"}
              </p>
            </div>
          </section>

          <QuoteBlock
            quote={isRo
              ? "\"Republica, dacă o puteți păstra.\" — Benjamin Franklin, la ieșirea din Convenția Constituțională, 1787. 237 de ani mai târziu: am păstrat-o."
              : "\"A Republic, if you can keep it.\" — Benjamin Franklin, on leaving the Constitutional Convention, 1787. 237 years later: we kept it."}
            attribution={isRo ? "Benjamin Franklin / Poporul American" : "Benjamin Franklin / The American People"}
            title={isRo ? "1787–2024" : "1787–2024"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/8 pt-8">
            <Link href="/constitution" className="font-body text-sm text-[#6B6860] hover:text-[#F5F0E8] transition-colors">
              ← {isRo ? "Constituție" : "Constitution"}
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
