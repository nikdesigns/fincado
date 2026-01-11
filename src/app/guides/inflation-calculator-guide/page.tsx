import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  History,
  Target,
  PiggyBank,
  Building2,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title:
    'Inflation Calculator Guide: Why Inflation Is Dangerous & How to Protect Wealth',
  description:
    'Complete guide to Inflation in India (2025). Learn about Real vs Nominal returns, why FDs fail to beat inflation, and how to protect your wealth using Equity and Gold.',
  keywords: [
    'inflation calculator guide',
    'what is inflation india',
    'real return vs nominal return',
    'inflation rate india 2025',
    'how to beat inflation',
    'FD vs inflation',
    'retirement planning inflation',
    'purchasing power calculator',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/inflation-calculator-guide/',
  },
  openGraph: {
    title: 'Inflation: The Silent Wealth Destroyer (Complete Guide)',
    description:
      'Is your money losing value every day? Understand the math behind inflation and how to secure your financial future.',
    url: 'https://fincado.com/guides/inflation-calculator-guide/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the difference between Real and Nominal return?',
    answer:
      'Nominal return is the percentage gain on paper (e.g., 6% FD interest). Real return is the gain after subtracting inflation. If inflation is 5%, your real return on a 6% FD is only roughly 1%.',
  },
  {
    question: 'Does Fixed Deposit beat inflation?',
    answer:
      'Often, no. After accounting for taxes (up to 30%) and inflation (approx 5-6%), FDs frequently yield negative real returns, meaning your purchasing power actually decreases.',
  },
  {
    question: 'Which assets beat inflation best?',
    answer:
      'Historically, Equity Mutual Funds (12-15% returns) and Real Estate have consistently beaten inflation in India over the long term. Gold acts as a hedge, matching or slightly beating inflation.',
  },
  {
    question: 'How does inflation affect retirement planning?',
    answer:
      'Inflation drastically increases the corpus needed. If you spend ₹50,000/month today, at 6% inflation, you will need approx ₹1.6 Lakhs/month in 20 years to maintain the same lifestyle.',
  },
];

