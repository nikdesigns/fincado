import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RetirementCalculatorClient from './RetirementCalculatorClient';
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
import { RetirementSchemas } from '@/components/schemas/RetirementSchemas';
import { Info, Palmtree, ArrowRight, TrendingUp, Shield } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Retirement Calculator 2026 – Plan Your Retirement Corpus',
  description:
    'Calculate retirement corpus needed based on current expenses and inflation. Plan monthly SIP, check savings adequacy, and ensure comfortable retirement planning for 2026.',
  keywords: [
    'Retirement Calculator',
    'Retirement Planning Calculator',
    'Retirement Corpus Calculator',
    'Pension Calculator',
    'Early Retirement Calculator',
    'SIP for Retirement',
    'Retirement Fund Calculator',
    'Post Retirement Planning',
    'Retirement Savings Calculator',
    'FIRE Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/retirement-calculator/',
  },
  openGraph: {
    title: 'Retirement Calculator 2026 – Plan Your Financial Freedom',
    description:
      'Free retirement calculator to plan corpus, monthly SIP, and post-retirement income. Calculate inflation-adjusted expenses and secure your retirement.',
    url: 'https://fincado.com/retirement-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-retirement-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Retirement Calculator',
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

export default function RetirementCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Retirement planning</strong> is about ensuring you have enough financial corpus 
      to maintain your lifestyle after you stop earning. A well-planned retirement corpus 
      accounts for inflation, life expectancy, medical expenses, and desired lifestyle to 
      ensure you don't outlive your savings.
    </p>
    <p class="mt-4">
      This retirement calculator helps you determine the <strong>target corpus needed</strong> 
      based on your current expenses, inflation rate, and expected returns. It calculates the 
      monthly SIP required to bridge the gap between your current savings and retirement goal, 
      ensuring a stress-free post-retirement life.
    </p>
  `);

  const whyPlanContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Inflation Erosion:</strong> ₹50,000 today will be worth only ₹18,000 in 30 years at 6% inflation</li>
      <li><strong>Longer Life Expectancy:</strong> Indians now live 70-80 years; plan for 20-30 year retirement</li>
      <li><strong>No Regular Income:</strong> Salary stops but expenses continue (medical, lifestyle, travel)</li>
      <li><strong>Rising Healthcare Costs:</strong> Medical inflation is 10-15%, much higher than general inflation</li>
      <li><strong>Loss of Purchasing Power:</strong> Fixed deposits and pensions lose value over time</li>
      <li><strong>Dependency Risk:</strong> Don't burden children; maintain financial independence</li>
    </ul>
  `);

  const retirementGoalsContent = autoLinkContent(`
    <p>
      A solid retirement plan should cover multiple financial goals:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Essential Expenses:</strong> Housing (rent/maintenance), food, utilities, transport - 40% of corpus</li>
      <li><strong>Healthcare:</strong> Medical insurance, regular checkups, medicines, surgeries - 25% of corpus</li>
      <li><strong>Lifestyle & Leisure:</strong> Travel, hobbies, entertainment, dining - 20% of corpus</li>
      <li><strong>Emergency Fund:</strong> Unexpected expenses, home repairs, family support - 10% of corpus</li>
      <li><strong>Legacy Planning:</strong> Estate for children, charity, gifting - 5% of corpus</li>
    </ul>
    <p class="mt-4 font-semibold text-emerald-700">
      <strong>Rule of Thumb:</strong> Target retirement corpus should be 25-30 times your 
      annual expenses at retirement age (adjusted for inflation).
    </p>
  `);

  const investmentStrategiesContent = autoLinkContent(`
    <p>
      Retirement corpus building requires a lifecycle-based investment approach:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">Age 20-35 (Accumulation Phase):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Aggressive allocation: 80-90% equity, 10-20% debt</li>
      <li>Focus on growth: Small-cap, mid-cap, international funds</li>
      <li>Start SIP early for maximum compounding benefit</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Age 35-50 (Growth Phase):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Moderate allocation: 60-70% equity, 30-40% debt</li>
      <li>Shift to large-cap and balanced funds for stability</li>
      <li>Increase SIP annually with salary hikes (10-15% top-up)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Age 50-60 (Preservation Phase):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Conservative allocation: 30-40% equity, 60-70% debt</li>
      <li>Focus on capital protection and stable returns</li>
      <li>Move to debt funds, PPF, NPS, debt mutual funds</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Age 60+ (Distribution Phase):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Safety allocation: 20-30% equity, 70-80% debt</li>
      <li>Use SWP (Systematic Withdrawal Plan) for monthly income</li>
      <li>Keep 2-3 years expenses in liquid funds for emergencies</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'retirement-faq-1',
      question: 'How much corpus do I need to retire comfortably?',
      answer:
        'A general rule is to have 25-30 times your annual expenses at retirement. For example, if you need ₹50,000/month (₹6 lakh/year) at retirement, aim for ₹1.5-1.8 crore corpus. This ensures 25-30 years of comfortable retirement with 4% safe withdrawal rate.',
    },
    {
      id: 'retirement-faq-2',
      question: 'What is the 4% rule for retirement?',
      answer:
        'The 4% rule suggests withdrawing 4% of your retirement corpus annually (adjusted for inflation) to sustain for 25-30 years. If corpus is ₹1 crore, withdraw ₹4 lakh in year 1, then increase by inflation each year. This balances income needs with corpus longevity.',
    },
    {
      id: 'retirement-faq-3',
      question: 'How much should I save monthly for retirement?',
      answer:
        'Aim to save 15-20% of your monthly income for retirement. A 30-year-old earning ₹50,000 should invest ₹7,500-₹10,000 monthly in retirement funds. Start early for maximum compounding - investing at 25 vs 35 can double your retirement corpus.',
    },
    {
      id: 'retirement-faq-4',
      question: 'Should I invest in NPS or mutual funds for retirement?',
      answer:
        'Both have merits. NPS offers tax benefits (₹50,000 extra under 80CCD(1B)), low costs (0.1%), but has 60% lock-in till 60. Mutual funds offer flexibility, higher returns potential, but no annuity mandate. Ideal: Use both - NPS for tax saving, equity MFs for growth.',
    },
    {
      id: 'retirement-faq-5',
      question: 'What is early retirement (FIRE)?',
      answer:
        'FIRE (Financial Independence, Retire Early) means retiring before traditional age (45-50 vs 60). Requires aggressive saving (50-70% of income), minimalist lifestyle, and larger corpus (30-40x expenses). Popular among high earners who want financial freedom early.',
    },
    {
      id: 'retirement-faq-6',
      question: 'How does inflation affect retirement planning?',
      answer:
        'Inflation significantly impacts retirement. At 6% inflation, ₹50,000/month today becomes ₹2.87 lakh/month in 30 years. Your retirement corpus must account for this. Use inflation-indexed investments (equity, real estate) in early years to beat inflation.',
    },
    {
      id: 'retirement-faq-7',
      question: 'What are the best investment options for retirement?',
      answer:
        'Age-based allocation: 20-35 years: Equity MFs (80%), PPF (20%). 35-50 years: Equity MFs (60%), NPS (20%), Debt MFs (20%). 50-60 years: Debt MFs (50%), NPS (30%), Equity (20%). 60+: SWP from debt/hybrid funds for monthly income.',
    },
    {
      id: 'retirement-faq-8',
      question: 'Should I buy retirement pension plans from insurance?',
      answer:
        'Generally not recommended. Traditional pension plans (LIC, etc.) give 5-6% returns with high charges and inflexibility. Better to invest in equity MFs (12%) + NPS (10%) and create your own pension using SWP. You get higher returns and flexibility.',
    },
    {
      id: 'retirement-faq-9',
      question: 'How much medical corpus should I keep for retirement?',
      answer:
        'Medical expenses are 25-30% of retirement corpus. At 60, keep ₹30-40 lakhs separately for healthcare (increases with medical inflation 10-15%). Buy comprehensive health insurance (₹10-20L cover) + critical illness (₹50L) to protect retirement corpus from medical shocks.',
    },
    {
      id: 'retirement-faq-10',
      question: 'Can I retire at 50 with ₹5 crore?',
      answer:
        'Yes, if expenses are ₹1.5-2 lakh/month. Using 4% rule, ₹5 crore generates ₹20 lakh/year (₹1.67L/month) safely for 25-30 years. But account for inflation - this amount will reduce in purchasing power. Keep 60% in equity initially to beat inflation.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Retirement Calculator',
            url: 'https://fincado.com/retirement-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Retirement Planning Calculator"
        description="Calculate retirement corpus needed based on expenses, inflation, and investment returns. Plan monthly SIP and ensure comfortable retirement."
        url="https://fincado.com/retirement-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <RetirementSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Retirement Planning Calculator" />
            <LanguageToggle path="/hi/retirement-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-700">
              <Palmtree className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Retirement Planning Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                Plan your retirement corpus and achieve financial freedom
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="retirement-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      RECOMMENDED CORPUS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Annual expenses × multiplier
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      25-30x
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        expenses
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      SAFE WITHDRAWAL RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Annual withdrawal from corpus
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      4%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      PLANNING HORIZON
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Post-retirement duration
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      25-30
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        years
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <RetirementCalculatorClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="retirement-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Planning Tip
                </strong>
                Start investing early for retirement. A 25-year-old investing
                ₹10,000/month will have 2x corpus compared to starting at 35.
                Compounding works best over long periods.
              </AlertDescription>
            </Alert>

            {/* ✅ RETIREMENT FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Retirement Corpus Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      Retirement planning involves calculating future expenses
                      adjusted for inflation, then determining the corpus needed
                      using the annuity formula:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          Step 1: Future Monthly Expense
                        </div>
                        <div className="text-lg font-serif">
                          FE = CE × (1 + i)<sup>n</sup>
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          Step 2: Retirement Corpus Required
                        </div>
                        <div className="text-lg font-serif">
                          Corpus = FE × 12 × [1 - (1 + r)<sup>-t</sup>] / r
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          FE
                        </span>
                        <span>
                          = Future monthly expense at retirement
                          (inflation-adjusted)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          CE
                        </span>
                        <span>
                          = Current monthly expense (today&apos;s value in ₹)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          i
                        </span>
                        <span>
                          = Monthly inflation rate (annual rate ÷ 12 ÷ 100)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = Months until retirement (years to retire × 12)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Real return rate [(1 + post-ret return) / (1 +
                          inflation) - 1]
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          t
                        </span>
                        <span>
                          = Retirement duration in years (typically 25-30 years)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> Real return adjusts
                        post-retirement returns for inflation to calculate
                        purchasing power-adjusted corpus requirements.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: Retirement Planning at Age 30
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Current Age:</strong>
                        </div>
                        <div>30 years</div>

                        <div>
                          <strong>Retirement Age:</strong>
                        </div>
                        <div>60 years</div>

                        <div>
                          <strong>Years to Retire:</strong>
                        </div>
                        <div>30 years (360 months)</div>

                        <div>
                          <strong>Current Monthly Expense:</strong>
                        </div>
                        <div>₹50,000</div>

                        <div>
                          <strong>Inflation Rate:</strong>
                        </div>
                        <div>6% p.a.</div>

                        <div>
                          <strong>Post-Retirement Return:</strong>
                        </div>
                        <div>8% p.a.</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Monthly Inflation Rate
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          i = 6% ÷ 12 ÷ 100 = 0.005
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate Future Monthly Expense
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FE = 50,000 × (1 + 0.005)<sup>360</sup>
                          </div>
                          <div>FE = 50,000 × 6.023</div>
                          <div>FE ≈ ₹3,01,150</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Calculate Real Return Rate
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>r = (1 + 0.08) / (1 + 0.06) - 1</div>
                          <div>r = 1.08 / 1.06 - 1</div>
                          <div>r ≈ 0.0189 (1.89%)</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 4: Calculate Annual Expense at Retirement
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          Annual Expense = 3,01,150 × 12 = ₹36,13,800
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 5: Calculate Retirement Corpus (25 years)
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            Corpus = 36,13,800 × [1 - (1.0189)<sup>-25</sup>] /
                            0.0189
                          </div>
                          <div>Corpus = 36,13,800 × [1 - 0.6288] / 0.0189</div>
                          <div>Corpus = 36,13,800 × 19.646</div>
                          <div>Corpus ≈ ₹7,09,95,000</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Target Retirement Corpus:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹7.10 Crore
                        </div>
                        <div className="text-xs text-slate-600 mt-2">
                          This corpus will provide ₹3.01 lakh/month for 25 years
                          post-retirement
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>Key Insight:</strong> Your ₹50,000/month
                          expense today becomes ₹3 lakh/month in 30 years due to
                          6% inflation. Early planning and aggressive SIP can
                          help you build this corpus comfortably.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SIP Calculation */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Required Monthly SIP Calculation
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        Once you know the target corpus, calculate required
                        monthly SIP to bridge the gap between current savings
                        and target:
                      </p>
                      <div className="p-3 bg-white rounded border border-purple-200 mt-2">
                        <div className="font-mono text-sm space-y-1">
                          <div>
                            Gap = Target Corpus - Future Value of Current
                            Savings
                          </div>
                          <div className="mt-2">
                            SIP = Gap / [((1 + r)<sup>n</sup> - 1) / r × (1 +
                            r)]
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        Where r = monthly pre-retirement return rate, n = months
                        to retirement
                      </p>
                    </div>
                  </div>

                  {/* 25x vs 30x Rule */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      25x Rule vs 30x Rule
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        <strong>25x Rule:</strong> Multiply annual expenses by
                        25. Assumes 4% withdrawal rate and 25-year retirement.
                        Suitable for normal retirement (60+) with moderate
                        lifestyle.
                      </p>
                      <p>
                        <strong>30x Rule:</strong> Multiply annual expenses by
                        30. Assumes 3.33% withdrawal rate and 30+ year
                        retirement. Better for early retirement (50-55) or
                        longer life expectancy.
                      </p>
                      <p className="text-xs font-semibold text-amber-800 mt-2">
                        💡 Example: For ₹6L annual expense → 25x = ₹1.5 Cr | 30x
                        = ₹1.8 Cr
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This calculator uses standard financial formulas. Actual
                    retirement needs vary based on lifestyle, medical expenses,
                    and inflation rates. Consult a financial advisor for
                    personalized planning.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Want to create retirement income?
                  </strong>
                  <Link
                    href="/swp-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      Use SWP Calculator to plan systematic withdrawals from
                      your corpus
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
                  Why Retirement Planning is Critical
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={whyPlanContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Retirement Planning Goals
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={retirementGoalsContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="retirement-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Age-Based Investment Strategies for Retirement
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={investmentStrategiesContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Retirement Investment Options Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Option</TableHead>
                        <TableHead className="text-left">Returns</TableHead>
                        <TableHead className="text-left">Tax Benefit</TableHead>
                        <TableHead className="text-left">Liquidity</TableHead>
                        <TableHead className="text-left">Best For</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Equity Mutual Funds
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          12-15% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          LTCG 12.5% ({'>'}1yr)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          High (T+3 days)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Age 20-50, aggressive growth
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          NPS (National Pension)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          10-12% p.a.
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹2L (80C + 80CCD)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Low (Lock till 60)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Salaried, tax saving
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          PPF (Public Provident)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% p.a.
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (₹1.5L/yr)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Medium (15 year lock)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Conservative, tax-free
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          EPF (Employee Provident)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8.25% p.a.
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (up to ₹2.5L)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Low (Till retirement)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Salaried employees
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Senior Citizen Schemes
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8-9% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L under 80C
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Medium (5 year lock)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          60+ age, safe returns
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Real Estate
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8-10% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          LTCG 20% ({'>'}2yr)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Very Low (months)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          High capital, diversification
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Pension Plans (Insurance)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5-6% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L under 80C
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Very Low (till 60)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Not recommended (low returns)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Verdict:</strong> Best retirement strategy
                    combines Equity MFs (growth), NPS (tax saving), and PPF/EPF
                    (safety). Avoid traditional insurance pension plans due to
                    poor returns and high charges.
                  </p>
                </div>
              </section>

              {/* Common Mistakes */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Common Retirement Planning Mistakes to Avoid
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Starting Late:</strong> Delaying retirement
                      planning by 10 years can reduce your corpus by 50% due to
                      lost compounding.
                    </li>
                    <li>
                      <strong>Underestimating Inflation:</strong> Not accounting
                      for 6-7% inflation means your corpus will lose purchasing
                      power rapidly.
                    </li>
                    <li>
                      <strong>Ignoring Healthcare:</strong> Medical expenses are
                      10-15% inflation - keep separate ₹30-50L medical corpus.
                    </li>
                    <li>
                      <strong>Over-Reliance on Property:</strong> Real estate is
                      illiquid - don&apos;t put entire retirement corpus in
                      property.
                    </li>
                    <li>
                      <strong>No Emergency Fund:</strong> Keep 2-3 years
                      expenses in liquid funds to avoid distress selling during
                      market crashes.
                    </li>
                    <li>
                      <strong>Buying Insurance Pension Plans:</strong>{' '}
                      Traditional pension plans give 5-6% returns with high
                      charges - avoid them.
                    </li>
                    <li>
                      <strong>Not Rebalancing Portfolio:</strong> Shift from
                      equity to debt as you near retirement to protect capital.
                    </li>
                    <li>
                      <strong>Ignoring Inflation in Withdrawals:</strong>{' '}
                      Increase withdrawal by 5-6% annually to maintain
                      purchasing power.
                    </li>
                  </ul>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this Retirement Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter your current age and desired retirement age (usually
                    60).
                  </li>
                  <li>
                    Input current monthly expenses (today&apos;s value, not
                    future).
                  </li>
                  <li>
                    Enter current retirement savings (EPF + PPF + MF + stocks +
                    FD).
                  </li>
                  <li>
                    Click <strong>&quot;Show Advanced Rates&quot;</strong> to
                    adjust inflation (6%), pre-retirement return (12%), and
                    post-retirement return (8%).
                  </li>
                  <li>
                    View target retirement corpus needed for 25 years of
                    comfortable retirement.
                  </li>
                  <li>
                    Check monthly SIP required to bridge the gap between current
                    savings and target.
                  </li>
                  <li>
                    Review expense at retirement (inflation-adjusted) and
                    savings future value.
                  </li>
                  <li>
                    Save your plan or share on WhatsApp for discussion with
                    family/advisor.
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Retirement Planning Tools
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
                              Calculate monthly SIP needed to build your
                              retirement corpus.
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

                  <Link href="/swp-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              SWP Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Plan systematic withdrawals for monthly retirement
                              income.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Plan Withdrawals</span>
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
              <AdSlot id="retirement-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="retirement-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="retirement-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="retirement-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
