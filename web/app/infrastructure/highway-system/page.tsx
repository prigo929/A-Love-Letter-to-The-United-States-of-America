// ─── The Interstate Highway Network ───────────────────────────────────────────
// A deep-dive subpage: the 1919 convoy, the 1956 Act, and an interactive map of
// the corridors — from the named trails of 1913 to the finished System.

import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import type { Locale } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/server";
import {
  MacroStyles,
  MacroHero,
  MacroStat,
  MacroFact,
  InfrastructureBand,
  CountUp,
} from "@/components/shared/CinematicSystem";
import { NetworkMap } from "@/components/infrastructure/NetworkMap";
import { AnatomyDiagram } from "@/components/infrastructure/AnatomyDiagram";
import { InterchangeTypology } from "@/components/infrastructure/InterchangeTypology";
import { SerifLede, Reveal } from "@/components/infrastructure/InfraMotion";
import {
  HIGHWAY_ERAS,
  HIGHWAY_ROUTES,
  HIGHWAY_NODES,
} from "@/lib/data/infrastructure-network-data";
import { SITE_IMAGES } from "@/lib/site-images";

const getPageMetadata = (locale: Locale) => ({
  title:
    locale === "ro"
      ? "Rețeaua de Autostrăzi Interstatale | Infrastructură"
      : "The Interstate Highway Network | Infrastructure",
  description:
    locale === "ro"
      ? "47.856 de mile de autostradă fără semafoare: convoiul din 1919, legea din 1956 și harta interactivă a coridoarelor care au recablat un continent."
      : "47,856 miles of freeway without a single traffic light: the 1919 convoy, the 1956 Act, and an interactive map of the corridors that rewired a continent.",
  alternates: { canonical: "/infrastructure/highway-system" },
});

export async function generateMetadata() {
  const locale = await getServerLocale();
  return getPageMetadata(locale);
}

