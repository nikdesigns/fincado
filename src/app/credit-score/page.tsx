import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CreditScoreClient from './CreditScoreClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Loan Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema'; // ✅ Actually used now
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
import FAQSchema from '@/components/FAQSchema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/* ---------------- SEO METADATA (Optimized 2025) ---------------- */
export const metadata: Metadata = {
  title: 'Credit Score Calculator 2025 – Check CIBIL & Experian Score',
  description:
    'Estimate your Credit Score instantly. Check how utilization, payment history, and inquiries affect your CIBIL. Get tips to reach 750+ score.',
  keywords: [
    'Credit Score Calculator',
    'CIBIL Score Estimator',
    'Check Credit Score Free',
    'Improve CIBIL Score',
    'Credit Utilization Calculator',
    'Soft vs Hard Inquiry',
  ],
  alternates: {
    canonical: 'https://fincado.com/credit-score/',
  },
  openGraph: {
    title: 'Credit Score Estimator – Boost Your Eligibility',
    description:
      'Free tool to estimate your credit score and simulate the impact of paying down debt.',
    url: 'https://fincado.com/credit-score/',
    type: 'website',
  },
};

const faqItems = [
  {
    id: 'faq-1',
    question: 'How long does a default stay on my credit report?',
    answer:
      'Negative information like defaults or settlements can stay on your credit report for up to 7 years, though their impact diminishes over time.',
  },
  {
    id: 'faq-2',
    question: 'Is a “Settled” status bad?',
    answer:
      'Yes. “Settled” means you paid less than the full amount owed. It is a negative mark. Always aim for “Closed” status by paying in full.',
  },
  {
    id: 'faq-3',
    question: 'How often is my credit score updated?',
    answer:
      'Lenders typically report data to bureaus every 30–45 days. Your score updates whenever new data is received.',
  },
];

/* ---------------- PAGE ---------------- */

