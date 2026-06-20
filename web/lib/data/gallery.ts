import type { StaticImageData } from "next/image";
import { GALLERY_ASSETS } from "@/lib/data/gallery-assets";

export const GALLERY_CATEGORIES = [
  "All",
  "Aerials",
  "American Life",
  "Brand Ads",
  "Cinema",
  "Cities",
  "Collages",
  "Constitution",
  "Food",
  "Cultural Icons",
  "Economy",
  "Education",
  "Founders",
  "History",
  "Housing",
  "Iconic Symbols",
  "Infrastructure",
  "Landscapes",
  "Magazines",
  "Military",
  "Music",
  "Science",
  "Sports",
  "Technology",
  "US Buildings",
  "US Flags",
  "USA from Space",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryImage = {
  id: string;
  path: string;
  src: StaticImageData;
  alt: string;
  caption: string;
  description: string;
  category: Exclude<GalleryCategory, "All">;
  subcategory?: string;
  location: string;
  theme: string;
  orientation: "portrait" | "landscape" | "square";
  featured?: boolean;
};

type GalleryOverride = Partial<
  Pick<
    GalleryImage,
    "alt" | "caption" | "description" | "location" | "theme" | "featured"
  >
>;

const GALLERY_HERO_PATH = "Cities/Chicago Skyline and Grid at Sunset.jpg";

const CATEGORY_DEFAULTS: Record<
  Exclude<GalleryCategory, "All">,
  { location: string; theme: string }
> = {
  "Aerials": {
    location: "United States",
    theme: "Aerial Perspective",
  },
  "American Life": {
    location: "United States",
    theme: "American Culture & Lifestyle",
  },
  "Brand Ads": {
    location: "United States",
    theme: "Vintage Commercial Art",
  },
  "Cinema": {
    location: "Hollywood, California",
    theme: "American Cinematic History",
  },
  "Cities": {
    location: "United States",
    theme: "Metropolitan Architecture",
  },
  "Collages": {
    location: "United States",
    theme: "Patriotic Visual Collage",
  },
  "Constitution": {
    location: "National Archives, Washington D.C.",
    theme: "American Founding & Constitutional Law",
  },
  "Food": {
    location: "United States",
    theme: "American Culinary Heritage",
  },
  "Cultural Icons": {
    location: "United States",
    theme: "Portraits of American Figures",
  },
  "Economy": {
    location: "United States",
    theme: "Commerce, Industry & Growth",
  },
  "Education": {
    location: "United States",
    theme: "Academic Tradition & Excellence",
  },
  "Founders": {
    location: "Philadelphia, Pennsylvania",
    theme: "Founding Father of the United States",
  },
  "History": {
    location: "United States",
    theme: "Pivotal Moments in American History",
  },
  "Housing": {
    location: "United States",
    theme: "American Domestic Architecture",
  },
  "Iconic Symbols": {
    location: "United States",
    theme: "National Symbol of Freedom",
  },
  "Infrastructure": {
    location: "United States",
    theme: "Engineering & Public Works",
  },
  "Landscapes": {
    location: "United States",
    theme: "American Natural Landscape",
  },
  "Magazines": {
    location: "United States",
    theme: "Historic Magazine Cover",
  },
  "Military": {
    location: "United States",
    theme: "U.S. Armed Forces Honor & Duty",
  },
  "Music": {
    location: "United States",
    theme: "American Musical Heritage",
  },
  "Science": {
    location: "United States",
    theme: "Scientific Discovery & Exploration",
  },
  "Sports": {
    location: "United States",
    theme: "American Athletic Tradition",
  },
  "Technology": {
    location: "United States",
    theme: "American Technological Frontier",
  },
  "US Buildings": {
    location: "Washington, D.C.",
    theme: "Civic & Government Architecture",
  },
  "US Flags": {
    location: "United States",
    theme: "The Stars and Stripes",
  },
  "USA from Space": {
    location: "Low Earth Orbit",
    theme: "Orbital Perspective of America",
  },
};

const CURATED_IMAGE_OVERRIDES: Record<string, GalleryOverride> = {
  "Cities/Chicago Downtown portrait.jpg": {
    alt: "Elevated dusk view of the Chicago River running through downtown Chicago",
    caption: "Downtown Chicago, Illinois",
    description:
      "This is an elevated, dusk view of the Chicago River flowing through the downtown architectural canyon. The perspective looks down the river corridor from behind a stone balustrade, showing multiple bascule bridges spanning the water. Key elements include the illuminated multi-level Wacker Drive on the left and the distinctive, cylindrical Marina City towers on the right, with city lights beginning to reflect on the water as evening sets in.",
    location: "Chicago, Illinois",
    theme: "Dusk city canyon",
  },
  "Cities/Seattle Skyline Day.jpg": {
    alt: "Daytime view of the Seattle skyline under clear light",
    caption: "Seattle Skyline Day",
    description:
      "A clean daytime view of the Seattle skyline, with the city profile presented as a crisp Pacific Northwest urban frame.",
    location: "Seattle, Washington",
    theme: "Northwest skyline",
    featured: true,
  },
  "Cities/Dallas with the interstate and downtown.jpg": {
    alt: "Dallas skyline and interstate infrastructure leading into downtown",
    caption: "Dallas with the Interstate and Downtown",
    description:
      "A city-scale view of Dallas where freeway infrastructure leads the eye into the downtown skyline, tying urban growth to movement and metropolitan scale.",
    location: "Dallas, Texas",
    theme: "Interstate skyline",
    featured: true,
  },
  "Cities/Golden Gate Bridge.jpg": {
    alt: "Golden Gate Bridge spanning San Francisco Bay in warm daylight",
    caption: "Golden Gate Bridge, San Francisco",
    description:
      "This is an elevated, golden-hour view of the Golden Gate Bridge spanning the San Francisco Bay, looking southward from Marin County. The iconic suspension structure, defined by its massive International Orange towers and sweeping main cables, dominates the foreground and leads the eye diagonally across the strait. The San Francisco city skyline is faintly visible on the distant left horizon, while the coastline of the Presidio anchors the far end of the span. The scene is bathed in warm, low-angle sunlight against a clear gradient sky, with a faint crescent moon high above the primary tower and a single white sailboat navigating the dark blue water in the lower right.",
    location: "San Francisco, California",
    theme: "Golden hour span",
  },
  "USA from Space/USA at night from Space.jpg": {
    alt: "The United States at night seen from orbit, with major population centers glowing across the continent",
    caption: "The United States at Night, from Space",
    description:
      "The United States at night seen from orbit, with major population centers glowing across the continent and revealing the scale of the country's cities, infrastructure, and connected regions.",
    location: "Low Earth Orbit",
    theme: "Continental scale",
  },
  "Culture/Iconic Things/Statue Of Liberty.jpg": {
    alt: "Statue of Liberty viewed in clear daylight against a bright blue sky",
    caption: "Statue of Liberty, New York Harbor",
    description:
      "This is a clear, daylight view of the Statue of Liberty set against a bright blue sky with scattered clouds. The colossal neoclassical copper sculpture, distinguished by its bright verdigris patina, is captured wearing her iconic seven-spiked crown. She holds a gold-tinted torch aloft in her right hand and a tabula ansata tablet close to her body in her left. The figure is anchored atop the upper tier of its massive masonry pedestal, showing classical architectural detailing and the structural columns of the observation deck.",
    location: "New York Harbor",
    theme: "National symbol",
  },
  "University/Columbia University.jpg": {
    alt: "Low Memorial Library on the Columbia University campus in New York City",
    caption: "Columbia University, New York",
    description:
      'This is an eye-level, daytime view of Low Memorial Library on the Columbia University campus in New York City. The prominent Neoclassical building is anchored by a central stone dome and an expansive, multi-tiered stone staircase leading to the entrance. The focal point is a massive classical portico supported by ten tall Ionic columns. The entablature clearly reads "THE LIBRARY OF COLUMBIA UNIVERSITY" below a larger historical inscription detailing its founding as King\'s College. The active plaza features classic green globe lampposts, scattered pedestrians, and parked micromobility transit near a manicured lawn and black bollards.',
    location: "New York City",
    theme: "Campus classicism",
  },
  "Housing/USA Suburb house.jpg": {
    alt: "Traditional American coastal-style suburban home with a broad green lawn",
    caption: "American Suburbia",
    description:
      "This is an exterior view of a traditional American coastal-style suburban home. The facade uses weathered cedar shake siding paired with a dark asphalt shingle roof. A prominent, elevated wraparound front porch features white structural columns, balustrades, and decorative lattice skirting. The roofline includes two symmetrical gabled dormers with dark window shutters, flanking a central arched eyebrow dormer. The property is situated on a broad, heavily manicured green lawn with mature landscaping under clear daylight.",
    location: "American suburb",
    theme: "Coastal suburbia",
  },
  "Science/SpaceX launch.jpg": {
    alt: "A SpaceX rocket lifting off in a plume of fire and smoke against the sky",
    caption: "SpaceX Launch, Florida",
    description:
      "A SpaceX rocket lifting off in a plume of fire and smoke, showing the scale, power, and technological ambition of modern American launch infrastructure.",
    location: "Florida",
    theme: "Launch power",
  },
  "Landscapes/Yosemite National Park Road.jpg": {
    alt: "A road cutting through Yosemite National Park beneath towering granite and pine forest",
    caption: "Yosemite National Park, California",
    description:
      "A road cutting through Yosemite National Park beneath towering granite formations and pine forest, placing the viewer inside one of America's most recognizable protected landscapes.",
    location: "California",
    theme: "National park road",
  },

  // ── Iconic American photographs — batch 1 (Military & Space, public domain) ──
  "Military/Iconic/Into the Jaws of Death.jpg": {
    alt: "U.S. soldiers wading ashore from a landing craft toward Omaha Beach on D-Day",
    caption: "Into the Jaws of Death (1944)",
    description:
      "Robert F. Sargent's photograph of the 1st Infantry Division disembarking at Omaha Beach, June 6, 1944, is among the defining images of the Normandy invasion.",
    location: "Omaha Beach, Normandy, France",
    theme: "D-Day landing",
    featured: true,
  },
  "Military/Iconic/Eisenhower Speaking to Paratroopers.jpg": {
    alt: "General Eisenhower speaking with paratroopers of the 101st Airborne on the eve of D-Day",
    caption: "Eisenhower and the 101st Airborne (1944)",
    description:
      "General Dwight D. Eisenhower visits paratroopers of the 101st Airborne Division on June 5, 1944, hours before the Normandy drop — a portrait of command and resolve.",
    location: "Greenham Common, England",
    theme: "Eve of D-Day",
  },
  "Military/Iconic/Surrender of Japan on the USS Missouri.jpg": {
    alt: "Japanese delegation aboard the USS Missouri for the formal surrender ending World War II",
    caption: "Surrender of Japan on the USS Missouri (1945)",
    description:
      "On September 2, 1945, Japanese officials signed the instrument of surrender aboard the USS Missouri in Tokyo Bay, with General MacArthur presiding — the end of the Second World War.",
    location: "Tokyo Bay, Japan",
    theme: "End of WWII",
  },
  "Military/Iconic/The Enola Gay and Her Crew.jpg": {
    alt: "The crew of the B-29 Enola Gay lined up in front of the aircraft",
    caption: "The Enola Gay and Her Crew (1945)",
    description:
      "Colonel Paul Tibbets and the crew of the Enola Gay flew the B-29 that dropped the atomic bomb on Hiroshima, August 6, 1945, hastening the end of the war.",
    location: "Tinian, Mariana Islands",
    theme: "Atomic age",
  },
  "Military/Iconic/Tuskegee Airmen Briefing.jpg": {
    alt: "Tuskegee Airmen gathered around a table for a mission briefing",
    caption: "Tuskegee Airmen Briefing (1944)",
    description:
      "The Tuskegee Airmen, the first Black U.S. military aviators, whose distinguished combat record helped pave the way for desegregation of the armed forces.",
    location: "Ramitelli, Italy",
    theme: "Trailblazing aviators",
  },
  "Military/Iconic/A-10 Thunderbolt II in Flight.jpg": {
    alt: "A formation of A-10 Thunderbolt II attack aircraft in flight above an island",
    caption: "A-10 Thunderbolt II (“Warthog”) in Flight",
    description:
      "The rugged A-10, designed around a 30mm Gatling gun, is the U.S. Air Force's premier close-air-support aircraft, beloved by the ground troops it protects.",
    location: "United States Air Force",
    theme: "Close air support",
  },
  "Military/Iconic/F-22 Raptor Vertical Climb.jpg": {
    alt: "An F-22 Raptor stealth fighter banking against a blue sky",
    caption: "F-22 Raptor in Flight",
    description:
      "The F-22 Raptor combines stealth, supercruise, and thrust-vectoring agility — the U.S. Air Force's premier fifth-generation air-superiority fighter.",
    location: "United States Air Force",
    theme: "Air superiority",
  },
  "USA from Space/Saturn V Apollo 11 Launch.jpg": {
    alt: "The Saturn V rocket lifting off from Launch Complex 39A carrying Apollo 11",
    caption: "Saturn V Launch for Apollo 11 (1969)",
    description:
      "On July 16, 1969, the most powerful rocket ever flown carried Armstrong, Aldrin, and Collins off Launch Complex 39A toward the first crewed Moon landing.",
    location: "Kennedy Space Center, Florida",
    theme: "To the Moon",
    featured: true,
  },
  "USA from Space/Earthrise.jpg": {
    alt: "The Earth rising over the lunar horizon, photographed from Apollo 8",
    caption: "Earthrise (1968)",
    description:
      "William Anders photographed the Earth rising beyond the Moon on December 24, 1968 — an image widely credited with galvanizing the modern environmental movement.",
    location: "Lunar orbit",
    theme: "A fragile blue world",
    featured: true,
  },
  "USA from Space/The Pale Blue Dot.png": {
    alt: "Earth as a single pale dot suspended in a band of scattered sunlight",
    caption: "The Pale Blue Dot (1990)",
    description:
      "Voyager 1 photographed Earth as a single pixel from 3.7 billion miles away in 1990, inspiring Carl Sagan's reflection on our place in the cosmos.",
    location: "Edge of the Solar System",
    theme: "Cosmic perspective",
  },
  "USA from Space/The Pillars of Creation.jpg": {
    alt: "Towering columns of interstellar gas and dust in the Eagle Nebula",
    caption: "The Pillars of Creation (1995)",
    description:
      "Hubble's image of star-forming pillars in the Eagle Nebula became one of the most famous astronomical photographs ever made.",
    location: "Eagle Nebula (Hubble)",
    theme: "Star-forming pillars",
  },
  "History/The Trinity Test.jpg": {
    alt: "The fireball and mushroom cloud of the first nuclear detonation at the Trinity test",
    caption: "The Trinity Test (1945)",
    description:
      "The Manhattan Project's Trinity test in the New Mexico desert, July 16, 1945, ushered in the atomic age.",
    location: "Jornada del Muerto, New Mexico",
    theme: "Dawn of the atomic age",
  },
  "Constitution/A view of the north side of Independence Hall in Philadelphia, showing the main building in the center with the east and west wings on the sides.jpg": {
    location: "Philadelphia, Pennsylvania",
    theme: "Founding Site",
  },
  "Constitution/bill-of-rights-page-1.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Charter of Freedom",
  },
  "Constitution/Bill_of_Rights_Pg1of1_AC.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Charter of Freedom",
  },
  "Constitution/constitution-page-1.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Supreme Law",
  },
  "Constitution/Constitution_Pg1of4_AC.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Supreme Law of the Land",
  },
  "Constitution/Constitution_Pg2of4_AC.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Supreme Law of the Land",
  },
  "Constitution/Constitution_Pg3of4_AC.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Supreme Law of the Land",
  },
  "Constitution/Constitution_Pg4of4_AC.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Supreme Law of the Land",
  },
  "Constitution/United States National Archives Building, Washington D.C.jpg": {
    location: "Washington, D.C.",
    theme: "Civic Temple",
  },
  "Constitution/Declaration_Pg1of1_AC.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Birth of Freedom",
  },
  "Constitution/Declaration_Engrav_Pg1of1_AC.jpg": {
    location: "National Archives, Washington D.C.",
    theme: "Birth of Freedom",
  },
  "Constitution/Howard Chandler Christy Scene at the Signing of the Constitution of the United States.jpg": {
    location: "U.S. Capitol, Washington D.C.",
    theme: "Founding Vision",
  },
  "US Buildings/us-supreme-court-building.jpg": {
    location: "Washington, D.C.",
    theme: "Equal Justice Under Law",
  },
  "Founders/george-washington.jpg": {
    location: "Mount Vernon, Virginia",
    theme: "Father of His Country",
  },
  "Founders/thomas-jefferson.jpg": {
    location: "Monticello, Virginia",
    theme: "Author of Declaration",
  },
  "Founders/alexander-hamilton.jpg": {
    location: "New York City, New York",
    theme: "Financial Architect",
  },
  "Founders/benjamin-franklin.jpg": {
    location: "Philadelphia, Pennsylvania",
    theme: "Diplomat & Polymath",
  },
  "Culture/Music/Carey at Edwards Air Force Base during the making of the \"I Still Believe\" music video in December 1998.jpg": {
    location: "Edwards AFB, California",
    theme: "USO Goodwill Show",
  },
};

