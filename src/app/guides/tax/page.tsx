import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

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

const SALARY_TAX_GUIDES = [
  { href: '/guides/tax-on-6-lakh-salary/', title: 'Tax on ₹6 Lakh Salary' },
  { href: '/guides/tax-on-7-5-lakh-salary/', title: 'Tax on ₹7.5 Lakh Salary' },
  { href: '/guides/tax-on-8-lakh-salary/', title: 'Tax on ₹8 Lakh Salary' },
  { href: '/guides/tax-on-9-lakh-salary/', title: 'Tax on ₹9 Lakh Salary' },
  { href: '/guides/tax-on-10-lakh-salary/', title: 'Tax on ₹10 Lakh Salary' },
  { href: '/guides/tax-on-11-lakh-salary/', title: 'Tax on ₹11 Lakh Salary' },
  { href: '/guides/tax-on-12-lakh-salary/', title: 'Tax on ₹12 Lakh Salary' },
  { href: '/guides/tax-on-14-lakh-salary/', title: 'Tax on ₹14 Lakh Salary' },
  { href: '/guides/tax-on-15-lakh-salary/', title: 'Tax on ₹15 Lakh Salary' },
  { href: '/guides/tax-on-16-lakh-salary/', title: 'Tax on ₹16 Lakh Salary' },
  { href: '/guides/tax-on-18-lakh-salary/', title: 'Tax on ₹18 Lakh Salary' },
  { href: '/guides/tax-on-20-lakh-salary/', title: 'Tax on ₹20 Lakh Salary' },
  { href: '/guides/tax-on-25-lakh-salary/', title: 'Tax on ₹25 Lakh Salary' },
  { href: '/guides/tax-on-30-lakh-salary/', title: 'Tax on ₹30 Lakh Salary' },
];

export const metadata: Metadata = {
  title: 'Tax Planning Guides for India | Fincado',
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
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                {guide.title}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
