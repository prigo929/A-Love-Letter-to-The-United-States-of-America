/**
 * U.S. Major Infrastructure Networks Data
 * Interstates, Amtrak Rail Routes, Energy Transmission Grid
 */

export interface InfrastructureLine {
  id: string;
  name: string;
  category: "interstate" | "amtrak" | "grid";
  description: string;
  color: string;
  coordinates: [number, number][]; // LineString points [Long, Lat]
}

export const MAJOR_INFRASTRUCTURE_NETWORKS: InfrastructureLine[] = [
  // Interstate Highways
  {
    id: "i90",
    name: "Interstate 90 (Boston to Seattle)",
    category: "interstate",
    description: "The longest Interstate Highway in the US (3,020 miles), connecting Seattle to Boston.",
    color: "#f59e0b",
    coordinates: [
      [-122.3321, 47.6062], [-117.426, 47.6588], [-112.5361, 46.0038], [-108.5007, 45.7833],
      [-96.7311, 43.546], [-87.6298, 41.8781], [-81.6944, 41.4993], [-73.7562, 42.6526], [-71.0589, 42.3601],
    ],
  },
  {
    id: "i10",
    name: "Interstate 10 (Santa Monica to Jacksonville)",
    category: "interstate",
    description: "Major southern transcontinental Interstate highway spanning 2,460 miles from California to Florida.",
    color: "#f59e0b",
    coordinates: [
      [-118.4912, 34.0195], [-112.074, 33.4484], [-106.485, 31.7619], [-98.4936, 29.4241],
      [-95.3698, 29.7604], [-90.0715, 29.9511], [-84.2807, 30.4383], [-81.6557, 30.3322],
    ],
  },
  {
    id: "i95",
    name: "Interstate 95 (Miami to Maine)",
    category: "interstate",
    description: "The primary East Coast arterial highway connecting all major Atlantic seaboard megacities.",
    color: "#f59e0b",
    coordinates: [
      [-80.1918, 25.7617], [-81.6557, 30.3322], [-78.6382, 35.7796], [-77.0369, 38.9072],
      [-75.1652, 39.9526], [-74.006, 40.7128], [-71.0589, 42.3601], [-68.7778, 44.8012],
    ],
  },
  // Amtrak Rail Express Lines
  {
    id: "acela",
    name: "Amtrak Acela Express (Boston - NYC - DC)",
    category: "amtrak",
    description: "America's high-speed passenger rail service along the Northeast Corridor.",
    color: "#3b82f6",
    coordinates: [
      [-71.0589, 42.3601], [-72.9279, 41.3083], [-74.006, 40.7128], [-75.1652, 39.9526], [-77.0369, 38.9072],
    ],
  },
  {
    id: "empire-builder",
    name: "Amtrak Empire Builder (Chicago to Pacific Northwest)",
    category: "amtrak",
    description: "Historic transcontinental rail service passing through the North Dakota plains and Glacier National Park.",
    color: "#3b82f6",
    coordinates: [
      [-87.6298, 41.8781], [-93.09, 44.9537], [-100.7837, 46.8083], [-113.787, 48.7596], [-122.3321, 47.6062],
    ],
  },
  {
    id: "sunset-limited",
    name: "Amtrak Sunset Limited (New Orleans to Los Angeles)",
    category: "amtrak",
    description: "Southern cross-country passenger route traversing the bayous, Texas plains, and Southwest deserts.",
    color: "#3b82f6",
    coordinates: [
      [-90.0715, 29.9511], [-95.3698, 29.7604], [-98.4936, 29.4241], [-106.485, 31.7619], [-112.074, 33.4484], [-118.2437, 34.0522],
    ],
  },
];
