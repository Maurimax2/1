export type ProductKind = 'subscription' | 'device';

export type Product = {
  id: string;
  kind: ProductKind;
  name: string;
  nameAr?: string;
  /** Short line shown under the title. */
  blurb: string;
  price: number;
  /** Optional struck-through reference price for the summer sale. */
  compareAt?: number;
  badge?: string;
  features: string[];
  /** Art seed drives the generated poster/product illustration. */
  art: string;
  featured?: boolean;
};

/**
 * Subscription pricing as specified in the project brief.
 * (The 2024 flyer ran 800 / 1200 / 2000 MRU — these are the newer numbers.)
 */
export const PLANS: Product[] = [
  {
    id: 'plan-3m',
    kind: 'subscription',
    name: '3 Months',
    nameAr: 'ثلاثة أشهر',
    blurb: 'A full season of everything.',
    price: 1200,
    compareAt: 1600,
    art: 'starter',
    features: [
      'Full Library',
      'Live Channels',
      'Movies',
      'TV Shows',
      'Sports',
      'Kids',
      '4K Ultra HD',
    ],
  },
  {
    id: 'plan-6m',
    kind: 'subscription',
    name: '6 Months',
    nameAr: 'ستة أشهر',
    blurb: 'The balance most people pick.',
    price: 2000,
    compareAt: 2800,
    badge: 'Most Popular',
    art: 'popular',
    features: [
      'Everything in 3 Months',
      'Priority Activation',
      'Multi-Device Ready',
      'All Football Leagues',
      'Anime & Documentaries',
      'Kids Safe Profiles',
      '4K Ultra HD',
    ],
  },
  {
    id: 'plan-12m',
    kind: 'subscription',
    name: '12 Months + 3 FREE',
    nameAr: 'سنة + 3 أشهر مجاناً',
    blurb: '15 months of premium entertainment.',
    price: 3000,
    compareAt: 4800,
    badge: '🔥 BEST OFFER',
    featured: true,
    art: 'best',
    features: [
      '15 months total — 3 on us',
      'Everything in 6 Months',
      'Instant Activation',
      'Premium 24/7 Support',
      'Every Live Sports Channel',
      'Full 4K UHD Catalogue',
      'Free Setup Assistance',
    ],
  },
];

/**
 * Hardware.
 *
 * `box-stick-4k` is the real advertised product: 3000 MRU, TV stick + voice
 * remote with a full year of MOORTV included. The remaining SKUs are sensible
 * companions — confirm names and prices before going live.
 */
export const DEVICES: Product[] = [
  {
    id: 'box-stick-4k',
    kind: 'device',
    name: 'MOORTV Stick 4K',
    nameAr: 'عصا موور تي في',
    blurb:
      'Turn any screen into a smart TV. Plug into HDMI, connect WiFi, and you are watching in under a minute.',
    price: 3000,
    art: 'stick',
    badge: 'Best Seller',
    featured: true,
    features: [
      '1 full year of MOORTV included',
      '4K Ultra HD output',
      'Voice remote with OK / Home keys',
      'WiFi — no cables to run',
    ],
  },
  {
    id: 'box-android-4k',
    kind: 'device',
    name: 'MOORTV Box 4K',
    nameAr: 'جهاز موور تي في',
    blurb:
      'The full Android TV box. More power, more storage and an ethernet port for flawless 4K football.',
    price: 4000,
    art: 'box',
    features: [
      '1 full year of MOORTV included',
      '4K HDR • 4GB RAM',
      'WiFi + Ethernet port',
      'Voice remote included',
    ],
  },
  {
    id: 'box-cinema-pro',
    kind: 'device',
    name: 'MOORTV Cinema Pro',
    nameAr: 'سينما برو',
    blurb:
      'For the home theatre. Top-tier decoding, 8GB RAM and gigabit ethernet — nothing ever buffers.',
    price: 6500,
    compareAt: 7500,
    art: 'pro',
    badge: 'Premium',
    features: [
      '1 full year of MOORTV included',
      '4K HDR10+ • 8GB RAM',
      'Gigabit Ethernet',
      'Backlit air-mouse remote',
    ],
  },
  {
    id: 'box-family-bundle',
    kind: 'device',
    name: 'Family Bundle',
    nameAr: 'عرض العائلة',
    blurb:
      'Two sticks, two rooms, two full years. The easiest way to cover the whole house at once.',
    price: 5500,
    compareAt: 6000,
    art: 'bundle',
    features: [
      '2 × 1 year of MOORTV included',
      '2 × 4K sticks',
      'Two voice remotes',
      'Free setup assistance',
    ],
  },
  {
    id: 'box-remote',
    kind: 'device',
    name: 'Voice Remote',
    nameAr: 'جهاز تحكم',
    blurb:
      'A spare remote with voice search, OK pad and dedicated app keys. Ships ready-paired.',
    price: 500,
    art: 'remote',
    features: ['Voice search built in', 'OK / Home / Back keys', 'Works with every MOORTV device', 'Ships ready-paired'],
  },
];

export const ALL_PRODUCTS: Product[] = [...PLANS, ...DEVICES];

export function findProduct(id: string) {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export type Category = {
  name: string;
  nameAr: string;
  count: string;
  art: string;
  tone: [string, string];
};

/** Mirrors the category chips the brand uses on its own artwork. */
export const CATEGORIES: Category[] = [
  { name: 'Movies', nameAr: 'أفلام', count: '20,000+ titles', art: 'movies', tone: ['#2f7bff', '#a855f7'] },
  { name: 'TV Shows', nameAr: 'مسلسلات', count: '10,000+ series', art: 'series', tone: ['#7c3aed', '#22d3ee'] },
  { name: 'Football', nameAr: 'كرة القدم', count: 'Every major league', art: 'football', tone: ['#10b981', '#2f7bff'] },
  { name: 'Sports', nameAr: 'رياضة', count: '900+ sports channels', art: 'sports', tone: ['#f97316', '#e879f9'] },
  { name: 'Kids', nameAr: 'أطفال', count: 'Safe & fun', art: 'kids', tone: ['#22d3ee', '#a855f7'] },
  { name: 'Anime', nameAr: 'أنمي', count: 'Subbed & dubbed', art: 'anime', tone: ['#e879f9', '#2f7bff'] },
  { name: 'Entertainment', nameAr: 'ترفيه', count: 'Shows & specials', art: 'entertainment', tone: ['#a855f7', '#f97316'] },
  { name: 'Documentaries', nameAr: 'وثائقيات', count: 'Real stories', art: 'docs', tone: ['#0ea5e9', '#14b8a6'] },
  { name: 'News', nameAr: 'أخبار', count: '24/7 worldwide', art: 'news', tone: ['#ef4444', '#2f7bff'] },
  { name: 'Live TV', nameAr: 'قنوات مباشرة', count: '9,000+ channels', art: 'live', tone: ['#2f7bff', '#22d3ee'] },
];

/** Competitions called out on the brand's football artwork. */
export const LEAGUES = [
  'Premier League',
  'UEFA Champions League',
  'LaLiga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Europa League',
  'CAF & World Cup',
] as const;
