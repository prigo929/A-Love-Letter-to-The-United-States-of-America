// ─── Infrastructure Network Data ──────────────────────────────────────────────
// Geometry + bilingual content for the interactive continental network maps
// (Interstate Highways, Continental Rail, Aviation Hubs).
//
// Waypoints are real [longitude, latitude] pairs for the cities each corridor
// actually passes through: routes are drawn as simplified polylines through
// them on a geoAlbersUsa projection, not surveyed alignments.
//
// Every statistic here is a well-documented published figure (FHWA, AAR, ACI
// airport rankings). Where a number is an estimate, the copy says so.

export type LngLat = [number, number];

export interface NetworkEra {
  id: string;
  label: { en: string; ro: string };
  sublabel: { en: string; ro: string };
}

export interface NetworkRoute {
  id: string;
  era: string;
  name: { en: string; ro: string };
  color: string;
  /** Dashed rendering for historic/decommissioned routes. */
  dashed?: boolean;
  waypoints: LngLat[];
  endpoints: { en: string; ro: string };
  /** e.g. "3,020 mi" */
  lengthLabel: string;
  /** Year opened / designated. */
  year: string;
  description: { en: string; ro: string };
}

export interface MapNode {
  id: string;
  name: string;
  coordinates: LngLat;
  /** Emphasised node (bigger dot + label always visible). */
  major?: boolean;
}

// ─── Shared city coordinates ──────────────────────────────────────────────────
const C: Record<string, LngLat> = {
  nyc: [-74.006, 40.713], philadelphia: [-75.165, 39.953], pittsburgh: [-79.996, 40.441],
  boston: [-71.06, 42.36], albany: [-73.76, 42.65], buffalo: [-78.88, 42.89],
  cleveland: [-81.69, 41.5], toledo: [-83.55, 41.65], southBend: [-86.25, 41.68],
  fortWayne: [-85.14, 41.08], chicago: [-87.63, 41.88], madison: [-89.4, 43.07],
  minneapolis: [-93.27, 44.98], fargo: [-96.79, 46.88], minot: [-101.29, 48.23],
  whitefish: [-114.36, 48.41], spokane: [-117.43, 47.66], seattle: [-122.33, 47.61],
  siouxFalls: [-96.73, 43.55], rapidCity: [-103.23, 44.08], billings: [-108.5, 45.78],
  butte: [-112.54, 46.0], missoula: [-113.99, 46.87],
  desMoines: [-93.62, 41.59], omaha: [-95.94, 41.26], northPlatte: [-100.77, 41.12],
  cheyenne: [-104.82, 41.14], laramie: [-105.59, 41.31], ogden: [-111.97, 41.22],
  promontory: [-112.55, 41.62], saltLake: [-111.89, 40.76], elko: [-115.76, 40.83],
  reno: [-119.81, 39.53], sacramento: [-121.49, 38.58], sanFrancisco: [-122.42, 37.77],
  oakland: [-122.27, 37.8],
  stLouis: [-90.2, 38.63], springfieldMO: [-93.29, 37.21], tulsa: [-95.99, 36.15],
  oklahomaCity: [-97.52, 35.47], amarillo: [-101.83, 35.19], albuquerque: [-106.65, 35.08],
  gallup: [-108.74, 35.53], flagstaff: [-111.65, 35.2], kingman: [-114.05, 35.19],
  needles: [-114.61, 34.85], barstow: [-117.02, 34.9], losAngeles: [-118.24, 34.05],
  santaMonica: [-118.49, 34.02],
  jacksonville: [-81.66, 30.33], tallahassee: [-84.28, 30.44], mobile: [-88.04, 30.69],
  newOrleans: [-90.07, 29.95], batonRouge: [-91.15, 30.45], houston: [-95.37, 29.76],
  sanAntonio: [-98.49, 29.42], elPaso: [-106.49, 31.76], tucson: [-110.97, 32.22],
  phoenix: [-112.07, 33.45],
  miami: [-80.19, 25.76], savannah: [-81.1, 32.08], richmond: [-77.44, 37.54],
  washington: [-77.04, 38.91], baltimore: [-76.61, 39.29], portlandME: [-70.26, 43.66],
  houlton: [-67.84, 46.13],
  sanDiego: [-117.16, 32.72], portlandOR: [-122.68, 45.52], blaine: [-122.75, 48.99],
  columbus: [-83.0, 39.96], indianapolis: [-86.16, 39.77], kansasCity: [-94.58, 39.1],
  topeka: [-95.68, 39.05], denver: [-104.99, 39.74], coveFort: [-112.58, 38.6],
  littleRock: [-92.29, 34.75], memphis: [-90.05, 35.15], nashville: [-86.78, 36.16],
  knoxville: [-83.92, 35.96], asheville: [-82.55, 35.6], wilmingtonNC: [-77.95, 34.23],
  clovis: [-103.2, 34.4], belen: [-106.78, 34.66], wichita: [-97.34, 37.69],
  laJunta: [-103.54, 37.99], stPaul: [-93.09, 44.95], bismarck: [-100.78, 46.81],
  havre: [-109.68, 48.55], pasco: [-119.1, 46.24], stockton: [-121.29, 37.96],
  milwaukee: [-87.906, 43.039], dallas: [-96.797, 32.776], fortWorth: [-97.331, 32.755],
  austin: [-97.743, 30.267], charlotte: [-80.843, 35.227], birmingham: [-86.81, 33.52],
  cincinnati: [-84.512, 39.103], charlottesville: [-78.476, 38.029], jackson: [-90.184, 32.298],
  atlanta: [-84.39, 33.75],
};

// ═══════════════════════════════════════════════════════════════════════════════
// HIGHWAYS
// ═══════════════════════════════════════════════════════════════════════════════

export const HIGHWAY_ERAS: NetworkEra[] = [
  {
    id: "trails",
    label: { en: "The Named Trails", ro: "Drumurile cu nume" },
    sublabel: { en: "1913 – 1926", ro: "1913 – 1926" },
  },
  {
    id: "interstate",
    label: { en: "The Interstate System", ro: "Sistemul Interstatal" },
    sublabel: { en: "1956 – today", ro: "1956 – prezent" },
  },
];

