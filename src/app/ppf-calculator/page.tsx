import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import PPFClient from './PPFClient';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'PPF Calculator 2025 – Public Provident Fund Interest & Maturity',
  description:
    'Calculate PPF maturity amount, interest earned, and tax-free returns. Check current interest rates, loan against PPF rules, and withdrawal limits.',
  keywords: [
    'PPF Calculator',
    'Public Provident Fund Calculator',
    'PPF Interest Rate 2025',
    'Tax Free Investment',
    'Section 80C Investment',
    'PPF Maturity Calculator',
    'Post Office PPF Scheme',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/ppf-calculator',
  },
  openGraph: {
    title: 'PPF Calculator – Tax-Free Wealth Builder',
    description:
      'Free tool to calculate PPF returns with yearly compounding and tax-benefit analysis.',
    url: 'https://www.fincado.com/ppf-calculator',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function PPFPage() {
  const introContent = autoLinkContent(`
    <p>
      The <strong>Public Provident Fund (PPF)</strong> is a long-term savings scheme backed by the 
      Government of India. It allows you to build a retirement corpus while saving on taxes.
    </p>
    <p>
      It is one of the few investment options that fall under the <strong>EEE (Exempt-Exempt-Exempt)</strong> 
      category, meaning your investment, interest earned, and maturity amount are all <strong>100% Tax-Free</strong>.
    </p>
  `);

  const eligibilityContent = autoLinkContent(`
    <ul class="list-disc pl-5">
      <li><strong>Resident Individuals:</strong> Any Indian resident can open a PPF account.</li>
      <li><strong>Minors:</strong> Parents can open an account on behalf of a minor child.</li>
      <li><strong>Restrictions:</strong> <strong>NRIs</strong> and <strong>HUFs</strong> cannot open new PPF accounts. However, existing NRI accounts can continue until maturity.</li>
    </ul>
  `);

  const loanContent = autoLinkContent(`
    <p>
      You can take a loan against your PPF balance from the <strong>3rd to the 6th financial year</strong>. 
      The loan interest rate is usually <strong>1% higher</strong> than the prevailing PPF interest rate. 
      From the 7th year onwards, you become eligible for partial withdrawals instead of loans.
    </p>
  `);

  const extensionContent = autoLinkContent(`
    <p>
      After the mandatory 15-year lock-in, you can extend your PPF account in blocks of <strong>5 years</strong>. 
      You have two options:
    </p>
    <ul class="list-disc pl-5">
      <li><strong>Extension with Contribution:</strong> Continue depositing money and earning interest. (Requires Form-H submission).</li>
      <li><strong>Extension without Contribution:</strong> Stop depositing but keep the balance in the account to earn interest.</li>
    </ul>
  `);

  const PPF_FAQS = [
    {
      question: 'Can I withdraw money from PPF before 15 years?',
      answer:
        'Partial withdrawals are allowed from the 7th financial year onwards. You can withdraw up to 50% of the balance at the end of the 4th preceding year.',
    },
    {
      question: 'What happens if I miss a yearly deposit?',
      answer:
        'The account becomes inactive. To reactivate it, you must pay a penalty of ₹50 per year along with the minimum subscription of ₹500 per year.',
    },
    {
      question: 'Can I extend my PPF account after 15 years?',
      answer:
        'Yes. You can extend the account indefinitely in blocks of 5 years. To continue contributions, you must submit Form H within one year of maturity.',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="PPF Calculator"
        description="Calculate Public Provident Fund (PPF) maturity amount, interest earned, and tax-free returns over 15 years."
        url="https://www.fincado.com/ppf-calculator"
      />

      <FAQSchema
        faqs={PPF_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://www.fincado.com' },
            { name: 'Calculators', url: 'https://www.fincado.com/calculators' },
            {
              name: 'PPF Calculator',
              url: 'https://www.fincado.com/ppf-calculator',
            },
          ]}
        />

        <header className="no-print my-4">
          {/* Share + Language */}
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="PPF Calculator — Public Provident Fund" />
            <LanguageToggle path="/hi/ppf-calculator" />
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
              PPF Calculator
            </span>

            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Build tax-free wealth with Public Provident Fund
            </span>
          </h1>

          {/* Intro */}
          <WikiText
            content={`
      <p class="max-w-175 text-slate-500 mt-2">
        Build a <strong>tax-free retirement corpus</strong> with PPF.
        Calculate maturity value, total interest earned, and see the
        power of compounding over the mandatory <strong>15-year lock-in</strong>.
      </p>
    `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <PPFClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="ppf-after-calc" type="banner" />
            </div>

            <LiveRateTable type="fixedDeposit" />

            {/* Mobile-only suggestions */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Compare Savings
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/fd-calculator"
                  className="
        flex items-center justify-center gap-2
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        transition hover:border-lime-300 hover:bg-lime-50
      "
                >
                  🏦 FD Returns
                </Link>

                <Link
                  href="/sukanya-samriddhi"
                  className="
        flex items-center justify-center gap-2
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        transition hover:border-lime-300 hover:bg-lime-50
      "
                >
                  👧 SSY Calculator
                </Link>
              </div>
            </div>

            {/* Promo box */}
            <div
              className="
    no-print my-8 mx-0
    flex items-center gap-3
    rounded-lg border border-lime-200
    bg-lime-50 px-4 py-4
  "
            >
              <span className="text-2xl">🛡️</span>

              <div>
                <strong className="block text-base font-semibold text-lime-800">
                  Safe Investment Strategy
                </strong>

                <Link
                  href="/guides/ppf-guide"
                  className="
        mt-1 inline-block
        text-sm font-semibold text-lime-700
        underline underline-offset-2
        transition hover:text-lime-800
      "
                >
                  Read: How to Maximize PPF Returns →
                </Link>
              </div>
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print space-y-12">
              {/* INTRO */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is the Public Provident Fund (PPF)?
                </h2>
                <WikiText content={introContent} />
              </section>

              {/* ELIGIBILITY */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Who Can Open a PPF Account?
                </h3>
                <WikiText content={eligibilityContent} />
              </section>

              {/* 💰 AD */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* COMPARISON TABLE */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  PPF vs FD vs ELSS: Quick Comparison
                </h3>

                <Card>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table className="border-collapse">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-left">Feature</TableHead>
                            <TableHead className="text-left">PPF</TableHead>
                            <TableHead className="text-left">Bank FD</TableHead>
                            <TableHead className="text-left">
                              ELSS Mutual Fund
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Returns
                            </TableCell>
                            <TableCell className="font-semibold text-lime-700">
                              ~7.1% (Guaranteed)
                            </TableCell>
                            <TableCell className="text-slate-700">
                              6.5% – 7.5%
                            </TableCell>
                            <TableCell className="font-semibold text-amber-600">
                              12% – 15% (Market Linked)
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Tax Status
                            </TableCell>
                            <TableCell className="font-semibold text-lime-700">
                              EEE (Tax Free)
                            </TableCell>
                            <TableCell className="text-red-600">
                              Fully Taxable
                            </TableCell>
                            <TableCell className="text-amber-600">
                              LTCG @ 12.5%
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Lock-in
                            </TableCell>
                            <TableCell className="font-semibold">
                              15 Years
                            </TableCell>
                            <TableCell>7 Days – 10 Years</TableCell>
                            <TableCell className="font-semibold">
                              3 Years
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Risk
                            </TableCell>
                            <TableCell className="font-semibold text-lime-700">
                              Zero Risk (Govt-backed)
                            </TableCell>
                            <TableCell>Low Risk</TableCell>
                            <TableCell className="font-semibold text-red-600">
                              High Risk
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* LOANS */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Loan Against PPF & Partial Withdrawals
                </h3>
                <WikiText content={loanContent} />
              </section>

              {/* EXTENSION */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Extension Rules (After 15 Years)
                </h3>
                <WikiText content={extensionContent} />
              </section>

              {/* FORMULA */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  PPF Calculation Formula
                </h3>

                <p className="text-slate-700">
                  The interest on PPF is compounded annually. The formula is
                  similar to the Future Value of an Annuity:
                </p>

                <div className="py-6 overflow-x-auto bg-slate-50 px-4 rounded-md">
                  <BlockMath math="A = P \times \left[ \frac{(1 + i)^n - 1}{i} \right] \times (1 + i)" />
                </div>

                <WikiText
                  content={`
        <ul class="text-sm list-disc pl-5 text-slate-700">
          <li><strong>A</strong>: Maturity Amount</li>
          <li><strong>P</strong>: Annual Installment</li>
          <li><strong>i</strong>: Annual Interest Rate</li>
          <li><strong>n</strong>: Tenure (15 to 50 years)</li>
        </ul>
      `}
                />
              </section>

              {/* ADVANTAGES */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Advantages of PPF
                </h3>

                <WikiText
                  content={`
        <ul class="list-disc pl-5 text-slate-700">
          <li><strong>EEE Tax Status:</strong> No tax on investment, interest, or withdrawal.</li>
          <li><strong>Sovereign Guarantee:</strong> 100% capital safety backed by Govt of India.</li>
          <li><strong>Protection from Attachment:</strong> Cannot be claimed by creditors or courts.</li>
        </ul>
      `}
                />
              </section>
            </article>

            {/* FAQs */}
            <section className="article no-print mt-12">
              <h2 className="text-2xl font-semibold text-slate-900">
                Frequently Asked Questions (FAQs)
              </h2>

              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="mt-6"
              >
                {PPF_FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b"
                  >
                    <AccordionTrigger className="text-left font-medium text-slate-900">
                      {faq.question}
                    </AccordionTrigger>

                    <AccordionContent className="text-slate-700 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-5 space-y-6">
              <AdSlot id="ppf-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
