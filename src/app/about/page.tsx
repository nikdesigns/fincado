// src/app/about/page.tsx
import type { Metadata } from 'next';
import '@/styles/terms.css'; // reusing the same polished styling

export const metadata: Metadata = {
  title: 'About Fincado — Smarter Finance Tools & Guides for India',
  description:
    'Learn about Fincado — India’s modern personal finance platform offering calculators, financial guides, analysis, and money tools to help users make smarter decisions.',
};

export default function AboutPage(): JSX.Element {
  return (
    <main className="terms-root">
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">About Fincado</h1>
          <p className="terms-sub">Empowering Financial Decisions in India</p>

          <p className="terms-lead">
            Fincado is a modern personal finance platform built to simplify
            money decisions for millions of Indians. From intelligent loan
            calculators to actionable financial guides, we provide tools that
            help you make smarter, more confident financial choices.
          </p>
        </div>
      </div>

      <div className="terms-container">
        <nav className="terms-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <ul>
            <li>
              <a href="#mission">Our Mission</a>
            </li>
            <li>
              <a href="#what-we-offer">What We Offer</a>
            </li>
            <li>
              <a href="#why-trust">Why Trust Fincado?</a>
            </li>
            <li>
              <a href="#technology">Technology & Accuracy</a>
            </li>
            <li>
              <a href="#indian-focus">India-Focused Tools</a>
            </li>
            <li>
              <a href="#future">Our Future Vision</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </nav>

        <article className="terms-article">
          <section id="mission" className="terms-section">
            <h2>Our Mission</h2>
            <p>
              Financial literacy remains a challenge in India, where people
              often make loan, tax, and investment decisions without clear
              guidance. Fincado bridges this gap by providing transparent,
              unbiased, and easy-to-understand financial tools.
            </p>
            <p>
              Our mission is simple:
              <strong>
                Help every Indian make better financial decisions with clarity,
                confidence, and accuracy.
              </strong>
            </p>
          </section>

          <section id="what-we-offer" className="terms-section">
            <h2>What We Offer</h2>
            <p>
              Fincado combines calculators, guides, and learning resources into
              one platform:
            </p>

            <ul className="terms-list">
              <li>Loan calculators (EMI, Home Loan, Personal Loan, etc.)</li>
              <li>Investment tools (SIP, FD, Savings, Retirement planning)</li>
              <li>Credit score improvement guides</li>
              <li>Automatic SEO-optimised financial articles</li>
              <li>
                In-depth Indian finance knowledge and eligibility insights
              </li>
              <li>AdSense-supported free access to all tools</li>
            </ul>
          </section>

          <section id="why-trust" className="terms-section">
            <h2>Why Trust Fincado?</h2>
            <p>
              Fincado is designed with transparency and accuracy at the core:
            </p>
            <ol className="terms-ol">
              <li>
                All tools use RBI-aligned formulas and Indian market standards.
              </li>
              <li>No misleading promotions or biased ranking of banks.</li>
              <li>Up-to-date interest data and structured calculations.</li>
              <li>Clear disclaimers and no hidden commercial agenda.</li>
            </ol>
          </section>

          <section id="technology" className="terms-section">
            <h2>Technology & Accuracy</h2>
            <p>
              Built on modern web technologies like Next.js, React, and
              TypeScript, Fincado ensures fast, secure, and seamless performance
              across all devices.
            </p>
            <p>Our calculators are optimized for:</p>
            <ul className="terms-list">
              <li>High accuracy with RBI-recognised EMI formulas</li>
              <li>Indian compounding rules (monthly, quarterly, annual)</li>
              <li>Tax estimation logic for Indian slabs</li>
              <li>Loan eligibility heuristics used by major banks & NBFCs</li>
            </ul>
          </section>

          <section id="indian-focus" className="terms-section">
            <h2>Focused on Indian Users</h2>
            <p>
              Unlike global calculators, Fincado is tailored exclusively for the
              Indian financial environment:
            </p>

            <ul className="terms-list">
              <li>Indian tax slabs & rules</li>
              <li>Local interest rate ranges</li>
              <li>Indian banking processes (FOIR, CIBIL limits, LTV ratios)</li>
              <li>India-specific financial terminology</li>
            </ul>
          </section>

          <section id="future" className="terms-section">
            <h2>Our Future Vision</h2>
            <p>Fincado is evolving constantly. In the coming months, expect:</p>
            <ul className="terms-list">
              <li>More AI-generated calculators</li>
              <li>Automated financial planning reports</li>
              <li>Loan comparison engines</li>
              <li>Realtime interest rate updates</li>
              <li>Mobile-first optimisation for all tools</li>
            </ul>
            <p>
              Our long-term goal is to become India’s most trusted, accurate,
              and user-friendly financial knowledge platform.
            </p>
          </section>

          <section id="contact" className="terms-section">
            <h2>Contact Us</h2>
            <p>
              If you have questions, feedback, or partnership requests, feel
              free to reach out:
            </p>

            <div className="contact-card">
              <a href="mailto:support@fincado.com" className="contact-email">
                support@fincado.com
              </a>
              <p className="contact-small">
                Typically replies within 1–3 business days.
              </p>
            </div>
          </section>

          <footer className="terms-footer">
            <p className="muted">
              Fincado is an independent financial education platform created to
              help Indian users make informed decisions. We do not offer loans
              or financial products directly.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
