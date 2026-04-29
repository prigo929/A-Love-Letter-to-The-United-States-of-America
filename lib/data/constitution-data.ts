// ─── Constitution & Democracy Section Data ────────────────────────────────────
// Central data store for Phase 6.
// All Amendment objects strictly follow the Amendment interface — no extras.

import type { Locale } from "@/lib/i18n/config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConstitutionMetric {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  sublabel: string;
}

export interface FoundingFather {
  id: string;
  name: string;
  years: string;
  role: string;
  quote: string;
  quoteSource: string;
  portraitSrc: string;
  portraitAlt: string;
  contributions: string[];
  recommendedReading: { title: string; author: string }[];
  cx: number; // % on SVG canvas
  cy: number;
  connections: string[];
}

export interface ConstitutionClause {
  id: string;
  article: string;
  name: string;
  originalText: string;
  summary: string;
  impactUS: string;
  impactWorld: string;
  context1787: string;
  contextToday: string;
  timeline: { year: number; event: string; detail: string }[];
  tension: "settled" | "moderate" | "contested" | "highly-contested";
}

export interface Amendment {
  number: number;
  romanNumeral: string;
  name: string;
  oneliner: string;
  originalText: string;
  whatItMeans: string[];
  realWorldExamples: string[];
  globalComparison: { country: string; comparison: string }[];
  deepDiveHref?: string;
  color: "gold" | "red" | "blue";
}

export interface PresidentialTransfer {
  year: number;
  from: string;
  to: string;
  context: string;
  crisis?: boolean;
  crisisDetail?: string;
  verdict?: string;
}

export interface StatePolicy {
  id: string;
  name: string;
  abbr: string;
  corporateTax: number;
  minWage: number;
  regulatoryIndex: number;
  gdpGrowth5yr: number;
  netMigration: number;
  businessRank: number;
  cx: number;
  cy: number;
}

export interface PowersCheckExample {
  id: string;
  label: string;
  year: number;
  from: "legislative" | "executive" | "judicial";
  to: "legislative" | "executive" | "judicial";
  summary: string;
  detail: string;
}

// ─── Constitution Metrics ─────────────────────────────────────────────────────

export const CONSTITUTION_METRICS: ConstitutionMetric[] = [
  { id: "years",      value: 237,  label: "Years of Continuous Constitutional Government", sublabel: "Longest in recorded history" },
  { id: "articles",   value: 7,    label: "Articles in the Original Constitution",          sublabel: "Architectural elegance" },
  { id: "amendments", value: 27,   label: "Amendments Ratified",                            sublabel: "In 237 years — barely altered" },
  { id: "elections",  value: 59,   label: "Presidential Elections",                          sublabel: "Zero coups. Zero suspensions." },
  { id: "words",      value: 4543, label: "Words That Govern a $31 Trillion Economy",       sublabel: "Shortest major national constitution" },
];

// ─── Founding Fathers — Public-Domain Oil Paintings from Wikimedia Commons ───

