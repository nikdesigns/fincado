import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import LumpsumClient from './LumpsumClient';
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
import { BadgeCheck } from 'lucide-react'; // ✅ Icons added

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Lumpsum Calculator 2026 – One-Time Investment Returns',
  description:
    'Calculate the future value of your one-time investment. Compare Lumpsum vs SIP returns, check STP strategies, and visualize compound interest growth in 2026.',
  keywords: [
    'Lumpsum Calculator',
    'Mutual Fund Lumpsum',
    'Investment Returns Calculator',
    'Compound Interest Calculator',
    'Lumpsum vs SIP',
    'STP Calculator',
    'One Time Investment Plan',
    'LTCG Tax Rate 2026',
  ],
  alternates: {
    canonical: 'https://fincado.com/lumpsum-calculator/',
  },
  openGraph: {
    title: 'Lumpsum Calculator – Watch Your Wealth Grow (2026)',
    description:
      'Free tool to estimate returns on one-time investments with compounding benefits.',
    url: 'https://fincado.com/lumpsum-calculator/',
    type: 'website',
  },
};

/* ---------------- PAGE ---------------- */

export default function LumpsumPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Lumpsum Investment</strong> involves depositing a significant sum of money 
      in a single transaction rather than smaller recurring payments. This method is popular 
      for <strong>Mutual Funds</strong>, Fixed Deposits, and stocks.
    </p>
    <p class="mt-2">
      The primary advantage is that the entire capital starts earning returns from Day 1, 
      maximizing the power of <strong>Compounding</strong> over long durations. However, it carries 
      higher risk if invested during a market peak.
    </p>
  `);

  const stpContent = autoLinkContent(`
    <p>
      Smart investors often use a <strong>Systematic Transfer Plan (STP)</strong> instead of a direct lumpsum. 
      You park your money in a safe <strong>Liquid Fund</strong> and transfer a fixed amount monthly 
      into an Equity Fund. This protects you from market volatility while earning better returns than a savings account.
    </p>
  `);

  // ✅ UPDATED: Specific 12.5% Tax Rule added
  const taxContent = autoLinkContent(`
    <p>
      Lumpsum returns in mutual funds are taxed based on the holding period. 
      For Equity Funds held for more than 1 year, gains above <strong>₹1.25 Lakh</strong> are taxed at 
      <strong>12.5% (LTCG)</strong>. Short-term gains (less than 1 year) are taxed at 20%.
    </p>
    <p class="mt-2 text-sm text-slate-500">
       Union Budget 2026 maintained these rates to encourage long-term holding of equity assets.
    </p>
  `);

  const LUMPSUM_FAQS = [
    {
      id: 'lumpsum-risk',
      question: 'Is lumpsum risky in mutual funds?',
      answerText:
        'Lumpsum investing can be riskier than SIP if invested at a market peak. Over a 7–10 year horizon, volatility usually smooths out.',
      answerNode: (
        <>
          Lumpsum investing can be riskier than SIP if invested at a market
          peak. Over a <strong>7–10 year</strong> horizon, volatility usually
          smooths out.
        </>
      ),
    },
    {
      id: 'lumpsum-best-time',
      question: 'What is the best time for lumpsum investment?',
      answerText:
        'Historically, investing when market valuations like P/E ratios are low has produced better long-term returns.',
      answerNode: (
        <>
          Historically, investing when market valuations like
          <strong> P/E ratios</strong> are low has produced better long-term
          returns.
        </>
      ),
    },
    {
      id: 'lumpsum-to-sip',
      question: 'Can I convert a lumpsum investment into SIP?',
      answerText:
        'Yes. You can invest a lumpsum in a liquid fund and use an STP to gradually transfer money into equity funds.',
      answerNode: (
        <>
          Yes. You can invest a lumpsum in a <strong>Liquid Fund</strong> and
          use an
          <strong> STP</strong> to move money into equity funds gradually.
        </>
      ),
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="Lumpsum Investment Calculator"
        description="Estimate the future value of your one-time mutual fund investment using compound interest."
        url="https://fincado.com/lumpsum-calculator/"
      />

      <FAQSchema
        faqs={LUMPSUM_FAQS.map((faq) => ({
          question: faq.question,
          answer: faq.answerText,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'Lumpsum Calculator',
              url: 'https://fincado.com/lumpsum-calculator/',
            },
          ]}
        />

        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Lumpsum Calculator — One-Time Investment" />
            <LanguageToggle path="/hi/lumpsum-calculator" />
          </div>

          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-slate-900">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Lumpsum Calculator
            </span>
            <span className="block mt-2 text-base sm:text-lg font-medium text-emerald-700">
              Plan one-time investments and see long-term wealth growth
            </span>
          </h1>

          <div className="mt-4 max-w-3xl text-slate-500 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Invest once, grow forever. Calculate the future value of your
                  <strong>lump sum investment</strong> and visualize the power of
                  <strong>compounding</strong> over time.
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-white border border-slate-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-slate-900">
                Budget 2026: Investment Rules Unchanged
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                No new taxes were imposed on mutual fund lumpsum investments in
                Union Budget 2026. Long-term gains continue to enjoy a{' '}
                <strong>₹1.25 Lakh</strong> tax-free limit annually.
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <LumpsumClient />

            <div className="no-print my-8">
              <AdSlot id="lumpsum-after-calc" type="banner" />
            </div>

            {/* Mobile-only Suggestions */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Compare Investments
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sip-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  📈 SIP Calculator
                </Link>
                <Link
                  href="/fd-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  🏦 FD Returns
                </Link>
              </div>
            </div>

            {/* Promo Box */}
            <div className="no-print my-8 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <span className="text-2xl">💡</span>
              <div className="space-y-1">
                <strong className="block text-base font-semibold text-emerald-800">
                  Is the market too high?
                </strong>
                <Link
                  href="/guides/sip-investment-guide/"
                  className="inline-block text-sm font-medium text-emerald-700 underline hover:text-emerald-800"
                >
                  Read: Why STP is safer than Lumpsum →
                </Link>
              </div>
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print space-y-10">
              {/* INTRO */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is a Lumpsum Investment?
                </h2>
                <WikiText content={introContent} />
              </section>

              {/* COMPARISON TABLE */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  Lumpsum vs SIP: Which is Better?
                </h3>
                <Card className="border-slate-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              Feature
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              Lumpsum
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              SIP (Systematic Plan)
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Best Time
                            </TableCell>
                            <TableCell className="text-amber-600 font-semibold">
                              Market Corrections
                            </TableCell>
                            <TableCell className="text-emerald-600 font-semibold">
                              Any Time (Rupee Cost Averaging)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Risk Level
                            </TableCell>
                            <TableCell className="text-red-600">
                              Higher (Timing Risk)
                            </TableCell>
                            <TableCell className="text-emerald-600">
                              Lower (Volatility Averaged)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Capital Required
                            </TableCell>
                            <TableCell>Large Upfront Amount</TableCell>
                            <TableCell>Small Monthly Amounts (₹500+)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              Growth Pattern
                            </TableCell>
                            <TableCell className="font-semibold">
                              High if Timed Correctly
                            </TableCell>
                            <TableCell className="font-semibold">
                              Stable Long-Term Growth
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* STP */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  The STP Strategy (Pro Tip)
                </h3>
                <WikiText content={stpContent} />
                [Image of systematic transfer plan flow]
              </section>

              {/* CALCULATOR VALUE */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  How This Calculator Helps Your Planning
                </h3>
                <WikiText
                  content={`
                    <p>
                      Seeing the end value of a large one-time investment helps reduce emotional
                      decision-making. This calculator helps you visualize true
                      <strong>compounding-driven growth</strong>.
                    </p>
                  `}
                />
                [Image of power of compounding graph]
              </section>

              {/* ADVANTAGES GRID */}
              <section className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Compare Tenures
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        See how extending your investment horizon by just 5
                        years can dramatically increase returns due to
                        compounding.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Set Realistic Expectations
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Toggle between conservative (8%) and aggressive (15%)
                        return assumptions to plan better.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* TAX */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Taxation on Returns (2026 Update)
                </h3>
                <WikiText content={taxContent} />
                [Image of mutual fund taxation 2026]
              </section>

              {/* FORMULA */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Lumpsum Calculation Formula
                </h3>
                <p className="text-slate-700">
                  This calculator uses the standard compound interest formula to
                  estimate future value:
                </p>
                <div className="py-6 overflow-x-auto bg-slate-50 p-4 rounded-md border border-slate-200">
                  <BlockMath math="FV = P (1 + r)^n" />
                </div>
                <WikiText
                  content={`
                    <ul class="mt-2 list-disc list-inside text-sm text-slate-700">
                      <li><strong>FV</strong>: Future Value</li>
                      <li><strong>P</strong>: Initial Investment</li>
                      <li><strong>r</strong>: Annual Rate of Return</li>
                      <li><strong>n</strong>: Time Period in Years</li>
                    </ul>
                  `}
                />
              </section>

              {/* ADVANTAGES LIST */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Key Advantages of Lumpsum Investing
                </h3>
                <WikiText
                  content={`
                    <ul class="mt-2 list-disc list-inside space-y-2 text-slate-700">
                      <li><strong>Instant Market Exposure:</strong> Your entire capital starts compounding from day one.</li>
                      <li><strong>Simple Execution:</strong> One-time investment with no monthly tracking.</li>
                      <li><strong>Ideal for Low Volatility Assets:</strong> Works well with debt funds and FDs.</li>
                    </ul>
                  `}
                />
              </section>
            </article>

            {/* FAQs */}
            <section className="article no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions (FAQs)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={LUMPSUM_FAQS[0].id}
                    className="w-full space-y-2"
                  >
                    {LUMPSUM_FAQS.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left text-slate-900 font-medium hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answerText}
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
            <div className="sticky top-28 space-y-6">
              <AdSlot id="lumpsum-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
