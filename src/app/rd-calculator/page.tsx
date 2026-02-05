import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RDClient from './RDClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import FAQSchema from '@/components/FAQSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'RD Calculator 2026 – Recurring Deposit Maturity & Interest',
  description:
    'Calculate RD maturity amount with quarterly compounding. Compare RD interest rates of SBI, HDFC, Post Office. Check TDS rules and RD vs SIP returns.',
  keywords: [
    'RD Calculator',
    'Recurring Deposit Calculator',
    'RD Interest Rates 2026',
    'Post Office RD Calculator',
    'RD vs SIP',
    'Recurring Deposit Tax',
    'Monthly Savings Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/rd-calculator/',
  },
  openGraph: {
    title: 'RD Calculator – Grow Your Monthly Savings',
    description:
      'Free tool to calculate RD maturity amount with accurate quarterly compounding logic.',
    url: 'https://fincado.com/rd-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function RDPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Recurring Deposit (RD)</strong> is a term deposit offered by banks and <strong>Post Offices</strong> 
      that allows individuals to deposit a fixed amount every month for a pre-defined tenure. 
      It is ideal for salaried people who want to save a portion of their income regularly.
    </p>
    <p class="mt-4">
      Unlike a <strong>Fixed Deposit (FD)</strong> where a lump sum is required, RD brings the 
      discipline of regular savings with interest rates similar to FDs.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Interest earned on Recurring Deposits is <strong>fully taxable</strong>. It is added to your annual income 
      and taxed according to your slab.
    </p>
    <ul class="list-disc pl-6 space-y-2 mt-4 text-slate-600">
      <li><strong>TDS:</strong> Banks deduct 10% TDS if interest exceeds ₹40,000/year (₹50,000 for Seniors).</li>
      <li><strong>Form 15G/15H:</strong> You can submit these forms to avoid TDS if your total income is below the taxable limit.</li>
    </ul>
  `);

  const comparisonContent = autoLinkContent(`
    <p>
      Investors often confuse <strong>RD vs SIP</strong>. While RD offers guaranteed returns (6.5%–7.5%), 
      <strong>SIPs in Mutual Funds</strong> offer market-linked returns (12%–15%) but come with higher risk. 
      RD is safer, but SIP beats inflation better in the long run.
    </p>
  `);

  const rdFaqItems = [
    {
      id: 'rd-faq-1',
      question: 'Is RD interest taxable?',
      answer:
        'Yes. Interest earned on a Recurring Deposit is added to your total income and taxed as per your income slab. Banks deduct TDS if interest exceeds ₹40,000 in a financial year (₹50,000 for senior citizens).',
    },
    {
      id: 'rd-faq-2',
      question: 'Can I increase my monthly installment later?',
      answer:
        'No. In a standard RD, the monthly installment amount is fixed at the time of opening. However, some banks offer Flexi RD or iWish RD products where you can vary the deposit amount.',
    },
    {
      id: 'rd-faq-3',
      question: 'What is the minimum tenure for an RD?',
      answer:
        'The minimum RD tenure is usually 6 months, while the maximum can go up to 10 years, depending on the bank.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Recurring Deposit (RD) Calculator"
        description="Calculate the maturity value of your Recurring Deposits with quarterly compounding interest."
        url="https://fincado.com/rd-calculator/"
      />

      <FAQSchema
        faqs={rdFaqItems.map((faq) => ({
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
              name: 'RD Calculator',
              url: 'https://fincado.com/rd-calculator/',
            },
          ]}
        />

        <header className="no-print my-4">
          {/* Share + Language (same as other calculators) */}
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Recurring Deposit (RD) Calculator" />
            <LanguageToggle path="/hi/rd-calculator" />
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
              Recurring Deposit (RD) Calculator
            </span>

            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Grow disciplined monthly savings with guaranteed returns
            </span>
          </h1>

          {/* Intro */}
          <WikiText
            content={`
      <p class="max-w-175 text-slate-600 mt-2">
        Turn small monthly savings into a large corpus. Use our bank-grade
        calculator to check your maturity amount with
        <strong> quarterly compounding</strong>.
      </p>
    `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <RDClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="rd-after-calc" type="banner" />
            </div>

            {/* 📱 Mobile-only Related Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Compare Savings
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sip-calculator/"
                  className="
        flex items-center justify-center gap-2
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        transition hover:bg-slate-50
      "
                >
                  📈 SIP Calculator
                </Link>

                <Link
                  href="/fd-calculator/"
                  className="
        flex items-center justify-center gap-2
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        transition hover:bg-slate-50
      "
                >
                  💰 FD Calculator
                </Link>
              </div>
            </div>

            {/* 🛡️ Promo Box */}
            <div
              className="
    no-print
    my-8
    flex items-start gap-3
    rounded-lg
    border border-emerald-200
    bg-emerald-50
    px-4 py-4
  "
            >
              <span className="text-2xl leading-none">🛡️</span>

              <div>
                <strong className="block text-sm font-semibold text-emerald-800">
                  Want safe returns?
                </strong>

                <Link
                  href="/guides/fixed-deposit-guide/"
                  className="
        mt-1 inline-block
        text-sm font-medium
        text-emerald-700
        underline
        underline-offset-2
        hover:text-emerald-800
      "
                >
                  Read: How to Ladder Deposits for Higher Returns →
                </Link>
              </div>
            </div>

            <article className="article content-for-seo no-print space-y-10">
              {/* --- INTRO --- */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is a Recurring Deposit (RD)?
                </h2>
                <WikiText content={introContent} />
              </section>

              {/* --- TAXATION --- */}
              <section className="space-y-4">
                <h3>RD Interest Taxation (TDS Rules – 2026)</h3>
                <WikiText content={taxContent} />
              </section>

              {/* 💰 AD 3 */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* --- COMPARISON --- */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  RD vs SIP: Which is better?
                </h3>
                <WikiText content={comparisonContent} />
              </section>

              {/* --- BENEFITS --- */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  How This Calculator Helps Your Planning
                </h3>

                <p className="text-slate-700">
                  Since RDs involve multiple cash flows (one deposit every
                  month), calculating the final maturity manually is difficult.
                </p>

                <div className="advantage-grid">
                  <div className="advantage-card">
                    <h4 className="font-semibold text-slate-900">
                      Plan Short-Term Goals
                    </h4>
                    <p>
                      Calculate exactly how much to save monthly to buy a car or
                      fund a vacation in 2 years.
                    </p>
                  </div>

                  <div className="advantage-card">
                    <h4 className="font-semibold text-slate-900">
                      Verify Bank Quotes
                    </h4>
                    <p>
                      Ensure your bank is calculating interest correctly using
                      the quarterly compounding formula.
                    </p>
                  </div>

                  <div className="advantage-card">
                    <h4 className="font-semibold text-slate-900">
                      Compare Returns
                    </h4>
                    <p>
                      See the difference in earnings between a 5-year RD and a
                      3-year RD instantly.
                    </p>
                  </div>
                </div>
              </section>

              {/* --- FORMULA --- */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  RD Interest Calculation Formula
                </h3>

                <p className="text-slate-700">
                  The interest on RD is compounded quarterly in most Indian
                  banks. The formula sums up the compound interest earned on
                  each individual monthly installment.
                </p>

                <div className="overflow-x-auto py-4 bg-slate-50 px-4 rounded-md">
                  <BlockMath math="M = \sum_{i=1}^{n} P \left(1 + \frac{r}{400}\right)^{4 \times \frac{t_i}{12}}" />
                </div>

                <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
                  <li>
                    <strong>M</strong>: Maturity Value
                  </li>
                  <li>
                    <strong>P</strong>: Monthly Installment Amount
                  </li>
                  <li>
                    <strong>r</strong>: Annual Interest Rate (%)
                  </li>
                  <li>
                    <strong>tᵢ</strong>: Time in months for the <em>i-th</em>{' '}
                    installment
                  </li>
                </ul>
              </section>

              {/* --- ADVANTAGES --- */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Advantages of RD
                </h3>

                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>
                    <strong>Disciplined Savings:</strong> Forces you to save a
                    fixed amount every month.
                  </li>
                  <li>
                    <strong>Guaranteed Returns:</strong> Interest rates are
                    locked at the time of opening.
                  </li>
                  <li>
                    <strong>Liquidity:</strong> Can be closed prematurely in
                    emergencies (with penalty).
                  </li>
                  <li>
                    <strong>Loan Facility:</strong> Avail a loan up to 90% of
                    your RD balance.
                  </li>
                </ul>
              </section>
            </article>

            {/* --- FAQ SECTION --- */}
            <section className="no-print my-12">
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
                    defaultValue={rdFaqItems[0]?.id}
                    className="space-y-2"
                  >
                    {rdFaqItems.map((faq) => (
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

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <AdSlot id="rd-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
