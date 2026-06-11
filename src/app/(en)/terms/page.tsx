import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PolicyShell from '@/components/policy/PolicyShell';

const PAGE_URL = 'https://fincado.com/terms/';
const LAST_UPDATED = 'April 19, 2026';
const SUPPORT_EMAIL = 'support@fincado.com';
const JURISDICTION_CITY = 'Mumbai';

export const metadata: Metadata = {
  title: 'Terms of Use | Fincado Trust Center',
  description:
    'Read Fincado Terms of Use covering permitted usage, disclaimers, legal limitations, intellectual property, and governing law.',
  keywords: [
    'fincado terms of use',
    'fincado legal terms',
    'financial calculator terms',
    'website terms india',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Terms of Use | Fincado Trust Center',
    description:
      'Fincado Terms of Use for calculators, financial guides, and website services.',
    url: PAGE_URL,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use',
    url: PAGE_URL,
    description:
      'Terms of Use for Fincado covering website access, legal obligations, and liability limits.',
    inLanguage: 'en-IN',
    dateModified: '2026-04-19',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
    },
    about: {
      '@type': 'Thing',
      name: 'Website Terms and Conditions',
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Terms of Use', url: PAGE_URL },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />

      <PolicyShell
        title="Terms of Use"
        subtitle="These terms govern your access to Fincado calculators, financial guides, comparison tools, and related services. By using this website, you agree to these terms."
        lastUpdated={LAST_UPDATED}
        toc={[
          { id: 'acceptance', label: 'Acceptance of Terms' },
          { id: 'service-scope', label: 'Service Scope' },
          { id: 'user-obligations', label: 'User Obligations' },
          { id: 'intellectual-property', label: 'Intellectual Property' },
          { id: 'third-party', label: 'Third-Party Services' },
          { id: 'warranty', label: 'No Warranty' },
          { id: 'liability', label: 'Limitation of Liability' },
          { id: 'termination', label: 'Suspension or Termination' },
          { id: 'law', label: 'Governing Law' },
          { id: 'changes', label: 'Changes to Terms' },
          { id: 'contact', label: 'Contact' },
        ]}
      >
        <section id="acceptance" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Acceptance of Terms</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            By visiting or using Fincado, you agree to comply with these Terms of Use and all applicable laws. If you do not agree, discontinue use of this website.
          </p>
        </section>

        <section id="service-scope" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Service Scope</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fincado provides calculators, financial explainers, and decision-support content for educational purposes only. Nothing on this site is personalized financial, tax, legal, or investment advice.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Please read our{' '}
            <Link href="/disclaimer/" className="font-semibold text-brand-700 hover:text-brand-800">
              Disclaimer
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy/" className="font-semibold text-brand-700 hover:text-brand-800">
              Privacy Policy
            </Link>{' '}
            for related obligations and limitations.
          </p>
        </section>

        <section id="user-obligations" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">User Obligations</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Use the website lawfully and responsibly.</li>
            <li>Do not attempt to hack, scrape, overload, or disrupt the platform.</li>
            <li>Do not misuse content, trademarks, or proprietary materials.</li>
            <li>Independently verify critical financial data before acting.</li>
          </ul>
        </section>

        <section id="intellectual-property" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Intellectual Property</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fincado logos, design, code, calculations, and written content are owned by or licensed to Fincado. You may share links for personal use, but copying or commercial reuse requires written permission.
          </p>
        </section>

        <section id="third-party" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Third-Party Services</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            This website may include third-party tools, analytics, and ads (for example, Google services). We do not control external websites and are not responsible for their content or policy changes.
          </p>
        </section>

        <section id="warranty" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">No Warranty</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fincado is provided on an “as is” and “as available” basis. We do not guarantee uninterrupted access, calculator output accuracy in all cases, loan approvals, or any specific financial result.
          </p>
        </section>

        <section id="liability" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Limitation of Liability</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            To the maximum extent permitted by law, Fincado is not liable for direct, indirect, incidental, or consequential losses arising from use of this website, including reliance on calculator outputs or educational content.
          </p>
        </section>

        <section id="termination" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Suspension or Termination</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We may suspend or restrict access in cases of abuse, automated attacks, scraping, unlawful usage, or attempts to compromise platform integrity.
          </p>
        </section>

        <section id="law" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Governing Law</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            These terms are governed by the laws of India. Courts located in {JURISDICTION_CITY}, India will have jurisdiction over disputes related to these terms.
          </p>
        </section>

        <section id="changes" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Changes to Terms</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We may revise these terms periodically. The “Last updated” date on this page reflects the current version. Continued use after updates indicates acceptance of revised terms.
          </p>
        </section>

        <section id="contact" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            For legal or policy questions, contact:
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
