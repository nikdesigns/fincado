import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import RetirementCalculatorClient from './RetirementCalculatorClient';
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
import { autoLinkContent } from '@/utils/autoLinker'; // ✅ SEO Boost
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';

/* ---------------- SEO METADATA (Optimized 2026) ---------------- */
export const metadata: Metadata = {
  title: 'Retirement Calculator 2026 – Plan Your Corpus & Inflation',
  description:
    'Calculate retirement corpus required in India. Adjust for inflation and life expectancy. Plan for FIRE (Financial Independence).',
  keywords: [
    'Retirement Calculator India',
    'Pension Calculator',
    'Retirement Corpus Formula',
    'Inflation Adjusted Retirement',
    'FIRE Calculator',
    'NPS vs EPF vs PPF',
  ],
  alternates: {
    canonical: 'https://fincado.com/retirement-calculator/',
  },
  openGraph: {
    title: 'Retirement Calculator – Secure Your Golden Years',
    description:
      'Free tool to estimate your retirement corpus and required monthly SIP.',
    url: 'https://fincado.com/retirement-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

// retirementFaqs.ts (or near top of page)

export const RETIREMENT_FAQS = [
  {
    question: 'When should I start planning?',
    answer:
      'Ideally, as soon as you start earning. Starting early allows you to leverage the power of compounding. For example, starting at 25 vs 35 can double your final corpus with the same monthly investment.',
  },
  {
    question: 'How much inflation should I assume?',
    answer:
      'For India, a long-term inflation rate of around 6% is a standard assumption. However, medical inflation is often higher (8–10%), so it should be planned separately.',
  },
  {
    question: 'Is NPS mandatory?',
    answer:
      'No. However, NPS is highly recommended due to the additional tax benefit of ₹50,000 under Section 80CCD(1B) and its low-cost exposure to equity and debt.',
  },
];

export default function RetirementPage() {
  // 1. Prepare SEO Content with Auto-Links
  const introContent = autoLinkContent(`
    <p>
      <strong>Retirement Planning</strong> is the process of estimating your future income needs 
      and setting aside enough capital today to meet those needs when you stop working.
    </p>
    <p class="mt-2">
      It is not just about saving; it's about investing wisely to beat <strong>Inflation</strong> 
      so that your corpus lasts as long as you do. Modern planning also includes concepts like 
      <strong>FIRE (Financial Independence, Retire Early)</strong>.
      <p className="mt-2 text-sm text-slate-600">
        Early retirement requires a higher corpus and conservative withdrawal strategy due to longer retirement duration.
      </p>
    </p>
  `);

  const riskContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Inflation Risk:</strong> The "Silent Killer". ₹1 Lakh today will buy much less 20 years from now. Your corpus must grow faster than inflation (typically 6% in India).</li>
      <li><strong>Longevity Risk:</strong> Living longer than expected means you might outlive your savings. You need a buffer for medical costs and an extended lifespan.</li>
    </ul>
  `);

  const allocationContent = autoLinkContent(`
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Young (20s-30s):</strong> High <strong>Equity</strong> (70-80%). Focus on aggressive growth via Mutual Funds.</li>
      <li><strong>Mid-Career (40s):</strong> Balanced (50-60% Equity). Start securing gains into Debt/NPS.</li>
      <li><strong>Near Retirement (50s):</strong> Conservative (30-40% Equity). Focus on capital preservation and regular income (SWP).</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="Retirement Corpus Calculator"
        description="Estimate how much money you need to retire in India. Adjust for inflation and life expectancy."
        url="https://fincado.com/retirement-calculator/"
      />

      {/* FAQ Schema */}
      <FAQSchema
        faqs={RETIREMENT_FAQS.map((faq) => ({
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
              name: 'Retirement Calculator',
              url: 'https://fincado.com/retirement-calculator/',
            },
          ]}
        />

        <header className="no-print my-6">
          {/* Share + Language (consistent across calculators) */}
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Retirement Corpus Calculator" />
            <LanguageToggle path="/hi/retirement-calculator" />
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
              Retirement Corpus Calculator
            </span>

            <span className="block mt-2 text-base sm:text-lg font-medium text-lime-700">
              Plan for inflation, longevity, and financial independence
            </span>
          </h1>

          {/* Intro Text */}
          <WikiText
            content={`
      <p class="max-w-175 text-slate-600 mt-2">
        Find out exactly how much you need to save today to maintain your
        lifestyle tomorrow. Account for <strong>inflation</strong> and
        <strong>longevity risk</strong> with realistic assumptions.
      </p>
    `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <RetirementCalculatorClient />

            {/* 💰 AD 2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="retire-after-calc" type="banner" />
            </div>

            {/* ✅ Mobile-Only Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Planning Tools
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sip-calculator/"
                  className="
        rounded-lg
        border border-slate-200
        bg-white
        px-3 py-3
        text-center
        text-sm
        font-medium
        text-slate-900
        hover:bg-slate-50
        transition
      "
                >
                  📈 SIP Calculator
                </Link>

                <Link
                  href="/swp-calculator/"
                  className="
        rounded-lg
        border border-slate-200
        bg-white
        px-3 py-3
        text-center
        text-sm
        font-medium
        text-slate-900
        hover:bg-slate-50
        transition
      "
                >
                  💸 Pension Calc
                </Link>
              </div>
            </div>

            {/* ✅ Promo Box */}
            <div
              className="
    no-print
    mt-8
    flex
    items-center
    gap-3
    rounded-lg
    border border-emerald-200
    bg-emerald-50
    p-4
  "
            >
              <span className="text-2xl">🔥</span>

              <div>
                <strong className="block text-sm font-semibold text-emerald-900">
                  Want to retire early?
                </strong>

                <Link
                  href="/guides/swp-guide/"
                  className="
        mt-1
        inline-block
        text-sm
        font-semibold
        text-emerald-600
        underline
        hover:text-emerald-700
        transition
      "
                >
                  Read: The F.I.R.E Movement Guide →
                </Link>
              </div>
            </div>

            {/* 💰 MID-CONTENT AD */}
            <div className="no-print my-10">
              <AdSlot id="retire-mid-content" type="leaderboard" />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print space-y-10">
              {/* INTRO */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Retirement Planning?
                </h2>
                <WikiText content={introContent} />
              </section>

              {/* VISUAL CONTEXT */}
              <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  Retirement planning typically follows a{' '}
                  <strong>3-phase journey</strong>: accumulation → consolidation
                  → withdrawal.
                </p>
              </section>

              {/* COMPARISON TABLE */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  EPF vs NPS vs Mutual Funds: Where to Save?
                </h3>

                <Card>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead>Feature</TableHead>
                            <TableHead>EPF</TableHead>
                            <TableHead>NPS</TableHead>
                            <TableHead>Equity Mutual Funds</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Returns
                            </TableCell>
                            <TableCell className="text-slate-700">
                              ~8.15% (Fixed)
                            </TableCell>
                            <TableCell className="text-amber-600 font-semibold">
                              9% – 11%
                            </TableCell>
                            <TableCell className="text-emerald-600 font-semibold">
                              12% – 15%
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Tax Benefit
                            </TableCell>
                            <TableCell>80C (EEE)</TableCell>
                            <TableCell className="text-emerald-600">
                              80CCD (+₹50k)
                            </TableCell>
                            <TableCell>ELSS (80C)</TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Liquidity
                            </TableCell>
                            <TableCell className="text-red-600">Low</TableCell>
                            <TableCell className="text-red-600">
                              Very Low
                            </TableCell>
                            <TableCell className="text-emerald-600">
                              High
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 💰 AD */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* RISKS */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  The Two Biggest Risks in Retirement
                </h3>
                <WikiText content={riskContent} />
              </section>

              {/* ALLOCATION */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Recommended Asset Allocation by Age
                </h3>
                <WikiText content={allocationContent} />
              </section>

              {/* 4% RULE */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  The 4% Withdrawal Rule
                </h3>
                <p className="text-slate-700">
                  A widely used guideline stating that you can withdraw
                  <strong> 4% of your retirement corpus</strong> in the first
                  year and increase withdrawals with inflation, with a high
                  probability of your money lasting 30+ years.
                </p>
              </section>

              {/* FORMULA */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Retirement Calculation Formula
                </h3>

                <p className="text-slate-700">
                  Retirement planning involves estimating future expenses and
                  calculating the corpus required to sustain them.
                </p>

                <div className="py-6 overflow-x-auto bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <BlockMath math="Exp_{future} = Exp_{current} \times (1 + r_{inf})^n" />
                </div>

                <WikiText
                  content={`
        <ul class="text-sm list-disc list-inside text-slate-700">
          <li><strong>Exp</strong>: Monthly Expenses</li>
          <li><strong>r_inf</strong>: Inflation Rate</li>
          <li><strong>n</strong>: Years until Retirement</li>
        </ul>
      `}
                />
              </section>
            </article>

            {/* --- FAQs --- */}
            <section className="article no-print space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Frequently Asked Questions (FAQs)
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {RETIREMENT_FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-b border-slate-200"
                  >
                    <AccordionTrigger className="text-left text-slate-800 font-medium">
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
              <AdSlot id="retire-sidebar" type="box" />
            </div>

            <FinancialNavWidget />
          </aside>
        </div>
      </main>
    </>
  );
}
