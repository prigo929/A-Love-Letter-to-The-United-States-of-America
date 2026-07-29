import { SITE } from "@/lib/constants";
import { SITE_IMAGES } from "@/lib/site-images";
import type { Locale } from "@/lib/i18n/config";

// ─── 1. ECONOMY PAGE COPY ───────────────────────────────────────────────────

export function getEconomyPageCopy(locale: Locale) {
  if (locale === "ro") {
    return {
      tocLabel: "Cuprins",
      tocAriaLabel: "Cuprinsul paginii economiei",
      quickStatLabel: "PIB SUA 2026",
      quickStatSubLabel: "~25% din PIB-ul mondial",
      breadcrumb: "Economie",
      overviewEyebrow: "Analiză în profunzime",
      overviewTitle: "Scară fără precedent",
      gdpEyebrow: "PIB și Dimensiune",
      gdpTitle: "25% din tot ce există pe Pământ",
      gdpChartTitle: "PIB: Statele Unite vs economiile majore (2026)",
      gdpChartSubtitle:
        "PIB-ul SUA de 32,4 trilioane USD depășește însumat producția următoarelor trei mari economii.",
      gdpPerCapitaTitle: "PIB pe cap de locuitor: SUA vs G7 și piețe emergente (2026)",
      gdpPerCapitaSubtitle:
        "La 94.400 USD per persoană, americanii produc mai multă bogăție per capita decât orice mare națiune",
      gdpValueLabel: "PIB (proiecție 2026, trilioane USD)",
      gdpPerCapitaValueLabel: "PIB pe cap de locuitor (proiecție 2026, mii USD)",
      fullGdpAnalysis: "Analiza completă a PIB-ului →",
      capitalEyebrow: "Piețe de Capital",
      capitalTitle: "Wall Street pune în mișcare lumea",
      capitalChartTitle: "Indicele S&P 500: Evoluția pe termen lung a piețelor americane",
      capitalChartSubtitle:
        "Cel mai urmărit indice bursier din lume (1980–2026)",
      marketCapLabel: "Capitalizare combinată NYSE + NASDAQ",
      fullCapitalMarketsAnalysis: "Analiza completă a piețelor de capital →",
      vcEyebrow: "Venture Capital și Startup-uri",
      vcTitle: "Silicon Valley este o planetă",
      vcChartTitle: "Investiții venture capital după țară (2023)",
      startupTimelineTitle: "Companiile americane care au transformat tehnologia globală",
      foundedLabel: "Fondat",
      companyLabel: "Companie",
      foundersLabel: "Fondator(i)",
      industryLabel: "Industrie",
      valuationLabel: "Evaluare",
      startupEcosystemsTitle: "Ecosistemele de startup din America",
      unicornsLabel: "Unicorni",
      annualVcLabel: "VC anual",
      fullVcAnalysis: "Analiza completă a startup-urilor și VC →",
      dollarEyebrow: "Dominația Dolarului",
      dollarTitle: "Moneda de rezervă a lumii",
      dollarChartTitle: "Rezerve valutare globale pe monedă (2026)",
      dollarReserveCaption:
        "Statutul de monedă de rezervă oferă dolarului un avantaj structural semnificativ, permițând Statelor Unite să finanțeze investițiile în propria monedă la costuri globale favorabile.",
      fullDollarAnalysis: "Analiza completă a dolarului →",
      tradeEyebrow: "Comerț și Exporturi",
      tradeTitle: "America susține comerțul global",
      tradeCategoriesTitle:
        "Principalele categorii de export ale SUA (2026, miliarde USD)",
      tradePercentOfTopCategory: "% din categoria de top",
      fullTradeAnalysis: "Analiza completă a comerțului →",
      subPagesEyebrow: "Explorați Mai Departe",
      subPagesTitle: "Analize aprofundate",
      exploreCta: "Explorează →",
      heroEyebrow: "Secțiunea Economie",
      heroTitleLead: "MOTORUL",
      heroTitleAccent: "LUMII",
      heroDescription:
        "Economia Statelor Unite generează o producție anuală de 32,4 trilioane de dolari, reprezentând cel mai important hub financiar și de inovație al lumii.",
      heroStats: [
        { value: "$32.4T", label: "PIB 2026", sub: "Proiecție FMI" },
        { value: "$69T+", label: "Piețe Bursiere", sub: "NYSE + NASDAQ" },
        { value: "659", label: "Companii Unicorn", sub: "~jumătate din totalul global" },
      ],
      tocItems: [
        { label: "Prezentare", href: "#overview" },
        { label: "PIB și Dimensiune", href: "#gdp" },
        { label: "Piețe de Capital", href: "#capital-markets" },
        { label: "Venture Capital", href: "#venture-capital" },
        { label: "Dolarul", href: "#dollar" },
        { label: "Comerț și Exporturi", href: "#trade" },
        { label: "Subpagini", href: "#sub-pages" },
      ],
      tradeCategories: [
        { label: "Avioane și piese", value: 132, pct: 100 },
        { label: "Produse petroliere", value: 119, pct: 90 },
        { label: "Semiconductori", value: 87, pct: 66 },
        { label: "Dispozitive medicale", value: 74, pct: 56 },
        { label: "Automobile", value: 65, pct: 49 },
        { label: "Produse farmaceutice", value: 63, pct: 48 },
        { label: "Produse agricole", value: 58, pct: 44 },
        { label: "Utilaje industriale", value: 52, pct: 39 },
      ],
    };
  }
  return {
    tocLabel: "Contents",
    tocAriaLabel: "Economy page contents",
    quickStatLabel: "US GDP 2026",
    quickStatSubLabel: "~25% of Global Economy",
    breadcrumb: "Economy",
    overviewEyebrow: "In-Depth Analysis",
    overviewTitle: "Unprecedented Scale",
    gdpEyebrow: "GDP & Scale",
    gdpTitle: "25% of Everything on Earth",
    gdpChartTitle: "GDP: United States vs. Major Economies (2026)",
    gdpChartSubtitle:
      "US GDP reaches $32.4 trillion, exceeding the total output of the next three economies combined.",
    gdpPerCapitaTitle: "GDP Per Capita: US vs. G7 & Emerging Markets (2026)",
    gdpPerCapitaSubtitle:
      "At $94,400 per person, Americans produce more wealth per capita than any major nation",
    gdpValueLabel: "GDP (2026 projection, USD Trillions)",
    gdpPerCapitaValueLabel: "GDP Per Capita (2026 projection, thousands USD)",
    fullGdpAnalysis: "Full GDP Analysis →",
    capitalEyebrow: "Capital Markets",
    capitalTitle: "Wall Street Moves the World",
    capitalChartTitle: "S&P 500 Index: Long-Term Growth of American Markets",
    capitalChartSubtitle:
      "The most watched stock index on earth (1980–2026)",
    marketCapLabel: "Combined NYSE + NASDAQ Market Cap",
    fullCapitalMarketsAnalysis: "Full Capital Markets Analysis →",
    vcEyebrow: "Venture Capital & Startups",
    vcTitle: "Silicon Valley is a Planet",
    vcChartTitle: "Venture Capital Funding by Country (2023)",
    startupTimelineTitle: "The American Companies That Transformed Technology",
    foundedLabel: "Founded",
    companyLabel: "Company",
    foundersLabel: "Founder(s)",
    industryLabel: "Industry",
    valuationLabel: "Valuation",
    startupEcosystemsTitle: "America's Startup Ecosystems",
    unicornsLabel: "Unicorns",
    annualVcLabel: "Annual VC",
    fullVcAnalysis: "Full Startup & VC Analysis →",
    dollarEyebrow: "Dollar Dominance",
    dollarTitle: "Reserve Currency of the World",
    dollarChartTitle: "Global Currency Reserves by Currency (2026)",
    dollarReserveCaption:
      "Reserve currency status gives the dollar structural funding advantages, allowing the US to finance global investments directly in its own currency.",
    fullDollarAnalysis: "Full Dollar Analysis →",
    tradeEyebrow: "Trade & Exports",
    tradeTitle: "America Powers Global Commerce",
    tradeCategoriesTitle: "Top US Export Categories (2026, billions USD)",
    tradePercentOfTopCategory: "% of top category",
    fullTradeAnalysis: "Full Trade Analysis →",
    subPagesEyebrow: "Explore Further",
    subPagesTitle: "In-Depth Vertical Chapters",
    exploreCta: "Explore →",
    heroEyebrow: "Economy Vertical",
    heroTitleLead: "THE ENGINE OF THE",
    heroTitleAccent: "WORLD",
    heroDescription:
      "The United States economy generates $32.4 trillion in annual output, anchoring global capital markets and technology development.",
    heroStats: [
      { value: "$32.4T", label: "2026 GDP", sub: "IMF Projection" },
      { value: "$69T+", label: "Stock Markets", sub: "NYSE + NASDAQ" },
      { value: "659", label: "Unicorn Companies", sub: "~half the global total" },
    ],
    tocItems: [
      { label: "Overview", href: "#overview" },
      { label: "GDP & Scale", href: "#gdp" },
      { label: "Capital Markets", href: "#capital-markets" },
      { label: "Venture Capital", href: "#venture-capital" },
      { label: "The Dollar", href: "#dollar" },
      { label: "Trade & Exports", href: "#trade" },
      { label: "Sub-Pages", href: "#sub-pages" },
    ],
    tradeCategories: [
      { label: "Aircraft & Parts", value: 132, pct: 100 },
      { label: "Petroleum Products", value: 119, pct: 90 },
      { label: "Semiconductors", value: 87, pct: 66 },
      { label: "Medical Devices", value: 74, pct: 56 },
      { label: "Automobile", value: 65, pct: 49 },
      { label: "Pharmaceuticals", value: 63, pct: 48 },
      { label: "Agriculture Products", value: 58, pct: 44 },
      { label: "Industrial Machinery", value: 52, pct: 39 },
    ],
  };
}

