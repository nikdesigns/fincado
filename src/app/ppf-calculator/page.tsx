import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PPFClient from './PPFClient';
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
import { PPFSchemas } from '@/components/schemas/PPFSchemas';
import {
  Info,
  Shield,
  Lock,
  TrendingUp,
  ArrowRight,
  FileText,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'PPF Calculator 2026 – Public Provident Fund Maturity Calculator',
  description:
    'Calculate PPF maturity amount with 7.1% interest rate. 100% tax-free returns under EEE status. Check PPF rules, contribution limits, withdrawal options, and Section 80C benefits for 2026.',
  keywords: [
    'PPF Calculator',
    'Public Provident Fund Calculator',
    'PPF Interest Calculator',
    'PPF Maturity Calculator',
    'PPF Interest Rate 2026',
    'PPF vs EPF',
    'PPF vs NPS',
    'PPF Tax Benefits',
    'Section 80C PPF',
    'PPF Withdrawal Rules',
    'PPF Loan Calculator',
    'Tax Free Investment',
  ],
  alternates: {
    canonical: 'https://fincado.com/ppf-calculator/',
  },
  openGraph: {
    title: 'PPF Calculator 2026 – Calculate Tax-Free PPF Returns',
    description:
      'Free PPF calculator with 7.1% interest. Calculate maturity amount, tax savings under Section 80C, and plan your retirement with government-backed security.',
    url: 'https://fincado.com/ppf-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-ppf-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado PPF Calculator',
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

export default function PPFPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Public Provident Fund (PPF)</strong> is a long-term savings scheme backed by the 
      Government of India. It offers guaranteed returns with complete tax exemption under 
      <strong>EEE (Exempt-Exempt-Exempt)</strong> status, making it one of the safest investment 
      options for retirement planning.
    </p>
    <p class="mt-4">
      With a mandatory 15-year lock-in period, PPF combines the benefits of <strong>Section 80C 
      tax deduction</strong>, tax-free interest, and tax-free maturity proceeds. The current 
      interest rate is <strong>7.1% per annum</strong>, compounded annually.
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Lock-in Period:</strong> 15 years (can be extended in blocks of 5 years)</li>
      <li><strong>Minimum Annual Deposit:</strong> ₹500 per year</li>
      <li><strong>Maximum Annual Deposit:</strong> ₹1,50,000 per year</li>
      <li><strong>Interest Rate:</strong> 7.1% p.a. (Q4 FY 2025-26, reviewed quarterly)</li>
      <li><strong>Compounding:</strong> Annual compounding on March 31st</li>
      <li><strong>Account Opening:</strong> One account per individual (including minors)</li>
      <li><strong>Partial Withdrawal:</strong> Allowed from 7th year onwards (up to 50%)</li>
      <li><strong>Loan Facility:</strong> Available from 3rd to 6th year (up to 25%)</li>
    </ul>
  `);

  const taxBenefitsContent = autoLinkContent(`
    <p>
      PPF enjoys <strong>EEE (Exempt-Exempt-Exempt)</strong> tax status, providing triple tax benefits:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Exempt on Investment:</strong> Up to ₹1.5 lakh deduction under Section 80C of Income Tax Act.</li>
      <li><strong>Exempt on Interest:</strong> Interest earned annually is completely tax-free.</li>
      <li><strong>Exempt on Maturity:</strong> The entire maturity amount is tax-free, unlike NSC or tax-saving FDs.</li>
    </ul>
    <p class="mt-4">
      This makes PPF one of the most tax-efficient investment options in India, especially for 
      individuals in higher tax brackets (30% slab).
    </p>
  `);

  const withdrawalContent = autoLinkContent(`
    <p>
      PPF has strict withdrawal rules to ensure long-term savings discipline:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Before 7 years:</strong> No withdrawals allowed except in extreme medical emergencies or life-threatening diseases.</li>
      <li><strong>After 7 years:</strong> One partial withdrawal allowed per year, limited to 50% of the balance at the end of 4th year preceding the year of withdrawal.</li>
      <li><strong>After 15 years:</strong> Full maturity amount can be withdrawn, or account can be extended in blocks of 5 years with or without contributions.</li>
      <li><strong>Premature Closure:</strong> Allowed after 5 years in case of serious illness, higher education, or change of residency, but at reduced interest rate.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'ppf-faq-1',
      question: 'Is PPF interest taxable?',
      answer:
        'No. PPF enjoys EEE (Exempt-Exempt-Exempt) status. The investment qualifies for Section 80C deduction, interest earned is tax-free, and maturity proceeds are also completely tax-free.',
    },
    {
      id: 'ppf-faq-2',
      question: 'What is the current PPF interest rate?',
      answer:
        'The current PPF interest rate is 7.1% per annum (as of Q4 FY 2025-26). The Government of India reviews PPF rates quarterly. Interest is compounded annually on March 31st.',
    },
    {
      id: 'ppf-faq-3',
      question: 'Can I withdraw from PPF before 15 years?',
      answer:
        'Partial withdrawal is allowed from the 7th year onwards, limited to 50% of the balance at the end of the 4th preceding year. Full premature closure is allowed after 5 years only in exceptional cases like serious illness or higher education, but at a reduced interest rate (1-2% lower).',
    },
    {
      id: 'ppf-faq-4',
      question: 'What happens after PPF matures in 15 years?',
      answer:
        'After maturity, you have three options: (1) Withdraw the entire amount, (2) Extend for 5 years without making further deposits, or (3) Extend for 5 years with continued deposits (max ₹1.5L/year). Extensions can be done multiple times in blocks of 5 years.',
    },
    {
      id: 'ppf-faq-5',
      question: 'Can I have multiple PPF accounts?',
      answer:
        'No. An individual can hold only one PPF account in their name. However, you can open a separate PPF account for your minor child. If you have multiple accounts, only the first account will earn interest; others must be closed.',
    },
    {
      id: 'ppf-faq-6',
      question: 'Can I get a loan against my PPF account?',
      answer:
        'Yes. You can take a loan against your PPF balance from the 3rd financial year to the 6th financial year. The loan amount is limited to 25% of the balance at the end of the 2nd preceding year. Interest rate is typically 2% above the PPF rate (around 9.1% currently).',
    },
    {
      id: 'ppf-faq-7',
      question: 'PPF vs NPS - Which is better for retirement?',
      answer:
        'PPF offers guaranteed 7.1% tax-free returns with zero risk and complete liquidity after 15 years. NPS offers potentially higher market-linked returns (10-12%) but comes with market risk and only 60% tax-free withdrawal at maturity. PPF is ideal for risk-averse investors, while NPS suits those seeking higher growth for retirement.',
    },
    {
      id: 'ppf-faq-8',
      question: 'When is the best time to deposit in PPF?',
      answer:
        'Deposit before the 5th of any month to earn interest for that entire month. Interest is calculated on the lowest balance between the 5th and last day of each month. Depositing early in the financial year (April-May) maximizes your returns through compounding.',
    },
    {
      id: 'ppf-faq-9',
      question: 'Can NRIs open a PPF account?',
      answer:
        'No. NRIs (Non-Resident Indians) cannot open new PPF accounts. However, if you opened a PPF account as a resident Indian and later became an NRI, the account can continue until maturity without further deposits. Interest earned will be at the prevailing PPF rate.',
    },
    {
      id: 'ppf-faq-10',
      question: 'What is the minimum and maximum PPF deposit?',
      answer:
        'Minimum annual deposit is ₹500 (can be done in one or multiple installments). Maximum annual deposit is ₹1,50,000. If you deposit less than ₹500 in a year, the account becomes inactive and needs to be revived with a penalty of ₹50 per year plus arrears.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'PPF Calculator',
            url: 'https://fincado.com/ppf-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Public Provident Fund (PPF) Calculator"
        description="Calculate PPF maturity value with 7.1% tax-free interest. Government-backed savings with EEE tax benefits."
        url="https://fincado.com/ppf-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <PPFSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="PPF Calculator - Public Provident Fund" />
            <LanguageToggle path="/hi/ppf-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-green-100 text-emerald-700">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                PPF Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                Calculate tax-free returns with government-backed security
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="ppf-top" type="leaderboard" />
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
                      CURRENT PPF RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Government notified (Q4 FY25-26)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7.1%
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
                      TAX STATUS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Triple tax exemption
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      EEE
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        Status
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      MAX INVESTMENT
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Per financial year (Section 80C)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹1.5L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /year
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <PPFClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="ppf-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-emerald-50/50 border-emerald-200 text-slate-600">
              <Info className="h-4 w-4 text-emerald-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Tax-Saving Tip
                </strong>
                PPF offers triple tax benefits (EEE status): deduction under
                Section 80C, tax-free interest, and tax-free maturity. Deposit
                before 5th of each month to earn interest for the entire month.
              </AlertDescription>
            </Alert>

            {/* ✅ PPF FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    PPF Maturity Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      PPF uses the Future Value of Annuity Due formula since
                      deposits are typically made at the beginning of the year:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        M = P × [((1 + r)<sup>n</sup> - 1) / r] × (1 + r)
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
                        <span>= Maturity amount (Total corpus at the end)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= Annual deposit amount (in ₹)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Annual interest rate (as decimal, e.g., 0.071 for
                          7.1%)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = Investment duration in years (minimum 15 years)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> The formula includes
                        multiplication by (1 + r) at the end because PPF
                        deposits are made at the beginning of the year (Annuity
                        Due), not at the end.
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: PPF Calculation (15 Years)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Annual Deposit (P):</strong>
                        </div>
                        <div>₹1,50,000</div>

                        <div>
                          <strong>Interest Rate (r):</strong>
                        </div>
                        <div>7.1% p.a.</div>

                        <div>
                          <strong>Duration (n):</strong>
                        </div>
                        <div>15 years (minimum lock-in)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Convert Rate to Decimal
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 7.1 ÷ 100 = 0.071
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate (1 + r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1 + 0.071)<sup>15</sup> = (1.071)<sup>15</sup>
                          </div>
                          <div>≈ 2.8171</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Apply PPF Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            M = 1,50,000 × [(2.8171 - 1) / 0.071] × 1.071
                          </div>
                          <div>M = 1,50,000 × (1.8171 / 0.071) × 1.071</div>
                          <div>M = 1,50,000 × 25.593 × 1.071</div>
                          <div>M = 1,50,000 × 27.410</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Maturity Value (Tax-Free):
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹41,11,500
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Total Deposited (15 years):</span>
                          <strong>₹22,50,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax-Free Interest Earned:</span>
                          <strong className="text-green-700">₹18,61,500</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Effective Gain:</span>
                          <strong className="text-emerald-700">82.73%</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Section 80C Tax Saved (30% slab):</span>
                          <strong className="text-blue-700">₹6,75,000</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interest Calculation Note */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      How PPF Interest is Calculated
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li>
                          Interest is calculated on the{' '}
                          <strong>lowest balance</strong> between the 5th and
                          last day of each month.
                        </li>
                        <li>
                          To earn interest for the entire month, deposit{' '}
                          <strong>before the 5th</strong> of that month.
                        </li>
                        <li>
                          Deposits after 5th earn interest only from the next
                          month.
                        </li>
                        <li>
                          Interest is compounded <strong>annually</strong> and
                          credited on March 31st.
                        </li>
                        <li>
                          For maximum returns, deposit the full year&apos;s
                          contribution in <strong>April</strong> (before 5th).
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Monthly vs Annual Deposit */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Monthly vs Annual Deposit Strategy
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p className="text-xs">
                        <strong>Annual Lump Sum (April):</strong> Deposit
                        ₹1,50,000 before April 5th to earn interest for all 12
                        months. This maximizes your returns.
                      </p>
                      <p className="text-xs">
                        <strong>Monthly Deposits:</strong> Deposit ₹12,500 every
                        month before the 5th. While convenient, this earns
                        slightly less interest as later deposits have less time
                        to compound.
                      </p>
                      <p className="text-xs font-semibold text-amber-800 mt-2">
                        💡 Tip: If you have a lump sum, deposit it early.
                        Otherwise, monthly SIP-style deposits help maintain
                        investment discipline.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This calculator uses the standard Future Value of Annuity
                    Due formula. Actual interest calculation by banks follows
                    the daily balance method with monthly interest computation.
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
                    Need higher returns for retirement?
                  </strong>
                  <Link
                    href="/nps-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      Compare with NPS Calculator for market-linked pension
                      growth
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
                  What is Public Provident Fund (PPF)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Features of PPF
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={featuresContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="ppf-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  PPF Tax Benefits (EEE Status)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxBenefitsContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  PPF vs EPF vs NPS vs FD Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">EPF</TableHead>
                        <TableHead className="text-left">NPS</TableHead>
                        <TableHead className="text-left">FD</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Returns
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          7.1% (Fixed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          8.25% (Fixed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          10-12% (Market-linked)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6.5-7.5%
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax Status
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% Tax-Free)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% Tax-Free)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          EET (60% Tax-Free)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Taxable
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Lock-in Period
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Until retirement
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Until 60 years
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          7 days - 10 years
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Risk Level
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Zero (Govt backed)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Zero (Govt backed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Medium (Market risk)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Zero (Bank guarantee)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Ideal For
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Long-term tax-free savings
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Salaried employees
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Retirement planning
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Short-term goals
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Withdrawal
                        </TableCell>
                        <TableCell className="text-slate-700">
                          After 7 years (partial)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Limited before retirement
                        </TableCell>
                        <TableCell className="text-slate-700">
                          After 60 years
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Anytime (with penalty)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Tip:</strong> PPF is ideal for risk-free,
                    tax-free retirement savings. Combine PPF with NPS for a
                    balanced retirement portfolio—PPF for safety, NPS for
                    growth.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  PPF Withdrawal Rules
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalContent} />
                </div>
              </section>

              {/* PPF vs NSC */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  PPF vs NSC: Which is Better?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>
                    Both PPF and{' '}
                    <strong>National Savings Certificate (NSC)</strong> offer
                    Section 80C deduction, but PPF has a clear advantage:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>
                      <strong>Tax on Maturity:</strong> PPF maturity is 100%
                      tax-free (EEE), while NSC maturity is taxable as per your
                      slab.
                    </li>
                    <li>
                      <strong>Interest:</strong> PPF interest is tax-free, NSC
                      interest is taxable (deemed reinvested and eligible for
                      80C).
                    </li>
                    <li>
                      <strong>Tenure:</strong> PPF has 15 years with extension
                      option, NSC is fixed 5 years.
                    </li>
                    <li>
                      <strong>Liquidity:</strong> PPF allows partial withdrawal
                      after 7 years and loans. NSC cannot be withdrawn before
                      maturity.
                    </li>
                  </ul>
                  <p className="mt-4 font-semibold text-emerald-700">
                    Verdict: PPF is better for long-term tax-free wealth
                    creation. NSC suits those seeking shorter 5-year commitment
                    with higher pre-tax returns.
                  </p>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this PPF Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Choose your contribution mode: Monthly (₹500-₹12,500) or
                    Annual (₹500-₹1,50,000).
                  </li>
                  <li>Enter your monthly or annual investment amount.</li>
                  <li>
                    Set the interest rate (currently 7.1%, updated quarterly by
                    Govt).
                  </li>
                  <li>
                    Select duration (minimum 15 years, can extend in 5-year
                    blocks).
                  </li>
                  <li>
                    View maturity amount, total investment, and tax-free
                    interest earned.
                  </li>
                  <li>
                    Enable <strong>&quot;Year-wise Breakdown&quot;</strong> to
                    see growth over first 5 years.
                  </li>
                  <li>
                    Save your calculation or share via WhatsApp for future
                    reference.
                  </li>
                </ol>
              </section>

              {/* PPF Extension */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  PPF Extension After Maturity
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>After 15 years, you have three options:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>
                      <strong>Close and Withdraw:</strong> Withdraw the entire
                      maturity amount (100% tax-free).
                    </li>
                    <li>
                      <strong>Extend Without Deposits:</strong> Keep the account
                      active for 5 more years without making new deposits. Your
                      existing corpus continues to earn interest.
                    </li>
                    <li>
                      <strong>Extend With Deposits:</strong> Continue deposits
                      (max ₹1.5L/year) for 5 more years. You can extend multiple
                      times in blocks of 5 years.
                    </li>
                  </ul>
                  <p className="mt-4">
                    During extension, you can make one withdrawal per year
                    without limit, and the interest continues to be tax-free.
                  </p>
                </div>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Tax-Saving Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/elss-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            📊
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              ELSS Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate returns from tax-saving mutual funds
                              with 3-year lock-in.
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

                  <Link href="/nps-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              NPS Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Plan retirement with NPS (National Pension System)
                              calculator.
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
              <AdSlot id="ppf-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="ppf-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="ppf-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="ppf-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