export const HIGHWAY_ROUTES: NetworkRoute[] = [
  {
    id: "lincoln",
    era: "trails",
    name: { en: "The Lincoln Highway", ro: "Autostrada Lincoln" },
    color: "#fbbf24",
    dashed: true,
    waypoints: [C.nyc, C.philadelphia, C.pittsburgh, C.fortWayne, C.chicago, C.desMoines, C.omaha, C.cheyenne, C.saltLake, C.elko, C.reno, C.sacramento, C.sanFrancisco],
    endpoints: { en: "New York → San Francisco", ro: "New York → San Francisco" },
    lengthLabel: "≈3,400 mi",
    year: "1913",
    description: {
      en: "America's first coast-to-coast automobile road, stitched together from dirt tracks and county lanes a decade before numbered highways existed. Driving it took weeks, and proved a continent could be crossed by car.",
      ro: "Primul drum auto de la o coastă la alta a Americii, cusut din drumuri de pământ și ulițe de comitat, cu un deceniu înaintea autostrăzilor numerotate. Traversarea dura săptămâni, dar a dovedit că un continent poate fi străbătut cu mașina.",
    },
  },
  {
    id: "route66",
    era: "trails",
    name: { en: "U.S. Route 66: The Mother Road", ro: "U.S. Route 66: Drumul-Mamă" },
    color: "#f87171",
    dashed: true,
    waypoints: [C.chicago, C.stLouis, C.springfieldMO, C.tulsa, C.oklahomaCity, C.amarillo, C.albuquerque, C.flagstaff, C.kingman, C.barstow, C.santaMonica],
    endpoints: { en: "Chicago → Santa Monica", ro: "Chicago → Santa Monica" },
    lengthLabel: "2,448 mi",
    year: "1926",
    description: {
      en: "The road of the Dust Bowl migration and the great postwar vacation: Steinbeck named it the Mother Road. Bypassed mile by mile by the Interstates, it was formally decommissioned in 1985 and promptly became immortal.",
      ro: "Drumul migrației din Dust Bowl și al marilor vacanțe postbelice: Steinbeck l-a numit Drumul-Mamă. Ocolit milă cu milă de autostrăzile interstatale, a fost desființat oficial în 1985 și a devenit imediat nemuritor.",
    },
  },
  {
    id: "i90",
    era: "interstate",
    name: { en: "Interstate 90", ro: "Interstatala 90" },
    color: "#60a5fa",
    waypoints: [C.boston, C.albany, C.buffalo, C.cleveland, C.toledo, C.chicago, C.madison, C.siouxFalls, C.rapidCity, C.billings, C.butte, C.missoula, C.spokane, C.seattle],
    endpoints: { en: "Boston → Seattle", ro: "Boston → Seattle" },
    lengthLabel: "3,020 mi",
    year: "1956–1992",
    description: {
      en: "The longest Interstate: an unbroken freeway from the Atlantic to Puget Sound. Its final gap, floating bridges across Lake Washington and a tunnel under Mount Baker Ridge, closed only in the 1990s.",
      ro: "Cea mai lungă interstatală: o autostradă neîntreruptă de la Atlantic până la Puget Sound. Ultima sa breșă, podurile plutitoare peste lacul Washington și un tunel pe sub Mount Baker Ridge, s-a închis abia în anii 1990.",
    },
  },
  {
    id: "i80",
    era: "interstate",
    name: { en: "Interstate 80", ro: "Interstatala 80" },
    color: "#fbbf24",
    waypoints: [C.nyc, C.cleveland, C.toledo, C.chicago, C.desMoines, C.omaha, C.cheyenne, C.saltLake, C.elko, C.reno, C.sacramento, C.sanFrancisco],
    endpoints: { en: "New York area → San Francisco", ro: "Zona New York → San Francisco" },
    lengthLabel: "2,899 mi",
    year: "1956–1986",
    description: {
      en: "The heir of the Lincoln Highway and the Overland Trail: the central artery of the continent. Across Wyoming and Nevada it runs beside the original transcontinental railroad grade of 1869.",
      ro: "Moștenitoarea Autostrăzii Lincoln și a traseului Overland: artera centrală a continentului. Prin Wyoming și Nevada merge chiar pe lângă terasamentul primei căi ferate transcontinentale din 1869.",
    },
  },
  {
    id: "i40",
    era: "interstate",
    name: { en: "Interstate 40", ro: "Interstatala 40" },
    color: "#f87171",
    waypoints: [C.barstow, C.kingman, C.flagstaff, C.albuquerque, C.amarillo, C.oklahomaCity, C.littleRock, C.memphis, C.nashville, C.knoxville, C.asheville, C.wilmingtonNC],
    endpoints: { en: "Barstow → Wilmington, NC", ro: "Barstow → Wilmington, NC" },
    lengthLabel: "2,556 mi",
    year: "1957–1990",
    description: {
      en: "The road that replaced Route 66 across the Southwest, then kept going east through the Appalachians to the Atlantic. One of the nation's heaviest long-haul trucking corridors.",
      ro: "Drumul care a înlocuit Route 66 prin sud-vest, apoi a continuat spre est, prin Appalachi, până la Atlantic. Unul dintre cele mai încărcate coridoare de transport rutier de cursă lungă din țară.",
    },
  },
  {
    id: "i10",
    era: "interstate",
    name: { en: "Interstate 10", ro: "Interstatala 10" },
    color: "#34d399",
    waypoints: [C.santaMonica, C.phoenix, C.tucson, C.elPaso, C.sanAntonio, C.houston, C.batonRouge, C.newOrleans, C.mobile, C.tallahassee, C.jacksonville],
    endpoints: { en: "Santa Monica → Jacksonville", ro: "Santa Monica → Jacksonville" },
    lengthLabel: "2,460 mi",
    year: "1957–1990",
    description: {
      en: "The southern transcontinental: desert, border country, oil coast and Gulf swamps in one continuous ribbon. In Houston it widens to twenty-six lanes, among the widest freeways on Earth.",
      ro: "Transcontinentala sudică: deșert, ținut de frontieră, coasta petrolului și mlaștinile Golfului într-o singură panglică. La Houston se lărgește la douăzeci și șase de benzi, printre cele mai late autostrăzi de pe Pământ.",
    },
  },
  {
    id: "i95",
    era: "interstate",
    name: { en: "Interstate 95", ro: "Interstatala 95" },
    color: "#a78bfa",
    waypoints: [C.miami, C.jacksonville, C.savannah, C.richmond, C.washington, C.baltimore, C.philadelphia, C.nyc, C.boston, C.portlandME, C.houlton],
    endpoints: { en: "Miami → Houlton, Maine", ro: "Miami → Houlton, Maine" },
    lengthLabel: "1,908 mi",
    year: "1957–2018",
    description: {
      en: "The spine of the Eastern Seaboard, threading fifteen states and the capital: the busiest, most economically loaded corridor in the Western Hemisphere. Its last missing link, in Pennsylvania, opened only in 2018.",
      ro: "Coloana vertebrală a coastei de est, traversând cincisprezece state și capitala: cel mai aglomerat și mai încărcat economic coridor din emisfera vestică. Ultima sa verigă lipsă, în Pennsylvania, s-a deschis abia în 2018.",
    },
  },
  {
    id: "i70",
    era: "interstate",
    name: { en: "Interstate 70", ro: "Interstatala 70" },
    color: "#fb923c",
    waypoints: [C.baltimore, C.pittsburgh, C.columbus, C.indianapolis, C.stLouis, C.kansasCity, C.topeka, C.denver, C.coveFort],
    endpoints: { en: "Baltimore → Cove Fort, Utah", ro: "Baltimore → Cove Fort, Utah" },
    lengthLabel: "2,153 mi",
    year: "1956–1992",
    description: {
      en: "Where the System began: the first contracts of 1956 were let on I-70 in Missouri and Kansas. It crests the Rockies at 11,158 feet in the Eisenhower Tunnel and ends through Glenwood Canyon, the System's final and most beautiful mile.",
      ro: "Aici a început Sistemul: primele contracte din 1956 s-au semnat pe I-70, în Missouri și Kansas. Trece Munții Stâncoși la 3.401 metri prin Tunelul Eisenhower și se încheie prin Glenwood Canyon, ultima și cea mai frumoasă porțiune a Sistemului.",
    },
  },
  {
    id: "i5",
    era: "interstate",
    name: { en: "Interstate 5", ro: "Interstatala 5" },
    color: "#2dd4bf",
    waypoints: [C.sanDiego, C.losAngeles, C.stockton, C.sacramento, C.portlandOR, C.seattle, C.blaine],
    endpoints: { en: "San Diego → Canadian border", ro: "San Diego → granița canadiană" },
    lengthLabel: "1,381 mi",
    year: "1957–1979",
    description: {
      en: "The West Coast spine, from the Mexican border to the Canadian one: the only Interstate to touch both. Everything the Pacific states grow, build and ship moves along it.",
      ro: "Coloana vertebrală a Coastei de Vest, de la granița mexicană la cea canadiană: singura interstatală care le atinge pe amândouă. Tot ce cultivă, construiesc și expediază statele Pacificului circulă pe ea.",
    },
  },
  {
    id: "i15",
    era: "interstate",
    name: { en: "Interstate 15", ro: "Interstatala 15" },
    color: "#f472b6",
    waypoints: [C.sanDiego, C.saltLake, [-111.96, 48.99]],
    endpoints: { en: "San Diego → Canadian border", ro: "San Diego → granița canadiană" },
    lengthLabel: "1,433 mi",
    year: "1957–1990",
    description: {
      en: "The desert spine of the Mountain West: San Diego to Las Vegas to Salt Lake City and on to the Montana border. On Friday evenings its Mojave stretch becomes one of the heaviest weekend corridors in the country.",
      ro: "Coloana deșertică a Vestului Muntos: San Diego, Las Vegas, Salt Lake City și mai departe, până la granița cu Canada. Vineri seara, porțiunea sa din Mojave devine unul dintre cele mai aglomerate coridoare de weekend din țară.",
    },
  },
  {
    id: "i20",
    era: "interstate",
    name: { en: "Interstate 20", ro: "Interstatala 20" },
    color: "#a3e635",
    waypoints: [[-104.7, 31.5], [-96.8, 32.78], [-84.39, 33.75], [-79.77, 34.2]],
    endpoints: { en: "West Texas → Florence, SC", ro: "Vestul Texasului → Florence, SC" },
    lengthLabel: "1,539 mi",
    year: "1957–1980s",
    description: {
      en: "The main street of the Deep South: Dallas, Shreveport, Jackson, Birmingham, Atlanta. It stitched the old Cotton Belt into the Sun Belt economy.",
      ro: "Strada principală a Sudului Profund: Dallas, Shreveport, Jackson, Birmingham, Atlanta. A cusut vechea Centură a Bumbacului în economia Sun Belt.",
    },
  },
  {
    id: "i25",
    era: "interstate",
    name: { en: "Interstate 25", ro: "Interstatala 25" },
    color: "#38bdf8",
    waypoints: [[-106.78, 32.31], C.albuquerque, C.denver, C.cheyenne, [-106.7, 44.35]],
    endpoints: { en: "Las Cruces → Buffalo, WY", ro: "Las Cruces → Buffalo, WY" },
    lengthLabel: "1,062 mi",
    year: "1957–1980s",
    description: {
      en: "The Front Range highway, running the eastern foot of the Rockies from New Mexico to Wyoming: over ground first worn in by the Santa Fe Trail and the great cattle drives.",
      ro: "Autostrada Front Range, de-a lungul poalelor estice ale Stâncoșilor, din New Mexico până în Wyoming: pe un traseu bătătorit întâi de Drumul Santa Fe și de marile transhumanțe de vite.",
    },
  },
  {
    id: "i35",
    era: "interstate",
    name: { en: "Interstate 35", ro: "Interstatala 35" },
    color: "#e879f9",
    waypoints: [[-99.5, 27.5], C.sanAntonio, C.oklahomaCity, C.kansasCity, C.minneapolis, [-92.1, 46.78]],
    endpoints: { en: "Laredo → Duluth", ro: "Laredo → Duluth" },
    lengthLabel: "1,568 mi",
    year: "1959–1992",
    description: {
      en: "The USMCA corridor: from Laredo, America's busiest inland port on the Mexican border, straight up the middle of the country to the Great Lakes. It famously splits into twin 35E/35W branches at both Dallas–Fort Worth and the Twin Cities.",
      ro: "Coridorul USMCA: de la Laredo, cel mai aglomerat port interior al Americii, aflat la granița mexicană, drept prin mijlocul țării până la Marile Lacuri. Se desparte celebru în ramurile gemene 35E/35V atât la Dallas–Fort Worth, cât și la Twin Cities.",
    },
  },
  {
    id: "i55",
    era: "interstate",
    name: { en: "Interstate 55", ro: "Interstatala 55" },
    color: "#fda4af",
    waypoints: [[-90.48, 30.07], C.memphis, C.stLouis, C.chicago],
    endpoints: { en: "New Orleans area → Chicago", ro: "Zona New Orleans → Chicago" },
    lengthLabel: "964 mi",
    year: "1958–1970s",
    description: {
      en: "The freeway that shadows the Mississippi: and the Great Migration. It follows the path millions took from the Delta to Chicago, past Memphis and the birthplace of the blues.",
      ro: "Autostrada care urmează fluviul Mississippi: și Marea Migrație. Merge pe drumul pe care milioane de oameni l-au străbătut din Deltă spre Chicago, pe lângă Memphis și leagănul bluesului.",
    },
  },
  {
    id: "i65",
    era: "interstate",
    name: { en: "Interstate 65", ro: "Interstatala 65" },
    color: "#4ade80",
    waypoints: [C.mobile, [-86.3, 32.38], C.nashville, [-85.76, 38.25], C.indianapolis, [-87.34, 41.6]],
    endpoints: { en: "Mobile → Gary, Indiana", ro: "Mobile → Gary, Indiana" },
    lengthLabel: "887 mi",
    year: "1958–1970s",
    description: {
      en: "Gulf to Great Lakes through Nashville, Louisville and Indianapolis: the spine of the South's auto-manufacturing alley, lined with assembly plants from Alabama to Indiana.",
      ro: "Din Golf până la Marile Lacuri, prin Nashville, Louisville și Indianapolis: coloana vertebrală a aleii auto a Sudului, mărginită de uzine de asamblare din Alabama până în Indiana.",
    },
  },
  {
    id: "i75",
    era: "interstate",
    name: { en: "Interstate 75", ro: "Interstatala 75" },
    color: "#facc15",
    waypoints: [C.miami, [-82.46, 27.95], C.atlantaCity ?? [-84.39, 33.75], [-84.51, 39.1], [-83.05, 42.33], [-84.35, 46.49]],
    endpoints: { en: "Miami → Sault Ste. Marie", ro: "Miami → Sault Ste. Marie" },
    lengthLabel: "1,786 mi",
    year: "1957–1986",
    description: {
      en: "From the tropics to the Canadian border at Lake Superior: the snowbird migration route, and the artery that ties Detroit's auto industry to its southern supply chain.",
      ro: "De la tropice până la granița canadiană de la Lacul Superior: ruta migrației «snowbird» și artera care leagă industria auto din Detroit de lanțul său de aprovizionare sudic.",
    },
  },
  {
    id: "i85",
    era: "interstate",
    name: { en: "Interstate 85", ro: "Interstatala 85" },
    color: "#93c5fd",
    waypoints: [[-86.3, 32.38], [-84.39, 33.75], [-82.4, 34.85], [-80.84, 35.23], [-78.9, 36.0], [-77.4, 37.2]],
    endpoints: { en: "Montgomery → Petersburg, VA", ro: "Montgomery → Petersburg, VA" },
    lengthLabel: "666 mi",
    year: "1958–1980s",
    description: {
      en: "The boom axis of the New South: the Piedmont crescent from Atlanta through Greenville to Charlotte, where textile towns became banking and manufacturing capitals.",
      ro: "Axa boomului Noului Sud: semiluna Piedmont de la Atlanta, prin Greenville, până la Charlotte, unde orașele textile au devenit capitale bancare și industriale.",
    },
  },
  {
    id: "i94",
    era: "interstate",
    name: { en: "Interstate 94", ro: "Interstatala 94" },
    color: "#c084fc",
    waypoints: [C.billings, C.bismarck ?? [-100.78, 46.81], C.minneapolis, [-87.9, 43.04], C.chicago, [-83.05, 42.33], [-82.42, 42.98]],
    endpoints: { en: "Billings → Port Huron, MI", ro: "Billings → Port Huron, MI" },
    lengthLabel: "1,585 mi",
    year: "1958–1980s",
    description: {
      en: "The northern industrial belt in one line: Minneapolis, Milwaukee, Chicago, Detroit. The only east–west Interstate that links Chicago and Detroit directly.",
      ro: "Centura industrială nordică într-o singură linie: Minneapolis, Milwaukee, Chicago, Detroit. Singura interstatală est–vest care leagă direct Chicago de Detroit.",
    },
  },
];

