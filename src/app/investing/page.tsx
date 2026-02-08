import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InvestingClient from './InvestingClient';
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

// UI Components
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  Lightbulb,
  TrendingUp,
  HelpCircle,
  PieChart,
} from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Investing Planner 2026 – SIP, Lumpsum & Asset Allocation',
  description:
    'Plan your investments with our advanced Investing Planner. Calculate future value, check Asset Allocation (Equity vs Debt), and estimate inflation-adjusted returns.',
  keywords: [
    'Investing Planner',
    'SIP Calculator India',
    'Asset Allocation Tool',
    'Portfolio Planner',
    'Lumpsum Calculator',
    'Financial Goal Planner',
    'Equity vs Debt'
  ],
  alternates: {
    canonical: 'https://fincado.com/investing/',
  },
  openGraph: {
    title: 'Investing Planner – Plan Your Financial Freedom',
    description:
      'Free tool to plan SIPs, lumpsum investments, and asset allocation strategies.',
    url: 'https://fincado.com/investing/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function InvestingPage() {
  const introContent = autoLinkContent(`
    <p class="text-lg text-slate-600 leading-relaxed mb-6">
      <strong>Investment Planning</strong> is the process of matching your financial goals and objectives 
      with your financial resources. It is not just about buying stocks; it is about building a 
      diversified portfolio that balances <strong>Risk and Reward</strong>.
    </p>
    <p class="text-lg text-slate-600 leading-relaxed">
      A good plan helps you beat <strong>Inflation</strong> (the rising cost of living) and generate 
      wealth over the long term using the power of <strong>Compounding</strong>.
    </p>
  `);

  const allocationContent = autoLinkContent(`
    <ul class="space-y-3 mt-4 text-slate-700">
      <li class="flex gap-2"><span class="text-emerald-600 font-bold">• Equity (Stocks/Mutual Funds):</span> High risk, high reward (12-15%). Best for long-term goals (>7 years).</li>
      <li class="flex gap-2"><span class="text-blue-600 font-bold">• Debt (FD/Bonds/PPF):</span> Low risk, moderate reward (6-8%). Best for short-term goals and stability.</li>
      <li class="flex gap-2"><span class="text-amber-600 font-bold">• Gold:</span> Acts as a hedge against inflation and market crashes. Experts recommend 5-10% allocation.</li>
    </ul>
  `);

  const compoundingContent = autoLinkContent(`
    <p class="text-slate-600">
      Albert Einstein called <strong>Compound Interest</strong> the "eighth wonder of the world." 
      It allows your money to earn interest on interest. The longer you stay invested, the faster 
      your money grows.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="Investment Planner India"
        description="Plan SIPs, lumpsum investments, and asset allocation. Calculate CAGR and future portfolio value."
        url="https://fincado.com/investing/"
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'Investing Planner',
              url: 'https://fincado.com/investing/',
            }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-8">
          {/* --- LEFT MAIN COLUMN --- */}
          <div className="lg:col-span-8 min-w-0">
            {/* Header */}
            <header className="mb-10">
              <Badge
                variant="secondary"
                className="mb-4 bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1 font-bold uppercase tracking-wider"
              >
                Wealth Builder 2026
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Investing Planner
              </h1>

              <div className="mb-8 pt-4 border-t border-slate-100">
                <ShareTools title="Investing Planner" />
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 mb-8 flex justify-center no-print">
                <AdSlot id="investing-top" type="leaderboard" />
              </div>

              <WikiText
                content={`
                <p class="text-xl text-slate-500 leading-relaxed">
                  Plan your financial future. Simulate different allocation mixes
                  (Equity / Debt / Gold), calculate future values, and get diversification guidance.
                </p>
              `}
              />
            </header>

            {/* THE CALCULATOR */}
            <section className="mb-12">
              <InvestingClient />
            </section>

            {/* Ad After Calc */}
            <div className="my-12 no-print flex justify-center">
              <AdSlot id="investing-after-calc" type="banner" />
            </div>

            {/* Live Rates */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
                Current Fixed Deposit Rates
              </h2>
              <LiveRateTable type="fixedDeposit" />
            </section>

            {/* Promo Box */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center gap-4 no-print">
              <div className="bg-white p-3 rounded-full shadow-sm text-2xl text-emerald-600">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <strong className="block text-emerald-900 text-lg mb-1">
                  New to Investing?
                </strong>
                <Link
                  href="/guides/sip-investment-guide"
                  className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                >
                  Read: The Ultimate Beginner&apos;s Guide{' '}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* SEO Content */}
            <article className="prose prose-slate max-w-none mb-16">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-6 h-6 text-indigo-600" />
                What is Investment Planning?
              </h2>
              <WikiText content={introContent} />

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Asset Allocation Strategies
              </h3>
              <div className="overflow-hidden rounded-lg border border-slate-200 my-6 shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Profile
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Equity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Debt
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Aggressive
                      </td>
                      <td className="px-6 py-4 text-emerald-600 font-medium">
                        70% - 80%
                      </td>
                      <td className="px-6 py-4 text-slate-600">20% - 30%</td>
                      <td className="px-6 py-4">
                        <Badge variant="destructive">High</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Moderate
                      </td>
                      <td className="px-6 py-4 text-emerald-600 font-medium">
                        50%
                      </td>
                      <td className="px-6 py-4 text-slate-600">50%</td>
                      <td className="px-6 py-4">
                        <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                          Medium
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Conservative
                      </td>
                      <td className="px-6 py-4 text-emerald-600 font-medium">
                        20% - 30%
                      </td>
                      <td className="px-6 py-4 text-slate-600">70% - 80%</td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-500 text-white hover:bg-blue-600">
                          Low
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* In-Content Ad */}
              <div className="my-10 flex justify-center bg-slate-50 p-4 rounded-lg">
                <AdSlot
                  id="investing-square-inner"
                  type="square"
                  label="Advertisement"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Understanding Asset Classes
              </h3>
              <WikiText content={allocationContent} />

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                The Power of Compounding
              </h3>
              <WikiText content={compoundingContent} />

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Future Value Formula
              </h3>
              <p className="text-slate-600">
                The standard formula for Compound Interest used in planning:
              </p>

              <div className="py-6 overflow-x-auto">
                <BlockMath math="FV = PV \times (1 + r)^n" />
              </div>

              <WikiText
                content={`
                  <ul class="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                    <li><strong>FV</strong>: Future Value</li>
                    <li><strong>PV</strong>: Present Value (Investment)</li>
                    <li><strong>r</strong>: Annual Return Rate</li>
                    <li><strong>n</strong>: Time in Years</li>
                  </ul>
                `}
              />
            </article>

            {/* FAQs Accordion */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-amber-500" />
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="bg-white border rounded-lg mb-3 px-4"
                >
                  <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                    How much should I save monthly?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                    A general rule is the <strong>50-30-20 Rule</strong>: Spend
                    50% on needs, 30% on wants, and save at least{' '}
                    <strong>20%</strong> of your income for investments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="bg-white border rounded-lg mb-3 px-4"
                >
                  <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                    Are mutual funds safe?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                    Mutual funds are subject to market risks. However, over the
                    long term (10+ years), equity mutual funds have historically
                    outperformed inflation and other asset classes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white border rounded-lg mb-3 px-4"
                >
                  <AccordionTrigger className="font-semibold text-slate-800 hover:no-underline">
                    What is expense ratio?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                    It is the annual fee charged by mutual funds to manage your
                    money.
                    <strong>Direct Plans</strong> have lower expense ratios
                    compared to Regular Plans.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <AuthorBio />
          </div>

          {/* --- RIGHT SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-8 my-12">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex justify-center p-4 min-h-62.5 items-center">
                <AdSlot id="investing-sidebar" type="box" />
              </div>
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
