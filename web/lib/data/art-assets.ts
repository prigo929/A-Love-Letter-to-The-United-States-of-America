// ─── Art & Architecture: local imagery ──────────────────────────────────────
// All imagery for art & architecture is stored locally in /IMAGES/Architecture and /IMAGES/Art.
// High resolution local files verified for building history & visual culture.

// Architecture assets
import flatiron from "@/IMAGES/Architecture/Flatiron_Building.jpg";
import woolworth from "@/IMAGES/Architecture/The_Woolworth_Building_in_New_York_City.jpg";
import chrysler from "@/IMAGES/Architecture/Chrysler_Building.jpg";
import empireState from "@/IMAGES/Architecture/Empire_State_Building.jpg";
import viewOfEmpireStateBuilding from "@/IMAGES/Architecture/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City.jpg";
import seagram from "@/IMAGES/Architecture/Seagram_Building.jpg";
import willisTower from "@/IMAGES/Architecture/Willis-Tower-Chicago.jpg";
import homeInsurance from "@/IMAGES/Architecture/Home_Insurance_Building.jpg";
import chicagoLoop from "@/IMAGES/Architecture/Chicago_Loop.jpg";
import sullivanWainwright from "@/IMAGES/Architecture/Wainwright_Building.jpg";
import smithsonianCastle from "@/IMAGES/Architecture/Smithsonian_Castle.jpg";
import coleOxbow from "@/IMAGES/Architecture/Cole_The_Oxbow.jpg";
import churchNiagara from "@/IMAGES/Architecture/Church_Niagara.jpg";
import oneWTC from "@/IMAGES/Architecture/One_World_Trade_Center,_Financial_District,_Manhattan,_New_York.jpg";
import oneVanderbilt from "@/IMAGES/Architecture/One_Vanderbilt_April_2021.jpg";
import centralParkTower from "@/IMAGES/Architecture/Central_Park_Tower_April_2021.jpg";
import st57West from "@/IMAGES/Architecture/111_West_57th_Street.png";
import park270 from "@/IMAGES/Architecture/270 Park Avenue.jpg";
import park432 from "@/IMAGES/Architecture/432_Park_Avenue,_NY_(cropped).jpg";
import boaTower from "@/IMAGES/Architecture/BoA_Tower.jpg";
import hudsonYards from "@/IMAGES/Architecture/Hudson_Yards_from_Hudson_Commons_(95131p)_(30_Hudson_Yards).jpg";
import trumpTower from "@/IMAGES/Architecture/Trump International Hotel and Tower.jpg";
import eiffelTower from "@/IMAGES/Architecture/Tour_Eiffel_Wikimedia_Commons.jpg";

// Art assets
import bierstadtYosemite from "@/IMAGES/Art/Albert Bierstadt - Valley of the Yosemite - 1864.jpg";
import bierstadtSierra from "@/IMAGES/Art/Bierstadt - Among the Sierra Nevada Mountains - 1868.jpg";
import pollockConvergence from "@/IMAGES/Art/Convergence by Jackson Pollock 1952.jpeg";
import lichtensteinWhaam from "@/IMAGES/Art/Whaam! by Roy Lichtenstein.png";
import StuartWashington from "@/IMAGES/Art/Gilbert_Stuart_1796_portrait_of_Washington.jpg";
import leutzeWashington from "@/IMAGES/Art/Washington_Crossing_the_Delaware_by_Emanuel_Leutze,_MMA-NYC,_1851.jpg";
// Hudson River School (added)
import durandKindredSpirits from "@/IMAGES/Art/Durand - Kindred Spirits - 1849.jpg";
import coleConsummation from "@/IMAGES/Art/Cole - Course of Empire Consummation - 1836.jpg";
import coleVoyage from "@/IMAGES/Art/Cole - Voyage of Life Youth - 1842.jpg";
import churchAndes from "@/IMAGES/Art/Church - Heart of the Andes - 1859.jpg";
import churchEcuador from "@/IMAGES/Art/Church - Andes of Ecuador - 1855.jpg";
import moranYellowstone from "@/IMAGES/Art/Moran - Grand Canyon of the Yellowstone - 1872.jpg";
import kensettLakeGeorge from "@/IMAGES/Art/Kensett - Lake George - 1869.jpg";
import bierstadtLandersPeak from "@/IMAGES/Art/Bierstadt - Rocky Mountains Landers Peak - 1863.jpg";
// Modern & Pop Art (added)
import rothkoOrangeRedYellow from "@/IMAGES/Art/Rothko - Orange Red Yellow - 1961.jpg";
import deKooningWomanI from "@/IMAGES/Art/de Kooning - Woman I - 1952.jpg";
import warholSoupCans from "@/IMAGES/Art/Warhol - Campbells Soup Cans - 1962.jpg";
import johnsFlag from "@/IMAGES/Art/Jasper Johns - Flag - 1955.jpg";
import woodAmericanGothic from "@/IMAGES/Art/Grant Wood - American Gothic - 1930.jpg";
import hopperNighthawks from "@/IMAGES/Art/Hopper - Nighthawks - 1942.jpg";
import wesselmannStillLife from "@/IMAGES/Art/Wesselmann - Still Life 35 - 1963.jpg";

