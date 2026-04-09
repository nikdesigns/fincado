import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
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
  Lock,
  BarChart3,
  PieChart,
  FileText,
  ListChecks,
  Download,
  ShieldCheck,
  AlertTriangle,
  Users,
  Target,
  HelpCircle,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    'ELSS Funds Guide 2026: Tax Benefits, Lock-in, Returns & How to Invest',
  description:
    'Complete 2026 ELSS guide: Section 80C deduction up to ₹1.5L (old regime), 3-year lock-in, LTCG 12.5% above ₹1.25L, historical 12-15% CAGR returns, comparison with PPF, FD & NPS. Updated April 2026.',
  keywords: [
    'ELSS Funds 2026',
    'Equity Linked Savings Scheme',
    'ELSS tax benefits old regime',
    'ELSS vs PPF 2026',
    'ELSS Section 80C deduction',
    'ELSS lock-in period 3 years',
    'best ELSS funds India 2026',
    'ELSS SIP or lump sum',
    'LTCG tax on ELSS 2026',
    'how to choose ELSS fund',
    'ELSS new tax regime 2026',
    'ELSS for salaried employees',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/elss-funds-guide-2026/',
  },
  openGraph: {
    title: 'ELSS Funds Guide 2026: Save Tax & Build Wealth | Fincado',
    description:
      'Save ₹46,800 in tax under Section 80C (old regime) + target 12-15% returns. Complete 2026 ELSS guide with fund selection criteria, SIP vs lump sum, ELSS vs PPF & FAQs.',
    type: 'article',
    url: 'https://fincado.com/guides/elss-funds-guide-2026/',
    images: [
      {
        url: '/images/guides/elss/elss-guide-hero-2026.webp',
        width: 1200,
        height: 630,
        alt: 'ELSS Funds 2026 Guide – Tax Saving Mutual Funds',
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────
// FAQ DATA — Extended for more intent coverage
// ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    question: 'Is ELSS available under the new tax regime in 2026?',
    answer:
      'No. The Section 80C deduction — which covers ELSS — is only available under the old tax regime. If you opt for the new tax regime, you cannot claim the ₹1.5 lakh 80C benefit on ELSS. You can still invest in ELSS for wealth creation, but there will be no tax deduction.',
  },
  {
    question: 'Can I invest more than ₹1.5 lakh in ELSS?',
    answer:
      'Yes. You can invest any amount in ELSS, but only ₹1.5 lakh qualifies for the Section 80C deduction per financial year under the old tax regime. The amount above ₹1.5 lakh continues to grow with market returns — it just does not get the 80C benefit.',
  },
  {
    question: 'Can I stop my ELSS SIP before the 3-year lock-in ends?',
    answer:
      'Yes, you can stop future SIP instalments at any time. However, each instalment is individually locked in for 3 years from its investment date. So if you started a SIP in April 2023, the April 2023 instalment unlocks in April 2026, the May 2023 instalment in May 2026, and so on.',
  },
  {
    question: 'Can I redeem partial units after the 3-year lock-in?',
    answer:
      'Yes. Once any specific instalment completes its 3-year lock-in, you can partially redeem those units. You do not have to redeem the entire investment at once. Partial redemption is common among investors who continue SIPs while redeeming older locked-in units.',
  },
  {
    question: "What happens if I don't redeem ELSS after 3 years?",
    answer:
      'Nothing negative. Your investment stays invested and continues to grow. You can redeem anytime after the 3-year lock-in. There is no forced exit and no penalty for staying invested longer.',
  },
  {
    question: 'Can I switch from one ELSS fund to another during lock-in?',
    answer:
      'No. Switching is treated as redemption, which is not allowed during the 3-year lock-in period. After the lock-in ends, you can switch or redeem freely.',
  },
  {
    question: 'Is ELSS better than PPF in 2026?',
    answer:
      'It depends on your risk appetite and time horizon. ELSS offers higher return potential (12-15% historically) with a shorter 3-year lock-in, but carries equity market risk. PPF offers a government-guaranteed ~7.1% return with full EEE tax treatment (Exempt-Exempt-Exempt), but has a 15-year lock-in. For long-term wealth creation with moderate risk tolerance, ELSS has historically outperformed. For zero-risk, guaranteed returns, PPF is better.',
  },
  {
    question: 'What is the LTCG tax rate on ELSS in 2026?',
    answer:
      'Long-Term Capital Gains (LTCG) above ₹1.25 lakh per financial year are taxed at 12.5% without indexation. Gains up to ₹1.25 lakh per year remain tax-free. This applies to all equity mutual funds, including ELSS, after a holding period of more than 1 year.',
  },
  {
    question: 'Should I choose SIP or lump sum in ELSS?',
    answer:
      'SIP is recommended for most investors as it spreads investment across market cycles through rupee cost averaging, reducing timing risk. Lump sum can be considered if markets have corrected significantly and you have idle funds. For tax-saving near the year-end (January–March), a one-time lump sum is the only practical option if you have not been doing SIPs.',
  },
  {
    question: 'Can I claim 80C benefit on ELSS every year?',
    answer:
      'Yes. You can invest up to ₹1.5 lakh every financial year under the old tax regime and claim the Section 80C deduction each year. There is no lifetime cap — it resets every financial year.',
  },
  {
    question: 'Do I need to file ITR when I redeem ELSS?',
    answer:
      'You should file ITR if your total income exceeds the basic exemption limit, or if your LTCG from equity mutual funds exceeds ₹1.25 lakh in a financial year. Even if LTCG is below the exemption, it is advisable to report capital gains in your ITR.',
  },
  {
    question: 'How do I choose the best ELSS fund in 2026?',
    answer:
      "Evaluate: (1) consistent 5- and 10-year performance relative to the ELSS category, not absolute returns; (2) expense ratio — direct plans have lower expense ratios than regular plans; (3) AUM and fund house reputation; (4) portfolio quality — large-cap heavy ELSS funds are relatively more stable; (5) fund manager track record. Avoid chasing last year's top performer.",
  },
];

// ─────────────────────────────────────────────────────────────────
// TABLE OF CONTENTS
// ─────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { href: '#what-is-elss', label: 'What is ELSS?' },
  { href: '#old-vs-new-regime', label: 'Old vs New Tax Regime' },
  { href: '#latest-updates', label: 'Latest Updates – April 2026' },
  { href: '#why-elss', label: 'Why Choose ELSS in 2026?' },
  { href: '#who-should-invest', label: "Who Should (and Shouldn't) Invest" },
  { href: '#tax-benefits', label: 'Tax Benefits & LTCG' },
  { href: '#comparison', label: 'ELSS vs PPF vs FD vs NPS' },
  { href: '#how-to-choose', label: 'How to Choose an ELSS Fund' },
  { href: '#sip-vs-lumpsum', label: 'SIP vs Lump Sum' },
  { href: '#how-to-invest', label: 'How to Invest (Step-by-Step)' },
  { href: '#historical-returns', label: 'Historical Returns' },
  { href: '#faq', label: 'Frequently Asked Questions' },
];

