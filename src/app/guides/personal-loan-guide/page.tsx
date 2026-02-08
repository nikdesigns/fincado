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
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Percent,
  ShieldCheck,
  Scale,
  Ban,
  Lightbulb,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Personal Loan Guide 2025: Rates, CIBIL & Hidden Charges',
  description:
    'Personal loan guide 2025: Interest rates 9.99-24%, CIBIL score 750+ for best terms, flat vs reducing rate trap, hidden charges & smarter alternatives explained.',
  keywords: [
    'personal loan interest rates 2025',
    'cibil score for personal loan',
    'flat interest rate vs reducing balance',
    'personal loan hidden charges',
    'personal loan eligibility calculator',
    'gold loan vs personal loan',
  ],
  openGraph: {
    title:
      'Personal Loan Guide 2025: Interest Rates, CIBIL Score & Hidden Charges',
    description:
      'Don\'t fall for the "Flat Rate" trap. Learn how to save lakhs on interest and spot hidden charges before you sign.',
    url: 'https://fincado.com/guides/personal-loan-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/personal-loan/personal-loan-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Person checking loan application on mobile',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'Can I get a personal loan with a low CIBIL score?',
    answer:
      'It is difficult. Most banks require 750+. Some NBFCs may lend to 650-700 scores but at very high interest rates (18-24%).',
  },
  {
    question: 'Is personal loan interest tax deductible?',
    answer:
      'Generally No for salaried individuals. However, if used for business purposes or home renovation/purchase, tax benefits may be claimed under specific sections.',
  },
  {
    question: 'What is the difference between flat and reducing interest rate?',
    answer:
      'Flat rate calculates interest on the full principal for the entire tenure. Reducing rate calculates interest only on the outstanding balance. A 10% Flat Rate is roughly equal to an 18% Reducing Rate.',
  },
];

