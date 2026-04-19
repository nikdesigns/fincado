import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import POMISClient from './POMISClient';
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
import { ArrowRight, Landmark, PiggyBank, Mail } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'POMIS Calculator 2026 - Post Office Monthly Income Scheme Interest',
  description:
    'Calculate exact monthly income from Post Office Monthly Income Scheme (POMIS) at 7.4% interest. Includes premature closure penalty simulator, ₹9L single / ₹15L joint limits.',
  keywords: [
    'POMIS Calculator',
    'Post Office Monthly Income Scheme',
    'POMIS Interest Calculator 2026',
    'POMIS monthly income',
    'Post Office MIS Calculator',
    'POMIS premature closure penalty',
    'Monthly income scheme post office'
  ],
  alternates: {
    canonical: 'https://fincado.com/pomis-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/pomis-calculator/',
      'hi-IN': 'https://fincado.com/hi/pomis-calculator/',
    },
  },
  openGraph: {
    title: 'POMIS Calculator 2026 – Guaranteed Monthly Income',
    description:
      'Calculate your exact monthly payout from India Post MIS. Includes dynamic premature closure penalty simulator.',
    url: 'https://fincado.com/pomis-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function POMISCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    The <strong>Post Office Monthly Income Scheme (POMIS)</strong> is a safe, government-backed savings scheme that provides a guaranteed monthly income. 
    It is ideal for senior citizens, retirees, and conservative investors who want steady cash flow without market risk.
  </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>Interest Rate:</strong> Currently <strong>7.4% p.a.</strong>, paid monthly.</li>
      <li><strong>Investment Limits:</strong> ₹9 Lakhs for single account, ₹15 Lakhs for joint account (up to 3 adults).</li>
      <li><strong>Tenure:</strong> Fixed 5-year lock-in period.</li>
      <li><strong>Capital Safety:</strong> 100% guaranteed by the Government of India.</li>
      <li><strong>Taxation:</strong> Interest is fully taxable as “Income from Other Sources”. No TDS by Post Office.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Who can open a POMIS account?',
      answer:
        'Any resident Indian adult can open a POMIS account. Minors above 10 years can operate it themselves. NRIs and HUFs are not eligible.',
    },
    {
      id: 'faq-2',
      question: 'What is the current POMIS interest rate?',
      answer:
        'As of 2026, the interest rate is 7.4% per annum, paid monthly. The rate is locked for the entire 5-year tenure once you invest.',
    },
    {
      id: 'faq-3',
      question: 'What are the investment limits for POMIS?',
      answer:
        '₹9 Lakhs maximum for a single account and ₹15 Lakhs maximum for a joint account (up to 3 adults).',
    },
    {
      id: 'faq-4',
      question: 'Can I close the POMIS account before 5 years?',
      answer:
        'Yes, after 1 year. Penalty applies: 2% if closed between 1–3 years, 1% if closed between 3–5 years. You cannot close it before 1 year.',
    },
    {
      id: 'faq-5',
      question: 'Is TDS deducted on POMIS interest?',
      answer:
        'No. The Post Office does not deduct TDS. However, the monthly interest is fully taxable and must be declared in your ITR under “Income from Other Sources”.',
    },
    {
      id: 'faq-6',
      question: 'What happens if I don’t withdraw the monthly interest?',
      answer:
        'The interest will remain in your savings account but will not earn any further interest. It is recommended to transfer it to a Recurring Deposit or Savings Account to earn more.',
    },
    {
      id: 'faq-7',
      question: 'Can I transfer my POMIS account to another Post Office?',
      answer:
        'Yes. You can transfer your POMIS account from one Post Office to any other Post Office in India free of cost.',
    },
    {
      id: 'faq-8',
      question: 'Is POMIS better than a Bank FD?',
      answer:
        'For many senior citizens, yes. POMIS offers higher interest (7.4%), guaranteed monthly payout, full government safety, and no market risk compared to most bank FDs.',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'POMIS Calculator',
            url: 'https://fincado.com/pomis-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="POMIS Calculator (Post Office Monthly Income Scheme)"
        description="Calculate monthly income and premature closure penalties for POMIS at 7.4%."
        url="https://fincado.com/pomis-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="POMIS Calculator – Post Office Monthly Income Scheme" />
            <LanguageToggle path="/hi/pomis-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            POMIS Calculator
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              Post Office Monthly Income Scheme
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
            <span className="text-xs">• 7.4% Interest Rate Applied</span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="pomis-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText content={introContent} />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <POMISClient />

            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/scss-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Landmark className="w-4 h-4 mr-2" /> SCSS Calculator
              </Link>
              <Link
                href="/rd-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Post Office RD Calculator{' '}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <Mail className="w-6 h-6 text-rose-600" />
                      What is POMIS?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Key Features & Benefits
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 p-6 rounded-xl">
                      <WikiText content={featuresContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Income Matrix */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <PiggyBank className="w-5 h-5 text-brand-700" />
                      POMIS Income Matrix (at 7.4%)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b">
                              Investment
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-emerald-700">
                              Monthly Income
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l">
                              Total Interest (5 Years)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 divide-y divide-slate-200">
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹1,00,000
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹617
                            </td>
                            <td className="px-4 py-3 border-l">₹37,000</td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹5,00,000
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹3,083
                            </td>
                            <td className="px-4 py-3 border-l">₹1,85,000</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹9,00,000 (Max Single)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹5,550
                            </td>
                            <td className="px-4 py-3 border-l">₹3,33,000</td>
                          </tr>
                          <tr className="bg-brand-100">
                            <td className="px-4 py-3 font-bold text-brand-700">
                              ₹15,00,000 (Max Joint)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹9,250
                            </td>
                            <td className="px-4 py-3 border-l font-semibold text-brand-700">
                              ₹5,55,000
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
              <AdSlot id="pomis-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
