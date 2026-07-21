// ─── The American Novel ──────────────────────────────────────────────────────
// Second built page of the literature section. Its interaction is deliberately
// unlike the oratory page's: that one takes a single passage apart from the
// inside, this one racks whole books against each other so a century of drift in
// what an American novel sounds like is visible in one screen.
//
// On quoting: every line here is a single opening sentence, attributed, with
// commentary around it. That is fair use by any reading of the four factors, and
// it is also just how criticism works. Four of the six are outright public
// domain — Gatsby aged in during 2021, The Sun Also Rises in 2022 — and the page
// says which, because telling a reader they can go and read the whole book for
// free is the most useful thing it can do.

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MacroStyles, MacroHero } from "@/components/economy/EconomyAnimations";
import {
  LitStyles,
  ScrollIlluminatedText,
  OpeningLinesWall,
  ManuscriptParallax,
  PullQuote,
  type Opening,
} from "@/components/literature/LiteratureAnimations";
import { LITERATURE_ASSETS } from "@/lib/data/literature-assets";
import { getServerLocale } from "@/lib/i18n/server";
import { BookShowcase } from "@/components/literature/BookShowcase";

export const metadata: Metadata = {
  title: "The American Novel | Literature & Philosophy",
  description:
    "Call me Ishmael. A century of American first sentences, from Melville to Ellison, and what each one announced about the book behind it.",
  alternates: { canonical: "/literature-philosophy/american-novel" },
};

const OPENINGS: Opening[] = [
  {
    work: "Moby-Dick",
    author: "Herman Melville",
    year: 1851,
    line: "Call me Ishmael.",
    portrait: "mobyDickTitlePage",
    publicDomain: true,
    note:
      "Three words, and two of them are doing work. Not 'my name is' but 'call me' — an alias, offered by a narrator who never quite explains himself. And Ishmael is the son cast into the wilderness in Genesis, so before the voyage begins the reader has been handed an outcast and a biblical frame. No other American novel opens with less and implies more.",
    noteRo:
      "Trei cuvinte, dintre care două fac toată munca. Nu „mă numesc”, ci „spuneți-mi” — un alias, oferit de un narator care nu se explică niciodată pe deplin. Iar Ismael este fiul alungat în pustiu din Geneză, așa că înainte ca voiajul să înceapă cititorul a primit deja un proscris și un cadru biblic. Niciun alt roman american nu începe cu atât de puțin și nu sugerează atât de mult.",
  },
  {
    work: "Adventures of Huckleberry Finn",
    author: "Mark Twain",
    year: 1884,
    line: "You don't know about me without you have read a book by the name of The Adventures of Tom Sawyer; but that ain't no matter.",
    portrait: "twainPortrait",
    publicDomain: true,
    note:
      "The first major American novel narrated in a boy's actual spoken grammar. 'Without you have read', 'that ain't no matter' — Twain is refusing literary English on the first line, and the whole argument of the book follows from that refusal. Hemingway claimed all modern American literature came from this one book, and he meant this sentence.",
    noteRo:
      "Primul roman american major narat în gramatica vorbită a unui băiat. „Without you have read”, „that ain't no matter” — Twain refuză engleza literară chiar din prima frază, iar întregul argument al cărții decurge din acest refuz. Hemingway susținea că toată literatura americană modernă provine din această carte, și se referea la această frază.",
  },
  {
    work: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    line: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
    portrait: "gatsbyCover",
    publicDomain: true,
    note:
      "A narrator establishing his own reliability before he has told you anything — which is exactly what an unreliable narrator does. Note 'ever since': Nick is speaking from after the events, already changed by them. The novel's ending is embedded in its first sentence.",
    noteRo:
      "Un narator care își stabilește propria credibilitate înainte de a-ți fi spus ceva — exact ce face un narator nesigur. Observă „ever since”: Nick vorbește de după evenimente, deja schimbat de ele. Finalul romanului este încastrat în prima lui frază.",
  },
  {
    work: "The Sun Also Rises",
    author: "Ernest Hemingway",
    year: 1926,
    line: "Robert Cohn was once middleweight boxing champion of Princeton.",
    portrait: "hemingwayPortrait",
    publicDomain: true,
    note:
      "Flat, declarative, and about somebody who is not the narrator. Hemingway opens by withholding: no weather, no scene, no feeling, just a fact about a secondary character. The famous iceberg method is already running — everything that matters is under the line.",
    noteRo:
      "Plată, declarativă și despre altcineva decât naratorul. Hemingway începe prin a refuza: fără vreme, fără decor, fără emoție, doar un fapt despre un personaj secundar. Faimoasa metodă a aisbergului funcționează deja — tot ce contează stă sub linie.",
  },
  {
    work: "Their Eyes Were Watching God",
    author: "Zora Neale Hurston",
    year: 1937,
    line: "Ships at a distance have every man's wish on board.",
    portrait: "hurstonPortrait",
    publicDomain: false,
    note:
      "A proverb, not a plot. Hurston opens in the register of spoken folk wisdom rather than literary narration, and the next paragraph immediately splits that wish by gender — what men do with hope, and what women do. The book's subject is announced before a character appears.",
    noteRo:
      "Un proverb, nu o intrigă. Hurston începe în registrul înțelepciunii populare vorbite, nu al narațiunii literare, iar paragraful următor desparte imediat această dorință pe genuri — ce fac bărbații cu speranța și ce fac femeile. Subiectul cărții este anunțat înainte să apară vreun personaj.",
  },
  {
    work: "Invisible Man",
    author: "Ralph Ellison",
    year: 1952,
    line: "I am an invisible man.",
    publicDomain: false,
    note:
      "Melville's opening, a century on and inverted. Ishmael asks to be named; Ellison's narrator announces he cannot be seen at all. Four words, present tense, no metaphor signalled — the next paragraph has to explain that he means it socially rather than literally, and that delay is the effect.",
    noteRo:
      "Începutul lui Melville, un secol mai târziu și inversat. Ismael cere să fie numit; naratorul lui Ellison anunță că nu poate fi văzut deloc. Patru cuvinte, timp prezent, nicio metaforă semnalată — paragraful următor trebuie să explice că se referă social, nu literal, iar această întârziere este chiar efectul.",
  },
];

