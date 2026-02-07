import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HomeLoanEMIClient from './HomeLoanEMIClient';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BookOpen, ArrowRight, Info, Home } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { HomeLoanSchemas } from '@/components/schemas/HomeLoanSchemas';
import 'katex/dist/katex.min.css';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'Home Loan EMI Calculator 2026 - Calculate Housing Loan EMI with Tax Benefits',
  description:
    'Free Home Loan EMI Calculator for India. Calculate monthly EMI for HDFC, SBI, ICICI home loans. Check tax benefits under Section 80C & 24(b). Compare interest rates & save lakhs.',
  keywords: [
    'home loan emi calculator',
    'housing loan calculator',
    'home loan interest rate',
    'home loan tax benefits',
    'section 80c',
    'section 24b',
    'hdfc home loan',
    'sbi home loan',
    'home loan prepayment',
  ],
  alternates: {
    canonical: 'https://fincado.com/emi-calculator/home-loan/',
  },
  openGraph: {
    title:
      'Home Loan EMI Calculator - Calculate Housing Loan EMI & Tax Savings',
    description:
      'Calculate home loan EMI with tax benefits. Compare rates from HDFC, SBI, ICICI & save on interest.',
    url: 'https://fincado.com/emi-calculator/home-loan/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-home-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Home Loan EMI Calculator',
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

export default function HomeLoanEMIPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Home Loan EMI Calculator</strong> helps you calculate monthly installments 
      for your housing loan based on principal amount, interest rate, and tenure. 
      Indian home loans also qualify for tax deductions under <strong>Section 80C</strong> 
      (principal repayment up to ₹1.5 lakh) and <strong>Section 24(b)</strong> 
      (interest paid up to ₹2 lakh for self-occupied property).
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Lower Interest Rates:</strong> Home loans have the lowest interest rates (8.5%-9.5%) compared to other loans.</li>
      <li><strong>Tax Savings:</strong> Save up to ₹3.5 lakh annually under Sections 80C and 24(b).</li>
      <li><strong>Long Tenure:</strong> Repayment period up to 30 years makes EMI affordable.</li>
      <li><strong>Asset Creation:</strong> Building equity while paying EMI instead of rent.</li>
    </ul>
  `);

  const taxBenefitsContent = autoLinkContent(`
    <p>
      <strong>Section 80C:</strong> Claim deduction up to ₹1,50,000 on principal repayment.<br/>
      <strong>Section 24(b):</strong> Claim deduction up to ₹2,00,000 on interest paid for self-occupied property 
      (no limit for let-out property).<br/>
      <strong>Section 80EEA:</strong> Additional ₹1,50,000 deduction on interest for first-time home buyers 
      (property value up to ₹45 lakh).
    </p>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is the current home loan interest rate in India?',
      answer:
        'As of February 2026, home loan interest rates range from 8.50% to 9.65% p.a. SBI offers rates starting at 8.50%, HDFC at 8.60%, and ICICI at 8.75%. Rates depend on credit score, loan amount, and property value.',
    },
    {
      id: 'faq-2',
      question: 'How much home loan can I get on ₹50,000 salary?',
      answer:
        'On ₹50,000 monthly salary, you can get a home loan of approximately ₹35-40 lakhs, assuming 50% of your income goes towards EMI. For ₹40 lakh loan at 8.5% for 20 years, EMI would be ₹34,680.',
    },
    {
      id: 'faq-3',
      question: 'What are the tax benefits on home loans?',
      answer:
        'You can save up to ₹3.5 lakh in taxes: ₹1.5 lakh under Section 80C (principal), ₹2 lakh under Section 24(b) (interest for self-occupied), and additional ₹1.5 lakh under Section 80EEA (first-time buyers).',
    },
    {
      id: 'faq-4',
      question: 'Should I prepay my home loan or invest in mutual funds?',
      answer:
        'If your loan interest rate is 8.5% and you expect 12%+ returns from equity mutual funds, investing is better. However, prepaying gives guaranteed savings and reduces debt burden. Consider your risk appetite and financial goals.',
    },
    {
      id: 'faq-5',
      question: 'What is the minimum down payment for a home loan?',
      answer:
        'Banks typically finance 80-90% of property value. You need to arrange 10-20% as down payment. For properties above ₹75 lakh, RBI mandates minimum 25% down payment.',
    },
    {
      id: 'faq-6',
      question: 'Can I get a home loan without ITR?',
      answer:
        'Salaried individuals can get home loans with salary slips and Form 16. Self-employed individuals typically need 2-3 years of ITR. Some banks offer loans to self-employed without ITR if you provide alternative income proof.',
    },
    {
      id: 'faq-7',
      question: 'What is the maximum home loan tenure?',
      answer:
        'Most banks offer home loans for up to 30 years (360 months). However, the tenure cannot extend beyond retirement age (typically 60-65 years). Longer tenure reduces EMI but increases total interest.',
    },
    {
      id: 'faq-8',
      question: 'Is floating or fixed interest rate better for home loans?',
      answer:
        'Floating rates are generally 0.5-1% lower than fixed rates and adjust with market conditions. Fixed rates provide certainty. Most borrowers choose floating rates as home loans are long-term and rates tend to decrease over time.',
    },
    {
      id: 'faq-9',
      question: 'What documents are required for a home loan?',
      answer:
        'Required documents: Identity proof (Aadhaar, PAN), Address proof, Last 6 months salary slips, Last 3 years ITR (for self-employed), Bank statements, Property documents, Approved building plan, Sale agreement, and NOC from builder/society.',
    },
    {
      id: 'faq-10',
      question: 'Can I transfer my home loan to another bank?',
      answer:
        'Yes, you can transfer (balance transfer) your home loan to another bank offering lower interest rates. Most banks charge 0.5-1% of outstanding principal as processing fee. Transfer makes sense if you save at least 0.75% on interest rate.',
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
            name: 'EMI Calculator',
            url: 'https://fincado.com/emi-calculator/',
          },
          {
            name: 'Home Loan EMI Calculator',
            url: 'https://fincado.com/emi-calculator/home-loan/',
          },
        ]}
      />

      <CalculatorSchema
        name="Home Loan EMI Calculator"
        description="Calculate home loan EMI with tax benefits. Check monthly repayment for housing loans from HDFC, SBI, ICICI."
        url="https://fincado.com/emi-calculator/home-loan/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <HomeLoanSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Home Loan EMI Calculator - Calculate Housing Loan EMI & Tax Benefits" />
            {/* ✅ FIXED: Correct Hindi page path */}
            <LanguageToggle path="/hi/loans/home-loan" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Home Loan EMI Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                Calculate Housing Loan EMI with Tax Benefits
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD - Highest Viewability */}
          <div className="no-print my-6">
            <AdSlot id="home-loan-top" type="leaderboard" />
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
                      LOWEST RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      SBI Home Loan {updatedLabel}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      8.50%
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
                      MAX TAX BENEFIT
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Under Section 80C + 24(b)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹3.5L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        /year
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      TYPICAL EMI
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹30L @ 8.5% for 20 years
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹26,010
                      <span className="text-base font-normal text-slate-600">
                        /month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <HomeLoanEMIClient />

            {/* 🎯 AD #2: AFTER CALCULATOR - High Engagement */}
            <div className="no-print my-8">
              <AdSlot
                id="home-loan-after-calc"
                type="square"
                lazyLoad={false}
              />
            </div>

            {/* Add after the calculator, before bank comparison table */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Home Loan EMI Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      The EMI (Equated Monthly Installment) for home loans is
                      calculated using the reducing balance method:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        EMI = P × [r × (1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> -
                        1]
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= Principal loan amount (in ₹)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Monthly interest rate = Annual Rate ÷ (12 × 100)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>= Loan tenure in months (years × 12)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example Calculation for Home Loan
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Loan Amount (P):</strong>
                        </div>
                        <div>₹30,00,000</div>

                        <div>
                          <strong>Annual Interest Rate:</strong>
                        </div>
                        <div>8.5% p.a.</div>

                        <div>
                          <strong>Loan Tenure:</strong>
                        </div>
                        <div>20 years (240 months)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Monthly Interest Rate (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 8.5 ÷ (12 × 100) = 8.5 ÷ 1200 = 0.00708333
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate (1+r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.00708333)<sup>240</sup> = 5.4397
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Apply EMI Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            EMI = 30,00,000 × [0.00708333 × 5.4397] / [5.4397 -
                            1]
                          </div>
                          <div>EMI = 30,00,000 × 0.03853 / 4.4397</div>
                          <div>EMI = 30,00,000 × 0.008678</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Monthly EMI:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹26,034
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Total Amount Payable:</span>
                          <strong>₹62,48,160</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest Paid:</span>
                          <strong className="text-red-600">₹32,48,160</strong>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>(Interest is 108% of principal amount)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Understanding the Formula
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        <strong>Reducing Balance Method:</strong> Interest is
                        calculated on the outstanding principal amount, which
                        decreases with each EMI payment.
                      </li>
                      <li>
                        <strong>Fixed EMI:</strong> The EMI amount remains
                        constant throughout the loan tenure, but the interest
                        and principal components change each month.
                      </li>
                      <li>
                        <strong>Early Payments:</strong> Initial EMIs contain
                        more interest, later EMIs contain more principal
                        repayment.
                      </li>
                      <li>
                        <strong>Tax Benefits:</strong> Claim deductions under
                        Section 80C (principal up to ₹1.5L) and Section 24(b)
                        (interest up to ₹2L) while filing ITR.
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-4">
                    <strong>Note:</strong> All Indian banks use the reducing
                    balance method for EMI calculation. This calculator uses the
                    same formula to provide accurate results matching bank
                    statements.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Budget Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Tax Benefit Alert
                </strong>
                Home loans offer maximum tax deductions among all loans. You can
                save up to ₹3.5 lakh annually under sections 80C, 24(b), and
                80EEA combined.
              </AlertDescription>
            </Alert>

            {/* Bank Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Home Loan Interest Rates Comparison (Updated {updatedLabel})
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">Bank</th>
                          <th className="p-3 text-left font-semibold">
                            Interest Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Processing Fee
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Max Loan Amount
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Max Tenure
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.50% - 9.65%
                          </td>
                          <td className="p-3">0.35% of loan</td>
                          <td className="p-3">Up to ₹10 Cr</td>
                          <td className="p-3">30 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.60% - 9.50%
                          </td>
                          <td className="p-3">Up to 0.5%</td>
                          <td className="p-3">Up to ₹10 Cr</td>
                          <td className="p-3">30 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.75% - 9.70%
                          </td>
                          <td className="p-3">Up to 1%</td>
                          <td className="p-3">Up to ₹15 Cr</td>
                          <td className="p-3">30 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.75% - 9.65%
                          </td>
                          <td className="p-3">Up to 1%</td>
                          <td className="p-3">Up to ₹5 Cr</td>
                          <td className="p-3">30 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">PNB</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.40% - 10.40%
                          </td>
                          <td className="p-3">0.35% of loan</td>
                          <td className="p-3">Up to ₹7.5 Cr</td>
                          <td className="p-3">30 years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *Rates are indicative and vary based on credit score, loan
                    amount, and property value. Last updated: {updatedLabel}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED - After Comparison */}
            <div className="no-print my-8">
              <AdSlot id="home-loan-infeed-1" type="banner" lazyLoad={true} />
            </div>

            {/* Promo Content */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Want to master home loans?
                  </strong>

                  <Link
                    href="/guides/home-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Read our Complete Home Loan Guide (2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Benefits */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Benefits of Home Loans in India
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Tax Benefits */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Home Loan Tax Benefits (2026)
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxBenefitsContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="home-loan-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Home Loan Eligibility Criteria
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>Age:</strong> 21-65 years (salaried), 21-70
                        years (self-employed)
                      </li>
                      <li>
                        <strong>Income:</strong> Minimum ₹25,000/month (varies
                        by city and bank)
                      </li>
                      <li>
                        <strong>Credit Score:</strong> Minimum 650, preferably
                        750+
                      </li>
                      <li>
                        <strong>Employment:</strong> Minimum 2 years work
                        experience (salaried), 3 years business vintage
                        (self-employed)
                      </li>
                      <li>
                        <strong>EMI to Income Ratio:</strong> Should not exceed
                        50% of monthly income
                      </li>
                    </ul>
                  </section>

                  {/* 🎯 AD #5: AFTER ELIGIBILITY */}
                  <div className="no-print my-8">
                    <AdSlot
                      id="home-loan-infeed-2"
                      type="banner"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Loan Calculators
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* ✅ FIXED: Correct internal link */}
                      <Link href="/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  General EMI Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate EMI for any type of loan
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

                      {/* ✅ FIXED: Correct internal link */}
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
                                  Plan investments alongside loan repayment
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* 🎯 AD #6: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="home-loan-before-faq"
                type="leaderboard"
                lazyLoad={true}
              />
            </div>

            {/* FAQ */}
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

            {/* 🎯 AD #7: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="home-loan-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #8: SIDEBAR TOP - Sticky */}
              <AdSlot id="home-loan-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* 🎯 AD #10: SIDEBAR BOTTOM */}
              <AdSlot
                id="home-loan-sidebar-bottom"
                type="box"
                lazyLoad={true}
              />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