export const FOUNDING_FATHERS: FoundingFather[] = [
  {
    id: "washington",
    name: "George Washington",
    years: "1732–1799",
    role: "Commander-in-Chief · 1st President · President of the Constitutional Convention",
    quote: "The Constitution is the guide which I never will abandon.",
    quoteSource: "Letter to Boston Selectmen, July 28, 1795",
    portraitSrc: "/images/founders/george-washington.jpg",
    portraitAlt: "George Washington — Gilbert Stuart Athenaeum Portrait, 1796",
    cx: 50, cy: 18,
    connections: ["hamilton", "madison", "adams"],
    contributions: [
      "Presided over the Constitutional Convention — his presence gave the proceedings legitimacy no one else could provide",
      "Voluntarily surrendered power after two terms — establishing the precedent that saved the republic from monarchy",
      "His Farewell Address warned against political parties and foreign entanglements — still read aloud in the Senate each February",
      "Chose not to become king when offered — a decision that defined the entire trajectory of American democracy",
      "His integrity became the standard against which every subsequent president is measured",
    ],
    recommendedReading: [
      { title: "Washington: A Life", author: "Ron Chernow" },
      { title: "His Excellency: George Washington", author: "Joseph Ellis" },
    ],
  },
  {
    id: "hamilton",
    name: "Alexander Hamilton",
    years: "1755–1804",
    role: "Author of 51 Federalist Papers · 1st Secretary of the Treasury · Architect of American Finance",
    quote: "A nation which can prefer disgrace to danger is prepared for a master, and deserves one.",
    quoteSource: "The Full Vindication of the Measures of Congress, 1774",
    portraitSrc: "/images/founders/alexander-hamilton.jpg",
    portraitAlt: "Alexander Hamilton — John Trumbull portrait, 1806",
    cx: 75, cy: 38,
    connections: ["madison", "jay", "washington"],
    contributions: [
      "Authored 51 of 85 Federalist Papers — the greatest sustained defense of constitutional government ever written",
      "Designed the US Treasury, national banking system, and America's financial architecture — still operational today",
      "Created the concept of 'implied powers' — making the Constitution adaptive across centuries",
      "Established the framework for judicial review later formalized in Marbury v. Madison",
      "Negotiated the Jay Treaty — America's first major foreign policy test of constitutional government",
    ],
    recommendedReading: [
      { title: "Alexander Hamilton", author: "Ron Chernow" },
      { title: "The Federalist Papers", author: "Hamilton, Madison & Jay" },
    ],
  },
  {
    id: "madison",
    name: "James Madison",
    years: "1751–1836",
    role: "Father of the Constitution · Author of the Bill of Rights · 4th President",
    quote: "The accumulation of all powers in the same hands may justly be pronounced the very definition of tyranny.",
    quoteSource: "Federalist No. 47, 1788",
    portraitSrc: "/images/founders/james-madison.jpg",
    portraitAlt: "James Madison — Gilbert Stuart portrait, 1821",
    cx: 62, cy: 52,
    connections: ["hamilton", "jefferson", "jay"],
    contributions: [
      "Drafted the Virginia Plan — the framework that became the Constitution's structural foundation",
      "Authored the Bill of Rights — the first ten amendments that secured ratification",
      "Co-wrote The Federalist Papers (29 essays) — the definitive explanation of constitutional principles",
      "Created the system of checks and balances that prevents any single faction from dominating",
      "His convention notes are the primary historical record of how the Constitution was made",
    ],
    recommendedReading: [
      { title: "James Madison: A Life Reconsidered", author: "Lynne Cheney" },
      { title: "The Quartet", author: "Joseph Ellis" },
    ],
  },
  {
    id: "jefferson",
    name: "Thomas Jefferson",
    years: "1743–1826",
    role: "Author of the Declaration of Independence · 3rd President · Founder of the University of Virginia",
    quote: "The tree of liberty must be refreshed from time to time with the blood of patriots and tyrants.",
    quoteSource: "Letter to William Stephens Smith, November 13, 1787",
    portraitSrc: "/images/founders/thomas-jefferson.jpg",
    portraitAlt: "Thomas Jefferson — Rembrandt Peale portrait, 1800",
    cx: 28, cy: 52,
    connections: ["madison", "adams", "washington"],
    contributions: [
      "Authored the Declaration of Independence — establishing the philosophical foundation of American self-governance",
      "Championed religious liberty and separation of church and state, establishing the model for the First Amendment",
      "The Louisiana Purchase doubled the nation's size — the greatest land deal in history",
      "Founded the University of Virginia — embodying the belief that democracy requires an educated citizenry",
      "His 1800 election was the first peaceful transfer between opposing political parties",
    ],
    recommendedReading: [
      { title: "American Sphinx", author: "Joseph Ellis" },
      { title: "Jefferson: Architect of American Liberty", author: "John Boles" },
    ],
  },
  {
    id: "franklin",
    name: "Benjamin Franklin",
    years: "1706–1790",
    role: "Diplomat · Scientist · Author · Oldest Signer of the Constitution at 81",
    quote: "I agree to this Constitution with all its faults because I think a general Government necessary for us.",
    quoteSource: "Speech to the Constitutional Convention, September 17, 1787",
    portraitSrc: "/images/founders/benjamin-franklin.jpg",
    portraitAlt: "Benjamin Franklin — Joseph Siffrein Duplessis portrait, 1778",
    cx: 20, cy: 32,
    connections: ["washington", "adams", "jefferson"],
    contributions: [
      "At 81, the oldest delegate — his presence gave the Convention gravitas and his compromises broke deadlocks",
      "Negotiated the Treaty of Alliance with France (1778) — securing the aid that won the Revolution",
      "His closing speech proposing unanimous ratification remains the most eloquent argument for constitutional imperfection",
      "Founded America's first public library, fire department, and postal system",
      "Proved lightning was electricity — the archetypal American genius for science and practical invention",
    ],
    recommendedReading: [
      { title: "Benjamin Franklin: An American Life", author: "Walter Isaacson" },
      { title: "Franklin & Washington", author: "Edward Larson" },
    ],
  },
  {
    id: "adams",
    name: "John Adams",
    years: "1735–1826",
    role: "1st Vice President · 2nd President · Author of the Massachusetts Constitution",
    quote: "Our Constitution was made only for a moral and religious people. It is wholly inadequate to the government of any other.",
    quoteSource: "Letter to the Massachusetts Militia, October 11, 1798",
    portraitSrc: "/images/founders/john-adams.jpg",
    portraitAlt: "John Adams — Gilbert Stuart portrait, c. 1800–1815, National Gallery of Art",
    cx: 38, cy: 38,
    connections: ["washington", "jefferson", "franklin"],
    contributions: [
      "Authored the Massachusetts Constitution (1780) — the direct model for the US Constitution's structure",
      "Served as the first Vice President, establishing norms for a role the Constitution left largely undefined",
      "His peaceful surrender of power in 1801 after losing to Jefferson proved constitutional government could survive partisan transfer",
      "Secured American independence through diplomacy in Paris — the Treaty of Paris ended the Revolutionary War",
      "Appointed John Marshall as Chief Justice — who would define the Supreme Court's role for a generation",
    ],
    recommendedReading: [
      { title: "John Adams", author: "David McCullough" },
      { title: "Friends Divided", author: "Gordon Wood" },
    ],
  },
];

// ─── Constitution Clauses ─────────────────────────────────────────────────────

