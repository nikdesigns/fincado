import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InflationClient from './InflationClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Investment Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import FAQSchema from '@/components/FAQSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ================= SEO METADATA ================= */
export const metadata: Metadata = {
  title: 'Inflation Calculator India 2025 – Future Value of Money',
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
  // 1. Prepare SEO Content with Auto-Links
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

      {/* FAQ Schema */}
      <FAQSchema
        faqs={FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
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

        <header className="no-print mb-10">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Inflation Calculator" />
            <LanguageToggle path="/hi/inflation-calculator" />
          </div>

          {/* Title */}
          <h1
            className="
      mb-3
      text-2xl
      sm:text-3xl
      lg:text-4xl
      font-semibold
      tracking-tight
      text-slate-900
    "
          >
            Inflation Calculator
            <span className="block text-base sm:text-lg font-medium text-lime-700 mt-2">
              Future Value of Money
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-4 text-sm text-slate-500">
            Understand how inflation erodes purchasing power over time
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
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <InflationClient />
            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="inflation-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (Where to invest to beat inflation) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Beat Inflation
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sip-calculator"
                  className="
        flex items-center justify-center
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-center text-sm font-medium text-slate-900
        transition hover:bg-slate-50
      "
                >
                  📈 SIP Calculator
                </Link>

                <Link
                  href="/retirement-calculator"
                  className="
        flex items-center justify-center
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-center text-sm font-medium text-slate-900
        transition hover:bg-slate-50
      "
                >
                  👴 Retire Calc
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
            <div className="no-print mt-8">
              <div
                className="
      flex items-start gap-3
      rounded-lg border border-emerald-200
      bg-emerald-50/70
      p-4
    "
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">
                  🛡️
                </div>

                {/* Content */}
                <div className="flex-1">
                  <strong className="block text-sm font-semibold text-emerald-800">
                    Protect your wealth
                  </strong>

                  <Link
                    href="/guides/gold-investment-guide"
                    className="
          mt-1 inline-flex items-center gap-1
          text-sm font-semibold text-emerald-700
          underline underline-offset-4
          hover:text-emerald-800
        "
                  >
                    Read: Is Gold the best hedge against Inflation? →
                  </Link>
                </div>
              </div>
            </div>

            {/* 💰 MID-CONTENT AD */}
            <div className="no-print my-10">
              <AdSlot id="inflation-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- INTRO --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                      What Is Inflation?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- REAL RETURNS TABLE --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Are You Beating Inflation? (Real Returns)
                    </h3>

                    <div className="rounded-lg border border-slate-200 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead>Asset Class</TableHead>
                            <TableHead>Avg Return</TableHead>
                            <TableHead>Inflation (6%)</TableHead>
                            <TableHead>Real Return</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Savings A/C
                            </TableCell>
                            <TableCell>3.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="font-semibold text-red-600">
                              -3.0% (Loss)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium">
                              Fixed Deposit
                            </TableCell>
                            <TableCell>7.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              +1.0%
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium">
                              Equity Mutual Fund
                            </TableCell>
                            <TableCell>12.0%</TableCell>
                            <TableCell>-6.0%</TableCell>
                            <TableCell className="font-semibold text-emerald-600">
                              +6.0% (Wealth Creation)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium">Gold</TableCell>
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

                  {/* --- AD SLOT --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- RULE OF 72 --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold">The Rule of 72</h3>
                    <WikiText content={rule72Content} />
                  </section>

                  {/* --- TYPES --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Types of Inflation in India
                    </h3>
                    <WikiText content={typesContent} />
                  </section>

                  {/* --- FORMULA --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold">
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
            <ul class="text-sm">
              <li><strong>FV</strong>: Future Value</li>
              <li><strong>PV</strong>: Present Value</li>
              <li><strong>r</strong>: Annual Inflation Rate</li>
              <li><strong>n</strong>: Number of Years</li>
            </ul>
          `}
                    />
                  </section>

                  {/* --- HOW TO BEAT --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      How to Beat Inflation
                    </h3>

                    <WikiText
                      content={`
            <ul class="list-disc list-inside space-y-2">
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

            {/* --- FAQs --- */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-6">
                  <h2 className="text-2xl font-semibold">
                    Frequently Asked Questions
                  </h2>

                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="faq-0"
                    className="w-full"
                  >
                    {FAQS.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`faq-${index}`}
                        className="border-slate-200"
                      >
                        <AccordionTrigger className="text-left text-slate-800">
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
            <div className="sticky top-5 mb-6">
              <AdSlot id="inflation-sidebar" type="box" />
            </div>

            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
