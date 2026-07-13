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
  Fuel,
  Clock,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Percent,
} from 'lucide-react';
import { getCardsByTag } from '@/lib/creditCards';
import {
  CardVerifiedNote,
  CardFactCard,
  CardCompareTable,
  CardClusterNav,
} from '@/components/CreditCardFacts';

export const metadata: Metadata = {
  title: 'Best Fuel Credit Cards in India 2026',
  description:
    'Best fuel credit cards in India 2026: compare IndianOil HDFC Bank Credit Card and BPCL SBI Card OCTANE on fees, fuel rewards, surcharge waiver, and eligibility.',
  keywords: [
    'best fuel credit card india',
    'fuel credit card 2026',
    'indianoil hdfc credit card review',
    'bpcl sbi card octane review',
    'fuel surcharge waiver credit card',
    'petrol credit card india',
    'credit card for fuel cashback',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/best-fuel-credit-cards/',
  },
  openGraph: {
    title: 'Best Fuel Credit Cards in India 2026',
    description:
      'Compare the top fuel-focused credit cards in India on fees, reward rates, and eligibility before you apply.',
    url: 'https://fincado.com/guides/best-fuel-credit-cards/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Which is the best fuel credit card in India right now?',
    answer:
      'It depends on your fuel brand and spend. The IndianOil HDFC Bank Credit Card suits regular IndianOil buyers with a modest income requirement, while the BPCL SBI Card OCTANE suits higher fuel spenders at BPCL pumps who also want lounge access, for a higher annual fee.',
  },
  {
    question: 'What is a fuel surcharge waiver?',
    answer:
      'It is a waiver of the extra surcharge that fuel stations typically add on credit card transactions, usually capped at a maximum amount per billing cycle. Both cards on this page include a fuel surcharge waiver alongside their fuel reward points.',
  },
  {
    question: 'Do fuel credit cards only give rewards at one petrol brand?',
    answer:
      'Often yes for the highest reward rate. The IndianOil HDFC Bank Credit Card rewards spending at IndianOil outlets specifically, and the BPCL SBI Card OCTANE rewards BPCL pumps and Bharat Gas. Both also earn at lower or standard rates on other categories.',
  },
  {
    question: 'Is the BPCL SBI Card OCTANE worth its annual fee?',
    answer:
      'It depends on your fuel spend. It carries a higher annual fee than the IndianOil HDFC card, but the fee is waived on ₹2 lakh annual spend and the card offers a materially higher fuel reward rate plus lounge access, which can suit heavy fuel spenders.',
  },
  {
    question: 'Can I get a fuel credit card with a low income?',
    answer:
      'The IndianOil HDFC Bank Credit Card has a comparatively low minimum salaried income requirement of ₹12,000 per month, making it more accessible than many other fuel or premium cards. Always confirm current criteria on the issuer page.',
  },
  {
    question: 'Do fuel credit card rewards have a monthly cap?',
    answer:
      'Yes, typically. Fuel-linked reward earnings on these cards are usually capped on a monthly basis, so very heavy single-month fuel spend may not earn rewards on the entire amount. Check the current cap on the issuer page.',
  },
];

export default function BestFuelCreditCardsPage() {
  const fuelCards = getCardsByTag('fuel');

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline: 'Best Fuel Credit Cards in India 2026',
            description:
              'A comparison of the top fuel-focused credit cards in India, covering fees, fuel reward rates, surcharge waivers, and eligibility.',
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
              '@id': 'https://fincado.com/guides/best-fuel-credit-cards/',
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
            name: 'Best Fuel Credit Cards',
            url: 'https://fincado.com/guides/best-fuel-credit-cards/',
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
          Best Fuel Credit Cards in India 2026
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
          <ShareTools title="Best Fuel Credit Cards in India 2026" />
        </div>
      </header>

      <Card className="mb-8 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>Fuel credit cards exist to solve one specific problem:</strong> the surcharge fuel stations often add on card payments, plus weak or no rewards on petrol and diesel spend from a general-purpose card.
              </p>
              <p class="mb-4">
                This page compares only cards tagged for fuel spending in our data — the IndianOil HDFC Bank Credit Card and the BPCL SBI Card OCTANE — so you can match a card to the brand you actually fill up at and your typical monthly fuel spend.
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
                <ChevronRight className="h-3 w-3" /> 2. Card breakdown
              </a>
            </li>
            <li>
              <a href="#surcharge" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 3. Fuel surcharge explained
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
        <AdSlot id="guide-fuel-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compare"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Fuel className="h-6 w-6 text-orange-600" />
          Quick Comparison
        </h2>
        <CardCompareTable cards={fuelCards} />
      </section>

      <section className="mb-12">
        <h2
          id="cards"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20"
        >
          Card Breakdown
        </h2>
        <div className="grid gap-6">
          {fuelCards.map((card, index) => (
            <CardFactCard key={card.slug} card={card} rank={index + 1} />
          ))}
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-fuel-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="surcharge"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-rose-600" />
          Fuel Surcharge, Explained
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Fuel stations in India commonly levy a surcharge (usually around 1% to 2.5%, set by the fuel outlet and payment network, not the card issuer) whenever you pay by credit card. A fuel credit card&apos;s surcharge waiver refunds or cancels this charge, typically up to a fixed cap per billing cycle.
            </p>
            <p>
              Both cards on this page bundle a fuel surcharge waiver with their headline fuel reward rate. The surcharge waiver alone will not make or break a card&apos;s value — it is the underlying reward rate on fuel spend that usually matters more for regular buyers.
            </p>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-rose-50 p-5 text-sm text-rose-900 border border-rose-100">
          <p>
            <strong>Check before you rely on it:</strong> surcharge waiver caps and eligible transaction ranges can change. Confirm the current terms on the issuer&apos;s official card page before assuming a specific rupee saving.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="choose"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-emerald-600" />
          How to Choose a Fuel Card
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Your situation</TableHead>
                <TableHead>Likely better fit</TableHead>
                <TableHead>Why</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Fill up mostly at IndianOil, modest income</TableCell>
                <TableCell>IndianOil HDFC Bank Credit Card</TableCell>
                <TableCell>Lower income threshold and a low ₹500 annual fee, waived on ₹50,000 annual spend.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>High monthly fuel spend, fill up at BPCL</TableCell>
                <TableCell>BPCL SBI Card OCTANE</TableCell>
                <TableCell>Materially higher fuel reward rate and lounge access, for a higher annual fee.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fuel spend is occasional, not a major category</TableCell>
                <TableCell>Consider a general cashback card instead</TableCell>
                <TableCell>A dedicated fuel card only pays off if fuel is a meaningful, recurring spend line.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-fuel-3" type="leaderboard" />
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
              <strong className="block text-amber-900 mb-1">Ignoring the brand lock-in</strong>
              The highest reward rate usually applies only at one fuel brand&apos;s outlets. Check which brand you actually use before applying.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Not tracking the monthly reward cap</strong>
              Fuel rewards are usually capped per cycle. Very large single fill-ups may not earn rewards on the full amount.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Choosing fee over fit</strong>
              A higher annual fee card can still be cheaper in net terms if your fuel spend easily clears the waiver threshold and reward rate gap.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Forgetting other spend categories</strong>
              Both cards on this page also reward select non-fuel categories — factor that into your overall value, not fuel alone.
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
            Match the Card to Your Pump, Not the Ad
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            A fuel card only pays off when its reward rate matches the brand you actually fill up at and your genuine monthly spend clears any fee-waiver threshold.
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
        <AdSlot id="guide-fuel-4" type="leaderboard" />
      </div>
    </article>
  );
}
