import Script from 'next/script';

export function CreditScoreSchemas() {
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
      'https://linkedin.com/company/fincado'
    ],
  };

  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Credit Score Calculator 2026 - CIBIL Score Estimator India',
    description:
      'Free Credit Score Calculator to estimate CIBIL/Experian score. Check impact of payment history, credit utilization, and inquiries. Get personalized tips to reach 750+ score.',
    url: 'https://fincado.com/credit-score/',
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
      name: 'Credit Score Calculator',
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
    name: 'How to Improve Your Credit Score to 750+',
    description:
      'Step-by-step guide to improving CIBIL credit score from poor/average to excellent (750+) for better loan eligibility and lower interest rates.',
    image: '/og-credit-score.jpg',
    totalTime: 'P6M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Check Your Current Credit Score',
        text: 'Get free credit report from CIBIL, Experian, Equifax, or CRIF High Mark. Check for errors, defaults, or outdated information. Raise disputes for incorrect entries.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Set Up Payment Reminders',
        text: 'Never miss EMI or credit card payment. Set up auto-debit for all loans and cards. Even one 30-day late payment can drop score by 50-100 points. Payment history accounts for 35% of score.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Reduce Credit Utilization Below 30%',
        text: 'If you use ₹90,000 of ₹1,00,000 credit limit (90% utilization), pay down balance or request limit increase. Keep utilization under 30% ideally, below 10% for excellent score. This accounts for 30% of credit score.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Avoid Multiple Loan Applications',
        text: 'Each hard inquiry drops score by 5-10 points. Space out loan applications by at least 6 months. Multiple rejections hurt more than inquiries. Use pre-approved offers or soft inquiry tools.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Maintain Old Credit Accounts',
        text: 'Never close your oldest credit card even if unused. Average account age affects 15% of score. Keep old accounts active with small monthly transactions and full payment.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Diversify Credit Mix',
        text: "Have mix of secured (home/car loan) and unsecured credit (cards, personal loan). Credit mix accounts for 10% of score. But don't take unnecessary loans just for this.",
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Settle All Dues in Full',
        text: 'Avoid "settled" status on credit report. Always negotiate to pay in full for "closed" status. Settlements stay on report for 7 years and severely impact score and future loan eligibility.',
      },
      {
        '@type': 'HowToStep',
        position: 8,
        name: 'Monitor Progress Monthly',
        text: 'Check credit score monthly using free sources (CIBIL, bank apps, fintech platforms). Track improvements. Typically takes 3-6 months to see significant positive change with consistent good behavior.',
      }
    ],
  };

  // FinancialProduct Schema
  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Credit Score / CIBIL Score India',
    description:
      'Credit Score is 3-digit number (300-900) representing creditworthiness based on payment history, credit utilization, account age, credit mix, and inquiries. Used by lenders for loan approval and interest rate decisions.',
    category: 'Credit Rating',
    feesAndCommissionsSpecification:
      'Free credit score check once per year from each bureau (CIBIL, Experian, Equifax, CRIF). Paid reports: ₹550-800 with detailed analysis. Many banks and fintech apps offer free monthly scores.',
    interestRate: {
      '@type': 'QuantitativeValue',
      value: '300-900',
      unitText:
        'Score range (300 = Very Poor, 750+ = Excellent for best loan terms)',
    },
  };

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Credit Score Calculator 2026 - Complete Guide to CIBIL Score Improvement',
    description:
      'Complete guide to understanding, calculating, and improving credit score in India. Learn factors affecting CIBIL score, difference between credit bureaus, soft vs hard inquiry, and proven strategies to reach 750+ score.',
    image: '/og-credit-score.jpg',
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
    datePublished: '2026-01-05',
    dateModified: '2026-02-07',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/credit-score/',
    },
  };

  return (
    <>
      <Script
        id="credit-score-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="credit-score-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="credit-score-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <Script
        id="credit-score-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />

      <Script
        id="credit-score-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
    </>
  );
}
