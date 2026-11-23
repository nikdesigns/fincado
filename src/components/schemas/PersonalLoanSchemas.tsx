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
    featureList: [
      'Instant Personal Loan EMI Calculation',
      'Interest Rate Comparison',
      'Eligibility Check',
      'Prepayment Calculator',
      'Credit Score Impact Analysis'
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
