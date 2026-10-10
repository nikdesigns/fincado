import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SCSSClient from './SCSSClient';
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
import { ArrowRight, ShieldCheck, Landmark, PiggyBank } from 'lucide-react';

/* ---------------- RELATED CALCULATORS ---------------- */
const relatedCalculators = [
  {
    href: '/pomis-calculator/',
    icon: '📬',
    title: 'POMIS Calculator',
    description: 'Guaranteed monthly income from Post Office Monthly Income Scheme.',
  },
  {
    href: '/nsc-calculator/',
    icon: '🏦',
    title: 'NSC Calculator',
    description: '5-year post office savings certificate with Section 80C benefit.',
  },
  {
    href: '/kvp-calculator/',
    icon: '📜',
    title: 'KVP Calculator',
    description: 'See exactly when your Kisan Vikas Patra investment doubles.',
  },
  {
    href: '/fd-calculator/',
    icon: '💰',
    title: 'FD Calculator',
    description: 'Compare fixed deposit returns with flexible tenures.',
  },
];

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title:
    'SCSS Calculator 2026 - Senior Citizen Savings Scheme Interest & Payout',
  description:
    'Calculate exact quarterly interest and maturity amount from Senior Citizen Savings Scheme (SCSS) at current 8.2% rate. Max ₹30 Lakh limit. 100% Government guaranteed.',
  keywords: [
    'SCSS Calculator',
    'Senior Citizen Savings Scheme Calculator',
    'SCSS Interest Calculator 2026',
    'SCSS Quarterly Income',
    'Post Office SCSS Calculator',
    'Senior Citizen FD Calculator',
    'Retirement Income Calculator India',
    'SCSS 8.2% interest'
  ],
  alternates: {
    canonical: 'https://fincado.com/scss-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/scss-calculator/',
      'hi-IN': 'https://fincado.com/hi/scss-calculator/',
    },
  },
  openGraph: {
    title: 'SCSS Calculator 2026 – Guaranteed Quarterly Income',
    description:
      'Plan your retirement with confidence. Calculate exact quarterly payouts from the Government-backed Senior Citizen Savings Scheme at 8.2% interest.',
    url: 'https://fincado.com/scss-calculator/',
    type: 'website',
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

export default function SCSSCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    The <strong>Senior Citizen Savings Scheme (SCSS)</strong> is one of the safest and highest-yielding retirement schemes in India. 
    Backed by the Government of India, it offers a guaranteed <strong>8.2% p.a. interest</strong> with quarterly payouts directly credited to your bank account.
  </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>Quarterly Payouts:</strong> Interest is paid every 3 months (March 31, June 30, Sept 30, Dec 31).</li>
      <li><strong>High Interest Rate:</strong> Currently <strong>8.2% p.a.</strong> — significantly higher than most bank FDs.</li>
      <li><strong>Maximum Limit:</strong> Up to <strong>₹30 Lakhs</strong> per senior citizen.</li>
      <li><strong>Tax Deduction:</strong> Investment qualifies for deduction up to ₹1.5 Lakhs under Section 80C.</li>
      <li><strong>Government Guarantee:</strong> 100% capital safety backed by the Government of India.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Who is eligible for SCSS?',
      answer:
        'Any Indian citizen aged 60 years or above. Persons who have taken VRS or superannuation can open it between 55–60 years. Retired defense personnel can open it at 50 years.',
    },
    {
      id: 'faq-2',
      question: 'What is the current SCSS interest rate?',
      answer:
        'As of 2026, the interest rate is 8.2% per annum. Your rate is locked for the entire 5-year tenure once you invest.',
    },
    {
      id: 'faq-3',
      question: 'Is SCSS interest taxable?',
      answer:
        'Yes. Interest is fully taxable as per your income tax slab. TDS is deducted if interest exceeds ₹50,000 in a year. Senior citizens can submit Form 15H to avoid TDS if total income is below taxable limit.',
    },
    {
      id: 'faq-4',
      question: 'Can husband and wife both open SCSS accounts?',
      answer:
        'Yes. Each can invest up to ₹30 Lakhs individually, allowing a couple to invest ₹60 Lakhs total and earn significant combined quarterly income.',
    },
    {
      id: 'faq-5',
      question: 'What is the tenure of SCSS?',
      answer:
        'The standard tenure is 5 years. You can extend it for another 3 years after maturity by submitting an application within 1 year of maturity.',
    },
    {
      id: 'faq-6',
      question: 'Can I withdraw money before maturity?',
      answer:
        'Yes, after 1 year. Penalty applies: 1.5% if closed between 1–2 years, 1% if closed between 2–5 years.',
    },
    {
      id: 'faq-7',
      question: 'Is the principal amount safe?',
      answer:
        'Yes. SCSS is 100% guaranteed by the Government of India. Your principal is completely safe and returned at maturity.',
    },
    {
      id: 'faq-8',
      question: 'Is SCSS better than Bank FD for senior citizens?',
      answer:
        'Generally yes. Higher interest rate (8.2%), quarterly payouts, tax deduction under 80C, and full government guarantee make SCSS one of the best options for senior citizens.',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'SCSS Calculator',
            url: 'https://fincado.com/scss-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="SCSS Calculator (Senior Citizen Savings Scheme)"
        description="Calculate quarterly interest and maturity amount from SCSS at 8.2% rate."
        url="https://fincado.com/scss-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SCSS Calculator – Senior Citizen Savings Scheme" />
            <LanguageToggle path="/hi/scss-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            SCSS Calculator
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              Senior Citizen Savings Scheme
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
            <span className="text-xs">• 8.2% Interest Rate Applied</span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="scss-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText content={introContent} />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <SCSSClient />

            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/fd-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Landmark className="w-4 h-4 mr-2" /> Compare with FD Calculator
              </Link>
              <Link
                href="/swp-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Mutual Fund SWP Calculator{' '}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      What is SCSS?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Key Features & Benefits
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-brand-50 border border-brand-200 p-6 rounded-xl">
                      <WikiText content={featuresContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Income Matrix Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <PiggyBank className="w-5 h-5 text-brand-700" />
                      SCSS Income Matrix (at 8.2%)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-700">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-b">
                              Investment
                            </th>
                            <th className="px-4 py-3 font-semibold border-b border-l text-emerald-700">
                              Quarterly Income
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
                              ₹2,050
                            </td>
                            <td className="px-4 py-3 border-l">₹41,000</td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹5,00,000
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹10,250
                            </td>
                            <td className="px-4 py-3 border-l">₹2,05,000</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              ₹15,00,000
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹30,750
                            </td>
                            <td className="px-4 py-3 border-l">₹6,15,000</td>
                          </tr>
                          <tr className="bg-brand-100">
                            <td className="px-4 py-3 font-bold text-brand-700">
                              ₹30,00,000 (Max)
                            </td>
                            <td className="px-4 py-3 border-l font-bold text-emerald-700">
                              ₹61,500
                            </td>
                            <td className="px-4 py-3 border-l font-semibold text-brand-700">
                              ₹12,30,000
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Formula Block */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      SCSS Quarterly Interest Formula
                    </h3>
                    <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-600 mb-3">
                        SCSS pays simple interest every quarter, calculated
                        directly on the deposit amount:
                      </div>

                      <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                        <div className="text-center text-xl font-serif">
                          Quarterly Interest = (P × r) ÷ 4
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700 mt-4">
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">P</span>
                          <span>= Investment amount (up to ₹30 Lakhs)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">r</span>
                          <span>= Annual interest rate as decimal (0.082 for 8.2%)</span>
                        </div>
                        <div className="mt-4 p-3 bg-brand-50 rounded border border-brand-200">
                          <p className="text-xs text-slate-700">
                            <strong>Note:</strong> Interest is simple (not
                            compounded) and paid out every quarter (March 31,
                            June 30, Sept 30, Dec 31) instead of accumulating.
                            The principal is returned in full at maturity
                            (5 years).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Worked Example */}
                    <div className="p-5 bg-brand-50 rounded-lg border border-brand-200">
                      <h4 className="font-semibold text-brand-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">🧮</span>
                        Example: ₹15,00,000 SCSS Deposit
                      </h4>
                      <div className="space-y-3 text-sm text-slate-700">
                        <div className="grid grid-cols-2 gap-2">
                          <div><strong>Investment (P):</strong></div>
                          <div>₹15,00,000</div>
                          <div><strong>Interest Rate (r):</strong></div>
                          <div>8.2% p.a.</div>
                          <div><strong>Tenure:</strong></div>
                          <div>5 years</div>
                        </div>

                        <div className="pt-3 border-t border-brand-300">
                          <strong className="block mb-2">Step 1: Apply the Formula</strong>
                          <div className="ml-4 font-mono text-sm">
                            Quarterly Interest = (15,00,000 × 0.082) ÷ 4
                          </div>
                          <div className="ml-4 font-mono text-sm">
                            = 1,23,000 ÷ 4 = ₹30,750
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-white rounded border-2 border-brand-50">
                          <div className="text-base font-semibold text-slate-700 mb-1">
                            Guaranteed Quarterly Income:
                          </div>
                          <div className="text-3xl font-semibold text-brand-700">
                            ₹30,750 / quarter
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-brand-300 space-y-2">
                          <div className="flex justify-between">
                            <span>Total Interest (5 Years):</span>
                            <strong className="text-brand-700">₹6,15,000</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Maturity Amount:</span>
                            <strong>₹21,15,000</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* Related Calculators */}
            <section className="no-print mt-12 space-y-5">
              <h3 className="text-xl font-semibold text-slate-900">
                Related Small Savings Calculators
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedCalculators.map((calc) => (
                  <Link href={calc.href} key={calc.href} className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 text-2xl">
                            {calc.icon}
                          </span>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900 group-hover:text-brand-700 mb-1">
                              {calc.title}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {calc.description}
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-brand-700">
                              <span>Calculate Now</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

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
              <AdSlot id="scss-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
