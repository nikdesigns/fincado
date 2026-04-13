import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import BrokerageClient from './BrokerageClient';
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
import { ArrowRight, Target, Activity, AlertCircle } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'Brokerage Calculator 2026 - Zerodha, Groww & Upstox | Net P&L & Breakeven',
  description:
    'Calculate exact brokerage, STT, exchange charges, GST & Net P&L for Intraday, Delivery, Futures & Options. Updated with latest SEBI True-to-Label charges and 2026 STT rates.',
  keywords: [
    'brokerage calculator',
    'Zerodha brokerage calculator',
    'Groww brokerage calculator',
    'intraday brokerage calculator',
    'F&O brokerage calculator',
    'STT calculator',
    'stock market breakeven calculator',
    'delivery brokerage calculator',
    'options brokerage charges',
  ],
  alternates: {
    canonical: 'https://fincado.com/brokerage-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/brokerage-calculator/',
      'hi-IN': 'https://fincado.com/hi/brokerage-calculator/',
    },
  },
  openGraph: {
    title: 'Brokerage Calculator 2026 – Exact Net P&L & Breakeven',
    description:
      'See your real profit after all taxes and charges before you place a trade. Works perfectly for Zerodha, Groww, Upstox & Angel One.',
    url: 'https://fincado.com/brokerage-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function BrokerageCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    When trading in the Indian stock market, brokerage is just the tip of the iceberg. Your gross profit is heavily impacted by statutory taxes like <strong>STT (Securities Transaction Tax)</strong>, Exchange Transaction Charges, Stamp Duty, SEBI fees, and GST. 
    Our <strong>Brokerage Calculator</strong> uses the standard discount broker model (used by Zerodha, Groww, AngelOne, Upstox) to reveal your exact <strong>Net P&L</strong> and the points required to break even.
  </p>
  `);

  const chargesContent = autoLinkContent(`
    <p>The calculation engine has been updated with the latest regulatory changes:</p>
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>Revised STT (F&O):</strong> STT on Options is now 0.1% (up from 0.0625%) and STT on Futures is 0.02% (up from 0.0125%).</li>
      <li><strong>True-to-Label Exchange Charges:</strong> SEBI mandated a flat fee structure. NSE transaction charges are now calculated at a flat 0.00297% for cash equity and 0.03503% for options.</li>
      <li><strong>Brokerage:</strong> Assumes ₹0 for Delivery, and the lower of ₹20 or 0.03% for Intraday/Futures. Options are a flat ₹20 per executed order.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is the Breakeven Point in trading?',
      answer:
        'The breakeven point shows exactly how many points the stock or option must move in your favor just to cover the cost of taxes and brokerage. If you buy a stock at ₹100 and the breakeven is 0.50 points, you must sell at ₹100.50 just to make a ₹0 Net Profit.',
    },
    {
      id: 'faq-2',
      question: 'Why is STT so high on Delivery trades?',
      answer:
        'Securities Transaction Tax (STT) on Equity Delivery is 0.1% levied on BOTH the buy and sell sides. This makes it the highest tax component for long-term investors. Intraday and F&O trades only attract STT on the sell side.',
    },
    {
      id: 'faq-3',
      question: 'What is the "True-to-Label" charge update?',
      answer:
        'Previously, exchanges like NSE charged brokers based on slab rates, but brokers charged retail clients a flat, higher rate (pocketing the difference). SEBI recently mandated that brokers must charge clients exactly what the exchange charges them (True-to-Label). This calculator reflects these new, slightly lower flat rates.',
    },
    {
      id: 'faq-4',
      question: 'Is GST applied on the total turnover?',
      answer:
        'No. 18% GST is only applied to the service charges. This includes your Brokerage fee, the Exchange Transaction Charge, and the SEBI turnover fee. GST is not applied to STT or Stamp Duty.',
    },
    {
      id: 'faq-5',
      question: 'Does this calculator work for Zerodha and Groww?',
      answer:
        'Yes. Zerodha, Groww, Upstox, and AngelOne all follow the identical "Discount Brokerage" pricing model (Zero delivery, ₹20 per trade for Intraday/F&O). This calculator mimics their exact contract note structures.',
    },
    {
      id: 'faq-6',
      question: 'Can I use this for options trading?',
      answer:
        'Absolutely. The calculator supports Options (including premium-based STT and higher exchange charges) and shows the exact breakeven points for both Call and Put options.',
    },
    {
      id: 'faq-7',
      question: 'How accurate is this brokerage calculator?',
      answer:
        'Extremely accurate. It uses the exact same pricing model followed by Zerodha, Groww, Upstox and other discount brokers as of April 2026.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Brokerage Calculator',
            url: 'https://fincado.com/brokerage-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Brokerage Calculator (Intraday, Delivery & F&O)"
        description="Calculate exact breakeven points and net P&L after STT and exchange charges."
        url="https://fincado.com/brokerage-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Brokerage Calculator – Calculate STT & Net P&L" />
            <LanguageToggle path="/hi/brokerage-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Brokerage Calculator
            <span className="block max-w-fit text-base sm:text-lg font-medium text-[#577A30] mb-4 mt-2">
              Intraday, Delivery & F&O Charges
            </span>
          </h1>

          {/* LAST UPDATED BANNER */}
          <div className="flex items-center gap-2 text-sm font-medium bg-[#F7FDF1] border border-[#B0EC70] text-[#577A30] px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1">
              ✅ Updated for FY 2026-27
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-[#B0EC70]">
              April 12, 2026
            </span>
            <span className="text-xs">
              • Latest STT & True-to-Label Charges
            </span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="brokerage-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText content={introContent} />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <BrokerageClient />

            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/capital-gains-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Activity className="w-4 h-4 mr-2" /> Capital Gains Tax
                Calculator
              </Link>
              <Link
                href="/sip-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                SIP Calculator <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <Target className="w-6 h-6 text-emerald-600" />
                      The Importance of the Breakeven Point
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                      Latest Regulatory Updates
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-rose-50 border border-rose-100 p-6 rounded-xl">
                      <WikiText content={chargesContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Charge Matrix */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Standard Charges Matrix (Zerodha / Groww / Upstox)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg mt-4">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b">
                              Charge Type
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              Equity Delivery
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              Equity Intraday
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              F&O Options
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Brokerage
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-600 font-bold">
                              Zero
                            </td>
                            <td className="px-4 py-3 border-l">₹20 or 0.03%</td>
                            <td className="px-4 py-3 border-l">
                              Flat ₹20 / order
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              STT
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.1% on Buy & Sell
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.025% on Sell
                            </td>
                            <td className="px-4 py-3 border-l text-rose-600 font-medium">
                              0.1% on Sell
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Exchange (NSE)
                            </td>
                            <td className="px-4 py-3 border-l">0.00297%</td>
                            <td className="px-4 py-3 border-l">0.00297%</td>
                            <td className="px-4 py-3 border-l">0.03503%</td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Stamp Duty
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.015% on Buy
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.003% on Buy
                            </td>
                            <td className="px-4 py-3 border-l">
                              0.003% on Buy
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

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
              <AdSlot id="brokerage-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
