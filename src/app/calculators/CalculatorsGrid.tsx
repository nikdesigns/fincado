'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  Home,
  Car,
  CreditCard,
  GraduationCap,
  TrendingUp,
  PieChart,
  Briefcase,
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
  Wallet,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

type CalculatorItem = {
  title: string;
  path: string;
  category:
    | 'Loans'
    | 'Investment & Savings'
    | 'Retirement & Pension'
    | 'Tools & Tax';
  desc: string;
  popular?: boolean;
  keywords?: string[];
};

const CATEGORY_ORDER: CalculatorItem['category'][] = [
  'Loans',
  'Investment & Savings',
  'Retirement & Pension',
  'Tools & Tax',
];

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
    'PPF Calculator': Landmark,
    'Sukanya Samriddhi (SSY)': Baby,
    'FD Calculator': ScrollText,
    'RD Calculator': Repeat,
    'SWP Calculator': ArrowDownCircle,
    'NSC Calculator': FileCheck,
    'CAGR Calculator': Target,
    'Retirement Planner': Umbrella,
    'NPS Calculator': ShieldCheck,
    'EPF Calculator': Wallet,
    'Gratuity Calculator': Coins,
    'APY Calculator': ShieldCheck,
    'FIRE Calculator': Flame,
    'Goal Planning': Target,
    'Income Tax Calculator': FileCheck,
    'HRA Calculator': Building2,
    'Inflation Calculator': TrendingDown,
    'Credit Score Estimator': Gauge,
    'GST Calculator': Receipt,
    'Simple Interest': Percent,
    'Compound Interest': TrendingUp,
  };

  const IconComponent = icons[name] || Calculator;
  return <IconComponent className={className} />;
};

