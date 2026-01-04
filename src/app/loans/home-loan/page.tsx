import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HomeLoanClient from './HomeLoanClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import LanguageToggle from '@/components/LanguageToggle';
import FAQSchema from '@/components/FAQSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'Home Loan EMI Calculator 2025 – Check EMI, Eligibility & Tax Benefits',
  description:
    'Calculate Home Loan EMI, total interest, and tax benefits under Section 24(b) and 80C. Check eligibility, PMAY subsidy, and amortization schedule instantly.',
  keywords: [
    'Home Loan EMI Calculator',
    'Housing Loan Calculator',
    'SBI Home Loan EMI',
    'HDFC Home Loan Interest',
    'Home Loan Tax Benefit',
    'Section 80C',
    'Section 24b',
    'PMAY Calculator',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/loans/home-loan',
  },
  openGraph: {
    title:
      'Home Loan EMI Calculator 2025 – Check EMI, Eligibility & Tax Benefits',
    description:
      'Free tool to calculate Home Loan EMI, Interest, and Tax Benefits.',
    url: 'https://www.fincado.com/loans/home-loan',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function HomeLoanPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Home Loan</strong> is a secured loan provided by banks or NBFCs to purchase,
      construct, or renovate a residential property. In India, home loans offer significant 
      <strong>tax benefits</strong> and long repayment tenures of up to 30 years. Check EMI, eligibility, interest outgo, and tax savings before applying.
    </p>
    <p>
      This <strong>Home Loan EMI Calculator</strong> helps you calculate monthly EMI,
      total interest payable, and tax benefits before applying for a housing loan.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Home loans are the best tax-saving instruments in India. You can claim deductions under two sections:
    </p>
    <ul>
      <li><strong>Section 80C:</strong> Deduction up to ₹1.5 Lakh on <em>Principal Repayment</em>.</li>
      <li><strong>Section 24(b):</strong> Deduction up to ₹2 Lakh on <em>Interest Payment</em> for a self-occupied property.</li>
    </ul>
    <p>
      Use this calculator to split your EMI into principal and interest components to maximize these claims.
    </p>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'How does the Home Loan Calculator help me?',
      answer:
        'It helps you estimate your monthly EMI, total interest cost, and tax benefits, allowing you to choose the right loan amount and tenure.',
    },
    {
      id: 'faq-2',
      question: 'What are the tax benefits on a Home Loan?',
      answer:
        'You can claim up to ₹1.5 lakh under Section 80C on principal repayment and up to ₹2 lakh under Section 24(b) on interest.',
    },
    {
      id: 'faq-3',
      question: 'Does tenure affect Home Loan interest?',
      answer:
        'Yes. A 30-year loan has lower EMI but you pay significantly more interest compared to a 15-year loan.',
    },
    {
      id: 'faq-4',
      question: 'Which bank offers the lowest home loan EMI?',
      answer:
        'Home loan EMI depends on interest rate, tenure, and loan amount. PSU banks like SBI often offer lower rates, while private banks provide faster processing. Always compare EMIs using a home loan EMI calculator before choosing.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Home Loan EMI Calculator"
        description="Calculate home loan EMI, total interest payable, and tax benefits (Sec 80C, 24b) with amortization schedule."
        url="https://www.fincado.com/loans/home-loan"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Loans', url: 'https://www.fincado.com/loans' },
          {
            name: 'Home Loan EMI Calculator',
            url: 'https://www.fincado.com/loans/home-loan',
          },
        ]}
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Home Loan EMI Calculator 2025 – Check EMI, Eligibility & Tax Benefits" />
            <LanguageToggle path="/hi/loans/home-loan" />
          </div>
          <h1
            className="
            text-[clamp(1.9rem,4vw,2.6rem)]
            font-semibold
            leading-tight
            tracking-[-0.02em]
            text-slate-900
          "
          >
            <span
              className=" mb-4
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-semibold
              tracking-tight
              text-slate-900"
            >
              Home Loan EMI Calculator
            </span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              Check EMI, eligibility & tax benefits before you apply
            </span>
          </h1>
          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
    <p>
      Plan your dream home with our <strong>bank-grade accurate</strong> home loan calculator.
      Instantly check EMI, total interest cost, and <strong>tax savings</strong> under Section 24 & 80C.
    </p>
  `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <HomeLoanClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="home-loan-after-calc" type="banner" />
            </div>

            <LiveRateTable type="homeLoan" />

            <Card className="no-print my-8 border-emerald-200 bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-4 sm:p-6">
                {/* Icon */}
                <span className="text-2xl leading-none">🏡</span>

                {/* Content */}
                <div>
                  <strong className="block text-base font-semibold text-emerald-800">
                    Buying your first home?
                  </strong>

                  <Link
                    href="/guides/home-loan-guide"
                    className="
              mt-1 inline-block
              text-sm
              font-semibold
              text-emerald-700
              underline
              underline-offset-4
              hover:text-emerald-800
            "
                  >
                    Read our Complete Home Loan Guide (2025 Edition) →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- SECTION: WHAT IS HOME LOAN --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is a Home Loan?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- SECTION: TAX BENEFITS --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Tax Benefits of Home Loans (2025)
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxContent} />
                    </div>
                  </section>

                  {/* --- AD SLOT (UNCHANGED POSITION) --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- SECTION: FORMULA --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Home Loan EMI Formula
                    </h3>

                    <p className="text-slate-700">
                      Indian banks calculate Home Loan EMI using the standard
                      reducing balance formula:
                    </p>

                    {/* Formula Box — EXACT EMI STYLE */}
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <BlockMath math="E = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul>
                <li><strong>P</strong> = Principal Loan Amount</li>
                <li><strong>r</strong> = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)</li>
                <li><strong>n</strong> = Loan Tenure in Months</li>
              </ul>
            `}
                      />
                    </div>

                    <p className="text-sm text-slate-600">
                      This Home Loan calculator is maintained by{' '}
                      <strong>Fincado</strong> and follows RBI-aligned lending
                      formulas used by Indian banks and housing finance
                      companies.
                    </p>
                  </section>

                  {/* --- RELATED CALCULATORS (CARD GRID — IMPORTANT) --- */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Loan Calculators
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Link href="/emi-calculator" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 text-lg">
                                📊
                              </span>

                              <div>
                                <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
                                  EMI Calculator
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  Calculate EMI for any type of loan
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
                                  Personal Loan Calculator
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  Estimate EMI for unsecured loans
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
                                  Car Loan Calculator
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                  Compare new & used car loan EMIs
                                </p>
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

            {/* --- FAQ SECTION --- */}
            <section className="no-print my-12">
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
              <AuthorBio />
            </section>
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <AdSlot id="home-loan-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
