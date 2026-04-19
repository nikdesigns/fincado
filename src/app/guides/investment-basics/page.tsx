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
  TrendingUp,
  Layers,
  Target,
  Percent,
  ChevronRight,
  Lightbulb,
  Wallet,
  Scale,
  PieChart,
  Hourglass,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investment Basics 2026: Risk, Return, Diversification & Compounding',
  description:
    'Learn investment basics for beginners in India: risk vs return, diversification, compounding, liquidity, inflation, time horizon, asset allocation, and how to start investing the right way.',
  keywords: [
    'investment basics india',
    'investment basics for beginners',
    'risk and return investing',
    'diversification meaning',
    'compounding explained',
    'liquidity in investments',
    'inflation and investing',
    'time horizon investing',
    'asset allocation basics',
    'how to start investing in india'
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/investment-basics/',
  },
  openGraph: {
    title:
      'Investment Basics 2026 | Risk, Return, Diversification & Compounding',
    description:
      'Beginner-friendly guide to the core concepts every investor should understand before choosing products.',
    url: 'https://fincado.com/guides/investment-basics/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What are the basic concepts of investing?',
    answer:
      'The core concepts include risk, return, diversification, compounding, liquidity, inflation, time horizon, and asset allocation.',
  },
  {
    question: 'What is the difference between risk and volatility?',
    answer:
      'Volatility is how much prices move in the short term, while investment risk is broader and includes the possibility of not meeting your financial goal or losing purchasing power.',
  },
  {
    question: 'Why is diversification important?',
    answer:
      'Diversification spreads money across different assets so one weak area does not dominate the entire portfolio outcome.',
  },
  {
    question: 'What is compounding in simple words?',
    answer:
      'Compounding means your money earns returns, and those returns then begin earning returns too. Over long periods, this can create powerful growth.',
  },
  {
    question: 'What does liquidity mean in investing?',
    answer:
      'Liquidity refers to how easily you can convert an investment into cash without large loss, delay, or penalty.',
  },
  {
    question: 'Why does inflation matter for investors?',
    answer:
      'Inflation reduces the future buying power of money, so investments need to be judged not only by headline return but also by real return after inflation.',
  },
  {
    question: 'What is a time horizon in investing?',
    answer:
      'Time horizon is the period for which you can stay invested before needing the money. It strongly affects which products are suitable.',
  },
  {
    question: 'Can a beginner start investing with a small amount?',
    answer:
      'Yes. Many beginners start with modest monthly amounts. The key is consistency, clarity of purpose, and learning the basics before increasing complexity.',
  },
  {
    question: 'What is asset allocation in simple terms?',
    answer:
      'Asset allocation is how you divide money among categories like equity, debt, gold, and cash based on your goal and risk tolerance.',
  },
  {
    question: 'What should beginners avoid in investing?',
    answer:
      'Beginners should avoid blind tips, unrealistic return expectations, over-concentration, panic buying or selling, and investing without an emergency fund.',
  }
];

