'use client';
import Link from 'next/link';
import { type Product, pictures, inStock, canBuy, discount, money, productHref } from '@/lib/products';
import { useCart } from '@/store/cart';

export default function ProductCard({ p }: { p: Product }) {
  const add = useCart((s) => s.add);
  const pics = pictures(p);
  const off = discount(p);
  const ok = inStock(p);
  const buyable = canBuy(p);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <Link href={productHref(p)} className="relative block aspect-square overflow-hidden bg-cream-2">
        <img src={pics[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-0" />
        {pics[1] && (
          <img src={pics[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100" />
        )}
        {off > 0 && <span className="absolute left-3 top-3 rounded-full bg-leaf px-2.5 py-1 text-xs font-bold text-white">{off}% off</span>}
        {!ok && <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-2 text-center text-sm font-bold text-white">Out of stock</span>}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={productHref(p)} className="font-semibold leading-snug text-ink hover:text-brand">{p.name}</Link>
        {p.name_te && <p className="mt-0.5 font-te text-sm text-muted">{p.name_te}</p>}
        {p.rating_count ? (
          <p className="mt-1 text-sm text-muted">
            <span className="font-bold text-gold">{Number(p.rating_avg).toFixed(1)} / 5</span> · {p.rating_count} reviews
          </p>
        ) : null}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <p>
            <span className="text-xl font-extrabold text-ink">{money(p.price)}</span>
            {off > 0 && <span className="ml-2 text-sm text-muted line-through">{money(p.mrp!)}</span>}
          </p>
        </div>
        {buyable ? (
          <button
            disabled={!ok}
            onClick={() => add(p.id, 1)}
            className="btn btn-primary mt-3 w-full disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
          >
            {ok ? 'Add to cart' : 'Out of stock'}
          </button>
        ) : (
          <Link href={productHref(p)} className="btn btn-ghost mt-3 w-full">Order in the app</Link>
        )}
      </div>
    </article>
  );
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="aspect-square animate-pulse bg-cream-2" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-cream-2" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-cream-2" />
        <div className="h-12 animate-pulse rounded-full bg-cream-2" />
      </div>
    </div>
  );
}
