// src/app/calculators/CalculatorsGrid.tsx
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calculator,
  Home,
  Car,
  CreditCard,
  GraduationCap,
  TrendingUp,
  PieChart,
  Briefcase,
  BarChart3,
  Landmark,
  Baby,
  ScrollText,
  Repeat,
  ArrowDownCircle,
  Umbrella,
  Building2,
  ShieldCheck,
  Flame,
  FileCheck,
  TrendingDown,
  Gauge,
  Receipt,
  Percent,
  ArrowRight,
  Coins,
} from 'lucide-react';

// --- ICON MAPPING ---
// Helper to render icons based on the static data
const CalculatorIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const icons: Record<string, React.ElementType> = {
    'Home Loan EMI': Home,
    'Car Loan EMI': Car,
    'Personal Loan EMI': CreditCard,
    'Education Loan EMI': GraduationCap,
    'General EMI': Calculator,
    'SIP Planner': TrendingUp,
    'ELSS Calculator': PieChart,
    'Lumpsum Calculator': Briefcase,
    'Mutual Funds': BarChart3,
    'PPF Calculator': Landmark,
    'Sukanya Samriddhi (SSY)': Baby,
    'FD Calculator': ScrollText,
    'RD Calculator': Repeat,
    'SWP Calculator': ArrowDownCircle,
    'Retirement Planner': Umbrella,
    'EPF Calculator': Building2,
    'APY Calculator': ShieldCheck,
    'FIRE Calculator': Flame,
    'Income Tax Calculator': FileCheck,
    'Inflation Calculator': TrendingDown,
    'Credit Score Estimator': Gauge,
    'GST Calculator': Receipt,
    'Simple Interest': Coins,
    'Compound Interest': Percent,
  };

  const IconComponent = icons[name] || Calculator;
  return <IconComponent className={className} />;
};