// ─── 2. MILITARY PAGE COPY ──────────────────────────────────────────────────

export function getMilitaryPageCopy(locale: Locale) {
  if (locale === "ro") {
    return {
      nuclearLegs: [
        { v: "GARANTAT", l: "Capabilitate Contraatac", sub: "Garantează distrugerea reciprocă" },
        { v: "EFICIENT", l: "Cost Siloz Terestru", sub: "Cea mai ieftină componentă de menținut" },
        { v: "RECHEMABIL", l: "Controlul Bombardierelor", sub: "Singura componentă care poate fi oprită" },
        { v: "SENTINEL", l: "Modernizare ICBM", sub: "Înlocuirea flotei Minuteman III" }
      ],
      heroTitle: "PUTERE ABSOLUTĂ",
      heroSubtitle: "Complexul Militar · Industrial · de Intelligence al Statelor Unite",
      heroTagline: "Prima în forță · Prima în pregătire · Prima în lume",
      statsLabel: "METRICI VERIFICATE · AF 2025",
      dominanceLabel: "DOMINANȚĂ GLOBALĂ · PRIVIRE STRATEGICĂ",
      dominanceTitle1: "COMANDĂ",
      dominanceTitle2: "PLANETARĂ",
      dominanceDescription:
        "Statele Unite nu dispun pur și simplu de o armată — ele operează un sistem de comandă și control interconectat global, care acoperă uscatul, marea, aerul, spațiul și spațiul cibernetic. Nicio națiune nu se apropie.",
      branchesLabel: "RAMURILE SERVICIULUI MILITAR",
      branchesTitle1: "ȘASE RAMURI.",
      branchesTitle2: "O SINGURĂ MISIUNE.",
      socomLabel: "COMANDAMENTUL PENTRU OPERAȚIUNI SPECIALE (SOCOM)",
      socomTitle1: "VÂRFUL",
      socomTitle2: "SĂGEȚII",
      socomDescription:
        "Forțele de elită pregătite pentru război neconvențional, misiuni secrete de contraterorism și recunoaștere specială în medii ostile.",
      carrierLabel: "PREZENȚĂ GLOBALĂ · POSTURĂ PLANETARĂ",
      carrierTitle1: "HARTA DE",
      carrierTitle2: "COMANDĂ GLOBALĂ",
      carrierSub: "GEOGRAFIA DEVINE TIMP DE RĂSPUNS.",
      carrierLiveLabel: "HARTA DE COMANDĂ GLOBALĂ",
      weaponsLabel: "BIJUTERIILE COROANEI PUTERII AMERICANE",
      weaponsTitle1: "ARSENALUL",
      weaponsTitle2: "DEMOCRAȚIEI",
      weaponsDescription:
        "De la aeronave invizibile la rachete hipersonice, sistemele care definesc granița tehnologică a ceea ce poate fi războiul.",
      b2Label: "NORTHROP GRUMMAN B-2 SPIRIT · DIN 1997",
      b2Title1: "NĂSCUT DIN",
      b2Title2: "ÎNTUNERIC",
      b2Description:
        "Singurul bombardier strategic invizibil operațional din lume. Secțiune transversală radar echivalentă cu o pasăre mare. Rază: globală.",
      b2Stats: [
        { label: "VITEZĂ", value: "Mach 0.95" },
        { label: "RAZĂ", value: "11.100+ km" },
        { label: "SARCINĂ", value: "18.100+ kg" },
        { label: "FLOTĂ", value: "20 aeronave" },
      ],
      nuclearLabel: "DESCURAJARE NUCLEARĂ · TRIADA DE FIER",
      nuclearTitle1: "TRIADA",
      nuclearTitle2: "NUCLEARĂ",
      intelligenceLabel: "REȚEAUA DE INTELIGENȚĂ · SENZORII PLANETARI",
      intelligenceTitle1: "OCHII ȘI URECHILE",
      intelligenceTitle2: "IMPERIULUI INFORMAȚIONAL",
      intelligenceDescription:
        "Baza decizională a comenzii planetare este alimentată de 18 agenții de informații. De la interceptări de semnale prin satelit la agenți infiltrați pe teren.",
      darpaLabel: "DARPA · CAPABILITĂȚI VIITOARE",
      darpaTitle1: "GENERAȚIA",
      darpaTitle2: "URMĂTOARE",
      darpaDescription:
        "DARPA finanțează tehnologii cu o generație înaintea câmpului de luptă. Ceea ce este în dezvoltare astăzi este ceea ce va câștiga războaiele în 2040.",
      orbitalLabel: "CONȘTIENTIZAREA DOMENIULUI SPAȚIAL · RAZĂ GLOBALĂ",
      orbitalTitle1: "DOMINANȚĂ",
      orbitalTitle2: "ORBITALĂ",
      orbitalSub:
        "Peste 142 de sateliți militari oferă precizie GPS, ISR în timp real și integrarea apărării antirachetă. Acoperire globală: 100%.",
      industryLabel: "BAZA INDUSTRIALĂ DE APĂRARE",
      industryTitle1: "CONTRACTORII",
      industryTitle2: "PRINCIPALI",
      industryDescription:
        "Companiile care traduc știința americană în arme pe care niciun adversar nu le poate contracara — și nicio alianță nu le poate egala.",
      factsLabel: "INTELIGENȚĂ CONTEXTUALĂ",
      factsTitle1: "CONTEXT",
      factsTitle2: "STRATEGIC",
      alliancesLabel: "ALIANȚE GLOBALE · MULTIPLICATORI DE FORȚĂ",
      alliancesTitle1: "ALIANȚE STRATEGICE.",
      alliancesTitle2: "SECURITATE COLECTIVĂ.",
      alliancesDescription:
        "Puterea americană este multiplicată prin coaliții globale integrate. Prin NATO și parteneriate tehnologice de ultimă oră precum AUKUS, democrațiile lumii asigură descurajarea colectivă.",
      exploreLabel: "IMAGINEA DE ANSAMBLU",
      bottomClassification: "America: Cea Mai Mare Națiune · Comandă Planetară",
      oracleLabel: "Ai întrebări despre forța militară a SUA?",
      oracleTitle: "Oracolul Ask America",
      oracleDescription:
        "Discută cu AI despre alianța NATO, cele 11 grupuri de atac cu portavion, bugetul de apărare sau programele viitoare DARPA.",
      tocItems: [
        { label: "Metrici Apărare", href: "#stats" },
        { label: "Comandă Planetară", href: "#dominance" },
        { label: "Ramurile Serviciului", href: "#branches" },
        { label: "Operațiuni Speciale", href: "#socom" },
        { label: "Harta de Comandă", href: "#global-command-map" },
        { label: "Arsenalul Democrației", href: "#weapons" },
        { label: "Triada Nucleară", href: "#nuclear" },
        { label: "Rețeaua de Intelligence", href: "#intelligence" },
        { label: "Generația Viitoare DARPA", href: "#darpa" },
        { label: "Contractorii Principali", href: "#industry" },
        { label: "Context Strategic", href: "#facts" },
        { label: "Alianțe Globale", href: "#alliances" },
        { label: "Explorați", href: "#explore" },
      ],
    };
  }
  return {
    nuclearLegs: [
      { v: "GUARANTEED", l: "Second-Strike Capability", sub: "Ensures mutual destruction" },
      { v: "EFFICIENT", l: "Land-Based Silo Cost", sub: "Most cost-effective leg to maintain" },
      { v: "RECALLABLE", l: "Bomber Fleet Control", sub: "Only leg that can be called back" },
      { v: "SENTINEL", l: "ICBM Modernization", sub: "Replacing the Minuteman III fleet" }
    ],
    heroTitle: "ABSOLUTE POWER",
    heroSubtitle: "United States Military · Industrial · Intelligence Complex",
    heroTagline: "First in strength · First in readiness · First in the world",
    statsLabel: "VERIFIED METRICS · FY 2025",
    dominanceLabel: "GLOBAL DOMINANCE · STRATEGIC OVERVIEW",
    dominanceTitle1: "PLANETARY",
    dominanceTitle2: "COMMAND",
    dominanceDescription:
      "The United States does not simply field a military — it operates a globally interconnected command-and-control system spanning land, sea, air, space, and cyberspace. No nation comes close.",
    branchesLabel: "THE BRANCHES OF SERVICE",
    branchesTitle1: "SIX BRANCHES.",
    branchesTitle2: "ONE MISSION.",
    socomLabel: "SPECIAL OPERATIONS COMMAND (SOCOM)",
    socomTitle1: "THE TIP OF",
    socomTitle2: "THE SPEAR",
    socomDescription:
      "Elite forces trained for unconventional warfare, clandestine counter-terrorism, and special reconnaissance in hostile environments.",
    carrierLabel: "GLOBAL PRESENCE · PLANETARY POSTURE",
    carrierTitle1: "GLOBAL COMMAND",
    carrierTitle2: "MAP",
    carrierSub: "GEOGRAPHY BECOMES RESPONSE TIME.",
    carrierLiveLabel: "GLOBAL COMMAND MAP",
    weaponsLabel: "CROWN JEWELS OF AMERICAN POWER",
    weaponsTitle1: "THE ARSENAL",
    weaponsTitle2: "OF DEMOCRACY",
    weaponsDescription:
      "From stealth aircraft to hypersonic missiles, the systems that define the technological boundary of what warfare can be.",
    b2Label: "NORTHROP GRUMMAN B-2 SPIRIT · SINCE 1997",
    b2Title1: "BORN FROM",
    b2Title2: "DARKNESS",
    b2Description:
      "The world's only operational low-observable strategic stealth bomber. Radar cross-section equivalent to a large bird. Range: global.",
    b2Stats: [
      { label: "SPEED", value: "Mach 0.95" },
      { label: "RANGE", value: "6,900+ mi" },
      { label: "PAYLOAD", value: "40,000 lb" },
      { label: "FLEET", value: "20 aircraft" },
    ],
    nuclearLabel: "NUCLEAR DETERRENCE · THE IRON TRIAD",
    nuclearTitle1: "THE NUCLEAR",
    nuclearTitle2: "TRIAD",
    intelligenceLabel: "THE INTELLIGENCE NETWORK · PLANETARY SENSORS",
    intelligenceTitle1: "THE EYES AND EARS",
    intelligenceTitle2: "OF THE COMMAND STRUCTURE",
    intelligenceDescription:
      "The decision-making basis of planetary command is fed by 18 intelligence agencies. From orbital signal intercepts to clandestine field assets.",
    darpaLabel: "DARPA · FUTURE CAPABILITIES",
    darpaTitle1: "THE NEXT",
    darpaTitle2: "GENERATION",
    darpaDescription:
      "DARPA funds technologies a generation ahead of the battlefield. What's in development today is what wins wars in 2040.",
    orbitalLabel: "SPACE DOMAIN AWARENESS · GLOBAL REACH",
    orbitalTitle1: "ORBITAL",
    orbitalTitle2: "DOMINANCE",
    orbitalSub:
      "142+ military satellites provide GPS precision, real-time ISR, and missile defense integration. Global coverage: 100%.",
    industryLabel: "DEFENSE INDUSTRIAL BASE",
    industryTitle1: "THE PRIME",
    industryTitle2: "CONTRACTORS",
    industryDescription:
      "The companies that translate American science into weapons no adversary can counter — and no alliance can field.",
    factsLabel: "STRATEGIC CONTEXT",
    factsTitle1: "STRATEGIC",
    factsTitle2: "CONTEXT",
    alliancesLabel: "GLOBAL ALLIANCES · FORCE MULTIPLIERS",
    alliancesTitle1: "STRATEGIC ALLIANCES.",
    alliancesTitle2: "COLLECTIVE SECURITY.",
    alliancesDescription:
      "American power is force-multiplied through integrated global coalitions. Through NATO and cutting-edge tech partnerships like AUKUS, the world's democracies secure collective deterrence.",
    exploreLabel: "THE FULL PICTURE",
    bottomClassification: "America: The Greatest Nation · Planetary Command",
    oracleLabel: "Have U.S. Military questions?",
    oracleTitle: "The Ask America Oracle",
    oracleDescription:
      "Discuss with AI about the NATO alliance, the 11 carrier strike groups, defense budgets, or future DARPA programs.",
    tocItems: [
      { label: "Defense Metrics", href: "#stats" },
      { label: "Planetary Command", href: "#dominance" },
      { label: "Branches of Service", href: "#branches" },
      { label: "Special Operations", href: "#socom" },
      { label: "Global Command Map", href: "#global-command-map" },
      { label: "Arsenal of Democracy", href: "#weapons" },
      { label: "Nuclear Deterrence", href: "#nuclear" },
      { label: "Intelligence Network", href: "#intelligence" },
      { label: "DARPA Future Tech", href: "#darpa" },
      { label: "Prime Contractors", href: "#industry" },
      { label: "Strategic Context", href: "#facts" },
      { label: "Global Alliances", href: "#alliances" },
      { label: "Explore", href: "#explore" },
    ],
  };
}

