import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Rubik } from 'next/font/google';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata, Viewport } from 'next';
import CookieBanner from '@/components/CookieBanner';
import AdBlockDetector from '@/components/AdBlockDetector';
import { Toaster } from 'sonner';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-rubik',
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
  description:
    'India’s trusted financial platform for EMI, SIP, Loan, and Tax planning. Accurate bank-grade calculators updated for 2025.',
  // ✅ FIXED: Detailed Icon Configuration for Google Search
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Fallback for old browsers
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' }, // High-Res for Google
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={rubik.className}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-6648091987919638" />
      </head>
      <body>
        <Toaster position="top-right" richColors />
        <AdBlockDetector />

        {/* ✅ ADDS THE LOADING BAR */}
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

        {/* 1. ✅ Google AdSense */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6648091987919638"
          strategy="afterInteractive"
        />

        {/* 2. ✅ Google Analytics 4 */}
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-KQJ4P0CM5Q"
        />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KQJ4P0CM5Q', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* 3. ✅ Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "unxeapj33d");
          `}
        </Script>

        {/* Global Header */}
        <Header />

        {/* Main Content Area */}
        <main style={{ minHeight: '80vh' }}>{children}</main>

        {/* Footer */}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
