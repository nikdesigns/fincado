export function EducationLoanSchemas() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fincado Education Loan EMI Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Education Loan EMI Calculation',
      'Section 80E Tax Benefit Calculator',
      'Study Abroad Loan Calculator',
      'Moratorium Period Analysis',
      'Interest vs Principal Breakdown'
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Education Loan EMI',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Loan Amount',
        text: 'Input total education loan amount needed for tuition, hostel, and other expenses',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Interest Rate',
        text: 'Enter interest rate (8.5%-13.5% based on studying in India or abroad)',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Repayment Tenure',
        text: 'Select repayment period (10-15 years) after moratorium period',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Calculate Tax Savings',
        text: 'View Section 80E tax deduction on interest (100% deductible for 8 years)',
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
