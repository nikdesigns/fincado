import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import { Card, CardContent } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import {
  Plane,
  Clock,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import { getCardsByTag } from '@/lib/creditCards';
import {
  CardVerifiedNote,
  CardFactCard,
  CardCompareTable,
  CardClusterNav,
} from '@/components/CreditCardFacts';

export const metadata: Metadata = {
  title: 'Best Credit Cards for Airport Lounge Access in India 2026',
  description:
    'Best credit cards for airport lounge access in India 2026, from entry-level HDFC Millennia to premium HDFC Regalia Gold and Axis Magnus, ranked by annual fee.',
  keywords: [
    'best credit card for airport lounge access india',
    'credit card lounge access 2026',
    'hdfc millennia lounge access',
    'hdfc regalia gold lounge access',
    'axis magnus lounge access',
    'priority pass credit card india',
    'domestic lounge access credit card',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/best-credit-cards-for-airport-lounge-access/',
  },
  openGraph: {
    title: 'Best Credit Cards for Airport Lounge Access in India 2026',
    description:
      'Compare lounge-access credit cards from entry-level to premium, ordered by annual fee so you can find your entry point.',
    url: 'https://fincado.com/guides/best-credit-cards-for-airport-lounge-access/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the cheapest credit card with airport lounge access in India?',
    answer:
      'Among cards in this comparison, HDFC Millennia has the lowest annual fee at ₹1,000 + GST and includes complimentary domestic lounge access, making it the most accessible entry point.',
  },
  {
    question: 'Which card gives international lounge access, not just domestic?',
    answer:
      'HDFC Regalia Gold offers complimentary domestic and limited international lounge access via Priority Pass. Axis Bank Magnus offers extensive complimentary lounge access as well — check the current Priority Pass or network terms on each issuer page for the latest visit limits.',
  },
  {
    question: 'Is Axis Bank Magnus worth its high annual fee just for lounge access?',
    answer:
      'Lounge access alone rarely justifies a ₹12,500 + GST annual fee. Magnus makes more sense for very high spenders who also value its accelerated reward rate on spends above ₹1.5 lakh a month, with lounge access as one part of a broader premium package.',
  },
  {
    question: 'Do lounge-access credit cards have a minimum spend condition for free entry?',
    answer:
      'Some do, and terms vary by card and by year, including possible spend-linked eligibility for visits. Always confirm the current lounge program rules and any minimum-spend conditions on the issuer page before you travel.',
  },
  {
    question: 'Can annual fees on lounge-access cards be waived?',
    answer:
      'Often yes, based on annual spend. For example, HDFC Millennia waives its fee on ₹1,00,000 spend in the preceding 12 months, and HDFC Regalia Gold on ₹4 lakh annual spend. Axis Magnus waives its fee on ₹25 lakh preceding-year spend.',
  },
  {
    question: 'Does a lounge-access card make sense if I fly only occasionally?',
    answer:
      'Usually not for the premium tiers. If you fly a few times a year, an entry-level card like HDFC Millennia that bundles lounge access with everyday cashback tends to offer better all-round value than paying a steep fee purely for lounge visits.',
  },
];

export default function BestLoungeAccessCreditCardsPage() {
  const loungeCards = getCardsByTag('lounge');

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline: 'Best Credit Cards for Airport Lounge Access in India 2026',
            description:
              'A comparison of credit cards offering airport lounge access in India, ranked by annual fee from entry-level to premium.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://fincado.com/#organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fincado.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/guides/best-credit-cards-for-airport-lounge-access/',
            },
            datePublished: '2026-07-12',
            dateModified: '2026-07-12',
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
            name: 'Best Credit Cards for Airport Lounge Access',
            url: 'https://fincado.com/guides/best-credit-cards-for-airport-lounge-access/',
          },
        ]}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Credit Card Cluster
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Best Credit Cards for Airport Lounge Access in India 2026
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 8 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jul 2026</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </span>
        </div>

        <div className="mt-6">
          <ShareTools title="Best Credit Cards for Airport Lounge Access in India 2026" />
        </div>
      </header>

      <Card className="mb-8 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>Lounge access is a tiered benefit</strong> — you do not need a super-premium card to get your first taste of it, and you do not need the most expensive card just because it has the longest lounge list.
              </p>
              <p class="mb-4">
                This page ranks three cards tagged for lounge access in our data, from the lowest annual fee to the highest, so you can see the actual entry point into premium lounge benefits and decide how far up the tier you genuinely need to go.
              </p>
            `}
          />
        </CardContent>
      </Card>

      <CardVerifiedNote />

      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print">
        <CardContent className="p-6">
          <p className="mb-4 text-lg font-semibold text-slate-900">
            Table of Contents
          </p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a href="#compare" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 1. Quick comparison
              </a>
            </li>
            <li>
              <a href="#cards" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 2. Card breakdown, low to high fee
              </a>
            </li>
            <li>
              <a href="#tiers" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 3. Which tier fits your travel
              </a>
            </li>
            <li>
              <a href="#choose" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 4. How to choose
              </a>
            </li>
            <li>
              <a href="#mistakes" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 5. Mistakes to avoid
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="guide-lounge-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compare"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Plane className="h-6 w-6 text-sky-600" />
          Quick Comparison (Ascending Annual Fee)
        </h2>
        <CardCompareTable cards={loungeCards} />
      </section>

      <section className="mb-12">
        <h2
          id="cards"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20"
        >
          Card Breakdown: Entry-Level to Premium
        </h2>
        <div className="grid gap-6">
          {loungeCards.map((card, index) => (
            <CardFactCard key={card.slug} card={card} rank={index + 1} />
          ))}
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-lounge-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="tiers"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-teal-600" />
          Which Tier Fits Your Travel Pattern?
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Travel pattern</TableHead>
                <TableHead>Likely fit</TableHead>
                <TableHead>Why</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Fly a few times a year, mostly domestic</TableCell>
                <TableCell>HDFC Millennia</TableCell>
                <TableCell>Lowest annual fee on this list, plus everyday cashback on top of domestic lounge access.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fly moderately, occasional international trips</TableCell>
                <TableCell>HDFC Regalia Gold</TableCell>
                <TableCell>Domestic and limited international lounge access via Priority Pass, with milestone travel vouchers.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Very high spender, frequent premium travel</TableCell>
                <TableCell>Axis Bank Magnus</TableCell>
                <TableCell>Extensive lounge access bundled with a sharply accelerated reward rate at high spend levels.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg bg-sky-50 p-5 text-sm text-sky-900 border border-sky-100">
          <p>
            <strong>Rule of thumb:</strong> only move up a fee tier when the incremental lounge, travel, or reward benefit clearly exceeds the fee gap for your actual travel frequency — not your aspirational travel frequency.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="choose"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-emerald-600" />
          How to Choose a Lounge Access Card
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-emerald-900 mb-2">Check before applying</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li>Domestic-only versus domestic-and-international lounge access.</li>
                <li>Whether the fee waiver threshold matches your realistic annual spend.</li>
                <li>Whether the card&apos;s income and spend eligibility matches your profile.</li>
                <li>What else the card offers beyond lounge access — cashback, rewards, milestone vouchers.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-red-900 mb-2">Do not decide based on</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li>The card&apos;s premium branding alone.</li>
                <li>Lounge access you will rarely use given your actual flight count.</li>
                <li>Assuming a higher fee always means proportionally more lounge value.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-lounge-3" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          Mistakes to Avoid
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Jumping straight to the top-fee card</strong>
              A ₹12,500 + GST card rarely makes sense before you have tested whether an entry-level lounge card already covers your travel needs.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Assuming unlimited visits</strong>
              Lounge programs often have visit limits or spend conditions. Confirm the exact current terms rather than assuming unlimited access.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Ignoring the fee-waiver spend threshold</strong>
              If your realistic annual spend will not clear the waiver threshold, the full annual fee should factor into your value calculation.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Forgetting eligibility income bands</strong>
              Premium cards carry meaningfully higher income requirements. Check eligibility before applying to avoid a hard inquiry with no approval.
            </CardContent>
          </Card>
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
            Find Your Entry Point, Not the Top of the Ladder
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Start at the fee tier that matches your actual travel frequency and spend, then move up only when the numbers clearly justify it.
          </p>
        </CardContent>
      </Card>

      <div className="mb-8">
        <CardClusterNav />
      </div>

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
            New to credit cards? Start with the basics.
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Read the full Fincado Credit Card Guide to understand billing cycles, fees, rewards, and credit score impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/guides/credit-card-guide/"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Read the Credit Card Guide
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print mt-8">
        <AdSlot id="guide-lounge-4" type="leaderboard" />
      </div>
    </article>
  );
}
