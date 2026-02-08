import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link'; // ✅ Added Link
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
  Heart,
  ShieldPlus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCheck,
  Stethoscope,
  Building2,
  TrendingUp,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Health Insurance Buying Guide: Top 5 Features to Check (India)',
  description:
    'Health Insurance Buying Guide India: Learn about room rent capping, NCB, waiting periods, cashless claims, and Section 80D tax benefits.',
  keywords: [
    'Health Insurance Buying Guide India',
    'Best Health Insurance features',
    'Room rent capping explained',
    'No Claim Bonus Health Insurance',
    'Cashless vs Reimbursement Claim',
    'Section 80D Tax Benefit'
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/health-insurance-buying-guide/',
  },
  openGraph: {
    title: 'Health Insurance Buying Guide: 5 Things to Check Before Buying',
    description:
      "Don't buy a policy just for the low premium. Check room rent limits, waiting periods, and cashless network first.",
    type: 'article',
    url: 'https://fincado.com/guides/health-insurance-buying-guide/',
    images: [
      {
        url: '/images/guides/health-insurance/health-insurance-guide-hero.webp',
        width: 1200,
        height: 630,
      }
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'How much health insurance cover is enough in India?',
    answer:
      'For metro city residents, it is suggested to have at least ₹10 lakh for individuals and ₹15–25 lakh for families (floater policy).',
  },
  {
    question: 'What is room rent capping in health insurance?',
    answer:
      'It is a limit on the room rent the insurer will pay (e.g., 1% of Sum Insured). If you choose a room exceeding this limit, you may have to pay a proportionate share of the entire hospital bill.',
  },
  {
    question: 'Can I buy health insurance if I have a pre-existing disease?',
    answer:
      'Yes, but there will be a waiting period (usually 2-4 years) before coverage for that specific disease begins.',
  },
  {
    question: 'Is OPD covered in health insurance?',
    answer:
      'Standard policies usually cover hospitalization expenses only. OPD coverage is available as an add-on or in specific premium plans.',
  }
];

