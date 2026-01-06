// src/app/calculators/CalculatorsGrid.tsx
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  // Group calculators by Category
  const groupedCalculators = useMemo(() => {
    return ALL_CALCULATORS.reduce((acc, calc) => {
      // Handle slight category name variations if they exist in data
      let cat = calc.category;
      if (cat.includes('Investment')) cat = 'Investment & Savings';
      if (cat.includes('Retirement')) cat = 'Retirement & Pension';

      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(calc);
      return acc;
    }, {} as Record<string, typeof ALL_CALCULATORS>);
  }, []);

  return (
    <div className="space-y-16">
      {/* Intro Section */}
      <div className="article">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Comprehensive Financial Calculators
        </h2>
        <p className="text-slate-600 mb-8">
          Access our full suite of professional calculators for loans,
          investments, retirement planning, and tax tools. All calculators are
          built for the Indian financial system.
        </p>
      </div>

      <div className="my-8">
        <AdSlot id="calculators-grid-top" type="leaderboard" />
      </div>

      {/* Categories Loop */}
      {Object.entries(groupedCalculators).map(([category, calculators]) => (
        <section
          key={category}
          id={category.toLowerCase().replace(/\s+/g, '-')}
        >
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800">{category}</h3>
            <Badge
              variant="secondary"
              className="text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              {calculators.length} Tools
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.path}
                href={calc.path}
                className="group block h-full"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-slate-200 hover:border-brand-green/50">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-6">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                      {calc.icon}
                    </div>
                    <div className="space-y-1.5">
                      <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-brand-green transition-colors leading-tight">
                        {calc.title}
                      </CardTitle>
                      <CardDescription className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {calc.desc}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
