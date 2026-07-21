"use client";

// ─── BookShowcase: a 3D digital bookshelf ───────────────────────────────────
// Renders a premium, interactive showcase of primary source eBooks.
// Each book is rendered as a 3D book cover with hover perspective tilt,
// a realistic spine shadow, and elegant typography.
// Offers a clean, bilingual download button and an in-browser EPUB reader.

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export interface BookItem {
  title: string;
  author: string;
  year: string;
  fileName: string;
  // A book can appear on multiple pages — list all relevant categories.
  categories: Array<
    | "oratory-poetry"
    | "american-novel"
    | "transcendentalism"
    | "pragmatism"
    | "sci-fi-myth"
    | "founding-principles"
    | "free-markets"
    | "history-hub"
    | "american-dream"
    | "world-wars"
    | "cold-war"
    | "reagan-revolution"
    | "reform-and-rights"
    | "union-and-liberty"
    | "american-exceptionalism"
    | "frontier-and-expansion"
    | "industrial-rise"
    | "faith-and-reform"
    | "populism-and-labor"
    | "crisis-and-resilience"
    | "post-9-11-america"
  >;
  descriptionEn: string;
  descriptionRo: string;
  // Custom cover colors to make each book unique
  coverBg: string;
  textColor: string;
}

export const BOOK_DATABASE: BookItem[] = [
  // Oratory & Poetry
  {
    title: "Leaves of Grass",
    author: "Walt Whitman",
    year: "1855",
    fileName: "Leaves of Grass -- Whitman, Walt -- 1891 -- ePubLibre -- f244e32aa01e3f531779a7414319e39b -- Anna’s Archive.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "Whitman's life work, a collection of poems celebrating the self, democracy, and nature, written in free verse that broke the British mold.",
    descriptionRo: "Opera de o viață a lui Whitman, o colecție de poeme ce celebrează sinele, democrația și natura, scrisă în versuri libere care au spart tiparul britanic.",
    coverBg: "linear-gradient(135deg, #1e3f20 0%, #0c1a0e 100%)",
    textColor: "#e2e8f0",
  },
  {
    title: "Democratic Vistas",
    author: "Walt Whitman",
    year: "1871",
    fileName: "DemocraticVistas.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "A powerful prose essay analyzing the democratic experiment, its spiritual potential, and the role of literature in defining the national character.",
    descriptionRo: "Un eseu în proză puternic care analizează experimentul democratic, potențialul său spiritual și rolul literaturii în definirea caracterului național.",
    coverBg: "linear-gradient(135deg, #2b3a4a 0%, #111a24 100%)",
    textColor: "#e2e8f0",
  },
  // The American Novel
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    year: "1851",
    fileName: "Moby Dick -- Herman Melville -- 1851 -- Bookeen Press -- 450b2bc7bd14080f59aa473ccadea2e8 -- Anna’s Archive.epub",
    categories: ["american-novel"],
    descriptionEn: "An epic narrative of the whaling voyage of the Pequod, its obsessive captain Ahab, and a deep philosophical exploration of fate and belief.",
    descriptionRo: "O narațiune epică a călătoriei de vânătoare de balene a navei Pequod, a căpitanului Ahab obsedat și o explorare filosofică a destinului.",
    coverBg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    textColor: "#f8fafc",
  },
  {
    title: "Adventures of Huckleberry Finn",
    author: "Mark Twain",
    year: "1884",
    fileName: "The Adventures of Huckleberry Finn -- Mark Twain, Kanchana Ugbabe (Ed_) -- 1, 2020 -- J Krishnadev Rao -- isbn13 9789352878888 -- b5f0d7662c7a3cff04dd714bb59ee3db -- Anna’s Archive.epub",
    categories: ["american-novel"],
    descriptionEn: "Twain's masterpiece, written in spoken American vernacular, following a boy and an escaped slave on a raft down the Mississippi.",
    descriptionRo: "Capodopera lui Twain, scrisă în vernaculara americană vorbită, urmărind un băiat și un sclav evadat pe o plută de-a lungul Mississippi.",
    coverBg: "linear-gradient(135deg, #7c2d12 0%, #431407 100%)",
    textColor: "#ffedd5",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: "1925",
    fileName: "The Great Gatsby -- Fitzgerald, Francis Scott -- 2011 -- 42bd6cefee31d13b80746b19d98da5fa -- Anna’s Archive.epub",
    categories: ["american-novel"],
    descriptionEn: "A critique of the American Dream in the Roaring Twenties, exploring class, illusion, and obsession through the eyes of Nick Carraway.",
    descriptionRo: "O critică a visului american în anii '20, explorând clasa socială, iluzia și obsesia prin ochii lui Nick Carraway.",
    coverBg: "linear-gradient(135deg, #1a2e40 0%, #0a1320 100%)",
    textColor: "#d4af37",
  },
  {
    title: "The Sun Also Rises",
    author: "Ernest Hemingway",
    year: "1926",
    fileName: "The Sun Also Rises -- Ernest Hemingway [Hemingway, Ernest] -- 2011 -- 566c3e2916b1d878c10a5889455cff16 -- Anna’s Archive.epub",
    categories: ["american-novel"],
    descriptionEn: "The quintessential novel of the Lost Generation, detailing post-WWI disillusionment among expatriates traveling to Pamplona.",
    descriptionRo: "Romanul chintesențial al Generației Pierdute, detaliind deziluzia de după Primul Război Mondial în rândul expatriaților la Pamplona.",
    coverBg: "linear-gradient(135deg, #451a03 0%, #1c0a00 100%)",
    textColor: "#fef3c7",
  },
  {
    title: "Invisible Man",
    author: "Ralph Ellison",
    year: "1952",
    fileName: "The Invisible Man -- Ellison, Ralph -- 2011 -- e1cdca7d9efd0474aa3ebf037b7e6525 -- Anna’s Archive.epub",
    categories: ["american-novel"],
    descriptionEn: "Ellison's landmark novel detailing the social and psychological invisibility of a Black man navigating Mid-Century America.",
    descriptionRo: "Romanul de referință al lui Ellison detaliind invizibilitatea socială și psihologică a unui bărbat de culoare în America mijlocului de secol.",
    coverBg: "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
    textColor: "#f4f4f5",
  },
  {
    title: "Beloved",
    author: "Toni Morrison",
    year: "1987",
    fileName: "Beloved -- Toni Morrison -- 2007 -- Knopf Doubleday Publishing Group -- 8150655f0c1ad7700b6f378d95f490e5 -- Anna’s Archive.epub",
    categories: ["american-novel"],
    descriptionEn: "A Pulitzer Prize-winning novel detailing the haunting legacy of slavery, maternal love, and trauma in Reconstruction-era Ohio.",
    descriptionRo: "Un roman distins cu Premiul Pulitzer care detaliază moștenirea bântuitoare a sclaviei, dragostea maternă și trauma în Ohio postbelic.",
    coverBg: "linear-gradient(135deg, #581c87 0%, #2e1065 100%)",
    textColor: "#f3e8ff",
  },
  {
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    year: "1939",
    fileName: "The Grapes of Wrath -- Steinbeck, John -- 2011 -- 7b1209db6ea90b30ccc47c91593c42be -- Anna’s Archive.epub",
    categories: ["american-novel"],
    descriptionEn: "The epic story of the Joad family's migration from the Oklahoma Dust Bowl to California, celebrating human resilience and community.",
    descriptionRo: "Povestea epică a migrației familiei Joad din Dust Bowl, Oklahoma către California, celebrând rezistența umană și comunitatea.",
    coverBg: "linear-gradient(135deg, #022c22 0%, #012217 100%)",
    textColor: "#ecfdf5",
  },
  {
    title: "Catch-22",
    author: "Joseph Heller",
    year: "1961",
    fileName: "Catch-22 -- Heller, Joseph -- 2011 -- fec4bbc69560c34aaab6007137a6e1c6 -- Anna’s Archive.epub",
    categories: ["american-novel"],
    descriptionEn: "A satirical anti-war novel depicting the absurdity of bureaucratic logic in WWII military operations.",
    descriptionRo: "Un roman satiric anti-război care descrie absurditatea logicii birocratice în operațiunile militare din al Doilea Război Mondial.",
    coverBg: "linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)",
    textColor: "#fef2f2",
  },
  // Transcendentalism
  {
    title: "Nature",
    author: "Ralph Waldo Emerson",
    year: "1836",
    fileName: "Nature -- Ralph Waldo Emerson -- 2019 -- https---onemorelibrary_com -- ef764d3c4669256d8ed8f3b37bb31649 -- Anna’s Archive.epub",
    categories: ["transcendentalism"],
    descriptionEn: "The foundational essay of Transcendentalism, proposing that nature is a direct portal to the divine and a reflection of the human soul.",
    descriptionRo: "Eseul fondator al transcendentalismului, care propune că natura este un portal direct către divinitate și o reflectare a sufletului.",
    coverBg: "linear-gradient(135deg, #0f2e20 0%, #061c12 100%)",
    textColor: "#dcfce7",
  },
  {
    title: "Self-Reliance",
    author: "Ralph Waldo Emerson",
    year: "1841",
    fileName: "Self-Reliance and Other Essays.epub",
    categories: ["transcendentalism"],
    descriptionEn: "Emerson's famous essays urging nonconformity, reliance on personal genius, and trust in the individual conscience over societal dogma.",
    descriptionRo: "Faimoasele eseuri ale lui Emerson care îndeamnă la neconformism, încredere în geniul personal și ascultarea propriei conștiințe.",
    coverBg: "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)",
    textColor: "#ccfbf1",
  },
  {
    title: "Walden",
    author: "Henry David Thoreau",
    year: "1854",
    fileName: "Walden -- Henry David Thoreau -- 10f5083fa6af7278e94893f7cb10fc00 -- Anna’s Archive.epub",
    categories: ["transcendentalism"],
    descriptionEn: "Thoreau's journal of his two-year experiment in deliberate simplicity, self-reliance, and close observation of nature at Walden Pond.",
    descriptionRo: "Jurnalul lui Thoreau despre experimentul său de doi ani în simplitate deliberată, încredere în sine și observarea atentă a naturii.",
    coverBg: "linear-gradient(135deg, #14532d 0%, #052e16 100%)",
    textColor: "#dcfce7",
  },
  {
    title: "Walden & Civil Disobedience",
    author: "Henry David Thoreau",
    year: "1854 / 1849",
    fileName: "Walden, and On The Duty Of Civil Disobedience -- Henry David Thoreau -- 1994 -- bb29dd8cfe6284ec5a6ef7f22495c919 -- Anna’s Archive.epub",
    categories: ["transcendentalism"],
    descriptionEn: "A collected volume featuring both Thoreau's wilderness experiment and his political essay outlining moral resistance to unjust laws.",
    descriptionRo: "Un volum colectiv care cuprinde atât experimentul lui Thoreau în sălbăticie, cât și eseul său politic despre rezistența morală.",
    coverBg: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
    textColor: "#d1fae5",
  },
  // Pragmatism
  {
    title: "Pragmatism",
    author: "William James",
    year: "1907",
    fileName: "Pragmatism -- William James -- 2023 -- Standard Ebooks -- 7a32a698798873b201062657e55658c6 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "A popularization of America's native philosophy, proposing that truth is determined by the practical consequences of beliefs.",
    descriptionRo: "Popularizarea filosofiei autohtone a Americii, propunând că adevărul este determinat de consecințele practice ale credințelor.",
    coverBg: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
    textColor: "#dbeafe",
  },
  {
    title: "The Will to Believe",
    author: "William James",
    year: "1896",
    fileName: "The Will to Believe -- William James -- Jovian Press -- 0e553156e47cdee9b4cbb15c6f2d3d7f -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "An address defending religious and metaphysical beliefs in the absence of absolute empirical evidence, justifying faith as a pragmatic choice.",
    descriptionRo: "O lucrare care apără credințele religioase și metafizice în absența dovezilor empirice absolute, justificând credința ca alegere pragmatică.",
    coverBg: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)",
    textColor: "#dbeafe",
  },
  {
    title: "The Principles of Psychology",
    author: "William James",
    year: "1890",
    fileName: "The Principles of Psychology -- William James -- The University of Adelaide Library -- d022ab9fa717aa13607e0005ba92d7a6 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "James's monumental textbook establishing modern psychology, introducing concepts like the stream of consciousness.",
    descriptionRo: "Manualul monumental al lui James care a pus bazele psihologiei moderne, introducând concepte precum fluxul conștiinței.",
    coverBg: "linear-gradient(135deg, #172554 0%, #0f172a 100%)",
    textColor: "#eff6ff",
  },
  {
    title: "How We Think",
    author: "John Dewey",
    year: "1910",
    fileName: "How We Think -- Dewey, John -- 2019 -- Global Grey ebooks -- e0003c36304b36d6dc991e1464bbd1c7 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "Dewey's seminal book on reflective thinking, training minds, and the application of scientific method to education and learning.",
    descriptionRo: "Cartea fundamentală a lui Dewey despre gândirea reflexivă, antrenarea minții și aplicarea metodei științifice în educație.",
    coverBg: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)",
    textColor: "#e0e7ff",
  },
  {
    title: "Experience and Nature",
    author: "John Dewey",
    year: "1925",
    fileName: "Experience and Nature -- John Dewey -- INscribe Digital, Newburyport, 2012 -- Courier Corporation -- isbn13 9780486113104 -- bf1f9155c47863259451320cec8d47e5 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "Dewey's metaphysical treatise connecting human experience to nature, describing thoughts as instrumental tools.",
    descriptionRo: "Tratatul metafizic al lui Dewey care conectează experiența umană cu natura, descriind gândurile ca instrumente folositoare.",
    coverBg: "linear-gradient(135deg, #1e1b4b 0%, #090514 100%)",
    textColor: "#e0e7ff",
  },
  // Science Fiction & Myth
  {
    title: "Dune",
    author: "Frank Herbert",
    year: "1965",
    fileName: "Dune -- Herbert, Frank -- Dune, Bk 1, 1965 -- New York - Putnam -- 83a9ce006fe08b071ce630324fac3410 -- Anna’s Archive.epub",
    categories: ["sci-fi-myth"],
    descriptionEn: "An epic ecological and political science fiction masterpiece detailing spice trade, messianism, and survival on the desert planet Arrakis.",
    descriptionRo: "O capodoperă SF ecologică și politică detaliind comerțul cu mirodenii, mesianismul și supraviețuirea pe planeta Arrakis.",
    coverBg: "linear-gradient(135deg, #78350f 0%, #451a03 100%)",
    textColor: "#fef3c7",
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: "1953",
    fileName: "Fahrenheit 451 -- Ray Bradbury -- 2010 -- 67a7be7d336e20d6c3bd5ee1514858b9 -- Anna’s Archive.epub",
    categories: ["sci-fi-myth"],
    descriptionEn: "A dystopian novel depicting a society where books are outlawed and firemen burn any that are found, celebrating the preservation of human thought.",
    descriptionRo: "Un roman distopic care descrie o societate în care cărțile sunt interzise, celebrând conservarea gândirii umane.",
    coverBg: "linear-gradient(135deg, #991b1b 0%, #450a0a 100%)",
    textColor: "#fee2e2",
  },
  // Founding Principles
  {
    title: "Common Sense",
    author: "Thomas Paine",
    year: "1776",
    fileName: "paine-common-sense.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "The pamphlet that ignited the American Revolution, arguing for independence from British rule in clear, persuasive language.",
    descriptionRo: "Pamfletul care a aprins Revoluția Americană, pledând pentru independența față de domnia britanică într-un limbaj clar.",
    coverBg: "linear-gradient(135deg, #9a3412 0%, #431407 100%)",
    textColor: "#ffedd5",
  },
  {
    title: "The Rights of Man",
    author: "Thomas Paine",
    year: "1791",
    fileName: "thomas-paine_the-rights-of-man.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "A defense of the French Revolution and the inherent natural rights of citizens against monarchical governance.",
    descriptionRo: "O apărare a Revoluției Franceze și a drepturilor naturale inerente ale cetățenilor împotriva guvernării monarhice.",
    coverBg: "linear-gradient(135deg, #b45309 0%, #78350f 100%)",
    textColor: "#fef3c7",
  },
  {
    title: "The Federalist Papers",
    author: "A. Hamilton, J. Jay, J. Madison",
    year: "1788",
    fileName: "hamilton-jay-madison_federalist-papers.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "A collection of 85 essays arguing for the ratification of the United States Constitution, detailing the theory of federalism.",
    descriptionRo: "O colecție de 85 de eseuri care pledează pentru ratificarea Constituției SUA, detaliind teoria federalismului.",
    coverBg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    textColor: "#f8fafc",
  },
  {
    title: "Notes on the State of Virginia",
    author: "Thomas Jefferson",
    year: "1785",
    fileName: "notesonstateofvi01jeff.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "Jefferson's only full-length book, discussing the resources, laws, geography, and social conditions of Virginia.",
    descriptionRo: "Singura carte completă a lui Jefferson, care discută resursele, legile, geografia și condițiile sociale ale Virginiei.",
    coverBg: "linear-gradient(135deg, #1e3a8a 0%, #172554 100%)",
    textColor: "#eff6ff",
  },
  {
    title: "Washington's Farewell Address",
    author: "George Washington",
    year: "1796",
    fileName: "washington-s-farewell-address.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "The historic address warning the young nation against partisan entanglements, foreign alliances, and sectionalist divisions.",
    descriptionRo: "Discursul istoric de adio care avertizează tânăra națiune împotriva alianțelor externe și a diviziunilor partizane.",
    coverBg: "linear-gradient(135deg, #374151 0%, #111827 100%)",
    textColor: "#f3f4f6",
  },
  {
    title: "Democracy in America",
    author: "Alexis de Tocqueville",
    year: "1835",
    fileName: "Democracy_in_America-Alexis_de_Tocqueville.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "Tocqueville's classic study of American society, democracy, and equality, introducing the concept of American Exceptionalism.",
    descriptionRo: "Studiul clasic al lui Tocqueville despre societatea, democrația și egalitatea americană, introducând conceptul excepționalismului.",
    coverBg: "linear-gradient(135deg, #14532d 0%, #064e3b 100%)",
    textColor: "#d1fae5",
  },
  // Free Markets
  {
    title: "The Wealth of Nations",
    author: "Adam Smith",
    year: "1776",
    fileName: "The Wealth of Nations -- Adam Smith -- 1776 -- 6f4eed78eac2b5a3a4e4ab6aa9d8eb29 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "The foundational text of classical economics, describing the division of labor, productivity, and the invisible hand of free markets.",
    descriptionRo: "Textul fundamental al economiei clasice, descriind diviziunea muncii, productivitatea și „mâna invizibilă” a piețelor libere.",
    coverBg: "linear-gradient(135deg, #075985 0%, #0c4a6e 100%)",
    textColor: "#e0f2fe",
  },
  {
    title: "Capitalism and Freedom",
    author: "Milton Friedman",
    year: "1962",
    fileName: "Capitalism and Freedom -- Milton Friedman -- 1962 -- ed7c4875aae33dd47a250a7e6c06f169 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "A classic defense of free-market capitalism as both a tool for economic freedom and a necessary condition for political freedom.",
    descriptionRo: "O apărare clasică a capitalismului ca instrument de libertate economică și condiție necesară pentru libertatea politică.",
    coverBg: "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)",
    textColor: "#e0e7ff",
  },
  {
    title: "Free to Choose",
    author: "Milton & Rose Friedman",
    year: "1980",
    fileName: "Free To Choose - A Personal Statement -- Friedman, Milton, Friedman, Rose -- 1980 -- Harcourt Brace Jovanovich -- isbn13 9780156334600 -- 9df144d604c180f22dace8e0b8146fc6 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "A personal statement on the power of free choice, advocating for individual liberty and limited government intervention.",
    descriptionRo: "O declarație personală despre puterea liberului arbitru, pledând pentru libertatea individuală și intervenția limitată a statului.",
    coverBg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    textColor: "#eff6ff",
  },
  {
    title: "Basic Economics",
    author: "Thomas Sowell",
    year: "2000",
    fileName: "Basic Economics 4th Ed - a Common Sense Guide to the Economy -- Sowell, Thomas [Sowell, Thomas] -- 4th ed, New York, 2010 -- Basic Civitas Books -- isbn13 9780465022311 -- e789fa00fd006296117e2910ee2bab4b -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "A common-sense guide to the economy, explaining price coordination, resource allocation, and market mechanisms without jargon.",
    descriptionRo: "Un ghid practic în economie, explicând coordonarea prețurilor, alocarea resurselor și mecanismele pieței fără jargon.",
    coverBg: "linear-gradient(135deg, #b45309 0%, #451a03 100%)",
    textColor: "#fef3c7",
  },
  {
    title: "A Conflict of Visions",
    author: "Thomas Sowell",
    year: "1987",
    fileName: "A Conflict of Visions- Idealogical Origins of Political -- Sowell, Thomas -- Hachette Book Group, New York, 2007 -- Basic Civitas Books -- isbn13 9780465002054 -- ad5fe72f1d9921958eddadd7da99bdb7 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "A classic analysis of the ideological origins of political conflicts, detailing the constrained and unconstrained visions.",
    descriptionRo: "O analiză clasică a originilor ideologice ale conflictelor politice, detaliind viziunile constrânse și neconstrânse.",
    coverBg: "linear-gradient(135deg, #7c2d12 0%, #3f1a04 100%)",
    textColor: "#ffedd5",
  },
  // History Hub
  {
    title: "A Patriot's History of the US",
    author: "L. Schweikart, M. Allen",
    year: "2004",
    fileName: "A patriot's history of the United States - from Columbus's -- Larry Schweikart, Michael Patrick Allen -- 2010 -- Penguin Group US -- isbn13 9781101217788 -- 625e7a9f07199235af845fd3fbd53a6e -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "A conservative, patriotic re-evaluation of American history, celebrating the nation's founding ideals and economic rise.",
    descriptionRo: "O reevaluare istorică patriotică a istoriei americane, celebrând idealurile fondatoare ale națiunii și ascensiunea economică.",
    coverBg: "linear-gradient(135deg, #1e3a8a 0%, #7f1d1d 100%)",
    textColor: "#ffffff",
  },
  {
    title: "Intellectuals and Race",
    author: "Thomas Sowell",
    year: "2013",
    fileName: "Intellectuals and Race -- Thomas Sowell -- Hachette Book Group, New York, 2013 -- Basic Civitas Books -- isbn13 9780465058709 -- 5ba837a43ce99d2eeafb03fda358e019 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "Sowell's critique of intellectual preconceptions and theories regarding racial disparities, contrasting them with empirical realities.",
    descriptionRo: "Critica lui Sowell asupra ideilor preconcepute ale intelectualilor privind disparitățile rasiale, comparate cu realitățile empirice.",
    coverBg: "linear-gradient(135deg, #4b5563 0%, #1f2937 100%)",
    textColor: "#f3f4f6",
  },
  {
    title: "Not Stolen",
    author: "Jeff Fynn-Paul",
    year: "2023",
    fileName: "Not Stolen - The Truth About European Colonialism in the New -- Jeff Fynn-Paul; -- 1, 2023 -- Simon & Schuster -- isbn13 9781642939514 -- f051d41fe1c60d3be5d79b3471cc206c -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "A historical defense of the European settlement of North America, refuting common revisionist narratives about land theft.",
    descriptionRo: "O apărare istorică a colonizării europene a Americii de Nord, respingând narațiunile revizioniste comune.",
    coverBg: "linear-gradient(135deg, #047857 0%, #064e3b 100%)",
    textColor: "#ecfdf5",
  },
  {
    title: "Atlas Shrugged",
    author: "Ayn Rand",
    year: "1957",
    fileName: "Atlas Shrugged -- Ayn Rand [Невідомо] -- 1956 -- cd47303dfd8198d01fd00d26e9e631ac -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "Rand's magnum opus presenting her philosophy of Objectivism, depicting a strike of creative minds against collectivism.",
    descriptionRo: "Magnum opus al lui Rand, prezentând filosofia sa a obiectivismului și greva minților creatoare împotriva colectivismului.",
    coverBg: "linear-gradient(135deg, #1e1b4b 0%, #03001e 100%)",
    textColor: "#d8b4fe",
  },
  // ── Previously missing — added to ensure every file in /public/assets/books is represented ──
  {
    title: "The Gettysburg Address",
    author: "Abraham Lincoln",
    year: "1863",
    fileName: "pg4-images-3.epub",
    categories: ["oratory-poetry"],
    descriptionEn: "Lincoln's 272-word masterpiece dedicating the Soldiers' National Cemetery and redefining the Civil War as a struggle for human equality and national rebirth.",
    descriptionRo: "Capodopera de 272 de cuvinte a lui Lincoln, care a redefinit Războiul Civil ca o luptă pentru egalitate umană și renaștere națională.",
    coverBg: "linear-gradient(135deg, #1e2d40 0%, #0a1520 100%)",
    textColor: "#e2d9c8",
  },
  {
    title: "A Teacher's Guide to Land of Hope",
    author: "Wilfred M. McClay & John McBride",
    year: "2020",
    fileName: "A teacher's guide to Land of hope - an invitation to the -- Wilfred M_ McClay; John McBride -- First American edition, New York, 2020 -- Encounter -- isbn13 9781641771405 -- 1f1f3261c01964965f28e44c790774c0 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "A structured companion to McClay's celebrated American history narrative, providing discussion questions, primary sources, and classroom frameworks.",
    descriptionRo: "Un ghid structurat pentru narațiunea istorică americană a lui McClay, oferind întrebări de discuție și cadre pedagogice.",
    coverBg: "linear-gradient(135deg, #3b2e1a 0%, #1c160a 100%)",
    textColor: "#fef3c7",
  },
  {
    title: "Suicidal Empathy",
    author: "Gad Saad",
    year: "2026",
    fileName: "Suicidal Empathy- Dying to Be Kind -- Gad Saad -- 2026 -- Broadside Books -- isbn13 9780063446540 -- 40ee5a78780bda78d9a9720213540567 -- Anna’s Archive.epub",
    categories: ["pragmatism"],
    descriptionEn: "Saad's provocative cultural critique arguing that misplaced compassion and ideological conformity are eroding Western civilization's foundations.",
    descriptionRo: "Critica culturală provocatoare a lui Saad, argumentând că empatia greșit direcționată erodează fundamentele civilizației occidentale.",
    coverBg: "linear-gradient(135deg, #3f1515 0%, #200a0a 100%)",
    textColor: "#fecaca",
  },
];

