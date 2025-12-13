// src/app/terms/page.tsx
import type { Metadata } from 'next';
import '@/styles/terms.css';

export const metadata: Metadata = {
  title: 'Terms of Use — Fincado',
  description:
    'Read the Terms of Use for Fincado — website rules, disclaimers, legal limits and contact information.',
};

const SUPPORT_EMAIL = 'support@fincado.com';
const JURISDICTION_CITY = 'Mumbai';
const LAST_UPDATED = 'January 2025';

export default function TermsPage() {
  return (
    <main className="terms-root">
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">Terms of Use</h1>
          <p className="terms-sub">
            Last updated: <time dateTime="2025-01-01">{LAST_UPDATED}</time>
          </p>
          <p className="terms-lead">
            These terms govern your access to and use of Fincado’s website,
            calculators, guides and related services. Please read them
            carefully.
          </p>
        </div>
      </div>

      <div className="terms-container">
        <nav className="terms-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <ul>
            <li>
              <a href="#intro">Welcome</a>
            </li>
            <li>
              <a href="#general">General / Not Financial Advice</a>
            </li>
            <li>
              <a href="#accuracy">Accuracy & Updates</a>
            </li>
            <li>
              <a href="#tools">Calculators & Tools</a>
            </li>
            <li>
              <a href="#ads">Advertisements & Links</a>
            </li>
            <li>
              <a href="#user">User Responsibilities</a>
            </li>
            <li>
              <a href="#ip">Intellectual Property</a>
            </li>
            <li>
              <a href="#liability">Limitation of Liability</a>
            </li>
            <li>
              <a href="#privacy">Privacy</a>
            </li>
            <li>
              <a href="#changes">Changes to Terms</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#law">Governing Law</a>
            </li>
          </ul>
        </nav>

        <article className="terms-article">
          <section id="intro" className="terms-section">
            <h2>Welcome to Fincado</h2>
            <p>
              These Terms of Use (&quot;Terms&quot;) govern your access to and
              use of the Fincado website, calculators, guides, articles and
              other services (collectively, the &quot;Services&quot;). By using
              the Services you agree to these Terms. If you disagree, please
              stop using the Services.
            </p>
          </section>

          <section id="general" className="terms-section">
            <h3>General — Informational Purposes Only</h3>
            <p>
              Fincado provides educational and informational content related to
              personal finance in India. The content, tools and guides on
              Fincado are intended as general information only and do not
              constitute financial, tax, legal or investment advice. We are not
              a bank, NBFC, or a SEBI-registered advisor.
            </p>
            <ul className="terms-list">
              <li>Do not treat website content as professional advice.</li>
              <li>
                Consult a qualified professional for personalised guidance.
              </li>
            </ul>
          </section>

          <section id="accuracy" className="terms-section">
            <h3>Accuracy & Updates</h3>
            <p>
              We aim to keep information current, but interest rates, tax rules,
              lender policies and other financial details can change frequently.
              Guides and auto-generated articles may contain errors or be out of
              date. You agree to verify information with official sources before
              acting.
            </p>
          </section>

          <section id="tools" className="terms-section">
            <h3>Calculators & Tools</h3>
            <p>
              Calculators (EMI, SIP, FD, Savings, Investment planners, Credit
              score estimators, etc.) provide approximate estimates only.
              Results are indicative and may not match actual quotes or offers
              from lenders or financial institutions. Use the tools for planning
              and education only.
            </p>
          </section>

          <section id="ads" className="terms-section">
            <h3>Advertisements & External Links</h3>
            <p>
              Fincado displays third-party advertisements (including Google
              AdSense) and may include affiliate or partner links. External
              sites are not controlled by us, and we are not responsible for
              their content, products, or services.
            </p>
          </section>

          <section id="user" className="terms-section">
            <h3>User Responsibilities</h3>
            <p>By using Fincado you agree to:</p>
            <ol className="terms-ol">
              <li>Use the Services lawfully and ethically.</li>
              <li>Not to scrape, hack, or overload our systems.</li>
              <li>
                Not to republish or redistribute content without permission.
              </li>
            </ol>
          </section>

          <section id="ip" className="terms-section">
            <h3>Intellectual Property</h3>
            <p>
              All materials on Fincado — text, code, designs, calculators and
              branding — are owned or licensed by Fincado and protected by
              intellectual property laws. Personal, non-commercial sharing of
              links is allowed; reproduction or commercial reuse requires
              permission.
            </p>
          </section>

          <section id="liability" className="terms-section">
            <h3>Limitation of Liability</h3>
            <p>
              To the fullest extent permitted by applicable law, Fincado will
              not be liable for any direct, indirect, incidental, or
              consequential damages arising from your use of the Services,
              including financial loss or lost profits. Your sole remedy for
              dissatisfaction is to stop using the Services.
            </p>
          </section>

          <section id="privacy" className="terms-section">
            <h3>Privacy</h3>
            <p>
              Your use of the Services is subject to our{' '}
              <a href="/privacy" className="link">
                Privacy Policy
              </a>
              . Please review it to understand how we collect, use and store
              information.
            </p>
          </section>

          <section id="changes" className="terms-section">
            <h3>Changes to These Terms</h3>
            <p>
              We may update these Terms from time to time. Material changes will
              be reflected by updating the &quot;Last updated&quot; date.
              Continued use after changes indicates acceptance of the new Terms.
            </p>
          </section>

          <section id="contact" className="terms-section">
            <h3>Contact</h3>
            <p>For questions about these Terms, contact us at:</p>
            <div className="contact-card">
              <a className="contact-email" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              <p className="contact-small">
                Response time: typically 1–3 business days
              </p>
            </div>
          </section>

          <section id="law" className="terms-section">
            <h3>Governing Law</h3>
            <p>
              These Terms are governed by the laws of India. Any dispute arising
              out of or relating to these Terms shall be subject to the
              exclusive jurisdiction of the courts in {JURISDICTION_CITY},
              India.
            </p>
          </section>

          <footer className="terms-footer">
            <p className="muted">
              Fincado is a privately operated website. Content is provided for
              informational purposes only and is not a substitute for
              professional advice.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
