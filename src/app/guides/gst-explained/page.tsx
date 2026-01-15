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
import { Badge } from '@/components/ui/badge';
import {
  Calculator,
  CheckCircle2,
  Clock,
  TrendingUp,
  Percent,
  AlertTriangle,
  FileText,
  Briefcase,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title:
    'GST Explained 2025: Complete Guide for Individuals & Small Businesses',
  description:
    'Goods and Services Tax (GST) simplified. Learn about GST slabs, Reverse Charge Mechanism (RCM), Input Tax Credit (ITC), and calculation examples for freelancers and business owners.',
  keywords: [
    'GST explained India',
    'GST for small business',
    'GST slabs 2025',
    'Reverse Charge Mechanism RCM',
    'Input Tax Credit explained',
    'GST calculation examples',
    'freelancer GST rules',
    'GST registration limit',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/gst-explained/',
  },
  openGraph: {
    title: 'GST Explained: The Ultimate Guide for Indian Businesses',
    description:
      'Confused by GST? We break down slabs, calculations, RCM, and common mistakes in simple language.',
    url: 'https://fincado.com/guides/gst-explained/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is the full form of GST?',
    answer:
      'GST stands for Goods and Services Tax. It is a destination-based indirect tax levied on the supply of goods and services.',
  },
  {
    question: 'What are the 3 types of GST?',
    answer:
      'The three main components are CGST (Central GST), SGST (State GST), and IGST (Integrated GST for inter-state supplies).',
  },
  {
    question: 'What is Reverse Charge Mechanism (RCM)?',
    answer:
      'Under RCM, the recipient of goods/services is liable to pay GST instead of the supplier. This applies to specific categories like legal services or imports.',
  },
  {
    question: 'Do freelancers need to pay GST?',
    answer:
      'Yes, if their aggregate turnover exceeds the threshold (usually ₹20 Lakhs for services, though limits vary by state). Voluntary registration is also possible.',
  },
];