export const CONSTITUTION_CLAUSES: ConstitutionClause[] = [
  {
    id: "commerce",
    article: "Article I · Section 8 · Clause 3",
    name: "The Commerce Clause",
    originalText: "To regulate Commerce with foreign Nations, and among the several States, and with the Indian Tribes;",
    summary: "32 words that authorize virtually every federal economic regulation.",
    impactUS: "These 32 words authorize every federal regulation of the American economy — from the Civil Rights Act of 1964 to FDA food safety standards. The Commerce Clause is the constitutional backbone of the $31 trillion American economy.",
    impactWorld: "By creating a frictionless free-trade zone across a continent, it enabled the US to become an economic superpower. It serves as the primary template for the European Union's single market.",
    context1787: "States were taxing goods from neighboring states like foreign nations. Virginia taxed Maryland goods at the Potomac River crossing. The new nation was fracturing economically.",
    contextToday: "Federal courts cite this clause 847 times per year in commercial disputes. Amazon's interstate commerce, pharmaceutical regulations, and agricultural subsidies are all authorized by 32 words written in 1787.",
    timeline: [
      { year: 1824, event: "Gibbons v. Ogden", detail: "Broke Vanderbilt's steamboat monopoly, opening interstate commerce to competition." },
      { year: 1964, event: "Heart of Atlanta Motel v. US", detail: "Hotels must serve all races — the Commerce Clause made the Civil Rights Act constitutional." },
      { year: 2012, event: "NFIB v. Sebelius", detail: "ACA case tested Commerce Clause limits. Roberts upheld the mandate on taxing power, acknowledging the clause has limits." },
    ],
    tension: "moderate",
  },
  {
    id: "first-amendment",
    article: "Amendment I",
    name: "Freedom of Speech, Religion & Press",
    originalText: "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press...",
    summary: "The broadest free speech protection in the world — protecting even speech 95% of Americans find repugnant.",
    impactUS: "The United States protects more speech than any other democracy. Burning the flag, neo-Nazi marches, and offensive art are all legally protected. It shapes how social media companies operate natively.",
    impactWorld: "It established the global gold standard for free expression. Even international human rights tribunals often look to First Amendment jurisprudence when deciding global censorship cases.",
    context1787: "The Founders had lived through British censorship, licensing of the press, and imprisonment for criticizing the Crown. They were solving a problem they had personally experienced.",
    contextToday: "Simultaneously the most settled and most actively litigated constitutional provision. Social media, campaign finance, and religious liberty cases ensure it is never truly 'resolved.'",
    timeline: [
      { year: 1919, event: "Schenck v. United States", detail: "'Clear and present danger' test — first major First Amendment case." },
      { year: 1969, event: "Brandenburg v. Ohio", detail: "Modern standard: government can only restrict speech inciting 'imminent lawless action.'" },
      { year: 1989, event: "Texas v. Johnson", detail: "Flag burning is protected speech. Shocked many Americans but upheld the principle." },
    ],
    tension: "highly-contested",
  },
  {
    id: "second-amendment",
    article: "Amendment II",
    name: "Right to Bear Arms",
    originalText: "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.",
    summary: "27 words. The most actively litigated constitutional provision post-2022.",
    impactUS: "Heller (2008) confirmed an individual right to bear arms. Bruen (2022) changed how courts evaluate gun regulations. Over 40 states have active 2nd Amendment cases in flux.",
    impactWorld: "A uniquely American phenomenon. The US is one of only three countries globally (along with Mexico and Guatemala) that constitutionally protect the right to bear arms, profoundly isolating US gun culture from global norms.",
    context1787: "The Founders had just used armed citizens to defeat the most powerful military in the world and were deeply suspicious of standing armies.",
    contextToday: "Post-Bruen, lower courts have overturned laws ranging from bump stock bans to domestic violence restrictions. The legal doctrine is being entirely rebuilt.",
    timeline: [
      { year: 2008, event: "DC v. Heller", detail: "5-4: Individual right to possess firearms in the home for self-defense." },
      { year: 2022, event: "New York State Rifle & Pistol Assoc. v. Bruen", detail: "Laws must conform to historical tradition — overturning frameworks across the country." },
    ],
    tension: "highly-contested",
  },
  {
    id: "equal-protection",
    article: "Amendment XIV · Section 1",
    name: "Equal Protection Clause",
    originalText: "...nor deny to any person within its jurisdiction the equal protection of the laws.",
    summary: "Written to protect freed slaves — now protects everyone. The most consequential text since the original document.",
    impactUS: "Brown v. Board, Loving v. Virginia, Obergefell v. Hodges. The 14th Amendment's Equal Protection Clause has reshaped American society more than any legislative act.",
    impactWorld: "It introduced the concept of constitutional equality. The text profoundly influenced the UN's Universal Declaration of Human Rights and the equality clauses of post-WWII constitutions globally.",
    context1787: "Not in the original Constitution — ratified in 1868 after 750,000 Americans died answering whether Black Americans were persons under the law.",
    contextToday: "Currently contested: affirmative action in university admissions, racial gerrymandering, criminal justice disparities. The clause's meaning is perpetually renegotiated.",
    timeline: [
      { year: 1954, event: "Brown v. Board of Education", detail: "Separate is inherently unequal. Unanimous court corrected 58 years of error." },
      { year: 2015, event: "Obergefell v. Hodges", detail: "Marriage equality. 5-4. The 14th Amendment applied to same-sex couples." },
    ],
    tension: "highly-contested",
  },
  {
    id: "supremacy",
    article: "Article VI · Clause 2",
    name: "The Supremacy Clause",
    originalText: "This Constitution, and the Laws of the United States which shall be made in Pursuance thereof... shall be the supreme Law of the Land...",
    summary: "The clause that makes the United States one nation rather than 50 separate countries.",
    impactUS: "When state law conflicts with federal law, the Supremacy Clause settles it. It is why states couldn't nullify the Civil Rights Act and why Arizona's immigration enforcement was struck down.",
    impactWorld: "It pioneered the modern federal state system. Nations like Germany, Australia, and Brazil modeled their federal-state hierarchies explicitly on this clause to avoid fragmentation.",
    context1787: "Under the Articles of Confederation, states regularly ignored federal law. The nation was ungovernable. The Supremacy Clause was the constitutional answer.",
    contextToday: "Contested zones: immigration enforcement, marijuana legalization, environmental regulation preemption. The clause's application is never fully settled.",
    timeline: [
      { year: 1958, event: "Cooper v. Aaron", detail: "Arkansas cannot nullify Brown v. Board. Supremacy Clause is not optional." },
      { year: 2012, event: "Arizona v. United States", detail: "Arizona's immigration enforcement struck down — immigration is federal domain." },
    ],
    tension: "moderate",
  },
  {
    id: "necessary-proper",
    article: "Article I · Section 8 · Clause 18",
    name: "The Necessary & Proper Clause",
    originalText: "To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers...",
    summary: "The 'elastic clause' — stretching congressional power to meet every challenge the Founders couldn't foresee.",
    impactUS: "Without this clause, Congress could only do what the Constitution explicitly listed. With it, Congress created the Federal Reserve, NASA, the NSA, and the interstate highway system.",
    impactWorld: "It demonstrated that written constitutions don't have to be brittle. It showed emerging democracies how to write a foundational document that survives the industrial and digital revolutions without snapping.",
    context1787: "The Founders knew they couldn't enumerate every power needed to govern a growing nation. They needed a flexible connector between listed powers and practical governance.",
    contextToday: "Invoked to justify the Louisiana Purchase, national banking, the draft, and nearly every federal agency. The constitutional permission slip for the modern administrative state.",
    timeline: [
      { year: 1819, event: "McCulloch v. Maryland", detail: "Marshall upheld the Bank of the United States: 'We must never forget it is a constitution we are expounding.'" },
      { year: 1942, event: "Wickard v. Filburn", detail: "A farmer growing wheat for his own use was subject to federal regulation — the clause's maximum expansion." },
    ],
    tension: "moderate",
  },
  {
    id: "take-care",
    article: "Article II · Section 3",
    name: "The Take Care Clause",
    originalText: "...he shall take Care that the Laws be faithfully executed...",
    summary: "Nine words that define the President's core duty and maximum power.",
    impactUS: "This clause commands the President to enforce laws passed by Congress. However, it grants broad discretion in how to enforce them, serving as the basis for prosecutorial discretion and executive orders.",
    impactWorld: "It established the concept of the Chief Executive in a republic. Prior to this, executive power meant a King who made the laws. This defined the executive as a manager of laws made by the people.",
    context1787: "The Founders wanted an energetic executive to enforce the law, contrasting with the weak national government under the Articles of Confederation, but explicitly withheld the power to make laws.",
    contextToday: "Presidents use 'enforcement discretion' to shape policy without Congress—such as prioritizing certain environmental regulations over others.",
    timeline: [
      { year: 1952, event: "Youngstown Sheet & Tube Co. v. Sawyer", detail: "Truman couldn't seize steel mills to resolve a strike; the President must execute laws, not make them." },
      { year: 2014, event: "DACA Implementation", detail: "Obama used prosecutorial discretion under the Take Care Clause to defer deportation for childhood arrivals." },
    ],
    tension: "highly-contested",
  },
  {
    id: "impeachment",
    article: "Article II · Section 4",
    name: "The Impeachment Clause",
    originalText: "The President, Vice President and all civil Officers of the United States, shall be removed from Office on Impeachment for, and Conviction of, Treason, Bribery, or other high Crimes and Misdemeanors.",
    summary: "The ultimate failsafe mechanism against a tyrannical or corrupt executive.",
    impactUS: "It creates an escape hatch for democracy. Knowing it exists has deterred absolute power. It forced Nixon to resign and checked Clinton and Trump through grueling public trials.",
    impactWorld: "It revolutionized the concept of accountability. Before 1787, the only way to remove a head of state was assassination or violent revolution. This provided a legal mechanism for bloodless regime change.",
    context1787: "Benjamin Franklin noted that historically, removing a corrupt executive required assassination. The Founders wanted a peaceful, legal way to remove a rogue president without destroying the republic.",
    contextToday: "Highly weaponized in hyper-partisan eras. Once a 'break glass in case of emergency' tool, it has been used three times in the last 25 years.",
    timeline: [
      { year: 1868, event: "Andrew Johnson Impeachment", detail: "First presidential impeachment. Acquitted by a single vote in the Senate, establishing the precedent that impeachment is not just for political disagreement." },
      { year: 1974, event: "Nixon Resignation", detail: "Facing certain impeachment and conviction for Watergate, Nixon became the first and only president to resign." },
    ],
    tension: "highly-contested",
  },
  {
    id: "pardon",
    article: "Article II · Section 2",
    name: "The Pardon Power",
    originalText: "...and he shall have Power to grant Reprieves and Pardons for Offences against the United States, except in Cases of Impeachment.",
    summary: "The absolute, unreviewable power of mercy granted to one person.",
    impactUS: "Presidents have used it to heal national wounds (Ford pardoning Nixon, Carter pardoning draft dodgers) and to correct systemic injustices. It is the only unchecked power in the Constitution.",
    impactWorld: "Derived from the British monarch's 'prerogative of mercy,' it became a standard feature of modern republics, ensuring that the rigid justice system always has a human override.",
    context1787: "Alexander Hamilton argued that without a mechanism for mercy, the justice system would appear too cruel, and in times of rebellion, a well-timed pardon could restore tranquility.",
    contextToday: "Fiercely debated when presidents pardon political allies or preemptively pardon family members. The Supreme Court has repeatedly confirmed it cannot be limited by Congress or the Courts.",
    timeline: [
      { year: 1868, event: "Johnson's Amnesty Proclamation", detail: "Pardoned all former Confederates, aiming to quickly reunify a fractured nation post-Civil War." },
      { year: 1974, event: "Ford pardons Nixon", detail: "A highly controversial move that likely cost Ford the 1976 election but spared the country a multi-year trial of a former president." },
    ],
    tension: "moderate",
  },
  {
    id: "treaty",
    article: "Article II · Section 2",
    name: "The Treaty Clause",
    originalText: "He shall have Power, by and with the Advice and Consent of the Senate, to make Treaties, provided two thirds of the Senators present concur...",
    summary: "The architectural blueprint for American foreign policy.",
    impactUS: "It creates a massive hurdle for international agreements. A president can negotiate, but needing 67 Senators makes treaties incredibly difficult, heavily favoring American isolationism and executive agreements.",
    impactWorld: "It killed the League of Nations when the US Senate refused to ratify it, changing the course of the 20th century. The sheer difficulty of the 2/3rds requirement shapes how foreign nations negotiate with the US.",
    context1787: "The Founders wanted the President to lead foreign policy but feared one person could sell out the nation's interests to a foreign power. They forced the President to get the Senate's overwhelming approval.",
    contextToday: "Because formal treaties are so hard to pass, modern presidents use 'Executive Agreements' (like the Iran Nuclear Deal or Paris Climate Accord) which don't require Senate approval but can be instantly reversed by the next president.",
    timeline: [
      { year: 1919, event: "Senate Rejects Treaty of Versailles", detail: "Woodrow Wilson negotiated the end of WWI, but the Senate refused to ratify it, keeping the US out of the League of Nations." },
      { year: 1949, event: "NATO Treaty Ratified", detail: "The Senate overwhelmingly approved NATO, fundamentally shifting the US from an isolationist stance to a global superpower." },
    ],
    tension: "contested",
  },
  {
    id: "full-faith",
    article: "Article IV · Section 1",
    name: "The Full Faith and Credit Clause",
    originalText: "Full Faith and Credit shall be given in each State to the public Acts, Records, and judicial Proceedings of every other State.",
    summary: "The invisible glue that prevents chaos between state borders.",
    impactUS: "It ensures your New York driver's license works in Florida, your Texas marriage is valid in California, and a debt judgment in Ohio can be collected in Nevada. It makes 50 states function as one society.",
    impactWorld: "A revolutionary concept in federalism. It provided the intellectual foundation for the European Union's concept of mutual recognition across member states.",
    context1787: "Under the Articles of Confederation, states acted like foreign countries. A criminal could escape debt or justice simply by crossing a state line.",
    contextToday: "It was the central battleground for marriage equality before the Supreme Court ruled. Today, it is deeply contested regarding interstate abortion travel and gender-affirming care laws.",
    timeline: [
      { year: 1996, event: "Defense of Marriage Act (DOMA)", detail: "Congress explicitly tried to bypass this clause by allowing states to refuse to recognize same-sex marriages from other states." },
      { year: 2015, event: "V.L. v. E.L.", detail: "The Supreme Court ruled unanimously that states must recognize adoptions granted by other states, regardless of their own laws." },
    ],
    tension: "highly-contested",
  }
];

