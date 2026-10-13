import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Calculator,
  Check,
  Info,
  Landmark,
  Lightbulb,
  PiggyBank,
  Scale,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FAQSchema from '@/components/FAQSchema';
import InlineTaxCalculator from '@/components/InlineTaxCalculator';
import ShareTools from '@/components/ShareTools';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DEFAULT_ASSUMPTIONS,
  TAX_RULES,
  computeTax,
  inHand,
  inr,
  lakh,
  oldRegimeBreakEven,
  pct,
  type TaxResult,
} from '@/lib/incomeTax';
import {
  SALARY_TAX_PAGES,
  getSalaryTaxPage,
  type SalaryTaxPage,
} from '@/lib/salaryTaxPages';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const CARD =
  'rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-brand-500 hover:shadow-xl hover:shadow-slate-900/5';
const PANEL = 'rounded-2xl border border-slate-200 bg-white';

const SITE = 'https://fincado.com';
const OG_IMAGE = '/og-image.png';

const label = (l: number) => `${String(l)} Lakh`;
const labelLower = (l: number) => `₹${String(l)} lakh`;

function buildData(lakhs: number) {
  const page = getSalaryTaxPage(lakhs);
  const gross = Math.round(lakhs * 1_00_000);
  const L = TAX_RULES.limits;
  const maxDed = Math.max(0, gross - TAX_RULES.old.standardDeduction);

  const newR = computeTax(gross, 'new');
  const old0 = computeTax(gross, 'old', 0);
  const d1 = Math.min(maxDed, L.sec80C + L.sec80D);
  const d2 = Math.min(maxDed, d1 + L.sec80CCD1B + L.homeLoanInterest);
  const old1 = computeTax(gross, 'old', d1);
  const old2 = computeTax(gross, 'old', d2);
  const breakEven = oldRegimeBreakEven(gross);

  const handNew = inHand(gross, 'new');
  const handOld = inHand(gross, 'old', d1);

  const basic = gross * DEFAULT_ASSUMPTIONS.basicShare;
  const nps = Math.round(basic * TAX_RULES.employerNpsCap.new);
  const newNps = computeTax(gross, 'new', nps);

  const raise = computeTax(gross + 1_00_000, 'new').total - newR.total;
  const oldBest = old1.total < old0.total ? old1 : old0;

  return {
    page,
    gross,
    newR,
    old0,
    old1,
    old2,
    d1,
    d2,
    breakEven,
    handNew,
    handOld,
    nps,
    newNps,
    npsSaving: newR.total - newNps.total,
    raise,
    saving: old1.total - newR.total,
    oldBest,
    zero: newR.total === 0,
  };
}

type Data = ReturnType<typeof buildData>;

function summary(d: Data) {
  const s = labelLower(d.page.lakh);
  if (d.zero)
    return `On a ${s} salary you pay zero income tax in ${TAX_RULES.fy} under the new regime. After the ${inr(TAX_RULES.new.standardDeduction)} standard deduction your taxable income is ${lakh(d.newR.taxable)}, within the ₹12 lakh limit for the Section 87A rebate. Monthly in-hand pay is about ${inr(d.handNew.monthly)}.`;
  return `On a ${s} salary you pay ${inr(d.newR.total)} income tax in ${TAX_RULES.fy} under the new regime, an effective rate of ${pct(d.newR.effectiveRate)}. Monthly in-hand pay is about ${inr(d.handNew.monthly)}. The old regime costs ${inr(d.old0.total)} with no deductions, or ${inr(d.old1.total)} with full 80C and 80D.`;
}

