// ─── Content Types ──────────────────────────────────────────────────────────
// Central type definitions for all site content.
// Components import from here — never define types inline.

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface MegaMenuCategory {
  title: string;
  href: string;
  description: string;
  imageSrc: string;
  sections: NavSection[];
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroImage {
  src: string;
  alt: string;
  blurDataURL?: string;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost" | "gold";
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  images: HeroImage[];
  ctaButtons: CTAButton[];
  overlayOpacity?: number;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface StatItem {
  id: string;
  value: number;
  suffix?: string; // e.g. "T", "M", "+", "%"
  prefix?: string; // e.g. "$", "#"
  label: string;
  description?: string;
  source?: string;
  icon?: string;
  color?: "gold" | "red" | "blue" | "white";
}

// ─── Sections ─────────────────────────────────────────────────────────────────

export interface SectionCard {
  id: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  category?: string;
}

export interface ContentBlockItem {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  cta?: CTAButton;
  facts?: FactItem[];
}

// ─── Facts & Quotes ──────────────────────────────────────────────────────────

export interface FactItem {
  id: string;
  fact: string;
  detail?: string;
  icon?: string;
  source?: string;
  category?: string;
  color?: "red" | "blue" | "gold";
}

export interface QuoteItem {
  id: string;
  quote: string;
  attribution: string;
  role?: string; // e.g. "16th President of the United States"
  year?: number;
  imageSrc?: string;
  imageAlt?: string;
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

export type TimelineCategory =
  | "economy"
  | "inventions"
  | "military"
  | "culture"
  | "politics"
  | "science"
  | "space"
  | "all";

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: TimelineCategory;
  imageSrc?: string;
  imageAlt?: string;
  significanceLevel: 1 | 2 | 3 | 4 | 5; // 5 = most significant (Moon landing)
  tags?: string[];
}

// ─── Chart Data ───────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  country: string;
  value: number;
  isUSA?: boolean; // Highlights USA bar in a different color
  unit?: string;
}

export interface ChartConfig {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl?: string;
  year?: number;
  unit: string;
  data: ChartDataPoint[];
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export type GalleryCategory =
  | "national-parks"
  | "cities"
  | "suburbs"
  | "military"
  | "cars-transport"
  | "inventions"
  | "culture"
  | "universities";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: GalleryCategory;
  location?: string;
  photographer?: string;
  width: number;
  height: number;
}

// ─── Inventions ───────────────────────────────────────────────────────────────

export type InventionCategory =
  | "technology"
  | "medicine"
  | "transportation"
  | "communication"
  | "energy"
  | "materials"
  | "computing"
  | "space"
  | "everyday";

export interface Invention {
  id: string;
  name: string;
  year: number;
  inventor: string;
  description: string;
  longDescription?: string;
  category: InventionCategory;
  imageSrc?: string;
  imageAlt?: string;
  impactRating: number; // 1-10
  wikipediaUrl?: string;
  tags?: string[];
}

// ─── Universities ─────────────────────────────────────────────────────────────

export interface University {
  id: string;
  name: string;
  shortName: string;
  founded: number;
  location: string;
  state: string;
  type: "ivy-league" | "stem" | "business" | "public-research";
  motto: string;
  endowment?: string;
  acceptanceRate?: string;
  nobelLaureates?: number;
  famousAlumni: string[];
  knownFor: string[];
  imageSrc: string;
  imageAlt: string;
  website: string;
  description: string;
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export interface NewsletterFormData {
  email: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

// ─── Page Metadata ────────────────────────────────────────────────────────────

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string[];
  canonical?: string;
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

export type SectionVariant = "light" | "dark" | "navy" | "parchment" | "glory";

export interface SectionWrapperProps {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
}
