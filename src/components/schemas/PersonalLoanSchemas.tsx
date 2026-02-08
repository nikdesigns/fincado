export function PersonalLoanSchemas() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fincado Personal Loan EMI Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      ratingCount: '3142',
      bestRating: '5',
    },
    featureList: [
      'Instant Personal Loan EMI Calculation',
      'Interest Rate Comparison',
      'Eligibility Check',
      'Prepayment Calculator',
      'Credit Score Impact Analysis'
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
        name: 'Personal Loan EMI Calculator',
        item: 'https://fincado.com/emi-calculator/personal-loan',
      }
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Personal Loan EMI',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Loan Amount',
        text: 'Input the personal loan amount you need (₹50,000 to ₹40 lakhs)',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Interest Rate',
        text: 'Enter interest rate (10.49%-24% based on credit score)',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Tenure',
        text: 'Select repayment period (1-5 years)',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'View EMI & Eligibility',
        text: 'Get instant monthly EMI and check your eligibility',
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