// ─── 3. CONSTITUTION PAGE COPY ──────────────────────────────────────────────

export function getConstitutionPageCopy(locale: Locale) {
  if (locale === "ro") {
    return {
      statLabel: "cuvinte ce guvernează o economie de 31 trilioane $",
      statSublabel: "Cea mai scurtă constituție națională majoră",
      chapter1Title: "Documentul Viu",
      chapter1Eyebrow: "Constituție și Democrație",
      chapter1NutGraf: "4.543 de cuvinte. 237 de ani. Zero întreruperi.",
      chapter1Heading: "Documentul care Conduce Lumea",
      chapter1Paragraph1: "4.543 de cuvinte. Scrise de 55 de bărbați în 116 zile la Philadelphia, în vara anului 1787. Aceleași cuvinte care autorizau comerțul de-a lungul râului Potomac autorizează astăzi economia de 31 de trilioane de dolari a Americii.",
      chapter1Paragraph2: "237 de ani de democrație constituțională neîntreruptă. 60 de alegeri prezidențiale. Niciun coup. Niciun monarh. Un record pe care nicio altă națiune de pe Pământ nu îl poate egala.",
      accessionLabelTitle: "Constituția Statelor Unite, Pagina 1",
      accessionLabelDate: "17 Septembrie 1787",
      accessionLabelMedium: "Cerneală de fier pe pergament",
      accessionLabelCollection: "Arhivele Naționale · Grupul 11",
      vaultEyebrow: "Documentul Viu",
      vaultHeading: "Pasaje ce Au Schimbat Lumea",
      vaultDescription: "Dă click pe orice clauză pentru a-i ilumina moștenirea. Fiecare propoziție este în vigoare chiar acum.",
      chapter2Title: "Arhitecții Libertății",
      chapter2NutGraf: "55 de delegați. 116 zile. Un singur scop.",
      chapter2Heading: "Galeria de la Miezul Nopții",
      chapter2Description: "Un seif privat, climatizat, adânc sub Arhivele Naționale. Dă click pe un portret pentru a deschide dosarul.",
      chapter2PullQuote: "Constituția nu este un instrument prin care guvernul restrânge poporul, ci un instrument prin care poporul restrânge guvernul.",
      chapter3Title: "Declarația Drepturilor",
      chapter3NutGraf: "Motivul pentru care criticarea acestei pagini este protejată constituțional.",
      chapter3Heading: "Zece Garanții. 235 de Ani.",
      chapter3Explore: "Explorare Completă →",
      chapter4Title: "Separarea Puterilor",
      chapter4NutGraf: "Trei ramuri. Fiecare verificând celelalte două.",
      chapter4Heading: "Mașinăria în Lumea Reală",
      chapter4Description: "Așa funcționează sistemul de 'Verificări și Echilibre' când țara se confruntă cu o criză națională reală. Fiecare pârghie este proiectată pentru a preveni acumularea unei puteri absolute.",
      chapter4Explore: "Analiză Completă →",
      chapter5Title: "Laboratoare ale Democrației",
      chapter5NutGraf: "50 de state. 50 de experimente. Rezultate reale.",
      chapter5Heading: "50 de State. 50 de Experimente.",
      chapter5Description: "Proiectează-ți statul ideal. Descoperă care stat american trăiește deja așa — și ce rezultate reale a produs.",
      stat2Label: "ani de guvernare constituțională neîntreruptă",
      stat2Sublabel: "Cel mai lung din istoria înregistrată",
      chapter6Title: "250 de Ani de Dovezi",
      chapter6NutGraf: "De Fiecare Dată",
      chapter6Heading: "Linia Neîntreruptă",
      chapter6Description: "Fiecare nod de-a lungul liniei de aur reprezintă un transfer de putere prezidențial. Nodurile roșii sunt momente de criză — când sistemul a fost cel mai mult testat.",
      chapter6Explore: "Cronologie Completă →",
      raceHeading: "Cursa pe Care Nimeni Altcineva nu o Câștigă",
      raceDescription: "Privește constituțiile lumii cum se ridică și se prăbușesc. Bara americană de aur nu se oprește niciodată.",
      norwayTitle: "Excepția: Norvegia (1814)",
      norwayDescription: "Deși ambele țări și-au păstrat documentele originale, Norvegia și-a transformat radical sistemul de guvernare prin amendamente, în timp ce S.U.A. a menținut aceeași structură fundamentală.",
      norwayHeading: "Schimbări Structurale: 27 vs. 300+",
      norwayText1: "Constituția SUA a avut doar 27 de amendamente, menținând limba originală. Norvegia a avut peste 300 de amendamente și a rescris întregul document în 2014, deoarece limbajul originar în stil danez devenise prea dificil de citit.",
      norwayHeading2: "Revizuiri Radicale",
      norwayRevisions: [
        { label: "1884 (Parlamentarism)", value: "Guvernul trebuie să aibă sprijinul majorității parlamentare." },
        { label: "2009 (Abolirea Unei Camere)", value: "A trecut la un sistem unicameral, abolind o cameră a Parlamentului." },
        { label: "2012 (Religie de Stat)", value: "A eliminat statutul Bisericii Evanghelice Luterane ca religie oficială." },
      ],
      stat3Label: "lovituri de stat. În 237 de ani.",
      stat3Sublabel: "Zero. Niciodată.",
      chapter7Title: "Marea Stabilitate",
      chapter7NutGraf: "60 de Alegeri. 0 Interuperi.",
      chapter7Heading: "Arhiva Electorală Interactivă",
      chapter7Description: "Explorează reziliența arhitecturii constituționale a Americii. Scrubbează prin secole de date electorale pentru a vedea cum democrația a funcționat neîncetat, indiferent de războaie, crize sau schimbări tehnologice.",
      chapter7Explore: "Vezi Arhiva Completă →",
      chapter8Title: "Context Global",
      chapter8NutGraf: "Construite. Nu moștenite.",
      chapter8Heading: "Acestea Nu Sunt Normale",
      chapter8Description: "Drepturile pe care americanii le iau de-a gata nu sunt starea normală a civilizației umane. Ele sunt excepția. Ele au fost construite. Trebuie păstrate.",
      chapter9Title: "Lumea Fără",
      chapter9Heading: "Ce Se Întâmplă Când Drepturile Nu Există",
      chapter9Description: "Fiecare pereche arată un drept american alături de realitatea din țări unde acel drept nu există.",
      madisonQuote: "Dacă oamenii ar fi îngeri, nu ar fi necesar niciun guvern. Dacă îngerii ar guverna oamenii, nu ar fi necesare controale externe sau interne ale guvernului.",
      madisonSource: "Federalistul Nr. 51, 1788",
      chapter9DeepDives: "Imersiuni în Profunzime",
      chapter9DeepDivesHeading: "Imersiuni în Profunzime",
      exploreCta: "Explorează →",
      tocItems: [
        { label: "Introducere", href: "#overview" },
        { label: "Pasaje Cheie", href: "#the-document" },
        { label: "Arhitecții Libertății", href: "#founders" },
        { label: "Carta Drepturilor", href: "#bill-of-rights" },
        { label: "Separarea Puterilor", href: "#separation-of-powers" },
        { label: "Laboratoarele Democrației", href: "#federalism" },
        { label: "Linia Neîntreruptă", href: "#track-record" },
        { label: "Cursa Constituțiilor", href: "#constitution-race" },
        { label: "Arhiva Electorală", href: "#electoral-archive" },
        { label: "Drepturi în Pericol", href: "#rights-at-risk" },
        { label: "Lumea Fără", href: "#world-without" },
        { label: "Imersiuni Profunde", href: "#explore" },
      ],
    };
  }
  return {
    statLabel: "words governing a $31 trillion economy",
    statSublabel: "The shortest major national constitution",
    chapter1Title: "The Living Document",
    chapter1Eyebrow: "Constitution & Democracy",
    chapter1NutGraf: "4,543 words. 237 years. Zero interruptions.",
    chapter1Heading: "The Document That Runs the World",
    chapter1Paragraph1: "4,543 words. Written by 55 men in 116 days in Philadelphia, in the summer of 1787. The same words that authorized commerce along the Potomac River in 1787 authorize America's $31 trillion economy today.",
    chapter1Paragraph2: "237 years of unbroken constitutional democracy. 60 presidential elections. Zero coups. Zero suspensions. Zero monarchs. A record no other nation on Earth comes close to matching.",
    accessionLabelTitle: "United States Constitution, Page 1",
    accessionLabelDate: "September 17, 1787",
    accessionLabelMedium: "Iron gall ink on parchment",
    accessionLabelCollection: "National Archives · Record Group 11",
    vaultEyebrow: "The Living Document",
    vaultHeading: "Passages That Changed the World",
    vaultDescription: "Click over any clause to illuminate its legacy. Every sentence is in force right now.",
    chapter2Title: "Architects of Liberty",
    chapter2NutGraf: "55 delegates. 116 days. One purpose.",
    chapter2Heading: "The Midnight Gallery",
    chapter2Description: "A private, climate-controlled vault deep beneath the National Archives. Click a portrait to open the dossier.",
    chapter2PullQuote: "The Constitution is not an instrument for the government to restrain the people, it is an instrument for the people to restrain the government.",
    chapter3Title: "Bill of Rights",
    chapter3NutGraf: "The reason criticizing this page is constitutionally protected.",
    chapter3Heading: "Ten Guarantees. 235 Years.",
    chapter3Explore: "Full Explorer →",
    chapter4Title: "Separation of Powers",
    chapter4NutGraf: "Three branches. Each checking the other two.",
    chapter4Heading: "The Machine in the Real World",
    chapter4Description: "This is how the system of 'Checks and Balances' actually functions when the nation faces a real-world crisis. Every lever is designed to prevent the accumulation of absolute power.",
    chapter4Explore: "Full Analysis →",
    chapter5Title: "Laboratories of Democracy",
    chapter5NutGraf: "50 states. 50 experiments. Real outcomes.",
    chapter5Heading: "50 States. 50 Experiments.",
    chapter5Description: "Design your ideal state. Discover which real American state already lives that way — and what outcomes it produces.",
    stat2Label: "years of unbroken constitutional government",
    stat2Sublabel: "The longest in recorded history",
    chapter6Title: "250 Years of Evidence",
    chapter6NutGraf: "Every. Single. Time.",
    chapter6Heading: "The Unbroken Line",
    chapter6Description: "Each node along the golden line represents a presidential transfer of power. Red nodes are crisis moments — when the system was tested most severely.",
    chapter6Explore: "Full Timeline →",
    raceHeading: "The Race Nobody Else Wins",
    raceDescription: "Watch the world's constitutions rise and collapse. America's golden bar never stops.",
    norwayTitle: "The Exception: Norway (1814)",
    norwayDescription: "While both countries have kept their original documents, Norway radically transformed its actual system of government, whereas the U.S. has maintained the exact same fundamental structure.",
    norwayHeading: "Structural Changes: 27 vs. 300+",
    norwayText1: "The US Constitution only has 27 amendments, maintaining its original language. Norway has had over 300 amendments and rewrote the entire document in modern Norwegian in 2014 because the 1814 Danish-style language became unreadable to modern citizens.",
    norwayHeading2: "Radical Revisions",
    norwayRevisions: [
      { label: "1884 (Parliamentarism)", value: "Introduced parliamentarism; cabinet requires parliamentary majority." },
      { label: "2009 (Abolishing a House)", value: "Abolished a House of Parliament, switching to a unicameral system." },
      { label: "2012 (State Religion)", value: "Removed the Evangelical-Lutheran Church as the official state religion." },
    ],
    stat3Label: "coups. In 237 years.",
    stat3Sublabel: "Zero. Never.",
    chapter7Title: "The Great Stability",
    chapter7NutGraf: "60 elections. 0 interruptions.",
    chapter7Heading: "Interactive Electoral Archive",
    chapter7Description: "Explore the resilience of America's constitutional architecture. Scrub through centuries of electoral data to see how democracy has functioned relentlessly, regardless of wars, crises, or technological shifts.",
    chapter7Explore: "View Full Archive →",
    chapter8Title: "Global Context",
    chapter8NutGraf: "Built. Not inherited.",
    chapter8Heading: "These Are Not the Default",
    chapter8Description: "The rights Americans take for granted are not the default state of human civilization. They are the exception. They were built. They must be kept.",
    chapter9Title: "The World Without",
    chapter9Heading: "What Happens When Rights Don't Exist",
    chapter9Description: "Each pair shows an American right alongside the reality in countries where that right does not exist.",
    madisonQuote: "If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary.",
    madisonSource: "Federalist No. 51, 1788",
    chapter9DeepDives: "Deep Dives",
    chapter9DeepDivesHeading: "Deep Dives",
    exploreCta: "Explore →",
    tocItems: [
      { label: "Introduction", href: "#overview" },
      { label: "Key Passages", href: "#the-document" },
      { label: "Architects of Liberty", href: "#founders" },
      { label: "Bill of Rights", href: "#bill-of-rights" },
      { label: "Separation of Powers", href: "#separation-of-powers" },
      { label: "Democracy Labs", href: "#federalism" },
      { label: "The Unbroken Line", href: "#track-record" },
      { label: "The Constitution Race", href: "#constitution-race" },
      { label: "Electoral Archive", href: "#electoral-archive" },
      { label: "Rights at Risk", href: "#rights-at-risk" },
      { label: "The World Without", href: "#world-without" },
      { label: "Deep Dives", href: "#explore" },
    ],
  };
}

