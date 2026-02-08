import { banks } from '@/lib/banks';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import RateComparisonChart from '@/components/RateComparisonChart';

import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FAQSchema from '@/components/FAQSchema';
import FinancialNavWidget from '@/components/FinancialNavWidget';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  ArrowRight,
  ShieldCheck,
  Scale,
  Zap,
  TrendingDown,
  HelpCircle,
  Users,
  Clock,
  IndianRupee,
} from 'lucide-react';
import AuthorBio from '@/components/AuthorBio';
import { getCurrentFiscalYear } from '@/lib/fiscalYear';

/* ---------------- STATIC PARAMS ---------------- */
export const dynamicParams = false;

export async function generateStaticParams() {
  // ✅ FIX 1: Use the actual 'banks' list instead of a hardcoded array
  // This ensures 'idfc', 'lic-housing', etc. are all included automatically
  const params: { slug: string }[] = [];

  for (const b1 of banks) {
    for (const b2 of banks) {
      if (b1.slug !== b2.slug) {
        params.push({ slug: `${b1.slug}-vs-${b2.slug}` });
      }
    }
  }
  return params;
}

/* ---------------- METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fy = getCurrentFiscalYear();

  // ✅ FIX 2: Split by '-vs-' to correctly handle multi-word slugs like 'lic-housing'
  const parts = slug.split('-vs-');
  if (parts.length !== 2) return {};

  const [s1, s2] = parts;

  const b1 = banks.find((b) => b.slug === s1);
  const b2 = banks.find((b) => b.slug === s2);

  if (!b1 || !b2) return {};

  return {
    title: `${b1.name} vs ${b2.name} Home Loan Comparison ${fy.shortYear} – Interest Rates & Verdict`,
    description: `Detailed ${b1.name} vs ${b2.name} home loan comparison covering interest rates (${b1.rate}% vs ${b2.rate}%), approval speed, eligibility, and long-term cost. Expert-reviewed.`,
    alternates: {
      canonical: `https://fincado.com/compare/${slug}/`,
    },
  };
}

/* ---------------- PAGE ---------------- */
export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fy = getCurrentFiscalYear(); // ✅ FIX: Added this line to define fy

  // ✅ FIX 3: Correct splitting logic here as well
  const parts = slug.split('-vs-');
  if (parts.length !== 2) notFound();

  const [s1, s2] = parts;

  const b1 = banks.find((b) => b.slug === s1);
  const b2 = banks.find((b) => b.slug === s2);

  if (!b1 || !b2) notFound();

  const faqs = [
    {
      question: `Which is safer for long-term home loans: ${b1.name} or ${b2.name}?`,
      answer: `${b1.name} is generally preferred by borrowers seeking long-term stability due to conservative lending practices, while ${b2.name} focuses on faster approvals and digital servicing.`,
    },
    {
      question: `Does CIBIL score impact ${b1.name} and ${b2.name} differently?`,
      answer: `Yes. Borrowers with higher CIBIL scores usually get better rate concessions at both banks, but PSU banks like ${b1.name} may be stricter at lower scores.`,
    },
    {
      question: `Which bank is better for self-employed borrowers?`,
      answer: `${b2.name} often offers more flexibility for self-employed applicants due to digital income assessment and faster underwriting.`,
    },
    {
      question: `Which bank is better for balance transfer?`,
      answer: `Private banks like ${b2.name} typically provide smoother balance transfer processes, while ${b1.name} may offer lower long-term interest savings.`,
    },
  ];

  return (
    <main className="container mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          {
            name: 'Loan Comparisons',
            url: 'https://fincado.com/compare-loans/',
          },
          {
            name: `${b1.name} vs ${b2.name}`,
            url: `https://fincado.com/compare/${slug}/`,
          },
        ]}
      />

      {/* ---------- HEADER ---------- */}
      <header className="max-w-4xl mx-auto text-center my-16">
        <Badge className="mb-4 bg-emerald-100 text-emerald-700 uppercase tracking-wider">
          Expert Reviewed · {fy.shortYear}
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
          {b1.name} <span className="text-emerald-600">vs</span> {b2.name}
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed">
          Independent comparison based on RBI benchmarks, lender disclosures,
          and real borrower approval patterns.
        </p>

        <p className="mt-3 text-sm text-slate-500 italic">
          Reviewed by Fincado Research Team
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* ---------- MAIN ---------- */}
        <div className="lg:col-span-8 space-y-14 mb-12">
          {/* SNAPSHOT TABLE */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                Comparison Snapshot
              </CardTitle>
              <CardDescription>Key loan metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>{b1.name}</TableHead>
                    <TableHead>{b2.name}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Starting Interest Rate</TableCell>
                    <TableCell className="font-semibold text-emerald-600">
                      {b1.rate}% p.a.
                    </TableCell>
                    <TableCell className="font-semibold text-emerald-600">
                      {b2.rate}% p.a.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Maximum Interest Rate</TableCell>
                    <TableCell>{b1.maxRate}%</TableCell>
                    <TableCell>{b2.maxRate}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Digital Approval</TableCell>
                    <TableCell>
                      {b1.slug === 'sbi' ? 'Limited' : 'Partial'}
                    </TableCell>
                    <TableCell>High / Paperless</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* ✅ ADD CHART HERE */}
          <RateComparisonChart b1={b1} b2={b2} />

          {/* PROFILE-BASED VERDICT */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Which Bank Is Better Based on Your Profile?
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 space-y-2">
                  <Users className="w-6 h-6 text-emerald-600" />
                  <p className="font-semibold">Best for Salaried Employees</p>
                  <p className="text-sm text-slate-600">
                    <strong>{b1.name}</strong> typically favors stable income
                    profiles with predictable repayment history.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-2">
                  <Clock className="w-6 h-6 text-sky-600" />
                  <p className="font-semibold">Best for Faster Disbursal</p>
                  <p className="text-sm text-slate-600">
                    <strong>{b2.name}</strong> is better suited for borrowers
                    who value speed and digital tracking.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-2">
                  <IndianRupee className="w-6 h-6 text-emerald-600" />
                  <p className="font-semibold">
                    Lowest Long-Term Interest Cost
                  </p>
                  <p className="text-sm text-slate-600">
                    PSU banks like <strong>{b1.name}</strong> often result in
                    lower lifetime interest outgo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-2">
                  <Zap className="w-6 h-6 text-yellow-600" />
                  <p className="font-semibold">Best for Self-Employed</p>
                  <p className="text-sm text-slate-600">
                    <strong>{b2.name}</strong> usually offers flexible income
                    assessment for business owners.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <AdSlot id="compare-mid" type="leaderboard" />

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-600" />
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <FAQSchema faqs={faqs} />
          </section>

          {/* FINAL VERDICT */}
          <Card className="bg-lime-50">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-3xl text-lime-800 font-bold flex items-center gap-2">
                <TrendingDown className="text-lime-800" />
                Final Verdict
              </h2>
              <p className="text-lime-800">
                Choose <strong>{b1.name}</strong> if your priority is long-term
                cost efficiency and conservative lending. Choose{' '}
                <strong>{b2.name}</strong> if approval speed, convenience, and
                digital servicing matter more.
              </p>
              <Button asChild className="bg-lime-700 hover:bg-lime-800">
                <Link href="/emi-calculator/">
                  Compare EMI Impact <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <AuthorBio />
        </div>

        {/* ---------- SIDEBAR ---------- */}
        <aside className="lg:col-span-4 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Loan Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                EMI varies based on city, income, and interest rate.
              </p>
              <Button asChild className="w-full bg-emerald-600">
                <Link href="/emi-calculator/">Open EMI Calculator</Link>
              </Button>
            </CardContent>
          </Card>

          <FinancialNavWidget />

          <div className="sticky top-24">
            <AdSlot id="compare-sidebar" type="box" />
          </div>
        </aside>
      </div>
    </main>
  );
}
