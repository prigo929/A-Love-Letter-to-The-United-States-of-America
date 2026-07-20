// ─── Eight eras of American writing ──────────────────────────────────────────
// The spine of the literature hub. Each era carries the one question its writers
// were actually arguing about, because a list of names and dates teaches nobody
// anything — the useful thing is what changed and why.
//
// Structured from the standard periodisation and cross-checked against the
// "Story of American Literature" transcript in ASSETS/Literature. That transcript
// is an auto-captioned video and someone else's work, so it was used to decide
// coverage and emphasis, never copied: every line of prose here is written fresh.
//
// Dates are conventional rather than exact. Literary periods overlap and argue
// with each other at the seams, which is most of what makes them interesting, so
// treat the ranges as centres of gravity rather than borders.

export interface LiteraryEra {
  id: string;
  name: string;
  nameRo: string;
  from: number;
  to: number;
  /** The argument the era was having with itself. */
  question: string;
  questionRo: string;
  body: string;
  bodyRo: string;
  figures: string[];
  /** Optional page in this section that goes deeper. */
  href?: string;
}

export const LITERARY_ERAS: LiteraryEra[] = [
  {
    id: "colonial",
    name: "Colonial & Puritan",
    nameRo: "Colonial & Puritan",
    from: 1607,
    to: 1770,
    question: "Can a sermon be literature?",
    questionRo: "Poate fi o predică literatură?",
    body:
      "For a century and a half, American writing is sermons, diaries, captivity narratives and one remarkable poet. There are no novels because there is no audience and no printing economy to support them. What there is instead is a habit that never leaves American prose: the belief that writing is for examining your own conscience in public.",
    bodyRo:
      "Timp de un secol și jumătate, scrisul american înseamnă predici, jurnale, narațiuni ale captivității și o singură poetă remarcabilă. Nu există romane pentru că nu există public și nici o economie tipografică care să le susțină. Există în schimb un obicei care nu va părăsi niciodată proza americană: convingerea că scrisul serveşte la examinarea propriei conștiințe în public.",
    figures: ["Anne Bradstreet", "Cotton Mather", "Mary Rowlandson"],
  },
  {
    id: "revolutionary",
    name: "Revolution & Enlightenment",
    nameRo: "Revoluție & Iluminism",
    from: 1770,
    to: 1820,
    question: "Can an argument be art?",
    questionRo: "Poate fi un argument artă?",
    body:
      "The great American writing of this period is political: pamphlets, declarations, letters, a autobiography that invents the self-made man. Paine's Common Sense sold in numbers no novel would match for a century. The country's founding literary form is the argument, which is why its oratory tradition starts this strong.",
    bodyRo:
      "Marea scriitură americană a acestei perioade este politică: pamflete, declarații, scrisori și o autobiografie care inventează omul care se face pe sine. Common Sense al lui Paine s-a vândut în tiraje pe care niciun roman nu le va egala timp de un secol. Forma literară fondatoare a țării este argumentul, motiv pentru care tradiția sa oratorică pornește atât de puternic.",
    figures: ["Thomas Paine", "Benjamin Franklin", "Thomas Jefferson"],
    href: "/literature-philosophy/oratory-poetry",
  },
  {
    id: "romantic",
    name: "Romanticism & Transcendentalism",
    nameRo: "Romantism & Transcendentalism",
    from: 1820,
    to: 1865,
    question: "Is the individual conscience above the crowd?",
    questionRo: "Este conștiința individuală mai presus de mulțime?",
    body:
      "The moment American literature stops being provincial. Emerson argues the individual soul outranks every institution; Thoreau goes to jail to prove it; Whitman writes the first poetry that sounds like American speech. And underneath, the dark half: Poe, Hawthorne and Melville testing what happens when that sovereign self turns out to be monstrous.",
    bodyRo:
      "Momentul în care literatura americană încetează să fie provincială. Emerson susține că sufletul individual trece înaintea oricărei instituții; Thoreau ajunge la închisoare ca s-o dovedească; Whitman scrie prima poezie care sună a vorbire americană. Iar dedesubt, jumătatea întunecată: Poe, Hawthorne și Melville testând ce se întâmplă când acel sine suveran se dovedește monstruos.",
    figures: ["Ralph Waldo Emerson", "Henry David Thoreau", "Walt Whitman", "Emily Dickinson", "Herman Melville", "Edgar Allan Poe"],
    href: "/literature-philosophy/transcendentalism",
  },
  {
    id: "realism",
    name: "Realism & Naturalism",
    nameRo: "Realism & Naturalism",
    from: 1865,
    to: 1914,
    question: "What does America actually sound like?",
    questionRo: "Cum sună de fapt America?",
    body:
      "After the Civil War the romantic self looks like a luxury. Twain writes a novel in a boy's spoken grammar and changes the available register of American prose permanently. The naturalists go further and treat people as products of environment and heredity, which is a bleak idea and a useful corrective.",
    bodyRo:
      "După Războiul Civil, sinele romantic pare un lux. Twain scrie un roman în gramatica vorbită a unui băiat și schimbă definitiv registrul disponibil al prozei americane. Naturaliștii merg mai departe și tratează oamenii ca produse ale mediului și eredității, o idee sumbră și un corectiv util.",
    figures: ["Mark Twain", "Henry James", "Edith Wharton", "Stephen Crane"],
    href: "/literature-philosophy/american-novel",
  },
  {
    id: "modernism",
    name: "Modernism",
    nameRo: "Modernism",
    from: 1914,
    to: 1945,
    question: "What survives when the old forms break?",
    questionRo: "Ce supraviețuiește când formele vechi se rup?",
    body:
      "A war discredits the inherited vocabulary of honour and glory, and the response is to strip the language back. Hemingway removes the adjectives. Faulkner does the opposite and floods the sentence until chronology dissolves. Both are solving the same problem from opposite ends.",
    bodyRo:
      "Un război discreditează vocabularul moștenit al onoarei și gloriei, iar răspunsul este dezbrăcarea limbajului. Hemingway elimină adjectivele. Faulkner face exact opusul și inundă fraza până când cronologia se dizolvă. Amândoi rezolvă aceeași problemă din capete opuse.",
    figures: ["Ernest Hemingway", "William Faulkner", "F. Scott Fitzgerald", "T. S. Eliot"],
    href: "/literature-philosophy/american-novel",
  },
  {
    id: "harlem",
    name: "The Harlem Renaissance",
    nameRo: "Renașterea din Harlem",
    from: 1918,
    to: 1937,
    question: "Who gets to write the nation?",
    questionRo: "Cine are dreptul să scrie națiunea?",
    body:
      "Running alongside modernism rather than after it, and often ignored by the anthologies that canonised it. Hughes puts blues and jazz rhythm into verse. Hurston records Black Southern speech as a linguist would, then builds a novel out of it. The claim is not for inclusion in American literature but that this is American literature.",
    bodyRo:
      "Se desfășoară în paralel cu modernismul, nu după el, și adesea ignorată de antologiile care l-au canonizat. Hughes pune ritm de blues și jazz în vers. Hurston înregistrează vorbirea afro-americană sudică asemenea unui lingvist, apoi construiește un roman din ea. Revendicarea nu este includerea în literatura americană, ci că aceasta este literatura americană.",
    figures: ["Langston Hughes", "Zora Neale Hurston", "Nella Larsen", "Countee Cullen"],
  },
  {
    id: "postwar",
    name: "Postwar & the Beats",
    nameRo: "Postbelic & Generația Beat",
    from: 1945,
    to: 1970,
    question: "Who is invisible, and to whom?",
    questionRo: "Cine este invizibil și pentru cine?",
    body:
      "Prosperity arrives and the literature turns suspicious of it. Ellison and Baldwin write about being unseen inside a country congratulating itself; the Beats reject the whole arrangement and go looking for something else. The prose loosens, the sentence gets closer to speech again, and the essay becomes a major American form.",
    bodyRo:
      "Prosperitatea sosește, iar literatura devine suspicioasă față de ea. Ellison și Baldwin scriu despre a fi nevăzut într-o țară care se autofelicită; beatnicii resping întregul aranjament și pleacă în căutarea altceva. Proza se relaxează, fraza se apropie iar de vorbire, iar eseul devine o formă americană majoră.",
    figures: ["Ralph Ellison", "James Baldwin", "Jack Kerouac", "Flannery O'Connor"],
  },
  {
    id: "contemporary",
    name: "Postmodern & Contemporary",
    nameRo: "Postmodern & Contemporan",
    from: 1970,
    to: 2026,
    question: "Whose memory counts as history?",
    questionRo: "A cui memorie contează drept istorie?",
    body:
      "The postmodernists distrust the reliability of narrative itself. Morrison does something harder: she takes the history the record left out and writes it back with full novelistic weight, which turns out to be the more durable move. American fiction ends the century more various, more argued-over, and read more widely abroad than any other national literature.",
    bodyRo:
      "Postmoderniștii se îndoiesc de fiabilitatea narațiunii înseși. Morrison face ceva mai greu: ia istoria pe care arhiva a omis-o și o rescrie cu toată greutatea romanescă, iar acest gest se dovedește cel mai durabil. Ficțiunea americană încheie secolul mai variată, mai disputată și mai citită în străinătate decât orice altă literatură națională.",
    figures: ["Toni Morrison", "Thomas Pynchon", "Don DeLillo", "Cormac McCarthy"],
  },
];

export const ERA_SPAN = {
  first: LITERARY_ERAS[0].from,
  last: LITERARY_ERAS[LITERARY_ERAS.length - 1].to,
} as const;
