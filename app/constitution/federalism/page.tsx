// ─── Federalism Sub-Page ─────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }           from "@/components/layout/Breadcrumb";
import { QuoteBlock }           from "@/components/sections/QuoteBlock";
import { ConstitutionAurora, InkParticles, FederalismSimulator } from "@/components/constitution/ConstitutionAnimations";
import { getServerLocale }      from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER }     from "@/lib/utils";
import { STATES_POLICY_DATA }   from "@/lib/data/constitution-data";

export const metadata: Metadata = {
  title: "Federalism | Constitution | America: The Greatest Nation",
  description: "50 states, 50 policy laboratories. How American federalism produces the most diverse, dynamic, and competitive governance system on Earth.",
};

const FEDERALISM_FACTS_EN = [
  { id: "f1", fact: "States discovered the evidence base for welfare reform before Congress acted", detail: "Wisconsin under Tommy Thompson pioneered welfare-to-work in the early 1990s. It worked. Congress adopted it nationally in 1996. That is Brandeis's 'laboratory of democracy' in action — state experiments providing evidence for national policy.", color: "gold" as const },
  { id: "f2", fact: "California's car emissions standards became the national standard", detail: "California has been allowed (via Clean Air Act waiver) to set stricter emissions standards than the EPA. 14 other states adopted California's standard. Detroit built to California's standard because the market demanded it. State policy drove national outcomes.", color: "red" as const },
  { id: "f3", fact: "Massachusetts invented the Romneycare model that became the ACA", detail: "Governor Romney signed a health insurance mandate in Massachusetts in 2006. It became the template for the Affordable Care Act in 2010. A state experiment — covering 3% of Americans — provided the blueprint for covering 330 million.", color: "blue" as const },
  { id: "f4", fact: "Texas and Florida's no-income-tax model is attracting the largest interstate migration in US history", detail: "Since 2020, Texas has gained 380,000+ net migrants annually and Florida 300,000+. California has lost 340,000+. This is the real-time vote of American citizens on competing governance models — conducted through relocation rather than the ballot box.", color: "gold" as const },
  { id: "f5", fact: "Marijuana legalization began as a state experiment — and changed national policy", detail: "Colorado and Washington legalized recreational marijuana in 2012 against federal law. 24 states now have legal marijuana. Federal enforcement has largely ceased. A state policy experiment is gradually becoming de facto national policy through the weight of democratic adoption.", color: "red" as const },
  { id: "f6", fact: "The US has more competitive governance systems than any other nation", detail: "If you don't like your state's tax rates, you can move to another state with lower taxes — without leaving your country, language, culture, or social network. This competitive pressure on state governments has no equivalent in unitary nation-states like France or the UK.", color: "blue" as const },
];

const FEDERALISM_FACTS_RO = [
  { id: "f1", fact: "Statele au descoperit baza de dovezi pentru reforma asistenței sociale înainte de Congres", detail: "Wisconsin sub Tommy Thompson a pionierat tranziția de la asistență socială la muncă la începutul anilor 1990. A funcționat. Congresul a adoptat-o la nivel național în 1996. Aceasta este 'laboratorul democrației' al lui Brandeis în acțiune — experimente statale care furnizează dovezi pentru politica națională.", color: "gold" as const },
  { id: "f2", fact: "Standardele de emisii ale Californiei au devenit standardul național", detail: "California a stabilit standarde de emisii mai stricte decât EPA. 14 alte state au adoptat standardul Californiei. Detroit a construit conform standardului Californiei. Politica statală a condus rezultatele naționale.", color: "red" as const },
  { id: "f3", fact: "Massachusetts a inventat modelul Romneycare care a devenit ACA", detail: "Guvernatorul Romney a semnat un mandat de asigurare de sănătate în Massachusetts în 2006. A devenit șablonul pentru Legea Asistenței Accesibile în 2010. Un experiment statal — acoperind 3% din americani — a furnizat planul pentru acoperirea a 330 de milioane.", color: "blue" as const },
  { id: "f4", fact: "Modelul fără impozit pe venit al Texas și Florida atrage cea mai mare migrație interstatală din istoria SUA", detail: "Din 2020, Texas a câștigat anual 380.000+ de migranți neți, iar Florida 300.000+. California a pierdut 340.000+. Acesta este votul în timp real al cetățenilor americani pe modele de guvernare concurente.", color: "gold" as const },
  { id: "f5", fact: "Legalizarea marijuanei a început ca un experiment statal — și a schimbat politica națională", detail: "Colorado și Washington au legalizat marijuana recreativă în 2012 contra legii federale. 24 de state au acum marijuana legală. Aplicarea federală a încetat în mare parte. Un experiment de politică statală devine treptat politică națională de facto.", color: "red" as const },
  { id: "f6", fact: "SUA au mai multe sisteme de guvernare competitive decât orice altă națiune", detail: "Dacă nu îți plac cotele fiscale ale statului tău, te poți muta în alt stat cu impozite mai mici — fără a-ți părăsi țara, limba, cultura sau rețeaua socială. Această presiune competitivă asupra guvernelor statale nu are echivalent în statele unitare.", color: "blue" as const },
];

