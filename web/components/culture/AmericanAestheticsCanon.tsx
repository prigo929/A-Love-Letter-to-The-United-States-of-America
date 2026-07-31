"use client";

// ─── AmericanAestheticsCanon ──────────────────────────────────────────────────
// "8 Distinctly American Aesthetics": Broad looks and decor styles grounded in
// American geography, architectural nostalgia, and subcultural memory.
// Adapted from research in JJ McCullough's essay.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

interface AestheticItem {
  id: string;
  image: string;
  number: string;
  name: string;
  nameRo: string;
  vibe: string;
  vibeRo: string;
  tagline: string;
  taglineRo: string;
  elements: string[];
  elementsRo: string[];
  description: string;
  descriptionRo: string;
  worthKnowing: string;
  worthKnowingRo: string;
}

const AESTHETICS: AestheticItem[] = [
  {
    id: "cabin",
    image: SITE_IMAGES.culture.aestheticCabin,
    number: "01",
    name: "The Cabin / Outdoors Aesthetic",
    nameRo: "Estetica de cabană și natură",
    vibe: "Rustic Woods, Flannel & National Parks",
    vibeRo: "Lemn rustic, flanel și Parcuri Naționale",
    tagline: "Dark unpainted timber, oil lamps, snowshoes, and cozy forest shelters",
    taglineRo: "Lemn masiv necurățat, lămpi cu gaz, rachete de zăpadă și adăposturi montane",
    elements: ["Kerosene oil lamps", "Folded flannel blankets", "Wall-mounted canoe paddles", "Felt pennants & stone hearths"],
    elementsRo: ["Lămpi cu gaz", "Pături din flanel", "Vâsle de canoe pe perete", "Fanioane din pâslă și șeminee din piatră"],
    description:
      "Grounded in sentimentality for the vast forests and mountains of North America, this look evokes primitive yet comfortable wilderness living. Popularized in films like Wes Anderson's Moonrise Kingdom, it relies on unpainted dark wood, National Park Service signs, and vintage camping props to turn Airbnbs, outdoor shops, and souvenir boutiques into cozy rustic retreats.",
    descriptionRo:
      "Ancorată în sentimentalismul pentru pădurile și munții din America de Nord, această estetică evocă o viață simplă în mijlocul naturii. Popularizată în filme precum Moonrise Kingdom al lui Wes Anderson, se bazează pe lemn masiv, semnalistică de Parcuri Naționale și elemente de camping vintage pentru a transforma spațiile în refugii rustice.",
    worthKnowing:
      "This aesthetic is so universally associated with American wilderness culture that souvenir stores as far away as England explicitly style themselves in 'American outdoors Wes Anderson' decor.",
    worthKnowingRo:
      "Această estetică este atât de asociată cu natura americană încât magazine de suveniruri din Anglia își decorează spațiile în stilul 'American outdoors Wes Anderson'.",
  },
  {
    id: "circus",
    image: SITE_IMAGES.culture.aestheticCircus,
    number: "02",
    name: "The Circus & Carnival Aesthetic",
    nameRo: "Estetica de circ și bâlci",
    vibe: "Red & White Stripes, Popcorn & Vintage Marquees",
    vibeRo: "Dungi roșii și albe, floricele și caractere vintage",
    tagline: "Classic 19th-century big-top tents, marquee typography, and family wonder",
    taglineRo: "Corturi clasice din secolul XIX, tipografie de cort și miracol de familie",
    elements: ["Red-and-white striped tents", "Popcorn carts in paper bags", "Carnival marquee typography", "Carousel animals & party hats"],
    elementsRo: ["Corturi cu dungi roșii-albe", "Cărucioare de popcorn", "Tipografie de bâlci", "Cai de carusel și coifuri de petrecere"],
    description:
      "Arising in the mid-19th century as mass middle-class family entertainment, traditional circus tropes became heavily nostalgified in early 20th-century America. Featuring bold red-and-white candy stripes, popcorn machines, marquee sign fonts, and theatrical flair, it remains a staple of county fairs, theme parks, candy shops, and Halloween haunted attractions.",
    descriptionRo:
      "Apărută la mijlocul secolului XIX ca divertisment pentru familie, estetica de circ a devenit un simbol nostalgic în America secolului XX. Cu dungi roșii și albe, mașini de popcorn și fonturi specifice de bâlci, rămâne un element de bază al târgurilor județene, parcurilor de distracții și atragerilor de Halloween.",
    worthKnowing:
      "Before video rental stores vanished, chains like Jumbo Video offered free bags of fresh popcorn at the door and styled their tape boxes like red-and-white circus tents.",
    worthKnowingRo:
      "Înainte ca magazinele de închiriat casete să dispară, lanțuri precum Jumbo Video ofereau popcorn gratuit la intrare și își decorau cutiile ca pe corturi de circ.",
  },
  {
    id: "wild-west",
    image: SITE_IMAGES.culture.aestheticWildWest,
    number: "03",
    name: "The Wild West / Saloon Aesthetic",
    nameRo: "Estetica Wild West și Saloon",
    vibe: "Unpainted Boardwalks, Wanted Posters & Leather Boots",
    vibeRo: "Podele din lemn, afișeWanted și cizme din piele",
    tagline: "Swinging doors, tin sheriff badges, sepia photos, and frontier architecture",
    taglineRo: "Uși batante, stele de șerif din tinichea, fotografii sepie și arhitectură de frontieră",
    elements: ["Swinging saloon doors", "Sepia-toned portrait photography", "Wanted posters with wooden fonts", "Stetson hats & tin badges"],
    elementsRo: ["Uși batante de saloon", "Fotografii în tonuri sepie", "Afișe Wanted cu fonturi din lemn", "Pălării Stetson și stele de șerif"],
    description:
      "Capturing the late 19th-century post-Civil War frontier expansion between the 1870s and 1890s, the Wild West look is defined by unpainted wooden facades, swinging saloon doors, sepia-toned photography, and cowboy boots. Kept alive across Texas, Alberta, and the American West, it forms the visual backbone of country music venues and souvenir rodeo portrait studios.",
    descriptionRo:
      "Capturând expansiunea de frontieră de la sfârșitul secolului XIX dintre anii 1870 și 1890, stilul Wild West este definit de fațade din lemn necurățat, uși batante de saloon, fotografii sepie și cizme de cowboy. Păstrat în Texas și în Vestul American, formează coloana vizuală a localurilor de muzică country și a studiourilor foto rodeo.",
    worthKnowing:
      "The Wild West aesthetic is heavily preserved west of the 100th meridian, where towns keep historic boardwalks and saloon architecture intact for visitors.",
    worthKnowingRo:
      "Estetica Wild West este conservată la vest de meridianul 100, unde orașele păstrează trotuare din lemn și arhitectură de saloon pentru vizitatori.",
  },
  {
    id: "farmhouse",
    image: SITE_IMAGES.culture.aestheticFarmhouse,
    number: "04",
    name: "The Farmhouse Aesthetic",
    nameRo: "Estetica de casă de fermă",
    vibe: "Cozy Rural Living, Milk Jugs & Soft Quilts",
    vibeRo: "Viață rurală caldă, ulcioare de lapte și plapume",
    tagline: "Ceramic chickens, butter dishes, antique tin jugs, and warm family kitchens",
    taglineRo: "Găini ceramice, vase de unt, ulcioare din tinichea și bucătării de familie",
    elements: ["Ceramic rooster & cow butter dishes", "Antique milk jugs", "Patchwork quilts & woven baskets", "Warm wood breakfast nooks"],
    elementsRo: ["Vase de unt cu cocoși și vaci", "Ulcioare vechi de lapte", "Plapume din petice și coșuri împletite", "Spații de mic dejun din lemn"],
    description:
      "Evoking the home of a comfortable 20th-century middle-class farm family, the farmhouse aesthetic celebrates an authentic, simple rural lifestyle. Associated with cozy breakfast kitchens, ceramic animal butter dishes, tin milk jugs, and soft quilts, it remains one of the most popular decor styles for breakfast diners, Airbnbs, and suburban homes.",
    descriptionRo:
      "Evocând casa unei familii de fermieri din secolul XX, estetica de fermă celebrează un stil de viață rural simplu și autentic. Asociată cu bucătării calde pentru mic dejun, vase ceramice în formă de animale și plapume moi, rămâne unul dintre cele mai populare stiluri de decor pentru restaurante și case suburbane.",
    worthKnowing:
      "Popular American breakfast chains explicitly adopt the farmhouse look so diners associate their morning meals with fresh farm eggs, cream, and butter.",
    worthKnowingRo:
      "Lanțuri populare americane de mic dejun adoptă stilul de fermă pentru ca clienții să asocieze mesele cu ouă proaspete, smântână și unt.",
  },
  {
    id: "nautical",
    image: SITE_IMAGES.culture.aestheticNautical,
    number: "05",
    name: "The Coastal / Nautical Aesthetic",
    nameRo: "Estetica marină și de coastă",
    vibe: "Lighthouses, Ships-in-a-Bottle & Navy Ropes",
    vibeRo: "Faruri, nave în sticlă și frânghii marinărești",
    tagline: "Wooden ship wheels, lifesaver rings, semaphore flags, and quiet luxury sailing",
    taglineRo: "Cârme din lemn, colaci de salvare, steaguri semafor și eleganță de navigație",
    elements: ["Brass ship steering wheels", "Ships in glass bottles", "White and orange lifesaver rings", "Knot-tying displays & navy rope"],
    elementsRo: ["Cârme de navă din alamă", "Corăbii în sticlă", "Colaci de salvare albi-portocalii", "Tablouri cu noduri marinărești"],
    description:
      "Spanning working-class Atlantic fishing docks to upper-class New England sailing culture, the nautical aesthetic captures oceanfront living. Decorated with ship wheels, buoy nets, ships-in-a-bottle, and navy-and-white palettes, it spans Maine seafood shacks, coastal hotels, and quiet luxury apparel brands like Ralph Lauren.",
    descriptionRo:
      "De la docurile de pescuit din Atlantic la cultura de navigație din New England, estetica marină captează viața de coastă. Decorată cu cârme de navă, plase cu flotoare, corăbii în sticlă și palete albastru-marin cu alb, este prezentă în restaurante de fructe de mare, hoteluri de coastă și branduri de îmbrăcăminte precum Ralph Lauren.",
    worthKnowing:
      "Nautical decor is arguably the oldest continuously used aesthetic in North America, rooted in 17th-century maritime trade and fishing history.",
    worthKnowingRo:
      "Decorul marin este probabil cea mai veche estetică utilizată continuu în America de Nord, având rădăcini în comerțul maritim din secolul XVII.",
  },
  {
    id: "diner",
    image: SITE_IMAGES.culture.aestheticDiner,
    number: "06",
    name: "The 1950s Diner / Rockabilly Aesthetic",
    nameRo: "Estetica Diner '50 și Rockabilly",
    vibe: "Chrome Stools, Checkerboard Floors & Neon Signs",
    vibeRo: "Scaune cromate, podele în carouri și semne neon",
    tagline: "Red vinyl booths, jukeboxes, milkshakes, and roadside American comfort",
    taglineRo: "Separeuri din vinil roșu, jukebox-uri, milkshake-uri și confort pe margine de drum",
    elements: ["Black and white checkerboard floors", "Red vinyl booth seating", "Chrome counter stools", "Tabletop jukeboxes & neon arches"],
    elementsRo: ["Podele în carouri alb-negru", "Separeuri din vinil roșu", "Scaune de bar cromate", "Jukebox-uri de masă și arcade neon"],
    description:
      "Tightly fused with post-war roadside culture, the 1950s diner aesthetic is a temple to the burger, milkshake, and automobile freedom. Marked by checkerboard floors, chrome stools, red vinyl booths, and glowing neon signs, it serves as a cherished pop-culture monument in American towns and international retro diners.",
    descriptionRo:
      "Strâns legată de cultura rutieră postbelică, estetica diner-ului din anii 1950 este un templu al burgerului, milkshake-ului și libertății automobilistice. Cu podele în carouri, scaune cromate, separeuri din vinil roșu și semne de neon, servește ca un monument al culturii pop în orașe americane și restaurante retro din întreaga lume.",
    worthKnowing:
      "Just as sushi bars celebrate Japanese culinary traditions, the 1950s diner aesthetic functions as the ceremonial space for celebrating the heritage of the burger.",
    worthKnowingRo:
      "Așa cum localurile de sushi celebrează tradițiile culinare japoneze, diner-ul din anii '50 funcționează ca spațiul ceremonial ce celebrează moștenirea burgerului.",
  },
  {
    id: "industrial",
    image: SITE_IMAGES.culture.aestheticIndustrial,
    number: "07",
    name: "The Industrial Loft Aesthetic",
    nameRo: "Estetica de loft industrial",
    vibe: "Exposed Brick, Iron Beams & Edison Bulbs",
    vibeRo: "Cărămidă aparentă, grinzi din fier și becuri Edison",
    tagline: "Repurposed factory gears, high ceilings, steel columns, and warehouse spaces",
    taglineRo: "Angrenaje de fabrică reutilizate, plafoane înalte, coloane din oțel și depozite",
    elements: ["Exposed red brick walls", "Cast iron structural beams", "Filament Edison bulb lighting", "Repurposed factory machinery gears"],
    elementsRo: ["Pereți din cărămidă roșie aparentă", "Grinzi din fontă", "Iluminat cu becuri cu filament Edison", "Angrenaje din vechi fabrici"],
    description:
      "Born when late 19th-century manufacturing shifted out of urban centers, artists converted vacant textile mills and warehouses into living spaces. Featuring exposed brick, cast iron beams, Edison filament bulbs, and polished concrete floors, this look turned industrial utility into a modern architectural luxury standard.",
    descriptionRo:
      "Născută când producția de la sfârșitul secolului XIX s-a mutat din centrele urbane, artiștii au transformat vechile fabrici și depozite în spații de locuit. Cu cărămidă aparentă, grinzi din fontă, becuri Edison și podele din beton șlefuit, acest stil a transformat utilitatea industrială într-un standard de lux arhitectural.",
    worthKnowing:
      "The conversion of 19th-century Soho and Brooklyn factory lofts in New York City laid the blueprint for modern open-concept apartment interior architecture worldwide.",
    worthKnowingRo:
      "Transformarea lofturilor industriale din Soho și Brooklyn în New York a creat șablonul pentru arhitectura modernă de apartamente cu spațiu deschis.",
  },
  {
    id: "suburban-mall",
    image: SITE_IMAGES.culture.aestheticSuburbanMall,
    number: "08",
    name: "The Suburban Mall / 1980s Neon Aesthetic",
    nameRo: "Estetica de mall suburban și neon '80",
    vibe: "Glass Skylights, Potted Ficus & Neon Arches",
    vibeRo: "Luminatoare din sticlă, ficuși în ghiveci și arcade neon",
    tagline: "Food court escalators, pastel geometry, polished tile, and consumer hubs",
    taglineRo: "Scări rulante în food court, geometrie pastel, gresie lucioasă și hub-uri de consum",
    elements: ["Atrium glass skylights", "Neon food court sign arches", "Potted ficus trees & brass railings", "Multi-level glass escalators"],
    elementsRo: ["Luminatoare din sticlă în atriu", "Arcade cu neon în food court", "Ficuși în ghivece și balustrade din alamă", "Scări rulante din sticlă"],
    description:
      "Defining late 20th-century suburban youth culture, the shopping mall aesthetic captured the consumer abundance of the 1980s and 90s. Built around glass-roof atriums, potted ficus trees, neon-lit food courts, polished floor tiles, and escalators, it remains a heavily nostalgic symbol of social gathering and teenage independence.",
    descriptionRo:
      "Definind cultura tineretului suburban de la sfârșitul secolului XX, estetica de mall a capturat abundența anilor 1980 și 90. Construită în jurul atriilor din sticlă, ficușilor în ghivece, food court-urilor iluminate cu neon și scărilor rulante, rămâne un simbol nostalgic al întâlnirilor sociale și al independenței adolescenților.",
    worthKnowing:
      "The enclosed suburban shopping mall was designed in 1956 by Austrian architect Victor Gruen in Edina, Minnesota, intended as a climate-controlled town square.",
    worthKnowingRo:
      "Mall-ul suburban acoperit a fost proiectat în 1956 de arhitectul austriac Victor Gruen în Edina, Minnesota, conceput ca o piață publică climatizată.",
  },
];

