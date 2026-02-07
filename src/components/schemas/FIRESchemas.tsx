import Script from 'next/script';

export function FIRESchemas() {
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
    name: 'FIRE Calculator - Financial Independence Retire Early',
    description:
      'Calculate your FIRE Number based on Safe Withdrawal Rate, expenses, and investment returns. Plan early retirement with comprehensive FIRE calculator.',
    url: 'https://fincado.com/fire-calculator/',
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
      name: 'FIRE Calculator',
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
    name: 'How to Calculate Your FIRE Number',
    description:
      'Step-by-step guide to calculating Financial Independence Retire Early (FIRE) number using Safe Withdrawal Rate, expenses, and investment strategy.',
    image: 'https://fincado.com/og-fire-calculator.jpg',
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
        name: 'Enter Current and Target FIRE Age',
        text: 'Input your current age and target FIRE age (when you want to retire early, e.g., 40-45).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Annual Living Expenses',
        text: 'Enter your current annual expenses. This will be adjusted for inflation until your FIRE age.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Input Current Corpus',
        text: 'Enter total current savings and investments (mutual funds, stocks, EPF, PPF, FDs combined).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Adjust Safe Withdrawal Rate',
        text: 'Set SWR (Safe Withdrawal Rate): 3-3.5% for India (conservative), 4% for aggressive. Lower SWR = higher corpus needed.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Set Expected Returns and Inflation',
        text: 'Configure expected investment return (12% for equity) and inflation rate (6% for India).',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Review Your FIRE Number',
        text: 'Check the target corpus (FIRE Number) needed for financial independence based on your withdrawal rate.',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Calculate Monthly SIP Required',
        text: 'See monthly investment (SIP) required to bridge the gap between current corpus and FIRE goal.',
      },
      {
        '@type': 'HowToStep',
        position: 8,
        name: 'Save and Track Progress',
        text: 'Save calculation, track annually, and adjust as expenses or market returns change.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'FIRE (Financial Independence, Retire Early)',
    description:
      'FIRE strategy for achieving financial independence through aggressive saving (50-70%), low-cost index investing, and living off investment returns.',
    category: 'Early Retirement and Financial Independence',
    feesAndCommissionsSpecification:
      'Free calculator. Recommended investments: Index funds (0.1-0.5% expense ratio), direct equity (brokerage ~0.05%), NPS (0.1%). Avoid high-cost active funds (>1.5%).',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '10-12',
      unitText:
        'Percent per annum (expected long-term equity returns for FIRE planning)',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'FIRE Calculator Service',
    description:
      'Free online FIRE calculator for early retirement planning, corpus calculation using Safe Withdrawal Rate, SIP planning, and financial independence tracking.',
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
      name: 'FIRE Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FIRE Number Calculation',
            description:
              'Calculate target corpus using Safe Withdrawal Rate (SWR) method',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Inflation-Adjusted Planning',
            description: 'Account for inflation in future expense calculations',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gap Analysis',
            description:
              'Identify shortfall between current savings and FIRE goal',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lean vs Fat FIRE Comparison',
            description:
              'Compare different FIRE strategies and lifestyle choices',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Timeline Visualization',
            description:
              'See years remaining until financial independence goal',
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'FIRE Calculator 2026 - Financial Independence Retire Early Guide',
    description:
      'Complete FIRE guide with calculator, Safe Withdrawal Rate strategies, Lean FIRE vs Fat FIRE comparison, investment allocation, and early retirement planning for India.',
    image: 'https://fincado.com/og-fire-calculator.jpg',
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
    datePublished: '2026-01-10',
    dateModified: '2026-02-07',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/fire-calculator/',
    },
  };

  return (
    <>
      <Script
        id="fire-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="fire-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="fire-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="fire-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="fire-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="fire-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