export default function ELSSGuide2026() {
  // ── Article Schema ──────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'ELSS Funds Guide 2026: Tax Benefits, Lock-in, Returns & How to Invest',
    description:
      'Most comprehensive 2026 guide to ELSS mutual funds — Section 80C tax benefits (old regime), 3-year lock-in, LTCG rules, comparison with PPF/NPS/FD, fund selection criteria, and how to invest.',
    author: {
      '@type': 'Organization',
      name: 'Fincado Research Team',
      url: 'https://fincado.com/about/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fincado',
      logo: { '@type': 'ImageObject', url: 'https://fincado.com/logo.png' },
    },
    datePublished: '2026-04-01',
    dateModified: '2026-04-09',
    image: 'https://fincado.com/images/guides/elss/elss-guide-hero-2026.webp',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fincado.com/guides/elss-funds-guide-2026/',
    },
  };

  // ── FAQ Schema ──────────────────────────────────────────────────
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // ── HowTo Schema ────────────────────────────────────────────────
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Invest in ELSS Mutual Funds in India',
    description:
      'Step-by-step guide to investing in ELSS tax-saving mutual funds in India via SIP or lump sum.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Choose a Platform',
        text: 'Select a reputed AMC or investment platform such as Groww, Zerodha Coin, Paytm Money, or MF Utility.',
      },
      {
        '@type': 'HowToStep',
        name: 'Select a Direct-Growth ELSS Fund',
        text: 'Pick a Direct-Growth plan of a well-rated ELSS fund with consistent 5-10 year performance, low expense ratio, and strong AUM.',
      },
      {
        '@type': 'HowToStep',
        name: 'Complete KYC',
        text: 'Link your bank account and complete KYC using your PAN, Aadhaar, and a selfie.',
      },
      {
        '@type': 'HowToStep',
        name: 'Start SIP or Lump Sum',
        text: 'Set up a monthly SIP for rupee cost averaging, or invest a lump sum before March 31 to claim the 80C benefit for that financial year.',
      },
    ],
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Structured Data ─────────────────────────────────────── */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'ELSS Guide 2026',
            url: 'https://fincado.com/guides/elss-funds-guide-2026/',
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header className="mb-8 border-b border-slate-200 pb-6">
        <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-800">
          Mutual Funds • Tax Saving 2026
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          ELSS Funds Guide 2026: Tax Benefits, Lock-in, Returns &amp; How to
          Invest
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 18 Min Read
          </span>
          <span>
            Updated:{' '}
            <strong className="text-emerald-700">April 09, 2026</strong>
          </span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified by Fincado Research
            Team
          </span>
        </div>
        <ShareTools title="ELSS Funds Guide 2026 – Fincado" />
      </header>

      {/* ── INTRO CARD ──────────────────────────────────────────── */}
      <Card className="mb-10">
        <div className="relative h-80 w-full bg-emerald-50 rounded-t-2xl overflow-hidden">
          <Image
            src="/images/guides/elss/elss-hero-2026.webp"
            alt="ELSS Mutual Funds 2026 – Tax Saving and Wealth Creation Guide by Fincado"
            fill
            priority
            className="object-cover"
          />
        </div>
        <CardContent className="pt-6 text-lg text-slate-700 leading-relaxed">
          <WikiText
            content={`<p>Equity Linked Savings Scheme (ELSS) is a category of equity mutual fund that qualifies for <strong>Section 80C deduction up to ₹1.5 lakh per year under the old tax regime</strong>. With the shortest lock-in (3 years) among all 80C instruments and historically strong long-term return potential, ELSS is one of the most discussed tax-saving options for salaried investors in India. This guide covers everything: how ELSS works, tax rules, how to choose a fund, SIP vs lump sum, and comparisons with PPF, NPS, and FD.</p>`}
          />
        </CardContent>
      </Card>

      {/* ── TABLE OF CONTENTS ───────────────────────────────────── */}
      <Card className="mb-10 bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-500" /> Contents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-700">
            {TOC_ITEMS.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-start gap-2 py-0.5 hover:text-emerald-700 transition-colors"
                >
                  <span className="text-slate-400 shrink-0 tabular-nums w-5">
                    {i + 1}.
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <AdSlot id="elss-guide-top" type="leaderboard" />

      {/* ── WHAT IS ELSS ────────────────────────────────────────── */}
      <section className="mb-12" id="what-is-elss">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <PieChart className="h-6 w-6 text-indigo-600" /> What is ELSS?
        </h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-700 mb-4">
              ELSS is an open-ended equity mutual fund that invests at least 80%
              of its corpus in equity and equity-related instruments. It is the
              only mutual fund category that qualifies for a tax deduction under
              Section 80C of the Income Tax Act — making it a dual-purpose
              instrument for tax saving and long-term wealth creation.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
                <div>
                  <strong>Tax Deduction</strong>
                  <br />
                  <span className="text-slate-600 text-sm">
                    Up to ₹1.5 lakh u/s 80C (old tax regime only)
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-6 w-6 text-emerald-500 shrink-0" />
                <div>
                  <strong>Lock-in Period</strong>
                  <br />
                  <span className="text-slate-600 text-sm">
                    3 years — shortest among all 80C instruments
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-emerald-500 shrink-0" />
                <div>
                  <strong>Return Potential</strong>
                  <br />
                  <span className="text-slate-600 text-sm">
                    12-15% CAGR historically over 10 years (not guaranteed)
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-emerald-500 shrink-0" />
                <div>
                  <strong>Best Suited For</strong>
                  <br />
                  <span className="text-slate-600 text-sm">
                    Old-regime taxpayers with 5+ year investment horizon
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── OLD VS NEW TAX REGIME ───────────────────────────────── */}
      <section className="mb-12" id="old-vs-new-regime">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> ELSS &amp; Tax
          Regime: Old vs New (2026)
        </h2>
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-slate-800 font-medium mb-4">
              ⚠️ The Section 80C deduction for ELSS is available only under the
              old tax regime.
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aspect</TableHead>
                    <TableHead>Old Tax Regime</TableHead>
                    <TableHead>New Tax Regime</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>80C Deduction on ELSS</TableCell>
                    <TableCell className="text-emerald-700 font-semibold">
                      ✓ Allowed (up to ₹1.5L)
                    </TableCell>
                    <TableCell className="text-red-600 font-semibold">
                      ✗ Not available
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Can you invest in ELSS?</TableCell>
                    <TableCell className="text-emerald-700">Yes</TableCell>
                    <TableCell className="text-emerald-700">
                      Yes (but no 80C benefit)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>LTCG Tax on Redemption</TableCell>
                    <TableCell>12.5% above ₹1.25L</TableCell>
                    <TableCell>12.5% above ₹1.25L</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              If you have opted for the new tax regime in FY 2026, ELSS still
              works as an equity investment — but the primary reason most
              salaried investors choose it (the 80C deduction) does not apply.
              In that case, a regular diversified equity fund may offer more
              flexibility.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ── LATEST 2026 UPDATES ─────────────────────────────────── */}
      <section className="mb-12" id="latest-updates">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-blue-600" /> Latest Updates –
          April 2026
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-3">
            {[
              'LTCG tax remains 12.5% above ₹1.25 lakh (no indexation) — no change in Budget 2026.',
              '80C limit remains ₹1.5 lakh — applicable under old tax regime only.',
              '3-year lock-in period is unchanged.',
              'Direct plan ELSS funds continue to offer lower expense ratios vs regular plans.',
              'New tax regime is now the default for individuals; old regime must be opted in explicitly.',
            ].map((point, i) => (
              <div key={i} className="flex gap-3 items-start">
                <CheckCircle2 className="text-emerald-500 h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm">{point}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* ── WHY CHOOSE ELSS ─────────────────────────────────────── */}
      <section className="mb-12" id="why-elss">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" /> Why Choose ELSS in
          2026?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Shortest Lock-in</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>80C Instrument</TableHead>
                    <TableHead>Lock-in</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold text-emerald-700">
                      ELSS
                    </TableCell>
                    <TableCell className="font-semibold text-emerald-700">
                      3 years
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Saver FD</TableCell>
                    <TableCell>5 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>NSC</TableCell>
                    <TableCell>5 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PPF</TableCell>
                    <TableCell>15 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>NPS</TableCell>
                    <TableCell>Till age 60</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Higher Return Potential
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>
                Equity markets have historically rewarded patient investors. The
                ELSS category average CAGR over 10 years has ranged between{' '}
                <strong>12-15%</strong>, compared to PPF&apos;s current rate of{' '}
                <strong>7.1%</strong>.
              </p>
              <p className="text-amber-700 bg-amber-50 p-3 rounded-lg text-xs">
                ⚠️ Mutual fund returns are subject to market risk. Past
                performance does not guarantee future results.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── WHO SHOULD INVEST ───────────────────────────────────── */}
      <section className="mb-12" id="who-should-invest">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Users className="h-6 w-6 text-violet-600" /> Who Should (and
          Shouldn&apos;t) Invest in ELSS
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* WHO SHOULD */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-base text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> ELSS is suitable for
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  'Salaried or self-employed individuals in the old tax regime',
                  'Investors with an investment horizon of 5+ years',
                  'First-time mutual fund investors wanting equity exposure with a defined lock-in',
                  'Investors who have not yet exhausted their ₹1.5L 80C limit',
                  'Those comfortable with equity market volatility',
                ].map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* WHO SHOULD NOT */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-base text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> ELSS may not suit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  'Investors under the new tax regime (no 80C benefit)',
                  'Those needing funds within 3 years (emergency fund, near-term goals)',
                  'Investors with very low risk tolerance (consider PPF or FD instead)',
                  'Retirees or near-retirement investors relying on stable income',
                  'Those who have already reached the ₹1.5L 80C limit via EPF/LIC etc.',
                ].map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── TAX BENEFITS ────────────────────────────────────────── */}
      <section className="mb-12" id="tax-benefits">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax Benefits –
          Section 80C &amp; LTCG Rules (2026)
        </h2>
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="pt-6 space-y-6">
            <div className="flex justify-between items-center border-b border-emerald-200 pb-4">
              <div>
                <span className="font-medium">Investment Deduction (80C)</span>
                <p className="text-xs text-slate-500 mt-1">
                  Old tax regime only
                </p>
              </div>
              <span className="font-semibold text-emerald-800">
                Up to ₹1.5 Lakh
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-emerald-200 pb-4">
              <div>
                <span className="font-medium">LTCG Tax on Redemption</span>
                <p className="text-xs text-slate-500 mt-1">
                  Above ₹1.25 lakh gains per year
                </p>
              </div>
              <span className="font-semibold text-emerald-800">
                12.5% (no indexation)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">LTCG Exemption</span>
                <p className="text-xs text-slate-500 mt-1">
                  Per financial year
                </p>
              </div>
              <span className="font-semibold text-emerald-800">
                Up to ₹1.25 Lakh (tax-free)
              </span>
            </div>
            <div className="bg-white p-4 rounded-xl border text-sm space-y-2">
              <p>
                <strong>Tax Saving Example (Old Regime):</strong>
              </p>
              <p className="text-slate-600">
                An investor in the 30% tax slab investing ₹1.5 lakh in ELSS can
                save up to{' '}
                <strong className="text-emerald-700">
                  ₹46,800 in income tax
                </strong>{' '}
                (₹1,50,000 × 30% + 4% cess = ₹46,800).
              </p>
              <p className="text-xs text-slate-500">
                Actual savings depend on your tax slab, other 80C investments,
                and applicable surcharge. Consult a tax advisor for personalised
                calculations.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── COMPARISON ──────────────────────────────────────────── */}
      <section className="mb-12" id="comparison">
        <h2 className="mb-6 text-2xl font-semibold">
          ELSS vs PPF vs Tax Saver FD vs NPS (2026)
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>ELSS</TableHead>
                <TableHead>PPF</TableHead>
                <TableHead>Tax Saver FD</TableHead>
                <TableHead>NPS Tier I</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Return Potential</TableCell>
                <TableCell className="text-emerald-600 font-semibold">
                  12-15% (market-linked)
                </TableCell>
                <TableCell>7.1% (guaranteed)</TableCell>
                <TableCell>6-7.5% (fixed)</TableCell>
                <TableCell>8-12% (asset mix)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Lock-in</TableCell>
                <TableCell className="text-emerald-600 font-semibold">
                  3 years
                </TableCell>
                <TableCell>15 years</TableCell>
                <TableCell>5 years</TableCell>
                <TableCell>Till age 60</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Risk</TableCell>
                <TableCell>High (equity)</TableCell>
                <TableCell>Zero (sovereign)</TableCell>
                <TableCell>Low (deposit)</TableCell>
                <TableCell>Medium (mixed)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tax on Returns</TableCell>
                <TableCell>LTCG 12.5% above ₹1.25L</TableCell>
                <TableCell className="text-emerald-600 font-semibold">
                  EEE (fully exempt)
                </TableCell>
                <TableCell>Interest taxable as income</TableCell>
                <TableCell>60% EEE, 40% annuity taxable</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">80C Limit</TableCell>
                <TableCell>₹1.5L</TableCell>
                <TableCell>₹1.5L</TableCell>
                <TableCell>₹1.5L</TableCell>
                <TableCell>₹1.5L + extra ₹50K u/s 80CCD</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Wealth + Tax (long horizon)</TableCell>
                <TableCell>Risk-free savings</TableCell>
                <TableCell>Capital safety</TableCell>
                <TableCell>Retirement corpus</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* ── HOW TO CHOOSE AN ELSS FUND ──────────────────────────── */}
      <section className="mb-12" id="how-to-choose">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" /> How to Choose the Best
          ELSS Fund in 2026
        </h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-700 text-sm mb-6">
              Avoid picking a fund based only on last year&apos;s returns.
              Evaluate across these five dimensions:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: '1. Consistent Long-Term Performance',
                  desc: 'Check 5-year and 10-year CAGR vs the ELSS category average and the Nifty 500 TRI benchmark. One-year performance can be misleading.',
                },
                {
                  title: '2. Expense Ratio (Direct Plan)',
                  desc: 'Direct plans have no distributor commission and deliver 0.5-1% higher returns annually vs regular plans. Always choose the Direct-Growth option.',
                },
                {
                  title: '3. Fund House Reputation & AUM',
                  desc: 'Invest with established AMCs (Mirae, Axis, Parag Parikh, HDFC, ICICI Prudential, etc.) with a strong compliance and risk management track record. AUM above ₹5,000 crore adds stability.',
                },
                {
                  title: '4. Portfolio Quality',
                  desc: 'Large-cap-heavy ELSS funds tend to be less volatile. Check the top 10 holdings and sector allocation. Concentration risk in a single sector is a red flag.',
                },
                {
                  title: '5. Fund Manager Track Record',
                  desc: 'Look at how the current fund manager has performed across market cycles, including downturns. Manager continuity matters — recent manager changes warrant extra scrutiny.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {item.title}
                    </p>
                    <p className="text-slate-600 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── SIP VS LUMP SUM ─────────────────────────────────────── */}
      <section className="mb-12" id="sip-vs-lumpsum">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-teal-600" /> SIP vs Lump Sum in
          ELSS
        </h2>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Factor</TableHead>
                  <TableHead>SIP</TableHead>
                  <TableHead>Lump Sum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Market Timing Risk
                  </TableCell>
                  <TableCell className="text-emerald-700">
                    Low (rupee cost averaging)
                  </TableCell>
                  <TableCell>High (enters at a single point)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Liquidity Management
                  </TableCell>
                  <TableCell className="text-emerald-700">
                    Easier (fixed monthly amount)
                  </TableCell>
                  <TableCell>Requires lump fund availability</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Lock-in Calculation
                  </TableCell>
                  <TableCell>
                    Each instalment locked 3 years from its date
                  </TableCell>
                  <TableCell className="text-emerald-700">
                    Entire amount unlocks together after 3 years
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Best When</TableCell>
                  <TableCell>Regular income, unsure of market levels</TableCell>
                  <TableCell>
                    Market correction, year-end tax planning, idle funds
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Recommended For</TableCell>
                  <TableCell className="text-emerald-700 font-semibold">
                    Most investors (default choice)
                  </TableCell>
                  <TableCell>
                    Experienced investors with surplus funds
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-slate-500 mt-4">
              Note: If you start an ELSS SIP in April 2026, the final instalment
              (March 2027) will only unlock in March 2030 — plan your redemption
              timeline accordingly.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ── HOW TO INVEST ────────────────────────────────────────── */}
      <section className="mb-12" id="how-to-invest">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <Download className="h-6 w-6 text-purple-600" /> How to Invest in ELSS
          (Step-by-Step)
        </h2>
        <ol className="space-y-5 text-slate-700">
          {[
            {
              step: '1',
              title: 'Confirm your tax regime',
              desc: 'ELSS 80C deduction applies only under the old tax regime. If you are in the new regime, confirm whether switching makes financial sense for you.',
            },
            {
              step: '2',
              title: 'Choose a platform',
              desc: 'Use a reputed platform: Groww, Zerodha Coin, Paytm Money, ET Money, MF Utility, or directly through the AMC website.',
            },
            {
              step: '3',
              title: 'Select Direct-Growth plan',
              desc: 'Always pick the Direct-Growth plan of your chosen ELSS fund — never the Regular plan, which pays distributor commissions and delivers lower returns.',
            },
            {
              step: '4',
              title: 'Complete KYC',
              desc: 'Link your bank account and complete KYC using PAN, Aadhaar, and a live selfie. KYC is a one-time process valid across all mutual funds.',
            },
            {
              step: '5',
              title: 'Start SIP or invest lump sum',
              desc: 'Set a monthly SIP for disciplined investing, or invest a lump sum before March 31 to claim the 80C deduction for the current financial year.',
            },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <span className="bg-purple-100 text-purple-700 font-semibold w-8 h-8 flex items-center justify-center rounded-2xl shrink-0">
                {item.step}
              </span>
              <div>
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── HISTORICAL RETURNS ──────────────────────────────────── */}
      <section className="mb-12" id="historical-returns">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-indigo-600" /> Historical Returns
          (ELSS Category Average)
        </h2>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>ELSS Category CAGR (approx.)</TableHead>
                  <TableHead>PPF Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>3 Years</TableCell>
                  <TableCell className="font-semibold">16-20%</TableCell>
                  <TableCell>7.1%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5 Years</TableCell>
                  <TableCell className="font-semibold">15-19%</TableCell>
                  <TableCell>7.1%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10 Years</TableCell>
                  <TableCell className="font-semibold">13-16%</TableCell>
                  <TableCell>~7.5% (historical avg.)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-slate-500 mt-4">
              Source: AMFI category data. CAGR ranges represent top-quartile to
              median funds as of April 2026. Past returns are not indicative of
              future performance. Individual fund returns may vary
              significantly.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ── FAQS ────────────────────────────────────────────────── */}
      <section className="mb-12" id="faq">
        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-slate-500" /> Frequently Asked
          Questions (2026)
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {FAQ_ITEMS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border rounded-2xl px-4 bg-white"
            >
              <AccordionTrigger className="text-left font-semibold text-sm">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-0 mb-10">
        <CardContent className="p-10 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Ready to Start Saving Tax &amp; Building Wealth?
          </h2>
          <p className="text-blue-100 text-sm mb-6">
            Use our calculators to plan your ELSS investment and estimate
            returns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sip-calculator/"
              className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              ELSS SIP Calculator
            </Link>
            <Link
              href="/income-tax-calculator/"
              className="border border-white/50 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Income Tax Calculator
            </Link>
            <Link
              href="/guides/ppf-guide/"
              className="border border-white/50 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              PPF Guide →
            </Link>
          </div>
        </CardContent>
      </Card>

      <AdSlot id="elss-guide-bottom" type="leaderboard" />
      <AuthorBio />

      {/* ── DISCLAIMER ──────────────────────────────────────────── */}
      <div className="text-xs text-slate-500 italic mt-8 bg-slate-50 p-6 rounded-2xl border">
        <strong>Disclaimer:</strong> Mutual Fund investments are subject to
        market risks. Returns mentioned are historical category averages and are
        not indicative of future performance. Tax benefits are subject to
        applicable tax laws and your chosen tax regime. The Section 80C
        deduction is available only under the old tax regime. This content is
        for informational purposes only and does not constitute financial or tax
        advice. Please consult a SEBI-registered investment advisor or a
        chartered accountant before making investment decisions.
      </div>
    </article>
  );
}