export const HIGHWAY_NODES: MapNode[] = [
  { id: "chi", name: "Chicago", coordinates: C.chicago, major: true },
  { id: "nyc", name: "New York", coordinates: C.nyc, major: true },
  { id: "la", name: "Los Angeles", coordinates: C.losAngeles, major: true },
  { id: "den", name: "Denver", coordinates: C.denver },
  { id: "dal", name: "Houston", coordinates: C.houston },
  { id: "atl", name: "Atlanta", coordinates: [-84.39, 33.75] },
  { id: "sea", name: "Seattle", coordinates: C.seattle },
  { id: "sf", name: "San Francisco", coordinates: C.sanFrancisco },
  { id: "mia", name: "Miami", coordinates: C.miami },
];

// ═══════════════════════════════════════════════════════════════════════════════
// RAIL
// ═══════════════════════════════════════════════════════════════════════════════

export const RAIL_ERAS: NetworkEra[] = [
  {
    id: "golden",
    label: { en: "The First Transcontinental", ro: "Prima Transcontinentală" },
    sublabel: { en: "1863 – 1869", ro: "1863 – 1869" },
  },
  {
    id: "expansion",
    label: { en: "The Great Expansion", ro: "Marea Expansiune" },
    sublabel: { en: "1870 – 1893", ro: "1870 – 1893" },
  },
  {
    id: "modern",
    label: { en: "The Freight Titans", ro: "Titanii de marfă" },
    sublabel: { en: "Today", ro: "Prezent" },
  },
];

