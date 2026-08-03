// ─── constitution-text.ts ────────────────────────────────────────────────────
// The full text of the U.S. Constitution as a structured tree, powering the
// interactive reader at /constitution/the-document. Verbatim text is transcribed
// from the National Constitution Center edition (web/ASSETS/Constitution/
// constitution.pdf); text superseded or altered by later amendments is marked
// `amended: true` (shown struck-through with a note in the reader). The document
// text itself stays in its authentic 18th-century English for both locales; the
// annotations (plain English, history, cases, debates, examples) are bilingual.
//
// This file is authored incrementally: the Preamble and Article I are complete
// with full seven-field context. Articles II–VII and Amendments 1–27 are being
// added to the same tree; the reader renders whatever nodes are present.

export interface CaseRef {
  name: string;
  year: string;
  note: string;
  noteRo: string;
}

export interface ClauseContext {
  plain: string;
  plainRo: string;
  history: string;
  historyRo: string;
  cases: CaseRef[];
  amendments: string[]; // related amendment node ids, e.g. "amend-17"
  related: string[]; // related provision node ids
  examples: string;
  examplesRo: string;
  debates: string;
  debatesRo: string;
}

export interface ClauseNode {
  id: string;
  ref: string; // short reference label, e.g. "Art. I, §8"
  heading: string;
  headingRo: string;
  text: string; // verbatim (authentic English)
  textRo?: string; // Romanian translation of the verbatim text
  amended?: boolean;
  amendedNote?: string;
  amendedNoteRo?: string;
  context?: ClauseContext;
  children?: ClauseNode[];
}

export interface ConstitutionEra {
  id: string;
  year: string;
  label: string;
  labelRo: string;
  blurb: string;
  blurbRo: string;
  // node ids that became especially significant in this era
  highlights: string[];
}

// ─── Timeline eras ────────────────────────────────────────────────────────────
export const CONSTITUTION_ERAS: ConstitutionEra[] = [
  { id: "founding", year: "1787", label: "The Founding", labelRo: "Fondarea",
    blurb: "The Convention drafts the frame of government in Philadelphia.",
    blurbRo: "Convenția redactează cadrul guvernării la Philadelphia.",
    highlights: ["art1-s1", "art1-s8", "preamble"] },
  { id: "billofrights", year: "1791", label: "Bill of Rights", labelRo: "Declarația Drepturilor",
    blurb: "The first ten amendments answer Anti-Federalist fears.",
    blurbRo: "Primele zece amendamente răspund temerilor antifederaliste.",
    highlights: ["art1-s9", "art1-s8"] },
  { id: "reconstruction", year: "1865–70", label: "Reconstruction", labelRo: "Reconstrucția",
    blurb: "The 13th, 14th, and 15th Amendments remake the Union after the Civil War.",
    blurbRo: "Amendamentele 13, 14 și 15 refac Uniunea după Războiul Civil.",
    highlights: ["art1-s2", "art1-s9"] },
  { id: "progressive", year: "1913", label: "Progressive Era", labelRo: "Era progresistă",
    blurb: "The income tax and the direct election of Senators reshape Congress.",
    blurbRo: "Impozitul pe venit și alegerea directă a senatorilor remodelează Congresul.",
    highlights: ["art1-s3", "art1-s8", "art1-s9"] },
  { id: "newdeal", year: "1937", label: "The New Deal", labelRo: "New Deal",
    blurb: "The Court reads the Commerce and Spending powers broadly, enabling the modern federal government.",
    blurbRo: "Curtea interpretează larg puterile de comerț și cheltuieli, permițând guvernul federal modern.",
    highlights: ["art1-s8"] },
  { id: "modern", year: "1995–", label: "The Modern Court", labelRo: "Curtea modernă",
    blurb: "Lopez and later cases draw new limits on federal power.",
    blurbRo: "Lopez și cazurile ulterioare trasează noi limite ale puterii federale.",
    highlights: ["art1-s8"] },
];

