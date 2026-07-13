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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Clock,
  ChevronRight,
  Wallet,
  Lightbulb,
  ShieldCheck,
  IndianRupee,
} from 'lucide-react';
import { getCardsByTag } from '@/lib/creditCards';
import {
  CardVerifiedNote,
  CardFactCard,
  CardCompareTable,
  CardClusterNav,
} from '@/components/CreditCardFacts';

export const metadata: Metadata = {
  title: 'Best Credit Cards Under ₹500 Annual Fee in India (2026)',
  description:
    'The best low-fee credit cards in India with an annual fee of ₹500 or less — real fees, rewards and eligibility, compared using verified issuer data.',
  keywords: [
    'best credit cards under 500 annual fee',
    'low annual fee credit card india',
    'cheap credit card india 2026',
    'sbi card unnati review',
    'sbi simplyclick fee',
    'swiggy hdfc credit card fee',
    'indianoil hdfc credit card',
    'flipkart axis bank credit card fee',
  ],
  alternates: {
    canonical:
      'https://fincado.com/guides/best-credit-cards-under-500-annual-fee/',
  },
  openGraph: {
    title: 'Best Credit Cards Under ₹500 Annual Fee (2026)',
    description:
      'A ranked comparison of India\'s best low-fee credit cards, all with an annual fee of ₹500 or less.',
    url:
      'https://fincado.com/guides/best-credit-cards-under-500-annual-fee/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Are there truly free credit cards with no annual fee at all?',
    answer:
      'Yes. Based on current issuer data, the SBI Card Unnati has no fee for the first four years, and the Amazon Pay ICICI Bank Credit Card is a lifetime-free card with no joining or annual fee.',
  },
  {
    question: 'Do low-fee credit cards have weaker rewards than premium cards?',
    answer:
      'Not necessarily. Cards like the Flipkart Axis Bank Credit Card and SBI SimplyCLICK offer strong reward rates on specific spending categories despite a sub-₹500 fee — the trade-off is usually fewer lounge or travel perks, not weaker cashback.',
  },
  {
    question: 'Can I get a low annual fee card with no income proof?',
    answer:
      'Yes. The SBI Card Unnati is issued against a Fixed Deposit and does not require income proof, which makes it accessible to students, homemakers and freelancers without a salary slip.',
  },
  {
    question: 'Is annual fee waiver based on spend a reliable way to keep the card free?',
    answer:
      'It can be, but only if your spending consistently crosses the issuer\'s waiver threshold. For example, several cards in this list waive the renewal fee once annual spend crosses a published limit — check the exact figure on the issuer page before relying on it.',
  },
  {
    question: 'Which low-fee card is best for fuel purchases?',
    answer:
      'The IndianOil HDFC Bank Credit Card, with a ₹500 annual fee, is built around fuel and grocery spend and has one of the lower income eligibility requirements in this list.',
  },
  {
    question: 'Do these cards charge GST on top of the annual fee?',
    answer:
      'Most paid cards in this list list their fee as an amount plus GST, so the actual amount charged will be slightly higher than the base figure. The lifetime-free and FD-backed cards do not have this concern since their fee is nil.',
  },
];

const under500Cards = getCardsByTag('under-500');

export default function BestCreditCardsUnder500AnnualFeePage() {
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
              'Best Credit Cards Under ₹500 Annual Fee in India (2026)',
            description:
              'A ranked, fact-checked comparison of the best low annual fee credit cards in India, covering fees, rewards, eligibility and who each card suits.',
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
              '@id':
                'https://fincado.com/guides/best-credit-cards-under-500-annual-fee/',
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
            name: 'Best Credit Cards Under ₹500 Annual Fee',
            url:
              'https://fincado.com/guides/best-credit-cards-under-500-annual-fee/',
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
          Best Credit Cards Under ₹500 Annual Fee (2026)
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 9 Min Read
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
          <ShareTools title="Best Credit Cards Under ₹500 Annual Fee (2026)" />
        </div>
      </header>

      <Card className="mb-6 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>You do not need a premium card to get real value.</strong> Several credit cards in India charge ₹500 or less a year — some are nil-fee entirely — while still offering meaningful cashback or reward rates on everyday spending.
              </p>
              <p class="mb-4">
                This list compares every low-fee card in our database side by side, so you can pick based on your actual spend category instead of an inflated annual fee you may never earn back.
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
              <a href="#picks" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 2. Ranked picks
              </a>
            </li>
            <li>
              <a href="#fee-math" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 3. Is the fee really worth avoiding?
              </a>
            </li>
            <li>
              <a href="#how-to-choose" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 4. How to choose
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 5. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="guide-under-500-cards-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compare"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-blue-600" />
          Quick Comparison
        </h2>
        <CardCompareTable cards={under500Cards} />
      </section>

      <section className="mb-12">
        <h2
          id="picks"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          Ranked Picks
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {under500Cards.map((card, i) => (
            <CardFactCard key={card.slug} card={card} rank={i + 1} />
          ))}
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-under-500-cards-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="fee-math"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <IndianRupee className="h-6 w-6 text-teal-600" />
          Is a Higher Fee Ever Worth It Instead?
        </h2>
        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              A low fee is not automatically the cheapest card. If a premium card's fee waiver threshold is comfortably below your annual spend, and its reward rate is meaningfully higher, the extra fee can pay for itself. But for most everyday spenders, a sub-₹500 card in this list already covers online shopping, food delivery, or fuel spending without any fee risk.
            </p>
            <p>
              The simplest test: only pick a paid card over a nil-fee one if the extra rewards you would realistically earn clearly exceed the fee difference.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2
          id="how-to-choose"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-violet-600" />
          How to Choose Among These Cards
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-emerald-100 bg-emerald-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-emerald-900 block mb-1">
                No credit history / no income proof
              </strong>
              The SBI Card Unnati is FD-backed and does not require income proof, making it a practical starting card.
            </CardContent>
          </Card>
          <Card className="border-blue-100 bg-blue-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-blue-900 block mb-1">
                Heavy online shopper
              </strong>
              SBI SimplyCLICK, Amazon Pay ICICI, or Flipkart Axis line up with online marketplace spend.
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-amber-900 block mb-1">
                Food delivery user
              </strong>
              The Swiggy HDFC Bank Credit Card is built specifically around the Swiggy app ecosystem.
            </CardContent>
          </Card>
          <Card className="border-rose-100 bg-rose-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-rose-900 block mb-1">
                Regular fuel buyer
              </strong>
              The IndianOil HDFC Bank Credit Card has a lower income requirement and fuel-focused rewards.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="faqs" className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20">
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
            Want the full credit card fundamentals first?
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Read the complete Fincado credit card guide to understand fees, billing cycles and credit score impact before you apply.
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
        <AdSlot id="guide-under-500-cards-3" type="leaderboard" />
      </div>
    </article>
  );
}
