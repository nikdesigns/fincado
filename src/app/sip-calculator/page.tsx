import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import SIPClient from './SIPClient'; // ✅ CHANGED: was './SIPCalculatorClient'
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import FAQSchema from '@/components/FAQSchema';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart3, Info, ArrowRight, TrendingUp } from 'lucide-react';
import { getCurrentMonthYearLabel } from '@/utils/formatMonthYear';
import { SIPSchemas } from '@/components/schemas/SIPSchemas';

const updatedLabel = getCurrentMonthYearLabel();

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'SIP Calculator 2026 – Mutual Fund SIP Returns Calculator India',
  description:
    'Free SIP Calculator for mutual funds in India. Calculate future value of monthly SIP, total investment, and wealth gain. Plan SIPs for goals like retirement, education, and house purchase.',
  keywords: [
    'sip calculator',
    'mutual fund sip calculator',
    'sip returns calculator',
    'monthly sip calculator',
    'sip goal calculator',
    'sip inflation',
    'sip vs lump sum calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/sip-calculator/',
  },
  openGraph: {
    title: 'SIP Calculator – Calculate Mutual Fund SIP Returns',
    description:
      'Estimate mutual fund SIP returns, total investment, and wealth gain using this SIP calculator. Plan your financial goals smarter.',
    url: 'https://fincado.com/sip-calculator/',
    type: 'website',
    images: [
      {
        url: 'https://fincado.com/og-sip-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado SIP Calculator',
      },
    ],
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

export default function SIPCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Systematic Investment Plan (SIP)</strong> lets you invest a fixed amount 
      regularly in mutual funds instead of making a one-time lump-sum investment. 
      SIPs benefit from <strong>rupee cost averaging</strong> and <strong>power of compounding</strong>, 
      making them ideal for long-term goals like retirement, children&apos;s education, and wealth creation.
    </p>
  `);

  const benefitsContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Disciplined Investing:</strong> Invest a fixed amount every month without timing the market.</li>
      <li><strong>Rupee Cost Averaging:</strong> You buy more units when markets are down and fewer when markets are up, averaging the purchase price.</li>
      <li><strong>Power of Compounding:</strong> Staying invested for long periods (10-20 years) helps your money grow exponentially.</li>
      <li><strong>Flexible &amp; Convenient:</strong> Start SIP from as low as ₹500 and increase/decrease anytime.</li>
      <li><strong>Goal-based Planning:</strong> Map SIPs to specific financial goals like house purchase, kids&apos; education, or early retirement.</li>
    </ul>
  `);

  const sipVsLumpsumContent = autoLinkContent(`
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-3 text-left font-semibold border">Parameter</th>
            <th class="p-3 text-left font-semibold border">SIP (Systematic Investment)</th>
            <th class="p-3 text-left font-semibold border">Lump Sum Investment</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Best For</td>
            <td class="p-3 border">Salaried investors with monthly income</td>
            <td class="p-3 border">Investors with large idle corpus</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Market Timing Risk</td>
            <td class="p-3 border text-emerald-700">Low – cost averaged over time</td>
            <td class="p-3 border">High – entire amount exposed to one entry point</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Volatility Experience</td>
            <td class="p-3 border">Smoother, gradual investment</td>
            <td class="p-3 border">More volatile portfolio value in short term</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Returns in Strong Bull Market</td>
            <td class="p-3 border">Slightly lower than lump sum</td>
            <td class="p-3 border text-emerald-700">Higher if invested early</td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="p-3 border font-medium">Behavioral Advantage</td>
            <td class="p-3 border">Builds discipline and avoids emotional decisions</td>
            <td class="p-3 border">Requires patience to stay invested through volatility</td>
          </tr>
        </tbody>
      </table>
    </div>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is a SIP and how does it work?',
      answer:
        'A Systematic Investment Plan (SIP) is a method of investing a fixed amount regularly (monthly/quarterly) into mutual funds. Each installment buys units at the prevailing NAV. Over time, SIP leverages rupee cost averaging and compounding to build wealth.',
    },
    {
      id: 'faq-2',
      question: 'How much should I invest in SIP every month?',
      answer:
        'It depends on your goal amount, time horizon, and expected returns. As a thumb rule, use the SIP calculator with your target amount, time frame, and assumed return (10-14% for equity funds) to back-calculate the required monthly SIP.',
    },
    {
      id: 'faq-3',
      question: 'What return should I assume for equity SIP in India?',
      answer:
        'Historically, Indian equity markets have delivered around 12-15% annualized returns over long periods. For planning, assume 10-12% for diversified equity mutual funds and 7-9% for hybrid funds. Always stay conservative rather than overestimating returns.',
    },
    {
      id: 'faq-4',
      question: 'Is SIP better than lump sum investment?',
      answer:
        'SIP is better for salaried investors and volatile markets because it averages out the purchase price and reduces timing risk. Lump sum can give higher returns if you invest a large amount at the start of a long bull market, but it carries higher timing risk.',
    },
    {
      id: 'faq-5',
      question: 'Can I increase or decrease my SIP amount later?',
      answer:
        'Yes. You can increase SIP (top-up SIP/step-up SIP) or start additional SIPs as your income grows. You can also pause or stop SIPs if needed. Increasing SIP by 5-10% every year significantly boosts your final corpus.',
    },
    {
      id: 'faq-6',
      question: 'Is SIP safe for short-term goals (1-3 years)?',
      answer:
        'No. Equity SIPs are suitable for goals at least 5-7 years away. For short-term goals (1-3 years), use debt funds, liquid funds, or recurring deposits where volatility is lower.',
    },
    {
      id: 'faq-7',
      question: 'Are SIP returns guaranteed?',
      answer:
        'No. SIPs are market-linked and returns are not guaranteed. The SIP calculator assumes a constant return for illustration, but actual returns will vary based on market performance and fund selection.',
    },
    {
      id: 'faq-8',
      question: 'Can I do SIP in index funds?',
      answer:
        'Yes. SIP in index funds (like Nifty 50, Nifty Next 50) is a popular low-cost way to participate in the market. Over long periods, broad-market index SIPs have historically given competitive returns with lower expense ratios.',
    },
    {
      id: 'faq-9',
      question: 'How is SIP taxed in India?',
      answer:
        'Each SIP installment is treated as a separate investment for tax purposes. For equity funds, gains after 1 year are long-term (10% LTCG above ₹1 lakh per year), and before 1 year are short-term (15% STCG). For debt funds, taxation depends on your slab with indexation no longer available for most funds.',
    },
    {
      id: 'faq-10',
      question: 'Can I run multiple SIPs for different goals?',
      answer:
        'Yes, and it is recommended. You can create separate SIPs/funds for different goals like retirement, child education, and house down payment. This makes it easier to track, rebalance, and withdraw when each goal is reached.',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'SIP Calculator',
            url: 'https://fincado.com/sip-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="SIP Calculator"
        description="Calculate mutual fund SIP returns. Estimate maturity amount, total investment, and wealth gain for long-term SIPs in India."
        url="https://fincado.com/sip-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <SIPSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="SIP Calculator – Calculate Mutual Fund SIP Returns" />
            <LanguageToggle path="/hi/investments/sip-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                SIP Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-indigo-700">
                Plan Mutual Fund SIPs for Long-Term Wealth Creation
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="sip-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      TYPICAL RETURN (EQUITY SIP)
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Long-term average (10+ years)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      10–14%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      WEALTH CREATION
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      ₹10k/month @ 12% for 20 years
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹95L+
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      UPDATED DATA
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Assumptions last reviewed
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {updatedLabel}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            {/* Calculator */}
            <SIPClient /> {/* ✅ CHANGED: was <SIPCalculatorClient /> */}
            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="sip-after-calc" type="square" />
            </div>
            {/* Info Alert */}
            <Alert className="mt-6 bg-indigo-50/50 border-indigo-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Long-Term Mindset is Key
                </strong>
                SIPs work best when you stay invested through market ups and
                downs. Avoid stopping SIPs during market falls – those periods
                actually buy more units cheaply.
              </AlertDescription>
            </Alert>
            {/* SIP Formula Block */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    SIP Return Calculation Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      SIP returns are calculated using the future value of an
                      annuity formula:
                    </div>

                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        FV = P × &#123;[(1 + r)<sup>n</sup> − 1] ÷ r&#125; × (1
                        + r)
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-700 mt-4">
                      <div className="flex gap-3 items-start">
                        <strong className="min-w-20">Where:</strong>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          FV
                        </span>
                        <span>
                          = Future value / maturity amount of your SIP
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>= Monthly SIP amount (in ₹)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Monthly return rate = Annual return ÷ 12 ÷ 100
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = Total number of SIP installments (years × 12)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: SIP Growth Calculation
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Monthly SIP (P):</strong>
                        </div>
                        <div>₹10,000</div>

                        <div>
                          <strong>Expected Annual Return:</strong>
                        </div>
                        <div>12% p.a.</div>

                        <div>
                          <strong>Investment Period:</strong>
                        </div>
                        <div>10 years (120 months)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Monthly Return Rate (r)
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 12 ÷ (12 × 100) = 12 ÷ 1200 = 0.01
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: (1 + r)<sup>n</sup>
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          (1 + 0.01)<sup>120</sup> ≈ 3.300
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Apply SIP Formula
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            FV = 10,000 × &#123;[(1.01)<sup>120</sup> − 1] ÷
                            0.01&#125; × 1.01
                          </div>
                          <div>
                            FV = 10,000 × &#123;(3.300 − 1) ÷ 0.01&#125; × 1.01
                          </div>
                          <div>FV = 10,000 × (2.300 ÷ 0.01) × 1.01</div>
                          <div>FV = 10,000 × 230 × 1.01</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Approx. Maturity Value:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ≈ ₹23,23,000
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Total Amount Invested:</span>
                          <strong>₹12,00,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Returns (Profit):</span>
                          <strong className="text-green-700">
                            ≈ ₹11,23,000
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Understanding SIP Compounding
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        Every monthly SIP installment grows at the assumed
                        return rate until the end of the tenure.
                      </li>
                      <li>
                        Earlier SIPs stay invested longer, so they contribute
                        more to the final corpus.
                      </li>
                      <li>
                        Small increases in return rate or tenure can
                        dramatically increase the maturity amount.
                      </li>
                    </ul>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This SIP calculator uses the standard annuity-based formula
                    followed by major Indian mutual fund platforms.
                  </div>
                </CardContent>
              </Card>
            </section>
            {/* SIP vs Lumpsum */}
            <section className="no-print mt-10">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    SIP vs Lump Sum Investment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-slate-700 leading-relaxed">
                    <WikiText content={sipVsLumpsumContent} />
                  </div>
                </CardContent>
              </Card>
            </section>
            {/* AD #3: IN-FEED */}
            <div className="no-print my-8">
              <AdSlot id="sip-infeed-1" type="banner" lazyLoad />
            </div>
            {/* Promo content */}
            <Card className="no-print my-6 border-indigo-200 bg-indigo-50/50 transition-colors hover:bg-indigo-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-indigo-900">
                    Want to build a ₹1 Crore corpus?
                  </strong>
                  <Link
                    href="/guides/sip-investing-guide/"
                    className="group inline-flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                  >
                    <span>Read our Complete SIP Investing Guide (2026)</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* Benefits & SIP concepts */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Benefits of SIP Investing
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={benefitsContent} />
                    </div>
                  </section>

                  {/* AD #4: MID-CONTENT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot
                      id="sip-mid-content"
                      type="square"
                      label="Advertisement"
                      lazyLoad
                    />
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      How to Use this SIP Calculator Effectively
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-slate-700">
                      <li>
                        Start with a realistic return assumption (10-12% for
                        equity funds, lower for hybrid or debt).
                      </li>
                      <li>
                        Try different tenures (10, 15, 20 years) to see the
                        impact of compounding.
                      </li>
                      <li>
                        Use the <strong>Step-up SIP</strong> option (if you add
                        it later) to model annual SIP increases.
                      </li>
                      <li>
                        Map each SIP to a clear goal and timeline to avoid
                        unnecessary withdrawals.
                      </li>
                      <li>
                        Review your SIPs once a year and rebalance between
                        equity and debt as you get closer to your goal.
                      </li>
                    </ul>
                  </section>

                  {/* Related calculators */}
                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      Related Calculators
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Link href="/emi-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                                💰
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                                  EMI Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Balance your SIPs with loan EMIs for a
                                  complete plan.
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                                  <span>Calculate Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/retirement-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                                🧓
                              </span>
                              <div className="flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                                  Retirement Corpus Calculator
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  Combine SIPs and lump sum to plan early
                                  retirement.
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                                  <span>Plan Now</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>
            {/* AD #5: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="sip-before-faq" type="leaderboard" lazyLoad />
            </div>
            {/* FAQ */}
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
            {/* AD #6: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="sip-bottom" type="square" lazyLoad />
            </div>
            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #7: SIDEBAR TOP */}
              <AdSlot id="sip-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #9: SIDEBAR BOTTOM */}
              <AdSlot id="sip-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
