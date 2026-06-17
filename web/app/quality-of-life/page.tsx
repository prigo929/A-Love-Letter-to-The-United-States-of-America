import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import {
  MacroStyles,
  MacroHero,
  CountUp,
  MacroFact,
  InfrastructureBand,
} from "@/components/economy/EconomyAnimations";
import { SITE_IMAGES } from "@/lib/site-images";
import DeepDiveSection from "@/components/shared/DeepDiveSection";
import { VERTICALS_THEMATIC_DATA } from "@/lib/data/verticals-thematic-data";
import { DEEP_DIVE_THEMES } from "@/lib/deep-dive-themes";
import { PhotoLightboxGrid } from "@/components/shared/PhotoLightboxGrid";
import { BLUR_PLACEHOLDER } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quality of Life | Standard of Living & Abundance",
  description:
    "Explore the American standard of living: disposable income, housing size, vehicle ownership, home appliances, private giving, and leading healthcare outcomes.",
};

interface QualityOfLifeCopy {
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
}

const copyEn: QualityOfLifeCopy = {
  breadcrumb: "Quality of Life",
  heroTagline: "STANDARD OF ABUNDANCE",
  heroTitle: "The Highest Standard of Living for the Most People",
  heroSubtitle:
    "An empirical look at the everyday purchasing power, living space, household convenience, and health outcomes that define the American middle class.",
  statsTitle: "By the Numbers: Everyday Abundance",
  statsSubtitle:
    "The baseline metrics of household wealth, housing, energy costs, and progressivity in America.",
  stats: [
    {
      title: "Spacious Living Sizing",
      value: "Double to Triple Housing Space",
      description:
        "Average home sizes per person in the US are 2-3x larger than in major European countries (like Germany or the UK) and Asian nations (like Japan).",
      source: "World Population Review 2026",
      sourceUrl:
        "https://worldpopulationreview.com/country-rankings/house-size-by-country",
    },
    {
      title: "Housing Affordability",
      value: "#2 Most Affordable in the World",
      description:
        "America has the second most affordable housing relative to income globally. Real square footage is 2-4x more affordable than in Europe and 3-6x more than in Asia.",
      source: "Numbeo Property Index 2026",
      sourceUrl:
        "https://www.numbeo.com/property-investment/rankings_by_country.jsp",
    },
    {
      title: "30-Year Fixed Mortgage",
      value: "Generation-Locked Rates",
      description:
        "America is the only country where the 30-year fixed-rate mortgage is dominant (~90% of buyers), shielding homeowners from interest-rate payment shocks by transferring risk to capital markets.",
      source: "CNBC / Fannie Mae 2024",
      sourceUrl:
        "https://www.cnbc.com/2024/05/07/why-the-30-year-fixed-rate-mortgage-is-a-uniquely-american-construct.html",
    },
    {
      title: "OECD Purchasing Power Wages",
      value: "#2 Highest Wages Globally",
      description:
        "Adjusted for purchasing power parity (PPP), average American wages are the second highest in the OECD, surpassed only by Switzerland.",
      source: "OECD Wage Index 2026",
      sourceUrl:
        "https://www.numbeo.com/property-investment/rankings_by_country.jsp",
    },
    {
      title: "Lowest Food Spending",
      value: "Lowest share of income spent on food",
      description:
        "Food is so abundant in America that households spend the lowest percentage of their budgets on groceries in the world, with calorie abundance guaranteed.",
      source: "Our World in Data",
      sourceUrl:
        "https://ourworldindata.org/grapher/food-expenditure-share-gdp?country=~USA",
    },
    {
      title: "Cheap Utility and Gas Prices",
      value: "Lowest energy costs in developed world",
      description:
        "Cheap electricity and gas relative to median income make climate control and personal transport a baseline expectation rather than a luxury.",
      source: "Statista & Global Petrol Prices 2026",
      sourceUrl:
        "https://www.statista.com/statistics/263492/electricity-prices-in-selected-countries/",
    },
    {
      title: "Highly Progressive Taxes",
      value: "Top 1% pays 40% of income tax",
      description:
        "The US has the most progressive tax system in the developed world. There is no regressive national sales tax (VAT); the top 1% pays 40% of income tax, while the bottom 50% pays just 3%.",
      source: "Cato Institute & Tax Foundation 2025",
      sourceUrl:
        "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world",
    },
    {
      title: "Retail Infrastructure Density",
      value: "24.5 Sq Ft Per Capita",
      description:
        "The US has 24.5 sq ft of retail space per person, compared to an average of just 4.5 sq ft in Europe, creating massive consumer abundance and competition.",
      source: "ASCE Report Card",
      sourceUrl:
        "https://www.statista.com/statistics/1058852/retail-space-per-capita-select-countries-worldwide/",
    },
  ],
  luxuryTitle: "Democratized Luxury & Convenience",
  luxurySubtitle:
    "Everyday household standards and mobility that make life easier and summers manageable.",
  luxuryItems: [
    {
      title: "Living Space & Climate Control (AC)",
      description:
        "Roughly 90% of US homes are equipped with air conditioning, making sweltering summers entirely manageable. By contrast, only about 10% to 20% of European homes have AC. Affordability of electricity means climate control is a standard expectation, not a luxury.",
      source: "International Energy Agency / Statista",
      sourceUrl:
        "https://www.statista.com/chart/34786/respondents-who-have-an-air-conditioner/",
    },
    {
      title: "Home Appliances & Convenience",
      description:
        "Massive multi-door refrigerators, built-in dishwashers, garbage disposals, and full-size in-unit clothes washers and dryers are expected norms even in standard working-class apartments. In Europe, space and energy constraints mean appliances are smaller and dedicated clothes dryers are treated as luxuries.",
      source: "US Energy Information Administration (EIA)",
      sourceUrl: "https://www.eia.gov/consumption/residential/data/2020/",
    },
    {
      title: "Personal Mobility & Road Network",
      description:
        "With over 800 vehicles per 1,000 people, cheap fuel, and the massive Interstate Highway System, Americans enjoy unmatched personal freedom of movement. This allows for a spacious suburban lifestyle and lets labor remain highly mobile across a continent.",
      source: "List of countries by vehicles per capita",
      sourceUrl:
        "https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita",
    },
    {
      title: "General Aviation & Personal Sky",
      description:
        "The US civil aviation fleet has 220,000 registered aircraft — 42% of the global total, dwarfing China (5,366) and Canada (4,888). Over 90% are general aviation (private/business), and over 80% of the 609,000 certified pilots fly GA, landing at over 5,000 public-use airports.",
      source: "Aircraft Owners and Pilots Association (AOPA)",
      sourceUrl:
        "https://download.aopa.org/Media/General-Aviation-Explained-r5.pdf",
    },
    {
      title: "The Cold Chain & Food Logistics",
      description:
        "A continuous, massive network of refrigerated trucks, warehouses, and retail cases spans the continent. It keeps fresh strawberries, avocados, and seafood available year-round in even the most remote areas at affordable prices.",
      source: "Global Cold Chain Alliance (GCCA)",
      sourceUrl: "https://www.iarw.org/",
    },
    {
      title: "The Self-Storage Civilization",
      description:
        "The US holds a 90% share of global self-storage inventory, with over 50,000 facilities — more locations than McDonald's, Starbucks, and Subway combined. Generating $40B+ in annual revenue, this industry serves as a physical ledger of American abundance.",
      source: "SpareFoot Industry Statistics",
      sourceUrl:
        "https://www.sparefoot.com/self-storage/news/1432-self-storage-industry-statistics/",
    },
    {
      title: "Recreational Boats & Watercraft",
      description:
        "America leads globally in boat ownership, with approximately 17 million recreational boats and yachts owned by 15 million households. While China registers fewer than 120,000 boats, US middle-class families utilize millions of navigable freshwater lakes and coastal access points.",
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
};

const copyRo: QualityOfLifeCopy = {
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
      sourceUrl:
        "https://worldpopulationreview.com/country-rankings/house-size-by-country",
    },
    {
      title: "Accesibilitatea Locuințelor",
      value: "#2 Cele Mai Accesibile Locuințe",
      description:
        "America are cele mai accesibile locuințe în raport cu venitul din lume, după o singură țară. Suprafața reală pe metru pătrat este de 2-4 ori mai accesibilă decât în Europa.",
      source: "Numbeo Property Index 2026",
      sourceUrl:
        "https://www.numbeo.com/property-investment/rankings_by_country.jsp",
    },
    {
      title: "Ipoteca Fixă pe 30 de Ani",
      value: "Dobânzi Blocate pe o Generație",
      description:
        "SUA sunt singura țară din lume unde creditul ipotecar cu rată fixă pe 30 de ani este dominant (~90% din cumpărători), protejând proprietarii de șocurile dobânzilor.",
      source: "CNBC / Fannie Mae 2024",
      sourceUrl:
        "https://www.cnbc.com/2024/05/07/why-the-30-year-fixed-rate-mortgage-is-a-uniquely-american-construct.html",
    },
    {
      title: "Salarii OCDE (Ajustate la PPP)",
      value: "#2 Cele Mai Mari Salarii din Lume",
      description:
        "Ajustat la paritatea puterii de cumpărare (PPP), salariul mediu american este al doilea cel mai mare din OCDE, fiind depășit doar de cel din Elveția.",
      source: "OECD Wage Index 2026",
      sourceUrl:
        "https://www.numbeo.com/property-investment/rankings_by_country.jsp",
    },
    {
      title: "Cheltuieli Reduse pe Alimente",
      value: "Cea mai mică cotă de cheltuială pe hrană",
      description:
        "Mâncarea este atât de abundentă în America încât gospodăriile cheltuiesc cel mai mic procent din bugetul lor pe alimente din lume, având o disponibilitate calorică garantată.",
      source: "Our World in Data",
      sourceUrl:
        "https://ourworldindata.org/grapher/food-expenditure-share-gdp?country=~USA",
    },
    {
      title: "Utilități și Carburant Ieftin",
      value: "Cele mai mici costuri energetice din G7",
      description:
        "Prețurile scăzute la electricitate și benzină în raport cu venitul mediu fac din aerul condiționat și transportul personal un standard minim, nu un lux.",
      source: "Statista & Global Petrol Prices 2026",
      sourceUrl:
        "https://www.statista.com/statistics/263492/electricity-prices-in-selected-countries/",
    },
    {
      title: "Impozitare Progresivă",
      value: "Primii 1% plătesc 40% din taxe",
      description:
        "SUA au cel mai progresiv sistem fiscal din lumea dezvoltată. Nu există TVA națională regresivă; primii 1% din contribuabili suportă 40% din totalul impozitului pe venit.",
      source: "Cato Institute & Tax Foundation 2025",
      sourceUrl:
        "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world",
    },
    {
      title: "Densitatea Spațiilor Comerciale",
      value: "2,3 mp per persoană (24,5 sq ft)",
      description:
        "SUA au 2,3 mp de spațiu comercial per locuitor, comparativ cu o medie de doar 0,4 mp în Europa, oferind o abundență și o comoditate uriașă pentru consumatori.",
      source: "ASCE Report Card",
      sourceUrl:
        "https://www.statista.com/statistics/1058852/retail-space-per-capita-select-countries-worldwide/",
    },
  ],
  luxuryTitle: "Lux Democratizat și Utilitate Zilnică",
  luxurySubtitle:
    "Dotările casnice standard și mobilitatea care simplifică viața cotidiană și fac verile suportabile.",
  luxuryItems: [
    {
      title: "Climatizare și Spațiu Locativ (AC)",
      description:
        "Aproape 90% din locuințele din SUA au aer condiționat, facilitând confortul în timpul verii. În contrast, doar 10% până la 20% din locuințele europene au AC.",
      source: "Agenția Internațională a Energiei / Statista",
      sourceUrl:
        "https://www.statista.com/chart/34786/respondents-who-have-an-air-conditioner/",
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
      sourceUrl:
        "https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita",
    },
    {
      title: "Aviația Generală și Cerul Privat",
      description:
        "Flota de aviație civilă din SUA numără 220.000 de aeronave înregistrate — 42% din flota globală, depășind masiv China (5.366) și Canada (4.888).",
      source: "Aircraft Owners and Pilots Association (AOPA)",
      sourceUrl:
        "https://download.aopa.org/Media/General-Aviation-Explained-r5.pdf",
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
      sourceUrl:
        "https://www.sparefoot.com/self-storage/news/1432-self-storage-industry-statistics/",
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
  incomeSubtitle:
    "Cum își consolidează averea clasa de mijloc și cum susține comunitățile.",
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
      sourceUrl:
        "https://www.cafonline.org/about-us/research/caf-world-giving-index",
    },
  ],
  healthcareTitle: "Calitatea Sănătății: Accent pe Rezultate",
  healthcareSubtitle:
    "Descoperirea timpurie a bolilor și supraviețuirea peste media globală.",
  healthcareParagraph:
    "Critica clasică conform căreia America 'cheltuiește cel mai mult și obține cel mai puțin' se prăbușește când trecem de la costuri la rezultatele terapeutice reale. SUA conduce lumea dezvoltată în ratele de supraviețuire la 5 ani.",
  healthcareItems: [
    {
      title: "Supraviețuirea în Oncologie",
      description:
        "Cancerul de sân, prostată, colon și leucemia au rate de supraviețuire la 5 ani mult superioare în SUA comparativ cu sistemele cu plătitor unic din Europa.",
      source: "OECD Health at a Glance 2023",
      sourceUrl:
        "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      title: "Densitatea Echipamentelor de Diagnostic",
      description:
        "SUA are cele mai multe aparate RMN și CT per capita din OCDE. Investigațiile se fac prompt, evitându-se listele lungi de așteptare din Europa.",
      source: "OECD Diagnostic Databases 2023",
      sourceUrl:
        "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html",
    },
    {
      title: "Contextul Speranței de Viață",
      description:
        "Diferențele statistice la speranța de viață generală țin de comportamente (obezitate, accidente rutiere, arme), nu de calitatea actului medical.",
      source: "COSM Study / AEI Research",
      sourceUrl:
        "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/",
    },
  ],
  oracleDescription:
    "Întreabă Oracolul AI despre paritatea puterii de cumpărare, dimensiunea medie a locuințelor, statistici privind proprietatea auto, ratele de supraviețuire medicală sau democratizarea luxului.",
};

