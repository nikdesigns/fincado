// src/app/cookies/page.tsx
import type { Metadata } from 'next';
import '@/styles/terms.css';

export const metadata: Metadata = {
  title: 'Cookie Policy — Fincado',
  description:
    'Cookie Policy for Fincado — learn how cookies, tracking technologies and AdSense are used on the site.',
};

const LAST_UPDATED = 'January 2025';

export default function CookiePolicyPage(): JSX.Element {
  return (
    <main className="terms-root">
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">Cookie Policy</h1>

          <p className="terms-sub">
            Last updated: <time>{LAST_UPDATED}</time>
          </p>

          <p className="terms-lead">
            This Cookie Policy explains how Fincado uses cookies and similar
            tracking technologies to improve user experience, analyze
            performance, and display relevant advertisements.
          </p>
        </div>
      </div>

      <div className="terms-container">
        <nav className="terms-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <ul>
            <li>
              <a href="#intro">What Are Cookies?</a>
            </li>
            <li>
              <a href="#types">Types of Cookies We Use</a>
            </li>
            <li>
              <a href="#ads">AdSense & Advertising Cookies</a>
            </li>
            <li>
              <a href="#analytics">Analytics Cookies</a>
            </li>
            <li>
              <a href="#manage">How You Can Manage Cookies</a>
            </li>
            <li>
              <a href="#third-party">Third-Party Cookies</a>
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
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device (computer or
              mobile) when you visit a website. They help websites remember your
              preferences, analyze performance, and show relevant ads.
            </p>
            <p>
              Cookies are widely used across the internet and essential for
              providing modern web functionality.
            </p>
          </section>

          <section id="types" className="terms-section">
            <h2>Types of Cookies We Use</h2>

            <h3>1. Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly.
              They do not store personally identifiable information.
            </p>

            <h3>2. Performance & Analytics Cookies</h3>
            <p>
              These cookies help us understand how users interact with Fincado
              so we can improve our content and tools.
            </p>

            <ul className="terms-list">
              <li>Page views and session counts</li>
              <li>Device and browser information</li>
              <li>Loading speed and performance insights</li>
            </ul>

            <h3>3. Advertising Cookies</h3>
            <p>
              Used to deliver ads that are more relevant to your interests.
              These are mainly set by **Google AdSense**.
            </p>
          </section>

          <section id="ads" className="terms-section">
            <h2>AdSense & Advertising Cookies</h2>
            <p>
              Fincado displays ads via **Google AdSense**, which may use cookies
              to:
            </p>

            <ul className="terms-list">
              <li>Serve personalised or non-personalised ads</li>
              <li>Limit how often you see the same advertisement</li>
              <li>Measure ad effectiveness</li>
            </ul>

            <p>
              Google may use the DoubleClick cookie or other identifiers for ad
              personalization. You can opt out through Google’s Ads Settings.
            </p>
          </section>

          <section id="analytics" className="terms-section">
            <h2>Analytics Cookies</h2>
            <p>
              We use **Google Analytics** to understand user behavior,
              including:
            </p>

            <ul className="terms-list">
              <li>Pages visited</li>
              <li>Time spent on site</li>
              <li>Traffic sources</li>
              <li>Device and location (general region only)</li>
            </ul>

            <p>All analytics data is anonymized.</p>
          </section>

          <section id="manage" className="terms-section">
            <h2>How You Can Manage Cookies</h2>
            <p>You can manage or disable cookies in several ways:</p>

            <ul className="terms-list">
              <li>
                Through your browser settings (Chrome, Safari, Firefox, Edge)
              </li>
              <li>By using “Incognito” or “Private Mode”</li>
              <li>By opting out of personalised ads on Google</li>
            </ul>

            <p>
              Note: Disabling cookies may affect certain features and calculator
              performance.
            </p>
          </section>

          <section id="third-party" className="terms-section">
            <h2>Third-Party Cookies</h2>
            <p>
              Some cookies on Fincado are placed by third parties such as Google
              Analytics, Google AdSense, and affiliate partners.
            </p>
            <p>
              We do not control third-party cookies and recommend reviewing
              their respective privacy policies for more information.
            </p>
          </section>

          <section id="changes" className="terms-section">
            <h2>Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy occasionally. Any updates will be
              reflected by changing the “Last updated” date at the top of this
              page.
            </p>
          </section>

          <section id="contact" className="terms-section">
            <h2>Contact Us</h2>
            <p>If you have questions about this Cookie Policy, contact us:</p>

            <div className="contact-card">
              <a href="mailto:support@fincado.com" className="contact-email">
                support@fincado.com
              </a>
              <p className="contact-small">
                We usually respond within 1–3 business days.
              </p>
            </div>
          </section>

          <footer className="terms-footer">
            <p className="muted">
              Fincado uses cookies to ensure transparency, security, and a
              personalised user experience while remaining compliant with global
              privacy standards.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
