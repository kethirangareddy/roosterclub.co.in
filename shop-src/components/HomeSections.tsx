'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard, { CardSkeleton } from './ProductCard';
import { CATEGORIES } from '@/lib/config';
import { loadProducts, loadReviews, pictures, inStock, type Product, type Review } from '@/lib/products';

/** Fallback pictures for categories whose products are still "coming soon". */
const SOON_IMG: Record<string, string> = {
  feed_supplement: '/shop/img/stress-shield.jpg',
  feed: '/shop/img/feed-breeders.jpg',
};

export default function HomeSections() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts().then(setProducts).catch((e) => setError(e.message));
    loadReviews().then(setReviews);
  }, []);

  // Featured: in-stock first, then biggest saving.
  const featured = (products || [])
    .filter((p) => p.category !== 'apparel')
    .sort((a, b) => Number(inStock(b)) - Number(inStock(a)) || (b.mrp || b.price) - b.price - ((a.mrp || a.price) - a.price))
    .slice(0, 8);

  const tileImg = (key: string) => {
    const first = (products || []).find((p) => p.category === key);
    return first ? pictures(first)[0] : SOON_IMG[key] || '/app-logo.png';
  };
  const countIn = (key: string) => (products || []).filter((p) => p.category === key).length;

  return (
    <>
      <section id="categories" className="wrap scroll-mt-20 pt-12">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">Shop by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link key={c.key} href={`/c/?cat=${c.key}`} className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <div className="aspect-[4/3] overflow-hidden bg-cream-2">
                <img src={tileImg(c.key)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="font-bold text-ink">{c.title}</p>
                <p className="mt-0.5 line-clamp-2 text-sm text-muted">{c.sub}</p>
                {products && (
                  <p className="mt-1 text-xs font-semibold text-brand">{countIn(c.key) ? `${countIn(c.key)} products` : 'Coming soon'}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="featured" className="wrap scroll-mt-20 pt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">Popular right now</h2>
          <Link href="/c/?cat=accessories" className="font-semibold text-brand hover:underline">See all</Link>
        </div>
        {error && (
          <p className="mt-6 rounded-xl bg-white p-4 text-ink-2">
            Could not load products. Please check your internet and refresh the page.
          </p>
        )}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products ? featured.map((p) => <ProductCard key={p.id} p={p} />) : !error && Array.from({ length: 4 }, (_, i) => <CardSkeleton key={i} />)}
        </div>
      </section>

      <section className="wrap pt-16">
        {reviews.length > 0 ? (
          <>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">What buyers say</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => {
                const p = (products || []).find((x) => x.id === r.product_id);
                return (
                  <figure key={r.id} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                    <p className="font-bold text-gold">{r.rating} / 5</p>
                    <blockquote className="mt-2 leading-7 text-ink-2">{r.body}</blockquote>
                    <figcaption className="mt-3 text-sm text-muted">
                      {r.verified ? 'Verified buyer' : 'Buyer'}{p ? ` · ${p.name}` : ''}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </>
        ) : (
          <div className="grid gap-6 rounded-3xl bg-ink p-8 text-cream-2 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">From poultry keepers, for poultry keepers</h2>
              <p className="mt-3 max-w-xl leading-7">
                Rooster Club is the Telugu app where keepers buy and sell birds, learn in Rooster School and run their farm with Breeder Pro.
                Every shop order is checked by our team, and we call you to confirm before we ship.
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="rounded-xl bg-white/5 p-4"><b className="text-white">Call to confirm</b> — no surprise parcels</li>
              <li className="rounded-xl bg-white/5 p-4"><b className="text-white">Help on WhatsApp</b> — in Telugu or English</li>
              <li className="rounded-xl bg-white/5 p-4"><b className="text-white">7-day returns</b> on unused accessories</li>
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
