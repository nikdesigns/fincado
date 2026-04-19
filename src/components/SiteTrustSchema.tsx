import React from 'react';

export default function SiteTrustSchema() {
  const trustSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://fincado.com/#organization',
        name: 'Fincado',
        url: 'https://fincado.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://fincado.com/brand/logo-horizontal.svg',
        },
        email: 'support@fincado.com',
        areaServed: 'IN',
        publishingPrinciples: 'https://fincado.com/editorial-guidelines/',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@fincado.com',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://fincado.com/#website',
        name: 'Fincado',
        url: 'https://fincado.com/',
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