// ─── The document tree ────────────────────────────────────────────────────────
export const CONSTITUTION: ClauseNode[] = [
  {
    id: "preamble",
    ref: "Preamble",
    heading: "Preamble",
    headingRo: "Preambul",
    text:
      "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.",
    context: {
      plain: "The Constitution is enacted by the people themselves, not by the states, to build a stronger union with six stated goals: justice, peace at home, defense, general welfare, and liberty for this and future generations.",
      plainRo: "Constituția este adoptată de popor însuși, nu de state, pentru a construi o uniune mai puternică, cu șase scopuri declarate: justiție, pace internă, apărare, bunăstare generală și libertate pentru această generație și cele viitoare.",
      history: "The famous opening \"We the People\" was written by Gouverneur Morris on the Committee of Style. An earlier draft listed the states by name; when it was unclear which would ratify, the phrase was generalized, and in doing so it grounded the government's authority in the people rather than the states.",
      historyRo: "Celebrul început „We the People” a fost scris de Gouverneur Morris în Comitetul de Stil. O ciornă anterioară enumera statele pe nume; când a devenit neclar care vor ratifica, formula a fost generalizată, întemeind astfel autoritatea guvernului pe popor, nu pe state.",
      cases: [
        { name: "Chisholm v. Georgia", year: "1793", note: "Early debate over whether \"the people\" or the states are sovereign; soon answered by the 11th Amendment.", noteRo: "Dezbatere timpurie despre cine e suveran, poporul sau statele; curând soluționată prin Amendamentul 11." },
      ],
      amendments: [],
      related: ["art1-s1"],
      examples: "The Preamble has no legal force of its own, but courts and presidents cite its goals, \"a more perfect Union,\" \"the general Welfare,\" when arguing what the document is for.",
      examplesRo: "Preambulul nu are forță juridică proprie, dar instanțele și președinții îi citează scopurile, „o uniune mai perfectă”, „bunăstarea generală”, când argumentează pentru ce există documentul.",
      debates: "Because it lists broad aims like \"the general Welfare,\" some read the Preamble as evidence of expansive federal purpose, while others insist it is a statement of intent that grants no power on its own.",
      debatesRo: "Fiindcă enumeră scopuri largi precum „bunăstarea generală”, unii citesc Preambulul ca dovadă a unui scop federal expansiv, iar alții insistă că e o declarație de intenție care nu acordă nicio putere prin sine.",
    },
  },
  {
    id: "art1",
    ref: "Article I",
    heading: "Article I — The Legislative Branch",
    headingRo: "Articolul I — Puterea Legislativă",
    text: "",
    children: [
      {
        id: "art1-s1", ref: "Art. I, §1", heading: "Section 1 — Legislative Vesting", headingRo: "Secțiunea 1 — Învestirea legislativă",
        text: "All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.",
        context: {
          plain: "Every lawmaking power the Constitution grants belongs to Congress, which is split into two chambers: the Senate and the House.",
          plainRo: "Fiecare putere de a face legi pe care o acordă Constituția aparține Congresului, împărțit în două camere: Senatul și Camera Reprezentanților.",
          history: "The bicameral design was the Great Compromise: a House apportioned by population satisfied the large states, a Senate with equal votes satisfied the small ones. The word \"herein granted\" signals that Congress holds only enumerated powers, not all power.",
          historyRo: "Structura bicamerală a fost Marele Compromis: o Cameră repartizată după populație a mulțumit statele mari, un Senat cu voturi egale le-a mulțumit pe cele mici. Sintagma „aici acordate” arată că Congresul deține doar puteri enumerate, nu toată puterea.",
          cases: [
            { name: "INS v. Chadha", year: "1983", note: "Struck down the legislative veto: if Congress wants to make law, it must use the full bicameral, presentment process.", noteRo: "A anulat vetoul legislativ: dacă Congresul vrea să facă lege, trebuie să folosească procesul bicameral complet." },
            { name: "Clinton v. City of New York", year: "1998", note: "The line-item veto is unconstitutional; a president cannot rewrite laws Congress passed.", noteRo: "Vetoul pe articole e neconstituțional; un președinte nu poate rescrie legile adoptate de Congres." },
          ],
          amendments: ["amend-17"],
          related: ["art1-s7", "art1-s2", "art1-s3"],
          examples: "The \"nondelegation\" debate lives here: how much rulemaking Congress may hand to federal agencies without giving away its own legislative power.",
          examplesRo: "Dezbaterea „nondelegării” trăiește aici: cât din activitatea de reglementare poate ceda Congresul agențiilor federale fără a-și da propria putere legislativă.",
          debates: "\"All legislative Powers\" fuels the modern fight over the administrative state: critics say agencies now write rules that are laws in all but name, supporters say Congress may lawfully delegate detail.",
          debatesRo: "„Toate puterile legislative” alimentează lupta modernă asupra statului administrativ: criticii spun că agențiile scriu acum reguli care sunt legi în tot afară de nume, susținătorii spun că delegarea detaliilor e legală.",
        },
      },
      {
        id: "art1-s2", ref: "Art. I, §2", heading: "Section 2 — The House of Representatives", headingRo: "Secțiunea 2 — Camera Reprezentanților",
        text: "The House of Representatives shall be composed of Members chosen every second Year by the People of the several States, and the Electors in each State shall have the Qualifications requisite for Electors of the most numerous Branch of the State Legislature.\n\nNo Person shall be a Representative who shall not have attained to the Age of twenty five Years, and been seven Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State in which he shall be chosen.\n\nRepresentatives and direct Taxes shall be apportioned among the several States which may be included within this Union, according to their respective Numbers, which shall be determined by adding to the whole Number of free Persons, including those bound to Service for a Term of Years, and excluding Indians not taxed, three fifths of all other Persons. The actual Enumeration shall be made within three Years after the first Meeting of the Congress of the United States, and within every subsequent Term of ten Years, in such Manner as they shall by Law direct. The Number of Representatives shall not exceed one for every thirty Thousand, but each State shall have at Least one Representative; and until such enumeration shall be made, the State of New Hampshire shall be entitled to chuse three, Massachusetts eight, Rhode-Island and Providence Plantations one, Connecticut five, New-York six, New Jersey four, Pennsylvania eight, Delaware one, Maryland six, Virginia ten, North Carolina five, South Carolina five, and Georgia three.\n\nWhen vacancies happen in the Representation from any State, the Executive Authority thereof shall issue Writs of Election to fill such Vacancies.\n\nThe House of Representatives shall chuse their Speaker and other Officers; and shall have the sole Power of Impeachment.",
        amended: true,
        amendedNote: "The \"three fifths\" clause counting enslaved people was repealed by the 14th Amendment (1868), and the census now counts \"the whole number of persons.\"",
        amendedNoteRo: "Clauza „trei cincimi” care număra persoanele înrobite a fost abrogată de Amendamentul 14 (1868); recensământul numără acum „numărul total de persoane”.",
        context: {
          plain: "The House is elected directly by the people every two years, apportioned to each state by population, counted in a census every ten years. It holds the sole power to impeach federal officials.",
          plainRo: "Camera este aleasă direct de popor la fiecare doi ani, repartizată fiecărui stat după populație, numărată printr-un recensământ la fiecare zece ani. Deține puterea exclusivă de a pune sub acuzare oficiali federali.",
          history: "The two-year term keeps the House closest to the popular mood. The three-fifths clause was a grim compromise over slavery that inflated Southern power in the House and the Electoral College until the 14th Amendment erased it.",
          historyRo: "Mandatul de doi ani ține Camera cel mai aproape de starea de spirit populară. Clauza trei cincimi a fost un compromis sumbru asupra sclaviei care a umflat puterea Sudului în Cameră și în Colegiul Electoral până când Amendamentul 14 a șters-o.",
          cases: [
            { name: "Wesberry v. Sanders", year: "1964", note: "\"One person, one vote\": House districts within a state must be roughly equal in population.", noteRo: "„Un om, un vot”: districtele Camerei dintr-un stat trebuie să fie aproximativ egale ca populație." },
            { name: "U.S. Term Limits v. Thornton", year: "1995", note: "States cannot add qualifications for Congress beyond age, citizenship, and residence.", noteRo: "Statele nu pot adăuga calificări pentru Congres dincolo de vârstă, cetățenie și rezidență." },
          ],
          amendments: ["amend-14"],
          related: ["art1-s3", "art1-s9"],
          examples: "Every decade the census triggers reapportionment and the redistricting fights, and the gerrymandering lawsuits, that follow.",
          examplesRo: "În fiecare deceniu recensământul declanșează redistribuirea și luptele de retrasare a districtelor, și procesele privind gerrymandering-ul, care urmează.",
          debates: "Partisan gerrymandering, whether courts may police maps drawn for political advantage, remains one of the most contested questions built on this section.",
          debatesRo: "Gerrymandering-ul partizan, dacă instanțele pot controla hărțile trasate pentru avantaj politic, rămâne una dintre cele mai disputate chestiuni construite pe această secțiune.",
        },
      },
      {
        id: "art1-s3", ref: "Art. I, §3", heading: "Section 3 — The Senate", headingRo: "Secțiunea 3 — Senatul",
        text: "The Senate of the United States shall be composed of two Senators from each State, chosen by the Legislature thereof, for six Years; and each Senator shall have one Vote.\n\nImmediately after they shall be assembled in Consequence of the first Election, they shall be divided as equally as may be into three Classes... so that one third may be chosen every second Year.\n\nNo Person shall be a Senator who shall not have attained to the Age of thirty Years, and been nine Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State for which he shall be chosen.\n\nThe Vice President of the United States shall be President of the Senate, but shall have no Vote, unless they be equally divided.\n\nThe Senate shall have the sole Power to try all Impeachments... And no Person shall be convicted without the Concurrence of two thirds of the Members present.\n\nJudgment in Cases of Impeachment shall not extend further than to removal from Office, and disqualification to hold and enjoy any Office of honor, Trust or Profit under the United States.",
        amended: true,
        amendedNote: "Senators were originally chosen by state legislatures; the 17th Amendment (1913) replaced this with direct popular election.",
        amendedNoteRo: "Senatorii erau aleși inițial de legislaturile statale; Amendamentul 17 (1913) a înlocuit asta cu alegerea populară directă.",
        context: {
          plain: "Each state gets two Senators for six-year terms, with a third of the Senate up for election every two years. The Vice President presides and breaks ties, and the Senate alone conducts impeachment trials, needing a two-thirds vote to remove.",
          plainRo: "Fiecare stat are doi senatori pe mandate de șase ani, o treime din Senat fiind în alegeri la fiecare doi ani. Vicepreședintele prezidează și decide la egalitate, iar Senatul singur judecă procesele de destituire, având nevoie de două treimi pentru a înlătura.",
          history: "Equal state representation, two per state regardless of size, was the price of union for small states and is the one provision the Constitution says can never be amended away without a state's consent. Staggered terms make the Senate a continuous, more deliberate body.",
          historyRo: "Reprezentarea egală a statelor, doi la fiecare stat indiferent de mărime, a fost prețul uniunii pentru statele mici și este singura prevedere despre care Constituția spune că nu poate fi niciodată modificată fără consimțământul unui stat. Mandatele eșalonate fac din Senat un corp continuu și mai deliberativ.",
          cases: [
            { name: "Nixon v. United States", year: "1993", note: "How the Senate runs an impeachment trial is a \"political question\" the courts will not review.", noteRo: "Modul în care Senatul conduce un proces de destituire e o „chestiune politică” pe care instanțele nu o revizuiesc." },
          ],
          amendments: ["amend-17", "amend-12", "amend-25"],
          related: ["art1-s2", "art2-s4"],
          examples: "Three presidents, Andrew Johnson, Bill Clinton, and Donald Trump (twice), have been impeached by the House; none has been convicted by the Senate's two-thirds bar.",
          examplesRo: "Trei președinți, Andrew Johnson, Bill Clinton și Donald Trump (de două ori), au fost puși sub acuzare de Cameră; niciunul nu a fost condamnat de pragul de două treimi al Senatului.",
          debates: "The equal-suffrage rule is criticized as anti-majoritarian, a Wyoming voter has vastly more Senate weight than a Californian, and defended as the essential guarantee of a federal, not merely national, union.",
          debatesRo: "Regula votului egal e criticată ca anti-majoritară, un alegător din Wyoming are mult mai multă greutate în Senat decât unul din California, și apărată ca garanția esențială a unei uniuni federale, nu doar naționale.",
        },
      },
      {
        id: "art1-s4", ref: "Art. I, §4", heading: "Section 4 — Elections & Meetings", headingRo: "Secțiunea 4 — Alegeri și întruniri",
        text: "The Times, Places and Manner of holding Elections for Senators and Representatives, shall be prescribed in each State by the Legislature thereof; but the Congress may at any time by Law make or alter such Regulations, except as to the Places of chusing Senators.\n\nThe Congress shall assemble at least once in every Year, and such Meeting shall be on the first Monday in December, unless they shall by Law appoint a different Day.",
        amended: true,
        amendedNote: "The 20th Amendment (1933) moved the start of Congress's session from December to January 3.",
        amendedNoteRo: "Amendamentul 20 (1933) a mutat începutul sesiunii Congresului din decembrie pe 3 ianuarie.",
        context: {
          plain: "States set the time, place, and manner of congressional elections, but Congress can override those rules. Congress must meet at least once a year.",
          plainRo: "Statele stabilesc timpul, locul și modul alegerilor pentru Congres, dar Congresul poate anula aceste reguli. Congresul trebuie să se întrunească cel puțin o dată pe an.",
          history: "The Elections Clause gives states the first move but Congress the last word, a safeguard the Framers added so states could not quietly strangle the federal legislature by refusing to hold elections.",
          historyRo: "Clauza Alegerilor dă statelor prima mutare, dar Congresului ultimul cuvânt, o garanție pe care Fondatorii au adăugat-o pentru ca statele să nu poată sugruma discret legislativul federal refuzând să organizeze alegeri.",
          cases: [
            { name: "Arizona State Legislature v. Arizona Ind. Redistricting Comm'n", year: "2015", note: "\"The Legislature\" can include the people acting through ballot initiatives, upholding independent redistricting commissions.", noteRo: "„Legislatura” poate include poporul care acționează prin inițiative, confirmând comisiile independente de redistribuire." },
            { name: "Moore v. Harper", year: "2023", note: "Rejected the strong \"independent state legislature\" theory; state courts may review election rules.", noteRo: "A respins teoria puternică a „legislaturii statale independente”; instanțele statale pot revizui regulile electorale." },
          ],
          amendments: ["amend-20"],
          related: ["art1-s5", "art1-s2"],
          examples: "Federal laws like the Voting Rights Act and national election-day rules rest on Congress's power under this clause.",
          examplesRo: "Legi federale precum Voting Rights Act și regulile naționale privind ziua alegerilor se bazează pe puterea Congresului din această clauză.",
          debates: "The \"independent state legislature\" theory, that state courts and constitutions cannot check legislatures on federal election rules, was a major recent controversy, largely rejected in Moore v. Harper.",
          debatesRo: "Teoria „legislaturii statale independente”, că instanțele și constituțiile statale nu pot controla legislaturile în regulile electorale federale, a fost o controversă recentă majoră, respinsă în mare parte în Moore v. Harper.",
        },
      },
      {
        id: "art1-s5", ref: "Art. I, §5", heading: "Section 5 — Rules & Proceedings", headingRo: "Secțiunea 5 — Reguli și proceduri",
        text: "Each House shall be the Judge of the Elections, Returns and Qualifications of its own Members, and a Majority of each shall constitute a Quorum to do Business...\n\nEach House may determine the Rules of its Proceedings, punish its Members for disorderly Behaviour, and, with the Concurrence of two thirds, expel a Member.\n\nEach House shall keep a Journal of its Proceedings, and from time to time publish the same... the Yeas and Nays of the Members of either House on any question shall, at the Desire of one fifth of those Present, be entered on the Journal.\n\nNeither House, during the Session of Congress, shall, without the Consent of the other, adjourn for more than three days.",
        context: {
          plain: "Each chamber judges its own members' elections and qualifications, sets its own rules, can punish or expel members by a two-thirds vote, and must keep and publish a journal of its proceedings.",
          plainRo: "Fiecare cameră judecă alegerile și calificările propriilor membri, își stabilește regulile, poate pedepsi sau exclude membri cu două treimi și trebuie să țină și să publice un jurnal al lucrărilor.",
          history: "These housekeeping powers make each chamber self-governing. The filibuster, the Senate rule that in practice requires sixty votes to end debate, grows out of \"Each House may determine the Rules of its Proceedings.\"",
          historyRo: "Aceste puteri interne fac fiecare cameră autonomă. Filibuster-ul, regula Senatului care în practică cere șaizeci de voturi pentru a încheia dezbaterea, decurge din „Fiecare cameră își poate stabili regulile”.",
          cases: [
            { name: "Powell v. McCormack", year: "1969", note: "The House may judge only the three constitutional qualifications; it cannot exclude a duly elected member for other reasons.", noteRo: "Camera poate judeca doar cele trei calificări constituționale; nu poate exclude un membru ales legal din alte motive." },
          ],
          amendments: [],
          related: ["art1-s2", "art1-s3"],
          examples: "The Senate filibuster, the House and Senate ethics committees, and the published Congressional Record all flow from this section.",
          examplesRo: "Filibuster-ul din Senat, comisiile de etică ale Camerei și Senatului și Congressional Record publicat decurg toate din această secțiune.",
          debates: "Whether the filibuster should survive, or whether it distorts the Constitution's usual majority rule, is a recurring flashpoint that turns on this clause.",
          debatesRo: "Dacă filibuster-ul ar trebui să supraviețuiască, sau dacă distorsionează regula obișnuită a majorității din Constituție, e un punct de tensiune recurent care se sprijină pe această clauză.",
        },
      },
      {
        id: "art1-s6", ref: "Art. I, §6", heading: "Section 6 — Pay & Privileges", headingRo: "Secțiunea 6 — Remunerație și privilegii",
        text: "The Senators and Representatives shall receive a Compensation for their Services, to be ascertained by Law, and paid out of the Treasury of the United States. They shall in all Cases, except Treason, Felony and Breach of the Peace, be privileged from Arrest during their Attendance at the Session of their respective Houses... and for any Speech or Debate in either House, they shall not be questioned in any other Place.\n\nNo Senator or Representative shall, during the Time for which he was elected, be appointed to any civil Office under the Authority of the United States, which shall have been created, or the Emoluments whereof shall have been encreased during such time; and no Person holding any Office under the United States, shall be a Member of either House during his Continuance in Office.",
        context: {
          plain: "Members of Congress are paid from the Treasury and protected by the Speech or Debate Clause from being sued or prosecuted for what they say in Congress. They cannot simultaneously hold another federal office.",
          plainRo: "Membrii Congresului sunt plătiți din Trezorerie și protejați de Clauza Discursului sau Dezbaterii împotriva urmăririi pentru ce spun în Congres. Nu pot deține simultan o altă funcție federală.",
          history: "The Speech or Debate Clause is inherited from the English Bill of Rights of 1689; it protects legislators from a hostile executive, so they can debate freely. The Incompatibility Clause keeps Congress and the executive branch staffed by different people, a core of the separation of powers.",
          historyRo: "Clauza Discursului sau Dezbaterii e moștenită din Declarația Drepturilor engleză din 1689; îi protejează pe legislatori de un executiv ostil, ca să dezbată liber. Clauza Incompatibilității ține Congresul și executivul cu oameni diferiți, un nucleu al separării puterilor.",
          cases: [
            { name: "Gravel v. United States", year: "1972", note: "The Speech or Debate Clause shields a senator and his aides, but not conduct beyond the legislative sphere.", noteRo: "Clauza protejează un senator și asistenții săi, dar nu conduita din afara sferei legislative." },
          ],
          amendments: ["amend-27"],
          related: ["art1-s5", "art2-s1"],
          examples: "The Speech or Debate Clause is why members can read classified material into the record or make accusations on the floor without being sued for defamation.",
          examplesRo: "Datorită acestei clauze, membrii pot citi material clasificat în procesul-verbal sau pot face acuzații în plen fără a fi dați în judecată pentru defăimare.",
          debates: "The 27th Amendment, ratified in 1992 after over 200 years, grew from this pay clause: it delays any congressional pay raise until after the next election.",
          debatesRo: "Amendamentul 27, ratificat în 1992 după peste 200 de ani, a crescut din această clauză: amână orice majorare a salariilor Congresului până după următoarele alegeri.",
        },
      },
      {
        id: "art1-s7", ref: "Art. I, §7", heading: "Section 7 — How a Bill Becomes Law", headingRo: "Secțiunea 7 — Cum devine lege un proiect",
        text: "All Bills for raising Revenue shall originate in the House of Representatives; but the Senate may propose or concur with Amendments as on other Bills.\n\nEvery Bill which shall have passed the House of Representatives and the Senate, shall, before it become a Law, be presented to the President of the United States; If he approve he shall sign it, but if not he shall return it, with his Objections to that House in which it shall have originated... If after such Reconsideration two thirds of that House shall agree to pass the Bill... it shall become a Law. If any Bill shall not be returned by the President within ten Days (Sundays excepted) after it shall have been presented to him, the Same shall be a Law... unless the Congress by their Adjournment prevent its Return, in which Case it shall not be a Law.",
        context: {
          plain: "Tax bills must start in the House. Any bill needs to pass both chambers and be presented to the President, who can sign it, veto it, or let it become law after ten days. Congress can override a veto with a two-thirds vote in each chamber.",
          plainRo: "Proiectele fiscale trebuie să înceapă în Cameră. Orice proiect trebuie adoptat de ambele camere și prezentat Președintelui, care îl poate semna, respinge sau lăsa să devină lege după zece zile. Congresul poate trece peste veto cu două treimi în fiecare cameră.",
          history: "The Presentment Clause is the engine of lawmaking and a pillar of the separation of powers: no law without both chambers and the President (or a supermajority override). The \"pocket veto,\" letting an unsigned bill die when Congress adjourns, comes from the last sentence.",
          historyRo: "Clauza Prezentării e motorul legiferării și un pilon al separării puterilor: nicio lege fără ambele camere și Președinte (sau o supermajoritate care trece peste veto). „Vetoul de buzunar”, lăsarea unui proiect nesemnat să moară la suspendarea Congresului, vine din ultima frază.",
          cases: [
            { name: "INS v. Chadha", year: "1983", note: "Any action that alters legal rights must go through bicameralism and presentment.", noteRo: "Orice acțiune care schimbă drepturi legale trebuie să treacă prin bicameralism și prezentare." },
            { name: "Clinton v. City of New York", year: "1998", note: "The President cannot cancel parts of a signed law; presentment is all-or-nothing.", noteRo: "Președintele nu poate anula părți dintr-o lege semnată; prezentarea e totul sau nimic." },
          ],
          amendments: [],
          related: ["art1-s1", "art2-s1"],
          examples: "Presidential vetoes and override votes, and the ten-day \"pocket veto\" window at the end of a session, all run on this clause.",
          examplesRo: "Vetourile prezidențiale și voturile de trecere peste veto, și fereastra de zece zile a „vetoului de buzunar” la finalul unei sesiuni, funcționează toate pe această clauză.",
          debates: "The line-item veto, popular with reformers who want to strike wasteful spending, was ruled unconstitutional under this section, so the debate now runs to constitutional amendment.",
          debatesRo: "Vetoul pe articole, popular la reformatorii care vor să taie cheltuieli risipitoare, a fost declarat neconstituțional sub această secțiune, așa că dezbaterea se mută acum spre amendament constituțional.",
        },
      },
      {
        id: "art1-s8", ref: "Art. I, §8", heading: "Section 8 — The Powers of Congress", headingRo: "Secțiunea 8 — Puterile Congresului",
        text: "The Congress shall have Power To lay and collect Taxes, Duties, Imposts and Excises, to pay the Debts and provide for the common Defence and general Welfare of the United States...\n\nTo borrow Money on the credit of the United States;\n\nTo regulate Commerce with foreign Nations, and among the several States, and with the Indian Tribes;\n\nTo establish an uniform Rule of Naturalization, and uniform Laws on the subject of Bankruptcies...\n\nTo coin Money, regulate the Value thereof... and fix the Standard of Weights and Measures;\n\nTo establish Post Offices and post Roads;\n\nTo promote the Progress of Science and useful Arts, by securing for limited Times to Authors and Inventors the exclusive Right to their respective Writings and Discoveries;\n\nTo constitute Tribunals inferior to the supreme Court;\n\nTo declare War... To raise and support Armies... To provide and maintain a Navy;\n\nTo exercise exclusive Legislation... over such District... as may... become the Seat of the Government of the United States;\n\n—And To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers, and all other Powers vested by this Constitution in the Government of the United States.",
        context: {
          plain: "This is the list of things Congress may actually do: tax and spend, borrow, regulate interstate and foreign commerce, set up money and patents and post offices, create lower courts, raise armies and declare war, govern the capital, and, finally, make any law \"necessary and proper\" to carry those powers out.",
          plainRo: "Aceasta e lista lucrurilor pe care Congresul le poate face de fapt: să impoziteze și să cheltuiască, să împrumute, să reglementeze comerțul interstatal și extern, să bată monedă, să acorde patente, să creeze instanțe inferioare, să ridice armate și să declare război, să guverneze capitala și, în final, să facă orice lege „necesară și potrivită” pentru a duce la capăt aceste puteri.",
          history: "Section 8 is the source of nearly all federal power. The Commerce Clause and the Necessary and Proper Clause, argued by Hamilton and confirmed in McCulloch v. Maryland, are the twin engines that let a government of enumerated powers grow to meet a continental nation.",
          historyRo: "Secțiunea 8 e sursa aproape a întregii puteri federale. Clauza Comerțului și Clauza Necesar și Potrivit, argumentate de Hamilton și confirmate în McCulloch v. Maryland, sunt motoarele gemene care permit unui guvern cu puteri enumerate să crească pentru o națiune continentală.",
          cases: [
            { name: "McCulloch v. Maryland", year: "1819", note: "\"Necessary and proper\" means convenient and useful, not strictly indispensable; Congress could charter a national bank.", noteRo: "„Necesar și potrivit” înseamnă convenabil și util, nu strict indispensabil; Congresul putea înființa o bancă națională." },
            { name: "Wickard v. Filburn", year: "1942", note: "Congress may regulate even wheat grown for home use, because in the aggregate it affects interstate commerce.", noteRo: "Congresul poate reglementa chiar grâul cultivat pentru consum propriu, fiindcă în ansamblu afectează comerțul interstatal." },
            { name: "United States v. Lopez", year: "1995", note: "A first modern limit: carrying a gun near a school is not economic activity Congress can reach through commerce.", noteRo: "O primă limită modernă: purtarea unei arme lângă o școală nu e activitate economică pe care Congresul o poate atinge prin comerț." },
            { name: "NFIB v. Sebelius", year: "2012", note: "The individual mandate exceeded the Commerce power but was upheld as a tax.", noteRo: "Mandatul individual depășea puterea de comerț, dar a fost menținut ca impozit." },
          ],
          amendments: ["amend-16", "amend-10"],
          related: ["art1-s9", "art1-s1"],
          examples: "Federal civil-rights laws, environmental and drug laws, Social Security, Medicare, and the interstate highway system all rest on the taxing, spending, and commerce powers here.",
          examplesRo: "Legile federale privind drepturile civile, mediul și drogurile, Social Security, Medicare și sistemul de autostrăzi interstatale se sprijină toate pe puterile de impozitare, cheltuire și comerț de aici.",
          debates: "How far the Commerce and Spending powers reach is the central fight of American constitutional law: broad enough for the New Deal and civil-rights era, but Lopez and NFIB show the Court still polices an outer edge.",
          debatesRo: "Cât de departe ajung puterile de comerț și cheltuieli e lupta centrală a dreptului constituțional american: destul de largi pentru New Deal și era drepturilor civile, dar Lopez și NFIB arată că instanța încă păzește o margine exterioară.",
        },
      },
      {
        id: "art1-s9", ref: "Art. I, §9", heading: "Section 9 — Limits on Congress", headingRo: "Secțiunea 9 — Limite asupra Congresului",
        text: "The Privilege of the Writ of Habeas Corpus shall not be suspended, unless when in Cases of Rebellion or Invasion the public Safety may require it.\n\nNo Bill of Attainder or ex post facto Law shall be passed.\n\nNo Money shall be drawn from the Treasury, but in Consequence of Appropriations made by Law; and a regular Statement and Account of the Receipts and Expenditures of all public Money shall be published from time to time.\n\nNo Title of Nobility shall be granted by the United States: And no Person holding any Office of Profit or Trust under them, shall, without the Consent of the Congress, accept of any present, Emolument, Office, or Title, of any kind whatever, from any King, Prince, or foreign State.",
        amended: true,
        amendedNote: "The clause protecting the slave trade until 1808, and the direct-tax apportionment rule, are omitted here; the latter was altered by the 16th Amendment (1913).",
        amendedNoteRo: "Clauza care proteja comerțul cu sclavi până în 1808 și regula repartizării impozitului direct sunt omise aici; ultima a fost modificată de Amendamentul 16 (1913).",
        context: {
          plain: "Even Congress has limits: it cannot suspend habeas corpus except in rebellion or invasion, cannot pass laws punishing named people (bills of attainder) or crimes made retroactive (ex post facto), cannot spend money without an appropriation, and officials cannot take gifts or titles from foreign states.",
          plainRo: "Chiar și Congresul are limite: nu poate suspenda habeas corpus decât în rebeliune sau invazie, nu poate adopta legi care pedepsesc persoane numite (bills of attainder) sau infracțiuni retroactive (ex post facto), nu poate cheltui fără o alocare, iar oficialii nu pot primi daruri sau titluri de la state străine.",
          history: "These are ancient guarantees of liberty. Habeas corpus, the right to challenge unlawful detention, is the \"Great Writ\" of English law. The Emoluments Clause was meant to keep American officials free of foreign bribery.",
          historyRo: "Acestea sunt garanții străvechi ale libertății. Habeas corpus, dreptul de a contesta detenția ilegală, e „Marele Ordin” al dreptului englez. Clauza Emolumentelor trebuia să țină oficialii americani liberi de mituirea străină.",
          cases: [
            { name: "Ex parte Milligan", year: "1866", note: "Civilians cannot be tried by military tribunals where civil courts are open, even in wartime.", noteRo: "Civilii nu pot fi judecați de tribunale militare unde instanțele civile funcționează, chiar în război." },
            { name: "Boumediene v. Bush", year: "2008", note: "Guantánamo detainees retain the habeas corpus right; Congress cannot simply strip it.", noteRo: "Deținuții de la Guantánamo păstrează dreptul la habeas corpus; Congresul nu îl poate elimina pur și simplu." },
          ],
          amendments: ["amend-16", "amend-13"],
          related: ["art1-s8", "art1-s10"],
          examples: "Lincoln's suspension of habeas corpus in the Civil War, the ban on retroactive criminal laws, and the modern Emoluments Clause lawsuits all live in this section.",
          examplesRo: "Suspendarea lui Lincoln a habeas corpus în Războiul Civil, interdicția legilor penale retroactive și procesele moderne privind Clauza Emolumentelor trăiesc toate în această secțiune.",
          debates: "When and by whom habeas corpus may be suspended, and how far the Emoluments Clause reaches a president's private business, are live constitutional disputes.",
          debatesRo: "Când și de către cine poate fi suspendat habeas corpus, și cât de departe ajunge Clauza Emolumentelor la afacerile private ale unui președinte, sunt dispute constituționale vii.",
        },
      },
      {
        id: "art1-s10", ref: "Art. I, §10", heading: "Section 10 — Limits on the States", headingRo: "Secțiunea 10 — Limite asupra statelor",
        text: "No State shall enter into any Treaty, Alliance, or Confederation; grant Letters of Marque and Reprisal; coin Money; emit Bills of Credit; make any Thing but gold and silver Coin a Tender in Payment of Debts; pass any Bill of Attainder, ex post facto Law, or Law impairing the Obligation of Contracts, or grant any Title of Nobility.\n\nNo State shall, without the Consent of the Congress, lay any Imposts or Duties on Imports or Exports...\n\nNo State shall, without the Consent of Congress, lay any Duty of Tonnage, keep Troops, or Ships of War in time of Peace, enter into any Agreement or Compact with another State, or with a foreign Power, or engage in War, unless actually invaded.",
        context: {
          plain: "The states are barred from acting like independent nations: no treaties, no coining money, no tariffs without Congress, no armies in peacetime, and no laws breaking existing contracts.",
          plainRo: "Statelor le e interzis să se poarte ca națiuni independente: fără tratate, fără baterea de monedă, fără tarife fără Congres, fără armate pe timp de pace și fără legi care rup contracte existente.",
          history: "These bans fix the great failure of the Articles of Confederation, where states waged trade wars and printed worthless money. Reserving foreign affairs and a single currency to the national government is what turned thirteen states into one economy.",
          historyRo: "Aceste interdicții repară marele eșec al Articolelor Confederației, unde statele purtau războaie comerciale și tipăreau bani fără valoare. Rezervarea afacerilor externe și a unei singure monede guvernului național e ceea ce a transformat treisprezece state într-o singură economie.",
          cases: [
            { name: "Fletcher v. Peck", year: "1810", note: "The first case to strike down a state law under the Contracts Clause.", noteRo: "Primul caz care a anulat o lege statală în baza Clauzei Contractelor." },
            { name: "Home Building & Loan Ass'n v. Blaisdell", year: "1934", note: "In an emergency, states have some room to adjust contract remedies.", noteRo: "Într-o urgență, statele au ceva spațiu să ajusteze remediile contractuale." },
          ],
          amendments: [],
          related: ["art1-s8", "art1-s9"],
          examples: "Interstate compacts, like the one governing the Port Authority of New York and New Jersey, need congressional consent under this section.",
          examplesRo: "Pactele interstatale, precum cel care guvernează Autoritatea Portuară din New York și New Jersey, au nevoie de consimțământul Congresului sub această secțiune.",
          debates: "The Contracts Clause was once a major limit on state economic regulation; how strong it should be against modern debtor-relief and rent laws is still argued.",
          debatesRo: "Clauza Contractelor a fost cândva o limită majoră asupra reglementării economice statale; cât de puternică ar trebui să fie față de legile moderne de ajutorare a debitorilor și de chirie e încă disputat.",
        },
      },
    ],
  },

  // ─── Article II — The Executive ─────────────────────────────────────────────
  {
    id: "art2",
    ref: "Article II",
    heading: "Article II — The Executive Branch",
    headingRo: "Articolul II — Puterea Executivă",
    text: "",
    children: [
      {
        id: "art2-s1", ref: "Art. II, §1", heading: "Section 1 — The Presidency & Election", headingRo: "Secțiunea 1 — Președinția și alegerea",
        text: "The executive Power shall be vested in a President of the United States of America. He shall hold his Office during the Term of four Years, and, together with the Vice President, chosen for the same Term, be elected, as follows:\n\nEach State shall appoint, in such Manner as the Legislature thereof may direct, a Number of Electors, equal to the whole Number of Senators and Representatives to which the State may be entitled in the Congress...\n\nThe Congress may determine the Time of chusing the Electors, and the Day on which they shall give their Votes; which Day shall be the same throughout the United States.\n\nNo Person except a natural born Citizen... shall be eligible to the Office of President; neither shall any person be eligible to that Office who shall not have attained to the Age of thirty five Years, and been fourteen Years a Resident within the United States.\n\nBefore he enter on the Execution of his Office, he shall take the following Oath or Affirmation:—\"I do solemnly swear (or affirm) that I will faithfully execute the Office of President of the United States, and will to the best of my Ability, preserve, protect and defend the Constitution of the United States.\"",
        amended: true,
        amendedNote: "The original procedure for electors to cast two undifferentiated votes was replaced by the 12th Amendment (1804), which created separate ballots for President and Vice President. Succession is now governed by the 25th Amendment (1967).",
        amendedNoteRo: "Procedura originală prin care electorii dădeau două voturi nediferențiate a fost înlocuită de Amendamentul 12 (1804), care a creat buletine separate pentru Președinte și Vicepreședinte. Succesiunea e guvernată acum de Amendamentul 25 (1967).",
        context: {
          plain: "A single President holds the executive power for a four-year term, chosen not directly by voters but by electors each state appoints, the Electoral College. The President must be a natural-born citizen at least 35 years old and takes a fixed oath to defend the Constitution.",
          plainRo: "Un singur Președinte deține puterea executivă pentru un mandat de patru ani, ales nu direct de alegători, ci de electori numiți de fiecare stat, Colegiul Electoral. Președintele trebuie să fie cetățean născut în SUA, de cel puțin 35 de ani, și depune un jurământ fix de a apăra Constituția.",
          history: "The Electoral College was a compromise between electing the President by Congress and by direct popular vote. The Framers vested \"the executive power\" in one person, rejecting a plural executive, so responsibility would be clear.",
          historyRo: "Colegiul Electoral a fost un compromis între alegerea Președintelui de către Congres și votul popular direct. Fondatorii au învestit „puterea executivă” într-o singură persoană, respingând un executiv plural, pentru ca responsabilitatea să fie clară.",
          cases: [
            { name: "Bush v. Gore", year: "2000", note: "Halted a Florida recount, effectively deciding the presidential election on Equal Protection grounds.", noteRo: "A oprit renumărarea din Florida, decizând efectiv alegerile prezidențiale pe temeiul Egalei Protecții." },
            { name: "Chiafalo v. Washington", year: "2020", note: "States may bind their electors to the popular vote and penalize \"faithless\" electors.", noteRo: "Statele își pot obliga electorii să respecte votul popular și pot penaliza electorii „necredincioși”." },
          ],
          amendments: ["amend-12", "amend-22", "amend-25"],
          related: ["art2-s2", "art1-s3"],
          examples: "Every four years the Electoral College, not the national popular vote, formally chooses the President, and twice since 2000 the popular-vote loser has won the presidency.",
          examplesRo: "La fiecare patru ani Colegiul Electoral, nu votul popular național, alege formal Președintele, iar de două ori din 2000 câștigătorul a fost cel care a pierdut votul popular.",
          debates: "Whether to abolish the Electoral College for a national popular vote is one of the longest-running structural debates in American politics.",
          debatesRo: "Dacă să se desființeze Colegiul Electoral în favoarea votului popular național e una dintre cele mai vechi dezbateri structurale din politica americană.",
        },
      },
      {
        id: "art2-s2", ref: "Art. II, §2", heading: "Section 2 — Powers of the President", headingRo: "Secțiunea 2 — Puterile Președintelui",
        text: "The President shall be Commander in Chief of the Army and Navy of the United States, and of the Militia of the several States, when called into the actual Service of the United States... and he shall have Power to grant Reprieves and Pardons for Offenses against the United States, except in Cases of Impeachment.\n\nHe shall have Power, by and with the Advice and Consent of the Senate, to make Treaties, provided two thirds of the Senators present concur; and he shall nominate, and by and with the Advice and Consent of the Senate, shall appoint Ambassadors, other public Ministers and Consuls, Judges of the supreme Court, and all other Officers of the United States...\n\nThe President shall have Power to fill up all Vacancies that may happen during the Recess of the Senate.",
        context: {
          plain: "The President commands the military, can grant pardons, makes treaties with two-thirds Senate approval, and nominates ambassadors, judges, and other officers, who need Senate confirmation.",
          plainRo: "Președintele comandă armata, poate acorda grațieri, încheie tratate cu aprobarea a două treimi din Senat și numește ambasadori, judecători și alți funcționari, care au nevoie de confirmarea Senatului.",
          history: "The Appointments and Treaty Clauses are the Senate's principal checks on the President. The pardon power, nearly unlimited for federal crimes, descends from the royal prerogative of mercy.",
          historyRo: "Clauzele Numirilor și Tratatelor sunt principalele controale ale Senatului asupra Președintelui. Puterea de grațiere, aproape nelimitată pentru infracțiuni federale, coboară din prerogativa regală a milei.",
          cases: [
            { name: "NLRB v. Noel Canning", year: "2014", note: "Limited the recess-appointment power; the Senate decides when it is in recess.", noteRo: "A limitat puterea numirilor în vacanță; Senatul decide când e în vacanță." },
            { name: "Trump v. United States", year: "2024", note: "Recognized broad presidential immunity for official acts within core executive powers.", noteRo: "A recunoscut o imunitate prezidențială largă pentru actele oficiale din puterile executive de bază." },
          ],
          amendments: [],
          related: ["art2-s1", "art1-s8", "art3-s1"],
          examples: "Supreme Court confirmations, treaty ratifications, and high-profile pardons all run through the powers listed here.",
          examplesRo: "Confirmările la Curtea Supremă, ratificările de tratate și grațierile de mare profil trec toate prin puterile enumerate aici.",
          debates: "How far the commander-in-chief power lets a President wage war without Congress, and how far the pardon power reaches, are enduring separation-of-powers disputes.",
          debatesRo: "Cât de departe îi permite puterea de comandant-șef unui Președinte să poarte război fără Congres, și cât de departe ajunge puterea de grațiere, sunt dispute durabile ale separării puterilor.",
        },
      },
      {
        id: "art2-s3", ref: "Art. II, §3", heading: "Section 3 — Duties: Take Care", headingRo: "Secțiunea 3 — Îndatoriri: Vegherea legii",
        text: "He shall from time to time give to the Congress Information of the State of the Union, and recommend to their Consideration such Measures as he shall judge necessary and expedient... he shall receive Ambassadors and other public Ministers; he shall take Care that the Laws be faithfully executed, and shall Commission all the Officers of the United States.",
        context: {
          plain: "The President must report to Congress on the state of the union, may recommend legislation, receives foreign ambassadors, and above all must \"take Care that the Laws be faithfully executed.\"",
          plainRo: "Președintele trebuie să raporteze Congresului despre starea uniunii, poate recomanda legi, primește ambasadori străini și, mai presus de toate, trebuie să „vegheze ca legile să fie fidel executate”.",
          history: "The Take Care Clause makes the President the nation's chief law-enforcer, bound to carry out laws even ones he opposes. The duty to \"receive Ambassadors\" grew into the President's dominant role in recognizing foreign governments.",
          historyRo: "Clauza Vegherii face din Președinte principalul executor al legii națiunii, obligat să aplice legi chiar și pe cele la care se opune. Datoria de a „primi ambasadori” a crescut în rolul dominant al Președintelui de a recunoaște guverne străine.",
          cases: [
            { name: "Youngstown Sheet & Tube v. Sawyer", year: "1952", note: "The President cannot seize private steel mills; executive power is at its lowest against Congress's will.", noteRo: "Președintele nu poate confisca oțelării private; puterea executivă e la minim împotriva voinței Congresului." },
          ],
          amendments: [],
          related: ["art2-s2", "art1-s7"],
          examples: "The annual State of the Union address and disputes over enforcing (or declining to enforce) immigration and other laws rest on this section.",
          examplesRo: "Discursul anual despre Starea Uniunii și disputele privind aplicarea (sau neaplicarea) legilor de imigrație și a altora se sprijină pe această secțiune.",
          debates: "Prosecutorial discretion, how far a President may decline to enforce laws he disagrees with, is a recurring Take Care Clause controversy.",
          debatesRo: "Discreția de urmărire penală, cât de departe poate un Președinte refuza să aplice legi cu care nu e de acord, e o controversă recurentă a Clauzei Vegherii.",
        },
      },
      {
        id: "art2-s4", ref: "Art. II, §4", heading: "Section 4 — Impeachment", headingRo: "Secțiunea 4 — Punerea sub acuzare",
        text: "The President, Vice President and all civil Officers of the United States, shall be removed from Office on Impeachment for, and Conviction of, Treason, Bribery, or other high Crimes and Misdemeanors.",
        context: {
          plain: "The President, Vice President, and other federal officials can be removed for treason, bribery, or \"high Crimes and Misdemeanors\", impeached by the House and convicted by the Senate.",
          plainRo: "Președintele, Vicepreședintele și alți oficiali federali pot fi înlăturați pentru trădare, mituire sau „infracțiuni și delicte grave”, puși sub acuzare de Cameră și condamnați de Senat.",
          history: "\"High Crimes and Misdemeanors\" is borrowed from English impeachment practice and was left deliberately broad, covering serious abuses of public trust, not only indictable crimes.",
          historyRo: "„Infracțiuni și delicte grave” e împrumutat din practica engleză a punerii sub acuzare și a fost lăsat deliberat larg, acoperind abuzuri grave de încredere publică, nu doar infracțiuni penale.",
          cases: [],
          amendments: ["amend-25"],
          related: ["art1-s2", "art1-s3"],
          examples: "Three presidents have been impeached; the process links directly to the House's sole power to impeach and the Senate's sole power to try.",
          examplesRo: "Trei președinți au fost puși sub acuzare; procesul se leagă direct de puterea exclusivă a Camerei de a acuza și a Senatului de a judeca.",
          debates: "What counts as a \"high Crime\", and whether impeachment is a legal or fundamentally political judgment, is argued every time it is used.",
          debatesRo: "Ce contează drept „infracțiune gravă” și dacă punerea sub acuzare e o judecată juridică sau fundamental politică se dezbate de fiecare dată când e folosită.",
        },
      },
    ],
  },

  // ─── Article III — The Judiciary ────────────────────────────────────────────
  {
    id: "art3",
    ref: "Article III",
    heading: "Article III — The Judicial Branch",
    headingRo: "Articolul III — Puterea Judecătorească",
    text: "",
    children: [
      {
        id: "art3-s1", ref: "Art. III, §1", heading: "Section 1 — The Courts", headingRo: "Secțiunea 1 — Instanțele",
        text: "The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish. The Judges, both of the supreme and inferior Courts, shall hold their Offices during good Behaviour, and shall, at stated Times, receive for their Services, a Compensation, which shall not be diminished during their Continuance in Office.",
        context: {
          plain: "There is one Supreme Court, and Congress may create the lower federal courts. Federal judges serve \"during good Behaviour\", effectively for life, and their pay cannot be cut, to keep them independent.",
          plainRo: "Există o singură Curte Supremă, iar Congresul poate crea instanțele federale inferioare. Judecătorii federali servesc „cât timp se poartă bine”, practic pe viață, iar salariul nu le poate fi redus, pentru a le păstra independența.",
          history: "Life tenure and protected salaries were the Framers' answer to how you make judges fearless: a judge who cannot be fired or starved out can rule against the powerful.",
          historyRo: "Mandatul pe viață și salariile protejate au fost răspunsul Fondatorilor la cum faci judecătorii neînfricați: un judecător care nu poate fi concediat sau înfometat poate decide împotriva celor puternici.",
          cases: [
            { name: "Marbury v. Madison", year: "1803", note: "Established judicial review, the Court's power to strike down laws that violate the Constitution.", noteRo: "A stabilit controlul judiciar, puterea Curții de a anula legile care încalcă Constituția." },
          ],
          amendments: [],
          related: ["art3-s2", "art2-s2"],
          examples: "The entire federal court system, from district courts to the Supreme Court, is built on this one section.",
          examplesRo: "Întregul sistem judiciar federal, de la instanțele de district la Curtea Supremă, e construit pe această singură secțiune.",
          debates: "Whether life tenure still serves the country, and proposals for Supreme Court term limits, spring directly from \"good Behaviour.\"",
          debatesRo: "Dacă mandatul pe viață mai servește țara, și propunerile pentru limitarea mandatelor la Curtea Supremă, izvorăsc direct din „buna purtare”.",
        },
      },
      {
        id: "art3-s2", ref: "Art. III, §2", heading: "Section 2 — Jurisdiction & Jury Trial", headingRo: "Secțiunea 2 — Competența și judecata cu jurați",
        text: "The judicial Power shall extend to all Cases, in Law and Equity, arising under this Constitution, the Laws of the United States, and Treaties made... to Controversies between two or more States;... between Citizens of different States...\n\nIn all Cases affecting Ambassadors... and those in which a State shall be Party, the supreme Court shall have original Jurisdiction. In all the other Cases before mentioned, the supreme Court shall have appellate Jurisdiction...\n\nThe Trial of all Crimes, except in Cases of Impeachment, shall be by Jury; and such Trial shall be held in the State where the said Crimes shall have been committed.",
        amended: true,
        amendedNote: "Suits against a state by citizens of another state were removed from federal jurisdiction by the 11th Amendment (1795).",
        amendedNoteRo: "Procesele împotriva unui stat de către cetățeni ai altui stat au fost scoase din competența federală de Amendamentul 11 (1795).",
        context: {
          plain: "Federal courts hear cases arising under the Constitution and federal law, disputes between states, and cases between citizens of different states. The Supreme Court hears a few kinds of cases first, and the rest on appeal. All federal crimes must be tried by jury.",
          plainRo: "Instanțele federale judecă procese ce decurg din Constituție și legea federală, dispute între state și cazuri între cetățeni ai unor state diferite. Curtea Supremă judecă câteva tipuri de cazuri direct, restul în apel. Toate infracțiunile federale trebuie judecate cu jurați.",
          history: "This section defines the reach of federal courts. \"Arising under this Constitution\" plus Marbury's judicial review is what makes the Supreme Court the final word on constitutional meaning.",
          historyRo: "Această secțiune definește întinderea instanțelor federale. „Ce decurge din această Constituție” plus controlul judiciar din Marbury e ceea ce face din Curtea Supremă ultimul cuvânt asupra sensului constituțional.",
          cases: [
            { name: "Chisholm v. Georgia", year: "1793", note: "Allowed a citizen to sue a state, prompting the 11th Amendment to reverse it.", noteRo: "A permis unui cetățean să dea în judecată un stat, ceea ce a dus la Amendamentul 11 care l-a inversat." },
          ],
          amendments: ["amend-11", "amend-6", "amend-7"],
          related: ["art3-s1", "art3-s3"],
          examples: "The jury-trial guarantee here, expanded by the 6th and 7th Amendments, underlies the American jury system.",
          examplesRo: "Garanția judecății cu jurați de aici, extinsă de Amendamentele 6 și 7, stă la baza sistemului american de jurați.",
          debates: "State sovereign immunity, how far the 11th Amendment shields states from lawsuits, is a heavily litigated federalism question rooted here.",
          debatesRo: "Imunitatea suverană a statelor, cât de mult le protejează Amendamentul 11 de procese, e o chestiune de federalism intens litigată, înrădăcinată aici.",
        },
      },
      {
        id: "art3-s3", ref: "Art. III, §3", heading: "Section 3 — Treason", headingRo: "Secțiunea 3 — Trădarea",
        text: "Treason against the United States, shall consist only in levying War against them, or in adhering to their Enemies, giving them Aid and Comfort. No Person shall be convicted of Treason unless on the Testimony of two Witnesses to the same overt Act, or on Confession in open Court.\n\nThe Congress shall have Power to declare the Punishment of Treason, but no Attainder of Treason shall work Corruption of Blood, or Forfeiture except during the Life of the Person attainted.",
        context: {
          plain: "Treason is defined narrowly and is the only crime defined in the Constitution: making war on the United States or aiding its enemies. Conviction needs either two witnesses to the same act or a confession in open court.",
          plainRo: "Trădarea e definită restrâns și e singura infracțiune definită în Constituție: purtarea de război împotriva Statelor Unite sau ajutarea inamicilor lor. Condamnarea are nevoie fie de doi martori la același act, fie de o mărturisire în instanță deschisă.",
          history: "The Framers, who had just committed treason against Britain, deliberately made treason hard to prove so it could not be used, as in England, to crush political opponents.",
          historyRo: "Fondatorii, care tocmai comiseseră trădare împotriva Marii Britanii, au făcut trădarea greu de dovedit intenționat, ca să nu poată fi folosită, ca în Anglia, pentru a zdrobi adversarii politici.",
          cases: [
            { name: "Cramer v. United States", year: "1945", note: "The two-witness rule is strict; each witness must testify to the same overt act of aid.", noteRo: "Regula celor doi martori e strictă; fiecare martor trebuie să depună mărturie despre același act manifest de ajutor." },
          ],
          amendments: [],
          related: ["art3-s2"],
          examples: "Treason prosecutions are extremely rare in American history, precisely because the bar set here is so high.",
          examplesRo: "Urmăririle pentru trădare sunt extrem de rare în istoria americană, tocmai fiindcă pragul stabilit aici e atât de ridicat.",
          debates: "\"Aid and Comfort\" and what counts as \"levying War\" resurface in debates over sedition, insurrection, and modern political violence.",
          debatesRo: "„Ajutor și sprijin” și ce înseamnă „purtarea de război” reapar în dezbaterile despre sediție, insurecție și violența politică modernă.",
        },
      },
    ],
  },

  // ─── Article IV — The States ────────────────────────────────────────────────
  {
    id: "art4",
    ref: "Article IV",
    heading: "Article IV — The States",
    headingRo: "Articolul IV — Statele",
    text: "",
    children: [
      {
        id: "art4-s1", ref: "Art. IV, §1", heading: "Section 1 — Full Faith & Credit", headingRo: "Secțiunea 1 — Credință și încredere deplină",
        text: "Full Faith and Credit shall be given in each State to the public Acts, Records, and judicial Proceedings of every other State. And the Congress may by general Laws prescribe the Manner in which such Acts, Records and Proceedings shall be proved, and the Effect thereof.",
        context: {
          plain: "Each state must honor the laws, records, and court judgments of the other states.",
          plainRo: "Fiecare stat trebuie să onoreze legile, actele și hotărârile judecătorești ale celorlalte state.",
          history: "This clause knits fifty legal systems into one country: a court judgment or public record valid in one state is recognized across the others.",
          historyRo: "Această clauză leagă cincizeci de sisteme juridice într-o singură țară: o hotărâre sau un act public valabil într-un stat e recunoscut în celelalte.",
          cases: [
            { name: "Obergefell v. Hodges", year: "2015", note: "Required states to recognize same-sex marriages performed in other states (decided mainly on the 14th Amendment).", noteRo: "A cerut statelor să recunoască căsătoriile între persoane de același sex din alte state (decis mai ales pe Amendamentul 14)." },
          ],
          amendments: ["amend-14"],
          related: ["art4-s2"],
          examples: "Driver's licenses, marriage certificates, and court judgments recognized across state lines all rest on Full Faith and Credit.",
          examplesRo: "Permisele de conducere, certificatele de căsătorie și hotărârile recunoscute peste granițele statale se sprijină pe Credința și încrederea deplină.",
          debates: "How far one state must honor another's controversial judgments has surfaced in fights over marriage and, more recently, cross-state legal conflicts.",
          debatesRo: "Cât trebuie un stat să onoreze hotărârile controversate ale altuia a apărut în luptele despre căsătorie și, mai recent, în conflictele juridice între state.",
        },
      },
      {
        id: "art4-s2", ref: "Art. IV, §2", heading: "Section 2 — Privileges & Extradition", headingRo: "Secțiunea 2 — Privilegii și extrădare",
        text: "The Citizens of each State shall be entitled to all Privileges and Immunities of Citizens in the several States.\n\nA Person charged in any State with Treason, Felony, or other Crime, who shall flee from Justice, and be found in another State, shall on Demand of the executive Authority of the State from which he fled, be delivered up, to be removed to the State having Jurisdiction of the Crime.",
        amended: true,
        amendedNote: "This section originally included the Fugitive Slave Clause requiring escaped enslaved people to be returned; it was voided by the 13th Amendment (1865).",
        amendedNoteRo: "Această secțiune includea inițial Clauza Sclavilor Fugari, care cerea returnarea persoanelor înrobite evadate; a fost anulată de Amendamentul 13 (1865).",
        context: {
          plain: "A state must treat citizens of other states largely as it treats its own, and must extradite fugitives back to the state where they are charged.",
          plainRo: "Un stat trebuie să trateze cetățenii altor state în mare ca pe ai săi și trebuie să extrădeze fugarii înapoi în statul unde sunt acuzați.",
          history: "The Privileges and Immunities Clause stops states from treating out-of-staters as foreigners. The section once also held the Fugitive Slave Clause, one of the Constitution's original compromises with slavery, erased after the Civil War.",
          historyRo: "Clauza Privilegiilor și Imunităților împiedică statele să-i trateze pe cei din afara statului ca pe străini. Secțiunea conținea cândva și Clauza Sclavilor Fugari, unul dintre compromisurile originale cu sclavia, ștearsă după Războiul Civil.",
          cases: [
            { name: "Saenz v. Roe", year: "1999", note: "Protected the right to travel and to be treated equally after moving to a new state.", noteRo: "A protejat dreptul de a călători și de a fi tratat egal după mutarea într-un stat nou." },
          ],
          amendments: ["amend-13", "amend-14"],
          related: ["art4-s1"],
          examples: "Interstate extradition of criminal suspects and equal treatment of new residents flow from this section.",
          examplesRo: "Extrădarea între state a suspecților și tratamentul egal al noilor rezidenți decurg din această secțiune.",
          debates: "How much a state may favor its own residents, in tuition, hunting licenses, or jobs, is still litigated under Privileges and Immunities.",
          debatesRo: "Cât poate un stat să-și favorizeze proprii rezidenți, la taxe de studii, permise de vânătoare sau locuri de muncă, e încă litigat sub Privilegii și Imunități.",
        },
      },
      {
        id: "art4-s3", ref: "Art. IV, §3", heading: "Section 3 — New States & Territories", headingRo: "Secțiunea 3 — State noi și teritorii",
        text: "New States may be admitted by the Congress into this Union; but no new State shall be formed or erected within the Jurisdiction of any other State... without the Consent of the Legislatures of the States concerned as well as of the Congress.\n\nThe Congress shall have Power to dispose of and make all needful Rules and Regulations respecting the Territory or other Property belonging to the United States.",
        context: {
          plain: "Congress admits new states and governs federal territories and property. A state cannot be carved out of an existing state without that state's consent.",
          plainRo: "Congresul admite state noi și guvernează teritoriile și proprietatea federală. Un stat nu poate fi format din altul existent fără consimțământul acelui stat.",
          history: "This clause let the United States grow from thirteen states to fifty, admitting new states as equals rather than as colonies.",
          historyRo: "Această clauză a permis Statelor Unite să crească de la treisprezece la cincizeci de state, admițând state noi ca egale, nu ca pe colonii.",
          cases: [],
          amendments: [],
          related: ["art4-s4"],
          examples: "The path to statehood for territories, and debates over statehood for Washington, D.C., and Puerto Rico, run through this clause.",
          examplesRo: "Drumul spre statalitate al teritoriilor și dezbaterile despre statalitatea Washington D.C. și Puerto Rico trec prin această clauză.",
          debates: "Whether D.C. or Puerto Rico should become states is a live political question governed by this section.",
          debatesRo: "Dacă D.C. sau Puerto Rico ar trebui să devină state e o chestiune politică vie guvernată de această secțiune.",
        },
      },
      {
        id: "art4-s4", ref: "Art. IV, §4", heading: "Section 4 — Guarantee Clause", headingRo: "Secțiunea 4 — Clauza Garanției",
        text: "The United States shall guarantee to every State in this Union a Republican Form of Government, and shall protect each of them against Invasion; and on Application of the Legislature, or of the Executive (when the Legislature cannot be convened) against domestic Violence.",
        context: {
          plain: "The federal government guarantees every state a republican (representative) form of government and will protect states against invasion and, on request, against internal violence.",
          plainRo: "Guvernul federal garantează fiecărui stat o formă de guvernare republicană (reprezentativă) și va proteja statele împotriva invaziei și, la cerere, împotriva violenței interne.",
          history: "The Guarantee Clause promises that no state may slide into monarchy or dictatorship. Its meaning is largely enforced through politics rather than the courts.",
          historyRo: "Clauza Garanției promite că niciun stat nu poate aluneca în monarhie sau dictatură. Sensul ei e aplicat în mare prin politică, nu prin instanțe.",
          cases: [
            { name: "Luther v. Borden", year: "1849", note: "What counts as a \"republican\" government is a political question for Congress, not the courts.", noteRo: "Ce înseamnă un guvern „republican” e o chestiune politică pentru Congres, nu pentru instanțe." },
          ],
          amendments: [],
          related: ["art4-s3", "art1-s8"],
          examples: "Federal troops sent to protect states, and the promise of representative government, rest on this clause.",
          examplesRo: "Trupele federale trimise să protejeze statele și promisiunea guvernării reprezentative se sprijină pe această clauză.",
          debates: "Whether the Guarantee Clause can be used in court, for example against extreme gerrymandering, is a long-debated question.",
          debatesRo: "Dacă Clauza Garanției poate fi folosită în instanță, de exemplu împotriva gerrymandering-ului extrem, e o chestiune îndelung dezbătută.",
        },
      },
    ],
  },

  // ─── Article V — Amendment ──────────────────────────────────────────────────
  {
    id: "art5",
    ref: "Article V",
    heading: "Article V — Amending the Constitution",
    headingRo: "Articolul V — Modificarea Constituției",
    text: "The Congress, whenever two thirds of both Houses shall deem it necessary, shall propose Amendments to this Constitution, or, on the Application of the Legislatures of two thirds of the several States, shall call a Convention for proposing Amendments, which in either Case, shall be valid to all Intents and Purposes, as Part of this Constitution, when ratified by the Legislatures of three fourths of the several States, or by Conventions in three fourths thereof... Provided that... no State, without its Consent, shall be deprived of its equal Suffrage in the Senate.",
    context: {
      plain: "The Constitution can be amended in two stages: an amendment is proposed by two-thirds of both houses of Congress (or a convention called by two-thirds of the states), then ratified by three-fourths of the states. No state can be stripped of its equal vote in the Senate without agreeing.",
      plainRo: "Constituția poate fi modificată în două etape: un amendament e propus de două treimi din ambele camere ale Congresului (sau de o convenție cerută de două treimi din state), apoi ratificat de trei sferturi din state. Niciun stat nu poate fi privat de votul său egal în Senat fără acord.",
      history: "Article V makes the Constitution hard, but not impossible, to change. This deliberate difficulty is why it has been amended only 27 times in more than 230 years.",
      historyRo: "Articolul V face Constituția greu, dar nu imposibil, de schimbat. Această dificultate deliberată e motivul pentru care a fost modificată doar de 27 de ori în peste 230 de ani.",
      cases: [
        { name: "Coleman v. Miller", year: "1939", note: "Many questions about the amendment process are political questions left to Congress.", noteRo: "Multe întrebări despre procesul de amendare sunt chestiuni politice lăsate Congresului." },
      ],
      amendments: [],
      related: ["art1-s3", "art7"],
      examples: "All 27 amendments were proposed by Congress; the never-used convention route is periodically revived by state campaigns.",
      examplesRo: "Toate cele 27 de amendamente au fost propuse de Congres; ruta convenției, niciodată folosită, e reînviată periodic de campanii statale.",
      debates: "Whether to call an Article V \"convention of states\", and how one would be limited, is a recurring and contested proposal.",
      debatesRo: "Dacă să se convoace o „convenție a statelor” în baza Articolului V, și cum ar fi limitată, e o propunere recurentă și disputată.",
    },
  },

  // ─── Article VI — Supremacy ─────────────────────────────────────────────────
  {
    id: "art6",
    ref: "Article VI",
    heading: "Article VI — Federal Supremacy",
    headingRo: "Articolul VI — Supremația Federală",
    text: "All Debts contracted and Engagements entered into, before the Adoption of this Constitution, shall be as valid against the United States under this Constitution, as under the Confederation.\n\nThis Constitution, and the Laws of the United States which shall be made in Pursuance thereof; and all Treaties made... shall be the supreme Law of the Land; and the Judges in every State shall be bound thereby...\n\nThe Senators and Representatives before mentioned, and the Members of the several State Legislatures, and all executive and judicial Officers... shall be bound by Oath or Affirmation, to support this Constitution; but no religious Test shall ever be required as a Qualification to any Office or public Trust under the United States.",
    context: {
      plain: "The Constitution, federal law, and treaties are \"the supreme Law of the Land\", overriding conflicting state law. Every official swears to support the Constitution, and no religious test may ever be required for office.",
      plainRo: "Constituția, legea federală și tratatele sunt „legea supremă a țării”, având prioritate față de legea statală contrară. Fiecare oficial jură să susțină Constituția, iar niciun test religios nu poate fi cerut vreodată pentru funcție.",
      history: "The Supremacy Clause is what makes federalism work: when state and federal law collide, federal law wins. The ban on religious tests was radical in 1787, when many states still required officeholders to be Protestant or Christian.",
      historyRo: "Clauza Supremației e ceea ce face federalismul să funcționeze: când legea statală și cea federală se ciocnesc, câștigă legea federală. Interzicerea testelor religioase era radicală în 1787, când multe state cereau ca funcționarii să fie protestanți sau creștini.",
      cases: [
        { name: "McCulloch v. Maryland", year: "1819", note: "A state cannot tax or obstruct a valid federal institution; federal law is supreme.", noteRo: "Un stat nu poate impozita sau obstrucționa o instituție federală validă; legea federală e supremă." },
        { name: "Gibbons v. Ogden", year: "1824", note: "Valid federal law preempts conflicting state law.", noteRo: "Legea federală validă are prioritate față de legea statală contrară." },
      ],
      amendments: ["amend-1", "amend-10"],
      related: ["art1-s8", "art3-s2"],
      examples: "Federal preemption of state laws, from drug regulation to immigration, is decided under the Supremacy Clause every year.",
      examplesRo: "Prioritatea federală asupra legilor statale, de la reglementarea drogurilor la imigrație, e decisă sub Clauza Supremației în fiecare an.",
      debates: "How much room states have to set their own course, from cannabis to climate to immigration, is a constant supremacy-and-federalism tension.",
      debatesRo: "Cât spațiu au statele să-și urmeze propriul drum, de la canabis la climă la imigrație, e o tensiune constantă între supremație și federalism.",
    },
  },

  // ─── Article VII — Ratification ─────────────────────────────────────────────
  {
    id: "art7",
    ref: "Article VII",
    heading: "Article VII — Ratification",
    headingRo: "Articolul VII — Ratificarea",
    text: "The Ratification of the Conventions of nine States, shall be sufficient for the Establishment of this Constitution between the States so ratifying the Same.\n\nDone in Convention by the Unanimous Consent of the States present the Seventeenth Day of September in the Year of our Lord one thousand seven hundred and Eighty seven... In Witness whereof We have hereunto subscribed our Names, Go. Washington—Presidt. and deputy from Virginia.",
    context: {
      plain: "The Constitution would take effect once nine of the thirteen states ratified it, and it was signed in Philadelphia on September 17, 1787.",
      plainRo: "Constituția intra în vigoare odată ce nouă din cele treisprezece state o ratificau, și a fost semnată la Philadelphia pe 17 septembrie 1787.",
      history: "Requiring only nine states, not all thirteen, was itself bold: it let the new Constitution go into effect without unanimous consent, bypassing states that might have blocked it forever.",
      historyRo: "Cerința de doar nouă state, nu toate treisprezece, era ea însăși îndrăzneață: a permis noii Constituții să intre în vigoare fără consimțământ unanim, ocolind statele care ar fi putut-o bloca la nesfârșit.",
      cases: [],
      amendments: [],
      related: ["preamble", "art5"],
      examples: "September 17 is now celebrated as Constitution Day, marking the signing recorded in this article.",
      examplesRo: "17 septembrie e sărbătorit acum ca Ziua Constituției, marcând semnarea consemnată în acest articol.",
      debates: "The decision to ratify by state conventions, rather than legislatures, was meant to root the Constitution in the people, echoing \"We the People.\"",
      debatesRo: "Decizia de a ratifica prin convenții statale, nu prin legislaturi, era menită să înrădăcineze Constituția în popor, în ecoul lui „We the People”.",
    },
  },
];
