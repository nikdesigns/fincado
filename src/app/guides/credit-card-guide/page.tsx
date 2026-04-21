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
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Percent,
  Wallet,
  CircleDollarSign,
  Ban,
  Lightbulb,
  ChevronRight,
  TrendingUp,
  BadgePercent,
  Landmark,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Credit Card Guide 2026: Fees, Rewards, Interest & Smart Usage in India',
  description:
    'Complete Credit Card Guide 2026 for India: Learn how credit cards work, annual fees, billing cycle, interest charges, reward points, cashback, credit score impact, and common mistakes to avoid.',
  keywords: [
    'credit card guide india',
    'credit card guide 2026',
    'how credit cards work',
    'credit card interest charges',
    'credit card annual fee',
    'credit card rewards and cashback',
    'credit card billing cycle',
    'credit card minimum due',
    'credit card credit score',
    'best way to use credit card in india'
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/credit-card-guide/',
  },
  openGraph: {
    title: 'Credit Card Guide 2026 | Fees, Rewards & Smart Usage in India',
    description:
      'Understand billing cycles, reward points, annual fees, utilization ratio, and the debt traps to avoid.',
    url: 'https://fincado.com/guides/credit-card-guide/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'How does a credit card work in India?',
    answer:
      'A credit card lets you spend up to a sanctioned limit and repay later. If you pay the full statement amount by the due date, you usually avoid interest on regular retail purchases.',
  },
  {
    question:
      'What is the difference between total amount due and minimum amount due?',
    answer:
      'The total amount due is the full billed amount for the cycle, while the minimum amount due is only a small part of the bill. Paying only the minimum can trigger heavy interest charges on the remaining balance.',
  },
  {
    question: 'Is a lifetime free credit card always better?',
    answer:
      'Not always. A paid card can be better if its rewards, lounge access, travel benefits, or milestone perks clearly outweigh the annual fee for your spending pattern.',
  },
  {
    question: 'Does using a credit card improve credit score?',
    answer:
      'Yes, responsible use can help. Paying on time, keeping utilization low, and avoiding repeated overdue balances can support a stronger credit profile over time.',
  },
  {
    question: 'What credit utilization ratio is considered healthy?',
    answer:
      'A lower utilization ratio is generally healthier. Many users aim to stay below about 30% of the total credit limit, especially before statement generation.',
  },
  {
    question: 'Do reward points and cashback offset credit card interest?',
    answer:
      'Usually no. Credit card interest rates are so high that carrying revolving debt can wipe out the value of cashback, reward points, and welcome bonuses quickly.',
  },
  {
    question: 'Should I convert big purchases into EMI on a credit card?',
    answer:
      'Sometimes, but only after checking processing fees, foreclosure rules, no-cost EMI terms, and whether the merchant discount or instant discount would be lost.',
  },
  {
    question: 'What are the most common hidden credit card charges?',
    answer:
      'Common charges include annual fee, late payment fee, finance charges, GST, cash withdrawal fee, foreign exchange markup, over-limit fee, and dynamic currency conversion losses.',
  },
  {
    question: 'Can I withdraw cash using a credit card?',
    answer:
      'Yes, but it is usually one of the costliest features. Cash advances typically attract a fee plus immediate interest with no interest-free grace period.',
  },
  {
    question: 'How many credit cards should a beginner have?',
    answer:
      'For most beginners, one well-chosen card is enough. Add another only when you have a clear reason such as separating spend categories, travel use, or improving credit limit distribution.',
  }
];

