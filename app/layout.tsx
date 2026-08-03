import type { Metadata, Viewport } from 'next';
import { Inter, Sora, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { LanguageProvider } from '@/lib/i18n';
import { Nav } from '@/components/Nav';
import { CartDrawer } from '@/components/CartDrawer';
import { Preloader } from '@/components/Preloader';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/sections/Footer';
import { SITE } from '@/lib/site';
import { SkipLink } from '@/components/SkipLink';

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
  'موور تي في — أكبر منصة ترفيهية في موريتانيا. أكثر من 20,000 فيلم و10,000 مسلسل و9,000 قناة مباشرة بجودة 4K، وكل الدوريات الكروية الكبرى. اشتراك واحد لكل أجهزتك.';

const descriptionEn =
  'MOORTV — Mauritania’s largest entertainment platform. 20,000+ movies, 10,000+ TV shows and 9,000+ live channels in 4K, plus every major football league. One subscription, every device.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'موور تي في | MOORTV — كل ما تحب. اشتراك واحد.',
    template: '%s · MOORTV',
  },
  description,
  keywords: [
    'موور تي في',
    'MOORTV',
    'اشتراك موور تي في',
    'أفلام ومسلسلات موريتانيا',
    'قنوات مباشرة موريتانيا',
    'اشتراك رياضي موريتانيا',
    'جهاز تلفاز ذكي نواكشوط',
    'IPTV Mauritania',
    'streaming Mauritania',
    '4K IPTV',
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    locale: 'ar_MR',
    alternateLocale: ['en_US'],
    url: SITE.domain,
    siteName: SITE.name,
    title: 'موور تي في — كل ما تحب. اشتراك واحد.',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'موور تي في — كل ما تحب. اشتراك واحد.',
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
      alternateName: 'MOORTV',
      description: descriptionEn,
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
      inLanguage: ['ar', 'en'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${sora.variable} ${kufi.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <LanguageProvider>
          <SkipLink />
          <CartProvider>
            <Preloader />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
            <FloatingWhatsApp />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
