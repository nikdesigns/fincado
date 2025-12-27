// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        {/* --- COLUMN 1: BRAND & SOCIAL --- */}
        <div className="footer-brand">
          <div className="footer-logo">Fincado</div>
          <p className="footer-desc">
            India’s most comprehensive financial planning platform. We make
            money simple with bank-grade calculators for Loans, Investments, and
            Retirement.
          </p>

          <div className="footer-social">
            {/* External Social Links (New Tab) */}
            <SocialLink
              href="https://twitter.com"
              label="Twitter"
              path="M23 4.5c-.7.3-1.5.6-2.3.7a4 4 0 0 0-7 2.8v1A11.4 11.4 0 0 1 3 3.8a4 4 0 0 0 1.2 5.4 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 1.5 19 11.3 11.3 0 0 0 8 21c7.5 0 11.6-6.4 11.6-12v-.6A8 8 0 0 0 23 4.5z"
            />
            <SocialLink
              href="https://linkedin.com"
              label="LinkedIn"
              path="M4.98 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3zM9 9h3.7v1.7h.1c.5-1 1.8-2 3.7-2C20.6 8.7 21 11 21 14.3V21h-4v-6.2c0-1.4 0-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v6.3H9z"
            />
            {/* Internal Contact Link (Same Tab) */}
            <Link href="/contact/" aria-label="Contact" className="social-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M3 6.5v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-11a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z M21 6.5l-9 6-9-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="footer-trust">
            <span>🔒 SSL Secured</span>
            <span>🇮🇳 Made for India</span>
          </div>
        </div>

        {/* --- COLUMN 2: LOANS --- */}
        <div className="footer-col">
          <h4>Loans & EMI</h4>
          <ul>
            <li>
              <Link href="/emi-calculator/">EMI Calculator</Link>
            </li>
            <li>
              <Link href="/loans/home-loan/">Home Loan</Link>
            </li>
            <li>
              <Link href="/loans/personal-loan/">Personal Loan</Link>
            </li>
            <li>
              <Link href="/loans/car-loan/">Car Loan</Link>
            </li>
            <li>
              <Link href="/loans/education-loan/">Education Loan</Link>
            </li>
            <li>
              <Link href="/credit-score/" className="highlight-link">
                Check Credit Score
              </Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 3: INVESTMENTS --- */}
        <div className="footer-col">
          <h4>Investments</h4>
          <ul>
            <li>
              <Link href="/sip-calculator/">SIP Calculator</Link>
            </li>
            <li>
              <Link href="/elss-calculator/">ELSS Calculator</Link>{' '}
              {/* ✅ Added */}
            </li>
            <li>
              <Link href="/fd-calculator/">FD Calculator</Link>
            </li>
            <li>
              <Link href="/rd-calculator/">RD Calculator</Link>
            </li>
            <li>
              <Link href="/ppf-calculator/">PPF Calculator</Link>
            </li>
            <li>
              <Link href="/sukanya-samriddhi/">Sukanya Samriddhi (SSY)</Link>
            </li>
            <li>
              <Link href="/lumpsum-calculator/">Lumpsum Returns</Link>
            </li>
            <li>
              <Link href="/mutual-funds/">Mutual Funds</Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 4: PLANNING & TAX --- */}
        <div className="footer-col">
          <h4>Planning & Tax</h4>
          <ul>
            <li>
              <Link href="/income-tax-calculator/">Income Tax Calculator</Link>{' '}
              {/* ✅ Added */}
            </li>
            <li>
              <Link href="/inflation-calculator/">Inflation Calculator</Link>
            </li>
            <li>
              <Link href="/retirement-calculator/">Retirement Plan</Link>
            </li>
            <li>
              <Link href="/epf-calculator/">EPF Calculator</Link>
            </li>
            <li>
              <Link href="/gratuity-calculator/">Gratuity Calculator</Link>
            </li>
            <li>
              <Link href="/gst-calculator/">GST Calculator</Link>
            </li>
            <li>
              <Link href="/compound-interest-calculator/">
                Compound Interest
              </Link>
            </li>
            <li>
              <Link href="/simple-interest-calculator/">Simple Interest</Link>
            </li>
            <li>
              <Link href="/apy-calculator/">APY Scheme</Link>
            </li>
          </ul>
        </div>

        {/* --- COLUMN 5: COMPANY --- */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/about/">About Us</Link>
            </li>
            <li>
              <Link href="/contact/">Contact Support</Link>
            </li>
            <li>
              <Link href="/guides/">Financial Guides</Link>
            </li>
            <li>
              <Link href="/privacy-policy/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms/">Terms of Use</Link>
            </li>
            <li>
              <Link href="/disclaimer/">Disclaimer</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="footer-bottom">
        <div className="footer-legal-text">
          <p>© {currentYear} Fincado. All rights reserved.</p>
          <p className="disclaimer-text">
            **Disclaimer:** Fincado provides financial tools for informational
            purposes only. We are not a SEBI registered investment advisor.
            Please consult a certified financial planner before making
            investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Helper for Social Icons
function SocialLink({
  href,
  label,
  path,
  stroke = false,
}: {
  href: string;
  label: string;
  path: string;
  stroke?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="social-icon"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={stroke ? 'none' : 'currentColor'}
        stroke={stroke ? 'currentColor' : 'none'}
        strokeWidth={stroke ? '2' : '0'}
      >
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
