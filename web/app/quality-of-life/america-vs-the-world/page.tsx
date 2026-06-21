import type { Metadata } from "next";
import React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { MacroStyles, MacroHero } from "@/components/shared/CinematicSystem";
import { RevealSection } from "@/components/shared/Reveal";
import { CountryBarChart } from "@/components/shared/CountryBarChart";
import { PhotoLightboxGrid } from "@/components/shared/PhotoLightboxGrid";
import { SITE_IMAGES } from "@/lib/site-images";
import {
  Building2, ShoppingCart, Stethoscope, Fuel, Package, Briefcase,
  Landmark, Home, GraduationCap, Trophy, Utensils, Plane, Dog,
  Star, Hammer, TreePine,
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
  usCitiesEyebrow: string;
  usCitiesTitle: string;
  usCitiesIntro: string;
  usCities: Array<{ name: string; note: string }>;
  livesEyebrow: string;
  livesTitle: string;
  livesIntro: string;
  hereLabel: string;
  thereLabel: string;
  stages: Array<{ age: string; here: string; there: string }>;
  pairsEyebrow: string;
  pairsTitle: string;
  pairsIntro: string;
  pairs: Array<{ us: string; world: string; note: string }>;
  benchmarksEyebrow: string;
  benchmarksTitle: string;
  benchmarksIntro: string;
  benchmarks: Array<{ region: string; note: string }>;
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
    { icon: Utensils, title: "Dining & Restaurants", body: "Within five miles of any suburb: authentic pho, Tex-Mex refined over generations, ramen, Indian buffets, steakhouses, and a dozen fast-casual chains each optimized by billion-dollar R&D — density and variety at every price point." },
    { icon: Package, title: "Delivery & Logistics", body: "Amazon Prime next-day (often same-day), built on hundreds of fulfillment centers and the UPS/FedEx/USPS backbone. Elsewhere, 'delivery' means a 5–10 day wait and a courier fee." },
    { icon: Hammer, title: "Home-Improvement Ecosystem", body: "Home Depot and Lowe's each stock 30,000–40,000 SKUs, fueling a culture where capital flows continuously into homes — bigger, better-equipped, continuously upgraded because the financing and products both exist." },
    { icon: Dog, title: "The Pet Economy", body: "A ~$150B industry: PetSmart and Petco with in-store vet clinics, grooming, and training; veterinary oncology and surgery at a standard that reflects the country's wider scientific depth." },
    { icon: Star, title: "Customer-Service Culture", body: "Costco's no-questions return policy is an institution. Reinforced by Yelp and Google reviews, businesses compete on satisfaction — the baseline expectation that a problem will simply be fixed." },
    { icon: Plane, title: "Aviation & Airports", body: "Two major international airports per metro, $80–200 domestic flights, TSA PreCheck and Global Entry, and general-aviation fields where middle-class people own small planes — mobility at a scale that reshapes what opportunities are even visible." },
    { icon: TreePine, title: "Outdoor Recreation", body: "Maintained trails, proper campsites with hookups, ranger stations, and Bass Pro / Cabela's superstores — lakes, gulf coast, and national parks within a day's drive, all to a standard that makes the experience effortless." },
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
    { category: "Total tax burden (salary)", us: "~12–22% (Texas: 0% state tax + progressive federal)", them: "41.5% (10% income tax + 35% social contributions)" },
    { category: "New single-family home", us: "~2,400 sq ft, garage, yard", them: "~45–80 m² apartment" },
    { category: "Cars & Pickup trucks (e.g. RAV4 / F-150)", us: "~$28k / ~$38k (huge local market)", them: "~$38k / ~$75k+ (high import duties & VAT)" },
    { category: "Electronics (e.g. iPhone 15 Pro)", us: "$999", them: "~$1,250+ (due to 19% VAT & markups)" },
    { category: "Clothing & Shoes (e.g. Brand sneakers)", us: "~$40–60 (constant outlet discounts)", them: "~$80–110 (full EU pricing & VAT)" },
    { category: "Home appliances (e.g. Widescreen Fridge)", us: "~$800 (large side-by-side)", them: "~$1,100+ (smaller EU models)" },
    { category: "Furniture (e.g. Large sectional sofa)", us: "~$900 (Costco/outlet pricing)", them: "~$1,300+ (imported or thin market)" },
    { category: "Weekly Groceries (similar items)", us: "~$100–130", them: "~$120–150 (expensive dairy/meat)" },
    { category: "Gasoline", us: "~$3 / gallon", them: "~$6 / gallon equiv." },
    { category: "Week of groceries", us: "~2 hours of work", them: "~6–8 hours of work" },
    { category: "Start an LLC", us: "~20 minutes, ~$300", them: "Notary + offices, weeks" },
    { category: "Top hospital", us: "Texas Medical Center, 30 min", them: "Often: travel to Western EU" },
    { category: "Package delivery", us: "Next-day / same-day, free", them: "5–10 days + courier fee" },
    { category: "Restaurant variety (5-mi radius)", us: "Dozens of cuisines", them: "A handful" },
    { category: "Airports per metro", us: "2 international + GA fields", them: "1 regional, few routes" },
    { category: "Credit-card rewards", us: "1.5–5% cash back, perks", them: "Minimal" },
    { category: "Gym membership", us: "~$10–60/mo, resort-grade", them: "Often pricier, thinner market" },
  ],
  usCitiesEyebrow: "MORE US REFERENCE CITIES",
  usCitiesTitle: "The Pattern Isn't One City",
  usCitiesIntro:
    "Beyond north Houston, these metros each show a different dimension of the same American abundance — corporate migration, tech capital, no-income-tax growth, and outdoor-lifestyle booms.",
  usCities: [
    { name: "Dallas–Fort Worth / Frisco, TX", note: "The corporate-relocation magnet — Toyota, Goldman Sachs, Charles Schwab. Frisco is among America's fastest-growing, best-resourced suburbs." },
    { name: "Austin, TX", note: "Apple, Tesla, Oracle, and SpaceX operations — Silicon Valley money meeting the Texas regulatory environment." },
    { name: "Nashville, TN", note: "No state income tax, booming healthcare and tech, exploding suburbs — proof the pattern holds well outside Texas." },
    { name: "Charlotte, NC", note: "A finance hub anchored by Bank of America, one of the fastest-growing major metros, affordable next to the Northeast." },
    { name: "Salt Lake City / Provo, UT", note: "'Silicon Slopes' — world-class outdoor recreation, clean and family-friendly, with a booming tech scene." },
    { name: "Phoenix / Scottsdale, AZ", note: "Sun Belt growth in desert form — master-planned communities, year-round golf, corporate campuses, no state income tax." },
    { name: "Raleigh–Durham, NC", note: "The Research Triangle — three major universities, pharma and biotech, suburban quality of life at still-reasonable prices." },
    { name: "Tampa / Orlando / Jacksonville, FL", note: "The Florida corridor — no state income tax, explosive growth, aerospace, Disney, finance, and waterfront living." },
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
  pairsEyebrow: "TWELVE CITIES, TWO WORLDS",
  pairsTitle: "Same Ambition, City by City",
  pairsIntro:
    "Pair each American city with its closest global counterpart — its sister in role, energy, and ambition — and the institutional gap snaps into focus. These aren't miracle-versus-poverty matchups; they're the same kind of place on two very different platforms.",
  pairs: [
    { us: "The Woodlands / N. Houston, TX", world: "Iași, Romania", note: "The flagship comparison: master-planned suburban excellence against a post-communist university city. The most dramatic gap on the page — the emotional anchor of the whole section." },
    { us: "Frisco / Plano / Dallas, TX", world: "Warsaw, Poland", note: "Both their region's rising star, full of energy and ambition. But Warsaw's wages and institutional ceiling sit in another universe — ambition on a smaller platform." },
    { us: "Austin, TX", world: "Berlin, Germany", note: "Both the 'cool alternative' tech-and-music city. Berlin's bureaucracy is legendary and German taxes punishing; Austin pulled in roughly 10× the venture capital." },
    { us: "Nashville, TN", world: "Manchester, UK", note: "Music cities and healthcare hubs with underdog-to-powerhouse energy. But NHS waits and post-Brexit wage stagnation make Nashville the more viable place to build a career." },
    { us: "Charlotte, NC", world: "Amsterdam, Netherlands", note: "Mid-size banking cities. The Dutch 52% top tax rate and Amsterdam's housing crisis versus Charlotte's still-affordable, explosive growth." },
    { us: "Salt Lake City / Provo, UT", world: "Munich, Germany", note: "Outdoor-recreation capitals with university ecosystems. Munich's housing runs €7,000–12,000/m²; SLC stays affordable under a far lighter tax burden." },
    { us: "Phoenix / Scottsdale, AZ", world: "Dubai, UAE", note: "Engineered desert prosperity. But Dubai offers no path to citizenship and runs on migrant labor without rights — wealth with institutions versus wealth without them." },
    { us: "Raleigh–Durham, NC", world: "Stockholm, Sweden", note: "University-driven innovation ecosystems. Sweden's 50%+ marginal rates and a 10-million-person market versus the Triangle's expansion into a 330-million one." },
    { us: "Tampa / Orlando, FL", world: "Barcelona, Spain", note: "Beloved sunshine cities. But Barcelona carries 25%+ youth unemployment and wages that don't match its cost of living; the Florida corridor runs on no state income tax and explosive job creation." },
    { us: "New York City, NY", world: "London, UK", note: "A century-long rivalry for the title of world's financial center. Post-Brexit the gap widened — NY finance pay now outruns London for the same roles, and talent has shifted visibly westward." },
    { us: "Los Angeles, CA", world: "Sydney, Australia", note: "Sun-drenched creative megacities built around the good life. But Sydney's housing is among the world's least affordable by wage multiples, and the opportunity argument still favors LA despite its dysfunction." },
    { us: "Seattle / Bellevue, WA", world: "Seoul, South Korea", note: "Tech triangles built on anchor giants — Amazon and Microsoft versus Samsung and LG. But Seoul's chaebol rigidity, exam pressure, and housing costs make Bellevue's entrepreneurial path the freer one." },
  ],
  benchmarksEyebrow: "THE REST OF THE WORLD",
  benchmarksTitle: "How the Other Regions Stack Up",
  benchmarksIntro:
    "The honest version of the comparison includes the sophisticated competitors, not just the easy cases. Region by region, the same conclusion keeps surfacing — institutions, not geography or resources, set the ceiling.",
  benchmarks: [
    { region: "Eastern Europe", note: "Prague, Budapest, Sofia, Belgrade, Kyiv, Moldova: even the best post-communist transitions reach only a fraction of US wages, with thin capital markets and EU taxes without EU incomes." },
    { region: "Western Europe", note: "Munich, London, Paris, Amsterdam, Brussels, the Nordics, Switzerland: genuinely good, but 45–60% effective tax burdens, severe housing costs, and private-sector pay below US equivalents. Switzerland is the honest near-tie." },
    { region: "Latin America", note: "São Paulo, Mexico City, Buenos Aires, Medellín: real pockets of world-class infrastructure surrounded by inequality, security costs, and institutional volatility." },
    { region: "Asia-Pacific", note: "Tokyo, Seoul, Shanghai, Bengaluru, Singapore, Sydney: impressive and modern, yet constrained by stagnant wages, weak property rights and surveillance (China), or extreme housing costs (Singapore, Sydney)." },
    { region: "Middle East & Africa", note: "Dubai, Abu Dhabi, Riyadh, Tel Aviv, Cape Town: oil and ambition can buy infrastructure, but not the institutions — citizenship, property rights, security — that let American prosperity compound." },
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
    { icon: Utensils, title: "Restaurante și Gastronomie", body: "La cinci mile de orice suburbie: pho autentic, Tex-Mex rafinat de generații, ramen, bufete indiene, steakhouse-uri și o duzină de lanțuri fast-casual optimizate de departamente de cercetare de miliarde — densitate și varietate la orice preț." },
    { icon: Package, title: "Livrare și Logistică", body: "Amazon Prime a doua zi (adesea în aceeași zi), pe sute de centre de distribuție și coloana vertebrală UPS/FedEx/USPS. În altă parte, „livrarea” înseamnă 5–10 zile de așteptare și o taxă de curier." },
    { icon: Hammer, title: "Ecosistemul de Bricolaj", body: "Home Depot și Lowe's au fiecare 30.000–40.000 de produse, alimentând o cultură în care capitalul curge continuu în locuințe — mai mari, mai bine echipate, îmbunătățite constant pentru că există și finanțarea, și produsele." },
    { icon: Dog, title: "Economia Animalelor de Companie", body: "O industrie de ~150 mld. $: PetSmart și Petco cu clinici veterinare în magazin, toaletaj și dresaj; oncologie și chirurgie veterinară la un standard care reflectă profunzimea științifică a țării." },
    { icon: Star, title: "Cultura Serviciului Clienți", body: "Politica de retur fără întrebări de la Costco este o instituție. Susținute de Yelp și Google, firmele concurează pe satisfacție — așteptarea de bază că o problemă va fi pur și simplu rezolvată." },
    { icon: Plane, title: "Aviație și Aeroporturi", body: "Două aeroporturi internaționale majore per metropolă, zboruri interne de 80–200 $, TSA PreCheck și Global Entry, plus aerodromuri unde clasa de mijloc deține avioane mici — o mobilitate care schimbă ce oportunități sunt vizibile." },
    { icon: TreePine, title: "Recreere în Aer Liber", body: "Trasee întreținute, campinguri cu utilități, posturi de rangeri și superstore-uri Bass Pro / Cabela's — lacuri, coasta golfului și parcuri naționale la o zi de mers cu mașina, toate la un standard care face experiența fără efort." },
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
    { category: "Povara fiscală totală (salariu)", us: "~12–22% (Texas: 0% impozit stat + federal progresiv)", them: "41,5% (10% impozit pe venit + 35% contribuții sociale)" },
    { category: "Casă unifamilială nouă", us: "~214 m², garaj, curte", them: "apartament ~45–80 m²" },
    { category: "Mașini și SUV-uri (ex. RAV4 / F-150)", us: "~28.000$ / ~38.000$ (piață locală uriașă)", them: "~38.000$ / ~75.000$+ (taxe de import și TVA)" },
    { category: "Electronice (ex. iPhone 15 Pro)", us: "999$", them: "~1.250$+ (din cauza TVA 19% și adaosuri)" },
    { category: "Haine și Încălțăminte (ex. adidași brand)", us: "~40–60$ (reduceri constante în outlet)", them: "~80–110$ (prețuri standard UE și TVA)" },
    { category: "Electrocasnice (ex. frigider side-by-side)", us: "~800$ (capacitate mare)", them: "~1.100$+ (modele europene mai mici)" },
    { category: "Mobilă (ex. canapea colțar mare)", us: "~900$ (prețuri Costco / outlet)", them: "~1.300$+ (importată sau ofertă limitată)" },
    { category: "Cumpărături săptămânale (alimente similare)", us: "~100–130$", them: "~120–150$ (lactate și carne scumpe)" },
    { category: "Benzină", us: "~$3 / galon", them: "~$6 / galon echiv." },
    { category: "Cumpărături pe o săptămână", us: "~2 ore de muncă", them: "~6–8 ore de muncă" },
    { category: "Înființare SRL", us: "~20 minute, ~$300", them: "Notar + ghișee, săptămâni" },
    { category: "Spital de top", us: "Texas Medical Center, 30 min", them: "Adesea: deplasare în Vest" },
    { category: "Livrare colete", us: "A doua zi / în aceeași zi, gratuit", them: "5–10 zile + taxă curier" },
    { category: "Varietate restaurante (5 mile)", us: "Zeci de bucătării", them: "Câteva" },
    { category: "Aeroporturi per metropolă", us: "2 internaționale + aerodromuri", them: "1 regional, puține rute" },
    { category: "Recompense card de credit", us: "1,5–5% cashback, beneficii", them: "Minime" },
    { category: "Abonament la sală", us: "~$10–60/lună, nivel resort", them: "Adesea mai scump, piață subțire" },
  ],
  usCitiesEyebrow: "MAI MULTE ORAȘE AMERICANE DE REFERINȚĂ",
  usCitiesTitle: "Tiparul Nu Ține de Un Singur Oraș",
  usCitiesIntro:
    "Dincolo de nordul Houstonului, fiecare dintre aceste metropole arată o altă dimensiune a aceleiași abundențe americane — migrație corporativă, capital tehnologic, creștere fără impozit pe venit și boom-uri ale stilului de viață în aer liber.",
  usCities: [
    { name: "Dallas–Fort Worth / Frisco, TX", note: "Magnetul relocărilor corporative — Toyota, Goldman Sachs, Charles Schwab. Frisco e printre cele mai rapide și mai bine dotate suburbii din America." },
    { name: "Austin, TX", note: "Operațiuni Apple, Tesla, Oracle și SpaceX — banii din Silicon Valley întâlnind mediul de reglementare din Texas." },
    { name: "Nashville, TN", note: "Fără impozit pe venit la nivel de stat, sănătate și tech în plină expansiune, suburbii care explodează — dovada că tiparul ține bine și în afara Texasului." },
    { name: "Charlotte, NC", note: "Un centru financiar ancorat de Bank of America, una dintre cele mai rapide metropole, accesibilă față de Nord-Est." },
    { name: "Salt Lake City / Provo, UT", note: "'Silicon Slopes' — recreere în aer liber de clasă mondială, curată și prietenoasă cu familiile, cu o scenă tech în plin avânt." },
    { name: "Phoenix / Scottsdale, AZ", note: "Creștere de tip Sun Belt în formă de deșert — comunități planificate, golf tot anul, campusuri corporative, fără impozit pe venit." },
    { name: "Raleigh–Durham, NC", note: "Research Triangle — trei universități majore, farma și biotech, calitatea vieții suburbane la prețuri încă rezonabile." },
    { name: "Tampa / Orlando / Jacksonville, FL", note: "Coridorul Floridei — fără impozit pe venit, creștere explozivă, aerospațial, Disney, finanțe și viață la malul apei." },
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
  pairsEyebrow: "DOUĂSPREZECE ORAȘE, DOUĂ LUMI",
  pairsTitle: "Aceeași Ambiție, Oraș cu Oraș",
  pairsIntro:
    "Pune fiecare oraș american alături de omologul său global cel mai apropiat — sora sa ca rol, energie și ambiție — și decalajul instituțional devine clar. Nu sunt confruntări miracol-versus-sărăcie; sunt același tip de loc pe două platforme foarte diferite.",
  pairs: [
    { us: "The Woodlands / N. Houston, TX", world: "Iași, România", note: "Comparația-far: excelență suburbană planificată față de un oraș universitar post-comunist. Cel mai dramatic decalaj de pe pagină — ancora emoțională a întregii secțiuni." },
    { us: "Frisco / Plano / Dallas, TX", world: "Varșovia, Polonia", note: "Ambele, steaua în ascensiune a regiunii lor, pline de energie și ambiție. Dar salariile și plafonul instituțional al Varșoviei sunt în alt univers — ambiție pe o platformă mai mică." },
    { us: "Austin, TX", world: "Berlin, Germania", note: "Ambele, orașul 'alternativ și cool' al tehnologiei și muzicii. Birocrația Berlinului e legendară, iar taxele germane apăsătoare; Austin a atras de circa 10× mai mult capital de risc." },
    { us: "Nashville, TN", world: "Manchester, UK", note: "Orașe ale muzicii și centre medicale cu energie de outsider devenit forță. Dar listele de așteptare NHS și stagnarea salarială post-Brexit fac din Nashville locul mai viabil pentru o carieră." },
    { us: "Charlotte, NC", world: "Amsterdam, Olanda", note: "Orașe bancare de dimensiuni medii. Cota olandeză de 52% și criza locuințelor din Amsterdam versus creșterea explozivă și încă accesibilă din Charlotte." },
    { us: "Salt Lake City / Provo, UT", world: "München, Germania", note: "Capitale ale recreerii în aer liber, cu ecosisteme universitare. Locuințele din München costă 7.000–12.000 €/m²; SLC rămâne accesibil, cu o povară fiscală mult mai mică." },
    { us: "Phoenix / Scottsdale, AZ", world: "Dubai, EAU", note: "Prosperitate inginerească în deșert. Dar Dubai nu oferă cale spre cetățenie și funcționează pe muncă de migranți fără drepturi — bogăție cu instituții versus bogăție fără ele." },
    { us: "Raleigh–Durham, NC", world: "Stockholm, Suedia", note: "Ecosisteme de inovație conduse de universități. Cotele marginale suedeze de peste 50% și o piață de 10 milioane versus extinderea Triangle-ului într-una de 330 de milioane." },
    { us: "Tampa / Orlando, FL", world: "Barcelona, Spania", note: "Orașe iubite, scăldate în soare. Dar Barcelona are peste 25% șomaj în rândul tinerilor și salarii care nu țin pasul cu costul vieții; coridorul Floridei merge pe zero impozit pe venit și creștere explozivă." },
    { us: "New York City, NY", world: "Londra, UK", note: "O rivalitate de un secol pentru titlul de centru financiar mondial. Post-Brexit decalajul s-a lărgit — salariile din finanțe din NY le depășesc pe cele din Londra pentru aceleași roluri, iar talentul s-a mutat vizibil spre vest." },
    { us: "Los Angeles, CA", world: "Sydney, Australia", note: "Megaorașe creative scăldate în soare, construite în jurul vieții bune. Dar locuințele din Sydney sunt printre cele mai inaccesibile din lume ca multiplu salarial, iar argumentul oportunității favorizează LA în ciuda disfuncțiilor sale." },
    { us: "Seattle / Bellevue, WA", world: "Seul, Coreea de Sud", note: "Triunghiuri tech construite pe giganți de ancoră — Amazon și Microsoft versus Samsung și LG. Dar rigiditatea chaebol-urilor, presiunea examenelor și costul locuințelor din Seul fac din calea antreprenorială din Bellevue pe cea mai liberă." },
  ],
  benchmarksEyebrow: "RESTUL LUMII",
  benchmarksTitle: "Cum Se Compară Celelalte Regiuni",
  benchmarksIntro:
    "Versiunea onestă a comparației include competitorii sofisticați, nu doar cazurile ușoare. Regiune cu regiune, aceeași concluzie revine — instituțiile, nu geografia sau resursele, stabilesc plafonul.",
  benchmarks: [
    { region: "Europa de Est", note: "Praga, Budapesta, Sofia, Belgrad, Kiev, Moldova: chiar și cele mai bune tranziții post-comuniste ajung doar la o fracțiune din salariile americane, cu piețe de capital subțiri și taxe UE fără venituri UE." },
    { region: "Europa de Vest", note: "München, Londra, Paris, Amsterdam, Bruxelles, țările nordice, Elveția: chiar bune, dar cu poveri fiscale efective de 45–60%, costuri severe ale locuințelor și salarii din sectorul privat sub echivalentele americane. Elveția e cvasi-egalul onest." },
    { region: "America Latină", note: "São Paulo, Ciudad de México, Buenos Aires, Medellín: insule reale de infrastructură de clasă mondială înconjurate de inegalitate, costuri de securitate și volatilitate instituțională." },
    { region: "Asia-Pacific", note: "Tokyo, Seul, Shanghai, Bengaluru, Singapore, Sydney: impresionante și moderne, dar limitate de salarii stagnante, drepturi de proprietate slabe și supraveghere (China) sau costuri extreme ale locuințelor (Singapore, Sydney)." },
    { region: "Orientul Mijlociu și Africa", note: "Dubai, Abu Dhabi, Riad, Tel Aviv, Cape Town: petrolul și ambiția pot cumpăra infrastructură, dar nu instituțiile — cetățenie, drepturi de proprietate, securitate — care permit prosperității americane să se compună." },
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
        imageSrc="/images/library/Infrastructure/I-110 and I-115 Interchange Los Angeles.jpg"
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

        {/* It's not just Houston — cities */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="macro-eyebrow">{isRo ? "NU DOAR HOUSTON" : "IT'S NOT JUST HOUSTON"}</span>
            <h2 className="macro-section-title text-white text-3xl mt-3 mb-3">
              {isRo ? "Excelență Normală, Repetată" : "Normal Excellence, Repeated"}
            </h2>
            <p className="macro-body text-sm max-w-3xl mb-10">
              {isRo
                ? "The Woodlands nu este o excepție. Același nivel de bază — infrastructură, locuințe, comerț, oportunitate — se repetă în zeci de metropole din tot Sun Belt-ul și dincolo de el. Iată câteva."
                : "The Woodlands is not an exception. The same baseline — infrastructure, housing, retail, opportunity — repeats across dozens of metros throughout the Sun Belt and beyond. A few of them."}
            </p>
            <PhotoLightboxGrid
              gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              sizes="(max-width: 768px) 50vw, 25vw"
              photos={[
                { src: SITE_IMAGES.cities.dallas, alt: "Dallas, Texas skyline", caption: "Dallas, TX", aspect: "4/3" },
                { src: SITE_IMAGES.cities.austin, alt: "Austin, Texas", caption: "Austin, TX", aspect: "4/3" },
                { src: SITE_IMAGES.cities.nashville, alt: "Nashville, Tennessee skyline", caption: "Nashville, TN", aspect: "4/3" },
                { src: SITE_IMAGES.cities.atlanta, alt: "Atlanta, Georgia at sunset", caption: "Atlanta, GA", aspect: "4/3" },
                { src: SITE_IMAGES.cities.chicagoSkyline, alt: "Chicago, Illinois skyline", caption: "Chicago, IL", aspect: "4/3" },
                { src: SITE_IMAGES.cities.seattleDay, alt: "Seattle, Washington by day", caption: "Seattle, WA", aspect: "4/3" },
                { src: SITE_IMAGES.cities.savannah, alt: "Savannah, Georgia historic district", caption: "Savannah, GA", aspect: "4/3" },
                { src: SITE_IMAGES.cities.nycCentralPark, alt: "New York City and Central Park", caption: "New York, NY", aspect: "4/3" },
                { src: SITE_IMAGES.cities.aerialDallasHighway, alt: "Dallas highway interchange from above", caption: isRo ? "Infrastructură — Dallas" : "Infrastructure — Dallas", aspect: "4/3" },
                { src: SITE_IMAGES.cities.aerialChicago, alt: "Aerial view of Chicago", caption: isRo ? "Vedere aeriană — Chicago" : "Aerial — Chicago", aspect: "4/3" },
                { src: SITE_IMAGES.cities.aerialPasadena, alt: "Aerial view of Pasadena, California", caption: "Pasadena, CA", aspect: "4/3" },
                { src: SITE_IMAGES.cities.chicagoTwilight, alt: "Chicago at twilight", caption: isRo ? "Chicago — amurg" : "Chicago — Twilight", aspect: "4/3" },
              ]}
            />

            <div className="mt-16">
              <span className="macro-eyebrow">{copy.usCitiesEyebrow}</span>
              <h3 className="macro-section-title text-white text-2xl mt-3 mb-3">{copy.usCitiesTitle}</h3>
              <p className="macro-body text-sm max-w-3xl mb-10">{copy.usCitiesIntro}</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {copy.usCities.map((c, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/3 p-5">
                    <h4 className="font-display text-base font-bold text-[#E8B923] mb-2 leading-snug">{c.name}</h4>
                    <p className="macro-body text-sm leading-relaxed">{c.note}</p>
                  </div>
                ))}
              </div>
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
                locale={locale}
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
                locale={locale}
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
              <CountryBarChart
                locale={locale}
                title={isRo ? "Preț electricitate rezidențială (¢/kWh) — mai puțin e mai bine" : "Residential electricity price (¢/kWh) — lower is better"}
                subtitle={isRo ? "Preț mediu pentru gospodării." : "Average household rate."}
                source="GlobalPetrolPrices / Eurostat / EIA"
                data={[
                  { label: "Germany", value: 38, display: "38¢" },
                  { label: "United Kingdom", value: 34, display: "34¢" },
                  { label: "Italy", value: 32, display: "32¢" },
                  { label: "Spain", value: 24, display: "24¢" },
                  { label: "Romania", value: 22, display: "22¢" },
                  { label: "France", value: 22, display: "22¢" },
                  { label: "Japan", value: 21, display: "21¢" },
                  { label: "USA", value: 17, display: "17¢", isUS: true },
                ]}
              />
              <CountryBarChart
                locale={locale}
                title={isRo ? "Mărimea medie a locuinței noi (m²)" : "Average new-home size (m²)"}
                source="US Census / national statistics"
                data={[
                  { label: "USA", value: 214, display: "214 m²", isUS: true },
                  { label: "Australia", value: 206, display: "206 m²" },
                  { label: "Canada", value: 181, display: "181 m²" },
                  { label: "Germany", value: 109, display: "109 m²" },
                  { label: "France", value: 112, display: "112 m²" },
                  { label: "Japan", value: 95, display: "95 m²" },
                  { label: "Romania", value: 46, display: "46 m²" },
                  { label: "United Kingdom", value: 76, display: "76 m²" },
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

        {/* Twelve cities, two worlds */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="macro-eyebrow">{copy.pairsEyebrow}</span>
            <h2 className="macro-section-title text-white text-3xl mt-3 mb-3">{copy.pairsTitle}</h2>
            <p className="macro-body text-sm max-w-3xl mb-12">{copy.pairsIntro}</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {copy.pairs.map((p, i) => (
                <div key={i} className="flex flex-col rounded-2xl border border-white/10 bg-white/3 p-6">
                  <div className="mb-4 flex items-center gap-2 text-sm font-display font-bold">
                    <span className="text-[#E8B923]">{p.us}</span>
                    <span className="text-white/30">vs.</span>
                    <span className="text-white/70">{p.world}</span>
                  </div>
                  <p className="macro-body text-sm leading-relaxed">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* The rest of the world — regional benchmarks */}
        <RevealSection className="border-b border-white/5 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <span className="macro-eyebrow">{copy.benchmarksEyebrow}</span>
            <h2 className="macro-section-title text-white text-3xl mt-3 mb-3">{copy.benchmarksTitle}</h2>
            <p className="macro-body text-sm max-w-3xl mb-10">{copy.benchmarksIntro}</p>
            <div className="space-y-6">
              {copy.benchmarks.map((b, i) => (
                <div key={i} className="grid gap-2 border-t border-white/10 pt-6 md:grid-cols-4">
                  <h3 className="font-display text-base font-bold text-[#E8B923] md:col-span-1">{b.region}</h3>
                  <p className="macro-body text-sm leading-relaxed md:col-span-3">{b.note}</p>
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