export default function HealthInsuranceGuide() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Health Insurance Guide',
            url: 'https://fincado.com/guides/health-insurance-buying-guide/',
          }
        ]}
      />

      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'Health Insurance Buying Guide: Top 5 Features to Check Before Buying',
            description:
              'A comprehensive guide to buying health insurance in India. Covers room rent limits, NCB, waiting periods, and Section 80D benefits.',
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
            datePublished: '2025-01-12',
            dateModified: '2025-01-12',
            image:
              '/images/guides/health-insurance/health-insurance-guide-hero.webp',
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
          Insurance & Protection
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Health Insurance Buying Guide: Top 5 Features to Check Before Buying
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
            <CheckCircle2 className="h-4 w-4" /> Verified Guide
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Health Insurance Buying Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p>Choosing the right <strong>health insurance plan</strong> in India can be confusing, especially with technical terms like room rent capping, no claim bonus, waiting periods, and cashless claims. The primary goal of this <strong>health insurance buying guide</strong> is to help you quickly understand which features matter most before paying your first premium.</p>
            <p>This article explains the <strong>top 5 features to check before buying health insurance</strong> in simple language, with a special focus on Indian policies. By the end, you will know how to compare policies smartly, avoid hidden costs, and pick a mediclaim plan that actually works at the time of hospitalization.</p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/health-insurance/health-insurance-guide-hero.webp"
              alt="Health Insurance Buying Guide: Family Protection Concept"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="health-guide-top" type="leaderboard" />
      </div>

      {/* --- SECTION 1: WHAT IS A BUYING GUIDE --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-blue-600" /> What is a Health
            Insurance Buying Guide?
          </h2>
          <p className="mb-6 text-slate-700">
            A health insurance buying guide is a structured checklist that helps
            you evaluate and compare health insurance policies before purchase.
            Instead of choosing a plan only on the basis of premium, this guide
            focuses on features like room rent limits, no claim bonus (NCB),
            waiting periods, co-payment, and claim process.
          </p>

          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-blue-600" /> How Does Health
            Insurance Work in India?
          </h2>
          <p className="mb-6 text-slate-700">
            Health insurance is a contract between you and an insurer where you
            pay a premium every year, and the insurer covers hospitalization
            expenses.
          </p>

          {/* ✅ NEW: Internal Link to Inflation Calculator */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-blue-100 bg-blue-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-800">
                  Sum Insured
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Maximum amount the insurer will pay. Use our{' '}
                <Link
                  href="/inflation-calculator/"
                  className="text-blue-600 hover:underline"
                >
                  Inflation Calculator
                </Link>{' '}
                to estimate future medical costs.
              </CardContent>
            </Card>
            <Card className="border-blue-100 bg-blue-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-800">
                  Waiting Periods
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                Time during which specific illnesses or pre-existing diseases
                are not covered.
              </CardContent>
            </Card>
            <Card className="border-blue-100 bg-blue-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-800">
                  Exclusions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700">
                What is not covered (e.g., cosmetic surgery).
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="health-guide-basics-rect" type="box" />
      </div>

      {/* --- SECTION 2: KEY FEATURES --- */}
      <section className="mb-12">
        <h2
          id="key-features"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldPlus className="h-6 w-6 text-emerald-600" /> Top 5 Features to
          Check
        </h2>
        <p className="mb-6 text-slate-700">
          These are the non-negotiable features you must verify before buying
          any policy.
        </p>

        {/* Feature 1 */}
        <Card className="mb-8 border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-red-500" /> 1. Room Rent
              Capping
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="mb-4 text-slate-700 text-sm">
              Many policies put a limit like 1% of Sum Insured per day. If your
              room rent crosses this limit, many hospitals upgrade{' '}
              <strong>all related costs</strong> (doctor fees, nursing, etc.),
              forcing you to pay the proportionate difference.
            </p>

            <div className="mb-6 overflow-hidden rounded-xl bg-red-50 border border-red-100 flex justify-center shadow-sm">
              <Image
                src="/images/guides/health-insurance/room-rent-capping-explained.webp"
                alt="Impact of Room Rent Capping on Total Hospital Bill"
                width={800}
                height={400}
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>

            <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900 border border-emerald-100">
              <strong>Ideal Approach:</strong> Prefer policies with{' '}
              <strong>No Room Rent Capping</strong> or at least &quot;Single
              Private Room&quot; eligibility.
            </div>
          </CardContent>
        </Card>

        {/* Feature 2 */}
        <Card className="mb-8 border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" /> 2. No Claim
              Bonus (NCB)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="mb-4 text-slate-700 text-sm">
              NCB is a reward for not making a claim. Good policies increase
              your Sum Insured by <strong>10–50% every claim-free year</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>
                Check <strong>Maximum NCB limit</strong> (e.g., up to 100% or
                150% of base cover).
              </li>
              <li>
                Check if NCB reduces partially or fully upon making a claim.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* AD SLOT 3 */}
        <div className="no-print my-8">
          <AdSlot id="health-guide-features-banner" type="leaderboard" />
        </div>

        {/* Feature 3 */}
        <Card className="mb-8 border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" /> 3. Waiting Periods
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-hidden rounded-lg border border-slate-200 mb-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="font-bold text-slate-900">
                      Condition Type
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Typical Waiting Period
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Pre-existing Diseases (PED)
                    </TableCell>
                    <TableCell>2 to 4 Years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Specific Illnesses (Hernia, Cataract)
                    </TableCell>
                    <TableCell>2 Years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Initial Waiting Period
                    </TableCell>
                    <TableCell>30 Days</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Maternity (if covered)
                    </TableCell>
                    <TableCell>9 to 24 Months</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-slate-500 italic">
              <strong>Tip:</strong> If you have parents with health issues, look
              for plans with shorter waiting periods (e.g., 2 years instead of
              4).
            </p>
          </CardContent>
        </Card>

        {/* Feature 4 */}
        <Card className="mb-8 border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" /> 4. Cashless vs
              Reimbursement
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="mb-4 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
              <Image
                src="/images/guides/health-insurance/cashless-vs-reimbursement.webp"
                alt="Cashless vs Reimbursement Claim Process Flowchart"
                width={800}
                height={400}
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>
            <p className="text-sm text-slate-700">
              <strong>Cashless:</strong> Insurer pays hospital directly.{' '}
              <strong>Reimbursement:</strong> You pay first, claim later. Always
              check the <strong>Network Hospital List</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Feature 5 */}
        <Card className="mb-8 border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" /> 5. Other
              Critical Features
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>
                <strong>Co-payment:</strong> Avoid policies that force you to
                pay 10-20% of every bill.
              </li>
              <li>
                <strong>Restoration Benefit:</strong> Does the Sum Insured
                refill if you exhaust it?
              </li>
              <li>
                <strong>Daycare Procedures:</strong> Coverage for surgeries not
                requiring 24-hour hospitalization.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-4" type="rectangle" />
      </div>

      {/* --- SECTION 3: ELIGIBILITY & TAX --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20">
          Eligibility & Tax Benefits
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-900">
                Age & Renewal
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Entry Age:</strong> Usually 18 to 65 years.
                </li>
                <li>
                  <strong>Lifelong Renewability:</strong> Ensure the policy
                  allows you to renew for life.
                </li>
                <li>
                  <strong>Ideal Cover:</strong> ₹10–25 Lakh for metro families.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* ✅ NEW: Internal Link to Income Tax Calculator */}
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-slate-900">
                Tax Benefits (Section 80D)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="px-6 pt-2 text-xs text-slate-500 mb-2">
                Check your total tax savings on our{' '}
                <Link
                  href="/income-tax-calculator/"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Income Tax Calculator
                </Link>
                .
              </p>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-xs font-bold text-slate-900">
                      Category
                    </TableHead>
                    <TableHead className="text-xs font-bold text-slate-900">
                      Limit
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs">
                      Self & Family (&lt;60)
                    </TableCell>
                    <TableCell className="text-xs">₹25,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">
                      Parents (Senior Citizens)
                    </TableCell>
                    <TableCell className="text-xs">₹50,000</TableCell>
                  </TableRow>
                  <TableRow className="bg-emerald-50">
                    <TableCell className="text-xs font-bold text-emerald-900">
                      Max Combined
                    </TableCell>
                    <TableCell className="text-xs font-bold text-emerald-700">
                      ₹75k - ₹1L
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="health-guide-tax-banner" type="leaderboard" />
      </div>

      {/* --- SECTION 4: COMPARISON & RISKS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20">
          Risks & Alternatives
        </h2>

        {/* ✅ NEW: Internal Link to FD Calculator */}
        <Card className="border-slate-200 mb-6">
          <CardHeader className="pb-2 bg-slate-50">
            <CardTitle className="text-base text-slate-900">
              Health Insurance vs Alternatives
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-slate-900">
                      Aspect
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Personal Policy
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Employer Cover
                    </TableHead>
                    <TableHead className="font-bold text-slate-900">
                      Emergency Fund
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Coverage
                    </TableCell>
                    <TableCell className="text-emerald-600 font-bold">
                      High (Chosen)
                    </TableCell>
                    <TableCell>Low (Fixed)</TableCell>
                    <TableCell>Limited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Validity
                    </TableCell>
                    <TableCell className="text-emerald-600 font-bold">
                      Lifelong
                    </TableCell>
                    <TableCell>Ends with Job</TableCell>
                    <TableCell>Always</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-700">
                      Best Use
                    </TableCell>
                    <TableCell>Long-term Safety</TableCell>
                    <TableCell>Temporary Support</TableCell>
                    <TableCell>
                      Small Expenses (Park in{' '}
                      <Link
                        href="/fd-calculator/"
                        className="text-blue-600 hover:underline"
                      >
                        FD
                      </Link>
                      )
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Risks to Consider
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Hidden Sub-limits:</strong> Check for caps on specific
                treatments like Cataract.
              </li>
              <li>
                <strong>Portability:</strong> Port while you are healthy.
              </li>
              <li>
                <strong>Claim Ratio:</strong> Check CSR and Incurred Claim
                Ratio.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="health-guide-comparison-rect" type="box" />
      </div>

      {/* --- FAQS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20">
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
              Should I buy health insurance if I have employer cover?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes. Employer cover ends when you leave the job or retire. A
              personal policy ensures continuous coverage and waiting period
              benefits.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              What is better: Family Floater or Individual?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Family Floater is cost-effective for young families. Individual
              policies are better for older parents or members with high health
              risks to preserve the sum insured.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-3"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I increase my cover later?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes, you can request a Sum Insured enhancement at renewal, or buy
              a <strong>Super Top-up policy</strong> to increase coverage
              cheaply.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="health-guide-bottom" type="leaderboard" />
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            A smart health insurance purchase is not about chasing the lowest
            premium, but about the right features.{' '}
            <strong>Avoid strict room rent caps</strong>, ensure a{' '}
            <strong>healthy No Claim Bonus</strong>, and verify{' '}
            <strong>waiting periods</strong>.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> No Room Rent
              Cap
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> High NCB
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Low Waiting
              Period
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Insurance is a subject matter of
          solicitation. The information provided in this article is for
          educational purposes only. Please read the policy wordings and terms &
          conditions carefully before concluding a sale. Fincado is not an
          insurance aggregator or broker.
        </p>
      </div>
    </article>
  );
}
