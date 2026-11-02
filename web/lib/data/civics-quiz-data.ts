// ─── U.S. Civics & Naturalization Quiz Dataset ─────────────────────────────────
// Official Civics questions aligned with the U.S. Citizenship and Immigration
// Services (USCIS) Naturalization Test, with bilingual EN/RO support and historical notes.

export type QuizCategory = "government" | "history" | "symbols_geography";

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  categoryLabel: { en: string; ro: string };
  question: { en: string; ro: string };
  options: { en: string[]; ro: string[] };
  correctIndex: number;
  explanation: { en: string; ro: string };
  historicalFact: { en: string; ro: string };
}

export const CIVICS_CATEGORIES: { id: QuizCategory; label: { en: string; ro: string } }[] = [
  { id: "government", label: { en: "American Government", ro: "Guvernul American" } },
  { id: "history", label: { en: "American History", ro: "Istoria Americii" } },
  { id: "symbols_geography", label: { en: "Symbols & Geography", ro: "Simboluri și Geografie" } },
];

export const CIVICS_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    category: "government",
    categoryLabel: { en: "Principles of Democracy", ro: "Principii Democratice" },
    question: {
      en: "What is the supreme law of the land in the United States?",
      ro: "Care este legea supremă a țării în Statele Unite?",
    },
    options: {
      en: [
        "The Declaration of Independence",
        "The U.S. Constitution",
        "The Federalist Papers",
        "The Bill of Rights",
      ],
      ro: [
        "Declarația de Independență",
        "Constituția Statelor Unite",
        "Scrierile Federaliste",
        "Carta Drepturilor",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Article VI, Clause 2 (the Supremacy Clause) establishes that the federal Constitution and federal treaties constitute the supreme law of the land.",
      ro: "Articolul VI, Clauza 2 (Clauza de Supremație) stabilește că Constituția federală și tratatele federale constituie legea supremă a țării.",
    },
    historicalFact: {
      en: "Written in 1787 in Philadelphia, the U.S. Constitution is the world's oldest written national constitution still in continuous operation.",
      ro: "Scrisă în 1787 la Philadelphia, Constituția SUA este cea mai veche constituție națională scrisă din lume încă în vigoare continuă.",
    },
  },
  {
    id: "q2",
    category: "government",
    categoryLabel: { en: "Principles of Democracy", ro: "Principii Democratice" },
    question: {
      en: "The idea of self-government is in the first three words of the Constitution. What are these words?",
      ro: "Ideea de autoguvernare se regăsește în primele trei cuvinte ale Constituției. Care sunt aceste cuvinte?",
    },
    options: {
      en: [
        "In God We",
        "We the People",
        "Liberty and Justice",
        "Congress Shall Make",
      ],
      ro: [
        "În Dumnezeu Ne",
        "Noi, Poporul (We the People)",
        "Libertate și Justiție",
        "Congresul Nu Va",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "'We the People' affirms that the government of the United States exists to serve its citizens and derives its legitimate authority solely from their consent.",
      ro: "„We the People” afirmă că guvernul Statelor Unite există pentru a-și servi cetățenii și își derivă autoritatea legitimă doar din consimțământul acestora.",
    },
    historicalFact: {
      en: "Gouverneur Morris, representing Pennsylvania, is credited with drafting the famous Preamble and its opening words.",
      ro: "Gouverneur Morris, reprezentând Pennsylvania, este cel creditat cu redactarea faimosului Preambul și a cuvintelor sale de deschidere.",
    },
  },
  {
    id: "q3",
    category: "government",
    categoryLabel: { en: "Rights & Amendments", ro: "Drepturi și Amendamente" },
    question: {
      en: "What do we call the first ten amendments to the Constitution?",
      ro: "Cum se numesc primele zece amendamente la Constituție?",
    },
    options: {
      en: [
        "The Articles of Confederation",
        "The Federalist Papers",
        "The Bill of Rights",
        "The Magna Carta",
      ],
      ro: [
        "Articolele Confederației",
        "Scrierile Federaliste",
        "Carta Drepturilor (The Bill of Rights)",
        "Magna Carta",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "The Bill of Rights was ratified on December 15, 1791, explicitly guaranteeing essential individual freedoms and limiting governmental intrusion.",
      ro: "Carta Drepturilor a fost ratificată la 15 decembrie 1791, garantând explicit libertățile individuale esențiale și limitând ingerințele guvernamentale.",
    },
    historicalFact: {
      en: "James Madison introduced the amendments in the First Congress, drawing heavily on George Mason's 1776 Virginia Declaration of Rights.",
      ro: "James Madison a introdus amendamentele în Primul Congres, inspirându-se masiv din Declarația Drepturilor din Virginia a lui George Mason (1776).",
    },
  },
  {
    id: "q4",
    category: "government",
    categoryLabel: { en: "Rights & Amendments", ro: "Drepturi și Amendamente" },
    question: {
      en: "Which of the following is NOT a right guaranteed by the First Amendment?",
      ro: "Care dintre următoarele NU este un drept garantat de Primul Amendament?",
    },
    options: {
      en: [
        "Freedom of Speech",
        "Freedom of Religion",
        "The Right to Bear Arms",
        "The Right to Peaceably Assemble",
      ],
      ro: [
        "Libertatea de exprimare",
        "Libertatea religioasă",
        "Dreptul de a purta arme",
        "Dreptul de a se aduna pașnic",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "The right to bear arms is protected by the Second Amendment. The First Amendment protects speech, religion, press, assembly, and petitioning the government.",
      ro: "Dreptul de a purta arme este protejat de Al Doilea Amendament. Primul Amendament protejează libertatea de exprimare, religia, presa, întrunirea și petiționarea guvernului.",
    },
    historicalFact: {
      en: "The First Amendment prohibits Congress from establishing a national religion (Establishment Clause) or impeding free exercise of religion.",
      ro: "Primul Amendament interzice Congresului stabilirea unei religii naționale sau împiedicarea liberului exercițiu al credinței.",
    },
  },
  {
    id: "q5",
    category: "government",
    categoryLabel: { en: "System of Government", ro: "Sistemul de Guvernare" },
    question: {
      en: "What stops one branch of government from becoming too powerful?",
      ro: "Ce împiedică o ramură a guvernului să devină prea puternică?",
    },
    options: {
      en: [
        "The military leadership",
        "Checks and balances & separation of powers",
        "The state governors",
        "The Federal Reserve",
      ],
      ro: [
        "Conducerea armatei",
        "Sistemul de control și echilibru & separarea puterilor",
        "Guvernatorii statelor",
        "Rezerva Federală",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "The Constitution divides power into three branches—Legislative, Executive, and Judicial—and gives each branch mechanisms to check the others.",
      ro: "Constituția divide puterea în trei ramuri — Legislativă, Executivă și Judecătorească — oferind fiecăreia mecanisme pentru a le verifica pe celelalte.",
    },
    historicalFact: {
      en: "In Federalist No. 51, James Madison famously wrote: 'Ambition must be made to counteract ambition.'",
      ro: "În Federalist No. 51, James Madison a scris celebra frază: „Ambiția trebuie făcută să contracareze ambiția.”",
    },
  },
  {
    id: "q6",
    category: "government",
    categoryLabel: { en: "Legislative Branch", ro: "Ramura Legislativă" },
    question: {
      en: "How many U.S. Senators are there, and how long is their term?",
      ro: "Câți senatori americani există și care este durata mandatului lor?",
    },
    options: {
      en: [
        "50 Senators for 4-year terms",
        "100 Senators for 6-year terms",
        "435 Senators for 2-year terms",
        "100 Senators for lifetime appointments",
      ],
      ro: [
        "50 de senatori pentru mandate de 4 ani",
        "100 de senatori pentru mandate de 6 ani",
        "435 de senatori pentru mandate de 2 ani",
        "100 de senatori numiți pe viață",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Every state has exactly 2 senators regardless of population (50 states × 2 = 100), elected for staggered 6-year terms where one-third is up every two years.",
      ro: "Fiecare stat are exact 2 senatori indiferent de populație (50 state × 2 = 100), aleși pentru mandate eșalonate de 6 ani (o treime se alege la fiecare doi ani).",
    },
    historicalFact: {
      en: "Before the 17th Amendment was ratified in 1913, U.S. Senators were chosen by state legislatures rather than direct popular election.",
      ro: "Înainte ca al 17-lea Amendament să fie ratificat în 1913, senatorii erau aleși de legislativele statelor, nu prin vot popular direct.",
    },
  },
  {
    id: "q7",
    category: "government",
    categoryLabel: { en: "Legislative Branch", ro: "Ramura Legislativă" },
    question: {
      en: "How many voting members are in the U.S. House of Representatives?",
      ro: "Câți membri cu drept de vot sunt în Camera Reprezentanților a SUA?",
    },
    options: {
      en: ["100", "270", "435", "538"],
      ro: ["100", "270", "435", "538"],
    },
    correctIndex: 2,
    explanation: {
      en: "The House of Representatives has 435 voting members, apportioned among the 50 states by population following every decennial census.",
      ro: "Camera Reprezentanților are 435 de membri cu drept de vot, distribuiți între cele 50 de state în funcție de populație după fiecare recensământ decenal.",
    },
    historicalFact: {
      en: "The size was permanently capped at 435 by the Permanent Apportionment Act of 1929.",
      ro: "Numărul a fost plafonat permanent la 435 prin Legea Repartizării Permanente din 1929.",
    },
  },
  {
    id: "q8",
    category: "government",
    categoryLabel: { en: "Executive Branch", ro: "Ramura Executivă" },
    question: {
      en: "If both the President and the Vice President can no longer serve, who becomes President?",
      ro: "Dacă atât Președintele cât și Vicepreședintele nu mai pot servi, cine devine Președinte?",
    },
    options: {
      en: [
        "The Secretary of State",
        "The Speaker of the House",
        "The Chief Justice of the Supreme Court",
        "The Secretary of Defense",
      ],
      ro: [
        "Secretarul de Stat",
        "Președintele Camerei Reprezentanților (Speaker of the House)",
        "Președintele Curții Supreme (Chief Justice)",
        "Secretarul Apărării",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Under the Presidential Succession Act of 1947 and the 25th Amendment, the Speaker of the House is second in the presidential line of succession.",
      ro: "Conform Legii Succesiunii Prezidențiale din 1947 și celui de-al 25-lea Amendament, Președintele Camerei este al doilea pe linia de succesiune prezidențială.",
    },
    historicalFact: {
      en: "The line of succession proceeds from the Vice President, to the Speaker of the House, to the President pro tempore of the Senate, followed by Cabinet secretaries in order of department creation.",
      ro: "Linia de succesiune merge de la Vicepreședinte, la Speakerul Camerei, la Președintele pro tempore al Senatului, urmat de membrii Cabinetului în ordinea creării departamentelor.",
    },
  },
  {
    id: "q9",
    category: "government",
    categoryLabel: { en: "Judicial Branch", ro: "Ramura Judecătorească" },
    question: {
      en: "How many justices serve on the Supreme Court, and how long do they serve?",
      ro: "Câți judecători fac parte din Curtea Supremă și care este durata mandatului lor?",
    },
    options: {
      en: [
        "7 justices serving 10-year terms",
        "9 justices serving lifetime appointments (during good behavior)",
        "12 justices elected every 4 years",
        "9 justices appointed for one 8-year term",
      ],
      ro: [
        "7 judecători pentru mandate de 10 ani",
        "9 judecători numiți pe viață (pe durata unei bune purtări)",
        "12 judecători aleși la fiecare 4 ani",
        "9 judecători numiți pentru un singur mandat de 8 ani",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Under Article III of the Constitution, federal judges hold their offices during good behavior, ensuring independence from political pressure. Congress set the size at 9 in 1869.",
      ro: "Conform Articolului III din Constituție, judecătorii federali își mențin mandatele pe viață, garantând independența de presiunile politice. Congresul a stabilit numărul la 9 în 1869.",
    },
    historicalFact: {
      en: "The Judiciary Act of 1789 originally established six Supreme Court justices, which fluctuated until stabilizing at nine following the Civil War.",
      ro: "Legea Judiciară din 1789 a stabilit inițial șase judecători, număr care a fluctuat până la stabilizarea la nouă după Războiul Civil.",
    },
  },
  {
    id: "q10",
    category: "government",
    categoryLabel: { en: "Federalism", ro: "Federalism" },
    question: {
      en: "Under our Constitution, some powers belong to the federal government. Which is an exclusive federal power?",
      ro: "Conform Constituției, unele puteri aparțin guvernului federal. Care este o putere federală exclusivă?",
    },
    options: {
      en: [
        "Providing public schooling and education",
        "Issuing driver's licenses",
        "Printing paper money and coining currency",
        "Providing local police and fire protection",
      ],
      ro: [
        "Furnizarea învățământului public",
        "Emiterea permiselor de conducere",
        "Tipărirea banilor și baterea monedei",
        "Poliția locală și serviciul de pompieri",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Article I, Section 8 reserves the coining of money, declaring war, and regulating interstate/foreign commerce exclusively to the federal government.",
      ro: "Articolul I, Secțiunea 8 rezervă exclusiv guvernului federal baterea monedei, declararea războiului și reglementarea comerțului interstatal/extern.",
    },
    historicalFact: {
      en: "Under the 10th Amendment, all powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.",
      ro: "Prin cel de-al 10-lea Amendament, toate puterile care nu sunt delegate SUA prin Constituție și nici interzise statelor sunt rezervate statelor sau poporului.",
    },
  },
  {
    id: "q11",
    category: "history",
    categoryLabel: { en: "Colonial & Independence", ro: "Perioada Colonială și Independența" },
    question: {
      en: "Who was the primary author of the Declaration of Independence?",
      ro: "Cine a fost autorul principal al Declarației de Independență?",
    },
    options: {
      en: [
        "George Washington",
        "Thomas Jefferson",
        "Alexander Hamilton",
        "Benjamin Franklin",
      ],
      ro: [
        "George Washington",
        "Thomas Jefferson",
        "Alexander Hamilton",
        "Benjamin Franklin",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Thomas Jefferson was chosen by the Committee of Five to draft the Declaration, which was formally adopted by the Continental Congress on July 4, 1776.",
      ro: "Thomas Jefferson a fost ales de Comitetul celor Cinci pentru a redacta Declarația, adoptată formal de Congresul Continental la 4 iulie 1776.",
    },
    historicalFact: {
      en: "Jefferson drafted the historic document on a portable writing desk he designed himself while staying at a boarding house in Philadelphia.",
      ro: "Jefferson a redactat documentul istoric pe un birou portabil de scris pe care l-a proiectat el însuși în Philadelphia.",
    },
  },
  {
    id: "q12",
    category: "history",
    categoryLabel: { en: "Colonial & Independence", ro: "Perioada Colonială și Independența" },
    question: {
      en: "Which of the following was NOT one of the original 13 founding colonies?",
      ro: "Care dintre următoarele NU a fost una dintre cele 13 colonii fondatoare originale?",
    },
    options: {
      en: ["Virginia", "Pennsylvania", "Ohio", "Massachusetts"],
      ro: ["Virginia", "Pennsylvania", "Ohio", "Massachusetts"],
    },
    correctIndex: 2,
    explanation: {
      en: "Ohio was part of the Northwest Territory and became the 17th state in 1803. The original 13 were NH, MA, RI, CT, NY, NJ, PA, DE, MD, VA, NC, SC, and GA.",
      ro: "Ohio a făcut parte din Teritoriul de Nord-Vest și a devenit al 17-lea stat în 1803. Cele 13 originale au fost NH, MA, RI, CT, NY, NJ, PA, DE, MD, VA, NC, SC și GA.",
    },
    historicalFact: {
      en: "Delaware was the very first state to ratify the U.S. Constitution on December 7, 1787, earning its nickname 'The First State'.",
      ro: "Delaware a fost primul stat care a ratificat Constituția SUA pe 7 decembrie 1787, primind supranumele „The First State”.",
    },
  },
  {
    id: "q13",
    category: "history",
    categoryLabel: { en: "Founding Era", ro: "Epoca Fondatorilor" },
    question: {
      en: "The Federalist Papers supported the passage of the U.S. Constitution. Who was one of the authors?",
      ro: "Scrierile Federaliste au susținut adoptarea Constituției SUA. Cine a fost unul dintre autori?",
    },
    options: {
      en: [
        "Alexander Hamilton",
        "Thomas Paine",
        "Patrick Henry",
        "Samuel Adams",
      ],
      ro: [
        "Alexander Hamilton",
        "Thomas Paine",
        "Patrick Henry",
        "Samuel Adams",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "The 85 essays were written collaboratively by Alexander Hamilton (51 essays), James Madison (29 essays), and John Jay (5 essays) under the pseudonym 'Publius'.",
      ro: "Cele 85 de eseuri au fost scrise în colaborare de Alexander Hamilton (51 de eseuri), James Madison (29) și John Jay (5) sub pseudonimul comun „Publius”.",
    },
    historicalFact: {
      en: "Hamilton wrote his 51 essays while working as an active lawyer and military officer, often drafting on passenger packet boats.",
      ro: "Hamilton a scris 51 de eseuri în timp ce lucra ca avocat și ofițer militar, adesea redactând pe bărci de transport de pasageri.",
    },
  },
  {
    id: "q14",
    category: "history",
    categoryLabel: { en: "1800s & Civil War", ro: "Secolul al XIX-lea și Războiul Civil" },
    question: {
      en: "What major territory did the United States buy from France in 1803?",
      ro: "Ce teritoriu major au cumpărat Statele Unite de la Franța în 1803?",
    },
    options: {
      en: [
        "The Alaska Purchase",
        "The Louisiana Territory",
        "The Gadsden Purchase",
        "The Florida Territory",
      ],
      ro: [
        "Achiziția Alaska",
        "Teritoriul Louisiana",
        "Achiziția Gadsden",
        "Teritoriul Florida",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Under President Thomas Jefferson, the U.S. purchased 828,000 square miles of territory from Napoleonic France for $15 million, doubling the size of the nation.",
      ro: "Sub președintele Thomas Jefferson, SUA au cumpărat 828.000 de mile pătrate de la Franța napoleoniană pentru 15 milioane de dolari, dublând suprafața națiunii.",
    },
    historicalFact: {
      en: "The purchase price worked out to roughly 3 cents per acre for some of the most fertile agricultural land on Earth.",
      ro: "Prețul de cumpărare a însemnat aproximativ 3 cenți pe acru pentru unele dintre cele mai fertile terenuri agricole de pe Pământ.",
    },
  },
  {
    id: "q15",
    category: "history",
    categoryLabel: { en: "1800s & Civil War", ro: "Secolul al XIX-lea și Războiul Civil" },
    question: {
      en: "What was an important achievement of Abraham Lincoln?",
      ro: "Care a fost o realizare crucială a lui Abraham Lincoln?",
    },
    options: {
      en: [
        "Writing the Declaration of Independence",
        "Preserving the Union and issuing the Emancipation Proclamation",
        "Purchasing Alaska from Russia",
        "Serving as the first Chief Justice",
      ],
      ro: [
        "Scrierea Declarației de Independență",
        "Păstrarea Uniunii și emiterea Proclamației de Emancipare",
        "Cumpărarea Alaskăi de la Rusia",
        "A fost primul judecător-șef al Curții Supreme",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Lincoln led the nation through its greatest moral and constitutional crisis, preserved the American Union, and abolished slavery with the 13th Amendment.",
      ro: "Lincoln a condus națiunea prin cea mai mare criză morală și constituțională, a păstrat Uniunea Americană și a abolit sclavia prin al 13-lea Amendament.",
    },
    historicalFact: {
      en: "Lincoln's Gettysburg Address in November 1863 was just 272 words long, yet remains one of the most famous declarations of democratic governance.",
      ro: "Discursul de la Gettysburg al lui Lincoln din noiembrie 1863 a avut doar 272 de cuvinte, devenind una dintre cele mai celebre declarații despre guvernarea democratică.",
    },
  },
  {
    id: "q16",
    category: "history",
    categoryLabel: { en: "Recent American History", ro: "Istoria Americană Recentă" },
    question: {
      en: "Before he was President, Dwight D. Eisenhower was a general. What war was he in?",
      ro: "Înainte de a fi Președinte, Dwight D. Eisenhower a fost general. În ce război a servit?",
    },
    options: {
      en: ["World War I", "World War II", "The Korean War", "The Vietnam War"],
      ro: ["Primul Război Mondial", "Al Doilea Război Mondial", "Războiul din Coreea", "Războiul din Vietnam"],
    },
    correctIndex: 1,
    explanation: {
      en: "General Eisenhower served as Supreme Commander of the Allied Expeditionary Force in Europe during World War II, planning the D-Day invasion of Normandy.",
      ro: "Generalul Eisenhower a fost Comandantul Suprem al Forțelor Expediționare Aliate în Europa în Al Doilea Război Mondial, planificând debarcarea din Normandia (D-Day).",
    },
    historicalFact: {
      en: "As president, Eisenhower created the Interstate Highway System in 1956, directly inspired by his military observations of logistics.",
      ro: "Ca președinte, Eisenhower a creat Sistemul de Autostrăzi Interstatale în 1956, inspirat direct din experiența sa militară de logistică.",
    },
  },
  {
    id: "q17",
    category: "history",
    categoryLabel: { en: "Recent American History", ro: "Istoria Americană Recentă" },
    question: {
      en: "During the Cold War, what was the main concern of the United States?",
      ro: "În timpul Războiului Rece, care a fost principala preocupare a Statelor Unite?",
    },
    options: {
      en: [
        "Defeating European colonialism",
        "Stopping the spread of Communism",
        "Acquiring western territories",
        "Climate change",
      ],
      ro: [
        "Înfrângerea colonialismului european",
        "Oprirea expansiunii comunismului",
        "Achiziționarea teritoriilor vestice",
        "Schimbările climatice",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "From the late 1940s to the fall of the Berlin Wall in 1989 and Soviet collapse in 1991, containment of global communism was the foundation of U.S. national security.",
      ro: "De la sfârșitul anilor 1940 până la căderea Zidului Berlinului (1989) și colapsul URSS (1991), izolarea comunismului a fost piatra de temelie a securității SUA.",
    },
    historicalFact: {
      en: "The U.S. Marshall Plan distributed over $13 billion to rebuild Western European market economies after WWII to prevent communist encroachment.",
      ro: "Planul Marshall a distribuit peste 13 miliarde de dolari pentru reconstrucția economiilor de piață din Europa de Vest după 1945.",
    },
  },
  {
    id: "q18",
    category: "history",
    categoryLabel: { en: "Recent American History", ro: "Istoria Americană Recentă" },
    question: {
      en: "What major event happened on September 11, 2001, in the United States?",
      ro: "Ce eveniment major a avut loc la 11 septembrie 2001 în Statele Unite?",
    },
    options: {
      en: [
        "The stock market crashed",
        "Terrorists attacked the World Trade Center and the Pentagon",
        "The space shuttle Challenger exploded",
        "The Berlin Wall fell",
      ],
      ro: [
        "Bursa s-a prăbușit",
        "Teroriștii au atacat World Trade Center și Pentagonul",
        "Naveta spațială Challenger a explodat",
        "Zidul Berlinului a căzut",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "Nineteen al-Qaeda terrorists hijacked four commercial airliners, striking the World Trade Center towers in NYC, the Pentagon in Virginia, and crashing in Shanksville, PA.",
      ro: "19 teroriști al-Qaeda au deturnat patru avioane comerciale, lovind turnurile World Trade Center din New York, Pentagonul din Virginia și prăbușindu-se la Shanksville, PA.",
    },
    historicalFact: {
      en: "The heroic passengers on United Flight 93 fought back against the hijackers, preventing the fourth plane from striking the U.S. Capitol or White House.",
      ro: "Pasagerii eroi ai zborului United 93 au contraatacat teroriștii, împiedicând cel de-al patrulea avion să lovească Capitoliul sau Casa Albă.",
    },
  },
  {
    id: "q19",
    category: "symbols_geography",
    categoryLabel: { en: "American Symbols", ro: "Simboluri Americane" },
    question: {
      en: "Why does the American flag have 13 stripes and 50 stars?",
      ro: "De ce are drapelul american 13 dungi și 50 de stele?",
    },
    options: {
      en: [
        "13 Founding Fathers and 50 signers of the Constitution",
        "13 original colonies and 50 current states in the Union",
        "13 months of the founding year and 50 naval ships",
        "13 constitutional articles and 50 amendments",
      ],
      ro: [
        "13 Părinți Fondatori și 50 de semnatari ai Constituției",
        "13 colonii originale și 50 de state actuale în Uniune",
        "13 luni ale anului fondator și 50 de nave militare",
        "13 articole constituționale și 50 de amendamente",
      ],
    },
    correctIndex: 1,
    explanation: {
      en: "The 13 alternating red and white stripes represent the original 13 colonies that declared independence, and each star represents one of the 50 states.",
      ro: "Cele 13 dungi alternative roșii și albe reprezintă coloniile originale care și-au declarat independența, iar fiecare stea reprezintă unul din cele 50 de state.",
    },
    historicalFact: {
      en: "The current 50-star flag design was created as a high school history project in 1958 by 17-year-old student Robert G. Heft, who received a B-minus before Eisenhower chose it.",
      ro: "Modelul actual al drapelului cu 50 de stele a fost creat ca proiect școlar în 1958 de elevul Robert G. Heft (17 ani), care a primit nota 8 înainte ca Eisenhower să îl adopte oficial.",
    },
  },
  {
    id: "q20",
    category: "symbols_geography",
    categoryLabel: { en: "American Geography", ro: "Geografia Americii" },
    question: {
      en: "What is the capital of the United States?",
      ro: "Care este capitala Statelor Unite?",
    },
    options: {
      en: [
        "New York City, NY",
        "Philadelphia, PA",
        "Washington, D.C.",
        "Boston, MA",
      ],
      ro: [
        "New York City, NY",
        "Philadelphia, PA",
        "Washington, D.C.",
        "Boston, MA",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "Washington, District of Columbia, is the permanent federal capital district created under Article I, Section 8 of the Constitution, intentionally situated outside any state.",
      ro: "Washington, District of Columbia, este districtul federal permanent creat conform Articolului I, Secțiunea 8 din Constituție, situat intenționat în afara oricărui stat.",
    },
    historicalFact: {
      en: "The Compromise of 1790 between Hamilton, Madison, and Jefferson placed the capital in the South along the Potomac River in exchange for southern support for federal assumption of state debts.",
      ro: "Compromisul din 1790 dintre Hamilton, Madison și Jefferson a plasat capitala pe râul Potomac, la schimb pentru sprijinul statelor din Sud pentru asumarea datoriilor federale.",
    },
  },
  {
    id: "q21",
    category: "symbols_geography",
    categoryLabel: { en: "American Geography", ro: "Geografia Americii" },
    question: {
      en: "What ocean is on the West Coast of the United States?",
      ro: "Ce ocean se află pe coasta de vest a Statelor Unite?",
    },
    options: {
      en: ["The Atlantic Ocean", "The Pacific Ocean", "The Arctic Ocean", "The Indian Ocean"],
      ro: ["Oceanul Atlantic", "Oceanul Pacific", "Oceanul Arctic", "Oceanul Indian"],
    },
    correctIndex: 1,
    explanation: {
      en: "The Pacific Ocean borders the western states of California, Oregon, Washington, Alaska, and Hawaii.",
      ro: "Oceanul Pacific mărginește statele din vest: California, Oregon, Washington, Alaska și Hawaii.",
    },
    historicalFact: {
      en: "The Lewis and Clark Expedition (1804–1806) was commissioned by President Jefferson to reach the Pacific Ocean by overland river routes.",
      ro: "Expediția Lewis și Clark (1804–1806) a fost mandată de președintele Jefferson pentru a ajunge la Oceanul Pacific pe rute fluviale continentale.",
    },
  },
  {
    id: "q22",
    category: "symbols_geography",
    categoryLabel: { en: "American Symbols", ro: "Simboluri Americane" },
    question: {
      en: "What is the name of the National Anthem of the United States?",
      ro: "Care este numele Imnului Național al Statelor Unite?",
    },
    options: {
      en: [
        "America the Beautiful",
        "God Bless America",
        "The Star-Spangled Banner",
        "My Country, 'Tis of Thee",
      ],
      ro: [
        "America the Beautiful",
        "God Bless America",
        "The Star-Spangled Banner",
        "My Country, 'Tis of Thee",
      ],
    },
    correctIndex: 2,
    explanation: {
      en: "'The Star-Spangled Banner' was penned by Francis Scott Key in September 1814 after witnessing the British bombardment of Fort McHenry in Baltimore.",
      ro: "„The Star-Spangled Banner” a fost scris de Francis Scott Key în septembrie 1814, după ce a asistat la bombardamentul britanic asupra Fortului McHenry din Baltimore.",
    },
    historicalFact: {
      en: "It was officially made the national anthem by a congressional resolution signed by President Herbert Hoover on March 3, 1931.",
      ro: "A fost declarat oficial imn național printr-o rezoluție a Congresului semnată de președintele Herbert Hoover la 3 martie 1931.",
    },
  },
  {
    id: "q23",
    category: "government",
    categoryLabel: { en: "Rights & Responsibilities", ro: "Drepturi și Responsabilități" },
    question: {
      en: "There are four amendments to the Constitution about who can vote. What does the 26th Amendment guarantee?",
      ro: "Există patru amendamente la Constituție despre cine poate vota. Ce garantează cel de-al 26-lea Amendament?",
    },
    options: {
      en: [
        "Citizens 18 and older can vote",
        "Citizens do not have to pay a poll tax to vote",
        "Women have the right to vote",
        "Citizens of any race can vote",
      ],
      ro: [
        "Cetățenii de 18 ani și peste au drept de vot",
        "Cetățenii nu trebuie să plătească taxă de vot",
        "Femeile au drept de vot",
        "Cetățenii de orice rasă au drept de vot",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Ratified in 1971 during the Vietnam War, the 26th Amendment lowered the voting age nationwide from 21 to 18 ('Old enough to fight, old enough to vote').",
      ro: "Ratificat în 1971 în timpul războiului din Vietnam, al 26-lea Amendament a coborât vârsta de vot de la 21 la 18 ani („Destul de matur pentru a lupta, destul de matur pentru a vota”).",
    },
    historicalFact: {
      en: "The 26th Amendment was the fastest constitutional amendment ever ratified in U.S. history, approved in just 3 months and 8 days.",
      ro: "Al 26-lea Amendament a fost cel mai rapid amendament ratificat din istoria SUA, aprobat în doar 3 luni și 8 zile.",
    },
  },
  {
    id: "q24",
    category: "symbols_geography",
    categoryLabel: { en: "National Holidays", ro: "Sărbători Naționale" },
    question: {
      en: "When do we celebrate Independence Day in the United States?",
      ro: "Când sărbătorim Ziua Independenței în Statele Unite?",
    },
    options: {
      en: ["July 4th", "June 19th", "November 11th", "September 17th"],
      ro: ["4 Iulie", "19 Iunie", "11 Noiembrie", "17 Septembrie"],
    },
    correctIndex: 0,
    explanation: {
      en: "Independence Day commemorates the formal adoption of the Declaration of Independence by the Continental Congress on July 4, 1776.",
      ro: "Ziua Independenței comemorează adoptarea formală a Declarației de Independență de către Congresul Continental pe 4 iulie 1776.",
    },
    historicalFact: {
      en: "Remarkably, both Thomas Jefferson and John Adams, the second and third presidents and key drafters of the Declaration, died on July 4, 1826—exactly 50 years to the day after 1776.",
      ro: "Remarcabil, atât Thomas Jefferson cât și John Adams, al doilea și al treilea președinte, au murit amândoi pe 4 iulie 1826 — exact la 50 de ani de la 1776.",
    },
  },
  {
    id: "q25",
    category: "history",
    categoryLabel: { en: "Civil Rights", ro: "Drepturi Civice" },
    question: {
      en: "What did Susan B. Anthony and the suffragette movement fight for?",
      ro: "Pentru ce au luptat Susan B. Anthony și mișcarea sufragetelor?",
    },
    options: {
      en: [
        "Women's rights and the right to vote",
        "Environmental protection",
        "Freedom of religion",
        "Workers' compensation",
      ],
      ro: [
        "Drepturile femeilor și dreptul de vot",
        "Protecția mediului",
        "Libertatea religioasă",
        "Compensațiile muncitorilor",
      ],
    },
    correctIndex: 0,
    explanation: {
      en: "Susan B. Anthony devoted her life to women's suffrage, leading directly to the 19th Amendment ratified in 1920, guaranteeing women the right to vote.",
      ro: "Susan B. Anthony și-a dedicat viața dreptului de vot al femeilor, culminând cu al 19-lea Amendament ratificat în 1920.",
    },
    historicalFact: {
      en: "In 1872, Anthony was arrested and convicted for voting illegally in Rochester, New York, in the presidential election.",
      ro: "În 1872, Anthony a fost arestată și condamnată pentru că a votat „ilegal” în alegerile prezidențiale din Rochester, New York.",
    },
  },
];

