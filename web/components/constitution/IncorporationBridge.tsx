"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface IncorporationCase {
  id: string;
  year: number;
  caseName: string;
  amendment: "1st" | "2nd" | "4th" | "5th" | "6th" | "8th";
  amendmentTitleEn: string;
  amendmentTitleRo: string;
  rightCarriedEn: string;
  rightCarriedRo: string;
  significanceEn: string;
  significanceRo: string;
  quoteEn: string;
  quoteRo: string;
  dissentQuoteEn?: string;
  dissentQuoteRo?: string;
  vote: string;
  authorEn: string;
  authorRo: string;
  isKeyMilestone?: boolean;
}

export const INCORPORATION_CASES: IncorporationCase[] = [
  {
    id: "gitlow-1925",
    year: 1925,
    caseName: "Gitlow v. New York",
    amendment: "1st",
    amendmentTitleEn: "First Amendment (Freedom of Speech)",
    amendmentTitleRo: "Primul Amendament (Libertatea de Exprimare)",
    rightCarriedEn: "Freedom of Speech",
    rightCarriedRo: "Libertatea de Exprimare",
    significanceEn: "First major breakthrough. States could no longer arbitrarily ban political speech. The Supreme Court assumed for the first time that the 14th Amendment's Due Process Clause extends First Amendment speech protections to state governments.",
    significanceRo: "Primul mare pas înainte. Statele nu au mai putut interzice arbitrar discursul politic. Curtea Supremă a asumat pentru prima dată că Clauza Procesului Echitabil din al 14-lea Amendament extinde protecția discursului din Primul Amendament asupra guvernelor statale.",
    quoteEn: "For present purposes, we may and do assume that freedom of speech and of the press are among the fundamental personal rights and liberties protected by the due process clause of the Fourteenth Amendment from impairment by the States.",
    quoteRo: "Pentru scopurile prezente, putem presupune și presupunem că libertatea de exprimare și a presei se numără printre drepturile și libertățile personale fundamentale protejate de clauza procesului echitabil din Al Paisprezecelea Amendament împotriva afectării de către State.",
    vote: "7–2",
    authorEn: "Justice Edward Terry Sanford",
    authorRo: "Judecătorul Edward Terry Sanford",
    isKeyMilestone: true,
  },
  {
    id: "near-1931",
    year: 1931,
    caseName: "Near v. Minnesota",
    amendment: "1st",
    amendmentTitleEn: "First Amendment (Freedom of the Press)",
    amendmentTitleRo: "Primul Amendament (Libertatea Presei)",
    rightCarriedEn: "Freedom of the Press",
    rightCarriedRo: "Libertatea Presei",
    significanceEn: "Carried freedom of the press across the bridge. Banned states from using prior restraint (censorship before publication) to silence newspapers and political publishers.",
    significanceRo: "A trecut libertatea presei peste pod. A interzis statelor să folosească restricția prealabilă (cenzura înainte de publicare) pentru a reduce la tăcere ziarele și editorii politici.",
    quoteEn: "The liberty of the press is particularly safeguarded from state infringement. Prior restraint is the essence of censorship and violates the Fourteenth Amendment.",
    quoteRo: "Libertatea presei este în mod deosebit protejată de încălcările statale. Restricția prealabilă este esența cenzurii și încalcă Al Paisprezecelea Amendament.",
    vote: "5–4",
    authorEn: "Chief Justice Charles Evans Hughes",
    authorRo: "Președintele Curții Charles Evans Hughes",
    isKeyMilestone: true,
  },
  {
    id: "dejonge-1937",
    year: 1937,
    caseName: "De Jonge v. Oregon",
    amendment: "1st",
    amendmentTitleEn: "First Amendment (Right of Assembly)",
    amendmentTitleRo: "Primul Amendament (Dreptul la Adunare)",
    rightCarriedEn: "Right to Peaceably Assemble",
    rightCarriedRo: "Dreptul la Adunare Pașnică",
    significanceEn: "Protected the right of citizens to hold peaceful political meetings without state criminal syndicalism prosecutions.",
    significanceRo: "A protejat dreptul cetățenilor de a organiza adunări politice pașnice fără a fi urmăriți penal de stat pentru sindicalism criminal.",
    quoteEn: "Peaceful assembly for lawful discussion cannot be made a crime. The holding of meetings for peaceable political action cannot be proscribed.",
    quoteRo: "Adunarea pașnică pentru discuții legitime nu poate fi transformată în infracțiune. Organizarea de ședințe pentru acțiune politică pașnică nu poate fi interzisă.",
    vote: "8–0",
    authorEn: "Chief Justice Charles Evans Hughes",
    authorRo: "Președintele Curții Charles Evans Hughes",
  },
  {
    id: "cantwell-1940",
    year: 1940,
    caseName: "Cantwell v. Connecticut",
    amendment: "1st",
    amendmentTitleEn: "First Amendment (Free Exercise of Religion)",
    amendmentTitleRo: "Primul Amendament (Exercitarea Liberă a Religiei)",
    rightCarriedEn: "Free Exercise of Religion",
    rightCarriedRo: "Exercitarea Liberă a Religiei",
    significanceEn: "Incorporated the Free Exercise Clause. States cannot require permits or impose discretionary bans on religious door-to-door solicitation or public proselytizing.",
    significanceRo: "A încorporat Clauza Exercitării Libere. Statele nu pot cere permise și nu pot impune interdicții discreționare asupra proseditismului sau solicitărilor religioase publice.",
    quoteEn: "The Fourteenth Amendment has rendered the legislatures of the states as incompetent as Congress to enact laws respecting an establishment of religion or prohibiting the free exercise thereof.",
    quoteRo: "Al Paisprezecelea Amendament a făcut ca legislaturile statelor să fie la fel de incompetente ca Congresul în adoptarea legilor privind stabilirea unei religii sau interzicerea exercitării libere a acesteia.",
    vote: "9–0",
    authorEn: "Justice Owen Roberts",
    authorRo: "Judecătorul Owen Roberts",
  },
  {
    id: "everson-1947",
    year: 1947,
    caseName: "Everson v. Board of Education",
    amendment: "1st",
    amendmentTitleEn: "First Amendment (Establishment Clause)",
    amendmentTitleRo: "Primul Amendament (Clauza de Ne-stabilire a Religiei)",
    rightCarriedEn: "Establishment Clause Protection",
    rightCarriedRo: "Protecția Împotriva Religiei de Stat",
    significanceEn: "Incorporated the Establishment Clause against state governments, establishing the strict 'wall of separation between church and state' standard at the state level.",
    significanceRo: "A încorporat Clauza de Ne-stabilire față de guvernele statale, stabilind standardul strict al 'zidului de separare între biserică și stat' la nivel de stat.",
    quoteEn: "Neither a state nor the Federal Government can set up a church. Neither can pass laws which aid one religion, aid all religions, or prefer one religion over another.",
    quoteRo: "Niciun stat și nici Guvernul Federal nu pot înființa o biserică. Niciunul nu poate adopta legi care să ajute o religie, să ajute toate religiile sau să prefere o religie în detrimentul alteia.",
    vote: "5–4",
    authorEn: "Justice Hugo Black",
    authorRo: "Judecătorul Hugo Black",
  },
  {
    id: "mapp-1961",
    year: 1961,
    caseName: "Mapp v. Ohio",
    amendment: "4th",
    amendmentTitleEn: "Fourth Amendment (Unreasonable Search & Seizure)",
    amendmentTitleRo: "Al Patrulea Amendament (Percheziții și Sechestrări Ilegale)",
    rightCarriedEn: "4th Amendment Exclusionary Rule",
    rightCarriedRo: "Regula Excluderii Probelor Ilegale",
    significanceEn: "Carried the 4th Amendment exclusionary rule to state criminal courts. State police could no longer use illegally seized evidence to convict citizens in court.",
    significanceRo: "A adus regula excluderii probelor din Al Patrulea Amendament în instanțele penale statale. Poliția statală nu a mai putut folosi probe obținute ilegal pentru a condamna cetățenii.",
    quoteEn: "All evidence obtained by searches and seizures in violation of the Constitution is, by that same authority, inadmissible in a state court.",
    quoteRo: "Toate probele obținute prin percheziții și sechestrări cu încălcarea Constituției sunt, prin aceeași autoritate, inadmisibile într-o instanță statală.",
    vote: "6–3",
    authorEn: "Justice Tom C. Clark",
    authorRo: "Judecătorul Tom C. Clark",
    isKeyMilestone: true,
  },
  {
    id: "gideon-1963",
    year: 1963,
    caseName: "Gideon v. Wainwright",
    amendment: "6th",
    amendmentTitleEn: "Sixth Amendment (Right to Counsel)",
    amendmentTitleRo: "Al Șaselea Amendament (Dreptul la Avocat)",
    rightCarriedEn: "Right to Counsel in Felony Trials",
    rightCarriedRo: "Dreptul la Avocat Gratuit în Procese Penale",
    significanceEn: "Carried the 6th Amendment right to counsel across the bridge. Mandated that states must provide free public defenders to indigent felony defendants.",
    significanceRo: "A adus dreptul la avocat din Al Șaselea Amendament peste pod. A obligat statele să ofere avocați din oficiu acuzaților fără posibilități financiare.",
    quoteEn: "In our adversary system of criminal justice, any person haled into court, who is too poor to hire a lawyer, cannot be assured a fair trial unless counsel is provided for him.",
    quoteRo: "În sistemul nostru contradictoriu de justiție penală, orice persoană adusă în instanță, care este prea săracă pentru a angaja un avocat, nu poate avea garantat un proces echitabil decât dacă i se asigură un apărător.",
    vote: "9–0",
    authorEn: "Justice Hugo Black",
    authorRo: "Judecătorul Hugo Black",
    isKeyMilestone: true,
  },
  {
    id: "malloy-1964",
    year: 1964,
    caseName: "Malloy v. Hogan",
    amendment: "5th",
    amendmentTitleEn: "Fifth Amendment (Self-Incrimination)",
    amendmentTitleRo: "Al Cincilea Amendament (Auto-incriminarea)",
    rightCarriedEn: "Protection Against Self-Incrimination",
    rightCarriedRo: "Protecția Împotriva Auto-incriminării",
    significanceEn: "Applied the 5th Amendment privilege against self-incrimination to state judicial proceedings, ensuring suspects cannot be coerced by state authorities.",
    significanceRo: "A aplicat privilegiul din Al Cincilea Amendament împotriva auto-incriminării în procedurile judiciare statale, asigurând că suspecții nu pot fi presați de autoritățile statale.",
    quoteEn: "The Fourteenth Amendment secures against state infringement the same privilege protecting individuals from self-incrimination that the Fifth Amendment establishes against federal infringement.",
    quoteRo: "Al Paisprezecelea Amendament protejează împotriva încălcărilor statale același privilegiu care protejează persoanele împotriva auto-incriminării federale.",
    vote: "5–4",
    authorEn: "Justice William J. Brennan Jr.",
    authorRo: "Judecătorul William J. Brennan Jr.",
  },
  {
    id: "pointer-1965",
    year: 1965,
    caseName: "Pointer v. Texas",
    amendment: "6th",
    amendmentTitleEn: "Sixth Amendment (Confrontation Clause)",
    amendmentTitleRo: "Al Șaselea Amendament (Dreptul la Confruntare)",
    rightCarriedEn: "Right to Confront Witnesses",
    rightCarriedRo: "Dreptul de a Confrunta Martorii",
    significanceEn: "Incorporated the Sixth Amendment Confrontation Clause, requiring states to guarantee criminal defendants the right to cross-examine prosecution witnesses.",
    significanceRo: "A încorporat Clauza de Confruntare din Al Șaselea Amendament, cerând statelor să garanteze acuzaților dreptul de a contra-examina martorii acuzării.",
    quoteEn: "The right of an accused to confront the witnesses against him is a fundamental right essential to a fair trial in a state prosecution.",
    quoteRo: "Dreptul unui acuzat de a confrunta martorii împotriva sa este un drept fundamental esențial pentru un proces echitabil într-o urmărire penală statală.",
    vote: "9–0",
    authorEn: "Justice Hugo Black",
    authorRo: "Judecătorul Hugo Black",
  },
  {
    id: "benton-1969",
    year: 1969,
    caseName: "Benton v. Maryland",
    amendment: "5th",
    amendmentTitleEn: "Fifth Amendment (Double Jeopardy)",
    amendmentTitleRo: "Al Cincilea Amendament (Dubla Urmărire Penală)",
    rightCarriedEn: "Protection Against Double Jeopardy",
    rightCarriedRo: "Protecția Împotriva Dublei Urmăriri Penale",
    significanceEn: "Incorporated the Double Jeopardy Clause against state courts, overruling the 1937 Palko precedent and securing protection from repeated state prosecutions for the same offense.",
    significanceRo: "A încorporat Clauza Dublei Urmăriri Penale împotriva instanțelor statale, anulând precedentul Palko din 1937 și asigurând protecția împotriva judecării repetate pentru aceeași faptă.",
    quoteEn: "The double jeopardy prohibition of the Fifth Amendment represents a fundamental ideal in our constitutional heritage and applies to the States through the Fourteenth Amendment.",
    quoteRo: "Interdicția dublei urmăriri penale din Al Cincilea Amendament reprezintă un ideal fundamental în moștenirea noastră constituțională și se aplică Statelor prin Al Paisprezecelea Amendament.",
    vote: "7–2",
    authorEn: "Justice Thurgood Marshall",
    authorRo: "Judecătorul Thurgood Marshall",
  },
  {
    id: "mcdonald-2010",
    year: 2010,
    caseName: "McDonald v. City of Chicago",
    amendment: "2nd",
    amendmentTitleEn: "Second Amendment (Right to Bear Arms)",
    amendmentTitleRo: "Al Doilea Amendament (Dreptul la Arme)",
    rightCarriedEn: "Individual Right to Keep and Bear Arms",
    rightCarriedRo: "Dreptul Individual de a Deține și Purta Arme",
    significanceEn: "Carried the 2nd Amendment individual right across the bridge. Struck down state and municipal handgun bans, holding that the right to self-defense is fundamental to the American scheme of ordered liberty.",
    significanceRo: "A adus dreptul individual din Al Doilea Amendament peste pod. A anulat interdicțiile statale și municipale privind armele de mână, stabilind că dreptul la autoapărare este fundamental.",
    quoteEn: "The Second Amendment right is fully applicable to the States. Self-defense is a basic right, recognized by many legal systems from ancient times to the present day.",
    quoteRo: "Dreptul din Al Doilea Amendament este pe deplin aplicabil Statelor. Autoapărarea este un drept de bază, recunoscut de multe sisteme juridice din timpuri străvechi până în prezent.",
    vote: "5–4",
    authorEn: "Justice Samuel Alito",
    authorRo: "Judecătorul Samuel Alito",
    isKeyMilestone: true,
  },
  {
    id: "timbs-2019",
    year: 2019,
    caseName: "Timbs v. Indiana",
    amendment: "8th",
    amendmentTitleEn: "Eighth Amendment (Excessive Fines)",
    amendmentTitleRo: "Al Optulea Amendament (Amenzi Excesive)",
    rightCarriedEn: "Protection Against Excessive Fines & Asset Forfeiture",
    rightCarriedRo: "Protecția Împotriva Amenzilor Excesive și Confiscării",
    significanceEn: "Carried the 8th Amendment protection against excessive fines across the bridge. Stopped state governments from seizing personal vehicles or assets disproportionate to the underlying crime.",
    significanceRo: "A adus protecția împotriva amenzilor excesive din Al Optulea Amendament peste pod. A oprit guvernele statale să sechestreze vehicule sau bunuri personale disproporționate față de infracțiune.",
    quoteEn: "The Excessive Fines Clause is incorporated by the Due Process Clause of the Fourteenth Amendment. Protection against excessive fines has been a constant shield against governmental abuse for over 800 years.",
    quoteRo: "Clauza Amenzilor Excesive este încorporată prin Clauza Procesului Echitabil din Al Paisprezecelea Amendament. Protecția împotriva amenzilor excesive a fost un scut constant împotriva abuzului guvernamental timp de peste 800 de ani.",
    vote: "9–0",
    authorEn: "Justice Ruth Bader Ginsburg",
    authorRo: "Judecătoarea Ruth Bader Ginsburg",
    isKeyMilestone: true,
  },
  {
    id: "ramos-2020",
    year: 2020,
    caseName: "Ramos v. Louisiana",
    amendment: "6th",
    amendmentTitleEn: "Sixth Amendment (Unanimous Jury)",
    amendmentTitleRo: "Al Șaselea Amendament (Juriu Unanim)",
    rightCarriedEn: "Unanimous Jury Verdict Requirement",
    rightCarriedRo: "Cerința Votului Unanim în Juriu",
    significanceEn: "Incorporated the requirement for unanimous jury verdicts in state criminal felony trials, striking down non-unanimous conviction rules that lingered in Louisiana and Oregon.",
    significanceRo: "A încorporat cerința ca verdictele juriului să fie unanime în procesele penale statale, eliminând regulile de condamnare ne-unanime care mai existau în Louisiana și Oregon.",
    quoteEn: "The Sixth Amendment right to a jury trial—requiring a unanimous verdict to convict a defendant of a serious offense—applies equally in state and federal court.",
    quoteRo: "Dreptul din Al Șaselea Amendament la un proces cu juriu—care cere un verdict unanim pentru condamnarea pentru o infracțiune gravă—se aplică în mod egal în instanțele statale și federale.",
    vote: "6–3",
    authorEn: "Justice Neil Gorsuch",
    authorRo: "Judecătorul Neil Gorsuch",
  },
];

