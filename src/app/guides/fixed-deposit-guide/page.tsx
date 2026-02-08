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
  TrendingUp,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  FileText,
  Info,
  Layers,
  Banknote,
  MinusCircle,
  PlusCircle,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'FD Laddering: Higher Returns & Liquidity Strategy 2025',
  description:
    'FD laddering strategy: Split FDs for higher returns & annual liquidity. Compare FD vs debt funds, SCSS vs FD, avoid TDS with Form 15G/15H. Safe investment guide.',
  keywords: [
    'fd laddering strategy india',
    'fixed deposit vs debt mutual fund',
    'senior citizen savings scheme vs fd',
    'form 15g 15h to avoid tds',
    'safest investment options india 2025',
    'fd interest rates 2025',
  ],
  openGraph: {
    title: 'FD Laddering Strategy: How to Get Higher Returns & Liquidity',
    description:
      'Stop locking all your money in one FD. Learn the Laddering technique to get higher interest rates AND yearly liquidity.',
    url: 'https://fincado.com/guides/fixed-deposit-guide/',
    type: 'article',
    images: [
      {
        url: '/images/guides/fd/fd-laddering-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Visual representation of FD Laddering strategy',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    question: 'What is FD laddering?',
    answer:
      'FD laddering is a strategy where you split your investment into multiple fixed deposits with staggered maturity dates (e.g., 1 year, 2 years, 3 years) instead of one lumpsum FD. This provides annual liquidity and higher average returns.',
  },
  {
    question: 'How can I avoid TDS on FD interest?',
    answer:
      'If your total income is below the taxable limit, you can submit Form 15G (below 60 years) or Form 15H (senior citizens) to your bank at the start of the financial year to prevent TDS deduction.',
  },
  {
    question: 'Which is better: SCSS or Senior Citizen FD?',
    answer:
      'SCSS currently offers higher guaranteed returns (8.2%) and is government-backed, making it better for the first ₹30 Lakh. For amounts above that, Senior Citizen FDs are the best alternative.',
  },
];

export default function FixedDepositGuidePage() {
  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* --- BREADCRUMBS --- */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'FD Laddering Strategy',
            url: 'https://fincado.com/guides/fixed-deposit-guide/',
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
              'FD Laddering Strategy: How to Get Higher Returns & Liquidity',
            description:
              'Comprehensive guide on Fixed Deposit Laddering, SCSS benefits, avoiding TDS with Form 15G/15H, and FD vs Debt Fund comparison.',
            image:
              '/images/guides/fd/fd-laddering-hero.webp',
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
            datePublished: '2025-01-28',
            dateModified: '2025-01-28',
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
          Safe Investing
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          FD Laddering Strategy: How to Get Higher Returns & Liquidity
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
          <ShareTools title="FD Laddering Strategy Guide" />
        </div>
      </header>

      {/* --- INTRO CARD --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
            <p class="mb-4">
              Fixed Deposits (FDs) are one of the most popular <strong>safe investment options</strong> in India, but many investors don't realize they can significantly improve returns and liquidity through a simple strategy called <strong>FD laddering</strong>.
            </p>
            <p>
              This technique involves splitting your investment across multiple FDs with different maturity dates instead of locking all your money into one long-term deposit, giving you the best of both worlds—higher interest rates and regular access to funds.
            </p>
          `}
          />

          <div className="my-6 relative h-64 w-full sm:h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              src="/images/guides/fd/fd-laddering-hero.webp"
              alt="Diagram showing FD laddering steps"
              fill
              priority
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 1: WHAT IS FD LADDERING --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="h-6 w-6 text-blue-600" /> What is Fixed Deposit
            (FD) Laddering?
          </h2>
          <p className="mb-6 text-slate-700">
            <strong>FD laddering</strong> is an investment strategy where you
            divide your total investment amount into multiple fixed deposits
            with staggered maturity dates rather than putting everything into a
            single FD.
          </p>

          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5 mb-6">
            <h3 className="mb-3 font-semibold text-slate-900">
              Simple Definition:
            </h3>
            <p className="text-slate-700">
              Instead of investing ₹5 lakh in one 5-year FD, you create a
              &quot;ladder&quot; by splitting it into five FDs of ₹1 lakh each,
              maturing in 1 year, 2 years, 3 years, 4 years, and 5 years
              respectively.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200 mb-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">
                    FD Split
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Investment
                  </TableHead>
                  <TableHead className="font-bold text-slate-900">
                    Maturity Tenure
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    FD 1
                  </TableCell>
                  <TableCell>₹1,00,000</TableCell>
                  <TableCell>1 Year</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    FD 2
                  </TableCell>
                  <TableCell>₹1,00,000</TableCell>
                  <TableCell>2 Years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    FD 3
                  </TableCell>
                  <TableCell>₹1,00,000</TableCell>
                  <TableCell>3 Years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    FD 4
                  </TableCell>
                  <TableCell>₹1,00,000</TableCell>
                  <TableCell>4 Years</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">
                    FD 5
                  </TableCell>
                  <TableCell>₹1,00,000</TableCell>
                  <TableCell>5 Years</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-sm text-emerald-900">
            <strong>Result:</strong> One FD matures EVERY YEAR. This creates a
            perpetual cycle of liquidity and reinvestment opportunities.
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
                href="#how-it-works"
                className="hover:text-blue-600 hover:underline"
              >
                1. How FD Laddering Works
              </a>
            </li>
            <li>
              <a
                href="#benefits"
                className="hover:text-blue-600 hover:underline"
              >
                2. Benefits (Liquidity + Returns)
              </a>
            </li>
            <li>
              <a
                href="#eligibility"
                className="hover:text-blue-600 hover:underline"
              >
                3. Eligibility & Rules
              </a>
            </li>
            <li>
              <a
                href="#example-10l"
                className="hover:text-blue-600 hover:underline"
              >
                4. FD Laddering Example (₹10 Lakh)
              </a>
            </li>
            <li>
              <a
                href="#taxation"
                className="hover:text-blue-600 hover:underline"
              >
                5. Tax Treatment & TDS
              </a>
            </li>
            <li>
              <a
                href="#fd-vs-debt"
                className="hover:text-blue-600 hover:underline"
              >
                6. FD vs Debt Mutual Funds
              </a>
            </li>
            <li>
              <a
                href="#scss-vs-fd"
                className="hover:text-blue-600 hover:underline"
              >
                7. Senior Citizens: SCSS vs FD
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-blue-600 hover:underline">
                8. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-1" type="leaderboard" />
      </div>

      {/* --- SECTION 2: HOW IT WORKS --- */}
      <section className="mb-12">
        <h2
          id="how-it-works"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <TrendingUp className="h-6 w-6 text-emerald-600" /> How Does FD
          Laddering Work?
        </h2>
        <p className="mb-6 text-slate-700">
          FD laddering works by balancing liquidity (regular access to funds)
          with higher returns (longer-tenure FDs typically offer better rates).
        </p>

        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <ol className="list-decimal pl-5 space-y-4 text-slate-700 marker:font-bold marker:text-slate-900">
              <li>
                <strong>Determine Total Amount:</strong> Decide how much you
                want to invest (e.g., ₹5 lakh).
              </li>
              <li>
                <strong>Choose &quot;Rungs&quot;:</strong> A typical ladder has
                3-5 FDs.
              </li>
              <li>
                <strong>Split Equally:</strong> Divide total by number of FDs.
              </li>
              <li>
                <strong>Stagger Tenures:</strong> Open FDs for 1, 2, 3, 4, and 5
                years.
              </li>
              <li>
                <strong>Reinvest Annually:</strong> When the 1-year FD matures,
                reinvest it for 5 years to keep the ladder going.
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-900">
          <strong>Why This Works:</strong> You capture rising interest rates by
          reinvesting annually, and you get regular liquidity without breaking
          FDs and paying penalties.
        </div>
      </section>

      {/* --- SECTION 3: BENEFITS --- */}
      <section className="mb-12">
        <h2
          id="benefits"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Key Features &
          Benefits
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-100 bg-emerald-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>
                    <strong>Enhanced Liquidity:</strong> Yearly access to cash.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>
                    <strong>Higher Returns:</strong> Benefit from long-term
                    rates.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>
                    <strong>Risk Mitigation:</strong> Average out rate
                    fluctuations.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>
                    <strong>Discipline:</strong> Reduces impulsive breaking of
                    FDs.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 text-lg flex items-center gap-2">
                <Info className="h-5 w-5" /> Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Applicable to any amount (₹1 Lakh+).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Works with any bank.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Can be automated.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Ideal for retirees & emergency funds.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 4: ELIGIBILITY --- */}
      <h2
        id="eligibility"
        className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
      >
        Eligibility, Limits & Rules
      </h2>
      <div className="overflow-hidden rounded-lg border border-slate-200 mb-12 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100 hover:bg-slate-100">
              <TableHead className="font-bold text-slate-900">
                Criteria
              </TableHead>
              <TableHead className="font-bold text-slate-900">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-slate-700">
                Who Can Open?
              </TableCell>
              <TableCell>
                Residents (18+), Minors, NRIs, Senior Citizens.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-700">
                Limits
              </TableCell>
              <TableCell>Min ₹1,000. No upper limit. DICGC Insured.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-700">
                Tenure
              </TableCell>
              <TableCell>7 days to 10 years.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-700">
                Premature Withdrawal
              </TableCell>
              <TableCell>Allowed with penalty (0.5-1%).</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-2" type="leaderboard" />
      </div>

      {/* --- SECTION 5: EXAMPLE --- */}
      <section className="mb-12">
        <h2
          id="example-10l"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Banknote className="h-6 w-6 text-emerald-600" /> FD Laddering
          Example: ₹10 Lakh
        </h2>

        <div className="space-y-6">
          <Card className="border-red-100 bg-red-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg flex items-center gap-2">
                <MinusCircle className="h-5 w-5" /> Traditional Approach (Single
                FD)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p>
                <strong>Investment:</strong> ₹10,00,000 |{' '}
                <strong>Tenure:</strong> 5 Years
              </p>
              <p>
                <strong>Problem:</strong> No liquidity for 5 years. Penalty if
                broken.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-emerald-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg flex items-center gap-2">
                <PlusCircle className="h-5 w-5" /> Laddering Approach (5 FDs)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-emerald-100/50 hover:bg-emerald-100/50">
                    <TableHead className="font-bold text-emerald-900">
                      FD
                    </TableHead>
                    <TableHead className="font-bold text-emerald-900">
                      Amount
                    </TableHead>
                    <TableHead className="font-bold text-emerald-900">
                      Tenure
                    </TableHead>
                    <TableHead className="font-bold text-emerald-900">
                      Rate
                    </TableHead>
                    <TableHead className="font-bold text-emerald-900">
                      Maturity
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>FD 1</TableCell>
                    <TableCell>₹2,00,000</TableCell>
                    <TableCell>1 Year</TableCell>
                    <TableCell>6.5%</TableCell>
                    <TableCell>₹2,13,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>FD 2</TableCell>
                    <TableCell>₹2,00,000</TableCell>
                    <TableCell>2 Years</TableCell>
                    <TableCell>6.75%</TableCell>
                    <TableCell>₹2,27,911</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>FD 3</TableCell>
                    <TableCell>₹2,00,000</TableCell>
                    <TableCell>3 Years</TableCell>
                    <TableCell>7.0%</TableCell>
                    <TableCell>₹2,45,001</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>FD 4</TableCell>
                    <TableCell>₹2,00,000</TableCell>
                    <TableCell>4 Years</TableCell>
                    <TableCell>7.25%</TableCell>
                    <TableCell>₹2,63,474</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>FD 5</TableCell>
                    <TableCell>₹2,00,000</TableCell>
                    <TableCell>5 Years</TableCell>
                    <TableCell>7.5%</TableCell>
                    <TableCell>₹2,83,696</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="p-4 bg-emerald-50 text-emerald-900 text-sm font-medium border-t border-emerald-100">
                Key Win: You get ₹2.13 Lakh liquid cash after just 1 year!
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* --- SECTION 6: TAXATION --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2
            id="taxation"
            className="mb-4 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
          >
            <FileText className="h-6 w-6 text-slate-600" /> Tax Treatment & TDS
          </h2>

          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Taxation</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Fully Taxable at Slab Rate.</li>
                <li>Added to &quot;Income from Other Sources&quot;.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">TDS Rules</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>10% TDS if interest &gt; ₹40k (₹50k seniors).</li>
                <li>20% TDS if no PAN.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" /> Avoiding TDS: Form 15G/15H
            </h4>
            <p className="text-sm text-blue-800">
              If your total income is below the taxable limit, submit Form 15G
              (below 60) or Form 15H (60+) to your bank annually to prevent TDS
              deduction.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 7: RISKS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> Risks & Things to
          Consider
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-amber-100 bg-amber-50/30">
            <CardContent className="p-4">
              <strong className="block text-amber-900 mb-1">
                Interest Rate Risk
              </strong>
              <p className="text-sm text-slate-600">
                Reinvestment might happen at lower rates.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/30">
            <CardContent className="p-4">
              <strong className="block text-amber-900 mb-1">
                Inflation Risk
              </strong>
              <p className="text-sm text-slate-600">
                Real returns might be negative.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/30">
            <CardContent className="p-4">
              <strong className="block text-amber-900 mb-1">TDS Impact</strong>
              <p className="text-sm text-slate-600">
                Can block cash flow until refund.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber-100 bg-amber-50/30">
            <CardContent className="p-4">
              <strong className="block text-amber-900 mb-1">
                Opportunity Cost
              </strong>
              <p className="text-sm text-slate-600">
                Equity beats FDs over 10+ years.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="guide-fd-3" type="leaderboard" />
      </div>

      {/* --- SECTION 8: COMPARISONS --- */}
      <section className="mb-12">
        <h2
          id="fd-vs-debt"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          FD vs Debt Mutual Funds
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-8 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Parameter
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Fixed Deposit
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Debt Funds
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Returns
                </TableCell>
                <TableCell>Fixed (6-8%)</TableCell>
                <TableCell>Variable (6-9%)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Liquidity
                </TableCell>
                <TableCell>Penalty applied</TableCell>
                <TableCell>High (T+1)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Safety
                </TableCell>
                <TableCell>High (DICGC)</TableCell>
                <TableCell>Moderate</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h2
          id="scss-vs-fd"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Senior Citizens: SCSS vs FD
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 mb-6 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  SCSS (Govt)
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Senior FD
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Interest
                </TableCell>
                <TableCell className="font-bold text-emerald-600">
                  8.2%
                </TableCell>
                <TableCell>6.5% - 8.5%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Limit
                </TableCell>
                <TableCell>Max ₹30 Lakh</TableCell>
                <TableCell>No Limit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Payout
                </TableCell>
                <TableCell>Quarterly Only</TableCell>
                <TableCell>Flexible</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* --- SECTION 9: WHO SHOULD USE --- */}
      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            Who Should Use FD Laddering?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> Ideal Candidates
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                <li>Conservative Investors.</li>
                <li>Retirees needing liquidity.</li>
                <li>Emergency Fund builders.</li>
                <li>Goal-based savers.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                <MinusCircle className="h-5 w-5" /> Not Ideal For
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                <li>Long-term wealth builders (10+ yrs).</li>
                <li>High tax bracket individuals.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 10: FAQS --- */}
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
          <AccordionItem
            value="item-custom-1"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Is FD a safe investment option?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes. FDs are among the safest options in India. Deposits in
              scheduled banks are insured up to ₹5 Lakh per bank by DICGC.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-custom-2"
            className="border rounded-lg px-4 bg-white"
          >
            <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
              Can I break an FD before maturity?
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 text-base leading-relaxed">
              Yes, but banks charge a penalty (typically 0.5-1% lower interest).
              FD laddering minimizes the need for this.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            FD laddering transforms the traditional fixed deposit from a rigid
            instrument into a dynamic strategy.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Split Corpus
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Maximize
              SCSS
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Form 15G/H
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Interest rates are subject to change by
          banks. Tax laws can change annually. This guide is for educational
          purposes. Please consult a financial advisor for personalized advice.
        </p>
      </div>

      {/* --- FINAL CTA --- */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
            Calculate your returns now
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Check how much your FD investment will grow over time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fd-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Open FD Calculator
            </Link>
            <Link
              href="/sip-calculator/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Compare with SIP
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print mt-8">
        <AdSlot id="guide-fd-4" type="leaderboard" />
      </div>
    </article>
  );
}
