// src/app/privacy/page.tsx
import type { Metadata } from 'next';
import '@/styles/terms.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — Fincado',
  description:
    'Privacy Policy for Fincado — how we collect, store, protect and use your data when you use calculators, tools, and financial guides.',
};

const LAST_UPDATED = 'January 2025';
const SUPPORT_EMAIL = 'support@fincado.com';
const JURISDICTION_CITY = 'Mumbai';

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <main className="terms-root">
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">Privacy Policy</h1>

          <p className="terms-sub">
            Last updated: <time>{LAST_UPDATED}</time>
          </p>

          <p className="terms-lead">
            This Privacy Policy explains how Fincado collects, uses, and
            protects your information when you use our website, calculators,
            tools, and financial resources.
          </p>
        </div>
      </div>

      <div className="terms-container">
        <nav className="terms-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <ul>
            <li>
              <a href="#intro">Introduction</a>
            </li>
            <li>
              <a href="#data-we-collect">Information We Collect</a>
            </li>
            <li>
              <a href="#ads">Ads & Cookies</a>
            </li>
            <li>
              <a href="#usage">How We Use Your Information</a>
            </li>
            <li>
              <a href="#sharing">Sharing of Information</a>
            </li>
            <li>
              <a href="#security">Data Security</a>
            </li>
            <li>
              <a href="#rights">Your Rights</a>
            </li>
            <li>
              <a href="#children">Children’s Privacy</a>
            </li>
            <li>
              <a href="#changes">Changes to This Policy</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </nav>

        <article className="terms-article">
          <section id="intro" className="terms-section">
            <h2>Introduction</h2>
            <p>
              Fincado (“we”, “our”, “us”) is committed to protecting your
              privacy. This policy outlines how we handle personal and
              non-personal information when you use our services.
            </p>
            <p>
              By accessing Fincado, you consent to the practices described in
              this Privacy Policy.
            </p>
          </section>

          <section id="data-we-collect" className="terms-section">
            <h2>Information We Collect</h2>

            <h3>1. Information You Provide</h3>
            <ul className="terms-list">
              <li>
                When you enter values into calculators (loan amount, income, SIP
                amount, etc.).
              </li>
              <li>When you contact us via email or feedback forms.</li>
            </ul>

            <h3>2. Automatically Collected Data</h3>
            <p>We automatically collect basic technical information such as:</p>

            <ul className="terms-list">
              <li>IP address (masked/ anonymized by Google Analytics)</li>
              <li>Browser type, device type, OS</li>
              <li>Pages viewed, session duration, click behavior</li>
              <li>Referring URLs</li>
            </ul>

            <h3>3. No Financial Data Stored</h3>
            <p>
              Fincado does **not store or save** the numbers you enter into our
              calculators (loan amount, FD amount, SIP values, etc.).
            </p>
          </section>

          <section id="ads" className="terms-section">
            <h2>Cookies, Analytics & Advertising</h2>

            <h3>Google Analytics</h3>
            <p>
              We use Google Analytics to understand user behavior. This may
              include anonymized data such as page views, device type, and
              session activity.
            </p>

            <h3>Google AdSense</h3>
            <p>
              Fincado uses Google AdSense to serve ads. Google may use cookies
              to:
            </p>

            <ul className="terms-list">
              <li>Serve personalized or non-personalized ads</li>
              <li>Limit repeated ad impressions</li>
              <li>Measure ad performance</li>
            </ul>

            <p>
              You may opt out of personalised ads anytime via Google’s Ads
              Settings.
            </p>

            <h3>Cookies</h3>
            <p>
              Cookies are small text files used for analytics, preferences, and
              improving user experience. You may disable cookies in your
              browser, but some features may not work as intended.
            </p>
          </section>

          <section id="usage" className="terms-section">
            <h2>How We Use Your Information</h2>

            <ul className="terms-list">
              <li>To improve calculators, tools, and website experience.</li>
              <li>To analyze traffic patterns and optimize performance.</li>
              <li>To display relevant advertisements.</li>
              <li>To respond to user messages or inquiries.</li>
            </ul>
          </section>

          <section id="sharing" className="terms-section">
            <h2>Sharing of Information</h2>
            <p>
              Fincado does <strong>not sell, rent, or trade</strong> user data.
            </p>
            <p>Information may be shared only with:</p>

            <ul className="terms-list">
              <li>Analytics providers (Google Analytics)</li>
              <li>Ad networks (Google AdSense)</li>
              <li>Legal authorities (only if required by Indian law)</li>
            </ul>
          </section>

          <section id="security" className="terms-section">
            <h2>Data Security</h2>
            <p>
              We use reasonable technical and organizational safeguards to
              protect your information. However, no online system is 100%
              secure.
            </p>
          </section>

          <section id="rights" className="terms-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>

            <ul className="terms-list">
              <li>Request deletion of messages you voluntarily sent us.</li>
              <li>Opt out of personalized ads.</li>
              <li>Disable cookies in your browser.</li>
            </ul>

            <p>
              Since we do not store calculator inputs, there is nothing to
              delete from our side.
            </p>
          </section>

          <section id="children" className="terms-section">
            <h2>Children’s Privacy</h2>
            <p>
              Fincado is not intended for children under 13 years of age. We do
              not knowingly collect data from children.
            </p>
          </section>

          <section id="changes" className="terms-section">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy occasionally. Changes will be
              reflected by updating the “Last updated” date at the top of this
              page.
            </p>
          </section>

          <section id="contact" className="terms-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>

            <div className="contact-card">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="contact-email">
                {SUPPORT_EMAIL}
              </a>
              <p className="contact-small">
                We typically respond within 1–3 business days.
              </p>
            </div>
          </section>

          <footer className="terms-footer">
            <p className="muted">
              Fincado is committed to maintaining transparency and protecting
              user privacy across all financial tools and guides.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
