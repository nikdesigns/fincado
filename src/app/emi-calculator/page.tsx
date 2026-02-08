import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EMIClient from './EMIClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import 'katex/dist/katex.min.css';
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
import { BookOpen, ArrowRight, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EMISchemas } from '@/components/schemas/EMISchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EMI Calculator India - Home, Car & Personal Loan EMI Calculator 2026',
  description:
    'Free EMI Calculator for Home Loan, Car Loan & Personal Loan in India. Calculate monthly EMI, total interest & amortization schedule instantly. Used by 50,000+ borrowers. Compare bank rates & save lakhs on interest.',
  keywords: [
    'EMI Calculator',
    'Loan EMI Calculator',
    'Home Loan EMI',
    'Car Loan EMI',
    'Personal Loan EMI',
    'Reduce Loan Interest',
    'Amortization Schedule',
    'Loan Repayment Schedule'
  ],
  alternates: {
    canonical: 'https://fincado.com/emi-calculator/',
  },
  openGraph: {
    title: 'EMI Calculator – Calculate Loan EMI After Budget 2026',
    description:
      'Free tool to calculate EMI, Interest, and Tenure for any loan.',
    url: 'https://fincado.com/emi-calculator/',
    type: 'website',
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

export default function EMIPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>EMI (Equated Monthly Installment)</strong> is the fixed monthly
    amount paid towards loan repayment, consisting of principal and interest.
    Indian banks calculate EMI using the <strong>reducing balance method</strong>,
    where interest is charged only on the outstanding principal. 
    Compare with our <a href="/sip-calculator/">SIP Calculator</a> to understand 
    loan vs investment planning better.
  </p>
  `);

  const benefitsContent = autoLinkContent(`
    <p>
      This calculator helps you budget better, compare loan offers,
      and reduce total interest through informed planning.
      Most borrowers underestimate how much interest accumulates
      over long tenures until they see the amortization table.
    </p>
  `);

  const factorsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Loan Principal:</strong> The total amount you borrow. Higher principal means higher EMI.</li>
      <li><strong>Interest Rate:</strong> A lower <strong>Personal Loan Interest Rate</strong> or Home Loan rate reduces your monthly burden significantly.</li>
      <li><strong>Tenure:</strong> Choosing a longer tenure reduces your monthly EMI but increases the total interest payout over time.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Does EMI affect credit score?',
      answer:
        'Checking EMI using a calculator does not affect your credit score. However, missing EMI payments can negatively impact your credit score.',
    },
    {
      id: 'faq-2',
      question: 'Does prepayment reduce EMI or tenure?',
      answer:
        'By default, banks reduce the loan tenure after prepayment as it saves the most interest. EMI reduction can be requested separately.',
    },
    {
      id: 'faq-3',
      question: 'How do banks calculate EMI?',
      answer:
        'Banks calculate EMI using the reducing balance method, where interest is charged only on the outstanding principal.',
    },
    {
      id: 'faq-4',
      question: 'Is EMI different for fixed and floating interest rates?',
      answer:
        'Yes. Fixed-rate EMIs remain constant, while floating-rate EMIs can change when interest rates change.',
    },
    {
      id: 'faq-5',
      question: 'Can EMI change during the loan tenure?',
      answer:
        'Yes. EMI can change if interest rates change or if you make part prepayments.',
    },
    {
      id: 'faq-6',
      question: 'Did Budget 2026 change EMI calculation rules?',
      answer:
        'No. Union Budget 2026 did not introduce any changes to EMI calculation formulas for home loans, car loans, or personal loans. EMIs are still calculated using the reducing balance method.',
    },
    {
      id: 'faq-7',
      question: 'What is the EMI for a 20 lakh home loan?',
      answer:
        'For a ₹20 lakh home loan at 8.5% interest for 20 years, the EMI would be approximately ₹17,340 per month. The total interest paid would be around ₹21.62 lakhs over the loan tenure. Use our calculator above to get exact figures for different rates and tenures.',
    },
    {
      id: 'faq-8',
      question: 'Which bank has the lowest home loan EMI in India?',
      answer:
        'As of February 2026, SBI offers competitive home loan rates starting from 8.50%, followed by HDFC Bank (8.60%) and Axis Bank (8.75%). However, the actual rate depends on your credit score, income, and loan amount. Always compare total cost including processing fees.',
    },
    {
      id: 'faq-9',
      question: 'How to reduce EMI amount without changing loan tenure?',
      answer:
        'To reduce your EMI without extending tenure: 1) Make a lump sum prepayment to reduce principal, 2) Request bank to recalculate EMI on reduced balance, 3) Transfer loan to a bank with lower interest rate (balance transfer), 4) Improve credit score to negotiate rate reduction.',
    },
    {
      id: 'faq-10',
      question: 'Is EMI calculated on reducing or flat rate?',
      answer:
        'All major Indian banks use the REDUCING BALANCE METHOD for home loans, car loans, and personal loans. This means interest is calculated only on the outstanding principal amount, which decreases with each EMI payment. Flat rate method is outdated and no longer used.',
    }
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
          }
        ]}
      />

      <CalculatorSchema
        name="Loan EMI Calculator"
        description="Calculate EMI for Home Loan, Car Loan, and Personal Loan. Check monthly repayment schedule and total interest."
        url="https://fincado.com/emi-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <EMISchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EMI Calculator – Calculate Loan EMI After Budget 2026" />
            <LanguageToggle path="/hi/emi-calculator" />
          </div>
          <h1
            className="
              mb-4
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              tracking-tight
              text-slate-900
            "
          >
            EMI Calculator
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              Plan Your Loan Smartly
            </span>
          </h1>

          {/* 💰 AD 1: TOP LEADERBOARD (High Viewability) */}
          {/* <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="emi-top" type="leaderboard" />
          </div> */}

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
      <p>
        Use Fincado’s <strong>EMI Calculator</strong> to calculate your monthly loan EMI,
        total interest payable, and repayment schedule for
        <strong>Home Loans, Personal Loans, and Car Loans</strong>.
        Compare loan options, test prepayments, and plan your loan smartly
        <strong>before applying</strong>.
      </p>
    `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      MOST POPULAR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      EMI for ₹25 Lakh @ 8.5% (20Y)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹21,675
                      <span className="text-base font-normal text-slate-600">
                        /month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      BEST RATE TODAY
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      SBI Home Loan (Updated {updatedLabel})
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

                <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      SAVE INTEREST
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Prepay ₹1L on ₹20L loan
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹1.2L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        saved
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            <EMIClient />

            <Alert className="mt-6 bg-slate-50/50 border-slate-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Budget 2026 Update
                </strong>
                This calculator follows standard banking formulas. There were no
                changes to EMI calculation rules for home or personal loans in
                the Union Budget 2026.
              </AlertDescription>
            </Alert>

            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    EMI Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      The EMI (Equated Monthly Installment) for any loan (home,
                      car, personal, education) is calculated using the reducing
                      balance method:
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
                      Example EMI Calculation
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
                      Understanding the EMI Formula
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        EMI is calculated using the{' '}
                        <strong>reducing balance method</strong>, the same
                        method used by banks.
                      </li>
                      <li>
                        EMI stays constant, but the{' '}
                        <strong>interest part reduces</strong> and the{' '}
                        <strong>principal part increases</strong> over time.
                      </li>
                      <li>
                        You can use this formula for{' '}
                        <strong>any loan type</strong> – home, car, personal,
                        education, or business loans.
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-4">
                    This EMI calculator uses the same formula that banks and
                    NBFCs use, so your results will closely match official loan
                    amortization schedules.
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Key EMI Insights
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 text-base text-slate-600 list-disc pl-5">
                    <li>
                      Lower EMI often means higher total interest over time.
                    </li>
                    <li>
                      Even small prepayments can reduce interest by lakhs.
                    </li>
                    <li>
                      Tenure changes impact total repayment more than interest
                      rate changes.
                    </li>
                    <li>
                      EMI calculators help compare banks before applying for
                      loans.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
            {/* 💰 AD 2: AFTER RESULT (High Engagement) */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="emi-after-calc" type="banner" />
            </div>
            <LiveRateTable type="personalLoan" />
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Bank EMI Rates Comparison (Updated {updatedLabel})
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="p-3 text-left font-semibold">Bank</th>
                          <th className="p-3 text-left font-semibold">
                            Home Loan Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Car Loan Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Personal Loan Rate
                          </th>
                          <th className="p-3 text-left font-semibold">
                            Processing Fee
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">HDFC Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.60% - 9.50%
                          </td>
                          <td className="p-3">8.70% - 10.00%</td>
                          <td className="p-3">10.50% - 21.00%</td>
                          <td className="p-3">Up to 0.5%</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">SBI</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.50% - 9.65%
                          </td>
                          <td className="p-3">8.85% - 9.75%</td>
                          <td className="p-3">11.15% - 14.45%</td>
                          <td className="p-3">Up to 0.35%</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">ICICI Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.75% - 9.70%
                          </td>
                          <td className="p-3">9.00% - 10.50%</td>
                          <td className="p-3">10.75% - 19.00%</td>
                          <td className="p-3">Up to 2.5%</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 font-medium">Axis Bank</td>
                          <td className="p-3 text-emerald-700 font-semibold">
                            8.75% - 9.65%
                          </td>
                          <td className="p-3">9.25% - 11.50%</td>
                          <td className="p-3">10.49% - 22.00%</td>
                          <td className="p-3">Up to 2%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    *Rates are indicative and subject to change. (Updated{' '}
                    {updatedLabel})
                  </p>
                </CardContent>
              </Card>
            </section>
            {/* promo Content */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                {/* Icon Container */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <BookOpen className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    Want to master your EMI?
                  </strong>

                  <Link
                    href="/guides/emi-calculator-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Read our EMI Guide (Updated for 2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* Content Section for SEO */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- SECTION: WHAT IS EMI --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is an EMI?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- SECTION: HOW CALCULATOR HELPS --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This EMI Calculator Helps
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* --- AD SLOT (UNCHANGED) --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- SECTION: FACTORS --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Factors That Affect Your EMI
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={factorsContent} />
                    </div>
                  </section>

                  {/* --- RELATED CALCULATORS --- */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Financial Calculators
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {/* SIP Calculator */}
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
                                  Calculate returns from monthly SIP investments
                                  in mutual funds
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

                      {/* Lumpsum Calculator */}
                      <Link href="/lumpsum-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                💰
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  Lumpsum Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate returns on one-time investment in
                                  mutual funds
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

                      {/* PPF Calculator */}
                      <Link href="/ppf-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-purple-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-50 to-purple-100 text-purple-700 text-2xl">
                                🏦
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-purple-700 mb-1">
                                  PPF Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate Public Provident Fund maturity with
                                  tax benefits
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

                      {/* FD Calculator */}
                      <Link href="/fd-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-amber-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-50 to-amber-100 text-amber-700 text-2xl">
                                🎯
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-amber-700 mb-1">
                                  FD Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate Fixed Deposit maturity amount and
                                  interest earned
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-amber-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* RD Calculator */}
                      <Link href="/rd-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-orange-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-50 to-orange-100 text-orange-700 text-2xl">
                                📅
                              </span>

                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-orange-700 mb-1">
                                  RD Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate Recurring Deposit maturity with
                                  monthly contributions
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-orange-700">
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

                  {/* --- WHEN TO USE --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      When Should You Use an EMI Calculator?
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        Before applying for any loan to check affordability.
                      </li>
                      <li>
                        While comparing banks to find the cheapest option.
                      </li>
                      <li>
                        To calculate how much interest you save with
                        prepayments.
                      </li>
                    </ul>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* EMI Refrence Table */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-linear-to-br from-white to-slate-50">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Quick EMI Reference Guide
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-2">
                    Approximate monthly EMI per ₹1 Lakh loan at different
                    interest rates
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* 5 Years */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">
                        5 Years @ 8.5%
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        ₹2,052
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        per lakh/month
                      </div>
                    </div>

                    {/* 10 Years */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">
                        10 Years @ 8.5%
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        ₹1,237
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        per lakh/month
                      </div>
                    </div>

                    {/* 15 Years */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">
                        15 Years @ 8.5%
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        ₹984
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        per lakh/month
                      </div>
                    </div>

                    {/* 20 Years */}
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-500 mb-2">
                        20 Years @ 8.5%
                      </div>
                      <div className="text-2xl font-bold text-emerald-700">
                        ₹867
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        per lakh/month
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900">
                      <strong>Example:</strong> For a ₹25 lakh home loan at 8.5%
                      for 20 years, your EMI would be approximately{' '}
                      <strong>₹21,675/month</strong>
                      (₹867 × 25)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
            {/* Faq Section */}
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
            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="emi-sidebar" type="box" />
              {/* ✅ NEW WIDGET */}
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
