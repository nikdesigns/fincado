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
  Plane,
  Percent,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lightbulb,
  Gem,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HDFC Regalia Gold vs Axis Magnus: Which Premium Card Wins? (2026)',
  description:
    'HDFC Regalia Gold vs Axis Magnus compared — annual fees, reward rates, lounge access and eligibility — to help you decide whether the ₹2,500 or ₹12,500 premium card fits your spend.',
  keywords: [
    'HDFC Regalia Gold vs Axis Magnus',
    'HDFC Regalia Gold review',
    'Axis Magnus review',
    'best premium credit card India',
    'Axis Magnus eligibility',
    'HDFC Regalia Gold lounge access',
    'premium credit card comparison India',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/hdfc-regalia-vs-axis-magnus/',
  },
  openGraph: {
    title: 'HDFC Regalia Gold vs Axis Magnus: Which Premium Card Wins? (2026)',
    description:
      'A ₹2,500 card against a ₹12,500 card — this is less about features and more about who should be paying more.',
    url: 'https://fincado.com/guides/hdfc-regalia-vs-axis-magnus/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Is Axis Magnus better than HDFC Regalia Gold?',
    answer:
      'Axis Magnus has a much higher reward rate and more extensive lounge access, but it also costs roughly 5x more in annual fees (₹12,500 + GST vs ₹2,500 + GST) and requires a far higher income (₹24 lakh p.a. indicative vs ₹1-1.5 lakh net monthly income for Regalia Gold). It is "better" only if your spending justifies the fee difference.',
  },
  {
    question: 'What income do I need for Axis Magnus?',
    answer:
      'Axis Magnus indicates a net salary or ITR income of ₹24 lakh per annum, based on card data on file. This is indicative and not a guarantee of approval — Axis Bank makes the final underwriting decision.',
  },
  {
    question: 'What income do I need for HDFC Regalia Gold?',
    answer:
      'HDFC Regalia Gold requires a salaried net monthly income of ₹1 lakh for government employees or ₹1.5 lakh for private-sector employees, or self-employed ITR income of ₹18 lakh per annum, with an age requirement of 21+ (up to 60 for salaried, 65 for self-employed).',
  },
  {
    question: 'Can the annual fee be waived on both cards?',
    answer:
      'Yes. HDFC Regalia Gold\'s fee is waived on ₹4 lakh annual spend, and a ₹2,500 welcome voucher offsets the first-year cost. Axis Magnus waives its much higher fee only on ₹25 lakh of preceding-year spend, reflecting its premium positioning.',
  },
  {
    question: 'Which card has better lounge access?',
    answer:
      'Both offer complimentary lounge access, with Axis Magnus offering more extensive complimentary lounge access according to card data on file, while HDFC Regalia Gold offers complimentary domestic and limited international lounge access via Priority Pass. If lounge access is your main priority and you travel very frequently, Magnus\'s broader access may justify its higher fee.',
  },
];

