// src/app/calculators/CalculatorsGrid.tsx
'use client';
import React, { useMemo } from 'react';
import AdSlot from '@/components/AdSlot';

// Comprehensive list of all calculators
const ALL_CALCULATORS = [
  // --- LOANS ---
  {
    title: 'Home Loan EMI',
    path: '/loans/home-loan/',
    category: 'Loans',
    icon: '🏠',
    desc: 'Calculate Home Loan EMI, check LTV, and estimate tax savings (80C & 24).',
  },
  {
    title: 'Car Loan EMI',
    path: '/loans/car-loan/',
    category: 'Loans',
    icon: '🚗',
    desc: 'Calculate Car Loan EMI, factoring in down payment and trade-in.',
  },
  {
    title: 'Personal Loan EMI',
    path: '/loans/personal-loan/',
    category: 'Loans',
    icon: '💳',
    desc: 'Calculate Personal Loan EMI, total interest, and check affordability (FOIR).',
  },
  {
    title: 'Education Loan EMI',
    path: '/loans/education-loan/',
    category: 'Loans',
    icon: '🎓',
    desc: 'Calculate loan EMI, including the impact of moratorium interest.',
  },
  {
    title: 'General EMI',
    path: '/emi-calculator/',
    category: 'Loans',
    icon: '📊',
    desc: 'Universal loan calculator for any principal, rate, and tenure.',
  },

  // --- INVESTMENT ---
  {
    title: 'SIP Planner',
    path: '/sip-calculator/',
    category: 'Investment & Savings',
    icon: '💰',
    desc: 'Estimate the maturity value of your Systematic Investment Plan.',
  },
  {
    title: 'ELSS Calculator', // ✅ ADDED
    path: '/elss-calculator/',
    category: 'Investment & Savings',
    icon: '📉',
    desc: 'Calculate tax savings (80C) and returns from ELSS Mutual Funds.',
  },
  {
    title: 'Lumpsum Calculator',
    path: '/lumpsum-calculator/',
    category: 'Investment & Savings',
    icon: '💎',
    desc: 'Calculate the future value (FV) and returns of a one-time investment.',
  },
  {
    title: 'Mutual Funds',
    path: '/mutual-funds/',
    category: 'Investment & Savings',
    icon: '📈',
    desc: 'Estimate returns on equity and debt mutual funds.',
  },
  {
    title: 'PPF Calculator',
    path: '/ppf-calculator/',
    category: 'Investment & Savings',
    icon: '🏦',
    desc: 'Calculate Public Provident Fund maturity amount and interest earned.',
  },
  {
    title: 'Sukanya Samriddhi (SSY)',
    path: '/sukanya-samriddhi/',
    category: 'Investment & Savings',
    icon: '👧',
    desc: 'Calculate SSY returns for your girl child with the latest interest rates.',
  },
  {
    title: 'FD Calculator',
    path: '/fd-calculator/',
    category: 'Investment & Savings',
    icon: '📜',
    desc: 'Compute FD maturity, gross interest, and post-tax payout.',
  },
  {
    title: 'RD Calculator',
    path: '/rd-calculator/',
    category: 'Investment & Savings',
    icon: '🔄',
    desc: 'Calculate the maturity amount for your Recurring Deposit contributions.',
  },
  {
    title: 'SWP Calculator',
    path: '/swp-calculator/',
    category: 'Investment & Savings',
    icon: '💧',
    desc: 'Plan regular withdrawals from a corpus and check portfolio longevity.',
  },

  // --- RETIREMENT ---
  {
    title: 'Retirement Planner',
    path: '/retirement-calculator/',
    category: 'Retirement & Pension',
    icon: '👵',
    desc: 'Determine required retirement corpus and monthly SIP needed to cover inflation.',
  },
  {
    title: 'EPF Calculator',
    path: '/epf-calculator/',
    category: 'Retirement & Pension',
    icon: '👨‍💼',
    desc: 'Project the tax-free EPF corpus based on employee/employer contributions.',
  },
  {
    title: 'APY Calculator',
    path: '/apy-calculator/',
    category: 'Retirement & Pension',
    icon: '👴',
    desc: 'Find the required contribution for a guaranteed pension under Atal Pension Yojana.',
  },
  {
    title: 'FIRE Calculator',
    path: '/fire-calculator/',
    category: 'Retirement & Pension',
    icon: '🔥',
    desc: 'Calculate your FIRE number (28x+ expense) for early retirement planning.',
  },

  // --- TOOLS & TAX ---
  {
    title: 'Income Tax Calculator', // ✅ ADDED
    path: '/income-tax-calculator/',
    category: 'Tools & Tax',
    icon: '📋',
    desc: 'Compare New vs Old Regime tax liability for FY 2024-25 & 2025-26.',
  },
  {
    title: 'Inflation Calculator',
    path: '/inflation-calculator/',
    category: 'Tools & Tax',
    icon: '📉',
    desc: 'Calculate the future value of money and see how inflation erodes purchasing power.',
  },
  {
    title: 'Credit Score Estimator',
    path: '/credit-score/',
    category: 'Tools & Tax',
    icon: '⭐',
    desc: 'Estimate your score and get an actionable plan to improve creditworthiness.',
  },
  {
    title: 'GST Calculator',
    path: '/gst-calculator/',
    category: 'Tools & Tax',
    icon: '🧾',
    desc: 'Add or remove GST from a price and view the CGST/SGST split.',
  },
  {
    title: 'Simple Interest',
    path: '/simple-interest-calculator/',
    category: 'Tools & Tax',
    icon: '➗',
    desc: 'Basic interest calculation (I=PRT) without compounding.',
  },
  {
    title: 'Compound Interest',
    path: '/compound-interest-calculator/',
    category: 'Tools & Tax',
    icon: '🔄',
    desc: 'Calculate compound interest with yearly, half-yearly, or quarterly frequency.',
  },
];

export default function CalculatorsGrid() {
  const groupedCalculators = useMemo(() => {
    return ALL_CALCULATORS.reduce((acc, calc) => {
      if (!acc[calc.category]) {
        acc[calc.category] = [];
      }
      acc[calc.category].push(calc);
      return acc;
    }, {} as Record<string, typeof ALL_CALCULATORS>);
  }, []);

  const renderCalculatorTile = (calc: (typeof ALL_CALCULATORS)[0]) => (
    <a
      key={calc.path}
      href={calc.path}
      className="tool-tile"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="tool-icon-wrap">
        <div className="tool-icon-circle">
          <span className="tool-icon-svg" style={{ fontSize: '28px' }}>
            {calc.icon}
          </span>
        </div>
      </div>
      <h3 className="tool-title">{calc.title}</h3>
      <p className="tool-desc">{calc.desc}</p>
    </a>
  );

  return (
    <div className="calculator-hub article">
      <h2>Comprehensive Financial Calculators</h2>
      <p className="tools-sub">
        Access our full suite of professional calculators for loans,
        investments, retirement planning, and tax tools. All calculators are
        built for the Indian context.
      </p>

      <div style={{ margin: '30px 0' }}>
        <AdSlot id="calculators-grid-top" type="leaderboard" />
      </div>

      {Object.entries(groupedCalculators).map(([category, calculators]) => (
        <section key={category} className="tools-section">
          <div className="tools-header">
            <h2>{category}</h2>
          </div>
          <div className="tools-grid">
            {calculators.map(renderCalculatorTile)}
          </div>
        </section>
      ))}
    </div>
  );
}
