import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Rubik } from 'next/font/google';
import Script from 'next/script';
import type { Metadata, Viewport } from 'next';

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
        {/* Placeholder for Google Search Console (Get this from GSC settings if you have it) */}
        {/* <meta name="google-site-verification" content="YOUR_SEARCH_CONSOLE_CODE" /> */}
      </head>
      <body>
        {/* 1. Google AdSense (Keep your existing client ID here) */}
        <Script
          id="adsbygoogle-init"
          strategy="lazyOnload"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
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

        {/* Global Header */}
        <Header />

        {/* Main Content Area */}
        <div style={{ minHeight: '80vh' }}>{children}</div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
