// src/app/editorial-guidelines/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/terms.css';

export const metadata: Metadata = {
  title: 'Editorial Guidelines & Transparency — Fincado',
  description:
    'Our commitment to accuracy, RBI benchmarking, and transparent financial research for Indian home buyers.',
  alternates: { canonical: 'https://fincado.com/editorial-guidelines/' },
};

const LAST_UPDATED = 'January 2026';
const SUPPORT_EMAIL = 'support@fincado.com';

export default function EditorialGuidelinesPage() {
  return (
    <main className="terms-root">
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">Editorial Guidelines & Transparency</h1>

          <p className="terms-sub">
            Last updated: <time>{LAST_UPDATED}</time>
          </p>

          <p className="terms-lead">
            At Fincado, our mission is to provide Indian home buyers with the
            most accurate, transparent, and up-to-date financial data. We
            understand that a home loan is one of the most significant financial
            decisions of your life, and we take our responsibility as a research
            platform seriously.
          </p>
        </div>
      </div>

      <div className="terms-container">
        <nav className="terms-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <ul>
            <li>
              <a href="#sourcing">Data Sourcing & Accuracy</a>
            </li>
            <li>
              <a href="#fact-checking">Fact-Checking Process</a>
            </li>
            <li>
              <a href="#ethics">Independence & Ethics</a>
            </li>
            <li>
              <a href="#corrections">Corrections Policy</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>

        <article className="terms-article">
          {/* Section 1 */}
          <section id="sourcing" className="terms-section">
            <h2>1. Data Sourcing & Accuracy</h2>
            <p>
              Our &quot;Bank vs Bank&quot; comparison engine and EMI calculators
              are powered by three primary data sources to ensure you get
              bank-grade accuracy:
            </p>

            <ul className="terms-list">
              <li>
                <strong>Direct Lender Disclosures:</strong> We monitor official
                portals of 10+ major Indian banks (SBI, HDFC, ICICI, etc.) for
                base rate changes.
              </li>
              <li>
                <strong>RBI Benchmarks:</strong> All floating rates are
                benchmarked against the latest{' '}
                <strong>Repo Linked Lending Rate (RLLR)</strong> and{' '}
                <strong>MCLR</strong> updates from the Reserve Bank of India.
              </li>
              <li>
                <strong>Market Verification:</strong> We cross-verify starting
                rates with actual borrower approval data to ensure
                &quot;headline rates&quot; are achievable for eligible
                customers.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section id="fact-checking" className="terms-section">
            <h2>2. Fact-Checking Process</h2>
            <p>
              Every piece of content on Fincado goes through a multi-step review
              cycle before publication:
            </p>

            <ul className="terms-list">
              <li>
                <strong>Data Collection:</strong> Automated and manual
                collection of interest rates and fee structures.
              </li>
              <li>
                <strong>Expert Review:</strong> Verification by our research
                team to ensure compliance with the{' '}
                <strong>Income Tax Act</strong> (for tax benefit calculations)
                and RBI guidelines.
              </li>
              <li>
                <strong>Freshness Audit:</strong> We perform a &quot;Freshness
                Audit&quot; every 30 days to update rates, fees, and property
                norms across 1,100+ pages.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="ethics" className="terms-section">
            <h2>3. Independence & Ethics</h2>
            <p>
              Fincado is an independent research platform. We maintain strict
              separation between our editorial content and advertising
              partnerships.
            </p>

            <ul className="terms-list">
              <li>
                <strong>Unbiased Comparisons:</strong> Our &quot;Verdict&quot;
                sections are based on hard data (cost, speed, and eligibility)
                and are not influenced by bank partnerships.
              </li>
              <li>
                <strong>No &quot;Pay-to-Rank&quot;:</strong> Banks cannot pay to
                appear higher in our comparison tables or to receive a
                &quot;Best for&quot; badge.
              </li>
              <li>
                <strong>Advertising Transparency:</strong> We use clearly
                labeled advertisements (e.g., Google AdSense) to keep our tools
                free for users. This does not impact our editorial integrity.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="corrections" className="terms-section">
            <h2>4. Corrections Policy</h2>
            <p>
              We are committed to correcting errors promptly. If you find a data
              discrepancy (e.g., an outdated interest rate or incorrect branch
              info), please report it to us.
            </p>
            <p>
              We aim to investigate and resolve verified data errors within
              24–48 hours.
            </p>
          </section>

          {/* Section 5 */}
          <section id="contact" className="terms-section">
            <h2>Contact Us</h2>
            <p>
              If you have questions about our research methodology or need to
              report an error:
            </p>

            <div className="contact-card">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="contact-email">
                {SUPPORT_EMAIL}
              </a>
              <p className="contact-small">
                Subject line: &quot;Editorial Query&quot;
              </p>
            </div>
          </section>

          <footer className="terms-footer">
            <p className="muted">Fincado Editorial Team • 2026 Edition</p>
          </footer>
        </article>
      </div>
    </main>
  );
}
