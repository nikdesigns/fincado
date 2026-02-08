import Script from 'next/script';

export function GSTSchemas() {
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
    name: 'GST Calculator India 2026 - Calculate GST Tax Online',
    description:
      'Free GST Calculator to calculate Goods and Services Tax. Add GST (Exclusive) or Remove GST (Inclusive) instantly. Supports 3%, 5%, 12%, 18%, 28% rates with CGST/SGST/IGST breakdown.',
    url: 'https://fincado.com/gst-calculator/',
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
      name: 'GST Calculator',
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
    name: 'How to Calculate GST in India',
    description:
      'Step-by-step guide to calculating GST (Goods and Services Tax) for exclusive and inclusive prices with CGST, SGST, and IGST breakdown.',
    image: '/og-gst-calculator.jpg',
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
        name: 'Select Calculation Mode',
        text: 'Choose "Exclusive (Add GST)" if you have base price and want to add tax, or "Inclusive (Remove GST)" if you have MRP and want to find base price.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Amount',
        text: 'Input the base amount (for exclusive) or final MRP/invoice value (for inclusive calculation).',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select GST Rate',
        text: 'Choose applicable GST rate: 0% (Exempt), 3% (Gold/Jewellery), 5% (Essentials), 12% (Standard goods), 18% (Services/Electronics), or 28% (Luxury goods).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Review Tax Breakdown',
        text: 'Calculator shows CGST and SGST split (for intra-state) or IGST (for inter-state). Total GST amount and final invoice value are displayed.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Generate Invoice',
        text: 'Use the breakdown for GST-compliant invoicing with base price, tax components (CGST/SGST/IGST), and final taxable value.',
      },
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Goods and Services Tax (GST) India',
    description:
      'GST is a destination-based indirect tax on supply of goods and services in India. It replaced multiple cascading taxes with unified tax system.',
    category: 'Indirect Tax',
    feesAndCommissionsSpecification:
      'Free calculator. GST registration mandatory for businesses with turnover > ₹40 lakhs (₹20 lakhs for services). Composition Scheme available for turnover up to ₹1.5 crores.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '0-28',
      unitText:
        'Percent (GST rates: 0% exempt, 3% gold, 5% essentials, 12% standard, 18% services, 28% luxury)',
    },
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Tax Calculator',
    name: 'GST Calculator Service',
    description:
      'Free online GST calculator for businesses and consumers. Calculate GST exclusive (add tax) and inclusive (remove tax) amounts with CGST/SGST/IGST breakdown.',
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
      name: 'GST Calculator Features',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Add GST (Exclusive Calculation)',
            description:
              'Calculate final invoice value by adding GST to base price',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Remove GST (Inclusive/Reverse Calculation)',
            description:
              'Extract base price and tax amount from MRP or final invoice value',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CGST/SGST Breakdown',
            description:
              'Automatic split of GST into Central GST and State GST for intra-state transactions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Multiple GST Rates',
            description: 'Support for 0%, 3%, 5%, 12%, 18%, and 28% GST slabs',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Invoice-Ready Format',
            description:
              'Tax breakdown in GST-compliant invoice format with all components',
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
      'GST Calculator India 2026 - Complete Guide to Goods and Services Tax',
    description:
      'Complete guide to GST calculation in India. Learn GST rates, tax slabs, reverse GST formula, CGST/SGST/IGST difference, input tax credit, e-invoice guidelines, and GST compliance for businesses.',
    image: '/og-gst-calculator.jpg',
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
    datePublished: '2026-01-10',
    dateModified: '2026-02-07',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/gst-calculator/',
    },
  };

  return (
    <>
      <Script
        id="gst-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="gst-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="gst-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="gst-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="gst-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Script
        id="gst-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
