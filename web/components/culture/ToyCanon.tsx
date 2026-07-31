"use client";

// ─── ToyCanon ────────────────────────────────────────────────────────────────
// Eight of the most iconic American toys of the modern age, and the quiet story
// underneath them: nearly all became the property of one Rhode Island company,
// Hasbro, whose genius was less inventing toys than buying up other people's toys
// and toy companies. A grid selects; the dossier opens each toy's origin and how
// Hasbro came to own it.
//
// Adapted from a video essay's research (JJ, "The history of America's most
// famous toys," drawing on Tim Walsh's Timeless Toys): its eight-toy canon and
// facts guided coverage; every line here is rewritten in the site's own voice,
// not transcribed. Cream/parchment editorial surface (dark text on cream).

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

const C = SITE_IMAGES.culture;

interface Toy {
  key: string;
  name: string;
  nameRo: string;
  year: string;
  image: string;
  inHouse: boolean;
  path: string;
  pathRo: string;
  story: string;
  storyRo: string;
  facts: { stat: string; label: string; labelRo: string }[];
}

const TOYS: Toy[] = [
  {
    key: "monopoly",
    name: "Monopoly",
    nameRo: "Monopoly",
    year: "1935",
    image: C.toyMonopoly,
    inHouse: false,
    path: "Via Parker Brothers, 1991",
    pathRo: "Prin Parker Brothers, 1991",
    story:
      "America's most popular board game has an origin blurred by folk culture. In the early 1900s an Illinois woman named Lizzie Magie built a real-estate game to dramatize the ideas of the economist Henry George, who despised landlords who grew rich charging rent for property and little else. Her Landlord's Game was a Georgist critique, but Georgism was esoteric, and as people copied and passed the game around, her pointed political rules got watered down into something simpler and more fun. In 1933 Charles Darrow of Pennsylvania made his own version, called it Monopoly, and gave it everything we recognize: the logo, the board, the odd tokens, and Mr. Monopoly himself. He sold it to Parker Brothers in 1935, who were bought by Hasbro in 1991. Magie was eventually compensated, but late in life she grew bitter that her message had been lost.",
    storyRo:
      "Cel mai popular joc de societate al Americii are o origine încețoșată de cultura populară. La începutul anilor 1900, o femeie din Illinois pe nume Lizzie Magie a construit un joc imobiliar pentru a dramatiza ideile economistului Henry George, care disprețuia proprietarii îmbogățiți din chirii. Landlord's Game al ei era o critică georgistă, dar georgismul era ezoteric, iar pe măsură ce oamenii copiau și pasau jocul, regulile ei politice s-au diluat în ceva mai simplu și mai distractiv. În 1933 Charles Darrow din Pennsylvania a făcut propria versiune, a numit-o Monopoly și i-a dat tot ce recunoaștem: logo-ul, tabla, piesele ciudate și pe însuși Domnul Monopoly. A vândut-o lui Parker Brothers în 1935, care au fost cumpărați de Hasbro în 1991. Magie a fost în cele din urmă despăgubită, dar spre sfârșitul vieții a devenit amară că mesajul ei se pierduse.",
    facts: [
      { stat: "1903", label: "Magie's Landlord's Game", labelRo: "Landlord's Game al lui Magie" },
      { stat: "1933", label: "Darrow's Monopoly", labelRo: "Monopoly al lui Darrow" },
    ],
  },
  {
    key: "potatohead",
    name: "Mr. Potato Head",
    nameRo: "Mr. Potato Head",
    year: "1952",
    image: C.toyPotatoHead,
    inHouse: true,
    path: "Bought from George Lerner, 1951",
    pathRo: "Cumpărat de la George Lerner, 1951",
    story:
      "A New Yorker named George Lerner thought kids might enjoy giving a potato a funny face, invented the kit in 1949, and sold it to Hasbro in 1951. The twist is that the first version used a real potato as the head, which is culturally telling twice over: it shows how ubiquitous the potato had become in America, and how rich the country had grown right after the war, because only an extremely wealthy society could propose using food as a toy without it seeming irresponsible. No toy company before the 1950s would have touched an idea this decadent. From the 1960s on, a plastic potato was included instead, for the sake of practicality. Mr. Potato Head is also often called the first toy ever advertised on television, a revolutionary and controversial practice that reshaped American toy culture.",
    storyRo:
      "Un new-yorkez pe nume George Lerner s-a gândit că le-ar plăcea copiilor să dea unui cartof o față caraghioasă, a inventat kitul în 1949 și l-a vândut lui Hasbro în 1951. Surpriza e că prima versiune folosea un cartof adevărat drept cap, ceea ce e revelator de două ori: arată cât de omniprezent devenise cartoful în America și cât de bogată devenise țara imediat după război, fiindcă doar o societate extrem de bogată putea propune folosirea mâncării ca jucărie fără să pară iresponsabil. Nicio companie de jucării dinainte de anii 1950 nu s-ar fi atins de o idee atât de decadentă. Din anii 1960 s-a inclus în schimb un cartof de plastic. Mr. Potato Head este adesea numit și prima jucărie promovată vreodată la televizor.",
    facts: [
      { stat: "1949", label: "Lerner invents the kit", labelRo: "Lerner inventează kitul" },
      { stat: "First", label: "Toy advertised on TV", labelRo: "Jucărie promovată la TV" },
    ],
  },
  {
    key: "playdoh",
    name: "Play-Doh",
    nameRo: "Play-Doh",
    year: "1955",
    image: C.toyPlayDoh,
    inHouse: false,
    path: "Via Kenner, 1991",
    pathRo: "Prin Kenner, 1991",
    story:
      "Play-Doh is a genuine happy accident. In the old days, when wallpaper was made of actual paper and could not be washed, people cleaned their walls with a putty of dough and soap, a giant kneaded eraser. By the mid-1950s, easily wiped vinyl wallpaper, part of the postwar plastics takeover of American life, was killing the wallpaper-cleaning-dough business. One enterprising maker of the stuff, Joe McVicker of Cincinnati, had an idea to save his company: sell the dough as a modeling clay for kids. Play-Doh was born in 1955. He sold it to the Kenner toy corporation of Ohio, which sold it under their own name for years before Kenner was, inevitably, bought by Hasbro in 1991.",
    storyRo:
      "Play-Doh este un accident fericit autentic. Pe vremuri, când tapetul era făcut din hârtie adevărată și nu putea fi spălat, oamenii își curățau pereții cu un chit din aluat și săpun, o gumă de șters uriașă. Până la mijlocul anilor 1950, tapetul de vinil ușor de șters, parte a preluării postbelice a plasticului în viața americană, omora afacerea cu aluat de curățat tapet. Un producător întreprinzător al acestuia, Joe McVicker din Cincinnati, a avut o idee de a-și salva compania: să vândă aluatul ca plastilină pentru copii. Play-Doh s-a născut în 1955. L-a vândut companiei Kenner din Ohio, care l-a vândut sub numele propriu ani de zile înainte ca Kenner să fie, inevitabil, cumpărată de Hasbro în 1991.",
    facts: [
      { stat: "1955", label: "Wallpaper cleaner reborn", labelRo: "Curățător de tapet reînviat" },
      { stat: "Kenner", label: "Sold it before Hasbro", labelRo: "L-a vândut înainte de Hasbro" },
    ],
  },
  {
    key: "gijoe",
    name: "G.I. Joe",
    nameRo: "G.I. Joe",
    year: "1964",
    image: C.toyGiJoe,
    inHouse: true,
    path: "Developed in-house",
    pathRo: "Dezvoltat intern",
    story:
      "G.I. Joe is the most successful toy Hasbro ever developed itself, and a barometer of America's mood on the military. In the early 1960s Hasbro tried to sell dolls to boys, and to beat the girly stigma they gave the doll the most macho job imaginable, army guy; many Hasbro executives were WWII or Korea veterans. The 1964 release sold well, but that same year the Gulf of Tonkin incident escalated Vietnam, the war turned deeply unpopular, and mothers stopped buying toys that glorified it. Sales collapsed, Hasbro softened him into \"Super Joe,\" and retired him in the 1970s. Then the Reagan-era 1980s made the military cool again, and Joe returned as a \"Real American Hero\" fighting Cobra, now action figures backed by comics, a cartoon, and games, a whole universe. It was the new logic of toys: the toy alone was no longer enough. Joe was also among the first major American toys made overseas, in a war-devastated Japan glad for any work.",
    storyRo:
      "G.I. Joe este cea mai de succes jucărie pe care Hasbro a dezvoltat-o vreodată singură și un barometru al dispoziției Americii față de armată. La începutul anilor 1960 Hasbro a încercat să vândă păpuși băieților, iar pentru a învinge stigmatul de „fetiță” i-au dat păpușii cea mai macho meserie imaginabilă, militar; mulți directori Hasbro erau veterani. Lansarea din 1964 s-a vândut bine, dar în același an incidentul din Golful Tonkin a escaladat Vietnamul, războiul a devenit profund nepopular, iar mamele au încetat să cumpere jucării care îl glorificau. Vânzările s-au prăbușit, Hasbro l-a înmuiat în „Super Joe” și l-a retras în anii 1970. Apoi anii 1980 ai erei Reagan au făcut armata cool din nou, iar Joe a revenit ca „Real American Hero” luptând cu Cobra, acum figurine susținute de benzi desenate, un desen animat și jocuri, un întreg univers. Joe a fost și printre primele jucării americane majore fabricate peste hotare, într-un Japonia devastată de război.",
    facts: [
      { stat: "1964", label: "The doll for boys", labelRo: "Păpușa pentru băieți" },
      { stat: "1980s", label: "Reborn as an action figure", labelRo: "Renăscut ca figurină" },
    ],
  },
  {
    key: "operation",
    name: "Operation",
    nameRo: "Operation",
    year: "1965",
    image: C.toyOperation,
    inHouse: false,
    path: "Via Milton Bradley, 1984",
    pathRo: "Prin Milton Bradley, 1984",
    story:
      "Operation, the game of fishing plastic body parts out of a hapless patient with tweezers without setting off the buzzer, was made in 1965 by one of America's oldest toy companies, Milton Bradley, founded by a Massachusetts man of that name back in 1860. From the start Milton Bradley produced a run of games that became American icons: the Game of Life, Candy Land, Battleship, Twister. So naturally Hasbro had to have them, and bought the whole company in 1984, acquiring every one of those hot properties in a single stroke.",
    storyRo:
      "Operation, jocul de a pescui cu penseta părți din corp de plastic dintr-un pacient neajutorat fără a declanșa soneria, a fost făcut în 1965 de una dintre cele mai vechi companii de jucării din America, Milton Bradley, fondată de un bărbat din Massachusetts cu acest nume încă din 1860. De la început Milton Bradley a produs o serie de jocuri care au devenit icoane americane: Game of Life, Candy Land, Battleship, Twister. Așa că firește Hasbro a trebuit să le aibă și a cumpărat toată compania în 1984, achiziționând fiecare dintre aceste proprietăți dintr-o singură lovitură.",
    facts: [
      { stat: "1860", label: "Milton Bradley founded", labelRo: "Milton Bradley, fondată" },
      { stat: "1984", label: "Hasbro buys the company", labelRo: "Hasbro cumpără compania" },
    ],
  },
  {
    key: "stretch",
    name: "Stretch Armstrong",
    nameRo: "Stretch Armstrong",
    year: "1976",
    image: C.toyStretch,
    inHouse: false,
    path: "Via Cap Toys, 1997",
    pathRo: "Prin Cap Toys, 1997",
    story:
      "The stretchable action figure was invented in 1976 by a Kenner employee named Jesse Horowitz, who simply thought it would be a fun toy. Armstrong's chiseled, lantern-jawed look is often said to draw on the action stars of the day, Lee Majors and Charlton Heston, and on what had by then become the standard all-American superhero face. A smaller Ohio company called Cap Toys got the rights in the 1990s and tried rebooting him as a more irreverent, cartoonish character, until Hasbro bought Cap Toys in 1997 and returned him to his classic look.",
    storyRo:
      "Figurina care se întinde a fost inventată în 1976 de un angajat Kenner pe nume Jesse Horowitz, care pur și simplu a crezut că ar fi o jucărie distractivă. Aspectul cizelat, cu maxilar pătrat, al lui Armstrong e adesea spus a se inspira din vedetele de acțiune ale vremii, Lee Majors și Charlton Heston, și din ceea ce devenise între timp chipul standard de supererou all-american. O companie mai mică din Ohio numită Cap Toys a obținut drepturile în anii 1990 și a încercat să-l reinventeze ca un personaj mai iconoclast, până când Hasbro a cumpărat Cap Toys în 1997 și l-a readus la aspectul clasic.",
    facts: [
      { stat: "1976", label: "Invented at Kenner", labelRo: "Inventat la Kenner" },
      { stat: "1997", label: "Hasbro restores the classic", labelRo: "Hasbro readuce clasicul" },
    ],
  },
  {
    key: "glowworm",
    name: "Glow Worm",
    nameRo: "Glow Worm",
    year: "1982",
    image: C.toyGlowWorm,
    inHouse: true,
    path: "Developed in-house",
    pathRo: "Dezvoltat intern",
    story:
      "Glow Worm, a little doll with a light-up face, was developed in-house by Hasbro's baby division in 1982, and it is a fairly sophisticated toy for its time. It reflects how, by the 1980s, American toymakers were free to chase their most ambitious ideas, with battery-operated toys becoming mainstream for the first time. By then most American toys were being made in China, a place with even cheaper labor than Japan, which meant companies could get more ambitious with their designs without giving up much profit margin, so long as, of course, the batteries were not included.",
    storyRo:
      "Glow Worm, o păpușică cu o față luminoasă, a fost dezvoltat intern de divizia de bebeluși a Hasbro în 1982 și este o jucărie destul de sofisticată pentru vremea ei. Reflectă cum, până în anii 1980, producătorii americani de jucării erau liberi să-și urmărească cele mai ambițioase idei, jucăriile cu baterii devenind mainstream pentru prima dată. Până atunci majoritatea jucăriilor americane se făceau în China, un loc cu forță de muncă și mai ieftină decât Japonia, ceea ce însemna că firmele puteau fi mai ambițioase cu designurile fără a renunța la prea mult profit, atâta timp cât, desigur, bateriile nu erau incluse.",
    facts: [
      { stat: "1982", label: "Hasbro's baby division", labelRo: "Divizia de bebeluși Hasbro" },
      { stat: "China", label: "Where the toys now came from", labelRo: "De unde veneau acum jucăriile" },
    ],
  },
  {
    key: "petmonster",
    name: "My Pet Monster",
    nameRo: "My Pet Monster",
    year: "1986",
    image: C.toyPetMonster,
    inHouse: false,
    path: "Via American Greetings, 1986",
    pathRo: "Prin American Greetings, 1986",
    story:
      "This plush monster, with its own cartoon of course, was an iconic 1980s toy, but unlike Glow Worm, Hasbro did not invent the character. They bought it from the licensing department of the Cincinnati greeting-card giant American Greetings. This was a very 1980s arrangement: companies kept whole departments whose only job was dreaming up original characters to sell to other companies who could figure out what to do with them. American Greetings was prolific at it, selling My Pet Monster to Hasbro while selling Care Bears and Strawberry Shortcake to Hasbro's rival Kenner. Hasbro, of course, bought Kenner in the early 1990s, so it got the last laugh.",
    storyRo:
      "Acest monstru de pluș, cu propriul desen animat desigur, a fost o jucărie iconică a anilor 1980, dar spre deosebire de Glow Worm, Hasbro nu a inventat personajul. L-au cumpărat de la departamentul de licențiere al gigantului de felicitări din Cincinnati, American Greetings. Era un aranjament foarte anii 1980: companiile țineau departamente întregi a căror singură treabă era să inventeze personaje originale de vândut altor companii. American Greetings era prolific la asta, vânzând My Pet Monster lui Hasbro în timp ce vindea Care Bears și Strawberry Shortcake rivalei Kenner. Hasbro, desigur, a cumpărat Kenner la începutul anilor 1990, așa că a râs la urmă.",
    facts: [
      { stat: "1986", label: "Bought as a character", labelRo: "Cumpărat ca personaj" },
      { stat: "Kenner", label: "Rival Hasbro later bought", labelRo: "Rivala cumpărată apoi de Hasbro" },
    ],
  },
];

