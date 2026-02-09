import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CAGRClient from './CAGRClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import FAQSchema from '@/components/FAQSchema';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, Info, ArrowRight } from 'lucide-react';
import { CAGRSchemas } from '@/components/schemas/CAGRSchemas';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';

const updatedLabel = getCurrentMonthYearLabel();

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'CAGR Calculator 2026 – Compound Annual Growth Rate Calculator India',
  description:
    'Free CAGR Calculator for India. Calculate Compound Annual Growth Rate (CAGR) of your investments, mutual funds, stocks, and portfolios. Compare returns accurately.',
  keywords: [
    'cagr calculator',
    'compound annual growth rate calculator',
    'investment return calculator',
    'cagr formula',
    'mutual fund cagr calculator',
    'stock return calculator',
    'portfolio cagr',
    'absolute return vs cagr',
  ],
  alternates: {
    canonical: 'https://fincado.com/cagr-calculator/',
  },
  openGraph: {
    title: 'CAGR Calculator – Calculate Investment Returns Accurately',
    description:
      'Calculate Compound Annual Growth Rate (CAGR) to measure true investment performance over time. Compare multiple investments easily.',
    url: 'https://fincado.com/cagr-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-cagr-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado CAGR Calculator',
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

export default function CAGRCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>CAGR (Compound Annual Growth Rate)</strong> is the standardized way to measure 
      investment returns over time. Unlike simple returns, CAGR accounts for compounding and 
      provides the <strong>average annual growth rate</strong> assuming consistent growth. It's 
      essential for comparing <strong>mutual funds</strong>, <strong>stocks</strong>, 
      <strong>real estate</strong>, and other investments with different time periods.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Accurate Comparison:</strong> Compare investments with different time periods on equal footing.</li>
      <li><strong>True Performance:</strong> CAGR smooths out volatility and shows true annualized performance.</li>
      <li><strong>Portfolio Evaluation:</strong> Measure your portfolio's historical performance against benchmarks.</li>
      <li><strong>Investment Decisions:</strong> Identify consistently performing assets versus short-term spikes.</li>
      <li><strong>Goal Tracking:</strong> Check if your investments are growing fast enough to meet financial goals.</li>
    </ul>
  `);

  const cagrVsAbsoluteContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">Metric</th>
            <th class="p-3 text-left font-semibold border">CAGR (Compound Annual Growth Rate)</th>
            <th class="p-3 text-left font-semibold border">Absolute Return</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">What it measures</td>
            <td class="p-3 border">Average annual growth rate with compounding</td>
            <td class="p-3 border">Total percentage gain/loss over period</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Best for</td>
            <td class="p-3 border text-emerald-700">Long-term investments (3+ years)</td>
            <td class="p-3 border">Short-term gains (under 1 year)</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Comparison</td>
            <td class="p-3 border">Easy to compare different time periods</td>
            <td class="p-3 border">Cannot compare different durations fairly</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Volatility</td>
            <td class="p-3 border">Smooths out ups and downs</td>
            <td class="p-3 border">Doesn't account for volatility</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Example</td>
            <td class="p-3 border">₹1L → ₹2L in 5 years = 14.87% CAGR</td>
            <td class="p-3 border">₹1L → ₹2L = 100% absolute return</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is CAGR and why is it important?',
      answer:
        "CAGR (Compound Annual Growth Rate) is the rate at which an investment would have grown if it grew at a steady rate annually. It's important because it provides a smoothed annual return that accounts for compounding, making it easier to compare investments with different time periods and volatility.",
    },
    {
      id: 'faq-2',
      question: 'How is CAGR different from average returns?',
      answer:
        'Average return is the arithmetic mean of yearly returns, while CAGR is the geometric mean that accounts for compounding. For example, if you gain 100% one year and lose 50% the next, average return is 25%, but CAGR is 0% (you end where you started). CAGR is more accurate for long-term performance.',
    },
    {
      id: 'faq-3',
      question: 'What is a good CAGR for Indian investments?',
      answer:
        'For equity mutual funds, 12-15% CAGR over 10+ years is considered good. Nifty 50 has delivered ~12% CAGR historically. For debt funds, 6-8% CAGR is typical. Real estate varies by location (8-12%). Fixed deposits offer 5-7%. Always compare CAGR against inflation (5-6%) to ensure real wealth creation.',
    },
    {
      id: 'faq-4',
      question: 'Can I use CAGR for SIP investments?',
      answer:
        'CAGR works best for lump sum investments. For SIP, use XIRR (Extended Internal Rate of Return) instead, as it accounts for multiple cash flows at different times. However, you can calculate CAGR for your total SIP corpus from start to end if you want a simple annualized view.',
    },
    {
      id: 'faq-5',
      question: 'How do I calculate CAGR manually?',
      answer:
        'CAGR formula: [(Final Value / Initial Value) ^ (1 / Number of Years)] - 1. Example: You invested ₹1,00,000 and it became ₹2,00,000 in 5 years. CAGR = [(2,00,000/1,00,000)^(1/5)] - 1 = [2^0.2] - 1 = 1.1487 - 1 = 0.1487 = 14.87%.',
    },
    {
      id: 'faq-6',
      question: 'What does negative CAGR mean?',
      answer:
        'Negative CAGR means your investment has lost value over time on an annualized basis. For example, -5% CAGR over 3 years means your investment decreased at an average rate of 5% per year. This happens when final value is less than initial investment.',
    },
    {
      id: 'faq-7',
      question: 'Can CAGR be used to predict future returns?',
      answer:
        'No. CAGR is a historical metric that measures past performance. It does not predict future returns. Markets are unpredictable, and past CAGR does not guarantee similar future growth. Use CAGR to evaluate past performance and compare options, not to forecast.',
    },
    {
      id: 'faq-8',
      question: 'Should I compare mutual funds using CAGR?',
      answer:
        'Yes, but ensure you compare similar fund categories (large-cap to large-cap) and use the same time period (e.g., 5-year CAGR). Also check other metrics like Sharpe ratio (risk-adjusted returns), standard deviation (volatility), and expense ratio before choosing a fund.',
    },
    {
      id: 'faq-9',
      question: 'What is the difference between CAGR and annualized return?',
      answer:
        'CAGR and annualized return are essentially the same for lump sum investments. Both express the average yearly growth rate. However, "annualized return" is sometimes used broadly for portfolios with multiple cash flows (where XIRR is more accurate), while CAGR specifically applies to single lump sum investments.',
    },
    {
      id: 'faq-10',
      question: 'Does CAGR account for dividends and bonuses?',
      answer:
        'Standard CAGR calculation uses only initial and final values. To include dividends, add them back to the final value before calculating. For mutual funds, use "Absolute Total Return" (includes dividends reinvested) as final value. For stocks, add all dividends received to sale price.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'CAGR Calculator',
            url: 'https://fincado.com/cagr-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="CAGR Calculator"
        description="Calculate Compound Annual Growth Rate (CAGR) for investments, mutual funds, stocks, and portfolios with accurate performance measurement."
        url="https://fincado.com/cagr-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <CAGRSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="CAGR Calculator – Calculate Investment Returns" />
            <LanguageToggle path="/hi/cagr-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                CAGR Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-indigo-700">
                Calculate Compound Annual Growth Rate for Your Investments
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* 🎯 AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="cagr-top" type="leaderboard" />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      Nifty 50 Historical CAGR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Last 20 years (2005-2025)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ~12%
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
                      Top Equity Funds CAGR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Best performers (10+ years)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      15-18%
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
                      Updated Data
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Last reviewed calculation
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR */}
            <CAGRClient />

            {/* 🎯 AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="cagr-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-indigo-50/50 border-indigo-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  CAGR vs Absolute Returns
                </strong>
                While absolute return shows total percentage gain, CAGR breaks
                it down to an average annual growth rate. Always use CAGR when
                comparing investments over different time periods.
              </AlertDescription>
            </Alert>

            {/* CAGR Formula Block */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    CAGR Formula and Calculation
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      CAGR is calculated using the following formula:
                    </div>

                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        CAGR = [(Final Value / Initial Value)
                        <sup>(1 / Number of Years)</sup>] - 1
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-32">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-32 font-mono font-semibold">
                          Final Value
                        </span>
                        <span>= Ending value of investment</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-32 font-mono font-semibold">
                          Initial Value
                        </span>
                        <span>= Starting value of investment</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-32 font-mono font-semibold">
                          Number of Years
                        </span>
                        <span>= Investment duration in years</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: CAGR Calculation
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Initial Investment:</strong>
                        </div>
                        <div>₹1,00,000</div>

                        <div>
                          <strong>Final Value:</strong>
                        </div>
                        <div>₹2,50,000</div>

                        <div>
                          <strong>Investment Period:</strong>
                        </div>
                        <div>5 years</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Calculate Ratio
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          Ratio = Final Value / Initial Value
                        </div>
                        <div className="ml-4 font-mono text-base">
                          Ratio = 2,50,000 / 1,00,000 = 2.5
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Apply Power
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          Growth Factor = 2.5<sup>(1/5)</sup> = 2.5
                          <sup>0.2</sup>
                        </div>
                        <div className="ml-4 font-mono text-base">
                          Growth Factor ≈ 1.2011
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Subtract 1 and Convert
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          CAGR = 1.2011 - 1 = 0.2011
                        </div>
                        <div className="ml-4 font-mono text-base">
                          CAGR = 0.2011 × 100 = 20.11%
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Result:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          20.11% CAGR
                        </div>
                        <div className="text-sm text-slate-600 mt-2">
                          Your investment grew at an average rate of 20.11% per
                          year
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Absolute Return:</span>
                          <strong>150% (₹1.5L gain)</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>CAGR:</span>
                          <strong className="text-green-700">
                            20.11% per year
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Benefits & Concepts */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Why Use CAGR for Investment Analysis
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* 🎯 AD #3: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="cagr-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad={true}
                    />
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      How to Use This CAGR Calculator Effectively
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        Enter the exact initial investment amount and
                        current/final value of your investment.
                      </li>
                      <li>
                        Ensure the time period is accurate in years (you can use
                        decimals for partial years, e.g., 3.5 years).
                      </li>
                      <li>
                        Compare CAGR across different investments to identify
                        best performers.
                      </li>
                      <li>
                        Always compare CAGR against inflation (5-6% in India) to
                        measure real wealth creation.
                      </li>
                      <li>
                        Use CAGR alongside other metrics like volatility
                        (standard deviation) and Sharpe ratio for complete
                        analysis.
                      </li>
                    </ul>
                  </section>

                  {/* Related calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Calculators
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/sip-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                📊
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  SIP Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Calculate SIP returns and track investment
                                  growth over time.
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
                                  Calculate returns on one-time investments with
                                  compounding.
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

            {/* CAGR vs Absolute Table */}
            <section className="no-print mt-10">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    CAGR vs Absolute Return
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-slate-700 leading-relaxed">
                    <WikiText content={cagrVsAbsoluteContent} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 🎯 AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="cagr-before-faq" type="leaderboard" lazyLoad={true} />
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

            {/* 🎯 AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="cagr-bottom" type="square" lazyLoad={true} />
            </div>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* 🎯 AD #6: SIDEBAR TOP */}
              <AdSlot id="cagr-sidebar-top" type="skyscraper" />

              <FinancialNavWidget />
              <SidebarCompareWidget />

              {/* 🎯 AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="cagr-sidebar-bottom" type="box" lazyLoad={true} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