export default function CreditScorePage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      Your <strong>Credit Score</strong> (often referred to as <strong>CIBIL Score</strong> in India) 
      is a 3-digit number ranging from 300 to 900 that summarizes your creditworthiness. 
      It is calculated based on your past behavior with loans and credit cards.
    </p>
    <p class="mt-4">
      Lenders use this score to evaluate the risk of lending to you. A score above <strong>750</strong> 
      is generally required to get loans at the lowest interest rates.
    </p>
  `);

  const factorsContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Payment History (35%):</strong> The most critical factor. Even a single missed payment can drop your score by 50+ points.</li>
      <li><strong>Credit Utilization (30%):</strong> How much of your limit you use. High utilization (>30%) signals "credit hunger".</li>
      <li><strong>Credit Age (15%):</strong> Older accounts boost your score. Never close your oldest credit card.</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Credit Score Estimator"
        description="Estimate your CIBIL/Credit Score based on payment history, utilization ratio, and credit mix."
        url="https://fincado.com/credit-score/"
      />

      {/* FAQ Schema */}
      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators' },
            {
              name: 'Credit Score Calculator',
              url: 'https://fincado.com/credit-score/',
            },
          ]}
        />

        <header className="no-print mb-10">
          {/* Share + Language */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <ShareTools title="Credit Score Estimator" />
            <LanguageToggle path="/hi/credit-score" />
          </div>

          {/* Title */}
          <h1
            className="
      mb-3
      text-2xl
      sm:text-3xl
      lg:text-4xl
      font-semibold
      tracking-tight
      text-slate-900
    "
          >
            Credit Score Estimator
            <span className="block text-base sm:text-lg font-medium text-lime-700 mt-2">
              Estimate • Improve • Simulate
            </span>
          </h1>

          {/* Intro */}
          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
        <p>
          Understand the factors hurting your credit score and simulate how
          reducing <strong>credit card utilization</strong> or improving
          <strong>payment history</strong> can boost your score instantly.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <CreditScoreClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="credit-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (Personal Loan Context - High correlation with score) */}
            <LiveRateTable type="personalLoan" />

            {/* ✅ Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Loan Tools
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/loans/personal-loan"
                  className="
        flex items-center justify-center
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        hover:bg-slate-50
        transition
      "
                >
                  💸 Loan EMI
                </Link>

                <Link
                  href="/emi-calculator"
                  className="
        flex items-center justify-center
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        hover:bg-slate-50
        transition
      "
                >
                  🔢 EMI Calc
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
            <div className="no-print mt-8">
              <div
                className="
      flex items-center gap-3
      rounded-lg border border-emerald-200
      bg-emerald-50/60
      p-4
    "
              >
                {/* Icon */}
                <span className="text-2xl">📉</span>

                {/* Content */}
                <div>
                  <strong className="block text-sm font-semibold text-emerald-800">
                    Score dropped suddenly?
                  </strong>

                  <Link
                    href="/guides/credit-score-guide"
                    className="
          mt-1 inline-flex items-center
          text-sm font-semibold text-emerald-700
          underline underline-offset-4
          hover:text-emerald-800
        "
                  >
                    Read: How to raise CIBIL Dispute →
                  </Link>
                </div>
              </div>
            </div>

            {/* 💰 MID CONTENT AD */}
            <div className="no-print my-10">
              <AdSlot id="credit-mid-content" type="leaderboard" />
            </div>

            {/* ---------------- SEO CONTENT ---------------- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* --- WHAT DETERMINES CREDIT SCORE --- */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What Determines Your Credit Score?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* --- SCORE RANGES TABLE --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Credit Score Ranges: Where Do You Stand?
                    </h3>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Score Range</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Loan Eligibility</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            750 – 900
                          </TableCell>
                          <TableCell>Excellent</TableCell>
                          <TableCell>
                            Fast approval, lowest interest rates
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            700 – 749
                          </TableCell>
                          <TableCell>Good</TableCell>
                          <TableCell>
                            High approval chances, standard rates
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            650 – 699
                          </TableCell>
                          <TableCell>Average</TableCell>
                          <TableCell>
                            Possible approval, higher interest
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            300 – 649
                          </TableCell>
                          <TableCell>Poor</TableCell>
                          <TableCell>Likely rejection</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </section>

                  {/* --- AD SLOT --- */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* --- 5 PILLARS --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      The 5 Pillars of Credit Scoring
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={factorsContent} />
                    </div>
                  </section>

                  {/* --- SOFT VS HARD INQUIRY --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Soft Inquiry vs Hard Inquiry
                    </h3>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Feature</TableHead>
                          <TableHead>Soft Inquiry</TableHead>
                          <TableHead>Hard Inquiry</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Who checks?
                          </TableCell>
                          <TableCell>You / Employer</TableCell>
                          <TableCell>Bank or Lender</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Purpose</TableCell>
                          <TableCell>Monitoring / Information</TableCell>
                          <TableCell>Loan or credit card application</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Impact on score
                          </TableCell>
                          <TableCell className="text-emerald-700 font-semibold">
                            No impact
                          </TableCell>
                          <TableCell className="text-red-600 font-semibold">
                            −5 to −10 points
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </section>

                  {/* --- FORMULA --- */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How the Credit Score Is Calculated
                    </h3>

                    <p className="text-slate-700">
                      While the exact algorithm is proprietary (CIBIL/FICO),
                      credit scores broadly follow this weighted structure:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="Score = 0.35(P) + 0.30(U) + 0.15(A) + 0.10(M) + 0.10(N)" />
                    </div>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul class="list-disc list-inside text-sm">
                <li><strong>P</strong>: Payment History (35%)</li>
                <li><strong>U</strong>: Credit Utilization (30%)</li>
                <li><strong>A</strong>: Age of Credit History (15%)</li>
                <li><strong>M</strong>: Credit Mix (10%)</li>
                <li><strong>N</strong>: New Inquiries (10%)</li>
              </ul>
            `}
                      />
                    </div>
                  </section>

                  {/* --- IMPROVEMENT STEPS --- */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Steps to Improve Your Credit Score (750+)
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText
                        content={`
              <ul class="list-disc list-inside space-y-2">
                <li><strong>Automate payments:</strong> Never miss EMIs or card dues.</li>
                <li><strong>Increase credit limit:</strong> Lowers utilization instantly.</li>
                <li><strong>Avoid frequent applications:</strong> Too many hard enquiries hurt your score.</li>
              </ul>
            `}
                      />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* FAQ Section */}
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

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-5 mb-6">
              <AdSlot id="credit-sidebar" type="box" />
            </div>

            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
