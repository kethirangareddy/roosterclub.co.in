export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <picture>
        <source media="(max-width: 720px)" srcSet="/img/hero-aseel-720.webp" type="image/webp" />
        <source srcSet="/img/hero-aseel-1280.webp" type="image/webp" />
        <img src="/img/hero-aseel-1280.jpg" alt="Aseel rooster on a farm" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" fetchPriority="high" />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
      <div className="wrap py-16 sm:py-24 lg:py-32">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-gold">Rooster Club Shop</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
          Everything your flock needs, delivered to your door
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-cream-2">
          Incubators, brooder kits, feed and natural supplements for country chicken and Aseel keepers.
          Pay cash when it arrives.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#featured" className="btn btn-primary text-lg">Shop now</a>
          <a href="#categories" className="btn border border-white/40 bg-white/10 text-white hover:bg-white/20">Browse categories</a>
        </div>
      </div>
    </section>
  );
}
