import '../globals.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata, Viewport } from 'next';
import AdBlockDetector from '@/components/AdBlockDetector';
import { Toaster } from 'sonner';
import SkipToContent from '@/components/SkipToContent';
import CookieBanner from '@/components/CookieBanner';
import ScriptManager from '@/components/ScriptManager';
import MobileStickyAnchorAd from '@/components/MobileStickyAnchorAd';
import CookielessAnalyticsTracker from '@/components/CookielessAnalyticsTracker';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adConfig';
import SiteTrustSchema from '@/components/SiteTrustSchema';

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const fincadoSans = localFont({
  // Open Sauce One (SIL OFL) — the Nextwealth design-system typeface
  src: [
    {
      path: '../../../public/fonts/OpenSauceOne-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/OpenSauceOne-SemiBold.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/OpenSauceOne-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/OpenSauceOne-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-fincado-sans',
  preload: true,
});

// Open Sauce One has no Devanagari, so Hindi text keeps the previous brand
// font. unicode-range means it is only downloaded when Devanagari is on the page.
const fincadoDeva = localFont({
  src: [
    {
      path: '../../../public/fonts/FincadoBrand-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/FincadoBrand-Semibold.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/FincadoBrand-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/FincadoBrand-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-fincado-deva',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+0900-097F, U+1CD0-1CFF, U+200C-200D, U+25CC, U+A8E0-A8FF',
    },
  ],
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fincado.com'),
  title: {
    default: 'Fincado हिंदी — फाइनेंशियल कैलकुलेटर और गाइड्स',
    template: '%s | Fincado हिंदी',
  },
  description: 'भारत के सर्वश्रेष्ठ फाइनेंशियल कैलकुलेटर हिंदी में। SIP, EMI, होम लोन, PPF, सुकन्या समृद्धि और रिटायरमेंट प्लानिंग टूल्स।',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' }
    ],
    shortcut: ['/favicon-32x32.png'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      }
    ],
  },
  manifest: '/manifest.json',
  applicationName: 'Fincado',
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    siteName: 'Fincado',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fincado Financial Calculators',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : {},
  other: {
    'google-adsense-account': ADSENSE_PUBLISHER_ID,
    'content-language': 'hi-IN',
  },
};

export default function HindiRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi-IN" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://pagead2.googlesyndication.com"
          crossOrigin="anonymous"
        />
      </head>

      <body className={`${fincadoSans.variable} ${fincadoDeva.variable}`}>
        <SiteTrustSchema />

        <React.Suspense fallback={null}>
          <CookielessAnalyticsTracker />
        </React.Suspense>

        <React.Suspense fallback={null}>
          <ScriptManager />
        </React.Suspense>

        <NextTopLoader
          color="#92c65b"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #74a046,0 0 5px #74a046"
        />

        <Toaster position="top-right" richColors />

        <Header />
        <SkipToContent />

        <main id="main-content" className="pt-8 pb-12" style={{ minHeight: '80vh' }}>
          {children}
        </main>

        <MobileStickyAnchorAd />
        <AdBlockDetector />
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