export default function InflationGuidePage() {
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
              'Inflation Calculator – Why Inflation Is Dangerous and How to Protect Your Wealth',
            description:
              'Comprehensive guide explaining inflation, real returns, and investment strategies to beat rising costs in India.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-19',
            dateModified: '2025-12-19',
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
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Inflation Guide',
            url: 'https://fincado.com/guides/inflation-calculator-guide/',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1"
        >
          Essential Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Inflation Guide: Impact & Wealth Protection Strategies
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 15 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Financial Literacy
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Inflation Guide: Impact & Wealth Protection Strategies" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p>Inflation quietly erodes your purchasing power every single day, turning today's comfortable savings into tomorrow's financial struggle. Understanding inflation and learning how to combat it isn't just smart financial planning—it's essential for preserving your wealth and achieving long-term financial security.</p>`}
          />
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS INFLATION --- */}
      <section className="mb-12">
        <h2
          id="what-is-inflation"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingDown className="h-6 w-6 text-red-500" /> What is Inflation?
          The Silent Wealth Destroyer
        </h2>
        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6">
            <p className="text-slate-700 mb-4">
              <strong>Inflation</strong> represents the rate at which the
              general price level of goods and services increases over time,
              causing your money to lose purchasing power. When inflation rises,
              each rupee in your pocket buys fewer goods and services than it
              did before.
            </p>
            <p className="text-slate-600 text-sm">
              The <strong>Consumer Price Index (CPI)</strong> serves as the
              primary measure of inflation in India. The Reserve Bank of India
              (RBI) targets an inflation rate of 4% with a tolerance band of
              2-6%.
            </p>
          </CardContent>
        </Card>

        {/* IMAGE: Inflation Concept */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/inflation/purchasing-power-erosion.webp"
            alt="Illustration showing how the same amount of money buys fewer goods over time due to inflation"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2 border-b border-red-100">
            <CardTitle className="text-red-900 text-lg">
              Example: The Grocery Basket
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="space-y-2">
              <li>
                <strong>Today:</strong> Basket costs ₹1,000.
              </li>
              <li>
                <strong>Next Year (6% Inflation):</strong> Same basket costs
                ₹1,060.
              </li>
              <li>
                <strong>In 10 Years:</strong> Same basket costs ₹1,791.
              </li>
            </ul>
            <p className="mt-4 font-medium text-red-800">
              Inflation operates continuously and compounds over time,
              persistently diminishing your wealth&apos;s real value.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-inflation-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: REAL VS NOMINAL --- */}
      <section className="mb-12">
        <h2
          id="real-vs-nominal"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-indigo-600" /> Real Return vs
          Nominal Return
        </h2>
        <p className="mb-6 text-slate-700">
          Many investors make the fatal mistake of evaluating investments based
          solely on <strong>nominal returns</strong> without accounting for
          inflation.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-slate-200 bg-slate-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">
                Nominal Return
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              The raw percentage gain on paper.
              <br />
              <em>Example:</em> ₹1L invested at 6% becomes ₹1.06L. Nominal
              Return = 6%.
            </CardContent>
          </Card>
          <Card className="border-indigo-100 bg-indigo-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-indigo-800 text-lg">
                Real Return
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              The actual increase in purchasing power.
              <br />
              <em>Formula:</em> (1 + Nominal) ÷ (1 + Inflation) − 1
            </CardContent>
          </Card>
        </div>

        {/* IMAGE: Real vs Nominal */}
        <div className="mb-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/inflation/real-vs-nominal-return.webp"
            alt="Chart comparing nominal returns vs real returns after inflation adjustment"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>

        <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100 text-sm text-indigo-900">
          <strong>The Math:</strong> If FD return is 6% and inflation is 5%,
          your Real Return is approx <strong>0.95%</strong>—not 6%. You gain
          less than 1% in purchasing power.
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-inflation-2" type="leaderboard" />
      </div>

      {/* --- SECTION 3: INFLATION HISTORY --- */}
      <section className="mb-12">
        <h2
          id="history"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <History className="h-6 w-6 text-orange-600" /> Inflation in India:
          Historical Trends
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Year</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Status
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2025</TableCell>
                <TableCell className="text-emerald-600 font-medium">
                  Declining
                </TableCell>
                <TableCell>Averaged ~2.5% (Record low 0.25% in Oct)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024</TableCell>
                <TableCell className="text-slate-600 font-medium">
                  Moderate
                </TableCell>
                <TableCell>Annual average 4.9%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023</TableCell>
                <TableCell className="text-orange-600 font-medium">
                  High
                </TableCell>
                <TableCell>Averaged 5.7%, peak 7.4%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2022</TableCell>
                <TableCell className="text-red-600 font-medium">
                  Elevated
                </TableCell>
                <TableCell>Averaged 6.7%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-slate-600 italic">
          <strong>Historical Context:</strong> India saw 12.17% inflation in
          2013. The long-term average (2012-2025) is approx{' '}
          <strong>5.68%</strong>.
        </p>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-inflation-3" type="leaderboard" />
      </div>

      {/* --- SECTION 4: FD TRAP --- */}
      <section className="mb-12">
        <h2
          id="fd-trap"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-red-600" /> The FD-Inflation
          Trap
        </h2>
        <p className="mb-6 text-slate-700">
          When FD rates fail to exceed inflation, you experience negative real
          returns. Tax makes it worse.
        </p>

        <Card className="border-red-100 bg-red-50/20 mb-6">
          <CardHeader className="pb-2 border-b border-red-100">
            <CardTitle className="text-red-900 text-lg">
              Wealth Destruction Example (30% Tax Slab)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Nominal FD Interest
                  </TableCell>
                  <TableCell>6.0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tax (30% slab)</TableCell>
                  <TableCell className="text-red-600">-1.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Post-Tax Return</TableCell>
                  <TableCell className="font-bold">4.2%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Inflation</TableCell>
                  <TableCell className="text-red-600">5.0%</TableCell>
                </TableRow>
                <TableRow className="bg-red-100/50">
                  <TableCell className="font-bold text-red-900">
                    Real Return
                  </TableCell>
                  <TableCell className="font-bold text-red-700">
                    -0.8% (Negative!)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="text-sm text-slate-700">
          <p className="mb-2">
            <strong>Long-Term Impact (25 Years):</strong>
          </p>
          <ul className="list-disc pl-5">
            <li>FD CAGR: 7.28% | Inflation CAGR: 5.55%</li>
            <li>Real Return (Pre-tax): Only 1.63%</li>
            <li>
              <strong>Post-tax:</strong> Likely negative real growth.
            </li>
          </ul>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-inflation-4" type="leaderboard" />
      </div>

      {/* --- SECTION 5: HOW TO BEAT --- */}
      <section className="mb-12">
        <h2
          id="how-to-beat"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> How to Beat
          Inflation
        </h2>
        <p className="mb-6 text-slate-700">
          Shift from &quot;safe&quot; investments to growth-oriented assets.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-emerald-100 bg-emerald-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Equity Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>25-Year Real Return:</strong> ~12.4%
              </p>
              <p>
                Companies raise prices with inflation, growing revenues and
                stock prices. Best for long-term goals.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
                <PiggyBank className="h-5 w-5" /> Gold
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>25-Year Real Return:</strong> ~4.5%
              </p>
              <p>
                Traditional hedge. Provides portfolio stability during
                volatility. Match or beat inflation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5" /> Real Estate
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2">
                <strong>Hedge:</strong> High
              </p>
              <p>
                Property values and rents rise with inflation. REITs offer
                easier access than physical property.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-sm text-emerald-900">
          <strong>Recommended Allocation:</strong> 50% Equity (Growth), 20% Gold
          (Hedge), 20% Real Estate (Passive Income), 10% Cash (Emergency).
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-inflation-5" type="leaderboard" />
      </div>

      {/* --- SECTION 6: PLANNING --- */}
      <section className="mb-12">
        <h2
          id="planning"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Target className="h-6 w-6 text-blue-600" /> Inflation-Adjusted
          Planning
        </h2>
        <p className="mb-6 text-slate-700">
          If you ignore inflation, you will under-save for retirement.
        </p>

        <Card className="border-slate-200 bg-slate-50/50 mb-6">
          <CardContent className="pt-6">
            <h3 className="font-bold text-slate-900 mb-4">
              Retirement Corpus Example
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="block text-slate-500 text-xs">
                  Current Monthly Expense
                </span>
                <span className="text-lg font-bold">₹50,000</span>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <span className="block text-slate-500 text-xs">
                  Future Expense (20 Yrs, 6% Inf)
                </span>
                <span className="text-lg font-bold text-red-600">
                  ₹1.6 Lakhs/mo
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              <p>
                You need a corpus that generates ₹1.6 Lakhs monthly, not ₹50k.
                The gap is massive.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-lg border-l-4 border-l-red-500 bg-red-50 p-4 text-sm text-red-900">
          <strong>The Cost of Ignoring:</strong> Planning without inflation
          adjustment can leave you short by crores in your retirement fund.
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-inflation-6" type="leaderboard" />
      </div>

      {/* --- SECTION 7: CHECKLIST --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" /> Your
          Inflation-Protection Checklist
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-slate-700 text-sm">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Calculate real returns on all current investments.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>
                  Shift allocation to Equity (Index Funds/MFs) for long term.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>
                  Increase SIPs annually to match inflation/income growth.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>
                  Use inflation-adjusted calculators for all financial goals.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Inflation is dangerous, but defeat is optional. By shifting from FDs
            to Equity and Gold, and planning with real returns in mind, you can
            protect your purchasing power.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Calculate
              Real Return
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Invest in
              Equity
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Review
              Annually
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- AUTHOR BOX --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-700">
            <div>
              <span className="block text-slate-500 text-xs uppercase tracking-wide font-bold mb-1">
                Written By
              </span>
              <span className="font-semibold text-slate-900">
                Fincado Research Team
              </span>
            </div>
            <div>
              <span className="block text-slate-500 text-xs uppercase tracking-wide font-bold mb-1">
                Reviewed By
              </span>
              <span className="font-semibold text-slate-900 flex items-center gap-1">
                Certified Financial Planner (India)
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px]">
                  ✓
                </span>
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          Disclaimer: This content is for educational purposes only. Past
          inflation trends do not guarantee future rates. Investment in
          securities market are subject to market risks.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-red-600 to-orange-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            See Your Future Cost of Living
          </h2>
          <p className="mb-8 max-w-lg text-red-100 text-lg">
            Use our Inflation Calculator to see exactly how much your lifestyle
            will cost in 10, 20, or 30 years.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inflation-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-red-700 transition hover:bg-red-50 shadow-lg"
            >
              Calculate Future Value
            </Link>
            <Link
              href="/sip-calculator"
              className="rounded-lg border border-red-400 bg-red-800/30 px-8 py-4 font-bold text-white transition hover:bg-red-800/50"
            >
              Plan Investment
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-inflation-7" type="leaderboard" />
      </div>
    </article>
  );
}
