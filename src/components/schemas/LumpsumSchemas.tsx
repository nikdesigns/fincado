import Script from 'next/script';

export function LumpsumSchemas() {
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
    name: 'Lumpsum Calculator - One-Time Investment Returns Calculator',
    description:
      'Calculate lumpsum mutual fund returns with compound interest. Estimate future value, CAGR, and compare lumpsum vs SIP strategies.',
    url: 'https://fincado.com/lumpsum-calculator/',
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
      name: 'Lumpsum Calculator',
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
    name: 'How to Calculate Lumpsum Investment Returns',
    description:
      'Step-by-step guide to calculating lumpsum mutual fund returns with compound interest and CAGR.',
    image: 'https://fincado.com/og-lumpsum-calculator.jpg',
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
        name: 'Enter Investment Amount',
        text: 'Input the one-time lumpsum amount you want to invest (minimum ₹5,000).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Expected Return Rate',
        text: 'Enter expected annual return rate (8-12% for equity funds, 6-8% for debt funds).',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select Time Period',
        text: 'Choose investment duration in years. Longer periods benefit more from compounding.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Choose Compounding Frequency',
        text: 'Select how often returns compound (annual is standard for mutual funds).',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'View Results',
        text: 'Check future value, wealth gained, CAGR, and investment multiple instantly.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Analyze Advanced Metrics',
        text: 'Enable advanced metrics to see absolute returns, investment multiple, and detailed breakdown.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Lumpsum Mutual Fund Investment',
    description:
      'One-time investment in mutual funds that grows through compound interest. Ideal for deploying windfall gains or investing during market corrections.',
    category: 'Mutual Fund',
    feesAndCommissionsSpecification:
      'Exit load varies by fund (typically 1% if redeemed within 1 year for equity funds). Tax: 20% STCG (<1 year), 12.5% LTCG on gains above ₹1.25L (>1 year).',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '12-15',
      unitText: 'Percent per annum (historical equity CAGR)',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'Lumpsum Investment Calculator Service',
    description:
      'Free online lumpsum calculator with compound interest calculation, CAGR analysis, investment multiple tracking, and lumpsum vs SIP comparison.',
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
      name: 'Lumpsum Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Future Value Calculation',
            description:
              'Calculate maturity value of lumpsum investment with compound interest',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CAGR Analysis',
            description: 'View Compound Annual Growth Rate for your investment',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Investment Multiple Tracking',
            description: 'See how many times your investment grows over time',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lumpsum vs SIP Comparison',
            description:
              'Compare one-time investment vs systematic monthly investing',
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
      'Lumpsum Calculator 2026 - Complete Guide to One-Time Investments',
    description:
      'Comprehensive guide to lumpsum investing with compound interest calculation, CAGR analysis, lumpsum vs SIP comparison, STP strategies, and taxation rules.',
    image: 'https://fincado.com/og-lumpsum-calculator.jpg',
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
      '@id': 'https://fincado.com/lumpsum-calculator/',
    },
  };

  return (
    <>
      <Script
        id="lumpsum-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="lumpsum-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="lumpsum-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="lumpsum-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="lumpsum-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="lumpsum-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
