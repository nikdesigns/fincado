import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PolicyShell from '@/components/policy/PolicyShell';

const PAGE_URL = 'https://fincado.com/disclaimer/';
const LAST_UPDATED = 'April 19, 2026';
const SUPPORT_EMAIL = 'support@fincado.com';

export const metadata: Metadata = {
  title: 'Disclaimer | Fincado Trust Center',
  description:
    'Important disclaimer for Fincado calculators and guides. Educational use only, no personalized financial, tax, legal, or investment advice.',
  keywords: [
    'fincado disclaimer',
    'financial calculator disclaimer',
    'investment risk disclaimer',
    'india finance website disclaimer',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Disclaimer | Fincado Trust Center',
    description:
      'Understand limits of liability and usage boundaries for Fincado content and calculators.',
    url: PAGE_URL,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Disclaimer',
    url: PAGE_URL,
    description:
      'Usage boundaries, liability limits, and non-advisory positioning of Fincado content.',
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
          { name: 'Disclaimer', url: PAGE_URL },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />

      <PolicyShell
        title="Disclaimer"
        subtitle="Fincado provides calculator outputs and financial explainers to support learning and planning. These resources are not a substitute for personalized professional advice."
        lastUpdated={LAST_UPDATED}
        toc={[
          { id: 'not-advice', label: 'Not Professional Advice' },
          { id: 'data-accuracy', label: 'Data and Calculation Accuracy' },
          { id: 'market-risk', label: 'Risk and Outcome Variability' },
          { id: 'third-party', label: 'Third-Party Information' },
          { id: 'ads-affiliates', label: 'Advertising and Affiliates' },
          { id: 'liability', label: 'Liability Limitation' },
          { id: 'contact', label: 'Contact' },
        ]}
      >
        <section id="not-advice" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Not Professional Advice</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fincado content is educational and informational. It does not constitute financial, tax, legal, accounting, or investment advice. We are not a lender, NBFC, or SEBI-registered investment advisor.
          </p>
        </section>

        <section id="data-accuracy" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Data and Calculation Accuracy</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We work to maintain high-quality formulas and references. However, outputs remain estimates and can vary due to lender-specific underwriting, rounding methods, taxation changes, and policy revisions.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            For decisions involving significant money, verify final numbers with official institutions and certified advisors.
          </p>
        </section>

        <section id="market-risk" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Risk and Outcome Variability</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Investment returns are uncertain and can fluctuate.</li>
            <li>Loan rates and approvals depend on profile, documentation, and lender policy.</li>
            <li>Tax treatment depends on individual facts and evolving law.</li>
          </ul>
        </section>

        <section id="third-party" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Third-Party Information</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We may reference external entities and link to third-party websites. We do not control those properties and are not responsible for their accuracy, security, or policy changes.
          </p>
        </section>

        <section id="ads-affiliates" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Advertising and Affiliates</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fincado may display ads and sponsorship placements. Editorial independence standards are defined in our{' '}
            <Link href="/editorial-guidelines/" className="font-semibold text-brand-700 hover:text-brand-800">
              Editorial Guidelines
            </Link>
            . Ads do not guarantee product suitability for every user.
          </p>
        </section>

        <section id="liability" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Liability Limitation</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            To the extent permitted by law, Fincado is not liable for financial loss or damage arising from use of this website or reliance on any output or content.
          </p>
        </section>

        <section id="contact" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Questions regarding this disclaimer can be sent to:
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-3 inline-flex items-center rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {SUPPORT_EMAIL}
          </a>
        </section>
      </PolicyShell>
    </>
  );
}