export function IncorporationBridge({ isRo = false }: { isRo?: boolean }) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeCase, setActiveCase] = useState<IncorporationCase>(INCORPORATION_CASES[0]);
  const [animatingRight, setAnimatingRight] = useState<boolean>(false);

  const filteredCases = useMemo(() => {
    if (selectedFilter === "all") return INCORPORATION_CASES;
    return INCORPORATION_CASES.filter((c) => c.amendment === selectedFilter);
  }, [selectedFilter]);

  const handleSelectCase = (item: IncorporationCase) => {
    setActiveCase(item);
    setAnimatingRight(true);
    setTimeout(() => setAnimatingRight(false), 900);
  };

  return (
    <div className="space-y-12">
      {/* ── Visual Header Banner ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-[rgba(201,168,76,0.25)] bg-[#0C1018] p-6 md:p-10 shadow-2xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(ellipse at 50% -20%, rgba(201,168,76,0.3) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="mb-3 inline-block rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] px-3.5 py-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              {isRo ? "Al 14-lea Amendament · Clauza Procesului Echitabil (1868)" : "14th Amendment · Due Process Clause (1868)"}
            </span>
            <h2 className="mb-4 font-display text-3xl md:text-4xl font-bold text-[#F5F0E8] leading-tight">
              {isRo ? "Podul Încorporării Selective" : "The Incorporation Bridge"}
            </h2>
            <p className="font-body text-base leading-relaxed text-[#B8B4AC] mb-6">
              {isRo
                ? "În 1791, Declarația Drepturilor se aplica DOAR guvernului federal (Barron v. Baltimore, 1833). Statele puteau cenzura presa, interzice armele sau refuza avocați. Al 14-lea Amendament (1868) a creat podul constituțional care a adus aceste protecții, caz cu caz, asupra tuturor guvernelor statale."
                : "In 1791, the Bill of Rights bound ONLY the federal government (Barron v. Baltimore, 1833). States could censor press, ban arms, or deny lawyers. The 14th Amendment (1868) built the constitutional bridge that carried these protections across, case by case, to bind every state."}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] p-3 text-center">
                <p className="font-display text-2xl font-bold text-[#C9A84C]">1868</p>
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-[#8B8880]">
                  {isRo ? "Ratificare Amendament" : "Amendment Ratified"}
                </p>
              </div>
              <div className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] p-3 text-center">
                <p className="font-display text-2xl font-bold text-[#C9A84C]">1925</p>
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-[#8B8880]">
                  {isRo ? "Gitlow (Primul Pas)" : "Gitlow (First Step)"}
                </p>
              </div>
              <div className="rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.04)] p-3 text-center">
                <p className="font-display text-2xl font-bold text-[#C9A84C]">95%+</p>
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-[#8B8880]">
                  {isRo ? "Drepturi Încorporate" : "Rights Incorporated"}
                </p>
              </div>
            </div>
          </div>

          {/* Historic Legal Contrast Box */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#12181F] p-6">
            <h3 className="mb-3 font-display text-lg font-bold text-[#F5F0E8] flex items-center gap-2">
              <span className="text-[#C9A84C]">⚖️</span>
              {isRo ? "Marea Schimbare Constituțională" : "The Great Constitutional Shift"}
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-3.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-xs font-bold text-red-400">1833: Barron v. Baltimore</span>
                  <span className="font-body text-[10px] text-red-300/70">{isRo ? "Înainte de Pod" : "Before the Bridge"}</span>
                </div>
                <p className="font-body text-xs text-[#B8B4AC] leading-relaxed">
                  {isRo
                    ? "Curtea Supremă a decis că Declarația Drepturilor restricționează DOAR Congresul federal. Statele puteau încălca libertățile civile fără remediere federală."
                    : "Supreme Court held that the Bill of Rights restricts ONLY federal power. States were free to restrict civil liberties without federal judicial remedy."}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-3.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-xs font-bold text-emerald-400">1868 – Prezent: Al 14-lea Amendament</span>
                  <span className="font-body text-[10px] text-emerald-300/70">{isRo ? "Cu Podul" : "With the Bridge"}</span>
                </div>
                <p className="font-body text-xs text-[#B8B4AC] leading-relaxed">
                  {isRo
                    ? "\"Niciun Stat nu va lipsi vreo persoană de viață, libertate sau proprietate fără un proces echitabil.\" Drepturile fundamentale trec podul pentru a lega toate cele 50 de state."
                    : "\"Nor shall any State deprive any person of life, liberty, or property, without due process of law.\" Fundamental rights cross the bridge to bind all 50 states."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Bridge Graphic Component ─────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-[rgba(201,168,76,0.18)] bg-[#080B12] p-6 md:p-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#F5F0E8]">
              {isRo ? "Simulare Vizuală: Cum Trec Drepturile Peste Pod" : "Visual Simulator: Rights Crossing the Bridge"}
            </h3>
            <p className="font-body text-xs text-[#8B8880]">
              {isRo
                ? "Dă click pe orice decizie din cronologie pentru a trimite acel drept peste podul constituțional din 1868."
                : "Click any landmark case below to watch that right cross the 1868 constitutional bridge."}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: isRo ? "Toate" : "All" },
              { id: "1st", label: "1st Amend." },
              { id: "2nd", label: "2nd Amend." },
              { id: "4th", label: "4th Amend." },
              { id: "5th", label: "5th Amend." },
              { id: "6th", label: "6th Amend." },
              { id: "8th", label: "8th Amend." },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`rounded-lg px-3 py-1.5 font-body text-xs font-semibold transition-all ${
                  selectedFilter === f.id
                    ? "bg-[#C9A84C] text-[#080B12] shadow-[0_0_15px_rgba(201,168,76,0.4)]"
                    : "border border-white/10 bg-white/5 text-[#B8B4AC] hover:border-[rgba(201,168,76,0.3)] hover:text-[#F5F0E8]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bridge Architectural SVG Diagram */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E131D] p-6 md:p-10">
          <svg viewBox="0 0 1000 320" className="w-full h-auto" role="img" aria-label="14th Amendment Incorporation Bridge Architecture">
            <defs>
              <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B6A2A" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#C9A84C" stopOpacity="1" />
                <stop offset="100%" stopColor="#E8C878" stopOpacity="0.4" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Left Pillar: Federal Government 1791 */}
            <g transform="translate(80, 40)">
              <rect x="0" y="0" width="140" height="240" rx="12" fill="#121822" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" />
              <text x="70" y="40" textAnchor="middle" fill="#C9A84C" fontSize="24">🏛️</text>
              <text x="70" y="70" textAnchor="middle" fill="#F5F0E8" fontSize="13" fontFamily="'Playfair Display', serif" fontWeight="700">FEDERAL</text>
              <text x="70" y="90" textAnchor="middle" fill="#F5F0E8" fontSize="13" fontFamily="'Playfair Display', serif" fontWeight="700">GOVERNMENT</text>
              <text x="70" y="115" textAnchor="middle" fill="#8B8880" fontSize="10" fontFamily="'Inter', sans-serif">1791 Guarantee</text>
              <rect x="15" y="135" width="110" height="85" rx="8" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.2)" />
              <text x="70" y="160" textAnchor="middle" fill="#B8B4AC" fontSize="9.5" fontFamily="'Inter', sans-serif">Binds Congress</text>
              <text x="70" y="180" textAnchor="middle" fill="#B8B4AC" fontSize="9.5" fontFamily="'Inter', sans-serif">Federal Courts</text>
              <text x="70" y="200" textAnchor="middle" fill="#B8B4AC" fontSize="9.5" fontFamily="'Inter', sans-serif">US Territories</text>
            </g>

            {/* Center Span: The 14th Amendment (1868) */}
            {/* Bridge Cable & Arch */}
            <path d="M 220 160 Q 500 70 780 160" fill="none" stroke="url(#bridgeGrad)" strokeWidth="4" filter="url(#glow)" />
            <path d="M 220 165 L 780 165" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="3" strokeDasharray="6 4" />

            {/* Vertical Suspender Cables */}
            {[280, 340, 400, 460, 520, 580, 640, 700, 760].map((x) => (
              <line key={x} x1={x} y1="120" x2={x} y2="165" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
            ))}

            {/* Bridge Center Monument Pill */}
            <g transform="translate(400, 110)">
              <rect x="0" y="0" width="200" height="75" rx="14" fill="#18202C" stroke="#C9A84C" strokeWidth="2" filter="url(#glow)" />
              <text x="100" y="26" textAnchor="middle" fill="#E8C878" fontSize="11" fontFamily="'Inter', sans-serif" fontWeight="800" letterSpacing="1">14TH AMENDMENT</text>
              <text x="100" y="44" textAnchor="middle" fill="#F5F0E8" fontSize="12" fontFamily="'Playfair Display', serif" fontStyle="italic">Due Process Clause (1868)</text>
              <text x="100" y="60" textAnchor="middle" fill="#C9A84C" fontSize="9" fontFamily="'Inter', sans-serif">"No State shall deprive..."</text>
            </g>

            {/* Right Pillar: All 50 States 1925-Present */}
            <g transform="translate(780, 40)">
              <rect x="0" y="0" width="140" height="240" rx="12" fill="#121822" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" />
              <text x="70" y="40" textAnchor="middle" fill="#C9A84C" fontSize="24">🗽</text>
              <text x="70" y="70" textAnchor="middle" fill="#F5F0E8" fontSize="13" fontFamily="'Playfair Display', serif" fontWeight="700">ALL 50 STATES</text>
              <text x="70" y="90" textAnchor="middle" fill="#F5F0E8" fontSize="13" fontFamily="'Playfair Display', serif" fontWeight="700">& CITIES</text>
              <text x="70" y="115" textAnchor="middle" fill="#8B8880" fontSize="10" fontFamily="'Inter', sans-serif">1925–Present</text>
              <rect x="15" y="135" width="110" height="85" rx="8" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.2)" />
              <text x="70" y="160" textAnchor="middle" fill="#B8B4AC" fontSize="9.5" fontFamily="'Inter', sans-serif">State Police</text>
              <text x="70" y="180" textAnchor="middle" fill="#B8B4AC" fontSize="9.5" fontFamily="'Inter', sans-serif">State Courts</text>
              <text x="70" y="200" textAnchor="middle" fill="#B8B4AC" fontSize="9.5" fontFamily="'Inter', sans-serif">Local Governors</text>
            </g>

            {/* Dynamic Animated Traveling Right Indicator */}
            <g>
              <motion.circle
                key={activeCase.id}
                cx="220"
                cy="165"
                r="14"
                fill="#C9A84C"
                filter="url(#glow)"
                animate={{ cx: [220, 500, 780] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.text
                key={`text-${activeCase.id}`}
                x="220"
                y="140"
                textAnchor="middle"
                fill="#E8C878"
                fontSize="11"
                fontFamily="'Inter', sans-serif"
                fontWeight="700"
                animate={{ x: [220, 500, 780] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                {activeCase.rightCarriedEn} ({activeCase.year})
              </motion.text>
            </g>

            {/* Bottom Status Text */}
            <text x="500" y="275" textAnchor="middle" fill="#8B8880" fontSize="11" fontFamily="'Inter', sans-serif">
              {isRo
                ? `Cazul selectat: ${activeCase.caseName} (${activeCase.year}) · ${activeCase.rightCarriedRo}`
                : `Active Case: ${activeCase.caseName} (${activeCase.year}) · ${activeCase.rightCarriedEn}`}
            </text>
          </svg>
        </div>

        {/* ── Case Timeline Selector Scrubber ──────────────────────────────── */}
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
              {isRo ? "Cronologia Cazurilor Istorice (1925 – 2020)" : "Historic Incorporation Precedent Timeline (1925 – 2020)"}
            </span>
            <span className="font-body text-xs text-[#8B8880]">
              {filteredCases.length} {isRo ? "cazuri afișate" : "cases shown"}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 pt-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(201,168,76,0.3) transparent" }}>
            {filteredCases.map((item) => {
              const isSelected = activeCase.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectCase(item)}
                  className={`group relative shrink-0 rounded-2xl border p-4 text-left transition-all duration-300 w-64 ${
                    isSelected
                      ? "border-[#C9A84C] bg-[rgba(201,168,76,0.12)] shadow-[0_0_25px_rgba(201,168,76,0.2)]"
                      : "border-white/10 bg-[#121822] hover:border-[rgba(201,168,76,0.4)] hover:bg-[#161E2C]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-display text-lg font-bold ${isSelected ? "text-[#E8C878]" : "text-[#C9A84C]"}`}>
                      {item.year}
                    </span>
                    <span className="rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)] px-2 py-0.5 font-body text-[10px] font-semibold text-[#C9A84C]">
                      {item.amendment} Amend.
                    </span>
                  </div>

                  <p className="font-body text-sm font-bold text-[#F5F0E8] mb-1 line-clamp-1 group-hover:text-[#E8C878] transition-colors">
                    {item.caseName}
                  </p>
                  <p className="font-body text-xs text-[#B8B4AC] line-clamp-2 leading-snug">
                    {isRo ? item.rightCarriedRo : item.rightCarriedEn}
                  </p>

                  {item.isKeyMilestone && (
                    <span className="mt-2 inline-block rounded border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 font-body text-[9px] font-bold text-amber-300">
                      ★ KEY MILESTONE
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Detailed Inspector Card ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 rounded-2xl border border-[rgba(201,168,76,0.3)] bg-[#0D121B] p-6 md:p-8 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-md border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.1)] px-3 py-1 font-display text-base font-bold text-[#E8C878]">
                    {activeCase.year}
                  </span>
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
                    {isRo ? activeCase.amendmentTitleRo : activeCase.amendmentTitleEn}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-bold text-[#F5F0E8]">
                  {activeCase.caseName}
                </h3>
                <p className="font-body text-sm font-semibold text-[#E8C878] mt-1">
                  {isRo ? `Dreptul Adus Peste Pod: ${activeCase.rightCarriedRo}` : `Right Carried Across the Bridge: ${activeCase.rightCarriedEn}`}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-[#8B8880]">
                    {isRo ? "Votul Curții" : "Court Vote"}
                  </p>
                  <p className="font-hero text-2xl text-[#C9A84C]">{activeCase.vote}</p>
                </div>
                <div className="text-right border-l border-white/10 pl-4">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-[#8B8880]">
                    {isRo ? "Autorul Opiniei" : "Opinion Author"}
                  </p>
                  <p className="font-body text-xs font-semibold text-[#F5F0E8]">
                    {isRo ? activeCase.authorRo : activeCase.authorEn}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 pt-6">
              <div>
                <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-[#C9A84C] mb-2">
                  {isRo ? "Semnificație Istorică & Impact" : "Historical Significance & Impact"}
                </h4>
                <p className="font-body text-sm leading-relaxed text-[#B8B4AC]">
                  {isRo ? activeCase.significanceRo : activeCase.significanceEn}
                </p>
              </div>

              <div>
                <h4 className="font-body text-xs font-semibold uppercase tracking-wider text-[#C9A84C] mb-2">
                  {isRo ? "Citat Din Opinia Majorității" : "Quote From Majority Opinion"}
                </h4>
                <blockquote className="rounded-xl border-l-2 border-[#C9A84C] bg-white/3 p-4">
                  <p style={{ fontFamily: "'EB Garamond', 'Georgia', serif" }} className="text-sm italic leading-relaxed text-[#F5F0E8]/90">
                    &ldquo;{isRo ? activeCase.quoteRo : activeCase.quoteEn}&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