const ALL_CALCULATORS: CalculatorItem[] = [
  {
    title: 'Home Loan EMI',
    path: '/loans/home-loan/',
    category: 'Loans',
    desc: 'Calculate Home Loan EMI, check LTV, and estimate tax savings (80C & 24).',
    popular: true,
    keywords: ['home loan', 'emi', 'housing'],
  },
  {
    title: 'Car Loan EMI',
    path: '/loans/car-loan/',
    category: 'Loans',
    desc: 'Calculate Car Loan EMI, factoring in down payment and trade-in.',
    keywords: ['car loan', 'vehicle loan', 'emi'],
  },
  {
    title: 'Personal Loan EMI',
    path: '/loans/personal-loan/',
    category: 'Loans',
    desc: 'Calculate Personal Loan EMI, total interest, and check affordability (FOIR).',
    keywords: ['personal loan', 'emi', 'foir'],
  },
  {
    title: 'Education Loan EMI',
    path: '/loans/education-loan/',
    category: 'Loans',
    desc: 'Calculate loan EMI, including the impact of moratorium interest.',
    keywords: ['education loan', 'student loan', 'moratorium'],
  },
  {
    title: 'General EMI',
    path: '/emi-calculator/',
    category: 'Loans',
    desc: 'Universal loan calculator for any principal, rate, and tenure.',
    popular: true,
    keywords: ['emi', 'loan calculator'],
  },
  {
    title: 'SIP Planner',
    path: '/sip-calculator/',
    category: 'Investment & Savings',
    desc: 'Estimate the maturity value of your Systematic Investment Plan.',
    popular: true,
    keywords: ['sip', 'mutual fund', 'investment'],
  },
  {
    title: 'ELSS Calculator',
    path: '/elss-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate tax savings (80C) and returns from ELSS Mutual Funds.',
    keywords: ['elss', '80c', 'tax saving'],
  },
  {
    title: 'Lumpsum Calculator',
    path: '/lumpsum-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate the future value (FV) and returns of a one-time investment.',
  },
  {
    title: 'PPF Calculator',
    path: '/ppf-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate Public Provident Fund maturity amount and interest earned.',
  },
  {
    title: 'Sukanya Samriddhi (SSY)',
    path: '/sukanya-samriddhi/',
    category: 'Investment & Savings',
    desc: 'Calculate SSY returns for your girl child with the latest interest rates.',
  },
  {
    title: 'FD Calculator',
    path: '/fd-calculator/',
    category: 'Investment & Savings',
    desc: 'Compute FD maturity, gross interest, and post-tax payout.',
    popular: true,
  },
  {
    title: 'RD Calculator',
    path: '/rd-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate the maturity amount for your Recurring Deposit contributions.',
  },
  {
    title: 'SWP Calculator',
    path: '/swp-calculator/',
    category: 'Investment & Savings',
    desc: 'Plan regular withdrawals from a corpus and check portfolio longevity.',
  },
  {
    title: 'NSC Calculator',
    path: '/nsc-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate National Savings Certificate returns with tax benefits.',
  },
  {
    title: 'CAGR Calculator',
    path: '/cagr-calculator/',
    category: 'Investment & Savings',
    desc: 'Calculate Compound Annual Growth Rate for your investments.',
  },
  {
    title: 'NPS Calculator',
    path: '/nps-calculator/',
    category: 'Retirement & Pension',
    desc: 'Calculate pension corpus, lump sum (tax-free), and monthly annuity.',
  },
  {
    title: 'EPF Calculator',
    path: '/epf-calculator/',
    category: 'Retirement & Pension',
    desc: 'Project the tax-free EPF corpus based on employee/employer contributions.',
  },
  {
    title: 'Gratuity Calculator',
    path: '/gratuity-calculator/',
    category: 'Retirement & Pension',
    desc: 'Estimate gratuity payout based on tenure and last drawn salary.',
  },
  {
    title: 'Retirement Planner',
    path: '/retirement-calculator/',
    category: 'Retirement & Pension',
    desc: 'Determine required corpus and monthly SIP needed to cover inflation.',
    popular: true,
  },
  {
    title: 'APY Calculator',
    path: '/apy-calculator/',
    category: 'Retirement & Pension',
    desc: 'Find the required contribution for a guaranteed pension under APY.',
  },
  {
    title: 'FIRE Calculator',
    path: '/fire-calculator/',
    category: 'Retirement & Pension',
    desc: 'Calculate Financial Independence Retire Early goals and timeline.',
  },
  {
    title: 'Goal Planning',
    path: '/goal-planning-calculator/',
    category: 'Retirement & Pension',
    desc: 'Plan and track multiple financial goals with SIP requirements.',
  },
  {
    title: 'Income Tax Calculator',
    path: '/income-tax-calculator/',
    category: 'Tools & Tax',
    desc: 'Compare New vs Old Regime tax liability for FY 2026-27.',
    popular: true,
  },
  {
    title: 'HRA Calculator',
    path: '/hra-calculator/',
    category: 'Tools & Tax',
    desc: 'Calculate tax-exempt House Rent Allowance (Old Regime).',
  },
  {
    title: 'GST Calculator',
    path: '/gst-calculator/',
    category: 'Tools & Tax',
    desc: 'Add or remove GST from a price and view the CGST/SGST split.',
  },
  {
    title: 'Inflation Calculator',
    path: '/inflation-calculator/',
    category: 'Tools & Tax',
    desc: 'Calculate the future value of money and see how inflation erodes purchasing power.',
  },
  {
    title: 'Credit Score Estimator',
    path: '/credit-score/',
    category: 'Tools & Tax',
    desc: 'Estimate your score and get an actionable plan to improve creditworthiness.',
  },
  {
    title: 'Simple Interest',
    path: '/simple-interest-calculator/',
    category: 'Tools & Tax',
    desc: 'Basic interest calculation (I=PRT) without compounding.',
  },
  {
    title: 'Compound Interest',
    path: '/compound-interest-calculator/',
    category: 'Tools & Tax',
    desc: 'Calculate compound interest with yearly, half-yearly, or quarterly frequency.',
  },
];