export default function GstGuidePage() {
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
              'GST Explained for Individuals & Small Businesses: Complete Guide With Examples',
            description:
              'A comprehensive guide to Goods and Services Tax (GST) covering slabs, services, RCM, and calculations.',
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
            datePublished: '2025-12-21',
            dateModified: '2025-12-21',
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

      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'GST Explained',
            url: 'https://fincado.com/guides/gst-explained/',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Business Guide
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          GST Explained 2025-26: Guide for Individuals & Businesses
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 15 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="GST Explained 2025" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p>Goods and Services Tax (GST) has transformed how taxes are collected in India, but for many individuals and small businesses it still feels confusing and intimidating. This single-page guide breaks down GST in simple language, using real-world examples, common mistakes, and practical tips so you can understand, comply, and optimize your tax position effectively.</p>
          `}
          />
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-1" type="leaderboard" />
      </div>

      {/* --- SECTION 1: WHAT IS GST --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="what-is-gst"
            className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2"
          >
            <FileText className="h-6 w-6 text-blue-600" /> What Is GST?
          </h2>
          <p className="mb-6 text-slate-700">
            Goods and Services Tax (GST) is a destination-based, indirect tax
            levied on the supply of goods and services in India. It replaced
            multiple indirect taxes such as VAT, service tax, excise duty, to
            create a unified tax system.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">CGST</strong>
              <span className="text-sm text-slate-600">
                Central GST. Collected by Central Govt on intra-state supplies.
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">SGST</strong>
              <span className="text-sm text-slate-600">
                State GST. Collected by State Govt on intra-state supplies.
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <strong className="block text-slate-900 mb-1">IGST</strong>
              <span className="text-sm text-slate-600">
                Integrated GST. Collected by Centre on inter-state supplies.
              </span>
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
            <Image
              src="/images/guides/gst/gst-structure-intra-vs-inter.webp"
              alt="Infographic showing difference between Intra-state (CGST+SGST) and Inter-state (IGST) supply"
              width={800}
              height={400}
              className="rounded-lg w-full h-auto object-contain"
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-900">
            <strong>Example:</strong> If a seller in Maharashtra sells to a
            buyer in Maharashtra (Intra-state) at 18%, tax is 9% CGST + 9% SGST.
            If selling to Karnataka (Inter-state), 18% is IGST.
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-2" type="rectangle" />
      </div>

      {/* --- SECTION 2: GST SLABS --- */}
      <section className="mb-12">
        <h2
          id="gst-slabs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-emerald-600" /> GST Rate Slabs
        </h2>

        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900 w-1/4">
                  Rate
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Description & Examples
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  0% (Nil)
                </TableCell>
                <TableCell>
                  Fresh fruits, vegetables, unbranded atta, essential medicines.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">5%</TableCell>
                <TableCell>
                  Mass consumption items, economy air travel, railway transport.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  12%
                </TableCell>
                <TableCell>
                  Processed foods, business services, mid-range products.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  18%
                </TableCell>
                <TableCell>
                  <strong>Most Common:</strong> Professional services, IT,
                  electronics.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  28%
                </TableCell>
                <TableCell>
                  Luxury goods, high-end cars, consumer durables.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-3" type="banner" />
      </div>

      {/* --- SECTION 3: GST ON SERVICES --- */}
      <section className="mb-12">
        <h2
          id="gst-services"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Briefcase className="h-6 w-6 text-indigo-600" /> GST on Services
        </h2>
        <p className="mb-6 text-slate-700">
          Services are fully integrated into GST. Most professional and
          IT-related services typically fall under the <strong>18% slab</strong>
          .
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-indigo-100 bg-indigo-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-indigo-800 text-lg">
                Common Services
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2 list-disc pl-4">
                <li>Freelancing (IT, Marketing, Design).</li>
                <li>Professional Services (CA, Legal).</li>
                <li>Digital Marketing & SEO.</li>
                <li>Training & Workshops.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 bg-indigo-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-indigo-800 text-lg">
                Place of Supply
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li>
                  Same State → <strong>CGST + SGST</strong>
                </li>
                <li>
                  Different State → <strong>IGST</strong>
                </li>
                <li>
                  Export → <strong>Zero Rated</strong> (Refundable)
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-4" type="rectangle" />
      </div>

      {/* --- SECTION 4: RCM --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="rcm"
            className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2"
          >
            <TrendingUp className="h-6 w-6 text-amber-600" /> Reverse Charge
            Mechanism (RCM)
          </h2>
          <p className="mb-6 text-slate-700">
            Under RCM, the <strong>recipient</strong> of goods/services is
            liable to pay GST, not the supplier.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded border border-amber-100">
              <h4 className="font-bold text-amber-900 mb-1">
                1. Specified Categories
              </h4>
              <p className="text-sm text-amber-800">
                GTA (Transport), Legal Services by Advocates, Sponsorships.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded border border-amber-100">
              <h4 className="font-bold text-amber-900 mb-1">
                2. Import of Services
              </h4>
              <p className="text-sm text-amber-800">
                Purchasing software/services from foreign entities (e.g., Zoom,
                Adobe).
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded text-sm text-slate-700 border border-slate-200">
            <strong>How it works:</strong> You pay the GST directly to the govt
            in cash, and then claim it back as Input Tax Credit (ITC) in the
            same month. It is tax-neutral but affects cash flow.
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-5" type="banner" />
      </div>

      {/* --- SECTION 5: CALCULATIONS --- */}
      <section className="mb-12">
        <h2
          id="calculations"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Calculator className="h-6 w-6 text-purple-600" /> GST Calculation
          Examples
        </h2>

        <div className="space-y-6">
          <Card className="border-purple-100 bg-purple-50/20">
            <CardHeader className="pb-2 border-b border-purple-100">
              <CardTitle className="text-base text-purple-900">
                Example 1: Intra-State Supply
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 pt-4">
              <p className="mb-2">
                <strong>Scenario:</strong> Product value ₹50,000 | GST 18% |
                Within State.
              </p>
              <div className="bg-white p-3 rounded border border-purple-100 mb-2">
                <div className="flex justify-between">
                  <span>GST Amount</span> <span>₹9,000</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>CGST (9%)</span> <span>₹4,500</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>SGST (9%)</span> <span>₹4,500</span>
                </div>
                <div className="flex justify-between font-bold mt-1 pt-1 border-t border-dashed">
                  <span>Total Invoice</span> <span>₹59,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-purple-50/20">
            <CardHeader className="pb-2 border-b border-purple-100">
              <CardTitle className="text-base text-purple-900">
                Example 2: Inter-State Supply
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 pt-4">
              <p className="mb-2">
                <strong>Scenario:</strong> Service value ₹80,000 | GST 18% |
                Different State.
              </p>
              <div className="bg-white p-3 rounded border border-purple-100 mb-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>IGST (18%)</span> <span>₹14,400</span>
                </div>
                <div className="flex justify-between font-bold mt-1 pt-1 border-t border-dashed">
                  <span>Total Invoice</span> <span>₹94,400</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 bg-purple-50/20">
            <CardHeader className="pb-2 border-b border-purple-100">
              <CardTitle className="text-base text-purple-900">
                Example 3: Input Tax Credit (ITC)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700 pt-4">
              <div className="mb-4 overflow-hidden rounded-lg border border-slate-200">
                <Image
                  src="/images/guides/gst/gst-input-tax-credit-flow.webp"
                  alt="Flowchart explaining how Input Tax Credit reduces final tax liability"
                  width={600}
                  height={300}
                  className="w-full object-contain bg-white"
                />
              </div>
              <p className="mb-2">
                <strong>Sales Tax (Output):</strong> ₹54,000
                <br />
                <strong>Purchase Tax (Input):</strong> ₹36,000
              </p>
              <div className="bg-white p-3 rounded border border-purple-100 text-center font-bold text-purple-800">
                Net Payable = ₹54k - ₹36k = ₹18,000
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-6" type="rectangle" />
      </div>

      {/* --- SECTION 6: MISTAKES --- */}
      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-red-600" /> Common Mistakes
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-red-100 bg-red-50/20">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">
                Late Registration
              </strong>
              <p className="text-sm text-slate-600">
                Ignoring turnover limits leads to penalties.
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">Wrong Codes</strong>
              <p className="text-sm text-slate-600">
                Incorrect HSN/SAC codes cause disputes.
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">Misusing ITC</strong>
              <p className="text-sm text-slate-600">
                Claiming personal expenses as business input.
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">Ignoring RCM</strong>
              <p className="text-sm text-slate-600">
                Forgetting to pay tax on legal/import services.
              </p>
            </CardContent>
          </Card>
          <Card className="border-red-100 bg-red-50/20">
            <CardContent className="p-4">
              <strong className="block text-red-800 mb-1">Late Filing</strong>
              <p className="text-sm text-slate-600">
                Missed dates = Late fees + Interest.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="guide-gst-7" type="banner" />
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Final Thoughts
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            GST transforms tax from a burden into a structured framework. With
            proper compliance, you can avoid cascading taxes and price
            competitively.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Track ITC
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> File on Time
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Check RCM
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- AUTHOR & DISCLAIMER --- */}
      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Tax laws are subject to change.
          Information updated as per GST Council Notifications up to 2025.
          Consult a tax professional for specific advice.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Need to Calculate Tax Quickly?
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Use our GST Calculator to determine inclusive/exclusive tax amounts
            instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/gst-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Use GST Calculator
            </Link>
            <Link
              href="/income-tax-calculator/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Income Tax Tools
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
