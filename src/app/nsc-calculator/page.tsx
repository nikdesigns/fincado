import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import NSCClient from './NSCClient';
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
import { NSCSchemas } from '@/components/schemas/NSCSchemas';
import { Info, Shield, TrendingUp, ArrowRight, FileText } from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title:
    'NSC Calculator 2026 – National Savings Certificate Maturity Calculator',
  description:
    'Calculate NSC maturity amount with 7.7% interest rate. 5-year fixed tenure with Section 80C tax benefits. Government-backed secure investment with guaranteed returns.',
  keywords: [
    'NSC Calculator',
    'National Savings Certificate Calculator',
    'NSC Interest Calculator',
    'NSC Maturity Calculator',
    'NSC Interest Rate 2026',
    'NSC vs PPF',
    'NSC vs FD',
    'NSC Tax Benefits',
    'Section 80C NSC',
    'NSC Investment',
    'Post Office NSC',
    'Government Savings Scheme',
  ],
  alternates: {
    canonical: 'https://fincado.com/nsc-calculator/',
    languages: {
      'hi-IN': 'https://fincado.com/hi/nsc-calculator/',
    },
  },
  openGraph: {
    title: 'NSC Calculator 2026 – Calculate NSC Maturity Returns',
    description:
      'Free NSC calculator with 7.7% interest. Calculate maturity amount, tax savings under Section 80C. Government-backed secure investment.',
    url: 'https://fincado.com/nsc-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-nsc-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado NSC Calculator',
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

export default function NSCPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>National Savings Certificate (NSC)</strong> is a fixed-income investment scheme 
      offered by the Government of India through post offices and authorized banks. It provides 
      guaranteed returns with a <strong>5-year lock-in period</strong> and qualifies for 
      <strong>Section 80C</strong> tax deduction.
    </p>
    <p class="mt-4">
      With the current interest rate of <strong>7.7% per annum</strong> (compounded annually 
      but paid at maturity), NSC is ideal for risk-averse investors seeking secure, 
      government-backed returns with tax benefits.
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Lock-in Period:</strong> 5 years (fixed, premature withdrawal not allowed)</li>
      <li><strong>Minimum Investment:</strong> ₹1,000 (in multiples of ₹100)</li>
      <li><strong>Maximum Investment:</strong> No limit (but only ₹1.5L eligible for 80C)</li>
      <li><strong>Interest Rate:</strong> 7.7% p.a. (Q4 FY 2025-26, reviewed quarterly)</li>
      <li><strong>Compounding:</strong> Annual compounding, interest paid at maturity</li>
      <li><strong>Availability:</strong> Post offices and authorized banks</li>
      <li><strong>Eligibility:</strong> Indian residents, HUF, Trusts (not for NRIs)</li>
      <li><strong>Collateral:</strong> Can be pledged as security for loans</li>
    </ul>
  `);

  const taxBenefitsContent = autoLinkContent(`
    <p>
      NSC offers significant tax benefits under <strong>Section 80C</strong> of the Income Tax Act:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Investment Deduction:</strong> Principal amount qualifies for Section 80C deduction (up to ₹1.5 lakh).</li>
      <li><strong>Accrued Interest Deduction:</strong> Interest earned in the first 4 years is deemed reinvested and also qualifies for Section 80C deduction in the respective years.</li>
      <li><strong>Maturity Taxation:</strong> The entire interest earned (including accrued interest) is taxable at maturity as per your income tax slab.</li>
      <li><strong>5th Year Interest:</strong> Interest earned in the 5th year is fully taxable and does not qualify for 80C deduction.</li>
    </ul>
    <p class="mt-4">
      <strong>Example:</strong> If you invest ₹1.5L in NSC and earn ₹60,000 interest over 5 years, 
      you get 80C deduction on ₹1.5L (year 1) + accrued interest (years 2-4), but the final interest 
      is taxable in year 5.
    </p>
  `);

  const withdrawalContent = autoLinkContent(`
    <p>
      NSC has strict withdrawal rules due to its 5-year lock-in:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>No Premature Withdrawal:</strong> NSC cannot be withdrawn before 5 years under normal circumstances.</li>
      <li><strong>Exceptions:</strong> Premature encashment allowed only in case of: (1) Death of the account holder, (2) Forfeiture by court order, (3) Transfer to another holder in case of joint accounts.</li>
      <li><strong>Maturity:</strong> After 5 years, the certificate can be encashed at any post office with ID proof and passbook.</li>
      <li><strong>Auto Renewal:</strong> NSC does NOT auto-renew. You must manually reinvest after maturity if desired.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'nsc-faq-1',
      question: 'What is the current NSC interest rate?',
      answer:
        'The current NSC interest rate is 7.7% per annum (as of Q4 FY 2025-26). The Government of India reviews NSC rates quarterly. Interest is compounded annually and paid at maturity after 5 years.',
    },
    {
      id: 'nsc-faq-2',
      question: 'Is NSC interest taxable?',
      answer:
        'Yes. NSC interest is fully taxable as per your income tax slab. However, the accrued interest for the first 4 years is deemed reinvested and qualifies for Section 80C deduction. The 5th year interest is taxable without any 80C benefit.',
    },
    {
      id: 'nsc-faq-3',
      question: 'Can I withdraw NSC before 5 years?',
      answer:
        'No. NSC has a mandatory 5-year lock-in period. Premature withdrawal is allowed only in exceptional cases: death of the account holder, court order forfeiture, or transfer to another joint holder. No other premature encashment is permitted.',
    },
    {
      id: 'nsc-faq-4',
      question: 'What is the minimum and maximum investment in NSC?',
      answer:
        'Minimum investment is ₹1,000 (in multiples of ₹100). There is no maximum limit, but only ₹1.5 lakh per financial year qualifies for Section 80C tax deduction. You can buy multiple NSC certificates in a year.',
    },
    {
      id: 'nsc-faq-5',
      question: 'NSC vs PPF – Which is better?',
      answer:
        'NSC: 5 years, 7.7% interest, taxable at maturity, no partial withdrawal. PPF: 15 years (extendable), 7.1% interest, 100% tax-free (EEE status), partial withdrawal after 7 years. NSC is better for short-term (5-year) goals with higher interest. PPF is better for long-term tax-free retirement savings.',
    },
    {
      id: 'nsc-faq-6',
      question: 'Can I pledge NSC for a loan?',
      answer:
        'Yes. NSC certificates can be pledged as collateral for loans from banks and NBFCs. The pledged NSC remains with the lender as security. Loan amount is typically 80-90% of the NSC value. However, you cannot withdraw the NSC until the loan is repaid.',
    },
    {
      id: 'nsc-faq-7',
      question: 'How to buy NSC online?',
      answer:
        'Currently, NSC can be purchased only offline at post offices or authorized banks (SBI, ICICI, HDFC, Axis). You need to visit the branch with KYC documents (Aadhaar, PAN), fill the application form, and pay via cash/cheque. Online purchase is not yet available.',
    },
    {
      id: 'nsc-faq-8',
      question: 'Can NRIs invest in NSC?',
      answer:
        'No. NRIs (Non-Resident Indians) cannot purchase new NSC certificates. NSC is only available to Indian residents. However, if you bought NSC as a resident and later became an NRI, the certificate can continue until maturity.',
    },
    {
      id: 'nsc-faq-9',
      question: 'What happens to NSC after maturity?',
      answer:
        'After 5 years, your NSC matures and can be encashed at any post office. The maturity amount (principal + interest) is credited to your bank account or issued via cheque. NSC does NOT auto-renew, so you must manually reinvest if you want to continue.',
    },
    {
      id: 'nsc-faq-10',
      question: 'NSC vs FD – Which gives better returns?',
      answer:
        'NSC offers 7.7% (government rate, guaranteed) with Section 80C benefit but 5-year lock-in. Bank FDs offer 6.5-7.5% (varies by bank) with flexible tenure (7 days to 10 years). NSC is better for tax saving and guaranteed returns. FD is better for liquidity and shorter durations.',
    },
  ];

  const updatedLabel = getCurrentMonthYearLabel();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'NSC Calculator',
            url: 'https://fincado.com/nsc-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="National Savings Certificate (NSC) Calculator"
        description="Calculate NSC maturity value with 7.7% interest. Government-backed savings with Section 80C tax benefits."
        url="https://fincado.com/nsc-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <NSCSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="NSC Calculator - National Savings Certificate" />
            <LanguageToggle path="/hi/nsc-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-50 to-emerald-100 text-green-700">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                NSC Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-green-700">
                Calculate returns from National Savings Certificate
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="nsc-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-green-200 bg-linear-to-br from-green-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-green-700 mb-1">
                      CURRENT NSC RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Government notified (Q4 FY25-26)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7.7%
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
                      LOCK-IN PERIOD
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Fixed maturity tenure
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5 Years
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      LAST UPDATED
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Latest rate review
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <NSCClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="nsc-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-green-50/50 border-green-200 text-slate-600">
              <Info className="h-4 w-4 text-green-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Tax-Saving Tip
                </strong>
                NSC investment qualifies for Section 80C deduction. The accrued
                interest (first 4 years) also gets 80C benefit. Buy NSC early in
                the financial year to maximize compounding returns.
              </AlertDescription>
            </Alert>

            {/* ✅ NSC FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    NSC Maturity Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      NSC uses the standard compound interest formula:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        A = P × (1 + r)<sup>n</sup>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          A
                        </span>
                        <span>
                          = Maturity amount (Total value after 5 years)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>
                          = Principal (Initial investment amount in ₹)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Annual interest rate (as decimal, e.g., 0.077 for
                          7.7%)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= Investment duration (5 years for NSC)</span>
                      </div>

                      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                        <p className="text-xs text-slate-700">
                          <strong>Note:</strong> Interest is compounded annually
                          (once per year) and the entire maturity amount is paid
                          at the end of 5 years.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: NSC Calculation (5 Years)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Investment (P):</strong>
                        </div>
                        <div>₹1,00,000</div>

                        <div>
                          <strong>Interest Rate (r):</strong>
                        </div>
                        <div>7.7% p.a.</div>

                        <div>
                          <strong>Duration (n):</strong>
                        </div>
                        <div>5 years (fixed)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Convert Rate to Decimal
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 7.7 ÷ 100 = 0.077
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate (1 + r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1 + 0.077)<sup>5</sup> = (1.077)<sup>5</sup>
                          </div>
                          <div>≈ 1.4506</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Apply NSC Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>A = 1,00,000 × 1.4506</div>
                          <div>A ≈ 1,45,060</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Maturity Value (5 Years):
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹1,45,060
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Principal Invested:</span>
                          <strong>₹1,00,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Earned (Taxable):</span>
                          <strong className="text-green-700">₹45,060</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Effective Gain:</span>
                          <strong className="text-emerald-700">45.06%</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Section 80C Benefit (30% slab):</span>
                          <strong className="text-blue-700">₹30,000</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax Calculation Note */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Section 80C Tax Benefit Explained
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p className="text-xs">
                        NSC offers <strong>double tax benefit</strong> under
                        Section 80C:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs">
                        <li>
                          <strong>Year 1:</strong> Principal amount (₹1,00,000)
                          gets 80C deduction
                        </li>
                        <li>
                          <strong>Years 2-4:</strong> Accrued interest deemed
                          reinvested, also gets 80C deduction (approx ₹7,700 +
                          ₹8,293 + ₹8,931)
                        </li>
                        <li>
                          <strong>Year 5:</strong> Interest is taxable, no 80C
                          benefit
                        </li>
                        <li>
                          <strong>Total 80C benefit:</strong> ₹1,00,000
                          (principal) + ₹24,924 (accrued interest Y2-Y4) ≈
                          ₹1,24,924
                        </li>
                      </ul>
                      <p className="text-xs font-semibold text-purple-800 mt-2">
                        💡 Tip: The accrued interest adds to your 80C limit each
                        year, giving extra tax savings beyond the principal
                        investment.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This calculator uses the standard compound interest formula.
                    Actual interest calculation by post offices follows annual
                    compounding with interest paid at maturity.
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
                    Looking for longer-term tax-free savings?
                  </strong>
                  <Link
                    href="/ppf-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      Compare with PPF Calculator for 100% tax-free returns
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
                  What is National Savings Certificate (NSC)?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Features of NSC
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={featuresContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="nsc-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC Tax Benefits (Section 80C)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxBenefitsContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC vs PPF vs FD vs KVP Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Feature</TableHead>
                        <TableHead className="text-left">NSC</TableHead>
                        <TableHead className="text-left">PPF</TableHead>
                        <TableHead className="text-left">FD</TableHead>
                        <TableHead className="text-left">KVP</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Returns
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          7.7% (Fixed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.1% (Fixed)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          6.5-7.5%
                        </TableCell>
                        <TableCell className="text-slate-700">
                          7.5% (Doubles)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Lock-in Period
                        </TableCell>
                        <TableCell className="text-slate-700">
                          5 years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          15 years
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          7 days - 10 years
                        </TableCell>
                        <TableCell className="text-slate-700">
                          115 months (~9.6 years)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Tax Status
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Taxable (80C on principal)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          EEE (100% Tax-Free)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Taxable
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Taxable (No 80C)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Section 80C
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (Principal + Accrued Interest)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Yes (Principal)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Only 5-year tax-saver FD
                        </TableCell>
                        <TableCell className="text-slate-700">No</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Minimum Investment
                        </TableCell>
                        <TableCell className="text-slate-700">₹1,000</TableCell>
                        <TableCell className="text-slate-700">
                          ₹500/year
                        </TableCell>
                        <TableCell className="text-slate-700">
                          ₹1,000 - ₹10,000
                        </TableCell>
                        <TableCell className="text-slate-700">₹1,000</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Ideal For
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          5-year tax-saving goal
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Long-term tax-free savings
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Short-term liquidity
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Long-term doubling wealth
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Tip:</strong> NSC is ideal for 5-year
                    tax-saving with guaranteed returns. Combine NSC with PPF for
                    balanced portfolio—NSC for medium-term goals, PPF for
                    long-term tax-free wealth.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC Withdrawal Rules
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={withdrawalContent} />
                </div>
              </section>

              {/* NSC vs SCSS */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  NSC vs SCSS: Which is Better for Seniors?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>
                    <strong>Senior Citizens Savings Scheme (SCSS)</strong> is
                    designed specifically for seniors (60+), while NSC is open
                    to all:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>
                      <strong>Age:</strong> SCSS requires 60+ years, NSC has no
                      age limit.
                    </li>
                    <li>
                      <strong>Interest:</strong> SCSS offers 8.2% (Q4 FY25-26)
                      vs NSC 7.7%, but SCSS pays quarterly interest while NSC
                      compounds.
                    </li>
                    <li>
                      <strong>Tenure:</strong> SCSS is 5 years (extendable 3
                      years), NSC is fixed 5 years.
                    </li>
                    <li>
                      <strong>Tax:</strong> Both qualify for Section 80C. SCSS
                      interest is taxable quarterly. NSC interest is taxable at
                      maturity.
                    </li>
                    <li>
                      <strong>Use Case:</strong> SCSS is better for seniors
                      needing regular income. NSC is better for lump-sum wealth
                      accumulation.
                    </li>
                  </ul>
                  <p className="mt-4 font-semibold text-green-700">
                    Verdict: Seniors should choose SCSS for higher interest and
                    quarterly income. NSC suits younger investors for 5-year
                    tax-saving goals.
                  </p>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this NSC Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter the principal amount you want to invest (minimum
                    ₹1,000).
                  </li>
                  <li>
                    Set the interest rate (currently 7.7%, updated quarterly by
                    Govt).
                  </li>
                  <li>Tenure is fixed at 5 years (no need to adjust).</li>
                  <li>
                    View maturity amount, total interest earned, and Section 80C
                    benefits.
                  </li>
                  <li>
                    Enable <strong>&quot;Show Year-wise Breakdown&quot;</strong>{' '}
                    to see how your investment grows each year with accrued
                    interest.
                  </li>
                  <li>
                    Save your calculation or share via WhatsApp for future
                    reference.
                  </li>
                </ol>
              </section>

              {/* How to Buy NSC */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Buy NSC (Post Office & Banks)
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>NSC can be purchased from:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>
                      <strong>All India Post Offices:</strong> Visit any post
                      office with KYC documents (Aadhaar, PAN, passport-size
                      photo).
                    </li>
                    <li>
                      <strong>Authorized Banks:</strong> Select branches of SBI,
                      ICICI, HDFC, Axis Bank, and other authorized banks.
                    </li>
                    <li>
                      <strong>Application Form:</strong> Fill Form A-1 (for NSC
                      VIII Issue) and submit with payment (cash/cheque).
                    </li>
                    <li>
                      <strong>Certificate Issuance:</strong> You&apos;ll receive
                      a physical NSC certificate with details of investment,
                      interest rate, and maturity.
                    </li>
                    <li>
                      <strong>Online Status:</strong> Currently, NSC cannot be
                      purchased online. You must visit the branch physically.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Tax-Saving Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              PPF Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate 100% tax-free returns with 15-year PPF
                              investment.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate Now</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/fd-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              FD Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Compare fixed deposit returns with flexible
                              tenures.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
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
              <AdSlot id="nsc-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="nsc-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="nsc-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="nsc-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