export default async function QualityOfLifePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <>
      <MacroStyles />

      {/* Cinematic Hero — American Suburbs */}
      <MacroHero
        imageSrc="/images/library/Housing/Modern suburban house with garden and American flag, showcasing beautiful architecture in Eagle Mountain, UT.jpg"
        imageAlt="Modern American Suburban Home with American Flag"
        eyebrow={copy.heroTagline}
        titleLead={isRo ? "CEL MAI ÎNALT" : "THE HIGHEST"}
        titleAccent={isRo ? "NIVEL DE TRAI" : "STANDARD OF LIVING"}
        description={copy.heroSubtitle}
        stats={[
          {
            value: "2-3x",
            label: isRo ? "Spațiu Locativ vs Europa" : "Living Space vs Europe",
          },
          {
            value: "#2",
            label: isRo ? "Cel Mai Ieftin Acces la Locuință" : "Most Affordable Housing",
          },
          {
            value: "800",
            label: isRo ? "Vehicule / 1.000 Locuitori" : "Vehicles / 1,000 People",
          },
        ]}
      />

      <div className="bg-[#000000] relative z-10 pb-32 pt-16 font-body text-white">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />
        </div>

        {/* Flagship comparison CTA */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
          <Link
            href="/quality-of-life/america-vs-the-world"
            className="group flex flex-col gap-4 rounded-3xl border border-glory-gold/25 bg-glory-gold/6 p-6 transition-colors hover:border-glory-gold/50 sm:flex-row sm:items-center sm:justify-between md:p-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-glory-gold mb-2">
                {isRo ? "ANALIZĂ COMPARATIVĂ" : "FLAGSHIP COMPARISON"}
              </p>
              <h2 className="macro-section-title text-white text-2xl md:text-3xl mb-2">
                {isRo ? "America vs. Lumea" : "America vs. the World"}
              </h2>
              <p className="macro-body text-white/60 text-sm max-w-2xl">
                {isRo
                  ? "Cum arată cu adevărat excelența americană obișnuită față de lumea dezvoltată — nordul Houstonului versus Iași, categorie cu categorie."
                  : "What normal American excellence really looks like next to the developed world — north Houston versus Iași, category by category."}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 font-body text-sm font-semibold text-glory-gold">
              {isRo ? "Explorează" : "Explore"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>

        {/* Stat Grid Section */}
        <section id="stats" className="py-24 border-t border-b border-white/5 bg-white/[0.01] mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="macro-section-title text-white text-3xl md:text-4xl mb-4">
                {copy.statsTitle}
              </h2>
              <p className="macro-body text-white/50 text-base max-w-2xl mx-auto">
                {copy.statsSubtitle}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {copy.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-between hover:border-[#E8B923]/30 hover:bg-white/[0.04] transition-all duration-500"
                >
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#E8B923] mb-3">
                      {stat.title}
                    </p>
                    <p className="font-macro-display text-xl font-bold text-[#E8B923] mb-3 leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm text-white/60 leading-relaxed font-body mb-4">
                      {stat.description}
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs text-white/30">
                    <span>{stat.source}</span>
                    {stat.sourceUrl && (
                      <a
                        href={stat.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E8B923] hover:underline"
                      >
                        {isRo ? "Sursă →" : "Source →"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Count-Up Highlight Stats */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid gap-12 sm:grid-cols-3 text-center">
            <div className="p-8">
              <p className="font-macro-display text-5xl md:text-7xl text-[#E8B923] font-black tracking-tight mb-4">
                <CountUp value={90} suffix="%" />
              </p>
              <p className="font-macro-display text-xl font-bold text-white mb-2">
                {isRo ? "Case cu Aer Condiționat" : "Homes with Air Conditioning"}
              </p>
              <p className="text-sm text-white/40 font-body">
                {isRo ? "vs. 10–20% în Europa" : "vs. 10–20% in Europe"}
              </p>
            </div>
            <div className="p-8">
              <p className="font-macro-display text-5xl md:text-7xl text-[#E8B923] font-black tracking-tight mb-4">
                <CountUp value={220000} />
              </p>
              <p className="font-macro-display text-xl font-bold text-white mb-2">
                {isRo ? "Aeronave Civile Înregistrate" : "Registered Civil Aircraft"}
              </p>
              <p className="text-sm text-white/40 font-body">
                {isRo ? "42% din totalul global" : "42% of global total"}
              </p>
            </div>
            <div className="p-8">
              <p className="font-macro-display text-5xl md:text-7xl text-[#E8B923] font-black tracking-tight mb-4">
                <CountUp value={17000} suffix="+" />
              </p>
              <p className="font-macro-display text-xl font-bold text-white mb-2">
                {isRo ? "Biblioteci Publice" : "Public Library Outlets"}
              </p>
              <p className="text-sm text-white/40 font-body">
                {isRo ? "Mai multe decât McDonald's global" : "More than all McDonald's worldwide"}
              </p>
            </div>
          </div>
        </section>

        {/* Parallax Band — Suburban Aerial */}
        <InfrastructureBand
          imageSrc="/images/library/Housing/US Suburb from air.jpg"
          imageAlt="American Suburbs Aerial View"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {isRo ? "LUX DEMOCRATIZAT" : "DEMOCRATIZED LUXURY"}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {copy.luxuryTitle}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {copy.luxurySubtitle}
            </p>
          </div>
        </InfrastructureBand>

        {/* Democratized Luxury Section */}
        <section id="luxury" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid gap-6 md:grid-cols-2">
            {copy.luxuryItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 flex flex-col justify-between hover:border-[#E8B923]/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8B923]/10 text-[#E8B923] font-mono text-sm font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-macro-display text-lg font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base text-white/70 leading-relaxed font-body mb-6">
                    {item.description}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/30">
                  <span>{item.source}</span>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E8B923] hover:underline"
                    >
                      {isRo ? "Date →" : "Data →"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Abundance & Democratized Luxury Gallery */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center mb-12 font-semibold">
            {isRo ? "PANORAMA ABUNDENȚEI CASNICE" : "VISUALIZING AMERICAN ABUNDANCE"}
          </p>
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            withCaptions
            sizes="(max-width: 768px) 100vw, 25vw"
            photos={[
              { src: SITE_IMAGES.culture.mcdMenu, caption: isRo ? "Abundența Alimentară" : "Food Abundance", description: isRo ? "Calorii ieftine și accesibile la orice colț de stradă." : "Low-cost, high-velocity calories accessible on every corner.", aspect: "16/9", alt: isRo ? "Abundența Alimentară" : "Food Abundance" },
              { src: SITE_IMAGES.culture.dinerInside, caption: isRo ? "Cultura Diner-ului" : "Diner Dining", description: isRo ? "Restaurantul informal american, un simbol al clasei de mijloc." : "The informal community hub for middle-class casual dining.", aspect: "16/9", alt: isRo ? "Cultura Diner-ului" : "Diner Dining" },
              { src: SITE_IMAGES.culture.fashionJeansSneakers, caption: isRo ? "Moda Uniformizată" : "Democratic Fashion", description: isRo ? "Blugi albaștri și pantofi sport: uniforma modernă fără clase." : "Levi's blue jeans and sneakers: the global uniform of classless comfort.", aspect: "16/9", alt: isRo ? "Moda Uniformizată" : "Democratic Fashion" },
              { src: "/images/library/Housing/USA Suburb sunset.jpg", caption: isRo ? "Suburbia la Apus" : "Suburban Sunset", description: isRo ? "Case spațioase cu curte, un standard generalizat." : "Spacious multi-bedroom homes with lawns as a baseline norm.", aspect: "16/9", alt: isRo ? "Suburbia la Apus" : "Suburban Sunset" },
              { src: SITE_IMAGES.housing.frontPorch, caption: isRo ? "Pridvorul American" : "The American Porch", description: isRo ? "Veranda din față — un spațiu semi-public emblematic." : "The front porch: a uniquely American semi-public living space.", aspect: "16/9", alt: isRo ? "Pridvorul American" : "The American Porch" },
              { src: SITE_IMAGES.housing.indianaAutumn, caption: isRo ? "Toamna în Suburbie" : "Suburban Autumn", description: isRo ? "Cartiere cu frunze ruginii — un tablou al normalității americane." : "Tree-lined suburban streets as a middle-class baseline.", aspect: "16/9", alt: isRo ? "Toamna în Suburbie" : "Suburban Autumn" },
              { src: SITE_IMAGES.housing.suburbSpring, caption: isRo ? "Primăvara în Suburbie" : "Suburb in Spring", description: isRo ? "Peluze verzi și flori — peisajul standard al casei americane." : "Green lawns and blossoms: the expected standard of home ownership.", aspect: "16/9", alt: isRo ? "Primăvara în Suburbie" : "Suburb in Spring" },
              { src: SITE_IMAGES.housing.floridaSuburb, caption: isRo ? "Suburbia Floridei" : "Florida Suburbs", description: isRo ? "Case solare, piscine și parcuri — viața în Sun Belt." : "Sun Belt living: pools, palms, and year-round outdoor life.", aspect: "16/9", alt: isRo ? "Suburbia Floridei" : "Florida Suburbs" },
            ]}
          />
        </section>

        {/* Outdoors & Recreation Band */}
        <InfrastructureBand
          imageSrc={SITE_IMAGES.outdoors.torchLake}
          imageAlt="Torch Lake Michigan — boats on the sandbar"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="macro-eyebrow mb-2 block">
              {isRo ? "LIBERTATE ÎN AER LIBER" : "OUTDOOR FREEDOM"}
            </span>
            <h2 className="macro-section-title text-white mb-4">
              {isRo ? "America în Natură" : "America in the Wild"}
            </h2>
            <p className="macro-body text-white/70 max-w-3xl leading-relaxed">
              {isRo
                ? "17 milioane de ambarcațiuni, mii de campinguri, milioane de acri de pădure și libertatea de a pleca oricând — vânătoare, pescuit, navigație, drumeție. Accesul la natură nu este un privilegiu; este parte din standardul de viață american."
                : "17 million recreational boats, thousands of campgrounds, millions of acres of public land, and the freedom to go. Hunting, fishing, sailing, hiking — outdoor recreation is not a privilege here; it's part of the baseline standard of living."}
            </p>
          </div>
        </InfrastructureBand>

        {/* Outdoors Photo Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 mt-16">
          <PhotoLightboxGrid
            gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            sizes="(max-width: 768px) 50vw, 25vw"
            photos={[
              { src: SITE_IMAGES.outdoors.fishing, caption: `${isRo ? "Pescuit" : "River Fishing"} · Provo River, Utah`, alt: isRo ? "Pescuit pe râu" : "River Fishing", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.camping, caption: `${isRo ? "Camping" : "Camping"} · Madera Canyon, Arizona`, alt: "Camping", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.rvFamily, caption: `${isRo ? "Vacanță cu RV" : "Family RV Life"} · American Southwest`, alt: isRo ? "Vacanță cu RV" : "Family RV Life", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.sailing, caption: `${isRo ? "Navigație" : "Great Lakes Sailing"} · Chicago to Mackinac`, alt: isRo ? "Navigație" : "Great Lakes Sailing", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.rvGrandCanyon, caption: `${isRo ? "RV la Grand Canyon" : "Grand Canyon RV"} · Grand Canyon, Arizona`, alt: isRo ? "RV la Grand Canyon" : "Grand Canyon RV", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.boating, caption: `${isRo ? "Barcă pe lac" : "Lake Boating"} · Michigan`, alt: isRo ? "Barcă pe lac" : "Lake Boating", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.hunting, caption: `${isRo ? "Vânătoare" : "Hunting"} · Florida`, alt: isRo ? "Vânătoare" : "Hunting", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.baldEagle, caption: `${isRo ? "Vulturul Chel" : "Bald Eagle"} · ${isRo ? "Simbolul libertății americane" : "Symbol of American freedom"}`, alt: isRo ? "Vulturul Chel" : "Bald Eagle", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.boatsDocked, caption: `${isRo ? "Port de agrement" : "Marina Life"} · Marquette, Michigan`, alt: isRo ? "Port de agrement" : "Marina Life", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.rvArizona, caption: `${isRo ? "RV în deșert" : "Desert RV"} · Arizona`, alt: isRo ? "RV în deșert" : "Desert RV", aspect: "1/1" },
              { src: SITE_IMAGES.outdoors.torchLake, caption: `${isRo ? "Torch Lake" : "Torch Lake Sandbar"} · Michigan`, alt: "Torch Lake", aspect: "1/1" },
            ]}
          />
        </section>

        {/* Disposable Income & Giving Section */}
        <section id="comparison" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12">
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              <div>
                <span className="macro-eyebrow mb-4 block">
                  {isRo ? "ANALIZĂ COMPARATIVĂ OCDE" : "OECD COMPARATIVE ANALYSIS"}
                </span>
                <h2 className="macro-section-title text-white text-3xl md:text-4xl mb-6">
                  {copy.incomeTitle}
                </h2>
                <p className="macro-body text-white/70 leading-relaxed mb-6">
                  {copy.incomeParagraph1}
                </p>
                <p className="macro-body text-white/70 leading-relaxed">
                  {copy.incomeParagraph2}
                </p>
              </div>

              <div className="space-y-6">
                {copy.incomeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:border-[#E8B923]/20 transition-all"
                  >
                    <h3 className="font-macro-display text-lg font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed font-body mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/10 pt-3">
                      <span>{item.source}</span>
                      {item.sourceUrl && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E8B923] hover:underline"
                        >
                          {isRo ? "Verifică Sursă →" : "Verify Source →"}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Healthcare Section */}
        <section id="healthcare" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="macro-eyebrow mb-4 block">
              {isRo ? "CALITATE CONTRA COSTURI" : "QUALITY VS. COST"}
            </span>
            <h2 className="macro-section-title text-white text-3xl md:text-4xl mb-6">
              {copy.healthcareTitle}
            </h2>
            <p className="macro-body text-white/65">{copy.healthcareParagraph}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {copy.healthcareItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-between hover:border-[#E8B923]/20 transition-all duration-300"
              >
                <div>
                  <MacroFact
                    fact={item.title}
                    detail={item.description}
                  />
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/30 mt-4">
                  <span>{item.source}</span>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E8B923] hover:underline"
                    >
                      {isRo ? "Sursă →" : "Source →"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cities of America */}
        <section className="mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center font-semibold mb-2">
              {isRo ? "ORAȘELE AMERICII" : "CITIES OF AMERICA"}
            </p>
            <p className="text-center text-white/40 text-sm font-body max-w-xl mx-auto">
              {isRo
                ? "De la coasta la coastă — metropole vibrante, capitalele statelor și orașe de dimensiuni medii prospere."
                : "Coast to coast — vibrant metropolises, state capitals, and thriving mid-size cities that define American urban life."}
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 scrollbar-none" style={{ scrollSnapType: "x mandatory" }}>
            {[
              { src: SITE_IMAGES.cities.atlanta, label: "Atlanta, GA" },
              { src: SITE_IMAGES.cities.chicagoSkyline, label: "Chicago, IL" },
              { src: SITE_IMAGES.cities.nycCentralPark, label: "New York, NY" },
              { src: SITE_IMAGES.cities.austin, label: "Austin, TX" },
              { src: SITE_IMAGES.cities.dallas, label: "Dallas, TX" },
              { src: SITE_IMAGES.cities.seattleNight, label: "Seattle, WA" },
              { src: SITE_IMAGES.cities.nashville, label: "Nashville, TN" },
              { src: SITE_IMAGES.cities.savannah, label: "Savannah, GA" },
              { src: SITE_IMAGES.cities.seattleSpring, label: "Seattle in Spring" },
              { src: SITE_IMAGES.cities.aerialDallas, label: "Dallas — Aerial" },
              { src: SITE_IMAGES.cities.aerialChicago, label: "Chicago — Aerial" },
              { src: SITE_IMAGES.cities.aerialSantaMonica, label: "Santa Monica, CA" },
              { src: SITE_IMAGES.cities.aerialPasadena, label: "Pasadena, CA" },
              { src: SITE_IMAGES.cities.seattleDay, label: "Seattle Skyline" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative shrink-0 w-64 h-44 rounded-2xl overflow-hidden group"
                style={{ scrollSnapAlign: "start" }}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="256px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />
                <p className="absolute bottom-3 left-3 text-white text-xs font-mono font-bold uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* America from Above — featured aerial section */}
        <section className="mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#E8B923] text-center font-semibold mb-2">
              {isRo ? "AMERICA VĂZUTĂ DE SUS" : "AMERICA FROM ABOVE"}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-black text-white text-center mb-4">
              {isRo ? "Metropole la Altitudine" : "Cities at Altitude"}
            </h2>
            <p className="text-center text-white/40 text-sm font-body max-w-xl mx-auto">
              {isRo
                ? "De la 300 de metri înălțime, orașele americane dezvăluie adevărata lor amploare — rețele de oțel și sticlă care adăpostesc inima economică și culturală a națiunii."
                : "From 1,000 feet up, America's great cities reveal their true scale — engineered grids of steel, glass, and water that pulse with the nation's economic and cultural energy."}
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PhotoLightboxGrid
              gridClassName="grid grid-cols-1 md:grid-cols-3 gap-4"
              photos={[
                {
                  src: SITE_IMAGES.cities.chicagoTwilight,
                  alt: "Chicago skyline at twilight with Lake Michigan reflecting the city lights",
                  caption: isRo ? "Chicago la Amurg — Lacul Michigan" : "Chicago at Twilight — Lake Michigan",
                  aspect: "3/2",
                },
                {
                  src: SITE_IMAGES.cities.midtownGolden,
                  alt: "Midtown Manhattan aerial view in golden hour light",
                  caption: isRo ? "Midtown Manhattan — Ora de Aur" : "Midtown Manhattan — Golden Hour",
                  aspect: "3/2",
                },
                {
                  src: SITE_IMAGES.cities.nycTopDown,
                  alt: "New York City Midtown viewed directly from above showing grid pattern",
                  caption: isRo ? "New York City — Vedere de Sus" : "NYC Midtown — Top Down",
                  aspect: "3/2",
                },
              ]}
            />
          </div>
        </section>

        {/* AI Ask America Oracle Section */}
        <div className="mt-16">
          <AskAmericaCTA
            locale={locale}
            descriptionEn={copyEn.oracleDescription}
            descriptionRo={copyRo.oracleDescription}
          />
        </div>
      </div>

      {/* Deep Dive Archive */}
      <DeepDiveSection
        locale={locale}
        topics={VERTICALS_THEMATIC_DATA["quality-of-life"] || []}
        theme={DEEP_DIVE_THEMES["quality-of-life"]}
      />
    </>
  );
}
