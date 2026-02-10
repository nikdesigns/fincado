// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { getUnionBudgetText } from '@/lib/fiscalYear';
import {
  Calculator,
  TrendingUp,
  PiggyBank,
  FileText,
  Mail,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t bg-linear-to-b from-slate-50 to-slate-100 text-slate-700 no-print"
    >
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold text-slate-900 hover:text-emerald-700 transition-colors"
            >
              Fincado
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              India&apos;s most comprehensive financial planning platform.
              Bank-grade calculators for Loans, Investments, Retirement, and Tax
              Planning — all 100% free.
            </p>

            {/* KEY FEATURES */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                  ✓
                </span>
                <span>Updated with latest rates & regulations</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                  ✓
                </span>
                <span>30+ Financial Calculators</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                  ✓
                </span>
                <span>Available in Hindi & English</span>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/contact/"
                aria-label="Contact us"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200">
                🔒 SSL Secured
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-slate-200">
                🇮🇳 Made for India
              </span>
            </div>
          </div>

          {/* LOANS & EMI */}
          <FooterColumn title="Loans & EMI" icon={Calculator}>
            <FooterLink href="/compare-loans/" highlight>
              Compare Loan Rates
            </FooterLink>
            <FooterLink href="/emi-calculator/">EMI Calculator</FooterLink>
            <FooterLink href="/home-loan-calculator/">Home Loan</FooterLink>
            <FooterLink href="/loans/personal-loan/">Personal Loan</FooterLink>
            <FooterLink href="/loans/car-loan/">Car Loan</FooterLink>
            <FooterLink href="/loans/education-loan/">
              Education Loan
            </FooterLink>
            <FooterLink href="/credit-score/">Credit Score</FooterLink>
          </FooterColumn>

          {/* INVESTMENTS */}
          <FooterColumn title="Investments" icon={TrendingUp}>
            <FooterLink href="/sip-calculator/">SIP Calculator</FooterLink>
            <FooterLink href="/lumpsum-calculator/">
              Lumpsum Calculator
            </FooterLink>
            <FooterLink href="/swp-calculator/">SWP Calculator</FooterLink>
            <FooterLink href="/elss-calculator/">ELSS Calculator</FooterLink>
            <FooterLink href="/ppf-calculator/">PPF Calculator</FooterLink>
            <FooterLink href="/fd-calculator/">FD Calculator</FooterLink>
            <FooterLink href="/rd-calculator/">RD Calculator</FooterLink>
            <FooterLink href="/nsc-calculator/">NSC Calculator</FooterLink>
            <FooterLink href="/cagr-calculator/">CAGR Calculator</FooterLink>
            <FooterLink href="/sukanya-samriddhi/">SSY Calculator</FooterLink>
          </FooterColumn>

          {/* RETIREMENT & TAX */}
          <FooterColumn title="Retirement & Tax" icon={PiggyBank}>
            <FooterLink href="/retirement-calculator/">
              Retirement Planner
            </FooterLink>
            <FooterLink href="/nps-calculator/">NPS Calculator</FooterLink>
            <FooterLink href="/epf-calculator/">EPF Calculator</FooterLink>
            <FooterLink href="/gratuity-calculator/">
              Gratuity Calculator
            </FooterLink>
            <FooterLink href="/apy-calculator/">APY Calculator</FooterLink>
            <FooterLink href="/fire-calculator/">FIRE Calculator</FooterLink>
            <FooterLink href="/income-tax-calculator/">
              Income Tax Calculator
            </FooterLink>
            <FooterLink href="/hra-calculator/">HRA Calculator</FooterLink>
            <FooterLink href="/gst-calculator/">GST Calculator</FooterLink>
          </FooterColumn>

          {/* COMPANY & RESOURCES */}
          <FooterColumn title="Resources" icon={FileText}>
            <FooterLink href="/guides/">Financial Guides</FooterLink>
            <FooterLink href="/calculators/">All Calculators</FooterLink>
            <FooterLink href="/hi/">हिंदी में</FooterLink>
            <FooterLink href="/about/">About Us</FooterLink>
            <FooterLink href="/editorial-guidelines/">
              Editorial Guidelines
            </FooterLink>
            <FooterLink href="/contact/">Contact Support</FooterLink>
            <FooterLink href="/privacy-policy/">Privacy Policy</FooterLink>
            <FooterLink href="/terms/">Terms of Use</FooterLink>
            <FooterLink href="/disclaimer/">Disclaimer</FooterLink>
          </FooterColumn>
        </div>

        {/* POPULAR SEARCHES */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
            Popular Calculators
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'EMI Calculator', href: '/emi-calculator/' },
              { label: 'SIP Calculator', href: '/sip-calculator/' },
              { label: 'Income Tax', href: '/income-tax-calculator/' },
              { label: 'PPF Calculator', href: '/ppf-calculator/' },
              { label: 'Home Loan', href: '/home-loan-calculator/' },
              { label: 'FD Calculator', href: '/fd-calculator/' },
              { label: 'NPS Calculator', href: '/nps-calculator/' },
              { label: 'Retirement Planning', href: '/retirement-calculator/' },
              { label: 'GST Calculator', href: '/gst-calculator/' },
              { label: 'HRA Calculator', href: '/hra-calculator/' },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white rounded-full border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all"
              >
                {calc.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            {/* COPYRIGHT */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900">
                © {currentYear} Fincado. All rights reserved.
              </p>
              <p className="text-xs text-slate-500">
                Updated as per {getUnionBudgetText()} norms.
              </p>
            </div>

            {/* DISCLAIMER */}
            <div className="max-w-2xl">
              <p className="text-xs leading-relaxed text-slate-500">
                <strong className="text-slate-700">Disclaimer:</strong> Fincado
                provides financial calculators and educational content for
                informational purposes only. We are not SEBI registered
                investment advisors. Always consult a certified financial
                planner before making investment or loan decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- HELPERS ---------- */

function FooterColumn({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4 text-emerald-600" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
          {title}
        </h4>
      </div>
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
        className={`text-sm transition-colors hover:text-emerald-700 inline-flex items-center gap-1 group ${
          highlight
            ? 'font-semibold text-emerald-700'
            : 'text-slate-600 hover:translate-x-0.5'
        }`}
      >
        {children}
        {highlight && (
          <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
            NEW
          </span>
        )}
      </Link>
    </li>
  );
}
