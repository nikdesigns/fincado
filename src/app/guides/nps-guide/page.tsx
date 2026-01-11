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
  PiggyBank,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Landmark,
  Wallet,
  Settings,
  PieChart,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'NPS 2025: 10-12% Returns, ₹50K Tax Bonus & 80-20 Rule',
  description:
    'NPS 2025 guide: 10-12% returns, ₹2L tax deduction (80CCD 1B ₹50K bonus), Tier 1 vs Tier 2, new 80-20 withdrawal rule, lifecycle funds & NPS vs PPF comparison.',
  keywords: [
    'nps tier 1 vs tier 2',
    'section 80ccd(1b) deduction',
    'nps withdrawal rules 2025',
    'nps interest rate history',
    'best pension scheme india',
    'nps vs ppf tax benefit',
  ],
  openGraph: {
    title: 'NPS Guide 2025: Returns, Tax Benefits (80CCD) & Withdrawal Rules',
    description:
      'Unlock ₹50,000 extra tax deduction. Learn how NPS builds a multi-crore retirement corpus with market-linked returns.',
    url: 'https://fincado.com/guides/nps-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/nps/nps-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Growth chart showing NPS outperforming traditional savings',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the additional tax benefit in NPS?',
    answer:
      'NPS offers an exclusive deduction of ₹50,000 under Section 80CCD(1B), over and above the ₹1.5 Lakh limit of Section 80C. This brings the total possible deduction to ₹2 Lakh.',
  },
  {
    question: 'Can I withdraw my entire NPS corpus at 60?',
    answer:
      'No. You can withdraw up to 60% of the corpus as a tax-free lump sum. The remaining 40% must be used to purchase an annuity plan for monthly pension.',
  },
  {
    question: 'Is NPS better than PPF?',
    answer:
      'NPS has higher return potential (10-12%) due to equity exposure compared to PPF (7.1%). However, PPF offers guaranteed returns and EEE tax status, while NPS pension is taxable.',
  },
];

