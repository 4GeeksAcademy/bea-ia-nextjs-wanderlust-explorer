import { CATEGORIES, type Experience } from "@/types/experience";

const DESTINATIONS = [
  "Dubrovnik, Croatia",
  "Kyoto, Japan",
  "Oaxaca, Mexico",
  "Lisbon, Portugal",
  "Reykjavik, Iceland",
  "Marrakesh, Morocco",
  "Chiang Mai, Thailand",
  "Cusco, Peru",
  "Queenstown, New Zealand",
  "Bergen, Norway",
  "Istanbul, Turkey",
  "Cape Town, South Africa",
  "Valencia, Spain",
  "Vancouver, Canada",
  "Hanoi, Vietnam",
  "Athens, Greece",
  "Medellin, Colombia",
  "Seoul, South Korea",
  "Split, Croatia",
  "Ubud, Indonesia",
] as const;

const TITLE_PREFIX = [
  "Sunrise",
  "Hidden",
  "Slow",
  "Wild",
  "Coastal",
  "Mountain",
  "Urban",
  "Moonlit",
  "Cultural",
  "Signature",
] as const;

const TITLE_ACTIVITY = [
  "Kayak Escape",
  "Market Walk",
  "Sailing Session",
  "Street Food Trail",
  "Forest Immersion",
  "Artisan Workshop",
  "Cliff Hike",
  "Tea Ceremony",
  "Yoga Retreat",
  "Photo Expedition",
] as const;

const SUMMARY_LINE = [
  "Conoce rincones locales con anfitriones expertos.",
  "Una experiencia pensada para grupos pequenos.",
  "Ideal para descubrir una ciudad desde otra perspectiva.",
  "Combina aprendizaje, ritmo relajado y momentos memorables.",
  "Incluye recomendaciones autenticas fuera de ruta turistica.",
] as const;

export const experiences: Experience[] = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const category = CATEGORIES[index % CATEGORIES.length];
  const destination = DESTINATIONS[index % DESTINATIONS.length];
  const titlePrefix = TITLE_PREFIX[index % TITLE_PREFIX.length];
  const titleActivity = TITLE_ACTIVITY[(index * 3) % TITLE_ACTIVITY.length];
  const summary = SUMMARY_LINE[(index * 7) % SUMMARY_LINE.length];

  return {
    id,
    title: `${titlePrefix} ${titleActivity}`,
    description: `${summary} Descubre ${destination} a traves de una propuesta ${category.toLowerCase()} con guia local y ritmo flexible.`,
    category,
    destination,
    price: 35 + (index % 18) * 7,
    rating: Number((3.8 + (index % 12) * 0.1).toFixed(1)),
    imageUrl: `https://picsum.photos/seed/wanderlust-${id}/900/600`,
  };
});

export const categoryOptions = [...CATEGORIES];
export const destinationOptions = [...new Set(experiences.map((item) => item.destination))].sort();
