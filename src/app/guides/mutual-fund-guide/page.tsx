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
  Percent,
  RefreshCw,
  Smartphone,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Clock,
  ArrowRightLeft,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Direct vs Regular MF: Save 1% & Earn ₹25L More',
  description:
    'Direct vs regular mutual funds: Learn how 1% expense ratio costs ₹25-50 lakh over 20 years. Switch guide, best direct MF platforms & index vs active funds.',
  keywords: [
    'direct vs regular mutual fund',
    'expense ratio impact calculator',
    'switch regular to direct mf',
    'zerodha coin vs groww vs paytm money',
    'index funds vs active funds',
    'best direct mutual fund app india',
  ],
  openGraph: {
    title: 'Direct vs Regular Mutual Funds: How to Save 1% Commission',
    description:
      'Stop paying commissions. Learn how switching to Direct Plans can add ₹50 Lakhs to your retirement corpus.',
    url: 'https://www.fincado.com/guides/mutual-fund-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/mf/direct-vs-regular-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Graph comparing direct vs regular fund growth over 20 years',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the difference between direct and regular mutual funds?',
    answer:
      'Direct plans are purchased directly from the AMC without intermediaries, resulting in lower expense ratios and higher returns. Regular plans are sold via distributors who earn a commission.',
  },
  {
    question: 'How much can I save by investing in direct mutual funds?',
    answer:
      'Direct plans typically have expense ratios 1-1.5% lower than regular plans. Over 20 years, this difference can amount to ₹25-50 Lakh extra corpus on a ₹5 Crore portfolio.',
  },
  {
    question: 'How do I switch from regular to direct mutual funds?',
    answer:
      'You need to redeem your regular plan units (paying any applicable tax) and reinvest the proceeds into the direct plan of the same fund via a platform like Zerodha Coin or Groww.',
  },
];

