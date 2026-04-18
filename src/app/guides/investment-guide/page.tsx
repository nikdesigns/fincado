import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
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
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Wallet,
  IndianRupee,
  Landmark,
  PieChart,
  TrendingUp,
  ChevronRight,
  Lightbulb,
  Scale,
  Target,
  Layers,
  Percent,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Investment Guide 2026: Best Investment Options in India for Beginners',
  description:
    'Complete Investment Guide 2026 for India: Learn where to invest money, compare FD, PPF, SIP, mutual funds, NPS and gold, understand risk, returns, tax, asset allocation, and beginner mistakes.',
  keywords: [
    'investment guide india',
    'investment guide 2026',
    'best investment options in india',
    'how to start investing in india',
    'investment options for beginners',
    'sip vs fd vs ppf',
    'mutual fund guide india',
    'asset allocation india',
    'where to invest money in india',
    'investment planning guide',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/investment-guide/',
  },
  openGraph: {
    title: 'Investment Guide 2026 | Best Investment Options in India',
    description:
      'A beginner-friendly guide to investing in India covering goals, risk, asset allocation, SIP, mutual funds, PPF, FD, NPS and gold.',
    url: 'https://fincado.com/guides/investment-guide/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the best investment option for beginners in India?',
    answer:
      'There is no single best option for everyone. For many beginners, a mix of emergency savings, simple debt products, and gradual SIP investing works better than chasing one product.',
  },
  {
    question: 'Should I start with SIP, FD, or PPF?',
    answer:
      'That depends on your goal, time horizon, and risk tolerance. FD and PPF are lower-risk options, while SIPs into mutual funds are generally better suited for long-term wealth creation with market risk.',
  },
  {
    question: 'How much money should I invest every month?',
    answer:
      'A practical starting point is an amount you can invest consistently without disturbing essentials, emergency savings, or EMI commitments. Consistency matters more than starting with a large amount.',
  },
  {
    question: 'What is asset allocation in investing?',
    answer:
      'Asset allocation is how you divide money across categories such as equity, debt, gold, and cash. It is one of the biggest drivers of long-term portfolio behavior and risk level.',
  },
  {
    question: 'Is it safe to invest in mutual funds?',
    answer:
      'Mutual funds are regulated products, but they are not risk-free. Their suitability depends on the fund type, market exposure, holding period, and your own financial goals.',
  },
  {
    question: 'What is the difference between saving and investing?',
    answer:
      'Saving is mainly about capital protection and short-term liquidity, while investing is about growing money over time by accepting an appropriate level of risk.',
  },
  {
    question: 'Should I buy gold as an investment?',
    answer:
      'Gold can play a supporting role for diversification, but for many investors it works better as a portfolio component than as the entire investment strategy.',
  },
  {
    question: 'Can I invest while repaying a loan?',
    answer:
      'Yes, but the order matters. Usually you should first stabilize emergency savings and high-cost debt, then invest steadily according to your goals and cash flow.',
  },
  {
    question: 'How long should I stay invested in equity-oriented investments?',
    answer:
      'Equity-oriented investing generally works better over longer time horizons because short-term market movements can be volatile and unpredictable.',
  },
  {
    question: 'Do taxes matter when choosing investments?',
    answer:
      'Yes. Pre-tax return alone can be misleading. The lock-in, tax treatment, liquidity, and risk-adjusted suitability of the product all matter.',
  },
];

