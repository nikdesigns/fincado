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
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  CreditCard,
  Lock,
  FileWarning,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Increase CIBIL Score 650 to 750: Step-by-Step Guide',
  description:
    'How to improve CIBIL score fast: Convert settled to closed status, raise disputes, credit utilization hack, secured cards & step-by-step repair guide 2025.',
  keywords: [
    'improve cibil score 650 to 750',
    'remove settled status from cibil',
    'raise cibil dispute online',
    'credit utilization ratio hack',
    'secured credit card for cibil score',
    'cibil score repair india',
  ],
  openGraph: {
    title: 'How to Increase CIBIL Score from 650 to 750 (Step-by-Step)',
    description:
      'A low CIBIL score can cost you lakhs. Learn how to remove "Settled" status, fix errors, and boost your score fast.',
    url: 'https://fincado.com/guides/credit-score-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/credit-score/credit-score-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Graph showing CIBIL score rising from 650 to 750',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'How can I improve my CIBIL score from 650 to 750 fast?',
    answer:
      'Pay all EMIs on time, reduce credit utilization below 30%, raise disputes for errors, and convert "Settled" accounts to "Closed" status. With discipline, you can see results in 6-12 months.',
  },
  {
    question:
      'What is the difference between "Settled" and "Closed" loan status?',
    answer:
      '"Settled" means you paid less than the full amount, which hurts your score for 7 years. "Closed" means full repayment, which boosts your score. You can convert Settled to Closed by paying the difference.',
  },
  {
    question: 'What is the 30% credit utilization rule?',
    answer:
      'Keep your credit card usage below 30% of your limit. Pro tip: Pay your bill before the statement generation date so a low balance is reported to CIBIL.',
  },
];

