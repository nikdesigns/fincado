import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import LumpsumClient from './LumpsumClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { LumpsumSchemas } from '@/components/schemas/LumpsumSchemas';
import { Info, Zap, TrendingUp, ArrowRight, DollarSign } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Lumpsum Calculator 2026 – One-Time Investment Returns Calculator',
  description:
    'Calculate lumpsum mutual fund returns with compound interest. Compare lumpsum vs SIP returns, check CAGR, investment multiple, and plan one-time investment strategies for 2026.',
  keywords: [
    'Lumpsum Calculator',
    'Lumpsum Investment Calculator',
    'Lumpsum vs SIP Calculator',
    'One Time Investment Calculator',
    'Mutual Fund Lumpsum Calculator',
    'Lumpsum Returns Calculator',
    'CAGR Calculator',
    'Compound Interest Calculator',
    'Lumpsum SIP Calculator',
    'Investment Multiple Calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/lumpsum-calculator/',
  },
  openGraph: {
    title: 'Lumpsum Calculator 2026 – Calculate One-Time Investment Returns',
    description:
      'Free lumpsum calculator to estimate mutual fund returns. Calculate compound interest, CAGR, and compare lumpsum vs SIP strategies.',
    url: 'https://fincado.com/lumpsum-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-lumpsum-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Lumpsum Calculator',
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

export default function LumpsumPage() {
  const introContent = autoLinkContent(`
    <p>
      A <strong>Lumpsum Investment</strong> refers to investing a single large amount of money 
      in one go, rather than spreading it out through monthly contributions like SIP. This strategy 
      is ideal when you have a windfall—such as a bonus, inheritance, property sale proceeds, or 
      retirement corpus—that you want to deploy immediately into mutual funds or other investments.
    </p>
    <p class="mt-4">
      Lumpsum investments benefit from <strong>compound interest</strong> from day one. Since the 
      entire amount is invested upfront, every rupee works for you from the start, potentially 
      generating higher returns over time compared to staggered investments like SIP.
    </p>
  `);

  const whenToUseLumpsumContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>Windfall Gains:</strong> Received a bonus, inheritance, or maturity proceeds from insurance/FD.</li>
      <li><strong>Market Corrections:</strong> Market has fallen significantly and you see a buying opportunity.</li>
      <li><strong>Long Investment Horizon:</strong> You have 10+ years and can ride out market volatility.</li>
      <li><strong>Low Valuation:</strong> Market valuations (P/E ratios) are historically low.</li>
      <li><strong>Goal-Based Planning:</strong> Large one-time goals like child's education or home down payment.</li>
    </ul>
  `);

  const lumpsumVsSIPContent = autoLinkContent(`
    <p>
      The age-old debate: Should you invest all at once or spread it via SIP? Here's the truth:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-4">
      <li><strong>Lumpsum wins in bull markets:</strong> If markets rise continuously, lumpsum captures full gains from day one.</li>
      <li><strong>SIP wins in volatile markets:</strong> Rupee cost averaging helps you buy more units when prices are low.</li>
      <li><strong>Timing risk:</strong> Lumpsum carries timing risk—if you invest at market peak, returns may be lower initially.</li>
      <li><strong>Behavioral advantage:</strong> SIP enforces discipline and removes the stress of "timing the market".</li>
    </ul>
    <p class="mt-4 font-semibold text-slate-700">
      <strong>Hybrid Strategy:</strong> Many experts recommend investing 50% as lumpsum and remaining 50% 
      via STP (Systematic Transfer Plan) or SIP over 6-12 months to balance both approaches.
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>
      Taxation on lumpsum mutual fund investments depends on the fund type and holding period:
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">Equity Mutual Funds:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>Short-Term (< 1 year):</strong> 20% tax on gains (STCG)</li>
      <li><strong>Long-Term (> 1 year):</strong> 12.5% tax on gains above ₹1.25 lakh per year (LTCG)</li>
    </ul>
    <h4 class="font-semibold text-slate-900 mt-4">Debt Mutual Funds:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>All gains taxed as per your income tax slab</strong> (no LTCG benefit from April 2023)</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'lumpsum-faq-1',
      question: 'What is lumpsum investment?',
      answer:
        'Lumpsum investment means investing a large sum of money in one go, rather than through monthly installments like SIP. It is ideal for deploying windfall gains such as bonuses, inheritance, or maturity proceeds.',
    },
    {
      id: 'lumpsum-faq-2',
      question: 'Lumpsum vs SIP - Which is better?',
      answer:
        'Lumpsum works best when markets are at low valuations or in strong bull markets. SIP is better for volatile markets as it averages out costs. Many investors use a hybrid approach: invest 50% lumpsum and 50% via STP/SIP over 6-12 months.',
    },
    {
      id: 'lumpsum-faq-3',
      question: 'What is the minimum amount for lumpsum investment?',
      answer:
        'Most mutual funds require a minimum lumpsum investment of ₹5,000 to ₹10,000. However, some funds may have lower or higher minimums. Check with your fund house or AMC for specific requirements.',
    },
    {
      id: 'lumpsum-faq-4',
      question: 'Can I withdraw my lumpsum investment anytime?',
      answer:
        'Yes, open-ended mutual funds allow withdrawal anytime. However, some funds may have exit loads (penalty) if you withdraw within a certain period (typically 1 year). ELSS funds have a mandatory 3-year lock-in.',
    },
    {
      id: 'lumpsum-faq-5',
      question: 'What is CAGR in lumpsum investment?',
      answer:
        'CAGR (Compound Annual Growth Rate) is the annualized rate of return on your lumpsum investment. It shows how much your investment grows each year on average. For example, 12% CAGR means your investment grows by 12% annually over the period.',
    },
    {
      id: 'lumpsum-faq-6',
      question: 'Is lumpsum investment taxable?',
      answer:
        'Yes. For equity funds held over 1 year, LTCG tax is 12.5% on gains above ₹1.25 lakh/year. For holdings under 1 year, STCG is 20%. Debt fund gains are taxed as per your income slab (no LTCG benefit).',
    },
    {
      id: 'lumpsum-faq-7',
      question: 'Should I invest lumpsum when market is high?',
      answer:
        'Ideally, avoid investing large lumpsum when markets are at all-time highs (high P/E ratios). Instead, use STP (Systematic Transfer Plan) to gradually move from debt to equity over 6-12 months. This reduces timing risk.',
    },
    {
      id: 'lumpsum-faq-8',
      question: 'What is STP in lumpsum investment?',
      answer:
        'STP (Systematic Transfer Plan) allows you to park your lumpsum in a debt fund and systematically transfer fixed amounts to an equity fund monthly. This combines benefits of both lumpsum (immediate deployment) and SIP (rupee cost averaging).',
    },
    {
      id: 'lumpsum-faq-9',
      question: 'Can I convert lumpsum to SIP?',
      answer:
        'No, you cannot convert an existing lumpsum investment to SIP. However, you can start a new SIP in the same fund. Alternatively, use STP to gradually transfer from one fund to another.',
    },
    {
      id: 'lumpsum-faq-10',
      question: 'What returns can I expect from lumpsum investment?',
      answer:
        'Historical data shows equity mutual funds have delivered 12-15% CAGR over 10+ years. Debt funds give 6-8% returns. However, past performance is not guaranteed. Your actual returns depend on market conditions and fund performance.',
    },
  ];

  return (
    <>
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

      <CalculatorSchema
        name="Lumpsum Investment Calculator"
        description="Calculate returns from one-time lumpsum mutual fund investments with compound interest and CAGR."
        url="https://fincado.com/lumpsum-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <LumpsumSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Lumpsum Investment Calculator" />
            <LanguageToggle path="/hi/lumpsum-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-green-100 text-lime-700">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Lumpsum Investment Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                Calculate one-time investment returns with compound interest
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText content={introContent} />
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="lumpsum-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      HISTORICAL EQUITY CAGR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Large-cap funds (15+ years)
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12–15%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      DEBT FUND RETURNS
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Average annualized returns
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6–8%
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
                      MINIMUM INVESTMENT
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Most mutual funds
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹5,000
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        onwards
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <LumpsumClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="lumpsum-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-lime-50/50 border-lime-200 text-slate-600">
              <Info className="h-4 w-4 text-lime-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Investment Tip
                </strong>
                Avoid investing large lumpsum at market peaks. Use STP
                (Systematic Transfer Plan) to gradually move from debt to equity
                over 6-12 months for better risk management.
              </AlertDescription>
            </Alert>

            {/* ✅ LUMPSUM FORMULA BLOCK */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Lumpsum Investment Formula
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      Lumpsum investments grow through compound interest. The
                      future value is calculated using the compound interest
                      formula:
                    </div>

                    {/* Formula Display */}
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto">
                      <div className="text-center text-xl font-serif">
                        FV = P × (1 + r/n)<sup>n×t</sup>
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
                        <span>= Future Value (Total corpus at maturity)</span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          P
                        </span>
                        <span>
                          = Principal amount (Lumpsum investment in ₹)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          r
                        </span>
                        <span>
                          = Annual interest rate (as decimal, e.g., 0.12 for
                          12%)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          n
                        </span>
                        <span>
                          = Number of times interest compounds per year
                          (1=yearly, 4=quarterly, 12=monthly)
                        </span>
                      </div>
                      <div className="flex gap-3 items-start ml-4">
                        <span className="min-w-10 font-mono font-semibold">
                          t
                        </span>
                        <span>= Investment duration in years</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-slate-700">
                        <strong>Note:</strong> For annual compounding (most
                        mutual funds), n=1, so the formula simplifies to FV = P
                        × (1 + r)<sup>t</sup>
                      </p>
                    </div>
                  </div>

                  {/* Example Calculation */}
                  <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🧮</span>
                      Example: Lumpsum Investment (Annual Compounding)
                    </h4>

                    <div className="space-y-3 text-sm text-slate-700">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <strong>Lumpsum Amount (P):</strong>
                        </div>
                        <div>₹5,00,000</div>

                        <div>
                          <strong>Expected Return (r):</strong>
                        </div>
                        <div>12% p.a.</div>

                        <div>
                          <strong>Time Period (t):</strong>
                        </div>
                        <div>10 years</div>

                        <div>
                          <strong>Compounding (n):</strong>
                        </div>
                        <div>Annual (1)</div>
                      </div>

                      <div className="pt-3 border-t border-blue-300">
                        <strong className="block mb-2">
                          Step 1: Convert Rate to Decimal
                        </strong>
                        <div className="ml-4 font-mono text-base">
                          r = 12 ÷ 100 = 0.12
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 2: Calculate (1 + r)<sup>t</sup>
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>
                            (1 + 0.12)<sup>10</sup> = (1.12)<sup>10</sup>
                          </div>
                          <div>≈ 3.1058</div>
                        </div>
                      </div>

                      <div className="pt-3">
                        <strong className="block mb-2">
                          Step 3: Calculate Future Value
                        </strong>
                        <div className="ml-4 space-y-2 font-mono text-sm">
                          <div>FV = 5,00,000 × 3.1058</div>
                          <div>FV = 15,52,900</div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-white rounded border-2 border-emerald-500">
                        <div className="text-base font-semibold text-slate-700 mb-1">
                          Future Value:
                        </div>
                        <div className="text-3xl font-bold text-emerald-700">
                          ₹15,52,900
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-blue-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Investment:</span>
                          <strong>₹5,00,000</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Wealth Gained:</span>
                          <strong className="text-green-700">₹10,52,900</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Investment Multiple:</span>
                          <strong className="text-lime-700">3.11x</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Absolute Return:</span>
                          <strong className="text-blue-700">210.58%</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CAGR Explanation */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Understanding CAGR (Compound Annual Growth Rate)
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        CAGR represents the rate at which your investment grows
                        annually, assuming constant growth. For lumpsum
                        investments, CAGR equals the expected return rate.
                      </p>
                      <div className="p-3 bg-white rounded border border-purple-200 mt-2">
                        <div className="font-mono text-sm">
                          CAGR = [(FV / P)<sup>1/t</sup> - 1] × 100
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        In our example: CAGR = [(15,52,900 / 5,00,000)
                        <sup>1/10</sup> - 1] × 100 = 12%
                      </p>
                    </div>
                  </div>

                  {/* Power of Compounding */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <span>💡</span>
                      Power of Compounding
                    </h4>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p>
                        The real magic of lumpsum investing lies in compound
                        interest—your returns generate their own returns. See
                        how ₹5 lakh grows:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-xs mt-2">
                        <li>Year 5: ₹8.81 lakh (1.76x)</li>
                        <li>Year 10: ₹15.53 lakh (3.11x)</li>
                        <li>Year 15: ₹27.37 lakh (5.47x)</li>
                        <li>Year 20: ₹48.23 lakh (9.65x)</li>
                        <li>Year 25: ₹85.00 lakh (17x)</li>
                      </ul>
                      <p className="text-xs font-semibold text-amber-800 mt-2">
                        The longer you stay invested, the more powerful
                        compounding becomes!
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 italic mt-1">
                    This calculator uses standard compound interest formula.
                    Actual mutual fund returns vary based on NAV changes and
                    market performance. Past returns don&apos;t guarantee future
                    results.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Promo Card */}
            <Card className="no-print my-6 border-lime-200 bg-lime-50/50 transition-colors hover:bg-lime-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-lime-900">
                    Want to compare with monthly investments?
                  </strong>
                  <Link
                    href="/sip-calculator/"
                    className="group inline-flex items-center text-sm font-semibold text-lime-700 hover:text-lime-800"
                  >
                    <span>
                      Try our SIP Calculator to see how regular investing stacks
                      up
                    </span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Lumpsum Investment?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  When to Use Lumpsum Investment
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={whenToUseLumpsumContent} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="lumpsum-mid-content"
                  type="square"
                  label="Advertisement"
                  lazyLoad
                />
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  Lumpsum vs SIP: Which is Better?
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={lumpsumVsSIPContent} />
                </div>
              </section>

              {/* Comparison Table */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Lumpsum vs SIP Detailed Comparison
                </h3>

                <div className="overflow-x-auto">
                  <Table className="border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Factor</TableHead>
                        <TableHead className="text-left">Lumpsum</TableHead>
                        <TableHead className="text-left">SIP</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Investment Mode
                        </TableCell>
                        <TableCell className="text-slate-700">
                          One-time large amount
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Monthly installments
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Capital Required
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Large sum needed upfront
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Small amounts monthly
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Timing Risk
                        </TableCell>
                        <TableCell className="text-slate-700">
                          High (single entry point)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Low (rupee cost averaging)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Returns in Bull Market
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Higher (full exposure)
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Lower (gradual entry)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Returns in Bear Market
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Lower (bought at higher prices)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Higher (averaging down)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Discipline Required
                        </TableCell>
                        <TableCell className="text-slate-700">
                          One-time decision
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">
                          Enforces monthly savings
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium text-slate-700">
                          Best For
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Windfall gains, market corrections
                        </TableCell>
                        <TableCell className="text-slate-700">
                          Regular salaried investors
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-4">
                  <p className="text-sm text-slate-700">
                    <strong>Expert Verdict:</strong> Use lumpsum when markets
                    are down 20%+ from peaks or when you have 10+ year horizon.
                    For ongoing wealth creation, SIP is safer and more
                    disciplined. Many investors use both: lumpsum for windfalls,
                    SIP for monthly savings.
                  </p>
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Taxation on Lumpsum Mutual Fund Investments
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={taxContent} />
                </div>
              </section>

              {/* STP Strategy */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  STP: The Best of Both Worlds
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <p>
                    <strong>Systematic Transfer Plan (STP)</strong> is a hybrid
                    strategy that combines benefits of lumpsum and SIP:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 mt-4">
                    <li>
                      <strong>Step 1:</strong> Invest entire lumpsum in a liquid
                      or debt fund (low risk).
                    </li>
                    <li>
                      <strong>Step 2:</strong> Transfer fixed amount monthly
                      from debt to equity fund over 6-12 months.
                    </li>
                    <li>
                      <strong>Step 3:</strong> This averages out entry price
                      while keeping lumpsum deployed.
                    </li>
                  </ol>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-4">
                    <p className="text-sm text-slate-700">
                      <strong>Example:</strong> You have ₹10 lakh. Invest entire
                      amount in liquid fund. Transfer ₹1 lakh monthly to equity
                      fund for 10 months. Your money earns returns from day 1,
                      while you average out equity entry price.
                    </p>
                  </div>
                </div>
              </section>

              {/* How to Use Calculator */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  How to Use this Lumpsum Calculator
                </h3>
                <ol className="list-decimal pl-6 space-y-2 text-slate-700">
                  <li>
                    Enter your one-time investment amount (minimum ₹5,000).
                  </li>
                  <li>
                    Set expected annual return rate (8-12% for equity, 6-8% for
                    debt).
                  </li>
                  <li>Select investment period in years (minimum 1 year).</li>
                  <li>
                    Choose compounding frequency (annual is standard for mutual
                    funds).
                  </li>
                  <li>View future value, wealth gained, and CAGR instantly.</li>
                  <li>
                    Enable <strong>&quot;Advanced Metrics&quot;</strong> to see
                    investment multiple and absolute returns.
                  </li>
                  <li>
                    Save calculation or share via WhatsApp for planning
                    discussions.
                  </li>
                </ol>
              </section>

              {/* Best Lumpsum Funds */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Best Fund Categories for Lumpsum Investment
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Large-Cap Index Funds:</strong> Low risk, tracks
                      Nifty 50 or Sensex. Ideal for 5+ years. Expected: 10-12%
                      CAGR.
                    </li>
                    <li>
                      <strong>Flexi-Cap / Multi-Cap Funds:</strong> Balanced
                      exposure across market caps. Ideal for 7+ years. Expected:
                      12-14% CAGR.
                    </li>
                    <li>
                      <strong>Value Funds:</strong> Best during market
                      corrections when valuations are low. Higher risk.
                      Expected: 14-16% CAGR.
                    </li>
                    <li>
                      <strong>Debt Funds:</strong> For short-term goals (1-3
                      years) or as STP parking. Expected: 6-8% returns.
                    </li>
                    <li>
                      <strong>Balanced Advantage Funds:</strong> Dynamic
                      allocation between equity and debt. Lower volatility.
                      Expected: 10-12% CAGR.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Related Calculators */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Investment Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/sip-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            📈
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              SIP Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate returns from monthly systematic
                              investment plans.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                              <span>Compare Now</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/fd-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              FD Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate fixed deposit returns with guaranteed
                              interest.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Try Now</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="lumpsum-before-faq" type="leaderboard" lazyLoad />
            </div>

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

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="lumpsum-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="lumpsum-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="lumpsum-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
