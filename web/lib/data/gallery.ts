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
  },
  "Cities/Dallas with the interstate and downtown.jpg": {
    alt: "Dallas skyline and interstate infrastructure leading into downtown",
    caption: "Dallas with the Interstate and Downtown",
    description:
      "A city-scale view of Dallas where freeway infrastructure leads the eye into the downtown skyline, tying urban growth to movement and metropolitan scale.",
    location: "Dallas, Texas",
    theme: "Interstate skyline",
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

  // ── Iconic American photographs — batch 2 (Military, public domain) ──
  "Military/Iconic/The USS Shaw Exploding at Pearl Harbor.jpg": {
    alt: "The destroyer USS Shaw's forward magazine erupting during the attack on Pearl Harbor",
    caption: "The USS Shaw Exploding at Pearl Harbor (1941)",
    description:
      "The dramatic explosion of the USS Shaw during the Japanese attack on Pearl Harbor became an emblem of the day that drew America into World War II.",
    location: "Pearl Harbor, Hawaii",
    theme: "Day of infamy",
    featured: true,
  },
  "Military/Iconic/The Doolittle Raiders on the USS Hornet.jpg": {
    alt: "A B-25 bomber lifting off from the deck of the USS Hornet during the Doolittle Raid",
    caption: "The Doolittle Raid (1942)",
    description:
      "In April 1942, Jimmy Doolittle led B-25s launched from the USS Hornet to strike Tokyo — a daring, morale-lifting blow months after Pearl Harbor.",
    location: "Pacific Ocean",
    theme: "Carrier-launched daring",
  },
  "Military/Iconic/MacArthur Wading Ashore at Leyte.jpg": {
    alt: "General Douglas MacArthur and staff wading ashore through the surf at Leyte",
    caption: "MacArthur Wading Ashore at Leyte (1944)",
    description:
      "Douglas MacArthur strides through the surf at Leyte in October 1944, fulfilling his 1942 pledge to return to the Philippines.",
    location: "Leyte, Philippines",
    theme: "“I have returned”",
  },
  "Military/Iconic/Teddy Roosevelt and the Rough Riders.jpg": {
    alt: "Theodore Roosevelt with the Rough Riders and the U.S. flag after the charge up San Juan Hill",
    caption: "Roosevelt and the Rough Riders (1898)",
    description:
      "Theodore Roosevelt's Rough Riders and their charge up the San Juan Heights made him a national hero during the Spanish–American War.",
    location: "Santiago de Cuba",
    theme: "Volunteer cavalry",
  },
  "Military/Iconic/Navajo Code Talkers.jpg": {
    alt: "Two Navajo Marine code talkers operating a field radio in the jungle",
    caption: "Navajo Code Talkers (1943)",
    description:
      "Navajo Code Talkers used their language to create a battlefield code the enemy never broke, serving with the Marines across the Pacific theater.",
    location: "Pacific theater",
    theme: "Unbreakable code",
  },
  "Military/Iconic/The Situation Room During Operation Neptune Spear.jpg": {
    alt: "President Obama and national security officials watching the bin Laden raid from the Situation Room",
    caption: "The Situation Room, Operation Neptune Spear (2011)",
    description:
      "Pete Souza's photograph captured the tense minutes of the bin Laden raid on May 1, 2011, as leaders watched from the White House Situation Room.",
    location: "The White House, Washington, D.C.",
    theme: "The raid, watched live",
    featured: true,
  },
  "Military/Iconic/The B-2 Spirit Stealth Bomber.jpg": {
    alt: "A B-2 Spirit flying-wing stealth bomber in flight above the ocean",
    caption: "The B-2 Spirit Stealth Bomber",
    description:
      "Northrop's B-2 Spirit, a flying-wing design, represented a leap in low-observable technology and long-range strategic airpower.",
    location: "United States Air Force",
    theme: "Stealth airpower",
  },
  "Military/Iconic/The Great White Fleet.jpg": {
    alt: "U.S. Navy battleships of the Great White Fleet anchored in harbor during their global cruise",
    caption: "The Great White Fleet (1907)",
    description:
      "Theodore Roosevelt sent the white-hulled U.S. battleship fleet around the world in 1907–09 to display American naval power and reach.",
    location: "On its global cruise",
    theme: "Naval power projection",
  },
  "Military/Iconic/General George S. Patton.png": {
    alt: "General George S. Patton in the field during the 1944 campaign in Europe",
    caption: "General George S. Patton (1944)",
    description:
      "George S. Patton, among the most aggressive Allied commanders, led the Third Army's rapid drive across France in 1944.",
    location: "France",
    theme: "Armored spearhead",
  },
  "Military/Iconic/General Norman Schwarzkopf.jpg": {
    alt: "General Norman Schwarzkopf arriving by helicopter in the Gulf during Operation Desert Storm",
    caption: "General Norman Schwarzkopf, Desert Storm (1991)",
    description:
      "“Stormin' Norman” Schwarzkopf commanded coalition forces whose sweeping flanking maneuver routed the Iraqi army in 100 hours during the Gulf War.",
    location: "Persian Gulf",
    theme: "Decisive command",
  },
  "Military/Iconic/U.S. Army Rangers at Pointe du Hoc.jpg": {
    alt: "U.S. Army Rangers with ropes and ladders at the cliffs of Pointe du Hoc on D-Day",
    caption: "U.S. Army Rangers at Pointe du Hoc (1944)",
    description:
      "The 2nd Ranger Battalion scaled the 100-foot cliffs of Pointe du Hoc under fire on June 6, 1944, to silence German guns overlooking the landings.",
    location: "Pointe du Hoc, Normandy, France",
    theme: "Scaling the cliffs",
  },
  "Military/Iconic/The USS Nimitz Supercarrier.jpg": {
    alt: "An F/A-18 launching from the flight deck of the nuclear supercarrier USS Nimitz",
    caption: "The USS Nimitz Supercarrier",
    description:
      "The USS Nimitz, lead ship of its class of nuclear supercarriers, projects American airpower across the globe from a floating airfield.",
    location: "At sea",
    theme: "Power at sea",
  },

  // ── Iconic American photographs — batch 3 (Science & Space, public domain) ──
  "Science/Iconic/Thomas Edison and the Light Bulb.jpg": {
    alt: "Portrait of a young Thomas Edison seated beside an early phonograph",
    caption: "Thomas Edison (1878)",
    description:
      "Thomas Edison, photographed with his phonograph, whose practical incandescent bulb and power systems would electrify the modern world.",
    location: "Menlo Park, New Jersey",
    theme: "The Wizard of Menlo Park",
    featured: true,
  },
  "Science/Iconic/Nikola Tesla in his Colorado Springs Laboratory.jpg": {
    alt: "Nikola Tesla sitting calmly amid massive electrical arcs in his Colorado Springs laboratory",
    caption: "Nikola Tesla in his Colorado Springs Laboratory (1899)",
    description:
      "Tesla's famous 1899 publicity photograph, sitting amid arcs from his magnifying transmitter, dramatized his pioneering electrical experiments.",
    location: "Colorado Springs, Colorado",
    theme: "Master of lightning",
  },
  "Science/Iconic/Robert Goddard and the First Liquid-Fueled Rocket.jpg": {
    alt: "Robert Goddard standing beside his 1926 liquid-fueled rocket on its launch frame in the snow",
    caption: "Robert Goddard and the First Liquid-Fueled Rocket (1926)",
    description:
      "Robert Goddard launched the first liquid-fueled rocket on March 16, 1926 in Auburn, Massachusetts, founding modern rocketry.",
    location: "Auburn, Massachusetts",
    theme: "Father of rocketry",
  },
  "Technology/Iconic/ENIAC in Operation.jpg": {
    alt: "The ENIAC computer's panels, the first general-purpose electronic computer",
    caption: "ENIAC, the First Electronic Computer (1946)",
    description:
      "Unveiled at the University of Pennsylvania in 1946, ENIAC's 18,000 vacuum tubes performed thousands of calculations per second, opening the computing era.",
    location: "University of Pennsylvania, Philadelphia",
    theme: "Dawn of computing",
  },
  "Technology/Iconic/Grace Hopper and the Harvard Mark I.jpg": {
    alt: "Official U.S. Navy portrait of Commodore Grace Hopper",
    caption: "Dr. Grace Hopper, Computing Pioneer",
    description:
      "Grace Hopper programmed the Harvard Mark I in the 1940s and went on to pioneer compilers and the COBOL language as a U.S. Navy officer.",
    location: "United States Navy",
    theme: "Pioneer of programming",
  },
  "USA from Space/Von Braun and the Saturn V F-1 Engines.jpg": {
    alt: "Wernher von Braun standing beside the five enormous F-1 engines of the Saturn V first stage",
    caption: "Von Braun and the Saturn V F-1 Engines (1969)",
    description:
      "Wernher von Braun stands beside the five F-1 engines of the Saturn V's first stage — the propulsion that sent Apollo to the Moon.",
    location: "Marshall Space Flight Center, Alabama",
    theme: "Power to reach the Moon",
  },
  "USA from Space/Explorer 1 Trio Holding the Satellite.jpg": {
    alt: "Pickering, Van Allen, and von Braun holding a model of Explorer 1 over their heads",
    caption: "Pickering, Van Allen, and von Braun with Explorer 1 (1958)",
    description:
      "The three scientists hoist a model of Explorer 1, the first U.S. satellite, which discovered the Van Allen radiation belts in 1958.",
    location: "Washington, D.C.",
    theme: "America reaches orbit",
  },
  "USA from Space/Hubble Space Telescope Being Repaired.jpg": {
    alt: "An astronaut servicing the Hubble Space Telescope on a spacewalk with Earth below",
    caption: "Servicing the Hubble Space Telescope (1993)",
    description:
      "The 1993 servicing mission corrected Hubble's optics, rescuing the telescope that has since transformed astronomy.",
    location: "Low Earth orbit",
    theme: "Repair in orbit",
  },
  "USA from Space/The James Webb Telescope First Deep Field.jpg": {
    alt: "The James Webb Space Telescope's first deep field, thousands of galaxies in infrared",
    caption: "Webb's First Deep Field (2022)",
    description:
      "Webb's first deep field, released in 2022, revealed thousands of galaxies billions of light-years away in unprecedented detail.",
    location: "Galaxy cluster SMACS 0723",
    theme: "The deep universe",
    featured: true,
  },
  "USA from Space/The First Image of a Black Hole.jpg": {
    alt: "The first direct image of a black hole, the glowing ring around M87's shadow",
    caption: "The First Image of a Black Hole (2019)",
    description:
      "In 2019 the Event Horizon Telescope produced the first direct image of a black hole's shadow, at the heart of galaxy M87.",
    location: "Galaxy M87",
    theme: "Seeing the unseeable",
  },
  "History/Oppenheimer and Groves at the Trinity Site.jpg": {
    alt: "Oppenheimer and General Groves inspecting the twisted remains of the Trinity test tower",
    caption: "Oppenheimer and Groves at the Trinity Site (1945)",
    description:
      "Oppenheimer and General Leslie Groves examine the remains of the Trinity test tower — the scientific and military faces of the Manhattan Project.",
    location: "Trinity Site, New Mexico",
    theme: "The atomic age",
  },
  "USA from Space/SpaceX Falcon Dual Booster Landing.jpg": {
    alt: "Two SpaceX Falcon Heavy side boosters descending under power toward synchronized landings",
    caption: "SpaceX Falcon Dual Booster Landing (2018)",
    description:
      "The Falcon Heavy demonstration in 2018 returned its twin side boosters to synchronized landings, advancing reusable rocketry.",
    location: "Cape Canaveral, Florida",
    theme: "Reusable rocketry",
    featured: true,
  },

  // ── Iconic American photographs — batch 4 (more Military, public domain) ──
  "Military/Iconic/The Chosin Reservoir Breakout.jpg": {
    alt: "U.S. Marines on a frozen ridge fighting out of encirclement at the Chosin Reservoir",
    caption: "The Chosin Reservoir Breakout (1950)",
    description:
      "Surrounded by Chinese forces in sub-zero conditions, the 1st Marine Division fought its way out of the Chosin Reservoir in late 1950 — an epic of the Korean War.",
    location: "Chosin Reservoir, North Korea",
    theme: "Frozen Chosin",
  },
  "Military/Iconic/Toppling the Statue of Saddam Hussein.jpg": {
    alt: "A statue of Saddam Hussein being pulled down in Firdos Square, Baghdad",
    caption: "Toppling the Statue of Saddam Hussein (2003)",
    description:
      "On April 9, 2003, U.S. Marines and Iraqis pulled down a large statue of Saddam Hussein in Firdos Square — a symbol of the regime's fall.",
    location: "Firdos Square, Baghdad, Iraq",
    theme: "A regime falls",
    featured: true,
  },
  "Military/Iconic/F-117 Nighthawks in Desert Storm.jpg": {
    alt: "An F-117 Nighthawk stealth fighter flying over snow-capped mountains",
    caption: "F-117 Nighthawk (Desert Storm, 1991)",
    description:
      "The faceted F-117 Nighthawk struck heavily defended targets in Baghdad in 1991, proving stealth airpower in combat during the Gulf War.",
    location: "United States Air Force",
    theme: "First in, unseen",
  },
  "Military/Iconic/Dead Confederate Sharpshooter Devils Den.jpg": {
    alt: "A fallen Confederate soldier behind a stone wall at Devil's Den, Gettysburg",
    caption: "Dead Confederate Sharpshooter, Devil's Den (1863)",
    description:
      "Alexander Gardner's somber Gettysburg photograph brought the human cost of the Civil War home to a nation that had never seen war so plainly.",
    location: "Gettysburg, Pennsylvania",
    theme: "The cost of war",
  },
  "Military/Iconic/Marines in the Battle of Fallujah.jpg": {
    alt: "U.S. Marines advancing with a Humvee through urban combat in Fallujah",
    caption: "Marines in the Battle of Fallujah (2004)",
    description:
      "The Second Battle of Fallujah in late 2004 was among the fiercest urban engagements fought by U.S. forces in the Iraq War.",
    location: "Fallujah, Iraq",
    theme: "Urban combat",
  },
  "Military/Iconic/The Highway of Death.jpg": {
    alt: "Destroyed military and civilian vehicles strewn along Highway 80 out of Kuwait",
    caption: "The Highway of Death (1991)",
    description:
      "Retreating Iraqi forces were struck on Highway 80 in February 1991; the wreckage became a stark image of the Gulf War's decisive close.",
    location: "Highway 80, Kuwait–Iraq",
    theme: "Decisive close",
  },
  "Military/Iconic/M1 Abrams Tanks into Baghdad.jpg": {
    alt: "An M1 Abrams main battle tank with its crew advancing in Iraq",
    caption: "M1 Abrams in Iraq (2003)",
    description:
      "The 'Thunder Runs' of April 2003 sent M1 Abrams tanks racing into Baghdad, collapsing organized resistance in the capital.",
    location: "Iraq",
    theme: "Armored spearhead",
  },
  "Military/Iconic/Minuteman III Test Launch.jpg": {
    alt: "A Minuteman III intercontinental ballistic missile launching at night",
    caption: "Minuteman III Test Launch",
    description:
      "Test launches of the Minuteman III from Vandenberg demonstrate the land-based leg of the U.S. nuclear deterrent triad.",
    location: "Vandenberg Space Force Base, California",
    theme: "The nuclear deterrent",
  },
  "Military/Iconic/U.S. Troops at the Pusan Perimeter.jpg": {
    alt: "U.S. soldiers in a foxhole overlooking a valley while defending the Pusan Perimeter",
    caption: "Defending the Pusan Perimeter (1950)",
    description:
      "American and allied forces held the Pusan Perimeter in 1950 against North Korean assault, buying time for the Inchon landing that turned the war.",
    location: "Pusan, South Korea",
    theme: "The last foothold",
  },

  // ── Iconic American photographs — batch 5 (Science & Technology, public domain) ──
  "Military/Iconic/Bell X-1 in Flight.jpg": {
    alt: "The Bell X-1 rocket plane in flight over mountains",
    caption: "Bell X-1 in Flight (1947)",
    description:
      "Chuck Yeager flew the bright-orange Bell X-1 past Mach 1 on October 14, 1947 over the Mojave — the dawn of supersonic flight.",
    location: "Muroc Army Air Field, California",
    theme: "Breaking the sound barrier",
  },
  "Science/Iconic/Lawrence and the Cyclotron.jpg": {
    alt: "Ernest Lawrence's Berkeley team gathered around the large cyclotron magnet",
    caption: "Lawrence and the Cyclotron (1930s)",
    description:
      "Ernest Lawrence's cyclotron, for which he won the 1939 Nobel Prize, launched the era of big-machine physics at Berkeley.",
    location: "Berkeley, California",
    theme: "Big-machine physics",
  },
  "Science/Iconic/Glenn Seaborg and the Periodic Table.jpg": {
    alt: "Glenn Seaborg standing beside a periodic table, pointing to the heavy elements",
    caption: "Glenn Seaborg and the Periodic Table",
    description:
      "Glenn Seaborg co-discovered plutonium and other transuranium elements, reshaping the periodic table; element 106, seaborgium, bears his name.",
    location: "Berkeley, California",
    theme: "Expanding the elements",
  },
  "Science/Iconic/The LIGO Facility.jpg": {
    alt: "Aerial view of the LIGO Hanford gravitational-wave observatory with its long arm",
    caption: "The LIGO Facility (2015)",
    description:
      "LIGO's twin observatories detected gravitational waves from colliding black holes in 2015, confirming Einstein and opening a new astronomy.",
    location: "Hanford, Washington",
    theme: "Hearing spacetime",
  },
  "Technology/Iconic/Philo Farnsworth and Electronic Television.jpg": {
    alt: "Portrait of a young Philo Farnsworth, inventor of all-electronic television",
    caption: "Philo Farnsworth (1924)",
    description:
      "Philo Farnsworth demonstrated the first fully electronic television system in the late 1920s, the basis of broadcast TV.",
    location: "San Francisco, California",
    theme: "Inventor of television",
  },
  "Technology/Iconic/The Hollerith Census Machine.jpg": {
    alt: "Period engraving of an operator using Hollerith electrical counting machines for the 1890 census",
    caption: "The Hollerith Census Machine (1890)",
    description:
      "Herman Hollerith's punch-card tabulator processed the 1890 U.S. Census in record time; his company became part of IBM.",
    location: "Washington, D.C.",
    theme: "Punch-card computing",
  },
  "Technology/Iconic/Bell Opening the New York to Chicago Line.jpg": {
    alt: "Alexander Graham Bell speaking into a telephone before a crowd to open a long-distance line",
    caption: "Bell Opening the New York–Chicago Line (1892)",
    description:
      "Alexander Graham Bell placed the ceremonial first call on the New York–Chicago line in 1892, demonstrating the reach of the telephone network he had invented.",
    location: "New York City",
    theme: "Long-distance telephony",
  },

  // ── Iconic American photographs — batch 6 (Economy & general Americana, public domain) ──
  "History/The Driving of the Golden Spike.jpg": {
    alt: "Railroad workers and locomotives meeting at Promontory Summit for the golden spike ceremony",
    caption: "The Driving of the Golden Spike (1869)",
    description:
      "Andrew Russell's 'East and West Shaking Hands' at Promontory Summit, May 10, 1869, marked completion of the transcontinental railroad — knitting the continent together by rail.",
    location: "Promontory Summit, Utah",
    theme: "A continent joined",
    featured: true,
  },
  "Infrastructure/Construction of the Hoover Dam.jpg": {
    alt: "High-scalers at work on the canyon walls during construction of Hoover Dam",
    caption: "Construction of the Hoover Dam (1931–1936)",
    description:
      "Built across the Colorado River during the Depression, Hoover Dam was an engineering triumph that tamed the river, powered the Southwest, and symbolized American scale.",
    location: "Black Canyon, Nevada–Arizona",
    theme: "Taming the Colorado",
  },
  "Economy/Ford Model T Assembly Line.jpg": {
    alt: "A Model T body being lowered onto a chassis on Ford's moving assembly line",
    caption: "Henry Ford's Model T Assembly Line (c. 1913)",
    description:
      "Ford's Highland Park line industrialized car-making, cutting build time from hours to minutes and putting the automobile within reach of ordinary workers.",
    location: "Highland Park, Michigan",
    theme: "America on wheels",
    featured: true,
  },
  "History/Reagan at the Brandenburg Gate.jpg": {
    alt: "President Reagan giving his Berlin Wall speech at the Brandenburg Gate",
    caption: "Reagan at the Brandenburg Gate (1987)",
    description:
      "Ronald Reagan's June 12, 1987 challenge — 'Mr. Gorbachev, tear down this wall!' — framed the closing argument of the Cold War; the Wall fell two years later.",
    location: "Brandenburg Gate, West Berlin",
    theme: "Tear down this wall",
  },
  "US Buildings/Construction of the Empire State Building.jpg": {
    alt: "An ironworker seated on a steel beam high above Manhattan with the Chrysler Building beyond",
    caption: "Construction of the Empire State Building (1930)",
    description:
      "Lewis Hine's photographs of the Empire State Building's workers celebrated the men who raised 102 stories in just over a year at the height of the Depression.",
    location: "Midtown Manhattan, New York City",
    theme: "Raising the skyline",
    featured: true,
  },
  "Infrastructure/Completion of the Panama Canal.jpg": {
    alt: "The Culebra Cut excavation during construction of the Panama Canal",
    caption: "Completion of the Panama Canal (1914)",
    description:
      "The American-built Panama Canal opened in 1914 after a decade of engineering and public-health triumphs, transforming global maritime trade.",
    location: "Isthmus of Panama",
    theme: "Two oceans joined",
  },
  "History/Mount Rushmore Under Construction.jpg": {
    alt: "Workers on ropes carving the face of George Washington into Mount Rushmore",
    caption: "Mount Rushmore Under Construction (c. 1936)",
    description:
      "Gutzon Borglum's crews drilled and carved the 60-foot heads of Washington, Jefferson, Roosevelt, and Lincoln into the Black Hills granite between 1927 and 1941.",
    location: "Black Hills, South Dakota",
    theme: "Carving the presidents",
  },
  "History/Reagan and Thatcher.jpg": {
    alt: "Ronald and Nancy Reagan with Margaret Thatcher",
    caption: "Reagan and Thatcher",
    description:
      "Reagan and British PM Margaret Thatcher embodied the close Anglo-American alliance of the late Cold War.",
    location: "London, United Kingdom",
    theme: "The special relationship",
  },

  // ── Iconic American photographs — batch 7 (Culture, Quality of Life & Constitution, public domain) ──
  "History/MLK at the Lincoln Memorial.jpg": {
    alt: "Martin Luther King Jr. delivering the I Have a Dream speech at a bank of microphones",
    caption: "Martin Luther King Jr. at the Lincoln Memorial (1963)",
    description:
      "Martin Luther King Jr. delivered his 'I Have a Dream' speech at the March on Washington on August 28, 1963 — a turning point of the civil-rights movement.",
    location: "Lincoln Memorial, Washington, D.C.",
    theme: "I have a dream",
    featured: true,
  },
  "Culture/Famous People/Elvis Meeting Nixon.jpg": {
    alt: "Elvis Presley shaking hands with President Richard Nixon in the Oval Office",
    caption: "Elvis Meets Nixon (1970)",
    description:
      "Elvis Presley's surreal 1970 White House visit produced what became the most-requested photograph in the U.S. National Archives.",
    location: "The White House, Washington, D.C.",
    theme: "The King and the President",
  },
  "History/Migrant Mother.jpg": {
    alt: "Dorothea Lange's portrait of Florence Owens Thompson and her children",
    caption: "Migrant Mother (1936)",
    description:
      "Dorothea Lange's portrait for the Farm Security Administration became the defining image of the Great Depression and American documentary photography.",
    location: "Nipomo, California",
    theme: "Face of the Depression",
    featured: true,
  },
  "History/The Kitchen Debate.jpg": {
    alt: "Nixon and Khrushchev debating beside a model American kitchen in Moscow",
    caption: "The Kitchen Debate (1959)",
    description:
      "At the 1959 American National Exhibition in Moscow, Vice President Nixon and Khrushchev debated the merits of capitalism amid a model American kitchen.",
    location: "Moscow, USSR",
    theme: "Capitalism on display",
  },
  "History/Trump Inauguration.jpg": {
    alt: "Donald Trump greeting Barack Obama at the 2017 presidential inauguration",
    caption: "President Trump's Inauguration (2017)",
    description:
      "Donald Trump was sworn in as the 45th President of the United States on the West Front of the Capitol on January 20, 2017.",
    location: "U.S. Capitol, Washington, D.C.",
    theme: "Peaceful transfer of power",
  },
  "US Buildings/Capitol Dome Under Construction.jpg": {
    alt: "The cast-iron dome of the U.S. Capitol partly built and surrounded by scaffolding",
    caption: "The Capitol Dome Under Construction (1861)",
    description:
      "Lincoln insisted construction of the Capitol's new cast-iron dome continue through the Civil War as a symbol that the Union would endure; it was completed in 1863.",
    location: "Washington, D.C.",
    theme: "The Union endures",
  },
  "History/Antonin Scalia.jpg": {
    alt: "Official Supreme Court portrait of Justice Antonin Scalia",
    caption: "Justice Antonin Scalia",
    description:
      "Antonin Scalia, appointed in 1986, became one of the most influential voices for originalism and textualism in American law.",
    location: "Supreme Court, Washington, D.C.",
    theme: "Originalism",
  },

  // ── Iconic American photographs — batch 8 (user-supplied) ──
  "Technology/Iconic/1980s Family with their First Home Computer.webp": {
    alt: "The personal computer enters the home.",
    caption: "A 1980s Family with their First Apple II or IBM PC (1980s)",
    description:
      "Affordable machines like the Apple II and IBM PC brought computing into American homes in the 1980s, previewing the digital age.",
    location: "United States",
  },
  "American Life/Iconic/Mother Using an Automatic Washing Machine.jpg": {
    alt: "Household appliances transform domestic work.",
    caption: "A Mid-Century Mother Using an Automatic Washing Machine (1950s)",
    description:
      "Affordable automatic washers and other appliances dramatically cut domestic labor and reshaped American home life in the 1950s.",
    location: "United States",
  },
  "Military/Iconic/SR-71 Blackbird in Flight.jpg": {
    alt: "The fastest air-breathing crewed aircraft ever built.",
    caption: "The SR-71 Blackbird in Flight (c. 1960s)",
    description:
      "Lockheed's SR-71 reconnaissance jet cruised above Mach 3 at the edge of space, an icon of Cold War aerospace engineering from Skunk Works.",
    location: "United States",
  },
  "Housing/Aerial View of Levittown.png": {
    alt: "Rows of affordable new suburban homes.",
    caption: "Aerial View of Levittown, New York (1950s)",
    description:
      "Levittown's mass-produced houses made homeownership attainable for millions of postwar families and defined the American suburb.",
    location: "Long Island, New York",
  },
  "Culture/Famous People/Andy Warhol with Campbells Soup Cans.webp": {
    alt: "The pop-art icon beside his most famous work.",
    caption: "Andy Warhol with his Campbell's Soup Cans (1964)",
    description:
      "Andy Warhol's Campbell's Soup Cans (1962) made consumer packaging into fine art and made Warhol the face of American Pop.",
    location: "New York City",
  },
  "Science/Iconic/Penzias and Wilson at the Holmdel Horn Antenna.jpg": {
    alt: "The antenna that heard the Big Bang's echo.",
    caption: "Arno Penzias and Robert Wilson at the Holmdel Horn Antenna (1965)",
    description:
      "Penzias and Wilson detected the cosmic microwave background with the Holmdel horn antenna in 1965, confirming the Big Bang and winning the Nobel Prize.",
    location: "Holmdel, New Jersey",
  },
  "Culture/Famous People/Schwarzenegger at Muscle Beach.jpeg": {
    alt: "The bodybuilding champion who became a movie star.",
    caption: "Arnold Schwarzenegger Posing at Muscle Beach (1970s)",
    description:
      "Arnold Schwarzenegger's 1970s Muscle Beach training and posing in California launched a bodybuilding boom and a Hollywood career.",
    location: "Venice Beach, California",
  },
  "Infrastructure/Golden Gate Bridge Nearing Completion.jpg": {
    alt: "The great suspension span closes over the strait.",
    caption: "The Golden Gate Bridge Nearing Completion (1936)",
    description:
      "Photographed during its 1933–1937 construction, the Golden Gate Bridge became an enduring emblem of American engineering and the city of San Francisco.",
    location: "San Francisco, California",
  },
  "USA from Space/Carl Sagan and the Viking Mars Lander.jpg": {
    alt: "Sagan beside a model of the Mars lander.",
    caption: "Carl Sagan and the Viking Mars Lander (1976)",
    description:
      "Carl Sagan, popularizer of science and a Viking team member, helped bring the 1976 Mars landings to a global public.",
    location: "Jet Propulsion Laboratory, California",
  },
  "American Life/Iconic/Children Receiving the Salk Polio Vaccine.jpeg": {
    alt: "Schoolchildren line up for the polio shot.",
    caption: "Children Receiving the Salk Polio Vaccine (1955)",
    description:
      "The 1955 national rollout of the Salk vaccine to schoolchildren ended the annual terror of polio epidemics across America.",
    location: "United States",
  },
  "Technology/Iconic/Landing of the Transatlantic Telegraph Cable.jpg": {
    alt: "Ships lay the first cable across the Atlantic.",
    caption: "The First Transatlantic Telegraph Cable Fleet (1858)",
    description:
      "The 1858 transatlantic telegraph cable, backed by American financier Cyrus Field, briefly connected continents and previewed instant global communication.",
    location: "Atlantic Ocean",
  },
  "Science/Iconic/Damadian and the First MRI Scanner.webp": {
    alt: "The inventor beside 'Indomitable,' the first MRI machine.",
    caption: "Raymond Damadian and the First MRI Scanner (1977)",
    description:
      "Raymond Damadian produced the first MRI scan of a human body in 1977 with his machine 'Indomitable,' founding a pillar of modern medicine.",
    location: "Brooklyn, New York",
  },
  "American Life/Iconic/Loading the Car for a Road Trip.jpg": {
    alt: "The family car packed for vacation.",
    caption: "Loading Up the Station Wagon for a Road Trip (1960s)",
    description:
      "The wood-paneled station wagon, loaded for a family road trip, captured the mobility and leisure of postwar America.",
    location: "United States",
  },
  "American Life/Iconic/Family Gathered Around the Television.jpg": {
    alt: "The new hearth of the American home.",
    caption: "A Family Gathered Around a Black-and-White Television Set (1950s)",
    description:
      "Television swept into American living rooms in the 1950s, reshaping family life, news, and shared culture.",
    location: "United States",
  },
  "Military/Iconic/General Matthew Ridgway in Korea.png": {
    alt: "The general who steadied the Eighth Army.",
    caption: "General Matthew Ridgway at the Front Lines in Korea (1951)",
    description:
      "Taking command in late 1950, Matthew Ridgway revitalized the Eighth Army and stabilized the Korean front in 1951, often visiting forward positions himself.",
    location: "Korea",
  },
  "American Life/Iconic/1950s Drive-In Movie Theater.jpg": {
    alt: "Cars lined up beneath the big outdoor screen.",
    caption: "A 1950s Drive-In Movie Theater (1950s)",
    description:
      "The drive-in theater married two American loves — cars and movies — into a defining leisure pastime of the 1950s.",
    location: "United States",
  },
  "Science/Iconic/Einstein and Hubble at Mount Wilson.webp": {
    alt: "Theory meets observation atop Mount Wilson.",
    caption: "Albert Einstein and Edwin Hubble at Mount Wilson (1931)",
    description:
      "Einstein visited Hubble at Mount Wilson in 1931 to see the evidence for cosmic expansion that reshaped his view of the universe.",
    location: "Mount Wilson Observatory, California",
  },
  "Culture/Sports/Jesse Owens at the Berlin Olympics.jpg": {
    alt: "Owens wins four golds before a Nazi crowd.",
    caption: "Jesse Owens at the Berlin Olympics (1936)",
    description:
      "Jesse Owens won four gold medals at the 1936 Berlin Olympics, a rebuke to Nazi racial ideology and a landmark in American sports.",
    location: "Berlin, Germany",
  },
  "Technology/Iconic/Jobs and Wozniak with the Apple I.jpg": {
    alt: "Two founders and the computer that started Apple.",
    caption: "Jobs and Wozniak with the Apple I (1976)",
    description:
      "Steve Jobs and Steve Wozniak built and sold the hand-assembled Apple I in 1976, launching the company and helping spark the personal-computer industry.",
    location: "Los Altos, California",
  },
  "Culture/Cinema/John Travolta in Saturday Night Fever.jpg": {
    alt: "The white-suit, finger-to-the-sky disco pose.",
    caption: "John Travolta Striking the Pose in Saturday Night Fever (1977)",
    description:
      "John Travolta's pose in 'Saturday Night Fever' (1977) became the emblem of the disco era and 1970s pop culture.",
    location: "Brooklyn, New York City",
  },
  "Military/Iconic/Marines at the Battle of Khe Sanh.jpeg": {
    alt: "Marines hold a besieged combat base in Vietnam.",
    caption: "U.S. Marines at the Battle of Khe Sanh (1968)",
    description:
      "The 77-day siege of Khe Sanh in 1968 was one of the most intense engagements of the Vietnam War, sustained largely by aerial resupply.",
    location: "Khe Sanh, South Vietnam",
  },
  "History/Bush at Ground Zero with the Bullhorn.webp": {
    alt: "“I can hear you — and the people who knocked these buildings down will hear all of us soon.”",
    caption: "President George W. Bush at Ground Zero with the Bullhorn (2001)",
    description:
      "Standing on the rubble of the World Trade Center on September 14, 2001, Bush rallied rescue workers and a grieving nation three days after the attacks.",
    location: "World Trade Center site, New York City",
  },
  "Military/Iconic/Raising the Flag on Iwo Jima.jpg": {
    alt: "Six Marines raise the Stars and Stripes atop Mount Suribachi.",
    caption: "Raising the Flag on Iwo Jima (1945)",
    description:
      "Joe Rosenthal's photograph of the second flag-raising on Iwo Jima, February 23, 1945, became the most reproduced image of World War II and the model for the Marine Corps War Memorial.",
    location: "Mount Suribachi, Iwo Jima, Japan",
  },
  "USA from Space/Space Shuttle Columbia Maiden Voyage.jpg": {
    alt: "The first reusable spacecraft launches on STS-1.",
    caption: "Space Shuttle Columbia's Maiden Voyage (1981)",
    description:
      "Columbia lifted off on April 12, 1981 with John Young and Robert Crippen aboard, beginning three decades of Space Shuttle flight.",
    location: "Kennedy Space Center, Florida",
  },
  "Technology/Iconic/Steve Jobs Introducing the iPhone.jpg": {
    alt: "“An iPod, a phone, and an internet communicator.”",
    caption: "Steve Jobs Introducing the iPhone (2007)",
    description:
      "At Macworld on January 9, 2007, Steve Jobs unveiled the iPhone, redefining the smartphone and the mobile era.",
    location: "Moscone Center, San Francisco",
  },
  "American Life/Iconic/Suburban Backyard Barbecue.jpg": {
    alt: "Families gather around the grill.",
    caption: "The Suburban Backyard Barbecue (1950s)",
    description:
      "The backyard barbecue became a ritual of postwar suburban leisure and the growing American middle class.",
    location: "United States",
  },
  "Culture/Sports/The 1992 USA Basketball Dream Team.jpg": {
    alt: "The greatest team ever assembled, Barcelona 1992.",
    caption: "The 1992 USA Basketball Dream Team (1992)",
    description:
      "The first U.S. Olympic basketball team of NBA stars — Jordan, Magic, Bird and more — dominated the 1992 Barcelona Games and globalized the sport.",
    location: "Barcelona, Spain",
  },
  "Economy/The Sears Roebuck Catalog.jpeg": {
    alt: "The 'wish book' that mailed America its abundance.",
    caption: "The First Sears Roebuck Catalog of the Post-War Era (Post-war era)",
    description:
      "The Sears Roebuck catalog brought the full range of American consumer goods to every mailbox, a cornerstone of mid-century retail.",
    location: "United States",
  },
  "Economy/The Spindletop Gusher.jpg": {
    alt: "A 150-foot column of oil launches the Texas petroleum boom.",
    caption: "The Spindletop Gusher (1901)",
    description:
      "The Lucas Gusher at Spindletop near Beaumont blew in on January 10, 1901, flowing at unheard-of volumes and inaugurating the American oil age.",
    location: "Beaumont, Texas",
  },
  "American Life/Iconic/The Vagabonds Camping Trip.jpg": {
    alt: "Edison, Ford, Firestone, and Burroughs camp together.",
    caption: "The Vagabonds Camping Trip (1921)",
    description:
      "The self-styled 'Vagabonds' — Thomas Edison, Henry Ford, Harvey Firestone, and naturalist John Burroughs — took widely publicized motor-camping trips that celebrated American ingenuity and the open road.",
    location: "Eastern United States",
  },
  "Science/Iconic/Thomas Hunt Morgan in the Fly Room.jpeg": {
    alt: "The lab where genetics was born.",
    caption: "Thomas Hunt Morgan in the Fly Room (1910s)",
    description:
      "Thomas Hunt Morgan's Columbia 'Fly Room' established the chromosome theory of heredity using fruit flies, founding modern genetics.",
    location: "Columbia University, New York",
  },
  "Military/Iconic/Blue Angels over the USS Constitution.jpg": {
    alt: "The flight demonstration squadron over 'Old Ironsides'.",
    caption: "U.S. Navy Blue Angels Flying over the USS Constitution (1997)",
    description:
      "The Blue Angels roaring over the USS Constitution joined two enduring symbols of the U.S. Navy — its oldest commissioned warship and its precision flyers.",
    location: "Boston Harbor, Massachusetts",
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
  "Culture/Music/Carey at Edwards Air Force Base during the making of the I Still Believe music video in December 1998.jpg": {
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
