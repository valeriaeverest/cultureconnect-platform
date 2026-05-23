// Placeholder data for CultureConnect MVP

export interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  description: string;
  price_min: number;
  price_max: number;
  rating: number;
  available: boolean;
  image_url: string;
  match_score?: number;
}

export interface Event {
  id: string;
  company_id: string;
  vendor_id: string;
  vendor_name: string;
  event_date: string;
  time_slot: string;
  budget: number;
  status: "upcoming" | "completed" | "cancelled";
  nps_score: number | null;
}

export interface PulseSurvey {
  id: string;
  company_id: string;
  score: number;
  department: string;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  city: string;
  team_size: string;
  created_at: string;
}

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Austin Groove Collective",
    category: "Live music",
    city: "Austin TX",
    description: "A 5-piece band specializing in funk, soul, and jazz for corporate events. They bring the energy and keep the crowd moving all night.",
    price_min: 2500,
    price_max: 5000,
    rating: 4.9,
    available: true,
    image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
  },
  {
    id: "v2",
    name: "Taco Libre Food Truck",
    category: "Local food",
    city: "Austin TX",
    description: "Award-winning street tacos with locally sourced ingredients. Full catering setup with custom menus for teams of any size.",
    price_min: 1200,
    price_max: 3500,
    rating: 4.8,
    available: true,
    image_url: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&q=80",
  },
  {
    id: "v3",
    name: "Mindful Movements Studio",
    category: "Wellness",
    city: "Austin TX",
    description: "Corporate yoga and meditation sessions tailored for team building. Certified instructors bring mats, props, and zen vibes to your office.",
    price_min: 800,
    price_max: 2000,
    rating: 4.7,
    available: true,
    image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  },
  {
    id: "v4",
    name: "Barrel & Bloom Brewery",
    category: "Craft brewery",
    city: "Portland OR",
    description: "Private brewery tours and tasting experiences with a master brewer. Custom beer flights paired with local artisan cheeses.",
    price_min: 1500,
    price_max: 4000,
    rating: 4.9,
    available: true,
    image_url: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&q=80",
  },
  {
    id: "v5",
    name: "Canvas & Pour",
    category: "Art & crafts",
    city: "Portland OR",
    description: "Guided paint-and-sip sessions with professional artists. Perfect for team bonding with a creative twist. All supplies included.",
    price_min: 1000,
    price_max: 2500,
    rating: 4.6,
    available: true,
    image_url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
  },
  {
    id: "v6",
    name: "The Rolling Kitchen",
    category: "Local food",
    city: "San Francisco CA",
    description: "Farm-to-truck cuisine featuring seasonal California ingredients. Full-service catering with vegetarian, vegan, and gluten-free options.",
    price_min: 2000,
    price_max: 5500,
    rating: 4.8,
    available: true,
    image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
  },
  {
    id: "v7",
    name: "Heritage Beats DJ",
    category: "Live music",
    city: "San Francisco CA",
    description: "Professional DJ service blending modern hits with cultural music from around the world. Full sound and lighting setup included.",
    price_min: 1800,
    price_max: 3500,
    rating: 4.5,
    available: false,
    image_url: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&q=80",
  },
  {
    id: "v8",
    name: "Emerald City Ceramics",
    category: "Art & crafts",
    city: "Seattle WA",
    description: "Hands-on pottery workshops for teams. Learn wheel throwing and hand-building in a relaxed studio environment. Pieces are fired and delivered.",
    price_min: 1200,
    price_max: 3000,
    rating: 4.7,
    available: true,
    image_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
  },
  {
    id: "v9",
    name: "Pacific Wellness Co.",
    category: "Wellness",
    city: "Seattle WA",
    description: "On-site chair massage, sound baths, and breathwork sessions. Licensed therapists create a spa-like experience at your workplace.",
    price_min: 1500,
    price_max: 4000,
    rating: 4.9,
    available: true,
    image_url: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80",
  },
  {
    id: "v10",
    name: "Brooklyn Strings Quartet",
    category: "Live music",
    city: "New York NY",
    description: "Classical and contemporary string quartet for elegant corporate events. From cocktail hours to full evening performances.",
    price_min: 3000,
    price_max: 7000,
    rating: 4.8,
    available: true,
    image_url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&q=80",
  },
  {
    id: "v11",
    name: "Windy City BBQ Co.",
    category: "Local food",
    city: "Chicago IL",
    description: "Authentic Chicago-style BBQ catering with smoker on-site. Slow-cooked brisket, ribs, and all the fixings for your team.",
    price_min: 1800,
    price_max: 4500,
    rating: 4.7,
    available: true,
    image_url: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
  },
  {
    id: "v12",
    name: "Sunset Sounds LA",
    category: "Live music",
    city: "Los Angeles CA",
    description: "Acoustic duo/trio performing indie folk and soft rock. Perfect for outdoor happy hours and rooftop events under the California sky.",
    price_min: 2000,
    price_max: 4000,
    rating: 4.6,
    available: true,
    image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
  },
  {
    id: "v13",
    name: "Bean & Barley Boston",
    category: "Craft brewery",
    city: "Boston MA",
    description: "Craft beer and artisan coffee pop-up experiences. Interactive brewing demos paired with local pastries and snacks.",
    price_min: 1000,
    price_max: 2800,
    rating: 4.5,
    available: true,
    image_url: "https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=600&q=80",
  },
  {
    id: "v14",
    name: "Mile High Team Builders",
    category: "Team building",
    city: "Denver CO",
    description: "Outdoor adventure team-building experiences: ropes courses, scavenger hunts, and collaborative challenges in the Colorado mountains.",
    price_min: 2500,
    price_max: 6000,
    rating: 4.8,
    available: true,
    image_url: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=80",
  },
  {
    id: "v15",
    name: "Virtual Vibes Studio",
    category: "Interactive workshop",
    city: "Remote/Virtual",
    description: "Engaging virtual team experiences: cooking classes, trivia nights, escape rooms, and creative workshops all hosted over Zoom.",
    price_min: 500,
    price_max: 1500,
    rating: 4.4,
    available: true,
    image_url: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&q=80",
  },
  {
    id: "v16",
    name: "Oaxacan Heritage Kitchen",
    category: "Cultural heritage",
    city: "Austin TX",
    description: "Authentic Oaxacan cooking class and cultural storytelling experience. Learn traditional mole recipes while hearing stories of Mexican heritage.",
    price_min: 1500,
    price_max: 3500,
    rating: 4.9,
    available: true,
    image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
  },
];

