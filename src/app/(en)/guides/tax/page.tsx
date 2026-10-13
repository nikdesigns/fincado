import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { computeTax, inr } from '@/lib/incomeTax';
import { SALARY_TAX_PAGES } from '@/lib/salaryTaxPages';

const PAGE_URL = 'https://fincado.com/guides/tax/';

const CORE_TAX_GUIDES = [
  {
    href: '/guides/new-vs-old-tax-regime-2026/',
    title: 'New vs Old Tax Regime (FY 2026-27)',
  },
  {
    href: '/income-tax-calculator/',
    title: 'Income Tax Calculator',
  },
  {
    href: '/guides/best-tax-saving-options-80c/',
    title: 'Best 80C Tax Saving Options',
  },
];

const SALARY_TAX_GUIDES = SALARY_TAX_PAGES.map((p) => ({
  href: p.href,
  title: `Tax on ₹${p.lakh} Lakh Salary`,
  tax: computeTax(Math.round(p.lakh * 1_00_000), 'new').total,
}));

export const metadata: Metadata = {
  title: 'Tax Planning Guides for India',
  description:
    'Browse Fincado tax planning guides including salary-wise tax pages, regime comparisons, and practical deduction explainers.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Tax Planning Guides for India',
    description:
      'Salary-wise tax guides, regime comparisons, and practical tax planning resources.',
    url: PAGE_URL,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fincado Financial Calculators',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TaxGuidesHubPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          { name: 'Tax Planning', url: PAGE_URL },
        ]}
      />

      <main className="container mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Tax Planning Guides
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Use these pages to compare regimes, estimate salary tax impact by
            income band, and build a practical year-round tax plan.
          </p>
        </header>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            Core Tax Playbooks
          </h2>
          <div className="mb-8 grid gap-3 sm:grid-cols-2">
            {CORE_TAX_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                {guide.title}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            Salary-Wise Tax Guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SALARY_TAX_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                <span>{guide.title}</span>
                <span className="text-xs font-semibold tabular-nums text-slate-500">
                  {guide.tax === 0 ? 'Zero tax' : `${inr(guide.tax)} tax`}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
