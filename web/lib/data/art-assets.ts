// ─── Art & Architecture: local imagery ──────────────────────────────────────
// All imagery for art & architecture is stored locally in /IMAGES/Architecture.
// High resolution local files verified for building history & visual culture.

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
    alt: "The Home Insurance Building, Chicago, 1885 — the first skyscraper",
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
    alt: "The Oxbow, Thomas Cole, 1836 — Hudson River School",
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
} as const satisfies Record<string, ArtAsset>;

export type ArtAssetKey = keyof typeof ART_ASSETS;