export default function HdfcRegaliaVsAxisMagnusPage() {
  const regaliaGold = getCardBySlug('hdfc-regalia-gold')!;
  const axisMagnus = getCardBySlug('axis-magnus')!;

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
              'HDFC Regalia Gold vs Axis Magnus: Which Premium Card Wins? (2026)',
            description:
              'A fact-checked comparison of HDFC Regalia Gold and Axis Magnus across fees, reward rates, lounge access and eligibility, framed around who should pay more for a premium card.',
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
              '@id': 'https://fincado.com/guides/hdfc-regalia-vs-axis-magnus/',
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
            name: 'HDFC Regalia Gold vs Axis Magnus',
            url: 'https://fincado.com/guides/hdfc-regalia-vs-axis-magnus/',
          },
        ]}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Premium Card vs Card
        </Badge>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          HDFC Regalia Gold vs Axis Magnus: Which Premium Card Wins? (2026)
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 11 Min Read
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
          <ShareTools title="HDFC Regalia Gold vs Axis Magnus" />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p><strong>HDFC Regalia Gold</strong> and <strong>Axis Bank Magnus</strong> are both premium, lounge-access cards, but they sit at very different price points — ₹2,500 + GST versus ₹12,500 + GST in annual fees. That is roughly a 5x gap, so this is not really a pure feature battle. The real question is: <strong>who should be paying more?</strong></p>
            <p>This guide lays out the verified facts on both cards — fees, reward rates, eligibility and lounge access — and frames the comparison around which spending level and income bracket justifies each card's cost.</p>`}
          />
        </CardContent>
      </Card>

      <CardVerifiedNote />

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="h-6 w-6 text-blue-600" /> Head-to-Head Comparison
        </h2>
        <CardCompareTable cards={[regaliaGold, axisMagnus]} />
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-regalia-magnus-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="cards"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Gem className="h-6 w-6 text-violet-600" /> Full Card Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <CardFactCard card={regaliaGold} />
          <CardFactCard card={axisMagnus} />
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="price-tier"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-rose-600" /> The Price Gap: ₹2,500 vs ₹12,500
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Cost Factor</TableHead>
                <TableHead className="font-bold text-slate-900">HDFC Regalia Gold</TableHead>
                <TableHead className="font-bold text-slate-900">Axis Magnus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">Joining / Annual Fee</TableCell>
                <TableCell>{regaliaGold.annualFee}</TableCell>
                <TableCell className="font-bold text-slate-900">{axisMagnus.annualFee}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">Fee Waiver Spend</TableCell>
                <TableCell>{regaliaGold.feeWaiver}</TableCell>
                <TableCell>{axisMagnus.feeWaiver}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">Indicative Income Requirement</TableCell>
                <TableCell>Salaried ₹1L/₹1.5L monthly (govt/private); self-employed ₹18L p.a. ITR</TableCell>
                <TableCell className="font-bold">₹24L p.a. net salary or ITR income (indicative)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-slate-600">
          The fee gap roughly tracks the income-eligibility gap — Magnus is built for a materially higher earning
          and spending bracket, not just a "better" version of Regalia Gold at a higher price.
        </p>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-regalia-magnus-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="rewards"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-emerald-600" /> Reward Rate: Where Magnus Pulls Ahead
        </h2>
        <WikiText
          content={`<p class="mb-4 text-slate-700"><strong>HDFC Regalia Gold</strong> earns 4 reward points per ₹150 spent generally, rising to 20 points per ₹150 at select merchants. On top of that, it offers a ₹1,500 voucher per quarter at ₹1.5 lakh spend, and a ₹5,000 flight voucher at ₹5 lakh annual spend.</p>
          <p class="mb-4 text-slate-700"><strong>Axis Magnus</strong> earns 12 EDGE Reward Points per ₹200 spent, up to ₹1.5 lakh of monthly spend — and then jumps to 35 EDGE points per ₹200 on incremental spend above that. In other words, the reward rate itself nearly triples for a high spender once they cross ₹1.5 lakh in a month.</p>`}
        />
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-sm text-emerald-900">
          <strong>Who this favors:</strong> Magnus's accelerator only pays off for genuinely high monthly spenders.
          If your monthly card spend rarely approaches ₹1.5 lakh, you will never reach the higher 35-points tier,
          and Regalia Gold's milestone vouchers may deliver comparable or better relative value for a fraction of
          the fee.
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="lounge"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Plane className="h-6 w-6 text-sky-600" /> Lounge Access
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">HDFC Regalia Gold</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Complimentary domestic and limited international lounge access via Priority Pass, alongside milestone
              flight vouchers for higher annual spend.
            </CardContent>
          </Card>
          <Card className="border-violet-200 bg-violet-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-violet-800 text-lg">Axis Magnus</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Extensive complimentary lounge access, positioned as one of its standout features alongside the
              accelerated reward rate — reflecting its higher fee and frequent-traveler target audience.
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-regalia-magnus-3" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="who-should-pay-more"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-teal-600" /> Who Should Pay More?
        </h2>
        <p className="mb-6 text-slate-700">
          Because these two cards sit nearly 5x apart in annual fee, the more useful framing is not "which card has
          better features" but "does my spend and income level justify paying the higher fee."
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">Regalia Gold Fits You If...</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Your net monthly income is closer to ₹1-1.5 lakh, not ₹2 lakh+.</li>
                <li>You travel occasionally, not on a near-weekly basis.</li>
                <li>Your annual spend is well under the ₹25 lakh Magnus fee-waiver threshold.</li>
                <li>You want lounge access and milestone vouchers without a five-figure annual fee.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-violet-200 bg-violet-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-violet-800 text-lg">Magnus Fits You If...</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>Your income is around the ₹24 lakh p.a. indicative bracket or higher.</li>
                <li>You routinely spend ₹1.5 lakh+ per month on card and want the accelerated reward tier.</li>
                <li>You travel frequently enough that extensive lounge access has real, repeated value to you.</li>
                <li>You can realistically approach the ₹25 lakh annual spend needed to waive the fee.</li>
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
            Axis Magnus is not a strictly "better" card than HDFC Regalia Gold — it is a card built for a materially
            higher spend and income bracket, priced accordingly. Most mid-to-high spenders who travel occasionally
            will get better real-world value from Regalia Gold's lower fee and easier waiver threshold. Only very
            high, consistent spenders who can realistically use Magnus's accelerated reward tier and extensive
            lounge access should consider paying the roughly 5x higher fee.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Match fee to your spend level
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Check income eligibility first
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Verify waiver spend realistically
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
          policies can change over time. Always verify the latest schedule of charges and card terms on the
          issuer's official page before applying.
        </p>
      </div>

      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Check Your Card Eligibility</h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Not sure whether you qualify for a premium card? Use our free tool to check eligibility before applying.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/credit-card-eligibility-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Check Eligibility
            </Link>
            <Link
              href="/guides/best-credit-cards-for-airport-lounge-access/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Best Lounge Access Cards
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print mt-8">
        <AdSlot id="guide-regalia-magnus-4" type="leaderboard" />
      </div>
    </article>
  );
}
