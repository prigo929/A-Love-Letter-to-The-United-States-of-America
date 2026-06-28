// ─── Natural Resources — The Visual Record ────────────────────────────────────
// A curated photo gallery for /natural-resources, grouped into four themes:
// Oil & Energy, Agriculture, Mining & Minerals, Water & Timber. Images are
// imported directly as StaticImageData (automatic dimensions + blur). Bilingual
// captions resolve via getResourceGallery(locale), matching the site pattern.

import type { StaticImageData } from "next/image";
import type { Locale } from "@/lib/i18n/config";

// Oil & Energy
import oilSpindletop from "@/IMAGES/Nature/Resources/Gallery/oil-spindletop-1901.jpg";
import oilTransAlaska from "@/IMAGES/Nature/Resources/Gallery/oil-trans-alaska-pipeline.jpg";
import oilPermian from "@/IMAGES/Nature/Resources/Gallery/oil-permian-fracking.jpg";
import oilStandard from "@/IMAGES/Nature/Resources/Gallery/oil-standard-oil-refinery.jpg";
import oilGulf from "@/IMAGES/Nature/Resources/Gallery/oil-gulf-offshore-rig.jpg";
import oilSpr from "@/IMAGES/Nature/Resources/Gallery/oil-spr-louisiana.jpg";
import oilSabine from "@/IMAGES/Nature/Resources/Gallery/oil-sabine-pass-lng.jpg";
import oilRoughnecks from "@/IMAGES/Nature/Resources/Gallery/oil-roughnecks-1920s.jpg";
// Agriculture
import agReaper from "@/IMAGES/Nature/Resources/Gallery/ag-mccormick-reaper.jpg";
import agCattle from "@/IMAGES/Nature/Resources/Gallery/ag-king-ranch-cattle.jpg";
import agElevators from "@/IMAGES/Nature/Resources/Gallery/ag-grain-elevators.jpg";
import agCornAerial from "@/IMAGES/Nature/Resources/Gallery/ag-corn-aerial.jpg";
import agJohnDeere from "@/IMAGES/Nature/Resources/Gallery/ag-john-deere-d.jpg";
import agBarges from "@/IMAGES/Nature/Resources/Gallery/ag-mississippi-barges.jpg";
import agCombine from "@/IMAGES/Nature/Resources/Gallery/ag-combine-console.jpg";
import agBorlaug from "@/IMAGES/Nature/Resources/Gallery/ag-norman-borlaug.jpg";
// Mining & Minerals
import minSutters from "@/IMAGES/Nature/Resources/Gallery/min-sutters-mill.jpg";
import minBingham from "@/IMAGES/Nature/Resources/resources-minerals-bingham-canyon.jpg";
import minMesabi from "@/IMAGES/Nature/Resources/Gallery/min-mesabi-range.jpg";
import minCoal from "@/IMAGES/Nature/Resources/Gallery/min-appalachia-coal.jpg";
import minMountainPass from "@/IMAGES/Nature/Resources/Gallery/min-mountain-pass.jpg";
import minHomestake from "@/IMAGES/Nature/Resources/Gallery/min-homestake-gold.jpg";
import minPowderRiver from "@/IMAGES/Nature/Resources/Gallery/min-powder-river-coal-train.jpg";
import minAnaconda from "@/IMAGES/Nature/Resources/Gallery/min-anaconda-smelter.jpg";
// Water & Timber
import wtHoover from "@/IMAGES/Nature/Resources/Gallery/wt-hoover-construction.jpg";
import wtLogging from "@/IMAGES/Nature/Resources/Gallery/wt-pnw-logging.jpg";
import wtCoulee from "@/IMAGES/Nature/Resources/Gallery/wt-grand-coulee.jpg";
import wtErie from "@/IMAGES/Nature/Resources/Gallery/wt-erie-canal.jpg";
import wtTimber from "@/IMAGES/Nature/Resources/Gallery/wt-timberlands.jpg";
import wtAqueduct from "@/IMAGES/Nature/Resources/Gallery/wt-california-aqueduct.jpg";
import wtDonkey from "@/IMAGES/Nature/Resources/Gallery/wt-steam-donkey.jpg";
import wtGlen from "@/IMAGES/Nature/Resources/Gallery/wt-glen-canyon.jpg";

