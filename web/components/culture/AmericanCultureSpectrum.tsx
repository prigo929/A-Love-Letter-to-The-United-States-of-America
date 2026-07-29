"use client";

// ─── AmericanCultureSpectrum ─────────────────────────────────────────────────
// A visual argument for the overview page: the paradox that the *most* intensely
// American entertainment is the *least* exportable, while globally-minded pop
// culture gets quietly sanded of its Americanness. Case studies sit along an
// exportability spectrum — from frictionless global action/fantasy to the
// untranslatable deep cuts — with The Simpsons as the encyclopedia of Americana.
//
// Adapted from a video essay's argument (JJ, "What is American Culture?") — its
// thesis, examples and framing guided coverage; every line here is rewritten in
// the site's own voice, not transcribed. Styled for the culture hub's dark
// glass surface (light text on culture-bg).

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Work {
  key: string;
  // 0 = frictionless global export, 100 = untranslatably American
  american: number;
  name: string;
  nameRo: string;
  kind: string;
  kindRo: string;
  verdict: string;
  verdictRo: string;
  body: string;
  bodyRo: string;
  fact: string;
  factLabel: string;
  factLabelRo: string;
}

const WORKS: Work[] = [
  {
    key: "action",
    american: 14,
    name: "Global Action & Fantasy",
    nameRo: "Acțiune & fantasy global",
    kind: "The safe export",
    kindRo: "Exportul sigur",
    verdict: "Exports frictionlessly",
    verdictRo: "Se exportă fără fricțiune",
    body:
      "Superhero spectacle and high fantasy carry the least American cultural baggage, which is exactly why modern Hollywood leans on them: deliberately unmoored from the specifics of American life, they translate to any market on Earth with the least friction. As pop culture is increasingly designed with a global audience in mind, this has become the default — and a big reason recent American entertainment can feel a little culturally bland.",
    bodyRo:
      "Spectacolul cu supereroi și fantasy-ul poartă cel mai puțin bagaj cultural american, exact motivul pentru care Hollywood-ul modern se bazează pe ele: desprinse deliberat de specificul vieții americane, se traduc pe orice piață de pe Pământ cu cea mai mică fricțiune. Pe măsură ce cultura pop este tot mai mult gândită pentru un public global, acesta a devenit standardul — și un motiv important pentru care divertismentul american recent poate părea puțin fad cultural.",
    fact: "🌍",
    factLabel: "Built to cross every border",
    factLabelRo: "Făcut să treacă orice graniță",
  },
  {
    key: "ricknmorty",
    american: 46,
    name: "Rick and Morty · Adventure Time",
    nameRo: "Rick and Morty · Adventure Time",
    kind: "The compromise",
    kindRo: "Compromisul",
    verdict: "A fantasy shell, a local voice",
    verdictRo: "O carcasă fantasy, o voce locală",
    body:
      "American animation studios have gravitated toward fantasy-based cartoons in part because the sci-fi framing travels even when the sensibility stays home. The interdimensional premise plays anywhere; the voice underneath remains distinctly American. It is the negotiated settlement between exportability and identity — you keep the attitude, you swap the setting for something that needs no cultural footnotes.",
    bodyRo:
      "Studiourile de animație americane au gravitat spre desene bazate pe fantezie parțial pentru că rama science-fiction călătorește chiar și când sensibilitatea rămâne acasă. Premisa interdimensională merge oriunde; vocea de dedesubt rămâne distinct americană. Este înțelegerea negociată între exportabilitate și identitate — păstrezi atitudinea, schimbi cadrul cu ceva ce nu are nevoie de note de subsol culturale.",
    fact: "½",
    factLabel: "Half travels, half stays home",
    factLabelRo: "Jumătate călătorește, jumătate rămâne",
  },
  {
    key: "simpsons",
    american: 90,
    name: "The Simpsons",
    nameRo: "The Simpsons",
    kind: "The encyclopedia of Americana",
    kindRo: "Enciclopedia Americana",
    verdict: "Intensely, deliberately American",
    verdictRo: "Intens, deliberat american",
    body:
      "Springfield is the most deliberately American place on television. Across 600-plus episodes and three decades, there is essentially no corner of American society the show hasn't satirized — company softball and YMCA basketball, five-alarm chili cook-offs, tent preachers and a Scientology-esque cult, PTA meetings, the NRA, Eastern Bloc spies. It exists only to tell stories of American life through American characters, and it has become, in effect, the world's most comprehensive encyclopedia of Americana — foreigners the planet over know some American thing only because they once saw it on The Simpsons.",
    bodyRo:
      "Springfield este cel mai deliberat american loc de la televizor. De-a lungul a peste 600 de episoade și trei decenii, nu există practic niciun colț al societății americane pe care serialul să nu-l fi satirizat — softball de firmă și baschet la YMCA, concursuri de chili, predicatori de cort și un cult à la Scientologie, ședințe cu părinții, NRA, spioni din Blocul de Est. Există doar pentru a spune povești despre viața americană prin personaje americane și a devenit, de fapt, cea mai cuprinzătoare enciclopedie Americana din lume — străini de pe tot globul știu câte un lucru american doar pentru că l-au văzut cândva în The Simpsons.",
    fact: "600+",
    factLabel: "Episodes satirizing American life",
    factLabelRo: "Episoade care satirizează viața americană",
  },
  {
    key: "kingofthehill",
    american: 96,
    name: "King of the Hill · South Park",
    nameRo: "King of the Hill · South Park",
    kind: "The untranslatable",
    kindRo: "Intraductibilul",
    verdict: "So American the jokes resist translation",
    verdictRo: "Atât de american încât glumele rezistă traducerii",
    body:
      "The shows The Simpsons inspired went even harder on American themes and settings — many argue King of the Hill and South Park out-satirized their parent. That density is precisely what makes them famously hard to sell abroad: you need the American cultural knowledge to get the jokes. The proof is a punchline in itself — a French dub of King of the Hill once tried to relocate the whole show to Quebec, and it went about as well as you would expect.",
    bodyRo:
      "Serialele pe care The Simpsons le-a inspirat au mers și mai tare pe teme și cadre americane — mulți susțin că King of the Hill și South Park și-au depășit părintele în satiră. Tocmai această densitate le face notoriu de greu de vândut în străinătate: ai nevoie de cunoașterea culturii americane ca să prinzi glumele. Dovada e o poantă în sine — un dublaj francez al King of the Hill a încercat cândva să mute tot serialul în Quebec, și a mers cam cum te-ai aștepta.",
    fact: "🇫🇷✗",
    factLabel: "The failed French \"Quebec\" dub",
    factLabelRo: "Dublajul francez „Quebec”, eșuat",
  },
  {
    key: "deepcuts",
    american: 99,
    name: "The Deep Cuts",
    nameRo: "Piesele de nișă",
    kind: "Sam & Max · ClayFighter · Illuminati",
    kindRo: "Sam & Max · ClayFighter · Illuminati",
    verdict: "Niche by design, and proud of it",
    verdictRo: "De nișă prin design și mândru de asta",
    body:
      "At the far end sit the works that only make sense from inside the culture: a 1993 point-and-click road trip past tourist traps and identical chain restaurants; a claymation parody of the Mortal Kombat craze; a card game about secretly conquering America's subcultures. Each is a satisfying clump of American in-jokes. Britain has a cult following for some of these precisely because they flatter a romantic idea of America — a huge, colorful country of charmingly eccentric, hyper-individualistic people, each chasing their own weird little dream with stubborn earnestness.",
    bodyRo:
      "La capătul îndepărtat stau lucrările care au sens doar din interiorul culturii: un road-trip point-and-click din 1993 pe lângă capcane pentru turiști și restaurante de lanț identice; o parodie în claymation a nebuniei Mortal Kombat; un joc de cărți despre cucerirea în secret a subculturilor Americii. Fiecare este un ghemotoc satisfăcător de glume interne americane. Britanicii au un cult pentru unele dintre ele tocmai pentru că flatează o idee romantică despre America — o țară uriașă și colorată de oameni fermecător de excentrici, hiper-individualiști, fiecare urmărindu-și propriul vis mic și ciudat cu o seriozitate încăpățânată.",
    fact: "1993",
    factLabel: "Sam & Max Hit the Road",
    factLabelRo: "Sam & Max Hit the Road",
  },
];

