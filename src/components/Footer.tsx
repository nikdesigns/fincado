// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t bg-slate-50 text-slate-700 no-print"
    >
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-300 px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="text-xl font-bold text-slate-900">Fincado</div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              India’s most comprehensive financial planning platform. We make
              money simple with bank-grade calculators for Loans, Investments,
              and Retirement.
            </p>

            {/* SOCIAL */}
            <div className="mt-5 flex items-center gap-3">
              <SocialLink
                href="https://twitter.com"
                label="Twitter"
                path="M23 4.5c-.7.3-1.5.6-2.3.7a4 4 0 0 0-7 2.8v1A11.4 11.4 0 0 1 3 3.8a4 4 0 0 0 1.2 5.4 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 1.5 19 11.3 11.3 0 0 0 8 21c7.5 0 11.6-6.4 11.6-12v-.6A8 8 0 0 0 23 4.5z"
              />
              <SocialLink
                href="https://linkedin.com"
                label="LinkedIn"
                path="M4.98 3.5A2.5 2.5 0 1 1 5 8.5A2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3zM9 9h3.7v1.7h.1c.5-1 1.8-2 3.7-2C20.6 8.7 21 11 21 14.3V21h-4v-6.2c0-1.4 0-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v6.3H9z"
              />
              <Link
                href="/contact/"
                aria-label="Contact"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <svg
                  width="18"
                  height="18"
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

            {/* TRUST */}
            <div className="mt-5 flex gap-4 text-xs text-slate-500">
              <span>🔒 SSL Secured</span>
              <span>🇮🇳 Made for India</span>
            </div>
          </div>

          {/* LOANS */}
          <FooterColumn title="Loans & EMI">
            <FooterLink href="/emi-calculator/">EMI Calculator</FooterLink>
            <FooterLink href="/loans/home-loan/">Home Loan</FooterLink>
            <FooterLink href="/loans/personal-loan/">Personal Loan</FooterLink>
            <FooterLink href="/loans/car-loan/">Car Loan</FooterLink>
            <FooterLink href="/loans/education-loan/">
              Education Loan
            </FooterLink>
            <FooterLink href="/credit-score/">Check Credit Score</FooterLink>
          </FooterColumn>

          {/* INVESTMENTS */}
          <FooterColumn title="Investments">
            <FooterLink href="/sip-calculator/">SIP Calculator</FooterLink>
            <FooterLink href="/elss-calculator/">ELSS Calculator</FooterLink>
            <FooterLink href="/fd-calculator/">FD Calculator</FooterLink>
            <FooterLink href="/rd-calculator/">RD Calculator</FooterLink>
            <FooterLink href="/ppf-calculator/">PPF Calculator</FooterLink>
            <FooterLink href="/sukanya-samriddhi/">
              Sukanya Samriddhi (SSY)
            </FooterLink>
            <FooterLink href="/lumpsum-calculator/">Lumpsum Returns</FooterLink>
            <FooterLink href="/mutual-funds/">Mutual Funds</FooterLink>
          </FooterColumn>

          {/* PLANNING */}
          <FooterColumn title="Planning & Tax">
            <FooterLink href="/income-tax-calculator/">
              Income Tax Calculator
            </FooterLink>
            <FooterLink href="/inflation-calculator/">
              Inflation Calculator
            </FooterLink>
            <FooterLink href="/retirement-calculator/">
              Retirement Plan
            </FooterLink>
            <FooterLink href="/epf-calculator/">EPF Calculator</FooterLink>
            <FooterLink href="/gratuity-calculator/">
              Gratuity Calculator
            </FooterLink>
            <FooterLink href="/gst-calculator/">GST Calculator</FooterLink>
            <FooterLink href="/compound-interest-calculator/">
              Compound Interest
            </FooterLink>
            <FooterLink href="/simple-interest-calculator/">
              Simple Interest
            </FooterLink>
            <FooterLink href="/apy-calculator/">APY Scheme</FooterLink>
          </FooterColumn>

          {/* COMPANY */}
          <FooterColumn title="Company">
            <FooterLink href="/about/">About Us</FooterLink>
            <FooterLink href="/contact/">Contact Support</FooterLink>
            <FooterLink href="/guides/">Financial Guides</FooterLink>
            <FooterLink href="/privacy-policy/">Privacy Policy</FooterLink>
            <FooterLink href="/terms/">Terms of Use</FooterLink>
            <FooterLink href="/disclaimer/">Disclaimer</FooterLink>
          </FooterColumn>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t bg-white">
        <div className="mx-auto max-w-300 px-4 py-6 text-sm text-slate-500">
          <p>© {currentYear} Fincado. All rights reserved.</p>
          <p className="mt-2 max-w-4xl text-xs leading-relaxed">
            <strong>Disclaimer:</strong> Fincado provides financial tools for
            informational purposes only. We are not a SEBI registered investment
            advisor. Please consult a certified financial planner before making
            investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- HELPERS ---------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
        {title}
      </h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  highlight = false,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`text-sm transition hover:text-emerald-700 ${
          highlight ? 'font-semibold text-emerald-700' : 'text-slate-600'
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

// SOCIAL ICON
function SocialLink({
  href,
  label,
  path,
}: {
  href: string;
  label: string;
  path: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}