export default async function AmericanNovelPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        home: "Acasă",
        section: "Literatură & Filosofie",
        pageLabel: "Romanul american",
        eyebrow: "PRIMA FRAZĂ · ROMANUL",
        titleLead: "SPUNEȚI-MI",
        titleAccent: "ISMAEL",
        heroDesc:
          "Un roman american își anunță intențiile în prima frază. Șase deschideri, întinse pe un secol, și ce promite fiecare despre cartea din spatele ei.",
        openingTitle: "Deschiderea ca declarație",
        openingBody:
          "Romancierii americani au tratat prima frază altfel decât contemporanii lor europeni. Nu ca o rampă către poveste, ci ca o declarație de metodă: iată ce fel de engleză va folosi această carte, iată cine vorbește și iată ce nu vă voi spune. Melville deschide cu un alias. Twain deschide refuzând gramatica literară. Ellison deschide cu o imposibilitate. Fiecare dintre aceste fraze este un contract.",
        wallTitle: "Șase deschideri",
        wallBody:
          "Alege un titlu din dreapta. Fraza rămâne în engleză în ambele limbi — o primă frază tradusă este o altă frază, iar ritmul ei este exact subiectul discuției. Comentariul este tradus.",
        pdLabel: "Domeniu public — poți citi cartea integral",
        copyrightLabel: "Încă sub drept de autor",
        driftTitle: "Ce s-a schimbat într-un secol",
        driftBody:
          "Pune-le în ordine și deriva devine vizibilă. În 1851, o frază de trei cuvinte cu greutate biblică. În 1884, gramatica vorbită a unui copil, ridicată la rang literar. În 1925, un narator care își pledează propria onestitate. În 1937, un proverb în locul unei intrigi. În 1952, o imposibilitate rostită la timpul prezent. Engleza se apropie tot mai mult de vorbire, iar naratorul devine tot mai puțin de încredere.",
        sourceNote:
          "Imagini: domeniu public sau fără restricții, via Wikimedia Commons. Citatele sunt fraze de deschidere unice, folosite cu atribuire și comentariu.",
        backLink: "Toate temele de literatură și filosofie",
      }
    : {
        home: "Home",
        section: "Literature & Philosophy",
        pageLabel: "The American Novel",
        eyebrow: "THE FIRST SENTENCE · THE NOVEL",
        titleLead: "CALL ME",
        titleAccent: "ISHMAEL",
        heroDesc:
          "An American novel announces its intentions in its first sentence. Six openings across a century, and what each one promises about the book behind it.",
        openingTitle: "The opening as a declaration",
        openingBody:
          "American novelists have treated the first sentence differently from their European contemporaries. Not as a ramp into the story but as a statement of method: here is the kind of English this book will use, here is who is speaking, and here is what I am not going to tell you. Melville opens on an alias. Twain opens by refusing literary grammar. Ellison opens on an impossibility. Each of these sentences is a contract.",
        wallTitle: "Six openings",
        wallBody:
          "Pick a title on the right. The sentence stays in English in both languages — a translated first line is a different sentence, and its rhythm is precisely what is under discussion. The commentary is translated.",
        pdLabel: "Public domain — you can read the whole book",
        copyrightLabel: "Still in copyright",
        driftTitle: "What changed in a century",
        driftBody:
          "Put them in order and the drift becomes visible. In 1851, a three-word sentence carrying biblical weight. In 1884, a child's spoken grammar raised to literature. In 1925, a narrator arguing for his own honesty. In 1937, a proverb standing in for a plot. In 1952, an impossibility stated in the present tense. The English keeps moving closer to speech, and the narrator keeps becoming less reliable.",
        sourceNote:
          "Imagery: public domain or no-restrictions, via Wikimedia Commons. Quotations are single opening sentences, used with attribution and commentary.",
        backLink: "All literature and philosophy topics",
      };

  const hero = LITERATURE_ASSETS.mobyDickTitlePage;

  return (
    <main className="min-h-screen bg-black text-white">
      <MacroStyles />
      <LitStyles />

      <MacroHero
        imageSrc={hero.src}
        imageAlt={isRo ? hero.altRo : hero.alt}
        eyebrow={copy.eyebrow}
        titleLead={copy.titleLead}
        titleAccent={copy.titleAccent}
        description={copy.heroDesc}
        stats={[
          { value: "6", label: isRo ? "Deschideri" : "Openings" },
          { value: "101", label: isRo ? "Ani acoperiți" : "Years covered" },
          { value: "4", label: isRo ? "În domeniul public" : "Public domain" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: copy.home, href: "/" },
            { label: copy.section, href: "/literature-philosophy" },
            { label: copy.pageLabel },
          ]}
          className="py-8"
        />

        <section className="py-24 md:py-32">
          <h2 className="macro-section-title mb-12">{copy.openingTitle}</h2>
          <ScrollIlluminatedText className="lit-serif lit-measure text-2xl leading-[1.7] md:text-[34px] md:leading-[1.55]">
            {copy.openingBody}
          </ScrollIlluminatedText>
        </section>
      </div>

      <ManuscriptParallax asset="leavesOfGrass1855" drift={80} className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="macro-section-title mb-6">{copy.wallTitle}</h2>
          <p className="macro-body mb-16 max-w-3xl">{copy.wallBody}</p>
          <OpeningLinesWall
            openings={OPENINGS}
            pdLabel={copy.pdLabel}
            pdLabelRo={copy.pdLabel}
            copyrightLabel={copy.copyrightLabel}
            copyrightLabelRo={copy.copyrightLabel}
          />
        </div>
      </ManuscriptParallax>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PullQuote
          quote="All modern American literature comes from one book by Mark Twain called Huckleberry Finn."
          attribution="Ernest Hemingway"
          meta={isRo ? "Green Hills of Africa, 1935" : "Green Hills of Africa, 1935"}
        />

        <section className="py-20 md:py-28">
          <h2 className="macro-section-title mb-12">{copy.driftTitle}</h2>
          <ScrollIlluminatedText className="lit-serif lit-measure text-xl leading-[1.75] md:text-[28px] md:leading-[1.6]">
            {copy.driftBody}
          </ScrollIlluminatedText>
        </section>

        <BookShowcase category="american-novel" />

        <div className="border-t border-white/10 py-12">
          <p className="max-w-3xl font-body text-xs leading-relaxed text-white/30">
            {copy.sourceNote}
          </p>
          <Link
            href="/literature-philosophy"
            className="mt-6 inline-block font-body text-sm text-glory-gold transition-opacity hover:opacity-70"
          >
            ← {copy.backLink}
          </Link>
        </div>
      </div>
    </main>
  );
}
