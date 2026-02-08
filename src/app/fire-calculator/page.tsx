import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FIRECalculatorClient from './FIRECalculatorClient';
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
import { FIRESchemas } from '@/components/schemas/FIRESchemas';
import { Flame, Info, TrendingUp, ArrowRight, DollarSign } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'FIRE Calculator 2026 – Financial Independence Retire Early India',
  description:
    'Calculate your FIRE Number with Safe Withdrawal Rate (SWR). Plan early retirement with inflation-adjusted expenses, monthly SIP needed, and Lean vs Fat FIRE strategies.',
  keywords: [
    'FIRE Calculator India',
    'Financial Independence Retire Early',
    'FIRE Number Calculator',
    'Safe Withdrawal Rate India',
    'Lean FIRE Calculator',
    'Fat FIRE vs Lean FIRE',
    'Early Retirement Calculator',
    '4% Rule India'
  ],
  alternates: {
    canonical: 'https://fincado.com/fire-calculator/',
  },
  openGraph: {
    title: 'FIRE Calculator 2026 – Calculate Early Retirement Number',
    description:
      'Free FIRE calculator to calculate financial freedom number, monthly SIP needed, and years to retire early in India.',
    url: 'https://fincado.com/fire-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-fire-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado FIRE Calculator',
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
    id: 'fire-faq-1',
    question: 'What is the FIRE Movement?',
    answer:
      'FIRE (Financial Independence, Retire Early) is a lifestyle movement focused on extreme saving and investing to achieve financial independence and retire decades earlier than traditional retirement age. Followers typically save 50-70% of income and invest in low-cost index funds.',
  },
  {
    id: 'fire-faq-2',
    question: 'How long does it take to achieve FIRE in India?',
    answer:
      'It depends on your savings rate. With 50% savings rate, FIRE can be achieved in ~17 years. With 60%, it takes ~12 years. With 70% savings rate, you can achieve FIRE in just 8-10 years. Higher savings rate dramatically reduces time to FIRE.',
  },
  {
    id: 'fire-faq-3',
    question: 'What is Safe Withdrawal Rate (SWR) for India?',
    answer:
      'While the US follows 4% rule, India requires more conservative 3-3.5% SWR due to higher inflation (6-7%). This means you need 28-33× annual expenses as corpus instead of 25×. For ₹10 lakh annual expenses, you need ₹3-3.3 crore corpus.',
  },
  {
    id: 'fire-faq-4',
    question: 'What is the difference between Lean FIRE and Fat FIRE?',
    answer:
      'Lean FIRE: Living frugally on <₹30k/month (~₹1 crore corpus). Fat FIRE: Luxury lifestyle on >₹1 lakh/month (₹3.5+ crore corpus). Regular FIRE: Standard middle-class lifestyle with ₹50-70k/month (₹1.7-2.5 crore corpus). Barista FIRE: Semi-retirement with part-time work.',
  },
  {
    id: 'fire-faq-5',
    question: 'Where should I invest for FIRE in India?',
    answer:
      'Diversified portfolio: 70-80% equity (Nifty 50, Nifty Next 50 index funds for 12% returns), 15-20% debt (PPF, debt funds for stability), 5-10% gold/international (hedging). Avoid high-cost active funds. Focus on low-cost index funds with <0.5% expense ratio.',
  },
  {
    id: 'fire-faq-6',
    question: 'Does FIRE calculation include healthcare costs?',
    answer:
      'No. Keep separate health insurance (₹15-25 lakh family floater) and medical emergency fund (₹5-10 lakh). Healthcare inflation is 12-15%, much higher than general inflation. FIRE corpus should only cover lifestyle expenses, not medical emergencies.',
  },
  {
    id: 'fire-faq-7',
    question: 'Is FIRE possible with children in India?',
    answer:
      'Yes, but challenging. Calculate children education separately (₹30-50 lakh per child for higher education). Start education-specific investments (Sukanya Samriddhi for daughters, PPF/debt funds for sons). FIRE corpus should exclude child education costs.',
  },
  {
    id: 'fire-faq-8',
    question: 'What happens if stock market crashes after FIRE?',
    answer:
      'This is sequence-of-returns risk. Mitigation: Maintain 2-3 years expenses in debt/FD (emergency fund), use dynamic withdrawal (reduce expenses in down years), delay FIRE by 1-2 years for extra cushion, consider 3% SWR instead of 4% for India.',
  },
  {
    id: 'fire-faq-9',
    question: 'Can I achieve FIRE with ₹50k monthly salary?',
    answer:
      'Difficult but possible with extreme discipline. With ₹50k salary, save ₹35k (70% savings rate), invest for 12% returns. After 15 years, you can achieve Lean FIRE (~₹1 crore corpus for ₹25-30k/month expenses). Requires very frugal lifestyle.',
  },
  {
    id: 'fire-faq-10',
    question: 'Should I tell my employer about pursuing FIRE?',
    answer:
      'No. Keep FIRE plans private. Continue working professionally without revealing early retirement intentions. Once you hit FIRE number, give proper notice and transition smoothly. Employer may reduce opportunities if they know you plan to quit soon.',
  }
];

