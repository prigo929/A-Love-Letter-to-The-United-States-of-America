"use client";

// ─── EightAmericanBalls ──────────────────────────────────────────────────────
// The eight balls the USPS put on its 2017 stamp set, the most quintessentially
// American sports balls, each with a distinct design-evolution story, and one
// recurring hero: A.G. Spalding, the retired ballplayer who founded America's
// first great sporting-goods company and shaped five of these eight. A stamp-sheet
// grid selects; the dossier opens each ball's history, milestone rail, and facts.
//
// Adapted from a video essay's research (JJ, "The story behind America's favorite
// sportsballs"): its canon framing and facts guided coverage; every line here is
// rewritten in the site's own voice, not transcribed. Cream/parchment editorial
// surface (dark text on cream), matching the sports page.

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE_IMAGES } from "@/lib/site-images";

interface Ball {
  key: string;
  name: string;
  nameRo: string;
  year: string;
  image: string;
  spalding: boolean;
  tagline: string;
  taglineRo: string;
  story: string;
  storyRo: string;
  milestones: { year: string; en: string; ro: string }[];
  facts: { stat: string; label: string; labelRo: string }[];
}

const C = SITE_IMAGES.culture;

const BALLS: Ball[] = [
  {
    key: "football",
    name: "Football",
    nameRo: "Fotbal american",
    year: "1887",
    image: C.ballFootball,
    spalding: true,
    tagline: "A rugby ball, frozen in time",
    taglineRo: "O minge de rugby, înghețată în timp",
    story:
      "American football is a spin-off of British rugby that colleges began playing in the late 1800s to settle which school was better, so the first footballs simply copied the British rugby ball, and of all these balls it has changed the least, deliberately preserving a 19th-century look the British themselves abandoned. Before rubber, lightweight balls were pig bladders blown up like balloons (the origin of \"pigskin\"), sheathed in cow leather and stitched shut. A.G. Spalding, a retired ballplayer turned founder of America's first great sporting-goods company, takes credit for the first mass-market football in 1887. Vulcanized rubber later replaced the bladders, but pro balls still wear real leather with the laces tied by hand. The stripes announce the league: the NFL uses none, colleges a half-stripe, Canada a full ring. Those bright marks help amateur players spot the ball, and because the three leagues use slightly different sizes, a stripe also tells you at a glance which ball is regulation.",
    storyRo:
      "Fotbalul american este o ramură a rugby-ului britanic pe care colegiile au început să-l joace la sfârșitul anilor 1800 pentru a stabili ce școală e mai bună, așa că primele mingi au copiat pur și simplu mingea de rugby britanică, iar dintre toate mingile aceasta s-a schimbat cel mai puțin, păstrând deliberat un aspect din secolul XIX pe care britanicii înșiși l-au abandonat. Înainte de cauciuc, mingile ușoare erau bășici de porc umflate ca baloanele (originea cuvântului „pigskin”), învelite în piele de vacă și cusute. A.G. Spalding, un fost jucător devenit fondatorul primei mari companii americane de articole sportive, își asumă prima minge de fotbal de masă, în 1887. Cauciucul vulcanizat a înlocuit mai târziu bășicile, dar mingile profesioniste poartă încă piele reală cu șireturile legate manual. Dungile anunță liga: NFL nu folosește niciuna, colegiile o jumătate de dungă, Canada un inel complet.",
    milestones: [
      { year: "Late 1800s", en: "Colleges spin gridiron off British rugby", ro: "Colegiile desprind fotbalul din rugby-ul britanic" },
      { year: "Pre-rubber", en: "The inflated pig bladder, the \"pigskin\"", ro: "Bășica de porc umflată, „pigskin”-ul" },
      { year: "1887", en: "Spalding's first mass-market football", ro: "Prima minge de masă Spalding" },
      { year: "Today", en: "Pro balls still leather, laces tied by hand", ro: "Mingile pro, încă din piele, șireturi legate manual" },
    ],
    facts: [
      { stat: "1887", label: "First mass-market ball", labelRo: "Prima minge de masă" },
      { stat: "#1", label: "Least-changed of the eight", labelRo: "Cea mai puțin schimbată din opt" },
    ],
  },
  {
    key: "basketball",
    name: "Basketball",
    nameRo: "Baschet",
    year: "1894",
    image: C.ballBasketball,
    spalding: true,
    tagline: "A spherical football, dyed orange",
    taglineRo: "Un fotbal sferic, vopsit portocaliu",
    story:
      "James Naismith, a PE teacher at Springfield College, invented basketball in 1891 as a graceful, non-violent game of tossing a ball into a peach basket. It was played first with a leather soccer ball, but the dribbling the players loved kept smushing it out of shape, so in 1894 Naismith asked Spalding for a purpose-built ball. Spalding's answer was essentially a spherical football: a rubber bladder in stitched leather panels, laces and all, engineered to hold its shape through endless dribbling. In the 1940s makers stopped sewing and glued the leather straight onto the bladder, still how NBA balls are made. The black lines are an anachronism marking where the stitches used to be, kept because players say they help grip. Orange came late, coach Tony Hinkle of Butler got Spalding to dye the ball orange in the late 1950s, and the shade rises with amateurism: NBA balls stay nearly brown, cheap ones go neon.",
    storyRo:
      "James Naismith, profesor de sport la Springfield College, a inventat baschetul în 1891 ca un joc grațios, non-violent, de aruncare a mingii într-un coș de piersici. S-a jucat întâi cu o minge de fotbal din piele, dar driblingul iubit de jucători o deforma mereu, așa că în 1894 Naismith i-a cerut lui Spalding o minge făcută anume. Răspunsul lui Spalding a fost, în esență, un fotbal sferic: o bășică de cauciuc în panouri de piele cusute, cu tot cu șireturi, proiectată să-și țină forma la nesfârșit. În anii 1940 producătorii au încetat să coasă și au lipit pielea direct pe bășică, așa cum se fac și azi mingile NBA. Liniile negre sunt un anacronism care marchează unde erau cusăturile. Portocaliul a venit târziu, antrenorul Tony Hinkle de la Butler l-a convins pe Spalding să vopsească mingea portocaliu la sfârșitul anilor 1950, iar nuanța crește cu amatorismul.",
    milestones: [
      { year: "1891", en: "Naismith invents the game at Springfield", ro: "Naismith inventează jocul la Springfield" },
      { year: "1894", en: "Spalding builds the first basketball", ro: "Spalding construiește prima minge de baschet" },
      { year: "1940s", en: "Panels glued, not sewn, the NBA method", ro: "Panouri lipite, nu cusute, metoda NBA" },
      { year: "Late 1950s", en: "Tony Hinkle gets it dyed orange", ro: "Tony Hinkle o face vopsită portocaliu" },
    ],
    facts: [
      { stat: "1891", label: "Invented in Massachusetts", labelRo: "Inventat în Massachusetts" },
      { stat: "1950s", label: "The year it went orange", labelRo: "Deceniul în care a devenit portocalie" },
    ],
  },
  {
    key: "volleyball",
    name: "Volleyball",
    nameRo: "Volei",
    year: "1896",
    image: C.ballVolleyball,
    spalding: true,
    tagline: "The gentle game's ball, still in flux",
    taglineRo: "Mingea jocului blând, încă în schimbare",
    story:
      "William G. Morgan, also at Springfield and inspired by Naismith, wanted a gentler sport anyone could play, so in 1896 he asked Spalding for a ball like Naismith's but softer and lighter, for volleying, not dribbling. Spalding built it from 18 strips of lightweight leather: the first volleyball. White leather gave it contrast against dark Victorian gym walls, but as the game moved to the beach the ball vanished into bright sky and sand, so the 1996 Olympics, the first with beach volleyball as its own sport, debuted a yellow-and-blue ball, and blue/yellow became the pro standard indoors and out. In 2008 the international federation ditched the 18-strip design entirely for new looks (the indoor ball revised again in 2019), which leaves the volleyball the one American ball still visibly changing, and perhaps the hardest to sentimentalize.",
    storyRo:
      "William G. Morgan, tot la Springfield și inspirat de Naismith, voia un sport și mai blând, pe care oricine să-l poată juca, așa că în 1896 i-a cerut lui Spalding o minge ca a lui Naismith, dar mai moale și mai ușoară, pentru pasat, nu driblat. Spalding a construit-o din 18 fâșii de piele ușoară: prima minge de volei. Pielea albă îi dădea contrast pe pereții întunecați ai sălilor victoriene, dar când jocul a trecut pe plajă mingea dispărea în cerul și nisipul strălucitor, așa că Olimpiada din 1996, prima cu volei pe plajă ca sport distinct, a debutat cu o minge galben-albastru, iar galben/albastru a devenit standardul profesionist. În 2008 federația internațională a abandonat complet designul cu 18 fâșii, lăsând voleiul singura minge americană încă în schimbare vizibilă.",
    milestones: [
      { year: "1896", en: "Morgan & Spalding, the 18-strip ball", ro: "Morgan & Spalding, mingea din 18 fâșii" },
      { year: "Indoor era", en: "White, to show against dark gym walls", ro: "Albă, pentru contrast pe pereții sălilor" },
      { year: "1996", en: "Olympics debut the yellow-and-blue ball", ro: "Olimpiada debutează mingea galben-albastru" },
      { year: "2008 · 2019", en: "The 18-strip design retired and revised", ro: "Designul din 18 fâșii, retras și revizuit" },
    ],
    facts: [
      { stat: "1896", label: "The first volleyball", labelRo: "Prima minge de volei" },
      { stat: "18", label: "Original leather strips", labelRo: "Fâșii de piele originale" },
    ],
  },
  {
    key: "baseball",
    name: "Baseball",
    nameRo: "Baseball",
    year: "1876",
    image: C.ballBaseball,
    spalding: true,
    tagline: "White leather America won't let you change",
    taglineRo: "Piele albă pe care America n-o schimbă",
    story:
      "Baseball is a 19th-century offshoot of British cricket, or of the older game of rounders, and the first baseballs were like cricket balls: dark, hard, with a cross-stitched \"lemon peel\" cover. The lighter, sturdier figure-eight stitch we know came later; who invented it is disputed, but Spalding claims 1876, the year before he retired from pro ball, having pitched his final Chicago season with a ball he made himself. The white leather has aged badly in practice, since it blends with the bright sky, but baseball tradition is sacred: changing the ball's color is like adding mushrooms to apple pie, no matter how logical the argument. Bright red stitching is as far as anyone has ever been allowed to compromise.",
    storyRo:
      "Baseball-ul este o ramură din secolul XIX a cricketului britanic, sau a jocului mai vechi numit rounders, iar primele mingi erau ca cele de cricket: închise la culoare, dure, cu o cusătură încrucișată „coajă de lămâie”. Cusătura în formă de opt, mai ușoară și mai rezistentă, a venit mai târziu; cine a inventat-o e disputat, dar Spalding pretinde 1876, anul dinainte să se retragă, după ce a aruncat ultimul sezon la Chicago cu o minge făcută de el. Pielea albă a îmbătrânit prost în practică, fiindcă se confundă cu cerul, dar tradiția baseball-ului e sacră: să schimbi culoarea mingii e ca și cum ai pune ciuperci în plăcinta cu mere. Cusătura roșie aprinsă e singurul compromis permis vreodată.",
    milestones: [
      { year: "19th c.", en: "An offshoot of cricket and rounders", ro: "O ramură din cricket și rounders" },
      { year: "Early", en: "Dark ball, \"lemon peel\" cross-stitch", ro: "Minge închisă, cusătură „coajă de lămâie”" },
      { year: "1876", en: "Spalding claims the figure-eight stitch", ro: "Spalding revendică cusătura în opt" },
      { year: "Since", en: "Red stitching, the only compromise", ro: "Cusătura roșie, singurul compromis" },
    ],
    facts: [
      { stat: "1876", label: "Spalding's figure-eight", labelRo: "Cusătura în opt Spalding" },
      { stat: "White", label: "Kept, by pure tradition", labelRo: "Albă, din pură tradiție" },
    ],
  },
  {
    key: "tennis",
    name: "Tennis",
    nameRo: "Tenis",
    year: "1870s",
    image: C.ballTennis,
    spalding: false,
    tagline: "The neon-yellow Americanism",
    taglineRo: "Americanismul galben-neon",
    story:
      "Tennis is perhaps the oldest continuously played sport in the Western world, it turns up in Renaissance art, Shakespeare and the French Revolution, but the modern \"lawn tennis\" was invented by British reformers in the 1870s, with the first Wimbledon in 1877. Early balls were leather; the reformers wrapped rubber in white flannel for softer, slower play, and engineers later turned the fuzz into a science of aerodynamics and racket control. The stitched seam became a glued-on white line, an anachronism like the basketball's stripes. And the color: American tennis was always more of-the-people than Britain's upper-class version, and in the early 1970s Penn, which had overtaken Spalding as the leading US ball maker, sold bright yellow balls so novices could see them, and they showed up better on TV. The British called neon yellow a vulgar Americanism, but Wimbledon surrendered to it in 1986.",
    storyRo:
      "Tenisul este poate cel mai vechi sport jucat continuu în lumea occidentală, apare în arta Renașterii, la Shakespeare și în Revoluția Franceză, dar „lawn tennis”-ul modern a fost inventat de reformatori britanici în anii 1870, cu primul Wimbledon în 1877. Primele mingi erau din piele; reformatorii au învelit cauciucul în flanel alb pentru un joc mai moale și mai lent, iar inginerii au transformat mai târziu pufozitatea într-o știință a aerodinamicii. Cusătura a devenit o linie albă lipită, un anacronism ca dungile de la baschet. Iar culoarea: tenisul american a fost mereu mai „al poporului” decât versiunea britanică de clasă înaltă, iar la începutul anilor 1970 Penn, care îl depășise pe Spalding, a vândut mingi galbene aprinse pentru vizibilitate și pentru TV. Britanicii au numit galbenul-neon un americanism vulgar, dar Wimbledon a cedat în 1986.",
    milestones: [
      { year: "1870s", en: "British reformers invent lawn tennis", ro: "Reformatorii britanici inventează lawn tennis" },
      { year: "1877", en: "The first Wimbledon tournament", ro: "Primul turneu de la Wimbledon" },
      { year: "Early 1970s", en: "Penn's bright yellow ball for visibility", ro: "Mingea galbenă Penn, pentru vizibilitate" },
      { year: "1986", en: "Wimbledon finally goes yellow", ro: "Wimbledon trece în sfârșit la galben" },
    ],
    facts: [
      { stat: "1877", label: "First Wimbledon", labelRo: "Primul Wimbledon" },
      { stat: "1986", label: "Year yellow won", labelRo: "Anul în care a câștigat galbenul" },
    ],
  },
  {
    key: "golf",
    name: "Golf",
    nameRo: "Golf",
    year: "1908",
    image: C.ballGolf,
    spalding: true,
    tagline: "The dimpled ball, and the shopper's sport",
    taglineRo: "Mingea cu gropițe și sportul cumpărăturilor",
    story:
      "Golf is an ancient European game beloved by 16th-century Scottish aristocrats; it reached America in the late 1800s, the oldest US course reputedly at Foxburg, Pennsylvania (1887), so Pennsylvania helped Americanize two British sports, golf and tennis. Early balls were gutta-percha, a hard rubber-like substance soft enough to carve grooves into for distance. In 1908 Spalding made the last great innovation of his life: the dimpled ball, a soft \"gutty\" core wound in elastic bands under a rubber shell so hard the guillotine couldn't cut it. Players still tinker endlessly with the core. Golf is also the only major sport where players bring their own ball, the PGA permits over a thousand brands, which turned choosing the right one into a multi-billion-dollar industry. Truly the shopper's sport.",
    storyRo:
      "Golful este un joc european străvechi, iubit de aristocrații scoțieni din secolul XVI; a ajuns în America la sfârșitul anilor 1800, cel mai vechi teren fiind, se spune, la Foxburg, Pennsylvania (1887), așa că Pennsylvania a ajutat la americanizarea a două sporturi britanice, golful și tenisul. Primele mingi erau din gutapercă, o substanță dură asemănătoare cauciucului, destul de moale cât să i se sape șanțuri pentru distanță. În 1908 Spalding a făcut ultima mare inovație a vieții sale: mingea cu gropițe, un miez moale înfășurat în benzi elastice sub o coajă de cauciuc. Jucătorii încă modifică la nesfârșit miezul. Golful este și singurul sport major în care jucătorii își aduc propria minge, PGA permite peste o mie de mărci, ceea ce a transformat alegerea într-o industrie de miliarde. Sportul cumpărăturilor.",
    milestones: [
      { year: "16th c.", en: "Scottish aristocrats take up the game", ro: "Aristocrații scoțieni adoptă jocul" },
      { year: "1887", en: "Foxburg, PA, oldest US course", ro: "Foxburg, PA, cel mai vechi teren din SUA" },
      { year: "1908", en: "Spalding's dimpled ball", ro: "Mingea cu gropițe a lui Spalding" },
      { year: "Now", en: "1,000+ brands, the shopper's sport", ro: "Peste 1.000 de mărci, sportul cumpărăturilor" },
    ],
    facts: [
      { stat: "1908", label: "The dimpled ball", labelRo: "Mingea cu gropițe" },
      { stat: "1,000+", label: "PGA-legal ball brands", labelRo: "Mărci de mingi legale PGA" },
    ],
  },
  {
    key: "kickball",
    name: "Kickball",
    nameRo: "Kickball",
    year: "Postwar",
    image: C.ballKickball,
    spalding: false,
    tagline: "A symbol of postwar abundance",
    taglineRo: "Un simbol al abundenței postbelice",
    story:
      "Chronologically the newest ball in the stamp set is the utility ball, the red rubber playground ball, a pure symbol of postwar American abundance. It's a mass-produced consumer object born from the cheap synthetic rubber the US began making during World War II, after the Axis powers cut off the supply of natural rubber. The balls flooded postwar American schools to encourage creative play, and today they're bound up with the great American playground games: four square, dodgeball, bombardment. Nobody quite knows why purpley-red became the iconic color, probably just the shade kids liked best.",
    storyRo:
      "Cronologic, cea mai nouă minge din set este mingea utilitară, mingea roșie de cauciuc de teren de joacă, un simbol pur al abundenței americane postbelice. Este un obiect de consum produs în masă, născut din cauciucul sintetic ieftin pe care SUA a început să-l fabrice în Al Doilea Război Mondial, după ce Puterile Axei au tăiat aprovizionarea cu cauciuc natural. Mingile au inundat școlile americane postbelice pentru a încuraja jocul creativ, iar azi sunt legate de marile jocuri americane de teren de joacă: four square, dodgeball, bombardment. Nimeni nu știe exact de ce roșu-purpuriu a devenit culoarea iconică, probabil doar nuanța preferată de copii.",
    milestones: [
      { year: "WWII", en: "Cheap synthetic rubber is developed", ro: "Se dezvoltă cauciucul sintetic ieftin" },
      { year: "Postwar", en: "Utility balls flood American schools", ro: "Mingile utilitare inundă școlile americane" },
      { year: "Playground", en: "Four square, dodgeball, bombardment", ro: "Four square, dodgeball, bombardment" },
    ],
    facts: [
      { stat: "WWII", label: "Born of synthetic rubber", labelRo: "Născută din cauciuc sintetic" },
      { stat: "Newest", label: "Ball in the stamp set", labelRo: "Cea mai nouă minge din set" },
    ],
  },
  {
    key: "soccer",
    name: "Soccer",
    nameRo: "Fotbal (soccer)",
    year: "1970",
    image: C.ballSoccer,
    spalding: false,
    tagline: "The Telstar, an icon by accident",
    taglineRo: "Telstar-ul, un simbol din întâmplare",
    story:
      "Soccer is the world's most popular sport, the modern game born in Victorian Britain. Early soccer balls, like the first rugby balls, were pig bladders in stitched leather strips, brown or tan, and never quite spherical, the very reason Naismith hated using one for basketball. The breakthrough came in 1970, when Adidas made the ball for the Mexico World Cup: a genuinely spherical structure of 12 black pentagons and 20 white hexagons. The bold black-and-white showed up far better on black-and-white television and earned the ball its name, the Telstar, after the TV satellite it resembled. The Telstar itself was quickly replaced by newer designs, yet its black-and-white pattern has remained the soccer ball of the popular imagination ever since.",
    storyRo:
      "Fotbalul (soccer) este cel mai popular sport din lume, jocul modern născut în Marea Britanie victoriană. Primele mingi, ca și cele de rugby, erau bășici de porc în fâșii de piele cusute, maro sau bej și niciodată perfect sferice, chiar motivul pentru care Naismith ura să le folosească la baschet. Descoperirea a venit în 1970, când Adidas a făcut mingea pentru Cupa Mondială din Mexic: o structură cu adevărat sferică din 12 pentagoane negre și 20 de hexagoane albe. Alb-negrul îndrăzneț se vedea mult mai bine la televizorul alb-negru și i-a adus mingii numele, Telstar, după satelitul TV cu care semăna. Telstar-ul a fost repede înlocuit, dar modelul său alb-negru a rămas de atunci mingea de fotbal din imaginația populară.",
    milestones: [
      { year: "Victorian", en: "The modern game is born in Britain", ro: "Jocul modern se naște în Marea Britanie" },
      { year: "Early", en: "Pig-bladder leather strips, never round", ro: "Fâșii de piele cu bășică, niciodată rotunde" },
      { year: "1970", en: "Adidas Telstar, 12 + 20 panels", ro: "Adidas Telstar, 12 + 20 de panouri" },
      { year: "Since", en: "The black-and-white icon that stuck", ro: "Simbolul alb-negru care a rămas" },
    ],
    facts: [
      { stat: "1970", label: "The Adidas Telstar", labelRo: "Adidas Telstar" },
      { stat: "12 + 20", label: "Pentagons and hexagons", labelRo: "Pentagoane și hexagoane" },
    ],
  },
];