export const mockEvents: Event[] = [
  {
    id: "e1",
    company_id: "c1",
    vendor_id: "v1",
    vendor_name: "Austin Groove Collective",
    event_date: "2026-06-15",
    time_slot: "Happy Hour 4-6pm",
    budget: 4000,
    status: "upcoming",
    nps_score: null,
  },
  {
    id: "e2",
    company_id: "c1",
    vendor_id: "v3",
    vendor_name: "Mindful Movements Studio",
    event_date: "2026-06-22",
    time_slot: "Luncheon 11:30-1:30",
    budget: 1500,
    status: "upcoming",
    nps_score: null,
  },
  {
    id: "e3",
    company_id: "c1",
    vendor_id: "v2",
    vendor_name: "Taco Libre Food Truck",
    event_date: "2026-05-10",
    time_slot: "Luncheon 11:30-1:30",
    budget: 2500,
    status: "completed",
    nps_score: 72,
  },
  {
    id: "e4",
    company_id: "c1",
    vendor_id: "v5",
    vendor_name: "Canvas & Pour",
    event_date: "2026-04-28",
    time_slot: "Afternoon Blend 2-4pm",
    budget: 1800,
    status: "completed",
    nps_score: 65,
  },
  {
    id: "e5",
    company_id: "c1",
    vendor_id: "v4",
    vendor_name: "Barrel & Bloom Brewery",
    event_date: "2026-04-05",
    time_slot: "Happy Hour 4-6pm",
    budget: 3000,
    status: "completed",
    nps_score: 78,
  },
  {
    id: "e6",
    company_id: "c1",
    vendor_id: "v16",
    vendor_name: "Oaxacan Heritage Kitchen",
    event_date: "2026-03-20",
    time_slot: "Luncheon 11:30-1:30",
    budget: 2800,
    status: "completed",
    nps_score: 82,
  },
];

