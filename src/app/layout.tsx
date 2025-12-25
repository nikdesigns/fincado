import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Rubik } from 'next/font/google';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata, Viewport } from 'next';
import CookieBanner from '@/components/CookieBanner';

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
  metadataBase: new URL('https://www.fincado.com'),
  title: {
    default: 'Fincado — Smart Financial Calculators for India',
    template: '%s | Fincado',
  },
  description:
    'India’s trusted financial platform for EMI, SIP, Loan, and Tax planning. Accurate bank-grade calculators updated for 2025.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Fincado',
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
        {/* ✅ ADDS THE LOADING BAR */}
        <NextTopLoader
          color="#80d843"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} // Spinner is usually annoying, bar is enough
          easing="ease"
          speed={200}
          shadow="0 0 10px #16a34a,0 0 5px #16a34a"
        />
        {/* 1. ✅ Google AdSense (Updated to Next/Script) */}
        {/* 1. ✅ Google AdSense (Updated to Next/Script) */}
        <Script
          id="adsense-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6648091987919638"
          strategy="afterInteractive"
        />

        {/* 2. ✅ Google Analytics 4 (Your ID: G-KQJ4P0CM5Q) */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
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

        {/* 3. ✅ Microsoft Clarity (Heatmaps & Recordings) */}
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
        <div style={{ minHeight: '80vh' }}>{children}</div>

        {/* Footer */}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