export interface GalleryPhoto {
  id: string;
  title: string;
  year: string;
  location: string;
  caption: string;
  image: StaticImageData;
}
export interface GalleryCategory {
  id: string;
  title: string;
  photos: GalleryPhoto[];
}

export function getResourceGallery(locale: Locale): GalleryCategory[] {
  const ro = locale === "ro";
  return [
    {
      id: "oil-energy",
      title: ro ? "Petrol & Energie" : "Oil & Energy",
      photos: [
        { id: "spindletop", image: oilSpindletop, year: "1901", title: ro ? "Erupția de la Spindletop" : "The Spindletop Gusher", location: "Beaumont, Texas",
          caption: ro ? "Marea descoperire petrolieră din Texas care a dat naștere industriei petroliere moderne, spărgând monopolurile globale și alimentând secolul american cu petrol ieftin și abundent." : "The massive Texas strike that birthed the modern petroleum industry, breaking global energy monopolies and fueling the American century with cheap, abundant domestic oil." },
        { id: "trans-alaska", image: oilTransAlaska, year: "1977", title: ro ? "Conducta Trans-Alaska" : "The Trans-Alaska Pipeline", location: "Alaska",
          caption: ro ? "1.300 km de conductă de oțel peste tundra înghețată și lanțuri muntoase — un triumf logistic care a asigurat independența energetică în timpul embargourilor OPEC." : "800 miles of steel pipe across frozen tundra and mountain ranges — a logistical triumph that secured American energy independence during the OPEC embargoes." },
        { id: "permian", image: oilPermian, year: ro ? "Prezent" : "Present", title: ro ? "Boom-ul Șisturilor din Permian" : "The Permian Basin Shale Boom", location: "Texas",
          caption: ro ? "Apogeul revoluției șisturilor: ingineria privată care a spulberat teoria «vârfului petrolier» și a reașezat SUA drept superputerea energetică globală." : "The peak of the shale revolution: brilliant private-sector engineering that shattered 'peak oil' and re-established the U.S. as the undisputed global energy superpower." },
        { id: "standard-oil", image: oilStandard, year: "c. 1890", title: ro ? "Rafinăriile Standard Oil" : "Standard Oil Refineries", location: "Cleveland, Ohio",
          caption: ro ? "Complexul lui Rockefeller a standardizat kerosenul, a prăbușit prețurile și a luminat lumea — imaginea definitorie a capitalismului american hiper-eficient." : "Rockefeller's sprawling complex standardized kerosene, drove down prices, and lit the world — the definitive image of hyper-efficient American capitalism." },
        { id: "gulf", image: oilGulf, year: "c. 1980", title: ro ? "Foraj Offshore în Golf" : "Offshore Drilling in the Gulf", location: ro ? "Golful Mexic" : "Gulf of Mexico",
          caption: ro ? "Platforme de mare adâncime sfidând elementele extreme pentru a extrage țiței — un triumf al asumării de riscuri din sectorul privat și al ingineriei mecanice." : "Massive deepwater platforms defying extreme elements to extract crude — a triumph of private-sector risk-taking and mechanical engineering." },
        { id: "spr", image: oilSpr, year: "1977", title: ro ? "Rezerva Strategică de Petrol" : "The Strategic Petroleum Reserve", location: "Louisiana",
          caption: ro ? "Caverne subterane de sare ce stochează milioane de barili de țiței — atuul suprem de securitate națională împotriva cartelurilor străine volatile." : "Vast underground salt caverns storing millions of barrels of crude — the ultimate national-security asset shielding the economy from volatile foreign cartels." },
        { id: "sabine", image: oilSabine, year: "2016", title: ro ? "Primul Export de GNL, Sabine Pass" : "First LNG Export, Sabine Pass", location: "Texas",
          caption: ro ? "Momentul exact în care America a trecut de la dependență energetică la exportul agresiv de gaz natural către aliați, subminând monopolurile rivale." : "The exact moment America pivoted from energy dependence to aggressively exporting natural gas to allies, directly undercutting rival monopolies." },
        { id: "roughnecks", image: oilRoughnecks, year: "c. 1939", title: ro ? "Sondori pe o Sondă din Texas" : "Roughnecks on a Texas Derrick", location: "Texas",
          caption: ro ? "Forța de muncă aspră și neînfricată care alimentează cu adevărat economia modernă — muncitori îmbibați de petrol luptându-se cu fierul greu." : "The gritty, unapologetic labor force that actually powers the modern economy — oil-soaked workers wrestling heavy iron." },
      ],
    },
    {
      id: "agriculture",
      title: ro ? "Agricultură" : "Agriculture",
      photos: [
        { id: "reaper", image: agReaper, year: "c. 1890", title: ro ? "Secerătoarea McCormick" : "The McCormick Reaper", location: ro ? "Statele Unite" : "United States",
          caption: ro ? "Revoluția mecanică a recoltei — ingineria americană care a înlăturat amenințarea foametei în masă și a eliberat milioane de oameni pentru revoluția industrială." : "The mechanical revolution of the harvest that destroyed the threat of mass famine and freed millions to fuel the industrial revolution." },
        { id: "cattle", image: agCattle, year: "c. 1890", title: ro ? "Mânarea Vitelor" : "The American Cattle Drive", location: ro ? "Vestul SUA" : "Western U.S.",
          caption: ro ? "Cowboy lucrând pe câmpul deschis — imaginea prin excelență a producției americane de carne și a scării necesare pentru a hrăni o națiune în plină expansiune." : "Cowboys working the open range — the quintessential image of American beef production and the rugged scale required to feed a booming nation." },
        { id: "elevators", image: agElevators, year: "c. 1920", title: ro ? "Silozuri de Cereale" : "Grain Elevators", location: ro ? "Marile Lacuri" : "Great Lakes",
          caption: ro ? "Silozuri masive de beton deasupra căilor ferate și apei, unde cerealele brute din Midwest întâlneau piețele financiare pentru a stabili prețurile globale ale hranei." : "Massive concrete silos towering over rail and water, where raw Midwest grain met the financial markets to set global food prices." },
        { id: "corn-belt", image: agCornAerial, year: ro ? "Prezent" : "Present", title: ro ? "Centura Porumbului" : "The Corn Belt", location: "Iowa",
          caption: ro ? "Cel mai productiv și mai bogat bloc contiguu de teren agricol din istoria omenirii — o mărturie a drepturilor de proprietate și a agriculturii științifice." : "The most productive, highest-yielding contiguous block of agricultural land in human history — a testament to property rights and scientific farming." },
        { id: "john-deere", image: agJohnDeere, year: "1923", title: ro ? "Tractorul John Deere Model D" : "The John Deere Model D", location: ro ? "Statele Unite" : "United States",
          caption: ro ? "Mașina robustă, produsă în masă, care a înlocuit definitiv calul — o inovație de piață liberă ce a multiplicat radical recoltele." : "The rugged, mass-produced machine that permanently replaced the horse — a free-market innovation that radically multiplied crop yields." },
        { id: "barges", image: agBarges, year: ro ? "Prezent" : "Present", title: ro ? "Barje pe Calea Navigabilă" : "Barges on the Inland Waterway", location: "Mississippi",
          caption: ro ? "Remorchere împingând cereale din Midwest spre Golf — cel mai eficient și mai integrat lanț de aprovizionare agricol din lume." : "Towboats pushing Midwest grain and soy down to the Gulf — the most cost-efficient, naturally integrated agricultural supply chain in the world." },
        { id: "combine", image: agCombine, year: ro ? "Prezent" : "Present", title: ro ? "Recolta cu Combina" : "The Combine Harvest", location: "Kansas",
          caption: ro ? "Combine recoltând un câmp de grâu cu precizia unei operațiuni militare, pe proprietate privată, peste Marile Câmpii deschise." : "Combines reap a wheat field with the precision of a military operation — farming on private property across the open Plains." },
        { id: "borlaug", image: agBorlaug, year: "1970", title: "Norman Borlaug", location: ro ? "Statele Unite" : "United States",
          caption: ro ? "Agronomul american care a creat grâul pitic, salvând un miliard de vieți și spulberând predicțiile malthusiene ale înfometării în masă. Premiul Nobel pentru Pace, 1970." : "The American agronomist who engineered dwarf wheat, saving a billion lives and destroying Malthusian doomsday predictions of mass starvation. Nobel Peace Prize, 1970." },
      ],
    },
    {
      id: "mining",
      title: ro ? "Minerit & Minerale" : "Mining & Minerals",
      photos: [
        { id: "forty-niner", image: minSutters, year: "1849", title: ro ? "Căutătorul de Aur" : "The Forty-Niner", location: ro ? "California" : "California",
          caption: ro ? "Migrația antreprenorială cu risc ridicat și recompensă mare a Goanei după Aur, care a colonizat rapid Vestul american." : "The ultimate high-risk, high-reward entrepreneurial migration of the Gold Rush that rapidly settled the American West." },
        { id: "bingham", image: minBingham, year: ro ? "Prezent" : "Present", title: ro ? "Mina Bingham Canyon" : "The Bingham Canyon Mine", location: "Utah",
          caption: ro ? "Cea mai mare excavație artificială de pe Pământ — o mină de cupru terasată ce furnizează materialul de bază pentru a cabla rețeaua electrică globală și a alimenta era digitală." : "The largest man-made excavation on Earth — a terraced copper mine providing the bedrock material to wire the global grid and power the digital age." },
        { id: "mesabi", image: minMesabi, year: "c. 1900", title: ro ? "Lanțul de Fier Mesabi" : "The Mesabi Iron Range", location: "Minnesota",
          caption: ro ? "Extracția grea, industrială, care a alimentat furnalele din Pittsburgh și a construit literalmente scheletul de oțel al Americii moderne." : "The raw, heavy-industrial extraction that fed the blast furnaces of Pittsburgh and literally built the steel skeleton of modern America." },
        { id: "coal", image: minCoal, year: "1902", title: ro ? "Cărbunele din Appalachia" : "Coal of Appalachia", location: ro ? "Pennsylvania" : "Pennsylvania",
          caption: ro ? "Coloana vertebrală muncitorească a revoluției industriale, furnizând energia ieftină și densă care punea în mișcare fabricile și căile ferate." : "The gritty, blue-collar backbone of the industrial revolution, supplying the cheap, high-density power that ran the factories and rail networks." },
        { id: "mountain-pass", image: minMountainPass, year: ro ? "Prezent" : "Present", title: ro ? "Mina de Pământuri Rare Mountain Pass" : "The Mountain Pass Rare Earth Mine", location: ro ? "California" : "California",
          caption: ro ? "Reînvierea extracției interne de pământuri rare — o pivotare strategică pentru a rupe monopolul străin asupra mineralelor cerute de tehnologia și apărarea moderne." : "Reviving domestic rare-earth extraction — a critical strategic pivot to break the foreign monopoly on the minerals required for modern tech and defense systems." },
        { id: "homestake", image: minHomestake, year: "c. 1890", title: ro ? "Mina de Aur Homestake" : "The Homestake Gold Mine", location: "Lead, South Dakota",
          caption: ro ? "Cea mai adâncă și mai mare mină de aur din America de Nord — extracție de avuție cu risc ridicat, ce a susținut dolarul și a alimentat expansiunea economică." : "The deepest, largest gold mine in North America — pure, high-risk wealth extraction that backed the American dollar and fueled economic expansion." },
        { id: "powder-river", image: minPowderRiver, year: ro ? "Prezent" : "Present", title: ro ? "Cărbunele din Powder River" : "Powder River Coal", location: "Wyoming",
          caption: ro ? "Trenuri-unitate de peste o sută de vagoane traversând câmpiile — sursa de energie de bază, de mare densitate, care menține fiabil rețeaua electrică americană în funcțiune." : "Unit trains over a hundred cars long stretching across the plains — the high-density baseline energy that reliably keeps the American grid online." },
        { id: "anaconda", image: minAnaconda, year: "1919", title: ro ? "Coșul Topitoriei Anaconda" : "The Anaconda Smelter Stack", location: "Montana",
          caption: ro ? "Cea mai înaltă structură de zidărie din lume — un monument al scării industriei americane a cuprului care a furnizat firul pentru electrificarea națiunii." : "The tallest masonry structure in the world — a monument to the sheer scale of the American copper industry that physically wired the nation." },
      ],
    },
    {
      id: "water-timber",
      title: ro ? "Apă & Cherestea" : "Water & Timber",
      photos: [
        { id: "hoover", image: wtHoover, year: "1931–1936", title: ro ? "Construcția Barajului Hoover" : "Building the Hoover Dam", location: ro ? "Black Canyon" : "Black Canyon",
          caption: ro ? "Cățărători de mare altitudine deasupra râului Colorado — victoria supremă a ingineriei americane îmblânzind un mediu ostil în energie și irigații." : "High-scalers above the Colorado — the ultimate victory of American engineering taming a hostile river into hydroelectric power and irrigation." },
        { id: "logging", image: wtLogging, year: "c. 1900", title: ro ? "Exploatarea Pacificului de Nord-Vest" : "Logging the Pacific Northwest", location: ro ? "Washington" : "Washington",
          caption: ro ? "Tăietori de lemne lângă un brad Douglas uriaș — rezervele aparent nesfârșite de cherestea care au construit milioane de case americane accesibile." : "Lumberjacks beside a massive Douglas fir — the seemingly endless timber reserves milled to build millions of affordable homes across the continent." },
        { id: "coulee", image: wtCoulee, year: "1942", title: ro ? "Barajul Grand Coulee" : "The Grand Coulee Dam", location: ro ? "Râul Columbia" : "Columbia River",
          caption: ro ? "Energie imensă și ieftină care a alimentat topitoriile de aluminiu ce au construit avioanele americane în al Doilea Război Mondial." : "Immense, cheap electrical power that ran the aluminum smelters which built American aircraft during World War II." },
        { id: "erie", image: wtErie, year: "c. 1855", title: ro ? "Canalul Erie la Lockport" : "The Erie Canal at Lockport", location: ro ? "New York" : "New York",
          caption: ro ? "Infrastructura timpurie vitală care a conectat resursele Marilor Lacuri de Oceanul Atlantic, transformând New York-ul într-un imperiu comercial global." : "The vital early infrastructure that connected the Great Lakes' resources to the Atlantic, instantly transforming New York into a global commercial empire." },
        { id: "timberlands", image: wtTimber, year: ro ? "Prezent" : "Present", title: ro ? "Păduri Gestionate Privat" : "Managed Timberlands", location: ro ? "Pacificul de Nord-Vest" : "Pacific Northwest",
          caption: ro ? "Păduri private gestionate pentru profit — dovada că replantarea durabilă și gospodărirea terenului prosperă sub proprietate privată." : "Actively managed, privately owned forests — proof that profit-driven stewardship and sustainable replanting thrive under private ownership." },
        { id: "aqueduct", image: wtAqueduct, year: ro ? "Prezent" : "Present", title: ro ? "Apeductul Californiei" : "The California Aqueduct", location: ro ? "Valea Centrală" : "Central Valley",
          caption: ro ? "Canale de beton sfidând geografia pentru a muta apa sute de kilometri, transformând un deșert arid în cel mai productiv motor agricol de pe planetă." : "Concrete channels defying geography to move water hundreds of miles, transforming an arid desert into the most productive agricultural engine on the planet." },
        { id: "donkey", image: wtDonkey, year: "c. 1890", title: ro ? "Motoare cu Abur în Sequoia" : "Steam Donkeys in the Redwoods", location: ro ? "California" : "California",
          caption: ro ? "Mușchiul mecanic al troliilor cu abur care a permis tăietorilor să extindă operațiunile și să construiască frontiera vestică în expansiune." : "The mechanical muscle of steam winches that allowed lumberjacks to scale up operations and build the expanding Western frontier." },
        { id: "glen-canyon", image: wtGlen, year: "1966", title: ro ? "Barajul Glen Canyon" : "The Glen Canyon Dam", location: ro ? "Arizona" : "Arizona",
          caption: ro ? "Reținând Lacul Powell — o fortăreață hidroelectrică și de stocare a apei care susține Sud-Vestul american împotriva ciclurilor naturale de secetă." : "Holding back Lake Powell — a hydroelectric and water-storage fortress that sustains the American Southwest against natural drought cycles." },
      ],
    },
  ];
}
