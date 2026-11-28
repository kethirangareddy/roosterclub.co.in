'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MAX_QTY } from '@/lib/config';

export type CartLine = { id: string; variant?: string; qty: number };

type CartState = {
  lines: CartLine[];
  open: boolean;
  add: (id: string, qty?: number, variant?: string) => void;
  setQty: (id: string, qty: number, variant?: string) => void;
  remove: (id: string, variant?: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const same = (l: CartLine, id: string, v?: string) => l.id === id && (l.variant || '') === (v || '');
const clamp = (n: number) => Math.max(0, Math.min(MAX_QTY, Math.floor(n)));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (id, qty = 1, variant) =>
        set((s) => {
          const hit = s.lines.find((l) => same(l, id, variant));
          const lines = hit
            ? s.lines.map((l) => (same(l, id, variant) ? { ...l, qty: clamp(l.qty + qty) } : l))
            : [...s.lines, { id, variant, qty: clamp(qty) }];
          return { lines: lines.filter((l) => l.qty > 0), open: true };
        }),
      setQty: (id, qty, variant) =>
        set((s) => ({
          lines: s.lines.map((l) => (same(l, id, variant) ? { ...l, qty: clamp(qty) } : l)).filter((l) => l.qty > 0),
        })),
      remove: (id, variant) => set((s) => ({ lines: s.lines.filter((l) => !same(l, id, variant)) })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: 'rc-web-cart-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
      // One-time move of the old website cart (rc-web-cart-v1) into the new one.
      onRehydrateStorage: () => (state) => {
        try {
          const old = localStorage.getItem('rc-web-cart-v1');
          if (old && state && state.lines.length === 0) {
            const rows = (JSON.parse(old) as CartLine[]).filter((l) => l && l.id && l.qty > 0);
            setTimeout(() => useCart.setState({ lines: rows.map((l) => ({ id: l.id, qty: clamp(l.qty) })) }), 0);
          }
          localStorage.removeItem('rc-web-cart-v1');
        } catch { /* ignore */ }
      },
    },
  ),
);

export const cartCount = (lines: CartLine[]) => lines.reduce((s, l) => s + l.qty, 0);
