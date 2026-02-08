import Script from 'next/script';

export function PPFSchemas() {
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
      'https://linkedin.com/company/fincado'
    ],
  };

  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'PPF Calculator - Public Provident Fund Calculator India',
    description:
      'Calculate PPF maturity amount with 7.1% tax-free interest. Government-backed savings with EEE tax benefits, Section 80C deduction, and retirement planning.',
    url: 'https://fincado.com/ppf-calculator/',
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
      name: 'PPF Calculator',
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
    name: 'How to Calculate PPF Maturity Returns',
    description:
      'Step-by-step guide to calculating PPF maturity amount with 7.1% tax-free interest, annual compounding, and EEE tax benefits.',
    image: '/og-ppf-calculator.jpg',
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
        name: 'Select Contribution Mode',
        text: 'Choose between monthly deposits (₹500-₹12,500) or annual lump sum (₹500-₹1,50,000).',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Investment Amount',
        text: 'Input your monthly or annual contribution amount. Maximum allowed is ₹1.5 lakh per financial year.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Set Interest Rate',
        text: 'Enter current PPF rate (7.1% as of Q4 FY 2025-26). Government reviews rates quarterly.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Select Investment Duration',
        text: 'Choose tenure (minimum 15 years). Can be extended in blocks of 5 years after maturity.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'View Tax-Free Maturity',
        text: 'Check maturity amount, total investment, and 100% tax-free interest under EEE status.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Analyze Year-wise Growth',
        text: 'Enable year-wise breakdown to see how your PPF corpus grows over the first 5 years.',
      }
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Public Provident Fund (PPF)',
    description:
      'Government-backed long-term savings scheme with 7.1% tax-free interest, EEE tax status, 15-year lock-in, and Section 80C benefits.',
    category: 'Savings Scheme',
    provider: {
      '@type': 'Organization',
      name: 'Government of India',
    },
    feesAndCommissionsSpecification:
      'No fees or commissions. Premature closure after 5 years allowed with reduced interest. Partial withdrawal from 7th year. Loan facility from 3rd to 6th year.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '7.1',
      unitText: 'Percent per annum',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'PPF Calculator Service',
    description:
      'Free online PPF calculator with tax-free maturity calculation, EEE status benefits, Section 80C deduction, year-wise breakdown, and government-backed security.',
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
      name: 'PPF Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax-Free Maturity Calculation',
            description:
              'Calculate PPF maturity with 100% tax-free returns under EEE status',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Section 80C Tax Savings',
            description:
              'Calculate tax deduction benefits up to ₹1.5 lakh under Section 80C',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Year-wise Growth Analysis',
            description: 'View detailed year-by-year PPF corpus growth',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Monthly vs Annual Strategy',
            description:
              'Compare monthly SIP-style deposits vs annual lump sum contribution',
          },
        }
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'PPF Calculator 2026 - Complete Guide to Public Provident Fund',
    description:
      'Comprehensive guide to PPF investments with 7.1% tax-free interest, EEE status, maturity calculation, withdrawal rules, and comparison with EPF, NPS, NSC.',
    image: '/og-ppf-calculator.jpg',
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
      '@id': 'https://fincado.com/ppf-calculator/',
    },
  };

  // GovernmentService Schema (PPF is government service)
  const governmentServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: 'Public Provident Fund',
    description:
      'Long-term savings scheme by Government of India with tax-free returns',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Government of India',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceLocation: {
        '@type': 'Place',
        name: 'Post Offices and Banks',
      },
    },
  };

  return (
    <>
      <Script
        id="ppf-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="ppf-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="ppf-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="ppf-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="ppf-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="ppf-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Script
        id="ppf-government-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(governmentServiceSchema),
        }}
      />
    </>
  );
}
