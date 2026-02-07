import Script from 'next/script';

export function RetirementSchemas() {
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
    name: 'Retirement Planning Calculator',
    description:
      'Calculate retirement corpus needed based on current expenses, inflation, and returns. Plan monthly SIP and ensure comfortable retirement.',
    url: 'https://fincado.com/retirement-calculator/',
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
      name: 'Retirement Calculator',
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
    name: 'How to Calculate Retirement Corpus',
    description:
      'Step-by-step guide to calculating retirement corpus needed, planning monthly SIP, and ensuring financial independence post-retirement.',
    image: 'https://fincado.com/og-retirement-calculator.jpg',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Current Age and Retirement Age',
        text: 'Input your current age and desired retirement age (typically 60 years).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Current Monthly Expense',
        text: "Enter today's monthly household expense (will be adjusted for inflation automatically).",
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Input Current Savings',
        text: 'Enter total current retirement savings (EPF, PPF, mutual funds, stocks, FDs combined).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Adjust Advanced Rates',
        text: 'Set inflation rate (6%), pre-retirement return (12%), and post-retirement return (8%) based on your risk profile.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Review Target Corpus',
        text: 'Check the retirement corpus needed for 25 years of comfortable retirement.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Calculate Monthly SIP',
        text: 'See monthly SIP required to bridge gap between current savings and retirement goal.',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Save or Share Plan',
        text: 'Save your retirement plan for future reference or share with family/financial advisor.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Retirement Planning',
    description:
      'Comprehensive retirement corpus calculation accounting for inflation, life expectancy, and investment returns to ensure financial independence post-retirement.',
    category: 'Retirement and Pension Planning',
    feesAndCommissionsSpecification:
      'Free calculator. Actual investment costs vary by product: Equity MFs (0.5-2% expense ratio), NPS (0.1%), PPF (no charges). Post-retirement withdrawals: LTCG 12.5% on equity (>₹1.25L/year).',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '10-12',
      unitText:
        'Percent per annum (expected portfolio returns for retirement planning)',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'Retirement Planning Calculator Service',
    description:
      'Free online retirement calculator for corpus calculation, SIP planning, inflation adjustment, and post-retirement income projections.',
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
      name: 'Retirement Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Inflation-Adjusted Corpus Calculation',
            description:
              'Calculate retirement corpus with automatic inflation adjustment',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Monthly SIP Requirement',
            description:
              'Determine monthly SIP needed to achieve retirement goal',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Savings Gap Analysis',
            description:
              'Identify shortfall between current savings and retirement target',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Real Return Calculation',
            description: 'Calculate inflation-adjusted post-retirement returns',
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Retirement Planning Calculator 2026 - Complete Retirement Guide',
    description:
      'Comprehensive retirement planning guide with corpus calculation, 4% rule, SIP strategies, investment allocation, common mistakes, and FIRE planning.',
    image: 'https://fincado.com/og-retirement-calculator.jpg',
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
      '@id': 'https://fincado.com/retirement-calculator/',
    },
  };

  return (
    <>
      <Script
        id="retirement-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="retirement-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="retirement-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="retirement-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="retirement-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="retirement-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
