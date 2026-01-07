import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
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
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Clock,
  Calculator,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Coins,
  ShieldCheck,
  Scale,
  Ban,
  TrendingDown,
  History,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'SIP Investment Guide 2025: Beginner to Advanced Strategy',
  description:
    'Complete SIP Investment Guide 2025: Learn how SIP works, compounding magic, SIP vs lump sum, age-wise investment strategy, tax rules, returns on ₹5K-₹15K monthly SIP & common mistakes to avoid.',
  keywords: [
    'SIP investment guide 2025',
    'what is SIP',
    'SIP vs lump sum',
    'SIP returns calculator',
    'SIP tax rules India',
    'best SIP amount',
    'SIP compounding',
    'systematic investment plan',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'SIP Investment Guide 2025',
    description:
      'Complete SIP guide covering compounding, tax rules, returns & age-wise strategies.',
  },
  alternates: {
    canonical: 'https://www.fincado.com/guides/sip-investment-guide',
  },
  openGraph: {
    title: 'SIP Investment Guide 2025 | Wealth Creation Strategy',
    description:
      'Master SIP investing: Returns, Taxes, and Market Crash strategies for 2025.',
    url: 'https://www.fincado.com/guides/sip-investment-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/sip/sip-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'SIP Investment Guide Hero Image',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is SIP and how does it work?',
    answer:
      'SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly (monthly/quarterly) in mutual funds through auto-debit. It uses rupee-cost averaging to buy more units when prices are low and fewer when high, reducing average purchase cost over time.',
  },
  {
    question: 'What is the minimum amount to start a SIP?',
    answer:
      'Most mutual funds allow SIP starting from ₹500/month, with some funds accepting as low as ₹100/month. You can start with any amount comfortable for your budget and increase gradually.',
  },
  {
    question: 'Is SIP better than lump sum investment?',
    answer:
      'For 85% of retail investors, yes—SIP is better because it eliminates market timing risk, provides rupee-cost averaging benefits, and builds disciplined investment habits. Lump sum works better only if you invest during major market corrections (15-20% falls).',
  },
  {
    question: 'How much SIP should I do according to my age?',
    answer:
      'General guideline: Ages 20-30: ₹5K-₹15K/month (20-30% of income); Ages 30-40: ₹15K-₹40K/month (25-40% of income); Ages 40-50: ₹40K-₹1L/month (30-50% of income). Always prioritize emergency fund first.',
  },
  {
    question: 'What returns can I expect from SIP?',
    answer:
      'Historical equity mutual fund SIP returns (15-20 years): 12-15% CAGR. However, returns vary by fund category—large-cap (10-12%), flexi-cap (12-14%), mid-cap (14-16%), small-cap (15-18% but highly volatile). Returns are not guaranteed.',
  },
  {
    question: 'How is SIP taxed in India?',
    answer:
      'For equity funds: LTCG (>12 months) taxed at 12.5% on gains above ₹1.25 lakh/year; STCG (<12 months) taxed at 20%. For debt funds: gains added to income and taxed at your slab rate. ELSS offers Section 80C deduction up to ₹1.5 lakh.',
  },
  {
    question: 'Should I continue SIP during market crash?',
    answer:
      "Absolutely YES! Market crashes are SIP investors' best friends—you accumulate more units at lower prices. Historical data shows investors who continued SIP during 2008 and 2020 crashes earned 8-12% higher returns than those who paused.",
  },
  {
    question: 'How long should I continue my SIP?',
    answer:
      'Minimum 5-7 years for large-cap funds, 7-10 years for mid-cap, and 10-15 years for small-cap funds. Ideally, continue SIP until your financial goal is achieved. Data shows 10+ year SIPs have ZERO historical instances of negative returns in Indian equity markets.',
  },
  {
    question: 'Can I stop or pause my SIP anytime?',
    answer:
      'Yes (except ELSS which has 3-year lock-in). You can pause, stop, or withdraw your SIP investments anytime without penalty in open-ended mutual funds. However, premature withdrawal defeats the purpose of long-term compounding.',
  },
  {
    question: 'What are the biggest mistakes to avoid in SIP?',
    answer:
      "Top mistakes: (1) Stopping SIP during market falls, (2) choosing dividend over growth option, (3) over-diversification (15+ funds), (4) chasing last year's top performers, (5) not increasing SIP with salary hikes, and (6) redeeming for small expenses instead of letting it compound.",
  },
];

