// ─── Separation of Powers Sub-Page ──────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb }       from "@/components/layout/Breadcrumb";
import { QuoteBlock }       from "@/components/sections/QuoteBlock";
import { ConstitutionAurora, InkParticles, SeparationDiagram } from "@/components/constitution/ConstitutionAnimations";
import { getServerLocale }  from "@/lib/i18n/server";
import { BLUR_PLACEHOLDER } from "@/lib/utils";
import { POWERS_CHECK_EXAMPLES } from "@/lib/data/constitution-data";

export const metadata: Metadata = {
  title: "Separation of Powers | Constitution | America: The Greatest Nation",
  description: "Three branches, each checking the other two. Why tyranny is nearly impossible in America — and the historical proof that the system works.",
};

const TYRANNY_CHECKLIST_EN = [
  "The House of Representatives (435 individually elected members)",
  "The Senate (100 senators, 6-year staggered terms — 1/3 up every 2 years)",
  "The White House (1 person, limited to two 4-year terms by the 22nd Amendment)",
  "The Supreme Court (9 justices, lifetime tenure, not elected by anyone)",
  "The entire Cabinet (Senate-confirmed, can be removed by Congress)",
  "The 50 State Governors (each with their own constitutional authority)",
  "7,383 State Legislators (distributed across 50 state legislatures)",
  "The Federal Reserve (independent central bank, 14-year terms)",
  "Federal military (prohibited from domestic law enforcement by Posse Comitatus Act)",
  "3,143 County Governments (each with separately elected officials)",
  "19,000+ City and Municipal Governments (independent elected bodies)",
  "An independent federal judiciary spanning 94 judicial districts",
];

const TYRANNY_CHECKLIST_RO = [
  "Camera Reprezentanților (435 de membri aleși individual)",
  "Senatul (100 de senatori, mandate de 6 ani eșalonate — 1/3 la fiecare 2 ani)",
  "Casa Albă (o persoană, limitată la două mandate de 4 ani prin al 22-lea Amendament)",
  "Curtea Supremă (9 judecători, mandat pe viață, nu aleși de nimeni)",
  "Întregul Cabinet (confirmat de Senat, poate fi îndepărtat de Congres)",
  "Cei 50 de Guvernatori de State (fiecare cu propria autoritate constituțională)",
  "7.383 de Legislatori Statali (distribuiți în 50 de legislaturi statale)",
  "Rezerva Federală (bancă centrală independentă, mandate de 14 ani)",
  "Militarii federali (interzis de la aplicarea legii interne prin Posse Comitatus Act)",
  "3.143 de Guverne de Județ (fiecare cu funcționari aleși separat)",
  "Peste 19.000 de Guverne Municipale (organisme alese independente)",
  "O putere judecătorească federală independentă care cuprinde 94 de districte judiciare",
];

const BRANCH_POWERS_EN = [
  {
    branch: "Legislative",
    icon: "🏛️",
    color: "#C9A84C",
    description: "Congress — the people's direct representatives",
    powers: ["Writes federal law", "Controls the federal budget", "Declares war", "Confirms presidential appointments", "Ratifies treaties", "Can override presidential veto (2/3 majority)", "Can impeach and remove the President and judges"],
    checksOnIt: ["President can veto legislation", "Courts can strike down unconstitutional laws", "Senate and House must agree — bicameralism slows rash action"],
  },
  {
    branch: "Executive",
    icon: "🦅",
    color: "#C9A84C",
    description: "The President — implements and enforces law",
    powers: ["Enforces federal law", "Commands the military", "Conducts foreign policy", "Nominates federal judges and officials", "Can veto congressional legislation", "Issues executive orders (within statutory authority)"],
    checksOnIt: ["Congress can override veto (2/3)", "Senate must confirm major appointments", "Congress controls the budget — no money without legislative approval", "Courts review executive actions", "Impeachment for high crimes and misdemeanors"],
  },
  {
    branch: "Judicial",
    icon: "⚖️",
    color: "#C9A84C",
    description: "The Courts — guardians of the Constitution",
    powers: ["Interprets the Constitution and federal law", "Can invalidate legislation as unconstitutional", "Can strike down executive actions as unlawful", "Protects individual rights against both branches", "Ensures due process in criminal and civil law"],
    checksOnIt: ["President nominates all federal judges", "Senate must confirm all federal judges", "Congress can impeach judges (extremely rare)", "Congress can propose constitutional amendments to override court decisions", "Court has no enforcement mechanism — depends on executive compliance"],
  },
];

