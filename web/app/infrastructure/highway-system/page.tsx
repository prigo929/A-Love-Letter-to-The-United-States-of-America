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
          { value: "~25%", label: "din traficul auto al națiunii" },
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
        mapLabels: {
          eraLabel: "Alege epoca",
          corridorsLabel: "Treci peste un coridor pentru detalii — orice linie de pe hartă e interactivă",
          lengthLabel: "Lungime",
          openedLabel: "Perioadă",
          hint: "Traseele urmează geometria oficială FHWA. Apropie harta pentru detalii.",
          trafficLabel: "Trafic mediu zilnic",
          vehiclesPerDay: "veh/zi",
          zoomHint: "Zoom: butoane, pinch sau Ctrl + scroll · trage pentru a naviga",
        },
        pullStat: "≈1%",
        pullLabel:
          "din mileajul rutier al Americii este autostradă interstatală — și duce aproximativ un sfert din întregul trafic auto al națiunii.",
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
        defenseTitle: "Securitatea Națională și Mitul Pistelor de Aterizare",
        defenseP: "Denumit oficial Sistemul Național Dwight D. Eisenhower de Autostrăzi Interstatale și de Apărare, rețeaua a fost concepută având securitatea națională ca pilon central. Inspirat de experiența lui Eisenhower cu autostrăzile germane (Autobahn) din al Doilea Război Mondial, sistemul a fost creat pentru mobilizarea rapidă a forțelor militare. Podurile au fost construite cu o înălțime liberă de minimum 16 picioare (4,87 metri) special pentru a permite transportul rachetelor balistice intercontinentale (ICBM) și al vehiculelor militare grele. Deși credința populară conform căreia „una din cinci mile trebuie să fie dreaptă pentru a servi ca pistă de aterizare de urgență” este un mit urban, armata SUA a efectuat exerciții de aterizare a avioanelor de luptă pe secțiuni de autostradă, demonstrând capacitatea strategică a rețelei în caz de criză.",
        revoltsTitle: "Revoltele Autostrăzilor și Revoluția Logistică",
        revoltsP: "Traseul autostrăzilor prin marile orașe nu a fost lipsit de tensiuni. În anii 1960 și 1970, un val de proteste cetățenești cunoscute sub numele de „revoltele autostrăzilor” a cuprins orașe precum San Francisco, Boston și Washington, D.C. Locuitorii s-au opus coridoarelor masive de beton care tăiau cartiere istorice, ducând la anularea unor trasee majore și la redirecționarea fondurilor către transportul public urban. În ciuda acestor conflicte, sistemul a reconfigurat fundamental economia americană. Permițând un transport rapid și predictibil, a dat naștere industriei moderne de logistică, a popularizat producția de tip „just-in-time” și a creat elemente culturale noi: lanțurile de moteluri suburbane, drive-thru-ul fast-food și imperiile naționale de curierat precum FedEx și UPS.",
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
          { value: "~25%", label: "of the nation's vehicle-miles" },
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
        mapLabels: {
          eraLabel: "Choose the era",
          corridorsLabel: "Hover a corridor for its story — every line on the map is interactive",
          lengthLabel: "Length",
          openedLabel: "Built",
          hint: "Routes follow official FHWA geometry. Zoom in for detail.",
          trafficLabel: "Avg. daily traffic",
          vehiclesPerDay: "veh/day",
          zoomHint: "Zoom: buttons, pinch, or Ctrl + scroll · drag to pan",
        },
        pullStat: "≈1%",
        pullLabel:
          "of America's road mileage is Interstate highway — yet it carries roughly a quarter of all the nation's vehicle traffic.",
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
        defenseTitle: "National Security & The Airfield Myth",
        defenseP: "Officially named the Dwight D. Eisenhower National System of Interstate and Defense Highways, the network was designed with national security at its core. Drawing from Eisenhower's experience with the German Autobahn during WWII, the system was built to allow rapid mobilization of military forces. Bridges were built with a minimum vertical clearance of 16 feet specifically to accommodate the transport of Intercontinental Ballistic Missiles (ICBMs) and heavy military vehicles. While the popular belief that 'one out of every five miles must be straight to serve as emergency runways' is a urban myth, the U.S. military has indeed conducted successful exercises landing fighter jets on designated highway stretches, proving the system's strategic backup capability.",
        revoltsTitle: "The Freeway Revolts & Modern Logistics",
        revoltsP: "The Interstate's path through America was not without friction. In the 1960s and 1970s, a wave of citizen protests known as the 'freeway revolts' swept through cities like San Francisco, Boston, and Washington, D.C. Residents fought against massive concrete corridors cutting through historic neighborhoods, leading to the cancellation of major planned routes and the reallocation of highway funds to urban mass transit. Despite these conflicts, the system fundamentally rewired the American economy. By enabling high-speed, predictable transport, it birthed the modern logistics industry, popularized 'just-in-time' manufacturing, and spawned entirely new cultural fixtures: the suburban motel chain, the fast-food drive-thru, and the national shipping empires of FedEx and UPS.",
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
        imageSrc={SITE_IMAGES.infraGlenwoodCanyon}
        imageAlt={isRo ? "I-70 prin Glenwood Canyon" : "I-70 through Glenwood Canyon"}
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
              labels={copy.mapLabels}
            />
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

          {/* ── Defense & Logistics ── */}
          <section className="border-t border-white/5 pt-24">
            <div className="grid gap-16 md:grid-cols-2">
              <div>
                <span className="macro-eyebrow">
                  {isRo ? "Design Strategic & Securitate" : "Strategic Design & Security"}
                </span>
                <h3 className="font-macro-display text-3xl font-black text-white mt-4 mb-6">
                  {copy.defenseTitle}
                </h3>
                <p className="macro-body leading-relaxed text-white/70">
                  {copy.defenseP}
                </p>
              </div>
              <div>
                <span className="macro-eyebrow">
                  {isRo ? "Impact Social & Economic" : "Social & Economic Impact"}
                </span>
                <h3 className="font-macro-display text-3xl font-black text-white mt-4 mb-6">
                  {copy.revoltsTitle}
                </h3>
                <p className="macro-body leading-relaxed text-white/70">
                  {copy.revoltsP}
                </p>
              </div>
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