// ─── Bill of Rights — clean Amendment objects ────────────────────────────────

export const BILL_OF_RIGHTS: Amendment[] = [
  {
    number: 1, romanNumeral: "I",
    name: "Freedom of Speech, Religion, Press & Assembly",
    oneliner: "The broadest free speech protection of any democracy in history.",
    originalText: "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.",
    whatItMeans: [
      "Government cannot punish you for criticizing it — even harshly, even offensively",
      "No official government religion — and government cannot interfere with your faith",
      "A free press can publish government secrets if they serve the public interest",
      "You can assemble to protest and advocate — even causes the majority despises",
    ],
    realWorldExamples: [
      "Flag burning is constitutionally protected speech (Texas v. Johnson, 1989)",
      "The New York Times published the Pentagon Papers revealing government lies about Vietnam — protected",
      "Westboro Baptist Church can protest at military funerals with hateful signs — protected",
    ],
    globalComparison: [
      { country: "Germany", comparison: "Nazi symbols and Holocaust denial are criminally prohibited" },
      { country: "United Kingdom", comparison: "Offensive speech can violate 'public order' laws" },
      { country: "Canada", comparison: "Hate speech laws restrict expression based on identity characteristics" },
    ],
    deepDiveHref: "/constitution/first-amendment",
    color: "gold",
  },
  {
    number: 2, romanNumeral: "II",
    name: "Right to Bear Arms",
    oneliner: "An individual right to self-defense — the most actively litigated amendment post-2022.",
    originalText: "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.",
    whatItMeans: [
      "Individual Americans have a constitutional right to possess firearms for self-defense in the home",
      "This right applies against state governments as well as the federal government",
      "The government can impose some regulations — but they must conform to historical tradition",
      "The exact scope is actively being defined by dozens of current court cases",
    ],
    realWorldExamples: [
      "DC handgun ban struck down — unconstitutional (Heller, 2008)",
      "New York's license requirements for concealed carry overturned (Bruen, 2022)",
      "Over 40 states have active 2nd Amendment legal challenges post-Bruen",
    ],
    globalComparison: [
      { country: "Australia", comparison: "Semi-automatic weapons banned after 1996 Port Arthur massacre" },
      { country: "United Kingdom", comparison: "Handguns banned for civilians since 1997" },
      { country: "Japan", comparison: "Firearms essentially prohibited — ~10 gun deaths per year nationwide" },
    ],
    deepDiveHref: "/constitution/second-amendment",
    color: "red",
  },
  {
    number: 3, romanNumeral: "III",
    name: "Quartering of Soldiers",
    oneliner: "No soldier shall be quartered in your home — the amendment so successful it has never been litigated.",
    originalText: "No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.",
    whatItMeans: [
      "The government cannot force you to house soldiers in your home",
      "A direct response to the Quartering Acts of 1765 and 1774 — a colonial grievance the Founders personally experienced",
      "Has never been litigated before the Supreme Court — perhaps the ultimate example of constitutional success",
    ],
    realWorldExamples: [
      "Has never reached the Supreme Court — the problem was solved so thoroughly it never recurred",
      "Occasionally cited in privacy law cases as evidence of the Constitution's general protection of the home",
    ],
    globalComparison: [
      { country: "United Kingdom", comparison: "No equivalent protection — Parliament could technically legislate it" },
      { country: "Most Nations", comparison: "No specific provision — this was a uniquely colonial American grievance" },
    ],
    color: "blue",
  },
  {
    number: 4, romanNumeral: "IV",
    name: "Protection Against Unreasonable Search & Seizure",
    oneliner: "Police need a warrant — the constitutional firewall between citizen and state surveillance.",
    originalText: "The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause...",
    whatItMeans: [
      "Police generally need a warrant supported by probable cause to search your home",
      "Evidence obtained through illegal search often cannot be used at trial (exclusionary rule)",
      "Extends to digital data — your emails, texts, and phone location have Fourth Amendment protection",
      "Your car, your body, and your papers are constitutionally protected from arbitrary government intrusion",
    ],
    realWorldExamples: [
      "If police search your car without consent or probable cause, drug evidence found may be inadmissible",
      "Police must get a warrant before accessing your cell phone location data (Carpenter v. US, 2018)",
      "NSA bulk phone metadata collection programs were curtailed after Fourth Amendment challenges",
    ],
    globalComparison: [
      { country: "France", comparison: "Police can conduct administrative searches without warrants in some circumstances" },
      { country: "China", comparison: "No effective judicial review of police searches — largely unrestricted" },
    ],
    color: "gold",
  },
  {
    number: 5, romanNumeral: "V",
    name: "Grand Jury, Double Jeopardy, Self-Incrimination & Due Process",
    oneliner: "You cannot be forced to testify against yourself — the amendment that put 'pleading the 5th' into American vocabulary.",
    originalText: "No person shall be held to answer for a capital crime, unless on indictment of a Grand Jury... nor shall any person be subject for the same offence to be twice put in jeopardy... nor shall be compelled in any criminal case to be a witness against himself...",
    whatItMeans: [
      "23 ordinary citizens must agree there's probable cause before you face federal felony charges",
      "You cannot be tried twice for the same crime after acquittal (double jeopardy)",
      "You cannot be compelled to testify against yourself — the foundation of 'pleading the 5th'",
      "The government cannot take your property without just compensation (Takings Clause)",
    ],
    realWorldExamples: [
      "O.J. Simpson could not be retried for murder after his acquittal (double jeopardy)",
      "Executives routinely 'plead the 5th' in congressional hearings — fully protected",
      "Fifth Amendment Takings Clause requires government to pay you when it takes property for public use",
    ],
    globalComparison: [
      { country: "United Kingdom", comparison: "Abolished grand juries in 1933 — government prosecutors alone decide charges" },
      { country: "Most of Europe", comparison: "Examining magistrates (government employees) decide whether to charge — not citizens" },
    ],
    color: "blue",
  },
  {
    number: 6, romanNumeral: "VI",
    name: "Right to a Speedy Trial, Jury & Counsel",
    oneliner: "Speedy trial, impartial jury, and the right to an attorney — even if you can't afford one.",
    originalText: "In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury... and to have the Assistance of Counsel for his defence.",
    whatItMeans: [
      "The government cannot indefinitely delay your trial",
      "Your trial must be public — secret trials are unconstitutional",
      "You have the right to know the charges and confront witnesses against you",
      "If you can't afford a lawyer, the government must provide one (Gideon v. Wainwright, 1963)",
    ],
    realWorldExamples: [
      "Gideon v. Wainwright (1963) established that indigent defendants must receive free legal representation",
      "High-profile criminal trials must be open to press and public — no secret proceedings",
    ],
    globalComparison: [
      { country: "France", comparison: "Examining magistrate system — less transparent than US public jury trials" },
      { country: "Japan", comparison: "Criminal conviction rate exceeds 99% — US adversarial system produces very different outcomes" },
    ],
    color: "gold",
  },
  {
    number: 7, romanNumeral: "VII",
    name: "Right to Jury Trial in Civil Cases",
    oneliner: "Significant civil disputes go to a jury of your peers — not just a judge.",
    originalText: "In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved...",
    whatItMeans: [
      "In significant civil cases, either party can demand a jury trial instead of a judge alone deciding",
      "This protects against judicial bias and gives ordinary citizens power over major disputes",
      "Personal injury, contract disputes, and civil rights cases often feature juries",
    ],
    realWorldExamples: [
      "Major corporate liability cases routinely go to jury trials that produce billion-dollar verdicts",
      "Civil rights cases are frequently decided by juries — citizen checks on institutional power",
    ],
    globalComparison: [
      { country: "United Kingdom", comparison: "Civil jury trials are rare and not a constitutional right" },
      { country: "Germany", comparison: "No civil jury trials — judges alone decide all civil cases" },
    ],
    color: "red",
  },
  {
    number: 8, romanNumeral: "VIII",
    name: "Protection Against Cruel & Unusual Punishment",
    oneliner: "The government cannot torture you — and 'cruel and unusual' evolves with civilized standards.",
    originalText: "Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.",
    whatItMeans: [
      "Bail cannot be set at an amount designed to ensure you remain imprisoned before trial",
      "Fines cannot be grossly disproportionate to the offense",
      "The government cannot inflict punishment that 'shocks the conscience' of civilized society",
      "'Cruel and unusual' is not fixed — courts apply 'evolving standards of decency'",
    ],
    realWorldExamples: [
      "Execution of intellectually disabled persons violates the 8th Amendment (Atkins v. Virginia, 2002)",
      "Life without parole for juvenile non-homicide offenses is unconstitutional (Graham v. Florida, 2010)",
      "Civil asset forfeiture fines face 8th Amendment 'excessive fines' challenges (Timbs v. Indiana, 2019)",
    ],
    globalComparison: [
      { country: "Most of Europe", comparison: "Death penalty entirely abolished — through legislation, not constitutional mandate" },
      { country: "United Kingdom", comparison: "No equivalent constitutional provision — Parliament could theoretically reinstate corporal punishment" },
    ],
    color: "blue",
  },
  {
    number: 9, romanNumeral: "IX",
    name: "Rights Retained by the People",
    oneliner: "The Constitution's explicit acknowledgment that it didn't enumerate every right.",
    originalText: "The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.",
    whatItMeans: [
      "The Bill of Rights does not claim to be a complete list of your rights",
      "Rights not mentioned in the Constitution are still rights — they're just not listed",
      "Privacy, for example, is not mentioned explicitly but has been recognized as a constitutional right",
      "A safeguard against interpreting the Constitution as limiting freedom to only what it explicitly mentions",
    ],
    realWorldExamples: [
      "The right to privacy in Griswold v. Connecticut (1965) drew partly on the Ninth Amendment",
      "The right to travel, not listed, is recognized as a fundamental constitutional right",
      "The right to raise your children as you choose is unenumerated but constitutionally protected",
    ],
    globalComparison: [
      { country: "Germany", comparison: "Article 2 of the Basic Law provides a broad 'right to free development of personality'" },
      { country: "European Convention", comparison: "Article 8 provides a broad 'right to private life' rather than relying on unenumerated rights" },
    ],
    color: "gold",
  },
  {
    number: 10, romanNumeral: "X",
    name: "Powers Reserved to States & the People",
    oneliner: "The constitutional foundation of federalism — powers not given to the feds stay with states or citizens.",
    originalText: "The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.",
    whatItMeans: [
      "All powers not explicitly granted to the federal government belong to the states or the people",
      "This is the constitutional foundation of American federalism — why 50 states can have different laws",
      "States can ban marijuana or legalize it, have high or low taxes, strict or lenient regulations",
      "The tension between federal and state power is built into the design — a feature, not a bug",
    ],
    realWorldExamples: [
      "24 states have legalized marijuana despite federal prohibition — 10th Amendment limits federal enforcement power",
      "Texas executes prisoners under state law while federal executions were paused — different sovereign authority",
      "California sets stricter car emissions standards than federal EPA rules under Clean Air Act waiver",
    ],
    globalComparison: [
      { country: "France", comparison: "Unitary state — national law applies uniformly, no equivalent regional autonomy" },
      { country: "Germany", comparison: "Federal system but far less state-to-state variation than the US" },
    ],
    color: "red",
  },
];

