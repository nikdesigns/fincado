import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CapitalGainsClient from './CapitalGainsClient';
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
import { ArrowRight, TrendingUp, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Capital Gains Tax Calculator India 2026 – STCG & LTCG',
  description:
    'Calculate exact tax on Stocks, Mutual Funds & Real Estate. Updated with 20% STCG, 12.5% LTCG, ₹1.25L exemption & no indexation rules. Accurate & easy to use.',
  keywords: [
    'capital gains calculator',
    'LTCG calculator',
    'STCG calculator',
    'capital gains tax India',
    'mutual fund tax calculator',
    'stock market tax calculator',
    'real estate capital gains tax',
    'LTCG on shares 2026',
    'capital gains tax on equity',
  ],
  alternates: {
    canonical: 'https://fincado.com/capital-gains-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/capital-gains-calculator/',
      'hi-IN': 'https://fincado.com/hi/capital-gains-calculator/',
    },
  },
  openGraph: {
    title: 'Capital Gains Tax Calculator 2026 (STCG & LTCG)',
    description:
      'Instantly calculate tax on your investment profits with latest budget rules. Equity, Debt & Real Estate covered.',
    url: 'https://fincado.com/capital-gains-calculator/',
    type: 'website',
  },
};

export default function CapitalGainsPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>Capital Gains Tax</strong> is the tax you pay on the profit earned from selling assets like stocks, mutual funds, or property. 
    Short-term gains (STCG) are taxed at higher rates, while long-term gains (LTCG) enjoy lower rates and exemptions. 
    Use this calculator to plan your investments and withdrawals smartly.
  </p>
  `);

  const budgetContent = autoLinkContent(`
    <p>The Union Budget 2024-25 brought major simplifications to capital gains taxation:</p>
    <ul class="list-disc pl-5 space-y-2 mt-3">
      <li><strong>Equity STCG:</strong> Increased to <strong>20%</strong> (was 15%)</li>
      <li><strong>Equity LTCG:</strong> Increased to <strong>12.5%</strong> with ₹1.25 Lakh exemption per year</li>
      <li><strong>Real Estate LTCG:</strong> Flat <strong>12.5%</strong> — indexation benefit removed</li>
      <li><strong>Debt Funds:</strong> Taxed at your slab rate (no LTCG benefit after April 2023)</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question:
        'What is the holding period for Equity to qualify as Long Term?',
      answer:
        'For equity shares and equity-oriented mutual funds, the holding period is more than 12 months. Anything sold within 12 months is Short-Term Capital Gain (STCG).',
    },
    {
      id: 'faq-2',
      question: 'How does the ₹1.25 Lakh LTCG exemption work?',
      answer:
        'In one financial year, the first ₹1,25,000 of Long-Term Capital Gains from all equity instruments combined is completely tax-free. You pay 12.5% only on the amount exceeding ₹1.25 Lakh.',
    },
    {
      id: 'faq-3',
      question: 'Are Debt Mutual Funds eligible for LTCG benefit?',
      answer:
        'No. Debt mutual funds purchased after 1st April 2023 are taxed at your regular income tax slab rate regardless of holding period. There is no LTCG benefit.',
    },
    {
      id: 'faq-4',
      question: 'Is indexation benefit available on property sale?',
      answer:
        'No. From FY 2024-25 onwards, the indexation benefit has been removed for real estate. LTCG is now a flat 12.5% without indexation.',
    },
    {
      id: 'faq-5',
      question: 'Do I need to pay advance tax on capital gains?',
      answer:
        'Yes. If your total tax liability (including capital gains tax) exceeds ₹10,000 in a year, you must pay advance tax in installments.',
    },
    {
      id: 'faq-6',
      question: 'Can I offset capital losses against gains?',
      answer:
        'Yes. Short-term losses can be set off against any capital gains. Long-term losses can only be set off against long-term gains. Unset-off losses can be carried forward for 8 years.',
    },
    {
      id: 'faq-7',
      question: 'Is 4% cess applicable on capital gains tax?',
      answer:
        'Yes. Health and Education Cess of 4% is applicable on the base tax amount. Our calculator automatically includes this.',
    },
    {
      id: 'faq-8',
      question: 'How accurate is this calculator?',
      answer:
        'Extremely accurate for FY 2026-27. It uses the exact rules from the latest Union Budget. Always consult a CA for complex cases involving multiple transactions or deductions.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Capital Gains Calculator',
            url: 'https://fincado.com/capital-gains-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Capital Gains Tax Calculator"
        description="Calculate STCG & LTCG tax on Stocks, Mutual Funds & Real Estate for 2026."
        url="https://fincado.com/capital-gains-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Capital Gains Tax Calculator – STCG & LTCG" />
            <LanguageToggle path="/hi/capital-gains-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            Capital Gains Calculator
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              STCG &amp; LTCG Tax on Stocks, MFs &amp; Property
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
            <span className="text-xs">• Latest Budget Rules Applied</span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="cg-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText content={introContent} />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <CapitalGainsClient />

            {/* Quick Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/income-tax-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Landmark className="w-4 h-4 mr-2" /> Full Income Tax Calculator
              </Link>
              <Link
                href="/lumpsum-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Lumpsum Calculator <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Rich Content Section */}
            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What are Capital Gains?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-brand-700" />
                      Latest Budget 2026 Rules
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-brand-50 border border-brand-200 p-6 rounded-xl">
                      <WikiText content={budgetContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Holding Period Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Holding Period Cheat Sheet
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="text-left p-4 border">Asset</th>
                            <th className="text-left p-4 border">Short Term</th>
                            <th className="text-left p-4 border">Long Term</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="p-4 border font-medium">
                              Equity / Mutual Funds
                            </td>
                            <td className="p-4 border">≤ 12 months → 20%</td>
                            <td className="p-4 border">
                              &gt; 12 months → 12.5% (after ₹1.25L exemption)
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium">
                              Real Estate
                            </td>
                            <td className="p-4 border">
                              ≤ 24 months → Slab Rate
                            </td>
                            <td className="p-4 border">
                              &gt; 24 months → 12.5% (No Indexation)
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium">
                              Debt Funds
                            </td>
                            <td
                              colSpan={2}
                              className="p-4 border text-center bg-blue-50"
                            >
                              Taxed at your Income Tax Slab Rate (no LTCG
                              benefit)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

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
              <AdSlot id="cg-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
