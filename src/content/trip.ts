import type { PhotoName } from '../lib/photos'

export interface Stop {
  name: string
  kind: string
  /** Shown when a stop is expanded on the board. */
  detail: string
  time: string
}

export interface DayGroup {
  id: string
  days: number[]
  label: string
  town: string
  photo: PhotoName
  summary: string
  stops: Stop[]
}

/** The 8 days, grouped by base town (Figma: day cards + 8-day board). */
export const dayGroups: DayGroup[] = [
  {
    id: 'scalea',
    days: [1, 2],
    label: 'Days 1–2',
    town: 'Scalea',
    photo: 'town',
    summary: 'Old-town stairs, Torre Talao and a long dinner on the lungomare.',
    stops: [
      { name: 'Old town stairs', kind: 'Neighbourhood', time: '09:00', detail: 'Climb from Piazza de Palma through the vicoli to the Norman castle ruins.' },
      { name: 'Torre Talao', kind: 'Landmark', time: '11:30', detail: '16th-century watchtower on a rock that used to be an island. Free, best at low sun.' },
      { name: 'Lungomare dinner', kind: 'Food', time: '20:30', detail: 'Grilled alici and cedro granita along the seafront promenade.' },
      { name: 'Sunset aperitivo', kind: 'Evening', time: '19:00', detail: 'Spritz at a lido bar facing Isola di Dino as the sun drops behind it.' },
    ],
  },
  {
    id: 'praia',
    days: [3],
    label: 'Day 3',
    town: 'Praia a Mare',
    photo: 'caves',
    summary: 'Boat to Isola di Dino and into the Grotta Azzurra sea cave.',
    stops: [
      { name: 'Isola di Dino', kind: 'Boat trip', time: '09:30', detail: 'Small boats leave Praia beach every hour. Two hours around the island.' },
      { name: 'Grotta Azzurra', kind: 'Sea cave', time: '10:30', detail: 'Blue light is strongest before noon. Bring a mask.' },
      { name: 'Fiuzzi beach', kind: 'Beach', time: '14:00', detail: 'Pebble beach facing the island; shallow water, a few free stretches.' },
    ],
  },
  {
    id: 'diamante',
    days: [4, 5, 6],
    label: 'Days 4–6',
    town: 'Diamante',
    photo: 'arch',
    summary: 'Painted murals, the Arcomagno arch and the ruins of Cirella.',
    stops: [
      { name: 'Diamante murals', kind: 'Village', time: '10:00', detail: 'Over 150 murals painted since 1981. Start at Via Pietro Mancini.' },
      { name: 'Arcomagno', kind: 'Beach', time: '08:00', detail: 'Natural rock arch near San Nicola Arcella. Go early: access is capped in August.' },
      { name: 'Cirella ruins', kind: 'History', time: '17:30', detail: 'Abandoned hill town above the coast, with an open-air theatre in summer.' },
    ],
  },
  {
    id: 'maratea',
    days: [7, 8],
    label: 'Days 7–8',
    town: 'Maratea',
    photo: 'gulf',
    summary: 'The Redeemer at sunrise, Fiumicello beach and a coastal boat tour.',
    stops: [
      { name: 'Redeemer statue', kind: 'Viewpoint', time: '07:00', detail: '21 m statue on Monte San Biagio. The road is quiet and the gulf clear before 9.' },
      { name: 'Fiumicello beach', kind: 'Beach', time: '11:00', detail: 'Small cove under the village with a couple of lidos and clear water.' },
      { name: 'Coastal boat tour', kind: 'Day trip', time: '15:00', detail: 'Grottoes and coves between Acquafredda and Castrocucco, about 3 hours.' },
    ],
  },
]

/** One entry per day, for the header tracker and the map. */
export const days = [
  { day: 1, town: 'Scalea', group: 'scalea', x: 196, y: 330 },
  { day: 2, town: 'Scalea', group: 'scalea', x: 214, y: 308 },
  { day: 3, town: 'Praia a Mare', group: 'praia', x: 168, y: 206 },
  { day: 4, town: 'Diamante', group: 'diamante', x: 236, y: 452 },
  { day: 5, town: 'San Nicola', group: 'diamante', x: 186, y: 262 },
  { day: 6, town: 'Maratea', group: 'diamante', x: 128, y: 96 },
  { day: 7, town: 'Maratea', group: 'maratea', x: 104, y: 72 },
  { day: 8, town: 'Maratea', group: 'maratea', x: 148, y: 60 },
] as const

