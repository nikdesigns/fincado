import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import NPSClient from './NPSClient';
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
import { NPSSchemas } from '@/components/schemas/NPSSchemas';
import { Info, TrendingUp, ArrowRight, Shield, Percent } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'NPS Calculator 2026 – Calculate National Pension System Returns',
  description:
    'Calculate NPS retirement corpus, lump sum withdrawal, and monthly pension with our free NPS calculator. Plan investments with tax benefits under Section 80C and 80CCD(1B).',
  keywords: [
    'NPS Calculator',
    'National Pension System Calculator',
    'NPS Return Calculator',
    'NPS Pension Calculator',
    'NPS Withdrawal Calculator',
    'NPS Tax Benefit Calculator',
    'NPS Maturity Calculator',
    'Tier 1 NPS Calculator',
    'NPS Investment Calculator',
    'NPS Annuity Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/nps-calculator/',
  },
  openGraph: {
    title: 'NPS Calculator 2026 – Plan Your Pension with Tax Benefits',
    description:
      'Free NPS calculator to calculate retirement corpus, tax-free lump sum (60%), and monthly pension (40%). Plan with 80C + 80CCD(1B) benefits.',
    url: 'https://fincado.com/nps-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-nps-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado NPS Calculator',
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

export default function NPSCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>National Pension System (NPS)</strong> is a government-sponsored voluntary 
      retirement savings scheme designed to provide pension income post-retirement. Launched 
      in 2004, NPS offers market-linked returns with the <strong>lowest expense ratio</strong> 
      (0.01%) among all investment products in India.
    </p>
    <p class="mt-4">
      NPS follows a <strong>60:40 withdrawal rule</strong> at retirement age 60: withdraw up to 
      60% as tax-free lump sum, and invest remaining 40% in annuity for lifelong monthly pension. 
      It offers <strong>additional tax benefit of ₹50,000</strong> under Section 80CCD(1B) over 
      and above the ₹1.5 lakh limit under Section 80C.
    </p>
  `);

  const keyFeaturesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Low Cost:</strong> Expense ratio of 0.01% - lowest among all investment products</li>
      <li><strong>Tax Benefits:</strong> ₹1.5L under 80C + ₹50k under 80CCD(1B) = Total ₹2L deduction</li>
      <li><strong>Market-Linked Returns:</strong> Choose from equity (E), corporate bonds (C), government securities (G)</li>
      <li><strong>Flexible Allocation:</strong> Auto choice or Active choice with rebalancing options</li>
      <li><strong>Portable:</strong> Transfer NPS account across jobs and locations seamlessly</li>
      <li><strong>60:40 Rule:</strong> 60% lump sum (tax-free) + 40% annuity (monthly pension)</li>
      <li><strong>Government Guarantee:</strong> Regulated by PFRDA - safe and transparent</li>
      <li><strong>Two Tiers:</strong> Tier 1 (retirement with lock-in) + Tier 2 (flexible savings)</li>
    </ul>
  `);

  const npsTypesContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">Tier 1 Account (Retirement Account):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Mandatory retirement account with lock-in till age 60</li>
      <li>Eligible for full tax benefits (80C + 80CCD(1B))</li>
      <li>Minimum ₹500/year to keep account active</li>
      <li>Withdrawal only at retirement or under specific conditions (medical emergency, disability)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Tier 2 Account (Voluntary Savings):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Optional voluntary savings account without lock-in</li>
      <li>No tax benefits (except for government employees with conditions)</li>
      <li>Can be opened only if Tier 1 account exists</li>
      <li>Withdraw anytime without restrictions - acts like liquid fund</li>
    </ul>
    <p class="mt-4 font-semibold text-blue-700">
      Most investors focus on Tier 1 for retirement planning due to tax benefits and disciplined saving.
    </p>
  `);

  const investmentChoicesContent = autoLinkContent(`
    <p>
      NPS offers two investment strategies with three asset classes:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">Asset Classes:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Asset E (Equity):</strong> Stocks and equity mutual funds - highest returns, highest risk</li>
      <li><strong>Asset C (Corporate Bonds):</strong> Corporate debt securities - moderate returns, moderate risk</li>
      <li><strong>Asset G (Government Securities):</strong> G-Secs, T-Bills - lowest returns, lowest risk</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">1. Auto Choice (Lifecycle Based):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Aggressive:</strong> Up to 75% equity allocation for young investors (age 18-35)</li>
      <li><strong>Moderate:</strong> Up to 50% equity allocation for middle-aged (age 35-50)</li>
      <li><strong>Conservative:</strong> Up to 25% equity allocation for near-retirement (age 50-60)</li>
      <li>Automatic rebalancing as you age - equity reduces, debt increases</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. Active Choice (Self-Managed):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>Choose your own allocation across E, C, G assets</li>
      <li>Maximum 75% in equity (Asset E) allowed</li>
      <li>Rebalance manually once per financial year</li>
      <li>Best for experienced investors who understand market risks</li>
    </ul>
  `);

  const taxBenefitsContent = autoLinkContent(`
    <p>
      NPS offers the <strong>highest tax deduction limit</strong> among all retirement products in India:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">1. Section 80C Deduction (₹1.5 Lakh):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>NPS Tier 1 contributions eligible up to ₹1.5 lakh</li>
      <li>Shared with PPF, ELSS, life insurance, home loan principal, etc.</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">2. Section 80CCD(1B) Deduction (₹50,000):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Additional</strong> ₹50,000 deduction exclusively for NPS</li>
      <li>Over and above ₹1.5 lakh limit under Section 80C</li>
      <li>Total deduction possible: ₹2 lakh (₹1.5L + ₹50k)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">3. Employer Contribution (80CCD(2)):</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>14% of basic salary (Central Govt) or 10% (Pvt sector) - no limit</li>
      <li>Not counted under ₹1.5L limit - completely separate benefit</li>
      <li>Total tax saving potential: ₹2L + employer contribution</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">4. Withdrawal Tax Treatment:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>60% Lump Sum:</strong> Completely tax-free at retirement</li>
      <li><strong>40% Annuity:</strong> Monthly pension taxable as per income slab</li>
      <li>If withdraw before 60 due to emergency: Only 20% tax-free, 80% annuity mandatory</li>
    </ul>
    <div class="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
      <p class="text-sm text-slate-700">
        <strong>Tax Saving Example:</strong> Investing ₹2 lakh/year at 30% tax bracket saves 
        ₹60,000 in taxes annually. Over 30 years, that's ₹18 lakh tax savings!
      </p>
    </div>
  `);

  const faqItems = [
    {
      id: 'nps-faq-1',
      question: 'What is National Pension System (NPS)?',
      answer:
        'NPS is a government-sponsored voluntary retirement savings scheme regulated by PFRDA. It offers market-linked returns with lowest expense ratio (0.01%), tax benefits up to ₹2 lakh (80C + 80CCD(1B)), and 60:40 withdrawal rule at retirement age 60.',
    },
    {
      id: 'nps-faq-2',
      question: 'What are the tax benefits of NPS?',
      answer:
        'NPS offers triple tax benefits: (1) ₹1.5L deduction under 80C, (2) Additional ₹50k under 80CCD(1B), (3) Employer contribution (no limit) under 80CCD(2). Total possible deduction: ₹2L + employer. 60% lump sum withdrawal is tax-free at retirement.',
    },
    {
      id: 'nps-faq-3',
      question: 'What is 60:40 withdrawal rule in NPS?',
      answer:
        'At retirement (age 60), you must withdraw minimum 60% as lump sum (tax-free) and invest remaining 40% in annuity for monthly pension (taxable). You can choose to invest more than 40% in annuity for higher pension, but maximum 60% lump sum is allowed.',
    },
    {
      id: 'nps-faq-4',
      question: 'Can I withdraw NPS before 60?',
      answer:
        'Premature withdrawal is allowed only in specific cases: (1) Critical illness/disability - withdraw up to 25%, (2) After 10 years - withdraw 25% for limited purposes (children education, house purchase, medical). At exit before 60, only 20% is tax-free, 80% must go to annuity.',
    },
    {
      id: 'nps-faq-5',
      question: 'NPS vs PPF - which is better?',
      answer:
        'NPS offers higher returns (10-12% equity-based) vs PPF (7.1% fixed). NPS has extra ₹50k tax benefit (80CCD(1B)) not available in PPF. However, PPF is 100% tax-free at maturity while NPS pension is taxable. Best strategy: Use both - PPF for safety, NPS for growth + extra tax benefit.',
    },
    {
      id: 'nps-faq-6',
      question: 'What is the minimum investment in NPS?',
      answer:
        'Minimum ₹500 per year (or ₹42/month) to keep Tier 1 account active. There is no maximum limit. However, to claim full tax benefit of ₹2 lakh (80C + 80CCD(1B)), invest ₹2 lakh annually. Tier 2 account requires minimum ₹1,000 to open and ₹250 per transaction.',
    },
    {
      id: 'nps-faq-7',
      question: 'Which NPS fund manager is best?',
      answer:
        'As of 2026, top NPS fund managers by returns: SBI Pension (12-13% in equity), HDFC Pension (11-12%), LIC Pension (10-11%), UTI Retirement (10-11%). However, choose based on long-term consistency, not short-term returns. You can switch fund managers once per year for free.',
    },
    {
      id: 'nps-faq-8',
      question: 'Can I have both NPS and EPF?',
      answer:
        'Yes, absolutely! EPF is mandatory for salaried employees, while NPS is voluntary. Having both is smart: EPF gives 8.25% safe returns, NPS gives 10-12% market-linked returns + extra ₹50k tax benefit (80CCD(1B)). Together they create a balanced retirement portfolio.',
    },
    {
      id: 'nps-faq-9',
      question: 'What happens to NPS after death?',
      answer:
        'If subscriber dies before retirement, 100% corpus goes to nominee (no 40% annuity requirement). Nominee can choose to: (1) Withdraw full amount (tax-free), or (2) Continue NPS account till original retirement age. If death after retirement, annuity continues to spouse or family as per annuity terms.',
    },
    {
      id: 'nps-faq-10',
      question: 'Is NPS worth it for self-employed/freelancers?',
      answer:
        'Yes! Self-employed can claim full ₹2L deduction (80C + 80CCD(1B)) + 10% of gross income as business expense. NPS fills retirement planning gap for those without EPF. Choose aggressive allocation (75% equity) if young for maximum growth. Low 0.01% charges make it most cost-effective retirement product.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'NPS Calculator',
            url: 'https://fincado.com/nps-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="NPS (National Pension System) Calculator"
        description="Calculate NPS retirement corpus, tax-free lump sum withdrawal (60%), and monthly pension (40%) with market-linked returns and tax benefits."
        url="https://fincado.com/nps-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <NPSSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="NPS Calculator" />
            <LanguageToggle path="/hi/nps-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-teal-100 text-emerald-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                NPS Calculator (National Pension System)
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                Calculate pension corpus with ₹2 lakh tax benefits
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="nps-top" type="leaderboard" />
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
                      TAX BENEFIT
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      80C + 80CCD(1B) deduction
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹2L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /year
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      EXPENSE RATIO
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Lowest fund management cost
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      0.01%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        only
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      WITHDRAWAL RULE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Lump sum + Annuity split
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      60:40
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        ratio
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <NPSClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="nps-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Tax Saving Tip
                </strong>
                NPS offers additional ₹50,000 tax deduction under Section
                80CCD(1B) over and above ₹1.5 lakh limit of Section 80C. This
                means total ₹2 lakh deduction possible - highest among all
                retirement products.
              </AlertDescription>
            </Alert>

            {/* ✅ NPS FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    NPS Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      NPS corpus calculation uses the standard SIP future value
                      formula with 60:40 withdrawal rule applied at retirement:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold text-slate-700 mb-2">
                          Total Corpus at Retirement
                        </div>
                        <div className="text-lg font-serif">
                          FV = P × [(1 + r)<sup>n</sup> - 1] / r × (1 + r)
                        </div>
                        <div className="text-base font-semibold text-slate-700 mt-4 mb-2">
                          Withdrawal Distribution
                        </div>
                        <div className="text-lg font-serif space-y-1">
                          <div>Lump Sum = FV × 0.60 (Tax-Free)</div>
                          <div>Annuity Corpus = FV × 0.40 (For Pension)</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          FV
                        </span>
                        <span>
                          = Future value of NPS corpus at retirement age 60
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          P
                        </span>
                        <span>
                          = Monthly contribution/investment amount in ₹
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Monthly return rate (annual rate ÷ 12 ÷ 100)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-16 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = Total months of investment [(60 - current age) × 12]
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>60:40 Rule:</strong> At retirement, minimum 60%
                        can be withdrawn as tax-free lump sum. Remaining 40%
                        must be invested in annuity with insurance company for
                        lifelong monthly pension (taxable).
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: 30-Year-Old Investing ₹10,000/Month
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
                          <strong>Investment Period:</strong>
                        </div>
                        <div>30 years (360 months)</div>

                        <div>
                          <strong>Monthly Investment (P):</strong>
                        </div>
                        <div>₹10,000</div>

                        <div>
                          <strong>Expected Return:</strong>
                        </div>
                        <div>10% p.a.</div>

                        <div>
                          <strong>Annuity Rate:</strong>
                        </div>
                        <div>6% p.a.</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Monthly Return Rate
                        </strong>
                        <div className="ml-4 font-mono text-sm">
                          r = 10% ÷ 12 ÷ 100 = 0.00833
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate Total Corpus at Age 60
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV = 10,000 × [(1.00833)<sup>360</sup> - 1] /
                            0.00833 × 1.00833
                          </div>
                          <div>
                            FV = 10,000 × [19.837 - 1] / 0.00833 × 1.00833
                          </div>
                          <div>FV = 10,000 × 2262.04 × 1.00833</div>
                          <div>FV ≈ ₹2,28,08,400</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Apply 60:40 Withdrawal Rule
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            Lump Sum (60%) = 2,28,08,400 × 0.60 = ₹1,36,85,040
                          </div>
                          <div>
                            Annuity Corpus (40%) = 2,28,08,400 × 0.40 =
                            ₹91,23,360
                          </div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 4: Calculate Monthly Pension from Annuity
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>Monthly Pension = 91,23,360 × (6% ÷ 12)</div>
                          <div>Monthly Pension = 91,23,360 × 0.005</div>
                          <div>Monthly Pension ≈ ₹45,617</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold text-slate-700 mb-2">
                            Retirement Benefits Summary:
                          </div>
                          <div className="flex justify-between">
                            <span>Total Investment (30 years):</span>
                            <strong className="text-slate-900">
                              ₹36,00,000
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Corpus at 60:</span>
                            <strong className="text-blue-700">
                              ₹2,28,08,400
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Returns:</span>
                            <strong className="text-emerald-700">
                              ₹1,92,08,400
                            </strong>
                          </div>
                          <div className="border-t pt-2 mt-2 space-y-1">
                            <div className="flex justify-between text-base">
                              <span className="font-semibold">
                                Lump Sum (Tax-Free):
                              </span>
                              <strong className="text-emerald-700">
                                ₹1,36,85,040
                              </strong>
                            </div>
                            <div className="flex justify-between text-base">
                              <span className="font-semibold">
                                Monthly Pension (Lifelong):
                              </span>
                              <strong className="text-blue-700">₹45,617</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-slate-600">
                          <strong>Tax Savings:</strong> Investing ₹1.2L annually
                          saves ₹36,000/year in taxes (at 30% bracket). Over 30
                          years, total tax saving = ₹10.8 lakh!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Investment vs Returns */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      Total Invested vs Total Returns
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <div className="p-3 bg-white rounded border border-purple-200">
                        <div className="font-mono text-sm space-y-1">
                          <div>Total Invested = Monthly SIP × Total Months</div>
                          <div>Total Invested = ₹10,000 × 360 = ₹36,00,000</div>
                          <div className="mt-2">
                            Total Returns = Total Corpus - Total Invested
                          </div>
                          <div>
                            Total Returns = ₹2,28,08,400 - ₹36,00,000 =
                            ₹1,92,08,400
                          </div>
                          <div className="mt-2 font-semibold text-emerald-700">
                            Returns = 533% of investment (5.3x growth!)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    NPS returns are market-linked and depend on asset allocation
                    (Equity/Corporate/Government). Expected returns: Aggressive
                    (10-12%), Moderate (8-10%), Conservative (7-9%). Actual
                    returns may vary.
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
                    Want to plan complete retirement?
                  </strong>
                  <Link
                    href="/retirement-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      Use Retirement Calculator for comprehensive planning
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
                  What is National Pension System (NPS)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Features of NPS
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={keyFeaturesContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="nps-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS Account Types: Tier 1 vs Tier 2
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={npsTypesContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS Investment Choices & Asset Allocation
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={investmentChoicesContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS vs Other Retirement Products
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">NPS</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">EPF</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Expected Returns
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          10-12% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% p.a.
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8.25% p.a.
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax Deduction
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          ₹2L (80C + 80CCD(1B))
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L (80C)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1.5L (80C)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Maturity Taxation
                        </TableCell>
                        <TableCell className="text-slate-700">
                          60% tax-free, 40% taxable
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          100% tax-free (EEE)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          100% tax-free (EEE)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Lock-in Period
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Till age 60
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Till retirement
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Expense Ratio
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          0.01%
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          0% (No charges)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          0% (No charges)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Eligibility
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          All citizens 18-70
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          All Indian citizens
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Salaried only
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Investment Type
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Market-linked (E/C/G)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Fixed (Govt bonds)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Fixed (EPF + Debt)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Pension Feature
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (40% annuity)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          No (lump sum only)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Optional (EPS)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Best For
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Tax saving + growth
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Safety + tax-free
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Mandatory for salaried
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Verdict:</strong> NPS is best for additional
                    tax savings (₹50k extra under 80CCD(1B)) and higher
                    market-linked returns. Combine with PPF/EPF for balanced
                    retirement portfolio - use PPF for safety, NPS for growth.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Complete Tax Benefits of NPS
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxBenefitsContent} />
                </div>
              </section>

              {/* How to Open */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Open NPS Account
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    <strong>Online via eNPS Portal:</strong> Visit
                    enps.nsdl.com, click &quot;Open Your NPS Account&quot;,
                    provide Aadhaar, PAN, and bank details for instant account
                    opening.
                  </li>
                  <li>
                    <strong>Through Bank:</strong> Visit any bank branch (SBI,
                    HDFC, ICICI, Axis, etc.), fill NPS form with KYC documents,
                    pay minimum ₹500 to activate.
                  </li>
                  <li>
                    <strong>Via POP-SP (Point of Presence):</strong> Approach
                    authorized intermediaries like Karvy, CAMS, NSDL for
                    assisted account opening.
                  </li>
                  <li>
                    <strong>Choose Investment Strategy:</strong> Select Auto
                    Choice (age-based) or Active Choice (manual allocation) and
                    fund manager.
                  </li>
                  <li>
                    <strong>Receive PRAN:</strong> Get Permanent Retirement
                    Account Number (PRAN) via email/SMS - use this for all
                    future contributions.
                  </li>
                  <li>
                    <strong>Set Up Auto-Debit:</strong> Link bank account for
                    monthly/quarterly SIP to automate contributions.
                  </li>
                </ol>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this NPS Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter monthly investment amount (minimum ₹500, recommended
                    ₹5,000-₹15,000).
                  </li>
                  <li>
                    Input current age (18-59 years) - retirement age is fixed at
                    60.
                  </li>
                  <li>
                    Set expected return rate (5-15%) based on asset allocation:
                    Aggressive (10-12%), Moderate (8-10%), Conservative (7-9%).
                  </li>
                  <li>
                    Click <strong>&quot;Show Advanced Options&quot;</strong> to
                    adjust annuity rate (4-10%, typically 6%) for pension
                    calculation.
                  </li>
                  <li>
                    View total corpus at retirement age 60, total investment,
                    and returns.
                  </li>
                  <li>
                    Check 60:40 withdrawal split: tax-free lump sum and monthly
                    pension amount.
                  </li>
                  <li>
                    Review annuity corpus (40%) that will generate lifelong
                    monthly pension.
                  </li>
                  <li>
                    Save plan or share on WhatsApp for future reference and
                    family discussion.
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Retirement Planning Tools
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/retirement-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🏖️
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              Retirement Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate complete retirement corpus needed for
                              comfortable life.
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

                  <Link href="/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              PPF Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate Public Provident Fund with 100% tax-free
                              returns.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                              <span>Calculate PPF</span>
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
              <AdSlot id="nps-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="nps-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="nps-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="nps-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