// ─── 4. QUALITY OF LIFE PAGE COPY ───────────────────────────────────────────

export interface QualityOfLifeCopy {
  breadcrumb: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  statsTitle: string;
  statsSubtitle: string;
  stats: Array<{
    title: string;
    value: string;
    description: string;
    source: string;
    sourceUrl?: string;
  }>;
  luxuryTitle: string;
  luxurySubtitle: string;
  luxuryItems: Array<{
    title: string;
    description: string;
    source: string;
    sourceUrl?: string;
  }>;
  incomeTitle: string;
  incomeSubtitle: string;
  incomeParagraph1: string;
  incomeParagraph2: string;
  incomeItems: Array<{
    title: string;
    description: string;
    source: string;
    sourceUrl?: string;
  }>;
  healthcareTitle: string;
  healthcareSubtitle: string;
  healthcareParagraph: string;
  healthcareItems: Array<{
    title: string;
    description: string;
    source: string;
    sourceUrl?: string;
  }>;
  oracleDescription: string;
  tocItems: Array<{ label: string; href: string }>;
  comparisonEyebrow: string;
  comparisonTitle: string;
  comparisonDesc: string;
  exploreLabel: string;
  acLabel: string;
  acSub: string;
  aircraftLabel: string;
  aircraftSub: string;
  librariesLabel: string;
  librariesSub: string;
  luxuryLabel: string;
  outdoorLabel: string;
  outdoorTitle: string;
  outdoorDescription: string;
  citiesLabel: string;
  citiesDesc: string;
  aerialLabel: string;
  aerialTitle: string;
  aerialDesc: string;
  lakeCaption: string;
  manhattanCaption: string;
  nycTopDownCaption: string;
}