// An extra "worth knowing" aside per ball, the detail that doesn't fit the main story.
const NOTES: Record<string, { en: string; ro: string }> = {
  football: {
    en: "You can buy an all-rubber football for the backyard, but a real NFL game ball is a beautifully made thing, genuine leather, with the laces still stitched and tied entirely by hand.",
    ro: "Poți cumpăra o minge integral din cauciuc pentru curte, dar o minge oficială de NFL este un obiect frumos lucrat, piele veritabilă, cu șireturile încă cusute și legate complet manual.",
  },
  basketball: {
    en: "The orange runs on a sliding scale of seriousness: an NBA ball stays nearly brown, a college ball is a shade brighter, and a bargain-bin ball is an obnoxious neon.",
    ro: "Portocaliul urmează o scală a seriozității: o minge NBA rămâne aproape maro, una de colegiu e o nuanță mai vie, iar una ieftină e un neon strident.",
  },
  volleyball: {
    en: "Because its look keeps changing, the volleyball is the hardest of the eight to sentimentalize, which may be exactly why volleyball culture feels so modest and unbothered by its own lore.",
    ro: "Fiindcă aspectul i se schimbă mereu, voleiul e cea mai greu de sentimentalizat dintre cele opt, poate exact de aceea cultura voleiului pare atât de modestă.",
  },
  baseball: {
    en: "The practical case against white leather is airtight, the ball blends into the bright sky, and it has never once mattered. Baseball tradition doesn't argue back; it simply refuses.",
    ro: "Argumentul practic împotriva pielii albe e imbatabil, mingea se confundă cu cerul, și n-a contat niciodată. Tradiția baseball-ului nu contraargumentează; pur și simplu refuză.",
  },
  tennis: {
    en: "That fuzzy nap isn't decoration. Engineers tune it to a science, shaping how the ball cuts through the air and how it bites into the strings of the racket.",
    ro: "Pufozitatea nu e decor. Inginerii o reglează ca o știință, modelând cum taie mingea aerul și cum se agață de corzile rachetei.",
  },
  golf: {
    en: "Spalding's shell was famously hard, the ad copy claimed even a guillotine couldn't cut it, while the soft wound core underneath is still the part engineers endlessly refine today.",
    ro: "Coaja lui Spalding era faimos de dură, reclama pretindea că nici ghilotina n-o poate tăia, în timp ce miezul moale înfășurat de dedesubt e încă partea pe care inginerii o rafinează la nesfârșit.",
  },
  kickball: {
    en: "Even the industry can't say why purpley-red won. It seems to have simply been the shade kids reached for first, the one green ball in a bin of thirty was always somebody's small rebellion.",
    ro: "Nici industria nu poate spune de ce a câștigat roșul-purpuriu. Pare să fi fost pur și simplu nuanța pe care copiii o luau prima, singura minge verde din treizeci era mereu mica rebeliune a cuiva.",
  },
  soccer: {
    en: "\"Telstar\" was the name of a famous TV satellite of the era, either the ball was a tribute to it, or it just looked like it. Newer balls replaced the Telstar within a few years, yet its pattern never left the popular imagination.",
    ro: "„Telstar” era numele unui satelit TV faimos al epocii, fie mingea era un omagiu, fie doar semăna cu el. Mingi mai noi au înlocuit Telstar-ul în câțiva ani, dar modelul lui n-a părăsit niciodată imaginația populară.",
  },
};

