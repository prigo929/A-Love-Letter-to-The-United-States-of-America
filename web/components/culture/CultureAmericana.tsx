"use client";

// ─── CultureAmericana ────────────────────────────────────────────────────────
// "What is American Culture?": a reflective counterpoint to the page's soft-power
// thesis. The argument: the *most* intensely American culture is the *least*
// exportable, and what the world consumes is a sanded-down version. An exportability
// spectrum ranks case studies from frictionless global spectacle to untranslatable
// deep cuts; a Simpsons feature makes the encyclopedia-of-Americana point; a closing
// note ties it to the American habit of standardizing cultural "canons."
//
// Adapted from a video essay's argument (JJ, "What is American Culture?"): its
// thesis, examples and framing guided coverage; every line here is rewritten in
// the site's own voice, not transcribed. Dark surface, to sit in the hub's
// dark editorial rhythm.

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Work {
  key: string;
  name: string;
  nameRo: string;
  kind: string;
  kindRo: string;
  verdict: string;
  verdictRo: string;
  body: string;
  bodyRo: string;
}

const WORKS: Work[] = [
  {
    key: "spectacle",
    name: "Action & Fantasy Spectacle",
    nameRo: "Spectacol de acțiune & fantasy",
    kind: "The frictionless export",
    kindRo: "Exportul fără fricțiune",
    verdict: "Built to cross every border",
    verdictRo: "Făcut să treacă orice graniță",
    body:
      "Superhero and high-fantasy franchises carry the least American cultural baggage, which is exactly why modern Hollywood leans on them: deliberately unmoored from the specifics of American life, they play in any market on Earth. As pop culture is increasingly designed with a global audience in mind, this has become the default, and a big reason recent American entertainment can feel a little culturally bland.",
    bodyRo:
      "Francizele cu supereroi și fantasy poartă cel mai puțin bagaj cultural american, exact motivul pentru care Hollywood-ul modern se bazează pe ele: desprinse deliberat de specificul vieții americane, merg pe orice piață de pe Pământ. Pe măsură ce cultura pop este tot mai mult gândită pentru un public global, acesta a devenit standardul și un motiv important pentru care divertismentul american recent poate părea puțin fad cultural.",
  },
  {
    key: "ricknmorty",
    name: "Rick and Morty · Adventure Time",
    nameRo: "Rick and Morty · Adventure Time",
    kind: "The compromise",
    kindRo: "Compromisul",
    verdict: "A fantasy shell, a local voice",
    verdictRo: "O carcasă fantasy, o voce locală",
    body:
      "American animation has gravitated toward fantasy premises partly because the sci-fi framing travels even when the sensibility stays home. The interdimensional setup plays anywhere; the voice underneath remains distinctly American. It is the negotiated settlement between exportability and identity: keep the attitude, swap the setting for something that needs no cultural footnotes.",
    bodyRo:
      "Animația americană a gravitat spre premise fantastice parțial pentru că rama science-fiction călătorește chiar și când sensibilitatea rămâne acasă. Montajul interdimensional merge oriunde; vocea de dedesubt rămâne distinct americană. Este înțelegerea negociată între exportabilitate și identitate: păstrezi atitudinea, schimbi cadrul cu ceva ce nu are nevoie de note de subsol culturale.",
  },
  {
    key: "simpsons",
    name: "The Simpsons",
    nameRo: "The Simpsons",
    kind: "The encyclopedia of Americana",
    kindRo: "Enciclopedia Americana",
    verdict: "Intensely, deliberately American",
    verdictRo: "Intens, deliberat american",
    body:
      "Springfield is the most deliberately American place on television. It exists only to tell stories of American life through American characters: and across three decades it has satirized nearly every corner of the country, from company softball to tent preachers to Eastern Bloc spies. It has become, in effect, the world's encyclopedia of Americana: foreigners the planet over know some American thing only because they once saw it on The Simpsons.",
    bodyRo:
      "Springfield este cel mai deliberat american loc de la televizor. Există doar pentru a spune povești despre viața americană prin personaje americane: iar de-a lungul a trei decenii a satirizat aproape fiecare colț al țării, de la softball de firmă la predicatori de cort și spioni din Blocul de Est. A devenit, de fapt, enciclopedia Americana a lumii: străini de pe tot globul știu câte un lucru american doar pentru că l-au văzut cândva în The Simpsons.",
  },
  {
    key: "kingofthehill",
    name: "King of the Hill · South Park",
    nameRo: "King of the Hill · South Park",
    kind: "The untranslatable",
    kindRo: "Intraductibilul",
    verdict: "So American the jokes resist translation",
    verdictRo: "Atât de american încât glumele rezistă traducerii",
    body:
      "The shows The Simpsons inspired went even harder on American themes: many argue they out-satirized their parent. That density is exactly what makes them famously hard to sell abroad: you need the American cultural knowledge to get the jokes. The proof is a punchline in itself: a French dub of King of the Hill once tried to relocate the whole show to Quebec, and it went about as well as you would expect.",
    bodyRo:
      "Serialele pe care The Simpsons le-a inspirat au mers și mai tare pe teme americane: mulți susțin că și-au depășit părintele în satiră. Tocmai această densitate le face notoriu de greu de vândut în străinătate: ai nevoie de cunoașterea culturii americane ca să prinzi glumele. Dovada e o poantă în sine: un dublaj francez al King of the Hill a încercat cândva să mute tot serialul în Quebec, și a mers cam cum te-ai aștepta.",
  },
  {
    key: "deepcuts",
    name: "The Deep Cuts",
    nameRo: "Piesele de nișă",
    kind: "Only an American gets it",
    kindRo: "Doar un american înțelege",
    verdict: "Niche by design, and proud of it",
    verdictRo: "De nișă prin design și mândru de asta",
    body:
      "At the far end sit works that only make sense from inside the culture: a 1993 point-and-click road trip past tourist traps and identical chain restaurants; a claymation parody of the Mortal Kombat craze; a card game about secretly conquering America's subcultures. Each is a satisfying clump of American in-jokes: and they flatter a romantic idea of the country as a huge, colorful place full of eccentric, hyper-individualistic people, each chasing their own weird little dream with stubborn earnestness.",
    bodyRo:
      "La capătul îndepărtat stau lucrări care au sens doar din interiorul culturii: un road-trip point-and-click din 1993 pe lângă capcane pentru turiști și restaurante de lanț identice; o parodie în claymation a nebuniei Mortal Kombat; un joc de cărți despre cucerirea în secret a subculturilor Americii. Fiecare este un ghemotoc satisfăcător de glume interne americane: și flatează o idee romantică despre țară ca un loc uriaș și colorat, plin de oameni excentrici, hiper-individualiști, fiecare urmărindu-și propriul vis mic și ciudat cu o seriozitate încăpățânată.",
  },
];