export default function InvestmentGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'Investment Guide 2026: Best Investment Options in India for Beginners',
            description:
              'A complete investment guide for India covering risk, return, asset allocation, mutual funds, SIP, FD, PPF, NPS, and gold.',
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
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/guides/investment-guide/',
            },
            datePublished: '2026-01-08',
            dateModified: '2026-01-08',
          }),
        }}
      />

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

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Investment Guide',
            url: 'https://fincado.com/guides/investment-guide/',
          },
        ]}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1"
        >
          Pillar Guide
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Investment Guide 2026: Best Investment Options in India for Beginners
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 15 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jan 2026</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </span>
        </div>

        <div className="mt-6">
          <ShareTools title="Investment Guide 2026" />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>Investing is the process of putting money into assets that can grow over time</strong>, while accepting a level of risk that fits your goal, time horizon, and financial stability.
              </p>
              <p class="mb-4">
                The biggest mistake beginners make is asking only one question: <em>“Which investment gives the highest return?”</em> The better question is: <em>“Which investment fits my goal, timeline, liquidity needs, and risk tolerance?”</em>
              </p>
            `}
          />

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                The 4 things that matter
              </h3>
              <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
                <li>
                  <strong>Goal:</strong> Why are you investing?
                </li>
                <li>
                  <strong>Time horizon:</strong> When will you need the money?
                </li>
                <li>
                  <strong>Risk:</strong> How much volatility can you handle?
                </li>
                <li>
                  <strong>Tax and liquidity:</strong> What is the real usable
                  return?
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 flex flex-col justify-center">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 block mb-1">
                    Core idea
                  </strong>
                  <span className="text-emerald-800 text-sm">
                    Good investing is usually not about finding one “best”
                    product. It is about building the right mix for the right
                    purpose.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print">
        <CardContent className="p-6">
          <p className="mb-4 text-lg font-semibold text-slate-900">
            Table of Contents
          </p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a
                href="#why-invest"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 1. Why investing matters
              </a>
            </li>
            <li>
              <a
                href="#saving-vs-investing"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 2. Saving vs investing
              </a>
            </li>
            <li>
              <a
                href="#choose-by-goal"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 3. Choose investments by
                goal
              </a>
            </li>
            <li>
              <a
                href="#options"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 4. Major investment options
              </a>
            </li>
            <li>
              <a
                href="#asset-allocation"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 5. Asset allocation
              </a>
            </li>
            <li>
              <a
                href="#tax"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 6. Tax and post-tax return
              </a>
            </li>
            <li>
              <a
                href="#mistakes"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 7. Beginner mistakes
              </a>
            </li>
            <li>
              <a
                href="#starter-plan"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 8. Starter plan
              </a>
            </li>
            <li>
              <a
                href="#compare"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 9. Compare popular options
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="hover:text-emerald-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 10. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="why-invest"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          Why Investing Matters
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Savings protect money. Investing aims to grow it. If inflation
              rises faster than your money grows, your purchasing power weakens
              over time.
            </p>
            <p className="mb-4">
              That is why investing is not only for “wealthy” people. For many
              households, it is a practical tool for future goals such as a home
              down payment, child education, retirement, and long-term financial
              independence.
            </p>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-emerald-50 p-5 text-sm text-emerald-900 border border-emerald-100">
          <p className="mb-2">
            <strong>Simple principle:</strong> money that sits idle for too long
            may stay safe in number terms but lose strength in real-life
            spending power.
          </p>
          <p>
            For a deeper explanation of purchasing power, link this guide later
            with your inflation guide cluster.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="saving-vs-investing"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-blue-600" />
          Saving vs Investing
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Factor</TableHead>
                <TableHead>Saving</TableHead>
                <TableHead>Investing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Purpose</TableCell>
                <TableCell>Safety and short-term access</TableCell>
                <TableCell>Growth over time</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Risk</TableCell>
                <TableCell>Lower</TableCell>
                <TableCell>Varies from low to high</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Return potential</TableCell>
                <TableCell>Usually lower</TableCell>
                <TableCell>
                  Can be higher, especially over long periods
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Liquidity</TableCell>
                <TableCell>Usually higher</TableCell>
                <TableCell>Depends on product and lock-in</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ideal use</TableCell>
                <TableCell>Emergency fund, near-term needs</TableCell>
                <TableCell>Long-term goals and wealth building</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="choose-by-goal"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Target className="h-6 w-6 text-violet-600" />
          Choose Investments by Goal, Not Hype
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-blue-100 bg-blue-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-900">
                Short-term goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Emergency fund, annual expenses, and near-term purchases usually
              need higher safety and easier access.
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-emerald-900">
                Medium-term goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Goals a few years away often require balancing growth with control
              over volatility and liquidity.
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900">
                Long-term goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Retirement and long-range wealth building usually benefit more
              from disciplined long-term investing than from pure parking
              products.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="options"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Landmark className="h-6 w-6 text-indigo-600" />
          Major Investment Options in India
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-slate-700" />
              1. Fixed Deposits and similar savings products
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              These suit conservative money and short-to-medium parking needs,
              but post-tax real return can be weaker over long periods.
            </p>
            <p className="text-sm text-slate-700">
              Read more in your{' '}
              <Link
                href="/guides/fixed-deposit-guide/"
                className="text-emerald-600 hover:underline"
              >
                Fixed Deposit Guide
              </Link>{' '}
              and{' '}
              <Link
                href="/guides/fd-truths/"
                className="text-emerald-600 hover:underline"
              >
                FD Truths
              </Link>
              .
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              2. PPF
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              PPF is a government-backed long-term product that many investors
              use for stability, tax planning, and disciplined wealth
              preservation.
            </p>
            <p className="text-sm text-slate-700">
              Related guide:{' '}
              <Link
                href="/guides/ppf-guide/"
                className="text-emerald-600 hover:underline"
              >
                PPF Guide
              </Link>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-emerald-600" />
              3. Mutual funds and SIPs
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              Mutual funds offer a structured way to access debt, equity,
              hybrid, and other asset classes. SIPs help many investors build
              consistency and reduce the pressure of timing the market
              perfectly.
            </p>
            <p className="text-sm text-slate-700">
              Related guides:{' '}
              <Link
                href="/guides/mutual-fund-guide/"
                className="text-emerald-600 hover:underline"
              >
                Mutual Fund Guide
              </Link>{' '}
              and{' '}
              <Link
                href="/guides/sip-investment-guide/"
                className="text-emerald-600 hover:underline"
              >
                SIP Investment Guide
              </Link>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-600" />
              4. ELSS
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              ELSS combines tax-saving utility under Section 80C with
              market-linked return potential, but it remains an equity-oriented
              product with volatility and lock-in.
            </p>
            <p className="text-sm text-slate-700">
              Related guides:{' '}
              <Link
                href="/guides/elss-funds-guide-2026/"
                className="text-emerald-600 hover:underline"
              >
                ELSS Funds Guide
              </Link>{' '}
              and{' '}
              <Link
                href="/guides/elss-vs-fd/"
                className="text-emerald-600 hover:underline"
              >
                ELSS vs FD
              </Link>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Scale className="h-5 w-5 text-amber-600" />
              5. Gold
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              Gold can help diversification and hedge behavior in some
              scenarios, but it is usually best seen as a supporting allocation
              rather than the full plan.
            </p>
            <p className="text-sm text-slate-700">
              Related guides:{' '}
              <Link
                href="/guides/gold-investment-guide/"
                className="text-emerald-600 hover:underline"
              >
                Gold Investment Guide
              </Link>{' '}
              and{' '}
              <Link
                href="/guides/sovereign-gold-bond-sgb-guide/"
                className="text-emerald-600 hover:underline"
              >
                SGB Guide
              </Link>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Percent className="h-5 w-5 text-rose-600" />
              6. NPS and retirement-oriented investing
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              Retirement investing needs a different lens: long time horizon,
              tax treatment, accumulation discipline, and eventual withdrawal
              structure.
            </p>
            <p className="text-sm text-slate-700">
              Related guides:{' '}
              <Link
                href="/guides/nps-guide/"
                className="text-emerald-600 hover:underline"
              >
                NPS Guide
              </Link>{' '}
              and{' '}
              <Link
                href="/guides/retirement-planning-india/"
                className="text-emerald-600 hover:underline"
              >
                Retirement Planning Guide
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-3" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="asset-allocation"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Layers className="h-6 w-6 text-teal-600" />
          Asset Allocation Is the Real Strategy
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Many people spend too much time asking which single product is
              “best.” In practice, the bigger question is how much of your money
              should be in growth assets, defensive assets, and liquid reserves.
            </p>
            <p className="mb-4">
              A balanced allocation can reduce emotional mistakes. It helps you
              avoid being fully exposed to one risk, whether that is inflation
              risk, market volatility, or illiquidity.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-teal-100 bg-teal-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-teal-900">
                Why allocation matters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Controls overall risk better than chasing one top product.
                </li>
                <li>Improves discipline across different market phases.</li>
                <li>Supports goal-based planning.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-900">
                What not to do
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Putting all money into one asset class because it did well
                  recently.
                </li>
                <li>
                  Ignoring liquidity needs while locking everything into long
                  products.
                </li>
                <li>
                  Copying another person’s portfolio without matching your own
                  goal profile.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="tax"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-rose-600" />
          Tax and Post-Tax Return Matter
        </h2>

        <Card className="border-slate-200">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              A product with a lower headline return can sometimes be more
              useful than a higher headline return if it offers better tax
              efficiency, better fit for your goal, or lower reinvestment
              friction.
            </p>
            <p className="mb-4">
              This is especially relevant when comparing tax-saving and
              non-tax-saving products or evaluating returns across the new and
              old tax regime.
            </p>
            <p>
              Relevant reading:{' '}
              <Link
                href="/guides/new-vs-old-tax-regime-2026/"
                className="text-emerald-600 hover:underline"
              >
                New vs Old Tax Regime 2025
              </Link>{' '}
              and{' '}
              <Link
                href="/guides/best-tax-saving-options-80c/"
                className="text-emerald-600 hover:underline"
              >
                Best 80C Tax Saving Options
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-4" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          Common Beginner Investment Mistakes
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 1: Investing without an emergency fund
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> A sudden cash need can force you to exit
              investments at the wrong time.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 2: Chasing only high returns
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Return without context ignores risk,
              tax, lock-in, and suitability.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 3: Copying someone else’s portfolio
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Their income stability, age, goals, and
              risk tolerance may be very different from yours.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 4: Starting too late because the amount feels small
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> A smaller consistent start is often
              better than waiting for a perfect future surplus.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 5: Ignoring review and rebalancing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Even good portfolios drift over time as
              markets move.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 6: Mixing investment money with short-term spend money
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Every rupee should have a job:
              emergency, spending, debt reduction, or investing.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="starter-plan"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-yellow-500" />A Simple Starter Plan
        </h2>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <ol className="space-y-4 text-slate-800">
              <li className="flex gap-3">
                <div className="bg-yellow-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-yellow-800 shrink-0">
                  1
                </div>
                <div>
                  Build an emergency cushion before aggressive investing.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-yellow-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-yellow-800 shrink-0">
                  2
                </div>
                <div>
                  Define your goal buckets: short-term, medium-term, and
                  long-term.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-yellow-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-yellow-800 shrink-0">
                  3
                </div>
                <div>
                  Start with simple products you understand instead of a
                  complicated mix.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-yellow-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-yellow-800 shrink-0">
                  4
                </div>
                <div>
                  Automate monthly investing where possible to reduce friction.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-yellow-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-yellow-800 shrink-0">
                  5
                </div>
                <div>
                  Review once or twice a year instead of reacting emotionally
                  every week.
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-5" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compare"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Scale className="h-6 w-6 text-indigo-600" />
          Compare Popular Investment Options
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Option</TableHead>
                <TableHead>Typical strength</TableHead>
                <TableHead>Main trade-off</TableHead>
                <TableHead>Best suited for</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>FD</TableCell>
                <TableCell>Stability and simplicity</TableCell>
                <TableCell>Lower long-term growth potential</TableCell>
                <TableCell>Short-term and conservative money</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PPF</TableCell>
                <TableCell>Government-backed long-term discipline</TableCell>
                <TableCell>Long lock-in and lower liquidity</TableCell>
                <TableCell>Conservative long-term allocation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mutual Funds via SIP</TableCell>
                <TableCell>Scalable long-term wealth building</TableCell>
                <TableCell>Market volatility</TableCell>
                <TableCell>Goal-based long-term investors</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ELSS</TableCell>
                <TableCell>Tax-saving plus equity exposure</TableCell>
                <TableCell>Lock-in and market risk</TableCell>
                <TableCell>80C-focused long-term investors</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gold / SGB</TableCell>
                <TableCell>Diversification support</TableCell>
                <TableCell>Not always strongest core growth engine</TableCell>
                <TableCell>Supplementary allocation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>NPS</TableCell>
                <TableCell>
                  Retirement-focused structure and tax relevance
                </TableCell>
                <TableCell>
                  Withdrawal structure and retirement orientation
                </TableCell>
                <TableCell>Long-term retirement planning</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20"
        >
          FAQs
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

      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            Good Investing Is Usually Simple, Not Dramatic
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Start with your goals, protect liquidity, understand risk, diversify
            intelligently, and invest consistently. The best portfolio is not
            the one that looks exciting online; it is the one you can stick with
            through real life.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Goal first
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Diversify wisely
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Stay consistent
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes
          only and does not constitute investment advice. Suitability depends on
          your goals, income stability, risk tolerance, liquidity needs, and tax
          situation. Verify product terms and consult a qualified advisor where
          needed.
        </p>
      </div>

      <Card className="bg-linear-to-br from-emerald-600 to-teal-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            Start planning with Fincado calculators
          </h2>
          <p className="mb-8 max-w-lg text-emerald-100 text-lg">
            Turn investing ideas into practical numbers with SIP, EMI, and
            savings calculators.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50 shadow-lg"
            >
              Calculate SIP
            </Link>
            <Link
              href="/emi-calculator/"
              className="rounded-lg border border-emerald-400 bg-emerald-800/30 px-8 py-4 font-semibold text-white transition hover:bg-emerald-800/50"
            >
              Plan Cash Flow
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print mt-8">
        <AdSlot id="guide-investment-6" type="leaderboard" />
      </div>
    </article>
  );
}
