'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart, cartCount } from '@/store/cart';

export default function Header() {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const [ready, setReady] = useState(false); // avoid a wrong count before the saved cart loads
  const [menu, setMenu] = useState(false);
  useEffect(() => setReady(true), []);
  const n = ready ? cartCount(lines) : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-3">
        <a href="/" className="flex items-center gap-2 font-serif text-2xl font-bold text-ink">
          <img src="/favicon.png?v=2" alt="Rooster Club logo" width={34} height={34} className="rounded-lg" />
          Rooster Club
        </a>
        <nav className={`${menu ? 'flex' : 'hidden'} absolute left-0 right-0 top-16 flex-col gap-1 border-b border-line bg-cream p-3 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}>
          <Link href="/" className="py-2 font-semibold text-ink-2 hover:text-brand">Shop</Link>
          <a href="/features.html" className="py-2 font-semibold text-ink-2 hover:text-brand">Features</a>
          <a href="/blog/" className="py-2 font-semibold text-ink-2 hover:text-brand">Guides</a>
          <Link href="/my-orders/" className="py-2 font-semibold text-ink-2 hover:text-brand">My orders</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex h-11 items-center gap-2 rounded-full bg-ink px-4 font-bold text-white"
            aria-label={`Cart, ${n} items`}
          >
            Cart
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-gold px-1.5 text-sm text-ink">{n}</span>
          </button>
          <button
            onClick={() => setMenu((m) => !m)}
            className="h-11 rounded-full border border-line bg-white px-4 font-semibold md:hidden"
            aria-expanded={menu}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
