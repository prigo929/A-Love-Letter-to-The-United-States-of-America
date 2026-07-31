"use client";

// ─── HolidaysTraditionsCanon ─────────────────────────────────────────────────
// "Why Are These Things American Christmas Symbols?": The Victorian print media
// revolution and post-war pop lore behind standard Christmas icons.
// Adapted from research in JJ McCullough's essay.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

interface ChristmasSymbol {
  id: string;
  image: string;
  name: string;
  nameRo: string;
  originEra: string;
  originEraRo: string;
  tagline: string;
  taglineRo: string;
  detail: string;
  detailRo: string;
  relics: string[];
  relicsRo: string[];
  worthKnowing: string;
  worthKnowingRo: string;
}

const CHRISTMAS_SYMBOLS: ChristmasSymbol[] = [
  {
    id: "snowman",
    image: SITE_IMAGES.culture.christmasSnowman,
    name: "The Snowman",
    nameRo: "Omul de zăpadă",
    originEra: "Victorian Print Media & 1950 Radio",
    originEraRo: "Imprimeria victoriană și radioul din 1950",
    tagline: "Top hats, pipes, coal buttons, broomcorn brooms, and orange carrots",
    taglineRo: "Cilindru, pipă, nasturi de cărbune, mătură și morcov portocaliu",
    detail:
      "While snow figures exist throughout human history, the standard look of the snowman was standardized on late 19th-century Victorian greeting cards. The top hat and pipe represented gentlemanly humor. Coal eyes and buttons reflected domestic heating coal. The broom stemmed from a 19th-century American agricultural boom in broomcorn, and the carrot nose reflected new French and Massachusetts orange carrot breeds. In 1950, Jack Rollins and Steve Nelson wrote Frosty the Snowman, entrenching his silk hat and broomstick in American folklore.",
    detailRo:
      "Deși figurile din zăpadă au existat mereu, aspectul standard al omului de zăpadă a fost stabilit pe felicitările victoriene de la sfârșitul secolului XIX. Cilindrul și pipa reprezentau umor gentlemanesc. Nasturii și ochii de cărbune reflectau încălzirea casnică. Mătura provenea din boom-ul agricol american al măturilor din sorg, iar morcovul reflecta noile soiuri din Franța și Massachusetts. În 1950, cântecul Frosty the Snowman i-a ancorat pălăria de mătase și mătura în folclorul american.",
    relics: ["Victorian Top Hat", "Domestic Coal Buttons", "1870s Pointy Orange Carrot", "1950 Frosty Pop Hit"],
    relicsRo: ["Cilindru victorian", "Nasturi din cărbune casnic", "Morcov portocaliu din 1870", "Hitul radio Frosty din 1950"],
    worthKnowing:
      "Receiving coal in a stocking for bad behavior originated in Victorian homes where coal was as common and practical as socks, serving as a dull household utility rather than a punishment.",
    worthKnowingRo:
      "Primirea cărbunelui pentru purtare rea își are originea în casele victoriene unde cărbunele era la fel de comun ca șosetele, servind ca un obiect casnic util dar neinteresant.",
  },
  {
    id: "gingerbread",
    image: SITE_IMAGES.culture.christmasGingerbread,
    name: "The Gingerbread Man",
    nameRo: "Omul de turtă dulce",
    originEra: "Medieval Spices & 1875 St. Nicholas Magazine",
    originEraRo: "Condimentele medievale și revista St. Nicholas din 1875",
    tagline: "Spiced root pastries evolving into child-centric holiday icons",
    taglineRo: "Prăjituri cu condimente devenite simboluri ale copilăriei de sărbători",
    detail:
      "Gingerbread originated in medieval Europe when rare spices and ginger root flavored baked goods before refined sugar became cheap. As Victorian Britain and America reframed Christmas as a child-centered holiday of joy, Bavarian gingerbread hearts evolved into playful human figures. In May 1875, the American children's magazine St. Nicholas published the original fairy tale of The Gingerbread Man, cementing the character in North American popular lore.",
    detailRo:
      "Turta dulce a apărut în Europa medievală când condimentele rare și ghimbirul asezonau prăjiturile înainte ca zahărul rafinat să devină ieftin. Pe măsură ce era victoriană a transformat Crăciunul într-o sărbătoare centrată pe copii, inimile de turtă dulce au evoluat în figurine umane. În mai 1875, revista americană St. Nicholas a publicat povestea originală The Gingerbread Man, ancorând personajul în cultura populară.",
    relics: ["Pre-Sugar Spice Baking", "Bavarian Artisanal Baking", "1875 St. Nicholas Magazine"],
    relicsRo: ["Copturi cu condimente pre-zahăr", "Patiserie artizanală bavareză", "Revista St. Nicholas din 1875"],
    worthKnowing:
      "The term 'sugar cookie' persists today as a historic contrast to gingerbread, recalling when making a cookie whose main sweetener was sugar was rare enough to require a special name.",
    worthKnowingRo:
      "Termenul 'biscuit de zahăr' dăinuie azi ca un contrast istoric cu turta dulce, amintind de vremurile când folosirea zahărului ca îndulcitor principal era neobișnuită.",
  },
  {
    id: "stockings",
    image: SITE_IMAGES.culture.christmasStocking,
    name: "Christmas Stockings",
    nameRo: "Șosetele de Crăciun",
    originEra: "Ancient Shoe Offerings to Hearthside Socks",
    originEraRo: "Prinosuri antice în încălțăminte până la șosetele de șemineu",
    tagline: "From ancient shoe offerings to custom novelty fireplace stockings",
    taglineRo: "De la prinosuri antice în pantofi la șosete ornamentale de șemineu",
    detail:
      "Leaving gifts in footwear dates back centuries to traditional shoe offerings made to St. Nicholas. In Dutch, German, and British folklore, children left shoes near the hearth. By the 19th century in Britain and America, drying everyday socks on fireplace mantels shifted into hanging custom novelty stockings for Santa Claus to fill with fruit, nuts, and small toys.",
    detailRo:
      "Lăsarea cadourilor în încălțăminte datează de secole, din tradiția prinosurilor făcute Sfântului Nicolae. În folclorul olandez, german și britanic, copiii lăsau pantofii lângă vatră. În secolul XIX, uscarea șosetelor zilnice pe șemineu a evoluat în agățarea șosetelor decorative de Crăciun pe care Moș Crăciun le umplea cu fructe și jucării.",
    relics: ["Hearthside Drying Habits", "St. Nicholas Shoe Lore", "Victorian Novelty Knitwear"],
    relicsRo: ["Uscarea hainelor la vatră", "Tradiția pantofilor Sf. Nicolae", "Tricotaje decorative victoriene"],
    worthKnowing:
      "Victorian etchings show that before manufactured novelty stockings were sold, children sometimes hung up their everyday trousers or long socks on the bedpost.",
    worthKnowingRo:
      "Gravurile victoriene arată că înainte de vânzarea șosetelor speciale, copiii își agățau uneori pantalonii zilnici sau șosetele lungi de tăblia patului.",
  },
  {
    id: "holly",
    image: SITE_IMAGES.culture.christmasHolly,
    name: "Holly",
    nameRo: "Iedera cu bobițe (Laurul)",
    originEra: "Roman Saturnalia to Mid-December Winter Decor",
    originEraRo: "Saturnaliile romane până la decorul de iarnă",
    tagline: "Ancient December greenery preserved continuously through centuries",
    taglineRo: "Verdeață antică de decembrie păstrată continuu de-a lungul secolelor",
    detail:
      "Holly is one of the few holiday symbols with direct links to classical antiquity. Ancient Romans decorated homes with green holly sprigs during Saturnalia, the mid-December festival of Saturn. The custom of hanging evergreen branches with red berries survived continuously into medieval European winter festivities and modern Anglo-American Christmas decor.",
    detailRo:
      "Iedera cu bobițe roșii este unul dintre puținele simboluri de sărbători cu legături directe cu antichitatea clasică. Romanii își împodobeau casele cu ramuri de laur în timpul Saturnaliilor din mijlocul lunii decembrie. Obiceiul a supraviețuit continuu în festivitățile medievale europene și în decorul anglo-american modern.",
    relics: ["Roman Saturnalia Greenery", "Evergreen Winter Symbolism", "Red Berry Botanical Accents"],
    relicsRo: ["Verdeața Saturnaliilor romane", "Simbolismul plantelor perene", "Accente botanice de bobițe roșii"],
    worthKnowing:
      "Holly grows natively on nearly every continent, leading ancient cultures worldwide to attribute magical or sacred protective qualities to its glossy winter leaves.",
    worthKnowingRo:
      "Laurul crește nativ pe aproape fiecare continent, determinând culturile antice să atribuie proprietăți sacre frunzelor sale lucioase de iarnă.",
  },
  {
    id: "candy-cane",
    image: SITE_IMAGES.culture.christmasCandyCane,
    name: "The Candy Cane",
    nameRo: "Bastonașul de zahăr",
    originEra: "17th C. Peppermint Sticks & 1920s Georgia Production",
    originEraRo: "Bastoane de mentă din sec. XVII și producția din Georgia anilor 1920",
    tagline: "Straight white peppermint sticks shaped into tree-ready hooked canes",
    taglineRo: "Bastoane albe de mentă transformate în cârlige pentru brad",
    detail:
      "Peppermint-flavored hard candy sticks emerged in the 17th century when sugar production expanded. The iconic red-and-white striped hooked candy cane is an American commercial innovation. Bob's Candies in Albany, Georgia began mass-producing hooked peppermint canes in the 1920s, accelerating in the 1950s after Bob's brother, Father Gregory Keller, invented the automated machine that bent the warm candy into tree-ready hooks.",
    detailRo:
      "Bastoanele tari de bomboane cu aromă de mentă au apărut în secolul XVII odată cu extinderea producției de zahăr. Bastonașul dungat roșu-alb cu cârlig este o inovație comercială americană. Bob's Candies din Albany, Georgia a început producția în masă în anii 1920, accelerând în anii 1950 după ce fratele lui Bob, părintele Gregory Keller, a inventat mașina automată care îndoia bomboana caldă.",
    relics: ["17th C. Peppermint Distillation", "1920s Bob's Candies Georgia", "1950s Keller Bending Machine"],
    relicsRo: ["Distilarea mentei din sec. XVII", "Bob's Candies Georgia din 1920", "Mașina de îndoit Keller din 1950"],
    worthKnowing:
      "Father Gregory Keller, a Catholic priest and brother of candy founder Bob McCormack, patented the Keller Machine in 1957, which automated bending straight candy sticks into curved canes.",
    worthKnowingRo:
      "Părintele Gregory Keller, preot catolic și frate al fondatorului Bob McCormack, a brevetat Mașina Keller în 1957, automatizând îndoirea bastoanelor de bomboane.",
  },
];

