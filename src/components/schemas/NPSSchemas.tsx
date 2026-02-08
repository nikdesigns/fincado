import Script from 'next/script';

export function NPSSchemas() {
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
    name: 'NPS Calculator - National Pension System Calculator',
    description:
      'Calculate NPS retirement corpus, 60% tax-free lump sum, and 40% monthly pension with market-linked returns and extra ₹50k tax benefit.',
    url: 'https://fincado.com/nps-calculator/',
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
      name: 'NPS Calculator',
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
    name: 'How to Calculate NPS Returns and Pension',
    description:
      'Step-by-step guide to calculating NPS retirement corpus, 60:40 withdrawal split, lump sum amount, and monthly pension with tax benefits.',
    image: '/og-nps-calculator.jpg',
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
        name: 'Enter Monthly Investment',
        text: 'Input your monthly NPS contribution amount (minimum ₹500, recommended ₹5,000-₹15,000).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Current Age',
        text: 'Enter your current age (18-59 years). Retirement age is fixed at 60 for NPS.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Expected Return',
        text: 'Set expected return rate (5-15%) based on asset allocation: Aggressive 10-12%, Moderate 8-10%, Conservative 7-9%.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Adjust Annuity Rate (Optional)',
        text: 'Click "Show Advanced Options" to set annuity rate (4-10%, typically 6%) for pension calculation.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Review Total Corpus',
        text: 'Check total corpus at age 60, total investment amount, and returns earned over investment period.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Check 60:40 Split',
        text: 'View 60% tax-free lump sum withdrawal amount and 40% annuity corpus for monthly pension.',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Calculate Monthly Pension',
        text: 'See estimated monthly pension amount based on 40% annuity corpus and selected annuity rate.',
      },
      {
        '@type': 'HowToStep',
        position: 8,
        name: 'Save or Share Plan',
        text: 'Save your NPS plan for future reference or share via WhatsApp with family/advisor.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'National Pension System (NPS)',
    description:
      'Government-sponsored voluntary retirement savings scheme with market-linked returns (10-12%), lowest expense ratio (0.01%), dual tax benefits (₹2L under 80C + 80CCD(1B)), and 60:40 withdrawal rule for lump sum and pension.',
    category: 'Pension and Retirement Scheme',
    feesAndCommissionsSpecification:
      'Expense ratio: 0.01% (lowest in India). No account opening charges. Minimum ₹500/year contribution. Tier 1: Tax benefits with lock-in till 60. Tier 2: No tax benefits, anytime withdrawal. 60% lump sum tax-free, 40% annuity taxable as per income slab.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '10-12',
      unitText:
        'Percent per annum (expected returns based on equity allocation)',
    },
  };

  // GovernmentService Schema
  const governmentServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: 'National Pension System (NPS)',
    description:
      'Government of India pension scheme regulated by PFRDA offering market-linked retirement savings with lowest costs and maximum tax benefits.',
    serviceType: 'Pension and Retirement Planning',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Pension Fund Regulatory and Development Authority (PFRDA)',
      url: 'https://www.pfrda.org.in',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'eNPS Portal, Banks, POP-SP',
      serviceLocation: {
        '@type': 'Place',
        name: 'Online via eNPS portal, Bank branches (SBI, HDFC, ICICI, Axis, etc.), POP-SP centers',
      },
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'NPS Calculator Service',
    description:
      'Free online NPS calculator for retirement corpus calculation, 60:40 withdrawal split, lump sum and pension estimation with tax benefit analysis.',
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
      name: 'NPS Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Retirement Corpus Calculation',
            description: 'Calculate total NPS corpus at retirement age 60',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '60:40 Withdrawal Split',
            description:
              'Calculate 60% tax-free lump sum and 40% annuity corpus',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Monthly Pension Estimation',
            description:
              'Estimate lifelong monthly pension from annuity investment',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Benefit Analysis',
            description:
              'Calculate ₹2L tax deduction (80C + 80CCD(1B)) savings',
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'NPS Calculator 2026 - Complete National Pension System Guide',
    description:
      'Comprehensive NPS guide with calculator, 60:40 rule, Tier 1 vs Tier 2, asset allocation strategies, ₹2L tax benefits, withdrawal rules, and annuity calculation.',
    image: '/og-nps-calculator.jpg',
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
      '@id': 'https://fincado.com/nps-calculator/',
    },
  };

  return (
    <>
      <Script
        id="nps-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="nps-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="nps-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="nps-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="nps-government-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(governmentServiceSchema),
        }}
      />

      <Script
        id="nps-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="nps-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
