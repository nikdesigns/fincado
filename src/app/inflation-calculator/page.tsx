import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InflationClient from './InflationClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { InflationSchemas } from '@/components/schemas/InflationSchemas';
import {
  BadgeCheck,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  Shield,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Inflation Calculator India 2026 – Future Value & Purchasing Power',
  description:
    'Calculate inflation impact on future expenses. Check purchasing power erosion for education, medical, retirement. Learn Rule of 72 and beat inflation with smart investments.',
  keywords: [
    'Inflation Calculator India',
    'Purchasing Power Calculator',
    'Future Value of Money',
    'Cost of Living Calculator',
    'Real Rate of Return',
    'Rule of 72 Calculator',
    'India CPI Inflation',
    'Medical Inflation Calculator',
    'Education Cost Calculator'
  ],
  alternates: {
    canonical: 'https://fincado.com/inflation-calculator/',
  },
  openGraph: {
    title: 'Inflation Calculator 2026 – Plan for Rising Costs',
    description:
      'Free inflation calculator to estimate future expenses and understand purchasing power erosion. Calculate real returns and beat inflation.',
    url: 'https://fincado.com/inflation-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-inflation-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Inflation Calculator',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'faq-1',
    question: 'What is inflation and why does it matter?',
    answer:
      'Inflation is the rate at which prices of goods and services rise over time, reducing the purchasing power of money. If inflation is 6%, ₹100 today will buy only ₹94 worth of goods next year. This matters because your savings must grow faster than inflation to maintain wealth. Keeping money in savings account (3-4% return) means guaranteed loss of purchasing power.',
  },
  {
    id: 'faq-2',
    question: "What is India's current inflation rate in 2026?",
    answer:
      "India's CPI (Consumer Price Index) inflation as of early 2026 is around 5-6% annually. RBI targets 4% (+/- 2% tolerance band). However, sectoral inflation varies significantly: General CPI 5-6%, Food 7-8%, Fuel 8-10%, Education 10-12%, Healthcare 12-14%. Always use category-specific rates for accurate planning.",
  },
  {
    id: 'faq-3',
    question: 'How do I calculate future value with inflation?',
    answer:
      'Use compound formula: FV = PV × (1 + r)^n where FV is future value, PV is present value, r is inflation rate (as decimal), n is years. Example: ₹50,000 current expense, 6% inflation, 10 years → FV = 50,000 × (1.06)^10 = ₹89,542. This means you need ₹89,542 in 10 years to buy what ₹50,000 buys today.',
  },
  {
    id: 'faq-4',
    question: 'What is the Rule of 72 for inflation?',
    answer:
      'Rule of 72 is a quick way to calculate when prices will double due to inflation: Years to Double = 72 ÷ Inflation Rate. Examples: At 6% inflation, prices double in 12 years (72÷6). At 10% education inflation, fees double in 7.2 years (72÷10). At 12% medical inflation, costs double in 6 years (72÷12). Use this for quick mental estimates.',
  },
  {
    id: 'faq-5',
    question: 'Why is medical inflation so high in India?',
    answer:
      'Medical inflation in India runs at 12-14% annually (double general inflation) due to: (1) Rising drug prices, (2) Advanced medical technology costs, (3) Increasing doctor/specialist fees, (4) Private hospital expansion with premium pricing, (5) Medical tourism driving up demand. Always plan separate healthcare corpus with higher inflation assumption.',
  },
  {
    id: 'faq-6',
    question: 'How much does education cost increase every year?',
    answer:
      'Education inflation in India averages 10-12% annually. Engineering/medical college fees have grown 300-400% in last 15 years. Example: ₹10 lakh/year college fee today will be ₹31 lakh/year in 12 years at 10% inflation. For child education planning, always assume 10% minimum. International education inflation even higher at 12-15%.',
  },
  {
    id: 'faq-7',
    question: 'What is real rate of return and why does it matter?',
    answer:
      'Real Rate of Return = Nominal Return - Inflation Rate. This shows actual wealth growth after accounting for inflation. Examples: FD giving 7% with 6% inflation = 1% real return (barely beating inflation). Equity mutual fund giving 12% with 6% inflation = 6% real return (genuine wealth creation). Always calculate real returns when evaluating investments.',
  },
  {
    id: 'faq-8',
    question: 'Which investments beat inflation in India?',
    answer:
      'Historically inflation-beating assets: (1) Equity/Mutual Funds (12-15% long-term, beats 6% inflation by 6-9%), (2) Real Estate (8-10% capital appreciation + rent), (3) Gold (8-10% long-term hedge), (4) REITs (9-11% with regular payouts). Avoid: Savings account (3-4% = loss), Cash (0% = severe loss), PPF post-tax (5-6% = barely break-even).',
  },
  {
    id: 'faq-9',
    question: 'How does inflation affect retirement planning?',
    answer:
      "Inflation dramatically increases retirement corpus needed. Example: ₹50,000 monthly expense today (₹6L/year). At 6% inflation for 25 years, you need ₹2.15 lakh/month (₹25.8L/year) at retirement. For 30-year retirement, corpus needed = ₹5.3 crores (assuming 8% post-retirement return). Without inflation adjustment, you'll run out of money in 10-12 years.",
  },
  {
    id: 'faq-10',
    question: 'Can salary increase keep up with inflation?',
    answer:
      'Salary increments typically lag inflation for first 10-15 years of career. Average increments: 8-10% in private sector, 3-5% in government. But "lifestyle inflation" (upgrading spending as income grows) often consumes this. Solution: Automate savings increase with every increment (Step-Up SIP), invest raises before lifestyle adjusts, maintain 30% savings rate throughout career.',
  }
];