export const RAIL_ROUTES: NetworkRoute[] = [
  {
    id: "up-1869",
    era: "golden",
    name: { en: "Union Pacific: building west", ro: "Union Pacific: construind spre vest" },
    color: "#fbbf24",
    waypoints: [C.omaha, C.northPlatte, C.cheyenne, C.laramie, C.ogden, C.promontory],
    endpoints: { en: "Omaha → Promontory Summit", ro: "Omaha → Promontory Summit" },
    lengthLabel: "1,086 mi",
    year: "1865–1869",
    description: {
      en: "Irish immigrants and Civil War veterans laid rail across the Plains at a running pace: through Cheyenne winters, Sioux territory and the Wyoming high desert: 1,086 miles from the Missouri River to the meeting point.",
      ro: "Imigranți irlandezi și veterani ai Războiului Civil au așezat șine peste Marile Câmpii în pas alergător: prin iernile din Cheyenne, teritoriul Sioux și deșertul înalt din Wyoming: 1.086 de mile de la râul Missouri până la punctul de întâlnire.",
    },
  },
  {
    id: "cp-1869",
    era: "golden",
    name: { en: "Central Pacific: building east", ro: "Central Pacific: construind spre est" },
    color: "#f87171",
    waypoints: [C.sacramento, C.reno, C.elko, C.promontory],
    endpoints: { en: "Sacramento → Promontory Summit", ro: "Sacramento → Promontory Summit" },
    lengthLabel: "690 mi",
    year: "1863–1869",
    description: {
      en: "Some 15,000 Chinese laborers carved fifteen tunnels through Sierra Nevada granite with black powder and hand drills, hung in baskets above the American River gorge, and wintered under forty-foot snows. Then they crossed Nevada laying up to ten miles of track in a single day.",
      ro: "Circa 15.000 de muncitori chinezi au săpat cincisprezece tuneluri prin granitul din Sierra Nevada cu pulbere neagră și burghie de mână, atârnați în coșuri deasupra defileului American River, iernând sub zăpezi de doisprezece metri. Apoi au traversat Nevada, așezând până la zece mile de cale ferată într-o singură zi.",
    },
  },
  {
    id: "atsf",
    era: "expansion",
    name: { en: "Atchison, Topeka & Santa Fe", ro: "Atchison, Topeka & Santa Fe" },
    color: "#f87171",
    waypoints: [C.chicago, C.kansasCity, C.topeka, C.laJunta, C.belen, C.gallup, C.flagstaff, C.needles, C.barstow, C.losAngeles],
    endpoints: { en: "Chicago → Los Angeles", ro: "Chicago → Los Angeles" },
    lengthLabel: "≈2,200 mi",
    year: "1887",
    description: {
      en: "The Santa Fe drove southwest through Topeka and over Raton Pass via La Junta to reach California. This iconic line opened southern access to the West Coast and carried the legendary Super Chief passenger service.",
      ro: "Santa Fe a înaintat spre sud-vest prin Topeka și peste pasul Raton via La Junta pentru a ajunge în California. Această linie istorică a deschis accesul sudic spre coasta de vest și a purtat legendarul serviciu Super Chief.",
    },
  },
  {
    id: "northern-pacific",
    era: "expansion",
    name: { en: "Northern Pacific Railway", ro: "Northern Pacific Railway" },
    color: "#a78bfa",
    waypoints: [C.stPaul, C.fargo, C.bismarck, C.billings, C.butte, C.missoula, C.spokane, C.pasco, C.portlandOR],
    endpoints: { en: "St. Paul → Portland", ro: "St. Paul → Portland" },
    lengthLabel: "≈1,900 mi",
    year: "1883",
    description: {
      en: "The second transcontinental rail line, completed in 1883. It opened the Pacific Northwest, forging through the Dakota plains and carving through Montana's mountain passes to link the Great Lakes with Portland.",
      ro: "A doua magistrală transcontinentală, finalizată în 1883. A deschis nord-vestul Americii, străbătând câmpiile Dakota și trecătorile montane din Montana pentru a conecta Marile Lacuri cu Portland.",
    },
  },
  {
    id: "great-northern",
    era: "expansion",
    name: { en: "Great Northern Railway", ro: "Great Northern Railway" },
    color: "#60a5fa",
    waypoints: [C.stPaul, C.fargo, C.minot, C.havre, C.whitefish, C.spokane, C.seattle],
    endpoints: { en: "St. Paul → Seattle", ro: "St. Paul → Seattle" },
    lengthLabel: "≈1,700 mi",
    year: "1893",
    description: {
      en: "James J. Hill's northern transcontinental: the only one built without federal land grants, and the only one that never went bankrupt. It found Marias Pass, the lowest crossing of the northern Rockies, and made Seattle a world port.",
      ro: "Transcontinentala nordică a lui James J. Hill: singura construită fără concesiuni federale de teren și singura care n-a dat niciodată faliment. A găsit pasul Marias, cea mai joasă trecere a Stâncoșilor nordici, și a făcut din Seattle un port mondial.",
    },
  },
  {
    id: "sp-sunset",
    era: "expansion",
    name: { en: "Southern Pacific: Sunset Route", ro: "Southern Pacific: Ruta Sunset" },
    color: "#34d399",
    waypoints: [C.newOrleans, C.houston, C.sanAntonio, C.elPaso, C.tucson, C.losAngeles],
    endpoints: { en: "New Orleans → Los Angeles", ro: "New Orleans → Los Angeles" },
    lengthLabel: "≈2,000 mi",
    year: "1883",
    description: {
      en: "The all-weather southern crossing, snow-free the year round: completed when crews met at the Pecos River in 1883. It bound the Gulf ports to California two decades before the automobile existed.",
      ro: "Traversarea sudică practicabilă tot anul, fără zăpadă: finalizată când echipele s-au întâlnit la râul Pecos, în 1883. A legat porturile Golfului de California cu două decenii înainte să existe automobilul.",
    },
  },
  {
    id: "bnsf-transcon",
    era: "modern",
    name: { en: "BNSF Southern Transcon", ro: "BNSF Southern Transcon" },
    color: "#fb923c",
    waypoints: [C.losAngeles, C.barstow, C.needles, C.flagstaff, C.gallup, C.belen, C.clovis, C.amarillo, C.wichita, C.kansasCity, C.chicago],
    endpoints: { en: "Los Angeles ⇄ Chicago", ro: "Los Angeles ⇄ Chicago" },
    lengthLabel: "2,200 mi",
    year: "today",
    description: {
      en: "The old Santa Fe main line, now the busiest freight artery on the planet: some 100+ trains a day, mostly double-stacked containers running between the San Pedro Bay ports and Chicago in under 60 hours.",
      ro: "Vechea linie principală Santa Fe, astăzi cea mai aglomerată arteră de marfă de pe planetă: peste 100 de trenuri pe zi, majoritatea containere suprapuse, circulând între porturile San Pedro Bay și Chicago în mai puțin de 60 de ore.",
    },
  },
  {
    id: "up-overland",
    era: "modern",
    name: { en: "Union Pacific: Overland Route", ro: "Union Pacific: Ruta Overland" },
    color: "#fbbf24",
    waypoints: [C.chicago, C.desMoines, C.omaha, C.northPlatte, C.cheyenne, C.ogden, C.elko, C.reno, C.sacramento, C.oakland],
    endpoints: { en: "Chicago ⇄ Oakland", ro: "Chicago ⇄ Oakland" },
    lengthLabel: "≈1,800 mi",
    year: "today",
    description: {
      en: "The direct descendant of 1869, still following the original survey for hundreds of miles. At North Platte it passes through Bailey Yard: the largest railroad classification yard in the world, sorting 14,000 cars a day.",
      ro: "Descendenta directă a liniei din 1869, urmând încă traseul original pe sute de mile. La North Platte trece prin Bailey Yard: cel mai mare triaj feroviar din lume, care sortează 14.000 de vagoane pe zi.",
    },
  },
  {
    id: "bnsf-northern",
    era: "modern",
    name: { en: "BNSF Northern Transcon", ro: "BNSF Northern Transcon" },
    color: "#60a5fa",
    waypoints: [C.chicago, C.stPaul, C.fargo, C.minot, C.havre, C.whitefish, C.spokane, C.pasco, C.seattle],
    endpoints: { en: "Chicago ⇄ Seattle", ro: "Chicago ⇄ Seattle" },
    lengthLabel: "≈2,200 mi",
    year: "today",
    description: {
      en: "Hill's Great Northern grade at work in the container age: grain from the Dakotas and Montana moving west to Pacific export terminals, Asian imports moving east over Marias Pass.",
      ro: "Traseul Great Northern al lui Hill, la lucru în era containerelor: cereale din Dakota și Montana spre terminalele de export ale Pacificului, importuri asiatice spre est peste pasul Marias.",
    },
  },
  {
    id: "up-sunset",
    era: "modern",
    name: { en: "Union Pacific: Sunset Route", ro: "Union Pacific: Ruta Sunset" },
    color: "#34d399",
    waypoints: [C.losAngeles, C.tucson, C.elPaso, C.sanAntonio, C.houston, C.newOrleans],
    endpoints: { en: "Los Angeles ⇄ New Orleans", ro: "Los Angeles ⇄ New Orleans" },
    lengthLabel: "≈2,000 mi",
    year: "today",
    description: {
      en: "The 1883 Southern Pacific crossing, now double-tracked for the intermodal age: the freight bridge between Pacific trade and the Gulf's petrochemical coast.",
      ro: "Traversarea Southern Pacific din 1883, acum dublată pentru era intermodală: puntea de marfă între comerțul Pacificului și coasta petrochimică a Golfului.",
    },
  },
  {
    id: "coast-starlight",
    era: "modern",
    name: { en: "Amtrak: Coast Starlight", ro: "Amtrak: Coast Starlight" },
    color: "#22d3ee",
    waypoints: [C.seattle, C.portlandOR, C.sacramento, C.oakland, C.losAngeles],
    endpoints: { en: "Seattle ⇄ Los Angeles", ro: "Seattle ⇄ Los Angeles" },
    lengthLabel: "1,377 mi",
    year: "1971",
    description: {
      en: "Widely regarded as one of America's most scenic train rides, linking the Pacific Northwest to Southern California via the dramatic shoreline of the Pacific Ocean, the Cascade Mountains, and lush agricultural valleys.",
      ro: "Considerat unul dintre cele mai pitorești trasee de tren din America, legând nord-vestul Pacificului de California de Sud prin coasta dramatică a oceanului, munții Cascade și văi agricole fertile.",
    },
  },
  {
    id: "california-zephyr",
    era: "modern",
    name: { en: "Amtrak: California Zephyr", ro: "Amtrak: California Zephyr" },
    color: "#22d3ee",
    waypoints: [C.oakland, C.sacramento, C.reno, C.elko, C.saltLake, C.denver, C.omaha, C.chicago],
    endpoints: { en: "Chicago ⇄ Emeryville (Oakland)", ro: "Chicago ⇄ Emeryville (Oakland)" },
    lengthLabel: "2,438 mi",
    year: "1971",
    description: {
      en: "Climbing through the heart of the Rocky Mountains and the Sierra Nevada, the Zephyr retraces the path of the First Transcontinental Railroad, carrying passengers through the spectacular canyons of Colorado and Utah.",
      ro: "Urcând prin inima munților Stâncoși și prin Sierra Nevada, Zephyr reface traseul primei căi ferate transcontinentale, purtând pasagerii prin canioanele spectaculoase din Colorado și Utah.",
    },
  },
  {
    id: "empire-builder",
    era: "modern",
    name: { en: "Amtrak: Empire Builder", ro: "Amtrak: Empire Builder" },
    color: "#22d3ee",
    waypoints: [C.seattle, C.spokane, C.havre, C.minot, C.fargo, C.stPaul, C.milwaukee, C.chicago],
    endpoints: { en: "Chicago ⇄ Seattle / Portland", ro: "Chicago ⇄ Seattle / Portland" },
    lengthLabel: "2,206 mi",
    year: "1971",
    description: {
      en: "Following the route of the historic Great Northern Railway, the Empire Builder traverses the northern plains and offers breathtaking views of Glacier National Park before crossing the Cascade Range.",
      ro: "Urmând traseul istoricului Great Northern Railway, Empire Builder traversează câmpiile nordice și oferă vederi uluitoare ale Parcului Național Glacier înainte de a traversa munții Cascade.",
    },
  },
  {
    id: "southwest-chief",
    era: "modern",
    name: { en: "Amtrak: Southwest Chief", ro: "Amtrak: Southwest Chief" },
    color: "#22d3ee",
    waypoints: [C.chicago, C.kansasCity, C.topeka, C.laJunta, C.albuquerque, C.flagstaff, C.needles, C.barstow, C.losAngeles],
    endpoints: { en: "Chicago ⇄ Los Angeles", ro: "Chicago ⇄ Los Angeles" },
    lengthLabel: "2,265 mi",
    year: "1971",
    description: {
      en: "Amtrak's speedway to the West, tracing the old Santa Fe trail. It speed-runs across the plains of Kansas, the red mesas of New Mexico, and the Mojave Desert to the Pacific coast.",
      ro: "Calea rapidă a Amtrak către Vest, pe urmele vechiului traseu Santa Fe. Străbate câmpiile din Kansas, podișurile roșii din New Mexico și deșertul Mojave până la coasta Pacificului.",
    },
  },
  {
    id: "sunset-limited",
    era: "modern",
    name: { en: "Amtrak: Sunset Limited", ro: "Amtrak: Sunset Limited" },
    color: "#22d3ee",
    waypoints: [C.newOrleans, C.houston, C.sanAntonio, C.elPaso, C.tucson, C.losAngeles],
    endpoints: { en: "New Orleans ⇄ Los Angeles", ro: "New Orleans ⇄ Los Angeles" },
    lengthLabel: "1,995 mi",
    year: "1971",
    description: {
      en: "Amtrak's southernmost route and the oldest continuously operated named train in the United States, running along the Mexican border, through bayous, West Texas plains, and Arizona deserts.",
      ro: "Cea mai sudică rută a Amtrak și cel mai vechi tren numit operat continuu din SUA, rulând de-a lungul graniței mexicane, prin mlaștini, câmpiile din West Texas și deșerturile din Arizona.",
    },
  },
  {
    id: "texas-eagle",
    era: "modern",
    name: { en: "Amtrak: Texas Eagle", ro: "Amtrak: Texas Eagle" },
    color: "#22d3ee",
    waypoints: [C.chicago, C.stLouis, C.littleRock, C.fortWorth, C.austin, C.sanAntonio],
    endpoints: { en: "Chicago ⇄ San Antonio (Los Angeles)", ro: "Chicago ⇄ San Antonio (Los Angeles)" },
    lengthLabel: "1,306 mi",
    year: "1974",
    description: {
      en: "The longest passenger train route in the nation (when connecting to the Sunset Limited in San Antonio), taking passengers from the Great Lakes through the Ozarks and deep into the heart of Texas.",
      ro: "Cel mai lung traseu de tren de pasageri din țară (când se conectează la Sunset Limited în San Antonio), purtând pasagerii de la Marile Lacuri prin Ozarks până în inima Texasului.",
    },
  },
  {
    id: "crescent",
    era: "modern",
    name: { en: "Amtrak: Crescent", ro: "Amtrak: Crescent" },
    color: "#22d3ee",
    waypoints: [C.nyc, C.philadelphia, C.baltimore, C.washington, C.charlotte, C.atlanta, C.birmingham, C.newOrleans],
    endpoints: { en: "New York ⇄ New Orleans", ro: "New York ⇄ New Orleans" },
    lengthLabel: "1,377 mi",
    year: "1979",
    description: {
      en: "Connecting the Northeast Corridor with the Deep South, the Crescent travels through the scenic Piedmont region and the foothills of the Appalachians down to the birthplace of jazz.",
      ro: "Conectând Coridorul de Nord-Est cu Sudul Profund, Crescent călătorește prin regiunea pitorească Piedmont și dealurile Apalașilor până la locul de naștere al jazzului.",
    },
  },
  {
    id: "northeast-corridor",
    era: "modern",
    name: { en: "Amtrak: Northeast Corridor", ro: "Amtrak: Northeast Corridor" },
    color: "#22d3ee",
    waypoints: [C.boston, C.nyc, C.philadelphia, C.baltimore, C.washington],
    endpoints: { en: "Boston ⇄ New York ⇄ Washington DC", ro: "Boston ⇄ New York ⇄ Washington DC" },
    lengthLabel: "457 mi",
    year: "1971",
    description: {
      en: "The busiest passenger rail corridor in North America and the only high-speed rail line in the United States, operating at speeds up to 150 mph to connect the major capitals of the Northeast megalopolis.",
      ro: "Cel mai aglomerat coridor feroviar de pasageri din America de Nord și singura linie de mare viteză din SUA, operând la viteze de până la 240 km/h pentru a conecta marile capitale ale megalopolisului din Nord-Est.",
    },
  },
  {
    id: "cardinal",
    era: "modern",
    name: { en: "Amtrak: Cardinal", ro: "Amtrak: Cardinal" },
    color: "#22d3ee",
    waypoints: [C.chicago, C.indianapolis, C.cincinnati, C.charlottesville, C.washington, C.philadelphia, C.nyc],
    endpoints: { en: "Chicago ⇄ New York", ro: "Chicago ⇄ New York" },
    lengthLabel: "920 mi",
    year: "1977",
    description: {
      en: "Operating three times weekly, the Cardinal offers a scenic journey through the Blue Ridge and Allegheny Mountains, the Shenandoah Valley, and the gorges of the New River in West Virginia.",
      ro: "Operând de trei ori pe săptămână, Cardinal oferă o călătorie pitorească prin munții Blue Ridge și Allegheny, Valea Shenandoah și cheile New River din Virginia de Vest.",
    },
  },
  {
    id: "city-of-new-orleans",
    era: "modern",
    name: { en: "Amtrak: City of New Orleans", ro: "Amtrak: City of New Orleans" },
    color: "#22d3ee",
    waypoints: [C.chicago, C.memphis, C.jackson, C.newOrleans],
    endpoints: { en: "Chicago ⇄ Memphis ⇄ New Orleans", ro: "Chicago ⇄ Memphis ⇄ New Orleans" },
    lengthLabel: "926 mi",
    year: "1971",
    description: {
      en: "Made famous by Steve Goodman's folk song, this route travels straight down the Mississippi flyway, linking Chicago's jazz with Memphis blues and New Orleans jazz.",
      ro: "Făcut celebrul de cântecul folk al lui Steve Goodman, acest traseu coboară direct pe valea Mississippi, legând jazzul din Chicago cu bluesul din Memphis și jazzul din New Orleans.",
    },
  },
  {
    id: "silver-meteor",
    era: "modern",
    name: { en: "Amtrak: Silver Meteor", ro: "Amtrak: Silver Meteor" },
    color: "#22d3ee",
    waypoints: [C.nyc, C.philadelphia, C.baltimore, C.washington, C.savannah, C.jacksonville, C.miami],
    endpoints: { en: "New York ⇄ Miami", ro: "New York ⇄ Miami" },
    lengthLabel: "1,389 mi",
    year: "1971",
    description: {
      en: "Connecting New York and Miami via the East Coast, running through Richmond, Charleston, Savannah, and Jacksonville to the tropical shores of Florida.",
      ro: "Conectează New York și Miami prin Coasta de Est, trecând prin Richmond, Charleston, Savannah și Jacksonville până la țărmurile tropicale ale Floridei.",
    },
  },
  {
    id: "silver-star",
    era: "modern",
    name: { en: "Amtrak: Silver Star", ro: "Amtrak: Silver Star" },
    color: "#22d3ee",
    waypoints: [C.nyc, C.philadelphia, C.baltimore, C.washington, C.savannah, C.jacksonville, C.miami],
    endpoints: { en: "New York ⇄ Miami", ro: "New York ⇄ Miami" },
    lengthLabel: "1,522 mi",
    year: "1971",
    description: {
      en: "An East Coast long-distance route running between New York and Miami, taking a more inland path than the Silver Meteor through Columbia, SC and Tampa, FL.",
      ro: "O rută pe distanțe lungi pe Coasta de Est între New York și Miami, urmând un traseu mai interior decât Silver Meteor, prin Columbia, SC și Tampa, FL.",
    },
  },
  {
    id: "auto-train",
    era: "modern",
    name: { en: "Amtrak: Auto Train", ro: "Amtrak: Auto Train" },
    color: "#22d3ee",
    waypoints: [[-77.24, 38.72], [-81.28, 28.79]],
    endpoints: { en: "Lorton, VA ⇄ Sanford, FL", ro: "Lorton, VA ⇄ Sanford, FL" },
    lengthLabel: "855 mi",
    year: "1983",
    description: {
      en: "A unique non-stop service allowing passengers to travel with their automobiles between the Washington, D.C. suburbs and Central Florida.",
      ro: "Un serviciu unic fără oprire care permite pasagerilor să călătorească împreună cu automobilele lor între suburbiile din Washington, D.C. și Florida Centrală.",
    },
  },
  {
    id: "palmetto",
    era: "modern",
    name: { en: "Amtrak: Palmetto", ro: "Amtrak: Palmetto" },
    color: "#22d3ee",
    waypoints: [C.nyc, C.philadelphia, C.baltimore, C.washington, C.savannah],
    endpoints: { en: "New York ⇄ Savannah", ro: "New York ⇄ Savannah" },
    lengthLabel: "829 mi",
    year: "1976",
    description: {
      en: "A daytime passenger service linking the Northeast corridor with the historic cities of the southern East Coast, terminating in Savannah, Georgia.",
      ro: "Un serviciu de zi care conectează coridorul de Nord-Est cu orașele istorice de pe coasta sud-estică, având capăt de linie în Savannah, Georgia.",
    },
  },
  {
    id: "carolinian",
    era: "modern",
    name: { en: "Amtrak: Carolinian", ro: "Amtrak: Carolinian" },
    color: "#22d3ee",
    waypoints: [C.nyc, C.philadelphia, C.baltimore, C.washington, C.charlotte],
    endpoints: { en: "New York ⇄ Charlotte", ro: "New York ⇄ Charlotte" },
    lengthLabel: "704 mi",
    year: "1990",
    description: {
      en: "A daily train service connecting New York City to Charlotte, North Carolina, supporting vital regional connections through the Piedmont region.",
      ro: "Un serviciu zilnic de tren care conectează New York de Charlotte, Carolina de Nord, sprijinind legături regionale vitale prin regiunea Piedmont.",
    },
  },
  {
    id: "adirondack",
    era: "modern",
    name: { en: "Amtrak: Adirondack", ro: "Amtrak: Adirondack" },
    color: "#22d3ee",
    waypoints: [C.nyc, C.albany, [-73.56, 45.50]],
    endpoints: { en: "New York ⇄ Montreal", ro: "New York ⇄ Montreal" },
    lengthLabel: "381 mi",
    year: "1974",
    description: {
      en: "A scenic international route running through the Hudson Valley and the Adirondack Mountains to connect New York City with Montreal, Canada.",
      ro: "O rută pitorească internațională prin valea Hudson și munții Adirondack, care conectează New York cu Montreal, Canada.",
    },
  },
  {
    id: "maple-leaf",
    era: "modern",
    name: { en: "Amtrak: Maple Leaf", ro: "Amtrak: Maple Leaf" },
    color: "#22d3ee",
    waypoints: [C.nyc, C.albany, C.buffalo, [-79.38, 43.65]],
    endpoints: { en: "New York ⇄ Toronto", ro: "New York ⇄ Toronto" },
    lengthLabel: "544 mi",
    year: "1981",
    description: {
      en: "Connecting New York City and Toronto, this international line passes upstate New York and crosses the border at Niagara Falls.",
      ro: "Conectând New York cu Toronto, această linie internațională traversează statul New York și trece granița pe la Cascada Niagara.",
    },
  },
  {
    id: "pacific-surfliner",
    era: "modern",
    name: { en: "Amtrak: Pacific Surfliner", ro: "Amtrak: Pacific Surfliner" },
    color: "#22d3ee",
    waypoints: [C.sanDiego, C.losAngeles, [-119.83, 34.42], [-120.62, 35.28]],
    endpoints: { en: "San Diego ⇄ San Luis Obispo", ro: "San Diego ⇄ San Luis Obispo" },
    lengthLabel: "350 mi",
    year: "2000",
    description: {
      en: "Amtrak's second busiest route, hugs the Southern California coastline between San Diego and San Luis Obispo, offering stunning ocean views.",
      ro: "A doua cea mai aglomerată rută Amtrak, șerpuiește de-a lungul coastei Californiei de Sud între San Diego și San Luis Obispo."
    },
  },
  {
    id: "san-joaquins",
    era: "modern",
    name: { en: "Amtrak: San Joaquins", ro: "Amtrak: San Joaquins" },
    color: "#22d3ee",
    waypoints: [C.oakland, C.sacramento, C.stockton, [-119.78, 36.74], [-119.01, 35.37]],
    endpoints: { en: "Oakland / Sacramento ⇄ Bakersfield", ro: "Oakland / Sacramento ⇄ Bakersfield" },
    lengthLabel: "361 mi",
    year: "1974",
    description: {
      en: "A vital regional service running through California's Central Valley, connecting major agricultural cities with the San Francisco Bay Area and Sacramento.",
      ro: "Un serviciu regional vital prin Valea Centrală a Californiei, care conectează marile orașe agricole cu San Francisco și Sacramento."
    },
  },
  {
    id: "amtrak-cascades",
    era: "modern",
    name: { en: "Amtrak: Cascades", ro: "Amtrak: Cascades" },
    color: "#22d3ee",
    waypoints: [[-122.3, 49.2], C.seattle, C.portlandOR, [-123.08, 44.05]],
    endpoints: { en: "Vancouver, BC ⇄ Seattle ⇄ Eugene", ro: "Vancouver, BC ⇄ Seattle ⇄ Eugene" },
    lengthLabel: "467 mi",
    year: "1999",
    description: {
      en: "An international corridor in the Pacific Northwest linking British Columbia, Washington, and Oregon along the foot of the Cascade Mountains.",
      ro: "Un coridor internațional din Pacificul de Nord-Vest care leagă Columbia Britanică, Washington și Oregon pe la poalele Munților Cascade."
    },
  },
  {
    id: "capitol-corridor",
    era: "modern",
    name: { en: "Amtrak: Capitol Corridor", ro: "Amtrak: Capitol Corridor" },
    color: "#22d3ee",
    waypoints: [[-121.89, 37.33], C.oakland, C.sacramento],
    endpoints: { en: "San Jose ⇄ Oakland ⇄ Sacramento", ro: "San Jose ⇄ Oakland ⇄ Sacramento" },
    lengthLabel: "172 mi",
    year: "1991",
    description: {
      en: "A high-frequency commuter corridor connecting northern California's major economic hubs, from the Silicon Valley to the state capitol in Sacramento.",
      ro: "Un coridor de navetă de înaltă frecvență care conectează nodurile economice majore din nordul Californiei, de la Silicon Valley la capitala statului."
    },
  },
  {
    id: "downeaster",
    era: "modern",
    name: { en: "Amtrak: Downeaster", ro: "Amtrak: Downeaster" },
    color: "#22d3ee",
    waypoints: [C.boston, C.portlandME, [-69.8, 43.9]],
    endpoints: { en: "Boston ⇄ Portland ⇄ Brunswick, ME", ro: "Boston ⇄ Portland ⇄ Brunswick, ME" },
    lengthLabel: "145 mi",
    year: "2001",
    description: {
      en: "Connecting Boston's North Station with the coast of New Hampshire and Maine, providing scenic service to coastal communities and college towns.",
      ro: "Conectează Boston (North Station) cu coasta de est din New Hampshire și Maine, servind comunitățile pitorești din zonă."
    },
  },
  {
    id: "hiawatha-service",
    era: "modern",
    name: { en: "Amtrak: Hiawatha", ro: "Amtrak: Hiawatha" },
    color: "#22d3ee",
    waypoints: [C.chicago, C.milwaukee],
    endpoints: { en: "Chicago ⇄ Milwaukee", ro: "Chicago ⇄ Milwaukee" },
    lengthLabel: "86 mi",
    year: "1989",
    description: {
      en: "Amtrak's busiest route in the Midwest, carrying commuters and travelers hourly between the downtown hubs of Chicago and Milwaukee.",
      ro: "Cea mai aglomerată rută Amtrak din Midwest, purtând călătorii oră de oră între centrele orașelor Chicago și Milwaukee."
    },
  },
  {
    id: "keystone-service",
    era: "modern",
    name: { en: "Amtrak: Keystone Service", ro: "Amtrak: Keystone Service" },
    color: "#22d3ee",
    waypoints: [[-76.88, 40.26], C.philadelphia, C.nyc],
    endpoints: { en: "Harrisburg ⇄ Philadelphia ⇄ New York", ro: "Harrisburg ⇄ Philadelphia ⇄ New York" },
    lengthLabel: "195 mi",
    year: "1971",
    description: {
      en: "A fully electrified corridor serving as the backbone of Pennsylvania intercity transit, running frequently between Harrisburg and Philadelphia.",
      ro: "Un coridor complet electrificat care servește ca o coloană vertebrală a tranzitului din statul Pennsylvania, rulând frecvent între Harrisburg și Philadelphia."
    },
  },
  {
    id: "wolverine",
    era: "modern",
    name: { en: "Amtrak: Wolverine", ro: "Amtrak: Wolverine" },
    color: "#22d3ee",
    waypoints: [C.chicago, C.southBend, C.toledo, [-83.05, 42.33]],
    endpoints: { en: "Chicago ⇄ Detroit ⇄ Pontiac, MI", ro: "Chicago ⇄ Detroit ⇄ Pontiac, MI" },
    lengthLabel: "304 mi",
    year: "1971",
    description: {
      en: "A higher-speed Midwest corridor connecting Chicago with Detroit and Pontiac, operating on upgraded tracks allowing up to 110 mph travel.",
      ro: "Un coridor de mare viteză din Midwest care conectează Chicago de Detroit și Pontiac, rulând pe linii modernizate."
    },
  },
  {
    id: "piedmont",
    era: "modern",
    name: { en: "Amtrak: Piedmont", ro: "Amtrak: Piedmont" },
    color: "#22d3ee",
    waypoints: [[-78.64, 35.78], C.charlotte],
    endpoints: { en: "Raleigh ⇄ Charlotte", ro: "Raleigh ⇄ Charlotte" },
    lengthLabel: "173 mi",
    year: "1995",
    description: {
      en: "A state-supported regional train service running multiple daily round trips through North Carolina's booming urban crescent.",
      ro: "Un serviciu regional subvenționat de stat, cu multiple curse zilnice tur-retur prin semiluna urbană din Carolina de Nord."
    },
  },
  {
    id: "lincoln-service",
    era: "modern",
    name: { en: "Amtrak: Lincoln Service", ro: "Amtrak: Lincoln Service" },
    color: "#22d3ee",
    waypoints: [C.chicago, C.stLouis],
    endpoints: { en: "Chicago ⇄ St. Louis", ro: "Chicago ⇄ St. Louis" },
    lengthLabel: "284 mi",
    year: "2006",
    description: {
      en: "A high-speed rail corridor connecting Chicago to St. Louis, operating at speeds of up to 110 mph on upgraded tracks.",
      ro: "Un coridor feroviar de mare viteză care conectează Chicago de St. Louis, rulând cu până la 177 km/h."
    },
  },
  {
    id: "missouri-river-runner",
    era: "modern",
    name: { en: "Amtrak: Missouri River Runner", ro: "Amtrak: Missouri River Runner" },
    color: "#22d3ee",
    waypoints: [C.stLouis, C.kansasCity],
    endpoints: { en: "St. Louis ⇄ Kansas City", ro: "St. Louis ⇄ Kansas City" },
    lengthLabel: "283 mi",
    year: "2009",
    description: {
      en: "Connecting Missouri's two major urban centers along the path of the historic Missouri River, passing through Jefferson City.",
      ro: "Conectează cele două mari centre urbane din Missouri pe lângă albia istorică a râului Missouri, trecând prin Jefferson City."
    },
  },
  {
    id: "borealis",
    era: "modern",
    name: { en: "Amtrak: Borealis", ro: "Amtrak: Borealis" },
    color: "#22d3ee",
    waypoints: [C.chicago, C.stPaul],
    endpoints: { en: "Chicago ⇄ St. Paul", ro: "Chicago ⇄ St. Paul" },
    lengthLabel: "411 mi",
    year: "2024",
    description: {
      en: "Amtrak's newest regional train connecting Chicago to St. Paul via Milwaukee, offering a convenient daytime schedule along the Mississippi River.",
      ro: "Cel mai nou tren regional de la Amtrak, conectând Chicago de St. Paul prin Milwaukee și oferind o cursă de zi de-a lungul râului Mississippi."
    },
  },
  {
    id: "hartford-line",
    era: "modern",
    name: { en: "Amtrak: Hartford Line", ro: "Amtrak: Hartford Line" },
    color: "#22d3ee",
    waypoints: [[-72.93, 41.30], [-72.67, 41.76], [-71.06, 42.36]],
    endpoints: { en: "New Haven ⇄ Springfield", ro: "New Haven ⇄ Springfield" },
    lengthLabel: "62 mi",
    year: "2018",
    description: {
      en: "A regional corridor connecting Connecticut and Massachusetts, providing high-frequency service in the New Haven–Hartford–Springfield Valley.",
      ro: "Un coridor regional ce conectează statele Connecticut și Massachusetts, servind valea New Haven–Hartford–Springfield."
    },
  },
  {
    id: "ethan-allen-express",
    era: "modern",
    name: { en: "Amtrak: Ethan Allen Express", ro: "Amtrak: Ethan Allen Express" },
    color: "#22d3ee",
    waypoints: [C.nyc, C.albany, [-73.18, 44.48]],
    endpoints: { en: "New York ⇄ Burlington, VT", ro: "New York ⇄ Burlington, VT" },
    lengthLabel: "311 mi",
    year: "1996",
    description: {
      en: "A scenic route connecting New York City with Rutland and Burlington, Vermont, winding through the Hudson Valley and the Green Mountains.",
      ro: "O rută pitorească de la New York spre Rutland și Burlington, Vermont, trecând prin valea Hudson și Munții Verzi."
    },
  },
  {
    id: "vermonter",
    era: "modern",
    name: { en: "Amtrak: Vermonter", ro: "Amtrak: Vermonter" },
    color: "#22d3ee",
    waypoints: [C.washington, C.nyc, [-72.23, 44.93]],
    endpoints: { en: "Washington ⇄ St. Albans, VT", ro: "Washington ⇄ St. Albans, VT" },
    lengthLabel: "611 mi",
    year: "1995",
    description: {
      en: "A scenic long-distance train running from Washington, D.C., north through the Northeast megalopolis and into the heart of Vermont's mountains.",
      ro: "Un tren pitoresc de lung parcurs care merge de la Washington, D.C. spre nord, prin megalopolisul de nord-est, direct în inima munților din Vermont."
    },
  },
  {
    id: "brightline",
    era: "modern",
    name: { en: "Brightline Florida", ro: "Brightline Florida" },
    color: "#f59e0b",
    waypoints: [C.miami, [-80.06, 26.71], [-81.30, 28.43]],
    endpoints: { en: "Miami ⇄ Orlando", ro: "Miami ⇄ Orlando" },
    lengthLabel: "235 mi",
    year: "2018",
    description: {
      en: "The first privately funded intercity passenger rail system in the U.S. in over a century, operating eco-friendly trains up to 125 mph between South Florida and Orlando.",
      ro: "Primul sistem privat de căi ferate interurbane din SUA în peste un secol, operând trenuri de mare viteză ecologice între Florida de Sud și Orlando."
    },
  },
  {
    id: "caltrain",
    era: "modern",
    name: { en: "Caltrain Commuter Rail", ro: "Trenul Navetiști Caltrain" },
    color: "#f87171",
    waypoints: [C.sanFrancisco, [-121.89, 37.33]],
    endpoints: { en: "San Francisco ⇄ San Jose", ro: "San Francisco ⇄ San Jose" },
    lengthLabel: "77 mi",
    year: "1987",
    description: {
      en: "Serving the San Francisco Peninsula and Silicon Valley, Caltrain is a crucial commuter system, recently electrified to allow cleaner, faster, and more frequent service.",
      ro: "Servind Peninsula San Francisco și Silicon Valley, Caltrain este o cale ferată navetă crucială, recent electrificată pentru a oferi un serviciu mai rapid și ecologic."
    },
  },
  {
    id: "metra",
    era: "modern",
    name: { en: "Metra Chicago", ro: "Metra Chicago" },
    color: "#c084fc",
    waypoints: [C.chicago, [-88.2, 42.0]],
    endpoints: { en: "Chicago ⇄ Suburbs", ro: "Chicago ⇄ Suburbii" },
    lengthLabel: "488 mi",
    year: "1984",
    description: {
      en: "The comprehensive commuter rail system of the Chicago metropolitan area, operating 11 distinct lines and serving more than 100 communities from downtown terminals.",
      ro: "Sistemul cuprinzător de căi ferate pentru navetiști din zona metropolitană Chicago, operând 11 linii și servind peste 100 de comunități."
    },
  },
  {
    id: "nj-transit",
    era: "modern",
    name: { en: "NJ Transit Rail", ro: "Calea Ferată NJ Transit" },
    color: "#f472b6",
    waypoints: [C.nyc, C.philadelphia],
    endpoints: { en: "New York / Newark ⇄ New Jersey Suburbs", ro: "New York / Newark ⇄ Suburbiile New Jersey" },
    lengthLabel: "530 mi",
    year: "1979",
    description: {
      en: "One of the nation's busiest commuter railroads, connecting northern and central New Jersey suburbs with Manhattan's Penn Station and Philadelphia.",
      ro: "Una dintre cele mai aglomerate rețele de navetă din țară, conectând nordul și centrul statului New Jersey cu gara Penn Station din Manhattan și Philadelphia."
    },
  },
];