function faqs(d: Data) {
  const s = labelLower(d.page.lakh);
  const lpa = `${d.page.lakh} LPA`;
  const list = [
    {
      question: `How much income tax do I pay on a ${s} salary in ${TAX_RULES.fy}?`,
      answer: d.zero
        ? `Nothing under the new tax regime. Taxable income after the ₹75,000 standard deduction is ${lakh(d.newR.taxable)}, and the Section 87A rebate (up to ₹60,000) wipes out the tax for taxable income up to ₹12 lakh. Under the old regime with no deductions you would pay ${inr(d.old0.total)}.`
        : `${inr(d.newR.total)} under the new tax regime, including 4% health and education cess. Taxable income after the ₹75,000 standard deduction is ${lakh(d.newR.taxable)}${d.newR.marginalRelief > 0 ? `, and marginal relief caps the tax at the income above ₹12 lakh` : ''}. Under the old regime you would pay ${inr(d.old0.total)} with no deductions.`,
    },
    {
      question: `What is the monthly in-hand salary for ${lpa}?`,
      answer: `About ${inr(d.handNew.monthly)} a month under the new regime. This assumes basic pay is 50% of the salary, employee PF at 12% of basic (${inr(Math.round(d.handNew.employeePf / 12))} a month), ₹200 professional tax and monthly TDS of ${inr(Math.round(d.newR.total / 12))}. Your exact figure depends on your salary structure.`,
    },
    {
      question: `Which tax regime is better for a ${s} salary?`,
      answer:
        d.zero || d.breakEven === null
          ? `The new regime. It already makes your tax zero, so old-regime deductions can at best tie with it, and only after you invest at least ${inr(d.breakEven ?? 0)} in tax-saving options.`
          : d.breakEven <= d.d1
            ? `The old regime can win: you only need about ${inr(d.breakEven)} of deductions beyond the standard deduction to match the new regime's ${inr(d.newR.total)}.`
            : `The new regime for most people. The old regime only wins if your deductions (80C, 80D, HRA, home-loan interest, NPS) exceed about ${inr(d.breakEven)}. With just 80C and 80D (${inr(d.d1)}) the old regime costs ${inr(d.old1.total)}, ${inr(d.saving)} more than the new regime.`,
    },
    {
      question: `How much TDS will be deducted every month on ${lpa}?`,
      answer: d.zero
        ? `Usually none, as long as you declare the new regime to your employer and have no other income that pushes taxable income above ₹12 lakh.`
        : `About ${inr(Math.round(d.newR.total / 12))} a month under the new regime, if your employer spreads the annual tax of ${inr(d.newR.total)} evenly across 12 months.`,
    },
  ];
  if (d.npsSaving > 0)
    list.push({
      question: `How can I reduce tax on ${s} under the new regime?`,
      answer: `Ask your employer to route part of your CTC into NPS. Employer contributions up to 14% of basic pay are deductible under Section 80CCD(2) even in the new regime. At ${inr(d.nps)} a year, your tax falls from ${inr(d.newR.total)} to ${inr(d.newNps.total)}, a saving of ${inr(d.npsSaving)}.`,
    });
  else
    list.push({
      question: `Is a ${s} salary tax-free?`,
      answer: d.zero
        ? `Under the new regime, yes, for salary income. Salaried people pay no tax up to ₹12.75 lakh (₹12 lakh plus the ₹75,000 standard deduction). The rebate does not cover special-rate income such as equity capital gains.`
        : `No. The new regime makes salary tax-free only up to ₹12.75 lakh.`,
    });
  return list;
}

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export function salaryTaxMetadata(lakhs: number): Metadata {
  const d = buildData(lakhs);
  const s = `₹${label(lakhs)}`;
  const url = `${SITE}${d.page.href}`;
  const title = d.zero
    ? `Tax on ${s} Salary ${TAX_RULES.fy}: Zero Tax + In-Hand Pay`
    : `Tax on ${s} Salary ${TAX_RULES.fy}: ${inr(d.newR.total)} + In-Hand`;
  const description = d.zero
    ? `${s} salary is tax-free under the new regime in ${TAX_RULES.fy}. See the 87A rebate working, monthly in-hand pay (${inr(d.handNew.monthly)}) and old vs new regime.`
    : `Tax on ${s} salary: ${inr(d.newR.total)} (new regime) vs ${inr(d.old0.total)} (old, no deductions). In-hand ${inr(d.handNew.monthly)}/month. Slab-wise working and break-even.`;
  return {
    title,
    description,
    keywords: [
      `tax on ${lakhs} lakh salary`,
      `${lakhs} lakh salary tax`,
      `${lakhs} lpa in hand salary`,
      `income tax on ${lakhs} lakh new regime`,
      `${lakhs} lakh salary tax ${TAX_RULES.fy.toLowerCase()}`,
      `new vs old regime ${lakhs} lakh`,
    ],
    authors: [{ name: 'Nitin Kaushik', url: `${SITE}/about/` }],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: d.page.published,
      modifiedTime: TAX_RULES.lastReviewed,
      authors: ['Nitin Kaushik'],
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `Tax on ${s} salary` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

/* ------------------------------------------------------------------ */
/* UI pieces                                                           */
/* ------------------------------------------------------------------ */

function Eyebrow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}

function SectionHead({
  id,
  icon: Icon,
  title,
  lede,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lede?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2
        id={id}
        className="flex scroll-mt-24 items-center gap-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-brand-400">
          <Icon className="h-5 w-5" />
        </span>
        {title}
      </h2>
      {lede && <p className="mt-3 text-base leading-relaxed text-slate-600">{lede}</p>}
    </div>
  );
}

function rangeLabel(from: number, to: number, last: boolean) {
  const f = from === 0 ? '₹0' : lakh(from).replace(' lakh', 'L');
  const t = lakh(to).replace(' lakh', 'L');
  return last && to === from ? `Above ${f}` : `${f} – ${t}`;
}

function SlabTable({ r, caption }: { r: TaxResult; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-xs sm:text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-3 sm:px-4 font-semibold">Income slab</th>
            <th className="px-3 py-3 sm:px-4 font-semibold">Rate</th>
            <th className="px-3 py-3 sm:px-4 text-right font-semibold">Amount taxed</th>
            <th className="px-3 py-3 sm:px-4 text-right font-semibold">Tax</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {r.rows.map((row, i) => (
            <tr key={i}>
              <td className="px-3 py-3 sm:px-4 text-slate-700">
                {rangeLabel(row.from, row.to, i === r.rows.length - 1)}
              </td>
              <td className="px-3 py-3 sm:px-4 text-slate-700">{row.rate === 0 ? 'Nil' : pct(row.rate, 0)}</td>
              <td className="px-3 py-3 sm:px-4 text-right tabular-nums text-slate-700">{inr(row.taxed)}</td>
              <td className="px-3 py-3 sm:px-4 text-right font-medium tabular-nums text-slate-900">{inr(row.tax)}</td>
            </tr>
          ))}
        </tbody>
        <tbody className="border-t border-slate-200 bg-slate-50/60">
          <tr>
            <td colSpan={3} className="px-3 py-2.5 sm:px-4 font-medium text-slate-700">Tax on slabs</td>
            <td className="px-3 py-2.5 sm:px-4 text-right font-semibold tabular-nums text-slate-900">{inr(r.slabTax)}</td>
          </tr>
          {r.rebate > 0 && (
            <tr>
              <td colSpan={3} className="px-3 py-2.5 sm:px-4 text-slate-700">Less: Section 87A rebate</td>
              <td className="px-3 py-2.5 sm:px-4 text-right tabular-nums text-green-700">−{inr(r.rebate)}</td>
            </tr>
          )}
          {r.marginalRelief > 0 && (
            <tr>
              <td colSpan={3} className="px-3 py-2.5 sm:px-4 text-slate-700">Less: marginal relief</td>
              <td className="px-3 py-2.5 sm:px-4 text-right tabular-nums text-green-700">−{inr(r.marginalRelief)}</td>
            </tr>
          )}
          {r.surcharge > 0 && (
            <tr>
              <td colSpan={3} className="px-3 py-2.5 sm:px-4 text-slate-700">Add: surcharge</td>
              <td className="px-3 py-2.5 sm:px-4 text-right tabular-nums text-slate-900">{inr(r.surcharge)}</td>
            </tr>
          )}
          <tr>
            <td colSpan={3} className="px-3 py-2.5 sm:px-4 text-slate-700">Add: 4% health &amp; education cess</td>
            <td className="px-3 py-2.5 sm:px-4 text-right tabular-nums text-slate-900">{inr(r.cess)}</td>
          </tr>
          <tr className="bg-slate-900 text-white">
            <td colSpan={3} className="px-3 py-3 sm:px-4 font-semibold">Total tax payable</td>
            <td className="px-3 py-3 sm:px-4 text-right text-base font-bold tabular-nums text-brand-400">{inr(r.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Stat({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-medium text-slate-400">{k}</p>
      <p className="mt-1 text-xl font-bold tabular-nums text-white sm:text-2xl">{v}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const TOC = [
  { id: 'calculation', t: 'Slab-wise calculation' },
  { id: 'old-vs-new', t: 'New vs old regime' },
  { id: 'in-hand', t: 'Monthly in-hand salary' },
  { id: 'save-tax', t: 'How to pay less tax' },
  { id: 'calculator', t: 'Check your own numbers' },
  { id: 'other-salaries', t: 'Tax at other salaries' },
  { id: 'faqs', t: 'FAQs' },
];

export default function SalaryTaxGuide({ lakh: lakhs }: { lakh: number }) {
  const d = buildData(lakhs);
  const { page, gross, newR } = d;
  const S = `₹${label(lakhs)}`;
  const s = labelLower(lakhs);
  const url = `${SITE}${page.href}`;
  const h1 = `Tax on ${S} Salary in ${TAX_RULES.fy}`;
  const faqList = faqs(d);

  const idx = SALARY_TAX_PAGES.findIndex((p) => p.lakh === lakhs);
  const neighbours = [SALARY_TAX_PAGES[idx - 1], SALARY_TAX_PAGES[idx + 1]].filter(
    Boolean,
  ) as SalaryTaxPage[];

  const shares = [
    { k: 'In-hand pay', v: d.handNew.annual, c: 'bg-brand-400' },
    { k: 'Income tax', v: d.handNew.tax, c: 'bg-slate-900' },
    { k: 'Your PF', v: d.handNew.employeePf, c: 'bg-orange-400' },
    { k: 'Professional tax', v: d.handNew.professionalTax, c: 'bg-slate-300' },
  ].filter((x) => x.v > 0);

  const verdict = d.zero
    ? 'Zero tax under the new regime'
    : d.breakEven !== null && d.breakEven <= d.d1
      ? 'Old regime can win with 80C + 80D'
      : 'New regime is cheaper for most people';

  const nextSlab = TAX_RULES.new.slabs.find((sl) => sl.upTo > newR.taxable);
  const toNext =
    nextSlab && Number.isFinite(nextSlab.upTo) ? nextSlab.upTo - newR.taxable : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${SITE}/` },
          { name: 'Guides', url: `${SITE}/guides/` },
          { name: 'Tax Planning', url: `${SITE}/guides/tax/` },
          { name: `Tax on ${S} Salary`, url },
        ]}
      />
      <FAQSchema faqs={faqList} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: h1,
            description: summary(d),
            image: [`${SITE}${OG_IMAGE}`],
            inLanguage: 'en-IN',
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            author: {
              '@type': 'Person',
              '@id': `${SITE}/#founder`,
              name: 'Nitin Kaushik',
              url: `${SITE}/about/`,
            },
            publisher: { '@id': `${SITE}/#organization` },
            datePublished: page.published,
            dateModified: TAX_RULES.lastReviewed,
            about: [
              { '@type': 'Thing', name: 'Income tax in India' },
              { '@type': 'Thing', name: 'New tax regime' },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-slate-900">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/guides/" className="hover:text-slate-900">Guides</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/guides/tax/" className="hover:text-slate-900">Tax</Link></li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">{S} salary</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="mb-8 max-w-4xl">
        <Eyebrow icon={Landmark}>Income tax guide · {TAX_RULES.fy} ({TAX_RULES.ay})</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {h1}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{summary(d)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <BadgeCheck className="h-4 w-4 text-brand-600" />
            By <Link href="/about/" className="font-medium text-slate-800 hover:underline">Nitin Kaushik</Link>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> Updated {TAX_RULES.lastReviewedLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-4 w-4" /> Budget 2026 rules
          </span>
        </div>
      </header>

      {/* Answer panel */}
      <section
        aria-label="Summary"
        className="mb-12 overflow-hidden rounded-3xl bg-slate-900 p-6 text-white sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-400 px-3 py-1 text-xs font-semibold text-slate-900">
              <Check className="h-3.5 w-3.5" /> {verdict}
            </p>
            <p className="mt-5 text-sm text-slate-400">Tax on {s} · new regime</p>
            <p className="mt-1 text-5xl font-bold tracking-tight tabular-nums text-brand-400 sm:text-6xl">
              {inr(newR.total)}
            </p>
            <p className="mt-3 text-sm text-slate-300">
              {d.zero
                ? `87A rebate cancels ${inr(newR.rebate)} of slab tax.`
                : `${pct(newR.effectiveRate)} of your salary · ${inr(Math.round(newR.total / 12))} TDS a month`}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat k="Monthly in-hand" v={inr(d.handNew.monthly)} sub="New regime, after PF & PT" />
            <Stat k="Old regime tax" v={inr(d.old0.total)} sub="With no deductions" />
            <Stat
              k="Old regime, 80C + 80D"
              v={inr(d.old1.total)}
              sub={`${inr(d.d1)} of deductions`}
            />
            <Stat
              k={d.saving >= 0 ? 'New regime saves' : 'Old regime saves'}
              v={inr(Math.abs(d.saving))}
              sub="vs old with 80C + 80D"
            />
          </div>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0">
          {/* Calculation */}
          <section className="mb-14">
            <SectionHead
              id="calculation"
              icon={Calculator}
              title={`How tax on ${s} is calculated`}
              lede={
                <>
                  Start with your gross salary of <strong>{inr(gross)}</strong>, subtract the{' '}
                  <strong>{inr(newR.standardDeduction)}</strong> standard deduction, and tax the
                  remaining <strong>{inr(newR.taxable)}</strong> slab by slab.
                </>
              }
            />
            <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { k: 'Gross salary', v: inr(gross) },
                { k: 'Standard deduction', v: `−${inr(newR.standardDeduction)}` },
                { k: 'Taxable income', v: inr(newR.taxable) },
              ].map((x) => (
                <div key={x.k} className={`${PANEL} p-3 sm:p-4`}>
                  <p className="text-[11px] font-medium text-slate-500 sm:text-xs">{x.k}</p>
                  <p className="mt-1 text-sm font-bold tabular-nums text-slate-900 sm:text-lg">{x.v}</p>
                </div>
              ))}
            </div>
            <SlabTable r={newR} caption={`New regime tax on ${s}`} />
            <div className="mt-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                {d.zero ? (
                  <>
                    Your taxable income of {lakh(newR.taxable)} is within ₹12 lakh, so the Section 87A
                    rebate (up to ₹60,000) cancels the slab tax. Salaried people pay no tax up to
                    ₹12.75 lakh. The rebate does not cover special-rate income such as equity capital
                    gains, which is taxed separately.
                  </>
                ) : newR.marginalRelief > 0 ? (
                  <>
                    You are just past the ₹12 lakh rebate limit. Marginal relief caps your tax (before
                    cess) at the taxable income above ₹12 lakh, here{' '}
                    {inr(newR.taxable - TAX_RULES.new.rebateLimit)}, instead of the full{' '}
                    {inr(newR.slabTax)} slab tax.
                  </>
                ) : (
                  <>
                    Taxable income of {lakh(newR.taxable)} is above ₹12 lakh, so no 87A rebate
                    applies. Your top slab is {pct(newR.rows[newR.rows.length - 1].rate, 0)}
                    {toNext !== null && toNext > 0 && nextSlab
                      ? `; the next slab starts once taxable income crosses ${lakh(nextSlab.upTo)}, ${inr(toNext)} away.`
                      : ', the highest rate.'}
                  </>
                )}
              </p>
            </div>
          </section>

          <div className="no-print mb-14">
            <AdSlot id={`tax-${page.slug}-1`} type="in-article" />
          </div>

          {/* Old vs new */}
          <section className="mb-14">
            <SectionHead
              id="old-vs-new"
              icon={Scale}
              title={`New vs old regime on ${s}`}
              lede="The old regime has higher rates but lets you claim deductions. Here is what each option costs at your salary."
            />
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-3 sm:px-4 font-semibold">Option</th>
                    <th className="hidden px-3 py-3 text-right font-semibold sm:table-cell sm:px-4">Deductions*</th>
                    <th className="px-3 py-3 sm:px-4 text-right font-semibold">Taxable income</th>
                    <th className="px-3 py-3 sm:px-4 text-right font-semibold">Total tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { k: 'New regime', sub: 'Standard deduction only', r: newR, best: true },
                    { k: 'Old regime', sub: 'No deductions', r: d.old0 },
                    { k: 'Old regime', sub: '80C ₹1.5L + 80D ₹25k', r: d.old1 },
                    { k: 'Old regime', sub: '+ NPS ₹50k + home-loan interest ₹2L', r: d.old2 },
                  ].map((row, i) => (
                    <tr key={i} className={row.best ? 'bg-brand-50/60' : undefined}>
                      <td className="px-3 py-3 sm:px-4">
                        <p className="font-semibold text-slate-900">{row.k}</p>
                        <p className="text-xs text-slate-500">{row.sub}</p>
                      </td>
                      <td className="hidden px-3 py-3 text-right tabular-nums text-slate-700 sm:table-cell sm:px-4">
                        {inr(row.r.standardDeduction + row.r.deductions)}
                      </td>
                      <td className="px-3 py-3 sm:px-4 text-right tabular-nums text-slate-700">{inr(row.r.taxable)}</td>
                      <td className="px-3 py-3 sm:px-4 text-right font-bold tabular-nums text-slate-900">{inr(row.r.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 hidden text-xs text-slate-500 sm:block">*Including the standard deduction.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className={`${PANEL} p-5`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Break-even deductions</p>
                <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900">
                  {d.breakEven === null ? 'Never' : inr(d.breakEven)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {d.breakEven === null
                    ? 'The new regime is already zero tax, so the old regime can at best tie.'
                    : d.zero
                      ? `The old regime only matches zero tax once deductions reach this level. It can never beat it.`
                      : `Deductions beyond the ₹50,000 standard deduction you need before the old regime costs less than ${inr(newR.total)}.`}
                </p>
              </div>
              <div className={`${PANEL} p-5`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Our take</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {d.zero
                    ? `Pick the new regime. It needs no investment proofs and leaves your full salary free for goals you choose.`
                    : d.breakEven !== null && d.breakEven <= d.d1
                      ? `If you already max out 80C and 80D, the old regime is cheaper. Recheck each year: it only takes a few claims to tip the balance.`
                      : d.breakEven !== null && d.breakEven <= d.d2
                        ? `Stay with the new regime unless you have a home loan and use NPS. With rent (HRA) or home-loan interest on top of 80C and 80D, add up your claims and compare against ${inr(d.breakEven)}.`
                        : `Choose the new regime. Even with 80C, 80D, NPS and ₹2 lakh of home-loan interest the old regime costs ${inr(d.old2.total)}.`}
                </p>
              </div>
            </div>
          </section>

          {/* In-hand */}
          <section className="mb-14">
            <SectionHead
              id="in-hand"
              icon={Wallet}
              title={`Monthly in-hand salary on ${d.page.lakh} LPA`}
              lede="What reaches your bank account each month after PF, professional tax and TDS."
            />
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-3 sm:px-4 font-semibold">Per month</th>
                    <th className="px-3 py-3 sm:px-4 text-right font-semibold">New regime</th>
                    <th className="px-3 py-3 sm:px-4 text-right font-semibold">Old regime (80C + 80D)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 tabular-nums">
                  <tr>
                    <td className="px-3 py-3 sm:px-4 text-slate-700">Gross salary</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-slate-900">{inr(gross / 12)}</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-slate-900">{inr(gross / 12)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 sm:px-4 text-slate-700">Employee PF (12% of basic)</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-red-700">−{inr(d.handNew.employeePf / 12)}</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-red-700">−{inr(d.handOld.employeePf / 12)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 sm:px-4 text-slate-700">Professional tax</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-red-700">−{inr(d.handNew.professionalTax / 12)}</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-red-700">−{inr(d.handOld.professionalTax / 12)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 sm:px-4 text-slate-700">Income tax (TDS)</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-red-700">−{inr(d.handNew.tax / 12)}</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-red-700">−{inr(d.handOld.tax / 12)}</td>
                  </tr>
                  <tr className="bg-slate-900 text-white">
                    <td className="px-3 py-3 sm:px-4 font-semibold">In-hand salary</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-base font-bold text-brand-400">{inr(d.handNew.monthly)}</td>
                    <td className="px-3 py-3 sm:px-4 text-right text-base font-bold">{inr(d.handOld.monthly)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={`${PANEL} mt-5 p-5`}>
              <p className="mb-3 text-sm font-semibold text-slate-900">Where your {s} goes each year (new regime)</p>
              <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100">
                {shares.map((x) => (
                  <div key={x.k} className={x.c} style={{ width: `${(x.v / gross) * 100}%` }} />
                ))}
              </div>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                {shares.map((x) => (
                  <li key={x.k} className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-slate-600">
                      <span className={`h-2.5 w-2.5 rounded-full ${x.c}`} /> {x.k}
                    </span>
                    <span className="font-semibold tabular-nums text-slate-900">
                      {inr(x.v)} <span className="font-normal text-slate-500">({pct(x.v / gross)})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Assumes the salary is your gross pay (CTC minus employer PF), basic pay at 50% of it, employee
              PF at 12% of basic and ₹200 a month professional tax. Your payslip will differ if your basic
              share, PF cap or state professional tax differ.
            </p>
          </section>

          {/* Save tax */}
          <section className="mb-14">
            <SectionHead id="save-tax" icon={PiggyBank} title={`How to pay less tax on ${s}`} />
            <div className="grid gap-4">
              {d.npsSaving > 0 && (
                <div className={`${PANEL} p-5`}>
                  <p className="flex items-center gap-2 font-semibold text-slate-900">
                    <Lightbulb className="h-4 w-4 text-brand-600" /> Employer NPS (Section 80CCD(2)) works in
                    the new regime
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    If your employer pays 14% of basic ({inr(d.nps)} a year) into your NPS account out of
                    your CTC, that amount is deductible. Tax falls from <strong>{inr(newR.total)}</strong> to{' '}
                    <strong>{inr(d.newNps.total)}</strong>, a saving of{' '}
                    <strong className="text-green-700">{inr(d.npsSaving)}</strong> every year. The money
                    goes to your retirement account instead of your bank. Ask HR whether your company
                    offers corporate NPS.
                  </p>
                </div>
              )}
              <div className={`${PANEL} p-5`}>
                <p className="flex items-center gap-2 font-semibold text-slate-900">
                  <TrendingUp className="h-4 w-4 text-brand-600" /> What your next raise costs
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  On the next ₹1 lakh of salary you would pay <strong>{inr(d.raise)}</strong> more tax
                  under the new regime
                  {d.raise > 0 ? `, keeping ${inr(1_00_000 - d.raise)} before PF` : ''}.
                  {d.zero && d.raise > 0
                    ? ' The jump happens because crossing ₹12.75 lakh ends the full rebate; marginal relief keeps the extra tax below the extra income.'
                    : newR.marginalRelief > 0
                      ? ' Marginal relief is limiting your tax right now, so income above ₹12 lakh of taxable income is taxed almost rupee for rupee until relief runs out at about ₹13.46 lakh salary.'
                      : ''}
                </p>
              </div>
              <div className={`${PANEL} p-5`}>
                <p className="flex items-center gap-2 font-semibold text-slate-900">
                  <Check className="h-4 w-4 text-brand-600" /> Tell your employer your regime early
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  The new regime is the default. If the old regime suits you, declare it to your employer at
                  the start of the year and submit proofs of 80C, 80D, HRA and home-loan interest, or TDS
                  will be deducted at new-regime rates. Salaried people without business income can still
                  switch regimes each year when filing the return.
                </p>
              </div>
            </div>
          </section>

          {/* Calculator */}
          <section id="calculator" className="mb-14 scroll-mt-24">
            <SectionHead
              id="calculator-heading"
              icon={Calculator}
              title="Check your own numbers"
              lede="Change the salary or enter your old-regime deductions to compare both regimes instantly."
            />
            <InlineTaxCalculator defaultSalary={gross} />
          </section>

          <div className="no-print mb-14">
            <AdSlot id={`tax-${page.slug}-2`} type="in-article" />
          </div>

          {/* Ladder */}
          <section className="mb-14">
            <SectionHead
              id="other-salaries"
              icon={TrendingUp}
              title={`Income tax at other salaries (${TAX_RULES.fy})`}
              lede="New regime tax and monthly in-hand pay on common salary packages. Tap a row for the full breakdown."
            />
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-3 sm:px-4 font-semibold">Salary</th>
                    <th className="px-3 py-3 sm:px-4 text-right font-semibold">New regime tax</th>
                    <th className="hidden px-3 py-3 text-right font-semibold sm:table-cell sm:px-4">Old regime tax*</th>
                    <th className="px-3 py-3 sm:px-4 text-right font-semibold">In-hand / month</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 tabular-nums">
                  {SALARY_TAX_PAGES.map((p) => {
                    const g = Math.round(p.lakh * 1_00_000);
                    const n = computeTax(g, 'new').total;
                    const o = computeTax(g, 'old', Math.min(1_75_000, g - 50_000)).total;
                    const h = inHand(g, 'new').monthly;
                    const current = p.lakh === lakhs;
                    return (
                      <tr key={p.slug} className={current ? 'bg-brand-50' : 'hover:bg-slate-50'}>
                        <td className="px-3 py-2.5 sm:px-4">
                          {current ? (
                            <span className="font-bold text-slate-900">{labelLower(p.lakh)} (this page)</span>
                          ) : (
                            <Link href={p.href} className="font-medium text-slate-900 underline-offset-2 hover:underline">
                              Tax on {labelLower(p.lakh)}
                            </Link>
                          )}
                        </td>
                        <td className="px-3 py-2.5 sm:px-4 text-right font-semibold text-slate-900">{inr(n)}</td>
                        <td className="hidden px-3 py-2.5 text-right text-slate-600 sm:table-cell sm:px-4">{inr(o)}</td>
                        <td className="px-3 py-2.5 sm:px-4 text-right text-slate-700">{inr(h)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 hidden text-xs text-slate-500 sm:block">*Old regime with ₹1.75 lakh of 80C + 80D deductions.</p>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <SectionHead id="faqs" icon={Info} title={`FAQs: tax on ${s} salary`} />
            <Accordion type="single" collapsible className="space-y-3">
              {faqList.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-slate-200 bg-white px-5"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Related */}
          <section className="mb-10">
            <h2 className="mb-5 text-xl font-bold tracking-tight text-slate-900">Keep planning</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ...neighbours.map((p) => ({
                  href: p.href,
                  t: `Tax on ${labelLower(p.lakh)} salary`,
                  dsc: `${inr(computeTax(Math.round(p.lakh * 1_00_000), 'new').total)} under the new regime`,
                })),
                { href: '/income-tax-calculator/', t: 'Income tax calculator', dsc: 'Both regimes with HRA, 80C, 80D and more' },
                { href: '/salary-calculator/', t: 'Salary (CTC to in-hand) calculator', dsc: 'Break your CTC into monthly take-home' },
                { href: '/guides/new-vs-old-tax-regime-2026/', t: 'New vs old tax regime', dsc: `Full ${TAX_RULES.fy} comparison and break-even` },
                { href: '/guides/tax/', t: 'All tax guides', dsc: 'Salary-wise tax, deductions and filing' },
              ].map((x) => (
                <Link key={x.href} href={x.href} className={`${CARD} group flex items-center justify-between gap-4 p-5`}>
                  <span>
                    <span className="block font-semibold text-slate-900">{x.t}</span>
                    <span className="mt-1 block text-sm text-slate-500">{x.dsc}</span>
                  </span>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400 group-hover:text-slate-900">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <div className="mb-6">
            <ShareTools title={h1} />
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs leading-relaxed text-slate-500">
            <p>
              <strong className="text-slate-700">Method and sources.</strong> Figures are computed for a
              resident individual below 60 with only salary income, using {TAX_RULES.fy} ({TAX_RULES.ay})
              rates: new regime slabs from the Finance Act 2025, unchanged in Budget 2026; ₹75,000 standard
              deduction (₹50,000 in the old regime); Section 87A rebate up to ₹60,000 (₹12,500 old
              regime) with marginal relief; 4% cess. The Income-tax Act, 2025 applies from 1 April 2026
              with renumbered sections but the same rates. Verify on the{' '}
              <a
                href="https://www.incometax.gov.in/iec/foportal/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 underline"
              >
                Income Tax Department portal
              </a>{' '}
              or with a tax adviser before filing. Last reviewed {TAX_RULES.lastReviewedLabel}.
            </p>
          </div>

          <AuthorBio />
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <div className="no-print flex min-h-62.5 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <AdSlot id="guides-sidebar-sticky" type="box" />
            </div>
            <nav aria-label="On this page" className={`${PANEL} p-5`}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
              <ol className="space-y-2 text-sm">
                {TOC.map((x) => (
                  <li key={x.id}>
                    <a href={`#${x.id}`} className="text-slate-600 hover:text-slate-900">{x.t}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className={`${PANEL} p-5`}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Other salaries</p>
              <div className="flex flex-wrap gap-2">
                {SALARY_TAX_PAGES.map((p) =>
                  p.lakh === lakhs ? (
                    <span key={p.slug} className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-brand-400">
                      ₹{p.lakh}L
                    </span>
                  ) : (
                    <Link
                      key={p.slug}
                      href={p.href}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand-500 hover:bg-brand-50"
                    >
                      ₹{p.lakh}L
                    </Link>
                  ),
                )}
              </div>
            </div>
            <Link
              href="/income-tax-calculator/"
              className="flex items-center justify-between rounded-2xl bg-brand-400 p-5 font-semibold text-slate-900 transition-colors hover:bg-brand-350"
            >
              Full income tax calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
