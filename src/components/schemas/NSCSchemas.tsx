import React from 'react';

export function NSCSchemas() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate NSC Maturity Amount',
    description:
      'Step-by-step guide to calculate National Savings Certificate returns with compound interest',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Investment Amount',
        text: 'Enter the principal amount you want to invest in NSC (minimum ₹1,000)',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Interest Rate',
        text: 'Set the current NSC interest rate (7.7% p.a. as of Q4 FY 2025-26)',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select Tenure',
        text: 'NSC has a fixed 5-year maturity period',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'View Results',
        text: 'See maturity amount, total interest earned, and Section 80C tax benefits',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the current NSC interest rate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The current NSC interest rate is 7.7% per annum (Q4 FY 2025-26). The interest is compounded annually but paid at maturity after 5 years.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is NSC interest taxable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, NSC interest is fully taxable. However, the accrued interest for the first 4 years is deemed reinvested and qualifies for Section 80C deduction. The 5th year interest is taxable without 80C benefit.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum investment in NSC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The minimum investment in NSC is ₹1,000 (in multiples of ₹100). There is no maximum limit, but only ₹1.5 lakh per year qualifies for Section 80C tax deduction.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
