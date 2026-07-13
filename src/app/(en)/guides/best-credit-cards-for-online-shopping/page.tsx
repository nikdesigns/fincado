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
  ShoppingCart,
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
  title: 'Best Credit Cards for Online Shopping in India 2026',
  description:
    'The best credit cards for online shopping in India — Amazon, Flipkart and Myntra cashback rates compared using verified issuer data, updated for 2026.',
  keywords: [
    'best credit card for online shopping india',
    'best credit card for amazon flipkart',
    'online shopping credit card 2026',
    'flipkart axis credit card review',
    'amazon pay icici credit card benefits',
    'sbi simplyclick online shopping',
    'hdfc millennia online cashback',
  ],
  alternates: {
    canonical:
      'https://fincado.com/guides/best-credit-cards-for-online-shopping/',
  },
  openGraph: {
    title: 'Best Credit Cards for Online Shopping in India 2026',
    description:
      'A ranked comparison of India\'s best credit cards for Amazon, Flipkart, Myntra and other online shopping.',
    url: 'https://fincado.com/guides/best-credit-cards-for-online-shopping/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Which credit card gives the highest cashback on Amazon?',
    answer:
      'Based on current issuer data, the Amazon Pay ICICI Bank Credit Card offers 5% back on Amazon.in for Prime members (3% for non-Prime), and it is a lifetime-free card, though it is invite-only.',
  },
  {
    question: 'Which credit card is best for Flipkart and Myntra shopping?',
    answer:
      'The Flipkart Axis Bank Credit Card is built specifically for this — it offers 7.5% cashback on Myntra and 5% on Flipkart, both subject to a quarterly cap, plus an unlimited 1.5% base rate on everything else.',
  },
  {
    question: 'Do online shopping credit cards work on all e-commerce sites?',
    answer:
      'No. The bonus cashback rate usually applies only to specific partner merchants listed by the issuer — for example SBI SimplyCLICK\'s 10X rate applies at Amazon, Cleartrip, BookMyShow and select partners, while other online spend earns a lower rate.',
  },
  {
    question: 'Is there a card that also covers food delivery along with shopping?',
    answer:
      'Yes, the Swiggy HDFC Bank Credit Card offers cashback on Swiggy app spends (food delivery, Instamart, Dineout, Genie) as well as a flat rate on other online spends, making it a reasonable dual-purpose option.',
  },
  {
    question: 'Do I need Amazon Prime to benefit from the Amazon Pay ICICI card?',
    answer:
      'No, but the cashback rate is lower without it. Prime members earn 5% back on Amazon.in with this card, while non-Prime members earn 3%.',
  },
  {
    question: 'What should I check before applying for an online shopping credit card?',
    answer:
      'Check the exact partner merchant list, the monthly or quarterly cashback cap, the annual fee and its waiver condition, and whether the card is open to direct application or requires an invitation.',
  },
];

const onlineShoppingCards = getCardsByTag('online-shopping');

export default function BestCreditCardsForOnlineShoppingPage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline: 'Best Credit Cards for Online Shopping in India 2026',
            description:
              'A ranked, fact-checked comparison of the best credit cards for online shopping in India, covering Amazon, Flipkart and Myntra cashback rates, fees and eligibility.',
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
                'https://fincado.com/guides/best-credit-cards-for-online-shopping/',
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
            name: 'Best Credit Cards for Online Shopping',
            url:
              'https://fincado.com/guides/best-credit-cards-for-online-shopping/',
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
          Best Credit Cards for Online Shopping in India (2026)
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
          <ShareTools title="Best Credit Cards for Online Shopping in India (2026)" />
        </div>
      </header>

      <Card className="mb-6 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>If most of your spending happens on Amazon, Flipkart, Myntra or similar platforms,</strong> a card tuned to online shopping will earn you meaningfully more than a generic rewards card.
              </p>
              <p class="mb-4">
                This roundup compares the cards in our database tagged for online shopping, so you can match the partner-merchant list and cashback cap to where you actually spend before applying.
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
              <a href="#by-platform" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 3. Best card by platform
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
        <AdSlot id="guide-online-shopping-cards-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compare"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          Quick Comparison
        </h2>
        <CardCompareTable cards={onlineShoppingCards} />
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
          {onlineShoppingCards.map((card, i) => (
            <CardFactCard key={card.slug} card={card} rank={i + 1} />
          ))}
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-online-shopping-cards-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="by-platform"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShoppingCart className="h-6 w-6 text-teal-600" />
          Best Card by Platform
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-blue-100 bg-blue-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-blue-900 block mb-1">Amazon</strong>
              Amazon Pay ICICI Bank Credit Card (invite-only) or SBI SimplyCLICK for its 10X partner rate at Amazon.
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-amber-900 block mb-1">Flipkart / Myntra</strong>
              Flipkart Axis Bank Credit Card, with dedicated cashback tiers on both platforms.
            </CardContent>
          </Card>
          <Card className="border-emerald-100 bg-emerald-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-emerald-900 block mb-1">Multiple partner merchants</strong>
              HDFC Millennia, which spreads cashback across 10 partner merchants including Amazon, Flipkart and Myntra.
            </CardContent>
          </Card>
          <Card className="border-rose-100 bg-rose-50/60">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="text-rose-900 block mb-1">Food delivery + online</strong>
              Swiggy HDFC Bank Credit Card, for Swiggy app spend plus a flat rate on other online purchases.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="how-to-choose"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-violet-600" />
          How to Choose
        </h2>
        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                Identify your <strong>top one or two platforms</strong> by actual monthly spend, not occasional purchases.
              </li>
              <li>
                Check whether the <strong>bonus rate is capped per month or per quarter</strong> — several cards in this list cap the top-tier cashback.
              </li>
              <li>
                Confirm the <strong>fee waiver spend threshold</strong> so the card stays effectively free if that matters to you.
              </li>
              <li>
                If a card is <strong>invite-only</strong>, like Amazon Pay ICICI, have a backup option you can apply for directly.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-100">
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm text-slate-800">
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Do not assume a card's bonus rate applies at every online store — most are restricted to specific partner merchants.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                Do not carry a balance to chase online shopping cashback — interest charges will typically outweigh the rewards.
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
        <AdSlot id="guide-online-shopping-cards-3" type="leaderboard" />
      </div>
    </article>
  );
}