const SPALDING_COUNT = BALLS.filter((b) => b.spalding).length;

export function EightAmericanBalls() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);
  const active = BALLS[sel];

  return (
    <div>
      {/* Stamp-sheet selector */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {BALLS.map((b, i) => {
          const on = i === sel;
          return (
            <button
              key={b.key}
              type="button"
              onClick={() => setSel(i)}
              aria-current={on}
              className="group flex flex-col items-center rounded-xl p-2.5 transition-all duration-300"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#fffdf7" : "rgba(255,253,247,0.5)",
                border: `1px dashed ${on ? "#E8391B" : "rgba(12,9,7,0.2)"}`,
                boxShadow: on ? "0 18px 40px rgb(12,9,7,0.14)" : "0 2px 8px rgb(12,9,7,0.04)",
                transform: on ? "translateY(-4px)" : "none",
              }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src={b.image}
                  alt={ro ? b.nameRo : b.name}
                  fill
                  sizes="200px"
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  style={{ filter: on ? "none" : "grayscale(0.3)" }}
                />
              </div>
              <div className="mt-2.5 flex w-full items-center justify-between px-0.5">
                <span
                  className="font-macro-display text-sm font-black uppercase tracking-tight"
                  style={{ color: on ? "#E8391B" : "#0C0907" }}
                >
                  {ro ? b.nameRo : b.name}
                </span>
                <span className="font-body text-[10px] font-bold tracking-wider text-[#0C0907]/45">{b.year}</span>
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
          {active.spalding && (
            <span className="absolute left-5 top-5 rounded-full bg-[#0C0907]/85 px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#E8B923] backdrop-blur">
              ★ {ro ? "Design Spalding" : "A.G. Spalding design"}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 font-body text-[10px] font-bold uppercase tracking-[0.35em] text-[#E8391B]">
            {ro ? active.taglineRo : active.tagline}
          </p>
          <div className="mb-5 flex items-baseline gap-4">
            <h3 className="font-macro-display text-4xl font-black leading-none tracking-tight text-[#0C0907] md:text-5xl">
              {ro ? active.nameRo : active.name}
            </h3>
            <span className="font-macro-display text-2xl font-black text-[#0C0907]/25">{active.year}</span>
          </div>
          <p className="font-editorial text-[17px] leading-relaxed text-[#0C0907]/75">
            {ro ? active.storyRo : active.story}
          </p>

          {/* Milestone rail */}
          <ol className="mt-7 space-y-0">
            {active.milestones.map((m, i) => (
              <li key={m.year + i} className="relative flex gap-4 pb-4 last:pb-0">
                {i < active.milestones.length - 1 && (
                  <span className="absolute left-[5px] top-3 h-full w-px bg-[#0C0907]/12" aria-hidden />
                )}
                <span className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full bg-[#E8391B] ring-4 ring-[#E8391B]/15" aria-hidden />
                <div>
                  <span className="font-macro-display text-sm font-black uppercase tracking-wide text-[#0C0907]">{m.year}</span>
                  <span className="ml-2 font-body text-sm text-[#0C0907]/60">{ro ? m.ro : m.en}</span>
                </div>
              </li>
            ))}
          </ol>

          {/* Facts */}
          <div className="mt-7 flex flex-wrap gap-8">
            {active.facts.map((f) => (
              <div key={f.label} className="border-l-2 border-[#E8391B]/40 pl-4">
                <div className="font-macro-display text-3xl font-black leading-none text-[#0C0907]">{f.stat}</div>
                <div className="mt-1.5 max-w-[11rem] font-body text-xs text-[#0C0907]/55">{ro ? f.labelRo : f.label}</div>
              </div>
            ))}
          </div>

          {/* Worth knowing */}
          {NOTES[active.key] && (
            <div className="mt-8 rounded-2xl bg-white/55 p-5">
              <p className="mb-1.5 font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8391B]">
                {ro ? "DE ȘTIUT" : "WORTH KNOWING"}
              </p>
              <p className="font-editorial text-[15px] leading-relaxed text-[#0C0907]/70">
                {ro ? NOTES[active.key].ro : NOTES[active.key].en}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Spalding through-line */}
      <div className="mt-12 flex items-center gap-4 rounded-2xl border border-[#0C0907]/10 bg-white/50 px-6 py-5">
        <span className="font-macro-display text-4xl font-black leading-none text-[#E8391B]">{SPALDING_COUNT}/8</span>
        <p className="font-editorial text-sm leading-relaxed text-[#0C0907]/70">
          {ro
            ? "Cinci din cele opt mingi au fost proiectate de o singură companie, a lui A.G. Spalding, jucătorul retras care a fondat prima mare firmă americană de articole sportive. Aproape nimic din canonul sportiv american nu are mai mult de 150 de ani."
            : "Five of the eight balls were shaped by one company, that of A.G. Spalding, the retired ballplayer who founded America's first great sporting-goods firm. Almost nothing in the American sporting canon is more than 150 years old."}
        </p>
      </div>
    </div>
  );
}
