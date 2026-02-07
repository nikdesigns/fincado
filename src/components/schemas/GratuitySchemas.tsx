import Script from 'next/script';

export function GratuitySchemas() {
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
    name: 'Gratuity Calculator - Payment of Gratuity Act 1972',
    description:
      'Calculate gratuity amount as per Payment of Gratuity Act 1972 with tax exemption up to ₹20 lakh for 5+ years service.',
    url: 'https://fincado.com/gratuity-calculator/',
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
      name: 'Gratuity Calculator',
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
    name: 'How to Calculate Gratuity Amount',
    description:
      'Step-by-step guide to calculating gratuity as per Payment of Gratuity Act 1972 with tax exemption rules and eligibility criteria.',
    image: 'https://fincado.com/og-gratuity-calculator.jpg',
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
        name: 'Enter Basic Salary + DA',
        text: 'Input your last drawn monthly basic salary plus dearness allowance. Do not include HRA, bonuses, or other allowances.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Years of Service',
        text: 'Input total completed years of continuous service. Minimum 5 years required (240 working days per year counts as 1 year).',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select Act Coverage',
        text: 'Choose if your employer is covered under Payment of Gratuity Act (most companies with 10+ employees are covered).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'View Total Gratuity',
        text: 'Check total gratuity calculated using formula: (Salary × 15/26 × Years) for covered or (Salary × 15/30 × Years) for non-covered.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Check Tax Breakdown',
        text: 'Review tax-exempt portion (up to ₹20 lakh) and taxable amount if gratuity exceeds limit.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Save or Share',
        text: 'Save your gratuity calculation for future reference or share via WhatsApp.',
      },
    ],
  };

  // GovernmentService Schema
  const governmentServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: 'Payment of Gratuity Act, 1972',
    description:
      'Government legislation ensuring gratuity payment to employees completing 5 years service. Covers establishments with 10+ employees. Gratuity calculated as (Salary × 15/26 × Years) with ₹20 lakh tax exemption.',
    serviceType: 'Employee Benefit and Retirement',
    provider: {
      '@type': 'GovernmentOrganization',
      name: 'Ministry of Labour and Employment, Government of India',
      url: 'https://labour.gov.in',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'Through Employer',
      serviceLocation: {
        '@type': 'Place',
        name: 'Applicable to factories, mines, oil fields, plantations, ports, railways, shops, establishments with 10+ employees',
      },
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'Gratuity Calculator Service',
    description:
      'Free online gratuity calculator as per Payment of Gratuity Act 1972 with tax exemption analysis and eligibility checking.',
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
      name: 'Gratuity Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gratuity Amount Calculation',
            description:
              'Calculate gratuity as per Act formula (Salary × 15/26 × Years)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Exemption Analysis',
            description: 'Calculate tax-free amount (₹20L) and taxable portion',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Eligibility Check',
            description: 'Verify 5-year minimum service requirement',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Covered vs Non-Covered',
            description:
              'Calculate for both covered (26 days) and non-covered (30 days) establishments',
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
      'Gratuity Calculator 2026 - Complete Guide to Payment of Gratuity Act',
    description:
      'Comprehensive gratuity guide with calculator, eligibility criteria, formula explanation, tax exemption rules, covered vs non-covered establishments, and payment timeline as per Act 1972.',
    image: 'https://fincado.com/og-gratuity-calculator.jpg',
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
      '@id': 'https://fincado.com/gratuity-calculator/',
    },
  };

  return (
    <>
      <Script
        id="gratuity-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="gratuity-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="gratuity-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="gratuity-government-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(governmentServiceSchema),
        }}
      />

      <Script
        id="gratuity-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="gratuity-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
