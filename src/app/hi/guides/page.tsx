import type { Metadata } from 'next';
import React from 'react';
import articlesData from '@/data/articles.json';
import HindiGuidesClient from './HindiGuidesClient';

// --- ENHANCED SEO METADATA ---
export const metadata: Metadata = {
  title: 'फाइनेंशियल गाइड्स हिंदी में | SIP, लोन, टैक्स की पूरी जानकारी (2026)',
  description:
    'SIP, म्यूचुअल फंड, होम लोन, PPF, सुकन्या समृद्धि, रिटायरमेंट और टैक्स की विस्तृत गाइड्स हिंदी में। भारत के सर्वश्रेष्ठ वित्तीय लेख पढ़ें और स्मार्ट निवेश करें।',
  keywords: [
    'financial guides hindi',
    'sip guide hindi',
    'mutual fund guide hindi',
    'home loan guide hindi',
    'ppf guide hindi',
    'sukanya samriddhi guide',
    'retirement planning hindi',
    'income tax guide hindi',
    'investment tips hindi',
    'financial literacy hindi',
    'personal finance hindi',
    'tax saving tips hindi',
  ],
  authors: [{ name: 'Fincado Team' }],
  creator: 'Fincado',
  publisher: 'Fincado',
  alternates: {
    canonical: 'https://fincado.com/hi/guides/',
    languages: {
      en: 'https://fincado.com/guides/',
      hi: 'https://fincado.com/hi/guides/',
    },
  },
  openGraph: {
    title: 'फाइनेंशियल गाइड्स हिंदी में | Fincado',
    description:
      'SIP, लोन, टैक्स और निवेश की विस्तृत गाइड्स हिंदी में। वित्तीय साक्षरता के लिए भारत का #1 प्लेटफॉर्म।',
    url: 'https://fincado.com/hi/guides/',
    siteName: 'Fincado',
    type: 'website',
    locale: 'hi_IN',
    images: [
      {
        url: 'https://fincado.com/og-hindi-guides.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Hindi Financial Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'फाइनेंशियल गाइड्स हिंदी में',
    description: 'SIP, लोन, टैक्स और निवेश की विस्तृत जानकारी हिंदी में।',
    images: ['https://fincado.com/og-hindi-guides.jpg'],
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
  other: {
    'content-language': 'hi-IN',
  },
};

// Get guide count for metadata
const hindiGuides = articlesData.filter(
  (article) => article.language === 'hi' && !article.hidden,
);

export default function HindiGuidesPage() {
  // Structured Data - CollectionPage Schema
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://fincado.com/hi/guides/',
    name: 'फाइनेंशियल गाइड्स हिंदी में',
    description:
      'SIP, म्यूचुअल फंड, होम लोन, PPF और टैक्स की विस्तृत गाइड्स हिंदी में।',
    url: 'https://fincado.com/hi/guides/',
    inLanguage: 'hi-IN',
    numberOfItems: hindiGuides.length,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
      name: 'Fincado',
      url: 'https://fincado.com',
    },
  };

  // Blog Schema
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://fincado.com/hi/guides/#blog',
    name: 'Fincado Hindi Financial Guides',
    description: 'वित्तीय साक्षरता और निवेश की जानकारी हिंदी में',
    url: 'https://fincado.com/hi/guides/',
    inLanguage: 'hi-IN',
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://fincado.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fincado.com/logo.png',
      },
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <HindiGuidesClient />
    </>
  );
}