export const trip = {
  title: 'Scalea to Maratea',
  subtitle: 'Sea caves, cliffs and lemon groves',
  country: 'Italy',
  season: 'June – September',
  summary:
    'Eight slow days along the Riviera dei Cedri — from Scalea’s old town to the cliffs of Maratea, with detours to Isola di Dino, Diamante and the Gulf of Policastro.',
  tags: ['Italy', 'Coast', 'Beaches', 'By car'],
  heroTags: ['Coast', 'Beaches', 'By car'],
  priceEur: 1450,
  comfortEur: 2980,
  stats: { days: 8, towns: 3, km: 120, sights: 14 },
  /** Figma shows the traveller on day 6 of 8. */
  currentDay: 6,
}

export interface Post {
  id: string
  photo: PhotoName
  date: string
  title: string
  meta: string
  excerpt: string
  tags: string[]
}

export const posts: Post[] = [
  {
    id: 'riviera',
    photo: 'golden',
    date: 'May 2026 — 8 days',
    title: 'A week on the Riviera dei Cedri',
    meta: 'Scalea · Diamante · Maratea',
    excerpt: 'Sea caves, painted villages and peperoncino — the quiet Tyrrhenian side of southern Italy, planned day by day.',
    tags: ['Italy', 'Coast', 'By car'],
  },
  {
    id: 'lido',
    photo: 'lido',
    date: 'June 2026 — 5 min read',
    title: 'How to pick a lido in Calabria',
    meta: 'Beaches · Practical',
    excerpt: 'Sunbeds, prices and the unwritten rules of the Italian beach club — so your first morning is easy.',
    tags: ['Italy', 'Beaches'],
  },
]

export const gallery: { photo: PhotoName; alt: string }[] = [
  { photo: 'alley', alt: 'Narrow stone alley with an old wooden door in Scalea' },
  { photo: 'stairs', alt: 'Old-town stairs climbing between stone houses' },
  { photo: 'sunset', alt: 'Sunset over the Tyrrhenian sea from the coast road' },
  { photo: 'cove', alt: 'Clear water in a rocky cove near Maratea' },
  { photo: 'tower', alt: 'Coastal rocks and a watchtower above the sea' },
]

export const checklist = [
  {
    id: 'boat',
    title: 'Book the Isola di Dino boat tour',
    error: 'Choose your travel dates to see availability',
    tags: ['Boat'],
    initialDone: false,
  },
  {
    id: 'car',
    title: 'Reserve a rental car from Scalea',
    error: 'Pick-up time is missing',
    tags: ['Car'],
    initialDone: true,
  },
]

export const author = {
  name: 'Marina Dolgova',
  role: 'Travel writer · 34 countries',
  initials: 'MD',
}

/** Budget breakdown (EUR) used by BudgetCard and the compare calculator presets. */
export const budget = {
  level: 'mid-range',
  parts: [
    { label: 'Lodging', eur: 780 },
    { label: 'Transport', eur: 420 },
    { label: 'Experiences', eur: 250 },
  ],
}

export type Region = 'Southern Europe' | 'Western Europe' | 'Northern Europe'
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter'

export const itineraries: {
  title: string
  country: string
  region: Region
  seasons: Season[]
  meta: string
  updated: string
  href: string
}[] = [
  { title: 'Scalea to Maratea', country: 'Italy', region: 'Southern Europe', seasons: ['Summer', 'Autumn'], meta: '8 days · 3 stops', updated: 'Updated 24.05.2026', href: '/' },
  { title: 'Lisbon & the Silver Coast', country: 'Portugal', region: 'Southern Europe', seasons: ['Spring', 'Autumn'], meta: '8 days · 4 stops', updated: 'Updated 02.04.2026', href: '/' },
  { title: 'Cyclades by ferry', country: 'Greece', region: 'Southern Europe', seasons: ['Summer'], meta: '8 days · 5 stops', updated: 'Updated 11.03.2026', href: '/' },
  { title: 'Brittany lighthouses', country: 'France', region: 'Western Europe', seasons: ['Summer', 'Autumn'], meta: '8 days · 4 stops', updated: 'Updated 19.02.2026', href: '/' },
  { title: 'Cotswolds on foot', country: 'England', region: 'Western Europe', seasons: ['Spring'], meta: '8 days · 6 stops', updated: 'Updated 07.01.2026', href: '/' },
  { title: 'Lofoten in the dark', country: 'Norway', region: 'Northern Europe', seasons: ['Winter'], meta: '8 days · 3 stops', updated: 'Updated 28.11.2025', href: '/' },
]
