import Script from 'next/script';

export function SSYSchemas() {
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
    name: 'Sukanya Samriddhi Yojana Calculator - SSY Calculator',
    description:
      'Calculate maturity value for Sukanya Samriddhi Yojana (SSY) for girl child. Plan education and marriage expenses with 100% tax-free returns.',
    url: 'https://fincado.com/sukanya-samriddhi/',
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
      name: 'SSY Calculator',
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
    name: 'How to Calculate Sukanya Samriddhi Yojana Returns',
    description:
      'Step-by-step guide to calculating SSY maturity value, planning investments, and maximizing tax-free returns for girl child.',
    image: '/og-ssy-calculator.jpg',
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
        name: "Enter Girl's Age",
        text: "Input your girl child's current age (must be below 10 years to open SSY account).",
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Select Deposit Frequency',
        text: 'Choose monthly or yearly deposit mode based on your cash flow convenience.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Set Investment Amount',
        text: 'Enter monthly (₹250-₹12,500) or yearly (₹1,000-₹1,50,000) investment amount.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Set Interest Rate',
        text: 'Enter current SSY interest rate (8.2% as of 2026, revised quarterly by Government).',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'View Maturity Value',
        text: 'Check tax-free maturity amount when girl turns 21, total investment, and interest earned.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Analyze Year-wise Growth',
        text: 'Enable year-wise breakdown to track corpus growth and plan accordingly.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    description:
      'Government savings scheme for girl child under Beti Bachao Beti Padhao campaign. Offers 8.2% interest, 100% tax-free returns (EEE status), and government guarantee for education and marriage expenses.',
    category: 'Girl Child Savings Scheme',
    feesAndCommissionsSpecification:
      'No opening or maintenance charges. Minimum ₹250/year, maximum ₹1.5 lakh/year. Penalty: ₹50/year for default. 100% tax-free maturity under EEE status.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '8.2',
      unitText: 'Percent per annum (compounded annually, revised quarterly)',
    },
  };

  // GovernmentService Schema
  const governmentServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: 'Sukanya Samriddhi Yojana',
    description:
      'Indian Government savings scheme for girl children with highest interest rate among small savings schemes and 100% tax exemption.',
    serviceType: 'Girl Child Savings and Investment Scheme',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Government of India',
      url: 'https://www.india.gov.in',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'Post Offices and Authorized Banks',
      serviceLocation: {
        '@type': 'Place',
        name: 'India Post Offices, SBI, PNB, ICICI, HDFC, Axis, BOB branches',
      },
    },
  };

  // Service Schema (Calculator)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'SSY Calculator Service',
    description:
      'Free online Sukanya Samriddhi Yojana calculator for girl child education and marriage planning with maturity value calculation and tax benefit analysis.',
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
      name: 'SSY Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maturity Value Calculation',
            description: 'Calculate exact maturity amount when girl turns 21',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Year-wise Breakdown',
            description: 'Track corpus growth and interest earned year by year',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Benefit Analysis',
            description:
              'Calculate 80C deduction and tax-free interest savings',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Flexible Deposit Planning',
            description: 'Compare monthly vs yearly deposit strategies',
          },
        },
      ],
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sukanya Samriddhi Yojana Calculator 2026 - Complete SSY Guide',
    description:
      'Comprehensive guide to SSY for girl child with calculator, interest rates, tax benefits, maturity value, partial withdrawal rules, and investment strategies.',
    image: '/og-ssy-calculator.jpg',
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
      '@id': 'https://fincado.com/sukanya-samriddhi/',
    },
  };

  return (
    <>
      <Script
        id="ssy-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="ssy-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="ssy-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="ssy-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="ssy-government-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(governmentServiceSchema),
        }}
      />

      <Script
        id="ssy-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="ssy-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
