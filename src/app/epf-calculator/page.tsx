import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EPFClient from './EPFClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Comparison
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost
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

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'EPF Calculator 2025 – Check Corpus & Interest (Tax Rules)',
  description:
    'Calculate EPF maturity corpus. Check employer contribution split (EPS vs EPF), interest rates, and tax on contributions above ₹2.5 Lakh.',
  keywords: [
    'EPF Calculator',
    'PF Calculator India',
    'Employees Provident Fund Calculator',
    'EPF Interest Calculator',
    'VPF Calculator',
    'EPF Tax Rules 2025',
    'Pension Contribution EPS',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/epf-calculator',
  },
  openGraph: {
    title: 'EPF Calculator – Track Your Retirement Savings',
    description:
      'Free tool to calculate your total EPF corpus including employer contribution and interest.',
    url: 'https://www.fincado.com/epf-calculator',
    type: 'website',
  },
};

const EPF_FAQS = [
  {
    question: 'Can I withdraw my EPF anytime?',
    answer:
      'You can withdraw the full amount only at retirement (58 years) or if you remain unemployed for 2 months. Partial withdrawals are allowed for marriage, education, or home purchase.',
  },
  {
    question: 'Is interest on EPF taxable?',
    answer:
      'Interest is tax-free for employee contributions up to ₹2.5 Lakh per year. If you contribute more than ₹2.5 Lakh (via VPF), the interest on the excess amount is taxable.',
  },
  {
    question: 'How to check my EPF balance?',
    answer:
      'You can check your balance via the EPFO Portal, UMANG App, or by giving a missed call to 9966044425 from your registered mobile number.',
  },
];

/* ---------------- PAGE ---------------- */