export default function CalculatorsGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const normalizedQuery = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery],
  );

  const categories = useMemo(() => ['All', ...CATEGORY_ORDER], []);

  const filteredCalculators = useMemo(() => {
    return ALL_CALCULATORS.filter((calc) => {
      const searchSpace = [
        calc.title,
        calc.desc,
        calc.category,
        ...(calc.keywords || []),
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        normalizedQuery === '' || searchSpace.includes(normalizedQuery);
      const matchesCategory =
        selectedCategory === 'All' || calc.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [normalizedQuery, selectedCategory]);

  const groupedCalculators = useMemo(() => {
    const grouped: Record<CalculatorItem['category'], CalculatorItem[]> = {
      Loans: [],
      'Investment & Savings': [],
      'Retirement & Pension': [],
      'Tools & Tax': [],
    };

    filteredCalculators.forEach((calc) => {
      grouped[calc.category].push(calc);
    });

    CATEGORY_ORDER.forEach((cat) => {
      grouped[cat].sort((a, b) => a.title.localeCompare(b.title));
    });

    return grouped;
  }, [filteredCalculators]);

  const popularCalculators = useMemo(
    () => ALL_CALCULATORS.filter((c) => c.popular),
    [],
  );

  const visibleCategories = CATEGORY_ORDER.filter(
    (cat) => groupedCalculators[cat].length > 0,
  );

  return (
    <div className="space-y-10">
      <div className="sticky top-16 z-10 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search calculators by name, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-10 text-sm border-slate-200 focus:border-[#C0F08D] focus:ring-1 focus:ring-[#C0F08D]"
              aria-label="Search financial calculators"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{ALL_CALCULATORS.length} total calculators</span>
            <span>{CATEGORY_ORDER.length} categories</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count =
                category === 'All'
                  ? ALL_CALCULATORS.length
                  : ALL_CALCULATORS.filter((c) => c.category === category)
                      .length;

              return (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full text-xs h-7 transition-all ${
                    selectedCategory === category
                      ? 'bg-[#B0EC70] hover:bg-[#B0EC70] text-[#111827]'
                      : 'border-slate-200 text-slate-600 hover:border-[#D0F4A9] hover:bg-[#F7FDF1]'
                  }`}
                >
                  {category}
                  <span
                    className={`ml-1.5 text-xs ${
                      selectedCategory === category
                        ? 'text-[#111827]'
                        : 'text-[#111827]'
                    }`}
                  >
                    ({count})
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {normalizedQuery === '' && selectedCategory === 'All' && (
        <section className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-[#92C65B]" />
            <h3 className="text-lg font-semibold text-slate-900">
              Popular Calculators
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularCalculators.map((calc) => (
              <Link
                key={calc.path}
                href={calc.path}
                className="group block"
                aria-label={`Open ${calc.title}`}
              >
                <Card className="h-full border-slate-200 bg-white hover:border-[#D0F4A9] hover:shadow-md transition-all duration-200">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#F7FDF1] group-hover:text-[#92C65B] transition-colors">
                        <CalculatorIcon name={calc.title} className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-[#74A046] transition-colors truncate">
                          {calc.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          Quick access
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#F7FDF1]0 transition-colors shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(normalizedQuery !== '' || selectedCategory !== 'All') && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-slate-600">
            <strong className="text-slate-900">
              {filteredCalculators.length}
            </strong>{' '}
            calculator{filteredCalculators.length !== 1 ? 's' : ''} found
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs text-[#577A30] hover:text-[#74A046] hover:bg-[#F7FDF1] h-7 font-medium"
          >
            Clear filters
          </Button>
        </div>
      )}

      <div className="space-y-12">
        {visibleCategories.map((category) => {
          const calculators = groupedCalculators[category];

          return (
            <section
              key={category}
              id={category.toLowerCase().replace(/\s+/g, '-')}
              className="scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {category}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-600 text-xs"
                >
                  {calculators.length}
                </Badge>
                <div className="h-px bg-slate-200 grow" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {calculators.map((calc) => (
                  <Link
                    key={calc.path}
                    href={calc.path}
                    className="group block h-full"
                    aria-label={`Open ${calc.title} calculator`}
                  >
                    <Card className="h-full flex flex-col border border-slate-200 bg-white transition-all duration-200 hover:border-[#D0F4A9] hover:shadow-md hover:-translate-y-0.5">
                      <CardHeader className="flex flex-row items-start gap-3 p-4 pb-2 space-y-0">
                        <div className="shrink-0 w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-[#F7FDF1] group-hover:text-[#92C65B] transition-colors">
                          <CalculatorIcon
                            name={calc.title}
                            className="w-4.5 h-4.5"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-sm font-semibold text-slate-900 group-hover:text-[#74A046] transition-colors leading-snug">
                              {calc.title}
                            </CardTitle>
                            {calc.popular && (
                              <Badge
                                variant="secondary"
                                className="bg-amber-50 text-amber-700 text-[10px] px-1.5 py-0 shrink-0 border-0"
                              >
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="px-4 py-2 grow">
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {calc.desc}
                        </p>
                      </CardContent>

                      <CardFooter className="px-4 py-3 mt-auto border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                          Free
                        </span>
                        <div className="flex items-center gap-1 text-xs font-medium text-[#92C65B] group-hover:text-[#74A046] transition-colors">
                          Calculate
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {filteredCalculators.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            No calculators found
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Try adjusting your search or filters
          </p>
          <Button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            size="sm"
            className="bg-[#92C65B] hover:bg-[#74A046] h-9"
          >
            View All Calculators
          </Button>
        </div>
      )}
    </div>
  );
}
