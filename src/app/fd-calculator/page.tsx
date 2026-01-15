import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FDClient from './FDClient';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'FD Calculator 2025 – Calculate Interest & Maturity Value',
  description:
    'Calculate Fixed Deposit maturity amount with our accurate FD Calculator. Check monthly/quarterly payouts, TDS deduction rules, and 2025 interest rates.',
  keywords: [
    'FD Calculator',
    'Fixed Deposit Calculator',
    'FD Interest Rates 2025',
    'Term Deposit Calculator',
    'FD TDS Calculator',
    'Cumulative vs Non-Cumulative FD',
    'Senior Citizen FD Rates',
  ],
  alternates: {
    canonical: 'https://fincado.com/fd-calculator/',
  },
  openGraph: {
    title: 'FD Calculator – Secure Your Savings',
    description:
      'Free tool to calculate FD maturity amount, total interest, and effective yield.',
    url: 'https://fincado.com/fd-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function FDPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Fixed Deposit (FD)</strong> is a low-risk investment instrument 
      offered by banks and NBFCs where you deposit a lump sum amount 
      for a fixed tenure at a pre-determined interest rate.
    </p>
    <p class="mt-4">
      Unlike stock market investments, FDs offer <strong>guaranteed returns</strong> 
      and capital safety, making them the preferred choice for conservative investors 
      and senior citizens.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <p>
      Almost any investor category can open an FD in India. Common eligibility includes:
    </p>
    <ul class="list-disc pl-5 space-y-2 list-inside mt-2">
      <li><strong>Resident Individuals:</strong> Including minors (with guardians).</li>
      <li><strong>Senior Citizens:</strong> Eligible for higher interest rates (usually 0.50% extra).</li>
      <li><strong>NRIs:</strong> Can open NRE (repatriable) or NRO (non-repatriable) FDs.</li>
      <li><strong>Organizations:</strong> HUFs, Partnership Firms, Trusts, and Companies.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Interest earned on Fixed Deposits is <strong>fully taxable</strong> as per your income tax slab. 
      It is added to your annual income under "Income from Other Sources".
    </p>
    <ul class="list-disc pl-5 space-y-2 list-inside mt-2">
      <li><strong>TDS Deduction:</strong> Banks deduct 10% TDS if interest exceeds ₹40,000 in a year (₹50,000 for Senior Citizens).</li>
      <li><strong>Form 15G/15H:</strong> You can submit these forms to the bank to avoid TDS if your total income is below the taxable limit.</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'fd-faq-1',
      question: 'Is interest on FD taxable?',
      answer:
        'Yes. Interest earned on Fixed Deposits is fully taxable and added to your total income. Banks deduct 10% TDS if interest exceeds ₹40,000 in a year (₹50,000 for senior citizens).',
    },
    {
      id: 'fd-faq-2',
      question: 'Can I withdraw my FD before maturity?',
      answer:
        'Yes, most FDs allow premature withdrawal. However, banks usually charge a penalty of 0.5%–1% on the interest rate. Note that 5-year Tax Saver FDs cannot be withdrawn early.',
    },
    {
      id: 'fd-faq-3',
      question:
        'What is the difference between Cumulative and Non-Cumulative FD?',
      answer:
        'In a Cumulative FD, interest is reinvested and paid at maturity, offering higher returns through compounding. In a Non-Cumulative FD, interest is paid monthly, quarterly, or yearly, making it suitable for regular income.',
    },
    {
      id: 'fd-faq-4',
      question: 'Is FD safe compared to other investments?',
      answer:
        'FDs are considered very safe as deposits up to ₹5 lakh per bank are insured by DICGC. However, returns may not always beat inflation compared to equity-based investments.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Fixed Deposit (FD) Calculator"
        description="Calculate the maturity amount and interest earned on your Fixed Deposits (FD) for all Indian banks."
        url="https://fincado.com/fd-calculator/"
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
              name: 'FD Calculator',
              url: 'https://fincado.com/fd-calculator/',
            },
          ]}
        />

        <header className="no-print my-4">
          {/* Top actions row */}
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Fixed Deposit (FD) Calculator" />
            <LanguageToggle path="/hi/fd-calculator" />
          </div>

          {/* Main heading */}
          <h1
            className="
      text-[clamp(1.9rem,4vw,2.6rem)]
      font-semibold
      leading-tight
      tracking-[-0.02em]
      text-slate-900
    "
          >
            Fixed Deposit (FD) Calculator
            <span className="block text-base sm:text-lg font-medium text-lime-700 mt-2">
              Calculate FD maturity value with interest & compounding
            </span>
          </h1>

          {/* Description */}
          <div className="max-w-3xl mt-4 text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
        <p>
          Secure your future with <strong>guaranteed returns</strong>.
          Instantly calculate Fixed Deposit maturity amount based on
          <strong>interest rate</strong>, <strong>tenure</strong>, and
          <strong>compounding frequency</strong>.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <FDClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="fd-after-calc" type="banner" />
            </div>

            {/* 📱 Mobile-Only Related Tools */}
            <div className="mobile-only-suggestions my-8 no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                More Savings Tools
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/rd-calculator/"
                  className="
        flex items-center justify-center gap-2
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        shadow-sm transition
        hover:border-emerald-300
        hover:bg-emerald-50
      "
                >
                  🔄 RD Calculator
                </Link>

                <Link
                  href="/ppf-calculator/"
                  className="
        flex items-center justify-center gap-2
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        shadow-sm transition
        hover:border-emerald-300
        hover:bg-emerald-50
      "
                >
                  🏦 PPF Returns
                </Link>
              </div>
            </div>

            {/* 🛡️ FD Guide Promo */}
            <div className="no-print my-8">
              <div className="flex items-start gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:p-6">
                {/* Icon */}
                <span className="text-2xl leading-none">🛡️</span>

                {/* Content */}
                <div>
                  <strong className="block text-base font-semibold text-emerald-800">
                    Looking for safer returns?
                  </strong>

                  <Link
                    href="/guides/fixed-deposit-guide/"
                    className="
          mt-1 inline-block
          text-sm font-semibold
          text-emerald-700
          underline underline-offset-4
          hover:text-emerald-800
        "
                  >
                    Read: How to Ladder FDs for Higher Interest →
                  </Link>
                </div>
              </div>
            </div>

            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- WHAT IS FD --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is a Fixed Deposit (FD)?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- ELIGIBILITY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Who is Eligible?
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={eligibilityContent} />
                    </div>
                  </section>

                  {/* --- AD SLOT (UNCHANGED POSITION) --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- HOW CALCULATOR HELPS --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This Calculator Helps Your Planning
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText
                        content={`
              <p>
                Manual calculation of compound interest can be tricky.
                This calculator helps you verify bank quotes and understand
                the impact of <strong>TDS (Tax Deducted at Source)</strong>.
              </p>
            `}
                      />
                    </div>

                    {/* ADVANTAGE GRID */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4 ">
                          <h4 className="font-semibold text-slate-900">
                            Exact Compounding
                          </h4>
                          <p className="mt-1 text-sm text-slate-600">
                            Most Indian banks compound interest quarterly. This
                            calculator uses the exact formula for accurate
                            maturity values.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900">
                            Tax Estimation
                          </h4>
                          <p className="mt-1 text-sm text-slate-600">
                            Understand your real returns after TDS. Estimate how
                            much actually reaches your bank account.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-slate-900">
                            Compare Tenures
                          </h4>
                          <p className="mt-1 text-sm text-slate-600">
                            Check whether a long-term FD performs better than
                            yearly renewals.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* --- TDS SECTION --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      TDS on FD Interest (2025 Rules)
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={taxContent} />
                    </div>
                  </section>

                  {/* --- FORMULA --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FD Maturity Formula
                    </h3>

                    <p className="text-slate-700">
                      For compound interest (reinvestment) fixed deposits, banks
                      use the following formula:
                    </p>

                    {/* Formula Box — SAME STYLE AS EMI / SIP */}
                    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{n \times t}" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul class="list-disc pl-5 text-sm">
                <li><strong>A</strong>: Maturity Amount</li>
                <li><strong>P</strong>: Principal Investment</li>
                <li><strong>r</strong>: Rate of Interest (in decimals)</li>
                <li><strong>n</strong>: Compounding Frequency (4 for Quarterly)</li>
                <li><strong>t</strong>: Time in Years</li>
              </ul>
            `}
                      />
                    </div>
                  </section>

                  {/* --- ADVANTAGES --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Key Advantages of Fixed Deposits
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText
                        content={`
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Capital Safety:</strong> FDs up to ₹5 Lakh per bank are insured by DICGC.</li>
                <li><strong>Liquidity:</strong> Premature withdrawal allowed (with small penalty).</li>
                <li><strong>Tax Saving:</strong> 5-Year Tax Saver FDs qualify for Section 80C.</li>
              </ul>
            `}
                      />
                    </div>
                  </section>
                </CardContent>
              </Card>
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

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <AdSlot id="fd-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
