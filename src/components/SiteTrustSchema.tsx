import React from 'react';

export default function SiteTrustSchema() {
  const trustSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://fincado.com/#organization',
        name: 'Fincado',
        alternateName: 'Fincado Finance',
        url: 'https://fincado.com/',
        description:
          'Fincado is an independent Indian personal finance platform offering loan calculators, rate comparisons, investment tools, and expert-written financial guides.',
        foundingDate: '2024',
        logo: {
          '@type': 'ImageObject',
          url: 'https://fincado.com/brand/logo-horizontal.svg',
          width: 200,
          height: 50,
        },
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
        name: 'Fincado',
        url: 'https://fincado.com/',
        description:
          'India\'s independent financial tools platform — home loan rates, EMI calculators, investment guides, and tax planning.',
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
