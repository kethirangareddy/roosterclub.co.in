import { FREE_DELIVERY_FROM } from '@/lib/config';

const BADGES = [
  { t: 'Cash on Delivery', s: 'Pay when your parcel arrives' },
  { t: `Free delivery over ₹${FREE_DELIVERY_FROM}`, s: 'All across India' },
  { t: 'Ships in 1–2 days', s: 'Packed and sent from Hyderabad' },
  { t: 'Damaged? We replace it', s: 'Tell us within 48 hours' },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-line bg-white">
      <ul className="wrap grid grid-cols-2 gap-px py-2 lg:grid-cols-4">
        {BADGES.map((b) => (
          <li key={b.t} className="px-3 py-4 text-center">
            <p className="font-bold text-ink">{b.t}</p>
            <p className="mt-0.5 text-sm text-muted">{b.s}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
