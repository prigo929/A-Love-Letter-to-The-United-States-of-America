import type { Metadata } from "next";
import React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";
import { CountryBarChart } from "@/components/shared/CountryBarChart";
import {
  Building2, ShoppingCart, Stethoscope, Fuel, Package, Briefcase,
  Landmark, Home, GraduationCap, Trophy,
} from "lucide-react";

export const metadata: Metadata = {
  title: "America vs. the World",
  description:
    "What everyday life actually looks like in normal American suburbia versus the rest of the developed world — and the institutional reasons the gap is so large.",
};

interface VersusCopy {
  breadcrumb: string;
  heroEyebrow: string;
  heroLead: string;
  heroAccent: string;
  heroDescription: string;
  thesisEyebrow: string;
  thesisTitle: string;
  thesisP1: string;
  thesisP2: string;
  sweepEyebrow: string;
  sweepTitle: string;
  sweepIntro: string;
  domains: Array<{ icon: React.ElementType; title: string; body: string }>;
  priceTitle: string;
  priceIntro: string;
  chartWageTitle: string;
  chartGasTitle: string;
  chartGasSubtitle: string;
  tableTitle: string;
  tableSubtitle: string;
  tableUs: string;
  tableThem: string;
  rows: Array<{ category: string; us: string; them: string }>;
  livesEyebrow: string;
  livesTitle: string;
  livesIntro: string;
  hereLabel: string;
  thereLabel: string;
  stages: Array<{ age: string; here: string; there: string }>;
  caveatTitle: string;
  caveats: string[];
  closingTitle: string;
  closingBody: string;
  oracle: string;
}

