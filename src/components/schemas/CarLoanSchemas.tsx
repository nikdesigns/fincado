export function CarLoanSchemas() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fincado Car Loan EMI Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '2845',
      bestRating: '5',
    },
    featureList: [
      'New Car Loan EMI Calculation',
      'Used Car Loan Calculator',
      'Prepayment Analysis',
      'Bank Rate Comparison',
      'Down Payment Calculator',
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
        name: 'EMI Calculator',
        item: 'https://fincado.com/emi-calculator',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Car Loan EMI Calculator',
        item: 'https://fincado.com/emi-calculator/car-loan',
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Car Loan EMI',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Car Price',
        text: 'Input the on-road price of the car or loan amount needed',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Add Down Payment',
        text: 'Enter your down payment amount (typically 10-20% of car price)',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Set Interest Rate',
        text: 'Enter the interest rate offered by bank (8.7%-14% based on car type)',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Choose Loan Tenure',
        text: 'Select repayment period (1-7 years for new cars, 1-5 years for used)',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'View Results',
        text: 'Get monthly EMI, total interest, and complete repayment schedule',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
