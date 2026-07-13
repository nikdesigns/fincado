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
} from 'lucide-react';
import { getCardsByTag } from '@/lib/creditCards';
import {
  CardVerifiedNote,
  CardFactCard,
  CardCompareTable,
  CardClusterNav,
} from '@/components/CreditCardFacts';

export const metadata: Metadata = {
  title: 'Best Cashback Credit Cards in India 2026 (Top 5 Compared)',
  description:
    'Compare the best cashback credit cards in India for 2026 — annual fees, real cashback rates, and who each card suits, based on verified issuer data.',
  keywords: [
    'best cashback credit cards india',
    'best cashback credit card 2026',
    'cashback credit card india',
    'sbi simplyclick review',
    'hdfc millennia cashback',
    'swiggy hdfc credit card',
    'amazon pay icici credit card',
    'flipkart axis credit card',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/best-cashback-credit-cards/',
  },
  openGraph: {
    title: 'Best Cashback Credit Cards in India 2026',
    description:
      'A ranked, fact-checked comparison of the top cashback credit cards available in India right now.',
    url: 'https://fincado.com/guides/best-cashback-credit-cards/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Which is the best cashback credit card in India for beginners?',
    answer:
      'For beginners, a lifetime-free option like the Amazon Pay ICICI Bank Credit Card (available by invitation) or a low-fee card like SBI SimplyCLICK is usually easier to justify since there is little or no annual fee risk.',
  },
  {
    question: 'Is a cashback card better than a reward points card?',
    answer:
      'Cashback cards are generally simpler because the value is direct and does not depend on redemption catalogues or point expiry. Reward-point cards can offer more value only if you actively redeem points well.',
  },
  {
    question: 'Do cashback credit cards have spending caps?',
    answer:
      'Yes, most cashback cards cap the bonus-rate cashback per month or per billing cycle, for example the Swiggy HDFC Bank Credit Card caps its 10% Swiggy cashback and HDFC Millennia caps its partner-merchant cashback. Always check the cap before assuming uncapped value.',
  },
  {
    question: 'Can I apply for the Amazon Pay ICICI Bank Credit Card directly?',
    answer:
      'No. Based on current issuer information, it is invite-only — ICICI Bank or Amazon extends an invitation, and it cannot be applied for directly like a regular card.',
  },
  {
    question: 'Is cashback credited automatically or do I need to redeem it?',
    answer:
      'This varies by issuer and card. Some cashback is auto-credited to the statement, while other programs require you to redeem points for cashback. Always confirm the exact crediting process on the issuer page before applying.',
  },
  {
    question: 'Do cashback credit cards charge GST on the annual fee?',
    answer:
      'Yes, in India annual and joining fees on credit cards are typically charged plus applicable GST, as reflected in the fee figures issuers publish.',
  },
];

const cashbackCards = getCardsByTag('cashback');

export default function BestCashbackCreditCardsPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline: 'Best Cashback Credit Cards in India 2026 (Top 5 Compared)',
            description:
              'A ranked, fact-checked comparison of the top cashback credit cards available in India, covering fees, rewards, eligibility and who each card suits.',
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
              '@id': 'https://fincado.com/guides/best-cashback-credit-cards/',
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
            name: 'Best Cashback Credit Cards',
            url: 'https://fincado.com/guides/best-cashback-credit-cards/',
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
          Best Cashback Credit Cards in India 2026
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
          <ShareTools title="Best Cashback Credit Cards in India 2026" />
        </div>
      </header>

      <Card className="mb-6 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>Cashback credit cards</strong> give back a percentage of your spend directly as cashback, instead of points you have to redeem through a catalogue. That simplicity is exactly why they suit most everyday spenders — the value is easy to calculate and does not depend on redemption timing.
              </p>
              <p class="mb-4">
                This roundup compares the cashback cards currently available in India, based only on the fees, rewards and eligibility details published by the issuers, so you can shortlist by your own spending pattern rather than marketing headlines.
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
              <a href="#how-to-choose" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 3. How to choose
              </a>
            </li>
            <li>
              <a href="#mistakes" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 4. Mistakes to avoid
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
        <AdSlot id="guide-cashback-cards-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compare"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-blue-600" />
          Quick Comparison
        </h2>
        <CardCompareTable cards={cashbackCards} />
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
          {cashbackCards.map((card, i) => (
            <CardFactCard key={card.slug} card={card} rank={i + 1} />
          ))}
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-cashback-cards-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="how-to-choose"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-violet-600" />
          How to Choose a Cashback Card
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Do not shortlist by the headline cashback percentage alone. Instead, map the card to where you actually spend the most: online marketplaces, food delivery, groceries, or a broad general spend.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                Match the <strong>partner merchant list</strong> to your real shopping habits — a high rate on a platform you never use is worth nothing.
              </li>
              <li>
                Check the <strong>monthly or cycle cap</strong> on bonus-rate cashback so you know where the rate drops to the base rate.
              </li>
              <li>
                Look at the <strong>fee waiver condition</strong> — many of these cards waive the annual fee only above a spend threshold.
              </li>
              <li>
                Confirm whether the card is <strong>open to apply</strong> or invite-only before you get attached to it.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-emerald-100 bg-emerald-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-emerald-900 block mb-1">Good fit signal</strong>
              Your top spending category matches the card's bonus-rate merchant list and you can clear the fee waiver spend comfortably.
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-amber-900 block mb-1">Weak fit signal</strong>
              You are choosing based on the highest advertised percentage without checking the spend cap or merchant restrictions.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-red-600" />
          Mistakes to Avoid
        </h2>
        <Card className="bg-red-50 border-red-100">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-slate-800">
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Assuming the bonus cashback rate applies to your entire spend, when in reality it usually applies only to specific merchants and up to a cap.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Carrying a revolving balance to chase cashback — the finance charges will almost always exceed the cashback earned.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Ignoring the fee waiver spend requirement and paying the renewal fee unnecessarily.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Applying directly for an invite-only card such as the Amazon Pay ICICI Bank Credit Card, which is not possible without an invitation.
              </li>
            </ul>
          </CardContent>
        </Card>
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
        <AdSlot id="guide-cashback-cards-3" type="leaderboard" />
      </div>
    </article>
  );
}