/* ---------------- PAGE ---------------- */
export default function InflationPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Inflation</strong> is the silent wealth killer that reduces the purchasing power of your money 
      every year. It is the rate at which prices of goods and services increase, making your savings worth 
      less over time if they don't grow faster than inflation.
    </p>
    <p class="mt-4">
      In India, <strong>Consumer Price Index (CPI)</strong> measures general inflation (currently 5-6% annually). 
      However, sectoral inflation varies widely: education costs rise at 10-12%, healthcare at 12-14%, while 
      general goods inflate at 6%. Understanding this is critical for financial planning.
    </p>
  `);

  const impactContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">Real-Life Example:</h4>
    <p class="mt-2">
      If your monthly household expense is ₹50,000 today and general inflation is 6%, you will need:
    </p>
    <ul class="list-disc pl-5 space-y-1 mt-2">
      <li><strong>₹67,196</strong> in 5 years (34% increase)</li>
      <li><strong>₹89,542</strong> in 10 years (79% increase)</li>
      <li><strong>₹1,60,356</strong> in 20 years (221% increase)</li>
      <li><strong>₹2,87,175</strong> in 30 years (474% increase)</li>
    </ul>
    <p class="mt-3 text-sm text-slate-600">
      This means if your savings/investments don't grow by at least 6% annually, you're losing purchasing power every year.
    </p>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Inflation Calculator',
            url: 'https://fincado.com/inflation-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="Inflation Calculator - Future Value & Purchasing Power"
        description="Calculate inflation impact on future expenses. Estimate purchasing power erosion and plan investments to beat inflation."
        url="https://fincado.com/inflation-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <InflationSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Inflation Calculator 2026" />
            <LanguageToggle path="/hi/inflation-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-brrom-orange-50 to-red-100 text-orange-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Inflation Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-orange-700">
                Future Value & Purchasing Power Estimator
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Calculate how inflation reduces your purchasing power over time. Understand the true cost 
                  of future expenses for education, retirement, healthcare, and daily living.
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                Budget 2026: Inflation Targets Maintained
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The Union Budget 2026 reaffirmed RBI&apos;s inflation targeting
                framework of 4% (+/- 2%). No major indirect tax changes that
                would spike CPI. Food subsidy maintained to control price rise.
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="inflation-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-orange-700 mb-1">
                      CURRENT INDIA CPI
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      General inflation rate
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5-6%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      As of Feb 2026
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      RBI INFLATION TARGET
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Tolerance band
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      4%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        ±2%
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      2% to 6% acceptable
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-linear-to-br from-red-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-red-700 mb-1">
                      MEDICAL INFLATION
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Healthcare costs
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12-14%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Double general inflation
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <InflationClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="inflation-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-amber-50/50 border-amber-200 text-slate-600">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Planning Tip
                </strong>
                Use category-specific inflation rates: General 6%, Food 7-8%,
                Education 10-12%, Healthcare 12-14%. Generic 6% assumption can
                severely underestimate future expenses for specialized
                categories.
              </AlertDescription>
            </Alert>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Protect your wealth from inflation
                  </strong>
                  <p className="text-sm text-slate-700">
                    Learn how equity investments, gold, and real estate have
                    historically beaten inflation in India
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Category-wise Inflation Table */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Category-Wise Inflation Rates in India (2026)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Inflation Rate</TableHead>
                          <TableHead>Doubling Period (Rule of 72)</TableHead>
                          <TableHead>Key Drivers</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            🛒 General CPI
                          </TableCell>
                          <TableCell>5-6%</TableCell>
                          <TableCell>12-14 years</TableCell>
                          <TableCell className="text-sm">
                            Overall consumer goods & services
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            🍎 Food & Groceries
                          </TableCell>
                          <TableCell>7-8%</TableCell>
                          <TableCell>9-10 years</TableCell>
                          <TableCell className="text-sm">
                            Monsoon dependency, supply chain issues
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            ⛽ Fuel & Transport
                          </TableCell>
                          <TableCell>8-10%</TableCell>
                          <TableCell>7-9 years</TableCell>
                          <TableCell className="text-sm">
                            Crude oil prices, rupee exchange rate
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            🎓 Education
                          </TableCell>
                          <TableCell className="text-orange-600 font-bold">
                            10-12%
                          </TableCell>
                          <TableCell>6-7 years</TableCell>
                          <TableCell className="text-sm">
                            Private institution expansion, faculty costs
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            🏥 Healthcare
                          </TableCell>
                          <TableCell className="text-red-600 font-bold">
                            12-14%
                          </TableCell>
                          <TableCell>5-6 years</TableCell>
                          <TableCell className="text-sm">
                            Advanced treatment, imported drugs, hospital
                            infrastructure
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            🏠 Real Estate
                          </TableCell>
                          <TableCell>8-10%</TableCell>
                          <TableCell>7-9 years</TableCell>
                          <TableCell className="text-sm">
                            Land prices, construction costs, location premium
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold">
                            👔 Clothing & Apparel
                          </TableCell>
                          <TableCell>5-7%</TableCell>
                          <TableCell>10-14 years</TableCell>
                          <TableCell className="text-sm">
                            Cotton prices, fashion trends, imports
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm text-slate-700">
                      <strong>Planning Tip:</strong> Always use
                      category-specific inflation when calculating future
                      expenses. For child&apos;s education fund, use 10-12% (not
                      general 6%). For healthcare corpus, use 12-14%. This
                      prevents severe underestimation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* AD #3: MID-CONTENT */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot
                id="inflation-mid-content"
                type="square"
                label="Advertisement"
              />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Inflation and How Does It Affect You?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Real-Life Impact of Inflation
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={impactContent} />
                </div>
              </section>

              {/* Purchasing Power Comparison */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Purchasing Power: Then vs Now
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Year 2000</TableHead>
                        <TableHead>Year 2026</TableHead>
                        <TableHead>Increase</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Petrol (per liter)
                        </TableCell>
                        <TableCell>₹30</TableCell>
                        <TableCell>₹100</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          233% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Movie Ticket (Metro)
                        </TableCell>
                        <TableCell>₹40</TableCell>
                        <TableCell>₹250</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          525% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Engineering College Fee (Annual)
                        </TableCell>
                        <TableCell>₹50,000</TableCell>
                        <TableCell>₹3,00,000</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          500% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          House (1000 sq ft, Metro)
                        </TableCell>
                        <TableCell>₹15 lakhs</TableCell>
                        <TableCell>₹80 lakhs</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          433% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Hospital Room (ICU per day)
                        </TableCell>
                        <TableCell>₹1,500</TableCell>
                        <TableCell>₹15,000</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          900% ↑
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Monthly Grocery (Family of 4)
                        </TableCell>
                        <TableCell>₹3,000</TableCell>
                        <TableCell>₹12,000</TableCell>
                        <TableCell className="text-red-600 font-semibold">
                          300% ↑
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-slate-700">
                    <strong>Reality Check:</strong> Over 26 years (2000-2026),
                    prices increased 3-9x depending on category. This shows why
                    savings accounts (3-4% return) guarantee wealth erosion.
                    Only equity and real estate kept pace with or beat
                    inflation.
                  </p>
                </div>
              </section>

              {/* Real Returns Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Are Your Investments Beating Inflation? (Real Returns)
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Investment</TableHead>
                        <TableHead>Nominal Return</TableHead>
                        <TableHead>Inflation (6%)</TableHead>
                        <TableHead>Real Return</TableHead>
                        <TableHead>Verdict</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Savings Account
                        </TableCell>
                        <TableCell>3-4%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-red-600 font-bold">
                          -2 to -3%
                        </TableCell>
                        <TableCell className="text-red-600">
                          ❌ Losing Money
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Fixed Deposit
                        </TableCell>
                        <TableCell>7%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-orange-600 font-bold">
                          +1%
                        </TableCell>
                        <TableCell className="text-orange-600">
                          ⚠️ Barely Breaking Even
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          PPF (Post-tax)
                        </TableCell>
                        <TableCell>7.1%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-lime-600 font-bold">
                          +1.1%
                        </TableCell>
                        <TableCell className="text-lime-600">
                          ⚠️ Minimal Real Growth
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Gold</TableCell>
                        <TableCell>8-10%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-emerald-600 font-bold">
                          +2 to +4%
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          ✓ Inflation Hedge
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Equity Mutual Funds
                        </TableCell>
                        <TableCell>12-15%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-emerald-600 font-bold">
                          +6 to +9%
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          ✓✓ Wealth Creation
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Real Estate (Capital Appreciation)
                        </TableCell>
                        <TableCell>8-10%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-emerald-600 font-bold">
                          +2 to +4%
                        </TableCell>
                        <TableCell className="text-emerald-600">
                          ✓ Beats Inflation
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Cash Under Mattress
                        </TableCell>
                        <TableCell>0%</TableCell>
                        <TableCell>-6%</TableCell>
                        <TableCell className="text-red-600 font-bold">
                          -6%
                        </TableCell>
                        <TableCell className="text-red-600">
                          ❌❌ Severe Wealth Erosion
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* Rule of 72 */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  The Rule of 72: Quick Inflation Calculator
                </h3>

                <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Formula: Years to Double = 72 ÷ Inflation Rate
                  </h4>
                  <p className="text-sm text-slate-700">
                    This mental shortcut helps you quickly estimate when prices
                    will double due to inflation without complex calculations.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🛒</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            General Inflation (6%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            72 ÷ 6 = <strong>12 years</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            Groceries, utilities, transport costs double every
                            12 years
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🎓</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Education (10%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            72 ÷ 10 = <strong>7.2 years</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            School/college fees double every 7 years
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🏥</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Healthcare (12%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            72 ÷ 12 = <strong>6 years</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            Medical costs double every 6 years - plan
                            accordingly
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">⛽</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Fuel (8%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            72 ÷ 8 = <strong>9 years</strong>
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            Petrol/diesel prices double every 9 years
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How to Beat Inflation */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  8 Strategies to Beat Inflation
                </h3>

                <div className="space-y-4">
                  <Card className="border-emerald-200 bg-emerald-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-emerald-600 text-white shrink-0">
                          1
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Invest in Equity/Mutual Funds
                          </h4>
                          <p className="text-sm text-slate-700">
                            Only asset class that consistently beats inflation
                            long-term (12-15% returns vs 6% inflation = 6-9%
                            real wealth growth). Allocate 60-70% of long-term
                            savings to equity.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-blue-600 text-white shrink-0">
                          2
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Use Step-Up SIP
                          </h4>
                          <p className="text-sm text-slate-700">
                            Increase SIP amount by 10-15% annually matching
                            salary increments. This combats lifestyle inflation
                            and compounds wealth faster than fixed SIP.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          3
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Diversify with Gold (10-15%)
                          </h4>
                          <p className="text-sm text-slate-700">
                            Gold historically preserves purchasing power during
                            high inflation. Allocate 10-15% via Sovereign Gold
                            Bonds (2.5% interest + capital appreciation).
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          4
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Avoid Idle Cash
                          </h4>
                          <p className="text-sm text-slate-700">
                            Keep only 3-6 months emergency fund in savings. Rest
                            should be in liquid mutual funds (7-8% return) or
                            FDs. Idle cash loses 6% value annually.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          5
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Consider Real Estate (Long-term)
                          </h4>
                          <p className="text-sm text-slate-700">
                            Property in good locations appreciates 8-10%
                            annually + rental income. But needs large capital,
                            low liquidity. Or invest in REITs for real estate
                            exposure with liquidity.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          6
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Invest Salary Increments
                          </h4>
                          <p className="text-sm text-slate-700">
                            Automate 50% of every salary raise into investments
                            before lifestyle adjusts. This builds wealth without
                            feeling the pinch, fighting lifestyle inflation.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          7
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Rebalance Portfolio Annually
                          </h4>
                          <p className="text-sm text-slate-700">
                            Review asset allocation yearly. If equity grew too
                            much, book profits to debt. If fallen, invest more.
                            Maintains risk-reward balance and optimizes real
                            returns.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          8
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Plan with Higher Inflation Rates
                          </h4>
                          <p className="text-sm text-slate-700">
                            For education/medical, use 10-12% inflation (not
                            6%). For retirement, add 1-2% buffer. Better to
                            over-save than fall short due to underestimation.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Financial Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/retirement-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            👴
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              Retirement Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Plan retirement corpus considering inflation.
                              Calculate how much you need to retire comfortably.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Plan Retirement</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sip-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                            📈
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                              SIP Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate SIP returns that beat inflation. See
                              step-up SIP advantage for long-term wealth.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                              <span>Start SIP Planning</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="inflation-before-faq" type="leaderboard" lazyLoad />
            </div>

            {/* FAQs */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900">
                          {faq.question}
                        </AccordionTrigger>

                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="inflation-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="inflation-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="inflation-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
