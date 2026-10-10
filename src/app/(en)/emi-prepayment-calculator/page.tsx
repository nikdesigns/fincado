import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import PrepaymentClient from './PrepaymentClient';
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
import RelatedCalculators from '@/components/RelatedCalculators';
import { ArrowRight, Zap, Home, ShieldCheck } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EMI Prepayment Calculator 2026 - Save Lakhs on Home Loan Interest',
  description:
    'Calculate exactly how much interest and tenure you will save by making a lumpsum part-payment or increasing your EMI. Best tool for home loan & personal loan prepayment planning.',
  keywords: [
    'EMI prepayment calculator',
    'home loan part payment calculator',
    'loan prepayment calculator',
    'interest saved on home loan',
    'reduce home loan tenure',
    'home loan foreclosure calculator',
    'lumpsum payment on loan'
  ],
  alternates: {
    canonical: 'https://fincado.com/emi-prepayment-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/emi-prepayment-calculator/',
      'hi-IN': 'https://fincado.com/hi/emi-prepayment-calculator/',
    },
  },
  openGraph: {
    title: 'EMI Prepayment Calculator – Save Lakhs on Interest',
    description:
      'See exactly how many years and lakhs you can save by making a part-payment on your home loan today.',
    url: 'https://fincado.com/emi-prepayment-calculator/',
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

export default function EMIPrepaymentPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>EMI Prepayment (Part-Payment)</strong> is one of the smartest financial moves you can make. 
    By paying extra money towards your loan (either as a lumpsum or by increasing your monthly EMI), you reduce the principal faster. 
    Since interest is calculated on the reducing balance, this saves you massive amounts of interest and shortens your loan tenure dramatically.
  </p>
  `);

  const strategiesContent = autoLinkContent(`
    <p>Two highly effective prepayment strategies:</p>
    <ul class="list-disc pl-5 space-y-3 mt-3">
      <li><strong>Annual Lumpsum Strategy:</strong> Use your yearly bonus, incentive, or any windfall to make a big one-time payment.</li>
      <li><strong>EMI Step-Up Strategy:</strong> As your salary grows, voluntarily increase your EMI by 5–10% every year.</li>
      <li><strong>Best Approach:</strong> Combine both — lumpsum + extra monthly EMI — to maximize savings.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Should I reduce EMI or reduce tenure after prepayment?',
      answer:
        'Always choose to reduce tenure (keep EMI same). This maximizes interest savings. Reducing EMI gives you immediate cash flow relief but costs you much more interest in the long run.',
    },
    {
      id: 'faq-2',
      question: 'Are there prepayment penalties on home loans?',
      answer:
        'As per RBI rules, banks cannot charge prepayment or foreclosure penalties on floating-rate home loans taken by individuals. Fixed-rate loans or business loans may still have penalties.',
    },
    {
      id: 'faq-3',
      question: 'Is it better to prepay the loan or invest the money?',
      answer:
        'If your loan interest rate is 8.5%, prepaying gives you a guaranteed, tax-free return of 8.5%. If you can earn significantly higher (12%+) consistently in mutual funds, investing may be better. Prepayment offers peace of mind.',
    },
    {
      id: 'faq-4',
      question: 'How does prepayment affect tax benefits?',
      answer:
        'Under Section 24(b), you can claim up to ₹2 Lakhs interest deduction per year. Aggressive prepayment reduces your interest paid, which may lower your tax deduction. Balance prepayment with tax planning.',
    },
    {
      id: 'faq-5',
      question: 'When is the best time to make a part-payment?',
      answer:
        'The earlier, the better. In the first 5–7 years of a 20-year loan, most of your EMI goes towards interest. Early prepayments save the most money.',
    },
    {
      id: 'faq-6',
      question: 'Does prepayment affect my CIBIL score?',
      answer:
        'No. Prepaying your loan early actually improves your CIBIL score as it shows responsible credit behaviour and reduces your overall debt burden.',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'EMI Prepayment Calculator',
            url: 'https://fincado.com/emi-prepayment-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="EMI Prepayment Calculator"
        description="Calculate interest saved and tenure reduced by prepaying your home loan or personal loan."
        url="https://fincado.com/emi-prepayment-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="EMI Prepayment Calculator – Save Lakhs on Interest" />
            <LanguageToggle path="/hi/emi-prepayment-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            EMI Prepayment Calculator
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              Save Interest &amp; Reduce Loan Tenure
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
            <span className="text-xs">• RBI Zero Penalty Rule Applied</span>
          </div>

          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="prepay-top" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText content={introContent} />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <PrepaymentClient />

            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/emi-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" /> Standard EMI Calculator
              </Link>
              <Link
                href="/sip-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Prepay vs Invest (SIP) <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                      <Zap className="w-6 h-6 text-emerald-600" />
                      How Prepayment Works
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Best Prepayment Strategies
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 p-6 rounded-xl">
                      <WikiText content={strategiesContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      The Golden Rule: Prepay Early
                    </h3>
                    <p className="text-slate-600">
                      The earlier you prepay, the more you save. In the first
                      5–7 years of a 20-year loan, most of your EMI goes towards
                      interest.
                    </p>
                  </section>

                  {/* Formula Block */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      EMI Prepayment Formula
                    </h3>
                    <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-600 mb-3">
                        Your existing EMI is calculated first using the
                        standard reducing-balance formula, then the
                        calculator recomputes your loan balance month by
                        month, subtracting your lumpsum upfront and adding
                        any extra monthly payment to the principal:
                      </div>

                      <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                        <div className="text-center text-xl font-serif">
                          EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> − 1]
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-slate-700 mt-4">
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">P</span>
                          <span>= Outstanding principal (after subtracting your lumpsum)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">r</span>
                          <span>= Monthly interest rate (annual rate ÷ 12 ÷ 100)</span>
                        </div>
                        <div className="flex gap-3 items-start ml-4">
                          <span className="min-w-10 font-mono font-semibold">n</span>
                          <span>= Remaining tenure in months</span>
                        </div>
                        <div className="mt-4 p-3 bg-brand-50 rounded border border-brand-200">
                          <p className="text-xs text-slate-700">
                            <strong>Note:</strong> The EMI amount itself stays
                            the same as your original loan (tenure-reduction
                            strategy). Each month, the calculator adds your
                            extra monthly payment straight to the principal,
                            so the balance — and future interest — shrinks
                            faster, ending the loan sooner instead of
                            lowering the EMI.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Worked Example */}
                    <div className="p-5 bg-brand-50 rounded-lg border border-brand-200">
                      <h4 className="font-semibold text-brand-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">🧮</span>
                        Example: ₹50,00,000 Loan with ₹5,00,000 Lumpsum
                      </h4>
                      <div className="space-y-3 text-sm text-slate-700">
                        <div className="grid grid-cols-2 gap-2">
                          <div><strong>Outstanding Principal:</strong></div>
                          <div>₹50,00,000</div>
                          <div><strong>Interest Rate:</strong></div>
                          <div>8.5% p.a.</div>
                          <div><strong>Remaining Tenure:</strong></div>
                          <div>15 years (180 months)</div>
                          <div><strong>Lumpsum Prepayment (today):</strong></div>
                          <div>₹5,00,000</div>
                        </div>

                        <div className="pt-3 border-t border-brand-300">
                          <strong className="block mb-2">Step 1: Calculate Original EMI</strong>
                          <div className="ml-4 font-mono text-sm">
                            r = 8.5 ÷ 12 ÷ 100 = 0.00708
                          </div>
                          <div className="ml-4 font-mono text-sm">
                            EMI ≈ ₹49,238 / month
                          </div>
                        </div>

                        <div className="pt-3">
                          <strong className="block mb-2">Step 2: Apply Lumpsum &amp; Recalculate</strong>
                          <div className="ml-4 font-mono text-sm">
                            New Balance = 50,00,000 − 5,00,000 = ₹45,00,000
                          </div>
                          <div className="ml-4 text-sm">
                            Keeping the same EMI (₹49,238), the loan now pays
                            off in fewer months since more of each EMI goes
                            toward principal.
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-white rounded border-2 border-brand-50">
                          <div className="text-base font-semibold text-slate-700 mb-1">
                            Total Interest Saved:
                          </div>
                          <div className="text-3xl font-semibold text-brand-700">
                            ≈ ₹11,50,000
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-brand-300 space-y-2">
                          <div className="flex justify-between">
                            <span>Original Tenure:</span>
                            <strong>15 years</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>New Tenure:</span>
                            <strong className="text-brand-700">≈ 11 years 2 months</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Tenure Saved:</span>
                            <strong className="text-brand-700">≈ 3 years 10 months</strong>
                          </div>
                        </div>
                      </div>
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
              <RelatedCalculators />
              <AuthorBio />
            </div>
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="prepay-sidebar" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