export default function PersonalLoanGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Personal Loan Guide',
            url: 'https://fincado.com/guides/personal-loan-guide/',
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
              'Personal Loan Guide 2025: Interest Rates, CIBIL Score & Hidden Charges',
            description:
              'Comprehensive guide on Personal Loans in India: Eligibility, Documents, Flat vs Reducing Rate math, and Hidden Charges.',
            image:
              '/images/guides/personal-loan/personal-loan-guide-hero.webp',
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
            datePublished: '2025-02-15',
            dateModified: '2025-02-15',
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
          Unsecured Loans
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Personal Loan Guide 2025: Rates, CIBIL & Hidden Charges
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
          <ShareTools title="Personal Loan Guide 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              Understanding <strong>personal loan interest rates</strong>, <strong>CIBIL score requirements</strong>, and hidden charges like processing fees can save you thousands of rupees. With rates ranging from <strong>9.99% to 24%</strong>, getting the best deal requires knowledge.
            </p>
            <p>
              This guide exposes the "Flat Rate" trap (where 10% is actually 18%), lists essential documents, and compares smarter alternatives like Gold Loans or Top-Ups.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/personal-loan/personal-loan-guide-hero.webp"
              alt="Happy couple approved for a personal loan"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS A PERSONAL LOAN --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Wallet className="h-6 w-6 text-blue-600" /> What is a Personal
            Loan?
          </h2>
          <WikiText
            content={`<p class="mb-6 text-slate-700">A <strong>Personal Loan</strong> is an *unsecured loan* provided by banks and NBFCs without requiring any collateral (like gold or property). It can be used for any purpose—medical emergency, wedding, travel, or debt consolidation.</p>`}
          />

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5">
            <h3 className="mb-3 font-semibold text-slate-900 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-blue-500" /> Key Features:
            </h3>
            <ul className="space-y-3 text-slate-700 text-sm">
              <li className="flex gap-2">
                <span className="font-bold text-blue-700">No Collateral:</span>{' '}
                Your assets are safe.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-700">Flexible Use:</span>{' '}
                No restriction on end-use.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-700">
                  Quick Disbursal:
                </span>{' '}
                24-48 hours (or instant).
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-700">Fixed Tenure:</span>{' '}
                12 to 60 months typically.
              </li>
            </ul>
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
                href="#eligibility"
                className="hover:text-blue-600 hover:underline"
              >
                1. Eligibility & Documents
              </a>
            </li>
            <li>
              <a
                href="#interest-rates"
                className="hover:text-blue-600 hover:underline"
              >
                2. Interest Rates & Hidden Charges
              </a>
            </li>
            <li>
              <a
                href="#flat-rate-trap"
                className="hover:text-blue-600 hover:underline"
              >
                3. The &quot;Flat Rate&quot; Trap
              </a>
            </li>
            <li>
              <a
                href="#alternatives"
                className="hover:text-blue-600 hover:underline"
              >
                4. Personal Loan vs Alternatives
              </a>
            </li>
            <li>
              <a
                href="#cibil-impact"
                className="hover:text-blue-600 hover:underline"
              >
                5. Impact on Credit Score
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-blue-600 hover:underline">
                6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: ELIGIBILITY --- */}
      <section className="mb-12">
        <h2
          id="eligibility"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CheckCircle2 className="h-6 w-6 text-emerald-600" /> Eligibility &
          Documents
        </h2>
        <p className="mb-6 text-slate-700">
          Banks primarily look at your repayment capacity and credit history.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                For Salaried Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li>
                  👤 <strong>Age:</strong> 21 - 60 Years.
                </li>
                <li>
                  💰 <strong>Income:</strong> Min ₹15k - ₹25k/month.
                </li>
                <li>
                  🏢 <strong>Experience:</strong> Min 1-2 years total.
                </li>
                <li>
                  📈 <strong>CIBIL Score:</strong> 750+ for best rates.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                Documents Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <strong>KYC:</strong> PAN, Aadhaar, Photo.
                </li>
                <li>
                  <strong>Income:</strong> Last 3 months Salary Slips.
                </li>
                <li>
                  <strong>Bank:</strong> Last 6 months Bank Statement.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 3: RATES & CHARGES --- */}
      <section className="mb-12">
        <h2
          id="interest-rates"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-indigo-600" /> Interest Rates &
          Hidden Charges
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-8 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  CIBIL Score
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Interest Rate (Approx)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Approval Chance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold text-emerald-600">
                  750 - 900
                </TableCell>
                <TableCell>10.50% - 13%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  High
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-amber-600">
                  700 - 749
                </TableCell>
                <TableCell>13% - 16%</TableCell>
                <TableCell className="text-amber-600 font-medium">
                  Medium
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-red-600">
                  Below 700
                </TableCell>
                <TableCell>16% - 24%+</TableCell>
                <TableCell className="text-red-600 font-medium">
                  Low / NBFCs Only
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Card className="border-amber-100 bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Hidden Charges
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <ul className="space-y-2 list-disc pl-4">
              <li>
                <strong>Processing Fee:</strong> 0.5% - 3% of loan amount + GST.
              </li>
              <li>
                <strong>Foreclosure Charges:</strong> 2% - 5% penalty if closed
                early.
              </li>
              <li>
                <strong>Pre-payment Charges:</strong> Penalty for part-payments.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: FLAT RATE TRAP --- */}
      <section className="mb-12">
        <h2
          id="flat-rate-trap"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Ban className="h-6 w-6 text-red-600" /> The &quot;Flat Rate&quot;
          Trap
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`Some lenders advertise a "Flat Interest Rate" (e.g., 10%) which sounds cheaper than a bank's "Reducing Rate" (e.g., 12%). <strong>This is a marketing trick.</strong>`}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">The Trap</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 font-medium">
                Dealer says: &quot;10% Flat Rate&quot;
              </p>
              <p>
                On a ₹1 Lakh loan, you pay interest on the full ₹1 Lakh every
                month, even as principal reduces.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                The Reality
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-2 font-medium">
                Effective Cost: ~18% Reducing Rate
              </p>
              <p>
                A 10% Flat Rate is actually equal to an{' '}
                <strong>~18% Reducing Balance Rate</strong>. You pay double!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-4 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Type</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Quoted Rate
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Effective Cost (APR)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Total Interest
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Flat Rate
                </TableCell>
                <TableCell>10%</TableCell>
                <TableCell className="text-red-600 font-bold">~17.9%</TableCell>
                <TableCell>₹10,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Reducing Rate
                </TableCell>
                <TableCell>12%</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  12.0%
                </TableCell>
                <TableCell>₹6,619</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 5: ALTERNATIVES --- */}
      <section className="mb-12">
        <h2
          id="alternatives"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Scale className="h-6 w-6 text-purple-600" /> Comparison with
          Alternatives
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Loan Type
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Interest Rate
                </TableHead>
                <TableHead className="font-bold text-slate-900">Pros</TableHead>
                <TableHead className="font-bold text-slate-900">Cons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Personal Loan
                </TableCell>
                <TableCell>10.5% - 24%</TableCell>
                <TableCell>No Collateral</TableCell>
                <TableCell className="text-red-600">High Rates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Gold Loan
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  7.5% - 12%
                </TableCell>
                <TableCell>Lower Rate, Fast</TableCell>
                <TableCell>Need Gold</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Home Top-Up
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  8.5% - 9.5%
                </TableCell>
                <TableCell>Cheapest Option</TableCell>
                <TableCell>Need Home Loan</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Credit Card Loan
                </TableCell>
                <TableCell className="text-red-600 font-bold">
                  15% - 40%
                </TableCell>
                <TableCell>Instant</TableCell>
                <TableCell>Very Expensive</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-pl-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: IMPACT & TIPS --- */}
      <section className="mb-12">
        <h2
          id="cibil-impact"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-blue-600" /> Impact & Smart Tips
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg">
                Credit Score Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <strong>Application:</strong> Triggers &quot;Hard
                  Inquiry&quot;. Don&apos;t apply to 10 banks at once.
                </li>
                <li>
                  <strong>Repayment:</strong> Timely payments boost score.
                </li>
                <li>
                  <strong>Default:</strong> Missing one EMI drops score by 50+
                  points.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                Smart Borrowing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <strong>Debt Consolidation:</strong> Use low-rate PL to pay
                  off Credit Cards.
                </li>
                <li>
                  <strong>Avoid Luxury:</strong> Don&apos;t borrow for
                  vacations.
                </li>
                <li>
                  <strong>Check Pre-Payment:</strong> Ensure no heavy penalties.
                </li>
              </ul>
            </CardContent>
          </Card>
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
              What happens if I miss an EMI?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              You will be charged a late fee and penal interest. More
              importantly, your CIBIL score will drop sharply, making future
              loans difficult.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              How fast is the disbursement?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Pre-approved loans can be disbursed in <strong>10 seconds</strong>
              . Regular loans typically take <strong>24 to 48 hours</strong>{' '}
              after document submission.
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
            A Personal Loan is a great tool for emergencies, but a bad habit for
            lifestyle expenses.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Maintain
              CIBIL 750+
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Ask Reducing
              Rate
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Compare Fees
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Interest rates and terms are subject to
          change by lenders. This guide is for educational purposes. Please
          check the loan agreement carefully before signing.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Need a loan?</h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Check your eligibility and calculate your EMI first.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/loans/personal-loan/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Personal Loan EMI
            </Link>
            <Link
              href="/simple-interest-calculator/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Check Flat Rate
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-pl-4" type="leaderboard" />
      </div>
    </article>
  );
}
