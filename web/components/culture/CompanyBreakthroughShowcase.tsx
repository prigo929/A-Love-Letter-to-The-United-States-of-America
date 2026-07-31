"use client";

// ─── CompanyBreakthroughShowcase ─────────────────────────────────────────────
// "Company Breakthrough Showcase": Highlighting 12 iconic American companies,
// clean unboxed official logos, 2-row selector grid, founder quotes, milestones,
// and breakthrough innovations.
// Written in editorial voice: zero em dashes, zero AI tropes.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface CompanyMilestone {
  year: string;
  label: string;
  labelRo: string;
}

interface FeaturedCompany {
  id: string;
  name: string;
  logoFile: string;
  logoInvert?: boolean;
  foundedYear: string;
  breakthroughProduct: string;
  breakthroughProductRo: string;
  breakthroughYear: string;
  statValue: string;
  statLabel: string;
  statLabelRo: string;
  founderQuote: string;
  founderQuoteRo: string;
  founderName: string;
  tagline: string;
  taglineRo: string;
  story: string;
  storyRo: string;
  culturalImpact: string;
  culturalImpactRo: string;
  milestones: CompanyMilestone[];
  innovations: { en: string; ro: string }[];
}

const FEATURED_COMPANIES: FeaturedCompany[] = [
  {
    id: "apple",
    name: "Apple",
    logoFile: "/ASSETS/Companies/Apple_Logo white.svg",
    logoInvert: false,
    foundedYear: "1976",
    breakthroughProduct: "The iPhone & Multi-Touch Interface",
    breakthroughProductRo: "iPhone și Interfața Multi-Touch",
    breakthroughYear: "2007",
    statValue: "$3.4 Trillion",
    statLabel: "World's Most Valuable Brand",
    statLabelRo: "Cel mai valoros brand din lume",
    founderQuote: "Design is not just what it looks like and feels like. Design is how it works.",
    founderQuoteRo: "Designul nu înseamnă doar cum arată și cum se simte. Designul înseamnă cum funcționează.",
    founderName: "Steve Jobs",
    tagline: "Putting a pocket supercomputer into the hands of billions",
    taglineRo: "A pus un supercomputer de buzunar în mâinile a miliarde de oameni",
    story:
      "In January 2007, Steve Jobs unveiled the iPhone, combining a widescreen iPod, a revolutionary mobile phone, and a breakthrough internet communicator into a single glass display with zero physical keyboard buttons. By replacing styluses with natural finger gestures, Apple simplified personal computing into an extension of human instinct.",
    storyRo:
      "În ianuarie 2007, Steve Jobs a prezentat iPhone-ul, combinând un iPod cu ecran lat, un telefon mobil revoluționar și un dispozitiv de comunicare pe internet într-un singur ecran de sticlă fără tastatură fizică. Înlocuind stilusul cu gesturile naturale ale degetelor, Apple a transformat informatica într-o extensie a instinctului uman.",
    culturalImpact:
      "Created the app economy, mobile photography, and redefined how humans communicate, work, navigate, and record daily life globally.",
    culturalImpactRo:
      "A creat economia aplicațiilor, fotografia mobilă și a redefinit modul în care oamenii comunică, lucrează și înregistrează viața de zi cu zi.",
    milestones: [
      { year: "1984", label: "Macintosh GUI & Mouse", labelRo: "Macintosh Interfață Grafică" },
      { year: "2001", label: "iPod 1,000 Songs in Pocket", labelRo: "iPod 1.000 de Melodii în Buzunar" },
      { year: "2007", label: "iPhone Glass Touch", labelRo: "iPhone Ecran Tactil de Sticlă" },
    ],
    innovations: [
      { en: "Capacitive Multi-Touch Display", ro: "Ecran Capacitiv Multi-Touch" },
      { en: "iOS App Store Ecosystem", ro: "Ecosistemul App Store iOS" },
      { en: "Custom Silicon M-Series Chips", ro: "Cipuri Proprii Apple Silicon" },
    ],
  },
  {
    id: "nike",
    name: "Nike",
    logoFile: "/ASSETS/Companies/Logo_NIKE.svg",
    logoInvert: true,
    foundedYear: "1964",
    breakthroughProduct: "Air Jordan I & Streetwear Culture",
    breakthroughProductRo: "Air Jordan I și Cultura Streetwear",
    breakthroughYear: "1984",
    statValue: "150+ Markets",
    statLabel: "Global Athletic & Culture Leader",
    statLabelRo: "Lider global în atletism și cultură",
    founderQuote: "If you have a body, you are an athlete.",
    founderQuoteRo: "Dacă ai un corp, ești un atlet.",
    founderName: "Bill Bowerman",
    tagline: "Transforming athletic gear into global streetwear and human ambition",
    taglineRo: "Transformarea echipamentului sportiv în stil streetwear și ambiție umană",
    story:
      "Founded by track coach Bill Bowerman and runner Phil Knight, Nike revolutionized footwear by pouring rubber into a kitchen waffle iron. In 1984, Nike signed rookie Michael Jordan and released the black-and-red Air Jordan I. When the NBA banned the shoe for violating uniform colors, Nike paid the $5,000 fine per game, igniting global sneakerhead culture.",
    storyRo:
      "Fondată de antrenorul Bill Bowerman și alergătorul Phil Knight, Nike a revoluționat încălțămintea turnând cauciuc într-o formă de vafe. În 1984, Nike l-a semnat pe Michael Jordan și a lansat Air Jordan I. Când NBA a interzis pantoful din cauza culorilor, Nike a plătit amenda de 5.000$ pe meci, aprinzând cultura sneakerhead.",
    culturalImpact:
      "Elevated performance sportswear into high-fashion streetwear and established 'Just Do It' as a global manifesto of human potential.",
    culturalImpactRo:
      "A ridicat îmbrăcămintea sportivă la rang de modă urbană și a consacrat sloganul „Just Do It” ca manifest al potențialului uman.",
    milestones: [
      { year: "1971", label: "Swoosh Logo Design", labelRo: "Designul Logo-ului Swoosh" },
      { year: "1984", label: "Air Jordan Sneaker Contract", labelRo: "Contractul Air Jordan" },
      { year: "1988", label: "Just Do It Campaign", labelRo: "Campania Just Do It" },
    ],
    innovations: [
      { en: "Waffle Iron Rubber Soles", ro: "Tălpi de Cauciuc cu Textură de Vafe" },
      { en: "Encapsulated Nike Air Cushioning", ro: "Pernă de Aer Incapsulată Nike Air" },
      { en: "Flyknit Seamless Weave", ro: "Țesătură Fără Cusături Flyknit" },
    ],
  },
  {
    id: "cocacola",
    name: "Coca-Cola",
    logoFile: "/ASSETS/Companies/Coca-Cola_Logo_0.svg",
    logoInvert: false,
    foundedYear: "1886",
    breakthroughProduct: "Contoured Glass Bottle & Bottling System",
    breakthroughProductRo: "Sticla conturată de sticlă și sistemul de îmbuteliere",
    breakthroughYear: "1915",
    statValue: "1.9 Billion",
    statLabel: "Daily Servings Reached Worldwide",
    statLabelRo: "Porții zilnice consumate în lume",
    founderQuote: "Wherever you go, Coca-Cola is within an arm's reach of desire.",
    founderQuoteRo: "Oriunde mergi, Coca-Cola este la îndemâna dorinței.",
    founderName: "Robert Woodruff",
    tagline: "The most recognized trademark on Earth",
    taglineRo: "Cel mai recunoscut logo de pe Pământ",
    story:
      "Invented in Atlanta by pharmacist John Pemberton, Coca-Cola achieved legendary status in 1915 when the Root Glass Company designed the iconic contoured glass bottle, recognizable even by touch in the dark. Coca-Cola pioneered the independent bottling franchise model, enabling local businessmen in 200+ countries to produce and distribute the drink locally.",
    storyRo:
      "Inventată în Atlanta de farmacistul John Pemberton, Coca-Cola a atins statutul de legendă în 1915 când Root Glass Company a proiectat sticla conturată, recognoscibilă chiar și la atingere pe întuneric. Coca-Cola a creat modelul de franciză de îmbuteliere independentă în peste 200 de țări.",
    culturalImpact:
      "Exported American soda fountain culture worldwide and shaped the modern visual image of Santa Claus through Haddon Sundblom's 1931 illustrations.",
    culturalImpactRo:
      "A exportat cultura americană a băuturilor răcoritoare și a conturat imaginea modernă a lui Moș Crăciun prin ilustrațiile din 1931 ale lui Haddon Sundblom.",
    milestones: [
      { year: "1886", label: "Atlanta Soda Fountain Origin", labelRo: "Originea în Atlanta" },
      { year: "1915", label: "Contoured Bottle Patent", labelRo: "Brevetul Sticlei Conturate" },
      { year: "1971", label: "Hilltop Global Harmony Ad", labelRo: "Reclama Globală Hilltop" },
    ],
    innovations: [
      { en: "Independent Bottling Franchise Network", ro: "Rețea de Francize de Îmbuteliere Independentă" },
      { en: "Tactile Contoured Bottle Package", ro: "Ambalaj Tactil cu Sticlă Conturată" },
      { en: "Global Brand Licensing System", ro: "Sistem Global de Licențiere a Brandului" },
    ],
  },
  {
    id: "levis",
    name: "Levi's",
    logoFile: "/ASSETS/Companies/Levi's_logo.svg",
    logoInvert: false,
    foundedYear: "1853",
    breakthroughProduct: "501 Copper-Riveted Blue Jeans",
    breakthroughProductRo: "Blugii 501 cu nituri de cupru",
    breakthroughYear: "1873",
    statValue: "170+ Years",
    statLabel: "The Democratic Uniform of Humanity",
    statLabelRo: "Uniforma democratică a omenirii",
    founderQuote: "They are the most democratic piece of clothing ever invented.",
    founderQuoteRo: "Sunt cel mai democratic articol vestimentar inventat vreodată.",
    founderName: "Yves Saint Laurent",
    tagline: "Workwear born in the California Gold Rush that conquered every continent",
    taglineRo: "Haine de muncă din Goana după Aur care au cucerit toate continentele",
    story:
      "Bavarian immigrant Levi Strauss and Nevada tailor Jacob Davis patented copper rivets on denim work pants in 1873, creating rugged wear for miners and cowboys. Over the next century, the 501 blue jean evolved from working-class trousers into the universal garment of youth rebellion, rock stars, and everyday citizens across the globe.",
    storyRo:
      "Imigrantul bavarez Levi Strauss și croitorul Jacob Davis au brevetat niturile de cupru pe pantalonii de lucru din denim în 1873. În următorul secol, blugii 501 s-au transformat din pantaloni ai clasei muncitoare în articolul vestimentar universal al rebeliunii tinerilor.",
    culturalImpact:
      "Created the single most democratic fashion item in history: worn equally by farmhands, rock icons, tech billionaires, and heads of state.",
    culturalImpactRo:
      "A creat cel mai democratic articol vestimentar din istorie: purtat la fel de fermieri, vedete rock, miliardari din tech și șefi de stat.",
    milestones: [
      { year: "1873", label: "Copper-Rivet Patent", labelRo: "Brevetul Nitului de Cupru" },
      { year: "1934", label: "First Lady Levi's Blue Jeans", labelRo: "Primii Blugi Levi's pentru Femei" },
      { year: "1960s", label: "Global Youth Counterculture", labelRo: "Simbolul Contraculturii Tinerilor" },
    ],
    innovations: [
      { en: "Copper Rivet Strain Reinforcement", ro: "Ranforsare cu Nituri de Cupru" },
      { en: "Heavyweight Cone Mills Denim", ro: "Material Denim Rezistent Cone Mills" },
      { en: "Arcuate Double-Stitch Pocket", ro: "Cusătură Dublă Arcuite pe Buzunar" },
    ],
  },
  {
    id: "ford",
    name: "Ford",
    logoFile: "/ASSETS/Companies/Ford-Motor-Company-Logo.png",
    logoInvert: false,
    foundedYear: "1903",
    breakthroughProduct: "Model T & Moving Assembly Line",
    breakthroughProductRo: "Model T și linia mobilă de asamblare",
    breakthroughYear: "1913",
    statValue: "15 Million",
    statLabel: "Model T Cars Produced (1908–1927)",
    statLabelRo: "Automobile Model T produse (1908–1927)",
    founderQuote: "Whether you think you can or think you can't, you're right.",
    founderQuoteRo: "Fie că crezi că poți, fie că crezi că nu poți, ai dreptate.",
    founderName: "Henry Ford",
    tagline: "Democratizing personal mobility and inventing mass production",
    taglineRo: "Democratizarea mobilității personale și inventarea producției în masă",
    story:
      "Henry Ford set out to build 'a motor car for the great multitude.' In 1913, he introduced the moving assembly line at the Highland Park plant in Michigan, cutting vehicle assembly time from 12 hours to 93 minutes. By doubling worker wages to $5 a day, Ford created an auto-owning middle class capable of buying the products they built.",
    storyRo:
      "Henry Ford și-a propus să construiască „un automobil pentru marea mulțime”. În 1913, a introdus linia mobilă de asamblare la fabrica Highland Park, reducând timpul de asamblare de la 12 ore la 93 de minute. Dublând salariile la 5$ pe zi, Ford a creat clasa de mijloc capabilă să cumpere produsele fabricate.",
    culturalImpact:
      "Pioneered mass industrial manufacturing, paved the way for modern highway infrastructure, and reshaped American geography.",
    culturalImpactRo:
      "A fost pionierul producției industriale de masă, deschizând drumul pentru infrastructura rutieră modernă și reconfigurând geografia americană.",
    milestones: [
      { year: "1908", label: "Model T Debut ($850)", labelRo: "Lansarea Model T (850$)" },
      { year: "1913", label: "Highland Park Moving Assembly Line", labelRo: "Linia Mobilă de Asamblare" },
      { year: "1914", label: "$5-a-Day Worker Wage", labelRo: "Salariul de 5$ pe Zi" },
    ],
    innovations: [
      { en: "Continuous Moving Assembly Line", ro: "Linie Mobilă Continuă de Asamblare" },
      { en: "Standardized Interchangeable Parts", ro: "Piese Standardizate Interschimbabile" },
      { en: "High-Wage Mass Consumer Economics", ro: "Economia Consumului de Masă cu Salarii Mari" },
    ],
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    logoFile: "/ASSETS/Companies/McDonald's_Symbol_0.svg",
    logoInvert: false,
    foundedYear: "1940",
    breakthroughProduct: "Speedee Service System & Golden Arches",
    breakthroughProductRo: "Sistemul Speedee Service și Arcadele de Aur",
    breakthroughYear: "1954",
    statValue: "40,000+",
    statLabel: "Restaurants Serving 69M Customers Daily",
    statLabelRo: "Restaurante ce deservesc 69M clienți zilnic",
    founderQuote: "None of us is as good as all of us.",
    founderQuoteRo: "Niciunul dintre noi nu este la fel de bun ca noi toți împreună.",
    founderName: "Ray Kroc",
    tagline: "Exporting standardized dining speed and global family convenience",
    taglineRo: "Exportul vitezei culinare standardizate și al confortului de familie",
    story:
      "Richard and Maurice McDonald streamlined restaurant kitchens into factory assembly lines in San Bernardino, California. Milkshake machine salesman Ray Kroc recognized the franchise potential in 1954, scaling McDonald's into the world's premier food service organization with identical quality and clean architecture in every town.",
    storyRo:
      "Frații Richard și Maurice McDonald au eficientizat bucătăriile în linii de asamblare în San Bernardino. Agentul de vânzări Ray Kroc a intuit potențialul de franciză în 1954, extinzând McDonald's în cea mai mare organizație de restaurant din lume.",
    culturalImpact:
      "Established the global fast-food paradigm, popularized drive-thru dining, and created the Golden Arches symbol recognized by 88% of the planet.",
    culturalImpactRo:
      "A consacrat paradigma globală fast-food, a popularizat serviciul drive-thru și a creat simbolul Arcadelor de Aur recunoscut de 88% din populație.",
    milestones: [
      { year: "1948", label: "Speedee Kitchen Assembly System", labelRo: "Sistemul Bucătăriei Rapide" },
      { year: "1954", label: "Ray Kroc National Franchise Buyout", labelRo: "Franciza Națională Ray Kroc" },
      { year: "1968", label: "The Big Mac Global Debut", labelRo: "Lansarea Globală Big Mac" },
    ],
    innovations: [
      { en: "Standardized Factory Kitchen Assembly", ro: "Bucătărie Standardizată Liniară" },
      { en: "Automated Drive-Thru Service Window", ro: "Serviciul Drive-Thru Automatizat" },
      { en: "Planetary Quality Franchise Operating Manual", ro: "Manualul Global de Operare al Francizei" },
    ],
  },
  {
    id: "disney",
    name: "Disney",
    logoFile: "/ASSETS/Companies/Disney_iddEtLt1OH_0.svg",
    logoInvert: true,
    foundedYear: "1923",
    breakthroughProduct: "Mickey Mouse & Disneyland Theme Park",
    breakthroughProductRo: "Mickey Mouse și Parcul Tematic Disneyland",
    breakthroughYear: "1928",
    statValue: "$200B+",
    statLabel: "World's Premier Storytelling Empire",
    statLabelRo: "Cel mai mare imperiu de povești din lume",
    founderQuote: "It's kind of fun to do the impossible.",
    founderQuoteRo: "Este destul de distractiv să faci imposibilul.",
    founderName: "Walt Disney",
    tagline: "Building a century-old empire of animation, imagination, and theme parks",
    taglineRo: "Construirea unui imperiu de un secol de animație, imaginație și parcuri",
    story:
      "Walt Disney premiered Steamboat Willie in 1928, introducing synchronized sound animation and Mickey Mouse. In 1955, Disney opened Disneyland in Anaheim, California, creating the world's first immersive theme park where animated worlds were materialized in physical space.",
    storyRo:
      "Walt Disney a lansat Steamboat Willie în 1928, introducând animația cu sunet sincronizat și pe Mickey Mouse. În 1955, a deschis Disneyland în California, creând primul parc tematic imersiv unde lumile din desene au prins viață.",
    culturalImpact:
      "Set the global standard for animated feature films, family entertainment, and created a story IP empire encompassing Pixar, Marvel, and Star Wars.",
    culturalImpactRo:
      "A stabilit standardul global pentru filme de animație, divertisment de familie și a creat un imperiu ce include Pixar, Marvel și Star Wars.",
    milestones: [
      { year: "1928", label: "Steamboat Willie (Mickey Debut)", labelRo: "Steamboat Willie (Debut Mickey)" },
      { year: "1937", label: "Snow White First Feature Film", labelRo: "Alba ca Zăpada Primul Lungmetraj" },
      { year: "1955", label: "Disneyland Theme Park Grand Opening", labelRo: "Deschiderea Disneyland" },
    ],
    innovations: [
      { en: "Multiplane Camera Animated Depth", ro: "Cameră Multiplan pentru Adâncime în Animație" },
      { en: "Immersive Physical Imagineering Theme Parks", ro: "Parcuri Tematice Imersive Physical Imagineering" },
      { en: "Transmedia IP Universe Franchise Architecture", ro: "Arhitectură de Franciză Transmedia IP" },
    ],
  },
  {
    id: "google",
    name: "Google",
    logoFile: "/ASSETS/Companies/Google_Logo_0.svg",
    logoInvert: false,
    foundedYear: "1998",
    breakthroughProduct: "PageRank Search & Clean White Homepage",
    breakthroughProductRo: "Căutarea PageRank și Pagina Principală Albă",
    breakthroughYear: "1998",
    statValue: "92%",
    statLabel: "Global Search Market Share in 50+ Languages",
    statLabelRo: "Cota de piață globală căutare în 50+ limbi",
    founderQuote: "Organize the world's information and make it universally accessible.",
    founderQuoteRo: "Organizarea informațiilor lumii și accesibilizarea lor universală.",
    founderName: "Larry Page & Sergey Brin",
    tagline: "Organizing the world's information and making it universally accessible",
    taglineRo: "Organizarea informațiilor lumii și accesibilizarea lor universală",
    story:
      "Stanford PhD students Larry Page and Sergey Brin developed PageRank, an algorithm that ranked web pages based on hyperlink connections rather than keyword density. By offering a clean, distraction-free search bar, Google replaced chaotic web portals and became the default gateway to human knowledge.",
    storyRo:
      "Doctoranzii de la Stanford Larry Page și Sergey Brin au dezvoltat PageRank, un algoritm ce clasifica paginile web după legăturile de hipertext. Oferind o bară de căutare simplă și curată, Google a devenit poarta principală de acces la cunoașterea umană.",
    culturalImpact:
      "Turned 'Google' into a universal verb in 50+ languages, created Android powering billions of smartphones, and mapped the physical planet via Google Maps.",
    culturalImpactRo:
      "A transformat „a căuta pe Google” într-un verb universal în 50+ limbi, a creat Android și a cartografiat planeta fizică prin Google Maps.",
    milestones: [
      { year: "1998", label: "PageRank Search Engine Launch", labelRo: "Lansarea Motorului PageRank" },
      { year: "2008", label: "Android Mobile OS & Chrome Browser", labelRo: "Android OS & Chrome Browser" },
      { year: "2015", label: "Alphabet Holding Parent Structure", labelRo: "Structura Mamă Alphabet" },
    ],
    innovations: [
      { en: "Hyperlink Graph PageRank Algorithm", ro: "Algoritmul PageRank bazat pe Hiperlink" },
      { en: "Minimalist Distraction-Free Single Search UI", ro: "Interfață Minimalistă cu Bară Unică" },
      { en: "Global Distributed Infrastructure & Server Nodes", ro: "Noduri Globale de Infrastructură Servitoare" },
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    logoFile: "/ASSETS/Companies/Amazon_Logo_0.svg",
    logoInvert: false,
    foundedYear: "1994",
    breakthroughProduct: "One-Click Shopping & Amazon Web Services (AWS)",
    breakthroughProductRo: "Cumpărăturile One-Click și Amazon Web Services (AWS)",
    breakthroughYear: "2006",
    statValue: "30%+",
    statLabel: "Global Cloud Internet Infrastructure (AWS)",
    statLabelRo: "Infrastructură cloud internet globală (AWS)",
    founderQuote: "Your margin is my opportunity.",
    founderQuoteRo: "Marja ta de profit este oportunitatea mea.",
    founderName: "Jeff Bezos",
    tagline: "From online bookstore to the infrastructure layer of global commerce",
    taglineRo: "De la librărie online la stratul de infrastructură al comerțului global",
    story:
      "Jeff Bezos launched Amazon as an online bookstore from a Seattle garage in 1994. By expanding into one-click ordering, Prime fast delivery, and launching Amazon Web Services (AWS) in 2006 to power the world's cloud computing, Amazon became the backbone of modern global logistics and digital commerce.",
    storyRo:
      "Jeff Bezos a lansat Amazon ca librărie online într-un garaj din Seattle în 1994. Extinzându-se în comenzi cu un singur clic, livrare rapidă Prime și lansând AWS în 2006, Amazon a devenit coloana vertebrală a logisticii globale.",
    culturalImpact:
      "Redefined consumer expectations for instant package delivery and powers over 30% of the entire global internet infrastructure via AWS.",
    culturalImpactRo:
      "A redefinit așteptările clienților pentru livrare rapidă și alimentează peste 30% din infrastructura globală de internet prin AWS.",
    milestones: [
      { year: "1994", label: "Online Garage Bookstore", labelRo: "Librăria Online din Garaj" },
      { year: "2005", label: "Amazon Prime Fast 2-Day Shipping", labelRo: "Livrarea Rapidă Amazon Prime" },
      { year: "2006", label: "AWS Cloud Infrastructure Debut", labelRo: "Lansarea Cloud-ului AWS" },
    ],
    innovations: [
      { en: "Patented One-Click Checkout System", ro: "Sistem Brevetat de Comandă One-Click" },
      { en: "Robotic Automated Fulfillment Warehouses", ro: "Depozite Robotizate Automatizate" },
      { en: "Elastic On-Demand Cloud Infrastructure (AWS)", ro: "Infrastructură Cloud la Cerere (AWS)" },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logoFile: "/ASSETS/Companies/Microsoft_Logo_0.svg",
    logoInvert: false,
    foundedYear: "1975",
    breakthroughProduct: "Windows Graphic Operating System & Office",
    breakthroughProductRo: "Sistemul de Operare Grafic Windows și Office",
    breakthroughYear: "1995",
    statValue: "$3.1 Trillion",
    statLabel: "Operating System of the Global Knowledge Economy",
    statLabelRo: "Sistemul de operare al economiei globale a cunoașterii",
    founderQuote: "A computer on every desk and in every home.",
    founderQuoteRo: "Un computer pe fiecare birou și în fiecare casă.",
    founderName: "Bill Gates",
    tagline: "A computer on every desk and in every home",
    taglineRo: "Un computer pe fiecare birou și în fiecare casă",
    story:
      "Bill Gates and Paul Allen founded Microsoft with the bold vision of putting a computer on every desk. With Windows 95, Microsoft unified graphical interfaces, desktop productivity software, and internet networking, building the foundational software stack of the modern global office.",
    storyRo:
      "Bill Gates și Paul Allen au fondat Microsoft cu viziunea de a pune un computer pe fiecare birou. Cu Windows 95, Microsoft a unificat interfețele grafice și software-ul de birou, construind temelia muncii moderne.",
    culturalImpact:
      "Standardized corporate productivity, powered personal computing for billions, and built cloud platform Azure alongside gaming empire Xbox.",
    culturalImpactRo:
      "A standardizat productivitatea corporativă, a alimentat informatica personală pentru miliarde de oameni și a creat Azure și Xbox.",
    milestones: [
      { year: "1985", label: "Windows 1.0 Graphic Interface", labelRo: "Interfața Grafică Windows 1.0" },
      { year: "1995", label: "Windows 95 Global Release", labelRo: "Lansarea Globală Windows 95" },
      { year: "2014", label: "Cloud-First Azure Cloud Pivot", labelRo: "Pivotul Către Cloud Azure" },
    ],
    innovations: [
      { en: "Standardized Desktop Windowing GUI", ro: "Interfață Grafică Standardizată Desktop" },
      { en: "Microsoft Office Productivity Suite", ro: "Pachetul de Productivitate Microsoft Office" },
      { en: "Azure Enterprise Cloud & AI Platform", ro: "Platforma Enterprise Cloud Azure & AI" },
    ],
  },
  {
    id: "walmart",
    name: "Walmart",
    logoFile: "/ASSETS/Companies/Walmart_logo_(2008).svg",
    logoInvert: false,
    foundedYear: "1962",
    breakthroughProduct: "Big-Box Retail Logistics & Everyday Low Prices",
    breakthroughProductRo: "Logistica Retail Big-Box și Prețuri Mici Zilnic",
    breakthroughYear: "1962",
    statValue: "2.1 Million",
    statLabel: "World's Largest Private Employer",
    statLabelRo: "Cel mai mare angajator privat din lume",
    founderQuote: "There is only one boss. The customer.",
    founderQuoteRo: "Există un singur șef. Clientul.",
    founderName: "Sam Walton",
    tagline: "Everyday Low Prices serving 265 million weekly customers",
    taglineRo: "Prețuri mici zilnic ce deservesc 265M de clienți săptămânal",
    story:
      "Sam Walton opened the first Walmart in Rogers, Arkansas, operating on the radical premise of selling goods at lower profit margins to pass volume savings to working-class families. Walmart pioneered real-time barcode inventory tracking and satellite distribution networks, creating the world's most efficient retail machine.",
    storyRo:
      "Sam Walton a deschis primul Walmart în Rogers, Arkansas, mizând pe vânzarea mărfurilor cu marje mici pentru a oferi economii familiilor. Walmart a fost pionier în urmărirea stocurilor prin coduri de bare și distribuție prin satelit.",
    culturalImpact:
      "Transformed global supply chain logistics, revolutionized suburban retail architecture, and expanded purchasing power for middle-class families.",
    culturalImpactRo:
      "A transformat logistica lanțurilor de aprovizionare, a revoluționat retailul suburban și a extins puterea de cumpărare a familiilor.",
    milestones: [
      { year: "1962", label: "Store #1 Rogers Arkansas", labelRo: "Magazinul #1 Rogers Arkansas" },
      { year: "1983", label: "Sam's Club Wholesale Launch", labelRo: "Lansarea Sam's Club" },
      { year: "1988", label: "First Supercenter Retail Store", labelRo: "Primul Supercenter Retail" },
    ],
    innovations: [
      { en: "Everyday Low Price (EDLP) High-Volume System", ro: "Sistemul EDLP cu Volum Mare" },
      { en: "Barcode Point-of-Sale Supply Tracking", ro: "Urmărirea Stocurilor cu Coduri de Bare" },
      { en: "Private Satellite Communications Distribution", ro: "Distribuție prin Satelit Privat" },
    ],
  },
  {
    id: "starbucks",
    name: "Starbucks",
    logoFile: "/ASSETS/Companies/Starbucks_Corporation_Logo_2011.svg",
    logoInvert: false,
    foundedYear: "1971",
    breakthroughProduct: "The Third Place & Espresso Culture",
    breakthroughProductRo: "Al Treilea Spațiu și Cultura Espresso",
    breakthroughYear: "1987",
    statValue: "36,000+",
    statLabel: "Global Outlets Across 86 Nations",
    statLabelRo: "Locații globale în 86 de țări",
    founderQuote: "We are not in the coffee business serving people. We are in the people business serving coffee.",
    founderQuoteRo: "Nu suntem în afacerea cu cafea servind oameni. Suntem în afacerea cu oameni servind cafea.",
    founderName: "Howard Schultz",
    tagline: "Inventing the third place between home and office",
    taglineRo: "Inventarea celui de-al treilea spațiu între casă și birou",
    story:
      "Inspired by Milanese espresso bars, Howard Schultz acquired Starbucks in 1987 with the vision of creating 'the third place', a comfortable, welcoming space between home and work. Starbucks introduced specialty coffee, custom Italian-style espresso beverages, and café workspace culture to the global mainstream.",
    storyRo:
      "Inspirat de barurile de espresso din Milano, Howard Schultz a achiziționat Starbucks în 1987 cu viziunea de a crea „al treilea spațiu”, un loc primitor între casă și birou. Starbucks a introdus cafeaua de specialitate și cultura cafenelei.",
    culturalImpact:
      "Exported European-style coffee craftsmanship worldwide and established the modern laptop café environment of digital nomads and remote work.",
    culturalImpactRo:
      "A exportat meșteșugul cafelei de specialitate și a creat mediul modern al cafenelei pentru munca la distanță și nomazii digitali.",
    milestones: [
      { year: "1971", label: "Pike Place Market Seattle Origin", labelRo: "Originea în Pike Place Seattle" },
      { year: "1987", label: "Howard Schultz Italian Espresso Buyout", labelRo: "Achiziția Espresso Howard Schultz" },
      { year: "2009", label: "Mobile Order & Pay Rewards System", labelRo: "Sistemul Mobile Order & Pay" },
    ],
    innovations: [
      { en: "The Third Place Café Concept", ro: "Conceptul Cafenelei Al Treilea Spațiu" },
      { en: "Custom Italian-Style Beverage Personalization", ro: "Personalizarea Băuturilor în Stil Italian" },
      { en: "Digital Rewards & Mobile Payment Stack", ro: "Platforma Digitală de Plată și Loialitate" },
    ],
  },
];

export function CompanyBreakthroughShowcase() {
  const { locale } = useLanguage();
  const ro = locale === "ro";
  const [sel, setSel] = useState(0);

  const active = FEATURED_COMPANIES[sel] || FEATURED_COMPANIES[0];

  return (
    <div className="my-16">
      {/* 2-Row Selector Grid: 6 columns per row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
        {FEATURED_COMPANIES.map((c, i) => {
          const on = i === sel;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSel(i)}
              className="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 border"
              style={{
                cursor: "pointer",
                backgroundColor: on ? "#0C0907" : "rgba(255,255,255,0.04)",
                color: on ? "#F5EDD8" : "rgba(245,237,216,0.6)",
                borderColor: on ? "#E8B923" : "rgba(255,255,255,0.08)",
                transform: on ? "translateY(-3px)" : "none",
                boxShadow: on ? "0 15px 35px rgba(0,0,0,0.5)" : "none",
              }}
            >
              {/* Clean logo display without any box wrapper */}
              <div className="relative h-7 w-full mb-2 flex items-center justify-center">
                <Image
                  src={c.logoFile}
                  alt={c.name}
                  width={64}
                  height={28}
                  className={`object-contain max-h-7 max-w-[64px] ${
                    c.logoInvert ? "brightness-0 invert opacity-90" : ""
                  }`}
                />
              </div>
              <span className="font-body text-[10px] font-bold uppercase tracking-wider text-center truncate w-full">
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Company Feature Card */}
      <div key={active.id} className="culture-glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-[0_30px_90px_rgb(0,0,0,0.5)]">
        {/* Header Bar: Clean Logo (No Box) & Founded Year */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-6">
            <div className="relative h-12 w-36 flex items-center shrink-0">
              <Image
                src={active.logoFile}
                alt={active.name}
                fill
                className={`object-contain object-left ${
                  active.logoInvert ? "brightness-0 invert" : ""
                }`}
              />
            </div>
            <div>
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold block mb-0.5">
                {ro ? `ESTABILITĂ ÎN ${active.foundedYear}` : `FOUNDED IN ${active.foundedYear}`}
              </span>
              <span className="font-macro-display text-2xl font-black text-white">
                {active.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-glory-gold/10 border border-glory-gold/30 px-4 py-1.5 font-body text-xs font-bold text-glory-gold uppercase tracking-widest">
              {ro ? `Inovație ${active.breakthroughYear}` : `Breakthrough ${active.breakthroughYear}`}
            </span>
          </div>
        </div>

        {/* Founder Quote Banner */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 mb-10">
          <p className="font-editorial text-xl italic text-[#F5EDD8] leading-relaxed mb-2">
            &ldquo;{ro ? active.founderQuoteRo : active.founderQuote}&rdquo;
          </p>
          <p className="font-body text-xs font-bold uppercase tracking-widest text-glory-gold">
            By {active.founderName}
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Left Column: Breakthrough Product, Key Stat, and 3 Milestone Chips */}
          <div className="space-y-6">
            {/* Breakthrough Product Box */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8391B] block mb-1">
                {ro ? "PRODUS / INOVAȚIE EMBLEMATICĂ" : "ICONIC BREAKTHROUGH PRODUCT"}
              </span>
              <h4 className="font-macro-display text-2xl sm:text-3xl font-black text-white leading-tight">
                {ro ? active.breakthroughProductRo : active.breakthroughProduct}
              </h4>
            </div>

            {/* Key Stat Box */}
            <div className="rounded-2xl border border-glory-gold/30 bg-glory-gold/[0.05] p-6">
              <p className="font-macro-display text-3xl sm:text-4xl font-black text-glory-gold tracking-tight mb-1">
                {active.statValue}
              </p>
              <p className="font-body text-xs font-bold uppercase tracking-wider text-[#F5EDD8]/70">
                {ro ? active.statLabelRo : active.statLabel}
              </p>
            </div>

            {/* Historical Milestones List */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5EDD8]/50 mb-4">
                {ro ? "REPERE ISTORICE" : "HISTORICAL MILESTONES"}
              </p>
              <div className="space-y-3">
                {active.milestones.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <span className="rounded bg-glory-gold/20 text-glory-gold font-mono font-bold px-2 py-0.5">
                      {m.year}
                    </span>
                    <span className="font-body text-[#F5EDD8]/80 font-medium">
                      {ro ? m.labelRo : m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Origin Story, Core Innovations, and Cultural Legacy */}
          <div className="space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
            <div>
              <p className="font-editorial text-lg md:text-xl leading-relaxed text-[#F5EDD8]/90 mb-6">
                {ro ? active.storyRo : active.story}
              </p>
            </div>

            {/* Core Innovations List */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-glory-gold mb-3">
                {ro ? "INOVAȚII TEHNICE ȘI COMERCIALE" : "CORE TECHNICAL & COMMERCIAL INNOVATIONS"}
              </p>
              <div className="flex flex-wrap gap-2">
                {active.innovations.map((inn, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 font-body text-xs font-semibold text-[#F5EDD8]"
                  >
                    {ro ? inn.ro : inn.en}
                  </span>
                ))}
              </div>
            </div>

            {/* Cultural Legacy Banner */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#F5EDD8]/50 mb-2">
                {ro ? "MOȘTENIRE CULTURALĂ GLOBALĂ" : "GLOBAL CULTURAL LEGACY"}
              </p>
              <p className="font-editorial text-base leading-relaxed text-[#F5EDD8]/80">
                {ro ? active.culturalImpactRo : active.culturalImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
