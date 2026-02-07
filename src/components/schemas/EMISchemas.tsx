export function EMISchemas() {
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
    ],
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fincado EMI Calculator',
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
      ratingCount: '2847',
      bestRating: '5',
    },
    featureList: [
      'Home Loan EMI Calculation',
      'Car Loan EMI Calculation',
      'Personal Loan EMI Calculation',
      'Amortization Schedule',
      'Prepayment Analysis',
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate EMI',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Loan Amount',
        text: 'Input the total amount you want to borrow',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Interest Rate',
        text: 'Enter the annual interest rate offered by your bank',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Loan Tenure',
        text: 'Select the repayment period in months or years',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'View Results',
        text: 'Get instant EMI amount, total interest, and amortization schedule',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
