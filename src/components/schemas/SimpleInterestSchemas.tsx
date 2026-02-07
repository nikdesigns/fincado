import Script from 'next/script';

export function SimpleInterestSchemas() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fincado',
    url: 'https://fincado.com',
    logo: 'https://fincado.com/logo.png',
    sameAs: [
      'https://twitter.com/fincado',
      'https://facebook.com/fincado',
      'https://linkedin.com/company/fincado',
    ],
  };

  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Simple Interest Calculator India 2026 - Flat Rate Loan Calculator',
    description:
      'Free Simple Interest (SI) calculator to calculate interest on loans and investments. Compare flat rate vs reducing balance interest. Understand car loan flat rates, personal loans, and short-term lending.',
    url: 'https://fincado.com/simple-interest-calculator/',
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fincado.com/logo.png',
      },
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Simple Interest Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
    },
  };

  // HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Simple Interest on Loans and Investments',
    description:
      'Step-by-step guide to calculating simple interest using the SI formula. Understand flat rate loans, compare with reducing balance, and avoid common loan traps.',
    image: 'https://fincado.com/og-simple-interest-calculator.jpg',
    totalTime: 'PT2M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Principal Amount',
        text: 'Input the original loan or investment amount (Principal). For car loans, this is vehicle price minus down payment. For FDs, this is deposit amount. Typically ranges from ₹10,000 to ₹50 lakhs.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Input Interest Rate',
        text: 'Enter annual interest rate percentage. Flat rate car loans: 7-10%. Personal loans: 10-18%. Gold loans: 7-12%. Student loans: 8-12%. Always clarify if rate is "flat" or "reducing balance".',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Set Time Period',
        text: 'Enter loan tenure in years. Car loans: 3-7 years. Personal loans: 1-5 years. Gold loans: 1-2 years. For months, divide by 12 (e.g., 18 months = 1.5 years).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Calculate Simple Interest',
        text: 'Calculator applies formula: SI = (P × R × T) / 100. Shows total interest amount and final maturity value (Principal + Interest). Year-wise breakdown available.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Compare with Reducing Balance',
        text: 'If flat rate, convert to effective reducing rate (approximately 2x flat rate). Compare total interest with EMI-based reducing balance loans. Flat rate always costs more.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Simple Interest Loan (Flat Rate)',
    description:
      'Simple Interest is linear interest calculation where interest is charged only on original principal amount, not on accumulated interest. Formula: SI = (P×R×T)/100. Common in flat rate car loans, gold loans, and short-term lending.',
    category: 'Loan Product',
    feesAndCommissionsSpecification:
      'Simple interest loans typically have fixed processing fees (1-3% of principal). No prepayment penalties in most cases. Lower complexity than EMI loans.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '7-18',
      unitText:
        'Percent per annum (Car loans: 7-10% flat, Personal loans: 10-18% flat, Gold loans: 7-12% flat, Student loans: 8-12% flat)',
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Simple Interest Calculator 2026 - Complete Guide to Flat Rate Loans',
    description:
      'Complete guide to Simple Interest calculation in India. Learn SI formula, understand flat rate vs reducing balance difference, compare SI vs compound interest, and avoid common loan traps with flat rate car financing.',
    image: 'https://fincado.com/og-simple-interest-calculator.jpg',
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
        url: 'https://fincado.com/logo.png',
      },
    },
    datePublished: '2026-01-08',
    dateModified: '2026-02-08',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/simple-interest-calculator/',
    },
  };

  return (
    <>
      <Script
        id="si-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="si-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="si-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="si-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="si-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
