import React from 'react';

export function APYSchemas() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate APY Monthly Contribution',
    description:
      'Step-by-step guide to calculate your Atal Pension Yojana monthly contribution based on age and desired pension',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Select Your Joining Age',
        text: 'Choose your current age between 18 and 40 years. Younger age means lower monthly contribution.',
        position: 1,
      },
      {
        '@type': 'HowToStep',
        name: 'Choose Desired Pension Amount',
        text: 'Select your target monthly pension from ₹1,000 to ₹5,000. Higher pension requires higher contribution.',
        position: 2,
      },
      {
        '@type': 'HowToStep',
        name: 'Select Payment Frequency',
        text: 'Choose Monthly, Quarterly, or Half-Yearly contribution frequency based on your convenience.',
        position: 3,
      },
      {
        '@type': 'HowToStep',
        name: 'View Your Contribution',
        text: 'Calculator instantly shows your periodic contribution amount, total investment till age 60, and corpus for nominee.',
        position: 4,
      },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'APY Calculator - Atal Pension Yojana Calculator',
    description:
      'Free online calculator for Atal Pension Yojana (APY). Calculate monthly contribution, total investment, and nominee corpus based on your age and desired pension.',
    url: 'https://fincado.com/apy-calculator/',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Calculate APY monthly contribution',
      'Age-wise contribution comparison',
      'Compare pension scenarios',
      'Save calculation history',
      'Share via WhatsApp',
      'Government-backed pension planning',
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'APY Calculator - Calculate Atal Pension Yojana Contribution',
    description:
      'Complete guide to Atal Pension Yojana with calculator. Learn about guaranteed pension, eligibility, contribution rates, and nominee benefits.',
    author: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://fincado.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    datePublished: '2024-01-15',
    dateModified: '2026-02-07',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/apy-calculator/',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
