import Script from 'next/script';

export function ELSSSchemas() {
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
    name: 'ELSS Calculator - Tax Saving Mutual Fund Calculator',
    description:
      'Calculate ELSS mutual fund returns and tax savings under Section 80C. Compare ELSS vs PPF and plan tax-efficient investments.',
    url: 'https://fincado.com/elss-calculator/',
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
      name: 'ELSS Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
    },
  };

  // HowTo Schema - How to Calculate ELSS Returns
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate ELSS Returns and Tax Savings',
    description:
      'Step-by-step guide to calculating ELSS mutual fund returns and Section 80C tax savings in India.',
    image: '/og-elss-calculator.jpg',
    totalTime: 'PT5M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '0',
    },
    tool: [
      {
        '@type': 'HowToTool',
        name: 'ELSS Calculator',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose Investment Mode',
        text: 'Select between Monthly SIP or Lump Sum investment mode based on your investment strategy.',
        image: 'https://fincado.com/steps/elss-step1.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Investment Amount',
        text: 'Input your monthly SIP amount (₹500 to ₹50,000) or lump sum amount (₹500 to ₹15,00,000).',
        image: 'https://fincado.com/steps/elss-step2.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Set Expected Return',
        text: 'Enter expected annual return rate. Typically 12-15% for ELSS funds based on historical performance.',
        image: 'https://fincado.com/steps/elss-step3.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Select Investment Period',
        text: 'Choose investment tenure (minimum 3 years lock-in, recommended 5-7 years for better returns).',
        image: 'https://fincado.com/steps/elss-step4.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Choose Tax Bracket',
        text: 'Select your tax bracket (0%, 5%, 20%, or 30%) to calculate accurate Section 80C tax savings.',
        image: 'https://fincado.com/steps/elss-step5.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'View Results',
        text: 'Review maturity amount, total investment, wealth gain, and tax savings. Compare with PPF if needed.',
        image: 'https://fincado.com/steps/elss-step6.jpg',
      },
    ],
  };

  // FinancialProduct Schema - ELSS
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Equity Linked Savings Scheme (ELSS)',
    description:
      'ELSS is a tax-saving mutual fund under Section 80C with 3-year lock-in period. Offers equity exposure with tax benefits up to ₹1.5 lakh deduction.',
    category: 'Tax Saving Mutual Fund',
    feesAndCommissionsSpecification:
      'Expense ratio typically 1.5-2.5%. Exit load may apply if redeemed before lock-in period.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '12-15',
      unitText: 'Percent per annum (historical average)',
    },
    annualPercentageRate: {
      '@type': 'QuantitativeValue',
      value: '14',
      unitText: 'Expected return %',
    },
  };

  // Article Schema - ELSS Guide
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'ELSS Calculator 2026 - Complete Guide to Tax Saving Mutual Funds',
    description:
      'Comprehensive guide to ELSS investments, returns calculation, Section 80C benefits, and comparison with other tax-saving instruments.',
    image: '/og-elss-calculator.jpg',
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
      '@id': 'https://fincado.com/elss-calculator/',
    },
    articleBody:
      'ELSS (Equity Linked Savings Scheme) is the only mutual fund eligible for Section 80C tax deduction. With a 3-year lock-in period and potential returns of 12-15% p.a., ELSS offers dual benefits of tax saving and wealth creation.',
  };

  // Investment Schema
  const investmentSchema = {
    '@context': 'https://schema.org',
    '@type': 'InvestmentOrDeposit',
    name: 'ELSS Investment',
    description:
      'Tax-saving equity mutual fund investment with 3-year lock-in period under Section 80C',
    amount: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '150000',
      maxValue: '150000',
      name: 'Maximum tax deductible amount per year',
    },
  };

  // Service Schema - ELSS Calculator Service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'ELSS Calculator Service',
    description:
      'Free online ELSS calculator to estimate mutual fund returns, tax savings under Section 80C, and compare with PPF investments.',
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
      name: 'ELSS Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SIP Mode Calculation',
            description: 'Calculate ELSS returns for monthly SIP investments',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lump Sum Calculation',
            description:
              'Calculate ELSS returns for one-time lump sum investments',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Savings Calculator',
            description:
              'Calculate Section 80C tax benefits based on your tax bracket',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ELSS vs PPF Comparison',
            description:
              'Compare ELSS returns with PPF for informed decision making',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Save & Share Calculations',
            description: 'Save calculations locally and share via WhatsApp',
          },
        },
      ],
    },
  };

  // TaxReturn Schema - Section 80C
  const taxReturnSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: 'Section 80C Tax Deduction',
    description:
      'Tax deduction under Section 80C of Income Tax Act for ELSS investments up to ₹1.5 lakh per financial year',
    serviceType: 'Tax Deduction',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Income Tax Department, Government of India',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="elss-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* WebPage Schema */}
      <Script
        id="elss-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      {/* HowTo Schema */}
      <Script
        id="elss-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      {/* Financial Product Schema */}
      <Script
        id="elss-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      {/* Article Schema */}
      <Script
        id="elss-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* Investment Schema */}
      <Script
        id="elss-investment-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(investmentSchema),
        }}
      />

      {/* Service Schema */}
      <Script
        id="elss-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      {/* Tax Return Schema */}
      <Script
        id="elss-tax-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(taxReturnSchema),
        }}
      />
    </>
  );
}
