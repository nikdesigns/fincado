import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InflationClient from './InflationClient';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FAQSchema from '@/components/FAQSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BadgeCheck } from 'lucide-react'; // ✅ Icons

/* ================= SEO METADATA (Updated 2026) ================= */
export const metadata: Metadata = {
  title: 'Inflation Calculator India 2026 – Future Value of Money',
  description:
    'Calculate how inflation reduces your purchasing power. Check future cost of living, education, and medical expenses. Learn the Rule of 72.',
  keywords: [
    'Inflation Calculator India',
    'Purchasing Power Calculator',
    'Future Value of Money',
    'Cost of Living Calculator',
    'Real Rate of Return',
    'Rule of 72',
  ],
  alternates: {
    canonical: 'https://fincado.com/inflation-calculator/',
  },
  openGraph: {
    title: 'Inflation Calculator – Know the Real Value of Money',
    description:
      'Estimate how inflation reduces purchasing power and what your money will be worth in the future.',
    url: 'https://fincado.com/inflation-calculator/',
    type: 'website',
  },
};

const FAQS = [
  {
    question: 'Why do prices increase every year?',
    answer:
      'Prices rise due to increased demand (Demand-Pull), higher production costs (Cost-Push), or an increase in money supply by central banks.',
  },
  {
    question: 'How much is medical inflation in India?',
    answer:
      'Medical inflation in India is significantly higher than general inflation, often estimated between 10% to 14% annually. Always plan a separate buffer for healthcare.',
  },
  {
    question: 'Does gold beat inflation?',
    answer:
      'Yes, historically gold has acted as a hedge against inflation, maintaining its purchasing power over centuries. However, it does not generate wealth as fast as businesses (stocks).',
  },
];