const copyEn: VersusCopy = {
  breadcrumb: "America vs. the World",
  heroEyebrow: "THE EVERYDAY GAP",
  heroLead: "NORMAL AMERICAN",
  heroAccent: "EXCELLENCE",
  heroDescription:
    "Not Manhattan, not Beverly Hills — a standard affluent suburb like The Woodlands north of Houston already looks like science fiction next to a major European city. This is what free markets, secure property rights, and competent institutions build in the physical world.",
  thesisEyebrow: "WHY THE GAP EXISTS",
  thesisTitle: "Institutions First — Not Geography, Not Luck",
  thesisP1:
    "The difference between a North-Houston suburb and a city like Iași is not natural resources or current income alone — it is accumulated institutional capital built over generations. Secure property rights, deep capital markets, contract law that actually works, and a government that mostly facilitates rather than obstructs let private capital compound continuously. The Woodlands itself is almost a controlled experiment: a private developer planned the trails, parks, town center, and drainage with minimal state interference, and the result looks like what markets optimize for when people are free to build.",
  thesisP2:
    "The most underrated part is the price paradox. For tradable goods — electronics, cars, appliances, clothing — and especially fuel, American prices are frequently lower in absolute terms, even though the American worker earns several times more. The wage-adjusted gap is enormous: the same week of groceries that costs an American two hours of work costs far more labor-hours elsewhere, for an equivalent or lower-quality basket. Capital per worker, competition as a quality ratchet, and the franchise model standardizing quality across geography do the work no planning committee ever could.",
  sweepEyebrow: "CATEGORY BY CATEGORY",
  sweepTitle: "Where the Difference Is Civilizational",
  sweepIntro:
    "Across domain after domain, the American baseline — the normal, unremarkable version — outclasses the best available in much of the developed world. A recurring lens: The Woodlands / north Houston versus Iași, Romania.",
  domains: [
    { icon: ShoppingCart, title: "Retail & Grocery Scale", body: "An H-E-B or Costco runs a supply chain among the most sophisticated in human history — bulk quantities, in-store sushi and tortillas, USDA-graded beef, year-round produce — at prices that embarrass most European hypermarkets." },
    { icon: Home, title: "Housing per Square Foot", body: "A new ~2,400 sq ft single-family home with a garage and yard, on land that appreciates — versus a smaller, older apartment for a similar price per square meter. Permissive zoning and a deep construction industry make space ordinary." },
    { icon: Fuel, title: "Energy & Fuel", body: "Texas produces, refines, and distributes its own energy in a competitive market. Gas often under $3/gallon versus a ~$6/gallon equivalent earned on a fraction of the wage — cheap energy quietly lowers the cost of everything else." },
    { icon: Stethoscope, title: "Healthcare & Equipment", body: "The Texas Medical Center is the largest medical complex on Earth, 30 minutes away — robotic surgery, genomic medicine, clinical trials, and drugs that won't reach many countries for years. (With the honest caveat of billing for the uninsured.)" },
    { icon: Package, title: "Logistics & Delivery", body: "Amazon next-day — sometimes same-day — to a suburban address, on a fulfillment network of hundreds of warehouses. Any product in America arrives within 48 hours, usually free." },
    { icon: Briefcase, title: "Business Formation", body: "An LLC in ~20 minutes online for a few hundred dollars; a business bank account the same week; a thick ecosystem of accountants, lenders, and investors that says, plainly: we want you to build here." },
    { icon: Building2, title: "Financial Products", body: "The 30-year fixed mortgage turned homeownership into a middle-class norm; rewards credit cards and a credit-score system let ordinary people capture real value and borrow to build economic lives." },
    { icon: Trophy, title: "Youth Sports Facilities", body: "A Texas public high school football stadium seating 10,000–20,000, with pro-grade turf, lighting, and a weight room — funded by a local tax base that actually generates revenue." },
    { icon: GraduationCap, title: "Opportunity & Wages", body: "A new-grad software engineer earns $140–180k plus benefits where the same role abroad pays a fraction — same company, same work, multiples of the compensation, in a no-state-income-tax environment." },
    { icon: Landmark, title: "Everyday Services", body: "Drive-throughs, apps, and an on-demand economy built on the assumption your time is worth something — Uber, DoorDash, Instacart, and a customer-service culture sharpened by public reviews." },
  ],
  priceTitle: "The Price–Wage Paradox",
  priceIntro:
    "The argument becomes unanswerable when you hold prices fixed. Americans earn several times more in real terms, yet pay the same or less for most tradable goods — and dramatically less for fuel.",
  chartWageTitle: "Average annual wage, PPP-adjusted (US$)",
  chartGasTitle: "Gasoline price (US$ per gallon) — lower is better",
  chartGasSubtitle: "Pump price for premium-grade fuel, recent annual average.",
  tableTitle: "North Houston vs. Iași — the same wallet, a different life",
  tableSubtitle: "Representative figures; rounded for comparison.",
  tableUs: "North Houston",
  tableThem: "Iași, Romania",
  rows: [
    { category: "New-grad software salary", us: "$140,000–180,000", them: "€20,000–40,000" },
    { category: "State income tax", us: "$0 (Texas)", them: "10% flat + contributions" },
    { category: "New single-family home", us: "~2,400 sq ft, garage, yard", them: "~45–80 m² apartment" },
    { category: "Gasoline", us: "~$3 / gallon", them: "~$6 / gallon equiv." },
    { category: "Week of groceries", us: "~2 hours of work", them: "~6–8 hours of work" },
    { category: "Start an LLC", us: "~20 minutes, ~$300", them: "Notary + offices, weeks" },
    { category: "Top hospital", us: "Texas Medical Center, 30 min", them: "Often: travel to Western EU" },
  ],
  livesEyebrow: "TWO PARALLEL LIVES",
  livesTitle: "Same Ambition, Different Platform",
  livesIntro:
    "The same intelligent, hard-working person — one in north Houston, one in Iași. Not a miracle versus poverty; a functioning platform versus constant friction.",
  hereLabel: "North Houston / The Woodlands",
  thereLabel: "Iași, Romania",
  stages: [
    {
      age: "Age 22–24 · The Launch",
      here: "Junior role in tech/energy/medical devices at $70–85k, zero state income tax. A modern one-bedroom with a pool and gym. A used F-150 financed at 4–5%, a $45 tank, a $120 weekly grocery run. Already contributing to a 401k with an employer match and a Roth IRA — building tax-advantaged wealth at 23.",
      there: "A good local job pays €1,000–1,600/month. A 45 m² flat in a 1970s block, street-parking chaos, a used Dacia. Health cover exists on paper but means a three-week wait and dated equipment. No 401k, no Roth, no five-minute index fund — a generation behind in the wealth-building toolkit.",
    },
    {
      age: "Age 26–30 · The Acceleration",
      here: "$110–160k. Buys a 2,400 sq ft house in Katy or Cypress for ~$320k, building equity every month. Maxes retirement accounts, invests the surplus, maybe forms an LLC in an afternoon. Drives a new truck on highways that work, 20-minute commute.",
      there: "Doing well by local standards at €2,500–3,500/month — top 5–10% of earners. Maybe buys an €80–120k apartment. But the ceiling is visible: the best local employer still pays local rates, and bureaucracy taxes every plan — a routine permit can take six months.",
    },
    {
      age: "Age 32–40 · The Divergence",
      here: "Senior engineer or director, $160–220k plus bonus. Net worth approaching $400–600k across home equity, retirement, and brokerage — still climbing. Excellent public schools, two or three real vacations a year, an environment that compounds ambition.",
      there: "Exceptional and earning €4,000–5,000 — a genuinely good Romanian life. But the Houston counterpart, same skills, has a $190k salary, a $450k house with $120k equity, and $280k in retirement accounts. The cumulative gap over those years is not a rounding error — it is a different life.",
    },
  ],
  caveatTitle: "The Honest Caveats",
  caveats: [
    "American healthcare quality is world-class, but the billing and insurance around it is a real risk for the uninsured — the gap closes once you're inside a strong employer plan.",
    "Romanian urban fiber internet is genuinely fast — often faster than US residential broadband. Infrastructure is not uniformly behind.",
    "Iași's 500-year-old architecture, monasteries, and old city center have cultural value a Texas suburb simply does not possess. The trade-off is real and worth naming.",
    "The gap is institutional and systemic, not a matter of people 'putting up with' worse — it has precise, well-understood causes, and the right individual decisions can bridge it.",
  ],
  closingTitle: "The Takeaway",
  closingBody:
    "What's remarkable is that the American side isn't exceptional by American standards — it's the normal affluent baseline, repeated across the entire Sun Belt. The gap is capitalism working as advertised: private capital, competitive markets, the rule of law, and a government that facilitates rather than obstructs. Its causes are replicable in principle — which is exactly why the comparison is not just attractive, but instructive.",
  oracle:
    "Ask the AI Oracle about purchasing-power parity, the 30-year fixed mortgage, capital per worker, or why American retail prices are often lower in absolute terms.",
};

