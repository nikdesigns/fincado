import React from 'react';

interface Props {
  name: string;
  description: string;
  url: string;
}

const CalculatorSchema = ({ name, description, url }: Props) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description: description,
    url: url,
    author: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://www.fincado.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default CalculatorSchema;
