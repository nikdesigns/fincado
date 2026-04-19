import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PolicyShell from '@/components/policy/PolicyShell';

const PAGE_URL = 'https://fincado.com/editorial-guidelines/';
const LAST_UPDATED = 'April 19, 2026';
const SUPPORT_EMAIL = 'support@fincado.com';

export const metadata: Metadata = {
  title: 'Editorial Guidelines | Fincado Trust Center',
  description:
    'How Fincado researches, verifies, updates, and maintains financial content quality, including correction workflows and editorial independence standards.',
  keywords: [
    'fincado editorial policy',
    'financial content standards',
    'fact checking finance calculators',
    'editorial independence india',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Editorial Guidelines | Fincado Trust Center',
    description:
      'Fincado editorial standards for research, verification, updates, and correction policies.',
    url: PAGE_URL,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EditorialGuidelinesPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Editorial Guidelines',
    url: PAGE_URL,
    description:
      'Fincado editorial process and quality standards for calculators and guides.',
    inLanguage: 'en-IN',
    dateModified: '2026-04-19',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
    },
    publisher: {
      '@id': 'https://fincado.com/#organization',
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Editorial Guidelines', url: PAGE_URL },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />

      <PolicyShell
        title="Editorial Guidelines"
        subtitle="This page explains the principles behind Fincado content quality, including source standards, fact-checking workflow, policy updates, and corrections."
        lastUpdated={LAST_UPDATED}
        toc={[
          { id: 'mission', label: 'Editorial Mission' },
          { id: 'sources', label: 'Source Standards' },
          { id: 'workflow', label: 'Review Workflow' },
          { id: 'freshness', label: 'Update and Freshness Policy' },
          { id: 'independence', label: 'Independence and Conflicts' },
          { id: 'ai', label: 'AI and Automation Disclosure' },
          { id: 'corrections', label: 'Corrections Policy' },
          { id: 'contact', label: 'Contact Editorial Team' },
        ]}
      >
        <section id="mission" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Editorial Mission</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fincado publishes practical financial content for Indian users. Our objective is decision clarity, not sensational claims. We prioritize transparent assumptions, explainable calculations, and readable guidance.
          </p>
        </section>

        <section id="sources" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Source Standards</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Primary preference: regulator notifications, official lender disclosures, statutory references, and government circulars.</li>
            <li>Secondary references: reputed public datasets and institution-level policy documents.</li>
            <li>Rate and tax content is reviewed before publishing and during periodic refresh cycles.</li>
          </ul>
        </section>

        <section id="workflow" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Review Workflow</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Draft and compute assumptions.</li>
            <li>Cross-check formula logic and output behavior.</li>
            <li>Validate policy references and update date labels.</li>
            <li>Publish with metadata and internal link quality checks.</li>
          </ol>
        </section>

        <section id="freshness" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Update and Freshness Policy</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Critical pages are reviewed on a recurring basis and revised when policy, rate, or rule changes materially affect user decisions. Pages carry review timestamps where applicable.
          </p>
        </section>

        <section id="independence" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Independence and Conflicts</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Editorial decisions are not sold. Advertisers and sponsors do not get guaranteed ranking positions in comparison logic or calculator output framing.
          </p>
        </section>

        <section id="ai" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">AI and Automation Disclosure</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Some content operations use automation support. Final publication standards still require validation checks for factual consistency, policy alignment, and user-facing clarity.
          </p>
        </section>

        <section id="corrections" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Corrections Policy</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            If a material error is identified, we investigate and update affected pages. Readers can report issues with page URL, observed mismatch, and supporting source context.
          </p>
        </section>

        <section id="contact" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Contact Editorial Team</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            For corrections, source challenges, or editorial queries:
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Editorial Query`}
            className="mt-3 inline-flex items-center rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {SUPPORT_EMAIL}
          </a>
        </section>
      </PolicyShell>
    </>
  );
}
