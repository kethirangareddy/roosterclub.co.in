import { api } from './supabase';
import { CATEGORIES, type CategoryKey } from './config';

export type Product = {
  id: string;
  category: CategoryKey;
  name: string;
  name_te: string | null;
  unit: string | null;
  price: number;
  mrp: number | null;
  stock_count: number;
  status: 'active' | 'out_of_stock';
  images: string[] | null;
  image_url: string | null;
  description: string | null;
  details: Record<string, unknown> | null;
  apparel: { types?: { price: number }[] } | null;
  delivery_included: boolean | null;
  rating_avg: number | null;
  rating_count: number | null;
};

export type Review = { id: string; product_id: string; rating: number; body: string | null; verified: boolean; created_at: string };

const COLS =
  'id,category,name,name_te,unit,price,mrp,stock_count,status,images,image_url,description,details,apparel,delivery_included,rating_avg,rating_count';

let cache: Promise<Product[]> | null = null;

/** Live products from the same table the app Shop uses. Cached for the page visit. */
export function loadProducts(): Promise<Product[]> {
  if (!cache) {
    const cats = CATEGORIES.map((c) => c.key).join(',');
    cache = api<Product[]>(
      `shop_products?category=in.(${cats})&status=in.(active,out_of_stock)&removed_at=is.null&select=${COLS}&order=price.desc`,
    )
      .then((rows) => (rows || []).filter((p) => p.price > 0))
      .catch((e) => { cache = null; throw e; });
  }
  return cache;
}

/** Real, buyer-written reviews only (shown when there are any). */
export function loadReviews(limit = 6): Promise<Review[]> {
  return api<Review[]>(
    `shop_product_reviews?select=id,product_id,rating,body,verified&rating=gte.4&body=not.is.null&order=created_at.desc&limit=${limit}`,
  ).catch(() => []);
}

const https = (u: unknown) => (typeof u === 'string' && /^https:\/\//i.test(u) ? u : '');
export const pictures = (p: Product) => {
  const list = (p.images && p.images.length ? p.images : [p.image_url]).map(https).filter(Boolean);
  return list.length ? list : ['/app-logo.png'];
};
export const inStock = (p: Product) => p.status === 'active' && p.stock_count > 0;
export const canBuy = (p: Product) => p.category !== 'apparel';
export const discount = (p: Product) => (p.mrp && p.mrp > p.price ? Math.round(((p.mrp - p.price) * 100) / p.mrp) : 0);
export const money = (n: number) => '₹' + Number(n || 0).toLocaleString('en-IN');
export const productHref = (p: Product) => `/p/?id=${p.id}`;
