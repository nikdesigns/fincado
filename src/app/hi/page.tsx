// src/app/hi/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import HindiHubClient from './HindiHubClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

// ✅ SEO METADATA (Now possible because this is a Server Component)
export const metadata: Metadata = {
  title:
    'Fincado हिंदी: फाइनेंशियल कैलकुलेटर और गाइड्स (Financial Tools in Hindi)',
  description:
    'Fincado पर हिंदी में सभी वित्तीय कैलकुलेटर और गाइड्स प्राप्त करें। SIP, EMI, PPF, Sukanya Samriddhi, GST और होम लोन की जानकारी अपनी भाषा में।',
  keywords: [
    'Financial Calculators Hindi',
    'SIP Calculator Hindi',
    'EMI Calculator Hindi',
    'Fincado Hindi',
    'Loan Guides Hindi',
    'Investment Planning Hindi',
    'Mutual Fund Guide Hindi',
    'PPF Calculator Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/',
    languages: {
      'en-IN': 'https://www.fincado.com/',
    },
  },
  openGraph: {
    title: 'Fincado हिंदी - अब फाइनेंस को समझना हुआ आसान',
    description:
      'निवेश, लोन और बचत की सटीक गणना करें और एक्सपर्ट गाइड्स पढ़ें।',
    url: 'https://www.fincado.com/hi/',
    type: 'website',
    locale: 'hi_IN',
  },
};

export default function HindiHubPage() {
  return (
    <main className="container" style={{ padding: '40px 20px' }}>
      {/* ✅ Breadcrumb is static, so it sits well in Server Component */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
        ]}
      />

      {/* Render the interactive Client Component */}
      <HindiHubClient />
    </main>
  );
}
