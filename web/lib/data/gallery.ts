import { GALLERY_PREVIEW_IMAGES } from "@/lib/data/home";
import { SITE_IMAGES } from "@/lib/site-images";

export type GalleryCategory =
  | "All"
  | "Cities"
  | "Landscapes"
  | "Symbols"
  | "Institutions"
  | "Innovation"
  | "Military"
  | "Economy";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  description: string;
  category: Exclude<GalleryCategory, "All">;
  location: string;
  tone: string;
  orientation: "portrait" | "landscape" | "square";
  featured?: boolean;
};

const previewImages = GALLERY_PREVIEW_IMAGES.map((image) => ({
  ...image,
  category:
    image.category === "Global Scale"
      ? "Innovation"
      : image.category === "Nature"
        ? "Landscapes"
        : image.category === "Culture"
          ? "Symbols"
          : image.category === "Universities"
            ? "Institutions"
            : image.category === "Quality of Life"
              ? "Symbols"
              : image.category,
  location: image.caption,
  tone: image.span === "tall" ? "Vertical study" : "Wide frame",
  orientation: image.span === "tall" ? "portrait" : "landscape",
})) satisfies GalleryImage[];

export const GALLERY_IMAGES: GalleryImage[] = [
  { ...previewImages[1], featured: true, tone: "Dusk city canyon" },
  { ...previewImages[3], featured: true, tone: "Golden hour span" },
  { ...previewImages[0], featured: true, tone: "Continental scale" },
  previewImages[4],
  previewImages[5],
  previewImages[6],
  previewImages[7],
  {
    id: "grand-canyon",
    src: SITE_IMAGES.homeGrandCanyon,
    alt: "Grand Canyon cliffs and layered red rock formations under open sky",
    caption: "Grand Canyon National Park",
    description:
      "A sweeping view of Grand Canyon National Park, where layered red rock walls and immense desert scale create one of the clearest visual signatures of the American West.",
    category: "Landscapes",
    location: "Arizona",
    tone: "Desert scale",
    orientation: "landscape",
  },
  {
    id: "mount-denali",
    src: SITE_IMAGES.denaliNationalPark,
    alt: "Mount Denali rising above alpine wilderness",
    caption: "Denali National Park",
    description:
      "A high-latitude wilderness view centered on Denali, with alpine terrain and open distance emphasizing the scale of Alaska's protected landscapes.",
    category: "Landscapes",
    location: "Alaska",
    tone: "Northern wilderness",
    orientation: "landscape",
  },
  {
    id: "yellowstone",
    src: SITE_IMAGES.yellowstoneNationalPark,
    alt: "Yellowstone National Park geothermal landscape in daylight",
    caption: "Yellowstone National Park",
    description:
      "A daylight view of Yellowstone's geothermal terrain, connecting the gallery to the first national park and to the American idea of preserving landscapes at continental scale.",
    category: "Landscapes",
    location: "Wyoming, Montana, Idaho",
    tone: "Geothermal color",
    orientation: "landscape",
  },
  {
    id: "zion",
    src: SITE_IMAGES.zionNationalPark,
    alt: "Zion National Park canyon walls and desert vegetation",
    caption: "Zion National Park",
    description:
      "A canyon view from Zion National Park, where sheer sandstone walls, desert vegetation, and warm light define a more intimate version of western monumentality.",
    category: "Landscapes",
    location: "Utah",
    tone: "Canyon light",
    orientation: "portrait",
  },
  {
    id: "nyc-sunset",
    src: SITE_IMAGES.homeNycSunset,
    alt: "New York City skyline at sunset",
    caption: "New York Skyline at Sunset",
    description:
      "A sunset view of New York City, using dense vertical architecture and warm evening light to frame the city as an economic, cultural, and architectural symbol.",
    category: "Cities",
    location: "New York",
    tone: "Urban glow",
    orientation: "landscape",
  },
  {
    id: "silicon-valley",
    src: SITE_IMAGES.siliconValleyOffice,
    alt: "Apple Park campus architecture in Silicon Valley",
    caption: "Silicon Valley Campus",
    description:
      "A clean architectural view of a major Silicon Valley campus, representing the American technology ecosystem through scale, precision, and controlled modern design.",
    category: "Innovation",
    location: "California",
    tone: "Precision modernism",
    orientation: "landscape",
  },
  {
    id: "science-lab",
    src: SITE_IMAGES.scienceLab,
    alt: "Modern scientific laboratory equipment and researchers",
    caption: "American Research Lab",
    description:
      "A laboratory scene focused on scientific infrastructure, connecting the gallery to medicine, biotechnology, university research, and the country's broader innovation system.",
    category: "Innovation",
    location: "United States",
    tone: "Research light",
    orientation: "landscape",
  },
  {
    id: "nyse",
    src: SITE_IMAGES.economyNyseHero,
    alt: "New York Stock Exchange exterior in Lower Manhattan",
    caption: "New York Stock Exchange",
    description:
      "An exterior view of the New York Stock Exchange, used here as a visual anchor for American capital markets and the country's role in global finance.",
    category: "Economy",
    location: "New York",
    tone: "Market institution",
    orientation: "landscape",
  },
  {
    id: "air-force-c17",
    src: SITE_IMAGES.homeAirForcePlane,
    alt: "United States Air Force C-17 aircraft nose and fuselage",
    caption: "U.S. Air Force C-17",
    description:
      "A close view of a U.S. Air Force C-17, emphasizing heavy airlift, logistics, and the industrial scale behind American military reach.",
    category: "Military",
    location: "United States Air Force",
    tone: "Air power",
    orientation: "landscape",
  },
  {
    id: "carrier-flight-deck",
    src: SITE_IMAGES.navy.flightDeck,
    alt: "U.S. Navy aircraft carrier flight deck at sea",
    caption: "Carrier Flight Deck",
    description:
      "A U.S. Navy carrier flight deck at sea, showing the moving runway that underpins American naval aviation and forward presence.",
    category: "Military",
    location: "U.S. Navy",
    tone: "Sea control",
    orientation: "landscape",
  },
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Cities",
  "Landscapes",
  "Symbols",
  "Institutions",
  "Innovation",
  "Military",
  "Economy",
];
