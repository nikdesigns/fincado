import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EMIClient from './EMIClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
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
import { BookOpen, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EMI Calculator – Calculate Home, Car & Personal Loan EMI',
  description:
    'Use Fincado’s accurate EMI Calculator to check monthly installments, total interest, and amortization schedule. Compare rates and plan prepayments instantly.',
  keywords: [
    'EMI Calculator',
    'Loan EMI Calculator',
    'Home Loan EMI',
    'Car Loan EMI',
    'Personal Loan EMI',
    'Reduce Loan Interest',
    'Amortization Schedule',
    'Loan Repayment Schedule',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/emi-calculator',
  },
  openGraph: {
    title: 'EMI Calculator – Plan Your Loan Repayment',
    description:
      'Free tool to calculate EMI, Interest, and Tenure for any loan.',
    url: 'https://www.fincado.com/emi-calculator',
    type: 'website',
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
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
          {
            name: 'EMI Calculator',
            url: 'https://www.fincado.com/emi-calculator',
          },
        ]}
      />

      <CalculatorSchema
        name="Loan EMI Calculator"
        description="Calculate EMI for Home Loan, Car Loan, and Personal Loan. Check monthly repayment schedule and total interest."
        url="https://www.fincado.com/emi-calculator"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EMI Calculator" />
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
            <EMIClient />

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
                    href="/guides/emi-calculator-guide"
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>
                      Read our 2025 EMI Guide: Formulas & Smart Planning
                    </span>
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

                  {/* --- SECTION: FORMULA --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI Calculation Formula
                    </h3>

                    <p className="text-slate-700">
                      The formula used to calculate the Equated Monthly
                      Installment (EMI) is:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="E = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
                  <ul class="list-disc pl-5 space-y-2 text-sm">
                    <li><strong>E</strong> = EMI Amount</li>
                    <li><strong>P</strong> = Principal Loan Amount</li>
                    <li><strong>r</strong> = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)</li>
                    <li><strong>n</strong> = Loan Tenure in Months</li>
                  </ul>
                `}
                      />
                    </div>

                    <p className="text-sm text-slate-600">
                      This EMI calculator is maintained by{' '}
                      <strong>Fincado</strong>, a financial tools platform
                      focused on accuracy and transparency for Indian borrowers.
                    </p>
                  </section>

                  {/* --- RELATED CALCULATORS --- */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Loan Calculators
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Link href="/loans/home-loan" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
                                🏠
                              </span>

                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                                  Home Loan EMI Calculator
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  Plan affordability, tenure & tax benefits
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/loans/car-loan" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
                                🚗
                              </span>

                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                                  Car Loan EMI Calculator
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  Compare new & used car loan EMIs
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/loans/personal-loan" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
                                💼
                              </span>

                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                                  Personal Loan EMI Calculator
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  Estimate EMI for unsecured loans
                                </p>
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
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
