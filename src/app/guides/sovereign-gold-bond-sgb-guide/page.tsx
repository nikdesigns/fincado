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
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  Scale,
  Landmark,
  Wallet,
  Clock,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: 'Sovereign Gold Bonds (SGB) Guide 2025: Interest, Tax & Redemption',
  description:
    'Complete guide to Sovereign Gold Bonds (SGB) in India. Learn about 2.5% interest, tax-free redemption, and why SGB is better than physical gold.',
  alternates: {
    canonical: 'https://fincado.com/guides/sovereign-gold-bond-sgb-guide/',
  },
  openGraph: {
    title: 'Sovereign Gold Bonds (SGB) Guide 2025',
    description:
      'Invest in Gold + Earn 2.5% Interest. Tax-free maturity and government guarantee. Read the full SGB guide.',
    type: 'article',
    url: 'https://fincado.com/guides/sovereign-gold-bond-sgb-guide/',
    images: [
      { url: '/images/guides/sgb/sgb-hero.webp', width: 1200, height: 630 },
    ],
  },
};

export default function SGBGuide() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Sovereign Gold Bonds (SGB): Interest, Tax Benefits & Redemption (2025 Guide)',
    description:
      'Comprehensive guide to Sovereign Gold Bonds (SGB), covering interest rates, tax benefits, redemption rules, and comparison with physical gold.',
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
    datePublished: '2025-01-10',
    dateModified: '2025-01-10',
    image: '/images/guides/sgb/sgb-hero.webp',
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'SGB Guide',
            url: 'https://fincado.com/guides/sovereign-gold-bond-sgb-guide/',
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-amber-100 text-amber-800 hover:bg-amber-200 px-3 py-1"
        >
          Gold Investment
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Sovereign Gold Bonds (SGB): Interest, Tax Benefits & Redemption (2025
          Guide)
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 10 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jan 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Fact-Checked
          </span>
        </div>
        <div className="mt-6">
          <ShareTools title="Sovereign Gold Bonds (SGB) Guide" />
        </div>
      </header>

      {/* --- HERO IMAGE --- */}
      <Card className="mb-10 border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-64 w-full sm:h-80 md:h-96 bg-amber-50">
          <Image
            src="/images/guides/sgb/sgb-hero.webp"
            alt="Sovereign Gold Bonds: Gold plus Interest Benefit"
            fill
            priority
            className="object-cover"
          />
        </div>
      </Card>

      <div className="prose prose-slate max-w-none text-slate-700 mb-8">
        <WikiText
          content={`
          <p>Sovereign Gold Bonds (SGB) are one of the smartest ways for Indians to invest in gold without worrying about storage, purity, or making charges. Backed by the Government of India and issued by the Reserve Bank of India (RBI), SGBs combine the price appreciation of gold with extra interest and attractive tax benefits, making them a powerful long-term wealth creation tool.</p>
          <p><em>Note: Exact interest rates, issue prices, and tranche dates change over time; always check the latest RBI or bank communication before investing.</em></p>
        `}
        />
      </div>

      {/* 💰 AD SLOT 1 */}
      <div className="no-print my-8">
        <AdSlot id="sgb-guide-top" type="leaderboard" />
      </div>

      {/* --- SECTION 1: WHAT IS SGB --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Landmark className="h-6 w-6 text-amber-600" /> What Are Sovereign
          Gold Bonds (SGB)?
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            {/* ✅ NEW: Internal Link to Inflation Calculator */}
            <p className="mb-4 text-slate-700">
              Sovereign Gold Bonds are government securities denominated in
              grams of gold. Instead of buying physical gold, you buy these
              bonds to beat inflation. Use our{' '}
              <Link
                href="/inflation-calculator/"
                className="text-blue-600 hover:underline"
              >
                Inflation Calculator
              </Link>{' '}
              to see how gold preserves your purchasing power over time.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Issuer:</strong> Govt of India (via RBI)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Denomination:</strong> 1 unit = 1 gram
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Tenure:</strong> 8 years (exit from 5th year)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Interest:</strong> 2.5% p.a. (Fixed)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 2 */}
      <div className="no-print my-8">
        <AdSlot id="sgb-guide-features-rect" type="box" />
      </div>

      {/* --- SECTION 2: SGB VS PHYSICAL --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="h-6 w-6 text-blue-600" /> Why SGB Is Better Than
          Physical Gold
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-100 bg-emerald-50/30 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">
                SGB Advantages
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Zero Charges:</strong> No making charges or wastage.
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>100% Purity:</strong> Benchmark 999 gold.
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Zero Risk:</strong> No storage or theft worry
                    (Demat).
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Extra Income:</strong> Earn 2.5% interest annually.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/20 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-800 text-lg">
                Physical Gold Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>
                    <strong>High Cost:</strong> Making charges (8-25%).
                  </span>
                </li>
                <li className="flex gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>
                    <strong>Wastage:</strong> Loss on resale/exchange.
                  </span>
                </li>
                <li className="flex gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>
                    <strong>Storage Risk:</strong> Theft, locker charges.
                  </span>
                </li>
                <li className="flex gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                  <span>
                    <strong>Zero Income:</strong> Does not generate passive
                    cash.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm text-amber-900">
          <strong>Example:</strong> If you invest ₹3 Lakh in SGB, you get{' '}
          <strong>₹7,500 annual interest</strong> credited to your bank, PLUS
          the bond value grows with gold prices.
        </div>

        {/* IMAGE: SGB vs Physical */}
        <div className="mt-8 overflow-hidden rounded-xl bg-slate-50 border border-slate-200 flex justify-center shadow-sm">
          <Image
            src="/images/guides/sgb/sgb-vs-physical.webp"
            alt="Comparison: Sovereign Gold Bond vs Physical Gold"
            width={800}
            height={400}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* 💰 AD SLOT 3 */}
      <div className="no-print my-8">
        <AdSlot id="sgb-guide-mid-banner" type="leaderboard" />
      </div>

      {/* --- SECTION 3: TAX BENEFITS --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" /> Tax-Free Capital
          Gains (8 Years)
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Maturity Benefit
                </h3>
                <p className="text-sm">
                  Capital gains arising at redemption on maturity (after 8
                  years) are <strong>exempt from income tax</strong> for
                  individuals.
                </p>
              </div>
              <div className="bg-emerald-50 p-3 rounded border border-emerald-100 text-sm">
                <strong>Example:</strong> Invest ₹3 Lakh → Redeem ₹5.5 Lakh
                after 8 years. The <strong>₹2.5 Lakh gain is Tax-Free</strong>.
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Interest Tax</h3>
                {/* ✅ NEW: Internal Link to Income Tax Calculator */}
                <p className="text-sm">
                  The semi-annual interest (2.5% p.a.) is taxable. You can check
                  your tax slab liability using our{' '}
                  <Link
                    href="/income-tax-calculator/"
                    className="text-blue-600 hover:underline"
                  >
                    Income Tax Calculator
                  </Link>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 4 */}
      <div className="no-print my-8">
        <AdSlot id="sgb-guide-tax-rect" type="box" />
      </div>

      {/* --- SECTION 4: HOW TO BUY --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Wallet className="h-6 w-6 text-purple-600" /> How to Buy SGB
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900">Banks</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Log in to Net Banking or visit branch. Fill form & pay.
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900">
                Brokers (Demat)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Use apps like Zerodha/Upstox. Search SGB & place order.
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-900">
                Secondary Market
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              Buy existing units on NSE/BSE through Demat account.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 💰 AD SLOT 5 */}
      <div className="no-print my-8">
        <AdSlot id="sgb-guide-buying-banner" type="leaderboard" />
      </div>

      {/* --- SECTION 5: REDEMPTION --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-orange-600" /> Premature
          Withdrawal Rules
        </h2>
        <Card className="border-slate-200">
          <CardContent className="pt-6">
            <ul className="space-y-4 text-slate-700 text-sm">
              <li className="flex gap-3">
                <div className="bg-orange-100 p-2 rounded-full h-8 w-8 flex items-center justify-center text-orange-700 font-bold text-xs">
                  1
                </div>
                <div>
                  <strong>Early Redemption (RBI):</strong> From 5th year onwards
                  on interest payment dates.
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-orange-100 p-2 rounded-full h-8 w-8 flex items-center justify-center text-orange-700 font-bold text-xs">
                  2
                </div>
                <div>
                  <strong>Stock Exchanges:</strong> Sell anytime on NSE/BSE if
                  held in Demat (High liquidity).
                </div>
              </li>
              <li className="flex gap-3">
                <div className="bg-orange-100 p-2 rounded-full h-8 w-8 flex items-center justify-center text-orange-700 font-bold text-xs">
                  3
                </div>
                <div>
                  <strong>Loan Against SGB:</strong> Use as collateral for loans
                  instead of selling.
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* 💰 AD SLOT 6 */}
      <div className="no-print my-8">
        <AdSlot id="sgb-guide-redemption-rect" type="box" />
      </div>

      {/* --- SECTION 6: COMPARISON TABLE --- */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="h-6 w-6 text-teal-600" /> Quick Comparison
        </h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100">
                <TableHead className="font-bold text-slate-900">
                  Feature
                </TableHead>
                <TableHead className="font-bold text-slate-900">SGB</TableHead>
                <TableHead className="font-bold text-slate-900">
                  Physical Gold
                </TableHead>
                <TableHead className="font-bold text-slate-900">
                  Gold ETF
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Backed by
                </TableCell>
                <TableCell>Govt of India</TableCell>
                <TableCell>Self</TableCell>
                <TableCell>
                  {/* ✅ NEW: Internal Link to Mutual Funds */}
                  <Link
                    href="/mutual-funds/"
                    className="text-blue-600 hover:underline"
                  >
                    Mutual Fund
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Interest
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  2.5% p.a.
                </TableCell>
                <TableCell>No</TableCell>
                <TableCell>No</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Charges
                </TableCell>
                <TableCell className="text-emerald-600">Zero</TableCell>
                <TableCell className="text-red-600">Making/Storage</TableCell>
                <TableCell>Expense Ratio</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Maturity Tax
                </TableCell>
                <TableCell className="text-emerald-600 font-bold">
                  Tax-Free
                </TableCell>
                <TableCell>Taxable</TableCell>
                <TableCell>Taxable</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-slate-700">
                  Purity Risk
                </TableCell>
                <TableCell className="text-emerald-600">None</TableCell>
                <TableCell className="text-red-600">Yes</TableCell>
                <TableCell>None</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 💰 AD SLOT 7 */}
      <div className="no-print my-8">
        <AdSlot id="sgb-guide-bottom" type="leaderboard" />
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Take
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            Sovereign Gold Bonds are ideal if you want{' '}
            <strong>long-term exposure to gold (5–8 years)</strong> without
            storage or purity worries.
          </p>
          <ul className="space-y-3 mb-6 text-slate-300 text-sm">
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Earn <strong>2.5% extra interest</strong> on top of gold price.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Enjoy <strong>Tax-Free maturity</strong> after 8 years.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Combines cultural comfort with financial intelligence.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> Sovereign Gold Bond details (interest
          rates, issue dates) are subject to RBI notifications. Gold prices are
          subject to market risks. This article is for educational purposes only
          and does not constitute financial advice.
        </p>
      </div>
    </article>
  );
}