const BRANCH_POWERS_RO = [
  {
    branch: "Legislativul",
    icon: "🏛️",
    color: "#C9A84C",
    description: "Congresul — reprezentanții direcți ai poporului",
    powers: ["Redactează legea federală", "Controlează bugetul federal", "Declară război", "Confirmă numirile prezidențiale", "Ratifică tratatele", "Poate anula veto-ul prezidențial (majoritate de 2/3)", "Poate demite și înlătura Președintele și judecătorii"],
    checksOnIt: ["Președintele poate pune veto pe legislație", "Tribunalele pot anula legile neconstituționale", "Senatul și Camera trebuie să fie de acord — bicameralismul încetinește acțiunile pripite"],
  },
  {
    branch: "Executivul",
    icon: "🦅",
    color: "#C9A84C",
    description: "Președintele — implementează și aplică legea",
    powers: ["Aplică legea federală", "Comandă armata", "Conduce politica externă", "Numește judecători federali și funcționari", "Poate pune veto pe legislația congresională", "Emite ordine executive (în limitele autorității statutare)"],
    checksOnIt: ["Congresul poate anula veto-ul (2/3)", "Senatul trebuie să confirme numirile majore", "Congresul controlează bugetul", "Instanțele revizuiesc acțiunile executive", "Demiterea pentru infracțiuni grave și delicte"],
  },
  {
    branch: "Judiciarul",
    icon: "⚖️",
    color: "#C9A84C",
    description: "Instanțele — gardieni ai Constituției",
    powers: ["Interpretează Constituția și legea federală", "Poate anula legislația ca neconstituțională", "Poate anula acțiunile executive ca ilegale", "Protejează drepturile individuale", "Asigură procesul echitabil"],
    checksOnIt: ["Președintele numește toți judecătorii federali", "Senatul trebuie să confirme toți judecătorii federali", "Congresul poate demite judecătorii (extrem de rar)", "Congresul poate propune amendamente constituționale", "Instanța nu are mecanism de executare propriu — depinde de conformitatea executivului"],
  },
];