// --- DATA ---
const ALL_CALCULATORS = [
  // --- LOANS ---
  {
    title: 'Home Loan EMI',
    path: '/loans/home-loan/',
    category: 'Loans',
    desc: 'Calculate Home Loan EMI, check LTV, and estimate tax savings (80C & 24).',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    title: 'Car Loan EMI',
    path: '/loans/car-loan/',
    category: 'Loans',
    desc: 'Calculate Car Loan EMI, factoring in down payment and trade-in.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    title: 'Personal Loan EMI',
    path: '/loans/personal-loan/',
    category: 'Loans',
    desc: 'Calculate Personal Loan EMI, total interest, and check affordability (FOIR).',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    title: 'Education Loan EMI',
    path: '/loans/education-loan/',
    category: 'Loans',
    desc: 'Calculate loan EMI, including the impact of moratorium interest.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    title: 'General EMI',
    path: '/emi-calculator/',
    category: 'Loans',
    desc: 'Universal loan calculator for any principal, rate, and tenure.',
    color: 'text-blue-600 bg-blue-50',
  },

  // --- INVESTMENT ---
  {
    title: 'SIP Planner',
    path: '/sip-calculator/',
    category: 'Investment & Savings',
    desc: 'Estimate the maturity value of your Systematic Investment Plan.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'ELSS Calculator',
    path: '/elss-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate tax savings (80C) and returns from ELSS Mutual Funds.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'Lumpsum Calculator',
    path: '/lumpsum-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate the future value (FV) and returns of a one-time investment.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'Mutual Funds',
    path: '/mutual-funds/',
    category: 'Investment & Savings',
    desc: 'Estimate returns on equity and debt mutual funds.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'PPF Calculator',
    path: '/ppf-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate Public Provident Fund maturity amount and interest earned.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'Sukanya Samriddhi (SSY)',
    path: '/sukanya-samriddhi/',
    category: 'Investment & Savings',
    desc: 'Calculate SSY returns for your girl child with the latest interest rates.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'FD Calculator',
    path: '/fd-calculator/',
    category: 'Investment & Savings',
    desc: 'Compute FD maturity, gross interest, and post-tax payout.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'RD Calculator',
    path: '/rd-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate the maturity amount for your Recurring Deposit contributions.',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: 'SWP Calculator',
    path: '/swp-calculator/',
    category: 'Investment & Savings',
    desc: 'Plan regular withdrawals from a corpus and check portfolio longevity.',
    color: 'text-emerald-600 bg-emerald-50',
  },

  // --- RETIREMENT ---
  {
    title: 'Retirement Planner',
    path: '/retirement-calculator/',
    category: 'Retirement & Pension',
    desc: 'Determine required retirement corpus and monthly SIP needed to cover inflation.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    title: 'EPF Calculator',
    path: '/epf-calculator/',
    category: 'Retirement & Pension',
    desc: 'Project the tax-free EPF corpus based on employee/employer contributions.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    title: 'APY Calculator',
    path: '/apy-calculator/',
    category: 'Retirement & Pension',
    desc: 'Find the required contribution for a guaranteed pension under Atal Pension Yojana.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    title: 'FIRE Calculator',
    path: '/fire-calculator/',
    category: 'Retirement & Pension',
    desc: 'Calculate your FIRE number (28x+ expense) for early retirement planning.',
    color: 'text-amber-600 bg-amber-50',
  },

  // --- TOOLS & TAX ---
  {
    title: 'Income Tax Calculator',
    path: '/income-tax-calculator/',
    category: 'Tools & Tax',
    desc: 'Compare New vs Old Regime tax liability for FY 2024-25 & 2025-26.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    title: 'Inflation Calculator',
    path: '/inflation-calculator/',
    category: 'Tools & Tax',
    desc: 'Calculate the future value of money and see how inflation erodes purchasing power.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    title: 'Credit Score Estimator',
    path: '/credit-score/',
    category: 'Tools & Tax',
    desc: 'Estimate your score and get an actionable plan to improve creditworthiness.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    title: 'GST Calculator',
    path: '/gst-calculator/',
    category: 'Tools & Tax',
    desc: 'Add or remove GST from a price and view the CGST/SGST split.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    title: 'Simple Interest',
    path: '/simple-interest-calculator/',
    category: 'Tools & Tax',
    desc: 'Basic interest calculation (I=PRT) without compounding.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    title: 'Compound Interest',
    path: '/compound-interest-calculator/',
    category: 'Tools & Tax',
    desc: 'Calculate compound interest with yearly, half-yearly, or quarterly frequency.',
    color: 'text-indigo-600 bg-indigo-50',
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
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
      {/* --- CATEGORIES LOOP --- */}
      <div className="space-y-16">
        {Object.entries(groupedCalculators).map(([category, calculators]) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, '-')}
            className="scroll-mt-24"
          >
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-slate-900 pl-4">
                {category}
              </h3>
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-2.5 py-0.5"
              >
                {calculators.length}
              </Badge>
              <div className="h-px bg-slate-200 grow ml-2"></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {calculators.map((calc) => (
                <Link
                  key={calc.path}
                  href={calc.path}
                  className="group block h-full outline-none"
                >
                  <Card className="h-full flex flex-col border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 hover:border-slate-300 overflow-hidden">
                    <CardHeader className="flex flex-row items-start gap-4 p-6 pb-2 space-y-0">
                      <div
                        className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${calc.color}`}
                      >
                        <CalculatorIcon name={calc.title} className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 pt-1">
                        <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-lime-700 transition-colors leading-tight">
                          {calc.title}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6 py-3 grow">
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {calc.desc}
                      </p>
                    </CardContent>

                    <CardFooter className="px-6 py-4 mt-auto border-t border-slate-50 flex items-center justify-between bg-slate-50/30 group-hover:bg-slate-50 transition-colors">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Calculate
                      </span>
                      <div className="flex items-center text-sm font-bold text-lime-600 opacity-80 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                        Start <ArrowRight className="ml-1.5 h-4 w-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
