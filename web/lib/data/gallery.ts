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
  tone: string;
  orientation: "portrait" | "landscape" | "square";
  featured?: boolean;
};

type GalleryOverride = Partial<
  Pick<
    GalleryImage,
    "alt" | "caption" | "description" | "location" | "tone" | "featured"
  >
>;

const GALLERY_HERO_PATH = "Cities/Chicago Skyline and Grid at Sunset.jpg";

const CURATED_IMAGE_OVERRIDES: Record<string, GalleryOverride> = {
  "Cities/Chicago Downtown portrait.jpg": {
    alt: "Elevated dusk view of the Chicago River running through downtown Chicago",
    caption: "Downtown Chicago, Illinois",
    description:
      "This is an elevated, dusk view of the Chicago River flowing through the downtown architectural canyon. The perspective looks down the river corridor from behind a stone balustrade, showing multiple bascule bridges spanning the water. Key elements include the illuminated multi-level Wacker Drive on the left and the distinctive, cylindrical Marina City towers on the right, with city lights beginning to reflect on the water as evening sets in.",
    location: "Chicago, Illinois",
    tone: "Dusk city canyon",
  },
  "Cities/Seattle Skyline Day.jpg": {
    alt: "Daytime view of the Seattle skyline under clear light",
    caption: "Seattle Skyline Day",
    description:
      "A clean daytime view of the Seattle skyline, with the city profile presented as a crisp Pacific Northwest urban frame.",
    location: "Seattle, Washington",
    tone: "Northwest skyline",
    featured: true,
  },
  "Cities/Dallas with the interstate and downtown.jpg": {
    alt: "Dallas skyline and interstate infrastructure leading into downtown",
    caption: "Dallas with the Interstate and Downtown",
    description:
      "A city-scale view of Dallas where freeway infrastructure leads the eye into the downtown skyline, tying urban growth to movement and metropolitan scale.",
    location: "Dallas, Texas",
    tone: "Interstate skyline",
    featured: true,
  },
  "Cities/Golden Gate Bridge.jpg": {
    alt: "Golden Gate Bridge spanning San Francisco Bay in warm daylight",
    caption: "Golden Gate Bridge, San Francisco",
    description:
      "This is an elevated, golden-hour view of the Golden Gate Bridge spanning the San Francisco Bay, looking southward from Marin County. The iconic suspension structure, defined by its massive International Orange towers and sweeping main cables, dominates the foreground and leads the eye diagonally across the strait. The San Francisco city skyline is faintly visible on the distant left horizon, while the coastline of the Presidio anchors the far end of the span. The scene is bathed in warm, low-angle sunlight against a clear gradient sky, with a faint crescent moon high above the primary tower and a single white sailboat navigating the dark blue water in the lower right.",
    location: "San Francisco, California",
    tone: "Golden hour span",
  },
  "USA from Space/USA at night from Space.jpg": {
    alt: "The United States at night seen from orbit, with major population centers glowing across the continent",
    caption: "The United States at Night, from Space",
    description:
      "The United States at night seen from orbit, with major population centers glowing across the continent and revealing the scale of the country's cities, infrastructure, and connected regions.",
    location: "Low Earth Orbit",
    tone: "Continental scale",
  },
  "Culture/Iconic Things/Statue Of Liberty.jpg": {
    alt: "Statue of Liberty viewed in clear daylight against a bright blue sky",
    caption: "Statue of Liberty, New York Harbor",
    description:
      "This is a clear, daylight view of the Statue of Liberty set against a bright blue sky with scattered clouds. The colossal neoclassical copper sculpture, distinguished by its bright verdigris patina, is captured wearing her iconic seven-spiked crown. She holds a gold-tinted torch aloft in her right hand and a tabula ansata tablet close to her body in her left. The figure is anchored atop the upper tier of its massive masonry pedestal, showing classical architectural detailing and the structural columns of the observation deck.",
    location: "New York Harbor",
    tone: "National symbol",
  },
  "Education/Columbia University.jpg": {
    alt: "Low Memorial Library on the Columbia University campus in New York City",
    caption: "Columbia University, New York",
    description:
      'This is an eye-level, daytime view of Low Memorial Library on the Columbia University campus in New York City. The prominent Neoclassical building is anchored by a central stone dome and an expansive, multi-tiered stone staircase leading to the entrance. The focal point is a massive classical portico supported by ten tall Ionic columns. The entablature clearly reads "THE LIBRARY OF COLUMBIA UNIVERSITY" below a larger historical inscription detailing its founding as King\'s College. The active plaza features classic green globe lampposts, scattered pedestrians, and parked micromobility transit near a manicured lawn and black bollards.',
    location: "New York City",
    tone: "Campus classicism",
  },
  "Housing/USA Suburb house.jpg": {
    alt: "Traditional American coastal-style suburban home with a broad green lawn",
    caption: "American Suburbia",
    description:
      "This is an exterior view of a traditional American coastal-style suburban home. The facade uses weathered cedar shake siding paired with a dark asphalt shingle roof. A prominent, elevated wraparound front porch features white structural columns, balustrades, and decorative lattice skirting. The roofline includes two symmetrical gabled dormers with dark window shutters, flanking a central arched eyebrow dormer. The property is situated on a broad, heavily manicured green lawn with mature landscaping under clear daylight.",
    location: "American suburb",
    tone: "Coastal suburbia",
  },
  "Science/SpaceX launch.jpg": {
    alt: "A SpaceX rocket lifting off in a plume of fire and smoke against the sky",
    caption: "SpaceX Launch, Florida",
    description:
      "A SpaceX rocket lifting off in a plume of fire and smoke, showing the scale, power, and technological ambition of modern American launch infrastructure.",
    location: "Florida",
    tone: "Launch power",
  },
  "Landscapes/Yosemite National Park Road.jpg": {
    alt: "A road cutting through Yosemite National Park beneath towering granite and pine forest",
    caption: "Yosemite National Park, California",
    description:
      "A road cutting through Yosemite National Park beneath towering granite formations and pine forest, placing the viewer inside one of America's most recognizable protected landscapes.",
    location: "California",
    tone: "National park road",
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
    }
  }
  if (first === "Leadership") {
    return "American Life";
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

  return {
    id: toId(asset.path),
    path: asset.path,
    src: asset.src,
    alt: `A gallery image from ${category}: ${caption}`,
    caption,
    description: `A gallery image from ${category}: ${caption}.`,
    category,
    subcategory,
    location: subcategory ?? category,
    tone: subcategory ?? category,
    orientation: getOrientation(asset.src),
    ...override,
  };
});
