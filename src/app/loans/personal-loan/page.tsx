import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PersonalLoanEMIClient from './PersonalLoanEMIClient';
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
import { BookOpen, ArrowRight, Info, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PersonalLoanSchemas } from '@/components/schemas/PersonalLoanSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'Personal Loan EMI Calculator 2026 - Calculate Instant Personal Loan EMI',
  description:
    'Free Personal Loan EMI Calculator for India. Calculate monthly EMI for personal loans from HDFC, SBI, ICICI, Bajaj Finserv. Compare interest rates, check eligibility & get instant approval.',
  keywords: [
    'personal loan emi calculator',
    'instant personal loan',
    'personal loan interest rate',
    'hdfc personal loan',
    'sbi personal loan',
    'personal loan eligibility',
    'personal loan online',
    'quick personal loan',
  ],
  alternates: {
    canonical: '/loans/personal-loan/',
  },
  openGraph: {
    title: 'Personal Loan EMI Calculator - Calculate Instant Loan EMI Online',
    description:
      'Calculate personal loan EMI instantly. Compare rates from top banks & NBFCs. Get instant approval with minimal documentation.',
    url: '/loans/personal-loan/',
    type: 'website',
    images: [
      {
        url: '/og-personal-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Personal Loan EMI Calculator',
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

export default function PersonalLoanEMIPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Personal Loan EMI Calculator</strong> helps you calculate monthly installments 
      for unsecured personal loans based on loan amount, interest rate, and tenure. 
      Personal loans in India are <strong>instant, collateral-free loans</strong> with 
      interest rates ranging from <strong>10.49% to 24%</strong> p.a., depending on your 
      credit score and lender.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Instant Approval:</strong> Get personal loan approval within minutes with minimal documentation.</li>
      <li><strong>No Collateral Required:</strong> Completely unsecured loans - no property/assets needed.</li>
      <li><strong>Flexible Usage:</strong> Use for medical emergencies, weddings, education, travel, or any personal need.</li>
      <li><strong>Quick Disbursal:</strong> Loan amount credited to your account within 24 hours of approval.</li>
      <li><strong>Flexible Tenure:</strong> Repayment period from 1-5 years to suit your budget.</li>
    </ul>
  `);

  const useCasesContent = autoLinkContent(`
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="font-semibold text-blue-900 mb-2">✅ Good Use Cases</div>
        <ul class="text-sm text-slate-700 space-y-1 list-disc pl-4">
          <li>Medical emergencies</li>
          <li>Wedding expenses</li>
          <li>Home renovation</li>
          <li>Education fees</li>
          <li>Debt consolidation (high-interest credit cards)</li>
        </ul>
      </div>
      <div class="p-4 bg-red-50 rounded-lg border border-red-200">
        <div class="font-semibold text-red-900 mb-2">❌ Avoid For</div>
        <ul class="text-sm text-slate-700 space-y-1 list-disc pl-4">
          <li>Speculative investments</li>
          <li>Luxury purchases you can't afford</li>
          <li>Down payment for another loan</li>
          <li>Paying off existing personal loans</li>
          <li>Gambling or risky ventures</li>
        </ul>
      </div>
    </div>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is the current personal loan interest rate in India?',
      answer:
        'As of February 2026, personal loan interest rates range from 10.49% to 24% p.a. HDFC offers 10.50%-21%, SBI 11.15%-14.45%, and ICICI 10.75%-19%. Rates depend heavily on your credit score - 750+ gets best rates.',
    },
    {
      id: 'faq-2',
      question: 'Can I get a personal loan with a 650 credit score?',
      answer:
        'Yes, but expect higher interest rates (18%-24%). Credit score 650-699 is considered "fair". To get better rates, improve your score to 750+ by paying bills on time, reducing credit utilization, and clearing dues.',
    },
    {
      id: 'faq-3',
      question: 'What is the maximum personal loan amount I can get?',
      answer:
        'Most banks offer personal loans up to ₹40 lakhs. However, your eligibility depends on monthly income (typically 5-10x your monthly salary), credit score, existing EMIs, and employment stability. Salaried employees generally get higher amounts than self-employed.',
    },
    {
      id: 'faq-4',
      question: 'How long does personal loan approval take?',
      answer:
        'Digital lenders (Bajaj Finserv, HDFC Bank) offer instant approval within 5-10 minutes online. Traditional banks take 1-3 working days. Disbursal happens within 24-48 hours after approval. Pre-approved loans are credited instantly.',
    },
    {
      id: 'faq-5',
      question: 'Do I need income proof for a personal loan?',
      answer:
        'Yes, typically required. Salaried: Last 3 months salary slips + 6 months bank statements. Self-employed: Last 2 years ITR + bank statements. Some banks offer pre-approved loans to existing customers without additional income proof.',
    },
    {
      id: 'faq-6',
      question: 'What is the processing fee for personal loans?',
      answer:
        'Processing fee ranges from 1-3% of loan amount, typically ₹2,000 to ₹10,000. HDFC charges up to 2.5%, SBI up to 1.5%, ICICI up to 2.5%. Some banks waive fees during festive offers. GST (18%) is extra on processing fee.',
    },
    {
      id: 'faq-7',
      question: 'Can I prepay my personal loan without penalty?',
      answer:
        'Most banks allow prepayment for floating rate loans without penalty. Fixed rate loans may have 2-5% prepayment charges. Check your loan agreement. Prepaying early saves significant interest, especially in first 2-3 years.',
    },
    {
      id: 'faq-8',
      question: 'Is personal loan interest tax deductible?',
      answer:
        'No, personal loan interest is NOT tax deductible. Only home loan (Section 24), education loan (Section 80E), and business loan interest qualify for tax deductions. Personal loans are taken for personal expenses, not covered under any tax section.',
    },
    {
      id: 'faq-9',
      question: 'What happens if I default on personal loan EMI?',
      answer:
        'Defaulting leads to: (1) Late payment penalty (2%) + penal interest, (2) Credit score drops (can fall below 600), (3) Loan marked as NPA after 90 days, (4) Legal notice and potential lawsuit, (5) Future loan rejections. Contact lender immediately to restructure.',
    },
    {
      id: 'faq-10',
      question: 'Can I get a personal loan as a freelancer or gig worker?',
      answer:
        'Yes, but requirements are stricter. You need: (1) Minimum 2 years ITR showing stable income, (2) Good credit score (750+), (3) Regular bank account credits, (4) Some lenders like Bajaj Finserv, Fullerton India cater specifically to self-employed individuals.',
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
            name: 'Personal Loan EMI Calculator',
            url: '/loans/personal-loan/',
          },
        ]}
      />

      <CalculatorSchema
        name="Personal Loan EMI Calculator"
        description="Calculate personal loan EMI instantly. Check monthly repayment for unsecured personal loans from top banks & NBFCs."
        url="/loans/personal-loan/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <PersonalLoanSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Personal Loan EMI Calculator - Calculate Instant Personal Loan EMI" />
            <LanguageToggle path="/hi/loans/personal-loan" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Personal Loan EMI Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-purple-700">
                Calculate Instant Personal Loan EMI Online
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="personal-loan-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      BEST RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      HDFC Personal Loan {updatedLabel}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      10.50%
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
                      TYPICAL EMI
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹5L @ 12% for 3 years
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹16,607
                      <span className="text-base font-normal text-slate-600">
                        /month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      INSTANT APPROVAL
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Digital Lenders (750+ Score)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      5 Min
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        online
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <PersonalLoanEMIClient />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot
                id="personal-loan-after-calc"
                type="square"
                lazyLoad={false}
              />
            </div>

            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Personal Loan EMI Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      Personal loan EMI is calculated using the same standard
                      EMI formula used by banks and NBFCs:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        EMI = P × [r × (1 + r)<sup>n</sup>] / [(1 + r)
                        <sup>n</sup> − 1]
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
                        <span>= Personal loan amount (in ₹)</span>
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
                      Example: Personal Loan EMI
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Loan Amount (P):</strong>
                        </div>
                        <div>₹5,00,000</div>

                        <div>
                          <strong>Annual Interest Rate:</strong>
                        </div>
                        <div>12% p.a.</div>

                        <div>
                          <strong>Loan Tenure:</strong>
                        </div>
                        <div>3 years (36 months)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Monthly Interest Rate (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 12 ÷ (12 × 100) = 12 ÷ 1200 = 0.01
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: (1 + r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.01)<sup>36</sup> ≈ 1.4308
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Apply EMI Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            EMI = 5,00,000 × [0.01 × 1.4308] / [1.4308 − 1]
                          </div>
                          <div>EMI = 5,00,000 × 0.014308 / 0.4308</div>
                          <div>EMI ≈ 5,00,000 × 0.033228</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Monthly EMI:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹16,607
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Total Amount Payable:</span>
                          <strong>₹5,97,852</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest Paid:</span>
                          <strong className="text-red-600">₹97,852</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Understanding Personal Loan EMIs
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        Personal loans use the <strong>same EMI formula</strong>{' '}
                        as other loans, but interest rates are usually higher.
                      </li>
                      <li>
                        EMIs remain fixed, but the{' '}
                        <strong>
                          interest portion is highest in the initial months
                        </strong>
                        .
                      </li>
                      <li>
                        Prepaying in the first half of the tenure can save a
                        significant amount of interest.
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-4">
                    This personal loan EMI calculator uses the standard reducing
                    balance method, so results will be very close to the EMI
                    shown by banks and NBFCs.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Info Alert */}
            <Alert className="mt-6 bg-amber-50/50 border-amber-200 text-slate-600">
              <Info className="h-4 w-4 text-amber-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Smart Borrowing Tip
                </strong>
                Personal loans have the highest interest rates. Only borrow if
                absolutely necessary. Consider alternatives like gold loans,
                loan against FD, or borrowing from family first.
              </AlertDescription>
            </Alert>

            {/* Bank Comparison */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Personal Loan Interest Rates Comparison {updatedLabel}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">
                            Bank/NBFC
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Interest Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Loan Amount
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Processing Fee
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Tenure
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            10.50% - 21.00%
                          </td>
                          <td className="p-3">₹50k - ₹40L</td>
                          <td className="p-3">Up to 2.5%</td>
                          <td className="p-3">1-5 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            11.15% - 14.45%
                          </td>
                          <td className="p-3">₹25k - ₹20L</td>
                          <td className="p-3">Up to 1.5%</td>
                          <td className="p-3">1-5 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            10.75% - 19.00%
                          </td>
                          <td className="p-3">₹50k - ₹50L</td>
                          <td className="p-3">Up to 2.5%</td>
                          <td className="p-3">1-5 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            10.49% - 22.00%
                          </td>
                          <td className="p-3">₹50k - ₹40L</td>
                          <td className="p-3">Up to 2%</td>
                          <td className="p-3">1-5 years</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Bajaj Finserv</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            13.00% - 24.00%
                          </td>
                          <td className="p-3">₹1L - ₹40L</td>
                          <td className="p-3">Up to 3%</td>
                          <td className="p-3">1-5 years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *Rates depend on credit score, income, and relationship with
                    bank. Lower rates for 750+ credit score. Last updated:{' '}
                    {updatedLabel}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot
                id="personal-loan-infeed-1"
                type="banner"
                lazyLoad={true}
              />
            </div>

            {/* Promo Content */}
            <Card className="no-print my-6 border-purple-200 bg-purple-50/50 transition-colors hover:bg-purple-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-purple-900">
                    Need urgent funds?
                  </strong>

                  <Link
                    href="/guides/personal-loan-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-800"
                  >
                    <span>Read our Complete Personal Loan Guide (2026)</span>
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
                      Benefits of Personal Loans
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* Use Cases */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      When to Take a Personal Loan?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={useCasesContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="personal-loan-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Eligibility */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Personal Loan Eligibility Criteria
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        <strong>Age:</strong> 21-60 years (salaried), 25-65
                        years (self-employed)
                      </li>
                      <li>
                        <strong>Income:</strong> Minimum ₹25,000/month (salaried
                        in metro cities), ₹3-4 lakh/year (self-employed)
                      </li>
                      <li>
                        <strong>Credit Score:</strong> Minimum 650 (acceptable),
                        750+ (best rates & instant approval)
                      </li>
                      <li>
                        <strong>Employment:</strong> Minimum 2 years work
                        experience (salaried), 3 years business vintage
                        (self-employed)
                      </li>
                      <li>
                        <strong>EMI to Income Ratio:</strong> Total EMIs should
                        not exceed 50% of monthly income
                      </li>
                    </ul>
                  </section>

                  {/* 🎯 AD #5: AFTER ELIGIBILITY */}
                  <div className="no-print my-8">
                    <AdSlot
                      id="personal-loan-infeed-2"
                      type="banner"
                      lazyLoad={true}
                    />
                  </div>

                  {/* Documents */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Documents Required for Personal Loan
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                          For Salaried
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                          <li>PAN Card & Aadhaar Card</li>
                          <li>Last 3 months salary slips</li>
                          <li>Last 6 months bank statements</li>
                          <li>Employment certificate/offer letter</li>
                          <li>Form 16 (last 2 years)</li>
                          <li>Passport-size photographs</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">
                          For Self-Employed
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                          <li>PAN Card & Aadhaar Card</li>
                          <li>Last 2 years ITR with computation</li>
                          <li>Last 6-12 months bank statements</li>
                          <li>Business proof (GST, Shop Act)</li>
                          <li>Office address proof</li>
                          <li>Passport-size photographs</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Tips */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Tips to Get Best Personal Loan Deal
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        Check CIBIL score (free once a year) - improve to 750+
                        before applying
                      </li>
                      <li>
                        Compare at least 4-5 lenders - rates vary significantly
                        (10%-24%)
                      </li>
                      <li>
                        Negotiate with your existing bank - relationship banking
                        gets better rates
                      </li>
                      <li>
                        Borrow only what you need - higher EMI-to-income ratio
                        affects approvals
                      </li>
                      <li>
                        Read fine print - check for hidden charges, prepayment
                        penalties
                      </li>
                      <li>
                        Avoid taking loans from multiple lenders simultaneously
                        - red flag for credit bureaus
                      </li>
                    </ul>
                  </section>

                  {/* Related Calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Loan Calculators
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-purple-700 mb-1">
                                  General EMI Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate EMI for any type of loan
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-purple-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/loans/home-loan/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                🏠
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  Home Loan EMI Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Lower rates & tax benefits - better
                                  alternative
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
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* 🎯 AD #6: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot
                id="personal-loan-before-faq"
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
              <AdSlot id="personal-loan-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #8: SIDEBAR TOP */}
              <AdSlot id="personal-loan-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* 🎯 AD #10: SIDEBAR BOTTOM */}
              <AdSlot
                id="personal-loan-sidebar-bottom"
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
