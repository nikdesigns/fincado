export function GoalPlanningSchemas() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fincado Goal Planning Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2847',
      bestRating: '5',
    },
    featureList: [
      'Financial Goal Planning with Inflation Adjustment',
      'Monthly SIP and Lump Sum Calculation',
      'Multiple Goal Types (Retirement, Education, House)',
      'Existing Corpus Integration',
      'Goal Progress Tracking',
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
        name: 'Goal Planning Calculator',
        item: 'https://fincado.com/goal-planning-calculator',
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan Financial Goals',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Goal Type',
        text: 'Choose from preset goals like Retirement, Education, House Purchase, or create a custom goal.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Current Goal Value',
        text: "Input what your goal would cost in today's money (e.g., ₹30 lakh for child education today).",
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Set Time Period and Inflation',
        text: 'Choose how many years until your goal and expected inflation rate for that expense category.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Add Expected Returns',
        text: 'Enter expected annual investment return based on your asset allocation (equity, debt, or hybrid).',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Include Existing Savings',
        text: 'Add any existing corpus you have already saved for this goal to reduce monthly SIP burden.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'View Required Investment',
        text: 'Check monthly SIP or lump sum amount needed to achieve your inflation-adjusted goal.',
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