/* ---------------- PAGE ---------------- */
export default function FIRECalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>FIRE (Financial Independence, Retire Early)</strong> is a revolutionary 
      lifestyle movement that challenges traditional retirement thinking. Instead of working 
      until 60, FIRE followers aim to achieve financial freedom in their 30s or 40s through 
      aggressive saving, smart investing, and intentional living.
    </p>
    <p class="mt-4">
      The core principle: Save <strong>50-70% of your income</strong>, invest in low-cost 
      index funds, and build a corpus that generates enough passive income to cover living 
      expenses forever. Once your investments generate more than your expenses, you achieve 
      <strong>financial independence</strong>—work becomes optional.
    </p>
  `);

  const coreConceptsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>FIRE Number:</strong> Target corpus = Annual Expenses × (100 ÷ SWR). For India, typically 28-33× annual expenses.</li>
      <li><strong>Safe Withdrawal Rate (SWR):</strong> Percentage of corpus withdrawn annually. US: 4%, India: 3-3.5% (due to higher inflation).</li>
      <li><strong>Rule of 25/30:</strong> Multiply annual expenses by 25 (4% SWR) or 30-33 (3-3.5% SWR for India) to get FIRE number.</li>
      <li><strong>Savings Rate:</strong> Percentage of income saved. 50% = 17 years to FIRE, 60% = 12 years, 70% = 9 years.</li>
      <li><strong>Coast FIRE:</strong> Save enough that compound growth reaches FIRE number by 60 without additional contributions.</li>
      <li><strong>Barista FIRE:</strong> Partially FIRE with part-time work for healthcare/flexibility while investments cover basic living.</li>
    </ul>
  `);

  const swrContent = autoLinkContent(`
    <p>
      The <strong>4% Rule</strong> (Trinity Study, USA) assumes you can withdraw 4% of retirement 
      corpus annually with 95% success over 30 years. However, <strong>India requires more conservative 
      3-3.5% SWR</strong> because:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-3">
      <li><strong>Higher Inflation:</strong> India averages 6-7% vs US 2-3%</li>
      <li><strong>Market Volatility:</strong> Emerging market risks require larger corpus buffer</li>
      <li><strong>Longer Retirement:</strong> FIRE at 40 means 40+ years of retirement (vs 30 years in Trinity Study)</li>
      <li><strong>Healthcare Costs:</strong> Medical inflation 12-15% requires separate emergency fund</li>
    </ul>
    <div class="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
      <p class="text-sm text-slate-700">
        <strong>Example:</strong> ₹10 lakh annual expenses needs ₹2.5 crore (4% SWR) or 
        ₹3-3.3 crore (3-3.5% SWR). For India, always use 3-3.5% for safety.
      </p>
    </div>
  `);

  const investmentStrategyContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">Recommended FIRE Portfolio for India:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Equity (70-80%):</strong> Nifty 50, Nifty Next 50 index funds. Expected: 12% returns long-term</li>
      <li><strong>Debt (15-20%):</strong> PPF, Corporate bonds, Debt mutual funds. Stability and 7-8% returns</li>
      <li><strong>Gold/International (5-10%):</strong> Gold ETF, US index funds via LRS. Hedging and diversification</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Post-FIRE Asset Allocation:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Cash/FD (2-3 years expenses):</strong> Emergency fund for market downturns</li>
      <li><strong>Debt (30-40%):</strong> Increased debt for stability and monthly income</li>
      <li><strong>Equity (60-70%):</strong> Continue equity exposure for inflation beating</li>
    </ul>
    <p class="mt-3 text-sm text-slate-600">
      <strong>Key:</strong> Use direct index funds (avoid regular plans), rebalance annually, 
      avoid high-cost active funds (&gt;1% expense ratio), minimize taxes with LTCG strategy.
    </p>
  `);

  const commonMistakesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Using 4% SWR in India:</strong> Use 3-3.5% SWR to account for higher inflation</li>
      <li><strong>Ignoring Healthcare:</strong> Keep separate ₹15-25L health insurance + ₹5-10L emergency fund</li>
      <li><strong>Not Planning for Children:</strong> Education costs (₹30-50L per child) must be separate</li>
      <li><strong>Underestimating Inflation:</strong> Lifestyle inflation and healthcare inflation (12-15%)</li>
      <li><strong>Sequence Risk:</strong> Market crash in first 5 years post-FIRE can devastate corpus</li>
      <li><strong>No Income Diversification:</strong> Rely only on portfolio withdrawals without side income</li>
      <li><strong>Lifestyle Creep:</strong> Increasing expenses after achieving FIRE reduces corpus lifespan</li>
      <li><strong>Ignoring Taxes:</strong> LTCG tax of 12.5% on equity (above ₹1.25L/year) impacts withdrawals</li>
    </ul>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'FIRE Calculator',
            url: 'https://fincado.com/fire-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="FIRE Calculator (Financial Independence Retire Early)"
        description="Calculate your FIRE Number using Safe Withdrawal Rate. Determine monthly SIP needed for early retirement with inflation-adjusted expense planning."
        url="https://fincado.com/fire-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <FIRESchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="FIRE Calculator" />
            <LanguageToggle path="/hi/fire-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-50 to-red-100 text-orange-600">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                FIRE Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-orange-700">
                Financial Independence, Retire Early
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Calculate your <strong>FIRE Number</strong>—the exact corpus needed to retire 
                  early and live off investment returns. Plan monthly SIP, account for inflation, 
                  and achieve financial freedom decades before age 60.
                </p>
              `}
            />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="fire-top" type="leaderboard" />
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
                      TYPICAL FIRE AGE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Most FIRE followers retire
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      40-45
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        years
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      SAVINGS RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      For aggressive FIRE
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      50-70%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        of income
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      INDIA SWR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Safe withdrawal rate
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      3-3.5%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        per year
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <FIRECalculatorClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="fire-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-orange-50/50 border-orange-200 text-slate-600">
              <Info className="h-4 w-4 text-orange-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  India-Specific Adjustment
                </strong>
                This calculator uses conservative 3-3.5% Safe Withdrawal Rate
                for India (vs 4% in US) due to higher inflation and market
                volatility. Always maintain separate emergency fund and health
                insurance.
              </AlertDescription>
            </Alert>

            {/* ✅ FIRE FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    FIRE Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      FIRE Number calculation is based on Safe Withdrawal Rate
                      (SWR):
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          Core FIRE Formula
                        </div>
                        <div className="text-lg font-serif space-y-1">
                          <div>FIRE Number = Annual Expenses × (100 ÷ SWR)</div>
                          <div className="text-sm text-slate-600 mt-2">
                            or equivalently
                          </div>
                          <div>FIRE Number = Annual Expenses × Multiplier</div>
                        </div>

                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          Future Expense Calculation
                        </div>
                        <div className="text-lg font-serif">
                          Future Annual Expense = Current Expense × (1 +
                          Inflation)^Years
                        </div>

                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          Monthly SIP Required
                        </div>
                        <div className="text-lg font-serif">
                          SIP = Gap ÷ [(((1+r)^n - 1) ÷ r) × (1+r)]
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">SWR:</strong>
                        <span>
                          Safe Withdrawal Rate. 4% for US, 3-3.5% recommended
                          for India due to higher inflation
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Multiplier:</strong>
                        <span>
                          100 ÷ SWR. For 3.5% SWR, multiplier = 28.6× (need 28.6
                          times annual expenses)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Gap:</strong>
                        <span>
                          Difference between FIRE Number and Future Value of
                          Current Corpus
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">r:</strong>
                        <span>
                          Monthly return rate (Annual Return ÷ 12 ÷ 100)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">n:</strong>
                        <span>
                          Number of months until FIRE age ((FIRE Age - Current
                          Age) × 12)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> SWR assumes balanced portfolio
                        (60-70% equity, 30-40% debt) with diversification.
                        Higher equity = higher risk during market crashes.
                        Always keep 2-3 years expenses in debt/FD as emergency
                        buffer.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: 30-Year-Old Targeting FIRE at 45
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Current Age:</strong>
                        </div>
                        <div>30 years</div>

                        <div>
                          <strong>Target FIRE Age:</strong>
                        </div>
                        <div>45 years</div>

                        <div>
                          <strong>Years to FIRE:</strong>
                        </div>
                        <div>15 years (180 months)</div>

                        <div>
                          <strong>Current Annual Expense:</strong>
                        </div>
                        <div>₹6,00,000/year (₹50k/month)</div>

                        <div>
                          <strong>Current Corpus:</strong>
                        </div>
                        <div>₹20,00,000</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Future Annual Expense
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          <div>Inflation = 6% per year</div>
                          <div>Future Expense = 6,00,000 × (1.06)^15</div>
                          <div>Future Expense = ₹14,38,795/year</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate FIRE Number
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>SWR = 3.5% (conservative for India)</div>
                          <div>Multiplier = 100 ÷ 3.5 = 28.57</div>
                          <div>
                            FIRE Number = 14,38,795 × 28.57 = ₹4,11,02,000
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Calculate Current Corpus Future Value
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>Expected Return = 12% per year</div>
                          <div>Monthly Rate = 12% ÷ 12 = 1%</div>
                          <div>Months = 15 × 12 = 180 months</div>
                          <div>FV = 20,00,000 × (1.01)^180 = ₹1,19,74,000</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 4: Calculate Gap and Monthly SIP
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            Gap = 4,11,02,000 - 1,19,74,000 = ₹2,91,28,000
                          </div>
                          <div>Using SIP formula with r=1%, n=180:</div>
                          <div>
                            Factor = (((1.01)^180 - 1) ÷ 0.01) × 1.01 = 603.99
                          </div>
                          <div>
                            Monthly SIP = 2,91,28,000 ÷ 603.99 = ₹48,217
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            FIRE Summary:
                          </div>
                          <div className="flex justify-between">
                            <span>Target FIRE Number:</span>
                            <strong className="text-emerald-700">
                              ₹4.11 Crore
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Current Corpus will grow to:</span>
                            <strong className="text-slate-900">
                              ₹1.20 Crore
                            </strong>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-base">
                              <span className="font-semibold">
                                Monthly SIP Needed:
                              </span>
                              <strong className="text-emerald-700">
                                ₹48,217/month
                              </strong>
                            </div>
                          </div>
                          <div className="pt-2 text-xs text-slate-600">
                            At age 45, withdraw ₹14.39L/year (₹1.20L/month) from
                            ₹4.11 crore corpus using 3.5% SWR
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>Reality Check:</strong> With ₹48k/month SIP,
                          your total monthly investment is significant.
                          Consider: Can you save this consistently for 15 years?
                          What if expenses increase? Always keep emergency fund
                          separate!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SWR Comparison */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Impact of Safe Withdrawal Rate (₹10L Annual Expense)
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="p-3 bg-white rounded border border-purple-200">
                        <div className="font-mono text-sm space-y-1">
                          <div>4.0% SWR (US Standard): ₹2.50 Crore corpus</div>
                          <div>
                            3.5% SWR (India Conservative): ₹2.86 Crore corpus
                          </div>
                          <div>3.0% SWR (Ultra Safe): ₹3.33 Crore corpus</div>
                          <div className="mt-2 font-semibold text-purple-700">
                            Lower SWR = Higher safety, but needs larger corpus
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    FIRE calculations assume disciplined investing, no major
                    expenses (like home purchase or child education mixed with
                    FIRE corpus), and ability to adjust lifestyle during market
                    downturns. Always plan conservatively.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Plan systematic investments for FIRE
                  </strong>
                  <Link
                    href="/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      Use SIP Calculator to plan monthly investments for FIRE
                      goal
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
                  What is the FIRE Movement?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Types of FIRE: Which One Suits You?
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead>FIRE Type</TableHead>
                        <TableHead>Lifestyle</TableHead>
                        <TableHead>Monthly Expense</TableHead>
                        <TableHead>Corpus Needed (3.5% SWR)</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Lean FIRE</TableCell>
                        <TableCell>Frugal, minimalist living</TableCell>
                        <TableCell>₹25-30k/month</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹85L-₹1Cr
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Regular FIRE
                        </TableCell>
                        <TableCell>Standard middle-class</TableCell>
                        <TableCell>₹50-70k/month</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹1.7-₹2.4Cr
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Fat FIRE</TableCell>
                        <TableCell>Luxury lifestyle</TableCell>
                        <TableCell>₹1L+/month</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹3.5Cr+
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Barista FIRE
                        </TableCell>
                        <TableCell>Part-time work + investments</TableCell>
                        <TableCell>₹40-50k/month</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹1.2-₹1.5Cr
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Coast FIRE
                        </TableCell>
                        <TableCell>Work until 60, no new savings</TableCell>
                        <TableCell>Varies</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Lower initial corpus
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Most Popular in India:</strong> Regular FIRE with
                    ₹1.7-2.5 crore corpus for ₹50-70k/month expenses. Lean FIRE
                    requires extreme frugality difficult to maintain long-term.
                    Fat FIRE needs ₹5+ crore corpus for ₹1.5L+/month luxury
                    lifestyle.
                  </p>
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="fire-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Core FIRE Concepts
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={coreConceptsContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Safe Withdrawal Rate (SWR) for India
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={swrContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Investment Strategy for FIRE in India
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={investmentStrategyContent} />
                </div>
              </section>

              {/* Comparison Table: FIRE vs Traditional Retirement */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  FIRE vs Traditional Retirement
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aspect</TableHead>
                        <TableHead>FIRE (Early Retirement)</TableHead>
                        <TableHead>Traditional (60+ Retirement)</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Retirement Age
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          35-45 years
                        </TableCell>
                        <TableCell>60-65 years</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Savings Rate
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          50-70% of income
                        </TableCell>
                        <TableCell>10-20% of income</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Time to Retire
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          10-20 years
                        </TableCell>
                        <TableCell>40-45 years</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Lifestyle</TableCell>
                        <TableCell>Frugal during accumulation</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Normal spending
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Retirement Duration
                        </TableCell>
                        <TableCell>40-50 years (higher risk)</TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          20-25 years (lower risk)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Investment Focus
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Index funds, low-cost
                        </TableCell>
                        <TableCell>EPF, PPF, conservative</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Work Philosophy
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Work optional (by choice)
                        </TableCell>
                        <TableCell>Work necessary (till 60)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Risk</TableCell>
                        <TableCell>
                          Higher (long retirement, market risk)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Lower (pension, gratuity, short retirement)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Key Trade-off:</strong> FIRE gives you 20+ extra
                    years of freedom but requires extreme discipline, frugal
                    living for 10-15 years, and higher risk tolerance.
                    Traditional retirement is safer but you work until 60 and
                    have less time to enjoy freedom.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Common FIRE Mistakes to Avoid
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={commonMistakesContent} />
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use This FIRE Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter your current age and target FIRE age (when you want
                    financial independence).
                  </li>
                  <li>
                    Input current annual living expenses (will be adjusted for
                    inflation automatically).
                  </li>
                  <li>
                    Enter current savings/corpus across all investments (mutual
                    funds, stocks, EPF, PPF, FDs).
                  </li>
                  <li>
                    Adjust advanced parameters: Inflation (6%), Expected Return
                    (12% for equity-heavy), SWR (3-3.5% for India).
                  </li>
                  <li>
                    Review FIRE Number (target corpus needed based on SWR) and
                    future expenses.
                  </li>
                  <li>
                    Check monthly SIP required to bridge gap between current
                    corpus and FIRE goal.
                  </li>
                  <li>
                    View timeline visualization showing years to FIRE and
                    progress percentage.
                  </li>
                  <li>
                    Save calculation for tracking, share with family/advisor, or
                    compare different scenarios.
                  </li>
                </ol>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Financial Independence Tools
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/retirement-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700 text-2xl">
                            🏖️
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-purple-700 mb-1">
                              Retirement Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate traditional retirement corpus for age 60
                              with comprehensive planning.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-purple-700">
                              <span>Plan Retirement</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/sip-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            📈
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              SIP Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate systematic investment plan returns for
                              building FIRE corpus.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate SIP</span>
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
              <AdSlot id="fire-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="fire-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="fire-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="fire-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
