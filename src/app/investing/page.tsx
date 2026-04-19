import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import InvestingClient from './InvestingClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable';
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
import { ArrowRight, TrendingUp, PieChart, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Investing Planner 2026 – SIP, Lumpsum & Smart Asset Allocation',
  description:
    'Plan your financial future with our advanced Investing Planner. Calculate SIP + Lumpsum future value, test different asset allocations (Equity, Debt, Gold), and see inflation-adjusted returns.',
  keywords: [
    'Investing Planner',
    'SIP Calculator India',
    'Lumpsum Calculator',
    'Asset Allocation Tool',
    'Portfolio Planner',
    'Financial Goal Planner',
    'Equity vs Debt Calculator',
    'Mutual Fund Return Calculator',
    'Compounding Calculator'
  ],
  alternates: {
    canonical: 'https://fincado.com/investing/',
    languages: {
      'en-IN': 'https://fincado.com/investing/',
      'hi-IN': 'https://fincado.com/hi/investing/',
    },
  },
  openGraph: {
    title: 'Investing Planner 2026 – Build Wealth with Smart Asset Allocation',
    description:
      'Free tool to plan SIPs, lumpsum investments, and perfect asset allocation. See exact future value and inflation-adjusted returns.',
    url: 'https://fincado.com/investing/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */
export default function InvestingPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Investment Planning</strong> is the process of matching your financial goals with the right mix of assets. 
      It is not just about buying mutual funds — it is about building a diversified portfolio that balances risk and reward while beating inflation over time.
    </p>
  `);

  const allocationContent = autoLinkContent(`
    <ul class="space-y-3 mt-4 text-slate-700">
      <li class="flex gap-2"><span class="text-emerald-600 font-semibold">• Equity (Stocks/Mutual Funds):</span> High growth potential (12–15% CAGR). Ideal for goals 7+ years away.</li>
      <li class="flex gap-2"><span class="text-blue-600 font-semibold">• Debt (FD/Bonds/PPF):</span> Stable returns (6–8%). Provides safety and regular income.</li>
      <li class="flex gap-2"><span class="text-amber-600 font-semibold">• Gold:</span> Hedge against inflation and market crashes. Experts recommend 5–15% allocation.</li>
    </ul>
  `);

  const compoundingContent = autoLinkContent(`
    <p class="text-slate-600">
      Albert Einstein called <strong>Compound Interest</strong> the eighth wonder of the world. 
      The earlier you start investing, the more powerful compounding becomes. Even small monthly SIPs can create massive wealth over time.
    </p>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'How much should I invest every month?',
      answer:
        'A good rule is the 50-30-20 rule: 50% on needs, 30% on wants, and at least 20% of your income towards investments (SIP + lumpsum).',
    },
    {
      id: 'faq-2',
      question: 'What is the best asset allocation for me?',
      answer:
        'It depends on your age and risk appetite. Young investors (under 35) can go 70-80% Equity. Conservative investors should keep higher Debt allocation.',
    },
    {
      id: 'faq-3',
      question: 'Are mutual funds safe?',
      answer:
        'Mutual funds are subject to market risks. However, over 10+ years, equity mutual funds have historically delivered 12–15% CAGR and beaten inflation comfortably.',
    },
    {
      id: 'faq-4',
      question: 'What is the expense ratio in mutual funds?',
      answer:
        'It is the annual fee charged by the fund house. Direct plans have significantly lower expense ratios (0.5–1%) compared to Regular plans (1.5–2.5%).',
    },
    {
      id: 'faq-5',
      question: 'Should I invest lumpsum or SIP?',
      answer:
        'SIP is better for most people because of rupee cost averaging. Lumpsum is ideal when you have a large amount available and a long investment horizon.',
    },
    {
      id: 'faq-6',
      question: 'How does inflation affect my investments?',
      answer:
        'Inflation reduces the purchasing power of money. Our calculator shows you the “Real Value” of your portfolio after adjusting for inflation.',
    },
    {
      id: 'faq-7',
      question: 'When should I rebalance my portfolio?',
      answer:
        'Rebalance once a year or when any asset class moves more than 10% away from your target allocation. This keeps risk under control.',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          { name: 'Investing Planner', url: 'https://fincado.com/investing/' }
        ]}
      />

      <CalculatorSchema
        name="Investing Planner 2026"
        description="Plan SIPs, lumpsum investments, and smart asset allocation with inflation-adjusted future value calculator."
        url="https://fincado.com/investing/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Investing Planner – SIP, Lumpsum & Asset Allocation" />
            <LanguageToggle path="/hi/investing" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Investing Planner
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              SIP + Lumpsum + Smart Asset Allocation
            </span>
          </h1>

          {/* LAST UPDATED BANNER */}
          <div className="flex items-center gap-2 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1">
              ✅ Updated for FY 2026-27
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              April 12, 2026
            </span>
            <span className="text-xs">• Latest Expected Returns Applied</span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="investing-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText content={introContent} />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Interactive Calculator */}
            <InvestingClient />

            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/sip-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                Pure SIP Calculator
              </Link>
              <Link
                href="/lumpsum-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Lumpsum Calculator <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <PieChart className="w-6 h-6 text-emerald-600" />
                      What is Investment Planning?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <Target className="w-5 h-5 text-emerald-600" />
                      Asset Allocation Strategies
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b">
                              Profile
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              Equity
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              Debt
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              Gold
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              Risk
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Aggressive
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-700 font-semibold">
                              70–80%
                            </td>
                            <td className="px-4 py-3 border-l">15–25%</td>
                            <td className="px-4 py-3 border-l">5%</td>
                            <td className="px-4 py-3">
                              <Badge variant="destructive">High</Badge>
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Balanced
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-700 font-semibold">
                              50%
                            </td>
                            <td className="px-4 py-3 border-l">35%</td>
                            <td className="px-4 py-3 border-l">15%</td>
                            <td className="px-4 py-3">
                              <Badge className="bg-amber-500 text-white">
                                Medium
                              </Badge>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Conservative
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-700 font-semibold">
                              20–30%
                            </td>
                            <td className="px-4 py-3 border-l">60–70%</td>
                            <td className="px-4 py-3 border-l">10%</td>
                            <td className="px-4 py-3">
                              <Badge className="bg-blue-500 text-white">
                                Low
                              </Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Understanding Asset Classes
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 p-6 rounded-xl">
                      <WikiText content={allocationContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      The Power of Compounding
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={compoundingContent} />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* Live Rates */}
            <section className="my-16">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
                Current Fixed Deposit Rates (2026)
              </h2>
              <LiveRateTable type="fixedDeposit" />
            </section>

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

            <div className="no-print mt-8">
              <AuthorBio />
            </div>
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="investing-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