// ─── Presidential Transfers ───────────────────────────────────────────────────

export const PRESIDENTIAL_TRANSFERS: PresidentialTransfer[] = [
  { year: 1797, from: "George Washington",    to: "John Adams",           context: "The first voluntary surrender of presidential power in history. The world watched, expecting Washington to remain king." },
  { year: 1801, from: "John Adams",           to: "Thomas Jefferson",     context: "First transfer between opposing parties. Federalists feared Jefferson would destroy the republic.", crisis: true, crisisDetail: "Army officers discussed intervention. Federalists considered refusing to certify the election.", verdict: "Adams got in his carriage and rode home to Massachusetts. Jefferson was inaugurated 36 days later. The machinery held." },
  { year: 1809, from: "Thomas Jefferson",     to: "James Madison",        context: "Jefferson voluntarily limited himself to two terms, citing Washington's precedent." },
  { year: 1829, from: "John Quincy Adams",    to: "Andrew Jackson",       context: "First populist transfer — establishment candidate defeated by frontier general. The republic survived." },
  { year: 1861, from: "James Buchanan",       to: "Abraham Lincoln",      context: "Seven states had seceded before Lincoln was inaugurated. The union was literally breaking apart.", crisis: true, crisisDetail: "A secessionist plot to assassinate Lincoln during transit was discovered. Southern states were leaving.", verdict: "Lincoln was inaugurated on schedule. The constitutional process continued despite the greatest threat in history." },
  { year: 1877, from: "Ulysses S. Grant",     to: "Rutherford B. Hayes",  context: "The most disputed election in US history until 2000 — required a special Electoral Commission.", crisis: true, crisisDetail: "Three states submitted competing electoral slates. The election was unresolved until three days before inauguration.", verdict: "A bipartisan Electoral Commission of 15 members resolved the dispute. Hayes was inaugurated on schedule." },
  { year: 1933, from: "Herbert Hoover",       to: "Franklin Roosevelt",   context: "The Great Depression. 25% unemployment. Democratic civilization appeared to be failing worldwide.", crisis: true, crisisDetail: "Mussolini had seized Italy, Hitler was taking Germany, and there were genuine calls for FDR to become dictator.", verdict: "FDR rejected authoritarian power. He worked through constitutional channels. The republic survived its greatest economic test." },
  { year: 1963, from: "John F. Kennedy",      to: "Lyndon B. Johnson",    context: "Kennedy assassinated. Johnson sworn in on Air Force One within hours. Constitutional succession worked." },
  { year: 1974, from: "Richard Nixon",        to: "Gerald Ford",          context: "Nixon resigned rather than face certain impeachment. The only presidential resignation in history.", crisis: true, crisisDetail: "Watergate: Nixon ordered obstruction of a criminal investigation. Articles of impeachment were ready.", verdict: "Nixon resigned. Ford was sworn in peacefully. 'Our long national nightmare is over.' The system worked." },
  { year: 2001, from: "Bill Clinton",         to: "George W. Bush",       context: "Supreme Court decided the 2000 election — constitutional machinery invoked.", crisis: true, crisisDetail: "Florida's 537-vote margin triggered recounts. The election was uncertain for 36 days.", verdict: "The Supreme Court ruled 5-4. Gore conceded. Bush was inaugurated. The constitutional process held." },
  { year: 2009, from: "George W. Bush",       to: "Barack Obama",         context: "First Black president in American history. Peaceful transfer, as always." },
  { year: 2017, from: "Barack Obama",         to: "Donald Trump",         context: "Political earthquake — populist outsider defeated the political establishment." },
  { year: 2021, from: "Donald Trump",         to: "Joe Biden",            context: "January 6th breach of the Capitol. Most violent disruption to a transfer in modern history.", crisis: true, crisisDetail: "A mob breached the Capitol while Congress was certifying electoral votes. For hours the transfer was in jeopardy.", verdict: "Congress reconvened at midnight. Certification completed. Biden inaugurated January 20th. For the 59th consecutive time, the constitutional process held." },
  { year: 2025, from: "Joe Biden",            to: "Donald Trump",         context: "Biden chose not to seek re-election and endorsed his Vice President — a democratic act that shaped the 2024 race." },
];