const qolCopyEn: QualityOfLifeCopy = {
  breadcrumb: "Quality of Life",
  heroTagline: "THE ABUNDANCE STANDARD",
  heroTitle: "The Highest Living Standard for the Most People",
  heroSubtitle:
    "An empirical analysis of daily purchasing power, home sizing, residential comfort, and medical outcomes that define the American middle class.",
  statsTitle: "Abundance by the Numbers",
  statsSubtitle: "Key indicators of American household wealth, space, utilities, and tax structures",
  stats: [
    {
      title: "Average Home Size",
      value: "2–3x More Sizing",
      description:
        "The average floor space per person in the US is more than double or triple that of major European nations (like Germany or the UK) and Japan.",
      source: "World Population Review 2026",
      sourceUrl: "https://worldpopulationreview.com/country-rankings/house-size-by-country",
    },
    {
      title: "Affordable Real Estate",
      value: "#2 Most Affordable Sizing",
      description:
        "America ranks second globally in housing affordability relative to average income, offering far more square footage per dollar than Europe.",
      source: "Numbeo Property Index 2026",
      sourceUrl: "https://www.numbeo.com/property-investment/rankings_by_country.jsp",
    },
    {
      title: "30-Year Fixed Mortgage",
      value: "Locked-In Interest for a Generation",
      description:
        "The US is the only country where the 30-year fixed-rate mortgage is standard (~90% of buyers), shielding homeowners from interest rate shocks.",
      source: "CNBC / Fannie Mae 2024",
      sourceUrl: "https://www.cnbc.com/2024/05/07/why-the-30-year-fixed-rate-mortgage-is-a-uniquely-american-construct.html",
    },
    {
      title: "OECD Salaries (PPP)",
      value: "#2 Highest Wages Globally",
      description:
        "Adjusted for purchasing power parity (PPP), the average American wage is the second highest in the OECD, behind only Switzerland.",
      source: "OECD Wage Index 2026",
      sourceUrl: "https://www.numbeo.com/property-investment/rankings_by_country.jsp",
    },
    {
      title: "Lowest Grocery Spend Share",
      value: "Lowest share of budget spent on food",
      description:
        "Food is so affordable in America that households spend the smallest percentage of their budget on food globally, with guaranteed caloric scale.",
      source: "Our World in Data",
      sourceUrl: "https://ourworldindata.org/grapher/food-expenditure-share-gdp?country=~USA",
    },
    {
      title: "Cheap Energy & Utilities",
      value: "Lowest G7 energy costs",
      description:
        "Low electricity and fuel prices relative to average wages make passenger cars and central air conditioning standard, not premium luxuries.",
      source: "Statista & Global Petrol Prices 2026",
      sourceUrl: "https://www.statista.com/statistics/263492/electricity-prices-in-selected-countries/",
    },
    {
      title: "Highly Progressive Tax",
      value: "Top 1% pay 40% of all income taxes",
      description:
        "The US operates the most progressive tax system in the G7. There is no regressive national sales tax (VAT); the top 1% bear the largest share.",
      source: "Cato Institute & Tax Foundation 2025",
      sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world",
    },
    {
      title: "Retail Space Density",
      value: "2.3 sq m per person (24.5 sq ft)",
      description:
        "The US has 2.3 square meters of retail space per person, compared to an average of just 0.4 square meters in Europe, offering immense convenience.",
      source: "ASCE Report Card",
      sourceUrl: "https://www.statista.com/statistics/1058852/retail-space-per-capita-select-countries-worldwide/",
    },
  ],
  luxuryTitle: "Democratized Luxury & Daily Utility",
  luxurySubtitle: "Standard home appliances and transport density that simplify daily life.",
  luxuryItems: [
    {
      title: "Air Conditioning (AC) Ubiquity",
      description:
        "Approximately 90% of US homes have air conditioning, ensuring comfort in hot summers. In contrast, only 10% to 20% of European homes have AC.",
      source: "International Energy Agency / Statista",
      sourceUrl: "https://www.statista.com/chart/34786/respondents-who-have-an-air-conditioner/",
    },
    {
      title: "Home Appliances & Convenience",
      description:
        "Double-door massive refrigerators, built-in dishwashers, in-sink garbage disposals, and in-unit washing/drying machines are baseline standard features.",
      source: "U.S. Energy Information Administration (EIA)",
      sourceUrl: "https://www.eia.gov/consumption/residential/data/2020/",
    },
    {
      title: "Vehicle Density & Auto Mobility",
      description:
        "With over 800 vehicles per 1,000 residents, low fuel costs, and a massive highway network, Americans enjoy unmatched personal mobility.",
      source: "List of countries by vehicles per capita",
      sourceUrl: "https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita",
    },
    {
      title: "General Aviation & Private Skies",
      description:
        "The US general aviation fleet has over 220,000 active aircraft — representing 42% of the global fleet, dwarfing other major nations.",
      source: "Aircraft Owners and Pilots Association (AOPA)",
      sourceUrl: "https://download.aopa.org/Media/General-Aviation-Explained-r5.pdf",
    },
    {
      title: "Cold Chain & Food Logistics",
      description:
        "A continuous refrigeration network spanning trucks and supermarkets preserves fresh food year-round, keeping costs down.",
      source: "Global Cold Chain Alliance (GCCA)",
      sourceUrl: "https://www.iarw.org/",
    },
    {
      title: "Self-Storage Facility Density",
      description:
        "The US holds 90% of the world's self-storage inventory, with over 50,000 facilities — more than McDonald's, Starbucks, and Subway combined.",
      source: "SpareFoot Industry Statistics",
      sourceUrl: "https://www.sparefoot.com/self-storage/news/1432-self-storage-industry-statistics/",
    },
    {
      title: "Recreational Boat Ownership",
      description:
        "The US leads globally in recreational boating, with roughly 17 million boats and yachts owned by 15 million households.",
      source: "National Marine Manufacturers Association (NMMA)",
      sourceUrl: "https://www.nmma.org/",
    },
    {
      title: "The Public Library System",
      description:
        "The US operates over 17,000 public library outlets — more than the number of McDonald's locations globally. Free to any resident with a library card, these institutions lend over 1.3 billion items annually.",
      source: "American Library Association (ALA)",
      sourceUrl: "https://www.ala.org/tools/libfactsheets/olfacts01",
    },
    {
      title: "10.7 Million Swimming Pools: Democratized Luxury",
      description: "There are approximately 10.7 million swimming pools in the United States (10.4M residential, 309k public). A private in-ground pool — a luxury item in any other country — is a standard middle-class feature across the Sunbelt. Florida has 1.59 million residential pools (1 for every 14 residents) and Arizona has 1 for every 13 residents, dwarfing Germany (1.5M) and France (3.2M) relative to their populations.",
      source: "Pool Research 2024",
      sourceUrl: "https://poolresearch.com/statistics/",
    },
    {
      title: "Volunteer Firefighters: 750,000 Safe Neighbors",
      description: "The US operates the largest volunteer fire service globally with 750,000 volunteer firefighters serving in 27,000 departments (65% of the US fire service). These citizens receive no salary, train on their own time, and respond to emergencies, saving taxpayers over $46 billion annually. It represents civil society performing critical government functions through voluntary association.",
      source: "National Volunteer Fire Council (NVFC)",
      sourceUrl: "https://www.nvfc.org/",
    },
    {
      title: "The Pet Economy: $150 Billion Animal Companionship",
      description: "Total US pet industry sales reached $150.6 billion in 2024, representing 40% of the global market. Americans spend more on their pets annually than the entire GDP of dozens of sovereign nations. Advanced veterinary medicine (MRIs, oncologists, cardiologists for animals) represents a standard-of-living data point unique to the US.",
      source: "American Pet Products Association (APPA)",
      sourceUrl: "https://globalpetindustry.com/news/the-pet-industry-in-the-united-states/",
    },
    {
      title: "The Home Improvement Market: Upgrading the Asset",
      description: "Valued at $534.57 billion in 2024, the US home improvement market is a product of single-family homeownership. Giganities Home Depot ($140B+ in revenue) and Lowe's ($85B+) serve homeowners continuously upgrading and investing in their private properties, an industry the size of a major nation's GDP generated by private individuals.",
      source: "Market Data Forecast 2024",
      sourceUrl: "https://www.marketdataforecast.com/market-reports/us-home-improvement-market",
    },
  ],
  incomeTitle: "Disposable Income & Charitable Giving",
  incomeSubtitle:
    "How the American middle class compounds wealth and voluntarily supports communities.",
  incomeParagraph1:
    "The United States consistently has the highest Household Net Adjusted Disposable Income in the OECD. More importantly, when measuring Actual Individual Consumption (AIC) — which details all goods and services actually consumed by households, including those funded by the state — the US stands alone.",
  incomeParagraph2:
    "Even the poorest US states have higher real consumption levels than major Western European countries like the UK, France, or Germany. This consumer power is matched by a culture of private charity: Americans voluntarily donate a massive percentage of their income to local causes and international aid, consistently ranking at the absolute top of the World Giving Index.",
  incomeItems: [
    {
      title: "OECD Net Adjusted Disposable Income",
      description:
        "American households lead the developed world in adjusted disposable income, leaving more room for savings, investing, and discretionary spending.",
      source: "OECD Household Disposable Income Database",
      sourceUrl: "https://data.oecd.org/hha/household-disposable-income.htm",
    },
    {
      title: "World Giving Index Supremacy",
      description:
        "Despite narratives of European state welfare dominance, Americans are the most privately charitable people on Earth, preferring voluntary community support over state bureaucracy.",
      source: "Charities Aid Foundation (CAF) Giving Index",
      sourceUrl:
        "https://www.cafonline.org/about-us/research/caf-world-giving-index",
    },
  ],
  healthcareTitle: "Healthcare Quality: Focus on Outcomes",
  healthcareSubtitle: "Catching conditions earlier and leading in survival rates.",
  healthcareParagraph:
    "The reflexive critique is that America 'spends more and gets less' — but this collapses when shifting from input spending metrics to actual treatment outcomes. For the diseases that claim lives in large numbers, the United States leads the developed world in 5-year survival rates.",
  healthcareItems: [
    {
      title: "Leading Cancer Survival Rates",
      description:
        "Breast cancer, prostate cancer, colorectal cancer, and leukemia all show American patients outperforming their counterparts in single-payer European systems due to faster access to cutting-edge treatments.",
      source: "OECD Health at a Glance 2023",
      sourceUrl:
        "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      title: "Diagnostic Equipment Density",
      description:
        "The US has more MRI and CT scanners per capita than virtually any other OECD nation. Conditions are caught earlier, and patients avoid the bureaucratic waiting queues common in state-managed European gateways.",
      source: "OECD Diagnostic Databases 2023",
      sourceUrl:
        "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      title: "Contextualizing Life Expectancy Stats",
      description:
        "The oft-cited life expectancy gap is almost entirely explained by lifestyle factors — obesity, vehicular accidents, and violent crime — rather than the quality of medical delivery itself. When it comes to treatment, the quality of care remains unmatched.",
      source: "COSM Study / AEI Research",
      sourceUrl:
        "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/",
    },
  ],
  oracleDescription:
    "Ask the AI Oracle about purchasing power parity, average home sizing, car ownership statistics, healthcare survival rates, or the democratization of luxury.",
  tocItems: [
    { label: "Abundance in Numbers", href: "#stats" },
    { label: "Democratized Luxury", href: "#luxury" },
    { label: "Income & Giving", href: "#comparison" },
    { label: "Healthcare Quality", href: "#healthcare" },
    { label: "Cities & Landscapes", href: "#cities" },
    { label: "Explore Deeper", href: "#explore" },
  ],
  comparisonEyebrow: "FLAGSHIP COMPARISON",
  comparisonTitle: "America vs. the World",
  comparisonDesc: "What normal American excellence really looks like next to the developed world — north Houston versus Iași, category by category.",
  exploreLabel: "Explore",
  acLabel: "Homes with Air Conditioning",
  acSub: "vs. 10–20% in Europe",
  aircraftLabel: "Registered Civil Aircraft",
  aircraftSub: "42% of global total",
  librariesLabel: "Public Library Outlets",
  librariesSub: "More than all McDonald's worldwide",
  luxuryLabel: "DEMOCRATIZED LUXURY",
  outdoorLabel: "OUTDOOR FREEDOM",
  outdoorTitle: "America in the Wild",
  outdoorDescription: "17 million recreational boats, thousands of campgrounds, millions of acres of public land, and the freedom to go. Hunting, fishing, sailing, hiking — outdoor recreation is not a privilege here; it's part of the baseline standard of living.",
  citiesLabel: "CITIES OF AMERICA",
  citiesDesc: "Coast to coast — vibrant metropolises, state capitals, and thriving mid-size cities that define American urban life.",
  aerialLabel: "AMERICA FROM ABOVE",
  aerialTitle: "Cities at Altitude",
  aerialDesc: "From 1,000 feet up, America's great cities reveal their true scale — engineered grids of steel, glass, and water that pulse with the nation's economic and cultural energy.",
  lakeCaption: "Chicago at Twilight — Lake Michigan",
  manhattanCaption: "Midtown Manhattan — Golden Hour",
  nycTopDownCaption: "NYC Midtown — Top Down",
};

