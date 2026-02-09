export function CAGRSchemas() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fincado CAGR Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2634',
      bestRating: '5',
    },
    featureList: [
      'Compound Annual Growth Rate Calculation',
      'Investment Return Analysis',
      'Multiple Investment Comparison',
      'Absolute vs CAGR Returns',
      'Historical Performance Tracking',
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://fincado.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: 'https://fincado.com/calculators',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'CAGR Calculator',
        item: 'https://fincado.com/cagr-calculator',
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate CAGR',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Initial Investment',
        text: 'Input the starting value of your investment or portfolio.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Final Value',
        text: 'Input the ending value of your investment after the time period.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Set Investment Duration',
        text: 'Enter the number of years between initial and final investment values.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'View CAGR Results',
        text: 'Check the compound annual growth rate, absolute returns, and total wealth gain percentage.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
    </>
  );
}