const IN_HOUSE = TOYS.filter((t) => t.inHouse).length;

export function ToyCanon() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(3); // start on G.I. Joe
  const active = TOYS[sel];

  return (
    <div>
      {/* Toy selector */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {TOYS.map((t, i) => {
          const on = i === sel;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group flex flex-col items-center rounded-xl p-2.5 transition-all duration-300"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#fffdf7" : "rgba(255,253,247,0.5)",
                border: `1px solid ${on ? "#E8391B" : "rgba(12,9,7,0.1)"}`,
                boxShadow: on ? "0 18px 40px rgb(12,9,7,0.14)" : "0 2px 8px rgb(12,9,7,0.04)",
                transform: on ? "translateY(-4px)" : "none",
              }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src={t.image}
                  alt={ro ? t.nameRo : t.name}
                  fill
                  sizes="220px"
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  style={{ filter: on ? "none" : "grayscale(0.25)" }}
                />
              </div>
              <div className="mt-2.5 flex w-full items-center justify-between gap-1 px-0.5">
                <span
                  className="font-macro-display text-[13px] font-black uppercase leading-tight tracking-tight"
                  style={{ color: on ? "#E8391B" : "#0C0907" }}
                >
                  {ro ? t.nameRo : t.name}
                </span>
                <span className="font-body text-[10px] font-bold tracking-wider text-[#0C0907]/45">{t.year}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dossier */}
      <div key={active.key} className="mt-12 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_1.1fr] md:gap-14">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#0C0907]/10 bg-white shadow-[0_30px_80px_rgb(12,9,7,0.16)]">
          <Image
            src={active.image}
            alt={ro ? active.nameRo : active.name}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover"
          />
          <span
            className="absolute left-5 top-5 rounded-full px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur"
            style={{ backgroundColor: active.inHouse ? "rgba(30,110,70,0.9)" : "rgba(12,9,7,0.85)" }}
          >
            {active.inHouse ? (ro ? "Hasbro, intern" : "Hasbro, in-house") : (ro ? active.pathRo : active.path)}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-5 flex items-baseline gap-4">
            <h3 className="font-macro-display text-4xl font-black leading-none tracking-tight text-[#0C0907] md:text-5xl">
              {ro ? active.nameRo : active.name}
            </h3>
            <span className="font-macro-display text-2xl font-black text-[#0C0907]/25">{active.year}</span>
          </div>
          <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
            {ro ? active.storyRo : active.story}
          </p>
          <div className="mt-7 flex flex-wrap gap-8">
            {active.facts.map((f) => (
              <div key={f.label} className="border-l-2 border-[#E8391B]/40 pl-4">
                <div className="font-macro-display text-3xl font-black leading-none text-[#0C0907]">{f.stat}</div>
                <div className="mt-1.5 max-w-[11rem] font-body text-xs text-[#0C0907]/55">{ro ? f.labelRo : f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hasbro through-line */}
      <div className="mt-12 flex items-center gap-4 rounded-2xl border border-[#0C0907]/10 bg-white/50 px-6 py-5">
        <span className="font-macro-display text-4xl font-black leading-none text-[#E8391B]">{IN_HOUSE}/8</span>
        <p className="font-editorial text-sm leading-relaxed text-[#0C0907]/70">
          {ro
            ? "Doar două din cele opt au fost inventate chiar de Hasbro. Compania fondată în 1923 de frații Hassenfeld, imigranți polonezi din Rhode Island, a construit un imperiu de peste un miliard de dolari pe an nu inventând jucării, ci cumpărându-le, alături de companiile care le făceau: Kenner, Milton Bradley, Parker Brothers, Cap Toys. Absența evidentă din acest canon Hasbro este cea mai iconică jucărie a marii rivale Mattel: Barbie."
            : "Only two of the eight were invented by Hasbro itself. The company the Hassenfeld brothers, Polish immigrants, founded in Rhode Island in 1923 built a billion-dollar-a-year empire not by inventing toys but by buying them, along with the companies that made them: Kenner, Milton Bradley, Parker Brothers, Cap Toys. The glaring absence from this Hasbro canon is the most iconic toy of its great rival Mattel: Barbie."}
        </p>
      </div>
    </div>
  );
}