export default function DirectMFGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'Mutual Fund Guide',
            url: 'https://www.fincado.com/guides/mutual-fund-guide',
          },
        ]}
      />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'Direct vs Regular Mutual Funds: How to Save 1% Commission',
            description:
              'Complete guide on why Direct Mutual Funds are better than Regular plans. Includes calculator examples, switching guide, and platform reviews.',
            image:
              'https://www.fincado.com/images/guides/mf/mutual-fund-guide-hero.webp',
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
            datePublished: '2025-02-10',
            dateModified: '2025-02-10',
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

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-3 py-1"
        >
          Smart Investing
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Direct vs Regular Mutual Funds: How to Save 1% Commission
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 15 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jan 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Direct vs Regular MF Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              The difference between <strong>Direct</strong> and <strong>Regular</strong> mutual funds might seem like a small 1% fee, but over 20-30 years, this commission can cost you <strong>₹25-50 Lakhs</strong>! That's money taken from your retirement to pay a broker.
            </p>
            <p>
              Understanding the <strong>Expense Ratio impact</strong> and knowing which platforms offer zero-commission investing is crucial. This guide breaks down the math, shows you how to switch, and explains why <strong>Index Funds</strong> are winning.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/mf/mutual-fund-guide-hero.webp"
              alt="Comparison of wealth growth: Direct vs Regular plan"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS DIRECT VS REGULAR --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ArrowRightLeft className="h-6 w-6 text-indigo-600" /> Direct vs
            Regular: The Core Difference
          </h2>
          <p className="mb-6 text-slate-700">
            Both plans invest in the <strong>same portfolio</strong> with the
            same fund manager. The only difference is{' '}
            <strong>who gets paid</strong>.
          </p>

          <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    Feature
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    Regular Plan
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/3">
                    Direct Plan
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Sold By
                  </TableCell>
                  <TableCell>Brokers / Distributors</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    AMC / Zero-Commission Platforms
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Commission
                  </TableCell>
                  <TableCell>Yes (0.5% - 1.5%)</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Zero
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Expense Ratio
                  </TableCell>
                  <TableCell>Higher (e.g. 2.0%)</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Lower (e.g. 0.8%)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Returns
                  </TableCell>
                  <TableCell>Lower</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    1-1.5% Higher Annually
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- TOC --- */}
      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print">
        <CardContent className="p-6">
          <p className="mb-4 text-lg font-bold text-slate-900">
            Table of Contents
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a
                href="#expense-ratio"
                className="hover:text-indigo-600 hover:underline"
              >
                1. The 1% Difference (Real Math)
              </a>
            </li>
            <li>
              <a
                href="#wealth-loss"
                className="hover:text-indigo-600 hover:underline"
              >
                2. How You Lose ₹50 Lakhs
              </a>
            </li>
            <li>
              <a
                href="#switching-guide"
                className="hover:text-indigo-600 hover:underline"
              >
                3. How to Switch to Direct Plans
              </a>
            </li>
            <li>
              <a
                href="#platforms"
                className="hover:text-indigo-600 hover:underline"
              >
                4. Best Direct MF Platforms
              </a>
            </li>
            <li>
              <a
                href="#active-vs-passive"
                className="hover:text-indigo-600 hover:underline"
              >
                5. Active vs Index Funds
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-indigo-600 hover:underline">
                6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-mf-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: EXPENSE RATIO --- */}
      <section className="mb-12">
        <h2
          id="expense-ratio"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-red-500" /> The 1% Difference: How It
          Works
        </h2>
        <p className="mb-6 text-slate-700">
          The <strong>Expense Ratio</strong> is the annual fee deducted from
          your investment.
        </p>

        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2 border-b border-red-100">
            <CardTitle className="text-red-900 text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Real-World Example: HDFC
              Equity Fund
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Regular Plan Expense Ratio:</span>
                <strong>2.34%</strong>
              </li>
              <li className="flex justify-between">
                <span>Direct Plan Expense Ratio:</span>
                <strong>0.39%</strong>
              </li>
              <li className="flex justify-between pt-2 border-t border-red-200 font-bold text-red-700">
                <span>Difference:</span>
                <span>1.95% per year!</span>
              </li>
            </ul>
            <p className="mt-4 text-red-800 italic">
              This means in the Regular plan, you lose almost 2% of your wealth
              <em>every single year</em> to commissions, regardless of profit or
              loss.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 3: WEALTH LOSS --- */}
      <section className="mb-12">
        <h2
          id="wealth-loss"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-emerald-600" /> The Cost of
          Commissions
        </h2>
        <WikiText
          content={`<p class="mb-6 text-slate-700">Let's simulate a <strong>₹10,000 Monthly SIP</strong> for <strong>20 Years</strong> assuming 12% market returns.</p>`}
        />

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Scenario
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Expense Ratio
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Net Return
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Final Corpus
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Regular Plan
                </TableCell>
                <TableCell>2.0%</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>₹75.94 Lakhs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Direct Plan
                </TableCell>
                <TableCell>1.0%</TableCell>
                <TableCell>11%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  ₹88.53 Lakhs
                </TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell className="font-bold text-slate-900">
                  Loss to Commission
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="text-red-600 font-bold text-lg">
                  ₹12.59 Lakhs Lost!
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-sm text-emerald-900">
          <strong>Insight:</strong> For a larger corpus (e.g. ₹25 Lakh Lumpsum),
          the loss over 30 years is nearly <strong>₹1.76 Crore</strong>.
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-mf-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: SWITCHING GUIDE --- */}
      <section className="mb-12">
        <h2
          id="switching-guide"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <RefreshCw className="h-6 w-6 text-blue-600" /> How to Switch to
          Direct Plans
        </h2>
        <p className="mb-6 text-slate-700">
          Switching isn&apos;t automatic. You must redeem (sell) and reinvest
          (buy).
        </p>

        <Card className="border-slate-200 mb-8">
          <CardContent className="pt-6">
            <ol className="list-decimal pl-5 space-y-4 text-slate-700 marker:font-bold marker:text-slate-900">
              <li>
                <strong>Audit:</strong> Check your portfolio. Identify funds
                with &quot;Regular&quot; in the name.
              </li>
              <li>
                <strong>Tax Check:</strong> Calculate Exit Load and Capital
                Gains Tax (LTCG/STCG).
              </li>
              <li>
                <strong>Platform:</strong> Open an account on a Direct platform
                (Zerodha/Groww).
              </li>
              <li>
                <strong>Redeem:</strong> Sell your Regular units. Money hits
                bank in T+2 days.
              </li>
              <li>
                <strong>Reinvest:</strong> Buy the <strong>Direct Plan</strong>{' '}
                of the same fund.
              </li>
              <li>
                <strong>SIPs:</strong> Stop old SIPs. Start new SIPs in Direct
                plans.
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-amber-100 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg">The Fear</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              &quot;But I have to pay tax to switch!&quot; Investors stay in
              Regular plans to avoid a small one-time tax, while losing huge
              amounts annually.
            </CardContent>
          </Card>
          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                The Reality
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Paying a small one-time tax (e.g., ₹5,000) is worth it to save
              Lakhs in future commissions.{' '}
              <strong>Rip the band-aid off.</strong>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 5: PLATFORMS --- */}
      <section className="mb-12">
        <h2
          id="platforms"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Smartphone className="h-6 w-6 text-purple-600" /> Best Direct MF
          Platforms
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <strong className="block text-lg mb-2 text-indigo-700">
                Zerodha Coin
              </strong>
              <p className="text-sm text-slate-600">
                Demat mode. Best for serious investors. Zero commission.
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <strong className="block text-lg mb-2 text-emerald-700">
                Groww
              </strong>
              <p className="text-sm text-slate-600">
                Simple UI. Beginner friendly. Zero commission.
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <strong className="block text-lg mb-2 text-blue-700">
                Paytm Money
              </strong>
              <p className="text-sm text-slate-600">
                Good analytics. Zero commission.
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <strong className="block text-lg mb-2 text-slate-700">
                AMC Website
              </strong>
              <p className="text-sm text-slate-600">
                Direct with fund house. Clunky but no middleman app.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-mf-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: ACTIVE VS PASSIVE --- */}
      <section className="mb-12">
        <h2
          id="active-vs-passive"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-orange-600" /> Active vs Passive:
          Why Index Funds Win
        </h2>
        <WikiText
          content={`<p class="mb-6 text-slate-700">Once you go Direct, the next question is: <strong>Active Fund</strong> (Manager picks stocks) or <strong>Index Fund</strong> (Tracks Nifty 50)?</p>`}
        />

        <div className="p-4 mb-6 bg-red-50 border-l-4 border-red-500 rounded-r text-sm text-red-900">
          <strong>Performance Reality:</strong> 61% of Active Funds FAILED to
          beat the Index over the last 4 years.
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Category
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Recommendation
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Reason
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Large Cap
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Index Funds (Nifty 50)
                </TableCell>
                <TableCell>Active struggle to beat; Index is cheap.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Mid/Small Cap
                </TableCell>
                <TableCell>Active Funds</TableCell>
                <TableCell>Managers can find hidden gems; alpha.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  International
                </TableCell>
                <TableCell>Index Funds (S&P 500)</TableCell>
                <TableCell>Low cost exposure to US tech.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
          <AccordionItem
            value="item-custom-1"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I hold both Direct and Regular plans of the same fund?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              No. You cannot hold them in the same folio usually. They are
              treated as separate schemes. You must choose one.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              What is the expense ratio of Index Funds?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Direct Index Funds are ultra-cheap, often around{' '}
              <strong>0.1% to 0.3%</strong>. This is 10x cheaper than Active
              Regular funds (2%+).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Switching to Direct Funds is the single highest-ROI move you can
            make today. Don&apos;t let 1% eat your retirement.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Check
              Portfolio
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Open Direct
              Acct
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Switch SIPs
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- AUTHOR & DISCLAIMER --- */}
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
      <Card className="bg-linear-to-br from-indigo-600 to-purple-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Calculate your savings
          </h2>
          <p className="mb-8 max-w-lg text-indigo-100 text-lg">
            See exactly how much extra wealth you can create by switching to
            Direct plans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-indigo-700 transition hover:bg-indigo-50 shadow-lg"
            >
              SIP Calculator
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-mf-4" type="leaderboard" />
      </div>
    </article>
  );
}
