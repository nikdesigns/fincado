import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import {
  CardVerifiedNote,
  CardFactCard,
  CardCompareTable,
  CardClusterNav,
} from '@/components/CreditCardFacts';
import { getCardBySlug } from '@/lib/creditCards';
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
  Scale,
  UtensilsCrossed,
  Percent,
  CheckCircle2,
  Clock,
  Wallet,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HDFC Millennia vs Swiggy HDFC Credit Card: Full Comparison (2026)',
  description:
    'HDFC Millennia vs Swiggy HDFC Bank Credit Card compared — fees, cashback categories, caps and eligibility — to help you pick the right HDFC cashback card for your spending pattern.',
  keywords: [
    'HDFC Millennia vs Swiggy HDFC',
    'HDFC Millennia review',
    'Swiggy HDFC credit card review',
    'best HDFC cashback card',
    'HDFC Millennia cashback categories',
    'Swiggy HDFC card benefits',
    'HDFC credit card comparison',
  ],
  alternates: {
    canonical:
      'https://fincado.com/guides/hdfc-millennia-vs-swiggy-hdfc-credit-card/',
  },
  openGraph: {
    title: 'HDFC Millennia vs Swiggy HDFC Credit Card: Full Comparison (2026)',
    description:
      'Two popular HDFC cashback cards, compared feature by feature to find the better fit for your spending.',
    url:
      'https://fincado.com/guides/hdfc-millennia-vs-swiggy-hdfc-credit-card/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Is HDFC Millennia better than the Swiggy HDFC card?',
    answer:
      'It depends on your spending mix. HDFC Millennia offers up to 5% cashback across a wider basket of 10 partner merchants (Amazon, Flipkart, Myntra, Swiggy and more) capped at ₹1,000/month, plus complimentary domestic lounge access. The Swiggy HDFC card focuses its highest cashback (10%) specifically on the Swiggy app, capped at ₹1,500/billing cycle, with a lower annual fee.',
  },
  {
    question: 'Which card has a lower annual fee?',
    answer:
      'The Swiggy HDFC Bank Credit Card has a lower joining and annual fee of ₹500 + GST, against ₹1,000 + GST for HDFC Millennia. The Swiggy card fee waiver also kicks in on ₹2 lakh annual spend, versus ₹1,00,000 in the preceding 12 months for Millennia.',
  },
  {
    question: 'Does the Swiggy HDFC card work only on Swiggy?',
    answer:
      'No. Its highest cashback rate (10%) is reserved for the Swiggy app — food delivery, Instamart, Dineout and Genie — capped at ₹1,500 per billing cycle. Beyond that, it still gives 5% on other online spends and 1% on other categories, so it is usable as a general card too.',
  },
  {
    question: 'Does HDFC Millennia give lounge access?',
    answer:
      'Yes, HDFC Millennia includes complimentary domestic lounge access as one of its standout features, according to card data on file. The Swiggy HDFC card is not listed with this benefit.',
  },
  {
    question: 'Can I have both HDFC Millennia and the Swiggy HDFC card?',
    answer:
      'Yes, there is no rule against holding both, and some users do to combine Millennia\'s wider partner-merchant cashback with the Swiggy card\'s deeper food-delivery discount. Just make sure you can comfortably manage both annual fees and spend thresholds before applying for a second card.',
  },
];