// ─── State Policy Data ────────────────────────────────────────────────────────

export const STATES_POLICY_DATA: StatePolicy[] = [
  { id: "TX", name: "Texas",      abbr: "TX", corporateTax: 0,    minWage: 7.25,  regulatoryIndex: 2.1, gdpGrowth5yr: 4.2, netMigration: 380,  businessRank: 2,  cx: 300, cy: 440 },
  { id: "FL", name: "Florida",    abbr: "FL", corporateTax: 5.5,  minWage: 12.0,  regulatoryIndex: 3.2, gdpGrowth5yr: 4.0, netMigration: 300,  businessRank: 3,  cx: 530, cy: 470 },
  { id: "CA", name: "California", abbr: "CA", corporateTax: 8.84, minWage: 16.0,  regulatoryIndex: 8.7, gdpGrowth5yr: 2.8, netMigration: -340, businessRank: 18, cx: 70,  cy: 300 },
  { id: "NY", name: "New York",   abbr: "NY", corporateTax: 7.25, minWage: 16.0,  regulatoryIndex: 7.8, gdpGrowth5yr: 2.1, netMigration: -250, businessRank: 44, cx: 600, cy: 190 },
  { id: "TN", name: "Tennessee",  abbr: "TN", corporateTax: 0,    minWage: 7.25,  regulatoryIndex: 2.5, gdpGrowth5yr: 3.8, netMigration: 89,   businessRank: 4,  cx: 490, cy: 360 },
  { id: "CO", name: "Colorado",   abbr: "CO", corporateTax: 4.4,  minWage: 14.42, regulatoryIndex: 4.8, gdpGrowth5yr: 3.1, netMigration: 44,   businessRank: 11, cx: 250, cy: 320 },
  { id: "GA", name: "Georgia",    abbr: "GA", corporateTax: 5.75, minWage: 7.25,  regulatoryIndex: 3.5, gdpGrowth5yr: 3.5, netMigration: 95,   businessRank: 6,  cx: 540, cy: 400 },
  { id: "AZ", name: "Arizona",    abbr: "AZ", corporateTax: 4.9,  minWage: 14.35, regulatoryIndex: 3.8, gdpGrowth5yr: 3.6, netMigration: 99,   businessRank: 7,  cx: 140, cy: 380 },
  { id: "IL", name: "Illinois",   abbr: "IL", corporateTax: 9.5,  minWage: 14.0,  regulatoryIndex: 7.2, gdpGrowth5yr: 1.5, netMigration: -141, businessRank: 39, cx: 490, cy: 270 },
  { id: "NC", name: "N. Carolina",abbr: "NC", corporateTax: 2.5,  minWage: 7.25,  regulatoryIndex: 3.0, gdpGrowth5yr: 3.7, netMigration: 120,  businessRank: 5,  cx: 570, cy: 340 },
];

