import { WHATSAPP, PLAY_STORE } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-cream-2">
      <div className="wrap grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-bold text-white">Rooster Club</p>
          <p className="mt-2 text-sm leading-6 text-cream-2/80">
            The Telugu app for poultry keepers. Buy and sell birds, learn in Rooster School, and shop the things your flock needs.
          </p>
          <a href={PLAY_STORE} className="btn btn-primary mt-4">Get the app</a>
        </div>
        <div className="text-sm leading-8">
          <p className="font-bold text-white">Help</p>
          <a className="block hover:text-gold" href="/shipping-policy.html">Shipping policy</a>
          <a className="block hover:text-gold" href="/refund-policy.html">Returns and refunds</a>
          <a className="block hover:text-gold" href="/contact.html">Contact us</a>
          <a className="block hover:text-gold" href={`https://wa.me/${WHATSAPP}`}>WhatsApp +91 95153 69756</a>
        </div>
        <div className="text-sm leading-8">
          <p className="font-bold text-white">Rooster Club</p>
          <a className="block hover:text-gold" href="/about.html">About</a>
          <a className="block hover:text-gold" href="/privacy.html">Privacy</a>
          <a className="block hover:text-gold" href="/terms.html">Terms</a>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-cream-2/60">© {new Date().getFullYear()} Rooster Club, Hyderabad</p>
    </footer>
  );
}