const copyRo: VersusCopy = {
  breadcrumb: "America vs. Lumea",
  heroEyebrow: "DECALAJUL DE ZI CU ZI",
  heroLead: "EXCELENȚA AMERICANĂ",
  heroAccent: "OBIȘNUITĂ",
  heroDescription:
    "Nu Manhattan, nu Beverly Hills — o suburbie obișnuită și prosperă precum The Woodlands, la nord de Houston, arată deja ca science-fiction față de un oraș european major. Asta construiesc în lumea reală piețele libere, drepturile de proprietate sigure și instituțiile competente.",
  thesisEyebrow: "DE CE EXISTĂ DECALAJUL",
  thesisTitle: "Mai Întâi Instituțiile — Nu Geografia, Nu Norocul",
  thesisP1:
    "Diferența dintre o suburbie din nordul Houstonului și un oraș precum Iași nu ține doar de resurse naturale sau de venitul actual — ci de capitalul instituțional acumulat de-a lungul generațiilor. Drepturi de proprietate sigure, piețe de capital adânci, un drept contractual care chiar funcționează și un stat care în general facilitează în loc să obstrucționeze permit capitalului privat să se compună continuu. The Woodlands este aproape un experiment controlat: un dezvoltator privat a planificat traseele, parcurile, centrul și drenajul cu interferență minimă a statului.",
  thesisP2:
    "Cea mai subapreciată parte este paradoxul prețurilor. Pentru bunuri tranzacționabile — electronice, mașini, electrocasnice, haine — și în special pentru combustibil, prețurile americane sunt adesea mai mici în termeni absoluți, deși muncitorul american câștigă de câteva ori mai mult. Decalajul ajustat la salariu este uriaș: aceeași săptămână de cumpărături care îl costă pe un american două ore de muncă costă mult mai multe ore de muncă în altă parte, pentru un coș echivalent sau de calitate mai slabă.",
  sweepEyebrow: "CATEGORIE CU CATEGORIE",
  sweepTitle: "Unde Diferența Este de Ordin Civilizațional",
  sweepIntro:
    "Domeniu după domeniu, nivelul de bază american — versiunea normală, banală — depășește ce e mai bun disponibil în mare parte a lumii dezvoltate. O lentilă recurentă: The Woodlands / nordul Houstonului versus Iași, România.",
  domains: [
    { icon: ShoppingCart, title: "Scara Comerțului și a Băcăniilor", body: "Un H-E-B sau Costco operează un lanț de aprovizionare printre cele mai sofisticate din istorie — cantități mari, sushi și tortilla în magazin, carne gradată USDA, legume tot anul — la prețuri care fac de rușine majoritatea hipermarketurilor europene." },
    { icon: Home, title: "Locuință pe Metru Pătrat", body: "O casă nouă de ~214 m² cu garaj și curte, pe un teren care se apreciază — față de un apartament mai mic și mai vechi la un preț similar pe metru pătrat. Reglementări permisive și o industrie a construcțiilor adâncă fac spațiul ceva obișnuit." },
    { icon: Fuel, title: "Energie și Combustibil", body: "Texasul își produce, rafinează și distribuie propria energie pe o piață competitivă. Benzină adesea sub 3$/galon față de un echivalent de ~6$/galon câștigat dintr-o fracțiune din salariu — energia ieftină scade discret costul a tot restul." },
    { icon: Stethoscope, title: "Sănătate și Echipamente", body: "Texas Medical Center este cel mai mare complex medical de pe Pământ, la 30 de minute — chirurgie robotică, medicină genomică, studii clinice și medicamente care nu ajung în multe țări ani la rând. (Cu rezerva onestă a facturării pentru neasigurați.)" },
    { icon: Package, title: "Logistică și Livrare", body: "Amazon a doua zi — uneori în aceeași zi — la o adresă suburbană, pe o rețea de sute de depozite. Orice produs din America ajunge în 48 de ore, de obicei gratuit." },
    { icon: Briefcase, title: "Înființarea unei Afaceri", body: "Un SRL în ~20 de minute online pentru câteva sute de dolari; un cont bancar de firmă în aceeași săptămână; un ecosistem dens de contabili, creditori și investitori care spune simplu: vrem să construiești aici." },
    { icon: Building2, title: "Produse Financiare", body: "Ipoteca fixă pe 30 de ani a transformat proprietatea într-o normă a clasei de mijloc; cardurile cu recompense și sistemul de scor de credit permit oamenilor obișnuiți să capteze valoare reală și să împrumute pentru a-și construi vieți economice." },
    { icon: Trophy, title: "Facilități Sportive pentru Tineri", body: "Un stadion de fotbal al unui liceu public din Texas cu 10.000–20.000 de locuri, cu gazon profesionist, nocturnă și sală de forță — finanțat de o bază fiscală locală care chiar generează venituri." },
    { icon: GraduationCap, title: "Oportunitate și Salarii", body: "Un inginer software proaspăt absolvent câștigă 140–180k $ plus beneficii, unde același rol în străinătate plătește o fracțiune — aceeași companie, aceeași muncă, de câteva ori compensația, fără impozit pe venit la nivel de stat." },
    { icon: Landmark, title: "Servicii de Zi cu Zi", body: "Drive-through-uri, aplicații și o economie la cerere construită pe ideea că timpul tău valorează ceva — Uber, DoorDash, Instacart și o cultură a serviciului clienți ascuțită de recenziile publice." },
  ],
  priceTitle: "Paradoxul Preț–Salariu",
  priceIntro:
    "Argumentul devine de necontestat când fixezi prețurile. Americanii câștigă de câteva ori mai mult în termeni reali, dar plătesc la fel sau mai puțin pentru majoritatea bunurilor tranzacționabile — și dramatic mai puțin pentru combustibil.",
  chartWageTitle: "Salariu mediu anual, ajustat PPP (US$)",
  chartGasTitle: "Prețul benzinei (US$ pe galon) — mai puțin e mai bine",
  chartGasSubtitle: "Prețul la pompă pentru combustibil premium, medie anuală recentă.",
  tableTitle: "Nordul Houstonului vs. Iași — același portofel, o altă viață",
  tableSubtitle: "Cifre reprezentative; rotunjite pentru comparație.",
  tableUs: "Nordul Houstonului",
  tableThem: "Iași, România",
  rows: [
    { category: "Salariu software, debutant", us: "$140.000–180.000", them: "€20.000–40.000" },
    { category: "Impozit pe venit la nivel de stat", us: "$0 (Texas)", them: "10% + contribuții" },
    { category: "Casă unifamilială nouă", us: "~214 m², garaj, curte", them: "apartament ~45–80 m²" },
    { category: "Benzină", us: "~$3 / galon", them: "~$6 / galon echiv." },
    { category: "Cumpărături pe o săptămână", us: "~2 ore de muncă", them: "~6–8 ore de muncă" },
    { category: "Înființare SRL", us: "~20 minute, ~$300", them: "Notar + ghișee, săptămâni" },
    { category: "Spital de top", us: "Texas Medical Center, 30 min", them: "Adesea: deplasare în Vest" },
  ],
  livesEyebrow: "DOUĂ VIEȚI PARALELE",
  livesTitle: "Aceeași Ambiție, o Altă Platformă",
  livesIntro:
    "Aceeași persoană inteligentă și muncitoare — una în nordul Houstonului, una în Iași. Nu un miracol versus sărăcie; o platformă funcțională versus o frecare constantă.",
  hereLabel: "Nordul Houstonului / The Woodlands",
  thereLabel: "Iași, România",
  stages: [
    {
      age: "22–24 ani · Lansarea",
      here: "Un rol junior în tech/energie/dispozitive medicale la 70–85k $, fără impozit pe venit la nivel de stat. Un apartament modern cu o cameră, cu piscină și sală. Un F-150 second-hand finanțat la 4–5%, un plin de 45$, cumpărături de 120$ pe săptămână. Deja contribuie la un 401k cu match de la angajator și la un Roth IRA — construiește avere cu avantaje fiscale la 23 de ani.",
      there: "Un job local bun plătește 1.000–1.600 € pe lună. Un apartament de 45 m² într-un bloc din anii '70, haos la parcare, o Dacia second-hand. Asigurarea de sănătate există pe hârtie, dar înseamnă trei săptămâni de așteptare și echipamente vechi. Fără 401k, fără Roth, fără fond index în cinci minute — o generație în urmă la instrumentele de construire a averii.",
    },
    {
      age: "26–30 ani · Accelerarea",
      here: "110–160k $. Cumpără o casă de 214 m² în Katy sau Cypress cu ~320k $, construind capital propriu în fiecare lună. Maximizează conturile de pensie, investește surplusul, poate înființează un SRL într-o după-amiază. Conduce un camion nou pe autostrăzi care funcționează, navetă de 20 de minute.",
      there: "Se descurcă bine după standardele locale, la 2.500–3.500 € pe lună — top 5–10% dintre câștigători. Poate cumpără un apartament de 80–120k €. Dar plafonul se vede: cel mai bun angajator local tot plătește la rate locale, iar birocrația taxează fiecare plan — o autorizație de rutină poate dura șase luni.",
    },
    {
      age: "32–40 ani · Divergența",
      here: "Inginer senior sau director, 160–220k $ plus bonus. Avere netă apropiindu-se de 400–600k $ între capitalul din casă, pensie și brokeraj — încă în creștere. Școli publice excelente, două-trei vacanțe reale pe an, un mediu care compune ambiția.",
      there: "Excepțional și câștigând 4.000–5.000 € — o viață românească chiar bună. Dar omologul din Houston, cu aceleași abilități, are un salariu de 190k $, o casă de 450k $ cu 120k $ capital propriu și 280k $ în conturi de pensie. Decalajul cumulat în acei ani nu este o eroare de rotunjire — este o altă viață.",
    },
  ],
  caveatTitle: "Rezervele Oneste",
  caveats: [
    "Calitatea sistemului medical american este de clasă mondială, dar facturarea și asigurările din jurul lui sunt un risc real pentru cei neasigurați — decalajul se închide odată ce ești într-un plan solid de la angajator.",
    "Internetul prin fibră din orașele românești este chiar rapid — adesea mai rapid decât broadband-ul rezidențial din SUA. Infrastructura nu este uniform în urmă.",
    "Arhitectura de 500 de ani a Iașului, mănăstirile și centrul vechi au o valoare culturală pe care o suburbie texană pur și simplu nu o posedă. Compromisul este real și merită numit.",
    "Decalajul este instituțional și sistemic, nu o chestiune de oameni care „se mulțumesc” cu mai puțin — are cauze precise, bine înțelese, iar deciziile individuale corecte îl pot depăși.",
  ],
  closingTitle: "Concluzia",
  closingBody:
    "Remarcabil este că partea americană nu este excepțională după standardele americane — este nivelul de bază, prosper și normal, repetat în tot Sun Belt-ul. Decalajul este capitalismul funcționând așa cum a fost promis: capital privat, piețe competitive, statul de drept și un guvern care facilitează în loc să obstrucționeze. Cauzele lui sunt, în principiu, replicabile — exact de aceea comparația nu este doar atrăgătoare, ci instructivă.",
  oracle:
    "Întreabă Oracolul AI despre paritatea puterii de cumpărare, ipoteca fixă pe 30 de ani, capitalul pe muncitor sau de ce prețurile din comerțul american sunt adesea mai mici în termeni absoluți.",
};