export const mockPulseSurveys: PulseSurvey[] = [
  { id: "ps1", company_id: "c1", score: 62, department: "Engineering", created_at: "2026-01-15" },
  { id: "ps2", company_id: "c1", score: 58, department: "Marketing", created_at: "2026-01-15" },
  { id: "ps3", company_id: "c1", score: 71, department: "Sales", created_at: "2026-01-15" },
  { id: "ps4", company_id: "c1", score: 65, department: "Design", created_at: "2026-01-15" },
  { id: "ps5", company_id: "c1", score: 60, department: "HR", created_at: "2026-01-15" },
  { id: "ps6", company_id: "c1", score: 66, department: "Engineering", created_at: "2026-02-15" },
  { id: "ps7", company_id: "c1", score: 61, department: "Marketing", created_at: "2026-02-15" },
  { id: "ps8", company_id: "c1", score: 73, department: "Sales", created_at: "2026-02-15" },
  { id: "ps9", company_id: "c1", score: 68, department: "Design", created_at: "2026-02-15" },
  { id: "ps10", company_id: "c1", score: 63, department: "HR", created_at: "2026-02-15" },
  { id: "ps11", company_id: "c1", score: 70, department: "Engineering", created_at: "2026-03-15" },
  { id: "ps12", company_id: "c1", score: 64, department: "Marketing", created_at: "2026-03-15" },
  { id: "ps13", company_id: "c1", score: 75, department: "Sales", created_at: "2026-03-15" },
  { id: "ps14", company_id: "c1", score: 72, department: "Design", created_at: "2026-03-15" },
  { id: "ps15", company_id: "c1", score: 67, department: "HR", created_at: "2026-03-15" },
  { id: "ps16", company_id: "c1", score: 74, department: "Engineering", created_at: "2026-04-15" },
  { id: "ps17", company_id: "c1", score: 68, department: "Marketing", created_at: "2026-04-15" },
  { id: "ps18", company_id: "c1", score: 77, department: "Sales", created_at: "2026-04-15" },
  { id: "ps19", company_id: "c1", score: 75, department: "Design", created_at: "2026-04-15" },
  { id: "ps20", company_id: "c1", score: 71, department: "HR", created_at: "2026-04-15" },
  { id: "ps21", company_id: "c1", score: 76, department: "Engineering", created_at: "2026-05-15" },
  { id: "ps22", company_id: "c1", score: 70, department: "Marketing", created_at: "2026-05-15" },
  { id: "ps23", company_id: "c1", score: 79, department: "Sales", created_at: "2026-05-15" },
  { id: "ps24", company_id: "c1", score: 77, department: "Design", created_at: "2026-05-15" },
  { id: "ps25", company_id: "c1", score: 73, department: "HR", created_at: "2026-05-15" },
];

export const cultureScoreData = [
  { month: "Jan", score: 64 },
  { month: "Feb", score: 71 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 84 },
  { month: "May", score: 89 },
  { month: "Jun", score: 92 },
];

export const npsData = [
  { month: "Jan", nps: 52 },
  { month: "Feb", nps: 61 },
  { month: "Mar", nps: 68 },
  { month: "Apr", nps: 74 },
  { month: "May", nps: 79 },
  { month: "Jun", nps: 84 },
];

export const budgetAllocationData = [
  { category: "Live Music", amount: 45000 },
  { category: "Local Food", amount: 32000 },
  { category: "Wellness", amount: 18000 },
  { category: "Team Building", amount: 28000 },
  { category: "Art & Crafts", amount: 12000 },
];

export const engagementMetrics = {
  eventEngagement: "87%",
  teamConnectionScore: "+34%",
  employeeRetention: "94%",
  roiMultiplier: "3.2x",
};

export const cities = [
  "Austin TX",
  "Portland OR",
  "San Francisco CA",
  "Seattle WA",
  "New York NY",
  "Chicago IL",
  "Los Angeles CA",
  "Boston MA",
  "Denver CO",
  "Remote/Virtual",
];

export const teamSizes = ["1-15", "16-50", "51-150", "151-500", "500+"];

export const timeSlots = [
  "Luncheon 11:30-1:30",
  "Afternoon Blend 2-4pm",
  "Happy Hour 4-6pm",
  "Evening Gala 6pm+",
];

export const vibeTags = [
  "Live music",
  "Local food",
  "Art & crafts",
  "Wellness",
  "Craft brewery",
  "Team building",
  "Cultural heritage",
  "Interactive workshop",
];

export const categories = [
  "Live music",
  "Local food",
  "Art & crafts",
  "Wellness",
  "Craft brewery",
  "Team building",
  "Cultural heritage",
  "Interactive workshop",
];
