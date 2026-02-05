import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SICalculatorClient from './SICalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react'; // ✅ Added Icons
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FAQSchema from '@/components/FAQSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ---------------- SEO METADATA (Optimized 2026) ---------------- */
export const metadata: Metadata = {
  title: 'Simple Interest Calculator India 2026 – Flat Rate Loan Interest',
  description:
    'Calculate Simple Interest (SI) instantly. Compare Flat Rate vs Reducing Balance interest. Useful for student loans, car loans, and short-term lending in 2026.',
  keywords: [
    'Simple Interest Calculator',
    'SI Calculator',
    'Flat Rate Interest Calculator',
    'Loan Interest Calculator',
    'Simple vs Compound Interest',
    'SI Formula',
    'Interest Rates 2026',
  ],
  alternates: {
    canonical: 'https://fincado.com/simple-interest-calculator/',
  },
  openGraph: {
    title: 'Simple Interest Calculator – Fast & Accurate (2026)',
    description:
      'Free tool to calculate interest on loans or investments using the Simple Interest formula.',
    url: 'https://fincado.com/simple-interest-calculator/',
    type: 'website',
  },
};

const faqItems = [
  {
    id: 'faq-1',
    question: 'Do banks use Simple Interest?',
    answer:
      'Most savings accounts and fixed deposits use Compound Interest. However, banks may use Simple Interest for very short-term loans or specific types of delay penalties.',
  },
  {
    id: 'faq-2',
    question: 'How do I calculate interest for months?',
    answer:
      'If the time is in months, divide the number of months by 12 to convert it into years for the formula (e.g., 6 months = 6/12 = 0.5 years).',
  },
  {
    id: 'faq-3',
    question: 'Is Simple Interest better for borrowers?',
    answer:
      'Generally, yes. Since interest doesn’t compound on unpaid interest, the total amount payable is usually lower than compound interest loans over the same period.',
  },
];

/* ---------------- PAGE ---------------- */

export default function SimpleInterestPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Simple Interest (SI)</strong> is a method of calculating interest where the interest 
      amount is fixed and calculated only on the original <strong>Principal</strong> amount. 
      It does not earn interest on interest (unlike Compound Interest).
    </p>
    <p class="mt-2">
      It is commonly used for short-term loans, car loans marketed as "Flat Rate," and informal 
      lending between friends and family.
    </p>
  `);

  const flatRateContent = autoLinkContent(`
    <p>
      <strong>The Flat Rate Trap:</strong> Many car dealers advertise a "Flat Interest Rate" (e.g., 7%) 
      which sounds cheap. However, because you pay interest on the <strong>full principal</strong> 
      throughout the tenure (even as you repay it), the effective rate is almost double (approx 13-14%).
    </p>
    <p class="mt-4">Always convert Flat Rate to <strong>Reducing Balance Rate</strong> before taking a loan.</p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Simple Interest Calculator"
        description="Quickly calculate simple interest and total repayment amount for personal loans or informal lending."
        url="https://fincado.com/simple-interest-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'Simple Interest Calculator',
              url: 'https://fincado.com/simple-interest-calculator/',
            },
          ]}
        />

        <header className="no-print mb-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Simple Interest Calculator" />
            <LanguageToggle path="/hi/simple-interest-calculator" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Simple Interest Calculator
            <span className="block mt-2 text-base sm:text-lg font-medium text-emerald-700">
              Quick & Non-Compounding Interest Calculation
            </span>
          </h1>

          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
                <p>
                  Calculate the interest earned or paid on a principal amount using the
                  <strong>Simple Interest</strong> method.
                  Ideal for short-term loans, informal lending, and quick estimates
                  without the complexity of compounding.
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-white border border-slate-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-slate-900">
                Budget 2026: Calculation Rules Unchanged
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Union Budget 2026 did not alter standard banking formulas.
                Simple Interest calculations remain applicable for flat-rate
                loans and short-term lending as per existing norms.
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <SICalculatorClient />

            <div className="no-print my-8">
              <AdSlot id="si-after-calc" type="banner" />
            </div>

            <LiveRateTable type="personalLoan" />

            {/* Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Compare Interest
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/compound-interest-calculator/"
                  className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  🔄 Compound Interest
                </Link>

                <Link
                  href="/emi-calculator/"
                  className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  🔢 EMI Calc
                </Link>
              </div>
            </div>

            {/* Promo Box */}
            <div className="no-print mt-8 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">
                🚗
              </div>
              <div className="flex-1">
                <strong className="block text-sm font-semibold text-emerald-800">
                  Buying a car on Flat Rate?
                </strong>
                <Link
                  href="/loans/car-loan/"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
                >
                  Check true EMI here →
                </Link>
              </div>
            </div>

            <div className="no-print my-10 flex justify-center">
              <AdSlot id="si-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* What is Simple Interest */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is Simple Interest?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* SI vs CI Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Simple Interest vs Compound Interest
                    </h3>
                    <div className="rounded-lg border border-slate-200 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              Feature
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Simple Interest (SI)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Compound Interest (CI)
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Formula
                            </TableCell>
                            <TableCell>Interest on Principal only</TableCell>
                            <TableCell>
                              Interest on Principal + Interest
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Growth
                            </TableCell>
                            <TableCell>Linear (Slow)</TableCell>
                            <TableCell>Exponential (Fast)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Returns
                            </TableCell>
                            <TableCell>Lower Returns</TableCell>
                            <TableCell className="text-emerald-700 font-medium">
                              Higher Returns
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Used In
                            </TableCell>
                            <TableCell>
                              Car Loans (Flat), Short-Term Loans
                            </TableCell>
                            <TableCell>Mutual Funds, FDs, Home Loans</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Flat Rate Trap */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      The “Flat Rate” Loan Trap
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={flatRateContent} />
                    </div>
                  </section>

                  {/* Formula */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Simple Interest Formula
                    </h3>
                    <p className="text-slate-700">
                      The standard formula for calculating simple interest is:
                    </p>
                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="SI = \frac{P \times R \times T}{100}" />
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>
                        <strong>SI</strong> = Simple Interest
                      </li>
                      <li>
                        <strong>P</strong> = Principal Amount
                      </li>
                      <li>
                        <strong>R</strong> = Rate of Interest per annum
                      </li>
                      <li>
                        <strong>T</strong> = Time Period (Years)
                      </li>
                    </ul>
                  </section>

                  {/* Benefits Grid */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This Calculator Helps You
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Quick Estimates
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Instantly calculate the true cost of “Flat Rate”
                          loans.
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Investment Checks
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Verify returns on bonds or non-compounding
                          instruments.
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Educational Use
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Understand how money grows linearly without
                          compounding.
                        </p>
                      </div>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

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
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left text-slate-900 font-medium hover:no-underline">
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
            <div className="sticky top-28 mb-6">
              <AdSlot id="si-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
