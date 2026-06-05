import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getServerLocale } from "@/lib/i18n/server";
import { AskAmericaCTA } from "@/components/interactive/AskAmericaCTA";
import { 
  CheckCircle, 
  Home, 
  Building,
  DollarSign, 
  Flame, 
  Zap, 
  Heart, 
  Award, 
  Navigation, 
  Plane, 
  HeartPulse, 
  Smile, 
  TrendingUp, 
  Users,
  ShoppingBag
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quality of Life | Standard of Living & Abundance",
  description: "Explore the American standard of living: disposable income, housing size, vehicle ownership, home appliances, private giving, and leading healthcare outcomes.",
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
  heroSubtitle: "An empirical look at the everyday purchasing power, living space, household convenience, and health outcomes that define the American middle class.",
  statsTitle: "By the Numbers: Everyday Abundance",
  statsSubtitle: "The baseline metrics of household wealth, housing, energy costs, and progressivity in America.",
  stats: [
    {
      title: "Spacious Living Sizing",
      value: "Double to Triple Housing Space",
      description: "Average home sizes per person in the US are 2-3x larger than in major European countries (like Germany or the UK) and Asian nations (like Japan).",
      source: "World Population Review 2026",
      sourceUrl: "https://worldpopulationreview.com/country-rankings/house-size-by-country"
    },
    {
      title: "Housing Affordability",
      value: "#2 Most Affordable in the World",
      description: "America has the second most affordable housing relative to income globally. Real square footage is 2-4x more affordable than in Europe and 3-6x more than in Asia.",
      source: "Numbeo Property Index 2026",
      sourceUrl: "https://www.numbeo.com/property-investment/rankings_by_country.jsp"
    },
    {
      title: "30-Year Fixed Mortgage",
      value: "Generation-Locked Rates",
      description: "America is the only country where the 30-year fixed-rate mortgage is dominant (~90% of buyers), shielding homeowners from interest-rate payment shocks by transferring risk to capital markets.",
      source: "CNBC / Fannie Mae 2024",
      sourceUrl: "https://www.cnbc.com/2024/05/07/why-the-30-year-fixed-rate-mortgage-is-a-uniquely-american-construct.html"
    },
    {
      title: "OECD Purchasing Power Wages",
      value: "#2 Highest Wages Globally",
      description: "Adjusted for purchasing power parity (PPP), average American wages are the second highest in the OECD, surpassed only by Switzerland.",
      source: "OECD Wage Index 2026",
      sourceUrl: "https://www.numbeo.com/property-investment/rankings_by_country.jsp"
    },
    {
      title: "Lowest Food Spending",
      value: "Lowest share of income spent on food",
      description: "Food is so abundant in America that households spend the lowest percentage of their budgets on groceries in the world, with calorie abundance guaranteed.",
      source: "Our World in Data",
      sourceUrl: "https://ourworldindata.org/grapher/food-expenditure-share-gdp?country=~USA"
    },
    {
      title: "Cheap Utility and Gas Prices",
      value: "Lowest energy costs in developed world",
      description: "Cheap electricity and gas relative to median income make climate control and personal transport a baseline expectation rather than a luxury.",
      source: "Statista & Global Petrol Prices 2026",
      sourceUrl: "https://www.statista.com/statistics/263492/electricity-prices-in-selected-countries/?srsltid=AfmBOooaMdL0ZOo86HqI9lxu6cAlRTI39qMXHC6G-SDfOibp59fhCgnS"
    },
    {
      title: "Highly Progressive Taxes",
      value: "Top 1% pays 40% of income tax",
      description: "The US has the most progressive tax system in the developed world. There is no regressive national sales tax (VAT); the top 1% pays 40% of income tax, while the bottom 50% pays just 3%.",
      source: "Cato Institute & Tax Foundation 2025",
      sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world"
    },
    {
      title: "Retail Infrastructure Density",
      value: "24.5 Sq Ft Per Capita",
      description: "The US has 24.5 sq ft of retail space per person, compared to an average of just 4.5 sq ft in Europe (UK/France: ~5, Germany: 2), creating massive consumer abundance and competition.",
      source: "ASCE Report Card",
      sourceUrl: "https://2021.infrastructurereportcard.org/cat-item/inland-waterways-infrastructure/"
    }
  ],
  luxuryTitle: "Democratized Luxury & Convenience",
  luxurySubtitle: "Everyday household standards and mobility that make life easier and summers manageable.",
  luxuryItems: [
    {
      title: "Living Space & Climate Control (AC)",
      description: "Roughly 90% of US homes are equipped with air conditioning, making sweltering summers entirely manageable. By contrast, only about 10% to 20% of European homes have AC. Affordability of electricity means climate control is a standard expectation, not a luxury.",
      source: "International Energy Agency / Statista",
      sourceUrl: "https://www.statista.com/chart/34786/respondents-who-have-an-air-conditioner/"
    },
    {
      title: "Home Appliances & Convenience",
      description: "Massive multi-door refrigerators, built-in dishwashers, garbage disposals, and full-size in-unit clothes washers and dryers are expected norms even in standard working-class apartments. In Europe, space and energy constraints mean appliances are smaller and dedicated clothes dryers are treated as luxuries.",
      source: "US Energy Information Administration (EIA)",
      sourceUrl: "https://www.eia.gov/consumption/residential/data/2020/"
    },
    {
      title: "Personal Mobility & Road Network",
      description: "With over 800 vehicles per 1,000 people, cheap fuel, and the massive Interstate Highway System, Americans enjoy unmatched personal freedom of movement. This allows for a spacious suburban lifestyle and lets labor remain highly mobile across a continent.",
      source: "List of countries by vehicles per capita",
      sourceUrl: "https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita"
    },
    {
      title: "General Aviation & Personal Sky",
      description: "The US civil aviation fleet has 220,000 registered aircraft — 42% of the global total, dwarfing China (5,366) and Canada (4,888). Over 90% are general aviation (private/business), and over 80% of the 609,000 certified pilots fly GA, landing at over 5,000 public-use airports. Personal mobility in the sky is a utilitarian network for agriculture, medicine, cargo, and business.",
      source: "Aircraft Owners and Pilots Association (AOPA)",
      sourceUrl: "https://download.aopa.org/Media/General-Aviation-Explained-r5.pdf"
    },
    {
      title: "The Cold Chain & Food Logistics",
      description: "A continuous, massive network of refrigerated trucks, warehouses, and retail cases spans the continent. It keeps fresh strawberries, avocados, and seafood available year-round in even the most remote areas at affordable prices, underpinning why Americans spend the lowest share of income on food.",
      source: "Global Cold Chain Alliance (GCCA)",
      sourceUrl: "https://www.iarw.org/"
    }
  ],
  incomeTitle: "Disposable Income & Charitable Giving",
  incomeSubtitle: "How the American middle class compounds wealth and voluntarily supports communities.",
  incomeParagraph1: "The United States consistently has the highest Household Net Adjusted Disposable Income in the OECD. More importantly, when measuring Actual Individual Consumption (AIC)—which details all goods and services actually consumed by households, including those funded by the state—the US stands alone.",
  incomeParagraph2: "Even the poorest US states have higher real consumption levels than major Western European countries like the UK, France, or Germany. This consumer power is matched by a culture of private charity: Americans voluntarily donate a massive percentage of their income to local causes and international aid, consistently ranking at the absolute top of the World Giving Index.",
  incomeItems: [
    {
      title: "OECD Net Adjusted Disposable Income",
      description: "American households lead the developed world in adjusted disposable income, leaving more room for savings, investing, and discretionary spending.",
      source: "OECD Household Disposable Income Database",
      sourceUrl: "https://data.oecd.org/hha/household-disposable-income.htm"
    },
    {
      title: "World Giving Index Supremacy",
      description: "Despite narratives of European state welfare dominance, Americans are the most privately charitable people on Earth, preferring voluntary community support over state bureaucracy.",
      source: "Charities Aid Foundation (CAF) Giving Index",
      sourceUrl: "https://www.cafonline.org/about-us/research/caf-world-giving-index"
    }
  ],
  healthcareTitle: "Healthcare Quality: Focus on Outcomes",
  healthcareSubtitle: "Catching conditions earlier and leading in survival rates.",
  healthcareParagraph: "The reflexive critique is that America 'spends more and gets less'—but this collapses when shifting from input spending metrics to actual treatment outcomes. For the diseases that claim lives in large numbers, the United States leads the developed world in 5-year survival rates.",
  healthcareItems: [
    {
      title: "Leading Cancer Survival Rates",
      description: "Breast cancer, prostate cancer, colorectal cancer, and leukemia all show American patients outperforming their counterparts in single-payer European systems due to faster access to cutting-edge treatments.",
      source: "OECD Health at a Glance 2023",
      sourceUrl: "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html"
    },
    {
      title: "Diagnostic Equipment Density",
      description: "The US has more MRI and CT scanners per capita than virtually any other OECD nation. Conditions are caught earlier, and patients avoid the bureaucratic waiting queues common in state-managed European gateways.",
      source: "OECD Diagnostic Databases 2023",
      sourceUrl: "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html"
    },
    {
      title: "Contextualizing Life Expectancy Stats",
      description: "The oft-cited life expectancy gap is almost entirely explained by lifestyle factors—obesity, vehicular accidents, and violent crime—rather than the quality of medical delivery itself. When it comes to treatment, the quality of care remains unmatched.",
      source: "COSM Study / AEI Research",
      sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
    }
  ],
  oracleDescription: "Ask the AI Oracle about purchasing power parity, average home sizing, car ownership statistics, healthcare survival rates, or the democratization of luxury."
};