export default async function SeparationOfPowersPage() {
  const locale = await getServerLocale();
  const isRo   = locale === "ro";
  const checklist  = isRo ? TYRANNY_CHECKLIST_RO : TYRANNY_CHECKLIST_EN;
  const branchData = isRo ? BRANCH_POWERS_RO : BRANCH_POWERS_EN;

  return (
    <>
      <div className="relative overflow-hidden bg-[#080B12] pt-28 pb-16">
        <ConstitutionAurora />
        <InkParticles count={60} />
        <Image
          src="/images/us-buildings/us-supreme-court-building.jpg"
          alt="US Supreme Court building, Washington DC"
          fill className="object-cover opacity-20" priority sizes="100vw"
          placeholder="blur" blurDataURL={BLUR_PLACEHOLDER}
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/70 to-[#080B12]" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: isRo ? "Constituție" : "Constitution", href: "/constitution" }, { label: isRo ? "Separarea Puterilor" : "Separation of Powers" }]} className="mb-8" />
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">{isRo ? "Separarea Puterilor" : "Separation of Powers"}</p>
          <h1 className="mb-6 font-hero leading-none" style={{ fontSize: "clamp(3rem,7vw,6rem)" }}>
            <span className="block text-[#F5F0E8]">{isRo ? "DE CE TIRANIA" : "WHY TYRANNY"}</span>
            <span className="block" style={{ background: "linear-gradient(135deg,#D4AF6A,#E8C878,#C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {isRo ? "ESTE APROAPE IMPOSIBILĂ" : "IS NEARLY IMPOSSIBLE"}
            </span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-[#B8B4AC]">
            {isRo ? "Madison a proiectat un sistem în care ambiția trebuie să contracareze ambiția. Trei ramuri — fiecare verificând celelalte două. Nu o ierarhie, ci un triunghi de tensiune permanentă." : "Madison engineered a system where ambition must counteract ambition. Three branches — each checking the other two. Not a hierarchy — a triangle of permanent tension."}
          </p>
        </div>
      </div>

      <div className="bg-[#080B12]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">

          {/* Interactive diagram */}
          <section>
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">{isRo ? "Diagrama Echilibrului" : "The Equilibrium Diagram"}</h2>
            <p className="mb-8 font-body text-base text-[#B8B4AC]">{isRo ? "Selectează un exemplu real pentru a vedea cum ramura corespunzătoare verifică o altă ramură." : "Select a real-world example to see how one branch checked another — and how the system held."}</p>
            <SeparationDiagram examples={POWERS_CHECK_EXAMPLES} />
          </section>

          {/* Branch cards */}
          <section>
            <h2 className="mb-6 font-display text-h2 text-[#F5F0E8]">{isRo ? "Cele Trei Ramuri" : "The Three Branches"}</h2>
            <div className="grid gap-5 lg:grid-cols-3">
              {branchData.map((branch) => (
                <div key={branch.branch} className="rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#12181F] p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-3xl">{branch.icon}</span>
                    <div>
                      <p className="font-display text-xl font-semibold text-[#C9A84C]">{branch.branch}</p>
                      <p className="font-body text-xs text-[#6B6860]">{branch.description}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6860]">{isRo ? "Puteri" : "Powers"}</p>
                    <ul className="space-y-1.5">
                      {branch.powers.map((p, i) => (
                        <li key={i} className="flex gap-2 font-body text-xs text-[#B8B4AC]">
                          <span className="text-[#C9A84C] shrink-0">·</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6860]">{isRo ? "Verificări Asupra Sa" : "Checks On It"}</p>
                    <ul className="space-y-1.5">
                      {branch.checksOnIt.map((c, i) => (
                        <li key={i} className="flex gap-2 font-body text-xs text-[#B8B4AC]">
                          <span className="text-[rgba(192,57,43,0.8)] shrink-0">→</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tyranny impossible checklist */}
          <section className="rounded-2xl border border-[rgba(201,168,76,0.15)] bg-[#12181F] p-6 md:p-8">
            <h2 className="mb-4 font-display text-h2 text-[#F5F0E8]">
              {isRo ? "Pentru a Stabili o Dictatură în America, Ai Nevoie Să Controlezi Simultan:" : "To Establish a Dictatorship in America, You Would Need to Simultaneously Control:"}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {checklist.map((item, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3">
                  <span className="mt-0.5 shrink-0 text-sm text-green-400">✓</span>
                  <p className="font-body text-sm text-[#B8B4AC]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] p-4">
              <p className="font-display text-lg font-semibold text-[#C9A84C]">
                {isRo ? "\"Acesta nu este un accident. A fost conceput intenționat.\"" : "\"This is not an accident. It was engineered.\""}
              </p>
              <p className="mt-2 font-body text-sm text-[#B8B4AC]">
                {isRo ? "Madison în Federalistul Nr. 51: 'Ambiția trebuie să fie pusă să contracareze ambiția.'" : "Madison in Federalist No. 51: 'Ambition must be made to counteract ambition.'"}
              </p>
            </div>
          </section>

          <QuoteBlock
            quote={isRo ? "\"Dacă oamenii ar fi îngeri, nu ar fi necesar niciun guvern. Dacă îngerii ar guverna oamenii, nu ar fi necesare controale externe sau interne ale guvernului.\"" : "\"If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary.\""}
            attribution="James Madison" title={isRo ? "Federalistul Nr. 51, 1788" : "Federalist No. 51, 1788"} variant="dark"
          />

          <div className="flex items-center justify-between border-t border-white/8 pt-8">
            <Link href="/constitution" className="font-body text-sm text-[#6B6860] hover:text-[#F5F0E8] transition-colors">← {isRo ? "Constituție" : "Constitution"}</Link>
            <Link href="/constitution/federalism" className="font-body text-sm font-semibold text-[#C9A84C] hover:text-[#E8C878] transition-colors">{isRo ? "Federalism →" : "Federalism →"}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
