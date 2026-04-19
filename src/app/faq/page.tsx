import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FAQSchema from '@/components/FAQSchema';
import PolicyShell from '@/components/policy/PolicyShell';

const PAGE_URL = 'https://fincado.com/faq/';
const LAST_UPDATED = 'April 19, 2026';

const FAQ_ITEMS = [
  {
    question: 'Are Fincado calculators free to use?',
    answer:
      'Yes. Fincado calculators are free to use and are designed for educational planning.',
  },
  {
    question: 'Are calculator outputs guaranteed?',
    answer:
      'No. Outputs are estimates based on entered inputs and assumptions. Final values may differ by lender, tax treatment, or policy changes.',
  },
  {
    question: 'Does Fincado provide investment or tax advice?',
    answer:
      'No. Fincado provides educational content and planning tools, not personalized professional advice.',
  },
  {
    question: 'How often are rates and rules updated?',
    answer:
      'High-impact pages are reviewed periodically and updated when rule, rate, or policy changes materially affect outcomes.',
  },
  {
    question: 'Do you store calculator input values?',
    answer:
      'Calculator inputs are used for rendering outputs. Please review the Privacy Policy for full data handling details.',
  },
  {
    question: 'Can I report an error in an article or calculator?',
    answer:
      'Yes. Use the Contact page and include the page URL, issue details, and source reference if available.',
  },
  {
    question: 'Do advertisers influence rankings or recommendations?',
    answer:
      'No. Editorial decisions and core logic are not sold to advertisers.',
  },
  {
    question: 'Is Fincado available in Hindi?',
    answer:
      'Yes. You can use Hindi pages under /hi/ for localized content and calculators.',
  },
  {
    question: 'How can I contact support?',
    answer:
      'You can contact support from the Contact page or email support@fincado.com.',
  },
];

export const metadata: Metadata = {
  title: 'FAQ | Fincado Trust Center',
  description:
    'Frequently asked questions about Fincado calculators, data accuracy, updates, privacy, and support.',
  keywords: [
    'fincado faq',
    'financial calculator faq',
    'fincado support questions',
    'calculator accuracy faq',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'FAQ | Fincado Trust Center',
    description:
      'Answers to common questions about calculator usage, updates, privacy, and support.',
    url: PAGE_URL,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'FAQ',
    url: PAGE_URL,
    description: 'Frequently asked questions for Fincado users.',
    inLanguage: 'en-IN',
    dateModified: '2026-04-19',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'FAQ', url: PAGE_URL },
        ]}
      />
      <FAQSchema faqs={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />

      <PolicyShell
        title="Frequently Asked Questions"
        subtitle="Quick answers about calculator accuracy, support, privacy, and editorial standards."
        lastUpdated={LAST_UPDATED}
        toc={FAQ_ITEMS.map((item, index) => ({
          id: `faq-${index + 1}`,
          label: item.question,
        }))}
      >
        {FAQ_ITEMS.map((item, index) => (
          <section
            key={item.question}
            id={`faq-${index + 1}`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">{item.question}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
          </section>
        ))}

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Need More Help?</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Visit our contact page for support, correction requests, and business inquiries.
          </p>
          <Link
            href="/contact/"
            className="mt-3 inline-flex items-center rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            Contact Support
          </Link>
        </section>
      </PolicyShell>
    </>
  );
}
