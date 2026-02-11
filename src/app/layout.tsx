import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Rubik } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata, Viewport } from 'next';
import CookieBanner from '@/components/CookieBanner';
import AdBlockDetector from '@/components/AdBlockDetector';
import ScriptManager from '@/components/ScriptManager'; // ✅ ADD THIS
import { Toaster } from 'sonner';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';
import SkipToContent from '@/components/SkipToContent';
import Script from 'next/script';

const fy = getCurrentFiscalYear();

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-rubik',
  preload: true,
  fallback: ['system-ui', 'arial'],
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
  verification: {
    google: 'YOUR_GSC_VERIFICATION_CODE_HERE',
  },
  other: {
    'google-adsense-account': 'ca-pub-6648091987919638',
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
      <body className={rubik.className}>
        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6648091987919638"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

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

        {/* ✅ ADD: ScriptManager for GA4 + Clarity with Consent */}
        <ScriptManager />

        {/* Global Header */}
        <Header />
        <SkipToContent />

        {/* Main Content Area */}
        <main style={{ minHeight: '80vh' }}>{children}</main>

        {/* Ad Block Detector */}
        <AdBlockDetector />

        {/* Footer */}
        <Footer />

        {/* Cookie Consent Banner */}
        <CookieBanner />

        {/* ❌ REMOVE: Clarity is handled by ScriptManager */}
        {/* Delete the manual Clarity script below */}
      </body>
    </html>
  );
}
