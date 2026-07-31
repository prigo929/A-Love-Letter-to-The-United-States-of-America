"use client";

// ─── ToySymbols ──────────────────────────────────────────────────────────────
// Why the symbols we use for "a toy" (in cartoons, clip art, Christmas décor, an
// old Pac-Man game) are a frozen, weirdly dated set: the train, the toy soldier,
// the drum, the teddy bear, the doll, the kite, the rocking horse. The answer is
// Victorian Christmas, which sentimentalized the high-quality machine-made toys
// of the 19th century into symbols of the season, and never let them go.
//
// Adapted from a video essay's research (JJ, "Why are American symbols for toys
// so old and weird"): its "visual anachronism" thesis and facts guided coverage;
// every line here is rewritten in the site's own voice, not transcribed.
// Cream/parchment editorial surface (dark text on cream).

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

const C = SITE_IMAGES.culture;

interface ToyIcon {
  key: string;
  icon: string;
  image: string;
  name: string;
  nameRo: string;
  tag: string;
  tagRo: string;
  story: string;
  storyRo: string;
}

const SYMBOLS: ToyIcon[] = [
  {
    key: "train",
    icon: "🚂",
    image: C.symTrain,
    name: "The Toy Train",
    nameRo: "Trenulețul",
    tag: "Tin plate & clockwork",
    tagRo: "Tablă și mecanism de ceas",
    story:
      "The train is a pinnacle of the 19th-century toy. Once metal became cheap to mold, firms that had made pots or pocket watches turned to tin plate (thin steel coated in tin) and clockwork, the wind-up gears and springs that let a toy move on its own. A toy train counted as the finest children's entertainment of the age, and Victorian parents gave boys trains partly to steer them toward becoming engineers, one of the era's most valued professions.",
    storyRo:
      "Trenul este un vârf al jucăriei din secolul XIX. Odată ce metalul a devenit ieftin de turnat, firme care făcuseră oale sau ceasuri de buzunar au trecut la tabla cositorită (oțel subțire acoperit cu cositor) și la mecanismul de ceas, roțile și arcurile care lăsau o jucărie să se miște singură. Un trenuleț era cel mai fin divertisment pentru copii al epocii, iar părinții victorieni le dădeau băieților trenuri parțial ca să-i îndrume spre a deveni ingineri.",
  },
  {
    key: "soldier",
    icon: "🪖",
    image: C.symSoldiers,
    name: "The Toy Soldier",
    nameRo: "Soldățelul",
    tag: "The martial nursery",
    tagRo: "Camera de joacă marțială",
    story:
      "Toy soldiers came out of the same tin-plate boom, and they carried a lesson: giving boys soldiers was meant to interest them in becoming military men, back in the pre-WWI days when war was still thought a wholesome thing. Sometimes it worked. Winston Churchill said his toy soldiers as a boy in the 1870s inspired his military career. The soldier survives as a toy symbol long after the martial nursery that made it has vanished.",
    storyRo:
      "Soldățeii au ieșit din același avânt al tablei cositorite și purtau o lecție: a le da băieților soldați trebuia să-i intereseze să devină militari, pe vremea de dinainte de Primul Război Mondial, când războiul era încă socotit un lucru sănătos. Uneori funcționa. Winston Churchill spunea că soldățeii lui din anii 1870 i-au inspirat cariera militară. Soldatul supraviețuiește ca simbol al jucăriei mult după ce camera de joacă marțială care l-a produs a dispărut.",
  },
  {
    key: "drum",
    icon: "🥁",
    image: C.symDrum,
    name: "The Toy Drum",
    nameRo: "Toba",
    tag: "Marching-band culture",
    tagRo: "Cultura fanfarei militare",
    story:
      "The drum belongs to the same martial world. Drums were central to military culture back when marching in formation was cutting-edge strategy, and many early toy drums were made by companies that had produced full-size drums for soldiers and now had more capacity than they knew what to do with. Owning your own drum was another way a child could take part in the wholesome war-play of the era.",
    storyRo:
      "Toba aparține aceleiași lumi marțiale. Tobele erau centrale culturii militare pe vremea când marșul în formație era strategie de vârf, iar multe tobe-jucărie timpurii erau făcute de companii care produseseră tobe în mărime naturală pentru soldați și aveau acum mai multă capacitate decât știau ce să facă cu ea. A avea propria tobă era încă un mod prin care un copil putea lua parte la jocul de-a războiul al epocii.",
  },
  {
    key: "doll",
    icon: "🎎",
    image: C.symDoll,
    name: "The Doll",
    nameRo: "Păpușa",
    tag: "The golden age of the doll",
    tagRo: "Epoca de aur a păpușii",
    story:
      "Girls got the other half of the canon. The industrial textile trade could mass-produce soft doll bodies and elaborate clothing, porcelain gave realistic heads, glass gave realistic eyes, and the poor supplied realistic human hair. Collectors call the mid-19th century the golden age of the doll, led by French makers selling into Britain and America. Like soldiers for boys, dolls were considered educational, meant to interest girls in motherhood and dressing prettily.",
    storyRo:
      "Fetele au primit cealaltă jumătate a canonului. Comerțul textil industrial putea produce în masă corpuri moi de păpuși și haine elaborate, porțelanul dădea capete realiste, sticla dădea ochi realiști, iar cei săraci furnizau păr uman realist. Colecționarii numesc mijlocul secolului XIX epoca de aur a păpușii, condusă de producători francezi care vindeau în Marea Britanie și America. Ca soldații pentru băieți, păpușile erau considerate educative, menite să intereseze fetele de maternitate.",
  },
  {
    key: "teddy",
    icon: "🧸",
    image: C.symTeddy,
    name: "The Teddy Bear",
    nameRo: "Ursulețul de pluș",
    tag: "Nouveau primitivism",
    tagRo: "Primitivism nouveau",
    story:
      "The teddy bear is the gentle exception, gender-neutral and peaceful, with no politics in it except for the goats skinned to make the fur. It rode a wave of \"nouveau primitivism\" in turn-of-the-century toys: even amid awe at the industrial revolution, there was anxiety that the world was getting too mechanical, so toys of natural materials, teddy bears, wooden blocks, kites, rocking horses, were a conscious effort to bring an old-fashioned, Geppetto-like purity to a nursery full of gears and steel.",
    storyRo:
      "Ursulețul de pluș este excepția blândă, neutru din punct de vedere al genului și pașnic, fără politică în el, în afară de caprele jupuite pentru blană. A călărit un val de „primitivism nouveau” în jucăriile de la începutul secolului: chiar și în admirația față de revoluția industrială, exista o anxietate că lumea devine prea mecanică, așa că jucăriile din materiale naturale, ursuleții, cuburile de lemn, zmeiele, căluții de lemn, erau un efort conștient de a aduce o puritate de modă veche, à la Geppetto.",
  },
  {
    key: "kite",
    icon: "🪁",
    image: C.symKite,
    name: "The Kite",
    nameRo: "Zmeul",
    tag: "The natural-material revival",
    tagRo: "Renașterea materialelor naturale",
    story:
      "The kite belongs to that same reaction against the machine. Simple, made of paper and wood and string, it read as wholesome and old-fashioned in an age of clockwork, and it stuck in the symbolic canon of childhood even as few kids fly one now. It is one of the images you reliably get if you search for toy clip art today, alongside the drum and the train.",
    storyRo:
      "Zmeul aparține aceleiași reacții împotriva mașinii. Simplu, făcut din hârtie, lemn și sfoară, părea sănătos și de modă veche într-o epocă a mecanismelor de ceas și a rămas în canonul simbolic al copilăriei, chiar dacă puțini copii mai zboară unul acum. Este una dintre imaginile pe care le primești sigur dacă cauți azi clip art cu jucării, alături de tobă și tren.",
  },
  {
    key: "rockinghorse",
    icon: "🎠",
    image: C.symRockingHorse,
    name: "The Rocking Horse",
    nameRo: "Căluțul de lemn",
    tag: "Ancient-looking, actually Victorian",
    tagRo: "Pare străvechi, de fapt victorian",
    story:
      "The rocking horse looks ancient, but it was not a mainstream toy until the 1850s. It rode the same nostalgia for natural materials, wood over gears, that carried the teddy bear and the kite, and its handmade, storybook feel is exactly what kept it in the symbolic toy set. The pattern repeats: the toys that came to stand for all toys are the ones Victorian taste decided looked wholesome.",
    storyRo:
      "Căluțul de lemn pare străvechi, dar nu a fost o jucărie de larg consum până în anii 1850. A călărit aceeași nostalgie pentru materiale naturale, lemn în locul roților dințate, care a purtat ursulețul și zmeul, iar aerul lui făcut de mână, de poveste, e exact ce l-a păstrat în setul simbolic de jucării. Tiparul se repetă: jucăriile care au ajuns să reprezinte toate jucăriile sunt cele pe care gustul victorian le-a decis a arăta sănătos.",
  },
  {
    key: "cowboyhat",
    icon: "🤠",
    image: C.symCowboyHat,
    name: "The Cowboy Hat",
    nameRo: "Pălăria de cowboy",
    tag: "The 1950s addition",
    tagRo: "Adăugirea anilor 1950",
    story:
      "Not everything in the canon is Victorian. A few symbols of postwar modernity crept in, the pogo stick, the skateboard, and above all the cowboy and the robot, both icons of 1950s American television culture. The 1950s may even be turning into a second Victorian age: they are now as far from us as the Victorians were from people in the 1950s, and we sentimentalize their look as a lost wholesome time in much the same way.",
    storyRo:
      "Nu tot ce e în canon e victorian. Câteva simboluri ale modernității postbelice s-au strecurat, băţul-săltăreţ, skateboardul și, mai presus de toate, cowboy-ul și robotul, ambele icoane ale culturii de televiziune americane din anii 1950. Anii 1950 s-ar putea chiar să devină o a doua epocă victoriană: sunt acum la fel de departe de noi pe cât erau victorienii de oamenii din anii 1950, iar noi le sentimentalizăm aspectul ca pe o epocă sănătoasă pierdută, cam în același fel.",
  },
];

