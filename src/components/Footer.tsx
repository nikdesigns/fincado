// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { getUnionBudgetText } from '@/lib/fiscalYear';

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
            <Link href="/" className="text-xl font-bold text-slate-900">
              Fincado
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              India’s most comprehensive financial planning platform. We make
              money simple with bank-grade calculators for Loans, Investments,
              and Retirement.
            </p>

            {/* SOCIAL */}
            <div className="mt-5 flex items-center gap-3">
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
            <div className="mt-6 flex gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1">🔒 SSL Secured</span>
              <span className="flex items-center gap-1">🇮🇳 Made for India</span>
            </div>
          </div>

          {/* LOANS */}
          <FooterColumn title="Loans & EMI">
            <FooterLink href="/compare-loans/" highlight>
              Compare Rates
            </FooterLink>
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
            <FooterLink href="/swp-calculator/">SWP Calculator</FooterLink>
            <FooterLink href="/lumpsum-calculator/">Lumpsum Returns</FooterLink>
            <FooterLink href="/elss-calculator/">ELSS (Tax Saving)</FooterLink>
            <FooterLink href="/ppf-calculator/">PPF Calculator</FooterLink>
            <FooterLink href="/fd-calculator/">FD Calculator</FooterLink>
            <FooterLink href="/rd-calculator/">RD Calculator</FooterLink>
            <FooterLink href="/sukanya-samriddhi/">SSY Calculator</FooterLink>
          </FooterColumn>

          {/* PLANNING */}
          <FooterColumn title="Planning & Tax">
            <FooterLink href="/income-tax-calculator/">
              Income Tax (New vs Old)
            </FooterLink>
            <FooterLink href="/hra-calculator/">HRA Calculator</FooterLink>
            <FooterLink href="/nps-calculator/">NPS Calculator</FooterLink>
            <FooterLink href="/epf-calculator/">EPF Calculator</FooterLink>
            <FooterLink href="/gratuity-calculator/">
              Gratuity Calculator
            </FooterLink>
            <FooterLink href="/gst-calculator/">GST Calculator</FooterLink>
            <FooterLink href="/retirement-calculator/">
              Retirement Planner
            </FooterLink>
            <FooterLink href="/inflation-calculator/">
              Inflation Calculator
            </FooterLink>
          </FooterColumn>

          {/* COMPANY */}
          <FooterColumn title="Company">
            <FooterLink href="/about/">About Us</FooterLink>
            <FooterLink href="/editorial-guidelines/">
              Editorial Guidelines
            </FooterLink>
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
        <div className="mx-auto max-w-300 px-4 py-6 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p>© {currentYear} Fincado. All rights reserved.</p>
            <p className="mt-1 text-xs text-slate-400">
              Updated as per {getUnionBudgetText()} norms.
            </p>
          </div>

          <p className="max-w-xl text-xs leading-relaxed text-right md:text-left">
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
      <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
        {title}
      </h4>
      <ul className="space-y-2.5">{children}</ul>
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
        className={`text-sm transition-colors hover:text-emerald-700 ${
          highlight ? 'font-semibold text-emerald-700' : 'text-slate-600'
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