interface BookShowcaseProps {
  category: BookItem["categories"][number];
  titleEn?: string;
  titleRo?: string;
}

export function BookShowcase({
  category,
  titleEn = "Primary Source Library & eBooks",
  titleRo = "Biblioteca de Surse Primare și eBooks",
}: BookShowcaseProps) {
  const { locale } = useLanguage();
  const isRo = locale === "ro";
  const books = BOOK_DATABASE.filter((b) => b.categories.includes(category));

  if (books.length === 0) return null;

  return (
    <>

    <section className="py-20 md:py-28 border-t border-white/10 mt-20">
      <h2 className="macro-section-title mb-4">{isRo ? titleRo : titleEn}</h2>
      <p className="macro-body max-w-3xl mb-14 text-white/50">
        {isRo
          ? "Descarcă ediții digitale clasice complete (în format EPUB) relevante pentru acest capitol."
          : "Download complete digital editions (EPUB format) of key classic works relevant to this chapter."}
      </p>

      {/* Elegant Shelf Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const desc = isRo ? book.descriptionRo : book.descriptionEn;
          const encodedFile = encodeURIComponent(book.fileName);
          const href = `/assets/books/${encodedFile}`;

          return (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.01] p-6 hover:border-glory-gold/30 hover:bg-white/[0.02] transition-colors duration-300 group"
            >
              {/* 3D Book Cover Container */}
              <div className="flex justify-center mb-6 py-4">
                <div
                  className="relative w-[130px] h-[190px] rounded-r-md shadow-2xl transition-transform duration-500 transform group-hover:rotate-y-[-16deg] group-hover:scale-105 group-hover:translate-x-2"
                  style={{
                    background: book.coverBg,
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                    boxShadow: "5px 5px 25px rgba(0,0,0,0.5), -2px 0 5px rgba(255,255,255,0.1) inset",
                  }}
                >
                  {/* Spine Highlight Shadow */}
                  <div className="absolute top-0 left-0 w-2.5 h-full bg-black/30 rounded-l-sm" />
                  <div className="absolute top-0 left-2.5 w-1 h-full bg-white/10" />

                  {/* Book Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 z-10 text-center">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-[0.15em] opacity-40" style={{ color: book.textColor }}>
                      eBook · {book.year}
                    </span>
                    <h3 className="lit-serif text-sm font-semibold leading-tight line-clamp-3 mt-4" style={{ color: book.textColor }}>
                      {book.title}
                    </h3>
                    <div className="w-6 h-[1.5px] bg-glory-gold/45 mx-auto my-1" />
                    <p className="text-[10px] font-sans italic opacity-75 line-clamp-1 mb-2" style={{ color: book.textColor }}>
                      {book.author}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info & Action */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-lg font-medium text-white transition-colors group-hover:text-glory-gold">
                    {book.title}
                  </h4>
                  <p className="font-sans text-xs text-white/40 mt-1">
                    {book.author} ({book.year})
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-white/55 mt-4">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 flex gap-2">
                  {/* Read in browser — opens dedicated /reader page in a new tab */}
                  <a
                    id={`read-book-${book.title.replace(/\s+/g, "-").toLowerCase()}`}
                    href={`/reader?book=${encodeURIComponent(book.fileName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-glory-gold/90 border border-glory-gold px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black hover:bg-glory-gold transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {isRo ? "Citește" : "Read"}
                  </a>

                  {/* Download ePub */}
                  <a
                    href={href}
                    download
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    aria-label={`Download ${book.title}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
    </>
  );
}
