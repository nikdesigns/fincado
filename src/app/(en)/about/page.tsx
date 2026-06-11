// src/app/about/page.tsx
import type { Metadata } from 'next';
import '@/styles/terms.css'; // reusing the same polished styling
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'About Fincado — Smarter Finance Tools & Guides for India',
  description:
    'Learn about Fincado — India’s modern personal finance platform offering calculators, financial guides, analysis, and money tools to help users make smarter decisions.',
  alternates: {
    canonical: 'https://fincado.com/about/',
  },
  openGraph: {
    title: 'About Fincado — Smarter Finance Tools & Guides for India',
    description:
      'Learn about Fincado — India’s modern personal finance platform offering calculators, financial guides, analysis, and money tools to help users make smarter decisions.',
    url: 'https://fincado.com/about/',
    type: 'website',
  },
};

export default function AboutPage() {
  const founderSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://fincado.com/#founder',
    name: 'Nitin Kaushik',
    jobTitle: 'Founder & Editor-in-Chief',
    url: 'https://fincado.com/about/',
    sameAs: [
      'https://www.linkedin.com/in/nitin-kaushik-9b4a33109/',
    ],
    worksFor: {
      '@id': 'https://fincado.com/#organization',
    },
    knowsAbout: [
      'Personal finance in India',
      'Home loan comparison and EMI planning',
      'Mutual funds and SIP investing',
      'Indian income tax planning',
      'Retirement and wealth planning',
    ],
  };

  return (
    <main className="terms-root">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'About', url: 'https://fincado.com/about/' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <div className="terms-hero">
        <div className="terms-hero-inner">
          <h1 className="terms-title">About Fincado</h1>
          <p className="terms-sub">Built by a finance enthusiast, for every Indian borrower and investor</p>

          <p className="terms-lead">
            Fincado is an independent personal finance platform built to cut
            through the noise around loans, taxes, and investments. Every
            calculator, guide, and rate comparison on this site is built with
            one purpose: give you the same clarity a financial advisor would —
            without the sales pitch.
          </p>
        </div>
      </div>

      <div className="terms-container">
        <nav className="terms-toc" aria-label="Table of contents">
          <strong>On this page</strong>
          <ul>
            <li>
              <a href="#story">Our Story</a>
            </li>
            <li>
              <a href="#founder">Who Runs Fincado</a>
            </li>
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
          <section id="story" className="terms-section">
            <h2>Our Story</h2>
            <p>
              Fincado started from a frustration that many Indian borrowers
              share: when I was comparing home loan rates across banks, I
              couldn&apos;t find a single place that showed real, current rates
              from multiple lenders side by side — without pushing me toward a
              broker or a referral link.
            </p>
            <p>
              Most financial sites in India are either too broad to be useful,
              or they&apos;re covertly earning commissions for steering users
              toward specific products. I built Fincado in 2024 to be neither.
              It&apos;s funded by advertising, not by loan referrals, which
              means every ranking, comparison, and guide is based purely on
              publicly available data and honest analysis.
            </p>
          </section>

          <section id="founder" className="terms-section">
            <h2>Who Runs Fincado</h2>
            <p>
              My name is <strong>Nitin Kaushik</strong>, and I am the founder
              and editor of Fincado. I have a strong interest in Indian personal
              finance — particularly the intersection of lending, tax planning,
              and long-term wealth building that affects ordinary salaried
              professionals and first-time homebuyers.
            </p>
            <p>
              I research, write, and maintain the content on this site directly.
              All guides are cross-checked against RBI circulars, official bank
              disclosures, and the Income Tax Act before publication. Where data
              changes (such as interest rate revisions), I update the affected
              pages as quickly as possible.
            </p>
            <p>
              You can reach me directly at{' '}
              <a href="mailto:support@fincado.com">support@fincado.com</a> for
              corrections, feedback, or editorial questions.
            </p>
          </section>

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
              <li>Researched financial guides and in-depth analysis</li>
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
              <li>More specialized financial calculators</li>
              <li>Personalized financial planning guides</li>
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
