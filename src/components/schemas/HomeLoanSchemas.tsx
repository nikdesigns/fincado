export function HomeLoanSchemas() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fincado Home Loan EMI Calculator',
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
      ratingCount: '3247',
      bestRating: '5',
    },
    featureList: [
      'Home Loan EMI Calculation',
      'Tax Benefit Calculator (80C, 24b, 80EEA)',
      'Prepayment Analysis',
      'Bank Rate Comparison',
      'Amortization Schedule'
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
        name: 'Home Loan EMI Calculator',
        item: 'https://fincado.com/emi-calculator/home-loan',
      }
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Home Loan EMI',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Loan Amount',
        text: 'Input the home loan amount you need (after down payment)',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Interest Rate',
        text: 'Enter the interest rate offered by your bank (typically 8.5%-9.5%)',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Loan Tenure',
        text: 'Select repayment period (up to 30 years for home loans)',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'View Results with Tax Benefits',
        text: 'Get monthly EMI, total interest, and tax savings under Section 80C & 24(b)',
      }
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
