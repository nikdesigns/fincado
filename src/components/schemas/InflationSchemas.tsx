import Script from 'next/script';

export function InflationSchemas() {
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
    name: 'Inflation Calculator India 2026 - Future Value Calculator',
    description:
      'Free inflation calculator to estimate future cost of living, education, medical expenses. Calculate purchasing power erosion and real rate of return. Learn Rule of 72 and inflation protection strategies.',
    url: 'https://fincado.com/inflation-calculator/',
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
      name: 'Inflation Calculator',
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
    name: 'How to Calculate Inflation Impact on Future Expenses',
    description:
      'Step-by-step guide to calculating future value of money considering inflation. Understand purchasing power erosion and plan investments accordingly.',
    image: 'https://fincado.com/og-inflation-calculator.jpg',
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
        name: 'Identify Current Expense Amount',
        text: 'Determine the current cost of the item or expense you want to project. For example, ₹50,000 for annual school fees, ₹1,00,000 for medical insurance, or ₹10,000 monthly groceries.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Select Appropriate Inflation Rate',
        text: 'Choose inflation rate based on category: 6% for general CPI, 10-12% for education/medical, 8% for real estate, 7% for food. Use historical average or RBI projections.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Set Time Period',
        text: 'Enter number of years in the future when you need this amount. For child education, calculate years until college. For retirement, years until retirement age.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Calculate Future Value',
        text: 'Calculator uses compound formula: FV = PV × (1 + r)^n where PV is present value, r is inflation rate, n is years. Shows total future cost and inflation impact separately.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Plan Investment Strategy',
        text: 'Ensure your investments grow faster than inflation. Equity/mutual funds (12%+) beat inflation. FDs (7%) barely keep pace. Savings account (3-4%) guarantees wealth erosion.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Inflation Rate India (Consumer Price Index)',
    description:
      'Inflation is the rate at which prices of goods and services rise, reducing purchasing power. Measured by CPI (Consumer Price Index). RBI targets 4% (+/- 2%). Current India CPI around 5-6%.',
    category: 'Economic Indicator',
    feesAndCommissionsSpecification:
      'Free to track. Published monthly by Ministry of Statistics (MOSPI). No cost to access inflation data.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '4-6',
      unitText:
        'Percent (RBI inflation target: 4% ±2%. Sectoral inflation: Education 10-12%, Medical 12-14%, Food 7-8%)',
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Inflation Calculator 2026 India - Complete Guide to Purchasing Power',
    description:
      'Complete guide to understanding inflation impact in India. Calculate future expenses, learn Rule of 72, compare real returns across assets, and discover inflation protection strategies for retirement planning.',
    image: 'https://fincado.com/og-inflation-calculator.jpg',
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
      '@id': 'https://fincado.com/inflation-calculator/',
    },
  };

  return (
    <>
      <Script
        id="inflation-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="inflation-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="inflation-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="inflation-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="inflation-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
