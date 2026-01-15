// src/app/disclaimer/page.tsx
import type { Metadata } from 'next';
import '@/styles/terms.css';

export const metadata: Metadata = {
  title: 'Disclaimer — Fincado',
  description:
    'Disclaimer for Fincado — financial education only, no professional or investment advice, no liability for calculators or content.',
};

const LAST_UPDATED = 'January 2026';
const SUPPORT_EMAIL = 'support@fincado.com';
const JURISDICTION_CITY = 'Mumbai';

export default function DisclaimerPage() {
  return (
    <main className="terms-root">
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">Disclaimer</h1>

          <p className="terms-sub">
            Last updated: <time>{LAST_UPDATED}</time>
          </p>

          <p className="terms-lead">
            This Disclaimer explains the limitations, responsibilities, and
            usage boundaries of the information and tools available on Fincado.
          </p>
        </div>
      </div>

      <div className="terms-container">
        <nav className="terms-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <ul>
            <li>
              <a href="#not-advice">Not Financial / Legal / Tax Advice</a>
            </li>
            <li>
              <a href="#accuracy">Accuracy of Information</a>
            </li>
            <li>
              <a href="#calculators">Calculator & Tool Disclaimer</a>
            </li>
            <li>
              <a href="#external-links">External Links Disclaimer</a>
            </li>
            <li>
              <a href="#ads">Advertising & Affiliate Disclaimer</a>
            </li>
            <li>
              <a href="#no-guarantees">No Guarantees / No Warranty</a>
            </li>
            <li>
              <a href="#liability">Limitation of Liability</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>

        <article className="terms-article">
          {/* Section 1 */}
          <section id="not-advice" className="terms-section">
            <h2>Not Financial, Investment, Tax, or Legal Advice</h2>
            <p>
              All content on Fincado — including articles, guides, calculators,
              analysis, comparisons, and any other tools — is provided **for
              general informational and educational purposes only**.
            </p>
            <p>
              Fincado is <strong>NOT</strong>:
            </p>
            <ul className="terms-list">
              <li>a financial advisor</li>
              <li>a SEBI-registered investment advisor</li>
              <li>a tax professional</li>
              <li>a bank or NBFC</li>
              <li>a legal advisor</li>
            </ul>

            <p>
              No part of this website should be interpreted as personalised
              financial, investment, tax, or legal advice.
            </p>
          </section>

          {/* Section 2 */}
          <section id="accuracy" className="terms-section">
            <h2>Accuracy of Information</h2>
            <p>
              While we strive to provide accurate and updated information,
              Fincado makes **no guarantees** regarding:
            </p>

            <ul className="terms-list">
              <li>interest rates displayed</li>
              <li>bank/NBFC eligibility criteria</li>
              <li>investment return estimates</li>
              <li>tax rules and exemptions</li>
              <li>auto-generated content accuracy</li>
            </ul>

            <p>
              Financial regulations and lending rules change frequently.
              Information may become outdated or incorrect without notice.
            </p>
          </section>

          {/* Section 3 */}
          <section id="calculators" className="terms-section">
            <h2>Calculator & Tool Disclaimer</h2>
            <p>
              Fincado provides calculators such as EMI, SIP, FD, Savings,
              Investment planning tools, and credit score estimators. These
              tools are designed for **approximate calculations only**.
            </p>

            <p>Results may differ from actual values due to:</p>
            <ul className="terms-list">
              <li>bank policies</li>
              <li>rounding differences</li>
              <li>tax bracket variations</li>
              <li>compounding frequency changes</li>
              <li>CIBIL score evaluation differences</li>
            </ul>

            <p>
              You are responsible for verifying calculations with your bank,
              advisor, or lender.
            </p>
          </section>

          {/* Section 4 */}
          <section id="external-links" className="terms-section">
            <h2>External Links Disclaimer</h2>
            <p>
              Fincado may contain links to external websites, such as banks,
              regulators (RBI, SEBI), and financial resources. We do not control
              or endorse the content, policies, or services of these external
              websites.
            </p>
            <p>
              Fincado is not responsible for any loss, damage, or misinformation
              caused by third-party sites.
            </p>
          </section>

          {/* Section 5 */}
          <section id="ads" className="terms-section">
            <h2>Advertising & Affiliate Disclaimer</h2>
            <p>
              Fincado displays advertisements through **Google AdSense**, and
              may include affiliate links where we earn a commission at no
              additional cost to you.
            </p>

            <p>
              Advertisements are served by third parties and may be personalized
              based on your browsing behavior.
            </p>

            <p>
              We do not guarantee the quality, accuracy, or reliability of any
              advertised products or services.
            </p>
          </section>

          {/* Section 6 */}
          <section id="no-guarantees" className="terms-section">
            <h2>No Guarantees / No Warranties</h2>
            <p>
              Fincado provides all content on an <strong>“as is”</strong> and{' '}
              <strong>“as available”</strong> basis.
            </p>
            <p>We do not guarantee:</p>
            <ul className="terms-list">
              <li>financial outcomes</li>
              <li>loan approvals</li>
              <li>investment returns</li>
              <li>credit score improvements</li>
              <li>tool accuracy</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="liability" className="terms-section">
            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted under Indian law, Fincado will not
              be liable for any financial loss, direct or indirect damages,
              miscalculations, or decisions made based on our tools or content.
            </p>
            <p>
              Your use of this website is entirely at your own responsibility
              and risk.
            </p>
          </section>

          {/* Section 8 */}
          <section id="contact" className="terms-section">
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Disclaimer, contact us anytime:
            </p>

            <div className="contact-card">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="contact-email">
                {SUPPORT_EMAIL}
              </a>
              <p className="contact-small">
                We normally respond within 1–3 business days.
              </p>
            </div>
          </section>

          <footer className="terms-footer">
            <p className="muted">
              Fincado is a financial education platform. Always consult
              certified professionals before making financial decisions.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
