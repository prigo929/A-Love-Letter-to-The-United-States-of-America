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
  text: string; // verbatim
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
];
