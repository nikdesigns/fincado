import Script from 'next/script';

export function IncomeTaxSchemas() {
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
    name: 'Income Tax Calculator India 2026',
    description:
      'Calculate income tax for FY 2025-26 & FY 2026-27. Compare Old vs New Tax Regime, check tax slabs, and find the best option for your salary.',
    url: 'https://fincado.com/income-tax-calculator/',
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
      name: 'Income Tax Calculator',
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
    name: 'How to Calculate Income Tax in India',
    description:
      'Step-by-step guide to calculating income tax liability in India, comparing Old vs New Tax Regime, and choosing the best option.',
    image: '/og-income-tax-calculator.jpg',
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
        name: 'Select Financial Year',
        text: 'Choose between FY 2025-26 (AY 2026-27) or FY 2026-27 (AY 2027-28) based on when you need to file tax.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Your Age Category',
        text: 'Select age group: Below 60 (Regular), 60-80 (Senior Citizen), or 80+ (Super Senior Citizen). This affects basic exemption limit in Old Regime.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Input Gross Annual Income',
        text: 'Enter total annual salary/income before any deductions (CTC minus EPF employer contribution).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Add Total Deductions',
        text: 'Enter total deductions under Section 80C (ELSS, PPF, LIC), 80D (health insurance), HRA, home loan interest etc. These apply only to Old Regime.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Compare Old vs New Regime',
        text: 'Calculator automatically compares tax liability under both regimes including 4% cess and recommends the better option.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Review Tax Breakdown',
        text: 'Check detailed breakdown showing taxable income, tax slab calculation, and final tax amount for both regimes.',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Save or Share Results',
        text: 'Save calculation for future reference or share with family/CA via WhatsApp.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Income Tax Filing India',
    description:
      'Income tax calculation and filing for salaried individuals, freelancers, and professionals in India under Old and New Tax Regime.',
    category: 'Tax Planning and Compliance',
    feesAndCommissionsSpecification:
      'Free calculator. ITR filing: Free (online portal) or ₹500-2000 (CA assisted). Late filing penalty: ₹5,000 if filed after due date, ₹10,000 if filed after Dec 31.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '5-30',
      unitText:
        'Percent (tax slab rates ranging from 5% to 30% depending on income)',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'Income Tax Calculator Service',
    description:
      'Free online income tax calculator for India. Compare Old vs New Tax Regime, calculate tax liability with deductions, and get instant recommendations.',
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
      name: 'Income Tax Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Old vs New Regime Comparison',
            description:
              'Instant comparison of tax liability under both regimes',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Age-Based Exemption Calculation',
            description:
              'Automatic adjustment for senior citizen and super senior citizen exemptions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Deduction Optimization',
            description:
              'Calculate tax impact of 80C, 80D, HRA, and other deductions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Section 87A Rebate',
            description:
              'Automatic rebate calculation for income up to ₹7 lakhs (New) or ₹5 lakhs (Old)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Health & Education Cess',
            description: 'Includes 4% cess on total tax liability',
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Income Tax Calculator 2026 - Old vs New Regime Comparison Guide',
    description:
      'Complete guide to calculating income tax in India for FY 2025-26 & FY 2026-27. Compare Old vs New Tax Regime, understand tax slabs, deductions under Section 80C/80D, surcharge, cess, and tax planning strategies.',
    image: '/og-income-tax-calculator.jpg',
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
    datePublished: '2026-02-01',
    dateModified: '2026-02-07',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/income-tax-calculator/',
    },
  };

  return (
    <>
      <Script
        id="income-tax-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="income-tax-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="income-tax-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="income-tax-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="income-tax-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="income-tax-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