export default function InvestmentBasicsPage() {
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
              'Investment Basics 2026: Risk, Return, Diversification & Compounding',
            description:
              'Beginner-friendly investment basics covering the core concepts every investor should understand before choosing products.',
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
              '@id': 'https://fincado.com/guides/investment-basics/',
            },
            datePublished: '2026-01-09',
            dateModified: '2026-01-09',
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
            name: 'Investment Basics',
            url: 'https://fincado.com/guides/investment-basics/',
          }
        ]}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-teal-100 text-teal-800 hover:bg-teal-200 px-3 py-1"
        >
          Beginner Guide
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Investment Basics 2026: Risk, Return, Diversification & Compounding
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 13 Min Read
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
          <ShareTools title="Investment Basics 2026" />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>Before choosing any investment product, you need to understand the language of investing.</strong> Most poor investment decisions do not begin with bad products; they begin with weak understanding of basic concepts.
              </p>
              <p class="mb-4">
                Once you understand risk, return, diversification, compounding, liquidity, inflation, and time horizon, product choices become much easier and more logical.
              </p>
            `}
          />

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                What this page does
              </h3>
              <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
                <li>Explains core investing terms in plain language.</li>
                <li>Shows how concepts connect to product choices.</li>
                <li>Helps beginners avoid common decision errors.</li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 flex flex-col justify-center">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 block mb-1">
                    Best use of this guide
                  </strong>
                  <span className="text-emerald-800 text-sm">
                    Read this first, then move to the broader investment guide
                    and specific product guides.
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
                href="#risk-return"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 1. Risk and return
              </a>
            </li>
            <li>
              <a
                href="#diversification"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 2. Diversification
              </a>
            </li>
            <li>
              <a
                href="#compounding"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 3. Compounding
              </a>
            </li>
            <li>
              <a
                href="#liquidity"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 4. Liquidity
              </a>
            </li>
            <li>
              <a
                href="#inflation"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 5. Inflation
              </a>
            </li>
            <li>
              <a
                href="#time-horizon"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 6. Time horizon
              </a>
            </li>
            <li>
              <a
                href="#allocation"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 7. Asset allocation
              </a>
            </li>
            <li>
              <a
                href="#beginner-framework"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 8. Beginner decision
                framework
              </a>
            </li>
            <li>
              <a
                href="#mistakes"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 9. Basic mistakes to avoid
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="hover:text-teal-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 10. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-basics-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="risk-return"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-teal-600" />
          Risk and Return
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              One of the first rules in investing is that higher return
              potential usually comes with higher uncertainty. That does not
              mean every high-risk product is good, or every low-risk product is
              bad. It means return should always be evaluated together with
              downside possibility, time horizon, and suitability.
            </p>
            <p className="mb-4">
              For example, a product that swings in value may be acceptable for
              a long-term goal but not for money needed soon.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-teal-100 bg-teal-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-teal-900">
                Think beyond “high return”
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              The right question is not “Which option gives the highest return?”
              but “Which option gives a suitable return for my goal and risk
              capacity?”
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900">
                Volatility is not the whole story
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Short-term price movement is one kind of risk, but inflation risk,
              liquidity risk, and goal mismatch are also important.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="diversification"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-blue-600" />
          Diversification
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Diversification means spreading your money across different assets
              instead of depending too much on one idea, one sector, or one
              product type.
            </p>
            <p className="mb-4">
              Its purpose is not to maximize excitement. Its purpose is to
              prevent one weak area from dominating your whole portfolio.
            </p>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-blue-50 p-5 text-sm text-blue-900 border border-blue-100">
          <p className="mb-2">
            <strong>Simple example:</strong> a beginner portfolio may combine
            liquidity, stability, and growth rather than relying only on one
            market-linked product.
          </p>
          <p>
            Diversification works best when the assets play different roles, not
            when they are just different names doing nearly the same thing.
          </p>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-basics-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compounding"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-emerald-600" />
          Compounding
        </h2>

        <Card className="border-slate-200">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Compounding is one of the most important ideas in investing. It
              happens when your returns begin generating returns of their own.
              Over long periods, this creates growth that can look slow in the
              beginning and much stronger later.
            </p>
            <p className="mb-4">
              This is why starting early often matters more than starting big.
              Time is one of the strongest forces in compounding.
            </p>
            <p>
              If you want the practical version of this concept, your existing{' '}
              <Link
                href="/guides/sip-investment-guide/"
                className="text-teal-600 hover:underline"
              >
                SIP Investment Guide
              </Link>{' '}
              is the natural next read.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2
          id="liquidity"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-violet-600" />
          Liquidity
        </h2>

        <Card className="border-slate-200">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Liquidity is the ease with which you can turn an investment into
              cash. Some products are easy to access, while others have
              lock-ins, penalties, or exit constraints.
            </p>
            <p className="mb-4">
              Liquidity matters because even a good investment can become a bad
              fit if you need money urgently and cannot access it efficiently.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2
          id="inflation"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Scale className="h-6 w-6 text-rose-600" />
          Inflation
        </h2>

        <Card className="border-slate-200">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Inflation means the cost of goods and services rises over time.
              That means money kept in very low-growth form may buy less in the
              future even if the account balance itself looks stable.
            </p>
            <p className="mb-4">
              This is why investors should think in terms of{' '}
              <strong>real return</strong>, not just headline return.
            </p>
            <p>
              Related reading:{' '}
              <Link
                href="/guides/inflation-calculator-guide/"
                className="text-teal-600 hover:underline"
              >
                Inflation Guide
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-basics-3" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="time-horizon"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Hourglass className="h-6 w-6 text-amber-600" />
          Time Horizon
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Time horizon is the amount of time you can stay invested before
              needing the money. It is one of the biggest factors in deciding
              which product categories make sense.
            </p>
            <p className="mb-4">
              Money needed soon usually calls for stronger stability and
              liquidity. Money not needed for a long time can often tolerate
              more fluctuation in exchange for growth potential.
            </p>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Time horizon</TableHead>
                <TableHead>What matters most</TableHead>
                <TableHead>Usual focus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Short-term</TableCell>
                <TableCell>Liquidity and capital stability</TableCell>
                <TableCell>Safety-oriented allocation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Medium-term</TableCell>
                <TableCell>Balance between growth and control</TableCell>
                <TableCell>Mixed allocation approach</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Long-term</TableCell>
                <TableCell>Growth and discipline</TableCell>
                <TableCell>Compounding and diversified exposure</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="allocation"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Layers className="h-6 w-6 text-indigo-600" />
          Asset Allocation
        </h2>

        <Card className="border-slate-200">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Asset allocation is how you divide money across broad categories
              such as equity, debt, gold, and cash. It helps convert abstract
              risk tolerance into a practical portfolio shape.
            </p>
            <p className="mb-4">
              This is one reason broad educational pages and pillar guides work
              well together. First you learn the concept, then you apply it to
              actual products.
            </p>
            <p>
              Next read:{' '}
              <Link
                href="/guides/investment-guide/"
                className="text-teal-600 hover:underline"
              >
                Investment Guide
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-basics-4" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="beginner-framework"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Target className="h-6 w-6 text-emerald-600" />
          Beginner Decision Framework
        </h2>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6">
            <ol className="space-y-4 text-slate-800">
              <li className="flex gap-3">
                <div className="bg-emerald-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-emerald-800 shrink-0">
                  1
                </div>
                <div>Define the goal clearly before choosing the product.</div>
              </li>
              <li className="flex gap-3">
                <div className="bg-emerald-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-emerald-800 shrink-0">
                  2
                </div>
                <div>Ask when the money will be needed.</div>
              </li>
              <li className="flex gap-3">
                <div className="bg-emerald-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-emerald-800 shrink-0">
                  3
                </div>
                <div>
                  Decide how much volatility you can emotionally and financially
                  handle.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-emerald-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-emerald-800 shrink-0">
                  4
                </div>
                <div>Check liquidity, taxes, and lock-in before investing.</div>
              </li>
              <li className="flex gap-3">
                <div className="bg-emerald-200 h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold text-emerald-800 shrink-0">
                  5
                </div>
                <div>Keep the plan simple enough to follow consistently.</div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          Basic Mistakes to Avoid
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 1: Investing without understanding the product
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> If you cannot explain how an investment
              behaves, you may panic when it moves differently from your
              expectations.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 2: Ignoring inflation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> A stable balance is not the same as
              preserved purchasing power.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 3: Putting all money in one place
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Concentration can magnify avoidable
              damage.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 4: Choosing by recent performance alone
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> What did well recently may not fit your
              future goal or risk profile.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 5: Investing short-term money into volatile assets
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Time mismatch is one of the most common
              beginner errors.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 6: Waiting too long to begin
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Learning and starting small can be more
              valuable than endless planning without action.
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-investment-basics-5" type="leaderboard" />
      </div>

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
            Learn the Principles Before You Pick the Product
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Investment products change, market cycles change, and headlines
            change. Core principles like risk, diversification, liquidity,
            inflation, and time horizon remain useful in every market.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Understand risk
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Respect time horizon
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Diversify wisely
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes
          only and does not constitute investment advice. Investment decisions
          should be based on your goals, risk tolerance, liquidity needs, and
          suitability assessment.
        </p>
      </div>

      <Card className="bg-linear-to-br from-teal-600 to-cyan-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            Ready for the next step?
          </h2>
          <p className="mb-8 max-w-lg text-teal-100 text-lg">
            Move from concepts to action with the broader Fincado investment
            guides and calculators.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/guides/investment-guide/"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-teal-700 transition hover:bg-teal-50 shadow-lg"
            >
              Read Investment Guide
            </Link>
            <Link
              href="/sip-calculator/"
              className="rounded-lg border border-teal-400 bg-teal-800/30 px-8 py-4 font-semibold text-white transition hover:bg-teal-800/50"
            >
              Try SIP Calculator
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print mt-8">
        <AdSlot id="guide-investment-basics-6" type="leaderboard" />
      </div>
    </article>
  );
}
