import type { Metadata, Viewport } from 'next';
import { Inter, Sora, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { Nav } from '@/components/Nav';
import { CartDrawer } from '@/components/CartDrawer';
import { Preloader } from '@/components/Preloader';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/sections/Footer';
import { SITE } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const kufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

const description =
  'MOORTV — Mauritania’s largest entertainment platform. 20,000+ movies, 10,000+ TV shows and 9,000+ live channels in 4K, plus every major football league. One subscription, every device.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'MOORTV — Everything You Love. One Subscription.',
    template: '%s · MOORTV',
  },
  description,
  keywords: [
    'MOORTV',
    'IPTV Mauritania',
    'اشتراك موور تي في',
    'streaming Mauritania',
    'live football Mauritania',
    '4K IPTV',
    'Nouakchott streaming',
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_MR'],
    url: SITE.domain,
    siteName: SITE.name,
    title: 'MOORTV — Everything You Love. One Subscription.',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOORTV — Everything You Love. One Subscription.',
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg' }],
  },
  alternates: { canonical: '/' },
  category: 'entertainment',
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.domain}/#organization`,
      name: SITE.name,
      url: SITE.domain,
      description,
      areaServed: { '@type': 'Country', name: 'Mauritania' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: `+${SITE.whatsappE164}`,
        contactType: 'customer service',
        availableLanguage: ['Arabic', 'French', 'English'],
      },
      sameAs: [SITE.snapchatUrl],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.domain}/#website`,
      url: SITE.domain,
      name: SITE.name,
      publisher: { '@id': `${SITE.domain}/#organization` },
      inLanguage: ['en', 'ar'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${kufi.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>

        <CartProvider>
          <Preloader />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
