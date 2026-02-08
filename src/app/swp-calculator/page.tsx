import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SWPClient from './SWPClient';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { SWPSchemas } from '@/components/schemas/SWPSchemas';
import {
  Info,
  TrendingDown,
  ArrowRight,
  Wallet,
  PiggyBank,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'SWP Calculator 2026 – Systematic Withdrawal Plan Calculator',
  description:
    'Calculate systematic withdrawal plan returns from mutual funds. Plan regular income from investments, check corpus sustainability, withdrawal strategies, and retirement income planning for 2026.',
  keywords: [
    'SWP Calculator',
    'Systematic Withdrawal Plan Calculator',
    'SWP Mutual Fund Calculator',
    'Retirement Income Calculator',
    'Monthly Income Calculator',
    'SWP vs SIP',
    'SWP Tax Calculator',
    'Withdrawal Plan Calculator',
    'Pension Calculator',
    'Post Retirement Income',
  ],
  alternates: {
    canonical: 'https://fincado.com/swp-calculator/',
  },
  openGraph: {
    title: 'SWP Calculator 2026 – Plan Systematic Withdrawals',
    description:
      'Free SWP calculator to plan regular income from mutual funds. Calculate corpus sustainability, monthly withdrawals, and retirement income strategies.',
    url: 'https://fincado.com/swp-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-swp-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado SWP Calculator',
      },
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

/* ---------------- PAGE ---------------- */

export default function SWPPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Systematic Withdrawal Plan (SWP)</strong> is a mutual fund facility that allows 
      investors to withdraw a fixed amount regularly (monthly, quarterly, or yearly) from their 
      investment corpus. It's the opposite of SIP—instead of investing regularly, you're withdrawing 
      regularly while your remaining corpus continues to grow.
    </p>
    <p class="mt-4">
      SWP is ideal for <strong>retirement income planning</strong>, creating regular cash flow 
      from your accumulated wealth, or meeting periodic expenses without redeeming the entire 
      investment. Your remaining corpus continues earning returns, potentially sustaining withdrawals 
      for extended periods.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Regular Income:</strong> Receive fixed monthly/quarterly income like a salary or pension.</li>
      <li><strong>Tax Efficiency:</strong> Only capital gains taxed, not entire withdrawal (unlike interest income).</li>
      <li><strong>Flexibility:</strong> Change withdrawal amount, pause, or stop anytime without penalty.</li>
      <li><strong>Rupee Cost Averaging (Reverse):</strong> Redeem fewer units when NAV is high, more when low.</li>
      <li><strong>Liquidity:</strong> Access to remaining corpus anytime for emergencies.</li>
      <li><strong>Compounding Benefits:</strong> Remaining corpus continues to grow and earn returns.</li>
    </ul>
  `);

  const whenToUseContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Retirement:</strong> Convert retirement corpus into monthly pension-like income.</li>
      <li><strong>Early Retirement:</strong> Bridge income gap until pension/social security starts.</li>
      <li><strong>Child's Education:</strong> Regular withdrawals to pay semester fees or expenses.</li>
      <li><strong>Medical Expenses:</strong> Meet recurring medical costs for elderly parents or treatment.</li>
      <li><strong>Supplementary Income:</strong> Add to salary for lifestyle upgrades or EMI payments.</li>
      <li><strong>Emergency Fund:</strong> Gradual deployment of emergency corpus while earning returns.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      SWP taxation is more favorable than FD interest or dividend income because only the 
      <strong>capital gains portion</strong> of each withdrawal is taxed, not the entire amount:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">Equity Mutual Funds:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Short-Term (< 1 year):</strong> 20% tax on gains (STCG)</li>
      <li><strong>Long-Term (> 1 year):</strong> 12.5% tax on gains above ₹1.25 lakh per year (LTCG)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Debt Mutual Funds:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>All gains taxed as per your income tax slab</strong> (no LTCG benefit from April 2023)</li>
    </ul>
    <p class="mt-4 font-semibold text-emerald-700">
      Example: If you withdraw ₹50,000 monthly and only ₹10,000 is capital gain, tax applies 
      only on ₹10,000, not the full ₹50,000.
    </p>
  `);

  const faqItems = [
    {
      id: 'swp-faq-1',
      question: 'What is SWP in mutual funds?',
      answer:
        'SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed amount regularly (monthly/quarterly/yearly) from your mutual fund investment. Your remaining corpus continues to earn returns, making it ideal for retirement income or regular cash flow needs.',
    },
    {
      id: 'swp-faq-2',
      question: 'How is SWP different from dividend?',
      answer:
        'SWP offers fixed withdrawals you control, while dividends are uncertain and decided by the fund. SWP provides better tax efficiency (only capital gains taxed) and flexibility to pause or stop anytime.',
    },
    {
      id: 'swp-faq-3',
      question: 'Is SWP tax-free?',
      answer:
        'No, but SWP is tax-efficient. Only the capital gains portion of each withdrawal is taxed, not the entire amount. For equity funds held over 1 year: 12.5% LTCG on gains above ₹1.25L/year. For debt funds: gains taxed as per your income slab.',
    },
    {
      id: 'swp-faq-4',
      question: 'Can I pause or stop SWP anytime?',
      answer:
        'Yes! SWP is highly flexible. You can pause withdrawals, change the withdrawal amount, or stop SWP completely without any penalty. Simply submit a modification request to your fund house or AMC.',
    },
    {
      id: 'swp-faq-5',
      question: 'What is a safe SWP withdrawal rate?',
      answer:
        'The widely accepted "4% rule" suggests withdrawing 4% of your corpus annually to sustain it for 25-30 years. For Indian equity funds (10-12% returns), you can safely withdraw 5-6% annually. For debt funds (6-8% returns), stick to 3-4% withdrawal rate.',
    },
    {
      id: 'swp-faq-6',
      question: 'Which funds are best for SWP?',
      answer:
        'For regular income: Balanced Advantage Funds, Multi-Asset Funds, or Large-Cap Equity Funds (lower volatility). For short-term (1-3 years): Debt funds or Arbitrage funds. Avoid small-cap or sectoral funds due to high volatility.',
    },
    {
      id: 'swp-faq-7',
      question: 'How much corpus needed for ₹50,000 monthly SWP?',
      answer:
        'Using the 5% safe withdrawal rate: Corpus needed = (₹50,000 × 12) ÷ 0.05 = ₹1.2 crore. This assumes 10% returns and 5% annual withdrawal, sustaining for 25-30 years. Lower withdrawal rates extend corpus life.',
    },
    {
      id: 'swp-faq-8',
      question: 'SWP vs annuity - which is better for retirement?',
      answer:
        'SWP offers flexibility, inflation protection (corpus grows), and liquidity. Annuity provides guaranteed lifelong income but no corpus access or inflation protection. Many retirees use both: annuity for basic needs, SWP for lifestyle expenses.',
    },
    {
      id: 'swp-faq-9',
      question: 'What happens if market crashes during SWP?',
      answer:
        "Market corrections temporarily reduce your corpus value. If you continue withdrawing the same amount, you'll deplete corpus faster. Strategy: Keep 2-3 years expenses in debt funds, reduce equity SWP during crashes, or use dynamic withdrawal (withdraw less in down years).",
    },
    {
      id: 'swp-faq-10',
      question: 'Can I start SWP from SIP investments?',
      answer:
        'Yes! Once your SIP corpus reaches a comfortable level (e.g., ₹20-30 lakhs), you can start SWP. Many investors continue SIP in growth funds while taking SWP from mature funds for income.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'SWP Calculator',
            url: 'https://fincado.com/swp-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Systematic Withdrawal Plan (SWP) Calculator"
        description="Calculate regular income from mutual funds with SWP. Plan retirement income and check corpus sustainability."
        url="https://fincado.com/swp-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <SWPSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SWP Calculator - Systematic Withdrawal Plan" />
            <LanguageToggle path="/hi/swp-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-green-100 text-lime-700">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                SWP Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                Plan systematic withdrawals for retirement income
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="swp-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      SAFE WITHDRAWAL RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Annual (for 25-30 year sustainability)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      4–5%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      TAX ON SWP
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Only on capital gains, not full withdrawal
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12.5%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        LTCG
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      MINIMUM CORPUS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      For ₹25,000 monthly income (5% rule)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹60L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        onwards
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <SWPClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="swp-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Retirement Planning Tip
                </strong>
                Follow the 4% rule: Withdraw 4% of your corpus annually to
                sustain it for 25-30 years. Keep 2-3 years expenses in debt
                funds to avoid selling equity during market crashes.
              </AlertDescription>
            </Alert>

            {/* ✅ SWP FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    SWP Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      SWP calculations involve tracking your corpus
                      month-by-month, applying returns, and deducting
                      withdrawals. The remaining balance after each withdrawal
                      continues to earn returns:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-lg font-serif">
                          Balance<sub>month</sub> = (Balance<sub>prev</sub> × (1
                          + r)) - W
                        </div>
                        <div className="text-sm text-slate-600">
                          Applied iteratively for each month
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-28 font-mono font-semibold">
                          Balance<sub>month</sub>
                        </span>
                        <span>= Corpus balance at end of current month</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-28 font-mono font-semibold">
                          Balance<sub>prev</sub>
                        </span>
                        <span>= Corpus balance at end of previous month</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-28 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Monthly return rate (Annual rate ÷ 12 ÷ 100)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-28 font-mono font-semibold">
                          W
                        </span>
                        <span>= Withdrawal amount for the month</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> Unlike simple interest
                        calculations, SWP requires iterative month-by-month
                        calculation because withdrawals reduce the corpus that
                        earns returns.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: Monthly SWP Calculation
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Initial Corpus:</strong>
                        </div>
                        <div>₹10,00,000</div>

                        <div>
                          <strong>Monthly Withdrawal:</strong>
                        </div>
                        <div>₹10,000</div>

                        <div>
                          <strong>Annual Return:</strong>
                        </div>
                        <div>10% p.a.</div>

                        <div>
                          <strong>Time Period:</strong>
                        </div>
                        <div>10 years (120 months)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Monthly Return Rate
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          r = 10% ÷ 12 ÷ 100 = 0.008333
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Month 1 Calculation
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            Balance after returns = 10,00,000 × (1 + 0.008333) =
                            10,08,333
                          </div>
                          <div>
                            Balance after withdrawal = 10,08,333 - 10,000 =
                            9,98,333
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Month 2 Calculation
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            Balance after returns = 9,98,333 × (1 + 0.008333) =
                            10,06,651
                          </div>
                          <div>
                            Balance after withdrawal = 10,06,651 - 10,000 =
                            9,96,651
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <div className="text-xs text-slate-600 italic">
                          This process repeats for all 120 months...
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          After 10 Years:
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Total Withdrawn:</span>
                            <strong className="text-lime-700">
                              ₹12,00,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Remaining Corpus:</span>
                            <strong className="text-emerald-700">
                              ₹8,33,945
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>Key Insight:</strong> Despite withdrawing ₹12L
                          over 10 years, you still have ₹8.34L remaining because
                          the corpus earned 10% returns annually.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4% Rule Explanation */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      The 4% Rule for Safe Withdrawal
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        The &quot;4% rule&quot; suggests withdrawing 4% of your
                        initial corpus annually (adjusted for inflation) to
                        sustain it for 25-30 years. This is based on historical
                        data assuming 7-10% returns.
                      </p>
                      <div className="p-3 bg-white rounded border border-purple-200 mt-2">
                        <div className="font-mono text-sm space-y-1">
                          <div>Safe Annual Withdrawal = Corpus × 4%</div>
                          <div>
                            Example: ₹1 Crore × 4% = ₹4 lakh/year
                            (₹33,333/month)
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        For Indian equity funds (10-12% returns), you can safely
                        increase to 5% withdrawal rate.
                      </p>
                    </div>
                  </div>

                  {/* Corpus Exhaustion Warning */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>⚠️</span>
                      When Will Your Corpus Run Out?
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        Your corpus gets exhausted when monthly withdrawals
                        exceed monthly returns. High withdrawal rates deplete
                        corpus faster:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs mt-2">
                        <li>
                          3% withdrawal rate: Corpus grows (sustainable forever)
                        </li>
                        <li>5% withdrawal rate: Corpus sustains 25-30 years</li>
                        <li>
                          7% withdrawal rate: Corpus depletes in 15-20 years
                        </li>
                        <li>
                          10% withdrawal rate: Corpus exhausted in 10-12 years
                        </li>
                      </ul>
                      <p className="text-xs font-semibold text-amber-800 mt-2">
                        💡 Strategy: Start with lower withdrawal rates. Increase
                        gradually based on market performance.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This calculator uses month-by-month iterative calculations.
                    Actual returns vary based on market conditions. Past
                    performance doesn&apos;t guarantee future results.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <PiggyBank className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    Building retirement corpus?
                  </strong>
                  <Link
                    href="/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      Use SIP Calculator to plan your wealth accumulation
                      journey
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Systematic Withdrawal Plan (SWP)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Benefits of SWP
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={benefitsContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="swp-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  When to Use SWP
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={whenToUseContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  SWP vs Dividend vs FD Interest Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Factor</TableHead>
                        <TableHead className="text-left">SWP</TableHead>
                        <TableHead className="text-left">Dividend</TableHead>
                        <TableHead className="text-left">FD Interest</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Regularity
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Fixed (You control)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Uncertain (Fund decides)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Fixed (Guaranteed)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Taxation
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Only on capital gains
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Taxed as per slab
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Taxed as per slab
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Flexibility
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Change/pause/stop anytime
                        </TableCell>
                        <TableCell className="text-slate-700">
                          No control
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Fixed until maturity
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Corpus Growth
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Remaining balance grows
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Principal remains invested
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Principal fixed
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Inflation Protection
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Can increase withdrawal
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Uncertain dividends
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Fixed returns
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Liquidity
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Full access anytime
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Full access anytime
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Penalty for early exit
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Best For
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Retirement income, flexibility
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Passive income seekers
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Risk-averse, guaranteed income
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Verdict:</strong> SWP offers superior
                    flexibility and tax efficiency compared to dividends and FD
                    interest. Ideal for retirees seeking predictable cash flow
                    with corpus growth potential.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Taxation on SWP
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxContent} />
                </div>
              </section>

              {/* SWP Strategy */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Optimal SWP Strategy for Retirement
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>
                    Follow this proven strategy for sustainable retirement
                    income:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 mt-4">
                    <li>
                      <strong>Build Corpus:</strong> Accumulate retirement
                      corpus through SIP/lumpsum during earning years. Target
                      25-30x your annual expenses.
                    </li>
                    <li>
                      <strong>Asset Allocation:</strong> Keep 60% in equity
                      funds (growth), 40% in debt funds (stability). Rebalance
                      annually.
                    </li>
                    <li>
                      <strong>Start SWP:</strong> Begin with 4-5% annual
                      withdrawal rate from debt funds. This covers regular
                      expenses.
                    </li>
                    <li>
                      <strong>Emergency Buffer:</strong> Maintain 2-3 years
                      expenses in liquid/ultra-short debt funds. Avoid selling
                      equity during crashes.
                    </li>
                    <li>
                      <strong>Dynamic Withdrawal:</strong> In good years (market
                      up 20%+), withdraw more. In bad years, reduce withdrawals
                      or use emergency buffer.
                    </li>
                    <li>
                      <strong>Annual Review:</strong> Increase withdrawal by
                      5-7% annually to account for inflation. Monitor corpus
                      health.
                    </li>
                  </ol>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this SWP Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter your initial investment corpus (accumulated wealth).
                  </li>
                  <li>Set desired withdrawal amount per month/quarter/year.</li>
                  <li>
                    Choose withdrawal frequency (monthly for regular income).
                  </li>
                  <li>
                    Enter expected annual return rate (8-10% for balanced funds,
                    10-12% for equity).
                  </li>
                  <li>Select time period for which you plan to withdraw.</li>
                  <li>View remaining corpus and total withdrawn amount.</li>
                  <li>
                    Enable <strong>&quot;Year-wise Breakdown&quot;</strong> to
                    see corpus depletion over first 5 years.
                  </li>
                  <li>
                    If corpus exhausts early, reduce withdrawal or increase
                    expected returns.
                  </li>
                </ol>
              </section>

              {/* Best Funds for SWP */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Best Mutual Funds for SWP
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Balanced Advantage Funds:</strong> Dynamic
                      allocation between equity/debt. Lower volatility. Ideal
                      for retirees. Expected: 9-11% returns.
                    </li>
                    <li>
                      <strong>Multi-Asset Funds:</strong> Invest across equity,
                      debt, gold. Diversified. Good for 5+ year SWP. Expected:
                      10-12% returns.
                    </li>
                    <li>
                      <strong>Large-Cap Equity Funds:</strong> Stable, lower
                      volatility. Suitable for long-term SWP (10+ years).
                      Expected: 10-12% returns.
                    </li>
                    <li>
                      <strong>Debt Funds (Short Duration):</strong> For
                      conservative investors or short-term SWP (1-3 years).
                      Expected: 6-8% returns.
                    </li>
                    <li>
                      <strong>Arbitrage Funds:</strong> Extremely low risk,
                      tax-efficient as equity. Suitable for senior citizens.
                      Expected: 5-7% returns.
                    </li>
                  </ul>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                    <p className="text-sm text-slate-700">
                      <strong>Pro Tip:</strong> Avoid high-volatility funds like
                      small-cap or sector funds for SWP. Volatility can deplete
                      corpus faster during market downturns.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Retirement Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/sip-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            📈
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              SIP Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Build retirement corpus with systematic monthly
                              investments.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                              <span>Build Corpus</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/lumpsum-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              Lumpsum Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate returns from one-time retirement corpus
                              investment.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Try Now</span>
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
              <AdSlot id="swp-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="swp-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="swp-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="swp-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