export function HolidaysTraditionsCanon() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);

  const active = CHRISTMAS_SYMBOLS[sel] || CHRISTMAS_SYMBOLS[0];

  return (
    <div className="my-16">
      {/* Selector tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {CHRISTMAS_SYMBOLS.map((sym, i) => {
          const on = i === sel;
          return (
            <button
              key={sym.id}
              type="button"
              onClick={() => setSel(i)}
              className="text-left rounded-2xl p-4 transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.04)",
                color: on ? "#F5EDD8" : "rgba(245,237,216,0.7)",
                borderColor: on ? "#E8B923" : "rgba(255,255,255,0.1)",
                transform: on ? "translateY(-2px)" : "none",
                boxShadow: on ? "0 16px 36px rgba(0,0,0,0.4)" : "none",
              }}
            >
              <p
                className="font-body text-[10px] font-bold uppercase tracking-[0.2em] mb-1"
                style={{ color: on ? "#E8B923" : "#E8391B" }}
              >
                {ro ? sym.originEraRo : sym.originEra}
              </p>
              <p className="font-macro-display text-base font-black leading-snug">
                {ro ? sym.nameRo : sym.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dossier Card */}
      <div key={active.id} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold">
                {ro ? active.originEraRo : active.originEra}
              </span>
            </div>
            <h3 className="font-macro-display text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              {ro ? active.nameRo : active.name}
            </h3>
            <p className="font-editorial text-lg italic text-[#F5EDD8]/80 leading-relaxed mb-6">
              &ldquo;{ro ? active.taglineRo : active.tagline}&rdquo;
            </p>

            {/* Historic Relics */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 mb-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B] mb-3">
                {ro ? "RELICTAR ISTORIC & INOVAȚII" : "HISTORIC RELICS & INNOVATIONS"}
              </p>
              <div className="flex flex-wrap gap-2">
                {(ro ? active.relicsRo : active.relics).map((r, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white/10 border border-white/10 px-3 py-1 font-body text-xs font-semibold text-[#F5EDD8]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Worth Knowing */}
            <div className="rounded-2xl border border-glory-gold/30 bg-glory-gold/[0.04] p-5">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold mb-2">
                {ro ? "DE ȘTIUT" : "WORTH KNOWING"}
              </p>
              <p className="font-editorial text-sm leading-relaxed text-[#F5EDD8]/80">
                {ro ? active.worthKnowingRo : active.worthKnowing}
              </p>
            </div>
          </div>

          {/* Right Column: image & text */}
          <div className="flex flex-col justify-center gap-6 lg:pl-6 lg:border-l lg:border-white/10">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 bg-white/5">
              <Image
                src={active.image}
                alt={active.name}
                fill
                className="object-contain p-3"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#F5EDD8]/90">
              {ro ? active.detailRo : active.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