export default function HdfcMillenniaVsSwiggyHdfcPage() {
  const millennia = getCardBySlug('hdfc-millennia')!;
  const swiggyHdfc = getCardBySlug('swiggy-hdfc')!;

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
              'HDFC Millennia vs Swiggy HDFC Credit Card: Full Comparison (2026)',
            description:
              'A detailed, fact-checked comparison of the HDFC Millennia and Swiggy HDFC Bank Credit Card covering fees, cashback categories, caps and eligibility.',
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
                'https://fincado.com/guides/hdfc-millennia-vs-swiggy-hdfc-credit-card/',
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
            name: 'HDFC Millennia vs Swiggy HDFC',
            url:
              'https://fincado.com/guides/hdfc-millennia-vs-swiggy-hdfc-credit-card/',
          },
        ]}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Card vs Card
        </Badge>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          HDFC Millennia vs Swiggy HDFC Credit Card: Full Comparison (2026)
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 10 Min Read
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
          <ShareTools title="HDFC Millennia vs Swiggy HDFC Credit Card" />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p><strong>HDFC Millennia</strong> and the <strong>Swiggy HDFC Bank Credit Card</strong> are both cashback cards from the same issuer, aimed at online spenders — but they are built around different spending baskets. Millennia spreads its cashback across a wider basket of 10 partner merchants, while the Swiggy card concentrates its best rate specifically on food delivery and quick commerce through the Swiggy app.</p>
            <p>This guide compares both cards head-to-head on fees, cashback structure, caps, and eligibility, using only the facts in our verified card database, so you can pick the one that matches how you actually spend.</p>`}
          />
        </CardContent>
      </Card>

      <CardVerifiedNote />

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="h-6 w-6 text-blue-600" /> Head-to-Head Comparison
        </h2>
        <CardCompareTable cards={[millennia, swiggyHdfc]} />
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-millennia-swiggy-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="cards"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-emerald-600" /> Full Card Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <CardFactCard card={millennia} />
          <CardFactCard card={swiggyHdfc} />
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="fees"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-rose-600" /> Fees and Fee Waivers
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Fee Component</TableHead>
                <TableHead className="font-bold text-slate-900">HDFC Millennia</TableHead>
                <TableHead className="font-bold text-slate-900">Swiggy HDFC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">Joining Fee</TableCell>
                <TableCell>{millennia.joiningFee}</TableCell>
                <TableCell className="text-emerald-600 font-bold">{swiggyHdfc.joiningFee}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">Annual Fee</TableCell>
                <TableCell>{millennia.annualFee}</TableCell>
                <TableCell className="text-emerald-600 font-bold">{swiggyHdfc.annualFee}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">Fee Waiver Condition</TableCell>
                <TableCell>{millennia.feeWaiver}</TableCell>
                <TableCell>{swiggyHdfc.feeWaiver}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-slate-600">
          The Swiggy HDFC card costs less upfront, but Millennia's higher fee is easier to waive off since the
          spend threshold (₹1,00,000 in the preceding 12 months) is lower in absolute terms than the Swiggy card's
          ₹2 lakh annual spend requirement.
        </p>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-millennia-swiggy-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="cashback"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <UtensilsCrossed className="h-6 w-6 text-orange-600" /> Cashback Categories and Caps
        </h2>
        <WikiText
          content={`<p class="mb-4 text-slate-700"><strong>HDFC Millennia</strong> gives up to 5% cashback on 10 partner merchants — including Amazon, Flipkart, Myntra and Swiggy among others — but this is capped at ₹1,000/month. Spending outside these partners earns 1% cashback, capped at ₹750/month. On top of that, a ₹1,000 voucher is available on ₹1 lakh spend per quarter.</p>
          <p class="mb-4 text-slate-700">The <strong>Swiggy HDFC Bank Credit Card</strong> takes the opposite approach: it puts its highest rate — 10% cashback — specifically on the Swiggy app (food delivery, Instamart, Dineout, Genie), capped at ₹1,500 per billing cycle. Other online spends earn 5%, and all other categories earn 1%. New cardholders also get 3 months of free Swiggy One on joining.</p>`}
        />
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm text-amber-900">
          <strong>Key takeaway:</strong> If Swiggy is a meaningful chunk of your monthly spend, the Swiggy card's 10%
          rate will likely outearn Millennia's broader but lower 5% partner-merchant rate on that specific spend.
          If your spending is spread across many different online merchants rather than concentrated on Swiggy,
          Millennia's wider partner list may earn you more overall.
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="eligibility"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-teal-600" /> Eligibility
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">HDFC Millennia</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">{millennia.eligibility}</CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">Swiggy HDFC</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">{swiggyHdfc.eligibility}</CardContent>
          </Card>
        </div>
        <p className="mt-4 text-sm text-slate-500 italic">
          Eligibility criteria for the Swiggy HDFC card variant are not published in our data set at the time of
          writing — always confirm current minimum income and age requirements on HDFC Bank's official page before
          applying.
        </p>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-millennia-swiggy-3" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="who-should-choose"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CheckCircle2 className="h-6 w-6 text-blue-600" /> Which Card Fits You?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">Choose HDFC Millennia If...</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Your spending is spread across many online merchants, not just food delivery.</li>
                <li>You want complimentary domestic lounge access.</li>
                <li>You can comfortably hit ₹1,00,000 spend in 12 months to waive the fee.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-800 text-lg">Choose Swiggy HDFC If...</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>You order frequently on Swiggy for food, groceries (Instamart) or dining.</li>
                <li>You want a lower joining and annual fee.</li>
                <li>You value the free Swiggy One trial as a joining perk.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Frequently Asked Questions
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
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Both cards come from HDFC Bank, so the choice comes down to your spending pattern rather than issuer
            trust. Heavy Swiggy users should lean toward the lower-fee Swiggy HDFC card for its 10% food-delivery
            rate; broader online spenders who also value lounge access will likely get more overall value from
            HDFC Millennia's wider partner-merchant net.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Match your top spend category
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Check the fee waiver spend
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Verify caps before applying
            </div>
          </div>
        </CardContent>
      </Card>

      <CardClusterNav />

      <div className="mb-8 border-t border-slate-200 pt-8 mt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes only and does not constitute
          financial advice or card recommendation advice. Product terms, eligibility, fees, rewards, and issuer
          policies can change over time. Always verify the latest schedule of charges and card terms on HDFC Bank's
          official page before applying.
        </p>
      </div>

      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Check Your Card Eligibility</h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Not sure which cashback card you qualify for? Use our free tool to check eligibility before applying.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/credit-card-eligibility-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Check Eligibility
            </Link>
            <Link
              href="/guides/credit-card-guide/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Read the Full Credit Card Guide
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print mt-8">
        <AdSlot id="guide-millennia-swiggy-4" type="leaderboard" />
      </div>
    </article>
  );
}
