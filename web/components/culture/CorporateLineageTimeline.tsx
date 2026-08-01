"use client";

// ─── CorporateLineageTimeline ────────────────────────────────────────────────
// "The Corporate Lineage Timeline": Interactive historical evolution of American
// corporate power across 5 distinct economic eras from 1850s to the AI Era.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface TimelineCompany {
  year: string;
  name: string;
  logoFile: string;
  logoInvert?: boolean;
  location: string;
  locationRo: string;
  breakthrough: string;
  breakthroughRo: string;
  statValue: string;
  statLabel: string;
  statLabelRo: string;
  catalyst: string;
  catalystRo: string;
  narrative: string;
  narrativeRo: string;
  keyInnovations: { en: string; ro: string }[];
}

interface TimelineEra {
  id: string;
  number: string;
  eraRange: string;
  title: string;
  titleRo: string;
  subtitle: string;
  subtitleRo: string;
  macroDriver: string;
  macroDriverRo: string;
  companies: TimelineCompany[];
}

const LINEAGE_ERAS: TimelineEra[] = [
  {
    id: "industrial-foundations",
    number: "01",
    eraRange: "1850s – 1890s",
    title: "Industrial Foundations & National Packaging",
    titleRo: "Fundațiile industriale și ambalajele naționale",
    subtitle: "Steam, Steel, Railroads, and the Invention of Registered Brands",
    subtitleRo: "Vapori, oțel, căi ferate și inventarea brandurilor înregistrate",
    macroDriver:
      "The expansion of the transcontinental railroad and steam-powered factories allowed local producers to ship standardized physical goods nationwide, creating America's first national registered trademarks.",
    macroDriverRo:
      "Extinderea căilor ferate transcontinentale și a fabricilor cu abur a permis producătorilor să livreze mărfuri standardizate la nivel național, creând primele mărci înregistrate din America.",
    companies: [
      {
        year: "1853",
        name: "Levi's",
        logoFile: "/ASSETS/Companies/Levi's_logo.svg",
        logoInvert: false,
        location: "San Francisco, California",
        locationRo: "San Francisco, California",
        breakthrough: "501 Copper-Riveted Denim Work Trousers",
        breakthroughRo: "Blugii 501 din denim cu nituri de cupru",
        statValue: "170+ Years",
        statLabel: "Democratic Uniform of Modernity",
        statLabelRo: "Uniforma democratică a modernității",
        catalyst: "California Gold Rush & Heavy Mining Workwear",
        catalystRo: "Goana după Aur și îmbrăcămintea minieră",
        narrative:
          "Levi Strauss and tailor Jacob Davis patented copper rivets on denim work pants in 1873, reinforcing stress points for Gold Rush miners and creating the global uniform of democratic fashion.",
        narrativeRo:
          "Levi Strauss și croitorul Jacob Davis au brevetat niturile de cupru pe pantalonii de lucru din denim în 1873, ranforsând cusăturile pentru mineri și creând uniforma globală a modei democratice.",
        keyInnovations: [
          { en: "Copper Rivet Strain Reinforcement", ro: "Ranforsare cu Nituri de Cupru" },
          { en: "Arcuate Double-Stitch Pocket", ro: "Cusătură Arcuite Dublă" },
        ],
      },
      {
        year: "1886",
        name: "Coca-Cola",
        logoFile: "/ASSETS/Companies/Coca-Cola_Logo_0.svg",
        logoInvert: false,
        location: "Atlanta, Georgia",
        locationRo: "Atlanta, Georgia",
        breakthrough: "Contoured Glass Bottle & Bottling Franchise",
        breakthroughRo: "Sticla conturată de sticlă și franciza de îmbuteliere",
        statValue: "1.9 Billion",
        statLabel: "Daily Servings Across 200+ Nations",
        statLabelRo: "Porții zilnice în 200+ țări",
        catalyst: "Urban Soda Fountains & Mass Beverage Logistics",
        catalystRo: "Fantânile de suc urbane și logistica de băuturi",
        narrative:
          "Pharmacist John Pemberton crafted the syrup in Atlanta, and Coca-Cola later patented its tactile contoured bottle in 1915, pioneering independent bottling franchises worldwide.",
        narrativeRo:
          "Farmacistul John Pemberton a creat siropul în Atlanta, iar Coca-Cola a brevetat sticla conturată în 1915, deschizând drumul francizelor de îmbuteliere.",
        keyInnovations: [
          { en: "Independent Bottler Franchise Stack", ro: "Rețea de Francize de Îmbuteliere" },
          { en: "Tactile Contoured Bottle Silhouette", ro: "Siluetă Tactilă a Sticlei Conturate" },
        ],
      },
      {
        year: "1892",
        name: "General Electric",
        logoFile: "/ASSETS/Companies/ge-aerospace.svg",
        logoInvert: true,
        location: "Schenectady, New York",
        locationRo: "Schenectady, New York",
        breakthrough: "Incandescent Light Bulb & National Power Grid",
        breakthroughRo: "Becul incandescent și rețeaua națională de energie",
        statValue: "130+ Years",
        statLabel: "Electrification of Industrial America",
        statLabelRo: "Electrificarea Americii industriale",
        catalyst: "Thomas Edison Research Labs & Grid Patent Consolidation",
        catalystRo: "Laboratoarele Edison și consolidarea brevetelor",
        narrative:
          "Formed through the merger of Edison General Electric and Thomson-Houston, GE built the dynamos, power grids, and electric appliances that illuminated modern civilization.",
        narrativeRo:
          "Formată prin fuziunea companiilor lui Edison, GE a construit dinamurile, rețelele electrice și electrocasnicele care au iluminat civilizația modernă.",
        keyInnovations: [
          { en: "Commercial Incandescent Filament Bulb", ro: "Bec Comercial cu Filament Incandescent" },
          { en: "Centralized AC Electric Power Grid", ro: "Rețea Centralizată de Energie C.A." },
        ],
      },
    ],
  },
  {
    id: "mass-production",
    number: "02",
    eraRange: "1900s – 1930s",
    title: "Mass Production, Aviation & Sound Cinema",
    titleRo: "Producția în masă, aviația și cinematograful sonor",
    subtitle: "Assembly Lines, Commercial Air Delivery, and Hollywood Animation",
    subtitleRo: "Linii de asamblare, livrări aeriene și animația Hollywood",
    macroDriver:
      "Henry Ford's moving assembly line transformed manufacturing from craft labor into continuous industrial flow, lowering costs and creating a high-wage consumer class.",
    macroDriverRo:
      "Linia mobilă de asamblare a lui Henry Ford a transformat fabricația în flux industrial continuu, reducând costurile și creând o clasă de consumatori bine plătiți.",
    companies: [
      {
        year: "1903",
        name: "Ford",
        logoFile: "/ASSETS/Companies/Ford-Motor-Company-Logo.png",
        logoInvert: false,
        location: "Dearborn, Michigan",
        locationRo: "Dearborn, Michigan",
        breakthrough: "Model T Automobile & Moving Assembly Line",
        breakthroughRo: "Automobilul Model T și linia mobilă de asamblare",
        statValue: "15 Million",
        statLabel: "Model T Cars Produced (1908–1927)",
        statLabelRo: "Automobile Model T produse",
        catalyst: "Highland Park Continuous Flow Factory Design",
        catalystRo: "Designul fabricii cu flux continuu Highland Park",
        narrative:
          "Henry Ford introduced the moving assembly line in 1913, reducing chassis build time from 12 hours to 93 minutes, while setting the $5-a-day wage to build mass consumer purchasing power.",
        narrativeRo:
          "Henry Ford a introdus linia mobilă de asamblare în 1913, reducând timpul de asamblare de la 12 ore la 93 de minute și stabilind salariul de 5$ pe zi.",
        keyInnovations: [
          { en: "Continuous Moving Assembly Conveyor", ro: "Banda Mobilă Continuă de Asamblare" },
          { en: "High-Wage Mass Industrial Economics", ro: "Economia Industrială cu Salarii Mari" },
        ],
      },
      {
        year: "1907",
        name: "UPS",
        logoFile: "/ASSETS/Companies/United_Parcel_Service_logo_2014.svg",
        logoInvert: false,
        location: "Seattle, Washington",
        locationRo: "Seattle, Washington",
        breakthrough: "Consolidated Urban Parcel Messenger Network",
        breakthroughRo: "Rețeaua consolidată de curierat urban",
        statValue: "24 Million",
        statLabel: "Daily Packages Delivered Globally",
        statLabelRo: "Pachete livrate zilnic în lume",
        catalyst: "Telephone Order Boom & Commercial Motor Vans",
        catalystRo: "Boom-ul comenzilor telefonice și autoutilitarele",
        narrative:
          "Started by teenagers Jim Casey and Claude Ryan with a $100 loan, UPS built the consolidated logistics infrastructure that powers retail shipping across the globe.",
        narrativeRo:
          "Fondată de tinerii Jim Casey și Claude Ryan cu un împrumut de 100$, UPS a construit infrastructura logistică ce alimentează livrările globale.",
        keyInnovations: [
          { en: "Consolidated Retail Delivery Matrix", ro: "Matrice Consolidată de Livrare Retail" },
          { en: "Automated Package Hub Sorting", ro: "Sortare Automatizată în Hub-uri" },
        ],
      },
      {
        year: "1916",
        name: "Boeing",
        logoFile: "/ASSETS/Companies/boeing.svg",
        logoInvert: true,
        location: "Seattle, Washington",
        locationRo: "Seattle, Washington",
        breakthrough: "Commercial Airliners & Airmail Fleet",
        breakthroughRo: "Avioanele comerciale de pasageri și flota poștală",
        statValue: "10,000+",
        statLabel: "Commercial Jets Connecting Continents",
        statLabelRo: "Avioane comerciale ce conectează continentele",
        catalyst: "Post-WWI Aviation Technology & Metal Airframes",
        catalystRo: "Tehnologia aviatică post-primul război mondial",
        narrative:
          "William Boeing built wood-and-canvas floatplanes before pioneering modern aluminum commercial jetliners like the 707 and 747 Jumbo Jet that shrunk global travel time.",
        narrativeRo:
          "William Boeing a construit hidroavioane înainte de a deveni pionierul avioanelor comerciale de aluminiu precum 707 și 747 Jumbo Jet.",
        keyInnovations: [
          { en: "Pressurized All-Metal Monoplane Fuselage", ro: "Fuzelaj Metalic Presurizat Monoplan" },
          { en: "Wide-Body Transoceanic Jetliner Design", ro: "Design de Avioane Transoceanice Wide-Body" },
        ],
      },
      {
        year: "1923",
        name: "Disney",
        logoFile: "/ASSETS/Companies/Disney_iddEtLt1OH_0.svg",
        logoInvert: true,
        location: "Los Angeles, California",
        locationRo: "Los Angeles, California",
        breakthrough: "Synchronized Sound Animation & Disneyland",
        breakthroughRo: "Animația cu sunet sincronizat și Disneyland",
        statValue: "$200B+",
        statLabel: "World's Premier Storytelling IP Empire",
        statLabelRo: "Cel mai mare imperiu de proprietate intelectuală",
        catalyst: "Hollywood Studio System & Sound Film Technology",
        catalystRo: "Sistemul studiourilor de la Hollywood și filmul sonor",
        narrative:
          "Walt Disney debuted Mickey Mouse in Steamboat Willie (1928) with synchronized sound, later opening Disneyland in 1955 to pioneer physical theme park imagineering.",
        narrativeRo:
          "Walt Disney l-a lansat pe Mickey Mouse în Steamboat Willie (1928) cu sunet sincronizat, deschizând Disneyland în 1955 pentru a crea parcurile tematice imersive.",
        keyInnovations: [
          { en: "Synchronized Cartoon Audio Track", ro: "Pistă Audio Sincronizată pentru Desene" },
          { en: "Physical Immersive Theme Park Imagineering", ro: "Parcuri Tematice Fizice Imersive" },
        ],
      },
    ],
  },
  {
    id: "suburban-boom",
    number: "03",
    eraRange: "1940s – 1960s",
    title: "Suburban Consumer Boom & Global Franchises",
    titleRo: "Boom-ul suburban al consumatorilor și francizele",
    subtitle: "Fast Food Assembly, Paperless Credit, Big-Box Retail, and Athletic Gear",
    subtitleRo: "Fast food de linie, carduri de credit, retail big-box și echipament sportiv",
    macroDriver:
      "The GI Bill, suburban home expansion, and Dwight D. Eisenhower's Interstate Highway System created drive-thru dining, national credit cards, and suburban retail supercenters.",
    macroDriverRo:
      "Dezvoltarea suburbiilor și Sistemul Național de Autostrăzi au creat restaurantele drive-thru, cardurile de credit naționale și supercentrelor comerciale.",
    companies: [
      {
        year: "1940",
        name: "McDonald's",
        logoFile: "/ASSETS/Companies/McDonald's_Symbol_0.svg",
        logoInvert: false,
        location: "San Bernardino, California",
        locationRo: "San Bernardino, California",
        breakthrough: "Speedee Service Kitchen Assembly & Golden Arches",
        breakthroughRo: "Sistemul Speedee Service și Arcadele de Aur",
        statValue: "40,000+",
        statLabel: "Restaurants Serving 69M Customers Daily",
        statLabelRo: "Restaurante ce deservesc 69M clienți zilnic",
        catalyst: "Interstate Highway Car Culture & Drive-Thru Dining",
        catalystRo: "Cultura autostrăzilor și serviciul drive-thru",
        narrative:
          "The McDonald brothers invented assembly-line fast food, and Ray Kroc acquired nationwide franchise rights in 1954, scaling identical quality food in 100+ countries.",
        narrativeRo:
          "Frații McDonald au inventat bucătăria fast-food de linie, iar Ray Kroc a preluat franciza în 1954, extinzând rețeaua în peste 100 de țări.",
        keyInnovations: [
          { en: "Factory Line Kitchen Assembly System", ro: "Sistem Liniar de Bucătărie Fabrică" },
          { en: "Planetary Quality Franchise Operations", ro: "Operare Globală Standardizată a Francizei" },
        ],
      },
      {
        year: "1958",
        name: "Visa",
        logoFile: "/ASSETS/Companies/Visa_Inc._logo_(2021–present).svg",
        logoInvert: false,
        location: "Fresno, California",
        locationRo: "Fresno, California",
        breakthrough: "BankAmericard Universal Paperless Credit Card",
        breakthroughRo: "Cardul universal de credit BankAmericard",
        statValue: "4.3 Billion",
        statLabel: "Global Cards Active Across 200+ Countries",
        statLabelRo: "Carduri active în peste 200 de țări",
        catalyst: "Postwar Middle-Class Banking & Retail Credit Demand",
        catalystRo: "Cererea de credit a clasei de mijloc postbelice",
        narrative:
          "Bank of America launched the BankAmericard drop in Fresno, California, creating the first revolving credit card network that evolved into Visa's global electronic settlement system.",
        narrativeRo:
          "Bank of America a lansat prima rețea de carduri de credit cu plată rotativă, care s-a transformat în rețeaua de decontare electronică Visa.",
        keyInnovations: [
          { en: "Universal Revolving Credit Settlement Network", ro: "Rețea Universală de Decontare a Creditului" },
          { en: "Electronic Real-Time POS Authorization", ro: "Autorizare POS Electronică în Timp Real" },
        ],
      },
      {
        year: "1962",
        name: "Walmart",
        logoFile: "/ASSETS/Companies/Walmart_logo_(2008).svg",
        logoInvert: false,
        location: "Rogers, Arkansas",
        locationRo: "Rogers, Arkansas",
        breakthrough: "Big-Box Retail Logistics & Everyday Low Prices",
        breakthroughRo: "Logistica Retail Big-Box și Prețuri Mici Zilnic",
        statValue: "2.1 Million",
        statLabel: "World's Largest Private Employer",
        statLabelRo: "Cel mai mare angajator privat din lume",
        catalyst: "Small-Town Suburban Retail Demand & Interstate Highways",
        catalystRo: "Cererea de retail din orășele și autostrăzile",
        narrative:
          "Sam Walton opened the first Walmart with low margins to pass volume savings to customers, building barcode inventory tracking and private satellite distribution.",
        narrativeRo:
          "Sam Walton a deschis primul Walmart cu marje mici pentru a oferi economii clienților, construind un sistem logistic avansat cu urmărire prin satelit.",
        keyInnovations: [
          { en: "Everyday Low Price (EDLP) High-Volume Distribution", ro: "Distribuție de Mare Volum EDLP" },
          { en: "Real-Time Barcode Satellite Stock Management", ro: "Gestiune a Stocurilor prin Satelit și Coduri de Bare" },
        ],
      },
      {
        year: "1964",
        name: "Nike",
        logoFile: "/ASSETS/Companies/Logo_NIKE.svg",
        logoInvert: true,
        location: "Eugene, Oregon",
        locationRo: "Eugene, Oregon",
        breakthrough: "Waffle Soles, Air Jordans & Global Streetwear",
        breakthroughRo: "Tălpi Waffle, Air Jordan și stilul Streetwear",
        statValue: "150+ Markets",
        statLabel: "Global Athletic Performance & Culture Leader",
        statLabelRo: "Lider global în performanță sportivă",
        catalyst: "Track & Field Innovation & 1980s Pop Culture",
        catalystRo: "Inovațiile în atletism și cultura pop din anii '80",
        narrative:
          "Bill Bowerman poured rubber into a waffle iron to create lighter running shoes, and Phil Knight signed Michael Jordan in 1984, transforming sports shoes into street fashion.",
        narrativeRo:
          "Bill Bowerman a turnat cauciuc într-o formă de vafe pentru a crea pantofi de alergare ușori, iar Phil Knight l-a semnat pe Michael Jordan în 1984.",
        keyInnovations: [
          { en: "Waffle Iron Rubber Traction Sole", ro: "Talpă de Cauciuc cu Textură de Vafe" },
          { en: "Air Jordan Signature Athlete Partnership", ro: "Parteneriatul Emblematic Air Jordan" },
        ],
      },
    ],
  },
  {
    id: "computing-networks",
    number: "04",
    eraRange: "1970s – 1990s",
    title: "Personal Computing & Global Internet Networks",
    titleRo: "Informatica personală și rețelele globale de internet",
    subtitle: "Microprocessors, Graphical UIs, E-Commerce, and Search Engines",
    subtitleRo: "Microprocesoare, interfețe grafice, e-commerce și motoare de căutare",
    macroDriver:
      "Silicon Valley's silicon transistor advances and ARPANET protocols compressed computing from corporate mainframe rooms into personal desktop screens and interconnected browsers.",
    macroDriverRo:
      "Avansul tranzistoarelor de siliciu din Silicon Valley și protocoalele de rețea au adus computerele pe birourile personale și în browserele conectate.",
    companies: [
      {
        year: "1971",
        name: "Starbucks",
        logoFile: "/ASSETS/Companies/Starbucks_Corporation_Logo_2011.svg",
        logoInvert: false,
        location: "Seattle, Washington",
        locationRo: "Seattle, Washington",
        breakthrough: "The Third Place & Italian Espresso Culture",
        breakthroughRo: "Al Treilea Spațiu și cultura espresso italiană",
        statValue: "36,000+",
        statLabel: "Outlets Across 86 Nations",
        statLabelRo: "Locații în 86 de țări",
        catalyst: "Urban Professional Coffee Demand & Mobile Workspace",
        catalystRo: "Cererea de cafea urbană și munca mobilă",
        narrative:
          "Howard Schultz bought Starbucks in 1987 and introduced Italian espresso beverages and café seating, creating 'the third place' between home and work.",
        narrativeRo:
          "Howard Schultz a cumpărat Starbucks în 1987 și a introdus băuturile espresso italiene și spațiul de cafenea, creând „al treilea spațiu” între casă și birou.",
        keyInnovations: [
          { en: "The Third Place Urban Café Concept", ro: "Conceptul Cafenelei Al Treilea Spațiu" },
          { en: "Custom Italian Espresso Beverage Personalization", ro: "Personalizarea Băuturilor Espresso" },
        ],
      },
      {
        year: "1975",
        name: "Microsoft",
        logoFile: "/ASSETS/Companies/Microsoft_Logo_0.svg",
        logoInvert: false,
        location: "Albuquerque, New Mexico",
        locationRo: "Albuquerque, New Mexico",
        breakthrough: "Windows Graphical Operating System & Office",
        breakthroughRo: "Sistemul grafic de operare Windows și Office",
        statValue: "$3.1 Trillion",
        statLabel: "Operating System of the Knowledge Economy",
        statLabelRo: "Sistemul de operare al economiei cunoașterii",
        catalyst: "Intel Microprocessors & PC Industry Standardization",
        catalystRo: "Microprocesoarele Intel și standardizarea PC-urilor",
        narrative:
          "Bill Gates and Paul Allen built software for the Altair 8800, later creating MS-DOS, Windows 95, and Office to power global business productivity.",
        narrativeRo:
          "Bill Gates și Paul Allen au creat software pentru Altair 8800, dezvoltat ulterior în MS-DOS, Windows 95 și Office pentru birourile globale.",
        keyInnovations: [
          { en: "Standardized Graphical PC Operating System", ro: "Sistem Grafic de Operare Standardizat" },
          { en: "Microsoft Office Business Productivity Suite", ro: "Pachetul de Productivitate Office" },
        ],
      },
      {
        year: "1976",
        name: "Apple",
        logoFile: "/ASSETS/Companies/Apple_Logo white.svg",
        logoInvert: false,
        location: "Los Altos, California",
        locationRo: "Los Altos, California",
        breakthrough: "Apple II, Macintosh & iPhone Multi-Touch",
        breakthroughRo: "Apple II, Macintosh și iPhone Multi-Touch",
        statValue: "$3.4 Trillion",
        statLabel: "World's Most Valuable Consumer Technology Brand",
        statLabelRo: "Cel mai valoros brand din tehnologie",
        catalyst: "Homebrew Computer Club & Personal Silicon Microchips",
        catalystRo: "Pasiunea pentru cipuri de siliciu personale",
        narrative:
          "Steve Jobs and Steve Wozniak built the Apple I in a garage, later launching the 1984 Macintosh GUI and 2007 iPhone touch interface that simplified computing.",
        narrativeRo:
          "Steve Jobs și Steve Wozniak au construit Apple I într-un garaj, lansând ulterior Macintosh în 1984 și iPhone în 2007.",
        keyInnovations: [
          { en: "Graphical Mouse Interface (Macintosh)", ro: "Interfață Grafică cu Maus (Macintosh)" },
          { en: "Glass Capacitive Multi-Touch Interface (iPhone)", ro: "Ecran Tactil Capacitiv Multi-Touch (iPhone)" },
        ],
      },
      {
        year: "1994",
        name: "Amazon",
        logoFile: "/ASSETS/Companies/Amazon_Logo_0.svg",
        logoInvert: false,
        location: "Bellevue, Washington",
        locationRo: "Bellevue, Washington",
        breakthrough: "One-Click E-Commerce & Amazon Web Services (AWS)",
        breakthroughRo: "Comerțul One-Click și Amazon Web Services (AWS)",
        statValue: "30%+",
        statLabel: "Global Cloud Internet Infrastructure (AWS)",
        statLabelRo: "Infrastructură cloud internet globală (AWS)",
        catalyst: "Early World Wide Web Growth & Fulfillment Automation",
        catalystRo: "Creșterea internetului și automatizarea depozitelor",
        narrative:
          "Jeff Bezos started Amazon as an online bookstore, expanding into one-click shopping, Prime 2-day delivery, and launching AWS in 2006 to power the world's cloud computing.",
        narrativeRo:
          "Jeff Bezos a lansat Amazon ca librărie online, extinzându-se în livrări rapide Prime și lansând cloud-ul AWS în 2006.",
        keyInnovations: [
          { en: "Patented One-Click Checkout Technology", ro: "Tehnologie Brevetată One-Click" },
          { en: "Elastic On-Demand Public Cloud Computing (AWS)", ro: "Servicii Cloud Public la Cerere (AWS)" },
        ],
      },
      {
        year: "1998",
        name: "Google",
        logoFile: "/ASSETS/Companies/Google_Logo_0.svg",
        logoInvert: false,
        location: "Menlo Park, California",
        locationRo: "Menlo Park, California",
        breakthrough: "PageRank Search Engine & Minimalist UI",
        breakthroughRo: "Motorul de căutare PageRank și interfața curată",
        statValue: "92%",
        statLabel: "Global Search Market Share in 50+ Languages",
        statLabelRo: "Cota globală pe piața de căutare",
        catalyst: "Hyperlink Indexing & Distributed Server Clusters",
        catalystRo: "Indexarea hiperlink-urilor și clusterele de servere",
        narrative:
          "Larry Page and Sergey Brin invented PageRank at Stanford, offering a clean single search bar that organized the web and became humanity's primary entry point to knowledge.",
        narrativeRo:
          "Larry Page și Sergey Brin au inventat PageRank la Stanford, oferind o bară de căutare curată ce a devenit poarta principală către cunoaștere.",
        keyInnovations: [
          { en: "Hyperlink Graph PageRank Ranking Algorithm", ro: "Algoritmul de Clasare PageRank" },
          { en: "Minimalist Single Search Bar Interface", ro: "Interfață Minimalistă cu Bară Unică" },
        ],
      },
    ],
  },
  {
    id: "cloud-ai-era",
    number: "05",
    eraRange: "2000s – Present",
    title: "Cloud Infrastructure, Platforms & Artificial Intelligence",
    titleRo: "Infrastructura cloud, platformele digitale și inteligența artificială",
    subtitle: "Electric Mobility, Developer APIs, Social Graphs, and Generative AI",
    subtitleRo: "Mobilitate electrică, API-uri pentru dezvoltatori și AI generativ",
    macroDriver:
      "Ubiquitous smartphone connectivity, cloud data centers, and massive GPU parallel computing enabled real-time global platforms and artificial general intelligence models.",
    macroDriverRo:
      "Conectivitatea pe smartphone, centrele de date cloud și calculul paralel GPU au făcut posibile platformele globale în timp real și modelele de inteligență artificială.",
    companies: [
      {
        year: "2003",
        name: "Tesla",
        logoFile: "/ASSETS/Companies/tesla.svg",
        logoInvert: true,
        location: "San Carlos, California",
        locationRo: "San Carlos, California",
        breakthrough: "Lithium-Ion Electric Vehicles & Gigafactories",
        breakthroughRo: "Vehicule electrice Li-Ion și Gigafabrici",
        statValue: "5 Million+",
        statLabel: "Electric Vehicles Delivered Globally",
        statLabelRo: "Vehicule electrice livrate global",
        catalyst: "Lithium-Ion Battery Energy Density & Over-The-Air Software",
        catalystRo: "Densitatea bateriilor Li-Ion și software-ul OTA",
        narrative:
          "Elon Musk scaled Tesla to prove electric cars could outperform gasoline sports cars, building Supercharger networks and automated Gigafactories worldwide.",
        narrativeRo:
          "Elon Musk a dezvoltat Tesla pentru a demonstra că mașinile electrice pot depăși performanța celor pe benzină, construind rețeaua Supercharger și Gigafabrici.",
        keyInnovations: [
          { en: "Over-the-Air (OTA) Vehicle Software Updates", ro: "Actualizări Software Auto Over-the-Air (OTA)" },
          { en: "Integrated Supercharger Fast-Charging Network", ro: "Rețeaua Integrată de Încărcare Rapidă Supercharger" },
        ],
      },
      {
        year: "2004",
        name: "Meta",
        logoFile: "/ASSETS/Companies/Meta_idlf4cVSsS_0.svg",
        logoInvert: false,
        location: "Cambridge, Massachusetts",
        locationRo: "Cambridge, Massachusetts",
        breakthrough: "Social Graph Platform, Instagram & WhatsApp",
        breakthroughRo: "Platforma Social Graph, Instagram și WhatsApp",
        statValue: "3.2 Billion",
        statLabel: "Daily Active Users Across App Family",
        statLabelRo: "Utilizatori activi zilnic în aplicații",
        catalyst: "High-Speed Mobile Broadband & Photo Sharing",
        catalystRo: "Internetul mobil de mare viteză și distribuția foto",
        narrative:
          "Mark Zuckerberg launched Facebook in a Harvard dorm room, connecting billions of people worldwide through social graphs, news feeds, and messaging.",
        narrativeRo:
          "Mark Zuckerberg a lansat Facebook într-un cămin la Harvard, conectând miliarde de oameni prin rețele sociale și mesagerie.",
        keyInnovations: [
          { en: "Real-Time Algorithmic Social News Feed", ro: "Flux Algoritmic de Știri Sociale în Timp Real" },
          { en: "Global Multi-App Messaging Network Graph", ro: "Rețea Globală de Mesagerie Interconectată" },
        ],
      },
      {
        year: "2010",
        name: "Stripe",
        logoFile: "/ASSETS/Companies/Stripe_Logo,_revised_2016.svg",
        logoInvert: false,
        location: "San Francisco, California",
        locationRo: "San Francisco, California",
        breakthrough: "Developer Payment API Stack & Internet Economy",
        breakthroughRo: "Platforma API de plăți pentru dezvoltatori",
        statValue: "$1 Trillion+",
        statLabel: "Total Payment Volume Processed Annually",
        statLabelRo: "Volum total de plăți procesat anual",
        catalyst: "Mobile Developer App Economy & Cloud SaaS Boom",
        catalystRo: "Economia aplicațiilor mobile și serviciile Cloud SaaS",
        narrative:
          "Irish brothers Patrick and John Collison built Stripe with 7 lines of code, enabling any website or app developer to accept global credit payments instantly.",
        narrativeRo:
          "Frații irlandezi Patrick și John Collison au creat Stripe cu 7 linii de cod, permițând oricărui site să accepte plăți globale instant.",
        keyInnovations: [
          { en: "7-Lines of Code Developer Payment API", ro: "API de Plăți pentru Dezvoltatori în 7 Linii de Cod" },
          { en: "Global Financial Infrastructure for Internet Businesses", ro: "Infrastructură Financiară Globală pentru Afaceri Online" },
        ],
      },
      {
        year: "2015",
        name: "OpenAI",
        logoFile: "/ASSETS/Companies/openai.svg",
        logoInvert: true,
        location: "San Francisco, California",
        locationRo: "San Francisco, California",
        breakthrough: "ChatGPT & Large Language Transformer Models",
        breakthroughRo: "ChatGPT și modelele mari de limbaj Transformer",
        statValue: "200 Million+",
        statLabel: "Weekly Active ChatGPT Intelligence Users",
        statLabelRo: "Utilizatori săptămânali ChatGPT",
        catalyst: "NVIDIA GPU Parallel Training & Transformer Architecture",
        catalystRo: "Calculul paralel pe GPU-uri NVIDIA și arhitectura Transformer",
        narrative:
          "Founded by Sam Altman, Elon Musk, and AI researchers, OpenAI created ChatGPT in 2022, introducing natural conversational intelligence to hundreds of millions of users worldwide.",
        narrativeRo:
          "Fondată de Sam Altman, Elon Musk și cercetători AI, OpenAI a lansat ChatGPT în 2022, aducând inteligența conversațională către sute de milioane de oameni.",
        keyInnovations: [
          { en: "Generative Pre-trained Transformer Architecture", ro: "Arhitectura Generative Pre-trained Transformer" },
          { en: "Reinforcement Learning from Human Feedback (RLHF)", ro: "Învățare prin Consolidation cu Feedback Uman (RLHF)" },
        ],
      },
    ],
  },
];