export default function CreditCardGuidePage() {
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
              'Credit Card Guide 2026: Fees, Rewards, Interest & Smart Usage in India',
            description:
              'A complete guide to understanding credit cards in India, including annual fees, billing cycle, interest, rewards, utilization, and mistakes to avoid.',
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
              '@id': 'https://fincado.com/guides/credit-card-guide/',
            },
            datePublished: '2026-01-05',
            dateModified: '2026-01-05',
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
            name: 'Credit Card Guide',
            url: 'https://fincado.com/guides/credit-card-guide/',
          }
        ]}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Flagship Guide
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Credit Card Guide 2026: Fees, Rewards, Interest & Smart Usage in India
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 14 Min Read
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
          <ShareTools title="Credit Card Guide 2026" />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>A credit card is a short-term revolving credit tool</strong> that can be incredibly useful when you understand the billing cycle, due date, annual fee, reward structure, and the cost of carrying unpaid balances.
              </p>
              <p class="mb-4">
                Used well, a credit card can improve convenience, build credit history, unlock cashback or travel perks, and help smooth cash flow. Used poorly, it can become one of the costliest forms of retail debt.
              </p>
            `}
          />

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <FileTextIcon />
                Core Things to Understand
              </h3>
              <ul className="space-y-1 text-sm text-slate-600 list-disc pl-4">
                <li>
                  <strong>Billing cycle</strong> and statement date.
                </li>
                <li>
                  <strong>Total due</strong> vs minimum due.
                </li>
                <li>
                  <strong>Rewards</strong>, cashback, and fee waiver conditions.
                </li>
                <li>
                  <strong>Charges</strong> such as finance cost, late fee, forex
                  markup, and cash advance fee.
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 flex flex-col justify-center">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 block mb-1">
                    The big rule
                  </strong>
                  <span className="text-emerald-800 text-sm">
                    If you want rewards without pain, pay the full statement
                    balance before the due date and keep utilization under
                    control.
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
                href="#how-it-works"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 1. How a credit card works
              </a>
            </li>
            <li>
              <a
                href="#fees"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 2. Fees and charges
              </a>
            </li>
            <li>
              <a
                href="#billing"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 3. Billing cycle and due
                date
              </a>
            </li>
            <li>
              <a
                href="#rewards"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 4. Rewards and cashback
              </a>
            </li>
            <li>
              <a
                href="#choose-card"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 5. How to choose a card
              </a>
            </li>
            <li>
              <a
                href="#credit-score"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 6. Credit score impact
              </a>
            </li>
            <li>
              <a
                href="#mistakes"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 7. Common mistakes
              </a>
            </li>
            <li>
              <a
                href="#security"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 8. Security checklist
              </a>
            </li>
            <li>
              <a
                href="#compare"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 9. Card type comparison
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="hover:text-blue-600 hover:underline flex items-center gap-2"
              >
                <ChevronRight className="h-3 w-3" /> 10. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="guide-credit-card-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="how-it-works"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CreditCard className="h-6 w-6 text-blue-600" />
          How a Credit Card Works
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6">
            <WikiText
              content={`
                <p class="mb-4 text-slate-700">
                  A credit card issuer gives you a credit limit, for example ₹1,00,000. You can spend within that limit during the billing cycle. At the end of the cycle, the bank generates a statement showing your transactions, total amount due, minimum amount due, and due date.
                </p>
                <p class="mb-4 text-slate-700">
                  If you pay the full statement amount by the due date, regular retail transactions generally stay interest-free for that cycle. If you pay less than the full billed amount, the remaining balance can attract high finance charges.
                </p>
              `}
            />

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <strong className="block text-sm text-slate-900 mb-2">
                Simple flow:
              </strong>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-600">
                <li>You spend during the billing cycle.</li>
                <li>The statement is generated.</li>
                <li>You pay full due, minimum due, or something in between.</li>
                <li>
                  Only paying in full usually keeps the card efficient and
                  low-cost.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-blue-100 bg-blue-50/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-900">
                Credit Limit
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Your maximum approved borrowing line for the card.
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-emerald-900">
                Grace Period
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              The interest-free window that usually applies when you clear the
              full statement balance on time.
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900">
                Revolving Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              The unpaid billed amount that rolls forward and can attract steep
              finance charges.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="fees"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-rose-600" />
          Fees and Charges You Must Know
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Charge Type</TableHead>
                  <TableHead>What it means</TableHead>
                  <TableHead>When it hurts most</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Joining / annual fee</TableCell>
                  <TableCell>
                    Recurring card membership cost, sometimes waived on spend
                    milestones.
                  </TableCell>
                  <TableCell>
                    When your rewards are too small to offset the fee.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Finance charge</TableCell>
                  <TableCell>Interest on unpaid revolving balances.</TableCell>
                  <TableCell>
                    When you pay only minimum due repeatedly.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Late payment fee</TableCell>
                  <TableCell>Penalty for not paying by the due date.</TableCell>
                  <TableCell>
                    When you miss even one cycle and also hurt your credit
                    profile.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cash advance fee</TableCell>
                  <TableCell>
                    Fee on ATM cash withdrawal using the credit card.
                  </TableCell>
                  <TableCell>
                    Because interest often starts immediately with no grace
                    period.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Forex markup</TableCell>
                  <TableCell>Extra cost on international spending.</TableCell>
                  <TableCell>
                    When you travel or shop on foreign websites often.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Over-limit fee</TableCell>
                  <TableCell>
                    Charge if you exceed the approved limit, where applicable.
                  </TableCell>
                  <TableCell>When utilization is unmanaged.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-rose-50 p-5 text-sm text-rose-900 border border-rose-100">
          <p className="mb-2">
            <strong>Most expensive mistake:</strong> treating a reward card like
            a loan card.
          </p>
          <p>
            Even generous cashback becomes irrelevant if you revolve balances
            and pay heavy monthly finance charges.
          </p>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-credit-card-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="billing"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-indigo-600" />
          Billing Cycle, Statement Date and Due Date
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Most confusion starts here. Your <strong>billing cycle</strong> is
              the period during which transactions are collected. On the
              statement date, the bank totals them into one bill. The due date
              comes later, giving you a window to pay.
            </p>
            <p className="mb-4">
              If your statement closes on the 5th and the due date is the 25th,
              a purchase made just after the 5th can enjoy a much longer
              effective interest-free period than a purchase made just before
              the 5th.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-200 bg-emerald-50/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-900">
                Best Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Track statement generation date, not just the payment date.
                </li>
                <li>Set auto-pay for the full amount due.</li>
                <li>
                  Pay 2 to 3 days before the due date to avoid processing risk.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-900">
                Common Trap
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 space-y-2">
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  Paying only minimum due and assuming the card is “regular.”
                </li>
                <li>
                  Spending heavily near the statement date without tracking
                  utilization.
                </li>
                <li>Ignoring GST and fee lines in the statement.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="rewards"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <BadgePercent className="h-6 w-6 text-emerald-600" />
          Rewards, Cashback and Welcome Offers
        </h2>

        <WikiText
          content={`
            <p class="mb-4 text-slate-700">
              The best credit card is not the card with the biggest marketing headline. It is the card whose reward structure matches your real spending pattern: shopping, travel, dining, fuel, groceries, utilities, or business expense categories.
            </p>
          `}
        />

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Card style</TableHead>
                <TableHead>Best for</TableHead>
                <TableHead>Watch out for</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cashback card</TableCell>
                <TableCell>
                  Simple value on routine spending like shopping, bills, or
                  groceries.
                </TableCell>
                <TableCell>
                  Reward caps and excluded merchant categories.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rewards card</TableCell>
                <TableCell>
                  Flexible points ecosystem and broader redemption options.
                </TableCell>
                <TableCell>Poor redemption ratio and point expiry.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Travel card</TableCell>
                <TableCell>
                  Lounge access, hotel or flight transfer value, travel
                  benefits.
                </TableCell>
                <TableCell>
                  High annual fee and poor value if you do not travel enough.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fuel card</TableCell>
                <TableCell>
                  Frequent fuel spending and surcharge-related savings.
                </TableCell>
                <TableCell>
                  Reward caps and station-network limitations.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lifetime free card</TableCell>
                <TableCell>
                  Beginners, backup card users, low-maintenance spending.
                </TableCell>
                <TableCell>Weaker benefits than premium paid cards.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader className="pb-2 border-b border-emerald-100">
            <CardTitle className="text-emerald-900 text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Reward sanity check
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>Look at annual fee after GST.</li>
              <li>Check annual spend required for fee waiver.</li>
              <li>
                Read excluded categories such as rent, wallet loads, education,
                fuel, utilities, or government payments.
              </li>
              <li>Understand reward redemption value before applying.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-credit-card-3" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="choose-card"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Landmark className="h-6 w-6 text-violet-600" />
          How to Choose the Right Credit Card
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4 text-slate-700">
              <p>
                Choose the card around your spending behavior, not the other way
                around. A person who travels twice a year should not hold a
                premium travel card only for lounge vanity, and a person who
                spends heavily online may get more value from a simple cashback
                card.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-violet-100 bg-violet-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-violet-900">
                Ask these 5 questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>What are my top 3 spending categories?</li>
                <li>Will I actually hit the annual fee waiver threshold?</li>
                <li>Do I value cashback more than points?</li>
                <li>Do I travel enough to justify lounge and forex perks?</li>
                <li>Can I always pay in full?</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-red-900">
                Do not choose based on
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Only the welcome bonus headline.</li>
                <li>Only influencer referral hype.</li>
                <li>Only “lifetime free” without benefit check.</li>
                <li>Only premium branding.</li>
                <li>Only pre-approved status.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="credit-score"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          Credit Card Impact on Credit Score
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Behavior</TableHead>
                <TableHead>Likely effect</TableHead>
                <TableHead>Why it matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>On-time full payment</TableCell>
                <TableCell className="text-emerald-600 font-medium">
                  Positive
                </TableCell>
                <TableCell>Builds repayment reliability.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Low utilization ratio</TableCell>
                <TableCell className="text-emerald-600 font-medium">
                  Positive
                </TableCell>
                <TableCell>Shows disciplined credit use.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>High utilization month after month</TableCell>
                <TableCell className="text-amber-600 font-medium">
                  Negative
                </TableCell>
                <TableCell>
                  Signals stress or over-dependence on revolving credit.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Late payment</TableCell>
                <TableCell className="text-red-600 font-semibold">
                  Strongly negative
                </TableCell>
                <TableCell>
                  Damages payment history, the most sensitive area.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Multiple hard applications in a short span
                </TableCell>
                <TableCell className="text-amber-600">
                  Can be negative
                </TableCell>
                <TableCell>
                  Can look like aggressive credit-seeking behavior.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p className="text-slate-700 mb-4">
          To learn more about score-building behavior, see your existing guide
          on{' '}
          <Link
            href="/guides/credit-score-guide/"
            className="text-blue-600 hover:underline"
          >
            how credit scores work in India
          </Link>
          .
        </p>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              Healthy utilization rule
            </h3>
            <p className="text-sm text-blue-800">
              Many users try to stay below roughly 30% of the total limit,
              especially near statement generation. If you spend more, consider
              part-payment before the statement date rather than waiting only
              for the due date.
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-credit-card-4" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          Common Credit Card Mistakes
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 1: Paying only minimum due
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> This often keeps the account active but
              can lead to expensive revolving interest on the remaining balance.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 2: Chasing rewards you never redeem
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Unused or poor-value reward points can
              make a paid card weaker than a simple cashback card.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 3: Ignoring annual fee economics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> A premium card is worth it only when
              your net benefit is higher than its real yearly cost.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 4: Using cash advance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Cash withdrawal on a credit card is
              usually one of the most expensive forms of borrowing.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 5: Overusing the limit
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Constantly using a very high share of
              the limit can pressure your credit profile and cash flow.
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-amber-900 font-semibold">
                Mistake 6: Applying for too many cards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <strong>Reality:</strong> Too many applications in a short period
              can signal desperation for credit.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="security"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Ban className="h-6 w-6 text-red-600" />
          Security Checklist
        </h2>

        <Card className="bg-red-50 border-red-100">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-slate-800">
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Enable SMS and app alerts for every transaction.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Disable international usage when not needed.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Never share OTP, CVV, card PIN, or app login details.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Check statements regularly for subscriptions, duplicate
                transactions, and small test frauds.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Freeze or block the card instantly through the bank app if
                something looks wrong.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-credit-card-5" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compare"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-teal-600" />
          Which Card Type Fits You?
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>User profile</TableHead>
                <TableHead>Usually better fit</TableHead>
                <TableHead>Why</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Beginner, low annual spend</TableCell>
                <TableCell>Lifetime free cashback card</TableCell>
                <TableCell>
                  Simple, low-maintenance, easier to justify.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Frequent traveler</TableCell>
                <TableCell>Travel rewards card</TableCell>
                <TableCell>
                  Lounge, hotel or airline value can justify fees.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Heavy online spender</TableCell>
                <TableCell>Cashback or e-commerce-focused card</TableCell>
                <TableCell>
                  Direct value on actual monthly categories.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>High disciplined spender</TableCell>
                <TableCell>Premium rewards card</TableCell>
                <TableCell>
                  Can unlock fee waiver and milestone perks.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Person carrying debt already</TableCell>
                <TableCell>No new rewards chase</TableCell>
                <TableCell>
                  Priority should be balance cleanup, not more cards.
                </TableCell>
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
            Use Credit Cards Like a Tool, Not a Loan Habit
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            The smartest credit card strategy is boring: choose the right card,
            pay in full, keep utilization controlled, redeem rewards sensibly,
            and avoid high-cost features like revolving debt and cash advance.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Pay in full
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Watch utilization
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Compare fee vs benefit
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes
          only and does not constitute financial advice or card recommendation
          advice. Product terms, eligibility, fees, rewards, and issuer policies
          can change over time. Always verify the latest schedule of charges and
          card terms before applying.
        </p>
      </div>

      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            Need to compare debt cost or repayments?
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Use Fincado calculators to understand interest, repayment pressure,
            and better money decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/emi-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Calculate EMI
            </Link>
            <Link
              href="/sip-calculator/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-semibold text-white transition hover:bg-blue-800/50"
            >
              Grow Wealth with SIP
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print mt-8">
        <AdSlot id="guide-credit-card-6" type="leaderboard" />
      </div>
    </article>
  );
}

function FileTextIcon() {
  return <CircleDollarSign className="h-4 w-4" />;
}
