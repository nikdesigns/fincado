import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import FIRECalculatorClient from './FIRECalculatorClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import LiveRateTable from '@/components/LiveRateTable'; // ✅ Added for Investment Context
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

/* ---------------- SEO METADATA (Optimized 2026) ---------------- */
export const metadata: Metadata = {
  title: 'FIRE Calculator – Financial Independence Retire Early',
  description:
    'Calculate your FIRE Number with our advanced FIRE Calculator. Estimate target corpus based on SWR (Safe Withdrawal Rate), inflation, and lifestyle expenses.',
  keywords: [
    'FIRE Calculator India',
    'Financial Independence Retire Early',
    'FIRE Number Formula',
    'Early Retirement Calculator',
    'Lean FIRE vs Fat FIRE',
    'Safe Withdrawal Rate India',
  ],
  alternates: {
    canonical: 'https://fincado.com/fire-calculator/',
  },
  openGraph: {
    title: 'FIRE Calculator – Plan Your Early Retirement',
    description:
      'Free tool to calculate your financial freedom number and required monthly savings.',
    url: 'https://fincado.com/fire-calculator/',
    type: 'website',
  },
};

const faqItems = [
  {
    id: 'faq-fire-1',
    question: 'How long does it take to achieve FIRE?',
    answer:
      'It depends on your savings rate. If you save around 50% of your income, FIRE can be achieved in roughly 17 years. With a 70% savings rate, it may take only 9–10 years.',
  },
  {
    id: 'faq-fire-2',
    question: 'Where should I invest for FIRE?',
    answer:
      'A diversified portfolio of Equity Mutual Funds for growth and Debt instruments for stability is essential. Rental real estate can also provide passive income during early retirement.',
  },
  {
    id: 'faq-fire-3',
    question: 'Does this FIRE calculation include medical expenses?',
    answer:
      'Standard FIRE calculations cover living expenses only. You should maintain a separate health insurance policy and emergency fund to handle medical contingencies.',
  },
  {
    id: 'faq-fire-4',
    question: 'Is FIRE realistic in India with healthcare and children costs?',
    answer:
      'FIRE is achievable in India but requires conservative planning. Healthcare inflation and children’s education costs should be planned separately and not fully relied upon from the FIRE corpus.',
  },
];
/* ---------------- PAGE ---------------- */