export interface ArtAsset {
  src: string;
  alt: string;
  altRo: string;
  credit: string;
  license: string;
}

export const ART_ASSETS = {
  flatiron: {
    src: flatiron.src,
    alt: "The Flatiron Building, New York, 1902",
    altRo: "Flatiron Building, New York, 1902",
    credit: "Flatiron_Building.jpg · Local Asset",
    license: "Public domain",
  },
  woolworth: {
    src: woolworth.src,
    alt: "The Woolworth Building, the 'Cathedral of Commerce', 1913",
    altRo: "Woolworth Building, 1913",
    credit: "The_Woolworth_Building_in_New_York_City.jpg · Local Asset",
    license: "Public domain",
  },
  chrysler: {
    src: chrysler.src,
    alt: "The Chrysler Building's Art Deco crown, 1930",
    altRo: "Coroana Art Deco a Chrysler Building, 1930",
    credit: "Chrysler_Building.jpg · Local Asset",
    license: "Public domain",
  },
  empireState: {
    src: empireState.src,
    alt: "The Empire State Building, 1931",
    altRo: "Empire State Building, 1931",
    credit: "Empire_State_Building.jpg · Local Asset",
    license: "Public domain",
  },
  empireStateRockefeller: {
    src: viewOfEmpireStateBuilding.src,
    alt: "View of Empire State Building from Rockefeller Center, New York City",
    altRo: "Vedere a Empire State Building de la Centrul Rockefeller, New York City",
    credit: "View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City.jpg · Local Asset",
    license: "Public domain",
  },
  seagram: {
    src: seagram.src,
    alt: "The Seagram Building, Mies van der Rohe, 1958",
    altRo: "Seagram Building, Mies van der Rohe, 1958",
    credit: "Seagram_Building.jpg · Local Asset",
    license: "CC BY 2.0",
  },
  willisTower: {
    src: willisTower.src,
    alt: "The Willis (Sears) Tower, Chicago, 1973",
    altRo: "Willis (Sears) Tower, Chicago, 1973",
    credit: "Willis-Tower-Chicago.jpg · Local Asset",
    license: "CC BY 2.0",
  },
  homeInsurance: {
    src: homeInsurance.src,
    alt: "The Home Insurance Building, Chicago, 1885: the first skyscraper",
    altRo: "Home Insurance Building, Chicago, 1885",
    credit: "Home_Insurance_Building.jpg · Local Asset",
    license: "Public domain",
  },
  chicagoLoop: {
    src: chicagoLoop.src,
    alt: "The Chicago Loop skyline",
    altRo: "Silueta cartierului Loop din Chicago",
    credit: "Chicago_Loop.jpg · Local Asset",
    license: "CC BY 2.0",
  },
  sullivanWainwright: {
    src: sullivanWainwright.src,
    alt: "The Wainwright Building, Louis Sullivan, 1891",
    altRo: "Wainwright Building, Louis Sullivan, 1891",
    credit: "Wainwright_Building.jpg · Local Asset",
    license: "Public domain",
  },
  smithsonianCastle: {
    src: smithsonianCastle.src,
    alt: "The Smithsonian Institution Building, the 'Castle'",
    altRo: "Clădirea Smithsonian, „Castelul”",
    credit: "Smithsonian_Castle.jpg · Local Asset",
    license: "CC BY-SA 3.0",
  },
  coleOxbow: {
    src: coleOxbow.src,
    alt: "The Oxbow, Thomas Cole, 1836: Hudson River School",
    altRo: "The Oxbow, Thomas Cole, 1836",
    credit: "Cole_The_Oxbow.jpg · Local Asset",
    license: "Public domain",
  },
  churchNiagara: {
    src: churchNiagara.src,
    alt: "Niagara, Frederic Edwin Church, 1857",
    altRo: "Niagara, Frederic Edwin Church, 1857",
    credit: "Church_Niagara.jpg · Local Asset",
    license: "CC BY-SA 3.0",
  },
  oneWTC: {
    src: oneWTC.src,
    alt: "One World Trade Center, 2013",
    altRo: "One World Trade Center, 2013",
    credit: "One_World_Trade_Center.jpg · Local Asset",
    license: "CC BY-SA 4.0",
  },
  oneVanderbilt: {
    src: oneVanderbilt.src,
    alt: "One Vanderbilt Tower, Midtown Manhattan, 2021",
    altRo: "Turnul One Vanderbilt, Midtown Manhattan, 2021",
    credit: "One_Vanderbilt_April_2021.jpg · Local Asset",
    license: "CC BY-SA 4.0",
  },
  centralParkTower: {
    src: centralParkTower.src,
    alt: "Central Park Tower, World's Tallest Residential Building, 2021",
    altRo: "Central Park Tower, Cea mai înaltă clădire rezidențială din lume, 2021",
    credit: "Central_Park_Tower_April_2021.jpg · Local Asset",
    license: "CC BY-SA 4.0",
  },
  st57West: {
    src: st57West.src,
    alt: "111 West 57th Street (Steinway Tower), Midtown Manhattan",
    altRo: "111 West 57th Street (Steinway Tower), Midtown Manhattan",
    credit: "111_West_57th_Street.png · Local Asset",
    license: "Public domain",
  },
  park270: {
    src: park270.src,
    alt: "270 Park Avenue (JPMorgan Chase Headquarters), Manhattan",
    altRo: "270 Park Avenue (Sediul JPMorgan Chase), Manhattan",
    credit: "270 Park Avenue.jpg · Local Asset",
    license: "CC BY-SA 4.0",
  },
  park432: {
    src: park432.src,
    alt: "432 Park Avenue, Midtown Manhattan Supertall",
    altRo: "432 Park Avenue, Supraturn în Midtown Manhattan",
    credit: "432_Park_Avenue.jpg · Local Asset",
    license: "CC BY-SA 4.0",
  },
  boaTower: {
    src: boaTower.src,
    alt: "Bank of America Tower at One Bryant Park, New York",
    altRo: "Bank of America Tower la One Bryant Park, New York",
    credit: "BoA_Tower.jpg · Local Asset",
    license: "CC BY-SA 4.0",
  },
  hudsonYards: {
    src: hudsonYards.src,
    alt: "30 Hudson Yards and the Hudson Yards Skyline",
    altRo: "30 Hudson Yards și silueta Hudson Yards",
    credit: "Hudson_Yards.jpg · Local Asset",
    license: "CC BY-SA 4.0",
  },
  trumpTower: {
    src: trumpTower.src,
    alt: "Trump International Hotel and Tower, Chicago",
    altRo: "Trump International Hotel and Tower, Chicago",
    credit: "Trump_Tower_Chicago.jpg · Local Asset",
    license: "CC BY-SA 4.0",
  },
  bierstadtYosemite: {
    src: bierstadtYosemite.src,
    alt: "Valley of the Yosemite, Albert Bierstadt, 1864",
    altRo: "Valea Yosemite, Albert Bierstadt, 1864",
    credit: "Albert Bierstadt - Valley of the Yosemite - 1864.jpg · Local Asset",
    license: "Public domain",
  },
  bierstadtSierra: {
    src: bierstadtSierra.src,
    alt: "Among the Sierra Nevada Mountains, Albert Bierstadt, 1868",
    altRo: "În munții Sierra Nevada, Albert Bierstadt, 1868",
    credit: "Bierstadt - Among the Sierra Nevada Mountains - 1868.jpg · Local Asset",
    license: "Public domain",
  },
  pollockConvergence: {
    src: pollockConvergence.src,
    alt: "Convergence, Jackson Pollock, 1952: Abstract Expressionism",
    altRo: "Convergence, Jackson Pollock, 1952: Expresionism Abstract",
    credit: "Convergence by Jackson Pollock 1952.jpeg · Local Asset",
    license: "Fair use / Fine art archive",
  },
  lichtensteinWhaam: {
    src: lichtensteinWhaam.src,
    alt: "Whaam!, Roy Lichtenstein, 1963: American Pop Art",
    altRo: "Whaam!, Roy Lichtenstein, 1963: Pop Art American",
    credit: "Whaam! by Roy Lichtenstein.png · Local Asset",
    license: "Fair use / Fine art archive",
  },
  stuartWashington: {
    src: StuartWashington.src,
    alt: "George Washington (The Lansdowne Portrait), Gilbert Stuart, 1796",
    altRo: "George Washington (Portretul Lansdowne), Gilbert Stuart, 1796",
    credit: "Gilbert_Stuart_1796_portrait_of_Washington.jpg · Local Asset",
    license: "Public domain",
  },
  leutzeWashington: {
    src: leutzeWashington.src,
    alt: "Washington Crossing the Delaware, Emanuel Leutze, 1851",
    altRo: "Washington traversând Râul Delaware, Emanuel Leutze, 1851",
    credit: "Washington_Crossing_the_Delaware.jpg · Local Asset",
    license: "Public domain",
  },
  eiffelTower: {
    src: eiffelTower.src,
    alt: "Eiffel Tower, Paris (1889)",
    altRo: "Turnul Eiffel, Paris (1889)",
    credit: "Tour_Eiffel_Wikimedia_Commons.jpg · Local Asset",
    license: "Public domain",
  },
  durandKindredSpirits: {
    src: durandKindredSpirits.src,
    alt: "Kindred Spirits, Asher B. Durand, 1849: Thomas Cole and William Cullen Bryant in the Catskills",
    altRo: "Kindred Spirits, Asher B. Durand, 1849: Thomas Cole și William Cullen Bryant în Munții Catskill",
    credit: "Durand - Kindred Spirits - 1849.jpg · Local Asset",
    license: "Public domain",
  },
  coleConsummation: {
    src: coleConsummation.src,
    alt: "The Course of Empire: The Consummation of Empire, Thomas Cole, 1836",
    altRo: "Cursul Imperiului: Împlinirea Imperiului, Thomas Cole, 1836",
    credit: "Cole - Course of Empire Consummation - 1836.jpg · Local Asset",
    license: "Public domain",
  },
  coleVoyage: {
    src: coleVoyage.src,
    alt: "The Voyage of Life: Youth, Thomas Cole, 1842",
    altRo: "Călătoria Vieții: Tinerețea, Thomas Cole, 1842",
    credit: "Cole - Voyage of Life Youth - 1842.jpg · Local Asset",
    license: "Public domain",
  },
  churchAndes: {
    src: churchAndes.src,
    alt: "The Heart of the Andes, Frederic Edwin Church, 1859",
    altRo: "Inima Anzilor, Frederic Edwin Church, 1859",
    credit: "Church - Heart of the Andes - 1859.jpg · Local Asset",
    license: "Public domain",
  },
  churchEcuador: {
    src: churchEcuador.src,
    alt: "The Andes of Ecuador, Frederic Edwin Church, 1855",
    altRo: "Anzii Ecuadorului, Frederic Edwin Church, 1855",
    credit: "Church - Andes of Ecuador - 1855.jpg · Local Asset",
    license: "Public domain",
  },
  moranYellowstone: {
    src: moranYellowstone.src,
    alt: "The Grand Canyon of the Yellowstone, Thomas Moran, 1872",
    altRo: "Marele Canion al Yellowstone, Thomas Moran, 1872",
    credit: "Moran - Grand Canyon of the Yellowstone - 1872.jpg · Local Asset",
    license: "Public domain",
  },
  kensettLakeGeorge: {
    src: kensettLakeGeorge.src,
    alt: "Lake George, John Frederick Kensett, 1869: Luminism",
    altRo: "Lacul George, John Frederick Kensett, 1869: Luminism",
    credit: "Kensett - Lake George - 1869.jpg · Local Asset",
    license: "Public domain",
  },
  bierstadtLandersPeak: {
    src: bierstadtLandersPeak.src,
    alt: "The Rocky Mountains, Lander's Peak, Albert Bierstadt, 1863",
    altRo: "Munții Stâncoși, Vârful Lander, Albert Bierstadt, 1863",
    credit: "Bierstadt - Rocky Mountains Landers Peak - 1863.jpg · Local Asset",
    license: "Public domain",
  },
  rothkoOrangeRedYellow: {
    src: rothkoOrangeRedYellow.src,
    alt: "Orange, Red, Yellow, Mark Rothko, 1961: Color Field",
    altRo: "Orange, Red, Yellow, Mark Rothko, 1961: Color Field",
    credit: "Rothko - Orange Red Yellow - 1961.jpg · Local Asset",
    license: "Educational use",
  },
  deKooningWomanI: {
    src: deKooningWomanI.src,
    alt: "Woman I, Willem de Kooning, 1952: Abstract Expressionism",
    altRo: "Woman I, Willem de Kooning, 1952: Expresionism Abstract",
    credit: "de Kooning - Woman I - 1952.jpg · Local Asset",
    license: "Educational use",
  },
  warholSoupCans: {
    src: warholSoupCans.src,
    alt: "Campbell's Soup Cans, Andy Warhol, 1962: American Pop Art",
    altRo: "Campbell's Soup Cans, Andy Warhol, 1962: Pop Art American",
    credit: "Warhol - Campbells Soup Cans - 1962.jpg · Local Asset",
    license: "Educational use",
  },
  johnsFlag: {
    src: johnsFlag.src,
    alt: "Flag, Jasper Johns, 1954-55",
    altRo: "Flag, Jasper Johns, 1954-55",
    credit: "Jasper Johns - Flag - 1955.jpg · Local Asset",
    license: "Educational use",
  },
  woodAmericanGothic: {
    src: woodAmericanGothic.src,
    alt: "American Gothic, Grant Wood, 1930: Regionalism",
    altRo: "American Gothic, Grant Wood, 1930: Regionalism",
    credit: "Grant Wood - American Gothic - 1930.jpg · Local Asset",
    license: "Educational use",
  },
  hopperNighthawks: {
    src: hopperNighthawks.src,
    alt: "Nighthawks, Edward Hopper, 1942: American Realism",
    altRo: "Nighthawks, Edward Hopper, 1942: Realism American",
    credit: "Hopper - Nighthawks - 1942.jpg · Local Asset",
    license: "Educational use",
  },
  wesselmannStillLife: {
    src: wesselmannStillLife.src,
    alt: "Still Life #35, Tom Wesselmann, 1963: American Pop Art",
    altRo: "Still Life #35, Tom Wesselmann, 1963: Pop Art American",
    credit: "Wesselmann - Still Life 35 - 1963.jpg · Local Asset",
    license: "Educational use",
  },
} as const satisfies Record<string, ArtAsset>;

export type ArtAssetKey = keyof typeof ART_ASSETS;