export function CorporateLineageTimeline() {
  const { locale } = useLanguage();
  const ro = locale === "ro";

  const [activeEraIndex, setActiveEraIndex] = useState(0);
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);

  const activeEra = LINEAGE_ERAS[activeEraIndex] || LINEAGE_ERAS[0];
  const activeCompany =
    activeEra.companies[activeCompanyIndex] || activeEra.companies[0];

  const handleEraChange = (index: number) => {
    setActiveEraIndex(index);
    setActiveCompanyIndex(0);
  };

  return (
    <div className="my-16">
      {/* Monumental 5 Era Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
        {LINEAGE_ERAS.map((era, i) => {
          const on = i === activeEraIndex;
          return (
            <button
              key={era.id}
              type="button"
              onClick={() => handleEraChange(i)}
              className="text-left rounded-2xl p-5 transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.04)",
                color: on ? "#F5EDD8" : "rgba(245,237,216,0.65)",
                borderColor: on ? "#E8B923" : "rgba(255,255,255,0.08)",
                transform: on ? "translateY(-3px)" : "none",
                boxShadow: on ? "0 20px 40px rgba(0,0,0,0.5)" : "none",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-body text-[10px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: on ? "#E8B923" : "#E8391B" }}
                >
                  ERA {era.number}
                </span>
                <span className="font-mono text-xs font-bold opacity-60">
                  {era.eraRange}
                </span>
              </div>
              <p className="font-macro-display text-base font-black leading-tight">
                {ro ? era.titleRo : era.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Era Macro Enabler Banner */}
      <div className="rounded-3xl border border-glory-gold/30 bg-glory-gold/[0.04] p-6 md:p-8 mb-10 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold block mb-1">
              {ro ? "CATALIZATORUL MACRO-ECONOMIC AL EREI" : "ERA MACRO-ECONOMIC ENABLER"}
            </span>
            <h3 className="font-macro-display text-2xl md:text-3xl font-black text-white">
              {ro ? activeEra.subtitleRo : activeEra.subtitle}
            </h3>
          </div>
          <span className="rounded-full bg-white/10 border border-white/15 px-4 py-1.5 font-body text-xs font-bold text-white shrink-0">
            {activeEra.eraRange}
          </span>
        </div>
        <p className="font-editorial text-base md:text-lg text-[#F5EDD8]/80 leading-relaxed mt-4">
          {ro ? activeEra.macroDriverRo : activeEra.macroDriver}
        </p>
      </div>

      {/* Interactive Horizontal Year Axis */}
      <div className="mb-10 rounded-2xl bg-white/[0.03] border border-white/10 p-4 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-3 min-w-max justify-around">
          {activeEra.companies.map((comp, idx) => {
            const isSel = idx === activeCompanyIndex;
            return (
              <button
                key={comp.year + comp.name}
                type="button"
                onClick={() => setActiveCompanyIndex(idx)}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300"
                style={{
                  cursor: "pointer",
                  backgroundColor: isSel ? "#E8B923" : "rgba(255,255,255,0.05)",
                  color: isSel ? "#0C0907" : "#F5EDD8",
                  borderColor: isSel ? "#E8B923" : "rgba(255,255,255,0.1)",
                  transform: isSel ? "scale(1.05)" : "scale(1)",
                  fontWeight: isSel ? 800 : 500,
                }}
              >
                <span className="font-mono text-sm font-bold">{comp.year}</span>
                <span className="font-body text-xs uppercase tracking-wider">{comp.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Company Dossier Feature Card */}
      <div key={activeCompany.year + activeCompany.name} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-6">
            <div className="relative h-12 w-36 flex items-center shrink-0">
              <Image
                src={activeCompany.logoFile}
                alt={activeCompany.name}
                fill
                className={`object-contain object-left ${
                  activeCompany.logoInvert ? "brightness-0 invert" : ""
                }`}
              />
            </div>
            <div>
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold block mb-0.5">
                {ro ? `FONDATĂ ÎN ${activeCompany.year}` : `FOUNDED IN ${activeCompany.year}`}
              </span>
              <h3 className="font-macro-display text-3xl font-black text-white">
                {activeCompany.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1">
            <span className="font-body text-xs font-semibold text-[#F5EDD8]/60">
              📍 {ro ? activeCompany.locationRo : activeCompany.location}
            </span>
            <span className="font-body text-[11px] font-bold uppercase tracking-wider text-[#E8391B]">
              ⚡ {ro ? activeCompany.catalystRo : activeCompany.catalyst}
            </span>
          </div>
        </div>

        {/* Dossier Content Grid */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Left Column: Breakthrough Product, Key Stat & Innovations */}
          <div className="space-y-6">
            {/* Breakthrough Product */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8391B] block mb-1">
                {ro ? "INOVAȚIE DE FONDRE" : "FOUNDATIONAL BREAKTHROUGH"}
              </span>
              <h4 className="font-macro-display text-2xl sm:text-3xl font-black text-white leading-tight">
                {ro ? activeCompany.breakthroughRo : activeCompany.breakthrough}
              </h4>
            </div>

            {/* Key Stat Box */}
            <div className="rounded-2xl border border-glory-gold/30 bg-glory-gold/[0.05] p-6">
              <p className="font-macro-display text-3xl sm:text-4xl font-black text-glory-gold tracking-tight mb-1">
                {activeCompany.statValue}
              </p>
              <p className="font-body text-xs font-bold uppercase tracking-wider text-[#F5EDD8]/70">
                {ro ? activeCompany.statLabelRo : activeCompany.statLabel}
              </p>
            </div>

            {/* Key Innovations */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold mb-3">
                {ro ? "INOVAȚII CHEIE" : "KEY INNOVATIONS"}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeCompany.keyInnovations.map((inn, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 font-body text-xs font-semibold text-[#F5EDD8]"
                  >
                    {ro ? inn.ro : inn.en}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Historical Narrative */}
          <div className="space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
            <div>
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5EDD8]/50 mb-3">
                {ro ? "ISTORIA CORPORATIVĂ & IMPACTUL" : "CORPORATE GENESIS & IMPACT"}
              </p>
              <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#F5EDD8]/90">
                {ro ? activeCompany.narrativeRo : activeCompany.narrative}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