function toTitle(value: string) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toId(path: string) {
  const slug = path
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `gallery-${encodeURIComponent(path)}`;
}

function getOrientation(src: StaticImageData): GalleryImage["orientation"] {
  if (src.width === src.height) return "square";
  return src.width < src.height ? "portrait" : "landscape";
}

function getCategory(path: string): Exclude<GalleryCategory, "All"> {
  const parts = path.split("/");
  const first = parts[0];
  if (first === "Culture" && parts.length > 1) {
    const sub = parts[1];
    if (sub === "Album Covers" || sub === "Music") {
      return "Music";
    } else if (sub === "Brand Ads") {
      return "Brand Ads";
    } else if (sub === "Cinema" || sub === "Movie Posters") {
      return "Cinema";
    } else if (sub === "Collage") {
      return "Collages";
    } else if (sub === "Famous People") {
      return "Cultural Icons";
    } else if (sub === "Food") {
      return "Food";
    } else if (sub === "Iconic Things") {
      return "Iconic Symbols";
    } else if (sub === "Just America") {
      return "American Life";
    } else if (sub === "Magazines") {
      return "Magazines";
    } else if (sub === "School") {
      return "Education";
    } else if (sub === "Sports") {
      return "Sports";
    } else if (sub === "Eras") {
      return "History";
    } else if (sub === "Fashion") {
      return "American Life";
    }
  }
  if (first === "Leadership" || first === "Outdoors Lifestyle" || first === "Quality of Life") {
    return "American Life";
  }
  if (first === "University") {
    return "Education";
  }
  return first as Exclude<GalleryCategory, "All">;
}

