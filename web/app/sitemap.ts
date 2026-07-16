import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url || "https://americagreatest.com";
  
  // All pages in the app
  const paths = [
    "",
    "/sitemap",
    "/interactive",
    "/explorer",
    "/data",
    "/data/misconceptions",
    "/gallery",
    "/videos",
    "/immigration-demographics",
    "/united-states",
    "/natural-resources",

    // Art & Architecture
    "/art-architecture",
    "/art-architecture/american-realism",
    "/art-architecture/hudson-river-school",
    "/art-architecture/modern-pop-art",
    "/art-architecture/skyscraper-revolution",
    "/art-architecture/smithsonian-museums",

    // Infrastructure
    "/infrastructure",
    "/infrastructure/rail-network",
    "/infrastructure/power-grid",
    "/infrastructure/maritime-ports",
    "/infrastructure/aviation-hubs",
    "/infrastructure/dams-bridges",
    "/infrastructure/aqueducts-waterways",
    "/infrastructure/highway-system",
    
    // Economy
    "/economy",
    "/economy/gdp-growth",
    "/economy/trade-and-exports",
    "/economy/dollar-dominance",
    "/economy/startups-venture-capital",
    "/economy/capital-markets",
    
    // Nature
    "/nature",
    "/nature/alaska",
    "/nature/yellowstone",
    "/nature/great-lakes",
    "/nature/national-parks",
    "/nature/grand-canyon",
    "/nature/rockies",
    
    // Military
    "/military",
    "/military/navy",
    "/military/air-force",
    "/military/space-force",
    "/military/global-bases",
    "/military/intelligence",
    
    // Constitution
    "/constitution",
    "/constitution/bill-of-rights",
    "/constitution/first-amendment",
    "/constitution/second-amendment",
    "/constitution/federalism",
    "/constitution/separation-of-powers",
    "/constitution/electoral-map",
    "/constitution/democracy-track-record",
    "/constitution/unique-features",
    
    // Culture
    "/culture",
    "/culture/film-and-storytelling",
    "/culture/sports",
    "/culture/entertainment",
    "/culture/companies-brands",
    "/culture/food-and-drinks",
    "/culture/music-genres",
    "/culture/fashion",
    "/culture/english-language",
    "/culture/overview",
    
    // Innovation
    "/innovation",
    "/innovation/internet-history",
    "/innovation/ai-and-tech",
    "/innovation/smartphones",
    "/innovation/cloud-computing",
    "/innovation/space-technology",
    "/innovation/gaming",
    
    // Science
    "/science",
    "/science/inventions-pre-1890",
    "/science/inventions-1890-1945",
    "/science/inventions-post-1991",
    "/science/medicine-and-biotech",

    // Literature & Philosophy
    "/literature-philosophy",
    "/literature-philosophy/american-novel",
    "/literature-philosophy/oratory-poetry",
    "/literature-philosophy/pragmatism",
    "/literature-philosophy/sci-fi-myth",
    "/literature-philosophy/transcendentalism",
    
    // Universities
    "/universities",
    "/universities/ivy-league",
    "/universities/stem-powerhouses",
    "/universities/business-schools",
    "/universities/public-research-universities",
    
    // Quality of Life
    "/quality-of-life",
    "/quality-of-life/wages",
    "/quality-of-life/housing",
    "/quality-of-life/healthcare",
    "/quality-of-life/abundance",
    "/quality-of-life/america-vs-the-world",
    
    // Global Leadership
    "/global-leadership",
    "/global-leadership/nato",
    "/global-leadership/un",
    "/global-leadership/pax-americana",
    "/global-leadership/foreign-policy",
    
    // History
    "/history",
    "/history/founding-principles",
    "/history/frontier-and-expansion",
    "/history/union-and-liberty",
    "/history/industrial-rise",
    "/history/world-wars",
    "/history/american-dream",
    "/history/cold-war",
    "/history/reagan-revolution",
    "/history/post-9-11-america",
    "/history/populism-and-labor",
    "/history/american-exceptionalism",
    "/history/free-markets",
    "/history/faith-and-reform",
    "/history/reform-and-rights",
    "/history/crisis-and-resilience",
    "/history/we-must-fight",
  ];

  return paths.map((path) => {
    const isRoot = path === "";
    const isCategoryRoot = !isRoot && path.split("/").length === 2;
    
    let priority = 0.5;
    let changeFrequency: "daily" | "weekly" | "monthly" = "monthly";
    
    if (isRoot) {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (isCategoryRoot) {
      priority = 0.8;
      changeFrequency = "weekly";
    } else {
      priority = 0.6;
      changeFrequency = "monthly";
    }
    
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });
}
