import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata, Viewport } from 'next';
import AdBlockDetector from '@/components/AdBlockDetector';
import { Toaster } from 'sonner';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';
import SkipToContent from '@/components/SkipToContent';
import CookieBanner from '@/components/CookieBanner';
import ScriptManager from '@/components/ScriptManager';
import MobileStickyAnchorAd from '@/components/MobileStickyAnchorAd';
import CookielessAnalyticsTracker from '@/components/CookielessAnalyticsTracker';
import { ADSENSE_PUBLISHER_ID } from '@/lib/adConfig';

const fy = getCurrentFiscalYear();

// ✅ 2. Configure your custom local font
const customFont = localFont({
  src: [
    {
      path: '../../public/fonts/DupletRounded-Extralight.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DupletRounded-Light.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DupletRounded-Regular.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DupletRounded-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DupletRounded-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DupletRounded-Extrabold.woff',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  // We keep the variable name '--font-rubik' so you don't have to change your Tailwind config/CSS
  variable: '--font-rubik',
  preload: true,
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
    default: 'Fincado — Smart Financial Calculators for India',
    template: '%s | Fincado',
  },
  description: `India's trusted financial platform for EMI, SIP, Loan, and Tax planning. Accurate bank-grade calculators updated for ${fy.shortYear}.`,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon-32x32.png'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Fincado',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fincado Financial Calculators',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {},
  other: {
    'google-adsense-account': ADSENSE_PUBLISHER_ID,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch for faster loading */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Preconnect to critical domains */}
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

      <body className={customFont.className}>
        {/* Cookieless first-party analytics (no cookies/storage) */}
        <React.Suspense fallback={null}>
          <CookielessAnalyticsTracker />
        </React.Suspense>

        {/* Consent-aware analytics and ad scripts */}
        <React.Suspense fallback={null}>
          <ScriptManager />
        </React.Suspense>

        {/* Loading Bar */}
        <NextTopLoader
          color="#80d843"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #16a34a,0 0 5px #16a34a"
        />

        {/* Notifications */}
        <Toaster position="top-right" richColors />

        {/* Global Header */}
        <Header />
        <SkipToContent />

        {/* Main Content Area */}
        <main id="main-content" style={{ minHeight: '80vh' }}>
          {children}
        </main>
        {/* Mobile sticky anchor ad (calculator routes only) */}
        <MobileStickyAnchorAd />

        {/* Ad Block Detector */}
        <AdBlockDetector />
        {/* Cookie Consent */}
        <CookieBanner />
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