function getSubcategory(path: string): string | undefined {
  const parts = path.split("/");
  const first = parts[0];
  if (first === "Culture") {
    if (parts.length > 3) {
      return parts[2];
    }
    const sub = parts[1];
    if (sub === "Album Covers") {
      return "Album Covers";
    }
    if (sub === "Movie Posters") {
      return "Posters";
    }
    return undefined;
  }
  return parts.length > 2 ? parts[1] : undefined;
}

export const GALLERY_HERO_IMAGE =
  GALLERY_ASSETS.find((asset) => asset.path === GALLERY_HERO_PATH) ??
  GALLERY_ASSETS[0];

export const GALLERY_IMAGES: GalleryImage[] = GALLERY_ASSETS.map((asset) => {
  const category = getCategory(asset.path);
  const subcategory = getSubcategory(asset.path);
  const fileName = asset.path.split("/").at(-1) ?? asset.path;
  const caption = toTitle(fileName);
  const override = CURATED_IMAGE_OVERRIDES[asset.path] ?? {};
  
  const defaults = CATEGORY_DEFAULTS[category];

  return {
    id: toId(asset.path),
    path: asset.path,
    src: asset.src,
    alt: `A gallery image from ${category}: ${caption}`,
    caption,
    description: `A gallery image from ${category}: ${caption}.`,
    category,
    subcategory,
    location: defaults.location,
    theme: defaults.theme,
    orientation: getOrientation(asset.src),
    ...override,
  };
});
