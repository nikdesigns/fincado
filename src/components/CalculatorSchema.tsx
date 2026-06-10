import React from 'react';

interface CalculatorSchemaProps {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
  priceCurrency?: string;
}

export default function CalculatorSchema({
  name,
  description,
  url,
  inLanguage = 'en-IN',
  priceCurrency = 'INR',
}: CalculatorSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name,
    description: description,
    url: url,
    applicationCategory: 'FinanceApplication',
    inLanguage,
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
      priceCurrency,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