export default async function AmericaVsTheWorldPage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />
      <MacroHero
        imageSrc="/images/library/Housing/Modern suburban house with garden and American flag, showcasing beautiful architecture in Eagle Mountain, UT.jpg"
        imageAlt="Modern American suburban home with an American flag"
        eyebrow={copy.heroEyebrow}
        titleLead={copy.heroLead}
        titleAccent={copy.heroAccent}
        description={copy.heroDescription}
        stats={[
          { value: "4–5×", label: isRo ? "Putere de cumpărare reală" : "Real purchasing power" },
          { value: "~$0", label: isRo ? "Impozit venit (Texas)" : "State income tax (TX)" },
          { value: "30 min", label: isRo ? "Până la cel mai mare centru medical" : "To the largest medical center" },
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 font-body text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 mb-8">
          <Breadcrumb
            items={[
              { label: isRo ? "Calitatea Vieții" : "Quality of Life", href: "/quality-of-life" },
              { label: copy.breadcrumb },
            ]}
          />
        </div>

        {/* Thesis */}
        <RevealSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-28 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              <span className="macro-eyebrow">{copy.thesisEyebrow}</span>
              <h2 className="macro-section-title text-white text-4xl">{copy.thesisTitle}</h2>
              <p className="macro-body text-lg leading-relaxed text-white/80">{copy.thesisP1}</p>
              <p className="macro-body text-lg leading-relaxed text-white/80">{copy.thesisP2}</p>
            </div>
          </div>
        </RevealSection>

        {/* Category sweep */}
        <RevealSection className="border-b border-t border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="macro-eyebrow">{copy.sweepEyebrow}</span>
            <h2 className="macro-section-title text-white text-3xl mt-3 mb-3">{copy.sweepTitle}</h2>
            <p className="macro-body text-sm max-w-3xl mb-12">{copy.sweepIntro}</p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {copy.domains.map((d, i) => {
                const Icon = d.icon;
                return (
                  <div key={i} className="border-t border-white/10 pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="h-5 w-5 text-[#E8B923]" />
                      <h3 className="font-display text-lg font-bold text-white leading-tight">{d.title}</h3>
                    </div>
                    <p className="macro-body text-sm leading-relaxed">{d.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealSection>

        {/* Price–wage paradox */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="macro-section-title text-white text-3xl mb-3">{copy.priceTitle}</h2>
            <p className="macro-body text-sm max-w-2xl mb-12">{copy.priceIntro}</p>
            <div className="grid gap-12 lg:grid-cols-2 mb-14">
              <CountryBarChart
                title={copy.chartWageTitle}
                source="OECD Average Wages (PPP)"
                data={[
                  { label: "USA", value: 77463, display: "$77,463", isUS: true },
                  { label: "Switzerland", value: 72993, display: "$72,993" },
                  { label: "Germany", value: 58940, display: "$58,940" },
                  { label: "Canada", value: 55342, display: "$55,342" },
                  { label: "United Kingdom", value: 53985, display: "$53,985" },
                  { label: "France", value: 52764, display: "$52,764" },
                  { label: "Japan", value: 41509, display: "$41,509" },
                  { label: "Spain", value: 42859, display: "$42,859" },
                  { label: "Romania", value: 23900, display: "$23,900" },
                ]}
              />
              <CountryBarChart
                title={copy.chartGasTitle}
                subtitle={copy.chartGasSubtitle}
                source="GlobalPetrolPrices"
                data={[
                  { label: "Netherlands", value: 8.0, display: "$8.00" },
                  { label: "Germany", value: 7.1, display: "$7.10" },
                  { label: "France", value: 7.0, display: "$7.00" },
                  { label: "United Kingdom", value: 6.7, display: "$6.70" },
                  { label: "Romania", value: 5.9, display: "$5.90" },
                  { label: "Japan", value: 5.2, display: "$5.20" },
                  { label: "Canada", value: 4.7, display: "$4.70" },
                  { label: "USA", value: 3.2, display: "$3.20", isUS: true },
                ]}
              />
            </div>

            {/* US vs Romania table */}
            <h3 className="font-display text-xl font-bold text-white mb-1">{copy.tableTitle}</h3>
            <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-6">{copy.tableSubtitle}</p>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-3 bg-white/5 px-6 py-4 text-xs sm:text-sm font-mono uppercase tracking-widest text-white/45">
                <span>{isRo ? "Categorie" : "Category"}</span>
                <span className="font-bold text-[#E8B923]">{copy.tableUs}</span>
                <span>{copy.tableThem}</span>
              </div>
              {copy.rows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 items-center gap-x-3 px-6 py-5 border-t border-white/5 hover:bg-white/2 transition-colors">
                  <span className="text-sm sm:text-base text-white font-display font-bold pr-2">{row.category}</span>
                  <span className="text-sm sm:text-base font-bold text-[#E8B923] leading-snug pr-2">{row.us}</span>
                  <span className="text-sm text-white/70 leading-snug">{row.them}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Two parallel lives */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <span className="macro-eyebrow">{copy.livesEyebrow}</span>
            <h2 className="macro-section-title text-white text-3xl mt-3 mb-3">{copy.livesTitle}</h2>
            <p className="macro-body text-sm max-w-2xl mb-12">{copy.livesIntro}</p>
            <div className="space-y-12">
              {copy.stages.map((s, i) => (
                <div key={i} className="border-t border-white/10 pt-8">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8B923] mb-6">{s.age}</p>
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="font-display text-sm font-bold text-white mb-3">{copy.hereLabel}</p>
                      <p className="macro-body text-sm leading-relaxed">{s.here}</p>
                    </div>
                    <div className="md:border-l md:border-white/10 md:pl-8">
                      <p className="font-display text-sm font-bold text-white/70 mb-3">{copy.thereLabel}</p>
                      <p className="macro-body text-sm leading-relaxed text-white/55">{s.there}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Honest caveats */}
        <RevealSection className="border-b border-white/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="macro-section-title text-white text-2xl mb-8">{copy.caveatTitle}</h2>
            <ul className="space-y-4">
              {copy.caveats.map((c, i) => (
                <li key={i} className="border-t border-white/10 pt-4 macro-body text-sm leading-relaxed text-white/65">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </RevealSection>

        {/* Closing */}
        <RevealSection className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="macro-section-title text-white text-3xl mb-6">{copy.closingTitle}</h2>
            <p className="macro-body text-lg leading-relaxed text-white/80">{copy.closingBody}</p>
          </div>
        </RevealSection>

        <AskAmericaCTA locale={locale} descriptionEn={copyEn.oracle} descriptionRo={copyRo.oracle} />
      </div>
    </>
  );
}