export default async function HighwaySystemPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";

  const copy = isRo
    ? {
        breadcrumbSection: "Infrastructură",
        breadcrumbPage: "Autostrăzile Interstatale",
        heroEyebrow: "Rețeaua de Autostrăzi Interstatale",
        heroLead: "47,856 DE MILE.",
        heroAccent: "ZERO SEMAFOARE.",
        heroBody:
          "Cel mai mare proiect de lucrări publice din istoria omenirii: o rețea de autostrăzi cu acces controlat care traversează fiecare stat, urcă Munții Stâncoși la 3.401 metri și nu se oprește niciodată la o intersecție.",
        heroStats: [
          { value: "1956", label: "legea semnată de Eisenhower" },
          { value: "3,020 mi", label: "cea mai lungă rută — I-90" },
          { value: "25.9%", label: "din milele parcurse de vehicule în SUA, 2024" },
        ],
        lede: "Înainte de a exista Sistemul, traversarea Americii cu mașina era o expediție. După el, a devenit un drept.",
        storyTitle: "De la noroi la autostradă",
        storyP1:
          "În vara lui 1919, Armata SUA a trimis un convoi motorizat de la Washington la San Francisco, ca să afle cât durează traversarea propriei țări. Răspunsul: 62 de zile. Camioanele s-au scufundat în noroi până la osii, au rupt poduri de lemn și au avansat, în medie, cu viteza unui om la pas. Printre ofițerii convoiului se afla un tânăr locotenent-colonel pe nume Dwight D. Eisenhower.",
        storyP2:
          "Un sfert de secol mai târziu, același om a văzut autostrăzile Germaniei — și, ca președinte, a semnat în 1956 Federal-Aid Highway Act: guvernul federal plătea 90% din costuri, dintr-un fond alimentat de taxa pe benzină, iar statele construiau. Patruzeci de ani mai târziu, harta Americii fusese redesenată.",
        bandAlt: "Construcția autostrăzilor interstatale, anii 1950",
        bandTitle: "90% federal, 100% continental",
        bandP1:
          "Formula din 1956 a fost geniul politic al Sistemului: niciun stat nu-și permitea să refuze nouă dolari federali pentru fiecare dolar propriu. Banii veneau din taxa pe combustibil — șoferii au plătit drumurile pe care le foloseau, milă cu milă.",
        bandP2:
          "Standardele erau nenegociabile: benzi de 3,65 metri, curbe proiectate pentru viteză susținută, acces doar prin bretele. De la Miami la Seattle, aceeași geometrie.",
        mapEyebrow: "Harta interactivă",
        mapTitle: "Coridoarele continentului",
        mapBody:
          "Comută între drumurile cu nume de dinainte de 1926 și Sistemul Interstatal care le-a înlocuit. Întreaga rețea primară este desenată din geometria oficială FHWA — atinge orice linie, nu doar coridoarele evidențiate, pentru lungimea și traficul ei real.",
        trafficSource:
          "Sursă trafic: FHWA Highway Statistics 2024, Table VM-1. Interstatalele au transportat 854,4 miliarde mile-vehicul în 2024 — 271,8 miliarde rural + 582,6 miliarde urban — adică 25,9% din totalul SUA. Harta de căldură folosește media zilnică anuală a traficului (AADT) pe segmente din datele FHWA National Highway System.",
        trafficSourceHref: "https://www.fhwa.dot.gov/policyinformation/statistics/2024/vm1.cfm",
        mapLabels: {
          eraLabel: "Alege epoca",
          corridorsLabel: "Treci peste un coridor pentru detalii — orice linie de pe hartă e interactivă",
          lengthLabel: "Lungime",
          openedLabel: "Perioadă",
          hint: "Traseele urmează geometria oficială FHWA. Apropie harta pentru detalii.",
          trafficLabel: "Trafic mediu zilnic",
          vehiclesPerDay: "veh/zi",
          zoomHint: "Zoom: butoane, pinch sau Ctrl + scroll · trage pentru a naviga",
          viewCorridors: "Coridoare",
          viewTraffic: "Trafic",
          heatLow: "Liniștit",
          heatHigh: "Aglomerat",
        },
        pullStat: "1.16%",
        pullLabel:
          "din lungimea drumurilor publice ale Americii este autostradă interstatală — dar duce 25,9% din toate milele parcurse de vehicule, conform FHWA 2024.",
        engineeringEyebrow: "Regulile jocului",
        engineeringTitle: "Ingineria din spatele libertății",
        stats: [
          { value: "12 ft", label: "lățimea standard a fiecărei benzi" },
          { value: "11,158 ft", label: "punctul maxim — Tunelul Eisenhower, I-70" },
          { value: "0", label: "semafoare pe întregul sistem" },
        ],
        facts: [
          {
            fact: "Numerele spun povestea",
            detail:
              "Rutele pare merg est–vest, cele impare nord–sud. Multiplii lui 10 sunt arterele transcontinentale; cifrele din față indică ocolitoare și radiale. Harta se citește singură.",
          },
          {
            fact: "Ultima milă a fost cea mai grea",
            detail:
              "Glenwood Canyon, Colorado: 12 mile de viaducte suspendate deasupra râului Colorado, terminate abia în 1992 — porțiunea finală a Sistemului și, probabil, cea mai frumoasă autostradă din lume.",
          },
        ],
        numbersEyebrow: "Amploarea, în cifre",
        numbersTitle: "Un continent, în cifre",
        costStats: [
          { value: "$114B", label: "cost de construcție (≈$600 mld. azi)" },
          { value: "40 ani", label: "de la primul contract la ultima milă" },
          { value: "55,000", label: "poduri · 47.856 mile de rute" },
        ],
        decoderTitle: "Cum să citești un scut interstatal",
        decoderItems: [
          { k: "Numere pare", v: "merg est–vest (I-10, I-90)" },
          { k: "Numere impare", v: "merg nord–sud (I-5, I-95)" },
          { k: "Multipli de 5", v: "sunt arterele transcontinentale majore" },
          { k: "Trei cifre", v: "sunt centuri și ramificații urbane (I-610, I-495)" },
        ],
        mythLabel: "MIT",
        mythText:
          "„Una din cinci mile trebuie să fie dreaptă, ca pistă de aterizare de urgență.” Fals — este o legendă urbană. Niciun standard federal nu a cerut vreodată acest lucru.",
        quirksTitle: "Ciudățeniile numerotării",
        quirksItems: [
          {
            k: "Nu există I-50, nici I-60",
            v: "Grila le sare intenționat. O I-50 sau o I-60 ar merge alături de U.S. 50 și U.S. 60 prin aceleași state, iar numere identice pe un drum federal și pe o interstatală au fost considerate o rețetă sigură pentru confuzie.",
          },
          {
            k: "Ruta care se desparte: I-35E și I-35V",
            v: "I-35 este singura rută primară care se bifurcă în două, și nu o dată, ci de două ori — în jurul aglomerării Dallas–Fort Worth și al orașelor gemene Minneapolis–Saint Paul — ca niciunul dintre orașe să nu-l revendice pe celălalt. Apoi se reunește.",
          },
          {
            k: "Numerele din trei cifre se repetă",
            v: "Rutele auxiliare se resetează de la un oraș la altul. Există mai multe I-495, I-465 și I-610 în toată țara, fiindcă o centură trebuie să fie unică doar în propriul oraș, nu la nivel național.",
          },
        ],
        econEyebrow: "Copiii autostrăzii",
        econTitle: "Drumul care a construit o economie",
        econIntro:
          "Autostrada nu a mutat doar mașini — a dat naștere unor industrii întregi, apărute chiar la capătul rampei de ieșire.",
        econItems: [
          { year: "1952", name: "Holiday Inn", text: "Primul lanț hotelier standardizat s-a născut din frustrarea unei singure călătorii de familie. Camere identice, previzibile, la fiecare ieșire de autostradă." },
          { year: "1975", name: "Drive-thru-ul McDonald's", text: "Prima fereastră drive-thru a apărut lângă o bază militară din Arizona — apoi a colonizat fiecare ieșire de autostradă din America." },
          { year: "—", name: "Popasul rutier", text: "Pilot Flying J, Love's și TA au construit orașe-oază pentru cei 3,5 milioane de camionagii — combustibil, mâncare și dușuri, non-stop." },
          { year: "1971", name: "FedEx & UPS", text: "Livrarea peste noapte a devenit posibilă doar pentru că un camion putea traversa un stat întreg fără să oprească la un semafor." },
        ],
        unfinishedEyebrow: "Drumurile care nu au fost",
        unfinishedTitle: "Autostrăzile neterminate",
        unfinishedIntro:
          "Nu toate liniile de pe hărțile din anii 1950 au fost construite. Revoltele orașelor și geografia au lăsat fantome pe hartă.",
        unfinishedItems: [
          { name: "Westway (I-478), New York", text: "O autostradă îngropată de-a lungul râului Hudson, anulată în 1985 după un deceniu de procese. Banii au fost redirecționați către metroul din New York." },
          { name: "Embarcadero Freeway, San Francisco", text: "O autostradă suspendată pe malul golfului, atât de nedorită încât orașul a demolat-o după cutremurul din 1989 — și nu a reconstruit-o niciodată." },
          { name: "Breșa I-95 din New Jersey", text: "Somerset Freeway a fost anulată, lăsând I-95 fără o verigă timp de decenii. Legătura finală s-a deschis abia în 2018." },
        ],
        defenseTitle: "Securitatea Națională și Mitul Pistelor de Aterizare",
        defenseP: "Denumit oficial Sistemul Național Dwight D. Eisenhower de Autostrăzi Interstatale și de Apărare, rețeaua a fost concepută având securitatea națională ca pilon central. Inspirat de experiența lui Eisenhower cu autostrăzile germane (Autobahn) din al Doilea Război Mondial, sistemul a fost creat pentru mobilizarea rapidă a forțelor militare. Podurile au fost construite cu o înălțime liberă de minimum 16 picioare (4,87 metri) special pentru a permite transportul rachetelor balistice intercontinentale (ICBM) și al vehiculelor militare grele. Deși credința populară conform căreia „una din cinci mile trebuie să fie dreaptă pentru a servi ca pistă de aterizare de urgență” este un mit urban, armata SUA a efectuat exerciții de aterizare a avioanelor de luptă pe secțiuni de autostradă, demonstrând capacitatea strategică a rețelei în caz de criză.",
        quote:
          "Mai mult decât orice altă acțiune a guvernului de la sfârșitul războiului încoace, aceasta avea să schimbe fața Americii.",
        quoteAttribution: "Dwight D. Eisenhower",
        quoteTitle: "Al 34-lea Președinte — despre Sistemul Interstatal",
        prevLink: "↑ Prezentare Infrastructură",
        nextLink: "Rețeaua Feroviară Continentală →",
      }
    : {
        breadcrumbSection: "Infrastructure",
        breadcrumbPage: "The Interstate Highways",
        heroEyebrow: "The Interstate Highway Network",
        heroLead: "47,856 MILES.",
        heroAccent: "ZERO STOPLIGHTS.",
        heroBody:
          "The largest public works project in human history: a controlled-access freeway network that crosses every state, crests the Rockies at 11,158 feet, and never once stops for an intersection.",
        heroStats: [
          { value: "1956", label: "the Act signed by Eisenhower" },
          { value: "3,020 mi", label: "the longest route — I-90" },
          { value: "25.9%", label: "of U.S. vehicle-miles, 2024" },
        ],
        lede: "Before the System, crossing America by car was an expedition. After it, crossing America became a birthright.",
        storyTitle: "From Mud to Motorway",
        storyP1:
          "In the summer of 1919, the U.S. Army sent a motor convoy from Washington to San Francisco to find out how long it took to cross its own country. The answer: 62 days. Trucks sank to their axles in mud, broke through timber bridges, and averaged roughly walking pace. Among the convoy's officers was a young lieutenant colonel named Dwight D. Eisenhower.",
        storyP2:
          "A quarter-century later the same man saw Germany's autobahns — and as President signed the Federal-Aid Highway Act of 1956: Washington would pay 90 cents of every construction dollar out of a trust fund fed by the gas tax, and the states would build. Forty years later, the map of America had been redrawn.",
        bandAlt: "Interstate highway construction, 1950s",
        bandTitle: "90% Federal, 100% Continental",
        bandP1:
          "The 1956 formula was the System's political genius: no state could afford to refuse nine federal dollars for every one of its own. The money came from the fuel tax — drivers paid for the roads as they drove them, mile by mile.",
        bandP2:
          "The standards were non-negotiable: twelve-foot lanes, curves engineered for sustained speed, entry only by ramp. From Miami to Seattle, the same geometry.",
        mapEyebrow: "The Interactive Map",
        mapTitle: "Corridors of the Continent",
        mapBody:
          "Toggle between the named trails that preceded 1926 and the Interstate System that replaced them. The entire primary grid is drawn from official FHWA geometry — touch any line, not just the featured corridors, for its real length and traffic.",
        trafficSource:
          "Traffic source: FHWA Highway Statistics 2024, Table VM-1. Interstates carried 854.4 billion vehicle-miles in 2024 — 271.8B rural + 582.6B urban — equal to 25.9% of all U.S. vehicle-miles. The heat map uses FHWA National Highway System segment AADT data.",
        trafficSourceHref: "https://www.fhwa.dot.gov/policyinformation/statistics/2024/vm1.cfm",
        mapLabels: {
          eraLabel: "Choose the era",
          corridorsLabel: "Hover a corridor for its story — every line on the map is interactive",
          lengthLabel: "Length",
          openedLabel: "Built",
          hint: "Routes follow official FHWA geometry. Zoom in for detail.",
          trafficLabel: "Avg. daily traffic",
          vehiclesPerDay: "veh/day",
          zoomHint: "Zoom: buttons, pinch, or Ctrl + scroll · drag to pan",
          viewCorridors: "Corridors",
          viewTraffic: "Traffic",
          heatLow: "Quiet",
          heatHigh: "Jammed",
        },
        pullStat: "1.16%",
        pullLabel:
          "of America's public road mileage is Interstate highway — yet it carries 25.9% of all U.S. vehicle-miles, according to FHWA 2024 data.",
        engineeringEyebrow: "The Rules of the Road",
        engineeringTitle: "The Engineering Behind the Freedom",
        stats: [
          { value: "12 ft", label: "standard width of every lane" },
          { value: "11,158 ft", label: "the high point — Eisenhower Tunnel, I-70" },
          { value: "0", label: "traffic lights on the entire system" },
        ],
        facts: [
          {
            fact: "The numbers tell the story",
            detail:
              "Even routes run east–west, odd routes north–south. Multiples of ten are the transcontinental arteries; a leading digit marks a beltway or spur. The map reads itself.",
          },
          {
            fact: "The last mile was the hardest",
            detail:
              "Glenwood Canyon, Colorado: twelve miles of viaducts hung above the Colorado River, not finished until 1992 — the System's final link, and arguably the most beautiful stretch of freeway on Earth.",
          },
        ],
        numbersEyebrow: "The Scale, in Numbers",
        numbersTitle: "A Continent, by the Numbers",
        costStats: [
          { value: "$114B", label: "to build (≈$600B in today's dollars)" },
          { value: "40 yrs", label: "from first contract to final mile" },
          { value: "55,000", label: "bridges · 47,856 route miles" },
        ],
        decoderTitle: "How to Read an Interstate Shield",
        decoderItems: [
          { k: "Even numbers", v: "run east–west (I-10, I-90)" },
          { k: "Odd numbers", v: "run north–south (I-5, I-95)" },
          { k: "Multiples of 5", v: "are the major transcontinental arteries" },
          { k: "Three digits", v: "are urban beltways & spurs (I-610, I-495)" },
        ],
        mythLabel: "MYTH",
        mythText:
          "“One in every five miles must be straight, to serve as an emergency airstrip.” False — it's an urban legend. No federal standard ever required it.",
        quirksTitle: "Quirks of the Numbering",
        quirksItems: [
          {
            k: "No I-50, no I-60",
            v: "The grid skips them on purpose. An I-50 or I-60 would run beside U.S. 50 and U.S. 60 through the same states, and matching numbers on both a U.S. route and an Interstate was judged a recipe for confusion.",
          },
          {
            k: "The route that splits: I-35E and I-35W",
            v: "I-35 is the one primary route that forks in two, and not once but twice — around Dallas–Fort Worth and around Minneapolis–Saint Paul — so neither city could claim the other's traffic. Then it rejoins.",
          },
          {
            k: "Three-digit numbers repeat",
            v: "Auxiliary routes reset from metro to metro. There are several I-495s, I-465s and I-610s across the country, because a beltway only needs to be unique within its own city, not nationwide.",
          },
        ],
        econEyebrow: "The Highway's Children",
        econTitle: "The Road That Built an Economy",
        econIntro:
          "The Interstate didn't just move cars — it spawned whole industries, born at the bottom of the off-ramp.",
        econItems: [
          { year: "1952", name: "Holiday Inn", text: "The first standardized hotel chain grew out of one bad family road trip. Identical, predictable rooms at every interchange." },
          { year: "1975", name: "The McDonald's drive-thru", text: "The first drive-thru window opened next to an Arizona military base — then colonized every highway exit in America." },
          { year: "—", name: "The truck stop", text: "Pilot Flying J, Love's and TA built oasis-towns for 3.5 million truckers — fuel, food and showers, around the clock." },
          { year: "1971", name: "FedEx & UPS", text: "Overnight delivery only became possible because a truck could cross an entire state without stopping at a single light." },
        ],
        unfinishedEyebrow: "Roads Not Taken",
        unfinishedTitle: "The Interstates That Never Were",
        unfinishedIntro:
          "Not every line on the 1950s maps got built. City revolts and geography left ghosts on the map.",
        unfinishedItems: [
          { name: "Westway (I-478), New York", text: "A highway buried along the Hudson, killed in 1985 after a decade of lawsuits. The money went to the New York subway instead." },
          { name: "The Embarcadero Freeway, San Francisco", text: "A double-decker along the bayfront so unloved the city tore it down after the 1989 earthquake — and never rebuilt it." },
          { name: "The I-95 gap, New Jersey", text: "The Somerset Freeway was canceled, leaving I-95 without a link for decades. The final connection opened only in 2018." },
        ],
        defenseTitle: "National Security & The Airfield Myth",
        defenseP: "Officially named the Dwight D. Eisenhower National System of Interstate and Defense Highways, the network was designed with national security at its core. Drawing from Eisenhower's experience with the German Autobahn during WWII, the system was built to allow rapid mobilization of military forces. Bridges were built with a minimum vertical clearance of 16 feet specifically to accommodate the transport of Intercontinental Ballistic Missiles (ICBMs) and heavy military vehicles. While the popular belief that 'one out of every five miles must be straight to serve as emergency runways' is a urban myth, the U.S. military has indeed conducted successful exercises landing fighter jets on designated highway stretches, proving the system's strategic backup capability.",
        quote:
          "More than any single action by the government since the end of the war, this one would change the face of America.",
        quoteAttribution: "Dwight D. Eisenhower",
        quoteTitle: "34th President — on the Interstate System",
        prevLink: "↑ Infrastructure Overview",
        nextLink: "The Continental Rail Network →",
      };

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc={SITE_IMAGES.infraUs75Loop12}
        imageAlt={isRo ? "US-75 la Texas State Highway Loop 12" : "US-75 at Texas State Highway Loop 12"}
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        description={copy.heroBody}
        stats={copy.heroStats}
      />

      <div className="relative z-10 bg-[#000000] pb-32 pt-16">
        <div className="mx-auto mb-24 max-w-[1600px] px-6 md:px-12">
          <Breadcrumb
            items={[
              { label: copy.breadcrumbSection, href: "/infrastructure" },
              { label: copy.breadcrumbPage },
            ]}
          />
        </div>

        <div className="mx-auto max-w-[1600px] space-y-40 px-6 md:space-y-48 md:px-12">
          {/* ── Origin story ── */}
          <section>
            <h2 className="macro-section-title mb-12">{copy.storyTitle}</h2>
            <SerifLede className="mb-12 max-w-5xl">{copy.lede}</SerifLede>
            <div className="grid gap-10 md:grid-cols-2">
              <Reveal><p className="macro-body">{copy.storyP1}</p></Reveal>
              <Reveal delay={0.12}><p className="macro-body">{copy.storyP2}</p></Reveal>
            </div>
          </section>

          <InfrastructureBand
            imageSrc={SITE_IMAGES.infraInterstateConstruction}
            imageAlt={copy.bandAlt}
          >
            <h2 className="macro-section-title mb-6">{copy.bandTitle}</h2>
            <p className="macro-body max-w-4xl">{copy.bandP1}</p>
            <p className="macro-body mt-4 max-w-4xl">{copy.bandP2}</p>
          </InfrastructureBand>

          {/* ── Interactive map ── */}
          <section>
            <span className="macro-eyebrow">{copy.mapEyebrow}</span>
            <h2 className="macro-section-title mb-8 mt-6">{copy.mapTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.mapBody}</p>
            <NetworkMap
              locale={locale}
              eras={HIGHWAY_ERAS}
              routes={HIGHWAY_ROUTES}
              nodes={HIGHWAY_NODES}
              accent="#E8B923"
              backgroundNetwork
              enableHeatmap
              hideEraToggle
              initialEra="interstate"
              labels={copy.mapLabels}
            />
            <p className="mt-5 max-w-4xl font-macro-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-white/45">
              {copy.trafficSource}{" "}
              <a
                href={copy.trafficSourceHref}
                target="_blank"
                rel="noreferrer"
                className="text-[#E8B923]/80 transition-colors hover:text-[#E8B923]"
              >
                FHWA Table VM-1
              </a>
            </p>
          </section>

          {/* ── By the numbers: cost, shield decoder, myth ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{copy.numbersEyebrow}</span>
            <h2 className="macro-section-title mb-16 mt-6">{copy.numbersTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {copy.costStats.map((s) => (
                <MacroStat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
            <div className="mt-20 grid gap-12 md:grid-cols-2">
              <div>
                <h3 className="font-macro-display text-2xl font-bold text-white mb-6">{copy.decoderTitle}</h3>
                <ul>
                  {copy.decoderItems.map((d) => (
                    <li key={d.k} className="flex gap-4 border-b border-white/[0.06] py-4">
                      <span className="w-28 shrink-0 font-macro-mono text-[11px] uppercase tracking-[0.15em] text-[#E8B923]">
                        {d.k}
                      </span>
                      <span className="macro-body !text-base">{d.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center rounded-2xl border border-[#b22234]/30 bg-[#b22234]/[0.06] p-8">
                <span className="mb-4 font-macro-mono text-xs font-black uppercase tracking-[0.3em] text-[#f87171]">
                  {copy.mythLabel}
                </span>
                <p className="macro-body !text-lg leading-relaxed text-white/80">{copy.mythText}</p>
              </div>
            </div>
            {/* Number quirks — extends the shield decoder */}
            <div className="mt-20">
              <h3 className="mb-8 font-macro-display text-2xl font-bold text-white">{copy.quirksTitle}</h3>
              <div className="grid gap-x-12 gap-y-8 md:grid-cols-3">
                {copy.quirksItems.map((q) => (
                  <div key={q.k} className="border-t border-[#E8B923]/30 pt-6">
                    <h4 className="mb-3 font-macro-display text-lg font-bold leading-tight text-[#E8B923]">
                      {q.k}
                    </h4>
                    <p className="macro-body !text-sm leading-relaxed text-white/60">{q.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Pull stat ── */}
          <section className="border-t border-white/5 pt-24">
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
              <p className="font-macro-display text-[clamp(80px,16vw,220px)] font-black leading-none tracking-tighter text-white">
                {copy.pullStat}
              </p>
              <p className="macro-body mt-8 max-w-3xl">{copy.pullLabel}</p>
            </div>
          </section>

          {/* ── Engineering ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{copy.engineeringEyebrow}</span>
            <h2 className="macro-section-title mb-16 mt-6">{copy.engineeringTitle}</h2>
            <div className="grid gap-16 border-t border-[#E8B923]/30 pt-16 sm:grid-cols-3">
              {copy.stats.map((s) => (
                <MacroStat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
            <div className="mt-20 grid gap-16 md:grid-cols-2">
              {copy.facts.map((f) => (
                <MacroFact key={f.fact} fact={f.fact} detail={f.detail} />
              ))}
            </div>
          </section>

          {/* ── Anatomy Diagram ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">
              {isRo ? "Structura Autostrăzilor" : "Anatomy of the Road"}
            </span>
            <h2 className="macro-section-title mb-16 mt-6">
              {isRo ? "Standardul de Construcție Eisenhower" : "The Eisenhower Construction Standard"}
            </h2>
            <AnatomyDiagram locale={locale} />
          </section>

          {/* ── Interchange typology ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">
              {isRo ? "Unde Se Întâlnesc Autostrăzile" : "Where Highways Meet"}
            </span>
            <h2 className="macro-section-title mb-6 mt-6">
              {isRo ? "Anatomia unui Nod Rutier" : "Anatomy of an Interchange"}
            </h2>
            <p className="macro-body mb-14 max-w-4xl">
              {isRo
                ? "O autostradă nu are voie să întâlnească o alta la nivel. Fiecare încrucișare este rezolvată de una dintre câteva forme standard, alese după cât teren, câți bani și cât trafic sunt în joc."
                : "An Interstate is never allowed to cross another road at grade. Every junction is resolved by one of a handful of standard forms, chosen by how much land, money, and traffic are in play."}
            </p>
            <InterchangeTypology locale={locale} />
          </section>

          {/* ── Strategic design ── */}
          <section className="border-t border-white/5 pt-24">
            <div className="max-w-3xl">
              <span className="macro-eyebrow">
                {isRo ? "Design Strategic & Securitate" : "Strategic Design & Security"}
              </span>
              <h3 className="font-macro-display text-3xl font-black text-white mt-4 mb-6">
                {copy.defenseTitle}
              </h3>
              <p className="macro-body leading-relaxed text-white/70">{copy.defenseP}</p>
            </div>
          </section>

          {/* ── The highway's children ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{copy.econEyebrow}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.econTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.econIntro}</p>
            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {copy.econItems.map((it) => (
                <div key={it.name} className="border-t border-[#E8B923]/30 pt-6">
                  <div className="font-hero text-3xl text-[#E8B923]/90">{it.year}</div>
                  <h3 className="mb-3 mt-2 font-macro-display text-xl font-bold text-white">{it.name}</h3>
                  <p className="macro-body !text-sm leading-relaxed text-white/60">{it.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Roads not taken ── */}
          <section className="border-t border-white/5 pt-24">
            <span className="macro-eyebrow">{copy.unfinishedEyebrow}</span>
            <h2 className="macro-section-title mb-6 mt-6">{copy.unfinishedTitle}</h2>
            <p className="macro-body mb-14 max-w-4xl">{copy.unfinishedIntro}</p>
            <div className="grid gap-10 md:grid-cols-3">
              {copy.unfinishedItems.map((it) => (
                <div key={it.name} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <h3 className="mb-3 font-macro-display text-lg font-bold leading-tight text-white">{it.name}</h3>
                  <p className="macro-body !text-sm leading-relaxed text-white/55">{it.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-white/5 pb-8 pt-24">
            <QuoteBlock
              quote={copy.quote}
              attribution={copy.quoteAttribution}
              title={copy.quoteTitle}
              variant="dark"
            />
          </div>

          {/* ── Nav ── */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-16">
            <Link
              href="/infrastructure"
              className="font-macro-mono text-sm uppercase tracking-widest text-white/50 transition-colors hover:text-white"
            >
              {copy.prevLink}
            </Link>
            <Link
              href="/infrastructure/rail-network"
              className="font-macro-mono text-sm uppercase tracking-widest text-[#E8B923] transition-colors hover:text-white"
            >
              {copy.nextLink}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