export function AmericanAestheticsCanon() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);

  const active = AESTHETICS[sel] || AESTHETICS[0];

  return (
    <div className="my-16">
      {/* 8 Aesthetic Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {AESTHETICS.map((item, i) => {
          const on = i === sel;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSel(i)}
              className="text-left rounded-2xl p-4 transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.4)",
                color: on ? "#F5EDD8" : "#0C0907",
                borderColor: on ? "#0C0907" : "rgba(12,9,7,0.1)",
                transform: on ? "translateY(-2px)" : "none",
                boxShadow: on ? "0 16px 36px rgba(12,9,7,0.12)" : "none",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-body text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: on ? "#E8B923" : "#E8391B" }}
                >
                  {item.number}
                </span>
              </div>
              <p className="font-macro-display text-sm font-black leading-snug">
                {ro ? item.nameRo : item.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Aesthetic Dossier Card */}
      <div key={active.id} className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#0C0907]/10 p-8 md:p-12 shadow-[0_20px_60px_rgba(12,9,7,0.06)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-[#E8391B]">
                Aesthetic {active.number}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C0907]/30" />
              <span className="font-body text-xs font-semibold text-[#0C0907]/60">
                {ro ? active.vibeRo : active.vibe}
              </span>
            </div>

            <h3 className="font-macro-display text-3xl sm:text-4xl font-black text-[#0C0907] leading-tight mb-4">
              {ro ? active.nameRo : active.name}
            </h3>

            <p className="font-editorial text-lg italic text-[#0C0907]/80 leading-relaxed mb-6">
              &ldquo;{ro ? active.taglineRo : active.tagline}&rdquo;
            </p>

            {/* Core visual elements */}
            <div className="rounded-2xl bg-[#0C0907]/5 border border-[#0C0907]/10 p-5 mb-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#0C0907]/50 mb-3">
                {ro ? "ELEMENTE VIZUALE CHEIE" : "KEY VISUAL ELEMENTS"}
              </p>
              <div className="flex flex-wrap gap-2">
                {(ro ? active.elementsRo : active.elements).map((el, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white/80 border border-[#0C0907]/10 px-3 py-1 font-body text-xs font-semibold text-[#0C0907]"
                  >
                    {el}
                  </span>
                ))}
              </div>
            </div>

            {/* Worth knowing */}
            <div className="rounded-2xl border border-glory-gold/40 bg-glory-gold/10 p-5">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#0C0907] mb-2">
                {ro ? "DE ȘTIUT" : "WORTH KNOWING"}
              </p>
              <p className="font-editorial text-sm leading-relaxed text-[#0C0907]/80">
                {ro ? active.worthKnowingRo : active.worthKnowing}
              </p>
            </div>
          </div>

          {/* Right column: image & detailed description */}
          <div className="flex flex-col justify-center gap-6 lg:pl-6 lg:border-l lg:border-[#0C0907]/10">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(12,9,7,0.12)] border border-[#0C0907]/10">
              <Image
                src={active.image}
                alt={active.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#0C0907]/85">
              {ro ? active.descriptionRo : active.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