const copyRo: QualityOfLifeCopy = {
  breadcrumb: "Calitatea Vieții",
  heroTagline: "STANDARDUL ABUNDENȚEI",
  heroTitle: "Cel Mai Înalt Nivel de Trai pentru Cei Mai Mulți Oameni",
  heroSubtitle: "O analiză empirică a puterii de cumpărare zilnice, spațiului de locuit, confortului casnic și rezultatelor medicale care definesc clasa de mijloc americană.",
  statsTitle: "Abundența în Cifre",
  statsSubtitle: "Indicatorii de bază ai bogăției gospodăriilor, locuințelor, costurilor cu energia și impozitării din America.",
  stats: [
    {
      title: "Dimensiunea Locuințelor",
      value: "Spațiu Locativ Dublu sau Triplu",
      description: "Dimensiunea medie a locuințelor per persoană în SUA este de 2-3 ori mai mare decât în marile țări europene (precum Germania sau Marea Britanie) și asiatice (cum ar fi Japonia).",
      source: "World Population Review 2026",
      sourceUrl: "https://worldpopulationreview.com/country-rankings/house-size-by-country"
    },
    {
      title: "Accesibilitatea Locuințelor",
      value: "#2 Cele Mai Accesibile Locuințe",
      description: "America are cele mai accesibile locuințe în raport cu venitul din lume, după o singură țară. Suprafața reală pe metru pătrat este de 2-4 ori mai accesibilă decât în Europa și de 3-6 ori mai accesibilă decât în Asia.",
      source: "Numbeo Property Index 2026",
      sourceUrl: "https://www.numbeo.com/property-investment/rankings_by_country.jsp"
    },
    {
      title: "Ipoteca Fixă pe 30 de Ani",
      value: "Dobânzi Blocate pe o Generație",
      description: "SUA sunt singura țară din lume unde creditul ipotecar cu rată fixă pe 30 de ani este dominant (~90% din cumpărători), protejând proprietarii de șocurile dobânzilor prin transferul riscului către piețele de capital.",
      source: "CNBC / Fannie Mae 2024",
      sourceUrl: "https://www.cnbc.com/2024/05/07/why-the-30-year-fixed-rate-mortgage-is-a-uniquely-american-construct.html"
    },
    {
      title: "Salarii OCDE (Ajustate la PPP)",
      value: "#2 Cele Mai Mari Salarii din Lume",
      description: "Ajustat la paritatea puterii de cumpărare (PPP), salariul mediu american este al doilea cel mai mare din OCDE, fiind depășit doar de cel din Elveția.",
      source: "OECD Wage Index 2026",
      sourceUrl: "https://www.numbeo.com/property-investment/rankings_by_country.jsp"
    },
    {
      title: "Cheltuieli Reduse pe Alimente",
      value: "Cea mai mică cotă de cheltuială pe hrană",
      description: "Mâncarea este atât de abundentă în America încât gospodăriile cheltuiesc cel mai mic procent din bugetul lor pe alimente din lume, având o disponibilitate calorică garantată.",
      source: "Our World in Data",
      sourceUrl: "https://ourworldindata.org/grapher/food-expenditure-share-gdp?country=~USA"
    },
    {
      title: "Utilități și Carburant Ieftin",
      value: "Cele mai mici costuri energetice din G7",
      description: "Prețurile scăzute la electricitate și benzină în raport cu venitul mediu fac din aerul condiționat și transportul personal un standard minim, nu un lux.",
      source: "Statista & Global Petrol Prices 2026",
      sourceUrl: "https://www.statista.com/statistics/263492/electricity-prices-in-selected-countries/?srsltid=AfmBOooaMdL0ZOo86HqI9lxu6cAlRTI39qMXHC6G-SDfOibp59fhCgnS"
    },
    {
      title: "Impozitare Progresivă",
      value: "Primii 1% plătesc 40% din taxe",
      description: "SUA au cel mai progresiv sistem fiscal din lumea dezvoltată. Nu există TVA națională regresivă; primii 1% din contribuabili suportă 40% din totalul impozitului pe venit, în timp ce jumătatea inferioară plătește doar 3%.",
      source: "Cato Institute & Tax Foundation 2025",
      sourceUrl: "https://www.cato.org/blog/united-states-has-most-progressive-tax-system-developed-world"
    },
    {
      title: "Densitatea Spațiilor Comerciale",
      value: "2,3 mp per persoană (24,5 sq ft)",
      description: "SUA au 2,3 mp de spațiu comercial per locuitor, comparativ cu o medie de doar 0,4 mp în Europa (Marea Britanie/Franța: ~0,5 mp, Germania: 0,2 mp), oferind o abundență și o comoditate uriașă pentru consumatori.",
      source: "ASCE Report Card",
      sourceUrl: "https://2021.infrastructurereportcard.org/cat-item/inland-waterways-infrastructure/"
    }
  ],
  luxuryTitle: "Lux Democratizat și Utilitate Zilnică",
  luxurySubtitle: "Dotările casnice standard și mobilitatea care simplifică viața cotidiană și fac verile suportabile.",
  luxuryItems: [
    {
      title: "Climatizare și Spațiu Locativ (AC)",
      description: "Aproape 90% din locuințele din SUA au aer condiționat, facilitând confortul în timpul verii. În contrast, doar 10% până la 20% din locuințele europene au AC. Datorită prețului accesibil al electricității, climatizarea este privită ca un standard de bază.",
      source: "Agenția Internațională a Energiei / Statista",
      sourceUrl: "https://www.statista.com/chart/34786/respondents-who-have-an-air-conditioner/"
    },
    {
      title: "Electrocasnice și Conveniență",
      description: "Frigiderele masive cu uși multiple, mașinile de spălat vase încorporate, tocătoarele de resturi la chiuvetă și mașinile de spălat și uscat rufe în unitate sunt norme așteptate chiar și în apartamentele de clasă muncitoare. În Europa, din cauza spațiului, frigiderele sunt adesea la jumătatea dimensiunii, iar uscătoarele sunt considerate un lux.",
      source: "U.S. Energy Information Administration (EIA)",
      sourceUrl: "https://www.eia.gov/consumption/residential/data/2020/"
    },
    {
      title: "Mobilitatea Personală și Auto",
      description: "Cu peste 800 de vehicule la 1.000 de locuitori, combustibil ieftin și rețeaua masivă de autostrăzi interstatale, americanii beneficiază de o libertate de mișcare inegalabilă. Aceasta permite un stil de viață suburban spațios și o mobilitate extrem de mare a forței de muncă.",
      source: "List of countries by vehicles per capita",
      sourceUrl: "https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita"
    },
    {
      title: "Aviația Generală și Cerul Privat",
      description: "Flota de aviație civilă din SUA numără 220.000 de aeronave înregistrate — 42% din flota globală, depășind masiv China (5.366) și Canada (4.888). Peste 90% sunt aeronave de aviație generală (private/de afaceri) și peste 80% dintre cei 609.000 de piloți autorizați zboară în această categorie, având acces la peste 5.000 de aeroporturi publice.",
      source: "Aircraft Owners and Pilots Association (AOPA)",
      sourceUrl: "https://download.aopa.org/Media/General-Aviation-Explained-r5.pdf"
    },
    {
      title: "Lanțul Frigorific și Logistica Alimentară",
      description: "O rețea continuă și masivă de camioane, depozite și vitrine frigorifice acoperă întregul continent. Aceasta permite ca căpșunile proaspete, avocado și fructele de mare să fie accesibile tot anul în orice oraș izolat la prețuri mici, fiind baza pentru care americanii cheltuiesc cea mai mică pondere din venit pe hrană.",
      source: "Global Cold Chain Alliance (GCCA)",
      sourceUrl: "https://www.iarw.org/"
    }
  ],
  incomeTitle: "Venit Disponibil și Generozitate Privată",
  incomeSubtitle: "Cum își consolidează averea clasa de mijloc și cum susține comunitățile.",
  incomeParagraph1: "Statele Unite au constant cel mai mare Venit Disponibil Net Ajustat al Gospodăriilor din OCDE. Mai important, în ceea ce privește Consumul Individual Real (AIC) — care măsoară toate bunurile și serviciile consumate efectiv de gospodării — SUA este fără rival.",
  incomeParagraph2: "Chiar și cele mai sărace state din SUA au niveluri de consum real mai mari decât țări din Europa de Vest precum Marea Britanie, Franța sau Germania. Această putere de cumpărare este dublată de o cultură puternică a filantropiei: americanii donează voluntar un procent mare din venit către asociații locale, biserici și ajutor global, ocupând prima poziție în World Giving Index.",
  incomeItems: [
    {
      title: "Venitul Disponibil Net Ajustat OCDE",
      description: "Gospodăriile americane conduc lumea dezvoltată în ceea ce privește venitul disponibil rămas, oferind oportunități majore pentru economisire și investiții.",
      source: "OECD Household Disposable Income Database",
      sourceUrl: "https://data.oecd.org/hha/household-disposable-income.htm"
    },
    {
      title: "Generozitatea Privată (Giving Index)",
      description: "În ciuda modelului european bazat pe asistență socială de stat, americanii preferă generozitatea privată și voluntariatul pentru a rezolva problemele comunitare rapid, fără birocrație statală.",
      source: "Charities Aid Foundation (CAF) Giving Index",
      sourceUrl: "https://www.cafonline.org/about-us/research/caf-world-giving-index"
    }
  ],
  healthcareTitle: "Calitatea Sănătății: Accent pe Rezultate",
  healthcareSubtitle: "Descoperirea timpurie a bolilor și supraviețuirea peste media globală.",
  healthcareParagraph: "Critica clasică conform căreia America 'cheltuiește cel mai mult și obține cel mai puțin' se prăbușește când trecem de la costuri la rezultatele terapeutice reale. Pentru bolile majore care curmă cele mai multe vieți, SUA conduce lumea dezvoltată în ratele de supraviețuire la 5 ani.",
  healthcareItems: [
    {
      title: "Supraviețuirea în Oncologie",
      description: "Cancerul de sân, prostată, colon și leucemia au rate de supraviețuire la 5 ani mult superioare în SUA comparativ cu sistemele cu plătitor unic din Europa, mulțumită accesului rapid la molecule noi.",
      source: "OECD Health at a Glance 2023",
      sourceUrl: "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html"
    },
    {
      title: "Densitatea Echipamentelor de Diagnostic",
      description: "SUA are cele mai multe aparate RMN și CT per capita din OCDE. Investigațiile se fac prompt, evitându-se listele lungi de așteptare impuse de sistemele birocratice din Europa.",
      source: "OECD Diagnostic Databases 2023",
      sourceUrl: "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en.html"
    },
    {
      title: "Contextul Speranței de Viață",
      description: "Diferențele statistice la speranța de viață generală țin de comportamente (obezitate, accidente rutiere, arme), nu de calitatea actului medical. Când o persoană se îmbolnăvește și are nevoie de tratament, calitatea îngrijirii din SUA rămâne de top.",
      source: "COSM Study / AEI Research",
      sourceUrl: "https://cosm.aei.org/is-the-us-really-an-outlier-on-pregnancy-deaths-and-have-such-deaths-spiked/"
    }
  ],
  oracleDescription: "Întreabă Oracolul AI despre paritatea puterii de cumpărare, dimensiunea medie a locuințelor, statistici privind proprietatea auto, ratele de supraviețuire medicală sau democratizarea luxului."
};


