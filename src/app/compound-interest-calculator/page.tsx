import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import CompoundInterestClient from './CompoundInterestClient';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { CompoundInterestSchemas } from '@/components/schemas/CompoundInterestSchemas';
import {
  BadgeCheck,
  TrendingUp,
  Info,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'Compound Interest Calculator India 2026 – Power of Compounding',
  description:
    'Free compound interest calculator for FD, PPF, mutual funds. Calculate with monthly, quarterly, yearly compounding. Compare CI vs SI. Year-wise breakdown with Rule of 72.',
  keywords: [
    'Compound Interest Calculator',
    'CI Calculator India',
    'Power of Compounding',
    'FD Maturity Calculator',
    'PPF Calculator',
    'Compound Interest Formula',
    'Rule of 72 Calculator',
    'Investment Growth Calculator',
    'Compounding Frequency Calculator',
    'CI vs SI Comparison',
  ],
  alternates: {
    canonical: 'https://fincado.com/compound-interest-calculator/',
  },
  openGraph: {
    title: 'Compound Interest Calculator 2026 – Exponential Growth',
    description:
      'Calculate compound interest with multiple frequencies. See power of compounding on your investments. FD, PPF, mutual fund returns calculator.',
    url: 'https://fincado.com/compound-interest-calculator/',
    type: 'website',
    images: [
      {
        url: '/og-compound-interest-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Fincado Compound Interest Calculator',
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

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'faq-1',
    question: 'What is Compound Interest and how does it work?',
    answer:
      'Compound Interest is interest calculated on both principal and accumulated interest. Formula: A = P(1+r/n)^(nt). Unlike Simple Interest which is linear, CI grows exponentially. Example: ₹1L at 10% for 10 years becomes ₹2.59L with CI vs ₹2L with SI. The longer the time period, the more dramatic the compounding effect.',
  },
  {
    id: 'faq-2',
    question: 'Which investments use Compound Interest in India?',
    answer:
      'Most investments use compounding: Fixed Deposits (quarterly compounding), PPF (yearly), EPF (yearly), Mutual Funds (daily NAV growth compounds), Recurring Deposits (quarterly), Savings Account (quarterly/monthly), Corporate Bonds (semi-annual), NPS (daily). Bank FDs typically compound quarterly. Only flat-rate loans use simple interest.',
  },
  {
    id: 'faq-3',
    question: 'How does compounding frequency affect returns?',
    answer:
      'Higher frequency = marginally better returns. Example: ₹1L at 10% for 10 years: Yearly (n=1) = ₹2,59,374, Quarterly (n=4) = ₹2,68,506, Monthly (n=12) = ₹2,70,704, Daily (n=365) = ₹2,71,791. Difference between yearly and daily is ₹12,417 (4.8%). Most Indian FDs use quarterly compounding as sweet spot between simplicity and returns.',
  },
  {
    id: 'faq-4',
    question: 'What is the Rule of 72 for doubling money?',
    answer:
      'Rule of 72 estimates time to double investment: Years to Double = 72 ÷ Interest Rate. Examples: 6% doubles in 12 years (72÷6), 8% in 9 years, 10% in 7.2 years, 12% in 6 years. At 15%, money doubles in 4.8 years. This explains why equity (12-15% returns) dramatically outperforms FD (6-7%) over 10+ years.',
  },
  {
    id: 'faq-5',
    question: 'How much better is Compound Interest than Simple Interest?',
    answer:
      'CI advantage grows exponentially with time. Difference for ₹1L at 10%: 5 years: CI ₹61K vs SI ₹50K (22% more), 10 years: CI ₹1.59L vs SI ₹1L (59% more), 20 years: CI ₹5.73L vs SI ₹2L (186% more), 30 years: CI ₹16.45L vs SI ₹3L (448% more). For long-term wealth (10+ years), CI is 2-5x better than SI.',
  },
  {
    id: 'faq-6',
    question: 'How to calculate FD maturity with quarterly compounding?',
    answer:
      'Use formula: A = P(1+r/4)^(4t). Example: ₹5L FD at 7% for 5 years with quarterly compounding: A = 500000(1+0.07/4)^(4×5) = 500000(1.0175)^20 = ₹7,04,702. Interest earned = ₹2,04,702. Most bank FDs compound quarterly. Use n=4 in calculator. Check if interest is paid out (then no compounding) or reinvested (compounds).',
  },
  {
    id: 'faq-7',
    question: 'What return do I need to double money in 10 years?',
    answer:
      'Use reverse Rule of 72: Rate = 72 ÷ Years. To double in 10 years: 72÷10 = 7.2% annual return. To double in: 5 years need 14.4%, 7 years need 10.3%, 12 years need 6%, 15 years need 4.8%. Current FD rates (6-7%) double money in 10-12 years. PPF (7.1%) in 10 years. Equity mutual funds (12-15%) in 5-6 years.',
  },
  {
    id: 'faq-8',
    question: 'How does PPF compound interest work?',
    answer:
      'PPF compounds annually (yearly). Interest calculated on lowest balance between 5th-end of month. Current rate: 7.1% p.a. Example: ₹1.5L yearly for 15 years: Total investment = ₹22.5L, Maturity ≈ ₹40.68L, Interest = ₹18.18L. PPF is EEE (fully tax-free). Invest before 5th of month to earn interest for that month. Lock-in 15 years, partial withdrawal after 6 years.',
  },
  {
    id: 'faq-9',
    question: 'Why do mutual funds grow faster than FDs despite similar rates?',
    answer:
      'Mutual funds have daily compounding effect through NAV. Even at 8% return, daily compounding gives ₹2,22,544 vs FD quarterly ₹2,19,112 on ₹1L for 10 years. Plus, equity funds average 12-15% (3-year rolling) vs FD 6-7%. Tax: LTCG 10% above ₹1L vs FD interest taxed at slab. Post-tax: MF 13.5% effective, FD in 30% bracket gives 4.9% (7% pre-tax). Real wealth creation only in equity over 10+ years.',
  },
  {
    id: 'faq-10',
    question: 'How to maximize compound interest returns?',
    answer:
      'Seven strategies: (1) Start early (20 years at 10% = 6.7x principal vs 10 years = 2.6x), (2) Choose higher compounding frequency (monthly > quarterly > yearly), (3) Never withdraw interest (reinvest for compounding), (4) Increase principal regularly (SIP/STP compounds monthly), (5) Maximize tenure (15-20 years for exponential growth), (6) Pick tax-efficient options (PPF EEE, ELSS LTCG 10%), (7) Stay in equity for 10+ years (12-15% vs 6-7% FD doubles returns).',
  },
];

/* ---------------- PAGE ---------------- */
export default function CompoundInterestPage() {
  const introContent = autoLinkContent(`
    <p>
      <strong>Compound Interest</strong> is the "eighth wonder of the world" according to Albert Einstein. 
      It is interest calculated on both the <strong>principal amount and accumulated interest</strong>, 
      creating exponential growth over time.
    </p>
    <p class="mt-4">
      Unlike Simple Interest which grows linearly, Compound Interest creates a snowball effect where your 
      money earns interest, and that interest earns more interest. This is the fundamental principle 
      behind long-term wealth creation through investments like Fixed Deposits, PPF, EPF, and Mutual Funds.
    </p>
  `);

  const formulaExplanation = autoLinkContent(`
    <p>
      The compound interest formula calculates the future value of an investment:
    </p>
    <p class="mt-3 font-mono text-sm bg-slate-100 p-2 rounded">
      A = P(1 + r/n)^(nt)
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-3">
      <li><strong>A</strong> = Maturity Amount (Future Value)</li>
      <li><strong>P</strong> = Principal (Initial Investment)</li>
      <li><strong>r</strong> = Annual Interest Rate (as decimal, e.g., 10% = 0.10)</li>
      <li><strong>n</strong> = Compounding Frequency per year (1=Yearly, 4=Quarterly, 12=Monthly)</li>
      <li><strong>t</strong> = Time Period in years</li>
    </ul>
    <p class="mt-3">
      <strong>Compound Interest</strong> = Maturity Amount - Principal
    </p>
  `);

  const powerOfCompounding = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">Real-World Example: The 10-Year Difference</h4>
    <p class="mt-2">
      Two friends, Rahul and Priya, both invest ₹1,00,000 at 10% annual return with quarterly compounding:
    </p>
    
    <div class="mt-4 space-y-3">
      <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="font-semibold text-blue-900">Rahul (Invests for 10 years)</p>
        <ul class="text-sm text-slate-700 mt-2 space-y-1">
          <li>• Principal: ₹1,00,000</li>
          <li>• After 10 years: <strong>₹2,68,506</strong></li>
          <li>• Interest Earned: <strong>₹1,68,506</strong></li>
          <li>• Money multiplied by: <strong>2.69x</strong></li>
        </ul>
      </div>

      <div class="p-3 mt-6 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p class="font-semibold text-emerald-900">Priya (Invests for 20 years)</p>
        <ul class="text-sm text-slate-700 mt-2 space-y-1">
          <li>• Principal: ₹1,00,000 (same as Rahul)</li>
          <li>• After 20 years: <strong>₹7,20,957</strong></li>
          <li>• Interest Earned: <strong>₹6,20,957</strong></li>
          <li>• Money multiplied by: <strong>7.21x</strong></li>
        </ul>
      </div>

      <div class="p-3 mt-6 bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
        <p class="font-semibold text-purple-900">Priya's Extra 10 Years Advantage</p>
        <ul class="text-sm text-slate-700 mt-2 space-y-1">
          <li>• Extra maturity value: <strong>₹4,52,451</strong></li>
          <li>• Priya earned <strong>₹3.69</strong> for every ₹1 Rahul earned</li>
          <li>• This is the power of <strong>exponential compounding!</strong></li>
        </ul>
      </div>
    </div>

    <p class="mt-4 text-sm font-semibold text-orange-700">
      💡 Key Insight: The second 10 years earned MORE (₹4.52L) than the first 10 years (₹1.68L) 
      because interest was compounding on a much larger base. Time is the most powerful factor in compounding.
    </p>
  `);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Calculators', url: 'https://fincado.com/calculators/' },
          {
            name: 'Compound Interest Calculator',
            url: 'https://fincado.com/compound-interest-calculator/',
          },
        ]}
      />

      <CalculatorSchema
        name="Compound Interest Calculator - Power of Compounding"
        description="Calculate compound interest with multiple frequencies. See exponential growth on FD, PPF, mutual funds. Compare CI vs SI with year-wise breakdown."
        url="https://fincado.com/compound-interest-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <CompoundInterestSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="Compound Interest Calculator 2026" />
            <LanguageToggle path="/hi/compound-interest-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-lime-100 text-lime-700">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                Compound Interest Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-lime-700">
                Exponential Growth & Power of Compounding
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  Calculate compound interest for Fixed Deposits, PPF, EPF, mutual funds, and recurring 
                  deposits. Understand exponential growth with monthly, quarterly, and yearly compounding 
                  frequencies.
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                Budget 2026: Interest Taxation Unchanged
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The Union Budget 2026 maintained existing interest taxation
                rules. FD/RD interest taxable as per slab, PPF remains EEE
                (fully tax-free), EPF tax-free up to ₹2.5L annual contribution.
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="ci-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      BANK FD RATE
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Quarterly compounding
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      6.5-8%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Senior citizens: +0.5%
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-lime-200 bg-linear-to-br from-lime-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-lime-700 mb-1">
                      PPF RATE 2026
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Yearly compounding
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      7.1%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        p.a.
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Tax-free (EEE status)
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-linear-to-br from-purple-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-purple-700 mb-1">
                      EQUITY MF CAGR
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      Daily NAV growth compounds
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      12-15%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        avg
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      10+ year rolling average
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <CompoundInterestClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="ci-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  Compounding Frequency Matters
                </strong>
                Higher compounding frequency (monthly/quarterly) gives
                marginally better returns than yearly. Most Indian bank FDs use
                quarterly compounding. Mutual funds compound daily through NAV
                changes.
              </AlertDescription>
            </Alert>

            {/* Promo Card */}
            <Card className="no-print my-6 border-purple-200 bg-linear-to-br from-purple-50 to-white transition-colors hover:shadow-md">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-purple-900">
                    Want to maximize compounding? Try monthly SIP investments
                  </strong>
                  <p className="text-sm text-slate-700">
                    SIP combines rupee cost averaging with monthly compounding
                    for exponential long-term wealth creation
                  </p>
                  <Link
                    href="/sip-calculator/"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700 hover:text-purple-800"
                  >
                    Calculate SIP Returns →
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  What is Compound Interest?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Compound Interest Formula Explained
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={formulaExplanation} />
                </div>

                <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">
                    Mathematical Formula
                  </h4>
                  <div className="overflow-x-auto">
                    <BlockMath math="A = P \left(1 + \frac{r}{n}\right)^{nt}" />
                  </div>
                  <div className="mt-4">
                    <BlockMath math="CI = A - P" />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">
                    Example Calculation
                  </h4>
                  <p className="text-sm text-slate-700 mb-3">
                    Principal = ₹1,00,000 | Rate = 10% p.a. | Time = 10 years |
                    Frequency = Quarterly (n=4)
                  </p>
                  <div className="text-sm space-y-2">
                    <p>
                      A ={' '}
                      <InlineMath math="100000 \times \left(1 + \frac{0.10}{4}\right)^{4 \times 10}" />
                    </p>
                    <p>
                      A = <InlineMath math="100000 \times (1.025)^{40}" />
                    </p>
                    <p>
                      A = <strong className="text-indigo-900">₹2,68,506</strong>
                    </p>
                    <p className="mt-3">
                      Compound Interest = ₹2,68,506 - ₹1,00,000 =
                      <strong className="text-indigo-900"> ₹1,68,506</strong>
                    </p>
                  </div>
                </div>
              </section>

              {/* Power of Compounding Example */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  The Power of Compounding: Real Example
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={powerOfCompounding} />
                </div>
              </section>

              {/* AD #3: MID-CONTENT */}
              <div className="no-print my-8 flex justify-center">
                <AdSlot
                  id="ci-mid-content"
                  type="square"
                  label="Advertisement"
                />
              </div>

              {/* Compounding Frequency Impact */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Impact of Compounding Frequency
                </h3>

                <p className="text-slate-700">
                  The frequency at which interest is compounded significantly
                  affects returns. Here&apos;s a comparison for{' '}
                  <strong>₹1,00,000 at 10% for 10 years</strong>:
                </p>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Frequency</TableHead>
                        <TableHead>n Value</TableHead>
                        <TableHead>Maturity Amount</TableHead>
                        <TableHead>Interest Earned</TableHead>
                        <TableHead>Advantage</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Yearly</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>₹2,59,374</TableCell>
                        <TableCell>₹1,59,374</TableCell>
                        <TableCell className="text-slate-600">
                          Baseline
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Half-Yearly
                        </TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>₹2,65,330</TableCell>
                        <TableCell>₹1,65,330</TableCell>
                        <TableCell className="text-emerald-600">
                          +₹5,956
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Quarterly</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell className="font-semibold">
                          ₹2,68,506
                        </TableCell>
                        <TableCell>₹1,68,506</TableCell>
                        <TableCell className="text-emerald-600 font-semibold">
                          +₹9,132
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Monthly</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>₹2,70,704</TableCell>
                        <TableCell>₹1,70,704</TableCell>
                        <TableCell className="text-emerald-600">
                          +₹11,330
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Daily</TableCell>
                        <TableCell>365</TableCell>
                        <TableCell className="font-semibold text-lime-700">
                          ₹2,71,791
                        </TableCell>
                        <TableCell>₹1,71,791</TableCell>
                        <TableCell className="text-lime-700 font-semibold">
                          +₹12,417 (Best)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-slate-700">
                    <strong className="text-amber-900">Key Takeaway:</strong>{' '}
                    Daily compounding gives ₹12,417 more than yearly (4.8%
                    extra) on same principal. Most bank FDs in India use{' '}
                    <strong>quarterly compounding</strong>
                    as the optimal balance. Mutual funds compound daily through
                    NAV changes.
                  </p>
                </div>
              </section>

              {/* CI vs SI Detailed Comparison */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Compound Interest vs Simple Interest: Complete Comparison
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aspect</TableHead>
                        <TableHead>Simple Interest (SI)</TableHead>
                        <TableHead>Compound Interest (CI)</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Calculation Basis
                        </TableCell>
                        <TableCell>Only on principal</TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          On principal + accumulated interest
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Growth Pattern
                        </TableCell>
                        <TableCell>Linear (constant amount yearly)</TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Exponential (increases every period)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Formula</TableCell>
                        <TableCell>SI = (P × R × T) / 100</TableCell>
                        <TableCell>A = P(1+r/n)^(nt)</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          10 Years Return (₹1L @ 10%)
                        </TableCell>
                        <TableCell>₹2,00,000 (2x principal)</TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          ₹2,59,374 (2.6x principal)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          20 Years Return (₹1L @ 10%)
                        </TableCell>
                        <TableCell>₹3,00,000 (3x principal)</TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          ₹6,72,750 (6.7x principal)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          30 Years Return (₹1L @ 10%)
                        </TableCell>
                        <TableCell>₹4,00,000 (4x principal)</TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          ₹17,44,940 (17.4x principal)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Best For</TableCell>
                        <TableCell>Short-term loans (1-2 years)</TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Long-term investments (5+ years)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">Used In</TableCell>
                        <TableCell>Flat rate car loans, gold loans</TableCell>
                        <TableCell className="text-emerald-700">
                          FD, PPF, EPF, Mutual Funds, RD
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Long-term Advantage
                        </TableCell>
                        <TableCell className="text-red-600">
                          Limited growth
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Exponential wealth creation
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">
                    Visual Comparison: ₹1L at 10% over Time
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-4 mt-3">
                    <div className="p-3 bg-white rounded border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">
                        After 10 years
                      </div>
                      <div className="text-base font-bold text-slate-900">
                        SI: ₹2.0L
                      </div>
                      <div className="text-base font-bold text-emerald-700">
                        CI: ₹2.59L
                      </div>
                      <div className="text-xs text-emerald-700 mt-1">
                        CI earns ₹59K more (29%)
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded border border-slate-200">
                      <div className="text-xs text-slate-600 mb-1">
                        After 20 years
                      </div>
                      <div className="text-base font-bold text-slate-900">
                        SI: ₹3.0L
                      </div>
                      <div className="text-base font-bold text-emerald-700">
                        CI: ₹6.73L
                      </div>
                      <div className="text-xs text-emerald-700 mt-1">
                        CI earns ₹3.73L more (124%)
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-100 rounded border border-emerald-300">
                      <div className="text-xs text-emerald-800 mb-1">
                        After 30 years
                      </div>
                      <div className="text-base font-bold text-slate-900">
                        SI: ₹4.0L
                      </div>
                      <div className="text-base font-bold text-emerald-900">
                        CI: ₹17.45L
                      </div>
                      <div className="text-xs text-emerald-900 font-semibold mt-1">
                        CI earns ₹13.45L more (336%)!
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Rule of 72 */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  The Rule of 72: Quick Doubling Time Calculator
                </h3>

                <p className="text-slate-700">
                  The Rule of 72 is a simple formula to estimate how many years
                  it takes to double your money at a given interest rate:
                </p>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-900 mb-2">
                      Years to Double = 72 ÷ Interest Rate
                    </div>
                    <p className="text-sm text-slate-700">
                      Example: At 10% interest, money doubles in 72÷10 ={' '}
                      <strong>7.2 years</strong>
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Interest Rate</TableHead>
                        <TableHead>Years to Double</TableHead>
                        <TableHead>Years to Triple</TableHead>
                        <TableHead>Common Investments</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          6% (Bank FD)
                        </TableCell>
                        <TableCell>12 years</TableCell>
                        <TableCell>19 years</TableCell>
                        <TableCell>Fixed Deposits, Savings</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">7% (PPF)</TableCell>
                        <TableCell>10.3 years</TableCell>
                        <TableCell>16 years</TableCell>
                        <TableCell>PPF, Tax-free bonds</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">8% (EPF)</TableCell>
                        <TableCell>9 years</TableCell>
                        <TableCell>14 years</TableCell>
                        <TableCell>EPF, Corporate FDs</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">10%</TableCell>
                        <TableCell className="font-semibold">
                          7.2 years
                        </TableCell>
                        <TableCell>11 years</TableCell>
                        <TableCell>Balanced Funds</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          12% (Equity MF)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-700">
                          6 years
                        </TableCell>
                        <TableCell className="text-emerald-700">
                          9 years
                        </TableCell>
                        <TableCell className="font-semibold">
                          Equity Mutual Funds
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          15% (Best MF)
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-700">
                          4.8 years
                        </TableCell>
                        <TableCell className="text-emerald-700">
                          7.5 years
                        </TableCell>
                        <TableCell>Top-performing Equity Funds</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-700">
                    <strong className="text-blue-900">
                      Investment Strategy:
                    </strong>{' '}
                    This explains why financial advisors recommend equity mutual
                    funds for long-term goals. At 12%, money doubles in 6 years
                    vs 12 years for FD at 6%. Over 24 years, equity grows 16x vs
                    FD 4x.
                  </p>
                </div>
              </section>

              {/* Real-World Applications */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Compound Interest in Popular Indian Investments
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🏦</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Bank Fixed Deposit (FD)
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Most banks offer quarterly compounding. Current
                            rates: 6.5-8% p.a.
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>Example:</strong> ₹5L at 7% for 5 years
                            (quarterly) = ₹7,04,702. Interest earned: ₹2,04,702.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">🛡️</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Public Provident Fund (PPF)
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Yearly compounding, currently 7.1% p.a. Fully
                            tax-free (EEE).
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>Example:</strong> ₹1.5L yearly for 15 years
                            = ₹40.68L maturity. Investment: ₹22.5L, Interest:
                            ₹18.18L.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">👔</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Employee Provident Fund (EPF)
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Yearly compounding, currently 8.15% p.a. Tax-free on
                            withdrawal.
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>Example:</strong> ₹5,000/month (12%
                            contribution) for 30 years at 8.15% = ₹96.8L corpus!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">📈</span>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            Equity Mutual Funds
                          </h4>
                          <p className="text-sm text-slate-700 mb-2">
                            Daily compounding via NAV. Historical: 12-15% CAGR
                            (10+ years).
                          </p>
                          <p className="text-xs text-slate-600">
                            <strong>Example:</strong> ₹10,000/month SIP for 20
                            years at 12% = ₹99.9L. Investment: ₹24L, Returns:
                            ₹75.9L!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Maximizing CI Returns */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  7 Strategies to Maximize Compound Interest Returns
                </h3>

                <div className="space-y-4">
                  <Card className="border-emerald-200 bg-emerald-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-emerald-600 text-white shrink-0">
                          1
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Start Early – Time is Your Best Friend
                          </h4>
                          <p className="text-sm text-slate-700">
                            Investing at 25 vs 35 makes a HUGE difference.
                            ₹10,000/month SIP for 35 years (from age 25-60) at
                            12% = ₹6.45 crores. Starting at 35 gives only ₹1.75
                            crores (3.7x less)!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-blue-600 text-white shrink-0">
                          2
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Choose Higher Compounding Frequency
                          </h4>
                          <p className="text-sm text-slate-700">
                            Pick monthly/quarterly over yearly when possible. FD
                            with quarterly compounds better than yearly. Mutual
                            funds compound daily. Every frequency jump adds 1-3%
                            extra over long term.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          3
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Never Withdraw Interest – Always Reinvest
                          </h4>
                          <p className="text-sm text-slate-700">
                            Breaking compounding is wealth destruction. Taking
                            out FD interest annually kills compounding. Choose
                            &quot;cumulative&quot; FDs over
                            &quot;non-cumulative&quot;. Growth mutual funds over
                            dividend.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          4
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Increase Principal Regularly (Step-Up SIP)
                          </h4>
                          <p className="text-sm text-slate-700">
                            Start ₹5,000/month SIP, increase 10% yearly. After
                            20 years: Regular SIP = ₹50L corpus. Step-up SIP =
                            ₹89L corpus (78% more). Match salary increments with
                            investment increases.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          5
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Maximize Investment Tenure (15-20+ Years)
                          </h4>
                          <p className="text-sm text-slate-700">
                            Compounding is exponential. First 5 years: slow
                            growth. Years 10-15: moderate acceleration. Years
                            15-20: explosive wealth creation. Last 5 years of
                            20-year SIP create 40% of corpus!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          6
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Choose Tax-Efficient Investments
                          </h4>
                          <p className="text-sm text-slate-700">
                            PPF (tax-free), ELSS (only 10% LTCG), Equity MF (10%
                            above ₹1L) compound better post-tax than FD (taxed
                            at slab). In 30% bracket, 7% FD = 4.9% post-tax vs
                            PPF 7.1% tax-free.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-slate-600 text-white shrink-0">
                          7
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">
                            Stay in Equity for 10+ Years (Best Returns)
                          </h4>
                          <p className="text-sm text-slate-700">
                            Equity gives 12-15% CAGR over 10+ years vs FD 6-7%.
                            This doubles real wealth every 5-6 years vs 10-12
                            years. For goals 10+ years away (retirement, child
                            education), equity compounds 2-3x faster than debt.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Related Financial Calculators
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/sip-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              SIP Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate monthly SIP returns with rupee cost
                              averaging and compounding. Best for long-term
                              wealth creation.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>Calculate SIP Returns</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/fd-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 text-2xl">
                            🏦
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 mb-1">
                              Fixed Deposit Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate FD maturity with quarterly compounding.
                              Compare cumulative vs non-cumulative FDs.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-blue-700">
                              <span>Calculate FD Maturity</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/ppf-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-lime-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-lime-50 to-lime-100 text-lime-700 text-2xl">
                            🛡️
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-lime-700 mb-1">
                              PPF Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate PPF maturity with yearly compounding.
                              Fully tax-free returns (EEE status).
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-lime-700">
                              <span>Calculate PPF Returns</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/simple-interest-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-indigo-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-50 to-indigo-100 text-indigo-700 text-2xl">
                            📊
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">
                              Simple Interest Calculator
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Calculate linear interest for flat-rate loans.
                              Compare with compound interest to see difference.
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-indigo-700">
                              <span>Calculate Simple Interest</span>
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
              <AdSlot id="ci-before-faq" type="leaderboard" lazyLoad />
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
              <AdSlot id="ci-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="ci-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="ci-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