export default function EPFPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p class="mt-2 text-slate-600">
      The <strong>Employees' Provident Fund (EPF)</strong> is a mandatory retirement savings scheme 
      managed by the <strong>EPFO</strong> for salaried employees in India. It builds a retirement 
      corpus through regular monthly contributions from both the employee and the employer.
    </p>
    <p class="mt-2">
      It offers a <strong>Sovereign Guarantee</strong> (backed by the Govt) and falls under the 
      EEE (Exempt-Exempt-Exempt) tax status for most employees, making it one of the safest debt instruments.
    </p>
  `);

  const contributionContent = autoLinkContent(`
    <p class="mt-4 text-slate-600">Both you and your employer contribute <strong>12%</strong> of your (Basic Salary + DA). However, the split is different:</p>
    <ul class="list-disc list-inside space-y-2 mt-2">
      <li><strong>Employee Share:</strong> 100% of your 12% goes into your EPF account.</li>
      <li><strong>Employer Share:</strong> Out of their 12%, only <strong>3.67%</strong> goes to EPF. The remaining <strong>8.33%</strong> goes to the <strong>Employee Pension Scheme (EPS)</strong>.</li>
    </ul>
  `);

  const taxContent = autoLinkContent(`
    <p class="mt-2 text-slate-600">
      <strong>New Tax Rule (Budget 2021):</strong> If your total contribution (Employee Share + VPF) exceeds 
      <strong>₹2.5 Lakhs</strong> in a financial year, the interest earned on the excess amount is <strong>taxable</strong> 
      as per your income tax slab. The corpus accumulated up to ₹2.5 Lakhs remains tax-free.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="EPF Calculator"
        description="Calculate your Employee Provident Fund (EPF) corpus at retirement including employer contributions and interest."
        url="https://www.fincado.com/epf-calculator"
      />

      {/* FAQ Schema */}
      <FAQSchema
        faqs={EPF_FAQS.map((faq) => ({
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
              name: 'EPF Calculator',
              url: 'https://www.fincado.com/epf-calculator',
            },
          ]}
        />

        <header className="no-print my-6">
          {/* Share + Language */}
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Employees' Provident Fund (EPF) Calculator" />
            <LanguageToggle path="/hi/epf-calculator" />
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
              Employees’ Provident Fund (EPF) Calculator
            </span>

            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Estimate your retirement corpus from employee & employer
              contributions
            </span>
          </h1>

          {/* Intro */}
          <WikiText
            content={`
      <p class="max-w-2xl text-slate-600 mt-2">
        Your EPF is one of your most important retirement assets.
        Calculate the exact breakdown of <strong>employee vs employer contributions</strong>
        and the <strong>total interest earned</strong> over your working life.
      </p>
    `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <EPFClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="epf-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (PPF Context) */}
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">
                Retirement Tools
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/ppf-calculator"
                  className="
        flex items-center justify-center
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        no-underline
        hover:border-slate-300
      "
                >
                  🏦 PPF Calculator
                </Link>

                <Link
                  href="/gratuity-calculator"
                  className="
        flex items-center justify-center
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        no-underline
        hover:border-slate-300
      "
                >
                  💼 Gratuity Calc
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
            <div
              className="
    no-print
    mt-8
    flex items-center gap-3
    rounded-lg
    border border-emerald-200
    bg-emerald-50
    p-4
  "
            >
              <span className="text-2xl">📜</span>

              <div>
                <strong className="block text-emerald-900 font-semibold">
                  Confused about PF withdrawal?
                </strong>

                <Link
                  href="/guides/epf-guide"
                  className="
        mt-1 inline-block
        text-emerald-600
        font-semibold
        underline
        hover:text-emerald-700
        text-sm
      "
                >
                  Read: How to withdraw PF Online →
                </Link>
              </div>
            </div>

            {/* 💰 Mid Content Ad */}
            <div className="no-print my-10 flex justify-center">
              <AdSlot id="epf-mid-content" type="leaderboard" />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print">
              {/* INTRO */}
              <h2 className="text-2xl font-semibold text-slate-700">
                What is the Employees&apos; Provident Fund (EPF)?
              </h2>

              <WikiText content={introContent} />

              {/* CONTRIBUTION SPLIT */}
              <h3 className="mt-8 text-xl font-semibold text-slate-700">
                Understanding the Contribution Split
              </h3>

              <WikiText content={contributionContent} />

              {/* 💰 AD 3 */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* COMPARISON TABLE */}
              <h3 className="mt-8 text-xl font-semibold text-slate-900">
                EPF vs PPF: Which is Better?
              </h3>

              <Card className="mt-4 border-none shadow-none m-0">
                <CardContent className="p-0">
                  <div className="table-responsive">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-left">Feature</TableHead>
                          <TableHead className="text-left">
                            EPF (Employees&apos; PF)
                          </TableHead>
                          <TableHead className="text-left">
                            PPF (Public PF)
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium text-slate-700">
                            Interest Rate
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-600">
                            8.25% (Higher)
                          </TableCell>
                          <TableCell className="text-slate-700">7.1%</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium text-slate-700">
                            Eligibility
                          </TableCell>
                          <TableCell className="text-slate-700">
                            Salaried Employees only
                          </TableCell>
                          <TableCell className="text-slate-700">
                            Anyone
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium text-slate-700">
                            Lock-in
                          </TableCell>
                          <TableCell className="text-slate-700">
                            Until Retirement (58)
                          </TableCell>
                          <TableCell className="text-slate-700">
                            15 Years
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-medium text-slate-700">
                            Employer Match
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-600">
                            Yes (12%)
                          </TableCell>
                          <TableCell className="text-slate-700">No</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* TAXATION */}
              <h3 className="mt-8 text-xl font-semibold text-slate-900">
                Taxation on EPF (The 2.5 Lakh Rule)
              </h3>

              <WikiText content={taxContent} />

              {/* ADVANTAGES */}
              <h3 className="mt-10 text-xl font-semibold text-slate-900">
                How This Calculator Helps You
              </h3>

              <div className="advantage-grid mt-6">
                <div className="advantage-card">
                  <h4>Corpus Projection</h4>
                  <p>
                    Estimate the lump sum you will receive at retirement (Age
                    58/60).
                  </p>
                </div>

                <div className="advantage-card">
                  <h4>Interest Visualization</h4>
                  <p>
                    See how compounding turns small monthly deductions into a
                    massive interest component over 20–30 years.
                  </p>
                </div>

                <div className="advantage-card">
                  <h4>VPF Planning</h4>
                  <p>
                    Check how increasing your employee contribution (Voluntary
                    PF) boosts your final corpus.
                  </p>
                </div>
              </div>

              {/* FORMULA */}
              <h3 className="mt-10 text-xl font-semibold text-slate-900">
                EPF Interest Calculation Formula
              </h3>

              <p>
                Interest is calculated monthly on the running balance, but
                credited annually.
              </p>

              <div className="py-6 overflow-x-auto bg-slate-50 px-4 rounded-md my-4">
                <BlockMath math="Interest = \frac{(OpeningBalance + Contribution) \times Rate}{1200}" />
              </div>

              <WikiText
                content={`
      <p class="text-sm text-slate-500">
        <em>
          *Interest is calculated every month and credited on March 31st.
        </em>
      </p>
    `}
              />

              {/* BENEFITS */}
              <h3 className="mt-10 mb-2 text-xl font-semibold text-slate-900">
                Key Benefits of EPF
              </h3>

              <WikiText
                content={`
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Sovereign Guarantee:</strong> One of the safest debt instruments in India.</li>
        <li><strong>Tax Benefits:</strong> Contributions qualify for Section 80C.</li>
        <li><strong>Insurance (EDLI):</strong> Free life insurance cover up to ₹7 Lakhs.</li>
      </ul>
    `}
              />
            </article>

            {/* --- FAQs --- */}
            <section className="article no-print">
              <h2 className="text-2xl font-semibold text-slate-900">
                Frequently Asked Questions (FAQs)
              </h2>

              <Accordion type="single" collapsible className="mt-6 space-y-2">
                {EPF_FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`epf-faq-${index}`}
                    className="rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left font-medium text-slate-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-5 mb-6">
              <AdSlot id="epf-sidebar" type="box" />
            </div>

            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