export function ToySymbols() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = SYMBOLS[sel];

  return (
    <div>
      {/* Symbol grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:grid-cols-8">
        {SYMBOLS.map((s, i) => {
          const on = i === sel;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group flex flex-col items-center gap-2 rounded-2xl border p-2 transition-all duration-300"
              style={{
                cursor: "pointer",
                borderColor: on ? "#E8391B" : "rgba(12,9,7,0.12)",
                backgroundColor: on ? "#fffdf7" : "rgba(255,255,255,0.4)",
                transform: on ? "translateY(-4px)" : "none",
                boxShadow: on ? "0 16px 36px rgb(12,9,7,0.12)" : "none",
              }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src={s.image}
                  alt={ro ? s.nameRo : s.name}
                  fill
                  sizes="160px"
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  style={{ filter: on ? "none" : "grayscale(0.4)" }}
                />
              </div>
              <span
                className="text-center font-body text-[10px] font-bold uppercase leading-tight tracking-wide"
                style={{ color: on ? "#E8391B" : "rgba(12,9,7,0.5)" }}
              >
                {ro ? s.nameRo : s.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active symbol */}
      <div key={active.key} className="mt-10 grid gap-8 rounded-3xl border border-[#0C0907]/10 bg-white/50 p-7 md:grid-cols-[minmax(0,0.7fr)_1fr] md:items-center md:gap-12 md:p-10">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#0C0907]/10 bg-white shadow-[0_20px_50px_rgb(12,9,7,0.12)]">
          <Image
            src={active.image}
            alt={ro ? active.nameRo : active.name}
            fill
            sizes="(max-width: 768px) 100vw, 32vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B]">
            {ro ? active.tagRo : active.tag}
          </p>
          <h3 className="mb-5 font-macro-display text-3xl font-black leading-none tracking-tight text-[#0C0907] md:text-4xl">
            {ro ? active.nameRo : active.name}
          </h3>
          <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
            {ro ? active.storyRo : active.story}
          </p>
        </div>
      </div>
    </div>
  );
}
