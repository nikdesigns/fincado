import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import WikiText from '@/components/WikiText';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import FAQSchema from '@/components/FAQSchema';

// --- UI COMPONENTS ---
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Percent,
  CalendarDays,
  Clock,
  AlertTriangle,
  Banknote,
  TrendingUp,
  Building2,
  Calculator,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Personal Loan Interest Rates (2025): Compare All Banks | Fincado',
  description:
    'Compare current personal loan interest rates of HDFC, SBI, ICICI, Axis, and top NBFCs. Check lowest rates starting from 10.25% and processing fees.',
  keywords: [
    'Personal Loan Interest Rates 2025',
    'Lowest Personal Loan Rate',
    'HDFC Personal Loan Rate',
    'SBI Personal Loan Interest Rate',
    'Compare Bank Loan Rates',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/personal-loan-interest-rates/',
  },
  openGraph: {
    title: 'Personal Loan Interest Rates (2025): Compare All Banks',
    description:
      'Don’t overpay on interest. Compare the latest personal loan rates from 20+ banks and NBFCs here.',
    url: 'https://fincado.com/guides/personal-loan-interest-rates/',
    type: 'article',
    images: [
      {
        url: '/images/guides/personal-loan/personal-loan-interest-factors.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function PersonalLoanRatesGuide() {
  const pageTitle = 'Personal Loan Interest Rates (2025): Compare All Banks';

  // --- FAQ DATA ---
  const faqData = [
    {
      question: 'Which bank offers the lowest personal loan interest rate?',
      answer:
        'Currently, HDFC Bank and SBI offer some of the lowest rates starting around 10.50% to 11.00% p.a. for salaried applicants with a CIBIL score above 750.',
    },
    {
      question: 'How does CIBIL score affect my interest rate?',
      answer:
        'Your credit score is the most critical factor. A score of 750+ can fetch you rates 2-3% lower than someone with a score of 650. Lenders view high scores as low-risk.',
    },
    {
      question: 'Is it better to take a loan from a bank or an NBFC?',
      answer:
        'Banks generally offer lower interest rates but have stricter eligibility. NBFCs offer faster processing and easier approval for lower credit scores, but usually at higher interest rates.',
    },
    {
      question: 'Are personal loan interest rates fixed or floating?',
      answer:
        'Most personal loans come with a fixed interest rate, meaning your EMI remains the same throughout the tenure. However, some lenders may offer floating rates linked to the repo rate.',
    },
  ];

  return (
    <article className="max-w-4xl mx-auto my-12">
      {/* --- SCHEMAS --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageTitle,
            description:
              'Compare latest personal loan interest rates from top banks in India. Updated list for 2025.',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/guides/personal-loan-interest-rates/',
            },
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
            datePublished: '2025-01-08',
            dateModified: '2025-01-08',
          }),
        }}
      />
      <FAQSchema faqs={faqData} />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Personal Loan Rates',
            url: 'https://fincado.com/guides/personal-loan-interest-rates/',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-8 my-12">
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 mb-4 px-3 py-1 text-sm font-semibold uppercase tracking-wide">
          Loan Trends
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          {pageTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" />
            Last Updated: <strong>Jan 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />6 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-4 h-4" />
            Live Data
          </span>
        </div>
      </header>

      <div className="mb-8">
        <ShareTools title="Personal Loan Rates 2025" />
      </div>

      {/* --- HERO IMAGE --- */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 relative aspect-video">
        <Image
          src="/images/guides/personal-loan/personal-loan-interest-factors.webp"
          alt="Factors affecting personal loan interest rates including CIBIL score"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* --- ARTICLE CONTENT --- */}
      <div className="prose prose-slate max-w-none mb-8">
        <WikiText
          content={`
          <p>
            Finding the <strong>best personal loan interest rate</strong> can save you thousands of rupees in EMIs. While rates start as low as <strong>10.25% p.a.</strong>, they can go up to 24% depending on your credit profile and the lender you choose.
          </p>
          <p>
            This guide compiles the latest interest rates from India's top banks and NBFCs to help you make a smart choice.
          </p>
        `}
        />
      </div>

      {/* [AD SLOT 1] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="en-pl-rates-1" type="leaderboard" label="Sponsored" />
      </div>

      <hr className="my-8 border-slate-200" />

      {/* --- SECTION 1: RATE TABLE --- */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-blue-600" />
        Current Personal Loan Interest Rates (2025)
      </h2>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-8 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700 w-1/3">
                Bank / Lender
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Interest Rate (p.a.)
              </TableHead>
              <TableHead className="font-bold text-slate-700 hidden sm:table-cell">
                Processing Fee
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold text-slate-900">
                HDFC Bank
              </TableCell>
              <TableCell className="text-emerald-700 font-bold">
                10.50% - 21.00%
              </TableCell>
              <TableCell className="text-slate-600 hidden sm:table-cell">
                Up to ₹4,999 + GST
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-slate-900">
                SBI (State Bank of India)
              </TableCell>
              <TableCell className="text-emerald-700 font-bold">
                11.15% - 15.30%
              </TableCell>
              <TableCell className="text-slate-600 hidden sm:table-cell">
                Nil to 1.5%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-slate-900">
                ICICI Bank
              </TableCell>
              <TableCell className="text-emerald-700 font-bold">
                10.75% Onwards
              </TableCell>
              <TableCell className="text-slate-600 hidden sm:table-cell">
                Up to 2.5%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-slate-900">
                Axis Bank
              </TableCell>
              <TableCell className="text-emerald-700 font-bold">
                10.49% - 22.00%
              </TableCell>
              <TableCell className="text-slate-600 hidden sm:table-cell">
                Up to 2%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-slate-900">
                Kotak Mahindra Bank
              </TableCell>
              <TableCell className="text-emerald-700 font-bold">
                10.99% Onwards
              </TableCell>
              <TableCell className="text-slate-600 hidden sm:table-cell">
                Up to 3%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-slate-900">
                Bajaj Finserv
              </TableCell>
              <TableCell className="text-emerald-700 font-bold">
                11.00% - 35.00%
              </TableCell>
              <TableCell className="text-slate-600 hidden sm:table-cell">
                Up to 3.93%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Alert className="bg-amber-50 border-amber-200 mb-8">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
        <AlertDescription className="text-amber-900 text-sm leading-relaxed">
          <strong>Note:</strong> Rates are indicative and depend on your credit
          score, employer category, and loan amount. Final rates are at the sole
          discretion of the lender.
        </AlertDescription>
      </Alert>

      {/* [AD SLOT 2] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="en-pl-rates-2" type="leaderboard" />
      </div>

      {/* --- SECTION 2: FACTORS --- */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Percent className="w-6 h-6 text-purple-600" />
        Factors That Decide Your Rate
      </h2>
      <p className="text-slate-700 mb-6">
        Why does one person get a loan at 10.5% while another pays 16%? Here are
        the key factors:
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> CIBIL Score
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 leading-relaxed">
            This is the most important factor. A score of{' '}
            <strong>750 or above</strong> proves you are creditworthy, helping
            you negotiate the lowest rates.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" /> Employer Status
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 leading-relaxed">
            Employees of <strong>Super-A Category companies</strong> (like TCS,
            Infosys, Govt) often get special low-interest offers compared to
            unlisted company employees.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-amber-500" /> Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 leading-relaxed">
            Higher income usually means higher repayment capacity. If your
            salary is high (e.g., &gt; ₹50k/month), you are seen as a safer
            borrower.
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" /> Relationship
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 leading-relaxed">
            Existing customers (Salary Account holders) often get{' '}
            <strong>Pre-Approved offers</strong> with instant disbursement and
            preferential rates.
          </CardContent>
        </Card>
      </div>

      {/* --- SECTION 3: EMI CALCULATION --- */}
      <div className="bg-slate-900 rounded-xl p-8 text-center text-white mb-12 shadow-lg">
        <h3 className="text-2xl font-bold mb-3">Calculate Your EMI</h3>
        <p className="text-slate-300 mb-6 max-w-lg mx-auto">
          Before applying, check exactly how much you need to pay monthly based
          on these interest rates.
        </p>
        <Link href="/emi-calculator/">
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
          >
            <Calculator className="w-4 h-4 mr-2" /> Open EMI Calculator
          </Button>
        </Link>
      </div>

      {/* [AD SLOT 3] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="en-pl-rates-3" type="leaderboard" />
      </div>

      {/* --- SECTION 4: TYPES OF RATES --- */}
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Watch Out: Flat Rate vs Reducing Balance
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        Sometimes agents offer a suspiciously low rate (e.g., 7-8%). Be careful!
        They might be quoting a <strong>Flat Rate</strong> instead of the
        standard <strong>Reducing Balance Rate</strong>.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <Card className="bg-red-50 border-red-100">
          <CardHeader>
            <CardTitle className="text-red-900 font-bold">
              Flat Interest Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-red-800 text-sm">
            Interest is calculated on the <strong>full principal</strong> for
            the entire tenure. A &quot;10% Flat Rate&quot; is actually equal to
            approx <strong>17-18% Reducing Rate</strong>. Avoid this if
            possible.
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-100">
          <CardHeader>
            <CardTitle className="text-emerald-900 font-bold">
              Reducing Balance Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-emerald-800 text-sm">
            Interest is calculated only on the{' '}
            <strong>outstanding principal</strong>. This is the standard method
            used by banks and is beneficial for you.
          </CardContent>
        </Card>
      </div>

      {/* --- FAQS --- */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="mb-12">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="text-slate-800 font-semibold hover:text-blue-700 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <hr className="my-8 border-slate-200" />

      {/* --- CONCLUSION --- */}
      <Card className="bg-linear-to-br from-slate-50 to-white border-slate-200 shadow-sm mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Conclusion: How to get the best rate?
          </h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              To secure the lowest personal loan interest rate in 2025, maintain
              a healthy credit score (750+) and first check with your existing
              bank for pre-approved offers.
            </p>
            <p>
              Always compare the <strong>APR (Annual Percentage Rate)</strong>,
              which includes processing fees and other charges, rather than just
              looking at the advertised interest rate.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- FOOTER --- */}
      <AuthorBio />
    </article>
  );
}