// ─── Checks & Balances Examples ──────────────────────────────────────────────

export const POWERS_CHECK_EXAMPLES: PowersCheckExample[] = [
  { id: "marbury",         label: "Marbury v. Madison (1803)",        year: 1803, from: "judicial",     to: "legislative", summary: "Judicial review established",               detail: "Marshall ruled the Supreme Court could strike down Acts of Congress — establishing the most powerful check in the constitutional system. Congress has never successfully challenged this power since." },
  { id: "court-packing",   label: "FDR's Court-Packing Plan (1937)", year: 1937, from: "executive",    to: "judicial",    summary: "President attempts to expand the Court",    detail: "FDR proposed adding 6 new justices to overcome opposition to the New Deal. Congress refused — even members of his own party. A popular president with massive congressional majorities could not dominate the judiciary." },
  { id: "watergate",       label: "Nixon & Watergate (1973–74)",      year: 1974, from: "legislative",  to: "executive",   summary: "Congress impeaches, President resigns",     detail: "House Judiciary Committee approved articles of impeachment. Republican leaders told Nixon he would be convicted. He resigned before the House voted — the only presidential resignation in history." },
  { id: "youngstown",      label: "Youngstown Sheet & Tube (1952)",   year: 1952, from: "judicial",     to: "executive",   summary: "Court limits presidential war powers",      detail: "Truman seized steel mills during the Korean War. The Court ruled 6-3 he lacked authority. Even in wartime, the executive cannot act without congressional authorization." },
  { id: "war-powers",      label: "War Powers Resolution (1973)",     year: 1973, from: "legislative",  to: "executive",   summary: "Congress limits the President's war authority", detail: "Congress passed the War Powers Resolution requiring presidential notification within 48 hours of military action and withdrawal within 60 days without authorization. Every President has considered it unconstitutional — none has challenged it in court." },
  { id: "clinton",         label: "Clinton Impeachment (1998–99)",    year: 1999, from: "legislative",  to: "executive",   summary: "House impeaches, Senate acquits",           detail: "House impeached Clinton for perjury and obstruction. Senate acquitted 50-50 on perjury. Clinton served out his term. The system worked: impeachment as check, acquittal as check on that check." },
];

// ─── Rights at Risk ───────────────────────────────────────────────────────────

