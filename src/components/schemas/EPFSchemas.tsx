import Script from 'next/script';

export function EPFSchemas() {
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
    name: 'EPF Calculator - Employee Provident Fund Calculator',
    description:
      'Calculate EPF maturity amount with 8.25% interest rate. Employee and employer contributions with 100% tax-free withdrawals under EEE status.',
    url: 'https://fincado.com/epf-calculator/',
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
      name: 'EPF Calculator',
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
    name: 'How to Calculate EPF Maturity Amount',
    description:
      'Step-by-step guide to calculating Employee Provident Fund corpus with employee and employer contributions, interest earned, and tax-free withdrawals.',
    image: '/og-epf-calculator.jpg',
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
        name: 'Enter Basic Salary',
        text: 'Input your monthly basic salary + dearness allowance (DA) amount. EPF contributions are calculated on this base.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Your Contribution',
        text: 'Set your contribution percentage (default 12% mandatory, can increase for VPF up to 100%).',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Enter Employment Period',
        text: 'Input expected employment duration in years (5-40 years) for EPF corpus calculation.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Adjust Interest Rate (Optional)',
        text: 'Click "Show Advanced Options" to adjust EPF interest rate if needed (current: 8.25% for FY 2025-26).',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'View EPF Corpus',
        text: 'Check estimated EPF maturity amount with breakdown of employee share, employer share, and total interest.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Check Monthly Contributions',
        text: 'Review monthly contribution amounts from your side (12%) and employer side (3.67% to EPF).',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Save or Share Plan',
        text: 'Save your EPF calculation for future reference or share via WhatsApp with family/advisor.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Employee Provident Fund (EPF)',
    description:
      'Mandatory retirement savings scheme for salaried employees with 8.25% interest rate, dual contributions (employee 12% + employer 3.67%), 100% tax-free withdrawals under EEE status, and partial withdrawal options for housing, medical, education.',
    category: 'Retirement Savings Scheme',
    feesAndCommissionsSpecification:
      'No charges. 8.25% p.a. interest (FY 2025-26) with monthly compounding. Employee contributes 12% of basic+DA, employer adds 3.67% to EPF + 8.33% to EPS. Withdrawal after 5 years is 100% tax-free. Early withdrawal before 5 years attracts 10% TDS (with PAN) or 34.6% (without PAN). EEE (Exempt-Exempt-Exempt) status: contribution tax-deductible, interest tax-free, withdrawal tax-free.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '8.25',
      unitText: 'Percent per annum with monthly compounding',
    },
  };

  // GovernmentService Schema
  const governmentServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: 'Employee Provident Fund (EPF)',
    description:
      'Government-mandated retirement savings scheme managed by EPFO (Employees Provident Fund Organisation) for salaried employees with guaranteed returns and tax benefits.',
    serviceType: 'Retirement Savings and Pension',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Employees Provident Fund Organisation (EPFO)',
      url: 'https://www.epfindia.gov.in',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'EPFO Portal, UAN Portal, Employer',
      serviceLocation: {
        '@type': 'Place',
        name: 'Online via EPFO/UAN portal, Through employer payroll deduction, EPFO offices across India',
      },
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'EPF Calculator Service',
    description:
      'Free online EPF calculator for retirement corpus calculation with employee and employer contributions, interest earnings, and tax-free withdrawal benefits.',
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
      name: 'EPF Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'EPF Corpus Calculation',
            description: 'Calculate total EPF maturity amount with compounding',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Contribution Breakdown',
            description:
              'Employee 12% and employer 3.67% monthly contribution split',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Interest Calculation',
            description:
              'Total interest earned over employment period at 8.25% p.a.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax-Free Withdrawal',
            description:
              '100% tax exemption analysis under EEE status after 5 years',
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EPF Calculator 2026 - Complete Employee Provident Fund Guide',
    description:
      'Comprehensive EPF guide with calculator, contribution split (employee 12% + employer 3.67%), EEE tax status, withdrawal rules, VPF benefits, and interest rate details for FY 2025-26.',
    image: '/og-epf-calculator.jpg',
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
      '@id': 'https://fincado.com/epf-calculator/',
    },
  };

  return (
    <>
      <Script
        id="epf-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="epf-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="epf-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="epf-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="epf-government-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(governmentServiceSchema),
        }}
      />

      <Script
        id="epf-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="epf-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
