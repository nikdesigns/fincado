import Script from 'next/script';

export function RDSchemas() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fincado',
    url: 'https://fincado.com',
    logo: '/logo.png',
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
    name: 'RD Calculator - Recurring Deposit Calculator India',
    description:
      'Calculate Recurring Deposit maturity amount with quarterly compounding. Compare bank RD rates, TDS calculation, and senior citizen benefits.',
    url: 'https://fincado.com/rd-calculator/',
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'RD Calculator',
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
    name: 'How to Calculate Recurring Deposit Returns',
    description:
      'Step-by-step guide to calculating RD maturity amount, interest, and TDS deductions with quarterly compounding.',
    image: '/og-rd-calculator.jpg',
    totalTime: 'PT3M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Monthly Deposit Amount',
        text: 'Input the fixed amount you want to deposit every month (minimum ₹500).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Interest Rate',
        text: 'Enter the interest rate offered by your bank (typically 6.7-7.5% for regular customers).',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select Tenure',
        text: 'Choose investment period in years and additional months (minimum 6 months, maximum 10 years).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Enable Senior Citizen Mode',
        text: 'Toggle senior citizen option if you are 60+ years to get extra 0.5% interest.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'View Results',
        text: 'Check maturity amount, total investment, interest earned, and estimated TDS deduction.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Compare Bank Rates',
        text: 'Use the bank rate comparison feature to find the best RD rates from major banks and Post Office.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Recurring Deposit (RD)',
    description:
      'Recurring Deposit is a regular savings product allowing fixed monthly deposits with guaranteed returns and quarterly compounding.',
    category: 'Recurring Deposit',
    feesAndCommissionsSpecification:
      'Premature withdrawal penalty: 0.5-1% on interest rate. Late payment penalty: ₹1-₹5 per ₹100 per missed installment.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '6.7-7.5',
      unitText: 'Percent per annum',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'RD Calculator Service',
    description:
      'Free online Recurring Deposit calculator with quarterly compounding, TDS calculation, bank rate comparison, and senior citizen benefits.',
    provider: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://fincado.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RD Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maturity Calculation',
            description:
              'Calculate RD maturity amount with quarterly compounding',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TDS Calculator',
            description: 'Estimate TDS deduction on RD interest',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bank Rate Comparison',
            description:
              'Compare RD rates across major Indian banks and Post Office',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Senior Citizen Calculator',
            description: 'Calculate RD returns with senior citizen bonus rates',
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'RD Calculator 2026 - Complete Guide to Recurring Deposits',
    description:
      'Comprehensive guide to RD investments, maturity calculation with quarterly compounding, bank rate comparison, and tax implications.',
    image: '/og-rd-calculator.jpg',
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
    datePublished: '2026-01-15',
    dateModified: '2026-02-07',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/rd-calculator/',
    },
  };

  return (
    <>
      <Script
        id="rd-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="rd-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="rd-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="rd-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="rd-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="rd-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
