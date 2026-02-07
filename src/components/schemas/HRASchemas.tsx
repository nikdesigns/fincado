import Script from 'next/script';

export function HRASchemas() {
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
    name: 'HRA Calculator - House Rent Allowance Exemption 2026',
    description:
      'Calculate House Rent Allowance (HRA) tax exemption under Section 10(13A). Check tax-free rent limits for Metro vs Non-Metro cities in Old Tax Regime.',
    url: 'https://fincado.com/hra-calculator/',
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
      name: 'HRA Calculator',
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
    name: 'How to Calculate HRA Exemption',
    description:
      'Step-by-step guide to calculating House Rent Allowance (HRA) tax exemption under Section 10(13A) of Income Tax Act for Old Tax Regime.',
    image: 'https://fincado.com/og-hra-calculator.jpg',
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
        name: 'Enter Basic Salary',
        text: 'Input your annual Basic Salary (without HRA, allowances, or bonuses). This is the base component of your CTC.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Add Dearness Allowance (DA)',
        text: 'If applicable (usually for government employees), enter annual Dearness Allowance. For private sector, leave as 0.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Input HRA Received',
        text: 'Enter total annual House Rent Allowance received from employer (shown in salary slip as HRA component).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Enter Total Rent Paid',
        text: 'Input actual annual rent paid to landlord (monthly rent × 12). Must have valid rent receipts to claim exemption.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Select City Type',
        text: 'Choose Metro (Delhi, Mumbai, Kolkata, Chennai - 50% exemption) or Non-Metro (all other cities - 40% exemption).',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Review Exempt HRA',
        text: 'Calculator shows tax-exempt HRA (lowest of 3 conditions) and taxable HRA that will be added to your income.',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Check Breakdown',
        text: 'Review detailed calculation showing all 3 conditions and which one determines your final exemption.',
      },
      {
        '@type': 'HowToStep',
        position: 8,
        name: 'Save and Submit',
        text: 'Save calculation, collect rent receipts and landlord PAN (if rent > ₹1L/year), and submit to employer for tax planning.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'House Rent Allowance (HRA) Tax Exemption',
    description:
      'HRA is a salary component that provides tax exemption under Section 10(13A) for rent paid by salaried employees living in rented accommodation.',
    category: 'Tax Exemption',
    feesAndCommissionsSpecification:
      'Free calculator. No fees for claiming HRA exemption. Revenue stamp required on rent receipts for cash payments > ₹5,000/month.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '40-50',
      unitText:
        'Percent of salary (Metro: 50%, Non-Metro: 40% maximum exemption rate)',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Calculator',
    name: 'HRA Calculator Service',
    description:
      'Free online HRA calculator to compute tax-exempt House Rent Allowance under Section 10(13A) for Old Tax Regime with Metro vs Non-Metro comparison.',
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
      name: 'HRA Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Exempt HRA Calculation',
            description:
              'Calculate tax-free HRA using 3-condition formula (least of actual HRA, rent-10% salary, 50%/40% salary)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Metro vs Non-Metro Comparison',
            description:
              'Automatic adjustment for city type (50% for Metro, 40% for Non-Metro)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Taxable HRA Breakdown',
            description:
              'Show remaining HRA amount that will be added to taxable income',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'DA Inclusion',
            description:
              'Support for Dearness Allowance calculation (for government employees)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Visual Breakdown',
            description:
              'Pie chart showing exempt vs taxable HRA split with detailed condition analysis',
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
      'HRA Calculator 2026 - House Rent Allowance Exemption Guide India',
    description:
      'Complete guide to calculating HRA tax exemption under Section 10(13A). Learn Metro vs Non-Metro rates, required documents, rent receipt format, and common mistakes to avoid.',
    image: 'https://fincado.com/og-hra-calculator.jpg',
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
      '@id': 'https://fincado.com/hra-calculator/',
    },
  };

  return (
    <>
      <Script
        id="hra-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="hra-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="hra-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="hra-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="hra-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="hra-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
