import React from 'react';

interface CalculatorSchemaProps {
  name: string;
  description: string;
  url: string;
}

export default function CalculatorSchema({
  name,
  description,
  url,
}: CalculatorSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name,
    description: description,
    url: url,
    applicationCategory: 'FinanceApplication',
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    operatingSystem: 'Any',
    publisher: {
      '@id': 'https://fincado.com/#organization',
    },
    creator: {
      '@id': 'https://fincado.com/#organization',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