export default function NPSGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'NPS Guide 2025',
            url: 'https://fincado.com/guides/nps-guide/',
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
              'NPS Guide 2025: Returns, Tax Benefits (80CCD) & Withdrawal Rules',
            description:
              'Comprehensive guide to the National Pension System (NPS): Tier 1 vs Tier 2 accounts, 80CCD(1B) tax benefits, asset allocation, and new withdrawal rules.',
            image: 'https://fincado.com/images/guides/nps/nps-guide-hero.webp',
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
            datePublished: '2025-02-20',
            dateModified: '2025-02-20',
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
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Retirement Planning
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          NPS Guide 2025: Returns, Tax Benefits (80CCD) & Withdrawal Rules
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 14 Min Read
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
          <ShareTools title="NPS Guide 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p>Understanding the <strong>National Pension System (NPS)</strong> is crucial for maximizing retirement savings. With <strong>returns averaging 10-12%</strong> and an exclusive <strong>₹50,000 tax deduction</strong> (Section 80CCD 1B), NPS is a powerful tool.</p>
            <p>However, nuances like <strong>Tier 1 vs Tier 2</strong>, mandatory annuity, and <strong>Lifecycle Funds</strong> can be confusing. This guide simplifies NPS rules, tax benefits, and withdrawal norms for 2025.</p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/nps/nps-guide-hero.webp"
              alt="Concept art of retirement planning with NPS"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS NPS --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-indigo-600" /> What is NPS
            (National Pension System)?
          </h2>
          <p className="mb-6 text-slate-700">
            <strong>NPS</strong> is a voluntary, market-linked retirement
            savings scheme regulated by the <strong>PFRDA</strong>. It is
            designed to provide a retirement corpus and a monthly pension.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-indigo-100 bg-indigo-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Returns
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Averages 10-12% p.a. (Market Linked Equity + Debt).
              </CardContent>
            </Card>
            <Card className="border-indigo-100 bg-indigo-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo-800 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Tax Benefit
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Additional ₹50,000 deduction over 80C limit.
              </CardContent>
            </Card>
            <Card className="border-indigo-100 bg-indigo-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo-800 flex items-center gap-2">
                  <Wallet className="h-4 w-4" /> Cost
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                One of the lowest cost pension products globally.
              </CardContent>
            </Card>
            <Card className="border-indigo-100 bg-indigo-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo-800 flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Flexibility
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Choose your own asset allocation (Equity/Debt).
              </CardContent>
            </Card>
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
                href="#tier1-vs-tier2"
                className="hover:text-indigo-600 hover:underline"
              >
                1. Tier 1 vs Tier 2 Accounts
              </a>
            </li>
            <li>
              <a
                href="#investment-choices"
                className="hover:text-indigo-600 hover:underline"
              >
                2. Investment Choices (Auto vs Active)
              </a>
            </li>
            <li>
              <a
                href="#tax-benefits"
                className="hover:text-indigo-600 hover:underline"
              >
                3. The ₹50,000 Tax Bonus
              </a>
            </li>
            <li>
              <a
                href="#withdrawal-rules"
                className="hover:text-indigo-600 hover:underline"
              >
                4. Withdrawal & Exit Rules
              </a>
            </li>
            <li>
              <a
                href="#nps-vs-alternatives"
                className="hover:text-indigo-600 hover:underline"
              >
                5. NPS vs PPF vs EPF
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
        <AdSlot id="guide-nps-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: TIER 1 VS TIER 2 --- */}
      <section className="mb-12">
        <h2
          id="tier1-vs-tier2"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Landmark className="h-6 w-6 text-emerald-600" /> Tier 1 vs Tier 2:
          The Difference
        </h2>
        <p className="mb-6 text-slate-700">
          NPS offers two types of accounts. Tier 1 is mandatory for pension;
          Tier 2 is optional.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Tier 1 (Pension)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Tier 2 (Investment)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Status
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Mandatory
                </TableCell>
                <TableCell>Optional</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Lock-In
                </TableCell>
                <TableCell>Until Age 60</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  No Lock-In (Liquid)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax Benefit
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  ✅ Yes (80C + 80CCD 1B)
                </TableCell>
                <TableCell className="text-red-600">❌ No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Withdrawal
                </TableCell>
                <TableCell>Restricted</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Anytime
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg border-l-4 border-l-indigo-500 bg-indigo-50 p-4 text-sm text-indigo-900">
          <strong>Verdict:</strong> Open <strong>Tier 1</strong> for retirement
          and tax saving. Use <strong>Tier 2</strong> only if you want a
          low-cost mutual fund alternative with liquidity.
        </div>
      </section>

      {/* --- SECTION 3: INVESTMENT CHOICES --- */}
      <section className="mb-12">
        <h2
          id="investment-choices"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-amber-500" /> Investment Choices
        </h2>
        <Card className="border-slate-200 mb-6">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900">
              Asset Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>E (Equity):</strong> Stocks (High Risk, High Return).
                Max 75%.
              </li>
              <li>
                <strong>C (Corporate Bonds):</strong> Fixed Income (Moderate
                Risk).
              </li>
              <li>
                <strong>G (Govt Securities):</strong> G-Secs (Low Risk).
              </li>
              <li>
                <strong>A (Alternative):</strong> REITs/InvITs (Max 5%).
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                Active Choice
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>You decide the percentage allocation yourself.</p>
              <p className="mt-2 text-xs text-slate-500">
                E.g., 50% Equity, 30% Corporate Bonds, 20% G-Secs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Auto Choice (Lifecycle)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>System automatically reduces equity as you age.</p>
              <ul className="list-disc pl-4 mt-2 text-xs text-slate-500">
                <li>LC75 (Aggressive)</li>
                <li>LC50 (Moderate)</li>
                <li>LC25 (Conservative)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-nps-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2
          id="tax-benefits"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits: The
          ₹50,000 Bonus
        </h2>
        <p className="mb-6 text-slate-700">
          NPS is the only scheme that offers tax deductions{' '}
          <strong>above the ₹1.5 Lakh limit</strong> of Section 80C.
        </p>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader className="pb-2 border-b border-emerald-100">
            <CardTitle className="text-emerald-900 text-lg">
              Total Tax Deduction: Up to ₹2 Lakh
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-emerald-800 space-y-3">
            <div className="flex justify-between border-b border-emerald-200 pb-2">
              <span>Section 80CCD(1)</span>
              <span className="font-bold">₹1.5 Lakh (Part of 80C)</span>
            </div>
            <div className="flex justify-between border-b border-emerald-200 pb-2">
              <span>Section 80CCD(1B)</span>
              <span className="font-bold text-emerald-700">
                + ₹50,000 (Exclusive Bonus)
              </span>
            </div>
            <p className="text-xs pt-2">
              <strong>Corporate Employees:</strong> Employer contribution (up to
              10% of Basic+DA) is tax-free <em>over and above</em> the ₹2 Lakh
              limit under Sec 80CCD(2).
            </p>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 5: WITHDRAWAL --- */}
      <section className="mb-12">
        <h2
          id="withdrawal-rules"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Withdrawal Rules
          (Maturity)
        </h2>
        <p className="mb-6 text-slate-700">
          At age 60, your corpus is divided into two parts:
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                60% Lump Sum
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>You can withdraw 60% of corpus.</p>
              <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded inline-block">
                Tax-Free ✅
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-100 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800 text-lg">
                40% Annuity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>Must buy annuity for monthly pension.</p>
              <div className="mt-2 text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded inline-block">
                Pension is Taxable ⚠️
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200">
          <CardHeader className="pb-2 bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-base text-slate-900">
              Premature Exit (Before 60)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700">
            <ul className="list-disc pl-4 space-y-1">
              <li>Allowed only after 10 years.</li>
              <li>Must use 80% of corpus for annuity.</li>
              <li>Only 20% withdrawable as lump sum.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-nps-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: COMPARISON --- */}
      <section className="mb-12">
        <h2
          id="nps-vs-alternatives"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          NPS vs PPF vs EPF
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">NPS</TableHead>
                <TableHead className="font-bold text-slate-900">PPF</TableHead>
                <TableHead className="font-bold text-slate-900">EPF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Returns
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  10-12% (Market)
                </TableCell>
                <TableCell>7.1% (Fixed)</TableCell>
                <TableCell>8.25% (Fixed)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Lock-In
                </TableCell>
                <TableCell>Age 60</TableCell>
                <TableCell>15 Years</TableCell>
                <TableCell>Retirement</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Tax Benefit
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  ₹2 Lakh
                </TableCell>
                <TableCell>₹1.5 Lakh</TableCell>
                <TableCell>₹1.5 Lakh</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Maturity Tax
                </TableCell>
                <TableCell>60% Tax-Free</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  100% Tax-Free
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  100% Tax-Free
                </TableCell>
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
              Can I switch between fund managers?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes. You can change your Pension Fund Manager (e.g., from SBI to
              HDFC) once in a financial year. You can also change your
              investment choice (Active/Auto) twice a year.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              What happens to NPS corpus upon death?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              In case of the subscriber&apos;s death, the entire corpus (100%)
              is paid to the nominee/legal heir. The annuity purchase is not
              mandatory for the nominee.
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
            NPS is the best tool for retirement if you want equity exposure with
            tax benefits.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Open Tier 1
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Invest ₹50k
              Bonus
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Choose Auto
              Choice
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> NPS returns are market-linked and not
          guaranteed. Tax laws are subject to change. This guide is for
          educational purposes. Please consult a financial advisor before
          investing.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-indigo-600 to-purple-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Plan your retirement
          </h2>
          <p className="mb-8 max-w-lg text-indigo-100 text-lg">
            Calculate your NPS corpus and monthly pension.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/retirement-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-indigo-700 transition hover:bg-indigo-50 shadow-lg"
            >
              Retirement Planner
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-nps-4" type="leaderboard" />
      </div>
    </article>
  );
}
