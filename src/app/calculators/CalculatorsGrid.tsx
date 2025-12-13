// src/app/calculators/CalculatorsGrid.tsx
'use client';
import React, { useMemo } from 'react';
// Note: Assuming paths are relative to the root or configured in tsconfig.
// For demonstration, the data is inline.

// Comprehensive list of all calculators created/referenced
const ALL_CALCULATORS = [
  {
    title: 'Home Loan EMI',
    path: '/loans/home-loan',
    category: 'Loans',
    icon: '🏠',
    desc: 'Calculate Home Loan EMI, check LTV, and estimate tax savings (80C & 24).',
  },
  {
    title: 'Car Loan EMI',
    path: '/loans/car-loan',
    category: 'Loans',
    icon: '🚗',
    desc: 'Calculate Car Loan EMI, factoring in down payment and trade-in.',
  },
  {
    title: 'Personal Loan EMI',
    path: '/loans/personal-loan',
    category: 'Loans',
    icon: '💳',
    desc: 'Calculate Personal Loan EMI, total interest, and check affordability (FOIR).',
  },
  {
    title: 'Education Loan EMI',
    path: '/loans/education-loan',
    category: 'Loans',
    icon: '🎓',
    desc: 'Calculate loan EMI, including the impact of moratorium interest.',
  },
  {
    title: 'General EMI',
    path: '/emi-calculator',
    category: 'Loans',
    icon: '📊',
    desc: 'Universal loan calculator for any principal, rate, and tenure.',
  },

  {
    title: 'SIP Planner',
    path: '/sip-calculator',
    category: 'Investment & Savings',
    icon: '💰',
    desc: 'Estimate the maturity value of your Systematic Investment Plan.',
  },
  {
    title: 'Lumpsum Calculator',
    path: '/lumpsum-calculator',
    category: 'Investment & Savings',
    icon: '💎',
    desc: 'Calculate the future value (FV) and returns of a one-time investment.',
  },
  {
    title: 'FD Calculator',
    path: '/fd-calculator',
    category: 'Investment & Savings',
    icon: '🏦',
    desc: 'Compute FD maturity, gross interest, and post-tax payout.',
  },
  {
    title: 'RD Calculator',
    path: '/rd-calculator',
    category: 'Investment & Savings',
    icon: '🔄',
    desc: 'Calculate the maturity amount for your Recurring Deposit contributions.',
  },
  {
    title: 'SWP Calculator',
    path: '/swp-calculator',
    category: 'Investment & Savings',
    icon: '💧',
    desc: 'Plan regular withdrawals from a corpus and check portfolio longevity.',
  },
  {
    title: 'Multi-Asset Portfolio',
    path: '/investing',
    category: 'Investment & Savings',
    icon: '🧩',
    desc: 'Analyze portfolio value based on Equity, Debt, and Gold allocation.',
  },

  {
    title: 'Retirement Planner',
    path: '/retirement-calculator',
    category: 'Retirement & Pension',
    icon: '👵',
    desc: 'Determine required retirement corpus and monthly SIP needed to cover inflation.',
  },
  {
    title: 'EPF Calculator',
    path: '/epf-calculator',
    category: 'Retirement & Pension',
    icon: '👨‍💼',
    desc: 'Project the tax-free EPF corpus based on employee/employer contributions.',
  },
  {
    title: 'APY Calculator',
    path: '/apy-calculator',
    category: 'Retirement & Pension',
    icon: '👴',
    desc: 'Find the required contribution for a guaranteed pension under Atal Pension Yojana.',
  },
  {
    title: 'FIRE Calculator',
    path: '/fire-calculator',
    category: 'Retirement & Pension',
    icon: '🔥',
    desc: 'Calculate your FIRE number (28x+ expense) for early retirement planning.',
  },

  {
    title: 'Credit Score Estimator',
    path: '/credit-score',
    category: 'Tools & Tax',
    icon: '⭐',
    desc: 'Estimate your score and get an actionable plan to improve creditworthiness.',
  },
  {
    title: 'GST Calculator',
    path: '/gst-calculator',
    category: 'Tools & Tax',
    icon: '🧾',
    desc: 'Add or remove GST from a price and view the CGST/SGST split.',
  },
  {
    title: 'Simple Interest',
    path: '/simple-interest-calculator',
    category: 'Tools & Tax',
    icon: '➗',
    desc: 'Basic interest calculation (I=PRT) without compounding.',
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
          {/* Using the icon string directly, styled by global CSS */}
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
      <h1>Comprehensive Financial Calculators</h1>
      <p className="tools-sub">
        Access our full suite of professional calculators for loans,
        investments, retirement planning, and tax tools. All calculators are
        built for the Indian context with sleek, accurate performance.
      </p>

      <div className="ad-box" style={{ marginTop: '20px' }}>
        AdSense Leaderboard Slot
      </div>

      {Object.entries(groupedCalculators).map(([category, calculators]) => (
        <section key={category} className="tools-section">
          <div className="tools-header">
            <h2>{category}</h2>
          </div>
          {/* tools-grid is defined in your global.css to handle the responsive layout */}
          <div className="tools-grid">
            {calculators.map(renderCalculatorTile)}
          </div>
        </section>
      ))}
    </div>
  );
}
