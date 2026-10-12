import React from 'react';
import { BRAND, BRAND_PROFILES } from '@/lib/brand';

export default function SiteTrustSchema() {
  const trustSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://fincado.com/#organization',
        name: BRAND.name,
        alternateName: [...BRAND.alternateNames],
        url: BRAND.url,
        description: BRAND.description,
        foundingDate: BRAND.foundingDate,
        logo: {
          '@type': 'ImageObject',
          url: BRAND.logo.url,
          width: BRAND.logo.width,
          height: BRAND.logo.height,
        },
        image: BRAND.logo.url,
        ...(BRAND_PROFILES.length
          ? { sameAs: BRAND_PROFILES.map((profile) => profile.url) }
          : {}),
        email: 'support@fincado.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
        areaServed: 'IN',
        knowsAbout: [
          'Home loan interest rates India',
          'EMI calculation',
          'SIP mutual fund investing',
          'Income tax planning India',
          'Fixed deposit comparison',
          'Credit score improvement',
          'Retirement planning India',
        ],
        publishingPrinciples: 'https://fincado.com/editorial-guidelines/',
        founder: {
          '@type': 'Person',
          '@id': 'https://fincado.com/#founder',
          name: 'Nitin Kaushik',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@fincado.com',
            url: 'https://fincado.com/contact/',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi'],
          },
        ],
      },
      {
        '@type': 'Person',
        '@id': 'https://fincado.com/#founder',
        name: 'Nitin Kaushik',
        jobTitle: 'Founder & Editor-in-Chief',
        url: 'https://fincado.com/about/',
        sameAs: [
          'https://www.linkedin.com/in/nitin-kaushik-9b4a33109/',
        ],
        worksFor: {
          '@id': 'https://fincado.com/#organization',
        },
        knowsAbout: [
          'Personal finance in India',
          'Home loan comparison and EMI planning',
          'Mutual funds and SIP investing',
          'Indian income tax planning',
          'Retirement and wealth planning',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://fincado.com/#website',
        name: BRAND.name,
        alternateName: [...BRAND.alternateNames],
        url: BRAND.url,
        description: BRAND.description,
        inLanguage: ['en-IN', 'hi-IN'],
        publisher: {
          '@id': 'https://fincado.com/#organization',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(trustSchema) }}
    />
  );
}