export default function SipGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'SIP Investment Guide 2025: Beginner to Advanced Strategy for Wealth Creation',
            description:
              'Complete SIP Investment Guide 2025 covering compounding, SIP vs Lump Sum, tax rules, and age-wise strategies.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-16',
            dateModified: '2025-12-16',
          }),
        }}
      />

      {/* --- FAQ SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'SIP Investment Guide',
            url: 'https://www.fincado.com/guides/sip-investment-guide',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Flagship Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          SIP Investment Guide 2025-26: Strategy & Tax Rules
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 22 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> SEBI-Compliant
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="SIP Investment Guide 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>SIP (Systematic Investment Plan) is a disciplined investment method where you invest a fixed amount regularly (monthly, quarterly, or weekly) in mutual funds, regardless of market conditions. It's the Indian retail investor's most powerful wealth-creation tool, with over 7.8 crore active SIP accounts as of December 2025, contributing ₹19,000+ crore monthly to mutual funds.</p>`}
          />
        </CardContent>
      </Card>

      {/* --- SECTION 1: SIP VS TRADITIONAL --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" /> SIP vs Traditional
            Investing
          </h2>
          <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">
                    Feature
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    SIP
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Lump Sum
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    RD (Recurring Deposit)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Investment Pattern
                  </TableCell>
                  <TableCell>Fixed amount regularly</TableCell>
                  <TableCell>One-time large amount</TableCell>
                  <TableCell>Fixed amount regularly</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Returns
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    12-15% (Equity)
                  </TableCell>
                  <TableCell>Variable (Timing dependent)</TableCell>
                  <TableCell>5.5-7.5% (Guaranteed)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Market Risk
                  </TableCell>
                  <TableCell>Averaged (Rupee Cost Averaging)</TableCell>
                  <TableCell className="text-red-600">
                    High (Timing Risk)
                  </TableCell>
                  <TableCell className="text-emerald-600">Zero</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Liquidity
                  </TableCell>
                  <TableCell>High (Redeem anytime)</TableCell>
                  <TableCell>High</TableCell>
                  <TableCell>Penalty on premature withdrawal</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Lock-in
                  </TableCell>
                  <TableCell>None (Except ELSS)</TableCell>
                  <TableCell>None</TableCell>
                  <TableCell>Usually 5 years</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 border border-blue-100 text-sm text-blue-900">
            <strong className="block mb-2 text-lg">Key Features of SIP:</strong>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Minimum Investment:</strong> As low as ₹500/month.
              </li>
              <li>
                <strong>Flexibility:</strong> Increase, pause, or stop anytime.
              </li>
              <li>
                <strong>Automation:</strong> Auto-debit ensures discipline.
              </li>
              <li>
                <strong>Rupee-Cost Averaging:</strong> Buy more units when low,
                fewer when high.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-sip-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: HOW SIP WORKS --- */}
      <section className="mb-12">
        <h2
          id="how-it-works"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-indigo-600" /> How SIP Works:
          Compounding Magic
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`SIP's real power lies in compounding—earning returns on your returns. Albert Einstein allegedly called compound interest "the eighth wonder of the world."`}
          />
        </div>

        {/* IMAGE: Compounding Graph */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/sip/power-of-compounding-graph.webp"
            alt="Graph showing exponential growth of SIP investments over 30 years"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="border-indigo-100 bg-indigo-50/30 mb-8">
          <CardHeader className="pb-2 border-b border-indigo-100">
            <CardTitle className="text-indigo-900 text-lg">
              The Power of Time: ₹10,000 Monthly SIP @ 12%
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-bold text-indigo-900">
                    Period
                  </TableHead>
                  <TableHead className="font-bold text-indigo-900">
                    Total Invested
                  </TableHead>
                  <TableHead className="font-bold text-indigo-900">
                    Maturity Value
                  </TableHead>
                  <TableHead className="font-bold text-indigo-900">
                    Wealth Gain
                  </TableHead>
                  <TableHead className="font-bold text-indigo-900">
                    Multiple
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>5 Years</TableCell>
                  <TableCell>₹6,00,000</TableCell>
                  <TableCell>₹8,16,000</TableCell>
                  <TableCell>₹2,16,000</TableCell>
                  <TableCell>1.36x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10 Years</TableCell>
                  <TableCell>₹12,00,000</TableCell>
                  <TableCell>₹23,00,000</TableCell>
                  <TableCell>₹11,00,000</TableCell>
                  <TableCell>1.92x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>15 Years</TableCell>
                  <TableCell>₹18,00,000</TableCell>
                  <TableCell>₹50,00,000</TableCell>
                  <TableCell>₹32,00,000</TableCell>
                  <TableCell>2.78x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>20 Years</TableCell>
                  <TableCell>₹24,00,000</TableCell>
                  <TableCell>₹99,00,000</TableCell>
                  <TableCell>₹75,00,000</TableCell>
                  <TableCell>4.13x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>25 Years</TableCell>
                  <TableCell>₹30,00,000</TableCell>
                  <TableCell>₹1,89,00,000</TableCell>
                  <TableCell>₹1,59,00,000</TableCell>
                  <TableCell>6.30x</TableCell>
                </TableRow>
                <TableRow className="bg-indigo-100 hover:bg-indigo-100">
                  <TableCell className="font-bold">30 Years</TableCell>
                  <TableCell className="font-bold">₹36,00,000</TableCell>
                  <TableCell className="font-bold text-emerald-700">
                    ₹3,53,00,000
                  </TableCell>
                  <TableCell className="font-bold text-emerald-700">
                    ₹3,17,00,000
                  </TableCell>
                  <TableCell className="font-bold">9.81x</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="p-4 text-sm text-indigo-900 bg-indigo-50/50">
              <strong>Shocking Insight:</strong> From year 20 to 30, your wealth
              increases by 4.2x, while you only invest 50% more capital. The
              last 10 years create more wealth than the first 20 combined!
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-sip-2" type="leaderboard" />
      </div>

      {/* --- SECTION 3: SIP VS LUMP SUM --- */}
      <section className="mb-12">
        <h2
          id="sip-vs-lumpsum"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Scale className="h-6 w-6 text-amber-500" /> SIP vs Lump Sum: The
          Verdict
        </h2>

        <p className="mb-6 text-slate-700">
          The eternal debate: Should you invest ₹12 lakh at once or ₹1 lakh
          monthly for 12 months?
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Market Scenario
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  SIP Return
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Lump Sum Return
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Winner
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Bull Market</strong> (Steady Rise)
                </TableCell>
                <TableCell>38-45%</TableCell>
                <TableCell>52-68%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Lump Sum
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Bear Market</strong> (Crash)
                </TableCell>
                <TableCell>12-15%</TableCell>
                <TableCell className="text-red-600">-10 to +5%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  SIP (Big Win)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Volatile Market</strong> (Up & Down)
                </TableCell>
                <TableCell>14-17%</TableCell>
                <TableCell>11-13%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  SIP
                </TableCell>
              </TableRow>
              <TableRow className="bg-slate-50">
                <TableCell>
                  <strong>25-Year Average</strong>
                </TableCell>
                <TableCell>12.8%</TableCell>
                <TableCell>11.9%</TableCell>
                <TableCell className="font-bold">SIP (Slight Edge)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                SIP Wins When...
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Market is volatile or bearish.</li>
                <li>You are a beginner.</li>
                <li>You have regular income (salary).</li>
                <li>You want to avoid timing risk.</li>
                <li>You are risk-averse.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg">
                Lump Sum Wins When...
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Market is at a correction bottom (-20%).</li>
                <li>Sustained bull run follows.</li>
                <li>You have a windfall (bonus/inheritance).</li>
                <li>Long horizon (10+ yrs) to recover.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
          <strong>The Hybrid Strategy (50-30-20 Rule):</strong> If you have a
          large lump sum, invest 50% immediately (Lump sum), put 30% in a liquid
          fund for STP (transfer to equity over 6-12 months), and use 20% to
          continue your regular salary SIP.
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-sip-3" type="leaderboard" />
      </div>

      {/* --- SECTION 4: AGE STRATEGY --- */}
      <section className="mb-12">
        <h2
          id="age-strategy"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Clock className="h-6 w-6 text-purple-600" /> Best SIP Amount by Age
        </h2>

        <div className="space-y-6">
          <Card className="border-emerald-200 bg-emerald-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Age 20-25: The Foundation Years
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Income Profile:</strong> ₹20,000 - ₹40,000/month
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Monthly Income</TableHead>
                    <TableHead>Recommended SIP</TableHead>
                    <TableHead>Goal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹25,000</TableCell>
                    <TableCell>₹2,500 - ₹5,000 (10-20%)</TableCell>
                    <TableCell>Build habit</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹35,000</TableCell>
                    <TableCell>₹5,000 - ₹7,000</TableCell>
                    <TableCell>₹10L corpus by 30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="mt-3 text-xs italic">
                <strong>Allocation:</strong> 90% Equity (Small/Mid Cap), 10%
                Debt.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                Age 25-35: Wealth Accumulation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Income Profile:</strong> ₹40,000 - ₹1,00,000/month
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Monthly Income</TableHead>
                    <TableHead>Recommended SIP</TableHead>
                    <TableHead>Goal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹50,000</TableCell>
                    <TableCell>₹10,000 - ₹15,000 (20-30%)</TableCell>
                    <TableCell>House down payment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹1,00,000+</TableCell>
                    <TableCell>₹25,000 - ₹40,000</TableCell>
                    <TableCell>Financial Independence</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="mt-3 text-xs italic">
                <strong>Allocation:</strong> 80% Equity (Flexi Cap), 15% Debt,
                5% Gold.
              </p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-indigo-800 text-lg">
                Age 35-45: Peak Earning & De-Risking
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Income Profile:</strong> ₹1L - ₹3L/month
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Monthly Income</TableHead>
                    <TableHead>Recommended SIP</TableHead>
                    <TableHead>Goal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>₹1,50,000</TableCell>
                    <TableCell>₹50,000 - ₹75,000 (33-50%)</TableCell>
                    <TableCell>₹2 Crore Corpus</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹3,00,000+</TableCell>
                    <TableCell>₹1.2L - ₹1.8L</TableCell>
                    <TableCell>Retirement</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="mt-3 text-xs italic">
                <strong>Allocation:</strong> 70% Equity (Large/Index), 25% Debt,
                5% Gold.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-sip-4" type="leaderboard" />
      </div>

      {/* --- SECTION 5: RETURNS EXAMPLES --- */}
      <section className="mb-12">
        <h2
          id="returns-examples"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Coins className="h-6 w-6 text-yellow-600" /> SIP Returns Matrix (12%)
        </h2>
        <p className="mb-6 text-slate-700">
          Real-world projections for different SIP amounts. Note how ₹5k can
          turn into ₹1.7 Crore over 30 years.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-8 shadow-sm">
          <h3 className="bg-slate-50 p-3 font-bold text-slate-800 border-b border-slate-200">
            ₹5,000 Monthly SIP
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Years</TableHead>
                <TableHead>Invested</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Gain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>10</TableCell>
                <TableCell>₹6 L</TableCell>
                <TableCell>₹11.5 L</TableCell>
                <TableCell>₹5.5 L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20</TableCell>
                <TableCell>₹12 L</TableCell>
                <TableCell>₹49.5 L</TableCell>
                <TableCell>₹37.5 L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>30</TableCell>
                <TableCell>₹18 L</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  ₹1.76 Cr
                </TableCell>
                <TableCell>₹1.58 Cr</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-8 shadow-sm">
          <h3 className="bg-slate-50 p-3 font-bold text-slate-800 border-b border-slate-200">
            ₹10,000 Monthly SIP
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Years</TableHead>
                <TableHead>Invested</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Gain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>10</TableCell>
                <TableCell>₹12 L</TableCell>
                <TableCell>₹23 L</TableCell>
                <TableCell>₹11 L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20</TableCell>
                <TableCell>₹24 L</TableCell>
                <TableCell>₹99 L</TableCell>
                <TableCell>₹75 L</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>30</TableCell>
                <TableCell>₹36 L</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  ₹3.53 Cr
                </TableCell>
                <TableCell>₹3.17 Cr</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 6: TAX RULES --- */}
      <section className="mb-12">
        <h2
          id="tax-rules"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-teal-600" /> SIP Tax Rules (2025)
        </h2>

        {/* IMAGE: Tax Rules */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/sip/sip-taxation-rules-2025.webp"
            alt="Infographic explaining SIP taxation rules for equity and debt funds"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-teal-100 bg-teal-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-teal-800 text-lg">
                Equity Funds ({'>'}65% Equity)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li>
                  <strong>STCG (&lt;12 mo):</strong> 20% on gains.
                </li>
                <li>
                  <strong>LTCG (&gt;12 mo):</strong> 12.5% on gains above ₹1.25
                  Lakh/year.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-slate-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">
                Debt Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>
                Taxed at your <strong>Income Tax Slab Rate</strong>. No
                LTCG/STCG distinction benefits (from April 2023).
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-900 text-lg">
              FIFO Rule & ELSS
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <p className="mb-2">
              <strong>FIFO Method:</strong> Each SIP installment is treated
              separately. First units bought are first ones sold for tax
              calculation.
            </p>
            <p>
              <strong>ELSS:</strong> Offers 80C deduction up to ₹1.5L. 3-year
              lock-in per installment. Same equity taxation applies on exit.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-sip-5" type="leaderboard" />
      </div>

      {/* --- SECTION 7: MARKET CRASH --- */}
      <section className="mb-12">
        <h2
          id="market-crash"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingDown className="h-6 w-6 text-red-500" /> SIP During Market
          Crash
        </h2>

        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`Crashes are wealth-creation opportunities. History proves that those who continue or increase SIPs during falls win big.`}
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Strategy during 2008 Crash
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Units Accumulated
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Value (Jan 2014)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Paused SIP (Panic)</TableCell>
                <TableCell>615 units</TableCell>
                <TableCell>₹12.92 Lakh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Continued SIP</TableCell>
                <TableCell>895 units</TableCell>
                <TableCell>₹18.80 Lakh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Doubled SIP</strong>
                </TableCell>
                <TableCell>1,240 units</TableCell>
                <TableCell className="font-bold text-emerald-600">
                  ₹26.04 Lakh (2.6x more!)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="bg-red-50 border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-900 text-lg">
              3 Golden Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-red-800">
            <ol className="list-decimal pl-4 space-y-2">
              <li>
                <strong>NEVER Stop SIP:</strong> Crashes last 6-18 months.
                Missing this means missing the best buying prices.
              </li>
              <li>
                <strong>Top-Up if Possible:</strong> If market falls 20%, deploy
                spare cash to buy more units.
              </li>
              <li>
                <strong>Don&lsquo;t Time Bottom:</strong> Nobody knows the
                bottom. Just keep buying.
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 8: DURATION --- */}
      <section className="mb-12">
        <h2
          id="duration"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <History className="h-6 w-6 text-slate-600" /> Minimum Duration Rule
        </h2>
        <p className="mb-6 text-slate-700">
          Equity needs time to stabilize volatility. Follow these minimum
          holding periods:
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Fund Type
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Min Duration
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Reason
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Large Cap / Index</TableCell>
                <TableCell>5-7 Years</TableCell>
                <TableCell>Lower volatility, stable returns</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mid Cap</TableCell>
                <TableCell>7-10 Years</TableCell>
                <TableCell>High volatility, needs time</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Small Cap</TableCell>
                <TableCell>10-15 Years</TableCell>
                <TableCell>Extreme moves, massive long-term gains</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Debt Funds</TableCell>
                <TableCell>3-5 Years</TableCell>
                <TableCell>For medium-term goals</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-sip-6" type="leaderboard" />
      </div>

      {/* --- SECTION 9: MISTAKES --- */}
      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-red-500" /> Common SIP Mistakes
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-200">
            <CardContent className="p-4 text-sm text-slate-700">
              <strong>1. Dividend Option</strong>
              <p>
                Pays tax immediately, kills compounding. Always choose Growth.
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-4 text-sm text-slate-700">
              <strong>2. Stopping in Bear Market</strong>
              <p>Misses the best accumulation phase. Big loss.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-4 text-sm text-slate-700">
              <strong>3. Over-Diversification</strong>
              <p>Buying 15 funds dilutes returns. Stick to 3-5.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-4 text-sm text-slate-700">
              <strong>4. Not Increasing SIP</strong>
              <p>Inflation eats static SIPs. Step-up 10% annually.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-4 text-sm text-slate-700">
              <strong>5. Timing the Market</strong>
              <p>Waiting for bottom usually means missing the rally.</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-4 text-sm text-slate-700">
              <strong>6. Short-Term Thinking</strong>
              <p>Redeeming for small expenses like phones kills wealth.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 10: MYTHS --- */}
      <section className="mb-12">
        <h2
          id="myths"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Ban className="h-6 w-6 text-amber-500" /> SIP Myths Debunked
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-amber-100 bg-amber-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900">
                &#34;SIP Guarantees Returns&#34;
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> SIP is a method, not a guarantee.
              Returns depend on market.
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900">
                &#34;I Need Large Amount&rdquo;
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> You can start with ₹500/month.
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900">
                &ldquo;I Can&rsquo;t Withdraw&ldquo;
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Open-ended funds have zero lock-in
              (except ELSS).
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900">
                &ldquo;Lump Sum is Better&ldquo;
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Only in bull markets. In volatile
              markets, SIP wins.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Frequently Asked Questions (FAQs)
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 bg-white"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            SIP is India&lsquo;s most accessible wealth-creation tool. The magic
            lies in consistency.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Start Today
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Automate
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Step Up 10%
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Mutual Fund investments are subject to
          market risks. Read all scheme related documents carefully. Past
          performance is not an indicator of future returns. This guide is for
          educational purposes only.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Calculate your savings
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            See exactly how much extra wealth you can create.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              SIP Calculator
            </Link>
            <Link
              href="/mutual-funds"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Explore Funds
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-sip-7" type="leaderboard" />
      </div>
    </article>
  );
}
