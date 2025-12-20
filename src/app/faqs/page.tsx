import type { Metadata } from 'next';
import '@/styles/terms.css';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — Fincado',
  description:
    'Find answers to common questions about Fincado calculators, loan comparisons, credit scores, and financial planning tools.',
  alternates: {
    canonical: 'https://www.fincado.com/faqs',
  },
};

const SUPPORT_EMAIL = 'support@fincado.com';
const LAST_UPDATED = 'December 2024';

export default function FAQPage() {
  return (
    <main className="terms-root">
      {/* Exact same Hero section as Terms */}
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">FAQ</h1>
          <p className="terms-sub">
            Last updated: <time dateTime="2024-12-20">{LAST_UPDATED}</time>
          </p>
          <p className="terms-lead">
            Quick answers to common questions about our calculators, data
            accuracy, and how to use Fincado effectively.
          </p>
        </div>
      </div>

      <div className="terms-container">
        {/* Sidebar Table of Contents */}
        <nav className="terms-toc" aria-label="Table of contents">
          <strong>Categories</strong>
          <ul>
            <li>
              <a href="#general">General</a>
            </li>
            <li>
              <a href="#accuracy">Data Accuracy</a>
            </li>
            <li>
              <a href="#privacy">Privacy & Safety</a>
            </li>
            <li>
              <a href="#loans">Loans & Credit</a>
            </li>
            <li>
              <a href="#technical">Technical Support</a>
            </li>
          </ul>
        </nav>

        {/* FAQ Content Column */}
        <article className="terms-article">
          <section id="general" className="terms-section">
            <h2>General Questions</h2>
            <h3>What is Fincado?</h3>
            <p>
              Fincado is a financial information portal designed for the Indian
              market. We provide professional-grade calculators, real-time
              interest rate tracking, and educational guides to help you manage
              your money better.
            </p>

            <h3>Is there a fee to use the site?</h3>
            <p>
              No. Fincado is 100% free for all users. We generate revenue
              through advertisements and do not charge for any of our
              calculation tools.
            </p>
          </section>

          <section id="accuracy" className="terms-section">
            <h2>Data Accuracy</h2>
            <h3>How accurate are the calculators?</h3>
            <p>
              Our tools use standard mathematical formulas used by major banks.
              While results are highly accurate estimates, your final bank quote
              may vary slightly due to processing fees or specific rounding
              logic.
            </p>

            <h3>How often are interest rates updated?</h3>
            <p>
              We monitor and update bank interest rates weekly. However, since
              banks update rates frequently based on RBI guidelines, we suggest
              verifying the final rate with your branch.
            </p>
          </section>

          <section id="privacy" className="terms-section">
            <h2>Privacy & Safety</h2>
            <h3>Is my data safe on Fincado?</h3>
            <p>
              Yes. We do not store any of the financial numbers you enter into
              our calculators. All calculations happen locally in your browser.
            </p>

            <h3>Do I need to sign up?</h3>
            <p>
              No registration is required. You can use all our tools anonymously
              without providing an email or phone number.
            </p>
          </section>

          <section id="loans" className="terms-section">
            <h2>Loans & Credit</h2>
            <h3>Can I check my actual CIBIL score here?</h3>
            <p>
              No, we provide a &quot;Credit Score Estimator&quot; based on your
              habits. To get an official report, you must visit authorized
              bureaus like CIBIL, Experian, or Equifax.
            </p>

            <h3>Does using Fincado affect my credit score?</h3>
            <p>
              No. Browsing Fincado or using our calculators is a &quot;soft
              activity&quot; and has no impact on your credit rating.
            </p>
          </section>

          <section id="technical" className="terms-section">
            <h2>Technical Support</h2>
            <h3>I found a calculation error, what should I do?</h3>
            <p>
              We strive for perfection, but if you notice a bug, please report
              it to us immediately.
            </p>
            <div className="contact-card">
              <a className="contact-email" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              <p className="contact-small">
                We usually respond within 48 hours.
              </p>
            </div>
          </section>

          <footer className="terms-footer">
            <p className="muted">
              Fincado is intended for educational use only. Always consult a
              certified financial advisor for specific investment or legal
              advice.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