export const RAIL_NODES: MapNode[] = [
  { id: "chi", name: "Chicago", coordinates: C.chicago, major: true },
  { id: "promontory", name: "Promontory", coordinates: C.promontory, major: true },
  { id: "np", name: "North Platte", coordinates: C.northPlatte },
  { id: "kc", name: "Kansas City", coordinates: C.kansasCity },
  { id: "la", name: "Los Angeles", coordinates: C.losAngeles },
  { id: "sea", name: "Seattle", coordinates: C.seattle },
  { id: "hou", name: "Houston", coordinates: C.houston },
  { id: "no", name: "New Orleans", coordinates: C.newOrleans },
  { id: "oma", name: "Omaha", coordinates: C.omaha },
  { id: "sac", name: "Sacramento", coordinates: C.sacramento },
];

// ═══════════════════════════════════════════════════════════════════════════════
// AVIATION
// ═══════════════════════════════════════════════════════════════════════════════

export interface AviationHub {
  code: string;
  name: { en: string; ro: string };
  city: string;
  coordinates: LngLat;
  /** 2024 passengers, millions (ACI). 0 = not a major passenger hub. */
  passengers: number;
  /** Air cargo, million metric tonnes (ACI). 0 = not a major cargo hub. */
  cargo: number;
  note: { en: string; ro: string };
}

