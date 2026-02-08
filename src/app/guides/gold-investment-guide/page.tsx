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
  XCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  Smartphone,
  Gem,
  Award,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'SGB vs Digital vs Physical Gold: Best Way to Buy 2025',
  description:
    "SGB vs digital gold vs physical gold: Compare returns, taxes, costs. Learn why Sovereign Gold Bonds (2.5% interest, tax-free maturity) beat digital gold's 3% GST.",
  keywords: [
    'sovereign gold bond vs digital gold',
    'sgb interest rate 2025',
    'best way to buy gold in india',
    'is digital gold safe',
    'sgb tax benefits',
    'gold etf vs physical gold',
  ],
  openGraph: {
    title: 'Sovereign Gold Bond (SGB) vs Digital Gold vs Physical Gold',
    description:
      'Stop paying 3% GST on Digital Gold. Learn why SGB is the undisputed king of gold investments with 2.5% extra interest.',
    url: 'https://fincado.com/guides/gold-investment-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/gold/gold-investment-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Comparison of SGB certificate vs Digital Gold app vs Physical Coins',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the best way to buy gold in India?',
    answer:
      'For investment, Sovereign Gold Bonds (SGB) are the best due to 2.5% annual interest, tax-free maturity, and zero making charges. For consumption, physical jewelry is preferred.',
  },
  {
    question: 'Is digital gold a good investment?',
    answer:
      'No. Digital gold carries a 3% GST cost, 2-3% spread loss (difference between buy/sell price), and zero interest income. It is only good for very short-term holding.',
  },
  {
    question: 'What is the interest rate on SGB?',
    answer:
      'SGB pays a fixed interest rate of 2.5% per annum on the initial investment amount, credited semi-annually to your bank account.',
  },
];

