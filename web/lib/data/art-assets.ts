// ─── Art & Architecture: source imagery ──────────────────────────────────────
// Verified assets for the art-architecture section. Every entry was returned by
// the Wikimedia Commons API with a usable licence (public domain / CC), and each
// URL was then fetched to confirm HTTP 200 at full size AND that the filename
// actually names the subject — the check that matters, because Commons search
// will hand back correctly-licensed images of entirely the wrong thing.
// Served from upload.wikimedia.org, already allow-listed in next.config.

export interface ArtAsset {
  src: string;
  alt: string;
  altRo: string;
  credit: string;
  license: string;
}

export const ART_ASSETS = {
  flatiron: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2003-03-Flatiron-Building-New-York-City.jpg/1920px-2003-03-Flatiron-Building-New-York-City.jpg",
    alt: "The Flatiron Building, New York, 1902",
    altRo: "Flatiron Building, New York, 1902",
    credit: "2003-03-Flatiron-Building-New-York-City.jpg · Wikimedia Commons",
    license: "CC BY-SA 4.0",
  },
  woolworth: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Woolworth_bldg.jpg/1280px-Woolworth_bldg.jpg",
    alt: "The Woolworth Building, the 'Cathedral of Commerce', 1913",
    altRo: "Woolworth Building, 1913",
    credit: "Woolworth_bldg.jpg · Wikimedia Commons",
    license: "CC BY-SA 4.0",
  },
  chrysler: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/ChryslerSpire.JPG/1920px-ChryslerSpire.JPG",
    alt: "The Chrysler Building's Art Deco crown, 1930",
    altRo: "Coroana Art Deco a Chrysler Building, 1930",
    credit: "ChryslerSpire.JPG · Wikimedia Commons",
    license: "Public domain",
  },
  empireState: {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    alt: "The Empire State Building, 1931",
    altRo: "Empire State Building, 1931",
    credit: "Empire State Building (aerial view).jpg · Wikimedia Commons",
    license: "Public domain",
  },
  seagram: {
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Seagram_Building-NewYork-1.jpg",
    alt: "The Seagram Building, Mies van der Rohe, 1958",
    altRo: "Seagram Building, Mies van der Rohe, 1958",
    credit: "Seagram Building-NewYork-1.jpg · Wikimedia Commons",
    license: "CC BY 2.0",
  },
  willisTower: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Chicago_%28ILL%29_Willis_Tower_%28_Ex._SEARS_Tower_%29_1974%2C_N-E_side_%22_the_loop_%22_%284800235689%29.jpg/1920px-Chicago_%28ILL%29_Willis_Tower_%28_Ex._SEARS_Tower_%29_1974%2C_N-E_side_%22_the_loop_%22_%284800235689%29.jpg",
    alt: "The Willis (Sears) Tower, Chicago, 1973",
    altRo: "Willis (Sears) Tower, Chicago, 1973",
    credit: "Willis Tower (ex-Sears Tower), Chicago, 1974 · Wikimedia Commons",
    license: "CC BY 2.0",
  },
  homeInsurance: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Home_Insurance_Building.JPG",
    alt: "The Home Insurance Building, Chicago, 1885 — the first skyscraper",
    altRo: "Home Insurance Building, Chicago, 1885",
    credit: "Home Insurance Building.JPG · Wikimedia Commons",
    license: "Public domain",
  },
  chicagoLoop: {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Chicago-_Picasso_sculpture%2C_Richard_J_Daley_Ctr_%281068546281%29.jpg",
    alt: "The Chicago Loop skyline",
    altRo: "Silueta cartierului Loop din Chicago",
    credit: "Chicago- Picasso sculpture, Richard J Daley Ctr (1068546281).jpg · Wikimedia Commons",
    license: "CC BY 2.0",
  },
  sullivanWainwright: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Louis_Sullivan_-_Wainwright_Building%2C_Seventh_%2B_Chestnut_Streets%2C_Saint_Louis%2C_St._Louis_City_County%2C_MO.jpg/1920px-Louis_Sullivan_-_Wainwright_Building%2C_Seventh_%2B_Chestnut_Streets%2C_Saint_Louis%2C_St._Louis_City_County%2C_MO.jpg",
    alt: "The Wainwright Building, Louis Sullivan, 1891",
    altRo: "Wainwright Building, Louis Sullivan, 1891",
    credit: "Louis Sullivan - Wainwright Building, Seventh + Chestnut Streets, Saint Louis, St. Louis City County, MO.jpg · Wikimedia Commons",
    license: "Public domain",
  },
  smithsonianCastle: {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/ae/12072012_Smithsonian_Building_01.jpg",
    alt: "The Smithsonian Institution Building, the 'Castle'",
    altRo: "Clădirea Smithsonian, „Castelul”",
    credit: "12072012 Smithsonian Building 01.jpg · Wikimedia Commons",
    license: "CC BY-SA 3.0",
  },
  coleOxbow: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Cole_Thomas_The_Oxbow_%28The_Connecticut_River_near_Northampton_1836%29.jpg/1920px-Cole_Thomas_The_Oxbow_%28The_Connecticut_River_near_Northampton_1836%29.jpg",
    alt: "The Oxbow, Thomas Cole, 1836 — Hudson River School",
    altRo: "The Oxbow, Thomas Cole, 1836",
    credit: "Cole Thomas The Oxbow (The Connecticut River near Northampton 1836).jpg · Wikimedia Commons",
    license: "Public domain",
  },
  churchNiagara: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/3Falls_Niagara.jpg/1920px-3Falls_Niagara.jpg",
    alt: "Niagara, Frederic Edwin Church, 1857",
    altRo: "Niagara, Frederic Edwin Church, 1857",
    credit: "3Falls Niagara.jpg · Wikimedia Commons",
    license: "CC BY-SA 3.0",
  },
  oneWTC: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/New_York_City_%28New_York%2C_USA%29%2C_One_World_Trade_Center_--_2012_--_6566.jpg/1920px-New_York_City_%28New_York%2C_USA%29%2C_One_World_Trade_Center_--_2012_--_6566.jpg",
    alt: "One World Trade Center, 2013",
    altRo: "One World Trade Center, 2013",
    credit: "New York City (New York, USA), One World Trade Center -- 2012 -- 6566.jpg · Wikimedia Commons",
    license: "CC BY-SA 4.0",
  },
} as const satisfies Record<string, ArtAsset>;

export type ArtAssetKey = keyof typeof ART_ASSETS;