const qolCopyRo: QualityOfLifeCopy = {
  breadcrumb: "Calitatea Vieții",
  heroTagline: "STANDARDUL ABUNDENȚEI",
  heroTitle: "Cel Mai Înalt Nivel de Trai pentru Cei Mai Mulți Oameni",
  heroSubtitle:
    "O analiză empirică a puterii de cumpărare zilnice, spațiului de locuit, confortului casnic și rezultatelor medicale care definesc clasa de mijloc americană.",
  statsTitle: "Abundența în Cifre",
  statsSubtitle:
    "Indicatorii de bază ai bogăției gospodăriilor, locuințelor, costurilor cu energia și impozitării din America.",
  stats: [
    {
      title: "Dimensiunea Locuințelor",
      value: "Spațiu Locativ Dublu sau Triplu",
      description:
        "Dimensiunea medie a locuințelor per persoană în SUA este de 2-3 ori mai mare decât în marile țări europene (precum Germania sau Marea Britanie) și asiatice (cum ar fi Japonia).",
      source: "World Population Review 2026",
      sourceUrl: "https://worldpopulationreview.com/country-rankings/house-size-by-country",
    },
    {
      title: "Accesibilitatea Locuințelor",
      value: "#2 Cele Mai Accesibile Locuințe",
      description:
        "America are cele mai accesibile locuințe în raport cu venitul din lume, după o singură țară. Suprafața reală pe metru pătrat este de 2-4 ori mai accesibilă decât în Europa.",
      source: "Numbeo Property Index 2026",
      sourceUrl: "https://www.numbeo.com/property-investment/rankings_by_country.jsp",
    },
    {
      title: "Ipoteca Fixă pe 30 de Ani",
      value: "Dobânzi Blocate pe o Generație",
      description:
        "SUA sunt singura țară din lume unde creditul ipotecar cu rată fixă pe 30 de ani este dominant (~90% din cumpărători), protejând proprietarii de șocurile dobânzilor.",
      source: "CNBC / Fannie Mae 2024",
      sourceUrl: "https://www.cnbc.com/2024/05/07/why-the-30-year-fixed-rate-mortgage-is-a-uniquely-american-construct.html",
    },
    {
      title: "Salarii OCDE (Ajustate la PPP)",
      value: "#2 Cele Mai Mari Salarii din Lume",
      description:
        "Ajustat la paritatea puterii de cumpărare (PPP), salariul mediu american este al doilea cel mai mare din OCDE, fiind depășit doar de cel din Elveția.",
      source: "OECD Wage Index 2026",
      sourceUrl: "https://www.numbeo.com/property-investment/rankings_by_country.jsp",
    },
    {
      title: "Cheltuieli Reduse pe Alimente",
      value: "Cea mai mică cotă de cheltuială pe hrană",
      description:
        "Mâncarea este atât de abundentă în America încât gospodăriile cheltuiesc cel mai mic procent din bugetul lor pe alimente din lume, având o disponibilitate calorică garantată.",
      source: "Our World in Data",
      sourceUrl: "https://ourworldindata.org/grapher/food-expenditure-share-gdp?country=~USA",
    },
    {
      title: "Utilități și Carburant Ieftin",
      value: "Cele mai mici costuri energetice din G7",
      description:
        "Prețurile scăzute la electricitate și benzină în raport cu venitul mediu fac din aerul condiționat și transportul personal un standard minim, nu un lux.",
      source: "Statista & Global Petrol Prices 2026",
      sourceUrl: "https://www.statista.com/statistics/263492/electricity-prices-in-selected-countries/",
    },
    {
      title: "Impozitare Progresivă",
      value: "Primii 1% plătesc 40% din taxe",
      description:
        "SUA au cel mai progresiv sistem fiscal din lumea dezvoltată. Nu există TVA națională regresivă; primii 1% din contribuabili suportă 40% din totalul impozitului pe venit.",
      source: "Cato Institute & Tax Foundation 2025",
      sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world",
    },
    {
      title: "Densitatea Spațiilor Comerciale",
      value: "2,3 mp per persoană (24,5 sq ft)",
      description:
        "SUA au 2,3 mp de spațiu comercial per locuitor, comparativ cu o medie de doar 0,4 mp în Europa, oferind o abundență și o comoditate uriașă pentru consumatori.",
      source: "ASCE Report Card",
      sourceUrl: "https://www.statista.com/statistics/1058852/retail-space-per-capita-select-countries-worldwide/",
    },
  ],
  luxuryTitle: "Lux Democratizat și Utilitate Zilnică",
  luxurySubtitle: "Dotările casnice standard și mobilitatea care simplifică viața cotidiană și fac verile suportabile.",
  luxuryItems: [
    {
      title: "Climatizare și Spațiu Locativ (AC)",
      description:
        "Aproape 90% din locuințele din SUA au aer condiționat, facilitând confortul în timpul verii. În contrast, doar 10% până la 20% din locuințele europene au AC.",
      source: "Agenția Internațională a Energiei / Statista",
      sourceUrl: "https://www.statista.com/chart/34786/respondents-who-have-an-air-conditioner/",
    },
    {
      title: "Electrocasnice și Conveniență",
      description:
        "Frigiderele masive cu uși multiple, mașinile de spălat vase încorporate, tocătoarele de resturi la chiuvetă și mașinile de spălat și uscat rufe în unitate sunt norme așteptate chiar și în apartamentele de clasă muncitoare.",
      source: "U.S. Energy Information Administration (EIA)",
      sourceUrl: "https://www.eia.gov/consumption/residential/data/2020/",
    },
    {
      title: "Mobilitatea Personală și Auto",
      description:
        "Cu peste 800 de vehicule la 1.000 de locuitori, combustibil ieftin și rețeaua masivă de autostrăzi interstatale, americanii beneficiază de o libertate de mișcare inegalabilă.",
      source: "List of countries by vehicles per capita",
      sourceUrl: "https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita",
    },
    {
      title: "Aviația Generală și Cerul Privat",
      description:
        "Flota de aviație civilă din SUA numără 220.000 de aeronave înregistrate — 42% din flota globală, depășind masiv China (5.366) și Canada (4.888).",
      source: "Aircraft Owners and Pilots Association (AOPA)",
      sourceUrl: "https://download.aopa.org/Media/General-Aviation-Explained-r5.pdf",
    },
    {
      title: "Lanțul Frigorific și Logistica Alimentară",
      description:
        "O rețea continuă și masivă de camioane, depozite și vitrine frigorifice acoperă întregul continent, păstrând mâncarea proaspătă accesibilă tot anul.",
      source: "Global Cold Chain Alliance (GCCA)",
      sourceUrl: "https://www.iarw.org/",
    },
    {
      title: "Civilizația Depozitării Personale (Self-Storage)",
      description:
        "SUA dețin 90% din stocul global de spații de depozitare personală, cu peste 50.000 de facilități — mai multe decât locațiile McDonald's, Starbucks și Subway la un loc.",
      source: "SpareFoot Industry Statistics",
      sourceUrl: "https://www.sparefoot.com/self-storage/news/1432-self-storage-industry-statistics/",
    },
    {
      title: "Ambarcațiuni Recreaționale",
      description:
        "America conduce la nivel mondial în posesia de bărci, cu circa 17 milioane de bărci și iahturi deținute de 15 milioane de gospodării.",
      source: "National Marine Manufacturers Association (NMMA)",
      sourceUrl: "https://www.nmma.org/",
    },
    {
      title: "Sistemul Bibliotecilor Publice",
      description:
        "SUA operează peste 17.000 de biblioteci publice — mai multe decât numărul total de locații McDonald's la nivel global. Gratuite pentru rezidenți, ele împrumută peste 1,3 miliarde de materiale anual.",
      source: "American Library Association (ALA)",
      sourceUrl: "https://www.ala.org/tools/libfactsheets/olfacts01",
    },
    {
      title: "10,7 Milioane de Piscine: Lux Democratizat",
      description: "Există aproximativ 10,7 milioane de piscine în SUA (10,4 milioane rezidențiale, 309.000 publice). O piscină privată la sol este o dotare standard a clasei de mijloc din statele calde. Florida are 1,59 milioane de piscine (1 la 14 locuitori), iar Arizona are 1 la 13, în timp ce Franța are sub 3,2 milioane, iar Germania sub 1,5 milioane, reflectând un cost al terenului și al muncii accesibil.",
      source: "Pool Research 2024",
      sourceUrl: "https://poolresearch.com/statistics/",
    },
    {
      title: "Pompieri Voluntari: 750.000 de Cetățeni Implicați",
      description: "SUA operează cel mai mare serviciu de pompieri voluntari din lume, cu aproximativ 750.000 de voluntari în 27.000 de departamente (65% din total). Acești cetățeni nu primesc salariu și își cumpără propriul echipament, economisind peste 46 de miliarde de dolari anual pentru contribuabili, reprezentând un exemplu pur al principiului de auto-organizare locală.",
      source: "National Volunteer Fire Council (NVFC)",
      sourceUrl: "https://www.nvfc.org/",
    },
    {
      title: "Economia Animalelor de Companie: 150 Mld. $",
      description: "Cheltuielile totale pentru animalele de companie în SUA au atins 150,6 miliarde de dolari în 2024, reprezentând 40% din piața globală. Americanii cheltuiesc pe animale mai mult decât întregul PIB al multor țări suverane, iar serviciile veterinare avansate includ clinici oncologice și cardiologice pentru animale.",
      source: "American Pet Products Association (APPA)",
      sourceUrl: "https://globalpetindustry.com/news/the-pet-industry-in-the-united-states/",
    },
    {
      title: "Îmbunătățirea Locuinței: O Piață de 535 Mld. $",
      description: "Piața de modernizare a locuințelor din SUA a fost evaluată la 534,57 miliarde de dolari în 2024. Home Depot generează venituri de peste 140 de miliarde de dolari anual, iar Lowe's 85 de miliarde de dolari, fiind alimentată de casele unifamiliale și dorința proprietarilor de a investi continuu în proprietatea lor privată.",
      source: "Market Data Forecast 2024",
      sourceUrl: "https://www.marketdataforecast.com/market-reports/us-home-improvement-market",
    },
  ],
  incomeTitle: "Venit Disponibil și Generozitate Privată",
  incomeSubtitle: "Cum își consolidează averea clasa de mijloc și cum susține comunitățile.",
  incomeParagraph1:
    "Statele Unite au constant cel mai mare Venit Disponibil Net Ajustat al Gospodăriilor din OCDE. Mai important, în ceea ce privește Consumul Individual Real (AIC) — care măsoară toate bunurile și serviciile consumate efectiv de gospodării — SUA este fără rival.",
  incomeParagraph2:
    "Chiar și cele mai sărace state din SUA au niveluri de consum real mai mari decât țări din Europa de Vest precum Marea Britanie, Franța sau Germania. Americanii donează voluntar un procent mare din venit, ocupând prima poziție în World Giving Index.",
  incomeItems: [
    {
      title: "Venitul Disponibil Net Ajustat OCDE",
      description:
        "Gospodăriile americane conduc lumea dezvoltată în ceea ce privește venitul disponibil rămas, oferind oportunități majore pentru economisire și investiții.",
      source: "OECD Household Disposable Income Database",
      sourceUrl: "https://data.oecd.org/hha/household-disposable-income.htm",
    },
    {
      title: "Generozitatea Privată (Giving Index)",
      description:
        "Americanii preferă generozitatea privată și voluntariatul pentru a rezolva problemele comunitare rapid, fără birocrație statală.",
      source: "Charities Aid Foundation (CAF) Giving Index",
      sourceUrl: "https://www.cafonline.org/about-us/research/caf-world-giving-index",
    },
  ],
  healthcareTitle: "Calitatea Sănătății: Accent pe Rezultate",
  healthcareSubtitle: "Descoperirea timpurie a bolilor și supraviețuirea peste media globală.",
  healthcareParagraph:
    "Critica clasică conform căreia America 'cheltuiește cel mai mult și obține cel mai puțin' se prăbușește când trecem de la costuri la rezultatele terapeutice reale. SUA conduce lumea dezvoltată în ratele de supraviețuire la 5 ani.",
  healthcareItems: [
    {
      title: "Supraviețuirea în Oncologie",
      description:
        "Cancerul de sân, prostată, colon și leucemia au rate de supraviețuire la 5 ani mult superioare în SUA comparativ cu sistemele cu plătitor unic din Europa.",
      source: "OECD Health at a Glance 2023",
      sourceUrl: "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      title: "Densitatea Echipamentelor de Diagnostic",
      description:
        "SUA are cele mai multe aparate RMN și CT per capita din OCDE. Investigațiile se fac prompt, evitându-se listele lungi de așteptare din Europa.",
      source: "OECD Diagnostic Databases 2023",
      sourceUrl: "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      title: "Contextul Speranței de Viață",
      description:
        "Diferențele statistice la speranța de viață generală țin de comportamente (obezitate, accidente rutiere, arme), nu de calitatea actului medical.",
      source: "COSM Study / AEI Research",
      sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/",
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre paritatea puterii de cumpărare, dimensiunea medie a locuințelor, statistici privind proprietatea auto, ratele de supraviețuire medicală sau democratizarea luxului.",
  tocItems: [
    { label: "Abundența în Cifre", href: "#stats" },
    { label: "Lux Democratizat", href: "#luxury" },
    { label: "Venit & Generozitate", href: "#comparison" },
    { label: "Calitatea Sănătății", href: "#healthcare" },
    { label: "Orașe și Peisaje", href: "#cities" },
    { label: "Explorează în Profunzime", href: "#explore" },
  ],
  comparisonEyebrow: "ANALIZĂ COMPARATIVĂ",
  comparisonTitle: "America vs. Lumea",
  comparisonDesc: "Cum arată cu adevărat excelența americană obișnuită față de lumea dezvoltată — nordul Houstonului versus Iași, categorie cu categorie.",
  exploreLabel: "Explorează",
  acLabel: "Case cu Aer Condiționat",
  acSub: "vs. 10–20% în Europa",
  aircraftLabel: "Aeronave Civile Înregistrate",
  aircraftSub: "42% din totalul global",
  librariesLabel: "Biblioteci Publice",
  librariesSub: "Mai multe decât McDonald's global",
  luxuryLabel: "LUX DEMOCRATIZAT",
  outdoorLabel: "LIBERTATE ÎN AER LIBER",
  outdoorTitle: "America în Natură",
  outdoorDescription: "17 milioane de ambarcațiuni, mii de campinguri, milioane de acri de pădure și libertatea de a pleca oricând — vânătoare, pescuit, navigație, drumeție. Accesul la natură nu este un privilegiu; este parte din standardul de viață american.",
  citiesLabel: "ORAȘELE AMERICII",
  citiesDesc: "De la coasta la coastă — metropole vibrante, capitalele statelor și orașe de dimensiuni medii prospere.",
  aerialLabel: "AMERICA VĂZUTĂ DE SUS",
  aerialTitle: "Metropole la Altitudine",
  aerialDesc: "De la 300 de metri înălțime, orașele americane dezvăluie adevărata lor amploare — rețele de oțel și sticlă care adăpostesc inima economică și culturală a națiunii.",
  lakeCaption: "Chicago la Amurg — Lacul Michigan",
  manhattanCaption: "Midtown Manhattan — Ora de Aur",
  nycTopDownCaption: "New York City — Vedere de Sus",
};

export function getQualityOfLifePageCopy(locale: Locale): QualityOfLifeCopy {
  return locale === "ro" ? qolCopyRo : qolCopyEn;
}

// ─── NATURAL RESOURCES PAGE COPY ─────────────────────────────────────────────

export function getNaturalResourcesPageCopy(locale: Locale) {
  if (locale === "ro") {
    return {
      breadcrumb: "Resurse Naturale",
      heroEyebrow: "Resurse Naturale",
      heroTitleLead: "BOGĂȚIA UNUI",
      heroTitleAccent: "CONTINENT",
      heroDescription:
        "De la câmpurile petroliere din Texas la mările de grâu din Kansas, de la minele de cupru din Utah la Marile Lacuri — Statele Unite comandă una dintre cele mai complete înzestrări de bogăție naturală acordate vreodată unei singure națiuni.",
      overviewEyebrow: "Înzestrarea",
      overviewTitle: "Un Continent al Abundenței",
      pillarsEyebrow: "Cei Șase Piloni",
      pillarsTitle: "Explorează Înzestrarea",
      exploreCta: "Explorează →",
      energyEyebrow: "Energie",
      energyTitle: "Puterea Energetică a Lumii",
      agEyebrow: "Agricultură",
      agTitle: "Coșul de Pâine al Lumii",
      mineralsEyebrow: "Minerale",
      mineralsTitle: "Averea de Sub Pământ",
      waterEyebrow: "Apă",
      waterTitle: "Bogăția în Apă Dulce",
      oilChartTitle: "Producția de Țiței — Principalii Producători (2024)",
      oilChartSubtitle: "Milioane de barili pe zi — America conduce lumea",
      oilValueLabel: "Mil. barili/zi",
      gasChartTitle: "Producția de Gaz Natural pe Țară (2023)",
      gasChartSubtitle: "Miliarde de metri cubi pe an",
      gasValueLabel: "Mld. m³/an",
      cornChartTitle: "Producția de Porumb pe Țară (2024)",
      cornChartSubtitle: "Milioane de tone — inima Americii hrănește lumea",
      cornValueLabel: "Mil. tone",
      coalChartTitle: "Rezerve Recuperabile de Cărbune pe Țară",
      coalChartSubtitle: "Miliarde de tone — cele mai mari rezerve de pe Pământ",
      coalValueLabel: "Mld. tone",
      lngChartTitle: "Exporturi de GNL pe Țară (2023)",
      lngChartSubtitle: "Milioane de tone pe an — America conduce lumea",
      lngValueLabel: "Mil. tone/an",
      nuclearChartTitle: "Generare Nucleară pe Țară",
      nuclearChartSubtitle: "TWh pe an — cea mai mare flotă din lume",
      nuclearValueLabel: "TWh/an",
      beefChartTitle: "Producția de Carne de Vită pe Țară (2023)",
      beefChartSubtitle: "Milioane de tone — cel mai mare producător din lume",
      beefValueLabel: "Mil. tone",
      renewablesEyebrow: "Regenerabile & Nuclear",
      renewablesTitle: "Energie Curată la Scară",
      forestsEyebrow: "Păduri & Teren Public",
      forestsTitle: "O Treime din America este Pădure",
      basinsTitle: "Marile Bazine Energetice",
      commoditiesTitle: "Principalele Produse Agricole",
      mineralsGridTitle: "Minerale Strategice",
      waterSystemsTitle: "Marile Sisteme de Apă",
      milestonesEyebrow: "Cronologie",
      milestonesTitle: "Etape ale Puterii Resurselor Americane",
      galleryEyebrow: "Mărturia Vizuală",
      galleryTitle: "Bogăția în Imagini",
      galleryIntro:
        "De la erupția de la Spindletop la Barajul Hoover, de la Centura Porumbului la minele de cupru — fotografiile care au surprins felul în care America și-a valorificat resursele.",
      irrigationEyebrow: "Tehnologie",
      irrigationTitle: "Cercurile de Irigare cu Pivot Central",
      irrigationAerialCaption: "Modele de verde vibrant pe peisajul din Midwest",
      irrigationSatelliteCaption: "Vedere orbitală a rețelei geometrice din Kansas",
      waterLinkLabel: "Explorează Marile Lacuri →",
      tocItems: [
        { label: "Prezentare", href: "#overview" },
        { label: "Energie", href: "#energy" },
        { label: "Regenerabile", href: "#renewables" },
        { label: "Agricultură", href: "#agriculture" },
        { label: "Câmpuri Irigate", href: "#irrigation" },
        { label: "Minerale", href: "#minerals" },
        { label: "Apă", href: "#water" },
        { label: "Păduri", href: "#forests" },
        { label: "Etape", href: "#milestones" },
        { label: "Galerie", href: "#gallery" },
      ],
      pillars: [
        { id: "energy", label: "Energie", desc: "Cel mai mare producător de petrol și gaze din lume și exportator de top de GNL." },
        { id: "renewables", label: "Regenerabile & Nuclear", desc: "Cea mai mare flotă nucleară din lume, plus hidro, eolian și solar." },
        { id: "agriculture", label: "Agricultură", desc: "880 de milioane de acri care hrănesc lumea din Centura Porumbului." },
        { id: "minerals", label: "Minerale", desc: "Cele mai mari rezerve de cărbune de pe Pământ — plus cupru, aur și litiu." },
        { id: "water", label: "Apă", desc: "O cincime din apa dulce de suprafață a planetei și barajele care o valorifică." },
        { id: "forests", label: "Păduri & Teren Public", desc: "O treime din America este pădure; 640 de milioane de acri sunt teren public." },
      ],
    };
  }
  return {
    breadcrumb: "Natural Resources",
    heroEyebrow: "Natural Resources",
    heroTitleLead: "THE WEALTH OF",
    heroTitleAccent: "A CONTINENT",
    heroDescription:
      "From the oil fields of Texas to the wheat seas of Kansas, from the copper pits of Utah to the Great Lakes — the United States commands one of the most complete endowments of natural wealth ever granted to a single nation.",
    overviewEyebrow: "The Endowment",
    overviewTitle: "A Continent of Abundance",
    pillarsEyebrow: "The Six Pillars",
    pillarsTitle: "Explore the Endowment",
    exploreCta: "Explore →",
    energyEyebrow: "Energy",
    energyTitle: "The World's Energy Power",
    agEyebrow: "Agriculture",
    agTitle: "The Breadbasket of the World",
    mineralsEyebrow: "Minerals",
    mineralsTitle: "The Fortune Beneath the Soil",
    waterEyebrow: "Water",
    waterTitle: "A Wealth of Fresh Water",
    oilChartTitle: "Crude Oil Production — Top Producers (2024)",
    oilChartSubtitle: "Millions of barrels per day — America leads the world",
    oilValueLabel: "Million bbl/day",
    gasChartTitle: "Natural Gas Production by Country (2023)",
    gasChartSubtitle: "Billions of cubic metres per year",
    gasValueLabel: "Billion m³/yr",
    cornChartTitle: "Corn Production by Country (2024)",
    cornChartSubtitle: "Millions of metric tons — the American heartland feeds the world",
    cornValueLabel: "Million tonnes",
    coalChartTitle: "Recoverable Coal Reserves by Country",
    coalChartSubtitle: "Billions of metric tons — the largest reserves on Earth",
    coalValueLabel: "Billion tonnes",
    lngChartTitle: "LNG Exports by Country (2023)",
    lngChartSubtitle: "Millions of tonnes per year — America leads the world",
    lngValueLabel: "Million tonnes/yr",
    nuclearChartTitle: "Nuclear Generation by Country",
    nuclearChartSubtitle: "TWh per year — the largest fleet on Earth",
    nuclearValueLabel: "TWh/yr",
    beefChartTitle: "Beef Production by Country (2023)",
    beefChartSubtitle: "Millions of metric tons — the world's top producer",
    beefValueLabel: "Million tonnes",
    renewablesEyebrow: "Renewables & Nuclear",
    renewablesTitle: "Clean Energy at Scale",
    forestsEyebrow: "Forests & Public Lands",
    forestsTitle: "A Third of America is Forest",
    basinsTitle: "The Great Energy Basins",
    commoditiesTitle: "Top Agricultural Commodities",
    mineralsGridTitle: "Strategic Minerals",
    waterSystemsTitle: "The Great Water Systems",
    milestonesEyebrow: "Timeline",
    milestonesTitle: "Milestones of American Resource Power",
    galleryEyebrow: "The Visual Record",
    galleryTitle: "The Wealth in Pictures",
    galleryIntro:
      "From the Spindletop gusher to the Hoover Dam, from the Corn Belt to the copper pits — the photographs that captured how America harnessed its resources.",
    irrigationEyebrow: "Technology",
    irrigationTitle: "Center-Pivot Irrigation Circles",
    irrigationAerialCaption: "Vibrant green patterns across the Midwest landscape",
    irrigationSatelliteCaption: "Orbital view of the geometric grid in Kansas",
    waterLinkLabel: "Explore the Great Lakes →",
    tocItems: [
      { label: "Overview", href: "#overview" },
      { label: "Energy", href: "#energy" },
      { label: "Renewables", href: "#renewables" },
      { label: "Agriculture", href: "#agriculture" },
      { label: "Irrigation Circles", href: "#irrigation" },
      { label: "Minerals", href: "#minerals" },
      { label: "Water", href: "#water" },
      { label: "Forests", href: "#forests" },
      { label: "Milestones", href: "#milestones" },
      { label: "Gallery", href: "#gallery" },
    ],
    pillars: [
      { id: "energy", label: "Energy", desc: "World's #1 oil & gas producer and top LNG exporter." },
      { id: "renewables", label: "Renewables & Nuclear", desc: "The world's largest nuclear fleet, plus hydro, wind, and solar." },
      { id: "agriculture", label: "Agriculture", desc: "880 million acres feeding the world from the Corn Belt." },
      { id: "minerals", label: "Minerals", desc: "The largest coal reserves on Earth — plus copper, gold & lithium." },
      { id: "water", label: "Water", desc: "A fifth of the planet's fresh surface water, and the dams that harness it." },
      { id: "forests", label: "Forests & Public Lands", desc: "A third of America is forest; 640 million acres are public land." },
    ],
  };
}