export default async function QualityOfLifePage() {
  const locale = await getServerLocale();
  const isRo = locale === "ro";
  const copy = isRo ? copyRo : copyEn;

  return (
    <main className="min-h-screen bg-navy-dark pt-24 text-white font-body selection:bg-glory-gold selection:text-navy-dark">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: copy.breadcrumb }]} className="mb-8" />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-navy-dark via-navy-mid to-navy-dark relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-star-pattern opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-glory-gold mb-4 block">
            {copy.heroTagline}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {copy.heroTitle}
          </h1>
          <p className="font-body text-white/70 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {copy.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Stat Grid Section */}
      <section
        id="stats"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center lg:text-left mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              {copy.statsTitle}
            </h2>
            <p className="font-body text-white/50 text-base max-w-2xl">
              {copy.statsSubtitle}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {copy.stats.map((stat, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col justify-between hover:border-glory-gold/40 hover:bg-white/8 transition-all duration-300 shadow-card hover:shadow-card-hover group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {idx === 0 && <Home className="h-6 w-6 text-glory-gold" />}
                    {idx === 1 && <Home className="h-6 w-6 text-glory-gold" />}
                    {idx === 2 && <Building className="h-6 w-6 text-glory-gold" />}
                    {idx === 3 && <DollarSign className="h-6 w-6 text-glory-gold" />}
                    {idx === 4 && <Smile className="h-6 w-6 text-glory-gold" />}
                    {idx === 5 && <Flame className="h-6 w-6 text-glory-gold" />}
                    {idx === 6 && <Zap className="h-6 w-6 text-glory-gold" />}
                    {idx === 7 && <ShoppingBag className="h-6 w-6 text-glory-gold" />}
                    <h3 className="font-display text-lg font-bold text-white">
                      {stat.title}
                    </h3>
                  </div>
                  <p className="font-hero text-3xl text-glory-gold tracking-wider mb-4 leading-none uppercase">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed mb-6 font-body">
                    {stat.description}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/40">
                  <span>{stat.source}</span>
                  {stat.sourceUrl && (
                    <a 
                      href={stat.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-glory-gold hover:underline"
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

      {/* Democratized Luxury/Abundance Section */}
      <section
        id="luxury"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-r from-navy-dark via-navy-mid to-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              {copy.luxuryTitle}
            </h2>
            <p className="font-body text-white/50 text-base max-w-2xl mx-auto">
              {copy.luxurySubtitle}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {copy.luxuryItems.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-white/10 bg-white/3 p-8 flex flex-col justify-between hover:border-glory-gold/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-glory-gold/10 text-glory-gold font-hero text-xl">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base text-white/70 leading-relaxed font-body mb-8">
                    {item.description}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/40">
                  <span>{item.source}</span>
                  {item.sourceUrl && (
                    <a 
                      href={item.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-glory-gold hover:underline"
                    >
                      {isRo ? "Date →" : "Data →"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disposable Income & Consumption / Giving Section */}
      <section
        id="comparison"
        className="scroll-mt-24 border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8 bg-navy-dark"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-glory-gold mb-3 block">
                {isRo ? "ANALIZĂ COMPARATIVĂ OCDE" : "OECD COMPARATIVE ANALYSIS"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
                {copy.incomeTitle}
              </h2>
              <p className="font-body text-white/70 text-lg leading-relaxed mb-6">
                {copy.incomeParagraph1}
              </p>
              <p className="font-body text-white/70 text-lg leading-relaxed mb-8">
                {copy.incomeParagraph2}
              </p>
            </div>

            <div className="space-y-6">
              {copy.incomeItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-glory-gold/25 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {idx === 0 ? <TrendingUp className="h-5 w-5 text-glory-gold" /> : <Users className="h-5 w-5 text-glory-gold" />}
                    <h3 className="font-display text-lg font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed font-body mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/10 pt-3">
                    <span>{item.source}</span>
                    {item.sourceUrl && (
                      <a 
                        href={item.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-glory-gold hover:underline"
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

      {/* Healthcare Outcomes Section */}
      <section
        id="healthcare"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 pb-24 bg-gradient-to-b from-navy-dark to-navy-mid"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-glory-gold mb-3 block">
              {isRo ? "CALITATE CONTRA COSTURI" : "QUALITY VS. COST"}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
              {copy.healthcareTitle}
            </h2>
            <p className="font-body text-white/65 text-lg leading-relaxed">
              {copy.healthcareParagraph}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {copy.healthcareItems.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-white/10 bg-navy-dark p-6 flex flex-col justify-between hover:border-glory-gold/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <HeartPulse className="h-6 w-6 text-glory-gold" />
                    <h3 className="font-display text-lg font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed font-body mb-6">
                    {item.description}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/40">
                  <span>{item.source}</span>
                  {item.sourceUrl && (
                    <a 
                      href={item.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-glory-gold hover:underline"
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

      {/* AI Ask America Oracle Section */}
      <AskAmericaCTA
        locale={locale}
        descriptionEn={copyEn.oracleDescription}
        descriptionRo={copyRo.oracleDescription}
      />
    </main>
  );
}