export function CultureAmericana({ isRo }: { isRo: boolean }) {
  const { locale } = useLanguage();
  const ro = isRo || locale === "ro";
  const [sel, setSel] = useState(2); // start on The Simpsons
  const active = WORKS[sel];

  return (
    <section id="what-is-american-culture" className="culture-bg py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <span className="culture-text-label block mb-4 text-glory-gold">
            {ro ? "CE ÎL FACE AMERICAN" : "WHAT MAKES IT AMERICAN"}
          </span>
          <h2 className="culture-text-hero text-[#F5EDD8] mb-8">
            {ro ? "PARADOXUL FAMILIARULUI" : "THE PARADOX OF THE FAMILIAR"}
          </h2>
          <blockquote className="border-l-2 border-[#E8391B] pl-6 font-editorial text-2xl md:text-3xl italic leading-relaxed text-[#F5EDD8]/90">
            {ro
              ? "Cea mai intens americană cultură este cea mai greu de exportat: iar ceea ce consumă lumea este versiunea curățată de americanism."
              : "The most intensely American culture is the hardest to export: and what the world consumes is the version sanded of its Americanness."}
          </blockquote>
          <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-[#F5EDD8]/70">
            <p>
              {ro
                ? "Trăind în interiorul unei culturi, e ușor să presupui că a oricărei alte țări e mai bogată și mai autentică decât a ta. Fă un pas înapoi, și cultura pop americană se dovedește la fel de plină de referințe și glume interne. Ceea ce primește lumea e, însă, atenuat pentru export: iar comedia, cel mai particular gen cultural, e locul unde trăiește adevărata Americana."
                : "Living inside a culture, it's easy to assume every other country's is richer and more authentic than your own. Step back, and American pop culture is just as crammed with references and in-jokes. But what the world receives is toned down for export: and comedy, the most culturally particular genre there is, is where the real Americana lives."}
            </p>
          </div>
        </div>

        {/* Qualitative frame: frictionless → intensely American */}
        <div className="mb-4 flex items-center gap-4">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-glory-gold">
            {ro ? "GLOBAL, FĂRĂ FRICȚIUNE" : "GLOBALLY FRICTIONLESS"}
          </span>
          <span className="h-px flex-1 rounded-full" style={{ background: "linear-gradient(to right, #E8B923, #E8391B)" }} />
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8391B]">
            {ro ? "INTENS AMERICAN" : "INTENSELY AMERICAN"}
          </span>
        </div>

        {/* Selector row, ordered least → most American */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {WORKS.map((w, i) => {
            const on = i === sel;
            return (
              <button
                key={w.key}
                type="button"
                onClick={() => setSel(i)}
                aria-current={on}
                className="rounded-xl border px-3 py-3 text-left transition-all duration-300"
                style={{
                  cursor: "pointer",
                  borderColor: on ? "rgba(232,57,27,0.6)" : "rgba(255,255,255,0.1)",
                  backgroundColor: on ? "rgba(232,57,27,0.1)" : "rgba(255,255,255,0.02)",
                }}
              >
                <span className="block text-sm font-semibold leading-tight text-white">{ro ? w.nameRo : w.name}</span>
                <span className="mt-1 block text-[11px] leading-tight text-glory-gold">{ro ? w.kindRo : w.kind}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div key={active.key} className="culture-glass mt-8 rounded-2xl border border-white/5 p-7 md:p-9">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
            {ro ? active.verdictRo : active.verdict}
          </p>
          <h3 className="mb-5 font-editorial text-3xl font-black leading-none tracking-tight text-white md:text-4xl">
            {ro ? active.nameRo : active.name}
          </h3>
          <p className="max-w-3xl text-base leading-relaxed text-[#F5EDD8]/70">{ro ? active.bodyRo : active.body}</p>
        </div>

        {/* Simpsons feature + canon closing */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="culture-glass rounded-2xl border border-white/5 p-7">
            <div className="font-editorial text-5xl font-black leading-none text-glory-gold">600+</div>
            <div className="mt-2 text-sm text-[#F5EDD8]/60">
              {ro ? "Episoade Simpsons care satirizează viața americană" : "Simpsons episodes satirizing American life"}
            </div>
          </div>
          <div className="culture-glass rounded-2xl border border-white/5 p-7">
            <div className="font-editorial text-5xl font-black leading-none text-glory-gold">30+</div>
            <div className="mt-2 text-sm text-[#F5EDD8]/60">
              {ro ? "Ani în care nimic american nu a scăpat de satiră" : "Years in which nothing American escaped satire"}
            </div>
          </div>
          <Link
            href="/culture/food-and-drinks"
            className="culture-glass group rounded-2xl border border-white/5 p-7 transition-colors hover:border-white/20"
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
              {ro ? "IDEEA DE „CANON”" : "THE “CANON” INSTINCT"}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#F5EDD8]/60">
              {ro
                ? "America standardizează obsesiv seturi culturale: canonul monștrilor, canonul aromelor de bomboane, canonul aromelor de chips. "
                : "America compulsively standardizes cultural sets: the monster canon, the candy-flavor canon, the chip-flavor canon. "}
              <span className="text-glory-gold underline decoration-glory-gold/40 underline-offset-4 group-hover:decoration-glory-gold">
                {ro ? "Vezi canonul aromelor →" : "See the flavor canon →"}
              </span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