export const AVIATION_HUBS: AviationHub[] = [
  { code: "ATL", name: { en: "Hartsfield–Jackson Atlanta", ro: "Hartsfield–Jackson Atlanta" }, city: "Atlanta", coordinates: [-84.428, 33.641], passengers: 108.1, cargo: 0.7, note: { en: "The busiest airport on Earth almost every year since 1998. Within a two-hour flight of 80% of the U.S. population.", ro: "Cel mai aglomerat aeroport de pe Pământ aproape în fiecare an din 1998. La două ore de zbor de 80% din populația SUA." } },
  { code: "DFW", name: { en: "Dallas/Fort Worth International", ro: "Dallas/Fort Worth International" }, city: "Dallas", coordinates: [-97.038, 32.897], passengers: 87.8, cargo: 1.0, note: { en: "Larger in land area than Manhattan: a city-state of runways with its own ZIP code.", ro: "Mai întins decât Manhattan: un oraș-stat de piste, cu propriul cod poștal." } },
  { code: "DEN", name: { en: "Denver International", ro: "Denver International" }, city: "Denver", coordinates: [-104.673, 39.862], passengers: 82.4, cargo: 0.3, note: { en: "The largest airport site in the Western Hemisphere: 53 square miles of high plains.", ro: "Cel mai mare amplasament aeroportuar din emisfera vestică: 137 km² de câmpie înaltă." } },
  { code: "ORD", name: { en: "Chicago O'Hare", ro: "Chicago O'Hare" }, city: "Chicago", coordinates: [-87.905, 41.979], passengers: 80.0, cargo: 1.9, note: { en: "America's great connecting machine: more scheduled destinations than any other U.S. airport.", ro: "Marea mașină de conexiuni a Americii: mai multe destinații programate decât orice alt aeroport din SUA." } },
  { code: "LAX", name: { en: "Los Angeles International", ro: "Los Angeles International" }, city: "Los Angeles", coordinates: [-118.408, 33.942], passengers: 76.6, cargo: 2.1, note: { en: "The Pacific gateway: the transpacific passenger and cargo anchor of the Americas.", ro: "Poarta Pacificului: ancora transpacifică de pasageri și marfă a Americilor." } },
  { code: "JFK", name: { en: "New York JFK", ro: "New York JFK" }, city: "New York", coordinates: [-73.779, 40.64], passengers: 63.2, cargo: 1.4, note: { en: "The nation's front door: more international passengers than any other U.S. airport.", ro: "Ușa din față a națiunii: mai mulți pasageri internaționali decât orice alt aeroport american." } },
  { code: "CLT", name: { en: "Charlotte Douglas", ro: "Charlotte Douglas" }, city: "Charlotte", coordinates: [-80.949, 35.214], passengers: 58.8, cargo: 0.2, note: { en: "A banking city turned fortress hub: one airline, six runways' worth of ambition.", ro: "Un oraș bancar devenit hub-fortăreață." } },
  { code: "LAS", name: { en: "Las Vegas Harry Reid", ro: "Las Vegas Harry Reid" }, city: "Las Vegas", coordinates: [-115.153, 36.083], passengers: 58.5, cargo: 0.1, note: { en: "Pure origin-and-destination demand: a city in the desert reachable essentially only by air and one highway.", ro: "Cerere pură de destinație: un oraș în deșert, accesibil practic doar pe calea aerului și pe o singură autostradă." } },
  { code: "MCO", name: { en: "Orlando International", ro: "Orlando International" }, city: "Orlando", coordinates: [-81.309, 28.431], passengers: 57.2, cargo: 0.2, note: { en: "The vacation gateway of the Americas.", ro: "Poarta vacanțelor din cele două Americi." } },
  { code: "MIA", name: { en: "Miami International", ro: "Miami International" }, city: "Miami", coordinates: [-80.291, 25.795], passengers: 56.3, cargo: 2.4, note: { en: "The hinge between the U.S. and Latin America: #1 in the nation for international freight.", ro: "Balamaua dintre SUA și America Latină: nr. 1 național la marfă internațională." } },
  { code: "SEA", name: { en: "Seattle–Tacoma", ro: "Seattle–Tacoma" }, city: "Seattle", coordinates: [-122.309, 47.449], passengers: 52.6, cargo: 0.5, note: { en: "The shortest great-circle hop from the Lower 48 to Asia.", ro: "Cel mai scurt arc de cerc mare din SUA continentală către Asia." } },
  { code: "SFO", name: { en: "San Francisco International", ro: "San Francisco International" }, city: "San Francisco", coordinates: [-122.379, 37.622], passengers: 51.3, cargo: 0.5, note: { en: "Silicon Valley's runway to the world.", ro: "Pista Silicon Valley către lume." } },
  { code: "MEM", name: { en: "Memphis International", ro: "Memphis International" }, city: "Memphis", coordinates: [-89.977, 35.042], passengers: 0, cargo: 3.9, note: { en: "The FedEx SuperHub. Every night after midnight it briefly becomes the busiest airport on Earth, sorting millions of packages before dawn.", ro: "SuperHub-ul FedEx. În fiecare noapte, după miezul nopții, devine pentru scurt timp cel mai aglomerat aeroport de pe Pământ, sortând milioane de colete până în zori." } },
  { code: "ANC", name: { en: "Anchorage Ted Stevens", ro: "Anchorage Ted Stevens" }, city: "Anchorage", coordinates: [-149.996, 61.174], passengers: 0, cargo: 3.4, note: { en: "Within 9.5 hours' flight of 90% of the industrialized world: the refueling crossroads of transpacific freight.", ro: "La 9,5 ore de zbor de 90% din lumea industrializată: răscrucea de realimentare a mărfii transpacifice." } },
  { code: "SDF", name: { en: "Louisville Muhammad Ali", ro: "Louisville Muhammad Ali" }, city: "Louisville", coordinates: [-85.736, 38.174], passengers: 0, cargo: 3.0, note: { en: "UPS Worldport: a 5.2-million-square-foot sorting machine that handles some 400,000 packages an hour.", ro: "UPS Worldport: o mașinărie de sortare de 480.000 m² care procesează circa 400.000 de colete pe oră." } },
  { code: "CVG", name: { en: "Cincinnati/Northern Kentucky", ro: "Cincinnati/Northern Kentucky" }, city: "Cincinnati", coordinates: [-84.668, 39.049], passengers: 0, cargo: 1.9, note: { en: "Amazon Air's primary hub and DHL's Americas gateway: the fastest-growing cargo airport in the nation.", ro: "Hub-ul principal Amazon Air și poarta DHL pentru Americi: aeroportul de marfă cu cea mai rapidă creștere din țară." } },
];