export default function GoldInvestmentGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Gold Investment Guide',
            url: 'https://fincado.com/guides/gold-investment-guide/',
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
              'Sovereign Gold Bond (SGB) vs Digital Gold vs Physical Gold',
            description:
              'Comprehensive comparison of gold investment options in India. Why SGB beats Digital and Physical gold in returns, tax, and safety.',
            image:
              '/images/guides/gold/gold-investment-hero.webp',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
              },
            },
            datePublished: '2025-02-12',
            dateModified: '2025-02-12',
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
          className="mb-3 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1"
        >
          Smart Investing
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Sovereign Gold Bond (SGB) vs Digital Gold vs Physical Gold
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 12 Min Read
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
          <ShareTools title="SGB vs Digital Gold Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              Choosing the <strong>best way to buy gold</strong> can mean the difference between earning <strong>2.5% extra annual interest</strong> (SGB) and losing money to <strong>3% GST</strong> and hidden spreads (Digital Gold).
            </p>
            <p>
              While physical jewelry carries 10-25% making charges, <strong>Sovereign Gold Bonds (SGBs)</strong> offer government-backed safety and tax-free returns. This guide compares SGB, Digital Gold, and Physical Gold to help you maximize your wealth in 2025.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/gold/gold-investment-hero.webp"
              alt="SGB vs Digital Gold comparison infographic"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">
                1. SGB (Bonds)
              </strong>
              <span className="text-sm text-slate-600">
                Govt securities denominated in grams of gold.
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">
                2. Digital Gold
              </strong>
              <span className="text-sm text-slate-600">
                Online gold stored in vaults (e.g., Paytm, PhonePe).
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">
                3. Physical Gold
              </strong>
              <span className="text-sm text-slate-600">
                Jewelry, Coins, or Bars bought from jewelers.
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 flex gap-3">
            <Lightbulb className="h-6 w-6 text-yellow-600 shrink-0" />
            <div className="text-sm text-yellow-900">
              <strong>Quick Summary:</strong> Best for Returns = SGB. Best for
              Liquidity = Digital/Coins. Best for Usage = Jewelry.
            </div>
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
                href="#comparison"
                className="hover:text-yellow-700 hover:underline"
              >
                1. SGB vs Digital vs Physical (Comparison)
              </a>
            </li>
            <li>
              <a
                href="#sgb-advantage"
                className="hover:text-yellow-700 hover:underline"
              >
                2. The SGB Advantage (Why It Wins)
              </a>
            </li>
            <li>
              <a
                href="#digital-gold-trap"
                className="hover:text-yellow-700 hover:underline"
              >
                3. The Digital Gold Trap
              </a>
            </li>
            <li>
              <a
                href="#physical-gold"
                className="hover:text-yellow-700 hover:underline"
              >
                4. Physical Gold (Hidden Costs)
              </a>
            </li>
            <li>
              <a
                href="#taxation"
                className="hover:text-yellow-700 hover:underline"
              >
                5. Tax Treatment (2025 Rules)
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-yellow-700 hover:underline">
                6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gold-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: COMPARISON TABLE --- */}
      <section className="mb-12">
        <h2
          id="comparison"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-yellow-600" /> Comprehensive
          Comparison
        </h2>
        <p className="mb-6 text-slate-700">
          Let&apos;s compare them on returns, cost, and safety.
        </p>

        <Card className="border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900 w-1/4">
                    Feature
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/4">
                    SGB (Bond)
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/4">
                    Digital Gold
                  </TableHead>
                  <TableHead className="font-bold text-slate-900 w-1/4">
                    Physical Gold
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Interest
                  </TableCell>
                  <TableCell className="font-bold text-emerald-600">
                    2.5% p.a.
                  </TableCell>
                  <TableCell>0%</TableCell>
                  <TableCell>0%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Making Charges
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Zero
                  </TableCell>
                  <TableCell>Zero</TableCell>
                  <TableCell className="text-red-600">High (10-25%)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    GST Cost
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Zero
                  </TableCell>
                  <TableCell className="text-red-600">3%</TableCell>
                  <TableCell className="text-red-600">3%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Purity
                  </TableCell>
                  <TableCell>999 (24K)</TableCell>
                  <TableCell>995/999</TableCell>
                  <TableCell>Varies</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Storage
                  </TableCell>
                  <TableCell className="text-emerald-600">
                    Demat (Free)
                  </TableCell>
                  <TableCell>Vault (Small Fee)</TableCell>
                  <TableCell className="text-red-600">
                    Locker (Costly)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Capital Gains
                  </TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Tax-Free*
                  </TableCell>
                  <TableCell>Taxable</TableCell>
                  <TableCell>Taxable</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    Liquidity
                  </TableCell>
                  <TableCell>Medium (5-8 Yrs)</TableCell>
                  <TableCell className="text-emerald-600">High</TableCell>
                  <TableCell className="text-emerald-600">High</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="rounded-lg border-l-4 border-l-emerald-500 bg-emerald-50 p-4 text-sm text-emerald-900">
          <strong>Verdict:</strong> <strong>SGB</strong> is the clear winner for
          investors due to extra interest income and tax-free status.{' '}
          <strong>Digital Gold</strong> is costly due to GST and spreads.
        </div>
      </section>

      {/* --- SECTION 2: SGB ADVANTAGE --- */}
      <section className="mb-12">
        <h2
          id="sgb-advantage"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Award className="h-6 w-6 text-emerald-600" /> The SGB Advantage: Why
          It&apos;s Superior
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`SGBs are issued by the <strong>RBI</strong> on behalf of the Govt of India. They are the *only* gold instrument that pays you interest.`}
          />
        </div>

        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardHeader className="pb-2 border-b border-emerald-100">
            <CardTitle className="text-emerald-800 text-lg">
              Returns Calculation (10 Grams Investment)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-3 pt-4">
            <p className="text-xs text-slate-500 mb-4">
              Assuming Gold Price grows at 8% CAGR over 8 years.
            </p>
            <div className="flex justify-between border-b border-dashed border-emerald-200 pb-2">
              <span>💰 Investment</span>
              <span className="font-medium">₹65,000</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-emerald-200 pb-2">
              <span>📈 Gold Value (8 Yrs)</span>
              <span className="font-medium">~₹1,20,000</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-emerald-200 pb-2">
              <span>💵 Interest Earned (2.5%)</span>
              <span className="font-medium text-emerald-700">+₹13,000</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-emerald-200 pb-2">
              <span>🛡️ Tax Saved</span>
              <span className="font-medium text-emerald-700">
                ~₹7,000 (Tax-Free)
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-bold text-slate-900">Total Gain</span>
              <span className="font-bold text-emerald-700 text-lg">
                ₹68,000 (Doubled!)
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gold-2" type="leaderboard" />
      </div>

      {/* --- SECTION 3: DIGITAL GOLD TRAP --- */}
      <section className="mb-12">
        <h2
          id="digital-gold-trap"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Smartphone className="h-6 w-6 text-amber-500" /> The Digital Gold
          Trap: Hidden Costs
        </h2>
        <p className="mb-6 text-slate-700">
          Buying gold for ₹100 on an app sounds easy, but it&apos;s inefficient.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-red-100 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">
                1. The 3% GST Loss
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>
                When you buy ₹10,000 of digital gold, ₹300 goes to GST. You only
                get ₹9,700 worth of gold. You start with a{' '}
                <strong>-3% loss</strong> immediately.
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">
                2. The Spread (3-6%)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>
                Platforms have a difference between Buy and Sell price. If you
                buy at ₹6,000/gm, the selling price might be ₹5,800/gm
                instantly. That&apos;s another 3% loss.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg border-l-4 border-l-red-500 bg-red-50 p-4 text-sm text-red-900">
          <strong>Reality Check:</strong> Between GST and Spreads, you lose{' '}
          <strong>5-6%</strong> of your capital the moment you invest. Gold
          prices must rise 6% just for you to break even!
        </div>
      </section>

      {/* --- SECTION 4: PHYSICAL GOLD --- */}
      <section className="mb-12">
        <h2
          id="physical-gold"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Gem className="h-6 w-6 text-slate-600" /> Physical Gold: Consumption
          vs Investment
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <p className="mb-4 text-slate-700">
              <strong>Golden Rule:</strong> Buy Physical Gold (Jewelry) only for
              *consumption* (wearing/weddings), never for investment.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2 items-center">
                <XCircle className="h-4 w-4 text-red-600" />
                <span>
                  <strong>Making Charges:</strong> You pay 10-25% extra, lost
                  forever on resale.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <XCircle className="h-4 w-4 text-red-600" />
                <span>
                  <strong>Purity Issues:</strong> Even with Hallmarking, buyback
                  policies vary.
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <XCircle className="h-4 w-4 text-red-600" />
                <span>
                  <strong>Theft Risk:</strong> Requires expensive locker
                  storage.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gold-3" type="leaderboard" />
      </div>

      {/* --- SECTION 5: TAXATION --- */}
      <section className="mb-12">
        <h2
          id="taxation"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-indigo-600" /> Tax Treatment
          (2025 Rules)
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Instrument
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Interest Income
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Capital Gains (Maturity)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  SGB
                </TableCell>
                <TableCell>Taxed as Income</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Tax-Free (after 8 yrs)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Digital Gold
                </TableCell>
                <TableCell>No Interest</TableCell>
                <TableCell>Taxed (LTCG / Slab)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Physical Gold
                </TableCell>
                <TableCell>No Interest</TableCell>
                <TableCell>Taxed (LTCG / Slab)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- FAQs --- */}
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
              What is the lock-in period for SGB?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              SGB has a tenure of 8 years. However, you can exit after 5 years
              on interest payment dates. You can also sell SGBs anytime on the
              stock exchange (demat required).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I convert Digital Gold to Physical Gold?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes, most apps allow this, but you have to pay{' '}
              <strong>making charges + delivery fees</strong>, which makes it
              very expensive compared to buying coins directly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Don&apos;t lose money to GST and Making Charges. Invest smart.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> SGB for
              Wealth
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Jewelry for
              Wear
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 5-10%
              Allocation
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- AUTHOR & DISCLAIMER --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Gold prices are subject to market risks.
          SGB issuance depends on RBI notifications. This guide is for
          educational purposes. Please consult a financial advisor for
          personalized advice.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-yellow-600 to-amber-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Calculate your gold returns
          </h2>
          <p className="mb-8 max-w-lg text-yellow-100 text-lg">
            See how much more you earn with SGBs compared to physical gold.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-yellow-700 transition hover:bg-yellow-50 shadow-lg"
            >
              Compare with Mutual Funds
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-gold-4" type="leaderboard" />
      </div>
    </article>
  );
}
