export function SIPSchemas() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fincado SIP Calculator',
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
      ratingCount: '3127',
      bestRating: '5',
    },
    featureList: [
      'Mutual Fund SIP Return Calculation',
      'Total Investment and Wealth Gain',
      'Goal-based SIP Planning',
      'WhatsApp Share for SIP Plans',
      'Saved SIP Calculations History',
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
        name: 'SIP Calculator',
        item: 'https://fincado.com/sip-calculator',
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate SIP Returns',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Monthly SIP Amount',
        text: 'Input how much you want to invest every month towards your SIP.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Investment Period',
        text: 'Choose how many years you want to continue your monthly SIP.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Expected Return',
        text: 'Enter expected annual return based on mutual fund type (e.g., 12% for equity).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'View Maturity and Wealth Gain',
        text: 'Check total investment, maturity amount, and wealth gain calculated using the SIP formula.',
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
