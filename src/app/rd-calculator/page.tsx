import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RDClient from './RDClient';
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
import { RDSchemas } from '@/components/schemas/RDSchemas';
import {
  Info,
  Repeat,
  TrendingUp,
  ArrowRight,
  CalendarCheck,
} from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

const updatedLabel = getCurrentMonthYearLabel();

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title:
    'RD Calculator 2026 – Recurring Deposit Maturity & Interest Calculator',
  description:
    'Calculate RD maturity amount with quarterly compounding. Compare RD interest rates of SBI, HDFC, ICICI, Post Office. Check TDS rules, senior citizen rates, and RD vs SIP vs FD returns for 2026.',
  keywords: [
    'RD Calculator',
    'Recurring Deposit Calculator',
    'RD Interest Calculator',
    'RD Maturity Calculator',
    'RD Interest Rates 2026',
    'Post Office RD Calculator',
    'RD vs SIP',
    'RD vs FD',
    'Recurring Deposit Tax',
    'Monthly Savings Calculator',
    'Senior Citizen RD Rates',
    'Bank RD Rates India',
  ],
  alternates: {
    canonical: 'https://fincado.com/rd-calculator/',
  },
  openGraph: {
    title: 'RD Calculator 2026 – Recurring Deposit Maturity Calculator',
    description:
      'Free tool to calculate RD maturity amount with accurate quarterly compounding. Compare bank rates, TDS calculation, and senior citizen benefits.',
    url: 'https://fincado.com/rd-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-rd-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado RD Calculator',
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

export default function RDPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Recurring Deposit (RD)</strong> is a term deposit offered by banks and <strong>Post Offices</strong> 
      that allows individuals to deposit a fixed amount every month for a pre-defined tenure. 
      It is ideal for salaried people who want to save a portion of their income regularly.
    </p>
    <p class="mt-4">
      Unlike a <strong>Fixed Deposit (FD)</strong> where a lump sum is required, RD brings the 
      discipline of regular savings with interest rates similar to FDs. Perfect for building an emergency 
      fund or saving for specific goals like buying a car or funding a vacation.
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Minimum Tenure:</strong> 6 months (varies by bank)</li>
      <li><strong>Maximum Tenure:</strong> Up to 10 years</li>
      <li><strong>Minimum Monthly Deposit:</strong> ₹100-₹500 (varies by bank)</li>
      <li><strong>Compounding:</strong> Quarterly (most banks)</li>
      <li><strong>Premature Withdrawal:</strong> Allowed with penalty (0.5-1%)</li>
      <li><strong>Loan Facility:</strong> Available up to 90% of RD balance</li>
      <li><strong>Auto-Debit:</strong> Monthly amount deducted automatically from savings account</li>
    </ul>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Disciplined Savings:</strong> Forces you to save a fixed amount every month without fail.</li>
      <li><strong>Guaranteed Returns:</strong> Interest rates are locked at the time of opening, unaffected by market volatility.</li>
      <li><strong>Flexible Tenure:</strong> Choose tenure from 6 months to 10 years based on your goals.</li>
      <li><strong>Liquidity:</strong> Can be closed prematurely in emergencies (with minimal penalty).</li>
      <li><strong>Loan Against RD:</strong> Avail a loan up to 90% of your RD balance at lower interest rates.</li>
      <li><strong>Senior Citizen Benefit:</strong> Additional 0.25-0.5% interest for investors above 60 years.</li>
      <li><strong>Automated Investment:</strong> Set and forget with auto-debit from savings account.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Interest earned on Recurring Deposits is <strong>fully taxable</strong> as per your income tax slab. 
      It is added to your annual income under "Income from Other Sources".
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>TDS Deduction:</strong> Banks deduct 10% TDS if interest exceeds ₹40,000 in a year (₹50,000 for Senior Citizens).</li>
      <li><strong>Form 15G/15H:</strong> Submit these forms to avoid TDS if your total income is below the taxable limit.</li>
      <li><strong>Higher TDS:</strong> 20% TDS if PAN is not provided to the bank.</li>
      <li><strong>ITR Filing:</strong> You must declare RD interest in your Income Tax Return even if TDS is not deducted.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'rd-faq-1',
      question: 'Is RD interest taxable?',
      answer:
        'Yes. Interest earned on a Recurring Deposit is added to your total income and taxed as per your income slab. Banks deduct 10% TDS if interest exceeds ₹40,000 in a financial year (₹50,000 for senior citizens).',
    },
    {
      id: 'rd-faq-2',
      question: 'Can I increase my monthly installment later?',
      answer:
        'No. In a standard RD, the monthly installment amount is fixed at the time of opening. However, some banks offer Flexi RD or iWish RD products where you can vary the deposit amount. You can also open multiple RDs with different amounts.',
    },
    {
      id: 'rd-faq-3',
      question: 'What is the minimum tenure for an RD?',
      answer:
        'The minimum RD tenure is usually 6 months, while the maximum can go up to 10 years, depending on the bank. Post Office RD has a fixed tenure of 5 years.',
    },
    {
      id: 'rd-faq-4',
      question: 'What happens if I miss an RD installment?',
      answer:
        'Most banks charge a penalty of ₹1-₹5 per ₹100 of monthly deposit for each missed installment. If you miss 4 consecutive installments, the RD account may be closed prematurely. Some banks offer grace periods of 15-30 days.',
    },
    {
      id: 'rd-faq-5',
      question: 'RD vs SIP - Which is better for long-term wealth?',
      answer:
        'RD offers guaranteed returns (6.5-7.5%) with zero risk, making it ideal for short-term goals (1-5 years). SIP in equity mutual funds offers potentially higher returns (12-15%) but comes with market risk. For long-term wealth creation (10+ years), SIP typically outperforms RD after adjusting for inflation.',
    },
    {
      id: 'rd-faq-6',
      question: 'Can I get a loan against my RD?',
      answer:
        'Yes, most banks offer loans against RDs up to 90-95% of the deposit value. The interest rate is typically 1-2% above the RD rate. This is better than premature withdrawal as your RD continues to earn interest.',
    },
    {
      id: 'rd-faq-7',
      question: 'Is Post Office RD better than bank RD?',
      answer:
        'Post Office RD offers slightly lower interest (6.7% currently) but has a fixed 5-year tenure and is backed by the Government of India. Bank RDs offer more flexibility in tenure (6 months to 10 years) and may have higher rates (up to 7.5%). Choose based on your priority: safety (Post Office) vs higher returns (Banks).',
    },
    {
      id: 'rd-faq-8',
      question: 'What is the senior citizen RD rate benefit?',
      answer:
        'Senior citizens (60+ years) typically get an additional 0.25% to 0.5% interest on RDs depending on the bank. Some banks offer up to 0.75% extra. This benefit is available on most RD schemes across all tenures.',
    },
    {
      id: 'rd-faq-9',
      question: 'Can I close my RD before maturity?',
      answer:
        'Yes, premature withdrawal is allowed in most RDs. However, banks charge a penalty of 0.5-1% on the interest rate. The penalty varies by bank and the time period for which the RD has been held. Some banks waive penalties for medical emergencies.',
    },
    {
      id: 'rd-faq-10',
      question: 'How is RD different from SIP?',
      answer:
        'RD is a bank deposit product with guaranteed returns and quarterly compounding. SIP is a mutual fund investment method with market-linked returns. RD is safer but offers lower returns (6.5-7.5%), while SIP can generate higher returns (12-15%) but carries market risk. RD is ideal for short-term goals, SIP for long-term wealth creation.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'RD Calculator',
            url: 'https://fincado.com/rd-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Recurring Deposit (RD) Calculator"
        description="Calculate the maturity value of your Recurring Deposits with quarterly compounding interest."
        url="https://fincado.com/rd-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <RDSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Recurring Deposit (RD) Calculator" />
            <LanguageToggle path="/hi/rd-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-emerald-100 text-lime-700">
              <Repeat className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Recurring Deposit Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                Grow disciplined monthly savings with guaranteed returns
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="rd-top" type="leaderboard" />
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
                      AVERAGE RD RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Major banks (1-3 years)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6.7–7.5%
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
                      POST OFFICE RD
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      5-year tenure (Government backed)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6.7%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      UPDATED DATA
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Bank rates as of
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <RDClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="rd-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Investment Tip
                </strong>
                RD works best for short to medium-term goals (1-5 years) like
                saving for a car down payment, vacation, or emergency fund. For
                long-term wealth creation (10+ years), consider SIP in equity
                mutual funds for potentially higher returns.
              </AlertDescription>
            </Alert>

            {/* ✅ RD FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    RD Maturity Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      RD interest is compounded quarterly. Since deposits are
                      made monthly, each installment earns interest for a
                      different period:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        M = P × &#123;[(1 + r/n)<sup>n×t</sup> - 1] ÷
                        (r/n)&#125; × (1 + r/n)
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          M
                        </span>
                        <span>= Maturity amount (Total value at the end)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= Monthly deposit amount (in ₹)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Annual interest rate (as decimal, e.g., 0.07 for 7%)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = Compounding frequency per year (4 for quarterly)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          t
                        </span>
                        <span>= Tenure in years</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> This formula is similar to the
                        Future Value of Annuity formula but adjusted for
                        quarterly compounding with monthly deposits.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: RD Calculation (Quarterly Compounding)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Monthly Deposit (P):</strong>
                        </div>
                        <div>₹5,000</div>

                        <div>
                          <strong>Interest Rate (r):</strong>
                        </div>
                        <div>7% p.a.</div>

                        <div>
                          <strong>Tenure (t):</strong>
                        </div>
                        <div>3 years (36 months)</div>

                        <div>
                          <strong>Compounding (n):</strong>
                        </div>
                        <div>Quarterly (4 times/year)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Convert Rate to Decimal
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 7 ÷ 100 = 0.07
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate (1 + r/n)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          1 + (0.07 ÷ 4) = 1 + 0.0175 = 1.0175
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Calculate (1 + r/n)<sup>n×t</sup>
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1.0175)<sup>4×3</sup> = (1.0175)<sup>12</sup>
                          </div>
                          <div>≈ 1.2314</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 4: Apply RD Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            M = 5,000 × &#123;(1.2314 - 1) ÷ 0.0175&#125; ×
                            1.0175
                          </div>
                          <div>M = 5,000 × (0.2314 ÷ 0.0175) × 1.0175</div>
                          <div>M = 5,000 × 13.22 × 1.0175</div>
                          <div>M ≈ 5,000 × 13.45</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Approx. Maturity Value:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹1,97,271
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Total Deposited (36 months):</span>
                          <strong>₹1,80,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Earned:</span>
                          <strong className="text-green-700">₹17,271</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Effective Gain:</span>
                          <strong className="text-lime-700">9.6%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Method */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" />
                      Alternative: Month-by-Month Calculation
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        Each monthly installment earns interest for different
                        periods:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li>1st installment earns interest for 36 months</li>
                        <li>2nd installment earns interest for 35 months</li>
                        <li>3rd installment earns interest for 34 months</li>
                        <li>... and so on</li>
                        <li>36th installment earns interest for 1 month</li>
                      </ul>
                      <p className="text-xs text-slate-600 mt-2">
                        The formula above simplifies this complex calculation
                        using the geometric progression sum formula.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Important Points
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        Most Indian banks compound RD interest quarterly (every
                        3 months).
                      </li>
                      <li>
                        Missing installments can attract penalties and reduce
                        final maturity amount.
                      </li>
                      <li>
                        Premature withdrawal penalty typically reduces interest
                        rate by 0.5-1%.
                      </li>
                      <li>
                        TDS of 10% is deducted if annual interest exceeds
                        ₹40,000 (₹50,000 for seniors).
                      </li>
                      <li>
                        Senior citizens get additional 0.25-0.5% interest on
                        most RDs.
                      </li>
                      <li>
                        Post Office RD has a fixed 5-year tenure with 6.7%
                        interest rate.
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This calculator uses the standard compound interest formula
                    for recurring deposits with quarterly compounding. Actual
                    returns may vary slightly due to bank-specific policies.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    Looking for market-linked returns?
                  </strong>
                  <Link
                    href="/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      Compare with SIP Calculator for higher growth potential
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
                  What is a Recurring Deposit (RD)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Features of Recurring Deposits
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={featuresContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="rd-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Benefits of Recurring Deposits
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={benefitsContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  RD vs FD vs SIP Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">RD</TableHead>
                        <TableHead className="text-left">FD</TableHead>
                        <TableHead className="text-left">SIP</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Returns
                        </TableCell>
                        <TableCell className="font-semibold text-lime-600">
                          6.7% – 7.5%
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6.5% – 7.5%
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          12% – 15%
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Investment Mode
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Monthly
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Lump Sum
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Monthly
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Risk Level
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Zero Risk
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Zero Risk
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Market Risk
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Ideal For
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Short-term goals (1-5 years)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Lump sum parking
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Long-term wealth (10+ years)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Liquidity
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Medium (with penalty)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          High (with penalty)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          High (can redeem anytime)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax on Returns
                        </TableCell>
                        <TableCell className="text-slate-700">
                          As per tax slab
                        </TableCell>
                        <TableCell className="text-slate-700">
                          As per tax slab
                        </TableCell>
                        <TableCell className="text-slate-700">
                          LTCG: 12.5% (gains {'>'}₹1.25L)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Tip:</strong> Use RD for short-term goals and
                    emergency funds. For retirement or long-term wealth, combine
                    RD with SIP to balance safety and growth.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  RD Interest Taxation (2026 Rules)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxContent} />
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this RD Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>Enter your monthly deposit amount (minimum ₹500).</li>
                  <li>
                    Input the interest rate offered by your bank (check latest
                    rates).
                  </li>
                  <li>Select tenure in years and additional months.</li>
                  <li>
                    Enable senior citizen mode if you&apos;re 60+ years for
                    bonus rates.
                  </li>
                  <li>
                    Click <strong>&quot;Compare Bank Rates&quot;</strong> to see
                    current rates from popular banks and Post Office.
                  </li>
                  <li>
                    Review maturity amount, total investment, and interest
                    earned.
                  </li>
                  <li>
                    Save your calculation or share via WhatsApp for future
                    reference.
                  </li>
                </ol>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Savings Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/fd-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              FD Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate fixed deposit returns with lump sum
                              investment.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                              <span>Calculate Now</span>
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
                              Calculate SIP returns with market-linked growth
                              potential.
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
              <AdSlot id="rd-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="rd-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="rd-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="rd-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