/** Decorative overnight-sortie arcs shown in cargo mode, radiating from Memphis. */
export const MEM_SORTIE_TARGETS: LngLat[] = [
  [-73.779, 40.64],   // JFK
  [-118.408, 33.942], // LAX
  [-87.905, 41.979],  // ORD
  [-80.291, 25.795],  // MIA
  [-104.673, 39.862], // DEN
  [-122.309, 47.449], // SEA
];

// ═══════════════════════════════════════════════════════════════════════════════
// MEGAPROJECTS
// ═══════════════════════════════════════════════════════════════════════════════

export interface Megaproject {
  year: string;
  name: { en: string; ro: string };
  stat: string;
  statLabel: { en: string; ro: string };
  description: { en: string; ro: string };
}

export const MEGAPROJECTS: Megaproject[] = [
  {
    year: "1825",
    name: { en: "The Erie Canal", ro: "Canalul Erie" },
    stat: "363 mi",
    statLabel: { en: "dug largely by hand", ro: "săpate în mare parte manual" },
    description: {
      en: "A ditch through the wilderness that cut freight costs between the Atlantic and the Great Lakes by more than 90%: and made New York the Empire State.",
      ro: "Un șanț prin sălbăticie care a redus costurile de transport între Atlantic și Marile Lacuri cu peste 90%: și a făcut din New York „Statul Imperiu”.",
    },
  },
  {
    year: "1869",
    name: { en: "The Transcontinental Railroad", ro: "Calea Ferată Transcontinentală" },
    stat: "1,776 mi",
    statLabel: { en: "of new track, coast to interior", ro: "de cale ferată nouă" },
    description: {
      en: "A cross-country journey of months collapsed to about a week. The two crews together laid 1,776 miles of track: a number no one planned and everyone noticed.",
      ro: "O călătorie de luni de zile, comprimată la circa o săptămână. Cele două echipe au așezat împreună 1.776 de mile de cale ferată: un număr pe care nimeni nu l-a plănuit și toată lumea l-a remarcat.",
    },
  },
  {
    year: "1883",
    name: { en: "The Brooklyn Bridge", ro: "Podul Brooklyn" },
    stat: "1,595 ft",
    statLabel: { en: "main span: a world record", ro: "deschidere principală: record mondial" },
    description: {
      en: "The first steel-wire suspension bridge, half again longer than anything built before it. Its towers were the tallest structures in North America.",
      ro: "Primul pod suspendat pe cabluri de oțel, cu o deschidere cu jumătate mai lungă decât orice se construise înainte. Turnurile sale erau cele mai înalte structuri din America de Nord.",
    },
  },
  {
    year: "1914",
    name: { en: "The Panama Canal", ro: "Canalul Panama" },
    stat: "−7,800 mi",
    statLabel: { en: "off the New York–San Francisco sea route", ro: "din ruta maritimă New York–San Francisco" },
    description: {
      en: "Built by the U.S. Army Corps of Engineers after the French attempt collapsed: the ocean shortcut that reorganized the world's shipping lanes around American engineering.",
      ro: "Construit de Corpul de Ingineri al Armatei SUA după eșecul tentativei franceze: scurtătura oceanică ce a reorganizat rutele maritime ale lumii în jurul ingineriei americane.",
    },
  },
  {
    year: "1936",
    name: { en: "The Hoover Dam", ro: "Barajul Hoover" },
    stat: "3.25M yd³",
    statLabel: { en: "of concrete, two years ahead of schedule", ro: "de beton, cu doi ani înainte de termen" },
    description: {
      en: "Enough concrete to pave a road across the continent, poured in a Depression-era canyon at 120°F: creating Lake Mead and electrifying the Southwest.",
      ro: "Suficient beton pentru a pava un drum peste continent, turnat într-un canion în plină Mare Criză, la 49°C: creând lacul Mead și electrificând sud-vestul.",
    },
  },
  {
    year: "1937",
    name: { en: "The Golden Gate Bridge", ro: "Podul Golden Gate" },
    stat: "4,200 ft",
    statLabel: { en: "main span: unmatched for 27 years", ro: "deschidere principală: neegalată 27 de ani" },
    description: {
      en: "Thrown across a strait of fog, tide and open ocean that experts called unbridgeable: finished ahead of schedule and under budget, in the depths of the Depression.",
      ro: "Aruncat peste o strâmtoare de ceață, maree și ocean deschis pe care experții o numeau imposibil de traversat: terminat înainte de termen și sub buget, în plină Mare Criză.",
    },
  },
  {
    year: "1956",
    name: { en: "The Interstate Highway System", ro: "Sistemul de Autostrăzi Interstatale" },
    stat: "47,856 mi",
    statLabel: { en: "the largest public works project in history", ro: "cel mai mare proiect de lucrări publice din istorie" },
    description: {
      en: "Forty years of construction, every state in the Union, and a continent rewired around the automobile: commerce, suburbs, logistics and all.",
      ro: "Patruzeci de ani de construcție, fiecare stat al Uniunii și un continent recablat în jurul automobilului: comerț, suburbii și logistică deopotrivă.",
    },
  },
  {
    year: "2007",
    name: { en: "The Big Dig, Boston", ro: "Big Dig, Boston" },
    stat: "≈$15B",
    statLabel: { en: "the most complex urban highway ever built", ro: "cea mai complexă autostradă urbană construită vreodată" },
    description: {
      en: "An elevated expressway buried beneath a living downtown without ever closing it: tunneling under rail lines, harbor and skyscraper foundations.",
      ro: "O autostradă suspendată îngropată sub un centru urban viu, fără a-l închide vreodată: tuneluri pe sub linii ferate, port și fundații de zgârie-nori.",
    },
  },
];