export const RIGHTS_AT_RISK_STATS = [
  { value: 3_040_000_000, label: "People living in countries rated 'Not Free'", color: "gold" as const, source: "Freedom House 2026" },
  { value: 67,            label: "Countries that imprisoned journalists last year",                    color: "red"  as const, source: "Committee to Protect Journalists (CPJ) 2026" },
  { value: 83_000,        label: "People imprisoned for criticizing their government",               color: "gold" as const, source: "Amnesty International 2026" },
  { value: 12,            label: "Countries with a constitution older than 50 years",               color: "red"  as const, source: "Comparative Constitutions Project" },
];

export function getRightsAtRiskStats(isRo: boolean) {
  if (isRo) {
    return [
      { ...RIGHTS_AT_RISK_STATS[0], label: "Oameni care trăiesc în țări clasificate drept 'Nelibere'" },
      { ...RIGHTS_AT_RISK_STATS[1], label: "Țări care au încarcerat jurnaliști anul trecut" },
      { ...RIGHTS_AT_RISK_STATS[2], label: "Oameni încarcerați pentru criticarea guvernului lor" },
      { ...RIGHTS_AT_RISK_STATS[3], label: "Țări cu o constituție mai veche de 50 de ani" },
    ];
  }
  return RIGHTS_AT_RISK_STATS;
}

// ─── Sub-Page Navigation ──────────────────────────────────────────────────────

export const CONSTITUTION_SUB_PAGES = [
  {
    href: "/constitution/bill-of-rights",
    title: "The Bill of Rights",
    description: "10 amendments, 45 rights, 233 years of protection",
    imageSrc: "/images/constitution/bill-of-rights-page-1.jpg",
    imageAlt: "The Bill of Rights — original engrossed parchment, National Archives",
    badge: "10 Amendments",
  },
  {
    href: "/constitution/first-amendment",
    title: "First Amendment",
    description: "The broadest free speech protection in the world — and why it matters",
    imageSrc: "/images/constitution/national-archives-bill-of-rights.jpg",
    imageAlt: "Bill of Rights displayed at the National Archives",
    badge: "Free Speech",
  },
  {
    href: "/constitution/federalism",
    title: "Laboratories of Democracy",
    description: "50 states, 50 policy experiments — the world's greatest governance system",
    imageSrc: "/images/us-buildings/us-capitol.jpg",
    imageAlt: "United States Capitol building",
    badge: "50 States",
  },
  {
    href: "/constitution/separation-of-powers",
    title: "Separation of Powers",
    description: "The system that makes tyranny nearly impossible",
    imageSrc: "/images/us-buildings/us-supreme-court-building.jpg",
    imageAlt: "US Supreme Court building",
    badge: "3 Branches",
  },
  {
    href: "/constitution/democracy-track-record",
    title: "250 Years",
    description: "59 elections, zero coups — the unbroken record of American democracy",
    imageSrc: "/images/constitution/us-capitol-presidential-inauguration.jpg",
    imageAlt: "Presidential inauguration at the United States Capitol",
    badge: "Zero Coups",
  },
  {
    href: "/constitution/unique-features",
    title: "Only in America",
    description: "Elected DAs, grand juries, ballot initiatives — democratic mechanics found nowhere else",
    imageSrc: "/images/constitution/huntington-town-meeting.jpg",
    imageAlt: "Town meeting in Huntington, Vermont",
    badge: "Unique",
  },
];

// ─── i18n Getters ─────────────────────────────────────────────────────────────

export function getConstitutionSubPages(locale: Locale) {
  if (locale === "ro") {
    return [
      { ...CONSTITUTION_SUB_PAGES[0], title: "Declarația Drepturilor",     description: "10 amendamente, 45 drepturi, 233 de ani de protecție" },
      { ...CONSTITUTION_SUB_PAGES[1], title: "Primul Amendament",          description: "Cea mai largă protecție a libertății de exprimare din lume" },
      { ...CONSTITUTION_SUB_PAGES[2], title: "Laboratoare ale Democrației",description: "50 de state, 50 de experimente de politici publice" },
      { ...CONSTITUTION_SUB_PAGES[3], title: "Separarea Puterilor",        description: "Sistemul care face tirania aproape imposibilă" },
      { ...CONSTITUTION_SUB_PAGES[4], title: "250 de Ani",                 description: "59 de alegeri, niciun coup — recordul neîntrerupt al democrației americane" },
      { ...CONSTITUTION_SUB_PAGES[5], title: "Doar în America",            description: "Procurori aleși, jurii mari, inițiative cetățenești — mecanisme democratice unice în lume" },
    ];
  }
  return CONSTITUTION_SUB_PAGES;
}

export function getConstitutionMetrics(locale: Locale): ConstitutionMetric[] {
  if (locale === "ro") {
    return [
      { ...CONSTITUTION_METRICS[0], label: "Ani de Guvernare Constituțională Continuă",             sublabel: "Cel mai lung din istoria înregistrată" },
      { ...CONSTITUTION_METRICS[1], label: "Articole în Constituția Originală",                      sublabel: "Eleganță arhitecturală" },
      { ...CONSTITUTION_METRICS[2], label: "Amendamente Ratificate",                                 sublabel: "În 237 de ani — aproape neschimbată" },
      { ...CONSTITUTION_METRICS[3], label: "Alegeri Prezidențiale",                                  sublabel: "Zero lovituri de stat. Zero suspendări." },
      { ...CONSTITUTION_METRICS[4], label: "Cuvinte care Guvernează o Economie de 31 Trilioane $",   sublabel: "Cea mai scurtă constituție națională majoră" },
    ];
  }
  return CONSTITUTION_METRICS;
}

import { FOUNDING_FATHERS_RO, CONSTITUTION_CLAUSES_RO, BILL_OF_RIGHTS_RO, PRESIDENTIAL_TRANSFERS_RO, POWERS_CHECK_EXAMPLES_RO } from "./constitution-data-ro";

export function getFoundingFathers(isRo: boolean) {
  return isRo ? FOUNDING_FATHERS_RO : FOUNDING_FATHERS;
}

export function getConstitutionClauses(isRo: boolean) {
  return isRo ? CONSTITUTION_CLAUSES_RO : CONSTITUTION_CLAUSES;
}

export function getBillOfRights(isRo: boolean) {
  return isRo ? BILL_OF_RIGHTS_RO : BILL_OF_RIGHTS;
}

export function getPresidentialTransfers(isRo: boolean) {
  return isRo ? PRESIDENTIAL_TRANSFERS_RO : PRESIDENTIAL_TRANSFERS;
}

export function getPowersCheckExamples(isRo: boolean) {
  return isRo ? POWERS_CHECK_EXAMPLES_RO : POWERS_CHECK_EXAMPLES;
}