export default function CreditScoreGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline:
              'How to Increase CIBIL Score from 650 to 750 (Step-by-Step)',
            description:
              'Complete guide to repairing credit score in India: Fixing "Settled" loans, disputing errors, and using secured cards.',
            image:
              '/images/guides/credit-score/credit-score-guide-hero.webp',
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
            datePublished: '2025-01-30',
            dateModified: '2025-01-30',
          }),
        }}
      />

      {/* --- BREADCRUMB --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Credit Score Repair',
            url: 'https://fincado.com/guides/credit-score-guide/',
          },
        ]}
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
          className="mb-3 bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1"
        >
          Credit Repair
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          How to Increase CIBIL Score from 650 to 750 (Step-by-Step)
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 15 Min Read
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
          <ShareTools title="How to Increase CIBIL Score from 650 to 750" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-slate-100">
          <Image
            src="/images/guides/credit-score/credit-score-guide-hero.webp"
            alt="Concept art of credit score meter rising"
            fill
            priority
            className="object-cover"
          />
        </div>
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
          A <strong>CIBIL score below 650</strong> can block your loan applications, result in higher interest rates, or lead to outright rejections. But the good news is that improving your score to <strong>750+</strong> is absolutely achievable with the right strategy.

          Whether you need to fix a <strong>"Settled" loan status</strong>, raise a <strong>CIBIL dispute</strong>, or use the <strong>credit utilization hack</strong>, this guide covers everything you need to rebuild your creditworthiness in 2025.
        `}
          />
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS CIBIL SCORE --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-emerald-600" /> What is a CIBIL
            Score?
          </h2>
          <p className="mb-6 text-slate-700 leading-relaxed">
            A <strong>CIBIL score</strong> is a 3-digit number (300-900)
            summarizing your credit history. A score of <strong>750+</strong> is
            considered excellent and unlocks lower interest rates on loans.
          </p>
          Here is the code to replace that placeholder. I have wrapped the image
          in a styled container with a caption area to keep it looking
          professional. Option 1: Standard Image Component (If you have the
          file) Use this if you have generated the image (using the prompts I
          gave you) and saved it to your public folder. TypeScript
          <div className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-video w-full bg-slate-50">
              <Image
                src="/images/guides/credit-score/cibil-score-ranges.webp" // ⚠️ Make sure to save your image here
                alt="CIBIL Score Ranges Chart: 300-650 (Poor), 650-700 (Average), 700-750 (Good), 750-900 (Excellent)"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
            <div className="border-t border-slate-100 bg-slate-50/50 p-3 text-center text-xs font-medium text-slate-500">
              Figure: Official CIBIL Score Impact on Loan Eligibility
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-900">
                    Score Range
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Impact
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">750 - 900</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Excellent
                  </TableCell>
                  <TableCell>Lowest Rates, Instant Approval</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">700 - 749</TableCell>
                  <TableCell className="text-blue-600 font-medium">
                    Good
                  </TableCell>
                  <TableCell>Strong Approval Chances</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">650 - 699</TableCell>
                  <TableCell className="text-amber-500 font-medium">
                    Fair
                  </TableCell>
                  <TableCell>Higher Rates, Stricter Terms</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Below 650</TableCell>
                  <TableCell className="text-red-600 font-medium">
                    Poor
                  </TableCell>
                  <TableCell>High Rejection Risk</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
                href="#settled-vs-closed"
                className="hover:text-blue-600 hover:underline"
              >
                1. The &quot;Settled&quot; Status Trap
              </a>
            </li>
            <li>
              <a
                href="#dispute-guide"
                className="hover:text-blue-600 hover:underline"
              >
                2. Raising a CIBIL Dispute
              </a>
            </li>
            <li>
              <a
                href="#utilization-hack"
                className="hover:text-blue-600 hover:underline"
              >
                3. The 30% Utilization Hack
              </a>
            </li>
            <li>
              <a
                href="#secured-cards"
                className="hover:text-blue-600 hover:underline"
              >
                4. Secured Cards for Repair
              </a>
            </li>
            <li>
              <a
                href="#action-plan"
                className="hover:text-blue-600 hover:underline"
              >
                5. 12-Month Action Plan
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
        <AdSlot id="guide-cibil-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: SETTLED VS CLOSED --- */}
      <section className="mb-12">
        <h2
          id="settled-vs-closed"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldAlert className="h-6 w-6 text-red-500" /> The
          &quot;Settled&quot; vs &quot;Closed&quot; Status Trap
        </h2>
        <p className="mb-6 text-slate-700">
          One of the most damaging mistakes is accepting a &quot;One-Time
          Settlement&quot; (OTS) from a bank. It might save you money now, but
          it costs you your credit reputation for years.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Scenario Card */}
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-700 text-lg flex items-center gap-2">
                <XCircle className="h-5 w-5" /> The Scenario (Settled)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>
                <strong>Situation:</strong> You owe ₹2 Lakhs but can&apos;t pay.
                Bank offers to close loan for ₹1.5 Lakhs.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Bank Marks:</strong> &quot;Settled&quot;
                </li>
                <li>
                  <strong>Impact:</strong> Score drops by 75-100 points.
                </li>
                <li>
                  <strong>Duration:</strong> Stays on report for 7 years.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Fix Card */}
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-700 text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> The Fix (Closed)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>
                <strong>Action:</strong> Contact the bank, pay the remaining
                difference (e.g., ₹50,000).
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <strong>Request:</strong> Ask for a &quot;No Objection
                  Certificate&quot; (NOC).
                </li>
                <li>
                  <strong>Update:</strong> Ensure they change status to
                  &quot;Closed&quot;.
                </li>
                <li>
                  <strong>Result:</strong> Score bounces back within 30-45 days.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 3: DISPUTE GUIDE --- */}
      <section className="mb-12">
        <h2
          id="dispute-guide"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <FileWarning className="h-6 w-6 text-amber-500" /> Raising a CIBIL
          Dispute: Step-by-Step
        </h2>
        <p className="mb-6 text-slate-700">
          If you find errors (wrong name, closed loan showing active, identity
          theft), you must dispute it immediately directly on the CIBIL website.
        </p>

        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <ol className="list-decimal pl-5 space-y-4 text-slate-700 marker:font-bold marker:text-slate-900">
              <li>
                <strong>Login:</strong> Go to cibil.com and access your free
                credit report.
              </li>
              <li>
                <strong>Identify:</strong> Locate the specific account or
                personal detail that is incorrect.
              </li>
              <li>
                <strong>Dispute:</strong> Click on the &quot;Raise a
                Dispute&quot; button in the Dispute Center section.
              </li>
              <li>
                <strong>Evidence:</strong> Upload supporting proofs like NOC,
                payment receipts, or closure letters.
              </li>
              <li>
                <strong>Resolution:</strong> CIBIL contacts the lender for
                verification. Correction typically takes up to{' '}
                <strong>30 days</strong>.
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-cibil-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: UTILIZATION HACK --- */}
      <section className="mb-12">
        <h2
          id="utilization-hack"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CreditCard className="h-6 w-6 text-blue-600" /> Credit Utilization
          Hack: The &quot;30% Rule&quot;
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`Your <strong>Credit Utilization Ratio</strong> (Credit Used / Total Limit) accounts for 30% of your score. Ideally, keep it below <strong>30%</strong>.`}
          />
        </div>

        <Card className="border-l-4 border-l-purple-500 bg-purple-50/30 shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-purple-900 mb-2">
              The Secret Hack: Pay BEFORE Statement Date
            </h3>
            <p className="text-slate-700 mb-4">
              Banks report your balance to CIBIL on the{' '}
              <strong>Statement Generation Date</strong>, not the Payment Due
              Date.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white p-4 rounded border border-purple-100">
                <strong className="block text-red-600 mb-1">
                  Standard Way
                </strong>
                <p className="text-sm text-slate-600">
                  You spend ₹90k (Limit ₹1L). Statement generates showing ₹90k
                  due. CIBIL sees <strong>90% utilization</strong> (Bad).
                </p>
              </div>
              <div className="flex-1 bg-white p-4 rounded border border-purple-100">
                <strong className="block text-emerald-600 mb-1">
                  The Hack
                </strong>
                <p className="text-sm text-slate-600">
                  Pay ₹85k 2 days *before* statement date. Statement generates
                  showing ₹5k due. CIBIL sees <strong>5% utilization</strong>{' '}
                  (Excellent).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 5: SECURED CARDS --- */}
      <section className="mb-12">
        <h2
          id="secured-cards"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lock className="h-6 w-6 text-slate-700" /> Secured Credit Cards:
          Rebuilding from Scratch
        </h2>
        <p className="mb-6 text-slate-700">
          If your score is too low (&lt;650), no bank will give you a regular
          loan. The solution is a <strong>Secured Credit Card</strong> backed by
          a Fixed Deposit (FD).
        </p>

        <div className="overflow-x-auto rounded-lg border border-slate-200 mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-bold text-slate-900">
                  Bank / Card
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Min FD Amount
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Features
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">IDFC WOW</TableCell>
                <TableCell>₹2,000</TableCell>
                <TableCell>No Income Proof, Lifetime Free</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">OneCard (Metal)</TableCell>
                <TableCell>₹5,000</TableCell>
                <TableCell>Mobile-first app, Metal Card</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Kotak 811</TableCell>
                <TableCell>₹10,000</TableCell>
                <TableCell>Low Barrier Entry for existing customers</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg bg-slate-100 p-4 text-sm text-slate-700">
          <strong>How it works:</strong> Use the card for small payments
          (groceries, bills) and pay back 100% on time. After 6-12 months, your
          score will improve enough to apply for a regular unsecured card.
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-cibil-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: ACTION PLAN --- */}
      <section className="mb-12">
        <h2
          id="action-plan"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          12-Month Step-by-Step Action Plan
        </h2>

        <div className="space-y-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4 pb-4 flex gap-4">
              <div className="font-bold text-blue-600 text-lg min-w-12">
                Month 1
              </div>
              <div className="text-slate-700">
                Download your full CIBIL report. Identify all
                &quot;Settled&quot; accounts, errors, and late payments.
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4 pb-4 flex gap-4">
              <div className="font-bold text-blue-600 text-lg min-w-12">
                Month 2
              </div>
              <div className="text-slate-700">
                Raise disputes for errors. Contact banks to convert
                &quot;Settled&quot; to &quot;Closed&quot;. Start an FD-backed
                card if you have no active credit lines.
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4 pb-4 flex gap-4">
              <div className="font-bold text-blue-600 text-lg min-w-12">
                Month 3-6
              </div>
              <div className="text-slate-700">
                <strong>Do NOT apply for new loans.</strong> Keep utilization
                strictly below 30% using the &quot;pay before statement&quot;
                hack.
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-4 pb-4 flex gap-4">
              <div className="font-bold text-emerald-600 text-lg min-w-12">
                Month 6+
              </div>
              <div className="text-slate-700">
                Check your score again. You should see a 50-100 point jump.
                Continue discipline to cross the 750 mark.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- FINANCIAL IMPACT --- */}
      <section className="mb-12">
        <h2
          id="financial-impact"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Financial Impact: Why 750+ Matters
        </h2>
        <p className="mb-4 text-slate-700">
          Why bother repairing your score? Because a good score saves you lakhs
          on big loans.
        </p>

        <Card className="border-slate-200">
          <CardHeader className="pb-2 bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-base text-slate-800">
              Home Loan Example (₹50 Lakh, 20 Years)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CIBIL Score</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Total Interest Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">650 (Fair)</TableCell>
                  <TableCell>10.0%</TableCell>
                  <TableCell>₹65.8 Lakhs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">750 (Excellent)</TableCell>
                  <TableCell>8.5%</TableCell>
                  <TableCell>₹54.1 Lakhs</TableCell>
                </TableRow>
                <TableRow className="bg-emerald-50">
                  <TableCell className="font-bold text-emerald-900">
                    Savings
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="font-bold text-emerald-700">
                    ₹11.7 Lakhs Saved!
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
              Can I remove &quot;Settled&quot; status from CIBIL?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes. You must contact the lender, pay the outstanding difference
              (principal + interest waived earlier), and obtain an NOC. Once
              paid, the lender will update the status to &quot;Closed&quot;.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Does checking my own CIBIL score reduce it?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              No. Checking your own score is a &quot;Soft Inquiry&quot; and has
              zero impact. Only when banks check it (Hard Inquiry) for a loan
              application, it might dip slightly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION CARD --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Improving your CIBIL score is a journey of discipline, not a quick
            fix. Be wary of agencies promising overnight miracles.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Close
              Settled Loans
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> &lt;30%
              Utilization
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Be Patient
              (6-12 Months)
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
      </div>

      <p className="mb-8 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
        Disclaimer: This guide is for educational purposes. We do not provide
        credit repair services. Always deal directly with CIBIL or your lender
        for disputes. Beware of agencies promising instant score hikes.
      </p>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Check Your Financial Health
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Use our free tools to estimate your credit score and plan your
            loans.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/credit-score/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Estimate Credit Score
            </Link>
            <Link
              href="/loans/personal-loan/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Check Loan EMI
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-cibil-4" type="leaderboard" />
      </div>
    </article>
  );
}