export function AmericanCultureSpectrum() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(2); // start on The Simpsons
  const active = WORKS[sel];

  return (
    <div className="font-sans">
      {/* The spectrum bar */}
      <div className="mb-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.25em]">
        <span className="text-glory-gold">{ro ? "GLOBAL, FĂRĂ FRICȚIUNE" : "GLOBALLY FRICTIONLESS"}</span>
        <span className="text-[#E8391B]">{ro ? "INTENS AMERICAN" : "INTENSELY AMERICAN"}</span>
      </div>
      <div
        className="relative h-2.5 w-full rounded-full"
        style={{ background: "linear-gradient(to right, #E8B923, #E8391B)" }}
      >
        {WORKS.map((w, i) => {
          const on = i === sel;
          return (
            <button
              key={w.key}
              type="button"
              onClick={() => setSel(i)}
              aria-label={w.name}
              aria-current={on}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0b0a08] transition-all duration-300"
              style={{
                left: `${w.american}%`,
                width: on ? 22 : 14,
                height: on ? 22 : 14,
                backgroundColor: "#F5EDD8",
                boxShadow: on ? "0 0 0 5px rgba(245,237,216,0.18)" : "none",
                cursor: "pointer",
                zIndex: on ? 2 : 1,
              }}
            />
          );
        })}
      </div>

      {/* Selector row */}
      <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
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
      <div key={active.key} className="culture-glass mt-8 grid gap-8 rounded-2xl border border-white/5 p-7 md:grid-cols-[1.7fr_1fr] md:gap-12 md:p-9">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
            {ro ? active.verdictRo : active.verdict}
          </p>
          <h3 className="mb-5 font-editorial text-3xl font-black leading-none tracking-tight text-white md:text-4xl">
            {ro ? active.nameRo : active.name}
          </h3>
          <p className="text-base leading-relaxed text-[#F5EDD8]/70">
            {ro ? active.bodyRo : active.body}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Americanness meter */}
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F5EDD8]/50">
                {ro ? "SPECIFICITATE CULTURALĂ" : "CULTURAL SPECIFICITY"}
              </span>
              <span className="font-editorial text-lg font-black text-white">{active.american}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${active.american}%`, background: "linear-gradient(to right, #E8B923, #E8391B)" }}
              />
            </div>
          </div>

          {/* Fact */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <span className="font-editorial text-4xl font-black leading-none text-glory-gold">{active.fact}</span>
            <span className="text-sm text-[#F5EDD8]/60">{ro ? active.factLabelRo : active.factLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
