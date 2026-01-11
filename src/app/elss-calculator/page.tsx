import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import ELSSClient from './ELSSClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
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

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'ELSS Calculator 2025 – Calculate Tax Saving Mutual Fund Returns',
  description:
    'Calculate returns on your ELSS Mutual Fund investments. Check how much tax you save under Section 80C (up to ₹46,800) and estimate maturity value.',
  keywords: [
    'ELSS Calculator',
    'Tax Saving Mutual Fund Calculator',
    'ELSS Return Calculator',
    'Section 80C Calculator',
    'SIP Tax Saving',
    'ELSS vs PPF Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/elss-calculator/',
  },
  openGraph: {
    title: 'ELSS Calculator – Save Tax & Build Wealth',
    description:
      'Invest in ELSS to save up to ₹46,800 in tax and earn high equity returns. Calculate now.',
    url: 'https://fincado.com/elss-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function ELSSPage() {
  const introContent = autoLinkContent(`
    <p class="mt-4">
      An <strong>ELSS (Equity Linked Savings Scheme)</strong> is the only type of Mutual Fund that qualifies for 
      tax deduction under <strong>Section 80C</strong> of the Income Tax Act.
    </p>
    <p class="mt-4">
      It serves a dual purpose: <strong>Tax Saving</strong> and <strong>Wealth Creation</strong>. 
      You can claim a deduction of up to ₹1.5 Lakh per year, potentially saving up to ₹46,800 in taxes 
      (for the 30% tax bracket).
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2 mt-4 pl-2">
      <li><strong>Lock-in Period:</strong> 3 Years (Shortest among all 80C options like PPF or FD).</li>
      <li><strong>Potential Returns:</strong> 12% - 15% (Historically higher than PPF/FD).</li>
      <li><strong>Investment Mode:</strong> SIP (Systematic Investment Plan) or Lump Sum.</li>
      <li><strong>Taxation:</strong> LTCG gains above ₹1.25 Lakh are taxed at 12.5%.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'Can I withdraw money from ELSS after 3 years?',
      answer:
        'Yes. ELSS has a mandatory 3-year lock-in period. After completion, you can redeem your units partially or fully. However, staying invested for 5–7 years is recommended for better long-term returns.',
    },
    {
      id: 'faq-2',
      question: 'Is SIP allowed in ELSS mutual funds?',
      answer:
        'Yes, SIP is the most popular way to invest in ELSS. Note that each SIP installment has its own independent 3-year lock-in period starting from the date of investment.',
    },
    {
      id: 'faq-3',
      question: 'How is ELSS taxed on redemption?',
      answer:
        'ELSS returns are taxed as Long-Term Capital Gains (LTCG). Gains up to ₹1.25 lakh per financial year are tax-free. Any gains above this limit are taxed at 12.5% without indexation.',
    },
    {
      id: 'faq-4',
      question: 'Is ELSS suitable for short-term investment?',
      answer:
        'No. ELSS is an equity-linked product and is best suited for long-term investors (5+ years). Short-term investments may be impacted by market volatility.',
    },
    {
      id: 'faq-5',
      question: 'What happens if I stop my ELSS SIP?',
      answer:
        'You can stop or pause your ELSS SIP anytime without penalty. However, the installments already invested will remain locked until each completes its individual 3-year lock-in period.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="ELSS Calculator India"
        description="Calculate returns and tax savings for ELSS Mutual Funds under Section 80C."
        url="https://fincado.com/elss-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
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
              name: 'ELSS Calculator',
              url: 'https://fincado.com/elss-calculator/',
            },
          ]}
        />

        <header className="no-print my-4">
          {/* Share + Language (same as other calculators) */}
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="ELSS Calculator — Tax Saving + Growth" />
            <LanguageToggle path="/hi/elss-calculator" />
          </div>

          {/* Title */}
          <h1
            className="
      text-[clamp(1.9rem,4vw,2.6rem)]
      font-semibold
      leading-tight
      tracking-[-0.02em]
      text-slate-900
    "
          >
            <span
              className="
        block
        text-2xl
        sm:text-3xl
        lg:text-4xl
        font-semibold
        tracking-tight
      "
            >
              ELSS Calculator
            </span>

            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Save tax under Section 80C and grow long-term wealth
            </span>
          </h1>

          {/* Intro */}
          <div className="max-w-3xl text-slate-600 text-base leading-relaxed mt-2">
            <WikiText
              content={`
        <p>
          Use this <strong>ELSS Calculator</strong> to estimate the maturity value
          of your tax-saving mutual fund investments. 
          See how much wealth you can build while saving up to
          <strong>₹1.5 lakh under Section 80C</strong> every year.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <ELSSClient />

            {/* 💰 AD 2: AFTER CALCULATOR (High Engagement) */}
            <div className="no-print my-8">
              <AdSlot id="elss-after-calc" type="banner" />
            </div>

            {/* Mobile Tools Grid */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Compare Tax Saving Options
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/ppf-calculator"
                  className="
        flex items-center justify-center gap-2
        rounded-lg border border-slate-200
        bg-white px-4 py-3
        text-sm font-medium text-slate-900
        transition
        hover:border-emerald-300
        hover:bg-emerald-50
      "
                >
                  🔒 <span>PPF Calculator</span>
                </Link>

                <Link
                  href="/sip-calculator"
                  className="
        flex items-center justify-center gap-2
        rounded-lg border border-slate-200
        bg-white px-4 py-3
        text-sm font-medium text-slate-900
        transition
        hover:border-emerald-300
        hover:bg-emerald-50
      "
                >
                  📈 <span>SIP Calculator</span>
                </Link>
              </div>
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print">
              <h2 className="text-2xl font-semibold text-slate-900">
                What is ELSS Mutual Fund?
              </h2>

              <WikiText content={introContent} />

              <h3 className="mt-8 text-xl font-semibold text-slate-900">
                Key Features of ELSS
              </h3>

              <WikiText content={featuresContent} />

              {/* 💰 AD 3 */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* --- COMPARISON TABLE --- */}
              <h3 className="mt-8 text-xl font-semibold text-slate-900">
                ELSS vs PPF: Quick Comparison
              </h3>

              <Card className="mt-4 border-none shadow-none m-0">
                <CardContent className="p-0">
                  <div className="table-responsive">
                    <Table className="border-collapse">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-left">Feature</TableHead>
                          <TableHead className="text-left">ELSS</TableHead>
                          <TableHead className="text-left">PPF</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-slate-700">
                            Returns
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-600">
                            12% – 15% (Expected)
                          </TableCell>
                          <TableCell className="text-slate-700">
                            7.1% (Fixed)
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium text-slate-700">
                            Lock-in Period
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-600">
                            3 Years
                          </TableCell>
                          <TableCell className="text-slate-700">
                            15 Years
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium text-slate-700">
                            Risk Level
                          </TableCell>
                          <TableCell className="font-semibold text-amber-600">
                            Moderate to High
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-600">
                            Risk Free
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium text-slate-700">
                            Tax on Returns
                          </TableCell>
                          <TableCell className="text-slate-700">
                            12.5% LTCG above ₹1.25L
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-600">
                            Fully Tax Free
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* --- ADVANTAGES GRID --- */}
              <h3 className="mt-10 text-xl font-semibold text-slate-900">
                Why Choose ELSS?
              </h3>

              <div className="advantage-grid mt-6">
                <div className="advantage-card">
                  <h4>Shortest Lock-in</h4>
                  <p>
                    With just a <strong>3-year lock-in</strong>, ELSS is the
                    most liquid tax-saving option compared to PPF (15 years) or
                    tax-saving FD (5 years).
                  </p>
                </div>

                <div className="advantage-card">
                  <h4>Inflation Beating Growth</h4>
                  <p>
                    Equity investments have historically outperformed inflation
                    over the long term, helping you grow real wealth.
                  </p>
                </div>

                <div className="advantage-card">
                  <h4>SIP Convenience</h4>
                  <p>
                    Start tax-saving with as little as{' '}
                    <strong>₹500 per month</strong>
                    through SIP—no need for a large lump sum.
                  </p>
                </div>
              </div>
            </article>

            {/* FAQs */}
            <section className="article no-print">
              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>Can I withdraw money after 3 years?</summary>
                  <p>
                    Yes, after the 3-year lock-in period ends, you can redeem
                    your units. However, it is recommended to stay invested for
                    5-7 years for better returns.
                  </p>
                </details>
                <details>
                  <summary>Is SIP allowed in ELSS?</summary>
                  <p>
                    Yes, SIP is the best way to invest in ELSS. However,
                    remember that <strong>each SIP installment</strong> has its
                    own 3-year lock-in period.
                  </p>
                </details>
                <details>
                  <summary>How is ELSS taxed?</summary>
                  <p>
                    ELSS gains are treated as Long Term Capital Gains (LTCG).
                    Gains up to ₹1.25 Lakh in a financial year are tax-free.
                    Gains above this limit are taxed at 12.5%.
                  </p>
                </details>
              </div>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div style={{ marginBottom: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="elss-sidebar" type="box" />
            </div>
            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
