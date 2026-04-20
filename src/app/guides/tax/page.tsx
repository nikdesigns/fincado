import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const PAGE_URL = 'https://fincado.com/guides/tax/';

const TAX_GUIDE_LINKS = [
  '/guides/new-vs-old-tax-regime-2026/',
  '/guides/tax-on-10-lakh-salary/',
  '/guides/tax-on-12-lakh-salary/',
  '/guides/tax-on-15-lakh-salary/',
  '/guides/tax-on-20-lakh-salary/',
  '/guides/tax-on-30-lakh-salary/',
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
            Use these pages to compare regimes, estimate salary tax impact, and
            build a practical year-round tax plan.
          </p>
        </header>

        <section className="grid gap-3 sm:grid-cols-2">
          {TAX_GUIDE_LINKS.map((href) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              {href.replace('/guides/', '').replaceAll('-', ' ').replace('/', '')}
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

