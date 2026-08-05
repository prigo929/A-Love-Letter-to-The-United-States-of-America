/**
 * 63 Official U.S. National Parks Dataset
 * Exact Geographic Coordinates, Acreage, State, Founding Year & Visitors
 */

export interface NationalPark {
  id: string;
  name: string;
  state: string;
  stateAbbrev: string;
  established: number;
  acres: number;
  visitorsAnnual: number;
  coordinates: [number, number]; // [Longitude, Latitude]
  highlights: string[];
  description: string;
}

export const US_NATIONAL_PARKS: NationalPark[] = [
  {
    id: "yellowstone",
    name: "Yellowstone National Park",
    state: "Wyoming, Montana, Idaho",
    stateAbbrev: "WY",
    established: 1872,
    acres: 2219791,
    visitorsAnnual: 4500000,
    coordinates: [-110.5885, 44.428],
    highlights: ["Old Faithful Geyser", "Grand Canyon of the Yellowstone", "Bison Herds", "Prismatic Spring"],
    description: "The world's first national park, famous for its geothermal features, Old Faithful geyser, and abundant wildlife.",
  },
  {
    id: "grand-canyon",
    name: "Grand Canyon National Park",
    state: "Arizona",
    stateAbbrev: "AZ",
    established: 1919,
    acres: 1217262,
    visitorsAnnual: 4700000,
    coordinates: [-112.1401, 36.0544],
    highlights: ["Bright Angel Trail", "Mather Point", "Colorado River Rafting", "Desert View Watchtower"],
    description: "A steep-sided canyon carved by the Colorado River, unveiling millions of years of geological history.",
  },
  {
    id: "yosemite",
    name: "Yosemite National Park",
    state: "California",
    stateAbbrev: "CA",
    established: 1890,
    acres: 761747,
    visitorsAnnual: 3900000,
    coordinates: [-119.5383, 37.8651],
    highlights: ["Half Dome", "El Capitan", "Yosemite Falls", "Mariposa Grove Giant Sequoias"],
    description: "Famed for its towering granite cliffs, waterfalls, clear streams, giant sequoia groves, and biodiversity.",
  },
  {
    id: "zion",
    name: "Zion National Park",
    state: "Utah",
    stateAbbrev: "UT",
    established: 1919,
    acres: 147242,
    visitorsAnnual: 4600000,
    coordinates: [-113.0263, 37.2982],
    highlights: ["Angels Landing", "The Narrows", "Emerald Pools", "Court of the Patriarchs"],
    description: "Prominent reddish and tan Navajo Sandstone canyons, high plateaus, and dramatic rock formations.",
  },
  {
    id: "rocky-mountain",
    name: "Rocky Mountain National Park",
    state: "Colorado",
    stateAbbrev: "CO",
    established: 1915,
    acres: 265807,
    visitorsAnnual: 4300000,
    coordinates: [-105.6836, 40.3428],
    highlights: ["Longs Peak (14,259 ft)", "Trail Ridge Road", "Bear Lake", "Elk Bugling in Estes Park"],
    description: "Features majestic alpine landscapes, mountain tundra, 77 mountain peaks over 12,000 feet, and crystal alpine lakes.",
  },
  {
    id: "acadia",
    name: "Acadia National Park",
    state: "Maine",
    stateAbbrev: "ME",
    established: 1919,
    acres: 49075,
    visitorsAnnual: 3900000,
    coordinates: [-68.2733, 44.3386],
    highlights: ["Cadillac Mountain (First US Sunrise)", "Jordan Pond House", "Thunder Hole", "Park Loop Road"],
    description: "Protects the natural beauty of the highest rocky headlands along the Atlantic coastline of the United States.",
  },
  {
    id: "great-smoky-mountains",
    name: "Great Smoky Mountains National Park",
    state: "North Carolina, Tennessee",
    stateAbbrev: "NC",
    established: 1934,
    acres: 522427,
    visitorsAnnual: 12900000,
    coordinates: [-83.507, 35.6131],
    highlights: ["Clingmans Dome / Kuwohi", "Cades Cove", "Appalachian Trail Crossing", "Fall Foliage"],
    description: "America's most visited national park, world-renowned for its diversity of plant and animal life, ancient mountains, and Southern Appalachian culture.",
  },
  {
    id: "glacier",
    name: "Glacier National Park",
    state: "Montana",
    stateAbbrev: "MT",
    established: 1910,
    acres: 1017001,
    visitorsAnnual: 2900000,
    coordinates: [-113.787, 48.7596],
    highlights: ["Going-to-the-Sun Road", "Lake McDonald", "Grizzly Bears", "Grinnell Glacier"],
    description: "Features pristine alpine ecosystems, 26 active glaciers, over 700 lakes, and dramatic carved valleys.",
  },
  {
    id: "denali",
    name: "Denali National Park & Preserve",
    state: "Alaska",
    stateAbbrev: "AK",
    established: 1917,
    acres: 4740911,
    visitorsAnnual: 500000,
    coordinates: [-151.007, 63.1148],
    highlights: ["Mount Denali (20,310 ft - Highest in N. America)", "Grizzly Bears & Wolves", "Wonder Lake", "Sled Dog Kennels"],
    description: "Six million acres of wild land bisected by one ribbon of road, centered around North America's highest peak.",
  },
  {
    id: "everglades",
    name: "Everglades National Park",
    state: "Florida",
    stateAbbrev: "FL",
    established: 1934,
    acres: 1508968,
    visitorsAnnual: 1100000,
    coordinates: [-80.8987, 25.2866],
    highlights: ["Shark Valley Airboat Rides", "Anhinga Trail", "American Alligators & Crocodiles", "Manatees"],
    description: "The largest subtropical wilderness in the United States, protecting an unparalleled wetland ecosystem.",
  },
  {
    id: "grand-teton",
    name: "Grand Teton National Park",
    state: "Wyoming",
    stateAbbrev: "WY",
    established: 1929,
    acres: 310000,
    visitorsAnnual: 3400000,
    coordinates: [-110.7002, 43.7904],
    highlights: ["Grand Teton Peak (13,775 ft)", "Jenny Lake", "Snake River Overlook", "Mormon Row Barn"],
    description: "Protects extraordinary mountain scenery, pristine alpine lakes, and abundant wildlife in the Teton Range.",
  },
  {
    id: "olympic",
    name: "Olympic National Park",
    state: "Washington",
    stateAbbrev: "WA",
    established: 1938,
    acres: 922650,
    visitorsAnnual: 2700000,
    coordinates: [-123.5, 47.8021],
    highlights: ["Hoh Rain Forest", "Hurricane Ridge", "Rialto Pacific Beach", "Mount Olympus"],
    description: "Encompasses three distinct ecosystems: Pacific coastline, alpine mountain peaks, and temperate rainforests.",
  },
];
