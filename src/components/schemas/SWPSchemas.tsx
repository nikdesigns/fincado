import Script from 'next/script';

export function SWPSchemas() {
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
    name: 'SWP Calculator - Systematic Withdrawal Plan Calculator',
    description:
      'Calculate systematic withdrawals from mutual funds for retirement income. Plan regular cash flow, check corpus sustainability, and optimize withdrawal strategies.',
    url: 'https://fincado.com/swp-calculator/',
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
      name: 'SWP Calculator',
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
    name: 'How to Calculate Systematic Withdrawal Plan Returns',
    description:
      'Step-by-step guide to calculating SWP returns, planning retirement income, and ensuring corpus sustainability.',
    image: 'https://fincado.com/og-swp-calculator.jpg',
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
        name: 'Enter Initial Corpus',
        text: 'Input your accumulated investment corpus that you want to withdraw from regularly.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Withdrawal Amount',
        text: 'Enter the fixed amount you want to withdraw monthly, quarterly, or yearly.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Withdrawal Frequency',
        text: 'Select how often you want to withdraw: monthly (regular income), quarterly, or yearly.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Set Expected Return Rate',
        text: 'Enter expected annual return rate (8-10% for balanced funds, 10-12% for equity funds).',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Select Time Period',
        text: 'Choose investment duration. Calculator will show if corpus sustains or gets exhausted.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Analyze Results',
        text: 'Check remaining corpus, total withdrawn, and year-wise breakdown. Adjust withdrawal if corpus exhausts early.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Systematic Withdrawal Plan (SWP)',
    description:
      'Mutual fund facility for regular withdrawals while remaining corpus continues to grow. Ideal for retirement income, tax-efficient cash flow, and flexible withdrawal strategies.',
    category: 'Mutual Fund Withdrawal Plan',
    feesAndCommissionsSpecification:
      'No SWP charges. Exit load applies per fund rules. Tax: 12.5% LTCG on equity gains above ₹1.25L/year (>1 year holding). Debt fund gains taxed as per income slab.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '8-12',
      unitText: 'Percent per annum (expected returns while withdrawing)',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'SWP Calculator Service',
    description:
      'Free online SWP calculator for retirement income planning, corpus sustainability analysis, tax-efficient withdrawals, and monthly income projections.',
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
      name: 'SWP Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corpus Sustainability Check',
            description:
              'Verify if your corpus sustains for planned withdrawal period',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Multiple Withdrawal Frequencies',
            description:
              'Calculate monthly, quarterly, or yearly withdrawal strategies',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Year-wise Breakdown',
            description: 'Track corpus depletion and withdrawals year by year',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Exhaustion Warning',
            description:
              'Get alerts when corpus will be exhausted based on withdrawal rate',
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SWP Calculator 2026 - Complete Guide to Systematic Withdrawals',
    description:
      'Comprehensive guide to SWP for retirement income with corpus sustainability calculation, 4% rule, tax benefits, withdrawal strategies, and best funds for SWP.',
    image: 'https://fincado.com/og-swp-calculator.jpg',
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
      '@id': 'https://fincado.com/swp-calculator/',
    },
  };

  return (
    <>
      <Script
        id="swp-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="swp-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="swp-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="swp-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="swp-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="swp-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