export default function FIREPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>FIRE (Financial Independence, Retire Early)</strong> is a lifestyle movement with the goal 
      of gaining financial freedom at a young age (often in the 30s or 40s) rather than the traditional 
      retirement age of 60.
    </p>
    <p class="mt-4">
      The core principle is aggressive saving (50-70% of income) and low-cost investing to build a 
      <strong>Corpus</strong> that generates enough passive income to cover living expenses forever.
    </p>
  `);

  const coreConceptsContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>FIRE Number:</strong> The target corpus amount. Formula: <em>Annual Expenses × 25 (or 30)</em>.</li>
      <li><strong>Safe Withdrawal Rate (SWR):</strong> The percentage of your corpus you can withdraw annually without running out of money (typically 4% globally, 3% in India).</li>
      <li>
  <strong>Rule of 25 / 33:</strong>
  25× expenses assumes 4% SWR (US).
  For India, many planners prefer 30×–33× using a 3%–3.5% SWR.
</li>
    </ul>
  `);

  const swrContent = autoLinkContent(`
    <p>
      <strong>Is the 4% Rule Safe for India?</strong><br />
      The 4% rule was designed for the US market. India has higher inflation (6%-7%). 
      Therefore, many Indian financial planners recommend a more conservative withdrawal rate of 
      <strong>3% to 3.5%</strong>. This means you might need <strong>33x</strong> your annual expenses 
      instead of 25x.
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="FIRE Calculator"
        description="Financial Independence, Retire Early (FIRE) calculator. Find out your 'Freedom Number' and when you can stop working."
        url="https://fincado.com/fire-calculator/"
      />

      {/* FAQ Schema */}
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
              name: 'FIRE Calculator',
              url: 'https://fincado.com/fire-calculator/',
            },
          ]}
        />

        <header className="no-print mb-10">
          {/* Share + Language */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="FIRE Calculator" />
            <LanguageToggle path="/hi/fire-calculator" />
          </div>

          {/* Title */}
          <h1
            className="
      mb-4
      text-2xl
      sm:text-3xl
      lg:text-4xl
      font-semibold
      tracking-tight
      text-slate-900
    "
          >
            FIRE Calculator
            <span className="block text-base sm:text-lg font-medium text-lime-700 mt-2">
              Financial Independence, Retire Early
            </span>
          </h1>

          {/* Intro text */}
          <div className="max-w-3xl text-base leading-relaxed text-slate-600">
            <WikiText
              content={`
        <p>
          Stop working for money and let your money work for you.
          Use this <strong>FIRE Calculator</strong> to find your
          <strong>Financial Freedom Number</strong> and the exact
          monthly savings required to retire early with confidence.
        </p>
      `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <FIRECalculatorClient />
            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="fire-after-calc" type="banner" />
            </div>

            {/* ✅ Live Rates (Mutual Fund Context) */}
            <h3 className="mt-8 text-lg font-semibold text-slate-900">
              Conservative Return Reference (Fixed Deposits)
            </h3>
            <LiveRateTable type="fixedDeposit" />

            {/* ✅ Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Retirement Tools
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sip-calculator/"
                  className="
        flex items-center justify-center
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        hover:bg-slate-50
      "
                >
                  📈 SIP Calculator
                </Link>

                <Link
                  href="/retirement-calculator/"
                  className="
        flex items-center justify-center
        rounded-lg border border-slate-200
        bg-white px-3 py-3
        text-sm font-medium text-slate-900
        hover:bg-slate-50
      "
                >
                  👴 Retire Calc
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
            <div className="no-print mt-8">
              <div
                className="
      flex items-start gap-3
      rounded-lg border border-emerald-200
      bg-emerald-50
      p-4
    "
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">
                  🚀
                </div>

                {/* Content */}
                <div className="flex-1">
                  <strong className="block text-base font-semibold text-emerald-800">
                    Start Early!
                  </strong>

                  <Link
                    href="/guides/sip-investment-guide/"
                    className="
          mt-1 inline-flex items-center
          text-sm font-semibold text-emerald-700
          underline-offset-4
          hover:underline
        "
                  >
                    Read: How to build a 1 Cr Corpus with SIP →
                  </Link>
                </div>
              </div>
            </div>

            {/* 💰 MID-CONTENT AD */}
            <div className="no-print my-10">
              <AdSlot id="fire-mid-content" type="leaderboard" />
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* WHAT IS FIRE */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      What is the FIRE Movement?
                    </h2>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* TYPES OF FIRE */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Types of FIRE: Which one are you?
                    </h3>

                    <div className="rounded-xl border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-40">Type</TableHead>
                            <TableHead>Lifestyle</TableHead>
                            <TableHead>Corpus Required</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Lean FIRE
                            </TableCell>
                            <TableCell>Frugal / Minimalist</TableCell>
                            <TableCell>&lt; 25× Expenses</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium">
                              Regular FIRE
                            </TableCell>
                            <TableCell>Standard Lifestyle</TableCell>
                            <TableCell>25× – 30× Expenses</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium">
                              Fat FIRE
                            </TableCell>
                            <TableCell>Luxury Lifestyle</TableCell>
                            <TableCell>&gt; 50× Expenses</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium">
                              Barista FIRE
                            </TableCell>
                            <TableCell>Part-time Work</TableCell>
                            <TableCell>15× – 20× Expenses</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* CORE CONCEPTS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Core Concepts of FIRE
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={coreConceptsContent} />
                    </div>
                  </section>

                  {/* SWR */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Safe Withdrawal Rate (SWR) in India
                    </h3>

                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={swrContent} />
                    </div>
                  </section>

                  {/* HOW CALCULATOR HELPS */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      How This Calculator Helps You
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Reality Check
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Know if your current savings rate is enough to retire
                          by 45.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Inflation Impact
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Expenses double every 10–12 years — this calculator
                          adjusts for it.
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="font-semibold text-slate-900 mb-1">
                          Gap Analysis
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Calculates the exact SIP needed to hit your FIRE goal.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      FIRE Calculation Formula
                    </h3>

                    <p className="text-slate-700">
                      The formula used to calculate your Financial Independence
                      number:
                    </p>

                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="FIRE = \text{Annual Expenses} \times \frac{100}{SWR}" />
                    </div>

                    <p className="text-slate-700">
                      Where <strong>SWR</strong> is your Safe Withdrawal Rate
                      (e.g. 3%–4%).
                    </p>
                  </section>

                  {/* WHY FIRE */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Why Pursue FIRE?
                    </h3>

                    <div className="text-slate-700">
                      <WikiText
                        content={`
              <ul class="list-disc list-inside space-y-2">
                <li><strong>Freedom of Time:</strong> Control your schedule.</li>
                <li><strong>Reduced Stress:</strong> No dependence on a paycheck.</li>
                <li><strong>Purpose-driven Life:</strong> Work by choice, not compulsion.</li>
              </ul>
            `}
                      />
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* FAQs */}
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
              <AdSlot id="fire-sidebar" type="box" />
            </div>

            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