export default async function FederalismPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const facts  = isRo ? FEDERALISM_FACTS_RO : FEDERALISM_FACTS_EN;

  return (
    <>
      <div className="relative overflow-hidden bg-[#080B12] pt-28 pb-16">
        <ConstitutionAurora />
        <InkParticles count={60} />
        <Image
          src="/images/us-buildings/us-capitol.jpg"
          alt="United States Capitol building — seat of federal legislative power"
          fill className="object-cover opacity-20" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/70 to-[#080B12]" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Constituție" : "Constitution", href: "/constitution" }, { label: isRo ? "Federalism" : "Federalism" }]} className="mb-8" />
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">{isRo ? "Laboratoare ale Democrației" : "Laboratories of Democracy"}</p>
          <h1 className="mb-6 font-hero leading-none" style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>
            <span className="block text-[#F5F0E8]">{isRo ? "50 DE STATE." : "50 STATES."}</span>
            <span className="block" style={{ background: "linear-gradient(135deg,#D4AF6A,#E8C878,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {isRo ? "50 DE EXPERIMENTE." : "50 EXPERIMENTS."}
            </span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC]">
            {isRo ? "Judecătorul Brandeis a numit-o 'laboratorul democrației'. Cincizeci de state competitive cu politici diferite, producând date reale despre ce funcționează — sistemul de guvernare cel mai dinamic de pe Pământ." : "Justice Brandeis called it the 'laboratory of democracy.' Fifty competitive states with different policies, producing real data on what works — the most dynamic governance system on Earth."}
          </p>
        </div>
      </div>

      <div className="bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Simulator */}
          <section>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">{isRo ? "Simulatorul de Politici" : "Policy Simulator"}</h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">
              {isRo ? "Ajustează levierele politice. Vezi ce state au politici similare — și ce rezultate reale au produs acele politici." : "Adjust the policy levers. See which states have similar policies — and what real-world outcomes those policies have actually produced."}
            </p>
            <FederalismSimulator states={STATES_POLICY_DATA} />
          </section>

          {/* Laboratories section */}
          <section>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">{isRo ? "Laboratoarele în Acțiune" : "The Laboratories in Action"}</h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">
              {isRo ? "Iată cum politica statală a schimbat America națională — experimentele care au funcționat s-au propagat, cele care au eșuat au avertizat." : "Here is how state policy has changed national America — experiments that worked spread, those that failed warned."}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.id} className="rounded-2xl border border-[rgba(201,168,76,0.12)] bg-[#12181F] p-5">
                  <p className="mb-2 font-body text-sm font-semibold leading-snug text-[#F5F0E8]">{fact.fact}</p>
                  <p className="font-body text-xs leading-relaxed text-[#B8B4AC]">{fact.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 10th Amendment callout */}
          <section className="overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.2)] bg-[#12181F]">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">{isRo ? "Al 10-lea Amendament" : "The 10th Amendment"}</p>
                <h3 className="mb-4 font-display text-2xl font-semibold text-[#F5F0E8]">{isRo ? "Baza Constituțională a Federalismului" : "The Constitutional Basis of Federalism"}</h3>
                <blockquote className="border-l-2 border-[#C9A84C]/50 pl-4 mb-4" style={{ fontFamily: "'EB Garamond','Georgia',serif" }}>
                  <p className="text-base italic text-[#F5F0E8]/80 leading-relaxed">
                    {isRo ? "\"Puterile nedelegalizate Statelor Unite prin Constituție și nici interzise de aceasta statelor sunt rezervate respectiv statelor sau poporului.\"" : "\"The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.\""}
                  </p>
                </blockquote>
                <p className="font-body text-sm leading-relaxed text-[#B8B4AC]">
                  {isRo ? "32 de cuvinte care garantează că guvernul federal nu poate absorbi toată puterea politică în America. Statele nu sunt administrative — sunt suverane în domeniile lor rezervate." : "32 words that guarantee the federal government cannot absorb all political power in America. States are not administrative — they are sovereign within their reserved domains."}
                </p>
              </div>
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image
                  src="/images/us-buildings/us-capitol.jpg"
                  alt="United States Capitol building — one layer in America's federal system"
                  fill className="object-cover opacity-50"
                  sizes="(max-width:768px) 100vw, 50vw"
                  placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#12181F] to-transparent" />
              </div>
            </div>
          </section>

          <QuoteBlock
            quote={isRo ? "\"Un stat singur poate, dacă locuitorii săi aleg, să servească drept laborator; și să încerce experimente sociale și economice noi fără risc pentru restul țării.\"" : "\"A single courageous State may, if its citizens choose, serve as a laboratory; and try novel social and economic experiments without risk to the rest of the country.\""}
            attribution={isRo ? "Judecătorul Louis Brandeis" : "Justice Louis Brandeis"}
            title={isRo ? "New State Ice Co. v. Liebmann, 1932" : "New State Ice Co. v. Liebmann, 1932"}
            variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/8 pt-8">
            <Link href="/constitution/separation-of-powers" className="font-body text-sm text-[#6B6860] hover:text-[#F5F0E8] transition-colors">← {isRo ? "Separarea Puterilor" : "Separation of Powers"}</Link>
            <Link href="/constitution/democracy-track-record" className="font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">{isRo ? "250 de Ani →" : "250-Year Record →"}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
