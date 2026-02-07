import Script from 'next/script';

export function FDSchemas() {
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
    name: 'FD Calculator - Fixed Deposit Calculator India',
    description:
      'Calculate Fixed Deposit maturity amount, interest earned, and TDS deductions. Compare bank FD rates and senior citizen benefits.',
    url: 'https://fincado.com/fd-calculator/',
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
      name: 'FD Calculator',
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
    name: 'How to Calculate Fixed Deposit Returns',
    description:
      'Step-by-step guide to calculating FD maturity amount, interest, and TDS deductions.',
    image: 'https://fincado.com/og-fd-calculator.jpg',
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
        name: 'Enter Deposit Amount',
        text: 'Input the principal amount you want to invest in FD (minimum ₹5,000).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Interest Rate',
        text: 'Enter the interest rate offered by your bank (typically 6.5-7.5% for regular customers).',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select Tenure',
        text: 'Choose investment period in years and additional months (minimum 7 days, maximum 10 years).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Choose Compounding',
        text: 'Select compounding frequency - monthly, quarterly (most common), half-yearly, or yearly.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Enable Senior Citizen Mode',
        text: 'Toggle senior citizen option if you are 60+ years to get extra 0.5% interest.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'View Results',
        text: 'Check maturity amount, interest earned, and estimated TDS deduction.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Fixed Deposit (FD)',
    description:
      'Bank Fixed Deposit is a secure investment instrument offering guaranteed returns with DICGC insurance up to ₹5 lakh.',
    category: 'Fixed Deposit',
    feesAndCommissionsSpecification:
      'Premature withdrawal penalty: 0.5-1% on interest rate. No other fees typically.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '6.5-7.5',
      unitText: 'Percent per annum',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'FD Calculator Service',
    description:
      'Free online Fixed Deposit calculator with TDS calculation, bank rate comparison, and senior citizen benefits.',
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
      name: 'FD Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maturity Calculation',
            description: 'Calculate FD maturity amount with compound interest',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TDS Calculator',
            description: 'Estimate TDS deduction on FD interest',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bank Rate Comparison',
            description: 'Compare FD rates across major Indian banks',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Senior Citizen Calculator',
            description: 'Calculate FD returns with senior citizen bonus rates',
          },
        },
      ],
    },
  };

  return (
    <>
      <Script
        id="fd-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="fd-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="fd-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="fd-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="fd-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}
