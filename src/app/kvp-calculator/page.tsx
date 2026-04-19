import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import KVPClient from './KVPClient';
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
import { ArrowRight, ShieldCheck, Landmark, TrendingUp } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'KVP Calculator 2026 - Kisan Vikas Patra Money Doubling Scheme',
  description:
    'Calculate exact maturity date and doubled amount for Kisan Vikas Patra (KVP). At 7.5% interest, your money doubles in 115 months (9 years 7 months). Safe government-backed scheme.',
  keywords: [
    'KVP Calculator',
    'Kisan Vikas Patra Calculator',
    'Money Doubling Scheme',
    'KVP interest rate 2026',
    'KVP maturity calculator',
    'Post Office double money scheme',
    'KVP vs FD',
    'KVP lock-in period'
  ],
  alternates: {
    canonical: 'https://fincado.com/kvp-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/kvp-calculator/',
      'hi-IN': 'https://fincado.com/hi/kvp-calculator/',
    },
  },
  openGraph: {
    title: 'KVP Calculator 2026 – Money Doubles in 115 Months',
    description:
      'Find out the exact date your money will double under the Government of India Kisan Vikas Patra scheme at 7.5% interest.',
    url: 'https://fincado.com/kvp-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function KVPCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>Kisan Vikas Patra (KVP)</strong> is a safe, government-backed savings scheme that guarantees your money will double in a fixed period. 
    It is ideal for conservative investors who want guaranteed returns without market risk. Currently, your investment doubles in exactly <strong>115 months (9 years and 7 months)</strong> at 7.5% p.a.
  </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>Guaranteed Doubling:</strong> At 7.5% interest, your money doubles in 115 months (9 years 7 months).</li>
      <li><strong>No Upper Limit:</strong> Invest any amount starting from ₹1,000 (in multiples of ₹100).</li>
      <li><strong>Lock-in Period:</strong> Strict lock-in of 2 years and 6 months (30 months).</li>
      <li><strong>Taxation:</strong> Interest earned is fully taxable as "Income from Other Sources". No Section 80C benefit.</li>
      <li><strong>Government Guarantee:</strong> 100% capital safety backed by the Government of India.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Who can invest in Kisan Vikas Patra (KVP)?',
      answer:
        'Any resident Indian adult can purchase KVP. It can be held individually, jointly (up to 3 adults), or on behalf of a minor. NRIs and HUFs are not eligible.',
    },
    {
      id: 'faq-2',
      question: 'How many months will my money take to double in 2026?',
      answer:
        'At the current 7.5% interest rate, your investment will exactly double in 115 months (9 years and 7 months).',
    },
    {
      id: 'faq-3',
      question: 'Is KVP tax-free?',
      answer:
        'No. KVP does not offer Section 80C deduction. The interest earned at maturity is fully taxable as per your income tax slab.',
    },
    {
      id: 'faq-4',
      question: 'What is the minimum and maximum investment in KVP?',
      answer:
        'Minimum investment is ₹1,000. There is no upper limit on how much you can invest.',
    },
    {
      id: 'faq-5',
      question: 'Can I withdraw money before maturity?',
      answer:
        'You cannot withdraw before 2 years and 6 months (30 months). After that, premature withdrawal is allowed with a reduced interest rate.',
    },
    {
      id: 'faq-6',
      question: 'Can I get a loan against KVP?',
      answer:
        'Yes. Almost all major banks accept KVP certificates as collateral for personal or business loans at lower interest rates.',
    },
    {
      id: 'faq-7',
      question: 'Is the interest rate fixed for the entire tenure?',
      answer:
        'Yes. Once you invest, the interest rate is locked for the entire tenure even if the government changes the rate for new investors.',
    },
    {
      id: 'faq-8',
      question: 'How does KVP compare with Bank FD?',
      answer:
        'KVP offers guaranteed doubling, full government safety, and no upper limit. Bank FDs offer lower rates and have deposit insurance up to ₹5 Lakhs only.',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'KVP Calculator',
            url: 'https://fincado.com/kvp-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="KVP Calculator (Kisan Vikas Patra)"
        description="Calculate exact maturity date and doubled amount for KVP at 7.5% interest."
        url="https://fincado.com/kvp-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="KVP Calculator – Money Doubling Scheme" />
            <LanguageToggle path="/hi/kvp-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            KVP Calculator
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              Kisan Vikas Patra – Money Doubling Scheme
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
            <span className="text-xs">• 7.5% Interest Rate Applied</span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="kvp-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText content={introContent} />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <KVPClient />

            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/fd-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Landmark className="w-4 h-4 mr-2" /> Compare with Bank FD
              </Link>
              <Link
                href="/ppf-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                PPF Calculator (Tax Free){' '}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      What is Kisan Vikas Patra?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Key Rules & Features
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 p-6 rounded-xl">
                      <WikiText content={featuresContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Comparison Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-brand-700" />
                      KVP vs Other Popular Schemes
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b">
                              Feature
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-brand-700">
                              KVP
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              Bank FD
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              PPF
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Risk Level
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-700 font-bold">
                              Zero Risk
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-600">
                              Low Risk
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-600">
                              Zero Risk
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Guaranteed Doubling
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-700 font-bold">
                              Yes (115 months)
                            </td>
                            <td className="px-4 py-3 border-l">No</td>
                            <td className="px-4 py-3 border-l">No</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Tax Benefit
                            </td>
                            <td className="px-4 py-3 border-l">None</td>
                            <td className="px-4 py-3 border-l">
                              Only 5-year Tax Saver FD
                            </td>
                            <td className="px-4 py-3 border-l text-emerald-700 font-bold">
                              E, E, E
                            </td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              Best For
                            </td>
                            <td className="px-4 py-3 border-l">
                              Doubling idle cash
                            </td>
                            <td className="px-4 py-3 border-l">
                              Short-term parking
                            </td>
                            <td className="px-4 py-3 border-l">
                              Long-term tax-free savings
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
              <AdSlot id="kvp-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