export default function InflationPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Inflation</strong> is the silent killer of wealth. It is the rate at which the prices of goods 
      and services rise over time, effectively reducing the <strong>purchasing power</strong> of your money.
    </p>
    <p class="mt-4">
      For example, if inflation is 6%, a product that costs ₹100 today will cost ₹106 next year. 
      This means your savings must grow faster than inflation just to maintain their value.
    </p>
  `);

  const typesContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2 mt-2">
      <li><strong>CPI Inflation:</strong> The general inflation rate (approx 6%) affecting daily items like food and fuel.</li>
      <li><strong>Lifestyle Inflation:</strong> The increase in spending as your income grows (upgrading cars, phones).</li>
      <li><strong>Sectoral Inflation:</strong> Education and Medical costs in India rise much faster (10%-12%) than general inflation.</li>
    </ul>
  `);

  const rule72Content = autoLinkContent(`
    <p>
      The <strong>Rule of 72</strong> is a quick mental shortcut to estimate how long it will take for prices 
      to double at a given inflation rate.
    </p>
    <p class="mt-4">
      <em>Formula: 72 / Inflation Rate = Years to Double.</em><br/>
      Example: At 6% inflation, prices will double in <strong>12 years</strong> (72 / 6).
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Inflation Calculator"
        description="Calculate how inflation erodes purchasing power and estimate the future cost of goods and services."
        url="https://fincado.com/inflation-calculator/"
      />

      <FAQSchema
        faqs={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'Inflation Calculator',
              url: 'https://fincado.com/inflation-calculator/',
            },
          ]}
        />

        <header className="no-print my-10">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Inflation Calculator" />
            <LanguageToggle path="/hi/inflation-calculator" />
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Inflation Calculator
            <span className="block text-base sm:text-lg font-medium text-emerald-700 mt-2">
              Future Value of Money
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-4 text-sm text-slate-500">
            Understand how inflation erodes purchasing power over time • Updated
            2026
          </p>

          {/* Intro */}
          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
                <p>
                  Inflation silently reduces the value of your money every year.
                  <strong>
                    This calculator shows how much more you’ll need in the future
                    to maintain the same lifestyle.
                  </strong>
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-white border border-slate-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-slate-900">
                Budget 2026: Inflation Targets Maintained
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                The Union Budget 2026 reaffirmed the RBI&apos;s inflation
                targeting framework of <strong>4% (+/- 2%)</strong>. No new
                indirect taxes were introduced that would significantly spike
                the CPI index.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-8">
          <div className="lg:col-span-8 min-w-0 mb-10">
            <InflationClient />

            {/* Ad After Calc */}
            <div className="no-print my-12 flex justify-center">
              <AdSlot id="inflation-after-calc" type="banner" />
            </div>

            <LiveRateTable type="fixedDeposit" />

            {/* Mobile-Only Tools */}
            <div className="block lg:hidden my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Beat Inflation
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sip-calculator"
                  className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-3 text-center text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  📈 SIP Calculator
                </Link>
                <Link
                  href="/retirement-calculator"
                  className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-3 text-center text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  👴 Retire Calc
                </Link>
              </div>
            </div>

            {/* Promo Box */}
            <div className="no-print mt-8">
              <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">
                  🛡️
                </div>
                <div className="flex-1">
                  <strong className="block text-sm font-semibold text-emerald-800">
                    Protect your wealth
                  </strong>
                  <Link
                    href="/guides/gold-investment-guide"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
                  >
                    Read: Is Gold the best hedge against Inflation? →
                  </Link>
                </div>
              </div>
            </div>

            {/* Mid-Content Ad */}
            <div className="no-print my-10 flex justify-center">
              <AdSlot id="inflation-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Intro */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What Is Inflation?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* Real Returns Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Are You Beating Inflation? (Real Returns)
                    </h3>
                    <div className="rounded-lg border border-slate-200 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              Asset Class
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Avg Return
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Inflation (6%)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Real Return
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Savings A/C
                            </TableCell>
                            <TableCell>3.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="font-semibold text-red-600">
                              -3.0% (Loss)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Fixed Deposit
                            </TableCell>
                            <TableCell>7.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              +1.0%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Equity Mutual Fund
                            </TableCell>
                            <TableCell>12.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              +6.0% (Wealth)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Gold
                            </TableCell>
                            <TableCell>8.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              +2.0%
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* Ad Square */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Rule of 72 */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      The Rule of 72
                    </h3>
                    <WikiText content={rule72Content} />
                  </section>

                  {/* Types */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Types of Inflation in India
                    </h3>
                    <WikiText content={typesContent} />
                  </section>

                  {/* Formula */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Inflation Calculation Formula
                    </h3>
                    <p className="text-slate-700">
                      To calculate the future cost of an item based on
                      inflation:
                    </p>
                    <div className="py-6 overflow-x-auto bg-slate-50 px-4 rounded-md border border-slate-200">
                      <BlockMath math="FV = PV \times (1 + r)^n" />
                    </div>
                    <WikiText
                      content={`
                        <ul class="text-sm text-slate-600 space-y-1 mt-2">
                          <li><strong>FV</strong>: Future Value</li>
                          <li><strong>PV</strong>: Present Value</li>
                          <li><strong>r</strong>: Annual Inflation Rate</li>
                          <li><strong>n</strong>: Number of Years</li>
                        </ul>
                      `}
                    />
                  </section>

                  {/* How to Beat */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How to Beat Inflation
                    </h3>
                    <WikiText
                      content={`
                        <ul class="list-disc list-inside space-y-2 text-slate-700">
                          <li><strong>Invest in Equity:</strong> Only asset class that consistently beats inflation.</li>
                          <li><strong>Step-Up SIP:</strong> Increase investments as income grows.</li>
                          <li><strong>Avoid Idle Cash:</strong> Savings accounts guarantee loss of value.</li>
                        </ul>
                      `}
                    />
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
                    defaultValue="faq-0"
                    className="w-full space-y-2"
                  >
                    {FAQS.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`faq-${index}`}
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

          <aside className="lg:col-span-4 space-y-8 my-12">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex justify-center p-4 min-h-62.5 items-center">
                <AdSlot id="inflation-sidebar" type="box" />
              </div>
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
