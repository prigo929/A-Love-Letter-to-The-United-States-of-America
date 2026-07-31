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
      "American football grew out of British rugby, which American colleges took up in the late 1800s to settle whose school was better, so the earliest footballs were closely modeled on the British rugby ball. Of all these balls it has changed the least, and its shape is almost deliberately anachronistic, keeping an authentic 19th-century rugby look the British themselves no longer use. Before rubber was common, a lightweight ball was made by inflating a pig's bladder like a balloon, which is where the old cliché of the \"pigskin\" comes from, then covering that delicate bladder in the hide of a second animal, usually cow leather, and stitching it shut. A.G. Spalding, an Illinois ballplayer who retired in 1877 and founded the first major American sporting-goods company, spent the rest of his life making himself a fixture of every new American sport being invented, and his firm still takes credit for the first mass-market football, in 1887. As vulcanized rubber spread, the pig bladders gave way to stronger, cleaner rubber ones, and you can now buy a football made entirely of rubber, though the real professional-grade balls keep an outer cover of genuine leather. The clearest change since the early days is the striping: NFL balls carry none, college balls a half-stripe, Canadian balls a full ring. The bright stripes were meant to help players in the more amateur leagues see the ball, and because the three leagues use slightly different sizes, a stripe also shows at a glance which ball is regulation.",
    storyRo:
      "Fotbalul american a apărut din rugby-ul britanic, pe care colegiile americane l-au preluat la sfârșitul anilor 1800 ca să stabilească a cui școală e mai bună, așa că primele mingi au fost modelate îndeaproape după mingea de rugby britanică. Dintre toate mingile s-a schimbat cel mai puțin, iar forma ei e aproape deliberat anacronică, păstrând un aspect autentic de rugby din secolul XIX pe care britanicii înșiși nu-l mai folosesc. Înainte ca acest lucru să fie obișnuit, o minge ușoară se făcea umflând o bășică de porc ca un balon, de unde vine vechiul clișeu al „pigskin”-ului, apoi acoperind acea bășică delicată cu pielea unui al doilea animal, de obicei piele de vacă, și cusând-o. A.G. Spalding, un jucător din Illinois care s-a retras în 1877 și a fondat prima mare companie americană de articole sportive, și-a petrecut restul vieții făcându-se nelipsit din fiecare sport american nou inventat, iar firma sa își asumă și azi prima minge de fotbal de masă, în 1887. Pe măsură ce cauciucul vulcanizat s-a răspândit, bășicile de porc au făcut loc unora de cauciuc mai rezistente și mai curate, iar acum poți cumpăra o minge făcută integral din cauciuc, deși mingile profesioniste păstrează o învelitoare exterioară din piele veritabilă. Cea mai clară schimbare de la început este dungajul: mingile NFL nu au niciuna, cele de colegiu o jumătate de dungă, cele canadiene un inel complet. Dungile aprinse au fost menite să-i ajute pe jucătorii din ligile mai amatoare să vadă mingea, iar fiindcă cele trei ligi folosesc mărimi ușor diferite, o dungă arată și dintr-o privire ce minge e regulamentară.",
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
      "The late 1800s saw a burst of new American sports invented by physical-education teachers caught up in Victorian ideas about building character, almost an arms race to design the game that best improved the American man. James Naismith, a PE teacher at Springfield College in Massachusetts, won it in 1891 with basketball, an elegant, non-violent game of gracefully throwing a ball into a peach basket. It was played first with a leather soccer ball, but the dribbling the players loved, over Naismith's objections, kept smushing the ball out of shape, so in 1894 Naismith went to Spalding in Chicago and asked him to design a proper ball. What Spalding produced was essentially a spherical football, a rubber bladder inside a shell of stitched-together leather slices with the laces on the front, and his real genius was knowing how to sew the panels so the ball held its shape through endless dribbling. In the 1940s makers stopped sewing and simply glued the leather slices straight onto the bladder, still how NBA-grade balls are made today. The black lines are an anachronism marking where the stitches used to run, kept around because players say they help them grip. Basketballs and footballs were the same color at first, both being leather, until the legendary Butler University coach Tony Hinkle got Spalding to start dyeing the balls orange in the late 1950s.",
    storyRo:
      "Sfârșitul anilor 1800 a adus o explozie de sporturi americane noi inventate de profesori de educație fizică prinși în ideile victoriene despre formarea caracterului, aproape o cursă a înarmării pentru a proiecta jocul care îl îmbunătățea cel mai bine pe omul american. James Naismith, profesor de sport la Springfield College din Massachusetts, a câștigat-o în 1891 cu baschetul, un joc elegant și non-violent de aruncare grațioasă a mingii într-un coș de piersici. S-a jucat întâi cu o minge de fotbal din piele, dar driblingul iubit de jucători, în ciuda protestelor lui Naismith, deforma mereu mingea, așa că în 1894 Naismith a mers la Spalding în Chicago și i-a cerut o minge potrivită. Ce a produs Spalding era, în esență, un fotbal sferic, o bășică de cauciuc într-o coajă din felii de piele cusute, cu șireturile în față, iar adevăratul lui geniu era să știe cum să coasă panourile astfel încât mingea să-și țină forma la nesfârșit. În anii 1940 producătorii au încetat să coasă și au lipit pur și simplu feliile de piele direct pe bășică, așa cum se fac și azi mingile NBA. Liniile negre sunt un anacronism care marchează unde erau cusăturile, păstrate fiindcă jucătorii spun că îi ajută la prindere. Mingile de baschet și de fotbal aveau la început aceeași culoare, ambele din piele, până când legendarul antrenor Tony Hinkle de la Butler l-a convins pe Spalding să înceapă să le vopsească portocaliu la sfârșitul anilor 1950.",
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
      "Also at Springfield College was a younger man named William G. Morgan, who admired Naismith and wanted a sport of his own, only gentler, something even older people could play. In 1896 he asked Spalding for a ball like Naismith's but softer and lighter, since his players would bat it back and forth by hand rather than dribble it. He figured he would call the game \"Mintonette\" or something, the name being beside the point. Spalding came back with a ball of 18 strips of very lightweight leather, the first volleyball, and for its first hundred years it barely changed. Volleyball was played mostly indoors, so white leather gave the ball contrast against the dark walls of a typical Victorian gymnasium. As the game moved outdoors into a beach sport in the second half of the 20th century, players complained the white ball vanished into the bright summer sky and pale sand, so the 1996 Summer Olympics, the first to feature beach volleyball as its own sport, used a yellow-and-blue ball that proved a big hit, and blue and yellow have been the standard colors of professional volleyballs, indoor and out, ever since. In 2008 the international federation drifted even further from Spalding's original, officially rejecting the 18-strip design for two new looks, with the indoor ball revised again in 2019, which leaves the volleyball the one American ball whose design is still visibly in flux.",
    storyRo:
      "Tot la Springfield College era și un tânăr pe nume William G. Morgan, care îl admira pe Naismith și voia un sport al lui, doar mai blând, ceva pe care să-l poată juca și oamenii mai în vârstă. În 1896 i-a cerut lui Spalding o minge ca a lui Naismith, dar mai moale și mai ușoară, fiindcă jucătorii lui aveau s-o paseze cu mâna, nu s-o dribleze. Se gândea că va numi jocul „Mintonette” sau ceva, numele fiind lipsit de importanță. Spalding a revenit cu o minge din 18 fâșii de piele foarte ușoară, prima minge de volei, iar în primii ei o sută de ani abia s-a schimbat. Voleiul se juca mai ales în interior, așa că pielea albă îi dădea contrast pe pereții întunecați ai unei săli victoriene tipice. Când jocul a trecut afară, într-un sport de plajă, în a doua jumătate a secolului XX, jucătorii s-au plâns că mingea albă dispărea în cerul de vară strălucitor și nisipul palid, așa că Olimpiada din 1996, prima cu volei pe plajă ca sport distinct, a folosit o minge galben-albastru care a fost un mare succes, iar galben și albastru sunt de atunci culorile standard ale mingilor profesioniste, în interior și afară. În 2008 federația internațională s-a îndepărtat și mai mult de originalul lui Spalding, respingând oficial designul din 18 fâșii pentru două aspecte noi, cu mingea de interior revizuită din nou în 2019, ceea ce lasă voleiul singura minge americană al cărei design e încă vizibil în schimbare.",
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
      "Baseball is a 19th-century offshoot of British cricket, or of the older, obscure game of rounders, in the same way football came from rugby, so the first baseballs were much like cricket balls: dark and hard, with a distinctive cross-stitched cover sometimes called the \"lemon peel\" design. The lighter, more structurally sound figure-eight stitch we know today came later, and there is real dispute over who invented it, when and where, but Spalding claims 1876, and that is good enough for most people. That year is actually a year before Spalding retired from professional baseball, which his company openly acknowledges: in his final season pitching for Chicago, the great man threw every game with a ball he had developed himself. Whoever chose it, the white leather has aged badly on the merits, since the ball blends into the bright sky, but people are fiercely protective of baseball tradition in a way they simply are not with volleyball. Changing the color is like adding mushrooms to apple pie, and no matter how calm and logical the argument, it will not happen. Bright red stitching is about as far as anyone has ever been willing to compromise.",
    storyRo:
      "Baseball-ul este o ramură din secolul XIX a cricketului britanic, sau a jocului mai vechi și obscur numit rounders, la fel cum fotbalul a venit din rugby, așa că primele mingi semănau mult cu cele de cricket: închise la culoare și dure, cu o cusătură încrucișată distinctivă numită uneori „coajă de lămâie”. Cusătura în formă de opt, mai ușoară și mai solidă, pe care o știm azi, a venit mai târziu, iar există o dispută reală despre cine a inventat-o, când și unde, dar Spalding pretinde 1876, iar asta e de ajuns pentru majoritatea. Anul acela e de fapt cu un an înainte ca Spalding să se retragă din baseball-ul profesionist, lucru pe care compania sa îl recunoaște deschis: în ultimul sezon la Chicago, marele om a aruncat fiecare meci cu o minge dezvoltată de el însuși. Oricine a ales-o, pielea albă a îmbătrânit prost pe fond, fiindcă mingea se confundă cu cerul strălucitor, dar oamenii apără cu îndârjire tradiția baseball-ului cum pur și simplu n-o fac cu voleiul. Să schimbi culoarea e ca și cum ai pune ciuperci în plăcinta cu mere, iar oricât de calm și logic ar fi argumentul, nu se va întâmpla. Cusătura roșie aprinsă e cam tot ce a fost cineva dispus vreodată să cedeze.",
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
      "Tennis may be the oldest continuously played sport in the Western world, turning up in Renaissance art, in Shakespeare, and around the French Revolution, but the modern \"lawn tennis\" we know was invented by British reformers in the 1870s, with the first great tournament held at Wimbledon in 1877. Early balls were leather, like nearly every sports ball of the day, until the reformers hit on wrapping rubber in white flannel for softer, slower play, and later engineers turned the fuzz into a science that maximizes aerodynamics and racket control. The flannel was first stitched on in a figure-eight like the baseball's, but today it is simply glued, and the little white lines are an anachronism much like the black lines on the basketball. The British style caught on fast in America, where the US Open was established in 1881, but American tennis was always a bit more of-the-people than the upper-class British game. In the early 1970s the Pennsylvania company Penn, by then America's leading tennis-ball maker ahead of Spalding, began selling bright yellow and orange balls that novices could see more easily and that showed up better on television. The British saw the neon yellow, which soon became the best-selling color, as a vulgar Americanism cheapening their sport. Wimbledon put up quite a fight, but admitted defeat and went yellow in 1986.",
    storyRo:
      "Tenisul e poate cel mai vechi sport jucat continuu în lumea occidentală, apărând în arta Renașterii, la Shakespeare și în jurul Revoluției Franceze, dar „lawn tennis”-ul modern pe care îl știm a fost inventat de reformatori britanici în anii 1870, cu primul mare turneu ținut la Wimbledon în 1877. Primele mingi erau din piele, ca aproape orice minge de sport a vremii, până când reformatorii au avut ideea de a înveli cauciucul în flanel alb pentru un joc mai moale și mai lent, iar mai târziu inginerii au transformat pufozitatea într-o știință care maximizează aerodinamica și controlul rachetei. Flanelul a fost cusut întâi în formă de opt, ca la baseball, dar azi e pur și simplu lipit, iar liniuțele albe sunt un anacronism ca liniile negre de la baschet. Stilul britanic a prins repede în America, unde US Open a fost înființat în 1881, dar tenisul american a fost mereu ceva mai „al poporului” decât jocul britanic de clasă înaltă. La începutul anilor 1970 compania Penn din Pennsylvania, până atunci principalul producător american de mingi de tenis, înaintea lui Spalding, a început să vândă mingi galben-aprins și portocalii pe care începătorii le vedeau mai ușor și care apăreau mai bine la televizor. Britanicii au văzut galbenul-neon, care a devenit curând culoarea cea mai vândută, ca pe un americanism vulgar care le ieftinea sportul. Wimbledon a dat o luptă serioasă, dar a recunoscut înfrângerea și a trecut la galben în 1986.",
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
      "Golf is an ancient European game of unclear origin that became beloved by Scottish aristocrats in the 16th century, and it reached America during the late-1800s sports boom, the oldest US course reputedly the one at the Foxburg Country Club in Foxburg, Pennsylvania, founded in 1887. So Pennsylvania can claim a hand in Americanizing not one but two British sports, golf and tennis. Early golf balls of that era were made of gutta-percha, a hard rubber-like substance still soft enough that grooves could be carved into it to make the ball more aerodynamic and fly farther. In 1908 Spalding made the last major sporting innovation of his life, releasing the dimpled-surface golf ball, a soft gutty core wound in elastic bands and encased in a rubber coating so hard, the copy claimed, that even a guillotine could not cut it. That basic design is still with us, though golf, like volleyball, keeps refining the precise details, especially what goes in the core. Golf is also the only major sport where players are expected to bring their own balls, with the PGA permitting well over a thousand brands, which is why choosing the right ball for your game is part of being a sophisticated golfer, and why selling hyper-specific, often very expensive balls became a multi-billion-dollar industry. Truly the shopper's sport.",
    storyRo:
      "Golful este un joc european străvechi, de origine neclară, care a devenit iubit de aristocrații scoțieni în secolul XVI, și a ajuns în America în timpul avântului sportiv de la sfârșitul anilor 1800, cel mai vechi teren din SUA fiind, se spune, cel de la Foxburg Country Club din Foxburg, Pennsylvania, înființat în 1887. Așa că Pennsylvania poate revendica un rol în americanizarea nu a unuia, ci a două sporturi britanice, golful și tenisul. Primele mingi de golf ale acelei epoci erau din gutapercă, o substanță dură asemănătoare cauciucului, totuși destul de moale cât să i se sape șanțuri care făceau mingea mai aerodinamică și o făceau să zboare mai departe. În 1908 Spalding a făcut ultima mare inovație sportivă a vieții sale, lansând mingea de golf cu suprafață cu gropițe, un miez moale înfășurat în benzi elastice și închis într-o coajă de cauciuc atât de dură, pretindea reclama, încât nici ghilotina n-o putea tăia. Acel design de bază e încă cu noi, deși golful, ca și voleiul, tot rafinează detaliile precise, mai ales ce se pune în miez. Golful este și singurul sport major în care se așteaptă ca jucătorii să-și aducă propriile mingi, PGA permițând mult peste o mie de mărci, motiv pentru care alegerea mingii potrivite face parte din a fi un golfist rafinat, iar vânzarea de mingi hiper-specifice, adesea foarte scumpe, a devenit o industrie de miliarde. Sportul cumpărăturilor.",
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
      "Chronologically the newest ball in the stamp set is the one they call a kickball, though it is more properly a utility ball, and it is basically a symbol of postwar American decadence. It is a mass-produced consumer object that reflects the flood of cheap synthetic rubber the country first began making during World War II, when the Axis powers cut off its supply of natural rubber. After the war these utility balls poured into American schools, where they were used to promote creative play, and today they are tied to the iconic American playground games: four square, dodgeball, bombardment. Nobody quite knows how purpley-red became the most iconic color. It was probably just the shade kids liked best, though there is always the one kid who insists on the single green ball in the bin.",
    storyRo:
      "Cronologic, cea mai nouă minge din set este cea pe care o numesc kickball, deși mai corect este o minge utilitară, și e practic un simbol al decadenței americane postbelice. Este un obiect de consum produs în masă care reflectă valul de cauciuc sintetic ieftin pe care țara a început să-l fabrice în Al Doilea Război Mondial, când Puterile Axei i-au tăiat aprovizionarea cu cauciuc natural. După război aceste mingi utilitare au inundat școlile americane, unde erau folosite pentru a promova jocul creativ, iar azi sunt legate de jocurile iconice americane de teren de joacă: four square, dodgeball, bombardment. Nimeni nu știe exact cum a devenit roșu-purpuriu cea mai iconică culoare. Probabil doar nuanța preferată de copii, deși există mereu copilul care insistă pe singura minge verde din coș.",
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
      "Soccer is the most popular sport in the world outside this continent, the modern game born in Victorian Britain and carried around the globe. Like the early rugby balls, the first soccer balls were pig bladders encased in leather, made of strips stitched together and usually a natural brown or tan, and a persistent problem was that they were never as perfectly spherical as people wanted, the very reason Naismith hated using one for basketball. After decades of fiddling, the breakthrough came in 1970, when the German firm Adidas was commissioned to make the game ball for the World Cup in Mexico. It came up with a genuinely spherical structure of 12 black pentagons and 20 white hexagons, and the bold black-and-white showed up far better on black-and-white television, earning the ball the nickname Telstar, either after the famous TV satellite of the day or simply because it looked like it. The Telstar itself did not have a long run and was soon displaced by a similar Adidas design, yet that black-and-white look has somehow remained the most iconic soccer ball in the popular imagination, at least the American one.",
    storyRo:
      "Fotbalul (soccer) este cel mai popular sport din lume în afara acestui continent, jocul modern născut în Marea Britanie victoriană și dus în toată lumea. Ca și primele mingi de rugby, primele mingi de fotbal erau bășici de porc învelite în piele, făcute din fâșii cusute și de obicei într-un maro sau bej natural, iar o problemă persistentă era că nu erau niciodată atât de perfect sferice pe cât își doreau oamenii, chiar motivul pentru care Naismith ura să folosească una la baschet. După decenii de tatonări, descoperirea a venit în 1970, când firma germană Adidas a fost însărcinată să facă mingea oficială pentru Cupa Mondială din Mexic. A venit cu o structură cu adevărat sferică din 12 pentagoane negre și 20 de hexagoane albe, iar alb-negrul îndrăzneț se vedea mult mai bine la televizorul alb-negru, aducându-i mingii porecla Telstar, fie după faimosul satelit TV al vremii, fie pur și simplu fiindcă semăna cu el. Telstar-ul în sine nu a avut o viață lungă și a fost curând înlocuit de un design Adidas similar, dar acel aspect alb-negru a rămas cumva cea mai iconică minge de fotbal din imaginația populară, cel puțin cea americană.",
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
    en: "According to a fine book called The Secret History of Balls, there is considerable dispute over who first sewed the figure-eight cover, and where. Spalding's claim of 1876 is really just the version that stuck.",
    ro: "Potrivit unei cărți bune numite The Secret History of Balls, există o dispută considerabilă despre cine a cusut prima dată învelitoarea în opt, și unde. Revendicarea lui Spalding din 1876 e doar versiunea care a rămas.",
  },
  tennis: {
    en: "Wimbledon, the most tradition-bound tournament in the sport, held out against the yellow ball for years before giving in, long after the American public and US television had already made it the best-selling color.",
    ro: "Wimbledon, cel mai legat de tradiție turneu din sport, a rezistat ani la rând mingii galbene înainte de a ceda, mult după ce publicul american și televiziunea din SUA o făcuseră deja culoarea cea mai vândută.",
  },
  golf: {
    en: "Golf is the rare sport with no standard ball at all. Every other game hands you one; golf lets you choose from more than a thousand approved models, each tuned for a different swing, which is exactly what turned buying balls into a serious hobby.",
    ro: "Golful e rarul sport fără nicio minge standard. Orice alt joc îți dă una; golful te lasă să alegi dintre peste o mie de modele aprobate, fiecare reglat pentru alt tip de lovitură, exact ce a transformat cumpărarea mingilor într-un hobby serios.",
  },
  kickball: {
    en: "The utility ball is the only entry in the set with no inventor and no brand pedigree. It is pure infrastructure of the American childhood, the ball that was simply always there in the gym-class bin.",
    ro: "Mingea utilitară e singura intrare din set fără inventator și fără pedigree de marcă. E pură infrastructură a copilăriei americane, mingea care pur și simplu era mereu acolo, în coșul de la ora de sport.",
  },
  soccer: {
    en: "The odd part is that the black-and-white ball fixed in everyone's mind was one of the shortest-lived designs. Newer balls took over within a few years, yet the cartoon soccer ball, the emoji, the one a child draws, is still the 1970 pattern.",
    ro: "Partea ciudată e că mingea alb-negru fixată în mintea tuturor a fost unul dintre cele mai scurte designuri. Mingi mai noi au preluat în câțiva ani, dar mingea de fotbal din desene, emoji-ul, cea pe care o desenează un copil, e tot modelul din 1970.",
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
