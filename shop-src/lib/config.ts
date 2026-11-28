/** Shop settings shown on the website. The server (web_place_shop_order) always works out the
 *  real price, stock and delivery fee again — these numbers are for display only. */
export const SUPABASE_URL = 'https://tsjiazashtxoybyaknec.supabase.co';
// Public "anon" key: safe in the browser. It can only read live products and call the web_* order functions.
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzamlhemFzaHR4b3lieWFrbmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MjEzNjEsImV4cCI6MjA5NjI5NzM2MX0.ztjN1Hp59ofJ8ZWVfyqbl81rzr-ha2pE3ceb8fqDD9U';
export const WHATSAPP = '919515369756';
export const PLAY_STORE = 'https://play.google.com/store/apps/details?id=in.co.roosterclub.app';
export const FREE_DELIVERY_FROM = 999;
export const DELIVERY_FEE = 49;
export const MAX_QTY = 20;

/** Category tiles: img '' means use the first live product picture in that category. */
export type CategoryKey = 'accessories' | 'apparel' | 'feed_supplement' | 'laddus' | 'feed';
export const CATEGORIES: { key: CategoryKey; title: string; sub: string; img: string; buy: boolean }[] = [
  { key: 'accessories', title: 'Accessories', sub: 'Incubators, brooder kits, leg rings, carry boxes', img: '', buy: true },
  { key: 'feed_supplement', title: 'Feed Supplements', sub: 'Herbal care, electrolytes, gut and liver care', img: '/shop/img/stress-shield.jpg', buy: true },
  { key: 'feed', title: 'Feed', sub: 'Chick, layer and breeder feed, BSF larvae', img: '/shop/img/feed-breeders.jpg', buy: true },
  { key: 'laddus', title: 'Nutri Laddus', sub: 'Traditional nutrition laddus for roosters', img: '', buy: true },
  { key: 'apparel', title: 'Apparel', sub: 'Rooster Club T-shirts — order in the app', img: '', buy: false },
];
