import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PolicyShell from '@/components/policy/PolicyShell';

const PAGE_URL = 'https://fincado.com/privacy-policy/';
const LAST_UPDATED = 'April 19, 2026';
const SUPPORT_EMAIL = 'support@fincado.com';

export const metadata: Metadata = {
  title: 'Privacy Policy | Fincado Trust Center',
  description:
    'Learn how Fincado collects, uses, protects, and manages user information across calculators, guides, analytics, and advertising systems.',
  keywords: [
    'fincado privacy policy',
    'financial website privacy',
    'adsense privacy policy india',
    'calculator data privacy',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Privacy Policy | Fincado Trust Center',
    description:
      'Data handling, cookies, analytics, security, and user rights for Fincado visitors.',
    url: PAGE_URL,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: PAGE_URL,
    description:
      'Privacy Policy for Fincado website users in relation to data usage and security.',
    inLanguage: 'en-IN',
    dateModified: '2026-04-19',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fincado.com/#website',
    },
    about: {
      '@type': 'Thing',
      name: 'Privacy and Data Handling',
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Privacy Policy', url: PAGE_URL },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />

      <PolicyShell
        title="Privacy Policy"
        subtitle="This policy describes what information we process, why we process it, and how we protect users when they use Fincado calculators, guides, and related services."
        lastUpdated={LAST_UPDATED}
        toc={[
          { id: 'scope', label: 'Scope' },
          { id: 'data-collected', label: 'Information We Collect' },
          { id: 'usage', label: 'How We Use Information' },
          { id: 'cookies-ads', label: 'Cookies and Advertising' },
          { id: 'sharing', label: 'Data Sharing' },
          { id: 'retention', label: 'Data Retention' },
          { id: 'security', label: 'Security' },
          { id: 'rights', label: 'User Rights and Choices' },
          { id: 'children', label: 'Children’s Privacy' },
          { id: 'changes', label: 'Policy Updates' },
          { id: 'contact', label: 'Contact' },
        ]}
      >
        <section id="scope" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Scope</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            This policy applies to all visitors who access Fincado web pages, calculators, guides, and forms. By using this site, you acknowledge this policy.
          </p>
        </section>

        <section id="data-collected" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Information We Collect</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Technical and usage data such as device type, browser, and page interactions.</li>
            <li>Information you voluntarily provide via contact forms or direct email.</li>
            <li>Ad and analytics events to improve site experience and maintain platform quality.</li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Calculator inputs are used for live calculation and user experience. They are not treated as bank account data or transaction-level financial records.
          </p>
        </section>

        <section id="usage" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">How We Use Information</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Deliver and improve calculators and educational content.</li>
            <li>Diagnose performance issues and protect service integrity.</li>
            <li>Respond to support, editorial, and partnership requests.</li>
            <li>Measure website traffic and engagement trends.</li>
          </ul>
        </section>

        <section id="cookies-ads" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Cookies and Advertising</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fincado may use cookies and similar technologies for analytics, performance, and ad delivery. Ads may be provided by third-party networks including Google.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            You can manage cookie or ad personalization settings through browser controls and ad provider preference pages. See our{' '}
            <Link href="/cookie-policy/" className="font-semibold text-brand-700 hover:text-brand-800">
              Cookie Policy
            </Link>{' '}
            for additional details.
          </p>
        </section>

        <section id="sharing" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Data Sharing</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We do not sell personal data. Information may be processed by service providers that support analytics, hosting, security, or advertising operations, or disclosed when required by law.
          </p>
        </section>

        <section id="retention" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Data Retention</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We retain data only as needed for operational, legal, security, or support purposes. Retention periods may vary by data type and legal requirements.
          </p>
        </section>

        <section id="security" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Security</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We use reasonable technical and organizational safeguards to protect website infrastructure and user information. No internet system can guarantee absolute security.
          </p>
        </section>

        <section id="rights" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">User Rights and Choices</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Request updates or deletion for data shared via support messages where applicable.</li>
            <li>Control cookie preferences using browser settings.</li>
            <li>Manage ad personalization through ad provider settings.</li>
          </ul>
        </section>

        <section id="children" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Children’s Privacy</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Fincado is intended for general audiences and is not directed at children under 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section id="changes" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Policy Updates</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We may revise this policy to reflect legal, product, or operational changes. Material updates will be reflected by the last updated date on this page.
          </p>
        </section>

        <section id="contact" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            For privacy-related questions, write to:
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
