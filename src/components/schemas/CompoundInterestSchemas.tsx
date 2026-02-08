import Script from 'next/script';

export function CompoundInterestSchemas() {
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
    name: 'Compound Interest Calculator India 2026 - Power of Compounding',
    description:
      'Free compound interest calculator to calculate FD maturity, PPF returns, and investment growth. Understand power of compounding with monthly, quarterly, and yearly frequencies. Compare CI vs SI and see year-wise breakdowns.',
    url: 'https://fincado.com/compound-interest-calculator/',
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
      name: 'Compound Interest Calculator',
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
    name: 'How to Calculate Compound Interest for Investments',
    description:
      'Step-by-step guide to calculating compound interest on Fixed Deposits, PPF, mutual funds, and recurring deposits. Understand compounding frequency impact and maximize returns.',
    image: '/og-compound-interest-calculator.jpg',
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
        name: 'Enter Principal Amount',
        text: 'Input initial investment or deposit amount. For FDs, this is lump sum. For SIPs, enter first installment. Typical range: ₹10,000 to ₹50 lakhs. PPF minimum: ₹500, maximum: ₹1.5L per year.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Annual Interest Rate',
        text: 'Enter annual interest rate percentage. Bank FD: 6.5-8%, PPF: 7.1%, EPF: 8.15%, Mutual funds (equity): 12-15%, Debt funds: 7-9%, Corporate FDs: 7.5-9%. Always use pre-tax rate for calculations.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Time Period',
        text: 'Select investment tenure in years. FD: 7 days to 10 years. PPF: 15 years (extendable). EPF: Until retirement. SIP: Minimum 1 year, recommended 10+ years. Longer periods show exponential compounding benefits.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Select Compounding Frequency',
        text: 'Choose how often interest compounds: Yearly (PPF, EPF), Quarterly (most bank FDs), Monthly (savings accounts, some FDs), Daily (rare). Higher frequency = marginally better returns. Quarterly most common in India.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Calculate and Analyze Results',
        text: 'Calculator shows maturity amount, interest earned, and year-wise breakdown. Compare with simple interest to see compounding benefit. Check inflation-adjusted real returns. Use Rule of 72 to estimate doubling time.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Compound Interest Investment Products',
    description:
      'Compound Interest is exponential interest calculation where interest earns interest. Formula: A = P(1+r/n)^(nt). Used in Fixed Deposits, PPF, EPF, Mutual Funds, Recurring Deposits. Significantly outperforms simple interest over time.',
    category: 'Investment Product',
    feesAndCommissionsSpecification:
      'Compound interest products have varying tax implications: FD interest taxable as per slab, PPF completely tax-free (EEE), EPF tax-free, Mutual fund LTCG 10% above ₹1L, Debt fund gains as per slab.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '6.5-15',
      unitText:
        'Percent per annum (Bank FD: 6.5-8%, PPF: 7.1%, EPF: 8.15%, Equity MF: 12-15%, Debt MF: 7-9%)',
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Compound Interest Calculator 2026 - Complete Guide to Power of Compounding',
    description:
      'Complete guide to compound interest in India. Learn CI formula, understand compounding frequency impact, compare CI vs simple interest, calculate FD and PPF maturity, and master wealth creation through compounding.',
    image: '/og-compound-interest-calculator.jpg',
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
      '@id': 'https://fincado.com/compound-interest-calculator/',
    },
  };

  return (
    <>
      <Script
        id="ci-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="ci-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="ci-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="ci-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="ci-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
