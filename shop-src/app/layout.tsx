import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rooster Club Shop — Poultry Accessories, Feed & Supplements | Cash on Delivery',
  description:
    'Incubators, brooder kits, leg rings, carry boxes, feed, herbal feed supplements and nutri laddus for country chicken and Aseel keepers. Cash on delivery across India.',
  metadataBase: new URL('https://roosterclub.co.in'),
  alternates: { canonical: '/shop/' },
  openGraph: {
    title: 'Rooster Club Shop — Cash on Delivery Across India',
    description: 'Poultry accessories, feed and supplements for backyard and Aseel keepers.',
    url: 'https://roosterclub.co.in/shop/',
    siteName: 'Rooster Club',
    images: ['/favicon.png'],
    type: 'website',
  },
  icons: { icon: '/favicon.png?v=2', apple: '/apple-touch-icon.png?v=2' },
};

export const viewport: Viewport = { themeColor: '#b8701a', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;600;700;800&family=Noto+Sans+Telugu:wght@500;700&display=swap"
        />
        <script src="/analytics.js" defer />
      </head>
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
