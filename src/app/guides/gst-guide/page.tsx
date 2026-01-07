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
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  PieChart,
  CalendarDays,
  FileCheck,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'GST Returns Guide: GSTR-1, 3B & ITC Rules 2025',
  description:
    'How to file GST return: GSTR-1 vs GSTR-3B, input tax credit golden rule, composition scheme, QRMP quarterly filing & step-by-step filing guide India 2025.',
  keywords: [
    'gst returns filing india',
    'gstr-1 vs gstr-3b',
    'input tax credit rules 2025',
    'gst composition scheme limit',
    'qrmp scheme explained',
    'how to claim itc in gst',
  ],
  openGraph: {
    title: 'GST Returns Explained: GSTR-1 vs GSTR-3B & Input Tax Credit',
    description:
      'Master GST compliance. Learn the "Golden Rule" of ITC, filing process, and how to save taxes legitimately.',
    url: 'https://www.fincado.com/guides/gst-guide',
    type: 'article',
    images: [
      {
        url: '/images/guides/gst/gst-guide-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Business owner filing GST returns online',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the difference between GSTR-1 and GSTR-3B?',
    answer:
      'GSTR-1 contains detailed sales invoices, while GSTR-3B is a summary return showing total sales, purchases, ITC claimed, and tax payment.',
  },
  {
    question: 'Can I claim ITC if my supplier has not filed GST return?',
    answer:
      'No. The "Golden Rule" of ITC states you can only claim credit if the invoice appears in your GSTR-2B, which happens only when your supplier files their GSTR-1.',
  },
  {
    question: 'Who is eligible for the Composition Scheme?',
    answer:
      'Small businesses with an annual turnover up to ₹1.5 Crore (₹75 Lakh for service providers) can opt for the Composition Scheme to pay lower tax rates without ITC benefit.',
  },
];

export default function GSTReturnsGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.fincado.com' },
          { name: 'Guides', url: 'https://www.fincado.com/guides' },
          {
            name: 'GST Returns Guide',
            url: 'https://www.fincado.com/guides/gst-guide',
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
              'GST Returns Explained: GSTR-1 vs GSTR-3B & Input Tax Credit',
            description:
              'Comprehensive guide on GST Returns: Step-by-step filing process, ITC rules, Composition Scheme, and QRMP scheme.',
            image:
              'https://www.fincado.com/images/guides/gst/gst-guide-hero.webp',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-02-08',
            dateModified: '2025-02-08',
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
          className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-3 py-1"
        >
          Business Tax
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          GST Returns Explained: GSTR-1 vs GSTR-3B & Input Tax Credit
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
          <ShareTools title="GST Returns Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              Filing <strong>GST returns</strong> can feel overwhelming, but understanding the difference between <strong>GSTR-1 (sales)</strong>, <strong>GSTR-2B (purchases)</strong>, and <strong>GSTR-3B (payment)</strong> is the foundation of tax compliance in India.
            </p>
            <p>
              Mastering <strong>Input Tax Credit (ITC)</strong> rules—especially the "Golden Rule" that you can only claim ITC if your vendor has filed their return—can save thousands in taxes. This guide explains the filing process, Composition Scheme, and QRMP option to simplify your GST journey.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/gst/gst-guide-hero.webp"
              alt="GST portal dashboard on laptop screen"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS GST RETURN --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-600" /> What is GST Return
            Filing?
          </h2>
          <WikiText
            content={`<p class="mb-6 text-slate-700">A <strong>GST Return</strong> is a document containing details of your income (sales), expenses (purchases), and tax liability. Every registered dealer must file returns to the government.</p>`}
          />

          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <h3 className="mb-3 font-semibold text-slate-900 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-indigo-500" /> Core Components:
            </h3>
            <ul className="space-y-3 text-slate-700 text-sm">
              <li className="flex gap-2">
                <span className="font-bold text-indigo-700">
                  Outward Supplies:
                </span>{' '}
                Your Sales.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-indigo-700">
                  Inward Supplies:
                </span>{' '}
                Your Purchases.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-indigo-700">
                  ITC (Input Tax Credit):
                </span>{' '}
                GST paid on purchases (Asset).
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-indigo-700">
                  Output Tax Liability:
                </span>{' '}
                GST collected on sales (Liability).
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
                href="#filing-process"
                className="hover:text-indigo-600 hover:underline"
              >
                1. How to File Returns (Step-by-Step)
              </a>
            </li>
            <li>
              <a
                href="#return-types"
                className="hover:text-indigo-600 hover:underline"
              >
                2. GSTR-1 vs GSTR-3B Differences
              </a>
            </li>
            <li>
              <a
                href="#itc-rules"
                className="hover:text-indigo-600 hover:underline"
              >
                3. Input Tax Credit &quot;Golden Rule&quot;
              </a>
            </li>
            <li>
              <a
                href="#composition-scheme"
                className="hover:text-indigo-600 hover:underline"
              >
                4. Composition Scheme
              </a>
            </li>
            <li>
              <a
                href="#qrmp-scheme"
                className="hover:text-indigo-600 hover:underline"
              >
                5. QRMP Scheme (Quarterly Filing)
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
        <AdSlot id="guide-gst-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: FILING PROCESS --- */}
      <section className="mb-12">
        <h2
          id="filing-process"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <FileCheck className="h-6 w-6 text-emerald-600" /> How to File GST
          Return (Step-by-Step)
        </h2>

        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {/* Step 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-500 text-slate-500 group-[.is-active]:text-indigo-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  1
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="font-bold text-slate-900 mb-1">Log in</div>
                  <div className="text-slate-600 text-sm">
                    Visit <strong>www.gst.gov.in</strong> and log in with your
                    credentials.
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-500 text-slate-500 group-[.is-active]:text-indigo-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  2
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="font-bold text-slate-900 mb-1">Dashboard</div>
                  <div className="text-slate-600 text-sm">
                    Navigate to &apos;Services&apos; &gt; &apos;Returns&apos;
                    &gt; &apos;Returns Dashboard&apos;. Select Month/Year.
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-500 text-slate-500 group-[.is-active]:text-indigo-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  3
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="font-bold text-slate-900 mb-1">
                    GSTR-1 (Sales)
                  </div>
                  <div className="text-slate-600 text-sm">
                    Enter details of all sales invoices. Submit by the 11th of
                    the next month.
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-indigo-500 text-slate-500 group-[.is-active]:text-indigo-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  4
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="font-bold text-slate-900 mb-1">
                    GSTR-2B (View Only)
                  </div>
                  <div className="text-slate-600 text-sm">
                    Check this auto-generated statement on the 14th to see
                    eligible ITC.
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  5
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                  <div className="font-bold text-slate-900 mb-1">
                    GSTR-3B (Payment)
                  </div>
                  <div className="text-slate-600 text-sm">
                    Verify auto-populated data, offset liability with ITC, pay
                    balance tax, and file by the 20th.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 3: RETURN TYPES --- */}
      <section className="mb-12">
        <h2
          id="return-types"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          GST Return Types: GSTR-1 vs GSTR-3B
        </h2>
        <p className="mb-6 text-slate-700">
          Understanding these forms is critical for compliance.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  GSTR-1
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  GSTR-3B
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Purpose
                </TableCell>
                <TableCell>
                  Details of <strong>Sales</strong>
                </TableCell>
                <TableCell>
                  <strong>Summary</strong> & Payment
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Content
                </TableCell>
                <TableCell>Invoice-wise details</TableCell>
                <TableCell>Total Sales, ITC, Liability</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Due Date
                </TableCell>
                <TableCell>11th of Next Month</TableCell>
                <TableCell>20th of Next Month</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Payment
                </TableCell>
                <TableCell>No Tax Payment</TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Tax Paid Here
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm text-indigo-900">
          <strong>Pro Tip:</strong> Always file GSTR-1 on time. If you delay,
          your buyers won&apos;t see the ITC in their GSTR-2B, damaging your
          business relationships.
        </div>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-2" type="leaderboard" />
      </div>

      {/* --- SECTION 4: ITC RULES --- */}
      <section className="mb-12">
        <h2
          id="itc-rules"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-emerald-600" /> Input Tax Credit
          (ITC): The Golden Rule
        </h2>
        <div className="prose prose-slate max-w-none text-slate-700 mb-6">
          <WikiText
            content={`<strong>ITC</strong> is the tax you paid on business purchases, which you can subtract from the tax you collect on sales. 
        
        <strong>Formula:</strong> Net GST Payable = Output Tax (Sales) - Input Tax (Purchases)`}
          />
        </div>

        <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/50 mb-8 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> The Golden Rule
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-3">
            <p>
              You can ONLY claim ITC if your supplier has filed their{' '}
              <strong>GSTR-1</strong> and the invoice appears in your{' '}
              <strong>GSTR-2B</strong>.
            </p>
            <div className="bg-white p-3 rounded border border-emerald-200">
              <strong>Impact:</strong> If your vendor doesn&apos;t file returns,
              you cannot claim the credit, increasing your cash outflow. Always
              work with GST-compliant vendors.
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3 bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-base text-slate-900">
              Conditions to Claim ITC
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>You possess a valid Tax Invoice.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Goods/Services have been received.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Supplier has paid tax to the government.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>You have filed your GSTR-3B.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Payment to supplier made within 180 days.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* --- SECTION 5: COMPOSITION & QRMP --- */}
      <section className="mb-12">
        <h2
          id="composition-scheme"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <PieChart className="h-6 w-6 text-amber-600" /> Composition Scheme
        </h2>
        <p className="mb-6 text-slate-700">
          A simplified scheme for businesses with turnover up to{' '}
          <strong>₹1.5 Crore</strong>.
        </p>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-8 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">Pros</TableHead>
                <TableHead className="font-bold text-slate-900">Cons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>✅ Quarterly Filing (GSTR-4)</TableCell>
                <TableCell className="text-red-600 font-medium">
                  ❌ No ITC Allowed
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>✅ Low Tax Rate (1% Traders)</TableCell>
                <TableCell>❌ Cannot collect GST from customers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>✅ Less Compliance Burden</TableCell>
                <TableCell>❌ No Inter-State Sales allowed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h2
          id="qrmp-scheme"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CalendarDays className="h-6 w-6 text-blue-600" /> QRMP Scheme
        </h2>
        <Card className="border-blue-100 bg-blue-50/30">
          <CardContent className="pt-6">
            <p className="mb-4 text-sm text-slate-700">
              For taxpayers with turnover up to <strong>₹5 Crore</strong>.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Filing:</strong> File returns (GSTR-1/3B) once a{' '}
                  <strong>Quarter</strong>.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Payment:</strong> Pay tax <strong>Monthly</strong> via
                  a simple challan (PMT-06).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Benefit:</strong> Reduces returns from 24 to 8 per
                  year.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-3" type="leaderboard" />
      </div>

      {/* --- SECTION 6: RISKS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" /> Risks of
          Non-Compliance
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-red-100 bg-red-50/30">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">Late Fees</strong>
              <p className="text-sm text-slate-600">
                ₹50/day (Nil returns: ₹20/day).
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/30">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">Interest</strong>
              <p className="text-sm text-slate-600">
                18% p.a. on unpaid tax liability.
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/30">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">ITC Blockage</strong>
              <p className="text-sm text-slate-600">
                E-Way Bill generation blocked.
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/30">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">Cancellation</strong>
              <p className="text-sm text-slate-600">
                Registration can be cancelled.
              </p>
            </CardContent>
          </Card>
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
              How do I check my GST Return status?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Log in to the GST portal &gt; Services &gt; Returns &gt; Track
              Return Status. You can search using your ARN (Application
              Reference Number) or Return Filing Period.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I revise a filed GST return?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              No. GST returns cannot be revised once filed. However, you can
              rectify errors in the *next month&apos;s* return under the
              &apos;Amendment&apos; section.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-3"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Who pays the tax under Reverse Charge Mechanism (RCM)?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Under RCM, the <strong>recipient</strong> of goods/services pays
              the GST directly to the government instead of the supplier (e.g.,
              GTA services, Legal services).
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
            GST compliance is non-negotiable. Timely filing not only saves
            penalties but ensures smooth working capital flow via ITC.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> File GSTR-1
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Check
              GSTR-2B
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Pay via
              GSTR-3B
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- AUTHOR & DISCLAIMER --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> GST laws and due dates are subject to
          change. This guide is for informational purposes only. Please consult
          a Chartered Accountant (CA) or tax professional for specific business
          advice.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-indigo-600 to-purple-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Managing a business?
          </h2>
          <p className="mb-8 max-w-lg text-indigo-100 text-lg">
            Use our tools to calculate GST liability and plan finances.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/gst-calculator"
              className="rounded-lg bg-white px-8 py-4 font-bold text-indigo-700 transition hover:bg-indigo-50 shadow-lg"
            >
              GST Calculator
            </Link>
            <Link
              href="/simple-interest-calculator"
              className="rounded-lg border border-indigo-400 bg-indigo-800/30 px-8 py-4 font-bold text-white transition hover:bg-indigo-800/50"
            >
              Interest Calculator
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-gst-4" type="leaderboard" />
      </div>
    </article>
  );
}
